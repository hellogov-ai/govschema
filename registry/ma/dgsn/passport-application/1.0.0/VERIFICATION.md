# Verification record — ma/dgsn/passport-application@1.0.0

## Candidate selection

GOV-4114 ("GovSchema Standard Research") found no pre-banked candidate
still open at cycle start — the prior cycle's Netherlands Visa / Austria
DMV pair (GOV-4092/GOV-4094) had both been authored (GOV-4107, GOV-4100).
Scouted two fresh candidates in parallel: Morocco's five unscreened
verticals (Business Formation, DMV, Passport, Taxes, National ID — every
one open since Morocco's only schema, `ma/maec/evisa-application`, opened
the jurisdiction via Visa in GOV-3454), and Egypt's previously-unscreened
National ID vertical. Egypt's National ID confirmed weak: the Civil
Status Authority's own `digital.gov.eg`/`cso.moi.gov.eg` request-
initiation front end is real but sits behind an authenticated citizen
account, the underlying issuance step remains fundamentally in-person and
biometric, and the one third-party site with a detailed field-by-field
paper-form transcription had dead download links — left as screened,
confirmed weak. Morocco's Passport vertical won decisively: DGSN's own
`passeport.ma/FormDemande/FormDemande` is a plain, unauthenticated
ASP.NET MVC form with every field's `name`/`id`/`data-val*` attribute
readable directly from the served HTML — no login, CAPTCHA, or WAF gate
on the GET itself (the CAPTCHA only gates final submission). This is
markedly stronger than Morocco's other four open verticals, all of which
remained login-gated or unreachable this session (OMPIC/
`directentreprise.ma` for Business Formation; NARSA for DMV; DGI/SIMPL
for Taxes, with only unverifiable PDF adhesion forms as a fallback;
`cnie.ma` for National ID, unreachable with no field-level secondary
source).

## Reaching the live source

Fetched `https://www.passeport.ma/FormDemande/FormDemande` and its linked
`https://www.passeport.ma/js/FormDemande.js` this session with a plain
`curl` and a standard desktop Chrome User-Agent string.

- Form page: HTTP 200, `Content-Type: text/html; charset=utf-8`,
  132,381 bytes, sha256
  `a2c802b2722886ee227d5816f97c0ecb504d53a5ce87c77cebdf8e61aac7b116`.
- JS file: HTTP 200, `Content-Type: application/javascript`, 58,447
  bytes, sha256
  `86e346986f8c665f1bf0d214eaf61c8deea2ca1ead141d22adba505a8caf51c8`.

Both served directly with only session/anti-bot cookies set
(`TS01400756`, `TS1a8944dc027`, `MI=...`) — no login redirect, no
CAPTCHA challenge, and no WAF block on the GET request itself.

## Structure of the source

The form is a classic ASP.NET MVC unobtrusive-validation page: every
input's real, wire-level `name` attribute (e.g. `_Nom_FR`, `_Num_CNIE`,
`_Code_Qualite_Representant`) and every client-side rule
(`data-val-required`, `data-val-regex`/`data-val-regex-pattern`,
`data-val-length-max`, `data-val-number`) is present as plain,
un-minified HTML — not reconstructed from rendered output. The single
`Raison` radio group (`name="Raison"`, values `"1"`-`"4"`) drives which
of the form's five conceptual blocks are relevant, confirmed from
`FormDemande.js`'s own `.RadioRaison` `.change()` handler
(`.show()`/`.hide()` calls on `#Demandeur`, `#Min12Ans`, `#RepLegal`,
`#Mandataire`), and the `#procuration`/`#pinconnu`/`#pdecede`/
`#minconnu`/`#mdecede` change handlers that disable and clear their
respective dependent-person sub-blocks. This schema models 49 `fields[]`
across 5 steps (application_category, applicant_information,
parent_information, legal_representative_information,
proxy_mandatary_information) and 0 `documents[]`.

## Six disclosed findings from this session's own read of the fetched assets

1. **Two inconsistent country-code schemes on the same form.**
   `_PaysNaissance_FR` (country of birth) and the three
   dependent-person nationality selects (`_Pays_Pere`, `_Pays_Mere`,
   `_Pays_Representant`, `_Pays_Mandataire`) all use the country's own
   display NAME as the option `value` (e.g. `value="ALGERIE"`), while
   `_Pays` (country of residence) uses an unrelated numeric code
   (`value="201"` for Afghanistan, `"202"` for Afrique du Sud, ...) —
   confirmed by a direct diff of the two `<select>` option blocks in the
   fetched HTML. Both are modelled as open strings (not literal enums,
   to avoid transcription error across ~194 options each) with this
   discrepancy documented in each field's own description.
2. **The ASP.NET MVC boolean-checkbox idiom.** Every boolean checkbox on
   this form (`NoMoisJour`, `NoJour`, `PereInconnu`, `PereDecede`,
   `MereInconnu`, `MereDecede`, `procuration`) is paired with a
   same-named hidden `type="false"` fallback input and carries a
   `data-val-required` attribute. This is the standard
   `Html.CheckBoxFor` output pattern (the framework always emits
   `data-val-required` so the field always binds to a boolean, not
   because the box must be checked) — confirmed by checking that none of
   these boxes are pre-checked and none of the four `RadioRaison`
   branches are blocked from proceeding by them. All seven are modelled
   as optional attestations (`required: false`), not gated on
   `data-val-required`'s literal presence.
3. **Asymmetric requiredness inside each dependent-person block.** Across
   all four blocks (père, mère, représentant légal, mandataire), only
   the "type de pièce d'identité" `<select>` (`typeIdPere`/`typeIdMere`/
   `typeIdRep`/`typeIdMan`) carries a genuine `data-val-required` in the
   fetched markup — confirmed by grepping each block's full markup
   directly. The corresponding name (`_Nom_*`/`_Prenom_*`), nationality
   (`_Pays_*`), and ID-number (`_Num_CNIE_*`) fields in all four blocks
   carry at most `data-val="true"` (format-check only) and never
   `data-val-required`; two of the four ID-number fields
   (`_Num_CNIE_Pere`, `_Num_CNIE_Mere`) and the mandataire/représentant
   nationality selects carry no `data-val` attribute at all. Modelled
   faithfully — `required: false` on every name/nationality/ID-number
   field in these blocks, `requiredWhen` only on the four ID-type
   selects — rather than assuming the whole visually-grouped block is
   mandatory.
4. **A broken client-side regex on the postal address field.** `_Adresse_FR`'s
   own `data-val-regex-pattern` is
   `(?i)^[a-zA-Z0-9'-/.: ,\s-]+$`. The leading `(?i)` inline
   case-insensitivity flag is .NET `Regex` syntax (from the server-side
   `[RegularExpression]` attribute); it is not valid JavaScript `RegExp`
   syntax. Confirmed this session by attempting
   `new RegExp("(?i)^[a-zA-Z0-9...")` in a Node REPL, which throws
   `SyntaxError: Invalid regular expression` — meaning jQuery Validate's
   unobtrusive adapter would throw constructing this pattern in-browser,
   and the format check silently never fires client-side. Modelled with
   the `(?i)` prefix stripped (the evidently-intended pattern).
5. **A non-left-anchored regex on the day/month birth-date fields.**
   `_DateNaissanceJour`/`_DateNaissanceMois`'s own
   `data-val-regex-pattern` is `[0-9]{2}$` — anchored only on the right,
   so it would technically accept any string merely ending in two
   digits. Modelled with the evidently-intended `^[0-9]{2}$`.
6. **A malformed character class on the phone field.**
   `_Num_Tel`'s own `data-val-regex-pattern` is
   `^[5-6-7]{1}[0-9]{8}$`. `[5-6-7]` parses as the range 5–6, plus a
   literal `-`, plus a literal `7` — not "one of 5, 6, or 7" as the
   field's own tooltip text (`7XXXXXXXX, 6XXXXXXXX ou 5XXXXXXXX`)
   states. Modelled with the evidently-intended `^[5-7][0-9]{8}$`.

## Scope boundaries (disclosed, not silently dropped)

1. **`CaptchaText`.** A bot-mitigation control, not an application
   datum — not modelled, consistent with this registry's existing
   `ma/maec/evisa-application` precedent.
2. **Document uploads / in-person supporting-document checklist.** This
   form has no `type="file"` inputs at all — completing it online
   produces a reference number for an in-person appointment at a
   passport bureau (in Morocco) or consulate (abroad), where physical
   supporting documents are checked. The site's own "Pièces à fournir"
   menu documents that checklist separately; not modelled, no
   `documents[]` array in this schema.
3. **The five representative-category explanatory modals.** "Tuteur
   Testamentaire", "Kafil", "Juge", "Tuteur Datif", and "Autre" each open
   a Bootstrap modal with explanatory prose about that legal-guardianship
   category (sourced from Moroccan family/child-protection law) — no
   additional form fields of their own; not modelled beyond the
   `legalRepresentativeCapacity` enum value each corresponds to.
4. **~194-entry static country lists (six select fields).**
   `countryOfBirth`, `fatherNationality`, `motherNationality`,
   `legalRepresentativeNationality`, `mandataryNationality` (all
   country-name-valued), and `countryOfResidence` (numeric-code-valued)
   are all modelled as open strings rather than literal `enum` arrays,
   to avoid transcription error at that scale — see finding 1 above for
   the two schemes' exact values.
5. No application was submitted and no fee was paid producing this
   schema.

## Conformance

2 valid fixtures (0 errors each — an adult applicant paying by stamp
code with no dependent-person blocks at all, and a 12-to-18-year-old
minor with both parents known and the father acting as legal
representative with no power of attorney granted) plus 8
mutation-control fixtures (each raising exactly 1 error: a plain
missing-required-field case, a `requiredWhen` fee-exemption cascade
violation, an invalid-pattern case on the CNIE number, two
`requiredWhen` cascade violations inside the parent/legal-representative
blocks, an invalid-enum case on gender, a `requiredWhen` cascade
violation on the mandatary ID-type field once a power of attorney is
granted, and an unknown-field-rejected case) are committed under
`conformance/ma/dgsn/passport-application/1.0.0/`. All 10 were
independently checked this session against a from-scratch mock validator
implementing this schema's `required`/`requiredWhen`/`visibleWhen`/
`pattern`/`enum`/`maxLength` rules, each producing the exact expected
error count. Both `tools/validate.mjs` and `tools/validate-ajv.mjs` pass
with this document included.
