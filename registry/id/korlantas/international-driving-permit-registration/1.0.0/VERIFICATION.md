# Verification record — `id/korlantas/international-driving-permit-registration` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-07`

This is a standing `GovSchema Standard Research` cycle (**GOV-1553**), tasked
with opening Indonesia's DMV vertical — the only vertical Indonesia lacked
after `id/bkpm/oss-nib-registration-individual-umk` (GOV-1546) opened the
jurisdiction with Business Formation alone. The document was derived from a
**directly-read primary source**: Korlantas POLRI's own live, unauthenticated
"SIM Internasional" (International Driving Permit) online registration
portal, whose static HTML embeds the full registration form's field markup.
It remains `draft`, not `verified`, pending a second reviewer's independent
pass and a live end-to-end submission (not performed here, to avoid creating
a real registration record in a government system).

## Candidates screened, and why this one was picked

Three candidates were screened before this one, in the order the research
brief itself suggested:

1. **First-time national SIM (driving licence) issuance.** The governing
   regulation, **Peraturan Kepolisian Negara Republik Indonesia (Perpol) No. 5
   Tahun 2021** tentang Penerbitan dan Penandaan Surat Izin Mengemudi,
   retrieved directly from `korlantas.polri.go.id` (HTTP 200, no
   login/CAPTCHA/WAF), is a genuine 34-page text-layer PDF — but it is
   **body-regulation text only**: no lampiran (appendix) form is attached (the
   PDF ends at its own final signature page, p.34). Its amendment,
   **Peraturan Kepolisian No. 2 Tahun 2023** (retrieved from
   `peraturan.bpk.go.id`, 12 pages), adds only a BPJS Kesehatan
   participation-status definition, again with no attached form. The only
   online channel for first-time SIM issuance is the "Digital Korlantas
   POLRI" mobile app (SINAR), which requires full account creation (phone
   number + OTP, a 6-digit PIN, NIK/name/email, and E-KTP facial-liveness
   verification) before any application-data screen becomes reachable, and no
   downloadable user-guide PDF analogous to `id/bkpm`'s OSS guide was found
   (`digitalkorlantas.polri.go.id`, `korlantas.polri.go.id/panduan-sim`, and
   web search all checked). Rejected as a source: checklist-level only, no
   field-level detail reachable without creating a real account.
2. **Vehicle registration (STNK/BPKB, Regident Ranmor).** The governing
   regulation, **Peraturan Kepolisian No. 7 Tahun 2021** tentang Registrasi
   dan Identifikasi Kendaraan Bermotor, retrieved both from
   `korlantas.polri.go.id` (a 107-page scanned/text-layer mix) and
   `peraturan.bpk.go.id` (an 80-page pure-text mirror), attaches only a
   province-by-province vehicle-plate regional-code lookup table (pp. 81-106
   of the 107-page version) as its lampiran — not an application form. The
   citizen-facing guidance page (`korlantas.polri.go.id/panduan-stnk`) is
   checklist-level prose ("Mengisi formulir permohonan", "Melampirkan tanda
   bukti identitas...") with no field-by-field detail, the same weakness this
   catalog has flagged for other jurisdictions' Passport gaps. Korlantas'
   ERI (Electronic Registration and Identification) system link found on
   `korlantas.polri.go.id/peraturan/` (`rc.korlantas.polri.go.id:8900/eri2017/...`)
   is an internal reporting portal, not a citizen-facing registration wizard.
   Rejected as a source for the same reason as (1).
3. **National SIM renewal (Perpanjangan SIM Nasional) via SINAR.** The
   `digitalkorlantas.polri.go.id` FAQ and `/sim/` pages (both unauthenticated,
   fetched directly) do describe this pathway step-by-step with genuine
   field-level detail (documents required, a 480×640px/100KB photo spec,
   BNI virtual-account payment, POS Indonesia delivery vs. self-pickup, a
   refund bank account, SATPAS selection from a list of ~150 offices). This
   was a strong, real candidate and is cited here as background/cross-check,
   but candidate 4 below was found to be stronger still: candidate 3's field
   *names* are prose-described ("masukkan NIK", "unggah dokumen..."), not
   read from live form markup, whereas candidate 4 exposes actual
   machine-readable field names directly in its own HTML.
4. **SIM Internasional (International Driving Permit) registration —
   selected.** `siminternasional.korlantas.polri.go.id` is a live, distinct
   Korlantas POLRI web application (not the mobile-only Digital Korlantas
   app) whose "Daftar" (Register) button opens a Bootstrap modal
   (`#verify-modal`, titled "Registrasi SIM Internasional") whose HTML is
   present in full in the page's own static markup — no login required to
   view it, no JavaScript execution needed to read the field names, labels,
   `<select>` option lists, or `maxlength` attributes. This is the strongest
   source found this cycle: genuine live application-form markup, not a
   screenshot, PDF, or prose paraphrase.

## Source examined

- **Document `(id, version)`:** `id/korlantas/international-driving-permit-registration` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Traffic Police Corps of the Indonesian National Police
  (Korlantas POLRI)
- **Primary source (directly retrieved, HTTP 200, no login):**
  <https://siminternasional.korlantas.polri.go.id/> — live "SIM Internasional"
  registration portal; its own embedded "Registrasi SIM Internasional" form
  markup (`<form id="form-verifikasi">`, action
  `https://siminternasional.korlantas.polri.go.id/index.php/home/index`,
  method POST) was read directly, field by field, from the page's raw HTML.
- **Companion source (directly retrieved, HTTP 200, no login):**
  <https://siminternasional.korlantas.polri.go.id/assets/doc/persyaratan_pendaftaran.pdf>
  — the portal's own "Unduh" (Download)-linked illustrated requirements
  document, a genuine 2-page text-layer PDF, cross-checked against the same
  page's own inline "Persyaratan Pendaftaran" (Registration Requirements)
  prose section (identical wording in both places).
- **Background/legal-basis sources (directly retrieved, HTTP 200, no
  login):** Peraturan Kepolisian No. 5 Tahun 2021 (SIM classes and age
  requirements, Pasal 3/7/8, used only to annotate `nationalLicenceClass`'s
  own description, not as a field source itself), and PP No. 76 Tahun 2020
  tentang Tarif PNBP Polri (cited by the source page itself as the legal
  basis for its stated fee amounts; PP 76/2020's own tariff schedule/lampiran
  was not independently re-fetched to re-derive the Rp250,000/Rp225,000
  figures — they are taken from the source page's own statement).
- **Retrieved / reviewed:** 2026-07-07
- **Reviewer:** GovSchema Engineering (initial authoring source-review); independently
  re-verified 2026-07-07 by GovSchema Engineering (Review Engineer, review gate
  GOV-1556 / PR #261) — re-fetched the live portal and requirements PDF directly,
  confirmed all 6 field definitions, the two `display:none` fields, and the
  `kitap`/`existingInternationalLicence` no-gating-field claim; found and disclosed
  one additional gap (judgment call 7, `issuingCounter`'s coded-vs-label value)

## Field inventory (Phase 3)

Every field below was read directly from the live page's own HTML markup —
`name`/`id` attributes, `<label>` text, `<option>` values, and `maxlength`/CSS
class constraints — not inferred from a screenshot or paraphrase.

| Field (schema `name`) | Source input id | Label (source) | Example valid value |
|---|---|---|---|
| `fullName` | `nama_lengkap` | NAMA LENGKAP | `"BUDI SANTOSO"` |
| `nationalLicenceClass` | `golongan_sim_nas` | GOLONGAN SIM | `"A"` |
| `nationalLicenceNumber` | `no_sim_nas` | NOMOR SIM | `"930119120001"` |
| `issuingCounter` | `gerai_id` | SATPAS SIM INTERNASIONAL | `"KORLANTAS POLRI"` |
| `appointmentDate` | `tanggal_registrasi` | TANGGAL KEDATANGAN | `"2026-08-15"` |
| `paymentMethod` | `jenis_reg` | PEMBAYARAN | `"ONLINE"` |

`documents[]` (all read from the same page's "Persyaratan Pendaftaran"
section and its linked `persyaratan_pendaftaran.pdf`):

| Document `id` | What it is | Required? |
|---|---|---|
| `recentPhoto` | Recent self photo, white background, 2 shirt buttons visible, no glasses, JPG/JPEG ≤500KB | Yes |
| `ktp` | Indonesian electronic ID card | Yes (WNI/citizen applicants) |
| `kitap` | Permanent stay permit card | Conditional (WNA/foreign nationals only, by description) |
| `passport` | Valid passport | Yes |
| `nationalDrivingLicence` | Valid national SIM matching `nationalLicenceClass` | Yes |
| `signature` | Signature on white paper, black ink | Yes |
| `existingInternationalLicence` | Existing valid International Driving Permit | Conditional (renewal only, by description) |
| `registrationFee` | PNBP fee: Rp250,000 new / Rp225,000 renewal + variable courier fee | Yes |

## Access notes and judgment calls

1. **`nationalLicenceClass`'s enum omits SIM classes CI, CII, D, and DI.**
   The live `<select id="golongan_sim_nas">` lists exactly seven options: A,
   A Umum, BI, BI Umum, BII, BII Umum, C. Peraturan Kepolisian No. 5 Tahun
   2021 Pasal 3 defines eleven national SIM classes in total (adding CI,
   CII, D, and DI). This document models only the confirmed, complete
   dropdown as it exists on the live source today — it does not assert
   whether the four omitted classes are genuinely ineligible for conversion
   to an International Driving Permit (plausible, since the Vienna
   Convention's Annexe 7 categories are narrower than Indonesia's own
   domestic classification) or simply not yet added to this form.
2. **`appointmentDate` and `paymentMethod` sit inside `style="display:none"`
   containers in the page's static markup.** Both fields' labels, ids, and
   (for `paymentMethod`) option values were read directly from the live
   source's own HTML — they are not fabricated — but their containing `<div>`
   elements carry an inline `display:none` style in the initial page load,
   most consistent with being revealed by client-side script after another
   field (most likely `issuingCounter`) is completed, rather than being
   genuinely inapplicable. This was not re-tested with JavaScript execution
   (no browser automation was run against this live government registration
   system, to avoid submitting real or near-real data), so this document
   cannot independently confirm every applicant reaches both fields under
   identical conditions.
3. **`kitap` and `existingInternationalLicence` are modelled as
   description-conditional, not `requiredWhen`-conditional.** The source's
   own requirements list marks both with the same required asterisk as
   the unconditional items, restricted respectively to foreign-national
   (WNA) applicants and to renewal applicants — but the live registration
   form itself exposes no nationality-selection field and no new-vs-renewal
   selector field to gate either one structurally. Rather than fabricate a
   gating field the source does not expose, both are modelled as
   `required: false` with the condition stated in their own `label` text —
   the same discipline this registry has applied elsewhere when a source
   states a conditional requirement without exposing the gating input
   itself.
4. **Fee amounts are as stated by the source page, not independently
   re-derived.** `registrationFee` cites Rp250,000 (new) / Rp225,000
   (renewal), attributed by the source itself to PP No. 76 Tahun 2020. The
   PP 76/2020 PDF retrieved from `korlantas.polri.go.id` (11 pages) is only
   the regulation's own enactment text, not its tariff-schedule lampiran;
   the schedule itself was not located and cross-checked, so these two
   figures are trusted from the live source's own statement only.
5. **Subsequent steps (delivery/pickup method, refund bank account) are
   deliberately not modelled.** The page's own "Pendahuluan" (Introduction)
   step list confirms these steps exist ("Memilih cara pengambilan/
   pengiriman Buku SIM Internasional", "Mengisi Data Rekening Pengembalian
   ...") but their own field markup is not present in the initial page load
   — it renders only after the first modal ("Registrasi SIM Internasional")
   is actually submitted with real applicant data, which this review did not
   do. Excluded rather than guessed at.
6. **`jenis_reg`'s two values are as literally coded in the source
   (`ONLINE`/`OFFLINE`), not translated.** The visible label text reads
   "Online" and "Offline (Walk in)"; the underlying `value` attributes
   (which this document uses as the field's actual accepted values, per this
   registry's convention of using source-coded values where the source
   itself defines them) are the upper-case strings shown.
7. **`issuingCounter`'s modelled value (`KORLANTAS POLRI`) is the option's
   label text, not its raw `value` attribute — a disclosed deviation from
   the source-coded-value convention applied to `golongan_sim_nas` and
   `jenis_reg`.** Independent re-verification (2026-07-07, review gate
   GOV-1556) confirmed the live `<select id="gerai_id">`'s only real,
   non-placeholder `<option>` is `<option value="2">KORLANTAS POLRI</option>`
   — i.e. the form actually submits `2`, not the string `KORLANTAS POLRI`,
   for this field. This document deliberately models the human-readable
   label instead, since `2` is an opaque internal reference code with no
   meaning of its own and there is exactly one real destination facility to
   name; this is flagged here, rather than silently left inconsistent with
   the other two enum fields' convention, so a future reviewer or
   schema-driven form-filler is not surprised if they compare this field
   against the live source's raw HTML.
8. **SIM Nasional renewal (SINAR/Digital Korlantas POLRI) was read and
   cross-checked but not used as the primary source.** Its own field-level
   detail (documents, photo pixel/size spec, delivery/payment steps) is
   real and unauthenticated, and is cited above as a rejected-but-considered
   candidate; it was not chosen because its field *names* are only
   prose-described in FAQ/step text, not exposed as literal form markup the
   way `siminternasional.korlantas.polri.go.id`'s own HTML exposes
   `nama_lengkap`, `golongan_sim_nas`, etc.

## Test run with mock data (Phase 3)

A complete, internally consistent mock applicant packet was assembled at
`conformance/id/korlantas/international-driving-permit-registration/1.0.0/application-packet.json`
(+ human-readable `.txt` rendering), using only values valid under this
schema's own field constraints (a fabricated Indonesian name in the
uppercase style the source's own input transform produces, a confirmed
`nationalLicenceClass` enum member, a ≤16-character licence number, the
single confirmed `issuingCounter` value, a future ISO `appointmentDate`,
and the `ONLINE` `paymentMethod` value) — a first-time (non-renewal),
Indonesian-citizen (non-WNA) scenario, so `kitap` and
`existingInternationalLicence` are correctly marked not-applicable in the
packet's own document checklist rather than fabricated.

The packet was validated with a small throwaway Node script (not committed)
that re-implements this schema's own `validation` constraints (`type`,
`enum`, `maxLength`, `pattern`, `minimum`/`maximum`) field-by-field against
`schema.json`'s `fields[]` array and flags unknown/missing keys. Result:

```
PASS — all 6 fields checked, 6 present in payload, all constraints satisfied.
```

The full registry conformance suite was also re-run after adding this
schema: `node tools/validate.mjs` (structural/meta-schema check) and
`node tools/validate-ajv.mjs` (draft 2020-12 ajv validation) both report
this document `ok`, with the full registry's aggregate count moving from
248/248 to 249/249.

## Path to a `verified` claim (next step)

1. Independently re-fetch `siminternasional.korlantas.polri.go.id` and
   re-read the live "Registrasi SIM Internasional" modal's markup, confirming
   every field `sourceRef` still matches.
2. Execute the flow with real applicant credentials (or, at minimum, with
   browser automation up to but not including submission) to observe the
   `appointmentDate`/`paymentMethod` fields' actual reveal condition, and the
   delivery-method/refund-account step that follows initial submission
   (judgment calls 2 and 5).
3. Re-fetch PP No. 76 Tahun 2020's own tariff-schedule lampiran to
   independently corroborate the Rp250,000/Rp225,000 fee figures (judgment
   call 4).
4. Per this registry's `structural-reference` maturity convention, advancing
   `maturity.criteria.verifiedSchema`/`agentReadySchema` beyond a second
   reviewer's field-by-field pass requires live-system execution testing,
   not just source re-verification.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-07** (~6
months). Re-check the source, and confirm no newer form revision has been
published, on or before that date and on any `source.url` change.
