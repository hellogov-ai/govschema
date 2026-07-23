# Verification record — tj/andoz/sole-proprietor-registration@1.0.0

## Candidate selection

GOV-4499 ("GovSchema Standard Research"). The candidate was found and byte-hashed during the GOV-4424 scouting pass (2026-07-22) and re-confirmed byte-identical during the GOV-4488 re-scan (2026-07-23, Known Gaps entry 0k), which banked Tajikistan's Business Formation vertical as "a ready-to-author 2-of-6 backlog for a future cycle" alongside the National ID candidate — neither had its field structure extracted at that time. This cycle performs that extraction from scratch rather than trusting either prior scouting note's own description.

## Reaching the live source

Independently re-fetched and re-hashed:

- `https://andoz.tj/docs/shaakli-arizaho/form_№2.pdf` (URL-encoded Cyrillic-numeral-sign filename)
- HTTP 200, `Content-Type: application/pdf`, `Content-Length: 644,554` bytes — byte-for-byte matching both the GOV-4424 and GOV-4488 banked records.
- sha256 `c66ee812dfddbe0098993884e45e6929ac813149dbc56dacbd3354ead74291a3`.
- `andoz.tj` serves an untrusted/self-signed TLS certificate — a plain `curl` fails with "unable to get local issuer certificate". Retrieved with `curl -k` (certificate verification skipped), the same deliberate, disclosed exception already documented for the sibling `tj/andoz/simplified-tax-declaration`, not a sign of a compromised or unofficial source.
- No login/CAPTCHA/WAF gate beyond the certificate quirk.

## Extraction method

Extracted with `pdfjs-dist` (vendored at `/tmp/node_modules/pdfjs-dist`, CommonJS build `legacy/build/pdf.js`). `getAnnotations()` confirmed zero `/Widget` annotations across all 6 pages — a flat (non-AcroForm), print-and-fill specimen, matching the sibling `tj/andoz/simplified-tax-declaration`.

`getTextContent()`'s raw text layer renders as heavy mojibake for most Cyrillic runs on this specimen — its embedded font subset maps glyphs through a non-standard encoding pdfjs cannot resolve to correct Unicode for every character (the same class of embedded-font glyph-mapping artifact already disclosed elsewhere in this registry, e.g. `se/polisen/medgivande-pass-nationellt-id-kort-minderarig` and `dk/motorstyrelsen/21059-foreign-vehicle-permit`). Rather than attempt to reverse-engineer or guess at the broken mapping, every page was instead rendered to a PNG via `pdfjs-dist` + `node-canvas` (vendored at `/tmp/node_modules/canvas`) at 2.5x scale and read visually — the font paints correctly on the page; only its ToUnicode/CMap text-extraction mapping is broken. Every field label, digit-box grid, and checkbox in this schema was confirmed directly from the rendered page image, not the garbled text layer.

## Document structure

A 6-page specimen ("Шакли №02", confirmed by hashi.gov.tj [sic — the print at the top-right of page 1 reads "Шакли № 02"]):

- **Pages 1-4**: the base application form, this document's own scope.
  - Registrar-only header block (excluded — see below).
  - **Қисми I** (Part I): information about the submitting applicant, that applicant's own address, and the state-duty payment box.
  - **Қисми II** (Part II): general information about the natural person being registered as an individual entrepreneur, plus that person's residential address.
  - **Қисми III** (Part III): the form of the entrepreneur's activity (Certificate / Farm-household / Patent / Certificate with special terms), the conditional farm-household land-holding sub-block, the declared activity type, and the business activity's own address.
  - **Қисми IV** (Part IV): information for a natural person not recognised as a citizen of the Republic of Tajikistan, filled in only in that case (per the Part's own printed instruction), followed by the applicant's signed attestation and the receiving official's own acceptance block (excluded — see below).
- **Page 5**: "Замимаи №01" — a standalone annex on additional farm/peasant-household members who are themselves natural persons, with its own "Ба аризаи рақами" (reference-to-parent-application) header and its own "01-01" page numbering — a genuinely separate, repeatable document, not a continuation of the base form.
- **Page 6**: "Замимаи №02.1" — a standalone annex on additional main activity types, likewise separately paginated and separately referenced.

## Scope: excluded material

- **Замимаи №01** and **Замимаи №02.1** (pages 5-6) are both out of scope for this schema: each is a standalone, separately-referenced repeatable overflow annex (filed once per additional farm-household member, or once when more than one main activity type is declared), not a fixed step of the base 4-page application — the base form's own Part III item 2 instruction confirms this explicitly ("Агар шахси воқеӣ мақсади ба амал баровардани зиёда аз як намуди фаъолиятро дорад, ба аризаи мазкур замима илова карда мешавад" — "If the natural person intends to carry out more than one type of activity, an annex is added to this application"). This mirrors this registry's standing narrow-scoping precedent for repeatable/overflow annexes (e.g. this registry's own CATALOG.md Known Gaps entry 0a discussion of the Latvia D3/D3¹/GD exclusions).
- The **registering-authority header block** ("Мақоми бақайдгиранда", "Рақами ариза", "Санаи ариза"), explicitly captioned "ин қисмат аз тарафи мутахассиси мақоми бақайдгирӣ навишта мешавад" ("this part is filled in by the specialist of the registering authority"), and the **receiving official's own acceptance block** ("Имзои шахси масъуле, ки аризаро қабул кардааст", "Шахсияти аризадиҳанда муайян карда шуд") are both excluded as registrar/office-supplied data, not applicant-supplied — the same class of exclusion already documented for the sibling `tj/andoz/simplified-tax-declaration`'s tax-inspector acceptance block.

## Disclosed findings and interpretation choices

See this schema's own `verification.notes` field in `schema.json` for the full, field-by-field disclosure of every judgment call (applicantType enum, Cyrillic-required/Latin-optional name fields, the dual Part I/Part II identity blocks, applicantTin vs. entrepreneurHasTin/entrepreneurTin, entrepreneurGender enum, hasActivityLimitation, the activityForm enum and its farm-household requiredWhen gating, the three independently-modelled address blocks and their differing phone requiredness, the stateFee fields, and the Part IV foreign-national gating rationale) — reproduced here for convenience:

1. No field on this form carries a visible mandatory-field asterisk or equivalent marker anywhere in the rendered page images, the same un-asterisked-source situation already disclosed for `tj/andoz/simplified-tax-declaration`. Requiredness is asserted from structural necessity, disclosed field-by-field in `schema.json`'s own `verification.notes`.
2. `applicantType` is a 2-value enum matching the form's own two Part I checkboxes.
3. Cyrillic name fields are `required: true`; their Latin-transliteration counterparts are `required: false`, per the form's own "аз рӯи зарурат" ("as necessary") qualifier.
4. Part I and Part II each carry their own full identity-document block, since Part I identifies whoever is physically submitting the application (which may be an attorney-in-fact) while Part II always identifies the individual entrepreneur being registered.
5. `applicantTin` is `required: false`, distinct from Part II's own explicit `entrepreneurHasTin`/`entrepreneurTin` yes/no gate — a first-time registrant will frequently have no TIN yet.
6. `entrepreneurGender` is a 2-value enum (`female`, `male`), per the form's own "Зан"/"Мард" checkboxes in that printed order.
7. `hasActivityLimitation` is `required: true`, an unconditional Ҳа/Не question applying to every registrant.
8. `activityForm` is a 4-value enum per the form's own four checkboxes.
9. Six fields are `requiredWhen activityForm equals "farm-household"`: `farmHouseholdFullName`, `farmLandTotalAreaHectares`, `farmHouseholdMemberCount`, `farmLandDocumentName`, `farmLandDocumentDate`, `farmLandDocumentIssuingAuthority`. The four land-type-breakdown fields and `farmLandDocumentNumber` remain `required: false` even under that branch, since a given holding will not necessarily populate every one of them.
10. `foreignResidenceDocumentType` is left plainly `required: false` at the top level (Part IV's own gating condition — non-citizenship — has no fillable indicator on this form to key a `requiredWhen` against), but its own three sub-fields ARE gated `requiredWhen foreignResidenceDocumentType in [...]`, since that field is itself a genuine fillable tri-state indicator once populated. The work-permit block is left entirely ungated, since the form prints no selector for whether a given foreign registrant needs a work permit on file.
11. The three address blocks (applicant/residential/business) are each modelled independently (GovSchema v0.3 fields are flat, no nested object composition); city/district are `required: true` in all three, other sub-fields `required: false`.
12. Mobile phone is `required: true` for the applicant and residential-address blocks, `required: false` for the business-address block (already captured elsewhere on the same form).
13. `stateFeeAmount`/`stateFeePaymentDate`/`stateFeeBankReceiptNumber` are each `required: false` — printed in the same registrar-facing shaded header panel as the explicitly registrar-only fields, so not assumed always known to the applicant in advance.
14. Physical signature marks are not separately modelled as data; captured by the `registrationApplicationAttestation` document's own `required: true`.

## Conformance

3 valid mock scenarios (`valid-individual-entrepreneur-certificate`, `valid-attorney-filed-farm-household`, `valid-foreign-national-residence-permit`), 6 mutation-control fixtures (one missing statically-required field each from `applicantType`, `applicantSurnameCyrillic`, `entrepreneurSurnameCyrillic`, `entrepreneurGender`, `activityForm`, `activityType`), and 1 unknown-field-rejected fixture — all committed under `conformance/tj/andoz/sole-proprietor-registration/1.0.0/`.

An ephemeral, from-scratch conformance checker (deriving required/requiredWhen rules directly from this schema's own `fields[]`, discarded after use, not committed) ran all 10 fixtures: all 3 valid scenarios at 0 errors (the farm-household and foreign-national conditional branches both exercised and validated correctly), all 6 mutation controls each raising exactly 1 error, and the unknown-field fixture correctly rejected with exactly 1 error.

Validated clean with `node tools/validate.mjs` (622/622 documents passed) and `node tools/validate-ajv.mjs` (622/622 documents validated against the meta-schema). `registry-index.json` regenerated via `npm run build-index` in `tools/govschema-client/`.
