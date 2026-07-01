# Verification practices

A **verification practice** is a documented method for confirming that a
published schema — or a schema's `mapping.json` companion (GSP-0011) — matches
its live government source. Every `verification.method` member (on a
`schema.json` or a `mapping.json`) names the practice that was applied, by
identifier.

A schema is only as trustworthy as its verification. Practices make that
trustworthiness explicit and auditable: a consumer can read exactly how a
schema was checked and how recently.

## Practice identifiers

Identifiers are stable, versioned slugs: `<method>-v<N>` (e.g.
`manual-source-review-v1`). When a practice's procedure changes materially, a
new version slug is minted; existing schemas keep referencing the version that
was actually applied.

## Defined practices

| Identifier                | Summary                                                              |
| -------------------------- | --------------------------------------------------------------------- |
| `manual-source-review-v1` | A human compares each schema field against the live source.           |
| `selector-probe-v1`       | An automated headless-browser probe confirms `mapping.json` locators still resolve. |
| `maturity-self-assessment-v1` (proposed, GSP-0012) | A producer self-declares `maturity.criteria` against the document's own shape. |

See [`manual-source-review-v1.md`](./manual-source-review-v1.md),
[`selector-probe-v1.md`](./selector-probe-v1.md), and
[`maturity-self-assessment-v1.md`](./maturity-self-assessment-v1.md). These
check different things and are never conflated: the first verifies a
schema's legal-content fidelity against the live source; the second verifies
a mapping's selector freshness; the third verifies that a document's
execution-readiness *claim* matches its own shape, not the live source. See
GSP-0011 and GSP-0012.

## Adding a practice

Propose new or revised practices via pull request. Material changes to how
schemas are verified are governance-relevant — see [GOVERNANCE.md](../GOVERNANCE.md).
