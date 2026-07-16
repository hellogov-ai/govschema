# Verification record — am/mfa/evisa-application@1.0.0

## Candidate selection

GOV-3343 ("GovSchema Standard Research") scouted and pre-verified Armenia's
Ministry of Foreign Affairs e-Visa portal (`evisa.mfa.am`) this cycle as a
new-jurisdiction candidate, architecturally similar to `ge/mfa/evisa-
application` (a live, unauthenticated AngularJS single-page application
whose real field names and validation attributes are embedded as literal,
uncompiled text in the app's own bundled JavaScript). This cycle (also
GOV-3343) authored it. Armenia had no prior schema of any kind in this
registry; this opens it as the registry's 66th jurisdiction with one
vertical (Visa).

## Reaching the live source

Fetched `https://evisa.mfa.am` (the root SPA shell) and
`https://evisa.mfa.am/scripts/evisa.min.js` (the app's bundled JavaScript)
twice each this session with a plain `curl`, using a standard desktop
Chrome User-Agent string:

- Root page: HTTP 200, `Content-Type: text/html`, `Content-Length: 3806`,
  both times. sha256
  `16f992a6540f88b1d7a12f5e0558f6bb562401fd2912870940c60d4707136547`,
  identical across both fetches.
- JS bundle: HTTP 200, `Content-Type: application/javascript`,
  `Content-Length: 255040`, both times. sha256
  `72090dbb63366d6ac686e4280d3c9459a862a4901cb4ac1ceff28edc22566d8a`,
  identical across both fetches.

Unlike some ASP.NET sources in this registry (see `ge/mfa/evisa-
application`'s own VERIFICATION.md, whose page embeds a fresh per-request
anti-forgery token), this source carries no such token — the raw
whole-file hash is directly and repeatedly reproducible for both files. A
plain `curl -I` (HEAD) request against either URL is rejected with `HTTP/1.0
400 Bad request: request method denied`, but a normal `GET` succeeds
immediately (confirmed via full response headers: `Server: nginx`,
`Last-Modified`, `ETag`, and a `Content-Security-Policy` consistent with a
genuine, actively-maintained government deployment, not a CDN/WAF stub).

No login, account creation, or payment gate blocks reaching or reading
either file.

## Structure of the source: a real Angular `$templateCache`, not compiled output

`scripts/evisa.min.js` is a minified but **not obfuscated** AngularJS
application bundle. Its `$templateCache.put("views/<name>.html", '<...>')`
calls embed the literal, uncompiled HTML each named view renders —
`name`, `ng-model`, `required`, `ng-required`, `ng-pattern`,
`minlength`/`maxlength` attributes are grep-able as plain text, not
something reconstructed from compiled/rendered output. This is a stronger
form of evidence than reading a live-rendered DOM: it is the exact source
the Angular router will mount for a given route, independent of whether
this session could actually navigate to that route.

Route table (`$routeProvider.when(...)`, read directly from the bundle):

```
/                                              -> views/landing-page.html
/check-eligibility                             -> views/check-eligibility.html
/request-details/:token                        -> views/request-details.html
/purpose-and-duration                          -> views/purpose-and-duration.html
/data-confirmation                             -> views/data-confirmation.html
/payment                                       -> views/payment.html
/request-summary                               -> views/request-summary.html
/check-status/:applicationId?/:isExpiredRedirect? -> views/check-status.html
/oops                                          -> views/oops.html (fallback)
```

The wizard's own step-ordering enum, also read directly from the bundle:

```js
WizardSteps.WIZARD_STEPS_ORDERED = function () {
  return [this.SUMMARY, this.PAYMENT, this.DATA_CONFIRMATION,
          this.PURPOSE_DURATION, this.REQUEST_DETAILS,
          this.VALID_TOKEN, this.CHECK_ELIGIBILITY];
};
```
(listed in reverse; forward order is CHECK_ELIGIBILITY → VALID_TOKEN →
REQUEST_DETAILS → PURPOSE_DURATION → DATA_CONFIRMATION → PAYMENT →
SUMMARY).

## The CAPTCHA gate: where it actually sits, and why it is not this schema's own boundary

The task brief for this cycle asked to re-verify carefully whether the
main application form is itself blocked by the CAPTCHA. It is not directly
— but reaching it is gated by a **CAPTCHA-plus-real-email-token** sequence,
which is a more precise finding than "not CAPTCHA-gated":

1. `/check-eligibility` (`views/check-eligibility.html`, `eligibility.*`
   model: `country`, `documentType`, `purpose`, `email`,
   `accreditationNumber` — the last only `ng-required` when a COP17-event
   pathway flag is set — and `reCaptcha`) is a **screening** form, not the
   application itself. Its own submit handler POSTs to
   `/e-api/check-eligibility/is-eligible`.
2. This session confirmed that endpoint enforces its CAPTCHA server-side,
   not merely client-side, via a deliberately-invalid direct POST (after
   first obtaining a same-origin session/XSRF cookie pair and the
   Spring-Security-expected `X-CSRF-TOKEN` header — a plain POST without a
   `Referer`/`Origin` header is rejected outright with `403 Expected CSRF
   token not found`, and one with a wrong field name is rejected with a
   `400` naming the DTO's real field names): submitting
   `{"countryId":1,"documentTypeId":167,"email":"test@example.com",
   "purpose":"TOURISM_RELATIVES","reCaptchaResponse":"ABCDEFG","lang":"en"}`
   returned `HTTP 200` with a structured rejection,
   `{"validationErrors":[12002],"status":"ERROR"}` — the server evaluated
   and rejected the (arbitrary, 7-character but wrong) CAPTCHA answer
   rather than crashing or ignoring it, confirming genuine server-side
   enforcement. This CAPTCHA was not solved or bypassed (out of scope for
   reading the form's own structure).
3. On a **successful** eligibility check, the server does not advance the
   in-browser wizard to the next step. Instead (confirmed directly from
   `views/eligibility-result.html`'s own markup): "A confirmation email
   was sent to `{{eligibility.email}}` ... Please check your inbox to
   continue application submission process." The emailed link is what
   carries the `:token` the `/request-details/:token` route requires.
4. This session has no way to receive that email for a real inbox it
   controls without either solving the CAPTCHA (out of scope) or
   registering a plausible email this session does not actually own — so
   the `/request-details/:token`, `/purpose-and-duration`, and
   `/data-confirmation` routes could not be interactively walked with
   Playwright this session, unlike this registry's `ge/mfa/evisa-
   application` schema (whose ASP.NET source rendered every step's markup
   in one response and could be interactively probed with a real browser
   session).

Despite that, none of `views/request-details.html`,
`views/purpose-and-duration.html`, or `views/data-confirmation.html`
themselves reference a CAPTCHA directive anywhere in their own markup
(confirmed by grep: the only two `<captcha ...>` directive usages in the
entire bundle are inside `views/check-eligibility.html`'s
`checkEligibilityForm` and `views/check-status.html`'s `statusCheckForm`),
and their own `process()` controller functions gate purely on
`<form>.$valid` (Angular's own client-side validity from the declared
`required`/`ng-required`/`ng-pattern`/`minlength`/`maxlength` attributes
already described below) with no additional captcha/token check performed
in JavaScript before submission. This schema therefore models those three
steps' fields directly from their own bundled markup — sourced with the
same rigor as if this session had walked them live, since the exact HTML
Angular will mount for those routes is already fully present, verbatim,
in the fetched JS file — while explicitly excluding the separate
eligibility pre-check's own fields (a distinct screening form, not part
of the visa application itself) as a disclosed scope boundary.

## `views/request-details.html`: the passport & personal-details step

Read directly from the `$templateCache.put("views/request-details.html", ...)`
entry (44,881 characters of literal HTML). Field order, `required`/
`ng-required` presence, and validation attributes were extracted
programmatically (searching for each `name="..."` occurrence and reading
forward to that element's own closing tag) rather than by eyeballing a
long minified string, to avoid mis-attributing one field's attributes to
another:

| field | required source | validation |
|---|---|---|
| `passportNr` | `required` | `minlength=3 maxlength=100 ng-pattern=/^([0-9A-Z ]){3,100}$/` |
| `sex` | *(none)* | `<md-radio-group>`, no `required`/`ng-required` at all |
| `issuedOn` | `required` | date |
| `lifelong` | *(none, checkbox)* | boolean |
| `expiresOn` | `ng-required="!data.lifelong"` | date |
| `firstName` | `required` | `minlength=1 maxlength=40 ng-pattern=/^[A-Z]+((\'\|-\|\s)*[A-Z]*)*$/` |
| `lastName` | *(none — see below)* | same pattern/length as `firstName` |
| `middleName` | *(none)* | same pattern/length as `firstName` |
| `onlyYear` | *(none, checkbox)* | boolean |
| `birthDate` | `ng-required="!data.onlyYear"` | date |
| `birthYear` | `ng-required="data.onlyYear"` | integer, dynamic option list |
| `birthCountry` | `required` | numeric country ID (see below) |
| `birthPlace` | `required` | `minlength=2 maxlength=40 ng-pattern=latinSymbolsRegExp` |
| `offenceOrCrime` | *(none)* | `<md-radio-group>`, values `"1"`/`"0"` |
| `occupation` | `required` | `minlength=2 maxlength=40 ng-pattern=latinSymbolsRegExp` |
| `currentResidenceAddress` | `required` | `minlength=2 maxlength=40 ng-pattern=latinSymbolsRegExp` |
| `currentPhone` | `required` | `minlength=2 maxlength=40 ng-pattern=/^[\+\d+-\s\(\)]+$/` |
| `localResidenceAddress` | `required` | `minlength=2 maxlength=40 ng-pattern=latinSymbolsRegExp` |
| `localPhone` | `required` | `minlength=2 maxlength=40 ng-pattern=/^[\+\d+-\s\(\)]+$/` |
| `additionalInfo` | *(none, textarea)* | `md-maxlength=250 ng-pattern=latinSymbolsRegExp` |
| `facialPhoto`/`attachments`/`selectedSupportedDocType`/`supportedDocuments` | — | file uploads, excluded (see Scope boundaries) |

`lastName`'s optionality is corroborated beyond just the absent
`required` attribute: `RequestDetailsController.prototype.process`'s own
code reads
```js
if (null == data.lastName || 0 == data.lastName.length) {
  var confirmDlg = this.mdDialog.confirm()
    .title(self.t.instant("request-details.warning.withoutLastnameTitle"))
    .htmlContent(self.t.instant("request-details.warning.withoutLastnameContent"))
    ...
}
```
— a "you're proceeding without a last name, are you sure?" confirmation
dialog, not a submission block. This is read directly from the bundle,
not inferred.

`sex`, `offenceOrCrime`, and `duration` (see the purpose-and-duration
step below) share the same pattern: their `<md-radio-group>` elements
carry **no** `required` or `ng-required` attribute whatsoever (unlike, for
example, `ge/mfa/evisa-application`'s `hasTravelInsurance`/
`supportingDocumentCountry`, which carry a stale-but-present
`data-val-required` attribute the site's own JS separately ignores). Each
controller's own `process()`/submit function was also checked for any
manual `$setValidity`/scope-level enforcement beyond the template's own
declared attributes — none was found — so all three are modelled as
genuinely optional.

`sex`'s enum is not a guess: `evisa.enums.SEX` is a static object defined
in the bundle,
```js
SEX.MALE = function () { return "MALE" };
SEX.FEMALE = function () { return "FEMALE" };
```
and the template's `genders` array is built from
`male = {name:"male", value: evisa.enums.SEX.MALE()}` /
`female = {name:"female", value: evisa.enums.SEX.FEMALE()}` — confirmed
directly, not inferred from option text.

`offenceOrCrime`'s two `<md-radio-button>` elements carry literal
`value="1"`/`value="0"` attributes bound to the `common.yes`/`common.no`
translation keys — modelled as a two-value string enum rather than
converted to a JSON boolean, since that is what the live markup itself
would submit.

`birthYear`'s option list is genuinely dynamic but fully deterministic and
observed directly, not opaque server data:
```js
for (var i = now.getFullYear(); i > now.getFullYear() - 120; i--)
  this.scope.pastYears.push(i);
```
— a rolling 120-year window ending at the current year. No hard
minimum/maximum is asserted in this schema's own `validation` block
(unlike a fixed enum) so the schema does not go stale as the window rolls
forward in future years; the behavior itself is disclosed here instead.

`birthCountry` binds its `<md-select>` to each option's numeric
`country.id`, not a name:
```html
<md-select ng-model="data.birthCountry" name="birthCountry" required>
  <md-option ng-repeat="country in countries" value="{{country.id}}">
</md-select>
```
The live, unauthenticated `GET https://evisa.mfa.am/e-api/get/birth-countries`
endpoint (confirmed this session — a plain GET without a same-origin
`Referer`/`Origin` header is redirected to the SPA root by the reverse
proxy, but succeeds directly once one is set, e.g.
`-H "Referer: https://evisa.mfa.am/" -H "Origin: https://evisa.mfa.am"`)
returns the live 257-entry list this `<md-select>` actually populates
itself with at runtime, e.g.:
```json
{"id":1,"iata":"AF","icao":"AFG","name":"AFGHANISTAN","nameRus":"АФГАНИСТАН","nameArm":"ԱՖՂԱՆՍՏԱՆ","visaRequired":false,...,"birthCountry":true,"sortId":1,"eu":false}
```
through `{"id":199,...,"name":"ZIMBABWE",...}` (257 entries total, not
reproduced in full here). Matching this registry's own precedent for
large country lists (`ge/mfa/evisa-application`'s `citizenship` field),
`birthCountry` is modelled as a free-text `string` carrying the numeric
`id` rather than as a 257-member `enum`.

## `views/purpose-and-duration.html`: purpose, duration, arrival date

Read directly from its own `$templateCache` entry (7,449 characters).
Confirmed fields: `purpose` (required `<md-select>`), `duration`
(`<md-radio-group>`, no `required`/`ng-required`), `arrivalDate` (required
`<md-datepicker>`).

`purpose`'s 9-value enum comes from the bundle's own static
`VisaTypePurposes` object:
```js
VisaTypePurposes.GET_PURPOSES = function () {
  return [this.TOURISM_RELATIVES(), this.BUSINESS_NEGOTIATIONS(),
          this.SPORT_CULTURAL(), this.TECHNIC_OTHER(),
          this.MEDICAL_TREATMENT(), this.FAMILY_REUNION(),
          this.STUDY_EDUCATION(), this.AIRCRAFT_CREW(),
          this.EVENTS_COP17()];
};
```
`PurposeAndDurationController.prototype.init` assigns
`scope.purposes = evisa.enums.VisaTypePurposes.GET_PURPOSES()` directly,
with **no** filter — unlike `CheckEligibilityController`'s own assignment
of the same array, which conditionally excludes `EVENTS_COP17()` unless a
`isCop17Flow` is set. This is a genuine, observed difference between the
two forms' option lists, not an inconsistency in this schema.

Independently corroborated live via `GET https://evisa.mfa.am/e-api/get/visaTypes`
(same `Referer`/`Origin` requirement as above), whose ~30-entry visa-type
catalog carries `purpose` and `duration` fields using exactly these
literal values, e.g.:
```json
{"id":16913,"name":"VISITOR VISA FOR VISITING RELATIVES (FRIENDS) OR TOURIST (FOR A REST) V-1/SH",
 "days":21,"maxDays":90,"code":"Ա/V-1/Կ","feeAmd":3000.0,"feeUsd":8.0,"feeEur":7.0,
 "purpose":"TOURISM_RELATIVES","duration":"SHORT","consularServiceId":"12"}
```
`duration`'s two values likewise come directly from the controller's own
object construction:
```js
self.shortDuration = {name:"purposeDurationForm.shortTerm", value:"SHORT"};
self.longDuration  = {name:"purposeDurationForm.longTerm",  value:"LONG"};
```
Similarly, `GET https://evisa.mfa.am/e-api/get/documentTypes` (the
screening `documentType` field's own option source on the eligibility
form, out of this schema's scope) returned a live 5-entry list — confirmed
reachable, but not modelled since `documentType` belongs to the
CAPTCHA-gated eligibility pre-check, not this schema's own `data.*` model.

## `views/data-confirmation.html`: the terms-and-conditions attestation

This template's own `$templateCache` entry (104,147 characters) is
substantially larger than the sum of the other views because it appears
to embed a full duplicate copy of the request-details/purpose-and-duration
markup for its own read-only review display, **plus** a second, distinct
copy that uses different field names for the same two address/phone
concepts (`permanentResidenceAddress`/`permanentPhone` instead of
`localResidenceAddress`/`localPhone`) — matching a separate, standalone,
un-routed template also present in the bundle,
`$templateCache.put("views/request-details_bak.html", ...)` (28,435
characters). Neither `request-details_bak.html` nor this embedded
second copy is reachable through any entry in the app's own
`$routeProvider` route table (reproduced above) — `request-details.html`
is the only view any route actually mounts for passport/personal-details
data — so both are disclosed here as observed, apparently-stale leftover
markup from an earlier version of the form, not modelled. (A third,
seemingly unrelated fragment, `views/apply-for-visa.html`, embeds a
generic `registerForm`/`user.email`/`user.portfolioUrl` block that
matches no field in this application's own data model at all and is
similarly unrouted — also disclosed as dead code, not modelled.)

The one genuinely new, still-live field in `views/data-confirmation.html`
is the terms checkbox itself:
```html
<md-checkbox name="terms" ng-model="data.termsAndConditions"
             class="no-left-margin custom-checkbox" aria-label="false" required>
</md-checkbox>
```
linked from the same page to a PDF, `/assets/resource/TermsAndConditions.pdf`.

## Date format

All date fields use the site's own `DD/MM/YYYY` format, confirmed from the
bundle's own configuration constants:
```js
dateFormat: "dd/MM/yyyy"
momentDateFormat: "DD/MM/YYYY"
```

## Scope boundaries (disclosed, not silently dropped)

1. **The eligibility pre-check's own fields** (`country`, `documentType`,
   `purpose`, `email`, `accreditationNumber`, `reCaptcha` on
   `checkEligibilityForm`) — a distinct screening form, confirmed
   server-side CAPTCHA-enforced (see above), not part of the visa
   application data model this schema documents.
2. **File uploads** (`facialPhoto`, `attachments`, `supportedDocuments`
   on the request-details step). None of the three carry a `required`
   attribute in the static markup; their real required/optional status
   (and any per-nationality/per-document-type variation) is a runtime
   concern this session had no way to exercise without a real emailed
   token (see the CAPTCHA-gate discussion above).
3. **`views/request-details_bak.html`** and the embedded duplicate inside
   `views/data-confirmation.html` (stale `permanentResidenceAddress`/
   `permanentPhone` naming) and **`views/apply-for-visa.html`**'s
   unrelated `registerForm` fragment — all three are un-routed, observed
   dead code, not modelled.
4. No application was submitted and no fee was paid producing this
   schema.

## Conformance

2 valid fixtures (0 errors each — a short-duration tourist exercising the
non-lifelong/exact-birth-date cascade branches with an optional last/
middle name present, and a long-duration business traveller exercising
the opposite lifelong/birth-year-only branches with those optional names
omitted) plus 6 mutation-control fixtures (each raising exactly 1 error:
a plain missing-required-field case, two distinct `requiredWhen` cascade
violations, an invalid-enum case, and an invalid-pattern case) are
committed under `conformance/am/mfa/evisa-application/1.0.0/`. All 8 were
independently re-checked this session against a from-scratch mock
validator implementing this schema's `required`/`requiredWhen`/`enum`/
`pattern`/`minLength`/`maxLength` rules, each producing the exact expected
error count. Both `tools/validate.mjs` and `tools/validate-ajv.mjs` pass
with this document included.
