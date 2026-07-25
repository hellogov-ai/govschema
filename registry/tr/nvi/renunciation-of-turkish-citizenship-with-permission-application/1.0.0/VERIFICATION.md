# Verification record — tr/nvi/renunciation-of-turkish-citizenship-with-permission-application@1.0.0

## Candidate selection

GOV-4825 ("GovSchema Standard Research"). The GOV-4818 cycle opened
Türkiye as the registry's 100th jurisdiction via Form Vat-3 (general
acquisition of citizenship), confirming all five other verticals as dead
ends and banking the remaining VAT-1/2/4-11 forms on the same NVI page as
future National ID & Civic Documents companion-schema candidates. That
cycle specifically flagged **VAT-9** ("Renunciation of Citizenship with
Permission") as a simpler ~62-field fallback candidate, scouted but not
authored. This cycle re-fetched VAT-9 fresh and authored it directly as
this v1.0.0, closing that banked fallback.

## Reaching the live source

- **Form Vat-9**:
  `https://www.nvi.gov.tr/kurumlar/nvi.gov.tr/mevzuat/nufusmevzuat/Formlar/Vatandaslik/Vat9-FormIzinAlarakTurkVatCikma.pdf`
  — confirmed live directly from NVI's own current
  `nvi.gov.tr/vatandaslik-ile-ilgili-formlar` listing page (`href` scraped
  fresh this cycle, not reused from the banked GOV-4818 record), HTTP
  200, `Content-Type: application/pdf`, `Content-Length: 1063612` bytes
  (matches the downloaded file exactly), sha256
  `13782150337782532aa58952192e10bbb9faf0f952e4cc6c87c2e8aa2a7d26d0`,
  `Last-Modified: Tue, 04 Aug 2020 08:33:49 GMT`, no login/CAPTCHA gate.
  Retrieved 2026-07-25.
- Field structure extracted with `pdfjs-dist`'s `getAnnotations()` (62
  AcroForm widgets on a single page). The page was additionally rendered
  at scale 2.5 via `node-canvas` and visually inspected, since several
  widgets' own `alternativeText` tooltips are miscopied placeholders from
  a different field type (e.g. the minor-children table's `Cinsiyet_3`/
  `Cinsiyet_4`/`Cinsiyet_5` and `Din_3`/`Din_4`/`Din_5` widgets all carry
  the tooltip "Eğitim Durumu" rather than their own row label) — resolved
  by matching each field's rendered position against the visible table
  row/column header it actually sits under ("Cinsiyeti" and "Dini" rows),
  not by tooltip text.
- Legal basis: Law No. 5901 on Turkish Citizenship (Türk Vatandaşlığı
  Kanunu), Article 25 — the form's own closing declaration cites this
  article by number ("5901 sayılı Türk Vatandaşlığı Kanununun 25'inci
  maddesine göre izin almak suretiyle Türk vatandaşlığından çıkmak
  istiyorum").

## Findings / disclosed scoping calls

1. **The applicant here is a current Turkish citizen, not a foreign
   national** — the opposite direction from Vat-3 (acquisition). The
   form's own identity field is a genuine `T.C. Kimlik No` (11-digit
   national identity number), not the `99...`-prefixed foreign identity
   number Vat-3 captures; modelled as `identityNumber` with pattern
   `^[1-9][0-9]{10}$`, distinct from Vat-3's `foreignIdentityNumber`.
2. **`submittedToOffice`/`submittedToOfficeType` split, unlike Vat-3's
   single `submittedToGovernorate`** — Vat-9's salutation-line dropdown
   offers two mutually exclusive destinations, `BAŞKONSOLOSLUĞUNA`
   (Consulate General, for applicants residing abroad) and `VALİLİĞİNE`
   (Governorship, domestic), reflecting that renunciation applicants are
   commonly filing from outside Türkiye — Vat-3's own salutation line
   only offers the Governorship. Modelled as a free-text office-name
   field plus a 2-value enum, rather than collapsing to one string, since
   the two are visually and semantically distinct inputs on this form.
3. **`birthPlace` is a single field**, unlike Vat-3's three-way
   `birthPlaceName`/`birthCountry`/`descentOrLineage` split — Vat-9's
   printed "Doğum Yeri" block is one plain text box spanning the full
   row width, with no separate country or "Soyu" (descent) column on
   this form.
4. **`phoneNumber` and `emailAddress` each collapse a visually-split pair
   of input boxes into one field**, matching Vat-3's own precedent — the
   source prints a parenthetical area-code box before the phone number
   and splits the email box around a fixed, non-editable "@" glyph.
5. **`sex` is a 2-value enum (`male`/`female`)** derived from the
   applicant's own radio-button checkbox pair (Erkek/Kadın); **`childXSex`
   is also modelled as the same enum** even though the minor-children
   table's own AcroForm widgets for this column are plain text boxes, not
   radio buttons — consistent with Vat-3's established precedent for the
   same "minor children" table type (its own `child1Sex`/`child2Sex`/
   `child3Sex` fields are likewise enums over a text-typed source widget).
6. **The 3-column minor-children table is modelled as bounded-slot
   `child1`/`child2`/`child3` fields (10 fields per child), all
   optional** — the same bounded-slot precedent Vat-3 established for
   this registry (e.g. `us/uscis/naturalization-n400`'s `child1Name`/
   `child2Name`/`child3Name`, and Vat-3's own children table). The form
   provides exactly 3 columns and states no further overflow procedure.
7. **`educationLevel`, `occupation`, and `religion` are left optional**
   (no explicit required marker on the form for these three, matching
   Vat-3's treatment of the identical fields on its own applicant block).
   All other applicant-block fields are `required: true`.
8. **Out of scope**: the header's office-completed registration
   date/number, the biometric-photograph box, and the closing
   `Ad Soyad`/`İmza` (printed name/signature) line — the same widget
   (`Başvuran Ad`, id `519R`) that Vat-3 excludes for its own equivalent
   line, per this registry's established flat-PDF convention.
   `declarationDate` (the date accompanying the signature) is kept in
   scope as applicant-provided data, distinct from the signature mark
   itself.
9. This closes the GOV-4818-banked VAT-9 fallback candidate. VAT-1, VAT-2,
   and VAT-4 through VAT-8 and VAT-10/VAT-11 remain open, unscreened
   backlog candidates on the same NVI page for a future companion-schema
   cycle. Türkiye remains 1 of 6 verticals open (National ID & Civic
   Documents) — this is a second schema within that already-open
   vertical, not a new vertical or jurisdiction.

## Conformance

2 valid mock scenarios — `valid-minimal-no-children-governorate`
(exercising only the 15 unconditionally-required fields, filed
domestically with a Governorate) and
`valid-consulate-general-with-three-children` (filed with a Consulate
General abroad, exercising every optional field plus all 3 children
columns fully filled) — plus 15 static-`required`-field mutation fixtures
(one per required field) and 1 unknown-field-rejected fixture — 18
fixtures total, committed under
`conformance/tr/nvi/renunciation-of-turkish-citizenship-with-permission-application/1.0.0/`.

This schema has no `requiredWhen` conditional-requirement gates (unlike
its Vat-3 sibling), so no mutation-requiredwhen fixtures apply.

An ephemeral, from-scratch conformance checker (deriving required-field
rules directly from this schema's own `fields[]`, discarded after use,
not committed) ran all 18 fixtures: both valid scenarios at 0
missing-field errors, every mutation fixture raising exactly the one
error it targets, and the unknown-field fixture's extra key correctly
flagged. Validated clean with `node tools/validate.mjs` and
`node tools/validate-ajv.mjs`, individually and as part of the full
registry run. `registry-index.json` regenerated via `npm run build-index`
in `tools/govschema-client/`.
