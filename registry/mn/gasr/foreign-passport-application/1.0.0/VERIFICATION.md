# Verification record — `mn/gasr/foreign-passport-application` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-16`

This is a `GovSchema Standard Research` cycle (**GOV-3389**), a general
research-analyst brief covering DMV, Business Formation, Visa, Passport,
Taxes, and National ID & Civic Documents across all jurisdictions.

## Why this candidate

Mongolia opened as this registry's 68th jurisdiction via GOV-3375
(`mn/mfa/evisa-application`, Visa) and added Business Formation via GOV-3382
(`mn/gasr/state-registration-limited-liability-company`). Both of those
cycles, and the GOV-3375 cycle in particular, re-confirmed Mongolia's
Passport vertical as gated: the domestic `e-mongolia.mn` portal requires
account login plus in-person biometric capture, with no unauthenticated
field-level form reachable. This cycle found a genuinely different,
unauthenticated channel for the same underlying process — passport
templates published directly on the Ministry of Foreign Affairs' own
consular-network subdomains — and authored against that channel instead.
**This supersedes nothing about the e-mongolia.mn finding itself, which
stands unchanged**; it simply uses a different source the prior cycles did
not check.

## Sources examined

### Primary sources

- **Authority:** the application package is addressed to Улсын бүртгэлийн
  ерөнхий газар (General Authority for State Registration, GASR) — the same
  authority as `mn/gasr/state-registration-limited-liability-company` — even
  though it is distributed through the Ministry of Foreign Affairs' consular
  network, hence this schema's `mn/gasr/...` id, following this registry's
  own established convention of naming the id after the authority the form
  is addressed to.
- **Document 1 — "ГАДААД ПАСПОРТ Мэдүүлгийн маягт" (Declaration Form).**
  - **URL (directly retrieved, HTTP 200, plain unauthenticated curl):**
    `https://sanfrancisco.consul.mn/images/ГАДААД%20ПАСПОРТ%20Мэдүүлгийн%20маягт_1711748587.pdf`
  - **File identity:** genuine text-layer PDF (confirmed by its own
    `%PDF-1.7` header), 149,831 bytes,
    `sha256:5f0ec61fdfc9207dac06e52fbe0ab57519b9dfd22776010e60d49d431e39001d`.
  - **Corroborating mirror (content-identical, same upload timestamp):** the
    Mongolian Embassy in Washington, D.C.'s own site,
    `https://mongolianembassy.us/wp-content/uploads/2025/06/ГАДААД-ПАСПОРТ-Мэдүүлгийн-маягт_1711748587.pdf`,
    136,467 bytes,
    `sha256:3e98124259a22cc0a0e5bc7ad04cddef0b56fd0db2ee025a413052a78135bb44`
    (a different byte size than the San Francisco copy despite identical
    extracted text — consistent with the Embassy's WordPress media pipeline
    recompressing/re-saving the same PDF content, not a different edition).
  - **Older mirror (distinct prior revision):** the Hong Kong consulate's
    own service page links a still-live, August-2023-timestamped edition on
    the San Francisco domain,
    `https://sanfrancisco.consul.mn/images/ГАДААД%20ПАСПОРТ%20Мэдүүлгийн%20маягт_1692214514.pdf`,
    149,244 bytes,
    `sha256:b677b257881599978e35e71358019d978921c87dd95d6a6673756304818d5480`.
  - **Extraction method:** `pdfjs-dist`'s `getTextContent()` (installed
    standalone in a scratch directory for extraction only, not added as a
    repository dependency). Raw text items were re-ordered into reading-order
    lines using each item's own `x`/`y` transform, since the raw item stream
    interleaves label and blank-line runs; this also let a genuine template
    quirk be confirmed directly against the raw items rather than assumed
    from rendered text — see "Scope and disclosed boundaries" below.
  - **Structure confirmed:** a 14-question citizen declaration (§1-14: family
    name; parent's and own given name, each in Cyrillic and Latin script;
    citizen registration number; civil-ID-card expiry; employer/current-
    residence/emergency-contact blocks; travel/residence-abroad details; a
    state-secret-responsibility declaration; a criminal-record declaration;
    prior-passport history; a reissue-reason narrative; a photo-upload
    confirmation) followed by an officer-only section ("Хоёр. Гадаад
    паспортын ажилтны тэмдэглэл") — complaint checks, other travel-
    restriction findings, issued passport number, fees, and the reviewing
    officer's own sign-off — filled in by consular staff, not the applicant.
- **Document 2 — "ГАДААД ПАСПОРТ Өргөдлийн маягт" (Application/cover letter,
  addressed to GASR).**
  - **URL (directly retrieved, HTTP 200), current 2026 revision:**
    `https://sanfrancisco.consul.mn/images/ГАДААД%20ПАСПОРТ%20Өргөдлийн%20маягт%202026_1769108627.pdf`
  - **File identity:** genuine text-layer PDF, 155,113 bytes,
    `sha256:66ce741e65fcfb4da2e9925919eabcd93f988884e8169b3967fa8661be351f16`.
    Filename and upload timestamp (2026-01-22) both match the San Francisco
    consulate's own service page's article byline, itself fetched and read
    in full this cycle — corroborating this is the current, live edition.
  - **Structure confirmed:** addressed "УЛСЫН БҮРТГЭЛИЙН ЕРӨНХИЙ ГАЗАРТ" (to
    GASR); a body naming the applicant's surname/given name and city of
    residence abroad (this template's own pre-printed text names "Америкийн
    Нэгдсэн Улсын", i.e. of the United States of America, leaving only the
    city blank); two alternative, applicant-selectable purpose paragraphs —
    "А." (reissue an existing passport, with its own passport-number blank
    and a checkbox-style reason list: lost/damaged/pages-full/expired/other)
    and "Б." (order a genuinely new passport); then address/phone/email
    blanks and a date field.
  - **Older mirrors, disclosed as a materially different, single-branch
    edition, not glossed over as identical:** both the Hong Kong-linked
    August-2023 edition
    (`https://sanfrancisco.consul.mn/images/ГАДААД%20ПАСПОРТ%20Өргөдлийн%20маягт_1692214552.pdf`,
    121,387 bytes,
    `sha256:7d936eb3b8dca1d6e75085c5e04fa72a7b778c632f4be3f66fec9e183ab8e3f5`)
    and the Embassy's March-2024 edition
    (`https://mongolianembassy.us/wp-content/uploads/2025/06/ГАДААД-ПАСПОРТ-Өргөдлийн-маягт_1711748602.pdf`,
    110,900 bytes,
    `sha256:abcb4019b9c3b3a5c8a134afd154706d99595530e7c59b467907b9ee2b27b15b`)
    contain **only** the "А." reissue paragraph — no "Б." new-order paragraph
    exists in either. The "Б." branch, and this schema's `applicationType`
    field as a result, is sourced from the single most-current San Francisco
    edition only; the "А." reissue branch itself (existing-passport-number
    blank, reason checkboxes, address/phone/email/date fields) is triply
    corroborated across all three domains.
- **Consulate service page** (directly retrieved, HTML, HTTP 200):
  `https://sanfrancisco.consul.mn/page/134` ("ГАДААД ПАСПОРТ ШИНЭЭР АВАХ"),
  dated 2026-01-22 in its own article byline. Its own numbered checklist
  ("Бүрдүүлэх материал") lists, for ages 16 and over: a valid Mongolian
  civil e-ID card copy, an expired-passport copy (for reissue), a passport
  photo (submitted via the separate `photo.burtgel.gov.mn` web service, not
  this form), and a $50 USD fee (card/cash in person; money order or
  cashier's check only by mail, personal checks explicitly refused) — plus,
  for a lost passport specifically, a police report. This is the direct
  sourcing basis for this schema's `documents[]` array. The same page also
  lists a distinct ages-0-15 document set and a separate power-of-attorney
  ordering channel — both disclosed as out of scope, see below.
- **Cross-corroborating mirrors** (both directly retrieved, HTML, HTTP 200):
  the Hong Kong consulate's own service page
  (`https://hongkong.consul.mn/page/48`) and the Mongolian Embassy in
  Washington, D.C.'s own site (`https://mongolianembassy.us/passportorder/`).

### External reference

- **`citizenRegistrationNumber`'s pattern** reuses this registry's own
  already-verified Mongolian citizen registration number format (2 Cyrillic
  letters + 8 digits), sourced from `mn/gasr/state-registration-limited-liability-company`'s
  own citation of Wikipedia's "Citizen Identity Card (Mongolia)" article,
  rather than re-deriving it from this source — neither PDF examined this
  cycle prints individual character-entry boxes for this particular field
  (unlike the UB-03/UB-12 forms, which do).

## Scope and disclosed boundaries

This schema models both PDFs together as one process, because they are
filed together as a single package and the cover letter's own two
alternative purpose paragraphs are the direct textual basis for this
schema's `applicationType` first-time/reissue branch.

A genuine numbering quirk in the Declaration form's own template is
disclosed rather than silently corrected: the form labels both the
parent's-name field and the applicant's-own-given-name field "2." (it never
prints a "3."), then resumes at "4." for the registration-number field.
This was confirmed directly against the PDF's own raw text items (each
item's own string and `x`/`y` transform), not assumed from rendered text or
treated as an extraction artifact — an August-2023 prior edition of the same
form (linked from the Hong Kong consulate's page) has this correctly
numbered 1-14, confirming the quirk was introduced in a later revision.

Explicitly out of scope, and disclosed rather than silently omitted:

- The Declaration form's own **officer-only section** ("Хоёр. Гадаад
  паспортын ажилтны тэмдэглэл") — filled in by consular staff, not the
  applicant.
- The separate **`photo.burtgel.gov.mn` photo-submission web service** the
  consulate's own checklist references — modelled here only as a yes/no
  confirmation field (matching the Declaration form's own §14) and a
  required `documents[]` entry, not as a file-upload field or a driven
  sub-service.
- The **minor-applicant (ages 0-15) document sub-track** the consulate's own
  checklist page names (birth certificate plus a parent's ID card copy, in
  place of the adult applicant's own civil-ID-card copy) — this schema
  models only the ages-16-and-over adult-applicant branch, the same class
  of disclosed age-branch omission as this registry's own
  `mn/mfa/evisa-application` guardian/minor sub-flow.
- The **power-of-attorney alternate ordering channel** ("Хоёр. Бусдад
  итгэмжлэл олгох замаар шинэ паспорт захиалах") the consulate's own page
  describes — a materially different process (an in-Mongolia proxy orders
  the passport on the applicant's behalf), not modelled here.
- **Payment mechanics** — captured only as a required `documents[]` payment
  entry with its own sourced $50 USD amount, not as payment-processor
  fields, consistent with this registry's established convention.
- This schema's `reissueReasonDetail` (Declaration form §13) is modelled
  `requiredWhen applicationType equals reissue` — a disclosed inference, not
  a literal source-printed checkbox gate: the Declaration form's own layout
  asks this of every applicant sequentially, with no branching checkbox, but
  a first-time applicant has no prior passport to give a reason for
  re-obtaining.
- The templates fetched are specifically the **U.S.-consular-network
  variant** of the cover letter (its own body text pre-prints "Америкийн
  Нэгдсэн Улсын", i.e. of the United States of America, leaving only the
  city blank) — a different country's Mongolian consulate would use that
  consulate's own country-specific equivalent template, not fetched this
  cycle.

## Conformance fixtures

13 fixtures are committed under
`conformance/mn/gasr/foreign-passport-application/1.0.0/`: 2 valid
submissions (0 errors each — a first-time-branch minimal case with no
reissue-specific fields populated, and a reissue-branch case exercising
every `requiredWhen`-gated field including `reissueReasonCategory: "other"`
paired with its own required `reissueReasonOtherText`) and 11
mutation-control fixtures (each expected to raise exactly 1 error): a
missing `existingPassportNumber`/`reissueReasonCategory`/
`reissueReasonOtherText`/`reissueReasonDetail` when reissue-gated,
an invalid `applicationType` enum value, an invalid `reissueReasonCategory`
enum value, an invalid `citizenRegistrationNumber` pattern, an invalid
`contactEmailAbroad` pattern, a negative `priorPassportCount`, a missing
`photoUploaded` (boolean), and a missing `familyName`. All 13 were checked
with a from-scratch, throwaway Node mock validator implementing this
schema's own `required`/`requiredWhen`/`validation` rules (not committed —
consistent with this registry's established per-cycle practice of writing
an independent validator rather than reusing the authoring script). Both
`tools/validate.mjs` and `tools/validate-ajv.mjs` pass at 515/515 across the
full registry with this schema added, and `tools/verify-sources.mjs` passed
clean (11 URLs checked, 0 warnings, 0 allowlisted) against this schema's own
`source.url`/`documentRef`/`verification.notes` citations.

## Known gaps

- Mongolia's remaining Taxes and DMV verticals are confirmed dead
  ends/too-weak as of the GOV-3382 cycle (unreachable / narrative-only
  respectively); not re-screened this cycle. Mongolia now stands at 3 of 6
  verticals (Visa, Business Formation, Passport).
- The minor-applicant (0-15) document sub-track and the power-of-attorney
  alternate ordering channel are disclosed, open backlog candidates for a
  future minor-version cycle — see "Scope and disclosed boundaries" above.

## Verification method assessment

`manual-source-review-v1` — a human/agent read the primary sources directly
and transcribed their fields. No automated re-verification tooling exists
yet for this schema; `nextReviewBy` is set 6 months out per the practice's
default cadence.
