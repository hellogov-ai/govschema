# Verification record — `us/ca/sos/corporation-formation-arts-gs` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow, records a
mock-data test run of the field set, and states the current verification claim
honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-01`

The document was **derived from and cross-checked against** the official sources
below, but the full field-by-field comparison the practice requires (confirming
*every* published field, type, requiredness, and constraint against the live form —
`manual-source-review-v1` → Procedure step 2) has **not** yet been independently
re-verified by a second reviewer. It therefore remains `draft`, not `verified`.
Consumers SHOULD treat this as an accurate, source-grounded structural reference,
not a load-bearing description of the live process.

## Why this candidate was added (phase 2 of the GOV-282 brief)

GOV-282 names "Business Formation (LLC, EIN, and Incorporation)" as one of five
focus verticals. Before this document, the registry covered the "LLC" leg
(`us/ca/sos/business-entity-llc-formation`) and the federal identifier leg
(`us/irs/employer-identification-number-ss4`), but had **no** "Incorporation"
candidate at all — not even in `discovery/catalog.json`'s backlog. This document
closes that gap: it was added directly as a new catalog candidate and authored to
`published` in the same cycle, rather than picked from an existing backlog entry
(contrast with the LLC/EIN documents, which advanced pre-existing candidates).

## Sources examined

- **Document `(id, version)`:** `us/ca/sos/corporation-formation-arts-gs` / `1.0.0`
- **Spec version:** GovSchema `0.2.0`
- **Authority:** California Secretary of State (SOS)
- **Primary source URL:** <https://bpd.cdn.sos.ca.gov/corp/pdf/articles/arts-gs.pdf>
- **Official form id:** `Form ARTS-GS (Rev. 06/2023)`
- **Form PDF:** the live CDN URL returns `403 AccessDenied` to direct fetch from
  this environment (the same CDN-level block hit while authoring the sibling LLC-1
  document), so it was retrieved via a Wayback Machine capture of the same URL,
  `https://web.archive.org/web/20240720075606/https://bpd.cdn.sos.ca.gov/corp/pdf/articles/arts-gs.pdf`
  (captured 2024-07-20, digest-identical to the 2024-06-19 capture, so the form was
  unchanged at least June–July 2024; a 2025-04-01 recrawl of the live URL hit the
  same `403`, so July 2024 is the most recent capture available). Parsed with the
  `pdf-parse` npm package (`PDFParse.getText()`), the same tool used for the LLC-1
  document — this form's static text is likewise embedded via glyph-indexed hex
  strings that the repo's usual zlib-decompress + literal-parenthesized-`Tj`
  extraction convention does not decode. All six numbered items on page 2 of 2
  (ARTS-GS itself; page 1 of 2 is the generic, optional Submission Cover Sheet
  bundled in the same PDF) were recovered as plain text and transcribed
  field-by-field from that output.
- **Instructions for Completing Form ARTS-GS (Rev. 06/2019):**
  <https://formfiles.justia.com/pdf/california/0520/16.pdf> — an older instructions
  revision (2019) than the form itself (2023), used only for the parts not
  restated on the form: the agent-for-service-of-process rules (including the
  "a corporation cannot name itself as agent" rule and the Section 1505
  registered-corporate-agent prerequisite), the single-class/at-least-1-share
  rule for item 4, and the every-incorporator-must-sign / no-title convention for
  item 6. Unlike the LLC-1 Instructions (Rev. 08/2019), this instructions revision
  does **not** claim item 2a must be a California address — it only says "the
  complete street address, city, state and zip code of the corporation's initial
  address" — so, unlike the sibling LLC-1 document, there is no discrepancy to
  flag here between the 2019 instructions and the 2023 form on this point.
- **Retrieved / reviewed:** 2026-07-01
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## Not a time-versioned (edition) form

Articles of Incorporation (Form ARTS-GS) is a one-time initial filing made once
per corporation, not filed "for" a recurring tax/award year — applying the
GSP-0005 §2 coexistence test, there is no scenario where two editions of the
ARTS-GS data model need to coexist for the same applicant. This document is
therefore authored at the plain (non-edition) registry path,
`registry/us/ca/sos/corporation-formation-arts-gs/1.0.0/`. A future ARTS-GS
revision that changes the field set ships as a new `version`, not an edition.

## What was confirmed against the source

- **Form identity and purpose.** Form ARTS-GS is the Articles of Incorporation
  filed with the California Secretary of State to incorporate a general stock
  corporation limited to a single class of authorized shares. $100 filing fee,
  optional $5 certified-copy fee, confirmed against the form's own "This Space For
  Office Use Only" block.
- **Full item-by-item field set (items 1–6).** Transcribed directly from the
  decoded PDF text: corporate name (item 1); initial street/city/state/zip address
  and optional differing mailing address (items 2a/2b); the identical
  individual-vs-corporation agent-for-service-of-process branch used by the
  sibling LLC-1 document, including the pre-printed "CA" in the individual
  agent's state field (items 3/3a/3b/3c); the authorized-shares count, with the
  single-class-only / at-least-1 constraint (item 4); the fixed, non-alterable
  purpose statement (item 5, modeled as a document fact in the schema
  `description`, not as a field, since it is not applicant-entered data); and the
  incorporator signature block (item 6).
- **Agent-for-service-of-process rules.** The "individual OR corporation, not
  both" constraint, the requirement that an individual agent reside in California
  with a physical (non-P.O.-box) California address, the §1505
  registered-corporate-agent prerequisite, and the "a corporation cannot name
  itself as agent" rule are recorded in `agentType`/`agentStreetAddressLine1`/
  `agentCorporationName`'s descriptions, sourced from the Instructions item
  3/3a/3b/3c guidance.
- **Authorized-shares constraint.** "Do not leave blank or enter zero (0)", "at
  least 1 share but ... any number of shares", and the single-class-only
  limitation (a multi-class corporation must compose its own Articles of
  Incorporation instead of using this form) are recorded in `authorizedShares`'s
  description, sourced from the form's own item 4 text and the Instructions item 4
  guidance.
- **Signature-block convention.** "Do not include the title of the person
  signing" and the one-form-one-signature-set rule are recorded in
  `incorporatorName`'s description, sourced from the Instructions item 6 guidance.
  Unlike the sibling LLC-1 document, the ARTS-GS Instructions state this plainly
  with no entity/trust-signer exception, so no additional signer-capacity example
  is modeled here.

## Mock-data test run

Per the issue's phase-4 instruction to test-run the schema with valid mock data, a
representative filled-out filing was authored and checked field-by-field against
every `type`/`required`/`validation` constraint in `schema.json` (string length,
regex pattern, enum membership, integer minimum, and the conditional-field notes
called out in field descriptions):

```json
{
  "corporationName": "Riverside Coastal Goods, Inc.",
  "principalAddressLine1": "482 Harbor View Drive, Suite 210",
  "principalAddressCity": "San Diego",
  "principalAddressState": "CA",
  "principalAddressZipCode": "92101",
  "agentType": "individual",
  "agentFirstName": "Maria",
  "agentMiddleName": "Alejandra",
  "agentLastName": "Torres",
  "agentStreetAddressLine1": "482 Harbor View Drive, Suite 210",
  "agentCity": "San Diego",
  "agentState": "CA",
  "agentZipCode": "92101",
  "authorizedShares": 1000000,
  "incorporatorName": "Maria Alejandra Torres"
}
```

This models a single-incorporator general stock corporation (the incorporator
acting as her own agent for service of process) filing Articles of Incorporation
for a new California corporation at the same address used in the companion
`us/ca/sos/business-entity-llc-formation` and `us/irs/employer-identification-number-ss4`
mock scenarios, so all three reference schemas describe one coherent, consistent
example location while modeling three distinct formation paths (LLC, corporation,
and the federal EIN either entity would separately need). The scenario exercises
the `agentType: individual` conditional group and omits the optional differing
mailing address and the corporation-agent branch. A one-off Node script
(`node:fs` + a hand-rolled per-field validator, not committed to the repo)
confirmed every populated field satisfies its `type` and `validation` constraint
and that no required field was left unset:

```
PASS — mock single-incorporator general stock corporation Articles of Incorporation satisfies the schema field-level constraints.
```

Both registry validators were run against the schema document itself (not the
mock data) and pass:

```
$ node tools/validate.mjs registry/us/ca/sos/corporation-formation-arts-gs/1.0.0/schema.json
ok   registry/us/ca/sos/corporation-formation-arts-gs/1.0.0/schema.json

$ cd tools && node validate-ajv.mjs ../registry/us/ca/sos/corporation-formation-arts-gs/1.0.0/schema.json
ok   registry/us/ca/sos/corporation-formation-arts-gs/1.0.0/schema.json [v0.2]
```

## What is NOT yet independently verified

- **The Mail Submission Cover Sheet** (page 1 of the same PDF) is explicitly
  optional, generic to any paper SOS filing, and stated not to become part of the
  filed document — it is deliberately out of scope for this schema, which models
  the ARTS-GS Articles of Incorporation itself (page 2).
- **The online bizfileOnline.sos.ca.gov interview's actual screen-by-screen
  flow** (question order, exact wording, branching logic) was not directly
  observed; this document is sourced from the paper Form ARTS-GS and its
  instructions, which the "For fastest service, file online" note on the form
  states is the same underlying data.
- **Constraint patterns** (ZIP code format) are reasonable encodings, not
  citations of a published SOS validation rule.
- **Downstream/related filings** (the Statement of Information due within 90 days
  and annually thereafter on Form SI-550, the $800/year Franchise Tax Board
  minimum tax, California securities-law compliance before shares are sold or
  issued, bylaws, and the federal EIN) are out of scope; this document covers the
  initial Articles of Incorporation filing only.
- **General corporate name requirements** are referenced by the form/instructions
  via a Secretary of State web page rather than a cited Corporations Code section
  number (contrast with the LLC-1 document, which cites §17701.08 directly); this
  document does not assert a specific statutory citation for `corporationName`'s
  restrictions, only what the source text itself states.

## Path to a `verified` claim (next step)

To advance this document to `status: verified`, a reviewer applies
`manual-source-review-v1` (Procedure step 2 field-by-field comparison, step 3 flow
comparison) against the live Form ARTS-GS (Rev. 06/2023) PDF and a current
Instructions revision, ideally with an observed run of the bizfileOnline.sos.ca.gov
online filing interview, confirms the sources are still authoritative, resolves
any discrepancy by shipping a new schema **version** (immutability — VERSIONING
§3, practice Procedure step 5), and records the outcome here plus sets
`status: verified` with a current `verification.lastVerifiedAt` / `nextReviewBy`.
This v1.0.0 record stays as the authoring provenance.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01** (6 months).
Re-check the source on or before that date, on any `source.url` change, or when the
California Secretary of State publishes a new Form ARTS-GS revision.
