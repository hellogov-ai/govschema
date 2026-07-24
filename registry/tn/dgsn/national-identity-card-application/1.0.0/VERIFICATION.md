# Verification record — tn/dgsn/national-identity-card-application@1.0.0

## Candidate selection

GOV-4652 ("GovSchema Standard Research"). GOV-4638 (a prior cycle of the
same recurring routine) scouted Tunisia's National ID (CIN) candidate as
STRONG and uncaveated — served from the same `sicad.gov.tn` portal as the
Passport form it authored that cycle (`tn/dgsn/passport-application`,
which opened Tunisia as the registry's 94th jurisdiction) — but banked it
rather than authoring it, since that cycle's scope was the new-
jurisdiction opening itself. This cycle re-scouted and confirmed the
candidate live before authoring it, closing one more of Tunisia's six
verticals (2/6). Tunisia's remaining four verticals (Taxes, Business
Formation, Visa, DMV) are unchanged open backlog — see
`tn/dgsn/passport-application`'s own VERIFICATION.md for that record.

## Reaching the live source

Found via a site search for the CIN application, landing on
`http://www.sicad.gov.tn/Fr/Imprime_Demande-de-carte-didentite-nationale-AR_66_3_D293`
(the "AR" suffix in this landing page's own slug reflects the linked
form's monolingual-Arabic content, not a separate/alternate edition — no
sibling French-labelled CIN form was found on the portal, unlike the
Passport form's own bilingual specimen).

- Plain unauthenticated `curl` request (realistic desktop `User-Agent`
  header; no session/cookie state, no CAPTCHA/WAF challenge).
- Same HTTP-only hosting property as the companion Passport schema
  (`https://` to this domain returns `ECONNREFUSED`) — re-verify via
  `http://` in any future cycle.
- Landing page: HTTP 200, 51,707 bytes.
- Linked PDF: `http://www.sicad.gov.tn/Fr/upload/1428663336.pdf` — HTTP
  200, **40,619 bytes** retrieved, matching GOV-4638's own banked estimate
  ("41KB") almost exactly.
- PDF header `%PDF-1.5\r%...` at byte 0.
- sha256 of the retrieved bytes:
  `1ccece129f681dc936c65ea22921bc83e69760d2607d58a71fb6bb9731d2fe63`.
- 2 pages, confirmed via `pdfjs-dist`'s `numPages`.
- `getAnnotations()` returned 0 annotations on both pages — a flat,
  print-and-fill specimen, not an interactive AcroForm.

### Authority attribution

Same header block as the companion Passport schema — "الجمهورية
التونسية" (Republic of Tunisia) / "وزارة الداخلية" (Ministry of the
Interior) / "الإدارة العامة للأمن الوطني" (DGSN) — so `authority` is
attributed identically. `sicad.gov.tn` is again modelled as the hosting
portal, not the issuing authority.

## Extraction method

`pdfjs-dist` `getTextContent()` extracted a completely clean text layer
on both pages — every label, blank line, and footnote present at its
correct `x`/`y` position, right-to-left reading order resolved the same
way as the companion Passport schema. Unlike that schema, **this
specimen carries no French text anywhere** — every visible string on
both pages is Modern Standard Arabic (confirmed by inspecting the full
`getTextContent()` item list; no Latin-script string appears except the
form number `IL.01-12/2013` itself). This is a new translation
circumstance for this registry: prior Tunisian/bilingual sources let the
French half double-check the Arabic-to-English translation; here, every
field label below is this registry's own direct Arabic-to-English
translation with no source-printed bilingual crutch.

To reduce translation risk, this specimen was additionally **rendered to
PNG at 3x scale via `node-canvas`** (unlike the companion Passport
schema, which skipped rendering since its checkboxes were plain numbered
list items) — rendering succeeded cleanly with no glyph-path failures,
letting every checkbox grid, table border, and line grouping be visually
confirmed against the extracted text-layer positions rather than relying
on coordinate math alone. This also resolved one genuine layout ambiguity
the text layer alone left uncertain: the marital-status checkbox grid
has only **three** columns on this specimen (single, married, widowed —
no "divorced" option), confirmed visually, versus the companion Passport
schema's four-option version (which does include divorced).

## Document structure

**Page 1** (the entire applicant-facing form) — header (Republic of
Tunisia / Ministry of the Interior / DGSN); a dashed fee box (payment
receipt number, fiscal stamp fee amount) top-right; a 3-option numbered
request-type checklist top-left (first-time, loss, replacement); an
office reference block (الجهة/العدد — authority/number — plus an
adjoining blank stamp box) between the title and the applicant's own
data, modelled as out of scope (see below); the applicant's own family
name and sex (male/female checkboxes); first name; father's and
grandfather's first names; date of birth (day/month/year boxes) and
place of birth, beside a 3-option marital-status checkbox grid (single,
married, widowed); mother's first name and family name; spouse's first
name and family name (conditional on marital status); profession; home
address, beside a blood-type box; governorate; previous/old ID card
number; an organ-donor opt-in checkbox with an adjoining sworn-liability
declaration and mandatory signature box; and finally an entirely
office-only tail (a fingerprint-classification grid, right-thumbprint
box, file number/date, and the receiving center chief's own signature),
followed by a tear-off citizen deposit receipt (issued-to-holder line,
registration number/date/office, officer's signature) below a
scissors-icon cut line.

**Page 2** — an internal DGSN processing memo, not applicant-facing:
two numbered sign-off lines for the data-entry agent (system data entry;
photo/fingerprint entry), each with a name and signature blank; then a
routing paragraph addressed to the Head of the Sub-Directorate for
National Identification, naming a file number and turnaround period; a
document-routing checklist of eleven possible supporting-document types
(each with its own checkbox, ticked by the submitting office to indicate
which accompany this specific file); and the sign-off of the Head of the
Technical and Scientific Police Squad. No applicant-supplied data
appears anywhere on this page — the same "officer-performed-duty, not
applicant data" pattern as the companion Passport schema's page 2.

## Scope: sections and fields excluded

- **The office reference block** (`الجهة`/`العدد`/unlabeled stamp box,
  printed between the form's title and the applicant's own first field)
  is excluded — an intake-office file/reference number, not
  applicant-supplied.
- **The fingerprint-classification grid, right-thumbprint box, file
  number/date, and receiving-center chief's signature** (bottom of page
  1) are excluded — explicitly under the "بيانات خاصة بالإدارة"
  ("administration-only data") heading.
- **The tear-off citizen deposit receipt** (bottom of page 1, below the
  scissors-icon cut line) is excluded — issued by the receiving office
  back to the applicant as proof of filing, not filled in by the
  applicant.
- **Page 2 is excluded in its entirety** — the receiving office's own
  internal data-entry sign-off and document-routing memo, the same
  reasoning as the companion Passport schema's page 2 exclusion.

## Scope: `documents[]` inferred from an internal checklist, not an applicant-facing list

Unlike the companion Passport schema (which omits `documents[]` entirely,
since its source names no supporting documents anywhere), **this
specimen's page 2 does print a named list of eleven supporting-document
types** — but as an internal office checklist (ticked by the submitting
office to record what already accompanies a given file), not as
applicant-facing instructions. This registry's source-fidelity standard
treats a named list as sufficient grounds to model `documents[]` even
when the list's audience is internal, since the document *names*
themselves are drawn directly from the source rather than invented — but
the *requiredWhen conditions* gating each one are this registry's own
inference, not something the source states explicitly for any item.
Each `documents[]` entry's `handling` field discloses this. Two items
(`residenceCertificate`, `employmentCertificate`) and one more
(`bloodTypeCertificate`, `schoolAttendanceCertificate`,
`parentalAuthorization`) were left **unconditional-optional** rather than
guessing a `requiredWhen` the source does not state — in particular,
`bloodTypeCertificate` was deliberately not gated on `bloodType` being
non-empty, since this registry has previously hit a real bug gating
`requiredWhen` on `notEquals ""` against an optional string field (see
the `notequals-empty-string-absent-field-bug` reference); the same
reasoning applies to `employmentCertificate` against the free-text
`profession` field. The remaining five (`birthCertificateExtract`,
`certificateOfNationality`, `marriageCertificate`, `deathCertificate`,
`lossDeclaration`, `organDonationConsentDeclaration`) each have a
one-field correlate defensible enough to gate on (`requestType` or
`maritalStatus` equality, or `isOrganDonor` equals `true`).

## Scope: judgment calls on requiredness

This source has the same lack of a consistent required-field marking
convention as the companion Passport schema — the `(*)` marks found here
denote the shared "mark X in the correct box" checkbox-instruction
footnote, not a required-field indicator (confirmed: it appears beside
every checkbox group — `requestType`, `sex`, `maritalStatus`,
`isOrganDonor` — not just some). Requiredness was therefore assigned by
engineering judgment, following the same standard this registry applied
to the companion schema:

1. **`requestType` modelled required** — the applicant must indicate why
   they are filing.
2. **`familyName`/`firstName`/`fatherFirstName`/`grandfatherFirstName`/
   `sex`/`dateOfBirth`/`placeOfBirth`/`maritalStatus`/`motherFirstName`/
   `motherFamilyName`/`homeAddress`/`governorate`/`applicantSignature`
   modelled required** as core identity fields, matching the companion
   Passport schema's treatment of the identical name/parentage/birth
   fields it shares.
3. **`profession` modelled required**, matching the companion Passport
   schema's own treatment of the identical field (rather than optional,
   since a "no profession" applicant can presumably still print e.g.
   "sans profession").
4. **`bloodType` modelled optional** — a field with no counterpart on the
   companion Passport schema, and not everyone knows their blood type at
   filing time; consistent with this registry's standard treatment of
   comparable non-universal disclosures (e.g. that schema's
   `otherNationalities`).
5. **`paymentReceiptNumber`/`fiscalStampFeeAmount` modelled optional** —
   identical judgment call and identical field pair to the companion
   Passport schema.
6. **`previousNationalIdCardNumber` gated on `requestType` in
   `[LOSS, REPLACEMENT]`** — only meaningful when this application
   replaces an existing card.
7. **`spouseFirstName`/`spouseFamilyName` gated on `maritalStatus`
   equalling `MARRIED`** — same adjacency-based reasoning as the
   companion Passport schema's spouse block, though this specimen omits
   `spouseNationality` (no such blank is printed here).
8. **`isOrganDonor` modelled as an optional boolean, not a required
   enum** — the specimen prints a single opt-in checkbox (not a
   yes/no pair), so leaving it unmarked is itself a valid, meaningful
   answer (declining to register as a donor), not a missing response.

## Conformance

2 mock scenarios plus 1 negative case were run programmatically (a small
one-off Node script evaluating this schema's own `fields[]`/`documents[]`
`requiredWhen` conditions — not committed as fixture files, following
this registry's own precedent for single flat-PDF national-ID/passport
schemas): (1) a single, first-time applicant who opts in to organ
donation — correctly requires `birthCertificateExtract`,
`certificateOfNationality`, and `organDonationConsentDeclaration`, and
nothing else conditional; (2) a married applicant replacing a card lost
previously — correctly requires `spouseFirstName`/`spouseFamilyName`
(via `maritalStatus` = `MARRIED`), `previousNationalIdCardNumber` (via
`requestType` = `LOSS`), `marriageCertificate` (via `maritalStatus`), and
`lossDeclaration` (via `requestType`); (3) a negative case — the same
married applicant with `spouseFirstName`/`spouseFamilyName` omitted —
correctly flags both as missing-but-required. All three `requiredWhen`
conditions in this schema (`maritalStatus`, `requestType`,
`isOrganDonor`) were exercised true and false at least once across the
three scenarios.

Validated clean with `node tools/validate.mjs` and `node
tools/validate-ajv.mjs` (ajv 2020-12 against
`spec/v0.3/govschema.schema.json`). `registry-index.json` regenerated via
`npm run build-index` in `tools/govschema-client/`.

Models 22 `fields[]` across 5 steps, 11 `documents[]` entries.
