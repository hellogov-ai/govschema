#!/usr/bin/env node
// list-schemas: print published GovSchema registry index entries, optionally
// filtered by status. Thin CLI wrapper over @govschema/client — no logic of
// its own. See ../SKILL.md.
//
// Usage: node list-schemas.mjs [--status draft|verified|deprecated]

import { parseArgs } from "node:util";
import { GovSchemaClient } from "@govschema/client";

const { values } = parseArgs({
  options: { status: { type: "string" } },
});

const client = new GovSchemaClient();
console.log(JSON.stringify({ schemas: client.listSchemas({ status: values.status }) }, null, 2));
