# Verification record — tr/nvi/exceptional-acquisition-of-turkish-citizenship-application@1.0.0

## Candidate selection

GOV-4839 ("GovSchema Standard Research"). The GOV-4818 cycle opened
Türkiye as the registry's 100th jurisdiction via Form Vat-3 (general
acquisition of citizenship), confirming all five other verticals as dead
ends and banking the remaining VAT-1/2/4-11 forms on
`nvi.gov.tr/vatandaslik-ile-ilgili-formlar` as future National ID & Civic
Documents companion-schema candidates. GOV-4825 subsequently authored
VAT-9 (renunciation) and GOV-4832 authored VAT-6 (marriage-based
acquisition), leaving VAT-1, VAT-2, VAT-4, VAT-5, VAT-7, VAT-8, VAT-10,
and VAT-11 unscreened field-by-field. This cycle re-scanned the same NVI
listing page fresh, fetched and field-counted all eight still-unauthored
forms via `pdfjs-dist`'s `getAnnotations()`:

| Form | Widgets | Unique field names |
|---|---|---|
| VAT-1 | 87 | 79 |
| VAT-2 | 72 | 68 |
| **VAT-4** | **96** | **92** |
| VAT-5 | 97 | 93 |
| VAT-7 | 51 | 50 |
| VAT-8 | 94 | 90 |
| VAT-10 | 62 | 61 |
| VAT-11 | 108 | 100 |

**VAT-4 — "Exceptional Acquisition of Turkish Citizenship"** was selected
as the strongest remaining candidate. This is the legal basis (Law No.
5901, Article 12) underlying Türkiye's widely known discretionary and
citizenship-by-investment pathways (naturalization at the President's
discretion for foreign nationals who make a qualifying real-estate or
capital investment, provide notable service, or meet other Article-12
criteria) — of the eight remaining candidates it carries the highest
real-world search volume and applicability for AI agents assisting
foreign investors and their counsel, and is structurally close to the
already-modelled Vat-3 (a genuine four-way marital-status/spouse
`requiredWhen` gate, a 3-column minor-children table), letting this cycle
reuse an already-proven pattern with high confidence rather than
introducing a new structural family. VAT-11 has more raw widgets but is
narrowly scoped to a specific bilateral pathway (TRNC citizens acquiring
Turkish citizenship); VAT-5 (re-acquisition) and VAT-8 (acquisition by
right of option) were runners-up but address narrower populations than
the investment/discretionary pathway.

## Reaching the live source

- **Form Vat-4**:
  `https://www.nvi.gov.tr/kurumlar/nvi.gov.tr/mevzuat/nufusmevzuat/Formlar/Vatandaslik/Vat4_Istisnai_Olarak_Kazanma.pdf`
  — confirmed live directly from NVI's own current
  `nvi.gov.tr/vatandaslik-ile-ilgili-formlar` listing page (`href` scraped
  fresh this cycle), HTTP 200, `Content-Type: application/pdf`,
  `Content-Length: 847001` bytes (matches the downloaded file exactly),
  sha256 `ec84952a815bd114b381b77cc9de73e4db3a8962c21cb1b0d62a3ee3e3576acf`,
  `Last-Modified: Tue, 04 Aug 2020 08:33:32 GMT`, no login/CAPTCHA gate.
  Retrieved 2026-07-25.
- Field structure extracted with `pdfjs-dist`'s `getAnnotations()` (96
  AcroForm widgets across 2 pages — all 96 on page 1, page 2 is the
  supporting-documents checklist with no form fields). Because several
  widgets in the minor-children table carry generic or miscopied
  `alternativeText` tooltips (e.g. `Cinsiyet_3`/`Cinsiyet_4`/`Cinsiyet_5`
  and `Din_3`/`Din_4`/`Din_5` all tooltip as `"Eğitim Durumu"`, the same
  miscopy pattern already found on Vat-9's own children table), every
  field was independently resolved by extracting the raw text layer's
  item-level `(x, y)` positions via `getTextContent()` and matching each
  widget's `rect` to the printed row label directly above/beside it — a
  faster, equally rigorous alternative to `node-canvas` rendering for a
  form whose text layer is intact and unscrambled. This confirmed the
  children table's true row order top-to-bottom: `Varsa Yabancı Kimlik No`
  → `Uyruğu` → `Yabancı Adı` → `Yabancı Soyadı` → `Türkçe Adı` →
  **`Alacağı Soyadı`** (surname to be acquired — not "Türkçe Soyadı") →
  `Anne Adı` → `Baba Adı` → `Doğum Yeri` → `Doğum Tarihi` (Gün/Ay/Yıl) →
  `Cinsiyeti` → `Dini`, i.e. Vat-3's own 12-row children-table
  convention, not Vat-6's 11-row variant (Vat-6 has no `Alacağı Soyadı`
  row).
- Legal basis: Law No. 5901 on Turkish Citizenship (Türk Vatandaşlığı
  Kanunu), Article 12 — the form's own closing declaration cites this
  article by number ("5901 sayılı Türk Vatandaşlığı Kanununun 12'nci
  maddesine göre Türk vatandaşlığını istisnai olarak kazanmak
  istiyorum").

## Findings / disclosed scoping calls

1. **All 96 widgets reconcile cleanly to 71 logical `fields[]` + 1
   excluded widget.** 95 non-excluded widgets − 24 widgets folded into
   composite fields = 71 `fields[]`. The folding is entirely accounted
   for: `dateOfBirth` (3→1, applicant), `sex` (2→1, radio pair),
   `phoneNumber` (2→1), `emailAddress` (2→1), `maritalStatus` (4→1,
   4-way radio), `marriageDate` (3→1), `divorceDate` (3→1),
   `spouseDeathDate` (3→1), `spouseDateOfBirth` (3→1),
   `child{1,2,3}DateOfBirth` (3→1 each, ×3), `declarationDate` (3→1) — 24
   widgets saved across these 13 composites. The single excluded widget
   is `Başvuran Ad` (the closing printed-name/signature line), matching
   every sibling schema's own convention.
2. **The applicant's foreign/Turkish-script name split** (`Ad_0`/`Soyad_0`
   → `foreignFirstName`/`foreignLastName`, `Ad_1`/`Soyad_1` →
   `turkishFirstName`/`turkishLastName`) was confirmed via the text-layer
   position match: the printed labels read, top to bottom, "Yabancı Adı /
   Yabancı Soyadı" directly above "Türkçe Adı / Türkçe Soyadı", aligning
   exactly with the `Ad_0`/`Soyad_0` row sitting above the `Ad_1`/`Soyad_1`
   row — the same reuse-of-ambiguous-suffix pattern already documented on
   Vat-6.
3. **A genuine four-way `maritalStatus` with a `requiredWhen`-gated
   spouse block**, reusing Vat-3's exact pattern verbatim rather than
   Vat-6's/Vat-9's single-scenario (always-a-spouse / never-a-spouse)
   treatment: `single`/`married`/`divorced`/`widowed` (source: `Secim_3`,
   a 4-value radio group, per the form's own footnote a/b/c). `Evlenme
   Tarihi` (marriage date) is required whenever `married`, `divorced`, or
   `widowed`; `Boşanma Tarihi` (divorce date) only when `divorced`;
   `Vefat Eden Eşin Ölüm Tarihi` (spouse's death date) only when
   `widowed`. The entire 8-field `Eşe Ait Bilgiler` (spouse information)
   block is likewise `requiredWhen` gated on `maritalStatus` being one of
   the three non-`single` values.
4. **No maiden-name question on this form** — unlike Vat-3/Vat-6/Vat-9,
   Vat-4's applicant-information block has no "Bekârlık Soyadı" (maiden
   surname) field or corresponding checkbox anywhere in the text layer or
   widget dump; not modelled, since the form itself does not ask for it.
5. **No occupation/education fields in the spouse block** — the
   `Eşe Ait Bilgiler` section on this form has exactly 8 rows: `Kimlik
   No`, `Uyruğu`, `Adı`, `Soyadı`, `Anne Adı`, `Baba adı`, `Doğum Yeri`,
   `Doğum Tarihi`; there is **no** `Mesleği`/`Eğitim Durumu` row for the
   spouse, unlike Vat-3's spouse block (which does carry
   `spouseOccupation`/`spouseEducationLevel`). Confirmed by the absence
   of any corresponding widget or text label between the spouse block's
   `Doğum Tarihi` row and the minor-children table header.
6. **`spouseIdentityNumber` accepts either a T.C. Kimlik No or a foreign
   Yabancı Kimlik No** (widget tooltip: "T.C. Kimlik No/Yabancı Kimlik No
   yazınız..."), unlike Vat-6 (whose spouse is always a Turkish citizen by
   the form's own premise) — modelled with a length-only validation
   (`minLength`/`maxLength`, no pattern), matching Vat-3's identical
   `spouseIdentityNumber` treatment for the same reason (an Article-12
   exceptional-acquisition applicant's spouse need not be a Turkish
   citizen).
7. **The 3-column minor-children table has 12 fields per child**,
   matching Vat-3's own convention (not Vat-6's 11-field variant), since
   this form's table does carry the `Alacağı Soyadı` (surname to be
   acquired) row — confirmed directly from the text-layer position match
   described above.
8. **`hasPriorCriminalConviction`/`hasPendingProsecution`** reuse Vat-3's
   exact enum fields and labels verbatim — the same "Evet-Hayır"
   (Yes/No) question pair appears in the same position on this form.
9. **`phoneNumber` and `emailAddress` each collapse a visually-split pair
   of input boxes into one field**, matching every sibling schema's own
   precedent.
10. **`religion`, `educationLevel`, and `occupation` are left optional**
    for the applicant (no explicit required marker on the form for these
    three, matching every sibling schema's treatment of the identical
    fields).
11. **Out of scope**: the header's office-completed intake fields, the
    biometric-photograph box, and the closing `Ad Soyad`/`İmza`
    (printed name/signature) line — the same `Başvuran Ad` widget every
    sibling schema excludes for its own equivalent line. `declarationDate`
    (the date accompanying the signature) is kept in scope as
    applicant-provided data, distinct from the signature mark itself.
12. **Disclosure**: this schema models only the government's own
    published intake-form fields. It does not itself define, evaluate, or
    guarantee eligibility for any citizenship-by-investment or
    discretionary-acquisition pathway under Article 12 — those criteria
    are set by separate regulation and administrative decision, outside
    this form's own scope.
13. This closes one of the eight remaining GOV-4818-banked VAT
    candidates. VAT-1, VAT-2, VAT-5, VAT-7, VAT-8, VAT-10, and VAT-11
    remain open, unscreened backlog candidates on the same NVI page for a
    future companion-schema cycle. Türkiye remains 1 of 6 verticals open
    (National ID & Civic Documents) — this is a fourth schema within that
    already-open vertical, not a new vertical or jurisdiction.

## Conformance

3 valid mock scenarios — `valid-single-applicant-minimal` (the 21
unconditionally-required fields only, `maritalStatus: single`, no
spouse/children fields), `valid-married-applicant-with-spouse-consulate`
(filed with a Consulate General abroad, `maritalStatus: married`, full
spouse block, no children), and
`valid-widowed-applicant-with-three-children` (filed domestically,
`maritalStatus: widowed` with both `marriageDate` and `spouseDeathDate`
populated, full spouse block, all 3 children columns fully filled) —
plus 21 static-`required`-field mutation fixtures (one per
unconditionally required field), 11 `requiredWhen` mutation fixtures
(`marriageDate`, `divorceDate`, `spouseDeathDate`, and all 8
`requiredWhen`-gated spouse-block fields, each covering its own
triggering `maritalStatus` value), and 1 unknown-field-rejected fixture
— 36 fixtures total, committed under
`conformance/tr/nvi/exceptional-acquisition-of-turkish-citizenship-application/1.0.0/`.

An ephemeral, from-scratch conformance checker (deriving required-field
and `requiredWhen` rules directly from this schema's own `fields[]`,
discarded after use, not committed) ran all 36 fixtures: every valid
scenario at 0 missing-field errors, every mutation fixture raising
exactly the one error it targets (including the `divorced`/`widowed`
branches, each independently exercised), and the unknown-field fixture's
extra key correctly flagged — 36/36 passing. Validated clean with
`node tools/validate.mjs` and `node tools/validate-ajv.mjs` (669/669
documents, both individually and as part of the full registry run).
`registry-index.json` regenerated via `npm run build-index` in
`tools/govschema-client/`.
