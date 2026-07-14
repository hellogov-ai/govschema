# Verification record — `bg/nra/deklaratsiya-za-registratsiya-na-samoosiguryavashto-se-litse` v1.0.0

This file is the **source-review record** for this document version, per the
`manual-source-review-v1` practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-14`
- **`maturity.level`:** `structural-reference`

This is GovSchema Standard Research cycle **GOV-2821**. This schema **opens
Bulgaria as the registry's 51st jurisdiction**, via the Taxes vertical.

## Source verification (independently re-derived, not copied from the task briefing)

The task briefing (GOV-2821) named NRA's "Декларация за регистрация на
самоосигуряващо се лице" as the primary lead, but noted nra.bg's WebSphere
Portal CMS made a direct downloadable file hard to locate, and that three
third-party mirrors (hamixbg.com, trox-bg.com, tera-bg.com) existed but were
unconfirmed. This cycle did **not** use any of those three mirrors — one
(`hamixbg.com`) was attempted as a cross-reference and timed out/failed to
connect (`curl` exit code 1) — and instead located a genuine first-party
direct-download URL on nra.bg itself:

- Fetched the canonical content page
  (`https://nra.bg/wps/portal/nra/documents/insurance/naredba.obshtestveno.osiguryavane.morski.litsa/ee0b7711-f4dc-4d2b-ac21-3e6366c4eedd`,
  HTTP 200) and, separately, its underlying `wps/wcm/connect` fragment
  (HTTP 200, 2,274 bytes of raw HTML), whose own embedded download-widget
  markup contains the direct attachment link — this is how the direct URL
  was found, not by guessing or by a third-party mirror.
- **Direct source URL** (confirmed live):
  `https://nra.bg/wps/wcm/connect/nra.bg25863/f17bc761-386e-4fc9-9e82-2ec22ba825e4/Декларация+за+регистрация+на+самоосигуряващо+се+лице.xls?MOD=AJPERES&CACHEID=ROOTWORKSPACE.Z18_PPGAHG8009LJC0QTR5C2HH30I6-f17bc761-386e-4fc9-9e82-2ec22ba825e4-nSQp99I`
  (URL-encoded exactly as cited in `schema.json`'s own `source.url`).
  - **HTTP 200**, `Content-Type: application/vnd.ms-excel`, **694,784
    bytes**, `ETag: "-1244795744"` (no `Last-Modified` header was sent).
  - Confirmed the same URL **without** its `MOD`/`CACHEID` query string
    404s — the query string is load-bearing, not decorative, so it is
    retained in full in `source.url`.
  - **`sha256`:**
    `dbd8905850a43a04e8706a7801bd5740bb66987a15feaf607c45f4fb73b7ce66`
    (computed via `sha256sum` on the freshly-downloaded file).
  - The content page's own metadata gives a publication date of
    **2020-11-28** ("Дата на публикуване: Nov 28, 2020"), used as
    `documentRef`'s date since the resource itself sends no
    `Last-Modified` header. Current (2026) third-party accounting/tax
    commentary (kik-info.com, firmify.bg, zakonnik.bg, all dated within
    the last two years) continues to reference this exact form under the
    name "ОКД-5" with the same field structure described below, supporting
    that this is still the live, current template, not a stale artifact.
- **TLS note:** `nra.bg`'s HTTPS endpoint fails standard certificate-chain
  validation (`curl`: "unable to get local issuer certificate"). Independently
  inspected the leaf certificate directly via `openssl s_client`: issued by
  Sectigo Limited ("Sectigo Public Server Authentication CA DV R36") for
  `CN=*.nra.bg`, valid 2026-06-22 through 2027-01-06 — a legitimate,
  currently-valid certificate from a public CA, not self-signed or expired.
  The validation failure is the server omitting the intermediate
  certificate from its handshake (a common misconfiguration), not evidence
  of an untrustworthy or fake endpoint. Fetches in this record used `curl
  -k`/`--insecure` after this independent certificate inspection, not
  before it.
- **File-format confirmation:** the downloaded file's first 8 bytes are
  `D0 CF 11 E0 A1 B1 1A E1` — the OLE2/Compound File Binary magic number —
  confirming a genuine (not corrupted or renamed) legacy Excel `.xls`
  binary workbook, not a mislabeled PDF, HTML error page, or zip-based
  `.xlsx`.

## Document structure and extraction method

**This source is not a PDF AcroForm, unlike the great majority of this
registry's schemas**, and this cycle's extraction method differs from the
usual `pdfjs-dist` page-render/annotation-count practice accordingly; this
section discloses that method and its limitations in full.

- Opened via SheetJS (`xlsx` npm package, installed in a disposable scratch
  directory, not committed) as a workbook with 3 sheets (`Sheet1` populated,
  `Sheet2`/`Sheet3` empty). `Sheet1`'s own cell range is `B1:AQ184`, but
  **the visible printed text is not stored as cell values** — of 1,685
  populated cell keys, all but a handful are empty-but-styled ("z"-type)
  cells used only for the grid/border layout. The form's actual text is
  drawn as floating Excel shapes (Escher text boxes, grouped with lines and
  rectangles for the visual grid), which SheetJS's community edition does
  not parse.
- Extracted the visible text directly from the raw OLE2 byte stream instead:
  a from-scratch Node script (disposable, not committed) scans the binary
  for runs of UTF-16LE code units in the printable-ASCII and Cyrillic
  (U+0400-U+04FF) ranges, merges adjacent runs separated by short
  (<=8-byte) gaps of non-text formatting bytes, and filters to runs
  containing at least one Cyrillic character (to exclude Escher shape names
  like "Group 4581"/"Line 4583" and numeric-format strings, which are pure
  ASCII). This surfaced every field label, footnote, and the two insurance-
  coverage-option sentences verbatim.
- **Limitation, disclosed rather than papered over:** this method reads
  *what text exists in the binary stream*, in the stream's own (not
  necessarily visual/top-to-bottom) order — Escher shapes are stored in
  creation order, which this cycle directly observed does not match reading
  order (e.g. the address-block field labels at byte offsets 171892-240314
  physically precede their own "Постоянен адрес на лицето" section-header
  label at offset 240314 in the stream). Consequently:
  - **No required/optional marker (e.g. an asterisk) could be read from the
    source.** Unlike a PDF AcroForm's `/Ff` required-bit or a printed "*"
    glyph correlated by position, this format exposes no analogous signal
    this cycle's method could extract. Every `required: true` in this
    schema is therefore an editorial judgment call (declarant identity,
    permanent address, signature — fields inherently necessary for a valid
    legal declaration), not a confirmed source marker. This is the single
    most consequential difference from this registry's usual PDF-derived
    verification rigor, and is disclosed here explicitly rather than
    implied by silence.
  - **No pixel-accurate page count.** The footer print-template string
    (`&L&"Times New Roman,Italic"&10ОКд5, версия Д&C...&RСтр. &P от &N`,
    i.e. a "Page P of N" template applied per-page) confirms the form
    spans more than one printed page, and the presence of two near-
    identical "Дата"/"Подпис" (Date/Signature) label pairs at well-separated
    byte offsets (see below) is consistent with a 2-page form with a
    per-page attestation footer, but no tool used this cycle can assert an
    exact page count the way `pdfjs-dist`'s `numPages` does for a PDF.
    `schema.json`'s own description avoids asserting a specific page count
    for this reason.
- **External cross-reference, used only to corroborate, never to
  substitute for the binary extraction above:** this form ("ОКД-5") is
  independently and consistently described across multiple current
  (2024-2026) Bulgarian accounting/tax-advisory sources (`kik-info.com`,
  `firmify.bg`, `zakonnik.bg`) as covering exactly the same four
  circumstances this cycle found as independent date rows in the binary
  (starting/suspending/resuming/terminating the insured activity) and the
  same two-tier insurance-coverage election. This corroboration is cited in
  `schema.json`'s field descriptions only where it explains terminology
  (e.g. "терминира" = deregistering from BULSTAT) that the binary extraction
  alone would not make clear; every field's existence and label text is
  from the binary extraction, not the third-party commentary.

## Field derivation, by extracted section

- **Header:** `individualIdNumber` ("Идентификационен номер на ФЛ",
  footnote 1: ЕГН/ЛНЧ/ЛН/service number), `legalEntityOrSoleTraderIdNumber`
  ("Идентификационен номер на ЮЛ/ЕТ", footnote 2: EIK per BULSTAT/EIK per
  Commercial Register/service number), `dateOfCompletion` ("Дата на
  попълване"), `fullName` ("Име, презиме и фамилия на лицето").
- **Permanent address** ("Постоянен адрес на лицето"): `permanentAddressTown`
  ("Град/село"), `permanentAddressMunicipality` ("Община"),
  `permanentAddressStreet` ("Улица" — no separate house-number label was
  found anywhere near this block, so the street number is folded into this
  field's free text), `permanentAddressEntrance` ("Вход"),
  `permanentAddressBlock` ("Блок"), `permanentAddressFloor` ("Етаж"),
  `permanentAddressApartment` ("Апартамент"), `permanentAddressPostalCode`
  ("Пощенски код").
- **Correspondence address** ("Адрес за кореспонденция на лицето"): the
  identical 8-field structure repeats verbatim (confirmed each of Град/
  село, Улица, Блок, Вход, Етаж, Апартамент, Община, Пощенски код appears a
  second time at a distinct byte offset), plus one additional field not
  present in the permanent-address block: `correspondenceAddressPhone`
  ("Телефон").
- **Circumstance/activity block:** `activityDescription` ("Упражнявам
  дейност като: ..........."), then four independent date rows —
  `activityStartDate` ("Упражнявам дейността от дата"),
  `activitySuspensionDate` ("Прекъсвам дейността от дата"),
  `activityResumptionDate` ("Възобновявам дейността от дата"),
  `activityTerminationDate` ("Прекратявам дейността от дата"). No printed
  checkbox or single selector ties these four together into a mutually-
  exclusive group on this specimen — each is four Escher shapes (a text-box
  label plus a day/month/year box triad), independent of the other three —
  so no `exclusivityGroups`/`crossFieldValidation` constraint is imposed;
  `schema.json`'s own field descriptions note that in practice a filer
  completes only the one row matching their circumstance.
- **Insurance-coverage declaration:** `insuranceCoverageScope`
  ("Декларирам:"), collapsing the source's own two checkbox options — "за
  всички осигурени социални рискове без трудова злополука и професионална
  болест и безработица" (all insured risks except work accident/
  occupational illness/unemployment) and "инвалидност поради общо
  заболяване, за старост и за смърт" (disability due to general illness,
  old age, and death only) — into one enum, consistent with this registry's
  established practice (e.g. `ro/anaf`, `rs/mup`) of collapsing a source's
  own mutually-exclusive checkbox set into a single enum field.
- **Signature:** `declarantSignature` ("Подпис:"). This label, paired with
  a "Дата" label, appears **twice** in the extracted text (at byte offsets
  113945/111273 and 122279/119656 respectively). No "упълномощено лице"
  (authorized representative) or "приел" (received-by, i.e. an NRA clerk's
  own counter-signature) label was found anywhere in the extraction, which
  would be the expected wording for a genuinely distinct second signer on a
  Bulgarian government form of this kind. Modeled as a single field,
  representing the same declarant's attestation repeated once per page of
  this multi-page form — a judgment call, disclosed here rather than
  silently modeling two signature fields or arbitrarily picking one
  occurrence.

Every fillable concept found in the extraction was mapped to one of this
schema's 28 `fields[]` entries. No `documents[]` entry was added: unlike
e.g. `ro/anaf`'s verbatim attestation-statement paragraph, this source's own
extracted text contains no separate attestation sentence distinct from the
"Подпис"/signature block itself — the closest analogous text is the
standard NRA privacy-notice boilerplate (GDPR/ЗЗЛД processing notice),
which is informational, not something the declarant attests to, so it is
not modeled as a field or document.

## Scoping and modeling judgment calls

- **No `required`/optional signal available from the source format itself**
  (see "Document structure and extraction method" above) — every
  `required: true` in this schema (declarant ID number, name, permanent
  address town/street, date of completion, signature) reflects what is
  inherently necessary for the declaration to be a valid legal filing, not
  a confirmed printed marker. This is the most significant methodological
  difference from this registry's usual AcroForm-derived schemas and is
  disclosed prominently rather than presented with false confidence.
- **`legalEntityOrSoleTraderIdNumber` modeled optional.** Not every
  self-insured-person category (e.g. certain liberal professions without a
  separate BULSTAT registration) necessarily has a distinct ЮЛ/ЕТ
  identifier separate from their personal ID, per the source's own
  footnote phrasing ("като например, но не само" — "such as, but not
  limited to" — implying the box may sometimes be inapplicable). Only
  `individualIdNumber` is modeled `required: true`.
- **Street number folded into the street field.** No standalone house-
  number label (e.g. "№") was found near either address block's "Улица"
  label; modeled as one free-text field per address block, consistent with
  this registry's standard treatment of a source that does not print a
  separate house-number box.
- **Correspondence-address block modeled entirely optional**, including its
  own `Град/село`/`Улица` fields that are `required: true` in the permanent-
  address block — the correspondence address is, by its own section
  heading and common form convention, only completed when it differs from
  the permanent address.
- **Four circumstance dates left ungated by any exclusivity constraint**
  (see "Field derivation" above) — a deliberate choice to model exactly
  what the binary extraction shows (four independent rows), not what
  external legal commentary implies about how filers actually use the form.
- **`insuranceCoverageScope` modeled `required: false`, not gated by
  `requiredWhen` on any of the four circumstance dates.** The GovSchema
  v0.3 `requiredWhen` grammar's leaf conditions compare a field to a fixed
  value (`equals`/`notEquals`/`in`/comparison operators); gating this field
  on "any circumstance date is present" is not expressible without either
  an unsupported presence-check operator or a fragile `notEquals`-against-
  an-absent-optional-field pattern this registry has previously found buggy
  in its own from-scratch conformance checkers. Rather than introduce that
  fragility, `insuranceCoverageScope` is left an ordinary optional field
  with a `description` explaining when it applies.

## Conformance run

Two hand-authored valid fixtures under
`conformance/bg/nra/deklaratsiya-za-registratsiya-na-samoosiguryavashto-se-litse/1.0.0/`:

- **`valid-sole-trader-starting-activity.json`** — an individual starting
  activity as a sole trader (both `individualIdNumber` and
  `legalEntityOrSoleTraderIdNumber` exercised), permanent address only, full
  insurance coverage scope elected.
- **`valid-liberal-profession-terminating-with-correspondence-address.json`**
  — an individual with no separate legal-entity/sole-trader ID, terminating
  their activity, exercising every correspondence-address field (including
  `correspondenceAddressPhone`) as distinct from the permanent address.

Seven mutation-control fixtures, each isolated to raise **exactly one**
error, derived from the standard valid fixture:

- **`mutation-control-missing-individual-id-number.json`** — drops
  `individualIdNumber` (static `required: true`).
- **`mutation-control-missing-full-name.json`** — drops `fullName`.
- **`mutation-control-missing-permanent-address-town.json`** — drops
  `permanentAddressTown`.
- **`mutation-control-missing-permanent-address-street.json`** — drops
  `permanentAddressStreet`.
- **`mutation-control-missing-declarant-signature.json`** — drops
  `declarantSignature`.
- **`mutation-control-missing-date-of-completion.json`** — drops
  `dateOfCompletion`.
- **`mutation-control-invalid-enum-insurance-coverage-scope.json`** — sets
  `insuranceCoverageScope` to `"full_coverage_invalid"`, not one of the
  enum's 2 values.

All nine fixtures were checked with a from-scratch Node conformance checker
(`check-conformance.mjs`, not committed — a disposable script, per this
registry's own established practice) implementing this schema's own
`required`/`requiredWhen` (including the `all`/`any`/`not` composite
`Condition` grammar, unused by this particular schema)/`type`/
`validation.enum`/`validation.pattern`/`validation.minLength`/
`validation.maxLength`/`validation.minimum`/`validation.maximum` grammar
directly:

```
$ node check-conformance.mjs schema.json conformance/bg/nra/deklaratsiya-za-registratsiya-na-samoosiguryavashto-se-litse/1.0.0
PASS mutation-control-invalid-enum-insurance-coverage-scope.json: expected 1 error(s), got 1 -> invalid enum value for insuranceCoverageScope: full_coverage_invalid
PASS mutation-control-missing-date-of-completion.json: expected 1 error(s), got 1 -> missing required field: dateOfCompletion
PASS mutation-control-missing-declarant-signature.json: expected 1 error(s), got 1 -> missing required field: declarantSignature
PASS mutation-control-missing-full-name.json: expected 1 error(s), got 1 -> missing required field: fullName
PASS mutation-control-missing-individual-id-number.json: expected 1 error(s), got 1 -> missing required field: individualIdNumber
PASS mutation-control-missing-permanent-address-street.json: expected 1 error(s), got 1 -> missing required field: permanentAddressStreet
PASS mutation-control-missing-permanent-address-town.json: expected 1 error(s), got 1 -> missing required field: permanentAddressTown
PASS valid-liberal-profession-terminating-with-correspondence-address.json: expected 0 error(s), got 0
PASS valid-sole-trader-starting-activity.json: expected 0 error(s), got 0
```

All seven negative controls raised exactly one error each, and neither
valid scenario raised an unexpected error.

The registry's ajv-based meta-schema validator was run against the schema
document and passes:

```
$ node tools/validate-ajv.mjs registry/bg/nra/deklaratsiya-za-registratsiya-na-samoosiguryavashto-se-litse/1.0.0/schema.json
ok   registry/bg/nra/deklaratsiya-za-registratsiya-na-samoosiguryavashto-se-litse/1.0.0/schema.json [v0.3]
1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

`ajv`/`ajv-formats` were already present in `tools/node_modules` at the
start of this cycle. The `xlsx` (SheetJS) npm package used for the initial
(unsuccessful, see above) cell-based read attempt was installed only in a
disposable `/tmp` scratch directory, never inside `tools/` or
`tools/govschema-client/`, so this registry's documented
`npm install`-wipes-`node_modules` gotcha did not recur this cycle.

`tools/govschema-client/registry-index.json` was regenerated via `npm run
build-index` inside `tools/govschema-client/`: 423 total schema documents
(up from 422), 51 jurisdictions (up from 50), with the new
`bg/nra/deklaratsiya-za-registratsiya-na-samoosiguryavashto-se-litse` entry
present.

## Scope and jurisdiction notes

- Opens Bulgaria as the registry's **51st jurisdiction**, via the **Taxes**
  vertical (NRA is Bulgaria's national tax and social-insurance-contribution
  authority; this declaration registers/updates a self-insured person's own
  social-insurance-contribution status with NRA). DMV, Passport, Business
  Formation, Visa, and National ID & Civic Documents are all open,
  unscreened backlog candidates for Bulgaria — not screened this cycle.
- `jurisdiction.level` is `national` — NRA is Bulgaria's national revenue
  agency.
- `process.type` is `registration`, matching the form's own name
  ("Декларация за регистрация", Declaration for Registration) and the
  government service's own name ("Регистрация на самоосигуряващи се лица").
- `process.language` is `bg`: the specimen's full extracted text is
  entirely in Bulgarian; no English-language parallel edition was located
  or expected for a domestic social-insurance-registration declaration of
  this kind (the `nra.bg` English-language `forms.en` index page was
  fetched this cycle and did not list an English version of this specific
  form).

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-14** (6
months). A future review should prioritize: (1) re-confirming the direct
download URL still resolves, since it is a WebSphere Portal object-ID path
rather than a stable human-readable slug and could change on a future NRA
site migration; (2) whether NRA has since published a fillable PDF or web-
form equivalent of this same declaration, which would allow re-deriving
`required`/optional status with the same rigor as this registry's other
AcroForm-derived schemas; (3) whether a future cycle wants to scout
Bulgaria's other five verticals (DMV, Passport, Business Formation, Visa,
National ID & Civic Documents) to build out this newly-opened jurisdiction.
