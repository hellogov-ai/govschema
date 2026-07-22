# Verification record — jm/mfaft/visa-application@1.0.0

## Candidate selection

GOV-4390 ("GovSchema Standard Research"), authored per the GOV-4360 cycle's
own banked Jamaica backlog entry (see CATALOG.md's Known Gaps entry 0f),
most recently re-scouted (but not authored) by the GOV-4376 cycle. Closes
the last open Jamaican vertical of the six originally scouted: Business
Formation (`jm/orc`), Passport (`jm/pica`), and DMV (`jm/taj`) were
authored in prior cycles, Taxes (`jm/taj/individual-income-tax-return`) is
authored and pending merge, and National ID is a confirmed dead end
(the GOV-4360 cycle's own screening).

## Reaching the live source

Target: `https://embwashington.mfaft.gov.jm/pdf/Visa-Application-Form.pdf`.

- Independently re-fetched and re-hashed rather than trusted from the
  GOV-4376 cycle's own report alone: HTTP 200, `Content-Type:
  application/pdf`, 525,611 bytes (byte-for-byte match with the GOV-4376
  cycle's own reported size), `Last-Modified: Fri, 07 Nov 2025`.
- sha256 of the retrieved bytes:
  `b89d32efbf3f1ac3698704b47981a856e93700107eba4e14675f541c23627fa4`.
- No login/CAPTCHA/WAF gate; a plain unauthenticated `curl` with a
  realistic desktop User-Agent reached it cleanly.
- The originally-banked `embassyofjamaica.org` host (recorded in the
  GOV-4360 cycle's own note) now redirects to this current
  `embwashington.mfaft.gov.jm` domain, the embassy's current one.

## Extraction method

`pdfjs-dist` (vendored at `/tmp/node_modules/pdfjs-dist`) `getAnnotations()`
confirmed zero `/Widget` annotations on the document's single page — a
genuine flat specimen, not a fillable form. `getTextContent()` then read
every text item's raw string and its `transform` x/y position to
reconstruct line-by-line layout; the document's own character set carries
no checkbox/radio glyph anywhere (confirmed by enumerating every distinct
Unicode code point present across the page), so every field on this form
is a ruled fill-in-the-blank line, not a tick-one-of-many selection.

## Document structure

A single page: a consular-post office-stamp box (top, excluded); the
"FORM J / VISA APPLICATION" heading; 17 numbered items (1-17) covering the
applicant's particulars, travel history, address, marital status,
purpose/duration of visit, passport particulars, and a prior/return visa
line; an unheaded "References in Jamaica" block with two side-by-side
reference slots; a signature/date line; and a "FOR OFFICIAL USE ONLY"
strip at the very bottom (excluded, consular-staff-completed).

## Disclosed findings and interpretation choices

1. **`sex` (item 4) is modelled as a required enum (`MALE`, `FEMALE`)
   despite the source printing a plain blank ("Sex.............") with no
   option list at all** — the same no-printed-option-list convention this
   registry's `mx/ine/credencial-para-votar-application` already applies
   to its own analogous blank "Sexo" field, since no other value appears
   anywhere else on this form.
2. **`maritalStatus` (item 9) is modelled as a required enum with exactly
   the three values the source itself prints in parentheses** — "Marital
   Status (Married, Single, Divorced)" — rather than a free-text field,
   since the form explicitly enumerates the intended answer set even
   though the entry itself is a blank line, not a tick-box.
3. **Item 5 ("Arrived in ... on ... coming from ...") is modelled as three
   independent, unconditionally optional fields (`arrivalLocation`,
   `arrivalDate`, `arrivalOrigin`)**, since the item's meaning (most
   plausibly: the applicant's most recent arrival at their current,
   non-Jamaican location, relevant to a consular post processing an
   application from someone already abroad) is not explained anywhere on
   the form, and not every applicant necessarily has a prior arrival to
   report (e.g. someone applying from their own country of residence).
   Disclosed rather than fabricating a firmer interpretation.
4. **Item 6 ("Name(s), date(s) and place(s) of birth of minor child(ren)
   accompanying you") is modelled as two independent, unconditionally
   optional combined free-text fields (`accompanyingChild1Details`,
   `accompanyingChild2Details`)**, one per the two ruled blank lines the
   source prints beneath the header — matching this registry's
   established convention for an unlabelled repeatable block (e.g.
   `bw/dic/visa-application`'s own `reference1Details`/`reference2Details`,
   `pa/migracion/tourist-visa-application`'s own
   `relative1NameRelationAddress`/`relative2NameRelationAddress`), since
   the header covers all three attributes (name, date, place of birth)
   without any further column sub-division.
5. **`telephoneNumber` (item 7) is modelled as optional, while
   `presentAddress` on the same numbered item is modelled required.** The
   item prints both on one line ("Present Address... Telephone No...")
   with no distinguishing marker between them, but a present address is
   core identifying information for any visa applicant while a telephone
   number is ordinary optional contact information, the same disclosed
   judgment call this registry's Botswana/Zambia consular forms apply to
   comparable unmarked contact-detail pairs.
6. **`permanentAddress` (item 8) is modelled optional**, per the source's
   own qualifier "(if different from above)" — the field is only
   completed when it differs from the required `presentAddress` (item 7),
   the same qualifier-anchored-to-the-conditional-field convention this
   registry's `jm/taj/individual-income-tax-return` (Finding 4) already
   applies to its own analogous Home/Business Mailing Address pair.
7. **Item 11 ("Date(s) of previous visit(s) to Jamaica and address(es) at
   which stayed") is modelled as a single, unconditionally optional
   combined free-text field (`previousVisitDetails`)**, since the source
   prints only one ruled blank line beneath the header (confirmed via
   each text item's own y-coordinate), not a repeatable block — not every
   applicant has previously visited Jamaica.
8. **`meansOfDisposalForVisit` (item 15) is modelled as a single required
   free-text field**, transcribing the source's own literal (if awkwardly
   phrased) caption "Means of Applicant's disposal for visit" without
   attempting to normalize or reinterpret its wording.
9. **Item 17 ("Return visa to ... valid until ...") is modelled as two
   independent, unconditionally optional fields (`returnVisaDestination`,
   `returnVisaValidUntil`)**, since neither the source's own wording nor
   any other item on the form clarifies whether this refers to a distinct
   return-trip visa request or something else — not every first-time
   applicant will have an answer for it, and the item carries no explicit
   conditional marker either way. Disclosed rather than fabricated.
10. **"References in Jamaica" (two side-by-side slots, each with its own
    printed "Name"/"Address" sub-labels) is modelled as four independent,
    unconditionally optional free-text fields** (`reference1Name`,
    `reference1Address`, `reference2Name`, `reference2Address`) — each
    address collapses the block's own multiple ruled continuation lines
    (confirmed via y-coordinate: three stacked lines per reference) into
    one generously-sized field, the same multi-line-collapse convention
    this registry's AcroForm passport schemas (e.g.
    `jm/pica/passport-application` Finding 4) already use for stacked
    same-label widgets. Both references are modelled optional since the
    source prints no marker distinguishing either as mandatory, the same
    disclosed judgment call `bw/dic/visa-application` Finding 4 applies to
    its own analogous reference block.
11. **Excluded as office/consular-staff-completed, not applicant-supplied
    data:** the top-of-page office-stamp box ("Consular Post or High
    Commissioner's Office (to affix office stamp here)") and the bottom
    "FOR OFFICIAL USE ONLY" / "DATE" / "REMARKS" strip.

## Conformance

3 valid mock scenarios — `valid-tourist-first-time-applicant` (a
first-time tourist applicant with no accompanying children, no prior
Jamaica visits, and both references supplied); `valid-business-applicant-
with-prior-visit` (a business-purpose applicant declaring a prior visit to
Jamaica and a different permanent address from their present one); and
`valid-family-visit-with-accompanying-children` (an applicant travelling
with two minor children, requesting a return visa) — plus 12
mutation-control fixtures (one missing statically-required field from each
of `surname`, `firstNames`, `nationalityPresent`, `dateOfBirth`,
`placeOfBirth`, `sex`, `presentAddress`, `maritalStatus`,
`destinationInJamaica`, `occupation`, `passportNumber`,
`applicantSignature`) and one unknown-field-rejected fixture, committed
under `conformance/jm/mfaft/visa-application/1.0.0/`.

An ephemeral, from-scratch conformance checker (deriving required rules
directly from this schema's own `fields[]`, discarded after use, not
committed) ran all 16 fixtures: all 3 valid scenarios at 0 errors, all 12
mutation controls each raising exactly 1 error, and the unknown-field
fixture correctly rejected. Validated clean with `node tools/validate.mjs`
and `node tools/validate-ajv.mjs`, individually and as part of the full
registry run. `registry-index.json` regenerated via `npm run build-index`
in `tools/govschema-client/`.
