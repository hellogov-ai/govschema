# Verification record — rw/irembo/nida-diaspora-application@1.0.0

## Candidate selection

GOV-3288 ("GovSchema Standard Research", 2026-07-16) scouted Rwanda's
National ID vertical (Rwanda was at 4/6: Passport, DMV, Business Formation,
Visa modelled; Taxes and National ID open) and left this candidate as a
disclosed, ready-to-author backlog item (GOV-3295), which this cycle
(GOV-3298) picked up and completed.

NIDA's ordinary domestic ID service requires a pre-issued NPR (National
Population Register) number — assigned in person inside Rwanda — which is a
dead end on its own for a diaspora applicant who has never been registered.
Rwanda's Taxes vertical was re-confirmed a dead end this same cycle: RRA's
`etax.rra.gov.rw`/`myrra.rra.gov.rw` are login-only for every individual
personal-income-tax filing category, with no downloadable PDF return form
found.

## Reaching the live wizard

The deep-link URL alone (`https://irembo.gov.rw/user/citizen/service/nida/nid_diaspora_without_npr_revamp`)
redirects to Irembo's generic all-services page when fetched cold — it
appears to depend on client-side navigation state, not a bare GET. The real
path (walked live with Playwright + Chromium, `waitUntil: 'domcontentloaded'`
plus explicit settle delays, since this is an Angular SPA with continuous
background requests that never reach `networkidle`):

1. `https://irembo.gov.rw/home/citizen/all_services` — the public service
   catalog, unauthenticated.
2. Click the "Gusaba Indangamuntu" service card (an Angular `(click)`
   handler with no plain `href`, requires a real click event, not a link
   `goto`).
3. A `mat-dialog` service-selection modal opens, containing an `ng-select`
   sub-service picker (an `ngx-select` component, not a native `<select>`)
   with three options once its own async content finishes loading:
   - "Gusaba indangamuntu ku banyarwanda baba mu mahanga badafite umubare wa NPR" (this schema's target)
   - "Gusaba Indangamuntu" (the ordinary domestic pathway, NPR-gated)
   - "Kwishyurira indangamuntu (mu buryo bwihariye)" (a special-arrangement payment variant, not screened this cycle)
4. Selecting the first option shows a service-preview panel: processing
   time 30 minutes, fee RWF 500, 3 required documents, provided by NIDA.
5. Clicking "Saba" (Apply) navigates to the exact URL cited in `source.url`
   above — confirming the deep link is real, just not directly fetchable
   without first establishing this client-side navigation state.

## Extraction technique

Every field name in `schema.json` is a real Angular `formcontrolname`
attribute read directly from the live DOM via
`document.querySelectorAll('[formcontrolname]')`, not inferred from visible
labels alone. Two genuine `requiredWhen`/`visibleWhen` cascades were
confirmed live by toggling the relevant control and diffing the DOM/visible
document checklist before and after, rather than assumed from static
markup:

1. **Birth-country cascade.** Selecting "Rwanda" in the first
   `locationCountryFormControl` reveals a required `locationDistrictFormControl`
   (Akarere/district picker). Selecting any other country (tested with
   Uganda) instead reveals a required free-text city-of-birth field in the
   same position. Confirmed by reading `document.querySelectorAll('[formcontrolname]')`
   before and after each selection and diffing the control list.
2. **Civil-status cascade.** Selecting "Arubatse" (married) in
   `civilStatusFormControl` reveals a required `spouseName` text field (and
   an unrequired `spouseNationality` country picker) not present for any
   other value. Independently, toggling through all five civil-status
   values (Arubatse/Ingaragu/Uwatandukanye n'uwo bashakanye/
   Umupfakazi(Gabo)/Umupfakazi(Gore)) and re-reading the "Imigereka"
   (attachments) checklist each time showed a 4th checklist item
   ("Civil Status document") appearing for every value **except** Ingaragu
   (single) — modelled as `requiredWhen civilStatus notEquals SINGLE`.
3. **Passport-details cascade.** Toggling `havePassportFormControl` between
   "Yego" (yes) and "Oya" (no) revealed/hid four fields
   (`passportNumberFormControl`, `dateOfIssueFormControl`,
   `expiryDateFormControl`, and a second `locationCountryFormControl`
   instance for place of issue) — confirmed the same diffing way.

**Live required-field validation.** Clicking "Ibikurikira" (Next) with every
field left blank produced a live `mat-error` "Uyu mwanya ni ngombwa." (this
field is required) message under each of the twelve asterisked fields —
independently corroborating every `required: true` field in `schema.json`
beyond the mere presence of an asterisk in the label.

**Genuine server-side photo validation.** The `applicantPhoto` document
upload was tested with a synthetic solid-grey JPEG generated via the
`sharp` npm package. The two plain identity-document-copy uploads
(`identityOrTravelDocumentCopy`, `residenceCountryIdCopy`) accepted this
file without complaint, but the photo upload specifically was rejected with
a live error explaining the required composition (white background,
centered face, eyes open and forward-facing) — confirming this endpoint
runs genuine image-content validation, not just file-type/extension
checking, the same class of finding already made for
`tz/immigration/passport-application`'s photo upload. **This gate is why
the session was not advanced past step 1** ("Dosiye isaba") into steps 2
("Incamake"/Summary) and 3 ("Kwishyura"/Payment) — fabricating a
passing photo, or advancing toward an actual payment step, was out of
scope. Steps 2 and 3 are therefore not modelled in this schema version;
Incamake is understood (per the wizard's own step labels and this
registry's experience with structurally similar wizards) to be a read-only
review of already-entered data rather than a source of new fields, but this
was not directly observed this cycle and is disclosed as such rather than
asserted.

`civilStatusFormControl`'s five options were read directly from the live
`ng-select` dropdown panel and are modelled as a closed `enum`.
`professionFormControl` and the various `locationCountryFormControl`
instances are backed by much larger external reference lists — searching
"Umukozi" in the occupation picker alone returned nine distinct
bank/civil-service/embassy/UN-related entries — and are modelled as
free-text `string` fields per this registry's established convention for
such large external-list-backed selectors (see
`tz/immigration/passport-application`'s `birthCountry`/`visitCountry`
fields for precedent).

## Disclosed judgment calls

- **Only step 1 ("Dosiye isaba") is modelled.** Steps 2 and 3 were not
  reached this cycle (see the photo-validation gate above); this is
  disclosed as an accepted scope boundary rather than silently omitted,
  matching this registry's precedent for `tz/immigration/passport-application`
  stopping short of its own Declaration/Payment/Complete steps.
- **`spouseNationality` has no `requiredWhen`**, only `visibleWhen` — the
  live form shows no asterisk on this field even when visible (married),
  unlike its sibling `spouseName`, which does carry one.
- **`birthDistrict`/`birthCity` are mutually exclusive** via
  `requiredWhen`/`equals`+`notEquals` on the same `birthCountry` field —
  exactly one of the two is ever shown/required at a time, confirmed live.
- **`heightCm` validation bounds (30–250)** are a sanity range this registry
  applies by convention for human height in centimetres; the live form
  itself does not print an explicit numeric range.
- **The international phone widget** (`ngx-intl-tel-input`) defaults to
  Rwanda's +250 country code but is a genuine international input — a
  diaspora applicant is not restricted to a Rwandan number.

## Validation

- `node tools/validate.mjs` — 502/502 documents pass (501 prior + this one).
- `node tools/validate-ajv.mjs` — 502/502 documents validate against the
  v0.3 meta-schema.
- `node tools/verify-sources.mjs --base origin/main` — confirms the cited
  source URL.
- Conformance fixtures under
  `conformance/rw/irembo/nida-diaspora-application/1.0.0/`: valid fixtures
  covering both the Rwanda/foreign birth-country branches and both civil
  status branches (married-with-document, single-without-document), plus
  mutation-control fixtures each raising exactly one error.

GovSchema is independent and is not affiliated with, endorsed by, or
operated by the Republic of Rwanda, NIDA, or Irembo. This schema does not
file the application itself; the live source (`irembo.gov.rw`) is always
authoritative.
