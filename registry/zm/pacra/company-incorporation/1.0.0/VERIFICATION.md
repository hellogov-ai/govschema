# Verification record — zm/pacra/company-incorporation@1.0.0

## Candidate selection

GOV-4271 ("GovSchema Standard Research", 2026-07-22) scouted three
jurisdictions entirely absent from the registry (76 jurisdictions published
at cycle start) in parallel — Panama, Albania, and Zambia — across all six
priority verticals (DMV, Business Formation, Visa, Passport, Taxes, National
ID & Civic Documents), looking for a genuine, unauthenticated, directly
downloadable application form in each. Panama's strongest candidate was a
Visa form (Migración Panamá's tourist-visa PDF); Albania's was a Taxes form
(a printable, non-fillable individual income declaration); Zambia's scouting
pass returned **three** independently STRONG candidates — Business Formation
(PACRA's Form 3, this schema), Passport (a Ministry of Foreign Affairs
"Form A with Form N" PDF), and Taxes (ZRA's Individual Income Tax Return) —
making Zambia the strongest new-jurisdiction candidate of the three. This
cycle authored the Business Formation form to open Zambia as the registry's
77th jurisdiction; the Passport and Taxes candidates are left as disclosed,
pre-scouted backlog for future cycles (see the Known Gaps note this cycle
adds to CATALOG.md).

## Reaching the live source

Fetched `https://www.pacra.org.zm/files/forms/companies/CompaniesForm3.docx`
directly:

- HTTP 200, `Content-Type: application/vnd.openxmlformats-officedocument.wordprocessingml.document`,
  `Content-Length: 59454` bytes, `Last-Modified: Mon, 14 Jul 2025 09:46:25 GMT`.
- No login, CAPTCHA, or WAF gate blocks reaching or reading this file —
  confirmed via a plain unauthenticated `curl` request with no session/cookie
  state.
- sha256 `4cc18372b569d50c48ae590a1bd1b5998cbc299cff4e37d25ab45e632de2f276`.
- Zip local-file-header magic `50 4b 03 04` confirmed at byte 0 — a genuine
  Office Open XML `.docx`, not a scanned image or a legacy OLE2 binary `.doc`.

An older, no-longer-live URL for the same file
(`https://www.pacra.org.zm/wp-content/uploads/2020/06/CompaniesForm3.docx`,
found in third-party mirrors and older web references) now returns HTTP 404 —
confirmed directly. PACRA's own site has migrated to a Next.js-rendered
front end since that URL was last live (its `/forms` listing page is now a
client-rendered SPA route that 404s on a plain unauthenticated fetch,
consistent with a prior cycle's finding — GOV-3078's screening of Georgia's
own `napr.gov.ge` — that this kind of client-rendered document library
resists static-fetch discovery even when the underlying files remain
directly reachable by URL); the current path
(`/files/forms/companies/CompaniesForm3.docx`) was found via a live web
search rather than by crawling the SPA. The document's own title, "Form 3
(Regulation 4) — Application for Incorporation," and its status as the
current, in-force PACRA companies-registration form is independently
corroborated by third-party sources describing the same form under the same
name and the same two/three-director statutory minimum this schema's own
`numberOfDirectors` field description cites (a Zambian business-registration
service-information page and a business-registry procedural guide, both
describing "Companies Form 3 — Application for Incorporation" as the
current PACRA incorporation form with an identical "at least two (2)
directors" prerequisite).

`docProps/core.xml`: `dc:creator` "Wilson Banda", `cp:lastModifiedBy` "Roy
Chaikatisha", `cp:revision` "2", `dcterms:created`/`dcterms:modified` both
2019-03-25T08:11:00Z. `docProps/app.xml`: `Pages` 9, `Words` 1559. The
`Last-Modified` HTTP header (2025-07-14) postdates the document's own
internal `dcterms:modified` property, consistent with a file-copy/re-upload
during PACRA's site migration rather than a substantive content edit —
disclosed as a caveat, not a red flag, since the form's own content (title,
Regulation/section citations, field structure) is unchanged from the
long-published version described by the third-party corroborating sources
above.

## Extraction method

Extracted with Python's stdlib `zipfile` + `xml.etree.ElementTree` (both
available in this session's environment, unlike some prior cycles that
needed a from-scratch zip-central-directory reader) reading `word/document.xml`
directly, then walking the document body's `<w:p>`/`<w:tbl>` children in
document order — for each table, walking `<w:tr>`/`<w:tc>` cells and their
`<w:gridSpan>`/`<w:vMerge>` attributes to recover the true column/row
structure (rather than a flattened text dump), which is what surfaced that
"Gender" is a plain fill-in-the-blank label with no printed options (a free
`string` field, not an `enum`), while "Identity Type" prints an explicit
enumerated vocabulary in its own instructional sub-text ("For Zambians: NRC.
For non-Zambians: NRC/Passport/Driver's Licence/Resident Permit") and
"Type of Company"/"Company Category"/"Whether Articles Restrict Nature of
Business"/"Type of Articles"/"Class of Shares" are all genuine multi-column
checkbox groups (`gridSpan`-delimited option columns under one label row),
confirmed by a full 7-table structural dump (Parts A–H) cross-checked
against the flattened-text pass for consistency.

## Structure and scoping decisions

Models 190 `fields[]` across 8 steps (Company Details; First Directors;
Shareholders; Beneficial Ownership; Guarantors; Company Secretary;
Declaration of Compliance; Particulars of Person Lodging Application). Seven
disclosed scoping decisions, in addition to the Gender/Identity-Type finding
above:

1. **No global asterisk/mandatory convention.** Unlike several other
   `.docx`/PDF sources this registry has authored (e.g.
   `ge/napr/llc-founding-agreement-standard-statute`'s own printed "* -
   Fields marked with a symbol are mandatory" convention), this form prints
   no asterisks, bold "Mandatory" labels, or "(optional)"/"(if applicable)"
   qualifiers except where explicitly noted (e.g. "Class of Shares ... Not
   applicable to companies limited by guarantee"). Requiredness was
   therefore assigned by engineering judgment based on what Zambian company
   law and the form's own structure make statutorily necessary to file
   (company identity/type/address, a director's/shareholder's/secretary's
   core identifying particulars) versus genuinely secondary (a landline
   phone number alongside a required mobile number, "Other Business
   Activities," the pledged-investment-amount field explicitly scoped to
   foreign investors only).

2. **Unbounded "Replicate Part X" repeating groups are modelled at a bounded
   1–2 slots per part, not as an unbounded array (the spec's `field.type`
   enum has no array-of-composite-record type).** Parts B (Directors), C
   (Shareholders), E (Guarantors), and F (Company Secretary) each end with an
   explicit instruction to physically replicate (photocopy) the entire
   block for additional people — e.g. "Replicate Part B to add more first
   directors" — with **no printed maximum**, unlike this registry's prior
   bounded-repeating-group precedents (`ge/napr`'s 3 pre-printed partner
   rows in one table; `mn/gasr`'s 5 pre-numbered founder rows), which all
   had a literal printed row count to anchor against. Part D (Beneficial
   Ownership) is the sole exception with an explicit numeric anchor: its own
   footer reads "Replicate Part D if the Beneficial Owners are more than
   two." Given no printed maximum for B/C/E/F, and since a synthetic count
   discriminator was still worth adding for downstream agents (following
   this registry's `gb/hmrc/child-benefit-claim-ch2`/`mn/gasr` precedent of
   supplying a `numberOfX` field even where the source itself does not print
   one, whenever the source explicitly instructs a same-format continuation
   for more entries), this schema:
   - Models **two** bounded director slots (`director1*`/`director2*`),
     matching the Companies Act minimum director count for a private
     company printed directly on the form ("Minimum of two Directors for
     private and three for public limited companies"); a public company's
     statutory third director, or any company naming more than two
     directors, requires filing a further physical Part B replication
     beyond this schema's v1.0.0 scope — disclosed here, not silently
     dropped, and flagged as the natural next PATCH candidate (a
     `director3*` bounded slot).
   - Models **one** bounded slot each for Shareholder, Guarantor, and
     Company Secretary (`shareholder1*`, `guarantor1*`, `secretary1*`),
     since none of these parts print any numeric anchor at all; more than
     one of any of these likewise requires a physical Part C/E/F
     replication beyond this schema's v1.0.0 scope.
   - Models **one** bounded Beneficial Owner slot (`beneficialOwner1*`),
     one slot short of the form's own printed two-slot base capacity — a
     deliberately conservative choice given this cycle's overall field-count
     budget, disclosed as the most likely single addition for a future
     PATCH (`beneficialOwner2*`, completing the form's own stated capacity
     before any replication is needed).
   Every bounded slot beyond the first is gated `requiredWhen` on its own
   `numberOfX` count field (e.g. `director2FirstName` required when
   `numberOfDirectors >= 2`), all of which are themselves fields this
   schema supplies rather than the source form (which prints no count
   field at all) — following the same "count field not printed on the
   form; supplied for completeness" disclosure printed directly in each
   `numberOfX` field's own `sourceRef`.

3. **Part D's nested "body corporate" sub-tables (DIRECTOR/TRUSTEE OF BODY
   CORPORATE; SHAREHOLDER/SETTLER OF BODY CORPORATE; BENEFICIAL
   OWNER/BENEFICIARY OF BODY CORPORATE, each its own further 4-numbered-row
   table) are excluded from v1.0.0.** These only apply in the doubly-nested
   case where a disclosed beneficial owner is itself a body corporate whose
   own directors/shareholders/beneficial owners must in turn be disclosed —
   a real but comparatively rare case, excluded here as a disclosed scoping
   decision (not a silent gap) given this cycle's field-count budget, and
   flagged as a candidate for a future PATCH alongside finding 2's
   `beneficialOwner2*`/`director3*` additions.

4. **`notEquals ""` is never used as a `requiredWhen` gate against an
   optional string field**, per this registry's own standing lesson (an
   absent optional field cannot be reliably distinguished from an empty
   string by every validator). `otherSharesCount`/`otherSharesParValueZmw`
   (gated only informally on `otherClassOfSharesSpecify` in their own
   `description`) and each person block's `NatureOfBodyCorporate`/
   `BodyCorporateRegistrationDetails` (see finding 7 below) are modelled
   bare-optional with no `requiredWhen`, rather than gated against another
   optional string field's presence.

5. **`companyType`/`companyCategory`/`articlesType` are modelled as `enum`
   fields with the exact printed option text as `validation.enum` values**
   (e.g. `"Private Company Limited By Shares"`, `"Standard"`), following
   this registry's established convention for genuine multi-column
   checkbox groups (confirmed via the `gridSpan` structural dump, finding
   above) rather than free text.

6. **Shareholder/Guarantor/Beneficial-Owner/Secretary "identity" fields
   model a single `Gender` as free `string`, not `enum`**, since the
   structural dump confirmed this label sits over a blank fill-in cell with
   no printed options anywhere in the document — unlike, for example,
   `se/skatteverket/samordningsnummer-ansokan`'s own `gender` field, sourced
   from a genuine two-option PDF radio-button group. Modelling this as an
   unconstrained `string` avoids inventing option values the source does
   not print.

7. **An explicit `isBodyCorporate` boolean discriminator is added to each
   Shareholder/Beneficial-Owner/Guarantor/Company-Secretary block** (e.g.
   `shareholder1IsBodyCorporate`), not printed on the form itself. The
   source prints its natural-person fields (First Name, Surname, Gender,
   ...) and its body-corporate fields (Name of Body Corporate, Nature of
   Body Corporate, ...) side by side in the same table with no checkbox or
   other explicit signal for which one applies to a given entry — reading
   the raw form alone leaves that choice implicit. Rather than mark both
   sets of identity fields unconditionally required (which would demand
   body-corporate data even from a natural-person shareholder, or vice
   versa) or leave both sets bare-optional (which would let a filer skip
   identity entirely), this schema supplies the discriminator so that
   exactly one identity path is required at a time: natural-person fields
   are `requiredWhen !isBodyCorporate`, and `NameOfBodyCorporate` is
   `requiredWhen isBodyCorporate` (each also combined with the block's own
   outer applicability condition, e.g. `companyType notEquals "Private
   Company Limited By Guarantee"` for Shareholder/Beneficial-Owner).
   `NatureOfBodyCorporate`/`BodyCorporateRegistrationDetails` remain
   bare-optional secondary details per finding 4, not gated on
   `isBodyCorporate` themselves, to keep the mandatory surface to the one
   `NameOfBodyCorporate` field that actually identifies the body corporate.

## Conformance

4 valid mock scenarios — `valid-private-limited-by-shares-minimal` (a
Private Company Limited by Shares with exactly two natural-person directors,
one natural-person shareholder, one natural-person beneficial owner, and one
secretary, no optional fields populated); `valid-private-limited-by-shares-
full-body-corporate-shareholder` (the same company type with every optional
field populated — company category "Other," all three share classes, a
landline number on every person block, a politically-exposed-person
beneficial owner — and a body-corporate shareholder exercising the
`isBodyCorporate`/`NameOfBodyCorporate` path); `valid-private-limited-by-
guarantee-with-guarantor` (a Private Company Limited by Guarantee, which
omits the Shareholders/Beneficial-Ownership section entirely and populates
Guarantors instead); and `valid-public-limited-company-financial-
institution` (a Public Limited Company with `companyCategory` "Financial
Institution") — plus 14 mutation-control fixtures (one missing-required
fixture per step across all 8 steps — `companyType`, `director1FirstName`,
`shareholder1FirstName`, `beneficialOwner1FirstName`, `guarantor1FirstName`,
`secretary1FirstName`, `declarantName`, `lodgerFirstName` — an invalid-type
fixture for `numberOfDirectors`, an out-of-range fixture for
`preferentialSharesCount`, two further missing-required fixtures exercising
`requiredWhen`-gated fields correctly triggered in their scenario
(`director2FirstName` when `numberOfDirectors` is 2; `numberOfGuarantors`
itself when `companyType` is Guarantee), a missing-required fixture for
`declarantRole` as a second representative Part G field, and an
unknown-field-rejected fixture) are committed under
`conformance/zm/pacra/company-incorporation/1.0.0/`. An ephemeral, from-scratch
conformance checker (deriving required/requiredWhen rules directly from this
schema's own `fields[]`, discarded after use, not committed) ran all 18: all
4 valid scenarios at 0 errors, all 14 mutation controls each raising exactly
1 error, and confirmed every `requiredWhen` field reference resolves to a
real field name (0 dangling references). Validated clean with
`node tools/validate.mjs` and `node tools/validate-ajv.mjs`, individually and
as part of the full registry run.
