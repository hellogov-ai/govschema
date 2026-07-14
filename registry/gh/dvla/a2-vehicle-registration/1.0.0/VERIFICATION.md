# Verification record — `gh/dvla/a2-vehicle-registration` v1.0.0

This file is the source-review record for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields/documents and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-14`

This is GovSchema Standard Research cycle **GOV-2955** (child of **GOV-2952**,
which independently fetched and read this source and pre-verified the
candidate this cycle). Ghana already exists in the registry at 5 of 6
verticals (National ID & Civic Documents — GOV-2510, Taxes — GOV-2697,
Visa — GOV-2698, Business Formation — GOV-2704, Passport — GOV-2703). This
document **closes Ghana's DMV vertical — Ghana now stands at 6 of 6, its
first jurisdiction outside the original launch set to reach full coverage
via this vertical's own dedicated cycle** (following Colombia, Bulgaria,
Romania at 6/6 previously).

## Why this candidate, and a correction to this registry's own prior finding

CATALOG.md already carries a prior entry (GOV-2716, dated 2026-07-13, one
day before this cycle) recording Ghana's DMV vertical as **"a confirmed dead
end"** — it found `dvla.gov.gh` rebuilt on a modern stack (a Next.js
marketing site plus a Nuxt.js "online services" SPA at
`service.dvla.gov.gh`), with the *online system* fully login-gated and no
downloadable paper Form F/F1 specimen found anywhere, including in the
Wayback Machine's archive of the agency's historical forms/publications
paths.

That finding is **not contradicted here** — `service.dvla.gov.gh` (the
transactional, account-linked online-services SPA) may well still be
login-gated, and this cycle did not re-test it. What GOV-2716 did not check
is `www.dvla.gov.gh/services` — the **main marketing site's own public
Services page**, a distinct route on the primary `dvla.gov.gh` domain (not
the `service.` subdomain), which independently re-fetched this cycle with no
login/CAPTCHA at any point. Both facts can be true at once: DVLA's
transactional backend requires an account, while its public marketing site
publishes a field-by-field Requirements/Procedures walkthrough of every DMV
service openly. This is disclosed as a **correction/refinement** of the
prior cycle's scope, not a reversal of its specific claim about
`service.dvla.gov.gh` or about the absence of a downloadable Form F/F1 (which
remains true — no PDF specimen was found or claimed here either; the source
used is the HTML services page itself, not a PDF).

## Sources examined

### Source 1 (primary `source`, the Services page)

- **URL:** `https://www.dvla.gov.gh/services`
- **Retrieved / reviewed:** 2026-07-14, independently re-fetched this cycle
  with `curl` from scratch (not trusted from the GOV-2952 issue's own cited
  figures without independent re-derivation).
- **HTTP status:** 200. **Content-Type:** `text/html`. **Size:** 179,310
  bytes (`sha256:
  d3352ee18a71b4f4956ae9968064b4cbbbe5f9dc147565fa00bee51475cd1e37`,
  independently computed this cycle with `sha256sum`).
- **Rendering:** a Next.js App Router page. The server-sent HTML response
  already embeds the full page text (confirmed by stripping every HTML tag
  with a regex and finding the complete "A2 Vehicle Registration"
  Requirements/Procedures prose present verbatim in the raw response body,
  with no client-side-only rendering gate encountered) — a plain `curl`
  fetch was sufficient, no headless-browser rendering was needed for this
  cycle (unlike some other jurisdictions' JS-heavy portals in this
  registry).
- **What it confirms:** the full "Vehicle Registration" service catalogue —
  A1 (Roadworthiness Certification) through A13 (Trade Plate), and "Driver
  Licensing" B1 (Learner's Licence) through at least B5 (Foreign Licence
  Conversion) — each with its own Requirements/Procedures/Note sections.
  This schema models only **A2 Vehicle Registration**, whose text reads
  (verbatim, re-derived independently this cycle, not copied from the
  issue):
  - **Requirements — OWNER:** (1) the vehicle; (2) original customs entry
    documents; (3) vehicle inspection report from a designated PVTS; (4) two
    recent passport pictures of both old and new owners; (5) valid Ghana
    Card.
  - **Requirements — AUTHORIZED AGENT** (explicitly "in addition to the
    above requirements documents"): Power of Attorney from the owner
    (authorization letter); valid Ghana Card of the authorized agent; two
    passport-size pictures of the authorised agent. **Not modelled in
    v1.0.0** — see "Scope" below.
  - **Requirements — PERSONALISED NUMBER** (explicitly "in addition to the
    above, submit an application letter stating"): proposed personalized
    number not exceeding 6 characters; vehicle chassis number; current
    registration number; vehicle registration certificate; valid Ghana Card.
    **Modelled as an optional, additive branch** (see "Scope" below).
  - **Procedures** (5 steps): present the vehicle with the customs entry at
    a PVTS for testing and to obtain the inspection report; present the
    vehicle with customs documents to DVLA officials for authentication and
    release; present all documents to DVLA officials for inspection,
    verification of ownership, and processing; present any other documents
    DVLA may require; obtain an invoice and pay the prescribed fees based on
    cubic capacity/tonnage.
  - **MANUAL REGISTRATION** (3 steps): complete Form A, VRC, and all
    required forms, affix photograph, and sign; return completed forms to
    DVLA for processing; obtain registration number, plate(s), endorsed
    registration documents, VRC, and roadworthy sticker.
  - **ONLINE REGISTRATION** (2 steps): capture biometric details; obtain
    certificate of title, vehicle registration smart card, plate(s), VRC,
    and roadworthy sticker.
  This byte-level re-derivation matches the GOV-2952 issue's own citation of
  this text exactly, an independent confirmation of the candidate (not a
  trust-on-face-value repetition of the issue's own claims).

### Source 2 (context, DVLA's legal basis)

- **URL:** `https://www.dvla.gov.gh/about`
- Fetched this cycle: HTTP 200, `text/html`, 50,057 bytes (`sha256:
  18df5ab58936f53eaa8486dad07866a0e6299540a41d880f8a296e5b2900b96f`).
- Confirms DVLA's own stated legal basis, quoted verbatim: *"The Authority
  is established by an Act of Parliament, (The Driver and Vehicle Licensing
  Authority Act, 1999 (Act 569), (the 'DVLA Act'), with the object of
  promoting good driving standards in the country and ensuring the use of
  roadworthy vehicles on roads and other public places... The DVLA's
  functions have been further boosted by the passage of the Road Traffic
  Act, 2004 (Act 683)."* `authority.operatedBy` is left unset in
  `schema.json` since DVLA is itself the statutory authority (not "operated
  by" a separately-named parent body with its own independently-confirmable
  URL for this schema to cite) — the Act 569/Act 683 basis is disclosed here
  in prose instead of forced into the `operatedBy` shape, following this
  registry's practice of omitting the member rather than asserting an
  unconfirmed reporting-line citation (cf. `mk/mvr/baranje-za-izdavanje-na-vozacka-dozvola`'s
  identical omission for the same reason).

## Scope for v1.0.0

The A2 service defines three requirement sets that are explicitly
**additive**, not alternate registration types selected by a single choice:
OWNER is the base case; AUTHORIZED AGENT and PERSONALISED NUMBER are each
introduced with "in addition to the above" language. This v1.0.0:

- **Models the OWNER requirement set** via the **MANUAL registration**
  pathway (the title's own scope), the cleanest, most DMV-vertical-canonical
  first-time-registration flow in this registry (registration/title, not
  licensing — matching e.g. `rw/rra`'s and `ro/dgpci`'s own DMV-vertical
  scoping).
- **Also models the PERSONALISED NUMBER add-on**, gated by a
  `requestsPersonalisedNumber` boolean, since the source itself frames it as
  strictly additive to OWNER (not a different filer identity) and it
  contributes the only genuinely itemized *data* points (as opposed to
  document requirements) anywhere in the A2 service text: the proposed
  number itself, the vehicle's chassis number, and its current (foreign)
  registration number.
- **Does NOT model the AUTHORIZED AGENT requirement set** — a distinct
  filer-identity scenario (a different person, with their own Power of
  Attorney/Ghana Card/photos, filing on the owner's behalf) that would need
  its own applicant-identity fields and gating logic to model honestly.
  Disclosed as an out-of-scope companion for a future version, not silently
  folded into the OWNER case.
- **Does NOT model the ONLINE registration pathway** (biometric capture,
  certificate-of-title/smart-card issuance) — a materially different
  procedure from the Manual pathway modelled here. Disclosed as an
  out-of-scope companion for a future version.

## Field/document design — a Requirements/Procedures walkthrough is not a form

Unlike most of this registry's sources, `dvla.gov.gh/services` is a **prose
service-page walkthrough**, not a downloadable form with printed field
labels or an AcroForm layer — DVLA publishes no standalone "Form A"
specimen (per Manual-Registration step 1, it is completed in person). This
registry already accepts this source type as an alternate to a fillable PDF
(cf. `si/furs/doh-odm-income-tax-return-instructions`, whose FURS return is
likewise modelled from an instruction booklet's own numbered walkthrough
rather than a blank form template).

Every `fields[]`/`documents[]` entry was derived by classifying each
Requirements-list item as either applicant-entered data (a field) or a
physical/attachment requirement (a `documents[]` entry), and by reading the
Procedures/Manual-Registration steps for the data points they imply:

- **`currentOwnerFullName` / `currentOwnerGhanaCardNumber` /
  `previousOwnerFullName`** are baseline-identity **inferences**, not
  fields transcribed from a printed label — the OWNER Requirements list
  itself only names "the vehicle" and a set of documents to present, no
  standalone name/number blank. These are modelled because Requirement 4
  ("two recent passport pictures of both old and new owners") and Procedure
  3 ("verification of ownership") make an owner identity plainly necessary
  to the process, the same disclosed-inference precedent used for
  `si/furs/doh-odm-income-tax-return-instructions`'s `fullName`/
  `taxNumber`/`residentialAddress` fields (modelled from a general
  identity-block description rather than an itemized label list).
- **The "old and new owners" judgment call.** Requirement 4's "both old and
  new owners" is read as the vehicle's previous (pre-import, foreign)
  registered owner and the new (Ghana-registering) applicant — consistent
  with A2 covering first-time registration of "an imported or manufactured
  vehicle," where an imported vehicle very plausibly already has a foreign
  registration history. This is a disclosed interpretive judgment call, not
  a literal statement anywhere on the source; an alternate reading (e.g. two
  co-applicants both named "owner" for some other reason) cannot be ruled
  out from this source alone.
- **`vehicleChassisNumber`/`vehicleCurrentRegistrationNumber`** are modelled
  only under the PERSONALISED NUMBER branch (`requiredWhen
  requestsPersonalisedNumber: true`) because that is the only place the
  source text itself names them. Form A's own field layout very plausibly
  also collects a chassis number for *every* A2 registration (not only
  personalised-number requests) — but since Form A has no independently
  available specimen, that generic vehicle-identification content is
  disclosed as an **out-of-scope gap**, not invented as an ungated field.
- **`documents[]`** covers the five physical/attachment items the OWNER
  Requirements list itemizes (customs entry documents, PVTS inspection
  report, both owners' passport photographs — split into
  `currentOwnerPassportPhotos`/`previousOwnerPassportPhotos` since the
  source's "both" phrasing names two distinct people, and the Ghana Card),
  plus the personalised-number application letter itself (distinct from the
  three data points it states, which are separately modelled as
  machine-checkable `fields[]`).
- **VRC (Vehicle Registration Certificate).** The Manual-Registration
  procedure names VRC twice: once as something completed alongside Form A
  (step 1, "Complete Form A, VRC and all required forms") and once as an
  output DVLA issues at the end (step 3). Given this dual appearance and no
  independently available VRC specimen, it is not modelled as either a
  `documents[]` entry or a field — disclosed as an out-of-scope gap rather
  than guessed either way.
- **Registration outputs** (registration number, plate(s), endorsed
  registration documents, roadworthy sticker) are DVLA-issued outputs of the
  Manual-Registration procedure's final step, not applicant-entered data —
  excluded, consistent with this registry's general convention for
  staff/office-issued artifacts (cf. `rw/rra`'s "FOR RRA USE ONLY" Section E
  exclusion, `mk/mvr`'s Part 4 receiving-official fields).
- **`steps[]`** mirrors the source's own Procedures (5 items) and Manual
  Registration (3 items) sequences directly, collapsed into one linear
  6-step flow (the two lists are sequential in the source's own prose, not
  alternatives) with `fields` attached at the step each is first collected
  or made relevant.

## Field inventory

- **Fields:** 8 (`fields[]`) — 4 always-applicable (`currentOwnerFullName`,
  `currentOwnerGhanaCardNumber`, `previousOwnerFullName`,
  `customsEntryReferenceNumber`), 1 gate (`requestsPersonalisedNumber`), and
  3 gated on that boolean (`proposedPersonalisedNumber`,
  `vehicleChassisNumber`, `vehicleCurrentRegistrationNumber`).
- **Documents:** 6 (`documents[]`) — 5 always-required, 1 gated on
  `requestsPersonalisedNumber`.
- **Steps:** 6 (`steps[]`), a linear flow (Procedures 1-5 folded together
  with Manual Registration 1-3, minus the shared final "obtain fee
  invoice"/"return forms" overlap collapsed into single steps).
- **No `exclusivityGroups`/`crossFieldValidation`:** no independent-boolean
  mutually-exclusive choice or cross-field date/amount comparison exists
  anywhere in this v1.0.0's scope.

## Conformance testing

Seven fixtures under
`conformance/gh/dvla/a2-vehicle-registration/1.0.0/` were checked against
this schema's `required`/`requiredWhen`/`validation` rules with a throwaway
local evaluator (not committed — ad hoc, per this registry's established
mock-conformance-testing practice, implementing the `Condition` grammar
directly from `spec/v0.3/SPEC.md` §8.1):

| Fixture | Scenario | Expected | Actual |
|---|---|---|---|
| `valid-no-personalised-number.json` | OWNER, Manual, no personalised-number request | 0 errors | 0 errors |
| `valid-with-personalised-number.json` | OWNER, Manual, WITH personalised-number request (all 3 gated fields + gated document supplied) | 0 errors | 0 errors |
| `mutation-control-missing-owner-name.json` | Omits required `currentOwnerFullName` | 1 error (`MISSING_REQUIRED`) | 1 error |
| `mutation-control-missing-requests-personalised-number.json` | Omits required `requestsPersonalisedNumber` | 1 error (`MISSING_REQUIRED`) | 1 error |
| `mutation-control-missing-conditional-proposed-number.json` | `requestsPersonalisedNumber: true` but `proposedPersonalisedNumber` omitted | 1 error (`MISSING_REQUIRED`, `requiredWhen`-gated) | 1 error |
| `mutation-control-personalised-number-too-long.json` | `proposedPersonalisedNumber` set to a 10-character value against `validation.maxLength: 6` | 1 error (`MAXLENGTH_VIOLATION`) | 1 error |
| `mutation-control-missing-required-document.json` | Omits the always-required `pvtsInspectionReport` from `documents[]` | 1 error (`MISSING_REQUIRED_DOCUMENT`) | 1 error |

All 7 fixtures behaved exactly as expected. This document is authored at
`structural-reference` maturity: the source's own Requirements/Procedures
structure is transcribed and machine-checkable where the source itself
provides enough content to do so, but no live DVLA submission was
attempted, and Form A's/VRC's own internal field layouts remain unavailable
and out of scope.

## Meta-schema validation

```
$ node tools/validate.mjs registry/gh/dvla/a2-vehicle-registration/1.0.0/schema.json
ok   registry/gh/dvla/a2-vehicle-registration/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/gh/dvla/a2-vehicle-registration/1.0.0/schema.json
ok   registry/gh/dvla/a2-vehicle-registration/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

`tools/govschema-client`'s `registry-index.json` was regenerated
(`npm run build-index`, after `npm ci --include=dev` to ensure `ajv` is
actually installed — this registry's own documented gotcha about a local
`NODE_ENV=production` making a bare `npm ci` skip dev dependencies) and now
includes this document.

## What was NOT fully resolved (disclosed, not silently guessed)

- Form A's and the VRC's own internal field layouts — no independently
  downloadable specimen of either exists; only the Requirements/Procedures
  walkthrough is available.
- The AUTHORIZED AGENT requirement set and the ONLINE registration pathway
  — both real, named branches of the A2 service, deliberately out of scope
  for this v1.0.0 (see "Scope" above).
- The exact semantic identity of the "old owner" in Requirement 4 — read as
  the vehicle's pre-import foreign owner, a disclosed interpretive judgment
  call rather than a literal statement on the source.
- Every other Vehicle Registration (A1, A3-A13) and Driver Licensing
  (B1-B5+) service on the same page remains unscreened backlog, left for a
  future cycle if a further DMV-vertical companion is ever wanted (Ghana's
  DMV vertical is already closed by this schema; these are optional
  companions, not gaps).
