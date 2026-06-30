# GSP-0005: Edition / tax-year axis for time-versioned forms

- **Status:** **Accepted & folded** — **Option C** signed off by maintainer via
  the GOV-46 decision interaction (2026-06-30) and folded into `spec/v0.2` under
  GOV-48 (meta-schema `$defs/edition`, SPEC §5.2/§5.7/§10 rule 1+6, VERSIONING.md
  §4, `tools/`). Normative as of `govschemaVersion` `0.2.0`. The concrete `edition`
  shape (`{scheme, label}`, closed scheme enum) and `<edition>` path grammar are
  the consumer-pinned, one-way-door surface — finalized in v0.2 review.
- **Author:** Founding Engineer
- **Date:** 2026-06-30
- **Issue:** GOV-46 (parent [GOV-36](../../discovery/) schema discovery)
- **Affects:** `id`/registry-path conventions (§5.2, §10 rule 1), the `process`
  member (§5.6), VERSIONING.md semantics — a **one-way door** (consumers will
  hard-code the path and identifier shape for annual forms)

> **Decision (2026-06-30).** Resolved by maintainer sign-off via the GOV-46
> decision interaction: **Option C accepted** — a dedicated edition axis
> (year-agnostic `id` + an OPTIONAL `edition` metadata member + an OPTIONAL
> `<edition>` registry-path layer `registry/<id>/<edition>/<version>/schema.json`),
> targeted at `spec/v0.2`. Metadata-only (Option B) was rejected as incomplete
> and year-in-`id` (Option A) as lineage-fragmenting, per §2–§4 below. This
> proposal is the normative record of the *direction*; it becomes normative in
> effect when folded into `spec/v0.2` (meta-schema + SPEC §5.2/§5.6/§10 +
> VERSIONING.md). Implementation tracked separately; until it ships, annual
> forms stay parked in the US/GB authoring batches.

## 1. Summary

Several catalogued processes are **time-versioned**: a fresh edition ships every
tax or award year, keyed to that year, with fields and rules that differ from the
prior year's edition — `us/irs/individual-income-tax-return-1040`,
`us/irs/extension-to-file-4868`, `us/ed/federal-student-aid-fafsa`,
`gb/hmrc/self-assessment-tax-return-sa100`, and arguably `gb/dvla/vehicle-tax`.

The v0.1 spec has **no axis for the form year.** Two members are near it and
neither fits:

- `version` is the schema's SemVer — a contract *about the schema* answering
  "if my agent was built against version X, can it consume version Y?"
  (VERSIONING.md §1). It is **not** a temporal axis.
- `id` is the registry path naming "the process across all of its versions"
  (§5.2). It carries no year.

A convention must be fixed **before the first annual form is authored**, because
the identifier and path shape are one-way doors. Annual forms are parked in the
US/GB authoring batches until this is resolved.

## 2. The core problem: two axes, one slot

A time-versioned form actually moves along **two independent axes** that v0.1
collapses into the single `version` slot:

1. **Edition (temporal).** Which form year — the 2024 1040 vs. the 2025 1040.
   Editions **coexist**: in early 2026 an agent may file a 2025 return *and* a
   late 2024 return. Neither edition deprecates the other on a contract basis;
   they are siblings, not successors.
2. **Schema contract (SemVer).** For *one* edition, the quality of our
   machine-readable rendering: `2025` edition `1.0.0` → `1.0.1` (fixed a label)
   → `1.1.0` (added an optional field we had missed). This is the existing
   `version` axis and its meaning must not change.

The defect is that editions are not successive versions of each other. Modelling
"new tax year" as a `version` bump abuses SemVer: the 2025 edition does not
"break consumers of" the 2024 edition — they are different forms a consumer
selects between by **year**, not by compatibility.

**Consequence that rules out metadata-only.** If `id` stays year-agnostic and
the year lives only in a metadata member, two editions collide on the registry
path: `registry/<id>/<version>/schema.json` gives both 2024-ed `1.0.0` and
2025-ed `1.0.0` the same directory. The only escape is to partition the SemVer
range by year (2024 → `1.x`, 2025 → `2.x`), which is exactly the SemVer abuse
above. **Therefore metadata alone cannot let editions coexist** — the year must
also be load-bearing in *addressing*. The real choice is where addressing puts
it: in `id` (Option A) or in a dedicated edition axis (Option C). Metadata
(Option B) is a necessary *label* on top of whichever is chosen, not a complete
answer by itself.

## 3. Options

### Option A — fold the year into `id`

`id` becomes year-specific, e.g. `us/irs/individual-income-tax-return-1040/2025`
(or a `-2025` slug suffix). Path: `registry/us/irs/individual-income-tax-return-1040/2025/1.0.0/schema.json`.

- **Pro:** no path-grammar change — `2025` already matches the `[a-z0-9-]+`
  segment in the `id` pattern; each edition is immutably addressable; simple.
- **Con:** **fragments process lineage.** §5.2 promises `id` "names the process
  across all of its versions"; under A there is no first-class entity for "the
  1040 across years" — a consumer reconstructs it by string-stripping a trailing
  numeric segment, which is ambiguous (is `2025` an edition or a sub-process?).
  Discovery of "the current FAFSA" becomes "enumerate `id` prefixes, parse, take
  the max." The year is silently overloaded into the identifier namespace.

### Option B — year as metadata only (the issue's option 2)

Add an optional `process.edition` / `taxYear` member; keep `id` clean.

- **Pro:** clean `id`; additive, backward-compatible.
- **Con:** **insufficient on its own** (see §2): it labels an edition but does
  not let two editions coexist in the registry without abusing SemVer. Viable
  only as a complement to A or C, never as the addressing mechanism.

### Option C — edition as a first-class axis (recommended)

Make the edition a typed axis in **both** identity and metadata:

1. `id` stays **year-agnostic**: `us/irs/individual-income-tax-return-1040`.
2. Add an OPTIONAL `edition` metadata member (e.g.
   `"edition": { "scheme": "us-tax-year", "label": "2025" }`) — so consumers
   read the year without parsing the path.
3. Add an OPTIONAL `<edition>` **path layer** between `id` and `version` for
   edition-bearing processes:

   ```
   registry/<id>/<edition>/<version>/schema.json
   registry/us/irs/individual-income-tax-return-1040/2025/1.0.0/schema.json
   ```

   Non-time-versioned schemas are unchanged: `registry/<id>/<version>/schema.json`.

- **Pro:** keeps all three axes clean and orthogonal — `id` still names the
  process across time, `edition` selects the year, `version` keeps its exact
  SemVer contract meaning per edition. Every edition is immutably, predictably
  addressable; "current edition" = max `<edition>` dir; lineage is a first-class
  entity (the year-agnostic `id`); the `edition` label is machine-readable
  without path parsing, mirroring the id↔path reconstructability discipline of
  GSP-0001/0002.
- **Con:** the **largest** change — it amends the registry-path grammar (§5.2,
  §10 rule 1) and the "`id` equals path minus version" invariant to "`id` equals
  path minus *edition and* version." Additive for existing schemas (their paths
  are untouched), so it fits a pre-stable **MINOR** (`v0.2`), but it touches a
  core invariant and so is squarely a one-way-door identity decision.

### Option D — defer (the issue's option 3)

Author only non-time-versioned forms now; revisit when an annual form is
scheduled.

- **Con:** the annual forms (1040, FAFSA, SA100, 4868) are among the
  highest-value processes in the catalog; deferring indefinitely leaves the
  catalog's core gaps unfilled and only postpones an inevitable one-way door.

## 4. Recommendation

Adopt **Option C**, scoped to **`spec/v0.2`**, with **Option B's metadata member
folded in as part of C** (the `edition` label). It is the only option that keeps
the temporal and contract axes cleanly separated — the actual root cause — while
preserving every v0.1 invariant for non-time-versioned schemas and giving annual
editions stable, immutable, discoverable addresses from the first one authored.

If the CEO prefers to minimise spec surface immediately, the fallback ranking is
**A** (accept lineage fragmentation, no grammar change) over **D** (defer). **B
alone is not viable** and should not be selected without A or C beneath it.

Because v0.2 is pre-stable, C ships additively and is reversible up to the point
external consumers pin annual-form paths — which is precisely why the convention
must be fixed *now*, before the first annual schema, and why it is sign-off
gated rather than editorial.

## 5. Decision requested

> **Resolved 2026-06-30 — Option C accepted** (see the decision block at the top
> of this proposal). The text below records the question that was put.

CEO sign-off on the edition axis for time-versioned forms:

- **(C, recommended — ACCEPTED)** dedicated edition axis (`id` year-agnostic +
  `edition` metadata + optional `<edition>` path layer), targeted at `spec/v0.2`; or
- **(A)** fold the year into `id`; or
- **(D)** defer and keep annual forms parked.

On acceptance, the Founding Engineer folds the chosen convention into
`spec/v0.2` (meta-schema + SPEC.md §5.2/§5.6/§10 + VERSIONING.md note) and
unblocks the parked annual forms in the US/GB authoring batches. This proposal
is non-normative until then.
