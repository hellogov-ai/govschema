# Verification record — kg/gns/tax-registration-application@1.0.0

## Candidate selection

GOV-4703 ("GovSchema Standard Research"), authoring the STI-163 candidate
GOV-4410 had identified as Kyrgyzstan's strongest remaining Business
Formation candidate but could not verify at the time: `sti.gov.kg`'s
file-serving endpoint (`/section/view-pdf`) was returning HTTP 500 for
every file tested that cycle, confirmed via more than ten independent
fetch attempts. This cycle re-fetched the same URL fresh and found it
recovered (HTTP 200). Opens Kyrgyzstan's Business Formation vertical
(2 of 6), following GOV-4399's Taxes-vertical opening.

## Reaching the live source

Target: the State Tax Service's (GNS) forms-listing page,
`https://sti.gov.kg/section/0/%D1%84%D0%BE%D1%80%D0%BC%D1%8B_%D0%B7%D0%B0%D1%8F%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B9`
("Формы заявлений"), HTTP 200, 304,694 bytes. Confirms a "DOC STI-163"
listing entry dated 22 января 2026, with anchor text "Заявление на
регистрацию / перерегистрацию налогоплательщика (DOC STI-163)" matching
the form's own printed heading exactly.

Independently re-fetched the form PDF itself rather than trusting
GOV-4410's own banked description alone:
`https://sti.gov.kg/section/view-pdf?filePath=websti%2F2026%2F01%2F23%2FDOC%20STI-163%20(%D1%80%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9).pdf`
— HTTP 200, `Content-Type: application/pdf`, 223,620 bytes. sha256
`fae770687ecb18b30addcce355326c051b301265c3b561e4980f215c9ad86869`.

No separate field-by-field completion guide ("Порядок заполнения") is
linked anywhere on the listing page for STI-163, unlike the sibling
`kg/gns/unified-tax-declaration` schema (whose own STI-091 form has one);
only two sibling forms (STI-164, deregistration, and STI-024/025, a
registration card) are listed alongside it, none of which are completion
guides for STI-163 itself. Every interpretation below is derived from the
form's own printed captions only.

Fetched with a plain `curl -A "Mozilla/5.0"`; no login/CAPTCHA/WAF gate.
One transient connection-level failure (curl exit `000`) recurred on both
the form URL and the listing-page URL during this session, resolved on
retry within seconds on both — a flaky-network blip, not a durable gate,
clearly distinct from GOV-4410's own multi-attempt, multi-tool-confirmed,
multi-minute outage on the same endpoint.

## Extraction method

`pdfjs-dist` (vendored at `/tmp/node_modules/pdfjs-dist`) `getAnnotations()`
confirmed zero `/Widget` annotations across both of the specimen's 2
pages — a flat, non-AcroForm specimen. `getTextContent()` read every text
item's raw string and its `transform` x/y position. Page 1's Section II
checkbox grids print several checkbox-grid columns side by side rather
than in a single top-to-bottom reading order; reconstructed by grouping
items on rounded x-coordinate into columns first, then reading each
column top-to-bottom — a variant of this registry's already-documented
non-sequential-reading-order PDF-extraction pattern
(`gov-form-pdf-extraction`, previously seen on `be/mobilit`). No vector
checkbox glyphs were found anywhere in the text layer; the form's own
instruction text ("нужное отметить знаком «Х»", mark the applicable one
with an "X") confirms checkboxes are hand-marked squares rendered as
vector graphics, not text glyphs, matching this registry's already-
documented vector-checkbox extraction pattern (previously seen on
`tn/dgsn/national-identity-card-application`).

## Document structure

Page 1: an order-citation header (Приложение 1 к приказу ГНС от «22»
января 2026 года № П-19); the form title; Section I "ИНФОРМАЦИЯ О
НАЛОГОПЛАТЕЛЬЩИКЕ" (taxpayer information — items 102-104, then a
"Реквизиты налогоплательщика" sub-heading over items 112-116: registered
address, actual-residence address, business address, phone, email);
Section II "СОДЕРЖАНИЕ ЗАЯВЛЕНИЯ" — item 117, a 3-column, 7-option
checkbox grid selecting the requested registration/re-registration
action; a "Основание для регистрации" (grounds for registration) block
with a single checkbox option (intent to conduct economic activity) plus
a free-text description blank; a "Заявляю о применении налогового
режима" heading over a further 3-column checkbox grid of 11 tax-regime
options; and a closing applicant declaration (a combined
position/full-name blank, a signature blank, and item 300, the
application's submission date). Section III "ИНФОРМАЦИЯ НАЛОГОВОГО
ОРГАНА" (items 900-902 — incoming application number, receipt date, and
the receiving officer's own INN) plus a second signature/position blank
for the receiving tax-authority employee are entirely tax-authority-
populated and excluded from this schema. Page 2, "ПРИЛОЖЕНИЕ 1: СТАВКА
ЕДИНОГО НАЛОГА" (Appendix 1: Unified Tax Rate), is a companion
rate-selection schedule applicable only when Section II's tax-regime
checkbox selects Единый налог (unified tax); excluded from this v1.0.0,
see Finding 5 below.

## Disclosed findings and interpretation choices

1. **`iin` (item 102) is modelled as optional (`required: false`)**,
   unlike the sibling `kg/gns/unified-tax-declaration` schema's own `iin`
   field, which is required. That sibling schema is a recurring report
   filed by an already-registered taxpayer who necessarily already holds
   an ИНН; this form is the taxpayer's own *first* registration/
   re-registration event, at which a first-time individual-entrepreneur
   or natural-person registrant may not yet hold an ИНН. No completion
   guide exists for this form to resolve the ambiguity either way, so the
   more permissive reading is taken and disclosed here rather than
   asserted.
2. **`businessAddress` (item 114) is modelled with `requiredWhen` gating
   on `registrationAction` being `individual_entrepreneur_registration`
   or `farm_enterprise_registration`** — the two registration-action
   options that structurally imply an operating place of business,
   distinct from a plain natural-person tax registration
   (`individual_registration`), which has no inherent place-of-business
   concept. This mirrors this registry's established discriminator-gated-
   field pattern (e.g. `be/partena`'s `INDIVIDUAL`/`COMPANY`/
   `UNINCORPORATED_ORGANIZATION` discriminator).
3. **`economicActivityDescription` is modelled with `requiredWhen` gating
   on `registrationAction` being one of the three substantive first-time-
   registration actions** (`individual_entrepreneur_registration`,
   `individual_registration`, `farm_enterprise_registration`) **rather
   than unconditionally required.** The "Основание для регистрации"
   block prints exactly one selectable ground — intent to conduct
   economic activity, with a free-text description blank — and it reads
   naturally as applicable to a fresh registration rather than to a pure
   re-registration action (change of regime/details/district) that does
   not itself register a new activity. No explicit conditional
   instruction is printed on the form to this effect; disclosed as an
   interpretation choice rather than a literal source rule, following
   this registry's own precedent of gating only the unambiguous case
   rather than fabricating an unstated instruction.
4. **`taxRegime` is modelled as unconditionally optional (`required:
   false`)** despite the "Заявляю о применении налогового режима" heading
   reading as a general declaration. Whether every one of the seven
   `registrationAction` values necessarily requires a fresh regime
   declaration (e.g. a pure "change of registration details"
   re-registration arguably would not) is not stated anywhere on the
   form; rather than fabricate a `registrationAction`-keyed `requiredWhen`
   gate the source does not itself state, this field is left optional and
   the ambiguity is disclosed here.
5. **Page 2 ("ПРИЛОЖЕНИЕ 1: СТАВКА ЕДИНОГО НАЛОГА") is excluded from this
   v1.0.0, disclosed as open backlog for a future minor version.** It is
   a companion rate-selection schedule (a further nested checkbox grid
   distinguishing trade-activity, processing, and several
   sector-specific sub-rates) that this form's own printed text states is
   required only "при выборе данного режима" (when this [unified-tax]
   regime is chosen) — i.e. conditionally scoped to a single one of
   `taxRegime`'s 11 values. Rather than model an entire second-page
   companion schedule behind a single enum branch in this v1.0.0, this
   schema follows this registry's established main-form-now/companion-
   annex-later convention (e.g. Hungary's 24 deferred companion sheets,
   Latvia's VID annex series, Kazakhstan's Form 220.00/250.00 series).
6. **Section III (items 900-902) and the tax authority's own signature/
   position blank are excluded as tax-authority-populated, not
   applicant-supplied data**, matching this registry's own convention for
   analogous authority-completed receipt blocks (e.g. this schema's own
   sibling `kg/gns/unified-tax-declaration`'s cell-901 exclusion,
   Kazakhstan's Form 220.00 bottom block).
7. **`applicantPositionAndFullName` combines the source's own single
   blank line for "(должность, Ф.И.О. заявителя)" into one field**,
   rather than splitting it into separate `position`/`fullName` fields,
   since the source prints only one undivided blank for both, not two
   structurally distinct entry areas.
8. **`iin` is modelled without a specific digit-count pattern**, matching
   the sibling `kg/gns/unified-tax-declaration` schema's own disclosed
   finding — neither this form nor any completion guide states the ИНН's
   digit length.

## Conformance

3 valid mock scenarios —
`valid-individual-entrepreneur-registration` (a full individual-
entrepreneur registration selecting the patent tax regime, exercising the
`businessAddress` and `economicActivityDescription` requiredWhen gates in
their required-true branch), `valid-natural-person-registration` (a plain
natural-person tax registration with no place-of-business, exercising
`businessAddress`'s requiredWhen gate in its required-false branch while
still requiring `economicActivityDescription`), and
`valid-reregistration-district-change` (a pure district-change
re-registration, exercising both `businessAddress` and
`economicActivityDescription`'s requiredWhen gates in their
required-false branch) — plus 9 static-`required`-field mutation
fixtures, 2 `requiredWhen`-gate mutation fixtures
(`mutation-missing-businessaddress-requiredwhen-entrepreneur`,
`mutation-missing-economicactivitydescription-requiredwhen-individual`),
and 1 unknown-field-rejected fixture, committed under
`conformance/kg/gns/tax-registration-application/1.0.0/`.

An ephemeral, from-scratch conformance checker (deriving required/
requiredWhen rules directly from this schema's own `fields[]`, discarded
after use, not committed) ran all 15 fixtures: all 3 valid scenarios at 0
errors, all 11 mutation controls each raising exactly 1 error, and the
unknown-field fixture correctly rejected. Validated clean with
`node tools/validate.mjs` and `node tools/validate-ajv.mjs`, individually
and as part of the full registry run. `registry-index.json` regenerated
via `npm run build-index` in `tools/govschema-client/`.
