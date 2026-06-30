# Practice: manual-source-review-v1

**Identifier:** `manual-source-review-v1`
**Type:** human review
**Status:** active

## Purpose

Confirm, by direct human comparison against the live government source, that a
GovSchema document accurately reflects the fields, types, requiredness, and flow
of the real process.

## Procedure

1. **Locate the authoritative source.** Open the URL in `source.url`. Confirm it
   is an official government domain for the named `authority`. If the form has an
   official document reference, confirm it matches `source.documentRef`.
2. **Field-by-field comparison.** For each field in the live source:
   - confirm a corresponding entry exists in `fields` (or is intentionally
     out of scope, noted in `description`);
   - confirm `label` matches the source wording;
   - confirm `type` and `required` match the source's treatment;
   - confirm `validation` (patterns, lengths, ranges, enums) does not reject
     input the source accepts, nor accept input the source rejects;
   - confirm `sourceRef` points at the right location on the form.
3. **Flow comparison.** If `steps` is present, confirm the ordering and the
   field grouping match the source process.
4. **Record the result.** Set `verification.lastVerifiedAt` to today,
   `verification.verifiedBy`, and a `nextReviewBy` per the cadence below. Set
   `status` to `verified` only if no discrepancies remain; otherwise keep
   `draft` and note the gaps.
5. **On discrepancy.** Ship a new schema version per [VERSIONING.md](../VERSIONING.md)
   (PATCH/MINOR/MAJOR as the change warrants). Never edit a published version.

## Cadence

Default `nextReviewBy` is **6 months** after `lastVerifiedAt`, or sooner for
processes known to change frequently (fees, seasonal forms). A `verified` schema
past its `nextReviewBy` should be treated by consumers as `draft`.

## Limitations

This practice depends on human diligence and the source being publicly
reachable at review time. It does not detect a source change that occurs between
reviews — that is what `nextReviewBy` bounds. Automated and source-subscription
practices are planned as future, separately-versioned practices.
