# Verification record — `us/irs/employer-identification-number-ss4` v2.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. `v1.0.0`'s own `VERIFICATION.md` stays as the authoring provenance for
that version and is not edited (VERSIONING.md §3 immutability); this is a fresh
record for `v2.0.0`, not a correction of `v1.0.0`.

## Current claim

- **`status`:** `draft` (unchanged from v1.0.0 — this version does not perform
  the independent field-by-field re-review; see "What is NOT yet independently
  verified" below)
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-01`

## Why this is a MAJOR version, not a MINOR/PATCH

Per [GOV-319](/GOV/issues/GOV-319) (RFC 0003 §8, flagship plan point 1), this
version is a **structural modeling upgrade**, not a content correction: it
converts prose "required only when..." rules into real `requiredWhen`
conditions (GSP-0013 §2) and expresses the online-vs-fax/mail/phone eligibility
gate as a real `steps[].transitions` branch with `exitReason` (GSP-0013 §4),
now that `spec/v0.3` ([GOV-373](/GOV/issues/GOV-373)) exists.

Two new **required** fields were added — `principalBusinessInUS` and
`responsiblePartyHasSSNITIN` — to make the eligibility gate mechanically
evaluable (see below). A new required field invalidates any `v1.0.0` data that
lacks it, so per [VERSIONING.md](../../../../../VERSIONING.md) §5.3 this is a
**MAJOR** bump (`1.0.0` → `2.0.0`), not additive.

## Sources examined

- **Document `(id, version)`:** `us/irs/employer-identification-number-ss4` /
  `2.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Primary source URL:** <https://www.irs.gov/forms-pubs/about-form-ss-4>
  (unchanged from v1.0.0; the Form SS-4 line 1–18 field set itself is
  untouched by this version)
- **Online-application eligibility rule (re-confirmed live for this version):**
  <https://www.irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online>,
  "Who can use this tool" section, fetched 2026-07-01:
  > Use this if: Your principal place of business is in the U.S. or U.S.
  > territories. You're the responsible party in control of the entity or its
  > authorized representative. You have the responsible party's Social
  > Security or individual taxpayer ID number (ITIN).
  > You can't use this: If your principal place of business is outside the
  > U.S. Apply by phone, fax or mail. To apply with an EIN. Only government
  > entities may apply with an EIN.
- **Retrieved / reviewed:** 2026-07-01
- **Reviewer:** GovSchema Engineering (Standards Engineer)

## What changed from v1.0.0

- **Two new fields**, `principalBusinessInUS` and `responsiblePartyHasSSNITIN`
  (`fieldRole: eligibility`, GSP-0014 §2), sourced from the online-assistant
  eligibility page quoted above — not Form SS-4 line items themselves, which is
  why each carries a `sourceRef` naming the online assistant page rather than a
  line number.
- **New first step** `eligibility_check`, carrying those two fields and a
  `transitions` array (not `next`) with two `to: null` exits —
  `principal-business-outside-us-apply-by-fax-mail-or-phone` and
  `responsible-party-lacks-ssn-itin-apply-by-fax-or-mail` — and a fallthrough
  into the existing `entity_identification` step. This document still models
  the Form SS-4 field set common to every channel (per v1.0.0's own scope
  note); the `to: null` exits mark "online assistant not usable, the applicant
  needs the fax/mail/phone channel instead" as recorded in the form
  instructions' "How To Apply" section, not "stop collecting data" — an
  ineligible-for-online applicant still completes the same lines 1–18 on
  paper.
- **`requiredWhen` added** to 11 fields whose `description` already stated a
  conditional-requiredness rule in prose: `llcMemberCount`/`llcOrganizedInUS`
  (`isLLC: true`), `entityTypeOtherSpecify` (`entityType` in
  `other_nonprofit_organization`/`other`), `entityTypeCorporationFormNumber`
  (`entityType: corporation`), `entityTypeTrustGrantorTin`
  (`entityType: trust`), `entityTypeEstateDecedentSSN` (`entityType: estate`),
  `entityTypePlanAdministratorTin` (`entityType: plan_administrator`),
  `reasonForApplyingSpecify` (6-way `reasonForApplying` branch),
  `expectedAgriculturalEmployees`/`expectedHouseholdEmployees`/
  `expectedOtherEmployees` (`highestExpectedEmployees > 0`), and `previousEIN`
  (`previouslyAppliedForEIN: true`). The existing prose in each field's
  `description` is left in place — it remains accurate human-facing text, now
  backed by a machine-checkable rule instead of being the rule's only home.
- **`visibleWhen` added** to `incorporationState`/`incorporationForeignCountry`
  (`entityType: corporation`). Not `requiredWhen`: the source further splits
  these two on whether the corporation was incorporated in vs. outside the
  U.S., and no field in this document captures that sub-fact, so asserting an
  exact `requiredWhen` for either would overclaim a condition this document
  cannot actually evaluate. `visibleWhen` narrows correctly (both are
  irrelevant outside `entityType: corporation`) without overclaiming
  requiredness the schema can't verify.
- **`crossFieldValidation` added**, one rule (`employmentCountsRequireHighestCount`):
  when `highestExpectedEmployees` is `0`, `expectedAgriculturalEmployees`,
  `expectedHouseholdEmployees`, and `expectedOtherEmployees` MUST be absent —
  the same rule GSP-0013 §3 used this exact field set to motivate.
- **Two fields intentionally NOT converted**, to avoid overclaiming a
  condition the `Condition` grammar cannot express: `thirdPartyDesigneePhone`/
  `thirdPartyDesigneeAddressAndZip` are "required only when
  `thirdPartyDesigneeName` is given" — a **presence** check, not an
  **equality** check, and GSP-0013's grammar has no `isPresent`/`isAbsent`
  operator (leaf comparisons are `equals`/`notEquals`/`in`/ordering against a
  literal or another field's value, never "is set"). Left as prose-only,
  same as v1.0.0, rather than forcing an approximate `equals`/`notEquals`
  against a placeholder value the source doesn't actually define.

## What is NOT yet independently verified

Unchanged from v1.0.0 (see that version's `VERIFICATION.md`): the full "Do I
Need an EIN?" line-subset table, the online assistant's actual screen-by-screen
interview, and constraint patterns remain as documented there. This version
adds structural modeling of already-known facts; it does not perform the
field-by-field independent re-review that would advance `status` to
`verified`.

## Re-verification

Per the practice's cadence, `nextReviewBy` for this record follows the same
2026-07-01 review date as v1.0.0's cadence reset: **2027-01-01**. Re-check both
the Form SS-4 source and the online-assistant eligibility page on or before
that date.
