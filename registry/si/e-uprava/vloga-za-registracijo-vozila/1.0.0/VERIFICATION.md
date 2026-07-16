# Verification record — `si/e-uprava/vloga-za-registracijo-vozila` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-16`

This is a `GovSchema Standard Research` cycle (**GOV-3246**), authored under
child issue **GOV-3248**. Slovenia already exists in the registry (opened as
the 53rd jurisdiction via Business Formation, GOV-2910, and expanded through
Passport/GOV-2927, National ID/GOV-2928, and Taxes/GOV-2929); this document
opens Slovenia's **DMV vertical (5 of 6)**.

## Background: this issue's own crash-recovery history

The background agent originally dispatched for this issue crashed mid-run
before writing any real work (checked its worktree: HEAD still at the
pre-existing main tip, no commits, no stash, no untracked files — a clean
disk-corruption artifact of the crash, not lost work). A retry agent was
dispatched and crashed the same way, again with nothing salvageable in either
of the two worktrees it touched. Rather than dispatch a third background
attempt, this document was authored directly in the main session, with every
sourcing claim independently re-derived from scratch below.

## Why this candidate

Slovenia's DMV vertical (vehicle registration and driving licences) had never
been screened in any prior research cycle. `e-uprava.gov.si` (Slovenia's
national e-government portal) publishes a static, unauthenticated, directly
downloadable PDF specimen — "Vloga za registracijo vozila" — for vehicle
registration and related procedures. Driving-licence issuance
(vozniško dovoljenje) was screened the same cycle and confirmed a dead end:
`e-uprava.gov.si` states the application "is filed directly (in person) at
the administrative unit," requiring the applicant's signature before an
official, with no static downloadable specimen for that flow. This document
is scoped to vehicle registration only.

## Source re-verification

- **Authority:** the form is agency-agnostic — Slovenian vehicle registration
  is carried out at a "registracijska organizacija" (registration
  organization, typically an authorized garage or the AMZS), not a single
  national motor-vehicle agency. The form itself names only a blank header
  line for whichever organization processes it.
- **Primary URL:**
  `https://e-uprava.gov.si/.download/vloge/datoteka?file=14670`, linked from
  the eUprava vehicle-registration hub page
  (`https://e-uprava.gov.si/si/podrocja/promet/vozniki-in-vozila/registracija-vozila.html`).
- **Retrieved / reviewed:** 2026-07-16, independently re-fetched with `curl`.
- **HTTP status:** `200`. **Content-Type:** `application/pdf;charset=UTF-8`.
  **Size:** `66,363` bytes. **sha256:**
  `e1b53c075ae40ff9e8a5d3c6df71b8dca0a26767142bc71fad9e498236cda032`
  (computed via `hashlib.sha256` in Python against the fresh download).
- **File type:** a genuine PDF (`%PDF-1.5` header) with an embedded, directly
  extractable text layer — confirmed via `pdfjs-dist@3.11.174`
  (`legacy/build/pdf.js`), `getTextContent()`/`getAnnotations()` for both
  pages. **2 pages, 0 AcroForm annotations on either page** — a static
  print-and-fill specimen, not a fillable PDF form.
- **Companion `.docx`:** a second, editable specimen with byte-identical text
  content is served from the same host at
  `https://e-uprava.gov.si/.download/vloge/datoteka?file=19579` (HTTP 200,
  `application/vnd.openxmlformats-officedocument.wordprocessingml.document`,
  9,761 bytes). Used to cross-check field ordering and labels by extracting
  `word/document.xml` from the `.docx` zip archive and stripping XML tags —
  every field label matched the PDF's own extracted text exactly.

## Field extraction and the "Postopek" checkbox gap

Both pages' text extracted cleanly via `pdfjs-dist` and matched the `.docx`
text byte-for-byte in content. One region required additional verification:
the "Postopek:" (Procedure) label on page 1 is followed by a large vertical
gap (from y≈540.9 to y≈463.9 in PDF coordinates) with no extractable text in
between — the same "vector-drawn form grid with no text layer" pattern this
registry has hit before (see `do/mirex/passport-application`'s VERIFICATION.md).
Rendered page 1 at 3x scale via `node-canvas` + `pdfjs-dist`'s
`page.render()` and cropped the exact region: **the box is genuinely blank**
— no printed checkbox options, no enumerated procedure-type labels of any
kind, just ruled lines. `procedureDescription` is therefore modelled as a
free-form string field, not `type: "enum"`, since the source itself provides
no closed vocabulary to cite — asserting an enum here would be a fabricated
constraint the form does not support.

## Field inventory

All fields are accounted for and sourced from the form text (numbered
section labels — (C1), (C2), (D), (E) — are the form's own; unlabelled
fields are cited by their printed Slovenian text):

| Form field | Modelled as | Notes |
|---|---|---|
| (A) registrska oznaka vozila | `existingVehicleRegistrationMark` | Optional — the vehicle's existing plate, relevant for change/transfer/de-registration procedures |
| (C1.1/C1.2) Priimek in ime – naziv | `vehicleUserName` | Required |
| (C1) EMŠO / MŠ | `vehicleUserIdNumber` | Required |
| (C1.3) Stalno ali začasno prebivališče – sedež | `vehicleUserAddress` | Required |
| (C2.1/C2.2) Priimek in ime – naziv | `vehicleOwnerName` | Required |
| (C2) EMŠO / MŠ | `vehicleOwnerIdNumber` | Required |
| (C2.3) Stalno ali začasno prebivališče – sedež | `vehicleOwnerAddress` | Required |
| Postopek: | `procedureDescription` | Required free-text (blank box, no printed options — see above) |
| (D1) Znamka | `vehicleBrand` | Required |
| (D.3) Komercialna oznaka | `vehicleCommercialDesignation` | Required |
| (E) Identifikacijska številka vozila (VIN) | `vehicleIdentificationNumber` | Required |
| Priloge: Registrske tablice | `attachmentPlatesEnclosed` | Optional boolean |
| Priloge: Prometno dovoljenje | `attachmentTrafficPermitEnclosed` | Optional boolean |
| Priloge: Dokazilo o lastništvu | `attachmentProofOfOwnershipEnclosed` | Optional boolean |
| Priloge: Potrdilo o uničenju vozila | `attachmentDestructionCertificateEnclosed` | Optional boolean |
| Priloge: Zavarovalna pogodba | `attachmentInsuranceContractEnclosed` | Optional boolean |
| Priloge: Drugi dokumenti | `otherDocumentsDescription` | Optional free-text |
| Kraj in datum | `placeAndDateOfApplication` | Required |
| (p.2) Izjava o razlogih za zamenjavo … | `reasonForReplacementOrDeregistration` | Optional — applicable to plate/permit replacement or de-registration only |
| (p.2) Datum spremembe lastništva | `ownershipChangeDate` | Optional `date` — applicable to ownership transfer only |
| (p.2) EMŠO / MŠ starega lastnika vozila | `previousOwnerIdNumber` | Optional — applicable to ownership transfer only |
| (p.2) Priimek in ime – naziv starega lastnika vozila | `previousOwnerName` | Optional — applicable to ownership transfer only |
| (p.2) Naslov starega lastnika vozila | `previousOwnerAddress` | Optional — applicable to ownership transfer only |
| (p.2) Odjavljeno vozilo se nahaja na naslovu | `deregisteredVehicleLocationAddress` | Optional — applicable to de-registration/location-update only |
| (p.2) Opis (Sprememba podatkov o vozilu) | `vehicleDataChangeDescription` | Optional free-text |
| (p.2) declaration statement | `documents[].truthfulnessDeclaration` | Required attestation, exact statement text quoted verbatim |

## Judgment calls

1. **Registration-organization header and entry number excluded as
   office-assigned.** The form's own top two lines ("Šifra in naziv
   registracijske organizacije" and "(1A) Številka vpisa") sit directly
   above the applicant-data sections and read as a letterhead/tracking
   number pair analogous to this form's own later
   "IZPOLNI REGISTRACIJSKA ORGANIZACIJA" block, not applicant-submitted
   data. Excluded, consistent with this registry's convention of excluding
   office-only/system-assigned identifiers.

2. **Conditional page-2 fields modelled as optional, not `requiredWhen`.**
   The form itself bundles four logically distinct procedures onto one
   specimen (replacement/de-registration reason, ownership transfer,
   de-registered-vehicle location, other data change), each populated only
   when that specific procedure applies. Rather than infer a `requiredWhen`
   condition keyed off the free-text `procedureDescription` field (which has
   no closed vocabulary to gate on — see above), these are all marked
   `required: false`, per this registry's established convention for
   source-conditional fields with no enumerable gating value (see
   `si/mzez/vloga-za-dolgorocni-vizum`'s `residencePermitNumber` for the same
   pattern).

3. **Office-only sections and signatures excluded.** The entire
   "IZPOLNI REGISTRACIJSKA ORGANIZACIJA" block (remarks, office place/date,
   official's name, stamp) and both officials' identity-verification lines
   in the page-2 ownership-change block are excluded as office-only, per this
   registry's established convention. The owner/user's and previous owner's
   signature lines are excluded as physical wet-ink marks; unlike several
   other schemas in this registry (e.g. `np/dop/mrp-offline-application-form`),
   there is no separate signature-adjacent date to retain here — the
   applicable dates (`placeAndDateOfApplication`, `ownershipChangeDate`) are
   already modelled as their own fields.

4. **Declaration statement captured as a `documents[]` attestation entry,
   not a field.** Page 2's legal declaration ("V skladu z določbo zakona...")
   is quoted verbatim in `documents[].statement`, consistent with this
   registry's established treatment of exact attestation text (GSP practice).

## Fixture design rationale

Five conformance fixtures are included under
`conformance/si/e-uprava/vloga-za-registracijo-vozila/1.0.0/`:

1. **`valid-minimal-first-registration.json`:** every required field only,
   modelling a straightforward first registration (no ownership-transfer or
   attachment data).
2. **`valid-full-ownership-transfer.json`:** all required fields plus the
   full optional ownership-transfer block, attachments checklist, and
   existing plate number — modelling a used-vehicle ownership transfer.
3. **`mutation-control-missing-required-field.json`:** omits the required
   `vehicleIdentificationNumber`.
4. **`mutation-control-invalid-type-attachment-boolean.json`:** sets
   `attachmentTrafficPermitEnclosed` to the string `"yes"` instead of a
   boolean.
5. **`mutation-control-invalid-date-format.json`:** sets `ownershipChangeDate`
   to `"10-07-2026"` (DD-MM-YYYY) instead of the ISO `YYYY-MM-DD` shape.

All 5 fixtures were independently checked against an ad hoc ajv schema built
directly from this document's own `fields[]`
(`required`/`type`/`validation.pattern`/`validation.enum`, plus a
`^\d{4}-\d{2}-\d{2}$` pattern for `type: "date"` fields, since this registry's
spec does not define a `format` keyword): both valid fixtures raise 0 errors,
and each mutation-control fixture raises exactly 1 error, matching its own
filename.

## Verification summary

- **Source authenticity:** live, unauthenticated, directly downloadable PDF
  and `.docx` from Slovenia's own eUprava e-government portal.
- **Structure:** 2-page static specimen, 0 AcroForm widgets, clean bilingual-
  free (Slovenian-only) text layer.
- **Field extraction:** all printed field labels accounted for; the one
  unlabelled region ("Postopek") independently confirmed blank via a
  high-resolution render, not guessed or assumed.
- **Meta-schema conformance:** `node tools/validate.mjs` and
  `node tools/validate-ajv.mjs` both pass 494/494 documents (this schema
  included, on this branch which does not yet include the separately-PR'd
  `si/mzez/vloga-za-dolgorocni-vizum`). `tools/govschema-client/registry-index.json`
  regenerated.
- **Maturity:** Structural-reference (draft status) — schema captures the
  form's published structure without execution testing or agent-ready
  validation.

## Commit metadata

- **Issue:** GOV-3248 (Slovenia DMV vertical authoring, delegated from
  GOV-3246)
- **Branch:** `gov-3248-si-dmv-vehicle-registration`
- **Related issues:** GOV-3246 (research cycle), GOV-3249 (Slovenia Visa,
  authored in parallel), GOV-2910/GOV-2927/GOV-2928/GOV-2929 (Slovenia's
  other four verticals)

---

**Next steps:** registry merge via the standard review-gate process (a
"Review gate: GOV-3248 (PR #N)" issue for a human/reviewer to merge — this
document is never self-merged).
