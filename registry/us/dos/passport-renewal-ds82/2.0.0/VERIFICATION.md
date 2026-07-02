# Verification record — `us/dos/passport-renewal-ds82` v2.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. `v1.0.0`'s own `VERIFICATION.md` stays as the authoring provenance for
that version and is not edited (VERSIONING.md §3 immutability); `v1.1.0` shipped
without its own record. This is a fresh record for `v2.0.0`.

## Current claim

- **`status`:** `verified` (advanced from `draft` — this version performs the
  full independent field-by-field review the practice requires)
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-02`

This closes out [GOV-603](/GOV/issues/GOV-603) (board ask, split from
[GOV-434](/GOV/issues/GOV-434)): advance the homepage hero's featured schemas
beyond `draft` through the real verification practice, starting with the
most-worked reference schema.

## Why this is a MAJOR version, not MINOR or PATCH

Two independent classes of change are bundled in this release:

1. **A field-removing, validation-tightening correction to the eligibility
   gate and the sex-marker field** (see "Discrepancies found and corrected"
   below) — per [VERSIONING.md](../../../../../VERSIONING.md) §1, removing a
   field or narrowing an `enum` so previously valid input becomes invalid is
   MAJOR: an agent built against `v1.1.0` that sent `passportLostOrStolen` /
   `passportUndamaged` or `sexMarker: "X"` would have that input rejected by
   `v2.0.0`.
2. **28 new, entirely optional fields** (see "New fields added" below) — on
   their own this is MINOR (every `v1.1.0`-conforming applicant document
   remains valid under `v2.0.0`).

The higher of the two — MAJOR — governs the release as a whole:
`1.1.0` → **`2.0.0`**.

## Independent second-reviewer pass

Per the practice's Procedure steps 2–3, this pass re-fetched every source
fresh rather than trusting `v1.0.0`'s authoring record:

- **`https://travel.state.gov/en/passports/renew-replace/mail.html`** —
  retrieved 2026-07-02. The eligibility summary here still lists the same six
  plain-language conditions `v1.0.0` originally derived; it does not by itself
  surface the wording precision the underlying PDF's Section A carries (see
  next bullet), so it was cross-checked against the form itself rather than
  relied on alone.
- **The live fillable Form DS-82 PDF** (`eforms.state.gov/Forms/ds82_pdf.PDF`,
  "DS-82 04-2025" per its own footer, OMB expiration 06/30/2028) — retrieved
  2026-07-02, extracted two independent ways:
  - **Page text**, via `pdfjs-dist`'s `getTextContent()` (the rendered text of
    all 6 pages: 4 instruction pages + 2 application pages), giving the exact
    printed wording of Section A's eligibility statements and Section C's
    numbered field instructions.
  - **AcroForm field structure**, via `pdf-lib`'s form-field API (71 named
    widgets: text fields, checkboxes, and radio groups with their export
    values) — cross-checked against the page text to confirm every visible
    field has a corresponding named widget, and to inventory fields the page
    text alone does not fully enumerate (e.g. the Emergency Contact and
    Permanent Address blocks, whose section headers are graphical rather than
    running text).
  - **A methodology note**: every one of the 71 widgets' native `/Ff`
    "Required" bit is unset, including on fields already correctly modeled as
    `required: true` here (name, DOB, SSN, mailing address). This form does not
    use the PDF-native required-field mechanism at all; requiredness in this
    document is, and must continue to be, read from the source's own printed
    instructions and section framing, not the AcroForm flag.

## Discrepancies found and corrected

1. **Eligibility gate restructured to match the live form's actual six
   statements.** `v1.1.0` modeled six eligibility booleans authored against an
   earlier form revision. The current Form DS-82 (Rev. 04-2025) Section A
   reads: "You are eligible to use this form if you can answer 'Yes' to ALL
   statements below about your passport," followed by exactly six YES/NO
   statements (confirmed against the PDF's 6 eligibility radio groups: `Most
   Recent`, `16 Years`, `Less Than 15`, `Damaged`, `Not Limited`, `Name
   Changed`) — but they are not the same six `v1.1.0` had:
   - `passportLostOrStolen` and `passportUndamaged` **no longer exist as
     separate statements**; the current form combines them into one: "The
     U.S. passport book and/or card that I am renewing has not been
     mutilated, damaged, or reported lost or stolen." Replaced both with a
     single new field, `passportNotMutilatedDamagedOrLostStolen`.
   - The current form has a **statement `v1.1.0` never modeled**: "My U.S.
     passport was not limited to less than the normal ten-year validity
     period due to passport damage/mutilation, multiple passport
     thefts/losses, or non-compliance with 22 C.F.R. 51.41." Added as a new
     field, `passportNotLimitedValidity`.
   - `passportIssuedAge16OrOlder`'s old label bundled "...and was it valid for
     10 years?" onto the age-16 check. The current form's actual statement 2
     is age-only ("I was at least 16 years old when my most recent U.S.
     passport book and/or card was issued.") — the validity-period clause is
     the separate statement above, not part of this one. Label corrected to
     drop the bundled clause.
   - `nameMatchesOrHaveDocumentation`'s label tightened to state the current
     form's actual OR-structure and scope (name-change acceptable only "by
     marriage or court order", not any name change) verbatim.
   - Net effect: still six eligibility fields, same `eligibility` step, same
     `canSubmitMostRecentPassport` / `passportIssuedWithin15Years` names
     unchanged — but the fields covering "damage/loss" and "validity period"
     are restructured to match what the form actually asks today.
2. **`sexMarker` validation narrowed from `["F", "M", "X"]` to `["F", "M"]`.**
   Form DS-82 (Rev. 04-2025) Section C, item 3, states: "You must select sex
   marker option 'M' (male) or 'F' (female) that corresponds with your
   biological sex at birth." The current form's field set (confirmed via both
   the page text and the AcroForm's `Gender` widget) offers only these two
   options. This is a straightforward mechanical read of the current
   government form's stated field constraint, recorded here as a fact about
   the source document as of this review date — like every `validation` rule
   in this document, it describes what the live form currently accepts, nothing
   more, and is expected to be re-checked at the practice's normal cadence like
   any other field.
3. **`mailingAddressLine2` label and description corrected.** `v1.1.0`
   labeled this "apartment, suite, or unit," but Form DS-82 Section C item 8
   states: "For line 2, if you do not live at the address listed in this
   field, put the name of the person who lives at this address and mark it
   'In Care Of'." Line 2 is a "care of" line, not an apartment/unit line;
   label and description corrected to match the source wording exactly.

## New fields added (additive, MINOR-tier on their own)

Discovered by cross-referencing the AcroForm's 71 named widgets against
`v1.1.0`'s 28 fields — 27 widgets had no corresponding field. All are
`required: false`, matching the source's own framing of these sections as
optional or conditional:

- **Mailing address:** `mailingAddressCountry` (the form has a country line;
  `v1.1.0` implicitly assumed U.S.-only).
- **Permanent address** (`permanentAddressLine1/Line2/City/State/PostalCode/Country`)
  — a block distinct from mailing address, for when they differ or the
  mailing address is a P.O. Box.
- **Physical description** (`height`, `hairColor`, `eyeColor`,
  `occupationOrEmployer`) — optional identifying information, not printed in
  the current passport book.
- **`otherNamesUsed`** — Form DS-82 Section C item 9 ("List all other names
  you have used").
- **`additionalContactPhone`** — a secondary contact number field distinct
  from the primary phone field already modeled.
- **Name-change detail** (`nameChangeDate`, `nameChangePlace`,
  `nameChangedByMarriage`, `nameChangedByCourtOrder`) — only relevant when
  `nameMatchesOrHaveDocumentation`'s name-changed branch applies; the existing
  `nameChangeDocument` field already covers the file upload.
- **Emergency contact block** (`emergencyContactName`,
  `emergencyContactRelationship`, `emergencyContactAddressLine1/Line2/City/
  State/PostalCode/Country`, `emergencyContactPhone`, `emergencyContactEmail`)
  — a new `emergency_and_travel` step.
- **Travel plans** (`travelDepartureDate`, `travelReturnDate`,
  `countriesToBeVisited`) — same new step; only relevant if travel is imminent.
- **`passportBookSize`** (`regular`/`large`) — the form's book/card size
  choice, applicable only when renewing a passport book.

## Intentionally not modeled

- **Two AcroForm checkbox widgets, `Additional # 1` and `Additional # 2`.**
  Their purpose could not be confidently determined from the field name,
  page-text context, or their position relative to labelled fields. Rather
  than guess at a data element, they are left unmodeled; a future reviewer
  with access to a rendered view of the form (this review had none — see
  "Extraction method" note above) should resolve what these represent.
- **A second, `" 2"`-suffixed set of name/DOB/phone text-field widgets**
  (e.g. `Name of Applicant (Last, First, Middle) 2`, `Date of Birth 2`).
  The page text confirms Form DS-82 is a two-page application ("Application
  Page 1 of 2" / "Application Page 2 of 2") and Page 2's visible content
  (Section F / page-6 text: `Zip Code`, `Country`, `Email`, dates,
  `Relationship To Applicant`, `Countries To Be Visited`, `Phone Number`)
  matches fields already modeled in the Emergency Contact / Travel Plans
  blocks — consistent with these `" 2"`-suffixed widgets being a Page 2
  identity-header repeat of already-captured applicant fields (a common
  continuation-page pattern), not a distinct data element. Not modeled
  separately on that reading, but flagged here as the reasoning rather than a
  silent omission.
- **Fees, processing times, and mailing addresses for submission** (Sections
  D/E/F) remain deliberately excluded as data (SPEC's guidance on fee/policy
  volatility), per `v1.0.0`'s original scope decision, unchanged.

## Sources examined

- **Live page:** <https://travel.state.gov/en/passports/renew-replace/mail.html>,
  retrieved 2026-07-02.
- **Form PDF:** <https://eforms.state.gov/Forms/ds82_pdf.PDF> ("DS-82
  04-2025"), retrieved 2026-07-02, extracted via `pdfjs-dist` page text and
  `pdf-lib` AcroForm field enumeration (see "Independent second-reviewer pass"
  above).
- **Retrieved / reviewed:** 2026-07-02
- **Reviewer:** GovSchema Engineering (Standards Engineer)

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is **2027-01-02** (6 months):
passport renewal is a fee/policy-sensitive process, and this cycle's finding —
a real, mid-cycle form-revision drift since `v1.0.0`/`v1.1.0` were authored —
argues for holding to the practice's default cadence rather than lengthening
it. Re-check the source on or before that date, and immediately on any new
Form DS-82 revision notice or `source.url` change.
