# Verification record — `ee/emta/income-tax-return-form-a` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-08`

This is a `GovSchema Standard Research` cycle (**GOV-1721**, child of
GOV-1719). At the start of this cycle, Estonia stood at 3/6 verticals
(National ID, Business Formation, Passport — via `ee/ppa/e-residency-
application` GOV-1698, `ee/rik/private-limited-company-foundation` GOV-1705,
and `ee/ppa/passport-application` GOV-1712). This document closes the Taxes
gap, bringing Estonia to 4/6.

## Why this candidate

The issue directly named the target: Vorm A, "Residendist füüsilise isiku
tuludeklaratsioon" (Income Tax Return of a Resident Natural Person), the
annual return the Estonian Tax and Customs Board (Maksu- ja Tolliamet, EMTA)
publishes for individual filers — a genuine, current, unauthenticated,
directly downloadable PDF, no candidate-screening or dead-end search was
required this cycle.

## Sources examined

### Source 1 (primary `source`, the form)

- **Authority:** Maksu- ja Tolliamet (EMTA); the form itself is established by
  a Minister of Finance regulation (see Source 2).
- **Document:** Vorm A / Form A, tax year 2025 edition, filename
  `vorm_a_2025_ee_en.pdf`.
- **URL:**
  <https://www.emta.ee/sites/default/files/documents/2026-02/vorm_a_2025_ee_en.pdf>
  — direct `curl`, HTTP 200, no login/CAPTCHA/WAF, genuine PDF, 12 pages,
  354,710 bytes.
- **Retrieved / reviewed:** 2026-07-08.
- **Extraction method:** downloaded directly, then parsed with `pdfjs-dist`
  v3 (`legacy/build/pdf.js`). `page.getAnnotations()` returned **zero** Widget
  annotations across all 12 pages, and a raw inflate-and-regex scan of the
  PDF's own object streams found no `/T` (field name) or `/FT` (field type)
  entries anywhere in the file — confirming this is a static print/hand-fill
  template with no AcroForm layer, the same shape as `pl/mf/zeznanie-pit-37`.
  `page.getTextContent()` was used instead, reading the form's own printed
  bilingual (Estonian/English) section numbers (1-14, with sub-items) and
  every field's inline label, in full, across all 12 pages.
- **What it confirms:** every field this document models, verbatim, in both
  Estonian and English; the exact bilingual closing declaration text used in
  `documents[].signatureDeclaration`; and the section/line numbering used in
  every `sourceRef`.

### Source 2 (governing regulation, cross-referenced)

- **Document:** "Residendist füüsilise isiku tulu deklareerimine" (Declaration
  of income of a resident natural person), a regulation (määrus) of the
  Rahandusminister (Minister of Finance), adopted 14.06.2011 nr 30 (RT I,
  16.06.2011, 13), consolidated text in force from 16.02.2025 (RT I,
  13.02.2025, 7).
- **URL:** <https://www.riigiteataja.ee/akt/113022025007>
- **What it confirms:** the regulation is issued under Tulumaksuseadus
  (Income Tax Act) §22(6), §23(4), §37(7), and §44(7), and Sotsiaalmaksuseadus
  (Social Tax Act) §9(7); its §1 point 1 establishes "vorm A 'Residendist
  füüsilise isiku tuludeklaratsioon'" as Lisa 1 (Annex 1) to the regulation —
  the exact statutory basis cited in `authority.operatedBy.basis`. It also
  confirms the annual filing deadline (30 April of the year following the tax
  period, with e-filing opening 15 February), used in the schema-level
  `description`.
- **Access notes:** `riigiteataja.ee` is a fully client-rendered Angular SPA
  that returns an identical empty "Laeb..." ("Loading...") shell to an
  unauthenticated direct fetch — the same behavior this registry has already
  documented for this host (`ee/rik/private-limited-company-foundation`,
  GOV-1705; `ee/ppa/passport-application`, GOV-1712). Confirmed directly this
  cycle: a `WebFetch` against the live URL returned only the loading shell.
  Worked around via the Wayback Machine: `http://archive.org/wayback/
  available?url=riigiteataja.ee/akt/113022025007` resolved a snapshot at
  `20251101082639`, and that snapshot's HTML (fetched directly with `curl`,
  32,388 bytes, HTTP 200) contains the regulation's full consolidated text
  server-rendered into the page (Wayback's own capture ran with JavaScript
  enabled at crawl time, unlike a live unauthenticated fetch against
  riigiteataja.ee itself).

## Field inventory (Phase 2)

All 22 `fields[]` entries and the one `documents[]` entry, and their exact
Vorm A 2025 section/line reference, are listed inline in `schema.json`'s own
`sourceRef` per field/document. Summary by section:

| Section | Representative fields | Modelled scope |
|---|---|---|
| §1/§1.1 Üldandmed (General data) | `firstName`, `surname`, `personalIdCode` | Full for a resident taxpayer filing under §1.1; §2 (EEA-resident cross-border data) out of scope |
| §3 Aadress (Address) | `addressOfResidence` | Full — the form itself prints one address field, not a structured breakdown |
| §4 Kontaktandmed (Contact details) | `telephone`, `mobilePhone`, `contactEmail` | Full |
| §5.1 Part I (domestic wages, tax withheld) | `wagePayerName`, `wagePayerRegistryOrPersonalIdCode`, `wageIncomeType`, `wageIncomeAmount`, `wageWithheldIncomeTax` | Only this row's own column set; §5.1 Part II (wages with no tax withheld) and §5.2-§5.5 out of scope |
| §9.4 Kingitused ja annetused (Gifts and donations) | `giftRecipientName`, `giftRecipientRegistryOrPersonalIdCode`, `giftOrDonationAmount` | Full |
| §9.6 Koolituskulud (Training expenses) | `traineePersonalIdCode`, `traineeFullName`, `trainingInstitutionNameOrRegistryCode`, `trainingInstitutionCountry`, `trainingExpensesPaidAmount` | Full |
| §11 Enammakse tagastamine (Refund to Estonian account) | `refundAccountNumber`, `refundAccountOwnerFullName`, `refundAccountOwnerPersonalIdCode` | Full; §12 (foreign bank account) out of scope |
| §14/§14.1 Kinnitused (Confirmations) | `documents[].signatureDeclaration` | Modelled as an attestation, not a field; §14.2 (representative-filed variant) out of scope |

Total: **22 fields** plus **1 `documents[]` entry** (a required attestation).
No `crossFieldValidation` rules, `exclusivityGroups`, or `steps` are modelled
(the form's own numbered sections are already a faithful, self-documenting
ordering, consistent with `pl/mf/zeznanie-pit-37`'s own choice not to model
`steps` for a single-page-flow tax return).

## Scope exclusions (explicit, per the assigning issue)

The following sections are genuinely present on the live 12-page form but are
**out of scope for v1.0.0**, matching the brief's explicit instruction to
model only the common case of a resident wage-earner filing alone:

1. **§2 (EEA cross-border-resident provisions, §2.1-§2.4).** Applies only to
   a resident of another EEA contracting state who wishes to use deductions
   in Estonia without an Estonian personal ID code — a materially different
   filer profile than this v1.0.0's scope.
2. **§5.2-§5.5 (pension/PEPP income, unit-linked life insurance payouts,
   rental/royalty income, and partnership/pool-of-assets income).** Each is
   its own multi-column sub-table with its own withholding/carry-forward
   mechanics, not part of the "domestic wages already taxed at source"
   common case this v1.0.0 targets.
3. **§6 (Kasu vara võõrandamisest / Gains from the transfer of property,
   §6.1-§6.6).** The form's single largest and most arithmetic-heavy section
   — financial-asset transfers, forest cutting rights, other property,
   holding reductions/liquidation proceeds, investment accounts, and
   company-merger income, most of it EMTA-calculated ("Arvutab Maksu- ja
   Tolliamet") off multi-year carry-forward chains. Explicitly excluded by
   the brief; not attempted even partially.
4. **§7 (Tulud, mida arvestatakse ainult maksuvaba tulu arvutamisel /
   Income counted only for the basic-exemption calculation, §7.1-§7.3).**
   Feeds only EMTA's own basic-exemption computation, not a standalone
   declared amount the taxpayer reports for its own sake.
5. **§8 (Välisriigis saadud tulu / Income derived in a foreign state,
   §8.1-§8.9).** All foreign-country income and the related EEA-resident
   taxable-income declaration — out of scope by the same domestic-only
   common-case boundary as §2.
6. **§9.1-§9.3 (unemployment insurance/mandatory funded pension
   contributions, supplementary funded pension/PEPP contributions, foreign
   social security taxes and contributions).** Chiefly payer-reported or
   pre-filled figures (withheld by an employer or paid to a foreign scheme),
   not primary manual taxpayer input in the way §9.4/§9.6 are.
7. **§10/§10.1-§10.3 (transfer of unused training-expense deduction to a
   spouse or registered partner).** Meaningful only in a joint-filing or
   dual-taxpayer context this v1.0.0 does not model, mirroring
   `pl/mf/zeznanie-pit-37`'s own exclusion of its spouse/joint-filing column.
8. **§12 (refund to a foreign bank account, §12.1-§12.6).** This v1.0.0
   models only the domestic-account refund path (§11); a foreign-account
   refund is a materially different data shape (SWIFT/BIC, IBAN, foreign
   address) reserved for a future version if warranted.
9. **§13 (elections to leave an overpayment against future tax
   liabilities/self-employment social tax/settlement decisions).** A set of
   mutually exclusive elections layered on top of the refund choice in §11/
   §12, out of scope for the same reason as the excluded arithmetic sections.
10. **§14.2 (Maksumaksja esindaja / Taxpayer's representative).** The
    representative-filed variant of the closing section; this v1.0.0 models
    only the taxpayer's own direct-filing declaration (§14/§14.1).

## Access notes and judgment calls

1. **`addressOfResidence` modelled as a single string field.** The form
   itself prints "Elukoha aadress (koht, kus isik deklaratsiooni esitamise
   ajal alaliselt või peamiselt elab)" as one line, unlike, say,
   `pl/mf/zeznanie-pit-37`'s multi-field Polish address (voivodeship/county/
   municipality/street/house/apartment/city/postal code). This schema does
   not invent a structured breakdown the form does not itself provide. The
   raw PDF text extraction placed a lone "Riik / Country" label near this
   section (between §3's address line and the §4 header); without a
   rendered visual layout to confirm column boundaries, this could plausibly
   belong to §2's EEA-resident sub-table (which discusses "country of
   residence") rather than being a genuine second field of §3. Per the
   assigning issue's explicit instruction that "the form has one field:
   Elukoha aadress," this document does not model a separate country field
   for §3; if a future version's visual re-render confirms "Riik/Country" is
   in fact a genuine second §3 field, it should be added as a MINOR bump.
2. **`personalIdCode`, `traineePersonalIdCode`, and
   `refundAccountOwnerPersonalIdCode` use the 11-digit isikukood pattern**
   (`^[0-9]{11}$`), consistent with `ee/ppa/e-residency-application` and
   `ee/rik/private-limited-company-foundation`'s established convention for
   this same national identifier.
3. **`wagePayerRegistryOrPersonalIdCode` and
   `giftRecipientRegistryOrPersonalIdCode` accept either an 8-digit Estonian
   registry code or an 11-digit personal ID code** (`^[0-9]{8}$|^[0-9]{11}$`),
   mirroring `pl/mf/zeznanie-pit-37`'s own dual-format `taxpayerTaxId`
   pattern for a field that can hold either a business or a personal
   identifier. The form's own printed label for the §5.1 Part I payer column
   is "registri- või isikukood / registry code or personal ID code" (both
   named explicitly), but the §9.4 gift/donation-recipient column is printed
   as "registrikood / registry code" only (no "isikukood" alternative). This
   document applies the same dual-format field to both for consistency and
   real-world flexibility (a gift recipient could in principle be a natural
   person, even though tax-deductible donations in practice mostly go to
   registered public-benefit organizations with registry codes) — a
   deliberate judgment call disclosed here rather than silently narrowing to
   an 8-digit-only pattern the live form's own printed label would strictly
   support for §9.4.
4. **`traineeFullName` and `trainingInstitutionNameOrRegistryCode` are each
   modelled as one combined string field**, matching the form's own printed
   combined column headers ("ees- ja perekonnanimi / first name and
   surname" and "nimi, registreerimisnumber või registrikood / name,
   registration number or registry code" respectively) rather than splitting
   them into separate sub-fields the form itself does not separate.
5. **Money fields (`wageIncomeAmount`, `wageWithheldIncomeTax`,
   `giftOrDonationAmount`, `trainingExpensesPaidAmount`) use `type: "number"`
   with only a `minimum: 0` constraint**, the same simplification this
   registry's other tax schemas (`pl/mf/zeznanie-pit-37`) use for a plain
   euro/złoty amount, rather than a stricter cent-precision pattern.
6. **`telephone`, `mobilePhone`, and `contactEmail` are all optional**,
   matching the form's own §4 heading with no asterisk/required marking, the
   same treatment `pl/mf/zeznanie-pit-37` gives its own §P contact fields.
7. **The closing declaration in `documents[].signatureDeclaration` is
   modelled as a single attestation entry covering both §14 (the printed
   declaration text) and §14.1 (the taxpayer's own signature and date)**,
   rather than adding a separate `date` field — there is no `date`-typed
   property in the GovSchema meta-schema's `document` definition, and
   `pl/mf/zeznanie-pit-37` set the same precedent of not separately modelling
   a signature date alongside its own closing declaration.

## Test run (Phase 3)

No live submission was attempted: EMTA's e-filing channel (e-MTA) requires an
authenticated session (Estonian ID-card, Mobile-ID, Smart-ID, or a bank
login), and the paper channel requires mailing or hand-delivering a signed
original to the Tax and Customs Board — submitting fabricated taxpayer data
against Estonia's live tax administration is not a safe or reversible action.

Instead, one fully hand-constructed mock record
(`conformance/ee/emta/income-tax-return-form-a/1.0.0/application-packet.json`)
was built from this document's own field inventory (a Tallinn-resident wage
earner with one domestic employer, a small donation to a registered
public-benefit foundation, paid university training expenses, and a
requested refund to her own Estonian bank account) and validated with a
purpose-written script that compiles `schema.json`'s own `fields[]`
(`type`/`validation`/`required`) into a JSON Schema draft 2020-12 document and
checks it with `ajv`, plus a small hand-rolled evaluator for the
`requiredWhen`/`required` document conditions this document's meta-schema
supports:

```
$ node validate_instance.mjs registry/ee/emta/income-tax-return-form-a/1.0.0/schema.json conformance/ee/emta/income-tax-return-form-a/1.0.0/application-packet.json
Static (required/type/pattern/enum) validation: PASS
requiredWhen conditional validation: PASS

OVERALL: PASS
```

**Negative controls**, run against the same script to confirm it actually
catches violations rather than passing vacuously:

```
$ # personalIdCode shortened to "123" — violates the 11-digit isikukood pattern
Static (required/type/pattern/enum) validation: FAIL
 - /personalIdCode must match pattern "^[0-9]{11}$"

$ # surname removed — violates required: true
Static (required/type/pattern/enum) validation: FAIL
 - (root) must have required property 'surname'

$ # contactEmail set to "not-an-email" — violates the e-mail pattern
Static (required/type/pattern/enum) validation: FAIL
 - /contactEmail must match pattern "^[^\s@]+@[^\s@]+\.[^\s@]+$"
```

Both meta-schema validators were run against the finished document and pass
clean:

```
$ node tools/validate.mjs registry/ee/emta/income-tax-return-form-a/1.0.0/schema.json
ok   registry/ee/emta/income-tax-return-form-a/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/ee/emta/income-tax-return-form-a/1.0.0/schema.json
ok   registry/ee/emta/income-tax-return-form-a/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

A full-registry run (`node tools/validate.mjs` with no arguments) also passes
clean at 273/273 documents (including this new one) plus 3/3 `mapping.json`
companions.
