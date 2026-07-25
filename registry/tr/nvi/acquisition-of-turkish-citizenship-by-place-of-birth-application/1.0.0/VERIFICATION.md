# Verification record — tr/nvi/acquisition-of-turkish-citizenship-by-place-of-birth-application@1.0.0

## Candidate selection

GOV-4875 ("GovSchema Standard Research"). Nine prior cycles (GOV-4818/
Vat-3, GOV-4825/Vat-9, GOV-4832/Vat-6, GOV-4839/Vat-4, GOV-4846/Vat-5,
GOV-4853/Vat-11, GOV-4860/Vat-8, GOV-4868/Vat-1) each authored the
strongest remaining banked VAT companion candidate on NVI's
`vatandaslik-ile-ilgili-formlar` page. This cycle re-scanned that same
listing page fresh, re-fetched all three still-unauthored forms (VAT-2,
VAT-7, VAT-10), and field-counted each via `pdfjs-dist`'s
`getAnnotations()`:

| Form | Title | Pages | Widgets |
|------|-------|-------|---------|
| **Vat-2** | **Doğum Yeri Esasına Göre Kazanma (acquisition by place of birth)** | **1** | **72** |
| Vat-10 | Seçme Hakkı İle Kaybetme (loss by right of option) | 1 | 62 |
| Vat-7 | Evlat Edinilme Yoluyla Kazanma (acquisition by adoption) | 1 | 51 |

**Vat-2 was selected** as the strongest remaining candidate: the largest
widget count of the three, a genuinely distinct legal basis (acquisition
through place of birth on Turkish soil — not adoption, and not a loss
form like Vat-10, which runs the opposite direction to every other VAT
companion authored to date), and a structure closely mirroring the
already-authored Vat-1 (descent) schema's two-full-parent-block pattern,
letting this cycle reuse that precedent directly while still capturing a
form-specific finding of its own (see Finding 3 below).

## Reaching the live source

- **Form Vat-2**:
  `https://www.nvi.gov.tr/kurumlar/nvi.gov.tr/mevzuat/nufusmevzuat/Formlar/Vatandaslik/Vat2-FormDogumYeriEsasinaGoreTurkVatKaz.pdf`
  — confirmed live directly from NVI's own current
  `nvi.gov.tr/vatandaslik-ile-ilgili-formlar` listing page (`href` scraped
  fresh this cycle), HTTP 200, `Content-Type: application/pdf`, 708,415
  bytes, sha256
  `879955ad8ca02d19114bcd3846a34f077d76043c5d52b7f900c8b36630a4a591`.
  Retrieved 2026-07-25.
- Field structure extracted with `pdfjs-dist`'s `getAnnotations()` (72
  AcroForm widgets, single page) and cross-checked against the extracted
  text layer (`getTextContent()`, with explicit x/y transform coordinates
  pulled per text run) to resolve every widget's rect position to the
  label it sits directly beneath.

## Findings / disclosed scoping calls

1. **72 widgets reconcile to 49 logical `fields[]`.** 8 composite
   day/month/year groups collapse to 1 date field each (`dateOfBirth`,
   `marriageDate`, `divorceDate`, `spouseDeathDate`, `spouseDateOfBirth`,
   `fatherDateOfBirth`, `motherDateOfBirth`, `declarationDate` — 8 groups
   × 3 widgets = 24 widgets → 8 fields), the `Cinsiyet` radio pair
   collapses to 1 `sex` field (2 → 1), the `Secim_3` 4-way radio group
   collapses to 1 `maritalStatus` field (4 → 1), the split phone
   (`Alan kodu` + `Telefon`) and split email (`Eposta` + `Eposta_2`)
   boxes each collapse to 1 field (4 widgets → 2 fields), and the
   closing `Başvuran Ad` (printed name/signature) widget is excluded
   entirely (1 widget out). Reconciliation: 72 − 16 (date collapses) − 1
   (sex radio) − 3 (marital-status radio) − 1 (phone) − 1 (email) − 1
   (signature, excluded) = 49.
2. **Two full parent-information blocks, matching the Vat-1 precedent**:
   "BABASINA AİT BİLGİLER" (father's information) and "ANNESİNE AİT
   BİLGİLER" (mother's information), each carrying identity number,
   nationality, given name, surname, the parent's own mother's/father's
   name (modelled as `paternalGrandmotherName`/`paternalGrandfatherName`
   and `maternalGrandmotherName`/`maternalGrandfatherName`, to avoid
   colliding with the applicant's own top-level `motherName`/
   `fatherName` fields), place of birth, and date of birth. **Both
   parent blocks are modelled fully optional**, not `requiredWhen`-
   gated — the source form provides no boolean/enum toggle indicating
   which parent's status is load-bearing, and (unlike Vat-1's "anne
   ve/veya baba" framing) this form's Article 8 place-of-birth basis
   does not even require either parent to be a Turkish citizen — the
   same disclosed "no structured control to gate an at-least-one-of-N
   requirement on" pattern used on Vat-1 and elsewhere in this registry.
3. **Genuine source-document finding: each parent block's closing
   `Yerleşim Yeri Adresi` (residential address) widget carries the
   wrong internal field name/`alternativeText`.** The extracted text
   layer confirms both parent blocks end with a printed "Yerleşim Yeri
   Adresi" label (two side-by-side columns, `x≈42`/`x≈304`, `y≈79–100`)
   directly above the education/occupation row. The corresponding
   AcroForm widgets at that same rect (`fill_30` at
   `x:[101,297] y:[79,100]`, `fill_31` at `x:[363,566] y:[79,100]`)
   both carry `alternativeText: "Eğitim Durumu"` (education level) —
   evidently copy-pasted from the applicant's own `fill_27`/`fill_28`
   education-level fields higher on the page, rather than updated for
   this position. Position (cross-checked against the text layer's
   own transform coordinates), not the widget's own internal name/
   `alternativeText`, was used to model these two widgets as
   `fatherResidenceAddress`/`motherResidenceAddress` — both disclosed
   in the schema's own field `description`, following this registry's
   established practice of naming source-document field-labeling bugs
   rather than propagating them (cf. the TCKN/YKN swap on Vat-5, the
   TCKN_1 mismatch on Vat-8). These two address fields do not appear on
   Vat-1, whose equivalent parent blocks end one row earlier (at date of
   birth) with no address capture at all — a genuine structural
   difference between the two forms, not a modelling inconsistency.
4. **No foreign-script/Turkish-script name split for the applicant** —
   like Vat-1/8/9/11 and unlike Vat-3/4/5/6, Vat-2's own applicant block
   provides only a single `Ad_1`/`Soyad_1` pair (confirmed by both the
   annotation dump and the rendered text, "Adı ... Soyadı" with no
   "Yabancı"/"Türkçe" qualifier). Modelled as plain `firstName`/
   `lastName`.
5. **No maiden-name question, no criminal-conviction/pending-prosecution
   questions, and no page-2 "Gerekli Diğer Bilgiler" declaration
   block** — Vat-2 is a single page (unlike the two-page Vat-1), and its
   text layer confirms none of these three question groups appear
   anywhere on it.
6. **Spouse block is the smaller 8-field pattern** (no `Mesleği`/
   `Eğitim Durumu` columns), matching the Vat-1/Vat-8 precedent;
   `spouseIdentityNumber`'s own `alternativeText` ("T.C. Kimlik
   No/Yabancı Kimlik No yazınız...") confirms it accepts either a T.C.
   Kimlik No or a foreign identity number, since the applicant's spouse
   need not be a Turkish citizen — modelled with only
   `minLength`/`maxLength`, no strict digit pattern, matching the
   Vat-1/Vat-8 identical finding.
7. **`educationLevel`, `occupation`, and `religion` are left optional**
   for the applicant (no explicit required marker on the form for these
   three), matching every prior VAT companion schema's treatment of the
   identical fields.
8. **Out of scope**: the closing `Başvuran Ad` (printed name/signature)
   widget and the biometric-photograph box, consistent with every prior
   VAT companion schema's exclusion of its own equivalent closing
   artifacts.
9. This closes one of the three remaining GOV-4868-banked VAT
   candidates. VAT-7 and VAT-10 remain open, unscreened backlog
   candidates on the same NVI page for a future companion-schema cycle.
   Türkiye remains 1 of 6 verticals open (National ID & Civic
   Documents) — this is a ninth schema within that already-open
   vertical, not a new vertical or jurisdiction.

## Conformance

3 valid mock scenarios — `valid-married-father-based-consulate` (married
applicant, filed with a Consulate General abroad, spouse block and both
parent blocks, including their residence-address fields, fully
populated), `valid-single-domestic-no-spouse` (single applicant, filed
domestically with a Governorate, no spouse block, both parent blocks
populated), and `valid-widowed-mother-only-parent-block` (widowed
applicant with a deceased spouse, only the mother's parent-information
block populated, father's block left entirely blank to exercise the
"fully optional, either/neither parent block" judgment call) — plus 17
static-`required`-field mutation fixtures, 6 `requiredWhen` mutation
fixtures (4 gated on marital status ∈ {married, divorced, widowed}, 1
gated on divorced via a locally-derived divorced variant, 1 gated on
widowed), and 1 unknown-field-rejected fixture — 27 fixtures total,
committed under
`conformance/tr/nvi/acquisition-of-turkish-citizenship-by-place-of-birth-application/1.0.0/`.

An ephemeral, from-scratch conformance checker (deriving required-field
and `requiredWhen` rules directly from this schema's own `fields[]`,
discarded after use, not committed) ran all 27 fixtures: all 3 valid
scenarios at 0 missing-field/pattern errors, every mutation fixture
raising exactly the one error it targets, and the unknown-field
fixture's extra key correctly flagged — 27/27 passing. Every
`foreignIdentityNumber` value across all fixtures was asserted
programmatically to match the schema's own `^99[0-9]{9}$` pattern (11
characters total) before being written to disk, per the standing
guard against the 11-vs-12-digit fixture bug found during GOV-4862's
review of a prior VAT sibling. Validated clean with
`node tools/validate.mjs` and `node tools/validate-ajv.mjs` (674/674
documents, both individually and as part of the full registry run).
`registry-index.json` regenerated via `npm run build-index` in
`tools/govschema-client/`.
