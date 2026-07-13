# Verification record — `rs/purs/pp-gpdg-godisnji-porez-na-dohodak-gradjana` v1.0.0

This file is the **source-review record** for this document version, per the
`manual-source-review-v1` practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-13`
- **`maturity.level`:** `structural-reference`

This is GovSchema Standard Research cycle **GOV-2767**, advancing Serbia's
Taxes vertical — a candidate pre-scouted and left open in **GOV-2760**'s own
screening pass (`CATALOG.md`'s "Known Gaps & Opportunities"), which named
**PPDG-2R** as the strong lead.

## Duplicate-concurrent-run check

Checked `git branch -a | grep -i rs-purs` and `gh pr list --state all --search
"rs/purs"` before starting — neither found an existing `rs/purs` branch or
PR, so no reconciliation was needed this cycle.

## Source verification, part 1 — the pre-scouted PPDG-2R lead re-confirmed live, but found stale

Independently re-fetched PPDG-2R from scratch rather than trusting the prior
cycle's own memory record:

- **PDF source:** `https://purs.gov.rs/upload/media/2025/2/4/609132/ObrazacPPDG-2R.pdf`
  — fetched via `curl -s`: **HTTP 200**, **`application/pdf`**, **254,833
  bytes**, **`sha256`:**
  `888aa229a8cd09338055703ada3e195db931ac72e2db4e4ac5ccd4d80ba5be90`.
  Confirmed via `pdfjs-dist@3`: 2 pages, zero Widget annotations (a genuine
  print/portal-preview specimen, not an AcroForm), a fully extractable
  Cyrillic text layer, both pages also rendered to PNG and visually
  cross-checked. The specimen's structure (numbered items 1.1-1.4, 2, and a
  3.1-3.19 income worksheet ending at "5. Напомена пореског
  обвезника/пуномоćника/заступника" with no printed signature line) is
  genuinely well-formed and extractable.
- **However**, cross-referencing the Tax Administration's own currently
  published user-instructions document (see part 2 below) revealed that
  PPDG-2R governs determination of the annual personal income tax **"by
  decision" (по решењу) of the Tax Administration** — the mechanism in force
  through the tax calculated for the **2021** tax year. Starting with the
  tax calculated for the **2022** tax year (first filed in 2023), Serbia
  switched this tax to a **self-assessment (самоопорезивање)** system,
  implemented through a different form, **ПП ГПДГ (PP GPDG)**, filed
  **exclusively electronically** through the e-Porezi portal with a
  qualified electronic certificate. PPDG-2R survives today only as the
  vehicle for **amending or reversing (storno) a pre-2022-tax-year return**
  — it is a legacy/historical form for an ongoing, but narrowing, use case,
  not the process a taxpayer uses today to file their current annual
  personal-income-tax return.
- Per the task's own explicit contingency ("if the PPDG-2R lead is stale,
  but you find a different genuine, live, first-party form, author that
  instead and explain the substitution"), this schema models **PP GPDG**
  instead of PPDG-2R. This is a disclosed substitution, not a silent
  departure from the pre-scouted lead.

## Source verification, part 2 — PP GPDG, the current form

PP GPDG has **no static downloadable blank-form PDF** — it exists only as an
interactive return inside the e-Porezi portal (either pre-filled by the Tax
Administration from official records, or completed by the taxpayer via a
"Text entry"/"XML entry" option). The Tax Administration's own official
**user-instructions PDF** is therefore the authoritative first-party
description of every field, screen, and validation rule:

- **PDF source:**
  `https://www.purs.gov.rs/upload/media/2025/2/4/386327/Korisnickouputstvozapodnosenjeporeskeprijaveoobracunatomgodisnjemporezunadohodakgradjana.pdf`
  ("Корисничко упутство за подношење пореске пријаве о обрачунатом
  годишњем порезу на доходак грађана", April 2023 edition) — fetched via
  `curl -s`: **HTTP 200**, **`application/pdf`**, **1,185,205 bytes**,
  **`sha256`:**
  `6a453bedd83074b9718858fe609a3e1ff1e075f8348e0bce86f4436aef12cf70`.
  Domain `purs.gov.rs` (Poreska uprava / Tax Administration, under the
  Ministarstvo finansija) is the correct, official first-party agency for
  Serbian personal income tax.
- Confirmed via `pdfjs-dist@3`: 21 pages, zero Widget annotations (a plain
  instructional PDF, not an AcroForm). `getTextContent()` returned a full,
  clean Cyrillic text layer, read in full across all 21 pages before
  modeling any field.
- **The document explicitly states the self-assessment switch**: "Годишњи
  порез на доходак грађана, почевши од пореза који се обрачунава за 2022.
  годину, обрачунава се и плаћа по систему самоопорезивања, уместо по
  решењу пореског органа како је то било до сада" (page 2) — corroborating
  part 1's finding above.
- **Page-image cross-check.** Two of the document's embedded portal
  screenshots were rendered to PNG via `pdfjs-dist@3` + `node-canvas` (page
  4, "Slika 1" — the filing-metadata/Part-1-taxpayer-data screen; pages 5-6,
  "Slika 3-5" — the Part-2 dependents add-dialog and its "Сродство"
  dropdown) and visually cross-checked against the surrounding instructional
  text:
  1. **Slika 1** confirmed the exact field layout and order of the
     filing-metadata row (Врста пријаве / Датум настанка пореске обавезе /
     Датум до ког је обрачуната камата, then Врста / Идентификатор измењене
     пријаве / Основ / Број решења/одлуке суда) and Part 1's taxpayer-data
     grid, **including field 1.4.5 (Спрат / Стан број / Стан слово)**,
     which the surrounding instructional text's numbered walkthrough skips
     over (it names 1.4.1-1.4.4 then jumps to "поље 1.4.6" for phone) but
     which is visibly present in the rendered screenshot — included in this
     schema (`floor`/`apartmentNumber`/`apartmentLetter`) on the strength of
     the render, not invented from the numbering gap alone.
  2. **Slika 1** also confirmed which fields carry a required-field asterisk
     in the portal: only 1.4.6 (Телефон позивни, Телефон број), 1.4.7
     (Електронска пошта), and 1.5 (Занимање) are asterisked — because in
     the pre-filled-return scenario the screenshot depicts, JMBG/date of
     birth/name/address are already auto-filled and grayed out. Part II's
     own text (page 11) states that a **self-filing** taxpayer (no
     pre-filled return available) must supply JMBG/EBS/PIB, date of birth,
     name/parent's-name/surname, and address themselves — so this schema
     treats those fields as `required: true` despite the absence of a
     visible asterisk in the pre-filled-scenario screenshot, a disclosed
     judgment call grounded in Part II's explicit text.
  3. **Slika 3-5** confirmed the exact "Сродство" (relationship) dropdown
     option set for dependents — Деца/усвојеници, Брачни друг,
     Родитељи/усвојиоци, Унуци (не издржавани од родитеља, живе у
     домаћинству) — matching `dependentNRelationship`'s enum exactly.

## Field derivation

The return's own six parts (page 8: "Образац ПП ГПДГ састоји се из шест
делова"), reconstructed from the instructions' numbered walkthrough
(pages 7-16) and cross-checked against the two rendered screenshots:

1. **Filing metadata** ("ДЕО - ПОДАЦИ О ПРИЈАВИ", pages 8-11): type of
   filing (6 codes), tax year, date tax liability arose, interest-through
   date, and — only for amended/reversed filings — an amendment-type code,
   the identifier of the filing being amended, and — only for
   control/court-ordered filings — a basis code and decision number.
2. **Part 1, taxpayer data** (page 11): JMBG/EBS/PIB, date of birth, name/
   parent's-name/surname, full address (municipality, place, street, house
   number and letter, floor/apartment sub-fields), phone, e-mail,
   occupation.
3. **Part 2, dependent family members** (pages 11, 5-6): relationship, JMBG/
   EBS, name/parent's-name/surname, added one at a time via a modal dialog.
4. **Part 3, taxable-income worksheet** (pages 11-16): numbered 3.1 to 3.20.
5. **Part 4, list of attached evidence** (pages 16-18): a dropdown of 3
   document categories.
6. **Part 5, note of the taxpayer/proxy/representative** (page 18): free
   text, capped at 500 characters.

Every numbered item in parts 1-5 (and every filing-metadata item) was mapped
to one of this schema's 107 `fields[]` entries or 3 `documents[]` entries.
See each field's own `sourceRef` for the exact instructions-document
part/item it was read from.

## Scoping and modeling judgment calls

- **Dependents modeled as a bounded 6-slot repeating group
  (`dependent1`..`dependent6` × relationship/JMBG/first name/parent's
  name/surname), all optional:** the source describes a **dynamic**
  add-one-at-a-time list with a system maximum of **20** entries (at most
  one "spouse", at most two "parent" entries, no self-listing) — there is
  no printed row grid to size against, unlike e.g. `rs/mfa/visa-application`'s
  3-row children table. Six slots follow this registry's established
  precedent for a flat-fields repeating group of comparable real-world
  family size (`jo/istd/pit-return-employee`'s own 6-row `dependentN`
  precedent), disclosed here as a representative bound rather than the
  source's own dynamic/20-entry ceiling, since v0.3's field model has no
  native array type.
- **`dateTaxLiabilityArose`, `interestCalculatedThroughDate`,
  `additionalReductionUnder40`, `nonTaxableAmount`, `personalDeductionsForTaxpayer`
  modeled optional despite being system-auto-filled in the pre-filled-return
  scenario:** the source describes these as amounts/dates the Tax
  Administration computes and enters automatically (from the tax year,
  filing type, the taxpayer's age, and the statutory non-taxable threshold
  respectively); modeling them as always-required would invent a
  taxpayer-input obligation the source does not actually impose on the
  taxpayer in every case.
- **`interestCalculatedThroughDate`/`calculatedInterest` left optional with
  no `requiredWhen` gate:** the source's own conditionality ("uписује se
  ... ako ima osnova za obračun kamate", varying by filing type) is
  narrative and multi-branched rather than a single clean field-equals-value
  gate, so no gate was invented, per this registry's established
  no-invented-gate convention.
- **`amendedFilingIdentifier` gated by `requiredWhen: { field:
  "amendmentType", in: [...] }`** (the v0.3 `in` operator, §8.1): the source
  states plainly that if a value is entered in the Врста (`amendmentType`)
  field, a previously recorded return with the given identifier must exist
  — a clean, explicit requirement, not an invented one.
- **All `3.x` worksheet subtotal/total fields (e.g. `employmentIncomeSubtotal`,
  `grandTotal`, `taxableIncome`, `annualTax`) modeled `required: true`,
  itemized component lines beneath them also modeled `required: true` with
  `minimum: 0`, defaulting to 0 when not applicable:** the source states
  every `3.x` field is auto-populated with 0 for a self-filed return except
  3.11 (non-taxable amount) and 3.13.1 (personal deduction for the
  taxpayer) — i.e. the worksheet has no blank/absent state, matching this
  registry's established convention (e.g. `jo/istd/pit-return-employee`'s
  own worksheet-box fields) of treating a numeric ledger's every line as
  present-with-a-value rather than optional. `additionalReductionUnder40`,
  `nonTaxableAmount`, `personalDeductionsForTaxpayer`,
  `personalDeductionsForDependents`, `taxCredit`, and `calculatedInterest`
  are the sole worksheet fields left optional (see above and below).
- **Amounts modeled `integer` with `minimum: 0`:** the source states
  amounts are entered "у динарима, без децимала" (in dinars, without
  decimals) and that a negative computed result is floored to zero by the
  portal itself.
- **`filingType` keeps all 6 documented codes even though codes 2 (ex
  officio) and 4 (control order) are typically applied by the Tax
  Administration rather than chosen by a self-filing taxpayer:** disclosed
  in the field's own description rather than narrowed to a taxpayer-only
  subset, since the source presents all 6 as the field's one documented
  option set.
- **Classification:** JMBG/EBS/PIB and dependents' JMBG/EBS are tagged
  `sensitive-pii`; name pieces, date of birth, address, phone, and e-mail
  (taxpayer's and dependents') are tagged `pii`, matching this registry's
  established precedent (e.g. `rs/mfa/visa-application`'s own passport-
  number/name classification). Plain enumerated/free-text filing-metadata
  and worksheet amount fields are left unclassified.

## Conformance run

Two hand-authored valid fixtures under
`conformance/rs/purs/pp-gpdg-godisnji-porez-na-dohodak-gradjana/1.0.0/`:

- **`valid-wage-earner-minimal.json`** — a single wage-earning taxpayer, no
  dependents, no amendment, filing type "general", exercising the schema's
  minimal required-field path (every non-applicable worksheet line entered
  as 0, matching the portal's own default).
- **`valid-self-employed-with-dependents-and-amendment.json`** — a
  self-employed taxpayer with a spouse and child as dependents,
  self-employment and foreign-taxed income, an amended filing
  (`amendmentType`/`amendedFilingIdentifier` both set), a tax credit, and a
  taxpayer note — exercising the schema's `requiredWhen` gate and its
  optional fields.

Eight mutation-control fixtures, each isolated to raise **exactly one**
error:

- **`mutation-control-missing-required-field.json`** — drops
  `taxpayerIdNumber` (static `required: true`).
- **`mutation-control-invalid-enum-value.json`** — sets `filingType` to
  `"urgent"`, not one of the enum's 6 values.
- **`mutation-control-invalid-date-format.json`** — sets `dateOfBirth` to
  `"22-03-1994"`, not the required `YYYY-MM-DD` shape.
- **`mutation-control-invalid-type-wage-income.json`** — sets `wageIncome`
  to the string `"not-a-number"` instead of an integer.
- **`mutation-control-invalid-minimum-wage-income.json`** — sets
  `wageIncome` to `-100`, below `validation.minimum: 0`.
- **`mutation-control-missing-conditional-amended-filing-identifier.json`**
  — sets `amendmentType` to `"taxpayer-amendment-article-40"` without its
  `amendedFilingIdentifier` companion.
- **`mutation-control-invalid-minimum-tax-year.json`** — sets `taxYear` to
  `2021`, below `validation.minimum: 2022` (the first self-assessment year).
- **`mutation-control-invalid-maxlength-note.json`** — sets `taxpayerNote`
  to a 501-character string, above `validation.maxLength: 500`.

All ten fixtures were checked with a from-scratch Node conformance checker
(`validate_conformance.mjs`, not committed — a disposable script run from an
isolated `/tmp` scratch directory, per this registry's own established
practice since no committed conformance-fixture validator exists)
implementing this schema's own `required`/`requiredWhen` (including the
`in` operator)/`type`/`validation.enum`/`validation.minimum`/
`validation.maxLength` grammar directly:

```
$ node validate_conformance.mjs registry/rs/purs/pp-gpdg-godisnji-porez-na-dohodak-gradjana/1.0.0/schema.json conformance/rs/purs/pp-gpdg-godisnji-porez-na-dohodak-gradjana/1.0.0
OK   mutation-control-invalid-date-format.json  errors=["dateOfBirth: invalid date format \"22-03-1994\", expected YYYY-MM-DD"]
OK   mutation-control-invalid-enum-value.json  errors=["filingType: value \"urgent\" not in enum [\"general\",\"ex-officio\",\"after-deadline-article-182b\",\"control-order\",\"court-decision\",\"extended-deadline-article-39\"]"]
OK   mutation-control-invalid-maxlength-note.json  errors=["taxpayerNote: length 501 above maxLength 500"]
OK   mutation-control-invalid-minimum-tax-year.json  errors=["taxYear: value 2021 below minimum 2022"]
OK   mutation-control-invalid-minimum-wage-income.json  errors=["wageIncome: value -100 below minimum 0"]
OK   mutation-control-invalid-type-wage-income.json  errors=["wageIncome: expected type integer, got string (\"not-a-number\")"]
OK   mutation-control-missing-conditional-amended-filing-identifier.json  errors=["amendedFilingIdentifier: required but missing"]
OK   mutation-control-missing-required-field.json  errors=["taxpayerIdNumber: required but missing"]
OK   valid-self-employed-with-dependents-and-amendment.json  errors=[]
OK   valid-wage-earner-minimal.json  errors=[]
```

All eight negative controls raised exactly one error each, and neither
valid scenario raised an unexpected error.

The registry's zero-dependency structural validator and its ajv-based
meta-schema validator were both run against the full registry (including
this new schema) and pass:

```
$ node tools/validate.mjs
416/416 document(s) passed. 3/3 mapping.json companion(s) passed.

$ node tools/validate-ajv.mjs
416/416 document(s) validated against the meta-schema (ajv 2020-12). 3/3 mapping.json companion(s) validated.
```

`tools/` had no `node_modules` at all this cycle (not merely stale); ran
`npm ci --include=dev` inside `tools/` to install ajv per this registry's
documented gotcha, rather than a scoped `npm install <pkg> --no-save`. The
scratch `pdfjs-dist`/`canvas` install used for PDF extraction and rendering
was done in an isolated `/tmp` scratch directory, never inside `tools/` or
`tools/govschema-client/`.

`tools/govschema-client/registry-index.json` was regenerated via `npm run
build-index` inside `tools/govschema-client/`.

## Scope and jurisdiction notes

- Advances Serbia's **Taxes vertical**, following Business Formation
  (GOV-2725, 48th jurisdiction) and Visa (GOV-2760). Serbia now stands at
  **3 of 6** verticals (Business Formation, Visa, Taxes); DMV, National ID,
  and Passport remain open, unscreened-this-cycle backlog candidates.
- `jurisdiction.level` is `national` — the Tax Administration is Serbia's
  national tax authority.
- `process.type` is `filing`, matching this registry's established
  convention for tax-return forms (e.g. `jo/istd/pit-return-employee`,
  `at/bmf/employee-tax-assessment`).
- `process.language` is `sr`, matching `rs/apr/jrpps-pr-sole-proprietor-registration`'s
  and `rs/mfa/visa-application`'s own convention for this jurisdiction.
- PPDG-2R (`https://purs.gov.rs/upload/media/2025/2/4/609132/ObrazacPPDG-2R.pdf`)
  remains genuinely live and could still be modeled as a distinct,
  narrower-scope schema for amending/reversing pre-2022-tax-year returns —
  left as a disclosed, low-priority backlog item, since it addresses a
  shrinking population of historical tax years rather than Serbia's current
  ongoing filing process.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-13** (6
months). A future review should prioritize: (1) confirming whether the
Korisničko uputstvo has been updated for a later tax year (the April 2023
edition in hand describes the 2022-tax-year rollout; later editions may
adjust thresholds/rates); (2) screening Serbia's remaining DMV, National ID,
and Passport verticals; (3) considering whether field 1.4.5
(floor/apartment) merits a stronger source (e.g. a fresh portal screenshot)
beyond this cycle's rendered instructions-document image.
