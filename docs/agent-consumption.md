# How agents consume GovSchema

This guide lists every supported way an AI agent can consume GovSchema data,
side by side, so you can pick the layer that fits your stack. Read it in
order: each layer after the first is an **optional convenience wrapper**
around the same underlying data. None of them are required, none of them
gate the standard, and none of them do anything the first layer can't already
do on its own.

| # | Path | What it adds over raw fetch | Required? |
|---|------|------------------------------|-----------|
| 1 | [Raw fetch + JSON Schema validation](#1-raw-fetch--json-schema-validation-the-baseline) | Nothing — this *is* the standard. | Yes — always valid, works everywhere. |
| 2 | [`llms.txt`](#2-llmstxt-the-discovery-entry-point) | A one-fetch index of everything else. | No — a convenience for discovery. |
| 3 | [Reference MCP server](#3-reference-mcp-server) | Tool-call ergonomics for MCP-aware agents. | No — thin wrapper over #1. |
| 4 | [Installable Skill](#4-installable-skill) | Same tools, packaged for Claude-family agents. | No — thin wrapper over #1. |

If you remember one thing from this page: **a GovSchema document is a plain
JSON file at a stable URL, validated by a plain JSON Schema.** Everything
below layer 1 exists to save you typing, not to add a capability you'd
otherwise lack.

## 1. Raw fetch + JSON Schema validation (the baseline)

Every published GovSchema document lives at a deterministic path —
[`registry/<id>/<version>/schema.json`](../registry/README.md) — and
validates against the meta-schema for the spec line it declares in its own
`govschemaVersion` (currently
[`spec/v0.2/govschema.schema.json`](../spec/v0.2/govschema.schema.json), with
[`spec/v0.1`](../spec/v0.1/govschema.schema.json) still conforming). Fetch it
over plain HTTPS, validate it with any JSON Schema draft 2020-12
implementation, and you're done — no SDK, no install, no account.

```js
// Any language with an HTTPS client and a JSON Schema 2020-12 validator works.
// This example uses ajv, but the meta-schema is a standard JSON Schema document.
import Ajv from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const base = "https://raw.githubusercontent.com/hellogov-ai/govschema/main";

const doc = await fetch(
  `${base}/registry/gb/hmpo/passport-renewal-adult/1.0.0/schema.json`
).then((r) => r.json());

const metaSchema = await fetch(
  `${base}/spec/v0.2/govschema.schema.json`
).then((r) => r.json());

const ajv = new Ajv({ strict: false });
addFormats(ajv);
const valid = ajv.validate(metaSchema, doc);
```

Pin a specific `(id, version)` for reproducibility. Published version
directories are immutable, so the same pin always resolves to the same
bytes (see [`VERSIONING.md`](../VERSIONING.md)). To discover what's
available, list or clone [`registry/`](../registry) directly, or read the
[discovery catalog](../discovery/catalog.json) for what's coming next.

This path has no dependency on any tooling in this repository. It will
remain fully sufficient forever: layers 2–4 exist only to make it more
convenient to reach.

## 2. `llms.txt`: the discovery entry point

[`llms.txt`](../llms.txt) (and its companion
[`llms-full.txt`](../llms-full.txt), which inlines the current spec verbatim)
follow the [llmstxt.org](https://llmstxt.org) convention: a short mission
statement plus a linked index of everything an agent needs next —
specification, meta-schema, registry, discovery catalog, verification
practices, and this guide. It's published at the repo root (renders on
GitHub) and at `https://govschema.org/llms.txt`, generated from one
source (`site/content/site.json`) so the two copies can't drift apart.

The intended flow: an agent's *first* fetch of GovSchema is
`GET https://govschema.org/llms.txt`. That one file is enough to bootstrap
discovery of the spec, the registry, and this guide — without knowing the
repository layout in advance. It is a map, not a new data format; every link
in it resolves to something layer 1 can already fetch and validate on its
own.

## 3. Reference MCP server

[`tools/mcp-server`](../tools/mcp-server) (`@govschema/mcp-server`) is a
read-only [Model Context Protocol](https://modelcontextprotocol.io) server
for MCP-aware agents, built on the shared
[`@govschema/client`](../tools/govschema-client) core. It exposes five
tools — `list_schemas`, `search_schemas`, `get_schema`, `validate_document`,
`get_verification_status` — each just a tool-call wrapper around the same
fetch-and-validate path described in [§1](#1-raw-fetch--json-schema-validation-the-baseline).

```json
{
  "mcpServers": {
    "govschema": {
      "command": "npx",
      "args": ["-y", "@govschema/mcp-server"]
    }
  }
}
```

It is **non-normative reference tooling** — parallel in spirit to
[`tools/validate.mjs`](../tools/validate.mjs), not part of the GovSchema
standard itself — and it is strictly **read-only, describe-only**: there is
no "submit," "fill," or "apply" tool, and none will be added without explicit
sign-off, per GovSchema's describe-not-submit boundary
([AGENTS.md](../AGENTS.md), [GOVERNANCE.md](../GOVERNANCE.md)). See
[`tools/mcp-server/README.md`](../tools/mcp-server/README.md) for the full
tool reference and boundary test.

## 4. Installable Skill

[`tools/govschema-skill`](../tools/govschema-skill) (`@govschema/skill`) is
an installable [Skill](https://docs.claude.com/en/docs/agents-and-tools/agent-skills)
for Claude-family agents, packaging the exact same
[`@govschema/client`](../tools/govschema-client) core as the MCP server
behind five CLI scripts — `list-schemas`, `search-schemas`, `get-schema`,
`validate-document`, `get-verification-status`. Distinct distribution
surface from MCP, identical underlying calls: lookup/search/validate
behavior can't drift between the two, since neither reimplements the logic.

```sh
cp -r tools/govschema-skill /path/to/.claude/skills/govschema
cd /path/to/.claude/skills/govschema && npm install
```

It carries the identical boundary: read-only, describe-only, no
form-filling or submission capability of any kind — see
[`tools/govschema-skill/SKILL.md`](../tools/govschema-skill/SKILL.md) for
the full script reference and boundary test.

## The one rule that applies to all four

Layers 2–4 are discovery and ergonomics on top of layer 1, never a
replacement for it and never a gate in front of it. If an agent can't or
won't use `llms.txt`, MCP, or a Skill, it loses nothing: a plain HTTPS fetch
and a standard JSON Schema validator are, and will remain, fully sufficient
to consume every GovSchema document.
