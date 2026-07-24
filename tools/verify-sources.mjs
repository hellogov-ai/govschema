#!/usr/bin/env node
// GovSchema source-URL verifier (GOV-1763).
//
// Four fabricated sourcing/verification claims made it past authoring and
// were only caught by a human-style review gate (GOV-1760, PR #291, is the
// most recent: VERIFICATION.md + schema.json claimed three independently
// discovered URLs resolved to the identical PDF; two were 404 with zero
// Wayback Machine history and had never existed). Field-level content was
// accurate every time; the fabrication was confined to the verification
// narrative. This tool re-fetches every URL a schema/VERIFICATION.md pair
// cites as evidence, so a fabricated citation is caught on the PR that
// introduces it instead of by a reviewer's manual re-fetch.
//
// What it checks, per registry version directory (schema.json +
// VERIFICATION.md, evaluated together since either file may carry the
// citation the other refers to):
//   - every http(s) URL is extracted from both files;
//   - each is re-fetched (HEAD, falling back to GET on HEAD failure);
//   - a URL that 404s or fails DNS resolution is checked against the Wayback
//     Machine's CDX API for prior history. Zero history => FAIL (this is
//     exactly the "never existed" signature GOV-1760 found by hand). Some
//     history => WARN (the source was once live; it has since moved or been
//     taken down — a staleness problem, not a fabrication);
//   - a URL that itself points at web.archive.org is treated as an archival
//     citation and must resolve directly, or it FAILs (a broken "proof" URL
//     is as bad as a fabricated one);
//   - 401/403/429 (bot/WAF-blocked — extremely common across this registry's
//     government sources) is a WARN, never a FAIL: it is evidence the source
//     is hard for *this environment* to reach, not evidence it doesn't exist;
//   - 5xx and timeouts are retried with backoff, then WARN — transient gov-
//     site flakiness must never turn into a merge-blocking false positive.
//
// Usage:
//   node tools/verify-sources.mjs                  # PR/push-aware: changed
//                                                   # registry files only,
//                                                   # falling back to --all
//                                                   # when there's no base
//                                                   # ref to diff against
//   node tools/verify-sources.mjs --all            # every schema in registry/
//   node tools/verify-sources.mjs --base <git-ref> # diff against a ref
//   node tools/verify-sources.mjs <dir-or-file> ... # explicit paths
//
// Exit code 0 if nothing FAILs (WARNs are printed but non-blocking), 1
// otherwise — suitable for CI.

import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, dirname, relative, sep, isAbsolute } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const REGISTRY = join(ROOT, "registry");
const ALLOWLIST_PATH = join(ROOT, "tools", "verify-sources-allowlist.json");

const FETCH_TIMEOUT_MS = 15_000;
const RETRIES = 2; // additional attempts after the first, for 5xx/timeout only
const RETRY_BACKOFF_MS = 1_500;

// Parens, brackets, and single quotes are all allowed inside the match (some
// government sites, e.g. CZ's md.gov.cz, put literal "(1)" disambiguators in
// attachment paths; Wayback CDX `filter=` queries commonly embed a literal
// regex like "[Ee]3" in the URL itself; French-language document titles
// commonly embed a literal apostrophe, e.g. "Formulaire%20d'inscription%20BCE.pdf")
// — the trailing-punctuation trim below removes only a genuinely unbalanced
// closing paren/bracket (the kind markdown's `[text](url)` wraps around the
// URL) or a wrapping single quote, not punctuation that's part of the URL's
// own content. Excluding "]" from this class previously truncated any URL
// with a literal "]" mid-path at the first occurrence (GOV-2660); excluding
// "'" previously truncated any URL with a literal apostrophe mid-path
// (GOV-4698).
const URL_RE = /https?:\/\/[^\s"`<>]+/g;
// Trailing characters that are almost always markdown/JSON punctuation, not
// part of the URL itself (a sentence's trailing period/comma, a trailing
// backtick already excluded above). Brackets and single quotes are handled
// separately (stripUnbalancedTrailingBracket, stripWrappingTrailingQuote)
// since both can legitimately be part of the URL's own content (see above).
const TRAILING_PUNCT_RE = /[.,;:!?]+$/;

// Strip a trailing ")" only while it has no matching "(" earlier in the
// URL — i.e. only while the parens are unbalanced. This removes markdown's
// wrapping close-paren (`[text](https://example.com)`) without truncating a
// URL whose own path contains a balanced literal "(...)" segment.
function stripUnbalancedTrailingParen(url) {
  let s = url;
  while (s.endsWith(")")) {
    const opens = (s.match(/\(/g) || []).length;
    const closes = (s.match(/\)/g) || []).length;
    if (closes <= opens) break;
    s = s.slice(0, -1);
  }
  return s;
}

// Mirrors stripUnbalancedTrailingParen for "]": strip a trailing "]" only
// while it has no matching "[" earlier in the URL, so a URL whose own path
// contains a balanced literal "[...]" segment (e.g. a Wayback CDX filter
// regex like ".*[Ee]3.*\.pdf") survives extraction intact.
function stripUnbalancedTrailingBracket(url) {
  let s = url;
  while (s.endsWith("]")) {
    const opens = (s.match(/\[/g) || []).length;
    const closes = (s.match(/\]/g) || []).length;
    if (closes <= opens) break;
    s = s.slice(0, -1);
  }
  return s;
}

// Mirrors stripUnbalancedTrailingParen/Bracket, but for a wrapping single
// quote: unlike "()" and "[]", "'" is the same character on both ends, so
// there's no open/close count to balance. Instead, only treat a trailing "'"
// as wrapping punctuation (and strip it) when the character immediately
// before the match itself was a "'" — i.e. the URL was written as
// 'https://example.com/foo'. A URL whose own path contains a literal
// apostrophe (not preceded by an opening quote) survives extraction intact
// (GOV-4698).
function stripWrappingTrailingQuote(url, precededByQuote) {
  if (precededByQuote && url.endsWith("'")) {
    return url.slice(0, -1);
  }
  return url;
}

function log(msg) {
  process.stdout.write(msg + "\n");
}

function loadAllowlist() {
  if (!existsSync(ALLOWLIST_PATH)) return {};
  const raw = JSON.parse(readFileSync(ALLOWLIST_PATH, "utf8"));
  const byUrl = {};
  for (const entry of raw.entries || []) {
    if (!entry.url || !entry.reason) {
      throw new Error(
        `verify-sources-allowlist.json: every entry needs "url" and "reason" (got ${JSON.stringify(entry)})`,
      );
    }
    byUrl[entry.url] = entry.reason;
  }
  return byUrl;
}

function findVersionDirs(dir) {
  // A "version dir" is any directory directly containing a schema.json.
  const out = [];
  walk(dir);
  return out;

  function walk(d) {
    let entries;
    try {
      entries = readdirSync(d);
    } catch {
      return;
    }
    if (entries.includes("schema.json")) {
      out.push(d);
    }
    for (const entry of entries) {
      const full = join(d, entry);
      let st;
      try {
        st = statSync(full);
      } catch {
        continue;
      }
      if (st.isDirectory()) walk(full);
    }
  }
}

// VERIFICATION.md routinely narrates dead ends on purpose — an "Alternative
// Forms Considered & Rejected" section citing a URL that the author already
// confirmed doesn't resolve is a sign of honest authoring, not a claim that
// needs re-verifying. Without this, checkUrl would hard-FAIL exactly the
// transparency this registry wants to encourage. If a URL's surrounding
// prose already discloses it as unreachable/rejected, don't treat a fresh
// "doesn't resolve" finding as new information.
const DISCLOSED_DEAD_RE =
  /\b(did not resolve|does(?:n't| not) resolve|no longer resolves?|not reachable|not independently confirmed reachable|dead end|not pursued|considered(?:\s*(?:&|and)\s*)?rejected|returns? 404|returned 404|enotfound|exit 6|screened[\s-]and[\s-]rejected|no longer live|blocked from direct)\b/i;
const CONTEXT_WINDOW = 250;

function extractUrls(text) {
  const found = new Map(); // url -> disclosedDead
  for (const m of text.matchAll(URL_RE)) {
    let url = m[0];
    const precededByQuote = m.index > 0 && text[m.index - 1] === "'";
    url = url.replace(TRAILING_PUNCT_RE, "");
    url = stripUnbalancedTrailingParen(url);
    url = stripUnbalancedTrailingBracket(url);
    url = stripWrappingTrailingQuote(url, precededByQuote);
    const start = Math.max(0, m.index - CONTEXT_WINDOW);
    const end = Math.min(text.length, m.index + m[0].length + CONTEXT_WINDOW);
    const context = text.slice(start, end);
    const disclosedDead = DISCLOSED_DEAD_RE.test(context);
    found.set(url, (found.get(url) || false) || disclosedDead);
  }
  return [...found.entries()].map(([url, disclosedDead]) => ({ url, disclosedDead }));
}

function isArchivalUrl(url) {
  try {
    const host = new URL(url).host;
    return host === "web.archive.org" || host.endsWith(".web.archive.org") || host === "archive.org";
  } catch {
    return false;
  }
}

async function fetchWithTimeout(url, opts = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    return await fetch(url, {
      redirect: "follow",
      signal: controller.signal,
      headers: { "user-agent": "GovSchema-source-verifier/1 (+https://github.com/hellogov-ai/govschema)" },
      ...opts,
    });
  } finally {
    clearTimeout(timer);
  }
}

// Classifies one fetch attempt outcome.
//   "ok"        - resolved (2xx/3xx-followed final status)
// "notfound"  - 404 or DNS/connection failure (the "does this exist at all" signal)
//   "blocked"   - 401/403/429 (bot/WAF-blocked, not evidence of nonexistence)
//   "transient" - 5xx, timeout, or other network error worth retrying
//   "other"     - any other status, treated like "blocked" (soft)
async function attemptOnce(url) {
  try {
    let res = await fetchWithTimeout(url, { method: "HEAD" });
    if (!res.ok) {
      // Many gov/gateway-fronted sites answer HEAD and GET inconsistently
      // (e.g. oss.go.id: HEAD 404s, GET 200s) rather than the standard-only
      // 405/501 "HEAD unsupported" signal. Never trust a non-2xx HEAD result
      // on its own — confirm with GET before calling a URL unresolvable.
      res = await fetchWithTimeout(url, { method: "GET" });
    }
    if (res.ok) return { kind: "ok", status: res.status };
    if (res.status === 404) return { kind: "notfound", status: res.status };
    if (res.status === 401 || res.status === 403 || res.status === 429) {
      return { kind: "blocked", status: res.status };
    }
    if (res.status >= 500) return { kind: "transient", status: res.status };
    return { kind: "other", status: res.status };
  } catch (err) {
    const code = err?.cause?.code || err?.code;
    if (code === "ENOTFOUND" || code === "EAI_AGAIN") {
      return { kind: "notfound", status: null, error: code };
    }
    if (err.name === "AbortError") {
      return { kind: "transient", status: null, error: "timeout" };
    }
    return { kind: "transient", status: null, error: code || err.message };
  }
}

async function fetchWithRetries(url) {
  let last = await attemptOnce(url);
  let attempts = 1;
  while (last.kind === "transient" && attempts <= RETRIES) {
    await new Promise((r) => setTimeout(r, RETRY_BACKOFF_MS * attempts));
    last = await attemptOnce(url);
    attempts += 1;
  }
  return { ...last, attempts };
}

async function hasWaybackHistory(url) {
  const cdx = `https://web.archive.org/cdx/search/cdx?url=${encodeURIComponent(url)}&output=json&limit=1`;
  for (let attempt = 0; attempt <= RETRIES; attempt++) {
    try {
      const res = await fetchWithTimeout(cdx, { method: "GET" });
      if (res.ok) {
        const rows = await res.json();
        return Array.isArray(rows) && rows.length > 1; // row 0 is the header
      }
    } catch {
      // fall through to retry/backoff below
    }
    if (attempt < RETRIES) await new Promise((r) => setTimeout(r, RETRY_BACKOFF_MS * (attempt + 1)));
  }
  return null; // CDX itself unreachable after retries — inconclusive, not a verdict either way
}

async function checkUrl(url, disclosedDead, allowlist) {
  if (allowlist[url]) {
    return { url, verdict: "SKIP", detail: `allowlisted: ${allowlist[url]}` };
  }

  const result = await fetchWithRetries(url);

  if (result.kind === "ok") {
    return { url, verdict: "PASS", detail: `HTTP ${result.status}` };
  }

  // The author's own prose already says this URL doesn't resolve (e.g. an
  // "Alternative Forms Considered & Rejected" dead end) — a fresh
  // confirmation that it still doesn't resolve is expected, not a new
  // finding, and must never block a merge.
  if (disclosedDead) {
    return {
      url,
      verdict: "INFO",
      detail: `unresolvable (${result.error || result.status}), but already disclosed as a known dead end in the surrounding text — not treated as a failure`,
    };
  }

  if (isArchivalUrl(url)) {
    // An archival citation is the "proof" that a dead live URL once existed.
    // If the proof itself doesn't resolve, that's a hard failure — same
    // severity as a fabricated live URL.
    return {
      url,
      verdict: "FAIL",
      detail: `archival citation does not resolve (${result.error || result.status})`,
    };
  }

  if (result.kind === "blocked") {
    return {
      url,
      verdict: "WARN",
      detail: `HTTP ${result.status} (bot/WAF-blocked from CI — not evidence of nonexistence; see gov-au-wayback-workaround precedent)`,
    };
  }

  if (result.kind === "transient") {
    return {
      url,
      verdict: "WARN",
      detail: `transient failure after ${result.attempts} attempt(s) (${result.error || result.status}) — tolerated, re-check manually if this persists`,
    };
  }

  if (result.kind === "notfound") {
    const history = await hasWaybackHistory(url);
    if (history === true) {
      return {
        url,
        verdict: "WARN",
        detail: "404/unresolvable, but Wayback Machine has prior snapshots — source moved or was retired, not fabricated. Cite an explicit web.archive.org URL for this source.",
      };
    }
    if (history === false) {
      return {
        url,
        verdict: "FAIL",
        detail: "404/unresolvable AND zero Wayback Machine history — this is the exact signature of a fabricated citation (GOV-1760). Remove or replace it, or add a reasoned tools/verify-sources-allowlist.json entry.",
      };
    }
    return {
      url,
      verdict: "WARN",
      detail: "404/unresolvable; Wayback CDX lookup was inconclusive after retries (network issue on our side, not a verdict on the URL) — re-run to get a definitive answer; do not treat this as confirmed-fabricated",
    };
  }

  return { url, verdict: "WARN", detail: `HTTP ${result.status ?? "?"} (unrecognized status, not treated as failure)` };
}

function collectDocText(dir) {
  const parts = [];
  for (const name of ["schema.json", "VERIFICATION.md"]) {
    const p = join(dir, name);
    if (existsSync(p)) parts.push(readFileSync(p, "utf8"));
  }
  return parts.join("\n");
}

function changedVersionDirs(baseRef) {
  let files;
  try {
    files = execFileSync("git", ["diff", "--name-only", `${baseRef}...HEAD`], {
      cwd: ROOT,
      encoding: "utf8",
    })
      .split("\n")
      .filter(Boolean);
  } catch (err) {
    log(`warning: git diff against ${baseRef} failed (${err.message}); falling back to full registry scan`);
    return null;
  }
  const dirs = new Set();
  for (const f of files) {
    if (!f.startsWith("registry" + sep) && !f.startsWith("registry/")) continue;
    if (!(f.endsWith("schema.json") || f.endsWith("VERIFICATION.md"))) continue;
    dirs.add(dirname(join(ROOT, f)));
  }
  return [...dirs].filter((d) => existsSync(join(d, "schema.json")));
}

async function main() {
  const args = process.argv.slice(2);
  const allowlist = loadAllowlist();

  let targetDirs;
  if (args.includes("--all")) {
    targetDirs = findVersionDirs(REGISTRY);
  } else if (args.includes("--base")) {
    const baseRef = args[args.indexOf("--base") + 1];
    targetDirs = changedVersionDirs(baseRef);
    if (targetDirs === null) targetDirs = findVersionDirs(REGISTRY);
  } else if (args.some((a) => !a.startsWith("--"))) {
    const paths = args.filter((a) => !a.startsWith("--"));
    targetDirs = paths.flatMap((p) => {
      const full = isAbsolute(p) ? p : join(ROOT, p);
      return existsSync(join(full, "schema.json")) ? [full] : findVersionDirs(full);
    });
  } else {
    // No explicit mode: infer from CI environment. Pull requests diff against
    // their base ref; anything else (local run, direct push) has no
    // meaningful single base commit to diff, so scan everything rather than
    // silently checking nothing.
    const baseRef = process.env.GITHUB_BASE_REF;
    if (baseRef) {
      targetDirs = changedVersionDirs(`origin/${baseRef}`);
      if (targetDirs === null) targetDirs = findVersionDirs(REGISTRY);
    } else {
      targetDirs = findVersionDirs(REGISTRY);
    }
  }

  if (targetDirs.length === 0) {
    log("verify-sources: no registry schema.json files in scope — nothing to check.");
    return 0;
  }

  log(`verify-sources: checking ${targetDirs.length} schema version director${targetDirs.length === 1 ? "y" : "ies"}...`);

  let anyFail = false;
  let totalUrls = 0;
  let totalWarn = 0;
  let totalSkip = 0;

  for (const dir of targetDirs.sort()) {
    const id = relative(REGISTRY, dir);
    const text = collectDocText(dir);
    const urls = extractUrls(text);
    if (urls.length === 0) continue;

    const results = await Promise.all(urls.map(({ url, disclosedDead }) => checkUrl(url, disclosedDead, allowlist)));
    totalUrls += results.length;

    const fails = results.filter((r) => r.verdict === "FAIL");
    const warns = results.filter((r) => r.verdict === "WARN");
    const skips = results.filter((r) => r.verdict === "SKIP");
    const infos = results.filter((r) => r.verdict === "INFO");
    totalWarn += warns.length;
    totalSkip += skips.length;

    if (fails.length === 0 && warns.length === 0 && skips.length === 0 && infos.length === 0) continue; // fully quiet pass

    log(`\n${id} (${urls.length} URL${urls.length === 1 ? "" : "s"})`);
    for (const r of [...fails, ...warns, ...skips, ...infos]) {
      log(`  [${r.verdict}] ${r.url}\n      ${r.detail}`);
    }
    if (fails.length > 0) anyFail = true;
  }

  log(
    `\nverify-sources: ${targetDirs.length} director${targetDirs.length === 1 ? "y" : "ies"}, ${totalUrls} URL${totalUrls === 1 ? "" : "s"} checked, ${totalWarn} warning(s), ${totalSkip} allowlisted, ${anyFail ? "FAIL" : "all clear"}.`,
  );

  return anyFail ? 1 : 0;
}

main().then((code) => process.exit(code));
