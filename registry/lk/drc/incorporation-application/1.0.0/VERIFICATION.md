# Verification record — `lk/drc/incorporation-application` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-17`

This is a `GovSchema Standard Research` cycle (**GOV-3499**). Sri Lanka had 5
of 6 verticals covered in this registry before this cycle (Passport, National
ID, DMV, Taxes, Visa) — this schema opens **Business Formation**, closing Sri
Lanka to **6 of 6 verticals**.

## Why this candidate

The prior cycle (GOV-3491) re-scanned the By-Jurisdiction table for
single-vertical-gap jurisdictions — a faster-converging heuristic than always
deepening whichever jurisdiction is currently hot — and scouted Sri Lanka's
Business Formation gap alongside three other candidates. It found the
Department of the Registrar of Companies' (DRC) own 34-page "USER GUIDE eROC
SYSTEM Incorporation (Public Interface)" PDF (prepared by KPMG Sri Lanka for
DRC): unauthenticated, screenshot-annotated, and left as disclosed,
ready-to-scope backlog rather than authored that same session, since the
primary incorporation form (Form 1) is system-generated only inside the
login-gated eROC portal itself, with no separate downloadable blank
specimen — meaning this User Guide's own worked-example screenshots are the
only field-level source available.

This cycle independently re-verified the candidate was still live before
committing to it: re-fetched the PDF fresh
(`https://erocapiv2.drc.gov.lk/pdf/3.6.1(a)Incorporation_Frontend.pdf`),
confirmed HTTP 200, `Content-Type: application/pdf`, no login/CAPTCHA/WAF
gate (only a routine load-balancer session cookie,
`TS01e64a35=...`, on the same live subdomain that also serves the eROC portal
itself), sha256:658e20cc709005a68571c3c025716ffed5372928ea3857e4fe04db63abb38723,
2,892,246 bytes, 34 pages (confirmed via `pdfjs-dist` page count),
`Last-Modified: Fri, 17 Jan 2025`.

The DRC's top-level domain, `drc.gov.lk`, was separately confirmed live this
cycle (HTTP 302 redirect to `www.drc.gov.lk/intro/`) as the authority record's
`url`.

## Extraction technique

Every field label in this source lives inside an embedded screenshot image,
not the PDF's extractable text layer — confirmed by extracting the full text
layer first (`pdfjs-dist`), which contains only narrative instructions and
"Figure N.N" captions, never the screenshots' own on-screen field labels.
Every one of the 34 pages was rendered to a raster image with `pdfjs-dist` +
`node-canvas` at 2.5x scale, then read directly (the same zoomed-image-
transcription technique this registry used for
`kz/kgd/individual-income-tax-declaration-schedule-220-01`, GOV-3484, and
`mx/ine/credencial-para-votar-application`, GOV-3491). The guide's own
Section 11, "Incorporating a Company after Obtaining Approval for the Name"
(pages 22-31, Figures 1.29-1.42), is the actual incorporation-application
data-entry flow this schema models; Sections 2-10 (the separate, earlier
Name Reservation procedure and its own re-submission/editing/cancellation
variants, pages 7-23) produce the company name that Section 11 then carries
in as fixed, read-only context — confirmed via a zoomed render of Figure
1.30, where "Name In English/Sinhala/Tamil" carry no asterisk and sit
visually distinct from the editable, asterisk-marked fields beneath them.

**Note on a background-agent crash:** an earlier attempt this cycle to
delegate the full fetch→transcribe→author→PR pipeline to a worktree subagent
crashed mid-run before any commit landed. The crashed run's own scratch
workspace (`/tmp/lk-drc/`) was salvaged rather than discarded — it already
contained the fetched PDF, its sha256/byte-size, the full 34-page raster
render set, and the extracted text layer, all independently reusable — and
the field transcription, schema authoring, and validation were completed
directly in this session from that salvaged state rather than re-running the
fetch/render step a second time.

## Scope and disclosed boundaries

This schema scopes to the simplest incorporation case matching the guide's
own worked example: a single company address, a single business-objective
selection, and exactly one natural-person Director, one natural-person
Secretary, and one natural-person Shareholder — the same single-founder/
single-officer scoping convention this registry already applies to company-
formation schemas elsewhere (e.g. `kz/moj/state-registration-limited-
liability-partnership`, `am/moj/state-registration-limited-liability-
company`). Disclosed, not modelled:

- **Multiple directors/secretaries/shareholders.** The guide's own
  Stakeholders screen (Figure 1.34) supports adding any number of each role
  via repeated "ADD NEW" actions; GovSchema's repeating-groups proposal
  (GSP-0009) is not yet part of the accepted v0.3 specification, so this
  schema scopes to exactly one of each.
- **Corporate (non-natural-person) stakeholders.** The "Add New Director"
  screen (Figure 1.35) only shows a natural-person NIC-based form; the guide
  gives no visible screen for a corporate director/secretary/shareholder in
  the pages reviewed.
- **The approved company name itself** (English/Sinhala/Tamil) and the
  Name Reservation procedure that produces it (Sections 7-10, its own
  re-submission/name-editing/cancellation variants) — a separate, earlier
  eROC procedure, out of scope for this incorporation-application schema.
- **Inland Revenue and Labour Department sections** (page 28-29) — both
  explicitly labelled "(optional)" in the wizard's own top navigation, with
  a "SKIP" option described in the guide's own text.
- **The Payments section** — a system-computed fee and online card-payment
  flow, consistent with this registry's general practice of not modelling
  fee amounts or payment-processing steps as applicant-entered fields.
- **The minimum-required-natural-persons count** the guide's own text says
  is enforced and displayed at the foot of the Stakeholder menu — not
  printed as a specific number anywhere in the pages reviewed this cycle,
  and in any case system-displayed guidance rather than applicant input.
- **A Shareholder "same as Director/Secretary" toggle.** The guide's own
  worked example re-enters the same natural person (Sahani Perera) as two
  separate stakeholder entries — once as Secretary, once as Shareholder — and
  no checkbox anywhere in the guide's visible screens generalizes the
  "Make this Director as a Secretary" checkbox to the Shareholder role. This
  schema models `shareholder*` as its own always-required block; an
  applicant may in practice re-enter a director's or secretary's own
  NIC/name/address values there, which this schema permits without a
  dedicated toggle field, since none is shown in the source.
- **The four directory-backed dropdowns** (Province/District/City/GN
  Division for the company and for each stakeholder's local address, plus
  Main/Sub Objective selections) have no published closed value list in the
  guide's own text — all seven are modelled as free strings rather than
  invented enums, consistent with this registry's established treatment of
  unpublished directory dropdowns (e.g. `kz/moj`'s `bankName`/`bankBranch`).
- **Postal code** is modelled as a loosely-bounded 4-5 digit string rather
  than a strict published pattern: the guide's own worked example value,
  "2828", is 4 digits, which is its own demo data, not evidence of a
  confirmed national postal-code standard.

## Conformance fixtures

10 fixtures are committed under
`conformance/lk/drc/incorporation-application/1.0.0/`: 2 valid submissions
(0 errors each — one full submission with the Director/Secretary modelled as
two distinct natural persons, exercising the `requiredWhen`-gated Secretary
block; one minimal submission with `directorAlsoActingAsSecretary: true`,
omitting every Secretary field) and 8 mutation-control fixtures (each
expected to raise exactly 1 error): a missing required
`companyAddressLine1`, a missing required `companyEmail`, an invalid
`companyEmail` pattern, a missing required `directorNicNumber`, an invalid
`directorNicNumber` pattern, a missing `secretaryNicNumber` when
`directorAlsoActingAsSecretary` is `false` (the `requiredWhen` branch), a
missing required `shareholderNicNumber`, and an unknown-field rejection. All
10 were checked with a from-scratch, throwaway Node mock validator
implementing this schema's own `required`/`requiredWhen`/`validation` rules
(not committed, per this registry's established per-cycle practice). Both
`tools/validate.mjs` and `tools/validate-ajv.mjs` pass at 531/531 across the
full registry with this schema added.

## Known gaps

- Multi-founder/multi-officer, corporate-stakeholder, branch/foreign-company
  variants of the same eROC incorporation flow are disclosed, open backlog
  for a future minor-version cycle — see "Scope and disclosed boundaries"
  above.
- The antecedent Name Reservation procedure (Sections 7-10 of the same
  guide) is a distinct, disclosed backlog candidate for a future cycle,
  should this registry choose to model the full company-formation journey
  end-to-end rather than just the incorporation step.

## Verification method assessment

`manual-source-review-v1` — a human/agent read the primary source directly
and transcribed its fields. No automated re-verification tooling exists yet
for this schema; `nextReviewBy` is set 6 months out per the practice's
default cadence.
