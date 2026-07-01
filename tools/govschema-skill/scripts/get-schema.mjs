#!/usr/bin/env node
// get-schema: fetch one published GovSchema document by (id, version[,
// edition]). Reads a local registry checkout when available, otherwise
// fetches the immutable published file over HTTPS. Thin CLI wrapper over
// @govschema/client — no logic of its own. See ../SKILL.md.
//
// Usage: node get-schema.mjs --id gb/hmpo/passport-renewal-adult --version 1.0.0 [--edition 2025]

import { parseArgs } from "node:util";
import { GovSchemaClient } from "@govschema/client";

const { values } = parseArgs({
  options: {
    id: { type: "string" },
    version: { type: "string" },
    edition: { type: "string" },
  },
});

if (!values.id || !values.version) {
  console.error("usage: get-schema.mjs --id <registry-id> --version <semver> [--edition <label>]");
  process.exit(1);
}

const client = new GovSchemaClient();
try {
  console.log(JSON.stringify(await client.getSchema(values), null, 2));
} catch (e) {
  console.error(e.message);
  process.exit(1);
}
