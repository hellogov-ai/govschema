# Verification record — jm/pica/passport-application@1.0.0

## Candidate selection

GOV-4367 ("GovSchema Standard Research", 2026-07-22). Consumes the single
most attractive of Jamaica's four disclosed-STRONG banked-backlog verticals
left open by the GOV-4360 cycle (see CATALOG.md's Known Gaps entry 0f) —
PICA's own genuine AcroForm passport application, flagged in that cycle's
own scouting notes as "the richest and cleanest source of all six Jamaican
verticals scouted, a true fillable AcroForm rather than a flat/scanned
specimen". Opens Jamaica's Passport vertical (2 of 6); Business Formation
is already open via `jm/orc/business-name-registration-individual`, and
DMV/Visa/Taxes remain open, STRONG banked backlog for future cycles
(National ID is a confirmed dead end per the GOV-4360 cycle's own
screening).

## Reaching the live source

Independently re-fetched and re-hashed rather than trusted from the prior
cycle's own banked report alone:

- `https://www.pica.gov.jm/sites/default/files/Forms/Jamaica-Passport-Application-Compressed.pdf`
  (linked from the live, unauthenticated `/passport/application-forms`
  page).
- HTTP 200, `Content-Type: application/pdf`, 776,064 bytes (byte-for-byte
  match with the GOV-4360 cycle's own reported ~776KB size).
- sha256 `aa259402cb3e6231a4661e6d6e567645c9cafb3e87741231c5b530e8c5c44e40`.

## Extraction method

Confirmed mechanically via `pdfjs-dist`'s (vendored at
`/tmp/node_modules/pdfjs-dist`) `getAnnotations()` API across all 6 pages:
172 `/Widget` annotations resolving to exactly 152 unique AcroForm field
names (an exact match with the GOV-4360 cycle's own reported field count),
concentrated on pages 1-4 (57, 26, 36, and 53 widgets respectively); pages
5-6 carry zero widgets and are the printed guideline pages, not fillable
form content. Text extracted via `getTextContent()`, grouped by row
(y-coordinate, tolerance 2pt) and column (x-coordinate), to recover every
printed section heading, field label, and radio/checkbox option caption,
cross-referenced against each widget's own `rect` to resolve column and
section membership. A `pdfjs-dist` + `node-canvas` (vendored at
`/tmp/node_modules/canvas`) render-to-PNG attempt at 2.5x scale for all 4
form pages confirmed the overall box/line/radio-button grid layout
(comb-style text boxes, circular radio buttons grouped in rows) but could
not render the form's own embedded glyphs (a `getPathGenerator`/"Requesting
object that isn't resolved yet" font-resolution failure) — the same
disclosed sandboxed PDF-render tooling gap this registry's
`eg/mfa/civil-status-record-request` and other schemas have already hit;
text-layer extraction was unaffected and is this schema's primary
evidentiary basis.

## Document structure

The PDF's 6 pages: pages 1-4 are the fillable AcroForm (Sections A-K); pages
5-6 are printed "Guidelines for Jamaican Passport Application" (no
widgets), the source for this schema's own `documents[]` entries. Models
110 `fields[]` across 12 steps (Eligibility Gates; Section A Personal Data;
Section B Marriage Details; Section C Consent for Minor; Section D
Particulars of Most Recent Passport; Section E Declaration of Applicant;
Section F First Emergency Contact; Section F Second Emergency Contact;
Section G Official Certification; Section H Religious Headgear; Section I
Born Outside Jamaica; Section J Supplementary Information) plus 6
`documents[]` entries.

## Disclosed source-fidelity findings

1. **Three unprinted boolean eligibility gates model conditions the form's
   own section headers state in prose but never back with a printed
   checkbox** — `applicantIsMinor` (Section C's own header: "Applicable to
   persons under 18 years of age"), `wearsHeadgearForReligiousReasons`
   (Section H's own header), and `applicantBornOutsideJamaica` (Section I's
   own header: "TO BE COMPLETED BY APPLICANTS BORN OUTSIDE OF JAMAICA").
   This is the same unprinted-condition convention this registry's
   Botswana (`bw/dic/passport-application` Finding 3), Zambia, Ethiopia,
   Malta, and Cyprus passport schemas already use for their own
   section-applicability gates, since GSP-0013's `Condition` grammar has
   no derivation operator (e.g. age-from-date-of-birth, or
   country-of-birth-vs-Jamaica) that could compute any of these three
   directly from an already-answered field.
2. **Sections B (Marriage Details) and D (Most Recent Passport) are gated
   on already-answered enum fields rather than a further unprinted
   boolean**, since the form's own printed structure makes both conditions
   directly derivable: Section B's own header ("TO BE COMPLETED IF
   APPLICANT IS OR HAS BEEN MARRIED") is modelled `requiredWhen
   maritalStatus in [MARRIED, DIVORCED, WIDOWED]` (GSP-0013's `in`
   operator), and Section D's own header ("required whether the passport
   is expired or current, damaged, lost or otherwise unavailable") is
   modelled `requiredWhen priorPassportDeclaration in [SURRENDERED,
   LOST_OR_UNAVAILABLE]` (i.e. not `NEVER_HELD`) against Section E's own
   three-way declaration. A `LOST_OR_UNAVAILABLE`-only subset of Section
   D's own fields (`mostRecentPassportLossDate`,
   `passportIssuedInNameSurname`, `passportIssuedInNameFirstName`,
   `placeOfPassportLoss`, `circumstancesOfPassportLoss`) is further
   narrowed off the `SURRENDERED` branch, since their own printed captions
   ("Name in which stolen, lost or unavailable passport was issued";
   "BRIEF STATEMENT OF CIRCUMSTANCES WHERE PASSPORT HAS BEEN DAMAGED")
   apply only to a lost/damaged passport, not a simply-surrendered one.
3. **Section E's own "Declaration" AcroForm field is a genuine
   radio-button group (mutually exclusive) across all three printed
   declaration paragraphs**, even though each paragraph is presented as
   its own free-standing sentence rather than an explicit "tick one"
   instruction. The three paragraphs are logically mutually exclusive in
   substance (never held one; held one now surrendered; held one now
   lost/unavailable), so the radio-button implementation is semantically
   consistent with the printed content — modelled as a required 3-value
   enum (`priorPassportDeclaration`), ordered top-to-bottom by each
   option's own y-position on the page (the underlying AcroForm's own
   shared `/V` entry does not distinguish per-widget export values, so
   position, not field-reported value, is this schema's basis for enum
   ordering throughout).
4. **`placeOfBirth` is modelled as a single field backed by three separate
   AcroForm text widgets** (`Applicant_Place_of_Birth`,
   `Applicant_Place_of_Birth2`, `Applicant_Place_of_Birth1`, in that
   on-page order). The first two widgets are an unambiguous two-line box
   directly beneath one label ("Place of Birth: (Town, City and Parish)")
   — the same multi-line-box-under-one-label pattern this schema also
   uses for `profession`, `permanentAddress`, `mailingAddress`,
   `permanentTown`, `mailingTown`, `placeOfMarriage`, `marriageCountry`,
   both emergency contacts' own address/town pairs, and
   `placeOfPassportLoss` (in each case, two or three same-width AcroForm
   widgets stacked directly beneath a single printed label with no
   distinguishing sub-caption, collapsed here into one logical,
   generously-sized field rather than modelled as separate
   implementation-level line1/line2 fields). The third widget, however,
   sits beneath a **second, standalone "Place of Birth" label reprinted
   further down the page** (with no parenthetical this time), positioned
   immediately beside where the "Mother's First Name" column begins —
   after the intervening Date of Birth/Sex/Height row breaks the visual
   continuity. It is not certain from the source alone whether this third
   widget is a continuation line of the same answer (consistent with its
   internal AcroForm name and identical `alternativeText`, both shared
   with the first two widgets) or a distinct, mislabelled field the
   form's original designer intended to caption differently. This schema
   takes the conservative reading — a third line of the same
   `placeOfBirth` answer — given the shared internal name and alternative
   text, but discloses the ambiguity here rather than silently resolving
   it.
5. **`circumstancesOfPassportLoss` collapses three separate ruled-line
   AcroForm widgets** (`Circumstances_of_passport_loss1/2/3`) under one
   "BRIEF STATEMENT OF CIRCUMSTANCES WHERE PASSPORT HAS BEEN DAMAGED"
   heading into a single, generously-sized free-text field, per the same
   collapsing convention as Finding 4.
6. **`consentGiverNameInDeclaration` and
   `consentGiverRelationshipInDeclaration` are printed restatements of
   `consentGiverSurname`/`consentGiverFirstName`/`relationToMinor` already
   captured earlier in the same Section C**, embedded in the section's
   own narrative consent sentence ("I (name)... the (Relationship)...").
   Similarly, `applicantFullNameForCertification` in Section G restates
   the applicant's own `surname`/`firstName` already captured in Section
   A, embedded in the certifying official's own narrative sentence
   ("hereby certify that I have known [Full Name of Applicant]... as
   stated on application"). All three are modelled as their own distinct
   fields, since each is backed by its own separate AcroForm widget and
   GSP-0013 has no field-equality assertion this schema could use to
   express "must match a value already given" instead.
7. **No signature line anywhere on this form is backed by an AcroForm
   widget** — not the applicant's own Section E signature, not the
   parent/legal guardian's Section C signature, and not the certifying
   official's Section G signature; each is a plain underlined blank. This
   is a genuine departure from this registry's non-AcroForm passport
   schemas (e.g. `bw/dic/passport-application`,
   `zm/dnrpc/passport-application`), which model "signature" as a plain
   string field for lack of any better-typed alternative on a flat
   specimen — here, since every other data point on this same form is
   backed by a real, distinguishing AcroForm widget and these three
   specifically are not, this schema excludes all three from `fields[]`
   and instead models a single `signedApplicationForm` document, since
   wet-ink signature capture is out of scope for a machine-readable field.
   The parent/legal guardian's Section C consent **date** is likewise
   excluded (no backing widget), unlike the applicant's own Section E
   declaration date (`Declaration_Date`, modelled as `declarationDate`)
   and the certifying official's own Section G certification date
   (`Date_of_Certification`, modelled as `certificationDate`), both of
   which do have real AcroForm widgets.
8. **Section J ("SUPPLEMENTARY INFORMATION") prints 18 ruled lines but the
   underlying AcroForm exposes only 16 unique field names** — two pairs of
   adjacent lines share one field name apiece
   (`Supplimentry_Information4` appears on two separate ruled lines, as
   does `Supplimentry_Information17`), while a would-be
   `Supplimentry_Information5` is never used at all. This is a genuine
   duplicate-widget naming defect in the source AcroForm (filling one of a
   duplicated pair auto-fills its sibling line, since they are literally
   the same underlying field), not a schema limitation. Modelled as 16
   independent, renumbered optional free-text fields
   (`supplementaryInformationLine1`-`supplementaryInformationLine16`),
   each `sourceRef`-annotated with its own actual AcroForm field name for
   traceability. The source PDF's own internal field name for
   `specialVisibleFeatures` (`Apecial visible Feature`) contains its own
   typo, corrected here to a clean camelCase name; the printed label
   itself ("Special Visible Features") is spelled correctly.
9. **Section G's own "Address of Certifying Official" column is split
   across five separate stacked AcroForm text widgets** (Building/
   Apartment Number and Name — explicitly "(if applicable)" per its own
   printed caption, hence the sole optional field in this block; Street
   Number and Street Name; Town; City; Parish/State), while the adjacent
   "Country" column carries three (Country, Postal/Zip Code, Telephone).
   This is a genuinely different split from the applicant's own Section A
   permanent/mailing address blocks (each a simple Address/Town/Country/
   Zip/State column set) — Section G's own five-way Town/City/Parish/
   State breakdown has no analogue elsewhere on this form and is modelled
   field-for-field as the source AcroForm actually structures it, not
   assumed identical to Section A's own convention.
10. **Section F's two emergency-contact blocks ("FIRST CONTACT PERSON"/
    "SECOND CONTACT PERSON") are printed as visually identical blocks with
    no annotation distinguishing one as optional.** This schema models the
    first contact's own fields as required and the second contact's own
    fields as entirely optional, a disclosed judgment call (the same
    convention this registry's Botswana/Zambia passport schemas apply to
    their own next-of-kin/emergency-contact sections) rather than assuming
    a second contact is universally mandatory.
11. **`residentialPhoneNumber`/`businessPhoneNumber` and
    `permanentAddress`/`mailingAddress` (with their own Town/Country/Zip/
    State companions) are each modelled as independently optional, with no
    selector or validation rule requiring at least one of the pair.** The
    form itself prints "Mailing Address (If different from permanent
    address)", confirming the mailing block is conditional in substance on
    the applicant actually having a different mailing address, while
    `permanentAddress` itself carries no such qualifier and is modelled
    required. The two phone-number columns (Residential/Business) carry no
    qualifier distinguishing either as mandatory; both are modelled
    optional, the same disclose-rather-than-fabricate treatment
    `bw/dic/passport-application` Finding 2 applies to an analogous
    unconditioned either/or pair.
12. **`maidenSurname`, `previousName`, `middleName`,
    `specialVisibleFeatures`, `permanentZipCode`/`mailingZipCode`,
    `permanentState`/`mailingState`, and `certifyingOfficialZipCode` are
    modelled optional** since not every applicant has a maiden surname, a
    prior name, a middle name, a distinguishing mark, or a postal
    code/state on their address (Jamaican addresses commonly carry a
    Parish rather than a postal code or state) — the source prints no
    optionality marker for any of these, the same disclosed judgment-call
    convention `bw/dic/passport-application` Finding 5/7 applies to its
    own comparable fields.
13. **`previousPassportOrTravelDocumentNumber` (Section E's own "other than
    Passport or Travel Document No. ___, which is submitted herewith") is
    modelled bare-optional, not gated on `priorPassportDeclaration`.** The
    sentence structure implies this blank is only completed if such an
    exception document exists, which is not guaranteed even within the
    `SURRENDERED` declaration branch — the same disclosed no-printed-signal
    treatment `bw/dic/passport-application` Finding 9 applies to its own
    analogous ungated optional field.
14. **Section K ("FOR OFFICIAL USE ONLY") and the "RECEPTION TEAM" block
    are excluded in full**, including the eleven-row "DOCUMENTS SUBMITTED"
    table (document number and issue date per document type — Birth
    Certificate, Adoption Certificate, Marriage Certificate,
    Naturalization Certificate, Registration Certificate, Certification of
    Citizenship, Divorce Certificate, Driver's Licence, Tax Registration
    Number, Electoral Identification, Other) and the Outpost Staff/
    Passport Office reception sign-off fields — all completed by PICA
    staff recording which documents were physically produced and
    processed, not applicant-supplied data. This mirrors
    `bw/dic/passport-application` Finding 10's own exclusion of its source
    form's "For Official Use Only" page.
15. **Radio-button and checkbox-grid option orderings (`maritalStatus`,
    `eyeColour`, `sex`, `relationToMinor`) were resolved by
    cross-referencing each radio widget's own `rect` x-position against
    the nearest printed option caption's own x-position**, not by the
    AcroForm's own reported `fieldValue` (which returns the field's shared
    `/V` entry, identical and uninformative across every sibling widget in
    a group, e.g. every `Eye Colour` widget reporting `null` and every
    `Declaration` widget reporting the same string). `eyeColour` in
    particular is an 11-value enum (Dark Brown, Brown, Grey, Grey Blue,
    Blue, Hazel, Chestnut, Black, Red, Burgundy, Mixed) confirmed by an
    11-widget-to-11-caption exact positional match across four printed
    rows.

## Conformance

3 valid mock scenarios (a first-time adult applicant declaring
`NEVER_HELD` with no marriage, minor-consent, headgear, or foreign-birth
branches triggered; a married adult renewing after a lost passport,
triggering Section B, the `LOST_OR_UNAVAILABLE` subset of Section D, and a
police-report document; and a minor applicant born outside Jamaica with a
legal guardian's consent and a religious-headgear declaration, triggering
Sections C, H, and I together) plus 17 mutation-control fixtures (a
missing statically-required field for `surname`, `firstName`,
`maritalStatus`, `eyeColour`, `dateOfBirth`, `sex`, `mothersFirstName`,
`mothersMaidenName`, `permanentAddress`, `permanentTown`,
`permanentCountry`, `priorPassportDeclaration`, `declarationDate`, and
`emergencyFirstContactSurname` [14 fixtures]; a missing `requiredWhen`-true
field (`consentGiverSurname`) while its gate is active; an invalid enum
value (`eyeColour`); and an unknown top-level field) are committed under
`conformance/jm/pica/passport-application/1.0.0/`.

An ephemeral, from-scratch conformance checker (deriving required/
requiredWhen rules directly from this schema's own `fields[]`, discarded
after use, not committed) ran all 20 fixtures: all 3 valid scenarios at 0
errors, all 17 mutation controls each raising exactly 1 error, and
confirmed every `requiredWhen` field reference resolves (0 dangling
references). Validated clean with `node tools/validate.mjs` and `node
tools/validate-ajv.mjs`, individually and as part of the full registry
run. `registry-index.json` regenerated via `npm run build-index` in
`tools/govschema-client/`.
