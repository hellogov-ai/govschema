# Verification record — `nz/dia/passport-renewal-adult` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and states
the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-01`

The document was **derived from** the official `govt.nz` renewal guidance and a
**directly-read primary-source PDF** (the DIA identity referee declaration form),
cross-checked against independent secondary sources. The full field-by-field
comparison the practice requires (confirming *every* published field, type,
requiredness, and constraint against the live PAS300 form — `manual-source-review-v1`
→ Procedure step 2) has **not** yet been completed and recorded, because the form
PDF itself could not be retrieved (see Access constraint below). It therefore
remains `draft`, not `verified`.

## Source examined

- **Document `(id, version)`:** `nz/dia/passport-renewal-adult` / `1.0.0`
- **Spec version:** GovSchema `0.2.0`
- **Authority:** Department of Internal Affairs, New Zealand Passports (DIA)
- **Primary source URL:** <https://www.govt.nz/browse/passports-citizenship-and-identity/get-or-renew-a-new-zealand-passport/renew-or-replace-your-adult-passport/>
- **Official form id:** `PAS300` (Application for a New Zealand Passport — Adult renewal)
- **Retrieved / reviewed:** 2026-07-01
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## Access constraint

`passports.govt.nz` (the DIA's own passport-specific domain) returned `HTTP 403`
to automated retrieval for every page and PDF fetched directly, including the
"what you need for your application" and "identity referee or witness" guidance
pages and both `PAS300-Application-for-a-NZ-passport-Adult-renewal_260408.pdf`
and `Adult-new-v2.pdf` (same class of gotcha as `ca/ircc/passport-renewal-simplified`
and `ie/dfa/passport-renewal-adult`; see [[gov-form-pdf-extraction]] in engineering
memory). Unlike those two cases, however, **`govt.nz`** — the official cross-agency
New Zealand Government portal, not a secondary/mirror site — served its content
without blocking, and one directly relevant DIA PDF hosted on `govt.nz` (not
`passports.govt.nz`) was retrieved and read directly:

- `BDM76 — Identity Referee Declaration` (govt.nz-hosted, last updated 10 June 2025):
  read in full via the PDF text layer. It gave the referee's exact eligibility
  criteria and the applicant/referee field set verbatim, encoded here as
  `refereeGivenNames` … `refereePhone` and the `refereeGivenNames` field
  description's referee-eligibility text.

The `PAS300` applicant-detail fields (`surname` … `eyeColour`, `addressStreet` …
`addressPostcode`, `previousPassportNumber` … `previousPassportExpiryDate`) are
therefore modelled from the `govt.nz` guidance pages plus corroborating secondary
transcriptions (a passport-agent guide, `visafoto.com`'s field-by-field renewal
walkthrough, and Citizens Advice Bureau search summaries), not from a direct read
of the PAS300 PDF itself. Every fact below was corroborated by at least two
independent sources before being encoded.

## What was confirmed directly

- **Referee eligibility and field set** — read verbatim from the `BDM76` PDF:
  the referee must hold a valid NZ passport, not be a relative/partner/spouse,
  not live at the applicant's address, be 16 or older, and have known the
  applicant for 12+ months. Referee fields collected: first names, surname, date
  of birth, NZ passport number, residential address, contact phone number.
- **Eligibility to apply at all** — `govt.nz`: New Zealand citizenship required;
  adult passport is for those aged 16 or older.
- **Fee and validity** — `govt.nz`: adult passport is valid 10 years, current fee
  NZD 247 (not encoded as schema data; fees change and consumers should confirm
  on the live source).

## What was corroborated across secondary sources (2+ each)

| Claim | Field(s) | Sources |
|---|---|---|
| Online renewal eligible if the previous passport is current, or expired less than 24 months | `previousPassportStatus` | `govt.nz` render synthesis + `visafoto.com` + search-result eligibility summaries |
| Name and date of birth must be unchanged for the online channel; a name change requires the paper form with supporting documents instead | `nameAndDateOfBirthUnchanged` | `govt.nz` "changing your name" page synthesis + `visafoto.com` |
| Applicant fields collected: name, DOB, place of birth, gender, height, eye colour, address, contact details, previous passport number/issue/expiry | `surname` … `previousPassportExpiryDate` | `dia.services.govt.nz` "getting started" page (direct read) + `visafoto.com` field walkthrough |
| Digital photo requirements: colour, ~3:4/4:3 aspect ratio, 900–3000px, 250 KB–5 MB, taken within 6 months | `photo` | `visafoto.com` (only source with pixel/byte specifics; not independently corroborated — flagged below) |
| Standard vs. urgent processing, urgent aims for 3 working days, additional fee | `processingSpeed` | `govt.nz` (direct read) + `dia.services.govt.nz` (direct read) |
| Payment by card or online banking | `paymentMethod` | `visafoto.com` + general govt.nz payment-method conventions used elsewhere in the passport service |

## What is NOT yet independently verified

- The **exact PAS300 field labels and section order** (`surname` … `eyeColour`,
  the previous-passport section) are inferred from guidance-page prose and one
  secondary field-by-field walkthrough, not read from the primary PDF. `sourceRef`
  annotations naming "PAS300 — ..." are indicative section groupings, not
  citations of the printed form.
- The **photo pixel/byte specifications** in `photo`'s description come from a
  single secondary source (`visafoto.com`) and were not corroborated elsewhere;
  treat these numbers as unverified until checked against the live photo-standards
  page.
- Whether `addressSuburb` and `addressPostcode` are genuinely optional on the live
  form (rather than required) is inferred from typical NZ address conventions, not
  confirmed against the primary source.
- The **24-month online-renewal expiry window** boundary (`previousPassportStatus`)
  and whether it differs for the paper-form channel is taken from secondary
  synthesis and should be confirmed against the primary eligibility page.
- **Fees and processing times** are deliberately not encoded as schema data (see
  `processingSpeed`/`paymentMethod` field descriptions); the document points
  consumers to the live source.
- Whether a **citizenship-evidence upload** is required for applicants whose
  citizenship was granted (as opposed to by birth) is out of scope for this
  renewal document; it is noted in `isNzCitizen`'s description as a possible
  prerequisite process, not modelled as a field.

## Path to a `verified` claim (next step)

To advance this document to `status: verified`, a reviewer needs to work around
the `passports.govt.nz` `HTTP 403` block (e.g. from an unrestricted network or a
manual browser session) to retrieve the `PAS300` PDF directly and apply
`manual-source-review-v1` (Procedure step 2 field-by-field comparison, step 3 flow
comparison) against it; confirm the photo pixel/byte specification; and confirm
the `addressSuburb`/`addressPostcode` requiredness. Record the outcome here before
setting `status: verified` with a current `verification.lastVerifiedAt` /
`nextReviewBy`. This v1.0.0 record stays as the authoring provenance.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01** (6 months):
passport renewal is a fee/policy-sensitive process, and this record's partial
reliance on secondary sources for the applicant-field section argues for the
shorter end of the cadence. Re-check the source on or before that date and on any
`source.url` change.
