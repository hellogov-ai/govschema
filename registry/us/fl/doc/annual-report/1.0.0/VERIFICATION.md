# Verification record — `us/fl/doc/annual-report` v1.0.0

This file is the source-review record for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-02`

`draft`, not `verified`, because the live e-filing wizard
(`services.sunbiz.org/Filings/AnnualReport/FilingStart`) was unreachable for
a field-by-field walkthrough this session — see "What was not done" below.

## Sources examined

- **Document `(id, version)`:** `us/fl/doc/annual-report` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Florida Department of State, Division of Corporations
  (branded and commonly known as "Sunbiz").
- **`https://dos.fl.gov/sunbiz/manage-business/efile/annual-report/`** —
  "File Annual Report". Fetched live via plain `curl` (HTTP 200, no block),
  2026-07-02. Supplies: the entities that must file (profit corporations,
  LLCs, LPs, LLLPs, nonprofit corporations); the May 1, 2026, 11:59 PM EST
  late-fee cutoff and the $400 late fee (profit corporations, LLCs, LPs,
  LLLPs only — nonprofits exempt); the administrative-dissolution
  consequence of not filing by the third Friday in September (dissolution at
  close of business the fourth Friday, Ch. 607/617/620 F.S.); the 2026
  calendar deadlines for paying by check (September 18) vs. credit card
  (September 25); payment options (credit/debit card, prepaid Sunbiz e-file
  account, check/money order by mail with a payment voucher); the
  online-signature rule (typing a name is sufficient, s. 15.16 F.S.;
  unauthorized signing is forgery); what can be changed on the annual report
  (officers/directors/managers/authorized members, registered agent and
  office, principal/mailing address, FEIN) and what cannot (the entity's
  name); the amended-annual-report fees ($61.25 corporation/nonprofit,
  $50.00 LLC — noted but out of scope, see below); and the full Annual
  Report Fees table (quoted verbatim into each `documents[]` entry's
  `sourceRef`).
- **`https://dos.fl.gov/sunbiz/manage-business/efile/annual-report/instructions/`**
  — "Annual Report Instructions". Fetched live (HTTP 200), 2026-07-02. This
  is the strongest field-level source used: the Division's own
  section-by-section instructions for its e-filing wizard, covering Document
  Number, Entity Name (immutable on this filing), FEIN (incl. the
  "Applied For" placeholder rule), Principal Place of Business Address,
  Mailing Address (P.O. Box acceptable), Registered Agent Name/Address/
  Signature (incl. the physical-Florida-address rule, the
  new-designation signature requirement, and the s. 48.151 F.S.
  Chief-Financial-Officer-as-registered-agent carve-out for authorized
  insurers), Principals (officers/directors/managers/authorized
  representatives/general partners — open title list, at least one
  required, the LP/LLLP general-partner name-change restriction), Certificate
  of Status (optional, its own fee table, email delivery), and Email
  Address (public-record note). Quoted directly into each affected field's
  own `sourceRef`.
- **`https://services.sunbiz.org/Filings/AnnualReport/FilingStart`** — the
  live e-filing wizard's entry point. Fetched live (HTTP 200), 2026-07-02,
  but returned a maintenance notice, not the wizard: "Sunbiz.org electronic
  filings are down for scheduled maintenance and will resume at 8am ET on
  Tuesday, July 7th." (2026-07-02 is a Thursday; July 7, 2026 is the
  following Tuesday — i.e. genuinely in the future relative to this
  session, not yet reachable.)

## What was not done — the one honest gap

Unlike `de/finanzamt/tax-identification-number` (verified by directly
operating BZSt's live unauthenticated form with Playwright), **no live
walkthrough of the Sunbiz annual-report e-filing wizard itself was
performed**, because the wizard was down for scheduled maintenance for the
entirety of this session (see source list above). This is a different kind
of gap than an authentication wall (e.g. `nz/dia/realme-verified-identity`)
or a login-gated form (e.g. `us/dos/passport-application-ds11`): the wizard
is otherwise reachable without login (only a document number is needed),
but was simply unavailable at fetch time.

Consequently, this schema's field inventory is derived from the Division's
own **Annual Report Instructions** page rather than from reading input
ids/labels/ordering directly off the live wizard. That page is authoritative
and unusually detailed (a genuine field-by-field instruction set, not
generic guidance), but it is one sourcing grain below a direct
field-by-field form comparison — for example, it does not give input ids,
the wizard's exact screen-by-screen layout, or client-side validation
masks. `status` stays `draft` until a live walkthrough is possible; re-check
after `nextReviewBy` (or sooner, once the maintenance window passes).

## Modelling decisions

- **Not an edition-versioned (time-versioned) form, despite being filed
  every year.** Applying the GSP-0005 §2 coexistence test used for
  `us/ca/sos/business-entity-llc-formation`: a fresh IRS 1040/FAFSA edition
  is filed *for* a specific past year and multiple editions can genuinely
  coexist as concurrently valid filings (a 2025 and a late 2024 return, both
  open at once). Florida's annual report does not work this way: an entity
  that misses a filing year is not later asked to back-file that missed
  year's report — it is administratively dissolved and, if it wants to
  continue, must instead file a Reinstatement application (a different
  process, out of scope here), not a catch-up annual report for each missed
  year. The "2026 Annual Report" label on the Division's site is a
  current-year filing-window convenience, not a distinct form edition with
  its own field set — the instructions, fields, and fee structure described
  here are not shown as varying year to year. Authored at the plain
  (non-edition) registry path, `registry/us/fl/doc/annual-report/1.0.0/`.
- **Authority slug `doc`, consistent with the sibling `us/fl/doc/llc-formation`
  schema (FL.4).** Both this schema and its FL-wave sibling are filed with
  the same Division of Corporations; the `doc` slug (rather than `dos`, which
  would collide in spirit with the unrelated federal `us/dos/*` — U.S.
  Department of State — passport schemas already in this registry) was kept
  identical across both so a consumer sees one authority segment per issuing
  body, per Least Surprise.
- **`entityType` as a single closed enum spanning all five fileable entity
  types**, rather than five separate near-duplicate schemas. The Division
  publishes one shared annual-report process (fee table, instructions page)
  for all five entity types, differing only in fee amount and in the
  narrower LP/LLLP general-partner restriction — both modelled as
  entity-type-conditioned `documents[]`/description content rather than
  forked into parallel schemas, per Composability & reuse.
- **Fee amount modelled as four mutually-exclusive `documents[]` entries
  gated by `entityType`, using the GSP-0013 `in` operator for the combined
  LP/LLLP fee bucket** (the source states one $500 fee shared by both LP and
  LLLP), rather than a single fee document with a computed/variable amount —
  the spec's `document.amount` is a fixed `{currency, value}` pair with no
  conditional-amount member, so distinct entries per fee tier is the correct
  shape (the same pattern `sg/ica/identity-card-reregistration` established
  for `all`-composed conditions, extended here to a leaf `in` array).
- **Late fee (`lateFeePenalty`) is deliberately left unconditioned
  (`required: false`, no `requiredWhen`).** The $400 late fee is triggered by
  the *filing's own submission timestamp* relative to the May 1 cutoff, not
  by any applicant-supplied field — this schema has no "what date are you
  filing" input, and inventing one solely to hang a `requiredWhen` off it
  would assert a wizard field this session could not observe (the wizard was
  unreachable — see above). The full applicability rule (all entity types
  except nonprofit corporations, only if filed after the cutoff) is instead
  stated in full in the document's own `handling` and `sourceRef`, so a
  consumer reading the schema is not misled by a bare `required: false` into
  thinking the fee never applies.
- **Certificate of Status fee split by entity type using the same `all`
  composition as the SG NRIC precedent** (GSP-0013 §1, `requestCertificateOfStatus
  == true AND entityType in {...}`), because the Instructions page publishes
  two different fee tiers ($8.75 corporations/LPs/LLLPs, $5.00 LLCs) for the
  same optional add-on.
- **`registeredAgentIsNewOrChangedDesignation` and
  `registeredAgentIsChiefFinancialOfficerInsurer` modelled as explicit
  boolean fields, not folded into `registeredAgentSignature`'s own
  description.** The Instructions page states two independent, source-named
  gating facts — "if designating a new registered agent, the new agent must
  sign" and "if the CFO is the registered agent, ... a signature is not
  required, type NOT REQUIRED" — each is exactly the kind of applicant-facing
  fact the field model is meant to carry as a condition, not prose;
  `registeredAgentSignature.requiredWhen` composes both
  (`all: [isNewOrChanged, not(isChiefFinancialOfficerInsurer)]`) per the
  GSP-0013 grammar, mirroring `sg/ica/identity-card-reregistration`'s first
  use of `all` in this registry.
- **`entityName` kept as a required field despite being immutable on this
  filing.** The Instructions page treats it as data displayed/confirmed on
  the wizard (the current name of record), just not editable here; modelling
  it as a field (rather than omitting it) matches how the live wizard
  actually surfaces it, with the immutability rule stated in the field's own
  `description` rather than by leaving the field out.
- **Single flat `principal*` field group (`principalTitle`, `principalName`,
  `principalAddressLine1/City/State/ZipCode`), not a repeating list**, exactly
  as `us/ca/sos/business-entity-llc-formation` modelled its single-organizer
  signature block. The source states "you must provide at least one
  principal" but the actual cardinality is unbounded (officers, directors,
  managers, authorized members, and — for LP/LLLP — general partners can
  each have multiple entries). GovSchema v0.3 has no repeating/array field
  type (GSP-0009, still `Proposed`); this schema follows the same
  established precedent of modelling the single required minimum and citing
  GSP-0009 for the out-of-scope repetition, rather than inventing
  `principal1Name`/`principal2Name`-style fixed slots that would still be
  wrong for genuinely unbounded cardinality.
- **`principalTitle` as an open string, not a closed enum.** The Instructions
  page says the filer "can select the title(s) from the list provided, or
  enter the title in the textbox if it is not listed" — i.e. the live wizard
  itself does not treat titles as a closed set. Asserting an enum here would
  risk rejecting a valid title the wizard actually accepts, the same
  discipline used for `nz/dia/realme-verified-identity`'s unconstrained
  `gender` field.
- **No `edition` member; no `crossFieldValidation`/`exclusivityGroups`.** No
  cross-field rule beyond the `requiredWhen` conditions already expressed on
  individual fields/documents was identified in the sources examined.

## Out of scope

- **Amended Annual Report** — a distinct filing (with its own $61.25/$50.00
  fee tiers) used to correct an annual report already filed and posted this
  year; mentioned by the source but not modelled here as a separate process.
- **Reinstatement** — the filing required after administrative dissolution
  for missing a filing year; a materially different process (its own
  application + accumulated fees) from the routine annual report modelled
  here. A candidate for a future, separate `us/fl/doc/reinstatement`-style
  schema if this vertical is revisited.
- **Name-change amendment form** and **LP/LLLP general-partner add/delete
  amendment form** — both explicitly out of scope of the annual report
  itself per the source, and not modelled here.
- **Beneficial Ownership Information reporting** — the source page notes
  this is a separate federal (FinCEN) requirement for which the Division
  only provides notice, not a Division of Corporations filing.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-02** (6
months). Re-check all sources above on or before that date, and on any
change to `source.url`. If a future session finds
`services.sunbiz.org/Filings/AnnualReport/FilingStart` reachable (the
maintenance window observed here was scheduled to end 2026-07-07),
re-verify by direct wizard walkthrough and promote `status` to `verified`,
per `de/finanzamt/tax-identification-number`'s precedent.
