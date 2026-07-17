# Verification — `kh/gdt/patent-tax-return-additional-business-activities` v1.0.0

## Why this candidate

This is a `GovSchema Standard Research` cycle (**GOV-3574**). Kazakhstan's
`kz/kgd` Form 220.0X companion-schedule series (the registry's most recently
worked seam — six of ten schedules already published, GOV-3484 through
GOV-3568) was the first candidate screened this cycle: Form 220.07
("gratuitously received/transferred property," disclosed at images 188-190
by the parent Form 220.00 schema's own VERIFICATION.md). `adilet.zan.kz`'s
image-serving endpoint, however, returned the site's own "Ведутся
технические работы" maintenance placeholder for **every** image tested in
that document's range — not just 188-190, but also 170, 175, 180-187, and
191-194 — across repeated retries spaced over several minutes, and a `docx`
export fallback also 404'd. This is a full-site outage for this document's
image backend, broader than the narrow two-file gap the immediately
preceding GOV-3568 cycle had disclosed and worked around by citing the
Order's own item-numbered Rules text instead of a page image. That
workaround does not extend to Form 220.07's repeating-table **row count**,
which the Rules text does not state and which no cycle could visually
confirm this session — modelling it without a source would be a guess, not
a schema. This cycle pivoted rather than force it.

Cambodia's `tax.gov.kh` Form PR 008 (Patent Tax Return, authored GOV-3426)
disclosed exactly one remaining backlog item in its own VERIFICATION.md:
Form PR 008_1, the return's own "ADDITIONAL BUSINESS ACTIVITIES"
continuation annex, present on page 3 of the same PDF and left unmodelled
at the time. Re-fetching the same source confirmed it live and byte-
identical to the version already verified, making it a strictly lower-risk
candidate than re-screening a new source cold.

## Sources examined

### Primary source

- **Authority:** General Department of Taxation of Cambodia (GDT),
  `https://www.tax.gov.kh/`.
- **Document — Form PR 008_1, "ADDITIONAL BUSINESS ACTIVITIES"** (page 3 of
  the same PDF as Form PR 008, "Return for Patent Tax," update 16/01/2019).
  - **URL (directly re-fetched, HTTP 200, plain unauthenticated curl):**
    `https://www.tax.gov.kh/u6rhf7ogbi6/gdtstream/edebc078-4dbe-4415-97bf-c5dc9c2bbed5`
  - **File identity:** 1,712,399 bytes,
    `sha256:432decc7ef1ca56d4434c05da44b3a2fa417784837c3041ecad3fc16bbf673fc` —
    byte-identical to the hash `kh/gdt/patent-tax-return`'s own
    VERIFICATION.md already recorded from the GOV-3426 cycle, confirming
    this is the same, unchanged document, not a new or altered version.
  - **Extraction method:** `pdfjs-dist@3`, reused from the GOV-3426 cycle's
    own scratch install (`/tmp/kh_pr008_extract`).
    `page.getAnnotations({intent:'display'})` for page 3's 32 AcroForm
    widgets, cross-checked against `page.getTextContent()`'s bilingual
    Khmer/English text layer. Additionally **rendered page 3 to a PNG**
    (`pdfjs-dist` + the `canvas` npm package, both reused from a shared
    scratch install at `/tmp/node_modules`) and visually inspected it —
    the raw text-content stream's line-grouping had merged two separate
    printed labels ("12," the last activity row's own number, and "Total,"
    the following summary line's label) onto what read as one garbled
    line; the rendered image resolved this unambiguously: **12 ordinary
    numbered activity rows (1-12), then a separate "Total" line below
    them** — not an 11-row table with a labelled 12th "subtotal" row, which
    the raw text extraction alone would have suggested.
  - **Widget count confirmed:** 32 widgets on page 3 — matches the count
    `kh/gdt/patent-tax-return`'s own VERIFICATION.md already disclosed for
    this page.

## Scope and disclosed boundaries

This schema models the annex's own repeated taxpayer-identification header
(TIN, enterprise name in Khmer and Latin script — the same two-box TIN
format and field definitions as the main return) and its 12 further
business-activity/tax-amount row pairs, its own subtotal, and its own
declaration date.

### Modelling decisions worth disclosing

- **Row numbering: this schema's own field names (`businessActivity5...16`)
  continue the main return's numbering rather than reusing the annex's own
  independent printed row numbers (1-12).** The main return
  (`kh/gdt/patent-tax-return`) documents its own four rows as covering
  business activities 1-4, and this annex is filed only as a *supplement*
  to that return when a fifth activity exists ("please fill additional
  form PR 008_1," printed on the main return's own page 1) — not as a
  standalone replacement. Naming this annex's rows 5-16 keeps the two
  sibling schemas' field names non-colliding and semantically continuous at
  the enterprise level. Each row field's own `sourceRef` and `description`
  still discloses the annex sheet's own printed row number (1-12), so a
  consumer reading only this schema can still match a field back to the
  exact physical box on the form.
- **Only the first annex row (`businessActivity5Description`/
  `businessActivity5TaxAmount`) is `required: true`; rows 6-16 are
  optional** — on the reasoning that this annex is filed only when a fifth
  activity genuinely exists, mirroring the main return's own required/
  optional split (row 1 required, rows 2-4 optional).
- **`additionalActivitiesSubtotal` (the annex's own printed "Total" line) is
  explicitly distinguished from the main return's `patentTaxSubtotal`.**
  The annex's own total sums only its own 12 rows (activities 5-16); the
  main return's subtotal is documented as summing across *all* declared
  activities, including these. The source PDF states no explicit formula
  reconciling the two figures beyond the general expectation that the main
  return's own subtotal is the grand total — this schema does not assert
  a cross-document arithmetic relationship it cannot cite a source for.
- **No signature/name/position fields modelled**, consistent with the main
  return's own convention: the annex's printed Signature/Name/Position
  lines beneath the date block have no fillable AcroForm widget (confirmed
  by widget count: the 32 widgets found account exactly for the header,
  12 row pairs, subtotal, and 3-box date field, with none left over for
  those lines).

### Not modelled, disclosed as backlog

- **Kazakhstan's Form 220.07-220.10** remain disclosed, open backlog for a
  future cycle once `adilet.zan.kz`'s image-serving endpoint recovers from
  the full-document outage this cycle found (confirmed across images
  170-194, not just 220.07's own 188-190) — see "Why this candidate" above.
  A future cycle should re-check the image endpoint fresh rather than trust
  this cycle's outage as still current.
- **Withholding Tax (Form WT 03) and Tax on Salary (Form TOS 01)** remain
  the last `tax.gov.kh` sibling-form backlog from GOV-3417 — unaffected by
  this cycle (Tax on Salary was actually authored under GOV-3433 and
  Withholding Tax under GOV-3440, both prior to this cycle; re-confirmed via
  `registry/kh/gdt/` listing, not re-screened live this cycle).
- **Cambodia's DMV, Passport, Visa, and National ID verticals** remain
  re-confirmed weak/dead per the GOV-3410 cycle; not re-screened this cycle.

## Conformance fixtures

Fixtures are committed under
`conformance/kh/gdt/patent-tax-return-additional-business-activities/1.0.0/`:
two valid submissions (a minimal filing with only the required fifth
activity; a fuller filing with several additional activities and a
subtotal) plus mutation-control fixtures covering the required TIN pattern,
the required fifth-activity fields, and a negative-amount validation
failure. All fixtures were checked with a from-scratch, throwaway Node mock
validator implementing this schema's own `required`/`validation` rules (not
committed, consistent with this registry's established per-cycle practice).
Both `tools/validate.mjs` and `tools/validate-ajv.mjs` pass across the full
registry with this schema added.

## Known gaps

- The exact arithmetic relationship between this annex's own subtotal and
  the main return's `patentTaxSubtotal` is not stated by the source and is
  not modelled — see "Modelling decisions worth disclosing" above.
- Kazakhstan's Form 220.07-220.10 backlog (see "Not modelled" above) is the
  main outstanding item this cycle's own scouting surfaced but did not
  resolve, blocked on a live source outage rather than a modelling gap.

## Verification method assessment

`manual-source-review-v1` — a human/agent read the primary source directly
(including a rendered page image, not text extraction alone) and
transcribed its fields. No automated re-verification tooling exists yet for
this schema; `nextReviewBy` is set 6 months out per the practice's default
cadence.
