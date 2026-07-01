# Versioning conventions

GovSchema versions two things independently:

1. **The specification** (`spec/vN`) — the format every schema conforms to.
2. **Each schema** (`version` member + version directory) — one government
   process's definition.

Both use [Semantic Versioning 2.0.0](https://semver.org/). A schema's version is
independent of the spec version and of every other schema's version.

## 1. Schema versioning

A schema's version answers: *"if my agent was built against version X, can it
safely consume version Y?"* The compatibility contract is from the perspective
of an **agent consuming the schema**.

Given `MAJOR.MINOR.PATCH`:

- **MAJOR** — a breaking change for consumers. Bump when you:
  - remove a field, or rename its `name`;
  - make an optional field required;
  - tighten validation so previously valid input becomes invalid
    (e.g. shorter `maxLength`, narrower `enum`, stricter `pattern`);
  - change a field's `type`;
  - restructure `steps` such that an existing flow breaks.

- **MINOR** — a backward-compatible addition. Bump when you:
  - add an optional field;
  - add a new step that doesn't break existing flows;
  - loosen validation so more input is accepted;
  - add `enum` members.

- **PATCH** — no change to the data contract. Bump when you:
  - re-verify against the live source with no field changes (refresh
    `verification.lastVerifiedAt`);
  - fix `label`, `description`, `sourceRef`, or other annotations;
  - correct typos or metadata.

> Rule of thumb: if an agent built against the old version could send input the
> new version would **reject**, it's MAJOR. If the new version accepts everything
> the old one did **plus** more, it's MINOR. If the accepted input set is
> identical, it's PATCH.

### Pre-1.0.0 schemas

`0.y.z` schemas are still stabilizing; any release may change the contract.
Reaching `1.0.0` signals the maintainers consider the schema stable enough for
agents to pin.

### Status interaction

A re-verification that finds the source unchanged is a PATCH that refreshes
`verification.lastVerifiedAt` (and `status` to `verified`). A source change that
alters fields is a MINOR or MAJOR per the rules above; the prior version's
directory stays in place and its `status` may move to `deprecated`.

## 2. Specification versioning

The spec lives under `spec/v<MAJOR>` (e.g. `spec/v0.1`, later `spec/v1`).

- **MAJOR** (`v1` → `v2`) — a change that can invalidate previously conforming
  documents (removing/renaming a member, tightening the meta-schema). Ships as a
  new `spec/vN` directory; existing schemas keep targeting the version they were
  written against via their `govschemaVersion` member.
- **MINOR / PATCH** — additive or editorial changes within a `spec/vN`
  directory, tracked by the `govschemaVersion` semver inside it.

`v0.x` is explicitly pre-stable: the format may change between minor versions
while the standard is being founded. The first stable line is `v1`, which is a
one-way-door governance decision reserved for the CEO/maintainers (see
[GOVERNANCE.md](./GOVERNANCE.md)).

> **v0.2 (additive MINOR).** v0.2 adds an OPTIONAL `edition` axis for
> time-versioned forms (§4) without removing or tightening anything; every
> conforming v0.1 document is also a conforming v0.2 document. It ships as a
> sibling `spec/v0.2` directory because v0.x keeps one directory per minor while
> the standard is being founded.

> **v0.3 (additive MINOR).** v0.3 folds in five already CEO-accepted proposals —
> GSP-0006 (`classification`), GSP-0007 (file `maxBytes`/`mediaTypes`), GSP-0012
> (`maturity`), GSP-0013 (the shared `Condition` grammar, `visibleWhen`/
> `requiredWhen`, `crossFieldValidation`, `exclusivityGroups`,
> `steps[].transitions`/`exitReason`), and GSP-0014 (`documents[]`,
> `fieldRole`) — all OPTIONAL, additive members; every conforming v0.2 document
> is also a conforming v0.3 document. Ships as a sibling `spec/v0.3` directory,
> same pattern as v0.2.

## 3. Immutability

Once published, a version directory is never edited or deleted. Corrections ship
as a new version. This guarantees reproducibility: a pinned `(id, version)`
always resolves to the same bytes.

## 4. Edition axis (time-versioned forms)

*Introduced in spec v0.2 ([GSP-0005]); applies to schemas whose `govschemaVersion`
is `0.2.0` or later.*

Some government forms ship a **fresh edition every tax or award year** — the US
1040, Form 4868, FAFSA, the UK SA100. v0.2 gives these a third axis, `edition`
(SPEC §5.7), which is **orthogonal to the SemVer `version`** above:

- A **new tax/award year is a new edition, NOT a version bump.** The 2025 1040 and
  the 2024 1040 are *siblings*, not successive versions: they are different forms a
  consumer selects between by **year**, not by compatibility. Modelling a new year
  as a `version` MAJOR/MINOR would abuse SemVer: the 2025 edition does not "break
  consumers of" the 2024 edition.
- **Editions coexist.** In early 2026 an agent may file a 2025 return and a late
  2024 return; neither edition deprecates the other. Each edition lives at its own
  path, `registry/<id>/<edition>/<version>/schema.json`, and is immutable.
- **`version` keeps its exact meaning, per edition.** Within one edition, the
  MAJOR/MINOR/PATCH rules in §1 apply unchanged: the 2025 edition may go
  `1.0.0` → `1.0.1` (fixed a label) → `1.1.0` (added an optional field we missed).
  The 2024 edition versions independently.
- **`id` stays year-agnostic.** It names the process across *all* editions and
  versions; the year lives only in the `edition` member and the `<edition>` path
  segment, never folded into `id`.

"Current edition" is resolved the same way as "latest version": list the
`<edition>` directories under an `id` and take the maximum per the edition scheme.
Non-time-versioned schemas carry no `edition` and are entirely unaffected.

[GSP-0005]: ./spec/proposals/0005-edition-axis-time-versioned-forms.md
