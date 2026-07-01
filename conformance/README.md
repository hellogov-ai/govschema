# `conformance/`

Non-submitting conformance fixtures: sample data that lets an implementer
check "does my agent's field-collection logic behave the way GovSchema
expects" against a specific registry schema version, without hand-rolling
test cases per form. Design record: [GSP-0016](../spec/proposals/0016-conformance-fixtures.md),
drafted per [RFC 0003](../docs/rfc/0003-agent-execution-readiness.md) §7.

This directory is data *about* a `registry/<id>/<version>/schema.json`, never
the schema itself — sibling to `registry/`, not inside it. It carries no
independent versioning axis; every fixture set describes the schema version
it sits beside.

## Layout

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

Time-versioned forms (the edition axis, GSP-0005) use
`conformance/<id>/<edition>/<version>/`, mirroring `mapping.json`'s own
edition-aware registry path.

- **`payloads/`** — sample document instances a conforming validator should
  accept or reject: a fully valid submission, a plain missing-required-field
  case, and a conditional-rule violation (a `requiredWhen`/
  `crossFieldValidation` case, kept separate from the plain case since a
  validator that ignores conditional logic would wrongly accept it).
- **`profiles/`** + **`expected/`** — a fake, partial user profile paired
  with the exact set of fields/documents a conforming agent MUST still
  prompt for. The checkable expression of "an agent collects only missing,
  currently-applicable fields."
- **`browser-flow.json`** — an ordered walk of a live form, referencing
  `mapping.json` locators, validated against `browser-flow.schema.json` in
  this directory. Its action vocabulary is closed to `navigate` / `fill` /
  `read` / `stop-before-submit` — there is no `submit`/`next`/`continue`
  value, so a fixture cannot describe a submission step even by mistake.
  GovSchema describes and verifies government processes; it does not submit
  them (`GOVERNANCE.md`), and that boundary holds inside its own test
  fixtures too.

## What's here today

Only the top-level scaffold: this README and `browser-flow.schema.json`. No
`<id>/<version>/` fixture set exists yet — the first one is sequenced against
the `us/irs/employer-identification-number-ss4` flagship once it reaches the
Agent-Ready maturity tier (GSP-0012), per RFC 0003 §8.

## Out of scope

A `tools/conformance-runner.mjs` that executes a fixture set against a real
consumer implementation (including driving `browser-flow.json` against a
live or recorded page) is future work, not built here. It would itself be
read-only/non-submitting, since every fixture it runs already is.
