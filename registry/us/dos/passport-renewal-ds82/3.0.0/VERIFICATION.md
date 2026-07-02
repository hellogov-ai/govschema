# Verification record — `us/dos/passport-renewal-ds82` v3.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. Earlier versions' `VERIFICATION.md` files stay in place unedited
(VERSIONING.md §3 immutability); this is a fresh record for `v3.0.0`.

## Current claim

- **`status`:** `verified` (unchanged — this is a targeted field-model
  correction, not a re-review that found the schema stale)
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-02`

## Origin: a spot-check finding, not a scheduled re-review

This version ships [GOV-689](/GOV/issues/GOV-689), a finding from an
independent spot-check of `v2.0.0` performed under [GOV-664](/GOV/issues/GOV-664)
§6 (re-verification sampling across the DOS forms vertical). The spot-check
re-extracted the live fillable Form DS-82 PDF's AcroForm field set and found
that `v2.0.0`'s single generic `mostRecentPassportNumber` /
`mostRecentPassportIssueDate` field pair actually corresponds to **four**
distinct named widgets on the live form, not one:

- `Most recent U.S. passport book number` (text)
- `Most recent U.S. passport card number` (text)
- `Book Issue Date mm/dd/yyyy` (text)
- `Card Issue Date mm/dd/yyyy` (text)

`v2.0.0`'s own review already enumerated all 71 widgets (see its
`VERIFICATION.md`) but did not surface this split — it was missed, not an
intentional scope trim (contrast with that version's explicitly-reasoned
omissions, e.g. `Additional # 1`/`Additional # 2`).

## Independent re-confirmation performed for this version

Rather than take the spot-check's finding at face value, this version
re-fetched the live form fresh and re-derived the field list independently,
per the practice's Procedure step 1 (locate and confirm the authoritative
source) and step 2 (field-by-field comparison):

- **Source page** — `https://travel.state.gov/en/passports/renew-replace/mail.html`,
  unchanged since the `v2.0.0` review.
- **Form PDF** — `https://eforms.state.gov/Forms/ds82_pdf.PDF`, re-downloaded
  2026-07-02. Footer still reads "DS-82 04-2025", OMB expiration 06/30/2028 —
  same edition `v2.0.0` reviewed, so this is a corrective re-model of the
  same source snapshot, not a reaction to a form revision.
- **AcroForm field enumeration**, via `pdf-lib`'s form-field API: **71 named
  widgets total**, matching `v2.0.0`'s count exactly (no drift). Confirmed
  directly, by name, the four widgets above exist as four independent text
  fields (not, for example, one field with an internal book/card toggle).

## Why this is MAJOR, not MINOR

Per [VERSIONING.md](../../../../../VERSIONING.md) §1, removing a field or
renaming its `name` is MAJOR: an agent built against `v2.0.0` that populated
`mostRecentPassportNumber` / `mostRecentPassportIssueDate` would have that
input rejected by `v3.0.0`, which no longer defines those fields. `1.1.0`'s
prior MAJOR bump to `2.0.0` (a source-drift correction) is independent of this
one; SemVer for this schema simply continues from wherever it last stood.

## Fields changed

`mostRecentPassportNumber` and `mostRecentPassportIssueDate` are removed and
replaced with four fields, gated on the existing `productRequested` field
(`book` / `card` / `book_and_card`) using [GSP-0013]'s `Condition` grammar
(`visibleWhen`/`requiredWhen`, the `in` operator — same pattern as
[GOV-641](/GOV/issues/GOV-641) and `gb/ukvi/standard-visitor-visa`'s
`employmentStatus`-gated fields):

- `mostRecentPassportBookNumber` / `mostRecentPassportBookIssueDate` —
  required when `productRequested` is `book` or `book_and_card`.
- `mostRecentPassportCardNumber` / `mostRecentPassportCardIssueDate` —
  required when `productRequested` is `card` or `book_and_card`.

This lets a `book_and_card` applicant — someone who previously held a
passport book **and** a card as two separate physical documents — submit
both documents' numbers and issue dates, which the prior single generic pair
could not represent without overloading one field or silently dropping data.

## Flow adjustment: `productRequested` moved earlier

`productRequested` previously lived in the final `supporting_items` step,
**after** the `most_recent_passport` step that now contains fields whose
`requiredWhen`/`visibleWhen` reference it. Referencing a field not yet
collected in an earlier step is not prohibited by the spec (§6.7's
acyclicity rule is a name-graph constraint, not a step-order constraint), but
it does not match this vertical's established convention (`gb/ukvi`,
`ca/ircc/passport-renewal-simplified`: a gating field is always presented at
or before the fields it gates). `productRequested` is moved to be the first
field of the `most_recent_passport` step, immediately before
`mostRecentPassportFullName`; `supporting_items` keeps `photo`,
`passportBookSize`, `serviceSpeed`, `paymentMethod`. Nothing about
`productRequested` itself changes — same `name`, `type`, `validation`,
`sourceRef` — only its step assignment.

## Everything else re-checked in GOV-689 and found current (no other drift)

Carried over from the GOV-689 finding, all independently re-confirmed as part
of this review rather than assumed:

- Six eligibility statements match the live PDF Section A wording verbatim,
  same as `v2.0.0`.
- `sexMarker` enum (`F`/`M` only) confirmed against the live `Gender` widget.
- `mailingAddressLine2` "In Care Of" wording confirmed verbatim.
- Form edition/OMB info (`DS-82 (Rev. 04-2025)`, OMB expiration 06/30/2028)
  matches `source.documentRef` exactly — unchanged since `v2.0.0`.
- Fees, expedited-service surcharge, and expedited shipping fee remain
  correctly excluded as volatile data (existing scope decision, unchanged).
- The online-renewal path (`opr.travel.state.gov`) remains correctly out of
  scope — a separate, stricter-eligibility alternative with no DS-82
  reference; this document is intentionally scoped to the mail-only DS-82
  flow.

## Sources examined

- **Live page:** <https://travel.state.gov/en/passports/renew-replace/mail.html>,
  retrieved 2026-07-02.
- **Form PDF:** <https://eforms.state.gov/Forms/ds82_pdf.PDF> ("DS-82
  04-2025"), retrieved 2026-07-02, extracted via `pdf-lib`'s AcroForm
  form-field API (71 named widgets enumerated; the four book/card widgets
  confirmed by name).
- **Retrieved / reviewed:** 2026-07-02
- **Reviewer:** GovSchema Engineering (Standards Engineer)

## Re-verification

`nextReviewBy` stays **2027-01-02**, unchanged from `v2.0.0` — this version
does not reflect a new review cycle, only a correction discovered mid-cycle;
the underlying source snapshot and its 6-month cadence are unaffected.

[GSP-0013]: ../../../../../spec/proposals/0013-extended-conditional-logic.md
