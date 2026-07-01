# GovSchema Specification — v0.3 (draft)

> Status: **draft**. v0.x is pre-stabilization: the format may change between minor
> versions while the standard is being founded. The first stable line is `v1`.

> **v0.3 over v0.2.** Additive, backward-compatible. Every conforming v0.2 document
> is also a conforming v0.3 document. Folds in five already CEO-accepted proposals:
>
> - [GSP-0006](../proposals/0006-sensitivity-classification.md) — field `classification`.
> - [GSP-0007](../proposals/0007-file-field-constraints.md) — `validation.maxBytes`/`mediaTypes` on `file` fields.
> - [GSP-0012](../proposals/0012-schema-maturity-levels.md) — the `maturity` badge.
> - [GSP-0013](../proposals/0013-extended-conditional-logic.md) — the shared `Condition` grammar: field `visibleWhen`/`requiredWhen`, `crossFieldValidation`, `exclusivityGroups`, `steps[].transitions`/`exitReason`.
> - [GSP-0014](../proposals/0014-documents-as-first-class-model.md) — the `documents[]` array and field `fieldRole`.
>
> See [SPEC.md](./SPEC.md) for the full normative text.

This document defines the **GovSchema document format**: a standardized,
machine-readable definition of a government form or process that an autonomous
agent can consume programmatically. It is paired with the machine-readable
meta-schema [`govschema.schema.json`](./govschema.schema.json) (JSON Schema
draft 2020-12), which is the normative artifact. Where prose and meta-schema
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
- **Documents, payments & attestations** *(optional)* — requirements beyond a
  scalar field value (SPEC §9, GSP-0014).
- **Flow** *(optional)* — the ordered, and optionally branching, steps of a
  multi-step process (SPEC §7).
- **Conditional logic** *(optional)* — declarative rules governing when a
  field, document, or transition applies (SPEC §8, GSP-0013).
- **Verification** — how and when the document was confirmed to match the live
  source, so a consumer can judge its trustworthiness.
- **Maturity** *(optional)* — a self-declared badge of how far along the
  execution-readiness path the document is (SPEC §12, GSP-0012).

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

Optional members: `description`, `process`, `edition` (time-versioned forms),
`license`, `steps`, `documents` (SPEC §9), `crossFieldValidation` (SPEC §8.3),
`exclusivityGroups` (SPEC §8.4), `maturity` (SPEC §12).

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

## 7. New in v0.3, at a glance

| Construct | Attachment point | GSP |
|---|---|---|
| `classification` | `fields[]` | [GSP-0006] |
| `validation.maxBytes` / `mediaTypes` | `fields[]` where `type: file` | [GSP-0007] |
| `visibleWhen` / `requiredWhen` | `fields[]` | [GSP-0013] |
| `crossFieldValidation` | top-level | [GSP-0013] |
| `exclusivityGroups` | top-level | [GSP-0013] |
| `steps[].transitions` / `exitReason` | `steps[]` | [GSP-0013] |
| `documents[]` | top-level | [GSP-0014] |
| `fieldRole` | `fields[]` | [GSP-0014] |
| `maturity` | top-level | [GSP-0012] |

A hand-authored example exercising every construct above is at
[`examples/agent-ready-demo.schema.json`](./examples/agent-ready-demo.schema.json).
It is illustrative only (fictional `xx`/`XX` jurisdiction), not a registry entry.

[GSP-0006]: ../proposals/0006-sensitivity-classification.md
[GSP-0007]: ../proposals/0007-file-field-constraints.md
[GSP-0012]: ../proposals/0012-schema-maturity-levels.md
[GSP-0013]: ../proposals/0013-extended-conditional-logic.md
[GSP-0014]: ../proposals/0014-documents-as-first-class-model.md
