# Verification record — `ie/dttas/learner-permit-application` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-07`

Every field was read directly from the text layer of NDLS's own "Application
Form for a Learner Permit" (D201, March 2020 edition), cross-checked against
the RSA's own current "Apply for your first permit" guidance page for the
channel structure, current fee, and several conditional-document triggers not
stated on the (older) D201 PDF itself. It remains `draft`, not `verified`,
pending a second independent reviewer's field-by-field pass and/or live-app
execution testing — see "Path to a `verified` claim" below.

## Why this candidate

This `GovSchema Standard Research` cycle (`GOV-1533`) began by regenerating
the picture in `CATALOG.md`: as of 2026-07-06, DMV, Taxes, and (effectively)
every other vertical stood at or near 17/17 jurisdictions, with the remaining
open candidates mostly being either confirmed dead ends (NL/ZA/BR Visa) or
UAE-specific gaps already screened as weak (Passport: only a menu-tile/
checklist-level source found in two prior cycles; Business Formation:
login/WAF-gated across every UAE agency checked).

This cycle first re-attempted the UAE Passport gap directly, since the prior
cycle's own note (`ae/icp/emirates-id-replacement`'s VERIFICATION.md) left it
as "a future cycle should do a deeper page-by-page pass ... before giving up
on it." A full re-read of both the 72-page citizen-category and 57-page
resident-category ICP Smart App manuals (this time recovering genuine prose
text via `pdfjs-dist`'s standard-font text layer, not just embedded
screenshots) confirmed the manuals' own "Replace"/generic-service wizard
narrative — passport fields appear only inside the already-modelled Replace
Emirates ID flow's own Passport Information screen, never as a distinct
issuance/renewal wizard. A second, 230-page ICP "Guide for Services" (Service
Card) PDF was also read in full: pp.18-22 give "Issuance of Passport" and
"Renewal of A Passport" their own dedicated service cards, but — as the prior
cycle found for the Emirates ID service cards — these are checklist/
conditions/fee-schedule prose ("Filling in the application form (as
applicable)"), not a field-by-field form. **UAE Passport remains open but
weak; not picked this cycle** (see "Confirmed re-screened, not re-attempted"
in `CATALOG.md`, to be updated).

The cycle then pivoted to a gap `CATALOG.md`'s own "Known Gaps" section
explicitly names as "genuinely open, well-sourced": sub-national/state DMV
expansion, specifically a **first-time driving-licence/learner-permit
application**, absent from every jurisdiction this registry already covers
in some form except a handful. Re-reading `ie/dttas/driving-licence-renewal`'s
own description confirmed it explicitly excludes "a first-time driving
licence, adding or exchanging a category" as a distinct NDLS service — a
clean, disclosed, and until now unfilled gap for a jurisdiction (Ireland)
already deeply covered elsewhere in this registry. Searching NDLS's own site
found the **D201 "Application Form for a Learner Permit"** — a genuine,
directly downloadable, text-layer PDF whose own Part 2 "Application type"
field lists "First time learner permit application" as its first option —
exactly the missing pathway. Picked this cycle.

## Access constraint and how it was worked around

`ndls.ie` and `rsa.ie` both return **HTTP 403** to direct automated requests
(reconfirmed this cycle, consistent with `ie/dttas/driving-licence-renewal`'s
own prior finding), while the underlying PDF and HTML files themselves are
genuinely public with no login/CAPTCHA/WAF gate on their own hosting. Every
source below was retrieved through a **Wayback Machine snapshot**
(`web.archive.org`), the same pattern already established by
`gov-au-wayback-workaround` and used throughout this registry's IE documents:
a cheap `curl "http://archive.org/wayback/available?url=<path>"` check to
find the closest snapshot, followed by a direct `curl` of the returned
`web.archive.org/web/<timestamp>/...` URL. All snapshots resolved on the
first attempt and returned full, current-looking content (not a bot-challenge
page).

## Sources examined

- **Document `(id, version)`:** `ie/dttas/learner-permit-application` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Road Safety Authority (RSA), National Driver Licence Service
  (NDLS)
- **Primary source URL:** <https://www.ndls.ie/images/Documents/LearnerPermits/D201_Learner_Permit_app_form.pdf>
  (retrieved via `web.archive.org/web/20250429002403/...`) — "Application Form
  for a Learner Permit D201", March 2020 edition, 4 pages, genuine text layer
  (confirmed via `pdfjs-dist` `getTextContent()`, no scanned images).
- **Secondary/corroborating sources (all retrieved via Wayback):**
  - <https://www.ndls.ie/how-to-apply/forms-reports.html>
    (`web.archive.org/web/20251115030407/...`) — NDLS's own current forms
    listing, confirming "Application and Guidance Notes for Learner Permit
    D201" remains the live, current form as of this 2025-11-15 snapshot (no
    newer edition superseding March 2020 was found at this or any other URL
    checked this cycle).
  - <https://www.rsa.ie/services/learner-drivers/learner-permit/apply-for-your-first-permit>
    (`web.archive.org/web/20251112132554/...`) — the RSA's current "Apply for
    your first permit" guidance page: confirms the two application channels
    (online via PSC/MyGovID, no paper form; in-person at an NDLS centre using
    the paper form), the current application fee (EUR 45.00, up from EUR
    35.00 effective 2025-01-01 per a `ndls.ie` news-page search snippet not
    independently fetched — see judgment call 4), the age-70 fee exemption,
    and several document requirements (proof of address, proof of residency,
    eyesight/medical report "if applicable") not themselves stated on the
    2020-dated D201 PDF.
  - <https://www.ndls.ie/images/Documents/Forms/171315_NDLS_FULL_LICENCE_AppForm_JAN_2022_WEB_HR.pdf>
    (D401, "Application Form for a Driving Licence", January 2022 edition) —
    fetched and read for comparison/disambiguation only (confirms D401 and
    D201 are structurally parallel sibling forms covering, respectively, the
    full-licence and learner-permit tracks); not used as a field source for
    this document.

## What was confirmed directly (verbatim, from the PDF's own text layer)

The D201 form's own five parts, read via `pdfjs-dist`'s standard text
extraction (no image rendering needed — this PDF, unlike several other
documents in this registry, carries a genuine, fully recoverable text layer):

- **Part 1: Personal Details (p.1, Q1-12):** prior learner
  permit/licence-in-Ireland check, driver number, title, first name, surname
  (as on birth certificate), full name for the permit, surname-change reason
  and previous names, address (4 lines + Eircode), date of birth, gender, PPS
  number, place of birth, mobile/landline/email.
- **Part 2: Learner Permit Details (p.2, Q13-16):** a 7-value + "Other"
  application-type selector (first-time, renewal, add/remove category,
  personal-detail change, replace lost/stolen, replace damaged, category
  upgrade for existing full-licence holders), an optional disqualification-
  period sub-block, a licence-category selector (a repeated Group 1/Group 2
  category table — AM, A1, A2, A, B, BE, W, C1, C, C1E, CE, D1, D, D1E, DE —
  identical to the category list already confirmed by
  `ie/dttas/driving-licence-renewal`'s own `includesGroup2Category` field),
  a foreign-licence-on-receipt question, and (for the lost/stolen pathway) a
  declaration-plus-Garda-certification block.
- **Part 3: Organ Donation (p.2, Q17):** a single opt-in code-115 checkbox.
- **Part 4: Driver Fitness (p.3, Q18-40):** an eyesight/lenses question, then
  21 individually numbered Yes/No medical-condition questions (Q19-Q39) plus
  a 3-part arms/legs restriction question (Q40(a)/(b)/(c)) — each read and
  modelled as its own boolean field, at the same granularity the source form
  itself uses (each is its own numbered checkbox pair).
- **Part 5: Declaration by Applicant (p.3, Q41):** the Road Traffic Act
  1961 s.22A/s.115 declaration, signed and dated by the applicant.
- **Application Checklist (p.4):** the document list required for all
  applications, plus per-option additional items (see judgment calls 2-3
  below for what was and wasn't folded into this v1.0.0's `documents[]`).

## Judgment calls / scope cuts (read before reviewing)

1. **Scoped to "First time learner permit application" (option 1) only.**
   D201 is one shared form across seven application-type values. This
   document models every Part 1-5 field on the base form (all of which are
   presented regardless of which application type is selected) with proper
   `requiredWhen` gating where the form itself ties a field to a specific
   option (e.g. `lostPermitDeclarationSigned`/`gardaCertificationObtained`
   gated on `replace_lost_or_stolen_permit`). It does **not** fully scope out
   each of the other six options' own *distinct* additional-checklist
   requirements (e.g. option 5's name-change evidence, option 6's damaged-
   permit evidence, option 3's category-specific theory-certificate timing
   rule) — those are left unmodelled, the same discipline already used by
   `ph/lto/drivers-license-application` (which models its Type A pathway in
   full and leaves the other ten transaction types as a closed enum) and
   `kr/koroad/driving-licence-application`.
2. **`licenceCategory` modelled as a single enum, not a repeating selection.**
   The paper form's own category table allows ticking multiple categories in
   one application. No array/repeating-value type exists in this spec
   version (GSP-0009 remains undecided per SPEC.md §12) — this document
   follows the same single-value discipline already established by
   `ie/dttas/driving-licence-renewal`'s `includesGroup2Category` field for
   the identical category list.
3. **`documents[]` bounded to what's universal + directly confirmed for the
   first-time pathway.** The D201 checklist's "for all applications" bullets
   (PPS-number evidence, photographic ID) and the RSA current page's
   first-time-specific bullets (address proof, conditional residency proof)
   are modelled. `cpcEvidence` (Certificate of Professional Competence,
   relevant to certain Group 2 professional-driving categories) is included
   per the D201 checklist but left with no `requiredWhen` gate, since neither
   source fetched this cycle states the precise triggering condition (the
   D201 checklist only says "if required, see page 3 of guidance notes" — a
   document not independently retrieved). A reviewer with access to the
   guidance notes should add the proper gate.
4. **Current fee (EUR 45.00) sourced from the RSA page, not the D201 PDF.**
   The 2020-dated D201 form's own checklist only says "Relevant fee (see page
   2 of guidance notes)" — no amount. The EUR 45.00 figure (up from EUR
   35.00) and the 2025-01-01 increase date come from the RSA current
   guidance page directly; the increase date itself is corroborated only by
   a search-result snippet referencing an `ndls.ie` news article
   ("Fee increases to take effect from 01 January 2025") that could not be
   independently fetched this cycle (no Wayback snapshot exists for that
   specific URL) — flagged here as the weakest-sourced single fact in this
   document. The RSA page's EUR 45.00 figure for the fee amount itself is
   directly confirmed twice (once for each channel) on that page, so is not
   equally in doubt.
5. **`previousNames` left as a plain optional field, not `requiredWhen`-gated
   on `surnameChangeReason`.** This spec's `Condition` grammar has no
   field-absence operator; gating an optional field's requiredness on
   whether a *sibling* optional field was filled in is the exact bug class
   documented in this registry's own
   `notequals-empty-string-absent-field-bug` precedent (an absent field
   evaluates as not-equal-to any concrete sentinel, misfiring as
   always-required). Left as a plain optional field with an explanatory
   `description` instead.
6. **`medicalReportRequired` modelled as a declared boolean, not a computed
   one.** Mirrors `ie/dttas/driving-licence-renewal`'s own field of the same
   name: its true/false value depends on an OR across 22 upstream boolean
   answers plus the selected category, too large a set to express cleanly as
   a single `Condition` object, so — consistent with that sibling document's
   precedent — it is modelled as its own required field whose trigger logic
   is stated in its `description`, and `medicalReportForm` is `requiredWhen`
   gated on it directly.
7. **Online-channel field parity assumed, not independently confirmed.** The
   RSA page states the online channel needs "no paper forms" but still lists
   substantially the same underlying data requirements (theory test pass,
   category, address/residency proof, eyesight/medical report, fee) as the
   in-person channel; it does not itself enumerate personal-detail fields
   (name, DOB, PPSN, etc.), presumably because these are drawn from the
   applicant's already-verified PSC/MyGovID profile rather than re-typed.
   This document models the full Part 1-5 field set as the common underlying
   data model for both channels (the same choice already made by the sibling
   renewal document for its own online/in-person split) rather than
   asserting a channel-specific field subset that was not directly observed
   for the online wizard.
8. **D401 (full driving licence) intentionally out of scope.** Confirmed by
   direct comparison to be a distinct sibling form covering the post-test
   licence-issuance and renewal tracks, not learner-permit application; not
   modelled here.

## Second-reviewer amendment (GOV-1536)

Independent re-verification (re-fetching D201 and the RSA page fresh via the
same Wayback URLs, and re-extracting D201's text layer via `pdfjs-dist`)
confirmed all field- and document-level `sourceRef`s against the actual
source text, with one exception: `medicalReportRequired`'s `description`
originally stated the trigger included "or if aged 75 or over", copied from
`ie/dttas/driving-licence-renewal`'s field of the same name. That age-75
trigger does not appear anywhere in either source fetched for **this**
document (confirmed via `grep` over both extracted texts — zero hits for
"75"), and the sibling document's own version of that trigger is specific to
its renewal/expiry-date context, which doesn't directly apply to a
first-time application. The clause has been removed from the description
(the Q19-40(c)/Group-2 portion, which *is* directly sourced from D201, is
unaffected). This has no effect on validation/conformance, since
`medicalReportRequired` is a declared (not computed) field and no
`requiredWhen`/enum logic referenced the age-75 clause.

Every other field and document `sourceRef` in this schema was independently
re-confirmed verbatim against the re-fetched D201 text layer and RSA page
text during this pass.

## What is NOT yet independently verified

- A second reviewer has not yet independently re-fetched and re-extracted
  the D201 PDF and RSA page to confirm every field's `sourceRef` against the
  actual source text.
- No newer D201 edition superseding March 2020 was found this cycle, but
  this was checked only against the current `ndls.ie` forms-listing page's
  Wayback snapshot, not a live crawl of `ndls.ie` itself (blocked, see
  above).
- Live-app/live-form execution testing (per this registry's
  `structural-reference` maturity convention) has not occurred.
- The `cpcEvidence` document's true triggering condition (judgment call 3)
  and the EUR 35→45 fee-increase date (judgment call 4) both rely on a
  source this cycle could not independently fetch.

## Path to a `verified` claim (next step)

1. Independently re-fetch the D201 PDF and the RSA "Apply for your first
   permit" page (via Wayback, following the same access pattern), and
   re-confirm every field's `sourceRef` against the actual source text.
2. Locate and fetch the D201 form's own "Applying for a Learner Permit
   Guidance Notes" document (referenced throughout the form but not itself
   retrieved this cycle) to resolve judgment calls 3 and 4, and to confirm
   the fee amount directly against a first-party NDLS/RSA source rather than
   solely the RSA guidance page.
3. Confirm whether the online-channel wizard's actual field set matches the
   Part 1-5 assumption in judgment call 7, ideally via a live (non-scarce,
   no-PII) walkthrough if one becomes available.
4. Per this registry's `structural-reference` maturity convention, advancing
   `maturity.criteria.verifiedSchema`/`agentReadySchema` requires a second
   reviewer's independent field-by-field pass plus live-app execution
   testing, not just this authoring pass.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-07** (~6
months). Re-check the source, and confirm no newer D201/D401 edition or fee
change has been published, on or before that date and on any `source.url`
change.
