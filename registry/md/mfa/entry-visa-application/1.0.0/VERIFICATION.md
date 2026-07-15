# Verification record — `md/mfa/entry-visa-application` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-15`

## Why this schema and why now (GOV-3181)

GOV-3181 is a disclosed backlog candidate delegated from the GOV-3157/
GOV-3152 "GovSchema Standard Research" cycle (2026-07-15), which
independently scouted Moldova's still-open Visa vertical and left this MFA
entry-visa candidate pre-scouted and confirmed strong/live. This document
opens Moldova's Visa vertical (2nd of 6, after DMV via
`md/asp/vehicle-registration`, GOV-3157).

## Source

- **URL:** `https://mfa.gov.md/sites/default/files/visa-application-form_0.pdf`
- **Corroborated via:** an identical mirror hosted by the Moldovan
  consulate in Iași, Romania, per the original GOV-3157 scouting note.
- **Retrieved:** 2026-07-15, HTTP 200, `content-type: application/pdf`,
  53,469 bytes, fetched directly with `curl` — no login/CAPTCHA/WAF gate
  encountered at any point on `mfa.gov.md`.
- **sha256:** `380ba14e0eeb2a005a71783261a7a12c4ff01b4899fbdd4e7e499f2d543d2c03`
- Genuine `%PDF-1.5` header (confirmed via direct byte inspection of the
  first bytes read into a Node `Buffer`).

## Extraction method — native text layer, no AcroForm

- `pdfjs-dist@3.11.174`'s `getDocument()` reports **3 pages**.
- `getTextContent()` returned a genuine, fully extractable text layer on
  every page (277 / 132 / 29 text items respectively) — not a scanned
  image.
- `page.getAnnotations()` returned **zero widgets** on every page — a flat,
  non-fillable print-and-fill specimen, the same convention already
  established for this jurisdiction's other schema
  (`md/asp/vehicle-registration`, albeit that one was a genuine scanned
  raster rather than a native text layer).
- Every field, checkbox label, and option set was read from the
  coordinate-sorted text extraction (each text run's `transform[4]`/
  `transform[5]` x/y position), reconstructing row/column structure
  directly from the source's own printed item numbers (1-33). A
  `node-canvas` box-grid render of pages 2-3 at 2.5x scale was additionally
  used to confirm row/column boundaries, since this sandbox's `pdfjs-dist`
  + `node-canvas` combination could not resolve glyph paths for actual text
  rendering (missing standard font data) — the render was used for
  structural confirmation of box positions only, cross-referenced against
  the text extraction's own y-coordinates, not as a substitute for it.

## Not a duplicate of this registry's EU-Annex-I-style visa siblings

This form's field sequence and much of its printed wording is near-identical
to the EU-harmonised ("Schengen", Annex I) uniform short-stay visa
application template already represented in this registry by
`at/bmeia/schengen-visa-application`, `gr/mfa/application-for-schengen-visa`,
`es/maec/solicitud-visado-nacional`, and `il/mfa/entry-visa-application`,
among others — unsurprising, since Moldova's own national consular visa
form appears to directly reuse the EU template's structure despite Moldova
not being a Schengen or EU member state. A field-by-field comparison found
genuine, substantive differences disqualifying it as a duplicate:

1. **Single-country visa, no multi-state fields.** Unlike every Schengen
   sibling, this form has no "Member State(s) of destination" or "Member
   State of first entry" field — items run directly from 21 (main purpose
   of journey) to 22 (number of entries requested), confirmed by the
   coordinate extraction showing no such fields between them.
2. **12-month, not 3-year, prior-visa lookback**, framed entirely around
   "the Republic of Moldova" rather than "the Schengen area" (item 24).
3. **No asterisked EU/EEA/CH-family-member exemption footnote anywhere**
   (confirmed absent by a full-text scan of all 3 pages for the `*`
   character) — unlike `at/bmeia/schengen-visa-application`'s items 19/20/
   31/32/33, which are exempted for such family members under a printed
   footnote this specimen does not carry. Item 31's family-member section
   is instead framed around relatives who are themselves "citizen[s] of
   the Republic of Moldova" — a genuinely different eligibility population,
   not a cosmetic relabelling of the EU/EEA/CH clause.
4. **Moldova-specific data-system and authority names** in the closing
   declaration: the "SIA \"Consul\"" system (not the EU's VIS) and the
   Ministry of the Interior Affairs of the Republic of Moldova as the named
   responsible authority.
5. **A genuine two-signature structure** (see below), not present on any of
   this registry's other EU-Annex-I-style siblings reviewed so far.

## The two "Place and date" / "Signature" blocks — disclosed, both modelled

The source's own numbered item 32 ("Place and date") and item 33
("Signature (for minors, signature of parental authority/legal guardian)")
form the closing row of the main tabular data-entry section, immediately
after the item-31 family-member block, with **no declarative text printed
alongside it**. Independently, after several paragraphs of closing
declaration text spanning the remainder of page 2 and all of page 3 (visa-
fee non-refundability; the travel-medical-insurance requirement for
multiple-entry applicants; consent to data/photograph/fingerprint
collection and processing under the SIA "Consul" system for up to five
years; a data-subject-rights notice; an accuracy-of-particulars
declaration; and an undertaking to leave Moldovan territory before visa
expiry), the source prints a **second, unnumbered** "Place and date" /
"Signature (for minors, signature of parental authority/legal guardian)"
row.

This was confirmed a genuine two-step sign-off, not a duplicate-content-
stream rendering artifact:

- The surrounding text differs completely between the two occurrences —
  the first sits directly below the family-member checkboxes with nothing
  else printed nearby; the second sits at the very end of an entirely
  distinct, multi-paragraph legal declaration.
- A `node-canvas` box-grid render of page 3 shows one large bordered text
  block (the declaration paragraphs) followed by a single separately-
  bordered two-column row (place | signature) — a single, unambiguous box,
  not a rendering duplicate of the page-2 row.
- Computing each block's image-space position from its PDF y-coordinate
  (`(841.92 - y) * 2.5` at the render's 2.5x scale) placed the first block
  at the closing edge of the main data-entry box on page 2, and the second
  at the closing edge of the declaration-text box on page 3 — consistent
  with two structurally distinct rows, not one row rendered twice.

Modelled as `signaturePlace`/`signatureDate` (item 32, paired with the
`applicationSignature` documents[] entry) and `declarationPlace`/
`declarationDate` (the unnumbered block, paired with the
`closingDeclaration` documents[] entry).

## Requiredness judgment calls

The source carries **no asterisk, bolding, or other printed required/
optional convention anywhere** on any of its 3 pages (confirmed by a
full-text scan for `*`). In its absence:

- Core identity, travel-document, contact-address/phone, occupation,
  employer, purpose-of-journey, entries-requested, duration, prior-visa/
  fingerprint-history, arrival/departure-date, primary host (item 28), and
  both signature-block fields are modelled **required**.
- Minors'-guardian details, national identity number (itself printed
  "where applicable"), applicant e-mail address, inviting-party telephone/
  telefax, the entire inviting-company block (item 29), all travel-funding
  checkboxes and means-of-support checkboxes (item 30), and the entire
  item-31 Moldovan-relative block are modelled **optional**, since each
  applies only to a subset of applicants.
- Unlike `at/bmeia/schengen-visa-application`'s asterisked items 19/20/31/
  32/33 (occupation, employer, host, inviting-company, and funding —
  exempted there only for EU/EEA/CH family members under a printed
  footnote this Moldovan specimen does not carry), `currentOccupation` and
  `employerOrEducationalEstablishmentDetails` are modelled **required**
  here, since no equivalent exemption is printed on this form.

## The unresolved `(x)` marker (items 1-3)

Items 1-3 (surname, surname at birth, first names) each carry a printed
`(x)` marker. No further explanatory footnote text was recoverable
anywhere in this 3-page specimen (unlike `at/bmeia/schengen-visa-
application`'s fuller EU template, which explains the equivalent marker
elsewhere as "in accordance with the data in the travel document").
Disclosed here as an unresolved marker rather than assumed to carry the
same meaning the cognate EU form states explicitly, though that is the
plausible reading given the shared template lineage.

## Out of scope — office-processing box (page 1)

The "For official use only" box on page 1 (date of application, visa
application number, lodging channel, file handler, a supporting-documents-
received checklist, the visa decision itself, category A/C/LTV, validity
dates, and a second, office-facing "number of entries"/"number of days"
pair distinct from the applicant-facing items 22/23) is entirely
consular-staff-completed data, not applicant-supplied — excluded, the same
convention this registry applies to other jurisdictions' clerk-only
intake/decision sections (e.g. `il/mfa/entry-visa-application`'s "for
office use" box).

## Conformance

An ephemeral, from-scratch conformance checker (deriving required/
requiredWhen/enum/date-format rules directly from this schema's own
`fields[]`/`documents[]`, discarded after use, not committed) ran the
following fixtures in `conformance/md/mfa/entry-visa-application/1.0.0/`:

- `valid-self-funded-tourist.json` (single-entry tourist, self-funded, no
  prior Moldovan visa or fingerprints on file) — **0 errors**.
- `valid-business-traveller-with-moldovan-spouse.json` (multiple-entry
  business traveller invited by a Moldovan company, prior visa and
  fingerprints on file, Moldovan-citizen spouse recorded under item 31) —
  **0 errors**.
- `mutation-control-missing-required-field-surname.json` (drops `surname`)
  — **exactly 1 error**.
- `mutation-control-missing-marital-status-other-description.json` (sets
  `maritalStatus` to `other`, drops `maritalStatusOtherDescription`) —
  **exactly 1 error**.
- `mutation-control-missing-travel-document-type-other-description.json`
  (sets `travelDocumentType` to `other`, drops
  `travelDocumentTypeOtherDescription`) — **exactly 1 error**.
- `mutation-control-missing-main-purpose-of-journey-other-description.json`
  (sets `mainPurposeOfJourney` to `other`, drops
  `mainPurposeOfJourneyOtherDescription`) — **exactly 1 error**.
- `mutation-control-missing-declaration-date.json` (drops `declarationDate`,
  the second/closing signature block) — **exactly 1 error**.
- `mutation-control-invalid-enum-sex.json` (sets `sex` to `unspecified`) —
  **exactly 1 error**.
- `mutation-control-invalid-date-format-date-of-birth.json` (sets
  `dateOfBirth` to `12/03/1990`, not ISO `YYYY-MM-DD`) — **exactly 1
  error**.

## Structural validation

- `node tools/validate.mjs` and `node tools/validate-ajv.mjs` (ajv 2020-12
  against `spec/v0.3`) both pass on the full registry after adding this
  document: **482/482**.
- `node tools/verify-sources.mjs registry/md/mfa/entry-visa-application/1.0.0`
  — 1 directory, 3 URLs checked, 0 warnings, 0 allowlisted, all clear.
- `npm run build-index` re-run in `tools/govschema-client/` to regenerate
  `registry-index.json` with this document included (482 entries).

## Maturity

`structural-reference`: the source form's own printed field labels and
numbering are fully transcribed from the genuine, currently-served
official PDF via its own native text layer, but no live filing through any
Moldovan consular channel was attempted. GovSchema is an independent,
non-profit standards body and is not affiliated with, endorsed by, or
operated by the Government of the Republic of Moldova, the Ministry of
Foreign Affairs and European Integration, or any Moldovan embassy or
consulate.
