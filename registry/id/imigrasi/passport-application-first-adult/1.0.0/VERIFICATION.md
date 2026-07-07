# Verification record — `id/imigrasi/passport-application-first-adult` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-07`

This is a `GovSchema Standard Research` cycle (**GOV-1574**), a general
research-analyst brief covering DMV, Business Formation, Visa, Passport,
Taxes, and National ID & Civic Documents across all jurisdictions. Indonesia's
Passport vertical had been screened and left open across three prior cycles
(GOV-1546, GOV-1560, GOV-1567) — each time as "no field-level source found"
or, most recently, "reversed to viable, not yet authored." This cycle
re-fetched the source GOV-1567 identified and authored against it. The
document was derived from a **directly-read primary source**: the
Direktorat Jenderal Imigrasi's own official "User Guide M-Paspor" (V.1.0,
Juni 2026), a genuine 31-page screenshot-driven walkthrough of the live
M-Paspor mobile app, retrieved directly (HTTP 200, no login/CAPTCHA/WAF) from
a regional Ditjen Imigrasi subdomain. It remains `draft`, not `verified`,
because the live app itself was not walked interactively — it requires full
account registration (name/DOB/email/phone/password, then an emailed OTP)
plus a CAPTCHA-gated login before any application screen is reachable, which
this review did not attempt, to avoid creating a real account/application
record in a government system.

## Why this candidate, and what was screened first

Per CATALOG.md's own "Known Gaps" record, Indonesia's Passport gap had
already reversed from "not viable" (GOV-1560: "sourceable only via secondary
checklist-level how-to articles, no field-level walkthrough found") to
viable (GOV-1567: "a genuine official, versioned ('V3') screenshot-driven
user guide... hosted unauthenticated on a regional Ditjen Imigrasi
subdomain"), but had not yet been authored — explicitly logged as
"ready-to-author backlog for an immediate follow-up cycle." Before picking it
up, this cycle re-screened the other candidates the issue brief's own notes
named:

- **DE Steuer-ID, SG NRIC loss/damage + re-registration, NZ RealMe** — all
  three are already published in this registry
  (`de/finanzamt/tax-identification-number`,
  `sg/ica/identity-card-replacement` + `sg/ica/identity-card-reregistration`,
  `nz/dia/realme-verified-identity`, each `1.0.0`). The issue brief's notes
  predate these; no further action needed.
- **"Remaining voter registration"** — Colombia's Registraduría runs a
  genuine online overseas-voter-registration microsite
  (`inscribeteonline2026.registraduria.gov.co`, confirmed via web search and
  Wayback Machine snapshots from 2025-12 through 2026-03) but it no longer
  resolves (`NXDOMAIN` from a public DoH resolver, reconfirmed
  2026-07-07): the site was built for Colombia's 2026 congressional/
  presidential elections, whose registration deadlines (2026-01-08 and
  2026-03-31 respectively) have both already passed as of this cycle's
  2026-07-07 retrieval date. It is also a client-rendered Vue single-page
  app (title "IDC"), so even its Wayback snapshots would not expose
  field-by-field content without live JavaScript execution against a
  now-nonexistent host. Logged as a dead-for-now candidate: a future
  Colombia-focused cycle should check whether the same or an equivalent
  microsite is stood back up ahead of Colombia's next election cycle.

Indonesia's Passport gap (M-Paspor) was then confirmed as the strongest
remaining candidate and authored this cycle.

## Source examined

- **Document `(id, version)`:** `id/imigrasi/passport-application-first-adult` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Directorate General of Immigration (Direktorat Jenderal
  Imigrasi), Ministry of Immigration and Correctional Affairs
- **Primary source (directly retrieved, HTTP 200, no login):**
  <https://batam.imigrasi.go.id/assets/resources/files/M-Paspor_UserGuide_V3.pdf>
  — "User Guide M-Paspor", cover page dated "V.1.0 - Juni 2026", 31 pages.
  The main `imigrasi.go.id` domain's own copy of this file remains
  CloudFront-blocked to a direct fetch (reconfirmed this cycle, same result
  GOV-1567 found); this Batam regional immigration office mirror is not.
- **Extraction method:** the PDF's text layer was read directly with
  `pdfjs-dist` (v3.11.174) for prose/step-list content; the guide's core
  field-level screens (its own in-app screenshots) are embedded as raster
  images with no text layer, so those pages were rendered to PNG at 2.5x
  scale with `pdfjs-dist` + `canvas` and read visually, page by page — the
  same image-rendering technique already used for
  `ae/icp/emirates-id-replacement` (GOV-1477) and several other
  screenshot-driven guides in this registry.
- **Retrieved / reviewed:** 2026-07-07
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## Field inventory (Phase 3)

Every field below was read directly from a rendered screenshot inside the
official guide (page number is the PDF's own page index, not the printed
footer number, which runs one behind):

| Field (schema `name`) | Label (source) | Guide page / figure | Example valid value |
|---|---|---|---|
| `serviceSpeed` | Jenis Permohonan | p.9, Gambar 3.2 | `"REGULER"` |
| `applicantCategory` | Untuk siapa permohonan paspor ini? | p.10, Gambar 3.3 | `"DEWASA"` |
| `immigrationOffice` | Kantor Imigrasi | p.11, Gambar 3.4 | `"Kantor Imigrasi Kelas I Khusus TPI Batam"` |
| `passportType` | Jenis Paspor | p.12, Gambar 3.5 | `"PASPOR BIASA ELEKTRONIK LAMINASI 5 TAHUN"` |
| `applicantFullName` | Nama Pemohon | p.13, Gambar 3.6 | `"SITI RAHAYU WULANDARI"` |
| `nik` | Masukkan NIK | p.13, Gambar 3.6 | `"2171054512980003"` |
| `dateOfBirth` | Tanggal Lahir | p.13, Gambar 3.6 | `"1998-12-05"` |
| `gender` | Jenis Kelamin | p.13, Gambar 3.6 (dropdown); p.14, Gambar 3.7 (worked value "Perempuan"); p.18, Gambar 3.11 (worked value "Pria") | `"Perempuan"` |
| `civilStatus` | Status Sipil | p.13, Gambar 3.6 | `"Belum Kawin"` |
| `hadPriorRegularPassport` | Apakah anda sudah pernah memiliki paspor biasa (hijau)? | p.15, Gambar 3.8 | `"BELUM"` |
| `travelPurpose` | Apakah tujuan anda membuat paspor? | p.17, Gambar 3.10 | `"Wisata / Liburan"` |
| `familyContactName` | Nama Kerabat | p.17, Gambar 3.10 | `"Ahmad Fauzi"` |
| `familyContactPhone` | Nomor Telepon (keluarga/kerabat) | p.17, Gambar 3.10 | `"081234567890"` |
| `familyRelationship` | Keterangan Hubungan Keluarga | p.17, Gambar 3.10 | `"Ayah Kandung"` |
| `ktpIssueDate` | Tanggal dikeluarkan KTP | p.17, Gambar 3.10 | `"2016-03-01"` |
| `nationality` | Kewarganegaraan | p.17, Gambar 3.10 | `"Indonesia"` |
| `ktpAddress` | Alamat Sesuai KTP | p.17, Gambar 3.10 | `"Jl. Daeng Kamboja No. 12, RT 003/RW 005"` |
| `ktpProvince` | Provinsi Sesuai KTP | p.17, Gambar 3.10 | `"Kepulauan Riau"` |
| `ktpRegency` | Kabupaten / Kota Sesuai KTP | p.17, Gambar 3.10 | `"Kota Batam"` |
| `occupation` | Pekerjaan | p.17, Gambar 3.10 | `"Karyawan Swasta"` |
| `applicantPhone` | Nomor Telepon (pemohon) | p.17, Gambar 3.10 | `"081298765432"` |
| `motherName` | Nama Ibu | p.17, Gambar 3.10 | `"Ratna Sari"` |
| `motherNationality` | Kewarganegaraan Ibu | p.17, Gambar 3.10 | `"Indonesia"` |
| `motherAddress` | Alamat Ibu | p.17, Gambar 3.10 | `"Jl. Daeng Kamboja No. 12, RT 003/RW 005, Batam"` |
| `appointmentSlot` | Tanggal Kedatangan | p.20, Gambar 3.13 | `"31 Oktober 2026, 08:01-11:30"` |

`documents[]` (all read from the guide's own step list, Section 3.2, and
Gambar 3.11's own field labels):

| Document `id` | What it is | Required? |
|---|---|---|
| `ektp` | Electronic KTP, photographed/uploaded, JPG only | Yes |
| `kartuKeluarga` | Family Card (Kartu Keluarga) | Yes (new/first-time application) |
| `birthCertificateOrEquivalent` | Birth certificate / diploma / marriage certificate or book / baptismal certificate (any one) | Yes (new/first-time application) |
| `parentIdentityForMinor` | Additional parent identity document | Conditional (Anak-anak/minor applicants only, by description — not separately modelled, see below) |

## Access notes and judgment calls

1. **Scope is deliberately narrowed to one branch of a larger, multi-branch
   wizard.** The live M-Paspor app's own screens branch on three independent
   choices — service speed (Reguler/Percepatan), applicant category
   (Dewasa/Anak-anak), and prior-passport status (Belum/Sudah) — and this
   document models the full field set for exactly one combination
   (Dewasa + first-time/Belum), while still modelling `serviceSpeed` and
   `applicantCategory` as real, both-values-confirmed enums (following the
   same disclosure discipline as `ph/lto/drivers-license-application`'s
   `typeOfApplication` field). `hadPriorRegularPassport` is modelled the
   same way: both `BELUM`/`SUDAH` values are confirmed on-screen, but only
   the `BELUM` branch's downstream fields are modelled in this v1.0.0. The
   guide's own screens for the `SUDAH` (renewal/replacement) branch —
   condition of the old passport (Habis masa berlaku / Penuh / Hilang /
   Rusak), its number, and a photo of its data page (Gambar 3.8-3.9) — are
   real and visible in the source but not modelled here; a future MINOR
   version could add them behind `requiredWhen: { field:
   "hadPriorRegularPassport", equals: "SUDAH" }`.
2. **`serviceSpeed`'s two tiers are confirmed to share one form.** The
   guide's own screenshots for the identical downstream steps (verification
   form, PERDIM questionnaire, document upload, additional-data screens)
   interchange between title bars reading "Permohonan paspor percepatan"
   (Gambar 3.5-3.6) and "Permohonan paspor reguler" (Gambar 3.8-3.13) with no
   difference in visible fields — direct evidence, not an assumption, that
   Percepatan differs only by its surcharge and an office-availability
   filter toggle (both out of scope: the surcharge is a computed fee, and
   the filter is presentational).
3. **`gender` is modelled as a 2-value enum; `civilStatus` remains an open
   string.** **Correction from this document's initial authoring pass** (found
   by the GOV-1577 review gate's independent page-render re-check): the
   guide confirms *two* `gender` values on-screen, not one — "Pria" (male,
   "Ubah Data Pemohon" recap, Gambar 3.11) and "Perempuan" (female,
   "Pemohon dengan Paspor Lama" recap, Gambar 3.7, part of the out-of-scope
   `SUDAH` branch, but the same dropdown/field). The initial pass checked
   only Gambar 3.11 and asserted "Pria" was the sole confirmed value; it
   is not. `gender` is now modelled as `enum: ["Pria", "Perempuan"]`,
   scoped to exactly the two confirmed values (not asserted as
   exhaustive). `civilStatus`'s live dropdown option list is never shown
   open anywhere in the guide, and no worked-example value is legible
   either (the field is shown only in its unselected placeholder state),
   so it remains an open string — following the same precedent as
   `id/bkpm/oss-nib-registration-individual-umk`'s own `gender` field.
4. **`travelPurpose` is a known-incomplete picklist.** The guide's own
   screenshot (Gambar 3.10) shows five fully legible options (Wisata/
   Liburan, Umroh, Haji, Bekerja Formal, Pekerja Migran Indonesia (PMI))
   before the picker is cut off by the screenshot's own bottom edge, with at
   least one further option partially visible and illegible (beginning
   "BELAJAR..."). Modelled as an open string rather than asserting a
   conclusively complete enum.
5. **`nationality` is modelled as a single-value enum ("Indonesia").** The
   live dropdown's chevron affordance implies other values exist, but this
   document's own scope (a WNI/citizen applicant identified via e-KTP + NIK
   earlier in the same flow) never surfaces one — the same reasoning already
   applied to `id/korlantas/international-driving-permit-registration`'s
   `issuingCounter` field.
6. **`motherName`/`motherNationality`/`motherAddress` are modelled for the
   Dewasa (adult) pathway, not only for minors.** The guide's own screen
   ("Keterangan Ibu Pemohon", Gambar 3.10) appears within the "Data Tambahan
   Pemohon" step that this document's worked example walks for an adult
   applicant tier, immediately alongside the adult's own occupation and
   phone number fields — it is not gated behind `applicantCategory =
   ANAK_ANAK` anywhere in the guide's own step list or screenshots.
7. **`parentIdentityForMinor` is modelled as `required: false` with the
   condition stated in its own `label`, not `requiredWhen`.** The source's
   own step-10 text marks it "wajib jika pengajuan paspor untuk anak-anak"
   but the live form exposes no applicant-category-specific document
   checklist screen in this guide — only the same generic step-10 upload
   screen shown for the modelled Dewasa/new-application path. Rather than
   fabricate a gating condition the source itself does not expose at the
   document level, this mirrors the discipline already used for
   `id/korlantas/international-driving-permit-registration`'s `kitap` and
   `existingInternationalLicence` documents.
8. **No payment/fee document is modelled.** The guide's own Section 3.3
   ("Pembayaran Permohonan") confirms a payment step exists (Kode Billing
   via Simponi, or a card/virtual-account Payment Gateway via Finpay) but
   states no base PNBP fee amount anywhere in its 31 pages — only the
   Rp1,000,000 Percepatan surcharge is quantified, and that is a tier
   add-on, not the base fee. Rather than guess a figure, this document
   leaves the payment step entirely out of scope; a future cycle could add
   it once the underlying PNBP tariff regulation (analogous to PP No.
   76/2020, cited by `id/korlantas`'s own `registrationFee` document) is
   independently located and read for passports specifically.
9. **Downstream menus (reschedule, history, informasi, profile,
   notifikasi — guide sections 3.4-3.8) are out of scope.** These are
   post-submission account-management screens, not part of the application
   itself, and are excluded the same way `id/korlantas`'s own guide-adjacent
   menus were excluded.
10. **`appointmentSlot` is modelled as a string, not a `date`.** The live
    picker's own worked example ("31 Oktober 2025, 08:01-11:30") bundles a
    calendar date with a fixed 3.5-hour arrival window in one selectable
    value; GovSchema's `date` type does not carry a time-range component, so
    a plain string preserves the source's own compound format rather than
    truncating it to a bare date.
11. **`negara tujuan` (destination country) and `lama tinggal` (length of
    stay) are not modelled — found undisclosed by the GOV-1577 review
    gate.** The guide's own step-9 prose summary (page 15, printed footer
    "14": "Isi Kuesioner (kondisi paspor lama, foto dan no paspor lama,
    tujuan pembuatan, negara tujuan, lama tinggal, kontak keluarga)")
    names these two fields in the same breath as `travelPurpose`
    ("tujuan pembuatan") and the family-contact fields ("kontak
    keluarga"), both of which *are* modelled here — but no screenshot
    anywhere in the 31-page guide ever renders their labels, positions, or
    option lists; the worked example throughout Gambar 3.10 selects
    "Wisata/Liburan" as `travelPurpose`, and destination-country/length-of-
    stay fields most plausibly gate on a work/migrant-labour purpose
    ("Bekerja Formal" or "Pekerja Migran Indonesia (PMI)") that the guide
    never walks. Rather than fabricate a label, type, or condition this
    source never visually confirms, these two fields are left out of scope
    for this v1.0.0 — a future minor version should add them, gated behind
    `travelPurpose`, once a screenshot or the live app confirms their exact
    shape.

## Test run (Phase 4)

No live submission was attempted, for the same reason `status` remains
`draft`: doing so would require creating a real M-Paspor account (email OTP)
and would risk holding a real appointment slot at a real immigration office,
mirroring this registry's existing practice for scarce-appointment/
account-gated systems (see `ph/dfa/passport-application`, GOV-1497). Instead,
this document's own worked mock example (the "Example valid value" column
above) was checked programmatically against every field's own `validation`
keyword (`enum`, `pattern`, `maxLength`) and against `required`, with all 24
fields passing and both meta-schema validators (`tools/validate.mjs` and
`tools/validate-ajv.mjs`) passing clean.
