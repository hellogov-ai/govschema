# Verification record — `is/samgongustofa/vehicle-ownership-transfer` v1.0.0

## Candidate selection

This session's brief (GOV-2219, child of the recurring research issue
GOV-2217) was to open **Iceland's DMV vertical (4th of 6)** using
Samgöngustofa's (Icelandic Transport Authority) Form US.140, "Tilkynning um
eigendaskipti að ökutæki" (Notification of Change of Vehicle Ownership).
Iceland previously stood at 3 of 6 verticals: Business Formation and Taxes
(`is/skatturinn`) and Visa (`is/utl`, GOV-2210); Passport and National ID
remain open, unscreened-or-dead-end backlog.

The brief named the target PDF (a `ctfassets.net` Contentful CDN asset) and
explicitly warned of a same-named but structurally different mirror at
`samgongustofa.is/media/umferd/okutaeki/US_140-...pdf` — flagged as
flat/scanned with no form fields, a trap seen before in this registry
(GOV-2210's own duplicate-CDN-asset finding). This schema is derived
exclusively from the named `ctfassets.net` PDF; the mirror was independently
double-checked (see "Mirror check" below), though it could not be refetched
at the exact truncated URL given in the brief.

## Source

- **Primary:** `https://assets.ctfassets.net/8k0h54kbe6bj/2PUZjYRsN9J4LSLoXtKn5g/3179f0b6a641dbbdb83460c5cbd1c19e/US.140_Tilkynning_um_eigendaskipti_a___kut_ki_12022024.pdf`
  — fetched fresh this session with a browser User-Agent
  (`curl -A "Mozilla/5.0 ... Chrome/124.0 Safari/537.36"`): **HTTP 200**,
  `content-type: application/pdf`, exactly **137,237 bytes**, SHA-256
  `1aaea347530b0d736ff0dda6a5354c7d5f239cc59cd90738575dca5d70ed136a`.
  `Last-Modified: Fri, 16 Feb 2024 09:43:56 GMT` per the server's own
  response header (matching the filename's own `12022024` — 12 February
  2024 — date stamp, and the form's own footer "12.2024"). No login,
  CAPTCHA, or WAF/bot-mitigation challenge was encountered.
- **Retrieved:** 2026-07-10.
- **Reviewer:** GovSchema Engineering (initial authoring source-review).

`node tools/verify-sources.mjs registry/is/samgongustofa/vehicle-ownership-transfer/1.0.0`
re-fetched the cited URL a second time immediately before finalizing this
record: 1 directory, 1 URL checked, 0 warnings, 0 allowlisted, all clear.
No entry was added to `tools/verify-sources-allowlist.json` — this domain
needs none.

### Mirror check

The brief's flagged mirror URL (`samgongustofa.is/media/umferd/okutaeki/
US_140-...pdf`, given truncated with an ellipsis) was attempted at the most
plausible literal expansion
(`US_140-tilkynning-um-eigendaskipti-a-okutaeki.pdf`) and returned **HTTP
404**. The authority's current landing page for this process
(`samgongustofa.is/umferd/okutaeki/eigendaskipti/`) returned HTTP 200 but is
a JS-rendered application shell with no directly-scraped PDF link in its raw
HTML, so the exact flagged mirror asset could not be independently
refetched this session — it may have been renamed, removed, or replaced
since the brief was written. This is a lower-risk gap than usual: this
schema does not rely on the mirror at all, and the primary specimen was
independently confirmed (see below) to be a genuine fillable AcroForm with
exactly the widget count the brief itself asserted, which is strong
corroborating evidence the correct file was used regardless of the mirror's
current fetchability.

## Extraction method

Confirmed programmatically with `pdfjs-dist` (`build/pdf.js`, Node ESM)
before any field cataloguing began:

- `doc.numPages` → **1** (a genuinely single-page notification, matching
  the form's own footer "Síða: 1 af 1").
- `doc.getFieldObjects()` → exactly **31 keys**.
- `page.getAnnotations()` → exactly **31 Widget annotations** on the single
  page — matching the brief's own claimed field count exactly, and matching
  `getFieldObjects()`'s key count exactly (no orphaned/duplicate widgets).

Every widget's field name, type, rect, and (for buttons) `radioButton`/
`checkBox`/`buttonValue`/`exportValue` was dumped, then cross-walked to its
printed label using a position-aware (x/y proximity) script: `page.
getTextContent()` items were sorted by descending y then ascending x and
manually paired against each widget's rectangle by visual column/row
alignment — the same technique this registry's `at/bmeia`,
`se/migrationsverket`, and `is/utl` schemas describe using, rather than
eyeballing the rendered page alone.

## Two non-obvious structural findings

1. **The insurance-company checkboxes and the TRAILER/OUT_OF_USE checkboxes
   are one flat 7-option list, not a 5-option group with 2 unrelated boxes
   appended.** Initial inspection treated `INSU_6080`/`INSU_6090`/
   `INSU_6070`/`INSU_6075`/`INSU_6010` (5 named insurers) as one group and
   `TRAILER`/`OUT_OF_USE` as separate, independently-toggleable checkboxes
   elsewhere on the page. Re-examining the extracted rects showed all 7
   widgets share the *same two x-columns* (`x≈299.4` and `x≈453.2`) in a
   *continuous* row sequence (y = 516.0, 500.0, 484.1, 468.1) — column 1
   runs 80 → 90 → 98 (TRAILER) → 99 (OUT_OF_USE), column 2 runs
   70 → 75 → 10 and simply stops one row short. This is a single
   single-select checkbox list of 7 options under one heading
   ("Tryggingarfélag kaupanda/umráðamanns") — the buyer/operator declares
   *either* a named insurer *or* that the vehicle is a trailer covered
   under its towing vehicle's own insurance *or* that the vehicle is being
   taken out of use. Modelled as one `enum` field, `insuranceStatus`, with
   all 7 values, per this registry's established preference (`is/utl`,
   `at/bmeia`, `se/migrationsverket`) for a true single-select-among-named-
   values grid over `exclusivityGroups` (spec reserves the latter for
   independently-named booleans carrying their own sub-fields — not the
   case here).
2. **Two checkboxes carry no field name at all in the source PDF's own
   AcroForm.** `pdfjs-dist` synthesised the keys `"undefined"` and
   `"undefined_2"` for these two — meaning the government's own PDF has no
   `/T` entry for either widget, a genuine authoring omission upstream, not
   an extraction artifact (confirmed by checking the raw annotation dict
   had no name key at all, not an empty string). Positionally, these two
   checkboxes sit on the label line "Nafn ☐ meðeiganda / ☐ umráðamanns"
   (Name: co-owner / operator), directly above two further, separately-named
   text fields (`OPER_NAME_1`, `OPER_NAME_2`) that themselves sit under
   printed row numbers "1." and "2." — i.e. up to two named people can be
   entered on the buyer's side, tagged as either co-owners (meðeigendur) or
   an operator (umráðamaður). Modelled as `buyerSecondPartyRole` (enum:
   `co_owner`/`operator`) plus `buyerSecondPartyName1`/
   `buyerSecondPartyName2`, rather than two untraceable boolean fields with
   no source field name to cite.

## Field reconciliation (31 widgets → 22 schema fields)

- **Vehicle/sale (5 fields, 5 widgets):** `vehicleRegistrationNumber`
  (`PERMNO`), `vehicleType` (`TYPE`), `purchaseContractDate` (`PURCHDATE`),
  `mileage` (`MILEAGE`), `salePrice` (`SALE_AMOUNT`, the form's own only
  field explicitly marked "(valkvætt)"/optional in its printed label).
- **Seller/buyer core identity (10 fields, 10 widgets):**
  `sellerNationalId`/`buyerNationalId` (kennitala), `sellerName`/
  `buyerName`, `sellerAddress`/`buyerAddress`, `sellerContact`/
  `buyerContact` (each a single combined email/phone box), plus
  `sellerCoOwnerNationalId` and `sellerCoOwnerName` (the seller-side
  co-owner block, `SELLER_COOWNE_PERSIDNO`/`SELLER_COOWNER_NAME`).
- **Buyer-side second party (4 fields, 4 widgets):**
  `buyerSecondPartyNationalId` (`BUYER_COOWNER_OPER_PERSIDNO`),
  `buyerSecondPartyRole` (the two unnamed checkboxes, see finding 2),
  `buyerSecondPartyName1`/`buyerSecondPartyName2` (`OPER_NAME_1`/
  `OPER_NAME_2`).
- **Usage/insurance (2 fields, 8 widgets):** `alternateUsageCategory` (the
  oddly-auto-named `"Notkunarflokkur  Ökutækjaleiga"` widget — its actual
  function, per the surrounding note about the ökutækjaleiga category
  auto-reverting "unless otherwise specified," is a free-text override
  box, not a label for the note itself), `insuranceStatus` (see finding 1,
  7 widgets: `INSU_6080`/`INSU_6090`/`INSU_6070`/`INSU_6075`/`INSU_6010`/
  `TRAILER`/`OUT_OF_USE`).
- **Witnesses (2 fields, 2 widgets):** `sellerWitnessNationalId`/
  `buyerWitnessNationalId` (`SIGN1`/`SIGN2` — despite the generic field
  names, these are positioned directly under the two "Kt." labels beside
  "Vitundarvottur að undirskrift seljanda/kaupanda", i.e. each attesting
  witness's kennitala, not the party's own signature; the form has no
  digital field for the witness's printed name or wet-ink signature
  itself, consistent with this registry's practice of excluding true
  wet-ink signature lines).
- **Payment (1 field, 1 widget):** `bankTransferPayerNationalId` (the
  field literally named with its own Icelandic instruction sentence,
  `"Skráið kennitölu þess sem millifærir hér"`).

**22 fields modelled, covering all 31 widgets** (the insurance-status enum
alone accounts for 7 of the 31).

## Scope decisions and judgment calls

- **`mileage` and `insuranceStatus` are `required: true`.** Neither is
  marked "(valkvætt)" the way `salePrice` explicitly is (the form's only
  printed optionality marker), both sit in the form's primary data rows,
  and `insuranceStatus`'s own out-of-use/trailer options mean there is
  always an applicable choice even for a vehicle being deregistered.
- **The two attesting-witness kennitala fields (`sellerWitnessNationalId`/
  `buyerWitnessNationalId`) are `required: true`**, per the form's own
  printed note directly above them: "Vitundarvottar þurfa að vera orðnir 18
  ára. Athugið að votta þarf bæði fyrir kaupanda og seljanda" (witnessing is
  required for both buyer and seller) — a source-asserted requirement, not
  a structural guess.
- **Co-owner/second-party fields are `required: false`, not gated by a
  fabricated boolean.** The form has no explicit "does this vehicle have a
  co-owner?" checkbox; presence of a co-owner is conveyed only by whether
  the filer completes the relevant boxes, matching this registry's
  established practice for real-world-conditional (not printed-conditional)
  optionality (e.g. `ar/dnrpa/solicitud-tipo-08-transferencia-automotor`'s
  co-buyer/co-seller blocks).
- **`buyerSecondPartyName1`/`buyerSecondPartyName2` are not linked with
  `requiredWhen` against `buyerSecondPartyRole`.** The condition grammar
  (GSP-0013) has no field-presence operator, and comparing an optional enum
  against a sentinel misfires the same way this registry's
  `ar/dnrpa/solicitud-tipo-08-transferencia-automotor` VERIFICATION.md
  already documents for an analogous case; each field's `description`
  states the relationship in prose instead.
- **Composite address fields, not exploded sub-boxes.** `sellerAddress`/
  `buyerAddress` are each a single printed box on this specimen (unlike
  some sibling forms' multi-row address grids), so no explosion decision
  was even needed here — modelled directly as one field each.
- **Kennitala fields use a shared `pattern`** (`^[0-9]{6}-?[0-9]{4}$`,
  6 digits + optional hyphen + 4 digits) reflecting the standard Icelandic
  national-identifier format, matching how sibling `is/*` schemas format
  kennitala-shaped fields.
- **Out of scope:** every wet-ink signature line ("Undirskrift seljanda/
  kaupanda/meðeiganda/umráðamanns"), the consent-to-processing declaration
  paragraph (a fixed pre-printed attestation the signature itself
  satisfies, not a fillable field), and the entire lower informational
  block (payment amount/account number, tax/fee explanatory notes for
  bifreiðagjald/vanrækslugjald/kílómetragjald) — these are Samgöngustofa's
  own printed guidance to the filer, not applicant-authored data, consistent
  with this registry's established practice of excluding fixed prose blocks
  and third-party-executed signature lines.

## Mock conformance test

A standalone Node script (`conformance.mjs`, not committed — ad hoc
verification harness matching this registry's usual practice) evaluates
required-field presence, `enum` membership, `date` format, `pattern`, and
`minLength`/`maxLength`/`minimum`/`maximum` bounds.

- **Valid mock 1** — the simplest real-world case: a single natural-person
  buyer and seller, no co-owner/second-party data, no sale price, insurer
  declared. **0 errors.**
- **Valid mock 2** — the maximal case: an electric vehicle with a seller-side
  co-owner, a buyer-side second party tagged `co_owner` with two named
  entries, an alternate usage category, the vehicle declared `out_of_use`,
  and a bank-transfer payer kennitala. **0 errors.**
- **Negative control 1** — `mileage` removed and `insuranceStatus` set to an
  out-of-enum value (`"geico"`). **Fails** with both flagged (`mileage:
  required but missing`, `insuranceStatus: value "geico" not in enum`), as
  expected.
- **Negative control 2** — `sellerWitnessNationalId` removed from mock 1.
  **Fails** with that field flagged missing, confirming the witness
  requirement fires correctly.

## Tooling run

- `node tools/validate.mjs registry/is/samgongustofa/vehicle-ownership-transfer/1.0.0/schema.json` → `ok`, 1/1 passed.
- `node tools/validate-ajv.mjs registry/is/samgongustofa/vehicle-ownership-transfer/1.0.0/schema.json` → `ok` (validated against spec v0.3 meta-schema, ajv 2020-12).
- `node tools/verify-sources.mjs registry/is/samgongustofa/vehicle-ownership-transfer/1.0.0` → 1 directory, 1 URL checked, 0 warnings, 0 allowlisted, all clear.
- `npm run build-index` (from `tools/govschema-client/`) → regenerated `registry-index.json` to include this document.

## Re-verification

Per the `manual-source-review-v1` practice's cadence, `nextReviewBy` is set
to **2027-01-10** (~6 months): this is a from-scratch opening of Iceland's
DMV vertical with two non-obvious structural findings (the 7-option flat
insurance/status list, and the two unnamed second-party-role checkboxes).
Re-check the cited PDF URL, confirm no newer specimen has replaced it, and
attempt the flagged mirror check again (its exact URL could not be
refetched this session) on or before that date and on any `source.url`
change.
