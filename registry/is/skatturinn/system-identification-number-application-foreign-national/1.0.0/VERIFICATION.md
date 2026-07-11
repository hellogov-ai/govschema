# Verification record — `is/skatturinn/system-identification-number-application-foreign-national` v1.0.0

## Candidate selection

This session's brief (GOV-2233, "GovSchema Standard Research") re-scanned
CATALOG.md's "Known Gaps & Opportunities" fresh. Iceland stood at 5 of 6
verticals (Business Formation, Taxes, Visa, DMV, Passport); National ID &
Civic Documents was its sole remaining open vertical. The GOV-2226 cycle
(2026-07-10) had already named a viable, well-sourced candidate for it:
"Skatturinn Form RSK 3.30 (kerfiskennitala for foreign nationals)" — but left
it unauthored. That candidate was re-screened fresh this session rather than
assumed still valid (the URL, byte size, and hash were all independently
re-confirmed; see "Source" below), and authored here. This closes Iceland to
6 of 6 verticals, the second jurisdiction in this registry (after Colombia)
to reach full coverage.

## Source

- **Primary:** `https://www.skatturinn.is/media/rsk03/rsk_0330.is.pdf` —
  found via a plain web search for "Skatturinn RSK 3.30 kerfiskennitala," and
  independently corroborated by Skatturinn's own news post
  ("Kerfiskennitölur," `skatturinn.is/um-rsk/frettir-og-tilkynningar/
  kerfiskennitolur`) and Ísland.is's own explainer page
  (`island.is/kerfiskennitala`), both of which describe the same three
  eligible-applicant categories the form's own top-of-page note prints and
  both of which point back to this same RSK 3.30 form. Fetched fresh this
  session: **HTTP 200**, `content-type: application/pdf`, exactly **37,195
  bytes**, SHA-256
  `62597acdda9586a76aa02f146b1a639c34e52868f3e88ae07e54400ee9cda106`. No
  login, CAPTCHA, or WAF/bot-mitigation challenge was encountered. The form's
  own printed footer states the edition date directly on the page: "11-2-2026"
  (dd-m-yyyy, i.e. 11 February 2026) — a current, recently-reissued edition,
  not a stale specimen.
- **Retrieved:** 2026-07-11.
- **Reviewer:** GovSchema Engineering (initial authoring source-review).

`node tools/verify-sources.mjs registry/is/skatturinn/system-identification-number-application-foreign-national/1.0.0`
re-fetched the cited URLs a second time immediately before finalizing this
record (the primary PDF plus the two corroborating URLs named above): 1
directory, 3 URLs checked, 0 warnings, 0 allowlisted, all clear. No entry was
added to `tools/verify-sources-allowlist.json` — this domain needs none
(already used successfully by this registry's other two `is/skatturinn`
schemas).

## Extraction method

Confirmed programmatically with `pdfjs-dist` (`legacy/build/pdf.js`, Node
CommonJS) before any field cataloguing began:

- `doc.numPages` → **1** (a genuinely single-page form).
- `page.getAnnotations()` → exactly **23 Widget annotations**: 18
  `fieldType: "Tx"` (plain text fields) and 5 checkbox (`Btn`) widgets — 3
  backing the "Ástæða umsóknar" reason-for-application options and 2 backing
  the "Fylgiskjöl" (attachments) declarations (`passportCopy` and
  `workPermitExemptionConfirmation`).
  `getFieldObjects()` resolves the same 23 widgets to **23 distinct field
  names**, a clean 1:1 ratio requiring no split-box or duplicate-copy
  reconciliation (unlike several other specimens in this registry, e.g.
  `ar/afip/inscripcion-cuit-personas-juridicas`'s split-digit CUIT boxes or
  `is/thjodskra`'s two-column custodian mirroring).

Every widget's field name, type, and rect was dumped, then cross-walked to
its printed label using a position-aware (x/y proximity) script:
`page.getTextContent()` items were sorted by descending y then ascending x
and paired against each widget's rectangle by visual row alignment — the
same technique this registry's `is/samgongustofa`, `is/utl`, `is/thjodskra`,
`at/bmeia`, and `se/migrationsverket` schemas describe using, rather than
eyeballing the rendered page alone.

## One non-obvious structural finding

**Three of the form's five checkbox widgets carry no field name at all in
the source PDF's own AcroForm.** `pdfjs-dist` reports them literally as
`"undefined"`, `"undefined_2"`, and `"undefined_3"` — a genuine upstream
authoring omission (confirmed via `getFieldObjects()`, not an extraction
artifact of this session's own tooling), the same class of finding already
documented for `is/samgongustofa`'s vehicle-ownership-transfer form (two
unnamed co-owner/operator checkboxes) and, more severely, for
`is/thjodskra`'s custody-choice checkboxes (no widget at all).

Two of the three (`undefined`, `undefined_2`) are two of the three "Ástæða
umsóknar" (reason for application) checkboxes — the third reason checkbox
does carry a real (if verbose) field name. Here, unlike `is/thjodskra`, all
three reason checkboxes *are* present as real Widget annotations — only some
of their `getFieldObjects()` names are missing or generic — so position-aware
cross-walking against the printed labels ("Launþegi - EES/EFTA borgari...",
"Maki Íslendings eða EES/EFTA ríkisborgara...", "Annað, hvað:") was
sufficient to identify each option with no ambiguity. Modelled as three
options of one `reasonForApplication` enum field (see "Scope decisions"
below for why this is a single-select rather than three independent
booleans).

**The third unnamed widget (`undefined_3`) is not in the reason-for-application
section at all.** It sits lower on the page, in the "Fylgiskjöl" (attachments)
section, immediately beside the printed label "Afrit af gildu vegabréfi eða
ferðaskilríki" (Copy of valid passport or travel document) — it is the
checkbox backing this schema's statically-**required** `passportCopy`
document. This was not disclosed in this issue's initial structural-finding
writeup and is corrected here per GOV-2238's independent re-extraction
(re-confirmed by this session's own from-scratch re-fetch and re-extraction,
same SHA-256). The remaining attachment checkbox, backing
`workPermitExemptionConfirmation`, does carry a real field name
(`"Staðfesting á undanþágu atvinnuleyfis frá Vinnumálastofnun..."`) and was
never in question.

A second, related finding: the form's own top-of-page eligibility note names
**three** applicant categories (EEA/EFTA worker, spouse awaiting a residence
permit, and "foreign parties who owe reportable Icelandic capital income
tax"), but the "Ástæða umsóknar" section prints only **two** dedicated
checkboxes plus a generic "Annað, hvað" (Other, what) free-text option — the
third top-of-page category has no checkbox of its own and is expected to be
declared under "Annað, hvað" instead. Disclosed directly in
`reasonForApplication`'s own `description` rather than assumed silently.

## Field reconciliation (23 widgets → 19 schema fields + 2 documents)

- **Applicant identity and contact (12 fields, 12 widgets):**
  `applicantFirstMiddleName`, `applicantSurname`, `applicantDateOfBirth`,
  `applicantCountryOfBirth`, `applicantGender`, `applicantCitizenship`,
  `applicantForeignAddress`, `applicantForeignPostalCode`,
  `applicantIcelandAddress`, `applicantIcelandPostalCode`, `applicantEmail`,
  `applicantPhone` — a clean 1:1 mapping, one widget per printed label, no
  ambiguity.
- **Reason for application (2 fields, 4 widgets):** `reasonForApplication`
  (an `enum` field consuming all 3 reason checkboxes — see the structural
  finding above), `otherReasonDetail` (the adjoining free-text box, gated
  `requiredWhen reasonForApplication equals "other"`).
- **Employer/Launagreiðandi (3 fields, 3 widgets):** `employerName`,
  `employerNationalId`, `employerAddress` — all gated `requiredWhen
  reasonForApplication in ["eea_efta_worker_under_6_months",
  "spouse_awaiting_residence_permit"]` (see "Scope decisions" below).
- **Declaration date/place (2 fields, 2 widgets):** `applicantDateAndPlace`
  (left/applicant column, not required — see below), `employerDateAndPlace`
  (right/employer column, gated the same way as the employer fields above).
- **Attachments (2 documents, 2 widgets):** `passportCopy` (statically
  required), `workPermitExemptionConfirmation` (not conditionally gated —
  see "Scope decisions" below) — both modelled via the spec's first-class
  `documents[]` array (GSP-0014) rather than as boolean fields, since each
  represents a physical attachment declaration, not applicant-entered data.

**19 fields + 2 documents modelled, covering all 23 widgets** with no
exclusions.

## Scope decisions and judgment calls

- **`reasonForApplication` is modelled as a single-select `enum`, not three
  independent booleans.** All three checkboxes occupy one continuous
  vertical list under a single "Ástæða umsóknar" heading, printed as
  alternative reasons for the same application, with no instruction anywhere
  on the form suggesting more than one may be checked — the same
  single-select-grid convention this registry has applied to
  `is/samgongustofa`'s insurer/status checkboxes and several other
  jurisdictions' flat checkbox lists.
- **`employerName`/`employerNationalId`/`employerAddress`/
  `employerDateAndPlace` are gated `requiredWhen reasonForApplication in
  [eea_efta_worker_under_6_months, spouse_awaiting_residence_permit]`, not
  statically required.** Both of these reasons describe an applicant in paid
  employment whose employer must confirm that employment (the printed
  declaration reads "Launagreiðandi staðfestir að umsækjandi sé í launuðu
  starfi hjá honum" — "The employer confirms the applicant is in paid
  employment with them"); the third reason (`other`, e.g. reportable capital
  income) has no necessary connection to an Icelandic employer. This is a
  structural inference from the form's own declaration sentence, not a
  fabricated gating field — matching this registry's `requiredWhen`
  convention (GSP-0013 §2).
- **`applicantDateAndPlace` (the applicant's own place/date box) is left
  `required: false` with no `requiredWhen` condition.** The form's own
  top-of-page note explicitly states the applicant does not need to sign
  this form ("Umsækjandi þarf ekki að undirrita eyðublaðið, en afrit af
  vegabréfi þarf að fylgja" — "The applicant does not need to sign the form,
  but a copy of the passport must accompany it"), so this field is
  genuinely optional across every `reasonForApplication` value, unlike the
  employer's own date/place field.
- **`workPermitExemptionConfirmation` (the second attachment) is modelled
  as `required: false` with no `requiredWhen` condition**, deliberately
  *not* mirroring the employer fields' conditional-required pattern. The
  form's own parenthetical ("does not apply to a spouse of an Icelander or
  EEA/EFTA citizen") only rules the requirement out for the
  `spouse_awaiting_residence_permit` reason; it does not state whether the
  document positively applies to both, one, or neither of the remaining two
  reasons (`eea_efta_worker_under_6_months`, `other`) — inferring a precise
  `requiredWhen` condition here would go beyond what the source actually
  states, so it is left optional and the ambiguity is disclosed in the
  document's own `sourceRef` rather than guessed at confidently.
- **`applicantGender` is modelled as a free-text `string`, not an `enum`.**
  The source widget is a plain text field (`fieldType: "Tx"`) with no
  printed option list anywhere on the page, unlike this form's genuine
  checkbox-backed choices.
- **Kennitala fields (`employerNationalId`) share the registry's standard
  pattern** (`^[0-9]{6}-?[0-9]{4}$`), matching every other `is/*` schema's
  kennitala fields — applied here to the employer's company kennitala, not
  a personal one, so no `classification` tag is set on it.
- **Email fields use the same RFC-shaped `pattern`** already established in
  this registry (e.g. `is/thjodskra/passport-issuance-consent-minor`),
  reused here rather than inventing a new one.
- **Out of scope:** the printed eligibility-criteria note at the top of the
  page (fixed guidance text, not a fillable field), both wet-ink signature
  lines ("Undirskrift umsækjanda," "Undirskrift launagreiðanda" — the
  declaration statements themselves, not fillable fields), and the footer
  contact note (Skatturinn's own submission instructions, not
  applicant-authored data) — consistent with this registry's established
  practice.

## Mock conformance test

A standalone Node script (`conformance.mjs`, not committed — ad hoc
verification harness matching this registry's usual practice for recent
`is/*` schemas) evaluates required/`requiredWhen` presence, `enum`
membership, and `pattern`/`minLength`/`maxLength` bounds.

- **Valid mock 1** — an EEA/EFTA worker under the 6-month threshold:
  `reasonForApplication: "eea_efta_worker_under_6_months"`, employer block
  and `employerDateAndPlace` filled, `applicantDateAndPlace` left blank
  (applicant does not sign), `workPermitExemptionConfirmation` left
  `false`. **0 errors.**
- **Valid mock 2** — the "other" (capital-income) case:
  `reasonForApplication: "other"`, `otherReasonDetail` populated
  ("Fjármagnstekjur af leigutekjum á Íslandi"), no employer fields, both
  attachment documents left at their static defaults (`passportCopy: true`,
  `workPermitExemptionConfirmation: false`). **0 errors.**
- **Negative control 1** — mock 1 with the entire employer block
  (`employerName`, `employerNationalId`, `employerAddress`,
  `employerDateAndPlace`) removed while `reasonForApplication` remains
  `"eea_efta_worker_under_6_months"`. **Fails** with all four flagged
  missing, confirming the `requiredWhen`/`in` conditional-required mechanism
  fires correctly across every gated field.
- **Negative control 2** — mock 2 with `otherReasonDetail` removed while
  `reasonForApplication` remains `"other"`, and `applicantEmail` set to a
  non-email string. **Fails** with both flagged (`otherReasonDetail`:
  missing; `applicantEmail`: pattern mismatch), as expected.

## Tooling run

- `node tools/validate.mjs registry/is/skatturinn/system-identification-number-application-foreign-national/1.0.0/schema.json` → `ok`, 1/1 passed.
- `node tools/validate-ajv.mjs registry/is/skatturinn/system-identification-number-application-foreign-national/1.0.0/schema.json` → `ok` (validated against spec v0.3 meta-schema, ajv 2020-12).
- `node tools/verify-sources.mjs registry/is/skatturinn/system-identification-number-application-foreign-national/1.0.0` → 1 directory, 3 URLs checked, 0 warnings, 0 allowlisted, all clear.
- `npm run build-index` (from `tools/govschema-client/`) → regenerated `registry-index.json` to include this document.

## Re-verification

Per the `manual-source-review-v1` practice's cadence, `nextReviewBy` is set
to **2027-01-11** (~6 months): this is a from-scratch closing of Iceland's
sixth and last vertical with two non-obvious structural findings (three
unnamed checkboxes — two backing reason-for-application options, one backing
the required passport-copy attachment; an ambiguous, only-partially
conditional attachment requirement). Re-check the cited PDF URL, byte size,
and hash, confirm no newer edition has replaced the "11-2-2026" specimen
this record cites, and re-confirm the third-party corroborating sources
(Skatturinn's own "Kerfiskennitölur" news post, Ísland.is's "kerfiskennitala"
explainer) still describe the same three-category eligibility structure, on
or before that date and on any `source.url` change.
