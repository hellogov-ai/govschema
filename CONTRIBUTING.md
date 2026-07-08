# Contributing to GovSchema

Thank you for helping build the open standard for agent–government interaction.
Contributions fall into a few kinds; each has a short path.

## Before you start

- Read the [specification](./spec/v0.1/README.md), the
  [registry layout](./registry/README.md), and [VERSIONING.md](./VERSIONING.md).
- By contributing you agree your contribution is published under the project
  licenses: schema/spec **content** under [CC-BY-4.0](./LICENSE-SCHEMAS), tooling
  **code** under [Apache-2.0](./LICENSE).
- **No personal data.** Schemas describe forms; they never contain real
  applicants' data or filled-in submissions.
- **No affiliation claims.** Do not state or imply that a schema is endorsed,
  certified, or operated by a government.

## Adding a new schema

1. Choose the path from the `id`:
   `registry/<country>/…/<process>/<version>/schema.json` (see
   [registry/README.md](./registry/README.md)). Start at `version` `0.1.0` for a
   new, not-yet-stable schema.
2. Author `schema.json` against
   [`spec/v0.1/govschema.schema.json`](./spec/v0.1/govschema.schema.json). The
   reference schemas under `registry/us/` and `registry/gb/` are good templates.
3. Cite the live source in `source` and record how you checked it in
   `verification`, naming a practice from [`practices/`](./practices/README.md).
4. Validate locally:
   ```sh
   node tools/validate.mjs
   ```
5. **Before opening the PR, re-verify your own sourcing claims — don't let the
   review gate be the first re-fetch.** A review gate has caught four
   fabricated sourcing/verification claims in this registry's history
   (invented citations, a fabricated quoted heading, a false "no AcroForm
   fields" claim, a false three-URL cross-verification) — every one was
   field-content-accurate and the fabrication was confined to the narrative
   describing *how* the schema was verified. Before opening a PR:
   - Re-fetch every URL your `schema.json` `source`/`verification` and
     `VERIFICATION.md` cite, live, right before submitting — don't rely on a
     fetch from earlier in the session. `node tools/verify-sources.mjs
     <path/to/version-dir>` automates this (see
     [`tools/README.md`](./tools/README.md#verify-sourcesmjs)); CI also runs
     it against your PR's changed files, but catching it yourself is faster
     than a round trip through review.
   - Re-extract the source PDF/page text yourself and grep for every quoted
     phrase, heading, or field label your `VERIFICATION.md` puts in quotes —
     a quote that isn't verbatim in the extracted text is a fabrication, not
     a paraphrase.
   - If you claim a document has (or lacks) an AcroForm layer, a specific
     byte size, or that multiple URLs resolve to the identical file, confirm
     each of those claims mechanically (`pdfjs-dist`, a byte/hash compare)
     rather than asserting it from memory of an earlier fetch.
6. If this schema came from a `discovery/catalog.json` candidate, flip its
   `status` to `published` and regenerate the client index — every registry
   change and every catalog status flip must be reflected here:
   ```sh
   cd tools/govschema-client && npm run build-index
   ```
   Commit the resulting `registry-index.json` diff. CI fails the build if it's
   stale (`.github/workflows/validate.yml`).

   **Run `build-index` only against a clean checkout that matches the commit
   you're authoring** — it scans the whole `registry/` working tree, so if
   another schema's uncommitted WIP happens to be sitting in the same
   checkout (e.g. a shared/dirty working tree), it will get indexed too and
   you'll commit a reference to a file that isn't actually part of your
   change (GOV-1233/GOV-1234). `git status` should show nothing but your own
   change before you run it.
7. Open a pull request using the schema PR template.

## Correcting / re-verifying a schema

Do **not** edit a published version directory — it is immutable. Instead:

1. Re-verify against the live source.
2. Add a new version directory with the bumped `version` per
   [VERSIONING.md](./VERSIONING.md) (PATCH for re-verify/annotation, MINOR for
   additive, MAJOR for breaking).
3. If the old version is superseded, set its successor relationship in the PR
   description; mark a retired source's schema `deprecated`.

## Changing the spec or tooling

Spec and tooling changes affect every schema. Open an issue first to discuss.
Breaking spec changes and stabilization (`v0.x` → `v1`) are one-way-door
decisions — see [GOVERNANCE.md](./GOVERNANCE.md).

## Pull request checklist

- [ ] `node tools/validate.mjs` passes.
- [ ] `id` matches the path; `version` matches the version directory.
- [ ] `source` cites a live government URL with a `retrievedAt` date.
- [ ] `verification` names a real practice and a current `lastVerifiedAt`.
- [ ] Every cited URL was re-fetched live just before opening the PR
      (`node tools/verify-sources.mjs <path/to/version-dir>`); every quoted
      phrase/heading was re-grepped against a fresh source extraction.
- [ ] No personal data; no affiliation/endorsement claims.
- [ ] Version bump (if any) follows VERSIONING.md.
- [ ] Relative links in `VERIFICATION.md` (e.g. to `spec/proposals/`) resolve:
      right `../` depth from the version directory, and the target filename
      exists at `main` (GSP filenames sometimes change between working title
      and publication — link the final filename, not a draft name).
- [ ] `registry-index.json` regenerated (`npm run build-index` in
      `tools/govschema-client/`, run against a clean checkout — see above) if
      a registry document changed or a catalog entry flipped to `published`.
