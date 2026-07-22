# Verification record — al/dpt/individual-annual-income-declaration@1.0.0

## Candidate selection

GOV-4300 ("GovSchema Standard Research"). The GOV-4271 cycle (opening Zambia
as the registry's 77th jurisdiction) had scouted Albania in parallel and banked
it as disclosed, STRONG open backlog for a future new-jurisdiction cycle: the
DPT's "Deklarata Individuale Vjetore e të Ardhurave" (Form D1), described as
"a genuine text-layer, non-fillable printable PDF with ~35-40 numbered boxes
plus its own field-by-field completion guide." DMV, Business Formation, Visa,
Passport, and National ID were all separately confirmed by that same cycle to
route exclusively through the login-gated e-Albania SSO portal or in-person
kiosks, with no statically reachable form document — this cycle re-confirmed
those five verticals remain unauthored backlog, not re-screened from scratch.

## Reaching the live source — a disclosed, non-standard provenance chain

Unlike this registry's usual pattern (a government-hosted PDF fetched
directly, unauthenticated), Form D1 required a more involved chain to reach a
genuine field-by-field specimen, disclosed here in full:

1. `tatime.gov.al`'s own informational pages
   (`/c/3/10/652/deklarata-individuale-vjetore-e-te-ardhurave` and
   `/c/3/10/16/formulari-i-deklarimit`) were fetched directly, unauthenticated
   (HTTP 200, no login/CAPTCHA/WAF gate) — both are prose guidance pages, and
   both state filing is done exclusively through DPT's e-filing portal
   ("Deklarimi bëhet në rrugë elektronike"), with no attached static blank-form
   PDF on either page.
2. Two DPT-hosted PDFs were found and fetched directly from
   `tatime.gov.al/shkarko.php` (`id=11427`, "Deklarimi vjetor individual i të
   ardhurave.pdf", 315,258 bytes; `id=1432`, "Deklarimi individual i të
   ardhurave.pdf", 122,568 bytes) — both HTTP 200, genuine native PDFs
   (`%PDF-1.5` / `%PDF-1.4`), but both are prose explanatory brochures (who
   must file, deductible-expense rules, the employment-tax bracket schedule,
   correction procedure) that reference box numbers (e.g. "kutinë 4", "kutinë
   22") without ever printing the form's own boxes/labels — i.e. guidance
   documents, not the form itself.
3. A search-engine-indexed `tatime.gov.al/shkarko.php?id=8925` link (titled
   "UDHEZIM Nr.5, datë 30.01.2006 PËR TATIMIN MBI TE...", the ministerial
   instruction that originally established Form D1's template) was attempted
   directly this cycle and returned HTTP 200 with **0 bytes** — the specific
   numeric file ID is stale/broken as of this cycle, evidently reassigned or
   removed in a site reorganization since being indexed; not a login/CAPTCHA/
   WAF gate.
4. A complete specimen of the blank Form D1 (all three pages) plus its own
   4-page completion guide was found hosted, unauthenticated, at
   `alprofitconsult.al` (an Albanian tax-advisory firm), fetched directly:
   HTTP 200, `Content-Type: application/pdf`, 844,557 bytes,
   `Last-Modified: Sun, 09 Oct 2022 18:00:31 GMT`, `%PDF-1.5` at byte 0 — a
   genuine native (searchable-text) PDF, confirmed by clean `pdfjs-dist`
   text-layer extraction across all 7 pages. This firm is not a government
   entity; the file is used here as the sourcing basis for this schema's
   field layout because no equivalent static file could be reached directly
   from `tatime.gov.al` itself this cycle (see finding 3 above).

## Cross-corroboration of the specimen against a live government source

Because the specimen is third-party-hosted and dated 2022 (predating
Albania's Law No. 29/2023 "Për tatimin mbi të ardhurat", effective
2024-01-01, which overhauled the personal income tax framework), this cycle
specifically checked whether the specimen's box numbering is still current:

- The `id=11427` PDF — the same government-hosted brochure already disclosed
  in finding 2 above, re-fetched fresh this cycle (2026-07-22, HTTP 200,
  byte-identical at 315,258 bytes) — states in its own prose: the tax withheld
  by an employer is compared against "shënuar në kutinë 4" (the amount noted
  in box 4) and "shënuar në kutinë 22" (the amount noted in box 22) of the
  declaration. Both box numbers match this schema's own `sourceRef`s for box
  4 (excluded, a rate-table computation — see below) and box 22
  (`employmentIncomeTaxWithheld`) exactly, in the specimen's own layout —
  confirmation from a currently-live, government-hosted document that the
  specimen's box numbering has not changed. This is the same file already
  counted in finding 2, not a second, independent source:
  `tatime.gov.al`'s prose guidance pages themselves (cited in finding 1,
  `/c/3/10/652/deklarata-individuale-vjetore-e-te-ardhurave` and
  `/c/3/10/16/formulari-i-deklarimit`) contain zero box-number references
  when re-fetched fresh this cycle.
- Public reporting on Law No. 29/2023's rollout (checked this cycle) states
  that for the 2024 filing year — the first under the new law — "the
  declaration will use the existing model format," corroborating that the
  box layout survived the broader legal overhaul.

This is disclosed as a genuine, non-ideal provenance chain (a private firm's
specimen, corroborated by a directly government-hosted guidance PDF rather
than a byte-identical government-hosted copy of the form itself) rather than
presented as equivalent to this registry's usual direct-government-PDF
sourcing. `status`
remains `draft` and `nextReviewBy` is set to 3 months (rather than this
registry's more typical 6) to reflect the elevated staleness risk.

## Extraction method

Extracted with `pdfjs-dist` (vendored from an existing session scratch
install at `/tmp/node_modules`, CommonJS build at `legacy/build/pdf.js`),
reading each text item's raw string and its `transform` x/y position across
all 7 pages, to resolve cases where the form's own two-column/table layout
causes `pdfjs-dist`'s default reading order to interleave unrelated lines
(e.g. box numbers 22-36 are each printed twice — once inline, once repeated
in a right-margin column — and the marital/household-status checkbox row's
six options wrap one option, "I/E martuar me fëmijë", across two stacked text
lines at the same x-position). Position-based re-extraction confirmed every
box's exact reading order and label text with no ambiguity remaining.

## Document structure

The 3-page form (footer-stamped "Udhëzim Nr. 5, datë 30.01.2006" on every
page) covers, in order: page 1, a top-level "Corrective declaration" checkbox
and Tax Period field, then Section A's residency checkboxes and
identifying-data boxes (1)-(12); page 2, Section A's remaining boxes
(13)-(17) plus a per-page declarant name/date/signature footer, then Section
B's header and gross-income/deductible-expense/computed-tax boxes [3]-[21];
page 3, Section B's tax-already-paid boxes [22]-[36] plus a repeat of the
per-page declarant footer. Pages 4-7 are the form's own printed completion
guide, itself numbered to match the form's boxes, used here to resolve
several fields' required/optional status and box-12/16 ownership-detail
scoping.

## Scope and box-numbering note

Section A uses parenthetical numbering, (1) through (17); the two residency
checkboxes at the top of Section A are themselves printed in bracket style,
[3] and [4] — a genuine numbering collision with Section B's own independent
bracket numbering, [3] through [36], which starts over from 3 for Section B's
gross-income lines. This schema disambiguates the two: Section A's [3]/[4]
become the single field `isResidentInAlbania`; Section B's own [3] onward are
modelled as `employmentIncomeGross` etc., each `sourceRef`-tagged with its own
Section (A or B) to keep the two box-3/box-4 pairs unambiguous.

Models 54 `fields[]` across 7 steps (Declaration Type and Tax Period;
Identifying Data; Additional Individual Data; Gross Income; Deductible
Expenses; Taxes Paid During the Tax Period; Declaration). No `edition` axis is
used: the form's own "Tax Period (year)" is a single blank on an otherwise
undated generic template, matching this registry's existing
`zm/zra/individual-income-tax-return`/`kz/kgd/*`/`ua/dps/*` tax-return
precedent of modelling the filing year as an ordinary data field rather than
a schema edition.

## Disclosed findings and interpretation choices

1. **Box 4 ("Tatimi i llogaritur mbi pagat dhe shpërblimet e punësimit") is
   excluded from `fields[]`**, even though it carries no printed "kutia X +
   kutia Y" formula the way box 15/18/21/34 do. The form's own completion
   guide states this box is computed by the declarant from a progressive
   monthly tax-bracket schedule (0%/13%/23%, printed in the guide itself) and
   then annually summed into one figure — the same class of rate-table
   computation this registry has already excluded elsewhere (e.g.
   `zm/zra/individual-income-tax-return`'s box 9, "Tax on employment income
   Before Tax Credit"), per GSP-0013 §7.
2. **`isCorrectiveDeclaration` is modelled from a single printed checkbox**,
   not a pair: the form prints only "Vendos 'X' në kutinë e duhur nëse nuk po
   dorëzon për herë të parë... KORRIGJUESE" (tick if this is not your first
   submission for this filing period), with no separate "Original" box.
   `true` means the box is ticked (a corrective/amended filing); the absence
   of a printed "Original" counterpart is disclosed rather than a second
   field invented for it.
3. **`isResidentInAlbania` collapses Section A's own two mutually exclusive
   checkboxes** ("[3] REZIDENT NË REPUBLIKËN E SHQIPËRISË" / "[4] JOREZIDENT
   NË REPUBLIKËN E SHQIPËRISË") into one boolean, matching this registry's
   established two-checkbox-to-one-boolean convention (e.g.
   `zm/zra/individual-income-tax-return`'s `isAmendedReturn`).
4. **`declarantStatus`'s six enum options were confirmed via x/y position
   re-extraction**, since one option ("I/E martuar me fëmijë", married with
   children) wraps across two stacked text lines at the same x-coordinate and
   is otherwise interleaved with the other five single-line options in
   `pdfjs-dist`'s default reading order.
5. **Box 12 and box 16's owner name/address fields use different
   `requiredWhen` treatments, disclosed as a deliberate asymmetry**:
   `mainResidenceOwnership` (box 11) is modelled `required: true` (a question
   Section A always asks, unconditionally), so `ownerName`/`ownerAddress`
   (box 12) safely use `requiredWhen { field: mainResidenceOwnership,
   notEquals: "OWNED" }` — the gating field is guaranteed present. Box 15
   ("Të dhëna mbi pronësinë e banesës ku jeton") and box 16's owner
   name/address, by contrast, sit under a section header that only applies
   "NËSE ËSHTË E NDRYSHME" (if different from the identifying address) with
   no printed boolean signal of its own; rather than invent an unprinted
   eligibility gate for an implicitly-conditional section (which this
   registry does do elsewhere, e.g. `zm/dnrpc/passport-application`, but only
   where the form's own notes explicitly name the gating criterion) and then
   need to gate box 16 on box 15 — an optional, possibly-absent field, the
   exact anti-pattern this registry has previously flagged (`notEquals`
   against an optional/absent field) — box 15 and box 16's fields are instead
   all modelled bare-optional with no `requiredWhen`, disclosed here rather
   than silently normalized to match box 11/12's pattern.
6. **Box 17 ("Persona nën kujdestarinë e deklaruesit") is modelled as two
   bare-optional non-negative integers** (`dependentsWithinFamilyCount`,
   `otherDependentsCount`), since the form prints only two blank count cells
   with no further breakdown.
7. **Declaration block (`declarantFullName`/`declarationDate`/
   `declarantSignature`) is modelled `required: true`** even though the form
   prints no explicit "will not be accepted unless signed" disclaimer (unlike
   `zm/zra/individual-income-tax-return`'s equivalent field, which does cite
   such a disclaimer) — disclosed as a standard-practice interpretation for a
   legal declaration's own signature block, not a directly-quoted
   requirement.
8. **Every Section B income/deduction/tax-paid line is modelled
   bare-optional** (`minimum: 0` where applicable, no `minimum` on any field
   that could be negative — none are, unlike `zm/zra`'s `profitLossForYear`),
   since a given taxpayer will not have all income categories in a given
   year; only the declaration block and Section A's core identifying
   questions are `required: true`.
9. **Excluded as official-use-only fields, not applicant-supplied data**: the
   "Numri i Vendosjes së Dokumentit (NVD)" header field, explicitly printed
   "(Vetëm për përdorim zyrtar)" (for official use only); and "Numri Serial",
   which the form's own completion guide states "përdoret nga Drejtoria
   Rajonale Tatimore (organi tatimor)" (used by the regional tax directorate)
   to track the specific document, not a value the taxpayer originates.

## Conformance

3 valid mock scenarios — `valid-resident-single-employer` (a resident,
single-employer individual with only Section A identifying data and the
declaration block populated, no Section B income); `valid-multi-income-and-deductions`
(a resident individual populating a broad mix of Section B gross-income,
deductible-expense, and tax-paid lines, plus a non-owned main residence
exercising box 12's `requiredWhen`); and `valid-corrective-non-resident` (a
non-resident, corrective declaration exercising `isCorrectiveDeclaration` and
`isResidentInAlbania: false`) — plus 9 mutation-control fixtures (one missing
statically-required field from each of `taxPeriodYear`, `isResidentInAlbania`,
`firstName`, `lastName`, `personalIdNumber`, `declarantStatus`,
`declarantFullName`, `declarationDate`, `declarantSignature`) and an
unknown-field-rejected fixture are committed under
`conformance/al/dpt/individual-annual-income-declaration/1.0.0/`.

An ephemeral, from-scratch conformance checker (deriving required/
requiredWhen rules directly from this schema's own `fields[]`, discarded
after use, not committed) ran all 13 fixtures: all 3 valid scenarios at 0
errors, all 9 mutation controls each raising exactly 1 error, the
unknown-field-rejected fixture raising exactly 1 error, and confirmed every
`requiredWhen` field reference resolves to a real field name (0 dangling
references). Validated clean with `node tools/validate.mjs` and
`node tools/validate-ajv.mjs`, individually and as part of the full registry
run.
