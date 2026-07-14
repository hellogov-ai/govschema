# Verification record — `ro/mae/cerere-pentru-eliberarea-unui-nou-pasaport` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-14`

This is a `GovSchema Standard Research` cycle (**GOV-2844**). Romania
currently has 4 of 6 verticals modelled: Taxes
(`ro/anaf/declaratie-unica-activitati-independente`, GOV-2797, the registry's
50th jurisdiction), DMV
(`ro/dgpci/cerere-operatiune-inmatriculari-transcrieri-radieri-provizorii`,
GOV-2804), Business Formation (`ro/onrc/cerere-inregistrare-persoane-juridice`,
GOV-2813), and Visa (`ro/mae/formular-cerere-viza-de-lunga-sedere`, GOV-2837).
This document adds **Passport**, giving Romania 5 of its 6 verticals.
National ID & Civic Documents remains Romania's sole open, unscreened-this-
cycle vertical.

## Candidate provenance

This candidate was pre-scouted and Wayback-verified during the prior GOV-2837
cycle (see that schema's own VERIFICATION.md, "Candidate screening this
cycle"): "Romania's passport application (MAE's 'Anexa 10 -- Cerere pentru
eliberarea unui nou pașaport,' ~30 fields, also Wayback-verified) ... left as
[a] strong, ready-to-author backlog candidate." This cycle authors that
candidate directly rather than re-screening it from scratch, but independently
re-derives the sourcing (fresh fetch, fresh sha256, fresh pdfjs-dist
extraction) rather than trusting the prior cycle's disclosed numbers as-is.

## Sources examined

### Source 1 (primary `source`, the form itself)

- **Authority:** Ministerul Afacerilor Externe (MAE, Ministry of Foreign
  Affairs)
- **Document:** "Anexa 10 -- Cerere pentru eliberarea unui nou pașaport"
  (application for issuance of a new simple passport, for an adult Romanian
  citizen domiciled in Romania)
- **URL (as cited in `source.url`):**
  <https://www.mae.ro/sites/default/files/file/pdf/formulare-consulare/pasapoarte/Anexa_10_Cerere_pasaport_cu_domiciliul_in_Romania.pdf>
- **Access note:** a direct fetch of the live `mae.ro` URL this cycle
  returned HTTP 403 (a 375-byte WAF/anti-bot challenge body, not a 404 --
  consistent with this registry's prior findings that the entire `mae.ro`
  domain gates direct agent fetches, not evidence the document itself was
  removed). The document was instead retrieved from the Internet Archive's
  Wayback Machine. The CDX API
  (`http://web.archive.org/cdx/search/cdx?url=...&output=json`) returned one
  genuine `200`/`application/pdf` capture at timestamp `20220305162016`
  (three later 2025 captures are all HTTP `503` redirect/error pages, not
  the document). This cycle fetched that one successful capture via two
  independent access patterns -- the `if_` (iframe-free raw asset) and
  `id_` (identical/raw) renderings of the same `20220305162016` snapshot --
  and both produced byte-identical files: **134,449 bytes**, sha256
  `28da38e6e87e5d033c0ca1877f665191f15817ccd8e376dc3126263918baf223`. As a
  further, independent corroboration (not the primary sha256-of-record,
  per this registry's convention when the live domain is gated), the
  third-party mirror
  `http://declaratie-de-valoare.com/doc/formulare_consulare/Anexa_10_Cerere_pasaport_cu_domiciliul_in_Romania.pdf`
  was also fetched and produced the exact same 134,449-byte file with the
  identical sha256 above -- a third, independent source agreeing
  byte-for-byte with both Wayback access patterns. This three-way match is
  treated as strong evidence the archived copy is a faithful, unaltered
  mirror of the live document, not a Wayback-side or mirror-side artifact.
- **Extraction method:** `pdfjs-dist@3.11.174` (`legacy/build/pdf.js`,
  CommonJS entrypoint, installed in an isolated scratch directory to avoid
  disturbing `tools/`'s own committed `ajv`/`ajv-formats` devDependencies --
  `npm install <pkg> --no-save` inside `tools/` is known to wipe unrelated
  `node_modules`, per this registry's own recurring gotcha; `tools/`'s
  `node_modules` was independently restored via `npm ci --include=dev` and
  reverified after the pdfjs-dist install). `getAnnotations()` was run
  against the document: **1 page, 0 annotations** -- confirming this is a
  flat, non-interactive, single-page specimen (filled by hand), the same
  tier as the majority of this registry's sources. `getTextContent()` was
  extracted and grouped into rows by rounded y-coordinate, each row's items
  sorted by x-coordinate, giving a faithful top-to-bottom, left-to-right
  reading order for every printed line. A second, finer-grained dump
  (raw per-item x/y, not row-grouped) was taken over the two visually dense
  regions of the page -- the "Mă legitimez cu" (identity-document) block and
  the "posed (am posedat)" (prior-passport) block -- to disambiguate how
  four wrapped/overlapping lines of text there actually pair with their
  respective checkbox options (see Judgment calls below).

### Source 2 (duplicate-detection comparison)

- Romania's own already-modelled `ro/mae/formular-cerere-viza-de-lunga-sedere`
  (65 fields, same agency, GOV-2837) was read in full. **Finding: no overlap
  in subject matter beyond the trivially shared identity-block concepts
  (surname, first name, date of birth, sex) that any two Romanian
  government identity forms would share** -- the visa form's content
  (travel document, journey purpose, host/sponsor, spouse/children/
  dependent-Romanian-citizen blocks) has no analogue on this passport form,
  and this form's own prior-passport-possession declaration, identity-
  document-used declaration, and physical-description (height/eye colour)
  fields have no analogue on the visa form. Authored as a new, non-duplicate
  schema, distinct in both directions.
- No other passport-vertical schema in this registry models a Romanian
  form; `jo/cspd/passport-application`, `id/imigrasi/passport-application-
  first-adult`, and `ee/ppa/passport-application` were read for structural
  reference only (field/document/step conventions), not as duplicate-
  detection targets (different jurisdictions, no possible overlap).

## Field inventory (Phase 3)

All 26 `fields[]` entries carry their exact source line in their own
`sourceRef`. Summary by step:

| Step | Fields | Notes |
|---|---|---|
| `applicant_identity` | 12 | `cnp`, `sex`, `dateOfBirth`, `surname`, `firstName`, `previousName`, `fathersFirstName`, `mothersFirstName`, `placeOfBirth`, `countyOfBirth`, `domicileAddress`, `phoneNumber` |
| `previous_passport` | 5 | `hasPreviousPassport` (yes/no declaration) plus 4 fields gated `requiredWhen hasPreviousPassport: "yes"` (including `reasonForNewPassport`) |
| `identity_document` | 4 | `idDocumentType` (a 4-option enum) plus 3 fields gated `requiredWhen idDocumentType: "national-id-card"` |
| `request_details` | 5 | `urgentIssuanceRequested`, `heightCm`, `eyeColor`, `applicationSubmissionDate`, `dataProcessingConsent` |

Total: **26 fields**, **3 `documents[]` entries**, **2
`crossFieldValidation`** rules, **4 `steps`**.

This is below the ~25-35 fields estimated ahead of authoring, at the low end
of that range -- see "Deviations from the pre-authoring estimate" below for
why.

## Access notes and judgment calls

1. **The "Mă legitimez cu" (identity-document) block's sub-fields are
   attached only to the `national-id-card` option.** The raw x/y dump shows
   the phrase "carte de identitate seria ___ nr. ___ eliberat la" ending
   the row at the option's own printed y-position, with "data de" wrapping
   onto the next visual line (shared with the "buletin de identitate"
   option's own label, which is otherwise a bare, sub-field-less line).
   Neither "buletin de identitate," "adeverință provizorie de identitate,"
   nor "certificat de naștere" carries its own printed series/number/date
   sub-fields anywhere on the page. `idCardSeries`/`idCardNumber`/
   `idCardIssueDate` are therefore gated `requiredWhen idDocumentType:
   "national-id-card"` only, not any of the other three options -- a
   literal reading of the source's own layout, not an inferred convenience.
2. **`countyOfBirth` (Județul) is left optional.** The form prints it as an
   unconditional-looking label directly beside "Locul nașterii" (place of
   birth), but a Romanian citizen born outside Romania (a real, non-edge-
   case population for this form -- diaspora-born citizens applying for
   their first or a replacement passport) would have no județ to state and
   the form provides no separate mechanism (e.g. a country-of-birth
   alternative) for that case. Modelling it required would assert a
   constraint the source doesn't actually support for every applicant.
3. **`reasonForNewPassport` and the other 3 prior-passport sub-fields are
   gated on `hasPreviousPassport: "yes"`, not modelled unconditionally.**
   The printed sentence runs continuously from "posed (am posedat)
   pașaportul simplu nr. ___ eliberat la data de ___ de formațiunea de
   pașapoarte din județul ___ și solicit un nou pașaport deoarece ___" --
   one grammatical unit describing the "yes, I already hold/held one"
   branch, including the reason a *new* one is now needed. An applicant
   with no prior passport (the "nu posed" branch) is applying for a first
   passport, not "un nou pașaport" (a replacement) in the sense this
   sentence describes, and the form gives that applicant nothing to fill in
   this sentence.
4. **`eyeColor` is modelled as free text, not an enum.** Unlike some other
   passport schemas in this registry (e.g. `ng/nis`'s own four-option
   printed "Colour of Eyes" list), this specimen prints only a bare label
   ("Culoarea ochilor") with no options text anywhere nearby -- consistent
   with this registry's precedent of never inventing an enum the source
   doesn't itself print (e.g. `jo/cspd`'s own `passportApplicationType`).
5. **The "Cererea completată cu date inexacte și omisiuni este nulă de
   drept" sentence is modelled as a `documents[]` attestation, not a
   `fields[]` boolean.** It is phrased in the third person/passive as a
   standing legal consequence ("an application completed with inaccurate
   data ... is void by right"), not a first-person "I acknowledge ..."
   statement the applicant affirmatively signs off on -- the same
   distinction this registry already draws between `jo/cspd`'s own
   `declarationAttestation` (a `documents[]` entry) and fields like the RO
   visa schema's `gdprConsentAcknowledged` (a `fields[]` boolean, because
   that source text is itself first-person "I am aware of and I hereby
   consent"). By contrast, "Sunt de acord cu prelucrarea datelor ..." ("I
   agree to the processing of the data ...") on *this* form is genuinely
   first-person, so `dataProcessingConsent` is modelled as a required
   boolean field, matching the RO visa schema's own precedent.
6. **The two physical signature lines (mid-page, beside "Culoarea ochilor,"
   and the standalone line at the very bottom of the page) are not
   modelled**, per this registry's standing convention.
7. **The office-only right-hand column** ("Certific identitatea persoanei și
   exactitatea datelor," officer reference numbers "Nr." / "Mapa," and the
   stamp/photo-frame instruction "Nu depășiți chenarul!") **is not
   modelled** -- office-facing, not applicant input, the same class of
   exclusion this registry already applies to other forms' office-use
   columns (e.g. the RO visa schema's own "FOR EMBASSY / CONSULATE USE
   ONLY" column).
8. **The 3.5x4.5cm photo placeholder is captured as a `documents[]` entry
   (`applicantPhoto`), not a field.**

## Deviations from the pre-authoring estimate

The task brief estimated "roughly 25-35 fields," expecting items including
CNP, sex, date of birth, surname, first name, previous name, parents' first
names, place/county of birth, domicile, phone, prior-passport declaration,
identity-document-used enum, urgent-issuance request, and a legal-liability
declaration. All of those were confirmed present on the actual source
**except** the legal-liability declaration, which (per Judgment call 5
above) is modelled as a `documents[]` attestation rather than a `fields[]`
entry, since its own text is not phrased as applicant-affirmed consent.
Two fields not named in the estimate were also found and modelled: the two
physical-description fields `heightCm` and `eyeColor` ("Semnalmente:
Înălțime ... Culoarea ochilor"), a printed section the estimate did not
anticipate. Net: 26 fields, at the low end of but consistent with the
25-35 estimate.

## Test run (Phase 4)

No live submission was attempted: this is a request form against a real
national passport-issuing authority, and submitting fabricated identity
data into a real government system is not a safe or reversible action.

Instead, a fully hand-constructed mock record was built from this document's
own field inventory
(`conformance/ro/mae/cerere-pentru-eliberarea-unui-nou-pasaport/1.0.0/application-packet.json`)
and independently checked with a standalone, ajv-free rule-tracing script
(not committed -- reads `schema.json`'s own `required`/`requiredWhen`/
`validation.pattern`/`validation.enum`/`validation.maxLength`/
`validation.minimum`/`validation.maximum`/`crossFieldValidation` and
evaluates them against the mock record), in addition to the repo's own
validators.

**Committed scenario -- Elena Ionescu, a Bucharest resident renewing an
expired simple passport, proving identity with her national ID card.**
`hasPreviousPassport: "yes"` correctly requires the four prior-passport
sub-fields (via `requiredWhen`); `idDocumentType: "national-id-card"`
correctly requires the three ID-card sub-fields (via `requiredWhen`); both
`crossFieldValidation` rules (the previous passport's and the ID card's own
issue dates must not be after the application's submission date) pass.
Passes with zero errors.

**Five negative controls** (each run against a mutated copy of the
committed packet, expected to fail exactly one rule): (a) removing
`previousPassportNumber` while `hasPreviousPassport: "yes"` -- correctly
flagged as a missing required field; (b) `cnp: "12345"` -- correctly
flagged as a `validation.pattern` violation (not 13 digits); (c) setting
`applicationSubmissionDate` to a date before both `previousPassportIssueDate`
and `idCardIssueDate` -- correctly flagged as two separate
`crossFieldValidation` violations; (d) removing `eyeColor` -- correctly
flagged as a missing required field; (e) `dataProcessingConsent: false` --
correctly flagged as a `validation.enum` violation (the field requires
`true`). All five negative controls were correctly rejected.

**One additional positive control:** setting `idDocumentType:
"birth-certificate"` (leaving the three national-ID-card sub-fields absent)
still passes with zero errors, confirming the `requiredWhen` gate on those
three fields is scoped correctly to the `national-id-card` option only, not
accidentally required for every option.

Both registry validators were run against the finished document and pass
clean:

```
$ node tools/validate.mjs registry/ro/mae/cerere-pentru-eliberarea-unui-nou-pasaport/1.0.0/schema.json
ok   registry/ro/mae/cerere-pentru-eliberarea-unui-nou-pasaport/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/ro/mae/cerere-pentru-eliberarea-unui-nou-pasaport/1.0.0/schema.json
ok   registry/ro/mae/cerere-pentru-eliberarea-unui-nou-pasaport/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

## What is NOT modelled (out of scope), and why

- The office-only right-hand column (officer identity/data-accuracy
  certification, "Nr." / "Mapa" reference numbers) -- office-facing, not
  applicant input.
- Both physical signature lines -- per this registry's standing convention.
- The 3.5x4.5cm photo placeholder box itself, and its "Nu depășiți
  chenarul!" framing instruction -- the photo requirement is captured as a
  `documents[]` entry instead; the framing instruction is a physical-print
  instruction with no applicant-data equivalent.
- Any minor's/dependent's version of this form, or any equivalent form for
  a Romanian citizen domiciled abroad (this Anexa is explicitly the
  "cu domiciliul în România" / "domiciled in Romania" variant) -- left as
  disclosed, unscreened backlog for a future cycle.

## Scope and jurisdiction notes

This document gives Romania 5 of its 6 verticals (Taxes, DMV, Business
Formation, Visa, Passport); National ID & Civic Documents remains Romania's
sole open, unscreened-this-cycle backlog vertical.
