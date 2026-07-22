# Verification record — pa/migracion/tourist-visa-application@1.0.0

## Candidate selection

GOV-4293 ("GovSchema Standard Research", 2026-07-22). The GOV-4271 cycle
(2026-07-22, opening Zambia as the registry's 77th jurisdiction) screened
Panama and Albania in parallel as candidate new-jurisdiction openings and
banked Panama's Visa candidate — Migración Panamá's tourist-visa PDF — as
pre-scouted, disclosed backlog: the strongest of Panama's six verticals
(DMV, Business Formation, Passport, Taxes, and National ID each route
exclusively into a login-gated online portal with no static application-form
document; only Visa had an unauthenticated, unGated PDF). Zambia won that
cycle on a stronger three-candidate showing across all six verticals, so
Panama was left open. This cycle re-screens the banked candidate fresh and
authors it, opening Panama as the registry's 78th jurisdiction via its Visa
vertical (1 of 6).

## Reaching the live source

Fetched `https://migracion.gob.pa/wp-content/uploads/10-Formulario_visa_de_turista.pdf`
directly with a plain unauthenticated `curl` request (no session/cookie
state, no CAPTCHA/WAF challenge):

- HTTP 200, 313,700 bytes.
- sha256 `a5c4a233bfa243ccf77b17d767ab83eae044d199dd154023b393519916574fdc`.
- PDF header `%PDF-1.7` at byte 0 — a genuine native (searchable-text) PDF,
  not a scanned image.
- Independently re-confirmed as still the banked GOV-4271 URL, unchanged
  since that cycle's scouting pass.

## Extraction method

Extracted with `pdfjs-dist` (vendored from an existing session scratch
install at `/tmp/node_modules`), reading each page's text content directly —
extraction was clean and complete across all 3 pages with no glyph-mapping
workaround needed. A supplementary render-to-PNG pass via `pdfjs-dist` +
`node-canvas` was attempted to visually cross-check the page 2/3 layout, but
this particular PDF's embedded Times-family fonts triggered
`getPathGenerator`/"object isn't resolved yet" glyph-rendering errors in this
session's `node-canvas` build, leaving the rendered images mostly blank of
text (checkbox glyphs did render, confirming their positions). This is a
rendering-pipeline limitation, not a text-extraction one: `pdfjs-dist`'s
`getTextContent()` API (used for the actual field inventory below) reads the
underlying character stream directly and does not depend on the glyph
rasterizer, and returned complete, coherent bilingual text for all three
pages. Field positions (`transform` x/y) were additionally read directly
from the text-content API to disambiguate side-by-side columns (e.g. item
2's two adjacent "Usual name" / "Legal name" boxes) without needing the
image render.

## Document structure

A bilingual Spanish/English, three-page, single form: "Solicitud de Visa de
Turista / Requesting a Visa as a Tourist," 32 numbered items (numbering
genuinely skips from 20 to 22 in the source itself — confirmed by direct
inspection of each text item's y-position, which shows a single ordinary
paragraph-gap between items 20 and 22, not a truncated or misread item 21;
this schema does not model a field numbered 21, since none exists), plus an
unnumbered closing certification paragraph, signature block, and a final
section reserved for applications filed from within Panama specifically
(requiring an attorney's name, signature, Cédula, and idoneidad/professional-
registration number) — out of scope, per below.

Page 1's own printed instructions read (bilingually): "Do not leave blank
spaces. In cases the interrogation does not apply to you, write 'Not
Applied' (N/A)." Per this registry's established precedent for forms
carrying this exact instruction (see `et/mor/individual-tin-registration`,
GOV-4246), this drives `required: true` for the great majority of fields —
"N/A" is itself a valid literal value satisfying a `required: true` string
field, so requiredness here reflects "must answer something," not "must
supply real data." `requiredWhen` is reserved for the handful of fields the
form itself gates on a narrower, more specific printed condition than the
blanket instruction (marital status driving spouse/partner details;
Yes/No-gated visa-history and residency follow-up fields; the
purpose-of-travel enum driving its own conditional free-text lines).

## Fields modelled

50 `fields[]` across 10 steps (Applicant's identity; Travel document;
Marital status and family; Residence and contact; Occupation; Contacts and
accommodation in Panama; Journey details; Panama visa history; Future
intentions and other residency; Declaration) plus 1 `documents[]` entry.

## Disclosed source-fidelity findings

1. **Item 2 ("Nombre usual / Usual name" and "Nombre Legal / Legal name")
   is modelled as two separate fields (`usualName`, `legalName`) whose
   relationship to item 1's already-captured full name is not further
   explained by the source.** The two labels appear as adjacent, clearly
   distinct printed boxes at the same y-position (confirmed via direct
   x/y text-position inspection: "Nombre usual" at x≈73, "Nombre Legal" at
   x≈294, both at y≈484), so they are modelled as the form's own genuine
   structure rather than merged into one field — but the form gives no
   further guidance on when a usual name would differ from the legal name
   already given in item 1. Flagged as an open interpretive question for a
   future re-verification pass with clearer official guidance, if any
   becomes available; not a blocking ambiguity since both are ordinary
   optional-content string fields under the page-1 fill-all/N/A
   instruction.
2. **Item 14 ("Declare if having any relatives or friends in Panama") is
   modelled as two independent, ungated optional fields**
   (`relative1NameRelationAddress`, `relative2NameRelationAddress`), each
   combining name/relation/address-and-phone into one field per the
   source's own printed row structure (two identical blank rows, no
   further sub-division). Unlike most of this form, item 14's own
   "Declare if..." framing is a conditional invitation, not a blanket
   fill-all instruction, so these two fields are left `required: false`
   with no fabricated boolean gate, per this registry's established
   precedent for ungated conditional fields with no printed antecedent
   checkbox (e.g. `es/maec/solicitud-visado-nacional`'s `guardianDetails`).
3. **Items 23 and 24 (prior stay in Panama; denied/revoked visa or
   residence) are each modelled as a single free-text field**
   (`previousStayInPanamaDetails`, `deniedOrRevokedVisaOrResidenceDetails`)
   rather than a boolean-plus-detail pair, because — unlike item 22, which
   prints an explicit Sí/No checkbox pair (confirmed via the rendered-page
   checkbox glyphs at the expected position) — no separate Yes/No control
   was found printed for items 23 or 24 in either the text extraction or
   the checkbox-position scan; each is a single blank the applicant fills
   directly (with "N/A" when inapplicable, per the page-1 instruction).
   Item 24's own blank is confirmed to continue onto page 3 under its own
   "Tipo de visa, permiso y fecha / Type of visa, permission and date"
   sub-heading, modelled as the same single field per the source's own
   layout rather than split across a page boundary.
4. **The form's own final section — reserved for applications presented
   from within Panama, requiring an attorney's name, signature, Cédula
   (personal identification number), and idoneidad (professional
   registration number) — is excluded from this schema**, as is the
   receiving official's own signature line. Both are administration-facing
   or in-country-specific submission-channel content, not part of the
   general applicant-facing form this schema models, consistent with this
   registry's standing precedent for excluding "reserved to the
   administration" sections (e.g. `es/maec/solicitud-visado-nacional`'s
   own "PARTE RESERVADA A LA ADMINISTRACIÓN" exclusion).
5. **All physical-signature fields are excluded**, per this registry's
   standing convention. The applicant's own certification is instead
   modelled as a boolean acknowledgement (`certificationAcknowledged`) of
   the form's printed certification paragraph, plus its accompanying
   `declarationDate`; the "name of the person who filled the form"
   (item 32) models only the name, not the accompanying signature.

## Conformance

3 valid mock scenarios — `valid-single-tourist` (an unmarried applicant
travelling alone for tourism, no conditional branches triggered);
`valid-married-family-visit-prior-visa-and-residency` (a married applicant
visiting a relative in Panama, previously authorized a Panama tourist visa,
and resident of a country other than their nationality — exercising the
`maritalStatus`-gated spouse fields, the `purposeOfTravel`-gated family-visit
detail field, the `hasBeenAuthorizedPanamaVisaBefore`-gated prior-visa-type
field, and the `isResidentOfCountryOtherThanNationality`-gated residency-
country field and its companion document); and
`valid-transit-filled-by-agent` (an applicant in transit to a third country,
form filled out by a travel agent on their behalf — exercising the
`purposeOfTravel`-gated transit-destination field and the
`formFilledByAnotherPerson`-gated filler-name field) — plus 10
mutation-control fixtures (three missing-required fixtures —
`touristLastName`, `maritalStatus`, `certificationAcknowledged`; five
missing-required fixtures exercising `requiredWhen`-gated fields correctly
triggered in their scenario — `spouseOrPartnerName`,
`previousVisaTypeDetails`, `residencyCountryIfDifferent`,
`transitDestination`, `personWhoFilledFormName`; an invalid-enum fixture for
`maritalStatus`; and an unknown-field-rejected fixture) are committed under
`conformance/pa/migracion/tourist-visa-application/1.0.0/`. An ephemeral,
from-scratch conformance checker (deriving required/requiredWhen/enum rules
directly from this schema's own `fields[]`, discarded after use, not
committed) ran all 13: both valid scenarios' non-triggered fixture at 0
errors, the two conditional-scenario valid fixtures each at 0 errors with
every gated field correctly satisfied, and all 10 mutation controls each
raising exactly 1 error of the expected kind. Validated clean with
`node tools/validate.mjs` and `node tools/validate-ajv.mjs`, individually and
as part of the full registry run (595/595 documents, including this one).
