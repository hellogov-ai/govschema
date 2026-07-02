# Verification record — `nz/dia/realme-verified-identity` v1.0.0

This file is the source-review record for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-02`

`draft`, not `verified`, because the live application form itself sits behind
an authenticated RealMe login (`account.home.realme.govt.nz`) this
environment cannot pass without genuine New Zealand identity documents — see
"What was not done" below. This schema is instead sourced from DIA's own
published guidance and, notably, its statutory privacy statement, which names
the exact personal-information fields collected per identity-record choice.

## Sources examined

- **Document `(id, version)`:** `nz/dia/realme-verified-identity` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Department of Internal Affairs (DIA), operating the RealMe
  service jointly with (per its own site) other providers; the Identity
  Verification Service specifically is a DIA service under the Electronic
  Identity Verification Act 2012.
- **`https://www.realme.govt.nz/en-nz/realme-verified-identity/`** — "RealMe
  verified identity". Fetched live via plain `curl` (HTTP 200, no block),
  2026-07-02. Supplies: what a verified identity is and its 10-year validity;
  the "before you apply" guidance (a verified identity is not needed merely
  to log in, e.g. NZ passport or Immigration NZ visa applications only need a
  RealMe login); the 4-step application overview ("Tell us who you are" /
  "Take a photo" / "Provide an identity referee, if required" / "Submit your
  application"); the four eligible identity records and the referee
  eligibility rules (16+, known applicant 1+ year, holds a current or
  expired NZ passport, not immediate/extended family, not co-resident); and
  the under-14 (aged 13 or under) parent/guardian consent process, including
  the separate printed "Declaration of consent form for a RealMe
  application" PDF.
- **`https://www.realme.govt.nz/en-nz/privacy/identity-verification-service-privacy-statement/`**
  — "Identity Verification Service Privacy Statement". Fetched live (HTTP
  200), 2026-07-02. This is the strongest field-level source used: a
  statutory privacy disclosure (required because this data collection is
  governed by the Electronic Identity Verification Act 2012 and the Privacy
  Act 2020) that names, per identity-record choice, the *exact* set of
  personal-information fields DIA collects — quoted verbatim in each
  affected field's own `sourceRef` above. It also supplied the identity
  referee's collected fields (passport number, full name, date of birth,
  address, phone, email, duration known), the biometric/facial-recognition
  processing description (out of scope as a field — it is something DIA
  does with the photo, not something the applicant enters), and the
  11-year post-expiry/cancellation retention period for the photo (not
  modelled as a field; a data-handling fact, not applicant input).
- **`https://www.realme.govt.nz/en-nz/terms-use/identity-verification-service-terms-of-use/`**
  — "Identity verification service terms of use". Fetched live (HTTP 200),
  2026-07-02. Corroborates the under-14 consent rule from the main page and
  confirms the terms-of-use/privacy-statement agreement step referenced by
  `agreesToTermsOfUse`.
- **`https://www.realme.govt.nz/en-nz/realme-verified-identity/taking-your-own-photo/`**
  — "Tips for taking your photo online". Fetched live (HTTP 200),
  2026-07-02. Source for the `onlinePhoto` field's description (lighting,
  background, expression, headwear rules, 5-attempt limit, 14-day
  cooling-off / partner-store fallback).
- **`https://www.realme.govt.nz/en-nz/realme-verified-identity/renew-your-verified-identity/`**
  — "Renew your verified identity". Fetched live (HTTP 200), 2026-07-02.
  Read to confirm this is a **materially different, lighter-weight process**
  (renewal only asks the holder to confirm any changed details and take a
  new photo — it does not re-collect the identity-document number or an
  identity referee) and is therefore genuinely out of scope for this
  enrolment schema, not merely an unmodelled variant of it. Worth flagging
  as a distinct future catalog candidate (`nz/dia/realme-verified-identity-renewal`
  or similar) if this vertical is revisited.
- **`https://account.home.realme.govt.nz/`** — the RealMe login page itself
  loads (HTTP 200; a Microsoft-Azure-B2C-style sign-in form requesting a
  RealMe username/password). This confirms the application proper sits
  behind authentication, not merely behind a slow-loading SPA shell — see
  below.

## What was not done — the one honest gap

Unlike `de/finanzamt/tax-identification-number` (verified by directly
operating BZSt's unauthenticated live form with Playwright) or the two SG
NRIC schemas, **no live walkthrough of the RealMe verified-identity
application itself was performed.** The application only begins after a
successful RealMe login, and a RealMe login can only be created by supplying
real New Zealand identity-document details during its own signup flow —
there is no sandbox/test account available in this environment, and
fabricating one would mean submitting invented personal data as if it were a
genuine identity claim into a live federal identity-verification system
(the same class of action this registry's standing practice already refuses
for e.g. `us/dos/passport-renewal-ds82` and `de/finanzamt/tax-identification-number`,
just one step earlier in the flow — here the block is authentication itself
rather than a final submit button).

Consequently, this schema's field inventory is derived from DIA's own
**Identity Verification Service Privacy Statement**, not from reading printed
field labels/input ids off the form. That statement is authoritative and
unusually specific (a statutory data-collection disclosure naming exact
fields per branch, quoted directly into each field's `sourceRef`), but it is
one sourcing grain below a direct field-by-field form comparison — for
example, it does not give input ids, exact on-screen field ordering within a
step, or client-side validation behaviour (format masks, character limits).
This is the same discipline used for `au/ato/individual-tax-return-mytax` and
`sg/iras/individual-income-tax-return-formb1`, whose live portals are also
authentication-gated: `status` stays `draft`, and the gap is named here
rather than glossed over.

## Modelling decisions

- **Per-document-type conditional fields, not one flat field set.** The
  privacy statement names a different exact field list for each of the four
  identity-record choices; `identityDocumentType`'s `visibleWhen`/`requiredWhen`
  pairs on `passportNumber`, `citizenshipCertificateNumber`,
  `overseasPassportNumber`, `visaOrPermitNumber`, `dateOfBirth`,
  `placeOfBirth`, `gender`, `parentMotherName`, and `parentFatherName` mirror
  that branching exactly (GSP-0013 `condition` grammar, first used in this
  registry by `sg/ica/identity-card-reregistration`).
- **`fullName` as a single field, not split given/family names.** The source
  says only "full name" for every branch, with no indication of separate
  boxes (unlike PAS300/BDM76-derived NZ schemas in this registry that do
  split names, because their own source forms print separate boxes). Kept at
  the source's own grain rather than inventing a split the source doesn't
  describe — the same discipline `sg/iras/individual-income-tax-return-formb1`
  used for its catch-all income-declaration field group.
- **`gender` modelled as an unconstrained short string, not a closed enum.**
  The privacy statement names "gender" as a collected field but does not
  publish the code list this specific service uses (contrast
  `nz/dia/passport-renewal-adult`'s `gender`, sourced from a form — PAS300 —
  that prints its own M/F/X options). Asserting an enum here would risk
  rejecting a valid value the live form actually accepts.
- **`parentFatherName` is never `requiredWhen`, only `visibleWhen`.** The
  source's own qualifier — "your parent 2/father's name (**if applicable**)"
  — is modelled literally: visible whenever `nz_birth_certificate` is chosen
  (so an agent-facing UI would show the field), but never forced required by
  that choice alone, unlike its `parentMotherName` sibling, which the source
  states unconditionally.
- **Identity referee fields are all unconditionally optional (`required:
  false`, no `requiredWhen`).** The source frames the referee step as
  DIA-initiated ("we **may need** you to provide an identity referee"), a
  determination made by DIA's own risk assessment during processing, not a
  branch the applicant selects up front the way `identityDocumentType` or
  `identityCheckMethod` are. There is no applicant-visible field this
  schema could condition a `requiredWhen` on without inventing one the
  source never describes, so the referee fields are left as
  always-available, never-forced inputs — a genuine, explained difference
  from `nz/dia/passport-renewal-adult`, whose identity referee is
  unconditionally required because its source (PAS300) treats it as a
  mandatory step for every online renewal, not a conditional one.
- **`refereeYearsKnown` as an integer, not a boolean "known >1 year?"
  gate.** The privacy statement says DIA collects "how long they have known
  you" as information, not merely a yes/no eligibility check; modelled as
  the same kind of fact DIA collects, with the >1-year eligibility
  requirement documented in the field's own description rather than encoded
  as a separate boolean not named in either source.
- **No `documents[]` member.** There is no fee for a RealMe verified identity
  (confirmed by the main page: "It's free to apply"), and the only file-like
  input is the applicant's own photo, already modelled as the `onlinePhoto`
  field (conditioned on `identityCheckMethod`) rather than a `documents[]`
  entry, consistent with how a single applicant-supplied photo is modelled
  elsewhere in this registry when no separate fee or attestation instrument
  exists alongside it.
- **Renewal is out of scope.** See the `renew-your-verified-identity` source
  entry above.

## Out of scope

- **Renewing an existing verified identity** — a distinct, lighter DIA
  process (see sources above); a candidate for a future, separate schema.
- **Plain RealMe login without a verified identity** — most services that
  say "log in with RealMe" (e.g. NZ passport or Immigration NZ applications,
  per the main source page's own example) need only a login, not the
  verified-identity credential this schema models.
- **In-person RealMe partner store document/photo capture mechanics** — this
  schema models the applicant-facing choice to use a partner store
  (`identityCheckMethod: realme_partner_store`) but not the store's own
  in-person process, which is outside any online application flow.
- **Amendment/cancellation of an issued verified identity** — mentioned by
  the privacy statement and terms of use as distinct DIA processes, neither
  described in enough field-level detail by the sources examined here to
  model.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-02** (6
months). Re-check all five sources above on or before that date, and on any
change to `source.url`. If a future session gains a way to reach the
authenticated application form itself (e.g. a legitimate RealMe test/sandbox
account becomes available), re-verify by direct form walkthrough and
promote `status` to `verified`, per `de/finanzamt/tax-identification-number`'s
precedent.
