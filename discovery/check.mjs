#!/usr/bin/env node
// GovSchema discovery-catalog integrity check.
//
// The discovery catalog (discovery/catalog.json) is a planning artifact, not a
// registry document, so tools/validate.mjs does not look at it. This check keeps
// it internally honest with zero dependencies:
//   1. it is valid JSON with a candidates array;
//   2. every proposedId matches the registry id pattern and is unique;
//   3. tier is 1, 2, or 3 and status is "candidate" or "published";
//   4. processType is a spec process.type value;
//   5. every entry marked "published" actually resolves to a schema under
//      registry/<proposedId>/<version>/schema.json (so the catalog can never
//      claim something is shipped when it isn't).
//
// Usage: node discovery/check.mjs   (exit 0 if clean, 1 otherwise)

import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..");
const CATALOG = join(HERE, "catalog.json");

const ID_RE = /^[a-z]{2}(\/[a-z0-9-]+){2,}$/;
const TIERS = new Set([1, 2, 3]);
const STATUSES = new Set(["candidate", "published"]);
const PROCESS_TYPES = new Set([
  "application", "registration", "renewal", "amendment", "filing", "request", "other",
]);

const errs = [];
let catalog;
try {
  catalog = JSON.parse(readFileSync(CATALOG, "utf8"));
} catch (e) {
  console.error(`FAIL discovery/catalog.json\n  - invalid JSON: ${e.message}`);
  process.exit(1);
}

if (!Array.isArray(catalog.candidates) || catalog.candidates.length === 0) {
  errs.push("candidates must be a non-empty array");
}

const seen = new Set();
for (const [i, c] of (catalog.candidates || []).entries()) {
  const at = `candidates[${i}] (${c.proposedId || "?"})`;
  if (!ID_RE.test(c.proposedId || ""))
    errs.push(`${at}: proposedId does not match registry id pattern`);
  if (seen.has(c.proposedId)) errs.push(`${at}: duplicate proposedId`);
  seen.add(c.proposedId);
  if (!c.title) errs.push(`${at}: title is required`);
  if (!TIERS.has(c.tier)) errs.push(`${at}: tier must be 1, 2, or 3`);
  if (!STATUSES.has(c.status)) errs.push(`${at}: status must be candidate or published`);
  if (!PROCESS_TYPES.has(c.processType))
    errs.push(`${at}: processType "${c.processType}" is not a spec process.type`);
  if (c.status === "published") {
    if (!c.version) {
      errs.push(`${at}: published entries must declare a version`);
    } else {
      const schemaPath = join(ROOT, "registry", c.proposedId, c.version, "schema.json");
      if (!existsSync(schemaPath))
        errs.push(`${at}: marked published but no schema at registry/${c.proposedId}/${c.version}/schema.json`);
    }
  }
}

if (errs.length) {
  console.error("FAIL discovery/catalog.json");
  for (const e of errs) console.error(`  - ${e}`);
  process.exit(1);
}
const n = catalog.candidates.length;
const pub = catalog.candidates.filter((c) => c.status === "published").length;
console.log(`ok   discovery/catalog.json — ${n} candidate(s), ${pub} published, ${n - pub} to author.`);
