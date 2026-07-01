# `@govschema/client`

Non-normative reference client for the [GovSchema](https://govschema.org)
registry. It is a thin, versioned wrapper around the same lookup and
validation logic already used by `tools/validate-ajv.mjs` in CI: nothing
here is authoritative in its own right.

**This package is optional.** Every GovSchema document is fully usable with
nothing more than a plain HTTPS `GET` and a standard JSON Schema draft
2020-12 validator, exactly as described in the root [README](../../README.md).
`@govschema/client` exists only to save agent developers from re-implementing
that fetch/validate/search logic themselves. It is the shared core behind
[`tools/mcp-server`](../mcp-server) (and, later, the Skill package from
GOV-271): both are thin adapters over this one library, so lookup/validate
behavior doesn't drift between distribution surfaces.

## Install

```sh
npm install @govschema/client
```

## Usage

```js
import { GovSchemaClient } from "@govschema/client";

const client = new GovSchemaClient();

// List every published document (from a bundled registry index).
const all = client.listSchemas();

// Filter by status.
const verified = client.listSchemas({ status: "verified" });

// Search by jurisdiction / process type / free text.
const gbRenewals = client.search({ country: "GB", process: "renewal" });
const passports = client.search({ q: "passport" });

// Fetch one document by (id, version[, edition]).
const doc = await client.getSchema({ id: "gb/hmpo/passport-renewal-adult", version: "1.0.0" });

// Time-versioned forms (spec v0.2 GSP-0005) take an edition label.
const itr = await client.getSchema({ id: "us/irs/extension-to-file-4868", version: "1.0.0", edition: "2025" });

// Validate any document against the GovSchema meta-schema for the spec line
// its own `govschemaVersion` names.
const result = await client.validate(doc);
// => { valid: true, errors: [] }

// Read a document's verification record.
const status = await client.getVerificationStatus({ id: "gb/hmpo/passport-renewal-adult", version: "1.0.0" });
```

## Data sources

`listSchemas()` / `search()` read a registry index bundled with this package
(`registry-index.json`, regenerated from `registry/` by `generate-index.mjs`
— run `npm run build-index` after any registry change; CI checks it isn't
stale). This gives instant, offline discovery with no network round trip.

`getSchema()`, `validate()`, and `getVerificationStatus()` always read the
live document, never the index, so they can't return stale field data even if
the index lags. They resolve it one of two ways:

1. **Local checkout** — if this package is running inside a clone of the
   `govschema` repo (auto-detected, or set explicitly via `registryRoot` or
   the `GOVSCHEMA_REGISTRY_ROOT` env var), documents are read straight off
   disk.
2. **Remote HTTPS** — otherwise, documents are fetched from the published
   registry (`baseUrl`, defaulting to the `main` branch on GitHub). This is
   the path a bare `npx` install with no local clone uses.

Either way, the request is the same one you'd make yourself: read
`registry/<id>/<version>/schema.json` (or with an `<edition>` segment) and
validate it. See [`registry/README.md`](../../registry/README.md) for the
path convention.

## API

- `listSchemas({ status? })` — array of index entries.
- `search({ country?, level?, subdivision?, process?, q? })` — array of index
  entries matching all given filters.
- `getSchema({ id, version, edition? })` — the full document (`Promise`).
  Throws `GovSchemaNotFoundError` if it doesn't exist.
- `validate(document)` — `Promise<{ valid: boolean, errors: [] }>` against the
  meta-schema for the document's own `govschemaVersion`.
- `getVerificationStatus({ id, version, edition? })` — `Promise<{ id, version,
  edition, status, verification }>`.

## Testing

```sh
npm test
```

Runs `test.mjs`, a zero-dependency self-test (no test framework) that checks
the bundled index is current and exercises every method against the real
registry.

## Scope

Read-only, describe-only, exactly like the standard itself: this client never
writes to, submits to, or authenticates against anything. See
[GOVERNANCE.md](../../GOVERNANCE.md) and [AGENTS.md](../../AGENTS.md) for
GovSchema's non-affiliation and describe-not-submit boundaries.
