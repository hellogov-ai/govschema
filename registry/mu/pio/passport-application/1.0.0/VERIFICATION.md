# Verification record — mu/pio/passport-application@1.0.0

## Candidate selection

GOV-4603 ("GovSchema Standard Research"). Trinidad and Tobago's own
scouting cycle (GOV-4568) had screened Mauritius in parallel with
Guatemala as one of two runner-up new-jurisdiction candidates, but did not
score either in depth once Trinidad and Tobago came back strongest. This
cycle re-scouted both alternates fresh, across all 6 target verticals
each. Guatemala came back weak: 1 of 6 STRONG (Business Formation, via the
Registro Mercantil's live unauthenticated web form), 1 of 6 WEAK (Visa —
real forms exist per an archived snapshot, but both live hosting domains
now sit behind a Cloudflare Managed Challenge that stalled indefinitely
even under a real Playwright/Chromium session), and 4 of 6 dead-end (DMV,
Passport, Taxes, National ID — all funneled into SAT's login-gated
Declaraguate e-filing system or RENAP's in-person-only DPI process).
Mauritius came back strong: 4 of 6 STRONG (Passport, DMV vehicle
registration, Business Formation, Visa — all independently byte-verified
on official `.govmu.org` domains) and 2 of 6 dead-end (Taxes — MRA's
current individual-return filing is mandatory via a login-gated e-filing
portal, with only a "how to fill in your return" notes PDF surviving
unauthenticated; National ID — the National Identity Card Unit's own site
has no standard NIC application form, only a narrow home-visit-registration
form for bedridden citizens). This schema authors the first of Mauritius's
four STRONG verticals, opening Mauritius as a new jurisdiction in the
registry.

## Reaching the live source

`https://passport.govmu.org/passport/?mdocs-file=718`

- Plain unauthenticated `curl` request (with a realistic desktop
  `User-Agent` header; no session/cookie state, no CAPTCHA/WAF challenge).
- HTTP 200 (via redirect resolution), **321,178 bytes** retrieved.
- PDF header `%PDF-1.5\r%...` at byte 0.
- sha256 of the retrieved bytes:
  `c3f793505b02e69c0c8a5fc182c3f019c0d4eb7cdc69d6e33aca06eb76ab7bca`.
- 4 pages, confirmed via `pdfjs-dist`'s `numPages`.
- `getAnnotations()` returned 0 annotations on every page — a flat,
  print-and-fill specimen, not an interactive AcroForm.

### Authority attribution

The Passport and Immigration Office's own site (`passport.govmu.org`)
states it is "the sole authority in Mauritius which is empowered to
provide Passport & Immigration Services," and describes itself as "a
branch of the Mauritius Police Force" operating "under the aegis of the
Prime Minister's Office as well as the Commissioner of Police." `authority`
is attributed to the Passport and Immigration Office (abbreviation PIO)
directly, since it both issues and hosts this specimen on its own domain
— no consular-mirror attribution question arises here, unlike some other
registry sources (e.g. `tt/imd/passport-application-first-adult`).

## Extraction method

`pdfjs-dist` (vendored at `/tmp/node_modules/pdfjs-dist`) `getTextContent()`
read every text item's raw string and `transform` y-position on all 4
pages, grouped into printed rows by rounded y-coordinate to reconstruct
row order. The document is plain English with a clean, non-rasterized
text layer — extraction was complete and unambiguous on pages 1, 2, and 4.
Page 3 raised one console warning ("Required 'glyf' table is not found —
trying to recover") from a single embedded font, evidently a decorative
or checkbox-adjacent glyph subset; this did not affect the extracted text
string content itself, which read as complete, well-formed rows identical
in structure to the other three pages — the same "text layer extracts
cleanly despite a font/rendering warning" pattern this registry has
documented before (see the `gov-form-pdf-extraction` reference), just at
the text-content-warning layer rather than the canvas-rendering layer this
time. No canvas/PNG rendering pass was attempted this cycle (not needed —
every checkbox on this specimen is a literal bracket-style `[ ]` pair
printed as ordinary text characters, inherently symmetric between options,
so no asymmetric-checkbox-grid risk existed to visually confirm).

## Document structure

**Page 1** — header and 6 numbered notes (minor passport validity periods
and guardian-consent requirement; photo specification; lost-passport
police-report procedure; identity/address police-certification
requirement; 4-working-day issuance target; failure-to-provide-information
warning), a name-in-which-the-passport-is-to-be-issued cover strip
(Surname/Forenames/N.I.C Number — a duplicate of Section 1(a)/(b)/(d)
below, not modelled separately, per this registry's standing
anti-duplication convention), "DOCUMENTS TO BE PRODUCED IN ALL CASES"
(Birth Certificate, two photographs) plus 8 numbered "Additional
documents" categories keyed to the applicant's situation (adult; married
person using spouse's name; divorced person; minor; name changed abroad
otherwise than by marriage; person born outside Mauritius with a
Mauritian parent; citizen by registration/naturalisation; lost passport),
and an "OFFICIAL USE" box (Recommendation of I/C Counter, C/I/P, PPT
No., Application No. — excluded, officer-only).

**Page 2** — Section (1) "Particulars of person in whose name passport to
be issued" (a-o: surname, forenames, maiden name, NIC number, title, sex,
date of birth, age last birthday, place and country of birth, marital
status with conditional spouse name, name-change question with conditional
previous name, local/abroad contact details, home/office telephone,
email), Section (2) "Personal Description" (occupation, height in
metres+centimetres, visible distinction mark, colour of eyes), Section
(3) "Eligibility for a Passport" (citizenship Yes/No with a 5-way basis
sub-question; first-application Yes/No with conditional previous-passport
number/date-of-issue and a 5-way replacement-reason sub-question;
another-nationality Yes/No).

**Page 3** — Section (4A) "Consent of parents or guardian for application
by minors (under 18 years)" (name of minor — duplicate of the main
applicant's own name, excluded; separate Father/Guardian and
Mother/Guardian columns each with Name, Signature/Right Thumbprint, and
NIC or Passport No.), Section (4B) "Certification of Consent" (a Police
Officer's own in-person attestation that the parents/guardian signed in
the officer's presence, plus office stamp — excluded in its entirety, see
below), Section (5) "Police Certificate" (a Police Officer's own in-person
verification of the applicant's identity and address, plus office stamp —
excluded in its entirety, see below), Section (6) "Option for Married
Women" (a wish/do-not-wish maiden-or-married-name-observation choice,
plus signature).

**Page 4** — Section (7) "Signature or thumbprint of applicant/minor"
(the specimen signature/thumbprint to be shown on the passport itself,
with a printed instruction to use a 0.6mm felt pen in black ink only and
stay within the box's inner border), Section (8) "Declaration of
applicant/minor's parents or guardian" (two alternative sworn clauses —
(A) for the applicant's own citizenship, (B) for a guardian's ward — plus
signature/thumbprint and date), then an entirely office-internal tail
(Processed by / Payment slip ordered by / D-Captured by / Scanned by /
Printed by name-and-initial grid; a documents-produced checklist;
"APPROVAL"; "FOR OFFICIAL USE"; "NO OBJECTION CERTIFICATE" — excluded in
its entirety).

## Scope: fields and sections excluded

- The page-1 cover strip's duplicate Surname/Forenames/NIC Number (already
  captured in Section 1) and the page-1/page-4 "OFFICIAL USE" boxes in
  their entirety.
- Section (4A)'s own "Name of minor" line — expected to duplicate the main
  applicant's own `surname`/`forenames` already captured in Section 1,
  consistent with this registry's standing anti-duplication convention
  (e.g. `tt/imd/passport-application-first-adult`'s recommender/guardian
  sections do not re-capture the applicant's name either).
- **Section (4B) "Certification of Consent" and Section (5) "Police
  Certificate" excluded in their entirety.** Both are a Police Officer's
  own in-person attestation — the officer certifies having witnessed the
  guardian's signature, or having personally verified the applicant's
  identity and address — filled and signed by the officer, not supplied
  by the applicant. This is a different case from a form's own
  applicant-arranged third-party "recommender" or "referee" section
  (which this registry does model, e.g.
  `tt/imd/passport-application-first-adult`'s Section 4 "Declaration of
  Recommender"), since here the second party is a government official
  performing an in-person, discretionary verification duty, not a private
  citizen vouching for the applicant on the applicant's own initiative —
  the same "officer-only, not applicant-supplied data" reasoning this
  registry applies to office-internal boxes generally.

## Scope: fields excluded from `documents[]`

Additional-documents categories 4 (minor: parents' own birth certificates
and NIC, certificate of citizenship where applicable, copy of judge's
order where applicable) and 6 (person born outside Mauritius with a parent
born in Mauritius: Mauritian parents' birth certificates and NIC,
certificate of foreign citizenship/residence permit of parents) are
disclosed here as an open scoping narrowing, not modelled as separate
`documents[]` entries — this schema does not model an `isMinor` or
`bornOutsideMauritius` discriminator field, so there is no field to gate
these document requirements on. Category 7 (citizen by
registration/naturalisation: certificate of registration/naturalisation)
is similarly not modelled as a separate document entry, since this schema
does not capture a certificate-number/issue-date pair for the
`citizenshipBasis` enum the way `tt/imd/passport-application-first-adult`
does for its own citizenship-basis discriminator — left as an open
scoping gap for a future minor-version cycle on this same document.

## Scope: judgment calls on requiredness

This source has no consistent asterisk/mandatory-marking convention (its
own asterisks are used inconsistently — sometimes marking a Yes/No
question, e.g. "(a) *Are you...", sometimes marking a delete-as-
appropriate instruction, e.g. "* Delete as appropriate" — not a dedicated
required-field marker), so requiredness was assigned by engineering
judgment, following this registry's standard approach (core
identity/eligibility/declaration fields required; secondary contact/
supplementary-detail fields optional):

1. **`ageLastBirthday`, `heightMeters`/`heightCentimeters`, `colourOfEyes`
   modelled required**, as core biodata fields printed adjacent to
   unambiguously-mandatory fields (date of birth, occupation) rather than
   secondary detail, consistent with this registry's treatment of
   comparable biodata fields on `tt/imd/passport-application-first-adult`.
2. **`contactDetailsLocal`/`contactDetailsAbroad`/`homeTelNo`/
   `officeTelNo`/`emailAddress` modelled optional**, as supplementary
   contact channels distinct from the form's own core identity data.
3. **Section (4A) (guardian consent for under-18 applicants) modelled
   entirely optional (`required: false`) and left ungated** (no
   `visibleWhen`/`requiredWhen`). This schema does not compute age from
   `dateOfBirth` — GSP-0013's Condition grammar has no age/date-arithmetic
   operator, only direct field-value comparisons — so, consistent with
   this registry's standing practice (see
   `tt/imd/passport-application-first-adult`'s own identical treatment of
   its Section 3 guardian-permission section), this section's
   applicability is described in each field's own `description` rather
   than programmatically enforced.
4. **`maidenOrMarriedNameObservation`/`marriedWomanOptionSignature` gated
   on `sex` equalling `FEMALE`, not on `maritalStatus`.** The section's own
   "Option for Married Women" heading names married women specifically,
   but this schema follows the precedent set by
   `tt/imd/passport-application-first-adult`'s own "Married Women" section
   (gated on `sex` alone, not narrowed to a specific marital-status value)
   rather than introducing a narrower, unprecedented reading.
5. **`heightCentimeters` bounded 0-99** on the assumption the printed
   blank captures only the sub-metre remainder (e.g. "1" m, "68" cm), the
   conventional reading of a two-blank metric height line; not
   independently confirmable from the text layer alone since both blanks
   are unlabelled rule lines.

## Conformance

2 mock scenarios were reasoned through by hand against this schema's own
`fields[]`/`documents[]` conditions (not committed as fixture files,
following this registry's own precedent for single flat-PDF passport
schemas, e.g. `tt/imd/passport-application-first-adult`): (1) a male,
single, first-application, citizen-by-birth applicant with no other
nationality — resolves with only the unconditional fields/documents
required (no spouse name, no previous-name, no previous-passport detail,
no marriage/divorce/name-change/police-report/foreign-citizenship
documents, no married-women-option fields since `sex` is `MALE`); (2) a
female, married, replacement (previous passport lost), holding another
nationality — correctly requires `nameOfSpouse`, `previousPassportNumber`,
`previousPassportDateOfIssue`, `reasonForReplacement`, the
`maidenOrMarriedNameObservation`/`marriedWomanOptionSignature` pair (via
`sex` = `FEMALE`), `marriageCertificate`, `policeReportForLostPassport`,
and `foreignCitizenshipCertificate`, and nothing else conditional. Every
`requiredWhen`/`visibleWhen` condition in this schema (`maritalStatus`,
`nameChangedOtherThanMarriage`, `isCitizenOfMauritius`,
`isFirstApplication`, `reasonForReplacement`, `holdsAnotherNationality`,
`sex`) was exercised at least once true and once false across the two
scenarios.

Validated clean with `node tools/validate.mjs` and `node
tools/validate-ajv.mjs` (ajv 2020-12 against `spec/v0.3/govschema.schema.json`).
`registry-index.json` regenerated via `npm run build-index` in
`tools/govschema-client/`.

Models 42 `fields[]` across 7 steps, plus 9 `documents[]` entries (3
unconditional identity documents, 5 conditionally-gated documents, 1
unconditional attestation).
