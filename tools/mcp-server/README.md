# `@govschema/mcp-server`

A read-only [Model Context Protocol](https://modelcontextprotocol.io) server
over the GovSchema registry. It is **non-normative reference tooling** —
parallel in spirit to [`tools/validate.mjs`](../validate.mjs), not part of
the GovSchema standard itself. It exists purely as an optional convenience
layer for MCP-aware agents.

> **MCP is optional.** Every GovSchema document is fully usable with nothing
> more than a plain HTTPS `GET` and a standard JSON Schema draft 2020-12
> validator. See the root [README](../../README.md). This server just wraps
> that same fetch-and-validate path behind MCP tool calls, via the shared
> [`@govschema/client`](../govschema-client) core. Skipping MCP entirely
> loses you nothing.

## Hard boundary: read-only, describe-only

GovSchema describes government processes; it does not submit them
([AGENTS.md §5](../../AGENTS.md), [GOVERNANCE.md](../../GOVERNANCE.md)). This
server exposes lookup and validation tools **only**. It must never gain a
"submit"-style tool — form-filling, POSTing to a government site, or
browser automation that enters data on a live service — without CEO
sign-off first. `test.mjs` asserts the registered tool set is exactly the
five below and rejects tool names matching submit/fill/apply/post as a
regression guard.

## Tools

| Tool | Description |
|---|---|
| `list_schemas` | List published documents, optionally filtered by `status`. |
| `search_schemas` | Search by jurisdiction (`country`, `level`, `subdivision`), `process` type, or free-text `q`. |
| `get_schema` | Fetch one document by `(id, version[, edition])`. |
| `validate_document` | Validate a JSON document against the GovSchema meta-schema for its own `govschemaVersion`. |
| `get_verification_status` | Return `status` + `verification` for one document. |

All five are annotated `readOnlyHint: true, destructiveHint: false`.

## Running it

```sh
npx @govschema/mcp-server
```

Or point an MCP client's config at it directly, e.g. for Claude Desktop /
Claude Code (`~/.config/claude/claude_desktop_config.json` or equivalent):

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

### Data source

By default the server reads from a local `govschema` checkout if it's
running inside one, and otherwise fetches published documents over HTTPS
from GitHub (`main` branch). Set `GOVSCHEMA_REGISTRY_ROOT` to pin it to a
specific local clone. See [`@govschema/client`'s README](../govschema-client/README.md#data-sources)
for details.

## Development

```sh
npm install
npm test    # exercises every tool handler against the real registry, no stdio needed
npm start   # runs the server on stdio for manual/MCP-client testing
```

`package.json` currently depends on `@govschema/client` via a `file:` path
(monorepo-local). Before this package is published to npm for real, that
dependency needs to point at a published `@govschema/client` version instead
— a manual step for whoever runs the actual `npm publish`, not automated
here.
