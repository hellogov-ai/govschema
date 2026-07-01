#!/usr/bin/env node
// Self-test for @govschema/mcp-server. Exercises each registered tool's
// handler directly (no stdio transport, no MCP client needed) against the
// real registry via @govschema/client. Run via `npm test` or `node test.mjs`.

import { GovSchemaClient } from "@govschema/client";
import { registerTools } from "./server.mjs";

let failures = 0;
function assert(cond, message) {
  if (!cond) throw new Error(message || "assertion failed");
}

// Minimal stand-in for McpServer: registerTool just records the handler so
// tests can call it directly, exactly like a real MCP client invocation would.
class FakeServer {
  constructor() {
    this.tools = new Map();
  }
  registerTool(name, config, handler) {
    this.tools.set(name, { config, handler });
  }
}

function jsonOf(result) {
  return JSON.parse(result.content[0].text);
}

const server = new FakeServer();
registerTools(server, new GovSchemaClient());

const EXPECTED_TOOLS = ["list_schemas", "search_schemas", "get_schema", "validate_document", "get_verification_status"];

async function check(name, fn) {
  try {
    await fn();
    console.log(`ok   ${name}`);
  } catch (e) {
    console.error(`FAIL ${name}\n  ${e.stack || e.message}`);
    failures++;
  }
}

await check("registers exactly the read-only reference tools, no submit tool", () => {
  const names = [...server.tools.keys()].sort();
  assert(JSON.stringify(names) === JSON.stringify([...EXPECTED_TOOLS].sort()), `unexpected tool set: ${names}`);
  for (const [name, { config }] of server.tools) {
    assert(config.annotations?.readOnlyHint === true, `${name} must be marked readOnlyHint: true`);
    assert(config.annotations?.destructiveHint === false, `${name} must be marked destructiveHint: false`);
  }
  assert(!names.some((n) => /submit|fill|apply|autofill|post/i.test(n)), "no submit-style tool may ever be registered");
});

await check("list_schemas returns the registry index", async () => {
  const result = await server.tools.get("list_schemas").handler({});
  const body = jsonOf(result);
  assert(Array.isArray(body.schemas) && body.schemas.length > 0);
});

await check("search_schemas filters by country", async () => {
  const result = await server.tools.get("search_schemas").handler({ country: "GB" });
  const body = jsonOf(result);
  assert(body.schemas.every((e) => e.jurisdiction.country === "GB"));
});

await check("get_schema fetches a known document", async () => {
  const result = await server
    .tools.get("get_schema")
    .handler({ id: "gb/hmpo/passport-renewal-adult", version: "1.0.0" });
  const doc = jsonOf(result);
  assert(doc.id === "gb/hmpo/passport-renewal-adult");
});

await check("validate_document validates a known-good document", async () => {
  const docResult = await server
    .tools.get("get_schema")
    .handler({ id: "gb/hmpo/passport-renewal-adult", version: "1.0.0" });
  const doc = jsonOf(docResult);
  const result = await server.tools.get("validate_document").handler({ document: doc });
  const body = jsonOf(result);
  assert(body.valid === true, `expected valid, got: ${JSON.stringify(body.errors)}`);
});

await check("get_verification_status returns a verification block", async () => {
  const result = await server
    .tools.get("get_verification_status")
    .handler({ id: "gb/hmpo/passport-renewal-adult", version: "1.0.0" });
  const body = jsonOf(result);
  assert(body.verification && body.verification.method);
});

console.log(`\n${failures === 0 ? "all checks passed" : `${failures} check(s) FAILED`}`);
process.exit(failures ? 1 : 0);
