# GovSchema Specification

**Version:** 0.3 (DRAFT)
**Status:** Draft — v0.x is pre-stabilization; the format may change between minor versions while the standard is being founded.
**Date:** 2026-07-01
**Editor:** Founding Engineer, GovSchema
**This document:** `spec/v0.3/SPEC.md`

> **What changed from v0.2.** v0.3 is an additive, backward-compatible MINOR over
> v0.2: every conforming v0.2 document is also a conforming v0.3 document. It folds
> in seven already-accepted proposals (RFC 0003, [GOV-302](https://govschema.org),
> plus GSP-0018 folded in separately):
>
> - [GSP-0006](../proposals/0006-sensitivity-classification.md) — an OPTIONAL,
>   advisory, open-vocabulary field `classification` (§6.1, §6.5).
> - [GSP-0007](../proposals/0007-file-field-constraints.md) — OPTIONAL
>   `validation.maxBytes`/`mediaTypes` on `file`-typed fields, and the type-scoped
>   `validation` mechanism that makes them possible (§6.3, §6.6).
> - [GSP-0013](../proposals/0013-extended-conditional-logic.md) — the shared
>   `Condition` grammar, field `visibleWhen`/`requiredWhen` (§6.7), document
>   `crossFieldValidation` (§8), document `exclusivityGroups` (§8), and
>   `steps[].transitions`/`exitReason` (§7.2).
> - [GSP-0014](../proposals/0014-documents-as-first-class-model.md) — the
>   top-level `documents[]` array (§9) and field `fieldRole` (§6.8).
> - [GSP-0012](../proposals/0012-schema-maturity-levels.md) — the top-level
>   `maturity` badge (§12).
> - [GSP-0018](../proposals/0018-field-eligibility-value-semantics.md) — OPTIONAL
>   field `eligibleValues` (§6.8), meaningful only alongside `fieldRole: eligibility`.
> - [GSP-0017](../proposals/0017-agent-conformance-safety-boundary.md) — the
>   agent conformance and safety boundary (§14): a six-point MUST/MUST NOT list
>   binding conforming **consumer** behavior, not document shape, plus the
>   companion [`docs/agent-safety-model.md`](../../docs/agent-safety-model.md).
>
> Each of these was independently accepted into `spec/v0.3` by maintainer (CEO)
> sign-off before this fold-in shipped (per
> [GOVERNANCE.md](../../GOVERNANCE.md)'s one-way-door process); this document and
> [`govschema.schema.json`](./govschema.schema.json) are the fold-in itself. No
> existing v0.1/v0.2 member is removed, renamed, or tightened. See VERSIONING.md §2.

> GovSchema is an open-source standard for describing government forms and
> processes in a machine-readable way, so that software agents can interact with
> government services reliably and verifiably. GovSchema is **independent** and is
> **not** affiliated with or endorsed by any government. GovSchema describes
> processes; it does **not** submit forms on anyone's behalf.

> **Normative artifact.** The machine-readable meta-schema
> [`spec/v0.3/govschema.schema.json`](./govschema.schema.json) (JSON Schema
> 2020-12) is the normative definition of the GovSchema document format. This prose
> specification explains and constrains it. **Where this prose and the meta-schema
> disagree, the meta-schema governs.** The few requirements that cannot be expressed
> in JSON Schema are listed in §13.

---

## 1. Introduction

### 1.1 Purpose

GovSchema is the trusted, versioned, machine-readable contract that lets AI
agents understand, validate, and safely prepare government forms and
workflows — without guessing from webpages, HTML, or PDFs. Open-source and
independent: it describes and verifies government processes; it does not
submit them.

A *GovSchema document* is a versioned, machine-readable definition of a single
government form or process. It captures:

- the **fields** an applicant must supply (with types and validation rules),
- the **documents, payments, and attestations** ([GSP-0014]) a requirement may
  demand beyond a scalar value,
- the **flow** (the ordered, and optionally branching, steps of a multi-step
  process),
- the **conditional logic** ([GSP-0013]) governing when a field, document, or
  transition applies,
- the **provenance** (which government source it was derived from, and when),
- the **verification** state (how and when the document was confirmed against the
  live government source), and
- the **maturity** ([GSP-0012]) of the document along the execution-readiness
  path, when asserted.

A GovSchema document is consumed by agent developers. It lets an agent know what a
government process requires *before* interacting with it, validate user-supplied
data locally, and present an accurate, plain-language view to the human the agent
acts for.

### 1.2 What GovSchema is not

- GovSchema is **not an agent**. It does not fill out or submit forms.
- GovSchema is **not a government system** and carries no government endorsement.
- GovSchema is **not** authoritative over the government source. The live
  government source is always authoritative; a GovSchema document is a *description*
  of it, and its accuracy is asserted only through the verification record (§11).

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

A document is a **conforming GovSchema 0.3 document** if and only if:

1. It is a single JSON value that validates against the GovSchema 0.3 meta-schema
   (`spec/v0.3/govschema.schema.json`) for the `govschemaVersion` it declares, and
2. It satisfies every **MUST**/**MUST NOT** requirement in this specification that
   cannot be expressed in JSON Schema (these are listed in §13).

A **conforming consumer** is software that, given a conforming document, behaves as
required by this specification (notably §6 on field types, §7 on flow, §8 on
conditional logic, §9 on documents, and §14 on the agent conformance and safety
boundary — the one section in this list that binds consumer *behavior* rather
than how a document's shape is interpreted).

A **conforming producer** is software or a process that emits only conforming
documents.

The reference validation tooling in [`/tools`](../../tools) enforces the
meta-schema in full (`tools/validate-ajv.mjs`, JSON Schema draft 2020-12 via
ajv) and, of the §13 rules, rule 1; §13 records which of its rules are checked
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
   explicit verification record (§11) and a lifecycle `status`. A document that has
   not been confirmed against its live source MUST declare `status: draft`, so
   consumers can decide whether to trust it.
4. **Two-audience text.** Machine identifiers (`name`, `id`) are stable and terse;
   human text (`title`, `label`, `description`) is plain-language and MUST NOT
   assume legal or bureaucratic literacy.
5. **Strict and small.** A v0.3 document is *closed*: the meta-schema sets
   `additionalProperties: false` at every level, so unknown members are rejected
   rather than ignored. Richer constructs are tracked as proposals (§16) and added
   in later spec versions, not smuggled in as unrecognized members.
6. **Jurisdiction-neutral.** No structure privileges any one country. Encodings use
   international standards (ISO 3166) so the same format describes a US, UK, or any
   other jurisdiction's process.
7. **One grammar, reused.** Conditional logic ([GSP-0013]) is expressed with a
   single `Condition` type reused at every attachment point — field visibility,
   field requiredness, cross-field validation, document requiredness, and step
   transitions — rather than four bespoke, mutually-inconsistent rule languages.

---

## 4. Document model overview

A GovSchema document is a JSON object with these top-level members:

| Member                | Required | Description                                                    |
|-----------------------|----------|------------------------------------------------------------------|
| `$schema`             | yes      | URI of the meta-schema this document conforms to (§5.0).        |
| `govschemaVersion`    | yes      | Spec format version this document targets (§5.1).                |
| `id`                  | yes      | Registry identifier — the document's registry path (§5.2).      |
| `version`             | yes      | SemVer version of *this* document (§5.3).                        |
| `title`               | yes      | Human-readable process title.                                    |
| `status`              | yes      | Lifecycle status: `draft`/`verified`/`deprecated` (§11).         |
| `jurisdiction`        | yes      | Jurisdiction object (§5.4).                                      |
| `authority`           | yes      | Issuing government body (§5.5).                                  |
| `source`              | yes      | Provenance of the description (§10).                             |
| `verification`        | yes      | Verification record (§11).                                       |
| `fields`              | yes      | Non-empty array of field definitions (§6).                       |
| `description`         | no       | Plain-language summary of the process.                           |
| `process`             | no       | Process type and source language (§5.6).                         |
| `edition`             | no       | Edition/tax-year axis for time-versioned forms (§5.7).           |
| `license`             | no       | SPDX / Creative Commons identifier for the content.               |
| `steps`               | no       | Ordered, optionally branching description of the process flow (§7). |
| `documents`           | no       | Document/payment/attestation requirements, sibling to `fields` (§9). |
| `crossFieldValidation`| no       | Rules validating agreement between two or more fields (§8.3).    |
| `exclusivityGroups`   | no       | Mutually-exclusive boolean-field groups (§8.4).                  |
| `maturity`            | no       | Schema maturity badge (§12).                                     |

The normative shape is the meta-schema; this table is a summary. No other top-level
members are permitted (§3 principle 5).

---

## 5. Identity, versioning, and jurisdiction conventions

> §5.1–5.2 are the **one-way-door** parts of the standard: they are hard to change
> once schemas and consumers depend on them. They were settled by standards
> sign-off under [GSP-0001](../proposals/0001-document-model-reconciliation.md).

### 5.0 Meta-schema reference (`$schema`)

`$schema` MUST be the URI of the GovSchema meta-schema the document conforms to:
`https://govschema.org/spec/v0.3/govschema.schema.json` for this spec version.
A v0.1 or v0.2 document keeps citing its own meta-schema; the tooling selects the
meta-schema per the document's `govschemaVersion` (§2).

### 5.1 Spec version (`govschemaVersion`)

`govschemaVersion` MUST be a [Semantic Versioning 2.0.0][SemVer] string identifying
the *spec format* version the document targets (e.g. `0.3.0`), not the document's
own version. A consumer written for spec MAJOR.MINOR `0.3` SHOULD accept any `0.3.x`
document and SHOULD reject a spec MAJOR it does not recognize. Because v0.3 is a
backward-compatible superset of v0.2 (which is itself a superset of v0.1), a v0.3
consumer also accepts `0.1.x` and `0.2.x` documents.

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

> **County/municipal forms (v0.3+, [GSP-0021]).** A document scoped to a
> specific county, city, or other sub-state/sub-province body carries an
> additional locality layer **between** the subdivision and authority
> segments — no pattern change, the existing regex already permits this shape:
>
> ```
> us/fl/miami-dade/<authority>/<process>
> us/fl/miami-dade/tax-collector/homestead-exemption
> ```
>
> The locality segment MUST equal `jurisdiction.locality.slug` (§5.4, §13 rule
> 2), and its presence requires `jurisdiction.level: municipal`. A document
> with no `jurisdiction.locality` member carries no locality segment, and
> keeps the unchanged `<country>[/<subdivision>]/<authority>/<process>` shape.

The `id` is **the single source of truth linking a document to its location.** A
document MUST be stored at:

```
registry/<id>/<version>/schema.json
```

The path MUST be reconstructible from `id` and `version` alone, and `id` MUST equal
the document's path under `registry/` excluding the version directory (§13 rule 1).
The `id` does **not** include the version; it names the process across all of its
versions.

> **Time-versioned forms (v0.2+).** The `id` is also **year-agnostic**: it names the
> process across all of its *editions* as well as all of its versions. A
> time-versioned form (a form with a fresh edition each tax or award year — see
> §5.7) carries an OPTIONAL `<edition>` path layer **between** `id` and `version`:
>
> ```
> registry/<id>/<edition>/<version>/schema.json
> registry/us/irs/extension-to-file-4868/2025/1.0.0/schema.json
> ```
>
> The `<edition>` segment MUST equal the document's `edition.label` (§5.7, §13
> rule 6). For such a document `id` equals its path under `registry/` excluding
> **both** the `<edition>` and the `<version>` directories. A schema with **no**
> `edition` member keeps the unchanged `registry/<id>/<version>/schema.json` layout;
> the `edition` member is the discriminator that tells a consumer (and the
> validator) whether the segment before `<version>` is an edition or part of `id`.

> A URN-style external citation identifier (e.g. `govschema:us:dos:...`) was
> considered and **deferred** to a later spec version
> ([GSP-0002](../proposals/0002-colon-gsid-external-identifier.md)).

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
- `locality` — OPTIONAL, per [GSP-0021](../proposals/0021-municipal-county-jurisdictions.md).
  Present only when the process is scoped to a specific county, city, or other
  sub-state/sub-province body rather than the whole subdivision — ISO 3166-2
  (`subdivision`) has no codified layer below state/province, so this fills
  that gap:

  ```json
  "jurisdiction": {
    "country": "US",
    "subdivision": "US-FL",
    "locality": { "name": "Miami-Dade County", "slug": "miami-dade" },
    "level": "municipal"
  }
  ```

  - `name` — REQUIRED, the body's official or commonly-used name (e.g.
    `"Miami-Dade County"`).
  - `slug` — REQUIRED, a stable lowercase identifier
    (`^[a-z0-9][a-z0-9-]*$`) that MUST equal the `id` path's locality token
    (§5.2, §13 rule 2).

  `locality` REQUIRES `level: municipal` — a document naming a specific
  county/city but tagging itself `national` or `subnational` is inconsistent.
  The reverse is not required: `level: municipal` without `locality` stays
  valid (a municipal-scoped document may predate this GSP or describe its
  level generically without naming a specific body).
- `level` — REQUIRED. One of `national`, `subnational`, `municipal`, `supranational`.

The `country` (and `subdivision`, when present) MUST be consistent with the country
(and subdivision) tokens in `id` (§13 rule 2). Note `id` uses lowercase path tokens
while `jurisdiction` uses uppercase ISO codes; e.g. `id` `us/ca/...` ↔ `country`
`US`, `subdivision` `US-CA`. When `locality` is present, the `id` path segment
immediately after the subdivision token MUST equal `locality.slug` (§5.2, §13
rule 2).

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
- `operatedBy` — OPTIONAL, per [GSP-0020](../proposals/0020-treaty-authorized-third-party-issuers.md).
  Present only when a different, non-government body operationally runs the
  process under a treaty or statutory authorization from the government body
  named in `authority.name` (e.g. a US International Driving Permit,
  authorized by the Department of State under the 1949 Geneva Convention on
  Road Traffic but issued by the American Automobile Association):

  ```json
  "authority": {
    "name": "U.S. Department of State",
    "abbreviation": "DOS",
    "url": "https://travel.state.gov",
    "operatedBy": {
      "name": "American Automobile Association",
      "abbreviation": "AAA",
      "url": "https://www.aaa.com",
      "basis": "Designated issuer of International Driving Permits under the 1949 Geneva Convention on Road Traffic and U.S. Department of State authorization."
    }
  }
  ```

  `authority.name`/`abbreviation`/`url` keep their existing meaning
  unchanged — the government body whose authorization creates and governs
  the process — regardless of whether `operatedBy` is present.

  - `name` — REQUIRED, the operating body's official name.
  - `abbreviation` — OPTIONAL, a short form.
  - `url` — OPTIONAL, the operator's official homepage.
  - `basis` — REQUIRED, a short plain-language citation of the legal or
    treaty instrument under which the operator is authorized. This is what
    distinguishes a genuinely government-designated third-party operator
    from an unaffiliated private company; `operatedBy` MUST NOT be used to
    name an operator with no such authorization.

### 5.6 Process (`process`)

OPTIONAL classification of the process:

- `type` — one of `application`, `registration`, `renewal`, `amendment`, `filing`,
  `request`, `other`.
- `language` — [BCP 47] language tag of the source form (e.g. `en-US`).

### 5.7 Edition (`edition`)

> §5.7 and the `<edition>` path grammar (§5.2) are **one-way-door** parts of the
> standard, unchanged from v0.2. They were settled by maintainer sign-off under
> [GSP-0005](../proposals/0005-edition-axis-time-versioned-forms.md).

OPTIONAL. `edition` is the **temporal axis** for *time-versioned forms* — forms
that publish a fresh edition each tax or award year, keyed to that year, with
fields and rules that differ from the prior year's edition (e.g. the US 1040,
Form 4868, FAFSA; the UK SA100). It is **orthogonal to `version`** (§5.3): a new
tax year is a new *edition*, never a `version` bump, and editions **coexist**.

```json
"edition": { "scheme": "us-tax-year", "label": "2025" }
```

- `scheme` — REQUIRED. One of `us-tax-year`, `gb-tax-year`, `award-year`. The
  vocabulary is **closed** (`additionalProperties: false`) and extended only by an
  additive spec MINOR.
- `label` — REQUIRED. The edition key, matching `^[a-z0-9][a-z0-9-]*$`. It MUST
  equal the `<edition>` registry-path segment (§5.2, §13 rule 6).

A document **without** `edition` is not time-versioned and uses the unchanged
`registry/<id>/<version>/schema.json` layout. A document **with** `edition` MUST be
stored at `registry/<id>/<edition.label>/<version>/schema.json`.

---

## 6. Fields

`fields` is a non-empty array of **field definition** objects. Order is meaningful:
it is the default presentation order when a document has no `steps`.

### 6.1 Field definition members

| Member          | Required | Description                                               |
|-----------------|----------|-------------------------------------------------------------|
| `name`          | yes      | Stable machine key, unique within the document.             |
| `label`         | yes      | Plain-language label as it appears on the source form.      |
| `type`          | yes      | One of the GovSchema types (§6.2).                          |
| `required`      | no       | Whether a value MUST be supplied. Default `false`.          |
| `description`   | no       | Longer plain-language explanation or guidance.               |
| `sourceRef`     | no       | Where the field appears on the source form (e.g. `Box 4a`). |
| `validation`    | no       | Validation rules; keyword set depends on `type` (§6.3).      |
| `classification`| no       | Advisory sensitivity/data-classification hint (§6.5).        |
| `fieldRole`     | no       | `data` (default) or `eligibility` (§6.8).                    |
| `eligibleValues`| no       | Values that keep an applicant eligible via this pathway; only alongside `fieldRole: eligibility` (§6.8). |
| `visibleWhen`   | no       | Condition gating this field's visibility (§6.7).             |
| `requiredWhen`  | no       | Condition gating this field's requiredness (§6.7).           |

`name` MUST match `^[a-z][a-zA-Z0-9_]*$` and MUST be unique among all fields in the
document (§13 rule 3).

> v0.3 fields are still **flat**: there is no nested-object or array element model
> and no labelled-option member. Composite inputs (e.g. an address) are expressed
> as several flat fields with a shared `name` prefix. Richer field models remain
> tracked for a later spec version (§16).

### 6.2 Types

| `type`     | JSON value | Notes                                                  |
|------------|------------|--------------------------------------------------------|
| `string`   | string     | Free text; constrain with `pattern`/`maxLength`.       |
| `number`   | number     | Real number.                                           |
| `integer`  | integer    | Whole number.                                          |
| `boolean`  | boolean    | Yes/no.                                                |
| `date`     | string     | Full date, `YYYY-MM-DD` ([RFC 3339] full-date).        |
| `enum`     | string     | One of the values listed in `validation.enum` (§6.4.1).|
| `file`     | —          | A document upload, referenced by metadata, not bytes (§6.6).|
| `object`   | object     | A composite value carried opaquely. Prefer flat fields where possible.|

### 6.3 Validation is type-scoped

`validation` is an object whose **permitted keyword set depends on the field's
`type`** ([GSP-0007]): a `file` field permits only the file-upload keywords
(§6.6); every other type permits the v0.1/v0.2 keyword set (§6.4). This
conditional shape (a JSON Schema `if`/`then`/`else` keyed on `type`) resolves
GSP-0007's design point and is the pattern any future type-scoped keyword
follows, rather than each keyword inventing its own mechanism.

### 6.4 Validation keywords (non-`file` types)

- For `string`: `minLength`, `maxLength`, `pattern`.
- For `number`/`integer`: `minimum`, `maximum`.
- For `enum`: `enum` (§6.4.1).

No other keywords are permitted on a non-`file` field (`validation` is closed for
these types). A richer constraint vocabulary (`format`, `exclusiveMinimum`,
`multipleOf`, `minItems`) remains deferred to a later spec version (§16).

#### 6.4.1 Enumerated values

When `type` is `enum`, `validation.enum` is a non-empty array of the allowed values.
v0.3 lists **values only**; a human-facing label per value is not part of the field
model. Describe the choices in the field's `description` where needed. (Labelled
options remain a tracked future additive,
[GSP-0003](../proposals/0003-labelled-enum-options.md); not folded into this cut.)

### 6.5 Sensitivity classification (`classification`)

*New in v0.3 ([GSP-0006]).*

```json
{
  "name": "socialSecurityNumber",
  "label": "Social Security Number",
  "type": "string",
  "classification": "sensitive-pii"
}
```

OPTIONAL, non-empty string. An **open vocabulary**: consumers SHOULD ignore (not
reject) a value they do not recognize, so new classifications are additive.
Recommended starter vocabulary (non-exhaustive, lowercase, hyphenated):

| Value           | Meaning                                                        |
|-----------------|-----------------------------------------------------------------|
| `pii`           | Personally identifying, ordinary sensitivity (name, address).   |
| `sensitive-pii` | Heightened sensitivity (SSN, passport #, biometric, DOB).       |
| `financial`     | Financial-account or payment data.                              |
| `health`        | Health or medical data.                                         |

`classification` is **purely advisory**. A consumer **MAY** use it to drive
redaction, masking, access control, or other special handling. A consumer
**MUST NOT** treat its presence or absence as a regulatory or legal determination:
GovSchema is a standards body, not a compliance authority, and `classification`
records an *engineering* hint about the data's nature, never an assertion that the
field is "PII under GDPR/CCPA/etc." or that any particular legal obligation
attaches.

### 6.6 File fields and their constraints

*Constraint keywords new in v0.3 ([GSP-0007]).*

A `file` field's value is metadata describing an upload, not the bytes. GovSchema
never transports file contents. A `file` field's `validation` permits two OPTIONAL,
additive keywords:

```json
{
  "name": "evidenceOfName",
  "label": "Evidence of name change",
  "type": "file",
  "validation": {
    "maxBytes": 5242880,
    "mediaTypes": ["application/pdf", "image/jpeg"]
  }
}
```

- `maxBytes` — OPTIONAL non-negative integer; the maximum accepted upload size in
  bytes, as published by the source. Bytes, not "MB", to keep the unit unambiguous.
- `mediaTypes` — OPTIONAL non-empty array of **IANA media type** strings
  (RFC 6838), e.g. `application/pdf`, `image/jpeg`. Fully specified types only; no
  `image/*`-style wildcards.

Both are *recorded source facts*, not GovSchema policy: a producer publishes them
only when the source states them. No other keyword is permitted in a `file`
field's `validation` (§6.3).

### 6.7 Conditional visibility and requiredness (`visibleWhen`, `requiredWhen`)

*New in v0.3 ([GSP-0013] §2); see §8.1 for the shared `Condition` grammar.*

```json
{
  "name": "llcMemberCount",
  "label": "Number of LLC members",
  "type": "integer",
  "visibleWhen": { "field": "isLLC", "equals": true },
  "requiredWhen": { "field": "isLLC", "equals": true }
}
```

- Both members OPTIONAL. Absent `visibleWhen` → always visible (unchanged v0.1/v0.2
  behavior). Absent `requiredWhen` → the existing static `required` boolean governs
  (unchanged).
- When `requiredWhen` is present, static `required` MUST be `false` or absent — a
  field MUST NOT carry two independent claims about its own requiredness that could
  disagree.
- **Visibility gates requiredness.** A field's *effective* requiredness is `false`
  whenever its effective visibility is `false`, regardless of what `requiredWhen`
  or static `required` say. A hidden field can never block submission. This is a
  runtime evaluation rule, not just an authoring convention.
- **Acyclicity.** Treat every field's `visibleWhen`/`requiredWhen` as a directed
  edge from that field to each field its condition references. This graph MUST be
  acyclic (§13 rule 8): a field referencing itself, directly or transitively, is
  invalid.

### 6.8 Field role (`fieldRole`)

*New in v0.3 ([GSP-0014] §2).*

```json
{
  "name": "passportLostOrStolen",
  "label": "Was your most recent passport lost, stolen, or damaged?",
  "type": "boolean",
  "fieldRole": "eligibility"
}
```

OPTIONAL, one of `data` (default) or `eligibility`. Purely a presentation/grouping
hint distinguishing an ordinary data-collection field from an eligibility/gating
question — it changes **no** validation behavior. Composes unchanged with
`visibleWhen`/`requiredWhen` (§6.7): an eligibility-role field is very often also
the field a later `Condition` references, but `fieldRole` itself carries no
conditional semantics.

### 6.9 Eligibility values (`eligibleValues`)

*New in v0.3 ([GSP-0018]).*

```json
{
  "name": "passportLostOrStolen",
  "label": "Has your most recent passport ever been reported lost or stolen?",
  "type": "boolean",
  "required": true,
  "fieldRole": "eligibility",
  "eligibleValues": [false]
}
```

OPTIONAL non-empty array. Meaningful **only** alongside `fieldRole: eligibility`
(§6.8) — a field carrying `eligibleValues` MUST also carry `fieldRole` set to
`"eligibility"`. Names the subset of this field's otherwise-valid values that
keep an applicant eligible via this pathway.

`eligibleValues` makes **no validation claim**: a value absent from
`eligibleValues` MUST still be accepted as well-formed input whenever it
satisfies `type`/`validation` (§6.3). An applicant whose passport genuinely was
lost or stolen MUST be able to truthfully answer `true` to the example above —
that answer is valid data, not a schema violation; it only means the applicant
cannot continue via *this* pathway with that answer. A consumer SHOULD surface
a value outside `eligibleValues` as an eligibility/routing outcome ("you may
need to apply in person"), never as a data-validation error. Do **not** use
`validation.enum` to express this: `validation` governs well-formed input, and
constraining it to the eligible value(s) would make a truthful, disqualifying
answer look invalid.

For documents that also model `steps[].transitions` (§7.2, [GSP-0013]), the
same fact can be expressed at the flow level via a `when`/`to: null` exit
transition; `eligibleValues` is a lighter, flow-independent complement, not a
replacement, and a schema MAY carry both.

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
  presented at this step), OPTIONAL `next` (the `id` of the linear successor step;
  omitted on the final step), and OPTIONAL `transitions` (§7.2, the branching
  alternative to `next`).

Every field `name` referenced by a step MUST exist in `fields`, and every `next`
MUST name an existing step (§13 rule 4).

### 7.2 Conditional transitions (`transitions`)

*New in v0.3 ([GSP-0013] §4, resolving [GSP-0004]'s open terminal-sentinel
question). Supersedes GSP-0004's step-only sketch; unchanged in shape.*

```json
"transitions": [
  { "to": null, "exitReason": "route-to-in-person-application",
    "when": { "field": "passportLostOrStolen", "equals": true } },
  { "to": "applicant_details" }
]
```

- OPTIONAL alternative to `next` on a step, for branching flow. A step MAY
  carry `next` OR `transitions`, **never both** — they are two shapes for the
  same fact (the successor step), and a producer MUST NOT assert it twice.
  Enforced by the meta-schema (a step object with both is invalid).
- Transitions are evaluated **top-to-bottom**; the first entry whose `when`
  matches (or that has no `when` at all) wins. A `when`-less transition is an
  unconditional fallthrough and SHOULD be last.
- `to` — REQUIRED. Either the `id` of an existing step, or JSON `null` meaning
  **end of flow here**. `null`, not a string sentinel, so there is no collision
  risk with a real step `id`.
- `exitReason` — OPTIONAL free-text/slug explaining *why* the flow ended there
  (e.g. `route-to-in-person-application`), meaningful mainly alongside `to: null`.
- `when` — OPTIONAL `Condition` (§8.1).
- §13 rule 4 extends to: every `to` MUST be `null` or name an existing step.

---

## 8. Conditional logic

*New in v0.3 ([GSP-0013]). One shared grammar, reused at every attachment point:
field visibility/requiredness (§6.7), document requiredness (§9.1), step
transitions (§7.2), and cross-field validation (§8.3).*

### 8.1 The `Condition` type

```json
{ "any": [
  { "field": "passportLostOrStolen", "equals": true },
  { "field": "passportUndamaged", "equals": false }
] }
```

A `Condition` is exactly one of:

- **Leaf comparison** — `{ "field": <name>, "<op>": <value> }`, exactly one `<op>`
  alongside `field`. `<op>` is one of: `equals`, `notEquals`, `in`, `greaterThan`,
  `greaterThanOrEqual`, `lessThan`, `lessThanOrEqual`.
- **Boolean composition** — `{ "all": [<Condition>, ...] }`,
  `{ "any": [<Condition>, ...] }`, or `{ "not": <Condition> }`, each with at least
  one nested `Condition` (`not` takes exactly one).

A `Condition` references `field` `name`s only (flat fields, per the current
field model). No executable code, no string interpolation, no side effects — a
small, closed, statically-analyzable grammar an agent evaluates with a short
interpreter, not a general expression language.

### 8.2 Terminal / exit states

See §7.2. `to: null` is the shared terminal sentinel for the flow; document
requiredness (§9.1) and cross-field validation (§8.3) reuse the same `Condition`
type but have no analogous "exit" concept of their own.

### 8.3 Cross-field validation (`crossFieldValidation`)

*[GSP-0013] §3.*

```json
"crossFieldValidation": [
  {
    "id": "employmentCountsRequireHighestCount",
    "when": { "field": "highestExpectedEmployees", "equals": 0 },
    "requireAbsent": ["expectedAgriculturalEmployees", "expectedHouseholdEmployees"]
  },
  {
    "id": "endNotBeforeStart",
    "compare": { "field": "endDate", "operator": "greaterThanOrEqual", "compareTo": "startDate" }
  }
]
```

New top-level OPTIONAL, non-empty array. Each rule has a unique `id` (for error
reporting, §13 rule 3-sibling discipline) and is **exactly one** of two shapes:

- a `when` (a `Condition`) plus `requireAbsent` and/or `requirePresent` (non-empty
  arrays of field `name`s); or
- a `compare`: `{ "field": <name>, "operator": <op>, "compareTo": <name> }`,
  comparing two named fields' values directly. `operator` is drawn from the same
  set as the base `Condition` leaf operators, minus `in` (which needs a literal
  list, not a second field, on its right-hand side).

A rule MUST NOT mix the two shapes (e.g. `when` alongside `compare`).

### 8.4 Mutually exclusive choices (`exclusivityGroups`)

*[GSP-0013] §5.*

```json
"exclusivityGroups": [
  { "id": "eitherFileTypeElection", "fields": ["file944AnnuallyElection", "quarterlyFilingConfirmed"] }
]
```

New top-level OPTIONAL, non-empty array: at most one field in each named group may
be **set** at once. Kept document-level (one array) rather than duplicated per
field, since exclusivity is a property of the *group*, not any one member.

- `fields` MUST reference at least two fields of `type: boolean` only.
- "Set" means the field's value is `true` (`false` or absent does not count). This
  is a deliberate scope trim: every motivating example is a pair of boolean
  checkboxes. A non-boolean mutual-exclusivity need, if one appears, extends this
  member against a real example rather than guessing now.

---

## 9. Documents (`documents`)

*New in v0.3 ([GSP-0014] §1). A new top-level, OPTIONAL, sibling array to
`fields`: a requirement the applicant must satisfy, which may or may not
correspond to a single scalar value — as distinct from `fields[]`, which is a
value the applicant supplies.*

```json
"documents": [
  {
    "id": "priorPassport",
    "label": "Most recent U.S. passport",
    "category": "identity-document",
    "required": true,
    "belongsTo": "applicant",
    "acceptedTypes": ["us-passport-book", "us-passport-card"],
    "issuingAuthority": "U.S. Department of State",
    "handling": "mail-original-return-requested",
    "sourceRef": "DS-82, prior passport submission instructions"
  },
  {
    "id": "applicationFee",
    "category": "payment",
    "required": true,
    "amount": { "currency": "USD", "value": 130 },
    "methods": ["check", "money-order"]
  },
  {
    "id": "applicantSignature",
    "category": "attestation",
    "required": true,
    "statement": "I certify under penalties of perjury that this application is true, correct, and complete."
  }
]
```

### 9.1 Document entry members

| Member             | Required | Description                                                          |
|---------------------|----------|--------------------------------------------------------------------------|
| `id`                | yes      | Unique within `documents[]`, matches `^[a-z][a-zA-Z0-9_]*$`.             |
| `label`             | yes      | Human-readable name.                                                     |
| `category`          | yes      | **Closed**: `identity-document` / `supporting-evidence` / `payment` / `attestation`. |
| `required`          | yes      | Boolean. MUST be `false` when `requiredWhen` is present.                 |
| `requiredWhen`      | no       | `Condition` (§8.1) gating this document's requiredness.                  |
| `belongsTo`         | no       | `applicant` / `dependent` / `responsible-party` / `other` — whom the document is *about*. |
| `acceptedTypes`     | no       | Open, per-schema array of source-defined document-type slugs.            |
| `freshness`         | no       | `{ issuedWithin: <ISO 8601 duration or null> }` when the source requires the document not be too old. |
| `issuingAuthority`  | no       | Free text — who issued the document.                                     |
| `handling`          | no       | Free-text/slug source instruction about the physical document. Descriptive, never actionable. |
| `constraints`       | no       | Reuses `validation`'s file shape verbatim (`maxBytes`/`mediaTypes`, §6.6). `identity-document`/`supporting-evidence` only. |
| `ocr`               | no       | `{ extractable: boolean, populatesFields: [<field name>] }`, advisory only. `identity-document`/`supporting-evidence` only. |
| `amount`            | no       | `{ currency: <ISO 4217>, value: <number> }`. `payment` only.              |
| `methods`           | no       | Open array of accepted payment-method slugs. `payment` only.             |
| `statement`         | no       | Exact attestation text, verbatim from the source. `attestation` only.    |
| `sourceRef`         | no       | Where in the source material this requirement is published.             |

`category` is **closed** (not open like `classification`, §6.5) because a
consumer's handling logic branches structurally on which of the four it is —
`payment` and `attestation` entries do not even carry a file.

**Category-scoped members** — `constraints`/`ocr` apply only to
`identity-document`/`supporting-evidence`; `amount`/`methods` apply only to
`payment`; `statement` applies only to `attestation`. A producer setting a
category-mismatched member (e.g. `amount` on an `attestation` entry) is invalid
(enforced by the meta-schema).

`ocr.populatesFields` is **advisory only**: a consumer MAY use OCR to prefill the
named fields; the schema makes no claim about OCR accuracy and does not
substitute for a conforming consumer's own user-confirmation obligations (§14).

---

## 10. Source / provenance

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

## 11. Lifecycle status and verification

### 11.1 Status (`status`)

`status` is one of:

- `draft` — derived from a source but not independently confirmed current.
- `verified` — a verification practice has confirmed the document matches the live
  source, and `verification.lastVerifiedAt` is current per the practice's cadence.
- `deprecated` — the source process changed or was retired. Deprecated documents are
  retained for reproducibility, never deleted.

A `verified` document whose `verification.nextReviewBy` has passed SHOULD be treated
by consumers as `draft` until re-verified.

### 11.2 Verification record (`verification`)

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
- `notes` — OPTIONAL. Free text stating the verification claim honestly.

Verification *semantics* (the *how*) are defined by the verification practice the
`method` names; this specification fixes only the **shape** of the claim so
consumers can read it uniformly.

---

## 12. Schema maturity levels (`maturity`)

*New in v0.3 ([GSP-0012]). OPTIONAL top-level member, **orthogonal to
`status`**: a `draft` schema can still be richly modeled; a `verified` schema can
still be flat. Consumers needing both signals read both; neither subsumes the
other.*

```json
"maturity": {
  "level": "agent-ready-schema",
  "criteria": {
    "structuralReference": true,
    "verifiedSchema": true,
    "agentReadySchema": true,
    "executionTestedSchema": false
  },
  "method": "maturity-self-assessment-v1",
  "assertedBy": "GovSchema Engineering",
  "assertedAt": "2026-08-01"
}
```

### 12.1 Members

- `level` — REQUIRED. One of `structural-reference` / `verified-schema` /
  `agent-ready-schema` / `execution-tested-schema`. **Derived**, not an
  independent input: `level` MUST equal the highest tier in `criteria` whose
  value, and every lower tier's value, is `true`.
- `criteria` — REQUIRED object, one boolean per tier (§12.2), keyed
  `structuralReference` / `verifiedSchema` / `agentReadySchema` /
  `executionTestedSchema`.
- `method` — REQUIRED. Identifier of the assessment practice used, resolved the
  same way `verification.method` resolves against `practices/` (§11.2). The
  first such practice is `maturity-self-assessment-v1` (producer self-declares
  `criteria` at authoring time).
- `assertedBy` / `assertedAt` — REQUIRED. Named `asserted*`, not `verified*`, on
  purpose: `maturity` starts as a producer's own claim about their own document,
  distinct from `verification.verifiedBy`'s third-party confirmation.

### 12.2 The four tiers

| Tier (`criteria` key) | Criteria |
|---|---|
| **Structural Reference** (`structuralReference`) | `fields[]` present, each entry carrying `type`; exactly one `source` cited (§10). Already required of every conforming document; this rung gives consumers an explicit floor to point at. |
| **Verified Schema** (`verifiedSchema`) | `status: verified` and `verification.lastVerifiedAt` current per the named practice's cadence (§11.1). |
| **Agent-Ready Schema** (`agentReadySchema`) | Verified Schema, **plus**: every real branch in the source process is expressed as `steps[].transitions` (§7.2), not left in step `description` prose; every real document/eligibility/payment/attestation requirement is expressed in `documents[]` (§9) or `fieldRole: eligibility` (§6.8); every terminal/exit state the source defines is reachable via an explicit `to: null` transition (§7.2), none silently absent. |
| **Execution-Tested Schema** (`executionTestedSchema`) | Agent-Ready Schema, **plus**: a sibling `mapping.json` ([GSP-0011], §17) exists whose own `verification` is current under `selector-probe-v1`; a conformance fixture exists and a non-submitting harness reaches its terminal "review, do not submit" state without error. (The fixture format is [GSP-0016]'s concern, not yet accepted; this tier's second criterion has a named slot but no implementable check until it lands — a tooling-sequencing gap, not a blocker to this tier's schema-shape existing.) |

### 12.3 Cumulative ladder, no gaps

`criteria` MUST NOT assert a higher tier `true` while a lower tier is `false`
(e.g. `executionTestedSchema: true` with `agentReadySchema: false` is invalid).
The four tiers are a strict ladder, not four independent switches — enforced by
the meta-schema (§13 rule 9) jointly with the `level`/`criteria` consistency rule
above, since the valid `(level, criteria)` combinations are a small, enumerable
set.

### 12.4 The asserted-then-checked pattern

Same shape as `verification` (§11.2), reused for a second axis:

- A producer declares `maturity` at authoring time under
  `maturity-self-assessment-v1` — an honest, source-informed claim.
- A future `tools/validate-maturity.mjs` recomputes the mechanically-checkable
  half of `criteria` from the document's actual shape and flags a mismatch in CI.
  It is **one-directional**: it can prove a producer's asserted `true` is
  unsubstantiated and demote the claim, but it never promotes a producer's own
  `false` to `true`.
- CI severity (hard-fail vs. warn on a detected mismatch) is a tooling/CI policy
  call for the Founding Engineer once `tools/validate-maturity.mjs` exists, not a
  spec-shape decision.

### 12.5 Backfill

Schemas authored before v0.3 need no retroactive `maturity` declaration:
`maturity` is OPTIONAL and additive, the same forward-only rollout pattern
`mapping.json` ([GSP-0011]) used. Authors declare it starting with the first
version bump authored after this fold-in.

---

## 13. Normative requirements not expressible in JSON Schema

A conforming document MUST additionally satisfy:

1. **id / path consistency** — `id` MUST equal the document's path under `registry/`
   excluding the version directory **and**, when the document carries an `edition`
   member, excluding the `<edition>` directory as well. (§5.2, §5.7)
2. **id / jurisdiction consistency** — the country token in `id` MUST equal
   `jurisdiction.country` lowercased; when a subdivision token is present in `id` it
   MUST be consistent with `jurisdiction.subdivision`. When `jurisdiction.locality`
   is present, the `id` path segment immediately after the subdivision token MUST
   equal `jurisdiction.locality.slug`, and `jurisdiction.level` MUST be `municipal`.
   (§5.2, §5.4, [GSP-0021])
3. **Field name uniqueness** — `name`s MUST be unique among all fields. (§6.1)
4. **Flow reference integrity** — every step `fields` entry MUST resolve to a
   defined field `name`; every `next` MUST name an existing step; every
   `transitions[].to` MUST be `null` or name an existing step. (§7)
5. **Verification consistency with status** — when `status` is `verified`,
   `verification.lastVerifiedAt` MUST be present and current per the named practice;
   a `draft` document still carries a `verification` record describing its
   source review. (§11)
6. **Edition / segment consistency** — when an `edition` member is present, the
   document MUST sit one directory deeper than a non-edition document, and the
   `<edition>` path segment MUST equal `edition.label`. When `edition` is absent, no
   `<edition>` directory may be present. (§5.2, §5.7)
7. **Mapping referential integrity** — when a `mapping.json` companion is present
   alongside a `schema.json` (§17), every `fields[].name` in `mapping.json` MUST
   resolve to a field `name` defined in the sibling `schema.json`'s `fields`. (§17,
   [GSP-0011])
8. **Field-level condition acyclicity** — treat every field's
   `visibleWhen`/`requiredWhen` as a directed edge to each field its condition
   references; this graph MUST be acyclic. A field referencing itself, directly or
   transitively, is invalid. (§6.7, [GSP-0013])

> **Maturity ladder / level consistency** (§12.3, [GSP-0012]) is a normative rule
> but, unlike rules 1–8 above, **is** fully expressible in JSON Schema: the closed,
> small `(level, criteria)` combination space is enforced directly in the
> meta-schema via an enumerated combination list, so it is not listed here as an
> exception.

The GovSchema validation tooling (`tools/`) enforces the full meta-schema
(`tools/validate-ajv.mjs`, JSON Schema draft 2020-12, selected per the document's
`govschemaVersion`) — including the maturity ladder rule, which is expressed
directly in the meta-schema — and, of the rules above, rules 1 and 6. Rules 2–5,
7, and 8 are validated incrementally as the tooling matures. Rule 7 is enforced by
both `tools/validate.mjs` and `tools/validate-ajv.mjs` whenever a `mapping.json` is
present; its absence is not an error. The zero-dependency `tools/validate.mjs`
additionally checks the structural subset of the meta-schema and rules 1 and 6
with no install step. CI (`.github/workflows/validate.yml`) runs both.

---

## 14. Agent conformance and safety boundary

*New in v0.3 ([GSP-0017]). Applies to every GovSchema document and to every
conforming consumer (§2) — GovSchema's first conformance rule binding consumer
**behavior**, not document shape. Generalizes §17.4's `mapping.json`-only scope
boundary to every document and every consumption layer in
[`docs/agent-consumption.md`](../../docs/agent-consumption.md).*

### 14.1 The six-point MUST / MUST NOT list

A **conforming consumer** — any agent, script, or service built on any
GovSchema document, through any layer in `docs/agent-consumption.md` (a raw
fetch, `llms.txt`, the reference MCP server, the installable Skill, or a
client built from scratch) — MUST satisfy all of the following:

1. **No submission authorization.** A GovSchema document MUST NOT be treated
   as authorization to submit anything to a government system, on the
   applicant's behalf or otherwise. GovSchema describes a process; it does
   not authorize acting on it.
2. **Confirm before submit.** A conforming agent MUST obtain explicit,
   informed user confirmation before any final submission action, regardless
   of how complete or internally validated the collected data is. Passing
   every `validation` rule (§6) is a claim about data shape, not a claim that
   the user has reviewed and authorized what is about to be sent.
3. **Stricter handling for sensitive and identity data.** A conforming agent
   MUST apply stricter handling — at minimum, explicit confirmation before
   use and no third-party transmission without consent — to any field
   carrying a `classification` value other than the public default
   ([GSP-0006], §6.5) or any `documents[]` entry whose `category` is
   `identity-document` ([GSP-0014], §9). This is a floor: a consumer MAY
   apply additional safeguards (e.g. encryption at rest, redacted logging);
   it MUST NOT apply less.
4. **Surface currency before relying on draft data.** A conforming agent MUST
   surface a document's `status` (§11.1) and `verification` record (§11.2) —
   or its `maturity` (§12), where present — to the user, or otherwise account
   for it in its own decision-making, before relying on that document to
   collect or validate data. It MUST NOT silently treat a `draft` or
   `deprecated` document, or one whose `verification.nextReviewBy` has
   passed, as current without surfacing that fact.
5. **No endorsement claim.** A conforming agent MUST NOT represent a
   GovSchema document, or any output derived from it, as government-issued,
   government-endorsed, or legally authoritative.
6. **Applies uniformly, no wrapper exemption.** Rules 1–5 above apply
   identically across every consumption layer in `docs/agent-consumption.md`.
   None is exempt for being "just a convenience wrapper" over the same data.

### 14.2 Relationship to §17.4 (`mapping.json` scope boundary)

§17.4's `mapping.json`-specific scope boundary ("describe, never prescribe")
is this section's direct precedent and narrower special case, enforced
structurally: no `action`, `submitUrl`, or `next` members exist in that
artifact's meta-schema to define. §14 states the same posture as a
document-independent conformance rule, generalized to every GovSchema
document and every consumption layer, not just `mapping.json`.

### 14.3 Enforcement

Rule 6 (§14.1) has one structural, machine-checkable expression today: a
conformance fixture format with no `submit` action in its vocabulary at all
([GSP-0016], once accepted) cannot describe a violation of rule 1 even by
mistake — the same technique §17.4 already uses for `mapping.json`. Rules 2–5
bind a consumer's runtime behavior, which GovSchema — a document format and a
set of static files — has no execution environment in which to mechanically
observe. They are stated as normative MUSTs on the same reasoning as §13's
non-machine-checkable rules: a stated boundary with an honest enforcement gap
is still a real conformance property, reviewable and citable in an incident
report, even before tooling exists to check it automatically.

### 14.4 Companion documentation

[`docs/agent-safety-model.md`](../../docs/agent-safety-model.md) restates
this section's six points in plain language, for the audience building
against GovSchema without reading this specification directly. It is
non-normative; where it and this section disagree, this section governs.

---

## 15. Media type and file conventions

- File name: **`schema.json`** within the registry version directory
  (`registry/<id>/<version>/schema.json`, or
  `registry/<id>/<edition>/<version>/schema.json` for a time-versioned form, §5.7).
- Suggested media type: `application/govschema+json`.
- Encoding: UTF-8. Documents MUST be valid JSON.

---

## 16. Open questions and deferred constructs (non-normative)

These were considered during founding and deferred to keep the core small. Each is
tracked as a proposal under [`spec/proposals/`](../proposals/). **v0.2** folded in
the edition/tax-year axis ([GSP-0005]). **v0.3** (this document) folds in
classification ([GSP-0006]), file constraints ([GSP-0007]), conditional logic
([GSP-0013]), documents/`fieldRole` ([GSP-0014]), maturity ([GSP-0012]),
eligibility values ([GSP-0018]), and the agent conformance and safety boundary
([GSP-0017], §14). The rest remain deferred:

- **Labelled enum options** — `{value, label}` pairs ([GSP-0003]).
- **URN-style external identifier** — colon GSID for external citation ([GSP-0002]).
- **Nested field model** — object/array fields with nested `fields`/`items`
  ([GSP-0009], still undecided, CEO-flagged one-way-door).
- **Richer scalar constraints** — `format`, `exclusiveMinimum`, `multipleOf`, array
  constraints.
- **Calculated / derived fields** — deferred from v0.3 by founder decision
  ([GSP-0013] §7); revisit only against a concrete, narrowly-scoped case.
- **Extensions** — a namespaced `extensions` object for vendor/experimental data
  ([GSP-0010]).
- **Localization** — multiple language variants of human text within one document.
- **Verification as an operational trust layer** — [GSP-0015], accepted for
  v0.3, not yet folded into this cut.
- **Conformance fixtures** — [GSP-0016], not yet accepted; the slot its artifact
  fills is named in §12.2's Execution-Tested tier but not yet defined.

---

## 17. Companion artifact: `mapping.json` (optional)

*Normative if present, per [GSP-0011], maintainer-accepted. Unchanged from v0.2:
this companion artifact's shape is not affected by any of the seven GSPs this
document folds in.* A **separate, OPTIONAL companion artifact**, sibling to
`schema.json`, never a member inside it, maps a schema's field names to candidate
locator signals on the live web page presenting the form — which `<input>`,
`<select>`, or ARIA-labelled control a browser-driving agent should target for a
named field.

### 17.1 Shape and location

- Normative shape: [`spec/v0.2/mapping.schema.json`](../v0.2/mapping.schema.json)
  (JSON Schema 2020-12) — reused unchanged; v0.3 does not introduce its own
  mapping meta-schema, since none of the seven folded-in GSPs touch this artifact.
  As with `schema.json`, where this prose and that meta-schema disagree, the
  meta-schema governs.
- Location: `registry/<id>/<version>/mapping.json`, or
  `registry/<id>/<edition>/<version>/mapping.json` for a time-versioned form —
  exactly the directory of the schema version it describes.
- `schema.id` / `schema.version` inside `mapping.json` MUST equal the sibling
  `schema.json`'s `id` / `version`.

### 17.2 Referential integrity

See §13 rule 7: every `fields[].name` MUST resolve to a field defined in the
sibling `schema.json`. Partial coverage is permitted.

### 17.3 Its own verification record

`mapping.json` carries its own `verification` block, structurally similar to but
independent of the schema's: a schema's `status: verified` is a claim about
legal-content fidelity; a mapping's freshness claim is about selectors still
resolving on the live page. These MUST NOT be conflated into one flag.

### 17.4 Scope boundary — describe, never prescribe

This is a hard boundary, not a style preference, per [GOVERNANCE.md](../../GOVERNANCE.md):

- `mapping.json` is **descriptive only**: it says *where a value for a named
  field goes on the page*. It MUST NOT contain a submission endpoint or action
  URL; a "submit"/"next"/navigation locator or instruction of any kind; autofill
  or auto-submit instructions, sequencing, or timing directives; or anything from
  which "how to complete and submit this form end-to-end" could be assembled
  without a human or an independent agent decision at every step.
- The meta-schema enforces this structurally: no `action`, `submitUrl`, or `next`
  members exist to define, and `additionalProperties: false` at every level
  rejects any attempt to add them.

### 17.5 Additive and optional — no effect on `schema.json` conformance

The **absence** of `mapping.json` MUST NOT affect whether the sibling
`schema.json` conforms to this specification. A **present** `mapping.json` that
fails its own validation is an error in the mapping artifact, never a reason to
invalidate the sibling schema.

---

## References

- [RFC 2119] Key words for use in RFCs. <https://www.rfc-editor.org/rfc/rfc2119>
- [RFC 8174] Ambiguity of Uppercase vs Lowercase. <https://www.rfc-editor.org/rfc/rfc8174>
- [RFC 3339] Date and Time on the Internet. <https://www.rfc-editor.org/rfc/rfc3339>
- [JSON Schema 2020-12] <https://json-schema.org/specification-links#2020-12>
- [SemVer] Semantic Versioning 2.0.0. <https://semver.org/spec/v2.0.0.html>
- ISO 3166-1 / ISO 3166-2 — Country and subdivision codes.
- [BCP 47] Tags for Identifying Languages.
- IANA Media Types (RFC 6838).
- ISO 4217 — Currency codes.
- ISO 8601 — Durations.

[RFC 2119]: https://www.rfc-editor.org/rfc/rfc2119
[RFC 8174]: https://www.rfc-editor.org/rfc/rfc8174
[RFC 3339]: https://www.rfc-editor.org/rfc/rfc3339
[JSON Schema 2020-12]: https://json-schema.org/specification-links#2020-12
[SemVer]: https://semver.org/spec/v2.0.0.html
[BCP 47]: https://www.rfc-editor.org/info/bcp47
[GSP-0002]: ../proposals/0002-colon-gsid-external-identifier.md
[GSP-0003]: ../proposals/0003-labelled-enum-options.md
[GSP-0004]: ../proposals/0004-conditional-flow.md
[GSP-0005]: ../proposals/0005-edition-axis-time-versioned-forms.md
[GSP-0006]: ../proposals/0006-sensitivity-classification.md
[GSP-0007]: ../proposals/0007-file-field-constraints.md
[GSP-0009]: ../proposals/0009-composite-repeating-values.md
[GSP-0010]: ../proposals/0010-namespaced-extensions.md
[GSP-0011]: ../proposals/0011-field-page-element-mapping.md
[GSP-0012]: ../proposals/0012-schema-maturity-levels.md
[GSP-0013]: ../proposals/0013-extended-conditional-logic.md
[GSP-0014]: ../proposals/0014-documents-as-first-class-model.md
[GSP-0016]: ../proposals/0016-conformance-fixtures.md
[GSP-0017]: ../proposals/0017-agent-conformance-safety-boundary.md
[GSP-0018]: ../proposals/0018-field-eligibility-value-semantics.md
[GSP-0021]: ../proposals/0021-municipal-county-jurisdictions.md
