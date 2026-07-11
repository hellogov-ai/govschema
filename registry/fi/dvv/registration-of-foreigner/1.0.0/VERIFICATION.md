# Verification record — fi/dvv/registration-of-foreigner@1.0.0

## Candidate selection

This session's brief (GOV-2299, "GovSchema Standard Research") targeted
Finland's National ID & Civic Documents vertical — globally one of
GovSchema's weakest-covered verticals (74% at cycle start) — and named DVV's
(Digi- ja väestötietovirasto, the Digital and Population Data Services
Agency) form DVV05.03.00A, "The registration information of a foreigner"
("Ulkomaalaisen rekisteröinti"), as the pre-scouted candidate. Finland stood
at 2/6 verticals (Visa via `fi/migri/residence-permit-employed-person`,
GOV-2276; Business Formation via `fi/prh/start-up-notification-y1`,
GOV-2292).

Finland's domestic eID/identity-card route (poliisi.fi) was re-confirmed
this cycle as online-e-service-or-in-person-only with no downloadable form —
not a viable candidate. DVV05.03.00A is the correct, and currently only
viable, National ID candidate for Finland.

## Source

- **English:** `https://dvv.fi/documents/16079645/39123197/The+registration+information+of+a+foreigner.pdf/d179dd2f-e279-8f32-1f8b-ee1fed610d90/The+registration+information+of+a+foreigner.pdf?t=1753428818556`
- **Finnish (cross-check only, not the schema's primary source):**
  `https://dvv.fi/documents/16079645/42069833/Ulkomaalaisen+rekister%C3%B6inti.pdf/6ca445fd-4f6d-33e9-74be-235e83e50d2c/Ulkomaalaisen+rekister%C3%B6inti.pdf?t=1624338712613`
- Both fetched fresh this session with a plain HTTP GET: **HTTP 200**,
  `151,115` bytes (English) / `142,376` bytes (Finnish) — both exactly
  matching a prior scouting pass's byte counts. Both confirmed genuine
  `%PDF-1.7` files (header bytes verified directly) with no
  login/CAPTCHA/WAF gate.
- **Editions:** the English specimen prints `06/2025` in its footer; the
  Finnish specimen prints `04/2025` — same form number, different edition
  dates, structurally identical (see Extraction below). The English edition
  is this schema's primary source, consistent with this registry's Migri
  (`fi/migri`) precedent of preferring an authority's own English-language
  edition when one exists.
- Landing pages (fetched fresh this session, used for `documents[]`
  provenance): `https://dvv.fi/en/foreigner-registration` and
  `https://dvv.fi/ulkomaalaisen-rekisterointi`.

## Extraction technique and a disclosed discrepancy vs. the pre-scouted count

`pdfjs-dist` v4 (`legacy/build/pdf.mjs`, installed fresh to a scratch
`/tmp/fi-dvv-extract` directory this session) was used per page via
`page.getAnnotations()` (widget rects, field names, `alternativeText`
tooltips, `radioButton`/`checkBox` flags) and `page.getTextContent()`
(printed labels with y-coordinates), on both the English and Finnish
specimens independently.

- **Page 1**: 29 annotations, 28 `/Widget`-subtype annotations.
- **Page 2**: 15 annotations, 13 `/Widget`-subtype annotations.
- **Page 3**: 10 annotations, 2 `/Widget`-subtype annotations (a "Save
  form" and "Print form" button — this page is solely a GDPR privacy
  statement with 0 applicant-facing fields, excluded from this schema).

**Total: 54 annotations, but only 43 are true `/Widget`-subtype
annotations**, across **34 unique field names** (32 applicant-facing +
2 page-3 buttons). The pre-scouted figure of "54 total widget annotations"
counted every annotation on the page (including link annotations, e.g. to
`Datatilsynet`-equivalent privacy-statement pages), not only genuine
`/Widget` subtypes; this cycle's own precise widget-subtype count (43)
supersedes that estimate rather than reconciling to it. The 34-unique-name
figure matches the pre-scout exactly. Both the English and Finnish
specimens produced identical widget counts per page, confirming the two
editions are structurally identical despite their different footer dates.

Unlike several prior Nordic specimens in this registry (the DK CPR and
Skattestyrelsen forms among them), this specimen's fields are
**self-documenting without a coordinate cross-reference being strictly
necessary**: every `Tx` widget carries its own descriptive `alternativeText`
tooltip quoting the form's own numbered question text verbatim (e.g. field
`"Text field 1"` → `alternativeText` `"1. Surname"`), and every one of the
form's 7 exclusive-choice radio groups (sex; prior residence in Finland;
marital status; contact language; duration of stay; official-decision-by-
email preference; the family-members-in-Finland yes/no gate) is confirmed
via `radioButton: true` to be a genuine PDF radio-button parent field, not
independent same-named checkboxes sharing an export value
(the DK CPR "Medlem af folkekirken" quirk does not recur here). Row
y-coordinates were still cross-referenced to confirm each radio option's
`exportValue` maps to its printed label in on-page order (e.g. duration of
stay's 4 options, printed top-to-bottom, map to `exportValue` `0`/`1`/`2`/`3`
in that same order) and to pair the 3 independent family-member checkboxes
(spouse / children under 18 / parents, `checkBox: true`, not mutually
exclusive — a person can have any combination present) with their adjacent
free-text name fields.

## Field structure: 32 applicant-facing fields, no merging or splitting

Every one of the 32 applicant-facing widget-groups was modelled 1:1 into a
`fields[]` entry, with two exceptions the source itself visibly nests as
follow-ups under two of duration-of-stay's four radio options:
`temporaryStayEndDate` ("End date of temporary stay:") and
`lessThanYearEndDate` ("Less than a year, until:"), each gated via
`visibleWhen`/`requiredWhen` against `durationOfStay`. No date-widget
splitting was needed (every date on this form is a single text field, unlike
Migri's OLE_TY1 split day/month/year widgets), and no field was merged
beyond what the source itself already combines (see the next section).

## Disclosed modelling decisions

1. **`postalCodeAndCity` is a single field**, because the source PDF itself
   implements postal code and city as one combined text-field widget (item
   11), not two — unlike this registry's Danish siblings (`dk/cpr`,
   `dk/skattestyrelsen`), which split them. This schema mirrors the source's
   own single-field layout rather than introducing a split the form does not
   have; no separate pattern-validated postal-code field exists on this
   specimen.
2. **`maritalStatus` is left ungated by any `Condition`.** The form's own
   instruction text ("We can register your marital status with this form
   only in these situations. In other cases, marital status is registered
   with a separate form.") scopes the field to exactly two situations: an
   applicant under 18 and unmarried, or an applicant unmarried with refugee
   status or subsidiary protection. No field on the form itself (e.g. a
   computed age, or a distinct refugee-status flag) exists to gate a
   `Condition` against, so — matching this registry's existing precedent for
   OLE_TY1 section 8 (`fi/migri`), where an analogous instruction-only
   scoping constraint had no corresponding gating field — the constraint is
   disclosed in the field's own `description` rather than enforced
   structurally.
3. **`hasFamilyMembersInFinland` and its three dependents model a
   disclosure/context question, not a full family sub-schema.** The source's
   own instruction text states plainly that family relationships absent from
   the Population Information System are **not** registered via this form:
   *"Family relations missing from the Population information System will
   not be registered with this form. Use the forms 'Notification of
   marriage outside Finland' and/or 'Notification of child born outside
   Finland' for notifying family relations."* Consistent with that scope,
   this schema models only a yes/no gate plus three independent
   presence-flag/name pairs (spouse, children under 18, parents of children
   under 18) — matching the source's own three checkboxes plus adjacent
   free-text fields — rather than a repeating per-person sub-schema with
   date-of-birth, citizenship, etc. for each family member (which the source
   form does not itself collect for this question).
4. **`contactLanguage` and `estoniaOrNordicIdentityNumber` are both left
   ungated against free-text fields** (`nativeLanguage` and
   `countryMovedFrom` respectively), since a reliable `Condition` match
   (`equals`/`in`) against an open-ended free-text value is not possible —
   matching this registry's existing `dk/cpr` precedent for the equivalent
   judgment call. Per this registry's known `notEquals`-against-an-optional-
   field bug pattern, **no `Condition` in this schema gates on `notEquals`
   against an optional field**; every `requiredWhen`/`visibleWhen` here is a
   plain `equals` check against a boolean or enum field.
5. **The physical signature line (item 20, "Signature") carries no fillable
   AcroForm widget** on this specimen, consistent with this registry's
   `dk/cpr` and `fi/migri` precedent for signature lines. It is modelled as
   an `applicantDeclaration` attestation `documents[]` entry quoting the
   form's own item 19/20 declaration text verbatim, rather than as a
   `fields[]` entry.
6. **`documents[]` is sourced partly from outside the PDF itself.** The form
   has no in-PDF attachment checklist (unlike Migri's OLE_TY1 section 11.1);
   the identity/legal-residence/work-or-study/family-relationship document
   requirements were instead sourced from DVV's own published
   foreigner-registration guidance (`dvv.fi/en/foreigner-registration`,
   fetched fresh this session), specifically its "Book an appointment for a
   personal visit" section listing what to bring. `proofOfLegalResidence`
   merges two source-listed alternatives (a residence permit card / other
   proof of legal residence, or an EU right-of-residence registration
   certificate) into one requirement with two `acceptedTypes`, since which
   applies depends on the applicant's own citizenship/status and the source
   does not name a single universal document. `proofOfWorkOrStudy` is left
   `required: false` (descriptive only) since this form has no single field
   naming the applicant's chosen grounds for registration (employment,
   study, family member, or existing residence permit) to gate it against.
   `familyRelationshipCertificates` **is** gated, via `requiredWhen` against
   `hasFamilyMembersInFinland`, since that field does exist on the form.

## crossFieldValidation

One rule, `movedToAddressNotBeforeMovedToFinland`
(`dateMovedToAddress` `greaterThanOrEqual` `dateMovedToFinland`), encoding
the genuine logical constraint the source's own field ordering implies: an
applicant cannot move into their specific Finnish address before entering
Finland itself.

## Mock conformance test run

Two scenarios were built under
`conformance/fi/dvv/registration-of-foreigner/1.0.0/` and checked against
this schema's `required`/`requiredWhen`/`visibleWhen`/`validation`/
`crossFieldValidation` grammar, and its `documents[]` requiredness
explicitly (not just `fields[]` — a repeatedly-confirmed blind spot in this
registry's own history), with a disposable checker script
(`/tmp/fi-dvv-extract/check_conformance.mjs`, not committed — same technique
used across this registry's other v1.0.0 cycles):

- **`application-packet-minimal-required-only.json`**: a Swedish citizen
  moving permanently to Helsinki, no prior Finland residence, no family
  members in Finland. **18 fields collected, 14 correctly not-applicable, 5
  `documents[]` entries checked, 0 errors.**
- **`application-packet-full-coverage-estonian-family.json`**: a fictional
  Estonian software developer moving to Tampere for employment, with prior
  exchange-study residence in Finland, a temporary-stay duration election, an
  Estonian identity number, a spouse and child already in Finland, and a
  telephone number. **29 fields collected, 3 correctly not-applicable, 5
  `documents[]` entries checked, 0 errors.**
- **Six mutation/negative controls**, each derived from the minimal scenario
  with exactly one defect introduced, independently confirmed to raise
  exactly its own expected error and no other:
  1. removing required `surname` → `missing-required`.
  2. setting `sex` to `"X"` (violates `validation.enum`) →
     `enum-violation`.
  3. setting `dateMovedToAddress` before `dateMovedToFinland` →
     `cross-field-violation` on `movedToAddressNotBeforeMovedToFinland`.
  4. setting `durationOfStay` to `temporary_address_at_least_one_year`
     without supplying the now-`requiredWhen`-triggered
     `temporaryStayEndDate` → `missing-required`.
  5. dropping the required `identityDocument` from `documents[]` →
     `missing-required-document`.
  6. setting `hasFamilyMembersInFinland` to `true` without supplying the
     now-`requiredWhen`-triggered `familyRelationshipCertificates` document
     → `missing-required-document`.

  All six were correctly and individually flagged, confirming the checker
  script discriminates rather than trivially passing every input, and that
  `documents[]` requiredness specifically (mutations 5 and 6) is genuinely
  exercised, not just asserted.

The schema was also validated against the GovSchema v0.3 meta-schema with
`node tools/validate-ajv.mjs` (passes standalone and as part of the full
registry run, 351/351 documents, 3/3 `mapping.json` companions) and `node
tools/validate.mjs` (same result). One meta-schema violation was caught and
fixed during authoring: two `documents[]` entries initially carried an
undocumented `description` member (documents only support `sourceRef` for
this kind of free text, not `description`); the explanatory text was folded
into each entry's `sourceRef` instead.

## Scope and jurisdiction notes

This document opens Finland's National ID & Civic Documents vertical (3/6
for Finland; Passport/Driver's License/Taxes remain open). It does not
submit the request on the applicant's behalf, and does not replace the
in-person appointment DVV (or the State Department of Åland) requires within
one month of submitting the form; the live source (dvv.fi) is always
authoritative. GovSchema is independent and is not affiliated with,
endorsed by, or operated by the Republic of Finland or DVV.
