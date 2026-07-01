# Schema discovery

This directory holds the **discovery catalog**: a curated, prioritized inventory
of citizen-facing government processes that an AI agent would carry out on behalf
of an individual, and that are therefore candidates for a future GovSchema
document.

It is a **planning artifact, not a registry of published schemas.** Nothing here
has been authored against a live source or verified. The catalog tells the
foundation *what to schematize next and in what order*; the published, validated
schemas themselves live under [`registry/`](../registry).

- Machine-readable: [`catalog.json`](./catalog.json)
- Integrity check: `node discovery/check.mjs`

## What's in scope

Processes an individual would have an agent complete for them — the "human
companion" framing in our charter. Concretely: identity documents, driving and
vehicles, tax, benefits and pensions, immigration and citizenship, voting,
health registration, and forming a one-person business. Purely
business-internal or government-internal processes are excluded except where an
individual routinely files them (sole-trader tax, single-member company
formation).

Coverage started with **US and GB** (GOV-36) and has since grown to include
**IE, CA, NZ, and AU** as each jurisdiction's turn came up. The format and the
catalog structure are jurisdiction-neutral; other countries sit at the same top
level when their turn comes.

## The boundary still holds

A catalog entry describes a process so an agent can collect and validate the
right inputs. GovSchema never submits a form, never stores anyone's answers, and
never implies government endorsement. Discovery does not change that — it only
decides which descriptions to write.

## How an entry was chosen

Each candidate had to clear four tests, drawn from our engineering lenses:

1. **Agent-relevant** — a real task an individual would delegate, not an
   institution-to-institution process.
2. **Has a single identifiable source** — one authority and one live entry point
   we could later verify against (source-of-truth fidelity).
3. **Maps cleanly onto the format** — typed fields, optional flow, one
   jurisdiction and authority (machine-first).
4. **Teaches the next schema** — favoring families (one authority, several
   processes) and cross-jurisdiction pairs so conventions compound
   (composability, least surprise).

Grounding sources for this pass: USA.gov's services index, the GOV.UK
"original 25 exemplar services" list, and each owning authority's own pages
(DOS, SSA, IRS, USCIS, DVLA, HMRC, DWP, Home Office, and others). Source URLs in
the catalog are **candidate** entry points to confirm at authoring time, not
verified sources.

## Priority tiers

| Tier | Meaning |
| ---- | ------- |
| **1** | High-frequency, well-bounded, single-source-form processes. Strongest next candidates to author. |
| **2** | Common but multi-path, longer, or multi-document. Author after tier 1; expect richer flow modelling. |
| **3** | High-value but complex, sensitive, eligibility-heavy, or sub-nationally fragmented (immigration, means-tested benefits, state-administered programs). Need extra verification rigor and may take several schemas per jurisdiction. |

The two reference schemas already in the registry
(`us/dos/passport-renewal-ds82`, `gb/hmpo/passport-renewal-adult`, plus the
`us/ca/dmv/vehicle-registration-renewal` example) appear with status
`published`.

## Cross-jurisdiction observations

Discovery surfaced structural facts the format has to absorb, recorded here so
authoring doesn't rediscover them:

- **US administration is fragmented; GB's is largely national.** Voter
  registration, SNAP, driver licensing, and company formation are
  *state-administered* in the US, so each needs subnational schemas
  (`us/<state>/...`), while their GB counterparts (register to vote, Universal
  Credit, DVLA licensing, Companies House) are single national services. The
  registry path convention already accommodates both.
- **GB health and some services are devolved** across England, Scotland, Wales,
  and Northern Ireland. NHS GP registration starts with England (GMS1); the
  devolution split is noted on the entry rather than flattened away.
- **Tax and aid are time-versioned.** IRS 1040, HMRC Self Assessment, and FAFSA
  change every tax/award year. These need a year axis (in `id` or metadata) — a
  spec question to raise via [`spec/proposals`](../spec/proposals) before
  authoring, not a decision to make inside one schema.
- **Renewal/application pairs share field clusters.** Passport renewal vs.
  first application, license renewal vs. first provisional — strong candidates
  for shared field definitions once the spec supports reuse.
- **Renewal eligibility windows differ across otherwise-similar processes.**
  NZ and CA cap online passport renewal at 24 months past expiry; Australia's
  published renewal eligibility carries no such cap (`au/apo/passport-renewal-adult`).
  Don't assume one jurisdiction's eligibility shape for another without checking
  the live source.
- **Voter enrolment federalism varies independently of general administrative
  fragmentation.** US driver licensing, voter registration, and company
  formation are all state-administered; Australia's driver licensing and
  company registration are similarly state/territory-administered, but its
  electoral roll is a single national AEC register (`au/aec/voter-enrolment`),
  closer to GB's national register than to the US pattern.

## From catalog to registry

A candidate becomes a schema when someone:

1. picks an entry (tier 1 first);
2. authors `registry/<proposedId>/<version>/schema.json` against the confirmed
   live source, per [`spec/v0.1`](../spec/v0.1) and
   [`registry/README.md`](../registry/README.md);
3. attaches a verification record using a documented
   [practice](../practices); and
4. passes `node tools/validate.mjs`.

Authoring is tracked as separate issues, not in this directory. This catalog is
the backlog those issues draw from.
