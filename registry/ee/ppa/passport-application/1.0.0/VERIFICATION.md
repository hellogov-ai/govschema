# Verification record — `ee/ppa/passport-application` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-08`

This is **GOV-1712**: "GovSchema Standard Research" — Estonia currently has 2
of 6 verticals published (National ID & Civic Documents,
`ee/ppa/e-residency-application`, GOV-1698; Business Formation,
`ee/rik/private-limited-company-foundation`, GOV-1705). The issue's own
screening order named Passport as the top-priority candidate, since PPA — the
same agency behind the already-published e-Residency schema — publishes its
own English-language service pages and, this cycle found, a real downloadable
application form. This candidate turned out strong enough that Taxes (EMTA)
and DMV (Transpordiamet) were never screened this cycle — see "Candidates not
screened" below.

## Candidate screening (Phase 1-2)

### Candidate examined and picked: `politsei.ee`'s "APPLICATION FOR IDENTITY DOCUMENTS" form

Both prior EE schemas relied on the "governing statute as primary source"
technique because their live application portals (`eresident.politsei.ee`,
the e-Business Register's `ettevõtjaportaal`) are authenticated,
client-rendered SPAs with no unauthenticated field-level view. This cycle
searched `politsei.ee` — the PPA's own server-rendered, plain-English site,
already known from GOV-1698 to be a distinct site from the authenticated
application SPAs — for a passport-specific service page, and found something
stronger than either prior EE schema had: a direct link to a real,
unauthenticated, downloadable **AcroForm PDF**,
`https://www.politsei.ee/files/Dokumentide%20taotlemise%20ankeedid/eng-dok-taotlus.pdf`,
titled "APPLICATION FOR IDENTITY DOCUMENTS." Confirmed directly this cycle: a
plain `curl` GET returns HTTP 200 and 669,861 bytes of real `%PDF-1.6` data
(not an image scan — `pdfjs-dist`'s AcroForm annotation layer lists 50+ real,
named text/checkbox/radio widgets, e.g. `Eesnimi või -nimed1`, `Perekonnanimi
või -nimed1`, `pass põhjus`, `Kinnitus 1`/`Kinnitus 2`, `Esindaja nimi`). This
is a stronger source shape than either `ee/ppa/e-residency-application` or
`ee/rik/private-limited-company-foundation`, neither of which had a
downloadable form.

The form covers **five distinct identity-document types** through one shared
"Personal Data"/"Contacts" section plus five parallel document-specific rows
(identity card, digital identity card, **travel document**, additional
passport, seafarer's discharge book/certificate of record of service on
ships) — this document scopes to the **travel document** row only, since an
Estonian citizen's passport is requested through it (Identity Documents Act
§3(1): a travel document is "an Estonian document" prescribed for crossing
the state border; §21 confirms Estonian citizen's passports are issued for
this purpose).

### Corroborating sources: PPA's plain-English service pages

- `https://www.politsei.ee/en/instructions-for-completing-application-form`
  — walks through the form's own sections field-by-field in plain English
  (confirms which fields are optional, the signature-sample rules, the
  lost/stolen-document data requirement, and the legal-representative rule).
- `https://www.politsei.ee/en/instructions/estonian-passport-for-an-adult`
  and its `applying-for-a-passport-at-a-service-office` and
  `applying-at-the-self-service-portal` sub-pages — confirm the ordinary
  (30-day) vs. expedited (1-working-day, Tallinn-pickup-only) procedure, the
  mandatory fingerprinting requirement, the first-time-application
  citizenship-proof requirement (an identity document, or a parent's/
  grandparent's Estonian-citizenship document plus a blood-relationship
  certificate), and — the key new element on top of what either prior EE
  schema achieved — a **confirmed, primary-sourced state-fee schedule**: EUR
  60 standard, EUR 25 for retirement-age/disability discount eligibility,
  EUR 250 expedited (service-office); EUR 50/20/250 (self-service portal,
  out of scope here). All retrieved directly (HTTP 200, no login, plain
  server-rendered HTML).

### Governing statute: Identity Documents Act (Isikut tõendavate dokumentide seadus)

The Act's current consolidated English translation (in force from
01.10.2025) was retrieved to confirm the chapter/section numbers this
document cites and to source the fields the application form's own text does
not fully explain (e.g. exactly what data §9(3) permits a document to carry,
and §21¹'s 1-year-validity passport pathway). Same `riigiteataja.ee`
SPA-shell obstacle as both prior EE schemas: a direct `curl` of every route
tried (the human-facing `/en/eli/.../consolide` page, its `/tolge/pdf/`,
`/tolge/text/`, and `/tolge/xml/` download routes) returns only Angular
shell/JS-disabled placeholder text, not the actual statutory text. Resolved
via the Wayback Machine, with an added wrinkle this cycle: `riigiteataja.ee`
publishes numbered **redaction-specific** URLs (e.g.
`/en/eli/504022020003/consolide` is permanently pinned to the wording in
force 01.02.2020-31.12.2020, not "whatever is current"), so the correct
in-force redaction's own numbered URL had to be located first via the Act's
`/en/tolge/versions?grupiId=100120` version-index page (also fetched via
Wayback), which listed "Identity Documents Act (01.10.2025)" at
`/en/eli/ee/530092025008/consolide` as the most current entry. The
corresponding `/en/tolge/pdf/530092025008` route's Wayback snapshot (2 October
2025) resolved to a real, extractable 204,188-byte `%PDF-1.4` (37 pages,
real text layer, `pdfjs-dist`-extracted, no OCR needed) confirming: Chapter 3
(§§9-15², the standard-format/data-entry regulation-making power, biometric
data processing, and application/review procedure) and Chapter 6
(§§21-21¹, 24-25, "Estonian citizen's travel documents" — passport issuance
basis, the 1-year-validity-without-fingerprints pathway for citizens abroad
with no accessible representation, validity terms of up to 10 years for
adults/5 years for under-15s, and unlimited scope of application).

## Candidates not screened

Per this cycle's own priority order, Taxes (EMTA/Maksu- ja Tolliamet) and
DMV (Transpordiamet) were not screened, since Passport turned out
genuinely well-sourced on the first candidate examined — stopping at the
first well-sourced candidate rather than force-screening the full list,
consistent with this cycle's own instructions. Both remain open,
unscreened backlog candidates for a future EE-focused cycle, as does Visa
(lowest priority, since this registry's own prior cycles found national
visa applications in other EU/Schengen jurisdictions duplicate an
already-modelled template).

## Field inventory (Phase 3)

24 `fields[]` entries and 5 `documents[]` entries, every one carrying its own
`sourceRef` citing either the AcroForm's own field name or a specific
Identity Documents Act section, or a named PPA service page. Summary by
step:

| Step | Fields | Source |
|---|---|---|
| Personal data | `givenName`, `surname`, `personalIdentificationCodeOrDateOfBirth`, `gender`, `countryOfBirth`, `citizenship`, `educationLevel`, `nationality`, `nativeLanguage` | Application form, Personal Data section; Identity Documents Act §9(3) |
| Contacts | `contactAddress`, `zipCode`, `contactEmail`, `phoneNumber` | Application form, Contacts section |
| Passport request and place of issue | `passportRequestReason`, `lastDocumentLossOrTheftDate`, `citizenshipProofMethod`, `placeOfIssue`, `expeditedProcedureRequested`, `feeDiscountEligibility` | Application form, Travel document row; PPA "Estonian passport for an adult" |
| 1-year validity passport | `applyingForOneYearValidityPassport`, `oneYearValidityJustificationBasis`, `oneYearValidityJustificationDetails` | Application form, page 2; Identity Documents Act §21¹ |
| Legal representative | `hasLegalRepresentative`, `legalRepresentativeFullName`, `legalRepresentativePersonalIdCodeOrDob`, `representingInstitutionName`, `representingInstitutionRegistryCode` | Application form, page 2; Identity Documents Act §10(3), §12¹(3)-(5) |
| Documents | `documentPhoto`, `citizenshipProofDocument` (conditional), `bloodRelationshipCertificate` (conditional), `stateFeePayment`, `dataAccuracyAttestation` | Application form footer; PPA "Estonian passport for an adult"; Identity Documents Act §4¹ |

## Access notes and judgment calls

1. **Scoped to the travel-document ("Pass") row of a 5-in-1 combined
   form.** The same AcroForm PDF also covers the identity card, digital
   identity card, additional passport, and seafarer's discharge book
   application tracks. Modelling all five in one v1.0.0 document would mean
   either five near-duplicate parallel field sets or an unbounded
   document-type-selector construct this meta-schema does not offer; scoped
   to the travel-document/passport track only, since that is this cycle's
   target vertical. A future v1.1.0+ could add the identity-card track as a
   distinct sibling schema (`ee/ppa/identity-card-application`) reusing most
   of the same Personal Data/Contacts fields.
2. **Scoped to a domestic service-office submission, not the self-service
   portal or a consular submission abroad.** The self-service portal
   (`https://www.politsei.ee/en/instructions/estonian-passport-for-an-adult/applying-at-the-self-service-portal`)
   is renewal-only (an adult with an existing, non-name-changed passport)
   and reuses a photo/fingerprint/signature already on file rather than
   collecting them fresh, and carries its own distinct fee schedule (EUR
   50/20/250 vs. this document's EUR 60/25/250); consular submission abroad
   (Identity Documents Act §11⁴(4)) is a third distinct channel. All three
   channels ultimately populate the same underlying data this document
   models, but conflating their differing fee schedules and biometric-reuse
   rules into one v1.0.0 would overstate what was actually verified. Left
   as a disclosed scope boundary; a future revision could parametrize the
   channel.
3. **`documents.stateFeePayment.amount` states only the standard,
   non-discounted, non-expedited fee (EUR 60).** Unlike
   `ee/rik/private-limited-company-foundation`'s state-fee gap (that
   cycle could not confirm any fee figure from a primary source), this
   cycle confirmed **four** fee tiers directly from PPA's own "Estonian
   passport for an adult" page (EUR 60 standard, EUR 25 retirement-age/
   disability discount, EUR 250 expedited, EUR 80 combined passport+ID-card
   bundle — the last out of scope here per judgment call 1). Since the
   meta-schema's `documents[].amount` is a single fixed currency/value pair
   with no conditional variant, the confirmed tiers beyond the standard one
   are disclosed in the document's own `description` and cross-referenced to
   the `expeditedProcedureRequested`/`feeDiscountEligibility` fields, rather
   than each being encoded as a separate `amount`.
4. **Fingerprinting is not modelled as a field.** Identity Documents Act
   §11⁶ makes fingerprinting for a document containing biometric data (which
   includes the Estonian citizen's passport, per §9²(3)) a mandatory
   in-person act performed by the issuing authority at the time of
   application, not applicant-submitted data — consistent with this
   registry's applicant-input-only convention (the same reasoning
   `ee/rik/private-limited-company-foundation` applied to registrar-assigned
   registry outputs).
5. **The two page-2 "SHALL BE COMPLETED BY..." blocks for an aliens'
   passport applicant and a National Defence Act permit holder are excluded.**
   The combined form's page 2 has four checkbox blocks total
   (`Kinnitus 1`-`Kinnitus 4`); only the first two (the 1-year-validity
   Estonian citizen's passport justification, §21¹) are in scope for this
   document. `Kinnitus 3` ("I confirm that I have no travel document of a
   foreign country...") applies to an alien's-passport applicant and
   `Kinnitus 4` to a National Defence Act permit holder staying in Estonia —
   both distinct applicant categories from an Estonian citizen applying for
   an Estonian citizen's passport, and out of scope here.
6. **`citizenshipProofMethod`/`citizenshipProofDocument`/
   `bloodRelationshipCertificate` model an "OR" alternative as two
   conditionally-required paths, not a single combined field.** The source
   states citizenship may be proved by the applicant's own identity document
   OR a parent's/grandparent's Estonian-citizenship document (which itself
   requires an additional blood-relationship certificate) — modelled via
   `citizenshipProofMethod`'s enum gating which of the two document
   `requiredWhen` conditions fires.
7. **`personalIdentificationCodeOrDateOfBirth` is a plain string, no
   pattern.** Same judgment call as
   `ee/rik/private-limited-company-foundation`'s `founderPersonalIdentificationCode`:
   an Estonian isikukood (11 digits) or, in its absence, a date of birth —
   two different shapes the source itself does not further constrain to a
   single pattern.
8. **`gender` models the form's own binary male/female checkbox pair.** The
   AcroForm's `sugu` widget is a two-position radio group with no other
   option on the form as retrieved; not an assertion that no other value is
   ever recorded on the underlying identity-documents database.

## Test run (Phase 4)

No live submission was attempted: submitting this form in person at a PPA
service office requires appearing with an identity document, undergoing
mandatory fingerprinting, and paying a real state fee to receive a real
legal travel document — not a safe or reversible action to simulate against
a live government process, consistent with this registry's standing
discipline (the same reasoning both prior EE schemas documented).

Instead, one fully hand-constructed mock record was built from this
document's own field inventory — a fictional adult Estonian citizen renewing
an expiring passport domestically at the Tallinn service office under the
ordinary (non-expedited, non-discounted) procedure, with no legal
representative — and is committed as this document's conformance fixture
(`conformance/ee/ppa/passport-application/1.0.0/passport-renewal-domestic.json`).
It was checked with a small ad hoc Node script (not committed) that compiles
`schema.json`'s own `required`/`requiredWhen`/`validation` rules (including
the shared `Condition` grammar's `equals` leaf) and every
`documents[].required`/`requiredWhen` rule, and evaluates them directly
against the fixture:

```
$ node check.mjs registry/ee/ppa/passport-application/1.0.0/schema.json conformance/ee/ppa/passport-application/1.0.0/passport-renewal-domestic.json
All required/requiredWhen/enum/pattern checks passed against conformance/ee/ppa/passport-application/1.0.0/passport-renewal-domestic.json
```

**Negative controls** (each run against a variant payload, not committed as
separate fixture files), confirming the script actually catches violations
rather than passing vacuously:

- (a) `contactEmail: "not-an-email"` — caught: fails the e-mail `pattern`.
- (b) `gender: "other"` — caught: not in `["male","female"]`.
- (c) `givenName` removed entirely — caught: `FIELD givenName: required but
  missing`.
- (d) `passportRequestReason: "first-application"` with
  `citizenshipProofMethod` omitted — caught: both `FIELD
  citizenshipProofMethod: required but missing` **and** `DOCUMENT
  citizenshipProofDocument: required but missing` fire together — confirming
  a field-level and document-level `requiredWhen` gated on the same
  condition both evaluate consistently.
- (e) `documents.stateFeePayment` removed — caught: `DOCUMENT
  stateFeePayment: required but missing`.
- (f) `hasLegalRepresentative: "yes"` (a string, not a boolean) — caught:
  `FIELD hasLegalRepresentative: expected boolean, got string`.
- (g) `applyingForOneYearValidityPassport: true` with both
  `oneYearValidityJustificationBasis`/`oneYearValidityJustificationDetails`
  omitted — caught: both flagged as `required but missing`.

All seven negative controls were correctly identified by the script.

Both meta-schema validators were run against the finished document and pass
clean:

```
$ node tools/validate.mjs registry/ee/ppa/passport-application/1.0.0/schema.json
ok   registry/ee/ppa/passport-application/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/ee/ppa/passport-application/1.0.0/schema.json
ok   registry/ee/ppa/passport-application/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).
```
