# Verification record — tr/nvi/loss-of-turkish-citizenship-by-right-of-option-application@1.0.0

## Candidate selection

GOV-4883 ("GovSchema Standard Research"). Nine prior cycles
(GOV-4818/GOV-4825/GOV-4832/GOV-4839/GOV-4846/GOV-4853/GOV-4860/GOV-4868/
GOV-4875) have progressively authored Vat-3, Vat-9, Vat-6, Vat-4, Vat-5,
Vat-11, Vat-8, Vat-1, and Vat-2 from the same NVI citizenship-forms
listing page, leaving only **VAT-7** and **VAT-10** as open, unscreened
backlog. This cycle re-scraped the NVI's `vatandaslik-ile-ilgili-formlar`
listing page fresh and fetched both remaining forms directly:

- **VAT-7** — "Türk Vatandaşlığının Evlat Edinilme Yoluyla Kazanılması
  Başvuru Formu" (Acquisition of Turkish Citizenship through Adoption),
  1,063,723 bytes, 51 AcroForm widgets.
- **VAT-10** — "Seçme Hakkı ile Türk Vatandaşlığının Kaybı Başvuru Formu"
  (Loss of Turkish Citizenship by Right of Option), 1,063,528 bytes, 62
  AcroForm widgets.

VAT-10 was selected as the stronger candidate on this registry's own
widget-count bar (62 vs. 51). It also closely mirrors the already-authored
Vat-9 (renunciation with permission) — the other "loss of citizenship"
form in this family — letting this schema reuse Vat-9's established field
model directly rather than deriving a new one from scratch. VAT-7 remains
open, unscreened backlog for a future cycle.

## Reaching the live source

- **Form Vat-10**:
  `https://www.nvi.gov.tr/kurumlar/nvi.gov.tr/mevzuat/nufusmevzuat/Formlar/Vatandaslik/Vat10-FormSecmeHakkiIleTurkVatKaybi.pdf`
  — confirmed live directly from NVI's own current
  `nvi.gov.tr/vatandaslik-ile-ilgili-formlar` listing page (`href` scraped
  fresh this cycle), HTTP 200, `Content-Type: application/pdf`,
  `Content-Length: 1063528` bytes (matches the downloaded file exactly),
  sha256
  `457c4bc0847199b2772b3a9b9ad5fc6d4b9b31635d0ebbe931d1950c17e0f040`,
  `Last-Modified: Tue, 04 Aug 2020 08:33:58 GMT`, no login/CAPTCHA gate.
  Retrieved 2026-07-25.
- Field structure extracted with `pdfjs-dist`'s `getAnnotations()` (62
  AcroForm widgets, single page) and cross-checked against the page's own
  text layer (`getTextContent()`) for label order and legal-basis wording.
- Legal basis: Law No. 5901 on Turkish Citizenship (Türk Vatandaşlığı
  Kanunu), Article 34 — the form's own closing declaration cites this
  article by number ("5901 sayılı Türk Vatandaşlığı Kanununun 34'üncü
  maddesine göre seçme hakkı ile Türk vatandaşlığını kaybetmek
  istiyorum").

## Findings / disclosed scoping calls

1. **The same mislabeled-tooltip bug already disclosed on the Vat-9
   sibling's own VERIFICATION.md recurs verbatim on this form.** The
   minor-children table's `Cinsiyet_3`/`Cinsiyet_4`/`Cinsiyet_5` and
   `Din_3`/`Din_4`/`Din_5` widgets all carry the identical
   `alternativeText` tooltip "Eğitim Durumu" (education level) rather
   than their own row label — evidently a copy-paste artifact from the
   applicant's own education-level field, propagated across this entire
   VAT form family rather than unique to any one form. Resolved the same
   way as every prior instance: by the widget's own internal field name
   (`Cinsiyet`/`Din`, matching the applicant-block field of the same
   name) and its rendered position directly beneath each child's
   Doğum Tarihi (birth-date) boxes, in the same left-to-right column
   order as the identity/name/parentage fields above it — not by tooltip
   text. All 62 widgets on the page were enumerated and every one
   assigned to exactly one of the 48 logical fields below, confirming no
   widget was left unaccounted for.
2. **This form runs the same Article 21/right-of-option mechanism as the
   already-modelled `acquisition-of-turkish-citizenship-by-right-of-option-application`
   (Vat-8) in the opposite direction** — Vat-8's applicant elects to
   *gain* citizenship by option; this form's applicant, who is already a
   Turkish citizen, elects to *lose* it, under the distinct Article 34
   (not Article 21). The two forms share no field-level structure beyond
   the generic identity/contact block common to the whole VAT family.
3. **Field model reused directly from the Vat-9 sibling** (the other
   "loss of citizenship" form in this family, filed under Article 25):
   `identityNumber` (T.C. Kimlik No, pattern `^[1-9][0-9]{10}$` — the
   applicant is a current citizen, not a foreign national receiving a
   fresh identity number), `newNationality` (the non-Turkish nationality
   the applicant holds or is acquiring in place of citizenship),
   `submittedToOffice`/`submittedToOfficeType` (free-text office name
   plus a 2-value `consulate_general`/`governorate` enum, matching the
   source's own `BAŞKONSOLOSLUĞUNA`/`VALİLİĞİNE` dropdown, in the same
   order as Vat-9's), a single-field `birthPlace` (no separate country or
   descent column on this form), collapsed `phoneNumber` and
   `emailAddress` fields (each visually split across two boxes on the
   source), and a 2-value `sex` enum (`male`/`female`) sourced from the
   applicant's own Erkek/Kadın radio-button pair — confirmed directly
   against this form's own widgets (`buttonValue: "Erkek"` at x≈164,
   `buttonValue: "Kadın"` at x≈206, matching the printed "Erkek Kadın"
   text order).
4. **`childXSex` is also modelled as the same 2-value enum**, even though
   the minor-children table's own AcroForm widgets for this column
   (`Cinsiyet_3`/`_4`/`_5`) are plain text boxes, not radio buttons —
   consistent with the Vat-3/Vat-9 precedent already established for this
   registry's "minor children" table type.
5. **The 3-column minor-children table is modelled as bounded-slot
   `child1`/`child2`/`child3` fields (10 fields per child, 30 total), all
   optional** — the same bounded-slot precedent this registry's VAT
   siblings established. The form provides exactly 3 columns (widget
   suffixes `_3`/`_4`/`_5`, left-to-right by x-coordinate) and states no
   overflow procedure.
6. **`educationLevel`, `occupation`, and `religion` are left optional**
   (no explicit required marker on the form for these three), matching
   every other VAT sibling's treatment of the identical fields. All other
   applicant-block fields are `required: true`.
7. **Out of scope**: the header's office-completed registration
   date/number, the biometric-photograph box, and the closing
   `Başvuran Ad`/İmza (printed name/signature) line — the same
   convention every VAT sibling in this registry applies.
   `declarationDate` (the date accompanying the signature, printed as
   separate Gün/Ay/Yıl boxes) is kept in scope as applicant-provided
   data, distinct from the signature mark itself.
8. This closes the last of the GOV-4818-banked VAT candidates on this NVI
   page except **VAT-7** (acquisition through adoption), which was
   screened this same cycle (51 widgets, byte-identical fetch confirmed
   live) but not authored — the single remaining open, unscreened backlog
   item for a future National ID & Civic Documents companion-schema
   cycle. Türkiye remains 1 of 6 verticals open — this is a tenth schema
   within that already-open vertical, not a new vertical or jurisdiction.

## Conformance

2 valid mock scenarios — `valid-minimal-no-children-governorate`
(exercising only the 15 unconditionally-required fields, filed
domestically with a Governorate) and
`valid-consulate-general-with-three-children` (filed with a Consulate
General abroad, exercising every optional field plus all 3 children
columns fully filled) — plus 15 static-`required`-field mutation fixtures
(one per required field) and 1 unknown-field-rejected fixture — 18
fixtures total, committed under
`conformance/tr/nvi/loss-of-turkish-citizenship-by-right-of-option-application/1.0.0/`.

This schema has no `requiredWhen` conditional-requirement gates, so no
mutation-requiredwhen fixtures apply.

An ephemeral, from-scratch conformance checker (deriving required-field
rules directly from this schema's own `fields[]`, discarded after use,
not committed) ran all 18 fixtures: both valid scenarios at 0
missing-field errors, every mutation fixture raising exactly the one
error it targets, and the unknown-field fixture's extra key correctly
flagged. Validated clean with `node tools/validate.mjs` and
`node tools/validate-ajv.mjs`, individually and as part of the full
registry run. `registry-index.json` regenerated via `npm run build-index`
in `tools/govschema-client/`.
