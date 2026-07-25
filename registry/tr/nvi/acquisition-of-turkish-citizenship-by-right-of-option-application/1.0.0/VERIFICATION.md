# Verification record — tr/nvi/acquisition-of-turkish-citizenship-by-right-of-option-application@1.0.0

## Candidate selection

GOV-4860 ("GovSchema Standard Research"). The GOV-4818 cycle opened
Türkiye as the registry's 100th jurisdiction via Form Vat-3 (general
acquisition of citizenship), confirming all five other verticals as dead
ends and banking the remaining VAT forms on
`nvi.gov.tr/vatandaslik-ile-ilgili-formlar` as future National ID & Civic
Documents companion-schema candidates. Five subsequent cycles
(GOV-4825/Vat-9, GOV-4832/Vat-6, GOV-4839/Vat-4, GOV-4846/Vat-5,
GOV-4853/Vat-11) each authored one further companion, leaving VAT-1,
VAT-2, VAT-7, VAT-8, and VAT-10 banked and unscreened. This cycle
re-scraped the NVI listing page fresh (its `href`s resolve to different
filenames than a prior cycle's stale banked guess — see "Reaching the
live source" below), re-fetched and field-counted all five remaining
forms via `pdfjs-dist`'s `getAnnotations()`, and selected **VAT-8** —
"Acquisition of Turkish Citizenship by Right of Option" — as the
strongest remaining candidate: a single-page, 94-widget AcroForm, the
largest of the five (Vat-1: 87 widgets/2 pages, Vat-2: 72, Vat-7: 51,
Vat-10: 62), and a legal pathway (Article 21, right of option) distinct
from every one of the six already-authored VAT companions.

## Reaching the live source

- The NVI's `vatandaslik-ile-ilgili-formlar` listing page
  (`https://www.nvi.gov.tr/vatandaslik-ile-ilgili-formlar`) was fetched
  fresh this cycle (HTTP 200, 263,472 bytes) and every `Vat*.pdf` `href`
  scraped directly from its HTML rather than reused from a prior cycle's
  banked guess — this surfaced that VAT-1, VAT-2, VAT-7, VAT-8, and VAT-10
  each resolve to filenames not previously recorded anywhere in this
  registry's memory (e.g. Vat-8 is
  `Vat8-FormSecmeHakkiIleTurkVatKaz.pdf`, not a guessed name), confirming
  the listing page — not a cached filename pattern — is the correct
  source of truth for this form family.
- **Form Vat-8**:
  `https://www.nvi.gov.tr/kurumlar/nvi.gov.tr/mevzuat/nufusmevzuat/Formlar/Vatandaslik/Vat8-FormSecmeHakkiIleTurkVatKaz.pdf`
  — HTTP 200, `Content-Length: 1162835` bytes (matches the downloaded
  file exactly), sha256
  `ac268392c66dd411ade31fb999a0f814cf773dd08c50a9b1b4b4351e728c6ae9`,
  `Last-Modified: Tue, 04 Aug 2020 08:33:50 GMT`, no login/CAPTCHA gate.
  Retrieved 2026-07-25.
- Field structure extracted with `pdfjs-dist`'s `getAnnotations()` (94
  AcroForm widgets on a single page). Every widget's `rect` was sorted
  into reading order (descending Y, then ascending X) and cross-checked
  against the page's own extracted text-content stream, which prints
  every row label in the same top-to-bottom, left-to-right order as the
  widgets — for this particular form the two orderings agreed exactly at
  every row with no ambiguous numeric-suffix reuse (contrast Vat-6's
  `Ad_1`/`Ad_11` collision, which required an additional visual render to
  resolve), so a full `node-canvas` render was not needed to disambiguate
  field-to-label mapping.
- Legal basis: Law No. 5901 on Turkish Citizenship (Türk Vatandaşlığı
  Kanunu), Article 21 — the form's own closing declaration cites this
  article by number ("5901 sayılı Türk Vatandaşlığı Kanununun 21'inci
  maddesine göre seçme hakkı ile Türk vatandaşlığını kazanmak
  istiyorum" — "Pursuant to Article 21 of Law No. 5901 on Turkish
  Citizenship, I wish to acquire Turkish citizenship by right of
  option.").

## Findings / disclosed scoping calls

1. **All 94 widgets reconcile cleanly to 69 logical `fields[]` plus 1
   excluded signature widget.** The reduction is entirely accounted for
   by: 9 composite day/month/year date groups (`dateOfBirth`,
   `marriageDate`, `divorceDate`, `spouseDeathDate`, `spouseDateOfBirth`,
   `child{1,2,3}DateOfBirth`, `declarationDate`) at 3 widgets each = 27
   widgets → 9 fields; the applicant's `Cinsiyet` checkbox pair (2
   widgets → 1 `sex` field); the `Secim_3` 4-button marital-status radio
   group (4 widgets → 1 `maritalStatus` field); and the split
   area-code/subscriber phone boxes and split local-part/domain email
   boxes (2+2 widgets → 2 fields). 94 − 1 (excluded signature) − 24
   (collapsed) = 69, matching the schema's own field count exactly.
2. **A genuine field-naming anomaly, disclosed on `foreignIdentityNumber`
   itself**: the applicant's own foreign-identity-number widget is named
   `TCKN_1` — a name that on every other VAT companion schema in this
   registry (Vat-3, Vat-5, Vat-6, Vat-9, Vat-11) denotes the
   already-a-citizen's 11-digit T.C. Kimlik No — yet this widget's own
   `alternativeText` reads "99 ile başlayan Yabancı Kimlik No yazınız..."
   ("Write the foreign identity number starting with 99..."), i.e. the
   *foreign* identity number pattern (`^99[0-9]{9}$`), not the T.C.
   pattern. Resolved by trusting the `alternativeText` and the field's
   sole position in the applicant block (there is no separate `YKN_1`
   widget on this form) over the field's own misleading name — consistent
   with the GOV-4846 cycle's TCKN/YKN swap finding on Vat-5, a distinct
   but analogous naming/functionality mismatch on the same form family.
3. **`spouseIdentityNumber` accepts either identity-number pattern**: the
   Eşe Ait Bilgiler (spouse information) block's own `Kimlik No` widget
   alternativeText reads "T.C. Kimlik No/Yabancı Kimlik No yazınız..."
   (write either a T.C. or foreign identity number), unlike Vat-6's
   marriage form where the spouse is by definition a Turkish citizen
   (`^[1-9][0-9]{10}$` only) — here a right-of-option applicant's spouse
   is not necessarily a Turkish citizen, so the field is modelled as a
   free-text string bounded to 20 characters rather than a single fixed
   pattern.
4. **No maiden-name question and no criminal-conviction/pending-
   prosecution questions** — genuine absences confirmed against both the
   widget list and the page's own extracted text stream, neither of which
   contains "Evlilik Soyadı", "mahkûm", or "yargılama" anywhere on this
   form, unlike Vat-3/Vat-6/Vat-9 which all carry these questions. Also
   absent: any `descentOrLineage`-equivalent field (Vat-3 carries one;
   this form does not).
5. **The spouse block is 8 fields, smaller than Vat-3's 10** — this
   form's `EŞE AİT BİLGİLER` section has no `Meslek`/`Eğitim Durumu`
   (occupation/education) row for the spouse at all (confirmed absent
   from both the widget list and the printed text, which stops at
   `Doğum Tarihi` for this block), so `spouseOccupation`/
   `spouseEducationLevel` are not modelled on this schema.
6. **Children's `Cinsiyet`/`Dini` (sex/religion) widgets are free-text
   fields, not the applicant's own checkbox pair** — `Cinsiyet_3`,
   `Cinsiyet_4`, `Cinsiyet_5`, `Din_3`, `Din_4`, and `Din_5` are all `Tx`
   (text) AcroForm field types, each carrying the identical, clearly
   copy-pasted `alternativeText` value "Eğitim Durumu" (Education
   level) — a leftover authoring-tool artifact, not a genuine label.
   Resolved via each widget's `rect` position against the printed table
   header row (`Cinsiyeti` then `Dini`, in that order, directly below
   `Doğum Tarihi`), the same class of `alternativeText`-vs-position
   mismatch already disclosed on Vat-11's page-2 signature-block
   collision. Modelled as free-text `string` fields (max length 20/40)
   rather than the `enum` used for the applicant's own `sex`, consistent
   with the Vat-11 cycle's precedent for a child-sex field implemented as
   plain text on the live PDF.
7. **The 3-column minor-children table has 12 fields per child**
   (`ForeignIdentityNumber`, `Nationality`, `ForeignFirstName`,
   `ForeignLastName`, `TurkishFirstName`, `SurnameToBeAcquired`,
   `MotherName`, `FatherName`, `BirthPlace`, `DateOfBirth`, `Sex`,
   `Religion`), matching Vat-3's own 12-per-child structure including the
   `Alacağı Soyadı` ("surname to be acquired") row — confirmed present
   here via the `TR_Soyad_{3,4,5}` widgets and the printed text's own
   `Alacağı Soyadı` header, unlike Vat-6 which lacks this row. Modelled as
   the same bounded-slot `child1`/`child2`/`child3` precedent (all fields
   optional).
8. **`submittedToOffice`/`submittedToOfficeType` split**, following
   Vat-6's/Vat-9's precedent — the `Makam` widget is a genuine `Ch`
   (choice) field offering exactly two mutually exclusive
   `exportValue`s, `VALİLİĞİNE` (Governorship, domestic) and
   `BAŞKONSOLOSLUĞUNA` (Consulate General, abroad).
9. **`maritalStatus` enum values were derived from the `Secim_3` button
   group's own `buttonValue`s (`0`/`1`/`2`/`3`) matched to X-position
   against the printed `Bekar Evli Boşanmış Dul` header row** (ascending
   X: 89→`0`→Bekar/single, 191→`1`→Evli/married, 338→`2`→Boşanmış/
   divorced, 418→`3`→Dul/widowed) — the widgets carry no
   human-readable `exportValue` strings themselves, only numeric codes,
   so this mapping is a disclosed judgment call rather than a literal
   read of the PDF.
10. **`phoneNumber` and `emailAddress` each collapse a visually-split pair
    of input boxes into one field**, matching every other VAT sibling's
    precedent — a parenthetical area-code box precedes the subscriber
    number, and the email box is split around a fixed, non-editable "@"
    glyph.
11. **`religion`, `educationLevel`, and `occupation` are left optional**
    for the applicant, matching every VAT sibling's treatment of these
    same three fields (the form provides no required/optional marker
    convention anywhere, the same disclosed judgment call as all prior
    VAT companions).
12. **Out of scope**: the header's office-completed `Kayıt Tarihi`/
    `Kayıt No` (registration date/number), the biometric-photograph box,
    and the closing `Ad Soyad`/`İmza` (printed name/signature) widget
    (`Başvuran Ad`) — the same class of exclusion every VAT sibling
    applies to its own equivalent line. `declarationDate` (the date
    accompanying the signature) is kept in scope as applicant-provided
    data, distinct from the signature mark itself.
13. This closes one of the five remaining GOV-4818-banked VAT candidates.
    VAT-1, VAT-2, VAT-7, and VAT-10 remain open, unscreened backlog
    candidates on the same NVI page for a future companion-schema cycle.
    Türkiye remains 1 of 6 verticals open (National ID & Civic Documents)
    — this is a seventh schema within that already-open vertical, not a
    new vertical or jurisdiction.

## Conformance

3 valid mock scenarios — `valid-single-no-children-governorate` (the 19
unconditionally-required fields only, single applicant, no spouse block,
no children, filed domestically with a Governorate),
`valid-married-consulate-with-spouse` (filed with a Consulate General
abroad, married with a full spouse block populated, no children), and
`valid-divorced-with-three-children` (divorced applicant with both
marriage and divorce dates plus the full spouse block, all 3 children
columns fully filled) — plus 19 static-`required`-field mutation
fixtures (one per unconditionally-required field), 11 `requiredWhen`
mutation fixtures (`marriageDate`, `divorceDate`, `spouseDeathDate`, and
each of the 8 unconditionally-gated spouse-block fields, each omitted
against its respective gating `maritalStatus` value), and 1
unknown-field-rejected fixture — 31 fixtures total, committed under
`conformance/tr/nvi/acquisition-of-turkish-citizenship-by-right-of-option-application/1.0.0/`.

An ephemeral, from-scratch conformance checker (deriving required-field
and `requiredWhen` rules directly from this schema's own `fields[]`,
discarded after use, not committed) ran all 31 fixtures: every valid
scenario at 0 missing-field errors, every mutation fixture raising
exactly the one error it targets, and the unknown-field fixture's extra
key correctly flagged — 31/31 passing. Validated clean with
`node tools/validate.mjs` and `node tools/validate-ajv.mjs`
(672/672 documents, both individually and as part of the full registry
run). `registry-index.json` regenerated via `npm run build-index` in
`tools/govschema-client/`.
