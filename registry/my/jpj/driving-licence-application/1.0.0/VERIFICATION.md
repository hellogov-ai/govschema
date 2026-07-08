# Verification record — `my/jpj/driving-licence-application` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-08`

This is **GOV-1774**: "GovSchema Standard Research" — opening **Malaysia as
GovSchema's 25th jurisdiction**. All 24 existing jurisdictions are already
covered at 5-6 of 6 verticals; this cycle screened new-jurisdiction candidates
instead of re-screening confirmed-saturated countries. Three candidates were
tested directly (fetched and, where a PDF, run through `pdfjs-dist`) before
picking JPJ's driving-licence application form (JPJ-L1).

## Candidate screening (Phase 1)

### 1. Switzerland (CH) — Visa — screened, confirmed duplicate risk

The State Secretariat for Migration (SEM)'s own visa-form page
(`https://www.sem.admin.ch/sem/en/home/themen/einreise/visumantragsformular.html`)
was fetched directly (HTTP 200, no login/CAPTCHA/WAF gate) and both PDFs it
links were downloaded and run through `pdfjs-dist`:

- The Schengen short-stay (Type C) uniform application form
  (`visumantrag-schen-en-de.pdf`, 267,213 bytes, 6 pages, 108 AcroForm
  widgets) is the EU/Schengen-harmonized uniform visa-application template —
  the same "Application for a Schengen visa" template every Schengen state
  uses verbatim, already covered by this registry's `fr/.../schengen-visa`
  schema. Modelling it again under Switzerland would be a duplicate, the same
  pattern already confirmed for Poland's and Spain's national visa forms
  against Germany's.
- The National (Type D) long-stay visa application form
  (`visumantrag-visumd-en-de.pdf`, 455,997 bytes, 3 pages, 71 AcroForm
  widgets) is also a near-identical field-for-field match to the EU-model
  national-visa-application template this registry has already found
  duplicated by Poland and Portugal against Germany's
  `de/auswaertiges-amt/national-visa-application` schema (same field
  ordering: surname/surname-at-birth/given names/DOB/POB/nationality,
  parental-authority block, travel-document details, occupation/employer,
  intended arrival, address in destination country).

Both Swiss visa forms carry real AcroForm field layers (unlike the other two
candidates below) and are genuinely reachable — but the duplicate-template
risk was judged decisive against pursuing Visa as Switzerland's (or any
new jurisdiction's) opening vertical here. Not pursued further; Switzerland
itself was not screened on any other vertical this cycle.

### 2. Malaysia (MY) — Business Formation — screened, rejected as too thin

SSM (Suruhanjaya Syarikat Malaysia, the Companies Commission of Malaysia)'s
own Companies Act 2016 s.14 "Superform" PDF
(`https://www.ssm.com.my/Pages/Legal_Framework/PDF%20Tab%202/incorp_superform.pdf`)
was fetched directly (HTTP 200, 77,137 bytes, no login/WAF gate). `pdfjs-dist`
confirms 0 AcroForm widget annotations across its 2 pages — it is a static
specimen printout of the fields collected by SSM's online MyCoID 2016
incorporation portal, not a fillable AcroForm. Its own text layer lists only
bare field labels (e.g. "Proposed company name", "Director Name", "Member
Name") with no field-by-field numbering or explanatory instructions of the
kind this registry's guide-document fallback precedent requires (cf. AEAT
Modelo 030/036's casilla-numbered guide, SII Formulario 22's línea-numbered
guide, CEIDG-1's own instrukcja). Rejected as too thin a source to model
responsibly; Malaysia's Business Formation vertical remains an open backlog
candidate (SSM's "Form A" sole-proprietorship/partnership registration form
was also searched for but no live, directly downloadable PDF was found this
cycle — only third-party summaries).

### 3. Malaysia (MY) — DMV — picked: JPJ's driving-licence application (JPJ-L1)

`https://www.jpj.gov.my/wp-content/uploads/2022/04/Borang-Permohonan-Lesen-Memandu-JPJ-L1.pdf`
— confirmed directly this cycle: a plain `curl` GET returns HTTP 200,
`content-type: application/pdf`, 62,730 bytes of real `%PDF-1.6` data, and
`last-modified: Fri, 22 Apr 2022` (a stable, unauthenticated, currently-served
file, not freshly regenerated per request). `pdfjs-dist`'s AcroForm
annotation layer confirms 0 widgets — this is not a fillable AcroForm — but
the document is itself a self-documenting field-by-field guide: its own page
2 ("PANDUAN MENGISI BORANG PERMOHONAN LESEN MEMANDU", filling instructions)
numbers and explains every one of page 1's items by section letter (A-D) and
item number, including two full code legends (the 21-code transaction-type
legend in Bahagian A, and the 7-code applicant-category legend in Bahagian
B.2) — the same guide-document source shape already used for AEAT Modelo
030/036, SII Formulario 22, and CEIDG-1 when no AcroForm PDF exists. This was
judged the strongest of the three candidates screened this cycle: genuine,
current, directly reachable with no login/CAPTCHA/WAF gate, and rich enough
(21 transaction-type codes, 4 lettered sections, a 6-item medical/court
declaration) to be worth modelling. Supporting JPJ service pages — "Driving
License Transaction Fee Rate"
(`https://www.jpj.gov.my/en/jpj-service-information/driving-license-transaction-fee-rate/`),
"International Driving Permit Application"
(`https://www.jpj.gov.my/en/jpj-service-information/international-driving-permit-application/`),
and "Learn to Drive License Application (LDL)"
(`https://www.jpj.gov.my/en/learn-to-drive-license-application-ldl/`) — were
also fetched directly (all HTTP 200, no login/CAPTCHA/WAF gate) to source the
`documents[]` fee and required-document entries.

Only one other Malaysian vertical was screened this cycle (Business
Formation, above); Malaysia's Passport, Visa, Taxes, and National ID
verticals were not screened and remain open backlog candidates for a future
cycle — see CATALOG.md's dated update paragraph and "Known Gaps" section.

## Field inventory (Phase 2)

29 `fields[]` entries and 4 `documents[]` entries, every one carrying a
`sourceRef` citing either JPJ-L1 page 1's own printed item label/number or
page 2's PANDUAN instruction text for that item, independently re-extracted
via `pdfjs-dist`'s text-content layer (not transcribed from memory or a
search-result snippet). Summary by step:

| Step | Fields | Source |
|---|---|---|
| A - Jenis Permohonan | `applicationType` | p.1 'A. JENIS PERMOHONAN'; p.2 PANDUAN 21-code legend |
| B - Butir-butir Pemohon | `applicantIdNumber`, `applicantCategory`, `fullName`, `address`, `postcode`, `city`, `state`, `gender`, `placeOfBirth`, `dateOfBirth` | p.1 items B.1-B.10; p.2 PANDUAN items 1-10 |
| C - Butir-butir Lesen | `licenseClassSought`, `licenseClassDatePassed`, `licenseClassSerial`, `originalLicenseCountryCode`, `foreignCountryName`, `existingLicenseSerialNumber`, `existingLicenseClass`, `licenseExpiryDate`, `applicationPeriod` | p.1 items C.1-C.5; p.2 PANDUAN items C.1-C.5 |
| D - Pengakuan | `courtConviction`, `epilepsy`, `physicalDisability`, `faintingOrBlackout`, `poorEyesight`, `otherDisease`, `otherDiseaseDetail`, `vehicleRegistrationNumber`, `declarationDate` | p.1 'D. PENGAKUAN', codes A-F + vehicle-registration line + declaration/date footer |

`documents[]`: `identificationDocument` (JPJ LDL service page, required
identification), `photograph` (JPJ-L1 p.2 note (iii) + LDL service page
photo spec), `statePaymentFee` (MYR 20, JPJ's own "Driving License
Transaction Fee Rate" page), `signedDeclaration` (JPJ-L1 p.1's own printed
oath text, verbatim).

## Access notes and judgment calls

1. **`applicationType`'s 21-value enum is a direct transcription of the
   form's own legend, not a simplification.** Unlike some prior single-
   purpose forms in this registry, JPJ-L1 is genuinely one form for 21
   distinct transaction types (new/renew/add-class/copy/convert, across
   three licence tiers — Learner's, Probationary, and full Driving — plus
   the International Driving Permit); every one of the 21 codes in Bahagian
   A's legend is modelled, none dropped.
2. **`licenseClassSought`/`licenseClassDatePassed`/`licenseClassSerial` are
   not `requiredWhen`-gated to a specific `applicationType` subset.** The
   form's own subheading ("Untuk Permohonan Lesen Memandu Baru, atau Tambah
   Kelas sahaja") uses "Lesen Memandu" ambiguously — it could mean the
   Driving Licence tier specifically, or "driving licence" as a generic
   umbrella covering the Learner's and Probationary tiers too, and the
   guide does not disambiguate. Rather than fabricate a precise code-list
   gate the source does not itself spell out unambiguously, this schema
   leaves these three fields optional and discloses the literal instruction
   text in each field's own `description` — the same reasoning
   `pt/imt/requerimento-carta-de-conducao` applied to
   `medicalRestrictionCodes`.
3. **`originalLicenseCountryCode` IS `requiredWhen`-gated (`license_conversion`,
   `probationary_license_conversion`), because this mapping is unambiguous.**
   The subheading reads "Untuk Pertukaran Lesen sahaja" (for Licence
   Conversion only), and exactly two of the 21 codes contain
   "Pertukaran"/"Tukar" in their own name (05 "TUKAR LESEN", 15
   "PERTUKARAN LESEN PERCUBAAN") — a clean, source-stated, code-name-level
   match, unlike judgment call 2.
4. **`existingLicenseSerialNumber`/`existingLicenseClass` ARE `requiredWhen`-
   gated to the 11 codes containing "SALINAN" (copy) or naming the
   International Driving Permit (04), because the subheading ("Untuk
   Permohonan Salinan atau Permit Memandu Antarabangsa sahaja") maps
   directly and completely onto those 11 codes with no ambiguity.**
5. **Section D's six declaration items (`courtConviction` through
   `otherDisease`) are gated with `visibleWhen`, not `requiredWhen`, and are
   never independently `required`.** The form itself only asks the
   applicant to mark a box "Jika YA" (if yes) — there is no source-stated
   obligation to mark every box "No"; a real declaration form of this kind
   is satisfied by marking only the boxes that apply. Modelling these as
   unconditionally `required: true` booleans would fabricate an obligation
   the source does not state. `visibleWhen` instead captures the form's own
   disclosed scope ("Untuk Permohonan Lesen Belajar Memandu Baru, Lesen
   Memandu Baru atau Tukar Lesen Sahaja" — codes 06, 00, 05 only).
6. **`applicantCategory`'s enum has gaps (0,1,2,3,7,8,9 — no 4,5,6), and
   `applicationType`'s numeric codes are non-contiguous — both transcribed
   exactly as the source legend states them, not renumbered or
   "completed."** A source that itself skips values is not a transcription
   error to silently correct.
7. **`state` (Negeri) carries no enumerated Malaysian-state list.** The
   guide's own instruction for this item is free-text ("Isikan negeri anda
   menetap sekarang" — fill in the state you currently reside in) with no
   printed code table, unlike `applicantCategory` or `gender`, which do
   carry printed legends. Left as a plain string rather than fabricating an
   enum the source does not itself provide.
8. **`postcode` and `applicantIdNumber` carry no `pattern` validation**,
   despite the guide's own worked IC-number example ("Contohnya:
   123456-10-0956"): this field is explicitly also used for passport,
   police, or armed-forces numbers of differing formats (per PANDUAN item
   1), so a single regex would wrongly reject the non-IC cases the same
   field is defined to accept. `postcode`'s guide instruction gives no
   worked example or digit-count at all.
9. **`statePaymentFee.amount` states only the New Learner's Licence (LDL)
   Class B/C citizen rate (MYR 20/3 months), the fee for the transaction
   this form is most commonly filed for.** JPJ's own "Driving License
   Transaction Fee Rate" page publishes a full table with fees ranging from
   MYR 2 (Class A/A1 LDL) to MYR 150 (International Driving Permit) varying
   by transaction type, licence class, validity period, and citizenship —
   disclosed here in full rather than asserted as this document's single
   `amount`, the same handling `pt/imt/requerimento-carta-de-conducao`
   applied to its own multi-tier fee uncertainty.
10. **No live submission was attempted.** Submitting this form in person or
    by post creates a real state fee liability and a real change to the
    applicant's legal driving-licence record — not a safe or reversible
    action to simulate against a live government process, consistent with
    this registry's standing discipline for every prior cycle's schema.

## Test run (Phase 3)

Two fully hand-constructed mock records were built from this document's own
field inventory (not committed to the registry; this registry's convention
keeps `registry/` to `schema.json` + `VERIFICATION.md` only):

1. A fictional applicant (Ahmad bin Ismail) filing a **new Class D driving
   licence** application (`applicationType: "new_driving_license"`),
   exercising the Section D declaration fields' `visibleWhen` applicability
   (all six marked `false`) and `declarationDate`'s unconditional
   requiredness.
2. A fictional applicant (Tan Mei Ling) filing an **International Driving
   Permit** application (`applicationType: "international_driving_permit"`),
   exercising the `placeOfBirth` `requiredWhen` branch (PMA-only) and the
   `existingLicenseSerialNumber`/`existingLicenseClass` `requiredWhen`
   branch (the copy-or-PMA code group).

Both were checked with a small ad hoc Node script (not committed) that
compiles `schema.json`'s own `required`/`requiredWhen`/`validation` rules
(the shared `Condition` grammar's `equals`/`in` leaves) and evaluates them
directly against each fixture:

```
$ node check.mjs registry/my/jpj/driving-licence-application/1.0.0/schema.json mock1.json
All required/requiredWhen/enum/pattern checks passed against mock1.json
$ node check.mjs registry/my/jpj/driving-licence-application/1.0.0/schema.json mock2.json
All required/requiredWhen/enum/pattern checks passed against mock2.json
```

**Negative controls** (each run against a variant of one of the two
fixtures, not committed as separate files), confirming the script actually
catches violations rather than passing vacuously:

- (a) `placeOfBirth` removed while `applicationType: "international_driving_permit"` — caught: `FIELD placeOfBirth: required but missing`.
- (b) `existingLicenseSerialNumber` removed under the same `applicationType` — caught: `FIELD existingLicenseSerialNumber: required but missing`.
- (c) `applicationType: "banana"` — caught: not in the 21-value enum.
- (d) `gender: "X"` — caught: not in the `["L","P"]` enum.
- (e) `otherDisease: true` added without `otherDiseaseDetail` — caught: `FIELD otherDiseaseDetail: required but missing`.
- (f) `physicalDisability: true` added without `vehicleRegistrationNumber` — caught: `FIELD vehicleRegistrationNumber: required but missing`.
- (g) `applicationType: "license_conversion"` with `originalLicenseCountryCode: "LLN"` but `foreignCountryName` missing — caught: `FIELD foreignCountryName: required but missing`.
- (h) `fullName` removed entirely — caught: `FIELD fullName: required but missing`.
- (i) `courtConviction: "no"` (a string, not a boolean) — caught: `FIELD courtConviction: expected boolean, got string`.
- (j) `documents.statePaymentFee` removed — caught: `DOCUMENT statePaymentFee: required but missing`.

All ten negative controls were correctly identified by the script.

Both meta-schema validators were run against the finished document and pass
clean:

```
$ node tools/validate.mjs registry/my/jpj/driving-licence-application/1.0.0/schema.json
ok   registry/my/jpj/driving-licence-application/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/my/jpj/driving-licence-application/1.0.0/schema.json
ok   registry/my/jpj/driving-licence-application/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

`node tools/verify-sources.mjs registry/my/jpj/driving-licence-application/1.0.0`
was also run against this finished document immediately before opening the
PR and reported no FAILs (see PR description for the run's output).
