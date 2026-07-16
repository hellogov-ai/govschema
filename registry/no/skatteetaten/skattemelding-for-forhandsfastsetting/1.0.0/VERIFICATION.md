# Verification record — no/skatteetaten/skattemelding-for-forhandsfastsetting@1.0.0

## Candidate selection

GOV-3288 ("GovSchema Standard Research") is the latest firing of this
registry's recurring standard-research routine. CATALOG.md's "By
Jurisdiction" table showed Norway at 4/6 (Passport and Taxes open). Four
parallel scouting agents were dispatched this cycle across ~30 open
jurisdiction/vertical gaps; Norway's Taxes gap came back as the strongest,
cleanest candidate of the batch:

- **NO Passport**: re-confirmed a dead end. `politiet.no`'s passport
  application flow is a 100% in-person appointment/biometric process; a
  fresh HTML grep for `.pdf` links across the booking flow found none.
- **NO Taxes**: Skatteetaten's ordinary pre-filled `skattemelding` is filed
  exclusively through the BankID/ID-porten-gated online service, but
  Skatteetaten separately publishes, unauthenticated, a paper fallback for
  (a) forhåndsfastsetting requests and (b) privatpersoner who have not
  received their pre-filled return by 7 April — a live, no-login,
  no-CAPTCHA PDF.

A second candidate surfaced by the same research pass — Slovakia's
`002-ziadost-o-narodne-vizum-SK.pdf` ("national visa") — was independently
re-checked and rejected before authoring: fetched both the national-visa
and Schengen-visa PDFs from the same MZV SR document folder (via a Wayback
Machine mirror, since live `mzv.sk` sits behind a Cloudflare challenge) and
extracted both with `pdfjs-dist`. The two are a field-for-field match — same
33-item EU harmonized questionnaire, same checkboxes, same VIS/Schengen
Borders Code prose in the declaration section — differing only in title.
This is the same "national visa form reuses the EU harmonized Schengen
template" pattern this registry has already found and declined for Czechia,
Portugal, and Poland (see CATALOG.md's "Confirmed dead ends" section); it is
recorded there as a fresh confirmation, not authored as a new schema.

## Source

- **URL:** `https://www.skatteetaten.no/globalassets/skjema/alltid/ikke-forhandsutfylt-skattemelding.pdf`
- Fetched fresh this session with a plain HTTP GET (realistic browser
  `User-Agent`, no cookies/session): **HTTP 200**, `733,378` bytes, genuine
  `%PDF-1.4` header, no login/CAPTCHA/WAF gate. Re-fetched a second time
  independently; both downloads share **sha256
  `f21f20dc81095119e0d83981d0c7e85a068ad8b09aa61c3431aff48210c38bdc`**,
  confirming the source is stable and not dynamically varied per-request.
- The form carries no printed edition code/date (unlike this jurisdiction's
  `notification-of-move-within-norway` RF-1400B sibling, which prints
  "RF1400B - 2019" in its footer); it is Skatteetaten's current live
  download as of this cycle, cited by its own on-page title rather than a
  form number.

## Extraction technique

`pdfjs-dist` v3.11.174 (`legacy/build/pdf.js`, from a disposable `/tmp`
install) was used two ways:

1. **`page.getTextContent()` per page** — recovered every section heading,
   column label, and the full guidance/Veiledning prose on page 3, read in
   full to confirm which content is applicant-entered vs. purely
   informational.
2. **`page.getAnnotations()` per page** — **0 Widget annotations across all
   3 pages.** This is a flat, non-interactive print-and-fill specimen, not
   an AcroForm — confirmed structurally, not just by visual inspection.
3. **Rendered to PNG at 2x scale via `node-canvas`** (`page.render()` into a
   canvas, then `canvas.toBuffer('image/png')`) for all 3 pages, then
   visually inspected. This was necessary because the flat PDF's extracted
   text alone does not reveal table *structure* (column boundaries, how many
   blank rows a repeating table actually prints) — only the rendered image
   shows, for example, that "Lønn mv" prints exactly 3 blank rows under its
   3 column headers, not an open-ended table.

## Field mapping (fields[] only; no documents[] — the form requests no
attachments)

115 fields, organized by the form's own section headings, in this order:

1. **Den skattepliktige** (5 fields) — taxpayer name, fødselsnummer/
   D-nummer, address, email, phone.
2. **Skattemeldingen gjelder for** (3 fields) — `taxYear` (integer),
   `submissionReason` (`enum`: Dødsbo / Utenlandsk arbeidstaker / Annet,
   matching the form's own three radio options exactly), and
   `requiresAdvanceAssessment` (boolean, the Ja/Nei "Krever
   forhåndsfastsetting" choice).
3. **Om utenlandsk arbeidstaker** (7 fields) — gated with `visibleWhen`
   `submissionReason equals "Utenlandsk arbeidstaker"`, since the section's
   own heading and the page-3 guidance text ("Utenlandsk arbeidstaker med
   midlertidig arbeidsopphold i Norge — Merk at du kun kan kreve
   forhåndsfastsetting hvis du...") tie it explicitly to that submission
   reason. `foreignWorkerDaysAtSeaOrShelf` additionally carries
   `requiredWhen` `foreignWorkerWorkedAtSeaOrShelf equals true` (and the same
   `visibleWhen`, for consistency with its sibling fields in the same
   block) — a real conditional dependency between two boxes on the form
   itself (the day-count box has no header of its own and only makes sense
   once "Arbeidet på sjø/sokkel" is answered Ja).
4. **Lønn mv** (9 fields) — a 3-column, 3-row wages table, modelled as
   `wage1Employer`/`wage1Period`/`wage1Amount` through `wage3...`, following
   this registry's established bounded-repeating-group convention (e.g.
   `dk/cpr/notification-of-entry`'s `entrantN...`). All rows — including row
   1 — are `required: false`: unlike `dk/cpr`'s "always reporting at least
   one person" premise, a taxpayer filing this form for capital income
   alone could have zero wage rows to report.
5. **Pensjon** (15 fields) — 5-column, 3-row table (`pension1Payer`/
   `pension1Amount`/`pension1Type`/`pension1Grade`/`pension1Period` ×3), same
   convention, all optional.
6. **Minstefradrag / Reiseutgifter / Merkostnader** (3 fields) —
   `claimsMinimumDeduction` (boolean; the form notes the deduction amount
   itself "beregnes automatisk," so only the claim checkbox is an
   applicant-entered field), `travelExpenses`, `commuterAccommodationExpenses`.
7. **Andre fradrag knyttet til arbeid/øvrige fradrag** (6 fields) — 2-column,
   3-row table, same convention.
8. **Næringsinntekt** (4 fields) — `businessType`/`businessIncome`/
   `businessCosts`/`businessNetIncome`. Unlike every other table on this
   form, the rendered image shows only **one** row of cells under this
   section's two-column header (no 3-row grid) — modelled as a single
   non-repeating entry, not `businessN...`, since there is no second/third
   row printed on the source to justify a bounded-3 pattern here.
9. **Bank** (9 fields) — 3-column, 3-row table (`bank1Name`/
   `bank1DepositsOrDebt`/`bank1InterestIncomeOrExpense` ×3).
10. **Finans** (15 fields) — 5-column, 3-row table (`financial1Description`/
    `...ValueAtYearEnd`/`...GainDuringYear`/`...LossDuringYear`/
    `...DividendDuringYear` ×3).
11. **Eiendom** (21 fields) — 7-column, 3-row table (`property1AddressInfo`/
    `KNr`/`GNr`/`BNr`/`SNrFNr`/`Type`/`WealthValueShare` ×3). `K.nr.`/`G.nr.`/
    `B.nr.`/`S.nr. / F.nr.` are the four components of the Norwegian
    matrikkel (cadastre) property identifier (kommunenummer/gårdsnummer/
    bruksnummer/seksjonsnummer-or-festenummer); modelled as short strings
    rather than tightly-patterned integers, since the flat print form gives
    no ruled/boxed digit count to infer a precise length or numeric-only
    constraint from (unlike an AcroForm widget's `maxLen`), and a
    festenummer in particular is not guaranteed to be purely numeric.
12. **Annen formue** (6 fields) and 13. **Andre inntekter** (6 fields) —
    both 2-column, 3-row tables, same convention.
14. **Innsendt av** (5 fields) — mirrors "Den skattepliktige"'s 5 fields
    exactly (name/fødselsnummer/address/email/phone), for the case where
    someone other than the taxpayer files (e.g. an heir filing for a
    dødsbo). All optional, since the section is blank whenever the taxpayer
    files their own return.
15. **Signatur** (1 field) — `signatureDate` only. The signature line itself
    has no fillable widget on this flat PDF (consistent with every other
    flat/non-AcroForm specimen already in this registry, e.g. the EU
    harmonized visa forms); no field models the wet-ink signature.

Every field's `sourceRef` cites its exact section heading and column label
as printed on the form, in the applicant-facing language (Norwegian) the
form itself uses, matching this registry's convention of quoting the
source's own printed text rather than a translated paraphrase.

## Conformance run

Two valid scenarios plus six single-violation mutation-control fixtures were
authored with synthetic (non-real) data and checked against a disposable
from-scratch checker script
(`/tmp/no-tax-gen/checker.mjs`, not reused from any prior cycle) that
evaluates every field's `required`/`requiredWhen`/`visibleWhen`/
`validation` (`pattern`, `enum`, `minimum`/`maximum`, `minLength`/
`maxLength`):

- `foreign-worker-sea-shelf-valid.json` — a foreign worker requesting
  advance assessment, working at sea/shelf with the day-count filled in
  (exercises the `requiredWhen` path positively). **0 errors.**
- `privatperson-full-income-picture-valid.json` — an ordinary privatperson
  filing (not a foreign worker, so the foreign-worker block is correctly
  absent/not visible), with at least one entry in every repeating table
  (wages, pension, bank, financial, property, other assets, other income)
  plus business income and a submitter block. **0 errors.**
- `invalid-missing-taxpayer-name.json` — drops the unconditionally-required
  `taxpayerFullName`. **1 error.**
- `invalid-missing-tax-year.json` — drops the unconditionally-required
  `taxYear`. **1 error.**
- `invalid-malformed-national-id.json` — `taxpayerNationalId` set to a
  6-digit string, violating the 11-digit `pattern`. **1 error.**
- `invalid-submission-reason-enum.json` — `submissionReason` set to
  `"Ferie"`, not one of the form's three printed options. **1 error.**
- `invalid-malformed-email.json` — `taxpayerEmail` set to a string with no
  `@`. **1 error.**
- `invalid-sea-shelf-requiredwhen-violation.json` — starts from the
  sea/shelf-valid fixture and drops `foreignWorkerDaysAtSeaOrShelf`, while
  `foreignWorkerWorkedAtSeaOrShelf` stays `true` — exercises the
  `requiredWhen` path negatively. **1 error** (`foreignWorkerDaysAtSeaOrShelf:
  required but missing`), confirming the conditional-requiredness logic is
  correctly enforced, not silently skipped.

All eight fixtures produced exactly the error count listed above — no
false positives on the two valid fixtures, no false negatives (more than
the intended 1 error) on any mutation-control fixture. Both
`node tools/validate.mjs` and `node tools/validate-ajv.mjs` also pass for
the schema document itself; `registry-index.json` was regenerated via
`npm run build-index` and the full registry re-validated at 501/501
documents passing (up from 500 before this addition).

## Disclosed judgment calls

- **No `documents[]` entries.** Unlike this jurisdiction's
  `notification-of-move-within-norway` sibling (which requires an
  identification copy), this form's own text requests no attachment —
  Skatteetaten's guidance describes it as a self-contained paper
  submission, so `documents` is correctly absent rather than an empty
  array-with-nothing-to-say.
- **Bounded-3 repeating groups** for every table except Næringsinntekt are
  inferred from the rendered image's visible row count (3 blank rows under
  every column header), not from any printed instruction stating a maximum;
  the form gives no indication of what to do if a taxpayer has a 4th
  employer or bank account. This is disclosed here rather than invented as
  a stated cap, following this registry's "spec precision over cleverness"
  convention of not asserting a constraint the source does not actually
  state.
- **Matrikkel identifier fields** (`KNr`/`GNr`/`BNr`/`SNrFNr`) are modelled
  as short free-text strings rather than integers or a tightly-derived
  digit-count pattern, for the reason given in the field-mapping section
  above (no ruled boxes to measure on a flat, non-AcroForm PDF).
- **`fødselsnummer`/`D-nummer` pattern** (`^[0-9]{11}$`) follows this
  registry's existing Norwegian precedent
  (`no/skatteetaten/notification-of-move-within-norway`), even though a
  D-nummer is structurally a fødselsnummer with the first digit offset by
  4 — both share the same 11-digit printed format the form itself asks for,
  and the form's own label ("Fødselsnummer/D-nummer") treats them as one
  field, not two.
- **`taxYear` bounds** (`2000`–`2100`) are a deliberately generous sanity
  range, not a source-stated constraint (the form prints a blank "Årstall"
  box with no printed range), consistent with this registry's convention of
  using wide, clearly-labeled-as-generic bounds when the source itself does
  not state one.
