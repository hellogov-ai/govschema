# Verification record — `de/finanzamt/income-tax-return-elster` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-02`

The document was derived from ELSTER's own guidance describing the VaSt
pre-fill service and the official paper form ELSTER's online screens mirror.
The full field-by-field comparison the practice requires against the **live,
authenticated Mein ELSTER online screens** (Procedure step 2) has not been
completed, so this remains `draft`, not `verified`.

## Sources examined

- **Document `(id, version)`:** `de/finanzamt/income-tax-return-elster` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Bundeszentralamt für Steuern ("ELSTER"), filings routed to
  the taxpayer's local Finanzamt.
- **Primary source (flow/pre-fill):**
  <https://www.elster.de/elsterweb/infoseite/belegabruf_(privatpersonen)>
  ("Belegabruf (Privatpersonen)"), fetched directly (HTTP 200, no access
  block on `elster.de` in this sandbox). Describes the vorausgefüllte
  Steuererklärung (VaSt) as a free tax-administration service pre-populating
  up to four years of electronically-reported data across nine categories
  (master data; employer wage-tax certificates; wage-replacement benefits;
  pension benefit notifications; health/long-term-care insurance
  contributions; Riester/Rürup pension contract data; health-insurance
  subsidies; asset-building savings scheme contributions; interest/capital
  income under an exemption order), gated behind ELSTER-account
  authentication and in-account consent, with an explicit statement that the
  taxpayer remains obligated to review and correct the data before
  submission.
- **Secondary source (field-by-field detail):** the official Hauptvordruck
  "ESt 1 A" (2025 edition; form codes `2025ESt1A011NET`/`012NET`, dated
  September 2025). The BMF's canonical distribution site,
  `formulare-bfinv.de`, is a client-rendered SPA ("Lucom Interaction
  Platform") that a plain `curl`/`WebFetch` GET cannot deep-link into (an
  empty HTML shell, or a `303`->`400` redirect chain on form IDs) — the PDF
  itself was instead retrieved from two independent static mirrors hosting
  the unmodified BMF-generated file:
  `finanzamt-rente-im-ausland.de` (a Finanzamt Neubrandenburg subdomain
  serving international/foreign-pension taxpayers) and `steuern.de` (a
  private tax portal whose PDF is byte-identical to the mirror above apart
  from one prepended advertising page for its own "smartsteuer" product).
  Authenticity corroborated via both PDFs' embedded XMP metadata
  (`dc:creator`: "BMF, Vordruckkommission ESt"; `xmp:CreatorTool`:
  "Formular-Management-System der Bundesfinanzverwaltung 3.6.3") and the
  in-text document codes `2025ESt1A011NET`/`012NET`.
- **Retrieved / reviewed:** 2026-07-02.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial authoring
  source review).

## PDF shape: static, print-only — a third non-fillable shape in this registry

Every copy of the Hauptvordruck examined carries an `/AcroForm` dictionary
scaffold, but with an **empty `Fields[]` array and zero `Widget` annotations**
(no `/XFA` either, and no `/Encrypt`) — `pdfjs-dist`'s `getFieldObjects()`
returns `null`. This is a **third distinct non-fillable PDF shape** recorded
in this registry's extraction notes
([[gov-form-pdf-extraction]], [[gov474-dmv-business-formation-vertical-and-xfa-extraction]]):
unlike NAT 2541/DL1 (no `/AcroForm` marker at all, requiring position-sorted
text extraction) or i-Kfz's dynamic XFA case, this PDF's `/AcroForm` shell is
leftover generator scaffolding with the interactive fields stripped out at
publication time. Fields were reconstructed from `pdfjs-dist`'s
`getTextContent()`, read page by page (German umlauts extracted intact), and
anchored to the Hauptvordruck's own printed line numbers rather than to
AcroForm field names or box positions.

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| elster.de: ELSTER-account/consent precondition, VaSt's nine pre-fill data categories, ongoing review-before-submission obligation | `hasElsterAccountWithVerifiedIdentity` field description; document `description` |
| Hauptvordruck line 4-7: Steuernummer, An das Finanzamt, former Finanzamt, daytime phone | `taxNumber` through `daytimePhoneNumber` |
| Hauptvordruck line 8-12: tax ID, DOB, date of death, name, title, religion, occupation | `taxIdNumber` through `occupation` |
| Hauptvordruck line 13-17: street, house number, postal code, city, foreign country | `street` through `countryIfForeignAddress` |
| Hauptvordruck line 18-19: marital status, assessment type | `maritalStatus` through `assessmentType` |
| Hauptvordruck lines 20-29: spouse/partner identity and (if different) address | `spouseTaxIdNumber` through `spouseCity` |
| Hauptvordruck lines 30-33: domestic/foreign IBAN, BIC, account holder | `refundAccountIsForeign` through `accountHolderName` |
| Hauptvordruck line 34: employee savings-bonus application | `appliesForEmployeeSavingsBonus` |
| Hauptvordruck lines 35-36: income-replacement benefits subject to the progression clause | `hasReceivedIncomeReplacementBenefits`, `totalIncomeReplacementBenefitsAmount` |
| Hauptvordruck line 37: supplementary-statements gate | `hasSupplementaryStatements` |
| Hauptvordruck lines 38-40: tax-advisor involvement, signature | `preparedWithTaxAdvisorOrAssociation`, `declarationSigned`, `declarationDate` |

## What is NOT independently confirmed (out of scope), and sourcing caveats

- **Every Anlage (schedule) the Hauptvordruck itself defers to** is entirely
  out of scope: Anlage N (employment income), Anlage Vorsorgeaufwand
  (pension/insurance contributions), Anlage Sonderausgaben (church tax paid,
  donations, vocational training costs, alimony), Anlage Kind (one per
  child, child benefit/childcare/disability items), and every other Anlage
  (capital income, rental income, self-employment, etc., not reviewed this
  cycle). This mirrors every prior tax-return schema in this registry's
  main-form/schedule split (`us/irs/individual-income-tax-return-1040`'s
  Schedule exclusions, `nz/ird/individual-tax-return-ir3`'s IR3G exclusion,
  `au/ato/individual-tax-return-mytax`'s supplementary-section exclusion).
  The Hauptvordruck itself contains no income, deduction, or dependent line
  items beyond the two gates modelled (`appliesForEmployeeSavingsBonus`,
  `hasReceivedIncomeReplacementBenefits`) — everything else genuinely lives
  on an Anlage, not omitted from a form section that has it.
- **Religion code vocabulary is not closed.** `religionKey` is modelled as a
  free 2-character string rather than a closed `enum`: the source explicitly
  names only three codes (EV, RK, VD), but additional Land-specific codes
  exist for other church-tax-levying religious communities (confirmed to
  exist by general knowledge of the German church-tax system, but not
  independently enumerated from an official source this cycle) — the same
  discipline as the ATO/IRAS free-text offset/benefit codes already in this
  registry, rather than guessing a complete enum.
- **Income-replacement benefits (lines 35-36) box-level layout not
  confirmed.** The source research identified the benefit types named on the
  form (Arbeitslosengeld, Elterngeld, Insolvenzgeld, Krankengeld,
  Mutterschaftsgeld, Verdienstausfallentschädigung) but not whether each has
  its own dollar box or whether they share one combined box — modelled
  conservatively as one gate boolean plus one total amount rather than
  guessing a per-benefit-type breakdown. A future revision that re-derives
  this from the primary PDF page directly (rather than a downstream research
  summary) should confirm or correct this.
- **Supplementary-statements gate (line 37) reason codes not modelled.** The
  2025 edition is stated to have introduced four reason codes for this
  section; this document models only the gate boolean
  (`hasSupplementaryStatements`), not the codes themselves — out of scope,
  same treatment as `au/ato/individual-tax-return-mytax`'s
  `requiresSupplementarySection`.
- **No attestation `documents[]` entry.** No exact German sign-off/attestation
  statement text was independently sourced for the Unterschrift
  (signature) block — same discipline as `gb/ukvi/standard-visitor-visa`'s
  and `de/bmi/passport-application`'s missing-attestation-text notes, rather
  than fabricating a plausible statement.
- **Widowhood-during-the-year edge case not modelled.** The spouse-details
  block (lines 20-29) is gated only on `maritalStatus` equalling
  `married_or_civil_partnership`; a taxpayer whose spouse died during the tax
  year may still be eligible for a joint assessment for that year under
  German tax law, a nuance this v1.0.0 does not attempt to model — flagged
  here rather than silently narrowed without a note.
- **`formulare-bfinv.de` is SPA-rendered, not blocked.** Distinct from the
  WAF-blocked-domain list (`canada.ca`, `nzta.govt.nz`, `ato.gov.au`) and the
  HTTP-410-retired-domain case (`i-kfz.de`): this domain returns HTTP 200 but
  its content is client-rendered JavaScript, so a scripted-browser session
  (not attempted this cycle) would be needed to resolve literal PDF URLs
  directly from the BMF's own site rather than via a third-party mirror.

## Why every field here is optional except the compulsory few

Like `au/ato/individual-tax-return-mytax` and
`sg/iras/individual-income-tax-return-formb1`, this document's defining shape
is **reviewing a pre-filled return**: ELSTER's VaSt service pre-populates
master data (name, address, bank details, religion), employer wage-tax
data, and seven other categories before the taxpayer ever opens the return.
Fields are optional here for the same two reasons recorded for those two
sibling documents: (a) genuine applicability (marital/spouse fields, foreign
address fields, etc. only apply to some filers), and (b) the pre-fill shape
itself (VaSt may populate a value the individual never manually types).
`required: true` is reserved for fields every filer supplies or confirms
regardless of pre-fill — ELSTER account access, tax ID, name, tax-office
routing, home address, the domestic/foreign refund-account routing gate, and
the declaration/signature — mirroring exactly which fields the sibling AU and
SG documents marked required.

## Time-versioning and the `edition` axis (flagged spec gap)

The Hauptvordruck is genuinely time-versioned — its own form codes
(`2025ESt1A011NET`/`012NET`) and printed edition date (September 2025) pin it
to tax year 2025, the same shape as every other tax-return schema in this
registry. Spec v0.3's `edition.scheme` enum remains **closed** to
`us-tax-year` / `gb-tax-year` / `award-year` (SPEC.md §5.7) — Germany's
calendar-year Einkommensteuererklärung fits neither the wrong-shape gap (NZ's
April-March year) nor is it the same jurisdiction any existing scheme names.
This is the **sixth** reference schema to hit this exact gap, after IE Form
11S, NZ IR3, CA T1, AU myTax, and SG Form B1 — published at the plain,
non-edition registry path
(`registry/de/finanzamt/income-tax-return-elster/1.0.0/schema.json`) as a
workaround, consistent with all five prior cases. See
`spec/proposals/0019-generalize-edition-scheme-calendar-tax-year.md`.

## Scope and jurisdiction notes

- Conditional requiredness/visibility is expressed with `requiredWhen`/
  `visibleWhen` (GSP-0013), targeting spec v0.3.
- The `hasElsterAccountWithVerifiedIdentity` gate uses a `to: null` /
  `exitReason: "no-elster-account"` transition (GSP-0013 §4), the same
  eligibility-gate pattern used by `au/ato/individual-tax-return-mytax`'s
  myGov-linkage gate and `ca/on/mto/drivers-licence-renewal`'s account
  precondition. A taxpayer without an ELSTER account still has a paper
  postal-filing path through the Finanzamt; that channel is a different
  process not modelled by this document (ELSTER-only), so the exit is
  presentational, not a claim that no other filing channel exists.
- `assessmentType`'s `community_of_property` option
  (Gütergemeinschaft) is a genuine but comparatively rare German matrimonial
  property regime; modelled as sourced without further narrowing.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies `manual-source-review-v1`
Procedure step 2 against the live, authenticated Mein ELSTER online screens,
confirms the income-replacement-benefits box-level layout and the religion
code vocabulary directly against a freshly-fetched primary PDF (not a
downstream research summary), and records the outcome here — shipping a new
schema version if discrepancies are found (VERSIONING.md §3, immutability).

## Re-verification

Per the practice's Cadence, `nextReviewBy` is set to **2027-01-01** (6
months), and in any case before the 2026 edition of the Hauptvordruck ESt 1 A
is published, since the source content itself changes annually.
