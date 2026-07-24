# Verification record — be/mobilit/vehicle-registration-application@1.0.0

## Candidate selection

GOV-4680 ("GovSchema Standard Research"). Belgium's DMV vertical was scouted
and banked STRONG, uncaveated, during GOV-4638's parallel new-jurisdiction
pass alongside Hungary and Tunisia: "the federal — not regional — DIV
vehicle-registration specimen PDF via `mobilit.belgium.be`, sidestepping
Belgium's 3-region fragmentation." No specific file URL was recorded at that
time (only the description above); this cycle independently located and
verified the live PDF. This is the strongest banked candidate for a
jurisdiction already partway open (Belgium stood at 1/6 after GOV-4645
authored Passport), consistent with this routine's own standing preference
for closing a vertical on an already-open jurisdiction over starting a new
one. Belgium's other three open backlog verticals (Visa, Business Formation,
Taxes) were not re-screened this cycle and remain open per GOV-4638's own
findings.

## Reaching the live source

`https://mobilit.belgium.be/sites/default/files/documents/publications/2023/dim_fr_recto_specimen.pdf`

- Located via the Federal Public Service's own public process page,
  `mobilit.belgium.be/fr/route/immatriculer/immatriculer/immatriculer-une-voiture`
  ("Immatriculer une voiture"), which links this French specimen and a
  parallel German specimen (`dim_de_recto_specimen_0.pdf`); the equivalent
  Dutch-language page,
  `mobilit.belgium.be/nl/weg/inschrijven/inschrijven/een-auto-inschrijven`,
  separately links a Dutch specimen (`dim_nl_recto_specimen.pdf`) — three
  independently filed, language-specific editions of the same front-side
  ("recto") form, not one multilingual document.
- Plain unauthenticated `curl` request, no session/cookie state, no
  CAPTCHA/WAF challenge.
- HTTP 200, **200,538 bytes** retrieved.
- PDF header `%PDF-1.7` at byte 0; version confirmed via `pdfjs-dist`.
- sha256 of the retrieved bytes:
  `d23af59fb91c9208b61cfda76e23e97399c0188e72f06aa45ca1603db751685e`.
- 1 page, confirmed via `pdfjs-dist`'s `numPages`. The filename's own
  "recto" (front side) naming, and the absence of any linked "verso"
  (`dim_fr_verso_specimen.pdf` returns HTTP 404), together with the page's
  own text ("(voir verso)" — "see reverse side" — printed once, referring
  applicants to supplementary terms on the physical form's back), confirm
  this one-page specimen models the front side only; no back-side
  applicant-facing fields exist to omit.
- This is a **"SPECIMEN"-watermarked** example rather than a genuinely blank
  production form — a diagonal "SPECIMEN" watermark is drawn across roughly
  the middle third of the page — consistent with this being a published
  reference copy rather than the exact printed/barcoded form an applicant
  receives from their insurer or a DIV counter (the live process page
  states the real form carries a barcode and is distributed by the seller
  or insurance intermediary, not downloaded and printed by the applicant
  directly). The specimen's field layout and labels are otherwise identical
  to the description in the source material and are treated as
  authoritative for this schema's structure.

### Authority attribution

The form's own printed header reads "DEMANDE D'IMMATRICULATION D'UN
VEHICULE" with no separate letterhead naming the issuing directorate by
name on the page itself; `authority` is attributed to the Federal Public
Service Mobility and Transport's Vehicle Registration Directorate (DIV),
per the hosting site's own organizational structure and the form's repeated
internal references to "la D.I.V." (e.g. the reference-number instruction,
"N° de référence à mentionner pour toute communication avec la D.I.V.").

## Extraction method

`pdfjs-dist` (vendored at `/tmp/node_modules/pdfjs-dist`, loaded via
`legacy/build/pdf.js`) `getTextContent()` read every text item's raw string
and `x`/`y` transform position, then all ~295 items were sorted by
descending `y` (row) and ascending `x` (column) to reconstruct reading
order. **This form's own printed reading order does not match a simple
top-to-bottom, left-to-right pass**: each field is prefixed with a short
alphanumeric code (e.g. `X1`, `C9`, `D2-01`) that is *not* always adjacent
to its own descriptive label in extraction order, and several logically
distinct multi-column checkbox groups (registration category; new/used;
plate format; fuel type) print on the same horizontal band, interleaved.
Correctly grouping each code with its label and its column of options
required clustering items by shared `y`-band and `x`-column rather than
trusting the raw item-array order alone — this is the fifth distinct
extraction pattern this registry's own `gov-form-pdf-extraction` reference
documents (joining the four prior failure modes: scrambled glyph order,
unreadable glyph-paint order, canvas-only glyph-rendering failure, and
checkbox-glyphs-absent-from-text-layer).

A full-page render via `node-canvas` (vendored at `/tmp/node_modules/canvas`)
at 2.5x scale was additionally produced and visually reviewed. Unlike some
prior Latin-script cycles, **the canvas render here painted essentially all
glyphs correctly** (headings, labels, the "SPECIMEN" watermark, and the
explicit checkbox squares in the bottom third of the page — e.g. the
speed-pedelec and special-plate-type groups — are all directly legible).
This confirmed: the 4-column checkbox band at the top (registration
category / plate-available / new-or-used / plate format, beside the
16-value fuel-type list) reads as four independent single-select groups,
not one; the "Personne morale" / "Personne physique" applicant-type split
is a **two-column field layout, not an explicit checkbox pair** — no
checkbox glyph or square is drawn beside either label, only a printed
column header, with the company fields (C9/C9.1/C9.2) in the left column
and the individual's national-register-number field (C10) in the right
column beneath it; and the bottom-third special frames (moped-specific
speed-pedelec question, special plate types) do use genuine drawn checkbox
squares, directly confirmed on the render.

## Document structure

Single page, densely coded, organized top-to-bottom as: (1) title band; (2)
a 4-group checkbox/list band — registration category (`X1`: Normale/
Transit/Nationale), plate-already-available (`A`), vehicle condition (`X2`:
new/used), plate format (`X3`), and fuel type (`P3`, a 16-value numbered
list); (3) "Données du véhicule" (vehicle data) — make/model, chassis
number and accompanying codes, category/genre, type-approval numbers, mass
and MTM figures, CO2/environmental class, import-country disclosure,
first-registration date, speed/displacement/power, seating, color code,
and a motorcycle-only power-to-weight ratio; (4) "Le DEMANDEUR de
l'immatriculation" (the applicant) — the legal-entity/natural-person
two-column identity block plus a shared address/contact block; (5)
additional declarations/proxy/delivery-address free text, plus an
express-delivery opt-in and its own signature line; (6) a language-choice
group (`X9`), date and applicant signature (`X7`/`X8`, with a
legal-entity-delegate-name footnote); (7) a DIV-assigned reference-number
line; (8) a vehicle-inspection-station reservation frame (station number
and date of control, inspector's own signature); (9) a moped-specific frame
(speed-pedelec question and, if yes, assistance-type sub-choice); (10) a
national-plate remark box (informational only); (11) the insurer's own
block (company vignette, delegate name/signature, phone number, temporary-
plate validity end date); (12) a special-plate-type checkbox group (`X16`:
Oldtimer/Taxi/Chauffeured-hire/Agricultural tractor).

## Scope: sections and fields excluded

- **The vehicle-inspection-station reservation frame (item 8 above,
  "CADRE DE RESERVE INSPECTION AUTOMOBILE")** is excluded in its entirety —
  its own printed fields ("N° STATION + date du contrôle", "Signature + nom
  du contrôleur") are completed by the technical-inspection station, not
  the applicant.
- **The insurer's own block (item 11 above, "L'ASSUREUR")** is excluded in
  its entirety — its own printed fields (company vignette/sticker, the
  insurer's delegate name and signature, phone number, and temporary-plate
  validity end date) are completed by the applicant's insurance
  intermediary as part of the online-registration handoff described on the
  authority's own process page, not by the applicant.
- **The DIV-assigned reference-number line ("N° de référence à mentionner
  pour toute communication avec la D.I.V.")** is excluded — this is a
  number the Directorate itself issues back to the applicant for future
  correspondence, not applicant-supplied input.
- **The national-plate remark box ("Y. PLAQUE NATIONALE: REMARQUE")** is
  excluded — pure informational text describing which vehicle-data fields
  alone are needed for a national-plate request; it names no new
  applicant-fillable field beyond `makeAndModel` and `chassisNumber`,
  already modelled.

## Scope: fields excluded from `documents[]`

**`documents` is omitted entirely from this schema.** This specimen prints
no named checklist of documents to attach (unlike, e.g., a source that
explicitly lists "Birth Certificate" or "Two Photographs"); the only
document-adjacent references are procedural instructions on the hosting
web page (technical-inspection certificate, prior registration
certificate, or police attestation for a used vehicle) that live outside
this PDF itself and are not printed as a field or checklist on the form.
Modelling a `documents[]` array here would mean inventing entries this
source does not itself name.

## Scope: judgment calls on requiredness and structure

This specimen carries no asterisk/mandatory-marking convention anywhere, so
requiredness was assigned by engineering judgment (core
identity/registration/vehicle-identification fields required; secondary,
vehicle-type-specific, or supplementary fields optional):

1. **`applicantType` modelled as an inferred discriminator, not a printed
   checkbox pair.** As confirmed by the canvas render, "Personne morale" /
   "Personne physique" are plain two-column headers with no checkbox glyph
   attached to either — the applicant's type is expressed by which
   column's fields they complete (`vatOrCompanyNumber`/`legalForm` under
   the company column vs. `nationalRegisterNumber` under the individual
   column), the same real-world pattern this registry has already modelled
   as an inferred discriminator elsewhere (e.g.
   `mu/nlta/vehicle-registration-mark-application`'s `applicantType`, itself
   not a printed field but inferred from two mutually exclusive printed
   sections).
2. **`establishmentUnitNumber` (`C9.1`) modelled unconditionally optional**,
   not gated to `applicantType == LEGAL_ENTITY`. This is a supplementary
   Crossroads Bank for Enterprises branch/unit identifier that not every
   registered company holds (only those with multiple establishment
   units), unlike `vatOrCompanyNumber`/`legalForm`, which every legal-entity
   applicant has by definition.
3. **`chassisCode` (`E1`) and `chassisUnifierCode` (`E2`) modelled
   optional.** Their printed labels ("Code", "Unifier") are terse
   type-approval jargon with no further explanatory text on this specimen;
   rather than guess at a stricter requiredness this source does not
   itself clarify, both are left optional supplementary technical detail
   alongside the mandatory `chassisNumber`.
4. **`engineDisplacement` (`P1`, "cc") modelled optional** despite sitting
   in the same technical-data band as the required `enginePower` (`P2`,
   "kW") — engine displacement in cc does not apply to purely electric
   vehicles (a value this same form's own `fuelType` list of 16 values
   explicitly includes, `ELECTRIC`), so it cannot be universally required
   across every fuel type this form covers.
5. **`powerToWeightRatio` (`Q`) modelled optional**, explicitly noted as
   motorcycle-specific per its own printed "Motocyclette" sub-heading — not
   applicable to the car/van/heavy-vehicle registrations this same shared
   form also covers.
6. **`isSpeedPedelec`/`speedPedelecAssistanceType` (the `X15` moped frame)
   modelled optional/conditionally-required, not required outright** — this
   frame's own heading ("CADRE SPÉCIAL POUR CYCLOMOTEURS") scopes it to
   moped registrations specifically, one of several vehicle categories
   this single shared federal form serves.
7. **`expressDeliverySignature` gated on `expressDeliveryRequested`
   equalling `true`** — the signature line is printed immediately beneath
   the express-delivery opt-in checkbox with the label "SIGNATURE pour
   ACCORD" (signature FOR AGREEMENT), the most direct possible adjacency to
   its own discriminator.
8. **`legalEntityDelegateName` gated on `applicantType` equalling
   `LEGAL_ENTITY`**, per the signature block's own printed footnote:
   "S'il s'agit d'une personne juridique: le nom du délégué en MAJUSCULES
   également" (if a legal entity: the delegate's name in capitals also).

## Conformance

7 mock scenarios were exercised programmatically (ephemeral, uncommitted
Node script) against this schema's own `fields[]`/`requiredWhen`
conditions: (1) an individual applicant with a minimal valid car
registration — correctly resolves with only `nationalRegisterNumber`
outstanding until supplied, and no legal-entity-only fields required; (2) a
legal-entity applicant with a minimal valid registration — correctly
resolves with zero outstanding required fields; (3) an individual applicant
missing `firstName` — correctly flagged; (4) a legal-entity applicant
missing `vatOrCompanyNumber`, `legalForm`, and `legalEntityDelegateName` —
all three correctly flagged together; (5) express delivery requested
without a signature — correctly flags only `expressDeliverySignature`; (6)
a speed-pedelec registration without an assistance-type choice — correctly
flags only `speedPedelecAssistanceType`; (7) an individual applicant who
additionally supplies `nationalRegisterNumber` — confirms scenario 1's sole
gap resolves cleanly with no further false positives. All four
`requiredWhen` conditions in this schema (`applicantType` gating four
fields, `expressDeliveryRequested`, `isSpeedPedelec`) were exercised both
true and false across these scenarios.

Validated clean with `node tools/validate.mjs` and `node
tools/validate-ajv.mjs` (ajv 2020-12 against
`spec/v0.3/govschema.schema.json`). `registry-index.json` regenerated via
`npm run build-index` in `tools/govschema-client/`.

Models 52 `fields[]` across 6 steps, 0 `documents[]` entries (omitted per
the scoping note above).
