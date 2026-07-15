# Verification record — `it/poliziadistato/richiesta-passaporto-maggiorenni` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-15`

This is **GOV-3031**, a pre-scouted child issue of GOV-3026's "GovSchema
Standard Research" cycle, authoring Modello 308 ("Modulo per la richiesta di
passaporto per maggiorenni"), Polizia di Stato / Ministero dell'Interno, to
open Italy's Passport vertical. Italy was 2/6 (DMV and Taxes only) — one of
the least-built-out jurisdictions in the registry, per GOV-3026's own
Executive Summary note — and reaches 3/6 with this schema.

## Overturning a stale registry finding

This registry's own **GOV-2382/GOV-2404/GOV-2716** previously recorded
Italy's Passport vertical as a **confirmed dead end**, based solely on a
live-fetch "Accesso negato" WAF block against `questure.poliziadistato.it`
— the document itself was never actually inspected. This cycle overturns
that finding: a Wayback Machine fallback works even though the live fetch
remains WAF-blocked.

## Source examined and fetched fresh

- **Authority:** Polizia di Stato (Questura — Ufficio Passaporti), Ministero
  dell'Interno.
- **Document:** Modello 308, "Modulo per la richiesta di passaporto per
  maggiorenni".
- **Live URL (WAF-blocked, confirmed still blocked this cycle):**
  `https://questure.poliziadistato.it/statics/33/modulo-passaporti-maggiorenni.pdf`
- **Retrieval path used:** queried the Wayback Machine CDX API first —
  `http://web.archive.org/cdx/search/cdx?url=questure.poliziadistato.it/statics/33/modulo-passaporti-maggiorenni.pdf&output=json&limit=20`
  — which returned exactly **one** capture, timestamp `20250807022716`.
  Fetched `https://web.archive.org/web/20250807022716/https://questure.poliziadistato.it/statics/33/modulo-passaporti-maggiorenni.pdf`
  directly via `curl` (per this registry's established rule, `web.archive.org`
  URLs are fetched via `curl`, never `WebFetch`, which hard-fails on them).
  The issue's suggested wildcard form
  (`.../20250807000000*/questure.poliziadistato.it/...`) is a CDX *query*
  syntax, not a fetchable snapshot URL — the CDX API call above is the
  correct way to resolve it to one.
- **Fetched:** direct `curl` from this sandbox, 2026-07-15. **HTTP 200**,
  `content-type: application/pdf`, `memento-datetime: Thu, 07 Aug 2025
  02:27:16 GMT`, no login/CAPTCHA gate on the Wayback mirror.
- **Size:** 1,749,585 bytes — matches the issue's own citation exactly.
- **sha256:** `67ef4f41dd8ee5681aab1c1389a11f8608a52c208ddd93f0f3011ef1a7eee384`
  — matches the issue's own citation exactly, independently recomputed via
  `sha256sum` in this sandbox.
- **Pages:** 3 (confirmed via `pdfjs-dist`'s `doc.numPages` and via `mupdf`'s
  `doc.countPages()` — both agree), not the "roughly 2-3 pages" the issue's
  pre-scouting note guessed.
- A second independent mirror (`studio74.it`) was not additionally re-fetched
  this cycle: the Wayback capture's sha256 already matches the issue's own
  independently-stated hash byte-for-byte, and `tools/verify-sources.mjs`
  re-confirms the cited Wayback URL resolves live at PR time.

## Major correction: this is a genuine fillable AcroForm, not a static PDF

The issue's own pre-scouting note states the form is "a static PDF, zero
AcroForm widgets, but a clean labeled layout." **This is incorrect, and this
cycle corrects it before authoring against the wrong premise:**

- `pdfjs-dist` 4.10.38 (`legacy/build/pdf.mjs`) `page.getAnnotations()` found
  **57 `/Widget` annotations on page 1 of 3** (43 `Tx` text fields, 14 `Btn`
  independent checkboxes, all with `radioButton: false` — confirmed
  genuinely independent widgets, not a native PDF radio group; the 43/14
  split corrects an initial 44/13 miscount caught during review-gate
  re-verification, the 57 total and every individual field-name mapping
  were unaffected). Page 2 of 3
  has **zero** widgets (one flat image plus a `Link` annotation). Page 3 of
  3 has **zero** widgets and exactly one `Link` annotation, to
  `https://passaportonline.poliziadistato.it/`.
- Both `getTextContent()` and an `getOperatorList()` dump confirm pages 1-2
  have **zero extractable text items**: each page is a single full-page
  `paintImageXObject` call (`2480x3508` px JPEG) with the 57 widgets
  overlaid on top at precise coordinates for data entry. Only page 3 (the
  numbered footnote instructions) carries a genuine vector-text layer (325
  text items).
- The PDF uses Standard-security-handler **V4/AESV2 128-bit encryption**
  with an empty user password (permissions-only restrictions, e.g. printing)
  — confirmed by locating the `/Encrypt` dictionary (`/Filter /Standard /V 4
  /CF <</StdCF <</CFM/AESV2>>>>`) and by the two image objects' raw stream
  bytes (objects 474, 476, both `/Filter/DCTDecode`) not being valid JPEG
  when read directly off disk (`%FFD8FF` header absent) — i.e. genuinely
  encrypted at the stream level, unlike this registry's `it/mit` TT2119
  precedent (GOV-2389), which had no encryption and could be read directly
  from the object stream after a plain `zlib.inflateSync`.
- `node-canvas`-based `pdfjs-dist` `page.render()` reproduced this registry's
  known image-XObject rendering failure (`TypeError: Image or Canvas
  expected`, the same GOV-2316/GOV-2389 limitation) for pages 1-2; page 3
  rendered fine. Direct object-stream extraction (the GOV-2389 TT2119
  technique) was not viable here because the image streams are AES-encrypted
  and manual PDF decryption was not attempted. Instead, the npm `mupdf`
  package (`mupdf@1.28.0`, a WASM build of MuPDF with its own independent
  decryption/rendering pipeline) rendered all 3 pages to PNG at 3x scale with
  no failures. Page 1 was read directly off the rendered PNG, and every one
  of the 57 widget rects was cross-checked by drawing each widget's rect
  (converted from PDF user-space, bottom-left origin, to the rendered
  image's top-left-origin pixel space at the same 3x scale) as a labelled
  overlay box on top of the rendered page, confirming every
  field-name-to-visible-label mapping used in this schema by direct visual
  co-location. (The annotation script and annotated PNG were discarded after
  use; not committed.)
- **Field count: 57 real AcroForm widgets**, not the issue's "roughly 30-35"
  estimate. The estimate undercounted mainly because the up-to-3
  other-parent repeating block alone contributes 12 fields (see below), and
  several single-purpose boxes (birth/residence province-vs-foreign-country
  code pairs, "N.civico" house-number boxes) are each their own separate
  widget rather than folded into a neighbouring one.

## Correcting the issue's own pre-scouting description of the "children" block

The issue's pre-scouting note describes "minor children + parental-
responsibility holder(s) (up to 3 children with each parent's data)." This
is **not accurate** and is corrected here: the form's "Altro genitore: 1) 2)
3)" block (Cognome e nome / Data di nascita / Comune di nascita / Sigla
prov., repeated three times) records up to **three OTHER PARENTS** holding
parental responsibility over the applicant's minor children — relevant only
when "Unico esercente responsabilità genitoriale" = NO (the applicant is
*not* the sole holder of parental responsibility). The form never asks for
the children's own identities anywhere; it only asks a yes/no question
("Figli minori? (7)" — does the applicant have minor children) plus, when
responsibility is shared, who else holds it. Modelled here as a bounded
1-3 repeating group (`otherParent1`..`otherParent3`), matching this
registry's established `child1`..`childN` bounded-repeating-group convention
(e.g. `ng/nis`'s Nigeria passport schema's `child1Name`..`child3PlaceOfBirth`
fields).

## Independent checkboxes vs. radio groups

All 14 `Btn` widgets are confirmed genuinely independent (`radioButton:
false`, `exportValue: "Yes"` on every one, no shared parent field). Per this
registry's `si/ajpes` precedent (GOV-2910), each is modelled as its own
independent `boolean` field rather than a single `enum`, with
`exclusivityGroups` recording the six pick-one-of-two/four choices the
source visually presents as SI/NO pairs or a single-select checkbox row:
`sesso` (sexMale/sexFemale), `obstructiveConditions`, `hasMinorChildren`,
`soleParentalResponsibility`, `requestType` (the four "Chiede: (8)"
options), and `printSpouseSurname`. Per spec §8.4, `exclusivityGroups` only
enforces "at most one member set," not "at least one" — the same accepted
gap the `si/ajpes`/`ng/cac` precedents carry; not re-litigated here.

## Two disclosed fields with no AcroForm widget

- `requestingQuestura` (the "Alla Questura di" header box) — part of page
  1's flat background image, not a widget, but unambiguously an
  applicant-supplied value (which Questura the request is addressed to),
  matching this registry's `it/mit` `existingPlateNumber` precedent for a
  clearly applicant-facing box with no widget of its own.
- `dataProtectionConsent` (page 2's GDPR Article 13 consent declaration) —
  page 2 carries zero AcroForm widgets at all (confirmed above); this
  declaration is nonetheless an applicant consent, not office-reserved
  content, so it is modelled as a required boolean field despite having no
  widget.

Both are disclosed judgment calls, not silently assumed.

## Text extraction (page 3 of 3)

Page 3's genuine vector-text layer was extracted via `getTextContent()` with
y-coordinate row-clustering (items grouped within a 3pt y-tolerance band,
then sorted by x within each row) — the same row-reconstruction technique
this registry's `gr/yme` cycle (GOV-3026) established for out-of-visual-order
text streams. Page 3's own item order already matched visual reading order
once row-clustered, so no further re-sequencing was needed. All quoted
footnote text (footnotes 1-11, "INDICAZIONI GENERALI", and the lettered a-e
document list) was transcribed verbatim from this extraction, including the
exact legal citation the issue asked to confirm: footnote 5 reads, verbatim,
"Legge 21/11/1967 nr. 1185 articoli 3 e 3 bis" — matching the issue's cited
"Legge 21/11/1967 n. 1185 art. 3/3-bis" exactly (the printed form uses "nr."
and spells out "articoli... 3 bis" rather than a slash, but the citation is
the same law and articles).

## Field inventory and scope

**59 `fields[]` entries** (57 AcroForm widgets + 2 disclosed non-widget
fields), plus **5 `documents[]` entries**.

In scope: identity/birth/residence data (`surname`, `firstName`,
`dateOfBirth`, `birthMunicipality`, `birthProvinceCode`/
`birthForeignStateCode`, `residenceMunicipality`,
`residenceProvinceCode`/`residenceForeignStateCode`,
`residenceStreetAddress`, `residenceHouseNumber`, `maritalStatus`); the
identity document being used to prove identity (`identityDocumentType`,
`identityDocumentNumber`, `identityDocumentIssuingAuthority`,
`identityDocumentIssueDate`); contact details (`phoneNumber`, `email`);
physical-description fields the issued passport itself carries
(`heightCm`, `eyeColorCode` — a 5-value closed enum per footnote 3's own
legend, `sexMale`/`sexFemale`); an already-held-passport declaration
(`otherPassportNumber`/`otherPassportIssuingAuthority`/
`otherPassportIssueDate`); a domicile-if-different-from-residence block
(`domicileMunicipality`/`domicileStreetAddress`/`domicileHouseNumber`); the
minor-children/parental-responsibility declaration
(`hasMinorChildrenYes`/`No`, `soleParentalResponsibilityYes`/`No`) plus the
bounded 1-3 other-parent repeating block; the four request-type checkboxes
(`requestIssuance`/`requestBilingualStamp`/`requestDoublePassport`/
`requestResidenceChange`); the spouse-surname-printing declaration
(`spouseSurname`, `printSpouseSurnameYes`/`No`); a pickup-delegate block
(`delegateSurname`/`delegateFirstName`/`delegateDateOfBirth`/
`delegateFiscalCode`); `requestingQuestura`; and `dataProtectionConsent`.

**Deliberately out of scope:**

- The "Alla Questura di" box's sibling, "Protocollo" — an office-assigned
  reference/protocol number, not an applicant-supplied value, excluded as
  office-reserved content (unlike `requestingQuestura`, which the applicant
  themselves fills in).
- The entire "Riservato all'ufficio" attestation strip at the foot of page 1
  ("Il sottoscritto attesta che la firma... DATA PRESENTAZIONE ISTANZA /
  TIMBRO UFFICIO RICEVENTE / FIRMA PER ESTESO E QUALIFICA DEL P.U.
  COMPETENTE") — explicitly reserved, per the form's own footnote (11),
  "Riservato al Pubblico Ufficiale competente a ricevere la documentazione"
  (reserved for the receiving public official), following this registry's
  `dk/cpr`/`se/skatteverket`/`it/mit` office-reserved-content precedent.
- Page 2 of 3's entire "Riservato all'Ufficio" section: the 7-item
  document-received checklist, "esito accertamenti" free-text box, the
  VISTO/decision block ("SI RILASCIA"/"SI RIGETTA"/"SI ARCHIVIA"/"SI
  SOSPENDE"), the "codice assicurata Poste italiane" box, and the office
  stamp/signature/date lines — all explicitly office-completed following
  the same precedent.
- Both pages' wet-ink signature lines ("Firma richiedente" on page 1; "Firma"
  on page 2) — no AcroForm widget of their own, following this registry's
  established convention of not modelling a bare signature line with no
  data-entry box.

## Documents

Transcribed from page 3/3's own lettered list, "DA PRODURRE ALL'ATTO DELLA
PRESENTAZIONE DELL'ISTANZA: a)-e)":

1. `identityDocumentCopy` (identity-document, required) — list item a), a
   photocopy of the applicant's valid identity document.
2. `icaoPhotographs` (supporting-evidence, required) — list item b), two
   recent ICAO-compliant photographs (cross-referenced against footnote 2's
   fuller description).
3. `electronicPassportPaymentReceipt` (payment, required, `amount: {EUR,
   42.50}`) — list item c), the postal bollettino payment to the Ministero
   dell'Economia e delle Finanze.
4. `administrativeContributionStamp` (payment, `requiredWhen: not
   requestBilingualStamp`, `amount: {EUR, 73.50}`) — list item d); the
   source itself states this is "non necessario per il passaporto
   temporaneo" (an office-side determination outside this form's
   applicant-facing scope), so this schema instead gates it on the one
   applicant-facing signal available — a bilingual-stamp request, which per
   footnote (9) concerns an already-issued passport rather than a new one
   requiring this stamp.
5. `priorPassportOrLossReportCopy` (supporting-evidence, not gated by
   `requiredWhen`) — list item e); left as an always-optional, disclosed
   judgment call rather than gated on `otherPassportNumber`'s emptiness, per
   this registry's known anti-pattern of gating `requiredWhen` on an
   optional text field being an empty string (a false-negative risk when
   the field is simply absent rather than an explicit empty string).

## Conformance testing

A from-scratch, ephemeral field-by-field conformance checker (deriving
required/`requiredWhen`/`enum`/`pattern`/`exclusivityGroups` rules directly
from this schema's own `fields[]`/`documents[]`; discarded after use, not
committed) was run against 2 valid scenarios and 6 mutation controls in
`conformance/it/poliziadistato/richiesta-passaporto-maggiorenni/1.0.0/`:

1. `valid-single-applicant-no-minor-children.json` — a single applicant with
   no minor children, requesting ordinary issuance. **0 errors.**
2. `valid-minor-children-shared-responsibility-and-delegate.json` — an
   applicant with minor children, shared parental responsibility (one other
   parent declared), a bilingual-stamp request (so the administrative-
   contribution stamp is not required), spouse-surname printing requested,
   and a pickup delegate. **0 errors.**

Six mutation controls, each hand-derived from a passing scenario by
introducing exactly one violation:

1. `mutation-control-missing-required-field.json` — deletes `surname`. **1
   error** (missing required field).
2. `mutation-control-missing-required-document.json` — removes
   `identityDocumentCopy` from `documents[]`. **1 error** (missing required
   document).
3. `mutation-control-enum-violation.json` — sets `eyeColorCode` to `"X"`
   (not in the 5-value enum). **1 error.**
4. `mutation-control-pattern-violation.json` — sets `birthProvinceCode` to
   `"123"` (fails the `^[A-Z]{2}$` province-code pattern). **1 error.**
5. `mutation-control-exclusivitygroup-violation.json` — sets both
   `sexMale` and `sexFemale` to `true`. **1 error** (`exclusivityGroups`
   violation).
6. `mutation-control-requiredwhen-violation.json` — deletes
   `otherParent1FullName` while `hasMinorChildrenYes`/
   `soleParentalResponsibilityNo` are both `true`. **1 error** (missing
   conditionally-required field).

All six mutation controls raised exactly the expected single error; the two
passing scenarios raised zero.

## Meta-schema validation

- `node tools/validate.mjs registry/it/poliziadistato/richiesta-passaporto-maggiorenni/1.0.0/schema.json`
  — **ok**.
- `node tools/validate-ajv.mjs registry/it/poliziadistato/richiesta-passaporto-maggiorenni/1.0.0/schema.json`
  — **ok** (ajv 2020-12, spec v0.3 meta-schema).
