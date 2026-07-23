# Verification record — tt/imd/passport-application-first-adult@1.0.0

## Candidate selection

GOV-4568 ("GovSchema Standard Research"). This cycle re-checked Bolivia's
five remaining verticals fresh (Business Formation, Visa, Passport, DMV,
National ID) and found every one confirmed dead-end/weak: Fundempresa's own
domain (`fundempresa.org.bo`) has lapsed to a third-party domain-parking
page (confirmed via a live Wayback snapshot); SEPREC hosts only a narrative
"Guía de Trámites" PDF, with real e-filing behind a login-gated Angular SPA;
`migracion.gob.bo` is a pure Angular SPA (confirmed via direct fetch: 6,317
bytes, only JS bundle references, zero server-rendered content) with no
static form anywhere, including no surviving embassy-mirror PDF; SEGIP's own
licence and cédula pages explicitly state the process is in-person/
biometric-only. With Bolivia exhausted, a parallel scouting pass covered
three brand-new-jurisdiction candidates (Guatemala, Trinidad and Tobago,
Mauritius) across all six verticals. Trinidad and Tobago came back
strongest: four independently byte-verified STRONG candidates on official
`.gov.tt` domains (Passport, DMV, Business Formation, Taxes) — an unusually
high hit rate for a first-cycle scout, comparable to Botswana's own 4/6-
STRONG debut. This schema authors the first of the four, opening Trinidad
and Tobago as the registry's 91st jurisdiction.

## Reaching the live source

`https://foreign.gov.tt/documents/126/Document_3_-_Application_form_for_1st_issue_of_MRP_applicants_16_years_and_over.pdf`

- Plain unauthenticated `curl` request (with a realistic desktop
  `User-Agent` header; no session/cookie state, no CAPTCHA/WAF challenge).
- HTTP 200, `Content-Type: application/pdf`, **101,355 bytes**.
- PDF header `%PDF-1.6\r%...` at byte 0 (linearized).
- sha256 of the retrieved bytes:
  `875788ce63b0124f715ebd32b31fa77f4fc54134ab058eee12f3eb84710ee0f1`.
- 4 pages, confirmed via `pdfjs-dist`'s `numPages`.
- `getFieldObjects()`/`getAnnotations()` returned no AcroForm fields on any
  page — a flat, print-and-fill specimen, not an interactive form.

### Authority attribution

The document is distributed by the Ministry of Foreign and CARICOM Affairs
(MFCA, `foreign.gov.tt`) for use by applicants applying through Trinidad and
Tobago's overseas Embassies, High Commissions, and Consulates. MFCA's own
"Passports and Citizenship" service page
(`https://foreign.gov.tt/services/passport-and-citizenship-applications-notarial-services/`)
states in its own text: "Applications for passports and citizenship can be
made to Trinidad and Tobago Embassies, High Commissions and Consulates
(Overseas Missions). These are then forwarded to the Immigration Division in
the Ministry of National Security, Trinidad and Tobago, for processing." The
same page links the Immigration Division's own site
(`https://nationalsecurity.gov.tt/divisions/immigrationdivision/`, confirmed
HTTP 200, title "Immigration Division – Ministry of National Security") as
an external resource. This schema therefore attributes `authority` to the
Immigration Division (the processing/issuing authority) rather than MFCA
(the hosting/distributing mission network), consistent with this registry's
standing practice of attributing consular-mirrored forms to the issuing
ministry, not the mirror site (e.g. `ci/dst/visa-application` attributed to
DST despite being fetched from an airport operator's mirror). The exact
mission sub-page that links this specific `documents/126` PDF was not
resolved (the Miami/New York consulate document-index pages checked this
session link sibling forms — e.g. an Emergency Travel Document application —
but not this exact URL); this does not affect the source URL's own direct
verification above.

## Extraction method

`pdfjs-dist` (vendored at `/tmp/node_modules/pdfjs-dist`) `getTextContent()`
read every text item's raw string and `transform` x/y position on all 4
pages, grouped into printed rows by rounded y-coordinate and sorted by
x-coordinate to reconstruct column/row order. The document is plain English
with clean, non-rasterized embedded fonts — the text layer extracted
completely and unambiguously, including every literal `[ ]` bracket-style
checkbox pair (printed as literal text characters, not drawn form widgets),
which are inherently symmetric between options since both sides of every
pair use the identical `[ ]` glyph sequence — unlike some other registry
sources where checkbox asymmetry has been a disclosed finding, no such
asymmetry is structurally possible on this specimen.

**Disclosed limitation**: rendering the pages to PNG via `pdfjs-dist` +
`node-canvas` (this registry's standing visual-confirmation technique)
failed for this specimen's text layer specifically — every text glyph
raised a `getPathGenerator - ignoring character: "Error: Requesting object
that isn't resolved yet ..."` warning and rendered blank, a font-subsetting/
glyph-path-resolution incompatibility between this PDF's embedded font and
`node-canvas`'s path rendering, distinct from the (successful) `pdfjs-dist`
text-layer extraction. Vector-drawn content (table borders, page-border
rules, the two gray placeholder boxes) rendered correctly, which was enough
to independently confirm the row counts of this form's three tables (see
below) by visually counting horizontal rule lines, but not to visually
confirm free-text label wording or literal checkbox rendering — those rely
on the text-layer extraction alone. This is a different failure mode from
this registry's previously-documented visual-inspection uses (e.g.
`na/mhaiss/visa-application`, where rendering succeeded and was used to
disambiguate row counts); flagged here for any future re-verification
attempt on this same source using different rendering tooling.

## Document structure

**Page 1** — header (Trinidad and Tobago Coat of Arms), a "FOR OFFICIAL USE
ONLY" box (Passport/Origin/Receipt#/Passport#/Type/Expedited/Pick
Up/Date/Date of Issue/Pre-Paid/Reason for Shipping/Application/Valid To —
excluded, officer-only), Section 1 (name particulars: surname, first name,
middle name(s), maiden name, former name, mother's maiden name surname,
father's full name), Section 2 (personal information: date of birth, sex,
place of birth, height, eye/hair colour, marital status, occupation, a
"PHOTOGRAPH" placeholder box, three address blocks — home / mailing-if-
different / work-or-local-if-abroad — firm/organization, phone numbers,
email, and a "Specimen Signature of Applicant" box carrying its own printed
void-if-touches-border warning).

**Page 2** — "MARRIED WOMEN" (present marriage details, husband's name and
nationality, and a "PREVIOUS MARRIAGE(S)" table — visually confirmed **3**
data rows via the rendered vector table lines), Section 3 ("PERMISSION FROM
PARENT/LEGAL GUARDIAN FOR APPLICANTS UNDER 18 YEARS OF AGE" — guardian's own
name/relationship, consent, ID particulars, and signature), Section 4
("DECLARATION OF RECOMMENDER", explicitly marked "To be completed by the
Recommender Only" — recommender's own name, years known, occupation,
firm/address, phone numbers, declaration date, ID particulars, signature).

**Page 3** — Section 5 ("CITIZEN OF TRINIDAD AND TOBAGO BY", four lettered
categories A-D with D itself split into two checkboxes — Registration /
Naturalisation — sharing one certificate-number/issue-date pair; a Yes/No
"ever been a citizen of any country other than Trinidad and Tobago"
question with a details table visually confirmed **3** rows), Section 6
("TRINIDAD AND TOBAGO PASSPORT(S) PREVIOUSLY", a Yes/No question with a
particulars table visually confirmed **3** rows, plus a "submit most
recently issued document" instruction), Section 7 ("ADDITIONAL REFERENCES",
exactly two named references who are not relatives and have known the
applicant at least three years — mandatory, not conditional, per the
source's own printed instruction), Section 8 ("DECLARATION OF APPLICANT", a
six-clause (i)-(vi) sworn declaration plus date/ID particulars/signature).

**Page 4** — "FOR OFFICIAL USE ONLY" in its entirety (prequalification
officer, birth/citizenship-by-descent/adoption/marriage/registration-
naturalisation certificate cross-reference blocks, sworn-declaration
reference numbers, deed poll/decree absolute references, reception officer)
— excluded, officer-only.

## Scope: the citizenshipBasis discriminator

Modelled as a single required 5-value enum (`BIRTH`/`DESCENT`/`ADOPTION`/
`REGISTRATION`/`NATURALISATION`) gating each category's own certificate-
detail fields via `requiredWhen` (GSP-0013 §2), following this registry's
established discriminator-field convention. Category (D)'s two checkboxes
(Registration / Naturalisation) share one printed certificate-number/issue-
date pair, so both enum values gate the identical
`registrationOrNaturalisationCertificateNumber`/
`registrationOrNaturalisationIssueDate` pair via the `in` operator, rather
than being split into two independent field pairs the source does not
itself print separately.

## Scope: the sex-gated Married Women section

The "MARRIED WOMEN" heading and its "PRESENT MARRIAGE"/"PREVIOUS
MARRIAGE(S)" fields are modelled with `visibleWhen: { field: sex, equals:
FEMALE }` — gating on the `sex` field the form already collects, not a
fabricated new field. Not further gated on `maritalStatus` equalling
`MARRIED`, since the "PREVIOUS MARRIAGE(S)" table is plausibly applicable to
a currently divorced or widowed female applicant as well as a currently
married one; every field within the section is left `required: false`
regardless (a female applicant who has never married leaves the whole
section blank).

## Scope: fields excluded

- The page-1 "FOR OFFICIAL USE ONLY" box in its entirety.
- The page-4 "FOR OFFICIAL USE ONLY" box in its entirety (see Document
  structure above for its full contents).
- Section 4's own printed parenthetical "(applicable to renewals only)"
  next to "whose photograph I have certified on the reversed side" — this
  document is explicitly the *1st issue* (first-time) variant per its own
  filename and title, so this renewal-specific clause does not apply and no
  corresponding field/document was modelled for it.
- The recommender's and guardian's own re-entry of the applicant's name
  (Section 3's "hereby give permission to FIRST NAME/SURNAME... to apply for
  a Trinidad and Tobago Passport"; Section 4's "NAME OF APPLICANT FIRST
  NAME/SURNAME") is not modelled as separate fields, since its value is
  expected to duplicate the main applicant's own `surname`/`firstName`
  fields already captured in Section 1 — consistent with this registry's
  standing anti-duplication convention (e.g. `au/apo/passport-application-
  first-adult`'s referee section does not re-capture the applicant's name
  either).

## Scope: judgment calls on requiredness

This source has no asterisk/mandatory marking convention of its own (its
only asterisks are used as a callout — "* (To be completed by the
Recommender Only) *" — not a required-field marker), so requiredness was
assigned by engineering judgment, following this registry's standard
approach (core identity/eligibility/declaration fields required; secondary
contact/lineage-history fields optional):

1. **`mothersMaidenNameSurname`/`fathersFullNameSurname`/
   `fathersFullNameFirstName` modelled required.** Both lineage fields are
   commonly mandatory on Caribbean/Commonwealth first-issue passport forms
   as an identity/fraud-prevention check, and this form's own Section 5
   directly supports citizenship-by-descent claims that would need this
   lineage data — treated as core identity data, not secondary detail.
2. **`height`/`colourOfEyes`/`hairColour` modelled required**, as core
   physical bio-data fields printed adjacent to date of birth and sex
   (themselves unambiguously mandatory), rather than secondary detail.
3. **Section 4 (Declaration of Recommender) and Section 7 (Additional
   References) modelled entirely required**, since both sections' own
   printed instructions state their purpose in mandatory terms ("To be
   completed by the Recommender Only"; "Please provide the following
   information with respect to two persons...") with no "if applicable"
   qualifier, unlike Section 3 (guardian permission), whose own heading
   explicitly scopes it to under-18 applicants.
4. **Section 3 (guardian permission for under-18 applicants) modelled
   entirely optional (`required: false`) and left ungated** (no
   `visibleWhen`/`requiredWhen`). This schema does not compute age from
   `dateOfBirth` — GSP-0013's Condition grammar has no age/date-arithmetic
   operator, only direct field-value comparisons — so, consistent with this
   registry's standing practice of not fabricating a conditional link the
   source does not itself express via a checkbox or discriminator field,
   this section's applicability is described in each field's own
   `description` rather than programmatically enforced.
5. **The three address-block sub-fields (Street / Town-City / Zip Code /
   Country) reconstruct an ambiguous printed layout.** The text layer's own
   row-label grouping repeats a "Town /City" caption across what appear to
   be two different blank lines for each of the Home/Mailing/Work address
   blocks (a label-row/blank-row baseline-offset artifact this registry has
   seen before, e.g. `na/mhaiss/visa-application`'s Item 8/office-box
   merge), and this specimen's text-only rendering limitation (see above)
   prevented a visual cross-check of exactly which blank line each caption
   sits under. Modelled as 4 sub-fields per address block (Street, Town/
   City, Zip Code, Country) as the most defensible reading of the printed
   captions; flagged here as a disclosed ambiguity for any future
   re-verification with different PDF-rendering tooling.

## Conformance

3 mock scenarios were run through an ephemeral, from-scratch condition
evaluator (deriving `visibleWhen`/`requiredWhen`/`required` resolution
directly from this schema's own `fields[]`/`documents[]`, discarded after
use, not committed): (1) a male, single, birth-citizenship, no-other-
citizenship, never-issued-a-passport applicant — resolved with zero missing
required fields/documents; (2) a mutation-control scenario (female, married,
citizen of another country, previously issued a passport, with
`birthPinNumber` deliberately omitted) — correctly flagged exactly
`birthPinNumber` plus the genuinely-required
`mostRecentPassportOrTravelDocument` document (not supplied in this
scenario) as missing, and nothing else; (3) the same scenario with every
conditional field/document supplied — resolved with zero missing. The
`citizenshipBasis`/`citizenOfAnotherCountry`/
`everIssuedPassportOrTravelDocument`/`sex`-gated conditions were each
independently exercised true/false against the expected inputs.

Validated clean with `node tools/validate.mjs` and `node
tools/validate-ajv.mjs` (ajv 2020-12 against `spec/v0.3/govschema.schema.json`).
`registry-index.json` regenerated via `npm run build-index` in
`tools/govschema-client/`.

Models 122 `fields[]` across 10 steps, plus 4 `documents[]` entries (1
unconditional identity document, 1 conditionally-gated identity document, 2
unconditional attestations).
