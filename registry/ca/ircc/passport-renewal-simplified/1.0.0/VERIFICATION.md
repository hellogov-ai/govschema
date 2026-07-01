# Verification record — `ca/ircc/passport-renewal-simplified` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and states
the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-01`

The document was **derived from** the official canada.ca renewal guidance and
**cross-checked across independent secondary sources**, but the full field-by-field
comparison the practice requires (confirming *every* published field, type,
requiredness, and constraint against the live form — `manual-source-review-v1` →
Procedure step 2) has **not** yet been completed and recorded. It therefore remains
`draft`, not `verified`. Consumers SHOULD treat this as an accurate, source-grounded
structural reference, not a load-bearing description of the live process.

## Source examined

- **Document `(id, version)`:** `ca/ircc/passport-renewal-simplified` / `1.0.0`
- **Spec version:** GovSchema `0.1.0`
- **Authority:** Immigration, Refugees and Citizenship Canada, Passport Program (IRCC)
- **Primary source URL:** <https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-passports/renew-adult-passport.html>
- **Official form id:** `PPTC 054` (Adult Simplified Renewal Passport Application)
- **Retrieved / reviewed:** 2026-07-01
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## Access constraint (important, read before trusting this record)

`canada.ca` returned `HTTP 403` to automated retrieval for **every** page fetched
directly — the renewal guidance, the eligibility checklist
(`renew-adult-passport/check-who-renew.html`), the required-documents page, the
apply-by-mail page, and the `pptc054.pdf` form itself (same class of gotcha as
`ie/dfa/passport-renewal-adult`'s `ireland.ie` block; unlike that case, no
government-adjacent mirror domain was found that serves the same content
unblocked). The PDF was retrieved once as a raw binary via a web-content tool, but
its `stream`/`endstream` payloads did not extract with the standard
zlib-decompress + parenthesized-string technique used for prior forms (see
[[gov-form-pdf-extraction]] in engineering memory) — the form appears to be an XFA
LiveCycle PDF whose glyph/text data is not exposed as plain `Tj`/`TJ` operands
this way. This document is therefore built from **web search result summaries and
independent third-party transcriptions** (e.g. `servicecanadapassport.ca`), not a
direct read of the primary source. Every eligibility and document-requirement claim
below was corroborated by at least two independent secondary sources before being
encoded; where sources disagreed, the majority/more-recent reading was taken and
the conflict is noted.

## What was confirmed against secondary sources

The **eligibility conditions** for Simplified Renewal (no guarantor, no
references, no proof of citizenship) were corroborated across
`servicecanadapassport.ca`, `citizenpass.ca`, and canada.ca web-search summaries:

| Source condition | Field |
|---|---|
| Most recent passport issued at age 16 or older | `currentPassportIssuedAge16OrOlder` |
| Most recent passport was a 5-year or 10-year adult passport | `currentPassportValidity` |
| Passport still valid, or expired less than 1 year (up to 15 years for mail/in-person) | `currentPassportWithinExpiryWindow` |
| Not reported lost/stolen, not damaged | `passportLostStolenOrDamaged` (must be `false`) |
| Name, date of birth, place of birth, gender identifier unchanged | `personalDetailsUnchanged` |
| Online channel requires a Canadian home/mailing address | `residentInCanada` |

**Resolved source conflict — name changes.** `citizenpass.ca`'s summary initially
implied a name-change document could be attached to a renewal. Two other sources
(`servicecanadapassport.ca`'s field-by-field summary and the canada.ca web-search
synthesis of the official eligibility page) state clearly that Simplified Renewal
**cannot** be used at all if the name has changed — the applicant must instead file
Form PPTC 153 (Adult General Passport Application). This document follows the
majority/more-authoritative reading: `personalDetailsUnchanged` is a hard
eligibility gate, and no `nameChangeDocument` field is modelled (unlike the US
DS-82 and GB/IE passport renewal schemas, which do accept a name-change document
inline). This divergence should be the first thing re-checked when direct
canada.ca access becomes available.

**Eligibility routing rule (not encoded structurally in v0.1).** If any
eligibility condition fails, the applicant cannot use Simplified Renewal and must
either apply in person, apply as a first-time applicant, or file Form PPTC 153.
GovSchema v0.1's `steps` model is linear and cannot express this branch; the rule
is recorded here and in each eligibility field's `description` instead, consistent
with how `us/dos/passport-renewal-ds82` handles the same limitation pending
[GSP-0004](../../../../../spec/proposals/0004-conditional-flow.md) (conditional flow).

Required submission items confirmed and modelled as fields: completed PPTC 054
(implicit), most recent passport (`mostRecentPassport`), photo(s) (`photo`,
one vs. two depending on `submissionChannel`), and payment (`paymentMethod`).
Three submission channels (online, mail, in person) and their respective address
and payment-method constraints were corroborated across sources and modelled as
`submissionChannel`.

## What is NOT yet independently verified

- The **applicant input fields** (`surname` … `mostRecentPassportExpiryDate`)
  reflect the form's known section structure (Section 1 — Personal Information,
  Section 2 — Previous Canadian Passport, plus Contact Information) as described in
  secondary transcriptions, but were not confirmed item-by-item against the
  primary PDF; the `sourceRef` annotations are indicative, not authoritative.
- Whether a separate mailing address (distinct from the home address) is
  collected as discrete fields on the live form, versus how this document folds it
  into the single boolean `mailingAddressSameAsHome`, is unconfirmed.
- Constraint patterns (postal code, phone, passport number) are reasonable
  encodings, not citations of a published validation rule from the source.
- The precise boundary of `currentPassportWithinExpiryWindow` (whether renewal
  by mail/in-person is available up to the full 15-year window, versus only
  online renewal being restricted to the 1-year window) is taken from secondary
  sources and should be confirmed against the primary eligibility checklist.
- **Fees and processing times** are deliberately not encoded as data (they change
  frequently, and one secondary source already showed a fee change effective
  2026-03-31); the document points consumers to the live source instead.

## Path to a `verified` claim (next step)

To advance this document to `status: verified`, a reviewer needs **direct** access
to `canada.ca` (the 403 block encountered during authoring must be worked around,
e.g. from an unrestricted network) to apply `manual-source-review-v1` (Procedure
step 2 field-by-field comparison, step 3 flow comparison) against the primary
eligibility checklist, required-documents page, and the PPTC 054 PDF itself;
resolve the name-change discrepancy noted above; and record the outcome here
before setting `status: verified` with a current `verification.lastVerifiedAt`/
`nextReviewBy`. This v1.0.0 record stays as the authoring provenance.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01** (6 months):
passport renewal is a fee/policy-sensitive process, and this record's above-average
reliance on secondary sources argues for the shorter end of the cadence.
Re-check the source on or before that date and on any `source.url` change.
