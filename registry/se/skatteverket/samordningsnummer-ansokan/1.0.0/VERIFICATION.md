# Verification record — se/skatteverket/samordningsnummer-ansokan@1.0.0

## Why this candidate (GOV-2372, "GovSchema Standard Research", child of GOV-2370)

Sweden stood at 5 of its 6 verticals (Business Formation via
`se/bolagsverket/aktiebolag-formation`; DMV via
`se/transportstyrelsen/vehicle-registration-new-vehicle`; Visa via
`se/migrationsverket/work-permit-application`; Taxes via
`se/skatteverket/individual-income-tax-return`; Passport via
`se/polisen/medgivande-pass-nationellt-id-kort-minderarig`, GOV-2363).
National ID & Civic Documents was Sweden's sole remaining open,
unscreened vertical. This cycle's brief pre-scouted Skatteverket's own
form SKV 7540, "Samordningsnummer – Ansökan" (Coordination Number
Application) — the application used by a person with a connection to
Sweden but no personnummer (e.g. a foreign student, property owner, or
future employee) to obtain a samordningsnummer, the Swedish coordination
number used to identify such a person to banks, employers, and other
Swedish institutions. This was independently re-verified fresh this
session (not trusted from the brief's own numbers), per below.

## Source fetch

- Direct PDF URL:
  `https://www1.skatteverket.se/lcmp2/lc_webapp/secure/PdfServlet.do?formularID=7540&sprak=sv&format=sform`
- **Redirect behavior (disclosed, not a real login gate)**: a first plain
  `curl` request against this URL returns **HTTP 302** to
  `.../lcmp2/lc_webapp/login.do?formularID=7540&sprak=sv&format=sform`,
  setting a `JSESSIONID` cookie. Following that redirect with `-L` alone
  loops indefinitely (each hop re-issues a fresh 302 with a new
  `JSESSIONID`) and never resolves — this is a cookie-initialization
  bounce, not credential-gated authentication (no login form, password, or
  CAPTCHA is ever presented). The working fetch technique, per this
  registry's documented direct-curl-timeout workaround: issue two requests
  against the *same* URL with a shared cookie jar (`curl -c cookies.txt -b
  cookies.txt ...`) — the first request seeds the session cookie, and the
  second, replaying it, returns the real document.
- HTTP status on the second request: **200**
- Byte size: **125,390 bytes** — matches the pre-scouted ~125,387-byte
  estimate closely enough to confirm the same document (the small
  delta is consistent with session-cookie/response-header variance
  between fetches, not a different document).
- File header: `%PDF-1.7` (confirmed via `python3` byte inspection, not
  merely trusted from a file-type guess)
- SHA-256 of the fetched bytes:
  `419e7119f9ac1e47b08e8b5e31b61310dde4b26d9f8a6187be557080ad641ae8`
  (recorded here for future re-verification cycles to diff against)
- Printed footer/edition marker (from `getTextContent()`): `SKV 7540 03
  sv web 06 1` — edition 03.
- Listing/info page (fetched fresh via WebFetch this session):
  `https://www.skatteverket.se/privat/etjansterochblanketter/blanketterbroschyrer/blanketter/info/7540.4.339cd9fe17d1714c077642d.html`
  — confirms the form's purpose, states the applicant brings "pass,
  identitetskort eller annan motsvarande handling. Har du
  uppehållstillstånd i Sverige ska du även överlämna ditt
  uppehållstillståndskort" (a passport, ID card, or equivalent document;
  additionally a residence-permit card if applicable) to a booked
  appointment, and that "du lämnar ansökan i samband med din
  identitetskontroll på ditt bokade besök på servicekontoret" (the
  application is submitted during the identity check at the booked
  service-office visit) — confirming the in-person, no-upload submission
  model disclosed in schema.json's own verification notes.

## Independent field extraction

Performed fresh with `pdfjs-dist@3.11.174` (`legacy/build/pdf.js`,
installed to a scratch `/tmp/skv7540` directory this session), not
trusted from the task brief's own numbers:

- `doc.numPages` → 2
- Per-page `page.getAnnotations()`, filtered to `subtype === "Widget"`:
  - **Page 1** (applicant/guardian-facing): **33** widgets — **27** `Tx`
    (text) fields, **6** `Btn` fields.
  - **Page 2** (`Skatteverkets anteckningar`, officer-only): **49**
    widgets — **6** `Tx`, **43** `Btn`.
  - **Total: 82 widgets — 33 Tx, 49 Btn** across both pages, confirming
    the pre-scouted "~82 /Widget annotations" figure (the pre-scouted "33
    Tx, 48 Btn" breakdown was off by one on the Btn side; this session's
    own independent count of 49 Btn is used as authoritative, since it was
    produced by directly filtering `getAnnotations()` output rather than
    an estimate).
- Of page 1's 6 `Btn` widgets: 2 share the field name
  `FormularInterna[0].Sida1[0].subAdress[0].RadioButtonList[0]` with
  `radioButton: true` — a genuine PDF radio-button group, confirmed via
  `getTextContent()` coordinate cross-reference against the printed labels
  "Kön" (heading, x≈207) / "Man" (x≈223) / "Kvinna" (x≈266) at the same
  text row (y≈702–719) as the widget rects (x≈207–221 and x≈251–264,
  y≈700–714) — this is Sweden's Man/Kvinna (male/female) gender selector,
  merged into a single `gender` enum field per this registry's
  `at/bmi/national-identity-card-application` precedent for an identical
  genuine-radio-group merge. The remaining 4 `Btn` widgets are named
  `krsAlternativ[0]`..`krsAlternativ[3]`, each `checkBox: true`,
  `radioButton: false`, with a distinct field name — confirmed
  independent (non-exclusive) checkboxes, cross-referenced against the
  printed heading "Vilken anknytning har du till Sverige?" and its four
  options "Familj" / "Studerande" / "Äger eller hyr bostad" / "Annan" at
  y≈335–348.
- Page 1's 27 `Tx` widgets are all self-documenting via their own
  `alternativeText` tooltip (e.g. `txtFornamn` → "Förnamn",
  `txtFodelseort` → "Födelseort", `txtSamordNr` reused for both
  "Beskriv din anknytning till Sverige" and "Beskriv varför du behöver
  ett samordningsnummer" — the same internal field-name stem reused
  across two distinct subform instances, `subAnknytning[0]` and
  `subAnknytning[1]`, disambiguated by their own distinct
  `alternativeText`), cross-checked against `getTextContent()`'s printed
  labels at matching x/y coordinates — no coordinate-guessing was needed
  to resolve field identity, since every widget's tooltip already states
  its own printed label in Swedish.
- Page 2's 49 widgets are entirely under four field-name prefixes:
  `subDok1[0]`/`subDok2[0]` (two independently repeatable
  identity-document check blocks — document number, in-person-visit
  confirmation, photo match, document type Pass/EU-ID/uppehållstillstånd,
  biometric-chip Ja/Nej, automated MRZ/UV/blacklight/RFID-chip/RFID-photo
  checks, validity Ja/Nej, face-verification status, and a
  not-performed-reason pair), `subOvrigt[0]` (a free-text "Övriga
  upplysningar" remarks box), and `subUtfordAv[0]` (the caseworker's own
  name and service office). `getTextContent()` on page 2 confirms the
  section heading reads verbatim "Skatteverkets anteckningar (fylls i av
  myndigheten)" ("Skatteverket's notes, to be filled in by the
  authority") — an unambiguous officer-only page.

## The "officer-only page" scoping decision (disclosed, not assumed)

This registry has an established convention, confirmed by re-reading three
precedents before authoring this schema:

- `se/polisen/medgivande-pass-nationellt-id-kort-minderarig` excludes two
  "Passmyndighetens identitetskontroll av vårdnadshavare" staff boxes as
  institutional/office-only.
- `dk/cpr/notification-of-entry` excludes a "kommune noteringer" free-text
  box and a whole second block captioned "Andre oplysninger (udfyldes af
  kommunen)" ("Other information, to be filled in by the municipality").
- `dk/fstyr/samtykkeerklaering-koerekort-under-18` excludes its own
  equivalent institutional section.

SKV 7540's page 2 is the same pattern at a larger scale: an entire page,
explicitly captioned "fylls i av myndigheten" ("filled in by the
authority"), collecting no applicant-authored data whatsoever — every
field on it (document type/number, chip/MRZ/UV/blacklight checks, photo
match, caseworker name/office) is completed by the Skatteverket officer
during the mandatory in-person identity-verification appointment. Per the
established convention, this schema excludes page 2 in full rather than
modelling any of its fields as applicant-facing.

## Field mapping (32 fields from 33 page-1 widgets)

- 27 `Tx` widgets map 1:1 to 27 string/date fields.
- The 2-widget `RadioButtonList[0]` radio group merges into 1 `gender`
  enum field.
- The 4 `krsAlternativ[0..3]` checkboxes map to 4 independent boolean
  fields (`connectionReasonFamily`/`connectionReasonStudent`/
  `connectionReasonOwnsOrRentsHousing`/`connectionReasonOther`).
- 27 + 1 + 4 = **32 fields**.

## Judgment calls (full disclosure)

1. **`applicationDate`** (the top-of-page "Datum" field, `alternativeText`
   "Ange datum i formatet ÅÅÅÅ-MM-DD") is modelled `required: true`, read
   as the date the applicant completes/signs the form — consistent with
   this form's in-person, single-sitting submission model (there is no
   separate "date received" office stamp on page 1; that role is played
   by the excluded page 2's own officer section instead).
2. **`gender`** is a binary Man/Kvinna (male/female) choice only; the
   source form provides no third option. Canonical English enum values
   `["male", "female"]` are used per the `at/bmi/national-identity-card-application`
   precedent, with the native Swedish option labels disclosed in
   `sourceRef`.
3. **Swedish vs. foreign contact address alternative.** "Kontaktadress i
   Sverige" and "Kontaktadress utanför Sverige" are mutually alternative
   per the form's own printed instruction on the foreign block ("Anges
   endast om svensk kontaktadress saknas" — specified only if a Swedish
   contact address is missing), but the form prints no dedicated selector
   field (e.g. a "do you have a Swedish address?" checkbox) to key a
   `requiredWhen` condition on. Per this registry's `se/polisen` precedent
   ("no synthetic gating field is invented absent a printed selector") and
   the registry's own documented `notEquals`-empty-string-absent-field
   pitfall, neither block is forced required — both are `required: false`,
   with the business rule stated in each field's own description. The
   foreign address's printed "Max 35 tecken per fält" ("max 35 characters
   per field") instruction is encoded as `maxLength: 35` on
   `addressLine1Foreign`/`addressLine2Foreign`/`addressLine3Foreign`.
4. **`connectionDescription`** and **`coordinationNumberReason`** (the two
   free-text justification boxes) are modelled `required: true`, since
   they are the form's own substantive justification for issuing a
   coordination number, not incidental detail. The four
   `connectionReason*` checkboxes are independent, non-exclusive booleans
   (confirmed via `getAnnotations()`: each is `checkBox: true`,
   `radioButton: false`, a distinct field name, unlike the `gender` radio
   group) — no `exclusivityGroups` entry is added, since the form permits
   selecting more than one reason at once.
5. **Two-column signature block.** The form prints one integrated note
   above both columns — "Om ansökan gäller ett barn som är under 18 år
   ska båda vårdnadshavarna skriva under" ("If the application concerns a
   child under 18, both custody holders must sign") — but, exactly as with
   `se/polisen`'s PM 531.2, provides no dedicated "is this a minor"/"sole
   vs. joint custody" selector field. The first column
   (`primarySignerSignature`/`PrintedName`/`Phone`/`Email`) is `required:
   true` (completed in every case, whether by the applicant themselves or
   by a first custody holder on a minor's behalf); the second column
   (`secondGuardianSignature`/`PrintedName`/`Phone`/`Email`) is `required:
   false`, each field's description disclosing the joint-custody caveat —
   matching this registry's existing `se/polisen` judgment-call precedent
   for an identical fact pattern.
6. **Signature fields as plain strings, not `documents[]` attestations.**
   The genuine fillable `Tx` "Underskrift" widgets are modelled as plain
   string fields representing the signature line the signer completes,
   not a hand-drawn/image signature field — consistent with this
   registry's `dk/fstyr` and `se/polisen` precedent for Nordic
   signature-line fields. Modelling the signature as a `documents[]`
   `attestation` entry (the alternative pattern this registry uses in
   `se/skatteverket/individual-income-tax-return`, the sibling schema
   under this same authority) was considered and set aside: that sibling
   schema's attestation `statement` is drawn verbatim from a separate
   distribution-instructions page, whereas this form's own printed text
   supplies no equivalent standalone attestation sentence to cite.
7. **No `documents[]` array.** The form's own info page states the
   applicant brings physical identity documents to show in person at the
   appointment; there is no file-upload/attachment concept anywhere on
   the form itself, since identity documents are shown to and recorded by
   the officer on the excluded page 2, not submitted as scanned copies.
   This matches the 0-`documents[]` precedent already established for
   `se/polisen` and `dk/fstyr`. Because this schema carries no
   `documents[]` array, no documents-requiredness mutation control is
   included among the conformance fixtures below — disclosed rather than
   fabricated.

## Conformance

Two mock valid scenarios (see `conformance/se/skatteverket/samordningsnummer-ansokan/1.0.0/`):

1. **`valid-student-swedish-address.json`** — a foreign student living at
   a Swedish contact address who needs a coordination number to open a
   Swedish bank account.
2. **`valid-property-owner-foreign-address.json`** — a property owner
   using only a foreign contact address (no Swedish contact address),
   exercising the form's own "Anges endast om svensk kontaktadress
   saknas" alternative-address path.

Three mutation controls, each expected to raise exactly 1 error:

1. **`mutation-missing-required-field.json`** — `firstName` removed →
   1 required-field error.
2. **`mutation-invalid-gender-enum.json`** — `gender` set to an
   out-of-enum value ("other") → 1 enum-violation error.
3. **`mutation-foreign-address-too-long.json`** — `addressLine1Foreign`
   set to a 36-character string, one character over the form's own
   35-character-per-field cap → 1 `maxLength` error.

Both `node tools/validate.mjs` (schema-shape/meta-schema conformance) and
a from-scratch, disposable conformance-checker script (evaluating
`fields[]` `required`/`validation` rules against each fixture) were run
this session. Results: 0 errors on both valid scenarios; exactly 1 error
on each of the 3 mutation controls. See this repository's own
`tools/validate.mjs` output and this session's own conformance-checker
run for the full pass/fail log.
