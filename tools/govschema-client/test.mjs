#!/usr/bin/env node
// Self-test for @govschema/client. Zero test framework dependency, consistent
// with the rest of tools/. Run via `npm test` (from this directory) or
// `node test.mjs`. Exits 1 on any failure.

import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { GovSchemaClient, GovSchemaNotFoundError } from "./index.mjs";
import { buildIndex } from "./generate-index.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));

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

// The committed registry-index.json must match what generate-index.mjs would
// produce right now — catches "forgot to regenerate after a registry change".
await check("registry-index.json is up to date", () => {
  const committed = JSON.parse(readFileSync(join(HERE, "registry-index.json"), "utf8"));
  const fresh = buildIndex();
  assert(
    JSON.stringify(committed) === JSON.stringify(fresh),
    "registry-index.json is stale — run `npm run build-index` and commit the result"
  );
});

const client = new GovSchemaClient();

await check("registryRoot auto-detected (local checkout)", () => {
  assert(client.registryRoot, "expected findLocalRoot() to find the repo root when run in-tree");
});

await check("listSchemas returns published documents", () => {
  const all = client.listSchemas();
  assert(all.length > 0, "expected at least one indexed schema");
  const draft = client.listSchemas({ status: "draft" });
  assert(draft.every((e) => e.status === "draft"), "status filter must only return drafts");
});

await check("search filters by country and process type", () => {
  const gb = client.search({ country: "gb" });
  assert(gb.length > 0, "expected GB entries");
  assert(gb.every((e) => e.jurisdiction.country === "GB"), "country filter is case-insensitive but must match exactly");

  const renewals = client.search({ country: "GB", process: "renewal" });
  assert(renewals.every((e) => e.process?.type === "renewal"), "process filter must match");

  const byText = client.search({ q: "passport" });
  assert(byText.length > 0, "free-text search should find passport-related entries");
});

const KNOWN = { id: "gb/hmpo/passport-renewal-adult", version: "1.0.0" };

await check("getSchema fetches a known document", async () => {
  const doc = await client.getSchema(KNOWN);
  assert(doc.id === KNOWN.id, "id mismatch");
  assert(doc.version === KNOWN.version, "version mismatch");
  assert(Array.isArray(doc.fields) && doc.fields.length > 0, "expected fields[]");
});

await check("getSchema rejects an unknown document", async () => {
  let threw = false;
  try {
    await client.getSchema({ id: "zz/does-not-exist", version: "9.9.9" });
  } catch (e) {
    threw = e instanceof GovSchemaNotFoundError;
  }
  assert(threw, "expected GovSchemaNotFoundError for a nonexistent document");
});

await check("validate accepts a known-good document", async () => {
  const doc = await client.getSchema(KNOWN);
  const result = await client.validate(doc);
  assert(result.valid === true, `expected valid document, got errors: ${JSON.stringify(result.errors)}`);
});

await check("validate rejects a document missing required members", async () => {
  const result = await client.validate({ govschemaVersion: "0.2.0", id: "x/y", version: "1.0.0" });
  assert(result.valid === false, "expected invalid");
  assert(result.errors.length > 0, "expected errors");
});

await check("validate rejects a malformed govschemaVersion", async () => {
  const result = await client.validate({ govschemaVersion: "not-a-semver" });
  assert(result.valid === false && /unknown\/unsupported govschemaVersion/.test(result.errors[0].message));
});

await check("validate rejects a well-formed but unpublished spec line", async () => {
  const result = await client.validate({ govschemaVersion: "9.9.9" });
  assert(result.valid === false && /cannot load meta-schema/.test(result.errors[0].message));
});

await check("getVerificationStatus returns status and verification block", async () => {
  const status = await client.getVerificationStatus(KNOWN);
  assert(status.id === KNOWN.id);
  assert(status.verification && status.verification.method, "expected a verification.method");
});

console.log(`\n${failures === 0 ? "all checks passed" : `${failures} check(s) FAILED`}`);
process.exit(failures ? 1 : 0);
