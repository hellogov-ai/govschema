# Verification record — mt/identita/long-stay-visa-application@1.0.0

## Candidate selection

GOV-4230 ("GovSchema Standard Research", parent GOV-4215/GOV-4223). This
cycle's own research overturns this registry's own prior "MT Visa confirmed
dead end" finding recorded during the GOV-4215 scouting cycle. That finding
examined only Malta's **Schengen (short-stay, Category C) visa**, which
duplicates the EU-harmonized template already published in this registry as
`fr/france-visas/schengen-visa-application` — a genuine dead end for that
specific form. It did not examine Malta's distinct **national (Category D)
long-stay visa**, issued by Identità's own Central Visa Unit, which is a
separate application track with its own dedicated form and is structurally
analogous to Germany's (`de/auswaertiges-amt/national-visa-application`) and
Estonia's (`ee/vm/long-stay-visa-application`) own national-visa schemas
already in this registry. This document deepens Malta past its first three
published verticals (`mt/jobsplus/self-employed-declaration-of-commencement`,
Business Formation; `mt/identita/passport-application`, Passport;
`mt/identita/national-identity-card-application`, National ID), opening the
Visa vertical (4 of 6). Malta DMV remains the sole open backlog item; Malta
Taxes remains a confirmed dead end (both from the GOV-4215 scouting cycle).

## Reaching the live source

Target: `https://dvisa.identita.gov.mt/resources/dist/documents/application-v4.pdf`
("Long Stay Maltese (D) Visa Application," Central Visa Unit, Identità,
Version 2, 11.08.2023).

- Re-fetched directly with a realistic desktop Chrome User-Agent (no
  intermediate summarizer tooling needed): HTTP 200, `Content-Type:
  application/pdf`, **626,201 bytes** — byte-identical to the count in this
  issue's own scouting description. This was independently reproduced this
  cycle, not assumed from the prior finding.
- sha256 of the retrieved bytes: `b68be680039130d27847ab591e592a5487c6a45ece9bb03db801e12b9aa51112`.
- No login, CAPTCHA, or Cloudflare/WAF gate on the asset itself.
- Confirmed mechanically, not asserted from memory: the retrieved bytes
  begin `%PDF-1.4` and contain **zero** `/AcroForm` or `/Widget`
  occurrences — a flat, print-and-fill specimen, the same class as this
  registry's other Identità-family PDFs. Object-count check confirms
  exactly 6 `/Type/Page` objects, matching the source's own "1 of 6"
  through "6 of 6" page footers and this issue's own "6-page" description.

## Extraction method

Per this registry's established Maltese-Identità-family extraction pattern
(`mt/identita/passport-application`, `mt/identita/national-identity-card-application`),
`pdfjs-dist` (available at `node_modules/pdfjs-dist` under a scratch working
directory) was used to run this PDF's own embedded text-layer extraction
(`getTextContent()`), rather than a raw `zlib`-stream/paren-regex read or an
OCR/pixel-scan fallback. Unlike its two sibling Identità PDFs (which use a
custom glyph-index font encoding requiring the PDF's own `ToUnicode` CMaps to
decode), this PDF's text-showing operators resolve to readable text directly
through `pdfjs-dist`'s normal extraction path — but the same toolchain was
used regardless, consistent with this registry's own established pattern for
this document family, and because it reliably reconstructs each field's
layout position. Text was rendered per page, grouped by y-coordinate row and
sorted by x-coordinate, to reconstruct each field label and its layout
position, for all 6 pages.

## What the PDF's 6 pages map to

- **Page 1** (Section 01 "APPLICANT'S DETAILS," through Contact Details and
  the start of Passport Details) → `title` through `mobileNumber`/
  `personalEmailAddress`, then `travelDocumentType`.
- **Page 2** (Passport Details continued; Section 02 "TRAVEL INFORMATION,"
  Applicant's Home Address in Full, Applicant's Accommodation Details in
  Malta) → `otherTravelDocumentTypeDetails` through `validUntil`, then
  `purposeOfTravel` through `maltaAccommodationPostcode`.
- **Page 3** (Section 03 "HOST DETAILS IN MALTA") → `hasHostInMalta` through
  `whoIsPaying`.
- **Page 4** (Section 04 "PARENTAL AUTHORITY (IN CASE OF MINORS UNDER 18
  YEARS OF AGE) / LEGAL GUARDIAN") → `applicantIsMinor` through
  `parent2Country`.
- **Page 5, top** (an unnumbered block, printed immediately after the Parent
  1/Parent 2 blocks and before the Section-04-closing "Applicant's
  Signature" line) → the EU/EEA/Swiss/UK-Withdrawal-Agreement family member
  fields, `euEeaFamilyMemberAccompanying` through `euFamilyMemberRelationship`.
- **Page 5, "Applicant's Signature / Date of Signature"** (first occurrence,
  closing the block above) → the `section04Signature` documents[] entry.
- **Page 5, Section 05 "DECLARATION"** (the GDPR/consent/background-checks
  text, ending in its own "Applicant's Signature / Date of Signature") →
  the `mainDeclarationSignature` documents[] entry.
- **Page 6, Section 06 "SUPPORTING DOCUMENTS"** → the six checklist
  `documents[]` entries (`validPassportDocument` through
  `otherSupportingDocuments`).
- **Page 6, footer** (Identità Central Visa Unit contact details, version/
  date stamp) — process/contact metadata, not applicant-supplied data; not
  modelled as a field.

## Disclosed source-fidelity findings

1. **No printed required/optional signal anywhere on this form.** Every
   extracted text item across all 6 pages was mechanically checked for a
   literal `*` character; zero were found. This differs from *both* sibling
   Identità-family forms already in this registry:
   `mt/identita/passport-application`'s asterisk-as-checkbox convention
   (an asterisk there flags a tick-box field, per its own "tick the box as
   necessary" footnote) and `mt/identita/national-identity-card-application`'s
   asterisk-as-mandatory convention (an asterisk there does mean required,
   per its own "FILL IN ALL MANDATORY FIELDS (*)" instruction). This form
   uses neither convention — it prints no distinguishing mark at all. Every
   field's `required`/`required: false` value in this schema is therefore a
   domain-judgment call, not derived from any printed signal, and is
   disclosed per-finding below rather than silently applied.

2. **Section 01's core identity/travel-document/passport particulars
   modelled required; convenience contact fields modelled mixed.** Absent
   any printed signal, `title`/`surname`/`givenNames`/
   `identityDocumentNumber`/`nationality`/`placeOfBirth`/`countryOfBirth`/
   `dateOfBirth`/`currentOccupation`/`gender`/`maritalStatus` and the full
   Passport Details block (`travelDocumentType` through `validUntil`) are
   modelled `required: true` as the particulars necessary to process any
   visa application (the same "no signal → required for core identity
   fields" default `mt/identita/passport-application`'s own Finding 1
   established). `otherNationalities` is modelled optional (an "if
   applicable" field by its own printed wording). Of the two contact
   fields, `mobileNumber` is modelled required (the primary, always-listed
   contact channel across this registry's visa forms) and
   `fixedTelephoneNumber` optional (a supplementary landline channel not
   every applicant has); `personalEmailAddress` is modelled required,
   consistent with every other visa schema in this registry treating a
   contact email as a mandatory notification channel.

3. **Section 03's own note ("...if applicable host is required to fill in
   details...") conditions the whole section, with no printed checkbox.**
   Modelled as a directly-supplied boolean gate, `hasHostInMalta`, the same
   convention `mt/identita/passport-application` established for its own
   `spouseSectionApplies`/`citizenshipSectionApplies`. `whoIsPaying` is
   modelled as an unconditionally required, independent field (not gated on
   `hasHostInMalta`), since "Myself" is a valid, meaningful answer even with
   no host at all. `hostIdentityDocumentNumber` is modelled required
   whenever `hasHostInMalta` is true regardless of `hostType`, though it is
   most plausibly meaningful only for a natural-person host — the form
   prints one shared field beneath both host-type options with no visible
   split by type, so this is disclosed rather than silently narrowed.
   `hostFixedTelephoneNumber` is modelled optional (paralleling the
   applicant's own optional fixed line), visible whenever a host applies.

4. **Section 04's own header ("...IN CASE OF MINORS UNDER 18 YEARS OF
   AGE...") conditions the whole section, with no printed checkbox.**
   Modelled as a directly-supplied boolean gate, `applicantIsMinor`, the
   same convention `mt/identita/passport-application` established for its
   own field of the identical name. Parent 1 / Legal Guardian 1's core
   fields (`parent1Surname`/`parent1Name`/`parent1Nationality`/
   `parent1MobileNumber`/`parent1Email`) are modelled `requiredWhen
   applicantIsMinor`; `parent1Address`/`parent1Postcode`/`parent1Country`
   are modelled optional (only `visibleWhen applicantIsMinor`), since the
   form's own printed note reads "(if different from applicant's
   contact)" — an explicitly conditional sub-field, unlike the core fields
   above it.

5. **Parent 2 / Legal Guardian 2's block is a judgment call, disclosed
   rather than silently narrowed.** The form prints Parent 2's block
   identically to Parent 1's, with no note distinguishing a single-guardian
   case (unlike Section 03's own explicit "if applicable"). This schema
   models Parent 2's core fields `requiredWhen applicantIsMinor`, mirroring
   the printed symmetry between the two blocks. A future review could
   reasonably instead treat Parent 2 as optional supplementary information
   (a minor may have only one legal guardian with authority to consent);
   this alternative reading is disclosed here rather than silently chosen
   over the symmetric one.

6. **The EU/EEA/Swiss/UK-Withdrawal-Agreement family member block (page 5,
   top) has no section number of its own.** It is printed between the
   Parent 1/Parent 2 blocks (Section 04) and the "Applicant's Signature"
   line that closes Section 04, immediately before the "05 DECLARATION"
   heading. This schema treats it as a continuation of Section 04, not its
   own numbered section, per its printed position. It closely parallels
   `ee/vm/long-stay-visa-application`'s own `euRelativeAccompanying` gate
   (also modelled as a directly-supplied boolean, since neither form prints
   a checkbox for the underlying "does this apply to you" question) but is
   not identical: Malta's relationship enum
   (`SPOUSE`/`CHILD`/`GRANDCHILD`/`DEPENDENT_ASCENDANT`/
   `REGISTERED_PARTNERSHIP`/`OTHER`) explicitly includes `GRANDCHILD`
   alongside a bare `OTHER`, distinct from Estonia's own
   `spouse`/`child`/`dependent-ascendant`/`grandchild`/`registered-partner`
   list (no bare "other" catch-all on Estonia's own enum). This section has
   no counterpart at all in `de/auswaertiges-amt/national-visa-application`.

7. **Two distinct "Applicant's Signature / Date of Signature" lines,
   modelled as two separate attestation documents.** The first (page 5, top,
   immediately after the EU family-member block) closes out Section 04; the
   second (page 5, bottom, after the Declaration's own GDPR/consent text)
   closes Section 05. Both print identically despite Section 04 nominally
   being a parent/guardian's-authority section — this mismatch (the
   signature line reads "Applicant's," not "Parent's/Guardian's," even
   there) is disclosed rather than silently relabeled. Modelled as two
   separate `documents[]` attestation entries, `section04Signature` and
   `mainDeclarationSignature`, per their distinct printed positions.

8. **Section 06's checklist prints no conditional signal distinguishing
   which documents apply to which purpose of travel.** `validPassportDocument`,
   `invitationDocument`, `meansOfTransportDocument`, `healthInsuranceDocument`,
   and `financialMeansDocument` are modelled `required: true`;
   `otherSupportingDocuments` ("Others") is modelled `required: false` as
   the open-ended catch-all — the same "no printed distinguishing signal →
   required for the named checklist categories" default
   `mt/identita/passport-application`'s own Section 02 (physical documents)
   treatment established.

9. **No applicant-photo document is modelled, unlike Germany's or Estonia's
   national-visa schemas.** Both `de/auswaertiges-amt/national-visa-application`
   and `ee/vm/long-stay-visa-application` model an explicit passport-style
   photo as a `documents[]` entry. This form's own Section 06 checklist does
   **not** list a photo among its six items, though the Declaration's own
   consent text (page 5) does reference "the taking of my photograph...are
   mandatory for the examination of the application" — read as an in-person
   biometric-capture step at the visa office, not a submitted print.
   Disclosed as a genuine, mechanically-confirmed absence rather than an
   oversight; no `applicantPhoto` document is modelled.

10. **The Declaration's own "multiple entry visa" parenthetical has no
    corresponding field anywhere on the printed form.** The Declaration
    text (page 5) opens: "I am aware that the visa fee is not refunded if
    the visa is refused. Applicable in case a multiple entry visa is
    applied for: I am aware of and consent to..." — implying a single-vs-
    multiple-entry-visa choice exists somewhere in the underlying process,
    but no selectable field (checkbox, radio, or text box) for it appears
    anywhere in the 6 extracted pages. Disclosed here rather than
    fabricated as a field, the same "disclose rather than invent an
    unprinted field" treatment this registry's other Identità-family
    schemas have each given an analogous external-process detail with no
    corresponding printed control.

11. **The "Declaration of Proof Form" (page 3) is a distinct companion
    document, out of scope for this schema's own `fields[]`.** Section 03's
    own note directs the host, when applicable, to complete a separate
    "Declaration of Proof Form" and submit it together with this
    application. This is modelled only as the `hostDeclarationOfProofForm`
    documents[] entry (`requiredWhen hasHostInMalta`), not expanded into
    its own field set, since it is a distinct form outside this cycle's
    scope — a candidate for its own future schema.

## Duplicate-vs-distinct comparison against `de/auswaertiges-amt/national-visa-application`

**Verdict: genuinely distinct, not a duplicate.** Following this registry's
established convention (Poland's, Portugal's, and Switzerland's national
D-visa forms were each found to be field-for-field duplicates of Germany's
template, while Spain's, the Czech Republic's, and Estonia's were each
independently confirmed genuinely distinct), Malta's form was compared
field-by-field against `de/auswaertiges-amt/national-visa-application`'s own
`schema.json` before authoring.

**Shared shape (the common Schengen-harmonized convention):** the opening
identity/travel-document items — surname, given name(s), date/place of
birth, nationality, marital status, and travel-document type/number/
issuing-country/dates — follow the same general shape common to every
EU/Schengen-associated country's own national long-stay visa form already in
this registry (Germany, Estonia). This is the shared baseline, not a sign of
duplication.

**Where Malta's form diverges from Germany's:**

- **Host Details in Malta (Section 03)** — an organisation-vs-person host
  election, the host's own contact particulars (address, ID number, phone,
  email), and a "who is paying" field. Germany's form has no counterpart at
  all: its Section 10 ("References in Germany") is a single, entirely
  optional address/phone/email block with no organisation-vs-person split,
  no ID-number field, and no "who is paying" question.
- **EU/EEA/Swiss/UK-Withdrawal-Agreement family member section** — closely
  parallels Estonia's own `euRelativeAccompanying` gate (see Finding 6
  above) but has **no counterpart in Germany's form at all**. Germany's
  form instead has an unconditional father/mother-of-**applicant** block
  (Section 4) and a separate accompanying-family-members question
  (Section 8) — structurally different concerns (the applicant's own
  parents' background, and family travelling with the applicant generally,
  rather than a specific EU/EEA/Swiss-citizen relative's own credentials).
- **A minors-only Parental Authority/Legal Guardian section.** Malta's
  Section 04 applies only when the applicant is a minor. Germany's
  equivalent section (Section 4) is the **adult applicant's own parents'**
  particulars, required unconditionally regardless of the applicant's age
  — a materially different concern (background information about the
  applicant's origin, not a minor's legal-guardian consent).
- **A distinct 7-category purpose-of-travel taxonomy**
  (`PROFESSIONAL_BUSINESS`/`CULTURAL`/`SPORTS`/`OFFICIAL_VISIT`/
  `MEDICAL_REASONS`/`STUDY`/`OTHER`), sharing no labels with Germany's own
  6-category list (Employment/Study/Au pair/Language course/Family
  reunion/Other) or Estonia's own 8-category list (Business/Medical
  reasons/Study/Short term employment in Estonia/Visiting family or
  friends/Remote working/Startup entrepreneurship/Other).
- **Administrative-subdivision address fields** (District/Province/State,
  printed as three separate boxes to accommodate different countries'
  address formats) with no counterpart in Germany's single free-text
  address-line convention.

**Where Germany's form has sections Malta's has none of:** an unconditional
children-details block (Section 3); an unconditional accompanying-family-
members question (Section 8); a criminal-conviction declaration, in Germany
and/or abroad (Section 14); and a notifiable-disease declaration (Section
16). None of these appear anywhere in Malta's 6-page form.

**Net:** a genuinely distinct national D-visa form, sharing only the opening
Schengen-harmonized item shape with Germany's template, then diverging
structurally in both directions (sections Malta has that Germany lacks, and
vice versa) — authored as its own schema, consistent with the Estonia/Spain/
Czech Republic precedent (genuinely distinct) rather than the Poland/
Portugal/Switzerland duplicate precedent.

## Scope notes (GSP-0009 — no array/repeating-field type in GovSchema v0.3)

No field on this form presented as a repeating table or multi-select
requiring collapse into a single free-text field — every section's field set
is a fixed, single-occurrence layout (unlike, e.g., Germany's five-row
previous-stays table or Estonia's repeating Schengen-visa-history table).
No collapsing was needed for this document.

## Conformance

2 valid mock scenarios and 8 mutation-control fixtures committed under
`conformance/mt/identita/long-stay-visa-application/1.0.0/`:

- `valid-adult-business-self-funded-no-host.json` — a single adult
  applicant travelling on business, self-funded, with no host in Malta, not
  a minor, and no EU/EEA/Swiss family member accompanying.
- `valid-minor-with-eu-family-member-and-host-organisation.json` — a minor
  applicant travelling for study, hosted and funded by a host organisation
  in Malta, both Parent 1 and Parent 2 / Legal Guardian details completed,
  and accompanied by an EU/EEA/Swiss-citizen spouse-of-a-family-member.
- 8 mutation controls: a missing statically-required field
  (`mutation-missing-surname-required.json`); a missing
  `otherTravelDocumentTypeDetails` while `travelDocumentType` is `OTHER`
  (`mutation-missing-othertraveldocumenttypedetails-requiredwhen.json`); a
  missing `hostType` while `hasHostInMalta` is true
  (`mutation-missing-hosttype-requiredwhen.json`); a missing
  `hostOrganisationName` while `hostType` is `ORGANISATION`
  (`mutation-missing-hostorganisationname-requiredwhen.json`); a missing
  `parent1Surname` while `applicantIsMinor` is true
  (`mutation-missing-parent1surname-requiredwhen.json`); a missing
  `euFamilyMemberSurname` while `euEeaFamilyMemberAccompanying` is true
  (`mutation-missing-eufamilymembersurname-requiredwhen.json`); an invalid
  `gender` enum value (`mutation-invalid-gender-enum.json`); and an unknown
  top-level field (`mutation-unknown-field-rejected.json`).

An ephemeral, from-scratch conformance checker (deriving required/
requiredWhen rules directly from this schema's own `fields[]`/`documents[]`,
discarded after use, not committed) ran all 10: both valid scenarios at 0
errors, all 8 mutation controls each raising exactly 1 error, and confirmed
every `requiredWhen`/`visibleWhen` field reference resolves (0 dangling
references) and both `crossFieldValidation` rules
(`validUntilAfterDateOfIssue`, `tentativeDepartureAfterArrival`) hold on the
two valid scenarios.

Validated clean with `node tools/validate.mjs` and `node tools/validate-ajv.mjs`
(583/583 both), individually and as part of the full registry run.
`registry-index.json` regenerated via `npm run build-index` in
`tools/govschema-client/` (582 → 583 entries).
