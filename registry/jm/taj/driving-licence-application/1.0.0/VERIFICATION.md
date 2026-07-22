# Verification record — jm/taj/driving-licence-application@1.0.0

## Candidate selection

GOV-4376 ("GovSchema Standard Research"), a child of the recurring research
routine. Re-verified rather than trusted from the GOV-4360 cycle's own
banked report alone: Jamaica's three remaining disclosed-STRONG backlog
verticals (DMV via this form; Visa via the Embassy of Jamaica's "Visa
Application Form J"; Taxes via TAJ's Form IT01) were each freshly re-fetched
this cycle. All three remain live, unauthenticated static PDFs (HTTP 200, no
login/JS-portal gate):

- Visa — `https://www.embassyofjamaica.org/visitors/visa_application_form.pdf`,
  93,958 bytes, flat/non-AcroForm, 1 page, 16 numbered items, exactly
  matching the banked ~94KB/~16-field estimate.
- Taxes (IT01) — `https://www.jamaicatax.gov.jm/documents/10181/123967/it01.pdf/bd010927-29a5-48dc-afea-cf4ef85d3077`,
  174,411 bytes, flat/non-AcroForm, 5 pages, dozens of line items, matching
  the banked ~174KB estimate.
- DMV (this form) — see below.

All three were confirmed viable, but this form was chosen as the most
tractable: unlike the flat Visa and IT01 specimens (which require inferring
field boundaries from printed ellipsis/dash fill-lines), this is a genuine
fillable AcroForm with named, individually typed widgets — the same
"cleanest source" criterion the GOV-4367 cycle applied when it chose PICA's
passport AcroForm over Jamaica's other candidates. Its own field count (15
real content widgets on a single fillable page) is comparably small to the
Visa form's 16 while carrying materially lower per-field interpretive risk.

Jamaica now stands at 3 of 6 verticals (Business Formation, Passport, DMV);
Visa and Taxes remain open, STRONG banked backlog (National ID is a
confirmed dead end per the GOV-4360 cycle's own screening).

## Reaching the live source

- `https://www.jamaicatax.gov.jm/documents/10194/18658/form+f1+f3.pdf/141fb4ab-46c1-4e79-b615-c16be3fecb8a`,
  linked from the live, unauthenticated
  `https://www.jamaicatax.gov.jm/motor-vehicle-driver-s-licence1` page as
  "Form F1 & F3 - Application for Driver's Licence (Private & Motor Cycle
  Driver's Licence)" (exact anchor text, confirmed by grepping the page's
  own raw fetched HTML) under its own "Who applies: This form is to used by
  all persons applying for new private or motor cycle driver's licence."
  caption (exact quote, also grepped from the raw fetched HTML — note the
  source's own typo, "to used", reproduced verbatim here as a direct
  quote).
- HTTP 200, `Content-Type: application/pdf`, 100,795 bytes (byte-for-byte
  match with the GOV-4360 cycle's own reported ~100KB estimate).
- sha256 `3a496534894c00668381d554ad4a780914c8633cbb26e035356e0beaefd7f7d5`.
- Cross-checked the administering authority via
  `https://jis.gov.jm/information/get-the-facts/how-to-obtain-a-drivers-licence/`
  (Jamaica Information Service): the applicant submits Form F1/F3 and
  photographs to a TAJ collectorate, while the Island Traffic Authority
  (ITA, under the Ministry of Transport and Mining) separately administers
  the practical driving test and issues the Certificate of Competence TAJ
  then requires as an enclosure — TAJ is modelled as this schema's own
  `authority` since it is the body the applicant transacts the licence
  application itself with and the body hosting the form.

## Extraction method

Confirmed mechanically via `pdfjs-dist` (vendored at
`/tmp/node_modules/pdfjs-dist`) `getAnnotations()`: page 1 carries 18
`/Widget` annotations (15 real content text fields plus 3 non-content
button widgets — `SAVE`/`PRINT`/`RESET`, a PDF-viewer convenience feature,
excluded from `fields[]`); page 2 carries zero widgets, confirming Form F3
is not fillable. Text extracted via `getTextContent()` and cross-referenced
by each widget's own `rect` y-position against the nearest printed item
label to resolve section membership. Both pages also rendered to PNG via
`pdfjs-dist` + `node-canvas` (vendored at `/tmp/node_modules/canvas`) at
2.5x scale to visually confirm the printed layout, including the
un-widgeted Private/Motor Cycle licence-type selection (see Finding 1) and
the two-page Form F1/Form F3 split.

## Document structure

Models 15 `fields[]` across 3 steps (Application Declaration; Personal
Particulars (a)-(e); Licensing History (f)-(l)) plus 4 `documents[]`
entries.

## Disclosed source-fidelity findings

1. **The Private/Motor Cycle licence-type selection has no backing
   AcroForm widget.** The printed sentence reads "do hereby apply that a
   [Private Driver's Licence / Motor Cycle Driver's Licence] be granted to
   me", with the two options stacked as a fraction (one above a horizontal
   rule, one below) rather than as a checkbox/radio pair — the applicant is
   expected to strike out the inapplicable option by hand. Modelled as a
   required 2-value enum (`licenceType`) inferred from this printed
   two-option layout, the same not-a-printed-checkbox convention this
   registry's Jamaica (`jm/pica/passport-application` Finding 1) and Uganda
   passport/DMV schemas already use for conditions/selections the form
   states in prose or layout but does not back with a distinguishing
   widget.
2. **`declarantFullName` (AcroForm field `Name`, the form's own opening
   "I, ___, do hereby apply..." line) duplicates the same person's name
   already captured, split into parts, by the later `surname`/
   `christianName` fields (items (a)/(b)).** Modelled as its own distinct
   field since it is backed by its own separate AcroForm widget and
   GSP-0013 has no field-equality assertion this schema could use to
   express "must match a value already given" instead — the same
   disclosed-duplication treatment `jm/pica/passport-application` Finding 6
   applies to its own comparable restated-name fields.
3. **Item (i) ("If so, by what Licensing Authority or Authorities, and on
   what date or dates?") is backed by two separate AcroForm text widgets**
   (`Licence denied`, a short field at the tail of the question's own
   printed line, and `Licence denial date`, a full-width field on the
   ruled continuation line beneath it) under one single printed question,
   with no distinguishing sub-caption differentiating an "authority" answer
   from a "date" answer despite the widgets' own internal names suggesting
   otherwise. Collapsed here into one logical, generously-sized
   `refusalAuthorityAndDate` field, per the same
   multi-widget-under-one-label collapsing convention
   `jm/pica/passport-application` Findings 4/5 apply to its own comparable
   ruled-continuation-line fields; it is not certain from the source alone
   which widget was originally intended to hold which half of the answer,
   and this schema does not attempt to resolve that ambiguity beyond
   disclosing it here.
4. **Items (f), (h), (j), and (l) are each modelled as a required
   boolean**, even though each is backed by a single free-text AcroForm
   widget with no printed Yes/No tick option, because each is phrased as an
   unambiguous yes/no question ("Has any Driver's Licence been issued to
   you?"; "Have you ever been refused a Driver's Licence?"; "Have you ever
   had a Driver's Licence suspended, revoked or endorsed?"; "Are you able
   to read and write English?") — the same printed-yes/no-question-as-
   boolean convention this registry's own
   `jm/orc/business-name-registration-individual` (`hasBranches`,
   `isRenewalApplication`) already uses for its own comparable narrative
   yes/no items.
5. **`licenceIssuingAuthority` (g), `refusalAuthorityAndDate` (i), and
   `suspensionAuthorityOrTribunal` (k) are each modelled `requiredWhen`
   their own preceding yes/no item** (`licenceEverIssued`,
   `licenceEverRefused`, `licenceEverSuspendedRevokedEndorsed`
   respectively) since each item's own printed text is explicitly
   conditional ("If so, ..."), a direct GSP-0013 `equals: true` gate with
   no unprinted-eligibility-gate ambiguity.
6. **`ageNextBirthday` (d) and `dateOfBirth`/`placeOfBirth` (e) are both
   modelled required with no cross-field validation asserting mutual
   consistency** (e.g. that `ageNextBirthday` is arithmetically derivable
   from `dateOfBirth`), since GSP-0013's `crossFieldValidation` grammar has
   no date-arithmetic operator; both are independently printed items on the
   source form and both are modelled as the source presents them.
7. **Form F3 ("Certificate of Character"), the photograph referenced by
   the form's own "PHOTO OF APPLICANT" box, and the "Certificate of
   Competence" referenced by the form's own "Enclosures: Certificate of
   Competence" line are modelled as `documents[]` entries, not
   `fields[]`**, since none is applicant-entered form data: Form F3 is
   completed and signed by a third-party Justice of the Peace or police
   officer (structurally analogous to `jm/pica/passport-application`'s own
   third-party "Official Certification" section, Finding 6, and to this
   registry's Botswana/Zambia passport schemas' own referee-attestation
   sections), the photograph is a physical print affixed to the form, and
   the Certificate of Competence is a separate credential issued by the
   Island Traffic Authority after the practical driving test, not
   generated by this application itself.
8. **No signature line on Form F1 is backed by an AcroForm widget** — not
   the applicant's own signature after the opening declaration, not the
   applicant's second signature after item (l), and not the "Declared to
   before me this ___ day of ___ 20___ / J.P. or Member of Licensing
   Authority" witnessing block. All three are plain underlined blanks with
   no distinguishing widget, the same genuine AcroForm/signature departure
   `jm/pica/passport-application` Finding 7 discloses for its own
   comparable form; this schema excludes all three from `fields[]` and
   instead models a single `signedApplicationForm` document. The "Declared
   to before me..." witnessing block itself (a Justice of the Peace or
   Licensing Authority member countersigning the applicant's own
   declaration, not a separate certificate) is not modelled as its own
   document, since it is part of the same physical signed Form F1 rather
   than a distinct supporting artifact.
9. **The "For Departmental use only" (Licence No./Issued) and "REMARKS"
   blocks at the foot of Form F1 are excluded in full**, completed by TAJ
   staff processing the application, not applicant-supplied data — the
   same convention `jm/pica/passport-application` Finding 14 and
   `bw/dic/passport-application` Finding 10 apply to their own "For
   Official Use Only" sections.

## Conformance

3 valid mock scenarios (a first-time Private-licence applicant with no
prior licensing history; a Motor Cycle applicant disclosing a prior licence
issuance, a prior refusal, and a prior suspension, triggering all three
`requiredWhen` follow-up fields together; and a literacy-declaration edge
case where the applicant declares `literateInEnglish: false`, which the
source form does not gate any other field on) plus 16 mutation-control
fixtures (a missing statically-required field for `licenceType`,
`declarantFullName`, `surname`, `christianName`, `placeOfResidence`,
`ageNextBirthday`, `dateOfBirth`, `placeOfBirth`, `licenceEverIssued`,
`licenceEverRefused`, `licenceEverSuspendedRevokedEndorsed`, and
`literateInEnglish` [12 fixtures]; a missing `requiredWhen`-true field for
`licenceIssuingAuthority`, `refusalAuthorityAndDate`, and
`suspensionAuthorityOrTribunal` while each own gate is active [3 fixtures];
and an unknown top-level field) are committed under
`conformance/jm/taj/driving-licence-application/1.0.0/`.

An ephemeral, from-scratch conformance checker (deriving required/
requiredWhen rules directly from this schema's own `fields[]`, discarded
after use, not committed) ran all 19 fixtures: all 3 valid scenarios at 0
errors, all 16 mutation controls each raising exactly 1 error, and
confirmed every `requiredWhen` field reference resolves (0 dangling
references).

Validated clean with `node tools/validate.mjs` and `node
tools/validate-ajv.mjs`, individually and as part of the full registry run.
`registry-index.json` regenerated via `npm run build-index` in
`tools/govschema-client/`.
