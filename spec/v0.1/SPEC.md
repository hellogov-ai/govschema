# GovSchema Specification

**Version:** 0.1 (DRAFT)
**Status:** Draft — pending CEO/standards sign-off (one-way-door review)
**Date:** 2026-06-30
**Editor:** Founding Engineer, GovSchema
**This document:** `spec/v0.1/SPEC.md`

> GovSchema is an open, non-profit standard for describing government forms and
> processes in a machine-readable way, so that software agents can interact with
> government services reliably and verifiably. GovSchema is **independent** and is
> **not** affiliated with or endorsed by any government. GovSchema describes
> processes; it does **not** submit forms on anyone's behalf.

---

## 1. Introduction

### 1.1 Purpose

A *GovSchema document* is a versioned, machine-readable definition of a single
government form or process. It captures:

- the **fields** an applicant must supply (with types and validation rules),
- the **flow** (ordered steps and the conditions that govern them),
- the **provenance** (which government source it was derived from, and when), and
- the **verification** state (whether the document has been confirmed against the
  live government source, and how).

A GovSchema document is consumed by agent developers. It lets an agent know what a
government process requires *before* interacting with it, validate user-supplied
data locally, and present an accurate, plain-language view to the human the agent
acts for.

### 1.2 What GovSchema is not

- GovSchema is **not an agent**. It does not fill out or submit forms.
- GovSchema is **not a government system** and carries no government endorsement.
- GovSchema is **not** authoritative over the government source. The live
  government source is always authoritative; a GovSchema document is a *description*
  of it, and its accuracy is asserted only through the verification practice
  (see §9).

### 1.3 Audience

Two audiences are served by every document:

1. **Agent developers** — who consume the machine-readable definition.
2. **The humans those agents act for** — who are served by the human-readable
   `label`, `description`, and `helpText` fields, which MUST be written in plain
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
   (`spec/v0.1/govschema-document.schema.json`), and
2. It satisfies every **MUST**/**MUST NOT** requirement in this specification that
   cannot be expressed in JSON Schema (these are listed in §10).

A **conforming consumer** is software that, given a conforming document, behaves as
required by this specification (notably §6.4 on unknown values and §7 on flow
evaluation).

A **conforming producer** is software or a process that emits only conforming
documents.

---

## 3. Design principles

1. **JSON Schema where it fits.** Field-level validation reuses a constrained
   subset of [JSON Schema 2020-12] vocabulary rather than inventing new validation
   keywords. This keeps GovSchema interoperable with the large existing ecosystem
   of JSON Schema validators.
2. **Provenance is mandatory.** A field that cannot be traced to a government
   source is not a standard; it is a guess. Every document MUST cite its source.
3. **Verification is first-class, not a footnote.** Every document carries an
   explicit verification block (§9). An unverified document is valid but MUST
   declare itself unverified, so consumers can decide whether to trust it.
4. **Two-audience text.** Machine identifiers are stable and terse; human text is
   plain-language and MUST NOT assume legal or bureaucratic literacy.
5. **Forward-compatible.** Consumers MUST ignore unknown object members rather than
   reject them, so that minor revisions do not break older consumers (§6.4).
6. **Jurisdiction-neutral.** No structure privileges any one country. Encodings use
   international standards (ISO 3166) so the same format describes a US, UK, or any
   other jurisdiction's process.

---

## 4. Document model overview

A GovSchema document is a JSON object with these top-level members:

| Member          | Required | Description                                            |
|-----------------|----------|--------------------------------------------------------|
| `govschema`     | yes      | Spec format version this document targets (§5.1).      |
| `id`            | yes      | Canonical GovSchema identifier — GSID (§5.2).          |
| `version`       | yes      | SemVer version of *this* document (§5.3).              |
| `status`        | yes      | Lifecycle status: `draft`/`published`/`deprecated`.    |
| `title`         | yes      | Human-readable process title.                          |
| `description`   | no       | Plain-language summary of the process.                 |
| `jurisdiction`  | yes      | Jurisdiction object (§5.4).                            |
| `authority`     | yes      | Issuing government body (§5.5).                         |
| `source`        | yes      | Provenance of the description (§8).                    |
| `verification`  | yes      | Verification state (§9).                                |
| `fields`        | yes      | Array of field definitions (§6).                        |
| `flow`          | no       | Ordered steps and transitions (§7).                     |
| `locale`        | no       | BCP 47 language tag(s) the human text is written in.   |
| `extensions`    | no       | Namespaced vendor/experimental data (§10.3).            |

The normative shape is the meta-schema; this table is a summary.

---

## 5. Identity, versioning, and jurisdiction conventions

> These conventions are the **one-way-door** parts of the standard. They are hard to
> change once schemas and consumers depend on them, and are the primary subject of
> CEO/standards sign-off.

### 5.1 Spec version (`govschema`)

The `govschema` member MUST be the string `"0.1"` for documents targeting this
specification. It identifies the *format* version, not the document's own version.
The value is `MAJOR.MINOR`; a consumer written for `0.1` MUST accept any `0.1`
document and SHOULD reject a `MAJOR` it does not recognize.

### 5.2 Canonical identifier (GSID)

Every document has a globally unique **GovSchema Identifier (GSID)** in the `id`
member, of the form:

```
govschema:{jurisdiction}:{authority}:{process}
```

- `{jurisdiction}` — ISO 3166-1 alpha-2 country code, lowercased; OPTIONALLY a
  subdivision suffixed with a hyphen using the ISO 3166-2 subdivision code,
  lowercased (e.g. `us`, `us-ca`, `gb`).
- `{authority}` — a stable, lowercased slug for the issuing body (e.g. `dos`,
  `hmpo`, `dmv`). Slugs match `^[a-z0-9]([a-z0-9-]*[a-z0-9])?$`.
- `{process}` — a stable, lowercased slug for the form/process
  (e.g. `passport-renewal-adult`). Same slug grammar as `{authority}`.

The GSID does **not** include the version; a GSID names the process across all of
its versions. Examples:

```
govschema:gb:hmpo:passport-renewal-adult
govschema:us-ca:dmv:vehicle-registration-renewal
govschema:us:dos:passport-renewal-ds82
```

### 5.3 Document version (`version`)

The `version` member is a [Semantic Versioning 2.0.0][SemVer] string for *this
document's content*:

- **PATCH** — editorial fixes, clarified help text, corrected typos; no change to
  fields, types, validation, or flow semantics.
- **MINOR** — backward-compatible additions: new OPTIONAL field, new enum value, a
  new step that does not alter existing required inputs.
- **MAJOR** — backward-incompatible change: a field removed or made required, a type
  or validation tightened, a flow change that invalidates previously-valid inputs.

A consumer that has validated user data against version *X* MUST re-validate when
the document advances to a higher MAJOR.

### 5.4 Jurisdiction (`jurisdiction`)

```json
"jurisdiction": { "country": "gb", "subdivision": null }
```

- `country` — REQUIRED. ISO 3166-1 alpha-2, lowercased.
- `subdivision` — OPTIONAL. ISO 3166-2 subdivision code (the part after the hyphen,
  lowercased, e.g. `ca` for California). `null` or absent means national scope.

The `jurisdiction` member MUST be consistent with the `{jurisdiction}` token in the
GSID.

### 5.5 Authority (`authority`)

```json
"authority": {
  "slug": "hmpo",
  "name": "His Majesty's Passport Office",
  "url": "https://www.gov.uk/government/organisations/hm-passport-office"
}
```

- `slug` — REQUIRED, matches the `{authority}` token in the GSID.
- `name` — REQUIRED, the body's official name.
- `url` — OPTIONAL, the authority's official homepage.

### 5.6 Registry path mapping

When published to the GovSchema registry, a document is stored at:

```
registry/{country}/{subdivision?}/{authority}/{process}/{version}/document.govschema.json
```

The path is derived deterministically from the GSID and `version`. Examples:

```
GSID  govschema:gb:hmpo:passport-renewal-adult            v1.0.0
path  registry/gb/hmpo/passport-renewal-adult/1.0.0/

GSID  govschema:us-ca:dmv:vehicle-registration-renewal    v1.0.0
path  registry/us/ca/dmv/vehicle-registration-renewal/1.0.0/
```

This mapping is normative: a conforming registry MUST store documents at this path,
and the path MUST be reconstructible from the document's `id` and `version` alone.

---

## 6. Fields

`fields` is an array of **field definition** objects. Order is meaningful: it is the
default presentation order when a document has no `flow`.

### 6.1 Field definition members

| Member        | Required | Description                                               |
|---------------|----------|-----------------------------------------------------------|
| `id`          | yes      | Machine identifier, unique within the document.           |
| `label`       | yes      | Plain-language label shown to humans.                     |
| `type`        | yes      | One of the GovSchema types (§6.2).                        |
| `required`    | no       | Whether a value MUST be supplied. Default `false`.        |
| `description` | no       | Longer plain-language explanation.                        |
| `helpText`    | no       | Guidance on how to fill the field correctly.              |
| `constraints` | no       | Validation rules (§6.3).                                  |
| `options`     | cond.    | Allowed values; REQUIRED when `type` is `enum`.           |
| `items`       | cond.    | Element definition; REQUIRED when `type` is `array`.      |
| `fields`      | cond.    | Sub-fields; REQUIRED when `type` is `object`.             |
| `sensitive`   | no       | `true` if the value is PII/sensitive. Default `false`.    |
| `source`      | no       | Field-level provenance: the name/number on the live form. |

`id` MUST match `^[a-z][a-z0-9_]*$` and MUST be unique among sibling fields. A
producer SHOULD set `sensitive: true` for any field carrying personal identifiers
(name, date of birth, passport/ID numbers, SSN, addresses), so consumers can apply
appropriate handling.

### 6.2 Types

| `type`     | JSON value      | Notes                                              |
|------------|-----------------|----------------------------------------------------|
| `string`   | string          | Free text; constrain with `pattern`/`maxLength`.   |
| `number`   | number          | Real number.                                       |
| `integer`  | integer         | Whole number.                                      |
| `boolean`  | boolean         | Yes/no.                                            |
| `date`     | string          | Full date, `YYYY-MM-DD` ([RFC 3339] full-date).    |
| `datetime` | string          | Timestamp, [RFC 3339] date-time.                   |
| `enum`     | string          | One of `options` (§6.3.1).                         |
| `object`   | object          | Composite; defined by nested `fields`.             |
| `array`    | array           | List; element shape defined by `items`.            |
| `file`     | object          | A document upload; described by metadata (§6.5).   |

### 6.3 Constraints

`constraints` is an object using a **constrained subset of JSON Schema 2020-12
validation keywords**, so existing validators can be reused. Permitted keywords:

- For `string`: `minLength`, `maxLength`, `pattern`, `format`.
- For `number`/`integer`: `minimum`, `maximum`, `exclusiveMinimum`,
  `exclusiveMaximum`, `multipleOf`.
- For `array`: `minItems`, `maxItems`, `uniqueItems`.
- General: `const`, `default`.

Permitted `format` values (string): `email`, `date`, `date-time`, `uri`,
`phone-e164`, `postal-code`, `iso-country`, `iso-subdivision`. Producers MUST NOT
use `format` to express a constraint that a consumer cannot enforce as advisory;
per JSON Schema, `format` is **annotation by default** and consumers MAY treat it as
advisory unless a profile says otherwise.

#### 6.3.1 Enumerated options

When `type` is `enum`, `options` is a non-empty array of `{ "value", "label" }`
objects. `value` is the machine token submitted; `label` is the plain-language text
shown to humans. `value`s MUST be unique within the field.

### 6.4 Forward compatibility (unknown members)

A conforming consumer MUST ignore object members it does not recognize, at every
level of the document, rather than reject the document. This lets `0.1.x` documents
carry additive members that a `0.1` consumer can safely skip.

### 6.5 File fields

A `file` field's value is metadata describing an upload, not the bytes. Its nested
`constraints` MAY include `maxBytes` (integer) and `mediaTypes` (array of IANA media
type strings, e.g. `["application/pdf", "image/jpeg"]`). GovSchema never transports
file contents.

---

## 7. Flow

`flow` describes the order and conditionality of a multi-step process. It is
OPTIONAL; a document without `flow` is a flat form whose presentation order is the
`fields` array order.

### 7.1 Flow model

```json
"flow": {
  "start": "eligibility",
  "steps": [
    {
      "id": "eligibility",
      "title": "Check you can renew online",
      "fields": ["held_previous_passport", "passport_lost_or_stolen"],
      "transitions": [
        { "to": "applicant_details", "when": { "field": "passport_lost_or_stolen", "equals": false } },
        { "to": "use_paper_form",    "when": { "field": "passport_lost_or_stolen", "equals": true  } }
      ]
    }
  ]
}
```

- `start` — REQUIRED, the `id` of the first step.
- `steps` — REQUIRED, array of step objects.
- Each **step**: `id` (unique within the flow), `title`, OPTIONAL `description`,
  `fields` (ordered array of field `id`s presented at this step), and OPTIONAL
  `transitions`.
- Each **transition**: `to` (a step `id`, or the literal `"__end__"` to terminate),
  and OPTIONAL `when` condition (§7.2). Transitions are evaluated top-to-bottom; the
  **first** whose condition holds is taken. A transition with no `when` is an
  unconditional fallthrough and SHOULD be last.

Every field `id` referenced by any step MUST exist in `fields`. Every `to` MUST name
an existing step or `"__end__"`. A flow MUST NOT contain an unconditional cycle
(a cycle reachable with all `when` conditions absent).

### 7.2 Conditions

A condition is a small, closed expression structure (no executable code). v0.1
supports:

- **Comparison:** `{ "field": "<id>", "equals": <value> }` — also `notEquals`, `in`
  (array), `greaterThan`, `lessThan` (numbers/dates).
- **Boolean composition:** `{ "all": [ <cond>, ... ] }`, `{ "any": [ <cond>, ... ] }`,
  `{ "not": <cond> }`.

`field` MUST reference a field `id` that appears in an earlier or current step.
Conditions are pure and side-effect-free; a conforming consumer evaluates them
against collected field values only.

---

## 8. Source / provenance

```json
"source": {
  "url": "https://www.gov.uk/renew-adult-passport",
  "officialFormId": "—",
  "retrievedAt": "2026-06-30",
  "notes": "Online renewal service; no paper form number for the digital flow."
}
```

- `url` — REQUIRED. The canonical government page or form the document describes.
- `officialFormId` — OPTIONAL. The government's own form identifier (e.g. `DS-82`).
- `retrievedAt` — REQUIRED. Full-date the source was last read by the producer.
- `notes` — OPTIONAL. Free text on scope or caveats.

A document MUST cite exactly one primary `source`. Additional supporting references
MAY be carried under `extensions` (§10.3).

---

## 9. Verification

```json
"verification": {
  "status": "unverified",
  "method": null,
  "lastVerifiedAt": null,
  "verifiedAgainst": null
}
```

- `status` — REQUIRED. One of:
  - `unverified` — derived from the source but not confirmed against it by a
    verification practice.
  - `automated` — confirmed by an automated check against the live source.
  - `human-reviewed` — confirmed by a human reviewer.
- `method` — OPTIONAL. Identifier of the verification practice applied (the
  GovSchema verification-practice methodology is specified separately; see GOV-6).
- `lastVerifiedAt` — OPTIONAL full-date; REQUIRED when `status` is not `unverified`.
- `verifiedAgainst` — OPTIONAL. The `source.url` value at the time of verification,
  for drift detection.

Verification semantics (the *how*) are deliberately out of scope for this document
and are defined by the verification-practice methodology. This specification only
fixes the **shape** of the verification claim so consumers can read it uniformly.

---

## 10. Normative requirements not expressible in JSON Schema

A conforming document MUST additionally satisfy:

1. **GSID/jurisdiction consistency** — the `{jurisdiction}` token in `id` MUST equal
   `jurisdiction.country` (plus `-{subdivision}` when present). (§5.2, §5.4)
2. **GSID/authority consistency** — the `{authority}` token in `id` MUST equal
   `authority.slug`. (§5.2, §5.5)
3. **Field id uniqueness** — `id`s MUST be unique among sibling fields. (§6.1)
4. **Flow reference integrity** — every step `fields` entry and every transition
   `to` MUST resolve; no unconditional cycles. (§7.1)
5. **Condition field scope** — a condition's `field` MUST be in scope. (§7.2)
6. **Verification date presence** — `lastVerifiedAt` REQUIRED when `status` ≠
   `unverified`. (§9)

The GovSchema validation tool (`tools/`) checks both the meta-schema and these
rules.

### 10.3 Extensions

`extensions` is an OPTIONAL object whose members are namespaced keys of the form
`x-{vendor}-{name}`. Consumers MUST ignore extension members they do not recognize.
Extensions MUST NOT alter the meaning of standard members.

---

## 11. Media type and file conventions

- File name: `document.govschema.json` within the registry version directory.
- Suggested media type: `application/govschema+json`.
- Encoding: UTF-8. Documents MUST be valid JSON. YAML MAY be used for authoring but
  the registry stores canonical JSON.

---

## 12. Open questions for v0.2 (non-normative)

- A richer condition language (string matching, arithmetic) vs. keeping conditions
  intentionally minimal.
- Localization: multiple language variants of human text within one document vs.
  sibling locale documents.
- Cross-document references (a process that depends on another process's output).
- Signing/attestation of verified documents.

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
