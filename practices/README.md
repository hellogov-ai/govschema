# Verification practices

A **verification practice** is a documented method for confirming that a
published schema matches its live government source. Every schema's
`verification.method` member names the practice that was applied, by identifier.

A schema is only as trustworthy as its verification. Practices make that
trustworthiness explicit and auditable: a consumer can read exactly how a schema
was checked and how recently.

## Practice identifiers

Identifiers are stable, versioned slugs: `<method>-v<N>` (e.g.
`manual-source-review-v1`). When a practice's procedure changes materially, a
new version slug is minted; existing schemas keep referencing the version that
was actually applied.

## Defined practices

| Identifier               | Summary                                              |
| ------------------------ | ---------------------------------------------------- |
| `manual-source-review-v1`| A human compares each field against the live source. |

See [`manual-source-review-v1.md`](./manual-source-review-v1.md).

## Adding a practice

Propose new or revised practices via pull request. Material changes to how
schemas are verified are governance-relevant — see [GOVERNANCE.md](../GOVERNANCE.md).
