# Verification record — tr/nvi/acquisition-of-turkish-citizenship-by-adoption-application@1.0.0

## Candidate selection

GOV-4890 ("GovSchema Standard Research"). Ten prior cycles (GOV-4818/Vat-3,
GOV-4825/Vat-9, GOV-4832/Vat-6, GOV-4839/Vat-4, GOV-4846/Vat-5,
GOV-4853/Vat-11, GOV-4860/Vat-8, GOV-4868/Vat-1, GOV-4875/Vat-2,
GOV-4883/Vat-10) each authored the strongest remaining banked VAT companion
candidate on NVI's `vatandaslik-ile-ilgili-formlar` listing page. This
cycle re-scanned `CATALOG.md` fresh: **Vat-7 (acquisition through
adoption) is the sole remaining banked, unscreened candidate** on that
page — every other VAT form (Vat-1 through Vat-6, Vat-8 through Vat-11)
has already been authored as a companion schema. No screening/comparison
step was needed; this cycle proceeds directly to independently
re-verifying and authoring Vat-7.

## Reaching the live source

- **Form Vat-7**:
  `https://www.nvi.gov.tr/kurumlar/nvi.gov.tr/mevzuat/nufusmevzuat/Formlar/Vatandaslik/Vat7-FormEvlatEdinilmeYoluylaTurkVatKaz.pdf`
  — confirmed live, HTTP 200, `Content-Type: application/pdf`, 1,063,723
  bytes, sha256
  `70c4a1477f4d42d7c33d43746eeedb931c5db398274db49f681b674716a67e2f`, no
  login/CAPTCHA gate. Retrieved 2026-07-25.
- Single-page PDF, 51 AcroForm widgets, extracted with `pdfjs-dist`'s
  `getAnnotations()` and cross-checked against the page's extracted text
  layer (`getTextContent()`, sorted by descending y-coordinate) to resolve
  every widget's rect position to the printed label it sits directly
  beneath.
- Printed header: "T.C. İÇİŞLERİ BAKANLIĞI Nüfus ve Vatandaşlık İşleri
  Genel Müdürlüğü — EVLAT EDİNİLME YOLUYLA TÜRK VATANDAŞLIĞININ
  KAZANILMASI BAŞVURU FORMU" (Application Form for Acquisition of Turkish
  Citizenship through Adoption), "Form No Vat-7". The closing declaration
  text — "Veli / Vasisi bulunduğum yukarıda kimlik bilgileri yer alan
  çocuğun 5901 sayılı Türk Vatandaşlığı Kanununun 17'nci maddesine göre
  evlat edinilme yoluyla Türk vatandaşlığını kazanmasını istiyorum" ("I,
  as guardian/custodian of the child whose identity information is stated
  above, request that the child acquire Turkish citizenship through
  adoption pursuant to Article 17 of Law No. 5901") — directly cites
  **Article 17 of Law No. 5901** and confirms the form is signed by the
  adoptive parent as the child's guardian, not by the child.

## Findings / disclosed scoping calls

1. **51 widgets reconcile to 39 logical `fields[]`.** 3 composite
   day/month/year groups collapse to 1 date field each (`dateOfBirth`,
   `adoptiveFatherDateOfBirth`, `adoptiveMotherDateOfBirth`,
   `declarationDate` — 4 groups × 3 widgets = 12 widgets → 4 fields), the
   `Cinsiyet` radio pair collapses to 1 `sex` field (2 → 1), the split
   phone (`Alan kodu` + `Telefon`) and split email (`Eposta` +
   `Eposta_2`) boxes each collapse to 1 field (4 widgets → 2 fields), and
   the closing `Başvuran Ad` (printed name/signature) widget is excluded
   entirely (1 widget out). 51 − (12−4) − (2−1) − (4−2) − 1 = 39.
2. **The applicant-identity block describes the adopted child, not the
   form's signer** — a structural pattern not seen on any other VAT
   companion authored to date. The printed section header reads
   "EVLAT EDİNİLME YOLUYLA TÜRK VATANDAŞLIĞINI KAZANMASI İSTENEN KİŞİYE
   AİT BİLGİLER" ("information about the person for whom acquisition of
   Turkish citizenship through adoption is requested"), and the form is
   actually signed and dated by the adoptive parent as "Veli/Vasisi"
   (guardian/custodian) per the closing declaration. Modelled with
   `foreignFirstName`/`foreignLastName`/`turkishFirstName`/
   `turkishLastName`/`birthPlaceName`/`birthCountry`/`dateOfBirth`/`sex`/
   `religion` describing the child, consistent with the naming already
   used for the applicant on Vat-3/6/8/9's split foreign/Turkish name
   fields.
3. **No mother's-name/father's-name question for the child at all** —
   confirmed absent from both the annotation dump and the rendered text
   layer of the child's information block (unlike every other VAT
   companion's applicant block, all of which carry `motherName`/
   `fatherName`). Consistent with an adoption-specific form in which the
   child's biological parentage is not asked, since the point of the
   form is to record the *adoptive* parents' identities in the block
   below.
4. **A genuine field-mislabeling finding, distinct from the recurring
   "Eğitim Durumu" tooltip bug**: the two AcroForm widgets rendered
   directly beneath the child's own printed "Türkçe Adı"/"Türkçe Soyadı"
   (Turkish-script given name/surname) labels carry the internal field
   names/`alternativeText` "Anne Ad_1"/"Baba Ad_1" ("Anne Adı"/"Baba
   Adı," mother's name/father's name) — almost certainly a copy-paste
   artifact from a sibling form's template where that exact row position
   genuinely holds the applicant's parents' names (e.g. Vat-1/Vat-2).
   Confirmed by rect position: both widgets sit in the same x-columns as
   the "Yabancı Adı"/"Yabancı Soyadı" widgets directly above them, one
   full label-row below, at the y-coordinate of the printed "Türkçe
   Adı"/"Türkçe Soyadı" text — not anywhere near the actual "Anne
   Adı"/"Baba Adı" labels, which only appear later in the adoptive-parent
   block (y≈363.8/346.3, far below this row's y≈668). Modelled as
   `turkishFirstName`/`turkishLastName`, resolved by rendered position
   rather than internal field name.
5. **Two full 10-field adoptive-parent blocks** — "BABAYA AİT BİLGİLER"
   (adoptive father's information) and "ANNEYE AİT BİLGİLER" (adoptive
   mother's information), each: identity number (T.C. Kimlik No or
   foreign identity number, per the field's own alternativeText),
   nationality, given name, surname, that parent's own mother's name,
   that parent's own father's name, place of birth, date of birth,
   marital status, and residential address. Modelled as
   `adoptiveFather*`/`adoptiveMother*` fields — deliberately not
   "paternal/maternal grandparent" naming (the Vat-1 convention), since
   these are the *adoptive* parents, not blood relatives of the child.
   **Both blocks are modelled fully optional**, the same disclosed
   at-least-one-of-N judgment call already used for Vat-1's two parent
   blocks: the form's own framing is "anne ve/veya baba" (mother and/or
   father), so at least one column must genuinely be completed, but the
   source provides no boolean/enum toggle to gate a `requiredWhen` rule
   on.
6. **The adoptive-parent block's `Medeni Hali` (marital status) and
   `Yerleşim Yeri Adresi` (residential address) fields are free text, not
   a checkbox/radio group** — confirmed by AcroForm field type (`Tx`),
   unlike the applicant's own marital status on Vat-1 (a `Btn` 4-way
   radio group). All four of these widgets (`fill_30`, `fill_31`,
   `fill_32`, `fill_33`) carry the identical miscopied `alternativeText`
   tooltip "Eğitim Durumu" (education level) — the same recurring bug
   already disclosed on the Vat-1/Vat-2/Vat-9/Vat-10 siblings' own
   VERIFICATION.md files — resolved here by rendered position (`fill_30`
   sits directly beneath "Medeni Hali" in the father's column, `fill_31`
   the same row in the mother's column; `fill_32`/`fill_33` sit beneath
   "Yerleşim Yeri Adresi" in the father's/mother's columns respectively)
   rather than tooltip text. Modelled as `adoptiveFatherMaritalStatus`/
   `adoptiveMotherMaritalStatus` (free-text `string`, not `enum`) and
   `adoptiveFatherResidenceAddress`/`adoptiveMotherResidenceAddress`.
7. **Out of scope**: the closing `Başvuran Ad` (printed name/signature)
   widget and the biometric-photograph box — signature/photograph-only
   artifacts, consistent with every prior VAT companion schema's
   exclusion of its own equivalent closing line. This is a single-page
   form with no separate office-completed intake or two-party attestation
   block (unlike Vat-1's page 2).
8. **`educationLevel`, `occupation`, and `religion` are left optional**
   for the child (no explicit required marker on the form for these
   three), matching every prior VAT companion schema's treatment of the
   identical fields.
9. **This closes the last VAT form banked as a future candidate by the
   GOV-4818 cycle.** All eleven of NVI's VAT-series citizenship forms
   (Vat-1 through Vat-6, Vat-8 through Vat-11) are now authored as
   companion schemas within Türkiye's National ID & Civic Documents
   vertical. Türkiye remains 1 of 6 verticals open — this is an eleventh
   schema within that already-open vertical, not a new vertical or
   jurisdiction. The NVI `vatandaslik-ile-ilgili-formlar` page itself may
   still carry non-VAT citizenship-adjacent forms not yet screened; a
   future cycle should re-scan that listing page fresh rather than assume
   it is fully exhausted.

## Conformance

3 valid mock scenarios — `valid-both-adoptive-parents-domestic` (both
adoptive father and mother blocks fully populated, filed domestically
with a Governorate), `valid-single-adoptive-mother-consulate` (only the
adoptive mother's block populated — a single-adopter scenario — filed
with a Consulate General abroad), and
`valid-single-adoptive-father-minimal-optional-fields` (only the adoptive
father's block populated, with `religion`/`educationLevel`/`occupation`
omitted to exercise the optional fields) — plus 16 static-`required`-field
mutation fixtures (one per each of this schema's 16 `required: true`
fields) and 1 unknown-field-rejected fixture — 20 fixtures total,
committed under
`conformance/tr/nvi/acquisition-of-turkish-citizenship-by-adoption-application/1.0.0/`.
This schema has no `requiredWhen` gates (the two adoptive-parent blocks
are modelled fully optional per finding 5 above, with no source toggle to
gate a conditional requirement on), so no `requiredWhen` mutation
fixtures apply.

An ephemeral, from-scratch conformance checker (deriving required-field
rules directly from this schema's own `fields[]`, discarded after use, not
committed) ran all 20 fixtures: all 3 valid scenarios at 0
missing-field/pattern errors, every mutation fixture raising exactly the
one error it targets, and the unknown-field fixture's extra key correctly
flagged — 20/20 passing. Every `foreignIdentityNumber` value across all
fixtures was asserted programmatically to match the schema's own
`^99[0-9]{9}$` pattern (11 characters total) before being written to disk,
per the GOV-4862 review finding on a prior VAT sibling. Validated clean
with `node tools/validate.mjs` and `node tools/validate-ajv.mjs` (676/676
documents, both individually and as part of the full registry run).
`registry-index.json` regenerated via `npm run build-index` in
`tools/govschema-client/`.
