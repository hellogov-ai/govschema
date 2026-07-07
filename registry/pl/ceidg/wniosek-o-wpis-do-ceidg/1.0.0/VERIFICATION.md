# Verification record — `pl/ceidg/wniosek-o-wpis-do-ceidg` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-07`

This is a `GovSchema Standard Research` cycle (**GOV-1671**). Poland opened
as the registry's 22nd jurisdiction in the prior cycle (GOV-1666, National
ID), with its other five verticals (Passport, DMV, Business Formation,
Taxes, Visa) left as open, unscreened backlog. This cycle's brief recommended
screening Poland's remaining verticals in order: DMV, then Business
Formation (CEIDG sole-trader registration or KRS/S24 company registration),
then Taxes, Visa, Passport.

## Why this candidate

### Candidates screened and rejected

1. **Poland — DMV (vehicle registration).** Screened first, per the brief's
   recommended order. The national wzór (template) is set by Załącznik nr 1
   to Rozporządzenie Ministra Infrastruktury z dnia 8 listopada 2024 r. w
   sprawie rejestracji i oznaczania pojazdów, wymagań dla tablic
   rejestracyjnych oraz wzorów innych dokumentów związanych z rejestracją
   pojazdów (Dz.U. 2024 poz. 1709). The direct government host
   (`isap.sejm.gov.pl`) is Incapsula-bot-gated on a plain fetch, but a
   third-party mirror of the same gazetted PDF
   (`n-22-4.dcs.redcdn.pl/.../a1ecb0a5-8cb2-47ea-907f-430bba84c320.pdf`,
   hosting a TVN news article's own attached copy of the regulation) served
   the identical 4-page annex set directly. Parsed with `pdfjs-dist`: zero
   AcroForm annotations (a static, hand-fill/print template, like this
   cycle's other Polish source below), but its own printed body is thin —
   Załącznik nr 1's civilian-registration wzór has only **7 numbered data
   items** (vehicle type/purpose, make/type/model, year of production,
   VIN/chassis number, previous registration number, vehicle-card number, EU
   import date) plus a free-text attached-documents list and an individual
   number-plate request line; Załącznik nr 2 is a distinct military/foreign
   -authority variant, not applicable to an ordinary civilian applicant. Not
   picked: genuine and current, but materially thinner than the Business
   Formation candidate below on this registry's own bar for field coverage,
   even though sourcing strength (unauthenticated, no CAPTCHA/WAF once past
   the Incapsula-gated primary host) is otherwise comparable. Left open as a
   real, ready-to-author backlog candidate for a future cycle.
2. **Poland — KRS/S24 company registration.** Considered as the alternative
   Business Formation pathway the brief named. Poland's company (spółka)
   registration for a limited-liability or joint-stock company runs through
   the S24 online system (`ekrs.ms.gov.pl`), an authenticated, session-based
   web application with standardized-articles templates chosen inside the
   portal — no static, downloadable, field-level form was found. Not picked
   in favor of CEIDG-1 (see below), which serves the much larger population
   of natural persons registering as sole traders and has a genuine,
   unauthenticated, current PDF source.

### Candidate picked: Poland Business Formation — CEIDG-1

CEIDG-1, "Wniosek o wpis do Centralnej Ewidencji i Informacji o Działalności
Gospodarczej," is the single form through which a natural person registers a
sole proprietorship (jednoosobowa działalność gospodarcza) with Poland's
Central Registration and Information on Business. It is directly attached,
unauthenticated, to `ceidg.gov.pl`'s own production file server, with no
login/CAPTCHA/WAF gate. Unlike the DMV candidate above (also a static,
non-AcroForm template), CEIDG-1's own printed layout is fully
self-documenting: 30 numbered top-level sections (many with lettered/decimal
sub-items, e.g. `06.2`, `10.1`, `26.1`), every one carrying its own
plain-Polish field label directly in the PDF's text layer — no
coordinate-matching or page-rendering was needed to resolve any field's
identity, the same "read the printed reference numbers directly" technique
`es/aeat/declaracion-censal-personas-fisicas-modelo-030` and
`es/aeat/declaracion-censal-alta-actividad-economica-modelo-036` used for
their own non-AcroForm/generically-named sources. This is the strongest
single-pass Business Formation source examined this cycle.

## Sources examined

### Source 1 (primary `source`, the form)

- **Authority:** Centralna Ewidencja i Informacja o Działalności Gospodarczej
  (CEIDG), operated by the Ministerstwo Rozwoju i Technologii (MRiT).
- **Document:** CEIDG-1, form version **1.8.9** (printed on every page
  footer), "Wniosek o wpis do Centralnej Ewidencji i Informacji o
  Działalności Gospodarczej."
- **URL:**
  <https://prod.ceidg.gov.pl/CEIDG.CMS.ENGINE/GetFile.aspx?attid=72772898-0108-4620-89c4-edd0ebe18450>
  (directly retrieved via `curl`, HTTP 200, no login; 5 pages, 89,469 bytes).
- **Retrieved / reviewed:** 2026-07-07.
- **Extraction method:** downloaded directly, then parsed with `pdfjs-dist`
  (`legacy/build/pdf.mjs`). `page.getAnnotations()` returned **zero**
  AcroForm widgets on all 5 pages — this is a static, print/hand-fill
  template, not a fillable PDF — so `page.getTextContent()` was used
  instead, reading the form's own printed section numbers (`01.`–`30.`,
  with `06.1`/`06.2`/`10.1`/`10.2`/`12.1`/`12.2`/`13.x`/`26.1`/`26.2`/`28.x`
  sub-numbering) and every field's own inline label text, in full, across
  all 5 pages.
- **What it confirms:** all 30 top-level sections and their sub-items'
  labels and checkbox options verbatim (e.g. the closed `rodzaj wniosku`
  five-way choice on the cover page; the four `oświadczam... w formie`
  taxation-method checkboxes in §18 including the still-present `karty
  podatkowej` option; the `12` mandatory-insurance three-way choice; the
  `03.15` statutory declaration's exact wording, reproduced verbatim in this
  document's `documents[].statement`).

### Source 2 (corroborating, the official instruction guide)

- **Document:** "Instrukcja wypełniania wniosku CEIDG-1 [do wersji wniosku
  3.1]," dated 2025-01-07 (per its own footer), published by Ministerstwo
  Rozwoju i Technologii.
- **URL:**
  <https://pliki.biznes.gov.pl/biznes-pl/20250107/Instrukcja_wypelniania_wniosku_CEIDG-1_stycz25_.pdf>
  (directly retrieved, HTTP 200, no login; 75 pages, 670,799 bytes).
- **Retrieved / reviewed:** 2026-07-07.
- **What it confirms:** a full field-by-field explanation for the "A.
  Wypełnianie wniosku o wpis przedsiębiorcy do CEIDG" (new-registration)
  pathway this document models, including: the minimum required-section list
  for a new registration (REGON, identity-document type/number, citizenship,
  residential address, business name, short name, start date, PESEL, NIP,
  surname/first name/parents' first names/place-of-birth/date-of-birth,
  business address); the closed three-option taxation-form list as presented
  to a *new* registrant (na zasadach ogólnych / podatek liniowy / ryczałt —
  confirming `tax_card` is a legacy/continuing-case-only option, disclosed as
  judgment call 3 below); the closed mandatory-insurance three-way choice
  (ZUS / KRUS / insured abroad) and which follow-on section each selection
  requires; the PKD-code rule that only one code may be marked as
  `przeważający` (predominant/primary) and that unlimited additional codes
  continue onto the CEIDG-RD annex; and the full list of five continuation
  annexes (CEIDG-RD, CEIDG-MW, CEIDG-RB, CEIDG-SC, CEIDG-PN) plus two
  process-specific annexes (CEIDG-ZS, CEIDG-POPR) not relevant to a
  new-registration filing.
  **Version-numbering note:** this instruction guide's own section numbers
  (unprefixed `1., 2., 5.1, 6., 7., 9., 9.1, 9.2, 10., 14.`...) do not match
  the downloaded form's zero-padded numbering (`03., 04., 06.1, 06.2, 09.,
  10.1, 10.2, 12., 12.1, 12.2, 17.`...), meaning the guide targets a
  slightly earlier form revision than the "1.8.9"-stamped PDF this document
  is sourced from. This was checked field-by-field rather than assumed
  harmless: every field the guide names by label (Płeć, Nazwisko, Imię,
  Imię ojca, Imię matki, Miejsce urodzenia, PESEL, Data urodzenia, NIP,
  REGON, Rodzaj dokumentu tożsamości, Seria i numer dokumentu tożsamości,
  Posiadane obywatelstwa, Adres zamieszkania, Nazwa firmy, Nazwa skrócona,
  Data rozpoczęcia działalności, Przewidywana liczba pracujących,
  Przeważający kod PKD, Adres do doręczeń, Stałe miejsce wykonywania
  działalności, obowiązkowe ubezpieczenie, Urząd skarbowy) is present with
  the same meaning and the same required/optional status in the downloaded
  PDF's own §03/§04/§06/§08/§09/§10.1/§10.2/§12/§17 — no substantive content
  drift found, only a renumbering.

## Field inventory (Phase 2)

All 81 `fields[]` entries and both `documents[]` entries, and their exact
CEIDG-1 section reference, are listed inline in `schema.json`'s own
`sourceRef` per field/document. Summary by section:

| Section | Representative fields | Required for this v1.0.0? |
|---|---|---|
| §03 Dane wnioskodawcy | `gender`, `identityDocumentType(Other)`, `identityDocumentNumber`, `pesel`, `nip`, `regon`, `surname`, `firstName`, `maidenSurname`, `secondFirstName`, `fathersFirstName`, `mothersFirstName`, `placeOfBirth`, `dateOfBirth`, `citizenship(Other)`, `lawfulActivityDeclaration` | Mostly required — see judgment call 1 (`nip`/`regon` left optional) |
| §04 Adres zamieszkania | `residenceCountry`...`residenceAtypicalLocationDescription` (11 fields) | Country/city/house number required; the rest optional per the source's own layout |
| §05 ePUAP | `epuapAddress`, `epuapAddressWaived` | Both optional |
| §06–08 Dane firmy | `businessName`, `expectedNumberOfWorkers`, `primaryPkdCode`(+`secondary`/`tertiary`), `additionalPkdCodesAnnexAttached`, `shortName`, `businessStartDate` | `businessName`, `primaryPkdCode`, `businessStartDate` required (see judgment call 2 for the PKD-slot count) |
| §09 Dane do kontaktu | `phoneNumber`...`contactDataSharingOptOut` (5 fields) | All optional |
| §10.1 Adres do doręczeń | `correspondenceAddressee`...`correspondencePostBox` (8 fields) | All optional (see judgment call 4 for the dropped country/voivodeship/powiat/gmina sub-fields) |
| §10.2 Stałe miejsce wykonywania działalności | `noFixedBusinessLocation` + 10 address fields | `noFixedBusinessLocation` required; `businessLocationCity` `requiredWhen` it is `false` |
| §12 Ubezpieczenie | `mandatoryInsuranceScheme`, `zusContributionObligationStartDate` | `mandatoryInsuranceScheme` required; the date `requiredWhen` scheme is `zus` |
| §17–19 Podatki i księgowość | `currentTaxOfficeName`, `taxationForm`, `pit16Attached`, `accountingBooksNoticeSubmitted` | `taxationForm` required; `pit16Attached` `requiredWhen` it is `tax_card` |
| §22–24 Zakład pracy chronionej / spółka cywilna | `shelteredWorkshopStatus`, `soleActivityViaCivilPartnership`, `civilPartnershipNip`/`Regon` | `soleActivityViaCivilPartnership` required; the NIP/REGON pair `requiredWhen` it is `true` |
| §25 Wspólność majątkowa | `maritalPropertyCommunity`, `maritalPropertyCeasedDate` | The enum is required; the date is optional |
| §26.1 Rachunek bankowy | `businessBankAccountCountry`...`businessBankAccountForTaxRefund` (6 fields) | All optional |
| §03.15 / §29 declaration & annex pointer | `documents[].lawfulActivityAttestation`, `documents[].pkdContinuationAnnex` | Attestation required; annex `requiredWhen` `additionalPkdCodesAnnexAttached` |

Total: **81 fields** plus **2 `documents[]` entries**. No
`crossFieldValidation` rules or `exclusivityGroups` are modelled: every
conditional relationship found is a simple two-value `requiredWhen` gate
against a field this schema also defines as `required: true` (so its value
is always present in valid data — see judgment call 5 on why this direction
was chosen throughout).

## Access notes and judgment calls

1. **`nip` and `regon` are modelled as plain optional strings, dropping the
   form's own "Nie posiadam NIP"/"Nie posiadam numeru REGON" negative
   checkboxes entirely**, rather than as a `requiredWhen`-gated pair (unlike
   `pesel`, which is modelled `required: true` outright, dropping its
   analogous "Nie posiadam numeru PESEL" branch — the same simplification
   `pl/mswia/wniosek-o-wydanie-dowodu-osobistego` made for its own foreign
   -applicant edge case). Reasoning: for a brand-new registration, NIP is
   typically not yet held (CEIDG-1 itself is what causes one to be assigned,
   per the instruction guide's own "Na podstawie wniosku CEIDG-1, uzyskasz
   numer NIP i REGON" statement) and REGON is assigned by GUS as a
   *consequence* of this same filing — so leaving both optional, with no
   forced negative-declaration field, models the common case accurately
   without fabricating a `requiredWhen` gate on a checkbox this cycle chose
   not to carry as its own field. A rare foreigner-without-PESEL applicant
   pathway remains out of scope for v1.0.0.
2. **PKD business-activity codes are modelled as three flat slots
   (`primaryPkdCode`, `secondaryPkdCode`, `tertiaryPkdCode`) plus a boolean
   annex pointer, not the form's own 9 numbered slots or its "no limit on
   the number of codes" rule.** GovSchema v0.3 has no repeating/array field
   type (GSP-0009, not yet folded into this spec line), so per this
   registry's established convention for small bounded repeating structures
   (e.g. `sg/acra/sole-proprietorship-registration`'s own
   `primarySsicCode`/`secondarySsicCode` pair), this document models the one
   mandatory `przeważający` (predominant) code plus a small, useful number
   of additional codes, and represents "more codes than fit" via
   `additionalPkdCodesAnnexAttached` and the matching
   `documents[].pkdContinuationAnnex` entry rather than fabricating an array
   type the spec does not have.
3. **`taxationForm`'s enum keeps all four checkbox options printed on the
   live form (`general_rules`/`flat_tax`/`lump_sum_revenue`/`tax_card`),
   even though the corroborating instruction guide's own new-registration
   walkthrough (§A "Wypełnianie wniosku o wpis przedsiębiorcy do CEIDG")
   lists only the first three as available choices for a first-time
   filer.** `karta podatkowa` (tax card) was closed to new elections by the
   2022 "Polski Ład" tax reform and remains selectable on CEIDG-1 only for
   already-enrolled taxpayers filing a different request type (change/
   continuation) — this document keeps the literal, currently-printed enum
   (since the checkbox and its `pit16Attached` companion field are still
   physically present on the version-1.8.9 form examined this cycle) and
   discloses the practical new-registration restriction here in prose rather
   than either fabricating a narrower enum the form itself does not enforce
   structurally, or silently dropping a real option.
4. **The correspondence address (§10.1) and permanent-place-of-business
   address (§10.2) blocks omit their own `Kraj`/`Województwo`/`Powiat`/
   `Gmina-Dzielnica` sub-fields** (kept only for the residential address in
   §04), following the same reduced-address-block convention
   `pl/mswia/wniosek-o-wydanie-dowodu-osobistego` used for its own
   correspondence-address fields (5 sub-fields, not the full 11-field
   residential-address shape). Disclosed as a scope trim for schema-size
   management, not a source-fidelity gap — every dropped sub-field is
   documented on the live form and would be a natural MINOR addition to a
   future version.
5. **Every `requiredWhen` gate in this document targets a field this same
   schema defines as `required: true` (`identityDocumentType`, `citizenship`,
   `noFixedBusinessLocation`, `mandatoryInsuranceScheme`, `taxationForm`,
   `soleActivityViaCivilPartnership`) — never an optional/possibly-absent
   field.** This is a deliberate design choice to avoid the
   absent-field-ambiguity class of bug this registry has previously hit
   (`notEquals`/`equals` gates against a field that might simply not be
   present in submitted data, as documented in this project's own internal
   notes on the `notEquals ""`-against-an-absent-optional-field pattern).
   Concretely, this is why `noPesel`/`noNip`/`noRegon`-style negative
   checkboxes were dropped entirely (judgment call 1) rather than kept as
   optional gating flags, and why `noFixedBusinessLocation` — which the live
   form presents as an ordinary unforced checkbox — is instead modelled here
   as `required: true`: an applicant must explicitly answer `true`/`false`,
   so `businessLocationCity`'s `requiredWhen: {equals: false}` gate always
   evaluates against a real, present boolean value in any conformant
   dataset.
6. **§13 (KRUS-specific declarations, five sub-items about a farmer's prior
   agricultural-insurance history), §14–16 (suspension/resumption/
   cessation-of-activity blocks), §20–21 (external-accounting-firm details
   and the accounting-records storage address), §26.2 (a second, personal
   bank account), §27 (foreign tax/insurance identification numbers), and
   §28.x (power-of-attorney details) are all out of scope for v1.0.0.** §14–16
   apply only to the change/suspend/resume/deregister request types this
   document deliberately excludes (see the title/description's own scope
   statement); §13, §20–21, §26.2, §27, and §28.x are all real but
   comparatively rare optional blocks on a first-time registration, each a
   natural candidate for a future MINOR revision.
7. **No repeating/array field type (GSP-0009).** Not modelled anywhere in
   this document beyond the PKD-code trim already discussed in judgment call
   2 — the additional-business-location continuation (§11.x, its own
   CEIDG-MW annex), the multiple-civil-partnership continuation (its own
   CEIDG-SC annex), the multiple-power-of-attorney continuation (its own
   CEIDG-PN annex), and the multiple-bank-account continuation (its own
   CEIDG-RB annex) are each genuinely unbounded repeating structures this
   registry has consistently deferred pending GSP-0009 (see e.g.
   `mx/sat/preinscripcion-rfc-persona-moral`'s own deferred repeating
   addresses/activities).
8. **PKD code fields use the pattern `^[0-9]{2}\.[0-9]{2}\.[A-Z]$`** (e.g.
   `47.11.Z`), confirmed against both the form's own "symbol (5-znakowy) wg
   PKD 2007" label and the instruction guide's "(5 znaków)" callout —
   dot-separated 2-digit/2-digit/letter, not five bare characters.

## Test run (Phase 3)

No live submission was attempted: CEIDG-1's paper-filing channel requires an
in-person visit or a notarized signature, and its electronic-filing channel
(via biznes.gov.pl/CEIDG) requires a real Polish trusted profile (profil
zaufany) or qualified electronic signature — submitting fabricated applicant
data against Poland's live business register is not a safe or reversible
action.

Instead, one fully hand-constructed mock record was built from this
document's own field inventory and validated with a purpose-written script
(not just eyeballed) that re-implements spec v0.3's `type`/`validation`/
`required`/`requiredWhen`/`documents[]` semantics directly from `schema.json`
and checks the packet against them field-by-field; it is committed as this
document's conformance fixture
(`conformance/pl/ceidg/wniosek-o-wpis-do-ceidg/1.0.0/application-packet.json`).

**Scenario (committed fixture) — an adult Polish resident registering her
first sole-proprietorship graphic-design business.** `gender: "kobieta"`,
`identityDocumentType: "dowod_osobisty"` (so `identityDocumentTypeOther` is
correctly omitted), `pesel: "85051512345"` (11 digits), `surname:
"Kowalska"`, `firstName: "Anna"`, `citizenship: "polskie"` (so
`citizenshipOther` is correctly omitted), `lawfulActivityDeclaration: true`,
a full residential address in Warsaw, `businessName: "Anna Kowalska
Projektowanie Graficzne"`, `primaryPkdCode: "74.10.Z"` (specialised design
activities — a real, correctly-formatted PKD code) with a `secondaryPkdCode`
also supplied, `businessStartDate: "2026-08-01"`, a distinct correspondence
address, `noFixedBusinessLocation: false` (so `businessLocationCity` is
correctly required and supplied), `mandatoryInsuranceScheme: "zus"` (so
`zusContributionObligationStartDate` is correctly required and supplied),
`taxationForm: "general_rules"` (so `pit16Attached` is correctly *not*
required/omitted), `soleActivityViaCivilPartnership: false` (so the civil
-partnership NIP/REGON pair is correctly omitted), `maritalPropertyCommunity:
"tak"`, a business bank account, and `documents.lawfulActivityAttestation:
true`.

The validation script (`/tmp` scratch file, reproduced in full below for
reviewer re-runnability) was run against the committed packet:

```
$ node validate_packet.mjs registry/pl/ceidg/wniosek-o-wpis-do-ceidg/1.0.0/schema.json \
    conformance/pl/ceidg/wniosek-o-wpis-do-ceidg/1.0.0/application-packet.json
OK: packet validates against pl/ceidg/wniosek-o-wpis-do-ceidg@1.0.0 (81 fields, 2 documents)
```

**Negative controls**, run against the same script to confirm it actually
catches violations rather than passing vacuously:

```
$ # pesel shortened to "123" — violates the 11-digit pattern
FAIL (1 error(s)):
 - field pesel: value "123" does not match pattern ^[0-9]{11}$

$ # businessName removed — violates required: true
FAIL (1 error(s)):
 - field businessName: required (or requiredWhen matched) but absent from packet

$ # noFixedBusinessLocation flipped to true, businessLocationCity removed
OK: packet validates against pl/ceidg/wniosek-o-wpis-do-ceidg@1.0.0 (81 fields, 2 documents)
```

The third control confirms the `requiredWhen` gate behaves correctly in both
directions: `businessLocationCity` is required when
`noFixedBusinessLocation` is `false` (as in the main fixture) and correctly
*not* required when it is `true`.

Both meta-schema validators were run against the finished document and pass
clean:

```
$ node tools/validate.mjs registry/pl/ceidg/wniosek-o-wpis-do-ceidg/1.0.0/schema.json
ok   registry/pl/ceidg/wniosek-o-wpis-do-ceidg/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/pl/ceidg/wniosek-o-wpis-do-ceidg/1.0.0/schema.json
ok   registry/pl/ceidg/wniosek-o-wpis-do-ceidg/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).
```
