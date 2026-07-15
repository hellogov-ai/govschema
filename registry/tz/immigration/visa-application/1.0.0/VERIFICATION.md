# Verification record — `tz/immigration/visa-application` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-15`

This is a `GovSchema Standard Research` cycle (**GOV-3216**), opening
Tanzania's Visa vertical. Tanzania stood at 4 of 6 verticals entering this
cycle (Business Formation via `tz/brela`, DMV via `tz/tra` Form MV10
(GOV-3214), National ID & Civic Documents via `tz/nida`, Taxes via
`tz/tra` ITX201.01-E); it now stands at 5 of 6.

*(Review-gate correction, GOV-3223: this branch was drafted before
GOV-3214's DMV opening landed on `main`, so the paragraph above originally
read "3 of 6 entering this cycle... it now stands at 4 of 6" and
`schema.json`'s `description`/`verification.notes` said the same;
corrected here and there, plus in `CATALOG.md`, during rebase-before-merge
rather than round-tripped back to the author, per this registry's
established practice for this exact stale-branch pattern.)*

## Sources examined

### Source 1 (primary `source`, Embassy of the United Republic of Tanzania, Washington D.C.)

- **Authority (printed on the form):** "THE EMBASSY OF THE UNITED REPUBLIC OF
  TANZANIA", 22nd St. NW, Washington D.C 20037.
- **Document:** "Visa Application Form"
- **URL (directly retrieved with a plain `curl`, no User-Agent/session/referrer
  needed):**
  <https://www.us.tzembassy.go.tz/uploads/forms/Visa_Application_Form_fillable.pdf>
- **HTTP status / content type:** `200` / `application/pdf`
- **File identity:** `sha256:daff7c35a97eb9a9e5fd14a21952bbc914b958cb6934c0d87271cbcc7ef57218`,
  1,521,186 bytes, `Last-Modified: Tue, 09 Nov 2021 22:09:46 GMT`, genuine
  `%PDF-1.6` magic bytes.
- **Retrieved / reviewed:** 2026-07-15

### Source 2 (cross-check only, not the canonical `source`, Immigration Department scanned mirror)

- **Authority:** Immigration Department (Idara ya Uhamiaji), Ministry of Home
  Affairs — `immigration.go.tz`'s own `<title>` confirms "Immigration
  Department - Tanzania Immigration Department".
- **URL:**
  <https://www.immigration.go.tz/index.php/application-and-declaration-forms?download=16%3Avisa-application-form>
- **HTTP status / content type:** `200` / `application/pdf`
- **File identity:** `sha256:5e44563cce176d4a764426ed0ddb5959619c9f7388a4fe622e623805300be8e8`,
  572,504 bytes, genuine `%PDF-1.3` magic bytes — a different, smaller,
  scanned/flattened edition of the same form (confirmed visually via a
  node-canvas render), used only to confirm every section modelled below is
  the Immigration Department's own current form design rather than an
  embassy-specific one-off. `source.url` in `schema.json` points at the
  embassy's genuinely fillable AcroForm edition, since a form-filling agent
  needs the fillable original, not the scanned copy.
- **Retrieved / reviewed:** 2026-07-15

## Structural verification (AcroForm re-derived from scratch)

`pdfjs-dist` 3.11.174 (installed standalone in a scratch directory for this
task, **not** added as a repository dependency) was used three ways:

1. `page.getAnnotations()` on both pages: **44** Widget annotations on page 1,
   **38** on page 2 — **82 widget annotations total**.
2. `doc.getFieldObjects()`: **80** distinct fully-qualified field names (two
   names — `Diplomatic` and `Transit` — are each shared by two separate
   widgets; see "Duplicate field names" below), confirming 82 real widgets
   plus 2 non-terminal parent-node placeholder entries pdfjs-dist reports at
   `page: -1` for those two shared names (82 + 2 = 84 total field-object
   array entries, reconciling exactly against the 82 counted in step 1).
3. `page.getTextContent()` (items sorted by transform x/y) on both pages, to
   read every printed label and cross-correlate it against each widget's
   `rect`.

Both pages were additionally rendered to PNG at 3x scale via `node-canvas`
(`page.render()`), and specific regions were cropped and visually inspected
to resolve every ambiguity below rather than guessing from text/rect
coordinates alone.

## Findings and scope decisions

1. **Two AcroForm field names are each shared by two visually/semantically
   distinct checkboxes — a source authoring defect, not reproduced.**
   `getFieldObjects()` shows the literal field `Diplomatic` backs both the
   "Purpose of Visa" grid's "Diplomatic" checkbox (page 1, rect
   `[440.9,276.2,453.6,288.2]`) and the "Type of Passport" row's "Diplomatic"
   checkbox (rect `[211.8,141.6,224.5,153.6]`); the literal field `Transit`
   backs both the header "Type of Visa Requested: Transit Visa" checkbox
   (rect `[396.3,462.9,409.0,474.9]`) and the "Purpose of Visa" grid's
   "Transit" checkbox (rect `[311.7,263.5,324.4,275.5]`). In a real PDF
   viewer these pairs are the *same* field and tick together — almost
   certainly an authoring defect (copy-pasted checkbox groups without
   renaming the field), since a diplomatic-passport holder is not
   necessarily requesting a diplomatic-purpose visa, and a transit-visa
   applicant is not necessarily also selecting "Transit" as a purpose (the
   grid already lists "Transit" as one of twelve otherwise-independent
   purpose options). `schema.json` models all four checkboxes as four
   independent boolean fields (`visaTypeTransit`/`purposeOfVisaTransit`,
   `purposeOfVisaDiplomatic`/`typeOfPassportDiplomatic`), each disclosing the
   shared-name defect in its own `description`, rather than collapsing any
   pair to match the source's accidental linkage.
2. **`Others` internal field name backs the visually-printed "Business"
   checkbox.** The "Purpose of Visa" grid's row-1/column-2 checkbox (rect
   `[312.2,291.7,324.9,303.7]`) sits immediately beside the printed word
   "Business" in the 3x render, but its own AcroForm field name is `Others`.
   Modelled as `purposeOfVisaBusiness` (matching the printed label a human
   sees), with the mismatch disclosed in its `description` rather than
   propagated as a misleading schema field name.
3. **Purpose-of-Visa grid re-derived and visually confirmed as a 4x3 checkbox
   grid, not a mis-split label.** Read row-by-row off the 3x render: row 1 =
   Leisure, Holiday / Business / Various; row 2 = Visiting friends, relatives
   / Study / Diplomatic; row 3 = Mission / Transit / Official; row 4 =
   Meeting, Conference / Health Treatment / Same day visitor. Raw
   `getTextContent()` output initially looked like it might be a two-line
   wrap of "Diplomatic Mission" split awkwardly across rows 2 and 3 (the word
   "Diplomatic" appears on row 2's text line at x=466, and "Mission" appears
   on row 3's text line but at x=180 — a different column's x-coordinate).
   The render resolved this unambiguously: "Diplomatic", "Mission", and
   "Official" are three separate, independently-checkable single-word
   category checkboxes, each in its own grid cell with its own checkbox
   square to its left — not a continuation artifact. Modelled as three
   distinct fields (`purposeOfVisaDiplomatic`, `purposeOfVisaMission`,
   `purposeOfVisaOfficial`), each disclosing this specific verification step.
4. **Two uncaptioned stray text widgets excluded from `fields[]`.**
   - `days Max 90` (rect `[72,170.2,537.4,182.2]`, page 1): a full-width text
     widget on its own blank line directly beneath the labelled "Requested
     duration of stay: ___ days (Max. 90)" line. The 3x render confirms this
     second line carries no printed caption of its own — just a bare
     underline. Excluded as a stray/leftover fillable area rather than
     invented as a second, unlabelled question.
   - `undefined_2` (rect `[485.0,103.1,539.8,115.1]`, page 1): a small text
     widget at the tail end of the "Date Issued: ___ Valid Until: ___" line.
     Its own `alternativeText` as reported by pdfjs-dist is the literal
     string `"undefined"` — Adobe Acrobat's default placeholder when a
     widget author never gave it a real tooltip. No distinct printed caption
     exists at this position in the render. Excluded for the same reason as
     `days Max 90`.

   Both exclusions are consistent with the general pattern already visible
   in findings 1-2 above: this specific PDF was assembled with some sloppy
   copy-paste field authoring (shared names, copied tooltips, stray extra
   widgets), and this document models what the form visually asks an
   applicant, not every technically-present widget.
5. **Three "continuation" widget pairs — two collapsed by inspection, one by
   position rather than by its own (misleading) internal name.**
   - `First Names in Full [1]`/`[2]` (page 1) and `Current Address [1]`/`[2]`
     (page 2): each pair is vertically stacked with no intervening caption
     (confirmed by rect y-coordinates and the render), plainly one answer's
     overflow onto a second printed line. Each pair is modelled as **one**
     schema field (`firstNamesInFull`, `currentAddress`).
   - `ProfessionOccupation 1`/`ProfessionOccupation 2` (page 2) is **not** a
     clean continuation pair despite the shared name prefix: the render
     shows `ProfessionOccupation 1` (rect y `570.1-582.1`) is the one and
     only line for "Profession/Occupation:", while `ProfessionOccupation 2`
     (rect y `543.2-555.2`) sits directly beneath `Employer Address` (rect y
     `556.7-568.7`), not beneath `ProfessionOccupation 1`. It is `Employer
     Address`'s own overflow line, mislabelled internally with a
     copy-pasted `ProfessionOccupation` prefix — the same class of naming
     sloppiness as finding 2. Modelled as part of `employerAddress`, keyed
     to its rendered position, not its internal name.
6. **Funding-source line has only one dedicated blank.** "Budge [sic]
   available for your stay: Cash $/___ Credit card Travelers cheques" prints
   three funding methods, but the render confirms only "Cash $/___" has its
   own checkbox-free blank; "Credit card" and "Travelers cheques" print as
   plain words with no blank or checkbox of their own anywhere on that line.
   A separate full-width blank line immediately below (internal widget name
   `Credit card`, rect `[72,422.4,537.4,434.4]`) is the only remaining
   fillable space in this section. Modelled as `fundingAvailableOther`,
   documented as covering both of the two methods the source gives no
   dedicated field for.
7. **Minors table is scoped narrowly: "Minors Travelling in Applicant's
   Passport", not general accompanying persons.** The heading directly above
   the repeating Name(s)/Sex/Year of birth grid reads "Minors Travelling in
   Applicants' Passport:" (page 2). The grid's row count — **3**, matching
   the 3 sets of `Names`/`Sex`/`Year of birth` widgets (`_2`/`_3` suffixed) —
   was confirmed by the render, not assumed from the heading text alone.
   Modelled as a bounded 3-slot repeating group (`minor1`..`minor3`), per
   this registry's established bounded-repeating-group convention (e.g.
   `rw/dgie/visa-application`'s own 4-slot children table), not an invented
   unbounded array.
8. **Minor `Sex` fields modelled as free text, not an M/F enum.** The main
   applicant's own `Sex` field carries an explicit "(M/F)" instruction
   ("Sex (M/F)"), justifying the `enum: ["M","F"]` modelling used elsewhere in
   this registry for instructed M/F text blanks (e.g.
   `ph/dfa/passport-application`). The minors table's `Sex` column carries no
   such instruction of its own — just the bare word "Sex" — so `minorNSex` is
   modelled as free text rather than assuming the same convention applies.
9. **No printed required-field marker exists anywhere on this form.** A
   programmatic scan of every text item on both pages for the `*` glyph
   found exactly **one** match: the "(* not for transit visa)" footnote
   beside the "Multiple" entries checkbox, which qualifies that option's own
   applicability (a note, not a requiredness legend). No asterisk, legend, or
   other marker distinguishes a required blank from an optional one anywhere
   else on the form. Requiredness below is therefore asserted from context,
   following this registry's established practice for forms with no such
   marker (see `uy/mrree/formulario-unificado-de-visas` judgment call 4;
   `do/mirex/visa-application` scope decision 1): core
   identity/passport/current-location/contact/purpose/declaration fields are
   modelled `required: true`; fields the form itself frames as conditional
   (`otherTravelDocumentSpecify`, `finalDestinationEntryPermitValidUntil`) or
   supplementary/contingent on circumstances the form does not otherwise gate
   (`postalCode`, `faxNo`, `employerAddress`, `nameOfTravelAgentTourOperator`,
   `fundingAvailableCash`/`fundingAvailableOther`, the `minor1`..`minor3`
   table) are modelled optional.
10. **The transit entry-permit question's printed "No"/"Yes" checkbox pair is
    collapsed to one boolean field, not modelled as two.** "In case of
    Transit: Do you have an entry permit for the final country of
    destination? No [ ] Yes [ ]" (page 2) prints as two independent
    checkboxes (confirmed distinct AcroForm widgets, rects
    `[463.8,327.6,476.5,339.6]` for "No" and `[499.1,327.6,511.8,339.6]` for
    "Yes"), but the two together answer one underlying yes/no question.
    Modelled as a single field, `hasEntryPermitForFinalDestination`,
    `requiredWhen` `visaTypeTransit` is `true` (the question's own text
    scopes it to transit applicants), per this registry's established
    convention for a printed Yes/No checkbox pair mapping to one underlying
    question (structural interpretation, not literal 1:1 transcription of
    every checkbox widget — see `us/uscis/petition-alien-relative-i130`'s
    own VERIFICATION.md for the same precedent). `finalDestinationEntryPermit
    ValidUntil` remains `requiredWhen` `hasEntryPermitForFinalDestination`
    is `true`.
11. **The declaration's `Signature` widget is a genuine PDF `/FT /Sig` field,
    not a text field — modelled as a `documents[]` attestation, not a scalar
    field.** `getAnnotations()` reports `fieldType: "Sig"` for this widget
    (page 2, beside "I hereby declare that the information stated above is
    true and correct: Date: ___ Place: ___ Signature ___"), distinct from
    every other widget on the form (all `"Tx"` or `"Btn"`). Consistent with
    this registry's convention for signature lines (a value with no scalar
    representation), it is modelled as the `declarationCertification`
    `documents[]` entry (`category: attestation`) rather than a `fields[]`
    entry; `signingDate` and `signingPlace` (both genuine `Tx` text widgets)
    remain scalar fields.
12. **Office-use sections excluded in full.** Page 1's "FOR OFFICIAL USE
    ONLY" box (ERV No., Draft No., Date, Bank Name — printed but carrying no
    AcroForm widgets at all, confirmed by `getFieldObjects()`) and its own
    fillable `VISA NO` widget (consulate-assigned, inside the same box) are
    excluded. Page 2's "For official use only" table (Station, Type of visa
    issued, Visa sticker No, Processing Officer, Authorizing officer, Date —
    all genuine `Tx` widgets, but printed inside a bordered table explicitly
    headed "For official use only" and containing only officer-facing
    columns) is excluded in full, consistent with this registry's standard
    office-use-section treatment.

## Conformance

2 valid mock scenarios and 7 mutation-control fixtures are committed under
`conformance/tz/immigration/visa-application/1.0.0/`:

- `valid-single-entry-travel-visa-leisure.json` — a single-entry Travel visa,
  leisure/holiday purpose, ordinary passport, single applicant.
- `valid-transit-visa-with-minor-and-entry-permit.json` — a Transit visa,
  transit purpose, one accompanying minor on the applicant's own passport,
  and an affirmative answer to the transit-specific entry-permit question
  (exercising both `hasEntryPermitForFinalDestination`'s and
  `finalDestinationEntryPermitValidUntil`'s `requiredWhen`).
- `mutation-control-missing-required-field.json` — drops `passportNumber`.
- `mutation-control-invalid-date-format.json` — `dateOfBirth` set to
  `12/04/1991` instead of ISO `YYYY-MM-DD`.
- `mutation-control-invalid-sex-enum.json` — `sex` set to `"X"`.
- `mutation-control-invalid-email-pattern.json` — `emailAddress` set to
  `"not-an-email"`.
- `mutation-control-missing-conditional-other-travel-document.json` — sets
  `typeOfPassportOtherTravelDocument: true` without the required
  `otherTravelDocumentSpecify`.
- `mutation-control-missing-conditional-entry-permit.json` — sets
  `visaTypeTransit: true` without the required
  `hasEntryPermitForFinalDestination`.
- `mutation-control-missing-declaration-attestation.json` — drops the
  `declarationCertification` document entry.

An ephemeral, from-scratch conformance checker (`/tmp/gov3216/check.mjs`,
deriving required/`requiredWhen`/enum/pattern/`exclusivityGroups` rules
directly from this schema's own `fields[]`/`documents[]`; discarded after use,
not committed to the repository) ran all 9 fixtures: both valid scenarios at
**0 errors**, all 7 mutation-control fixtures at **exactly 1 error each**.

## Tooling

- `node tools/validate.mjs` — `488/488` documents passed (full registry,
  including this one).
- `node tools/validate-ajv.mjs` — `488/488` documents validated against the
  v0.3 meta-schema (ajv 2020-12, full registry).
- `node tools/verify-sources.mjs registry/tz/immigration/visa-application/1.0.0`
  — 4 URLs checked (this document's `source.url`, `authority.url`, and the
  two URLs cited above), 0 failures (1 transient WARN on
  `immigration.go.tz`, tolerated per the tool's own retry/backoff design;
  manually re-confirmed reachable with a direct `curl`, HTTP 200).
- `npm run build-index` (in `tools/govschema-client/`) re-run to regenerate
  `registry-index.json` — 488 entries.
