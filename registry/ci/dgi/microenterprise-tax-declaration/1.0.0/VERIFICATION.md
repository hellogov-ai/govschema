# Verification record — ci/dgi/microenterprise-tax-declaration@1.0.0

## Candidate selection

GOV-4547 ("GovSchema Standard Research"). Picked up from Known Gaps entry 0l's
own banked candidate (GOV-4539, 2026-07-23), which scouted Côte d'Ivoire fresh
across all 6 verticals when it opened the jurisdiction via
`ci/dst/visa-application`. That cycle found this Taxes candidate — DGI's
micro-enterprise income-tax declaration — real, unauthenticated, and live
(245,929 bytes), but left it as open backlog since Visa's specimen was chosen
for that cycle's authoring.

## Reaching the live source

Located via web search (the GOV-4539 banked record noted only the filename,
not the full URL) at
`https://www.dgi.gouv.ci/assets/documents/imprimes/11_DECLARATION_DE_LIMPOT_DES_MICROENTREPRISES.pdf`,
then independently fetched directly with a plain `curl` request using a
realistic desktop User-Agent (no login wall, CAPTCHA, or paywall):

- HTTP 200, `Content-Type: application/pdf`, `Content-Length: 245929` — a
  byte-for-byte match with the GOV-4539 banked record.
- sha256 `3f6bdde34a1bc239c0f8caa4d36e5b73b4a5d004876a5cca9a4ccd2697796c22`.

## Extraction method

Extracted with `pdfjs-dist` (vendored from an existing session scratch
install at `/tmp/node_modules`), reading each page's `getTextContent()`
output directly (item strings plus x/y transform position), grouped by
y-coordinate row and sorted by x-coordinate to reconstruct reading/column
order. `getAnnotations()` confirmed zero `/Widget` annotations on either
page — a flat (non-AcroForm) specimen. Both of the document's 2 pages were
additionally rendered to PNG via `pdfjs-dist` + `node-canvas` (also vendored
at `/tmp/node_modules/canvas`) at 2.5x scale and visually reviewed, cropped
and re-examined at higher zoom where the table/box structure needed closer
inspection (the payment-mode table and the "N° C/C"/period box grids in
particular). As with several prior specimens in this registry, this
document's bolded section headers ("01", "02", "03", "04") and one row label
("Espèces", see Finding 6 below) render as solid black boxes or blank space
in the rasterized PNG despite extracting correctly through the text layer —
a broken-glyph-mapping/correct-underlying-text-extraction pattern, not
missing content.

## Document structure

A 2-page, French-language form: "Déclaration d'impôt des microentreprises"
(Articles 71 bis et suivants du Code Général des Impôts), Direction Générale
des Impôts (DGI). Page 1 carries a top-of-page office box (declaration
number/stamp/receipt date), the filing-period box grid and tax-office field,
Section 01 (taxpayer identification), Section 02 (tax determination at the
4%/6% rates), Section 03 (known elements of taxation), Section 04 (statement
of suppliers), and a "RESERVE A L'ADMINISTRATION" office box. Page 2 carries
the payment-mode table ("Règlement joint à l'ordre du Receveur des Impôts"),
explanatory footnotes, and the declaration place/date/signature block.

## Fields modelled

60 `fields[]` across 6 steps (Filing Period and Tax Assessment Office;
Taxpayer Identification; Tax Determination; Known Elements of Taxation;
Statement of Suppliers; Payment and Declaration).

## Disclosed source-fidelity findings

1. **The entire top-of-page box (from the page's own top rule down to just
   above "DECLARATION D'IMPOT DES MICROENTREPRISES") is excluded as
   office-only.** The rendered page confirms two boxed columns flanking the
   ministry letterhead — the left box is unlabelled in the extracted text
   (structurally mirroring the right box) and the right box reads
   "DECLARATION N°…./." directly beside "CACHET DU SERVICE" (office stamp)
   and "DATE DE RECEPTION" (date of receipt) labels printed immediately
   above it on the same rule line — none of it printed as applicant input.
2. **`taxAssessmentServiceOffice` ("SERVICE D'ASSIETTE DES IMPOTS DE ……") is
   modelled as an applicant-facing field, distinct from the excluded top
   box.** It sits on its own dotted line beside the filing-period box grid,
   not inside the ruled office box discussed in Finding 1, and identifies
   which local DGI tax-assessment service the taxpayer's business is
   attached to — information the taxpayer, not the receiving office, would
   supply when completing the form in advance of submission.
3. **The "PERIODE D'IMPOSITION" box grid (2 boxes captioned "Mois", 2 boxes
   captioned "Trim.", 4 boxes captioned "Année") is modelled as three
   separate optional numeric fields (`reportingMonth`, `reportingQuarter`,
   `reportingYear`) rather than one field**, since the source prints three
   visually distinct, separately-captioned box groups with no instruction
   stating they are mutually exclusive or must all be completed together.
   `reportingYear` is the only one of the three modelled `required: true`:
   this document's own footnote (3) states the underlying tax is an annual
   liability ("le montant de l'impôt annuel exigible") paid via monthly
   instalments, making the fiscal year the one universally-applicable value
   of the three; `reportingMonth`/`reportingQuarter` are modelled optional
   to accommodate whichever instalment cadence (monthly or quarterly) a
   given filer uses, per the same footnote.
4. **`taxpayerAccountNumber` ("N° C/C") is modelled with a 7-digit-plus-letter
   pattern**, matching the rendered page's own box grid (7 contiguous digit
   boxes, then a visually separated 8th box) and independently corroborated
   by a third-party reference describing Côte d'Ivoire's own NCC (Numéro de
   Compte Contribuable) format as 7 digits followed by a single letter (e.g.
   "9500015F").
5. **Section 02's "TAUX" (rate) column is excluded as a fixed printed value,
   not applicant input** — the rendered page shows "4 %" and "6 %" printed
   directly in that column for the form's own two rows, not left blank for
   the filer to complete. The corresponding "CHIFFRE D'AFFAIRES TAXABLE TTC"
   (taxable turnover) and "MONTANT" (tax amount) cells for each of the two
   rows are modelled as four separate optional fields
   (`taxableRevenueAt4Percent`/`taxAmountAt4Percent`,
   `taxableRevenueAt6Percent`/`taxAmountAt6Percent`), all optional, since
   footnote (2) confirms only one row applies to a given filer (the 4% rate
   applies to CGA members or taxpayers under an accounting-firm convention
   with the DGI; the 6% rate applies otherwise) and the form gives the
   filer no instruction to complete both. `MONTANT` is modelled as its own
   field rather than excluded as calculated, since — unlike this registry's
   closed GSP-0013 §7 precedent for excluding same-form arithmetic (e.g.
   `tj/andoz/simplified-tax-declaration` items 004/005) — this form prints
   no explicit textual formula tying MONTANT to the other two columns; the
   "(1) (2) (3)" column numbering implies a positional relationship but does
   not state one in words, so the field is included rather than assumed
   derivable.
6. **The payment-mode section ("Mode de paiement") is modelled as a
   `paymentMethod` enum (`BANK_CHEQUE`/`POSTAL_CHEQUE`/`CASH`) gating four
   further fields.** The rendered page shows two filled table rows, each
   with its own checkbox, dotted `Numéro`/`Date`/`Banque ou
   établissement`/`Montant` cells, captioned "Chèque … Bancaire" and "…
   Postal" respectively (both under a shared "Chèque (Cocher)" heading),
   while the text layer additionally places a third label, "Espèces" (cash),
   directly beneath at the same left-margin x-position — a row that renders
   entirely blank in the rasterized PNG (no checkbox or dotted cells visible
   in any column), the same broken-glyph pattern noted above. `checkNumber`,
   `checkDate`, `bankOrInstitution`, and `paymentAmount` are modelled
   `visibleWhen`/`requiredWhen` gated on `paymentMethod` being `BANK_CHEQUE`
   or `POSTAL_CHEQUE` via GSP-0013's `in` operator (mirroring
   `ug/mowt/driving-licence-application`'s established cross-tab
   convention), since only the two cheque rows print these cells; no
   equivalent dotted cell is printed anywhere near the `CASH` row for any of
   the four, so no field is fabricated for a cash amount.
7. **Section 03's eight numbered line items ("ELEMENTS D'IMPOSITION CONNUS
   AU : ……") are modelled `required: false`.** The form gives an explicit
   "known as of" date field (`elementsKnownAsOfDate`, modelled `required:
   true` since the section's own header dedicates a printed date blank to
   it) but no asterisk or other marking on any of the eight line items
   themselves, and several (e.g. `annualPremisesRent`,
   `numberOfProfessionalVehicles`) are not applicable to every
   micro-enterprise (e.g. a business with no rented premises or no
   vehicles) — mirroring this registry's standing precedent for
   un-asterisked, not-every-filer-has-every-line schedule items (e.g.
   `tj/andoz/simplified-tax-declaration` Finding 7).
8. **The "ETAT DES FOURNISSEURS" (statement of suppliers) table is modelled
   as a bounded 4-slot repeating group** (`supplier1Identity` through
   `supplier4Amount`), matching the rendered page's own four numbered rows
   (1-4); all slots are optional, since a micro-enterprise is not guaranteed
   to have exactly four (or any) suppliers to disclose.
9. **`companyName`, `taxpayerAccountNumber`, `businessActivity`, and
   `addressCommune` are modelled as the only required Section 01
   identification fields**, alongside the required `elementsKnownAsOfDate`
   (Finding 7) and the required filing-period/tax-office fields (Findings
   2-3). No asterisk or other required-field marking appears anywhere on
   this form; these four were selected as the minimum information the DGI
   could not process a declaration without (the filer's legal name, its
   unique taxpayer account number, what the business does, and which
   commune it operates in), while every other Section 01 detail (trade
   name/sigle, address components beyond commune, cadastral references,
   CGA/accounting-firm affiliation) is modelled optional since a given filer
   may not have all of them (e.g. a filer with no CGA affiliation, no
   cadastral parcel reference, or no separately-named trade sigle).
10. **The signature is modelled as a plain `signature` string field, not a
    `documents[]` entry**, matching this registry's `ci/dst/visa-application`
    precedent (`applicantSignature`) for this jurisdiction's own
    signature-block convention, rather than the `documents[]`-entry
    convention used elsewhere for a physically attached signature/
    attestation page.

## Conformance

3 valid mock scenarios — `valid-standard-rate-cash-filer` (a 6%-rate,
cash-paying annual filer with no CGA affiliation); `valid-cga-member-bank-cheque-with-suppliers`
(a 4%-rate, CGA-affiliated, bank-cheque-paying filer with two suppliers
declared); `valid-accounting-convention-postal-cheque-quarterly` (a 4%-rate
filer under an accounting-firm/DGI convention, paying by postal cheque on a
quarterly cadence) — plus 12 mutation-control fixtures (a missing-required
fixture for each of this schema's 10 statically-required fields —
`reportingYear`, `taxAssessmentServiceOffice`, `companyName`,
`taxpayerAccountNumber`, `businessActivity`, `addressCommune`,
`elementsKnownAsOfDate`, `paymentMethod`, `declarationDate`, and
`signature`; an invalid `paymentMethod` enum value; and an
unknown-field-rejected fixture) are committed under
`conformance/ci/dgi/microenterprise-tax-declaration/1.0.0/`.

An ephemeral, from-scratch conformance checker (deriving required/enum/
pattern rules directly from this schema's own `fields[]`, including its
`visibleWhen`/`requiredWhen` gates, discarded after use, not committed) ran
all 15 fixtures: all 3 valid scenarios at 0 errors, and all 12 mutation
controls each raising exactly 1 error of the expected kind.

Validated clean with `node tools/validate.mjs` and `node tools/validate-ajv.mjs`,
individually and as part of the full registry run. `registry-index.json`
regenerated via `npm run build-index` in `tools/govschema-client/`.
