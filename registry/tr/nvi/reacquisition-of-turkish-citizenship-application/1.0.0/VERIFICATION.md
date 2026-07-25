# Verification record — tr/nvi/reacquisition-of-turkish-citizenship-application@1.0.0

## Candidate selection

GOV-4846 ("GovSchema Standard Research"). The GOV-4818 cycle opened
Türkiye as the registry's 100th jurisdiction via Form Vat-3 (general
acquisition of citizenship), confirming all five other verticals as dead
ends and banking the remaining VAT-1/2/4-11 forms on
`nvi.gov.tr/vatandaslik-ile-ilgili-formlar` as future National ID & Civic
Documents companion-schema candidates. GOV-4825 authored VAT-9
(renunciation), GOV-4832 authored VAT-6 (marriage-based acquisition), and
GOV-4839 authored VAT-4 (exceptional/discretionary acquisition), leaving
VAT-1, VAT-2, VAT-5, VAT-7, VAT-8, VAT-10, and VAT-11 unscreened
field-by-field. This cycle re-scanned the same NVI listing page fresh
(`curl` against the live page, `href` values scraped directly from the
returned HTML) and re-fetched and field-counted all seven still-unauthored
forms via `pdfjs-dist`'s `getAnnotations()`:

| Form | Widgets (AcroForm) |
|---|---|
| VAT-1 | 87 |
| VAT-2 | 72 |
| **VAT-5** | **97** |
| VAT-7 | 51 |
| VAT-8 | 94 |
| VAT-10 | 62 |
| VAT-11 | 108 |

**VAT-5 — "Reacquisition of Turkish Citizenship"** was selected as the
strongest remaining candidate. Of the seven remaining forms, reacquisition
(Article 22) is the pathway with the highest real-world applicability for
AI agents assisting the large Turkish diaspora: it is the route used by
former Turkish citizens who renounced citizenship in order to naturalize
elsewhere — historically very common for Turkish nationals in Germany and
other EU states that long required renouncing an existing nationality to
naturalize — and later seek to regain Turkish citizenship. VAT-11 (108
widgets) has more raw fields but addresses a narrow bilateral population
(TRNC citizens); VAT-8 (acquisition by right of option, Article 8) and
VAT-1 (post-majority birth-abroad declaration) are comparatively niche.
VAT-5 is also structurally close to the already-modelled Vat-3/Vat-4 (a
genuine four-way marital-status/spouse `requiredWhen` gate, a 3-column
minor-children table with an `Alacağı Soyadı` row), letting this cycle
reuse an already-proven pattern with high confidence.

## Reaching the live source

- **Form Vat-5**:
  `https://www.nvi.gov.tr/kurumlar/nvi.gov.tr/mevzuat/nufusmevzuat/Formlar/Vatandaslik/Vat5-FormYenidenTurkVatKaz.pdf`
  — confirmed live directly from NVI's own current
  `nvi.gov.tr/vatandaslik-ile-ilgili-formlar` listing page (`href` scraped
  fresh this cycle), HTTP 200, `Content-Type: application/pdf`,
  `Content-Length: 1162702` bytes (matches the downloaded file exactly),
  sha256 `2f0a1fc3f390059e9e0b4846bb67356544df74fc43d882b7f0af62509930b6c6`,
  `Last-Modified: Tue, 04 Aug 2020 08:33:32 GMT`, no login/CAPTCHA gate.
  Retrieved 2026-07-25.
- Field structure extracted with `pdfjs-dist`'s `getAnnotations()` (97
  AcroForm widgets, all on a single page). Because a number of widgets
  carry generic or miscopied `alternativeText` tooltips — every
  `Cinsiyet_3`/`Cinsiyet_4`/`Cinsiyet_5` and `Din_3`/`Din_4`/`Din_5` widget
  in the minor-children table tooltips as `"Eğitim Durumu"`, the same
  miscopy pattern already found on Vat-4's and Vat-9's own children
  tables — every field was independently resolved by extracting the raw
  text layer's item-level `(x, y)` positions via `getTextContent()` and
  matching each widget's `rect` to the printed row label directly
  above/beside it, rather than trusting `alternativeText` alone.
- **A genuine field-naming quirk unique to this form's minor-children
  table, confirmed by the position match**: the widget named `TCKN_3`
  (and `_4`/`_5`) actually holds the **foreign** identity number (its own
  `alternativeText` reads "99 ile başlayan Yabancı Kimlik No yazınız...",
  and it sits directly under the printed "Varsa Yabancı Kimlik No (99…
  ile başlayan)" column header), while the widget named `YKN_3` (and
  `_4`/`_5`) holds the **T.C.** identity number (`alternativeText`: "T.C.
  Kimlik No yazınız...", sitting under the "T.C. Kimlik No" header) — the
  exact opposite of what the field names themselves would suggest. This
  is unlike the applicant's own `TCKN_1` widget, which correctly holds
  the applicant's own T.C. Kimlik No. Resolved entirely from the
  `alternativeText` + row-position match, not the field name.
- Legal basis: Law No. 5901 on Turkish Citizenship (Türk Vatandaşlığı
  Kanunu), Article 22 — the form's own closing declaration cites this
  article by number ("5901 sayılı Türk Vatandaşlığı Kanununa göre yeniden
  Türk vatandaşlığını kazanmak istiyorum").

## Findings / disclosed scoping calls

1. **All 97 widgets reconcile cleanly to 72 logical `fields[]` + 1
   excluded widget.** 97 total widgets − 1 excluded `Başvuran Ad` = 96
   non-excluded widgets; 96 − 24 widgets-saved = 72. The folding:
   `dateOfBirth` (3→1, applicant), `sex` (2→1, radio pair), `phoneNumber`
   (2→1, area code + number), `emailAddress` (2→1), `maritalStatus`
   (4→1, 4-way radio), `marriageDate` (3→1), `divorceDate` (3→1),
   `spouseDeathDate` (3→1), `spouseDateOfBirth` (3→1),
   `child{1,2,3}DateOfBirth` (3→1 each, ×3), `declarationDate` (3→1) — 24
   widgets saved across these 13 composites. The single excluded widget
   is `Başvuran Ad` (the closing
   printed-name/signature line), matching every sibling schema's own
   convention.
2. **The applicant's own T.C. Kimlik No is required, not optional**,
   unlike Vat-3/Vat-4 (whose foreign-national applicant has no pre-existing
   Turkish identity number). This reflects the form's own premise: an
   applicant reacquiring citizenship under Article 22 previously held one.
   Modelled as `identityNumber` with the same 11-digit T.C. Kimlik No
   pattern as the renunciation-side Vat-9's own `identityNumber`.
3. **The applicant's foreign name fields (`foreignFirstName`/
   `foreignLastName`, source `Ad_0`/`Soyad_0`) are optional, not
   required** — the printed labels read "Varsa Yabancı Adı" / "Varsa
   Yabancı Soyadı" ("foreign name/surname, if any"), an explicit
   conditional phrasing not present on Vat-3/Vat-4's equivalent labels
   (plain "Yabancı Adı"/"Yabancı Soyadı"), confirmed via the text-layer
   position match. `turkishFirstName`/`turkishLastName` remain required,
   as on every sibling.
4. **A genuine four-way `maritalStatus` with a `requiredWhen`-gated
   spouse block**, reusing Vat-3's/Vat-4's exact pattern verbatim:
   `single`/`married`/`divorced`/`widowed` (source: `Secim_3`, a 4-value
   radio group, per the form's own footnote a/b/c). `Evlenme Tarihi`
   (marriage date) is required whenever `married`, `divorced`, or
   `widowed`; `Boşanma Tarihi` (divorce date) only when `divorced`;
   `Vefat Eden Eşin Ölüm Tarihi` (spouse's death date) only when
   `widowed`. The entire 8-field `Eşe Ait Bilgiler` (spouse information)
   block is likewise `requiredWhen` gated on `maritalStatus` being one of
   the three non-`single` values.
5. **`spouseIdentityNumber` accepts either a T.C. Kimlik No or a foreign
   Yabancı Kimlik No** (widget tooltip: "T.C. Kimlik No/Yabancı Kimlik No
   yazınız..."), matching Vat-3's/Vat-4's identical `spouseIdentityNumber`
   treatment — modelled with a length-only validation (no pattern), since
   a reacquiring applicant's spouse need not be a Turkish citizen.
6. **The 3-column minor-children table carries both a T.C. Kimlik No and
   a foreign (99…) identity number per child** — `child{N}IdentityNumber`
   and `child{N}ForeignIdentityNumber` are both modelled, unlike the
   acquisition-side Vat-3/Vat-4 (whose children have never held Turkish
   citizenship and so carry only a foreign identity number). This is the
   direct structural consequence of the form's own reacquisition premise:
   a child here may have previously held a T.C. Kimlik No alongside the
   applicant before both lost citizenship. Neither child field is marked
   `required` on the source form (both are conditioned on a child
   actually being declared in that column), matching every sibling
   schema's treatment of its own optional per-child identity fields.
7. **The children table carries the `Alacağı Soyadı` (surname to be
   acquired) row**, matching Vat-3's/Vat-4's 15-field-per-child
   convention (not Vat-6's/Vat-9's simpler variant) — confirmed directly
   from the text-layer position match: `Yabancı Adı` → `Yabancı Soyadı` →
   `Türkçe Adı` → `Alacağı Soyadı` → `Anne Adı` → `Baba Adı` → `Doğum
   Yeri` → `Doğum Tarihi` (Gün/Ay/Yıl) → `Cinsiyeti` → `Dini`, printed top
   to bottom.
8. **`child{N}Sex` is modelled as the same `male`/`female` enum used
   throughout every sibling schema**, even though the underlying
   `Cinsiyet_3`/`_4`/`_5` widgets are plain text fields (`fieldType: Tx`)
   rather than a radio-button pair like the applicant's own `Cinsiyet`
   widgets — the printed column header ("Cinsiyeti") and every sibling
   schema's own established convention both point to the same restricted
   value set, so the enum is kept for cross-schema consistency (disclosed
   here since it is a scoping choice, not a literal transcription of the
   widget's own field type).
9. **No criminal-history question pair on this form** — unlike Vat-4
   (Article 12, exceptional acquisition), Vat-5's text layer and widget
   dump contain no "mahkûm"/"yargılama" (convicted/prosecution) language
   anywhere; not modelled, since the form itself does not ask for it.
10. **`phoneNumber` and `emailAddress` each collapse a visually-split
    pair of input boxes into one field**, matching every sibling schema's
    own precedent.
11. **`religion`, `educationLevel`, and `occupation` are left optional**
    for the applicant (no explicit required marker on the form for these
    three, matching every sibling schema's treatment of the identical
    fields).
12. **Out of scope**: the header's office-completed intake fields, the
    biometric-photograph box, and the closing `Ad Soyad`/`İmza`
    (printed name/signature) line — the same `Başvuran Ad` widget every
    sibling schema excludes for its own equivalent line. `declarationDate`
    (the date accompanying the signature) is kept in scope as
    applicant-provided data, distinct from the signature mark itself.
13. This closes one of the seven remaining GOV-4818-banked VAT
    candidates. VAT-1, VAT-2, VAT-7, VAT-8, VAT-10, and VAT-11 remain
    open, unscreened backlog candidates on the same NVI page for a future
    companion-schema cycle. Türkiye remains 1 of 6 verticals open
    (National ID & Civic Documents) — this is a fifth schema within that
    already-open vertical, not a new vertical or jurisdiction.

## Conformance

3 valid mock scenarios — `valid-single-applicant-minimal` (the 17
unconditionally-required fields only, `maritalStatus: single`, no
spouse/children fields, filed with a Consulate General abroad),
`valid-married-applicant-with-spouse-consulate` (filed with a Consulate
General abroad, `maritalStatus: married`, full spouse block, no children),
and `valid-widowed-applicant-with-three-children` (filed domestically,
`maritalStatus: widowed` with both `marriageDate` and `spouseDeathDate`
populated, full spouse block, all 3 children columns fully filled) — plus
17 static-`required`-field mutation fixtures (one per unconditionally
required field), 11 `requiredWhen` mutation fixtures (`marriageDate`,
`divorceDate`, `spouseDeathDate`, and all 8 `requiredWhen`-gated
spouse-block fields, each covering its own triggering `maritalStatus`
value — `divorced` and `widowed` each independently constructed from the
married/widowed base scenarios), and 1 unknown-field-rejected fixture — 32
fixtures total, committed under
`conformance/tr/nvi/reacquisition-of-turkish-citizenship-application/1.0.0/`.

An ephemeral, from-scratch conformance checker (deriving required-field
and `requiredWhen` rules directly from this schema's own `fields[]`,
discarded after use, not committed) ran all 32 fixtures: every valid
scenario at 0 missing-field errors, every mutation fixture raising exactly
the one error it targets (including the `divorced`/`widowed` branches,
each independently exercised), and the unknown-field fixture's extra key
correctly flagged — 32/32 passing. Validated clean with `node
tools/validate.mjs` and `node tools/validate-ajv.mjs` (670/670 documents,
both individually and as part of the full registry run).
`registry-index.json` regenerated via `npm run build-index` in
`tools/govschema-client/`.
