# Verification record — ug/nira/first-time-registration-application@1.0.0

## Candidate selection

GOV-4353, a child issue of GOV-4351 ("GovSchema Standard Research"). Closes
the last of Uganda's pre-scouted 3-of-6 STRONG backlog first identified in
the GOV-4307 cycle (see CATALOG.md's Known Gaps entry 0e): DMV
(`ug/mowt/driving-licence-application`, GOV-4335/GOV-4337) and Business
Formation (`ug/ursb/business-name-registration-individual`, GOV-4343) were
already authored; National ID (NIRA Form 3, First-Time Registration) had
failed to connect on the two prior re-check cycles (GOV-4335, GOV-4343),
both times against the bare `nira.go.ug` host. Brings Uganda to 3 of 6
verticals (Visa, Passport, and Taxes remain confirmed dead ends per the
GOV-4307 cycle's own six-vertical screening pass).

## Reaching the live source

Target:
`https://www.nira.go.ug/media/2025/07/Form-3-NIRA-First-Time-Registration-Form.pdf`.

- **The `www` subdomain is required.** The bare `nira.go.ug` host
  connection-times-out (`curl` exit 28) — independently re-confirmed this
  cycle — which is exactly the blocker that stalled the two prior re-check
  cycles (GOV-4335, GOV-4343), both of which only tried the bare host. The
  `www` subdomain resolves and serves the PDF normally.
- The TLS certificate chain served by `www.nira.go.ug` is incomplete, so the
  fetch requires `curl -k` (or an equivalent relaxed-verification client);
  this is a server misconfiguration, not a login/WAF gate.
- Independently re-fetched and re-hashed rather than trusted from the issue
  brief alone: HTTP 200, `Content-Type: application/pdf`, 312,831 bytes,
  byte-for-byte match with the brief's own reported size.
- sha256 of the retrieved bytes:
  `37e7df2b2800bd6e2e210944cd02f1c08ed265c924b2775fedc1b70cb54e4623` — matches
  the brief exactly.
- Confirmed mechanically: the retrieved bytes begin `%PDF-1.7` and contain
  zero `/AcroForm`, `/Widget`, and `/FT` occurrences — a flat, print-and-fill
  specimen (4 pages), not an interactive AcroForm PDF, consistent with the
  brief's own description.
- The form's own letterhead and footer print "REPUBLIC OF UGANDA" and
  "National Identification and Registration Authority" alongside a "My
  Country, My Identity" tagline; `authority` names NIRA per the form's own
  printed letterhead, with `authority.url` pointing to the authority's own
  site (`https://www.nira.go.ug`).

## Extraction method

Text extracted via `pdfjs-dist`'s `getTextContent()` API (vendored at
`/tmp/node_modules/pdfjs-dist`), grouped by y-coordinate (rounded to a small
tolerance) and sorted by x-coordinate within each row, across all 4 pages —
independently re-derived from the raw PDF rather than trusted from the issue
brief's own field list alone, per the task's own instruction.

Attempted visual cross-check by rendering all 4 pages to PNG via `pdfjs-dist`
+ `node-canvas` at 2.5x scale (with the bundled `standard_fonts` data
directory supplied). This specimen's embedded fonts triggered
`getPathGenerator` glyph-resolution warnings for effectively every character
on every page, so the rendered PNGs show the form's own grid/table border
lines cleanly but render text as blank (a font-embedding issue in the source
PDF itself, not an extraction bug — the same `getTextContent()` API used for
the primary extraction is unaffected, since it reads the content stream's
text-positioning operators directly rather than rasterizing glyphs).
Consequently, ambiguous layout questions were resolved not by reading
rendered text but by directly inspecting the PDF content stream's own
vector line-drawing operators (`page.getOperatorList()`, filtering
`constructPath` rectangle fills that render as hairline table/grid rules):

- **"Particulars of Applicant's Children" (Section 10) row count.** The
  table prints no numeric row-count label. Its own printed horizontal rule
  lines were counted directly from the content stream: 6 lines (at PDF
  y-coordinates 111.74, 98.28, 82.8, 67.56, 51.48, 35.52), i.e. 1 header row
  + 4 data rows. Column boundaries at the same y-coordinates (x ≈ 36, 306,
  353/354, 414, 573) were cross-checked against the header text's own
  x-positions ("Names of Child" ~41, "Sex (M/F)" ~306, "Date of Birth" ~359,
  "National ID Number (if available)" ~432) and matched. Modelled as a
  bounded 4-row repeating group (`child1`..`child4`), this registry's
  established convention for a printed bounded table with no array/nested
  field-type primitive available (GSP-0009 still undecided) — see, e.g.,
  `ng/nis/application-for-nigeria-standard-passport`'s own `child1`..`child4`
  precedent. This is a lower-confidence provenance than an explicitly printed
  row-count label (disclosed as Finding 6 below).
- **Father's/Mother's "Street"/"Street/House No." column pair (Sections
  7/8).** Confirmed via x-coordinate clustering (left column "Street" at
  x≈39, right column "Street/House No." at x≈280-282 on both blocks) that
  these are two distinct printed columns, not a single wrapped label — see
  Finding 2.

Models 166 `fields[]` across 11 `steps[]` (Registration Type; Personal
Information; Place of Residence; Place of Birth; Place of Origin and
Citizenship; Voter Information/Marital Status/Spouse Details — Adult Only;
Father's Details; Mother's Details; Grandparent(s)/Introducer Details;
Particulars of Applicant's Children; Declaration), with a `transitions`
branch out of the `place_of_origin` step: `registrationType == ADULT` routes
to the `voters_and_marital` step, everything else falls through directly to
`father_details` — the flow-level expression of PART B's own printed
"(to be filled for Adult registration only)" gate, composed with matching
field-level `visibleWhen`/`requiredWhen` on every PART B field.

Excludes, per the brief and the form's own page-4 filling guide: PART A's
Registration Location Code and Application ID (guide: "To be generated by
the Application" / "REGN OFFICER"); PART D ("Form Section to be retained by
the Registration Officer", a condensed duplicate of Parts A/B for officer
records); and PART F ("FOR OFFICIAL USE ONLY" — citizenship assessment,
documentary-proof ticks, the registration officer's own signature). None of
this is applicant-supplied data.

## Disclosed source-fidelity findings

1. **`previousNames` (Section 1) modelled from a printed label reading only
   "Previous", not "Previous Names".** Confirmed via direct x/y re-extraction
   around that row: the printed label is the single word "Previous", unlike
   the fuller "Previous Names" label this same form prints in its Father's,
   Mother's, and Spouse's Details blocks. Modelled with `label: "Previous"`
   verbatim and the discrepancy disclosed in the field's own `description`,
   rather than silently normalized to "Previous Names".

2. **Father's/Mother's Place of Residence blocks print "Street" +
   "Street/House No." as two separate columns**, not the "Street" + "Plot /
   House No." pairing the applicant's own Place of Residence section (Section
   2) uses. Modelled per each block's own printed label
   (`fatherResidenceStreetHouseNumber` / `motherResidenceStreetHouseNumber`,
   both labelled "Street/House No.") rather than normalized to the
   applicant's own wording.

3. **The Spouse Details block (Section 6, PART B) prints no "Citizenship
   Certificate Number" line**, unlike the applicant's own, Father's, and
   Mother's citizenship blocks, which all print one. Confirmed by direct
   row-by-row re-extraction of Section 6's citizenship lines (Citizenship
   Type → Dual Citizenship → Citizenship acquired under article 9 → If Dual,
   state Citizenship and other Nationality — no certificate-number line
   between the last two). Modelled as a genuine, disclosed source asymmetry:
   `spouseOtherNationalityIfDual` exists with no sibling
   `spouseCitizenshipCertificateNumber` field.

4. **`citizenshipType` modelled as a 3-value enum (`BY_BIRTH`,
   `BY_REGISTRATION`, `BY_NATURALIZATION`) plus a separate `dualCitizenship`
   boolean**, matching the form's own printed layout of three tickboxes plus
   one additional "Dual Citizenship" tickbox (repeated identically for the
   applicant, Spouse, Father, and Mother blocks) — even though the page-4
   filling guide's own prose summary lists "By Birth, By registration, By
   Naturalisation, DUAL, Citizen under 95 Constitution" as if these were five
   coequal options. The printed form itself, not the guide's summary prose,
   governs this schema's structure.

5. **Grandparent(s)/Introducer block (Section 9) modelled entirely optional,
   with no `requiredWhen` gate.** The form's own section heading states this
   block applies "if information of both parents is not available for
   Applicants under Citizenship by Birth/descent", but prints no
   applicant-fillable tickbox recording whether that condition holds — there
   is no boolean field to attach a `Condition` to. Each field's own
   `description` records the applicability condition in prose instead,
   consistent with this registry's `lk/drp/application-for-a-national-identity-card`
   precedent for the same disclose-rather-than-fabricate pattern.

6. **Children table row count (4) derived from counting printed rule lines,
   not a printed row-count label** — see Extraction method above. Disclosed
   as a lower-confidence provenance than an explicit "1/2/3/4" row label.

7. **Local/Foreign administrative-subdivision conditionality applies only to
   the Residence block, not Birth or Origin.** The applicant's own Place of
   Residence section (Section 2) prints an explicit "Local Foreign" tickbox
   gating District/County/Sub-County/Parish/Ward/Village; Place of Birth
   (Section 3) and Place of Origin (Section 4) print no equivalent gate, so
   their own District..Village fields are modelled unconditionally optional
   rather than inventing a matching conditional the source does not print.

8. **`disabilityDumb` retains the source form's own printed checkbox label
   ("Dumb") verbatim**, per this registry's source-fidelity practice, though
   the term is dated; the field's own `description` flags this and suggests a
   consuming application may present a more contemporary label (e.g.
   "non-verbal") to a human end user.

9. **`registrationType` (top-of-form CHILD/ADULT tick) gates PART B only, not
   PART C.** The form applies Father's Details, Mother's Details, the
   Grandparent(s)/Introducer block, and the Particulars of Applicant's
   Children table uniformly to both child and adult registrations (no
   printed "Adult only"/"Child only" qualifier on PART C, unlike PART B's
   explicit one) — so none of PART C's fields carry a `registrationType`
   `visibleWhen`/`requiredWhen` gate.

## Conformance

2 valid scenarios (a child, citizenship-by-birth registration with a
Grandparent/Introducer block populated and a Local Uganda residence; an
adult, married, dual-citizen registration with a naturalized father, a
dual-citizen mother, other spouses declared, and two of the four children
rows populated) plus 23 mutation-control fixtures (each raising exactly 1
error: one missing-required-field case for each of the 13 statically
`required: true` fields, 8 targeted `requiredWhen` cases spanning the
Residence/Citizenship/Marital/Spouse/Father/Mother conditional rules, one
invalid enum value, and one unknown top-level field) are committed under
`conformance/ug/nira/first-time-registration-application/1.0.0/`. An
ephemeral, from-scratch conformance checker (deriving `required`/
`requiredWhen`/`visibleWhen`/enum/type rules directly from this schema's own
`fields[]`, discarded after use, not committed) ran all 25 fixtures: both
valid scenarios at 0 errors, all 23 mutation controls each raising exactly 1
error. Validated clean with `node tools/validate.mjs` and `node
tools/validate-ajv.mjs`, individually and as part of the full registry run.
`registry-index.json` regenerated via `npm run build-index` in
`tools/govschema-client/`.
