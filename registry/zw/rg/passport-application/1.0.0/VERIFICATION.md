# Verification record — zw/rg/passport-application@1.0.0

## Candidate selection

GOV-4480 (child of GOV-4476, "GovSchema Standard Research"). Opens Zimbabwe's
Passport vertical (2 of 6), following GOV-4470's `zw/zimra/itf1-employment-income-return`
(Taxes, 1 of 6) — the Department of the Registrar-General's (RG) "APPLICATION
FOR A ZIMBABWE PASSPORT" (form code EP1, 4 pages), a unified form covering
first-time issuance, renewal, and lost/stolen replacement.

## Reaching the source: a genuine live-site outage, worked around via Wayback

The live origin `rg.gov.zw` returns HTTP 404 on every path attempted this
cycle (including the domain root and the documents-and-forms listing page) —
independently reproduced, not merely trusted from the delegating issue's own
paraphrase. The delegating issue's own CDX history check places the outage's
first observation at approximately 2026-02-07: a genuine ~6-month-and-counting
outage, not a transient blip, still ongoing as of this cycle (2026-07-23).

Per this registry's established Wayback-workaround precedent
(`mt/transport-malta/driving-licence-renewal@1.0.0`, GOV-4237), the form was
instead retrieved from a Wayback Machine capture of the live download
endpoint:

- `https://web.archive.org/web/20191101005412/http://www.rg.gov.zw:80/index.php/documents-and-forms?download=1:passport-application-form`
- Independently re-fetched and re-hashed this cycle rather than trusted from
  the delegating issue's own report alone: HTTP 200, `Content-Type:
  application/pdf`, `Content-Length: 1,568,546` bytes — an exact
  byte-for-byte match with the delegating issue's own disclosed size.
- sha256 `8f939371ee2a20aa1e7428473944b949b791765da767872995815a03f5ad931a`.
  Begins `%PDF-1.6`.
- The Wayback response's own `x-archive-orig-*` headers confirm the
  underlying capture's original response was itself `Content-Type:
  application/pdf` with HTTP status `200`, and no cookie/session gate beyond
  a single non-authenticating session cookie — i.e. genuinely a direct,
  unauthenticated PDF download on the live site at capture time (2019-11-01),
  not a login-gated resource incidentally crawled.

## Document structure and extraction method

4 pages. `pdfjs-dist`'s `getAnnotations()` confirms exactly 68 `/Widget`
annotations (38 on page 1, 28 on page 2, 1 each on pages 3 and 4) — an exact
match to the delegating issue's own disclosed count, independently
reproduced rather than trusted.

`getTextContent()`, however, returned **zero** text items on all four pages:
this is a scanned/flat specimen with a third-party AcroForm layer
retrofitted on top for fillability, not a specimen with a native selectable
text layer (unlike this registry's `zw/zimra/itf1-employment-income-return`,
which is flat with no AcroForm at all). With no text layer to cross-reference
against widget position, every field was mapped to its printed label by:

1. Rendering each page to a PNG via `pdfjs-dist` + `node-canvas` at 2.5x
   scale (both vendored at `/tmp/node_modules` from prior cycles).
2. Drawing each widget's own PDF-coordinate `rect` as a red overlay rectangle
   back onto that same rendered page image, then visually confirming which
   printed label and box each rectangle lands on — a positive-alignment
   check, not a distance-based guess.

This caught and corrected an initial page-2 mis-mapping: a first pass at
ordering fields by y-coordinate alone misassigned four fields (`undefined2`,
`undefined4`, `מלל32`, `מלל33`, `undefined5`) to the wrong printed rows. The
overlay re-render confirmed the correct assignment used in this schema —
Section 5's "I.D. No." and "Date" boxes, and Section 6's "Passport No.",
"Issued at", and "Issue date" boxes.

### Hebrew-placeholder field names

The retrofit tool's own internal field names are generic Adobe form-builder
placeholders, several written in Hebrew script (e.g. `מלל6`, `מלל19` — Hebrew
for a text/content placeholder). This is an artifact of the specific
third-party PDF-to-fillable conversion tool used on this specimen, unrelated
to any Hebrew-language content in the form itself (the form is entirely
English-language). Every field's semantic name in this schema derives from
its confirmed printed label via the overlay-render method above, never from
its literal internal PDF field name.

## Scope: office-only / non-fillable / biometric-capture exclusions

- **Pages 3 and 4 are excluded from `fields[]` in their entirety.** Page 3 is
  entirely office-processing (Passport No., Processing date, Passport type,
  Processing officer's name/signature) plus an "INSTRUCTIONS TO THE OFFICERS"
  panel and physical photograph/fingerprint/in-person-signature capture
  boxes. Page 4 is an "INSTRUCTIONS" panel (modeled instead as `documents[]`
  entries, see below) plus an office-only collection/disposal panel. Each
  page's single AcroForm widget sits at an identical tiny bottom-left corner
  position with no visible printed label anywhere nearby — a non-substantive
  internal artifact of the Adobe LiveCycle-style retrofit (the same artifact
  also appears once each on pages 1 and 2), accounting for the disclosed "1
  each on pages 3/4" portion of the 68-field total.
- **Several genuinely-printed, applicant-facing boxes and writing lines on
  pages 1-2 carry no corresponding AcroForm widget in this retrofit**,
  disclosed here rather than silently patched with an invented field:
  - Page 1's continuation line beneath Maiden name ("Has name been changed?
    If yes, state original name how changed and date") has no widget beyond
    the Yes/No checkbox itself.
  - Section 5's "Relationship to child" box (page 2) has no widget, even
    though the adjacent "I.D. No." and "Date" boxes in the same section do.
  - Both "Signature" boxes (Section 4's declaration signature, Section 5's
    guardian signature) have no widget — consistent with this registry's
    standing convention of treating physical signature capture as an act,
    not a data field.
  - Section 6's six-line "State how lost/stolen or other reasons" block has
    no widget.
  - The entirety of Section 7 ("Previous Marriage Details/Former Names",
    four dashed writing lines) has no widget.

  None of these is modeled in `fields[]` — an agent consuming this schema
  cannot supply that specific box's value through this document, a genuine
  limitation of the live source's own digital fillability, not a modeling
  omission.

## Disclosed findings

See the schema's own `verification.notes` for the full, numbered list of 10
disclosed findings, including: the Sex dropdown's internally malformed
export values (modeled as a clean `M`/`F` enum); Section 2's compound
`sex`+`maritalStatus` gating condition; Section 5's unprinted
`applicantIsMinor` eligibility gate (matching this registry's Botswana/
Zambia/Ethiopia/Malta/Cyprus passport-schema precedent); Section 6's gate on
`previouslyIssuedPassportStatus` equals `YES_LOST` rather than a second
invented boolean; the absence of any printed mandatory-field marker anywhere
on the source and the resulting conservative `required:true` set; the
single-field centimetre `height` modeling; per-field `maxLength` provenance;
and the `previousPassportNumber` conditional's use of `in` over the four
affirmative `previouslyIssuedPassportStatus` values rather than `notEquals
"NO"`, to avoid a spurious cascade when that field is itself absent (the same
class of absent-field/`notEquals` pitfall this registry has previously
catalogued).

## Conformance

4 valid mock scenarios (`valid-first-time-adult-single`,
`valid-married-woman-renewal`, `valid-minor-with-guardian-consent`,
`valid-lost-passport-replacement`) plus 15 mutation-control fixtures (one
missing statically-required field each) and one unknown-top-level-field
fixture, committed under `conformance/zw/rg/passport-application/1.0.0/`.

An ephemeral, from-scratch conformance checker (deriving required/
requiredWhen rules directly from this schema's own `fields[]`, discarded
after use, not committed) ran all 20 fixtures: all 4 valid scenarios at 0
errors, all 15 mutation controls each raising exactly 1 error, and the
unknown-field fixture correctly rejected. Confirmed every `requiredWhen`
field reference resolves (0 dangling references) and the
`visibleWhen`/`requiredWhen` dependency graph is acyclic. Validated clean
with `node tools/validate.mjs` and `node tools/validate-ajv.mjs`, individually
and as part of the full registry run. `registry-index.json` regenerated via
`npm run build-index` in `tools/govschema-client/`.
