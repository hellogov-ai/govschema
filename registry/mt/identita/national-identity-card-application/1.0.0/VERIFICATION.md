# Verification record — mt/identita/national-identity-card-application@1.0.0

## Candidate selection

GOV-4223 ("GovSchema Standard Research"). Form ID10a was scouted and
banked as a strong candidate in the GOV-4215 cycle (parent of GOV-4217,
which authored this document's own sibling
`mt/identita/passport-application`), but not authored until this cycle.
Deepens Malta past its first two published verticals
(`mt/jobsplus/self-employed-declaration-of-commencement`, Business
Formation; `mt/identita/passport-application`, Passport), opening the
National ID & Civic Documents vertical (3 of 6).

## Reaching the live source

Target:
`https://identita.gov.mt/wp-content/uploads/2025/05/7.-Form-ID-10a.pdf`.

- Re-fetched directly with a realistic desktop Chrome User-Agent: HTTP
  200, `Content-Type: application/pdf`, 301,934 bytes (the GOV-4215
  scouting note's own estimate was ~294KB, within rounding of the exact
  byte count).
- sha256 of the retrieved bytes: `803cd53d1e81bc52a4e1ea53d05913b9ad10bfb11ad84ae3526998528089dec2`.
- No login, CAPTCHA, or Cloudflare/WAF gate on the asset itself.
- Confirmed mechanically: the retrieved bytes begin `%PDF-1.4` with a
  `/Linearized` dict reporting `/N 4` (4 pages), and contain no
  `/AcroForm`/`/Widget` occurrences — a flat, print-and-fill specimen,
  like its own sibling Form A.

## Extraction method

This PDF's own text-showing operators use the same custom glyph-index
font encoding as Form A (unreadable via a raw `zlib`-stream/paren-regex
read). Resolved the same way: `pdfjs-dist`'s real text-layer extraction
running the PDF's own embedded `ToUnicode` CMaps, recovering clean,
position-tagged Unicode text for all 4 pages directly from the PDF's own
glyph-to-Unicode mapping, not an OCR guess.

Page 4 is entirely a bilingual (Maltese/English) GDPR privacy notice with
no applicant input, and is excluded. Pages 1-3 carry all applicant-facing
content across five printed sections (A.01, A.02, B.03, C.04, D.05).

Models 27 `fields[]` across 6 steps (Section D.05's own two applicant-facing
sub-blocks — an urgent-processing request and a collection-method
election, each with its own signature line — are modelled as two separate
steps, since they are structurally distinct despite sharing one printed
section header) and 2 `documents[]` entries.

Excluded from `fields[]`: the page-1 "Għal Użu Intern" (For Internal Use)
office box (year/age-bracket/urgency/hub/collection tick-boxes), the
barcode-label placement box, and every "Uffiċjal ta' Identità" (Identità's
Officer) signature line — none of which are applicant-supplied data.

## Disclosed source-fidelity findings

1. **This form's asterisk convention differs from its own sibling
   `mt/identita/passport-application`.** In Form A, the only two
   field-level asterisks flag checkbox-style fields (per an explicit
   "tick the box" footnote), not required ones. This form's asterisks
   track the page-1 instruction literally ("FILL IN ALL MANDATORY FIELDS
   (*) AND ALL OTHER FIELDS AS APPLICABLE") with no overriding footnote:
   the three field-level asterisks in Section A.01 (`identityCardNumber`,
   `name`, `surname`) are genuine mandatory text fields, modelled
   `required: true`. No other field in Section A.01 carries its own
   asterisk — `nameKnownAs`/`surnameKnownAs`/`sex`/`dateOfBirth`/
   `placeOfBirth` are modelled `required: false`, on the theory that the
   applicant's biographical particulars are presumably already on
   Identità's file under the supplied Identity Card number for a
   renewal/replacement filing, and this form's own printed marks do not
   distinguish a first-time-applicant case that would need them supplied
   fresh.

2. **Section-header-level asterisks (Sections A.02, B.03, C.04, D.05) are
   not uniformly extended to their own constituent fields.** Section
   A.02's own header asterisk is modelled as making its core address
   line fields (`addressNumber`, `addressStreetName`, `addressLocality`)
   required, while `addressPropertyName` (a named-property line not
   every address has) is modelled optional. Section C.04's declaration
   fields are modelled uniformly required, since a declaration section is
   not functional without them, and — unlike its sibling Form A — this
   form prints no minor-applicant carve-out anywhere exempting a
   signature. Section B.03's header asterisk is not extended to its own
   individual contact fields (`telephoneNumber`/`mobileNumber`/
   `emailAddress`), which are modelled optional consistent with
   `mt/identita/passport-application`'s own equivalent-fields precedent,
   absent any field-level mark distinguishing them.

3. **Section A.02's conditional supporting-document requirement modelled
   as a directly-supplied boolean gate.** The section's own header reads,
   verbatim: "ADDRESS (PROPERTY DETAILS) - PROOF OF ADDRESS FOR CHANGE OF
   ADDRESS IS NECESSARY." This is a conditional supporting-document
   requirement, not a field-level instruction. Modelled as `addressHasChanged`
   (not a printed checkbox) — the same convention `mt/identita/passport-application`
   and `cy/crmd/passport-application` each established for their own
   compound-eligibility-note gates — controlling the `proofOfAddressDocument`
   document's `requiredWhen`.

4. **Section D.05 is printed "FOR OFFICIAL USE" yet its content is
   applicant-facing, not office-only.** Beneath that header sit a static
   notice about presenting the old/temporary card at collection, an
   urgent-processing request sub-block (its own blank reason line plus an
   applicant signature), and a collection-method election sub-block (its
   own blank Servizz.gov hub-location line plus an applicant signature) —
   each genuinely completed and signed by the applicant, with a separate
   "Uffiċjal ta' Identità" (Identità's Officer) line following each as the
   true office-only content. This mismatch between the section's own
   printed title and its actual applicant-facing content is disclosed
   here rather than silently corrected; this schema models the two
   applicant-facing sub-blocks as their own steps (`urgent_processing`,
   `collection`) and excludes only the genuine officer-signature lines.
   Presenting an old/temporary identity card at collection is modelled as
   the `oldOrTemporaryIdentityCardForCollection` document with
   `required: false`, since the form's own wording ("in order to pick up
   the new identity card, I have to present the old identity card or the
   temporary identity card") is printed unconditionally with no
   first-time-applicant carve-out, yet this form's own internal-use age
   brackets (14-15, 16-17, 18+) suggest it also covers a genuine
   first-issuance filing, where no prior card would exist — disclosed as
   a tension between the blanket printed wording and the practical
   first-time-applicant case, rather than encoded as always-required.

5. **The two collection-method sub-headings modelled as an enum plus a
   dependent field.** "Tinġabar mit-Taqsima tal-Karta tal-Identità" /
   "Picked up from the Identity Card Section" (naming the Gattard House,
   Blata l-Bajda office) and "Tinġabar mill-Hub ta' Servizz.gov" / "Picked
   up from the Servizz.gov Hub" (with a blank line for the specific hub)
   are modelled as `collectionMethod` (enum) plus a dependent
   `servizzGovHubLocation` — the same enum-plus-dependent-text-field
   convention `mt/identita/passport-application`'s own
   `dualCitizenshipStatus`/`otherCitizenshipCountry` pair used.

## Conformance

2 valid mock scenarios and 8 mutation-control fixtures committed under
`conformance/mt/identita/national-identity-card-application/1.0.0/`:

- `valid-renewal-with-address-change-urgent-hub-collection.json` — a
  renewal/replacement filing with an address change (proof of address
  attached), opting into an eID account and requesting urgent processing,
  collecting from the Servizz.gov hub.
- `valid-straightforward-no-change-unit-collection.json` — a
  straightforward filing with no address change and no urgency, collecting
  from the Identity Card Section (Gattard House).
- 8 mutation controls: three missing statically-required fields in turn
  (`mutation-missing-identitycardnumber-required.json`,
  `mutation-missing-surname-required.json`,
  `mutation-missing-collectionmethod-required.json`); a missing
  `urgentProcessingReason` while `urgentProcessingRequested` is true
  (`mutation-missing-urgentprocessingreason-requiredwhen.json`); a missing
  `servizzGovHubLocation` while `collectionMethod` is `SERVIZZ_GOV_HUB`
  (`mutation-missing-servizzgovhublocation-requiredwhen.json`); an invalid
  `sex` enum value (`mutation-invalid-sex-enum.json`); an invalid
  `collectionMethod` enum value (`mutation-invalid-collectionmethod-enum.json`);
  and an unknown top-level field (`mutation-unknown-field-rejected.json`).
  Documents (`oldOrTemporaryIdentityCardForCollection`,
  `proofOfAddressDocument`) are not represented in these field-value
  fixtures — consistent with `mt/identita/passport-application`'s own
  fixture convention — so the ephemeral checker's document-`requiredWhen`
  dangling-reference check is structural only (confirms `addressHasChanged`
  resolves to a real field), not instance-tested.

An ephemeral, from-scratch conformance checker (deriving required/
requiredWhen rules directly from this schema's own `fields[]`/`documents[]`,
discarded after use, not committed) ran all 10: both valid scenarios at 0
errors, all 8 mutation controls each raising exactly 1 error, and confirmed
every `requiredWhen` field/document reference resolves (0 dangling
references).

Validated clean with `node tools/validate.mjs` and `node tools/validate-ajv.mjs`
(582/582 both), individually and as part of the full registry run.
`registry-index.json` regenerated via `npm run build-index` in
`tools/govschema-client/` (581 → 582 entries).
