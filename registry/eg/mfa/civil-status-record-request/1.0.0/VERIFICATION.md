# Verification — `eg/mfa/civil-status-record-request` v1.0.0

## Why this candidate

The recurring "GovSchema Standard Research" routine (this cycle, GOV-3462)
re-scanned `CATALOG.md`'s own live backlog fresh. The most recently-disclosed
open item was the GOV-3447 cycle's own note, made while closing Egypt's
Taxes vertical: "Egypt's Business Formation, DMV, Passport, and Visa
verticals remain re-confirmed weak/dead per the GOV-3410 cycle; National ID
is open, unscreened backlog." The GOV-3410 cycle itself had confirmed
Egypt's domestic civil-registry/ID-card channel is a dead end
(`traffic.moi.gov.eg` is WAF-blocked; other `moi.gov.eg` subdomains are
either account-gated or unreachable), so this cycle searched specifically
for a channel outside the domestic Ministry of Interior portal — Egyptian
consular missions abroad, which other jurisdictions in this registry (e.g.
`th/mfa/thai-national-id-card-application`, `mn/gasr/foreign-passport-application`)
have already established as a legitimate, independently-sourced channel for
civic-document processes when the domestic portal is authenticated/gated.

## Sources examined

### Primary source

- **Authority:** Consulate General of the Arab Republic of Egypt, London
  (Ministry of Foreign Affairs, on behalf of the Civil Status Sector,
  Ministry of Interior), `https://egyptconsulate.co.uk/`.
- **Document — "نموذج: قيد/تجديد/إصدار/إضافة" ("Form: Registration /
  Renewal / Issuance / Addition").**
  - **Landing page (directly retrieved, HTTP 200, plain unauthenticated
    fetch):** `https://egyptconsulate.co.uk/downloadable-forms/`, listed as
    "Renew – Addition Forms" alongside the consulate's visa, passport, and
    nationality forms.
  - **URL (directly retrieved, HTTP 200, plain unauthenticated curl with a
    standard desktop User-Agent, re-fetched a second time this cycle to
    confirm liveness):**
    `https://egyptconsulate.co.uk/wp-content/uploads/2021/01/Add.pdf`
  - **File identity:** genuine PDF (`%PDF-1.6` header), 78,322 bytes,
    `sha256:7f3f3bf5302b39adfe50fb54737e7452e78d8e2285efacab3b78f9a23bb2e8d1`,
    1 page, byte-identical across both fetches. The document's own printed
    header reads "قنصلية جمهورية مصر العربية - لندن - نموذج:
    قيد/تجديد/إصدار/إضافة".
  - **Form type:** a genuine AcroForm PDF — 49 `/Widget` annotations (45
    text fields named `Text1`–`Text45`, 4 checkbox fields named
    `Check Box1`–`Check Box4`), unlike the static print-layout PDF used for
    this registry's `eg/eta/small-enterprise-tax-declaration`.
  - **Extraction method:** `pdfjs-dist@5` (scratch directory, not a
    repository dependency). `page.getAnnotations()` gave each widget's
    field name, type, and rect; `page.getTextContent()` gave each text
    item's string plus its `transform` (x, y) position. Because this is an
    RTL-typeset document, items were grouped into visual rows by y-proximity
    and read right-to-left (descending x) within each row to reconstruct
    the printed reading order, and each widget's rect midpoint was then
    matched to the row/blank-underscore-run it visually falls within.
  - **Rendering attempt — disclosed limitation:** attempted to additionally
    render the page to a PNG via `pdfjs-dist` + `node-canvas` for a
    pixel-level visual check. After fixing an initial Fontconfig
    load failure (`FONTCONFIG_FILE=/paperclip/.config/fontconfig/fonts.conf`),
    the render failed on a different code path than the blank-canvas
    failure previously disclosed in `eg/eta/small-enterprise-tax-declaration`'s
    own VERIFICATION.md: a `TypeError` inside `pdfjs-dist`'s
    `paintInlineImageXObject` / `drawImageAtIntegerCoords`, consistent with
    this specific PDF embedding an inline background image the sandboxed
    `node-canvas` pipeline cannot paint. This is disclosed as a tooling gap
    (a second, distinct symptom of the same underlying sandboxed-render
    limitation), not a claim that the source form lacks content.
  - **Corroboration in place of a visual render:** the semantic field list
    derived from the text/widget-position cross-reference was independently
    sanity-checked by summing the widget count each semantic field implies
    (accounting for multi-widget dates and the two non-widget printed
    option groups described below) against the PDF's actual widget
    inventory. The two totals — 45 text widgets and 4 checkbox widgets —
    matched exactly, which is treated as strong corroboration of the
    row-to-field mapping despite the render-tooling gap.

No corroborating secondary source was sought for this schema beyond the
primary PDF itself: the document is a genuine, directly-fetched, unaltered
government-mission intake form with printed Arabic labels legible from the
extracted text layer, and its own field semantics (personal/passport/
military/professional/marital/contact/address/relative/attachment
particulars) are self-evident from those labels without requiring
cross-validation against a second source, unlike the `eg/eta` schema's
Form 25, whose reading-order ambiguity specifically required corroboration.

## Scope and disclosed boundaries

This schema models the form's single page in full: the request-type
selection; personal particulars (name in Arabic/English, place and date of
birth, religion); passport particulars (number, issuing authority, issue
and expiry dates); military conscription status; professional particulars
(profession on passport, current profession, qualification, specialization,
qualification date); arrival date and marital status (plus conditional
spouse particulars); contact and address details in the country of
residence and in Egypt; a nearest-relative contact in Egypt; two free-text
supplementary request-detail lines; the child-addition sub-request (name,
date and place of birth); and three free-text attached-document
description lines.

Explicitly out of scope, and disclosed rather than silently omitted:

- **The applicant's signature, the "لندن في: / /٢٠٠" signing-date line, and
  the consul's own visa/endorsement block** — none of these three areas has
  an AcroForm widget at all (confirmed: all 45 `Text` widgets are already
  accounted for by the fields above), consistent with this being a
  physically-signed, in-person or postal submission rather than a
  digitally-submitted one. No corresponding `fields[]` entries were added
  for them.
- **Egypt's Business Formation, DMV, Passport, and Visa verticals** —
  re-confirmed weak/dead in the GOV-3410 cycle; not re-screened this cycle.

### Modelling decisions worth disclosing

- **Two printed option groups have no corresponding AcroForm widget**: the
  four request-type labels (قيد/تجديد/إصدار/إضافة) in the header, and the
  three military-conscription-status options
  (أداء الخدمـة/إعفـاء مؤقت/إعفـاء نهــائي). The physical form expects these
  to be marked by hand rather than typed. Both are still modelled as
  `enum` fields here (`requestType`, `conscriptionStatus`) — the same
  treatment this registry's `eg/eta/small-enterprise-tax-declaration`
  schema gave its own non-fillable `businessVolumeBracket` selector —
  since the data is meaningful and part of the form's own printed
  structure, even though no digital widget backs it.
- **Multi-widget dates are collapsed into single `date`-typed fields.**
  `dateOfBirth`, `passportIssueDate`, `passportExpiryDate`,
  `qualificationDate`, and `arrivalDate` are each backed by 3 separate
  text widgets on the source form (day/month/year, with `dateOfBirth` and
  `passportExpiryDate` additionally having a literal printed "19"/"20"
  century prefix before their 2-digit year widget) — modelled as one
  semantic `date` field each, consistent with how this registry's
  `eg/eta` schema modelled `taxPeriodFrom`/`taxPeriodTo` as single `date`
  fields rather than separate day/month/year fields.
- **`relativePhoneNumber1`/`relativePhoneNumber2` — only two fields, not
  three.** The "رقم الهاتف:" row's text layer shows three period-separated
  blank segments, but only two AcroForm widgets actually exist at that
  row's y-position; the field count here follows the true widget count
  rather than the visually-implied segment count.
- **`addressInUk` is one semantic field despite spanning two widgets.** The
  source form's country-of-residence address blank wraps across two
  separate ruled underscore lines (two widgets), which is modelled as one
  logical address string with a generous `maxLength` rather than two
  separate fields, since both widgets record the same logical value.
- **`spouseName`/`spouseNationality` are `requiredWhen maritalStatus
  equals married`** — a reasonable inference from context (a "spouse"
  field is only meaningful for a married applicant) rather than an
  explicit conditional instruction printed on the form itself, disclosed
  here as an interpretive judgment call.
- **`childName`/`childDateOfBirth`/`childPlaceOfBirth` are `requiredWhen
  requestType equals addition`** — the form's own printed item 3 text
  ("٣-إضافة نجلي/كريمتي____مواليد____في____") explicitly labels this
  sub-request as the "إضافة" (addition) case, unlike the generic blank
  lines 1–2 above it.
- **`additionalRequestDetail1`/`additionalRequestDetail2` are free text**,
  modelling the form's own two generic blank declaration lines (items 1–2
  under "أرجو التفضل بالموافقة علي:ـــ") that precede the child-addition
  line (item 3) — the form provides no further printed structure for what
  belongs on these two lines beyond the general request-approval heading.
- **`requiredWhen` gates use `equals`, never `notEquals` against an
  optional field** — following this registry's own established
  `notEquals`-empty-string-absent-field bug avoidance practice.

## Conformance fixtures

Fixtures are committed under
`conformance/eg/mfa/civil-status-record-request/1.0.0/`: two valid
submissions (a minimal single, renewal-type applicant with no spouse/child
sub-request; a fuller married applicant filing an addition request with a
child, both optional relative-phone fields, and both request-detail lines)
plus eight mutation-control fixtures, one per `required`/`requiredWhen`/
`validation` rule exercised: one missing unconditionally-required field
(`currentProfession`); three `requiredWhen`-gated missing fields (spouse
name when married, child name when requestType is addition, child place of
birth when requestType is addition); two invalid enum values
(`maritalStatus`, `requestType`); one below-`minLength` empty string
(`fullNameArabic`); and one above-`maxLength` string
(`additionalRequestDetail1`). All ten fixtures (8 mutation + 2 valid) were
checked with a from-scratch, throwaway Node mock validator implementing
this schema's own `required`/`requiredWhen`/`validation` rules (not
committed — consistent with this registry's established per-cycle
practice): 10/10 fixtures behaved as expected. Both `tools/validate.mjs`
and `tools/validate-ajv.mjs` pass across the full registry with this schema
added (525/525); `tools/verify-sources.mjs`, scoped to this schema's
directory, reports the cited URL clear.

## Known gaps

- No further Egyptian civic-document channel was screened this cycle
  beyond this consular form; the domestic Ministry of Interior National ID
  card process (`moi.gov.eg`) remains confirmed account-gated/WAF-blocked
  per the GOV-3410 cycle, unchanged.
- This schema's field semantics rest on a position-sorted text/widget-rect
  cross-reference rather than a pixel-level visual confirmation of the
  source PDF's layout (see "Rendering attempt" above) — worth a follow-up
  visual re-check in a future cycle with a working render path.
- The consulate's own broader "Downloadable Forms" page lists companion
  forms (visa, passport, nationality, "Acquiring Egyptian Nationality",
  bank details for صندوق تحيا مصر) not modelled here, left as potential
  future companion-schema candidates if a genuinely new vertical/process
  is identified among them.

## Verification method assessment

`manual-source-review-v1` — a human/agent read the primary source directly
(both its AcroForm widget inventory and its position-sorted text layer) and
transcribed its fields, cross-checking the resulting semantic field count
against the source's own widget count as an internal consistency check in
place of a visual render (which failed in this sandboxed environment). No
automated re-verification tooling exists yet for this schema; `nextReviewBy`
is set 6 months out per the practice's default cadence.
