#!/usr/bin/env node
// get-verification-status: return { id, version, edition, status,
// verification } for one published GovSchema document by (id, version[,
// edition]). Thin CLI wrapper over @govschema/client — no logic of its own.
// See ../SKILL.md.
//
// Usage: node get-verification-status.mjs --id gb/hmpo/passport-renewal-adult --version 1.0.0 [--edition 2025]

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
  console.error("usage: get-verification-status.mjs --id <registry-id> --version <semver> [--edition <label>]");
  process.exit(1);
}

const client = new GovSchemaClient();
try {
  console.log(JSON.stringify(await client.getVerificationStatus(values), null, 2));
} catch (e) {
  console.error(e.message);
  process.exit(1);
}
