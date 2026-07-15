# Verification record — `gr/yme/ekdosi-adeias-odigisis-katigorias-a` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-15`

This is a `GovSchema Standard Research` cycle (**GOV-3026**). Greece stood at
2 of 6 verticals (Taxes, Visa) at the start of this cycle, the least-built-out
jurisdiction alongside Italy with no recent dead-end screening on record. This
document opens Greece's **DMV vertical (1 of 6)**.

## Scouting handoff

A parallel scouting agent in this same cycle screened all four of Greece's
open verticals:

1. **Passport** — confirmed a **dead end**. `passport.gov.gr`'s own "sample"
   PDF (`AppFSample.pdf`) is a scanned image with zero extractable text/
   AcroForm, and the site's own process description states applications are
   "electronically registered by Passport Office personnel, then printed and
   signed" — not citizen-fillable.
2. **DMV** — the winning candidate, modelled in this document. `yme.gr`
   hosts a full family of real, downloadable, non-login-gated driving-licence
   PDFs (Α1 through Α10) with no auth wall.
3. **Business Formation** — a **strong candidate** was found (AADE's Δ211,
   a 268-field AcroForm mirrored by the Athens Chamber of Commerce after the
   AADE domain itself WAF-blocked direct fetch), left as disclosed backlog
   for a future cycle rather than bundled into this single-deliverable
   document.
4. **National ID** — confirmed a **dead end**. `astynomia.gr` returns an
   Akamai WAF 403 on direct fetch; the National Registry of Administrative
   Procedures (`mitos.gov.gr`) confirms issuance is "αποκλειστικά δια ζώσης"
   (exclusively in-person), with mandatory biometric capture (photo + 2
   fingerprints + digital signature) and no citizen-fillable static form.

## Source re-verification (Phase 1)

- **Authority (as printed on the form):** Form Α1, published by the
  Υπουργείο Υποδομών και Μεταφορών (Ministry of Infrastructure and
  Transport, ΥΜΕ) on its own `yme.gr` domain, filed with the Διεύθυνση
  Μεταφορών και Επικοινωνιών (Transport & Communications Directorate) of the
  applicant's Περιφερειακή Ενότητα (regional unit). Legal basis printed on
  the form itself: Απόφαση 58930/480/99 (ΦΕΚ 526/Β/3-5-99), ΚΥΑ
  43206/6028/29-7-2008 (ΦΕΚ 1541/Β), Ν.2963/01 (ΦΕΚ 268/Α/23-11-01), Π.Δ.
  19/95 (ΦΕΚ 15/Α/31-1-95), and the sworn-declaration format basis Άρθρο 8
  Ν.1599/1986 + Άρθρο 3 παρ. 3 Ν.2690/1999.
- **URL:** `https://www.yme.gr/getfile.php?id=2443`
- **Retrieved / reviewed:** 2026-07-15, independently re-fetched this cycle
  with `curl -s`, not trusted from the scouting agent's report as-is.
- **HTTP status:** `200`. **Content-Type:** `application/pdf`. **Size:**
  `100,699` bytes — matches the scouting report's own figure exactly.
  **sha256:** `b26c0475ba5bc6a8b35bbb75e89a8f72e84af5d33e29aa989ebfcd05f845c500`
  — independently computed this cycle with `sha256sum` against a fresh
  download, matching the scouting agent's own reported hash exactly.
- **File type:** a genuine PDF. Independently confirmed this cycle via
  `pdfjs-dist@2`'s `getAnnotations()`, which returns **zero entries on every
  one of the 4 pages** — a print-and-hand-fill form, no AcroForm/interactive
  widgets whatsoever.
- **Extraction method:** `pdfjs-dist@2` `getTextContent()` run against all 4
  pages from a clean `/tmp` scratch install, independently this cycle (not
  trusted from the scouting agent's summary as-is), with items grouped by
  rounded `y`-coordinate and sorted by `x` to reconstruct each printed row —
  necessary because `getTextContent()`'s raw item order does not match visual
  reading order on this form. Confirmed **4 pages**, matching the scouting
  report's own claim, and every section the scouting report described
  (applicant identity block, representative-designation block, sworn
  declaration, required-documents table, response-delivery choice)
  verbatim against the form's own printed text.
- A sibling form, **Α2** (`https://www.yme.gr/getfile.php?id=2444`, HTTP 200,
  `application/pdf`, 99,849 bytes, sha256
  `9b290a6a0058e134fb93373ea71b3492441b200bc43a9855e04d69211d8a2bf5`), was
  also independently fetched this cycle to compare against Α1 before
  choosing which category to model; both are byte-distinct instances of the
  same universal Ν.1599/1986 cover-form template scoped to a different
  driving-licence category. Α1 (Category A, motorcycle) was retained as the
  modelled document since it was the one the scouting agent had already
  fully transcribed and cross-verified; Α2 (Category B, car) and the
  remaining Α3–Α10 siblings (extensions, replacements, EU-licence
  conversion) are left as disclosed, ready-to-fetch companion-schema
  candidates for a future cycle — all confirmed live at the same
  `yme.gr/getfile.php?id=N` pattern.

## Field inventory (Phase 2)

All 38 `fields[]` entries and their exact source-form section/label
reference are listed inline in `schema.json`'s own `sourceRef` per field.
Summary by section:

| Section (page) | Representative fields | Modelled scope |
|---|---|---|
| Header (p.1) | `protocolNumber`, `protocolDate`, `addresseeDirectorate` | Full — first two filled by the receiving Directorate, not the applicant |
| ΣΤΟΙΧΕΙΑ ΑΙΤΟΥΝΤΟΣ (φυσικά πρόσωπα) — applicant (p.1) | `applicantGivenName`/`Surname`, `applicantFather`/`MotherGivenName`/`Surname`, `applicantBirthDate`/`Place`, `applicantIdCardNumber`, `applicantTaxId`, `applicantResidenceCity`/`Street`/`StreetNumber`/`PostalCode`, `applicantPhone`/`Fax`/`Email` | Full — excludes the sibling legal-entity block (see judgment call 1) |
| ΟΡΙΣΜΟΣ ΕΚΠΡΟΣΩΠΟΥ — representative designation (p.1) | `kepDelegationAuthorized`, `representativeAuthorizedToSubmit`/`ToReceive`, `representativeGivenName`/`Surname`/`FatherFullName`/`IdCardNumber`/`ResidenceCity`/`Street`/`StreetNumber`/`PostalCode`/`Phone`/`Fax`/`Email` | Full — completed only when not filing/collecting in person (see judgment call 2) |
| ΥΠΕΥΘΥΝΗ ΔΗΛΩΣΗ — sworn declaration (p.2) | `declarationNormalResidenceGreece`, `declarationNoOtherDrivingLicenceHeld` | Full |
| ΜΕΡΟΣ Δ' — delivery & signature (p.4) | `responseDeliveryMethod`, `declarationSignatureDate` | Full |

Total: **38 `fields[]`** entries (20 unconditionally `required: true`, the
remaining 18 belonging to the office-filled header pair or the
representative-designation block, all `required: false`) plus **9
`documents[]`** entries: 6 unconditionally required, 1 —
`residencePermitPhotocopy` — `required: false` with its foreign-national
conditionality disclosed only in prose (no nationality field exists on this
form to gate on structurally), and 2 —
`medicalFitnessCertificates`/`existingDrivingLicencePhotocopy` — each
conditionally required via `requiredWhen` on `declarationNoOtherDrivingLicenceHeld`,
in inverse directions of the same condition.

### Per-section tally (independent cross-check against the 38-field claim)

- Header: 3 (`protocolNumber`, `protocolDate`, `addresseeDirectorate`)
- Applicant section: 6 (given/surname + parents') + 2 (birth date/place) + 1
  (ID card) + 1 (tax ID) + 4 (residence city/street/number/postal code) + 3
  (phone/fax/email) = 17
- Representative-designation section: 3 (authorization booleans:
  `kepDelegationAuthorized`, `representativeAuthorizedToSubmit`,
  `representativeAuthorizedToReceive`) + 8 (given name, surname, father's
  full name, ID card number, residence city/street/street number/postal
  code) + 3 (phone/fax/email) = 14
- Declaration section: 2
- Delivery/signature section: 2
- 3 + 17 + 14 + 2 + 2 = **38**, matching `schema.json`'s own `fields[]`
  array length exactly (`node -e "console.log(require('./schema.json').fields.length)"`
  → `38`). An earlier draft of this document incorrectly stated 33 in its
  own `description` and this file before this reconciliation was run
  end-to-end; both were corrected to 38 prior to publication.

## Judgment calls disclosed

1. **The form's own "ΣΤΟΙΧΕΙΑ ΑΙΤΟΥΝΤΟΣ (νομικά πρόσωπα ή ενώσεις προσώπων)"
   (Applicant Data — legal entities) block is out of scope.** This is a
   universal Ν.1599/1986 cover-form family printed with both a natural-person
   and a legal-entity applicant block regardless of which specific
   procedure it is attached to. A Category A driving licence is, per the
   form's own eligibility conditions (ΠΡΟΫΠΟΘΕΣΕΙΣ — minimum age, physical/
   mental fitness, theoretical/practical exam), issuable only to a natural
   person; the legal-entity block has no application to this procedure.
   The form's own instruction ("Στις γκρίζες περιοχές δεν πρέπει να
   συμπληρωθούν στοιχεία" — do not fill in data in the grey areas) is the
   form's own signal that procedure-inapplicable blocks are left blank,
   though this cycle's text-only extraction could not independently confirm
   the grey shading visually (no PDF-to-image rendering was performed).
2. **The representative-designation block is not gated by `requiredWhen`.**
   The form prints no separate flag distinguishing "filing in person" from
   "filing via a representative" other than the representative block itself
   being filled in or left blank — consistent with this registry's
   established caution (e.g. `sk/policajny-zbor/ziadost-o-udelenie-
   vodicskeho-opravnenia`) against fabricating a gating condition the form
   does not itself structurally encode via a dedicated flag field. Each
   field instead carries a `description` disclosing it is completed only
   when a representative is designated.
3. **`documents[].existingDrivingLicencePhotocopy` and
   `documents[].medicalFitnessCertificates` are the two documents this form
   does structurally gate**, both via `requiredWhen` on the sworn
   declaration `declarationNoOtherDrivingLicenceHeld` (inverse conditions of
   each other): the form's own footnote (2) instructs applicants to strike
   the "I do not hold another licence" declaration when they do hold one,
   in which case a photocopy of that licence must be submitted; the same
   note (Δικαιολογητικό 5) states the medical-fitness certificates are not
   required at all when the applicant already holds a valid licence of any
   category or subcategory — the identical real-world condition
   `declarationNoOtherDrivingLicenceHeld` already records, so no additional
   field was fabricated to express it.
4. **`applicantTaxId` and `applicantPhone` are modelled `required: true`;
   `applicantFax`/`applicantEmail` are `required: false`.** The form itself
   marks no field in the natural-person applicant block with an
   optional-strike-out asterisk (unlike the representative block's implicit
   conditionality), so a phone number was judged a necessary contact channel
   for administrative correspondence while fax and e-mail were judged
   supplementary alternate channels, consistent with how not every applicant
   is expected to hold a fax line.

## Conformance fixtures (Phase 3)

8 fixtures committed under
`conformance/gr/yme/ekdosi-adeias-odigisis-katigorias-a/1.0.0/`: 2 valid (an
in-person applicant with no other driving licence held, and a
represented applicant who already holds another licence — exercising the
`existingDrivingLicencePhotocopy` requiredWhen branch and the
`medicalFitnessCertificates` exemption together) plus 6 mutation-control
fixtures, each derived from a valid fixture by a single targeted mutation.
All 8 were run against a from-scratch, ephemeral field-by-field conformance
checker (derived from this schema's own `fields[]`/`documents[]`/
`requiredWhen` conditions, not committed to the repo) before being
finalized: both valid fixtures produced **0 errors**, and each of the 6
mutation-control fixtures produced **exactly 1 error** — a missing required
field, a missing required document, a missing conditionally-required
document (`existingDrivingLicencePhotocopy` when
`declarationNoOtherDrivingLicenceHeld` is `false`), an invalid enum value, an
invalid boolean type, and an invalid date format.

## Structural validation

- `node tools/validate.mjs registry/gr/yme/ekdosi-adeias-odigisis-katigorias-a/1.0.0/schema.json` — **ok**.
- `node tools/validate-ajv.mjs registry/gr/yme/ekdosi-adeias-odigisis-katigorias-a/1.0.0/schema.json` (ajv 2020-12 against `spec/v0.3`) — **ok**.
- Full-registry re-run after adding this document: `node tools/validate.mjs`
  → **456/456**; `node tools/validate-ajv.mjs` → **456/456**.

## Maturity

`structural-reference`: the form's own printed structure is fully
transcribed, but no live filing at a Transport & Communications Directorate
was attempted. GovSchema is an independent, non-profit standards body and is
not affiliated with, endorsed by, or operated by the Hellenic Republic, the
Ministry of Infrastructure and Transport, or any Περιφερειακή Ενότητα.
