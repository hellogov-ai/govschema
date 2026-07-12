# Verification record — `ke/kra/it1-individual-resident-return` v1.0.0

This file is the source-review record for this document version. It documents
the provenance of the published fields and states the current verification
claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-12`

This is GovSchema Standard Research cycle **GOV-2535/GOV-2533**. It closes
Kenya's **Taxes vertical (3 of 6)**, via the Kenya Revenue Authority's
`IT1_Individual_Resident_Return` Excel workbook, modelling the
employed-resident-individual filing pathway.

## Prior-cycle history for this exact candidate

This form was not freshly scouted this cycle — it is CATALOG.md's own
standing, previously-corrected Known Gaps candidate:

- **GOV-2500** (`ke/nrb`) first identified it as a genuine, currently
  maintained, richly structured (34-sheet) candidate, citing an internal
  version "19.0.3, March 2026", but set it aside that cycle in favour of
  National ID's more tractable scope.
- **GOV-2507** later found one live, unauthenticated sibling file on
  `kra.go.ke` (`IT1_Individual_Resident_Return_Version-18.03-Revised.xls`)
  to be genuinely MS-Office-encrypted, and from that alone concluded the
  candidate had "reversed to a dead end."
- **GOV-2517** corrected that same-day reversal: a plain web search for the
  form's own filename turns up two more currently-live, unauthenticated,
  *unencrypted* siblings on the same host —
  `Updated-IT1_Individual_Resident_Return_XLS-18.0.9-2024.xls` and
  `IT1_Individual_Resident_Return_18.0.1latest.xls` — both independently
  re-fetched and opened cleanly with the `xlsx` npm library at the time,
  resolving to the same genuine 34-sheet structure with no password prompt.
  GOV-2517 restored Taxes as Kenya's sole open, unscreened-in-depth vertical
  and flagged the "19.0.3/March 2026" version claim as **unconfirmed and
  suspect** (could not be corroborated anywhere), while leaving the
  candidate itself as live and workable.

This cycle authors against exactly the file GOV-2517 named as workable
(`IT1_Individual_Resident_Return_18.0.1latest.xls`), independently re-fetched
and re-derived from scratch rather than trusting any prior cycle's citation.

## Source re-fetch (independent reproduction)

- **URL:** `https://www.kra.go.ke/images/publications/IT1_Individual_Resident_Return_18.0.1latest.xls`
- Fetched directly via `curl` from this cycle's own worktree: **HTTP 200**,
  **3,323,904 bytes**,
  `sha256: 7c85241bbabc797b9e3c6b708209a32866c4ec9131f9d845d0b87c9734e939e2`
  — this exactly matches the byte size and hash already on record going into
  this cycle (no drift since GOV-2517's own re-fetch).
- No login, CAPTCHA, or WAF gate; this is a plain, unauthenticated
  publications-page download.
- Opened with the `xlsx` npm package (`XLSX.readFile`, no options needed to
  defeat encryption) — genuine BIFF/Excel-97-2003 format, no password
  prompt, confirming it is one of GOV-2517's cited *unencrypted* siblings,
  not the encrypted `18.03-Revised` edition GOV-2507 found.
- **34 sheets confirmed by name, in order:** `Data`, `Read Me`, `Errors`,
  `Validations`, `ValidationList`, `Macros_Disabled`, `ImportCsv`,
  `A_Basic_Info`, `B_Profit_Loss_Account_Self`, `B_Profit_Loss_Account_Wife`,
  `C_Balance_Sheet`, `D_Stock_Analysis`, `E1_IDA_CA`, `E2_CA_WTA_WDV`,
  `E2_CA_WTA_SLM`, `E_Summary_of_Capital_Allowance`, `F_Employment_Income`,
  `G_Partnership_Income`, `H_Estate_Trust_Income`,
  `I_Computation_of_Car_Benefit`, `J_Computation_of_Mortgage`,
  `K_Home_Ownership_Saving_Plan`, `L_Computation_of_Insu_Relief`,
  `M_Details_of_PAYE_Deducted`, `N_Installment_Tax_Credits`,
  `O_WHT_Credits`, `P_Advance_Tax_Credits`, `Q_IT_Payment_Credits`,
  `R_DTAA_Credits`, `S_Previous_Years_Losses`, `T_Income_Computation_Self`,
  `T_Income_Computation_Wife`, `T_Tax_Computation`, `Sheet1` — an exact match
  to the sheet list this cycle's own issue text pre-stated.
- **Version-number correction:** `A_Basic_Info!I1` reads **`18.0.1`**
  (`J1` = `2`; `I2`/`J2` = `"XLS"`/`"EXCEL 1997-2003"`, file-format tags, not
  a version), matching the live filename itself
  (`...18.0.1latest.xls`). GOV-2500's "19.0.3/March 2026" claim, which
  GOV-2517 already flagged as unconfirmed, appears to have been a citation
  error rather than a real distinct prior edition — **`18.0.1` is the
  confirmed current version**, cited in `source.documentRef`.

## Extraction method

- Row/column content was dumped per sheet via
  `XLSX.utils.sheet_to_json(ws, {header:1, defval:''})`, filtered to
  non-blank rows, to see the sparse label/value layout.
- Exact cell addresses were then cross-correlated against the workbook's own
  **Defined Names** (`wb.Workbook.Names`, 1,875 entries) — e.g.
  `RetInf.PIN → A_Basic_Info!$B$3`, `EmpIncome.ListS → F_Employment_Income!$A$3:$I$4`,
  `ExemptCerti.ListS → A_Basic_Info!$A$68:$D$69` — which gave precise,
  sourced cell-to-field mappings instead of guessing column positions from
  adjacency alone. (A number of duplicate/stale name entries carrying a
  `Sheet:` index also exist in the workbook and point at slightly different,
  off-by-one addresses; these were disregarded in favour of the
  workbook-level, non-sheet-scoped name, which matches the live cell
  content.)
- **Mandatory/format rules** were read from the `Validations` sheet (99 rows
  of per-field `Mandatory` Y/N flags and `Validation Rule1..3` formula text,
  covering cross-conditional mandatoriness such as Wife-gated fields) and the
  `ValidationList` sheet (485 rows, the same shape but for the workbook's
  repeating-list sections, e.g. `F_Employment_Income`'s and
  `M_Details_of_PAYE_Deducted`'s per-employer column definitions with their
  own `Mandatory`/`Validation Rule` rows).
- **Dropdown enum values** were resolved via the `Data` sheet's own named
  lookup ranges rather than invented: the "Type of Return" dropdown on
  `A_Basic_Info!B4` is backed by the named range `ReturnType` (`Data!D19:D20`),
  which reads exactly `"Original"`, `"Amended"` — confirmed by cross-checking
  `wb.Workbook.Names` for `ReturnType` (two entries, both resolving to the
  same range).
- **Formula vs. raw-entry distinction:** `XLSX.readFile(path, {cellFormula:true})`
  was used to inspect every cell's `.f` (formula) property across the five
  in-scope sheets. A cell with no `.f` is a genuine, directly-typeable input;
  a cell with a `.f` is computed by the workbook itself (a `SUM`, an `IF`
  rollup, or a call into an external, non-extractable VBA macro function
  such as `getTotalTaxPayble`). This distinction drove every decision below
  about which cells become `fields[]` entries with `required: true/false`
  vs. which are described in prose only.

## Scope decisions

### In scope (per the issue's own instructions)

`A_Basic_Info`, `F_Employment_Income`, `M_Details_of_PAYE_Deducted`,
`T_Income_Computation_Self`, `T_Tax_Computation` — modelling the
employed-resident-individual pathway (no business/farming, partnership,
estate/trust, car benefit, mortgage, HOSP, life insurance, commercial
vehicle, foreign/DTAA income, and no spousal/joint filing).

### Out of scope, and why (companion-schedule candidates for a future cycle)

- **`B_Profit_Loss_Account_Self`, `C_Balance_Sheet`, `D_Stock_Analysis`,
  `E1_IDA_CA`, `E2_CA_WTA_WDV`, `E2_CA_WTA_SLM`,
  `E_Summary_of_Capital_Allowance`** — the self-employed/business income
  computation. Gated in `A_Basic_Info` by `hasOtherIncomeThanEmployment`
  (`RetInf.DeclareSelfBusIncome`), modelled here as a `fieldRole: eligibility`
  field with `eligibleValues: [false]` per this registry's established
  convention (cf. `kr/mofa/passport-application-first-adult`,
  `ph/comelec/overseas-voter-registration`) — `true` remains a well-formed
  selectable value on the source, it simply routes outside this v1.0.0's
  pathway.
- **`G_Partnership_Income`** — gated by `hasPartnershipIncome`, same pattern.
- **`H_Estate_Trust_Income`** — gated by `hasEstateTrustIncome`, same
  pattern.
- **`I_Computation_of_Car_Benefit`** — gated by `employerProvidedCar`, same
  pattern. Its rollup value feeds `F_Employment_Income`'s own "Value of Car
  Benefit" column (a formula, `=SUMIF(...)`), which is consequently always
  zero for this pathway and is not modelled as a field (see below).
- **`J_Computation_of_Mortgage`** — gated by `hasMortgage`, same pattern.
- **`K_Home_Ownership_Saving_Plan`** — gated by `hasHomeOwnershipSavingsPlan`,
  same pattern.
- **`L_Computation_of_Insu_Relief`** — gated by `hasLifeInsurancePolicy`,
  same pattern.
- **`N_Installment_Tax_Credits`, `O_WHT_Credits`, `P_Advance_Tax_Credits`,
  `Q_IT_Payment_Credits`, `R_DTAA_Credits`** — each a tax-credit schedule
  feeding one line of `T_Tax_Computation`'s Tax Credits total (13.2-13.8);
  `P_Advance_Tax_Credits` and `R_DTAA_Credits` are further gated by
  `hasCommercialVehicle` and `earnsForeignIncome` respectively. None of the
  five is reachable via this pathway's declarations, so none is modelled;
  the corresponding raw-input `T_Tax_Computation` cells they would feed
  (`C25`/`C26`/`C29`, Withholding Tax / Advance Tax on Commercial Vehicle /
  Rental Withholding Tax) are likewise excluded as fields, since they are
  meaningless without their out-of-scope source schedules.
- **`S_Previous_Years_Losses`** — feeds `T_Income_Computation_Self`'s own
  loss-carry-forward lines (rows 33-35), which are themselves computed
  rollups of the excluded business-income pathway (see next point); out of
  scope.
- **`T_Income_Computation_Self` contributes zero `fields[]` entries.** This
  is a disclosed structural finding, not an oversight. Every amount cell in
  rows 3-35 (across the Business/Farming/Rental/Interest/Commission/Other
  columns) is formula-derived — `{cellFormula:true}` inspection confirms
  zero raw-entry cells anywhere in that grid — rolling up
  `B_Profit_Loss_Account_Self` (line 9), `S_Previous_Years_Losses` (line 6),
  and `G_Partnership_Income`, all already out of scope. The sheet's only
  other raw-entry surface is two ad hoc, open-ended itemised lists ("Part I:
  Other Disallowable Deductions" and "Part II: Other Allowable Deductions",
  rows 38-45 and 49-56, each a free-text "Name of Expense/Deduction" plus
  6 category amount columns) — these are themselves strictly part of the
  same excluded business-income computation, not a separate surface. For
  the employed-resident-only pathway this schema models
  (`hasOtherIncomeThanEmployment = false`), every cell on this entire sheet
  is therefore zero/blank by construction. This is directly analogous to
  this registry's existing zero-`documents[]` disclosure convention (cf.
  `fi/vero/50a-earned-income-and-deductions`, GOV-2308) but applied to
  `fields[]` instead of `documents[]`.
- **The entire spousal/"Wife" pathway** — `T_Income_Computation_Wife`, Wife's
  PIN, Wife's bank details, Wife's auditor details, Wife's Landlord/Tenant
  details, Wife's disability exemption certificate list, Wife's rows in
  `F_Employment_Income`/`M_Details_of_PAYE_Deducted`, and every
  Wife-suffixed cell in `T_Tax_Computation` — gated by
  `wantsToDeclareWifeIncome` (`RetInf.DeclareWifeIncome`), modelled as a
  `fieldRole: eligibility` field with `eligibleValues: [false]`. The
  workbook supports joint/separate spousal filing as a materially larger,
  near-complete mirror of the Self pathway (its own `T_Income_Computation_Wife`
  sheet alone is a full duplicate of the excluded `T_Income_Computation_Self`
  surface) — a strong candidate for its own future companion schema, not
  folded into this v1.0.0.
- **Section A Part 3 (Auditor details, Self/Wife)** — required only when
  `hasOtherIncomeThanEmployment` (or the Wife equivalent) is `"Yes"` per the
  `Validations` sheet's own conditional formulas; consequently unreachable
  and unmodelled for this pathway.
- **Section A Part 4/5 (Landlord/Tenant details, Self/Wife)** — these
  capture rental-property particulars that feed the "Rental" column of
  `T_Income_Computation_Self`/`Wife` (itself out of scope per above) and
  Kenya's separate Monthly Rental Income withholding regime
  (`T_Tax_Computation` line 13.8, also excluded); not gated by any of the
  A_Basic_Info boolean declarations directly, but structurally part of the
  same excluded rental/business-income surface, so out of scope here.

### Field-level exclusions within in-scope sheets (computed, not raw input)

Per the task's own instruction not to invent a formula the schema can't
validate, every cell confirmed to be `{cellFormula:true}`-derived — rather
than a genuine free-text input — is either (a) omitted entirely when it
pulls from an out-of-scope sheet (e.g. `F_Employment_Income`'s "Value of Car
Benefit" column, `=SUMIF(...)` against `I_Computation_of_Car_Benefit`, always
zero here), or (b) published as a `required: false` field with a description
stating it is system-computed, per this registry's existing convention (cf.
`pe/sunat/formulario-virtual-709-declaracion-renta`: "Casilla no editable
(system-calculated, not applicant-entered) ... per this registry's
convention of modelling a source's own casilla-level totals even when
system-calculated"). This applies to: `employer{1,2}TotalEmploymentIncome`,
`totalEmploymentIncomeAllEmployers`, `payeEmployer{1,2}AmountOfTaxPayableOrRefundable`,
`totalAmountOfTaxDeductedPAYESelf`, and every `T_Tax_Computation` field
except `pensionContributionSelf` and `personalReliefSelf` (the only two
genuine raw-entry cells on that sheet relevant to this pathway —
`{cellFormula:true}` confirms neither `C5` nor `C18` carries a `.f`
property).

- **`taxOnTaxableIncomeSelf`** (`T_Tax_Computation!C15`) is computed via
  `getTotalTaxPayble(TaxComp.NetTaxableIncomeS, SecA.RtnYear)` — an external
  VBA macro function, not a literal spreadsheet formula this schema can
  reproduce. The workbook does document the underlying rate bands as plain
  cell text at `F15`: *"Tax Slabs: 0 to 1,21,968 (10%); 1,21,969 to 2,36,880
  (15%); 2,36,881 to 3,51,792 (20%); 3,51,793 to 4,66,704 (25%); Over
  4,66,704 (30%)"* (figures as printed, Indian-style digit grouping — i.e.
  KES 121,968 / 236,880 / 351,792 / 466,704). This is cited verbatim in the
  field's own `sourceRef` for transparency, but the schema does not attempt
  to reimplement the computation (rounding/period-apportionment rules live
  only in the non-extractable macro).
- **`personalReliefSelf`** (`T_Tax_Computation!C18`) — cell `F18` carries a
  developer note reading *"Keep it 13,944 but make it configurable"*.
  Disclosed here as an internal implementation note found in the workbook,
  **not** asserted as the current statutory personal relief amount (Kenya's
  statutory relief has changed over time and this figure is not corroborated
  elsewhere in the workbook); no default or enum is set on this field.
- **KRA PIN pattern** (`pin`, `employer{1,2}PIN`, `payeEmployer{1,2}PIN`):
  the `Validations`/`ValidationList` sheets constrain `MinLength`/`MaxLength`
  to exactly 11 and name a `validatePIN()` check, but `validatePIN` is a
  compiled VBA macro with no extractable literal regex. The
  `^[A-Z][0-9]{9}[A-Z]$` pattern applied to `pin` combines the sourced
  11-character length constraint with Kenya's well-known public KRA PIN
  format (1 letter + 9 digits + 1 letter) — disclosed as a supplementary,
  publicly-documented convention layered on top of a genuinely sourced
  length constraint, not something read out of the workbook's own compiled
  code. `employer{1,2}PIN`/`payeEmployer{1,2}PIN` are modelled as plain
  `maxLength: 11` strings without the same pattern, since a business/employer
  PIN check-digit convention was not independently confirmed for this cycle.
- **Bounded repeating groups** (2 rows each, matching the sheet's own fixed
  row count, per this registry's `entrantN`/`childN` convention, cf.
  `dk/cpr/notification-of-entry`): `F_Employment_Income`'s employer rows
  (`EmpIncome.ListS = F_Employment_Income!$A$3:$I$4`),
  `M_Details_of_PAYE_Deducted`'s employer rows
  (`PayeDed.ListS = M_Details_of_PAYE_Deducted!$A$3:$G$4`), and
  `A_Basic_Info`'s disability exemption certificate rows
  (`ExemptCerti.ListS = A_Basic_Info!$A$68:$D$69`). The first slot of each
  is `required: true` (or `requiredWhen`-gated on the certificate list's own
  toggle); the second slot of each is fully optional.
- **The Jan-Mar/Apr-Dec sum constraint is disclosed, not encoded.** The
  workbook's own `validateJanDecIncome2020` check requires
  `employmentIncomeJanuaryToMarch + employmentIncomeAprilToDecember` to equal
  `totalEmploymentIncomeAllEmployers` (and similarly for the pension pair).
  The spec's `crossFieldValidation` grammar (`compare`) supports only a
  single field-to-field comparison, not a multi-field arithmetic sum, so
  this constraint is described in the relevant fields' own `description`
  text rather than encoded as a machine-checkable rule — consistent with
  this registry's existing practice for arithmetic constraints the grammar
  cannot express (cf. `fi/vero/50a-earned-income-and-deductions`'s
  documented-but-unencoded constraints).
- **No `documents[]`.** This is an offline Excel data-entry template that
  resolves to an XML upload through iTax; it has no upload/attachment slots
  of its own (supporting documents such as P9 forms are retained by the
  taxpayer for KRA's own audit purposes, not attached within this workbook).
  Zero `documents[]` entries is a disclosed structural fact, per the same
  convention `fi/vero/50a-earned-income-and-deductions` (GOV-2308) already
  established for a zero count on that array.
- **No explicit "taxpayer name" or "country of residence" field exists** on
  `A_Basic_Info` — the sheet only captures the PIN (identity is presumably
  resolved by iTax from the PIN at upload time), and residency is asserted
  by the choice of this specific "Resident Individual Income Tax Return"
  template itself rather than by a separate on-sheet declaration.

## Field inventory

68 `fields[]` entries: 26 from `A_Basic_Info` (return identification, 9
eligibility-routing booleans, the disability exemption certificate toggle
and its bounded 2-row list, and 5 optional bank-detail fields), 19 from
`F_Employment_Income` (2 bounded employer rows of 6 raw-entry fields each
plus 1 computed total each, the sheet-level computed grand total, and 4
required Jan-Mar/Apr-Dec period-split fields), 13 from
`M_Details_of_PAYE_Deducted` (2 bounded employer rows of 5 raw-entry fields
each plus 1 computed field each, and 1 computed sheet-level total), and 10
from `T_Tax_Computation` (2 genuine raw-entry fields — pension contribution
and personal relief — plus 8 computed rollup/output fields through to the
final tax due/refund line). `T_Income_Computation_Self` contributes 0 fields
(see above). 1 `crossFieldValidation` rule (`returnPeriodOrder`, ensuring
`returnPeriodTo >= returnPeriodFrom`).

## Conformance run

A from-scratch, dependency-free interpreter script (not committed — it
walks `fields[]`/`crossFieldValidation[]` directly, evaluating
`required`/`requiredWhen` conditions and each field's `validation` keywords
by `type`) was run against 7 fixtures under
`conformance/ke/kra/it1-individual-resident-return/1.0.0/`:

- `single-employer-minimal-required-only.json` — a single-employer,
  no-other-income, no-disability-certificate, no-bank-details filer.
  **0 errors.**
- `two-employers-with-bank-and-disability-full-coverage.json` — two
  employers, bank details, an amended return, and 2 disability exemption
  certificates declared. **0 errors.**
- `mutation-control-missing-required-field.json` — drops `pin` (required).
  **1 error.**
- `mutation-control-missing-conditional-exemption-certificate-field.json` —
  `hasDisabilityExemptionCertificate: true` but
  `disabilityExemptionCertificateNumber1` omitted (`requiredWhen`
  violation). **1 error.**
- `mutation-control-pin-pattern-violation.json` — `pin` set to an
  all-digit, 11-character string (fails the letter-digit-letter pattern
  while still satisfying `minLength`/`maxLength`, isolating the pattern
  check). **1 error.**
- `mutation-control-type-of-return-enum-violation.json` — `typeOfReturn`
  set to `"revised"` (not in the `["original","amended"]` enum). **1
  error.**
- `mutation-control-return-period-reversed.json` — `returnPeriodFrom`/
  `returnPeriodTo` swapped, violating the `returnPeriodOrder`
  `crossFieldValidation` rule. **1 error.**

`node tools/validate.mjs` and `node tools/validate-ajv.mjs` (JSON Schema
draft 2020-12 meta-schema conformance) both pass clean for
`registry/ke/kra/it1-individual-resident-return/1.0.0/schema.json`, both
individually and as part of a full-registry run.

## Backlog note

Kenya now stands at **3 of 6 verticals** (Business Formation, National ID,
Taxes). Passport, DMV, and Visa remain confirmed dead ends per GOV-2500's
scouting (fully online, login/payment-gated processes with no genuine
unauthenticated specimen). The strongest open companion-schedule candidates
for this same form are: the spousal/joint-filing pathway
(`T_Income_Computation_Wife` and every Wife-suffixed field), the
self-employed/business-income pathway (`B`/`C`/`D`/`E1`/`E2`/`E`,
`T_Income_Computation_Self`'s Business/Farming/Other columns), and the
smaller credit schedules (`N`/`O`/`P`/`Q`/`R`, plus Car Benefit/Mortgage/HOSP/
Insurance Relief/`S_Previous_Years_Losses`) — each disclosed above with the
exact gating condition that would trigger it.
