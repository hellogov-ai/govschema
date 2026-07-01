#!/usr/bin/env node
// GovSchema reference MCP server.
//
// Read-only. Exposes the shared lookup/validate core (@govschema/client) as
// MCP tools: list_schemas, search_schemas, get_schema, validate_document,
// get_verification_status.
//
// This is non-normative reference tooling, parallel in spirit to
// tools/validate.mjs — not part of the GovSchema standard. A GovSchema
// document remains fully usable via plain HTTPS fetch + JSON Schema
// validation with no MCP server involved; see README.md and the root
// README.md / llms.txt.
//
// Hard boundary (AGENTS.md §5, GOVERNANCE.md): GovSchema describes government
// processes, it does not submit them. This server exposes read-only lookup
// and validation tools ONLY. It must never gain a "submit"-style tool (form
// fill, POST to a government site, browser automation that enters data,
// etc.) without CEO sign-off first.

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import * as z from "zod";
import { GovSchemaClient } from "@govschema/client";

const JURISDICTION_LEVELS = ["national", "subnational", "municipal", "supranational"];
const PROCESS_TYPES = ["application", "registration", "renewal", "amendment", "filing", "request", "other"];
const READ_ONLY = { readOnlyHint: true, destructiveHint: false };

function textResult(value) {
  return { content: [{ type: "text", text: JSON.stringify(value, null, 2) }] };
}

/** Registers every tool this server exposes onto `server`, backed by `client`. Exported for tests. */
export function registerTools(server, client) {
  server.registerTool(
    "list_schemas",
    {
      title: "List GovSchema documents",
      description:
        "List published GovSchema reference documents from the registry index, optionally filtered by status (draft | verified | deprecated). Non-normative reference lookup, read-only.",
      inputSchema: {
        status: z.enum(["draft", "verified", "deprecated"]).optional().describe("Filter by document status"),
      },
      annotations: { ...READ_ONLY, openWorldHint: false },
    },
    async ({ status } = {}) => textResult({ schemas: client.listSchemas({ status }) })
  );

  server.registerTool(
    "search_schemas",
    {
      title: "Search GovSchema documents",
      description:
        "Search the registry index by jurisdiction (ISO 3166-1 alpha-2 country, level, ISO 3166-2 subdivision), GovSchema process type, or free text over id/title/authority. Read-only.",
      inputSchema: {
        country: z.string().length(2).optional().describe("ISO 3166-1 alpha-2 country code, e.g. 'GB'"),
        level: z.enum(JURISDICTION_LEVELS).optional().describe("Jurisdiction level"),
        subdivision: z.string().optional().describe("ISO 3166-2 subdivision code, e.g. 'US-CA'"),
        process: z.enum(PROCESS_TYPES).optional().describe("GovSchema process.type"),
        q: z.string().optional().describe("Free-text search over id, title, and authority name"),
      },
      annotations: { ...READ_ONLY, openWorldHint: false },
    },
    async (args = {}) => textResult({ schemas: client.search(args) })
  );

  server.registerTool(
    "get_schema",
    {
      title: "Get a GovSchema document",
      description:
        "Fetch one published GovSchema document by (id, version[, edition]). Reads from a local registry checkout when available, otherwise fetches the immutable published file over HTTPS. Read-only.",
      inputSchema: {
        id: z.string().describe("Registry id, e.g. 'gb/hmpo/passport-renewal-adult'"),
        version: z.string().describe("SemVer version directory, e.g. '1.0.0'"),
        edition: z
          .string()
          .optional()
          .describe("Edition label for time-versioned forms, e.g. '2025' (spec v0.2, GSP-0005)"),
      },
      annotations: { ...READ_ONLY, openWorldHint: true },
    },
    async ({ id, version, edition }) => textResult(await client.getSchema({ id, version, edition }))
  );

  server.registerTool(
    "validate_document",
    {
      title: "Validate a document against the GovSchema meta-schema",
      description:
        "Validate a JSON document against the GovSchema meta-schema for the spec line named by its own govschemaVersion (JSON Schema draft 2020-12, via ajv — the same check tools/validate-ajv.mjs runs in CI). Read-only: never writes, stores, or submits the document anywhere.",
      inputSchema: {
        document: z.record(z.string(), z.unknown()).describe("The candidate GovSchema document (a parsed JSON object)"),
      },
      annotations: { ...READ_ONLY, openWorldHint: true },
    },
    async ({ document }) => textResult(await client.validate(document))
  );

  server.registerTool(
    "get_verification_status",
    {
      title: "Get a GovSchema document's verification status",
      description:
        "Return the status and verification block (method, lastVerifiedAt, nextReviewBy) for one published GovSchema document by (id, version[, edition]). Read-only.",
      inputSchema: {
        id: z.string().describe("Registry id, e.g. 'gb/hmpo/passport-renewal-adult'"),
        version: z.string().describe("SemVer version directory, e.g. '1.0.0'"),
        edition: z.string().optional().describe("Edition label for time-versioned forms, e.g. '2025'"),
      },
      annotations: { ...READ_ONLY, openWorldHint: true },
    },
    async ({ id, version, edition }) => textResult(await client.getVerificationStatus({ id, version, edition }))
  );
}

export function createServer(client = new GovSchemaClient()) {
  const server = new McpServer({ name: "govschema-mcp-server", version: "0.1.0" });
  registerTools(server, client);
  return server;
}

async function main() {
  const server = createServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("govschema-mcp-server: running on stdio (read-only, non-normative reference tooling).");
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error("govschema-mcp-server: fatal error:", error);
    process.exit(1);
  });
}
