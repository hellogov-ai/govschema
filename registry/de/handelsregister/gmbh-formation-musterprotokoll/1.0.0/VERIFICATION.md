# Verification record — `de/handelsregister/gmbh-formation-musterprotokoll` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-04`

The document was derived from and cross-checked against the primary legal
sources below. The full field-by-field comparison the practice requires has
been completed once against those sources (this record), but not yet by a
second, independent reviewer — so `status` remains `draft`, not `verified`.

## Why this schema and why now (GOV-1136)

GOV-1136 asked for a fresh catalog-and-gap-research cycle. Step 1 (catalog
audit) found **137 published schemas** across 11 core jurisdictions (AU, CA,
DE, FR, GB, IE, IN, NL, NZ, SG, US). Every specific gap the issue's own notes
named — DE Tax ID (Steuer-Identifikationsnummer), SG NRIC loss/damage +
re-registration, NZ RealMe, "remaining voter registration" — was **already
published** in prior cycles (`de/finanzamt/tax-identification-number`,
`sg/ica/identity-card-replacement`, `sg/ica/identity-card-reregistration`,
`nz/dia/realme-verified-identity`, and a full voter-registration set spanning
AU/CA/FR/GB/IE/IN/NL/NZ/US). Those notes were stale; see the comment on
GOV-1136 for the full audit.

Step 2 (fresh gap research) instead found a real, unaddressed gap in the
**Business Formation** vertical named directly in the issue ("LLC, EIN, and
Incorporation"): `de/gewerbeamt/business-registration`,
`fr/inpi/micro-entrepreneur-activity-declaration`,
`nl/kvk/sole-proprietorship-registration-eenmanszaak`, and
`sg/acra/sole-proprietorship-registration` each cover only a **sole
trader/micro-entrepreneur** registration — the simplest business form, with
no separate legal personality. None of DE, FR, NL, or SG had a schema for
forming a genuine **limited-liability company** (the direct analogue of
`gb/companies-house/company-incorporation-in01`, `ie/cro/company-incorporation`,
`ca/on/registration/business-incorporation`, `nz/companiesoffice/company-incorporation`,
`in/mca/company-incorporation-spice-plus`, `us/ca/sos/business-entity-llc-formation`,
and `au/asic/proprietary-company-registration`).

Germany's GmbH (Gesellschaft mit beschränkter Haftung) was chosen first among
the four because Anlage 1 to § 2 Abs. 1a GmbHG annexes a **fixed-text model
form (Musterprotokoll)** directly to the statute itself for the simplified
single-founder case — an unusually tractable source: the form text is part of
the primary legal source, not a policy description or a secondary summary.

## Sources examined

- **Document `(id, version)`:** `de/handelsregister/gmbh-formation-musterprotokoll` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Notaries executing the Musterprotokoll under § 2 Abs. 1a
  GmbHG; the resulting deed is filed for entry in the Handelsregister
  (commercial register) maintained by the competent Amtsgericht
  (Registergericht). There is no single national "Companies House"-equivalent
  body in Germany — registration is decentralized across the Länder's
  register courts, joined by the shared `handelsregister.de` portal — the
  same decentralized-authority pattern already used by
  `de/gewerbeamt/business-registration` (Gewerbeamt/Ordnungsamt) in this
  registry.
- **Primary legal sources** (each section fetched and quoted verbatim from
  `gesetze-im-internet.de`, the Bundesministerium der Justiz's official law
  portal):
  - <https://www.gesetze-im-internet.de/gmbhg/__2.html> — § 2 GmbHG: notarial
    form requirement; Musterprotokoll eligibility ("höchstens drei
    Gesellschafter und einen Geschäftsführer", no deviating provisions).
  - <https://www.gesetze-im-internet.de/gmbhg/__5.html> — § 5 GmbHG: EUR
    25,000 minimum Stammkapital; whole-euro share denomination.
  - <https://www.gesetze-im-internet.de/gmbhg/__5a.html> — § 5a GmbHG: the
    Unternehmergesellschaft (haftungsbeschränkt) variant — capital below the
    § 5 Abs. 1 floor, in-kind contributions excluded, capital paid in full
    before registration, mandatory quarter-of-net-income legal reserve,
    mandatory "UG (haftungsbeschränkt)"/"Unternehmergesellschaft
    (haftungsbeschränkt)" naming suffix.
  - <https://www.gesetze-im-internet.de/gmbhg/__7.html> — § 7 Abs. 2/3 GmbHG:
    the quarter-per-share and half-of-minimum-capital payment rules before
    registration.
  - <https://www.gesetze-im-internet.de/gmbhg/__8.html> — § 8 GmbHG: what the
    Handelsregister application must attach and state (Gesellschaftsvertrag,
    Gesellschafterliste, managing directors' affirmations under § 8 Abs. 3,
    domestic business address and scope of representative authority under
    § 8 Abs. 4).
  - <https://www.gesetze-im-internet.de/gmbhg/BJNR004770892.html> — the full
    GmbHG text, used for § 11 GmbHG (legal personality arises only on
    Handelsregister entry) and as the anchor `source.url`.
  - <https://www.gesetze-im-internet.de/beurkg/__10.html> — § 10 BeurkG
    (Beurkundungsgesetz): the general notarial-identification standard used
    to source `founderDateOfBirth`/`founderResidentialAddress`/
    `directorResidentialAddress`, which are not printed as separate blanks on
    the compact template but are standard notarial-practice fields under this
    general statutory identification duty.
- **Primary form source:** the Bundesministerium's own start-up portal,
  `existenzgruendungsportal.de`, publishes a direct PDF reproduction of Anlage
  1(a) GmbHG's Musterprotokoll text (`05-uebersicht_Einpersonengesellschaft.pdf`,
  dated December 2025). Downloaded directly (`curl`) and extracted in full
  with `pdfjs-dist` (2 pages: page 1 the template's 7 numbered clauses and all
  printed blanks; page 2 the notes/footnotes and the source citation to
  Anlage 1/2 GmbHG). Cross-checked against `dejure.org`'s consolidated
  `Anlage_1.html` rendering of the same statutory annex — both agree on every
  blank and footnote.
- **Retrieved / reviewed:** 2026-07-04 (all sources fetched and read live at
  authoring time; no bot-block encountered on any of the above domains).
- **Reviewer:** GovSchema Engineering (Standards Engineer, initial authoring
  source-review).

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| § 5a GmbHG — capital below § 5 Abs. 1 minimum defines a UG | `companyType` |
| Musterprotokoll §1 — "unter der Firma _____ mit dem Sitz in _____"; § 5a Abs. 1 naming suffix requirement | `companyName`, `registeredSeat` |
| Musterprotokoll §2 — "Gegenstand des Unternehmens ist _____" | `businessPurpose` |
| Musterprotokoll §3; § 5 Abs. 1, § 5a Abs. 1 GmbHG | `shareCapitalAmountEur` |
| Musterprotokoll §3 + footnote 3; § 7 Abs. 2, § 5a Abs. 2 GmbHG | `capitalPaymentMode` |
| Musterprotokoll §5 — fixed EUR 300 formation-cost cap | `incorporationCostsCapEur` |
| Musterprotokoll preamble/§3 — founder name blank | `founderFullName` |
| § 10 BeurkG — notarial identification standard | `founderDateOfBirth`, `founderResidentialAddress`, `directorResidentialAddress` |
| Musterprotokoll footnote 2 — Güterstand/spousal-consent notation | `founderMaritalStatus`, `spousalConsentObtained`, `spousalConsentDocument` |
| Musterprotokoll §4 — "Herr/Frau _____ geboren am _____ wohnhaft in _____" | `directorFullName`, `directorDateOfBirth` |
| § 8 Abs. 4 GmbHG — scope of representative authority | `representationAuthority` |
| § 181 BGB self-dealing restriction (standard Handelsregisteranmeldung practice) | `section181BgbExemptionGranted` |
| § 8 Abs. 3 GmbHG — managing directors' affirmation re: § 6 Abs. 2 disqualifying grounds | `directorEligibilityAffirmationConfirmed` |
| § 8 Abs. 2 GmbHG — affirmation that contributions are made and at free disposal | `capitalContributionAffirmationConfirmed` |
| § 8 Abs. 4 GmbHG — "eine inländische Geschäftsanschrift" | `domesticBusinessAddressStreet/PostalCode/City` |
| Musterprotokoll preamble — "erschien vor mir _____", "Notar/-in mit dem Amtssitz in _____" | `notaryName`, `notaryOfficialSeat` |
| § 11 GmbHG; Musterprotokoll §6 — copy to the Registergericht | `registerCourtName` |
| Musterprotokoll preamble — "Heute, den _____" | `declarationDate` |
| § 10 BeurkG identification duty | `founderIdentityDocument`, `directorIdentityDocument` |
| Musterprotokoll §6 — deed distribution | `notarizedMusterprotokoll` |

## Conformance test run

Two scenarios exercise both `companyType` branches:

- `conformance/de/handelsregister/gmbh-formation-musterprotokoll/1.0.0/application-packet-gmbh.json` —
  an unmarried founder forming a standard GmbH with the full EUR 25,000
  minimum capital, paid in full immediately.
- `.../application-packet-ug.json` — a married founder (community-of-accrued-
  gains regime) forming a UG (haftungsbeschränkt) with EUR 1,000 capital
  (below the GmbH floor, as § 5a permits), paid in full as § 5a Abs. 2
  mandates, with `spousalConsentObtained = true` and the corresponding
  `spousalConsentDocument` provided.

A scripted evaluator (reimplementing the GSP-0013 `requiredWhen` grammar —
`conditionLeaf` operators plus `all`/`any`/`not` composition — against
`fields[]` static `required`, `fieldRole: "eligibility"`/`eligibleValues`, and
`documents[].requiredWhen`) checked both packets: **0 violations across 26
fields + 4 documents each**. A mutation test confirmed the conditional
document requirement actually fires, not just that the happy path passes:
removing `spousalConsentDocument` from the UG packet while
`spousalConsentObtained` stays `true` correctly produced
`VIOLATION: document 'spousalConsentDocument' is required but not provided`.

Full console output is saved as `application-packet-gmbh.txt` and
`application-packet-ug.txt` alongside the packets.

## What was NOT modeled, and why

- **Multi-founder Musterprotokoll (up to three shareholders).** Anlage 1
  GmbHG's compact template has a distinct multi-person variant; this document
  scopes to the single-founder case only, matching the single-director scope
  other jurisdictions' company-formation schemas in this registry already
  use.
- **Video-communication notarization (Anlage 2, § 2 Abs. 3 GmbHG).** A 2022
  reform lets the Musterprotokoll be executed via video call instead of an
  in-person notary appointment; the underlying data fields are materially
  the same, but the process/consent flow differs enough to warrant its own
  schema rather than an implicit variant of this one.
- **Bespoke (non-template) Gesellschaftsvertrag.** Used for >3 shareholders,
  multiple managing directors, or non-standard terms; out of scope by design,
  same boundary `ie/cro/company-incorporation` draws around its bespoke
  constitution.
- **In-kind (Sach-)contributions.** § 7 Abs. 3/§ 5a Abs. 2 GmbHG both treat
  these specially (and the UG variant excludes them outright); modeling them
  would require the separate Sachgründungsbericht, out of scope here.
- **§ 1365 BGB's "substantially all assets" threshold for `spousalConsentObtained`.**
  The statute itself does not give a bright-line test; secondary practitioner
  guidance describes it as notary-determined case by case. Modeled as an
  optional field the agent surfaces to the founder rather than an enforced
  rule this document cannot itself evaluate — the same honesty-over-false-
  precision approach used for `ie/cro/company-incorporation`'s PPSN field and
  flagged in the `notequals-empty-string-absent-field-bug` lesson from a
  prior cycle.
- **Post-formation Gewerbeanmeldung and Finanzamt tax registration.** Already
  covered by `de/gewerbeamt/business-registration` (trade office) and out of
  scope for the separate Fragebogen zur steuerlichen Erfassung (tax office);
  this document stops at Handelsregister entry, the point at which the GmbH/UG
  itself comes into legal existence (§ 11 GmbHG).

## Next review

`nextReviewBy`: 2027-01-04, or sooner if the GmbHG's Musterprotokoll annex, the
§ 5/§ 5a capital figures, or the § 8 registration particulars change.
