# Verification record — `lv/vid/capital-gains-income-declaration-dk-pielikums` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-21`

Derived directly from the regulation's own printed Annex 3 template section
and completion instructions (§§58-61). Not yet cross-checked against VID's
own live EDS (Elektroniskā deklarēšanas sistēma) online-filing screens for
this specific attachment — see "Path to a `verified` claim" below.

## Why this schema and why now (GOV-4202, "GovSchema Standard Research")

The GOV-4169 and GOV-4193 cycles' own re-examination of the remaining LV VID
candidates found the Declaration DK pielikums ("Informācija par darījumiem,
kas uzsākti, bet nav pabeigti vienā taksācijas gadā") structurally distinct
from Declaration DK itself: the regulation's own para. 3 lists Declaration
DK, this pielikums, and the ienākuma precizēšanas deklarācija GD as three
separate documents under the "deklarācija par ienākumu no kapitāla
pieauguma" umbrella, none of them a numbered Form D annex the way
D1/D1¹/D2/D2¹/D4 are. GOV-4193's own VERIFICATION.md accordingly banked this
pielikums as its own top-level schema/track, open backlog. This cycle
authors it as `lv/vid/capital-gains-income-declaration-dk-pielikums`,
closing that banked candidate.

## Reaching the live source

Re-fetched
`https://likumi.lv/ta/id/302688-noteikumi-par-iedzivotaju-ienakuma-nodokla-deklaracijam-un-to-aizpildisanas-kartibu`
directly with a standard desktop Chrome User-Agent: HTTP 200,
`Content-Type: text/html; charset=utf-8`, **365,651 bytes** — the identical
byte count every prior fetch of this same regulation has recorded across
`lv/vid/annual-income-tax-declaration-form-d` (v1.0.0-v1.4.1) and
`lv/vid/capital-gains-income-declaration-dk` (v1.0.0), confirming this cycle
reads the same live regulation text.

## Extraction method

Not a summarizer tool: the raw HTML was searched directly for the paragraph
anchors governing the pielikums (`data-num="58"` through `data-num="61"`)
and, separately, for the rendered template markup itself, located within the
same Annex 3 (`3. pielikums`) block immediately after Declaration DK's own
signature/footer table. The raw `<TABLE>`/`<TR>`/`<TD>` structure was walked
directly (not tag-stripped prose) to recover the exact layout:

- **Title block**: right-aligned bold "Deklarācijas DK pielikums", then
  centered bold "INFORMĀCIJA PAR DARĪJUMIEM, KAS UZSĀKTI, BET NAV PABEIGTI
  VIENĀ TAKSĀCIJAS GADĀ" — confirming this is a titled attachment embedded
  within Annex 3 rather than a separately numbered pielikums (no "4.
  pielikums" marker exists anywhere in the document; a search for every
  `N. pielikum` occurrence in the raw HTML confirms the document defines
  only Annexes 1-3).
- **Identification block**: exactly two fields — "1. Vārds, uzvārds" (name)
  and "2. Personas kods" (personal code, printed as 6 digit boxes + a
  literal dash + 5 digit boxes, the identical layout to Declaration DK's and
  Form D's own personal-code field). Genuine finding: **no tax-year field**
  appears anywhere in this pielikums's own printed header, unlike
  Declaration DK's period block — consistent with §59's statement that the
  pielikums is filed once a year, by 1 June of the year following the tax
  year (an annual-only filing, with no quarterly/monthly variant), so the
  tax year is established by the filing itself rather than a declared
  field.
- **Main table**: a 6-column table (confirmed by the literal `1|2|3|4|5|6`
  header row) with headers "Darījuma uzsākšanas diena", "Darījuma veids*",
  "Darījuma partnera reģistrācijas numurs (fiziskajai personai – personas
  kods)", "Darījuma partnera nosaukums (fiziskajai personai – vārds,
  uzvārds)", "Informācija par darījuma partneri – Latvijas Republikas
  nerezidentu", and "Sagaidāmā ienākuma gūšanas gads, mēnesis" — exactly
  the 6 columns pre-scouted by the GOV-4193 cycle. Exactly **2 blank data
  rows**, with **no `Kopā` (Total) row** — unlike Declaration DK's own two
  tables, this pielikums has no monetary columns to total.
- **Footnote** (`Paskaidrojums. *`): read in full and matched against
  Declaration DK's own footnote 1. Confirmed the pre-scouted finding: this
  footnote's codes are "N – ... A – ... C – ... J – ... M – ... **K –
  ienākums no darījuma ar kriptoaktīviem**" (six base codes, including K for
  crypto-asset income, absent from Declaration DK's own footnote 1) "**Ja
  tiek maksāta rokasnauda vai avanss, darījuma kodam pievieno kodu R.**" —
  only the R modifier is defined here. Declaration DK's own footnote 1
  additionally defines F and L transitional-provisions modifier codes; this
  pielikums's footnote has neither.
- **"Papildu informācija:" block**: a 2-blank-line free-text block,
  confirmed to sit between the main table's footnote and the attestation
  line, matching §61's description of the additional-information carve-out
  for transactions whose income-earning day is deferred to a still-unknown
  future tax period.
- **Attestation and signature block**: the identical attestation statement
  ("Apstiprinu, ka pielikumā sniegtā informācija ir pilnīga un pareiza.")
  and an identically-shaped 24%/12%/35%/6%/24%-width signature table
  (datums / paraksts / tālrunis) to Declaration DK's own footer — confirmed
  this pielikums carries its own complete signature block, separate from
  Declaration DK's, rather than sharing one.
- **Paragraphs 58-61** (`data-num="58"` through `data-num="61"`) were read
  in full and matched to the fields and instructions they govern: §58
  (who must file), §59 (resident vs. nonresident scope, and the annual,
  1-June filing deadline), §60 (the six lettered completion instructions
  60.1-60.5 for columns 1, 3, 4, 5, 6 — column 2's own instruction is
  the footnote itself, not a numbered sub-paragraph), and §61 (the
  deferred-income-day "Papildu informācija" carve-out).

## Disclosed finding: counterparty identifier is a union-typed field

§60.2 states column 3 ("Darījuma partnera reģistrācijas numurs (fiziskajai
personai – personas kods)") holds different data depending on counterparty
type: a resident natural person's personas kods; a nonresident natural
person's personas kods if they have one in their country of residence, or
otherwise their year, month, and date of birth; or a legal person's
registration number. Rather than fabricate a single validation pattern for
what the source itself defines as three different formats,
`transactionEntry{N}CounterpartyIdNumber` is modelled as an unconstrained
string, with the ambiguity stated directly in the field's own description.
This is the same category of disclosed-not-resolved finding this registry
has recorded before (e.g. Declaration DK's own income-type F/R/L modifier
ambiguity).

## Scope boundaries

- **In scope:** the Declaration DK pielikums's own identification fields,
  6-column transaction table (2 entries), "Papildu informācija" block, and
  attestation/signature block, per §§58-61.
- **Out of scope, open backlog:** the ienākuma precizēšanas deklarācija GD
  (annual capital-gains correction declaration, §§62-63) — excluded as a
  formula-derived recomputation, the same reasoning already applied to Form
  D's own Annexes D3/D3¹ and to Declaration DK's own scope boundary.

## Conformance

8 fixtures committed at
`conformance/lv/vid/capital-gains-income-declaration-dk-pielikums/1.0.0/`
(3 valid + 5 mutation controls), covering: required-field omission (name,
personal code), pattern violations (personal code, and a transaction-type
code using the F modifier — deliberately invalid here since, unlike
Declaration DK, this pielikums's footnote defines no F/L modifiers), a
valid two-transaction fixture exercising the K (crypto) code and the R
(earnest-money) modifier together with a nonresident counterparty's
residence-country field, a valid fixture exercising the §61
deferred-income "Papildu informācija" carve-out in place of the expected
income year/month column, and unknown-field rejection.

An ephemeral, from-scratch Python conformance checker (deriving
required/`validation.pattern` rules directly from this schema's own
`fields[]`, discarded after use, not committed) ran all 8 fixtures: all 3
valid fixtures pass with zero errors, and all 5 mutation fixtures fail with
exactly the expected violation.

`node tools/validate.mjs` and `node tools/validate-ajv.mjs` both pass on
`schema.json` individually and as part of the full registry run (579/579),
after regenerating `tools/govschema-client/registry-index.json`.

## Path to a `verified` claim

VID's EDS (Elektroniskā deklarēšanas sistēma) online-filing screens for the
Declaration DK pielikums were not compared field-by-field this cycle (EDS
requires an authenticated Latvian e-identity session, the same access
barrier already recorded against every other EDS-filed LV VID document in
this registry). A future cycle with EDS access could upgrade this to
`verified`.
