# Verification record — `ca/on/registration/business-incorporation` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-02`

The document was derived directly from the Ontario Central Forms Repository's
official fillable Form 5351E (edition 2025/01). It remains `draft`, not
`verified`.

## Sources examined

- **Document `(id, version)`:** `ca/on/registration/business-incorporation` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Ontario Business Registry (Ministry of Public and Business
  Service Delivery and Procurement, "OBR").
- **Primary source:** Form 5351E (2025/01), "Articles of Incorporation —
  Business Corporations Act" —
  <https://forms.mgcs.gov.on.ca/dataset/654ab672-9802-4978-8c48-4164cfdb3742/resource/8e2b1618-2359-4df3-ad6a-9a5a13083b97/download/5351e.pdf>
  — retrieved directly (HTTP 200, no access block encountered; this
  `forms.mgcs.gov.on.ca` / `ontario.ca`-family domain is unaffected by the
  `canada.ca` block recorded for `ca/cra/individual-income-tax-and-benefit-return-t1`).
- **Field extraction method:** this is a **dynamic Adobe LiveCycle Designer
  (XFA) form**, not a flat AcroForm — `pdfjs-dist`'s ordinary
  `getDocument().getFieldObjects()` returns `null` for it, and rendering the
  document without XFA support produces only a static placeholder page
  reading "The document you are trying to load requires Adobe Reader 8 or
  higher." Fields were instead extracted by opening the document with
  `enableXfa: true` and reading `PDFDocumentProxy.allXfaHtml` — pdfjs's own
  flattened HTML-equivalent tree of the XFA template — which exposes every
  `input`/`select` element's `dataId` (the XFA field's internal name),
  `aria-label` (the field's full section/question text as read by assistive
  technology), and constraints such as `maxLength`. This is a different
  extraction technique from the AcroForm `getFieldObjects()`/annotation
  approach used for `us/irs/employer-identification-number-ss4` and
  `ca/cra/individual-income-tax-and-benefit-return-t1`, and is recorded here
  as the reference method for any future GovSchema XFA-form authoring.
- **Retrieved / reviewed:** 2026-07-02.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial authoring
  source review).

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| Section 1, Contact Information | `contactFirstName` through `contactEmail` |
| Section 2, Corporation Name (number name / English proposed name / NUANS report) | `corporationNameType`, `numberNameLegalElement`, `proposedCorporationName`, `nuansReportReferenceNumber`, `nuansReportDate` |
| Section 3, General Details | `requestedIncorporationDate`, `primaryActivityCode`, `officialEmailAddress` |
| Section 4, Address (Standard Address only) | `registeredOfficeStreetNumber` through `registeredOfficePostalCode` |
| Section 5, First Director(s) | `directorCountType` through `directorIsAlsoIncorporator` |
| Section 6, Shares and Provisions | `sharesProvisionsTextType` through `otherProvisions` (including the form's own stated 900,000-character-per-text-box maximum) |
| Section 7, Incorporator(s) — Individual | `incorporatorFirstName` through `incorporatorLastName` |
| Section 8, Authorization / Required Signature | `authorizationConfirmed`, `signatureFullName`, `documents[].authorizationAttestation` (statement quoted verbatim) |

`maxLength` constraints on every `string` field were taken directly from the
XFA field's own `maxLength` attribute, not estimated.

## What is NOT independently confirmed / out of scope

- **French and bilingual corporation names.** Section 2 also offers a French
  name, a combined English-and-French name, and an equivalent-but-separate
  English/French name pathway (each with its own NUANS Report sub-fields,
  e.g. `corpNameF`/`refnoF`/`dateF` in the source's internal field names).
  Only the English-name pathway is modelled, consistent with the
  English-only scoping already used across this registry (e.g.
  `gb/companies-house/company-incorporation-in01`,
  `ie/cro/company-incorporation`).
- **The legal-opinion-for-identical-name pathway** (Section 2's "Select this
  if you have a Legal Opinion for an identical name" checkbox and its
  four-part lawyer-opinion declaration, lawyer name/firm/phone/email, and
  address). A rare pathway (used only when incorporating under a name
  identical to an affiliated, successor, or dissolved corporation's name),
  out of scope.
- **Lot/Concession (rural) registered office addressing** (Section 4's
  alternative to the Standard Address). Out of scope; only the Standard
  Address sub-fields are modelled.
- **Multiple directors.** Form 5351E supports adding any number of directors
  via a repeatable "Add Director (+)" control; this document scopes to a
  single first director, the same single-entity scoping convention used for
  `ie/cro/company-incorporation`'s single director/secretary/subscriber.
  GovSchema v0.3's field model is flat with no array/repeated-group
  construct (SPEC.md §6.1), so a genuinely multi-director schema would need
  either a future array-capable spec version or a fixed set of numbered
  `director2FirstName`-style fields, neither of which this cycle introduces.
- **Corporate incorporators** ("Corporation registered in Ontario" and
  "Corporation not registered in Ontario," each with their own
  `corporationName`/OCN-or-address/signing-representative field set). Out of
  scope; only the single individual incorporator pathway is modelled.
- **The exact sub-field breakdown of `directorAddressForService` and
  `incorporatorAddress`.** The live form's own developer notes, printed
  directly on page 1 of the PDF, state: *"Section 5: Is this director also an
  Incorporator? For 'No' option subform is manually hidden not in the
  code[.] Section 2, 5, Section 7: Address for Service: Canada, USA,
  International subforms are manually hidden not in the code."* Consistent
  with that note, the static `allXfaHtml` extraction surfaces the
  Canada/U.S.A./International country-choice checkboxes for the director's
  address-for-service (Section 5) and the incorporator's registered/head
  office address (Section 7), but **no** corresponding address-line/city/
  province/postal-code input elements anywhere beneath them — unlike the
  registered office address (Section 4), whose Standard Address sub-fields
  *are* fully present in the static extraction. This is a genuine tool/source
  limitation, not a search miss: the same pattern was independently checked
  and confirmed absent for all three "Address for Service"/country-choice
  instances in the document (Section 2's now-out-of-scope lawyer address,
  Section 5, and Section 7). Rather than fabricate a plausible-looking
  address field set unconfirmed against the live form, `directorAddressForService`
  and `incorporatorAddress` are modelled as opaque `type: object` fields
  (SPEC.md §6.2, "a composite value carried opaquely") with a description
  noting the expected shape. **Open item for a future revision:** a reviewer
  who can drive the live, JavaScript-enabled form (e.g. in Adobe Reader, or
  the Ontario Business Registry's own online filing interface) should
  confirm the exact address sub-fields and, if GovSchema still lacks a
  nested-object field model at that time, either flatten them here (MINOR
  version bump, additive) or record the gap against the flat-fields
  limitation already noted in SPEC.md §16.
- **The exact permitted values for `numberNameLegalElement`.** Form 5351E's
  "Legal Element for the Number Name" field carries no visible enumerated
  option list in the static extraction (only an info-icon tooltip, not
  rendered as text). Commonly known OBCA legal elements are "Incorporated" /
  "Inc.", "Limited" / "Ltd.", and "Corporation" / "Corp.", but this was not
  independently confirmed against the live form's own picklist (if any), so
  the field is modelled as free text rather than a closed `enum` — avoiding
  asserting exact values not confirmed from source.
- **Fees.** Not modelled as authoritative data, consistent with every other
  schema in this registry.

## Scope and jurisdiction notes

- Conditional requiredness is expressed with `requiredWhen` (GSP-0013),
  targeting spec v0.3, following the `nz/ird/individual-tax-return-ir3` and
  `ca/cra/individual-income-tax-and-benefit-return-t1` precedent.
- `directorIsResidentCanadian` and `directorIsAlsoIncorporator` are marked
  `fieldRole: eligibility`: both are binary gate questions on the source form.
  `directorIsResidentCanadian` is retained because the live form still asks
  it, but is documented as informational-only since the OBCA's resident-
  Canadian-director requirement was repealed effective **2021-07-05** by the
  *Better for People, Smarter for Business Act, 2020* (confirmed via
  independent secondary coverage — Stikeman Elliott, Fasken, DLA Piper,
  Bennett Jones, and Dentons client alerts, all dated April-July 2021,
  corroborating the same repeal date and mechanism). `directorIsAlsoIncorporator`
  genuinely gates `directorAddressForService`'s requiredness, per the form's
  own developer note quoted above.
- `crossFieldValidation`'s `maximumDirectorCountNotLessThanMinimum` rule
  applies the `compare` shape (SPEC.md §8.3) to `maximumDirectorCount`/
  `minimumDirectorCount`, both of which are only populated when
  `directorCountType` is `minimum_and_maximum`; a consumer evaluating this
  rule against a `fixed_number` submission (where neither field is present)
  has nothing to compare and should treat the rule as vacuously satisfied,
  the same way `requiredWhen`/`visibleWhen` treat an absent/hidden field's
  requiredness as `false` (§6.7) — no registry schema has yet exercised a
  `compare` rule against optionally-absent fields, so this interpretation is
  flagged here for reviewer attention rather than assumed silently.
- This is the **fourth** company-formation jurisdiction in the registry,
  after `gb/companies-house/company-incorporation-in01`,
  `us/ca/sos/business-entity-llc-formation`, and `ie/cro/company-incorporation`
  — closing the catalog candidate note's "fourth company-formation
  jurisdiction" gap.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer drives the live Ontario Business
Registry online filing flow (or the JavaScript-enabled PDF in Adobe Reader)
with a mock filing, confirms the `directorAddressForService`/
`incorporatorAddress` sub-field breakdown and the `numberNameLegalElement`
picklist noted above, and records the outcome here — shipping a new schema
version if discrepancies are found (VERSIONING.md §3, immutability).

## Re-verification

Per the practice's Cadence, `nextReviewBy` is set to **2027-01-01** (6
months).
