# Verification record — ma/maec/evisa-application@1.0.0

## Candidate selection

GOV-3454 ("GovSchema Standard Research") re-screened Egypt's National ID
vertical first (the registry's only genuinely open, unscreened backlog
item at cycle start, per GOV-3447) and found it a confirmed dead end —
every official Egyptian domain (`digital.gov.eg`, `egypt.gov.eg`,
`psm.gov.eg`, `moi.gov.eg`) is unreachable or WAF-blocked this session,
and the only reachable substitutes (consulate mirrors, an embassy Google
Form) are too thin or non-authoritative to author from. It also confirmed
every remaining single-vertical-gap jurisdiction already in the registry
(Greece/National ID, Mexico/National ID, Indonesia/National ID, Malaysia/
Taxes+National ID, North Macedonia/Visa) has its own gap already
catalogued as a confirmed dead end — none was a live re-screening
candidate. Scouted three new-jurisdiction candidates in parallel:
Kazakhstan (Business Formation, via a Ministry of Justice order published
unauthenticated on `adilet.zan.kz` — strong, but left as backlog this
cycle, see below), Morocco (multiple verticals), and Bahrain (every
vertical funnelled through a unified "eKey" SSO login or WAF-gated
e-visa — confirmed dead end this cycle). Morocco's eVisa portal
(`acces-maroc.ma`) won: a live, unauthenticated AngularJS single-page
application whose bundled JavaScript embeds the real field markup in its
own `$templateCache`, architecturally identical to this registry's
existing `am/mfa/evisa-application` and `ge/mfa/evisa-application`
schemas. This opens Morocco as the registry's 71st jurisdiction, with one
vertical (Visa).

## Reaching the live source

Fetched `https://www.acces-maroc.ma` and
`https://www.acces-maroc.ma/scripts/app-a10b0147a8.js` this session with a
plain `curl` and a standard desktop Chrome User-Agent string. Note: the
bare apex domain `acces-maroc.ma` (no `www.`) does not resolve at all in
this environment — the `www.` subdomain is required.

- Root page: HTTP 200, `Content-Type: text/html`, 14,877 bytes, sha256
  `ee69914ffe699293f90e01e7605a8f56faaf6d9cac3901bbeefd0a62ec48cc25`.
- JS bundle: HTTP 200, `Content-Type: application/javascript`,
  1,500,168 bytes, sha256
  `05481e21b3d214d9f1f705ada06d38af847015a8bef5ba6d4b23b8e8ee34e2c1`.

Both served straight through Cloudflare (`cf-cache-status: HIT`) with no
login/CAPTCHA/WAF gate on retrieving either static asset. A prior
scouting pass's finding that the *rendered* application appears
WAF-blocked applies to the API-hydrated SPA route (which needs the
gated `/api/referentiel/*` reads below to populate its dropdowns), not to
retrieving the raw HTML/JS this schema is sourced from.

## Structure of the source: a real Angular `$templateCache`, not compiled output

`scripts/app-a10b0147a8.js` is a minified but not obfuscated AngularJS
application bundle. Its `$templateCache.put("app/evisa/formulaire.html",
'...')` entry embeds the literal, uncompiled HTML the `eVisaController`
renders for every step of the individual e-visa wizard — `name`,
`ng-model`, `required`/`ng-required`, `ng-pattern`, and `ng-if`
step/sub-block visibility guards are grep-able as plain text, not
reconstructed from a rendered DOM.

The wizard has six `eVisaCrtl.step` values. This schema models steps 2
through 5 (steps 1 and 6 are out of scope, see below):

- Step 2, eligibility (`ng-form name="eligibilite"`): nationality,
  country of residence, date of birth, passport type, visit category
  (motif de voyage), and an optional "do you hold another valid visa"
  flag.
- Step 3, clauses (`ng-form name="refsClauses"`): a server-populated,
  `ng-repeat`-driven list of individually-required attestation
  checkboxes, modelled as a single `clausesAccepted` gate since the exact
  clause count/text is server-driven and may change.
- Step 4, personal + passport information (`ng-form
  name="refInfoBeneficiairesVisa"` and `ng-form name="refInfoPasseport"`):
  last/first name, place of birth, phone, email, profession, passport
  number/issuing country/issue date/expiry date, plus a conditional
  `identifiantNational` field.
- Step 5, travel information (`ng-form name="refInfoVoyage"` plus two
  `ng-if="eVisaCrtl.champsAffichees.indexOf(...) !== -1"` sub-blocks):
  arrival/departure dates always present; an "additional visa" sub-block
  and a "habitual residence" (foreign residence permit) sub-block only
  rendered when the server-computed `champsAffichees` array includes
  `'VISA_ADDITIONNEL'`/`'RESIDENCE'` respectively.

Three fields repeat values already captured in step 2 but rendered
`disabled` in later steps (`dateNaissanceBeneficiaire`,
`nationnaliteOrigineBeneficiaire`, `refTypePasseport`, `refPaysResidence`,
`refTypeVisaAdditionnel`) — these are read-only mirrors of earlier
answers, not independently editable fields, and are not modelled
separately.

## The `isJordanie()` conditional — resolved, not left as a disclosed gap

The `identifiantNational` field is rendered only
`ng-if="eVisaCrtl.isJordanie()"`. Rather than leave this as an
unconfirmed disclosure, this session traced `isJordanie()` to its literal
function body in the bundle:
```js
function ne(){return se.demandeIndividuel&&se.demandeIndividuel.refInfoBeneficiairesVisa&&se.demandeIndividuel.refInfoBeneficiairesVisa.nationaliteActuel&&se.demandeIndividuel.refInfoBeneficiairesVisa.nationaliteActuel.code===u.CODE_PAYS_JORDANI}
```
and `CODE_PAYS_JORDANI` to its literal value in the same bundle's shared
constants module: `CODE_PAYS_JORDANI:"JOR"`. This schema therefore models
`nationalIdNumber` with a genuine `requiredWhen: {"field": "nationality",
"equals": "JOR"}` rather than an always-optional field with a disclosed
caveat.

## Validation patterns — resolved from the bundle's shared Constants module

`ng-pattern="eVisaCrtl.fieldFormat"` / `passportFormat` / `emailFormat`
are not per-controller literals; they are assigned from a shared
`Constants` object (`ae.fieldFormat=u.FIELD_FORMAT`, etc., where `u`/`s`/
`o` are minified references to the same module). Traced to their literal
definitions:
```js
FIELD_FORMAT: /^[a-zA-Z0-9'\-_\/. ]*$/
PASSPORT_FORMAT: /^[A-Za-z0-9]+$/
EMAIL_FORMAT: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
```
These are reproduced verbatim in this schema's `validation.pattern`
entries for `lastName`, `firstName`, `placeOfBirth`, `additionalVisaNumber`,
`residencePermitNumber`, `nationalIdNumber` (fieldFormat),
`passportNumber` (passportFormat), and `email` (emailFormat).

## Date format

All date fields use the site's own `DD/MM/YYYY` format, confirmed from
the bundle's own per-controller constant `eVisaCrtl.format="dd/MM/yyyy"`
(consistently set across every controller in the bundle, not just this
one) and reproduced as each date field's `validation.pattern`.

## Scope boundaries (disclosed, not silently dropped)

1. **Server-driven reference-list enumerations.** `nationality`,
   `countryOfResidence`, `passportType`, `visitPurpose`,
   `hasAdditionalVisa`, `passportIssuingCountry`, `profession`, and
   `additionalVisaEntriesRequested` are all populated at runtime from the
   portal's own `/api/referentiel/*` endpoints. This session confirmed
   those endpoints require a valid OAuth2 bearer token (`401
   {"error":"unauthorized",...}` on a direct unauthenticated request; the
   bundle's own `Settings` constant, fetched live and unauthenticated
   from `/assets/static/env.js`, confirms `enableCaptcha: true` and a
   distinct `openidUrl`/`clientId` OAuth2 client-credentials flow gates
   these specific reads, not the HTML/JS retrieval this schema is
   sourced from). Rather than fabricate a value list, these fields are
   modelled as open strings with no `enum` — a disclosed limitation, not
   a guess.
2. **Step 6, document uploads (`documents[]`).** A dynamic,
   per-applicant list of required/optional attachment categories fetched
   from `eVisaCrtl.listePj`, itself populated server-side and depending
   on the applicant's own nationality/visit-category answers. Not
   modelled; no `documents[]` array in this schema.
3. **Step 1 (dossier/beneficiary list management) and post-submission
   flows** (`complementModal.html`'s "complément de dossier" request,
   `modalPaiement.html`'s payment step) are session/workflow chrome
   around the actual application form, not additional data-collection
   fields, and are out of scope.
4. **The `champsAffichees` trigger rule itself.** This session could not
   independently confirm, from static analysis alone, the exact
   condition (nationality? visit category? country of residence?) that
   sets `champsAffichees` to include `'VISA_ADDITIONNEL'`/`'RESIDENCE'`.
   Rather than encode a guessed `visibleWhen`/`requiredWhen` expression,
   the six fields in those two sub-blocks are modelled as always
   optional (`required: false`, no conditional gate) with the caveat
   documented in each field's own description.
5. **The separate `formulaireVisa`/`demandeVisa` legacy module.** A
   direct grep confirmed the only dependent/"enfant" sub-form in the
   entire bundle (`app/formulaireVisa/enfantModal.html`) belongs to a
   different Angular controller (`FormulairevisaController`), never
   referenced by `eVisaController`'s own template or `champsAffichees`
   conditionals (0 occurrences of `enfant` inside
   `app/evisa/formulaire.html` itself). This individual e-visa
   application has no dependents/children flow; not modelled because it
   does not exist in this form, not because it was out of scope.
6. No application was submitted and no fee was paid producing this
   schema.

## Conformance

2 valid fixtures (0 errors each — a French tourist exercising the
baseline path with no additional visa/residence permit, and a Jordanian
business traveller resident in the UAE exercising every optional/
conditional branch: the `requiredWhen`-triggered `nationalIdNumber`, the
additional-visa sub-block, and the residence-permit sub-block) plus 7
mutation-control fixtures (each raising exactly 1 error: three plain
missing-required-field cases across different field types — boolean,
string, date — one `requiredWhen` cascade violation, and three distinct
invalid-pattern cases covering `fieldFormat`, `emailFormat`, and
`passportFormat`) are committed under
`conformance/ma/maec/evisa-application/1.0.0/`. All 9 were independently
re-checked this session against a from-scratch mock validator
implementing this schema's `required`/`requiredWhen`/`pattern` rules,
each producing the exact expected error count. Both `tools/validate.mjs`
and `tools/validate-ajv.mjs` pass with this document included.
