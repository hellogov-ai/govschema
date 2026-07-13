# Verification record — `ro/onrc/cerere-inregistrare-persoane-juridice` v1.0.0

This file is the **source-review record** for this document version, per the
`manual-source-review-v1` practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-13`
- **`maturity.level`:** `structural-reference`

This is GovSchema Standard Research cycle **GOV-2813**, advancing **Romania's
Business Formation vertical (3 of 6)**, following Taxes
(`ro/anaf/declaratie-unica-activitati-independente`, GOV-2797, 50th
jurisdiction) and DMV
(`ro/dgpci/cerere-operatiune-inmatriculari-transcrieri-radieri-provizorii`,
GOV-2804).

## Duplicate-concurrent-run check

Checked `git branch -a | grep -i onrc`, `git log --all --oneline | grep -i
onrc`, and `gh pr list --state all --search onrc` before starting — none
found an existing `ro/onrc` branch, commit, or PR. A local branch named
`ro-onrc-business-formation` existed (checked out in a sibling worktree) but
carried zero commits beyond `main`, and no uncommitted registry/conformance
files — a prior session had only fetched the source PDF and done partial,
uncommitted field extraction (preserved as scratch work under `/tmp/onrc/`
and `/tmp/pdfscratch/`) before being interrupted. That scratch work was
reviewed, corrected (see "Requiredness modeling correction" below), and
completed in this session rather than restarted from zero.

## Source verification — independently re-fetched, not trusted from scratch-work alone

- **PDF source:** `https://www.onrc.ro/templates/site/formulare/11-10-150.pdf`
  — independently re-fetched via `curl`, cross-checked against the byte-for-
  byte contents of the prior session's own uncommitted `/tmp/onrc/form.pdf`:
  - **HTTP 200**, **`Content-Type: application/pdf`**, **560,332 bytes**.
  - **`sha256`:** `a468c682e442b5ed886289b0ba5235407d7ae4fa18443ae66dafc430aa99c243`
    (computed independently via `sha256sum`; matches the prior session's own
    unfinished download byte-for-byte).
  - `Last-Modified: Wed, 08 Jan 2025 12:17:59 GMT`.
  - The URL was independently re-derived from scratch (not merely re-fetched
    from a note): found via ONRC's own "Formulare tip" (Standard forms) page,
    `https://www.onrc.ro/index.php/ro/informatii-publice/formulare-tip`, under
    the link text "Cerere de înregistrare - persoane juridice" (timp mediu de
    completare 5 minute 21 secunde).
  - **Disclosed dead end:** ONRC's separate applicant-facing portal,
    `myportal.onrc.ro`, links to what appears to be the same document at
    `myportal.onrc.ro/ONRCPortalWeb/docs/formulare_rc/CERERE%20DE%20INREGISTRARE%20-%20PJ.pdf`.
    Fetching that URL returns **HTTP 200** but `Content-Type: text/html` — an
    Angular single-page application's `index.html` shell (confirmed by
    inspecting the response body: `<app-root></app-root>` and Angular runtime
    script tags), not the PDF; that route does not serve the raw file under a
    plain fetch. The static file on ONRC's own primary site (`www.onrc.ro`,
    Apache/PHP-served) was used instead and is the source of record for this
    schema.

## PDF structure, independently confirmed via `pdfjs-dist`

- **4 pages.** Confirmed via `pdfjs-dist@3` (legacy build):
  `page.getAnnotations({intent: "display"})` returned **445 total
  Widget-subtype annotations** across the 4 pages, `/AcroForm` present, no
  `/XFA`.
- This is a deliberately **universal** ONRC form (Anexa nr. 2a): its own box
  II prints **eight** request types — registration; Romanian-entity branch
  registration; foreign-entity branch registration; recording of amendments
  ("mențiuni"); recording of operations communicated by another public
  authority/institution; deregistration; correction of a material error;
  CAEN-classification update — each gating its own block of the form. This
  v1.0.0 models **only the three registration-family request types**
  (matching this deliverable's own scope, "Cerere de înregistrare," a
  registration request), confirmed by direct visual review of the rendered
  page images (not merely inferred from widget coordinates): page 2's lower
  region (section "4. Înscriere mențiuni" and its own large sub-grid,
  sections 4.1/4.2/4.3) and page 3's upper region (sections 5 through 8:
  authority-communicated operations, deregistration, material-error
  correction, CAEN update) each print their own dozens of checkboxes/radio
  groups for amendment/deregistration/correction categories entirely
  unrelated to registration (e.g. capital increase/decrease, dissolution,
  insolvency, merger/division, share-register extracts) — confirmed visually
  to be out of scope, not merely assumed from a y-coordinate cutoff.
- Scope boundaries, re-derived per page using each widget's own y-coordinate
  range and confirmed against the rendered page images: page 1 in scope in
  full; page 2 in scope only for `y >= 520` (the tail of the foreign-branch
  subsection); page 3 in scope only for `y <= 145` (sections VI/VII); page 4
  in scope in full (sections VIII continuation/IX/X/XI/XII).
- Every widget within the registration-family scope was transcribed from the
  page's own positioned text layer and cross-checked against each widget's
  own `rect` (x/y) coordinates, since several checkbox/radio widgets are
  non-sequentially named by the PDF's own internal numbering (e.g.
  `CheckBox7` and `CheckBox7_08.01.2025_1` are adjacent on the page despite
  the dissimilar names; `CheckBox90_2` is a single shared field name across
  four radio-style widgets with export values `v1`–`v4`, confirming the
  document-communication method is one shared field, not four independent
  checkboxes).
- The submitted-documents annex table (section IX, "Opis de documente
  depuse") is bounded to the source's own seven printed rows; row 1 carries a
  pre-printed document-name label ("Hotărâre adunare generală/Directorat/
  Decizie CA") and its own Monitorul Oficial manuscript character/page-count
  note (footnote 10), confirmed via the rendered page image, and modeled as
  distinct fields from the free-text name/reference/page-count fields of rows
  2–7.

## Requiredness modeling correction (found while completing the prior session's scratch work)

The prior session's own scratch generator scripts (`/tmp/pdfscratch/
gen_schema2.mjs`, `gen_schema3.mjs`) applied the **same** `requiredWhen` gate
to every sub-field of a person/office block uniformly — including
sub-components that are optional even when the enclosing section applies
(apartment-block/staircase/floor/apartment number, e-mail, phone, website,
identity-document series/expiry, birth sector-or-county, and the EUID). Per
the spec's own definition (SPEC v0.3 `$defs.field.requiredWhen`:
"OPTIONAL condition gating this field's requiredness"), `requiredWhen` means
the field becomes **mandatory** whenever the condition holds — it is not a
mere applicability/relevance hint. Forcing e.g. `roBranchOfficeBlock`
required whenever a Romanian-branch registration is requested would wrongly
reject a branch whose registered office is a house, not a block of flats.

Corrected by demoting 53 such sub-fields from `requiredWhen` to `visibleWhen`
(same condition, `required: false`, no `requiredWhen`) — `visibleWhen` (GSP-
0013 §2) is the spec's own purpose-built primitive for "relevant/applicable
under this condition, but not thereby mandatory." This mirrors the modeling
already used, uncontroversially, for the equivalent unconditional (top-level)
fields in this same schema's own section IV (`applicantDomicileBlock`,
`applicantBirthCountyOrSector`, `applicantIdDocumentSeries`,
`applicantIdDocumentValidUntil`, etc. are all `required: false` with no gate
at all) — the correction makes the conditional (branch/new-entity) blocks
consistent with the unconditional block's own precedent, field-by-field, not
a new editorial standard invented for this schema alone. Re-validated after
the correction: both `valid-*.json` conformance fixtures (below) now pass
with zero errors using only the fields a real applicant with a non-block
address would actually have to supply.

## Scope: what is modeled as `fields[]`, and what is excluded

**Included:**
- The addressee ORCT and the applicant's own identity/domicile/representation
  capacity (section IV).
- The legal basis for the request (section V).
- All three registration-type subsections in full: new-entity registration;
  Romanian-legal-entity branch registration (branch identity/office, opening
  representative, day-to-day representative, joint-or-separate signing-
  powers choice, Romanian parent entity's own registration details); and
  foreign-legal-entity branch registration (foreign parent identity/
  registration/EUID, its representative, branch identity/office, day-to-day
  representative, joint-or-separate signing-powers choice, applicable
  national law for non-EU/EEA parents) — each gated via `requiredWhen` on its
  own top-level checkbox, the three top-level checkboxes modeled as a single
  `exclusivityGroups` entry (`registrationTypeSelection`).
- The applicant's optional requests (public hearing, plain copies, certified
  copies with specified documents, single-method document communication —
  the last modeled as one shared enum field, `communicationMethod`, not an
  `exclusivityGroups` entry, since the source implements it as four
  same-named radio-style widgets rather than four independent checkboxes).
- The designated contact person (VII), billing details (VIII), the
  submitted-documents annex table (IX), the GDPR data-processing
  acknowledgment (X), the annexes reference and declaration date (XI), and
  the depositor block (XII) — the last left **fully optional** per its own
  note 12 ("Se va completa de către deponent numai dacă este altă persoană
  decât semnatarul cererii" — completed only if the depositor differs from
  the signer), consistent with this registry's established convention of not
  inventing a yes/no gate the source itself does not print.

**Excluded**, with reasons:
- The five non-registration ONRC request types (amendments/"mențiuni",
  authority-communicated operations, deregistration, material-error
  correction, CAEN update) — out of scope for this v1.0.0 (see above);
  disclosed as backlog for a future `ro/onrc` schema against this same source
  form.
- Box III's authority-assigned registration number/date — no AcroForm widget
  on this specimen.
- The wet-ink "Semnătura"/"(Semnătura)" signature lines throughout — only
  their adjacent "Data" fields carry fillable widgets, where present.
- The form's own footnoted "Note" block — explanatory prose, not a fillable
  field.

## `documents[]` — deliberately omitted, disclosed rather than fabricated

Section IX ("Opis de documente depuse") is itself a user-completed manifest
of whatever the applicant chooses to attach — not a fixed, legally-itemized
checklist the agency prints in advance (unlike this registry's `rs/mup`
precedent, where the governing Rulebook's own Article 5 legally itemized a
numbered attachment list). Modeling section IX as ordinary, bounded `fields[]`
(7 rows) was judged the more faithful representation, so no `documents[]`
array is modeled in this v1.0.0.

## Field-count reconciliation

This schema models **221 `fields[]`**. This figure is used consistently in
this file, in the schema's own top-level `description`, and in the PR
description.

## Conformance fixtures

Under `conformance/ro/onrc/cerere-inregistrare-persoane-juridice/1.0.0/`:

Two valid scenarios (0 errors each):
- `valid-new-entity-registration.json` — a natural-person applicant (a house
  address, no block/staircase/floor/apartment) requesting new-entity
  registration (`requestNewLegalEntityRegistration: true`, the other two
  registration-type booleans explicitly `false`), a populated document-annex
  row 1 and total page count, and the GDPR/annex/declaration sections.
- `valid-foreign-branch-registration.json` — an attorney-in-fact applicant
  requesting registration of a foreign (German) legal entity's branch
  (`requestForeignLegalEntityBranchRegistration: true`), with the foreign
  parent's identity/registration/EUID, its representative, the branch's
  identity/office, the day-to-day representative, and a "separate" signing-
  powers choice.

Seven mutation controls, each raising exactly one error:

```
$ node check_onrc.mjs schema.json mutation-control-missing-required-field.json
["applicantSurname: required but missing"]
$ node check_onrc.mjs schema.json mutation-control-exclusivity-group-violation.json
["exclusivityGroup registrationTypeSelection: more than one field set (requestNewLegalEntityRegistration, requestRomanianLegalEntityBranchRegistration)"]
$ node check_onrc.mjs schema.json mutation-control-missing-conditional-new-entity-name.json
["newEntityName: required but missing"]
$ node check_onrc.mjs schema.json mutation-control-invalid-date-format.json
["declarationDate: expected type date, got string (\"13/07/2026\")"]
$ node check_onrc.mjs schema.json mutation-control-invalid-type-page-count.json
["document1PageCount: expected type integer, got string (\"two\")"]
$ node check_onrc.mjs schema.json mutation-control-value-below-minimum.json
["documentsTotalPageCount: -1 below minimum 0"]
$ node check_onrc.mjs schema.json mutation-control-invalid-enum-communication-method.json
["communicationMethod: value \"fax\" not in enum [\"posta\",\"curier\",\"mijloace_electronice\",\"sediul_orct\"]"]
```

`check_onrc.mjs` is a scratch, from-scratch conformance checker (built in
`/tmp/pdfscratch/`, never committed) that walks `fields[]`,
`required`/`requiredWhen` (`equals`/`notEquals`/truthy conditions),
`type` (including the `date` `YYYY-MM-DD` format), `validation`
(`enum`/`minimum`/`maximum`), `exclusivityGroups` (at most one `true`-valued
member per group), and an unknown-field check. Both `mutation-control-
exclusivity-group-violation.json` and every other mutation control were
built by taking the `valid-new-entity-registration.json` baseline and
changing exactly one thing, so a passing baseline plus a single deliberate
violation is what each transcript line demonstrates.

The registry's zero-dependency structural validator and its ajv-based
meta-schema validator were both run against the full registry (including
this new schema) and pass:

```
$ node tools/validate.mjs
422/422 document(s) passed. 3/3 mapping.json companion(s) passed.

$ node tools/validate-ajv.mjs
422/422 document(s) validated against the meta-schema (ajv 2020-12). 3/3 mapping.json companion(s) validated.
```

(Registry count was 421/421 before this schema — after `ro/dgpci`, GOV-2804 —
422/422 after, consistent with adding exactly one new schema and no others.)

`node discovery/check.mjs` passes (170 candidates, 155 published, 15 to
author — this deliverable was not itself a pre-listed `discovery/
catalog.json` candidate, so the count of published entries is unaffected).

`tools/govschema-client/registry-index.json` was regenerated via `npm run
build-index` inside `tools/govschema-client/`, and `npm test` there passes
(11/11 checks, including the "registry-index.json is up to date" check).

The scratch `pdfjs-dist`/`canvas` install used for PDF extraction and
rendering was done in an isolated `/tmp/pdfscratch/` scratch directory, never
inside `tools/` or `tools/govschema-client/`. Running `node tools/
validate-ajv.mjs` and `npm test` in `tools/govschema-client/` each required a
one-time `npm ci --include=dev` (their `ajv`/`ajv-formats` devDependencies
were not yet installed in this worktree) — the documented workaround for this
registry's own "local NODE_ENV=production makes `npm ci` skip ajv" gotcha,
not a scratch install.

## Scope and jurisdiction notes

- Advances Romania's **Business Formation vertical (3 of 6)**. Passport,
  Visa, and National ID & Civic Documents remain open, unscreened backlog
  candidates for Romania — not screened this cycle.
- `jurisdiction.level` is `national` — ONRC is Romania's single national
  Trade Register authority; the request is filed with a county-level ORCT,
  but the form and the registering authority are both national.
- `process.type` is `registration`, matching this registry's convention for
  the "apply to register a legal entity/branch" process family.
- `process.language` is `ro`, since the source is monolingual Romanian.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-13** (6
months). A future review should prioritize: (1) authoring the five
non-registration ONRC request types this same source form also serves
(amendments/"mențiuni", authority-communicated operations, deregistration,
material-error correction, CAEN update) as a separate `ro/onrc` schema; (2)
screening Romania's remaining three verticals (Passport, Visa, National ID &
Civic Documents) for a ready-to-author candidate.
