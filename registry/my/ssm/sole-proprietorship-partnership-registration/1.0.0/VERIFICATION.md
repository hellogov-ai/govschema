# Verification record — `my/ssm/sole-proprietorship-partnership-registration` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-09`

This is **GOV-1938**: "GovSchema Standard Research," closing **Malaysia's
Business Formation gap** — its sole remaining open, unscreened vertical
after DMV (`my/jpj/driving-licence-application`, GOV-1774), Passport
(`my/jim/passport-travel-document-application`, GOV-1783), and Visa
(`my/jim/visa-with-reference-application`, GOV-1789).

## Candidate screening

### Rejected in a prior cycle (not re-attempted): the Companies Act 2016 "Superform"

GOV-1774's own cycle (2026-07-08) fetched SSM's Companies Act 2016 s.14
company-incorporation "Superform" specimen PDF directly (HTTP 200) and
rejected it: `pdfjs-dist` confirmed it carries **zero AcroForm fields**, and
on inspection it is only a thin 2-page specimen printout of SSM's online
MyCoID portal wizard — bare field labels with no field-by-field numbered
instructions of the kind this registry's guide-document fallback precedent
(AEAT Modelo 030/036, SII Formulario 22, CEIDG-1) requires. That same cycle's
own record explicitly noted: "SSM's own 'Form A' sole-proprietorship form was
searched for but no live, directly downloadable PDF was located, only
third-party summaries" — i.e. Form A was a known target, not yet found.

### This cycle's candidate: Form A (Borang A)

This cycle located **Form A directly and unauthenticated on `ssm.com.my`**,
published as the First Schedule to the **Registration of Businesses Rules
1957** (P.U.(A) 282/1957), made under the **Registration of Businesses Act
1956 (Act 197)** — a different statute and a different registry from the
Companies Act 2016 regime the rejected Superform belongs to. SSM
(Suruhanjaya Syarikat Malaysia, established by the Companies Commission of
Malaysia Act 2001) administers both regimes today as successor Registrar of
Businesses, but they are legally and procedurally distinct: Act 197 covers
sole proprietorships and partnerships (business-name registration, no
separate legal personality), while the Companies Act 2016 covers
incorporated companies (separate legal personality). This is the correct,
narrower candidate GOV-1774 had flagged as worth finding but could not
locate.

## Sources examined and re-fetched fresh this cycle

### Source 1 (primary `source`, the form)

- **Authority:** Suruhanjaya Syarikat Malaysia (SSM) / Companies Commission
  of Malaysia, successor Registrar of Businesses.
- **Document:** Form A (Borang A), Kaedah 3/Rule 3, First Schedule to the
  Registration of Businesses Rules 1957 (L.N. 282/57), made under the
  Registration of Businesses Act 1956 (Act 197, Revised 1979).
- **URL:** <https://www.ssm.com.my/acts/fscommand/pua0282y1957sc001.htm>
- **Retrieved / reviewed:** 2026-07-09, via direct `curl`:
  ```
  $ curl -s -o form_a_schedule.htm -w "HTTP %{http_code} size %{size_download}\n" \
      https://www.ssm.com.my/acts/fscommand/pua0282y1957sc001.htm
  HTTP 200 size 123687
  ```
  No login/CAPTCHA/WAF gate. HTTP 200, 123,687 bytes.
- **Format:** a Microsoft-Word-generated HTML page (Lotus Domino, `windows-1252`
  encoding) reproducing the gazetted First Schedule's own table layout —
  not a PDF or a fillable AcroForm, but the government's own current,
  directly-served, self-documenting statutory text of the form (title,
  every printed field label, every checkbox option, every instruction and
  footnote), including Form A's own siblings printed on the same First
  Schedule page: Form A1 (renewal), Form B (change of particulars), and
  Form D (certificate of registration, the registrar's own output document,
  not modelled).
- **Extraction method:** decoded the raw bytes as `windows-1252`, then
  parsed both (a) a stripped-tags plain-text rendering (for reading every
  printed label/instruction/footnote verbatim) and (b) the raw HTML
  `<table>`/`<td>` structure directly (to resolve which narrow "Kod (2)"
  code columns/boxes sit beside which specific rows — Word's own table
  layout, not row-order guesswork, e.g. confirming the "Kod (2)" column
  beside "Tempat Utama perniagaan" is a single 15%-width cell, and that
  the "Kod (2)" caption appearing twice around the nature-of-business
  bordered box is one spanning cell rendered with its label printed above
  and below the box, not two distinct code cells).

### Source 2 (corroborating, parent Act — legal grounding)

- **Document:** Registration of Businesses Act 1956 (Act 197), Laws of
  Malaysia (Percetakan Nasional Malaysia Berhad / LawNet reprint).
- **URL:** <https://www.ssm.com.my/bm/acts/a0197pdf.pdf>
- **Retrieved / reviewed:** 2026-07-09, via direct `curl`:
  ```
  $ curl -s -o act197.pdf -w "HTTP %{http_code} size %{size_download}\n" \
      https://www.ssm.com.my/bm/acts/a0197pdf.pdf
  HTTP 200 size 1020899
  ```
  1,020,899 bytes, HTTP 200, no login required. (Despite the `/bm/` path
  segment, this particular reprint's own body text is in English — the
  Act's own English-language revised edition, not a translation error on
  this cycle's part; confirmed by reading the extracted text directly.)
- **Extraction method:** `pdfjs-dist` (`legacy/build/pdf.mjs`),
  `page.getTextContent()` across all 21 pages. `page.getAnnotations()`
  confirmed pages 1, 2, and 21 carry AcroForm widgets (cover-page/index
  form fields unrelated to the Act's own body text) but the substantive
  sections (pp. 3-20) carry none — a plain reference PDF, text extracted
  directly.
- **What it confirms, verbatim, re-grepped from the extracted text (not
  transcribed from memory or a summary):**
  - `"LAWS OF MALAYSIA Act 197 REGISTRATION OF BUSINESSES ACT 1956"` —
    confirms this is genuinely Act 197, the statute the First Schedule
    cites.
  - `"5. (1) The person responsible for a business shall, not later than
    thirty days from the date of the commencement of the business, apply
    to the Registrar for the registration of the business."` — the
    30-day registration-deadline rule cited in this schema's
    `dateOfCommencement` field description and top-level `description`.
  - `"(2) An application under subsection (1) shall be made in the
    prescribed form and shall state— (a) the name of the business; (b)
    the nature of the business; (c) the date of the commencement of the
    business; (d) the address of the place of business...; (e) in the
    case of a partnership, the particulars of the partnership agreement,
    if any; (f) in respect of the associates of the business, their full
    names, positions held, and dates of entry into the business..."` —
    confirms every one of Form A's own printed sections (business name,
    nature of business, date of commencement, place of business,
    partnership-agreement particulars, associates' particulars) traces
    directly to this statutory content requirement — no field in this
    schema was invented beyond what both the Act and the printed form
    state.
  - Sections 5B ("Changes in registered particulars," within thirty days
    of a change — Form B's own subject matter) and 5A ("Renewal of
    registration," within thirty days before expiry — Form A1's own
    subject matter) confirm those two sibling forms are genuinely
    distinct statutory transactions from Form A's own first-registration
    transaction, supporting this schema's scope decision to exclude both.

## Field inventory and provenance

All 27 `fields[]` entries and all 4 `documents[]` entries carry their own
`sourceRef` pointing at the exact Form A label/checkbox group they come
from; summarized by block:

| Block | Fields | Notes |
|---|---|---|
| Business identity | `businessName`, `businessNameChinese`, `dateOfCommencement`, `constitutionOfBusiness` | `businessName`, `dateOfCommencement`, `constitutionOfBusiness` required |
| Partnership agreement | `writtenPartnershipAgreementExists`, `partnershipAgreementDate` | Both gated via `requiredWhen`, judgment call 1 below |
| Place/nature of business | `principalPlaceOfBusinessAddress`, `principalPlaceOfBusinessCode`, `postalAddress`, `natureOfBusinessPrimary`, `natureOfBusinessSecondary`, `natureOfBusinessCode`, `businessBranches` | Two undecoded "Kod (2)" fields, judgment call 2 below |
| Declaration | `declarationDate` | Signature itself modelled as `documents[].signedDeclaration` |
| Owner's/Partner's Particulars (items 1-10) | `ownerOrPartnerName` … `ownerOrPartnerSex` (13 fields, some items split into 2 model fields) | Single block modelled, judgment call 3 below |

Total: **27 `fields[]` entries** and **4 `documents[]` entries**.

## Disclosed judgment calls

1. **`writtenPartnershipAgreementExists`/`partnershipAgreementDate` are
   gated (`requiredWhen constitutionOfBusiness == "partnership"`), even
   though Form A's own printed layout asks this Ya/Yes-Tidak/No question
   unconditionally** (it is not printed inside a "for partnerships only"
   box). This is a disclosed judgment call, not a printed conditional on
   the form — the question is logically inapplicable to a sole
   proprietorship (there is no partnership to have an agreement about),
   and gating it avoids forcing a spurious answer out of a sole-trader
   applicant. Every `requiredWhen` gate in this schema targets a field
   this schema also defines as `required: true`
   (`constitutionOfBusiness`, `writtenPartnershipAgreementExists`), so its
   value is always present in valid data — the same absent-field-ambiguity
   avoidance convention `pl/ceidg/wniosek-o-wpis-do-ceidg`'s own
   VERIFICATION.md documents (judgment call 5 there).
2. **Two "Kod (2)" internal SSM code boxes
   (`principalPlaceOfBusinessCode`, `natureOfBusinessCode`) are modelled
   as optional, unconstrained 1-2 character free-form values, not a
   fabricated closed enum.** Neither Form A's own printed text, the
   Registration of Businesses Rules 1957, nor the Registration of
   Businesses Act 1956 (both examined in full this cycle) explains what
   these two-character codes represent. The raw HTML table structure was
   read directly (not just the stripped-tag plain text) to confirm each
   code box's exact row binding: `principalPlaceOfBusinessCode` sits in
   its own 15%-width column directly beside the "Tempat Utama perniagaan /
   Principal place of the business" row; `natureOfBusinessCode` is a
   single bordered box spanning 8 rows of nature-of-business blank lines,
   with its "Kod (2)" caption printed once above and once below the same
   box (confirmed by the raw `<table>`/`rowspan=8>` markup, not two
   separate cells) — modelled as one code field, not two, per this
   reading. Disclosed as unresolved rather than guessed at (e.g. as a
   Malaysian state code or an MSIC-style industry classification code),
   consistent with this registry's anti-fabrication convention.
3. **A single Owner's/Partner's Particulars block is modelled (items
   1-10), not a repeating structure for multiple partners.** Form A's own
   printed First Schedule page shows exactly one such block; GovSchema's
   v0.3 spec line has no repeating/array field type (GSP-0009, not yet
   folded in), so — per this registry's established convention for this
   exact limitation (e.g. `pl/ceidg/wniosek-o-wpis-do-ceidg`'s PKD-code
   slots, `mx/sat/preinscripcion-rfc-persona-moral`'s deferred repeating
   addresses) — a partnership with more than one partner is out of scope
   for v1.0.0; each additional partner would in practice require an
   additional physical copy of this same block, which this schema does
   not model as an array.
4. **Item 4 ("No. Kad Pengenalan/Paspot / I.C./Passport No.") is split
   into two model fields**, `ownerOrPartnerIdentificationType` (enum:
   passport/identity_card) and `ownerOrPartnerIdentificationNumber`
   (string) — the source prints a document-type checkbox choice
   ("Paspot/Passport" vs. "Kad Pengenalan/Identity Card") beside a single
   number entry, so this schema models the type as a discriminator and
   the number as one shared field, rather than two separately-typed
   number fields.
5. **Item 5 ("Tarikh/Date of") is modelled as
   `ownerOrPartnerAssociationEventDate`, describing it as the date of the
   association-nature event selected in item 6
   (`ownerOrPartnerAssociationEventType`)**, since the source prints item
   5 immediately before item 6's own "Masuk/Entry, Pertukaran/Change,
   Menarik Diri/Withdrawal, Kematian/Death, Sukarela/Voluntary,
   Lain-lain/Others" checkbox group with no further qualifying text of its
   own — read in context as "date of [the selected association event]",
   not a separate, independently-meaningful date.
6. **`ownerOrPartnerPercentageShare` is modelled as optional** (no
   `required`/`requiredWhen`), since the source prints it without a
   visible required-field marker and its applicability is clearest for a
   partnership with more than one partner (for a sole proprietorship the
   answer is trivially 100% but the form does not force an entry).
7. **`associatesVerificationAttestation` and `verifyingOfficerAttestation`
   are both modelled as unconditionally `required: true` documents**, even
   though the "PENGESAHAN OLEH SEKUTU-SEKUTU / VERIFICATION BY ASSOCIATES"
   block's own wording ("saya/kami adalah sekutu-sekutu" — "I/we are
   associate(s)") reads most naturally as a partnership-specific
   attestation. The source prints this block unconditionally, immediately
   after the main declaration, with no "for partnerships only" marker of
   its own (unlike the written-partnership-agreement question, which at
   least logically implies a partnership-only condition); rather than
   invent a `requiredWhen` gate the source does not itself support with a
   printed conditional, this schema keeps both attestations unconditional
   and discloses the ambiguity here rather than silently resolving it.
8. **Form A1 (renewal) and Form B (change of particulars) are out of
   scope entirely** — not modelled as fields, documents, or even as
   forward-looking stub references beyond this file's own prose. Per Act
   197 ss.5A/5B, both are separate, later-in-time statutory transactions
   (renewal within 30 days before expiry; particulars-change within 30
   days of the change) against an *already-registered* business, distinct
   from Form A's own first-registration transaction. Form D (the
   registrar-issued certificate of registration) is the registrar's own
   output document, not an applicant input, and is likewise not modelled.
9. **The "Perakuan No./No. of Certificate" and "No. Pendaftaran
   Perniagaan/Business Registration No." fields printed on Form A's own
   header and Owner's/Partner's Particulars block are not modelled** —
   both are registrar-assigned outputs that do not exist before this
   registration is granted, the same convention this registry has applied
   to other registrar-assigned identifiers on a first-registration form
   (e.g. `pl/ceidg/wniosek-o-wpis-do-ceidg`'s own `regon` field, which
   *is* modelled as optional precisely because it can be pre-held from an
   earlier filing — unlike Form A's certificate/registration numbers,
   which cannot exist yet for a brand-new registration and are therefore
   omitted entirely rather than modelled as an always-empty optional
   field).

## Test run (Phase 3)

No live submission was attempted: Form A's registration is a paper/in-person
filing to the Registrar of Businesses (PEJABAT PENDAFTARAN PERNIAGAAN, Kuala
Lumpur) requiring an original signature and, per the form's own printed
requirement, a witnessed verification by an authorised officer (Judge,
Magistrate, Notary Public, Commissioner for Oaths, etc.) — not a safe or
reversible action to simulate against the real registry.

Instead, a fully hand-constructed mock record was built from this document's
own field inventory (a sole-proprietorship "Restoran Warisan Kampung"
scenario) and checked with a purpose-written validation script that
re-implements spec v0.3's `type`/`validation`/`required`/`requiredWhen`/
`documents[]` semantics directly from `schema.json` and validates the
packet against them field-by-field. The committed fixture is
`conformance/my/ssm/sole-proprietorship-partnership-registration/1.0.0/application-packet.json`.

**Scenario (committed fixture) — a sole proprietor registering a new
restaurant business.** `businessName: "RESTORAN WARISAN KAMPUNG"`,
`constitutionOfBusiness: "sole_proprietorship"` (so
`writtenPartnershipAgreementExists`/`partnershipAgreementDate` are correctly
omitted), `dateOfCommencement: "2026-08-01"`, a principal place of business
in Klang, `natureOfBusinessPrimary: "Restoran"`, `declarationDate:
"2026-07-20"`, `ownerOrPartnerIdentificationType: "identity_card"` (so the
identification number is a MyKad-shaped value),
`ownerOrPartnerAssociationEventType: "entry"` (a brand-new registration),
`ownerOrPartnerRace: "malay"`, `ownerOrPartnerSex: "female"`, and all four
`documents[]` entries (`writtenPartnershipAgreementCopy` correctly omitted
as not required, `signedDeclaration`/`associatesVerificationAttestation`/
`verifyingOfficerAttestation` present).

```
$ node validate_packet.mjs registry/my/ssm/sole-proprietorship-partnership-registration/1.0.0/schema.json \
    conformance/my/ssm/sole-proprietorship-partnership-registration/1.0.0/application-packet.json
OK: packet validates against my/ssm/sole-proprietorship-partnership-registration@1.0.0 (27 fields, 4 documents)
```

**Negative controls**, run against the same script to confirm it actually
catches violations rather than passing vacuously:

```
$ # businessName removed — violates required: true
FAIL (1 error(s)):
 - field businessName: required (or requiredWhen matched) but absent from packet

$ # constitutionOfBusiness set to "partnership", writtenPartnershipAgreementExists removed
FAIL (1 error(s)):
 - field writtenPartnershipAgreementExists: required (or requiredWhen matched) but absent from packet

$ # ownerOrPartnerSex: "F" (not in enum)
FAIL (1 error(s)):
 - field ownerOrPartnerSex: value "F" not in allowed enum ["male","female"]

$ # documents.signedDeclaration removed
FAIL (1 error(s)):
 - document signedDeclaration: required (or requiredWhen matched) but absent from packet
```

All four negative controls were correctly identified by the script,
confirming it actually enforces `required`/`requiredWhen`/`enum` rather than
passing vacuously.

Both meta-schema validators were run against the finished document and pass
clean:

```
$ node tools/validate.mjs registry/my/ssm/sole-proprietorship-partnership-registration/1.0.0/schema.json
ok   registry/my/ssm/sole-proprietorship-partnership-registration/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/my/ssm/sole-proprietorship-partnership-registration/1.0.0/schema.json
ok   registry/my/ssm/sole-proprietorship-partnership-registration/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

`node tools/verify-sources.mjs registry/my/ssm/sole-proprietorship-partnership-registration/1.0.0`
was run against this finished document immediately before opening the PR —
see the PR description for its output.
