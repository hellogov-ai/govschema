# Verification record — pg/ipa/business-name-registration@1.0.0

## Candidate selection

GOV-5791 ("GovSchema Standard Research"). Re-scanned `CATALOG.md` fresh
first: Pakistan's FBR "Manual Return" workbook backlog (Annexes A-F) had been
closed outright by the immediately preceding GOV-5782 cycle, and the standing
16-jurisdiction "5 of 6 verticals" re-screen list (AE, BA, BR, CZ, GR, ID, JM,
MK, MN, MT, NO, PL, RW, SK, TN, TT) had already been reconfirmed a dead end
across 8 consecutive prior cycles (GOV-5731 through GOV-5782). Rather than
re-screen that same list a 9th time, this cycle scouted genuinely new
jurisdictions, delegating three parallel scouting passes across 18 countries
entirely absent from the 100-jurisdiction registry: Angola, Mozambique,
Cameroon, Democratic Republic of the Congo, Sudan, Malawi (Sub-Saharan
Africa); Suriname, Guyana, Belize, Nicaragua, Honduras, Cuba (Latin
America/Caribbean); Montenegro, Kosovo, Bahrain, Kuwait, Papua New Guinea,
Fiji (Balkans/Middle East/Pacific) — each pass required an actual
`WebFetch`/`curl` confirmation (HTTP status, byte size, real field content,
not a login-gated info page), not a memory-based guess.

Several reachable, unauthenticated candidates came back: a DR Congo passport
AcroForm (34 named fields, embassy-mirror hosted), a Belize ePassport
application (immigration.gov.bz, actively versioned), a Suriname income-tax
return, and — the richest field-wise of every candidate found — Kosovo's
ARBK Form A0 (LLC registration, `arbk.rks-gov.net`, HTTP 200, 2,731,296
bytes). Kosovo was **not** authored: a prior cycle (GOV-4713, 2026-07-24) had
already scouted this exact same form and flagged it as a governance
question, not a build one — Kosovo has no ISO 3166-1 alpha-2 country code
(contested statehood, not an ISO member), and this registry's own
`jurisdiction.country` field (`spec/v0.3/govschema.schema.json`) requires
one. Adopting a non-ISO code (e.g. the widely-used but non-ISO "XK") would
set a precedent for how this registry handles non-ISO-recognized territories
generally, a call for the Founding Engineer/CEO to make, not this cycle to
decide unilaterally. That standing flag is re-confirmed, not overturned,
here.

Papua New Guinea's IPA Form A-17 ("Application for registration of business
name") was the strongest genuinely-buildable candidate found this cycle:
hosted directly on the Investment Promotion Authority's own official
domain (`ipa.gov.pg`), no login/CAPTCHA/WAF gate, an uncontested ISO code
(`PG`), and the richest field set of any candidate found this cycle (11
pages) — richer than PNG's own sibling Form A-2 (overseas company
registration, 4 pages) found in the same scouting pass. This opens Papua
New Guinea as the registry's 101st jurisdiction via Business Formation.

## Reaching the live source

Independently re-fetched `https://www.ipa.gov.pg/documentation/pg/form-a-17.pdf`
directly via plain `curl`:

- HTTP 200, 911,150 bytes — byte-identical to this cycle's own scouting pass.
- sha256 `c3c3147e3bf2ab87c780caa81946b0928f2fb936716f61e1213026bf94270f00`.
- No login, CAPTCHA, or WAF/JS-challenge gate blocks reaching or reading this
  file.
- Confirmed a genuine native (searchable-text) PDF, not a scanned image: a
  clean `pdfjs-dist` text-layer extraction across all 11 pages recovered
  every printed label with no glyph-mapping or OCR workaround needed.

The form itself cites its own statutory basis directly in its header
("Section 4(1), Business Names Act 2014"), corroborating both its currency
and its status as the Investment Promotion Authority's own official
implementing form for that Act.

## Extraction method

Extracted with `pdfjs-dist` (vendored install at `/tmp/node_modules`,
CommonJS build at `legacy/build/pdf.js`), reading each page's flattened
`getTextContent()` output first for a full-document pass, then
re-extracting pages 10-11 with each text item's own `transform` x/y position
to resolve a genuine layout ambiguity on the form's final page: the raw
text stream interleaves "8. Checklist" between the "7. Lodged by" section
header and its own two-column answer block. Position-based re-extraction
showed: at y≈491, "7. Lodged by" (left column header, x≈93.6); at y≈479.9,
"Other contact details:" (a right-column sub-header, x≈351.8); at y≈475.6,
"Name:" (left column); at y≈465.0/y≈406.7, "Telephone:"/"Address:" (right
and left columns respectively); at y≈410.2, "Email (optional):" (right
column) — all positioned above "8. Checklist" (y≈328.2) and its own single
data-free line ("The prescribed fee must accompany this form.", y≈299.8).
This confirms Name/Address (left column) and "Other contact
details" — Telephone/Email (right column) — are genuinely Section 7's own
two-column answer fields, not Section 8's; Section 8 itself carries no
applicant-supplied data field of its own, only the prescribed-fee checklist
item modelled as a `documents[]` entry.

## Structure and scoping decisions

Models 125 `fields[]` across 8 steps (Proposed Business Name; Addresses;
Owners — Natural Persons [bounded 3 slots]; Owners — Registered PNG Entity
[single block]; Owners — Foreign Unregistered Entity [single block];
Business Activity and Commencement Date; Signed by Authorised Person(s)
[bounded 4 slots]; Lodged By) plus 2 `documents[]` (the prescribed fee,
`category: payment`; and the form's own verbatim certification statement,
`category: attestation`). Disclosed scoping decisions:

1. **Section 2B's own unbounded "additional places of business" instruction
   is excluded.** The source directs the applicant to "attach a separate
   sheet containing the information set out in the prescribed format" with
   no printed maximum — this registry's established unbounded-attachment
   exclusion pattern (the same reasoning already applied to, e.g., this
   same form's own Section 3's "First/Second/Third owner" cap being modelled
   directly instead, since that section *does* print a bounded slot count).

2. **Every owner-block field across Sections 3A/3B/3C is modelled
   bare-optional**, even though several are printed "(required)" on the
   source (e.g. "Full legal name (required)" in both 3A and 3C). Ownership
   of the business name may sit entirely with any one of the form's three
   mutually-exclusive owner-type subparts — natural person (3A), a PNG-
   registered entity (3B), or a foreign, PNG-unregistered entity (3C) — with
   no printed either/or checkbox this schema could safely gate a
   `requiredWhen` condition on. Inventing an unprinted eligibility signal
   (or gating on `notEquals ""` against another optional field) is exactly
   this registry's own standing anti-pattern (see
   `notequals-empty-string-absent-field-bug`); every owner field is instead
   left bare-optional, consistent with this registry's existing precedent
   for a conditionally-applicable, unprinted-signal section (e.g.
   `al/dpt/individual-annual-income-declaration` boxes 15/16).

3. **Section 3A's own printed "First/Second/Third owner" 3-slot capacity is
   modelled directly**, with no invented `numberOfOwners` count field —
   mirroring this same form's own Section 1 "Preferred/Second-option/
   Third-option business name" pattern, which likewise prints exactly three
   bounded slots with no accompanying count field.

4. **Gender is a genuine two-option enum** (`Male`/`Female`), confirmed via
   the printed checkbox pair on the source ("Gender ... Male   Female") —
   unlike some sibling registry forms (e.g.
   `zm/pacra/company-incorporation`'s own `Gender` field) where the
   equivalent field prints no options at all and is modelled as a free
   string instead.

5. **`commencementDate`'s own printed "may not be more than three months
   after the date of registration" business rule is disclosed in its
   `description`, not encoded as `crossFieldValidation`.** This schema has
   no separate registration-date field for it to compare against (the
   registration date is not known at the time this form is completed).

6. **Section 6's own 4 authorised-signer slots are modelled as a bounded
   4-slot block, with only the first slot's fields (`signer1*`) statically
   required**, mirroring the Section 3A owner-slot convention (first slot
   assumed necessary — a business name application needs at least one
   signatory — later slots bare-optional).

7. **Entity Type, in both Section 3B and Section 3C, is modelled as a free
   `string`, not `enum`.** The source prints only a blank "Entity Type"
   label in both places, with no enumerated options anywhere on the form —
   unlike, e.g., `zm/pacra/company-incorporation`'s "Identity Type" field,
   which does print its own enumerated vocabulary in accompanying
   instructional text.

8. **`primaryBusinessActivity`'s 17-value enum is transcribed verbatim**
   from the source's own Section 4 checkbox list, an International Standard
   Industrial Classification (ISIC)-style set of sections (Agriculture
   through Extra-territorial organization and bodies), confirmed against
   the plain-text extraction pass with no ambiguity in option boundaries.

## Conformance

3 valid mock scenarios — `valid-minimal-sole-natural-person-owner` (a single
natural-person owner, no second/third owner or signer, no registered/foreign
entity blocks); `valid-full-two-owners-two-signers` (a fully-populated
natural-person-owner scenario exercising every optional Section 1/2/3A
field, a second owner, and a second authorised signer); and
`valid-registered-entity-owner` (Section 3B's registered-PNG-entity owner
used in place of any Section 3A natural-person owner, with the sole
authorised signer designated "Authorised person" rather than "Owner") — plus
8 mutation-control fixtures (6 missing-required fixtures, one per step
carrying a statically required field: `preferredBusinessName`,
`principalAddressLine1`, `postalEmailAddress`, `primaryBusinessActivity`,
`signer1PrintedName`, `lodgedByName`; an invalid-enum-value fixture against
`primaryBusinessActivity`; and an unknown-field-rejected fixture) — are
committed under `conformance/pg/ipa/business-name-registration/1.0.0/`.

An ephemeral, from-scratch conformance checker (deriving required rules
directly from this schema's own `fields[]`, discarded after use, not
committed) ran all 11 fixtures: all 3 valid scenarios at 0 errors, all 8
mutation controls each raising exactly 1 error (6 missing-required, 1
invalid-enum, 1 unknown-field). Validated clean with
`node tools/validate.mjs` and `node tools/validate-ajv.mjs`, individually and
as part of the full registry run.

## Outcome

Opens Papua New Guinea as the registry's 101st jurisdiction, via Business
Formation (1 of 6). DMV, Visa, Passport, Taxes, and National ID are open,
unscreened backlog for a future cycle — this cycle's own scouting pass did
not screen PNG's other five verticals beyond this Business Formation
candidate. Kosovo's ARBK Form A0 remains disclosed, ready-to-author backlog
pending the Founding Engineer/CEO's own governance decision on non-ISO
country codes.
