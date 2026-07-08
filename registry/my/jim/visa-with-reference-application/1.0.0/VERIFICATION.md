# Verification record — `my/jim/visa-with-reference-application` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-08`

This is **GOV-1789**: "GovSchema Standard Research" — authoring **Malaysia's
3rd vertical (Visa)**, following GOV-1783's Passport vertical
(`my/jim/passport-travel-document-application`) and GOV-1774's opening of
Malaysia as the registry's 25th jurisdiction (via DMV,
`my/jpj/driving-licence-application`). This cycle's target and primary
source were identified and live-confirmed by the orchestrating agent before
authoring began; this document records this agent's own independent
re-verification of every claim before publishing.

## Candidate screening (already performed; summarized here, not redone)

- **Malaysia eVISA** (`malaysiavisa.imi.gov.my`) — an Angular SPA
  (`data-critters-container` prerender shell); `/evisa/apply/vdr/personal-detail`
  serves only the app shell and requires an authenticated session/token to
  reach any real field screen. Login-gated; rejected.
- **Malaysia eNTRI** (`windowmalaysia.my`) — requires account registration
  before any field is visible. Rejected.
- **JIM's legacy `portal2017/images/borang/` subsite** — the current
  (2026-07-08) "Forms Download" page (`https://www.imi.gov.my/index.php/en/forms-download/`)
  still links to several PDFs under this path (e.g. a general "Borang
  Permohonan Visa.pdf"), but every one of these specific URLs 404s/500s on
  direct fetch, and the Wayback CDX API shows them returning HTTP 404 in
  every snapshot since 2022-08 — a stale link on an otherwise-live page, not
  a genuine current source. Nothing under `portal2017/` is cited by this
  schema.
- **Spain Passport** (Policía Nacional/DNI channel, `sede.policia.gob.es`) —
  re-confirmed still in-person/appointment-only, physical presence required
  by regulation, no downloadable field-level form. Consistent with multiple
  prior CATALOG.md cycles; still a dead end, not re-attempted.
- **Chile Passport/Visa/National ID** — all re-confirmed dead ends in
  immediately preceding cycles (CATALOG.md entries for GOV-1624/GOV-1638/
  GOV-1645): CAPTCHA-gated, DNS-non-resolving, or ClaveÚnica-login-gated
  with no PDF fallback. Not re-attempted.

## The picked source — re-verified independently this cycle

**Form IM.12 "Borang Permohonan Pas Lawatan" (Visit Pass Application Form),
Pin. 1/97**, live at
`https://www.imi.gov.my/wp-content/uploads/2022/06/Borang-Permohonan-Pas-Lawatan.pdf`.

Re-fetched fresh, live, immediately before authoring (not reused from an
earlier session):

```
$ curl -s -o im12.pdf -w "HTTP %{http_code} size %{size_download}\n" \
    https://www.imi.gov.my/wp-content/uploads/2022/06/Borang-Permohonan-Pas-Lawatan.pdf
HTTP 200 size 770958
$ sha256sum im12.pdf
980f9790b8d458f1010de4dad6bbd90b1ab020460fc993ad78ec814b200ff82d  im12.pdf
```

770,958 bytes, sha256 `980f9790b8d458f1010de4dad6bbd90b1ab020460fc993ad78ec814b200ff82d`
— confirmed byte-identical to a repeat fetch performed later in the same
session.

**Widget/AcroForm inspection** (own re-run, not taken on faith): the raw PDF
bytes contain zero `/Widget` matches and zero `/FT` (field-type) matches —

```
Widget count: 0
/FT count: 0
```

— confirming this is not an interactively-fillable AcroForm, despite an
`/AcroForm` dictionary and a `/Fields[559 0 R]` tree existing in the PDF (that
tree's leaf objects carry only generic `/T` name keys and `/Kids`, no
`/Widget` annotation subtype and no `/FT`, so no actual fillable field exists
— this matches the print-layout-container pattern this registry has already
documented for `my/jim/passport-travel-document-application`'s IM.42 and
`my/jpj/driving-licence-application`'s JPJ-L1).

**XFA template extraction** (own re-run of this project's documented
technique, not the prior cycle's output taken on faith): the PDF's `/XFA`
array is `[(preamble)698 0 R(config)699 0 R(template)700 0 R(PDFSecurity)701 0 R(datasets)702 0 R(postamble)703 0 R]`.
Located `700 0 obj` directly in the raw bytes, isolated its
`stream`...`endstream` payload, and ran `zlib.inflateSync()` (Python
`zlib.decompress`) on just that one stream — this produced a 76,943-byte
XFA `<template>` XML document (declared `/Length 17546` compressed), whose
root element is an `xfa-template/2.2`-namespaced `<template>` node, and whose
embedded comment confirms `Creator=PScript5.dll`/imported-PDF metadata
consistent with the Adobe Designer authoring tool. The template's
`<field>` elements (27 total, matching the 27 leaf objects under
`559 0 obj`'s `/Kids` tree) all carry generic coordinate-only names
(`TextField1`, `TextField2` ×26, `txtName` ×1) with **no caption text** —
the printed labels live in sibling `<draw>` elements' `<text>`/`<exData>`
nodes, not in the fields themselves. This is the same shape this registry's
prior IM.42 cycle documented and disclosed.

## Field inventory — re-extracted and coordinate-sorted (own re-run)

Every `<draw>` node's text was extracted together with its `x`/`y`
coordinate (converting `in`/`mm` units to a common `mm` scale) and sorted by
`y` then `x`, giving a clean top-to-bottom, left-to-right reading order that
was cross-checked against the form's own printed section/item numbering.
This reproduces (and independently confirms) every phrase in the printed
form used for this schema's `label`/`description`/`sourceRef` text:

- Header: `JABATAN IMIGRESEN MALAYSI` / `A` (line wraps across draw nodes),
  `BORANG PERMOHONAN PAS LAWATAN`, `VISIT PASS APPLICATION FORM`,
  `PERATURAN-PERATURAN IMIGRESEN, 1963 [Peraturan 11(12) dan 11(15)]`,
  footer `IM. 12 - Pin. 1/97`.
- Top selectors: `*Jenis Pas` / `Type of Pass` — `Iktisas`/`Professional`
  (x=37.4mm), `Sosial`/`Social` (x=66.0mm), `Berniaga`/`Business` (x=93.2mm),
  `Kerja Sementara`/`Temporary Employment` (x=121.4mm); `*Jenis Permohonan` /
  `Type of Application` — `Baru`/`New` (x=65.9mm), `Lanjutan`/`Extension`
  (x=93.2mm).
- **A. MAKLUMAT PEMOHON / PARTICULARS OF APPLICANT**: item 1 `Nama Penuh
  (Huruf Besar) Full Name (Capital Letter)`, plus the unnumbered photo box
  `Gambar Pemohon / Photograph Of Applicant (3.5 cm x 5.0 cm)`; item 2
  `*Jantina / Gender` (`Lelaki`/`Male` at x=43.8mm, `Perempuan`/`Female` at
  x=72.4mm); item 3 `Tempat/Negara Lahir / Place/Country of Birth`; item 4
  `**Tarikh Lahir / Date of Birth` (`hari`/`bulan`/`tahun`); item 5
  `Warganegara / Nationality`.
- **B. MAKLUMAT PASPORT PERJALANAN / DOKUMEN PERJALANAN — PARTICULARS OF
  PASSPORT/TRAVEL DOCUMENT**: item 6 `Jenis Dokumen Perjalanan / Type of
  Travel Document` (no fixed checkbox list found for this item — confirmed
  free text, unlike IM.42's 8-option document-type checkbox); item 7
  `Nombor / Number`; item 8 `Tempat / Negara Dikeluarkan / Place / Country
  of Issue`; item 9 `**Sah Sehingga / Valid Until` (`hari`/`bulan`/`tahun`).
- **C. MAKLUMAT PENGANJUR DI MALAYSIA — PARTICULARS OF SPONSOR IN
  MALAYSIA**: item 10 `Nama Penuh (Huruf Besar) / Full Name (Capital
  Letter)`; item 11 `No. Kad Pengenalan / NRIC`; item 12 `No. Telefon /
  Telephone No.`; item 13 `Alamat / Address` with sub-field `Negeri /
  State`.
- **D. KEPERLUAN VISA — VISA REQUIREMENT**: item 14 `*Adakah Visa
  Diperlukan / Visa Requirement` — checkbox coordinates confirm `Ya`/`Yes`
  at x≈67mm (left) and `Tidak`/`No` at x≈113mm (right), i.e. Yes precedes
  No in reading order; item 15 `*Jenis Visa / Type of Visa` — `Sekali
  Perjalanan`/`Single Entry` at x≈66mm and `Berulangkali Perjalanan`/
  `Multiple Entry` at x≈114mm.
- Closing block (see item-16 resolution below): `Tarikh / Date` beside
  `Tandatangan Pemohon / Penganjur — Signature of Applicant / Sponsor`.
- Footnotes (verbatim): `• Borang ini hendaklah ditaip. Tandakan (x) dalam
  petak yang berkenaan. This form should be typed. Mark (x) in the
  appropriate box.`; `** Format Tarikh 99/99/9999 Date Format DD/MM/YYYY`.

### Item-16 ambiguity — resolved

The orchestrating agent flagged that it could not confirm a clean printed
"16." label in its own extraction pass. This agent re-ran the same
extraction independently and **also found no numbered item 16 anywhere** in
the template: a literal search for the substring `16.` in the inflated XML
returns exactly two matches, both of which are `x`/`y` coordinate values
(`x="16.0242mm"`, `x="16.8042mm"`) — false positives, not a caption. The
form's own printed numbering runs 1 through 15 across Sections A-D and then
stops; the closing `Tarikh`/`Tandatangan Pemohon / Penganjur` block that
follows item 15 is genuinely unnumbered on the printed page. This schema
models that block as a single unnumbered field (`declarationDate`),
disclosed in the field's own `description` as unnumbered by the source
itself rather than assigned an invented "16."

### Form Imm.38 — confirmed image-only, not modelled

`https://www.imi.gov.my/wp-content/uploads/2022/01/IM38.pdf`, re-fetched
live this cycle:

```
$ curl -s -o im38.pdf -w "HTTP %{http_code} size %{size_download}\n" \
    https://www.imi.gov.my/wp-content/uploads/2022/01/IM38.pdf
HTTP 200 size 262813
```

262,813 bytes (byte count matches the orchestrating agent's report). Its one
content stream was zlib-inflated directly: the decompressed content stream
consists of a single `/img0 Do` image-paint operator covering the whole
page, with no `Tj`/`TJ` text-showing operators anywhere — i.e. **the entire
page is one embedded raster image**, with no extractable text run at all.
Per this registry's anti-fabrication rule, this schema does not describe
Form Imm.38's internal fields or layout at all; `documents[].imm38Form`
cites it only as a required companion document, sourced from the VDR
checklist page's own plain-text mention of "Form Imm.38," never from
reading its (unreadable) contents.

### VDR context page — re-fetched and re-quoted verbatim

`https://www.imi.gov.my/index.php/en/visa-with-reference/`, re-fetched live
this cycle with `curl --compressed` (HTTP 200; the page is gzip-encoded and
returns garbled bytes without `--compressed`, which is presumably why an
earlier naive fetch attempt might read as binary — noted here as a access
gotcha, not a source problem).

Verbatim opening line, grepped directly from the fetched HTML's own text
(not transcribed from memory or a summary):

> "Visa With Reference (VDR) means a visa issued by the Malaysian
> Representative Office abroad to a non-citizen to enable individuals to
> enter Malaysia after the visa is approved by the Immigration Department
> Headquarters."

The page's own `Category:` list, re-extracted verbatim in full:

- **A. Application For a Visa With Reference (Wife of Malaysia Citizen)** —
  2 copies of Form Imm.12; Form Imm.38; Sponsor's identification card
  (husband); Copy of applicant's passport; Copy of husband's passport
  (marriage abroad); Marriage Certificate (Malaysia/abroad); 2 Recent
  photographs of husband/wife; Divorced/Death Certificate (where
  applicable); VDR questionnaire form; Security Bond; Statutory
  Declaration Form.
- **B. Application For a Visa With Reference (Husband of Malaysian
  Citizen)** — Application Letter sent to and received by the Embassy/High
  Commission of Malaysia; 2 copies of Form Imm.12; Form Imm.38; 2 Recent
  photographs of husband/wife; Sponsor's identification card (wife); Copy
  of applicant's passport; Copy of wife's passport (marriage abroad);
  Marriage Certificate (Malaysia/abroad); Sponsor's proof of financial
  support/Form J (income equivalent to or more than RM2,000/month);
  Security Bond.
- **C. Application For a Visa With Reference (Afghanistan)** — Application
  letter sent to and received by the Embassy High Commission of Malaysia;
  Form Imm.47; 2 Recent photographs of applicant; Copy of applicant's
  passport; Sponsor's identification card; Sponsor's undertaking letter;
  Security Bond. **Out of scope** — uses Form Imm.47, not Form Imm.12; not
  modelled by this schema.
- **D. Application For a Visa With Reference (India)** — 2 copies of Form
  Imm.12; Form Imm.38; Sponsor's identification card; 2 Recent photographs
  of applicant; Copy of applicant's passport; Sponsor's proof of financial
  support/Form J (income of equivalent to or more than RM2,000/month);
  Sponsor's letter of undertaking; Supporting documents of family ties.
- **E. Application For a Visa With Reference (China, Vietnam, North Korea
  and Cuba)** — 2 copies of Form Imm.12; Form Imm.38; Sponsor's
  identification card; Sponsor's letter of undertaking; 2 Recent
  photographs of applicant; Copy of applicant's passport; Correspondence
  letter with verified interpretation; "Applicant should be 30 years and
  above"; Supporting documents of family ties; Sponsor's Marriage
  Certificate; Copy of Notary Certificate.

## Disclosed judgment calls

1. **Visa-vs-Pass categorization.** IM.12's own printed title is "Borang
   Permohonan Pas Lawatan" / "Visit Pass Application Form" — nominally a
   *Pass* form, not labelled "Visa." It is modeled as this registry's
   Malaysia **Visa** vertical schema (not a hypothetical "Pass" vertical,
   which does not exist in GovSchema's 6-vertical taxonomy: Passport/DMV/
   Business Formation/Taxes/Visa/National ID) because: (a) the form's own
   Section D is titled "KEPERLUAN VISA / VISA REQUIREMENT" and asks
   whether a visa is required and, if so, single- or multiple-entry; and
   (b) JIM's own current live service page classifies this exact form,
   submitted together with Form Imm.38, as the required intake form for
   "Visa With Reference" (VDR) — the visa a Malaysian mission abroad
   issues to a non-citizen so they can enter Malaysia. This reasoning is
   also stated in the schema's own top-level `description`.
2. **Category scope (A/B/D/E only, C excluded).** This schema models only
   the four VDR categories that share the Imm.12+Imm.38 document set (A,
   B, D, E — spouse-of-citizen and the three named-nationality
   categories); category C (Afghanistan, which instead uses Form Imm.47)
   is out of scope and has no `applicantCategory` enum value. Stated
   explicitly in the schema's own `description` and in the
   `applicantCategory` field's own `description`.
3. **`applicantCategory` is not a field printed on IM.12 itself.** IM.12 is
   a single common form used across every VDR category; the category
   distinction exists only on JIM's separate VDR checklist page. This
   schema nonetheless models `applicantCategory` as a field (rather than
   omitting it, or leaving every category-specific document unconditional)
   because the checklist page publishes a materially different
   `documents[]` list per category, and `requiredWhen` needs a field to
   gate on. Disclosed in the field's own `description` and `sourceRef`
   (cited to the checklist page, not IM.12).
4. **Item 16 does not exist** (see above) — the closing `Tarikh`/
   signature block is modelled as unnumbered (`declarationDate`), not
   assigned an invented item number.
5. **Form Imm.38's contents are not described anywhere in this schema** —
   confirmed image-only (no extractable text), cited by `documents[]` only
   as a required companion document per the anti-fabrication rule.
6. **`divorceOrDeathCertificate` is left un-gated (`required: false`, no
   `requiredWhen`)** rather than gated to `applicantCategory ==
   "wife_of_malaysian_citizen"`, because the source's own checklist
   qualifies it "(where applicable)" — gating it to the whole category
   would over-claim it as required for every category-A applicant, which
   the source itself does not assert (e.g. an applicant who was never
   previously divorced or widowed has nothing to attach). This mirrors
   `my/jim/passport-travel-document-application`'s disclosed pattern of
   not fabricating a finer condition than the shared `Condition` grammar
   can actually express.
7. **`marriageCertificate` (categories A/B) and `sponsorMarriageCertificate`
   (category E) are modelled as two separate `documents[]` entries**,
   rather than merged into one, because the checklist's own wording
   distinguishes them: A/B's "Marriage Certificate (Malaysia/abroad)"
   describes the applicant/spouse couple's own marriage certificate, while
   E's "Sponsor's Marriage Certificate" is a document that belongs to the
   sponsor (who is not necessarily the applicant's spouse in categories D
   and E). Conflating the two would misattribute whose marriage certificate
   is being requested.
8. **Category E's own extra conditions not modelled as `documents[]`
   entries**: the checklist's "Applicant should be 30 years and above" is
   an eligibility condition on the applicant's age, not a document, and
   this schema's shared field/condition grammar has no age-from-date-of-
   birth comparison (the same limitation already disclosed for
   `my/jim/passport-travel-document-application`'s `guardianName`); it is
   not modelled at all, rather than fabricated as a spurious document or
   field. `correspondenceLetterVerifiedInterpretation` and
   `notaryCertificateCopy`, both genuinely document-shaped checklist
   items for category E, are modelled normally.
9. **Visa fee not modelled.** JIM's "Visa Fees" page
   (`https://www.imi.gov.my/index.php/en/visa-fees/`, redirects to
   `.../main-services/visa/visa-fees/`) publishes a "Visa Fee According To
   The Country" table indexed by a list of countries that does not map
   cleanly onto this schema's four `applicantCategory` values (the table
   is indexed by nationality/destination-country pairs for general visa
   issuance, not by the VDR relationship categories A/B/D/E). Rather than
   fabricate a category-to-country mapping the source does not itself
   state, no `documents[]` payment entry is included for the visa fee;
   this is a deliberate omission, not an oversight.
10. **`travelDocumentType` is modelled as free text**, not an enum, because
    (unlike IM.42's 8-option document-type checkbox) no fixed checkbox
    list was found for IM.12's item 6 in the re-extracted template — the
    printed layout leaves this item as an open fill-in blank.

## Mock test-run walkthrough

Two complete, internally consistent synthetic fixtures were built and
checked against `schema.json`'s own `required`/`requiredWhen`/`enum` rules
with a small ad hoc Node script (`check.mjs`, not committed) that
interprets the shared `Condition` grammar directly:

1. **Category A** (fictional applicant "Nurul Aisyah binti Rahman", an
   Indonesian national applying as the wife of a Malaysian citizen,
   `applicantCategory: "wife_of_malaysian_citizen"`, `visaRequired: true`,
   `visaType: "single_entry"`) — exercises the A/B-gated
   `spousePassportCopy`/`marriageCertificate`/`securityBond`/
   `vdrQuestionnaireForm`/`statutoryDeclarationForm` documents' `requiredWhen`
   branches, and `visaType`'s `requiredWhen` branch on `visaRequired`.
2. **Category D** (fictional applicant "Priya Sharma", an Indian national,
   `applicantCategory: "india"`, `applicationType: "extension"`,
   `visaRequired: false`, `visaType` correctly omitted) — exercises the
   D/E-gated `sponsorFinancialProof`/`sponsorLetterOfUndertaking`/
   `familyTiesDocuments` documents' `requiredWhen` branches, the
   A/B-only documents correctly absent, and `visaType`'s absent-
   requiredness when `visaRequired` is `false`.

```
$ node check.mjs registry/my/jim/visa-with-reference-application/1.0.0/schema.json mock1.json
All required/requiredWhen/enum/pattern checks passed against mock1.json
$ node check.mjs registry/my/jim/visa-with-reference-application/1.0.0/schema.json mock2.json
All required/requiredWhen/enum/pattern checks passed against mock2.json
```

**Negative controls** (each a variant of mock1, not committed as separate
files), confirming the script actually catches violations rather than
passing vacuously:

- (a) `sponsorIcNumber` removed — caught: `FIELD sponsorIcNumber: required
  but missing`.
- (b) `documents.marriageCertificate` removed (category A) — caught:
  `DOCUMENT marriageCertificate: required but missing`.
- (c) `gender: "F"` — caught: not in the `["Lelaki", "Perempuan"]` enum.
- (d) `passType: "tourism"` — caught: not in the 4-value enum.
- (e) `visaRequired: true` with `visaType` removed — caught: `FIELD
  visaType: required but missing`.
- (f) `documents.sponsorIdentificationCard` set to `false` (universal
  document) — caught: `DOCUMENT sponsorIdentificationCard: required but
  missing`.
- (g) `declarationDate: "08/07/2026"` (non-ISO) — caught: `FIELD
  declarationDate: value "08/07/2026" is not a YYYY-MM-DD date`.

All seven negative controls were correctly identified by the script.

Both meta-schema validators were run against the finished document and pass
clean:

```
$ node tools/validate.mjs registry/my/jim/visa-with-reference-application/1.0.0/schema.json
ok   registry/my/jim/visa-with-reference-application/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/my/jim/visa-with-reference-application/1.0.0/schema.json
ok   registry/my/jim/visa-with-reference-application/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

`node tools/verify-sources.mjs registry/my/jim/visa-with-reference-application/1.0.0`
was run against this finished document immediately before opening the PR:

```
verify-sources: checking 1 schema version directory...

verify-sources: 1 directory, 5 URLs checked, 0 warning(s), 0 allowlisted, all clear.
```
