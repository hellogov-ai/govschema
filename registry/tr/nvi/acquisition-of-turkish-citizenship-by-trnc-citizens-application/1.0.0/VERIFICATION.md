# Verification record — tr/nvi/acquisition-of-turkish-citizenship-by-trnc-citizens-application@1.0.0

## Candidate selection

GOV-4853 ("GovSchema Standard Research"). Since GOV-4818 opened Türkiye as
the registry's 100th jurisdiction via Form Vat-3 (general acquisition),
five prior cycles (GOV-4825/Vat-9, GOV-4832/Vat-6, GOV-4839/Vat-4,
GOV-4846/Vat-5) each authored the strongest remaining banked VAT companion
candidate on NVI's `vatandaslik-ile-ilgili-formlar` page. This cycle
re-scanned that same listing page fresh, re-fetched all six still-
unauthored forms (VAT-1, VAT-2, VAT-7, VAT-8, VAT-10, VAT-11), and
field-counted each via `pdfjs-dist`'s `getAnnotations()`:

| Form | Title | Pages | Widgets |
|------|-------|-------|---------|
| Vat-1 | 18 Yaşını Tamamladıktan Sonra Yurtdışından Doğuma İlişkin Başvuru/Beyan Formu | 2 | 87 |
| Vat-2 | Doğum Yeri Esasına Göre Kazanma (jus soli) | 1 | 72 |
| Vat-7 | Evlat Edinilme Yoluyla Kazanma (adoption) | 1 | 51 |
| Vat-8 | Seçme Hakkı İle Kazanma (acquisition by right of option) | 1 | 94 |
| Vat-10 | Seçme Hakkı İle Kaybetme (loss by right of option) | 1 | 62 |
| **Vat-11** | **KKTC Vatandaşlarının Türk Vatandaşlığını Kazanma (acquisition by TRNC citizens)** | **2** | **108** |

**Vat-11 was selected** as the strongest remaining candidate: the largest
widget count of the six, a genuinely distinct legal basis (Article 42 of
Law No. 5901, a dedicated pathway for citizens of the Turkish Republic of
Northern Cyprus reflecting Türkiye's unique bilateral relationship with
the TRNC — not marriage, not investment/exceptional acquisition, not
reacquisition, not renunciation), and a second page of open-ended
declarations (dual/other-state citizenship, statelessness, foreign
residence history, Turkish-citizen relatives) that none of the five
already-authored VAT companion schemas carry.

## Reaching the live source

- **Form Vat-11**:
  `https://www.nvi.gov.tr/kurumlar/nvi.gov.tr/mevzuat/nufusmevzuat/Formlar/Vatandaslik/Vat11-FormKKTCVatTurkVatKaz.pdf`
  — confirmed live directly from NVI's own current
  `nvi.gov.tr/vatandaslik-ile-ilgili-formlar` listing page (fetched fresh
  this cycle), HTTP 200, `Content-Type: application/pdf`,
  `Content-Length: 1170672` bytes (matches the downloaded file exactly),
  sha256 `8f6402d03fd29c8f50089d7ef4ee911978454b8cee4158e1458aad7b3986e9c0`,
  `Last-Modified: Tue, 04 Aug 2020 08:33:58 GMT`, no login/CAPTCHA gate.
  Retrieved 2026-07-25.
- Field structure extracted with `pdfjs-dist`'s `getAnnotations()` (108
  AcroForm widgets across 2 pages) and cross-checked against each page's
  extracted text layer (`getTextContent()`) to resolve every widget's
  rect position to the label it sits directly beneath.
- Legal basis: Law No. 5901 on Turkish Citizenship (Türk Vatandaşlığı
  Kanunu), Article 42 — the form's own closing declaration cites this
  article by number ("K.K.T.C. vatandaşı olup 5901 sayılı Türk
  Vatandaşlığı Kanununun 42'nci maddesine göre Türk vatandaşlığını
  kazanmak istiyorum," i.e. "Being a TRNC citizen, I wish to acquire
  Turkish citizenship under Article 42 of Law No. 5901"). Note: the
  form's own page-1 section header directly above the applicant block
  reads "ANNE VE/VEYA BABAYA BAĞLI OLARAK TÜRK VATANDAŞLIĞINI KAZANMAK
  İSTEYEN KİŞİYE AİT BİLGİLER" ("Information about the person seeking to
  acquire Turkish citizenship dependent on mother and/or father") — likely
  reused template boilerplate from a different VAT form, since it
  contradicts the form's own title and closing declaration (both citing
  the TRNC-citizen/Article-42 basis, with no mother/father-descent
  question anywhere on the form). Not modelled as a field; noted here as
  a disclosed source-document inconsistency, not a GovSchema authoring
  error.

## Findings / disclosed scoping calls

1. **108 widgets reconcile to 74 logical `fields[]`.** Page 1 (92
   widgets): 13 composite day/month/year groups collapse to 1 date field
   each (`dateOfBirth`, `marriageDate`, `divorceDate`, `spouseDeathDate`,
   `spouseDateOfBirth`, `child{1,2,3}DateOfBirth`, `declarationDate` — 9
   groups × 3 widgets = 27 widgets → 9 fields), the `Cinsiyet` radio pair
   collapses to 1 `sex` field (2 → 1), the `Secim_3` 4-way radio group
   collapses to 1 `maritalStatus` field (4 → 1), the split phone
   (`Alan kodu` + `Telefon`) and split email (`Eposta` + `Eposta_2`) boxes
   each collapse to 1 field (4 widgets → 2 fields), and the closing
   `Başvuran Ad` (printed name/signature) widget is excluded entirely (1
   widget out) — 92 widgets → 67 fields. Page 2 (16 widgets): 7 free-text
   declaration widgets (`fill_1`, `fill_2_2`, `fill_3_2`, `fill_4`,
   `fill_5`, `fill_6`, `fill_7_2`) map 1:1 to 7 fields; the remaining 9
   widgets (`Beyan Ad` ×2, `Beyan Unvan`, `B_Gün` ×2, `B_Ay` ×2, `B_Yıl`
   ×2 — the receiving-official's and re-declarant's signature blocks) are
   excluded entirely, per finding 6 below. 67 + 7 = 74 `fields[]` total.
2. **Genuine field-name collision found and disclosed**: the source PDF's
   `Beyan Ad`, `B_Gün`, `B_Ay`, and `B_Yıl` field names are each reused
   verbatim across *two different widgets* on page 2 — one under the
   left-column "Beyan Alan Yetkilinin" (the receiving official's name/
   date) heading, the other under the right-column "Beyan Verenin" (the
   declarant's own name/date) heading, at the same y-coordinate but
   different x-coordinates. Per standard PDF AcroForm semantics, widgets
   sharing a fully-qualified field name mirror the same value — meaning
   in the live, fillable PDF, typing into either the official's or the
   declarant's name/date box silently overwrites the other. This is very
   likely an authoring oversight in NVI's own source PDF (the two roles
   are logically distinct people), not an intentional shared-value
   design. Neither block is modelled as a schema field (see finding 6);
   flagged here as a genuine, disclosed source-document quirk in the
   spirit of prior cycles' TCKN/YKN field-naming findings (e.g. GOV-4846).
3. **No foreign-script/Turkish-script name split for the applicant** —
   unlike Vat-3/4/5/6 (each of which splits the applicant into
   `foreignFirstName`/`foreignLastName` plus `turkishFirstName`/
   `turkishLastName`), Vat-11's own applicant block provides only a single
   `Ad_1`/`Soyad_1` pair (confirmed by both the annotation dump and the
   rendered text, "Adı ... Soyadı" with no "Yabancı"/"Türkçe" qualifier
   anywhere in that row). Modelled as plain `firstName`/`lastName`.
4. **Spouse block carries no nationality/citizenship qualifier** — Vat-11's
   own section header reads "EŞE AİT BİLGİLER" ("Information About the
   Spouse"), not Vat-6's "TÜRK VATANDAŞI EŞE AİT BİLGİLER" ("Information
   About the Turkish-Citizen Spouse"). Consistent with this, the section
   *does* carry its own `Uyruk_2` (nationality) widget — the mirror image
   of Vat-6's finding that its Turkish-citizen-only spouse block has *no*
   nationality row. `spouseIdentityNumber` is therefore modelled as a
   generic identity-number string (no strict T.C.-Kimlik-No digit
   pattern), matching Vat-3's precedent for a spouse of unconstrained
   nationality, not Vat-6's 11-digit-pattern precedent.
5. **Children carry only a foreign identity number, no T.C. Kimlik No** —
   the minor-children table's `YKN_3`/`YKN_4`/`YKN_5` widgets sit directly
   beneath "Varsa Yabancı Kimlik No (99… ile başlayan)" with no parallel
   `TCKN_3`/`TCKN_4`/`TCKN_5` widgets anywhere in the annotation dump —
   confirmed both fields are absent, unlike Vat-5's reacquisition-applicant
   children (who may hold both, since a reacquiring parent's children
   could have previously held Turkish citizenship). Consistent with
   Vat-11's premise: a TRNC-citizen applicant's children would not have
   previously held Turkish citizenship.
6. **Each child's `Cinsiyeti` (sex) is a free-text widget (`fieldType:
   "Tx"`), not a radio-button pair** — confirmed directly from the
   annotation dump (`Cinsiyet_3`/`Cinsiyet_4`/`Cinsiyet_5` all report
   `"Tx"`), unlike the applicant's own `Cinsiyet` (a genuine `"Btn"`
   radio pair). Modelled `child{1,2,3}Sex` as `type: "string"` rather than
   the `enum` used for the applicant's own `sex`, to preserve fidelity to
   the actual widget control type; the description documents the expected
   "Erkek"/"Kadın" values.
7. **Out of scope**: the closing `Ad Soyad`/`İmza` (printed name/
   signature) widget (`Başvuran Ad`), the biometric-photograph box, and
   the *entire* page-2 "Beyan Alan Yetkilinin"/"Beyan Verenin" signature
   block (9 widgets: officialdom's name/title/date plus the duplicate-
   named declarant name/date widgets discussed in finding 2) — all
   receiving-authority- or signature-only artifacts, consistent with
   every prior VAT companion schema's exclusion of its own equivalent
   closing line.
8. **Page-2 "Gerekli Diğer Bilgiler" (Other Required Information) block
   is unique to this schema** among the registry's VAT companions — none
   of Vat-3/4/5/6/9 carry a second page of open-ended declarations. Three
   of its seven fields (`otherNationalityDeclaration`, `residenceSinceDate`,
   `nameUsedInResidenceCountry`) are always-applicable and modelled
   `required: true`; the remaining four
   (`foreignCitizenshipAcquisitionInfo`, `statelessLegalConductDeclaration`,
   `turkishCitizenSiblingsDeclaration`, `turkeyRelativesDeclaration`) are
   each conditional on a fact pattern the form does not capture via a
   separate structured control (whether the applicant holds another
   citizenship, is stateless, has Turkish-citizen siblings, or has
   relatives in Türkiye) — the source provides no boolean/enum toggle to
   `requiredWhen`-gate against, so these four are left `required: false`
   with a description disclosing their true conditional applicability,
   the same disclosed-judgment-call pattern used for genuinely conditional
   fields lacking a gating control elsewhere in the registry.
   `foreignCitizenshipAcquisitionInfo` is modelled `type: "string"` rather
   than `date`, since its own widget is a single free-text blank with no
   day/month/year split (unlike this schema's other date fields) and may
   legitimately contain "by birth" or "not applicable" rather than a
   calendar date.
9. **`educationLevel`, `occupation`, and `religion` are left optional**
   for the applicant (no explicit required marker on the form for these
   three), matching every prior VAT companion schema's treatment of the
   identical fields.
10. This closes one of the six remaining GOV-4818-banked VAT candidates.
    VAT-1, VAT-2, VAT-7, VAT-8, and VAT-10 remain open, unscreened backlog
    candidates on the same NVI page for a future companion-schema cycle.
    Türkiye remains 1 of 6 verticals open (National ID & Civic Documents)
    — this is a sixth schema within that already-open vertical, not a new
    vertical or jurisdiction.

## Conformance

3 valid mock scenarios — `valid-single-applicant-minimal` (single
applicant, no spouse, no children, filed domestically with a
Governorate), `valid-married-applicant-with-spouse-consulate` (filed with
a Consulate General abroad, spouse block fully populated, every optional
applicant/page-2 field populated, no children), and
`valid-widowed-applicant-with-three-children` (widowed applicant with a
deceased spouse, all 3 children columns fully filled) — plus 20
static-`required`-field mutation fixtures, 11 `requiredWhen` mutation
fixtures (9 gated on marital status ∈ {married, divorced, widowed} via the
married scenario, 1 gated on divorced via a locally-derived divorced
variant, 1 gated on widowed via the widowed scenario), and 1
unknown-field-rejected fixture — 35 fixtures total, committed under
`conformance/tr/nvi/acquisition-of-turkish-citizenship-by-trnc-citizens-application/1.0.0/`.

An ephemeral, from-scratch conformance checker (deriving required-field
and `requiredWhen` rules directly from this schema's own `fields[]`,
discarded after use, not committed) ran all 35 fixtures: all 3 valid
scenarios at 0 missing-field errors, every mutation fixture raising
exactly the one error it targets, and the unknown-field fixture's extra
key correctly flagged — 35/35 passing. Validated clean with
`node tools/validate.mjs` and `node tools/validate-ajv.mjs`
(671/671 documents, both individually and as part of the full registry
run). `registry-index.json` regenerated via `npm run build-index` in
`tools/govschema-client/`.
