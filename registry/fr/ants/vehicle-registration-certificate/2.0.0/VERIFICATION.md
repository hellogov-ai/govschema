# Verification record — `fr/ants/vehicle-registration-certificate` v2.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. `v1.0.0`'s own `VERIFICATION.md` stays as the authoring provenance
for that version and is not edited (VERSIONING.md §3 immutability). This is a
fresh record for `v2.0.0`, which corrects a gap found during the
[GOV-744](/GOV/issues/GOV-744) review gate for `v1.0.0` (PR #142).

## Current claim

- **`status`:** `draft` (unchanged from `v1.0.0` — this version corrects a
  field-coverage gap; it does not newly clear the live-portal blocker that
  kept `v1.0.0` at `draft`, see below)
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-03`

## What changed from v1.0.0

Reviewing PR #142 for GOV-744, a fresh position-sorted re-extraction of the
Cerfa 13750\*07 PDF (fetched again from `formulaires.service-public.gouv.fr/gf/cerfa_13750.do`,
same `pdfjs-dist` `getTextContent()` method as the original authoring pass)
found one printed field `v1.0.0` had missed: a checkbox row

> `Le titulaire` ▢ `Le loueur` ▢ `Le locataire` ▢

printed directly beneath "Mode d'expédition du titre" (`y=56.9`, between the
delivery-method line's own two options at `y=62.7`/`53.9`) — distinct from the
similarly-worded three-column signature-block headers that print separately at
`y=133`. This row selects **who** receives the certificate; `titleDeliveryMethod`
only ever modelled **how** (postal vs. pickup). Confirmed by direct
re-inspection of the position-sorted PDF text, not inferred.

This is a **MAJOR** bump per `VERSIONING.md` §1 (a new `required` field: an
agent built against `v1.0.0` that omitted this field would now be rejected).
`v2.0.0` adds:

- **`titleRecipient`** (required `enum`: `holder` / `lessor` / `lessee`),
  placed in the `delivery_and_consent` step immediately after
  `titleDeliveryMethod`, matching the field's own printed position.
- **`crossFieldValidation`** (two rules, using the GSP-0013 grammar already
  adopted at spec `v0.3`): selecting `lessor` or `lessee` as `titleRecipient`
  requires the corresponding LOUEUR/LOCATAIRE block (`lessorEntityType` /
  `lesseeEntityType`) to be present. This ties the new field to the
  already-published `rentalArrangement` gating (§ below) instead of leaving
  the two independent, so an agent cannot submit `titleRecipient: lessor`
  for an application that never populated a lessor at all.

No other field, step, or document changed; every `v1.0.0` field, `sourceRef`,
and gating rule carries forward unmodified.

## Sources examined (this pass)

- **Primary form source, re-fetched:** Cerfa **13750\*07** PDF via
  `formulaires.service-public.gouv.fr/gf/cerfa_13750.do`, 2026-07-03 — same
  edition as the `v1.0.0` authoring pass (byte-for-byte re-check not required;
  form number/edition print identically).
- **PDF extraction method:** identical to `v1.0.0` — `pdfjs-dist`
  `getTextContent()`, position-sorted (`y` descending, then `x` ascending).
  The new field's `sourceRef` quotes the row's own printed text.
- **Retrieved / reviewed:** 2026-07-03.
- **Reviewer:** GovSchema Engineering (Standards Engineer — follow-up fix
  after the [GOV-744](/GOV/issues/GOV-744) review gate).

All other sourcing (guidance page, mirrors, live-portal-unreachable finding)
carries forward unchanged from `v1.0.0`'s own `VERIFICATION.md` — see that
file for the full authoring record.

## "Test run" (non-submitting)

Per GovSchema's own boundary (`GOVERNANCE.md`: GovSchema describes and
verifies government processes; it does not submit them), no live submission
was attempted. The mock **conformance packet** was regenerated at
[`conformance/fr/ants/vehicle-registration-certificate/2.0.0/application-packet.json`](../../../../../conformance/fr/ants/vehicle-registration-certificate/2.0.0/application-packet.json)
for the same scenario as `v1.0.0` (private individual, no rental, single
holder, postal delivery — `titleRecipient: holder`): 29 fields collected, 56
correctly excluded as not-applicable (29 + 56 = 85, the schema's new full
field count — exact coverage), checked programmatically against the schema's
own `required`/`requiredWhen`/`visibleWhen`/`crossFieldValidation` rules (0
errors) using a small `Condition` interpreter covering every leaf operator
(`equals`, `notEquals`, `in`) plus the new `crossFieldValidation`
`when`/`requirePresent` check.

## Path to a `verified` claim (next step)

Unchanged from `v1.0.0`: a reviewer applies `manual-source-review-v1`
(Procedure step 2) field-by-field against ANTS's `immatriculation.ants.gouv.fr`
live screens — still unreached — confirms or corrects the `colorShade` and
CO-TITULAIRE-scope assumptions carried over from `v1.0.0`, additionally
confirms `titleRecipient`'s live-screen equivalent (if the online SIV portal
surfaces this choice at all, as opposed to inferring the recipient from the
holder/lessor/lessee data already entered), and records the outcome here with
an updated `verification.lastVerifiedAt`.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01** (6
months), unchanged from `v1.0.0`. Re-check the source on or before that date
and on any `source.url` or Cerfa edition change (the form is currently edition
`13750*07`).
