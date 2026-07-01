# GSP-0015: Verification as an operational trust layer

- **Status:** Proposed — targets a future spec `v0.3` (additive).
- **Author:** Standards Engineer
- **Date:** 2026-07-01
- **Issue:** GOV-325 (per RFC 0003 §4, GOV-302; reserved by the RFC's §1.1 table
  but omitted from the GOV-312–320 filing batch by omission, not deliberate
  cut — see GOV-322)
- **Affects:** `spec/vN/govschema.schema.json` (`source.contentHash`, a
  field-level `verification` override member), a new `registry/<id>/CHANGELOG.md`
  file convention, a new `registry/<id>/<version>/changes.json` file convention,
  consumers, `VERSIONING.md` (referenced, not amended — see §3)
- **One-way-door:** yes, for the acceptance step only. This adds a narrower
  verification vocabulary at field granularity and a new registry file
  convention (`CHANGELOG.md`, `changes.json`) other tooling would come to
  depend on — per [GOVERNANCE.md](../../GOVERNANCE.md), "changes to what
  'verified' means" and new registry artifact conventions require maintainer
  (CEO) sign-off before acceptance into `spec/v0.3`. **Filing this proposal
  document is not that act** — it is ordinary two-way-door PR review, exactly
  as GSP-0001–0014 were filed. Nothing in `spec/vN` or the registry changes
  until a separate CEO sign-off interaction accepts it.

## Problem

`verification` (SPEC §9.2) today is one flat record for the *whole document*: a
method, a date, who reviewed it, when it's next due. This tells a consumer
"was this schema checked against its source, and when" — but nothing about
provenance below the document level, nothing that lets a future automated
monitor detect source drift without a full manual re-review, and nothing that
lets a consumer pinned to an older version see *what exactly* changed without
diffing two full JSON documents by hand. GOV-302 asks for the verification
model to become operational on all three fronts.

## Sketch (non-normative)

### 3.1 Source content hash (extends §8, `source`)

```json
"source": {
  "url": "https://www.irs.gov/forms-pubs/about-form-ss-4",
  "retrievedAt": "2026-07-01",
  "documentRef": "Form SS-4 (Rev. December 2025)",
  "contentHash": "sha256:9f2c1a7e...b71a"
}
```

- `contentHash` — OPTIONAL. `"sha256:"` followed by the lowercase hex-encoded
  SHA-256 digest of the **exact bytes retrieved from `source.url` at
  `retrievedAt`** — the raw HTTP response body (after standard transport
  decoding, e.g. gzip, since that is not part of the resource's content),
  before any HTML parsing, text extraction, or whitespace normalization. For a
  PDF source, this is the downloaded PDF file's bytes.

- **Canonicalization is pinned to raw bytes, not a canonicalized text
  extraction, and this is a deliberate resolution of an open question raised
  in RFC 0003 §4.1 and GOV-310's design review.** A canonicalized-text method
  (strip HTML, normalize whitespace, extract "content" from chrome) requires
  specifying *which* extraction algorithm — a design surface with no
  canonical answer, and one that would itself drift between producers, tool
  versions, and re-verifications. That defeats the one property a hash needs:
  two independent fetches of the *same unchanged resource* must produce the
  same digest. Raw bytes have exactly one unambiguous definition (lens: *spec
  precision over cleverness*).

  The accepted tradeoff: a purely cosmetic change to the source page or PDF
  (a redesign, an added tracking script, a re-rendered PDF with identical
  text) also changes `contentHash`. This is intentional, not a defect — the
  future drift monitor (RFC 0003 §4.4, explicitly out of scope for this GSP)
  treats any hash mismatch as "re-review due," and a human confirms via the
  `manual-source-review-v1` practice (documented under `practices/`) whether
  the change was substantive, exactly as that practice already resolves any
  other discrepancy today. No new trust primitive is introduced; `contentHash`
  only makes the *existing* review trigger checkable without a full manual
  diff.

- A document cites exactly one primary `source` (SPEC §8, unchanged); a
  multi-resource process (e.g. a form plus separate instructions) still cites
  one URL as primary, so `contentHash` inherits that same single-resource
  scope with no new decision needed.

### 3.2 Field-level verification override

```json
{
  "name": "llcMemberCount",
  "label": "Number of LLC members",
  "type": "integer",
  "verification": {
    "status": "unverified",
    "notes": "Added after the 2026-07-01 full review; not yet independently confirmed against the source."
  }
}
```

- OPTIONAL, sparse-by-design field member. **Absent on a field ⇒ the field
  inherits the document-level `verification` record in full**, including a
  derived narrower status via a fixed mapping from the document `status`
  (SPEC §9.1) to this field-level vocabulary:

  | Document `status` | Inherited field `verification.status` |
  | --- | --- |
  | `verified` | `verified` |
  | `draft` | `unverified` |
  | `deprecated` | `stale` |

  This mapping is the resolution, not an open question: `draft` already means
  "not independently confirmed," which is exactly `unverified`; `deprecated`
  already means the source process changed or retired, which is exactly
  `stale`. No field independently claims "deprecated" — that is a document
  lifecycle state, not a per-field verification state.

- `status` (field-level) — REQUIRED when the override is present. Closed
  vocabulary: `verified` / `unverified` / `stale`. Narrower than the
  document-level `status` enum on purpose — a field cannot independently be
  "deprecated."
- `notes` — OPTIONAL free text, same purpose as the document-level
  `verification.notes` (SPEC §9.2).
- The override exists for the case where a field's verification genuinely
  diverges from the document's last full review — e.g. a field added
  between reviews, or one flagged during a partial re-check — not as a
  per-field record every producer is expected to fill in. A schema with no
  field-level `verification` anywhere is unaffected and behaves exactly as
  today.

### 3.3 Diff reports (`CHANGELOG.md`, `changes.json`)

Two related, both new, both OPTIONAL, both **generated from
[VERSIONING.md](../../VERSIONING.md) §1's existing MAJOR/MINOR/PATCH
classification** — authoring a new version and recording what changed is one
act, not two. Neither affects whether a sibling `schema.json` conforms; same
"absence has no bearing" rule SPEC §13.5 already establishes for
`mapping.json` (GSP-0011), generalized here to every new companion artifact.

**`registry/<id>/CHANGELOG.md`** — one human-readable, append-only log per
process:

```markdown
## 1.1.0 (2026-08-01)
Added `llcMemberCount` requiredness rule. No field removed.

## 1.0.1 (2026-07-15)
Re-verified against the live source; no field changes.
```

- Lives at `registry/<id>/CHANGELOG.md` for a non-edition schema. **For a
  time-versioned schema (GSP-0005, `edition` present):** lives instead at
  `registry/<id>/<edition>/CHANGELOG.md`, one per edition. Editions version
  independently and share no change history (VERSIONING.md §4 — the 2025 and
  2024 Form 1040 editions are siblings, not successive versions), so a single
  `id`-level changelog interleaving unrelated editions' entries would not be
  meaningful. This is a resolution of a gap in RFC 0003 §4.3, which specified
  the flat path without considering the edition axis.

**`registry/<id>/<version>/changes.json`** (or
`registry/<id>/<edition>/<version>/changes.json` for an edition schema, path
extends the same way `schema.json`'s already does — no new decision needed
here):

```json
{
  "comparedTo": "1.0.0",
  "added": ["llcMemberCount"],
  "removed": [],
  "changed": ["previousEIN"]
}
```

- `comparedTo` — REQUIRED. The immediately prior `version` this diff is
  against.
- `added` / `removed` / `changed` — REQUIRED (each MAY be an empty array).
  Field `name`s (and, once accepted, `documents[].id`s and step `id`s) added,
  removed, or altered relative to `comparedTo`.
- Generated, not hand-authored, by a future `tools/` script (not built in
  this proposal) that diffs two versions' `fields`/`steps` and classifies
  each change per VERSIONING.md §1, emitting this file and the matching
  `CHANGELOG.md` entry together.
- A process's first version carries no `changes.json` — there is nothing to
  diff against.

## Explicitly deferred, not part of this proposal

Per GOV-302/GOV-325: the following were part of RFC 0003 §4 but are
deliberately **not** included here, to keep this GSP scoped to schema shape
the way GSP-0001–0014 were:

- **Automated source-change monitoring** (a scheduled re-fetch that
  recomputes `contentHash` and files an issue on mismatch) — tooling/infra,
  not a schema-shape decision. Raised separately with the Founding Engineer.
- **Risk-tiered review cadence** (`verification.riskTier`: `high` / `standard`
  / `low`, each with a different `nextReviewBy` default on
  `manual-source-review-v1`) — RFC 0003 §4.4 notes this *could* ship as a
  small schema addition alongside this GSP, but its cadence values and the
  question of who owns the monitor still need an explicit Founding Engineer
  conversation first. Deferred to that follow-up conversation rather than
  bundled into this draft.

## Open questions

- **Backfill obligation.** Do the 11 reference schemas authored before this
  GSP's acceptance need retroactive `CHANGELOG.md`/`changes.json`? Recommend
  no — both are OPTIONAL, additive companion artifacts (§3.3); authors add
  them starting with the first version bump authored after acceptance, the
  same forward-only pattern GSP-0011 used for `mapping.json` rollout.
- **`changes.json` scope once GSP-0013/0014 land.** If extended conditional
  logic or `documents[]` are later accepted, `changes.json`'s `added`/
  `removed`/`changed` lists should presumably extend to name `documents[].id`
  and step `id` changes too, not just `fields[].name`. Not decided here since
  neither construct exists yet; flagged so the follow-up tooling work doesn't
  silently scope `changes.json` to fields only.

## Decision requested

Filing this proposal is a scheduled work item per RFC 0003's sequencing
(§12) — independent of GSP-0013/GSP-0014, so it does not block or wait on
either. Acceptance into `spec/v0.3` is the one-way-door act and is requested
separately, via a CEO sign-off interaction on GOV-325 after this proposal
document merges to `main`, per [GOVERNANCE.md](../../GOVERNANCE.md) and the
precedent set by GSP-0005 and GSP-0011.
