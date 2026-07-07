# Verification record — `pl/mi/wniosek-o-rejestracje-pojazdu` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-07`

**Amended same-day** in response to GOV-1681's review-gate findings on PR
#279: added `registeringAuthorityLocality` (see judgment call 3 below,
correcting the original text of that call) and refreshed the conformance
fixture accordingly. Field count: 21 → 22.

This is issue **GOV-1678**, tasked directly with authoring Poland's national
vehicle-registration application — the single remaining cell in the global
DMV vertical (21/22 jurisdictions before this document; 22/22 after).

## Why this candidate

Poland's national vehicle-registration wzór was already known to this
registry: two prior cycles (GOV-1666, which opened Poland as the registry's
22nd jurisdiction via its National ID vertical, and GOV-1671, which closed
Poland's Business Formation gap via CEIDG-1) each screened this same
regulation and set it aside for a different deliverable, explicitly noting
it as "genuine and current, but... only 7 numbered data fields" — a
first-pass read that covered only the six numbered vehicle-identification
lines and the request-type selector, without a full extraction of the
header, the seven footnotes, the plate-election lines, or the closing
declaration. GOV-1678 revisits this exact form for a complete, dedicated
authoring pass rather than a secondary screening note, since it is now the
sole remaining gap in an entire global vertical.

## Sources examined

### Source 1 (primary `source`, the regulation PDF)

- **Authority:** Ministerstwo Infrastruktury (Ministry of Infrastructure)
- **Document:** Rozporządzenie Ministra Infrastruktury z dnia 8 listopada
  2024 r. w sprawie rejestracji i oznaczania pojazdów... (Dz.U. 2024 poz.
  1709), Załącznik nr 1 (Annex 1), the "WZÓR WNIOSKU O REJESTRACJĘ, CZASOWĄ
  REJESTRACJĘ, WYREJESTROWANIE POJAZDU LUB ZAWIADOMIENIA O ZBYCIU POJAZDU."
- **URL:** <https://eli.gov.pl/api/acts/DU/2024/1709/text/O/D20241709.pdf> —
  the official Dziennik Ustaw (Journal of Laws) gazette API, re-fetched
  directly via `curl` this cycle (HTTP 200, no login/CAPTCHA/WAF, 102-page
  `%PDF-1.4`, ~9.99 MB), confirming it is still live and unchanged in shape
  from the prior cycles' own citation of the same Dz.U. 2024 poz. 1709
  instrument.
- **Retrieved / reviewed:** 2026-07-07.
- **Extraction method:** the form (Annex 1, PDF pages 18-19) carries no
  AcroForm layer — it is a static hand-fill/print template, not a fillable
  PDF. Every field, label, and footnote modelled here is read directly from
  a `pdfjs-dist` text-content extraction of those two pages, preserving the
  form's own printed line order and its own numbered footnote key (1-7) on
  the reverse page, rather than a coordinate-matched or rendered read.
- **What it confirms:** the form's own header (submission date/place, owner
  identity and address, the addressee registering authority, a PESEL-or-REGON
  line, and a foreigner-only date-of-birth line); the four-way request-type
  selector expressed as two either/or strike-through choices; six numbered
  vehicle-identification lines plus a disposal-date continuation; a free-text
  attached-documents list; the individual-plate/reduced-plate election lines;
  the previous-registration-number retention election; the form's own closing
  data-accuracy declaration; and all seven footnotes explaining the
  conditional fields above.

### Source 2 (corroborating, the gov.pl citizen-facing service page)

- **URL:** <https://www.gov.pl/web/gov/zarejestruj-pojazd> ("Zarejestruj
  pojazd" — Register a vehicle). Re-fetched this cycle: HTTP 200, no login.
- **What it confirms:** the application is filed with the starosta (county
  administrator) of the applicant's residence, via the wydział komunikacji
  (transport/traffic department) of the local county/city office — a
  nationally-standardized wzór administered locally, the same pattern
  already established elsewhere in this registry (e.g.
  `pl/mswia/wniosek-o-wydanie-dowodu-osobistego`'s gmina-level execution of a
  ministry-set wzór); and the case-dependent breakdown of required attached
  documents this document's `documents[]` array is built from (ownership
  proof, fee-payment proof, existing plates; for imported vehicles: customs
  clearance, excise documentation, homologation/compliance certificates,
  certified translations; for used/previously-registered vehicles: the
  existing dowód rejestracyjny with a valid technical-inspection entry; for
  historic vehicles: heritage-status proof and a technical-inspection
  report; for self-built vehicles: a written ownership declaration and the
  "Świadectwo krajowego indywidualnego dopuszczenia pojazdu").

### Source 3 (corroborating, the Ministry's own service-area page)

- **URL:** <https://www.gov.pl/web/infrastruktura/rejestracja-pojazdow> — the
  Ministerstwo Infrastruktury's own landing page for vehicle-registration
  services, cited as `authority.url`. Re-fetched this cycle: HTTP 200, no
  login.

## Field inventory

All 22 `fields[]` entries and all 13 `documents[]` entries carry their exact
source location inline in `schema.json`'s own `sourceRef`. Summary:

| Section | Fields |
|---|---|
| Header (submission, owner, authority) | `submissionDate`, `submissionPlace`, `ownerName`, `ownerAddress`, `registeringAuthorityName`, `registeringAuthorityLocality`, `ownerPeselOrRegon`, `foreignerDateOfBirth` |
| Request type + vehicle data | `requestType`, `temporaryRegistrationPurpose`, `vehicleTypeAndPurpose`, `vehicleMakeTypeModel`, `yearOfProduction`, `vin`, `previousRegistrationNumber`, `euImportDate`, `previouslyRegisteredVehicleDisposalDate` |
| Plates, retention, declaration | `individualPlateDesignator`, `reducedSizePlatesRequested`, `reducedMountingSpaceDeclared`, `retainPreviousRegistrationNumberRequested`, `dataAccuracyDeclaration` |

`documents[]`: 12 case-dependent `supporting-evidence` entries (ownership
proof, fee-payment proof, existing plates, customs clearance, excise
documentation, homologation certificate, certified translations, existing
registration certificate, heritage-status proof, technical-inspection
report, self-built-vehicle ownership declaration, individual approval
certificate) plus 1 `attestation` entry citing the form's own closing
declaration verbatim.

## Access notes and judgment calls

1. **`requestType` is modelled as a single four-value enum, even though the
   form implements it as two independent either/or strike-through choices**
   (per footnote 4: "cross out whichever does not apply," applied separately
   to "rejestrację / czasową rejestrację" and to "wyrejestrowanie /
   zawiadamiam o zbyciu"). A genuine application has exactly one operative
   request type at a time, so this follows this registry's established
   convention for a shared multi-purpose form (`co/runt/formulario-solicitud-
   tramites-vehiculo`'s `tramiteType`, `es/dgt/solicitud-tramites-vehiculo`'s
   procedure enum, `pl/mswia`'s own `powodUbieganiaSie`) rather than four
   independent booleans plus an `exclusivityGroups` entry.
2. **`ownerPeselOrRegon` and `foreignerDateOfBirth`'s either/or relationship
   (footnote 3: date of birth is filled in only by a foreigner without a
   PESEL) is disclosed in prose only, not as a structural `requiredWhen`
   gate.** Neither field is conditioned on the other via `requiredWhen`
   because there is no boolean "is a foreign national without a PESEL" field
   on the source form to gate on, and this registry's own convention (see
   `notEquals`-on-an-absent-optional-field caution already logged elsewhere)
   is to avoid fabricating a condition the source does not itself express as
   a checkable flag. Both fields are left independently optional.
3. **`registeringAuthorityLocality` (correction from GOV-1681's review
   gate).** v1.0.0 as first authored dismissed a `(miejscowość)` caption near
   the registering-authority line as a probable text-extraction artifact of
   linear reading order, and did not model it. The GOV-1681 review gate's
   independent adversarial pass pulled the same PDF's raw x/y glyph
   coordinates (not linear text order) and showed this does not hold up: the
   right-hand header column carries two distinct dotted-line blanks, each
   with its own independently-positioned caption —
   `y=539.7 "(nazwa organu rejestrującego)"` and, on the row directly below,
   `y=510.1 "(miejscowość)"` — not one wrapped caption. A filled-in
   real-world example of an earlier (2020) version of this same form
   (addressee handwritten as "Starosta Opolski / ul. 1 Maja 29 / 45-068
   Opole" — authority name, then its own locality, like a postal heading)
   corroborates the coordinate read. Re-verified independently again this
   cycle via a fresh `pdfjs-dist` extraction of the same source PDF before
   applying the fix. `registeringAuthorityLocality` is now
   modelled as a required `string` field, paired with
   `registeringAuthorityName`, and distinct from `submissionPlace` (the place
   the application is signed, not the addressee's own locality).
4. **`ownerName`/`ownerAddress` are documented as potentially describing
   either the vehicle's owner directly, or a distinct authorized submitting
   entity acting on the owner's behalf (footnote 1), without a separate pair
   of fields for the two roles.** The source form gives these two roles one
   shared header line each, not two; this document follows the form's own
   shape rather than introducing an unconfirmed second field pair.
5. **`vin` carries no format pattern**, unlike several other DMV schemas in
   this registry (e.g. `co/runt`'s 17-character VIN pattern), because the
   source's own line explicitly permits a VIN *or* a chassis/podwozie/frame
   number under one heading — a real width and character-set spread this
   document does not want to under- or over-constrain without a confirmed
   single format.
6. **Every `documents[]` entry is `required: false`.** The gov.pl page's own
   text states required attachments "vary by case" (new vs. used vs.
   imported vs. historic ventricle vs. self-built vehicle), but this v1.0.0
   does not model a vehicle-category/case-selector field structurally
   distinct from `requestType` (which selects the *procedure*, not the
   *vehicle's own history*). Rather than fabricate a `requiredWhen` gate the
   sources do not themselves state as a checkable field, every `documents[]`
   entry's applicability is disclosed in its own `handling` text instead —
   the same discipline `pl/mswia`'s own judgment call 3 and `es/aeat`'s
   Modelo 036 VERIFICATION.md both apply to an unconfirmed structural rule.
   A future revision could add a `vehicleCategory`-style field and gate these
   `requiredWhen` it, once a source confirms the exact category taxonomy.
7. **`proofOfFeePayment` is modelled as a `supporting-evidence` document, not
   a `payment` category entry.** The GovSchema `documents[]` model's
   `payment` category (with `amount`/`methods`) describes a fee obligation
   itself; this form instead asks the applicant to attach *evidence* that a
   fee has already been paid elsewhere, and no source examined this cycle
   states the fee's amount or accepted payment methods — modelling it as
   `payment` without a confirmed `amount` would either omit a required
   member or fabricate one.
8. **`selfBuiltVehicleOwnershipDeclaration` is modelled as a
   `supporting-evidence` document, not an `attestation`,** even though it is
   a written declaration in substance. `documents[].statement` requires
   verbatim source text (per §9.1 of the spec and this registry's own
   `pl/ceidg` precedent, whose `lawfulActivityAttestation` cites CEIDG-1's
   own exact Polish sentence); this cycle's only source for this specific
   declaration is the gov.pl page's English paraphrase ("written ownership
   declaration"), not the declaration's own verbatim Polish wording, so this
   document avoids inventing Polish attestation text that was never actually
   read from a source.
9. **`dataAccuracyDeclaration` (a boolean field) is paired with a dedicated
   `dataAccuracyAttestation` documents[] entry carrying the closing
   declaration's own verbatim Polish text**, mirroring `pl/ceidg`'s own
   `lawfulActivityDeclaration`/`lawfulActivityAttestation` pairing for its
   analogous closing-declaration sentence — the only place in this document
   where a `statement` value is used, since it is the only declaration this
   cycle's own source extraction captured verbatim.
10. **The physical owner-signature line is out of scope as a data field**,
    per this registry's established convention for signature blocks (e.g.
    `co/runt`, `es/aeat` Modelo 036, `pl/mswia`).
11. **`euImportDate` is left optional with no `requiredWhen` gate**, even
    though footnote 5 states it applies only to a first-time Polish
    registration of a vehicle imported from an EU member state after
    2019-12-31 — there is no boolean "vehicle previously registered abroad"
    field on the source form to gate this on structurally, so the condition
    is disclosed in the field's own `description` only, consistent with
    judgment call 2 above.

## Test run

No live submission was attempted: submitting fabricated applicant and
vehicle data against Poland's live national vehicle-registration system is
not a safe or reversible action, and the source form itself is a
static/print template with no online submission endpoint identified this
cycle.

Instead, one fully hand-constructed mock record was built from this
document's own field inventory and manually checked against every field's
`required`/`requiredWhen`/`validation` rule; it is committed as this
document's conformance fixture
(`conformance/pl/mi/wniosek-o-rejestracje-pojazdu/1.0.0/application-packet.json`).

**Scenario (committed fixture) — a used-vehicle re-registration**: an owner
who has just bought a previously-registered car applies for a new
registration in their own name, keeping the vehicle's existing plates, with
no vanity/reduced-size plate request. `submissionDate: "2026-07-07"`,
`submissionPlace: "Kraków"`, `ownerName: "Marek Kowalski"`, `ownerAddress:
"ul. Długa 12/3, 31-147 Kraków"`, `registeringAuthorityName: "Starosta
Krakowski — Wydział Komunikacji"`, `registeringAuthorityLocality: "Kraków"`
(satisfying its own `required: true`), `ownerPeselOrRegon: "78051234567"` (an
11-digit PESEL), `requestType: "registration"` (a valid enum member;
`temporaryRegistrationPurpose` and `previouslyRegisteredVehicleDisposalDate`
both correctly omitted since they are only `requiredWhen` a different
`requestType`), `vehicleTypeAndPurpose: "Samochód osobowy"`,
`vehicleMakeTypeModel: "Volkswagen Golf VII"`, `yearOfProduction: 2018`
(within the `1900`-`2100` `validation.minimum`/`maximum`), `vin:
"WVWZZZ1KZ8W123456"`, `previousRegistrationNumber: "KR 12345"`,
`retainPreviousRegistrationNumberRequested: true`,
`dataAccuracyDeclaration: true` (satisfying its own `required: true`). The
optional plate-election fields (`individualPlateDesignator`,
`reducedSizePlatesRequested`, `reducedMountingSpaceDeclared`) and the
optional `euImportDate`/`foreignerDateOfBirth` fields are correctly omitted
as not applicable to this scenario. `documents`: `proofOfOwnership` and
`existingRegistrationCertificate` supplied as filenames, matching a
used-vehicle re-registration's actual document need per Source 2.

**Negative controls** (each traced by hand against `schema.json`, not
committed as separate fixture files): (a) omitting `dataAccuracyDeclaration`
entirely — violates the field's own `required: true`; (b) `requestType:
"temporary_registration"` with `temporaryRegistrationPurpose` omitted —
violates that field's `requiredWhen`; (c) `requestType:
"disposal_notification"` with `previouslyRegisteredVehicleDisposalDate`
omitted — violates that field's `requiredWhen`; (d)
`reducedSizePlatesRequested: true` with `reducedMountingSpaceDeclared`
omitted — violates that field's `requiredWhen`; (e) `yearOfProduction: 1850`
— violates `validation.minimum`; (f) `requestType: "renewal"` — not a member
of the field's own `validation.enum` (only the four literal values listed
are accepted). All six negative controls were correctly identified as rule
violations by manual rule-tracing against `schema.json`.

Both meta-schema validators were run against the finished document and pass
clean:

```
$ node tools/validate.mjs registry/pl/mi/wniosek-o-rejestracje-pojazdu/1.0.0/schema.json
ok   registry/pl/mi/wniosek-o-rejestracje-pojazdu/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/pl/mi/wniosek-o-rejestracje-pojazdu/1.0.0/schema.json
ok   registry/pl/mi/wniosek-o-rejestracje-pojazdu/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).
```
