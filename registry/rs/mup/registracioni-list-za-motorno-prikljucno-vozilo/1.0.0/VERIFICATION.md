# Verification record — `rs/mup/registracioni-list-za-motorno-prikljucno-vozilo` v1.0.0

This file is the **source-review record** for this document version, per the
`manual-source-review-v1` practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-13`
- **`maturity.level`:** `structural-reference`

This is GovSchema Standard Research cycle **GOV-2774**, opening **Serbia's
DMV vertical (4 of 6)**, following Business Formation
(`rs/apr/jrpps-pr-sole-proprietor-registration`, GOV-2725, 48th
jurisdiction), Visa (`rs/mfa/visa-application`, GOV-2760), and Taxes
(`rs/purs/pp-gpdg-godisnji-porez-na-dohodak-gradjana`, GOV-2767).

## Duplicate-concurrent-run check

Checked `git branch -a | grep -i rs-mup` and `git log --all --oneline |
grep -i "rs/mup"` before starting — neither found an existing `rs/mup`
branch, commit, or PR, so no reconciliation was needed this cycle.

## Source verification — independently re-fetched, not trusted from the task brief alone

- **PDF source:** the MUP-hosted consolidated text of the "Pravilnik o
  registraciji motornih i priključnih vozila" (Rulebook on registration of
  motor and trailer vehicles):
  `https://www.mup.gov.rs/wps/wcm/connect/44c46b7a-3229-4e6f-a6ea-01d518ffb87b/pdf-lat-Правилник+о+регистрацији+моторних+и+прикључних+возила.pdf?MOD=AJPERES&CVID=og9ft-Z`
  — fetched via `curl -sL`, both with the literal Cyrillic filename and
  with it percent-encoded (both resolve to the same document; the
  percent-encoded form is what is recorded in `source.url` since ajv's
  `uri` format keyword rejects literal non-ASCII characters):
  - **HTTP 200**, **`Content-Type: application/pdf`**, **2,018,355
    bytes**.
  - **`sha256`:**
    `6d41e2f39d056f9ce8651104e83c0965c64eed53ece983e326aeb4b80939a965`
    (computed via `sha256sum`), reproduced identically across three
    separate fetches (two via the percent-encoded URL, one via the
    literal-Cyrillic URL).
  - Domain `mup.gov.rs` (Ministry of Interior) is the correct, official
    first-party agency for Serbian vehicle registration.

## PDF structure, independently confirmed via `pdfjs-dist`

- **92 pages.** Confirmed via `pdfjs-dist@3` (legacy build):
  `page.getAnnotations({intent: "display"})` returned **0 Widget-subtype
  annotations on every page checked** — a flat, non-AcroForm consolidated
  legal text, not a fillable PDF.
- **Located Obrazac 1** by scanning `getTextContent()` across all 92 pages
  for "Obrazac 1"/"REGISTRACIONI LIST" — found on **pages 37-39** (page 40
  begins "Obrazac 2 SAOBRAĆAJNA DOZVOLA", confirming the annex's own
  boundary).
- **Extracted the full x/y-positioned text layer** for pages 37-39 (every
  `getTextContent()` item's string, x, and y), then **rendered pages
  37-39 to PNG** via `pdfjs-dist@3`'s legacy build + `node-canvas`
  (`standardFontDataUrl` pointed at the bundled `standard_fonts/`
  directory), and visually cross-checked the render against the
  positioned-text transcript. Both independently confirm: the annex is a
  **plain caption-and-blank-line layout** — every field is a label
  followed by a colon and a blank line/space to fill in by hand or
  typewriter; there are **no boxes, checkboxes, or table rulings** in the
  PDF's own content stream (unlike, e.g., `co/runt`'s spreadsheet-derived
  form). The task brief's description of "procedure-type checkboxes" did
  not hold up under this direct re-derivation — `VRSTA POSTUPKA` (type of
  procedure) is a single blank line with a parenthetical numeric legend
  (0-7) printed immediately below it, not a checkbox row, so it is
  modeled as one `enum` field (`procedureType`) rather than independent
  booleans or an `exclusivityGroups` entry — consistent with this
  registry's own precedent for the same class of single-choice printed
  field (e.g. `co/runt`'s `tramiteType`, an 18-value enum for an
  equivalent multi-procedure form).
- **Cross-checked every EU-style vehicle code (J, D.1-D.3, E, F.1, G, K,
  P.1-P.3, Q, S.1-S.2, P5, L, R) against the Rulebook's own Article 4**
  (page 4 of the PDF, which lists the codes in the same order they appear
  on Obrazac 1) **and Article 10** (page 10, which repeats and further
  defines several codes, including confirming `H` — "važenje
  registracije" — is defined as "the date when the registration plates
  are replaced"). Every code's meaning matches exactly between Obrazac 1's
  own printed labels and the Rulebook's own defining articles.
- **Cross-checked the form's full content against the Rulebook's own
  Article 5**, which legally itemizes, numbered 1-14, everything
  Obrazac 1 contains — this is the primary grounding for every scoping
  decision below, and is a stronger source than this registry's usual
  "visually confirm the office-only column" precedent (e.g. `rs/mfa`'s
  consular column, `jo/mfa`'s "For Official Use" sidebar), since the
  distinction here is stated by the legal text itself rather than
  inferred from layout alone.

## Scope: what is modeled as `fields[]`, and what is excluded

**Included** (Article 5's items 1, 2, and — on the form's own "second
page" — items 1 and 4-12):
- Vehicle data (item 1): the 17 EU-coded fields plus `yearOfProduction`,
  `bodyworkShape`, and `loadCapacityKg` (Article 5 lists these three
  alongside the coded items even though none carries its own EU-style
  letter code).
- Technical-inspection data (item 2): the inspecting body's name/seat/
  code/ID number, its `vehicleTechnicallySound` statement (Article 5's
  own phrase: "konstatacija o tehničkoj ispravnosti vozila"), inspection
  date, controller, and note.
- Procedure type (second-page item 1): `procedureType`, an 8-value enum.
- Owner data (item 4), user data (item 5, left fully optional since the
  form prints no yes/no gate ahead of this block and a vehicle's user
  frequently is its owner), representative data (item 6, likewise left
  optional).
- Permit/temporary-registration-certificate/sticker data (item 7) and
  insurance data (item 8).
- Change-of-plates (item 9), change-of-permit (item 10), change-of-sticker
  (item 11), and deregistration (item 12) data — each gated via
  `requiredWhen` on the matching `procedureType` value (`change_of_plates`,
  `change_of_registration_certificate`, `change_of_registration_sticker`,
  `deregistration` respectively). This gating is grounded directly in the
  Rulebook's own Article 5, which describes this single form as covering
  every one of these procedures via the same `VRSTA POSTUPKA` code — not
  an invented gate. Per this registry's documented `requiredWhen`
  gotcha, every one of these gates uses an explicit `equals` check
  against a real enum value, never `notEquals ""` against an optional
  field.

**Excluded** (Article 5's second-page items 2, 3, 13, and 14 — the
deciding authority's own intake/decision/processing-officer data, not
applicant-submitted content):
- Item 2, "datum prijema zahteva" (date the request was received) — an
  office-intake timestamp.
- Item 3, "podatke o nazivu organa koji odlučuje o zahtevu" (data on the
  name of the authority deciding on the request): the police
  administration (PU) and station (PS), or the authorized legal entity
  handling sticker issuance, together with its seat, registration number,
  and authorization number/date. This is the direct analogue of
  `co/runt`'s excluded "Organismo de Tránsito" identification box and
  `rs/mfa`'s excluded consular-only column, except here the exclusion is
  grounded in the Rulebook's own explicit, separately numbered legal item
  rather than inferred from a printed box boundary.
- Item 13, "odluku o zahtevu" (the decision on the request): the
  certificate number/date, the dates the certificate/sticker/plates and
  the permit were collected, and two owner/representative signature
  lines acknowledging that collection. Excluded as the deciding
  authority's own transactional record of a later collection event, not
  data the applicant supplies when submitting the request.
- Item 14, "podatke o ovlašćenom licu koje je obradilo zahtev" (data on
  the authorized person who processed the request): the processing
  officer's own surname, first name, JMBG, and signature.

## Documents

`documents[]` models the six mandatory attachments Article 5's own
closing paragraph lists ("Uz zahtev iz stava 1. ovog člana prilaže se:
...", items 1-6): the technical-soundness certificate (with the source's
own "ne sme biti stariji od 30 dana" / not older than 30 days freshness
requirement modeled via `freshness.issuedWithin: P30D`), the mandatory
third-party liability insurance policy, proof of settled customs/tax
duties, proof of payment of the registration fee, proof of ownership/
origin (gated via `requiredWhen` on `procedureType` equals
`registration_in_unified_registry`, since the source's own condition —
"ako se vozilo prvi put upisuje u registar ili prilikom promene
vlasništva", i.e. first registration or a change of ownership — maps
onto that single procedure code; the form's own `VRSTA POSTUPKA` legend
has no separate code for a change of ownership), and proof of the
owner's identity.

One disclosed judgment call: the other five documents (all but the
ownership-proof one) are modeled with an unconditional `required: true`,
matching Article 5's own attachment list, which is stated generally for
"the request referred to in paragraph 1" without narrowing to a specific
`VRSTA POSTUPKA` code. In practice this may over-require some documents
for narrower procedures (e.g. a technical-soundness certificate for a
pure deregistration); a future review with direct access to MUP's own
per-procedure checklists (if published) should reconsider narrowing these
via `requiredWhen` gates on `procedureType`.

## Field-count reconciliation against the task brief's estimate

The task brief estimated "~55-60 discrete fields." This document models
**64 fields**. The difference is fully accounted for by the four
procedure-specific blocks (change of plates/permit/sticker,
deregistration — 13 fields together), which the brief's own field-code
list did not anticipate but which Article 5 confirms are genuinely part
of this same form (each keyed to its own `VRSTA POSTUPKA` code), and are
disclosed here rather than silently trimmed to hit the estimate.

## Conformance fixtures

Two valid scenarios (0 errors each):
- `valid-first-registration-owner-only.json` — `procedureType:
  registration_in_unified_registry`, a natural-person owner with no
  separate user/representative, `proofOfOwnershipOrOrigin` provided.
- `valid-sticker-change-with-user-and-representative.json` —
  `procedureType: change_of_registration_sticker`, a legal-entity owner
  with a separate natural-person user and a representative acting under
  a power of attorney, exercising the optional user/representative blocks
  and the sticker-change conditional block; `proofOfOwnershipOrOrigin`
  correctly omitted since this procedure code does not require it.

Eight mutation controls, each raising exactly one error:

```
$ node check.mjs schema.json mutation-control-missing-required-field.json
["vehicleBrand: required but missing"]
$ node check.mjs schema.json mutation-control-invalid-enum-value.json
["procedureType: value \"unicorn_procedure\" not in enum [...]"]
$ node check.mjs schema.json mutation-control-invalid-type-engine-power.json
["enginePowerKw: expected type number, got string (\"110\")"]
$ node check.mjs schema.json mutation-control-invalid-date-format.json
["technicalInspectionDate: expected date (YYYY-MM-DD), got \"01/07/2026\""]
$ node check.mjs schema.json mutation-control-missing-required-document.json
["document technicalSoundnessCertificate: required but not provided"]
$ node check.mjs schema.json mutation-control-missing-conditional-ownership-document.json
["document proofOfOwnershipOrOrigin: required but not provided"]
$ node check.mjs schema.json mutation-control-missing-conditional-sticker-change-field.json
["stickerChangeReason: required but missing"]
$ node check.mjs schema.json mutation-control-value-below-minimum.json
["massKg: -5 below minimum 0"]
```

`check.mjs` is a scratch, from-scratch conformance checker (built in
`/tmp`, never committed) that walks `fields[]`/`documents[]`,
`required`/`requiredWhen` (evaluating the shared `condition` grammar),
`type`, and `validation` (`enum`/`minimum`/`maximum`/`minLength`/
`maxLength`/`pattern`), plus an unknown-field check. All ten fixtures
(two valid, eight mutation controls) were run against it; both valid
fixtures returned `[]` and every mutation control returned an array of
exactly one error string, matching the results above.

The registry's zero-dependency structural validator and its ajv-based
meta-schema validator were both run against the full registry (including
this new schema) and pass:

```
$ node tools/validate.mjs
417/417 document(s) passed. 3/3 mapping.json companion(s) passed.

$ node tools/validate-ajv.mjs
417/417 document(s) validated against the meta-schema (ajv 2020-12). 3/3 mapping.json companion(s) validated.
```

Two ajv findings were fixed before this run: (1) `source.url`'s literal
Cyrillic filename failed ajv's `uri` format check, so the URL is recorded
percent-encoded (re-fetched and confirmed byte-for-byte identical to the
literal-Cyrillic form); (2) the two conditionally-required `documents[]`
entries initially carried a `description` property, which the v0.3
`document` `$def` does not permit (`additionalProperties: false`) — the
explanatory prose was folded into each entry's `sourceRef` instead.

The scratch `pdfjs-dist`/`canvas` install used for PDF extraction and
rendering was done in an isolated `/tmp` scratch directory, never inside
`tools/` or `tools/govschema-client/`. Running `node tools/validate-ajv.mjs`
itself required a one-time `npm ci --include=dev` inside `tools/` (its
`ajv`/`ajv-formats` devDependencies were not yet installed in this
worktree) — this is `tools/`'s own `package.json`-declared dependency
set, not a scratch install, and is the documented workaround for this
registry's own "local NODE_ENV=production makes `npm ci` skip ajv" gotcha.

`tools/govschema-client/registry-index.json` was regenerated via `npm run
build-index` inside `tools/govschema-client/`.

## Scope and jurisdiction notes

- Opens Serbia's **DMV vertical (4 of 6)**. Passport and National ID
  remain open, and both were screened and confirmed dead ends this same
  cycle (in-person/biometric appointment only, no downloadable current
  application form) — see `CATALOG.md`'s "Known Gaps & Opportunities" for
  the disclosed screening record, including a weak voter-registration-
  abroad candidate at MFA left as thin backlog.
- `jurisdiction.level` is `national` — MUP is Serbia's national interior/
  police authority, and vehicle registration is a nationally-uniform
  procedure (administered locally by police administrations/stations and
  by authorized private legal entities for sticker issuance, but governed
  by this single national Rulebook and form).
- `process.type` is `registration`, matching `co/runt`'s and
  `rw/rra`'s own convention for the equivalent DMV-vertical form type.
- `process.language` is `sr`, matching `rs/apr` and `rs/mfa`'s own
  convention for this jurisdiction, since the source is monolingual
  Serbian (Latin transliteration, per the PDF's own "pdf-lat-" filename
  prefix).

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-13** (6
months). A future review should prioritize: (1) confirming whether MUP
publishes any per-procedure attachment checklist that would let the five
currently-unconditional `documents[]` entries be narrowed with
`requiredWhen` gates; (2) re-screening Serbia's Passport and National ID
verticals, both confirmed dead ends this cycle but potentially revisited
if a downloadable form is published; (3) the disclosed weak MFA voter-
registration-abroad candidate (`.doc` format, ~10 fields) as thin
backlog if no stronger candidate emerges first.
