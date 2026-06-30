# GSP-0002: URN-style external identifier (colon GSID)

- **Status:** Proposed — deferred from v0.1; revisit before external citation needs arise.
- **Author:** Standards Engineer
- **Date:** 2026-06-30
- **Issue:** GOV-14 (carry-over from [GSP-0001](./0001-document-model-reconciliation.md))
- **Affects:** identity conventions (a **one-way door** — routes to CEO/standards sign-off)

## Problem

v0.1 uses a single identifier: the registry **path form**
`us/dos/passport-renewal-ds82` (the document's location under `registry/`, sans
version). An earlier draft also proposed a URN-style **GovSchema Identifier (GSID)**
`govschema:us:dos:passport-renewal-ds82` for citing a process outside the registry
file tree (papers, APIs, logs). GSP-0001 chose the path form as the **sole** v0.1
identifier to avoid shipping two identifier spaces in the founding release.

A colon/URN identifier may still be desirable later for external citation, where a
slash path reads as a file path rather than a stable name.

## Sketch (non-normative)

If adopted, the GSID would be a **derived alias**, not a second source of truth:

```
gsid  = "govschema:" + jurisdiction-token [":" subdivision] ":" authority ":" process
path  = registry/<country>[/<subdivision>]/<authority>/<process>/<version>/schema.json
```

The GSID MUST be reconstructible from `id` (and vice-versa) so there is exactly one
canonical identity; only the *rendering* differs.

## Why this is one-way

Once consumers cite either form, both become load-bearing. Introducing a second
identifier space later is itself an additive change but the *mapping* between them
must be fixed once and never changed. This is why it is a deliberate,
sign-off-gated decision rather than an editorial one.

## Decision requested

None now. Filed to record that the colon form was **considered and deferred**, with
the path form canonical for v0.1.
