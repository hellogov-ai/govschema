# Registry layout

The registry is the home for every published GovSchema document. Layout is
**deterministic**: a schema's location is fully derived from its `id` and
`version`, and tooling enforces the match.

## Path convention

```
registry/<country>/<…path…>/<process>/<version>/schema.json
```

- **`<country>`** — ISO 3166-1 alpha-2 code, **lowercase** (e.g. `us`, `gb`, `de`).
- **`<…path…>`** — one or more lowercase, hyphenated segments narrowing the
  scope: typically a subdivision and/or the issuing authority. Use a subdivision
  segment when the process is subnational (e.g. `us/ca/...`), and an authority
  segment to disambiguate (e.g. `gb/hmpo/...`).
- **`<process>`** — lowercase, hyphenated process slug
  (e.g. `vehicle-registration-renewal`).
- **`<version>`** — the schema's semantic version as a directory
  (e.g. `1.0.0`), one directory per published version.
- **`schema.json`** — the GovSchema document.

Everything above `<version>` is the schema's **`id`**. The `id` member inside
`schema.json` MUST equal that path (slash-joined), and the `version` member MUST
equal the version directory name. `tools/validate.mjs` enforces both.

## Examples

```
registry/us/ca/dmv/vehicle-registration-renewal/1.0.0/schema.json
        └─ id: us/ca/dmv/vehicle-registration-renewal      version: 1.0.0

registry/gb/hmpo/passport-renewal-adult/1.0.0/schema.json
        └─ id: gb/hmpo/passport-renewal-adult              version: 1.0.0
```

## Multiple versions

Each version is an immutable directory. Publishing a new version adds a sibling
directory; it never edits an existing one.

```
registry/us/ca/dmv/vehicle-registration-renewal/
  1.0.0/schema.json
  1.1.0/schema.json
  2.0.0/schema.json
```

Consumers that want "the latest compatible schema" resolve it by listing version
directories and applying semver rules — see [VERSIONING.md](../VERSIONING.md).
Published versions are never deleted or rewritten, so any agent that pinned a
version keeps getting the bytes it pinned.

## Scope

GovSchema is global and multi-jurisdictional. Early coverage concentrates on a
few jurisdictions (the reference schemas under `us/` and `gb/` are format
examples), but the layout imposes no privileged jurisdiction — every country
sits at the same top level.
