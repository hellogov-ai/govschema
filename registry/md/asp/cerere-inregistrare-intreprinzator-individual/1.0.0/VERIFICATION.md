# Verification record — `md/asp/cerere-inregistrare-intreprinzator-individual` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-15`

## Why this schema and why now (GOV-3115)

GOV-3115 is a child issue of the GOV-3101 "GovSchema Standard Research"
cycle (2026-07-15), delegated rather than authored inline because that
cycle's authoring budget went to Pakistan's Taxes schema
(`pk/fbr/annual-individual-income-tax-return-it-1b`). It sat as an
unclaimed, pre-scouted, ready-to-author candidate — one of three
(alongside Tanzania's BRELA Form 14a, GOV-3113, and Dominican Republic's
DGII IR-2, GOV-3114) — until this cycle (GOV-3119) picked it up. Of the
three, this cycle's scouting note called Moldova "the smallest/most
tractable" candidate, so it was authored first; the other two were
dispatched to parallel background agents this same cycle rather than left
idle.

Moldova is not yet in this registry. This schema opens it as the 60th
jurisdiction, with Business Formation as its first vertical (1 of 6).

## Source

- **URL:**
  `https://asp.gov.md/sites/default/files/servicii/e-servicii/formulare-tip/2/inregistrarea-de-stat/2%20Cerere%20privind%20inregistrarea%20de%20stat%20a%20intreprinzatorului%20individual.pdf`
- **Retrieved:** 2026-07-15, HTTP 200, 359,851 bytes, fetched directly with
  `curl` — no login/CAPTCHA/WAF gate encountered at any point.
- **sha256:**
  `d2022d23171149579790fbc90f3be689c721d817930cd7dd763bc40e9cf9f4d8`
- Genuine 2-page **text-layer** PDF (not a scanned image), confirmed via
  `pdfjs-dist`'s `getTextContent()` returning real, non-empty extracted
  text on both pages, and `getAnnotations()` returning zero widgets on
  either page (no AcroForm — every blank on the form is a printed
  underscore line, not a fillable field).

## Extraction method

Both pages were extracted with `pdfjs-dist`'s `getTextContent()`, grouped
into lines by each text item's `y`-transform to preserve reading order
(the same technique used across this registry for non-AcroForm text-layer
PDFs). The result is a clean, single-column, numbered 9-item list (plus a
header block and a closing declaration/signature block), with each
numbered item's field-label captions printed directly beneath their
corresponding blank lines — no column-order ambiguity to resolve, unlike
some bilingual/RTL forms handled in prior cycles.

## Field-by-field derivation

- **Header ("data depunerii," date of submission).** Printed above the
  request title, before "Subsemnatul... solicit înregistrarea." This is
  the registering officer's own intake-date stamp, not applicant-supplied
  data, and is **not modeled as a field** — consistent with this
  registry's convention of not fabricating fields for administrative/
  office-only elements the form itself does not ask the applicant to
  supply.
- **Item 3 (Domiciliul) — 8 sub-fields.** The form prints two blank rows
  under this item: row 1 (cod poştal, strada, numărul casei, bloc,
  apartament — 5 blanks) and row 2 (localitatea, municipiul/raionul,
  ţara — 3 blanks), for 8 total. `domiciliuBlock`/`domiciliuApartment` are
  modeled optional (not every address has a block or apartment number);
  the other six are required.
- **Item 4 (Telefon/E-mail/Fax).** Three blanks on one line. `phone` and
  `email` are modeled required; `fax` is modeled optional as a legacy
  contact channel — the form carries no asterisk distinguishing any of
  the three, so this split is a judgment call, disclosed here rather than
  silently assumed.
- **Item 5 (Forma juridică de organizare a activității) — single-value
  enum.** The form prints exactly one legal-form value, "Întreprinzător
  individual," with no other option visible anywhere on the form (unlike,
  e.g., a company-registration form that would print a dropdown of legal
  forms). Modeled as a single-value `enum`, mirroring the precedent set
  for Nepal's OCR `companyType` field (GOV-3078) rather than fabricating
  unseen alternatives this specific form does not offer.
- **Item 6 (Genurile principale de activitate) — one row, not a repeating
  group.** The form prints exactly one CAEM-code/activity-name blank pair
  under a single "-" bullet. This v1.0.0 models exactly one principal
  activity, as printed; the form provides no visible mechanism for
  listing secondary activities, and GovSchema's repeating-group proposal
  (GSP-0009) is not yet accepted into v0.3 in any case.
- **Item 7 (Beneficiar(i) efectiv(i)) — one beneficial owner, 10
  sub-fields, despite the plural label.** The form prints exactly one row
  of 10 blanks (nume/prenume, data naşterii, numărul de identificare
  personal, seria/numărul actului de identitate, data eliberării, locul
  naşterii, cetăţenia, domiciliul, ţara de reşedinţă, nr. de telefon)
  despite the item's plural phrasing ("Beneficiar(i) efectiv(i)" —
  "beneficial owner(s)"). This v1.0.0 models exactly one, the bounded
  minimum the form itself provides for; multiple beneficial owners would
  likely require a companion/continuation document ASP issues separately,
  which is out of scope here and disclosed as a scoping limitation rather
  than silently assumed away.
- **Item 8 (Sediul Profesional) — entirely optional, per the form's own
  footnote.** Footnote 2 reads: "Datele privind sediul profesional se
  indică doar în cazul în care este altul decât adresa de domiciliu" —
  "Professional-seat data is indicated only when it differs from the
  domicile address." All four of this block's variable sub-fields (cod
  poştal, strada, numărul, localitatea/raionul) are modeled optional
  accordingly. The block's printed country suffix, "Republica Moldova.",
  is fixed (not modeled as a field — it offers no variability, unlike
  `domiciliuCountry` in item 3, which is a free blank).
- **Item 9 (Termenul de activității) — free text, not a two-value
  enum.** The blank carries the printed hint "nelimitat/pe termen"
  (unlimited / for a term) directly beneath it. "Pe termen" names a
  *category* (fixed-term), not a literal answerable value — an applicant
  choosing a fixed term would write the actual duration (e.g. "5 ani"),
  not the words "pe termen" themselves. Modeled as free-text `string`
  rather than a strict enum, to avoid fabricating "pe termen" as if it
  were itself a valid, literal input value.
- **IDNP pattern (`personalIdNumber`, `beneficialOwnerPersonalIdNumber`).**
  Both carry a 13-digit numeric `pattern`, based on Moldova's published
  IDNP (numărul de identificare de stat al persoanei fizice) numbering
  standard — an external, public national standard, not printed
  digit-by-digit on the form itself (the form prints only a blank line
  with no digit-count guide). Disclosed here rather than silently
  presented as form-derived.
- **`documents[]` (1 entry, optional).** The form's own closing line,
  "Întru susţinerea cererii prezint următoarele documente: 1.", is a
  single generic numbered placeholder with no itemized document types
  printed anywhere. Modeled as one optional `supporting-evidence` entry,
  mirroring the precedent set for Nepal's OCR schema (GOV-3078) rather
  than fabricating specific document names the source does not print.
- **Signature block.** The closing "Solicitant: Semnătura:" line is a
  physical wet-signature affordance, not a data field, and is excluded
  from `fields[]` per this registry's standing convention.

## Conformance

An ephemeral, from-scratch conformance checker (deriving required/
enum/pattern/date-format rules directly from this schema's own
`fields[]`/`documents[]`, discarded after use, not committed) ran the
following fixtures in
`conformance/md/asp/cerere-inregistrare-intreprinzator-individual/1.0.0/`:

- `valid-sole-trader-chisinau.json` (a Moldovan sole-trader applicant in
  Chișinău with a printed principal activity, one beneficial owner, and
  no professional seat) — **0 errors**.
- `mutation-control-missing-required-field-full-name.json` (drops
  `fullName`) — **exactly 1 error**.
- `mutation-control-invalid-enum-legal-form.json` (sets `legalForm` to
  "Societate cu răspundere limitată," not in the enum) — **exactly 1
  error**.
- `mutation-control-invalid-pattern-personal-id-number.json` (sets
  `personalIdNumber` to a 5-digit non-IDNP value) — **exactly 1 error**.
- `mutation-control-invalid-pattern-beneficial-owner-personal-id-number.json`
  (sets `beneficialOwnerPersonalIdNumber` to a non-numeric value) —
  **exactly 1 error**.
- `mutation-control-invalid-date-format-beneficial-owner-date-of-birth.json`
  (sets `beneficialOwnerDateOfBirth` to `12/04/1985`, not ISO `YYYY-MM-DD`)
  — **exactly 1 error**.
- `mutation-control-missing-required-field-beneficial-owner-full-name.json`
  (drops `beneficialOwnerFullName`) — **exactly 1 error**.

This schema's sole `documents[]` entry is optional rather than required,
so no missing-required-document fixture applies.

## Structural validation

- `node tools/validate.mjs` and `node tools/validate-ajv.mjs` (ajv 2020-12
  against `spec/v0.3`) both pass on the full registry after adding this
  document: **470/470**.
- `node tools/verify-sources.mjs registry/md/asp/cerere-inregistrare-intreprinzator-individual/1.0.0`
  — 1 directory, 3 URLs checked, 0 warnings, 0 allowlisted, all clear.
- `npm run build-index` re-run in `tools/govschema-client/` to regenerate
  `registry-index.json` with this document included (470 entries).

## Maturity

`structural-reference`: the source form's own printed field labels and
instructions are fully transcribed from the genuine, currently-served
official PDF, but no live filing through ASP's own e-services channel was
attempted. GovSchema is an independent, non-profit standards body and is
not affiliated with, endorsed by, or operated by the Government of the
Republic of Moldova or Agenția Servicii Publice.
