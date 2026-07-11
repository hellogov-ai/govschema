# Verification record — no/vegvesen/soknad-om-forerkort-og-kompetansebevis@1.0.0

## Candidate selection

GOV-2330 ("GovSchema Standard Research") is the latest firing of this
registry's recurring standard-research routine. CATALOG.md's own "Known
Gaps & Opportunities" section (item 8) named two open Norway candidates
left over from the GOV-2316 parent cycle after GOV-2323 closed National ID:

- **DMV**: Statens vegvesen's driving-licence application, ~82 widgets
  (pre-scout estimate).
- **Visa**: UDI's form GP7028, ~328 widgets, disclosed by the pre-scout as
  UDI's legacy/paper fallback rather than its primary online-portal path,
  with an open question over whether the paper specimen is still genuinely
  accepted.

The DMV candidate was picked: it is roughly a quarter the size of GP7028,
has no live-portal-vs-paper-fallback question mark, and closing it leaves
Norway at 5 of 6 verticals (only Visa open), mirroring this cycle's own
"prefer deepening an existing jurisdiction's genuine open gap" convention.

## Source

- **URL:**
  `https://www.vegvesen.no/globalassets/forerkort/ta-forerkort/soknad-om-forerkort-og-kompetansebevis-egenerklaering-om-helse.pdf`
- Fetched fresh this session with a plain HTTP GET: **HTTP 200**,
  `223,986` bytes, genuine `%PDF-1.6` header, no login/CAPTCHA/WAF gate.
- **Document:** "Søknad om førerkort og kompetansebevis / Egenerklæring om
  helse" (Application for driving licence and competence certificate /
  Health self-declaration), 2 pages.

## Extraction technique

`pdfjs-dist` v6.1.200 (`legacy/build/pdf.js`, installed fresh to a
disposable `/tmp` directory) was used via `page.getAnnotations()` per page:

- **Page 1: 82 Widget annotations** — all of them. `Tx` text fields for
  the applicant-info block and the foreign-licence/confiscation detail
  rows; `Btn` checkbox fields for the written-form preference, the
  application-type choice, the 23-item licence-class/competence checklist,
  the foreign-licence Ja/Nei pair, and 17 Ja/Nei radio-button pairs (34
  widgets) for the health self-declaration.
- **Page 2: 0 Widget annotations** — entirely informational prose (medical
  certificate requirements by licence class, general application
  guidance), confirmed by a full `page.getTextContent()` read of both
  pages.
- **`doc.getFieldObjects()` cross-check: 65 distinct field names** — the
  82 raw widgets collapse to 65 because each of the 17 health questions
  shares one AcroForm field name across its Ja/Nei radio-button pair
  (`radioButton: true`, distinct `buttonValue`s `"ja"`/`"nei"`), matching
  this cycle's own hand-count of `82 - 17 = 65` exactly.

`page.getTextContent()` output (with each item's x/y transform) was used
to recover the full text of all 17 numbered health questions — the source
PDF's own field names for these are just `"Egenerklæring om helse - N"`,
not the question text itself, so the questions were read directly off the
page and matched to each field by their shared y-coordinate band.

## Field mapping (65 field names → 57 fields, 0 documents[])

1. **Written-form preference** (`ønsket målform - bokmål` /
   `ønsket målform - nynorsk`, 2 Btn widgets) → single `preferredWrittenForm`
   enum field (`bokmal` / `nynorsk`), the same checkbox-pair-to-enum
   collapse this registry has used repeatedly for a form's own single
   either/or choice implemented as independent checkboxes.
2. **Application-type choice** (`Førerkort første gang` / `Utvidelse` /
   `Fornyelse` / `Innbytte av` / `Tilbakelevering` / `Kompetansebevis`, 6
   Btn widgets under the heading "Søknaden gjelder:") → single
   `applicationType` enum field. The form's own heading and single-row
   layout make clear only one applies per submission.
3. **Foreign-licence Ja/Nei pair** (`Ja` / `Nei`, 2 generically-named Btn
   widgets under "Har du et førerkort fra et annet land?") → single
   `hasForeignLicence` boolean, gating three detail fields via
   `visibleWhen`/`requiredWhen`.
4. **Licence-class/competence checklist** (23 Btn widgets: `AM145` through
   `DE`, plus `yrkessjåfør godstransport` / `yrkessjåfør persontransport` /
   `utrykning kode 160`) — kept as **23 independent boolean fields**, one
   per checkbox, rather than collapsed to a single enum or an array. Unlike
   the two choices above, this checklist is genuinely multi-selectable (an
   applicant can request several classes/trailer combinations in one
   application, e.g. B + BE, or C1 + C1E), and this registry's spec
   (`spec/v0.3/govschema.schema.json`, `$defs/field/properties/type`) has
   no `array` field type — confirmed by grepping every `schema.json`
   currently in `registry/` for a `"type": "array"` field, which returns
   zero hits. Independent booleans are therefore this spec's correct
   expression of a multi-select checkbox group, not a workaround.
5. **17 health self-declaration questions** (`Egenerklæring om helse - 1`
   through `- 17`, each a Ja/Nei radio-button pair sharing one field name)
   → 17 independent boolean fields (`healthQuestion1...` through
   `healthQuestion17...`), each `required: true` per the form's own
   instruction ("Les grundig gjennom spørsmålene nedenfor før du besvarer
   spørsmålene" — read through the questions carefully before answering
   them) and `classification: "health"` per GSP-0006.

Every other widget maps one-to-one to a schema field: the 8 applicant-info
text fields, the foreign-licence detail block (3 fields, gated on
`hasForeignLicence`), and the confiscated-licence detail block (3 fields,
gated on `applicationType == return_of_confiscated_licence`).

**0 `documents[]` entries** is a disclosed structural fact, not an
oversight, matching this registry's `fi/vero/50a-earned-income-and-deductions`
precedent: neither page contains a "vedlegg" (attachment) checklist or any
attachment-related field or instruction (confirmed by grepping the full
`getTextContent()` output of both pages for "vedlegg"/"attach", zero
hits). The medical certificates the health-declaration answers may trigger
(described in detail on page 2) are a separate downstream requirement
obtained from a doctor/optician and presented later at the trafikkstasjon,
not an attachment to this form itself.

## Disclosed exclusion

One widget, field name `"Har du et førerkort fra et annet land"` (`Tx`,
rect spanning the full row width `x: 155.0-571.8`, `y: 493.3-507.7`), is
excluded from this schema. Its field name is the *question text itself*
("Do you have a driving licence from another country?"), reused verbatim
as an internal AcroForm field name — but visually it sits as a stray,
full-width text box positioned above the three real answer fields for
that section (`utfyllende opplysninger i feltene til høyre` /
`Utstedt dato` / `Gyldig til`, all at a distinct, lower y-band,
`471.6-485.5`), not aligned with any of the two caption lines
(`"Førerkort for klasse"` / `"Utstedt av (land)"`) it visually overlaps.
No rendering could be produced to confirm what, if anything, this box is
meant to capture beyond what the three real fields already collect (the
same headless-Chromium/`pdfjs-dist`+`node-canvas` rendering gap this
registry's `no/brreg` cycle (GOV-2316) already hit on a different Norwegian
specimen), so it is treated as a forms-authoring artifact — a duplicate or
leftover text layer — rather than guessed at, following this registry's
convention of disclosing rather than silently resolving a genuine ambiguity
(the same treatment `no/brreg`'s stray `Check Box84` widget received).

## Conformance run

Two mock scenarios were authored with valid synthetic (non-real) data and
checked against a disposable checker script evaluating every field's
`required`/`requiredWhen`/`visibleWhen`/`validation` (pattern, enum,
maxLength, date) and both `crossFieldValidation` rules:

- `first-time-car-licence-minimal.json` — a first-time class-B (car)
  applicant, no foreign licence, all 17 health questions answered `false`
  (no conditions declared). **0 errors.**
- `renewal-multi-class-with-foreign-licence.json` — a renewal application
  requesting classes B, BE, and C1 simultaneously, an existing foreign
  licence declared with issue/expiry dates, and two health questions
  (`healthQuestion1VisualAcuity`, `healthQuestion9Diabetes`) answered
  `true`. **0 errors.**

Two mutation controls were also run against the second fixture: (1)
setting `hasForeignLicence: true` while deleting
`foreignLicenceIssuedDate` correctly raised exactly 1 error
(`requiredWhen` violation); (2) setting `foreignLicenceIssuedDate` to a
date after `foreignLicenceValidUntil` correctly raised exactly 1 error
(the `foreignLicenceValidUntilNotBeforeIssuedDate` crossFieldValidation
rule).

Both fixtures also pass `node tools/validate.mjs` and
`node tools/validate-ajv.mjs` (structural + meta-schema conformance) for
the schema document itself; `registry-index.json` was regenerated via
`npm run build-index` and the full registry re-validated with all
documents passing.

## Disclosed judgment calls

- **`foreignLicenceClassAndCountry`** combines two source captions
  ("Førerkort for klasse" and "Utstedt av (land)") that sit stacked over a
  single wide answer widget on the source form into one free-text field,
  rather than splitting them into two, since only one widget exists to
  capture both.
- **`confiscatedToDate` and `foreignLicenceValidUntil`** are left optional
  even when their sibling start-date field is required, since both
  represent an open-ended end date the form does not always require (a
  confiscation or a foreign licence may have no fixed end date).
- **Norway now stands at 5 of 6 verticals** (Passport is a confirmed
  dead-end per the GOV-2316 cycle's own screening; Taxes is confirmed
  fully-digital/pre-filled with no downloadable form). Visa (UDI form
  GP7028) is Norway's only remaining open vertical.
