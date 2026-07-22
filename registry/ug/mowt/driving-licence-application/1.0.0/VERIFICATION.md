# Verification record — ug/mowt/driving-licence-application@1.0.0

## Candidate selection

GOV-4335 ("GovSchema Standard Research"), authored via child issue GOV-4337.
Rather than re-scouting from scratch, consumed one of two remaining
pre-scouted new-jurisdiction candidates the GOV-4307 cycle banked for
Uganda (see CATALOG.md's Known Gaps entry 0e) — Business Formation (URSB
individual business-name registration), National ID (NIRA Form 3
first-time registration), and DMV (this form) all came back STRONG. DMV
was chosen this cycle for the smallest source file and a single-page
layout, the lowest-risk choice for a single-cycle authoring budget.
Business Formation and National ID remain open, STRONG, ready-to-author
backlog for a future cycle. Opens Uganda as the registry's 81st
jurisdiction (1 of 6).

## Reaching the live source

Target:
`https://udls.co.ug/wp-content/uploads/Driver-licence-application-form.pdf`.

- Independently re-fetched and re-hashed rather than trusted from the
  GOV-4307 cycle's own report alone: HTTP 200, `Content-Type:
  application/pdf`, 92,504 bytes (byte-for-byte match with the prior
  cycle's own reported size).
- sha256 of the retrieved bytes:
  `eea579f8cc7d15832b6d56489c49f814b2638caf581fb00283353f46dff5dad6`.
- Confirmed mechanically: the retrieved bytes begin `%PDF-1.6` and contain
  zero `/AcroForm`, `/Widget`, and `/FT` occurrences — a flat, print-and-fill
  specimen, not an interactive AcroForm PDF.
- The source is served through the Uganda Driver Licensing System (UDLS)
  portal (`udls.co.ug`), a driver-licensing digitization initiative; the
  form's own letterhead prints "REPUBLIC OF UGANDA / MINISTRY OF WORKS AND
  TRANSPORT / The Traffic and Road Safety Act, 1998 (Amendment) 2020" — the
  `authority` block names the ministry per the form's own printed letterhead,
  with `authority.url` pointing to the ministry's own site
  (`https://www.works.go.ug`, confirmed reachable, title "Ministry Of Works
  and Transport – MOWT") and `source.url` pointing to the actual UDLS-hosted
  PDF.

## Extraction method

Text extracted via `pdfjs-dist`'s `getTextContent()` API (vendored at
`/tmp/node_modules/pdfjs-dist`), grouped by y-coordinate and sorted by
x-coordinate. Font rendering was clean (unlike some prior cycles' PDFs), so
the extraction was independently cross-checked by rendering the single page
to a PNG via `pdfjs-dist` + `node-canvas` at 2.5x scale and visually
inspecting three crops — letterhead/personal-details; the application-type
checkbox grid; the medical-report/declaration footer — against the
extracted text. All fields, labels, and checkbox layouts matched exactly.

Models 12 `fields[]` across 3 steps (Personal Details; Application For;
Declaration of Applicant), all applicant-supplied.

Excludes the entire "Medical Examination Report (To be completed by Medical
Doctor)" section in full: Eye Examination (visual acuity, funduscopy,
colour vision, visual fields); Hearing level; General Medical Fitness
(mental condition, other, general recommendations); and the examining
doctor's own declaration, surname, other names, practitioner's registration
number, signature, and date/stamp. None of this is applicant-supplied
data — it is a licensed medical practitioner's own clinical assessment and
certification, structurally analogous to the police-officer and
driving-test-examiner blocks this registry's own
`bw/drts/driving-licence-application` excludes for the same reason.

## Disclosed source-fidelity findings

1. **`applicationType` x `licenceDuration` cross-tab reconstructed from a
   5-row x 3-column checkbox grid, only 3 of the 5 rows carrying a duration
   choice.** The "Application for (Tick Appropriate box)" table prints
   three column headers ("1 Year", "3 Year", "5 Year") over five row labels
   ("Full Driving Licence", "Licence Renewal", "Foreign Licence Exchange",
   "Duplicate Licence", "Class Extension") — confirmed visually via the
   rendered PNG's grid lines. Only the first three rows carry a checkbox
   under all three duration columns; "Duplicate Licence" and "Class
   Extension" each carry exactly one checkbox, with no duration columns
   printed for either row, consistent with neither transaction resetting a
   licence's own term length. Modelled as a required enum `applicationType`
   (5 values: `FULL_DRIVING_LICENCE`, `LICENCE_RENEWAL`,
   `FOREIGN_LICENCE_EXCHANGE`, `DUPLICATE_LICENCE`, `CLASS_EXTENSION`) plus
   a separate enum `licenceDuration` (`ONE_YEAR`/`THREE_YEARS`/`FIVE_YEARS`)
   gated `requiredWhen` `applicationType` is `in`
   `[FULL_DRIVING_LICENCE, LICENCE_RENEWAL, FOREIGN_LICENCE_EXCHANGE]` — the
   same tick-one-of-many single-select-enum treatment this registry's own
   `sg/spf/driving-licence-application` and `my/jpj/driving-licence-application`
   established for a comparable grid, since GSP-0009's field-type vocabulary
   has no multi-select/array primitive.

2. **`nationalIdPassportOrRefugeeId` modelled as a single required string,
   not three separate fields.** The source prints one combined label and
   one blank — "National ID(NIN)/Passport No./Refugee ID No:" — with no
   separate lines or checkboxes distinguishing which identifier type is
   supplied (unlike, e.g., this registry's own
   `bw/drts/driving-licence-application`, which prints citizen/non-citizen
   ID fields on two visually separate lines). Modelled as one field per the
   source's own single-blank layout, with the field's own description
   disclosing that any one of the three identifier types is acceptable.

3. **`prn` (Payment Registration Number) modelled as optional.** The source
   prints "PRN:" alongside the otherwise-required personal-details fields
   with no explicit optionality marker of its own, but a PRN is generated by
   a separate Uganda Revenue Authority e-payment step that logically
   precedes and is independent of filling out this form; modelled as
   optional per this registry's general convention of not fabricating a
   requiredness the source does not itself state for a field that depends
   on an external prerequisite process.

4. **`drivingLicenceNumber` modelled as optional, per its own explicit
   printed qualifier.** The source prints "Driving Licence No (Where
   applicable):", an explicit conditional marker (relevant only where the
   applicant already holds a licence, e.g. for
   `LICENCE_RENEWAL`/`FOREIGN_LICENCE_EXCHANGE`/`DUPLICATE_LICENCE`/
   `CLASS_EXTENSION`) with no cross-reference to a specific
   `applicationType` value; modelled as unconditionally optional rather
   than fabricating an unprinted conditional tie, per this registry's
   established "disclose rather than fabricate" convention (see, e.g.,
   `bw/drts/driving-licence-application`'s own Finding 4).

## Conformance

3 valid mock scenarios (a first-time full-licence citizen applicant on a
3-year term; a licence-renewal applicant on a 5-year term supplying an
existing driving-licence number and PRN; a duplicate-licence applicant, no
duration field populated) plus 12 mutation-control fixtures (a missing
statically-required field for each of `surname`, `otherNames`,
`nationalIdPassportOrRefugeeId`, `gender`, `dateOfBirth`, `phoneNumber`,
`applicationType`, `signature`, and `date`; an invalid `applicationType`
enum value; a missing conditionally-required `licenceDuration` when
`applicationType` is `FULL_DRIVING_LICENCE`; and an unknown top-level
field) are committed under
`conformance/ug/mowt/driving-licence-application/1.0.0/`.

An ephemeral, from-scratch conformance checker (deriving required and
`requiredWhen` rules directly from this schema's own `fields[]`, discarded
after use, not committed) ran all fixtures: all 3 valid scenarios at 0
errors, all mutation controls each raising exactly 1 error.

Validated clean with `node tools/validate.mjs` and
`node tools/validate-ajv.mjs`, individually and as part of the full
registry run. `registry-index.json` regenerated via `npm run build-index`
in `tools/govschema-client/`.
