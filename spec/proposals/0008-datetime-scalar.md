# GSP-0008: `datetime` scalar type

- **Status:** Proposed — targets a future spec MINOR (additive).
- **Author:** Standards Engineer
- **Date:** 2026-06-30
- **Issue:** GOV-62 (per the GOV-61 spec-evolution disposition, item 5a)
- **Affects:** `spec/vN/govschema.schema.json` (field `type` enum, §6.2), consumers

## Problem

v0.1 has a `date` scalar — an [RFC 3339] full-date, `YYYY-MM-DD` (§6.2) — but no
type for a point in time that carries a clock value and offset. Government
processes need one: appointment slots ("2026-07-14T09:30:00-04:00"), filing
deadlines with a cutoff time, and recorded timestamps. Modelling these as `date`
loses the time-of-day; modelling them as a free `string` loses validation and
forces every consumer to guess the format.

## Sketch (non-normative)

Add `datetime` as a sibling scalar of `date`:

| `type`     | JSON value | Notes                                                |
|------------|------------|------------------------------------------------------|
| `date`     | string     | Full date, `YYYY-MM-DD` (RFC 3339 *full-date*).      |
| `datetime` | string     | Instant, RFC 3339 *date-time* (date + time + offset).|

```json
{
  "name": "appointmentSlot",
  "label": "Appointment date and time",
  "type": "datetime"
}
```

- The value is a string conforming to the RFC 3339 `date-time` production, e.g.
  `2026-07-14T09:30:00-04:00`. A time-zone offset (or `Z`) is part of the
  production and so is required by it — which is the point: an appointment instant
  without an offset is ambiguous (lens: *spec precision over cleverness*).
- This mirrors the existing `date`/RFC 3339 choice, so it is *least surprise* for
  anyone who already knows the `date` type (lens: *convention over configuration*).
- Additive: a new `type` enum value. Documents that do not use it are unaffected;
  no existing document changes meaning (lens: *backward compatibility & semver*).

## Open questions

- **Time-only and date-partial types.** A clock-time-without-date (`time`) or a
  year/year-month partial are conceivable but have no concrete catalogued demand
  yet. Recommend `datetime` only for v0.2; add the others if a real form needs
  them.
- **Validation reuse.** Whether `minimum`/`maximum`-style temporal bounds should
  apply to `date`/`datetime` (a lexicographic RFC 3339 compare is well-defined).
  Out of scope here; tracked with the richer-constraints work (§12), and shares
  the type-scoped-validation mechanism raised in [GSP-0007](./0007-file-field-constraints.md).

## Decision requested

A future, scheduled work item; no decision required now. Low risk — a single
additive scalar parallel to `date`. Acceptance into `spec/v0.2` is gated on CEO
sign-off per [GOVERNANCE.md](../../GOVERNANCE.md).

[RFC 3339]: https://www.rfc-editor.org/rfc/rfc3339
