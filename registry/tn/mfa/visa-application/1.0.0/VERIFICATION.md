# Verification record — tn/mfa/visa-application@1.0.0

## Candidate selection

GOV-4673 ("GovSchema Standard Research"), continuing GOV-4638's own
scouting record. GOV-4638 (2026-07-24) scouted Tunisia's Visa vertical as
"STRONG" — "a trilingual AR/FR/EN MFA visa application form hosted on a
Tunisian embassy site, since `e-visa.tn` itself does not resolve" — but
did not record a specific URL. Tunisia's other five verticals were
authored across GOV-4638 (Passport), GOV-4652 (National ID), GOV-4659
(Business Formation), and GOV-4666 (Taxes); DMV came back weak and
remains open backlog. This cycle independently located and verified a
live specimen matching GOV-4638's own description, closing the last
STRONG candidate in Tunisia's disclosed backlog.

## Reaching the live source

`http://consulat-tunisie.ca/wp-content/uploads/2015/11/FORMULAIRE-VISA.pdf`

- The centralized `e-visa.tn` portal was not re-attempted this cycle
  (GOV-4638 already found it non-resolving); instead this cycle searched
  for a Tunisian diplomatic mission hosting the Ministry of Foreign
  Affairs' own visa application PDF directly.
- `consulat-tunisie.ca` is the **Consulat de la République Tunisienne à
  Montréal** (Consulate General of the Republic of Tunisia in Montreal,
  Canada) — confirmed via the site's own HTML `<title>` tag,
  "Consulat de la République Tunisienne à Montréal." This is a Tunisian
  government diplomatic mission's own site, not a third-party visa
  agency — the same "portal/mission host vs. issuing authority" pattern
  this registry applies elsewhere (e.g. `be/diplomatie` visa/passport
  forms hosted on embassy subdomains, `tn/dgsn/passport-application`'s
  own note on `sicad.gov.tn` being a multi-ministry portal rather than
  DGSN itself). The issuing authority modelled in this schema is the
  Ministry of Foreign Affairs (the form's own printed letterhead), not
  the Montreal consulate specifically — the same national form is
  independently mirrored by other Tunisian consular sites abroad,
  consistent with a single centrally-designed application distributed
  identically across missions.
- Plain unauthenticated `curl` request (with a realistic desktop
  `User-Agent` header; no session/cookie state, no CAPTCHA/WAF
  challenge). **The domain does not serve HTTPS on port 443**
  (`https://` returns a certificate error on independent re-check) — the
  same plain-HTTP-only hosting property this registry has already
  documented for `sicad.gov.tn`; fetched via `http://`.
- HTTP 200, **314,072 bytes** retrieved.
- PDF header `%PDF-1.5\r\n%\265\265\265\265\r\n` at byte 0.
- sha256 of the retrieved bytes:
  `abe7414a010ef438963e832ae3fcd6fa646255d1e6912a579a42a0b9e3d31bfe`.
- 2 pages, confirmed via `pdfjs-dist`'s `numPages`.
- `getAnnotations()` returned 0 annotations on both pages — a flat,
  print-and-fill specimen (dotted-line blanks), not an interactive
  AcroForm, consistent with every other Tunisia specimen in this
  registry so far.

## Extraction method

`pdfjs-dist` (vendored at `/tmp/node_modules/pdfjs-dist`, loaded via
`legacy/build/pdf.js`) `getTextContent()` read every text item's raw
string and `x`/`y` transform position on both pages. Unlike the fourth
extraction-failure mode documented for this registry's other two DGI
specimens (`tn/dgi/declaration-of-existence`, `tn/dgi/irpp-declaration`
— genuine Arabic Unicode codepoints whose glyph-paint order does not
reassemble into readable text), **this specimen's text layer decodes
cleanly and in correct reading order for all three languages** (Arabic,
French, and English) with no scrambling — confirmed by direct
side-by-side comparison of the extracted strings against a `node-canvas`
render (3x scale) of both pages. The canvas render itself failed to
paint the Latin-script (French/English) glyphs — a distinct, fifth
rendering artifact for this registry (Times/Helvetica glyph paths
reported "Requesting object that isn't resolved yet" warnings and were
skipped), while the Arabic glyphs rendered correctly — but since the
`getTextContent()` string extraction was independently clean and
readable for every language, the canvas render was used only to confirm
page layout and the absence of any checkbox/bracket controls near the
"Court Séjour - Transit" visa-type heading and the "Have you previously
stayed in Tunisia?" question, not as the primary reading method (unlike
the DGI specimens).

## Document structure

**Page 1** — header (Republic of Tunisia / Ministry of Foreign Affairs /
"Demande de VISA" title / "Court Séjour - Transit" (Short Stay -
Transit) subheading, describing the single visa category this form
covers, not a selectable option); an embassy/consulate-and-city filing
header (two handwritten blanks); a "PHOTO" placeholder box; then a
single-column sequence of labeled blanks: family name, given names, date
and place of birth, marital status, present nationality, nationality at
birth, profession, residence during the last 2 years, passport number,
date and place of passport issue, date of entry to Tunisia, duration of
stay, detailed reason of travel, anticipated mode of transportation,
point of entry, address in Tunisia, persons known in Tunisia, their
addresses, and persons accompanying the applicant.

**Page 2** — three footnoted elaboration blocks (each with its own blank
lines) explaining what to write under "detailed reason of travel" for
three specific trip types: business trips (contacts to reach), trips to
attend a congress/seminar/event (organizer, place, date, duration), and
trips for university studies or technical training (institution names,
duration, and whether the traveler is financially supported by a
Tunisian organization or person); a yes/no question on prior stays in
Tunisia with a single free-text blank beneath it; two declaration
paragraphs (a pledge not to work or overstay, and a false-declaration
liability statement); a single trilingual "Signature" line; and finally
an entirely consular-staff section headed "RÉSERVÉ A L'AUTORITÉ QUI
REÇOIT LA DEMANDE" ("space reserved for the authority which receives the
application" / "مخصص للسلطة التي ستتلقى المطلب") — a documents/
recommendations-received reference block, a "Décision" (Decision) line,
and a place/date/"Le Consul" (the Consul) sign-off block.

## Scope: sections and fields excluded

- **The entire "RÉSERVÉ A L'AUTORITÉ QUI REÇOIT LA DEMANDE" tail on page
  2 is excluded** — explicitly headed as reserved for the receiving
  authority, covering the consular officer's own documents-received
  reference notes, decision, and sign-off, not applicant-supplied data.
  The same "officer-performed-duty, not applicant-supplied data"
  reasoning this registry applies to comparable sections elsewhere (e.g.
  `tn/dgsn/passport-application`'s page 2 police certification).
- **The two printed declaration paragraphs** (the pledge and the
  liability statement) are not modelled as separate fields — they are
  fixed, non-fill-in text the applicant is bound by upon signing, folded
  into `applicantSignature`'s own `description`, matching this
  registry's `tn/dgsn/passport-application` precedent for a single
  signature covering multiple printed declaration references.
- **The "Court Séjour - Transit" / "Short Stay - Transit" heading is not
  modelled as a field.** Visual confirmation via the canvas render found
  no checkbox or bracket near either language variant of this text — it
  is a single subheading describing the one visa category this form
  covers (both short-stay and transit fall under the same specimen), not
  a selectable option between two visa types.

## Scope: fields excluded from `documents[]`

Only `applicantPhoto` is modelled. Unlike several other registry sources
with an explicit named supporting-documents checklist, this specimen
prints no such list anywhere on either page — the page 2 "Références des
pièces jointes ou produites..." line is a consular-staff reference field
(excluded above), not an applicant-facing checklist naming specific
required documents. Modelling additional `documents[]` entries here
would mean inventing document types this source does not name, which
this registry's source-fidelity standard does not permit.

## Scope: judgment calls on requiredness and field modelling

- **`filingEmbassyOrConsulateName` / `filingLocationCity`** are modelled
  as required applicant-supplied fields (the applicant must state which
  mission and city they are filing with) rather than excluded as
  office-context, since they appear as ordinary handwritten blanks on the
  applicant-facing header, not under any "for administration use"
  heading — matching this registry's `de/auswaertiges-amt` precedent of
  modelling the responsible diplomatic mission as an applicant-facing
  field.
- **`dateAndPlaceOfBirth` and `passportIssuePlaceAndDate`** are each
  modelled as a single combined string field, matching this specimen's
  own single-blank layout and this registry's established combined-field
  precedent (see `ci/cepici/sole-trader-registration`), rather than
  splitting date and place into two fields not actually printed
  separately.
- **`maritalStatus`** is modelled as a plain string, not an enum, because
  this specimen prints one free-text blank with no checkbox list —
  unlike `tn/dgsn/passport-application`, which prints an explicit
  4-option marital-status checklist on the same jurisdiction's passport
  form. The two Tunisia specimens are not modelled identically because
  they are not laid out identically.
- **`businessTripContacts`, `conferenceOrEventDetails`, and
  `studiesOrTrainingDetails`** are all modelled optional with no
  `requiredWhen` gate, since the specimen provides no discrete
  trip-type-selector field (`detailedReasonOfTravel` is itself free
  text) that could serve as a machine-checkable trigger condition;
  gating on free-text content would require pattern-matching the
  `detailedReasonOfTravel` value, which this registry does not do.
- **`previousStayInTunisiaDetails`** is modelled as an optional free-text
  string, not a boolean, because the specimen poses a yes/no question but
  prints only a single free-text blank beneath it with no discrete
  yes/no control.
- **`personsKnownInTunisia`, `theirAddresses`, and
  `personsAccompanyingYou`** are all modelled optional since an applicant
  may plausibly have none of these, and the specimen provides no
  discrete "none" checkbox to otherwise signal optionality.
- All other fields (identity, passport, and core trip-detail fields) are
  modelled required, following this registry's standard approach for
  core identity/eligibility/declaration data on an application this
  short.

## Conformance check

An ephemeral, uncommitted Node script built 5 mock scenarios against the
schema's `requiredWhen`-free field set (this schema has no `requiredWhen`
gates — every conditional field here is a judgment-call optional, not a
machine-checkable gate) and confirmed:

1. A minimal complete single-traveler tourist-visa scenario (all required
   fields present, all optional elaboration fields omitted) validates.
2. A business-trip scenario populating `businessTripContacts` alongside
   the required fields validates.
3. A conference-trip scenario populating `conferenceOrEventDetails`
   validates.
4. A studies-trip scenario populating `studiesOrTrainingDetails`
   validates.
5. A negative scenario omitting a required field (`passportNumber`)
   correctly fails validation.

Both `node tools/validate.mjs` and `node tools/validate-ajv.mjs` pass for
this document.
