# Verification record — `my/jim/passport-travel-document-application` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-08`

This is **GOV-1783**: "GovSchema Standard Research" — authoring **Malaysia's
2nd vertical (Passport)**, following GOV-1774's opening of Malaysia as the
registry's 25th jurisdiction (via DMV, `my/jpj/driving-licence-application`).
GOV-1774 had already screened and rejected Malaysia's Business Formation
vertical (SSM's s.14 "Superform," zero AcroForm fields, too thin — see that
document's own VERIFICATION.md); this cycle screened the remaining
candidates in the assigned order (Taxes, National ID, Passport, Visa) and
stopped at the first genuine, current, directly-fetchable source.

## Candidate screening (Phase 1)

### 1. Taxes — LHDN (Lembaga Hasil Dalam Negeri) Borang BE/B/M/BT — rejected as too thin

`hasil.gov.my`'s own "Muat Turun Borang" (download forms) page is a
server-rendered POST form (`/borang/muat-turun-borang/muat-turun-borang-individu`,
fields `subKategori`/`tahun`); replaying it directly with `curl` (no
JavaScript needed, HTTP 200 each time) surfaced live, current-year (2025)
PDF links for every individual-return category:

- `INDIVIDU PEMASTAUTIN - TIDAK MENJALANKAN PERNIAGAAN` (resident, no
  business) → `https://www.hasil.gov.my/media/xpkkrtgi/borang_be2025_1.pdf`
  ("Contoh Borang BE 2025" — a labelled **specimen**)
- `INDIVIDU PEMASTAUTIN - MENJALANKAN PERNIAGAAN` (resident, with business)
  → `.../borang_b2025_1.pdf`, `.../borang_bt2025_1.pdf`
- `INDIVIDU BUKAN PEMASTAUTIN` (non-resident) →
  `.../form_m2025_2.pdf`, `.../form_mt2025_2.pdf`

Every one of these five PDFs (plus the accompanying `lampiran_individu`,
`helaian_kerja`, and `notapenerangan` PDFs) was downloaded directly (all
HTTP 200) and inspected for its `/AcroForm` object. All five carry
`/AcroForm<</Fields[]...>>` — the AcroForm dictionary is present but its
`Fields` array is **empty** in every single one; none is a fillable PDF.
Unlike JPJ-L1 (below and GOV-1774), the LHDN forms are explicitly labelled
specimens ("Contoh Borang BE 2025") because Malaysia's resident-individual
income-tax return is filed exclusively through e-Filing
(`mytax.hasil.gov.my`, an authenticated single-page application with no
public field-level preview) — these PDFs exist only as a paper preview of
what e-Filing itself renders, the same disqualifying shape GOV-1774 found
for SSM's Superform ("only a thin ... specimen printout ... without the
field-by-field numbered instructions this registry's guide-document
fallback precedent requires"). Rejected as too thin; do not re-attempt
without a genuinely new source (e.g. a change to Malaysia's e-Filing
mandate, or a citable numbered-instruction guide equivalent to AEAT's
casilla-numbered guide, which the `notapenerangan_be2025_1.pdf` explanatory
notes PDF does not itself provide — it explains e-Filing screens, not this
specimen's own field numbering).

### 2. National ID — JPN (Jabatan Pendaftaran Negara) MyKad — rejected, no form exists

JPN's own "Kad Pengenalan" (identity card) service pages
(`jpn.gov.my/my/perkhidmatan/kad-pengenalan/mykad-ganti` and eight sibling
pages for lost/damaged/address-change/late-registration variants) were
fetched directly (all HTTP 200, no login/WAF gate). Every one of these pages
describes an **entirely in-person, counter-based, walk-in** process: "Pemohon
dikehendaki datang ke Kaunter JPN dan membawa dokumen yang perlu dikemukakan"
(the applicant must come to a JPN counter and bring the required documents).
There is no downloadable or fillable application form anywhere on this
service's pages — only a prose bulleted list of documents to bring in
person and the transaction fee (RM10 citizen / RM40 non-citizen for a
replacement). This is a weaker source shape than even a thin specimen PDF:
there is no form document to model at all, only a walk-in requirements
checklist. Rejected; do not re-attempt without a genuinely new source (e.g.
JPN publishing a pre-registration form for its MyJanjiTemu appointment
system, which was not found this cycle).

### 3. Passport — JIM (Jabatan Imigresen Malaysia) IM.42 — picked

`https://www.imi.gov.my/index.php/main-ms/muat-turun` links directly to
`https://www.imi.gov.my/wp-content/uploads/2022/02/Borang-Permohonan-Pasport.pdf`
(confirmed live this cycle: plain `curl` GET returns HTTP 200, real `%PDF`
data, 145,812 bytes). This is form **IM.42 (Pin. 1/97)**, "BORANG
PERMOHONAN PASPORT / DOKUMEN PERJALANAN" — an Adobe LiveCycle Designer XFA
container (`xfa:xdp`, `creator: Adobe Designer 7.0`, `scriptModel: XFA`).
Its own `<template>` packet was decompressed (the PDF's object streams are
zlib-deflated; a `stream...endstream` regex + `zlib.decompress` extracted
the embedded XFA XML directly — no `pdftotext`/`pdfjs-dist` needed for this
particular container, since the XFA template's own `<text>`/`<exData>` nodes
carry the literal on-page label strings verbatim). Every `<field>` count in
the template is **zero** — like JPJ-L1 (GOV-1774), this is not an
interactive fillable form; it is a print-layout XFA document (all content
is authored as static `<draw>` elements). Unlike an interactive form, its
own printed layout is nonetheless a genuine, self-documenting, numbered
field-by-field form: 14 numbered items (1-14) across six lettered sections
(A. Maklumat Pemohon; B. Penggantian Kerosakan/Kehabisan Mukasurat/Tamat
Tempoh; C. Penggantian Kehilangan; D. Memasukkan Gambar Terbaru bagi
Kanak-kanak; E. Persetujuan/Akuan; F. Penyerahan Pasport, office-use only),
each with its own printed label directly on the form — the same
self-documenting shape GOV-1774 established as this registry's fallback
precedent for a non-interactive-but-numbered Malaysian government form.

Confirming currency: JIM's own current "Pasport Malaysia Antarabangsa"
service page (`https://www.imi.gov.my/index.php/perkhidmatan-utama/pasport/pasport-malaysia-antarabangsa/`,
fetched directly the same day, page footer date matching today,
2026-07-08) explicitly names "Borang Permohonan Pasport" as a still-required
document for several eligibility categories, including "Borang Permohonan
Pasport Percuma" (the free-of-charge staff category) — this is not a
withdrawn or superseded legacy form; it remains the live application form
referenced by JIM's own current process description, and its own printed
revision code ("Pin. 1/97") is simply the print-layout's unchanged design
revision, not evidence of staleness (the same pattern this registry has
already confirmed for several other unchanged-for-years-but-still-current
government print forms).

Only two other Malaysian candidates were screened this cycle (Taxes,
National ID, both above, both rejected); Malaysia's Visa vertical was not
screened and, along with Taxes and National ID, remains an open backlog
candidate for a future cycle — see CATALOG.md's dated update paragraph.

## Field inventory (Phase 2)

19 `fields[]` entries and 7 `documents[]` entries, every one carrying a
`sourceRef` citing either IM.42 p.1's own printed item label/number (by
lettered section and item number) or JIM's own "Pasport Malaysia
Antarabangsa" service page (for eligibility-document and fee-table
entries), independently re-extracted from the XFA template's own text
nodes (not transcribed from memory or a search-result snippet).

| Section | Fields | Source |
|---|---|---|
| Jenis Permohonan / Jenis Dokumen | `applicationReason`, `documentTypeRequested` | p.1 top checkbox groups (5-option reason, 8-option document type) |
| A - Maklumat Pemohon | `fullName`, `otherName`, `icNumber`, `alternativeIdNumber`, `dateOfBirth`, `placeOfBirth`, `gender`, `currentAddress`, `postcode`, `city`, `state`, `height`, `maritalStatus` | p.1 items 1-9 |
| B/C/D - Penggantian | `previousDocumentNumber`, `previouslyHeldTravelDocument`, `previousTravelDocumentNumberDeclared` | p.1 items 10-12, Bahagian B declaration (b) |
| E - Persetujuan/Akuan | `guardianName`, `guardianIcNumber`, `declarationDate` | p.1 Bahagian E |

`documents[]`: `identityDocument` (MyKad/KPPK 09/birth certificate, sourced
from JIM's own eligibility-category table), `applicantPhotograph` (3.5cm x
5.0cm, IM.42's own photo-box label), `previousPassportOrTravelDocument`
(gated to the three non-first-time, non-loss reasons that ask the applicant
to attach the old document directly rather than a police report),
`policeReport` (gated to `lost`), `additionalChildPhotographs` (gated to
`insert_child_photo`), `applicationFee` (RM200/5-year base citizen rate,
JIM's own current "Kadar Fi Pasport Malaysia" table), `signedDeclaration`
(IM.42's own printed Bahagian E declaration text, verbatim, including the
RM10,000-RM50,000 fine / 1-5 year imprisonment penalty for false
information).

## Access notes and judgment calls

1. **The XFA template's absolute `x`/`y` draw coordinates were found to be
   subform-relative, not page-absolute**, so a naive flat sort by
   coordinate produced a nonsensical reading order (later-numbered items
   interleaved with earlier ones). Rather than build a full XFA layout
   resolver to recover true page-absolute coordinates, this schema was
   authored from the template's **document order** (the order `<text>` and
   `<exData>` nodes appear in the XML source) cross-checked against the
   form's own printed section/item numbering (A-F, 1-14) — the numbering
   itself is the authoritative structure regardless of draw order, and
   every field below cites the specific numbered item it transcribes.
2. **The `(ii) Kategori` checkbox group (values: Kad Pengenalan, Sijil
   Perakuan Taraf, Sijil Perkahwinan, Sijil Kelahiran) and the identically-
   labelled item 13 `Kategori Kad Pengenalan` are excluded from
   `fields[]`.** Coordinate evidence placed both in the form's right-hand
   "Untuk Kegunaan Pejabat" (For Office Use) column, alongside the officer's
   own document-type/country-code recording boxes, the applicant photo box,
   thumbprint box, and Bahagian F's counter-signature fields — the same
   office-use content this registry's JPJ-L1 precedent (GOV-1774) already
   established as out of scope for `fields[]` (that document's own
   "Untuk Kegunaan Pejabat" content was likewise not modelled). This
   schema does not fabricate a confident binding of these checkbox values
   to a specific applicant-facing item.
3. **`previousDocumentNumber` unifies three textually-identical instructions**
   (items 10, 11, and 12 each literally say "No. pasport/dokumen perjalanan
   terakhir" / "pasport/dokumen perjalanan terakhir") into one field gated
   to all three non-first-time `applicationReason` values, rather than
   fabricating three near-duplicate fields the source does not itself
   distinguish by wording.
4. **`previouslyHeldTravelDocument`/`previousTravelDocumentNumberDeclared`
   are modelled separately from `previousDocumentNumber`**, because
   Bahagian B's declaration (b) ("*Saya mengaku bahawa **saya/anak saya
   **pernah/tidak pernah memiliki pasport/dokumen perjalanan bernombor:")
   is its own yes/no declaration with an independent blank, not merely a
   restatement of item 10's instruction — disclosed here as a judgment
   call rather than silently merged or silently dropped.
5. **Bahagian B's four lettered declaration checkboxes (a/b/c/d) are only
   partially modelled.** (b) is modelled (see above, judgment call 4)
   because it carries an actual fillable blank. (a) ("Saya memohon suatu
   pasport/dokumen perjalanan dikeluarkan kepada saya/anak saya seperti
   butiran di bahagian A") and (c) ("Saya, bapa/ibu/penjaga... memohon
   memasukkan gambar terbaru...") are declaratory restatements of
   `applicationReason`/`documentTypeRequested` with no blank of their own,
   and (d) has no legible associated text in the extracted template at
   all — none of the three is modelled as a separate field, to avoid
   fabricating semantics for a checkbox this schema cannot independently
   confirm the wording of.
6. **`guardianName`/`guardianIcNumber` are not `requiredWhen`-gated to an
   applicant age**, despite the source's own explicit condition ("Jika
   pemohon berusia di bawah 18 tahun" — if the applicant is under 18).
   The shared `Condition` grammar (GSP-0013) compares field values directly
   (`equals`/`in`/`notEquals`/ordering operators) and has no built-in
   "derive age from date of birth, as of today" primitive; expressing this
   condition would require either fabricating an `isMinor` boolean field
   the source form does not itself ask for, or silently asserting an
   unconditional requirement the source does not state. Both fields are
   left optional with the literal source condition disclosed in their own
   `description`, the same handling `pl/mswia`'s and other prior schemas in
   this registry have applied to source conditions the shared grammar
   cannot cleanly express.
7. **`applicationFee.amount` states only the 18-59 age-band, 5-year-validity
   citizen rate (RM200), the base case.** JIM's own "Kadar Fi Pasport
   Malaysia" table publishes a fuller schedule varying by age band (RM100
   for under-12, 60-and-over, or full-time overseas undergraduate students
   under 21; free for a registered person with a disability or JIM's own
   staff category) and by validity period (5 vs. 10 years, with several
   age bands ineligible for the 10-year option) — disclosed here in full
   rather than asserted as this document's single `amount`, the same
   handling `my/jpj/driving-licence-application` applied to its own
   multi-tier fee uncertainty.
8. **No live submission was attempted.** Submitting this form in person
   creates a real fee liability and a real change to the applicant's legal
   travel-document record — not a safe or reversible action to simulate
   against a live government process, consistent with this registry's
   standing discipline for every prior cycle's schema.

## Test run (Phase 3)

Two fully hand-constructed mock records were built from this document's own
field inventory (not committed to the registry; this registry's convention
keeps `registry/` to `schema.json` + `VERIFICATION.md` only):

1. A fictional adult applicant (Siti binti Ahmad) filing a **first-time**
   passport application (`applicationReason: "first_time"`,
   `documentTypeRequested: "passport_64_pages"`), exercising
   `previousDocumentNumber`'s absent-requiredness (no prior document to
   cite) and `previouslyHeldTravelDocument: false` with
   `previousTravelDocumentNumberDeclared` correctly omitted.
2. A fictional applicant (Muhammad Iskandar) filing a **lost-document
   replacement** (`applicationReason: "lost"`), exercising
   `previousDocumentNumber`'s `requiredWhen` branch and the
   `policeReport` document's `requiredWhen` branch.

Both were checked with a small ad hoc Node script (not committed) that
compiles `schema.json`'s own `required`/`requiredWhen` rules (the shared
`Condition` grammar's `equals`/`in` leaves) and evaluates them directly
against each fixture:

```
$ node check.mjs registry/my/jim/passport-travel-document-application/1.0.0/schema.json mock1.json
All required/requiredWhen/enum checks passed against mock1.json
$ node check.mjs registry/my/jim/passport-travel-document-application/1.0.0/schema.json mock2.json
All required/requiredWhen/enum checks passed against mock2.json
```

**Negative controls** (each run against a variant of one of the two
fixtures, not committed as separate files), confirming the script actually
catches violations rather than passing vacuously:

- (a) `previousDocumentNumber` removed while `applicationReason: "lost"` —
  caught: `FIELD previousDocumentNumber: required but missing`.
- (b) `documents.policeReport` removed under the same `applicationReason`
  — caught: `DOCUMENT policeReport: required but missing`.
- (c) `applicationReason: "banana"` — caught: not in the 5-value enum.
- (d) `gender: "M"` — caught: not in the `["Lelaki", "Perempuan"]` enum.
- (e) `previouslyHeldTravelDocument: true` added without
  `previousTravelDocumentNumberDeclared` — caught: `FIELD
  previousTravelDocumentNumberDeclared: required but missing`.
- (f) `fullName` removed entirely — caught: `FIELD fullName: required but
  missing`.
- (g) `documents.applicantPhotograph` removed — caught: `DOCUMENT
  applicantPhotograph: required but missing`.

All seven negative controls were correctly identified by the script.

Both meta-schema validators were run against the finished document and pass
clean:

```
$ node tools/validate.mjs registry/my/jim/passport-travel-document-application/1.0.0/schema.json
ok   registry/my/jim/passport-travel-document-application/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/my/jim/passport-travel-document-application/1.0.0/schema.json
ok   registry/my/jim/passport-travel-document-application/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

`node tools/verify-sources.mjs registry/my/jim/passport-travel-document-application/1.0.0`
was also run against this finished document immediately before opening the
PR and reported no FAILs (see PR description for the run's output).
