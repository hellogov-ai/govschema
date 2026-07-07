# Verification record — `id/bkpm/oss-nib-registration-individual-umk` v1.0.0

This file is the **source-review record** for this document version, per the
`manual-source-review-v1` practice. It documents the provenance of the
published fields and flow and states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-07`

The document was derived from a **directly-read primary source**: BKPM's own
official OSS RBA user guide PDF, "Individual UMK Licensing through OSS
Indonesia Application" — a genuine, 20-step, screenshot-driven walkthrough of
the OSS Indonesia mobile app, in English, retrieved directly from `oss.go.id`'s
own CDN (`s3.oss.go.id`) with no login/CAPTCHA/WAF gate. It remains `draft`,
not `verified`, pending live-app execution testing, per this registry's
`structural-reference` maturity convention.

## Why this document exists

This is a standing `GovSchema Standard Research` cycle
([GOV-1546](../../../../GOV-1546)). Before picking this candidate, this cycle
first re-screened the National ID & Civic Documents items the task brief
itself named as targets (DE Steuer-ID, SG NRIC loss/damage/re-registration, NZ
RealMe) and found all three **already published**:
`de/finanzamt/tax-identification-number`, `sg/ica/identity-card-reregistration`
(and `sg/ica/identity-card-replacement`), and `nz/dia/realme-verified-identity`
respectively — not open gaps. It then re-checked the UAE Passport gap
(CATALOG.md's own top open Passport candidate): both the ICP Smart App user
manual (the same source already used for `ae/icp/emirates-id-replacement`) and
the live `icp.gov.ae` "Issue New Passport"/"Renewal Passport" service pages
remain checklist-level only (5 generic steps, 1 document, fee lines) with no
field-level wizard screenshot — reconfirming the prior GOV-1474 finding
unchanged; not re-attempted without new sourcing.

This cycle instead opened Indonesia as an 18th jurisdiction, a candidate
CATALOG.md's own "Known Gaps" section had explicitly flagged as worth
scouting ("Indonesia (OSS/NIB business registration, not screened in detail
this cycle)"). OSS RBA's own `panduan` (guidelines) portal at `oss.go.id/en/panduan`
publishes several genuine PDF guides; three were examined before this one was
selected:

- **`Panduan-Pembuatan-NIB.pdf`** (Indonesian-language, 17 pages) — a real
  screenshot walkthrough, but scoped only to *adding a business field
  ("Tambah Bidang Usaha") to an NIB an account already holds*, not first-time
  registration; a weaker starting point than a true end-to-end guide.
- **`v2_EN_Pendaftaran-Hak-Akses-OSS-RBA.pdf`** (English, 4 pages) — covers
  only the initial OSS account/access-rights registration (NIK, email,
  password), not the NIB business-registration wizard itself; too thin on its
  own.
- **"Individual UMK Licensing through OSS Indonesia Application"** (English,
  20 pages) — **selected**. Genuinely covers the full pathway end to end, from
  mobile-app account registration through KTP-based profile data, business
  actor data, KBLI classification, land/capital data, automated risk
  validation, business detail, business location, products/services, the
  mandatory self-declaration, and NIB issuance — the strongest single source
  found this cycle, and richer than either of the other two guides alone.

## Source examined

- **Document `(id, version)`:** `id/bkpm/oss-nib-registration-individual-umk` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Ministry of Investment and Downstream Industry / Investment
  Coordinating Board (BKPM), Indonesia
- **Primary source URL:** <https://s3.oss.go.id/oss/cms/Individual-UMK-Licensing-through-OSS-Indonesia-Application-06bf4250d469428912b5b62592497112.pdf>
- **Guide landing page:** <https://oss.go.id/en/panduan/635970086345c7d71a814499>
- **Official document title:** "Individual UMK Licensing through OSS Indonesia
  Application"
- **Retrieved / reviewed:** 2026-07-07
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## Access constraint and how it was worked around

The PDF is a plain, directly downloadable file from `oss.go.id`'s own CDN — no
login, no CAPTCHA. Its 20 pages carry only sparse instructional-caption text
in the extractable text layer (e.g. "Fill in the form according to your
Electronic KTP"); the actual in-app field labels only exist inside each page's
embedded screenshot image. Every field in this schema was read directly off
those **rendered screenshots** — each page rendered at 2.5x scale via
`pdfjs-dist` + `node-canvas` (not the sparse text layer) and read with
Claude's own vision capability, the same discipline already used for the AE
ICP Smart App manuals in this registry.

## What was confirmed directly (verbatim, from the rendered screenshots)

- **Step 3 (p.3):** Nomor Telepon Seluler (mobile number), +62 country code
  prefix, "Kirim kode verifikasi melalui WhatsApp" button.
- **Step 7 (p.7):** Password / Konfirmasi Password, with the source's own
  stated rule ("minimum 8 characters, combination of capital letters,
  lowercase letters, numbers, and special characters (!@#$%^&*_-)") — this
  screen's fields are **not modelled** (account credentials, not licensing
  data; consistent with how no other document in this registry models
  account-login credentials).
- **Step 8 (p.8):** the KTP-based profile form — Nomor Induk Kependudukan,
  Nama Lengkap, Tanggal Lahir (format DD-MM-YYYY, worked example
  "19-01-1992"), Jenis Kelamin ("Laki-Laki" selected, no expanded list),
  Alamat, Provinsi ("Jawa Barat" selected), Kabupaten/Kota (label visible,
  cut off before a value).
- **Step 9 (p.9):** confirms the same profile screen continues to Kecamatan
  ("Cikarang Utara") and a Desa/Kelurahan field whose *label* is visible but
  whose *value* is covered by a "Terima kasih sudah mendaftar di OSS"
  (registration-success) confirmation dialog overlaid on the same
  screenshot — the field's existence and position are confirmed, its worked
  value is not. Modelled as `village`, required (consistent with the other,
  fully-visible members of the same address cascade).
- **Step 11 (p.11):** the "Data Pelaku Usaha" (Business Actor Data) card —
  NIK, Nama, Jenis Kelamin, Nomor Telepon shown as read-only/carried-over from
  the profile above; Email shown with no visible value; then editable NPWP,
  BPJS Ketenagakerjaan, BPJS Kesehatan inputs, each confirmed optional by the
  guide's own caption text ("if you already have them").
- **Step 12 (p.12):** the KBLI classification card — Jenis Kegiatan Usaha
  ("Utama" selected), Bidang Usaha (a combined search field showing
  "56102 - Rumah/Warung Makan" plus an OSS-supplied explanatory note text),
  Ruang Lingkup Kegiatan ("Seluruh" selected).
- **Step 13 (p.13):** Luas Lahan Usaha (worked example 50) + Satuan ("m²"
  selected), Modal Usaha (worked example Rp 200,000,000), "Validasi Risiko"
  button.
- **Step 14 (p.14):** a read-only green result badge ("Skala usaha: Mikro" /
  "Risiko usaha: Rendah") — **not modelled as a field** (source-computed
  output, the same convention this registry uses for computed fee totals and
  risk/scale determinations elsewhere) — followed by the Business Detail
  card: Kegiatan usaha ini sudah berjalan? ("Sudah"/Already selected), Nama
  Usaha/Kegiatan (placeholder "Contoh: Pabrik Sepatu", worked value "Warung
  Makan"), a dropdown-styled input under the header "Deskripsi Kegiatan
  Usaha" whose own visible placeholder/value reads "Kabupaten/Kota" (see
  Judgment call 1 below), and Jumlah Tenaga Kerja Indonesia (worked value 4).
- **Step 15 (p.15):** the Business Location card — Gunakan alamat yang sama
  dengan domisili atau kegiatan usaha sebelumnya? ("Ya"/Yes selected), Alamat
  Usaha (pre-filled/blurred in the worked example), Provinsi ("Jawa Barat"),
  Kabupaten/Kota ("Kab. Bekasi"), Kecamatan ("Cikarang Utara"),
  Desa/Kelurahan ("Mekarmukti"), Kode Pos ("11772") — all six address-cascade
  fields fully visible and unobstructed on this screen, unlike the profile
  screen's own partially-obscured equivalent.
- **Step 16 (p.16):** the Products/Services card — Jenis Produk/Jasa (a
  category dropdown, "Lainnya"/Other selected) immediately followed by a
  second field sharing the identical section header "Jenis Produk/Jasa" but
  rendered as a free-text box (worked value "Nasi Rames") — see Judgment call
  2 below — then Kapasitas (worked value 20,000, fixed "/ Tahun" suffix) and
  Satuan Kapasitas ("Kursi"/seats selected), followed by two Yes/No
  (Tidak/Ya) questions: "Apakah Anda sudah memiliki sertifikat Standar
  Nasional Indonesia (SNI)?" and "Apakah Anda sudah memiliki sertifikat
  halal?", both shown answered "Tidak" (No) in the worked example.
- **Step 17 (p.17):** "Pernyataan Mandiri" (Self-Declaration) — a single
  checkbox "Saya sudah membaca dan menyetujui" (I have read and agree)
  gating five listed commitments (K3L safety/health/environment; willingness
  to fulfil obligations; willingness to undergo halal certification; a
  Micro/Small Business spatial-planning statement; and an SPPL
  environmental-management statement), with a "Simpan" (Save) button.
- **Step 18 (p.18):** "Daftar Produk / Jasa" recap card with a "+ Tambah
  Produk / Jasa" (add another product/service) action — confirms the
  products/services list is genuinely repeatable, **not modelled** (single
  product/service instance only, pending GSP-0009 composite/repeating
  values, the same discipline used throughout this registry — see Judgment
  call 3).
- **Step 20 (p.20):** the final "Cetak NIB" (Print NIB) certificate — a
  read-only government-issued output document, **not modelled** as an
  applicant-input field.
- **Steps 1-2, 4-6, 10, 19 (pp.1-2, 4-6, 10, 19):** app install/navigation,
  WhatsApp OTP-code display, the post-registration "Masuk" (login) screen,
  and the "select KBLI for which the business license will be processed"
  navigation screen — none show applicant-input fields beyond what is
  already modelled elsewhere in this schema; not modelled as separate steps.

## Judgment calls / scope cuts (read before reviewing)

1. **`businessActivityDescription`'s visible content does not match its own
   section header — flagged, not fixed.** The Business Detail screen's
   second input (p.14) sits under the header "Deskripsi Kegiatan Usaha"
   (Business Activity Description) but its own input box displays the text
   "Kabupaten/Kota" (Regency/City — the exact label used for the unrelated
   address-cascade field elsewhere in this same wizard) and carries a
   dropdown affordance rather than a free-text one. This could be a reused
   UI component bug in the live OSS app itself, or a stale/mismatched
   screenshot in the guide. Rather than silently modelling a clean
   "description" text field or silently dropping it, this document keeps the
   field (named by its own section header, the only clearly legible label)
   and states the discrepancy explicitly in its own `description`. A future
   reviewer with live-app access should confirm the field's true label and
   input shape.
2. **`productServiceName`'s label is inferred from position, not confirmed
   text.** The Products/Services screen (p.16) shows two consecutive input
   groups both headed "Jenis Produk/Jasa" — the first a dropdown (category:
   "Lainnya"), the second a free-text box (worked value "Nasi Rames"). The
   second field's own distinct label (something like "Nama Produk/Jasa",
   Product/Service Name) is never shown; this document infers it from the
   field's position and free-text shape, not from directly-read text. A
   future reviewer with live-app access should confirm the true label.
3. **No array/repeating-field type (GSP-0009).** The wizard's own "Tambah
   Bidang Usaha" (add another KBLI) and "+ Tambah Produk / Jasa" (add another
   product/service) actions (pp.18-19) confirm a single NIB may carry
   multiple KBLI codes and multiple product/service lines. This document
   models exactly one of each — the worked example's own scope — the same
   discipline already used throughout this registry pending GSP-0009.
4. **Account-credential and navigation screens excluded.** Password/
   Konfirmasi Password (p.7), the WhatsApp OTP verification code itself
   (pp.4-6), and the post-registration "Masuk" login screen (p.10) are
   excluded — no other document in this registry models account-login
   credentials or ephemeral verification codes as durable application
   fields.
5. **Risk/scale validation output excluded.** The "Skala usaha"/"Risiko
   usaha" result badge (p.14) is a source-computed output of
   `businessLandArea` and `businessCapital`, not itself applicant input — the
   same convention this registry uses for computed fee totals elsewhere
   (e.g. `ae/icp/emirates-id-replacement`'s excluded fee-summary screen).
6. **Undocumented dropdown option lists.** `gender`, `province`,
   `businessActivityType`, `businessActivityScope`, `businessLandAreaUnit`,
   `productServiceCategory`, and `productionCapacityUnit` each show only
   their selected value in the worked example's screenshot — no full option
   list is ever expanded on-screen. Per the discipline already established
   throughout this registry (e.g. `ae/icp/emirates-id-replacement`'s
   `preferredLanguage`/`passportType`/`deliveryMethod`), none of these are
   modelled as `enum`; each is `type: "string"` with a description stating
   only the confirmed selected value. `province` in particular is not
   modelled as an enum despite Indonesia's ~38 provinces being a fixed list,
   because (unlike the UAE's 7-emirate precedent this registry has reused by
   analogy elsewhere) a 38-member list is not "small" enough to safely
   reproduce from memory rather than from the source itself.
7. **`village`'s worked-example value is unconfirmed; its existence and
   label are.** See "What was confirmed directly" above (Step 9) — the
   success-dialog overlay in the source screenshot covers this one value,
   not the field itself.
8. **`email` modelled as optional, not confirmed either way.** See "What was
   confirmed directly" above (Step 11) — the Business Actor Data screen's
   Email row shows no visible value, so this document cannot confirm whether
   it is genuinely a blank optional input or a locked/pre-filled field like
   its NIK/Name/Gender/Phone neighbours on the same card.
9. **Scoped to Individual/UMK, not Non-UMK/business-entity registration.**
   This guide's own title and its opening screen ("Pendaftaran hanya untuk
   pelaku usaha Mikro dan Kecil (UMK) orang perseorangan. Bagi jenis pelaku
   usaha lainnya, silakan mendaftar melalui situs oss.go.id") confirms it is
   scoped to natural-person Micro/Small Business applicants only; a
   Non-UMK/legal-entity (PT/CV/Yayasan) NIB registration pathway exists on
   the full oss.go.id web portal but is a distinct, unscreened flow — see
   "Known gaps" in CATALOG.md's own update for this cycle.

## Path to a `verified` claim (next step)

1. Independently re-fetch the same PDF and re-render/re-read each cited page,
   confirming every field `sourceRef` against the actual screenshot.
2. Confirm OSS RBA has not since published a newer guide revision superseding
   this one, and that the guide's own URL (`oss.go.id/en/panduan/635970086345c7d71a814499`)
   still resolves to it.
3. Obtain access to the live OSS RBA system (requires a real Indonesian NIK
   and WhatsApp-verifiable mobile number) to: confirm or replace the
   `string`-typed dropdown fields with real `enum` option lists; resolve the
   `businessActivityDescription` label/shape discrepancy (judgment call 1);
   confirm `productServiceName`'s true label (judgment call 2); confirm
   `village`'s worked value and `email`'s true requiredness/lock state
   (judgment calls 7-8).
4. Per this registry's `structural-reference` maturity convention, advancing
   `maturity.criteria.verifiedSchema`/`agentReadySchema` beyond a second
   reviewer's field-by-field pass requires live-app execution testing, not
   just source re-verification.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01** (~6
months). Re-check the source, and confirm no newer guide revision has been
published, on or before that date and on any `source.url` change.
