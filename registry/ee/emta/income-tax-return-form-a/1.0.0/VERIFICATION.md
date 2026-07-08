# Verification record — `ee/emta/income-tax-return-form-a` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-08`

This is a `GovSchema Standard Research` cycle (**GOV-1721**), the issue's own
named candidate. Estonia stood at 3/6 verticals (National ID via
`ee/ppa/e-residency-application`, Business Formation via
`ee/rik/private-limited-company-foundation`, Passport via
`ee/ppa/passport-application`) going into this cycle. This document closes
Taxes to 4/6.

## Why this candidate

The issue directly named the source: Vorm A / Form A, Estonia's individual
income tax return, at a specific pinned URL
(`https://www.emta.ee/sites/default/files/documents/2026-02/vorm_a_2025_ee_en.pdf`),
already confirmed by the issue text to be a genuine, unauthenticated,
bilingual PDF with zero AcroForm fields. This cycle's work was to independently
re-confirm that claim, extract the form's own field inventory, scope it to
the common case per the issue's explicit brief, and author the schema — not
to re-screen candidates.

## Sources examined

### Source 1 (primary `source`, the form)

- **Authority:** Maksu- ja Tolliamet (Estonian Tax and Customs Board, EMTA).
- **Document:** Vorm A / Form A, "Residendist füüsilise isiku
  tuludeklaratsioon / Income tax return of a resident natural person," 2025
  tax year edition (the current version as of this cycle's retrieval date,
  per emta.ee's own tax-return-forms-and-instructions index, which lists no
  later version — a 2026-01-dated sibling form, `vorm_a1_est_eng_2025_taidetav.pdf`,
  is a different, pre-filled/"täidetav" variant of the return, not this form).
- **URL (index page, cited in `source.url`):**
  <https://www.emta.ee/en/private-client/taxes-and-payment/declaration-income/tax-return-forms-and-instructions> —
  direct, unauthenticated, HTTP 200, server-rendered plain HTML. Confirmed
  the page's own listing labels this exact file "Form A | Income tax return"
  under the heading "Tax return forms for resident natural persons."
- **URL (direct PDF download, cited in `source.documentRef`):**
  <https://www.emta.ee/sites/default/files/documents/2026-02/vorm_a_2025_ee_en.pdf> —
  direct `curl`, HTTP 200, no login/CAPTCHA/WAF, 354,710 bytes (346.4 KB per
  the index page's own listed size), 12 pages.
- **Retrieved / reviewed:** 2026-07-08.
- **Extraction method:** downloaded directly, then parsed with `pdfjs-dist`
  (`legacy/build/pdf.js`, loaded via `createRequire` since this package ships
  no `.mjs` entry point for the legacy build — a small variance from the ESM
  `pdf.mjs` import pattern some prior cycles used). `page.getAnnotations()`
  returned **zero** Widget annotations across all 12 pages — confirming the
  issue's own claim of a static, print/hand-fill template, not a fillable
  PDF — so `page.getTextContent()` was used instead, reading the form's own
  printed numbered sections (1, 1.1, 2, 2.1-2.4, 3, 4, 5.1-5.5, 6.1-6.6,
  7.1-7.3, 8.1-8.9, 9.1-9.6, 10, 10.1-10.3, 11-11.2, 12.1-12.6, 13, 14,
  14.1-14.2) and every field's bilingual (Estonian/English) inline label, in
  full, across all 12 pages.
- **What it confirms:** every field this document models, verbatim, plus the
  exact closing declaration text used in `documents[].signatureDeclaration`
  (Section 14's confirmation paragraph).

### Source 2 (corroboration — filing window, tax rate, and statutory basis)

- **URL:** <https://www.emta.ee/en/private-client/taxes-and-payment/declaration-income/income-tax-returns-2025> —
  direct, unauthenticated, HTTP 200, server-rendered plain English HTML,
  retrieved 2026-07-08.
- **What it confirms:** the 2025-tax-year filing window (16 February - 30
  April 2026), the 22% tax rate for this filing year, and — in its own
  "Legislation" tab — a direct citation of Tulumaksuseadus (Income Tax Act)
  section 43(4) as the statutory basis for the filing deadline (linked as
  `riigiteataja.ee/en/eli/ee/521112023001/consolide/current#para43lg4`).
  `riigiteataja.ee` itself is a fully client-rendered Angular SPA that
  returns an identical empty shell to an unauthenticated fetch — the same
  obstacle this registry's prior two EE schemas
  (`ee/rik/private-limited-company-foundation`, `ee/ppa/passport-application`)
  hit and worked around via Wayback Machine snapshots of the Act's own
  `/tolge/pdf/` translation route. This cycle did not repeat that
  workaround: the statute is cited here only as EMTA's own reference to it
  (a secondary confirmation of the filing-deadline basis), not
  independently re-fetched and read section-by-section, since the form
  itself — not the underlying statute — is this document's primary source
  and is fully self-documenting (see Source 1). A future version wishing to
  cite specific Tulumaksuseadus sections for individual deduction/income
  provisions (e.g. the training-expense or gift/donation reliefs this
  document models) should apply that same Wayback workaround.

## Field inventory (Phase 2)

All 27 `fields[]` entries and the one `documents[]` entry, and their exact
Vorm A page/section reference, are listed inline in `schema.json`'s own
`sourceRef` per field/document. Summary by section:

| Section | Representative fields | Modelled scope |
|---|---|---|
| Header | `taxYear` | Single collapsed value (see judgment call 1) |
| §1.1 Personal data | `firstName`, `surname`, `personalIdCode` | Full |
| §2 EEA resident provisions | — | Entirely out of scope (issue brief) |
| §3 Address | `residentialAddress`, `residenceCountry` | Full — form prints one free-text address line, not separate street/house boxes |
| §4 Contact | `contactPhone`, `contactMobilePhone`, `contactEmail` | Full |
| §5.1 Part I (withheld wages) | payer code/name, income type/amount, withheld tax, pension-investment flag | One representative payer row; Part II (tax not withheld) and §5.2-5.5 out of scope |
| §6 Property transfer gains | — | Entirely out of scope (issue brief) |
| §7 Basic-exemption-only income | — | Out of scope |
| §8 Foreign income | — | Entirely out of scope (issue brief) |
| §9.4 Gifts/donations | recipient name/registry code/country, amount | One representative entry |
| §9.6 Training expenses | trainee ID/name, institution country/name, paid amount | One representative entry |
| §9.1-9.3, 9.5, §10 | — | Out of scope |
| §11 Domestic refund account | account number, owner name, owner ID code | Full |
| §12 Foreign refund account, §13 overpayment election | — | Out of scope |
| §14 Confirmation | `declarationDate`, `documents[].signatureDeclaration` | Modelled; §14.2 (taxpayer's representative) out of scope |

Total: **27 fields** plus **1 `documents[]` entry** (the closing
attestation). No `crossFieldValidation` rules or `exclusivityGroups` are
modelled.

## Access notes and judgment calls

1. **`taxYear` collapses the form's own two-blank header
   ("...aasta kuni / year until ... aasta / year") into a single value.**
   The live form accommodates a taxable period shorter than a full calendar
   year (e.g. a taxpayer who arrived in or departed from Estonia mid-year)
   via two separate year blanks; this v1.0.0 models only the common
   full-calendar-year case as one integer, the same kind of collapsed
   representation `pl/mf/zeznanie-pit-37` used for its own split date boxes.
2. **Every table this document models is inherently repeatable on the live
   form** (§5.1 Part I: multiple payers; §9.4: multiple gift/donation
   recipients; §9.6: multiple trainees/institutions). This v1.0.0 bounds
   each to a single representative instance, consistent with this
   registry's established convention for repeating structures (e.g.
   `gb/companies-house/company-incorporation-in01`,
   `ph/bir/tin-application-corporations-partnerships`), pending a
   composite/repeating-value construct in the spec.
3. **`wagesIncomeType` is kept as a free string, not an enum.** The live
   form's "Tululiik / Income type" column is populated with a
   payer-assigned classification code from EMTA's own payroll-reporting
   system; that code list is not printed on the form's own pages and was
   not independently sourced this cycle, so this document captures the
   declared value rather than fabricating an enum.
4. **§5.1's office-only "Maksumäär … (märgib Maksu- ja Tolliamet)" (tax
   rate, entered by the Estonian Tax and Customs Board) column is
   excluded**, the same class of exclusion this registry applies elsewhere
   to clerk/office-only fields (e.g. `pl/mswia/wniosek-o-wydanie-dowodu-osobistego`'s
   "Adnotacje urzędowe" block).
5. **`refundBankAccountNumber` and its owner fields are optional, not
   required.** §11 only applies to a taxpayer who has an overpayment and
   elects a refund to a domestic account; a taxpayer with no overpayment,
   or who elects under §13 (out of scope for v1.0.0) to leave an
   overpayment against future liabilities, leaves this section blank. This
   document does not model a `requiredWhen` gate tying refund fields to an
   overpayment amount, since the arithmetic chain that would produce that
   amount (§5 income totals, §9 deduction totals) is itself out of scope.
6. **`personalIdCode` (isikukood) uses the generic 11-digit pattern
   `^[0-9]{11}$`**, matching the pattern this registry's other EE schemas
   already use (`ee/ppa/e-residency-application`,
   `ee/rik/private-limited-company-foundation`), rather than a stricter
   century-digit-aware pattern.
7. **§2 (EEA cross-border resident provisions), §6 (property-transfer
   gains, all six subsections), §8 (all foreign-sourced income, nine
   subsections), forestry income, and business-merger income are entirely
   out of scope for v1.0.0**, per the issue's explicit brief. §7
   (income counted only for the basic-exemption calculation), the
   remaining §9 deduction tables (unemployment insurance/mandatory funded
   pension, supplementary funded pension/PEPP, foreign social security,
   training-expense transfer to a spouse), §10, §12 (foreign refund
   account), §13 (overpayment-use election), and §14.2 (taxpayer's
   representative) are also out of scope, consistent with the "common
   wage-earner case only" framing.

## Test run (Phase 3)

No live submission was attempted: Estonia's income tax return is filed
either through the authenticated e-MTA self-service portal (requiring a
real trusted digital identity — ID-card, Mobile-ID, or Smart-ID) or on paper
by post/in person — submitting fabricated taxpayer data against Estonia's
live tax administration is not a safe or reversible action.

Instead, one fully hand-constructed mock record was built from this
document's own field inventory (an employed Tallinn resident filing
individually, one employer's withheld wages, a donation to a registered
charity, one paid training-expense claim, and a domestic refund account) and
validated with a purpose-written script (reused from a prior cycle's
`pl/mf/zeznanie-pit-37` review, `/tmp/validate_instance.mjs`) that compiles
`schema.json`'s own `fields[]` (`type`/`validation`/`required`) into a JSON
Schema draft 2020-12 document and checks it with `ajv`, plus a small
hand-rolled evaluator for `requiredWhen` leaf conditions (unused by this
document, since no field uses `requiredWhen`):

```
$ node validate_instance.mjs registry/ee/emta/income-tax-return-form-a/1.0.0/schema.json mock_vorm_a.json
Static (required/type/pattern/enum) validation: PASS
requiredWhen conditional validation: PASS

OVERALL: PASS
```

**Negative controls**, run against the same script to confirm it actually
catches violations rather than passing vacuously:

```
$ # personalIdCode shortened to "123" — violates the 11-digit pattern
Static (required/type/pattern/enum) validation: FAIL
 - must match pattern "^[0-9]{11}$"

$ # surname removed — violates required: true
Static (required/type/pattern/enum) validation: FAIL
 - must have required property 'surname'
```

Both meta-schema validators were run against the finished document and pass
clean:

```
$ node tools/validate.mjs registry/ee/emta/income-tax-return-form-a/1.0.0/schema.json
ok   registry/ee/emta/income-tax-return-form-a/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/ee/emta/income-tax-return-form-a/1.0.0/schema.json
ok   registry/ee/emta/income-tax-return-form-a/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).
```
