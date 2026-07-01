---
name: govschema
description: Look up, search, fetch, and validate GovSchema registry documents — versioned, machine-readable schemas for government forms/processes (DMV, passports, visas, company formation, etc). Use this when asked to find a GovSchema schema for a government process, fetch a specific schema by id/version, check whether a candidate document conforms to the GovSchema meta-schema, or check a schema's verification status. Read-only: never submits, fills, or POSTs anything to a government site.
---

# GovSchema

Convenience CLI over the [GovSchema](https://govschema.org) registry — an
open, versioned, machine-readable standard for government form/process
schemas. This Skill is a packaged wrapper around the same
[`@govschema/client`](../govschema-client) core used by the reference
[MCP server](../mcp-server); it adds no new capability over a plain HTTPS
`GET` and a JSON Schema draft 2020-12 validator (see the root
[README](../../README.md) and [`docs/agent-consumption.md`](../../docs/agent-consumption.md)).
Skipping this Skill entirely loses nothing.

## Hard boundary: read-only, describe-only

GovSchema describes government processes; it does not submit them
([AGENTS.md](../../AGENTS.md), [GOVERNANCE.md](../../GOVERNANCE.md)). Every
script here only reads the registry or validates a document already in
hand. Never use this Skill to fill in, submit, or POST data to a government
website or API — that capability does not exist here and must never be
added without explicit sign-off.

## Setup

From this directory:

```sh
npm install
```

(Installs `@govschema/client`. Skip this if `node_modules` is already
present — e.g. this Skill was installed as part of a checkout that already
ran `npm install`.)

## Scripts

Each script is a standalone CLI, prints JSON to stdout, and exits `1` with
an error on stderr on failure. Run with `node scripts/<name>.mjs [args]`
from this directory.

| Script | Purpose | Args |
|---|---|---|
| `list-schemas.mjs` | List published documents from the registry index. | `--status draft\|verified\|deprecated` (optional) |
| `search-schemas.mjs` | Search the index by jurisdiction, process type, or free text. | `--country`, `--level`, `--subdivision`, `--process`, `--q` (all optional, AND-combined) |
| `get-schema.mjs` | Fetch one document by id/version[/edition]. | `--id`, `--version` (required); `--edition` (optional, time-versioned forms) |
| `validate-document.mjs` | Validate a JSON document against the GovSchema meta-schema for its own `govschemaVersion`. | path to a JSON file, or pipe via stdin |
| `get-verification-status.mjs` | Return a document's `status` + `verification` block. | `--id`, `--version` (required); `--edition` (optional) |

### Examples

```sh
# Every verified schema currently published
node scripts/list-schemas.mjs --status verified

# GB passport renewals
node scripts/search-schemas.mjs --country GB --process renewal

# One document by its registry identity
node scripts/get-schema.mjs --id gb/hmpo/passport-renewal-adult --version 1.0.0

# Time-versioned (edition-bearing) form
node scripts/get-schema.mjs --id us/irs/extension-to-file-4868 --version 1.0.0 --edition 2025

# Validate a candidate document you already have on disk
node scripts/validate-document.mjs ./candidate.json

# ...or piped in
cat ./candidate.json | node scripts/validate-document.mjs

# Is this schema still fresh?
node scripts/get-verification-status.mjs --id gb/hmpo/passport-renewal-adult --version 1.0.0
```

## Data source

Same rule as `@govschema/client`: `list`/`search` read a bundled registry
index (no network round trip); `get-schema` and `validate-document` always
read the live document — from a local `govschema` checkout if one is
auto-detected (or `GOVSCHEMA_REGISTRY_ROOT` is set), otherwise fetched over
HTTPS from the published registry on `main`. See
[`../govschema-client/README.md`](../govschema-client/README.md#data-sources).
