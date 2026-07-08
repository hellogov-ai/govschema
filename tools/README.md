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

## `verify-sources.mjs`

Zero-dependency source-URL verifier (GOV-1763). A schema's trustworthiness
rests on `source`/`verification`/`VERIFICATION.md` accurately describing where
its fields came from — but a review gate has caught four fabricated sourcing
claims (invented citations, a fabricated quoted heading, a false "no AcroForm
fields" claim, a false three-URL cross-verification) in this registry's
history, all with otherwise-accurate field content. This tool re-fetches
every URL a changed schema's `schema.json` + `VERIFICATION.md` cite, so a
fabricated or dead citation is caught on the PR that introduces it instead of
by a reviewer's manual re-fetch.

```sh
# PR/push-aware: checks only the registry files changed since the base ref
# (falls back to a full registry scan if there's no base ref to diff against)
node tools/verify-sources.mjs

# check every schema in the registry (slow — makes a live network request
# per cited URL; expect some transient WARNs from gov-site flakiness)
node tools/verify-sources.mjs --all

# check specific files/directories
node tools/verify-sources.mjs registry/gb/hmpo/passport-renewal-adult/1.0.0
```

A URL that 404s or fails DNS resolution is checked against the Wayback
Machine's CDX API: zero history is treated as the fabrication signature
(**FAIL**); prior history means the source moved or was retired, not that it
was invented (**WARN** — cite an explicit `web.archive.org` snapshot instead).
A `web.archive.org` citation is itself re-fetched and must resolve, or it
FAILs (a broken "proof" URL is as bad as a fabricated one). Bot/WAF-blocked
responses (401/403/429 — extremely common across this registry's government
sources) and 5xx/timeouts (retried with backoff first) never fail the check;
only a definitively nonexistent URL does. See
[`verify-sources-allowlist.json`](./verify-sources-allowlist.json) for the
rare case a specific URL needs an audited, reasoned exception.

Exit code `0` if nothing FAILs (WARNs are printed but non-blocking), `1`
otherwise. CI runs this on every pull request against the files it changes
(`.github/workflows/validate.yml`).

## `govschema-client/`

[`@govschema/client`](./govschema-client) — a non-normative reference client
for listing, searching, fetching, and validating registry documents from
code. Reuses the same ajv-based meta-schema validation as `validate-ajv.mjs`
above. This is the shared core behind `mcp-server/` and `govschema-skill/`:
both are thin adapters over this one library, so lookup/validate behavior
can't drift between distribution surfaces. See
[`govschema-client/README.md`](./govschema-client/README.md).

## `mcp-server/`

[`@govschema/mcp-server`](./mcp-server) — a read-only, `npx`-runnable [Model
Context Protocol](https://modelcontextprotocol.io) server exposing the
`govschema-client` core as MCP tools (list, search, get, validate,
verification status). Non-normative reference tooling, parallel in spirit to
`validate.mjs`: MCP is an optional convenience layer, and plain HTTPS fetch +
JSON Schema validation remains fully sufficient without it. It never gains a
"submit" tool of any kind. See
[`mcp-server/README.md`](./mcp-server/README.md) for the boundary this
enforces.

## `govschema-skill/`

[`@govschema/skill`](./govschema-skill) — an installable Skill (`SKILL.md` +
CLI scripts) for Claude-family agents, exposing the same `govschema-client`
core as list/search/get/validate/verification-status scripts. A distinct
distribution surface from `mcp-server/`, but identical underlying calls — it
wraps the same core rather than reimplementing the lookup/validate logic.
Same boundary as `mcp-server/`: read-only, describe-only, no
form-filling or submission capability. See
[`govschema-skill/README.md`](./govschema-skill/README.md) and
[`govschema-skill/SKILL.md`](./govschema-skill/SKILL.md).
