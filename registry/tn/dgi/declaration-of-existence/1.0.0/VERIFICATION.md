# Verification record — tn/dgi/declaration-of-existence@1.0.0

## Candidate selection

GOV-4659 ("GovSchema Standard Research"). GOV-4638 (a prior cycle of the same
recurring routine) scouted Tunisia's Business Formation candidate as STRONG:
"a 'Déclaration d'existence' tax-registration-trigger form, `finances.gov.tn`,
254KB — the Registre National des Entreprises' own site offers only document
checklists, not a fillable form" — but banked it rather than authoring it,
since that cycle's scope was the new-jurisdiction opening itself (Tunisia's
Passport vertical, via a companion DGSN form). This cycle re-scouted and
independently re-fetched the candidate before authoring it, opening Tunisia's
Business Formation vertical (3 of 6: Passport, National ID, now Business
Formation). Tunisia's remaining two verticals (Taxes, Visa — both scouted
STRONG or near-STRONG by GOV-4638) and DMV (weak) are unchanged open backlog.

## Reaching the live source

Found via web search for the form's own Arabic/French name, landing on the
Ministry of Finance's own document page,
`https://www.finances.gov.tn/fr/document/declaration-dexistence-0`, which
links the PDF at a site-relative path.

- Plain unauthenticated `curl` request (realistic desktop `User-Agent`
  header; `-k` to skip TLS verification, no session/cookie state, no
  CAPTCHA/WAF challenge).
- Direct PDF URL:
  `https://www.finances.gov.tn/sites/default/files/2019-08/dclaration_dexistence_contribuable_0.pdf`
  — HTTP 200, **254,216 bytes** retrieved, matching GOV-4638's own banked
  estimate ("254KB") almost exactly.
- sha256 of the retrieved bytes:
  `6387c21130005c29b5a44a1c5696a46a0b637e65666edfca54cea30fe1199add`.
- 2 pages, confirmed via `pdfjs-dist`'s `numPages`.
- `getAnnotations()` returned 0 annotations on both pages — a flat,
  print-and-fill specimen, not an interactive AcroForm.

### Authority attribution

Page 1's own header carries two seals side by side: "الإدارة العامة للأداءات
/ DGI / DIRECTION GÉNÉRALE DES IMPÔTS" (top-left) and "الجمهورية التونسية /
وزارة المالية / MINISTÈRE DES FINANCES" (top-right). `authority` is modelled
as the Direction Générale des Impôts, abbreviated DGI, under the Ministry of
Finance — a new authority for this registry's Tunisia entries (the existing
Passport and National ID schemas are both DGSN, Ministry of the Interior).
`finances.gov.tn` is modelled as both the issuing authority's own domain and
the hosting portal (unlike the DGSN forms, which are hosted on the
multi-ministry `sicad.gov.tn` portal).

## Extraction method

`pdfjs-dist`'s `getTextContent()` extracted a text layer on both pages, but
unlike every prior Tunisian specimen in this registry, **the extracted string
order did not reassemble into readable Arabic** — words and letter clusters
came back visually scrambled (e.g. a line that should read "تسجيل القانون
الأساسي" extracted as disordered fragments). This is a distinct PDF-extraction
failure mode from this registry's other three documented patterns (missing
ToUnicode CMap on Cyprus's EE1; zero-text-layer vector checkboxes on
Belgium's passport form; clean RTL extraction needing only right-to-left
reading-order resolution on Tunisia's own DGSN forms) — here the text layer
exists and decodes to real Unicode Arabic codepoints, but the glyph-paint
order embedded in this specimen's content stream does not correspond to
logical reading order strongly enough to reconstruct the source by string
manipulation alone.

**Resolution:** the same `node-canvas`-at-3x-scale rendering technique this
registry has used before for checkbox-layout confirmation was used here as
the *primary* reading method, not a supplementary one — every field label,
checkbox group, and footnote below was read directly off the rendered PNG
(`/tmp/decl-page1.png`, `/tmp/decl-page2.png` during this cycle's own
session), not off the raw `getTextContent()` string order. This is a new
circumstance for this registry's Tunisian sources: prior DGSN forms could be
extracted and read directly from the text layer; this DGI form requires the
rendered image as the authoritative reading, with the text layer serving only
as confirmation that genuine Arabic Unicode text (not a private-use-area
font encoding) underlies the visible glyphs.

## Document structure

**Page 1** — header (DGI seal, form title "تصريح بالوجود", Ministry of
Finance seal); a declaration-nature checkbox pair (أوّلي / تحيين) plus a
declaration-code box; an office/category code block (رمز المصلحة, رمز الفرع
الثانوي, رمز الصنف, رمز الأداء على القيمة المضافة, المعرف الجبائي); an
identity-numbers block (رقم الانخراط في الضمان الاجتماعي; رقم بطاقة التعريف
الوطنية أو رقم بطاقة الإقامة للأجانب أو رقم جواز السفر با its own
code/number/issue-date columns; رقم السجل التجاري; المحكمة); then the main
applicant-facing body: name/company-name; business-activity address; phone/
fax/nationality/legal-form/activity-start-date; exchange regime; share
capital; founding-act registration reference; natural-person birth details
(date of birth, sex); primary and secondary business activity (each with its
own code and start date); the natural-persons-only tax-regime election block
(two income-category groups, each with its own regime checkboxes); VAT
status and election dates; personal/registered-office address; elected
notification address; secondary-branches question; two tax-incentive entries;
an incentivized-activity location/headcount block; and the fiscal year-end
date (month/year only).

**Page 2**, headed "خاص بالأشخاص المعنويين" (specific to legal persons) — a
"هوية الممثل القانوني للشركة" (identity of the company's legal
representative) table with two printed rows; a "هوية صاحب المؤسسة بالنسبة
لشركات الشخص الواحد ذات المسؤولية المحدودة" (identity of the founder, for
single-member LLCs/SUARL) table with one printed row; the closing attestation
("إني الممضي أسفله... أصرّح بصحة البيانات...") with place/date blanks and a
stamp-and-signature line; and a block of unnumbered footnotes (referenced
throughout both pages by a bare "( )" marker, not a numbered superscript
system) spelling out who must file this declaration, the identity-code
vocabulary, the VAT-status vocabulary, the legal-representative-capacity
vocabulary, and which boxes are administration-only.

## Scope: the isLegalEntity discriminator

This form has no single explicit checkbox toggling between a natural-person
and a legal-person filing — instead, page 1 prints natural-person-specific
fields (date of birth, sex, the natural-persons-only tax-regime block)
alongside fields that read naturally for either kind of declarant, and page 2
is headed specifically "خاص بالأشخاص المعنويين" (specific to legal persons).
This schema introduces `isLegalEntity` (boolean) as its own discriminator,
matching this registry's own `isBodyCorporate` precedent (see
`zm/pacra/company-incorporation`) for forms that print natural-person and
legal-person sections side by side with no explicit either/or signal.
`individualFirstName`/`individualFamilyName` are `requiredWhen
isLegalEntity` equals `false`; `companyName` and every page-2
legal-representative field are `requiredWhen isLegalEntity` equals `true`.

## Scope: sections and fields excluded from v1.0.0

- **The office/category code block** (`رمز المصلحة`, `رمز الفرع الثانوي`,
  `رمز الصنف`, `رمز الأداء على القيمة المضافة`, `المعرف الجبائي` on a genuine
  *initial* filing) is excluded — one of this block's own footnotes reads
  "قسيمة تتولى تعميرها الإدارة" (box completed by the administration),
  confirming at least `رمز المصلحة` is office-assigned; the remaining codes
  in the same visually-grouped block are excluded on the same reasoning
  (categorization/VAT-registration codes assigned once DGI processes the
  filing, not entered by the applicant at intake). `المعرف الجبائي` is
  re-admitted as `existingTaxId`, but only for `UPDATE`-nature filings, where
  the taxpayer already holds one and must supply it to identify their file.
- **`رمز التصريح ( )`** is *not* excluded with the block above — a distinct
  footnote ("تلقائي - اكتشاف", spontaneous / discovered-by-audit) ties it to
  a genuine two-value classification of why this declaration is being filed,
  modelled as `declarationTrigger`. Whether this box is completed by the
  taxpayer or by the processing officer is not stated by the source; it is
  modelled optional (not required) to avoid overclaiming either reading.
- **The single-member-LLC (SUARL) founder-identity table on page 2** is
  excluded from v1.0.0 — it applies only to the subset of legal entities
  organized specifically as a SUARL, a distinction this schema's `legalForm`
  free-text field does not structurally capture, and gating it on
  `isLegalEntity` alone would wrongly require it for every company. Banked as
  an open companion-schema/minor-version candidate for a future cycle.
- **The second legal-representative row** (page 2's own table prints two)
  is excluded from v1.0.0 for the same reason as prior bounded-repeating-group
  precedents where the source gives no companion "number of representatives"
  count field to gate a second slot's requiredness on — banked as the most
  likely next PATCH/minor-version candidate, alongside the SUARL block above.

## Scope: judgment calls on requiredness and modelling

This source has no global asterisk/mandatory marking convention (the several
bare "( )" markers throughout are footnote references, not required-field
indicators), so requiredness was assigned by engineering judgment:

1. **`declarationNature` required** — the applicant must indicate whether
   this is an initial filing or an update to an existing one.
2. **Core identity/address fields modelled required**
   (`individualFirstName`/`individualFamilyName`/`companyName` per the
   `isLegalEntity` gate; `activityStreet`/`activityCity`/
   `activityGovernorate`/`activityDelegation`; `nationality`;
   `activityStartDate`; `exchangeRegime`; `headOfficeStreet`/
   `headOfficeCity`/`headOfficeGovernorate`/`headOfficeDelegation`;
   `hasSecondaryBranches`; `primaryActivity`; `declarationDate`;
   `applicantSignature`) — the minimum data DGI needs to register any
   declarant and route correspondence.
3. **`nationality` modelled as a two-value enum, not free text** — a page-2
   footnote ("الرقم بالبلاد التونسية - الجنسية - تونسية - أجنبية") confirms
   this box is a Tunisian/Foreign checkbox, not a nationality-name field.
4. **`vatStatus` modelled as a three-value enum** — a page-2 footnote
   ("إجباري - جزئي - اختياري") confirms this box's vocabulary is
   mandatory/partial/optional VAT liability, not free text.
5. **`representativeCapacity` modelled as a three-value enum** — a page-2
   footnote spells out "رئيس مدير عام" / "وكيل" / "ممثل قانوني آخر" verbatim.
6. **`legalForm` modelled as free text despite a "specific to companies"
   footnote** — the footnote ("خاص بالشركات") confirms this box's audience
   but names no closed vocabulary of legal forms anywhere on the source.
7. **`shareCapital`/`legalForm` gated `requiredWhen isLegalEntity`** — capital
   and a formal legal form are meaningful only for an incorporated entity,
   not an individual professional or sole trader filing under this same form.
8. **The tax-regime block (`taxRegimeCategory`/`professionalTaxRegime`/
   `commercialTaxRegime`) gated `requiredWhen isLegalEntity` equals `false`**
   — this block's own printed header reads "النظام الجبائي بالنسبة إلى
   الأشخاص الطبيعيين" (tax regime *for natural persons*), an explicit
   audience restriction rather than this registry's own inference.
9. **`professionalTaxRegime`/`commercialTaxRegime` each gated on
   `taxRegimeCategory`** rather than modelling one combined enum, since the
   source prints two structurally distinct checkbox groups (professional
   income vs. industrial/commercial income), each with its own regime
   vocabulary that would otherwise collide in a single flat enum.
10. **`tradeRegisterNumber`/`court` left unconditional-optional, not gated on
    `isLegalEntity`** — the source's own filer list includes "every natural
    person who practices an activity subject to control by a professional
    body," a category that is not necessarily commercially registered;
    conversely not every company detail is known to require this pairing
    disclosed independent of entity type. Modelled optional for either path.
11. **`fiscalYearEndDate` modelled as a string, not this schema's `date`
    type** — the source prints only month and year boxes for this one field
    (every other date on the form prints day/month/year), and this schema's
    `date` type implies day-level precision the source does not carry.
12. **The incentivized-activity location/headcount block's tie to the
    tax-incentives section above it** is this registry's own reading, not an
    explicit source label — disclosed in the field-level `description`
    fields rather than asserted as certain.
13. **`notEquals ""` is never used as a `requiredWhen` gate against an
    optional field**, per this registry's own standing lesson (see the
    `notequals-empty-string-absent-field-bug` reference) — every gate in
    this schema keys off a boolean or enum field's own discrete value.

## Conformance

4 mock scenarios (2 positive, 2 negative) were run programmatically via a
small one-off Node script evaluating this schema's own `fields[]`/
`documents[]` `requiredWhen` conditions directly (not committed as fixture
files, following this registry's own precedent for single flat-PDF schemas):
(1) an individual non-commercial professional (a lawyer) electing the real
regime, no secondary branches — 0 errors; (2) a legal entity (SARL) with two
secondary branches, its legal representative, and the branch-list document
attached — 0 errors; (3) a negative case, the same company omitting both the
now-required branch-list document and the representative's first name —
correctly flags exactly those two errors, nothing else; (4) a negative case,
a legal entity omitting `companyName` — correctly flags it, and does not
spuriously require any natural-person-only field. Every `requiredWhen` gate
in this schema (`isLegalEntity`, `declarationNature`, `taxRegimeCategory`,
`hasSecondaryBranches`) was exercised true and false at least once across
the four scenarios.

Validated clean with `node tools/validate.mjs` and `node
tools/validate-ajv.mjs` (ajv 2020-12 against
`spec/v0.3/govschema.schema.json`). `registry-index.json` regenerated via
`npm run build-index` in `tools/govschema-client/`.

Models 85 `fields[]` across 14 steps, 1 `documents[]` entry.
