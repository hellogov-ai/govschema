# Verification record — `se/bolagsverket/aktiebolag-formation` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-10`

## Research trail (GOV-2056, "GovSchema Standard Research")

This cycle's task brief asks (phase 1) to catalog what the registry already
covers and (phase 2) to research online for missing government portals/forms.
Phase 1 found the registry at 28 jurisdictions, 318 published schemas. A fresh
read of `CATALOG.md`'s Executive Summary jurisdiction table and Known Gaps
section found every remaining whole-jurisdiction-vertical `✗` cell already
screened in a prior cycle and confirmed either a **dead end** (JP Passport —
`mofa.go.jp` domain-blocked; JP DMV — no jurisdiction publishes a
home-fillable driver's-licence form, in-person only; CZ/ID/MX National ID —
in-person/biometric-only; NL/ZA/PL/PT Visa — confirmed duplicates of
`de/auswaertiges-amt/national-visa-application`'s EU-harmonized template) or a
**weak backlog candidate already flagged and deferred** (CH/PT Business
Formation — authenticated SPA with no PDF fallback; India ITR-3's deferred
shared schedules — structurally identical to ITR-2's already-published ones).
No genuinely open whole-vertical gap remained unscreened for any of the 28
existing jurisdictions, so this cycle searched instead for a **new
jurisdiction** the registry does not yet cover at all, per the brief's own
phase-2 instruction, rather than re-attempting an already-dead-ended gap.

Web research (`WebSearch`) for "Bolagsverket blankett 816" / "Sweden company
registration form PDF fillable" found Sweden's Bolagsverket (Companies
Registration Office) publishes Form 816 ("Nyregistrering — Aktiebolag |
Registration of a new company — Limited company") as a directly downloadable,
officially bilingual Swedish/English AcroForm PDF, with **no CAPTCHA, login,
or WAF gate** — a genuinely new, unscreened jurisdiction with an unusually
strong source (the same "officially bilingual" strength that made
`jp/isa/certificate-of-eligibility-application` the strongest candidate in its
own cycle).

## Sources examined

- **Document `(id, version)`:** `se/bolagsverket/aktiebolag-formation` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Swedish Companies Registration Office (Bolagsverket).
- **Primary source:** Bolagsverket Form 816 e ("Nyregistrering | Registration
  of a new company — Aktiebolag | Limited company", edition 2025-11-07),
  downloaded directly from
  `https://bolagsverket.se/download/18.46f4138717c599ee403ab3fa/1763624613404/816e.pdf`,
  linked from the official forms page
  <https://bolagsverket.se/en/sjalvservice/blanketterochmallar/aktiebolag.1713.html>.
  A genuine, official, fillable AcroForm PDF (8 pages), retrieved with a
  direct `curl` fetch (HTTP 200, no block, using a browser `User-Agent`; the
  bare download path 301-redirects and needs `-L`). The Swedish-only sibling
  (Form 816, same download host, `.../1763624522422/816.pdf`) was also
  fetched and confirms the two are the same form, one bilingual and one
  Swedish-only.
- **Cross-referenced pages:** the same Bolagsverket forms-and-templates index
  page (`.../blanketterochmallar.1713.html`) for the form number and edition
  date; Aktiebolagslagen (2005:551) chapter 1 section 5 for the SEK 25,000
  minimum share capital, corroborating rather than contradicting the form's
  own printed "Minimum SEK 25,000 for private limited companies" line.
- **Field extraction method:** `pdfjs-dist`'s `getTextContent()` (full text
  layer, all 8 pages, position-tagged with each item's `x`/`y` transform) and
  `getFieldObjects()` plus page-level `getAnnotations()` (AcroForm field
  names, types, and each field's PDF-level `Required` flag via
  `fieldFlags & 2`) — the same rigor already used for `nl/kvk/bv-formation`,
  `ca/on/registration/business-incorporation`, and
  `de/gewerbeamt/business-registration`. The PDF carries **156 AcroForm text
  fields** across its 8 pages; programmatically checked all 156 annotations'
  `fieldFlags`: **none** set the PDF's own Required bit (`fieldFlags & 2 ===
  0` for every field) — the identical "form's own prose, not the PDF's
  Required bit, is the requiredness signal" pattern already documented for
  `nl/kvk/bv-formation` and `nl/kvk/sole-proprietorship-registration-eenmanszaak`.
  Pages 5-8 of the same PDF are the form's own official English-language
  field-by-field guide (section-numbered, matching the numbered sections on
  pages 1-4), used directly to write each field's `description` and to
  resolve which sections are conditional ("if appointed", "if applicable").
- **Retrieved / reviewed:** 2026-07-10.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial authoring
  source review).

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| §1 (p.1): contact information for this case | `contactFullName`, `contactPostalAddress`, `contactPostcode`, `contactTownCity`, `contactEmail`, `contactPhoneDaytime`, `contactHasDepositAccount`, `contactDepositAccountNumber` |
| §2 (p.1): business address | `businessPostalAddress`, `businessPostcode`, `businessTownCity`, `businessEmailAddress` |
| §3 (p.1): business name proposals | `businessNameProposal1`, `businessNameProposal2`, `businessNameProposal3` |
| §6 (p.1), guide §6 (p.5): share capital, minimum SEK 25,000 | `shareCapitalAmountSek`, `numberOfShares` |
| §7 (p.1), guide §7 (p.6): founder identity/name | `founderIdOrOrgNumber`, `founderResidesAbroad`, `founderCountry`, `founderFullName` |
| §8 (p.2), guide §8 (p.6): board member identity/address, EEA-residency note | `boardMemberIdNumber`, `boardMemberResidesAbroad`, `boardMemberCountry`, `boardMemberSurname`, `boardMemberFirstNames`, `boardMemberPostalAddress`, `boardMemberPostcode`, `boardMemberTownCity` |
| §9 (p.2), guide §9 (p.7): deputy board member | `deputyBoardMemberIdNumber`, `deputyBoardMemberResidesAbroad`, `deputyBoardMemberCountry`, `deputyBoardMemberSurname`, `deputyBoardMemberFirstNames`, `deputyBoardMemberPostalAddress`, `deputyBoardMemberPostcode`, `deputyBoardMemberTownCity` |
| §18 (p.4), guide §18 (p.8): five signatory-power alternatives | `signatoryPowerType`, `signatoryPowerOtherText` |
| §20 (p.4): declaration bullet points, signature | `signerPrintedName`, `signatureDate`, `documents[].declarationStatement`, `documents[].signerHandwrittenSignature` |
| p.5: attachments always required | `documents[].memorandumOfAssociation`, `documents[].articlesOfAssociation`, `documents[].bankCertificate`, `documents[].shareSubscriptionList` |
| p.6-7: passport-copy attachment for anyone not in the Swedish population register | `documents[].founderPassportCopy`, `documents[].boardMemberPassportCopy`, `documents[].deputyBoardMemberPassportCopy` |

## What is NOT independently confirmed / out of scope

- **No PDF-level `Required` flags.** As noted above, none of the 156
  AcroForm fields set the PDF's own Required bit; `required`/`requiredWhen`
  assignments in this document are derived from the form's own numbered
  prose instructions and standard registration necessity, not a confirmed
  submission-time gate.
- **Non-cash (in-kind) property contributions (apportegendom).** The form's
  §6 asks for cash and non-cash amounts as separate boxes, and p.6 lists a
  substantial extra attachment set for non-cash contributions (a statement
  in the memorandum, two years of financial statements if the property is a
  business, an authorized-auditor valuation statement). Out of scope: this
  document models only an all-cash contribution, the same class of scoping
  decision `nl/kvk/bv-formation` makes for "non-cash (in-kind) capital
  contributions."
- **Chair of the board (§10).** Applies "only if the board consists of more
  than one board member" (p.7 guide) — moot in this document's one-ordinary-
  board-member scope.
- **Managing director / deputy managing director (§§11-12), specially
  authorized signatory (§13).** All three are "if appointed" roles a private
  aktiebolag is not required to have (unlike a public aktiebolag, which must
  appoint a managing director); out of scope, matching this document's
  minimal-officer scoping.
- **Person authorized to receive service of process (§14).** Required only
  "if the company does not have an authorized representative who is
  resident (domiciled) in Sweden" (p.7 guide). This document scopes to a
  Sweden-resident founder/board member/deputy (i.e. `foundeResidesAbroad`
  etc. all `false` in the common case), so this role is never triggered in
  scope; the abroad-resident branch (which would also require an
  EEA-residency-exemption application per §8's guide) is a real, disclosed
  future companion-schedule candidate, not a sourcing dead end.
- **Auditor, deputy auditor, accounting-firm-as-auditor (§§15-17).** Sweden
  has exempted small private companies from mandatory audit since 2010
  (below specific balance-sheet/turnover/employee thresholds); this
  document assumes the newly formed company qualifies for that exemption,
  the common case for a brand-new single-founder aktiebolag, and does not
  model the auditor-appointment branch. A future companion-schedule cycle
  could add it, mirroring how `jp/houmukyoku/stock-company-establishment-registration-application-board-of-directors`
  models Japan's mandatory-auditor branch for its own board-installed
  variant.
- **Secondary business name (§§4-5).** An optional bifirma naming a distinct
  part of the business; out of scope as an edge case beyond the core
  registration.
- **Other matters (§19).** Free-text catch-all for a second founder (beyond
  the two rows the base form pre-prints), lay auditors, or other overflow
  content; out of scope by this document's single-founder/no-auditor
  scoping.
- **Registration fee amount.** The form itself states only that "we will
  send you a notification... with information about the registration fee
  and how to pay it" (p.4) — no fee amount is printed on the form, so no
  `payment`-category `documents[]` entry is modelled (a fabricated amount
  from an external, unlinked fee schedule would fail this document's own
  source-fidelity bar).
- **Beneficial-ownership registration.** The form's own closing note (p.8)
  states this is a **separate** filing with Bolagsverket, due within four
  weeks of registration — a distinct, downstream filing not modelled here,
  the same class of exclusion `nl/kvk/bv-formation` applies to KVK's UBO
  Formulier 30.
- **Address decomposition.** All postal addresses are modelled as single
  free-text strings, matching the form's own single free-text address box
  per person/entity, not a decomposed street/number/postal-code/city object.
- **Live e-service parity.** The form's own p.5 notes a `verksamt.se`
  e-service alternative exists (Swedish-only); not screened this cycle —
  this document is sourced entirely from the paper/PDF form, not a live
  wizard walkthrough.

## Scope and jurisdiction notes

- Opens **Sweden as GovSchema's 29th jurisdiction**, with one vertical
  (Business Formation) modelled; Sweden's other five verticals (Passport,
  DMV, Taxes, Visa, National ID) are open, unscreened backlog candidates for
  a future cycle.
- Scoped to the single-founder/sole-ordinary-board-member case (the founder
  is also the company's one ordinary board member), the same narrowing
  `nl/kvk/bv-formation`, `de/handelsregister/gmbh-formation-musterprotokoll`,
  and `za/cipc/private-company-incorporation` each apply to their own
  jurisdiction's first true-limited-company schema — the natural first cut,
  deferring the multi-founder/multi-board-member/auditor-appointed variants
  to a future version.
- The mandatory deputy board member (Aktiebolagslagen 8:3, triggered
  whenever the board has fewer than three ordinary members) is modelled as
  **required**, not optional — a genuine legal consequence of this
  document's own board-size scoping, the same kind of disclosed,
  scope-driven requiredness change `jp/houmukyoku/stock-company-establishment-registration-application-board-of-directors`
  made for its mandatory-auditor field.
- Conditional flow is expressed with `requiredWhen` throughout (GSP-0013); no
  branch in this document's scope disqualifies the applicant, so no
  `transitions`/`exitReason` construct is used.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer confirms the exact requiredness
Bolagsverket enforces when Form 816 is filed (paper or via `verksamt.se`),
whether the small-company audit exemption genuinely applies with no further
declaration on this form, and whether `verksamt.se`'s e-service exposes any
field this paper-form sourcing does not — recording the outcome here,
shipping a new schema version if discrepancies are found (VERSIONING.md §3,
immutability).

## Test run

A mock `conformance/se/bolagsverket/aktiebolag-formation/1.0.0/application-packet.json`
scenario (Elin Bergström, a single-founder Gothenburg IT-consultancy
aktiebolag, all-cash SEK 25,000 share capital for 2,500 shares, Elin as the
sole ordinary board member and Sweden-resident, Oskar Lindqvist as the
mandatory Sweden-resident deputy board member, signatory alternative 1) was
checked with a from-scratch script re-implementing this document's own
`required`/`requiredWhen` condition grammar (GSP-0013). Result: **0 errors**
across all 41 fields (35 collected, 6 correctly marked not-applicable). Two
mutation tests confirmed the condition grammar fires correctly in both
directions: (1) changing `signatoryPowerType` to `other_specified_below`
without adding `signatoryPowerOtherText` correctly raised 1
missing-required-field error; (2) changing `boardMemberResidesAbroad` to
`true` without adding `boardMemberCountry` correctly raised 1
missing-required-field error. The schema was also validated against the
GovSchema v0.3 meta-schema with `tools/validate-ajv.mjs` (pass).

## Re-verification

Per the practice's Cadence, `nextReviewBy` is set to **2027-01-10** (6
months).
