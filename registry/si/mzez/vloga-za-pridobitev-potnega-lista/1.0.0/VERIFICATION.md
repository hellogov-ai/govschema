# Verification record — `si/mzez/vloga-za-pridobitev-potnega-lista` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-14`

This is a `GovSchema Standard Research` cycle (**GOV-2927**, following the
**GOV-2925** research cycle that pre-verified this candidate). Slovenia
already exists in the registry (opened as the 53rd jurisdiction via Business
Formation, GOV-2910); this document opens Slovenia's **Passport vertical (2
of 6)**.

## Why this candidate

Domestic passport issuance in Slovenia is confirmed in-person/biometric-only:
`e-uprava.gov.si` states "Pridobitev potnega lista je mogoče le osebno na
upravni enoti" (a passport can only be obtained in person at an
administrative unit) — no fillable domestic source document exists. However,
MZEZ (Ministrstvo za zunanje in evropske zadeve, Ministry of Foreign and
European Affairs) publishes a genuinely fillable **consular** passport
application, used when a citizen abroad applies via a diplomatic-consular
mission (DKP). It is the same underlying procedure via a distinct, sourced,
and fillable channel.

## Source re-verification (Phase 1)

- **Authority:** MZEZ (Ministrstvo za zunanje in evropske zadeve), a national
  ministry.
- **URL:** `https://www.gov.si/assets/ministrstva/MZEZ/Dokumenti/konzularne-zadeve/oddelek-za-varstvo-interesov-slovencev/PL-obrazec-vloge.pdf`
- **Retrieved / reviewed:** 2026-07-14, independently re-fetched this cycle
  with `curl -sL`, not trusted from the issue's own citation as-is.
- **HTTP status:** `200`. **Content-Type:** `application/pdf`. **Size:**
  `48,297` bytes — matches the issue's own citation exactly. **sha256:**
  `33ecd0f007dc718469dedbd4bf969808faf8ca8f9f56d2970347ebbfa96a1c7a` —
  independently computed this cycle with `sha256sum` against a fresh
  download, matching the issue's own citation exactly.
- **File type:** a genuine PDF with a real AcroForm (`%PDF` header, not a
  scanned image).
- **Extraction method:** `pdfjs-dist@3` (`legacy/build/pdf.js`), run from
  scratch this cycle in a clean scratch directory against the freshly
  re-fetched PDF: `doc.getFieldObjects()` for the field-name inventory, and
  `page.getAnnotations()` per page (subtype `Widget`) for each field's exact
  type, rect, and page. Confirmed **1 page** and **27 real `/Widget`
  fields** — exactly matching the issue's own claim (all 27 are text (`Tx`)
  fields; no checkboxes/radio groups/choice fields exist on this form).
  `getFieldObjects()`'s own field-name count (27) matched the widget count
  exactly, so there is no non-terminal-node reconciliation needed here
  (unlike, e.g., `mk/ujp/danochna-prijava-na-danokot-na-dodadena-vrednost`'s
  181-vs-161 case).
- Also independently rendered page 1 to a PNG image via `pdfjs-dist` +
  `node-canvas` (scale 3.0) and visually cross-checked the printed layout
  against the coordinate-correlation reasoning below, for every field whose
  own AcroForm field name or `alternativeText` was generic or absent.

## Field inventory (Phase 2)

All 27 `fields[]` entries and their exact source-form section/label
reference are listed inline in `schema.json`'s own `sourceRef` per field.
Every field name in the source PDF's `getFieldObjects()`/`getAnnotations()`
output is accounted for by exactly one `fields[]` entry (a strict 1:1
correspondence):

| Source field name (PDF) | Modelled as | Notes |
|---|---|---|
| `REGISTRSKA ŠTEVILKA` | `registrationNumber` | Self-describing |
| `VRSTA POTNE LISTINE` | `travelDocumentType` | Self-describing (label continues "TIP PL") |
| `fill_3` | `emsoOrBirthDateAndSex` | Generic name; `alternativeText` self-describing |
| `DRZAVLJANSTVO` | `citizenship` | Self-describing |
| `PRIIMEK` | `surname` | Self-describing |
| `IME` | `givenName` | Self-describing |
| `ROJSTNI KRAJ` | `placeOfBirth` | Self-describing |
| `fill_8` | `permanentResidence` | Generic name; `alternativeText` self-describing |
| `1` | `processingOfficialLine1` | Generic name, no printed caption — see judgment call 1 below |
| `2` | `processingOfficialLine2` | Generic name, no printed caption — see judgment call 1 below |
| `3` | `officialSerialNumber` | Generic name; caption recovered via coordinate correlation ("SERIJSKA ŠTEVILKA") |
| `FUNKCIJA  DRZAVA` | `officialFunctionCountry` | Self-describing (double space in raw field name) |
| `DATUM VLOGE` | `applicationDate` | Self-describing |
| `DATUM VELJAVNOSTI` | `validityDate` | Self-describing |
| `1_2` | `legalRepresentativeName` | Generic name; caption recovered via coordinate correlation (heading above) |
| `2_2` | `legalRepresentativeSignature` | Generic name; caption recovered via coordinate correlation (heading above) |
| `1_3` | `legalRepresentativeResidenceLine1` | Generic name; caption recovered via coordinate correlation (heading above) |
| `2_3` | `legalRepresentativeResidenceLine2` | Generic name; caption recovered via coordinate correlation (heading above) |
| `3_2` | `receivingOfficialSignature` | Generic name; caption recovered via coordinate correlation |
| `fill_21` | `deliveringOfficialSignature` | Generic name; `alternativeText` self-describing |
| `PODPIS OSEBE ki je prejela potno listino` | `recipientSignature` | Self-describing |
| `fill_23` | `deliveryMannerAndDate` | Generic name; `alternativeText` self-describing |
| `fill_24` | `receiptEmsoOrBirthDateAndSex` | Generic name; `alternativeText` self-describing |
| `PRIIMEK_2` | `receiptSurname` | Self-describing (receipt-stub duplicate) |
| `IME_2` | `receiptGivenName` | Self-describing (receipt-stub duplicate) |
| `DATUM VLOGE_2` | `receiptApplicationDate` | Self-describing (receipt-stub duplicate) |
| `PODPIS URADNE OSEBE` | `receiptOfficialSignature` | Self-describing (receipt-stub duplicate) |

### Coordinate-correlation method

Every generically-named field's rect (`page.getAnnotations()`) was compared
against the page's own text layer (`page.getTextContent()`), using the
consistent ~5.6-5.8pt vertical offset observed between every self-describing
single-line field's rect bottom (`y0`) and its own printed caption
immediately below it (e.g. `REGISTRSKA ŠTEVILKA`'s widget `y0=566.04`, its
caption at `y=560.43`, offset 5.61 — reproduced across all 8 personal-data
fields). For multi-line blocks with no per-line caption, the pattern instead
is a **heading printed above** the block (e.g. `"PRIIMEK IN IME ter podpis
zakonitega zastopnika"` at `y=365.99`, directly above field `1_2`'s
`y0=352.32`, by 13.67pt — a larger, but still consistent, offset reproduced
for the following `"STALNO PREBIVALISCE ZAKONITEGA ZASTOPNIKA"` heading
above fields `1_3`/`2_3`). The rendered page image (see above) visually
confirmed every one of these correlations, including the two-column receiving/
delivering-official-signature row and the tear-off receipt stub's own
heading ("POTRDILO O SPREJEMU VLOGE ZA IZDAJO POTNE LISTINE").

## Judgment calls

1. **`processingOfficialLine1`/`processingOfficialLine2` (source field
   names `1`/`2`) have no printed caption of their own.** They sit between
   the applicant's permanent-residence field and the captioned
   `SERIJSKA ŠTEVILKA`/`FUNKCIJA / DRZAVA` line, with no heading text
   printed above them (ruling out the heading-above-block pattern used for
   the legal-representative fields) and no per-line caption below them
   (ruling out the single-line pattern used for the personal-data fields).
   Given their position — immediately preceding a line captioned "serial
   number" and "function/country", both plausible attributes of the DKP
   official processing the entry rather than the applicant — this schema
   models them as the two-line name-identification portion of that same
   processing-official block. The rendered page image was checked for any
   faint/overlooked heading text in this region and none was found. This is
   disclosed as a lower-confidence mapping (visible text is only decisive for
   `officialSerialNumber`/`officialFunctionCountry`, not for these two
   lines' specific semantic); a future revision could re-scope them if a
   clearer specimen (e.g. a filled example) surfaces.
2. **Legal-representative block modelled as unconditionally optional.**
   Consistent with this registry's established convention for this pattern
   (see `bg/mvr/zayavlenie-za-izdavane-na-pasport`'s guardian block): the
   form prints no explicit boolean gate tying the legal-representative
   fields to a specific applicant condition (e.g. minor status), so no
   invented `requiredWhen` condition is added.
3. **Office-only fields modelled with `required: false`, not omitted.**
   `registrationNumber`, `travelDocumentType`, the processing-official
   block, `applicationDate`, `validityDate`, both officials' and the
   recipient's signature fields, `deliveryMannerAndDate`, and the entire
   five-field receipt stub are all completed by DKP staff during/after
   processing, not by the applicant at submission time. They are modelled
   (per the instruction to model all 27 fields faithfully) but marked
   `required: false`, with each field's own `description` stating who
   completes it.
4. **Signature fields modelled as `type: string`.** Every "PODPIS ..." field
   is a plain AcroForm text widget (not a `documents[]` image attachment),
   so each is modelled as a `string` field standing in for a physical
   signature — this registry's established convention for paper-form
   signature blocks (see `bg/mvr/zayavlenie-za-izdavane-na-pasport`'s
   `applicantSignature`/`guardian1Signature` precedent).
5. **No `documents[]` entries.** Unlike several sibling passport schemas,
   this specimen's photo-attachment and signature-box instructions
   ("Prilepi fotografijo", "Podpišite se znotraj označenega mesta") are
   printed guidance with no corresponding AcroForm widget of any kind
   (confirmed: no widget exists in the relevant page region) — they describe
   a physical, in-person completion step rather than a fillable or
   attachable field, so no `documents[]` entry was invented for them.

## Cross-check against the Trieste-consulate mirror

The issue also cites a near-identical Trieste-consulate mirror (34 widgets,
sha256 `143101d86b232d7639a3c67a9b57a3a0711e71bc0d9fb4828028d1f67aa2cd76`) as
a cross-check only. This document does not re-fetch that mirror independently
this cycle (out of scope — the MZEZ-hosted 27-widget version is the canonical
`source` per the issue brief); its extra fields (beyond this 27) are not
modelled here.

## Dead ends confirmed this cycle (not re-screened, carried from the issue brief)

- **DMV** (vehicle registration): both `e-uprava.gov.si` specimens the issue
  cites have 0 AcroForm widgets — printed "IZPOLNI REGISTRACIJSKA
  ORGANIZACIJA" (to be filled in by the registration organization/clerk).
  Electronic path is SI-PASS login-gated.
- **Visa**: the long-stay Type D form has 0 widgets (print-and-lodge only,
  confirmed by gov.si's own page); the Schengen short-stay C-visa form is a
  genuine 144-widget AcroForm but a confirmed field-for-field duplicate of
  the already-modelled EU-harmonized template (`gr/mfa/application-for-schengen-visa`,
  `at/bmeia/schengen-visa-application`, `fr/france-visas/schengen-visa-application`).
- **National ID** and **Taxes** remain open backlog (sibling candidates
  identified in the same GOV-2925 cycle, authored via parallel child issues).

## Conformance

- `node tools/validate.mjs` — passes.
- `node tools/validate-ajv.mjs` — passes.
- `tools/govschema-client/registry-index.json` regenerated via
  `npm run build-index` and diffed — only this document's entry added.
