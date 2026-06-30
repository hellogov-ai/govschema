# Verification record — `us/uscis/change-of-address-ar11` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and states
the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-06-30`

The document was **derived from and cross-checked against** the official source
below, but the full field-by-field comparison the practice requires
(`manual-source-review-v1` → Procedure step 2) has **not** yet been completed and
recorded against the live AR-11 online tool and form. It therefore remains
`draft`, not `verified`.

## Source examined

- **Document `(id, version)`:** `us/uscis/change-of-address-ar11` / `1.0.0`
- **Spec version:** GovSchema `0.1.0`
- **Authority:** U.S. Citizenship and Immigration Services (USCIS)
- **Primary source URL:** <https://www.uscis.gov/ar-11>
- **Official form id:** `AR-11` (Alien's Change of Address Card)
- **Retrieved / reviewed:** 2026-06-30
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| Most non-citizens must report a change of address **within 10 days** of moving | `dateOfMove` (rule recorded in its description) |
| Identity block: **name, other names used, date of birth, country of birth, country of citizenship, A-Number, USCIS Online Account Number** | `lastName`…`uscisOnlineAccountNumber` |
| The **previous (old) address** and the **new address** are both collected | `oldAddress*`, `newAddress*` |
| The **date of the move** is recorded | `dateOfMove` |
| Registrants with **pending applications/petitions** report the form types and receipt numbers so those cases are also updated | `hasPendingCase`, `pendingCaseReceiptNumbers` |

## Temporal and conditional rules (not encoded structurally in v0.1)

- The **10-day filing deadline** is a temporal rule measured from `dateOfMove` to
  the filing date. v0.1 has no cross-field or temporal constraint mechanism, so it
  is recorded in the `dateOfMove` description; consumers must check it themselves.
- `pendingCaseReceiptNumbers` is **required only when `hasPendingCase` is true** —
  a conditional-required rule recorded in the field description, not encoded
  (tracked in [GSP-0004](../../../../../spec/proposals/0004-conditional-flow.md)).
- The previous address may be **foreign**, so its state/ZIP are optional while the
  new (U.S.) address requires them.

## What is NOT yet independently verified

- The exact **field order and labels** of the live AR-11 online tool were not
  captured screen-by-screen; `sourceRef` annotations are indicative, derived from
  the public AR-11 page and the form's known structure.
- The **A-Number** pattern (`A?[0-9]{7,9}`) and the **receipt-number** convention
  (three letters + 10 digits) are reasonable encodings consistent with USCIS
  formats, not citations of a published USCIS validation rule.
- Penalties for non-compliance and the distinction between the online tool and the
  paper AR-11 are described on the live source and intentionally not encoded.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies `manual-source-review-v1`
(Procedure step 2 field-by-field against the live AR-11 tool, step 3 flow),
confirms the source is authoritative, resolves any discrepancy by shipping a **new
schema version** (immutability — VERSIONING §3, practice Procedure step 5), and
records the outcome here plus sets `status: verified` with a current
`verification.lastVerifiedAt`/`nextReviewBy`.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2026-12-30** (6 months):
USCIS has periodically expanded the AR-11 field set. Re-check the source on or
before that date and on any `source.url` change.
