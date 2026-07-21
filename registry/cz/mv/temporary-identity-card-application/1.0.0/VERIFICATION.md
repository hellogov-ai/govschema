# Verification record — `cz/mv/temporary-identity-card-application` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-21`

This is a `GovSchema Standard Research` cycle (**GOV-4092/GOV-4094**),
closing the Czech Republic's National ID & Civic Documents vertical (6th and
last of its six GovSchema verticals).

## Why this candidate

By this cycle, the Czech Republic had 5 of 6 verticals (Passport, DMV,
Business Formation, Taxes, Visa), missing only National ID. Three candidates
were scouted in parallel across three different single-vertical-gap
jurisdictions: Austria DMV (Führerscheinantrag, a genuine licence-duplicate/
exchange/reinstatement form, but not first-time issuance), Netherlands Visa
(IND form 9511, MVV/long-stay family-reunification application, ~50-60
fields with conditional branches), and this Czech National ID candidate. This
one was picked for its smaller, single-session-tractable size and because
authoring it fully closes a jurisdiction to 6/6 rather than only adding a
vertical to one that is already partially open. Austria's and Netherlands'
candidates are left as pre-scouted, ready-to-author backlog for a future
cycle — see the parent issue's own comment for their source URLs.

## A prior cycle's dead-end finding, overturned in part

A prior `GovSchema Standard Research` cycle (**GOV-1819**, which authored
`cz/mzv/zadost-o-udeleni-dlouhodobeho-viza`) characterized Czech National ID
as a confirmed dead end: "mv.gov.cz and portal.gov.cz both state explicitly
that citizens do not complete a paper application form for either process
[National ID or Passport] — an office-generated printout is produced and
signed in person once biometrics are captured." This cycle re-confirmed that
claim is still true for the **standard 10-year biometric-chip** občanský
průkaz — `portal.gov.cz/en/sluzby-vs/issue-of-identity-card-S143` (fetched
this cycle, HTTP 200) still states the citizen only signs an office-generated
printout after biometric capture, with no downloadable application form.

What the prior cycle's screening missed is a **distinct process**: the
**temporary identity card** (dočasný občanský průkaz), a short-validity paper
ID issued while the standard card is being produced, or when the standard
card's production time cannot be met (e.g. urgent travel, loss shortly before
a deadline). Unlike the standard card, this process does not require
biometric capture at application time, and the Ministry of Interior (MV ČR)
publishes a genuine, unauthenticated, citizen-fillable application form for
it. This is a real, previously-unidentified source, not a re-read of the
same one the prior cycle already screened.

## Sources examined

### Primary source

- **Authority:** Ministerstvo vnitra České republiky (MV ČR).
- **Document:** "Žádost o vydání dočasného občanského průkazu" (Application
  for issuance of a temporary identity card).
  - **URL:** `https://mv.gov.cz/soubor/zadost-o-vydani-docasneho-obcanskeho-prukazu.aspx`,
    linked from MV's own "Formuláře ke stažení" (forms for download) page,
    `mv.gov.cz/clanek/formulare-ke-stazeni.aspx?q=Y2hudW09Mg%3d%3d`
    ("Občanské průkazy" category).
  - **Access:** fetched fresh this cycle via `curl`, **HTTP 200, 21,626
    bytes** — an exact byte-for-byte match to the size the scouting subagent
    had already reported, giving independent confirmation this is a stable,
    unchanged file, not a coincidental re-fetch of a different version.
  - **Format:** `.xlsx`. Field labels were read directly from the file's own
    `xl/sharedStrings.xml` after unzipping with Python's `zipfile` module (no
    third-party transcription): 46 shared strings, all form-native.

### Cross-check source

- **URL:** `https://www.praha14.cz/app/uploads/sites/2/2014/05/FORM-MV-zadost-o-vydani-docasneho-OP.pdf`,
  a 2-page PDF mirror of the identical form hosted by the Praha 14 municipal
  office.
  - **Access:** fetched fresh this cycle via `curl`, **HTTP 200, 269,563
    bytes** — again an exact byte-for-byte match to the scouting subagent's
    reported size.
  - **Extraction:** text layer extracted via `pdfjs-dist` (`build/pdf.js`,
    loaded directly as a CommonJS module; the package's `legacy/build/*.mjs`
    entry point does not exist in the locally available install, so the
    plain `build/pdf.js` build was used instead with `disableWorker: true`).
  - **Result:** every one of the 46 xlsx shared strings also appears in the
    PDF's own text layer, confirming both mirrors describe the same,
    single-design form (a two-source cross-check, not a single-source
    transcription).

## Field inventory and extraction

The 46 shared strings split into three groups:

- **16 citizen-fillable fields**, modelled below (surname, given name, date
  of birth, sex, birth number, citizenship, place of birth, a 7-part
  permanent-address block, marital status/partnership, and the authorized
  representative's name).
- **6 documents**, modelled under `documents[]` (2 photographs, 4 alternative
  identity/citizenship supporting documents, and the form's own accuracy
  declaration as an attestation).
- **~24 clerk/official-only strings**, excluded entirely (see "Disclosed
  judgment calls" below for the full exclusion list) — this form is filled
  in at a municipal office counter, and roughly half of its printed labels
  are for the receiving official to complete, not the applicant.

## Disclosed judgment calls

- **`citizenship` modelled as a single fixed enum value** (`"Česká
  republika"`), not free text. The form's own "Státní občanství" label is
  immediately followed by "ČESKÁ REPUBLIKA" in both sources, with no other
  value printed anywhere — this document, unlike the standard biometric OP
  process (which naturalized citizens also use), is scoped by the form's own
  printed text to holders of Czech citizenship.
- **`sex` enum (`male`/`female`) is not independently confirmed by an on-form
  checkbox list.** Neither extracted source prints checkbox options next to
  the bare "Pohlaví" label. Modelled on the convention used uniformly
  elsewhere in this registry's Czech-sourced civic forms rather than fabricated
  from this form's own text.
- **Address block modelled as 7 discrete fields** (municipality, municipality
  part, house/conscription number, orientation number, street, postal code,
  district), a genuine structural difference from this registry's existing
  `cz/md/zadost-o-zapis-silnicniho-vozidla` (vehicle registration) schema,
  which collapses the same real-world address concept into a single
  free-text line. Not an inconsistency to reconcile — the two source forms
  are laid out differently. `street` and `municipality part` are marked
  optional because Czech rural addresses commonly consist of only a
  conscription number, with no named street or municipality-part
  subdivision.
- **`birthNumber` pattern (`^[0-9]{8,10}$`) reused from the existing
  `cz/md` schema's own `ownerPersonalIdNumber` field**, rather than
  independently deriving a new pattern, since both describe the same
  real-world Czech rodné číslo identifier and neither source form prints a
  slash separator in its comb-box layout.
- **`maritalStatus` modelled as optional free text, not an enum.** This
  form's own adjoining instruction — "Pokud si nepřejete zápis tohoto údaje,
  rubriku nevyplňujte" ("if you do not want this detail recorded, leave the
  field blank") — makes clear the field is genuinely optional, and unlike
  `cz/mzv/zadost-o-udeleni-dlouhodobeho-viza`'s own `maritalStatus` (which
  does enumerate a printed checkbox list), no checkbox options are printed
  for this field on this form.
- **Four "Doklady předložené k vydání občanského průkazu" (documents
  submitted for issuance) lines — birth certificate, personal document,
  citizenship document, other — modelled as four independent, individually
  optional `documents[]` entries**, not a single required document. The
  applicant presents at least one of these to prove identity/citizenship, not
  necessarily all four; the current spec vocabulary has no "at least one of
  N" document constraint to enforce this programmatically, so it is
  disclosed here in prose instead of silently modelled as an unenforceable
  requirement.
- **Ordinary wet-ink signature lines ("Podpis držitele", "Podpis žadatele")
  are not modelled as data fields** — no signature primitive exists in the
  spec's field-type vocabulary (`string`/`number`/`integer`/`boolean`/
  `date`/`enum`/`file`/`object`). The form's own accuracy declaration
  ("Prohlašuji a svým podpisem potvrzuji, že všechny údaje v této žádosti
  jsou pravdivé a úplné.") is instead modelled as a required `documents[]`
  attestation, the same treatment this registry uses elsewhere for signed
  declarations (e.g. the CZ national visa schema's own
  `declarationAndConsent`).

## Scope and disclosed boundaries — excluded clerk/official-only fields

Explicitly out of scope, matching this registry's established exclusion
pattern for staff-filled fields:

- `Číslo žádosti` (application number, assigned by the office on receipt).
- The temporary card's own `Číslo OP`/`Datum vydání`/`Platnost do`/`Vydal`
  block (populated once the card itself is produced).
- `Totožnost ověřena podle` and `Oprávnění k podání žádosti ověřeno podle`
  (identity/authorization-verification lines completed by the receiving
  official).
- `Datum přijetí žádosti` (date application received).
- Every `Jméno, příjmení a funkce oprávněné úřední osoby` /
  `Razítko a podpis úřední osoby` occurrence (official name/function/stamp,
  printed twice across the two pages).
- `Zvláštní záznamy` (special notes) and `Údaje z předložených dokladů
  ověřeny` (submitted-documents verification).
- `Datum převzetí občanského průkazu` (card-collection date) and its
  adjoining `Podpis občana`/`Podpis oprávněné osoby...` collection-signature
  lines — these record the later pickup of the finished card, a separate
  event from the application itself.
- `Potvrzení o uhrazení správního poplatku` (fee-payment confirmation).
- `Datum a místo podání žádosti` (date and place of filing) — positioned
  directly beside the official stamp/signature block on both sources, and
  most plausibly recorded contemporaneously by the receiving official rather
  than the applicant; excluded rather than guessed.

## Conformance fixtures

8 fixtures are committed under
`conformance/cz/mv/temporary-identity-card-application/1.0.0/`: 2 valid
submissions (a minimal filing with only the 11 required fields, and a fuller
filing populating every optional field including `maritalStatus` and
`representativeName`) and 6 mutation fixtures (each expected to fail
validation with exactly 1 error): a missing required `surname`, an invalid
`sex` enum value, an invalid `citizenship` enum value, an invalid
`birthNumber` pattern (14 digits), an invalid `permanentAddressPostalCode`
pattern (letters instead of digits), and one unknown-field rejection.

## Independence and reproducibility

No submission was made and no in-person municipal-office visit was required
to author this schema. Both `tools/validate.mjs` and `tools/validate-ajv.mjs`
were run against the schema document itself and pass; every fixture listed
above was additionally validated against a derived JSON Schema built from
this document's own `fields` array (ajv 2020-12, matching the expected
valid/invalid outcome for each fixture). GovSchema is an independent,
non-profit standards body; it is not affiliated with, endorsed by, or
operated by the Government of the Czech Republic or the Ministerstvo vnitra.
