# Verification record — zm/zra/individual-income-tax-return@1.0.0

## Candidate selection

GOV-4287 ("GovSchema Standard Research"). The GOV-4271 cycle (opening Zambia
as the registry's 77th jurisdiction via `zm/pacra/company-incorporation@1.0.0`,
Business Formation) pre-scouted and banked Zambia's Taxes candidate as
disclosed, STRONG open backlog: a Zambia Revenue Authority (ZRA) PDF,
`Income-Tax-Return-for-Individuals.pdf` (Form ITF 46_1 V001), left unauthored
at the time in favor of the smaller-scope Passport candidate (subsequently
authored in GOV-4278). This cycle authors that banked candidate, opening
Zambia's Taxes vertical (3 of 6). The GOV-4271 cycle's own banked URL
(`.../2023/06/Income-Tax-Return-for-Individuals.pdf`) now 404s; this cycle's
issue corrected it to a currently-live `.../2020/06/...` path, confirmed
directly (see below).

## Reaching the live source

Fetched
`https://www.zra.org.zm/wp-content/uploads/2020/06/Income-Tax-Return-for-Individuals.pdf`
directly:

- HTTP 200, `Content-Type: application/pdf`, `Content-Length: 1078188` bytes,
  `Last-Modified: Sat, 02 Apr 2022 10:01:58 GMT`.
- No login, CAPTCHA, or WAF gate blocks reaching or reading this file —
  confirmed via a plain unauthenticated `curl` request with no session/cookie
  state (only a TLS certificate-verification bypass was needed to reach the
  host from this session's network egress; the certificate itself is not
  otherwise implicated in this finding).
- sha256 `fc1bde9aec0cac29b892acedb252ba1321bbd82e6e403380b1a9cd1498c58484`.
- PDF header `%PDF-1.5` at byte 0 — a genuine native (searchable-text) PDF,
  not a scanned image, confirmed by clean `pdfjs-dist` text-layer extraction
  across all pages.

## Extraction method

Extracted with `pdfjs-dist` (vendored from an existing session scratch
install at `/tmp/node_modules`, CommonJS build at
`legacy/build/pdf.js` since this vendored copy ships no ESM entry point),
reading each text item's raw string and its `transform` x/y position across
all 19 pages. Separately rendered pages 1-4, 15, 16, and 17 to PNGs at 2x
scale via `node-canvas` (`/tmp/node_modules/canvas`) to visually confirm true
table/column layout and, specifically, which cells the source document
itself shades grey — every grey-shaded cell corresponds one-to-one with a
formula/total line identified independently from the text-position
extraction (e.g. Section B's "Total Fixed Assets", "Total Investments" rows),
cross-corroborating the computed-vs-directly-supplied line classification
this schema's scoping relies on. (Embedded-font glyph outlines did not fully
rasterize in this environment — `getPathGenerator` "object that isn't
resolved yet" warnings — so the rendered PNGs are only used to confirm ruled
table/shading structure, not as a substitute for the clean text-layer
extraction, which read every field label correctly.)

## Document structure

The 19-page form (each page footer-stamped "ITF 46_1 V001") is a combined
individual income tax return covering, in order: page 1, Taxpayer Details;
page 2, Part 1 Rental Income and the start of Part 2 (Section A Summary Tax
Payable, Section B Statement of Financial Position); pages 3-4, Section B
continued; pages 5-11, Section C (Statement of Comprehensive Income) and
Section D (Computation of Chargeable Income from Business, repeated for up
to 3 income sources plus continuation sheets); pages 12-13, Schedule 1
(Capital Allowances, Parts I-IV); pages 13-14, Schedule 2 (income of other
persons), Schedule 3 (current-year losses), Schedule 4 (prior-year losses);
pages 14-15, Section E (Details of Share of Profit from Partnership Firms,
a/b); pages 15-16, Section F (Employment Income, Employer 1 and Employer 2);
page 16, Section G (Interest in Companies); page 17, Section H (Declaration);
pages 17-18, filing-instructions notes (not applicant-supplied data); page
19, a disclaimer stating the PDF itself is "FOR GUIDANCE ONLY" and "SHOULD
NOT BE SUBMITTED TO ZAMBIA REVENUE AUTHORITY" (i.e. the live, submittable
return is filed through a separate system/process; this PDF is ZRA's own
published reference copy of the form's field layout, the standard sourcing
basis this registry uses for forms of this kind).

## Scope

This schema models 4 of the form's own printed sections/schedules in full —
Taxpayer Details, Part 1 Rental Income, Section B Balance Sheet, Section F
Employment Income — plus Section G and Section H, and excludes the business/
self-employment income computation entirely (Section A, Section C, Section
D, Schedules 1-4, Section E), per the issue's own scope guidance to follow
this registry's narrow-scoping precedent (e.g. Latvia's own D3/D3¹/GD
exclusions) rather than force-fit a 19-page, multi-schedule form into one
v1.0.0 document. The excluded sections are a coherent, separable unit — a
Zambian taxpayer with only rental and/or employment income (this schema's
scope) never touches them — and are disclosed here as the natural follow-on
companion-schema candidate for a future PATCH/minor, not silently dropped.

Within the sections this schema does cover, every printed formula/subtotal
line (e.g. Section B's "Total Fixed Assets (a+b+c+d+e+f+g)", "Net Book Value
... (h-i)"; Section F's "TOTAL TAXABLE INCOME FROM EMPLOYMENT [1+2+3+4-5-6-7]",
"Tax on employment income Before Tax Credit", "Net Tax from Employment
[9-10]") is excluded from `fields[]`, per this registry's standing closed
decision to defer calculated/derived fields (GSP-0013 §7, "Calculated /
derived fields — recommend deferring", founder-confirmed on GOV-302) — only
the lines a taxpayer directly supplies are modelled. Each excluded line's
own field description cites the formula it would have computed, so the gap
is visible rather than silent.

Models 107 `fields[]` across 6 steps (Taxpayer Details; Part 1 Rental Income;
Section B Statement of Financial Position; Section F Employment Income;
Section G Interest in Companies; Section H Declaration). No `edition` axis
is used (unlike, e.g., `us/irs/individual-income-tax-return-1040`'s
per-tax-year editions): this form's own "Charge Year" is a single blank the
filer fills in on a single, undated generic template (matching this
registry's existing `kz/kgd/*`/`ua/dps/*` tax-return precedent, which model
the filing year as an ordinary data field rather than a schema edition).

## Disclosed findings and interpretation choices

1. **`middleName` is modelled `required: false`** despite page 1's own
   blanket note, "All fields on page 1 are mandatory," since a substantial
   share of individual taxpayers have no middle name and the form provides
   no "N/A" convention to otherwise satisfy a hard requirement.
2. **Sr No 3-6 (Postal Address, Physical Address, E-mail Address,
   Telephone/Cell Number) are modelled `required: false`**, per that same
   table's own qualifying sub-heading, "Taxpayer Details (only fill in 3 to
   6 if there has been any changes)" — a more specific, narrower rule than
   the page's blanket mandatory note, and the one this schema follows for
   these four items specifically.
3. **`priorReturnAcknowledgementReceiptNumber` is a disclosed addition with
   no printed label on page 1 itself.** Page 1 prints only "Original/Amended"
   tick boxes, "Reason for amendment", and "Attachments if any" — no visible
   box for an acknowledgement receipt number. Page 18's own filing
   instructions state "If you had submitted an original return earlier
   please enter the acknowledgement receipt number issued to you in the
   space provided at item 2 on the first page of the return," establishing
   that such a value belongs somewhere on page 1 for an amended return even
   though no printed label accompanies it there. Modelled `requiredWhen
   isAmendedReturn` rather than silently dropped.
4. **`attachmentsIfAny` collapses the form's two blank numbered lines ("1."
   / "2.") into one free-text field**, since neither line carries its own
   distinct label.
5. **Employer 2's fields carry no eligibility gate** (e.g. no fabricated
   `hasSecondEmployer` boolean): the form prints Employer 1 and Employer 2 as
   two structurally identical, unconditional blocks with no printed count or
   yes/no signal distinguishing "one employer" from "two employers" — the
   same disclosed no-printed-signal treatment this registry's
   `et/ics/passport-application` and this schema's own Tax-Agent fields (finding
   6) use for their own analogous ungated optional fields. Both employer
   blocks are therefore bare-optional at the field level.
6. **The Tax Agent block (`taxAgentFullName`/`taxAgentSignature`/
   `taxAgentCapacity`) is bare-optional**, since the form prints no checkbox
   distinguishing a self-filed return from an agent-prepared one.
7. **Section G's second related-party slot
   (`relatedParty2BusinessName`/`Tpin`/`SharesInterestControlled`) is
   bare-optional even when `hasRelatedPartyTransactions` is true** — the
   source prints exactly two blank table rows with no numbering or count
   field, so only the first slot is `requiredWhen hasRelatedPartyTransactions`
   equals `true`; a filer with only one related-party transaction leaves the
   second slot empty.
8. **`profitLossForYear` (Section B, line 7.f) is the only balance-sheet
   money field modelled without a `minimum: 0` constraint**, since it is
   explicitly a profit-or-loss figure and may be negative; every other
   balance-sheet line is a plain asset/liability/reserve amount constrained
   to `minimum: 0`.
9. **The Zambia Revenue Authority's own published copy of this form is
   watermarked "FOR GUIDANCE ONLY" and its final page states "THIS MANUAL
   RETURN IS MEANT FOR GUIDANCE ONLY AND THEREFORE IT SHOULD NOT BE
   SUBMITTED TO ZAMBIA REVENUE AUTHORITY."** This is disclosed as a
   sourcing characteristic, not a defect: it is ZRA's own live, currently
   published reference copy of the return's field layout (the standard
   sourcing basis this registry uses), and the live submission channel
   (ZRA's e-filing portal or in-person office submission per page 18's own
   "Filing Requirements" note) is a separate process this schema does not
   model or claim to be.
10. **Excluded as official-use-only fields, not applicant-supplied data:**
    page 1's "FOR OFFICIAL USE ONLY" block (Officer's Name/Signature/Date
    Received, Receiving Office Date Stamp).

## Conformance

3 valid mock scenarios — `valid-rental-income-only` (an individual with only
Part 1 rental income and a signed declaration, no balance sheet, employment,
or related-party data populated); `valid-employment-and-balance-sheet` (an
individual with a full Section B balance sheet and two Section F employers
populated, exercising every balance-sheet and both employer field blocks);
and `valid-amended-return-with-related-party` (an amended return exercising
`isAmendedReturn`'s two `requiredWhen` fields and `hasRelatedPartyTransactions`'s
first related-party slot) — plus 10 mutation-control fixtures (one missing
statically-required field from each of `tpin`, `foreName`, `lastName`,
`accountingPeriod`, `isAmendedReturn`, `hasRelatedPartyTransactions`,
`taxpayerFullName`, `taxpayerDeclarationSignature` — 8 fixtures; one
missing-required fixture for a `requiredWhen`-gated field —
`amendmentReason` — correctly triggered in its own scenario; and an
unknown-field-rejected fixture) are committed under
`conformance/zm/zra/individual-income-tax-return/1.0.0/`.

An ephemeral, from-scratch conformance checker (deriving required/
requiredWhen rules directly from this schema's own `fields[]`, discarded
after use, not committed) ran all 13 fixtures: all 3 valid scenarios at 0
errors, all 10 mutation controls each raising exactly 1 error, and confirmed
every `requiredWhen` field reference resolves to a real field name (0
dangling references). Validated clean with `node tools/validate.mjs` and
`node tools/validate-ajv.mjs`, individually and as part of the full registry
run.
