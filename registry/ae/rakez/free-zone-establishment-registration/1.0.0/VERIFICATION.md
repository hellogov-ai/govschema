# Verification record — `ae/rakez/free-zone-establishment-registration` v1.0.0

This file is the **source-review record** for this document version, per the
`manual-source-review-v1` practice. It documents the provenance of the
published fields and flow and states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-07`

The document was derived from a **directly-read primary source**: the Ras Al
Khaimah Economic Zone Authority's (RAKEZ) own official "Application for
Registration and Licence of a Free Zone Establishment or Company" PDF,
retrieved directly from `rakez.com`, a genuine fillable AcroForm with ~100
named field widgets. It remains `draft`, not `verified`, pending an
independent second reviewer's field-by-field pass.

## Why this document exists

This is a standing `GovSchema Standard Research` cycle
([GOV-1540](../../../../../GOV-1540)). CATALOG.md's own "By Jurisdiction"
table showed the United Arab Emirates as the **only jurisdiction in the
registry with no Business Formation schema** — the last vertical gap
standing at less than full coverage (Business Formation was 16/17). A prior
research cycle (GOV-1289) had rated UAE Business Formation WEAK: the
mainland Ministry of Economy / Department of Economic Development channels,
and RAKEZ's own live `eportal.rakez.com` client portal, are all
authenticated-account-gated. That rating was never revisited. This cycle
re-screened it from scratch (rather than trusting the stale rating) and
found a genuinely strong, directly-sourced candidate: a UAE free zone's own
downloadable, paper-fillable registration application form — a source shape
this registry had not yet tried for the UAE, having previously only checked
the federal/mainland and single-portal angle.

## Source examined

- **Document `(id, version)`:** `ae/rakez/free-zone-establishment-registration` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Ras Al Khaimah Economic Zone Authority (RAKEZ), formerly
  "Ras Al Khaimah Free Trade Zone Authority" (RAK FTZ) — the form itself
  still carries the pre-merger legal name in its own text ("...as a Free
  Zone Company (FZC) or Free Zone Establishment (FZE)... with Ras Al Khaimah
  Free Trade Zone Authority"), consistent with RAKEZ being the 2017 merger
  of RAK Investment Authority (RAKIA) and RAK Free Trade Zone (RAK FTZ);
  RAKEZ is the current legal successor and the name used throughout this
  schema's `authority` block and site-wide branding today.
- **Primary source URL:** <https://www.rakez.com/portals/30/download/form-docs/company-setup/form-applicatio-for-registration-and-licence-of-a-free-zone-establishment.pdf>
- **Official document title:** "Application for Registration and Licence of
  a Free Zone Establishment or Company", Issue No. 03, Issued by QEMR, Issue
  Date Feb 18, 2016, Ref: LCN-019(A)
- **Retrieved / reviewed:** 2026-07-07
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## Access constraint and how it was worked around

None found — this is the strongest access shape this registry can find: a
genuine AcroForm PDF hosted directly on the authority's own domain
(`rakez.com`), served over a plain HTTPS GET with no login, CAPTCHA, or WAF
challenge (confirmed via direct `curl`, HTTP 200, 671,847 bytes). Every field
is a real, named PDF form-field widget (`/Subtype /Widget`, `/FT /Tx` or
`/FT /Btn`), extracted with `pdfjs-dist`'s `page.getAnnotations()` — no
OCR or PDF-vision rendering was needed for the field inventory itself, since
the widgets carry their own field names and rectangles.

## Currency check

The PDF's own footer date (Feb 18, 2016) predates the 2017 RAKIA/RAK FTZ
merger into RAKEZ, so its currency was checked directly rather than assumed
current from a stale timestamp alone:

- The exact same file, at the exact same first-party path under
  `rakez.com/portals/30/download/form-docs/company-setup/`, is still linked
  today from live web search results returning current RAKEZ pages,
  including a still-current company-setup checklist.
- RAKEZ's own **"Checklist – New Registration FZE or FZ LLC – Corporate
  Entity"** (Issue No. 01, Ref: R&L-010, dated Mar 1, 2017 — i.e. already
  post-merger, RAKEZ-branded), also hosted directly on `rakez.com`,
  explicitly lists **"filling the Application Form"** as one of two valid
  ways to submit an application (the other being the Client Portal Account),
  confirming this specific document is still a live, currently-accepted
  submission channel, not a superseded artifact.
- No newer-dated application form (a "v04" or later Issue No.) was found on
  `rakez.com` despite a targeted search; this is noted as a residual risk in
  "Path to a `verified` claim" below.

## What was confirmed directly (verbatim, from the AcroForm + text layer)

Every field name, rectangle, and radio-button grouping was read directly
from the PDF's own annotation dictionary (`pdfjs-dist` `getAnnotations()`),
then cross-referenced against the PDF's extractable text layer
(`getTextContent()`) using **x/y coordinate adjacency**, not reading order
alone, since the text layer's own token order is not always left-to-right/
top-to-bottom (confirmed by testing: the crude "group tokens by line"
reading order misattributed the Plot of Land subsection's fields on first
pass — see "Judgment calls" below for how this was caught and corrected):

- **p.1, 1. Details Concerning the Company:** Legal Form (2-option radio,
  confirmed FZE is the left/first option and FZC the right/second, matching
  the visible label order "Free Zone Establishment Free Zone Company"),
  three Proposed Name options with the verbatim note "RAK FTZ has the right
  to select any of the above or propose a different name", Share Capital/
  Total Number of Shares/Par Value (with the verbatim par-value-minimum note),
  Activity Details free text, and the 4-option License Type radio
  (Commercial / Consulting-Services / Industrial / Educational, in that
  left-to-right order) with its verbatim Industrial-activity carve-out note.
- **p.1-2, 2. Shareholder(s) Details:** the form provides five near-identical
  Shareholder blocks (the AcroForm's own field-naming is inconsistent — every
  block's widgets are literally named "Share holder 1: ..." regardless of
  which shareholder number 1-5 they visually belong to, disambiguated only by
  an Adobe-assigned numeric suffix). Shareholder 1's eight fields (Name,
  Mother Name, Address & Contact Details, Nationality, Passport Number/Reg
  Number, Number of Shares, % of Shares, Total value of shareholding) were
  confirmed by matching each widget's y-coordinate against the correct row
  of the Shareholder 1 sub-form specifically (not shareholders 2-5, which
  are visually and structurally identical but out of scope for this
  version — see below).
- **p.2, 3. Manager Details:** Name, Mother Name, Nationality, Passport
  Number, and the Residency-status-in-UAE Yes/No radio, plus its verbatim
  NOC-required note. **The widget carrying the PDF's own internal field name
  "Address & Contact details" in fact sits at the y-coordinate of the
  printed "Mother Name:" label, not at any printed "Address & Contact"
  label** — confirmed by checking every annotation's rectangle in this
  section against the text layer; no widget sits at the "Address & Contact
  Details:" printed label at all in this section (unlike the Shareholder
  section, which has a genuine, correctly-positioned Address & Contact
  Details widget). This is modelled as `managerMotherName`, not
  `managerAddressContact` (see "Judgment calls" below).
- **p.2-3, 4. Facility Details:** five mutually-exclusive subsections, each
  confirmed via coordinate cross-referencing between each radio widget's
  rectangle and the nearest label token(s) at the same y-coordinate:
  - Flexi Facilities: 4-option radio, no accompanying free-text widgets.
  - Standard Facilities: 5-option radio, each option with its own "please
    specify" text widget, and three of the five (Executive Office, Special
    Executive Office, Shell & Core Facility) additionally with their own
    "Size: M²" text widget — confirmed by reading each option's row
    independently rather than assuming a shared specify/size field.
  - Retail Facilities: 2-option radio (Industrial Park / Technology Park)
    for "Service block located in:", no separate free-text widget.
  - Warehouse: a Technology-Park/Industrial-Park location radio, plus a
    4-row printed rate-card table (150 M² @ 10.5 KW "only warehouse space";
    205 M² @ 15-or-30 KW; 300 M² @ 10.5 KW; 416 M² @ 30-or-60 KW, the latter
    two "including storage space, office & complimentary services") with a
    per-row selection checkbox, a Unit Number text box, and (for the two
    variable-power rows) a Power radio choice, plus a free-text "Others:"
    override row.
  - Plot of Land: initially misread on the first coordinate pass (the crude
    line-grouped text dump put "Size: M²" and the Technology/Industrial Park
    radio in the wrong order relative to the "Plot of land - M²" header and
    an adjacent "Others:" text field left over from the Warehouse table).
    Re-verified with a **targeted second coordinate dump restricted to the
    y=440-610 band**, confirming: `Text Field 574` (y=555-568) is the
    "Size: M²" value, the "Plot of land - M²"-named radio (y=542-549, at
    x=92.4/199.8 — the *same* x-coordinates as the Warehouse section's own
    Technology/Industrial Park radio) is the "Located in:" park choice, and
    `Text Field 577`/`575`/`576` are, respectively, the "Where did you hear
    about the RAK FREE TRADE ZONE?" answer, and the licence-collector's Name
    and Location.
- **p.3, 5. Undertaking:** the verbatim attestation paragraph, Name of
  Authorised Signatory, Date, and a `Signature` widget — the latter not
  modelled as applicant data, consistent with this registry's convention
  (e.g. `ae/fta/vat-registration`) of not modelling wet-ink/drawn-signature
  widgets as schema fields.
- **Supporting documents:** cross-referenced against RAKEZ's own
  **"Checklist – New Registration FZE or FZ LLC – Corporate Entity"**
  (Issue No. 01, Ref: R&L-010, Mar 1, 2017), also fetched directly from
  `rakez.com` — Business Plan, passport/specimen-signature requirements for
  the Manager, and the conditional NOC-from-sponsor requirement (which the
  application form's own p.2 note also states verbatim).

## Judgment calls made in this version

- **Repeating shareholder blocks (2-5) not modelled:** the form supports up
  to five shareholders with visually identical sub-forms; only Shareholder
  1 is modelled, per this registry's established convention for repeating
  groups (GovSchema v0.3 has no array/repeating-field type — `spec/v0.3/SPEC.md`
  §6.1), the same precedent used by `ae/fta/vat-registration`'s owner/
  relationship blocks.
- **Manager's PDF-internal "Address & Contact details" field name is a
  mislabeled Mother Name widget:** unlike the Shareholder section (where the
  widget named "Address & Contact Details" genuinely sits at the printed
  "Address & Contact Details:" label), the Manager section's widget carrying
  that same internal PDF field name is positioned at the y-coordinate of the
  printed "Mother Name:" label instead — RAKEZ's own PDF authoring mislabeled
  it, not the printed form layout. There is no widget anywhere in the Manager
  section at the printed "Address & Contact Details:" label's position.
  Modelled as `managerMotherName` (optional, `pii`), mirroring
  `shareholderMotherName`, in place of the `managerAddressContact` field this
  document originally (incorrectly) modelled — corrected during independent
  review ([GOV-1543](../../../../../GOV-1543)).
- **No single "facility category" selector field:** the source form has five
  independent radio-button groups (one per facility subsection), not one
  combined selector; this schema mirrors that shape exactly (five independent
  optional fields) rather than inventing a synthetic top-level enum the
  source does not literally have. The mutual-exclusivity of the five
  subsections (an applicant fills in only one) is documented in each
  field's own description, not machine-enforced via `crossFieldValidation`
  (the spec's comparison operators are pairwise field-vs-field/constant, with
  no native "exactly one of these five groups is non-null" primitive; a
  future version could model this via `exclusivityGroups`, GSP-0013 §3, once
  warranted).
- **Warehouse rate-card table collapsed to a representative selection, not
  modelled row-by-row:** the four catalog rows' own static area/power/
  description text is descriptive content, not applicant input; only the
  applicant-facing choices (which row, which power option where the row
  offers one, unit number, or a free-text "Others:" override) are modelled.
- **`standardFacilitySpecification` is not `requiredWhen`-gated on
  `standardFacilityType`:** an earlier draft of this schema attempted
  `requiredWhen: { field: "standardFacilityType", notEquals: null }`, then
  caught and removed this before commit — `standardFacilityType` is itself
  optional, so when it is genuinely unanswered (the applicant chose a
  different facility category entirely) it is *absent*, not `null`, and the
  Condition grammar's leaf-compare has no field-presence operator (GSP-0013
  §1); `undefined !== null` evaluates `true`, which would have misfired the
  gate as required for every applicant regardless of which facility type
  they actually chose. This is the same bug class documented in this
  registry's own prior incident on `notEquals` against sentinel defaults for
  optional fields (empty string / `0`); the trigger condition is stated only
  in the field's own `description` text instead, per that precedent.
- **Par value's "multiple of AED 1,000" rule only partly machine-validated:**
  `parValueAed`'s `minimum: 1000` is enforced; the "or multiples thereof"
  clause is not, since GovSchema v0.3's `validation` vocabulary has no
  `multipleOf` keyword (`spec/v0.3/govschema.schema.json` `nonFileValidation`).
  Stated in the field's `description` instead.
- **Industrial-activity detailed application form out of scope:** the
  source form itself states "In case of Industrial Activities, please fill
  in the detailed application form" — a separate document not sourced or
  modelled in this version.
- **Post-approval execution steps out of scope:** the Memorandum of
  Association signing, RAKEZ Lease Agreement, and Personnel Secondment
  Agreement (all "to be signed before the Authority", per the corporate-
  entity checklist's items 10-12) are post-submission in-person steps, not
  data collected on this application form itself.

## Path to a `verified` claim (next step)

To advance this document to `status: verified`, a reviewer needs to:

1. Independently re-fetch the source PDF fresh (not reusing the authoring
   session's download) and re-run the AcroForm annotation + text-coordinate
   extraction, confirming every field name, rectangle, and radio-button
   grouping cited above, with particular attention to the Facility Details
   section (the most coordinate-dependent part of this document).
2. Confirm RAKEZ has not since published a newer Issue-number revision of
   this form (none was found this cycle beyond the current Issue No. 03,
   Feb 18, 2016) — check both the `company-setup` forms index and any
   updated checklist referencing it.
3. If feasible, obtain or construct an individual-shareholder (as opposed to
   corporate-entity) new-registration checklist to cross-check the
   Shareholder 1 document requirements independently of the corporate-entity
   checklist used in this version.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01** (~6
months). Re-check the source, and confirm no newer form revision has been
published, on or before that date and on any `source.url` change.
