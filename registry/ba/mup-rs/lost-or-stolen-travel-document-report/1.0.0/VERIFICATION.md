# Verification record — ba/mup-rs/lost-or-stolen-travel-document-report@1.0.0

## Candidate selection

GOV-4720 ("GovSchema Standard Research"). GOV-4713 opened Bosnia and
Herzegovina as the registry's 97th jurisdiction via Business Formation only
(`ba/apif/business-entity-classification-application@1.0.0`), leaving DMV,
Taxes, Visa, Passport, and National ID as open backlog, none screened. This
cycle screened that backlog directly (no banked candidate existed yet for
any of the five remaining verticals):

1. **Visa** — the Ministry of Foreign Affairs' own national visa
   application form, found live at a Bosnia and Herzegovina embassy site
   (`bihembassy.org/konzdoc/Visa_application_form.pdf`, HTTP 200, 237,174
   bytes), titled "Zahtjev za izdavanje vize / Request for Issuance of
   Visa" (Obrazac 1). Extracted with `pdfjs-dist` and field-by-field
   compared against this registry's own
   `fr/france-visas/schengen-visa-application@1.0.0`: the numbered field
   sequence (1. surname, 2. surname at birth, 3. first names, 4. date of
   birth, 5. ID number (optional), 6. place and country of birth, 7.
   current nationality, 8. nationality at birth, 9. sex, 10. marital
   status ... spouse's particulars, children table, family members in the
   destination country) is a match to the harmonized EU Schengen Annex I
   template, the same duplicate pattern this registry has already found
   and declined for Belgium's national D-visa
   (see the `gov4687-hu-nav-tax-opens-96th-belgium-visa-duplicate` memory
   record and its own GOV-1774 precedent). **Not authored.** This extends
   the known duplication pattern beyond EU/Schengen member states — a
   non-Schengen country's own national visa form reusing the same
   harmonized template verbatim. Banked as a confirmed dead end.
2. **DMV** — MUP RS's own "Registracija vozila" (vehicle registration)
   page (`https://mup.vladars.rs/lat/mup-servisi/registracija-vozila`,
   fetched HTTP 200) describes the registration process and required
   documents in prose but publishes no downloadable request-form PDF/DOC
   on that page (no matching `href` found by pattern search across the
   fetched HTML). Left unscreened further this cycle rather than declared
   a dead end — disclosed as open backlog, not confirmed exhausted.
3. **Passport** — MUP RS's own "Putne isprave" (travel documents) page
   (`https://mup.vladars.rs/lat/mup-servisi/putne-isprave`, fetched HTTP
   200) states the primary passport-issuance request itself is "an
   electronic form filled out at the counter of the competent authority"
   (no public blank specimen to author from — consistent with this
   registry's recurring biometric-passport-application dead-end pattern),
   but the same page links two directly-fetchable PDF forms for a
   different Passport sub-case: **Obrazac GPI-1** and **Obrazac GPI-2**,
   MUP RS's own report of a lost or stolen travel document. **Authored
   GPI-1, the domestic-filing variant, as this v1.0.0** — see below.
4. Taxes and National ID were not reached this cycle; remain open backlog.

## Reaching the live source

`https://mup.vladars.rs/lat/mup-servisi/putne-isprave` links both forms via
a page-relative href (`../documents/putne_isprave/ObrazacGPI_1.pdf`); the
correct resolution against that page's own URL is
`https://mup.vladars.rs/lat/documents/putne_isprave/ObrazacGPI_1.pdf` (a
sibling path under `/lat/documents/putne_isprave/`, not
`/lat/mup-servisi/documents/...`, though that path also happens to
resolve to a large HTML page rather than a 404, so the correct
resolution was confirmed by inspecting `Content-Type`/size rather than
trusting a bare "200 OK").

- **Obrazac GPI-1**
  (`https://mup.vladars.rs/lat/documents/putne_isprave/ObrazacGPI_1.pdf`,
  HTTP 200, `Content-Type: application/pdf`, 164,608 bytes, sha256
  `b07abcc121542f2e60e61d53dd5e7d429a15e5a5f25961e396f7c1b9a3a65a97`,
  `Last-Modified: Mon, 02 Sep 2024`). Filed with a domestic Republika
  Srpska police authority — the form's own Section 5 (staff-completed) is
  headed "popunjava policijski službenik ili nadležni organ" (completed by
  a police officer or competent authority). **Authored as this v1.0.0.**
- **Obrazac GPI-2**
  (`https://mup.vladars.rs/lat/documents/putne_isprave/ObrazacGPI_2.pdf`,
  HTTP 200, `Content-Type: application/pdf`, 158,466 bytes, sha256
  `a6589559869261514ff2cd07c4959b686454125fbc841caa1617dab1119c41ab`,
  `Last-Modified: Mon, 02 Sep 2024`) is the same report filed instead with
  a Bosnia and Herzegovina diplomatic-consular mission abroad (its own
  header reads "Naziv DKP kome se prijava podnosi", and its Section 5 is
  headed "popunjava DKP"). Field-for-field identical to GPI-1 except:
  header addressee (DKP vs. domestic authority) and Section 4's
  "MJESTO NESTANKE" item, which GPI-2 states as "MJESTO I DRŽAVA NESTANKE"
  (place *and country* of loss — relevant only when reporting from
  abroad). **Not authored this cycle** — disclosed as open backlog for a
  future companion schema, following this registry's established
  main-form-now/companion-form-later convention (e.g. `hu/nav`'s deferred
  detail sheets, `kz`'s Form 220.0X/250.0X series).

## Extraction method

`pdfjs-dist` (`/tmp/node_modules/pdfjs-dist/legacy/build/pdf.js`) read
every text item on both pages of GPI-1 in natural top-to-bottom reading
order — no non-sequential-reading-order or vector-checkbox scrambling
encountered. `getAnnotations()` was not separately queried; the printed
answer lines are plain underscores (a flat, non-fillable specimen), and
`node-canvas` (`/tmp/node_modules/canvas`) was used to render both pages
to PNG at 2.5x scale for direct visual confirmation of layout — in
particular to resolve one genuine ambiguity the raw text stream alone left
unclear: whether Section 4's "PUTNA ISPRAVA/PUTOVNICA JE" line took free
text or a checkbox answer. The rendered image confirmed two checkboxes
directly beside that line, labelled "Izgubljena / Ukradena" (Lost /
Stolen) — modelled as the `documentStatus` enum. Both languages present
throughout are Bosnian (Latin script) and Serbian (Cyrillic script); no
separate English column, unlike GPI-1's sibling GPI-2 or the rejected
Schengen-template visa form.

## Document structure

Page 1: header (name of the person filing the report; name of the
receiving authority), title block, Section 1 "PODACI O NOSIOCU PUTNE
ISPRAVE/PUTOVNICE" (holder identity: JMB, first/last name, one parent's
name, date/place/country of birth), Section 2 "PODACI O PREBIVALIŠTU
NOSIOCA" (holder's permanent-residence address/place), Section 3 "PODACI O
BORAVIŠTU NOSIOCA" (holder's temporary-residence address/place), and the
start of Section 4 "PODACI O NESTALOJ PUTNOJ ISPRAVI/PUTOVNICI" (lost/
stolen checkbox, issuing authority, date/place of loss, and the opening of
a free-text circumstances description that continues into a large ruled
box at the top of page 2). Page 2: the remainder of the circumstances
description box, the applicant's signature line, place/date of filing, and
the reporting person's own ID-card number and issuing authority — then
Section 5 "PODACI O NESTALOJ PUTNOJ ISPRAVI/PUTOVNICI (popunjava
policijski službenik ili nadležni organ)" (issuing-authority name, the
missing document's serial number, its date of issuance, a protocol number,
and an authorized officer's signature/stamp), plus closing instructional
text (the receiving police authority's own duty to relay a copy to the
document's original issuing authority, and a note that this form may be
used to declare the travel document void) — all authority-populated and
excluded from this schema.

## Disclosed findings and interpretation choices

1. **`holderDateOfBirth` and `holderPlaceAndCountryOfBirth` are split from
   the form's single combined heading** ("DATUM, MJESTO I DRŽAVA ROĐENJA",
   one heading, one answer line). The date component is modelled as a
   distinct typed `date` field per this registry's standard convention for
   machine-readable dates (matching `us/dos/lost-or-stolen-passport-ds64`'s
   own separate `dateOfBirth`); place and country are left combined as one
   free-text field, since the form's own single blank line does not
   visually separate them the way the rejected Schengen-template visa form
   does (which prints "Place and country of birth" as its own distinct
   numbered item, separate from date of birth). Disclosed as an
   interpretation choice on the date/place split, not a literal
   transcription of the source's own single-line layout.
2. **`receivingAuthorityName` is modelled as required.** It sits in the
   applicant-facing header (a blank line directly following "Naziv organa
   kome se prijava podnosi"), distinct from Section 5's own
   authority-populated fields lower on the form; disclosed as a judgment
   call, since the source does not print an explicit "*"/mandatory marker
   on any field on this form.
3. **`holderTemporaryAddress`/`holderTemporaryAddressPlace` are modelled as
   optional**, unlike the permanent-residence pair in Section 2. Not every
   holder maintains a residence distinct from their permanent one; the
   form provides no indication this section is mandatory, consistent with
   this registry's precedent (`notequals-empty-string-absent-field-bug`,
   the KG STI-163 and BA RPS-1 cycles' own findings) of not asserting a
   requirement the source does not itself state.
4. **`holderPersonalId` and `reporterIdCardNumber` are modelled without a
   specific digit-count pattern**, matching this registry's own precedent
   on the same field type in `ba/apif/business-entity-classification-application`
   (Finding 7/8) — the regional JMBG format's 13-digit convention is not a
   length this specific form states.
5. **Obrazac GPI-2 (the DKP/abroad-filing variant) is disclosed, not
   authored**, per the "Reaching the live source" section above — left as
   backlog for a future companion schema.
6. **DMV (no downloadable form found on MUP RS's own vehicle-registration
   page) and the primary Passport in-person/electronic-only application
   (no public blank specimen) are disclosed as unscreened/dead-end
   findings respectively, not silently dropped** — see "Candidate
   selection" above. Taxes and National ID were not reached this cycle.

## Conformance

2 valid mock scenarios — `valid-stolen-passport-with-temporary-residence`
(exercises both optional temporary-residence fields present) and
`valid-lost-passport-no-temporary-residence` (exercises their absent case)
— plus 19 static-`required`-field mutation fixtures (one per `required:
true` field) and 1 unknown-field-rejected fixture, committed under
`conformance/ba/mup-rs/lost-or-stolen-travel-document-report/1.0.0/`. This
form has no conditional (`requiredWhen`) fields to gate — every field's
requiredness is unconditional, and none was fabricated to exercise a gate
that the source itself does not state.

An ephemeral, from-scratch conformance checker (deriving required rules
directly from this schema's own `fields[]`, discarded after use, not
committed) ran all 22 fixtures: both valid scenarios at 0 errors, all 19
mutation controls each raising exactly 1 error, and the unknown-field
fixture correctly rejected. Validated clean with `node tools/validate.mjs`
and `node tools/validate-ajv.mjs`, individually and as part of the full
registry run (652/652). `registry-index.json` regenerated via
`npm run build-index` in `tools/govschema-client/`.
