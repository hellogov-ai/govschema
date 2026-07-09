# Verification record — `ca/on/registration/general-limited-partnership-registration` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-09`

The document was derived directly from the Ontario Central Forms Repository's
official fillable Form 5298E (edition 2022/12). It remains `draft`, not
`verified`.

## Candidate screening this cycle

This closes the "partnership" half of CATALOG.md's own Known Gaps section
item 1 ("sub-national/state ... Business Formation" flagged open for
CA/NZ/IE/IN sole-trader/partnership/LLP formation). The "sole-trader" half of
this same gap, for Ontario, was already closed last cycle by
`ca/on/registration/sole-proprietorship-registration` (Form 5288E, GOV-1947),
whose own VERIFICATION.md explicitly flagged Form 5298E ("Register a Business
Name for a General Partnership or Limited Partnership") as a distinct entity
type confirmed present in the same Central Forms Repository dataset family
but not fetched or modelled that cycle. This cycle fetches and models it.

## Sources examined

- **Document `(id, version)`:** `ca/on/registration/general-limited-partnership-registration` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Ontario Business Registry (Ministry of Public and Business
  Service Delivery, "OBR").
- **Primary source:** Form 5298E (2022/12), "Register a Business Name for a
  General Partnership or a Limited Partnership — Business Names Act" —
  <https://forms.mgcs.gov.on.ca/dataset/be869348-ee8f-4e08-970d-d645aa37be04/resource/0a56b997-ef53-4877-bce0-2e6ffaa07874/download/5298e.pdf>
  — retrieved directly (HTTP 200, no login/CAPTCHA/WAF gate).
- **Secondary source:** the form's own instruction document, 5298E_Instruction
  (2022/12) —
  <https://forms.mgcs.gov.on.ca/dataset/be869348-ee8f-4e08-970d-d645aa37be04/resource/5e882497-65af-4dbe-afd9-ad85f76d428c/download/5298e_instruction.pdf>
  — used to corroborate section scope, the "Information You Need" checklist,
  the partnership/company-key eligibility narrative, and the
  confirmation/submission workflow.
- **Dataset page** (edition/date metadata, confirms both `5298e.pdf` and
  `5298e_instruction.pdf` as the current English resources of the same
  dataset): <https://forms.mgcs.gov.on.ca/en/dataset/5298>.
- **Field extraction method:** this is a **dynamic Adobe LiveCycle Designer
  (XFA) form**, encrypted identically to the sibling Form 5288E (the PDF's
  own `/Encrypt` dictionary specifies `V4`/`R4`, `CFM/AESV2`, 128-bit,
  `EncryptMetadata false`, empty user password, object numbers **not**
  assumed identical to 5288E's — re-derived from this PDF's own `/Encrypt`,
  `/ID`, and `/XFA` array). `pdfjs-dist`'s ordinary
  `getDocument().getFieldObjects()` returns `null` (pure XFA, no AcroForm
  fields). The file encryption key was derived in Node via the PDF standard
  security handler's Algorithm 2 (`crypto.createHash('md5')` over the padded
  empty password, the `/O` value, `/P`, the first `/ID` element, and — since
  `R>=4` and `EncryptMetadata` is `false` — four `0xFF` bytes, then 50
  additional MD5 rounds per Algorithm 2 step 8 for `R>=3`); each object's key
  was derived per Algorithm 1 (file key + 3-byte object number + 2-byte
  generation number + the `"sAlT"` constant for `AESV2`, MD5-hashed and
  truncated); each stream was decrypted with
  `crypto.createDecipheriv('aes-128-cbc', …)` (IV = the stream's own first 16
  bytes), using the object's own declared `/Length` (not an `endstream`
  keyword search, which is off by the EOL preceding it) to bound the
  ciphertext, before `zlib.inflateSync`. This PDF's AcroForm dictionary
  (object 67) and two supporting Names objects were themselves compressed
  inside a cross-reference-stream-era object stream (`/Type/ObjStm`, object
  1 of 45 compressed objects), which was decrypted/inflated the same way and
  then parsed via its `/N`/`/First` header to recover object 67's dictionary,
  which named the `/XFA` array's `template` (object 4) and `datasets`
  (object 6) packets; those were decrypted/inflated directly, yielding the
  form's real, human-readable XML — every field's internal name, its
  `caption`'s `exData` HTML text (the on-screen label, including the
  red-asterisk mandatory marker), its `assist.toolTip` (accessible-technology
  text that independently restates the full section path and "This field is
  mandatory" status for nearly every field), its `value/text/@maxChars`
  constraint, and the `datasets` packet's default-bound data tree (used to
  confirm `businessAddressProvince`'s and the address country fields' locked
  default values, and that no partner-index data node existed by default).
  This decryption approach was cross-checked against `pdfjs-dist`'s own,
  independent, unrelated decryption of the instruction PDF (which pdfjs-dist
  decrypts and renders as plain text natively, without any special
  configuration) — both text streams were internally consistent (e.g. both
  independently name Section 6's "Partner Authorizing the Registration" and
  "Person Acting Under Power of Attorney" paths and their
  individual/corporation/other sub-types).
- **Retrieved / reviewed:** 2026-07-09.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial authoring
  source review).

## An important structural finding: this form has no "Partners" roster

The task brief for this cycle expected a Section 5 "Partners" list analogous
to Form 5288E's Section 5 "Sole Proprietor." **The decrypted XFA does not
have one.** Form 5298E's actual section structure is:

1. **Firm Name Information** — the *already-existing* partnership's own firm
   name, Business Identification Number (BIN), company key, and official
   email address (all four required).
2. Contact Information
3. Business Name (the *new* business/operating name being registered)
4. General Details (NAICS primary activity code)
5. Address (of the principal place of business)
6. Authorization
7. Confirmation

The instruction document confirms why: Form 5298E is filed by a partnership
that **already exists** (formed/registered earlier under the Business Names
Act or the Limited Partnerships Act, and already holding a BIN and a
ministry-issued company key) and now wants to register an *additional*
business/operating name distinct from its own firm name. The form is
therefore not the partnership's formation instrument and does not collect a
roster of the partnership's individual partners (their names, addresses,
capital contributions, etc.) at all — that information, if any, would live
on the partnership's own original formation filing (out of scope for this
form and this cycle), not here. This is a materially different shape from
what a "partnership registration" form might be assumed to look like, and is
reported here rather than modelled around.

The only place the word "partner" appears as data on this form is in
**Section 6, Authorization**, where the person authorizing the registration
is either (a) a partner of the partnership, or (b) a person acting under
power of attorney — mirroring 5288E's own "sole proprietor authorizes
directly" vs. "Person Acting Under Power of Attorney" branch, except that here
the "authorizes directly" option is phrased as "a partner" rather than "the
sole proprietor" (naturally, since a partnership itself cannot sign).

## The authorizing-partner repeating structure (out of scope)

Within Section 6's "Partner Authorizing the Registration" branch, the form
offers a `Type` choice of **Individual**, **Corporation or Registered
Entity**, or **Other**, each with its own sub-block (individual: full name;
corporation/other: entity name + OCN-or-BIN + a signing representative's full
name and position). All three of these per-type sub-blocks carry
`<occur max="-1"/>` in the decrypted XFA `template` — an **unbounded
repeating group** (a JavaScript `indexChange` event on each, with a commented
out `"Partner " + (this.index + 1)` caption script, confirms the live form
supports an "add another authorizing partner" interaction). The identical
`Type`/individual/corporation/other shape and its own `<occur max="-1"/>`
also appears under the "Person Acting Under Power of Attorney" branch.

GovSchema v0.3 has **no `array` field type** — confirmed by grepping the
entire `registry/` tree for `"type": "array"` (zero matches) and by
`spec/proposals/0009-composite-repeating-values.md`, which proposes exactly
this construct and is still `Status: Proposed`, not yet accepted into any
released spec version. Per this cycle's brief, absent an array/repeating
construct and given the live form's own "Type" selector visually treats each
type as a single-instance choice with an *additional* "add another" action
layered on top (not a form that requires more than one authorizing partner
to be filled in), this document models the **single most common path**: one
authorizing partner, of type Individual, authorizing directly — the same
narrowing convention `ca/on/registration/sole-proprietorship-registration`
already used for its own POA sub-path. Out of scope:

- The Corporation/Registered-Entity and Other authorizing-partner types.
- The ability to add more than one authorizing partner of any type.
- The entire "Person Acting Under Power of Attorney" pathway (individual,
  corporation/registered entity, or "other" entity representative, each with
  its own address for service and, for the latter two, a signing
  individual's full name and position) — identical in shape and scope
  disposition to 5288E's own POA exclusion.

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| Section 1, Firm Name Information | `partnershipFirmName`, `partnershipBIN`, `companyKey`, `partnershipOfficialEmail` |
| Section 2, Contact Information | `contactFirstName` through `contactEmail` |
| Section 3, Business Name | `proposedBusinessName` |
| Section 4, General Details | `primaryActivityCode` |
| Section 5, Address — "Yes" (Ontario), Standard Address | `businessAddressStreetNumber` through `businessAddressPostalCode` |
| Section 6, Authorization — Partner Authorizing the Registration, Individual | `authorizingPersonType`, `authorizingPartnerType`, `authorizingFirstName` through `authorizingLastName` |
| Section 7, Confirmation | `confirmationConfirmed`, `documents[].confirmationAttestation` (statement text taken verbatim from a `draw` element immediately following the confirmation checkbox: "confirm the accuracy of the information submitted.", combined with the checkbox's own caption fragment "I," and the auto-calculated contact-name field between them — the identical pattern already confirmed for Form 5288E) |

`maxChars` constraints on every `string` field were taken directly from the
XFA field's own `maxChars` attribute, not estimated (`companyKey`'s
`maxChars="9"` combined with its own `exit`-event validation script's
`^([a-zA-Z0-9]){9}$` regex, used verbatim as this document's `pattern`). The
Section 6 authorizing-partner name fields (`firstName`/`middleName`/
`lastName` under `authorization.partner.individual`) were independently
checked for `access="readOnly"` and a `<calculate>` script (the pattern that
required a scope change to 5288E's `authorizingFullName` during review-gate
GOV-1949) — **neither is present here**; these are ordinary directly-typed
inputs, confirmed by the raw decrypted XFA field block itself.

## What is NOT independently confirmed / out of scope

- **A "Partners" roster of the partnership's individual partners.** As
  described above, this form has none; see "An important structural
  finding" above.
- **A principal place of business outside Ontario.** Section 5's "Does the
  partnership have a place of business in Ontario where it will use this
  business name?" gate offers a "No" branch with its own Canada/U.S.A./
  international address sub-forms. Out of scope; only the "Yes" (in
  Ontario), Standard Address path is modelled.
- **Lot/Concession (rural) addressing**, offered as an alternative to the
  Standard Address at every address point on the form (principal place of
  business, and every address inside the out-of-scope Power of Attorney and
  Corporation/Other authorizing-partner sub-paths). Out of scope throughout.
- **The Corporation/Registered-Entity and Other authorizing-partner types**,
  and **the ability to add more than one authorizing partner of any type**
  (an unbounded `<occur max="-1"/>` repeating group in the source XFA with
  no counterpart construct in GovSchema v0.3 — see "The authorizing-partner
  repeating structure" above).
- **The entire "Person Acting Under Power of Attorney" authorization
  pathway** (Section 6's alternative to a partner authorizing directly): an
  individual representative with their own full name and address for
  service; a corporation or other registered entity with its own name,
  Ontario Corporation Number (OCN) or Business Identification Number (BIN),
  address for service, and a signing individual's full name and position; or
  an "other" entity with its own name, address for service, and signing
  individual — plus this pathway's own unbounded repeating structure. All
  out of scope — only the direct partner-authorizes, Individual-type path is
  modelled (`authorizingPersonType`'s enum is deliberately locked to
  `["partner"]` and `authorizingPartnerType`'s enum to `["individual"]`, the
  same single-value-lock convention already used for
  `ca/on/registration/sole-proprietorship-registration`'s
  `authorizingPersonType` and `ca/on/registration/business-incorporation`'s
  `registeredOfficeProvince`).
- **NAICS code enumeration.** `primaryActivityCode` is modelled as a bounded
  free-text string (matching the source's own `maxChars="6"` constraint),
  not a closed `enum`; the live form links out to an external NAICS lookup
  tool rather than embedding the code list, the same treatment already used
  for the sibling sole-proprietorship and business-incorporation schemas.
- **Changing the partnership's own official email address**, which the
  instructions state must instead be filed via Form 5293 ("Amend a Firm Name
  for a General Partnership") for a general partnership or a "Declaration of
  Change" (Form 5307) for a limited partnership — distinct forms, out of
  scope for this cycle.
- **Fees.** Not modelled as authoritative data, consistent with every other
  schema in this registry.
- **The Firm Name Information section's own eligibility precondition** (that
  the partnership must already exist, with its own BIN and company key) is
  documented above as a structural fact, not independently re-verified
  against a live filing.

## Scope and jurisdiction notes

- Conditional requiredness is not needed by this document's modelled path:
  every fixed value (`businessAddressProvince`, `authorizingPersonType`,
  `authorizingPartnerType`) is a locked single-value `enum` rather than a
  `requiredWhen`-gated branch, since the alternative branches are entirely
  out of scope rather than merely conditionally required.
- The "Does the partnership have a place of business in Ontario" gate
  (`yes`/`no` checkboxes both bound to the single data node
  `address.placeOntario`) is, like 5288E, **not** an XFA `exclGroup`
  construct — this form family uses independently-scripted checkbox pairs
  throughout rather than `exclGroup` elements (zero found in the parsed
  template). Since only the "Yes" branch is modelled, this gate question
  itself is not carried into the schema as a field (there is no meaningful
  eligibility question left to ask once the "No" branch is entirely out of
  scope) — the same disposition already used for `businessAddressProvince`
  being a locked enum rather than a boolean gate plus two address blocks.
- This is the **third** Ontario schema (after `business-incorporation` and
  `sole-proprietorship-registration`) and the **second** to address
  CATALOG.md's Known Gaps item 1 ("sub-national/state ... Business
  Formation," sole-trader/partnership/LLP formation for CA/NZ/IE/IN) — with
  this document, Ontario's own half of that gap (both the sole-trader and
  the general/limited-partnership registration paths) is now closed.

## Worked example

A fully valid, plausible mock filing (a two-partner Ontario general
partnership, "Maple & Bell General Partnership," already holding a BIN and
company key, registering the operating name "Maple & Bell Consulting," with
partner Priya Maple authorizing the registration directly) was constructed
as a JSON data instance covering all 25 modelled fields. This document's own
`fields[]` array was mechanically translated into an ordinary JSON Schema
(draft 2020-12) — `type`/`validation` per field become
`properties.<name>.type`/sibling keywords, `required: true` fields become
top-level `required` — and the mock instance was validated against that
derived schema with `ajv` (the same `ajv`/`ajv-formats` versions
`tools/validate-ajv.mjs` and `tools/govschema-client` already depend on).
Result: 25 properties, 20 required, **valid** (this cycle's PR description
carries the exact script and output). This document itself was also
separately re-validated against the GovSchema v0.3 meta-schema with both
`tools/validate-ajv.mjs` and `tools/validate.mjs` (see "Path to a `verified`
claim" below for what remains to reach `status: verified`). The mock instance
is not committed to the registry, consistent with
`ca/on/registration/sole-proprietorship-registration`'s own precedent of not
persisting worked examples as registry fixtures.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer drives the live Ontario Business
Registry online filing flow (or the JavaScript-enabled PDF in Adobe Reader)
with a mock filing and records the outcome here — shipping a new schema
version if discrepancies are found (VERSIONING.md §3, immutability).

## Re-verification

Per the practice's Cadence, `nextReviewBy` is set to **2027-01-01** (6
months).
