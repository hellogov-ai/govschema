# Verification record — ba/purs/annual-income-tax-return@1.0.0

## Candidate selection

GOV-4727 ("GovSchema Standard Research"). Bosnia and Herzegovina stood at 2
of 6 verticals (Business Formation, Passport) after GOV-4713/GOV-4720. Both
prior cycles' own disclosed backlog for Republika Srpska (MUP RS's
vehicle-registration/DMV page, the primary in-person passport application,
and the national visa form) had already screened DMV and confirmed the
Ministry of Foreign Affairs' visa form a Schengen-template duplicate; this
cycle re-confirmed both remain a dead end/unscreened rather than re-trying
them (see "Other verticals re-checked this cycle" below), and screened
Taxes and National ID fresh. The Tax Administration of Republika Srpska
(Poreska uprava Republike Srpske, PURS)'s own public forms page
(`poreskaupravars.org/fizicka-lica/obrasci/porez-na-dohodak/?lang=lat`,
HTTP 200) came back strongest: a live, unauthenticated, genuinely fillable
AcroForm PDF with a real `/Widget` annotation layer (this registry's usual
strongest source class), plus an authority-published worked example
resolving the one structurally ambiguous part of the form. Authored.

## Other verticals re-checked this cycle

- **DMV** — `mup.vladars.rs/lat/mup-servisi/registracija-vozila` fetched
  fresh (HTTP 200, 1,037,702 bytes); no `.pdf`/`.doc`/`.docx` link found
  anywhere in the page. Re-confirms GOV-4720's finding: MUP RS publishes no
  downloadable vehicle-registration request form. Left open backlog, not a
  hard dead end (a form may exist off this specific page), but not
  re-attempted this cycle beyond this re-check.
- **National ID** — `mup.vladars.rs/lat/mup-servisi/licna-dokumenta`
  fetched fresh (HTTP 200, 1,024,207 bytes); likewise no downloadable form
  link. Public secondary sources describe the ID-card application
  ("obrazac LK/OI-1") as obtained only in person at a MUP counter, not
  published online as a blank specimen — consistent with the Passport
  vertical's own primary-application finding from GOV-4720. Left open
  backlog.
- **Visa** — not re-screened; GOV-4720 already confirmed the Ministry of
  Foreign Affairs' national visa form a Schengen-template duplicate this
  same cycle-family. Standing dead end.

## Reaching the live source

`poreskaupravars.org`'s forms page
(`https://poreskaupravars.org/fizicka-lica/obrasci/porez-na-dohodak/?lang=lat`,
fetched via `curl -k` — the domain's TLS chain did not verify cleanly
against this session's default CA bundle, unrelated to the form's own
authenticity) lists Form 1004 in three vintages (a bare 2015/2019 flat
scan, a Word/Excel pair, and a "popunjiva" — fillable — PDF). The fillable
PDF was fetched directly:
`https://poreskaupravars.org/dokumenti/obrasci/Obrazac%201004popunjiva.pdf`
(HTTP 200, `Content-Type: application/pdf`, 202,935 bytes, sha256
`c85ec6f7f1cfdfaabafffd495936c3e7964932b644505eed014164e880fd8b0c`,
`Last-Modified: Fri, 18 Mar 2022`, confirming a long-stable specimen).

A companion worked example published on the same site,
`https://www.poreskaupravars.org/dokumenti/uputstva/Primjer_popunjavanja_1004_za_veb_stranicu_29_02_12.pdf`
("Примјер попуњавања Годишње пореске пријаве за порез на доходак — Образац
1004 за 2011. годину", HTTP 200, 395,493 bytes), was fetched and read in
full — both its narrative worked calculation (pages 1-5) and its two
appended filled-specimen pages (pages 6-7, an older form vintage) — solely
to resolve one structurally ambiguous part of the current form (see
Finding 1 below), not as the authored source itself.

## Extraction method

`pdfjs-dist` (`legacy/build/pdf.js`, vendored at `/tmp/node_modules`) for
`getAnnotations()` (form-field enumeration) and `getTextContent()` (label
text and position). `canvas` (same vendor location) rendered the page to
PNG at 2.5x and 6x scale to resolve box layout the meaningless raw field
names alone could not.

`getAnnotations()` returns 106 `/Widget` annotations, but every field name
is a generic auto-generated token (`fill_1`, `fill_2`, ..., `Text2`,
`Text3`, ..., `comb_1`, `comb_4`, `undefined`, `undefined_2`, ...) with no
semantic content — the telltale signature of an automated "flatten a
scanned/printed form into a fillable AcroForm" conversion tool (distinct
from, but in the same family as, this registry's already-documented
non-sequential-reading-order and vector-checkbox PDF-extraction failure
modes; see `gov-form-pdf-extraction`). Every field's real meaning was
recovered by rendering the page visually and correlating each widget's
`rect` (x/y position) against the nearest printed label read from
`getTextContent()`'s item positions, not from the field names themselves.

## Document structure

A single page. Header: Republika Srpska / Ministry of Finance / Tax
Administration letterhead, form number and title, and a barcode box.
**Одјељак 1 – Подаци о пореском обвезнику** (Section 1, taxpayer data):
JMB/JIB (13-box comb), filing type (Основна/Измијењена checkboxes) with a
conditional barcode-of-original-filing box, municipality code (3-box
comb), full name, address, phone, email, and a two-row "Порески период"
(tax period) box block — see Finding 1. **Одјељак 2 - Доходак** (Section
2, income): a 14-column x 7-row table (6 income-category rows plus a
УКУПНО/total row), columns Општина/Приход/Расход/Доходак/Умањење пореске
основице/Пренесени губитак/Основица за порез/Обрачунат/Уплаћен/Порески
кредит/Разлика/Доходак послије опорезивања — see Finding 2 for column 8's
row-conditional shading. Below the table: a "Напомена" (note, static text)
and two refund-preference lines — see Finding 3. **Овјера** (certification):
a taxpayer-side block (declaration text, authorized-person name + date,
preparer name, two signature lines — signatures excluded, not modelable)
and a Tax Administration-side block (received date, officer name, refund
decision, official stamp) — the latter entirely authority/officer-populated
and excluded from this schema, consistent with this registry's established
convention (e.g. `ba/apif`'s own excluded "Попуњава АПИФ" block).

## Disclosed findings and interpretation choices

1. **`taxPeriodFrom`/`taxPeriodTo` semantics were resolved from a
   companion worked example, not the blank form alone.** The current
   form's "8) Порески период:" prints two stacked rows of unlabelled boxes
   (a 2-box group, a second 2-box group, then a third group rendered as a
   single undivided box, per row) with no "Од"/"До" or "ДД"/"ММ"/"ГГГГ"
   captions anywhere near them. The Tax Administration's own worked
   example for this same form (`Primjer_popunjavanja_1004...pdf`, an older
   form vintage sharing this exact header layout) shows the identical box
   group filled in as "Од: 01/01/20 1 1" / "До: 31/12/20 1 1" — confirming
   (a) the upper row is the period start and the lower row the period
   end, (b) each is a day/month/year date with the "20" century prefix
   pre-printed on the form itself (not a fillable box) and only the last
   two year digits taxpayer-entered, and (c) the third, visually-undivided
   box is a single two-character comb field for those two year digits,
   not one single-digit box. Modelled as two full ISO `date` fields
   (`taxPeriodFrom`, `taxPeriodTo`) with the 21st-century assumption
   disclosed here rather than silently baked in.
2. **`selfEmploymentIncomeCarriedLoss` is the only field modelled for
   column 8 ("Пренесени губитак за умањење пореске основице")** — visually
   confirmed by rendering the table at 2.5x scale: column 8's cell is
   filled solid grey (blocked) for every row except row 5 (Доходак од
   самосталне дјелатности, self-employment income). A loss carryforward
   against the tax base applies only to self-employment income under
   Republika Srpska's income tax law; the other five income-type rows and
   the УКУПНО/total row have no fillable box in this column at all, so no
   corresponding field is modelled for them (matching this registry's
   established convention of not fabricating an input the source itself
   structurally disallows).
3. **`refundPaymentAccountNumber` and `overpaymentAsAdvanceCreditNote` each
   collapse two raw PDF widgets into one field.** Both refund-preference
   lines below the income table ("Молим да ми се износ ... уплати на
   рачун" and "Износ више плаћеног пореза ħу користити као аконтацију...")
   are followed by two adjacent text-type (not checkbox-type) form
   widgets with no distinguishing sub-label between them — consistent with
   this whole document's auto-converted, semantically-empty field-naming
   pattern (see "Extraction method" above) rather than a deliberate
   two-part value. Modelled as one free-text field per line, matching the
   line's own printed label; the exact internal split the original PDF
   widgets intended is not recoverable from this source and is disclosed
   here rather than guessed at a finer grain.
4. **`taxpayerId`, `municipalityCode`, `refundPaymentAccountNumber`, and
   `overpaymentAsAdvanceCreditNote` are modelled without an exact
   digit-count pattern**, matching this registry's own precedent on the
   same judgment
   (`ba/apif/business-entity-classification-application`'s Findings 7-8)
   — the printed comb-box counts are a specific paper form's layout
   choice, not a length the underlying identifier/value is otherwise
   documented to require.
5. **The Tax Administration's own certification block ("Овјера Пореске
   управе") is entirely excluded** — every field in it (date received,
   officer name, processing officer, processing date, refund
   approved/not-approved, official stamp) is authority-populated, not
   taxpayer-entered, matching this registry's established exclusion
   pattern for officer/authority-only sections.
6. **`municipality` per income-category row (column 3) is modelled
   separately per row**, not reused from the header's `municipalityCode`
   — the table's own column exists specifically because different income
   categories (e.g. employment income vs. a rental property) can arise in
   different municipalities within the same tax year.

## Conformance

2 valid scenarios — `valid-single-income-source-basic-filing` (a taxpayer
with personal-earnings income only, a basic filing, exercising every
unconditionally-optional field's absent case and the
`amendedFilingBarcode` `requiredWhen` gate in its required-false branch)
and `valid-multi-income-source-amended-filing` (personal earnings, capital
income, and self-employment income with a carried-forward loss, an
amended filing supplying the original filing's barcode, exercising the
`requiredWhen` gate's required-true branch and `selfEmploymentIncomeCarriedLoss`)
— plus 9 static-`required`-field mutation fixtures (one per top-level
`required: true` field), 1 `requiredWhen`-gate mutation fixture
(`mutation-missing-amendedfilingbarcode-requiredwhen-amended`), and 1
unknown-field-rejected fixture, committed under
`conformance/ba/purs/annual-income-tax-return/1.0.0/`.

An ephemeral, from-scratch conformance checker (deriving required/
requiredWhen rules directly from this schema's own `fields[]`, discarded
after use, not committed) ran all 13 fixtures: both valid scenarios at 0
errors, all 10 mutation controls each raising exactly 1 error, and the
unknown-field fixture correctly rejected. Validated clean with
`node tools/validate.mjs` and `node tools/validate-ajv.mjs`, individually
and as part of the full registry run (653/653). `registry-index.json`
regenerated via `npm run build-index` in `tools/govschema-client/`.
