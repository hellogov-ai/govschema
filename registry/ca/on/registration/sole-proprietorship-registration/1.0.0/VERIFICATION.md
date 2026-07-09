# Verification record — `ca/on/registration/sole-proprietorship-registration` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-09`

The document was derived directly from the Ontario Central Forms Repository's
official fillable Form 5288E (edition 2024/02). It remains `draft`, not
`verified`.

## Candidate screening this cycle

Ireland's CRO was screened first for the same "sole-trader/partnership/LLP
formation" gap this catalog's own Known Gaps section flags for CA/NZ/IE/IN
(item 1). Form RBN1 ("registration of a business name by an individual") is a
genuine, current (v2, 2024), directly-linked fillable PDF at
`cro.ie/wp-content/uploads/2024/04/RBN1-v2-fillable.pdf`, but the entire
`cro.ie` domain (and its `localenterprise.ie` mirrors) sits behind a
Cloudflare JavaScript challenge that returns HTML ("Just a moment...") to
every direct HTTP fetch and to a real headless-Chromium `networkidle` wait
(45s timeout, no challenge resolution observed) — a genuine bot-mitigation
gate, not a missing/renamed source. This cycle pivoted to Ontario instead,
whose Central Forms Repository (`forms.mgcs.gov.on.ca`) has no such gate and
is the same source family already used successfully for
`ca/on/registration/business-incorporation` (Form 5351E).

## Sources examined

- **Document `(id, version)`:** `ca/on/registration/sole-proprietorship-registration` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Ontario Business Registry (Ministry of Public and Business
  Service Delivery, "OBR").
- **Primary source:** Form 5288E (2024/02), "Register a Business Name for a
  Sole Proprietorship — Business Names Act" —
  <https://forms.mgcs.gov.on.ca/dataset/d329ad90-4ac4-41ce-b8d7-2dbd5a031a81/resource/e9694c5d-3842-468a-bd3f-592901ae7d71/download/5288e.pdf>
  — retrieved directly (HTTP 200, no login/CAPTCHA/WAF gate).
- **Secondary source:** the form's own instruction document, 5288E_Instruction
  (2024/02) —
  <https://forms.mgcs.gov.on.ca/dataset/d329ad90-4ac4-41ce-b8d7-2dbd5a031a81/resource/411bb291-f94e-46a1-bb7a-af4a5865516b/download/5288e_instruction.pdf>
  — used to corroborate section scope, the "Information You Need" checklist,
  and the confirmation/signature/submission workflow narrative.
- **Sibling forms confirmed out of scope:** Form 5289E ("Amend a Sole
  Proprietorship") is a later change-of-particulars transaction against an
  already-registered business, the same pattern already used to scope out
  Malaysia's Form A1/B (GOV-1938) and Poland's/Portugal's amendment forms.
  Form 5298E ("Register a Business Name for a General Partnership or Limited
  Partnership") is a distinct entity type with its own dataset (`5298`),
  confirmed present in the same Central Forms Repository but not fetched or
  modelled this cycle — a candidate for a future GovSchema cycle to close the
  "partnership" half of the same catalog gap.
- **Field extraction method:** this is a **dynamic Adobe LiveCycle Designer
  (XFA) form**, like Form 5351E, but additionally **encrypted** (the PDF's
  own `/Encrypt` dictionary specifies `V4`/`R4`, `CFM/AESV2`, 128-bit,
  `EncryptMetadata false`, empty user password). `pdfjs-dist`'s ordinary
  `getDocument().getFieldObjects()` returns `null` (pure XFA, no AcroForm
  fields), and the non-XFA page render is only the standard "This document
  requires Adobe Reader 8 or higher" placeholder. Rather than rely solely on
  `pdfjs-dist`'s `enableXfa`/`allXfaHtml` tree (the method recorded for Form
  5351E), this cycle additionally decrypted the file directly: the file
  encryption key was derived in Node via the PDF standard security handler's
  Algorithm 2 (`crypto.createHash('md5')` over the padded empty password, the
  `/O` value, `/P`, the first `/ID` element, and — since `R>=4` and
  `EncryptMetadata` is `false` — four `0xFF` bytes, then 50 additional MD5
  rounds per Algorithm 2 step 8 for `R>=3`), each object's key was derived per
  Algorithm 1 (file key + 3-byte object number + 2-byte generation number +
  the `"sAlT"` constant for `AESV2`, MD5-hashed and truncated), and each
  object stream was decrypted with `crypto.createDecipheriv('aes-128-cbc', …)`
  (IV = the stream's own first 16 bytes) before `zlib.inflateSync`. The
  `/XFA` array's `template` (the field definitions) and `datasets` (the
  default/bound data tree) packets were located by their object numbers and
  decrypted/inflated the same way, yielding the form's real, human-readable
  XML: every field's internal name, its `caption`'s `exData` HTML text
  (the on-screen label, including the red-asterisk mandatory marker), its
  `assist.toolTip` (accessible-technology text that independently restates
  the full section path and "This field is mandatory" status for nearly
  every field), its `value/text/@maxChars` constraint, and — for
  `ui/choiceList` fields — the complete `items` option list (used verbatim
  for `businessAddressProvince`'s locked `["Ontario"]` enum and
  `serviceAddressProvince`'s full 13-item Canadian province/territory list).
  This decryption approach was cross-checked against `pdfjs-dist`'s own,
  independent, unrelated decryption of the instruction PDF (which pdfjs-dist
  decrypts and renders as plain text natively, without any special
  configuration) — both text streams were internally consistent (e.g. both
  independently name Section 6's "Person Acting Under Power of Attorney"
  path and its individual/corporation/other sub-types).
- **Retrieved / reviewed:** 2026-07-09.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial authoring
  source review).

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| Section 1, Contact Information | `contactFirstName` through `contactEmail` |
| Section 2, Business Name | `proposedBusinessName` |
| Section 3, General Details | `primaryActivityCode`, `officialEmailAddress` |
| Section 4, Address of the Principal Place of Business — "Yes" (Ontario), Standard Address | `businessAddressStreetNumber` through `businessAddressPostalCode` |
| Section 5, Sole Proprietor | `soleProprietorFirstName` through `soleProprietorLastName`, `serviceAddressSameAsBusinessAddress` through `serviceAddressPostalCode` |
| Section 6, Authorization — Sole Proprietor path | `authorizingPersonType`, `authorizingFullName` |
| Section 7, Confirmation | `confirmationConfirmed`, `documents[].confirmationAttestation` (statement text taken verbatim from a `draw` element immediately following the confirmation checkbox: "confirm the accuracy of the information submitted.", combined with the checkbox's own caption fragment "I," and the auto-calculated contact-name field between them) |

`maxChars` constraints on every `string` field were taken directly from the
XFA field's own `maxChars` attribute, not estimated. The bookmark/outline
tree (`1. Contact Information` through `7. Confirmation`) independently
corroborates the section numbering used throughout `sourceRef`.

## What is NOT independently confirmed / out of scope

- **A principal place of business outside Ontario.** Section 4's "Do you
  have a place of business in Ontario?" gate offers a "No" branch with its
  own Canada/U.S.A./international address sub-forms (mirroring the
  Sole-Proprietor Address-for-Service country choice). Out of scope; only
  the "Yes" (in Ontario), Standard Address path is modelled.
- **Lot/Concession (rural) addressing**, offered as an alternative to the
  Standard Address at every address point on the form (principal place of
  business, sole proprietor's address for service, and every address inside
  the out-of-scope Power of Attorney path). Out of scope throughout.
- **A sole proprietor's address for service outside Canada** (the form's own
  U.S./international sub-forms for this address point). Out of scope; only
  the Canadian Standard Address path is modelled for `serviceAddress*`.
- **The entire "Person Acting Under Power of Attorney" authorization
  pathway** (Section 6's alternative to a sole proprietor authorizing
  directly): an individual representative with their own full name and
  address for service; a corporation or other registered entity with its
  own name, Ontario Corporation Number (OCN) or Business Identification
  Number (BIN), address for service, and a signing individual's full name
  and position; or an "other" entity with its own name, address for service,
  and signing individual. All out of scope — only the direct
  sole-proprietor-authorizes path is modelled (`authorizingPersonType`'s
  enum is deliberately locked to `["sole_proprietor"]`, the same
  single-value-lock convention already used for
  `ca/on/registration/business-incorporation`'s `registeredOfficeProvince`).
- **`authorizingFullName`'s mandatory status.** Unlike almost every other
  field on this form, the `fullName` field under the Sole Proprietor
  authorization branch carries no red-asterisk caption and no "mandatory"
  wording in its `assist.toolTip` (`"Section 6. Person authorizing
  registration. Sole Proprietor. Full Name."`, no trailing "This field is
  mandatory."). The form's own bound-data tree
  (`authorization.optA.fullName`) sits directly alongside the independently-
  observed pattern of other floating "full name" fields elsewhere in the
  document being populated by a `calculate` script that concatenates
  first/middle/last name from an earlier section (confirmed directly for
  the Section 7 confirmation `TextField`, whose own `calculate` script
  concatenates `contactInfo.firstName`/`middleName`/`lastName`) — strongly
  suggesting `authorizingFullName` is likewise auto-derived from
  `soleProprietorFirstName`/`MiddleName`/`LastName` on the live form rather
  than typed independently, which would explain the absent asterisk. This
  document nonetheless models `authorizingFullName` as a direct, `required:
  true` input rather than inventing a derivation/`calculate` construct
  GovSchema v0.3 has no field for — disclosed here rather than silently
  assumed.
- **NAICS code enumeration.** `primaryActivityCode` is modelled as a bounded
  free-text string (matching the source's own `maxChars="6"` constraint),
  not a closed `enum`; the live form links out to an external NAICS lookup
  tool rather than embedding the code list, the same treatment already used
  for `ca/on/registration/business-incorporation`'s `primaryActivityCode`.
- **Fees.** Not modelled as authoritative data, consistent with every other
  schema in this registry.
- **Form 5298E (partnership registration)** and **Form 5289E (amendment)**,
  both confirmed to exist in the same Central Forms Repository dataset
  family but not fetched or modelled this cycle — see "Candidate screening"
  above.

## Scope and jurisdiction notes

- Conditional requiredness is expressed with `requiredWhen` (GSP-0013),
  following the `ca/on/registration/business-incorporation` precedent in the
  same jurisdiction.
- `serviceAddressSameAsBusinessAddress` is marked `fieldRole: eligibility`: a
  binary gate question on the source form (rendered as two mutually
  exclusive checkboxes, `same`/`otherAddress`, not an XFA `exclGroup`
  construct — this form uses independently-scripted checkbox pairs
  throughout rather than `exclGroup` elements, of which the parsed template
  contains zero).
- This is the **second** Ontario schema and the **first** to close the
  "sole-trader/partnership/LLP formation" sub-process gap CATALOG.md's Known
  Gaps section (item 1) has flagged as open for CA/NZ/IE/IN since early
  registry cycles; Form 5298E (general/limited partnership) remains open for
  a future cycle to close the "partnership" half of the same gap for Canada.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer drives the live Ontario Business
Registry online filing flow (or the JavaScript-enabled PDF in Adobe Reader)
with a mock filing, confirms `authorizingFullName`'s true mandatory status
and derivation behaviour noted above, and records the outcome here —
shipping a new schema version if discrepancies are found (VERSIONING.md §3,
immutability).

## Re-verification

Per the practice's Cadence, `nextReviewBy` is set to **2027-01-01** (6
months).
