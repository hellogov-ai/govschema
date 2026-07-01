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

## Time-versioned forms (edition layer)

*Spec v0.2+ ([GSP-0005]).* A form that ships a fresh edition each tax or award
year (e.g. the US 1040, FAFSA, UK SA100) carries an OPTIONAL `<edition>` directory
**between** the `id` and the `<version>`:

```
registry/<id>/<edition>/<version>/schema.json
registry/us/irs/extension-to-file-4868/2025/1.0.0/schema.json
        └─ id: us/irs/extension-to-file-4868   edition: 2025   version: 1.0.0
```

- The `id` stays **year-agnostic** — it names the process across every edition.
- The `<edition>` segment MUST equal the document's `edition.label` member, and the
  document MUST declare `edition` (the discriminator that tells tooling the segment
  above `<version>` is an edition, not part of `id`). See SPEC §5.7.
- Editions **coexist** as sibling directories and are immutable, exactly like
  versions. A new tax year is a new edition, **not** a version bump
  (see [VERSIONING.md](../VERSIONING.md) §4).
- Forms with **no** edition cycle are unchanged: `registry/<id>/<version>/schema.json`.

[GSP-0005]: ../spec/proposals/0005-edition-axis-time-versioned-forms.md

## Companion `mapping.json` (optional)

*Spec v0.2+ ([GSP-0011]).* A schema's version directory MAY also contain a
sibling `mapping.json` — a companion artifact mapping field names to candidate
page-element locators for a browser-driving agent:

```
registry/<id>/<version>/mapping.json
registry/<id>/<edition>/<version>/mapping.json   # time-versioned forms
```

- It is never a member inside `schema.json`, never introduces its own registry
  path/versioning axis, and its absence has no effect on the sibling
  `schema.json`'s conformance.
- It is validated against [`spec/v0.2/mapping.schema.json`](../spec/v0.2/mapping.schema.json)
  and the referential-integrity rule in SPEC.md §13.2 (every `mapping.json`
  field name must resolve to a field defined in the sibling `schema.json`).
- See SPEC.md §13 for the full normative shape and its descriptive-only scope
  boundary.

[GSP-0011]: ../spec/proposals/0011-field-page-element-mapping.md

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
examples), but the layout imposes no privileged jurisdiction. Every country
sits at the same top level.
