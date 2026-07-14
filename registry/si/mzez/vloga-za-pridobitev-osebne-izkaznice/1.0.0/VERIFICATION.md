# Verification record — `si/mzez/vloga-za-pridobitev-osebne-izkaznice` v1.0.0

This file is the **source-review record** for this document version, per the
`manual-source-review-v1` practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-14`
- **`maturity.level`:** `structural-reference`

This is GovSchema Standard Research cycle **GOV-2928** (parent GOV-2925,
"GovSchema Standard Research"). This schema advances Slovenia's National ID
& Civic Documents vertical via MZEZ's consular-channel personal-ID-card
application, the sibling deliverable to the same cycle's consular passport
application (`si/mzez/vloga-za-pridobitev-potnega-lista`, GOV-2927) — same
MZEZ diplomatic-mission (DKP) application family, scoped to the ID-card
(osebna izkaznica) pathway instead.

## Source verification (independently re-fetched and re-derived this cycle)

- **Fetched file:**
  `https://www.gov.si/assets/ministrstva/MZEZ/Dokumenti/konzularne-zadeve/oddelek-za-varstvo-interesov-slovencev/IO-obrazec-vloge.pdf`
  — re-fetched fresh this cycle, not reused from any cached copy.
  - **HTTP 200**, `Content-Type: application/pdf`, **116,487 bytes**.
  - **`sha256`:** `94d121358473a27684b87de61418ff8646590bdcfaf629e91dbff94687046a85`
    (computed directly against this cycle's own freshly-fetched bytes) —
    matches the issue brief's own claim exactly.
- **Extracted with `pdfjs-dist`** (`getFieldObjects()` and
  `page.getAnnotations()` per page). Confirmed **1 page** and **31 real
  `/Widget` fields**, exactly matching the issue's own claim. All 31 are
  text (`Tx`) fields; no checkboxes/radio groups/choice fields exist on this
  form. `getFieldObjects()`'s own field-name count (31) matched the widget
  count exactly, so no non-terminal-node reconciliation was needed.
- Every one of the 31 fields extracts with a **generic AcroForm field
  name** (`undefined`, `undefined_2`, ... `undefined_31`), confirming the
  issue brief's own caveat. Coordinate-correlation (below) was required to
  assign every field's real identity.
- Also independently rendered page 1 to a PNG image via `pdfjs-dist` +
  `node-canvas` (scale 3.0) and visually cross-checked the printed layout
  against the coordinate-correlation reasoning below, including several
  close-cropped zooms of specific regions to confirm exact caption text
  (see "TIP OI" discovery below).
- **Cross-checked the Bern-embassy mirror the issue cites**
  (`gov.si/assets/predstavnistva/bern/dokumenti/Obrazec_vloge_OI.pdf`,
  sha256 `8552be8c...` per the issue) only by relying on the issue's own
  claim of 0 widgets (a flattened scan) — not re-fetched independently this
  cycle, as it is out of scope (the MZEZ-hosted 31-widget version is the
  canonical `source`).

## Coordinate-correlation method

Every field's rect (`page.getAnnotations()`) was compared against the
page's own text layer (`page.getTextContent()`), using the same
~5.6–6.4pt vertical-offset pattern established by the passport sibling
schema's own VERIFICATION.md: a single-line field's rect bottom (`y0`) sits
just above its own printed caption immediately below it (e.g. field `36R`'s
`y0=566.16`, caption "REGISTRSKA ŠTEVILKA" at `y=560.4`, offset 5.76 —
reproduced across every single-line personal-data field). For multi-line
blocks, a caption sits **between** an above-line and one or more
below-lines (e.g. "STALNO PREBIVALIŠČE" at `y=463.2`, with field `43R`
directly above at `y1=469.08` and fields `44R`/`45R` continuing below at
`y1=463.32`/`y1=444` respectively — a 3-line address block). The rendered
page image visually confirmed every correlation, including a discovery not
apparent from the text layer alone (below).

### The "TIP OI" / "DRŽAVLJANSTVO" discovery

The rendered PNG showed two printed captions with their own underlines —
"TIP OI" (beside "VRSTA OSEBNE IZKAZNICE") and "DRŽAVLJANSTVO" (beside
"SPOL") — that do **not** appear anywhere in `getTextContent()`'s output
(confirmed by an exhaustive dump of every text item on the page; neither
string appears). Cross-checked against `getAnnotations()`: no widget rect
exists at either caption's position. This means these two blanks are
**printed guidance lines with no backing AcroForm field at all** — not
missed by extraction, genuinely absent from the form's fillable structure.
Both are excluded from this schema's `fields[]` (there is nothing to
model); see this schema's own field list, which has no `idCardTypeCode` or
`citizenship` entry. This is a genuine structural difference from the
passport sibling specimen, whose own equivalent row **does** carry a real
`DRZAVLJANSTVO` widget (self-describing AcroForm field name, confirmed via
the passport sibling's own widget dump) — different specimens, not a
missed field on this one.

### Cross-reference against the passport sibling specimen

The passport sibling schema's own source PDF (a different, 27-widget
specimen from the same MZEZ family, with **self-describing** AcroForm field
names rather than this specimen's fully generic ones) was used as a
cross-check for several otherwise-ambiguous captions on this specimen,
since the two forms share near-identical administrative-tracking rows:

- The passport specimen's widget at the position equivalent to this
  specimen's field `46R` carries the self-describing name
  `SERIJSKA ŠTEVILKA` — confirming `46R`'s own coordinate-correlated
  caption reading ("Serijska številka").
- The passport specimen's widget at the position equivalent to this
  specimen's field `48R` carries the self-describing name
  `FUNKCIJA  DRZAVA` (function/country, double space in the raw field
  name). This specimen's own text layer shows only "FUNKCIJA" (no
  "DRZAVA") at the equivalent position — a genuine per-specimen difference,
  not an extraction gap (confirmed by an exhaustive text-layer dump finding
  no "DRZAVA"/"DRŽAVA" string anywhere on the page).
- The passport specimen's own signature-instruction box ("Podpišite se
  znotraj označenega mesta") and photo-instruction area ("Prilepi
  fotografijo") have **zero** corresponding widgets (per that schema's own
  VERIFICATION.md, judgment call 5). On this specimen, the signature box
  **does** have a real widget (field `35R`, the large box at the top of the
  form) — confirmed independently via this cycle's own `getAnnotations()`
  dump, not merely inferred from the passport's absence. The photo area
  ("Prilepi fotografijo") has no widget on this specimen either, matching
  the passport sibling.
- A close crop of the office-signoff row confirmed this specimen's field
  `58R` caption reads **"PODPIS URADNE OSEBE, ki je prejela OI"**
  (signature of the *official* who received the ID card) — explicitly
  including "URADNE" (official). This differs from the passport sibling's
  own equivalent field, captioned "PODPIS OSEBE ki je prejela potno
  listino" (signature of the *person* who received the passport, without
  "uradne"), which that schema models as the applicant/recipient's own
  signature. Given the explicit "URADNE OSEBE" wording confirmed by direct
  visual inspection of this specimen, field `58R` is modelled here as
  `cardReceivingOfficialSignature` (an office-only field, distinct in kind
  from the passport sibling's `recipientSignature`), not copied blindly
  from the sibling's naming.

## Field inventory

All 27 `fields[]` entries and their exact source-form section/label
reference are listed inline in `schema.json`'s own `sourceRef` per field.
Every one of the 31 AcroForm widgets is accounted for by exactly one
`fields[]` entry, with three fields each spanning multiple widgets
(`permanentResidence`: 3 widgets; `legalRepresentativeResidence`: 3
widgets) and the remaining 25 fields each mapping 1:1 to a single widget:

| Source field (by rect position) | Modelled as | Notes |
|---|---|---|
| `34R` (top box, above "Naziv DKP") | `dkpName` | Caption below the box |
| `35R` (top-right bordered signature box) | `applicantSignature` | Caption above the box ("Podpišite se znotraj označenega mesta") |
| `36R` | `registrationNumber` | Caption below the box ("REGISTRSKA ŠTEVILKA") |
| `37R` | `idCardType` | Caption below the box ("VRSTA OSEBNE IZKAZNICE") |
| `38R` | `emsoOrBirthDateAndSex` | Caption below the box |
| `39R` | `sex` | Caption below the box ("SPOL") |
| `40R` | `surname` | Caption below the box ("PRIIMEK") |
| `41R` | `givenName` | Caption below the box ("IME") |
| `42R` | `placeOfBirth` | Caption below the box ("ROJSTNI KRAJ") |
| `43R`/`44R`/`45R` | `permanentResidence` | Caption between line 1 (above) and lines 2–3 (below) |
| `46R` | `officialSerialNumber` | Caption below the box ("SERIJSKA ŠTEVILKA"); cross-confirmed against passport sibling |
| `48R` | `officialFunction` | Caption below the box ("FUNKCIJA"); cross-confirmed against passport sibling |
| `47R` | `applicationDate` | Caption below the box ("DATUM VLOGE") |
| `49R` | `validityDate` | Caption below the box ("DATUM VELJAVNOSTI") |
| `50R` | `legalRepresentativeName` | Heading below the box ("PRIIMEK IN IME ter podpis zakonitega zastopnika") |
| `51R` | `legalRepresentativeSignature` | Same heading, second line |
| `52R`/`53R`/`54R` | `legalRepresentativeResidence` | Heading between line 1 (above) and lines 2–3 (below) |
| `55R` | `receivingOfficialSignature` | Caption below the box |
| `56R` | `deliveryMannerAndDate` | Caption below the box |
| `57R` | `deliveringOfficialSignature` | Caption below the box |
| `58R` | `cardReceivingOfficialSignature` | Caption below the box; see cross-reference discussion above |
| `59R` | `receiptRegistrationNumber` | Receipt-stub section |
| `60R` | `receiptEmsoOrBirthDateAndSex` | Receipt-stub section |
| `61R` | `receiptSurname` | Receipt-stub section |
| `62R` | `receiptGivenName` | Receipt-stub section |
| `63R` | `receiptApplicationDate` | Receipt-stub section |
| `64R` | `receiptOfficialSignature` | Receipt-stub section |

## Judgment calls

1. **Every widget-backed field is modelled, including office-only ones,
   marked `required: false` rather than omitted.** `registrationNumber`,
   `idCardType`, `officialSerialNumber`, `officialFunction`,
   `applicationDate`, `validityDate`, both officials' signature fields, the
   delivery-manner field, and the entire six-field receipt stub are all
   completed by DKP staff during/after processing, not by the applicant at
   submission time. This mirrors the passport sibling schema's own
   established convention (its judgment call 3) for the same reasoning:
   model faithfully, mark optional, describe who completes each one.
2. **`idCardType` and `officialFunction`/`officialSerialNumber` classified
   as office-completed based on 13. člen ZOIzk-1's own explicit content
   ordering.** The Zakon o osebni izkaznici (ZOIzk-1) prescribes this
   document's content in a fixed order: issuer mark/name, registration
   number, serial number, ID-card type — all four listed together, ahead of
   the applicant's own personal-data fields (EMŠO, surname, given name,
   permanent residence). This registry reads that grouping as the law's own
   confirmation that these four are issuer/administrative content, not
   applicant declarations, and models them accordingly.
3. **`sex` modelled as `required: true`, distinct from
   `emsoOrBirthDateAndSex`.** Unlike the passport sibling specimen (which
   has no separate sex widget), this specimen prints "SPOL" as its own
   field beside the EMŠO/birth-date field. Since a personal ID card always
   records sex regardless of whether EMŠO is known, this is modelled as
   unconditionally required, not gated to the EMŠO-absent case implied by
   the neighbouring caption's own parenthetical.
4. **Legal-representative block modelled as unconditionally optional.**
   Consistent with this registry's established convention for this pattern
   (see `bg/mvr/zayavlenie-za-izdavane-na-pasport`'s guardian block and the
   passport sibling's own identical treatment): the form prints no explicit
   boolean gate tying the legal-representative fields to a specific
   applicant condition (e.g. minor status), so no invented `requiredWhen`
   condition is added.
5. **Multi-line address blocks modelled as a single field each.**
   `permanentResidence` and `legalRepresentativeResidence` each span three
   printed lines but are modelled as one string field apiece, per this
   registry's established convention (e.g. `bg/mvr`'s own `address` field)
   — chosen deliberately over the passport sibling's own lower-confidence,
   internally-inconsistent line-splitting for its analogous fields (that
   schema's own judgment call 1 self-discloses this as a lower-confidence
   mapping).
6. **Signature fields modelled as `type: string`.** Every "PODPIS ..."
   field is a plain AcroForm text widget (not a `documents[]` image
   attachment), so each is modelled as a `string` field standing in for a
   physical signature — this registry's established convention for
   paper-form signature blocks.
7. **`applicantPhoto` modelled as a `documents[]` entry despite no
   corresponding AcroForm widget.** "Prilepi fotografijo" (paste photo) is
   printed guidance with no fillable field of any kind (confirmed: no
   widget exists in the relevant page region), describing a physical,
   in-person completion step. This registry's `documents[]` category exists
   precisely to record such required non-field attachments (e.g. `bg/mvr`'s
   own `applicantPhoto`/`signatureSpecimen` entries), so one is included
   here — a deliberate departure from the passport sibling schema's own
   choice to omit any `documents[]` entry for its equivalent instruction.
8. **`TIP OI` and `DRŽAVLJANSTVO` captions excluded entirely, not
   modelled with `required: false`.** Unlike the office-only *widget*
   fields above, these two captions have **no backing AcroForm widget at
   all** on this specimen (confirmed via `getAnnotations()`) — there is
   nothing to model, per this registry's "don't invent a field with no
   widget behind it" precision principle. See the "TIP OI" discovery
   section above.

## Dead ends confirmed this cycle (not re-screened, carried from the issue brief)

See the passport sibling child issue (GOV-2925 research) for Slovenia's DMV
and Visa dead-end evidence — both confirmed 0-widget/duplicate this cycle.

## Conformance

- `node tools/validate.mjs` — passes (438/438).
- `node tools/validate-ajv.mjs` — passes (438/438 against the v0.3
  meta-schema).
- `tools/govschema-client/registry-index.json` regenerated via
  `npm run build-index` and diffed — only this document's entry added.

GovSchema is an independent, non-profit standards body and is not
affiliated with, endorsed by, or operated by the Government of Slovenia or
the Ministrstvo za zunanje in evropske zadeve.
