# Verification record — `gr/astynomia/aitisi-ekdosis-diavatiriou` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-15`

This is a `GovSchema Standard Research` cycle (**GOV-3054**), picking up
child issue **GOV-3049**, itself pre-scouted during **GOV-3045** (Italy's
Business Formation opening cycle). Greece stood at 4 of 6 verticals (DMV,
Business Formation, Taxes, Visa) at the start of this cycle. This document
opens Greece's **Passport vertical**.

## Overturning a prior finding

The GOV-3026 cycle (which opened Greece's DMV vertical) screened Greece's
Passport vertical and recorded it as a **dead end**, on the basis that
`passport.gov.gr`'s own "sample" PDF is a scanned image with zero
extractable text/AcroForm and that the site's own process description
states applications are "electronically registered by Passport Office
personnel, then printed and signed" — genuinely true, but that screening
pass did not locate the site's own fully-legible rendered preview image of
the same specimen. GOV-3045's scouting this cycle found it
(`AppFSpl.png`), following the same no-fillable-PDF/prose-plus-specimen-image
sourcing recipe this registry already used successfully for `gr/yme`
(GOV-3026) — an in-person, staff-entered process is not disqualifying on
its own; what matters is whether the form's own structure can be read from
some source. It can be here.

## Source re-verification (Phase 1)

- **Landing page:** `https://www.passport.gov.gr/en/tools/downloads/samples/`
  — independently re-fetched this cycle, HTTP 200, `text/html`, 20,594
  bytes. This page is a listing page, not a direct PDF — it links to the
  actual specimen via a `dl.php` download-plugin redirect endpoint,
  `https://www.passport.gov.gr/components/com_content/plugins/download/includes/dl.php?c=Dj5bfAA7XGYFLAc0UiRRZQYtAH1WMFJuA2UNaANvUmIENQsyVmM=&m=0`
  (extracted from the page's own `href`, not assumed from the prior
  scouting note).
- **Specimen PDF (via the `dl.php` redirect):** HTTP 200, `content-type:
  application/octet-stream`, exactly `1,108,070` bytes, sha256
  `30b390b0ab0a73b0e297dd43f54c6bc7a77f9fce7d8677905c62c30faf75cfcc` —
  independently computed this cycle with `sha256sum` against a fresh
  download, matching the prior scouting note's own citation byte-for-byte.
- **File type:** confirmed via `pdfjs-dist` (`legacy/build/pdf.js`,
  installed to a clean `/tmp` scratch directory) that `doc.numPages` is 1,
  `page.getAnnotations()` returns 0 entries, and `page.getTextContent()`
  returns 0 text items — a genuine scanned/rasterized single-page image,
  zero AcroForm, zero extractable text.
- **Rendered preview image:**
  `https://www.passport.gov.gr/media/images/articles/tools/AppFSpl.png` —
  independently re-fetched this cycle, HTTP 200, `image/png`, `371,942`
  bytes, sha256
  `df7bf3dfc39e668c2f8e72669f116ee4a51f13a8cc4ca8882200ae30ea6316b4` —
  matching the prior scouting note's own citation exactly. 572×809px.
- **Legibility technique:** the full image was read directly first (header,
  personal-data table, fingerprint-capture readout, sworn declaration, and
  signature blocks were all visible), then three regions were cropped and
  upscaled 4-5x with `sharp`'s `lanczos3` kernel (Node `sharp@0.35.2`,
  already present in the environment) to resolve text partially crossed by
  the page's diagonal "ΥΠΟΔΕΙΓΜΑ ΑΙΤΗΣΗΣ" (Specimen Application) watermark:
  the personal-data/residence table (confirming address-field structure and
  the `CONTACT@PASSPORT.GOV.GR` placeholder email), and the full 9-item
  ΥΠΕΥΘΥΝΗ ΔΗΛΩΣΗ (sworn declaration) text — the initial low-resolution read
  only partially resolved several of the 9 items where the watermark
  crossed the text.

## Cross-reference corroboration (Phase 1, continued)

- **Instructions:**
  `https://www.passport.gov.gr/en/diadikasia-ekdosis/odigies/` —
  independently re-fetched this cycle, HTTP 200, raw HTML parsed to plain
  text. Confirms the in-person, staff-entered process; the four
  application types (initial issuance / renewal / replacement /
  theft-loss) and their triggering conditions (a passport that has expired
  or expires within 36 months triggers renewal; a valid passport being
  swapped triggers replacement; a reported-stolen/lost/destroyed passport
  triggers theft/loss); and a high-level summary of the Statement-of-Truth
  content.
- **Required documents:**
  `https://www.passport.gov.gr/en/diadikasia-ekdosis/documents/dikaiologitika.html`
  — independently re-fetched this cycle, HTTP 200, raw HTML parsed to plain
  text. Provided: (a) the authoritative 9-item English-language
  itemization of the Statement-of-Truth content, cross-checked word-for-word
  against the Greek specimen's own 9-item declaration — substance matches
  exactly (no final conviction, no pending arrest warrant, no exit
  prohibition, not a draft-evader/deserter domestically or abroad, not
  serving a custodial sentence or under pre-trial detention, residence
  declaration plus prior-passport lost/stolen/renewal/replacement status,
  wish to be informed of expiry date, informed of data-processing rights);
  (b) the full identity-document/photograph/fee supporting-documents list,
  used to derive `documents[]`; (c) the complete fee schedule by passport
  type (EUR 80.00 standard 10-year — type 2014; EUR 67.00 13-month per
  Article 1 §3/Article 4 §3 P.D. 25/2022 — type 2017; EUR 62.50 8-month
  when fingerprinting is unavailable, or 3-month per Article 1 §4(b) P.D.
  25/2022 — types 2018/2019; EUR 58.00 replacement-only — type 2016).
- **Legislation:**
  `https://www.passport.gov.gr/en/diadikasia-ekdosis/legislation/` —
  independently re-fetched this cycle, HTTP 200, raw HTML parsed to plain
  text. Confirms the full legal citation chain used in `authority.basis`:
  Law 3103/2003, Law 3480/2006 Art.11, Law 4962/2022 Art.87, Law 5143/2024
  Art.60, Law 5187/2025 Art.26, Presidential Decree 25/2022, and Common
  Ministerial Order 3021/22/10-o/2005.

## Scope decisions (Phase 2)

1. **The protocol header's "Αρχή Παραλαβής" free-text authority-name box
   and the receiving-office's "Αριθμός Αίτησης"/"Ημερομηνία" boxes are
   modelled as optional, office-completed fields** (`applicationDate`
   captures the filing date; the authority-name box and application-number
   box are not modelled as separate fields at all, since they carry no
   applicant-facing meaning beyond identifying which office is processing
   the request — consistent with this registry's `feeAmount`/
   `applicationDate` treatment).
2. **The two fingerprint-capture-percentage readouts (ΑΡΙΣΤΕΡΟΣ/ΔΕΞΙΟΣ
   ΔΕΙΚΤΗΣ) are deliberately NOT modelled.** These are biometric-device
   quality readouts generated during the in-person appointment (a
   percentage confidence score for each index-finger capture), not an
   applicant-supplied value of any kind — disclosed as out of scope rather
   than fabricated as a pseudo-field.
3. **The "Ο/Η ΠΑΡΑΛΑΒΩΝ/ΟΥΣΑ" (receiving officer) signature/name/rank block
   and both parties' wet-ink signature lines are deliberately NOT
   modelled**, consistent with this registry's established office-reserved-
   content precedent (e.g. `it/poliziadistato`'s page-1 header/footer
   treatment, `dk/cpr`, `se/skatteverket`).
4. **Declaration item 4 is only partially modelled.** Its full printed text
   ("Διαμένω μόνιμα στην ανωτέρω διεύθυνση και [...] διαβατήριο [...] το
   οποίο απωλέσθη, εκλάπη ή ζητείται η ανανέωση ή αντικατάστασή του")
   bundles a residency attestation with a prior-passport-history statement
   that duplicates information the `applicationType` field already
   captures (RENEWAL/REPLACEMENT/THEFT_LOSS). Only the residency
   attestation is modelled as its own boolean
   (`declarationResidesAtStatedAddress`), to avoid a redundant field with
   unclear independent semantics — consistent with this registry's
   established caution against fabricating a field the source does not
   itself structurally separate out.
5. **`documents[]` (5 entries) is derived directly from
   `dikaiologitika.html`'s own numbered supporting-documents list**, with
   `priorPassportPhotocopy` gated on `applicationType in [RENEWAL,
   REPLACEMENT]` and `lossOrTheftReport` gated on `applicationType equals
   THEFT_LOSS` — matching that page's own case-by-case (1. first issue, 2.
   renewal, 3. replacement, 4. theft/loss) structure, using the `in`
   condition operator (spec v0.3 `conditionLeaf`).
6. **`wishesToBeInformedOfExpiryDate` is modelled `required: false`**,
   unlike the other 8 declaration items — the specimen's own text ("Επιθυμώ
   να ενημερωθώ...") is phrased as a preference, not a mandatory sworn
   attestation.

## Conformance fixtures (Phase 3)

7 fixtures committed under
`conformance/gr/astynomia/aitisi-ekdosis-diavatiriou/1.0.0/`: 2 valid (a
first-time adult applicant filing INITIAL_ISSUANCE, and a THEFT_LOSS
applicant exercising the `lossOrTheftReport` requiredWhen branch) plus 5
mutation-control fixtures, each derived from a valid fixture by a single
targeted mutation. All 7 were run against a from-scratch, ephemeral
field-by-field conformance checker (derived from this schema's own
`fields[]`/`documents[]`/`requiredWhen` conditions, not committed to the
repo) before being finalized: both valid fixtures produced **0 errors**,
and each of the 5 mutation-control fixtures produced **exactly 1 error** —
a missing required field, a missing required document, a missing
conditionally-required document (`lossOrTheftReport` when `applicationType`
is `THEFT_LOSS`), an invalid enum value, and an invalid date format.

## Structural validation

- `node tools/validate.mjs registry/gr/astynomia/aitisi-ekdosis-diavatiriou/1.0.0/schema.json` — **ok**.
- `node tools/validate-ajv.mjs registry/gr/astynomia/aitisi-ekdosis-diavatiriou/1.0.0/schema.json` (ajv 2020-12 against `spec/v0.3`) — **ok**.
- Full-registry re-run after adding this document: `node tools/validate.mjs`
  → **461/461**; `node tools/validate-ajv.mjs` → **461/461**.

## Maturity

`structural-reference`: the specimen's own printed structure is fully
transcribed from a genuine, currently-served official specimen (not a
fillable AcroForm — the process is inherently in-person, staff-entered),
but no live filing at a Passport Office or Consular Authority was
attempted. GovSchema is an independent, non-profit standards body and is
not affiliated with, endorsed by, or operated by the Hellenic Republic, the
Hellenic Police, or the Ministry of Citizen Protection.
