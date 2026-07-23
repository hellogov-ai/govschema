# Verification record — ci/dst/passport-application@1.0.0

## Candidate selection

GOV-4554 ("GovSchema Standard Research", 2026-07-23). This candidate was
originally scouted and independently re-verified as STRONG during the
GOV-4539 cycle (2026-07-23), which opened Côte d'Ivoire as the registry's
90th jurisdiction via its Visa vertical (`ci/dst/visa-application`) and left
this Passport specimen banked in `CATALOG.md`'s Known Gaps entry 0l as
open backlog, since Visa's own bilingual specimen was the more completely
legible of the two STRONG candidates found that cycle. Taxes was authored
in the interim (GOV-4547, `ci/dgi/microenterprise-tax-declaration`). This
cycle re-fetched and authored the Passport candidate directly, following
the same Known Gaps entry's own banked note.

Côte d'Ivoire's other three verticals remain as GOV-4539 left them:

- **DMV** — confirmed dead end. DGTTC/OSER licensing and vehicle
  registration route exclusively through the login/account-gated
  `eservices.cgi.ci/avit/` portal.
- **Business Formation** — a real candidate (CEPICI's "formulaire unique"
  sole-trader form, and DGI's `Formulaire_Enregistrement_des_Entreprises_FNE.doc`)
  but CEPICI's own live host sits behind a Sucuri bot-detection JS
  challenge that 307/404s a plain fetch — left as open backlog pending a
  real-browser-capable pass.
- **National ID & Civic Documents** — weak. ONECI's actual CNI application
  is a live, unauthenticated HTML pre-enrollment form rather than a static
  document.

## Reaching the live source

Fetched `https://snedai.com/docs/formulaire_passeport.pdf` directly with a
plain `curl` request using a realistic desktop User-Agent (Cloudflare-fronted
but not gated — no login wall, CAPTCHA, or paywall):

- HTTP 200, `Content-Type: application/pdf`, `Content-Length: 69840` — a
  byte-for-byte match with the GOV-4539 cycle's own reported size.
- `Last-Modified: Mon, 19 Feb 2024 15:10:05 GMT`.
- sha256 `25d308ad6af317c5e5c5c215cca95de36f62f9c3e3d81f3d2ecb13f6f8fdc67b`.
- `snedai.com` (Société Nouvelle d'Exploitation du Domaine Aéroportuaire
  d'Abidjan — the Abidjan airport operator) mirrors this Ministry of
  Security form for arriving/departing travellers, the same
  third-party-but-official-content mirror already accepted for this
  jurisdiction's Visa schema (see GOV-4539's own VERIFICATION.md).

## Extraction method

Extracted with `pdfjs-dist` (vendored at `/tmp/node_modules/pdfjs-dist`),
reading the single page's `getTextContent()` output, grouped by
y-coordinate row (±3pt tolerance) and sorted by x-coordinate to reconstruct
reading order. The page was additionally rendered to PNG via `pdfjs-dist` +
`node-canvas` (also vendored at `/tmp/node_modules/canvas`) at 2.5x scale
and visually reviewed — necessary to confirm box counts, column grouping
(e.g. the 4-column "Documents joints" checklist and the 6-row "Adresse
Géographique" block), and which of the two bottom signature boxes is
applicant-facing versus office-only.

## Document structure

A single-page French-language form: "Formulaire de demande de passeport
ordinaire à l'étranger" (Application for an ordinary passport, filed
abroad), Ministère de la Sécurité / Direction de la Surveillance du
Territoire (DST) / Sous-Direction de la Police de l'Air et des Frontières.
The page carries, top to bottom: applicant name; a 14-item "Documents
joints" (attached documents) checklist; biographic particulars (DOB, sex,
marital status, height) beside a "Photo" placeholder box; place/country of
birth, occupation, distinguishing marks, previous-passport and national-ID
numbers; a geographic address block (region/department/city/commune/
street/PO box) and phone number; parents' particulars; spouse's
particulars and marriage date/place; a contact person residing in Côte
d'Ivoire; and, at the foot of the page, two signature boxes side by side
("Signature du requérant" and "Signature du représentant de l'autorité").

## Fields modelled

28 `fields[]` across 6 steps (Applicant Identity; Geographic Address and
Phone; Parents' Particulars; Spouse's Particulars — Married Applicants
Only; Contact Person in Côte d'Ivoire; Declaration and Signature) plus 15
`documents[]` entries (the 14 "Documents joints" checklist items, plus the
form's own "Photo" placeholder box).

## Disclosed source-fidelity findings

1. **"Signature du représentant de l'autorité" (the second of the form's
   two bottom signature boxes) is excluded as office-only.** The rendered
   page confirms this is a distinct, equally-sized box beside "Signature
   du requérant" (the applicant's own signature, modelled as
   `applicantSignature`), with no printed indication the applicant
   supplies it.
2. **`maritalStatus` modelled as a literal `C`/`M`/`D`/`V` enum, matching
   this jurisdiction's own `ci/dst/visa-application` precedent
   (GOV-4539).** The source prints only the four single letters
   ("Situation matrimoniale" followed by boxed "C M D V") with no
   expansion anywhere on the page; modelled as-is (matching the standard
   French administrative ordering Célibataire/Marié(e)/Divorcé(e)/
   Veuf(ve) — Single/Married/Divorced/Widowed — this registry's own
   inference, not printed on the source).
3. **`sex` modelled as a literal `M`/`F` enum**, matching this
   jurisdiction's own Visa schema precedent — the source's "Sexe: M ▢ F
   ▢" never spells out either value.
4. **The spouse/marriage cluster (`spouseSurname`, `spouseGivenNames`,
   `spouseDateOfBirth`, `marriageDate`, `marriagePlace`) is gated
   `visibleWhen`/`requiredWhen` on `maritalStatus` equalling `M`
   (Marié(e)).** Unlike the sibling Visa schema (which models a single,
   ungated, optional `spouseName` field since that form prints no
   marital-status field to gate on), this Passport form provides its own
   explicit `maritalStatus` field, making a precise conditional gate
   possible and preferred over a blanket-optional judgment call.
5. **`height` modelled as an `integer` (centimetres), not a free-text
   string.** The source prints "Taille:" followed by a 3-digit box row
   immediately followed by a printed "cm" unit label outside the boxes —
   unlike this registry's `ng/nis/application-for-visa-entry-permit`
   precedent (a `string` height field, sourced from a form with no
   printed unit and a mixed-format expectation), this form's explicit unit
   and fixed 3-digit box width support a numeric model. Bounded `50`-`250`
   as a physiologically sane range; the source prints no explicit
   min/max.
6. **`previousPassportNumber` modelled as optional (`required: false`)
   despite no printed optionality marker**, since a first-time applicant
   (this form serves both first-time and replacement applicants, per its
   own generic title) would have no prior passport to cite. No field on
   the form distinguishes first-time from replacement applicants, so no
   `requiredWhen` gate could be constructed; this is a disclosed judgment
   call, not a printed instruction.
7. **`distinguishingMarks` ("Signes particuliers") modelled as optional**,
   matching this registry's common practice for equivalent fields on other
   passport/visa/ID forms (e.g. many applicants have none), despite no
   printed optionality marker on this specimen.
8. **The 14-item "Documents joints" (attached documents) checklist is
   modelled entirely as `documents[]` entries with `required: false`,
   including universally-expected items such as the birth-certificate
   extract and CNI/AI.** The rendered page confirms every one of the 14
   checkbox items (birth-certificate extract; CNI/AI; a parent's CNI/AI
   photocopy; nationality certificate; bank receipt; marriage-certificate
   extract; legalized parental authorization; naturalization decree;
   reintegration decree; spouse's nationality certificate; a
   previous-passport copy; adoption decision; adoptant's nationality
   certificate; hearing-minutes record) is printed in identical font
   weight with no asterisk, bold, or other distinguishing mark separating
   mandatory-for-everyone items from circumstance-specific ones (e.g.
   adoption- or naturalization-only documents) — the specimen provides no
   separate instructions annex clarifying which apply universally.
   Modelling any subset as statically required, or constructing a
   `requiredWhen` gate, would fabricate a distinction the source does not
   print; each item's applicability is left to the filer's own
   circumstances, consistent with this registry's practice of not
   inferring unprinted requiredness (e.g. Visa schema Finding 2).
9. **Parents' and the Côte d'Ivoire contact person's fields
   (`fatherSurname`/`fatherGivenNames`/`fatherDateOfBirth`,
   `motherSurname`/`motherGivenNames`/`motherDateOfBirth`,
   `contactSurname`/`contactGivenNames`/`contactDateOfBirth`/
   `contactPhoneNumber`) are modelled as required.** Each is a clearly
   bounded, singly-labelled box with no optionality marker, consistent
   with this jurisdiction's own Visa schema Finding 10 precedent for
   equivalently unambiguous single-purpose fields.

## Conformance

3 valid mock scenarios — `valid-first-time-single-applicant` (a single
applicant with no previous passport or spouse section); `valid-married-applicant-with-spouse`
(a married applicant exercising the full spouse/marriage cluster); and
`valid-widowed-applicant-with-previous-passport` (a widowed applicant
citing a previous passport number) — plus 18 mutation-control fixtures
(a missing-required-field fixture for each of `surname`, `givenNames`,
`dateOfBirth`, `sex`, `maritalStatus`, `height`, `placeOfBirthLocality`,
`countryOfBirth`, `occupation`, `nationalIdNumber`, `addressRegion`,
`addressCity`, `phoneNumber`, `fatherSurname`, `contactSurname`, and
`applicantSignature` — 16 fixtures; an invalid-enum fixture for
`maritalStatus`; and an unknown-field-rejected fixture) are committed
under `conformance/ci/dst/passport-application/1.0.0/`.

An ephemeral, from-scratch conformance checker (deriving required/enum
rules directly from this schema's own `fields[]`, including its
`visibleWhen`/`requiredWhen` gates, discarded after use, not committed) ran
all 21 fixtures: all 3 valid scenarios at 0 errors, and all 18 mutation
controls each raising exactly 1 error of the expected kind.

Validated clean with `node tools/validate.mjs` and `node tools/validate-ajv.mjs`,
individually and as part of the full registry run. `registry-index.json`
regenerated via `npm run build-index` in `tools/govschema-client/`.
