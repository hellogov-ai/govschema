# Verification record — fi/traficom/luovutuskirja-ajoneuvon-omistusoikeuden-siirrosta@1.0.0

## Candidate selection

This session's brief (GOV-2356, child of GOV-2353 "GovSchema Standard
Research") named Traficom's (Liikenne- ja viestintävirasto, the Finnish
Transport and Communications Agency) form B124, "Luovutuskirja
ajoneuvon/vesikulkuneuvon omistusoikeuden siirrosta" (Deed of transfer of
ownership for a vehicle/watercraft), as the pre-scouted DMV candidate.
Finland stood at 4/6 verticals (Visa via
`fi/migri/residence-permit-employed-person`, GOV-2276; Business Formation
via `fi/prh/start-up-notification-y1`, GOV-2292; National ID via
`fi/dvv/registration-of-foreigner`, GOV-2299; Taxes via
`fi/vero/50a-earned-income-and-deductions`, GOV-2308).

DMV had been screened by GOV-2276's parent scouting pass and set aside as
weak: Traficom's core driving-licence and vehicle-registration flows are
Suomi.fi-login-gated or in-person-only (via Ajovarma); the two downloadable
companion forms found at that time were F122 (a doctor's statement on
driving fitness, not applicant-facing) and B527 (a paperless-vehicle
registration notice, too narrow-scope). B124 is a distinct, genuinely
citizen-facing, unauthenticated private-party vehicle/watercraft
title-transfer deed neither prior pass considered — a valid new DMV
candidate rather than a re-attempt of either rejected form.

## Source

- `https://lomakkeet.traficom.fi/B124` — Traficom's own forms subdomain.
- Fetched fresh this session with a plain HTTP GET: **HTTP 200**,
  `Content-Type: application/pdf`, `Content-Disposition: inline;
  filename="Luovutuskirja ajoneuvon vesikulkuneuvon omistusoikeuden
  siirrosta B124.pdf"`, `110,479` bytes, genuine `%PDF-1.7` header (verified
  directly). No login/CAPTCHA/WAF gate of any kind.
- Form footer prints `B124 - 7/2026` on both pages (current edition).

## Extraction technique

`pdfjs-dist` v4 (`legacy/build/pdf.mjs`, installed fresh to a scratch
`/tmp/b124` directory this session) was used per page via
`page.getAnnotations()` (widget rects, field names, `alternativeText`
tooltips, `radioButton` flags, `buttonValue`/export values) and
`page.getTextContent()` (printed labels with x/y coordinates), independently
of any prior scouting pass.

- **Page 1**: exactly 25 `/Widget`-subtype annotations — 23 `Tx` text-field
  widgets plus 2 `Btn` radio-option widgets belonging to a single genuine
  radio-button parent field (`"Radio Button 1"`, `radioButton: true`,
  `buttonValue` `"0"`/`"1"`) — across 24 distinct field names. This matches
  the issue's own pre-authoring scouting count of "24 distinct interactive
  fields — 23 text + 1 radio group" exactly.
- **Page 2**: 0 `/Widget`-subtype annotations. It is a short
  instructions-only page, "Ohjeita ajoneuvon/vesikulkuneuvon myyjälle ja
  ostajalle" ("Instructions for the seller and buyer of a vehicle/
  watercraft"), explaining that the deed can serve as a bill of sale or
  other title document, and that the seller can use it as proof of transfer
  if the buyer neglects the registration notification. Both sentences are
  quoted (translated) in this schema's own top-level `description`.

Every `Tx` widget carries its own `alternativeText` tooltip (e.g. `"Text
Field 10"` → `alternativeText` `"Luovutuksensaaja/ostaja. Sukunimi tai
yrityksen nimi"`), so field identity did not depend solely on generic
`Text Field N` names. However, several `alternativeText` values repeat
verbatim across parallel sections — `"Merkki"`/`"Malli"` appear both for the
vehicle/watercraft identification row and for the separate watercraft-engine
row, and `"Sukunimi tai yrityksen nimi"`/`"Etunimet"`/`"Henkilö-/Y-tunnus"`/
`"Lähiosoite"`/`"Postinumero ja -toimipaikka"` repeat identically across the
buyer (`Luovutuksensaaja/ostaja`) and seller (`Luovuttaja/myyjä`) blocks — so
each widget's y-coordinate was cross-referenced against the page's printed
section headings to disambiguate it into a `buyerX`/`sellerX` or
vehicle-identification-vs-`watercraftEngineX` field name, following this
registry's established convention for repeated label pairs across parallel
sections (e.g. `dk/cpr`'s `entrantN`/`childN` precedent).

One piece of printed text on the vehicle/watercraft identification row,
"Järj.nro (käsittelijä täyttää ajoneuvosta)" ("Case number, filled in by
the processing official for the vehicle"), carries **no corresponding
`/Widget` annotation at all** — confirmed by its absence from the
`getAnnotations()` output for that page. It is office-use-only text, not an
applicant-facing field, and is excluded from `fields[]` entirely. This is
distinct from this registry's usual signature-line-with-no-widget pattern:
here it is simply a plain, non-fillable printed label with nothing behind
it.

## Field structure: 24 fields, no merging or splitting

All 24 widget-groups (23 `Tx` + 1 `Btn` radio parent) were modelled 1:1 into
`fields[]`, with no merging or splitting.

## Disclosed modelling decisions

1. **The four watercraft-engine fields (`watercraftEngineMake`,
   `watercraftEngineModel`, `watercraftEngineSerialNumber`,
   `watercraftEnginePower`) are left ungated by any `Condition`, and modelled
   `required: false`.** The form provides no boolean or enum field
   distinguishing "this transfer is a vehicle" from "this transfer is a
   watercraft" for a `requiredWhen`/`visibleWhen` to reference — only the
   printed section heading `"Vesikulkuneuvon moottori"` ("Watercraft's
   engine") scopes them. Matching this registry's existing precedent for an
   unrepresentable scoping constraint (e.g. `fi/dvv`'s `maritalStatus`,
   `fi/migri`'s OLE_TY1 §8), the restriction is disclosed in each field's own
   `description` rather than encoded structurally.
2. **`buyerFirstNames` and `sellerFirstNames` are likewise left
   `required: false`,** disclosed as applying only when the transferee/
   transferor is an individual rather than a company, since the source's
   `"Sukunimi tai yrityksen nimi"` ("Surname or company name") field
   (`buyerName`/`sellerName`) is a single shared field for either case with
   no boolean flag to gate on.
3. **`sellerSignatureAndNameClarification` and
   `buyerSignatureAndNameClarification` ARE genuine `Tx` text-field widgets**
   on this specimen, confirmed directly in the `getAnnotations()` output —
   unlike this registry's `dk/cpr`, `fi/migri`, and `fi/dvv` precedent, where
   the printed signature line carries no fillable widget at all and is
   instead modelled as a `documents[]` attestation entry. Both are therefore
   modelled as ordinary `required: true` string fields in `fields[]`, with no
   corresponding `documents[]` entry. This is flagged here as a genuine
   cross-jurisdiction/cross-form difference in how a signature line is
   realized on the underlying AcroForm, not an inconsistency introduced by
   this schema.
4. **`sellerIdNumber`'s `sourceRef` preserves a typo present on the form
   itself** (`alternativeText` reads `"Hnekilö-tunnus/Y-tunnus"`, i.e.
   `Hnekilö` rather than `Henkilö`) — quoted verbatim for source fidelity,
   with the field's own `label` using the correct spelling.
5. **No `crossFieldValidation` rules were added.** Unlike this registry's
   typical date-range pairs, this form has only a single combined free-text
   `transferPlaceAndDate` field ("Paikka ja luovutuspäivämäärä" — place and
   date of transfer together), with no second date on the form to compare
   it against.
6. **No `documents[]` array.** The deed is self-contained: it identifies
   both parties, the vehicle/watercraft, the agreed terms, and carries both
   parties' own signature fields directly in `fields[]`. Page 2's
   instructions describe how the completed deed itself is used as evidence
   elsewhere (e.g. attached to the buyer's separate registration
   notification), not a checklist of documents to attach to this form.

## Mock conformance test run

Two scenarios were built under
`conformance/fi/traficom/luovutuskirja-ajoneuvon-omistusoikeuden-siirrosta/1.0.0/`
and checked against this schema's `required`/`requiredWhen`/`validation`
grammar with a disposable checker script (`/tmp/b124/check_conformance.mjs`,
not committed):

- **`bill-of-sale-minimal-required-only.json`**: a private-party car sale
  using the `bill_of_sale` document-type option, no "other" specification,
  no watercraft-engine fields, no optional agreed-terms text, no first
  names for either party (a company-to-company edge of the optional
  first-name fields is not exercised here; both parties are named
  individuals but first names are simply omitted to exercise the fields'
  `required: false` path). **16 fields collected, 8 correctly
  not-applicable/omitted, 0 errors.**
- **`other-deed-watercraft-full-coverage.json`**: a watercraft sale using
  the `other` document-type option with its own free-text specification,
  both parties' first names populated, the full watercraft-engine block
  filled in, and populated agreed-terms/other-information text. **24
  fields collected, 0 errors.**
- **Two mutation/negative controls**, each derived from the minimal scenario
  with exactly one defect introduced:
  1. removing required `registrationNumber` → `missing-required`.
  2. setting `documentType` to `"other"` while leaving
     `otherDocumentTypeSpecify` blank → `missing-required` (the now-
     `requiredWhen`-triggered field).

  Both were correctly and individually flagged, confirming the checker
  discriminates rather than trivially passing every input.

The schema was validated against the GovSchema v0.3 meta-schema with `node
tools/validate-ajv.mjs` and `node tools/validate.mjs`, individually and as
part of the full registry run.

## Scope and jurisdiction notes

This document closes Finland's DMV vertical. Finland now stands at 5 of its
6 verticals (Visa, Business Formation, National ID, Taxes, DMV); Passport
remains a confirmed dead end (Finland eliminated paper passport
applications in 2006 — no downloadable application form exists), so no
vertical remains genuinely open for Finland. This schema describes the form
only; it does not submit anything on either party's behalf, and does not
imply Finnish government endorsement. GovSchema is independent and is not
affiliated with, endorsed by, or operated by the Republic of Finland or
Traficom.
