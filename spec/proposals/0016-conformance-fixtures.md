# GSP-0016: Conformance fixtures (non-submitting)

- **Status:** Accepted — two-way-door per [GOVERNANCE.md](../../GOVERNANCE.md).
  A new repo directory and its own fixture-format scaffold, with no change to
  `spec/vN/govschema.schema.json` or to what "verified" means, is ordinary
  build work decided by normal pull-request review (the Review gate), not CEO
  sign-off. This proposal and the `conformance/` scaffold it describes are
  authored and landed together, in the same PR.
- **Author:** Standards Engineer
- **Date:** 2026-07-01
- **Issue:** GOV-317, drafted per RFC 0003 §7 (GOV-302)
- **Affects:** a new top-level `conformance/` directory, `conformance/README.md`,
  a new `conformance/browser-flow.schema.json` meta-schema. Does not touch
  `spec/vN/govschema.schema.json`, `registry/`, or any published schema.
  **Depends on** GSP-0013 (the shared `Condition` type — a
  `invalid-conditional-violation.json` payload fixture only makes sense once
  `requiredWhen`/`crossFieldValidation` exist) and GSP-0014 (`documents[]` —
  document-requiredness fixtures need the array to exist), both already
  accepted into `spec/v0.3`. GSP-0011 (`mapping.json`) is already accepted and
  needed no new blocker: `browser-flow.json` fixtures reference its locators,
  but a `conformance/` directory can exist and hold `payloads/`/`profiles/`/
  `expected/` fixtures for a schema before that schema has a `mapping.json`.
- **One-way-door:** No. Per GOVERNANCE.md's two-way-door/one-way-door split,
  this is "adding... tooling" — reversible, ordinary build work.

## Problem

Nothing today lets an implementer check "does my agent's field-collection
logic behave the way the standard expects" without hand-rolling test cases per
schema. RFC 0003 (GOV-302) asks for a fixture suite that proves out agent
behavior **without GovSchema becoming the automation layer** — fixtures that
stop before submission, by construction, not by convention or reviewer
diligence.

Two failure modes this needs to rule out structurally, not just by prose:

1. A fixture author accidentally (or a future contributor deliberately)
   authors a "submit" step in a flow fixture. GovSchema's non-submission
   boundary (`GOVERNANCE.md`, `AGENTS.md` §5) has to hold even inside its own
   test fixtures, or the boundary is not actually structural.
2. Conformance fixtures drift from what the standard's newest constructs
   (`requiredWhen`, `documents[]`, `to: null` exits) actually require, because
   nothing forces a fixture set to exercise them.

## Design

### 1. Directory structure

```
conformance/
  README.md
  browser-flow.schema.json
  <id>/<version>/
    payloads/
      valid-complete.json
      invalid-missing-required.json
      invalid-conditional-violation.json
    profiles/
      complete-applicant.json
      partial-applicant.json
    expected/
      missing-fields-partial-applicant.json
    browser-flow.json
```

`conformance/` is a new top-level directory, **sibling to `registry/`, not
inside it** — it is data *about* a schema version (test fixtures), not the
schema version itself, so it does not share `registry/`'s immutable-once-
published discipline or its versioning axis. `<id>` and `<version>` are
exactly the ones already governing the corresponding `registry/<id>/<version>/
schema.json` (RFC 0003 §7). Time-versioned forms (GSP-0005's edition axis) use
`conformance/<id>/<edition>/<version>/`, mirroring `mapping.json`'s own
edition-aware path (GSP-0011) — one path-segmenting convention, reused a
third time (lens: *least surprise*).

This GSP scaffolds the top-level `conformance/README.md` and
`browser-flow.schema.json` only. It does not author a first
`conformance/<id>/<version>/` fixture set for any specific reference schema —
that is real content work, sequenced (per RFC 0003 §8) against the EIN/SS-4
flagship once it reaches the Agent-Ready maturity tier (GSP-0012), and tracked
as its own follow-up issue rather than bundled here.

### 2. `payloads/` — validator fixtures

Sample JSON documents an agent's local validator should accept or reject,
keyed to specific rules:

- `valid-complete.json` — every required field/document present and
  internally consistent; a conforming validator accepts it.
- `invalid-missing-required.json` — a plain static-`required` field or
  `documents[]` entry omitted; a conforming validator rejects it.
- `invalid-conditional-violation.json` — violates a `requiredWhen`
  (GSP-0013 §3.2, or a `documents[].requiredWhen`, GSP-0014) or a
  `crossFieldValidation` rule (GSP-0013 §3.3). Deliberately kept **separate**
  from the plain missing-required case: a validator that only checks static
  `required` and ignores conditional rules would incorrectly accept this
  fixture, which is exactly the gap this fixture exists to catch. A GSP-0013-
  reliant fixture cannot be authored for a schema that predates conditional
  logic, which is why this GSP depends on GSP-0013 (and, for document
  conditions, GSP-0014).

Each fixture is a plain document instance (the same shape a real applicant's
answers would take) — no new schema needed to describe `payloads/` itself.

### 3. `profiles/` + `expected/` — the "ask only for what's missing" check

- `profiles/complete-applicant.json` / `partial-applicant.json` — fake user
  profiles: a flat map of field/document `id` to a supplied value (complete)
  or a subset of it (partial, deliberately leaving gaps).
- `expected/missing-fields-partial-applicant.json` — the exact set of
  `fields[].name`/`documents[].id` values a conforming agent MUST still
  prompt for, given `partial-applicant.json` and the schema's `visibleWhen`/
  `requiredWhen` rules. This is the direct, checkable expression of "an agent
  collects only missing fields, and only the ones currently applicable" (RFC
  0003 §7; the flagship's central behavior, §8) — a fixed-point fixture a
  conformance runner (§5 below) diffs its own output against, not something
  reviewed by eye.

Both are plain JSON maps, not new schema-governed artifacts; no meta-schema
is defined for them in this GSP, matching the "keep it a scaffold, not a
premature format" scope of this proposal.

### 4. `browser-flow.json` and the stop-before-submit sentinel

An ordered list of steps referencing `mapping.json` locators (GSP-0011),
terminating in a **structurally mandatory** sentinel:

```json
{
  "$schema": "https://govschema.org/conformance/browser-flow.schema.json",
  "schema": { "id": "us/ca/dmv/vehicle-registration-renewal", "version": "1.0.0" },
  "source": { "url": "https://www.dmv.ca.gov/portal/vehicle-registration/renew-your-registration/" },
  "steps": [
    { "stepId": "applicant_details", "action": "navigate" },
    { "stepId": "applicant_details", "action": "fill", "field": "licensePlateNumber" },
    { "stepId": "applicant_details", "action": "read", "field": "renewalFeeDue" },
    { "action": "stop-before-submit" }
  ]
}
```

`conformance/browser-flow.schema.json` (scaffolded by this GSP, see below)
constrains `steps[].action` to a **closed vocabulary**: `navigate` / `fill` /
`read` / `stop-before-submit`. There is deliberately no `submit`, `next`, or
"click continue past the final review screen" value in that vocabulary — a
fixture author cannot author a submission action even by mistake, because the
format has no member for one. This is the same structural-boundary technique
GSP-0011 §"Scope boundary" used for `mapping.json` (no `action`/`submitUrl`/
`next` members exist to define): the boundary is enforced by what the format
*can express*, not by a reviewer catching a violation in prose.

The meta-schema requires at least one `stop-before-submit` step to be present
(`contains`/`minContains`, a JSON-Schema-expressible rule). The stronger rule
— that `stop-before-submit` MUST be the flow's **terminal** step and no step
may follow it — is stated here as a normative rule checked by tooling, not
expressed in the meta-schema itself, matching the precedent already set for
`mapping.json`'s field-name referential integrity (GSP-0011 "Referential
integrity": "a normative, non-JSON-Schema-expressible rule, checked by
tooling rather than the meta-schema alone").

`field` (a `fields[].name`) and `documentId` (a `documents[].id`, GSP-0014)
are each OPTIONAL on a step and mutually exclusive — `fill`/`read` steps
target one or the other; `navigate` and `stop-before-submit` steps target
neither. A future `mapping.json` need not exist before a `browser-flow.json`
can reference it by convention, but its `field`/`documentId` values are only
resolvable once one does — that referential check, like `mapping.json`'s own,
belongs to tooling (§5), not this GSP.

### 5. Out of scope — the runner

A `tools/conformance-runner.mjs` that executes a `conformance/<id>/<version>/`
fixture set against a real consumer implementation and reports pass/fail
(including driving `browser-flow.json` against a real or recorded page) is
**future work, not built by this GSP** — RFC 0003 §7 flags it explicitly as
such. It would itself be read-only/non-submitting, since every fixture it
runs already is, by the structural boundary in §4. Tracked as a follow-up
issue once a first `conformance/<id>/<version>/` fixture set exists to run it
against.

### 6. Relationship to maturity levels (GSP-0012)

RFC 0003 §2 defines the **Execution-Tested Schema** tier as: Agent-Ready,
plus a current `mapping.json` under `selector-probe-v1` **and** a
`conformance/<id>/<version>/browser-flow.json` fixture that reaches its
terminal `stop-before-submit` state without error. This GSP is what makes
that criterion checkable — `conformance/` existing is a precondition of any
schema ever claiming that tier, not an independent parallel effort.

## Open questions

- **`profiles`/`expected` meta-schema.** Whether the flat id-to-value maps in
  `profiles/` and the missing-set list in `expected/` deserve their own
  meta-schema (mirroring `browser-flow.schema.json`) once a few real fixture
  sets exist and a common shape stabilizes, or whether they are simple enough
  to stay ad hoc plain JSON indefinitely. No blocker to scaffolding the
  directory now; revisit once the EIN/SS-4 flagship authors the first real
  set (lens: *spec precision over cleverness* — don't formalize a shape from
  zero examples).
- **`documentId` vs. a unified `target`.** This GSP gives `browser-flow.json`
  steps two mutually-exclusive optional members (`field`, `documentId`)
  rather than one polymorphic `target: { kind, name }`. Recommend the flatter
  two-member shape for now (simpler `additionalProperties: false` validation,
  no discriminated union needed); revisit only if a third target kind
  (e.g. a `crossFieldValidation` rule id) needs referencing by a future
  fixture kind.

## Decision — Accepted

Per `GOVERNANCE.md`'s two-way-door path, this GSP and the scaffold it
describes (`conformance/README.md`, `conformance/browser-flow.schema.json`)
are decided by normal pull-request review through the standard Review gate,
not a CEO sign-off interaction — consistent with GOV-317's scoping of this
work as "a new repo directory, not a schema-shape change." No `spec/vN`,
meta-schema, or registry file changes ship with this GSP; a first
`conformance/<id>/<version>/` fixture set for a real reference schema is
follow-up content work, sequenced against the EIN/SS-4 flagship (RFC 0003
§8) once it reaches the Agent-Ready maturity tier.
