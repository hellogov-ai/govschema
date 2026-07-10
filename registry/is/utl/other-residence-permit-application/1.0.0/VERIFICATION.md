# Verification record — is/utl/other-residence-permit-application@1.0.0

## Candidate selection

Iceland (`IS`) had 2 of 6 verticals modelled before this cycle
(`is/skatturinn/business-employer-vat-registration`,
`is/skatturinn/simplified-individual-tax-return`: Business Formation and
Taxes). Its Visa vertical had a known, previously-scouted-but-unauthored
candidate: Form **D-110**, "Other Residence Permits" (Umsókn um dvalarleyfi
— annað), published by Útlendingastofnun (the Directorate of Immigration,
ÚTL). This document authors that candidate, opening Iceland's Visa vertical
(3rd of 6).

D-110 is the Directorate's catch-all/generic residence-permit application:
its own cover page states "The form is for adult individuals who are
applying for a residence permit for which there is no separate application
form." Unlike this registry's `jp/isa/certificate-of-eligibility-application`
precedent (which sits atop dozens of category-specific supplements), D-110
is a single bounded 9-page, 13-numbered-section document, so the whole form
is modelled here, not just a cover sheet.

## Source and the two-URL byte-diff finding

- **Primary source (used for this schema):**
  `https://assets.ctfassets.net/8k0h54kbe6bj/16DdpHCIa2fJPorxM5DAaC/f111b805dae2f57dd2acc62c543f7224/D-110-onnur-dvalarleyfi-EN.pdf`
  — fetched fresh via `curl` on 2026-07-10: HTTP 200, `content-type:
  application/pdf`, exactly **407,240 bytes**
  (SHA-256 `46a68da0adbfbeee73ad573bc14a63e812e3d21c7fd6a98789a7e3400f998e9f`).
  `Last-Modified: Tue, 12 Dec 2023 14:12:42 GMT`.
- **Second URL surfaced in search, same filename, different Contentful asset
  ID:**
  `https://assets.ctfassets.net/8k0h54kbe6bj/28awrApHRqsbRUILpmsqIi/33a411945bf3a30f3e3aa00abded8f74/D-110-onnur-dvalarleyfi-EN.pdf`
  — also fetched fresh: HTTP 200, `content-type: application/pdf`, exactly
  **303,063 bytes** (SHA-256
  `17048918885d983977ed14903d2856f30520949145e23f1bf601d1f687442bbb`).
  `Last-Modified: Thu, 06 Jun 2024 15:57:40 GMT` — a *later* timestamp than
  the primary URL's.
- These two files are **not** the same document re-hosted: a full pdfjs-dist
  text-content diff (normalized whitespace, page-by-page) shows the second
  file has a genuinely different section structure — a **14th numbered
  section** ("2. Ties with Iceland or other Schengen countries") inserted
  between what the primary source calls sections 1 and 2, shifting every
  subsequent section number by one (the primary source's section 12
  "Checklist" is the second file's section 13; section 13 "Date and
  signature" becomes section 14), and different sub-section ordering (the
  second file's section 4 is "Applicant's spouse", where the primary
  source's section 4 is "Applicant's spouse" too but its section 5 is
  "Applicant's children" — the second file interleaves parents/relatives
  differently). It also has a different widget count: **256 widgets**
  (5 more than the primary's 251) via the same pdfjs-dist
  `getAnnotations()` re-extraction.
- **Resolution: the primary URL (16Ddp…) is treated as the current, correct
  source; the second URL (28awr…) is treated as a stale/superseded
  intermediate CDN artifact.** Evidence for this call:
  1. A live web search independently surfaced a *third*, most-recent file at
     the **same asset ID** as the second URL (`28awrApHRqsbRUILpmsqIi`) but a
     *different* content hash (`789b50e2f33624271b9af2d98b79ead1`) and a
     filename with **no `-EN` suffix** (`D-110-onnur-dvalarleyfi.pdf`) — i.e.
     an Icelandic-language file. Contentful asset IDs are content slots that
     get their file replaced on re-upload while old content-hash URLs remain
     live on S3/CloudFront indefinitely (confirmed both hash URLs still
     return HTTP 200 today). This means the asset slot behind the second URL
     has since been overwritten at least once more, with a non-English file
     — consistent with that slot having held a transitional/incorrect
     English draft in mid-2024 that was later corrected, rather than being
     the actively-maintained English asset.
  2. The primary URL's content matches this issue's own authoritative
     13-section outline (as given in the task brief, itself derived from a
     prior scouting pass of this exact candidate) **exactly** — same section
     count, same section 12/13 boundary (Checklist / Date and signature).
     The second URL's 14-section structure does not.
  3. The primary URL's asset ID has shown no further replacement (no other
     hash has been found at that slot), consistent with it being the stable,
     currently-canonical asset.
  - This is disclosed as a real, resolved discrepancy rather than silently
    picking one file: a reviewer who wants to re-derive this call can repeat
    the `curl -sI` HEAD requests and the web search above.
- **Authority page:** `https://island.is/s/utlendingastofnun` — confirmed
  live (HTTP 200) as Útlendingastofnun's current island.is-hosted landing
  page; the legacy `utl.is` domain (referenced inside the PDF's own
  boilerplate footer, `utl@utl.is | www.utl.is`) has been folded into
  island.is under the whole-of-government migration, consistent with this
  registry's other recently-authored Icelandic-authority schemas.

## Extraction technique and re-verification of the prior session's numbers

A prior pass in this same session had already extracted the primary PDF
with `pdfjs-dist` (Node, no `canvas` polyfill), saving widget/text dumps to
`/tmp/pdfextract/`. Per this registry's own convention ("own re-extraction,
not trusting a prior pass"), this cycle re-did the fetch and extraction
completely from scratch in a separate scratch directory
(`/tmp/is-utl-verify/`), confirming:

- Fresh `curl` fetch: 407,240 bytes, SHA-256-identical to the prior pass's
  local copy (`cmp` byte-for-byte match).
- Fresh `pdfjs-dist` `getAnnotations()` pass, page by page: **251 AcroForm
  widgets across 9 pages**, matching the prior pass's dump
  (`/tmp/pdfextract/widgets.txt`) exactly via a plain-text `diff` (no
  differences).
- One genuine anomaly confirmed in both extractions: two AcroForm text-field
  widgets, `Text Field 6` and `Text Field 214` (page 2, "Given name"), occupy
  an **identical rectangle** — `[163.075, 638.3–658.5, 566.929]` in both
  passes. This is a duplicate/orphaned widget left behind by a form-editing
  artifact (e.g. a field replaced in place without deleting the original).
  Modelled as a single field (`givenName`) since the two widgets are visually
  indistinguishable as one line on the rendered page; disclosed in the
  field's own `description`.

Field names and labels were derived with a **position-aware (x/y proximity)
mapping script**, not manual eyeballing of the widget dump against the text
dump — the same technique this registry's `at/bmeia/schengen-visa-application`
and `se/migrationsverket/work-permit-application` schemas' own VERIFICATION.md
records describe using. For every widget, the script pulled `getTextContent()`
items within roughly the same y-band to the *left* of the widget (candidate
inline label) and within 20pt *above* the widget (candidate section/column
header), then a human pass resolved the final field identity from that
evidence plus the source's own running prose. This caught and corrected an
initial manual (text-order-only) misreading of the page-1 residence-permit
category checkboxes: reading the six category checkboxes as column-major
(all of the left column, then all of the right column) produces the wrong
pairing; the position-aware evidence (each row's between-checkbox label text
belongs to that row's *left* checkbox, with the *right* checkbox holding the
next phrase in the source's own running list) shows the true order is
row-major — `Working Holiday/Youth Mobility`, `for volunteers` (row 1),
`for missionaries`, `on grounds of legitimate and special purpose` (row 2),
`based on special ties to Iceland`, `Other, what?` (row 3). The same
row-major rule, cross-checked against the page-2 gender/marital-status grid
(which the position-aware evidence and the source's own running text agree
on independently), is used throughout this document wherever a form-numbered
option grid needed disambiguating (education level, field of study, the
6×5 children gender/is-in-Iceland grid, parent gender).

## Field count and modelling decisions

**185 fields, 9 `documents[]` entries, 14 `steps`, 6 `crossFieldValidation`
rules, 0 `exclusivityGroups`.**

### Repeating-row bounds

Three sections have repeating rows; each is bounded to the number of rows
the source PDF itself visibly provides (this registry's established
convention, e.g. `se/migrationsverket/work-permit-application`'s
`previousStay1..4`, `child1..5`), not padded or extended:

- **Section 3, residence abroad** — 6 rows (`residenceAbroad1Country` …
  `residenceAbroad6DateTo`), confirmed via the widget grid (18 widgets, 6
  rows × 3 columns: country / date-from / date-to).
- **Section 5, children under 18** — 6 rows × 6 fields each (given name,
  surname, ID number/date of birth, citizenship, gender, is-in-Iceland),
  confirmed via a 5-column × 6-row checkbox grid (gender: Boy/Girl/Non
  binary-other; is-in-Iceland: Yes/No) plus a 4-column × 6-row text grid.
- **Section 7, relatives in Iceland** — 6 rows × 4 fields (given name and
  surname combined into a single field — the source table gives given name
  and surname one shared, double-width column rather than two separate
  columns, unlike the children table — date of birth, citizenship, kinship).

### `requiredWhen` gates ("I do not have X" pattern)

Three sections are gated by a boolean "I do not have X" / "I have no X"
checkbox: spouse (`hasNoSpouse`), children (`hasNoChildrenUnder18`),
relatives (`hasNoRelativesInIceland`). Detail fields in each section carry
`requiredWhen: { field: "<gate>", equals: false }` — a boolean-equality
check, not the `notEquals: ""` pattern this registry's memory flags as a bug
(gating an optional field's requiredness on `notEquals` an empty string
silently mis-fires when the referenced field is simply absent). The same
boolean-equality gate pattern is used for every other "detail fields only
apply when the gating Yes/No answer is X" relationship in this document
(e.g. `wasFinedOrImprisoned`, `subjectedToReEntryBan`, `banStillInEffect`,
`residencePermitCategory: "other"`, `whoFilledOutApplication: "other"`).

### Genuine Yes/No question pairs modelled as a single boolean

Every place the source form prints two separate checkbox widgets for a
single Yes/No question (e.g. "Are both or one of your parents Icelandic
citizens? Yes / No", "Have you previously applied for a residence permit in
Iceland? Yes / No", the three criminal-record Yes/No questions) is modelled
as **one boolean field**, not two independent booleans — matching
`at/bmeia`'s (`residesInOtherCountry`) and `se/migrationsverket`'s
(`previouslyAppliedToComeToSweden`, `requestRevokeCurrentResidencePermit`)
own established pattern for exactly this case.

### Divergence from a literal `exclusivityGroups` reading — flag for reviewer

The task brief for this cycle suggested modelling every true single-select
checkbox grid (gender, marital status, the 6 residence-permit categories,
the two Y/N pairs) with `exclusivityGroups` (GSP-0013). **This document
does not use `exclusivityGroups` at all**, after checking what `at/bmeia`
and `se/migrationsverket` actually do for the equivalent cases in their own
source forms, per the brief's own instruction to "follow suit": both of
those schemas model a true single-select-among-named-values grid as a single
`type: "enum"` field (e.g. `at/bmeia`'s `sex`, `maritalStatus`,
`travelDocumentType`, `mainPurposeOfJourney`; `se/migrationsverket`'s
`applicationCategory`, `healthCoverageBasis`,
`requestRevokeCurrentResidencePermit`) — reserving `exclusivityGroups` for
one specific different case: `at/bmeia`'s `costOfTravelFundedBySelection`,
where the four "who funds the trip" checkboxes are each independently
*named* and referenced elsewhere (two of the four carry their own distinct
conditional description sub-field), and the mutual exclusivity is a
cross-field business rule layered on top of otherwise-independent booleans
— not a case of one value being selected from a closed list.

Every true single-select grid in D-110 (gender, marital status, application
type, residence-permit category, children's gender, parents' gender, field
of study, who-filled-out-the-application, preferred contact method) fits
the `enum` shape cleanly — a fixed list of named values, no per-option
sub-field structure beyond a single common "other, please specify"
follow-up (handled with a plain `requiredWhen` on the free-text field, as
`at/bmeia` and `se/migrationsverket` already do for their own "other"
options). `exclusivityGroups` is reserved by spec for `boolean`-typed fields
only (§8.4), and this document has one candidate that arguably fits its
*intended* independently-named-booleans shape: the 8 education-level
checkboxes in section 8. Those are, however, explicitly a **multi-select**
in the source ("check all the applicable boxes") — not mutually exclusive
at all — so `exclusivityGroups` would be actively wrong there; they are
modelled as 8 independent optional booleans, each with its own optional
`requiredWhen`-gated graduation-year field, mirroring `at/bmeia`'s
`fundedBy*`/means-of-support pattern for independent, individually-relevant
booleans, without asserting exclusivity.

**Reviewer should double-check:** whether this divergence from the brief's
literal suggestion is the right call, versus force-fitting
`exclusivityGroups` onto one or more of the above enum fields to match the
brief's example list verbatim.

### The paraphrased consent/declaration block

Page 9's pre-signature declaration (data-processing consent, the
Directorate's authority to obtain information from other domestic/foreign
bodies, the medical-examination condition, and the accuracy declaration) is
paraphrased into a single `documents[]` `attestation` entry
(`applicantSignatureDeclaration`), not quoted verbatim or split into
per-statement checkboxes — the source presents it as one continuous prose
block ahead of a single "Applicant's signature" line, with no per-statement
checkbox of its own, matching `at/bmeia`'s own disclosed treatment of its
equivalent declaration paragraph.

### The "Other, what?" free-text category

`residencePermitCategory` is a 6-value `enum` (`working_holiday_youth_mobility`,
`volunteer`, `missionary`, `legitimate_special_purpose`,
`special_ties_iceland`, `other`); `otherCategoryDescription` is
`requiredWhen: { field: "residencePermitCategory", equals: "other" }`,
matching the cover page's own instruction: "If 'Other, what?' is selected,
it must be specified on what other basis the application is made."

### Checklist as `documents[]`

The 8 supporting-document checkboxes in section 12 ("Did you remember
everything?") are modelled as `documents[]` entries (this registry's
established convention for attestation/checklist blocks), not invented
per-item required fields:

| Document | Category | Required |
|---|---|---|
| Payment receipt | supporting-evidence | yes |
| Passport photo | identity-document | yes |
| Copy of passport | identity-document | yes |
| Copy of criminal record certificate | supporting-evidence | yes (freshness: within 12 months) |
| Translation of criminal record certificate | supporting-evidence | no (only if not English/Nordic) |
| Health insurance confirmation | supporting-evidence | yes |
| Documents confirming secure financial support | supporting-evidence | yes |
| Special data requirements (category-specific) | supporting-evidence | no |

A 9th checklist checkbox, "Applicant has signed the application," is
modelled as a plain boolean field (`checklistApplicantHasSigned`) rather
than a `documents[]` entry, since it is a self-check confirming a fact about
the same form (not a supporting document); the actual signature/declaration
is separately modelled as the `applicantSignatureDeclaration` attestation
above.

### `crossFieldValidation`

Six rules, one per residence-abroad row, each requiring that row's
`DateTo >= DateFrom` — the only genuinely comparable date pair in this
document (the criminal-record ban dates and the intended/actual
Iceland-arrival dates are not both always present in the same scenario, so
no cross-field rule was invented for them).

## Mock conformance test run

Two scenarios and eight mutation/negative controls were built and checked
against this schema's own `required`/`requiredWhen`/`visibleWhen`/
`validation`/`documents[]`/`crossFieldValidation` grammar with a disposable
checker script (`/tmp/is-utl-verify/check_conformance.mjs`, not committed —
same technique as `at/bmeia/schengen-visa-application`'s own
`check_conformance.mjs`, extended to also evaluate `crossFieldValidation`'s
`compare` shape):

- **`scenario1-full-coverage-other-category.json`**: a maximal-coverage
  applicant selecting the "Other, what?" residence-permit category (with a
  description), who has a spouse, 6 children, and 6 relatives in Iceland
  fully filled in, has already arrived in Iceland, has been in Iceland
  before, answers "yes" to all three criminal-record questions (with every
  conditional detail field populated) and has an active re-entry ban, and
  has someone other than the applicant/agent fill out the form. **All 185
  fields collected, 0 not-applicable, 0 errors**; all 9 `documents[]`
  entries provided.
- **`scenario2-minimal-branch.json`**: the opposite branch — a
  special-ties-to-Iceland applicant with no spouse, no children under 18, no
  relatives in Iceland, who has not yet arrived and has never been to
  Iceland before, answers "no" to all three criminal-record questions, has
  not yet decided on an Iceland address, and fills out the form themself.
  **92 fields collected, 93 correctly not-applicable (spouse/children/
  relatives detail fields, the "other" free-text fields, the
  criminal-record and re-entry-ban detail fields, the not-yet-known Iceland
  address fields), 0 errors**; only the required `documents[]` entries
  provided (the two optional ones, translation and special data
  requirements, correctly omitted).
- **Eight mutation/negative controls**, each derived from scenario 1 with
  exactly one defect introduced, each correctly raising exactly one error:
  1. Removing the required `surname` → `missing-required`.
  2. Setting `gender` to `"unspecified"` (not in its 3-option `enum`) →
     `enum-violation`.
  3. Setting `agentSecurityNumber` to `"12"` (violates the 4-digit
     `^[0-9]{4}$` pattern) → `pattern-violation`.
  4. Removing `otherCategoryDescription` while `residencePermitCategory`
     stays `"other"` → `missing-required` (`requiredWhen` conditional-
     required violation).
  5. Removing `spouseGivenName` while `hasNoSpouse` stays `false` →
     `missing-required` (`requiredWhen` conditional-required violation).
  6. Setting `residenceAbroad1DateFrom` to `2015-01-01` and
     `residenceAbroad1DateTo` to `2014-01-01` (departure before arrival) →
     `cross-field-violation` on `residenceAbroad1DateToNotBeforeDateFrom` —
     confirming `crossFieldValidation` actually fires.
  7. Removing the required `passportPhoto` document → `missing-required-document`.
  8. Removing `banStillInEffect` while `subjectedToReEntryBan` stays `true`
     → `missing-required` (`requiredWhen` conditional-required violation).

The schema was also validated against the GovSchema v0.3 meta-schema with
`node tools/validate.mjs` and `node tools/validate-ajv.mjs` (both pass,
individually and as part of the full 339-document registry run — 338
pre-existing + this one, no other document affected), and against
`node tools/verify-sources.mjs registry/is/utl/other-residence-permit-application/1.0.0`
(1 directory, 3 URLs checked, 0 warnings, 0 allowlisted, all clear).

## Pre-PR re-verification

Both candidate PDF URLs and the authority URL were fetched live a final
time immediately before finalizing this record, using `curl -sI` HEAD
requests, confirming the byte counts, content hashes, and `Last-Modified`
timestamps recorded above are stable and reproducible.
