# Verification — `eg/eta/small-enterprise-tax-declaration` v1.0.0

## Why this candidate

The recurring "GovSchema Standard Research" routine (this cycle, GOV-3447)
re-scanned the registry's own `CATALOG.md` for disclosed, well-sourced
backlog before scouting a fresh jurisdiction. All four candidates the
issue's own notes named as focus areas (DE Steuer-ID, SG NRIC loss/damage
replacement + re-registration, NZ RealMe, and voter registration generally)
turned out to already be published — `de/finanzamt/tax-identification-number`,
`sg/ica/identity-card-replacement` + `sg/ica/identity-card-reregistration`,
`nz/dia/realme-verified-identity`, and voter-registration schemas across 15
jurisdictions already in the registry. With no in-registry gap open, the
next disclosed backlog item was Egypt's Taxes vertical: the GOV-3410 cycle
(2026-07-16) had screened Egypt as a new-jurisdiction candidate and found
four of five verticals dead (Visa: reCAPTCHA-gated account creation on
`visa2egypt.gov.eg`; Business Formation: `portal.gafi.gov.eg` redirects
straight to a login-gated account portal; DMV: `traffic.moi.gov.eg` returns
a WAF block page; Passport: `emoves.moi.gov.eg` unreachable), but explicitly
flagged Taxes (`eta.gov.eg`) as **"inconclusive, not a hard dead end"** —
unauthenticated employer/withholding-agent payroll forms existed, but the
individual/self-employed return ("Form 25") itself had not been located as
a standalone downloadable specimen, with an explicit note to search again
before writing Egypt off entirely. This cycle did that targeted search.

## Sources examined

### Primary source

- **Authority:** Egyptian Tax Authority (ETA), `https://www.eta.gov.eg/`.
- **Document — Form No. 25 ("Declarations"), "Tax Declaration on Annual
  Business Volume for Small and Micro Enterprises."**
  - **Landing page (directly retrieved, HTTP 200, plain unauthenticated
    fetch):** `https://www.eta.gov.eg/ar/content/nmadhj-almshrwat-alsghyrt`
    ("Small Projects Forms" page), whose first listed document is "إقرار
    المشروعات الصغيرة" ("Small Enterprise Declaration") — confirmed by
    independent re-fetch to be the correct link.
  - **URL (directly retrieved, HTTP 200, plain unauthenticated curl with a
    standard desktop User-Agent):**
    `https://www.eta.gov.eg/sites/default/files/2022-02/إقرار%20المشروعات%20الصغيرة.pdf`
  - **File identity:** genuine PDF (`%PDF-1.4` header), 207,394 bytes,
    `sha256:e7ee3d918cac9e224bab3b0f85e9839c6503ef5e4770e2326f5cfbbdce657032`,
    2 pages. The document's own printed header reads "نموذج رقم (25)
    إقرارات" ("Form No. 25 (Declarations)"), confirming this is the exact
    form the GOV-3410 cycle's secondary-source search (an AI-search summary
    describing "نموذج رقم (25) إقرارات" as the form small/micro enterprises
    file under SME Law 152/2020) had described but not located a direct
    link for.
  - **Legal basis, cross-checked:** the form's own printed text cites
    Article 95 of SME Development Law No. 152 of 2020 (declaring this
    return "constitutes an assessment of the tax"), and states it is filed
    under that same law's implementing framework. Independently
    corroborated by ETA's own e-services filing-navigation guide (below)
    and secondary reporting (Youm7, 2022-03-27, "ضوابط تقديم الإقرار
    الضريبى للمشروعات الصغيرة والتسهيلات الممنوحة") describing the same
    filing regime and its Prime Ministerial Executive Regulations (Decree
    No. 654 of 2021).
  - **Form type — disclosed limitation:** unlike the AcroForm PDFs this
    registry has extracted from Cambodia's `tax.gov.kh`, this is a
    static/print-layout PDF with no fillable form widgets at all (no
    `/AcroForm`, no `/Widget` annotations, confirmed by a direct byte-level
    scan). Field boxes are visual table cells identified by printed
    reference numbers — 01–09 on page 2's main declaration block, 021–024
    on its "important reference data" block (بيانات استرشادية هامة), and
    025/030/065/085 on its tax-computation/payment block — rather than
    named, extractable form fields.
  - **Extraction method:** `pdfjs-dist@5` (installed standalone in a
    scratch directory for extraction only, not added as a repository
    dependency). Per-page `getTextContent()` output was re-sorted by
    y-then-x position (grouping items into visual lines by y-proximity)
    to reconstruct reading order, since this RTL-typeset document's raw
    content-stream text order does not match its visual reading order.
  - **Rendering attempt — disclosed limitation:** additionally attempted to
    render each page to a PNG via `pdfjs-dist` + `node-canvas`, intending a
    pixel-level visual check of each numbered box against its label. The
    render pipeline itself was confirmed working (a minimal `node-canvas`
    smoke test — fill a rect, encode, decode, confirm non-white pixels —
    succeeded), and `page.getOperatorList()` confirmed 1,723 real drawing
    operators exist on page 1, but `page.render()` against that same
    operator list produced a fully blank (100% white) canvas in this
    sandboxed environment, with no thrown error. This is disclosed as a
    tooling gap specific to this PDF/`pdfjs-dist` render path, not a claim
    that the form has no visual content. Field semantics in this schema are
    therefore derived from the position-sorted text layer plus the
    corroborating secondary sources below, not a pixel-confirmed visual
    read — flagged here rather than silently presented as visually
    verified.

### Corroborating secondary sources

- **ETA's own e-services filing-navigation guide** (retrieved directly,
  HTTP 200):
  `https://eservice.incometax.gov.eg/ETax/UserGuids/DownloadInstructionSmallProjects`
  — a 7-page walkthrough of registering an e-services account and reaching
  "Form 25" from the taxpayer's own account. Confirms: the natural-person
  vs. legal-person (طبيعي / إعتباري) taxpayer-nature distinction modelled by
  this schema's `taxpayerNature` field; the April 1 (natural person) /
  within-four-months-of-period-end (legal person) filing deadlines cited in
  this schema's description; and that the declaration is reached by
  selecting "Form 25" ("...قانون المشروعات وأختيار إقرار 25...") once the
  taxpayer's account is updated to reflect SME-law eligibility.
- **Comprehensive Health Insurance Authority's own public guide** on the
  "solidarity contribution" (المساهمة التكافلية), `uhia.gov.eg` — confirms
  the 2.5-per-thousand-of-revenue rate printed on Form 25 itself and its
  worked example (EGP 10 million revenue → EGP 25,000 contribution),
  cross-validating this schema's `agreesSolidarityContribution` field
  description.
- **ETA's own "Small Projects Forms" listing page** (same page as the
  primary source above) — independently confirms the existence of two
  further, separate dedicated ETA payment forms: "نموذج سداد الضريبة علي
  توزيعات الأرباح" (dividend-tax payment form) and "نموذج سداد الأرباح
  الرأسمالية" (capital-gains payment form), matching Form 25's own printed
  footnotes under its profit-distribution and capital-gains disclosure
  questions (page 2, boxes 07/08) that direct filers to pay any resulting
  tax "on the form prepared for that purpose" rather than on this return.
  These two payment forms are out of scope for this schema.

## Scope and disclosed boundaries

This schema models Form 25 in full: page 1's mandatory taxpayer
identification, business address, contact details, and tax period; and
page 2's declaration data (total business volume; the solidarity-
contribution and Comprehensive-Health-Insurance-payment opt-ins;
profit-distribution and capital-gains disclosure questions; reference data
supporting the applicable business-volume bracket; the resulting tax-due
computation net of any prior-year credit; payment method, reference, and
date; and the declarant's signature block).

Explicitly out of scope, and disclosed rather than silently omitted:

- **The two separate dedicated payment forms** referenced by Form 25's own
  footnotes (dividend-tax payment, capital-gains payment) — this schema
  models only the disclosure questions (`hasProfitDistributions`,
  `hasCapitalGainsMachineryEquipment`), not the payment forms themselves.
- **Page 1's staff-only annotation block** ("مراجعة" / review, "تاريخ
  المراجعة" / review date, "رقم الوارد" / incoming number) — office
  annotation, not applicant input, excluded from `fields[]`, consistent
  with equivalent staff-only blocks excluded elsewhere in this registry.
- **Egypt's other four verticals** (DMV, Passport, Visa, Business
  Formation) — re-confirmed weak/dead in the GOV-3410 cycle; not
  re-screened this cycle. National ID was not screened in either cycle and
  remains open, unscreened backlog.

### Modelling decisions worth disclosing

- **`legalEntityForm` (box 022, "الكيان القانوني") is modelled as free
  text, not an enumerated list.** The source form's own printed box gives
  no visible option list, and no corroborating source confirmed an
  authoritative enumeration — fabricating specific enum values here would
  violate this schema's own precision-over-cleverness standard, so free
  text was used instead and the limitation disclosed here.
- **`businessGovernorate`/`businessDistrict`/`businessDepartmentOrCenter`/
  `businessStreetOrVillage` are modelled as free text**, not a bounded
  governorate enum, despite Egypt having a fixed, known list of 27
  governorates — consistent with this registry's general practice of using
  free text for administrative-division fields sourced from a form that
  itself provides an open write-in box rather than a picklist.
  `businessBuildingNumber` is modelled as `string` rather than `integer`
  since Egyptian building references are commonly alphanumeric (e.g. "12A").
- **`nationalId` is required unconditionally**, with its description
  noting that for a legal-person filer this is the legal representative's
  number rather than the enterprise's own number — the source form has a
  single "الرقم القومي" box regardless of `taxpayerNature`, with no
  separate box for an entity-level identifier on this particular form.
- **`declarantType` (taxpayer vs. authorized_agent) is introduced as a
  discriminator field** not literally printed as a labelled box on the
  form, to precisely gate `agentRegistrationNumber`'s `requiredWhen` — the
  form's own label reads "أسم الممول / الوكيل" ("Name of taxpayer / agent")
  over a single name field, implying exactly this binary without spelling
  it out as a separate selectable field.
- **`agreesHealthInsurancePaymentWithReturn`'s `requiredWhen` is gated on
  `agreesSolidarityContribution` equals `true`** (not `notEquals false`),
  following this registry's own established practice of avoiding a
  `notEquals` gate against an optional boolean — see this registry's
  internal engineering notes on that category of bug.
- **`mobilePhone` uses an Egyptian mobile-prefix pattern
  (`^01[0-9]{9}$`)** — Egyptian mobile numbers are 11 digits starting with
  01 (followed by a carrier-prefix digit: 0/1/2/5) — rather than a generic
  digit-count pattern, since the number format is well-established and
  independently verifiable.

## Conformance fixtures

Fixtures are committed under
`conformance/eg/eta/small-enterprise-tax-declaration/1.0.0/`: two valid
submissions (a minimal natural-person filing with electronic payment and no
solidarity-contribution opt-in; a fuller legal-person filing via an
authorized agent, with the solidarity contribution, health-insurance
payment opt-in, a prior-year credit, and deposit payment) plus twelve
mutation-control fixtures, one per `required`/`requiredWhen`/`validation`
rule exercised: one missing unconditionally-required field
(`taxpayerName`); four `requiredWhen`-gated missing fields (health-insurance
consent, deposit bank name, agent registration number, legal representative
name); three invalid patterns (national ID, mobile phone, tax registration
number); one below-minimum year; one negative amount; and two invalid enum
values (business-volume bracket, payment method). All fourteen fixtures (12
mutation + 2 valid) were checked with a from-scratch, throwaway Node mock validator
implementing this schema's own `required`/`requiredWhen`/`validation`
rules (not committed — consistent with this registry's established
per-cycle practice of writing an independent validator rather than reusing
the authoring script): 14/14 fixtures behaved as expected. Both
`tools/validate.mjs` and `tools/validate-ajv.mjs` pass across the full
registry with this schema added (524/524); `tools/verify-sources.mjs`,
scoped to this schema's directory, reports all 4 cited URLs clear.

## Known gaps

- Egypt's Business Formation, DMV, Passport, and Visa verticals remain
  re-confirmed weak/dead per the GOV-3410 cycle. National ID was not
  screened in either cycle and is open, unscreened backlog for a future
  cycle.
- The two dedicated dividend-tax and capital-gains payment forms Form 25's
  own footnotes reference remain open, unscreened backlog for future
  companion schemas.
- This schema's field semantics rest on a position-sorted text extraction
  and corroborating secondary sources rather than a pixel-level visual
  confirmation of the source PDF's layout (see "Rendering attempt" above) —
  worth a follow-up visual re-check in a future cycle with a working
  render path, particularly for the exact box-022/`legalEntityForm` option
  set.

## Verification method assessment

`manual-source-review-v1` — a human/agent read the primary source directly
and transcribed its fields, corroborated against three independent
secondary sources where the primary source's own reading order was
ambiguous. No automated re-verification tooling exists yet for this
schema; `nextReviewBy` is set 6 months out per the practice's default
cadence.
