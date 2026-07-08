# Verification record — `ee/ppa/e-residency-application` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-08`

This is **GOV-1698**: "GovSchema Standard Research" — research, document,
test, and author a new (23rd) jurisdiction, since coverage across the
existing 22 jurisdictions is heavily saturated (nearly every jurisdiction is
at 5/6 or 6/6, and the remaining per-jurisdiction gaps had mostly already
been screened and confirmed as dead ends across prior cycles). This opens
**Estonia (EE)** as GovSchema's 23rd jurisdiction, via its National ID &
Civic Documents vertical.

## Candidate screening (Phase 1)

### Candidate 1 (picked): Estonia — e-Resident's digital ID application

The issue's own primary candidate. Screened first, per the issue's own
research plan.

- **`apply.gov.ee`** now redirects to (and the application is technically
  served from) **`eresident.politsei.ee`**, run by the Police and Border
  Guard Board (PPA). Retrieved directly via `curl` this cycle: every route
  (`/`, `/application-guidelines`, `/important-information`,
  `/photo-requirements`) returns byte-for-byte the same minimal HTML shell
  (`<apply-root></apply-root>` plus `runtime`/`polyfills`/`scripts`/`main`
  Angular bundle references) — confirming this is a fully client-rendered
  single-page app with **no unauthenticated field-level HTML at all**. The
  page's own inline `window.configs` block additionally shows it federates
  identity via `tara.ria.ee` (Estonia's national eID/eIDAS authentication
  broker, `clientId: "eres-apply-live"`) for *repeat* applicants who already
  hold a valid e-Resident's digital ID or a Smart-ID issued from one — not
  relevant to a first-time applicant, who instead creates a lightweight
  email-based account (no password, per PPA's own FAQ) before any field
  renders.
- Grepped the compiled `main.<hash>.js` bundle (1.27 MB) directly for
  literal field-name/label strings and for `assets/i18n/*.json` translation
  files a webpack Angular i18n setup would typically expose: found nothing
  usable — the bundle's own literal strings are almost entirely
  `libphonenumber`/Angular-internal identifiers, not this app's own form
  field names or labels, and no `i18n` translation JSON is served
  separately. Confirms the field set is genuinely not recoverable from a
  static fetch of the live application, only from a real (account-creating)
  browser session — out of scope for this cycle, consistent with this
  registry's "never submit fabricated data / never create throwaway
  accounts against a live government system" discipline.
- **Rather than stop here, found the PPA's own official, unauthenticated,
  plain-HTML statutory field list**, published in English on
  `politsei.ee` (a server-rendered site, distinct from the
  `eresident.politsei.ee` application SPA): the "Frequently asked
  questions" page's own "On what basis am I being asked to provide
  information?" answer states, verbatim: *"The data and evidence to be
  submitted when applying are listed in sections 5, 6, 9 and 17 of
  Regulation No. 20 and section 7 of Regulation No. 78 of the Minister of
  the Interior of Estonia"* — followed by the PPA's **own clause-by-clause
  English enumeration** of every one of those sections' data elements (see
  Source 1 below). This is the same "governing statute/regulation as
  primary source when the live application itself has no field-level
  transparency" technique this registry used for
  `pl/mswia/wniosek-o-wydanie-paszportu` (GOV-1685) — here made even
  stronger, since the government agency's own page states the field list in
  plain English itself, rather than requiring a producer to translate a
  foreign-language statute directly.
- Corroborated the practical (non-statutory) details — the EUR 150 state
  fee, accepted card types, the 30-day decision timeline, the 2–5 week
  delivery window, the pick-up location categories (PBGB service office /
  Estonian embassy / mobile pickup point), the CV's three alternative
  submission modes, and the facial-photo pixel/format/size requirements —
  from four further `politsei.ee` sub-pages, all retrieved directly via
  `curl` this cycle with HTTP 200 and no login/CAPTCHA/WAF gate (see
  Sources 2–5 below).
- **Picked.** Estonia is one of the most extensively English-documented
  digital-government programs in the world, and — unusually for a
  login-gated live application — its issuing agency's own public FAQ
  publishes the complete statutory field list the application must contain,
  in plain English, unauthenticated. This is a genuinely strong source, not
  a forced one.

No fallback candidate (Portugal NIF, Malaysia SSM/JPJ, Japan e-Tax/driver's
license) was screened this cycle: Estonia's own primary candidate turned out
strong enough on its own merits that the issue's "stop at the first
genuinely strong one" instruction applied directly.

## Sources examined

### Source 1 (primary `source`, the PPA's own statutory field list)

- **URL:**
  <https://www.politsei.ee/en/instructions/e-resident-s-digital-id/frequently-asked-questions>
  (HTTP 200, no login, retrieved directly via `curl`).
- **Retrieved / reviewed:** 2026-07-08.
- **What it confirms:** the full statutory data list, quoted directly from
  the page's own English text: §5(1) items 1–8 (given name and surname;
  Estonian personal identification code or, if unavailable, date of birth;
  place of birth; sex; citizenship; contact address — street, house number,
  apartment number, city or village, municipality, county, postal code,
  country; email address; phone number); §6 items 1–5 (document type,
  number, issuing authority, date of issue, date of expiry); §9(1) items
  1–14 (curriculum vitae; patronymic/former/other names; former
  citizenship; social media accounts; related undertakings; business
  prohibitions; foreign personal identification code; personal and
  related-undertaking bank/payment accounts and virtual currency use;
  criminal record and proceedings; suspected/accused of an economic, cyber,
  or terrorist offence; visa refusals and entry bans; military/security
  service history; civil society organisation membership; terrorist
  organisation membership) and §9(2) (purpose of applying, planned
  activities, justification); §17(1) (a copy of the travel document's
  personal data page). Also confirms the account-creation requirement
  (no password, email-link login), the in-person-only submission and
  collection rule (Identity Documents Act §20-7(1-1)), the 30-day decision
  timeline, and the EUR 150 non-refundable state fee.

### Source 2 (corroborating, applying-through-e-service)

- **URL:**
  <https://www.politsei.ee/en/instructions/e-resident-s-digital-id/applying-through-e-service>
  (HTTP 200, no login).
- **Retrieved / reviewed:** 2026-07-08.
- **What it confirms:** the ~30-minute estimated completion time; the two
  named travel-document types in the applicant's own words ("a copy of a
  travel document of the country of nationality or of both sides of the
  European Union identity card"), used as `documentType`'s two enum values;
  the CV's three alternative submission modes (online CV link, CV file, or
  fill-in-app fallback); accepted card brands (VISA, Mastercard).

### Source 3 (corroborating, how-much-and-how-to-pay)

- **URL:**
  <https://www.politsei.ee/en/instructions/e-resident-s-digital-id/how-much-and-how-to-pay>
  (HTTP 200, no login).
- **Retrieved / reviewed:** 2026-07-08.
- **What it confirms:** the EUR 150 state fee (independently corroborating
  the FAQ page's own figure) and its non-refundability if the application is
  refused.

### Source 4 (corroborating, procedural-time-limit and pick-up)

- **URLs:**
  <https://www.politsei.ee/en/instructions/e-resident-s-digital-id/procedural-time-limit>,
  <https://www.politsei.ee/en/instructions/e-resident-s-digital-id/pick-up>
  (both HTTP 200, no login).
- **Retrieved / reviewed:** 2026-07-08.
- **What it confirms:** the 30-day decision timeline and 2–5 week delivery
  window; the three pick-up location categories in the PPA's own words
  ("the Estonian Police and Border Guard board service office," "an
  Estonian embassy," "any mobile pickup point") — used as
  `pickupLocationType`'s three enum values; that pick-up is always in
  person, with fingerprinting at collection (out of scope for this
  document, an in-person-only step with no applicant-suppliable value ahead
  of the appointment).

### Source 5 (corroborating, citizenship-based-application-restrictions — read, not modelled)

- **URL:**
  <https://www.politsei.ee/en/instructions/e-resident-s-digital-id/citizenship-based-application-restrictions>
  (HTTP 200, no login).
- **Retrieved / reviewed:** 2026-07-08.
- **What it confirms:** a real, named, two-group list of citizenship-based
  application restrictions under Identity Documents Act §20-6(1-1) and a
  Minister of the Interior regulation (Group I: Afghanistan, Burkina Faso,
  Iran, Yemen, DR Congo, North Korea, South Sudan, Mali, Nigeria, Syria —
  reviewed only under named exceptions; Group II: Belarus and Russia —
  reviewed only if all of several conditions are met), effective from 1
  October 2025. **Not modelled as a field or `validation.enum`** — see
  "Access notes and judgment calls" item 8.

### Source 6 (checked, not used — the live application's own compiled bundle)

- **URLs:** `https://eresident.politsei.ee/` (and every route under it),
  plus its own `main.<hash>.js` bundle (1.27 MB).
- **Retrieved / reviewed:** 2026-07-08, via direct `curl`.
- **What it shows:** confirms the SPA-shell-only finding above; not used as
  a field source since no field name/label text is present outside the
  compiled Angular bundle, and no separate i18n JSON is served.

## Field inventory (Phase 2)

37 `fields[]` entries and 4 `documents[]` entries, all carrying their own
`sourceRef` inline in `schema.json`. Summary by step:

| Step | Fields | Required? |
|---|---|---|
| Applicant identity | `surname`, `givenNames`, `dateOfBirth`, `placeOfBirth`, `sex`, `citizenship` required; `estonianPersonalIdentificationCode` optional | §5(1)(1)-(5) |
| Contact address and contact details | `addressStreet`/`addressHouseNumber`/`addressCityOrVillage`/`addressMunicipality`/`addressCounty`/`addressPostalCode`/`addressCountry`/`email`/`phoneNumber` required; `addressApartmentNumber` optional | §5(1)(6)-(8) |
| Travel document | all 5 fields required | §6(1)-(5) |
| Purpose of application | `purposeAndJustification` required | §9(2) |
| Background and history disclosures | `suspectedOfEconomicCyberOrTerroristOffence`/`visaRefusalOrEntryBan`/`terroristOrganisationMembership` required; the other 10 optional | §9(1)(2)-(14) |
| Pick-up location and payment | `pickupLocationType` required | PPA "Pick-up" page |
| Documents | `travelDocumentCopy` (required), `facialPhotograph` (required), `curriculumVitae` (required), `stateFeePayment` (required) | §17(1), §7(7) of Reg. 78, §9(1)(1), fee pages |

No `crossFieldValidation` or `exclusivityGroups` are modelled — no
structurally-confirmable conditional relationship between two named fields
was found this cycle (unlike, e.g., a fee-waiver-proof pattern).

## Access notes and judgment calls

1. **`dateOfBirth` is modelled as required; `estonianPersonalIdentificationCode`
   as optional**, even though the source frames them as a single either/or
   data element ("Estonian personal identification code or, if unavailable,
   date of birth"). Reasoning: an e-Residency applicant is by definition a
   foreign national, and a genuine first-time applicant has never been
   issued an Estonian personal identification code — only a *repeat*
   applicant (who already holds, or has held, an e-Resident's digital ID)
   might have one. Modelling `dateOfBirth` as the universally-required
   element and the code as an optional add-on (rather than building a
   `requiredWhen`-gated either/or) reflects the practical shape of this
   process's own applicant population without introducing an unconfirmed
   conditional-logic graph.
2. **`sex` is modelled as an open `string`, not a closed `enum`.** The
   source (§5(1)(4)) names a "sex" data element without stating its coded
   values anywhere this cycle's review could confirm — no downloadable
   AcroForm or field-numbered guide exists for this process to show a
   dropdown's literal values, and (unlike `pl/mswia`'s two passport/ID-card
   schemas) there is no confirmed sibling Estonian schema in this registry
   to borrow enum values from. Consistent with this registry's convention
   of omitting an unconfirmed enumeration rather than guessing one (see
   `pl/mswia/wniosek-o-wydanie-paszportu`'s own disclosed `plec` enum
   provenance, by contrast, which *did* have a confirmed sibling source).
3. **`documentType`'s two enum values (`passport`/`eu-identity-card`) are a
   disclosed slugification of the PPA's own prose**, not a confirmed literal
   coded value from the live form (which this cycle could not reach without
   creating an account). The PPA's "Applying through e-service" page names
   exactly these two document categories in its own words; this document
   encodes them as machine-friendly slugs, disclosed as an inference from
   prose rather than a confirmed dropdown value.
4. **The ten §9(1) background-disclosure items that describe a fact an
   applicant may or may not have** (patronymic/former/other names, former
   citizenship, social media accounts, related undertakings, business
   prohibitions, foreign personal identification code, bank/virtual-currency
   accounts, criminal record and proceedings, military/security service
   history, civil society organisation membership) **are modelled as
   optional**, while the three items that read as a universal yes/no
   background-check declaration (suspected/accused of an economic, cyber, or
   terrorist offence; visa refusals/entry bans; terrorist organisation
   membership) **are modelled as required booleans**. The source's own FAQ
   text lists all fourteen §9(1) items together, without separately marking
   which are conditional-on-applicability versus universally answered; this
   split is this document's own judgment call, based on which items describe
   a fact that simply does not exist for most applicants (you cannot have a
   "former citizenship" you never held) versus a fact every applicant can and
   must affirmatively state either way (a yes/no security declaration). A
   future revision could revisit this split if a field-numbered source (e.g.
   a rendered screenshot of the live wizard) becomes available.
5. **`purposeAndJustification` merges three named data elements from §9(2)
   (purpose of applying, description of planned activities, justification)
   into a single free-text field**, matching that subsection's own
   single-sentence framing of all three together, and matching how multiple
   PPA/e-Residency pages describe this as one "motivation statement" text
   box in the live application, rather than three separate boxes this
   cycle's sources do not show as distinct.
6. **The contact address is modelled as the exact 8-element split the
   source itself names** (street, house number, apartment number, city or
   village, municipality, county, postal code, country) rather than this
   registry's more common 3-field `street-line`/`city`/`postal-code`
   convention (used, e.g., by `pl/mswia/wniosek-o-wydanie-paszportu` for an
   address the source names without a sub-field breakdown). Here the source
   itself explicitly enumerates all 8 sub-elements, so this document follows
   the source's own granularity directly rather than falling back to the
   simpler convention.
7. **The account-creation step, the `tara.ria.ee` eID-based repeat-applicant
   login path, the in-person fingerprint collection at pick-up, and the
   pick-up-location-change process are entirely out of scope.** None has an
   applicant-suppliable data value ahead of an in-person or authenticated
   step this document does not otherwise model — the same treatment
   `pl/mswia/wniosek-o-wydanie-paszportu` gives its own in-person biometric
   step.
8. **The citizenship-based application restrictions (Source 5) are not
   modelled as a field, `validation.enum`, or eligibility gate.** This is a
   genuine eligibility mechanism (certain countries' citizens are reviewed
   only under named exceptions, or not at all, depending on a two-group
   country list effective from a stated date), but the list is politically
   contingent, explicitly time-boxed ("after the 1st of October 2025"), and
   is exactly the kind of externally-amended, closed enumeration this
   registry's own convention (see `pl/mswia/wniosek-o-wydanie-paszportu`'s
   Art. 21 fee-category judgment call) says to disclose rather than encode
   as a fabricated or quickly-stale validation rule. The `citizenship`
   field's own `description` names this restriction's existence without
   attempting to reproduce its country list or conditions.
9. **No fee amount is asserted as a `fields[]` entry** — the EUR 150 state
   fee appears only in `documents[].stateFeePayment.amount`, consistent with
   this registry's convention (fee schedules are set by separate,
   independently-amended provisions and change over time); this mirrors how
   other schemas in this registry (e.g. `fr/france-visas`) record a
   `documents[].amount` without a corresponding standalone fee field.
10. **The photograph's exact pixel-dimension bounds (1300×1600 to
    6000×7380) are recorded in the `facialPhotograph` document's own
    `handling` prose, not as a `validation` keyword**, since the v0.3
    meta-schema's `file`-type `validation` vocabulary is limited to
    `maxBytes`/`mediaTypes` (§6.6) and has no pixel-dimension keyword.

## Test run (Phase 4)

No live submission was attempted: the live application requires creating a
real account (an email address that receives a real activation link) and,
per the Identity Documents Act's own personal-submission requirement, must
be filled out and submitted by the applicant in person — not a safe or
reversible action to simulate against Estonia's live PPA system, and
account creation itself (even without submitting) was judged out of scope
for a research/authoring cycle that does not need a live account to source
its fields (see Source 1).

Instead, one fully hand-constructed mock record was built from this
document's own field inventory and checked by a small ad hoc Node script
(not just eyeballed) against every field's `required`/`validation` rule and
every document's `required` rule; it is committed as this document's
conformance fixture
(`conformance/ee/ppa/e-residency-application/1.0.0/application-packet.json`).

**Scenario (committed fixture) — a first-time applicant, a fictional
Portuguese freelance software developer applying to found and remotely
manage an Estonian OU**, with no Estonian personal identification code (a
genuine first-time applicant), a full 8-element contact address, all three
required background-disclosure declarations answered `false`, the ten
optional disclosure fields left absent (genuinely not applicable to this
scenario), and an Estonian embassy selected for pick-up. The ad hoc script
re-checks every `required` field and document, and every
`validation.pattern`/`validation.enum` rule, directly against `schema.json`
— **zero errors**:

```
$ node check.mjs registry/ee/ppa/e-residency-application/1.0.0/schema.json conformance/ee/ppa/e-residency-application/1.0.0/application-packet.json
All required/requiredWhen/enum/pattern checks passed against conformance/ee/ppa/e-residency-application/1.0.0/application-packet.json
```

**Negative controls** (each run through the same script against a variant
payload, not committed as separate fixture files):

- (a) `email: "not-an-email"` — caught: fails the email `pattern`.
- (b) `documentType: "drivers-license"` — caught: not in
  `["passport","eu-identity-card"]`.
- (c) `estonianPersonalIdentificationCode: "12345"` — caught: fails
  `^[0-9]{11}$` (only 5 digits).
- (d) omitting `surname` entirely — caught: `FIELD surname: required but
  missing`.
- (e) omitting the `stateFeePayment` document — caught: `DOCUMENT
  stateFeePayment: required but missing`.
- (f) `terroristOrganisationMembership: "no"` (a string, not a boolean) —
  caught: `FIELD terroristOrganisationMembership: expected boolean, got
  string`.

All six negative controls were correctly identified by the script.

Both meta-schema validators were run against the finished document and pass
clean:

```
$ node tools/validate.mjs registry/ee/ppa/e-residency-application/1.0.0/schema.json
ok   registry/ee/ppa/e-residency-application/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/ee/ppa/e-residency-application/1.0.0/schema.json
ok   registry/ee/ppa/e-residency-application/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).
```
