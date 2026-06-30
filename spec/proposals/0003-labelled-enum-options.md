# GSP-0003: Labelled enum options

- **Status:** Proposed — targets a future spec MINOR (additive).
- **Author:** Standards Engineer
- **Date:** 2026-06-30
- **Issue:** GOV-14 (carry-over from [GSP-0001](./0001-document-model-reconciliation.md))
- **Affects:** `spec/vN/govschema.schema.json` (field model), `tools/`, consumers

## Problem

In v0.1, an `enum` field lists **values only** via `validation.enum`
(e.g. `["F", "M", "X"]`). There is no machine-readable, plain-language label per
value, so a consumer cannot render a human-facing choice list without hard-coding
its own labels. The DS-82 reference schema works around this by folding the labels
into the field `description` (e.g. "F = Female, M = Male, X = Unspecified…"), which
is not structured.

## Sketch (non-normative)

Allow an optional labelled-options form for `enum` fields:

```json
{
  "name": "sexMarker",
  "type": "enum",
  "options": [
    { "value": "F", "label": "Female (F)" },
    { "value": "M", "label": "Male (M)" },
    { "value": "X", "label": "Unspecified or another gender identity (X)" }
  ]
}
```

- `value` is the machine token; `label` is the plain-language display text.
- `value`s MUST be unique within the field.
- Backward-compatibility: support `validation.enum` (values only) and `options`
  (labelled); a value-only field keeps working. Decide whether `options` supersedes
  `validation.enum` for `enum` fields or both remain permitted.

## Decision requested

A future, scheduled work item; no decision required now.
