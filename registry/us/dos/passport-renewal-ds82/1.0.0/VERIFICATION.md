# Verification record — `govschema:us:dos:passport-renewal-ds82` v1.0.0

This file is the **source-review record** for this document version, per
[`practices/VERIFICATION-PRACTICE.md`](../../../../../practices/VERIFICATION-PRACTICE.md) §6.
It documents the provenance of the published fields and flow and states the
current verification claim honestly.

## Current claim

- **`verification.status`:** `unverified`
- **`verification.method`:** `null`

The document carries the honest default (SPEC §9, VERIFICATION-PRACTICE §4.1).
It was **derived from and cross-checked against** the official source below, but a
full field-by-field human-review practice (`manual-source-review` §4.2 — confirming
*every* published field and constraint against the live form) has **not** yet been
completed and recorded, so it does not yet claim `human-reviewed`. Consumers
SHOULD treat this as an accurate, source-grounded structural reference, not a
load-bearing description of the live process.

## Source examined

- **Document `(id, version)`:** `govschema:us:dos:passport-renewal-ds82` / `1.0.0`
- **Spec version:** GovSchema `0.1`
- **Authority:** U.S. Department of State, Bureau of Consular Affairs (`dos`)
- **Primary source URL:** <https://travel.state.gov/en/passports/renew-replace/mail.html>
- **Official form id:** `DS-82`
- **Retrieved / reviewed:** 2026-06-30
- **Reviewer:** Founding Engineer, GovSchema (initial authoring source-review)

## What was confirmed against the source

The **eligibility gate** is taken verbatim from the official "Renew Your Passport
by Mail" page. You can renew by mail with Form DS-82 only if all of the following
hold; the document models each as a boolean in the `eligibility` step and routes
to `apply_in_person` if any fails:

| Source condition | Field |
|---|---|
| Most recent passport has never been reported lost or stolen | `passport_lost_or_stolen` (must be `false`) |
| Issued within the last 15 years | `passport_issued_within_15_years` |
| Issued at age 16 or older and valid for 10 years | `passport_issued_age_16_or_older` |
| You can submit your most recent passport with the application | `can_submit_most_recent_passport` |
| Issued in current name, or name change is documentable | `name_matches_or_have_documentation` |
| Not damaged other than normal wear and tear | `passport_undamaged` |

Child restriction confirmed: a passport for a child under 16 cannot be renewed by
mail — folded into `passport_issued_age_16_or_older` and the help text.

Required submission items confirmed from the source and modelled as fields:
completed DS-82, most recent passport (`can_submit_most_recent_passport`), one
photograph (`photo`), payment by check or money order (`payment_method`), and a
name-change document when applicable (`name_change_document`).

## What is NOT yet independently verified

- The **applicant input fields** (`last_name` … `service_speed`) reflect the
  structure of Form DS-82 but were not yet confirmed item-by-item against the live
  PDF; field numbering in `source` annotations is indicative, not authoritative.
- Constraint patterns (SSN, passport number, ZIP, phone) are reasonable encodings,
  not citations of a published validation rule from the source.
- **Fees and processing times** deliberately are not encoded as data (they change
  frequently); the document points consumers to the live source instead.

## Path to a `human-reviewed` claim (next step)

To advance this document to `human-reviewed` (SPEC §9, VERIFICATION-PRACTICE §4.2),
a reviewer applies the adopted `manual-source-review` practice: confirm the source
is authoritative, compare **every** published field and the flow against the live
DS-82 form and instructions, resolve any discrepancy by shipping a new version
(immutability — VERSIONING §3), and append the outcome here plus set
`verification` to `{ status: "human-reviewed", method: "<adopted-method-id>",
lastVerifiedAt: <date>, verifiedAgainst: "<source.url>" }` in a **new PATCH
version**. This v1.0.0 record stays as the authoring provenance.

## Re-verification

Per VERIFICATION-PRACTICE §7, passport renewal is a fee/policy-sensitive process;
re-check the source at least every 6 months and on any `source.url` change
(drift detection via `verifiedAgainst`).
