# Verification record — `lt/vrk/prasymas-irasyti-i-rinkeju-sarasa` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-14`

This is a `GovSchema Standard Research` cycle (**GOV-3015**). Lithuania
opened via GOV-2969's Taxes schema, and stood at 2 of 6 verticals (Business
Formation, Taxes) at the start of this cycle, with DMV/Passport/Visa all
confirmed dead ends in this and prior cycles (GOV-2986, GOV-2995, GOV-3000,
GOV-3010: in-person/biometric-only issuance or MIGRIS-login-gated, no static
downloadable form). This document opens Lithuania's **National ID & Civic
Documents vertical**, following this registry's established precedent of
modelling voter-registration processes under this vertical (e.g. South
Korea's `kr/nec/overseas-voter-registration`).

## Pre-scouted candidate (re-verified from scratch this cycle)

A prior scouting pass (GOV-3010) identified Form F5, "Prašymas įrašyti į
rinkėjų sąrašą" (Application to Be Entered on the Voters' List), approved by
the Central Electoral Commission's (VRK) decision No. Sp-80, Annex 5, dated
2022-09-14, as a strong candidate, reporting a Wayback capture URL, an
approximate size (~913 KB), 2 pages, no AcroForm, and a rough field list.
Per this cycle's own standing instruction, none of those figures were
trusted as-is; every claim below was independently re-derived.

## Source re-verification (Phase 1)

- **Live URL status:** `https://www.rinkejopuslapis.lt/documents/10508/1233479/Sp-80+5+priedas+F5+forma.pdf/...`
  returns Cloudflare `403` on direct fetch, as reported. Not usable as the
  `source.url`.
- **Wayback capture used:**
  `http://web.archive.org/web/20230127182359/https://www.rinkejopuslapis.lt/documents/10508/1233479/Sp-80+5+priedas+F5+forma.pdf/f64b155c-d85c-432c-8bc0-df8c0736748f`
- **Retrieved / reviewed:** 2026-07-14, independently re-fetched this cycle
  with `curl -sL` (per this repo's own gotcha: `WebFetch` hard-fails on
  `web.archive.org` URLs directly).
- **HTTP status:** `200`. **Content-Type:** `application/pdf`. **Size:**
  `960,453` bytes (differs from the scouting report's rough "~913KB"
  estimate — see reconciliation below). **sha256:**
  `0641521d1b192509e1ed0d023c2a2443ce248280d0fa613d0d6016d42d049137` —
  independently computed this cycle with `sha256sum` against a fresh
  download, not trusted from any reported hash.
- **Authenticity check:** a `curl -I` against the same Wayback capture
  (`.../id_/...` rendering) returns
  `x-archive-orig-content-length: 960453` and
  `x-archive-orig-last-modified: Mon, 09 Jan 2023 14:40:50 GMT` — the
  archived response's own origin headers confirm 960,453 bytes is the
  authentic original size, not a Wayback artifact. The scouting report's
  "~913KB" was evidently an approximation (913,152 bytes appears as the
  **compressed** WARC record length in the CDX index, `T6HX7PP5ZANKNNTSAKDNO7AQ7GB5SEOB`/913152 — a different, smaller number than the actual
  960,453-byte PDF content-length; this cycle's own figure is the one
  verifiable against the origin server's own header, not the CDX
  approximation).
- **Freshest capture confirmed:** queried the Wayback CDX API
  (`web.archive.org/cdx/search/cdx?url=rinkejopuslapis.lt/documents/10508/1233479/Sp-80*`)
  this cycle — exactly **one** snapshot exists for this URL
  (`20230127182359`), so the pre-scouted capture is also the only/freshest
  one available.
- **Still linked from vrk.lt:** fetched a 2023-12-01 Wayback capture of
  `https://www.vrk.lt/prasymai-vrk` this cycle
  (`http://web.archive.org/web/20231201223915/https://www.vrk.lt/prasymai-vrk`,
  HTTP 200) and confirmed it lists "... rinkėjų sąrašą (Forma F5) (PDF)"
  linking to the same `f64b155c-d85c-432c-8bc0-df8c0736748f` document,
  matching the scouting report's claim.
- **File type / structure:** independently re-extracted this cycle via
  `pdfjs-dist@3` (`legacy/build/pdf.js`) from a clean scratch directory, not
  trusted from the scouting report as-is. Confirmed **2 pages**. Confirmed
  `getFieldObjects()` returns `null` (no AcroForm at all) and
  `page.getAnnotations()` returns **0 entries on both pages** — a pure
  print/hand-fill specimen, not merely a sparse AcroForm.
- **Checkbox structure independently derived:** since checkbox squares are
  drawn as vector graphics, not text or widget annotations, this cycle used
  `page.getOperatorList()` to locate every `constructPath` rectangle-drawing
  operation on page 1 and correlate its coordinates against the nearby text.
  This located exactly **8 small (14.173pt) checkbox squares**: 2 next to the
  applicant-facing "1. Šį adresą esu deklaravęs" / "2. Faktiškai gyvenu šiuo
  adresu" declaration pair (y≈389.4, x≈169.8/474.1), and 6 belonging to the
  office-only section — one next to "Asmuo yra įrašytas..." (y≈220.7), one
  next to "Asmuo nėra įrašytas..." (y≈175.3), and 4 forming the commission's
  "A B C D" decision-code row (y≈75.6, x≈180.2/216.1/251.9/287.4; only one
  further "A B C D" row exists, on page 2, as a legend header confirmed to
  carry zero checkbox-sized rectangles — not a fillable checkbox). This
  independently confirms
  the applicant-facing declaration pair is exactly 2 checkboxes, and that
  every other checkbox on the form belongs to the excluded office-only
  section.

## Field inventory (Phase 2)

All 21 `fields[]` entries and their exact source-form location are listed
inline in `schema.json`'s own `sourceRef` per field. Summary by section:

| Section (page) | Representative fields | Modelled scope |
|---|---|---|
| Header addressee (p.1) | `addresseeDistrictCommissionName`/`Number`, `addresseePrecinctCommissionName`/`Number` | Full — `required: false` (see judgment call 1) |
| Applicant identity (p.1) | `name`, `surname`, `personalCode`, `dateOfBirth`, `idDocumentNumber` | Full |
| Address (p.1, "Mano adresas:") | `street`, `houseNumber`, `apartmentNumber`, `villageOrTown`, `eldership`, `city`, `district` | Full — `street`/`houseNumber` required, the rural/urban-alternative components optional (see judgment call 2) |
| Residence declaration (p.1) | `declaredAddressConfirmed`, `actualResidenceConfirmed`, `explanationsAndEvidence` | Full — both checkboxes `required: false` (see judgment call 3) |
| Contact / signature (p.1) | `phoneNumber`, `signatureDate` | Full |

Total: **21 `fields[]`** entries (5 unconditionally `required: true`:
`name`, `surname`, `personalCode`, `dateOfBirth`, `idDocumentNumber`, plus
`street`, `houseNumber`, and `signatureDate` — 8 total required; the
remaining 13 are all `required: false`). No `documents[]` array is
published (see judgment call 4).

### Per-section tally (independent cross-check against the 21-field claim)

- Header addressee: 4
- Applicant identity: 5
- Address: 7
- Residence declaration: 3
- Contact/signature: 2
- 4 + 5 + 7 + 3 + 2 = **21**, matching the schema's own `fields[]` length
  exactly.

## Judgment calls disclosed

1. **The four addressee fields (`addresseeDistrictCommissionName`/`Number`,
   `addresseePrecinctCommissionName`/`Number`) are all `required: false`.**
   The form prints these as blank lines in its own header ("______
   apygardos rinkimų komisijai Nr. ____" / "(Prašymas įteikiamas ______
   apylinkės rinkimų komisijai Nr. ____ )"), but it is ambiguous from the
   form's own text whether the applicant fills these in themselves (if they
   know their district/precinct commission numbers) or whether these are
   pre-printed by whichever office distributes the blank form to a given
   precinct. Modelled as optional data fields rather than omitted, since
   they are genuine blanks on the form, or fabricated as required, which the
   form's own text does not support either way.
2. **Address components beyond `street`/`houseNumber` are all
   `required: false`.** The form prints two alternative addressing schemes
   side by side on the same lines — an urban one (`city`/`miestas`) and a
   rural one (`villageOrTown`/`eldership`/`district`) — with no explicit
   toggle field distinguishing which applies. Since exactly one scheme
   would be filled in per applicant and the form itself encodes no
   discriminator field to gate a `requiredWhen` condition on, each optional
   component is left `required: false` with a `description` explaining its
   urban-vs-rural role, consistent with this registry's established
   caution around fabricating an unstated condition (the prior `notEquals
   ""` incident).
3. **`declaredAddressConfirmed`/`actualResidenceConfirmed` are both
   `required: false`, and `explanationsAndEvidence` carries no
   `requiredWhen`.** The form prints two independent checkboxes (confirmed
   via vector-graphics coordinates, see Phase 1) with no explicit
   instruction that at least one must be checked, and prints
   "Pateikite tai pagrindžiančius paaiškinimus ir įrodymus" (provide
   explanations/evidence) nearby with no stated gating condition tying it
   to a specific checkbox combination. Modelling a fabricated `requiredWhen`
   here (e.g. "required when the two checkboxes disagree") would assert an
   unstated semantic the source text does not support.
4. **No `documents[]` array is published.** The form's own text includes
   only an instructional note about *how* to write the name/surname/ID
   fields (in capital letters, exactly as recorded in the passport or ID
   card) — it does not request that any supporting document (e.g. a copy of
   the passport/ID card, or a lease/utility bill proving actual residence)
   be physically attached to the application. Since GSP-0014's
   `documents[]` array is `minItems: 1` when present, and no genuine
   required-document notice exists on this form, the array is omitted
   entirely rather than populated with a fabricated entry.
5. **Office-only content is excluded from this applicant-facing schema.**
   Three groups of content were confirmed office-only, not applicant-facing,
   and are excluded: (a) two small pre-printed registration-number boxes —
   "Formos F5 registravimo Nr." (top-left) and "Rinkėjo numeris apylinkės
   rinkėjų sąraše" (top-right) — both completed by the receiving commission
   at intake/decision time, not the applicant; (b) the lower half of page 1
   ("Asmens įrašymo į rinkėjų sąrašą posistemėje RINKĖJAI (iki rinkimų
   dienos) patikrinimas:" through the commission chairperson's signature
   block), the precinct election commission's own verification/decision
   section, independently confirmed via checkbox-rectangle coordinates to
   carry 6 of the form's 8 checkbox squares; and (c) page 2 in its entirety,
   which — independently confirmed via `getTextContent()` — contains no
   fields at all, only a legend explaining the commission's four
   lettered decision codes (A. Įrašyti rinkėją... / B. .../ C. .../
   D. Piliečio neįrašyti...) and a GDPR-style data-controller notice. This
   follows this registry's established pattern of excluding official-use-
   only sections (e.g. GOV-3010's sk/policajny-zbor schema).

## Conformance fixtures (Phase 3)

8 fixtures committed under
`conformance/lt/vrk/prasymas-irasyti-i-rinkeju-sarasa/1.0.0/`: 2 valid (an
urban Vilnius applicant confirming both the declared-address and
actual-residence checkboxes, and a rural applicant whose actual residence
differs from their declared address, using the village/eldership/district
addressing scheme and the `explanationsAndEvidence` field) plus 6
mutation-control fixtures, each derived from the first valid fixture by a
single targeted mutation. All 8 were run against a from-scratch, ephemeral
field-by-field conformance checker (derived from this schema's own
`fields[]`, not committed to the repo) before being finalized: both valid
fixtures produced **0 errors**, and each of the 6 mutation-control fixtures
produced **exactly 1 error** — a missing required field (×3, covering
`name`, `houseNumber`, and `signatureDate`), an invalid `personalCode`
pattern, an invalid `dateOfBirth` date format, and an invalid boolean type
on `declaredAddressConfirmed`.

## Structural validation

- `node tools/validate.mjs registry/lt/vrk/prasymas-irasyti-i-rinkeju-sarasa/1.0.0/schema.json` — **ok**.
- `node tools/validate-ajv.mjs registry/lt/vrk/prasymas-irasyti-i-rinkeju-sarasa/1.0.0/schema.json` (ajv 2020-12 against `spec/v0.3`) — **ok**.
- Full-registry re-run after adding this document, rebasing onto the
  concurrently-merged GOV-3019/GOV-3014 (sk/mzv) PR, and regenerating
  `tools/govschema-client/registry-index.json` (455 entries, was 454 after
  that concurrent merge, 453 before either): `node tools/validate.mjs` →
  **455/455** documents passed, 3/3 `mapping.json` companions passed;
  `node tools/validate-ajv.mjs` → **455/455** documents validated, 3/3
  `mapping.json` companions validated.

## Maturity

`structural-reference`: the form's own printed structure is fully
transcribed, but no live filing with a district/precinct election
commission was attempted. GovSchema is an independent, non-profit standards
body and is not affiliated with, endorsed by, or operated by the Government
of the Republic of Lithuania or the Lietuvos Respublikos vyriausioji
rinkimų komisija.
