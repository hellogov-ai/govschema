# GSP-0020: Treaty-authorized third-party issuers in `authority`

- **Status:** Accepted — CEO sign-off recorded 2026-07-02 (GOV-582 decision
  interaction, "Accept as written"). `authority.operatedBy` is accepted as
  written and folded into `spec/v0.3/govschema.schema.json` and
  `spec/v0.3/SPEC.md` §5.5 in this same change, since it is a single, small,
  additive member (same pattern GSP-0018 used).
- **Author:** Founding Engineer
- **Date:** 2026-07-02
- **Issue:** [GOV-582](/GOV/issues/GOV-582) (follow-up from the
  [GOV-381](/GOV/issues/GOV-381) DMV vertical discovery pass — every DMV
  process now has a published schema except the International Driving
  Permit, blocked on this standards call)
- **Affects:** `spec/v0.3/govschema.schema.json` `$defs` for `authority`,
  `spec/v0.3/SPEC.md` §5.5

## Problem

`authority` (SPEC.md §5.5) models "the government body that owns the
process": `name` (required), `abbreviation`, `url`. This is a clean fit when
one government body both authorizes and operationally runs a process — the
overwhelming majority of schemas published so far.

It does not fit an International Driving Permit (IDP), issued under the 1949
Geneva Convention on Road Traffic. In the US, IDPs are issued exclusively by
two entities the Department of State has authorized under treaty — the
American Automobile Association (AAA) and the American Automobile Touring
Alliance (AATA) — both private membership organizations, neither a
government body. Authoring `us/dos/international-driving-permit` today means
one of two factually awkward choices:

1. `authority.name` = "American Automobile Association" — accurate about
   who runs the process, but misrepresents a privately-operated
   organization as "the government body that owns the process" (§5.5's own
   framing), with no way for a consumer to tell this schema apart from one
   whose issuer really is a government body.
2. `authority.name` = "U.S. Department of State" — accurate about who
   authorized the process, but misdescribes the actual issuing flow: DOS
   does not take applications, collect fees, or issue the permit.

Neither choice is a clean fit, and this pattern is not unique to the IDP.
Government-authorized-but-privately-operated public services recur globally:
accredited vehicle-inspection stations, treaty-designated notarial/apostille
agents, government-contracted driving-test centers, and other auto-club-style
delegations of a treaty or statutory function are all structurally the same
shape — one body holds the legal/treaty authorization, a different body runs
the day-to-day process. Picking either option above without a standards
decision sets an unreviewed precedent for all of them.

## Options considered

- **Option A — extend the model.** Add an OPTIONAL nested member on
  `authority` that names the operating issuer when it differs from the
  authorizing body, while `authority.name` keeps its existing, unchanged
  meaning (the government body whose authorization creates and governs the
  process). Precise about both facts; no change to any existing document's
  validity, since the new member is optional and additive.
- **Option B — authorizing-body-only, document the rest in prose.** Rule
  that `authority` always names the government authorizer regardless of
  operator, and push the operating issuer's identity into `description`
  and/or `source`. Zero schema-shape change, but demotes a structurally
  important fact (who a user actually deals with, whose website they visit,
  whose fee they pay) to unstructured prose a consumer cannot query or
  validate — a worse fit for GovSchema's stated purpose ("machine-readable
  ... an agent can consume programmatically", README.md) than a small
  schema addition.
- **Option C — rule out of scope.** Exclude IDL and the whole
  authorized-third-party-operator pattern from GovSchema entirely, since the
  operational process is privately run. Defensible in isolation, but this
  pattern is common enough (see Problem) that it would carve a
  recognizable, recurring class of real government-created public services
  out of a foundation whose charter is explicitly the *interaction layer*
  between agents and government processes — the authorization, eligibility
  rules, and required documents for an IDP are exactly as real and
  exactly as agent-relevant as those for a directly-run DMV process. Scoping
  it out trades away coverage to avoid a small, additive schema change.

## Recommendation — Option A

Add an OPTIONAL `operatedBy` object nested inside `authority`:

```json
"authority": {
  "name": "U.S. Department of State",
  "abbreviation": "DOS",
  "url": "https://travel.state.gov",
  "operatedBy": {
    "name": "American Automobile Association",
    "abbreviation": "AAA",
    "url": "https://www.aaa.com",
    "basis": "Designated issuer of International Driving Permits under the 1949 Geneva Convention on Road Traffic and U.S. Department of State authorization."
  }
}
```

- `authority.name`/`abbreviation`/`url` — **unchanged.** Always the
  government body whose authorization creates and governs the process. This
  preserves §5.5's existing framing and every existing document's meaning
  with zero change.
- `authority.operatedBy` — OPTIONAL object, present only when a different,
  non-government body operationally runs the process under the named
  authority's authorization.
  - `name` — REQUIRED, the operating body's official name.
  - `abbreviation` — OPTIONAL, a short form.
  - `url` — OPTIONAL, the operator's official homepage.
  - `basis` — REQUIRED, a short plain-language citation of the legal or
    treaty instrument under which the operator is authorized (e.g. "under
    the 1949 Geneva Convention on Road Traffic and U.S. Department of State
    authorization"). This is the field that does the real work: it is what
    lets a consumer (or a future verification practice) distinguish a
    genuinely government-designated third-party operator from an ordinary
    private company that merely offers a similar-sounding service with no
    government authorization at all — the exact distinction this GSP exists
    to make possible. `operatedBy` without a `basis` would reopen the
    ambiguity this proposal is meant to close, so it is required whenever
    `operatedBy` is present, not optional.

This resolves the boundary question implicitly: GovSchema's scope is **the
government-authorized process**, regardless of which body operationally
executes it (adopting Option B's boundary answer), while keeping that fact
queryable and structured rather than pushed into free text (avoiding Option
B's actual proposal, and Option C's exclusion). A schema author filling in
`authority` for an ordinary directly-run process is completely unaffected —
`operatedBy` is absent, exactly as today.

### Why nested under `authority`, not a new top-level sibling member

A new top-level member (e.g. `operatingIssuer`) was considered and rejected:
it would let a document name an operating issuer with no authorizing body at
all, which is not a coherent state under GovSchema's independence posture
(GOVERNANCE.md: "A GovSchema document describes a public government
process" — there must always be a government authorizer). Nesting under
`authority` makes the authorizer structurally primary and the operator
conditional on it, matching the real-world relationship instead of two
independent facts a validator would otherwise have to cross-check.

## Impact

- Purely additive: no existing document (all currently published schemas
  omit `operatedBy`) changes meaning or validity.
- Unblocks `us/dos/international-driving-permit` and the equivalent GB/AU/etc.
  IDP schemas once accepted, plus any future schema hitting the same
  authorized-third-party-operator pattern (the recurring cases named in
  Problem).
- No change to `verification`, `classification`, versioning, or any other
  one-way-door surface. Scoped entirely to §5.5.

## Decision — Accepted

Accepted as written via the CEO sign-off interaction on
[GOV-582](/GOV/issues/GOV-582), recorded 2026-07-02, per
[GOVERNANCE.md](../../GOVERNANCE.md)'s one-way-door process and the
precedent set by GSP-0005/0011/0015/0018. `authority.operatedBy`
(`name`/`abbreviation`/`url`/`basis`) is folded into
`spec/v0.3/govschema.schema.json` and `spec/v0.3/SPEC.md` §5.5 in the same
change; `authority.name`/`abbreviation`/`url` are unchanged. Unblocks
[GOV-587](/GOV/issues/GOV-587), authoring
`us/dos/international-driving-permit`.
