# Verification record — ch/sg/handelsregisteramt/anmeldung-neueintragung-einzelunternehmen@1.0.0

## Candidate selection

GOV-3288 ("GovSchema Standard Research", 2026-07-16) scouted Switzerland's
Business Formation vertical (Switzerland was at 4/6: Passport, DMV, Taxes,
National ID modelled; Business Formation and Visa open) and left it as a
disclosed, ready-to-author backlog candidate (GOV-3293), which this cycle
(GOV-3298) picked up and completed.

The federal one-stop-shop wizard (EasyGov.swiss) is a confirmed dead end —
its very first screen requires an account login, with no unauthenticated
field-level content visible before authentication. Switzerland's 26 cantons
each run their own commercial register (Handelsregisteramt), and several
publish a structurally similar AcroForm PDF for registering a new sole
proprietorship (Einzelunternehmen). Five candidates were fetched and
widget-counted this cycle before picking one to author against:

| Canton | Source | Pages | AcroForm widgets | Field-name style |
| --- | --- | --- | --- | --- |
| **St. Gallen (SG)** | `sg.ch` | 3 | **50** | Self-documenting (`Firma`, `Sitz politische Gemeinde`, `Rechtsdomizil`, `Zweck 1`–`8`, `HeimatortStaatsangehörigkeit 1`, …) |
| Graubünden (GR) | `gr.ch` | 2 | 39 | Self-documenting but terser (2 pages instead of 3, no separate non-public contact block) |
| Aargau (AG) | `ag.ch` | 3 | 47 | Self-documenting, closely parallels SG |
| Lucerne (LU) | `lu.ch` | 3 | 32 | Self-documenting, fewer signatory/contact fields |
| Appenzell Ausserrhoden (AR) | `ar.ch` | 3 | 47 | Terse/opaque (`Feld1`, `Feld3`, `zb1_zb`, `fusg1`) — harder to independently corroborate field meaning from the name alone |

St. Gallen's form was selected as the authoring source: the richest widget
count, the clearest one-to-one correspondence between AcroForm field names
and their printed labels, and a distinct third "Kontaktangaben (nicht
öffentlich)" contact/submitter block the thinner siblings lack. All five are
genuine, live, unauthenticated PDFs — no login/CAPTCHA/WAF gate on any of
them — so this is a "pick the richest of several equally-open candidates"
decision, not a case of ruling out weaker candidates as dead ends. The
other four remain viable candidates for a future companion-schema cycle
(e.g. modelling one as a distinct sibling the way this registry already
does for CH-ZH's Steuererklärung companion schedules), left as disclosed,
unauthored backlog rather than pursued further this cycle.

Switzerland's Visa vertical was also re-screened this cycle:
`sem.admin.ch`'s national-visa AcroForm PDF was fetched and its field
sequence compared against `de/auswaertiges-amt/national-visa-application`,
already modelled in this registry. It is a field-for-field match — the same
EU-harmonized Schengen long-stay-visa questionnaire this registry has
already found and declined to re-author for Czechia, Portugal, Poland, and
Slovakia (see CATALOG.md's "Confirmed dead ends" section). Not authored;
recorded there as a fresh confirmation for Switzerland.

## Source

- **URL:** `https://www.sg.ch/content/dam/sgch/recht/handelsregister-notariate/einzelunternehmen/Anmeldung%20Neueintragung.pdf`
- Fetched fresh this session with two independent plain HTTP GETs (no
  login/session/cookie): **HTTP 200**, `206,104` bytes both times, genuine
  `%PDF` header, identical **sha256
  `8f643f455e075e22ba76f9cb209a23f38395326b86150f9d9baab7fdbdc0a433`** on
  both fetches — confirms a stable, non-dynamically-varied source.
- The document carries no printed form number/edition code; it is the
  Amt für Handelsregister und Notariate's current live download, cited by
  its own on-page filename/title.

## Extraction technique

`pdfjs-dist` v3.11.174 (`legacy/build/pdf.js`) was used two ways, from a
disposable script against the downloaded PDF:

1. **`page.getAnnotations()` per page** — enumerated every `/Widget`
   annotation's `fieldName`, `fieldType` (`Tx` text vs. `Btn` button),
   `rect` (page coordinates), and for buttons, `radioButton`/`checkBox`/
   `buttonValue`/`exportValue`. **50 widgets across 3 pages**: 36 text
   fields, 8 radio-button options across 3 mutually-exclusive groups
   (`Gruppe1` — c/o vs. own premises, 2 options; `Gruppe2` — signature
   authority type, 4 options; `Gruppe3` — has-UID-number yes/no, 2
   options), and 6 independent (non-grouped) checkboxes (2 identity-document
   confirmation checkboxes in the Beilagen section, 4 "best reached via"
   contact-method checkboxes on page 3).
2. **`page.getTextContent()` per page** — recovered every section heading
   and the surrounding instructional prose (e.g. the c/o-domicile
   declaration requirement, the "cross out if not desired" register-extract
   order instruction, the public-notarization signature requirement), used
   to write accurate field descriptions and to confirm which page content is
   applicant-entered vs. purely instructional/non-field.

All 50 widgets are accounted for in `schema.json`'s `fields[]`/`documents[]`
— none were dropped silently. The mapping:

| Widget(s) | Modelled as |
| --- | --- |
| `Firma`, `Sitz politische Gemeinde`, `Rechtsdomizil`, `PLZ Ort` | `companyName`, `registeredOfficeMunicipality`, `registeredOfficeStreetAndNumber`, `registeredOfficePostalCodeAndCity` |
| `Gruppe1` (2 radio options) | `domicileType` (enum) |
| c/o-Adresse text field | `domicileHolderAddress` (`requiredWhen domicileType == C_O`) |
| `Zweck 1`–`Zweck 8` | `businessPurpose` (single field, 8 ruled lines folded into one `maxLength: 720` string — these are one continuous purpose statement, not 8 distinct repeating entries) |
| `Personalien...1/2`, `HeimatortStaatsangehörigkeit 1/2` | `ownerFamilyName`, `ownerGivenNames`, `ownerHometownOrNationality`, `ownerResidenceAddress` |
| `Weitere Zeichnungsberechtigte`, `undefined_2`, `HeimatortStaatsangehörigkeit 1_2/2_2` | `additionalSignatory*` (all four, `requiredWhen signatureAuthorityType in [JOINT_SIGNATURE_BY_TWO, JOINT_PROCURATION_BY_TWO]`) |
| `Gruppe2` (4 radio options) | `signatureAuthorityType` (enum) |
| `Gruppe3` (2 radio options) | `hasUidNumber` (boolean) |
| UID text field | `uidNumber` (`requiredWhen hasUidNumber == true`) |
| `Kopie eines gültigen Ausweises...1`/`Kontrollkästchen2` | `ownerIdentityDocumentHolderName` field + `ownerIdentityDocumentCopy` document |
| `Kopie eines gültigen Ausweises...2`/`Kontrollkästchen3` | `additionalSignatoryIdentityDocumentHolderName` field + `additionalSignatoryIdentityDocumentCopy` document (both `requiredWhen` the joint-signature condition) |
| Page-1 c/o declaration instruction (no widget of its own) | `domicileHolderDeclaration` document (`requiredWhen domicileType == C_O`) |
| Section 8 pre-checked register-extract order (no widget of its own) | `registerExtractOrder` document, `category: payment`, `amount: {CHF, 40}` |
| `1`, `2`, `HeimatortStaatsangehörigkeit 1_3/2_3`, `Telefon G`, `P`, `M`, `EMail` | `submitterFamilyName`, `submitterGivenNames`, `submitterHometownOrNationality`, `submitterResidenceAddress`, `submitterPhoneWork`, `submitterPhonePrivate`, `submitterPhoneMobile`, `submitterEmail` |
| `Kontrollkästchen4`–`7` | `preferredContactViaWorkPhone`/`PrivatePhone`/`Mobile`/`Email` (4 independent booleans, **not** a single enum — confirmed via `getAnnotations()` that these are 4 separate, ungrouped `Btn`/checkBox widgets rather than one `radioButton` group, so the source genuinely allows multiple simultaneous selections) |
| `1_2`, `2_2`, `3`, `4` | `additionalRemarks` (single field, 4 ruled lines folded into one `maxLength: 360` string, same pattern as `businessPurpose`) |

## Disclosed judgment calls

- **`businessPurpose` and `additionalRemarks` are modelled as single fields,
  not arrays.** The spec's `field.type` enum (`string`, `number`, `integer`,
  `boolean`, `date`, `enum`, `file`, `object`) has no array/repeating type;
  each set of ruled lines is genuinely one continuous piece of prose on the
  source form (a purpose statement, or free-text remarks), not a bounded
  set of independently-labeled repeating rows like this registry's other
  "up to N rows" tables (e.g. `no/skatteetaten/skattemelding-for-forhandsfastsetting`'s
  wages/pension tables). A single string with a `maxLength` sized to the
  ruled-line count is the correct model here.
- **The two "Kopie eines gültigen Ausweises" name text fields** are modelled
  as data fields (`ownerIdentityDocumentHolderName`,
  `additionalSignatoryIdentityDocumentHolderName`) paired with corresponding
  `documents[]` entries, rather than folded entirely into the document
  requirement. The source form genuinely asks for both a checkbox
  (confirming the copy is attached) and a name (whose copy it is) — both are
  applicant-entered content and are kept as distinct concerns per GSP-0014's
  fields/documents split.
- **The register-extract order (`registerExtractOrder`) is modelled as a
  `documents[]` entry with `category: payment`**, not a boolean `fields[]`
  entry, since it carries a genuine `amount` (CHF 40) and is pre-selected by
  default on the source form (opt-out via crossing it out, per the form's
  own instruction) — this follows the same `category: payment` pattern used
  elsewhere in this registry rather than inventing a new boolean-with-amount
  shape.
- **The wet-ink signature and public-notarization requirement (Section 10,
  "Unterschriften")** are not modelled as fields — signatures must be
  authenticated in person by the Amt für Handelsregister und Notariate, a
  notary, or a municipal administration under presentation of a valid
  identity document. This is a physical-attestation process step, not
  applicant-entered data, consistent with this registry's established
  precedent for wet-ink signature sections elsewhere.
- **`ownerHometownOrNationality`/`additionalSignatoryHometownOrNationality`/
  `submitterHometownOrNationality`** each model a single combined
  Heimatort-or-Staatsangehörigkeit concept (place of origin for Swiss
  citizens, nationality for foreign nationals) as one free-text field,
  matching the single AcroForm widget backing each — the source form does
  not split this into two separate inputs.
- **No `steps[]`** — this is a flat multi-page paper form, not a live
  multi-step wizard, consistent with this registry's other flat-PDF
  schemas (e.g. the NO Skattemelding sibling).

## Validation

- `node tools/validate.mjs` — see CI/commit log for the exact before/after
  totals.
- `node tools/validate-ajv.mjs` — same.
- `node tools/verify-sources.mjs --base origin/main` — confirms the single
  cited source URL is live and unauthenticated.
- Conformance fixtures under
  `conformance/ch/sg/handelsregisteramt/anmeldung-neueintragung-einzelunternehmen/1.0.0/`:
  2 valid fixtures (sole-signature-no-UID, and joint-signature-with-UID
  covering every `requiredWhen` branch) plus mutation-control fixtures each
  raising exactly one error.

GovSchema is independent and is not affiliated with, endorsed by, or
operated by the Swiss Confederation, the Canton of St. Gallen, or its Amt
für Handelsregister und Notariate. This schema does not file the
registration itself; the live source (`sg.ch`) is always authoritative.
