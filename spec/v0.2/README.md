# GovSchema Specification — v0.2 (draft)

> Status: **draft**. v0.x is pre-stabilization: the format may change between minor
> versions while the standard is being founded. The first stable line is `v1`.

> **v0.2 over v0.1.** Additive, backward-compatible. Adds an OPTIONAL `edition`
> member and an OPTIONAL `<edition>` registry-path layer for **time-versioned
> forms** (a new tax/award year is a new edition, not a `version` bump). Every
> conforming v0.1 document is also a conforming v0.2 document. See SPEC §5.7 and
> [GSP-0005](../proposals/0005-edition-axis-time-versioned-forms.md).

This document defines the **GovSchema document format**: a standardized,
machine-readable definition of a government form or process that an autonomous
agent can consume programmatically. It is paired with the machine-readable
meta-schema [`govschema.schema.json`](./govschema.schema.json) (JSON Schema
draft 2020-12), which is the normative artifact — where prose and meta-schema
disagree, the meta-schema governs.

GovSchema is published by the GovSchema foundation, an independent open-source
standards body. **A GovSchema document describes a public government process; it
does not imply endorsement, affiliation, or certification by any government.**

## 1. What a GovSchema document is

A GovSchema document is a single JSON object that captures, for one government
process:

- **Identity & provenance** — which jurisdiction, which authority, and the
  exact live source it was derived from.
- **Structure** — the fields an agent must collect, their types, and their
  validation rules, each traced back to where it appears on the source form.
- **Flow** *(optional)* — the ordered steps of a multi-step process.
- **Verification** — how and when the document was confirmed to match the live
  source, so a consumer can judge its trustworthiness.

It is **not** an agent, a submission endpoint, or a stored copy of anyone's
personal data. It is a description.

## 2. Conformance

A JSON document is a **conforming GovSchema document** if and only if it
validates against `govschema.schema.json` for the `govschemaVersion` it
declares. Tooling in [`/tools`](../../tools) validates documents against this
meta-schema.

The keywords MUST, SHOULD, and MAY are used per [RFC 2119](https://www.rfc-editor.org/rfc/rfc2119).

## 3. Required members

| Member             | Purpose                                                                 |
| ------------------ | ----------------------------------------------------------------------- |
| `$schema`          | URI of the meta-schema the document conforms to.                        |
| `govschemaVersion` | Spec version targeted (semver).                                         |
| `id`               | Registry identifier; MUST equal the document's path under `registry/`.  |
| `version`          | Semantic version of *this* schema (see [VERSIONING.md](../../VERSIONING.md)). |
| `title`            | Human-readable title.                                                   |
| `status`           | `draft`, `verified`, or `deprecated`.                                   |
| `jurisdiction`     | Country (ISO 3166-1 alpha-2), optional subdivision (ISO 3166-2), level. |
| `authority`        | The government body that owns the process.                              |
| `source`           | The live government URL and the date it was retrieved.                  |
| `verification`     | The practice used and the date last verified.                           |
| `fields`           | One or more field definitions.                                          |

Optional members: `description`, `process`, `edition` (§5.7, time-versioned forms),
`license`, `steps`.

## 4. Status lifecycle

- **draft** — derived from a source but not independently confirmed current.
- **verified** — a verification practice has confirmed it matches the live
  source; `verification.lastVerifiedAt` is current per the practice's cadence.
- **deprecated** — the source process changed or was retired; superseded by a
  newer schema version or removed upstream. Deprecated schemas are retained for
  reproducibility, never deleted.

A `verified` document whose `verification.nextReviewBy` has passed SHOULD be
treated by consumers as `draft` until re-verified.

## 5. Identifiers and paths

`id` is the single source of truth linking a document to its location. It is a
lowercase, slash-separated path beginning with an ISO 3166-1 alpha-2 country
code, e.g. `us/ca/dmv/vehicle-registration-renewal`. The document MUST live at
`registry/<id>/<version>/schema.json` — or, for a time-versioned form carrying an
`edition` member, `registry/<id>/<edition>/<version>/schema.json` (SPEC §5.7). See
[`registry/README.md`](../../registry/README.md) for the full layout.

## 6. Versioning

Each schema carries its own semantic version, independent of the spec version
and of every other schema. The compatibility rules for what constitutes a
MAJOR / MINOR / PATCH change to a schema are normative and live in
[VERSIONING.md](../../VERSIONING.md).
