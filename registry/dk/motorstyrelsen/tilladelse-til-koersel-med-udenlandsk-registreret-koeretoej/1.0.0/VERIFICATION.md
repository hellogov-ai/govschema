# Verification record — dk/motorstyrelsen/tilladelse-til-koersel-med-udenlandsk-registreret-koeretoej@1.0.0

## Why this candidate (GOV-2355, "GovSchema Standard Research")

The task brief for this issue framed form 21.059 as closing Denmark's DMV
vertical (its last open vertical, bringing Denmark to 6/6). By the time this
authoring pass started, a concurrent cycle (GOV-2346) had already merged
`dk/fstyr/samtykkeerklaering-koerekort-under-18` (form P23T, the under-18
driving-licence consent declaration) and closed Denmark's DMV vertical to
6/6 — confirmed by fetching `origin/main` fresh (commit `90d18fa`) and
reading `CATALOG.md`'s own Executive Summary before doing any extraction
work here. Rather than discard the pre-scouted, independently-confirmed
candidate (38 distinct AcroForm fields / 48 widgets, per this issue's own
brief), this schema authors form 21.059 anyway as a **second, genuinely
distinct** DMV sub-process for Denmark: it is not a duplicate of P23T (a
narrow parent/guardian consent declaration for minor licence applicants) or
of either DMV candidate P23/Motorstyrelsen-re-registration screened and
rejected by the prior GOV-2253 cycle (P23 is a shared, multi-party
397-field record card; the Motorstyrelsen re-registration flow is
MitID-gated with no static fallback) — 21.059 is a standalone,
unauthenticated, citizen-facing intake form for an entirely different
real-world process (a temporary permit letting a resident privately drive a
foreign-registered vehicle on Danish roads). This is expanding Denmark's
real-world DMV coverage, not re-closing a vertical count that is already
closed.

## Source fetch

- URL: `https://motorst.dk/media/gbplxzah/21059_en_ns_t.pdf`
- HTTP status: 200 (direct fetch from `motorst.dk`; no login/CAPTCHA/WAF gate
  encountered)
- Byte size: 1,222,437 bytes
- File header: `%PDF-1.6`
- SHA-256 of the fetched bytes:
  `3acae2e99c97c234f6326fc2ac83b3dd31a1ce9d01d49aee806d886624a26147`
  (recorded here for future re-verification cycles to diff against)
- Form edition marker printed in the PDF's own footer: `2018.07`; form code
  `21.059 DA EN`, matching the DA/EN bilingual filename itself.

## Independent field extraction

Performed fresh with `pdfjs-dist@3.11.174` (`legacy/build/pdf.js`), not
trusted from this issue's own pre-authoring scouting numbers:

- `pdf.numPages` → 2
- `pdf.getFieldObjects()` → **38** distinct keys (field names)
- Per-page `page.getAnnotations()` → **33** `Widget` annotations on page 1 and
  **15** on page 2, **48 total** — cross-checked against `getFieldObjects()`'s
  38 keys; the gap (48 − 38 = 10) is accounted for entirely by 4 genuine PDF
  radio-button groups (`radioButton: true`, shared `fieldName`, distinct
  `buttonValue` per option, confirmed via `getAnnotations()`):
  - `pg1-9` — 2 options (`Ja/Yes`, `Nej/No`) → `previouslyAppliedForPermit`
  - `pg1-15` — 5 options (`Hus/House`, `Lejlighed/Apartment`,
    `Værelse/Room`, `Ejet/Owned`, `Lejet/Rented`) →
    `typeOfResidenceInDenmark`
  - `pg1-18` — the same 5 options → `natureOfDomicileInHomeCountry`
  - `pg1-20` — 2 options (`Ja/Yes`, `Nej/No`) →
    `domicileMaintainedDuringStayInDenmark`
  - Widget count check: 2+5+5+2 = 14 widgets across 4 fields; 48 − 14 = 34
    single-widget fields; 34 + 4 = 38, matching `getFieldObjects()` exactly.
- Every non-radio widget's own `alternativeText` directly names its section
  and label bilingually (e.g. `"Oplysninger om den, som skal anvende
  køretøjet i Danmark/Information about the user of the vehicle in
  Denmark: Navn/Full name"`), so no separate `getTextContent()` label
  correlation was needed for those. The 4 radio groups' own option widgets
  carry **no** `alternativeText` (empty string on every `Btn` widget), so
  their meaning was recovered by extracting each page's `getTextContent()`
  with y-coordinates and matching each radio group's own printed section
  heading directly above it (e.g. `pg1-9`'s heading, printed at
  y=529.9/520.9, reads "Er der tidligere søgt om tilladelse?/Former
  applications for permit").
- Field type breakdown: 34 `Tx` (text) widgets forming 34 single-widget
  fields, 1 `Sig` (digital-signature) widget, and 4 `Btn` radio groups (14
  widgets) forming 4 `enum` fields — 38 distinct fields total, 37 modelled
  as schema `fields[]` entries (the `Sig` widget is deliberately excluded;
  see below).

Raw field list (internal PDF field name → this schema's field name):

| PDF field name | Page | Type | Schema field |
|---|---|---|---|
| `pg1-1` | 1 | Tx | `fullName` |
| `pg1-2` | 1 | Tx | `nationality` |
| `pg1-3` | 1 | Tx | `personalIdentityNumberOrDateOfBirth` |
| `pg1-4` | 1 | Tx | `dateOfEntryIntoDenmark` |
| `pg1-5` | 1 | Tx | `dateOfDepartureFromDenmark` |
| *(pg1-6 absent — no widget of this name exists on the specimen; form's own numbering simply skips it)* | — | — | — |
| `pg1-7` | 1 | Tx | `occupationOrPurposeOfStay` |
| `pg1-8` | 1 | Tx | `previousResidenceDurationInDenmark` |
| `pg1-9` | 1 | Btn (radio, 2 opt) | `previouslyAppliedForPermit` |
| `pg1-10` | 1 | Tx | `previousApplicationReferenceNumber` |
| `pg1-11` | 1 | Tx | `addressInDenmark` |
| `pg1-12` | 1 | Tx | `postalCodeAndCityInDenmark` |
| `pg1-13` | 1 | Tx | `telephone` |
| `pg1-14` | 1 | Tx | `email` |
| `pg1-15` | 1 | Btn (radio, 5 opt) | `typeOfResidenceInDenmark` |
| `pg1-16` | 1 | Tx | `leaseDurationInDenmark` |
| `pg1-17` | 1 | Tx | `addressInHomeCountry` |
| `pg1-18` | 1 | Btn (radio, 5 opt) | `natureOfDomicileInHomeCountry` |
| `pg1-19` | 1 | Tx | `leaseDurationInHomeCountry` |
| `pg1-20` | 1 | Btn (radio, 2 opt) | `domicileMaintainedDuringStayInDenmark` |
| `pg1-21` | 1 | Tx | `spouseOrCohabitantNameAndAddress` |
| `pg1-22` | 1 | Tx | `childrenNameAndDateOfBirth` |
| `pg1-23` | 1 | Tx | `expectedDaysOffInDenmark` |
| `pg1-24` | 1 | Tx | `expectedDaysOffInHomeCountry` |
| `pg2-1` | 2 | Tx | `vehicleRegistrationNumber` |
| `pg2-2` | 2 | Tx | `vehicleRegistrationCountry` |
| `pg2-3` | 2 | Tx | `vehicleMake` |
| `pg2-4` | 2 | Tx | `vehicleType` |
| `pg2-5` | 2 | Tx | `vehicleIdentificationNumber` |
| `pg2-6` | 2 | Tx | `vehicleOwnerNameAndAddress` |
| `pg2-7` | 2 | Tx | `currentMileage` |
| `pg2-8` | 2 | Tx | `expectedMileageInHomeCountry` |
| `pg2-9` | 2 | Tx | `expectedMileageInDenmark` |
| `pg2-10` | 2 | Tx | `purposeOfUseInHomeCountry` |
| `pg2-11` | 2 | Tx | `purposeOfUseInDenmark` |
| `pg2-12` | 2 | Tx | `frequencyOfUse` |
| `pg2-13` | 2 | Tx | `supplementaryInformation` |
| *(pg2-14, pg2-15 absent — no widgets of these names exist on the specimen)* | — | — | — |
| `pg2-16` | 2 | Tx | `signatureDate` |
| `pg2-17` | 2 | **Sig** | *(not modelled — see below)* |

38 distinct PDF fields → 37 schema `fields[]` entries (1 field, the `Sig`
widget, deliberately excluded), a fully accounted-for mapping with no
unexplained merging, splitting, or exclusion.

## Disclosed judgment calls

1. **`personalIdentityNumberOrDateOfBirth` (`pg1-3`) is a plain `string`,
   not this registry's usual `^[0-9]{10}$` personnummer pattern.** The
   widget's own bilingual label reads "Dansk personnummer eller
   fødselsdato og -år/Danish civil registration number or date and year of
   birth" — the form itself offers an explicit non-personnummer alternative
   for applicants (typically foreign residents, the entire population this
   form targets) who do not yet hold a Danish personnummer. Constraining to
   the 10-digit pattern would reject a legitimate value the source form
   itself invites.
2. **`previousApplicationReferenceNumber` (`pg1-10`) is `requiredWhen
   previouslyAppliedForPermit equals "Ja/Yes"`.** The field's own label
   ("Evt. journalnummer/Reference number, if any") and its physical
   placement directly beside the "Former applications for permit"
   yes/no radio group tie its relevance to a "yes" answer there, not to
   unconditional optionality with no linkage.
3. **The 38th distinct field, `pg2-17` (the form's own genuine `Sig`
   AcroForm field type), is deliberately not modelled as schema data.**
   This is the only widget on the entire form typed `Sig` rather than
   `Tx`/`Btn` — a true interactive digital-signature field, not a text
   box. Consistent with this registry's existing precedent of not
   modelling ink/e-signature acts as schema data
   (`dk/siri/work-permit-application` models only `signatureDate`/
   `signaturePlace`, never the signature act itself; the sourcing note
   in `dk/um/application-for-danish-passport@1.1.0` states signature
   blocks are "not modelled as hand-drawn/image signature fields"). Its
   accompanying date widget, `pg2-16`, is modelled as `signatureDate`.
4. **`typeOfResidenceInDenmark` / `natureOfDomicileInHomeCountry` each
   combine two logically distinct concepts (dwelling type: House/
   Apartment/Room, and tenure: Owned/Rented) into a single 5-option
   `enum`.** This mirrors the widget structure exactly: both are single
   PDF radio groups (one `fieldName` each, mutually exclusive by
   construction), not two independent groups — modelled as the source
   form actually constrains input, not split into what might seem like a
   cleaner two-axis model the form itself does not offer.
5. **`postalCodeAndCityInDenmark` (`pg1-12`) combines postal code and
   city into one field**, matching the single combined widget
   ("Postnummer og by/Postal code and city") rather than this registry's
   more common split-postal-code convention used elsewhere, because this
   specimen genuinely has only one widget here.

## `documents[]`

Three document/attachment requirements, each directly quoting the form's
own printed instructions rather than inferred:

1. **`vehicleRegistrationCertificateCopy`** (`required: true`) — "Kopi af
   køretøjets registreringsattest vedlægges/Enclose copy of the vehicle
   registration certificate", printed on both the page-1 header and again
   near the top of page 2.
2. **`processingFeeReceipt`** (`required: true`) — "(Det koster 400 kr. at
   få behandlet ansøgningen, vedlæg kvittering for indbetaling)/(The price
   for applying for a permit is DKK 400, enclose receipt for payment)",
   the page-1 subtitle.
3. **`employmentOrStudyDocumentation`** (`required: false`, no
   `requiredWhen`) — "Dokumentation for ansættelses-/studieforholdet
   herunder varighed bedes vedlagt/Documentation of nature and duration of
   employment/study must be enclosed", the `pg1-7`
   (`occupationOrPurposeOfStay`) field's own parenthetical. Textually this
   only applies when the applicant's stated purpose of stay is employment
   or study, but `occupationOrPurposeOfStay` is free text, not a
   boolean/enum GovSchema's `requiredWhen` condition grammar can gate on
   precisely — gating on an exact-string match (e.g. `equals:
   "employment"`) would be unreliable rather than a genuine reflection of
   the source form's own conditionality (per this registry's own
   documented `notEquals`-against-free-text pitfall). Modelled as
   unconditionally optional and disclosed here rather than guessed at.

## Conformance verification

A one-off checker script (not committed — ad hoc per this registry's
convention, mirroring prior cycles, e.g. `dk/fstyr` and `dk/skattestyrelsen`)
was written to evaluate every fixture in `conformance/dk/motorstyrelsen/
tilladelse-til-koersel-med-udenlandsk-registreret-koeretoej/1.0.0/` against
this schema's `fields[]` (`required`/`requiredWhen`/`validation.enum`/
`pattern`/`minLength`/`maxLength`/`minimum`) and `documents[]`
(`required`/`requiredWhen`) rules. Results:

| Fixture | Errors | Expected |
|---|---|---|
| `application-packet-foreign-worker-fixed-term.json` | 0 | 0 |
| `application-packet-returning-student.json` | 0 | 0 |
| `mutation-control-missing-static-required.json` | 1 (`fullName` missing) | 1 |
| `mutation-control-requiredwhen-violation.json` | 1 (`previousApplicationReferenceNumber` requiredWhen violated) | 1 |
| `mutation-control-enum-violation.json` | 1 (`typeOfResidenceInDenmark` invalid enum value) | 1 |
| `mutation-control-missing-required-document.json` | 1 (`processingFeeReceipt` document missing) | 1 |

All 6 fixtures produced exactly the expected error count. The two valid
scenarios (a foreign worker on a fixed-term Danish work assignment driving
their own home-country-registered car; a returning exchange student who
previously held this same permit) exercise both branches of the
`previouslyAppliedForPermit`/`previousApplicationReferenceNumber` gating
logic, and each mutation control isolates exactly one rule type (`required`,
`requiredWhen`, `enum`, `documents[].required`) by construction — every
mutation fixture is otherwise a fully valid, complete submission with
exactly one deliberate defect introduced, so no fixture can pass by
accidentally satisfying an unrelated rule. `documents[]` requiredness was
explicitly exercised (not left an untested blind spot, per this registry's
own documented `documents[]`-coverage pitfall).

## Registry validation

- `node tools/validate.mjs` → `ok`, 359/359 documents pass (full registry,
  including this schema)
- `node tools/validate-ajv.mjs` → `ok`, 359/359 validate against the v0.3
  meta-schema (full registry, including this schema)
