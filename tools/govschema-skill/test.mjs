#!/usr/bin/env node
// Self-test for @govschema/skill. Runs every script as a real child process
// (exactly how an agent's Bash tool would invoke it) rather than importing
// it as a module, so this also exercises argv parsing and process exit
// codes. Zero test framework, consistent with the rest of tools/. Run via
// `npm test` or `node test.mjs`.

import { execFileSync } from "node:child_process";
import { readdirSync, writeFileSync, unlinkSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const SCRIPTS_DIR = join(HERE, "scripts");

let failures = 0;
async function check(name, fn) {
  try {
    await fn();
    console.log(`ok   ${name}`);
  } catch (e) {
    console.error(`FAIL ${name}\n  ${e.stack || e.message}`);
    failures++;
  }
}

function assert(cond, message) {
  if (!cond) throw new Error(message || "assertion failed");
}

function run(script, args = [], opts = {}) {
  return JSON.parse(execFileSync("node", [join(SCRIPTS_DIR, script), ...args], { encoding: "utf8", ...opts }));
}

const EXPECTED_SCRIPTS = [
  "list-schemas.mjs",
  "search-schemas.mjs",
  "get-schema.mjs",
  "validate-document.mjs",
  "get-verification-status.mjs",
];

await check("exposes exactly the read-only reference scripts, no submit script", () => {
  const names = readdirSync(SCRIPTS_DIR).sort();
  assert(JSON.stringify(names) === JSON.stringify([...EXPECTED_SCRIPTS].sort()), `unexpected script set: ${names}`);
  assert(!names.some((n) => /submit|fill|apply|autofill|post/i.test(n)), "no submit-style script may ever be added");
});

await check("list-schemas.mjs returns the registry index", () => {
  const body = run("list-schemas.mjs");
  assert(Array.isArray(body.schemas) && body.schemas.length > 0);
});

await check("search-schemas.mjs filters by country", () => {
  const body = run("search-schemas.mjs", ["--country", "GB"]);
  assert(body.schemas.every((e) => e.jurisdiction.country === "GB"));
});

await check("get-schema.mjs fetches a known document", () => {
  const doc = run("get-schema.mjs", ["--id", "gb/hmpo/passport-renewal-adult", "--version", "1.0.0"]);
  assert(doc.id === "gb/hmpo/passport-renewal-adult");
});

await check("get-schema.mjs exits 1 with a usage error when required args are missing", () => {
  let threw = false;
  try {
    execFileSync("node", [join(SCRIPTS_DIR, "get-schema.mjs")], { encoding: "utf8" });
  } catch (e) {
    threw = true;
    assert(e.status === 1, `expected exit code 1, got ${e.status}`);
  }
  assert(threw, "expected get-schema.mjs to fail without --id/--version");
});

await check("validate-document.mjs validates a known-good document from a file", () => {
  const doc = run("get-schema.mjs", ["--id", "gb/hmpo/passport-renewal-adult", "--version", "1.0.0"]);
  const tmpPath = join(HERE, ".tmp-test-doc.json");
  writeFileSync(tmpPath, JSON.stringify(doc));
  try {
    const result = run("validate-document.mjs", [tmpPath]);
    assert(result.valid === true, `expected valid, got: ${JSON.stringify(result.errors)}`);
  } finally {
    unlinkSync(tmpPath);
  }
});

await check("validate-document.mjs validates a known-good document from stdin", () => {
  const doc = run("get-schema.mjs", ["--id", "gb/hmpo/passport-renewal-adult", "--version", "1.0.0"]);
  const result = run("validate-document.mjs", [], { input: JSON.stringify(doc) });
  assert(result.valid === true, `expected valid, got: ${JSON.stringify(result.errors)}`);
});

await check("get-verification-status.mjs returns a verification block", () => {
  const body = run("get-verification-status.mjs", ["--id", "gb/hmpo/passport-renewal-adult", "--version", "1.0.0"]);
  assert(body.verification && body.verification.method);
});

console.log(`\n${failures === 0 ? "all checks passed" : `${failures} check(s) FAILED`}`);
process.exit(failures ? 1 : 0);
