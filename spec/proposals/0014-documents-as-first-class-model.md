# GSP-0014: Documents as a first-class model (`documents[]` array)

- **Status:** Accepted — for `spec/v0.3`. CEO sign-off recorded 2026-07-01
  ([GOV-315](/GOV/issues/GOV-315) `ask_user_questions` decision, "Accept as
  written").
- **Author:** Standards Engineer
- **Date:** 2026-07-01
- **Issue:** GOV-315, drafted per RFC 0003 §5 (GOV-302)
- **Affects:** `spec/vN/govschema.schema.json` (new top-level `documents[]`
  array; new `fieldRole` member on `fields[]`), §6 (field model), a new §8
  (documents), `tools/`, every consumer that needs to know what an applicant
  must submit beyond scalar field values. **Depends on** GSP-0013 (the shared
  `Condition` type, for `documents[].requiredWhen`), GSP-0006
  (`classification`, referenced for consistency though not reused directly),
  and GSP-0007 (`maxBytes`/`mediaTypes`, folded into `documents[].constraints`)
  — all three already accepted into `spec/v0.3`.

## Problem

Today's only document primitive is `type: file` on a `fields[]` entry — one
upload, described by `description` prose, with at most `maxBytes`/`mediaTypes`
(GSP-0007). Real government forms distinguish far more than "a value the
applicant supplies": data fields, eligibility questions, identity documents,
supporting evidence, payment obligations, and signed attestations are six
different kinds of requirement, and only the first is a scalar value a field
can hold. A payment obligation and a sworn statement are not uploads at all;
forcing them through `type: file` would be a category error, not a schema gap.

Concretely, none of the following have anywhere structured to live today:
whose document it is (the applicant's own passport vs. a dependent's), how
fresh it must be, who issued it, what physical handling the source expects
(e.g. "mail the original, it will be returned"), whether OCR could satisfy a
field from it, or a payment's amount/accepted methods. Passport-renewal (prior
passport handling, photo requirements) and EIN/SS-4 (responsible-party
identity, entity-formation evidence) are RFC 0003's motivating examples, and
both need several of these facts simultaneously.

## Design choice: a new top-level `documents[]` array, not richer `file` fields

Recommend a **separate, OPTIONAL top-level array**, sibling to `fields`,
rather than overloading `type: file` (RFC 0003 §5, founder-confirmed via the
GOV-302 `documents-model shape` decision: "separate-array"):

- Keeps `fields[]` doing one job — a value the applicant supplies, of a
  scalar type — and `documents[]` doing another: a requirement the applicant
  must *satisfy*, which may or may not correspond to a single scalar value
  (lens: *least surprise*, one construct per concern).
- Sidesteps any dependency on GSP-0009 (nested/array fields, the highest-risk,
  CEO-flagged proposal still in flight). A document requirement is a fixed,
  enumerable list per form, not an unbounded repeating structure, so it needs
  no array-of-object field support to exist (lens: *composability & reuse* —
  reuse the flat-field model as-is; don't couple this GSP's fate to an
  unrelated open one-way door).
- Composes cleanly with GSP-0006 (`classification`, already accepted) and
  GSP-0007 (`maxBytes`/`mediaTypes`, already accepted), the latter folded
  directly into `documents[].constraints` below rather than duplicated.

## Sketch (non-normative)

### 1. The `documents[]` array

```json
"documents": [
  {
    "id": "priorPassport",
    "label": "Most recent U.S. passport",
    "category": "identity-document",
    "required": true,
    "belongsTo": "applicant",
    "acceptedTypes": ["us-passport-book", "us-passport-card"],
    "freshness": { "issuedWithin": null },
    "issuingAuthority": "U.S. Department of State",
    "handling": "mail-original-return-requested",
    "sourceRef": "DS-82, prior passport submission instructions"
  },
  {
    "id": "recentPhoto",
    "label": "Passport photo",
    "category": "supporting-evidence",
    "required": true,
    "constraints": { "mediaTypes": ["image/jpeg"], "maxBytes": 5242880 },
    "ocr": { "extractable": false }
  },
  {
    "id": "nameChangeEvidence",
    "label": "Legal name-change document",
    "category": "supporting-evidence",
    "requiredWhen": { "field": "nameChanged", "equals": true },
    "acceptedTypes": ["marriage-certificate", "court-order", "divorce-decree"]
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

New top-level OPTIONAL array, sibling to `fields`. Each entry is one document
*requirement* (not one uploaded file — a requirement the applicant must
satisfy, however that is satisfied). Members:

- `id` — REQUIRED, same naming discipline as a field `name`
  (`^[a-z][a-zA-Z0-9_]*$`) — unique within `documents[]`, referenceable from
  error reporting and (per §2 below) from `fields[].fieldRole`-adjacent
  tooling.
- `label` — REQUIRED human-readable name.
- `category` — REQUIRED, **closed vocabulary**: `identity-document` /
  `supporting-evidence` / `payment` / `attestation`. Closed (not open like
  GSP-0006's `classification`) because a consumer's handling logic branches
  structurally on which of these four it is — payment and attestation entries
  do not even carry a file — so an unrecognized value would leave a consumer
  unable to render or validate the entry at all (lens: *spec precision over
  cleverness*: an open vocabulary here would be ambiguous, not extensible).
  ("Data field" and "eligibility question" are the other two distinctions
  GOV-302 asked for; they are not documents at all — see §2.
- `required` — REQUIRED boolean. `requiredWhen` — OPTIONAL, the same
  `Condition` type as GSP-0013 §2, for a document needed only under some
  condition (e.g. name-change evidence required only when `nameChanged:
  true`). Mirrors GSP-0013's own field-level rule name-for-name: when
  `requiredWhen` is present, static `required` MUST be `false`, so a document
  never carries two independent, possibly-conflicting requiredness claims
  (same discipline as GSP-0013 §2, one fact asserted once).
- `belongsTo` — OPTIONAL, one of `applicant` / `dependent` /
  `responsible-party` / `other` — whom the document is *about*, distinct from
  who submits it (e.g. a parent submits a dependent's birth certificate).
- `acceptedTypes` — OPTIONAL array of source-defined document-type slugs. An
  **open, per-schema vocabulary** (not a closed cross-schema enum): the set of
  acceptable identity-document or evidence types is a fact about the specific
  government process, not something GovSchema can enumerate universally
  across every jurisdiction (lens: *internationalization & jurisdiction-
  neutrality*).
- `freshness` — OPTIONAL `{ issuedWithin: <ISO 8601 duration> }` (e.g.
  `"P6M"`) when the source requires the document not be too old. Absent or
  `issuedWithin: null` means no freshness requirement is published.
- `issuingAuthority` — OPTIONAL free text — who issued the document (distinct
  from the government body the *form* belongs to).
- `handling` — OPTIONAL free-text/slug for source-specific instructions about
  the *physical* document (e.g. `mail-original-return-requested`). Descriptive
  of what the source does, never an instruction telling a consumer to act —
  same non-actionability boundary as GSP-0011 §13.4 and this GSP's own §4
  safety note.
- `constraints` — OPTIONAL, **reuses GSP-0007's shape verbatim**:
  `{ maxBytes, mediaTypes }`. Meaningful only when the requirement is
  actually a file upload (`identity-document` / `supporting-evidence`);
  MUST NOT be present on `payment` or `attestation` entries, which are never
  file uploads. One constraint shape for both `fields[].validation` (GSP-0007,
  standalone `type: file`) and `documents[].constraints` (here) — not two
  independently-drifting vocabularies for the same fact (lens: *composability
  & reuse*).
- `ocr` — OPTIONAL `{ extractable: boolean, populatesFields: [<field name>] }`
  — whether OCR against this document could satisfy named `fields[]` entries
  (e.g. a prior passport's number/issue date), and which ones by `name`.
  **Advisory only**: a consumer MAY use OCR to prefill `populatesFields`; the
  schema makes no claim about OCR accuracy and does not substitute for the
  user-confirmation requirement a conforming consumer already owes under the
  safety boundary (GSP-0017, in progress). This is the narrow, real-case-
  scoped alternative to a general `computed` field that GSP-0013 §7
  deliberately declined to invent.
- `amount` / `methods` — OPTIONAL, meaningful **only** on `category: payment`
  entries. `amount` is `{ currency: <ISO 4217>, value: <number> }`; `methods`
  is an open array of accepted payment-method slugs (e.g. `"check"`,
  `"money-order"`, `"credit-card"`) — open, not closed, since accepted payment
  rails vary by jurisdiction and change over time.
- `statement` — OPTIONAL, meaningful **only** on `category: attestation`
  entries — the exact text the applicant is certifying, verbatim from the
  source. Recording the literal wording (not a paraphrase) matters because an
  attestation's legal weight lives in its precise language (lens:
  *source-of-truth fidelity*).
- `sourceRef` — OPTIONAL, same meaning as `fields[].sourceRef` today: where in
  the source material this requirement is published.

**Category-scoped members, stated once as a normative rule rather than
per-field:** `constraints` and `ocr` apply only to `identity-document` /
`supporting-evidence`; `amount`/`methods` apply only to `payment`; `statement`
applies only to `attestation`. A producer setting a category-mismatched member
(e.g. `amount` on an `attestation` entry) is invalid. This is the same
type-scoped-member pattern GSP-0007 already established for
`validation.maxBytes`/`mediaTypes` on `type: file` — one small design pattern,
reused, not reinvented (lens: *least surprise*).

### 2. Data fields vs. eligibility questions — `fieldRole`

The other half of GOV-302's six-way distinction (data vs. eligibility) is not
a document at all — it is a lighter-touch, OPTIONAL member on `fields[]`
entries, closed vocabulary `data` (default) / `eligibility`:

```json
{
  "name": "passportLostOrStolen",
  "label": "Was your most recent passport lost, stolen, or damaged?",
  "type": "boolean",
  "fieldRole": "eligibility"
}
```

- Purely a presentation/grouping hint (e.g. "answer these gating questions
  before the rest of the form") — it changes **no** validation behavior.
- Composes unchanged with GSP-0013's `visibleWhen`/`requiredWhen`: an
  eligibility-role field is very often also the field a later `Condition`
  references (e.g. `passportLostOrStolen` gating `nameChangeEvidence`'s
  `requiredWhen` above), but `fieldRole` itself carries no conditional
  semantics — it only labels the field's *purpose*, not its *behavior*.
- Default (`data`, when absent) preserves today's behavior exactly: every
  v0.1/v0.2 field is implicitly `data`-role, so this is purely additive.

## Relationship to GSP-0013 (`Condition` type)

GSP-0013 §6 reserved this exact attachment point and named it in advance:
"when GSP-0014 defines `documents[]`, each entry's conditional requiredness
reuses this exact `Condition` type via a `requiredWhen` member, matching §2's
field convention name-for-name." This GSP delivers on that reservation
unchanged — no new condition grammar, no second `requiredWhen` shape. One
grammar, now four attachment points in production use (field visibility/
requiredness, cross-field validation, step transitions, document
requiredness), exactly as GSP-0013 committed to.

## Open questions

- **`acceptedTypes` registry.** Whether a shared, documented (but still
  open) starter vocabulary of common `acceptedTypes` slugs (passport,
  national ID, birth certificate, marriage certificate...) would help
  cross-schema consistency, the way GSP-0006 published a recommended starter
  vocabulary for `classification` without closing it. No blocker to
  acceptance; can be authored later from real registry usage.
- **Multiple documents satisfying one requirement.** Today `acceptedTypes` is
  "any one of these types satisfies this entry." A requirement satisfiable by
  a *combination* of documents (e.g. "either passport, or driver's license
  plus birth certificate") has no shape yet. No concrete motivating example
  in the registry today; revisit if one appears rather than generalizing now
  (lens: *spec precision over cleverness*).
- **`documents[].id` acyclicity/graph rules.** GSP-0013's acyclicity rule
  covers `fields[]` conditions referencing other `fields[]`. `documents[]`
  entries reference `fields[]` (via `requiredWhen`) but never each other, so
  no analogous document-to-document cycle is possible today; noting this
  explicitly rather than silently assuming it.

## Decision — Accepted

CEO accept-into-`spec/v0.3` sign-off was requested on:

1. The new top-level `documents[]` array as designed (§1): the four-way
   `category` split, `requiredWhen` reusing GSP-0013's `Condition` type
   verbatim, `belongsTo`, `acceptedTypes`, `freshness`, `issuingAuthority`,
   `handling`, `constraints` (reusing GSP-0007's shape), `ocr.populatesFields`,
   and the `payment`/`attestation`-only `amount`/`methods`/`statement`
   members.
2. The lighter `fieldRole: data | eligibility` member on `fields[]` (§2) —
   presentation-only, no validation-behavior change.
3. The separate-array design choice over richer `type: file` fields —
   already founder-confirmed on the GOV-302 RFC interaction, restated here for
   the record since this is the GSP that carries it.

**Recorded:** Accepted as written ([GOV-315](/GOV/issues/GOV-315) decision
interaction, resolved 2026-07-01) — "Accept as written — fold `documents[]` +
`fieldRole` into `spec/v0.3`." All three points above are accepted as
proposed, with no requested changes.

This proposal remains non-normative text: acceptance authorizes the design
for a future `spec/v0.3` fold-in; no meta-schema or SPEC.md change ships with
this GSP. Per RFC 0003 §12, acceptance unblocks GSP-0012 (maturity levels,
needs documents in place to define the Agent-Ready tier's criteria),
GSP-0016 (conformance fixtures), and the EIN/SS-4 flagship, all sequenced
after this GSP per the RFC's recommended order.
