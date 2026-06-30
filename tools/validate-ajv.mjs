#!/usr/bin/env node
// GovSchema full meta-schema validator (JSON Schema draft 2020-12).
//
// Companion to the zero-dependency `validate.mjs`. Where `validate.mjs`
// implements only the structural subset of JSON Schema that the meta-schema
// uses (so the registry can be checked with no install step), this tool runs
// the *full* JSON Schema draft 2020-12 meta-schema
// (`spec/v0.1/govschema.schema.json`) over every registry document using ajv +
// ajv-formats. It is the authority for SPEC §2's conformance clause: a document
// conforms to GovSchema 0.1 only if it validates against the meta-schema.
//
// This requires the dev dependencies declared in tools/package.json:
//   cd tools && npm ci
//
// Usage:
//   node tools/validate-ajv.mjs                 # validate every schema in registry/
//   node tools/validate-ajv.mjs <path/to/schema.json> [...]
//
// Exit code 0 if all documents validate, 1 otherwise.

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const REGISTRY = join(ROOT, "registry");
const META_SCHEMA = join(ROOT, "spec", "v0.1", "govschema.schema.json");

function findSchemas(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) out.push(...findSchemas(p));
    else if (entry === "schema.json") out.push(p);
  }
  return out;
}

function main() {
  const args = process.argv.slice(2);
  const files = args.length ? args : findSchemas(REGISTRY);

  const ajv = new Ajv2020({ allErrors: true, strict: false });
  addFormats(ajv);

  let metaSchema;
  try {
    metaSchema = JSON.parse(readFileSync(META_SCHEMA, "utf8"));
  } catch (e) {
    console.error(`FATAL: cannot read meta-schema ${relative(ROOT, META_SCHEMA)}: ${e.message}`);
    process.exit(2);
  }

  let validate;
  try {
    validate = ajv.compile(metaSchema);
  } catch (e) {
    console.error(`FATAL: meta-schema does not compile: ${e.message}`);
    process.exit(2);
  }

  if (files.length === 0) {
    console.log("No schemas found under registry/. Nothing to validate.");
    return;
  }

  let failed = 0;
  for (const file of files) {
    const label = relative(ROOT, file);
    let doc;
    try {
      doc = JSON.parse(readFileSync(file, "utf8"));
    } catch (e) {
      console.error(`FAIL ${label}\n  - invalid JSON: ${e.message}`);
      failed++;
      continue;
    }

    if (validate(doc)) {
      console.log(`ok   ${label}`);
    } else {
      console.error(`FAIL ${label}`);
      for (const err of validate.errors) {
        const where = err.instancePath || "(root)";
        console.error(`  - ${where} ${err.message}` + (err.params && Object.keys(err.params).length ? ` ${JSON.stringify(err.params)}` : ""));
      }
      failed++;
    }
  }

  console.log(`\n${files.length - failed}/${files.length} document(s) validated against the meta-schema (ajv 2020-12).`);
  process.exit(failed ? 1 : 0);
}

main();
