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
draft 2020-12 validation, run any standard validator against
[`spec/v0.1/govschema.schema.json`](../spec/v0.1/govschema.schema.json), e.g.:

```sh
npx ajv-cli validate \
  -s spec/v0.1/govschema.schema.json \
  -d "registry/**/schema.json" \
  --spec=draft2020
```
