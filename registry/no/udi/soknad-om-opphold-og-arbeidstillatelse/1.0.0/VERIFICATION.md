# Verification record — no/udi/soknad-om-opphold-og-arbeidstillatelse@1.0.0

## Candidate selection

GOV-2340 is this cycle's firing of the `GovSchema Standard Research`
recurring routine (GOV-2338 parent). CATALOG.md's own "Known Gaps &
Opportunities" section (item 8) had already pre-scouted UDI's form GP7028
as Norway's last open vertical: Business Formation (GOV-2314/GOV-2316),
National ID (GOV-2323), and DMV (GOV-2330) were already closed this cycle
history, and Taxes/Passport were previously confirmed dead-end/weak. This
form closes Norway's Visa vertical and brings Norway to 6/6.

## Source

- **URL:** `https://www.udi.no/globalassets/global/skjemaer/arbeid-og-opphold-gp7028-b.pdf`
- Fetched fresh this session with a plain HTTP GET: **HTTP 200**,
  `1,519,473` bytes, genuine `%PDF-1.6` header, no login/CAPTCHA/WAF gate.
- **Edition:** the form's own footer prints "GP-7028 B — per 1. januar
  2010" (page 1), the currently-live download as of this cycle.

## Extraction technique

`pdfjs-dist` v3.11.174 (`legacy/build/pdf.js`, installed to a disposable
`/tmp` directory) was used two ways:

1. `page.getAnnotations()` per page, to enumerate every raw `/Widget`
   annotation with its field name, type, and rect.
2. `page.getTextContent()` per page, to recover every printed instruction,
   section heading, and radio/checkbox option label, sorted into reading
   order by Y-then-X position — used to resolve the semantic grouping of
   every multi-widget radio/checkbox cluster below (e.g. which "Ja/Nei"
   pair answers which printed question).

Results: **7 pages, 325 raw Widget annotations, 231 distinct field names**
(`getFieldObjects()`: 233 keys, since two field names are shared by radio
groups whose members appear on non-adjacent index positions in that map)
— this exactly matches the issue's own pre-extraction count, independently
reproduced. Per-page widget counts: page 1: 40, page 2: 55, page 3: 39,
page 4: 76, page 5: 79, page 6: 28, page 7: 8 — also an exact match.

## Field mapping (325 widgets → 229 fields + 4 documents[] entries)

### Radio groups and checkbox pairs → single fields

Every widget cluster sharing one `fieldName` with `radio: true` collapsed
to a single `enum` field (or `boolean` field, for two-option Ja/Nei pairs),
per this registry's standing convention. This includes, among ~30 such
groups: `KjønnGrupp1`, `SivilstatusGruppe1`, `ReisedokumentGrupp1`,
`TillatelseGruppe1/2/3`, `GiftGruppe1-4`, `ArbeidGruppe1-4`,
`UtdanningGruppe1-3`, `BeskyttelseGruppe1-3`, `StraffGruppe1/2/4`,
`FamilieGruppe1-9`/`FamilieGrupp6-9` (gender per family-member row),
`SlektGruppe2/3`/`SlektGrupp4-6` (relative-relationship radios), and the
per-row `UtenlandsoppholdGruppe1-6` (foreign-trip purpose).

### Office-use-only content — excluded

Three widgets at the top of page 1, inside the printed "Stempel fra
politidistriktet eller utenriksstasjonen" (Stamp from the police district
or the foreign service station) box — `Dato`, `DUFnummer` (UDI's own case
number), and `Betalt gebyr i NOK` (fee paid) — are filled in by the
receiving authority, not the applicant, and are excluded. Likewise, page
7's `MerknaderGruppe1/2/3` radios sit under the printed heading "Merknader
for politiet eller utenriksstasjonen" (Remarks for the police or the
foreign service station) and are excluded for the same reason. This
matches this registry's established precedent for office-stamp/official-
remarks sections (e.g. `de/bmi/residence-deregistration`,
`mx/sre/passport-application`).

### Synthetic permit-ground gating fields (disclosed judgment call)

The source form's own instruction for section "4 Tillatelsen du søker om"
is "Fyll ut det/de feltene som svarer til grunnlaget du søker på" ("Fill
in the field(s) that correspond to the basis you are applying on") — the
plural "de feltene" makes clear more than one ground can apply at once
(e.g. a spouse who will also work). The form has **no single dedicated
selector widget** naming which of its four lettered sub-sections (A family
/ B work / C education / D protection-or-other) the applicant is
completing. To make each branch's applicability explicit and machine-
checkable with this registry's `visibleWhen`/`requiredWhen` conventions,
this schema introduces four synthetic, unconditionally-required boolean
fields with no backing widget: `applyingForFamilyImmigration`,
`applyingForWorkPermit`, `applyingForEducationPermit`,
`applyingForProtectionOrOtherPermit`. Each gates its own lettered section's
fields. This is disclosed in every one of the four fields' own
`description`, per this registry's "spec precision over cleverness" norm
of never silently inventing structure the source doesn't express.

### Bounded repeating groups

- **Foreign-travel-history table** (section 5, renewal only): 6 rows ×
  5 sub-fields (`foreignTripDepartureDateN`/`ArrivalDateN`/
  `AbsenceDaysN`/`ResidenceCountryN`/`PurposeN`), following this
  registry's `entrantN`-style flattened-bounded-repeating-group
  convention (cf. `dk/cpr`, `no/skatteetaten`). **Disclosed duplicate
  widget layer:** rows 1-4's four text columns (departure/arrival/
  absence-days/country) each have two near-identical widgets at
  near-identical rects in the source PDF (row 4's "Oppholdsland" column
  is the sole exception, appearing only once) — the same kind of stray
  forms-authoring artifact this registry has disclosed in other Norway
  schemas (e.g. `no/brreg`). De-duplicated by field name; the row-level
  `UtenlandsoppholdGruppeN` purpose radio is not duplicated.
- **Family members** (section 6): a spouse/partner/cohabitant (own
  address block, `spouse*`), up to two parents (`parentN*`), and up to
  six other close relatives — children/foster-children/siblings
  (`relativeN*`, N=1..6) — modelled as three distinct flattened groups
  rather than one uniform `familyMemberN` group, since their widget sets
  genuinely differ (only the spouse has an address block; only the
  "other relatives" have a B/F/S relationship radio). **Disclosed source
  quirk:** relative 1's combined surname/first-name widget is internally
  named `Etternavnet til barn nummer 1` ("the surname of child no. 1")
  even though, like relatives 2-6's widgets and the shared column header
  "Etternavn, Fornavn" spanning the whole row, its rect covers the full
  combined-name column — modelled as `relative1FullName`, not a
  surname-only field, since the visual table structure is the source of
  truth over the internal widget name. **Disclosed stray widget:** one
  extra `FamilieGruppe5` "Kvinne" option widget appears at an out-of-
  sequence rect (between the relative-6 and relative-9 rows) with no
  matching row; excluded as a duplicate-layer artifact, consistent with
  the row-level de-duplication used elsewhere in this schema.

### `documents[]` entries (4)

Following this registry's own documented blind spot (a disposable
conformance checker limited to `fields[]` can report a false "0 errors" on
a schema with unconditionally- or conditionally-required documents), this
schema's 4 `documents[]` entries were explicitly exercised in the
conformance run below:

1. **`passportPhoto`** (`identity-document`, unconditionally required) —
   the printed "Bilde" (Photo) placeholder box, page 1.
2. **`entryBanLiftingApplication`** (`supporting-evidence`,
   `requiredWhen entryBanStillInEffect == true`) — the `OppholdGruppe5`
   radio's own "Ja" option text instructs the applicant to attach this.
3. **`workExperienceDocumentation`** (`supporting-evidence`,
   `requiredWhen hasRelevantWorkExperience == true`) — the `ArbeidGruppe4`
   radio's own "Ja" option text instructs the applicant to attach this.
4. **`correctnessAttestation`** (`attestation`, unconditionally required)
   — the closing declaration "Jeg bekrefter at opplysningene som er gitt i
   denne søknaden er korrekte og fullstendige" has no separate checkbox
   widget on this specimen (implicit in signing), matching this
   registry's `no/skatteetaten` precedent for the identical pattern.

No other "legg ved"/"legge ved" (attach) instruction appears anywhere in
the form's own printed text (confirmed by a full-text grep of every page's
extracted content), so no further `documents[]` entries were added on
inference alone.

### Signature and minor/guardian section

The applicant's own signature has no separate wet-ink widget, only a
place-and-date text field (`applicantSignaturePlaceAndDate`) alongside the
printed line "Underskriften din." Section 10, "Når søkeren er barn eller
umyndiggjort" (When the applicant is a child or incapacitated), provides
two parent/guardian place-and-date signature fields
(`guardian1SignaturePlaceAndDate`/`guardian2SignaturePlaceAndDate`,
required whenever parental responsibility is shared, per the form's own
text) — left optional rather than gated on a synthetic field, since the
source form has no yes/no widget testing "is the applicant a minor,"
consistent with this registry's convention of not inventing gating
structure the source doesn't express (see `no/skatteetaten`'s
`bruksenhetsnummer` precedent for the same reasoning).

## Conformance run

A disposable checker script (adapted from this registry's own
`fields[]`+`documents[]`+`exclusivityGroups` evaluator used on prior
Nordic cycles) was run against two mock scenarios with valid synthetic
(non-real) data, each covering a different permit ground and structural
path:

- **`work-permit-first-time-minimal.json`** — a first-time work-permit
  application (section B), minimal required data, `passportPhoto` +
  `workExperienceDocumentation` + `correctnessAttestation` attached.
  **0 errors.**
- **`family-immigration-renewal-with-relatives.json`** — a renewal
  family-immigration application (section A) exercising a prior marriage,
  a spouse and one child relative, a foreign-trip-history row, a criminal
  conviction with a fine, and a granted power of attorney.
  **0 errors.**

Both fixtures also pass `node tools/validate.mjs` and
`node tools/validate-ajv.mjs` (structural + meta-schema conformance) for
the schema document itself; `registry-index.json` was regenerated via
`npm run build-index`.

**Four mutation controls**, each derived from one of the two fixtures
above by removing exactly one requirement, each raised **exactly 1
error**:

1. Removing `applicantSignaturePlaceAndDate` from the work-permit fixture
   → `applicantSignaturePlaceAndDate: required but missing`.
2. Removing `passportPhoto` from the work-permit fixture's `documents[]`
   → `documents.passportPhoto: required but missing` (exercises the
   `documents[]` blind spot on an unconditionally-required document).
3. Removing `fineAmount` from the family-immigration fixture (which sets
   `convictionReactionFine: true`) → `fineAmount: required but missing`.
4. Setting `entryBanStillInEffect: true` on the family-immigration fixture
   without attaching `entryBanLiftingApplication` →
   `documents.entryBanLiftingApplication: required but missing`
   (exercises the `documents[]` blind spot on a conditionally-required
   document).

## Disclosed judgment calls (summary)

- Four synthetic permit-ground gating booleans with no backing widget
  (see above) — the schema's single largest disclosed judgment call.
- Office-use-only content excluded: the page-1 stamp box (date/DUF-
  nummer/fee) and page-7 police/embassy remarks radios.
- Disclosed duplicate widget layer on page 4's foreign-travel-history
  table (rows 1-4) and a single stray `FamilieGruppe5` widget on page 5.
- `relative1FullName` modelled from a widget internally named as a
  surname-only field, per the visual table layout (see above).
- Guardian signature fields (section 10) left optional/ungated, since no
  source widget tests "is the applicant a minor."
- `workPercentageOther`'s source widget (`Stillingsprosent`) carries a
  stray pre-filled default value of "90" in the PDF, disclosed and not
  treated as a schema default.
