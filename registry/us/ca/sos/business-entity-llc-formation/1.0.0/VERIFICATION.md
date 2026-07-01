# Verification record — `us/ca/sos/business-entity-llc-formation` v1.0.0

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

## Sources examined

- **Document `(id, version)`:** `us/ca/sos/business-entity-llc-formation` / `1.0.0`
- **Spec version:** GovSchema `0.2.0`
- **Authority:** California Secretary of State (SOS)
- **Primary source URL:** <https://bpd.cdn.sos.ca.gov/llc/forms/llc-1.pdf>
- **Official form id:** `Form LLC-1 (Rev. 11/2023)`
- **Form PDF:** <https://bpd.cdn.sos.ca.gov/llc/forms/llc-1.pdf> — the live CDN URL
  returns `403 AccessDenied` to direct fetch from this environment (a CDN-level
  block, not a change to the form); retrieved instead via a Wayback Machine
  capture of the same URL, `https://web.archive.org/web/20241001223416/https://bpd.cdn.sos.ca.gov/llc/forms/llc-1.pdf`
  (captured 2024-10-01, digest-identical to the March/July 2024 captures, so the
  form was unchanged at least March 2024 – October 2024; later 2025 recrawls of
  the live URL hit the same `403`, so October 2024 is the most recent capture
  available). Parsed with the `pdf-parse` npm package (`PDFParse.getText()`) —
  this form's static text is embedded via glyph-indexed hex strings that the
  repo's usual zlib-decompress + literal-parenthesized-`Tj` extraction convention
  does not decode, so `pdf-parse` was installed ad hoc in a scratch directory for
  this document only (not added as a repo dependency). All six numbered items on
  page 2 of 2 (LLC-1 itself; page 1 of 2 is the generic, optional Submission
  Cover Sheet bundled in the same PDF) were recovered as plain text and
  transcribed field-by-field from that output.
- **Instructions for completing Form LLC-1 (Rev. 08/2019):**
  <https://formfiles.justia.com/pdf/california/0811/12.pdf> — an older instructions
  revision (2019) than the form itself (2023), used only for the parts that are
  unlikely to have changed and are not restated on the form: the California
  Corporations Code §17701.08 name-requirement citations, the §1505
  registered-corporate-agent rules, and the management/signature notes. See the
  "Note on a stale instructions revision" section below for what this does and
  does not license.
- **Retrieved / reviewed:** 2026-07-01
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## Not a time-versioned (edition) form

Articles of Organization (Form LLC-1) is a one-time initial filing made once per
LLC, not filed "for" a recurring tax/award year — applying the GSP-0005 §2
coexistence test, there is no scenario where two editions of the LLC-1 data model
need to coexist for the same applicant. This document is therefore authored at the
plain (non-edition) registry path, `registry/us/ca/sos/business-entity-llc-formation/1.0.0/`.
A future LLC-1 revision that changes the field set ships as a new `version`, not an
edition.

## What was confirmed against the source

- **Form identity and purpose.** Form LLC-1 is the Articles of Organization filed
  with the California Secretary of State to form an LLC. $70 filing fee, optional
  $5 certified-copy fee, confirmed against the form's own "This Space For Office
  Use Only" block.
- **Full item-by-item field set (items 1–6).** Transcribed directly from the
  decoded PDF text: LLC name (item 1); principal office street/city/state/zip and
  optional differing mailing address (items 2a/2b); the individual-vs-corporation
  agent-for-service-of-process branch, including the pre-printed "CA" in the
  individual agent's state field (items 3/3a/3b/3c); the single-select management
  structure (item 4, `one_manager` / `more_than_one_manager` / `all_members`); the
  fixed, non-alterable purpose statement (item 5, modeled as a document fact in
  the schema `description`, not as a field, since it is not applicant-entered
  data); and the organizer signature block (item 6).
- **Name-requirement detail.** The LLC-identifier requirement, the prohibited-word
  list (bank, trust, trustee, incorporated, inc., corporation, corp., and
  insurance-suggestive words), and the distinguishability requirement are recorded
  in `llcName`'s description, sourced from the Instructions (Rev. 08/2019) item 1
  guidance, which cites California Corporations Code §17701.08.
- **Agent-for-service-of-process rules.** The "individual OR corporation, not
  both" constraint, the requirement that an individual agent reside in California
  with a physical (non-P.O.-box) California address, and the §1505
  registered-corporate-agent prerequisite are recorded in `agentType`,
  `agentStreetAddressLine1`, and `agentCorporationName`'s descriptions, sourced
  from the Instructions item 3/3a/3b/3c guidance.
- **Signature-block conventions.** The business-entity-organizer and
  trust-organizer printed-name examples, and the one-form-one-signature-set rule,
  are recorded in `organizerName`'s description, sourced from the Instructions
  item 6 guidance.

## Note on a stale instructions revision

The Instructions PDF used (Rev. 08/2019) is four years older than the form PDF
used (Rev. 11/2023). Two things follow:

- The 2019 instructions label item 2a "the LLC's initial designated office **in
  California**"; the 2023 form itself relabels the same item "Initial Street
  Address of **Principal Office**" and, unlike item 3b (which pre-prints "CA"
  under the agent's state field), item 2a's address block on the 2023 form has no
  pre-printed state. **Resolved** (2026-07-01, review gate GOV-292): this is not a
  discrepancy to reconcile but the documented effect of a 2022 legislative
  amendment (eff. 2023-01-01) that substituted "principal" for "designated" in
  Corp. Code §17702.01. Corp. Code §17701.02(w) defines "principal office" as the
  LLC's principal office "whether or not the office is located in this state,"
  and §17702.01(b)(3) requires the Articles of Organization to state that same
  address with no CA restriction — which is exactly why the 2023 form dropped the
  "in California" qualifier and the pre-printed state. California's requirement
  that an LLC maintain an in-state office (Corp. Code §17701.13(a)(1)) is a
  separate, ongoing **designated office** obligation disclosed on the Statement
  of Information (Form LLC-12), not on the LLC-1. `principalOfficeState` is
  correctly modeled as a free two-letter state field (not fixed to `CA`); the
  field description now states this resolution and its citations directly.
- The Corporations Code citations (§17701.08 name rules, §1505 corporate-agent
  registration) and the general mechanics of items 3–6 are statutory/procedural
  facts unlikely to have changed between 2019 and 2023 — the 2023 form's own item
  text (name-identifier rule, individual-vs-corporation agent branch, three-way
  management checkbox, unaltered purpose statement, signature block) matches the
  2019 instructions' description of those same items verbatim in substance. These
  are treated as still-current; only the item-2a "in California" qualifier was
  stale, and that is now resolved above.

## Mock-data test run

Per the issue's phase-4 instruction to test-run the schema with valid mock data, a
representative filled-out filing was authored and checked field-by-field against
every `type`/`required`/`validation` constraint in `schema.json` (string length,
regex pattern, enum membership, and the conditional-field notes called out in
field descriptions):

```json
{
  "llcName": "Riverside Coastal Goods LLC",
  "principalOfficeAddressLine1": "482 Harbor View Drive, Suite 210",
  "principalOfficeCity": "San Diego",
  "principalOfficeState": "CA",
  "principalOfficeZipCode": "92101",
  "agentType": "individual",
  "agentFirstName": "Maria",
  "agentMiddleName": "Alejandra",
  "agentLastName": "Torres",
  "agentStreetAddressLine1": "482 Harbor View Drive, Suite 210",
  "agentCity": "San Diego",
  "agentState": "CA",
  "agentZipCode": "92101",
  "managementStructure": "all_members",
  "organizerName": "Maria Alejandra Torres"
}
```

This models a single-member LLC (member-managed, the member acting as her own
agent for service of process and as the sole organizer) filing Articles of
Organization for a new California LLC — the same entity and location used in the
companion `us/irs/employer-identification-number-ss4` mock scenario, so the two
reference schemas describe one coherent formation story: form the LLC here, then
obtain its federal EIN. The scenario exercises the `agentType: individual` →
`agentFirstName`/`agentLastName`/`agentStreetAddressLine1`/`agentCity`/
`agentState`/`agentZipCode` conditional group and omits the optional differing
mailing address and the corporation-agent branch. A one-off Node script
(`node:fs` + a hand-rolled per-field validator, not committed to the repo)
confirmed every populated field satisfies its `type` and `validation` constraint
and that no required field was left unset:

```
PASS — mock single-member-LLC (member-managed) Articles of Organization satisfies the schema field-level constraints.
```

Both registry validators were run against the schema document itself (not the
mock data) and pass:

```
$ node tools/validate.mjs registry/us/ca/sos/business-entity-llc-formation/1.0.0/schema.json
ok   registry/us/ca/sos/business-entity-llc-formation/1.0.0/schema.json

$ cd tools && node validate-ajv.mjs ../registry/us/ca/sos/business-entity-llc-formation/1.0.0/schema.json
ok   registry/us/ca/sos/business-entity-llc-formation/1.0.0/schema.json [v0.2]
```

## What is NOT yet independently verified

- **The Mail Submission Cover Sheet** (page 1 of the same PDF) is explicitly
  optional, generic to any paper SOS filing, and stated not to become part of the
  filed document — it is deliberately out of scope for this schema, which models
  the LLC-1 Articles of Organization itself (page 2).
- **The online bizfileOnline.sos.ca.gov interview's actual screen-by-screen
  flow** (question order, exact wording, branching logic) was not directly
  observed; this document is sourced from the paper Form LLC-1 and its
  instructions, which the "For fastest service, file online" note on the form
  states is the same underlying data.
- **Constraint patterns** (ZIP code format) are reasonable encodings, not
  citations of a published SOS validation rule.
- **Downstream/related filings** (Statement of Information due within 90 days and
  biennially thereafter on Form LLC-12, the $800/year Franchise Tax Board minimum
  tax, the federal EIN) are out of scope; this document covers the initial
  Articles of Organization filing only.

## Path to a `verified` claim (next step)

The `principalOfficeState` discrepancy noted above is resolved (2026-07-01,
review gate GOV-292) and required no schema change. To advance this document to
`status: verified`, a reviewer applies `manual-source-review-v1` (Procedure step
2 field-by-field comparison, step 3 flow comparison) against the live Form LLC-1
(Rev. 11/2023) PDF and a **current** Instructions revision, ideally with an
observed run of the bizfileOnline.sos.ca.gov online filing interview, confirms
the sources are still authoritative, resolves any newly discovered discrepancy
by shipping a new schema **version** (immutability — VERSIONING §3, practice
Procedure step 5), and records the outcome here plus sets `status: verified` with
a current `verification.lastVerifiedAt` / `nextReviewBy`. This v1.0.0 record stays
as the authoring provenance.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01** (6 months).
Re-check the source on or before that date, on any `source.url` change, or when the
California Secretary of State publishes a new Form LLC-1 revision.
