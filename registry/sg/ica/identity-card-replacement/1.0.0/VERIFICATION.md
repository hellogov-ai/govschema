# Verification record — `sg/ica/identity-card-replacement` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and states
the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-02`

The document was **derived from and cross-checked against** the official sources
below, but the full field-by-field comparison the practice requires
(`manual-source-review-v1` → Procedure step 2) has **not** been completed against
the live self-service e-Service itself, because that e-Service is Singpass-
authenticated (see "Why a paper form" below). It therefore remains `draft`, not
`verified`.

## Sources examined

- **Document `(id, version)`:** `sg/ica/identity-card-replacement` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Immigration & Checkpoints Authority (ICA), Singapore.
- **Primary source URL:** <https://www.ica.gov.sg/documents/ic/loss> — "Lost
  Identity Card" process page. Fetched live, 2026-07-02 (HTTP 200). Confirms:
  14-day report-and-replace window, no police report required, fees (S$100
  first loss / S$300 second-and-subsequent), payment methods (Visa,
  Mastercard, AMEX, Internet Direct Debit, PayNow), 7-working-day processing,
  3-month collection window, and the primary e-Service link
  (`eservices.ica.gov.sg/esvclandingpage/iconline`, Singpass-authenticated).
- **Official form:** "Application for Replacement of NRIC (Loss) Form", fetched
  directly as a real PDF (HTTP 200) from
  <https://www.ica.gov.sg/docs/default-source/ica/forms/application-for-replacement-of-nric-(loss)-form.pdf?sfvrsn=a9a4893d_0>
  — the same URL a live public FormSG proxy-reporting form instructs applicants
  to download, complete, and re-upload (see below), independently confirming
  this is ICA's current canonical replacement-application form.
- **Live public corroboration (FormSG):** ICA's own "Lost Identity Card" page
  links a "Proxy report lost and replacement of IC" form
  (`go.gov.sg/proxyic` → `form.gov.sg/6a14fd09d3a03b1a74dda45a`), a live,
  unauthenticated government form for those reporting *on behalf of* someone
  medically unable to self-report. Its public JSON API
  (`https://form.gov.sg/api/v3/forms/6a14fd09d3a03b1a74dda45a`, HTTP 200,
  fetched 2026-07-02) returns the form's exact field schema — Name, Mobile
  number, Email, "Name of IC holder", "IC number", "Location of the loss of
  the IC", "Date of Loss", "Description of the loss of IC", an attachment
  slot for the completed "Application for Replacement of NRIC (Loss) Form"
  PDF, a Doctor's memo attachment, an optional LPA/Deputyship attachment, and
  a four-option declaration checkbox — confirming both the PDF form's
  continued currency and that ICA still requires the same underlying PDF to
  be completed regardless of reporting channel. This proxy form's own
  applicant-facing fields (name/IC-of-holder, loss location, loss date, loss
  description) are **not** modelled in this schema, since this document is
  scoped to self-application (see "Scope" below).
- **Retrieved / reviewed:** 2026-07-02 (all sources confirmed live at
  authoring time).
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial authoring
  source review).

## Why a paper form, when the primary channel is online

Identical situation to `sg/ica/passport-application`: the primary self-service
channel (MyICA e-Service) is Singpass-authenticated and has no published
field-by-field specification reachable without a real Singpass login. The
official PDF replacement-application form is the only ICA-published,
independently inspectable, field-by-field specification of this process, and
its continued live use is independently corroborated by the public FormSG
proxy form above.

## How the PDF was decoded

The PDF is **not** a fillable AcroForm (`doc.getFieldObjects()` returned no
fields; `doc.getAnnotations()` returned zero annotations on every page) and its
content-stream text uses a custom glyph encoding with no recoverable Unicode
`Tj`/`TJ` string content (naive `zlib`-inflate-and-regex extraction, the
method used successfully on `sg/ica/passport-application`'s IMM(E)11, returned
only whitespace and hex-glyph runs here). Each of the form's first five pages
was instead **rendered to a raster image** (`pdfjs-dist` + `canvas`, scale
2.0) and read directly. Page 6 ("For official use only") was confirmed via
text extraction alone (that much *did* decode) to be an internal ICA
processing block, out of scope.

## What was directly observed vs. inferred

| Field(s) | Basis |
|---|---|
| `nricNumber`, `fullName`, `nameInChineseJawiTamil`, `nameInHanyuPinyin`, `alias`, `marriedName`, `address`, `sex`, `dateOfBirth`, `race`, `religion`, `dialectGroup`, `countryOrPlaceOfBirth`, `nationality`, `contactNumber`, `email` | **Directly observed**: transcribed from the rendered image of the official PDF form's Part I, "Particulars of Applicant" (page 1). |
| `declarationInformationTrue`, `consentPhotographReuse`, `declarationNoForeignCitizenship`, `acknowledgeNoRefundIfRecovered`, `declarationDate` | **Directly observed**: transcribed from the rendered image of Part II, "Declaration by Applicant" (page 2), split into one boolean per distinct declared statement plus a signature date, per this registry's convention (see `gb/co/register-to-vote`'s `declarationAddressConfirmed`/`declarationDate`). |
| `photo` | **Directly observed** photo box instruction ("Colour photo must be taken against white background, and taken within the last 3 months") on page 1, cross-checked against ICA's general Photo Guidelines page for exact pixel/format/size specs (same specs as `sg/ica/passport-application`'s `photo` field — ICA does not publish IC-specific photo specs separate from its general standard). |
| `reasonForNameChange` and the `changeOfParticularsSupportingDocument` document | **Directly observed** instruction box ("Please attach the following documents: ... Supporting documents for any change of particulars e.g. deed poll for a change in name"), modelled as a free-text reason plus a conditionally-required document rather than a guessed enum of change types, since the form does not enumerate them. |
| `paymentMethod` and the `replacementFee` document | **Directly observed** fee amounts and payment methods from the "Lost Identity Card" process page's "Fees" section (not from the PDF, which has a payment-details block for card details only — see "Modelling decision: no raw card fields" below). |
| `doctorMemoOrLpa` document | **Directly observed** instruction box ("Doctor Memo/ Lasting Power of Attorney (as required)") at the top of the PDF form, but its precise trigger condition is **not confirmed** for the self-application scope this document targets — the FormSG proxy form corroboration above suggests this note may apply primarily (or only) to the medical-incapacity proxy-reporting path, not an applicant reporting for themselves. Left as an unconditional optional document rather than guessing a `requiredWhen` condition; flagged here for a future reviewer with e-Service access to confirm. |

## Modelling decision: no raw payment-card fields

The PDF's "Payment Details" block (page 1) asks for "Name on Credit Card",
"Credit Card Number", "Credit Card expiry date", and "CVC" as free-text boxes.
Per this registry's established convention (see `sg/ica/passport-application`'s
`paymentMethod` field), GovSchema models **which** payment method is used, not
raw cardholder data — collecting a live PAN/CVC through a schema field would be
a payment-processing concern, not a form-structure concern, and is a
data-handling anti-pattern this registry deliberately avoids. `paymentMethod`
plus the `replacementFee` payment document capture the fee obligation and
accepted methods without modelling card-capture fields.

## Modelling decision: one document covers Part I + Part II of the paper form; the proxy/collection sections are out of scope

The PDF form contains four sections beyond the two modelled here:

1. **"Particulars of Requestor"** (top of page 1, before Part I) — a separate
   NRIC/Name/Contact block. Left unmodelled: for a self-reporting applicant
   this duplicates Part I; it is only functionally distinct when a third
   party is completing the form, which this document's scope excludes.
2. **"Authorisation to a Proxy to collect Identity Card"** (page 3) — a
   physical counter-collection delegation (name, NRIC, relationship, and
   thumbprints of both the applicant and an authorised collector). Excluded:
   this is a collection-logistics step, not an application-data field, and
   requires a physical thumbprint an online agent-driven schema cannot supply.
3. **Thumbprint boxes** (page 1, right/left thumbprint) — a biometric capture
   step performed at an ICA counter, not a value an agent submits through a
   form field.
4. **Proxy/medical-incapacity reporting** (the FormSG form referenced above,
   for someone unable to report in person or online) — a distinct
   channel/process with its own applicant-facing fields (reporter identity,
   loss location/date/description), not this document's self-application
   flow.
5. **Age-30/age-55 scheduled re-registration** — a distinct, ICA-notice-
   triggered process, catalogued separately as
   `sg/ica/identity-card-reregistration` (not yet authored).

Page 6 ("For official use only") is ICA's internal processing block and out
of scope by definition.

## Test run with mock data

Per this cycle's "complete a test run with valid example mock data"
instruction: the live self-service e-Service requires a genuine Singpass
login and therefore cannot be exercised with fabricated data (there is no
public test/sandbox mode, consistent with every other Singpass-gated flow in
this registry). A conformance packet
(`conformance/sg/ica/identity-card-replacement/1.0.0/application-packet.json`)
was instead assembled illustrating every field of this schema populated with
a fabricated mock applicant, following this registry's standard conformance-
packet convention for schemas whose live channel cannot be safely or publicly
test-submitted.

## Scope and jurisdiction notes

- **Whole of Singapore.** ICA's identity-card function is national; there is
  no subnational variation.
- **Singapore Citizens and Permanent Residents only**, consistent with NRIC
  eligibility generally.
- **Loss/damage replacement only.** Scheduled age-30/55 re-registration is a
  distinct document (`sg/ica/identity-card-reregistration`, not yet authored).
- **Self-application only.** Proxy/medical-incapacity reporting, and the
  physical-collection proxy-authorisation section, are out of scope (see
  above).

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer with Singpass access applies
`manual-source-review-v1` (Procedure step 2) field-by-field against the live
`eservices.ica.gov.sg/esvclandingpage/iconline` e-Service flow, confirms or
corrects every field transcribed from the PDF above (particularly the exact
input constraints, which the PDF's blank-line layout does not specify), and
resolves the `doctorMemoOrLpa` trigger-condition ambiguity noted above by
shipping a **new schema version** (immutability — VERSIONING §3, practice
Procedure step 5), then records the outcome here plus sets
`status: verified` with a current `verification.lastVerifiedAt`/
`nextReviewBy`.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01** (6 months).
Re-check the source on or before that date and on any `source.url` change.
