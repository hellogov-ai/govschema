# Verification record — mn/mfa/evisa-application@1.0.0

## Candidate selection

GOV-3375 ("GovSchema Standard Research") scouted Mongolia's Electronic Visa
Application System (`evisa.mn`, run by the Immigration Agency of Mongolia
under `immigration.gov.mn`, live since 2021) as a new-jurisdiction candidate.
Mongolia had no prior schema of any kind in this registry; this opens it as
a new jurisdiction with one vertical (Visa). Two other candidates were
screened first this cycle and set aside as weaker: Uzbekistan's five
remaining non-Visa verticals (DMV/Passport/Business Formation/Taxes/National
ID), all funnelled through the `my.gov.uz` single-window portal, whose
service pages turned out to be Nuxt-rendered marketing/description pages
requiring an ESI/e-imzo digital-signature login to see the actual
application form, not a live unauthenticated wizard; and Ethiopia's Fayda
national ID (`id.gov.et`) and e-Trade business registration
(`etrade.gov.et`), the former confirmed too thin (5 demographic fields plus
device-captured biometrics, no online form) and the latter unreachable this
session.

## Reaching the live source

Fetched `https://www.evisa.mn/en/apply` directly with a plain `curl` and a
standard desktop Chrome User-Agent string (HTTP 200) and then drove it live
with Playwright + system Chromium
(`/app/node_modules/.pnpm/playwright@1.58.2`, executablePath
`/paperclip/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome`, with
`LD_LIBRARY_PATH=/paperclip/chrome-sysroot/usr/lib/x86_64-linux-gnu:/paperclip/chrome-sysroot/usr/lib`).
No login, CAPTCHA, or WAF gate blocks reaching or loading the wizard's
Part 1.

## The gate between Part 1 and Parts 2-4: a genuine email-confirmation link, not a CAPTCHA

Part 1 ("Document type & Nationality") collects `nationality`,
`passportType`, `applicationPurpose`, and `email`, then submits. Submitting
does **not** advance the in-browser wizard to Part 2 directly — it shows a
"PLEASE, CHECK YOUR EMAIL" screen and redirects to
`https://www.evisa.mn/en/cmail/<code>`. This is architecturally the same
shape as this registry's own `am/mfa/evisa-application` (a
CAPTCHA-plus-emailed-token gate) but is, precisely, a **plain double-opt-in
email-confirmation gate with no CAPTCHA at all** — confirmed by the fact
that no CAPTCHA/reCAPTCHA widget or challenge of any kind appears anywhere
in Part 1's markup or network traffic.

This session used a real, disposable public inbox
(`mailinator.com`, no signup required, a public/no-authentication temporary
mailbox — not a real applicant's identity, and no real government-issued
credential of any kind was used or impersonated) to legitimately receive
and follow that confirmation link, the same category of action as
confirming a newsletter subscription:

- Submitted Part 1 with nationality Egypt, passport type Ordinary,
  applying-for Tourism, and email
  `govschema-research-2026@mailinator.com`.
- Retrieved the resulting email directly via Mailinator's own public JSON
  API (`GET https://www.mailinator.com/api/v2/domains/public/messages/<id>`).
  Sender: `E-VISA <e-visa@immigration.gov.mn>`. The message carries a valid
  DKIM signature (`d=immigration.gov.mn`) and its `Received` chain traces
  through `security.mail.gov.mn` (`203.26.189.111`) and
  `mtaout1.gov.mn` — confirming the email genuinely originated from
  Mongolia's own government mail infrastructure, not a spoof.
- The email's own body contains exactly one link:
  `https://www.evisa.mn/en/apply/<token>`. Following it in the same
  Playwright session reached the full Parts 2-4 markup — 103 form elements
  in a single page load (confirmed via `document.querySelectorAll('input,
  select, textarea')`), all rendered via the `jquery.steps` plugin (CSS
  visibility toggling between parts, not separate page requests per part).
- No application was submitted for payment and no fee was paid.

## Structure of the source: a real multi-step server-rendered wizard

`assets/page/js/theme/apply.v1743406415.js` (the wizard's own client-side
logic, fetched directly and inspected) is not obfuscated. Its `case`
statements for `iscrime`/`isdenied`/`isdefirentName`/`additionalInformation18`/
`gender`/`e_gender` and its OCR-response `switch` statement (`LastName`,
`FirstName`/`Name`, `PassportNumber`, `Nationality`, `DateOfBirth` →
corresponding named inputs) were read directly, not inferred, and inform
several fields' `description`/`sourceRef` text below (in particular the
`passportPhotoPage` document's declared `ocr.populatesFields` list and the
disclosed Guardian-sub-flow age-threshold logic).

Every field's `name`, required-asterisk marking (`<span
class="danger">*</span>` immediately after the field's own `<label>`), and
dropdown option list documented in `schema.json` was read directly from the
live-rendered HTML captured after following the confirmation link — via
`document.querySelectorAll`/regex extraction on the saved page source, not
eyeballed or guessed. Two live cascading dependent-dropdown AJAX endpoints
were also confirmed directly via network trace:

- `POST /en/callPasstypeData` — populates `passportType`'s option list from
  the selected `nationality`.
- `POST /en/checkPassportType` — populates `applicationPurpose`'s option
  list from the selected `nationality`/`passportType`.
- The `mongoliaProvince` → `mongoliaDistrict` → `mongoliaSubdistrict`
  cascade (Province → District/Soum → Subdistrict/Bag) was independently
  exercised live: selecting Ulaanbaatar (`11`) populated 9 real districts
  (Baganuur, Bagakhangai, Bayangol, Bayanzurkh, Nalaikh,
  Songinokhairkhan, Sukhbaatar, Khan-Uul, Chingeltei); selecting Bayangol
  populated 5 real khoroo entries ("1-r khoroo" through "5-r khoroo").

## Field-by-field notes

- `nationality`/`passportType`/`applicationPurpose`: all three carry the
  site's own opaque numeric/timestamp-style option values (e.g. `1002` for
  Azerbaijan, not a human-readable slug), consistent with this being a
  database-driven admin-managed lookup rather than a hardcoded enum in
  client code (contrast this registry's own Armenia/Georgia MFA schemas,
  whose AngularJS/ASP.NET sources embed clean semantic enum values directly
  in their own JavaScript). Modelled as free-text `string` rather than a
  fully-reproduced `enum`, matching this registry's own established
  precedent for large or dynamically-populated option lists (see
  `am/mfa/evisa-application`'s `birthCountry`). `passportType` and
  `applicationPurpose` were each observed with only 1-2 real options for
  the one nationality (Egypt) tested this session; other nationalities may
  unlock additional values not confirmed here — disclosed in each field's
  own `description`, not silently assumed exhaustive.
- `gender`/`hasCriminalRecord`/`wasVisaDenied`/`appliedWithDifferentName`/
  `needsVisaExtension`/`maritalStatus`/`addressConfirmationDocumentType`:
  all seven are small, source-confirmed bounded lists (2-4 real options
  each), modelled as `enum` with the exact live wire `value` attributes
  (e.g. gender `1`/`2`/`5` — not sequential, but confirmed directly from
  the raw `<input value="...">` markup, not assumed).
- `countryOfBirth`: the live `#countryOfBirth` dropdown carries a full,
  genuine 255-entry option list (Afghanistan through Zimbabwe, alphabetic),
  confirmed directly, not a placeholder. Modelled as `string` per this
  registry's own large-country-list precedent.
- `passportNationality`/`passportIssuingCountry`/`placeOfBirth`: these three
  `<select>` elements are pre-populated with the applicant's Part-1
  nationality by the site's own JavaScript but remain independently
  editable (searchable `select2` widgets) — not fixed/locked fields.
- Two `crossFieldValidation` rules were added based on the fields'
  own semantics, not the source's own explicit runtime enforcement (which
  this session did not fully verify server-side): `passportExpiryDate`
  after `passportIssuedDate`, and `expectedDepartureDate` after
  `expectedArrivalDate`. Both date fields use the site's own `yyyy/mm/dd`
  format (confirmed via each `pickadate({format:"yyyy/mm/dd"})`
  initialization call), which sorts correctly under a plain string
  `greaterThan` comparison.

## Disclosed scope boundaries (not silently dropped)

1. **Guardian-information sub-flow** (`b_firstName`, `b_lastName`,
   `b_addressDescription`, `e_applicantcountryid`, `e_dateOfBirth`,
   `e_gender`, `e_optionalData`, `e_expiryDate`,
   `e_presentTelephoneNumber` — all carrying live asterisks when shown).
   Confirmed directly from `apply.v1743406415.js`: when the passport-photo
   OCR reads a `DateOfBirth` indicating the applicant is under 18 at
   submission time, the client shows a warning dialog (`vis_guardians_18`)
   and this sub-flow. This is a genuinely **computed** condition (current
   date minus a parsed date-of-birth, evaluated by the site's own
   JavaScript), not a static field-to-field comparison — outside what this
   registry's Condition grammar (`equals`/`notEquals`/`in`/`greaterThan`
   family, referencing only other field values) can express. This session
   also had no fabricated minor's passport image with which to trigger the
   OCR path live. Left unmodelled and disclosed here rather than
   force-fit or guessed.
2. **Three read-only summary spans** ("Purpose of visit", "Duration of
   stay", "Number of entries requested") on the Purpose & Duration step,
   confirmed to be server-computed displays bound to the Part 1 visa-type
   selection (`data-path` attributes, not `name`-bearing form inputs) —
   not applicant-editable fields.
3. **Payment-step fields** (`paymentPurpose`, `paymentRecipient`,
   `paymentAccount`, `paymentConsulate`, `paymentPayerType`,
   `paymentFullName`, `paymentEmail`, `paymentAmount`, `paymentFee`) and
   the payment-method checkboxes (JCB/Amex/UnionPay/Mastercard/Visa) —
   excluded as payment mechanics rather than government-form data,
   consistent with this registry's own established convention (see e.g.
   `uz/mfa/evisa-application`'s Click.uz scope boundary).
4. No application was submitted for payment and no fee was paid producing
   this schema.

## Conformance

2 valid fixtures (0 errors each — a tourism applicant with every optional
field present, and a sport/cultural-event applicant with the three
genuinely optional fields, `identificationNumber`/`currentOccupation`/
`maritalStatus`, omitted entirely) plus 7 mutation-control fixtures (each
raising exactly 1 error: a plain missing-required-field case, an
invalid-enum case, two invalid-pattern cases, both `crossFieldValidation`
rules' violations, and a required-boolean-attestation-not-true case) are
committed under `conformance/mn/mfa/evisa-application/1.0.0/`. All 9 were
independently re-checked this session against a from-scratch mock
validator implementing this schema's `required`/`enum`/`pattern`/
`crossFieldValidation` rules, each producing the exact expected error
count. Both `tools/validate.mjs` and `tools/validate-ajv.mjs` pass with
this document included.
