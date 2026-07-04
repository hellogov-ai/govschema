# Verification record — `nz/electoral-commission/voter-registration` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-04`

The document was derived directly from the current **Form ROE1** ("Get ready
to vote — Enrol or update your details"), fetched without any bot-block
directly from `vote.nz`, and corroborated against a live `vote.nz` page
describing the online enrolment channel. `status` remains `draft`, not
`verified` — no live transaction was performed and the online channel's own
field-by-field labels could not be independently captured (see below).

## Sources examined

- **Document `(id, version)`:** `nz/electoral-commission/voter-registration` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Electoral Commission (Te Kaitiaki Take Kōwhiri), the
  national body that administers enrolment and elections; `vote.nz` is its
  public-facing enrolment/voting site.
- **Primary source:**
  <https://vote.nz/assets/enrolment-form.pdf> — Form **ROE1**, "Get ready to
  vote: Enrol or update your details" (2 pages). Fetched directly with
  `curl`, HTTP 200, a genuine 469,647-byte `%PDF` binary (no AcroForm —
  static printed layout). Full page text was extracted via `pdfjs-dist`
  `getTextContent` across both pages: page 1 (the form itself — Step 1
  personal details, Step 2 current NZ address, Step 3 postal address, Step 4
  Māori-descent/roll choice, Step 5 declaration/signature) and page 2 (Step
  2A/2B supplementary address questions plus an "Eligibility to vote" and
  general-guidance notice).
- **Secondary source (fetched live, 2026-07-04):**
  <https://vote.nz/enrolling/enrol-or-update/enrol-or-update-online> — states
  online enrolment/update is available to anyone with "a New Zealand driver
  licence, New Zealand passport or RealMe verified identity," confirming the
  online channel shares the same eligibility gate the paper form implies but
  not exposing its own field-by-field labels (see below).
- **Also checked (fetched live, 2026-07-04), to resolve the "SG voter-reg
  still open" question carried from the last research cycle:**
  <https://www.eld.gov.sg/elections.html> — the Elections Department
  Singapore's "About Registers of Electors" page, which states the Registers
  of Electors are compiled by the Elections Department "from the records of
  National Registration Identity Card (NRIC) holders kept by the
  Commissioner of National Registration" — i.e. automatic, centrally
  compiled registration, not a citizen-initiated application. See
  "Scope and jurisdiction notes" below.
- **Retrieved / reviewed:** 2026-07-04.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial
  authoring source review).

## What was directly observed vs. inferred

| Field(s) | Basis |
|---|---|
| `title`, `familyName`, `firstNames`, `dateOfBirth`, `occupation`, `mobilePhoneNumber`, `otherPhoneNumber`, `email` | **Directly observed**, page 1, Step 1. `title`'s enum (`mr`/`mrs`/`miss`/`ms`/`mx`) is transcribed verbatim from the contiguous "Title Mr Mrs Miss Ms Mx" text; no "other/write-in" title option is legible in the extracted text (unlike `au/aec/voter-enrolment`'s `title`/`titleOther` pair), so none was added — a future reviewer with the rendered page image should confirm there is no additional tick box the text extraction missed. |
| `livingOverseas` | **Directly observed**, page 1, Step 2 — "Living overseas? Leave STEP 2 blank and turn over to do STEP 2B instead," modelled as the boolean gate for the `currentHomeAddress`/`overseasCitizenOrResidentStatus`/`lastVisitOrLiveInNZDate` branch, using `requiredWhen`/`visibleWhen: { field: livingOverseas, equals: ... }` (boolean-gate pattern, not a string/absence comparison — avoids the `notEquals ""` misfire class recorded against `ie/electoral-commission/voter-registration` and `sg/ica` schemas). |
| `currentHomeAddress` | **Directly observed**, page 1, Step 2 — "Current NZ home address," plus page 2's "What address should I use?" guidance transcribed into the field description. |
| `livedAtCurrentAddressUnderOneMonth`, `dateMovedIntoCurrentAddress` | **Directly observed**, page 1, Step 2 — "Lived here under one month? Turn over to do STEP 2A too" — and page 2, Step 2A's own heading and "When did you move into your current home address?" question. |
| `overseasCitizenOrResidentStatus`, `lastVisitOrLiveInNZDate` | **Directly observed**, page 2, Step 2B — "Are you a New Zealand Citizen [/] Permanent resident" and "When did you last visit or live in New Zealand?" The enum values (`citizen`, `permanent_resident`) are inferred labels for the two tick options, not verbatim form text (the form does not spell out machine-readable codes) — flagged for a future reviewer, same caveat pattern as other jurisdictions' inferred enum codes. |
| `lastNZAddressLivedOneMonthOrMore` | **Directly observed** as *two* separately laid-out but textually identical questions — Step 2A ("What is the last address in New Zealand where you lived for one month or more?") and Step 2B (same wording). Modelled as **one** field with `requiredWhen: { any: [livedAtCurrentAddressUnderOneMonth=true, livingOverseas=true] } }` rather than two near-duplicate fields, since both ask the identical underlying question and an applicant only ever completes one of Step 2A/2B — composability/reuse over literal one-box-per-line-on-the-page transcription. |
| `postalAddress` | **Directly observed**, page 1, Step 3 — "Postal address... If different from current home address or if you're living overseas." Modelled `required: false` with no `requiredWhen`: the form's own wording states *when a postal address is relevant to provide*, not that it becomes mandatory in either case (an overseas applicant could still rely on phone/email contact) — deliberately not converted into a hard `requiredWhen` gate to avoid asserting a requirement the source text does not state. |
| `rollDeclaration` | **Directly observed**, page 1, Step 4's own "Please tick ONE statement that applies to you" framing, transcribed verbatim (all three options) into `description` and `sourceRef`, and modelled as a single required three-value enum rather than a boolean-plus-conditional-enum pair, mirroring the form's own single-tick presentation. |
| `declarationEligibleTruthful`, `declarationDate` | **Directly observed**, page 1, Step 5's declaration text and "Signature ... Date" line. Signature itself is not modelled as a data field, consistent with this registry's treatment of other signed paper forms (e.g. `ie/electoral-commission/voter-registration`). |

## Explicitly out of scope for v1.0.0

- **The live online enrolment wizard's own screen-by-screen field labels.**
  `enrol.vote.nz` (the actual online form) sits behind an Imperva/Incapsula
  bot-check that returned HTTP 403 to this tool (`vote.nz` itself, including
  the PDF asset, was directly reachable — only the enrolment sub-application
  is gated). The paper Form ROE1 is used as the data-model source instead,
  consistent with this registry's established precedent for enrolment forms
  whose live online front end could not be independently walked (e.g.
  `ie/electoral-commission/voter-registration` citing Form ERF1,
  `fr/interieur/voter-registration` citing Cerfa n°12669).
- **Completing the form on behalf of someone else living/travelling overseas
  or unable to sign due to impairment** — the form states this requires "an
  additional form" obtained by calling the Electoral Commission, not modelled
  here.
- **The unpublished-roll application** for applicants whose safety would be
  threatened by a published address — referenced on page 2 as a separate
  application process ("apply to go on the unpublished roll"), not a field
  on Form ROE1 itself.
- **Māori Electoral Option period restrictions** on changing `rollDeclaration`
  after initial enrolment (the 3-months-before-a-general-election and
  3-months-before-triennial-local-elections windows) — documented on page 2
  as guidance, not a field on the form; a future schema modelling *updates*
  to an existing enrolment (as distinct from this first-enrolment-or-update
  data model, which already covers both per the form's own "Enrol or update
  your details" framing) could add a temporal eligibility check once
  GovSchema's flow model supports date-relative constraints.

## Test run with mock data

A mock enrolment packet was assembled at
`conformance/nz/electoral-commission/voter-registration/1.0.0/application-packet.json`
for an adult applicant living at her current New Zealand home address for
over a month, not living overseas, not of Māori descent — fabricated name,
address, and contact details, not a real person. It was checked with a
standalone script re-implementing the schema's own `required`/`requiredWhen`/
`validation`/`eligibleValues` evaluation (GSP-0013 condition grammar
`all`/`any`/`not`/leaf-compare, the same technique used for the last several
registration cycles): 19 fields evaluated, 0 violations.

Both conditional branches were separately exercised by mutating a copy of the
packet:

- `livingOverseas: true` without `overseasCitizenOrResidentStatus`,
  `lastVisitOrLiveInNZDate`, or `lastNZAddressLivedOneMonthOrMore` correctly
  produced 3 violations; adding all three brought it back to 0.
- `livedAtCurrentAddressUnderOneMonth: true` without
  `dateMovedIntoCurrentAddress` or `lastNZAddressLivedOneMonthOrMore`
  correctly produced 2 violations; adding both brought it back to 0.

The schema also passed both `tools/validate.mjs` (id/version/path consistency
and structural checks) and `tools/validate-ajv.mjs` (meta-schema conformance
against `spec/v0.3`) with no errors.

No value was submitted to any government system: this is an enrolment
process with no sandbox/test environment and no online path reachable to
this tool, so — consistent with this registry's treatment of other
in-person-or-mail-only transactions — this review did not attempt a live
submission.

## Scope and jurisdiction notes

This resolves both open items named in
`fr/interieur/voter-registration` v1.0.0's own VERIFICATION.md (authored
under GOV-1064): **New Zealand enrolment is confirmed to need its own
schema** — unlike Germany and the Netherlands, whose electoral rolls
auto-populate from the existing municipal residence register, NZ enrolment
is compulsory but citizen-initiated: nobody is added to the roll without
submitting Form ROE1 or its online equivalent. **Singapore is confirmed not
to need one** — its Registers of Electors are compiled automatically by the
Elections Department from National Registration Identity Card records
(eld.gov.sg, fetched live this cycle), the same automatic-registration
pattern as DE/NL, not a citizen-initiated application. Of this registry's
core jurisdictions, "remaining voter registration" is now closed: US
(CA/FL), GB, IE, CA, AU, IN, FR, and now NZ all have a voter-registration
schema; DE, NL, and SG are confirmed not applicable (automatic registration).

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer walks the live `enrol.vote.nz`
online wizard past its Imperva/Incapsula bot-check (e.g. via a real headless
browser, the technique that defeated a similar block on `nzta.govt.nz` per
`nz/nzta/vehicle-licence-renewal`'s verification record), captures its own
field-by-field labels for the driver-licence/passport/RealMe identity-verified
path, reconciles them field-by-field against this schema (Procedure step 2),
ships any resulting change as a **new schema version** (immutability —
VERSIONING §3), and records the outcome here plus sets `status: verified`
with a current `verification.lastVerifiedAt`/`nextReviewBy`.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01**
(6 months). Re-check the source on or before that date and on any
`source.url` change.
