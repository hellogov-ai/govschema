# Verification record — lv/vid/annual-income-tax-declaration-form-d@1.4.1

## Candidate selection

GOV-4186 ("GovSchema Standard Research"), a same-cycle follow-up. While
independently researching this exact issue (author Annex D4 as v1.4.0), a
concurrent run had already authored, opened, and merged the identical
deliverable as PR #631 (commit `a63d1c6`) before this run's own draft was
committed — a recurrence of this registry's known shared-checkout
duplicate-concurrent-run pattern. Rather than discard the independent
verification work already done, this cycle cross-checked PR #631's merged
`schema.json` line by line against a from-scratch re-derivation of Annex
D4's structure and found it well-modelled and its own disclosed findings
(the carry-forward row's column-1 "prior year" vs. rendered "1./2./3."
placeholder tension, in particular) sound. One genuine defect surfaced:
v1.4.0 added the new `deductibleExpenseGrandTotal...` fields and even
stated, in `deductibleExpenseGrandTotalEducationMedicalCappedAtLimit`'s own
description, that they "feed Declaration D's own row 8 ... field
`educationHealthDonationsDeduction`" — but never actually updated that row-8
field, or `attachedAnnexNumbers`, to drop their own pre-existing "Annex D4
is out of scope" language. Both fields, as merged, directly contradicted
the rest of the same document. This PATCH fixes exactly those two
descriptions; per VERSIONING.md §1, a published version's directory is
immutable, so the fix publishes as a new `1.4.1` rather than editing
`1.4.0` in place.

## Reaching the live source

Re-fetched
`https://likumi.lv/ta/id/302688-noteikumi-par-iedzivotaju-ienakuma-nodokla-deklaracijam-un-to-aizpildisanas-kartibu`
directly with a standard desktop Chrome User-Agent: HTTP 200,
`Content-Type: text/html; charset=utf-8`, 365,651 bytes — the identical byte
count every prior version (v1.0.0–v1.4.0) recorded. No field or validation
change results from this cycle's fetch; it re-confirms v1.4.0's own
extraction is unaffected by any source change.

## What changed and why

Only two pre-existing fields' `description` strings changed; no field was
added, removed, renamed, or retyped, and no `validation`/`crossFieldValidation`
rule changed — an editorial PATCH per VERSIONING.md §1 ("fix `label`,
`description`, `sourceRef`, or other annotations").

1. **`educationHealthDonationsDeduction`** (Form D row 8). Before: "Printed
   formula: Annex D4 'Kopā' row, columns 10 and 11 total. Annex D4 is out
   of scope for this schema version (see VERIFICATION.md Known Gaps)." —
   both factually wrong (D4 is modelled in this very document as of v1.4.0)
   and citing the wrong fields (the "Kopā" row's own columns 10/11 are not
   directly named `deductibleExpenseTotal...`; the actual grand-total row
   fields are `deductibleExpenseGrandTotalDonationsCappedAtLimit` (column
   10) and `deductibleExpenseGrandTotalEducationMedicalCappedAtLimit`
   (column 11), per the regulation's own para. 36 formula and exactly as
   v1.4.0's own `deductibleExpenseGrandTotalEducationMedicalCappedAtLimit`
   field description already stated the connection should be). Now: cites
   both fields by name.
2. **`attachedAnnexNumbers`** (Form D filing section). Before: listed "D1,
   D1¹, D2, and D2¹" as the in-scope annexes, omitting D4. Now: lists "D1,
   D1¹, D2, D2¹, and D4", and the worked example is extended to "D1, D1¹,
   D2, D2¹, D4".

No `crossFieldValidation` rule references either field, so this change
cannot affect conformance-checker behaviour — confirmed by re-running the
full v1.4.0 fixture set unchanged (see Conformance below).

## Scope boundaries

Unchanged from v1.4.0: Annexes D3, D3¹, DK, the DK pielikums, and GD remain
open backlog, for the reasons already stated in v1.4.0's own VERIFICATION.md.

## Conformance

The 26 fixtures already committed at v1.4.0 (10 valid + 16 mutation controls)
were carried forward unchanged into
`conformance/lv/vid/annual-income-tax-declaration-form-d/1.4.1/`, since
neither changed field is referenced by any fixture or by any
`crossFieldValidation` rule — every fixture remains valid/invalid for the
same reasons under v1.4.1. No new fixtures were needed for a description-only
change.

An ephemeral, from-scratch Python conformance checker (deriving
required/`requiredWhen`/`validation`/`crossFieldValidation` rules directly
from this schema's own `fields[]`/`crossFieldValidation[]`, discarded after
use, not committed) re-ran the full v1.4.0 fixture set against v1.4.1's
`schema.json`: all 10 valid fixtures pass with zero errors, and all 16
mutation fixtures fail with exactly the expected violation — identical
results to v1.4.0, confirming the fix is behaviourally inert.

`node tools/validate.mjs` and `node tools/validate-ajv.mjs` both pass on
`schema.json` itself, individually and as part of the full registry run
(577/577 documents, after regenerating
`tools/govschema-client/registry-index.json`).
