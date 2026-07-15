# Verification record — `th/mfa/thai-national-id-card-application` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-15`
- **`maturity.level`:** `structural-reference`

This is GovSchema Standard Research cycle **GOV-3228**, scouted from **GOV-3225**
("GovSchema Standard Research"). It closes **Thailand's registry coverage to
full 6/6 verticals** — Passport (`th/mfa/passport-application-royal-thai-embassy-london`),
Taxes (`th/rd/pit-90-personal-income-tax-return`), Business Formation
(`th/dbd/boj-1-application-to-register-a-limited-company`), Visa
(`th/mfa/non-immigrant-visa-b-application-for-employment`), and DMV
(`th/dlt/vehicle-registration-application`) were already modelled; National ID
was the sole remaining gap.

## Candidate screening this cycle (both confirmed dead ends, per the issue brief)

- **ThaID digital-ID app/login** — a login-gated single-page application with
  no field-level form to model. Confirmed a dead end by an earlier cycle; not
  re-attempted per the issue brief's explicit instruction.
- **DOPA/BORA in-country counter process** — the primary domestic National ID
  issuance path. Independently re-confirmed this cycle: `dopa.go.th/app_form`
  and `bora.dopa.go.th/download/` list only prose service guides and internal
  manuals, no citizen-fillable blank application form. Independent sources
  (consistent with this registry's own `th/mfa/passport-application-royal-thai-embassy-london`
  National-ID screening note from an earlier cycle) confirm issuance is
  strictly in-person and counter-only: a DOPA officer enters the applicant's
  data directly into the BORA system and captures a live photograph and
  fingerprints biometrically, printing the internal บ.ป.1 request form from
  the system itself — the applicant never completes a paper form in advance.
  Not pursued.

## Source verification (independently re-derived, not trusted from the issue brief as final)

- **URL:**
  `https://image.mfa.go.th/mfa/0/91fPdh6NtO/Consular-Services/Consular_service-forms/2.1_Thai_ID_Card_Application_Form.pdf`
- Fetched independently via `curl`:
  - **HTTP 200**, `Content-Type: application/pdf`, `Content-Length: 118599`
    bytes — matches the issue brief's own recorded byte size (~118KB) exactly.
  - **`sha256`:** `caf0eb02d4cd97e5cff7f3cd0d9a987084bc785f599917d5da84d371329f7674`
    (computed via `sha256sum` on the freshly-downloaded file; first hash on
    record for this file, the issue brief did not record one to cross-check
    against).
- Parsed with `pdfjs-dist@3.11.174` (legacy build, per this registry's pinned
  version — the 4.x line has previously failed node-canvas rendering in this
  environment): `getAnnotations()` confirms **0 Widget annotations** on the
  form's single page (a plain print-and-fill form, not an AcroForm);
  `getTextContent()` confirms a real, fully extractable bilingual Thai/English
  text layer — not a scanned image. Every field below was read via
  coordinate-sorted line grouping (`getTextContent()` items grouped by rounded
  `y`, ordered by `x`), the same technique used across this registry's other
  flat-print-form entries (`th/mfa/passport-application-royal-thai-embassy-london`,
  `np/donidcr/national-identity-card-application`).
- Grepped the extracted text for `*` and for Thai/English words for
  "required"/"mandatory" (`จำเป็น`, `บังคับ`) — **zero matches** anywhere on
  the form. No required-field marking convention of any kind exists on this
  source.

## Consular-vs-domestic scope, disclosed

This schema models the **Washington, D.C. consular variant**, not the primary
in-country DOPA/BORA process (confirmed a dead end above) — disclosed in the
schema's own `title` and `description` rather than presented as the canonical
domestic form. This same template's filename and layout pattern recurs across
multiple Thai consular posts (Washington D.C., Sydney, Jakarta — per the issue
brief's own note), supporting treatment as a stable Ministry of Foreign
Affairs (MFA) standard template, not a one-off local variant — but it remains
embassy/consular-scoped: the form's own "Current Address in the U.S." block,
and its distribution from the Washington, D.C. embassy's own consular-forms
page, make this an overseas-Thai-national specimen for U.S. residents
specifically, not a domestic nationwide one.

## No required-field marker exists anywhere on this form

Confirmed above (zero `*` characters, zero "required"/"mandatory" text
anywhere in the extracted text layer). Requiredness is therefore a disclosed
judgment call, following this registry's established precedent for no-marker
forms (`np/donidcr/national-identity-card-application`,
`th/mfa/passport-application-royal-thai-embassy-london`, `bd/dip`):

- **Marked `required`:** `applicationDate`, `titlePrefix`,
  `applicantNameThai`, `applicantNameEnglish`, `nationalIdNumber`,
  `applicationPurpose`, and the current-U.S.-address/contact fields the
  Embassy needs to process a mail-in request and reach the applicant
  (`addressHouseNo`, `addressRoad`, `addressCity`, `addressState`,
  `addressZipCode`, `phoneNumber`, `email`). This form has no separate
  delivery-preference or appointment-booking mechanism (unlike
  `th/mfa/passport-application-royal-thai-embassy-london`'s explicit
  postal-return-vs-in-person-collection choice), so both `phoneNumber` and
  `email` are treated as the Embassy's only means of contacting the
  applicant — a disclosed judgment call rather than an assumption that one
  channel alone would suffice.
- **`addressAptSuite`** is left optional, since not every address includes a
  unit number.
- **`religion`, `bloodType`, `occupation`** are printed as bare, unqualified
  blanks with no surrounding text suggesting they are essential to processing
  an ID-card request (unlike the applicant's own identity and contact
  particulars) — left optional, consistent with
  `np/donidcr/national-identity-card-application`'s treatment of the same
  class of bare demographic blank (caste/sex/religion/occupation on that
  form).

## `applicationPurpose` and the New-card/Replacement sections

The source's own "มีความประสงค์ขอมีบัตรประจำตัวประชาชน" (Purpose for
Acquiring New Thai ID Card) section presents two mutually exclusive top-level
request types, each as a prose statement followed by its own checkbox row (no
AcroForm checkbox widgets exist anywhere on this specimen):

- **ขอมีบัตรใหม่ (New card)** — due to expiry (บัตรหมดอายุ) or loss/theft
  (บัตรสูญหายหรือถูกทำลาย).
- **ขอเปลี่ยนบัตร (Replacement)** — due to one or more independently
  selectable reasons.

Modelled as a two-value `applicationPurpose` `enum` (`new-card` /
`replacement`) rather than two booleans plus an `exclusivityGroups` entry,
matching this registry's established convention for bare "choose one of these
statements" prose selectors (cf.
`th/mfa/passport-application-royal-thai-embassy-london`'s `deliveryPreference`).

- **`newCardReason`** (Expired vs. Lost/Stolen) is a second mutually
  exclusive pair nested under the `new-card` purpose. Modelled as an `enum`
  with `requiredWhen: { field: "applicationPurpose", equals: "new-card" }`
  — per spec §10, its static `required` is therefore `false`, and its
  effective requiredness collapses to `false` whenever `applicationPurpose`
  is not `new-card`.
- **`oldCardBackNumber`** is explicitly qualified "ถ้ามี" ("if any") by the
  source itself, so it is modelled as unconditionally optional, with a
  `visibleWhen` (not `requiredWhen`) tying its presentational relevance to
  the `new-card` purpose.
- **The eight Replacement reasons** (`replacementTitleChanged`,
  `replacementAddressChanged`, `replacementThaiFirstNameChanged`,
  `replacementThaiLastNameChanged`, `replacementThaiFirstAndLastNameChanged`,
  `replacementEnglishNameChanged`, `replacementDamaged`, `replacementOther`)
  are modelled as **independent boolean fields**, not a single enum, because
  the source's own checkbox layout allows more than one to apply
  simultaneously (e.g. a title change and an address change on the same
  request) — unlike the New-card-vs-Replacement and Expired-vs-Lost/Stolen
  choices, each of which is printed as a single mutually exclusive pair. Each
  carries a `visibleWhen: { field: "applicationPurpose", equals: "replacement" }`;
  all are left optional since the source imposes no explicit "select at
  least one" instruction to validate against.
  - **`replacementThaiFirstNameChanged`, `replacementThaiLastNameChanged`,
    and `replacementThaiFirstAndLastNameChanged`** are printed as three
    distinct, seemingly overlapping checkboxes. Modelled exactly as printed
    (three separate booleans) rather than collapsed into two, per this
    registry's precision-over-editorializing convention — the source is the
    authority on its own redundancy, not this schema.
  - **`replacementOther`** carries its own free-text blank on the source,
    modelled as `replacementOtherDescription` with
    `requiredWhen: { field: "replacementOther", equals: true }`.

## Excluded as out of scope

Consistent with this registry's established treatment of biometric/wet-ink
capture on print-and-fill government forms
(`np/donidcr/national-identity-card-application`,
`do/mirex/passport-application`,
`il/mot/medical-examination-driving-license-renewal`):

- **ลายมือชื่อ (Sign) — ผู้ขอมีบัตร (Applicant's Signature)** — a physical
  handwritten signature mark, excluded outright.
- **ตัวบรรจง (Printed) — the block-letter name confirmation accompanying the
  signature** — excluded as it duplicates the already-modelled
  `applicantNameThai` and exists solely to make a handwritten signature
  legible, not as a distinct data value. Unlike some of this registry's other
  Nepal/Thailand specimens, this form carries no separate declaration-date
  blank near the signature to retain as its own field.
- The form's header (embassy name), title, and certification prose ("ข้าพเจ้า
  ขอรับรองว่าข้อความดังกล่าวข้างต้นเป็นความจริงทุกประการ") are boilerplate,
  not data fields.

## `authority.url` — disclosed sandbox-networking limitation

`authority.url` points to the Ministry of Foreign Affairs' main domain
(`https://www.mfa.go.th`, independently confirmed reachable this cycle, HTTP
200) rather than the Washington, D.C. embassy's own site (`thaiembdc.org`):
every attempt to reach the embassy's own domain from this sandbox's network
egress returned an identical TLS handshake failure (`curl` and
`openssl s_client` both fail against its Cloudflare-fronted IP with
`SSL routines: ... handshake failure`), while MFA's own `image.mfa.go.th` CDN
(the source PDF's own host) and `www.mfa.go.th` both resolved normally. This
is disclosed as a sandbox-networking limitation, not a claim that the
embassy's own site is unreachable in general — the source PDF itself was
independently fetched and hashed directly from MFA's CDN, unaffected by this.

## Conformance

An ephemeral, from-scratch conformance checker (deriving required/enum/
`requiredWhen`/`visibleWhen` rules directly from this schema's own `fields[]`,
discarded after use, not committed) ran the following fixtures in
`conformance/th/mfa/thai-national-id-card-application/1.0.0/`:

- `valid-new-card-lost-stolen.json` (all required fields, `applicationPurpose`
  `new-card`, `newCardReason` `lost-stolen`, `oldCardBackNumber` populated) —
  **0 errors**.
- `valid-replacement-multiple-reasons.json` (all required fields,
  `applicationPurpose` `replacement`, three of the eight replacement-reason
  booleans `true` simultaneously including `replacementOther` with
  `replacementOtherDescription` populated) — **0 errors**.
- `mutation-control-missing-required-field.json` (drops `nationalIdNumber`) —
  **exactly 1 error**.
- `mutation-control-invalid-national-id-pattern.json` (`nationalIdNumber` set
  to an 11-digit string) — **exactly 1 error**.
- `mutation-control-invalid-enum-purpose.json` (`applicationPurpose` set to
  `renewal`, not in the enum) — **exactly 1 error**.
- `mutation-control-invalid-email-pattern.json` (`email` set to a
  malformed address) — **exactly 1 error**.
- `mutation-control-requiredwhen-new-card-reason-missing.json`
  (`applicationPurpose` `new-card` with `newCardReason` omitted) —
  **exactly 1 error**.
- `mutation-control-requiredwhen-other-description-missing.json`
  (`replacementOther` `true` with `replacementOtherDescription` omitted) —
  **exactly 1 error**.

## Structural validation

- `node tools/validate.mjs` — full registry, **491/491** document(s) passed
  (3/3 `mapping.json` companions also passed) after adding this document.
- `node tools/validate-ajv.mjs` (ajv 2020-12 against `spec/v0.3`) — full
  registry, **491/491** document(s) validated.
- `npm run build-index` re-run in `tools/govschema-client/` to regenerate
  `registry-index.json` with this document included.

## Maturity

`structural-reference`: every field traces to a specific labelled blank or
checkbox row confirmed on this form's own extracted text layer and its
independently re-derived source hash. No live filing at the Embassy was
attempted. GovSchema is an independent, non-profit standards body and is not
affiliated with, endorsed by, or operated by the Government of Thailand, the
Ministry of Foreign Affairs, or the Royal Thai Embassy.
