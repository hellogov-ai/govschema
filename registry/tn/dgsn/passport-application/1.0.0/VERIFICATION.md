# Verification record — tn/dgsn/passport-application@1.0.0

## Candidate selection

GOV-4638 ("GovSchema Standard Research"). This cycle scouted three
jurisdictions not yet in the registry — Hungary, Belgium, and Tunisia —
across all 6 target verticals each, prioritizing each country's own
official ministry/agency domain and rejecting login-gated wizards or
prose-only guidance in favor of directly fetchable, unauthenticated,
field-by-field specimens.

- **Hungary** came back strongest on Taxes (NAV's 24SZJA individual
  income-tax return, a genuine 30-page blank form plus a matching
  field-by-field instruction guide, both unauthenticated on `nav.gov.hu`),
  but DMV/Business Formation were weak (narrow temporary-permit form only;
  a `ceginformaciosszolgalat.kormany.hu` TLS failure blocking the
  Business Formation candidate) and Passport/National ID were confirmed
  dead ends (fully in-person biometric enrolment, no citizen-filled form).
- **Belgium** came back strong on several verticals (Passport, Visa, DMV,
  and two caveated candidates on Business Formation/Taxes), but National
  ID was weak (a 2-field deregistration certificate, not an actual ID
  application).
- **Tunisia** came back with Passport and National ID (CIN) both STRONG
  and uncaveated (both served from `sicad.gov.tn`, the Tunisian
  government's own multi-ministry e-services portal), plus Taxes,
  Business Formation, and Visa all STRONG or near-STRONG; only DMV came
  back weak (the vehicle-registration agency's own site,
  `attt.com.tn`, was unreachable this cycle).

This schema authors Tunisia's Passport vertical, opening Tunisia as a new
jurisdiction. It was picked over Hungary's Taxes candidate (a much larger
multi-page model better suited to a dedicated cycle) and Belgium's
passport form (a close second, but Tunisia's own showing across the
other 5 verticals — Taxes, Business Formation, Visa, and National ID all
independently confirmed reachable this same cycle — made it the stronger
new-jurisdiction opening). Tunisia's other 5 verticals were not
independently re-verified byte-for-byte this cycle beyond the initial
scouting pass and remain open backlog for a future cycle.

## Reaching the live source

`http://www.sicad.gov.tn/Fr/upload/1428663339.pdf`

- Plain unauthenticated `curl` request (with a realistic desktop
  `User-Agent` header; no session/cookie state, no CAPTCHA/WAF challenge).
- **The domain does not serve HTTPS on port 443** (`curl` to `https://`
  returns `ECONNREFUSED`) — the site is plain HTTP only. This is a
  property of the government's own hosting, not a fetch failure on this
  registry's part; re-verify via `http://`, not `https://`, in any future
  cycle.
- HTTP 200, **48,909 bytes** retrieved.
- PDF header `%PDF-1.5\r%...` at byte 0.
- sha256 of the retrieved bytes:
  `7e667ead43869ad17d8a9ac5b881dd3bf27afce9e8d3cdae5a5e8341d598168d`.
- 2 pages, confirmed via `pdfjs-dist`'s `numPages`.
- `getAnnotations()` returned 0 annotations on both pages — a flat,
  print-and-fill specimen (dotted-line blanks, bracket-style checkboxes),
  not an interactive AcroForm.
- The landing page hosting the download link
  (`http://www.sicad.gov.tn/Fr/Imprime_Demande-de-passeport_66_3_D292`)
  describes the form's own scope: "obtaining a passport for the first
  time or its renewal for Tunisians resident on Tunisian territory or for
  Tunisians resident abroad — changing an ordinary passport for Tunisians
  resident on Tunisian territory or for Tunisians resident abroad —
  obtaining a duplicate passport (for loss, theft, or damage) for
  Tunisians resident on Tunisian territory or for Tunisians resident
  abroad" — consistent with the four request-type checkboxes printed on
  the form itself (`requestType`).

### Authority attribution

The form's own printed header reads "الجمهورية التونسية" (Republic of
Tunisia) / "وزارة الداخلية" (Ministry of the Interior) / "الإدارة العامة
للأمن الوطني" (General Directorate of National Security — the literal
Arabic equivalent of Direction Générale de la Sûreté Nationale, DGSN, the
same agency name and structure already used for
`ma/dgsn/passport-application`'s Moroccan counterpart). `authority` is
attributed to DGSN directly, since the form itself names DGSN as issuer;
`sicad.gov.tn` is modelled as the hosting government e-services portal
(it lists forms across essentially every Tunisian ministry, confirmed via
its own "Sélectionner le ministère" dropdown), not as the issuing
authority itself — the same "portal host vs. issuing authority"
distinction this registry draws for other consular- or portal-hosted
specimens (e.g. `tt/imd/passport-application-first-adult`).

## Extraction method

`pdfjs-dist` (vendored at `/tmp/node_modules/pdfjs-dist`, loaded via
`legacy/build/pdf.js` under `createRequire` since only a CommonJS build is
present, not the `.mjs` build path this registry's tooling has used on
other cycles) `getTextContent()` read every text item's raw string,
`x`/`y` transform position on both pages, grouped by rounded `y` into
printed rows, and cross-checked against `x` ordering within each row to
resolve this specimen's own right-to-left (Arabic) layout — the
rightmost item in a row is the first item in reading order, opposite the
left-to-right ordering this registry's tooling defaults to. A second,
independent scouting pass (a parallel subagent) extracted the same
document with the same tool and arrived at an identical field inventory
and identical page count/annotation count, cross-verifying this
extraction.

The text layer is clean, non-rasterized, and complete on both pages. A
small number of isolated single-character items (e.g. `K`, `m`, `ø`, `«`,
`fl`, `-`, `=`) appear interleaved in the birth-date row (approx. `y=414`
to `y=435`) and near the document's decorative letterhead glyph
(`y=749`) — these do not correspond to any real label text; they are
almost certainly a symbol/dingbat font's glyphs (checkbox-frame or
decorative marks) that `pdfjs-dist`'s text-content extraction reports as
literal character codes rather than resolving to their intended glyph
shape, the same "text layer extracts real content cleanly despite
isolated undecoded glyphs" pattern this registry has documented before
(see the `gov-form-pdf-extraction` reference). No canvas/PNG rendering
pass was attempted this cycle — every real checkbox on this specimen is a
numbered list item (`1`/`2`/`3`/`4`) rather than an asymmetric bracket
grid, so no visual-confirmation risk existed that the text layer alone
could not already resolve.

## Document structure

**Page 1** (the entire applicant-facing form) — header (Republic of
Tunisia / Ministry of the Interior / DGSN / "Ordinary Passport"); a
4-option numbered request-type checklist (first-time, extension,
renewal, replacement) beside two small fee/receipt fields (payment
receipt number, fiscal stamp fee amount); National ID Card Number with an
adjoining mandatory specimen-signature box; the applicant's own name and
parentage (first name, father's first name, grandfather's first name,
family/maiden name, mother's full name); date and place of birth (with a
separate governorate-of-birth blank); profession; height; sex
(male/female checkboxes); eye color; other nationalities; a 4-column
address block (number, street, city/village, governorate); a 4-option
numbered marital-status checklist (single, widowed, divorced, married)
with a conditional spouse block (first name, family name, nationality);
a footnote explaining the checkbox-marking convention ("mark X in the
correct box"); the place and date this application was drawn up; a
footnote explaining the legal liability attached to the specimen
signature; and finally an entirely office-only tail (old-passport
reference number/deposit date; new-passport reference
number/letter/issue date/expiry date/place of issue, all explicitly
under an "خاص بالإدارة" — for administration use — heading; a mandatory
citizen deposit-receipt slip; and an intake-office registration
reference).

**Page 2** — titled "بيانات خاصة بالإدارة" ("Data specific to the
Administration") in its own header, and "خاص بمركز قبول المطلب"
("specific to the application-receiving center") beneath it. The entire
page is a police/National Guard station chief's own in-person
certification: confirming the applicant's identity against their
National ID Card (card number, place/date of issue) or, for a minor, a
civil-status record; two separate numbered blank lists (1-4, then 1-2)
for the receiving officer to note which supporting documents were
attached/reviewed (these are blank officer-completed lines, not a
printed named checklist — see below); a free-text summary box; a
national-security-zone referral block; and the station chief's own
sign-off. No applicant-supplied data appears anywhere on this page.

## Scope: sections and fields excluded

- **Page 1's own "خاص بالإدارة" tail is excluded in its entirety**
  (old/new passport reference numbers, issuance dates/place, the
  citizen-receipt slip, and the intake-office registration line) —
  explicitly headed "for administration use," filled by the receiving
  office, not the applicant.
- **Page 2 is excluded in its entirety.** It is the receiving police or
  National Guard station chief's own in-person identity-verification
  certification and internal routing record — the same
  "officer-performed-duty, not applicant-supplied data" reasoning this
  registry applies to comparable sections elsewhere (e.g.
  `mu/pio/passport-application`'s Police Certificate).
- **The "عدد" (roughly "No.")** printed directly above the request-type
  checklist (immediately below the form's own title) was not modelled as
  a field. It reads most plausibly as either a list-numbering column
  header for the four checkboxes beneath it, or an office-assigned
  application serial number — this registry could not confirm which from
  the text layer alone, and declined to fabricate either interpretation
  as a distinct applicant-supplied field.

## Scope: fields excluded from `documents[]`

**`documents` is omitted entirely from this schema.** Unlike several
other registry sources with an explicit named checklist (e.g. "Birth
Certificate," "Two Photographs"), this specimen's own document-related
content — the two numbered blank lists on page 2 — are blank lines for
the receiving officer to write in whatever was actually submitted; the
form does not itself print the names of any required supporting
documents anywhere on either page. Modelling a `documents[]` array here
would mean inventing document types this source does not name, which
this registry's source-fidelity standard does not permit. A future cycle
with an independent source (e.g. the agency's own published applicant
checklist, if one exists elsewhere on `sicad.gov.tn` or a DGSN-specific
page) could add this.

## Scope: judgment calls on requiredness

This source has no consistent asterisk/mandatory-marking convention (its
own footnote markers `(*)` and `(**)` denote a checkbox-marking
instruction and a signature-liability declaration respectively, not a
required-field marker), so requiredness was assigned by engineering
judgment, following this registry's standard approach (core
identity/eligibility/declaration fields required; secondary/ambiguous
fields optional):

1. **`paymentReceiptNumber`/`fiscalStampFeeAmount` modelled optional.**
   Both are printed inline beside the request-type checkboxes, not under
   the page's later, explicitly-labelled "خاص بالإدارة" heading — so this
   schema does not exclude them outright — but this registry could not
   independently confirm from the text layer alone whether the applicant
   fills these in themselves (having purchased the fiscal stamp and
   recorded its receipt number before submitting) or whether the
   receiving officer completes them at intake, so both are modelled
   optional rather than assumed required.
2. **`otherNationalities` modelled optional**, as a supplementary
   disclosure distinct from the form's core identity data (name,
   parentage, birth particulars, NIC number), consistent with this
   registry's treatment of comparable supplementary fields elsewhere
   (e.g. `mu/pio/passport-application`'s `contactDetailsLocal` and
   siblings).
3. **`height` modelled required** as a core personal-description field
   printed adjacent to unambiguously mandatory fields (sex, eye color),
   consistent with this registry's treatment of comparable biodata
   fields on other passport specimens.
4. **The spouse block (`spouseFirstName`/`spouseFamilyName`/
   `spouseNationality`) gated on `maritalStatus` equalling `MARRIED`.**
   The section's own printed labels ("Prénom/Nom/Nationalité de
   l'Epoux(se)") sit directly beneath the marital-status checklist with
   no separate discriminator field, so this schema reads the adjacency
   itself as the conditional link, the most direct reading available
   from a flat, non-interactive specimen.
5. **`addressNumber`/`addressStreet`/`addressCityOrVillage`/
   `addressGovernorate` modelled as four separate fields**, matching this
   specimen's own printed 4-column table layout (echoed in both Arabic
   and French column headers), rather than merged into a single address
   string.

## Conformance

2 mock scenarios were reasoned through by hand against this schema's own
`fields[]` conditions (not committed as fixture files, following this
registry's own precedent for single flat-PDF passport schemas, e.g.
`tt/imd/passport-application-first-adult`, `mu/pio/passport-application`):
(1) a single, first-time applicant — resolves with only the unconditional
fields required (no spouse fields, since `maritalStatus` is `SINGLE`);
(2) a married applicant requesting a replacement passport — correctly
requires `spouseFirstName`, `spouseFamilyName`, and `spouseNationality`
(via `maritalStatus` = `MARRIED`), with `requestType` = `REPLACEMENT` and
nothing else conditional (this schema does not model a
reason-for-replacement sub-question, since none is printed on this
specimen distinct from the four request-type checkboxes themselves). The
sole `requiredWhen` condition in this schema (`maritalStatus`) was
exercised both true and false across the two scenarios.

Validated clean with `node tools/validate.mjs` and `node
tools/validate-ajv.mjs` (ajv 2020-12 against
`spec/v0.3/govschema.schema.json`). `registry-index.json` regenerated via
`npm run build-index` in `tools/govschema-client/`.

Models 28 `fields[]` across 7 steps, 0 `documents[]` entries (omitted per
the scoping note above).
