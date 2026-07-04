# Verification record — `ca/elections-canada/voter-registration` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-04`

## Why this cycle picked up Canadian federal voter registration

This is the recurring "GovSchema Standard Research" cycle
([GOV-960](/GOV/issues/GOV-960)). A per-country x per-vertical coverage
audit of the registry found that of the 11 jurisdictions currently
covered, only Australia (AEC), the United States (state-level: CA, FL),
India (ECI), and the United Kingdom (Cabinet Office) have a National ID &
Civic Documents-vertical voter-registration schema; Canada did not,
despite `ca/cra`, `ca/esdc`, and `ca/ircc` already establishing Canada as
a covered federal jurisdiction. The issue's own notes list "remaining
voter registration" as an explicit target for this vertical. Before
committing to this candidate, a DMV-vertical vehicle-registration/tag/title
gap across seven jurisdictions (AU, SG, CA, IE, NZ, IN, NL — all of which
have a driving-licence schema but none have vehicle registration) was also
investigated; the two most concrete leads there (Ontario ServiceOntario
licence-plate renewal, Ireland VRT) both turned out to be either
lookup/session-gated past the first data-entry screen (Ontario requires a
real, already-issued plate + permit number to proceed past Step 2) or
primarily a business/authorised-trader online-filing flow (Ireland VRT's
ROS channel), consistent with this registry's existing preference for
document- or directly-observable-flow-sourced schemas over ones requiring
credentials this environment cannot supply. Elections Canada's Online
Voter Registration Service, by contrast, is a fully public, unauthenticated,
directly walkable wizard — the same shape that has worked cleanly for
this registry's other voter-registration schemas (AU AEC, GB Register to
Vote, IN Form 6).

## Sources examined

- **Document `(id, version)`:** `ca/elections-canada/voter-registration` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Elections Canada, under the Canada Elections Act.
- **Primary source (live walkthrough):** the Online Voter Registration
  Service at <https://ereg.elections.ca/en/ereg/index> (version
  `2.3.17.0` per its own footer), driven end-to-end with a headless
  Chromium browser (Playwright) using a real, non-fictional-format
  Canadian postal code (`K1A 0A6`, Ottawa/Parliament Hill) and clearly
  representative mock personal data (Jordan Tremblay, DOB 1990-06-15).
  Every field name, `id`/`name` attribute, `required` flag, `maxlength`,
  and HTML5 `pattern`/`data-msg` validation attribute cited in
  `schema.json`'s `sourceRef`s was read directly from the live page's DOM
  (via Playwright's `$$eval`), not paraphrased from visual inspection —
  including `AddressNumber`'s own client-side validation regex
  (`^[0-9]{1,6}\s*$`) and error message (`Invalid street number`).
- **Retrieved / reviewed:** 2026-07-04.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial
  authoring source review).

## Screen-by-screen walkthrough record

The wizard is exactly six top-level steps (per its own "Step N of 6"
progress label), with Step 4 (Home Address) implemented as several
sequential sub-screens:

1. **Privacy and Security** (interstitial, no data fields — an
   acknowledgement-only screen with Previous/Next/Quit).
2. **Step 1 of 6 — Date of Birth.** Three text inputs: `DateYear`
   (maxlength 4), `DateMonth` (maxlength 2), `DateDay` (maxlength 2), all
   `required`.
3. **Step 2 of 6 — Eligibility.** Three required Yes/No radio questions:
   `EligibilityCriteriaCitizenship`, `SvrCriteriaAddressInCanada`,
   `SvrCriteriaCanadianForcesMember`.
4. **Step 3 of 6 — Personal Information.** `FirstName` (required,
   maxlength 50), `MiddleName` (optional, maxlength 50), `LastName`
   (required, maxlength 100), `GenderId` (required select: 1=Woman,
   2=Man, 3=Another gender).
5. **Step 4 of 6 — Home Address**, in sub-screens:
   - **Address Type**: radio `AddressType` (`CIVIC` default-checked,
     `STRM`, `LC`, `NonConforming`).
   - **Postal code**: text `PostalCode` (required, maxlength 7).
   - **Choose your city**: select `CityId`, populated from the postal
     code (for `K1A 0A6` the only option offered was `Ottawa, ON`,
     auto-selected since it was the sole match).
   - **Choose your street**: selects `StreetTypeId` (198 Canada
     Post-standard street-type abbreviations, e.g. `ST`, `AVE`, `BLVD`),
     `StreetDirectionId` (8 compass directions), and `StreetId` (the
     actual street-name lookup, city-scoped, with an always-present
     `-11 = "My street is not here"` fallback option); plus text
     `AddressNumber` (required, maxlength 6, `pattern="^[0-9]{1,6}\s*$"`,
     disabled until a `StreetId` is chosen), `Suite` (optional, maxlength
     6), and select `Suffix` (optional: 1/4, 1/2, 3/4, A–Z).
6. **Step 5 of 6 — Review Information.** Read-only summary of every prior
   answer, plus a required CAPTCHA (`Captcha` text input) before Submit.
7. **Step 6 of 6 — Results.** Only reached via the two negative-eligibility
   branches tested (see below); the direct-match success/failure outcome
   for a `Submit`-ted registration was not reached, since Submit requires
   solving the CAPTCHA.

## Eligibility-branch checks performed

Three branches off the Step 2 Eligibility screen were driven independently
to confirm routing behaviour (each re-run from a fresh session, changing
only the flagged answer):

- **`isCanadianCitizen = false`** → jumps straight to **Step 6 of 6 —
  Results**: "You're not eligible to vote in a federal election... The
  Canada Elections Act states that you must have Canadian citizenship to
  register and vote on election day." A hard, terminal ineligibility
  outcome — not modelled as a data field, consistent with how this
  registry's other eligibility-gated documents (e.g.
  `fr/france-visas/schengen-visa-application`'s `requiresSchengenVisa`)
  express a routing/eligibility question via `fieldRole: eligibility` +
  `eligibleValues` rather than a validation error.
- **`hasCanadianHomeAddress = false`** → jumps to **Step 6 of 6 —
  Results**: "There's a separate registration process for Canadians
  living abroad," linking to a distinct International Register of
  Electors application. Out of scope for this document (a different
  Elections Canada service, not explored this cycle).
- **`isCanadianForcesElector = true`** → continues normally to **Step 3 of
  6 — Personal Information**, identical to the `false` case. This
  question does **not** itself gate continuation within the portion of
  the flow walked for this document, so it is modelled as an ordinary
  (if thematically eligibility-grouped) required boolean rather than one
  carrying `eligibleValues`.

## Mock-data test run

Per the issue's phase-4 instruction to test-run the schema with valid
mock data, two representative scenarios were authored and checked
field-by-field against every `type`/`required`/`requiredWhen`/
`visibleWhen`/`enum`/`pattern` constraint in `schema.json`, using a
one-off Python condition evaluator (not committed to the repo)
implementing the same `equals`/`notEquals`/`in`/`greaterThan`/`all`/
`any`/`not` grammar as GSP-0013's `Condition` schema (spec v0.3 §8.1) —
the same technique used for `in/incometax/individual-tax-return-itr1-sahaj`
(GOV-900).

**Scenario 1 — adult civic-address applicant, not a Canadian Forces
elector:** Jordan Tremblay, DOB 1990-06-15, Man, 111 Wellington Street,
Ottawa ON K1A 0A6 (the exact data walked through live above).

**Scenario 2 — Canadian Forces elector, apartment suite with civic-number
suffix:** Marie Claire Bouchard, DOB 1965-11-02, Woman, a Canadian Forces
elector, unit 301 at 42A Rue Sainte-Catherine, Montreal QC H2X 1Y6.

Both runs:

```
PASS — Scenario 1 - adult civic-address applicant, not a Canadian Forces elector satisfies every type/required/requiredWhen/visibleWhen/enum/pattern constraint.
PASS — Scenario 2 - Canadian Forces elector, apartment suite with suffix satisfies every type/required/requiredWhen/visibleWhen/enum/pattern constraint.
```

A deliberately-broken variant of Scenario 1 (dropping `lastName`, setting
`homeAddressNumber` to a non-numeric string, and setting `gender` to a
value outside the enum) was also run, to confirm the evaluator itself
correctly detects violations rather than passing everything by
construction:

```
FAIL — Scenario 1 (deliberately broken) - sanity check:
  - MISSING required field 'lastName'
  - 'gender' not in enum ['woman', 'man', 'another_gender']: 'nonbinary'
  - 'homeAddressNumber' fails pattern ^[0-9]{1,6}\s*$: 'not-a-number'
```

Both registry validators were run against the schema document itself and
pass:

```
$ node tools/validate.mjs registry/ca/elections-canada/voter-registration/1.0.0/schema.json
ok   registry/ca/elections-canada/voter-registration/1.0.0/schema.json

$ node tools/validate-ajv.mjs registry/ca/elections-canada/voter-registration/1.0.0/schema.json
ok   registry/ca/elections-canada/voter-registration/1.0.0/schema.json [v0.3]
```

## Scope decisions (what is modelled vs. deferred)

- **Modelled in full:** date of birth; the three federal eligibility
  questions; first/middle/last name and gender; and the civic
  (street-address) home-address path — postal code, city, street name,
  house number, unit/suite, and civic-number suffix.
- **Deferred (out of scope), and why:**
  - The 14-17-year-old **Register of Future Electors** path (the DOB
    screen's own description suggests date of birth routes between the
    two registers, but only an 18+ DOB was tested) — matches this
    registry's existing precedent of modelling the adult registration
    path only (`au/aec/voter-enrolment`, `gb/co/register-to-vote`).
  - The **International Register of Electors** application for Canadians
    living abroad (reached via `hasCanadianHomeAddress = false`) — a
    distinct service with its own field set, not explored this cycle.
  - The two **rural legal-description address types** (`STRM`:
    Section/Township/Range/Meridian for AB/BC/SK/MB; `LC`: Lot &
    Concession for Ontario) and the free-form **"different address
    type"** (`NonConforming`) option — all three are recorded as real,
    directly-observed `homeAddressType` enum values, but their own
    sub-field sets were not reached (each appeared to lead to further
    address-detail screens beyond the postal-code entry point common to
    all four types, which was not fully explored for the three
    non-civic types).
  - The **identity-document-upload / manual-verification path** — the
    service's own landing page references checking "the status of your
    request" via a reference number "if you previously registered by
    uploading your identification documents," implying a fallback path
    exists when a submission cannot be automatically matched to an
    existing elector record. This path was not reached (reaching it would
    require submitting past the CAPTCHA screen) and is out of scope.
  - **The CAPTCHA step itself** is not modelled as a schema field,
    consistent with this registry's established treatment of CAPTCHAs as
    an access artifact rather than domain data (see
    `in/mha/evisa-etourist`'s VERIFICATION.md).
  - **`StreetTypeId` and `StreetDirectionId`** (the street-type/direction
    filter dropdowns on the "Choose your street" screen) are not modelled
    as separate fields. They narrow the `StreetId` lookup list on the
    live service but do not themselves carry additional civic-address
    information beyond what `homeAddressStreetName` already captures
    once the street is identified — modelling the underlying civic
    address value rather than the two-stage lookup-then-filter UI
    mechanic, consistent with how this registry treats other
    address/lookup-driven form widgets elsewhere.
- **No live submission was attempted.** GovSchema authors schemas from
  observed form structure; it does not file live applications with
  government systems on an applicant's (real or mock) behalf. The
  walkthrough was deliberately stopped at the Review Information /
  CAPTCHA screen (Step 5 of 6), one screen before Submit.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies
`manual-source-review-v1` Procedure step 2, confirming this document
against a fresh live walkthrough of ereg.elections.ca (including, ideally,
the previously-deferred rural address-type sub-screens and the 14-17
Register of Future Electors DOB branch), and records the outcome here —
shipping a new schema version if discrepancies are found (VERSIONING.md
§3, immutability).

## Re-verification

Per the practice's Cadence, `nextReviewBy` is set to **2027-01-04** (6
months).
