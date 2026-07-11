# Verification record — dk/erst/virksomhedsregistrering@1.0.0

## Candidate selection

This session's brief (GOV-2268, "GovSchema Standard Research") targeted
Denmark's Business Formation vertical, the only one of Denmark's 6
verticals still open (Passport opened Denmark as the registry's 33rd
jurisdiction via GOV-2244; Taxes via GOV-2253; National ID & Civic
Documents via GOV-2260, 3/6 at the start of this cycle). GOV-2260's own
screening pass had already evaluated all three of Denmark's remaining
open verticals in parallel and identified virk.dk's form 40.110
("Virksomhedsregistrering") as a genuine unauthenticated AcroForm for
foreign-business registration without a Danish CVR number/MitID login,
setting it aside as the strongest Business Formation candidate while
picking a different form for that cycle's own National ID target. This
cycle picked up 40.110 directly, rather than re-screening: Denmark's
other two open verticals at that point (Visa via SIRI's `nyidanmark.dk`
work-permit form AR8 — genuine and unauthenticated but a fill-by-hand PDF
with no AcroForm widget layer; DMV via Færdselsstyrelsen's P23 — a shared
multi-party licence record card, 397 raw fields, mostly filled
progressively by driving schools/police/kommune) had already been
confirmed weaker candidates in that same GOV-2260 screening pass, and
Business Formation was the deliberate target of this issue.

## Source

- **URL:** `https://virk.dk/assets/7cC2xGkV8DgTbAW9pxeZVv/40110.pdf`
- Fetched fresh this session with a plain HTTP GET: **HTTP 200**,
  `642,622` bytes — matching the pre-scout's byte count exactly,
  independently re-confirmed rather than assumed. Confirmed a genuine PDF
  (`%PDF-1.7` header) with 5 pages and a live `/AcroForm` dictionary (a
  genuine, non-flattened fillable form, not a flattened print specimen).
- **Edition:** the form's own footer prints "04.2021" on every page
  (April 2021 edition); no more recent edition was found linked from
  either of Erhvervsstyrelsen's own guidance pages.
- **Guidance/landing pages** (read for context, not for field
  extraction — this form is entirely self-documenting via its own
  printed Rubrik numbering, like `dk/skattestyrelsen/oplysningsskemaet`):
  `virk.dk/myndigheder/stat/ERST/selvbetjening/Registrering_af_udenlandsk_virksomhed_-_start_-_40110/`
  and its `vejledning-til-registrering-udenlandsk-virksomhed/` sub-page.
- **Cross-check:** form 40.112, Erhvervsstyrelsen's own official
  English-language translation of this same form, linked from the same
  guidance page ("Blanketten findes på engelsk her"), was used to confirm
  the meaning of ambiguous Danish labels (e.g. "hjemting", "Ledelsens
  sæde", "Anden ID (oplys type)").

## Extraction technique

`pdfjs-dist` (`legacy/build/pdf.js`, loaded from a cached `node_modules`
install at `/tmp/node_modules`) was used for the same three-pass technique
established by `dk/skattestyrelsen/oplysningsskemaet`'s own VERIFICATION.md,
not a single pass:

1. **`doc.getFieldObjects()`** — resolved **122 distinct field names**
   across the document's 5 pages: 97 `Tx` text fields, 15 `Btn` radio
   groups (41 total mutually-exclusive kid widgets across the 15
   groups), and 10 independent `Btn` checkboxes. This count was derived
   fresh this session, not copied from the pre-scout's own "~122 unique
   field base names" estimate — it happens to match exactly, which is a
   reproduction, not an assumption.
2. **`page.getAnnotations()` per page** — captured every widget's own
   rect, `alternativeText` tooltip, field type, and (for `Btn` widgets)
   `buttonValue`/export value. Total raw widgets per page: 25 (page 1),
   30 (page 2), 41 (page 3), 43 (page 4), 9 (page 5) = **148 widgets**,
   matching the pre-scout's own "~148 widget fields" estimate —
   independently reproduced, not assumed.
3. **`page.getTextContent()` clustered into visual lines by y-coordinate**
   (2.5pt tolerance, then x-sorted within each line) — reconstructed the
   full Rubrik-by-Rubrik printed text for all 5 pages, independent of any
   AcroForm metadata.
4. **Cross-reference: every widget's rect x/y range checked against the
   clustered lines and against neighbouring widgets' rects**, not the
   field-name sequence or the tooltip text alone. This distrust was
   necessary, not precautionary: this specimen contains two disclosed
   tooltip-copy-paste artifacts (below) that a name/tooltip-only mapping
   would have silently mis-attributed.

## Disclosed specimen quirks (position-mapped against a misleading tooltip)

1. **Page 3, Rubrik 10, EU-VAT-number repeating block.** The block
   "Momsnumre, der ønskes tilføjet til et dansk EORI-nummer" prints two
   country-code/VAT-number column pairs per row across 2 rows (4 slots
   total). The third slot's country-code widget — positioned directly
   below the first two slots' own country-code column, at an identical
   x-range (`x 48.8–89.8`) — carries the `alternativeText` `"Husk at
   udfylde og medsende bilaget \"Hæftende Repræsentant\""`, a tooltip
   that is verbatim identical to an unrelated instructional note printed
   elsewhere on the very same page (just above the "Har virksomheden et
   fast forretningssted i Danmark?" customs question). This is a
   copy-paste tooltip artifact, not a real description of this widget's
   purpose. Modelled here as `euVatCountryCode3` by rect position (column
   alignment with the two widgets above it and the `Momsnummer 2` widget
   beside it at the same y-range), not by its tooltip text.
2. **Page 4, Rubrik 11, "Årsag til skattepligt til Danmark".** A
   free-text widget positioned at the row for the "Andet, angiv årsag"
   ("Other, state reason") checkbox carries the `alternativeText`
   `"Ledelsens sæde er i Danmark"` — identical wording to a *different*
   checkbox's own label two rows above it (`Check Box345`, this schema's
   `taxLiabilityManagementSeatInDenmark`). Confirmed by reading the raw
   text-item stream at both y-ranges directly: the genuine printed label
   at the free-text widget's own row is "Andet, angiv årsag", and the
   widget's tooltip does not match it — another copy-paste artifact.
   Modelled here as `taxLiabilityOtherReasonText` (paired with
   `taxLiabilityOtherReasonApplicable`, the actual "Andet, angiv årsag"
   checkbox), by rect position, not by the widget's own tooltip text.

Both quirks are disclosed in the affected fields' own `description` and
`sourceRef` in `schema.json`, not silently corrected or silently
followed.

## Structural exclusions

1. **Rubrik 7, "Forsendelsesadresse i Danmark"** is printed with its own
   disclosed annotation, "(Rubrikken er ikke længere relevant.)" ("this
   field is no longer relevant"), directly under its heading on page 2.
   Walking every widget rect on page 2 confirmed **zero** AcroForm
   widgets fall in Rubrik 7's row — a hard structural fact, the same kind
   of finding as the "Felt låst" pattern in
   `dk/skattestyrelsen/oplysningsskemaet`, though the disclosure mechanism
   here is a deprecation note rather than a lock label.
2. **Two page-4 heading-echo `Tx` widgets** (`fieldName`s `"Lønsumsafgift"`
   and `"kun for taxivognmænd finansielle virksomheder læger mv"`) sit at
   an x-start identical, character-for-character, to the Rubrik 12
   section heading's own two printed text runs, 13-15pt directly below
   them, with `alternativeText` that is simply the heading text itself
   ("Lønsumsafgift" / "(kun for taxivognmænd, finansielle virksomheder,
   læger mv.)"). Confirmed by reading the raw text-item stream at the
   heading's own y-position (426.6) and comparing x-starts against both
   widgets (52.8 and 133.6 respectively — an exact match to both text
   runs). Asking an applicant to type "Lønsumsafgift" into a box collects
   no information; these two widgets are excluded as a heading echoed
   into a fillable-looking widget, not applicant input — a clear but
   structurally softer finding than Rubrik 7's "zero widgets at all".
3. **One page-3 checkbox, "Check Box328"**, sits immediately left of the
   optional "Angiv evt. årsag til momsregistrering (se vejledning)"
   free-text box. It carries no `alternativeText` and no other printed
   label disambiguates its position (unlike every other checkbox on this
   specimen, which either sits directly beside its own label or is part
   of a `Group3XX` radio whose kids are individually positioned against a
   printed option). Its purpose could not be determined from the
   specimen alone and it is excluded rather than guessed at.
4. Per the task's own reminder to check for a "filled in by
   [government office]" disclosed section on every extracted page: no
   such heading was found anywhere on this specimen's 5 pages (unlike
   `dk/cpr/notification-of-entry`'s "udfyldes af kommunen" section). This
   form is entirely applicant-facing once submitted to Erhvervsstyrelsen;
   there is no municipal in-person processing step analogous to CPR
   registration.

## Date-split convention (8 instances)

Eight rows on this specimen print a date as three separate boxes labelled
"DD MM ÅÅ" (owner's Fødselsdato; VAT start date; customs start date;
corporate-tax-liability start date; first-accounting-period start and end
dates; payroll-tax start date; first-employee-hire date). Each was
combined into a single schema field of `type: "date"`, per this
registry's existing `dk/cpr/notification-of-entry` precedent (which
combines FR 050's "Dag / måned / år" split into one date field), rather
than modelled as three separate fields. The printed year box is genuinely
only two digits ("ÅÅ", not "ÅÅÅÅ") on every one of these eight instances —
confirmed by reading the raw text-item stream at each date row (e.g. page
2: `"DD" 485.0 536.8`, `"MM" 512.3 536.8`, `"ÅÅ" 539.1 536.8`), not assumed
to be a display abbreviation for a 4-digit box. Each combined field's own
`description`/`sourceRef` discloses the specimen's three-box split rather
than silently modelling a plain 4-digit-year date field.

## Scope decision: Rubrik 9-13 modelled as optional despite printed asterisks

Rubrik 1 (Virksomhedstype/registered-in-home-country), 2 (home-country
identity), 5 (owner), 6 (home-country contact person), 8 (industry), and
15 (signature) are unconditionally required on this specimen and modelled
as `required: true`. Rubrik 3/4/16 (the Danish-business-address,
Danish-contact-person, and Danish-contact-person-signature blocks) are
conditionally required and modelled with `requiredWhen` against the
Rubrik-1 registration-type radio (`businessType`), gated on `equals`
against a required enum field (never on `notEquals ""` against an
optional field — the known bug pattern from this registry's own
`notequals-empty-string-absent-field-bug` precedent).

Rubrik 9 (Moms/VAT), 10 (Toldregistrering/customs+EORI), 11 (corporate tax
liability), 12 (Lønsumsafgift/payroll tax), and 13 (Ansatte/employees)
each carry their own printed asterisks on individual rows, but these
Rubrikker are themselves conditional on real-world facts the form has no
single gating checkbox for — whether the business needs Danish VAT/
customs/employee registration at all, which not every foreign business
does (Rubrik 12's own heading states outright it applies "kun for
taxivognmænd, finansielle virksomheder, læger mv." — "only for taxi
operators, financial businesses, doctors, etc."). This schema therefore
models every field in Rubrik 9-13 as `required: false`. This is a
deliberate editorial scope decision, disclosed here and in `schema.json`'s
own `verification.notes`, distinct from the hard "no widget exists" and
"heading echo" structural exclusions above.

## Bounded repeating groups

Two bounded repeating groups were flattened per this registry's
`entrant1..entrant6` / `child1..child5` convention:

- **EU-country/VAT-number pair** (Rubrik 10, "Momsnumre, der ønskes
  tilføjet til et dansk EORI-nummer"): the specimen prints exactly 4
  slots (2 rows × 2 column-pairs), confirmed exhaustively by rect-mapping
  all 8 widgets (`Landekode_4`/`Momsnummer 1`, `Landekode 1`/`Momsnummer
  1_2`, the mislabeled slot-3 widget/`Momsnummer 2`, `Landekode
  2`/`Momsnummer 2_2`). Flattened to `euVatCountryCode1`/`euVatNumber1`
  through `euVatCountryCode4`/`euVatNumber4`. Unlike the `entrant1`/
  `child1` precedent, **none** of these 8 fields are marked `required`,
  including slot 1 — the block itself carries no printed asterisk and is
  a genuinely optional addendum (linking additional VAT numbers to a
  Danish EORI number), not a mandatory repeating list like FR 050's
  entrants or the Swedish work-permit form's dependants. This is a
  deliberate deviation from the task's own default assumption ("only slot
  1 fields should be required"), disclosed here rather than silently
  applied.
- **Owner/authorized-signatory signature** (Rubrik 15, "Underskrift(er)*
  Ejer(e)s/tegningsberettigedes underskrift(er)"): the specimen prints 3
  repeated Dato/Navn-med-blokbogstaver row pairs (the third column,
  "Underskrift", has no AcroForm widget on any row — a physical wet-ink
  signature is not captured as form-fillable text, consistent with how
  this registry's other DK schemas model signature blocks). Flattened to
  `signatoryDate1`/`signatoryName1` (required, since Rubrik 15 itself
  carries an unconditional asterisk) through `signatoryDate3`/
  `signatoryName3` (optional, slots 2-3).

## Field-by-field source mapping

All 104 fields cite their exact Rubrik number and printed label directly
in `sourceRef` — see `schema.json`. Every citation was read from the
clustered-line text and widget rects extracted directly from the live PDF
this session, not copied from any secondary source.

## Mock conformance test run

Two scenarios were built under
`conformance/dk/erst/virksomhedsregistrering/1.0.0/` and checked against
this schema's `required`/`requiredWhen`/`validation` grammar with a
disposable checker script (`/tmp/gov2268/check_conformance.mjs`, not
committed — same technique used across this registry's other v1.0.0
cycles). The checker evaluates the shared `Condition` grammar
(`equals`/`notEquals`/`in`/comparison operators, `all`/`any`/`not`
composition) to resolve each field's effective requiredness, then checks
`pattern`/`maxLength`/`minLength`/`maximum`/`minimum`/`enum` against
whatever value is present, and flags any instance key not present in the
schema's own field list:

- **`application-packet-minimal-required-only.json`**: a minimal US
  fulfillment-services LLC (fictional — "Prairie Fulfillment Services
  LLC", Lincoln, NE) with `businessType: noAddressInDenmarkEuEeaOnly` and
  `registeredInHomeCountry: false`, filling only the 23 unconditionally
  required fields. **23 fields collected, 81 correctly not-applicable, 0
  errors.**
- **`application-packet-full-german-branch.json`**: a fictional German
  machinery manufacturer ("Nordlicht Maschinenbau GmbH", Hamburg) opening
  a Danish business-address branch office (`businessType:
  businessAddressInDenmark`), exercising the conditional Rubrik 3 address
  block, home-country VAT/foreign-ID fields (since
  `registeredInHomeCountry: true`), VAT registration, customs/EORI,
  corporate tax liability (including `taxLiabilityManagementSeatInDenmark`
  explicitly set `false` to distinguish it from the mislabeled free-text
  quirk field), one EU-VAT-number slot, employee registration, and the
  Rubrik-14 remarks field. **70 fields collected, 34 correctly
  not-applicable, 0 errors.**
- **Five mutation/negative controls**, each derived from the minimal
  scenario with exactly one defect introduced, each correctly raised the
  expected error (verified live this session, not asserted from memory):
  1. Removing the required `industryCode` → `MISSING REQUIRED`.
  2. Setting `industryCode` to `"12A456"` (violates
     `pattern: ^[0-9]{6}$`) → `fails pattern`.
  3. Setting `businessType` to `"somethingElse"` (not in the enum) →
     `value ... not in enum`.
  4. Setting `businessType` to `"businessAddressInDenmark"` without
     adding the Rubrik-3 fields it now requires →
     `danishBusinessAddressStreet`/`danishBusinessAddressPostalCode`/
     `danishBusinessAddressCity` each flagged `MISSING REQUIRED`,
     confirming `requiredWhen` correctly re-evaluates when the gating
     field changes.
  5. Setting `businessNameHomeCountry` to a 301-character string (exceeds
     `maxLength: 300`) → `exceeds maxLength`.

The schema was also validated against the GovSchema v0.3 meta-schema with
`node tools/validate-ajv.mjs ../registry/dk/erst/virksomhedsregistrering/1.0.0/schema.json`
(passes standalone, ajv 2020-12) and `node tools/validate.mjs
registry/dk/erst/virksomhedsregistrering/1.0.0/schema.json` (structural
validator, passes).

## Scope and jurisdiction notes

This document opens Denmark's Business Formation vertical (4/6; Visa and
DMV remain open, already-screened-and-set-aside backlog candidates — see
CATALOG.md's Known Gaps section). It does not submit the registration;
the live source (virk.dk / Erhvervsstyrelsen) is always authoritative.
GovSchema is independent and is not affiliated with, endorsed by, or
operated by the Kingdom of Denmark or Erhvervsstyrelsen.
