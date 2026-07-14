# Verification record — `si/furs/doh-odm-income-tax-return-instructions` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-14`

This is a `GovSchema Standard Research` cycle (**GOV-2929**), following
GOV-2925's research and GOV-2910's opening of Slovenia (the registry's 53rd
jurisdiction) via Business Formation. This document advances Slovenia's
**Taxes vertical (2 of 6)**.

## Why this candidate — and why an instruction booklet, not an AcroForm

FURS's own annual personal income tax assessment return (napoved za odmero
dohodnine, "Doh-Odm") and periodic VAT return (DDV-O) are both e-filing-only
through the eDavki portal — confirmed dead ends this cycle, detailed below.
FURS does, however, publish its own first-party, numbered, field-by-field
instruction booklet for the income tax return every year. This registry has
an established precedent for modelling income-tax schemas from an
instruction booklet rather than a blank AcroForm specimen when no fillable
template exists (e.g. South Africa's SARS ITR14 guides, Croatia's own
`hr/porezna-uprava/prijava-poreza-na-dohodak`, which is also a static,
non-AcroForm PDF whose own printed section numbers and field labels are
self-documenting). The Doh-Odm instructions are unusually well-suited to
this pattern: every income type is keyed to a stable, numbered code (e.g.
1101, 1102, 2100, 4200, 6100) with its own explicit "V polje »Dohodek«
vpišete / V polje »Prispevki« vpišete / V polje »Akontacija v RS« vpišete /
V polje »Tuji davek« vpišete" field-by-field guidance — a genuine numbered
field/code structure, not free-form prose.

## Source re-verification (Phase 1)

- **Authority:** FURS (Finančna uprava Republike Slovenije — Financial
  Administration of the Republic of Slovenia), operating under Ministrstvo
  za finance (Ministry of Finance).
- **URL:** `https://edavki.durs.si/OpenPortal/Dokumenti/doh_odm_2025.n.sl.pdf`
- **Retrieved / reviewed:** 2026-07-14, independently re-fetched this cycle
  with `curl -sL -D headers.txt`, not trusted from the task brief's own
  numbers as-is.
- **HTTP status:** `200`. **Content-Type:** `application/pdf`. **Size:**
  `378,024` bytes — matches the task brief's own claim exactly. **sha256:**
  `8b0039a128ae1e2e00378eb74d9dedd88e8c55ebe2bf9033d76d658cf8d371b7` —
  independently computed this cycle with `sha256sum` against a fresh
  download, matching the brief's own claim exactly (character-for-character).
- **Extraction method:** `pdfjs-dist@3` (`legacy/build/pdf.js`, matching this
  registry's established technique for this environment, which has no
  `pdftotext`/`pdftoppm`), run from scratch this cycle in a clean scratch
  directory against the freshly re-fetched PDF. `page.getAnnotations()`
  returned **zero** Widget annotations across all **25** pages — independently
  confirming the task brief's own claim that this is a static instruction
  booklet, not a fillable AcroForm — so `page.getTextContent()` (with
  `hasEOL`-based line reconstruction for readability) was used instead,
  reading every page's printed text in full, independently of any prior
  extraction.
- **What it confirms:** every numbered income-source code and its
  field-by-field guidance this document's `incomeEntryNCode` enum and
  `incomeEntryN*` amount fields model (verbatim code numbers and labels:
  1101 Plače in nadomestila plače, 1102 Bonitete, 1103 Regres za letni
  dopust, 1104 Jubilejne nagrade/odpravnine/solidarnostne pomoči, 1105
  Premije za PDPZ, 1106 Pokojnine iz obveznega PIZ, 1107 Nadomestila iz
  obveznega PIZ, 1108 Nadomestila in drugi dohodki iz obveznega socialnega
  zavarovanja, 1109 Drugi dohodki iz delovnega razmerja, 1110 Dohodek za
  vodenje družbe, 1111 Plačilo za poslovno uspešnost, 1210/1211/1212
  Dohodki dijakov in študentov, 1220 Dohodki verskih delavcev, 1230
  Preostali dohodki iz drugega pogodbenega razmerja, 2100 Dobiček po
  davčnem obračunu, 3100 Dohodek iz osnovne kmetijske/gozdarske dejavnosti,
  4200 Dohodek iz prenosa premoženjske pravice, 6100 Darila, 6200
  Priznavalnine, 6300 Preostali drugi dohodki, 6500 Nadomestilo za uporabo
  lastnih sredstev prostovoljca, 6700 Dohodki Fulbrightovega programa); the
  dependent-family-member table's exact 7-column structure and its
  A1/A2/A3/A4/A5/B1/B2/C/D/E relationship-code legend (pp.23-24); the
  voluntary supplementary pension-insurance (PDPZ) premium table's two
  columns (p.25); the "Oznaka statusa napovedi" filing-status codes 1/2/3
  and their statutory basis (62./63./64. člen ZDavP-2, p.3-4); and the five
  distinct relief-eligibility flags in the taxpayer-identity block, each
  gated on its own explicit named criterion (p.4-5).
- **What it does NOT itemize:** unlike Croatia's Obrazac DOH (whose own
  instructions print an explicit numbered subsection, e.g. §1.1/§1.2/§1.3,
  for every taxpayer-identity field), the Doh-Odm booklet describes the
  "PODATKI O ZAVEZANCU" (taxpayer data) block only in general prose
  ("Vpišejo se osebni podatki o zavezancu" — the taxpayer's personal data
  is entered) without naming each identity field's own printed label
  individually. `fullName`, `taxNumber`, and `residentialAddress` are
  therefore modelled as the baseline identity fields that block requires —
  a disclosed inference, not a literal transcription — consistent with the
  fact that the dependent-family-member table itself requires an identical
  name/tax-number pair for each dependent (p.24, stolpec 1-2), and that
  `taxNumber` (davčna številka) is the universal filer key for every FURS/
  eDavki interaction.

## Dead ends confirmed this cycle

- **DDV-O (VAT return):** the eDavki help page confirms direct entry in the
  logged-in eDavki portal only; no downloadable blank PDF specimen exists.
  Checked three Uradni list (Official Gazette) annex mirrors this cycle —
  `RS_-2009-105-04671-OB~P003-0000.PDF`, `RS_-2007-052-02794-OB~P003/
  P004-0000.PDF`, `RS_-2022-016-00297-OB~P002-0000.PDF` (all HTTP 200) — via
  `pdfjs-dist`: **0 fields / 0 Widget annotations** in every one, confirming
  static gazette typesetting, not fillable forms.
- **Doh-Odm blank return form:** no downloadable blank-form file exists
  (404s on every path tried); the return itself is filed exclusively via
  eDavki (web portal, login+password or digital certificate; the eDavki
  mobile app; in person at a finančni urad; or by post), per the
  instructions' own "Napoved se lahko vloži" section (p.3).
- **`ddv_o.n.docx`** (FURS's VAT-return instruction docx, secondary/optional
  per the task brief) was not pursued this cycle — the task brief already
  screened it (0 form-field constructs) and flagged it as a distinct
  future-cycle candidate, not a companion source for this document; per the
  registry's one-deliverable-per-PR convention, it is left as disclosed
  backlog rather than folded into this schema.

## Field inventory and scope (Phase 2)

All `fields[]` entries and their exact source-booklet page/section
reference are listed inline in `schema.json`'s own `sourceRef` per field.
Summary by section:

| Section | Representative fields | Modelled scope |
|---|---|---|
| Header | `taxYear`, `filingStatusCode` | Full |
| PODATKI O ZAVEZANCU (taxpayer identity + reliefs) | `fullName`, `taxNumber`, `residentialAddress`, `residentPartYearFromMonth`/`ToMonth`, `euEeaResidentReliefClaimed`, `disabilityCareReliefClaimed`, `volunteerRescueReliefClaimed`, `under29ReliefClaimed`/`EmploymentPeriod`, `newResidentReliefClaimed` | Full — every relief flag the instructions describe with an explicit named criterion |
| Vzdrževani družinski člani (dependents) | `dependent1..3FullName`/`TaxNumber`/`BirthYear`/`RelationshipCode`/`PeriodFromMonth`/`PeriodToMonth`/`MaintenancePaid` | Bounded to 3 rows (see judgment call 1) |
| Premije za PDPZ (voluntary pension premiums) | `pensionPremium1..3PlanCode`/`Amount` | Bounded to 3 rows |
| Opombe/Priloge/closing | `notes`, `attachmentsList`, `placeOfCompletion`, `dateOfCompletion` | Full |
| Vrste dohodka (income entries) | `incomeEntry1..5Code`/`Income`/`Contributions`/`AdvanceTaxRS`/`ForeignTax`/`StandardOrActualCosts`/`Country` | Bounded to 5 rows; `Code` enum covers all 24 leaf income-source codes the instructions define (see judgment call 2) |

Total: **79 `fields[]`** entries (6 `required: true` — `taxYear`, `fullName`,
`taxNumber`, `residentialAddress`, `placeOfCompletion`, `dateOfCompletion`;
73 `required: false`, one of which — `under29ReliefEmploymentPeriod` —
carries `requiredWhen`). No `documents[]` entry: the instructions describe
the closing signature only as "zavezanec vpiše kraj in datum izpolnitve
napovedi in se podpiše" (the taxpayer enters place and date and signs),
without printing any specific attestation statement text to quote (unlike
Croatia's Obrazac DOH, which prints "ZA ISTINITOST I VJERODOSTOJNOST
PODATAKA JAMČIM VLASTITIM POTPISOM" verbatim) — `placeOfCompletion` and
`dateOfCompletion` capture the behaviour without fabricating quoted text.

### Explicitly out of scope (disclosed, not modelled)

- **"Dodatni podatki o dohodkih, prejetih iz tujine"** — a supplementary
  foreign-income table the instructions repeatedly cross-reference as being
  on the actual return's own page 3 (with its own "Stroški" costs column),
  but never itself specimen. Since this source is instructions-only (no
  blank return template exists to transcribe), this table's own field
  structure cannot be independently confirmed and is left as disclosed
  backlog.
- **"DOHODKI, KI SE POVPREČIJO"** (p.20) — a narrow income-averaging
  sub-table for judicial back-pay and start-up-company boniteta shares, with
  its own distinct "Oznaka dohodka" field. Excluded as a narrow path outside
  the common case, mirroring the Croatia DOH precedent's own exclusion
  rationale for analogous narrow sub-paths.
- **Health-insurance-contribution/donation personal-deduction increase**
  and **investment-relief application for basic agricultural/forestry
  activity** (p.17, a distinct companion form, not part of this return) —
  both referenced in passing but not carrying their own numbered
  field-by-field guidance in this source.

## Access notes and judgment calls

1. **Repeating-group row caps.** The dependent-family-member table and the
   PDPZ premium table are each bounded to **3 rows**, mirroring this
   registry's established convention for bounding a repeating group whose
   real-world cardinality is open-ended but typically small (e.g.
   `hr/porezna-uprava`'s own 3-row dependent/employer/pension-payer caps).
   The income-entry table is bounded to **5 rows** — wider than 3, since a
   single taxpayer plausibly reports several distinct income types
   simultaneously (e.g. wages, a holiday allowance, a pension, and a gift),
   consistent with the registry's precedent for a richer central table
   (e.g. `mk/ujp`'s 5-of-21-row stock-schedule cap, GOV-2919). None of these
   caps are printed capacities from a blank form (since none exists here);
   they are registry-side bounding decisions, disclosed as such in each
   field's own `description`.
2. **The income-source `code` enum lists all 24 leaf (fillable) codes the
   instructions define, not just the most common employment-income
   subset.** Unlike Croatia's Obrazac DOH (where excluding whole sections
   avoids modelling genuinely complex sub-calculations — foreign income,
   loss carryforwards, multi-step totals), each Doh-Odm code's marginal
   modelling cost is a single enum value plus a short description, not a
   sub-form of its own; the numbered code list *is* this source's
   structural spine (per the task brief's own framing: "model the
   income-source codes and their instructed fields"). Category-header codes
   that are never themselves a fillable line item (1000, 1100, 1200, 2000,
   3000, 4000, 6000) are excluded from the enum; only the 24 leaf codes
   that carry their own "V polje »Dohodek« vpišete" instructions are
   included.
3. **Generic per-entry columns (`Income`/`Contributions`/`AdvanceTaxRS`/
   `ForeignTax`/`StandardOrActualCosts`/`Country`) are modelled uniformly
   across all `incomeEntryN` rows, even though not every code's own
   instructions carry every column** (e.g. 1220 and 1230 have no explicit
   "Tuji davek" instruction; 6200 has no "Tuji davek" either; only
   1210/1211/1212/1230/4200/6500/6700 carry a costs column; only some
   1100-series codes carry "Prispevki"). Modelling one generic per-code
   column set (rather than a distinct field set per code, which would
   multiply the schema by ~24x) is a disclosed simplification, flagged in
   each column field's own `description` (e.g.
   `incomeEntry1Contributions`'s description notes "not every code carries
   this column").
4. **`taxNumber`/`fullName`/`residentialAddress` are inferred baseline
   identity fields, not literal transcriptions** — see "What it does NOT
   itemize" above. Flagged here again because it is the one place this
   schema models a field the source text does not itself name with an
   explicit printed label.
5. **`filingStatusCode`'s three values are drawn directly from the
   instructions' own "Oznaka statusa napovedi" section** (p.3-4, citing
   62./63./64. člen ZDavP-2 by number), a genuine printed rubric name, not
   an inference.
6. **No shared/reusable "address" or "amount" field-type exists in
   `spec/v0.3`** (the field model is deliberately flat) — consistent with
   this registry's established convention (e.g. `si/ajpes`'s own disclosed
   judgment call on the same point).
7. **`authority`.** FURS is modelled with an `operatedBy` sub-object naming
   Ministrstvo za finance (Ministry of Finance) and citing ZDoh-2 and
   ZDavP-2 as the governing statutes — both cited explicitly, by name and
   article number, throughout the instruction booklet's own text (e.g. "6.
   členu ZDoh-2" for tax residency, p.2; "62. členu ZDavP-2" for late
   filing, p.3-4), unlike `si/ajpes`'s precedent (no `operatedBy`, since
   AJPES is a standalone independent agency with no supervising ministry
   confirmed). FURS, by contrast, is explicitly a body within Ministrstvo za
   finance (per FURS's own `gov.si` organizational listing), matching this
   registry's convention for a tax authority operating under a ministry
   (e.g. `hr/porezna-uprava`'s own `operatedBy: Ministarstvo financija`).

## Test run (Phase 3)

No live eDavki submission was attempted: eDavki is a credential-based,
authenticated e-filing system (username/password or a Slovenian qualified
digital certificate), and submitting fabricated taxpayer data against a
live Slovenian government tax-filing system is not a safe or reversible
action.

Instead, this document's own structural validity was confirmed with this
registry's standard tooling:

```
$ node tools/validate.mjs registry/si/furs/doh-odm-income-tax-return-instructions/1.0.0/schema.json
ok   registry/si/furs/doh-odm-income-tax-return-instructions/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/si/furs/doh-odm-income-tax-return-instructions/1.0.0/schema.json
ok   registry/si/furs/doh-odm-income-tax-return-instructions/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

A full-registry run after regenerating
`tools/govschema-client/registry-index.json` (via `npm run build-index`)
confirms no regression (see the registry-index diff and full-run output in
this PR).
