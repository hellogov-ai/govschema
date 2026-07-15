# Verification record — `pk/excise-punjab/registration-of-motor-vehicles-form-f` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-15`

## Why this schema and why now (GOV-3134, delegated from GOV-3128)

The GOV-3128 cycle ("GovSchema Standard Research") scouted Pakistan's DMV
vertical alongside authoring Israel's National ID schema, and found the
Punjab Excise, Taxation & Narcotics Control Department's Form F the
strongest live candidate after re-confirming Pakistan's Passport, Visa, and
National ID verticals as dead ends. That cycle delegated Form F as a
standalone, pre-verified child issue, GOV-3134 (URL, HTTP status, size, and
field count already recorded). This cycle (GOV-3145, "GovSchema Standard
Research") found GOV-3134 unclaimed and picked it up directly rather than
re-scouting fresh candidates, since it was already a fully pre-scouted,
ready backlog item — the same pattern this registry has used repeatedly
(e.g. GOV-3104/GOV-3109 for Pakistan's Taxes vertical).

## Sources examined

- **Document `(id, version)`:** `pk/excise-punjab/registration-of-motor-vehicles-form-f` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Excise, Taxation & Narcotics Control Department, Government
  of the Punjab.
- **Primary source:**
  - Direct PDF: <https://excise.punjab.gov.pk/system/files/Form_F_New.pdf>
    (linked from <https://excise.punjab.gov.pk/downloads>) — re-fetched
    independently this cycle via plain `curl`: HTTP 200, `Content-Type:
    application/pdf`, **size 213,274 bytes**, sha256
    `9f3e507ecf1c3a05effb67afffe86639328d61dcd256632c68f9ccf7e6c79748` —
    matching GOV-3128's own pre-recorded scouting notes exactly. No
    login/CAPTCHA/WAF gate.
  - A genuine native-text-layer PDF (not a scanned image), 1 page, no
    AcroForm. Extracted with `pdfjs-dist@3.11.174` (pinned per this
    registry's own prior finding that pdfjs-dist 4.x fails node-canvas
    rendering — this extraction only needed the text-content API, not
    rendering, but the same pinned version was used for consistency) into
    coordinate-tagged text items (`[x,y] "string"`), then read cell-by-cell
    in reading order
    against the form's own two-column, 31-item numbered layout, confirming
    every item number, label, and inline instruction quoted in `schema.json`
    verbatim from the extracted text.

## Provincial scoping

Pakistan does not operate a federal motor-vehicle-registration system;
registration is a provincial subject. This document is explicitly scoped to
**Punjab** (`jurisdiction.subdivision: "PK-PB"`, `level: "subnational"`),
the largest province and the one with a directly citable, unauthenticated
official source — not presented as a national Pakistani form. This mirrors
the same disclosed-scoping pattern this registry used for
`mx/semovi/alta-vehiculo-foraneo` (Mexico City-scoped, not federal).

## Scope decisions and judgment calls

1. **Field 6's printed label reads "Marker's Name", not "Maker's Name".**
   Item 10 elsewhere on the same one-page form correctly reads "Maker's
   classification" — the source PDF itself is internally inconsistent. This
   document's field `label` ("Maker's Name") and field `name`
   (`makerName`) correct the apparent typographical artifact for
   consistency with item 10 and with plain-English meaning (the vehicle
   manufacturer), while `sourceRef` preserves the verbatim source text with
   a `[sic]` marker, per this registry's disclose-don't-silently-correct
   convention (the same approach used for the Sr. 17 label artifact in
   `pk/fbr/annual-individual-income-tax-return-it-1b`).
2. **No checkbox/gate field distinguishes a "transport vehicle other than a
   motor cab" from any other vehicle.** The form introduces items 20-22
   (tyre description, maximum laden weight, maximum axle weight, each with
   a front/rear/rear axle breakdown) with a section heading stating they
   apply "only in the case of Transport Vehicles other than motor cabs,"
   but provides no separate Yes/No box the applicant checks to declare
   that status — `vehicleClass` (item 4) is itself an open string, not a
   closed enum, so it cannot be used as a `requiredWhen` trigger without
   inventing values the form itself does not enumerate. These nine fields
   are therefore modelled as `required: false` with no `requiredWhen` gate,
   the same technique already used in this registry for Colombia's
   `affiliatedCompanyName` (`co/runt/formulario-solicitud-tramites-vehiculo`).
3. **Items 21 and 22 each carry an identical (a) Front axle / (b) Rear axle
   / (c) Rear axle sub-breakdown, side by side in the form's own two-column
   layout** — confirmed by comparing each row's y-coordinate across both
   columns in the extracted text (e.g. `(a) Front axle` appears at both
   `[108.0, 482.7]` and `[359.5, 482.7]`, the same printed row). Read as two
   parallel measurements per axle position — item 21's "Maximum laden
   weight" (the vehicle's actual/declared laden weight) and item 22's
   "Maximum axel weight" (a separately labelled rated/permissible axle
   weight) — not a duplicate or extraction artifact. Modelled as eight
   distinct fields (`maxLadenWeight{FrontAxle,RearAxle1,RearAxle2}Lbs` and
   `maxAxleWeight{FrontAxle,RearAxle1,RearAxle2}Lbs`) plus the two overall
   totals, all sharing the "Lbs." unit the form prints beside every row in
   this block.
4. **No trailer-attached gate field either.** The "ADDITIONAL TRAILER"
   section (items 25-28) has the same structural gap as point 2 above — no
   discrete boolean the applicant checks — so its four fields are likewise
   modelled as optional with no `requiredWhen` gate.
5. **`unladenWeight` (item 16) and the trailer's own `trailerUnladenWeight`
   (item 26)/`trailerMaxAxleWeightLbs` (item 28) print no unit label on the
   form itself**, unlike items 21/22, which explicitly print "Lbs." beside
   every row. No unit is assumed for these three fields beyond what the
   source itself states — disclosed in each field's own `description`
   rather than silently assumed to be pounds.
6. **`hirePurchasePartyName` (item 31) is phrased as a fill-in-the-blank
   sentence** ("The motor vehicle above described is held by the person
   registered as the registered owner under a hire purchase agreement
   with ___"), not a Yes/No question with a separate gate field — modelled
   as an optional string with no synthetic boolean gate invented that the
   source form does not itself contain, the same principle applied in
   points 2 and 4.
7. **Item 30 (VERIFICATION) is filled in entirely by the Vehicle Inspecting
   Officer**, and item 23/24 (date/number of registration) are explicitly
   printed "(to be filled in by the Licensing Officer)" — all three are
   office-only content, out of scope, the same convention this registry
   used for Colombia's officer-only "Organismo de Tránsito" box.
   Similarly, the Declarant's, Hire Purchase Party's, and Licensing
   Officer's signature/stamp blocks are physical-signing mechanics, not
   data fields, and are out of scope.
8. **`ownerPhone` (printed beside item 3, with no numbered item of its own)
   has no explicit required/optional marker on the form.** Modelled as
   optional, this registry's established default for unmarked contact-
   detail fields (e.g. Colombia's `ownerPhone`/`ownerCity`).

## Conformance fixtures (Phase 3)

6 fixtures committed under
`conformance/pk/excise-punjab/registration-of-motor-vehicles-form-f/1.0.0/`:
2 valid scenarios plus 4 mutation-control fixtures, each derived from the
minimal valid fixture by a single targeted mutation. All 6 were run against
a from-scratch, ephemeral field-by-field conformance checker (derived
directly from this schema's own `fields[]`, not committed to the repo)
before being finalized:

- `valid-private-motor-car-minimal.json` (a privately-owned motor car, no
  transport-vehicle or trailer particulars, no hire purchase) —
  **0 errors**.
- `valid-government-transport-vehicle-with-trailer.json` (a
  government-owned truck with the full transport-vehicle laden/axle-weight
  breakdown, a trailer, and a hire-purchase party) — **0 errors**.
- `mutation-control-missing-required-field.json` (drops `chassisNumber`) —
  **exactly 1 error**.
- `mutation-control-invalid-enum-ownership-type.json` (sets `ownershipType`
  to `"corporate"`, not in the enum) — **exactly 1 error**.
- `mutation-control-negative-weight.json` (sets `unladenWeight` to `-1150`,
  violating `minimum: 0`) — **exactly 1 error**.
- `mutation-control-invalid-year.json` (sets `yearOfManufacture` to `1500`,
  violating `minimum: 1900`) — **exactly 1 error**.

## Structural validation

- `node tools/validate.mjs registry/pk/excise-punjab/registration-of-motor-vehicles-form-f/1.0.0/schema.json` — **ok**.
- `node tools/validate-ajv.mjs registry/pk/excise-punjab/registration-of-motor-vehicles-form-f/1.0.0/schema.json` (ajv 2020-12 against `spec/v0.3`) — **ok**.
- Full-registry re-run after adding this document: `node tools/validate.mjs`
  → **475/475**; `node tools/validate-ajv.mjs` → **475/475**.
- `node tools/verify-sources.mjs registry/pk/excise-punjab/registration-of-motor-vehicles-form-f/1.0.0` —
  1 directory, 4 URLs checked, **0 warnings**, **0 failures**.
- `npm run build-index` re-run in `tools/govschema-client/` to regenerate
  `registry-index.json` with this document included (475 entries).

## Maturity

`structural-reference`: the source form's own printed 31-item structure —
registered-owner identity, vehicle technical particulars, ownership type,
transport-vehicle laden/axle-weight breakdown, trailer particulars, and the
declaration/verification/hire-purchase blocks — is fully transcribed from
the genuine, currently-served official Form F, but no live filing through
any Excise & Taxation Department online channel was attempted (this is a
counter-submitted paper/PDF form, not an online-filing system). GovSchema
is an independent, non-profit standards body and is not affiliated with,
endorsed by, or operated by the Government of Pakistan, the Government of
the Punjab, or the Excise, Taxation & Narcotics Control Department.
