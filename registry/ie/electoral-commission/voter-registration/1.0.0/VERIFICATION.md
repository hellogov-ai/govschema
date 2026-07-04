# Verification record — `ie/electoral-commission/voter-registration` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-04`

The document was derived directly from the current **Form ERF1** ("Register
to vote or update details") PDF, fetched without any bot-block from a local
authority mirror (South Dublin County Council, sdcc.ie), together with the
Electoral Commission's "How to Register to Vote" Easy-to-Read guide PDF
(electoralcommission.ie CDN). Both are genuine, current, publicly-hosted
PDFs (not challenge stubs or scanned images) and were extracted in full with
`pdfjs-dist` `getTextContent`. Direct fetch of `checktheregister.ie` and
`electoralcommission.ie` itself returned HTTP 403 to this tool's fetcher, so
the live online service's own screen-by-screen labels were not independently
captured; the Easy-to-Read guide confirms the online service asks for "your
name, address, Eircode, PPSN, date of birth, nationality and email address"
— the same data model as ERF1 — so `sourceRef` values cite the paper form,
consistent with this registry's precedent on `gb/co/register-to-vote`
(citing the ITR-E paper form on the same basis). Status remains `draft`, not
`verified`.

## Sources examined

- **Document `(id, version)`:** `ie/electoral-commission/voter-registration` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** An Coimisiún Toghcháin (Electoral Commission), which runs
  `checktheregister.ie`/`voter.ie` and oversees electoral registration
  modernisation; local authorities remain the statutory registration
  authorities that process applications and maintain the Register of
  Electors.
- **Primary source:**
  <https://www.sdcc.ie/en/services/our-council/elections-and-voting/erf1-electoral-registration-form.pdf>
  — **Form ERF1**, "Register to vote or update details" (4 pages), linked
  from South Dublin County Council's own elections page as the standard
  national ERF1 form (the same form checktheregister.ie/en-IE/forms
  distributes). Fetched directly with `curl`, HTTP 200, a genuine
  667,589-byte `%PDF` binary. Full page text was extracted via `pdfjs-dist`
  `getTextContent` across all 4 pages: page 1 (applicant details and
  declaration), page 2 (witness/certification, completed only if no PPSN),
  page 3 (guidance: how to register, eligibility-by-nationality table,
  field-by-field explanation of why each item is asked for), and page 4
  (guidance: getting the form witnessed, deadlines, other forms, where to
  send it).
- **Secondary source:**
  <https://www.electoralcommission.ie/app/uploads/2024/11/ETR_How-to-Register-to-Vote_Accessible.pdf>
  — "How to Register to Vote" Easy-to-Read Guide (13 pages), fetched
  directly with `curl`, HTTP 200, a genuine 1,607,787-byte `%PDF` binary.
  Used to independently corroborate the eligibility-by-election-type rules
  (general election: Irish or British citizen; presidential election and
  referendums: Irish citizen only; European Parliament election: EU
  citizen; local election: any resident), the pre-registration-from-16
  rule, the postal-vote (PV2/PV4) and Special Voters' List (SV1) forms
  (out of scope here — see below), and the online-service field list.
- **Tertiary source (web-search summary only, not independently fetched):**
  `citizensinformation.ie`'s "Registering to vote" page and
  `checktheregister.ie`'s own FAQ, both of which returned HTTP 403 to this
  tool's direct fetcher; only their web-search result summaries were
  available, and no field content was sourced from them beyond
  corroborating that PPSN/DOB/Eircode are required online — already
  established by the Easy-to-Read guide.
- **Retrieved / reviewed:** 2026-07-04.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial
  authoring source review).

## What was directly observed vs. inferred

| Field(s) | Basis |
|---|---|
| `firstName`, `surname`, `previousName`, `dateOfBirth` | **Directly observed**, ERF1 page 1's own field labels, including "if this applies" framing for `previousName`. The 16-to-pre-register / 18-to-vote rule is directly observed on page 1 ("You can complete this form from the age of 16 but you must be 18 to vote") and corroborated on page 3 and in the Easy-to-Read guide. |
| `ppsn` | **Directly observed**, page 1 field plus page 3's explanation of why it's asked and what happens if it's omitted ("you will need to complete page 2 of this form where a witness confirms your identity"). The 7-digit-plus-1-or-2-letter pattern is the standard published Irish PPSN format, not read verbatim off the form (the form does not spell out the format), so the `validation.pattern` is a reasonable but not form-sourced constraint — flagged for a future reviewer to confirm against an authoritative PPSN format reference. |
| `nationality`, `previousNationality` | **Directly observed**, page 1 fields; the four-tier eligibility table (Irish/EU/UK/other → which elections) is transcribed verbatim from page 3 and cross-checked against the Easy-to-Read guide's own election-by-election eligibility statements (both sources agree). `previousNationality`'s evidence requirement (photocopy of passport photo page or naturalisation certificate) is directly observed on page 1. |
| `addressLine1`, `eircode`, `previousAddress`, `previousEircode` | **Directly observed**, page 1 fields ("Address... Where you live now", "Eircode", "Previous address (if this applies)"). The full-time-residency-in-the-State requirement is directly observed on page 3. The Eircode `validation.pattern` (3-character routing key + 4-character unique identifier) is the standard published Eircode format, not read verbatim off the form, same caveat as the PPSN pattern above. |
| `phoneNumber`, `email` | **Directly observed**, page 1 fields; page 3 explains they are used to contact the applicant if necessary. |
| `witnessType`, `witnessFullName`, `witnessProfession`, `witnessMedicalCouncilNumber`, `witnessPhoneNumber`, `witnessDate` | **Directly observed**, page 2's own field labels and its own tick-box framing ("This form is being witnessed at the applicant's local Garda station. / ...local authority. / ...being certified by a registered medical practitioner"). Page 2's own text states this page is only completed "where the applicant has not provided a PPSN on page 1 or where PPSN details cannot be confirmed by a local authority" — modelled as a description-only condition on `ppsn` (this registry's established convention for a "required only when a sibling optional field was left blank" condition — the leaf-compare grammar has no explicit field-absence operator; see `us/dos/passport-name-change-ds5504`'s `cannotProvideDetailsReason` and `gb/co/register-to-vote`'s National Insurance handling for precedent), while `witnessFullName`/`witnessDate`/`witnessPhotoId` are structurally `requiredWhen witnessType in [...]` since `witnessType` itself has a fixed enum. |
| `declarationTruthfulComplete`, `declarationDate` | **Directly observed**, page 1's declaration text and signature/date fields, including the "legal offence under electoral law" penalty sentence transcribed into the field description. |
| `documents[].previousNationalityEvidence` | **Directly observed**, page 1 — "If updating your nationality, please write in your previous nationality and include a photocopy of your new passport (photo page) or a copy of your certificate of naturalisation." |
| `documents[].witnessPhotoId` | **Directly observed**, page 4 — "Bring photographic identification (ID) with you. This ID could be, for example, your passport or driving licence." Scoped to the Garda-station/local-authority witness path only; a registered medical practitioner's certification is based on their own examination, not a photo-ID check, per page 2's own framing. |

## Explicitly out of scope for v1.0.0

- **Postal voting (Forms PV2, PV4)** — a separate application for voters
  who are ill, have a disability, or are away for work/study reasons, with
  its own forms and deadlines distinct from ordinary registration.
- **Special Voters' List (Form SV1)** — a separate application for people
  in a hospital, nursing home, or mental health facility, or with an
  illness/disability preventing them from attending a polling station,
  requiring its own medical certificate on first application.
- **Registering with no fixed address, or anonymous registration** for
  safety reasons — both use separate, dedicated forms per ERF1 page 4's
  own "Other forms" list.
- **The Dublin-specific `voter.ie` front end.** The Easy-to-Read guide notes
  that Dubliners registering online are routed from `checktheregister.ie`
  to `voter.ie`; this schema models the shared underlying data fields, not
  either front end's screen flow.
- **Screen-by-screen labels of the live online service** (`checktheregister.ie`,
  `voter.ie`). Both blocked direct fetch (HTTP 403) during this authoring
  pass; a future cycle could retry from different network egress or via a
  headless-browser walkthrough (the technique that worked for other
  Incapsula/bot-blocked targets in this registry, e.g. GOV-1038's NZTA
  schema) to capture and cross-check the exact online wording.

## Test run with mock data

A mock application packet was assembled at
`conformance/ie/electoral-commission/voter-registration/1.0.0/application-packet.json`
for an adult applicant registering for the first time and providing a PPSN
(so the witness/certification branch does not apply) — fabricated name,
PPSN, address, and contact details, not a real person. It was checked with a
standalone script re-implementing the schema's own `required`/`requiredWhen`/
`validation`/`eligibleValues` evaluation (GSP-0013 condition grammar
`all`/`any`/`not`/leaf-compare, the same technique used for the last several
registration/renewal cycles): 23 field/document entries evaluated, 0
violations. The witness branch was separately exercised by mutating a copy
of the packet to clear `ppsn` and set `witnessType: "garda_station"` without
supplying the newly-required witness fields; the same script correctly
flagged 3 violations (`witnessFullName`, `witnessDate`, `witnessPhotoId`
document all missing), confirming the `requiredWhen` conditions fire as
intended. No value was submitted to any government system: this is a
registration process with no sandbox/test environment, so — consistent with
this registry's treatment of other in-person-or-live-service-only
transactions — this review did not attempt a live submission.

## Scope and jurisdiction notes

This closes a real gap flagged directly in GOV-1043's own instructions
("remaining voter registration"): of this registry's 11 core jurisdictions,
Ireland had passport, driving-licence, motor-tax, vehicle-registration-tax,
company-incorporation, and tax-return schemas but no voter-registration
schema, unlike `us/ca/sos/voter-registration`, `au/aec/voter-enrolment`,
`gb/co/register-to-vote`, `ca/elections-canada/voter-registration`, and
`in/eci/voter-registration`. Germany and the Netherlands were checked and
found genuinely not to need an equivalent schema: both auto-populate their
electoral rolls from the existing municipal residence register (already
modelled by `de/bmi/residence-registration` and, for NL, the RvIG civil
registry), with no separate citizen-initiated registration process. France
(inscription sur les listes électorales) appears to be a similar
non-automatic gap to Ireland's but was not investigated this cycle — flagged
as a candidate for a future research pass.

## Review-gate correction (GOV-1045)

Re-running the mock packet through a from-scratch `requiredWhen` evaluator
during review (rather than trusting the author's own evaluator script)
surfaced one real conditional-logic defect, fixed prior to merge:

- `documents[].previousNationalityEvidence` was gated with `requiredWhen: {
  "field": "previousNationality", "notEquals": "" }`. Under a natural
  leaf-compare evaluation, an *absent* `previousNationality` (the
  overwhelming common case — an applicant who is not updating their
  nationality never submits this optional field at all) is `undefined`, and
  `undefined !== ""` is `true` — so the document would misfire as required
  for essentially every applicant, not just the ones actually updating their
  nationality. This is the same absent-vs-sentinel-default bug class already
  recorded against `fr/dgfip/income-tax-return-2042`'s `notEquals: 0`
  (GOV-763) and still latent, unfixed, in `sg/ica/identity-card-replacement`
  v1.0.0's identical `reasonForNameChange` pattern (flagged separately as
  follow-up tech debt, out of scope for this PR since it would require a new
  version on an already-published schema).
- Fixed by dropping the `requiredWhen` (the leaf-compare grammar has no
  field-absence operator, so there is no condition that expresses "required
  only when this optional field was actually filled in" without this
  misfire) and folding the trigger into the document's own `label` instead —
  the same description-only treatment this schema's own `witnessType` field
  already uses for the symmetric `ppsn`-absence case, so the fix is
  consistent with the document's own established convention, not a new one.
- Re-ran both registry validators (183/183) and the conformance packet
  through a from-scratch evaluator across three scenarios — PPSN-provided/no
  previous-nationality (matches the committed mock packet), no-PPSN/witness
  branch, and previous-nationality-provided — confirming the fix does not
  regress the witness branch and the document is no longer flagged required
  when `previousNationality` is simply omitted.

All other `sourceRef` quotes and the `requiredWhen`/`required` shape of every
other field and document were spot-checked against Form ERF1 and the
Easy-to-Read guide during this review and found accurate; no other defects
were found.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies `manual-source-review-v1`
(Procedure step 2) field-by-field against the live `checktheregister.ie`
online flow (retrying past its bot-block, e.g. via headless browser), or an
authoritative Electoral Commission field-mapping document if one is
published, resolves any discrepancy by shipping a **new schema version**
(immutability — VERSIONING §3, practice Procedure step 5), and records the
outcome here plus sets `status: verified` with a current
`verification.lastVerifiedAt`/`nextReviewBy`.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01**
(6 months). Re-check the source on or before that date and on any
`source.url` change.
