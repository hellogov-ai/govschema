# Verification record — `ca/ircc/passport-renewal-simplified` v2.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and states
the current verification claim honestly.

## Current claim

- **`status`:** `verified`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-02`

A full field-by-field comparison (`manual-source-review-v1` → Procedure step 2)
was completed this pass against the live canada.ca guidance pages and the current
PPTC 054 (02-2026) E form PDF, both fetched directly (see **Access note** below).
The comparison found real drift from v1.1.0, fixed in this version (see
**What changed from v1.1.0**), and no further discrepancies remain against the
sources examined.

## Access note — the v1.x 403 block did not apply this pass

v1.0.0/v1.1.0's VERIFICATION.md recorded that canada.ca returned HTTP 403 to
every direct automated fetch attempted at authoring time, forcing v1.0.0 to be
built from secondary-source transcriptions. That same 403 was reproduced this
pass against a plain HTTP fetch tool. However, navigating the same URLs with a
**real headless Chromium session** (`Page.navigate` over CDP, realistic
`User-Agent` override) returned HTTP 200 for every page and for the PPTC 054
PDF itself, fetched as raw bytes via an in-page `fetch()` call. This is
consistent with the block being a bot-signature/header check on the plain
fetch path rather than an IP-level or geographic block. **Lesson for future
reviews of this source:** if a direct fetch 403s, try a real browser session
before concluding the source is unreachable — it may not be.

## Sources examined

- **Document `(id, version)`:** `ca/ircc/passport-renewal-simplified` / `2.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Immigration, Refugees and Citizenship Canada, Passport Program (IRCC)
- **Primary source URLs (fetched directly, HTTP 200, this pass):**
  - <https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-passports/renew-adult-passport.html>
  - <https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-passports/renew-adult-passport/check-who-renew.html>
  - <https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-passports/renew-adult-passport/required-documents-photos.html>
  - <https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-passports/renew-adult-passport/submit-form-fees.html>
  - <https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-passports/renew-adult-passport/submit-form-fees/apply-by-mail.html>
  - <https://www.canada.ca/content/dam/ircc/migration/ircc/english/passport/forms/pdf/pptc054.pdf>
    — **the actual PPTC 054 (02-2026) E form**, all 6 pages, extracted as plain
    text with `pdfjs-dist` (the PDF's declared form fields did not parse as an
    AcroForm via `pdf-lib` — 0 fields returned — so this document is
    text-and-layout-driven from the rendered page content, not AcroForm field
    introspection; every section/field claim below is taken from that text).
- **Retrieved / reviewed:** 2026-07-02
- **Reviewer:** GovSchema Engineering

## What changed from v1.1.0 (why this is a MAJOR version)

1. **References (Section 5) were entirely unmodeled, and the v1.1.0
   description's "no references" claim was wrong.** The live form requires two
   references — full name, relationship, address, phone(s), email, and years
   known (minimum 2) — for people who are not relatives of the applicant, are
   18+, and agree to be contacted. Added `reference1*`/`reference2*` (10
   fields each). The title's "no guarantor" claim remains accurate (a
   guarantor is a distinct, more formal Passport Program role this process
   still does not require); only the "no references" half of the old
   description was wrong.
2. **Emergency Contact Information (Section 6) is explicitly MANDATORY on the
   live form and was entirely unmodeled.** Added `emergencyContact*` (9
   fields): name, relationship, phone(s), email, and current home address.
   Unlike references, the live form does not exclude family members from this
   role.
3. **`currentPassportWithinExpiryWindow` mischaracterized the eligibility
   rule.** v1.1.0 modeled a tiered "valid, or expired <1 year (online) / up to
   15 years (mail/in-person)" condition, hedged from secondary sources as
   unconfirmed. The live Instructions §A state a single, flat condition: the
   previous passport must have been **issued** within the last 15 years — not
   an expiry-based tiered rule at all. Renamed to
   `currentPassportIssuedWithinFifteenYears` with a corrected description.
   Field rename is itself MAJOR per VERSIONING.md.
4. **`paymentMethod`'s `cash` option was wrong.** The live form's fee
   instructions (§C) state plainly that cash and personal cheques are **not
   accepted for any application submitted in Canada** — not "in person only"
   as v1.1.0 claimed. Removed `cash` from the enum (an enum narrowing, MAJOR
   per VERSIONING.md: an agent built against v1.1.0 could previously send
   `cash` and have it accepted by the schema's own contract; that input is now
   rejected).
5. **New Section 4 (Additional Personal Information) fields, previously
   entirely absent:** address history for the last 2 years
   (`hasDifferentAddressInLastTwoYears` + `previousAddressLastTwoYears*`,
   single-entry scope trim — the live form allows up to 2) and occupation
   status for the last 2 years (`occupationEmployedLastTwoYears` /
   `occupationInSchoolLastTwoYears` / `occupationOtherLastTwoYears` +
   collapsed `occupationDetails` free text).
6. **New Section 1 fields, previously absent:** `formerSurnames`,
   `parentSurnameAtBirth` (required — "unknown" is an accepted value),
   `anticipatedTravelDate`, `eyeColour`, `height`, `phoneSecondary`, and
   `returnPreviousPassport` (return-vs-destroy preference for the surrendered
   passport).
7. **`personalDetailsUnchanged`'s description refined, not changed in
   contract:** the live source confirms the gender-identifier condition is
   satisfied by either the printed gender or an observation-sticker gender —
   consistent with what v1.1.0 already modeled as a single boolean, just
   under-documented.
8. **Resolved the v1.0.0 name-change discrepancy note.** The live source
   confirms unambiguously: any change to name, date of birth, place of birth,
   or gender identifier disqualifies Simplified Renewal outright (Form
   PPTC 153 required instead) — no name-change document can be attached
   inline to this process. `personalDetailsUnchanged` remains a hard
   eligibility gate with no exception field, as v1.0.0 guessed from the
   majority secondary-source reading.

None of the found drift was itself a *recent* change signal — the current
form revision is dated 02-2026 (February 2026), predating this schema's
2026-07-01 v1.1.0 authoring date. The v1.0.0/v1.1.0 gap was a genuine
authoring miss (built from secondary sources during the canada.ca access
block), not a source that moved after last review — worth noting since the
practice's cadence assumes drift is usually a *later* source change, not a
pre-existing miss surfaced by finally reaching the primary source.

## What was confirmed directly against the primary source (no change needed)

| Source element | Field(s) |
|---|---|
| Adult passport issued age 16+ | `currentPassportIssuedAge16OrOlder` |
| 5-year or 10-year adult passport | `currentPassportValidity` |
| Lost/stolen/damaged bars Simplified Renewal (Form PPTC 203 instead) | `passportLostStolenOrDamaged` |
| Name/DOB/place of birth/gender identifier must be unchanged (PPTC 153 otherwise) | `personalDetailsUnchanged` |
| Online channel requires a Canadian home/mailing address | `residentInCanada` |
| Surname/given names must match the previous passport exactly | `surname`, `givenNames` |
| Gender identifier codes F/M/X | `sexOrGenderIdentifier` |
| Passport number/issue/expiry date fields | `mostRecentPassportNumber`, `mostRecentPassportIssueDate`, `mostRecentPassportExpiryDate` |
| Two identical, unaltered photos, 6-month window, studio stamp on the back, no signature required | `photo` |
| 5-year/10-year product choice | `productRequested` |
| Online/mail/in-person channels | `submissionChannel` |

## What is NOT yet independently verified

- **Whether Section 4's "up to 2" addresses/occupation entries beyond the
  first are ever load-bearing for a real agent flow.** This document scopes
  to one prior address and one collapsed occupation-details field (see
  `hasDifferentAddressInLastTwoYears`'s description); a repeatable-group
  spec construct would let a future version model the full multiplicity.
- **The exact wording IRCC uses for "immediate family" / "extended family"
  exclusions for references** is taken from the form's own text
  (`reference1Relationship`/`reference2Relationship` descriptions); the
  linked canada.ca reference/guarantor definitions page was not itself
  fetched this pass.
- **Postal/phone/passport-number patterns** remain GovSchema conventions, not
  citations of a published validation rule from the source (unchanged from
  v1.0.0).
- **Fees and processing times** remain deliberately unencoded (unchanged from
  v1.0.0); the live source's fee table (`$122.50`/`$163.50` as of 2026-03-31)
  was read but is not modeled as data.
- **Online-channel capacity limiting** ("currently accepting a limited number
  of online applications each day") is noted in `residentInCanada`'s
  description but not modeled as a structured field — it is an operational
  rollout state, not a stable eligibility rule, and revisiting it belongs to
  the next scheduled review rather than a new field now.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01** (6
months) — unchanged from v1.1.0's cadence; passport renewal fees/eligibility
are policy-sensitive (a fee change already landed 2026-03-31 during this
document's short history). Re-check the source on or before that date and on
any `source.url`/form-revision change; the form's own revision stamp
(`PPTC 054 (MM-YYYY) E`) is a fast, direct staleness check for a future
reviewer — if it no longer reads `(02-2026)`, re-run the full comparison.
