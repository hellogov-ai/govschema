# Verification record — jm/taj/driving-licence-application@1.0.0

## Candidate selection

GOV-4376 ("GovSchema Standard Research"), authored per the GOV-4360 cycle's
own banked Jamaica DMV backlog entry (see CATALOG.md's Known Gaps entry 0f).
That cycle scouted Jamaica as a brand-new jurisdiction, opened it via
Business Formation, and banked three further STRONG candidates — DMV
(Tax Administration Jamaica's Form F1/F3), Visa (the Jamaican Embassy in
Washington DC's Form J), and Taxes (Tax Administration Jamaica's Form IT01,
"Return of Income — Individuals") — plus a confirmed National ID dead end.
`jm/pica/passport-application` (GOV-4367) subsequently consumed Passport,
leaving DMV, Visa, and Taxes open. This cycle re-fetched all three:

- **DMV (this form)** — genuine interactive AcroForm, 18 named widgets (15
  data-bearing text fields + 3 non-data buttons), 100,795 bytes. Chosen for
  tractability: the only one of the three with a machine-fillable field
  layer, so field extraction is mechanical (`getAnnotations()`) rather than
  requiring manual layout reconstruction from flat text.
- **Taxes (Form IT01)** — re-fetched at `jamaicatax.gov.jm/documents/10194/
  18228/it01.pdf`, 174,411 bytes (byte-for-byte match with the banked
  ~174KB estimate), but zero AcroForm widgets: a flat, 56-line-item annual
  income tax return spanning 2 form pages plus 3 pages of notes. STRONG and
  still open, banked backlog for a future cycle with a larger authoring
  budget.
- **Visa (Form J)** — the `embassyofjamaica.org` host from the banked note
  now redirects to `embwashington.mfaft.gov.jm`, the embassy's current
  domain; re-fetched at `embwashington.mfaft.gov.jm/pdf/Visa-Application-
  Form.pdf`, 525,611 bytes (a large jump from the banked ~94KB estimate,
  consistent with a re-published/re-scanned specimen since that note was
  recorded), zero AcroForm widgets, single page, ~17 numbered items — text
  extracts cleanly. STRONG and still open, banked backlog for a future
  cycle.

Opens Jamaica's DMV vertical (3 of 6, after Business Formation and
Passport); Visa and Taxes remain open, STRONG banked backlog; National ID
remains a confirmed dead end.

## Reaching the live source

Target: `https://www.jamaicatax.gov.jm/documents/10194/18658/form+f1+f3.pdf`.

- Re-located this cycle by independently re-crawling `jamaicatax.gov.jm`'s
  own `/web/guest/motor-vehicle-driver-s-licence1` forms page (the banked
  GOV-4360 note recorded only the host, not the exact document path) —
  landed on the same `documents/10194/18658/form+f1+f3.pdf` asset the
  banked note described.
- Independently re-fetched and re-hashed: HTTP 200, `Content-Type:
  application/pdf`, 100,795 bytes (matching the banked cycle's own ~100KB
  estimate almost exactly).
- sha256 of the retrieved bytes:
  `3a496534894c00668381d554ad4a780914c8633cbb26e035356e0beaefd7f7d5`.
- The source is served directly by Tax Administration Jamaica's own
  `jamaicatax.gov.jm` domain, unauthenticated. `authority.url` points to
  the department's own home page (`https://www.jamaicatax.gov.jm`,
  confirmed reachable, HTTP 200).

## Extraction method

`pdfjs-dist` (vendored at `/tmp/node_modules/pdfjs-dist`) `getAnnotations()`
enumerated the PDF's own `/Widget` AcroForm fields directly, page by page —
a genuine interactive form, not a flat specimen. Found 18 named widgets, all
on page 1 (Form F1): 3 non-data push-buttons (`SAVE`/`PRINT`/`RESET`,
form-embedded JavaScript controls, excluded) and 15 data-bearing text
fields, matching the GOV-4360 cycle's own "~15-20 fields" estimate almost
exactly. Page 2 (Form F3, "Certificate of Character") carries zero widgets —
confirmed mechanically via the same enumeration, not merely by visual
inspection.

Widget rects (`[x0, y0, x1, y1]`) were cross-referenced against
`getTextContent()`'s own per-glyph y-coordinates to attach each widget to
its nearest printed label — every one of the 15 data widgets lines up with
exactly one of the form's own lettered items (a) through (l). Both pages
were then rendered to PNG via `pdfjs-dist` + `node-canvas` at 2.5x scale to
visually confirm: the stacked, unwidgeted "Private Driver's Licence / Motor
Cycle Driver's Licence" either/or choice; the two separate unwidgeted
"Signature of Applicant" lines plus the "Declared to before me" witness
line; and the exact source spelling of Form F3's own attestation text
(including its own apparent typo, "opposited" for "opposite" — confirmed
present in the rendered image, not a text-extraction artifact).

Models 16 `fields[]` across 3 steps (Declaration to the Licensing
Authority; Personal Particulars; Driver's Licence History) — 15 backed by a
named AcroForm widget, plus one printed-but-unwidgeted licence-type choice
(Finding 1) — and 4 `documents[]` entries.

Excludes Form F1's own "For Departmental use only"/"Licence No .../Issued"/
"REMARKS" block (staff-completed, not applicant-supplied) and both of its
own unwidgeted signature/witness lines (Finding 2). Excludes Form F3 in its
entirety as a third-party attestation — every one of its data points (the
certifying Justice of the Peace's or police officer's own name, parish,
certification, and signature) is supplied by the certifying official, not
the applicant, structurally analogous to the medical-examiner and
driving-test-examiner blocks this registry's own
`ug/mowt/driving-licence-application` and `bw/drts/driving-licence-application`
schemas already exclude for the same reason.

## Disclosed source-fidelity findings

1. **`licenceTypeSought` reconstructed from a printed either/or choice with
   no backing AcroForm widget.** Form F1's own declaration sentence reads
   "I ______ do hereby apply that a [Private Driver's Licence / Motor
   Cycle Driver's Licence] be granted to me", with the two licence types
   printed one above the other, separated by a horizontal rule (a
   strike-one-out presentation), confirmed visually via the rendered
   page-1 PNG. Unlike the form's 15 other data points, no widget of any
   kind (text, checkbox, or radio) backs this choice — none of the 18
   enumerated widgets falls in this region. Modelled as a required enum
   (`PRIVATE_DRIVERS_LICENCE`/`MOTOR_CYCLE_DRIVERS_LICENCE`) since the
   underlying data point is genuinely required to process the
   application, rather than silently omitting a load-bearing field the
   source's own widget layer happens to omit.

2. **`signedApplicationForm` collapses four unwidgeted lines into one
   document, not four fields.** Form F1 prints two separate "Signature of
   Applicant" lines (one directly under the opening declaration, one at
   the foot of the page following item (l)) and a "Declared to before me
   this ___ day of ___ 20___; J.P. or Member of Licensing Authority"
   witness line in between — none backed by a widget, all modelled as
   part of the single `signedApplicationForm` document, the same
   treatment this registry's own `jm/pica/passport-application` gives to
   its own multiple unwidgeted signature lines (see that schema's own
   verification.notes Finding 7).

3. **`refusalDate` modelled as a free-text string, not a `date`.** Item
   (i)'s own printed label — "If so, by what Licensing Authority or
   Authorities, and on what date or dates?" — explicitly contemplates
   plural dates across possibly-plural authorities sharing a single blank
   line; a single ISO `date` value cannot represent that, so the field is
   modelled as a string, consistent with `refusalAuthority` on the same
   line.

4. **Form F3's own attestation text is quoted with the source's own
   spelling, including an apparent typo ("opposited" for "opposite").**
   Confirmed via the rendered page-2 PNG at 2.5x scale, not merely the raw
   text-extraction stream, that the source itself prints "...has been
   known to me personally during the period stated opposited to my
   name..." — genuinely present in the government specimen, not a
   `pdfjs-dist` extraction artifact.

## Conformance

3 valid mock scenarios (a first-time private-licence applicant with a clean
history; a motor-cycle-licence applicant with a prior licence issued
elsewhere and no adverse history; an applicant with a prior refusal and a
prior suspension, both with authority/date/tribunal detail supplied) plus
12 mutation-control fixtures (a missing statically-required field for each
of `applicantFullName`, `licenceTypeSought`, `surname`,
`christianNameInFull`, `placeOfResidence`, `ageNextBirthday`, `dateOfBirth`,
`placeOfBirth`, `priorLicenceIssued`, `licenceRefused`,
`licenceSuspendedRevokedOrEndorsed`, and `literateInEnglish`; an invalid
`licenceTypeSought` enum value; two missing conditionally-required fields —
`priorLicensingAuthority` when `priorLicenceIssued` is true, and
`refusalAuthority` when `licenceRefused` is true; and an unknown top-level
field) are committed under
`conformance/jm/taj/driving-licence-application/1.0.0/`.

An ephemeral, from-scratch conformance checker (deriving required and
`requiredWhen` rules directly from this schema's own `fields[]`, discarded
after use, not committed) ran all fixtures: all 3 valid scenarios at 0
errors, all mutation controls each raising exactly 1 error.

Validated clean with `node tools/validate.mjs`, individually and as part
of the full registry run. `registry-index.json` regenerated via
`npm run build-index` in `tools/govschema-client/`.
