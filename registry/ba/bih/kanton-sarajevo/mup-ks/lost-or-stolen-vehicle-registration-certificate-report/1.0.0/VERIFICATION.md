# Verification record — ba/bih/kanton-sarajevo/mup-ks/lost-or-stolen-vehicle-registration-certificate-report@1.0.0

## Candidate selection

GOV-4741 ("GovSchema Standard Research"). Bosnia and Herzegovina had grown to
4 of 6 verticals across GOV-4713 (Business Formation), GOV-4720 (Passport),
GOV-4727 (Taxes), and GOV-4734 (National ID), with DMV re-screened fresh in
every one of those three most recent cycles and confirmed each time to
publish no downloadable specimen from either the state-level Agency for
Identification Documents, Registers and Data Exchange (IDDEEA) or Republika
Srpska's own Ministry of Interior (MUP RS) — left open backlog, not a
confirmed dead end. This cycle first re-verified every legacy
"GovSchema Standard Research" National ID candidate this issue's own recurring
notes name (DE Steuer-ID, SG NRIC loss/damage + re-registration, NZ RealMe,
"remaining voter registration") is already authored and closed
(`de/finanzamt/tax-identification-number`, `sg/ica/identity-card-replacement`,
`sg/ica/identity-card-reregistration`, `nz/dia/realme-verified-identity`, and
12 separate voter-registration schemas already in the registry) — no action
needed. It then attempted to re-check Kyrgyzstan's own inconclusive
GOV-4410 Passport/National ID finding (`grs.gov.kg` had been unreachable that
cycle): `grs.gov.kg` returned a consistent `502 Bad Gateway` from `nginx`
across three fresh attempts and a `certificate has expired` error via a
different fetch path, a genuine, still-ongoing site-side outage; a Wayback
Machine snapshot (`web.archive.org`, 2024-04-25 for `/ru/epassport/documents/`,
2017-06-10 for `/ru/eid/documents/`) was fetched as a substitute and both
pages' own text confirm the "анкета-заявление" (application form) for both
Kyrgyzstan's e-passport and eID processes is explicitly "оформляется
сотрудником территориального подразделения или ЦОН" (completed by staff of
the territorial subdivision or a Public Service Center), not a citizen-filled
blank specimen — this converts GOV-4410's own "inconclusive" finding for both
verticals into a **confirmed dead end** (Kyrgyzstan remains closed at 2/6:
Taxes, Business Formation). Tunisia's own banked DMV candidate
(`attt.com.tn`) was re-attempted and remains unreachable (connection timeout).

Pivoted to Bosnia and Herzegovina's own remaining DMV backlog, the single
strongest still-open candidate for a jurisdiction already at 4/6. Rather than
re-fetching the same two sources three prior cycles had already found empty,
this cycle read Bosnia and Herzegovina's own state-level vehicle-registration
rulebook directly (`bihamk.ba/assets/files/cQ8zCTVMTq-pravilnik-o-registriranju-vozila-09pdf.pdf`,
"Pravilnik o registriranju vozila", HTTP 200, 1,440,394 bytes, issued by the
Ministry of Communications and Transport of Bosnia and Herzegovina "u
saradnji sa entitetskim ministarstvima unutrašnjih poslova," i.e. jointly
with the entity-level Interior Ministries — a genuinely state-wide legal
instrument, unlike any BA source examined in prior cycles). Its own Article 5
states the request form for initiating vehicle-registration procedures is
prescribed "kod nadležnog tijela" (by the competent authority) and its own
Article 71(1) explicitly **excludes** that same request form from the set of
forms IDDEEA itself supplies/standardizes ("Obrasce propisane ovim
pravilnikom, osim obrasca zahtjeva iz člana 5. stav (2) ovog pravilnika,
osigurava IDDEEA") — confirming, from the regulation's own text, that
Bosnia and Herzegovina's vehicle-registration request form is designed and
published locally by each competent authority (cantonal Ministries of
Interior in the Federation of Bosnia and Herzegovina, or Republika Srpska's
own MUP RS) rather than as a single nationwide specimen. (The rulebook's own
Annex 1 onward, pages 34-60, extract as empty text via `pdfjs-dist` — these
annexes are scanned-image inserts with no embedded text layer, and Article 70
confirms their content is the registration-certificate/plate/sticker
**output** templates IDDEEA personalizes and distributes, not a citizen input
form, so no further extraction was attempted there.)

Given the fragmentation this text itself predicts, this cycle searched
cantonal Ministry of Interior sites directly (Sarajevo Canton's `mup.ks.gov.ba`
and Tuzla Canton's `muptk.ba`, both located via web search) rather than
re-attempting MUP RS or IDDEEA a fourth time. Both cantonal forms pages
publish real, distinct sets of citizen-facing forms (confirming the
regulation's own fragmentation finding — Tuzla Canton's own forms differ
materially from Sarajevo Canton's), but neither publishes the primary
first-registration request form itself; Sarajevo Canton's own MUP KS
(`mup.ks.gov.ba/gradjanstvo/zahtjevi`) instead publishes four narrower,
citizen-facing forms in the same family as this registry's own
`ba/mup-rs/lost-or-stolen-travel-document-report@1.0.0` precedent — reports
used to invalidate/replace a lost or stolen vehicle document rather than a
first-registration application:

- **MP-7, Obr. br. 2** — "Zahtjev za oglašavanje nevažećom potvrde o
  registraciji vozila" (declare an invalid vehicle **registration**
  certificate). **Authored as this v1.0.0** — see below.
- **MP-7, Obr. br. 3** — the same declaration for a vehicle **ownership**
  certificate (potvrda o vlasništvu vozila). Field-for-field identical in
  structure to Obr. br. 2 (confirmed via the same extraction pass); not
  authored this cycle — disclosed as open backlog for a future companion
  schema.
- **MP-7, Obr. br. 4** — the same declaration for **registration plates**
  (registarske tablice), with one additional field (count of lost/stolen
  plates) and one additional required attachment (proof of the vehicle's
  circulation permit/registration certificate). Not authored this cycle —
  disclosed as open backlog for a future companion schema.
- **MP-10, Obr. br. 3** — "Zahtjev za izdavanje uvjerenja o statusu
  registracije motornog vozila" (request for a certificate of a vehicle's
  registration status, registered/deregistered) — a distinct, simpler
  certificate-request form (vehicle make/model, chassis number, plate
  number, purpose of the certificate). Not authored this cycle — disclosed
  as open backlog for a future companion schema; a genuinely different
  process from the MP-7 family (requesting a status certificate rather than
  invalidating a lost document).

MP-7 Obr. br. 2 was chosen over its Obr. br. 3/4 siblings as this cycle's
single deliverable per this registry's usual one-candidate-per-cycle
convention, since it is the most direct DMV-vertical match ("Registration").

## Reaching the live source

`https://mup.ks.gov.ba/gradjanstvo/zahtjevi` links the form via a
site-relative path resolving to
`https://mup.ks.gov.ba/sites/mup.ks.gov.ba/files/2023-01/mp-7_obr._br.2_nevazeca_potvrda_o_reg._vozila.pdf`
— fetched fresh this cycle: HTTP 200, `Content-Type: application/pdf`,
391,836 bytes, sha256
`a6e4e047ff27958712e51e2c6c27408a0088f6560a6c17daf4b7ed4bdd7622ae`,
`Last-Modified: Mon, 23 Jan 2023 10:52:40 GMT`. `curl` required the `-k` flag
to reach `mup.ks.gov.ba` at all — the site's TLS certificate chain did not
validate against this session's default trust store on the first several
attempts (a distinct symptom from an outage/bot-block; the connection itself
succeeded once certificate verification was skipped), consistent with a
misconfigured or short intermediate-certificate chain rather than the server
being unreachable.

## Extraction method

`pdfjs-dist` (`/tmp/node_modules/pdfjs-dist/legacy/build/pdf.js`) read the
form's single page; the raw text stream came back visibly corrupted in
places (e.g. "Tahtjeva" for "zahtjeva", "pofvrde" for "potvrde"), a
character-substitution artifact distinct from every prior BA PDF-extraction
finding, most likely a subsetted/custom-encoded font. `node-canvas`
(`/tmp/node_modules/canvas`) rendered the page to PNG at 2.5x scale for
direct visual confirmation, which resolved every field unambiguously: a
five-row applicant-data table (name, residence, mailing address, phone,
e-mail), a addressee/subject block, a fill-in-the-blank body paragraph (no
checkboxes anywhere on this form, unlike the sibling
`ba/mup-rs/lost-or-stolen-travel-document-report@1.0.0`'s two-checkbox
lost/stolen field), a five-item enclosure checklist, and a signature/filing
block. No `getAnnotations()` fields were found — a flat, non-fillable
specimen, matching every other BA schema in this registry so far.

## Document structure

Page 1 (only page): "Podaci o podnosiocu zahtjeva" (applicant-data) table
(name, residence, mailing address, phone, e-mail) plus a "mjesto prijemnog
štambilja" stamp placeholder; the addressee block (Ministarstvo unutrašnjih
poslova Kantona Sarajevo, Uprava administracije, Sektor za administraciju
___ — a blank naming the specific branch office); the subject line and body
paragraph naming the certificate number, the issuing sector, and a
fill-in-the-blank reason ("jer je ista ___", with the parenthetical hint
"izgubljena, otuđena i dr." printed beneath, not a checkbox); a
purpose sentence ("Navedeno tražim u svrhu izdavanja nove potvrde o
registraciji (vozila)" — modelled as fixed process context, not a field,
since it is not a variable the applicant fills in); the five-item enclosure
checklist ("Uz zahtjev prilažem"); and the closing signature/filing block
(place, date, applicant's ID card number).

## Disclosed findings and interpretation choices

1. **`reasonForInvalidity` is modelled as free text, not an enum.** Unlike
   `ba/mup-rs/lost-or-stolen-travel-document-report@1.0.0`'s
   `documentStatus` field (a genuine two-checkbox choice, confirmed by
   rendering), this form's analogous blank is a single answer line with a
   parenthetical hint ("izgubljena, otuđena i dr." — lost, stolen, or
   other) rather than printed checkboxes — confirmed by the same
   `node-canvas` rendering technique. Modelled as free text to match the
   source's own layout rather than fabricating an enum the form does not
   print.
2. **No `applicantType` (individual/legal-entity) field was added**, despite
   enclosure item 5 conditioning a document requirement on "ukoliko je
   podnosilac zahtjeva pravno lice" (if the applicant is a legal entity).
   The form prints no discrete checkbox or blank capturing this
   distinction anywhere (unlike, e.g., `tn/dgi/declaration-of-existence`'s
   own `isLegalEntity` discriminator, which corresponds to a real checkbox
   on that source). Per this registry's standing precedent
   (`notequals-empty-string-absent-field-bug`) against fabricating a field
   or `requiredWhen` gate the source does not itself state, enclosure item
   5 (`legalEntityRepresentationDocuments`) is modelled as unconditionally
   optional instead.
3. **`applicantMailingAddress`, `applicantContactPhone`, and
   `applicantContactEmail` are modelled as optional**, unlike
   `applicantFullName`/`applicantResidence` in the same table. The form
   gives no explicit mandatory/optional marker on any field in this table;
   these three are modelled as supplementary contact channels only,
   consistent with this registry's precedent of not asserting a
   requirement the source does not itself state.
4. **`receivingAdministrationSector` and `issuingAdministrationSector` are
   modelled as two distinct fields** even though both are printed as a
   blank following the identical label text "Sektor za administraciju" —
   one in the addressee header (which MUP KS branch office the applicant
   is filing with) and one in the body paragraph (which branch office
   originally issued the now-invalid certificate). These may hold the same
   value in practice but are two separate blanks on the source and are not
   collapsed into one field.
5. **`filingDate` is modelled as a full ISO date** despite the form
   pre-printing the century/decade of the year ("20__.godine"), leaving
   only the day/month/last-two-digits blank — the same convention this
   registry has applied to every other BA date field so far.
6. **Companion forms MP-7 Obr. br. 3 (invalid ownership certificate),
   MP-7 Obr. br. 4 (invalid registration plates), and MP-10 Obr. br. 3
   (registration-status certificate) are disclosed, not authored** — see
   "Candidate selection" above. Tuzla Canton's own distinct forms set,
   and every other Federation of Bosnia and Herzegovina canton's MUP, remain
   entirely unscreened.
7. **Kyrgyzstan's Passport and National ID verticals are now a confirmed
   dead end**, not merely inconclusive as GOV-4410 had left them — see
   "Candidate selection" above for the Wayback Machine evidence.

## Conformance

2 valid mock scenarios —
`valid-stolen-certificate-with-mailing-address` (exercises all three
optional contact/mailing fields present) and
`valid-lost-certificate-minimal` (exercises their absent case) — plus 9
static-`required`-field mutation fixtures (one per `required: true` field)
and 1 unknown-field-rejected fixture, committed under
`conformance/ba/bih/kanton-sarajevo/mup-ks/lost-or-stolen-vehicle-registration-certificate-report/1.0.0/`.
This form has no conditional (`requiredWhen`) fields to gate — every field's
requiredness is unconditional, and no field was fabricated to exercise a gate
the source itself does not state (see Disclosed Finding 2 above).

An ephemeral, from-scratch conformance checker (deriving required rules
directly from this schema's own `fields[]`, discarded after use, not
committed) ran all 12 fixtures: both valid scenarios at 0 errors, all 9
mutation controls each raising exactly 1 error, and the unknown-field
fixture correctly rejected. Validated clean with `node tools/validate.mjs`
and `node tools/validate-ajv.mjs`, individually and as part of the full
registry run (655/655). `registry-index.json` regenerated via
`npm run build-index` in `tools/govschema-client/`.
