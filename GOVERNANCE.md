# Governance

GovSchema is stewarded by the **GovSchema foundation**, an independent
open-source standards body. This document describes how decisions are made. It is
modeled on the working style of bodies like the IETF, W3C, and ISO: open,
documented, and change-controlled — adapted to an early-stage project.

## Independence and posture

- GovSchema is **independent and open-source**. It is **not** a government
  entity and is **not** endorsed by, affiliated with, or certified by any
  government.
- A GovSchema document **describes** a public government process. It does not
  speak for any authority. Schemas must not claim official status.
- GovSchema does **not** fill out forms or submit data on anyone's behalf. It
  publishes the standard layer that such agents are built on.

## Decision types

- **Two-way-door (reversible)** — most build and editorial work: adding or
  re-verifying schemas, tooling, docs, additive spec changes within a `spec/vN`
  line. Handled by maintainers via normal pull-request review.
- **One-way-door (hard to reverse)** — stabilizing a spec line (`v0.x` → `v1`),
  any breaking spec MAJOR, governance changes, licensing changes, and changes to
  what "verified" means. These are proposed in writing and require maintainer
  (CEO) sign-off before merge.

When in doubt about which category a change falls in, treat it as one-way-door
and ask.

## Roles

- **Maintainers** — review and merge contributions, cut spec and schema
  versions, and own one-way-door decisions. During founding, the foundation's
  engineering lead and the CEO are the maintainers.
- **Contributors** — anyone proposing schemas, corrections, tooling, or spec
  changes via pull request. See [CONTRIBUTING.md](./CONTRIBUTING.md).

## Change control

- The specification and all schemas are versioned; see [VERSIONING.md](./VERSIONING.md).
- Published version directories are immutable. Corrections ship as new versions.
- Material changes to verification practices are governance-relevant and follow
  the one-way-door path.

## Evolution

This is a founding-stage governance model. As the contributor base grows we
expect to formalize roles, a public proposal process, and a change-review group.
Amendments to this document are themselves one-way-door decisions.
