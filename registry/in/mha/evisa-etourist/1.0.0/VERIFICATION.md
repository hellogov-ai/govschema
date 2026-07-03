# Verification record — `in/mha/evisa-etourist` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-03`

## Why this cycle picked up India's e-Visa

This is the recurring "GovSchema Standard Research" cycle
([GOV-914](/GOV/issues/GOV-914)). The prior cycle ([GOV-900](/GOV/issues/GOV-900))
authored India's ITR-1 SAHAJ income tax return, leaving India at 4/6
verticals with two `candidate` entries remaining in `discovery/catalog.json`:
Company Incorporation (SPICe+, MCA Form INC-32) and e-Visa. SPICe+ was
deferred again — `mca.gov.in` still 403-blocks direct fetch, the same
class of bot-block already recorded for `nzta.govt.nz` and `i-kfz.de`, and
would require a dedicated headless-browser pass. The e-Visa candidate had
the stronger lead (an official sample-application PDF fetchable directly,
`indianvisaonline.gov.in/evisa/images/SampleForm.pdf`, HTTP 200), so it was
picked this cycle. This document closes the IN × Visa cell (India now
5/6 verticals; only Business Formation remains).

## Sources examined

- **Document `(id, version)`:** `in/mha/evisa-etourist` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Bureau of Immigration, Ministry of Home Affairs,
  Government of India (Indian Visa Online portal).
- **Primary source (form structure):** the official sample application
  walkthrough PDF (`evisa/images/SampleForm.pdf`, fetched directly, HTTP
  200) — a 9-screen, screenshot-based walkthrough of the online
  registration wizard.
- **Primary source (scheme rules):** the e-Tourist Visa scheme page
  (`evisa/tvoa.html`, fetched directly, HTTP 200), including its embedded
  eligibility criteria, document-requirement list, photo/scan
  specifications, port-of-arrival/exit lists, and two dated fee-schedule
  PDFs (`Etourist_fee_final.pdf`, 20-Feb-2026; `eTV_revised_fee_final.pdf`,
  15-Apr-2026).
- **Corroborating source (current field structure):** a live headless-
  browser (Playwright) pass over `indianvisaonline.gov.in/evisa/Registration`,
  needed because the sample PDF proved to be an **older/simplified
  snapshot** — its flat 5-checkbox "Visa Service" selector has been
  replaced on the live site by a single combined purpose/duration dropdown
  (`evisa_purpose`) with 70 options spanning every e-Visa category (e-Tourist,
  e-Business, e-Medical, e-Student, e-Conference, e-Transit, etc.). The
  live pass also surfaced a pre-application gating step (passport
  number/nationality/name) and an Ebola/health-screening question set not
  shown at all in the sample PDF.
- **Access blocks encountered:** `evisa/instruction.html` (the sample
  PDF's stated instructions page) now 404s — its content has been folded
  into modals on `tvoa.html`, which this document sources from instead.
  Reaching the live wizard's later pages (Applicant Details, Family
  Details, Visa Details, Additional Questions) requires solving a live
  CAPTCHA, which was not attempted; those pages' field structure and
  exact option lists are sourced from the sample PDF walkthrough instead
  (see gaps below).
- **Retrieved / reviewed:** 2026-07-03.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial
  authoring source review).

## Scope decision: e-Tourist Visa only

The e-Visa scheme covers nine categories (e-Tourist, e-Business,
e-Medical, e-Medical Attendant, e-Student, e-Family, e-Conference,
e-Transit, e-Miscellaneous, e-Production Investment), each with its own
purpose-specific sub-fields and supporting-document rules (e.g. e-Business
Sports requires a Ministry of Youth Affairs & Sports clearance letter;
e-Student requires an admission letter and bank guarantee). Consistent
with `discovery/catalog.json`'s candidate scoping
(`in/mha/evisa-etourist`, "India e-Visa (e-Tourist)"), this document
models **only** the e-Tourist Visa category (e-T1V's 30-day/1-year/5-year
variants, and e-T2V for mountaineering/trekking), via the
`eTouristVisaVariant` field. The other eight categories are out of scope
for this version and would be separate schemas (or a `visaCategory` axis
added in a future major version) if authored later.

## Known gaps (explicit, not guessed)

Per the live-browser pass, several dropdowns on later application pages
could not be confirmed in full because reaching them requires solving a
live CAPTCHA:

- **`gender`** — modelled as `male` / `female` / `transgender`, matching
  the convention already used consistently by this registry's other India
  schemas (`in/mea/passport-application-first-adult`,
  `in/morth/learners-licence-application`), not independently confirmed
  against the live e-Visa dropdown itself.
- **`religion`**, **`educationalQualification`**, **`previousVisaType`** —
  each rendered as a dropdown on the source form, but the full option list
  was not captured; modelled as free `string` fields rather than guessed
  enums.
- **`expectedPortOfExit`** — the live site's exit-checkpost list is
  broader than the confirmed `portOfArrival` list (additional airports
  plus ~34 land ICPs and several rail ICPs) and was not exhaustively
  enumerated; modelled as free `string`.
- **e-Medical Visa validity** — `tvoa.html`'s "Details of Visas" duration
  table and its own FAQ Q9 give contradictory durations (365 days vs. 60
  days). Not applicable to this document's e-Tourist-only scope, but
  flagged here since it surfaced during the same source review and would
  need a tie-breaker source (a dated MHA circular) before an e-Medical
  schema is authored from the same page.
- **Seaport count contradiction** — `tvoa.html`'s "Authorized Immigration
  Checkposts" panel states "33 major seaports" but the live
  `portOfArrival` dropdown and the FAQ's own "19 designated seaports"
  answer agree on 19; this document's `portOfArrival` enum uses the
  dropdown-confirmed 19, not the panel's 33.
- **Nationality-eligibility enforcement** — the `nationality` field cannot
  itself encode the scheme's per-country eligibility/fee rules (e.g.
  Pakistan nationals excluded entirely; mainland China absent from both
  fee schedules; Bhutan/Nepal nationals visa-exempt by treaty). Flagged in
  the field's own `description`; not modelled as a hard validation gate.

## Mock-data test run

Per the issue's phase-4 instruction to test-run the schema with valid mock
data, two representative scenarios were authored and checked field-by-field
against every `type`/`required`/`requiredWhen`/`visibleWhen`/`enum`/
`maxLength`/eligibility constraint in `schema.json`, using a one-off Python
condition evaluator (not committed to the repo) implementing the same
`equals`/`notEquals`/`in`/`greaterThan`/`all`/`any`/`not` grammar as
GSP-0013's `Condition` schema (spec v0.3 §8.1).

**Scenario 1 — UK tourist, 30-day e-Tourist Visa, first visit to India:**
Oliver Hart, a British ordinary-passport holder flying into Delhi for
sightseeing, no Ebola-region travel, no prior India visit, no other valid
passport, single, permanent address same as present.

**Scenario 2 — South African mountaineer, e-T2V, repeat visitor, Ebola-
region travel history:** Thandiwe Nkosi, a South African national with a
British Overseas Citizen passport also held, travelling for a
mountaineering/trekking expedition (e-T2V), who visited an Ebola-affected
territory more than 21 days ago (triggering and clearing the health-
screening follow-ups), previously held an e-Tourist Visa and visited
India before, has a distinct permanent address from her present address,
and visited a SAARC country in the last 3 years.

Both runs:

```
PASS — Scenario 1 - UK tourist, 30-day e-Tourist Visa, first visit to India satisfies every type/required/requiredWhen/visibleWhen/enum/maxLength/eligibility constraint.
PASS — Scenario 2 - South African mountaineer, e-T2V, repeat visitor, Ebola-region travel history satisfies every type/required/requiredWhen/visibleWhen/enum/maxLength/eligibility constraint.
```

A deliberately-broken variant of Scenario 1 (dropping `declarationOfCorrectness`
and flipping `visitedEbolaAffectedCountriesLast21Days` to `true` without its
two gated follow-up questions) was also run, to confirm the evaluator itself
correctly detects violations rather than passing everything by construction:

```
FAIL — Scenario 1 (deliberately broken) - sanity check:
  - MISSING required field 'completed21DaysSinceEbolaTerritoryExit'
  - MISSING required field 'hasEbolaSymptomsOrDisease'
  - MISSING required field 'declarationOfCorrectness'
```

Scenario 2 also correctly triggered every `requiredWhen`-gated follow-up
(the Ebola-exposure sub-questions, the other-passport detail fields, the
name-change detail, the permanent-address fields, and the full previous-
visit block), while Scenario 1 (no Ebola exposure, no other passport, no
name change, address unchanged, first visit) correctly required none of
them.

Both registry validators were run against the schema document itself and
pass:

```
$ node tools/validate.mjs registry/in/mha/evisa-etourist/1.0.0/schema.json
ok   registry/in/mha/evisa-etourist/1.0.0/schema.json

$ node tools/validate-ajv.mjs registry/in/mha/evisa-etourist/1.0.0/schema.json
ok   registry/in/mha/evisa-etourist/1.0.0/schema.json [v0.3]
```

## Why most fields here are required

Unlike this registry's tax-return schemas (which review a pre-filled
return), the e-Visa application is filled from scratch by the applicant,
and the live site's own asterisked fields mark the large majority of
questions mandatory. `required: false` (or `requiredWhen`) is reserved for
fields the source form itself marks optional or conditional: the second
official-language name lines are not applicable here (this is an English-
only online form, unlike the paper Form 6 voter-registration precedent),
`surname` (the form allows a blank surname when the passport carries none),
the name-change/other-passport/permanent-address/previous-visit detail
blocks (each gated on its own boolean), and the free-text fields flagged
above as unconfirmed dropdowns.

## Not modelled (system-derived, or out of this version's scope)

- **Duration and number of entries** are not separate input fields: the
  live site derives them from the single `eTouristVisaVariant` selection
  (e.g. selecting the 5-year variant fixes both "5 years" validity and
  "Multiple" entries), matching this registry's "don't model what the
  source computes for the filer" precedent.
- **CAPTCHA**, the read-only "Confirm Details" verification-page summary,
  and payment-gateway redirection are not modelled — they are wizard/UI
  mechanics, not applicant-supplied data.
- The eight non-tourist e-Visa categories (see Scope decision above).

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer completes a live walkthrough
of `indianvisaonline.gov.in/evisa/Registration` past the CAPTCHA gate,
confirms the exact option lists flagged as gaps above (gender, religion,
educational qualification, previous-visa-type, full exit-checkpost list),
and records the outcome here — shipping a new schema version if
discrepancies are found (VERSIONING.md §3, immutability).

## Scope and jurisdiction notes

- Conditional requiredness/visibility is expressed with `requiredWhen`
  (GSP-0013), targeting spec v0.3. `fieldRole: eligibility` /
  `eligibleValues` (GSP-0018) is used for the Ebola 21-day-clearance
  question and the two mandatory declaration checkboxes, following the
  same pattern as `au/homeaffairs/eta-application-601`.
- Unlike this registry's other Visa-vertical schemas (which model an
  origin-country's outbound visa application), this is a **destination-
  country** e-Visa: India is the destination and the applicant is a
  foreign national — the same modelling stance as
  `sg/ica/entry-visa-application`.
- India's vertical coverage is now **5/6** (Passport, DMV, National ID &
  Civic Documents, Taxes, Visa). Business Formation (SPICe+, MCA Form
  INC-32) remains `candidate` in `discovery/catalog.json` for a future
  cycle, blocked on `mca.gov.in`'s bot-block pending a headless-browser
  pass.

## Re-verification

Per the practice's Cadence, `nextReviewBy` is set to **2027-01-03** (6
months).
