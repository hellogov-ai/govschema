#!/usr/bin/env node
// GovSchema full meta-schema validator (JSON Schema draft 2020-12).
//
// Companion to the zero-dependency `validate.mjs`. Where `validate.mjs`
// implements only the structural subset of JSON Schema that the meta-schema
// uses (so the registry can be checked with no install step), this tool runs
// the *full* JSON Schema draft 2020-12 meta-schema over every registry document
// using ajv + ajv-formats. It is the authority for SPEC §2's conformance clause:
// a document conforms to GovSchema N only if it validates against the meta-schema
// for the spec line it targets. Each document is validated against the
// meta-schema selected by its `govschemaVersion` (see META_SCHEMAS below), so a
// v0.1 document keeps validating against spec/v0.1 even after spec/v0.2 ships.
//
// It also full-validates any OPTIONAL sibling `mapping.json` companion artifact
// (spec v0.2, GSP-0011) against spec/v0.2/mapping.schema.json. Absence of
// mapping.json is never an error.
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

// One meta-schema per published spec MAJOR.MINOR line. A document is validated
// against the meta-schema for the `govschemaVersion` it declares (SPEC §2), so a
// v0.1 document keeps validating against v0.1 even after v0.2 ships.
const META_SCHEMAS = {
  "0.1": join(ROOT, "spec", "v0.1", "govschema.schema.json"),
  "0.2": join(ROOT, "spec", "v0.2", "govschema.schema.json"),
};

// mapping.json (GSP-0011) is a v0.2+ artifact — there is no v0.1 mapping
// meta-schema. A mapping.json is validated against the mapping meta-schema for
// the sibling schema.json's spec line.
const MAPPING_META_SCHEMAS = {
  "0.2": join(ROOT, "spec", "v0.2", "mapping.schema.json"),
};

// Map a govschemaVersion (e.g. "0.2.0") to its spec line key (e.g. "0.2").
function specLine(version) {
  const m = /^(\d+)\.(\d+)\./.exec(version || "");
  return m ? `${m[1]}.${m[2]}` : null;
}

function findSchemas(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) out.push(...findSchemas(p));
    else if (entry === "schema.json") out.push(p);
  }
  return out;
}

function findMappings(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) out.push(...findMappings(p));
    else if (entry === "mapping.json") out.push(p);
  }
  return out;
}

function compileMetaSchemas(ajv, metaSchemaPaths) {
  const validators = {};
  for (const [line, path] of Object.entries(metaSchemaPaths)) {
    let metaSchema;
    try {
      metaSchema = JSON.parse(readFileSync(path, "utf8"));
    } catch (e) {
      console.error(`FATAL: cannot read meta-schema ${relative(ROOT, path)}: ${e.message}`);
      process.exit(2);
    }
    try {
      validators[line] = ajv.compile(metaSchema);
    } catch (e) {
      console.error(`FATAL: meta-schema ${relative(ROOT, path)} does not compile: ${e.message}`);
      process.exit(2);
    }
  }
  return validators;
}

function main() {
  const args = process.argv.slice(2);
  const files = args.length
    ? args.filter((f) => f.endsWith("schema.json"))
    : findSchemas(REGISTRY);
  const mappingFiles = args.length
    ? args.filter((f) => f.endsWith("mapping.json"))
    : findMappings(REGISTRY);

  const ajv = new Ajv2020({ allErrors: true, strict: false });
  addFormats(ajv);

  // Compile every published meta-schema up front; dispatch per document below.
  const validators = compileMetaSchemas(ajv, META_SCHEMAS);
  const mappingValidators = compileMetaSchemas(ajv, MAPPING_META_SCHEMAS);

  if (files.length === 0 && mappingFiles.length === 0) {
    console.log("No schemas found under registry/. Nothing to validate.");
    return;
  }

  let failed = 0;
  // dirname(schema.json) -> spec line, so a sibling mapping.json (GSP-0011,
  // no govschemaVersion of its own) validates against the mapping meta-schema
  // for the spec line the schema it describes actually targets.
  const schemaDirLine = new Map();
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

    // Select the meta-schema for the spec line this document targets (SPEC §2).
    const line = specLine(doc.govschemaVersion);
    const validate = line && validators[line];
    if (!validate) {
      console.error(`FAIL ${label}`);
      console.error(
        `  - (root) unknown/unsupported govschemaVersion: ${doc.govschemaVersion}` +
          ` (known spec lines: ${Object.keys(validators).join(", ")})`
      );
      failed++;
      continue;
    }

    schemaDirLine.set(dirname(file), line);

    if (validate(doc)) {
      console.log(`ok   ${label} [v${line}]`);
    } else {
      console.error(`FAIL ${label} [v${line}]`);
      for (const err of validate.errors) {
        const where = err.instancePath || "(root)";
        console.error(`  - ${where} ${err.message}` + (err.params && Object.keys(err.params).length ? ` ${JSON.stringify(err.params)}` : ""));
      }
      failed++;
    }
  }

  let mappingFailed = 0;
  for (const file of mappingFiles) {
    const label = relative(ROOT, file);
    let doc;
    try {
      doc = JSON.parse(readFileSync(file, "utf8"));
    } catch (e) {
      console.error(`FAIL ${label}\n  - invalid JSON: ${e.message}`);
      mappingFailed++;
      continue;
    }

    const line = schemaDirLine.get(dirname(file));
    const validate = line && mappingValidators[line];
    if (!validate) {
      console.error(`FAIL ${label}`);
      console.error(
        `  - (root) no supported mapping meta-schema for this mapping.json's sibling schema` +
          ` (known spec lines: ${Object.keys(mappingValidators).join(", ")})`
      );
      mappingFailed++;
      continue;
    }

    if (validate(doc)) {
      console.log(`ok   ${label} [mapping v${line}]`);
    } else {
      console.error(`FAIL ${label} [mapping v${line}]`);
      for (const err of validate.errors) {
        const where = err.instancePath || "(root)";
        console.error(`  - ${where} ${err.message}` + (err.params && Object.keys(err.params).length ? ` ${JSON.stringify(err.params)}` : ""));
      }
      mappingFailed++;
    }
  }

  console.log(
    `\n${files.length - failed}/${files.length} document(s) validated against the meta-schema (ajv 2020-12).` +
      (mappingFiles.length
        ? ` ${mappingFiles.length - mappingFailed}/${mappingFiles.length} mapping.json companion(s) validated.`
        : "")
  );
  process.exit(failed || mappingFailed ? 1 : 0);
}

main();
