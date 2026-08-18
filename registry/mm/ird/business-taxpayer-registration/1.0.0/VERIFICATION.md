# Verification — mm/ird/business-taxpayer-registration@1.0.0

## Issue

GOV-8326 ("GovSchema Standard Research" recurring research/authoring
cycle). Bash, node/npm, and git were all fully functional this cycle —
no outage. Target shortlist, in order: Myanmar, Chad, Yemen; fallback if
all three genuinely dead-end: Iraq's Passport vertical via a pre-supplied
Detroit-consulate PDF. Myanmar succeeded on this source, so Chad, Yemen,
and the Iraq fallback were not attempted.

## Source

**Primary source:** Application For Business Taxpayer Registration Form
/ အခွန်ထမ်းမှတ်ပုံတင်အမှတ် လျှောက်လွှာပုံစံ (form reference printed at
the foot of every page: ပတခ(ဝင)-၀၁-၀၁, i.e. "form 01-01")
- **Canonical URL used:** `https://www.ird.gov.mm/storage/forms/6a59bf1d67dd0-01-01.pdf`
- **Landing/context page:** `https://www.ird.gov.mm/forms/income-tax/registration`
  ("Forms" section, Internal Revenue Department)
- **Issuing authority per the document's own letterhead:** The
  Government of the Republic of the Union of Myanmar / Internal Revenue
  Department (IRD), under the Ministry of Planning and Finance.
- **Format:** PDF, 26 pages total (pages 1–6 are the applicant-facing
  form itself; pages 7–26 are the form's own "General Instructions" /
  "Specific Instructions" annex, including a large four-digit
  industry-classification reference table), bilingual (Burmese/English),
  print-and-fill (boxed table cells for text fields, tick-box checkboxes
  for the Type of Assessee list — not an interactive AcroForm).
- **Retrieval date:** 2026-08-17.
- **SHA-256 (fetched twice via `curl`, independently, on two separate
  requests — byte-identical both times):**
  `dabeae5294851e1e71e5a372069ad589a67144956883e42fd56d99440f5d8b74`
  (929,046 bytes, 26 pages).

Myanmar (`MM`) is a never-before-opened jurisdiction in this registry —
this schema opens it at 1 of 6 verticals (Business Formation, per this
registry's precedent of grouping tax-identification/registration forms
there — see `ar/afip/inscripcion-cuit-personas-fisicas` — rather than
under Taxes, since this form's function is assigning a TIN as a
precondition of lawful business operation, not filing an actual tax
return).

## Discovery path

WebSearch first surfaced Myanmar's Ministry of Immigration and Population
under its old `mip.gov.mm` domain (referenced in this registry's own
prior-cycle notes as a "known blocker"). Investigating that domain
directly: `curl`/DNS resolution for `www.mip.gov.mm` and `mip.gov.mm` both
failed outright (`Could not resolve host`) — a harder failure than a mere
timeout or maintenance page. The Wayback Machine's CDX index confirmed
`www.mip.gov.mm/visaonarrival/download/{EntryVisa,BusinessVisa,TransitVisa}.pdf`
were live (HTTP 200) as of a 2012-08-13 capture but 404 by a 2019-04-09
capture — i.e. this domain and its visa-on-arrival forms have been dead
for roughly seven years, not merely temporarily unreachable (contrast
this registry's Niger precedent, where the live domain itself still
resolved and served a maintenance page, and CDX digests confirmed the
same content unchanged and reachable up to ~3 months before that cycle).
Separately, the Ministry's current successor domain, `moip.gov.mm` (and
its `evisa.moip.gov.mm` e-visa subdomain), is fully live today but is an
Angular client-rendered single-page application exposing no static
form/field data in its own JS bundles (checked directly: no `.pdf`
references beyond an unrelated user-guide PDF, no API base URL visible in
the compiled bundle) — confirming the "known blocker" note. Given the
combination of a completely dead source domain and a live successor that
structurally cannot be extracted, the 2012 visa-on-arrival PDFs were
judged too stale and too disconnected from Myanmar's actual current
process to use as this cycle's primary source, even though a single
embassy/dead-domain PDF would otherwise be an acceptable source per this
issue's own instructions.

Continuing to search within Myanmar (per this issue's stated preference
for a genuinely live source over moving on to Chad/Yemen) before
abandoning the jurisdiction, `www.ird.gov.mm` (Internal Revenue
Department) was found fully live (HTTP 200) with a public "Forms"
section (`https://www.ird.gov.mm/forms/income-tax/registration`) listing
six downloadable PDFs. Of those six, `6a59bf1d67dd0-01-01.pdf` ("form
01-01") is the broadest-scope, applicant-facing "Application For
Business Taxpayer Registration Form" — bilingual, explicitly captioned
"To be used by all entities and sole traders. This form must be filed by
the owner of the business or an officer authorized by the business to
sign this form." The other five PDFs on the same page (a TIN-certificate
template, an outbound reminder-notice letter, and others) were screened
and set aside as not being applicant-facing input forms — strong backup
leads for a future cycle (see "Backup leads" below).

## Technique: pdfjs-dist text-layer extraction + Read-tool visual cross-check

`pdfjs-dist` (`legacy/build/pdf.js`) reported **0** `getFieldObjects()`
keys and **0** page annotations across all 26 pages — confirming this is
a flat print-and-fill template, not an interactive AcroForm — but a
**full, clean, machine-extractable text layer** on every page (398–449
text items per page), unlike the flat *scanned/image* PDFs this registry
has handled elsewhere (e.g. `iq/moi/entry-visa-application`), which had
**zero** extractable text items. Because pdfjs-dist's linear text-item
join does not preserve this particular document's own multi-column table
layout (address blocks split across House no./Street/Quarter/Township/
State-Region columns, and Branch no. 1/Branch no. 2 side-by-side
columns), the first six pages (the applicant-facing form itself) were
each split into standalone single-page PDFs via `pdf-lib` and rendered
individually through the Read tool's native multimodal PDF rendering
(the source's own multi-page PDF could not be rendered page-by-page
directly, since this environment lacks `poppler-utils`/`pdftoppm`,
required by the harness's default multi-page PDF renderer; splitting
first with `pdf-lib` worked around this). Both extraction methods were
cross-checked against each other and found consistent: every field label,
tick-box option, and table structure visible in the rendered page images
matches a corresponding text-layer string.

## Field documentation

Pages 1–6 (`Page 1` through `Page 6` printed in each page's own header)
contain the applicant-facing form itself — 14 numbered items plus a
closing declaration/signature block:

1. **Legally registered name** — one field (the source form captions this
   single blank cell with both a Burmese-language label above and an
   English-language restatement below, not two separate blanks).
2. **Type of main Business** — free text, same single-cell/bilingual-label
   pattern as item 1.
3. **Type of Assessee (tick box)** — fifteen mutually exclusive tick-box
   options (Sole proprietor, Association, Myanmar Company (Private),
   Myanmar Company (Public), Foreign Company, Joint Venture (JV),
   Partnership, Foreign Branch Company, Non-resident Foreigner,
   Co-operative, State Economic Enterprise, NGO/Charity, Trust, Deceased's
   estate, Other) — modeled as a single `enum` field
   (`typeOfAssessee`), each option a snake_case enum value, plus a
   conditional `typeOfAssesseeOtherSpecify` free-text field
   (`requiredWhen` equals `"other"`). This item is paired with a
   required `assesseeEstablishingDocument` attachment (certificate of
   incorporation / partnership agreement / memorandum & articles or
   constitution / trust deed / death certificate / MIC-SEZ permit copies,
   as applicable).
4. **Industry code** (`industryCode`) — a four-digit code selected from
   the form's own fixed annex (an ISIC-derived classification table
   spanning most of pages 8 through roughly 24); that reference table
   itself is not modeled field-by-field, since it is fixed lookup data,
   not applicant input — disclosed in the field's own `description`.
5. **Registration number and date** — split into `registrationNumber`
   (optional, since the form's own parenthetical notes this number is
   "issued by DICA or relevant department," i.e. may not yet exist for a
   first-time filer) and a conditionally-required `registrationDate`.
6. **Date of commencement of operation** — required.
7. **Business contact details** — a 5-component address (House no./
   Street/Quarter/Township/State-Region, `businessContact*`) plus office
   phone, fax (optional), contact email (optional), website (optional).
8. **Business details — branches** — a 2-column table (Branch no. 1 /
   Branch no. 2), each with name/address/date-opened, modeled as
   `branch1*`/`branch2*` field pairs following this registry's numbered
   repeatable-field convention, all optional (attach a separate list if
   more than two branches — modeled as the `branchListAttachment`
   document).
9. **Non-resident foreigner country of residency** — conditionally
   required when `typeOfAssessee` is `non_resident_foreigner`.
10. **Owner of business contact details** — explicitly captioned on the
    source form "(sole proprietors only)"; every `owner*` field is
    modeled `requiredWhen typeOfAssessee equals "sole_proprietor"`.
11. **Tax accountant or tax advisor details** — all `advisor*` fields
    optional (not every filer retains one).
12. **Authorized agent or representative** — a `agentSameAsAdvisor`
    boolean tick-box that, per the form's own instruction, lets the
    filer skip the rest of item 12 when the agent is the same person
    already given in item 11; every `agent*` detail field beyond the
    name is optional, with `agentName` itself `requiredWhen
    agentSameAsAdvisor equals false`.
13. **Bank account details** — a 2-column table (First Account / Second
    Account), `bankAccount1*`/`bankAccount2*`, all optional (attach a
    separate list if more than two accounts — the
    `bankAccountListAttachment` document).
14. **Company financial details** — explicitly captioned "skip lines 14a
    and 14b if you are a sole proprietor"; `authorizedCapitalShares`/
    `authorizedCapitalValue`/`paidUpCapitalShares`/`paidUpCapitalValue`
    are each `requiredWhen typeOfAssessee notEquals "sole_proprietor"`.
    `currentNumberOfEmployees` is **not** covered by that skip
    instruction (a sole proprietorship can still have employees) and is
    modeled required for every filer.
15. **Declaration of Taxpayer or Representative or Agent** — modeled as
    the `declarationSignature` document entry (required, quoting the
    form's own declaration text verbatim as its `statement`), plus two
    conditional-in-practice fields, `declarantFullName` and
    `declarantTitle`, for the case where the signer is acting on behalf
    of an association of persons, a Government Organization, or a
    legally incapacitated person, per the form's own printed instruction.

**Excluded from `fields[]`:** none of pages 1–6 is office-use-only; every
cell on the applicant-facing portion of this form is filled in by the
applicant/filer, not an issuing officer (unlike, e.g., the Iraq visa
form's office-use header block). Pages 7–26 (instructions and the
industry-code annex) are disclosed as a fixed reference table, not
separately modeled.

## sourceRef verification

Every `sourceRef` in `schema.json` was checked against both extraction
methods: (1) the pdfjs-dist text layer for each of pages 1–6, and (2) six
individually-rendered page images (produced by splitting the source PDF
with `pdf-lib` and reading each single-page PDF through the Read tool's
native rendering, since this environment's Read tool cannot render
multi-page PDFs page-by-page without `poppler-utils`). Both methods
independently confirmed the same field labels, tick-box option list, and
5-column address structure; no discrepancy was found between them.

## Mock instance validation

`MOCK_INSTANCE.md` contains one fully-populated realistic mock instance
(a Myanmar Company (Private) with two branches, invented name/TIN/
address/bank data, no real PII) plus one minimal instance for a sole
proprietor covering only the fields modeled `required: true` (with
`typeOfAssessee: "sole_proprietor"`, correctly triggering the `owner*`
`requiredWhen` fields as required and the `authorizedCapital*`/
`paidUpCapital*` fields as *not* required, per item 14's own skip
instruction). Both were validated with an ad hoc ajv script built from
this document's own `fields[]`/`type`/`validation`/`requiredWhen` — see
"Pipeline results" below.

## Pipeline results

1. `node tools/validate.mjs registry/mm/ird/business-taxpayer-registration/1.0.0/schema.json` — **ok**, 1/1 passed.
2. `cd tools && npm ci --include=dev && node validate-ajv.mjs ../registry/mm/ird/business-taxpayer-registration/1.0.0/schema.json` (also runnable from repo root as `node tools/validate-ajv.mjs registry/mm/ird/business-taxpayer-registration/1.0.0/schema.json`) — **ok**, 1/1 validated against the v0.3 meta-schema (ajv 2020-12).
3. `node tools/verify-sources.mjs registry/mm/ird/business-taxpayer-registration` — **0 FAIL** (see exact output in the commit).
4. Ad hoc ajv validation of both `MOCK_INSTANCE.md` example instances against `schema.json`'s own field/type/validation/requiredWhen rules — **both pass**.
5. `CATALOG.md` updated (178 → 179 jurisdictions; Myanmar added).
6. `tools/govschema-client/registry-index.json` rebuilt via `npm run build-index`.

## Status and next steps

`status: verified`, `maturity.level: verified-schema`
(`structuralReference: true`, `verifiedSchema: true`,
`agentReadySchema: false`, `executionTestedSchema: false`). No field on
this form carries an individual asterisk/shading marker beyond its own
structural context (item captions like "(sole proprietors only)" and
"skip lines 14a and 14b if you are a sole proprietor"); `required` values
for fields without such an explicit source-level marker are a disclosed
best-effort judgment based on the form's own structural conditionals,
consistent with this registry's established practice on comparable
registration forms (e.g. `ne/dgi/annual-non-salary-income-declaration`).

## Backup leads still open on this same site

- `https://www.ird.gov.mm/storage/forms/6a59bf742302e-01-01-a.pdf` — a
  10-page companion form (form 01-01-a) on the same registration page,
  not yet screened for content/purpose.
- `https://www.ird.gov.mm/storage/forms/6a59bf8c653bf-01-02.pdf` — form
  01-02, a Taxpayer Identification Number (TIN) certificate template
  (officer-issued output confirming a TIN assignment, not an
  applicant-facing input form — screened and set aside this cycle).
- `https://www.ird.gov.mm/storage/forms/6a59bfa581209-01-03.pdf` — form
  01-03 (3 pages), not yet screened for content/purpose.
- `https://www.ird.gov.mm/storage/forms/6a59bfe8739fa-01-04.pdf` — form
  01-04, a Burmese-only outbound reminder-notice letter urging companies
  to register (not an applicant-facing input form — screened and set
  aside this cycle).
- `https://www.ird.gov.mm/storage/forms/681c612d5067c-Wanga%2016(a)_0_0.pdf`
  — "Wanga 16(a)" form, not yet screened.
- `www.ird.gov.mm/forms/` has at least a dozen further categories beyond
  `income-tax/registration` (aungbarlay-tax, capital-gains-tax,
  commercial-tax, income-tax/{assessment,audit,certificate,credit,
  filling,payment,recovery,refund,review}, specific-goods-tax,
  general/audit) — strong candidates for Myanmar's Taxes vertical (2/6)
  in a future cycle. Its live sibling services `eregistration.ird.gov.mm`,
  `efiling.ird.gov.mm`, `onlinepayment.ird.gov.mm`, and `paye.ird.gov.mm`
  are also worth checking for a genuine, non-login-gated field list.
- Myanmar's other confirmed-live `.gov.mm` domains this cycle —
  `customs.gov.mm` (Customs Department; not yet screened for downloadable
  forms) — are candidates for Myanmar's remaining verticals (DMV,
  Passport, Visa, National ID & Civic Documents).
- `dica.gov.mm` (Directorate of Investment and Company Administration,
  the body item 5 of this very form references for its own
  `registrationNumber`) timed out this cycle rather than confirming dead
  or live; worth retrying, since it is the most natural next-cycle source
  for a *second* Business Formation schema (company incorporation itself,
  as opposed to this form's TIN-registration function).
- `moha.gov.mm` (Ministry of Home Affairs, for national registration
  card/NRC — National ID & Civic Documents) and `president-office.gov.mm`
  both timed out this cycle; not confirmed dead, just unreachable within
  this cycle's timeout budget.

## Other candidates on the GOV-8326 shortlist (not attempted)

Myanmar succeeded on this source, so Chad, Yemen, and the Iraq Passport
fallback were not investigated this cycle.
