# Verification record — at/bmf/employee-tax-assessment@1.0.0

## Candidate selection

This session's brief was to deepen Austria's vertical coverage (opened last
cycle at 1 of 6 verticals, via `at/gewerbebehoerde/trade-licence-registration`,
Business Formation). Per the brief's own priors and the pattern already set
by Iceland (GOV-2084) and Sweden (GOV-2091), Taxes was screened first.

- **DMV (Kfz-Zulassung)** was screened second, as the brief's other
  strong candidate. `oesterreich.gv.at`'s own "Kfz-Zulassung" page and every
  third-party summary found (ARBÖ, ÖAMTC, insurers) describe registration as
  an **in-person, at-the-counter process**: the applicant brings identity and
  vehicle documents to a Zulassungsstelle (often run by an insurance agent
  acting as the registration authority's agent) and the clerk enters the data
  directly into the national register; the "application" is generated and
  signed at the counter, not filled in and submitted by the applicant
  beforehand. No downloadable blank specimen or fillable AcroForm was found
  under `oesterreich.gv.at`, `bmimi.gv.at` (the ministry now responsible for
  road traffic, successor to the brief's suggested `bmaw.gv.at` path for this
  topic), or any Land host. This matches a pattern this registry has hit
  before for counter-driven vehicle registration processes with no public
  paper form (e.g. Sweden's `id-kort`/Polisen passport screening in
  GOV-2091) — deferred as a weak candidate, not pursued further this session.
- **Taxes — Arbeitnehmerveranlagung (employee/pensioner tax assessment),
  Form L 1** was the strongest candidate found and is what this document
  models. `bmf.gv.at` (federal Ministry of Finance) was reachable this
  session (`curl` HTTP 200), unlike the prior GOV-2107 cycle's experience
  with `bmaw.gv.at` timing out — confirming Austria's federal hosts are not
  uniformly gated, just host-specific. `service.bmf.gv.at`'s own ASP-based
  forms-search pages (`show_mast.asp`/`show_det.asp`) consistently returned
  the site's generic navigation shell to a bare `curl` fetch regardless of
  query string — evidently a JavaScript/AJAX-rendered results grid that does
  not degrade to a server-rendered fallback for a non-browser client — so
  the actual form was reached via `oesterreich.gv.at`'s own separate
  (Next.js, server-rendered) form-search page instead (see Source below),
  which does expose real content in its initial HTML payload.
- Passport, Visa, and National ID were not screened this session, per the
  brief's own stated weaker-prior guidance and because Taxes screened
  strong on the first real attempt (Iceland/Sweden's established sequencing
  precedent).

## Source

- **Primary (the fillable form):**
  `https://formulare.bmf.gv.at/service/formulare/inter-Steuern/pdfs/2025/L1.pdf?open=download`
  — form **L 1**, "Erklärung L1 zur ArbeitnehmerInnenveranlagung 2025"
  ("Version vom 09.10.2025" per the PDF's own page-footer running header), a
  genuine fillable AcroForm PDF. Confirmed twice this session by direct
  `curl` fetch with a browser User-Agent: HTTP 200, `content-type:
  application/pdf`, exactly **380,990 bytes** both times (byte-identical,
  confirmed with `diff`), PDF header `%PDF-1.6`, not an HTML error page or a
  scanned image.
  - This URL is not a guessed path: it was reached by first fetching
    `https://formulare.bmf.gv.at/service/formulare/inter-Steuern/pdfs/2025/L1.pdf`
    (no query string) — itself found by pattern-matching sibling forms'
    known-good URLs (`.../pdfs/2025/U1.pdf`, `.../E1.pdf`, `.../K1.pdf`) —
    which returned a small BMF-branded HTML landing page titled "Formular L1
    2025 öffnen" with a GET form (`action="?" method="get"`,
    hidden input `open=download`) captioned "Öffnen des Formulars L1 2025
    (ohne Formularimport)". Appending `?open=download` to the same URL
    (replicating that form's own submission) returns the actual PDF.
  - Two other channels for the same form were found and are explicitly
    **not** used as this document's primary source: a barrier-free HTML
    step-by-step wizard for blind/visually-impaired filers
    (`formulare.bmf.gv.at/bmfmodule/BMF_FS1/start.do?generalid=L1-2025`, an
    `aforms2web`-powered multi-step session that could not be reliably
    walked with `curl` past its first step — each POST attempt reset the
    server-side transaction rather than advancing, evidently requiring
    exact session/ViewState handling beyond a simple GET/POST replay), and
    fully-electronic FinanzOnline e-filing (login-gated, no public specimen).
- **Confirmed current edition, not a stale/superseded specimen:**
  `https://www.oesterreich.gv.at/de/formsearch/form/47` (HTTP 200), the
  federal government's own official form-search index entry for
  "Arbeitnehmerveranlagung - Antrag - L1" (form id 47). Its raw
  server-rendered HTML payload lists, under "PDF-Formulare"/"Barrierefreie
  Formulare", direct links to the 2021-2025 editions of this same form by
  year; **2025 is the newest edition listed** (no 2026 edition exists yet at
  the time of this session), and its listed 2025 barrier-free-form link
  (`formulare.bmf.gv.at/service/formulare/inter-Steuern/wai/2025/L1.htm`)
  redirects into the same `L1-2025` form identifier as this document's own
  PDF source. The form's own running header independently states "Version
  vom 09.10.2025" (dated within the 2025 assessment year this form covers),
  corroborating this is the current, not a stale, edition.
- **Not separately cited as a `source`/`authority` field, but consulted for
  context:** `service.bmf.gv.at/service/anwend/formulare/show_det.asp?...`
  (BMF's own forms-detail pages) — reachable (HTTP 200) but, as described
  above, rendered only a generic navigation shell to a non-browser fetch, so
  no field-level content was sourced from it.

Both cited URLs were re-fetched live a second time in this same session
immediately before this record was finalized (see "Pre-PR re-verification"
below).

## Extraction technique

The PDF's AcroForm layer was extracted with `pdfjs-dist` v3.11.174
(`legacy/build/pdf.js`, loaded via `createRequire` since this version ships
no `.mjs` entry point), calling `page.getAnnotations({ intent: "display" })`
per page to enumerate every `Widget` annotation (field name, field type,
checkbox/radio flags, export values) and `page.getTextContent()` (with each
item's `transform[4]`/`transform[5]` x/y coordinates preserved) to
reconstruct the surrounding prose and labels by position, cross-referencing
widget `rect` coordinates against nearby text coordinates to determine each
widget's printed label.

- **90 total AcroForm widgets** across the PDF's 4 pages (40, 13, 21, 16 per
  page respectively).
- **15 are non-data controls**, excluded from the field model: 6 PDF-form-
  generator metadata fields (`param_1207_FID`, `param_1207_OrganizationID`,
  `param_1207_Formularname`, `param_1207_Version`, `param_1206_Versionsinfo`,
  plus an `info1000` banner field) and 2 toolbar buttons (`Sendfdf` — an FDF
  data-send button; `importButton` — a data-import button) on page 1, one
  `Versions_info` button appearing as 2 separate widget entries, a
  `SteuernummerInfo` running tax-number display header repeated identically
  on pages 2, 3, and 4 (3 widgets total, a read-only cross-page convenience
  display, not a distinct data-entry field), and a `resetbutton` ("reset
  form") on page 4.
- The remaining **75 real data widgets** map onto this document's **66
  fields**. The gap is fully accounted for by 4 places where 2-6 widgets
  sharing one PDF field name make up a single logical field, each merged
  into **one** `enum` field (never modelled as independent unconstrained
  booleans — the mismodeling this registry has been burned by before, e.g.
  GOV-1070's SE work-permit radio group) or one merged string field:
  - `Checkboy_1_1` (3 widgets, export values 1/2/3) → one `gender` enum.
  - `Checkbox508` (6 widgets, export values 3-8) → one `maritalStatus` enum.
  - `Checkbox_5_1` + `Checkbox_5_2` (2 widgets) → one
    `soleEarnerOrSingleParentCreditClaim` enum, since the source's own 6.1/
    6.2 hint text treats the two credits as alternatives.
  - `Zahl_3_4_01` + `Zahl_3_4_01_02` (2 widgets) → one
    `partnerSocialSecurityNumber` string field: these are two adjacent text
    boxes that together form the partner's 10-digit SVNR, visually split
    (unlike the filer's own single continuous SVNR box at 1.4) — confirmed
    by comparing widget `rect` widths (the two partner sub-boxes' combined
    width, ~162pt, closely matches the filer's own single SVNR box width of
    ~165pt).
  - Total savings: 2 + 5 + 1 + 1 = 9 widgets, so 75 − 9 = 66. This
    arithmetic was checked mechanically (`grep -c '"name":'` against the
    generated `schema.json`, not asserted from memory).
- Field-to-label mapping was confirmed for every field by cross-referencing
  each widget's `rect` y-coordinate (and, for closely-spaced checkbox
  groups, x-coordinate) against the nearest printed section-number/label
  text extracted at the matching y-band — e.g. the 6-widget `Checkbox508`
  group's export values 3/4/5/6/7/8 were matched to "in Lebensgemeinschaft"
  / "verheiratet/in eingetragener Partnerschaft" / "ledig" / "verwitwet" /
  "geschieden" / "dauernd getrennt" respectively by comparing each checkbox
  widget's rect against each label's text position.
- The internal PDF field names on page 3 use a legacy `_8_` numbering
  scheme (`Zahl_8_5_1`, `Zahl_8_10`, etc.) that does **not** match this
  edition's printed section numbers (10.2.2-10.2.10) — evidently carried
  over unchanged from an earlier year's internal form-numbering scheme.
  This document's `sourceRef`s cite the current printed section number and
  Kennzahl, not the internal field name, for readability; the internal PDF
  field name is additionally available in this record's widget-merge notes
  above for full traceability.

## Verbatim-quote cross-check

Every phrase this record or `schema.json` places in single quotation marks
was checked programmatically against a `pdfjs-dist` `getTextContent()` dump
of the entire PDF (all 4 pages, item strings joined with single spaces,
whitespace-collapsed) using a small Python script, not by eye. Representative
results:

| Quote | Result |
|---|---|
| `10-stellige Sozialversicherungsnummer laut e-card` | exact |
| `FAMILIEN- ODER NACHNAME` / `VORNAME` / `TITEL` / `Hausnummer` / `Stiege` / `Türnummer` / `WOHNSITZSTAAT` / `Postleitzahl` / `Telefonnummer` | exact |
| `Personenstand am 31.12.2025 (nur ein Kästchen ankreuzen)` | exact |
| `weiblich` / `männlich` / `ledig` / `geschieden` / `verwitwet` / `in Lebensgemeinschaft` / `verheiratet/in eingetragener Partnerschaft` / `dauernd getrennt` | exact |
| `seit (Datum bei ledig nicht erforderlich)` | exact |
| `Anzahl der (inländischen) gehalts- oder pensionsauszahlenden Stellen im Jahr 2025` | exact |
| `Steuerfreie Einkünfte auf Grund völkerrechtlicher Vereinbarungen (z.B. UNO, UNIDO)` | exact |
| `Pendlerpauschale - tatsächlich zustehender Gesamtjahresbetrag abzüglich eines Kostenersatzes für ein Öffi-Ticket` | exact |
| `Genaue Bezeichnung Ihrer beruflichen Tätigkeit (z.B. KOCH, VERKÄUFERIN; nicht ausreichend ist ANGESTELLTE, ARBEITER)` | exact |
| `Ich beantrage den erhöhten Pensionistenabsetzbetrag.` / `Ich beantrage einen Freibetragsbescheid.` / `Ich beantrage einen niedrigeren Freibetragsbescheid in Höhe von jährlich` | exact |
| `Ich besitze auf Grund meiner politischen Verfolgung in der Zeit von 1938 bis 1945 einen Opferausweis und/oder eine Amtsbescheinigung.` | exact |
| `IBAN (nur ausfüllen, wenn Sie dem Finanzamt noch keine Bankverbindung bekanntgegeben haben oder Sie diese geändert haben)` / `BIC (nur auszufüllen, wenn IBAN nicht mit AT beginnt und die Empfängerbank nicht am einheitlichen Euro-Zahlungsverkehrsraum SEPA teilnimmt)` | exact |
| `Beilage L 1ab für außergewöhnliche Belastungen` / `Beilage L 1d zur Berücksichtigung von Sonderausgaben` / `Beilage L 1i für Einkünfte aus nichtselbständiger Arbeit ohne Lohnsteuerabzug bzw. mit Auslandsbezug` | exact |
| `Anzahl der Beilagen L 1k für ein Kind (für jedes Kind ist eine eigene Beilage L 1k zu verwenden)` / `...L 1k-bF für den Familienbonus Plus in besonderen Fällen...` | exact |
| `Ich bestätige mit meiner Unterschrift, dass alle Angaben der Wahrheit entsprechen. Ich nehme zur Kenntnis, dass unrichtige oder unvollständige Angaben strafbar sind.` | exact |
| `Arbeitnehmerveranlagung - Antrag - L1` | exact (checked against `oesterreich.gv.at`'s raw HTML, not the PDF) |

**Nine near-misses caught and corrected before this shipped** — in every
case the raw `pdfjs-dist` extraction differs from a naive "clean" quote by
an extra inter-word space or a line-wrap hyphen, the same category of
artifact flagged in the prior `at/gewerbebehoerde` cycle
(`getTextContent()` inserting a space at certain run/line boundaries; the
PDF itself hyphenating a word across a visual line-wrap):

| Field | Artifact found | Resolution |
|---|---|---|
| `numberOfChildrenForFamilyAllowance` | `"Kinder , für"` (space before comma) and `"habe/ hat."` (space before "hat") | Quote marks removed; description paraphrased, artifact disclosed in `sourceRef` |
| `increasedPensionerCreditClaimed` | `"Alleinverdienerabsetz- betrag"` (hyphenated line-wrap) | Paraphrased in English, hyphenation disclosed |
| `multiChildSupplementClaimed` | `"für 2026 , da"` (space before comma) | Paraphrased, artifact disclosed |
| `commuterEuroAmount` | `"Gesamtjahres- betrag"` (hyphenated line-wrap) | Quote span shortened to end before the hyphenated word; word left outside the quoted span with a note |
| `professionalAssociationDuesAmount` | `"ausge- nommen"` (hyphenated line-wrap, "ausgenommen") | Paraphrased, artifact disclosed |
| `marginalEmploymentAndVoluntaryInsuranceContributionsAmount` | `"Sozialversicherungs- beiträge"` (hyphenated line-wrap) | Paraphrased, artifact disclosed |
| `digitalWorkEquipmentAmount` | `"Umsatz- steuer"` (hyphenated line-wrap, "Umsatzsteuer") | Paraphrased, artifact disclosed |
| `businessTravelExpensesAmount` | `"( ohne"` (extra space after opening parenthesis) | Quote span shortened; remainder paraphrased |
| `cashPayoutRequested` | `"können )"` (extra space before closing parenthesis) | Quote span shortened; remainder paraphrased |
| `childBonusDeclarationSoleEarnerOrSingleParent` (6.1) | `"beantragt : Ich"` (extra space before colon) and `"Pflegekarenz- geld"` (hyphenated line-wrap) | Quote span shortened to end before the colon; remainder paraphrased with artifacts disclosed |
| `childBonusDeclarationFamilyAllowanceRecipient` (6.2) | `"Familienbeihilfe : Ich"` (extra space before colon) | Quote span shortened to end before the colon; remainder paraphrased |
| `gender` (`inter/divers/offen` label) | Printed as two separate lines, `"inter/divers/"` then `"offen"` on the line below, joined with a space in the flat text extraction | `sourceRef` now describes it explicitly as a two-line label rather than a single contiguous quoted string |
| `birthDate` / `partnerBirthDate` | The 1.6 label's raw extraction order interleaves with an adjacent "laut e-card" caption belonging to a different nearby field (a reading-order artifact of this session's y-band line-reconstruction algorithm on a tightly-packed two-column area), so no single clean contiguous string could be confirmed | Both fields' `sourceRef`s were rewritten as an explicit paraphrase, with the reading-order caveat noted, rather than presenting an uncertain reconstruction as verbatim |

This is the same policy the prior `at/gewerbebehoerde/trade-licence-registration`
cycle established: never silently "clean up" an extraction artifact and
present it as verbatim; either quote exactly as extracted (including the
artifact), or shorten the quoted span to end before the artifact and
paraphrase the rest, with the reason disclosed.

## Field-count reconciliation

66 fields, reconciled against 90 total / 75 real / 66-after-merge widgets as
detailed above. Every field's `sourceRef` cites its printed section number
and/or Kennzahl (tax box number); Kennzahl-bearing fields (`KZ` in the
field's own `label`) are cross-referenced against the printed Kennzahl
visible next to that widget in the extracted text, not asserted from the
internal PDF field name alone.

## Deliberate scope decisions (disclosed, not silently dropped)

- **Companion attachments not modelled.** The form itself names 7 companion
  filings (L 1ab extraordinary burdens, L 1k per-child credits, L 1k-bF
  Familienbonus Plus special cases, L 1d special expenses, L 1i foreign/
  non-payroll income, L 16 wage slip — not needed since payers file
  electronically — and L 17/E 1/E 7 for loss carryforward). This document
  models only the base L 1 return's own fields, tracking whether each
  attachment is enclosed (`attachmentL1abIncluded` etc.) but not each
  attachment's own internal fields — a real, open companion-schedule
  backlog for a future cycle, mirroring this registry's existing CZ
  příloha (annex) pattern for Sweden/Iceland-style personal tax returns.
- **`partnerLastName`/`partnerFirstName`/`partnerTitle`/
  `partnerSocialSecurityNumber`/`partnerBirthDate` are optional, not
  gated by a `requiredWhen`.** The source's own "Partner*in" section (3)
  is not tied by the form to a single triggering checkbox; it is
  practically relevant whenever the filer claims the sole-earner credit
  (5.1.1, which itself asks the filer to declare the partner does not also
  claim it) or is married/partnered/cohabiting, but the form does not
  encode a strict machine-checkable rule for exactly when partner data
  becomes mandatory. Rather than invent an unverified compound condition,
  these fields are left optional with the real-world recommendation
  disclosed in each field's own `description` — the same technique used for
  `at/gewerbebehoerde`'s own `influentialPerson*` fields and
  `capabilityProof`'s undocumented exemption.
- **`addressResidenceCountryCode`, similarly, has no `requiredWhen`.** The
  source's own footnote states it is only needed when the filer's residence
  is outside Austria, but there is no separate "I live abroad" checkbox
  field on the form to gate this on — so it is left optional, with the
  conditional rule disclosed in prose rather than encoded.
- **`bankBic` has no `requiredWhen`.** The source states BIC is only needed
  "wenn IBAN nicht mit AT beginnt und die Empfängerbank nicht am
  einheitlichen Euro-Zahlungsverkehrsraum SEPA teilnimmt" (if the IBAN does
  not begin with AT and the recipient bank does not participate in SEPA) —
  a string-prefix condition this spec's shared Condition grammar
  (`equals`/`notEquals`/`in`/`greaterThan`/etc., `spec/v0.3`
  `$defs/conditionLeaf`) has no operator for. Left optional, condition
  disclosed in prose, per the same "don't assert an expression the grammar
  can't state precisely" principle as `at/gewerbebehoerde`'s
  `capabilityProof`.
- **`occupationalFlatRate*1`/`*2` model exactly 2 repeatable rows,** matching
  the source PDF's own 2 physical rows for section 10.2.11 (occupational
  group flat rate). The form provides no more than 2 rows on paper; no
  `array`/repeating-group type exists in `spec/v0.3` (`$defs.field.type`
  enum has no `array`), so this document follows the same bounded-row
  convention already established by `is/skatturinn/simplified-individual-tax-return`'s
  numbered `employer1`/`employer2` fields.
- **`declarationDate` captures only the date, not the signature itself.**
  Like every paper-form signature in this registry, a handwritten signature
  cannot be represented as a GovSchema field value; it is instead captured
  structurally via the `documents[]` attestation entry
  (`accuracyAndCompletenessDeclaration`), matching the established
  convention (e.g. `se/skatteverket/individual-income-tax-return`'s
  `taxpayerSignature` document).
- **No `identity-document` entries.** Unlike many Business Formation/
  Passport/National-ID schemas in this registry, this tax return identifies
  the filer purely by the pre-existing social security number/Steuernummer
  already on file with the tax authority; no supporting identity document is
  requested by the form itself.
- **Not modelled at all:** the fully electronic FinanzOnline e-filing
  channel; the barrier-free HTML wizard channel (both alternative
  submission paths to the same underlying L 1 data, per the process
  description above); and, as noted, the form's 7 named companion
  attachments' own internal field sets.
- **Annual-edition scope.** This is the 2025-assessment-year edition of an
  annual tax-return form. Consistent with this registry's established
  practice for other annual tax-return schemas already published
  (`se/skatteverket/individual-income-tax-return`,
  `is/skatturinn/simplified-individual-tax-return` — neither of which uses
  the optional `edition` axis from `spec/v0.3` §5.7/GSP-0005), a future
  assessment year's edition (e.g. 2026) would be authored as a new schema
  version rather than using the `edition` axis, for consistency with those
  direct Taxes-vertical siblings.

## Mock conformance test run

Two scenarios were built under `conformance/at/bmf/employee-tax-assessment/1.0.0/`
and checked against this schema's own `required`/`requiredWhen`/`validation`/
`documents[]` grammar with a disposable checker script
(`/tmp/at-tax-gov2114/check_conformance.mjs`, not committed — mirrors the
technique used for `is/skatturinn/simplified-individual-tax-return`,
GOV-2084, extended here to also evaluate the `all`/`any`/`not` boolean
Condition grammar and `documents[].requiredWhen`):

- **`application-packet-single-filer.json`**: Stefan Bauer, single, one
  domestic employer in 2025, a straightforward refund by bank transfer, no
  partner/children/commuter allowance/additional expenses/attachments.
  **12 fields collected, 54 correctly not-applicable, 0 errors**; the
  required `accuracyAndCompletenessDeclaration` attestation provided.
- **`application-packet-married-sole-earner.json`**: Andrea Gruber, married
  since 2015, claiming the sole-earner tax credit for 2 children, the
  commuter allowance/euro, digital work equipment and further-training
  expenses, and 2 L 1k attachments. **26 fields collected, 40 correctly
  not-applicable, 0 errors**; the `maritalStatusSinceDate` `requiredWhen`
  (fired by `maritalStatus: married_or_registered_partnership`) and
  `numberOfChildrenForFamilyAllowance`'s `requiredWhen` (fired by
  `soleEarnerOrSingleParentCreditClaim`) both correctly satisfied.
- **Five mutation/negative controls per scenario (10 total)**, each derived
  from a base scenario with exactly one defect introduced, each correctly
  raised exactly one error (confirming the checker is not vacuously
  passing):
  1. Removing the required `naturalPersonLastName` → `missing-required`
     error.
  2. Setting `addressPostalCode` to `"AB12"` (violates the 4-digit
     `pattern`) → `pattern-violation` error.
  3. Setting `maritalStatus` to `"engaged"` (not in its `enum`) →
     `enum-violation` error.
  4. Forcing `maritalStatus` to a non-`single` value while removing
     `maritalStatusSinceDate` → `requiredWhen` conditional-required
     violation, confirming the conditional gate actually fires (not just
     the top-level `required: true` fields).
  5. Removing the required `accuracyAndCompletenessDeclaration` document →
     `missing-required-document` error.

The schema was also validated against the GovSchema v0.3 meta-schema with
`node tools/validate.mjs` and `node tools/validate-ajv.mjs` (both pass,
against the full registry of 327 documents including this one), and against
`node tools/verify-sources.mjs registry/at/bmf/employee-tax-assessment/1.0.0`
(0 warnings, 3 URLs checked, 0 allowlisted).

## Pre-PR re-verification

Immediately before opening the PR, both cited URLs were re-fetched live a
second time in this same session (beyond the initial retrieval), with a
realistic browser User-Agent:

- `formulare.bmf.gv.at/service/formulare/inter-Steuern/pdfs/2025/L1.pdf?open=download`
  — HTTP 200, `application/pdf`, 380,990 bytes, byte-identical (`diff`) to
  the first fetch.
- `www.oesterreich.gv.at/de/formsearch/form/47` — HTTP 200.

`node tools/verify-sources.mjs registry/at/bmf/employee-tax-assessment/1.0.0`
reports all clear (0 warnings) on this same re-verification pass.

## Path to a `verified` claim (next step)

To advance from `status: draft` to `status: verified`, a future reviewer
would: confirm the precise machine-checkable trigger (if any exists in
BMF's own guidance beyond this PDF) for when Section 3 "Partner*in" data
becomes mandatory rather than merely recommended; resolve the `bankBic`
prefix-conditional limitation against a future spec revision that adds a
string-prefix Condition operator, if one is ever proposed; and author the
7 named companion attachments (L 1ab/L 1d/L 1i/L 1k/L 1k-bF at minimum) as
their own schemas, matching this registry's CZ příloha pattern.

## Scope and jurisdiction notes

Deepens Austria (already GovSchema's 31st jurisdiction, opened via
`at/gewerbebehoerde/trade-licence-registration`) to **2 of its 6
verticals** — Taxes, via this employee-tax-assessment document. Austria's
remaining four verticals (DMV, Passport, Visa, National ID) are open,
unscreened (DMV: screened this session and found weak/counter-driven, see
Candidate selection above) or unscreened backlog candidates for a future
cycle.
