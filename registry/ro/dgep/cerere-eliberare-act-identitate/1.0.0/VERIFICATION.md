# Verification record — `ro/dgep/cerere-eliberare-act-identitate` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-14`

This is a `GovSchema Standard Research` cycle (**GOV-2875**). Romania
entered this cycle with 5 of 6 verticals modelled: Taxes
(`ro/anaf/declaratie-unica-activitati-independente`, GOV-2797, 50th
jurisdiction), DMV
(`ro/dgpci/cerere-operatiune-inmatriculari-transcrieri-radieri-provizorii`,
GOV-2804), Business Formation (`ro/onrc/cerere-inregistrare-persoane-juridice`,
GOV-2813), Visa (`ro/mae/formular-cerere-viza-de-lunga-sedere`, GOV-2837), and
Passport (`ro/mae/cerere-pentru-eliberarea-unui-nou-pasaport`, GOV-2844). This
document adds **National ID & Civic Documents**, Romania's sixth and last
open vertical — **Romania now stands at 6 of 6 verticals**, the third
non-original jurisdiction (after Colombia,
[[gov1588-co-rues-matricula-mercantil-review-gate]], and Bulgaria,
[[gov2869-bg-mvr-national-id-closes-6of6]]) to reach full coverage.

## Candidate provenance

The GOV-2844 cycle's own VERIFICATION.md left this vertical as an "open,
unscreened-this-cycle backlog" candidate with no pre-scouted lead. This
cycle scouted it fresh: a web search for DEPABD/DGEP's own
"cerere eliberare act identitate" ("application for issuance of the identity
document") surfaced several county-level Serviciul Public Comunitar de
Evidenţă a Persoanelor (SPCEP) sites mirroring what is, per every mirror's
own printed heading, a single nationally standardized DGEP form (S.P.C.E.P.
is printed generically on the form itself, not tied to any one county).

## Sources examined

### Source 1 (primary `source`, the form itself)

- **Authority:** Direcţia Generală pentru Evidenţa Persoanelor (DGEP,
  General Directorate for Personal Records), part of the Ministry of
  Internal Affairs (MAI). DGEP is the current name of the directorate
  formerly known as DEPABD; its legacy `depabd.mai.gov.ro` domain remains
  the live host (confirmed via that domain's own homepage `<title>`:
  "Directia Generală pentru Evidenţa Persoanelor", and its "date_deschise"/
  open-data and press pages, which self-identify as "DGEP" throughout).
- **Document:** "ANEXA nr. 11 — Cerere pentru eliberarea actului de
  identitate" (Application for Issuance of the Identity Document).
- **URL (as cited in `source.url`):**
  <https://depabd.mai.gov.ro/SCEP/formulare/cerere_eliberare_act_identitate.pdf>
- **Access note:** a direct fetch of this URL, and of the
  `evidenta_persoanelor.html` page that links it (both HTML and PDF), this
  cycle returned a genuine Apache `404` for the PDF specifically (the linking
  HTML page itself is still live and still lists the relative href
  `SCEP/formulare/cerere_eliberare_act_identitate.pdf` — a stale link, not a
  WAF/bot-mitigation gate: the response body is a plain Apache 404 page, not
  a challenge page, and every other asset under `depabd.mai.gov.ro/SCEP/`
  tried this cycle also 404s). The Internet Archive's Wayback Machine CDX
  API confirms the file was genuinely live at this exact URL as recently as
  **2025-06-12** (a `warc/revisit` record identical in digest to a
  full `200`/`application/pdf` capture from **2024-11-04**), so this is a
  recently-broken link, not evidence the form itself was withdrawn. Fetched
  the `if_` (iframe-free raw asset) rendering of the `20241104103102`
  snapshot: **34,912 bytes** (Wayback's own CDX record cites the raw
  asset's on-disk length as 30,766 bytes; the difference is Wayback
  wrapper overhead, not a content difference — the PDF's own internal
  `/Length` and object structure were used for the extraction below, not
  either archive-side byte count), sha256
  `c5a5b367916052419c658c23be2139bea9b18965922dd116383366009a2b3d68`.
  `pdfjs-dist` confirms 2 pages, **0 AcroForm widgets on either page** — a
  flat, non-interactive, print-and-fill specimen, the same tier as the
  majority of this registry's sources (including this same cycle's sibling
  `ro/mae` Passport and Visa schemas, both also 0-widget flat specimens).
- **Extraction method:** both pages rendered to raster images at 2.5x scale
  via `pdfjs-dist@3.11.174` + `canvas` (installed in an isolated scratch
  directory, not `tools/`'s own committed `ajv`/`ajv-formats`
  devDependencies — `tools/`'s `node_modules` was independently restored via
  `npm ci --include=dev` and reverified after this cycle's own scratch
  installs), then read directly (this specimen carries no text layer at all
  on page 1 — `getTextContent()` returns zero items — consistent with the
  page being a bitmap/vector form graphic with no embedded font-drawn text
  outside its handful of printed footnote lines on page 2, which the text
  layer *does* expose).

### Source 2 (edition cross-check, fillable-field correlation)

- The identical-looking form is also mirrored, undated, at
  `https://dpepsc.ps2.ro/attachments/article/92/CERERE%20ELIBERARE%20ACT%20DE%20IDENTITATE.PDF`
  (Direcţia Generală de Evidenţă a Persoanelor, Sector 2 municipality,
  Bucharest) — **819,246 bytes**, sha256
  `872594c97b8bbafe1a328cd1ae1b1dea055bf2ad04f0ea771ce34c8d058bc948`,
  genuinely fillable (`pdfjs-dist` confirms a real AcroForm, 100 Widget
  annotations: 88 on page 1, 12 on page 2). **A close read found this
  Sector-2 mirror is headed "ANEXA nr. 1," not "ANEXA nr. 11"** — a
  different edition of the same DGEP-standardized form, not a rendering
  artifact (confirmed by cropping and re-rendering both PDFs' own
  masthead region at 6x scale side-by-side: "ANEXA nr. 1" in a serif font
  vs. "ANEXA nr. 11" in bold sans-serif, unambiguously two distinct printed
  numerals). The two editions' core applicant-facing content block (CNP;
  name; parents; sex; birth place/date; current- and previous-domicile
  grids; previous name; marital/military status; last school; occupation;
  minor-children table; free-text reason; declaration; signatures; date) is
  identical field-for-field. They differ in exactly three respects: (1) the
  annex number itself; (2) the current (`ANEXA nr. 11`) edition alone
  prints an added first-person commitment — "Mă oblig ca în termen de 48 ore
  de la găsirea actului de identitate să îl predau Serviciului public
  comunitar de evidenţă a persoanelor" (I commit that, within 48 hours of
  finding the identity document, I will surrender it to SPCEP) — with its
  own footnote `**` restricting it to loss/theft-replacement requests, which
  the Sector-2 `ANEXA nr. 1` mirror does not print at all; (3) page 2's
  final office-only rows differ slightly (the current edition adds "Adresa
  la care locuieşte solicitantul fără forme legale" and "Timbre fiscale"
  rows; the older edition instead prints a "Actul de identitate lăsat în
  posesie" surrender note in that same space) — both office-only, out of
  scope either way.
- **Resolution:** per this registry's source-of-truth-fidelity and
  legal-currency conventions, the **central-government, more-recently-live
  edition (`ANEXA nr. 11`, Wayback-confirmed live as recently as
  2025-06-12) governs `source`/`documentRef` and every disclosed field**.
  The Sector-2 `ANEXA nr. 1` mirror is used *only* as a fillable-AcroForm
  cross-check to confirm the printed field grid genuinely corresponds to
  one widget per cell (not, e.g., a single merged text box spanning several
  printed labels) before transcribing labels from the flat `ANEXA nr. 11`
  render — since the two editions' core grid is byte-for-byte identical in
  layout and wording, this cross-check transfers cleanly. No field unique to
  `ANEXA nr. 1` and absent from `ANEXA nr. 11` was found or modeled.
- **Third mirror, ruled out as a source:** `www.dlep-iasi.ro`'s own copy
  (Direcţia Locală de Evidenţă a Persoanelor, Iaşi), 71,773 bytes, sha256
  `6fd723644a8ba4651cadddf5f4347f08b1050ba2e0491017adb8b91f109bfbae`, is
  also headed "ANEXA nr.1" (matching the Sector-2 edition) but carries
  **0 AcroForm widgets** (flat, unlike the Sector-2 copy) — read for
  cross-corroboration of the `ANEXA nr. 1` wording only, not used as a
  primary or secondary source.

## Duplicate-detection comparison

- Read Romania's own five already-modelled schemas in full
  (`ro/anaf/declaratie-unica-activitati-independente`,
  `ro/dgpci/cerere-operatiune-inmatriculari-transcrieri-radieri-provizorii`,
  `ro/onrc/cerere-inregistrare-persoane-juridice`,
  `ro/mae/formular-cerere-viza-de-lunga-sedere`,
  `ro/mae/cerere-pentru-eliberarea-unui-nou-pasaport`). **Finding: no
  subject-matter overlap** beyond the trivially shared identity-block
  concepts (CNP, surname, first name, sex, date of birth) any two Romanian
  government forms would share. The passport schema (GOV-2844) is the
  closest structural relative (same applicant-identity shape, same
  authority family under MAI/DGEP for this document) but has no analogue
  for this form's domicile grid, family/marital/military-status block,
  minor-children table, or property-owner consent block; conversely this
  form has no analogue for the passport schema's prior-passport-possession
  declaration or physical-description fields.
- This registry's other National ID & Civic Documents schemas
  (`bg/mvr/zayavlenie-za-izdavane-na-lichna-karta`,
  `fr/ants/national-identity-card-application-first-adult`,
  `lk/drp/application-for-a-national-identity-card`) were read for
  structural reference only (field/document/step conventions across
  jurisdictions), not as duplicate-detection targets.

## Field inventory (Phase 3)

All 54 `fields[]` entries carry their exact source line in their own
`sourceRef`. Summary by step:

| Step | Fields | Notes |
|---|---|---|
| `applicant_identity` | 9 | `cnp`, `surname`, `firstName`, `fathersFirstName`, `mothersFirstName`, `sex`, `birthPlaceMunicipality`, `birthPlaceCounty`, `dateOfBirth` |
| `domicile` | 10 | Current-domicile grid (9 sub-fields) plus `previousDomicileAddress` (a single composite field, see Judgment call 1) |
| `personal_status` | 6 | `previousName`, `maritalStatus`, `militaryStatus`, `reservistCategory` (gated), `lastSchoolGraduated`, `currentOccupation` |
| `minor_children` | 18 | Bounded 6-row table (`child1`..`child6`, each Name/DateOfBirth/BirthPlace) |
| `request_details` | 6 | `reasonForRequest`, `existingIdCardSeries`, `existingIdCardNumber`, `dataAccuracyDeclaration`, `foundDocumentSurrenderCommitment`, `applicationDate` |
| `domicile_ownership_consent` | 5 | `domicileOwnershipConsentProvided` (gate) plus 4 fields `requiredWhen` it is `true` |

Total: **54 fields**, **0 `documents[]` entries** (see below), **1
`crossFieldValidation`** rule, **6 `steps`**.

## Access notes and judgment calls

1. **`previousDomicileAddress` is modelled as a single composite string, not
   a 9-field mirror of the current-domicile grid.** The source prints the
   identical Mun./oraş/sector/comună — Strada/sat — Nr./Bl./Sc./Etj./Apt —
   Judeţ/Tel. grid twice: once unconditionally ("Domiciliul actual"), once
   captioned "numai pentru cei care îşi schimbă domiciliul" (only for those
   changing their domicile). Unlike the current-domicile grid (universal,
   richly used), this second grid is the source's own disclosed exception
   case with no discrete checkbox to key a `requiredWhen` gate on. Modelling
   it as 9 additional always-optional sub-fields would double the address
   surface area for a block most applicants never touch; a single optional
   free-text field captures the same information with much less schema
   surface, at the cost of losing per-sub-field structure for the rare
   applicant who is also relocating. Disclosed as a deliberate asymmetry
   with the current-domicile grid, not an oversight.
2. **`reservistCategory`'s enum values are the literal digits 3-6 printed
   in the form's own footnote**, not a re-encoded slug vocabulary — matching
   this registry's established precedent of using a source's own printed
   code values verbatim when the source itself defines a closed, numbered
   vocabulary (e.g. the RO DGPCI schema's own literal checkbox-derived
   values).
3. **`foundDocumentSurrenderCommitment` is left optional, not gated.** Its
   own footnote (`**`) restricts its real-world relevance to loss/theft
   replacement requests, but the form provides no separate discrete field
   distinguishing that reason from any other free-text entry in
   `reasonForRequest` — there is nothing to write a `requiredWhen` condition
   against without inventing a classification the source itself doesn't
   provide. Left as an always-optional boolean, honestly reflecting what
   the source structurally supports.
4. **The property-owner consent block (page 2's "Consimţământul titularului
   spaţiului de locuit") is modelled, unlike the rest of page 2.** Page 2 is
   headed "NU SE COMPLETEAZĂ DE SOLICITANT" (not completed by the
   applicant), but this specific block is filled in and signed by a third
   party (the property owner), not SPCEP staff — the same class of
   genuinely third-party, non-office data this registry has modelled
   elsewhere under a comparable guardian/proxy-consent pattern. The other
   five page-2 blocks (request/document intake, photo capture,
   identity/data verification, database update, card issuance and hand-over
   log) are unambiguous SPCEP staff processing steps and are excluded, per
   this registry's standing office-only exclusion convention.
5. **`domicileOwnershipConsentProvided` is a field this schema introduces as
   a gate, not a literal checkbox on the source.** The form provides no
   explicit boolean the applicant marks to say "I own my declared domicile"
   / "I do not" — the presence of a completed owner-consent block is itself
   the signal. Modelling an explicit gate field (rather than leaving all
   four owner-consent fields unconditionally optional with no relationship
   asserted between them) lets a consuming agent express "this block does
   or doesn't apply" as a single decision, then have the other four fields'
   own `requiredWhen` follow from it.
6. **Both physical signature lines, the "Nr./din" office-intake header
   fields (no printed blank line, matching this registry's established
   exclusion convention for that same pattern), and the printed CNP
   structure legend (S/A/A/L/L/Z/Z/N/N/N/N/N/C, directly beneath the CNP
   box row) are not modelled** — the legend is a reading aid describing
   what each of the 13 CNP digits represents, not a separate fillable item.
7. **No `documents[]` are modelled.** DGEP's own site lists 14
   scenario-specific "documente necesare" references (`.doc` files named
   e.g. `2_eliberare_CI_14-1.doc`, `4_eliberare_CI_expirare.doc`) alongside
   the form itself, but every one of them returned the same genuine Apache
   404 this cycle that the form's own stale central-domain link did, and
   (unlike the form itself) none could be located via a working Wayback
   capture in the time available this cycle. Rather than source a
   required-documents list from an unverified third-party aggregator,
   this is disclosed as a known gap and backlog item for a future review
   with either a working central-domain snapshot or a county-level SPCEP
   mirror of the same reference material.

## Test run (Phase 4)

No live submission was attempted: this is a request form against a real
national identity-document authority, and submitting fabricated identity
data into a real government system is not a safe or reversible action.

Instead, a fully hand-constructed mock record was built from this document's
own field inventory
(`conformance/ro/dgep/cerere-eliberare-act-identitate/1.0.0/application-packet.json`)
and independently checked with a standalone, ajv-free rule-tracing script
(not committed — reads `schema.json`'s own `required`/`requiredWhen`/
`validation.pattern`/`validation.enum`/`validation.maxLength`/
`crossFieldValidation` and evaluates them against the mock record), in
addition to the repo's own validators.

**Committed scenario — Ioana Georgescu, a Cluj-Napoca resident renewing an
expired identity card, married with one minor child, whose declared
domicile is a home owned by her mother-in-law (property-owner consent
block completed).** Passes with zero errors.

**Five negative controls** (each run against a mutated copy of the committed
packet, expected to fail exactly one rule): (a) removing `homeownerFullName`
while `domicileOwnershipConsentProvided: true` — correctly flagged as a
missing required field; (b) `cnp: "12345"` — correctly flagged as a
`validation.pattern` violation; (c) setting `militaryStatus: "reservist"`
without `reservistCategory` — correctly flagged as a missing required field;
(d) `dataAccuracyDeclaration: false` — correctly flagged as a
`validation.enum` violation (the field requires `true`); (e) setting
`homeownerConsentDate` to a date after `applicationDate` — correctly flagged
as a `crossFieldValidation` violation. All five were correctly rejected.

**Two additional positive controls:** (f) setting `militaryStatus:
"reservist"` together with `reservistCategory: "5"` passes with zero errors,
confirming the gate fires correctly in both directions; (g) setting
`domicileOwnershipConsentProvided: false` and removing all four
owner-consent fields also passes with zero errors, confirming that block is
genuinely optional when the gate is off.

Both registry validators were run against the finished document and pass
clean:

```
$ node tools/validate.mjs registry/ro/dgep/cerere-eliberare-act-identitate/1.0.0/schema.json
ok   registry/ro/dgep/cerere-eliberare-act-identitate/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/ro/dgep/cerere-eliberare-act-identitate/1.0.0/schema.json
ok   registry/ro/dgep/cerere-eliberare-act-identitate/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

## What is NOT modelled (out of scope), and why

- Page 2's five staff-only processing blocks (intake, photo capture,
  identity/data verification, database update, issuance and hand-over log)
  — office-facing, not applicant or third-party input.
- Both physical signature lines, per this registry's standing convention.
- The printed CNP structure legend (a reading aid, not a fillable item).
- The scenario-specific required-documents list DGEP's own site names but
  whose actual files 404 on both the live central domain and this cycle's
  available Wayback lookups — disclosed above as a known gap.

## Scope and jurisdiction notes

This document gives Romania 6 of 6 verticals (Taxes, DMV, Business
Formation, Visa, Passport, National ID & Civic Documents) — no vertical
remains open for Romania.
