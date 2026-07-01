#!/usr/bin/env node
// Regenerates registry-index.json from registry/. The client (index.mjs)
// ships this file so listSchemas()/search() work with no network call and no
// local registry checkout; getSchema()/validate() still read the live
// document (locally or over HTTPS) rather than trusting index contents for
// anything beyond discovery.
//
// Usage: node generate-index.mjs   (run after any registry/ change; CI checks
// the committed file is not stale — see test.mjs).

import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join, dirname, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..", "..");
const REGISTRY = join(ROOT, "registry");
const OUT = join(HERE, "registry-index.json");

function findSchemas(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) out.push(...findSchemas(p));
    else if (entry === "schema.json") out.push(p);
  }
  return out;
}

export function buildIndex() {
  const files = findSchemas(REGISTRY).sort();
  const schemas = files.map((file) => {
    const doc = JSON.parse(readFileSync(file, "utf8"));
    const path = relative(ROOT, file).split(sep).join("/");
    return {
      id: doc.id,
      version: doc.version,
      edition: doc.edition?.label ?? null,
      path,
      govschemaVersion: doc.govschemaVersion,
      title: doc.title,
      status: doc.status,
      jurisdiction: doc.jurisdiction,
      authority: doc.authority,
      process: doc.process,
      verification: doc.verification
        ? {
            lastVerifiedAt: doc.verification.lastVerifiedAt,
            nextReviewBy: doc.verification.nextReviewBy,
          }
        : null,
      license: doc.license,
    };
  });
  return { schemaCount: schemas.length, schemas };
}

function main() {
  const index = buildIndex();
  writeFileSync(OUT, JSON.stringify(index, null, 2) + "\n");
  console.log(`Wrote ${index.schemaCount} entries to ${relative(ROOT, OUT)}`);
}

if (import.meta.url === `file://${process.argv[1]}`) main();
