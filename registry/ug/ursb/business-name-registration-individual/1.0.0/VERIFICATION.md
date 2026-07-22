# Verification record — `ug/ursb/business-name-registration-individual` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-22`

The document was derived directly from the official URSB PDF's own text
content, but the full field-by-field comparison the practice requires
(`manual-source-review-v1` → Procedure step 2) has not yet been completed
against a live URSB filing counter or e-service (this is a paper/in-person
filing form with no online-filing screens to compare against). It therefore
remains `draft`, not `verified`.

## Why this schema and why now (GOV-4343)

GOV-4343 is the recurring "GovSchema Standard Research" cycle. The GOV-4307
cycle (2026-07-22) screened Uganda across all six verticals and banked three
STRONG, unauthenticated, unblocked candidates: DMV (authored the same day as
`ug/mowt/driving-licence-application@1.0.0`, opening Uganda as the registry's
81st jurisdiction — GOV-4335/GOV-4337), Business Formation (this document),
and National ID (NIRA Form 3, First-Time Registration). This cycle re-checked
both remaining candidates before choosing: NIRA's host (`nira.go.ug`) again
failed to connect (connection timeout, the same failure the GOV-4335 cycle
also recorded when it re-checked NIRA), while URSB's host returned the
document cleanly. Business Formation was authored this cycle; National ID
remains open, banked backlog for a future cycle to retry once `nira.go.ug` is
reachable.

## Sources examined

- **Document `(id, version)`:** `ug/ursb/business-name-registration-individual` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Uganda Registration Services Bureau (URSB).
- **Primary source URL:**
  `https://ursb.go.ug/wp-content/uploads/2025/01/business-name-registration-individual-1639049617.pdf`
  — fetched directly this cycle: HTTP 200, `application/pdf`, **272,844
  bytes**, sha256
  `9599391278190fa1438e5bc0ee2f74ca34febe63e2b3613fb94cb94752c65571`. This
  matches the GOV-4307 cycle's own scouting report ("HTTP 200, 273KB") within
  rounding.
- **Retrieval / extraction method:** the PDF's raw bytes were retrieved
  directly (not a third-party summary) and text was extracted with
  `pdfjs-dist`, walking each page's text-run items and grouping by y-position
  to reconstruct the form's own printed line order. All 3 pages extracted
  cleanly with no glyph-mapping failures.
- **Official form title:** "Statement of Particulars required to be given
  pursuant to the Business Names Registration Act IN CASE OF AN INDIVIDUAL"
  (no form number is printed on the document itself).
- **Retrieved / reviewed:** 2026-07-22.
- **Reviewer:** GovSchema Engineering (Standards Engineer), initial authoring
  source-review.

### Companion form fetched for comparison (not modelled by this document)

To resolve the ambiguity described in "Scope narrowing and why" below, this
cycle also fetched URSB's sibling form:
`https://ursb.go.ug/wp-content/uploads/2025/01/business-name-registration-firm-or-corporation-1639049602.pdf`
(HTTP 200, `application/pdf`, 276,528 bytes), and independently confirmed via
a raw fetch of `https://ursb.go.ug/business-registration-forms/`'s own HTML
(not a WebFetch summary alone — the exact anchor text was grepped directly
out of the retrieved HTML) that URSB's own forms-listing page labels the two
forms distinctly: row "a" links this document's own source PDF as "Business
Name Registration (**Individual**)"; row "b" links the sibling PDF as
"Business Name Registration (**Firm or Corporation**)".

## What was confirmed against the source

Every field below was independently re-derived from the raw extracted text
(see "Retrieval / extraction method"), matched to the form's own numbered
items 1–9 plus its unnumbered "Dated"/"Signed" execution block and its
separate "STATUTORY DECLARATION" page:

| Source item | Field(s) |
|---|---|
| 1 – Business name to be registered (+ own note on multiple business names) | `businessName`, `otherBusinessNames` |
| 2 – General nature of the business | `natureOfBusinessDescription` |
| 3 – Principal place of business (Plot, Street and Postal Address) | `principalPlaceOfBusinessAddress` |
| 4 – Present Christian name(s), surname and age (+ own conditional clause on non-European origin/father's name) | `applicantChristianNames`, `applicantSurname`, `applicantAge`, `applicantOfNonEuropeanOrigin` (unprinted gate), `applicantFatherName` |
| 5 – Former Christian name(s) and surname (if any) | `applicantFormerName` |
| 6 – Nationality (+ own conditional clause on nationality of origin) | `applicantNationality`, `applicantNationalityOfOrigin` |
| 7 – Usual place of residence (Plot, Street and Postal Address) | `applicantResidentialAddress` |
| 8 – Other business occupation (if any) | `applicantOtherOccupation` |
| 9 – Date of commencement of business | `dateOfCommencement` |
| "Dated this ___ day of ___ 20..." / "Signed: ___" | `applicationDate`, `signature` |
| Form's own introductory notice on who must sign, and section 6's statutory-declaration requirement | `signedByApplicantInPerson` (unprinted gate) |
| STATUTORY DECLARATION — "I, ___", "of ___ Uganda", "DECLARED at ___ in this ___ District of ___", "this ___ day of ___ 20..." | `declarantName`, `declarantAddressInUganda`, `declarationPlace`, `declarationDistrict`, `statutoryDeclarationDate` |

**Registration fee** ("Registration Fee. Shs. 24,000", printed at the top of
page 1) is payment metadata, not applicant-collected data, and is excluded —
consistent with this registry's general boundary (cf.
`ie/cro/business-name-registration-individual`).

## Scope narrowing and why

- **This form's own boilerplate legal notice — inherited verbatim from the
  Business Names Registration Act and printed identically on both the
  Individual and Firm/Corporation variants — refers throughout to "the
  individuals who are partners" (plural).** Taken in isolation, this could
  suggest the form supports an unbounded number of individual co-owners, not
  a single sole proprietor. This document instead scopes to exactly **one**
  individual applicant, for three independent reasons: (1) URSB's own
  forms-listing page explicitly labels this specific PDF "Business Name
  Registration (**Individual**)" — singular — as distinct from its sibling
  "Firm or Corporation" form (see "Companion form fetched for comparison"
  above); (2) GovSchema v0.3 has no array/repeating-group field construct
  (`GSP-0009` tracks a future proposal for one), so an unbounded partner list
  could not be modelled faithfully regardless; (3) the source form itself
  prints only one ruled writing area per numbered item (4–8), with no
  additional pre-printed partner slots, unlike a form genuinely designed for
  a variable-length list. A future reviewer who confirms this form is in
  practice also used to register a small ordinary partnership of individuals
  (not just a sole proprietor) should treat that as a **new schema version**
  (VERSIONING §3) modelling a small, disclosed, bounded number of partner
  slots, not a silent edit of this one.
- **`applicantOfNonEuropeanOrigin` and `signedByApplicantInPerson` are both
  unprinted boolean gates**, not checkboxes on the source form. Field 4's own
  text conditions the father's-name requirement on the applicant being "of
  non-European origin" (a colonial-era Business Names Registration Act
  clause, retained here in the source's own language per this registry's
  practice of quoting a government form's own wording rather than
  paraphrasing it away, even where that wording reflects dated statutory
  drafting), and the form's introductory notice conditions the Statutory
  Declaration on who signs the form (all partners in person vs. one
  individual/director signing on the others' behalf), per section 6 of the
  Act. Neither condition has a printed checkbox to key a `requiredWhen` gate
  on, so both are modelled as unprinted boolean fields the applicant
  themselves answers directly — the same treatment this registry has given
  comparable unprinted-condition gaps elsewhere (e.g.
  `zm/dnrpc/passport-application`'s `isMarriedWoman`/`hasLostPreviousPassport`
  gates).
- **The Magistrate/Commissioner for Oaths' own signature block on the
  Statutory Declaration page is excluded.** That officiant's signature
  certifies the declaration was sworn before them; it is a third party's own
  certification, not applicant-supplied data — the same treatment this
  registry gives other officiant/examiner blocks (e.g. the doctor's Medical
  Examination Report excluded from `ug/mowt/driving-licence-application`,
  authored the same day).
- **Address fields (`principalPlaceOfBusinessAddress`,
  `applicantResidentialAddress`) are modelled as single free-text strings,**
  matching the source form's own single ruled writing box per item, with no
  internal line1/line2/town sub-labels printed.
- **No asterisk or similar mandatory-field marker appears anywhere in the
  extracted text.** Required/optional judgments are derived from each item's
  own wording (e.g. "(if any)" or "(if applicable)" phrasing marks a field
  optional; a plain, unqualified item is marked required) rather than from
  any printed marking convention, the same basis
  `ie/cro/business-name-registration-individual`'s own VERIFICATION.md
  records for its own, unmarked RBN1 specimen.

## What is NOT yet independently verified

- **Whether URSB's in-person filing counter enforces any of this document's
  `requiredWhen` gates (`applicantFatherName`, the five Statutory Declaration
  fields) as strictly as modelled here**, since this is a paper/in-person
  form with no online filing screen to cross-check field-level enforcement
  against.
- **Whether this "Individual" form is, in current URSB practice, ever also
  accepted for a small ordinary partnership of individuals** (see "Scope
  narrowing and why" above) — this review found no live URSB guidance page
  confirming or ruling that out, only the forms-listing page's own
  "Individual" vs. "Firm or Corporation" labelling.
- **The current UGX 24,000 registration fee's own currency/amount** is
  recorded here as excluded payment metadata (see above) but was not
  independently cross-corroborated against a second, live URSB fee schedule
  this cycle.

## Mock test run (phase 4)

Three realistic payloads and multiple deliberately invalid payloads were
checked field-by-field against every field's `type`/`required`/`validation`/
`requiredWhen` rule and `steps[].fields` referential completeness, using an
independently hand-written mock validator (not the registry's shared
`tools/validate.mjs`, to cross-check it independently) plus this registry's
own committed conformance fixtures (see `conformance/ug/ursb/
business-name-registration-individual/1.0.0/`):

1. **Sole trader of European origin, signing in person, no former name, no
   other business names, no other occupation** — the minimal valid case; all
   optional fields and both conditional blocks (`applicantFatherName`, the
   five Statutory Declaration fields) omitted. **Result: valid.**
2. **Applicant of non-European origin (per field 4's own gate) with a former
   name and a stated nationality of origin different from present
   nationality** — exercises `applicantOfNonEuropeanOrigin: true` +
   `applicantFatherName` together, plus `applicantFormerName` and
   `applicantNationalityOfOrigin`, still signed in person (Statutory
   Declaration fields correctly omitted). **Result: valid.**
3. **Application signed by an authorized representative rather than the
   applicant in person** — `signedByApplicantInPerson: false`, exercising all
   five Statutory Declaration fields together. **Result: valid.**
4. **Deliberately invalid payloads (one induced error each)** — missing
   `businessName`, missing `natureOfBusinessDescription`, missing
   `principalPlaceOfBusinessAddress`, missing `applicantSurname`, missing
   `applicantNationality`, missing `applicantResidentialAddress`, missing
   `dateOfCommencement`, missing `signature`, `applicantOfNonEuropeanOrigin:
   true` with `applicantFatherName` omitted (fails the conditional
   requirement), `signedByApplicantInPerson: false` with `declarantName`
   omitted (fails the conditional requirement), and an unknown field
   injected. **Result: all correctly rejected.**

All payloads were also checked against `schema.json`'s `steps` array: every
field is reachable from `steps[0]` through `next` chaining, and no field is
orphaned from a step.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies `manual-source-review-v1`
(Procedure step 2) against a URSB in-person filing counter or a future URSB
e-service (none exists today for this form), resolves the two open items
above (partnership-of-individuals usage; live fee cross-corroboration),
resolves any discrepancy by shipping a **new schema version** (immutability —
VERSIONING §3), and records the outcome here plus sets `status: verified`
with a current `verification.lastVerifiedAt`/`nextReviewBy`.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-22** (6
months). Re-check the source on or before that date and on any `source.url`
change.
