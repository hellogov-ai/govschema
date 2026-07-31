# Verification record — pg/ica/entry-permit-application@1.0.0

## Candidate selection

GOV-5819 ("GovSchema Standard Research"). GOV-5812's own prior cycle
screened Papua New Guinea's Visa vertical (alongside the other four
verticals it screened) and banked two live, unauthenticated, genuinely rich
AcroForm candidates without authoring either:

1. **"Application to Extend Entry Permit"** (the ICA's own form) —
   `ica.gov.pg/uploads/media/post_file_2430587-visa-extension-form-new-savable.pdf`
   — HTTP 200, 123,043 bytes, confirmed 62 widgets across 2 pages. This is a
   follow-on/renewal action for someone already in-country, not a
   first-entry application.
2. **"Application for entry permit"** (first-entry visa application) —
   mirrored at
   `png.or.jp/wp-content/uploads/2016/01/Application_for_entry_permit_form_new_savable.pdf`
   — HTTP 200, 180,934 bytes, confirmed 102 widgets across 4 pages, itself
   watermarked "Downloaded from www.immigration.gov.pg" (the direct
   `immigration.gov.pg` path for this exact filename currently 404s;
   `png.or.jp` is the only currently-live host found for this specific PDF).
   A genuine first-entry visa application, and the richer of the two (102
   vs. 62 widgets).

This cycle authored the richer, first-entry candidate (#2), opening Papua
New Guinea's Visa vertical outright. The visa-extension form (#1) remains
unauthored backlog for a future cycle, as a distinct renewal/extension
action rather than a first-entry application.

## Reaching the live source

Independently re-fetched
`https://png.or.jp/wp-content/uploads/2016/01/Application_for_entry_permit_form_new_savable.pdf`
directly via plain `curl`, twice, to confirm reproducibility:

- HTTP 200, 180,934 bytes, both times.
- sha256 `669fe6cf6878c7c11aac04459056cc6782da0396de4ce73dfcc17bc18da5076d`,
  both times, byte-identical (`cmp` confirmed).
- No login, CAPTCHA, or WAF/JS-challenge gate — served directly
  (`content-type: application/pdf`) with a permissive response.
- `Last-Modified: Sun, 11 Sep 2016 15:00:00 GMT` — a long-standing, stable
  specimen, not a recent upload.
- Independently confirmed the direct `immigration.gov.pg` path for this
  exact filename currently 404s (`immigration.gov.pg/wp-content/uploads/...`
  and `www.immigration.gov.pg/...` both return HTTP 404), corroborating that
  `png.or.jp` is the only currently-live host for this specific PDF, even
  though the PDF itself is watermarked "Downloaded from
  www.immigration.gov.pg" and so explicitly attributes its own source
  authority.

Confirmed via `pdfjs-dist` to be a genuine native (searchable-text) PDF, not
a scanned image: a clean text-layer extraction across all 4 pages recovered
every printed label with no glyph-mapping or OCR workaround needed.

## Authority naming

This specimen's own page-1 letterhead reads "PNG Immigration & Citizenship
Service Authority", and Instruction 3 addresses the completed form to "The
Chief Migration Officer, Immigration and Citizenship Service Authority, PO
Box 1790, BOROKO, NCD, Papua New Guinea" — a slightly different printed name
("...Service Authority") than the name printed on
`pg/ica/passport-application`'s own specimen ("Immigration and Citizenship
Authority", no "Service"). A live web search corroborates both names refer
to the same body: `ica.gov.pg`'s current branding is "Immigration and
Citizenship Authority"/ICA, while "Immigration and Citizenship Service
Authority"/ICSA appears in older/alternate third-party usage for the
identical institution (e.g. a ZoomInfo entry titled "The PNG Immigration &
Citizenship Service Authority" and a CB Insights entry titled "Papua New
Guinea Immigration and Citizenship Authority" both describe the same body).
This schema therefore reuses the existing `registry/pg/ica/` authority
directory and the existing `pg/ica/passport-application` authority block
verbatim (name "Immigration and Citizenship Authority", abbreviation "ICA",
url `ica.gov.pg`) rather than opening a new, spurious authority directory
for what is the same institution under an older printed name.

`ica.gov.pg` itself returned HTTP 403 to both a direct `curl` and a
`WebFetch` attempt during this cycle's verification (consistent with
GOV-5812's own passport cycle, which reached the same domain successfully
for its own PDF asset but not this HTML front-end), so the current-name
corroboration above relies on third-party search results, not a direct
fetch of `ica.gov.pg`'s own text — disclosed as a residual sourcing gap,
not a live-fetch confirmation.

## Extraction method

Extracted with `pdfjs-dist` (vendored install at
`/tmp/mn-passport/extract/node_modules/pdfjs-dist`, CommonJS legacy build):
a full `getAnnotations()` pass per page enumerated every AcroForm Widget
(102 total across 4 pages — page 1: 33; page 2: 40; page 3: 29; page 4: 0,
a pure general-information/notes page), recording each widget's internal
field name, PDF field type (`Tx`/`Btn`/`Ch`), rect (bounding box) position,
and (for `Btn` widgets) `checkBox`/`radioButton`/`pushButton` flags; then a
`getTextContent()` pass per page, sorted by descending y then ascending x,
to recover reading order.

Several ambiguous regions were re-extracted with a narrower y-band and raw
per-glyph x/y coordinates (rather than trusting the joined-line text alone)
to positively cross-check every widget's rect against its printed label
before naming the field:

- The page-1 TRAVEL ARRANGEMENTS column layout: the joined-line text
  briefly appeared to read "Arrival in PNG / Departure to PNG / Name of
  Vessel/Flight" left-to-right, but a raw per-glyph re-extraction of that
  row (y=60–115) showed `Name_of_VesselFlight`'s own widget rect sits
  leftmost (x=24–196), `Departure_to_PNG`'s own Port/Date widgets sit in
  the middle column (x=234–395, directly beneath the "Departure to
  PNG"/"Port:"/"Date:" labels printed at x=214), and `Arrival_in_PNG`'s own
  Port/Date widgets sit rightmost (x=432–564, beneath labels at x=413) —
  confirmed by rect-to-label proximity, not the initially-misleading
  line-joined text order.
- Page 2's two-column employment-document-checklist vs.
  stay-funding-source-checklist split: a rect/text cross-check confirmed
  the left column (x=26–44) backs the four employment-purpose document
  checkboxes and the right column (x=377–395) backs the four
  stay-funding-source checkboxes.
- The page-3 DECLARATION paragraph: a raw per-glyph re-extraction (y=250–300)
  confirmed the text-layer's own reading order is internally consistent
  here (not a sort-order artifact, unlike the travel-arrangements row
  above) — see scoping decision 11 below.

`canvas` was not available in this environment (checked `/tmp/node_modules`
and every `node_modules` tree reachable from the working directory; only
`pdfjs-dist` itself was found, no `canvas`), so no page was rendered to a
PNG. Every field mapping in this schema was instead confirmed via the
rect-position/text-position cross-check method described above, consistent
with this registry's own established practice of only invoking
canvas-rendering when rect-position inference alone leaves genuine
ambiguity — no such residual ambiguity was found here.

## Structure and scoping decisions

No printed required/optional signal of any kind exists anywhere on this
specimen (no asterisk, no "(required)"/"(optional)" caption, confirmed by a
full page-by-page text-layer read) — the same constraint
`pg/ica/passport-application` and `cd/maeci/visa-application` faced. This
schema follows the same policy those two adopted: required only the fields
necessary to identify the applicant and the substance of the application,
and bare-optional for travel logistics, secondary address/phone detail, and
the emergency-contact block, with every genuinely conditional block gated
by `requiredWhen` wherever the form's own layout or prose states a real
conditional relationship.

Disclosed scoping decisions:

1. **This specimen carries two genuine image-insertion pushbutton widgets —
   a real contrast with `pg/ica/passport-application`, which carries
   none.** Page 3's "Photograph" box and "Signature of
   Applicant/Parents/Guardian:" line are each backed by a real AcroForm
   `Btn` widget (`Insert_photograph_here`, `Insert_signature_image_here`)
   with `pushButton:true` and `isTooltipOnly:true` — Acrobat/LiveCycle
   "click to insert an image" pushbuttons, not checkboxes or text fields.
   Both are modelled as `fields[]` of type `file` (`applicantPhotograph`,
   `applicantOrGuardianSignatureImage`), both required, since a genuine
   widget backs each — consistent with this registry's convention of only
   modelling signature capture (and, by the same logic, photograph
   capture) where the source itself provides a fillable widget. Unlike
   `bz/doi/passport-application`'s `submitterSignature` (a text-type `Tx`
   widget on a printed "Signature" line) or `tt/imd`'s
   `applicantSpecimenSignature`, this specimen's signature widget is an
   image-insertion pushbutton, modelled as type `file` rather than type
   `string` for that reason.

2. **Instruction 1 states "Where the application is in respect of a child
   under 16 years of age, both parents must sign the application", but only
   one signature widget exists on the entire specimen** (the single
   `Insert_signature_image_here` pushbutton behind the shared "Signature of
   Applicant/Parents/Guardian:" line). This is a genuine content gap in the
   source specimen itself, not an omission of this schema's own: there is
   no second signature widget, and no separate parent/guardian name text
   field anywhere on the form, to model a two-parent-signature scenario
   distinctly. Disclosed rather than invented;
   `applicantOrGuardianSignatureImage` models the one widget that exists.

3. **Three directly-supplied boolean gates without a backing widget of
   their own** — `hasChangedNameOrAlias`, `hasOtherPassport`, and
   `hasOrganisationalSponsor`:
   - `hasChangedNameOrAlias` and `hasOtherPassport` split a single combined
     page-2 prose sentence ("If you have ever change your name, are known
     by an alias, or own another passport, please provide details:") that
     precedes two visually distinct subsections (PREVIOUS NAMES/ALIAS
     DETAILS: and OTHER PASSPORTS:). Since the two subsections are printed
     and headed separately, this schema models two independent gates
     rather than one combined one, so a same-name-never-changed applicant
     who nonetheless holds another passport is not forced to also complete
     the previous-name/alias block, and vice versa.
   - `hasOrganisationalSponsor` models the ORGANISATIONAL SPONSOR
     heading's own genuinely conditional nature (most applicants — e.g.
     tourists funding their own stay — will have no organisational sponsor
     at all) even though the form prints no explicit "do you have a
     sponsor?" yes/no question of its own for this block.
   All three mirror this registry's own `hasSponsor`
   (`cd/maeci/visa-application`) / `hasHostInMalta`
   (`mt/identita/long-stay-visa-application`) / `applicantUnder17`
   (`pg/ica/passport-application`) convention for a real conditional
   relationship stated in prose or layout without its own checkbox.

4. **Within the `hasOrganisationalSponsor` branch, only
   `organisationalSponsorName`, `sponsorStreetAddress`, and `sponsorCountry`
   are gated `requiredWhen` true**; `sponsorAgentName`,
   `sponsorSuburbTown`, `sponsorStateProvince`, `sponsorPostcode`,
   `sponsorBusinessTelephone`, and `sponsorFax` remain bare-optional even
   within a true branch, consistent with this registry's policy of not
   over-requiring secondary contact detail absent its own printed signal.

5. **`applicationType` collapses 7 independent AcroForm checkboxes into one
   enum** (`Application_Type_-_Visitor`/`Working_Resident`/`Business`/
   `Entertainer`/`Student`/`Special_Exemption`/`Dependent`, each its own
   `Btn` widget with `exportValue` "Yes", not a single radio-button field),
   consistent with this registry's established convention for this
   checkbox-group pattern. The form's own instruction reads "TICK THE
   PURPOSE AND CIRCLE A DESCRIPTION OF YOUR VISIT TO PNG": beneath/around
   each of the 7 category checkboxes sits a list of finer-grained
   descriptive labels (e.g. under Working Resident: "Short-term
   Employment", "Employment", "Consultant/Specialist"; under Special
   Exemption: "Film maker", "Comedian", "Musician", "Melanesian
   Spearhead", "Foreign Official", "Diplomat", etc.) meant to be
   hand-circled, not ticked — none of these finer descriptions carries its
   own AcroForm widget anywhere on the specimen, so none is modelled as a
   separate field; only the 7 category-level checkboxes, which do carry
   widgets, are modelled.

6. **The page-2 employment-purpose document checklist (4 checkboxes) is
   inferred to gate on `applicationType == WORKING_RESIDENT`.** The form's
   own page-2 heading reads "For entry for the purpose of employment:
   Please attach copies of the following documents" opposite "For all
   other types of entry: How will you be funding your Stay in PNG?" — real
   conditional prose — but neither heading cross-references the page-1
   application-type checkbox labels by name. Of the 7 application-type
   categories, only Working Resident's own page-1 descriptive labels
   ("Short-term Employment", "Employment", "Consultant/Specialist")
   describe genuine paid employment; this schema therefore infers
   `applicationType == WORKING_RESIDENT` as the gating condition for
   `sponsorEmploymentLetterAttached`/`workPermitApprovalAttached`/
   `medicalCertificateAttached`/`policeClearanceAttached` (and the four
   matching `documents[]` entries), disclosed as an inference rather than
   a literal cross-reference printed on the form.

7. **The four "how will you be funding your Stay in PNG" checkboxes
   (`fundedBySalary`/`fundedByCompanySponsor`/`fundedByOwnFunds`/
   `fundedByFamily`) are left entirely ungated (bare-optional, no
   `requiredWhen`)**, even though they are the page-2 counterpart to the
   employment-document checklist above. Unlike that checklist (four items
   that read as a single unconditional list once employment purpose is
   established), these four are independent, mutually non-exclusive
   checkboxes with no "tick one" or "at least one" instruction of their
   own, and the `requiredWhen` grammar available to this spec only
   expresses single-field conditions, not "at least one of these four
   fields must be true" — encoding a mandatory-selection constraint here
   would overreach what the form itself states. Disclosed rather than
   invented.

8. **`previousSex` and `previousMaritalStatus` are genuine `Ch` (combo-box)
   dropdown widgets**, each with a blank first option (`exportValue` " ")
   followed by the real choices (F/M for sex; Married/Never married/
   Divorced/Widowed/De-facto for marital status) — the blank option is not
   modelled as a valid enum value, and both enums are normalised to the
   same `MALE`/`FEMALE` and `MARRIED`/`DE_FACTO`/`WIDOWED`/`DIVORCED`/
   `NEVER_MARRIED` vocabulary already established by this schema's own
   top-level `sex`/`maritalStatus` fields (themselves collapsed from
   independent `Btn` checkboxes on page 1), for cross-field consistency,
   rather than preserving the dropdown's own raw single-letter/differently
   -ordered export values verbatim.

9. **Two separate, non-combined address blocks exist for the applicant**
   (RESIDENTIAL, page 3, and a second "PNG:" in-country stay address, page
   3), each backed by its own full set of independent AcroForm widgets —
   modelled as two fully separate groups of fields (`residential*`/
   `pngStay*`) rather than combined into one address field each, since the
   source itself prints two visually and semantically distinct address
   sections with different sub-label sets (Suburb/Town vs. Town/Village;
   State/Province vs. Province; the PNG block additionally has its own
   separate "Postal Address" box with no residential-block equivalent).

10. **The page-1 TRAVEL ARRANGEMENTS row was disambiguated by rect
    position, not by the joined-line text's own left-to-right order** — see
    the Extraction method section above for the full detail.

11. **The page-3 DECLARATION statement's own printed wording reads "...the
    information provided on the form is true and correct at I have
    disclosed all information that may be relevant..."** — quoted verbatim
    (*sic*) in the `applicantDeclaration` document's `statement` field. A
    raw per-glyph re-extraction of this exact paragraph confirmed the
    text-layer's own reading order is internally consistent (not a
    sort-order artifact of overlapping text runs, unlike the
    travel-arrangements row above) — "at I have" therefore appears to be
    the source PDF's own genuine wording (most likely originally intended
    as "and that I have"), not an extraction defect, though this cannot be
    independently confirmed without a canvas-rendered image (unavailable in
    this environment).

12. **Instruction 3's own address ("The completed form and the applicant's
    passport should be sent to: The Chief Migration Officer... PO Box 1790,
    BOROKO, NCD, Papua New Guinea") establishes that the applicant's
    physical passport itself, not merely passport particulars, must
    accompany the submitted form** — modelled as the `applicantPassport`
    `documents[]` entry (category `identity-document`, required), distinct
    from the `passportNumber`/`passportExpiryDate`/`passportIssueDate`/
    `passportIssuingPlace`/`passportIssuingAuthority` `fields[]` entries
    that model the printed particulars.

13. **No application fee of any kind is printed anywhere on this
    specimen** (unlike `pg/ica/passport-application`'s own K100 fee),
    confirmed by a full page-by-page text-layer read for "fee"/
    currency-amount mentions — the only currency figure on the entire
    specimen ("K300.00 a month", page 4) is general proof-of-funds guidance
    for tourists/visitors, not a payable application fee — so no
    `documents[]` payment entry is modelled.

## Structure

Models 89 `fields[]` across 12 steps, 6 `documents[]` entries, and 1
`crossFieldValidation` rule. 3 of the 89 fields —
`hasChangedNameOrAlias`/`hasOtherPassport`/`hasOrganisationalSponsor` — are
directly-supplied gates without a backing widget; the other 86 collapse
this specimen's 102 total AcroForm widgets, since 16 widgets across 8
checkbox-group/pair collapses — `applicationType` [7→1], `sex` [2→1],
`maritalStatus` [5→1], `agreeToEmailContact` [2→1], `visitedPNGBefore`
[2→1], `hasCriminalConviction` [2→1], `hasBeenDeportedOrRefusedEntry`
[2→1], `hasMedicalConditionOrMentalHealthHistory` [2→1] — each collapse
into one enum/boolean field. The 6 `documents[]` entries are the
applicant's own physical passport; four employment-purpose supporting
documents gated on `applicationType == WORKING_RESIDENT`; and the
Declaration attestation. The 1 `crossFieldValidation` rule
(`passportExpiryNotBeforeIssue`) checks the passport's own expiry date is
not before its issue date, mirroring `pg/ica/passport-application`'s own
`travelDocumentExpiryNotBeforeIssue` and `bz/doi/passport-application`'s
`reportDateNotBeforeDateOfLoss`.

## Conformance

2 valid mock scenarios —
`valid-visitor-minimal-no-conditional-history` (a minimal Visitor applicant
exercising the false/absent branch of every one of this schema's 8
conditional gates) and
`valid-working-resident-full-conditional-history` (a Working Resident
applicant exercising the true branch of all 8 conditional gates
simultaneously, including the full organisational-sponsor, previous-name/
alias, other-passport, prior-visit, criminal-conviction, deportation, and
medical-history blocks) — plus 18 mutation-control fixtures (7
missing-required fixtures spanning an enum, two strings, a date, and three
booleans across different steps; 8 missing-`requiredWhen` fixtures, one per
conditional branch; an invalid-enum-value fixture against
`applicationType`; an unknown-field-rejected fixture; and a
`crossFieldValidation`-violation fixture with `passportExpiryDate` set
before `passportIssueDate`) — are committed under
`conformance/pg/ica/entry-permit-application/1.0.0/`.

An ephemeral, from-scratch conformance checker (deriving required/
`requiredWhen`/`crossFieldValidation` rules directly from this schema's own
`fields[]`, discarded after use, not committed) ran all 20 fixtures: both
valid scenarios at 0 errors, all 18 mutation controls each raising exactly
1 error. Validated clean with `node tools/validate.mjs` and
`node tools/validate-ajv.mjs`, individually and as part of the full
registry run (706/706 documents pass both validators with this file
included).

## Outcome

Opens Papua New Guinea's Visa vertical (3 of 6 verticals now open,
alongside Business Formation via `pg/ipa/business-name-registration` and
Passport via `pg/ica/passport-application`). DMV and Taxes remain confirmed
dead ends per GOV-5812's own screening; National ID has two live but flat
(zero-widget) candidates, weaker than a genuine AcroForm, still banked as
backlog; the ICA's own "Application to Extend Entry Permit" (62 widgets)
remains unauthored backlog for a future cycle, as a distinct renewal/
extension action rather than a first-entry application.
