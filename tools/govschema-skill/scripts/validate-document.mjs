#!/usr/bin/env node
// validate-document: validate a JSON document against the GovSchema
// meta-schema for the spec line named by its own `govschemaVersion` (the
// same check tools/validate-ajv.mjs runs in CI). Thin CLI wrapper over
// @govschema/client — no logic of its own. See ../SKILL.md.
//
// Reads the document from a file path argument, or from stdin if omitted
// or passed as "-".
//
// Usage: node validate-document.mjs <path-to-document.json>
//        cat document.json | node validate-document.mjs

import { readFileSync } from "node:fs";
import { GovSchemaClient } from "@govschema/client";

const [path] = process.argv.slice(2);
const raw = !path || path === "-" ? readFileSync(0, "utf8") : readFileSync(path, "utf8");

let document;
try {
  document = JSON.parse(raw);
} catch (e) {
  console.error(`not valid JSON: ${e.message}`);
  process.exit(1);
}

const client = new GovSchemaClient();
console.log(JSON.stringify(await client.validate(document), null, 2));
