# Verification record — na/mhaiss/visa-application@1.0.0

## Candidate selection

GOV-4516 ("GovSchema Standard Research"), delegated by GOV-4513 after that
cycle re-scanned Namibia's two remaining backlog candidates (BIPA CC1
Business Formation, this MHAISS Visa form) and found both had gone stale
since GOV-4488's original scouting pass. Namibia's Taxes vertical is
already published as `na/namra/return-of-income-individuals@1.0.0`
(GOV-4491); this schema is the second Namibia vertical (Visa). A sibling
cycle (GOV-4515) authors Namibia's Business Formation form (BIPA CC1)
independently in a separate worktree/PR.

## Reaching the live source

Fetched the friendly direct-download URL GOV-4513 re-resolved (the shorter
`view_file/{id}` URL form is known from prior scouting to falsely report
"document could not be found" for this exact form):

`https://mha.gov.na/documents/292728/582288/Visas+Application.pdf/c6d9c9b7-49ba-b0e6-fb40-2b3213544664?t=1741771353038&download=true`

- Plain unauthenticated `curl` request, no session/cookie state, no
  CAPTCHA/WAF challenge.
- HTTP 200, `Content-Type: application/pdf`, **82,771 bytes** — an exact
  byte-for-byte match with the size GOV-4513 flagged before delegating.
- PDF header `%PDF-1.7\r\n` at byte 0.
- sha256 of the retrieved bytes:
  `a48c2cf18ca0ca3b3398a677ea874f3c6720cf1100f603cb5a849af1b4a787d2`.
- 2 pages, confirmed via `pdfjs-dist`'s `numPages`, matching the delegating
  issue's own page count.
- `getAnnotations()` returned **zero `/Widget` annotations** on both
  pages — a flat, print-and-fill specimen, not an interactive AcroForm PDF.

## Extraction method

`pdfjs-dist` (vendored at `/tmp/node_modules/pdfjs-dist`, installed fresh
this cycle) `getTextContent()` read every text item's raw string and
`transform` x/y position on both pages, grouped into printed rows by
rounded y-coordinate (±2pt) and sorted by x-coordinate to reconstruct
column order. The document is plain English with clean, non-rasterized
embedded fonts — text extracted cleanly with no glyph-mapping/encoding
failure of the kind this registry has hit on some non-English gov PDFs.

Both pages were additionally rendered to PNG via `pdfjs-dist` +
`node-canvas` at 2.5x scale and visually inspected in full, to independently
confirm every checkbox pair (Sex; Marital Status; each Yes/No question),
grid/table row count, and the page-2 Part A/B layout that the text layer
alone could not fully disambiguate — in particular:

- Item 19's accompanying-wife-and-children table has exactly **3** rows
  (a)-(c), not more (initial scouting notes described this only as "a
  table," with no row count).
- Part A, Item 6's relatives-in-Namibia table has exactly **2** rows
  (a)-(b).
- Part B, Item 2's residence-particulars table has exactly **3** rows.
- Part B, Item 3's countries-to-be-travelled line has exactly **4** blanks
  (a)-(d).
- Item 13 (Citizenship) prints only **one** blank followed by a
  parenthetical instruction ("If acquired by naturalization, state original
  citizenship") — not a second blank for a separate "original citizenship"
  field. Confirmed visually; modelled as a single `citizenship` field with
  the instruction folded into its `description`, not a second field (an
  initial reading of the raw text-layer row, before the row was visually
  cross-checked, would have suggested two answers).
- The "FOR OFFICIAL USE ONLY" box (Approved/Not Approved, Single/Multiple
  Entry, File No., Date of issue, Date of expiry, Remarks, Signature, Date)
  sits at the same page-1 y-coordinates as several applicant question rows
  (items 6-9), which the text-layer row-grouping briefly merged into a
  single logical row (e.g. item 8's question line and the office box's own
  "Date:" label extracted at the same y-coordinate). Visually confirmed via
  the rendered page image that this is a separate officer-only box, not an
  applicant-supplied date attached to item 8 — excluded from `fields[]`
  entirely, consistent with this registry's standing treatment of
  officer/office-only boxes.
- Item 10's Yes/No checkboxes and every other page-1 Yes/No pair render as
  two clearly bounded, symmetric boxes (both options boxed) — no printed
  checkbox asymmetry of the kind disclosed in some other registry visa
  schemas (e.g. `bw/dic/visa-application`'s Sex field).

## Document structure

**Page 1** — header (Republic of Namibia, Ministry of Home Affairs,
Department of Civic Affairs, Immigration Control Act 1993, Form 3-1/0033),
a "FOR OFFICIAL USE ONLY" box (excluded, officer-only), Items 1-3 (name
particulars), Items 4-10 (checkbox/Yes-No eligibility declarations, with
Item 10 the long tropical/communicable-disease and mental-illness
question), Item 11 (an instruction to attach full particulars if items 6-9
were answered affirmatively — modelled as a conditional `documents[]`
entry, not a field), Items 12-14 (birth, citizenship, passport), Items
15-16 (present address and country-of-permanent-residence address, each
with phone sub-fields), Items 17-18 (occupation/employer), Item 19 (a
3-row accompanying-wife-and-children table), Item 20 (funds available,
onward/return ticket).

**Page 2** — headed "NOTE: COMPLETE ONLY PART A OR B", then:

- **(A) Holiday/Business/Work/Transit Visa** — Items 1-10: arrival
  date/port, purpose of visit (with a business-nature sub-line), duration,
  places to be visited, medical-treatment sub-fields (doctor/hospital,
  payer, funds if liable), proposed residential address in Namibia,
  relatives-in-Namibia table (2 rows), date of last visit, professional-
  contribution question, destination-after-Namibia details (destination,
  mode of travel, departure day/port, whether entry is assured), and
  reasons for travelling through Namibia (the transit-specific question).
- **(b) Return Visa** — an "IMPORTANT" instruction block (produce
  passport/travel document; submit proof of residence rights if not
  endorsed in passport — both modelled as conditional `documents[]`
  entries), then Items 1-4: kind of permit and number, departure/expected-
  return dates, a 3-row residence-in-Namibia particulars table, a 4-slot
  countries-to-be-travelled line, and purpose of journey.
- A single Declaration (date + signature) at the very bottom of page 2,
  applicable regardless of which Part was completed.

## Scope: the Part A/B discriminator

The source's own page-2 instruction — "NOTE: COMPLETE ONLY PART A OR B" —
is a genuine mutually-exclusive choice between two differently-shaped
blocks of fields, not two independently-optional sections. Modelled via a
single required `visaCategory` enum field (`HOLIDAY_BUSINESS_WORK_TRANSIT`
/ `RETURN_VISA`), whose value gates every Part-specific field's
`visibleWhen` (GSP-0013 §2), with `requiredWhen` additionally applied,
using the identical condition, to the fields that are mandatory *within*
whichever Part is selected (e.g. `purposeOfVisit`/`durationOfIntendedVisit`
in Part A; `permitKindAndNumber`/`purposeOfJourney` in Part B). This
follows this registry's established discriminator-field convention (e.g.
`zm/pacra/company-incorporation`'s `isBodyCorporate` boolean gating natural-
person vs. body-corporate fields; `ug/mowt/driving-licence-application`'s
`applicationType`/`licenceDuration` `in`-operator cross-tab) rather than
GSP-0013's boolean-only `exclusivityGroups` mechanism, which is scoped to
pairs of boolean fields and does not fit a two-sided, many-fields-per-side
choice like this one. `exclusivityGroups` was considered and rejected for
this reason.

Not every Part-specific field is `requiredWhen`-gated: fields that are only
conditionally applicable *within* their own Part (e.g. Part A's medical-
treatment sub-fields, only relevant if the visit's purpose is medical
treatment; Part A's relatives-in-Namibia table and Part B's residence/
countries tables, all bounded-repeating and optional even at row 1) are
`visibleWhen`-gated on `visaCategory` only, left `required: false` bare —
consistent with this registry's standing convention of not fabricating an
unprinted conditional tie between an optional free-text/enum field and a
second field it has no explicit checkbox link to.

## Scope: fields excluded

- The page-1 "FOR OFFICIAL USE ONLY" box in its entirety (Approved/Not
  Approved, Single/Multiple Entry, File No., Date of issue, Date of expiry,
  Remarks, Signature, Date) — officer-only, not applicant-supplied.
- Item 11's "attach full particulars" instruction is not itself a field;
  modelled as a conditional `documents[]` entry (`requiredWhen` an `any`
  of the four items 6-9 booleans equalling `true`).
- Part B's "IMPORTANT" produce-passport / submit-proof-of-residence-rights
  instructions are modelled as two conditional `documents[]` entries
  (`identity-document` and `supporting-evidence` respectively), not fields.

## Scope: judgment calls on requiredness

This source has no asterisk/mandatory marking convention of its own (like
several other registry sources), so requiredness was assigned by
engineering judgment: core identity/eligibility/passport/present-address/
occupation/funds/declaration fields are `required: true`; secondary contact
details (telephone numbers), employer/business sub-fields, the accompanying-
family table, and every bounded-repeating-table row are `required: false`.
Two disclosed judgment calls worth flagging explicitly:

1. **`permanentResidenceAddress`/`permanentResidencePeriod` (Item 16)
   modelled required**, on the reasoning that every applicant has some
   country of permanent residence to state (which may be identical to or
   different from the present residential address in Item 15) — unlike the
   Item 15 present-address phone sub-fields, which are secondary contact
   details left optional.
2. **`destinationEntryAssuredDetails` (Part A, Item 9(d)) modelled as a
   free-text string, not a boolean.** The source prints this as a single
   open answer line with no Yes/No checkbox pair (unlike every other
   yes/no question on this form, which prints two boxed options) —
   confirmed visually via the rendered page-2 image. Its associated "(proof
   to be submitted)" instruction is modelled as a plain-optional
   `documents[]` entry rather than `requiredWhen`-gated against this field,
   per this registry's documented notEquals-against-an-absent-optional-
   field bug class.

## Conformance

2 valid mock scenarios (a Part A Holiday/Business/Work/Transit applicant;
a Part B Return Visa applicant) plus 1 mutation-control fixture (Part A
selected with its own `purposeOfVisit` omitted) were run through an
ephemeral, from-scratch condition evaluator (deriving `visibleWhen`/
`requiredWhen`/`required` resolution directly from this schema's own
`fields[]`/`documents[]`, discarded after use, not committed): both valid
scenarios resolved with zero missing required fields, and the mutation
control correctly flagged exactly the one omitted field
(`purposeOfVisit`) as missing. The `fullParticularsOfAffirmativeReply`
document's `any`-condition and the `passportOrTravelDocument`/
`proofOfResidenceRightsInNamibia` documents' `visaCategory`-gated
`requiredWhen` were each independently evaluated true/false against the
expected inputs.

Validated clean with `node tools/validate.mjs` and `node
tools/validate-ajv.mjs` (ajv 2020-12 against `spec/v0.3/govschema.schema.json`).
`registry-index.json` regenerated via `npm run build-index` in
`tools/govschema-client/`.

Models 90 `fields[]` across 12 steps, plus 5 `documents[]` entries (2
unconditional-within-their-Part, 3 conditionally gated).
