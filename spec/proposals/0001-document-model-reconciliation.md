# GSP-0001: Document-model reconciliation

- **Status:** Proposed — awaiting Founding Engineer decision (routes to CEO if
  it touches identity/versioning, per [GOVERNANCE.md](../../GOVERNANCE.md))
- **Author:** Standards Engineer
- **Date:** 2026-06-30
- **Issue:** GOV-14
- **Affects:** `spec/v0.1/SPEC.md`, `spec/v0.1/govschema.schema.json`,
  `tools/validate.mjs`, every published schema, every consumer

## 1. Summary

The repository currently describes **two incompatible GovSchema document
models**. They disagree on member names, the identifier format, the file name a
document is stored under, the field model, and the flow model. Two reference
schemas and CI implement one model; the headline specification prose and the
DS-82 reference schema implement the other. The result is that the standard
**contradicts itself** and one published document escapes validation entirely.

This must be resolved before any schema is published externally, because the
points of disagreement (identifier format, member names, file naming) are
**one-way doors**: consumers will hard-code them. This proposal inventories the
divergence, lays out the two ways to resolve it, and recommends one. It does not
make the decision — that is reserved for the Founding Engineer.

## 2. The two models

**Model A — "conservative core" (currently CI-enforced).**
Defined by `spec/v0.1/govschema.schema.json` (the meta-schema), `tools/validate.mjs`,
`spec/v0.1/README.md`, `VERSIONING.md`, `registry/README.md`, and the two shipped
reference schemas (`gb/hmpo/passport-renewal-adult`, `us/ca/dmv/vehicle-registration-renewal`).
`spec/v0.1/README.md` explicitly declares the meta-schema normative: *"where prose
and meta-schema disagree, the meta-schema governs."*

**Model B — "rich model" (prose + DS-82).**
Defined by `spec/v0.1/SPEC.md` (editor: Founding Engineer) and the
`us/dos/passport-renewal-ds82` reference schema published under GOV-5. It is a
deliberately more expressive design.

### 2.1 Divergence inventory

| Concern | Model A (meta-schema + 2 schemas + CI) | Model B (SPEC.md + DS-82) |
| --- | --- | --- |
| Spec-version member | `govschemaVersion` (semver, e.g. `0.1.0`) | `govschema` (e.g. `"0.1"`) |
| Identifier (`id`) | path form `us/dos/passport-renewal-ds82` | colon GSID `govschema:us:dos:passport-renewal-ds82` |
| `jurisdiction.country` | ISO 3166-1 **uppercase** (`US`) + required `level` | **lowercase** (`us`), no `level` |
| `status` vocabulary | `draft` / `verified` / `deprecated` | `draft` / `published` / `deprecated` |
| `authority` | `name` (req), `abbreviation`, `url` | `slug` (req), `name`, `url` |
| Field key member | `name`, pattern `^[a-z][a-zA-Z0-9_]*$` | `id`, pattern `^[a-z][a-z0-9_]*$` |
| Field help member | `description` | `helpText` (+ `description`) |
| Field constraints | `validation` (pattern/min/max length/min/max/enum) | `constraints` (+ `format`, `maxBytes`, `mediaTypes`) |
| Enum values | `validation.enum` (values only) | `options: [{value, label}]` (labelled) |
| Nested fields | not supported (flat fields only) | `object`/`array` with nested `fields`/`items` |
| PII marking | none | `sensitive: true` |
| Flow | `steps[]`: `id`/`title`/`fields`/`next` (linear) | `flow`: `start` + `steps[].transitions[].when` (conditional) |
| Verification | embedded `{method, lastVerifiedAt, ...}` | `{status, method, lastVerifiedAt, verifiedAgainst}` + sidecar `VERIFICATION.md` |
| Extensions | none | `extensions` namespaced object |
| Document file name | `schema.json` | `document.govschema.json` |
| Meta-schema file referenced | `govschema.schema.json` (exists) | `govschema-document.schema.json` (**does not exist**) |

### 2.2 Concrete defects this causes

1. **The standard is internally contradictory.** A document that conforms to
   `SPEC.md` (e.g. anything using §7 conditional flow or §6 `options`) is
   *rejected* by the normative meta-schema, and vice-versa.
2. **A published document escapes CI.** `registry/us/dos/passport-renewal-ds82/1.0.0/document.govschema.json`
   is named off-convention, so `findSchemas()` never selected it and CI never
   validated it. (This proposal ships a `tools/validate.mjs` hardening that now
   flags any non-`schema.json` registry document as a hard error — independent of
   which model wins.)
3. **Dangling references.** `SPEC.md` §2 cites a meta-schema file that does not
   exist; the DS-82 `VERIFICATION.md` cites `practices/VERIFICATION-PRACTICE.md`,
   which does not exist (the practice file is `practices/manual-source-review-v1.md`).

## 3. Options

### Option A — adopt the conservative core as canonical v0.1

Keep Model A. Reconcile the two outliers down to it:

- Rewrite `SPEC.md` so its prose matches `govschema.schema.json` exactly.
- Re-author DS-82 as `schema.json` against Model A (flat fields, linear `steps`,
  embedded `verification`); fold the eligibility gate and option labels into
  field text; record the conditional routing in the verification note.
- Move Model B's expressive constructs (conditional flow, labelled enums, nested
  fields, file constraints, `sensitive`, `extensions`, colon GSID) into tracked
  **v0.2 proposals**.

*Pros:* smallest stable core; matches the already-shipped reference schemas, CI,
and the three docs that already describe Model A; lowest churn; nothing is lost
permanently (richer features become scheduled v0.2 work). *Cons:* DS-82 loses
fidelity in v0.1 — conditional branching and nested address become flat fields +
prose; expressiveness real forms need waits for v0.2.

### Option B — adopt the rich model as canonical v0.1

Keep Model B. Upgrade Model A up to it:

- Replace `govschema.schema.json` with a meta-schema expressing SPEC.md's field,
  flow, and verification models; rewrite `tools/validate.mjs` accordingly.
- Re-author the two existing reference schemas and the three Model-A docs
  (`spec/v0.1/README.md`, `registry/README.md`, `VERSIONING.md`) to Model B,
  including the colon GSID and `document.govschema.json` file name.

*Pros:* v0.1 can express conditional flow, labelled enums, nested fields, and PII
marking that real government forms need (DS-82's eligibility gate is the
motivating example); honours the fuller design already authored in SPEC.md.
*Cons:* largest churn; a bigger normative surface to stabilise while the standard
is still being founded; re-opens identity/versioning choices the other three docs
already settled.

## 4. Recommendation

**Adopt Option A for v0.1, with one carry-over from Model B.**

Reasoning, by engineering lens:

- **Spec precision over cleverness / least surprise.** Three of the four
  governance documents (`spec/v0.1/README.md`, `registry/README.md`,
  `VERSIONING.md`), the meta-schema, the validator, and two of three reference
  schemas already implement Model A, and the README already declares the
  meta-schema normative. The cheapest path to *one* coherent interpretation is to
  bring the two outliers into line with the model the rest of the repo already
  asserts.
- **Backward compatibility / founding a standard.** A v0.1 standard should ship
  the smallest core it can commit to. Conditional flow, nested fields, and a
  richer constraint vocabulary are valuable but are exactly the surface most
  likely to change — SPEC.md §12 already lists several as "open questions for
  v0.2." Shipping them as proposals, not as v0.1 normative text, keeps the first
  stable line small.
- **Source-of-truth fidelity (the carry-over).** The one place Option A loses
  real fidelity is conditional flow: an eligibility gate that routes an
  applicant away from a by-mail form is not cosmetic. I recommend prioritising a
  v0.2 proposal for **conditional transitions** (Model B §7) and **labelled
  enums** (§6.3.1) as the first additive (`spec` MINOR) extensions, so the gap is
  short-lived.

**Identifier format (one-way door — flagging explicitly).** Recommend the **path
form** `us/dos/passport-renewal-ds82`. It is already shipped in two schemas, the
registry layout, `VERSIONING.md`, and `README`; the colon GSID exists only in
SPEC.md and DS-82. If the foundation prefers a URN-style identifier
(`govschema:us:dos:...`) for external citation, that is a deliberate CEO-level
call and should be decided now, before any external publication, not later.

## 5. Decision requested

From the Founding Engineer (routing identity/versioning aspects to the CEO):

1. **Option A or Option B?** (Recommendation: A.)
2. **Identifier format:** path `us/dos/...` or colon `govschema:us:dos:...`?
   (Recommendation: path.)
3. If A: confirm DS-82 may be **re-authored in place** at `1.0.0`. It is
   pre-publication and has never validly conformed, so this is correcting a
   never-valid artifact, not editing a published version (`VERSIONING.md` §3).

On a decision, the Standards Engineer will execute the reconciliation (rewrite
SPEC.md, re-author DS-82, fix dangling references, open the recommended v0.2
proposals) under GOV-14 or a child issue.

## 6. Already shipped with this proposal (no-regret, independent of the decision)

- `tools/validate.mjs` now fails CI on any `*.json` under `registry/` not named
  `schema.json`, so a document can no longer hide from validation under a
  non-conforming file name (defect §2.2#2). This surfaces the DS-82 file today;
  it will go green once the document is re-authored under the chosen model.
