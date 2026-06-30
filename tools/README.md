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
