# GSP-0021: Municipal & county jurisdictions (`jurisdiction.locality`)

- **Status:** Accepted — CEO sign-off recorded 2026-07-06 (GOV-667 decision
  interaction, "Accept as written"). `jurisdiction.locality` is accepted as
  written and folded into `spec/v0.3/govschema.schema.json` and
  `spec/v0.3/SPEC.md` §5.2/§5.4/§13 rule 2 in this same change, since it is a
  single, small, additive member (same pattern GSP-0018/GSP-0020 used).
- **Author:** Founding Engineer
- **Date:** 2026-07-02
- **Issue:** [GOV-667](/GOV/issues/GOV-667) (spec prerequisite for the Miami-Dade
  county pilot, [GOV-664 plan §4/§6](/GOV/issues/GOV-664#document-plan))
- **Affects:** `spec/v0.3/govschema.schema.json` `$defs`/properties for
  `jurisdiction`, `spec/v0.3/SPEC.md` §5.2, §5.4, §13 rule 2

## Problem

`jurisdiction.level` (§5.4) already enumerates `municipal` alongside
`national`/`subnational`/`supranational`, but no schema authored so far has ever
had a way to *name* the municipal/county body itself:

- `jurisdiction.subdivision` is scoped to ISO 3166-2 (`^[A-Z]{2}-[A-Z0-9]{1,3}$`,
  e.g. `US-FL`) — a real standard for state/province-level subdivisions, but ISO
  3166-2 has no codified layer for counties, cities, or other sub-state
  localities. There is no field to hold `Miami-Dade County`.
- The `id` path grammar (§5.2, `^[a-z]{2}(/[a-z0-9-]+){2,}$`) is technically
  permissive enough to already accept an extra path segment — nothing in the
  regex itself blocks `us/fl/miami-dade/<authority>/<process>` — but the *prose*
  never describes a locality layer, so nothing tells an author where it goes,
  whether it's required to correspond to a `jurisdiction` member, or how a
  validator should check it.
- §13 rule 2 (id/jurisdiction consistency) only checks the country and
  subdivision tokens against `jurisdiction.country`/`jurisdiction.subdivision`.
  It has no rule to check a county/municipal token against anything, so a
  document could carry `us/fl/miami-dade/...` with a `jurisdiction` block that
  never mentions Miami-Dade at all, or mismatched (`broward` in the id,
  `Miami-Dade` in prose) — silently unvalidatable.

This blocks the Miami-Dade pilot (homestead exemption, local business tax
receipt, marriage license — GOV-664 plan §4) and any future county/municipal
schema (e.g. a US city business license, a UK local-authority parking permit).

## Options considered

- **Option A — extend the model.** Add an OPTIONAL `jurisdiction.locality`
  object (`name`, `slug`) naming the municipal/county body, require
  `level: municipal` whenever it's present, and document the `id` path's
  locality layer plus a new §13 rule checking the locality token against
  `locality.slug`. Small, additive, backward-compatible.
- **Option B — reuse `subdivision` loosely.** Let `subdivision` hold a
  non-ISO-3166-2 free-form county string when needed. Rejected: `subdivision`'s
  entire value is "this is a real ISO 3166-2 code" (§5.4's own pattern
  constraint); loosening it to accept arbitrary strings destroys that
  guarantee for every existing and future subnational schema, a much larger
  blast radius than a new optional member.
- **Option C — encode locality only in `id`, not `jurisdiction`.** Let the path
  segment (`miami-dade`) be the sole record of the county, with no
  corresponding `jurisdiction` member. Rejected: every other geographic layer
  in `id` (country, subdivision) has a structured, human-readable counterpart
  in `jurisdiction` that a consumer can query without parsing slugs out of a
  path string (e.g. rendering "Miami-Dade County" in an agent's UI). Path-only
  encoding would make locality the one geographic layer a consumer can't get a
  display name for without an out-of-band lookup table.

## Recommendation — Option A

Add an OPTIONAL `locality` object nested inside `jurisdiction`:

```json
"jurisdiction": {
  "country": "US",
  "subdivision": "US-FL",
  "locality": { "name": "Miami-Dade County", "slug": "miami-dade" },
  "level": "municipal"
}
```

- `locality` — OPTIONAL object, present only when the process is scoped to a
  specific county, city, or other sub-state/sub-province body rather than the
  whole subdivision.
  - `name` — REQUIRED, the body's official or commonly-used name (e.g.
    `"Miami-Dade County"`).
  - `slug` — REQUIRED, a stable lowercase identifier
    (`^[a-z0-9][a-z0-9-]*$`) that MUST equal the `id` path's locality token
    (new §13 rule, see below). This is the field that makes the locality
    machine-checkable rather than just descriptive prose — the same role
    `edition.label` plays for the `<edition>` path segment (§5.7, §13 rule 6)
    and `authority.operatedBy.basis` plays for GSP-0020's operator fact.
  - `locality` REQUIRES `level: municipal` (a document naming a specific
    county/city but tagging itself `national` or `subnational` is
    inconsistent). Enforced as an `allOf`/`if`/`then` in the meta-schema, the
    same pattern already used for the maturity ladder (§12.3) and the
    `fieldRole: eligibility` co-presence constraint (GSP-0018).
  - The reverse is **not** required: `level: municipal` without `locality` stays
    valid (a document may be municipal-scoped without GovSchema yet having a
    name/slug for that specific body — e.g. an already-published schema that
    predates this GSP, or a jurisdiction where the process is described at the
    municipal level generically). `locality` is additive, not retroactively
    mandatory.

### `id` path layer (§5.2)

Document, in prose only (the existing regex `^[a-z]{2}(/[a-z0-9-]+){2,}$`
already permits this without a pattern change), that a county/municipal-scoped
document's `id` carries the locality slug as its own path segment between
subdivision and authority:

```
us/fl/miami-dade/<authority>/<process>
us/fl/miami-dade/tax-collector/homestead-exemption
```

No regex change: the existing pattern is a generic "two or more slash-joined
slug segments after the country" grammar, and already accepts this shape. The
gap being closed is purely that nothing previously told an author the layer
existed, gave it a name, or connected it to a validatable field.

### §13 rule 2 extension (id/jurisdiction consistency)

Extend the existing rule text (SPEC.md §13, rule 2) so that, when a document
has both `jurisdiction.locality` and a country+subdivision `id` prefix, the
next path segment (the token immediately after the subdivision token, before
`<authority>`) MUST equal `jurisdiction.locality.slug`. A document with
`jurisdiction.locality` but no corresponding `id` segment, or a mismatched
segment (id says `broward`, `locality.slug` says `miami-dade`), is
non-conforming under this rule — mirroring exactly how rule 2 already checks
the country/subdivision tokens, and how rule 6 checks the `<edition>` segment
against `edition.label`.

## Impact

- Purely additive: `locality` is a new OPTIONAL member; every currently
  published document (all of which omit it) is unaffected in meaning or
  validity.
- No change to `subdivision`'s ISO 3166-2 pattern or meaning, and no change to
  the `id` regex (§5.2) — only new prose describing a layer the regex already
  permitted.
- Unblocks the three Miami-Dade schema issues hard-blocked on GOV-667
  ([GOV-664 plan §4/§6](/GOV/issues/GOV-664#document-plan)) and any future
  county/municipal schema (a US city business license, a UK local-authority
  service, etc.) using the same `locality` shape.
- No change to `verification`, `classification`, `edition`, or any other
  one-way-door surface. Scoped entirely to §5.2/§5.4/§13 rule 2.

## Decision requested

Accept / accept-with-changes / hold-for-pilot (defer until the Miami-Dade
schemas surface a concrete field-level need) / reject, per
[GOVERNANCE.md](../../GOVERNANCE.md)'s one-way-door sign-off process. This is
an id-grammar-adjacent surface change (a new geographic layer other schemas'
`id`s could start using), so it routes through CEO/board sign-off rather than
ordinary PR review, per the precedent in GSP-0001/0005/0011/0015/0018/0020.
