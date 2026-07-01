# GSP-0017: Agent conformance and safety boundary

- **Status:** Proposed — targets `spec/v0.3`. Pending CEO accept-into-v0.3
  sign-off (requested on [GOV-318](/GOV/issues/GOV-318)).
- **Author:** Standards Engineer
- **Date:** 2026-07-01
- **Issue:** GOV-318, drafted per RFC 0003 §6 (GOV-302)
- **Affects:** a new normative section in the future `spec/v0.3/SPEC.md`
  (**§14, "Agent conformance and safety boundary"**), a new companion
  `docs/agent-safety-model.md`, and — because §14 is stated to bind consumer
  *behavior*, not document shape — every layer in
  [`docs/agent-consumption.md`](../../docs/agent-consumption.md) (raw fetch,
  `llms.txt`, the reference MCP server, the installable Skill). **Depends on**
  GSP-0006 (`classification`) and GSP-0012 (`maturity`) — both already
  accepted into `spec/v0.3` (GOV-313, GOV-316) — since two of the six rules
  below key directly on constructs those GSPs define.
- **One-way-door: yes, and flagged for deliberate CEO attention beyond the
  ordinary accept-into-v0.3 sign-off.** Every prior GSP constrains what a
  conforming *document* looks like. This is the first proposal that puts a
  MUST on conforming *consumer* behavior — a real, if modest, expansion of
  what "GovSchema conformance" means. RFC 0003 §13 Q5 named this the item
  "most worth an explicit yes given it expands what conformance covers" and
  recommended the normative reading over a purely advisory one; the founder's
  interaction answer on GOV-302 already leaned normative, but per that RFC's
  own framing this proposal calls it out again, explicitly, rather than
  folding it in quietly alongside the schema-shape GSPs. Filing this proposal
  document is not that act — ordinary two-way-door PR review, exactly as
  GSP-0001–0016 were filed. Nothing in `spec/vN` or `GOVERNANCE.md` changes
  until a separate CEO sign-off interaction accepts it.

## Problem

GovSchema's non-submission boundary already exists — in prose, at the
foundation level (`GOVERNANCE.md`: "GovSchema does not fill out forms or
submit data on anyone's behalf"), and narrowly, at the artifact level, for one
companion file (`spec/v0.2/SPEC.md` §13.4, "Scope boundary — describe, never
prescribe," written for `mapping.json` alone). Neither is stated as one
normative rule that applies to **every** GovSchema document and **every**
consumer built on top of it. An agent developer reading only SPEC §1–§13 today
has no single normative section to point to for "what must my agent do (and
never do) to call itself GovSchema-conformant" — the boundary is real, but it
lives in governance prose and one artifact's scope note, not in the
specification's own MUST/MUST NOT vocabulary. As GovSchema adds constructs
that carry real weight if mishandled — `classification` (GSP-0006),
`documents[].category: identity-document` (GSP-0014), `maturity`
(GSP-0012) — the cost of that gap grows: a consumer could read a
`classification: sensitive` field or a stale `draft` document and have no
normative text telling it that changes what it must do next.

## Design

### 1. A new normative SPEC §14, generalizing GSP-0011 §13.4

Add **SPEC §14, "Agent conformance and safety boundary,"** to the future
`spec/v0.3/SPEC.md`, applying to **every** GovSchema document — not just
`mapping.json` — and to every consumer that reads one. This is a
generalization, not a replacement: `mapping.json`'s own §13.4 remains in
place, describing that one artifact's structural enforcement (no `action`/
`submitUrl`/`next` members exist to define); §14 states the same posture as a
document-independent conformance rule and cross-references §13.4 as its
first, narrower precedent.

### 2. The six-point MUST / MUST NOT list

A conforming consumer (any agent, script, or service built on any GovSchema
document, through any layer in `docs/agent-consumption.md`) MUST satisfy all
of the following:

1. **No submission authorization.** A GovSchema document MUST NOT be treated
   by a conforming consumer as authorization to submit anything to a
   government system, on the applicant's behalf or otherwise. GovSchema
   describes a process; it does not authorize acting on it. This restates
   `GOVERNANCE.md`'s foundation-level boundary as a specification-level MUST
   NOT, binding on every consumer rather than only on GovSchema's own
   tooling.
2. **Confirm before submit.** A conforming agent MUST obtain explicit,
   informed user confirmation before any final submission action, regardless
   of how complete or internally validated the collected data is. Passing
   every `validation` rule in a schema (§6) is a claim about data shape, not
   a claim that the user has reviewed and authorized what is about to be
   sent.
3. **Stricter handling for sensitive and identity data.** A conforming agent
   MUST apply stricter handling — at minimum, explicit confirmation before
   use and no third-party transmission without consent — to any field
   carrying a `classification` value other than the public default
   ([GSP-0006]) or any `documents[]` entry whose `category` is
   `identity-document` ([GSP-0014]). "Stricter" is a floor, not a ceiling: a
   consumer MAY apply additional safeguards (e.g. encryption at rest,
   redacted logging) beyond this minimum; it MUST NOT apply less.
4. **Surface currency before relying on draft data.** A conforming agent
   MUST surface a document's `status` (§9) and `verification` record — or,
   once [GSP-0012] lands, its `maturity` — to the user, or otherwise account
   for it in its own decision-making, before relying on that document to
   collect or validate data. It MUST NOT silently treat a `draft` or
   `deprecated` document, or one whose `verification.nextReviewBy` has
   passed, as current without surfacing that fact.
5. **No endorsement claim.** A conforming agent MUST NOT represent a
   GovSchema document, or any output derived from it, as government-issued,
   government-endorsed, or legally authoritative. This restates
   `GOVERNANCE.md`'s independence posture ("not endorsed by, affiliated with,
   or certified by any government") as a per-interaction consumer obligation,
   not only a claim GovSchema makes about itself.
6. **Applies uniformly, no wrapper exemption.** These five requirements apply
   identically across every consumption layer in `docs/agent-consumption.md`
   — raw fetch, `llms.txt`, the reference MCP server, and the installable
   Skill. None of them is exempt because it is "just a convenience wrapper":
   a thinner layer over the same data carries the same obligations as the
   baseline it wraps.

Each of the six is phrased to be independently checkable in principle (a
reviewer or an incident report can ask "did the consumer do this, yes or
no") even though — see §4 below — GovSchema has no execution environment in
which to mechanically test most of them.

### 3. Companion `docs/agent-safety-model.md`

A new, non-normative `docs/agent-safety-model.md` restates the same six
points in the plain-language, worked-example style of
[`docs/agent-consumption.md`](../../docs/agent-consumption.md), for the
audience that will build against GovSchema without reading `SPEC.md` §14
directly. SPEC §14 remains the normative text; the companion doc is
explanatory, cross-linked both directions, exactly the relationship
`spec/v0.2/SPEC.md` §13 already has with `docs/agent-consumption.md`'s own
boundary paragraphs on the MCP server and Skill layers.

### 4. What "conformance" means here, honestly

Every rule above binds a consumer's runtime *behavior*, which GovSchema — a
document format and a set of static files — cannot itself execute, log, or
mechanically verify the way `tools/validate-ajv.mjs` verifies a schema's
shape. This is a real, named limit, not glossed over:

- Rule 6 of §2 (uniform application) is the one place this proposal *can*
  point to structural enforcement today: [GSP-0016]'s `browser-flow.json`
  fixtures have no `submit` action in their vocabulary at all — a fixture
  author cannot violate rule 1 even by mistake, the same technique
  [GSP-0011] §13.4 already established for `mapping.json`. That is the
  narrow slice of §14 conformance a machine can already check.
- Rules 2–5 are not, today, machine-checkable against a real consumer
  implementation — no `tools/` script executes a third party's agent and
  observes whether it asked for confirmation or surfaced `status`. This
  proposal states them as normative MUSTs anyway, on the same reasoning RFC
  0003 §6 gives: a stated MUST with an honest enforcement gap is still a
  real conformance property and a reference point for review and
  incident-handling; a MUST that waits for a perfect enforcement mechanism
  before being stated at all would leave the boundary undocumented
  indefinitely. `tools/mcp-server` and `tools/govschema-skill` already
  describe themselves as "read-only, describe-only, no submit tool" in their
  own READMEs (per `docs/agent-consumption.md` §3–4) — §14 is what makes
  that claim a specification-level obligation rather than each tool's own
  prose choice.
- A future conformance-runner or third-party audit could check rules 2–5
  against a specific consumer implementation's observed behavior; building
  that is out of scope for this proposal (it would be consumer-side tooling,
  not a GovSchema repository artifact) and is not a blocker to stating the
  rule now — the same posture GSP-0012 §3 takes toward its own
  not-yet-fully-automatable maturity criteria.

## Relationship to GSP-0006, GSP-0011, GSP-0012, GSP-0014, GSP-0016

- **[GSP-0006]** (`classification`) supplies the vocabulary rule 3 keys on.
  No redesign; this proposal only reads the field.
- **[GSP-0011]** §13.4 is this proposal's direct precedent and stays in
  place, narrower in scope (one artifact) and enforced structurally (no
  `action`/`submitUrl`/`next` members exist). §14 generalizes its posture,
  not its exact mechanism, to every document.
- **[GSP-0012]** (`maturity`) is named in rule 4 as the value to surface
  once it lands, alongside `status`/`verification`; until it is folded into
  an actual `spec/v0.3/SPEC.md`, rule 4 is satisfiable with `status`/
  `verification` alone (both already normative today, §9).
- **[GSP-0014]** (`documents[]`) supplies the `identity-document` category
  rule 3 keys on. No redesign.
- **[GSP-0016]** (conformance fixtures) is where rule 6's uniform-application
  requirement gets its one structural, machine-checkable expression today,
  per §4 above.

## Open questions

- **No declaration mechanism.** This proposal states obligations on
  consumers; it does not create a way for a consumer to *declare* "I am
  §14-conformant" (a badge, a manifest field, a registry listing). Recommend
  not inventing one now — a self-declared conformance badge with no
  verification behind it risks becoming exactly the kind of unearned trust
  signal `maturity`'s asserted-then-checked design (GSP-0012 §3) works hard
  to avoid. Revisit only if a concrete need for third-party attestation
  emerges (e.g. an agent marketplace wanting to list "GovSchema-conformant"
  implementations).
- **Enforcement gap for rules 2–5.** Flagged honestly in §4 above rather
  than resolved: stating a MUST that GovSchema's own tooling cannot check
  against a third party's runtime behavior is a real limitation. Recommend
  accepting the gap as-is for v0.3 (a stated boundary beats an unstated one)
  and revisiting only if a concrete incident (a consumer violating one of
  these rules in a way that damages trust in the standard) makes a stronger
  enforcement mechanism worth building.
- **Placement pending the actual `spec/v0.3` cut.** Like GSP-0006, GSP-0012,
  GSP-0013, GSP-0014, and GSP-0015 before it, this proposal describes text
  for a `spec/v0.3/SPEC.md` that does not exist as a file yet — no `spec/v0.3`
  directory has been cut. Accepting this GSP records the decision; folding
  §14's exact prose into an actual `spec/v0.3/SPEC.md` happens whenever the
  Founding Engineer sequences that cut across all of GSP-0006/0012/0013/0014/
  0015/0017 together, not as a separate act this GSP needs to resolve.

## Decision requested

CEO accept-into-`spec/v0.3` sign-off is requested on:

1. A new normative **SPEC §14, "Agent conformance and safety boundary"**
   (§1), applying to every GovSchema document and every consumer, generalizing
   GSP-0011 §13.4's scope-boundary language beyond `mapping.json` alone.
2. The exact **six-point MUST / MUST NOT list** (§2): no-submission-
   authorization, confirm-before-submit, stricter handling for
   `classification`/`identity-document` data, surface `status`/
   `verification`/`maturity` before relying on draft data, no
   government-endorsement claim, and uniform application across every
   `docs/agent-consumption.md` layer.
3. The companion, non-normative `docs/agent-safety-model.md` (§3) restating
   the same six points in plain language.
4. **Explicit confirmation that this is understood as GovSchema's first
   conformance rule binding consumer *behavior*, not just document shape** —
   the item RFC 0003 §13 Q5 flagged as most worth a deliberate yes, separate
   from the ordinary "does this schema-shape addition look right" review the
   other v0.3 GSPs received.

Requested via `ask_user_questions` on [GOV-318](/GOV/issues/GOV-318).

[GSP-0006]: ./0006-sensitivity-classification.md
[GSP-0011]: ./0011-field-page-element-mapping.md
[GSP-0012]: ./0012-schema-maturity-levels.md
[GSP-0014]: ./0014-documents-as-first-class-model.md
[GSP-0016]: ./0016-conformance-fixtures.md
