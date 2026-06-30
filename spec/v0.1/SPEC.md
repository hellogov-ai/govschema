# GovSchema Specification

**Version:** 0.1 (DRAFT)
**Status:** Draft — v0.x is pre-stabilization; the format may change between minor versions while the standard is being founded.
**Date:** 2026-06-30
**Editor:** Founding Engineer, GovSchema
**This document:** `spec/v0.1/SPEC.md`

> GovSchema is an open, non-profit standard for describing government forms and
> processes in a machine-readable way, so that software agents can interact with
> government services reliably and verifiably. GovSchema is **independent** and is
> **not** affiliated with or endorsed by any government. GovSchema describes
> processes; it does **not** submit forms on anyone's behalf.

> **Normative artifact.** The machine-readable meta-schema
> [`spec/v0.1/govschema.schema.json`](./govschema.schema.json) (JSON Schema
> 2020-12) is the normative definition of the GovSchema document format. This prose
> specification explains and constrains it. **Where this prose and the meta-schema
> disagree, the meta-schema governs.** The few requirements that cannot be expressed
> in JSON Schema are listed in §10.

---

## 1. Introduction

### 1.1 Purpose

A *GovSchema document* is a versioned, machine-readable definition of a single
government form or process. It captures:

- the **fields** an applicant must supply (with types and validation rules),
- the **flow** (the ordered steps of a multi-step process),
- the **provenance** (which government source it was derived from, and when), and
- the **verification** state (how and when the document was confirmed against the
  live government source).

A GovSchema document is consumed by agent developers. It lets an agent know what a
government process requires *before* interacting with it, validate user-supplied
data locally, and present an accurate, plain-language view to the human the agent
acts for.

### 1.2 What GovSchema is not

- GovSchema is **not an agent**. It does not fill out or submit forms.
- GovSchema is **not a government system** and carries no government endorsement.
- GovSchema is **not** authoritative over the government source. The live
  government source is always authoritative; a GovSchema document is a *description*
  of it, and its accuracy is asserted only through the verification record (§9).

### 1.3 Audience

Two audiences are served by every document:

1. **Agent developers** — who consume the machine-readable definition.
2. **The humans those agents act for** — who are served by the human-readable
   `title`, `label`, and `description` members, which MUST be written in plain
   language.

### 1.4 Requirements language

The key words **MUST**, **MUST NOT**, **REQUIRED**, **SHALL**, **SHALL NOT**,
**SHOULD**, **SHOULD NOT**, **RECOMMENDED**, **MAY**, and **OPTIONAL** in this
document are to be interpreted as described in [RFC 2119] and [RFC 8174] when, and
only when, they appear in all capitals.

---

## 2. Conformance

A document is a **conforming GovSchema 0.1 document** if and only if:

1. It is a single JSON value that validates against the GovSchema 0.1 meta-schema
   (`spec/v0.1/govschema.schema.json`) for the `govschemaVersion` it declares, and
2. It satisfies every **MUST**/**MUST NOT** requirement in this specification that
   cannot be expressed in JSON Schema (these are listed in §10).

A **conforming consumer** is software that, given a conforming document, behaves as
required by this specification (notably §6 on field types and §7 on flow).

A **conforming producer** is software or a process that emits only conforming
documents.

The reference validation tooling in [`/tools`](../../tools) enforces the
meta-schema in full (`tools/validate-ajv.mjs`, JSON Schema draft 2020-12 via
ajv) and, of the §10 rules, rule 1; §10 records which of its rules are checked
today and which are validated incrementally as the tooling matures.

---

## 3. Design principles

1. **JSON Schema where it fits.** Field-level validation reuses a constrained
   subset of [JSON Schema 2020-12] vocabulary rather than inventing new validation
   keywords. This keeps GovSchema interoperable with the large existing ecosystem
   of JSON Schema validators.
2. **Provenance is mandatory.** A field that cannot be traced to a government
   source is not a standard; it is a guess. Every document MUST cite its source.
3. **Verification is first-class, not a footnote.** Every document carries an
   explicit verification record (§9) and a lifecycle `status`. A document that has
   not been confirmed against its live source MUST declare `status: draft`, so
   consumers can decide whether to trust it.
4. **Two-audience text.** Machine identifiers (`name`, `id`) are stable and terse;
   human text (`title`, `label`, `description`) is plain-language and MUST NOT
   assume legal or bureaucratic literacy.
5. **Strict and small.** A v0.1 document is *closed*: the meta-schema sets
   `additionalProperties: false` at every level, so unknown members are rejected
   rather than ignored. The first stable line keeps the smallest core it can commit
   to; richer constructs are tracked as proposals (§12) and added in later spec
   versions, not smuggled in as unrecognized members.
6. **Jurisdiction-neutral.** No structure privileges any one country. Encodings use
   international standards (ISO 3166) so the same format describes a US, UK, or any
   other jurisdiction's process.

---

## 4. Document model overview

A GovSchema document is a JSON object with these top-level members:

| Member             | Required | Description                                            |
|--------------------|----------|--------------------------------------------------------|
| `$schema`          | yes      | URI of the meta-schema this document conforms to (§5.0).|
| `govschemaVersion` | yes      | Spec format version this document targets (§5.1).       |
| `id`               | yes      | Registry identifier — the document's registry path (§5.2).|
| `version`          | yes      | SemVer version of *this* document (§5.3).               |
| `title`            | yes      | Human-readable process title.                           |
| `status`           | yes      | Lifecycle status: `draft`/`verified`/`deprecated` (§9). |
| `jurisdiction`     | yes      | Jurisdiction object (§5.4).                             |
| `authority`        | yes      | Issuing government body (§5.5).                         |
| `source`           | yes      | Provenance of the description (§8).                     |
| `verification`     | yes      | Verification record (§9).                               |
| `fields`           | yes      | Non-empty array of field definitions (§6).              |
| `description`      | no       | Plain-language summary of the process.                  |
| `process`          | no       | Process type and source language (§5.6).                |
| `license`          | no       | SPDX / Creative Commons identifier for the content.     |
| `steps`            | no       | Ordered description of the process flow (§7).           |

The normative shape is the meta-schema; this table is a summary. No other top-level
members are permitted (§3 principle 5).

---

## 5. Identity, versioning, and jurisdiction conventions

> §5.1–5.2 are the **one-way-door** parts of the standard: they are hard to change
> once schemas and consumers depend on them. They were settled by standards
> sign-off under [GSP-0001](../proposals/0001-document-model-reconciliation.md).

### 5.0 Meta-schema reference (`$schema`)

`$schema` MUST be the URI of the GovSchema meta-schema the document conforms to:
`https://govschema.org/spec/v0.1/govschema.schema.json` for this spec version.

### 5.1 Spec version (`govschemaVersion`)

`govschemaVersion` MUST be a [Semantic Versioning 2.0.0][SemVer] string identifying
the *spec format* version the document targets (e.g. `0.1.0`), not the document's
own version. A consumer written for spec MAJOR.MINOR `0.1` SHOULD accept any `0.1.x`
document and SHOULD reject a spec MAJOR it does not recognize.

### 5.2 Identifier and registry path (`id`)

Every document has a registry identifier in the `id` member. It is a lowercase,
slash-separated path that:

- begins with an ISO 3166-1 alpha-2 country code (lowercased), and
- continues with stable lowercase slugs for subdivision (when subnational),
  authority, and process,

matching `^[a-z]{2}(/[a-z0-9-]+){2,}$`. Examples:

```
gb/hmpo/passport-renewal-adult
us/ca/dmv/vehicle-registration-renewal
us/dos/passport-renewal-ds82
```

The `id` is **the single source of truth linking a document to its location.** A
document MUST be stored at:

```
registry/<id>/<version>/schema.json
```

The path MUST be reconstructible from `id` and `version` alone, and `id` MUST equal
the document's path under `registry/` excluding the version directory (§10 rule 1).
The `id` does **not** include the version; it names the process across all of its
versions.

> A URN-style external citation identifier (e.g. `govschema:us:dos:...`) was
> considered and **deferred** to a later spec version
> ([GSP-0002](../proposals/0002-colon-gsid-external-identifier.md)); v0.1 uses the
> registry path form as the sole identifier.

### 5.3 Document version (`version`)

`version` is a [SemVer][SemVer] string for *this document's content*. The normative
MAJOR/MINOR/PATCH rules live in [VERSIONING.md](../../VERSIONING.md); in summary:

- **PATCH** — editorial fixes, clarified text, corrected typos; no change to
  fields, types, validation, or flow semantics.
- **MINOR** — backward-compatible additions: a new OPTIONAL field, a new enum value,
  a new step that does not alter existing required inputs.
- **MAJOR** — backward-incompatible change: a field removed or made required, a type
  or validation tightened, a flow change that invalidates previously-valid inputs.

A published `(id, version)` is immutable (VERSIONING.md §3). A consumer that has
validated user data against version *X* MUST re-validate when the document advances
to a higher MAJOR.

### 5.4 Jurisdiction (`jurisdiction`)

```json
"jurisdiction": { "country": "US", "subdivision": "US-CA", "level": "subnational" }
```

- `country` — REQUIRED. ISO 3166-1 alpha-2, **uppercase** (`^[A-Z]{2}$`).
- `subdivision` — OPTIONAL. ISO 3166-2 subdivision code, the full hyphenated form
  (`^[A-Z]{2}-[A-Z0-9]{1,3}$`, e.g. `US-CA`). Absent means national scope.
- `level` — REQUIRED. One of `national`, `subnational`, `municipal`, `supranational`.

The `country` (and `subdivision`, when present) MUST be consistent with the country
(and subdivision) tokens in `id` (§10 rule 2). Note `id` uses lowercase path tokens
while `jurisdiction` uses uppercase ISO codes; e.g. `id` `us/ca/...` ↔ `country`
`US`, `subdivision` `US-CA`.

### 5.5 Authority (`authority`)

```json
"authority": {
  "name": "His Majesty's Passport Office",
  "abbreviation": "HMPO",
  "url": "https://www.gov.uk/government/organisations/hm-passport-office"
}
```

- `name` — REQUIRED, the body's official name.
- `abbreviation` — OPTIONAL, a short form.
- `url` — OPTIONAL, the authority's official homepage.

### 5.6 Process (`process`)

OPTIONAL classification of the process:

- `type` — one of `application`, `registration`, `renewal`, `amendment`, `filing`,
  `request`, `other`.
- `language` — [BCP 47] language tag of the source form (e.g. `en-US`).

---

## 6. Fields

`fields` is a non-empty array of **field definition** objects. Order is meaningful:
it is the default presentation order when a document has no `steps`.

### 6.1 Field definition members

| Member        | Required | Description                                               |
|---------------|----------|-----------------------------------------------------------|
| `name`        | yes      | Stable machine key, unique within the document.           |
| `label`       | yes      | Plain-language label as it appears on the source form.    |
| `type`        | yes      | One of the GovSchema types (§6.2).                        |
| `required`    | no       | Whether a value MUST be supplied. Default `false`.        |
| `description` | no       | Longer plain-language explanation or guidance.            |
| `sourceRef`   | no       | Where the field appears on the source form (e.g. `Box 4a`).|
| `validation`  | no       | Validation rules (§6.3).                                  |

`name` MUST match `^[a-z][a-zA-Z0-9_]*$` and MUST be unique among all fields in the
document (§10 rule 3).

> v0.1 fields are **flat**: there is no nested-object or array element model and no
> labelled-option or PII (`sensitive`) member. Composite inputs (e.g. an address)
> are expressed as several flat fields with a shared `name` prefix. Richer field
> models are tracked for a later spec version (§12).

### 6.2 Types

| `type`     | JSON value | Notes                                                  |
|------------|------------|--------------------------------------------------------|
| `string`   | string     | Free text; constrain with `pattern`/`maxLength`.       |
| `number`   | number     | Real number.                                           |
| `integer`  | integer    | Whole number.                                          |
| `boolean`  | boolean    | Yes/no.                                                |
| `date`     | string     | Full date, `YYYY-MM-DD` ([RFC 3339] full-date).        |
| `enum`     | string     | One of the values listed in `validation.enum` (§6.3.1).|
| `file`     | —          | A document upload, referenced by metadata, not bytes (§6.4).|
| `object`   | object     | A composite value carried opaquely. Prefer flat fields where possible.|

### 6.3 Validation

`validation` is an object using a **constrained subset of JSON Schema 2020-12
validation keywords**, so existing validators can be reused. Permitted keywords:

- For `string`: `minLength`, `maxLength`, `pattern`.
- For `number`/`integer`: `minimum`, `maximum`.
- For `enum`: `enum` (§6.3.1).

No other keywords are permitted in v0.1 (`validation` is closed). A richer
constraint vocabulary (`format`, `exclusiveMinimum`, `multipleOf`, `minItems`, file
byte/media-type limits) is deferred to a later spec version (§12).

#### 6.3.1 Enumerated values

When `type` is `enum`, `validation.enum` is a non-empty array of the allowed values.
v0.1 lists **values only**; a human-facing label per value is not part of the v0.1
field model — describe the choices in the field's `description` where needed.
(Labelled options are a tracked v0.2 proposal,
[GSP-0003](../proposals/0003-labelled-enum-options.md).)

### 6.4 File fields

A `file` field's value is metadata describing an upload, not the bytes. GovSchema
never transports file contents. v0.1 has no member for file size or media-type
constraints; state any such requirement in the field `description`. (File
constraints are deferred — §12.)

---

## 7. Flow (`steps`)

`steps` is an OPTIONAL ordered description of a multi-step process. A document
without `steps` is a flat form whose presentation order is the `fields` array order.

### 7.1 Step model

```json
"steps": [
  {
    "id": "identify_vehicle",
    "title": "Identify the vehicle",
    "fields": ["vehicleIdentificationNumber", "licensePlateNumber"],
    "next": "confirm_details"
  },
  { "id": "confirm_details", "title": "Confirm registration details", "fields": ["currentMileage"] }
]
```

- Each **step**: `id` (REQUIRED, matches `^[a-z][a-zA-Z0-9_-]*$`, unique within the
  flow), `title` (REQUIRED), OPTIONAL `fields` (an ordered array of field `name`s
  presented at this step), and OPTIONAL `next` (the `id` of the next step; omitted
  on the final step).

The v0.1 flow is **linear**: each step names at most one successor via `next`.
Every field `name` referenced by a step MUST exist in `fields`, and every `next`
MUST name an existing step (§10 rule 4).

> Conditional flow — branching `transitions` with `when` conditions, e.g. an
> eligibility gate that routes an applicant to an in-person path — is the most
> requested richer construct and is the first tracked additive proposal,
> [GSP-0004](../proposals/0004-conditional-flow.md). In v0.1, model such logic as a
> linear step that collects the gating fields and describe the routing rule in the
> step `description` and the verification record.

---

## 8. Source / provenance

```json
"source": {
  "url": "https://www.dmv.ca.gov/portal/vehicle-registration/registration-renewals/",
  "retrievedAt": "2026-06-30",
  "documentRef": "REG 156"
}
```

- `url` — REQUIRED. The canonical government page or form the document describes.
- `retrievedAt` — REQUIRED. Full-date the source was last read by the producer.
- `documentRef` — OPTIONAL. The government's own form identifier (e.g. `DS-82`,
  `REG 156`), when one exists.

A document MUST cite exactly one primary `source`.

---

## 9. Lifecycle status and verification

### 9.1 Status (`status`)

`status` is one of:

- `draft` — derived from a source but not independently confirmed current.
- `verified` — a verification practice has confirmed the document matches the live
  source, and `verification.lastVerifiedAt` is current per the practice's cadence.
- `deprecated` — the source process changed or was retired. Deprecated documents are
  retained for reproducibility, never deleted.

A `verified` document whose `verification.nextReviewBy` has passed SHOULD be treated
by consumers as `draft` until re-verified.

### 9.2 Verification record (`verification`)

```json
"verification": {
  "method": "manual-source-review-v1",
  "lastVerifiedAt": "2026-06-30",
  "verifiedBy": "GovSchema Engineering",
  "nextReviewBy": "2026-12-30",
  "notes": "Reference/example schema; not yet independently re-verified."
}
```

- `method` — REQUIRED. Identifier of the verification practice used (see
  [`practices/`](../../practices)), e.g. `manual-source-review-v1`.
- `lastVerifiedAt` — REQUIRED. Full-date the source was last reviewed under that
  practice.
- `verifiedBy` — OPTIONAL. Who performed the review.
- `nextReviewBy` — OPTIONAL. Full-date by which re-verification is due.
- `notes` — OPTIONAL. Free text stating the verification claim honestly (e.g. that a
  document is a source-derived reference not yet independently re-verified).

Verification *semantics* (the *how*) are defined by the verification practice the
`method` names; this specification fixes only the **shape** of the claim so
consumers can read it uniformly.

---

## 10. Normative requirements not expressible in JSON Schema

A conforming document MUST additionally satisfy:

1. **id / path consistency** — `id` MUST equal the document's path under `registry/`
   excluding the version directory. (§5.2)
2. **id / jurisdiction consistency** — the country token in `id` MUST equal
   `jurisdiction.country` lowercased; when a subdivision token is present in `id` it
   MUST be consistent with `jurisdiction.subdivision`. (§5.2, §5.4)
3. **Field name uniqueness** — `name`s MUST be unique among all fields. (§6.1)
4. **Flow reference integrity** — every step `fields` entry MUST resolve to a
   defined field `name`, and every `next` MUST name an existing step. (§7.1)
5. **Verification consistency with status** — when `status` is `verified`,
   `verification.lastVerifiedAt` MUST be present and current per the named practice;
   a `draft` document still carries a `verification` record describing its
   source review. (§9)

The GovSchema validation tooling (`tools/`) enforces the full meta-schema
(`tools/validate-ajv.mjs`, JSON Schema draft 2020-12) and rule 1 today; rules 2–5
are validated incrementally as the tooling matures. The zero-dependency
`tools/validate.mjs` additionally checks the structural subset of the meta-schema
and rule 1 with no install step. CI (`.github/workflows/validate.yml`) runs both.

---

## 11. Media type and file conventions

- File name: **`schema.json`** within the registry version directory
  (`registry/<id>/<version>/schema.json`).
- Suggested media type: `application/govschema+json`.
- Encoding: UTF-8. Documents MUST be valid JSON.

---

## 12. Open questions and deferred constructs (non-normative)

These were considered during founding and deferred from v0.1 to keep the first
stable core small. Each is tracked as a proposal under
[`spec/proposals/`](../proposals/):

- **Conditional flow** — branching `transitions`/`when` conditions
  ([GSP-0004], the first targeted additive).
- **Labelled enum options** — `{value, label}` pairs ([GSP-0003]).
- **URN-style external identifier** — colon GSID for external citation ([GSP-0002]).
- **Nested field model** — object/array fields with nested `fields`/`items`.
- **Richer constraints** — `format`, `exclusiveMinimum`, `multipleOf`, array
  constraints, and file `maxBytes`/`mediaTypes`.
- **PII marking** — a `sensitive` member so consumers can apply special handling.
- **Extensions** — a namespaced `extensions` object for vendor/experimental data.
- **Localization** — multiple language variants of human text within one document.

---

## References

- [RFC 2119] Key words for use in RFCs. <https://www.rfc-editor.org/rfc/rfc2119>
- [RFC 8174] Ambiguity of Uppercase vs Lowercase. <https://www.rfc-editor.org/rfc/rfc8174>
- [RFC 3339] Date and Time on the Internet. <https://www.rfc-editor.org/rfc/rfc3339>
- [JSON Schema 2020-12] <https://json-schema.org/specification-links#2020-12>
- [SemVer] Semantic Versioning 2.0.0. <https://semver.org/spec/v2.0.0.html>
- ISO 3166-1 / ISO 3166-2 — Country and subdivision codes.
- [BCP 47] Tags for Identifying Languages.

[RFC 2119]: https://www.rfc-editor.org/rfc/rfc2119
[RFC 8174]: https://www.rfc-editor.org/rfc/rfc8174
[RFC 3339]: https://www.rfc-editor.org/rfc/rfc3339
[JSON Schema 2020-12]: https://json-schema.org/specification-links#2020-12
[SemVer]: https://semver.org/spec/v2.0.0.html
[BCP 47]: https://www.rfc-editor.org/info/bcp47
[GSP-0002]: ../proposals/0002-colon-gsid-external-identifier.md
[GSP-0003]: ../proposals/0003-labelled-enum-options.md
[GSP-0004]: ../proposals/0004-conditional-flow.md
