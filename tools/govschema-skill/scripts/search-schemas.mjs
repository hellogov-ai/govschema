#!/usr/bin/env node
// search-schemas: search the registry index by jurisdiction, GovSchema
// process type, or free text. Thin CLI wrapper over @govschema/client — no
// logic of its own. See ../SKILL.md.
//
// Usage: node search-schemas.mjs [--country GB] [--level national]
//                                 [--subdivision US-CA] [--process renewal]
//                                 [--q passport]

import { parseArgs } from "node:util";
import { GovSchemaClient } from "@govschema/client";

const { values } = parseArgs({
  options: {
    country: { type: "string" },
    level: { type: "string" },
    subdivision: { type: "string" },
    process: { type: "string" },
    q: { type: "string" },
  },
});

const client = new GovSchemaClient();
console.log(JSON.stringify({ schemas: client.search(values) }, null, 2));
