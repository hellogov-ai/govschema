<!-- Thanks for contributing to GovSchema. Please complete the checklist. -->

## What does this PR do?

<!-- New schema? Re-verification? Spec/tooling change? Briefly describe. -->

## Affected schema(s)

<!-- id(s) and version(s), e.g. us/ca/dmv/vehicle-registration-renewal 1.1.0 -->

## Checklist

- [ ] `node tools/validate.mjs` passes locally.
- [ ] `id` matches the file path; `version` matches the version directory.
- [ ] `source` cites a live government URL with a `retrievedAt` date.
- [ ] `verification` names a real practice (see `practices/`) with a current `lastVerifiedAt`.
- [ ] Re-fetched every cited URL and re-grepped every quoted claim against a
      fresh source extraction just before opening this PR (`node
      tools/verify-sources.mjs <path/to/version-dir>` — CI also checks this,
      but catch it yourself first).
- [ ] Version bump (if any) follows [VERSIONING.md](../VERSIONING.md).
- [ ] If this PR adds/changes a `registry/` document or flips a
      `discovery/catalog.json` entry to `published`: ran `npm run build-index`
      in `tools/govschema-client/` and committed the resulting
      `registry-index.json` diff.
- [ ] No personal data included.
- [ ] No claim of government endorsement, affiliation, or certification.
- [ ] I did **not** edit a previously published version directory (corrections ship as a new version).
