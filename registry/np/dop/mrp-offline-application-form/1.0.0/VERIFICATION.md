# Verification record — `np/dop/mrp-offline-application-form` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-15`

## Why this schema and why now (GOV-3206, delegated from GOV-3204)

GOV-3204 ("GovSchema Standard Research") re-scanned `CATALOG.md`'s disclosed
backlog and found GOV-3078's own left-open finding: Nepal's Department of
Passports "MRP Offline Application Form" — a genuine, currently-live,
unauthenticated single-page AcroForm PDF found on the department's own
Downloads page — was screened and confirmed strong, but left unauthored
because every one of its 337 widgets uses a flat, semantically meaningless
internal naming scheme (`sur1`..`sur337`) rather than one field per named
datum, requiring widget-geometry and label-proximity reconstruction. This
issue (GOV-3206) picks up that exact disclosed backlog item rather than
re-scouting fresh candidates.

## Source

- **Downloads page:** `https://nepalpassport.gov.np/downloads` (form labeled
  "MRP Offline Application Form").
- **Direct PDF:**
  `https://verification1.nepalpassport.gov.np/uploads/g_Q6z_W_Hj_Ic_DQM_Oqn_Guq_G_Tz_Npa_ZXJYNC_meta_Zm9yb_T_It_NG_12_Mi0x_Ln_Bk_Zg_0cffb4c683.pdf`
- **Retrieved:** 2026-07-15, HTTP 200, `application/pdf`, 2,827,163 bytes.
- **sha256:**
  `603d84d1e91be379ab9c438426392b71143073ece7f87cc0a750f76c5d4d411b` —
  independently re-derived this cycle via a fresh `curl` fetch, matching the
  hash recorded in this issue's own brief exactly.
- Fetched directly with `curl`, no login/CAPTCHA/WAF gate encountered at any
  point.
- Genuine single-page **AcroForm** PDF (not scanned as a raster page format,
  but its visible content — labels, instructions, the Ministry crest, and box
  borders — is itself a background raster image with no text layer; see
  Extraction method below).

### Currently-live status

Third-party sources report Nepal discontinued MRP (non-chip, machine-readable
only) passport issuance in 2021 in favor of e-passports. This exact form,
however, remains published today (2026-07-15) on the Department of Passports'
own live, current Downloads page, alongside e-passport application materials
— independently re-checked this cycle by fetching the Downloads page
directly. It is modelled here as a currently-live offline/paper application
pathway (plausibly for diplomatic missions or locations without e-passport
enrollment capacity), not a defunct process. A future cycle with a
corroborating primary DoP source (e.g. an official notice scoping or
restricting this form's continued use) should revisit this characterization
if one surfaces.

## Extraction method: widget-geometry + label-proximity reconstruction

`pdfjs-dist` (`legacy/build/pdf.js`, pinned 3.11.174) confirms:

- 1 page, page size 595.275 × 841.89pt (A4).
- `page.getTextContent()` returns **zero** text items — every visible label,
  instruction, and the Ministry of Foreign Affairs crest are rendered as a
  single background raster image, not a text layer.
- `page.getAnnotations()` returns exactly **337** `Widget` annotations, all
  `fieldType: "Tx"` (plain text), field names `sur1`..`sur337`, matching
  GOV-3078's disclosed count exactly. 332 of the 337 have `maxLen: 1`
  (single-character comb boxes); the remaining 5 have `maxLen` 8, 15, 15, 30,
  and 30 (non-comb, free-width boxes for Email/Phone/signature-date fields —
  corrected during review-gate re-derivation from an initial "8, 8, 15, 15,
  30" miscount; the actual widgets are `sur222`/`sur335` at `maxLen: 30`
  (`email`/`nextOfKinEmail`), `sur223`/`sur334` at `maxLen: 15`
  (`phoneNumber`/`nextOfKinPhoneNumber`), and `sur336` at `maxLen: 8`
  (`applicantSignatureDate`)).

Because there is no text layer, the entire field list and every
required-field asterisk were read visually, from a `node-canvas` 3×-scale
render of the full page (`page.render()` against a `NodeCanvasFactory`),
followed by a series of targeted higher-resolution crops of each form
section (Date of Birth/Sex, Citizenship/Issue dates, Address, Next of Kin,
the signature/thumb-impression block, and the office-use footer) to confirm
every asterisk placement precisely.

Widgets were reconstructed into logical fields as follows:

1. Sorted all 337 field names with a **natural sort** on the pattern
   `sur(\d+)([a-z]?)` — not `parseInt()` on the numeric suffix alone, which
   silently collapses `sur226` and `sur226a` into a false duplicate (both
   parse to `226`) and, in the same pass, appears to "lose" `sur337` (the
   true last item shifts down one position once the `226a` insertion is
   accounted for). The `AutoTab(this, event, "surN+1")` keystroke action
   present on nearly every widget explicitly chains each box to the next in
   fill order, corroborating that natural-sort order is the form's own
   intended reading/fill sequence, not an artifact of file-internal object
   ordering.
2. Grouped the naturally-sorted widget list into rows/fields by clustering
   consecutive widgets whose `rect` `y0` values are within ~3pt of each other
   (same visual row) and whose `x0` is within ~8pt of the previous widget's
   `x1` (horizontally contiguous, i.e. the same comb field, not a new one)
   — a purely geometric, reproducible grouping, not a visual guess. This
   produced exactly 30 widget-groups summing to all 337 widgets.
3. Matched each of the 30 groups against the rendered image's numbered field
   labels (1. Surname through 17. Email, plus the Applicant's Signature Date
   box) by comparing each group's `y0`/`x0` (converted to pixel coordinates
   at the render's 3× scale) against the corresponding label's on-image
   position. Every group matched its expected label with no ambiguity; group
   sizes independently corroborate box counts printed on the page (e.g. the
   14-box Ward-adjacent... actually District boxes at 15/18/14 characters
   line up with the visible box widths for each labeled field).
4. The 30 groups collapse to **29** modelled comb/text fields, because the
   "5. Date of Birth" row's two side-by-side 8-box groups (5A. A.D. and 5B.
   B.S., each Year(4)/Month(2)/Day(2)) are merged into one canonical
   `dateOfBirth` field — see Date/calendar modelling below.

## Date/calendar modelling

This form prints dates in up to two calendars — Gregorian ("A.D.") and
Bikram Sambat ("B.S.", the calendar in official use in Nepal) — and not
every date box on the form has a parallel counterpart in the other calendar:

- **Date of Birth (5A + 5B):** both a required A.D. box and a required B.S.
  box are printed for the *same* date. Modelled as one canonical ISO
  `dateOfBirth` (`type: date`), following this registry's established
  parallel-calendar merge technique from
  `th/mfa/passport-application-royal-thai-embassy-london` (which merges
  Buddhist-Era/Gregorian year blanks the same way). A consuming agent
  completing the literal paper form is expected to derive both calendar
  representations from this one value.
- **Citizenship/Permit Date of Issue (field 8):** prints **only** a B.S. box
  (8 digits, Year/Month/Day), with no parallel A.D. box anywhere on the form
  for this date. Modelled as `citizenshipOrPermitIssueDateBs`, `type:
  string` (not `type: date`), since there is no Gregorian counterpart on the
  source to anchor a canonical ISO conversion, and asserting one would
  fabricate a value the source does not provide the means to derive.
- **Old Passport Date of Issue (field 10A):** prints **only** an A.D. box,
  with no B.S. counterpart. Modelled as `oldPassportIssueDateAd`, `type:
  date`, since this one genuinely is Gregorian.
- **Applicant's Signature Date (`sur336`):** an 8-digit box beside the
  signature line, printed with **no calendar label of any kind** — unlike
  every other date section on this form, which always labels A.D. or B.S.
  explicitly. Modelled as `applicantSignatureDate`, `type: string`, since
  the intended calendar cannot be determined from the source without
  fabricating an assumption.

## Requiredness

Every required item on this form carries the source's own explicit printed
`*` asterisk, confirmed field-by-field against the high-resolution render;
non-asterisked items are modelled `required: false`. Two deliberate
exceptions, both disclosed to avoid over- or under-claiming what the source
states:

> **Correction (review-gate re-derivation, GOV-3208):** the original
> field-by-field asterisk pass missed the printed `*` on both **11D.
> Town/Village** (`addressTownOrVillage`) and **14F. Town/Village**
> (`nextOfKinTownOrVillage`) — confirmed present on a fresh, tightly-cropped
> zoom of each label (visible as `टोल/गाउँ *`, unlike their neighbouring
> `11E`/`14G` House No. boxes, which print no asterisk). Both fields are
> corrected to `required: true` and their `sourceRef`s updated to include
> the asterisk; `valid-minimal-required-only.json` and all four
> mutation-control fixtures were updated to populate both fields so the
> "exactly 1 error" invariant holds for the field each fixture actually
> targets. All other `required: false` fields on this form (10, 10A, 10B,
> 11E, 12, 13, 14G, 16, 17, `photo`) were independently re-checked against
> the render this cycle and confirmed to genuinely carry no asterisk.

- **`photo`** (the "35mm X 45mm Borderless Colour Photo" gluing box) has no
  backing AcroForm widget and — notably, given this form's otherwise
  consistent asterisk convention — no printed asterisk either. Modelled
  `required: false` rather than assuming a photo is mandatory (which it
  almost certainly is, in practice, for any passport application) because
  the source's own consistent required/optional marking convention does not
  apply one here.
- The two boxes captioned **"Thumb Impression/औंठाको छाप"** (Right Thumb/
  दायाँ, Left Thumb/बायाँ) sit under a single printed asterisk covering
  both, but are excluded from `fields[]` entirely — see Biometric/signature
  exclusions below.

## Biometric/signature exclusions

Consistent with this registry's established treatment of biometric and
wet-ink capture on print-and-fill government forms (`do/mirex/passport-
application`'s exclusion of its "FIRMA Y HUELLA" signature-and-fingerprint
block; `mx/sre/passport-application`; `il/mot/medical-examination-driving-
license-renewal`), this schema excludes:

- The applicant's handwritten signature mark itself (labelled "Applicant's
  Signature/निवेदकको सही *"). No backing widget exists for the mark; only
  its accompanying Date (`sur336`, `applicantSignatureDate`) is modelled,
  since that date is itself a distinct, separately-boxed data value.
- Both Right Thumb and Left Thumb impression boxes — physical biometric
  capture performed on the paper form, not digitally modelable data. Neither
  has a backing AcroForm widget.
- The "Verifying Officer" name/signature/designation/date block —
  department-staff attestation, not applicant-supplied data, and (like the
  above) not backed by any widget.

## Out of scope: "FOR OFFICE USE ONLY" section

The form's lower section — Application Source & Name (DOP/District/Mission
checkboxes plus a name comb grid), Application Type (Regular/Emergency/New/
Lost/Renewal), Document Type (Ordinary/Diplomatic/Official/Travel Document),
Validity (Years/Months), Revenue Receipt No., and a processing Date grid —
was checked against the complete 337-widget inventory and confirmed to have
**zero** backing AcroForm widgets of its own: every one of the 337 widgets
maps to the numbered applicant-facing fields 1–17 or the Applicant's
Signature Date, none to this section. It is static, non-fillable artwork
completed by hand by department staff after submission, consistent with this
registry's convention for excluding office-only processing blocks (e.g.
`do/jce/cedulacion-movil-especial`'s internal-processing block).

## Conformance

An ephemeral, from-scratch conformance checker (deriving required/enum/
maxLength rules directly from this schema's own `fields[]`, discarded after
use, not committed) ran the following fixtures in
`conformance/np/dop/mrp-offline-application-form/1.0.0/`:

- `valid-full-application.json` (all required fields, plus several optional
  fields, populated) — **0 errors**.
- `valid-minimal-required-only.json` (only required fields populated,
  optional fields omitted) — **0 errors**.
- `mutation-control-missing-required-field.json` (drops `surname`) —
  **exactly 1 error**.
- `mutation-control-missing-required-field-nextofkin.json` (drops
  `nextOfKinFullName`) — **exactly 1 error**.
- `mutation-control-invalid-enum-sex.json` (sets `sex` to `X`, not in the
  enum) — **exactly 1 error**.
- `mutation-control-maxlength-exceeded-surname.json` (`surname` exceeds the
  form's 22-character comb-box allowance) — **exactly 1 error**.
- `mutation-control-invalid-date-format.json` (`dateOfBirth` set to a
  non-ISO string) — **exactly 1 error**.

This schema has no `requiredWhen` rules (a straightforward biographic/
contact form with no conditional branches) and no required `documents[]`
entries, so no fixtures target those.

## Structural validation

- `node tools/validate.mjs registry/np/dop/mrp-offline-application-form/1.0.0/schema.json` — **ok**.
- `node tools/validate-ajv.mjs registry/np/dop/mrp-offline-application-form/1.0.0/schema.json` (ajv 2020-12 against `spec/v0.3`) — **ok**.
- Full-registry re-run after adding this document: `node tools/validate.mjs`
  and `node tools/validate-ajv.mjs` — see PR for exact counts.
- `npm run build-index` re-run in `tools/govschema-client/` to regenerate
  `registry-index.json` with this document included.

## Maturity

`structural-reference`: every field traces to a specific box visually
confirmed on a high-resolution render of the genuine, currently-served
official form, and widget-geometry grouping was independently cross-checked
against visible box counts, but no live filing at a Department of Passports
office was attempted. GovSchema is an independent, non-profit standards body
and is not affiliated with, endorsed by, or operated by the Government of
Nepal or the Department of Passports.
