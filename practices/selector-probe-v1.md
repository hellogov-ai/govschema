# Practice: selector-probe-v1

**Identifier:** `selector-probe-v1`
**Type:** automated, headless-browser probe
**Status:** active

## Purpose

Confirm, by driving a headless browser against the live web page named in a
`mapping.json` companion's `source.url`, that each field's candidate
[locators](../spec/proposals/0011-field-page-element-mapping.md) still resolve
to an element on the page.

This practice checks **selector freshness only** — whether the DOM still
contains something each locator can find. It says nothing about whether the
*content* of a schema's fields, labels, or validation still matches the live
form; that is `manual-source-review-v1`'s job, tracked on the sibling
`schema.json`'s own `verification` block. The two verification records are
independent by design (GSP-0011): a schema can be content-verified while its
mapping's selectors have drifted, and vice versa. Never read one as a proxy
for the other.

## Procedure

1. **Load the page.** Launch a headless browser, navigate to `mapping.json`'s
   `source.url`, and wait for the page to reach a stable, interactive state
   (network-idle or an equivalent readiness signal for the page's framework).
2. **Per-field resolution.** For each entry in `fields`, walk its `locators`
   array **in order** and attempt to resolve each locator signal against the
   live DOM (e.g. find a `<label>` whose text equals a `label-text` value, an
   element with the given `name` attribute for `name-attr`, and so on per the
   vocabulary in GSP-0011). A field **passes** the probe as soon as one locator
   in its list resolves to exactly one element; a field with zero resolving
   locators, or a locator resolving to more than one element (ambiguous), is
   flagged.
3. **Record the result per field**, not just for the document as a whole —
   which locator resolved (or that none did) is what tells a maintainer whether
   to reorder the list, add a new signal, or fix the mapping entirely.
4. **Update the mapping's own record.** Set `verification.lastVerifiedAt` to
   today and `nextReviewBy` per the cadence below. This practice never touches
   the sibling `schema.json`'s `status` or `verification` block — those are
   `manual-source-review-v1`'s to set.
5. **On a flagged field.** Ship a new `mapping.json` `mappingVersion` (semver;
   a locator fix is not a breaking change to anything else that depends on the
   artifact, but the artifact itself changed) rather than silently editing
   locators in place with no version signal. If every locator for a field is
   gone, either add a corrected locator or drop the field from `mapping.json`
   (partial coverage is permitted — GSP-0011).

## Cadence

Default `nextReviewBy` is **30 days** after `lastVerifiedAt` — markedly shorter
than `manual-source-review-v1`'s 6 months, because DOM/selector drift (a
redesign, a framework migration, an A/B test) happens on a much faster clock
than a form's legal content. A consuming agent should treat a `mapping.json`
past its `nextReviewBy` the same way it treats a lapsed schema: as unverified,
falling back to a purely descriptive read of `schema.json` (no page-element
targeting) until a fresh probe runs.

This practice is a natural candidate for a scheduled/CI job rather than a
one-off human action, since it checks DOM presence, not legal meaning — but
running it on a schedule is an operational choice for whoever hosts the probe,
not a requirement of the practice itself.

## Limitations

This practice confirms a locator *resolves*; it does not confirm the resolved
element is semantically the right one (a redesign could reuse an old `name`
attribute for an unrelated field). It also depends on the page being reachable
and rendering without requiring authentication the probe cannot supply — a page
gated behind login (as is common for the online step of a renewal or
application flow, distinct from its public informational page) is out of scope
for this practice as specified; probing an authenticated flow is future work.
