# Verification record — `id/djp/annual-individual-income-tax-return-1770s` v1.0.0

This file is the **source-review record** for this document version, per the
`manual-source-review-v1` practice. It documents the provenance of the
published fields and flow and states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-07`

The document was derived from a **directly-read primary source**: the
Direktorat Jenderal Pajak's (DJP) own official guide, "Tata Cara Pengisian SPT
Tahunan Wajib Pajak Orang Pribadi 1770S" (Modul Pengisian SPT Tahunan e-Filing
Orang Pribadi 1770S, dated 2023-03-13) — a genuine, 46-slide, screenshot-driven
walkthrough of the live `djponline.pajak.go.id` e-Filing wizard, retrieved
directly from `pajak.go.id`'s own web root with no login/CAPTCHA/WAF gate. It
remains `draft`, not `verified`, because the live wizard itself was not walked
interactively (it requires a real NIK/NPWP + password + CAPTCHA login — see
"Access constraint" below), per this registry's `structural-reference`
maturity convention.

## Why this document exists

This is a `GovSchema Standard Research` cycle ([GOV-1560](../../../../GOV-1560)).
Indonesia opened as the registry's 18th jurisdiction in a prior cycle
(GOV-1546, Business Formation) and gained a DMV schema in the cycle
immediately after (GOV-1553), but had only 2 of its 6 verticals modelled;
Passport, Visa, Taxes, and National ID were all open, unscreened backlog
candidates. This cycle screened all four before picking Taxes:

- **Passport** (Direktorat Jenderal Imigrasi's M-Paspor mobile app) —
  screened via secondary how-to articles only; every source found describes
  the account-creation and document-upload flow at a checklist level
  (personal data, e-KTP upload, emergency contact, family-card group
  application) without a single field-by-field screenshot walkthrough
  comparable to BKPM's OSS guide. Left open, not a dead end — a future cycle
  should look for M-Paspor's own official user manual, if one is published,
  before attempting a live-app walk.
- **Visa** (`evisa.imigrasi.go.id`) — a genuine official "User Manual e-Visa"
  PDF was found and fully read (18 pages, no login/CAPTCHA/WAF gate,
  `kemlu.go.id`-hosted mirror of the Directorate General of Immigration's own
  document). It is well-sourced for the visa-type-selection wizard (passport
  nationality, visa sub-purpose e.g. "Golden Visa", visa category e.g.
  "Investment", applicant type e.g. "Individual Investor", length of stay
  e.g. "5 years" — each with a confirmed worked example) and for the
  passport-photo/document-upload requirements and payment-method screens
  (Credit Card vs. Simponi, with the credit-card sub-fields fully visible).
  It is genuinely weaker at its core: the "Fill Form" step's own Personal
  Information block (the section that would carry the actual applicant's
  name/DOB/address/etc.) is rendered only as an unlabelled wireframe diagram
  — dashed placeholder rectangles with no field labels at any page or
  resolution — a level of abstraction this registry's existing e-Visa/ICP
  schemas do not share. Not picked this cycle in favour of a source with a
  fully labelled core; left open as a real candidate for a future cycle,
  contingent on finding either a richer manual or (per this registry's
  established caution around scarce/authenticated bookings) a way to inspect
  the live wizard's Personal Information step without creating a real
  account.
- **National ID** (Dukcapil KTP-el / NIK registration) — confirmed, via
  Dukcapil's own site and multiple secondary guides, to be an in-person,
  biometric (photo/fingerprint/iris) enrolment process with no online
  application-form channel; Dukcapil's own site explicitly states it provides
  no web/app channel even for NIK lookup. A confirmed weak/no-online-channel
  candidate, consistent with this registry's treatment of Mexico's CURP and
  Brazil's CIN — not attempted further.
- **Taxes** (DJP e-Filing, Form 1770 S) — **selected**. DJP's own official
  step-by-step e-Filing guide for Form 1770 S is a genuine, full,
  field-by-field screenshot walkthrough of the live `djponline.pajak.go.id`
  wizard, including a complete worked example (taxpayer "Nn Shinta", tax year
  2022) carried consistently from login through the final submission
  receipt. This is the strongest single source found this cycle by a wide
  margin — richer than the Visa candidate's own Personal Information gap,
  and directly comparable in shape to `ph/bir/annual-income-tax-return-1701a`
  and `br/rfb/individual-income-tax-return-irpf`, both already in this
  registry.

## Source examined

- **Document `(id, version)`:** `id/djp/annual-individual-income-tax-return-1770s` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Direktorat Jenderal Pajak (DJP), Indonesia
- **Primary source URL:** <https://www.pajak.go.id/sites/default/files/2023-03/Modul%20Pengisian%20SPT%20Tahunan%20e-Filling%20Orang%20Pribadi%201770S.pdf>
- **Official document title:** "Tata Cara Pengisian SPT Tahunan Wajib Pajak
  Orang Pribadi 1770S" (cover slide), file metadata title "PowerPoint
  Presentation", authored 2023-03-13
- **Retrieved / reviewed:** 2026-07-07 (`curl` confirms HTTP 200, 2,322,956
  bytes, directly from `www.pajak.go.id`, no login/CAPTCHA/WAF gate)
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## Access constraint and how it was worked around

The PDF itself is a plain, directly downloadable file hosted on DJP's own web
root — no login, no CAPTCHA. It is a PowerPoint-to-PDF export (46 slides) with
a sparse, non-representative text layer; the actual in-app field labels only
exist inside each slide's embedded screenshot. Every field in this schema was
read directly off those **rendered screenshots** — each of the 46 pages
rendered at 2.2x scale via `pdfjs-dist` + `node-canvas` (the same technique
already used for `id/bkpm/oss-nib-registration-individual-umk` and several AE
ICP/RAKEZ documents in this registry) and read with Claude's own vision
capability. The live wizard (`djponline.pajak.go.id`) itself requires a real
NIK/NPWP + password + CAPTCHA login and was **not** walked interactively —
consistent with this registry's practice of never creating or using real
taxpayer credentials on a live government tax-filing system.

## What was confirmed directly (verbatim, from the rendered screenshots)

- **Login screen** (not modelled): NIK/NPWP field (worked example
  `123456789000000`), Kata Sandi (password), a distorted-text captcha
  ("Tuliskan ulang kode kemanan"), "Lupa Kata Sandi?" and "Daftar disini"
  links — account credentials, excluded per this registry's standing
  convention.
- **"Pilih SPT" eligibility screen** (not modelled as fields): three Ya/Tidak
  questions ("Apakah Anda Menjalankan Usaha atau Pekerjaan bebas?", "Apakah
  Anda seorang Suami atau Istri yang menjalankan kewajiban perpajakan
  terpisah (MT) atau Pisah Harta (PH)?", "Apakah Penghasilan Bruto Yang Anda
  Peroleh selama setahun Kurang dari 60 Juta Rupiah?") determine which of
  Forms 1770/1770S/1770SS the wizard routes the filer to, followed by a
  three-way form-entry-mode choice ("Dengan bentuk formulir" / "Dengan
  panduan" / "Dengan upload SPT"). This document is scoped entirely to the
  1770S-with-structured-form pathway (all three questions answered
  Tidak/Tidak/Tidak in the worked example, then "Dengan bentuk formulir"
  selected); the eligibility branching itself, and the alternative
  guided-interview/bulk-upload entry modes, are out of scope.
- **Data Formulir screen** (page 1 of 5): Tahun Pajak (dropdown, worked value
  2022), Status SPT (Normal/Pembetulan radio, Normal selected), Pembetulan Ke
  (locked at 0 under Normal).
- **Lampiran II Bagian A** (Penghasilan yang dikenakan PPh Final): an
  add-a-row table (columns Sumber/Jenis Penghasilan, DPP/Penghasilan Bruto,
  PPh Terutang) with a "Bukti Potong Baru"-style "Tambah+" modal exposing
  Sumber/Jenis Penghasilan (dropdown, one option legible: "1. Bunga Deposito,
  Tabungan, Diskonto SBI, ..."), DPP/Penghasilan Bruto, and PPh Terutang.
  Empty in the worked example ("Tidak ditemukan data yang sesuai").
- **Lampiran II Bagian B** (Harta Pada Akhir Tahun): a populated worked
  table — Kode Harta/Nama Harta/Tahun Perolehan/Harga Perolehan/Keterangan —
  with three real rows: `012`/Tabungan/2022/Rp2,000,000/"Bank Sendiri";
  `012`/Tabungan/2022/Rp1,000,000/"BCI"; `042`/Sepeda Motor/2021/
  Rp18,500,000/"Kredit". The "Harta Baru" add modal confirms the same five
  fields plus their input types (two dropdowns for Kode Harta/Tahun
  Perolehan, three text/textarea inputs).
- **Lampiran II Bagian C** (Kewajiban/Utang Pada Akhir Tahun): a populated
  worked table — Kode Utang/Nama Pemberi Pinjaman/Alamat Pemberi
  Pinjaman/Tahun Peminjaman/Jumlah — with one confirmed row:
  `101`/Adadeh/Balikpapan/2021/Rp10,000,000, and a "Sub Total"/"Jumlah Bagian
  C (JBC)" of Rp10,000,000 across "4 data" (only one row's values are
  legible in the captured screenshot). The "Hutang Baru" add modal confirms
  the same five input fields.
- **Lampiran II Bagian D** (Daftar Susunan Anggota Keluarga): column headers
  Nama/NIK/Hubungan Keluarga/Pekerjaan are confirmed, but the table itself is
  shown empty ("Tidak ditemukan data yang sesuai") in every captured
  screenshot — no worked example row exists for this specific block, unlike
  its Harta/Utang siblings.
- **Lampiran I Bagian A** (Penghasilan Neto Dalam Negeri Lainnya): a fixed,
  always-visible 6-line static form — Bunga / Royalti / Sewa / Hadiah /
  Keuntungan dari Penjualan/Pengalihan Harta / Penghasilan Lain — each a
  single numeric input, with a computed "Jumlah Bagian A" total (not
  modelled, per this registry's no-computed-fields discipline).
- **Lampiran I Bagian B** (Penghasilan yang Tidak Termasuk Objek Pajak):
  another fixed 6-line static form — Bantuan/Sumbangan/Hibah / Warisan /
  Bagian Laba Anggota Perseroan Komanditer tidak atas saham, persekutuan,
  perkumpulan, firma, kongsi / Klaim Asuransi Kesehatan, Kecelakaan, Jiwa,
  Dwiguna, Beasiswa / Beasiswa / Penghasilan Lainnya yang tidak termasuk
  Objek Pajak — with a computed "Jumlah Bagian B" total (not modelled).
- **Lampiran I Bagian C** (Daftar Pemotongan/Pemungutan PPh Oleh Pihak Lain
  dan PPh Yang Ditanggung Pemerintah): an add-a-row table (columns Nama
  Pemotong/Pemungut Pajak, NPWP Pemotong/Pemungut Pajak, Nomor Bukti,
  Tanggal Bukti, Jenis Pajak, Jumlah Dipotong) whose "Bukti Potong Baru"
  add modal is shown fully populated with a real worked example, cross-
  referenced against an actual scanned Formulir 1721-A1 withholding
  certificate in the same screenshot: Jenis Pajak "PPh Pasal 21", NPWP
  Pemotong `120267906000000`, Nama Pemotong "PT Punya Nya Raka", Nomor Bukti
  `1.1.12.22.0000001`, Tanggal Bukti `31-12-2023`, Jumlah PPh Dipotong
  Rp4,951,650 — this last figure is independently cross-checked against the
  scanned certificate's own line 20 ("PPh PASAL 21 DAN PPh PASAL 26 YANG
  TELAH DIPOTONG DAN DILUNASI: 4.951.650").
- **Induk > Identitas**: Status Perkawinan (Tidak Kawin/Kawin radio, Tidak
  Kawin selected).
- **Induk > A. PENGHASILAN NETTO**: line 1 (Penghasilan Neto Dalam Negeri
  Sehubungan dengan Pekerjaan) shown editable and pre-filled Rp127,011,178 —
  cross-referenced directly against the same worked Formulir 1721-A1's own
  line 12 (JUMLAH PENGHASILAN NETO); line 2 (Penghasilan Neto Dalam Negeri
  Lainnya) shown greyed/computed at 0; line 3 (Penghasilan Neto Luar Negeri)
  shown as a genuinely editable blank box; line 4 (Jumlah, computed) shown
  greyed; line 5 (Zakat/Sumbangan Keagamaan yang Sifatnya Wajib) shown as a
  genuinely editable blank box; line 6 (computed) shown greyed.
- **Induk > B. PENGHASILAN KENA PAJAK**: line 7 shows two side-by-side
  dropdowns — the first pre-selected "Tidak Kawin/TK", the second pre-
  selected "0" — feeding a third, greyed, computed PTKP-amount box
  (Rp54,000,000); line 8 (Penghasilan Kena Pajak, computed) shown greyed.
- **Induk > C. PPh TERUTANG**: line 9 (computed) shown greyed at
  Rp4,951,650; line 10 (Pengembalian/Pengurangan PPh Pasal 24 yang telah
  dikreditkan) shown as a genuinely editable blank box; line 11 (computed)
  shown greyed.
- **Induk > D. KREDIT PAJAK**: line 12 (computed, auto-populated from the
  Bukti Potong total) shown greyed at Rp4,951,650; line 13 (computed) shown
  greyed at 0; line 14a (PPh Yang dibayar Sendiri — PPh Pasal 25) and line
  14b (STP PPh Pasal 25, Hanya Pokok Pajak) both shown as genuinely editable
  blank boxes; line 15 (computed) shown greyed.
- **Induk > E. PPh KURANG/LEBIH BAYAR**: line 16 shows a computed "Nihil"
  status label with a greyed amount box (0) — not modelled (system-derived
  filing outcome, not filer input).
- **Induk > F. ANGSURAN PPh PASAL 25 TAHUN PAJAK BERIKUTNYA**: line 18 shows
  a dropdown labelled only "Pilih.." (no option text ever legible) alongside
  a genuinely editable blank amount box.
- **Pernyataan**: a single "Setuju" checkbox against the standard statutory
  declaration text, gating the "Selanjutnya"/proceed-to-submission button.
- **Kirim step (not modelled)**: a media-choice (Email/SMS) for a one-time
  verification code, the code-entry field itself, the "Kirim SPT" submit
  button, a post-submission satisfaction survey ("Puas"/"Tidak Puas"), and
  the final e-mailed "Bukti Penerimaan Elektronik" receipt — all excluded as
  ephemeral submission mechanics/account-session data, not durable
  application content, the same discipline this registry applies to OTP
  codes and login screens elsewhere (e.g. `id/bkpm/oss-nib-registration-
  individual-umk`'s excluded WhatsApp OTP).

## Judgment calls / scope cuts (read before reviewing)

1. **Six dropdown fields lack a confirmed full option list and are modelled
   as open strings, not enums**: `finalIncomeSourceType`, `assetCode`,
   `debtCode`, `withholdingTaxType`, `ptkpStatusCode`, and
   `nextYearInstallmentBasisType` each show at most one selected/example
   value in the guide's own screenshots. Per this registry's established
   discipline (e.g. `id/bkpm`'s undocumented-dropdown treatment), none of
   these are modelled as `enum` — each field's `description` states exactly
   what was and was not confirmed. `nextYearInstallmentBasisType` is the
   weakest of the six: its dropdown shows no legible option text at all,
   only the placeholder "Pilih..".
2. **`ptkpStatusCode` and `numberOfDependentsForPtkp` reference Indonesia's
   public PTKP (Penghasilan Tidak Kena Pajak) status-code convention (TK/K/
   K-I, dependents 0-3) in their own `description` fields, but only the
   single worked value (Tidak Kawin/TK, 0 dependents) is directly confirmed
   in the guide's own screenshot.** This is disclosed explicitly in each
   field's description rather than silently presented as a directly-sourced
   enum; a future reviewer with live-wizard access should confirm the full
   dropdown contents.
3. **Six repeating add-a-row sections are each bounded to a single entry**:
   `hasFinalIncome`/Lampiran II Bagian A, `hasAssetsAtYearEnd`/Bagian B,
   `hasDebtsAtYearEnd`/Bagian C, `hasFamilyMembersListed`/Bagian D, and
   `hasWithholdingCertificate`/Lampiran I Bagian C are each modelled with a
   single inferred boolean gate and one bounded entry, per GovSchema v0.3's
   lack of a repeating/array field type (SPEC.md, and this registry's
   standing precedent in `br/rfb/individual-income-tax-return-irpf` and
   others). The worked example itself shows Bagian B (assets) with three
   real rows and Bagian C debts with at least four rows ("Menampilkan 1
   sampai 4 dari 4 data"), confirming the real-world cardinality this
   scope-cut deliberately does not capture.
4. **`hasFamilyMembersListed`'s worked table has no example row**, unlike its
   Harta/Utang siblings — every captured screenshot of Lampiran II Bagian D
   shows only the empty-state message. The field/column labels themselves
   (Nama, NIK, Hubungan Keluarga, Pekerjaan) are still directly read from the
   table's own header row, not inferred.
5. **All DJP/system-computed subtotal and outcome fields are excluded**:
   Jumlah Bagian A/B/C, Induk lines 2/4/6/8/9/11/12/13/15, and the final
   Nihil/Kurang Bayar/Lebih Bayar status (line 16) are each shown visually
   greyed-out and auto-populated in the source screenshots — consistent with
   this registry's standing discipline (see `br/rfb`'s VERIFICATION.md) of
   never modelling authority-calculated totals as filer-entered fields.
6. **`domesticEmploymentNetIncome` is marked `required: true`**, the only
   income-amount field in this document required outright (not gated behind
   an inferred boolean), because Form 1770 S's own eligibility screening
   (see "What was confirmed directly" above) scopes it to filers who
   selected "Tidak" to "Apakah Anda Menjalankan Usaha atau Pekerjaan bebas?"
   — i.e., salaried employees by construction — for whom this line is always
   populated in the worked example, cross-referenced against the filer's own
   Formulir 1721-A1 certificate.
7. **`assetDescription`'s own optionality within its bounded group is
   unclear** from the source screenshots (see field description) — modelled
   with the same `requiredWhen` as its sibling fields for consistency rather
   than guessed at independently.
8. **Login credentials, the eligibility-screening questions, the
   entry-mode choice, and all submission/session mechanics (verification-
   code exchange, satisfaction survey, receipt) are excluded**, per this
   registry's standing convention against modelling account credentials or
   ephemeral session data as durable application fields (see "What was
   confirmed directly" above for the full list).

## Mock conformance run

`conformance/id/djp/annual-individual-income-tax-return-1770s/1.0.0/` contains
one mock filing packet, checked independently against this document's own
`requiredWhen` conditions:

- `application-packet.json` — an unmarried, no-dependents salaried filer with
  a populated Lampiran II Bagian A/B/C/D entry, one Lampiran I Bagian A/B
  amount each, one Bukti Potong entry cross-referencing the guide's own
  worked Formulir 1721-A1 example, and an agreed declaration — exercises all
  six `requiredWhen` branches (`hasFinalIncome`, `hasAssetsAtYearEnd`,
  `hasDebtsAtYearEnd`, `hasFamilyMembersListed`, `hasWithholdingCertificate`,
  `sptStatus`=`pembetulan`→`amendmentNumber`) at least once each.

## Path to a `verified` claim (next step)

1. Independently re-fetch the same PDF and re-render/re-read each cited page,
   confirming every field `sourceRef` against the actual screenshot.
2. Confirm DJP has not since published a newer edition of this guide, and
   that `pajak.go.id`'s own e-Filing help/tutorial index still references it.
3. Obtain access to the live `djponline.pajak.go.id` e-Filing wizard (requires
   a real Indonesian NPWP/NIK and password) to: confirm or replace the six
   open-string dropdown fields with real `enum` option lists (judgment call
   1); confirm the full PTKP status-code list (judgment call 2); confirm
   `assetDescription`'s true optionality (judgment call 7); and capture a
   populated worked example for the family/dependents table (judgment call
   4).
4. Per this registry's `structural-reference` maturity convention, advancing
   `maturity.criteria.verifiedSchema`/`agentReadySchema` beyond a second
   reviewer's field-by-field pass requires live-wizard execution testing, not
   just source re-verification.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-07** (~6
months). Re-check the source, and confirm no newer guide revision has been
published, on or before that date and on any `source.url` change.
