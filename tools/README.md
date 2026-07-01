# Tools

Tooling for working with the GovSchema registry. Code here is Apache-2.0
licensed (see [../LICENSE](../LICENSE)).

## `validate.mjs`

Zero-dependency structural validator. Checks that every schema in the registry
is a conforming GovSchema document and that its `id`/`version` match its path.

```sh
# validate the whole registry
node tools/validate.mjs

# validate specific files
node tools/validate.mjs registry/gb/hmpo/passport-renewal-adult/1.0.0/schema.json
```

Exit code is `0` when all documents pass, `1` otherwise — suitable for CI. The
GitHub Actions workflow at `.github/workflows/validate.yml` runs it on every
push and pull request.

### Scope

`validate.mjs` implements the subset of JSON Schema that the meta-schema uses,
so the registry can be checked with no install step. For exhaustive JSON Schema
draft 2020-12 validation, use `validate-ajv.mjs` (below).

## `validate-ajv.mjs`

Full JSON Schema **draft 2020-12** validation of every registry document against
the normative meta-schema
[`spec/v0.1/govschema.schema.json`](../spec/v0.1/govschema.schema.json), using
[ajv](https://ajv.js.org/) + `ajv-formats`. This is the tool that enforces the
SPEC §2 conformance clause; unlike `validate.mjs` it requires an install step.

```sh
cd tools && npm ci          # install ajv + ajv-formats (dev dependencies)
node validate-ajv.mjs       # validate the whole registry
node validate-ajv.mjs registry/gb/hmpo/passport-renewal-adult/1.0.0/schema.json
```

Exit code is `0` when every document validates against the meta-schema, `1`
otherwise. CI runs both validators: the zero-dependency structural check
(`validate.mjs`) and this full meta-schema check, so meta-schema conformance is
**enforced**, not merely asserted.

### npm scripts

From `tools/`:

```sh
npm run validate          # structural only (no install needed)
npm run validate:schema   # ajv 2020-12 meta-schema (needs npm ci)
npm run validate:all      # both
```

## `govschema-client/`

[`@govschema/client`](./govschema-client) — a non-normative reference client
for listing, searching, fetching, and validating registry documents from
code. Reuses the same ajv-based meta-schema validation as `validate-ajv.mjs`
above. This is the shared core behind `mcp-server/` (and, later, the Skill
package from GOV-271) — both are thin adapters over this one library. See
[`govschema-client/README.md`](./govschema-client/README.md).

## `mcp-server/`

[`@govschema/mcp-server`](./mcp-server) — a read-only, `npx`-runnable [Model
Context Protocol](https://modelcontextprotocol.io) server exposing the
`govschema-client` core as MCP tools (list, search, get, validate,
verification status). Non-normative reference tooling, parallel in spirit to
`validate.mjs`: MCP is an optional convenience layer, and plain HTTPS fetch +
JSON Schema validation remains fully sufficient without it. It never gains a
"submit" tool of any kind — see
[`mcp-server/README.md`](./mcp-server/README.md) for the boundary this
enforces.
