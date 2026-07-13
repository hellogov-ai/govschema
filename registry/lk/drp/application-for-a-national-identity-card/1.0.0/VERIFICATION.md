# Verification record — `lk/drp/application-for-a-national-identity-card` v1.0.0

This file is the **source-review record** for this document version, per the
`manual-source-review-v1` practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-13`
- **`maturity.level`:** `structural-reference`

This is GovSchema Standard Research cycle **GOV-2753**. It closes **Sri
Lanka's National ID & Civic Documents vertical**, bringing Sri Lanka to
**2 of 6 verticals** (Passport, authored GOV-2716 via `lk/imm`; National ID,
this schema).

## Source verification (independently re-derived)

- **URL:** `https://drp.gov.lk/en/assets/formats/application.pdf`
- Fetched independently via `curl`:
  - **HTTP 200**, `Content-Type: application/pdf`, `Content-Length: 608,290`
    bytes, `Last-Modified: Sat, 16 Sep 2023 16:29:03 GMT`.
  - **`sha256`:**
    `da659f8c67ddb335111e13e91fd493843ab44b5bed7b3d952fe52726b21b73f6`
    (computed via `sha256sum` on the freshly-downloaded file).
- The department's own homepage (`drp.gov.lk/en/`) returned **HTTP 403** to a
  direct `curl` fetch in this environment, with and without a browser
  `User-Agent` header — consistent with generic bot-mitigation on the
  marketing site, not a login/authentication gate on the form itself, which
  this same domain's `/en/assets/formats/` path serves with no such
  restriction (confirmed reachable both before this cycle and independently
  re-fetched during it).
- Parsed with `pdfjs-dist@3.11.174` (legacy build): `getTextContent()`
  across all 8 pages returns a full, clean, genuinely extractable trilingual
  (Sinhala/Tamil/English) text layer — not a scanned image.
  `getFieldObjects()` returns `null` — **0 AcroForm fields**. This is a flat
  print-and-fill specimen, not a fillable PDF form, unlike this registry's
  `lk/imm` (Sri Lankan passport) schema, which is a genuine AcroForm.

## Rendering (visual cross-check)

Pages 1-5 were rendered to PNG via `pdfjs-dist@3` legacy build + `canvas@3`
(freshly installed for this cycle), with the bundled `standard_fonts` data
directory supplied as `standardFontDataUrl` — without it this specimen's
non-embedded base fonts render every glyph blank, a known gotcha for
non-AcroForm specimens using standard (non-embedded) fonts. Visual
confirmation resolved several ambiguities that the text layer alone could
not:

- **The top-of-page-1 District/D.S. Division/G.N. Number-and-Division box is
  a genuine applicant-facing text field**, visually distinct from the
  shaded "FOR OFFICE USE" panel (Identity Card No., Registration Officer's
  Code & Initials) directly beneath it. Modelled as three required fields
  (`district`, `dsDivision`, `gnNumberAndDivision`); the office-only panel is
  excluded from `fields[]`.
- Items 1-3 (Name in Full, Sinhala/Tamil; Name in Full, English Block
  Letters; Name to appear in Identity Card if different) are each a
  three-row Family Name/Name/Surname comb-box grid, confirmed via render.
- Item 4 (Sex) and Item 5 (Civil Status) are independent per-option
  tick-boxes (2 and 4 options respectively), each modelled as a
  single-choice `enum` — a disclosed judgment call over the form's own
  one-checkbox-per-option layout, consistent with this registry's general
  practice of modelling clear single-choice printed intent as `enum` rather
  than one boolean per checkbox.
- Item 8's two address blocks (8.1 "Permanent Address", 8.2 "Postal
  Address") each break into the same five sub-fields: house name/number,
  building/condominium/scheme name, road/street/lane/place/garden,
  village/city, and postal code.
- Item 10's four purpose-of-application tick-boxes (10.1 lost, 10.2 changes,
  10.3 renew validity, 10.4 damaged/defaced/illegible) and the conditional
  10.5-10.7 fields (last/lost card number, date of issue, police report
  details).
- Page 5 ("Details of the Payments made" plus a "FOR OFFICE USE ONLY /
  Notes" panel) is confirmed entirely office/payment-processing — a
  physical stamp/certificate/receipt-affixing panel with no printed fee
  amount anywhere on the form — and is out of scope, consistent with this
  registry's practice of not modelling fee amounts that aren't printed as a
  single authoritative figure.
- Page 4's Declaration and signature/left-thumb-impression block, and Part
  Two (Certifying Officer attestation) and Part Three (Acknowledgment slip,
  pages 4/8) are staff-only or physical artifacts, out of scope.

## Document structure and scope

- **Items 1-3's Family Name/Surname sub-fields are optional.** The
  instructions manual states plainly: "If there is no family name or
  surname leave the cage blank" — only the "Name" sub-field of each item is
  modelled required.
- **Item 8.2's printed sub-heading reads "Postal Address," but the
  instructions manual (instruction vi) describes this same cage as a
  different *current residence* address** ("Cage 8.2 should be filled only
  if the applicant is residing in a different address other than the
  address indicated in 8.1"), not a mailing address — a genuine discrepancy
  between the printed field heading and the instructions manual's own prose,
  disclosed here rather than silently resolved by inference. This schema
  follows the form's own printed field heading ("Postal Address").
- **Items 7.6-7.8 (Country of Birth / City / Section 5(2) Citizenship
  Certificate No., for applicants born outside Sri Lanka) and Item 9
  (Citizenship/Dual Citizenship Certificate Number and Date of Issue) have
  no applicant-fillable gating checkbox anywhere on the form** — no "born
  outside Sri Lanka" or "I hold dual citizenship" checkbox exists to
  condition on. Both blocks are modelled optional, with the conditional
  context recorded in each field's own `description` rather than a
  fabricated `requiredWhen` referencing a non-existent field — consistent
  with this registry's `lk/imm` precedent for the same pattern (that
  schema's Items 19 father/mother NIC fields).
- **Item 10 (Purpose of Application) and everything gated on it (10.5-10.7)
  are modelled optional**, per the form's own instruction: "If the
  duplicate of the Identity Card is applied for, please complete cage
  No.10." `lastOrCurrentIdentityCardNumber` and
  `dateOfIssueOfLastIdentityCard` are `requiredWhen` `purposeOfApplication`
  is any of the four printed options; `policeStationName` and
  `policeReportIssueDate` are `requiredWhen` `purposeOfApplication` equals
  `"lost"` specifically, since the police-report block is only relevant to
  a lost card.
- **The Declaration's item 4 blank identity-card-number line** ("I hereby
  hand over the Identity Card bearing number.../Police report obtained in
  lieu of the lost Identity Card bearing number...") was cross-checked
  against Item 10.5 ("Lost or last obtained Identity Card Number") and found
  to reference the same underlying value — modelled once as
  `lastOrCurrentIdentityCardNumber` rather than as two duplicate fields, a
  disclosed judgment call.
- **Comb-style character-box grids on this flat (non-AcroForm) specimen are
  a handwriting aid, not an enforced technical constraint** (unlike an
  AcroForm's own `comb` flag with a printed `charLimit`, as seen in
  `lk/imm`). `maxLength` values on this schema are therefore reasonable
  editorial estimates, not extracted metadata — disclosed as a judgment call
  rather than presented as a form-derived constraint.
- **This form has no printed required-field asterisk markup anywhere.**
  Requiredness was assigned per this registry's established practice:
  core/unconditional identity, birth, and permanent-address fields are
  marked `required`; fields with an explicit "if any"/no-cue/conditional
  character are left optional — consistent with `lk/imm`'s own precedent for
  the same no-asterisk pattern (e.g. `profession` left optional there and
  here, for the same reason).
- **`documents[]` is modelled from this same PDF's own printed instructions
  manual (pages 6-8, Item 10, sub-items i-viii)** — unlike `lk/imm`, whose
  separate "Instructions to Passport Applicants" PDF was a zero-text scanned
  image and could not be used as a `documents[]` source, this form's
  instructions are pages of the same extractable specimen. 10 `documents[]`
  entries are modelled: photographs (identity-document, required); birth
  certificate/probable age certificate copy (supporting-evidence, required
  as the baseline case); a birth-registration search affidavit (alternative
  to the birth certificate); a marriage certificate copy (only if a married
  woman wants her husband's name shown); a citizenship/dual-citizenship
  certificate copy; a priesthood ordination certificate copy; a disrobe
  certificate copy; a religious-authority confirmation certificate copy; a
  Divisional Secretary's late-application report; and a police report for a
  lost card (`requiredWhen` `purposeOfApplication` equals `"lost"`, the one
  document entry with a genuine gating field to condition on).
- Part Two (Certifying Officer attestation), Part Three (Acknowledgment
  slip), the payment/fee-receipt page, and the applicant's/officer's own
  signature or left-thumb-impression are staff-only or physical artifacts,
  out of scope.

## Validation runs

- `node tools/validate.mjs registry/lk/drp/application-for-a-national-identity-card/1.0.0/schema.json` — **passes**.
- `node tools/validate-ajv.mjs registry/lk/drp/application-for-a-national-identity-card/1.0.0/schema.json` — **passes** (draft 2020-12, spec v0.3 meta-schema).
- A from-scratch conformance-checker script (scratch, not committed —
  evaluates `required`/`requiredWhen`/`validation.pattern`/`maxLength`/`enum`
  against each fixture) found: both `valid-*.json` scenarios raise **0
  errors**; each of 8 `mutation-control-*.json` fixtures raises **exactly 1
  error**. See
  `conformance/lk/drp/application-for-a-national-identity-card/1.0.0/`.

## Out of scope, disclosed

- Page 5 ("Details of the Payments made" / "FOR OFFICE USE ONLY") — physical
  stamp/receipt-affixing panel, no printed fee amount; office/payment
  processing only.
- Part Two (Certifying Officer attestation) and Part Three (Acknowledgment
  slip) — staff-only.
- Applicant's/officer's own signature or left-thumb impression, and
  photograph placement/scanning-panel instructions — physical artifacts.
- Item 8.2's printed heading ("Postal Address") vs. the instructions
  manual's description of the same cage (a different current residence
  address) — a genuine specimen discrepancy, disclosed rather than resolved
  by inference; this schema follows the printed heading.
