# Verification record — tr/nvi/acquisition-of-turkish-citizenship-by-descent-application@1.0.0

## Candidate selection

GOV-4868 ("GovSchema Standard Research"). Eight prior cycles (GOV-4818/
Vat-3, GOV-4825/Vat-9, GOV-4832/Vat-6, GOV-4839/Vat-4, GOV-4846/Vat-5,
GOV-4853/Vat-11, GOV-4860/Vat-8) each authored the strongest remaining
banked VAT companion candidate on NVI's `vatandaslik-ile-ilgili-formlar`
page. This cycle re-scanned that same listing page fresh, re-fetched all
four still-unauthored forms (VAT-1, VAT-2, VAT-7, VAT-10), and
field-counted each via `pdfjs-dist`'s `getAnnotations()`:

| Form | Title | Pages | Widgets |
|------|-------|-------|---------|
| **Vat-1** | **Soy Bağı Esasına Göre Kazanma (acquisition by descent)** | **2** | **87** |
| Vat-2 | Doğum Yeri Esasına Göre Kazanma (acquisition by place of birth) | 1 | 72 |
| Vat-7 | Evlat Edinilme Yoluyla Kazanma (acquisition by adoption) | 1 | 51 |
| Vat-10 | Seçme Hakkı İle Kaybetme (loss by right of option) | 1 | 62 |

**Vat-1 was selected** as the strongest remaining candidate: the largest
widget count of the four, the only one of the four spanning 2 pages, a
genuinely distinct legal basis (acquisition through a Turkish-citizen
parent by descent — not place of birth, not adoption, and not a loss
form like Vat-10), and — uniquely among every VAT companion authored to
date — two full parent-information blocks (covering the applicant's
father and mother, each including their own parents) rather than a
single spouse block.

## Reaching the live source

- **Form Vat-1**:
  `https://www.nvi.gov.tr/kurumlar/nvi.gov.tr/mevzuat/nufusmevzuat/Formlar/Vatandaslik/Vat1-FormOnsekizYasUstuYurtdisiBildirim.pdf`
  — confirmed live directly from NVI's own current
  `nvi.gov.tr/vatandaslik-ile-ilgili-formlar` listing page (`href` scraped
  fresh this cycle), HTTP 200, `Content-Type: application/pdf`,
  1,043,807 bytes, sha256
  `64ee886b37d59168add7daa93feb1f8b487dba4b6e8ceb3054ca2fa4bf59a4d4`,
  `Last-Modified: Tue, 04 Aug 2020 08:33:30 GMT`, no login/CAPTCHA gate.
  Retrieved 2026-07-25.
- Field structure extracted with `pdfjs-dist`'s `getAnnotations()` (87
  AcroForm widgets across 2 pages) and cross-checked against each page's
  extracted text layer (`getTextContent()`) to resolve every widget's
  rect position to the label it sits directly beneath.
- **The PDF's own filename differs from its printed header title**: the
  URL slug reads `Vat1-FormOnsekizYasUstuYurtdisiBildirim.pdf` (literally
  "Form for notification regarding birth abroad after completing age
  18"), while the document's own page-1 header prints "SOY BAĞI ESASINA
  GÖRE TÜRK VATANDAŞLIĞININ KAZANILMASI BAŞVURU FORMU/BEYAN FORMU"
  ("Application/Declaration Form for Acquisition of Turkish Citizenship
  on the Basis of Descent"). Both describe the same underlying process —
  an adult (18+), already a Turkish citizen by descent under operation of
  law but never formally registered (typically because born abroad),
  applying to have that citizenship recorded — so this is treated as a
  consistent naming choice, not a mismatch requiring resolution or a
  reason to distrust the document.
- **Legal basis is inferred, not directly cited**: unlike every other
  authored VAT companion (Vat-3/4/5/6/8/9/11, each of which cites its
  governing article by number in its own closing declaration), Vat-1's
  closing declaration reads only "Türk vatandaşı olan anne ve/veya
  babama bağlı olarak Türk vatandaşlığını kazanmak istiyorum" ("I wish
  to acquire Turkish citizenship through my mother and/or father who are
  Turkish citizens") with no article number. This document's `source.
  documentRef` and top-level `description` cite **Article 7 of Law No.
  5901** as the likely basis, reasoned as follows: the form's own title
  names the "Soy Bağı" (descent) ground verbatim, and the sibling Vat-2
  form (also fetched and read this cycle, not yet authored) explicitly
  cites Article 8 for the parallel "Doğum Yeri Esasına Göre" (place-of-
  birth) ground; Law No. 5901's own chapter on acquisition-by-birth
  orders these two grounds as consecutive articles, with descent
  preceding place of birth. This is a disclosed inference, not a
  directly-sourced citation — flagged here in the same spirit as this
  registry's other disclosed source-document findings.

## Findings / disclosed scoping calls

1. **87 widgets reconcile to 55 logical `fields[]`.** Page 1 (68
   widgets): 7 composite day/month/year groups collapse to 1 date field
   each (`dateOfBirth`, `marriageDate`, `divorceDate`, `spouseDeathDate`,
   `spouseDateOfBirth`, `fatherDateOfBirth`, `motherDateOfBirth`,
   `declarationDate` — 8 groups × 3 widgets = 24 widgets → 8 fields), the
   `Cinsiyet` radio pair collapses to 1 `sex` field (2 → 1), the
   `Secim_3` 4-way radio group collapses to 1 `maritalStatus` field
   (4 → 1), the split phone (`Alan kodu` + `Telefon`) and split email
   (`Eposta` + `Eposta_2`) boxes each collapse to 1 field (4 widgets →
   2 fields), and the closing `Başvuran Ad` (printed name/signature)
   widget is excluded entirely (1 widget out). Page 2 (19 widgets): 8
   free-text declaration widgets (`fill_1`, `fill_2_2`, `fill_3_2`,
   `fill_4`, `fill_5`, `fill_6`, `fill_7_2`, `fill_8`) map 1:1 to 8
   fields; the remaining 11 widgets (`Beyan Ad` ×2, `Beyan Unvan`,
   `B_Gün`/`B_Ay`/`B_Yıl` ×2 — the receiving-official's and declarant's
   own signature blocks) are excluded entirely, per finding 4 below.
2. **Two full parent-information blocks, unique among VAT companions
   authored to date**: "BABASINA AİT BİLGİLER" (father's information)
   and "ANNESİNE AİT BİLGİLER" (mother's information), each an 8-field
   block (identity number, nationality, given name, surname, the
   parent's own mother's name, the parent's own father's name, place of
   birth, date of birth). Modelled as `father*`/`mother*` fields, with
   the parent's-own-parents columns named `paternalGrandmotherName`/
   `paternalGrandfatherName` and `maternalGrandmotherName`/
   `maternalGrandfatherName` to avoid colliding with the applicant's own
   already-established `motherName`/`fatherName` fields (the simple
   given-name-only fields every VAT companion schema carries in its top
   identity block). **Both parent blocks are modelled fully optional**
   rather than `requiredWhen`-gated: the form's own framing is "anne
   ve/veya baba" (mother and/or father), meaning at least one parent
   block must genuinely be completed, but the source provides no
   boolean/enum toggle indicating which parent is the Turkish-citizen
   one to gate against — the same disclosed "no structured control to
   gate an at-least-one-of-N requirement on" pattern already used
   elsewhere in this registry (e.g. `il/mfa/entry-visa-application`'s
   single-parent-consent field, GOV-3094).
3. **No foreign-script/Turkish-script name split for the applicant** —
   unlike Vat-3/4/5/6 (each of which splits the applicant into
   `foreignFirstName`/`foreignLastName` plus `turkishFirstName`/
   `turkishLastName`), Vat-1's own applicant block provides only a
   single `Ad_1`/`Soyad_1` pair (confirmed by both the annotation dump
   and the rendered text, "Adı ... Soyadı" with no "Yabancı"/"Türkçe"
   qualifier anywhere in that row) — the same single-pair pattern
   already found on Vat-9 and Vat-11. Modelled as plain `firstName`/
   `lastName`.
4. **Out of scope**: the closing `Başvuran Ad` (printed name/signature)
   widget, the biometric-photograph box, and the *entire* page-2 "Beyan
   Alan Yetkilinin"/"Beyan Verenin" block (11 widgets: the receiving
   official's own name/title/date plus the declarant's own name/date,
   both captured in person at the counter under Law No. 5490's Article
   67 false-declaration penalty clause) — all receiving-authority- or
   signature-only artifacts, consistent with every prior VAT companion
   schema's exclusion of its own equivalent closing line.
5. **No maiden-name question, no criminal-conviction/pending-prosecution
   questions** — like Vat-8/Vat-9/Vat-11 and unlike Vat-3/4/5/6, Vat-1
   carries neither a maiden-name-usage toggle nor a criminal-history
   declaration; confirmed absent from both the annotation dump and the
   rendered text layer.
6. **Spouse block is the smaller 8-field pattern** (no `Mesleği`/
   `Eğitim Durumu` columns), matching the Vat-8 precedent rather than
   Vat-3/Vat-6's 10-field block; `spouseIdentityNumber`'s own
   `alternativeText` ("T.C. Kimlik No/Yabancı Kimlik No yazınız...")
   confirms it accepts either a T.C. Kimlik No or a foreign identity
   number, since the applicant's spouse need not be a Turkish citizen —
   modelled with only `minLength`/`maxLength`, no strict digit pattern,
   matching Vat-8's identical finding.
7. **Page-2 "Gerekli Diğer Bilgiler" (Other Required Information) block
   reuses seven of Vat-11's eight fields verbatim** (same Turkish
   question text, same field semantics: `otherNationalityDeclaration`,
   `foreignCitizenshipAcquisitionInfo`, `statelessLegalConductDeclaration`,
   `residenceSinceDate`, `nameUsedInResidenceCountry`,
   `turkishCitizenSiblingsDeclaration`, `turkeyRelativesDeclaration`) —
   **plus one field unique to this schema**, `turkishParentAddressDeclaration`
   ("Türk vatandaşı anne ve/veya babanızın yerleşim yeri adres
   bilgilerini belirtiniz" — state the residential address of your
   Turkish-citizen mother and/or father), which does not appear on Vat-11
   since that form's applicant is a TRNC citizen, not a descent-based
   applicant with a Turkish-citizen parent. Unlike the four other
   conditional page-2 declarations, `turkishParentAddressDeclaration` is
   modelled `required: true`, since this form's entire legal basis
   presupposes a Turkish-citizen parent whose address is always
   answerable — the same reasoning already applied to
   `otherNationalityDeclaration`/`residenceSinceDate`/
   `nameUsedInResidenceCountry` on Vat-11.
8. **`educationLevel`, `occupation`, and `religion` are left optional**
   for the applicant (no explicit required marker on the form for these
   three), matching every prior VAT companion schema's treatment of the
   identical fields.
9. This closes one of the four remaining GOV-4818-banked VAT candidates.
   VAT-2, VAT-7, and VAT-10 remain open, unscreened backlog candidates on
   the same NVI page for a future companion-schema cycle. Türkiye remains
   1 of 6 verticals open (National ID & Civic Documents) — this is an
   eighth schema within that already-open vertical, not a new vertical or
   jurisdiction.

## Conformance

3 valid mock scenarios — `valid-married-father-based-consulate` (married
applicant, Turkish citizenship via the father, filed with a Consulate
General abroad, spouse block and every optional page-1/page-2 field
populated), `valid-single-mother-based-stateless-domestic` (single,
stateless applicant, Turkish citizenship via the mother, filed
domestically with a Governorate, no spouse block), and
`valid-widowed-applicant-both-parent-blocks` (widowed applicant with a
deceased spouse, both the father's and mother's parent-information
blocks fully populated) — plus 21 static-`required`-field mutation
fixtures, 6 `requiredWhen` mutation fixtures (4 gated on marital status ∈
{married, divorced, widowed}, 1 gated on divorced via a locally-derived
divorced variant, 1 gated on widowed), and 1 unknown-field-rejected
fixture — 31 fixtures total, committed under
`conformance/tr/nvi/acquisition-of-turkish-citizenship-by-descent-application/1.0.0/`.

An ephemeral, from-scratch conformance checker (deriving required-field
and `requiredWhen` rules directly from this schema's own `fields[]`,
discarded after use, not committed) ran all 31 fixtures: all 3 valid
scenarios at 0 missing-field/pattern errors, every mutation fixture
raising exactly the one error it targets, and the unknown-field fixture's
extra key correctly flagged — 31/31 passing. Every `foreignIdentityNumber`
value across all fixtures was asserted programmatically to match the
schema's own `^99[0-9]{9}$` pattern (11 characters total) before being
written to disk, to guard against the 11-vs-12-digit fixture bug found
during GOV-4862's review of a prior VAT sibling (and its own three
already-merged instances) — see that review's own findings. Validated
clean with `node tools/validate.mjs` and `node tools/validate-ajv.mjs`
(673/673 documents, both individually and as part of the full registry
run). `registry-index.json` regenerated via `npm run build-index` in
`tools/govschema-client/`.
