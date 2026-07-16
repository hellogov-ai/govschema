# Verification record — uz/mfa/evisa-application@1.0.0

## Candidate selection

GOV-3313 ("GovSchema Standard Research", 2026-07-16) scouted Uzbekistan's
`e-visa.gov.uz` alongside four other candidates while looking for a new
jurisdiction, and recorded it as "a real, live Angular SPA blocked by a
client-side rendering bug that leaves a permanent loading overlay before
any step-2+ field could be confirmed" — authoring Ethiopia instead that
cycle and leaving Uzbekistan un-authored, without even a disclosed-backlog
entry in CATALOG.md's "Known Gaps & Opportunities" section (unlike
Georgia, which that same cycle did record and a later cycle, GOV-3321,
picked up). This cycle (GOV-3368) independently rediscovered the same
candidate while scouting for new jurisdictions, re-confirmed the exact
rendering bug still reproduces, and worked around it by decompiling the
site's own production Angular bundle directly rather than relying on live
interactive navigation. Uzbekistan had no prior schema of any kind in this
registry; this opens it as a new jurisdiction with one vertical (Visa).

## Reaching the live source and reproducing the rendering bug

`https://e-visa.gov.uz/application` is live, unauthenticated, and returns
HTTP 200 (confirmed via plain `curl` with a standard desktop Chrome
User-Agent string, and via a real Playwright/Chromium session —
`executablePath` pointed at the locally cached Chromium build at
`/paperclip/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome`,
`LD_LIBRARY_PATH` set to the sysroot's shared libraries).

Filling the Country step's four `<select>` elements with a genuinely
e-visa-required citizenship (India, dictionary `status 1`) — Citizenship,
Document Type, Visa Entry Type, Purpose of Visit — correctly enables the
"Next" button. Clicking it (both a normal Playwright click and a direct
`element.click()` via `page.evaluate`, bypassing the overlay's
hit-testing entirely) does not navigate: the URL stays at `/application`
and no new network request fires. A `.loader-wrapper` overlay becomes
permanently visible at this point and stays visible indefinitely (10
seconds of polling, well beyond any plausible API round trip). Separately
confirmed this is a pure client-side state bug, not a slow/failed
dependency: while the overlay was showing, zero HTTP requests were
pending (`request`/`requestfinished` event bookkeeping across the whole
session showed an empty pending set). This is the exact "client-side
rendering bug" the GOV-3313 cycle's note described, independently
reproduced rather than merely re-read.

Separately confirmed the *visa-free* branch is a distinct, intentional
gate, not the same bug: selecting a `status 2` (visa-free) citizenship
(United States) surfaces a live "Visa-free entry for up to 30 days"
banner and *permanently* disables the Next button — the source's own
correct behavior (a visa-free traveller has no e-visa to apply for), not
a defect. Switching to India (`status 1`) immediately re-enables the
button before the separate rendering bug then blocks actual navigation.

## Decompiling the production bundle: why this source is stronger than template-string extraction

`https://e-visa.gov.uz/main.<hash>.bundle.js` (953,309 bytes, fetched
directly via `curl`) is compiled with Angular's older **ViewEngine**
renderer (not the modern Ivy renderer most contemporary Angular apps
ship). ViewEngine's compiled output embeds each component's template as a
literal sequence of factory-function calls — critically, `l["ɵeld"](...)`
calls carry the element's tag name and its full static attribute array
verbatim (e.g. `["class","form-control text-uppercase"],["id","applicantBirthPlace"],["required",""],["type","text"]`),
and each view's separate "update" function contains literal property-
assignment expressions showing exactly which component-instance property
an `NgModel` binding writes into on change — for example:

```
"ngModelChange"===t&&(r=!1!==(o.form.application.arrivalInfo.countryId=e)&&r)
```

This is a *stronger* source than this registry's precedent template-
string extractions (`am/mfa/evisa-application`'s AngularJS
`$templateCache`, `br/tse/requerimento-alistamento-eleitoral`'s Angular
bundle): the exact JSON property path each field writes to (e.g.
`form.application.arrivalInfo.countryId`, not just an element `id` or
`name` attribute) is read directly from compiled code, not inferred from
markup naming conventions alone. A Python regex
(`\\u0275eld"\]\(\d+,0,null,null,(\d+),"([a-zA-Z0-9-]+)",\[(\[.*?\])\]`)
extracted all 809 element definitions in file order; a second pass
located each field's own `ngModelChange`/`dateSelect` handler function
body immediately following its element definition and extracted the
literal assignment target.

## Live dictionary corroboration

Fetched all four dictionary endpoints through the real Playwright session
navigated to the Country step (confirmed via the browser's own `request`/
`response` events, not a standalone `curl`, since the endpoints live on a
separate port, `e-visa.gov.uz:8443`, reachable only via the app's own
CORS-configured requests):

- **`GET /api/v1/dic/countries/en`** — 248 entries, each
  `{id, name, status}`. `status` values observed: `1` (44 countries,
  e.g. ALGERIA, INDIA, EGYPT, CAMBODIA, ECUADOR — genuinely require this
  e-visa), `2` (82 countries, e.g. UNITED STATES OF AMERICA, UNITED
  KINGDOM, CHINA, most of the EU — visa-free, confirmed live to disable
  the wizard), `4` (9 countries, e.g. FRANCE, GEORGIA, ARMENIA, BELARUS,
  AZERBAIJAN — use a different consular channel), `3` (1 country,
  unclassified in this session). This schema's `citizenship` field
  targets the `status 1` pathway; the field itself is not restricted to
  only those 44 values, since the dictionary and its `status` semantics
  are a live, server-side classification not hard-coded into the form.
- **`GET /api/v1/dic/documents/en`** — exactly one entry,
  `{"id":1,"name":"ORDINARY PASSPORT"}`.
- **`GET /api/v1/dic/visa/types/en`** — three entries:
  `{"id":1,"name":"SINGLE ENTRY 20$"}`,
  `{"id":2,"name":"DOUBLE ENTRY 35$"}`,
  `{"id":3,"name":"MULTIPLY 50$"}` (the source's own spelling of
  "Multiple", not a transcription error introduced by this schema).
- **`GET /api/v1/dic/purposes/en`** — two entries,
  `{"id":1,"name":"TOURISM"}`, `{"id":2,"name":"BUSINESS"}`.

Independently corroborated by the site's own
`https://e-visa.gov.uz/assets/localization/en.json` (fetched directly,
191 translation keys), whose `TERM_CONTENT_4_1` key states: "e-visa Visa
application fee is USD 20.00 for single entry, USD 35.00 for double entry
and USD 50.00 for multiple entry" — matching the three `visaType` fee
tiers exactly.

## Date format and validation logic, read directly from compiled code

The compiled bundle's `selectDateFrom`/`selectDateTo` methods (bound to
the Date step's two `ngb-datepicker` controls via `(dateSelect)`) contain
the literal serialization logic:

```
this.form.application.arrivalInfo.arrivalDate=(this.dpDateFrom.day<10?"0"+this.dpDateFrom.day:this.dpDateFrom.day)+"."+(this.dpDateFrom.month<10?"0"+this.dpDateFrom.month:this.dpDateFrom.month)+"."+this.dpDateFrom.year
```

confirming the exact `DD.MM.YYYY` wire format for `arrivalDate` — and,
by the same pattern found immediately adjacent, `departureDate`,
`passportIssueDate` (`this.form.application.passportInfo.issuedDate`, via
`passportIssueDate(n)`), and `passportExpiryDate` (`...expiredDate`, via
`passportExpiredDate(n)`). `dateOfBirth` uses the same `DD.MM.YYYY`
format via a masked text input rather than a calendar widget, confirmed
by its own `birthDateMask` definition (`[/(\d|x)/,/(\d|x)/,".",/(\d|x)/,/(\d|x)/,".",/(\d)/,/(\d)/,/(\d)/,/(\d)/]`)
and its live `placeholder="XX.XX.XXXX"` attribute.

The same compiled code's `dateToTest.markDisabled` function (bound to the
departure-date picker) reads:

```
return l>o+29||l<o+1
```

(where `l`/`o` are day-offsets for the candidate departure date and the
already-selected arrival date respectively) — confirming departure must
be between 1 and 29 days after arrival (i.e. a stay of up to 30 days
total), matching the site's own `en.json` string
`APPLICATION_INFO_DATERANGE_WARNING`: "The period of stay must not exceed
30 days between the date of submission and completion of the validity
period." This registry's `crossFieldValidation` vocabulary has no
"difference at most N days" operator, so only the minimum bound
(`departureDate greaterThan arrivalDate`) is expressed as a
`crossFieldValidation` rule; the 30-day ceiling is disclosed in the
field's own `description` instead of silently dropped. The picker's own
`minDate`/`maxDate` configuration (`{year: currentYear, month:1, day:
currentDate}` through `{year: currentYear+1, month:12, day:31}`, i.e.
today through 90 days out in practice) corroborates the site's own
`en.json` note (`TERM_CONTENT_2_8`) that the e-visa is valid for entry
"within 90 days from the date of registration."

The passport-number field's `passportMask` definition
(`[/(\d|[a-zA-Z])/,/(\d|[a-zA-Z])/,/(\d|[a-zA-Z])/,/(\d|[a-zA-Z])/,/(\d|[a-zA-Z])/,/(\d|[a-zA-Z])/,/(\d|[a-zA-Z])/,/(\d|[a-zA-Z])/,/(\d|[a-zA-Z])/]`)
confirms a fixed 9-character alphanumeric passport number, and a separate
loop over `this.form.application.passportInfo` (`"string"==typeof
this.form.application.passportInfo[t] &&
(this.form.application.passportInfo[t]=
this.form.application.passportInfo[t].toUpperCase())`) confirms every
passport-info string field is uppercased before submission — consistent
with the live inputs' own `text-uppercase` CSS class.

## Conditional fields, confirmed structurally

`surnameChanged`/`previousSurname` and `nameChanged`/`previousName` each
follow the same structural pattern in the compiled template: an
`l["ɵand"]` conditional-view-container call (Angular's `*ngIf` compiled
form) immediately follows each checkbox's own element definition, and the
conditionally-rendered `<input>` inside it carries a `required`
attribute. `hasOtherCitizenship`/`otherCitizenship` follows the identical
pattern (`isOtherCitizenship` gates a conditionally-rendered
`applicantPreviousCitizenship` `<select>`).

## Photo and passport uploads

The compiled `ApplicationService` class (a plain TypeScript service,
fully preserved by name in the bundle) exposes
`photoUploadService.startUpload`/`passportStartUpload` methods whose
bodies read:

```
url:ml.SERVER_URL+"/api/v1/photo/upload/face",method:"POST",fieldName:"face",...
url:ml.SERVER_URL+"/api/v1/photo/upload/passport",method:"POST",fieldName:"passport",...
```

confirming the two upload endpoints and their field names. Size/format
constraints are drawn from `en.json`: `PHOTOS_INFO` ("The photo must have
a size of 35x45 mm with a resolution of 300 dpi. Image dimensions should
not exceed 1 Mb."), `ERROR_BIG_PHOTO` ("Required image should be jpg
format and file size should be less than 1024 KB"),
`ERROR_FACE_NOT_VALID_FORMAT`/`ERROR_PASSPORT_NOT_VALID_FORMAT` ("Image
format is wrong (jpg, jpeg)" / "Wrong format for passport image (jpg,
jpeg)"). `maxBytes: 1048576` models "less than 1024 KB."

## The Activation step, the CAPTCHA gate, and Payment (out of scope)

`en.json`'s `APPLICATION_LABEL_CHECK_STATUS` ("Enter the application
code, received by e-mail") and `SAVED_APPLICATION_DESC` ("An email with a
link to activate the receipt has been sent to your email address")
confirm the Activation step's function: the applicant supplies an email
address, receives a digital activation code by email, and enters it to
activate the saved application. The compiled `ApplicationService` class's
`getCaptcha`/`sendEmail`/`activateApplication` methods
(`GET /captcha/jcaptcha.jpg`, `POST /api/v1/application/mail`,
`GET /api/v1/application/activate/{code}`) confirm this flow is
CAPTCHA-gated (`this.form.captcha`) — this schema models only the `email`
field itself, not the CAPTCHA or the emailed activation code, consistent
with this registry's treatment of CAPTCHA gates elsewhere (see
`ge/mfa/evisa-application`'s VERIFICATION.md).

The Payment step's compiled template embeds a plain HTML `<form>` with
hidden inputs named `VENDOR_ID`, `MERCHANT_TRANS_ID`,
`MERCHANT_TRANS_AMOUNT`, `MERCHANT_CURRENCY`, `MERCHANT_TRANS_NOTE`,
`MERCHANT_TRANS_DATA`, `MERCHANT_TRANS_RETURN_URL`, `SIGN_TIME`,
`SIGN_STRING`, and a `type="submit"` button — the standard integration
pattern for Uzbekistan's Click.uz-style merchant payment gateway. This is
payment-processor plumbing, not government-form data, and is excluded
from this schema entirely (an empty `payment` step, matching this
registry's convention for out-of-scope trailing steps — see
`et/ics/e-visa-application`'s `review` step).

## Disclosed, not modelled: two unused translation keys

The site's own `en.json` contains `LABEL_CONTACT_PERSON` ("Contact person
in Uzbekistan"), `LABEL_INVITING_PARTY_IN_UZBEKISTAN` ("Inviting party in
Uzbekistan"), `APPLICATION_CONTACT_PERSON_TITLE` ("Contact person"), and
`APPLICATION_LAST_VISIT_TITLE`/`LABEL_VISITED` ("Previous visit date"/
"Previous visits to Uzbekistan"). None of these four keys were found
bound to any element (`translate` attribute or property binding) or any
`this.form.application.*` assignment anywhere in the 953KB bundle
actually shipped in this build — a direct string search located every
other translation key referenced in this document at least once. Treated
as unused/legacy translation keys from an earlier version of the form,
not modelled, rather than guessed at or force-fit into a field.

## Conformance

2 valid fixtures (0 errors each — one single-entry tourism applicant with
no name/citizenship changes, one double-entry business applicant
exercising every conditional field: `surnameChanged`, `nameChanged`, and
`hasOtherCitizenship` all true) plus 8 mutation-control fixtures (each
raising exactly 1 error: three `requiredWhen` cascade violations
—`previousSurname`, `previousName`, `otherCitizenship`— an enum
violation on `visaType`, a pattern violation on `passportNumber`, a
missing top-level required field (`email`), and both
`crossFieldValidation` rules — `departureAfterArrival` and
`passportExpiryAfterIssue`) are committed under
`conformance/uz/mfa/evisa-application/1.0.0/`. Checked with a
from-scratch mock validator written for this session (structural JSON
Schema tooling in this repo validates `schema.json` itself against the
spec, not fixture data against a schema instance — consistent with this
registry's established practice). `node tools/validate.mjs` and
`node tools/validate-ajv.mjs` both pass with this document included.
