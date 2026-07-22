# Verification record — sn/mae/visa-application@1.0.0

## Candidate selection

GOV-4417 ("GovSchema Standard Research"). The registry's single banked,
STRONG new-jurisdiction candidate at the start of this cycle — Kyrgyzstan's
GNS Form STI-163 (Business Formation) — remained unauthorable: `sti.gov.kg`'s
document-streaming endpoint was re-checked and still returned HTTP 500 on
this cycle's own independent re-fetch, so it stays banked (see CATALOG.md's
Known Gaps entry 0g) rather than being authored from a stale single-cycle
report. A research agent was dispatched to scout genuinely new (not
previously screened) jurisdictions across the six focus verticals, with an
explicit exclusion list of every jurisdiction already resolved or in
progress in this registry. It reported Senegal's Visa vertical — the
Consulate General of Senegal in Paris' short-stay visa application form —
as a curl-verified, unauthenticated, static-PDF candidate. This report was
independently re-verified below before authoring, per this registry's
standing source-of-truth-fidelity practice of never trusting a subagent's
fetch report alone.

## Reaching the live source

Target: `https://consulsen-paris.gouv.sn/wp-content/uploads/2022/08/visaform.pdf`.

- Independently re-fetched and re-hashed rather than trusted from the
  scouting report alone: HTTP 200, `Content-Type: application/pdf`,
  159,674 bytes.
- sha256 of the retrieved bytes:
  `ee29181d206219a12e3d97fb70e1bb543d62efb4c86e09558c0171d5a090ff72`.
- No login/CAPTCHA/WAF gate; a plain unauthenticated `curl` reached it
  cleanly.
- Current-edition corroboration: the consulate's own live page
  `https://consulsen-paris.gouv.sn/demande-de-visa/` (independently
  re-fetched, HTTP 200) links this exact file under a "Télécharger le
  formulaire" / "FORMULAIRE VISA" heading. The `/2022/08/` path segment is
  WordPress's own upload-date directory convention, not evidence of a stale
  edition — this is the only visa-form download the live page offers, and
  the surrounding site carries an actively-maintained 2025 information
  post.

## Extraction method

`pdfjs-dist` (vendored at `/tmp/node_modules/pdfjs-dist`, CommonJS build at
`legacy/build/pdf.js`) `getTextContent()` read every text item's raw string
and its `transform` y-coordinate across both pages, reconstructing
line-by-line layout by grouping items whose y-coordinates fall within 3pt
of each other. No `/Widget` annotations are present anywhere in the
document (a flat specimen, not a fillable AcroForm); no checkbox/radio
glyph appears anywhere in the document's own character set, so every field
is a ruled fill-in-the-blank line, not a tick-one-of-many selection.

## Document structure

Page 1: an office/administration header; the bilingual French/English
title ("Demande de Visa de Moins de Trois Mois" / "Application for less
than three months"); the applicant's personal particulars (family name,
first names, maiden name, date/place of birth, present/original
nationality, civil status, address, city/country, occupation, home phone);
a photo placement box; passport number; then an "Emplacement Reservé à
l'Administration / For Official Use Only" block of 7 numbered
administrative items (visa number, authority, visa type, issue/expiry
dates, authorized duration/entries, and a prior-consultation reference) —
excluded, consular-staff-completed. Page 2: whether travelling alone or
accompanied (with companions' names/passport numbers); purpose of trip,
with three conditional sub-detail prompts (business contacts,
congress/conference particulars, study/training particulars); prior
residence in Senegal exceeding three months (with date/place if so);
references in Senegal; accommodation address/phone during the stay,
including an optional host name and the host's phone; method of travel; a
standard declaration paragraph (not modelled as a field — it states no
information the applicant supplies, only an undertaking the applicant
accepts by signing); a list of required supporting documents; the
signature/date line; and an "Avis du Chef de Poste / Authority's decision"
line — excluded, consular-staff-completed after submission.

## Disclosed findings and interpretation choices

1. **`nationalityOriginal` is modelled required, not optional**, unlike
   this registry's usual treatment of a former-name/former-nationality
   pair (e.g. `jm/mfaft/visa-application`'s formerName/nationalityFormer,
   both optional "if different from above"). This form prints "Nationalité
   actuelle" (Present Nationality) and "Nationalité d'origine" (Original
   Nationality) side by side with no "if different" qualifier on either —
   both are asked unconditionally, most plausibly to surface naturalization
   history for every applicant, not only those who have changed
   nationality.
2. **`maritalStatus` is modelled as a free-text field, not an enum**,
   unlike the analogous Jamaica schema's own `maritalStatus`. The source
   prints only "Situation de famille (Civil Status)" as a plain blank with
   no parenthetical option list anywhere on the form — a genuine
   structural difference from the Jamaica specimen, not an omission.
3. **No sex/gender field is modelled.** Unlike this registry's
   Jamaica/Botswana consular visa schemas, this form prints no sex/gender
   line anywhere on either page — confirmed by reading every line of both
   pages' extracted text.
4. **`travelCompanionsDetails` collapses the compound
   question-plus-instruction ("Voyagez-vous seul ou accompagné" /
   "Indiquez leurs Noms, Prénoms et N° Passeport") into a single required
   free-text field.** The source prints no checkbox distinguishing "alone"
   from "accompanied"; an applicant travelling alone is expected to write
   as much in the same blank (e.g. "seul"/"alone").
5. **`businessContactsNamesAddresses`, `congressDetails`, and
   `studyDetails` are modelled as unconditionally optional free-text
   fields, not gated by `requiredWhen` on `purposeOfTrip`.** The source's
   own sub-prompts ("Si Voyage d'Affaires...", "Si Participation à un
   congrès...", "Si Etudes universitaires...") are printed conditionals,
   but `purposeOfTrip` itself is a free-text blank with no enumerated
   option list to serve as a `requiredWhen` discriminator, and the three
   purposes named are illustrative, not exhaustive (the form does not
   restrict trips to only these three categories — tourism or family
   visits are also plainly in scope per the form's own closing declaration
   about accepting no paid employment during the stay). Disclosed rather
   than fabricating a discriminator enum the source does not itself print.
6. **`priorResidenceInSenegalDetails` collapses "Avez-vous déjà résidé au
   Sénégal Pendant plus de trois mois" and its own follow-up "Précisez à
   quelle date et où" into a single optional free-text field**, the same
   compound-question-single-blank pattern as Finding 4 — the source prints
   these as one continuous item with no separate yes/no checkbox.
7. **`referencesInSenegal` is modelled as a single optional free-text
   field**, not split into named sub-fields, since the source prints one
   ruled blank beneath "Références au Sénégal (Name of person to be
   visited, other references in Senegal)" — confirmed via each text item's
   own y-coordinate — unlike Jamaica's two side-by-side numbered reference
   slots.
8. **`hostName` and `hostPhone` are modelled optional**, since an
   applicant may already have supplied their own accommodation address in
   the required `accommodationAddressAndPhone` field without necessarily
   staying with a named host ("Chez Mr/Mme" is printed as a sub-line, not a
   mandatory branch).
9. **Required supporting documents are modelled as `documents[]`, not
   fields**, transcribing the source's own "Pièces à fournir" list: a
   residence-permit photocopy, a passport photocopy, an identity photo (the
   source's own parenthetical ties this specifically to "visa avec
   consultation"), and a flight ticket/reservation (tied to "visa sans
   consultation"). Since whether a given applicant's visa requires prior
   consultation ("Consultation Préalable", referenced in the excluded
   administrative block's own item 7) depends on Senegal's own
   nationality-based visa policy rather than anything the applicant
   declares on this form, the photo and flight-ticket entries are each
   disclosed via `handling` but modelled as `required: true` (the safer
   default, since neither the "avec"/"sans consultation" distinction nor
   an applicant's own consultation status is knowable from the form
   itself), rather than fabricating a `requiredWhen` discriminator the
   source does not supply.
10. **The declaration paragraph beginning "Je m'engage à n'accepter aucun
    emploi rémunéré..." is not modelled as a field or a `documents[]`
    attestation entry.** Unlike an attestation the applicant affirmatively
    checks or signs a distinct line for, this paragraph is folded into the
    ordinary act of signing the form (`applicantSignature`); no separate
    acknowledgement mechanism is printed.
11. **Excluded as office/consular-staff-completed, not applicant-supplied
    data:** the page-1 "Emplacement Reservé à l'Administration / For
    Official Use Only" block (7 numbered items covering visa number,
    authority, type, dates, duration, entries, and prior-consultation
    reference) and the page-2 "Avis du Chef de Poste / Authority's
    decision" line.

## Conformance

3 valid mock scenarios — `valid-tourist-first-time-applicant` (a
first-time tourist applicant travelling alone, no prior Senegal residence,
minimal optional fields); `valid-business-applicant-with-prior-residence`
(a business-purpose applicant declaring prior residence in Senegal and a
named accommodation host); and `valid-student-with-companion` (a
study-purpose applicant travelling with one named companion and providing
full accommodation/host detail) — plus 17 mutation-control fixtures, one
per statically-required field (`surname`, `firstNames`, `dateOfBirth`,
`placeOfBirth`, `nationalityPresent`, `nationalityOriginal`,
`maritalStatus`, `address`, `cityAndCountry`, `occupation`,
`passportNumber`, `travelCompanionsDetails`, `purposeOfTrip`,
`accommodationAddressAndPhone`, `methodOfTravel`, `applicantSignature`,
`declarationDate`), and one unknown-field-rejected fixture, committed under
`conformance/sn/mae/visa-application/1.0.0/`.

An ephemeral, from-scratch conformance checker (deriving required rules
directly from this schema's own `fields[]`, discarded after use, not
committed) ran all 21 fixtures: all 3 valid scenarios at 0 errors, all 17
mutation controls each raising exactly 1 error, and the unknown-field
fixture correctly rejected. Validated clean with `node tools/validate.mjs`
and `node tools/validate-ajv.mjs`, individually and as part of the full
609-document registry run. `tools/verify-sources.mjs` scoped to
`registry/sn/mae/visa-application/` reports all 4 cited URLs clear.
`registry-index.json` regenerated via `npm run build-index` in
`tools/govschema-client/`.

## Open backlog for a future cycle

The research agent also flagged Senegal's other five verticals as
unscreened-or-inconclusive, not dead ends:

- **Taxes** — DGID's forms page (`dgid.sn/formulaires/`) failed a plain
  `curl` with a TLS certificate error; worth a retry with `-k` or via the
  alternate `impotsetdomaines.gouv.sn`/`impotsetdomaines.sec.gouv.sn`
  mirrors.
- **Business Formation** — APIX (the guichet unique) reportedly hosts a
  "déclaration d'honneur" form; no direct PDF URL was found this cycle,
  worth a targeted APIX site crawl.
- **DMV** — MITTD (transport ministry, `mittd.gouv.sn`) has driving-licence
  procedure pages but no direct downloadable application PDF found yet.
- **Passport and National ID** — not yet screened this cycle.

Not pursued further this cycle in favor of banking one independently
re-verified, curl-clean candidate rather than authoring from unverified
leads.
