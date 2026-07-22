# Verification record — bw/drts/driving-licence-application@1.0.0

## Candidate selection

GOV-4314 ("GovSchema Standard Research"). Rather than scouting a new
jurisdiction from scratch, deepened Botswana's own pre-scouted, STRONG
banked backlog left open by the GOV-4307 cycle (see CATALOG.md's Known Gaps
entry 0e) — Botswana had three STRONG-but-unauthored verticals (Visa, DMV,
Passport) alongside its one already-published vertical
(`bw/burs/individual-tax-return`, Taxes). Form DL1 (DMV) was chosen among
the three for the smallest source file (38,662 bytes), the lowest-risk
choice for a single-cycle authoring budget. Opens Botswana's DMV vertical
(2 of 6); Visa and Passport remain open, STRONG, ready-to-author backlog.

## Reaching the live source

Target: `https://www.gov.bw/sites/default/files/2019-12/Form_DL1_1.pdf`.

- Independently re-fetched and re-hashed rather than trusted from the
  GOV-4307 cycle's own report alone: HTTP 200, `Content-Type:
  application/pdf`, 38,662 bytes (byte-for-byte match with the prior
  cycle's own reported size).
- sha256 of the retrieved bytes:
  `3a17d1d4c93475e56f13649a1164fd7f85acdcae45d41c8661df92174384c665`.
- Confirmed mechanically: the retrieved bytes begin `%PDF-1.2` and contain
  zero `/AcroForm`, `/Widget`, and `/FT` occurrences — a flat, print-and-fill
  specimen, not an interactive AcroForm PDF.

## Extraction method

Text extracted via `pdfjs-dist`'s `getTextContent()` API (vendored at
`/tmp/node_modules/pdfjs-dist` from prior cycles), grouped by y-coordinate
row and sorted by x-coordinate.

The PDF's 2 physical pages are each a landscape double-page spread:
physical page 1 = logical Page 1 of 4 (x-coordinates ~630-1150) on the right
half plus logical Page 4 of 4 (x-coordinates ~20-550) on the left half;
physical page 2 = logical Page 2 of 4 (right half, Declaration) plus logical
Page 3 of 4 (left half, informational reference table) — confirmed by each
logical page's own printed "Page N of 4" footer.

Cross-checked visually by rendering each physical page to a PNG via
`pdfjs-dist` + `node-canvas`. This PDF's embedded Times-family font subset
partially failed to rasterize as visible glyphs (a font-embedding quirk
affecting only the visual render, `getPathGenerator` warnings on most
characters — not the text-layer extraction used for field modelling), but
the printed table/checkbox grid lines rendered cleanly and were used to
confirm the checkbox layout described in Finding 1 below.

Models 34 `fields[]` across 6 steps (Type of Application; Details of the
Applicant — Individual Details; Details of the Applicant — Licence Details;
Physical and Postal Address; Class of Motor Vehicles for which a Licence is
Requested; Declaration) plus 1 `documents[]` entry.

Excludes: the purely informational Page 3 of 4 "Information about Driving
Licence Classes for Motor Vehicles" table (used only as descriptive-label
source material for this schema's own class/restriction enums, per Finding
2, not modelled as applicant input); the Page 4 of 4 "FOR PrDP APPLICANTS
ONLY — Certificate from a Police Officer" block (a third-party
law-enforcement certification, not applicant-supplied); and the Page 4 of 4
"FOR OFFICIAL USE ONLY — Driving Test Examiner" block (office/examiner-
completed, not applicant-supplied).

## Disclosed source-fidelity findings

1. **Type-of-application checkbox grid reconstructed from an 8-row x
   2-column table with 12 printed, labelled options (plus unlabelled/blank
   grid cells excluded).** Page 1's own top table prints 8 rows, each with a
   left and a right checkbox cell (confirmed visually via the rendered
   PNG's grid lines), but only 12 of the 16 cells carry accompanying
   printed text — rows 2, 3, 5, and 6 have text only in the left cell, with
   the right cell a blank/unlabelled grid artifact carrying no
   distinguishable meaning. Modelled as a single required enum
   `applicationType` with exactly the 12 labelled options — the same
   single-select-enum treatment this registry's own
   `sg/spf/driving-licence-application` (`licenceClassApplied`) and
   `my/jpj/driving-licence-application` (`licenseClassSought`) established
   for a tick-one-of-many licence-transaction selector, since GSP-0009's
   field-type vocabulary has no multi-select/array primitive (confirmed in
   `spec/v0.3/govschema.schema.json`, field `type` enum: `string`,
   `number`, `integer`, `boolean`, `date`, `enum`, `file`, `object`). The
   form does not print an explicit prohibition on ticking more than one
   box; this schema follows the same registry precedent of modelling the
   common single-selection case and disclosing the theoretical multi-select
   case as an unmodelled scope limitation.

2. **Licence-class and restriction-code selection modelled as three
   single-select enums, following the same single-selection precedent as
   Finding 1.** Page 1's own "Class of Motor Vehicles for which a Licence is
   requested" table lists 10 licence classes (A1, A, B, C1, C, EB, EC1, EC,
   F, H), each with its own printed checkbox, alongside two
   independently-numbered restriction-code lists — "Vehicle Restrictions"
   (codes 0-4: None, Automatic transmission only, Electrically (Battery)
   powered vehicle, Additional/mounted fittings, Others) spanning rows
   A1-EB, and "Driver Restrictions" (codes 0-3: None, Glasses/Contact
   Lenses, Physically disabled (with certified badge), Others) spanning
   rows EC1-H — each code also with its own printed checkbox. The two
   restriction-code lists are visually adjacent to but structurally
   independent of the licence-class rows (confirmed by the rendered PNG:
   the code checkboxes sit in a separate table column, and the "Vehicle
   Restrictions"/"Driver Restrictions" column headers themselves fall
   mid-table, at the A1 and EB class rows respectively, not aligned to any
   single class row). Modelled as `licenceClassRequested` (required enum,
   10 values, single-selection scope per Finding 1),
   `vehicleRestrictionRequested` (optional enum, 5 values), and
   `driverRestrictionRequested` (optional enum, 4 values) — the class-code
   short descriptions in this schema's own enum come from this same Page 1
   table, not the separate Page 3 of 4 informational reference table
   (excluded per this document's own top-level description), though the two
   are consistent with each other.

3. **`nationalIdOmang` and `passportNumberOrOther` both modelled as
   unconditionally optional, disclosing an unencoded "one of the two"
   constraint.** Page 1 prints these as two separate lines — "National ID
   (Omang):" for citizens and "Passport No./Others (Non Citizen only):" for
   non-citizens — a natural mutual-exclusivity the form itself does not
   print as an explicit rule (no "if non-citizen" conditional heading,
   unlike, e.g., this form's own explicit "(Non Citizen only)"
   parenthetical, which *is* preserved in the field's own label/
   description). GSP-0013's `requiredWhen` grammar has no "at least one of
   N fields" primitive (the same registry-wide gap disclosed by, e.g.,
   `mt/identita/passport-application`'s single-parent-consent workaround).
   Rather than fabricate a one-way conditional tying one field's
   requiredness to the other's absence — which this registry's own memory
   of the `notEquals ""` anti-pattern (an optional field's absence is not
   reliably distinguishable from an empty string under GSP-0013's
   semantics) flags as an established bug source — both fields are modelled
   as unconditionally optional, with each field's own description
   disclosing the citizen/non-citizen exclusivity as informational guidance
   rather than enforced validation.

4. **Existing-licence fields ("Licence Details", captioned "Please delete
   where inapplicable") modelled as unconditionally optional, not gated on
   `applicationType`.** These six fields (`existingLicenceNumber`,
   `existingLicenceClasses`, `existingLicenceDriverRestrictions`,
   `existingLicenceVehicleRestrictions`, `existingLicenceDateOfIssue`,
   `existingLicenceCountryOfIssue`) plus `referenceDetails` are only
   relevant to renewal/conversion/additional-class/foreign-conversion
   application types, per the section's own "Please delete where
   inapplicable" caption — but the form prints no explicit cross-reference
   tying this caption to specific `applicationType` values, and fabricating
   such a tie would risk encoding a rule the source itself does not state.
   Modelled as unconditionally optional per this registry's "disclose
   rather than fabricate an unprinted conditional" convention (see, e.g.,
   `mt/transport-malta/driving-licence-renewal`'s own Finding 4).

5. **`referenceDetails` modelled as an optional string plus a
   conditionally-required supporting document, both unconditionally-optional
   per Finding 4.** The printed note reads, verbatim: "*Please attach
   reference details and Confirmation from issuing Country!" — modelled as
   the string field `referenceDetails` plus the document
   `referenceDetailsConfirmation`, both left unconditionally optional for
   the same reason as Finding 4 (no printed cross-reference to a specific
   `applicationType` value).

6. **Declaration's two embedded either/or choices modelled as one boolean
   and one enum.** Page 2's single combined declaration paragraph embeds
   two printed either/or choices with no separate heading of their own: "I
   use glasses for driving" / "I do not use glasses for driving" (modelled
   as the required boolean `usesGlassesForDriving`, true selecting the
   first option) and "I have read this declaration," / "This declaration
   has been read to me," (modelled as the required enum
   `declarationReadMethod`, values `SELF_READ` / `READ_TO_APPLICANT`,
   relevant to the applicant's own `literate` answer captured earlier in
   the form but not cross-validated against it, since the form itself
   prints no such cross-reference).

7. **Postal-address fields modelled as unconditionally optional.** Unlike
   the Physical Address fields (required — every applicant has a physical
   address), the source prints no explicit optionality marker for Postal
   Address, but a P.O. Box/Bag arrangement is not universal; modelled as
   optional per this registry's general convention of treating a secondary/
   supplementary address block as optional absent an explicit required
   marker.

## Conformance

3 valid mock scenarios plus 13 mutation-control fixtures committed under
`conformance/bw/drts/driving-licence-application/1.0.0/`:

- `valid-new-provisional-learner-citizen.json` — a first-time "L" learner's
  licence citizen applicant, no existing licence held.
- `valid-additional-class-existing-licence.json` — a Botswana-licence
  holder applying for an additional class, existing-licence fields
  populated.
- `valid-foreign-conversion-noncitizen.json` — a non-citizen converting a
  foreign licence to a Botswana driving licence card, using
  `passportNumberOrOther`, `referenceDetails`, and the
  `referenceDetailsConfirmation` document.
- 13 mutation controls: a missing statically-required field for each of
  `applicationType`, `surname`, `firstNames`, `gender`, `dateOfBirth`,
  `literate`, `physicalAddressPlotNo`, and `licenceClassRequested`; an
  invalid `applicationType` enum value
  (`mutation-invalid-applicationtype-enum.json`); a missing
  `usesGlassesForDriving`
  (`mutation-missing-usesglassesfordriving-required.json`); a missing
  `declarationReadMethod`
  (`mutation-missing-declarationreadmethod-required.json`); a missing
  `signature` (`mutation-missing-signature-required.json`); and an unknown
  top-level field (`mutation-unknown-field-rejected.json`).

An ephemeral, from-scratch conformance checker (deriving required rules
directly from this schema's own `fields[]`, discarded after use, not
committed) ran all fixtures: all 3 valid scenarios at 0 errors, all
mutation controls each raising exactly 1 error. Consistent with this
registry's own fixture convention (see e.g.
`mt/identita/passport-application`'s own fixtures), `documents[]`
requiredness is not exercised via these field-only mock fixtures.

Validated clean with `node tools/validate.mjs` and
`node tools/validate-ajv.mjs`, individually and as part of the full registry
run. `registry-index.json` regenerated via `npm run build-index` in
`tools/govschema-client/`.
