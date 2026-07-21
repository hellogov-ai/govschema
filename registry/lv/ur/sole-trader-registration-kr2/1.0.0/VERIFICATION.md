# Verification record — lv/ur/sole-trader-registration-kr2@1.0.0

## Candidate selection

GOV-4129 ("GovSchema Standard Research"). Latvia's Register of Enterprises
(Uzņēmumu reģistrs, UR) KR2 sole-trader form was pre-scouted as a genuine
open Business Formation candidate during the GOV-4121 cycle and banked in
`CATALOG.md`'s Known Gaps section, after Cyprus's Passport form won that
cycle on source freshness. This cycle authored the KR2 form, opening Latvia
as the registry's 75th jurisdiction (Business Formation, its first
vertical).

## Reaching the live source

Fetched `https://apraksti.ur.gov.lv/lv/KR2%20veidlapa` directly with a
standard desktop Chrome User-Agent
(`Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like
Gecko) Chrome/124.0 Safari/537.36`):

- HTTP 200,
  `Content-Type: application/vnd.openxmlformats-officedocument.wordprocessingml.document`,
  47,737 bytes.
- sha256: `9073145e1ba75a2bd51c90b6cb6d4af51c1d6d18666383a9eac6fc838f326595`.
- No login, CAPTCHA, or WAF gate on the asset.

This is a native Office Open XML `.docx` file, not a PDF. Its own
`docProps/core.xml` records:

```
dcterms:created  = 2025-10-06T12:16:00Z
dcterms:modified = 2025-10-06T13:57:00Z
cp:lastPrinted   = 2025-05-30T20:07:00Z
dc:creator       = Martins Kanepe
cp:lastModifiedBy = Viktorija Pogodina
cp:revision      = 4
```

and `docProps/app.xml` records `Pages` 5, `Words` 4090,
`Company` "Uzņēmumu reģistrs".

## Extraction method

Extracted with Python's `zipfile` module reading `word/document.xml`, then
parsed with `xml.etree.ElementTree`, walking the body's `<w:p>` (paragraph)
and `<w:tbl>` (table) elements in document order and concatenating each
paragraph's `<w:t>` text runs. Tables were walked recursively cell-by-cell
(`<w:tr>`/`<w:tc>`), because several cells nest a second table directly
inside them (e.g. Section 1's "Individuālais komersants" cell contains
three nested sub-tables for the name row and the two personal-code/no-code
branches) — a naive direct-children-only walk silently drops that nested
content, which was caught and corrected mid-extraction.

`word/footnotes.xml` was checked for the form's one footnote reference
(the asterisk on "Paraksts\*"/"Datums\*" in Section 9). `word/numbering.xml`
was not needed: the form's ten numbered sections ("1. Individuālais
komersants" … "10. Informācija par valsts nodevas … maksājumu") are typed
directly into the paragraph/heading text, not rendered through Word's
auto-numbering.

**No `<w:sdt>` content controls exist anywhere in this document** —
`word/document.xml`'s raw text contains zero occurrences of `<w:sdt` — and
no OOXML checkbox form-field elements exist either. The four
`customXml/item*.xml` parts (checked per this cycle's brief, in case they
carried authoritative field metadata as some Latvian government DOCX forms
do) are, in this case, plain SharePoint document-library metadata: a
managed-metadata/taxonomy schema (`item1.xml`/`item3.xml`), an empty
Word bibliography source list (`item2.xml`), and a SharePoint form-template
declaration (`item4.xml`) — none of it form-field structure. Every
checkbox visible on the printed form is instead a Wingdings symbol run,
`<w:sym w:font="Wingdings" w:char="F0FD"/>` or `<w:sym w:font="Wingdings"
w:char="F0A8"/>` (8 occurrences total, confirmed by direct regex count),
sitting inline in ordinary paragraph text. This is a plain print-and-fill
paper form, not an interactive one: field names, groupings, and
requiredness were derived entirely from the surrounding prose and table
structure, not from any structured field metadata.

## Structure modelled

73 `fields[]` across 10 steps mirroring the form's own 10 numbered
sections, plus 2 `documents[]` attestation entries for the form's two
verbatim confirmation statements:

1. **Individuālais komersants** (Section 1) — the merchant's own identity:
   given name/surname, then either a Latvian personal code or (for a
   person without one) birth date, reachable address, and identity-document
   particulars (type, number, issue date, issuing country, issuing
   institution).
2. **Firma** (Section 2) — the registered business/firm name.
3. **Juridiskā adrese** (Section 3) — the registered legal address,
   decomposed to the components the State Address Register recognizes
   (district, municipality, city, village, street, house name/number,
   apartment number, postal code, cadastre designation), plus a closing
   attestation.
4. **Mikrouzņēmumu nodokļa maksātāja statuss** (Section 4) — a
   micro-enterprise tax-payer status opt-in with its own three-clause
   confirmation.
5. **Individuālā komersanta aizbildnis vai aizgādnis** (Section 5) — a
   custodian/guardian block, reusing the same identity-block shape as
   Section 1.
6. **Persona, kura paraksta pieteikumu** (Section 6) — a block for a
   different person signing the application on the merchant's behalf,
   again reusing the Section 1 identity shape plus one additional
   representation-basis field.
7. **Pievienotie dokumenti** (Section 7) — a free-text attached-documents
   list.
8. **Kontaktinformācija saziņai un valsts notāra lēmuma paziņošanas veids**
   (Section 8) — decision-notification method plus contact details.
9. **Paraksti** (Section 9) — up to two signature blocks.
10. **Informācija par valsts nodevas (par reģistrāciju) maksājumu**
    (Section 10) — state-fee payment particulars.

## Disclosed source-fidelity findings

1. **Personal-code/no-code branch discriminators are not printed
   checkboxes.** Sections 1, 5, and 6 each split identity information into
   two mutually exclusive sub-blocks headed "Personas, kurai Latvijas
   Republikā ir piešķirts personas kods" and "…nav piešķirts personas
   kods." Neither sub-block is gated by a printed checkbox or radio
   control anywhere in the extracted text; each is modelled with a
   directly-supplied `*HasLatvianPersonalCode` boolean, the same
   non-printed-discriminator convention this registry established for
   `cy/crmd/passport-application`'s own `applicantIsMinor`.
2. **A conditional exception the schema can't express.** The "has personal
   code" sub-block's reachable-address line is annotated, verbatim,
   "Adrese, kurā persona ir sasniedzama (nav norādāma obligāti, izņemot,
   ja personai nav reģistrēta adrese)" — "not obligatory to state, except
   if the person has no registered address" — in both Sections 1 and 5.
   The exception depends on a real-world fact (whether a registered
   address exists elsewhere) with no corresponding field on this form, so
   `applicantReachableAddress`/`guardianReachableAddress` are modelled
   `required: false` with a `requiredWhen` that fires only in the
   no-personal-code branch; the exception itself is disclosed here rather
   than encoded.
3. **Section 6's personal-code branch omits the address line entirely.**
   Re-extracting Section 6's nested tables directly confirms its "has
   personal code" sub-block runs straight from "Personas kods" to the
   "…nav piešķirts personas kods" heading with no intervening address row
   — unlike the otherwise-identical sub-block in Sections 1 and 5.
   Modelled faithfully: `signerPersonalCode`'s branch has no address
   counterpart.
4. **Section 6's carve-out for an already-declared guardian is a
   paperwork simplification, not a hard block.** Section 6's own header
   reads, verbatim, "(aizpilda, ja pieteikumu individuālā komersanta vārdā
   paraksta cita persona.) (Nav jāaizpilda, ja 5. punktā norādīta
   informācija par aizbildni.)" — "fill in if the application is signed on
   the merchant's behalf by another person. Not required to fill in if
   Section 5 already states the guardian's details." Every Section 6
   field is modelled `requiredWhen applicationSignedByOtherPerson` (itself
   a non-printed boolean, same convention as finding 1) without an
   additional negated term for the Section-5 carve-out; the carve-out is
   disclosed here rather than encoded.
5. **Section 9's two signature blocks are visually identical with no
   stated trigger for the second.** The form prints two name/personal-
   code/signature/date blocks under "Paraksti" with no label
   distinguishing their purpose and no field indicating when a second
   signatory applies (plausibly a co-signing guardian/representative, but
   not stated). Modelled as `signatory1*` (required) and `signatory2*`
   (optional throughout) rather than guessing an unstated trigger.
   Separately, footnote 1 — referenced by both blocks' "Paraksts\*"/
   "Datums\*" labels — reads, verbatim, "Neaizpilda, ja dokuments tiek
   parakstīts ar drošu elektronisko parakstu, kuram pievienots kvalificēts
   laika zīmogs." ("Do not fill in, if the document is signed with a
   secure electronic signature to which a qualified time stamp is
   attached.") No field on the form captures the signing method itself, so
   all four signature/date fields are left `required: false` rather than
   conditioned on an unmodellable trigger.

Section 8 also carries two structurally distinct email-address inputs: one
embedded directly under the "Nosūtot elektronisko dokumentu uz e-pasta
adresi (norādīt e-pasta adresi)" notification-method option
(`notificationEmailAddress`), and a separate, explicitly optional
("informācija nav norādāma obligāti") general-contact block further down
the same section with its own "E-pasta adrese" row (`contactEmailAddress`)
— kept as two fields since the form prints them for two distinct stated
purposes, not normalized into one.

Section 10 (state-fee payment) is entirely conditional per its own
preceding note, verbatim: "Neaizpilda, ja: pieteikums tiek iesniegts
Uzņēmumu reģistra pakalpojumu portālā www.registrs.ur.gov.lv (valsts
nodeva apmaksājama tikai portālā) / ir pievienots maksājumu apliecinošs
dokuments" — "Do not fill in if: the application is submitted via the
Register of Enterprises' services portal (the fee is payable only via the
portal) / a payment-confirming document is attached." Neither condition
corresponds to a field on this form, so every Section 10 field is left
`required: false` with no `requiredWhen`, and the carve-out is disclosed
here. This schema also does not model or fabricate the state registration
fee's actual amount — the form itself does not print one (only a blank
"Apmaksātā summa … EUR" line for whatever was actually paid); the fee
schedule lives in separate Cabinet regulation, out of scope for this form.

## Conformance

3 valid mock scenarios — a Latvian-personal-code-holder sole trader with a
full rural address, no guardian, and no alternate signer
(`valid-lv-personal-code-no-guardian.json`); a foreign (no-personal-code)
sole trader with a guardian under Section 5's `aizbildnis` branch
(`valid-foreign-with-guardian.json`); and a sole trader opting into
micro-enterprise tax status with the Section 4 confirmation, submitting via
the portal so Section 10 is skipped (`valid-micro-enterprise-opt-in.json`)
— plus 9 mutation-control fixtures (a missing statically-required field; a
missing `applicantPersonalCode` while `applicantHasLatvianPersonalCode` is
true; a missing `applicantBirthDate` while it is false; a missing guardian
identity field while `guardianOrCustodianType` is `GUARDIAN_AIZBILDNIS`; a
missing `microEnterpriseTaxConfirmation` document while the opt-in is true;
a missing `notificationEmailAddress` while `decisionNotificationMethod` is
`EMAIL`; an invalid `guardianOrCustodianType` enum value; an invalid
`payerType` enum value; and an unknown top-level field) are committed under
`conformance/lv/ur/sole-trader-registration-kr2/1.0.0/`.

An ephemeral, from-scratch mock validator (deriving required/`requiredWhen`
rules directly from this schema's own `fields[]`/`documents[]`, not
committed) ran all 12 fixtures: all 3 valid scenarios at 0 errors, all 9
mutation controls each raising exactly 1 error, and confirmed every
`requiredWhen` field reference resolves (0 dangling references).

`node tools/validate.mjs` and `node tools/validate-ajv.mjs` both pass at
569/569 for the full registry, individually and as part of the full run.

## Scope boundaries

This document models the applicant-facing data fields of Form KR2: the
merchant's own identity, the firm name, the registered legal address, the
micro-enterprise tax opt-in, the guardian/custodian block, the alternate-
signer block, the attached-documents list, contact/notification
information, signatures, and state-fee payment particulars. It excludes
the form's own "Jāņem vērā!" administrative instructions (row-copying,
page-numbering rules, and the KR5/KR7 companion-form cross-references),
none of which are applicant-supplied data. Submission channels include the
`registrs.ur.gov.lv` services portal, in person, and by post; this schema
does not submit anything on an applicant's behalf and does not imply
endorsement by, or affiliation with, Latvia or its Register of Enterprises.
