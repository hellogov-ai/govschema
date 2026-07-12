# Verification record — `ke/nrb/application-for-identity-card` v1.0.0

This file is the source-review record for this document version. It documents
the provenance of the published fields/documents and states the current
verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-12`

This is GovSchema Standard Research cycle **GOV-2500**. It opens Kenya's
**National ID & Civic Documents vertical (2 of 6)**, via Form Reg. 136A,
"Ombi ya Kitambulisho / Application for Identity Card", prescribed under the
Registration of Persons Act, Cap. 107.

## Vertical scouting (Kenya's five remaining open verticals)

Kenya was opened last cycle (GOV-2493, Business Formation, 1/6). This cycle
screened all five remaining verticals in parallel before choosing where to
author:

- **Passport** — Directorate of Immigration Services, operating entirely
  through eCitizen (`dis.ecitizen.go.ke`). The current 2026 ePassport flow is
  online-application-then-mandatory-in-person-biometric-capture; the one
  legacy AcroForm found (a bilingual "Form 19 (Revised 2012)", 88 widgets,
  hosted only on an embassy mirror) is a superseded pre-digital specimen, not
  confirmed as the current authoritative artifact — the classic "strong
  AcroForm superseded by mandatory e-channel" dead end (cf. GOV-2449's note
  on Thailand). **Dead end.**
- **DMV** — NTSA. Both driving-licence application/renewal and
  vehicle-registration/transfer are now exclusively handled through the
  login-gated NTSA TIMS/eCitizen portal with mandatory in-person biometric
  capture for licences; "NTSA Form C" (Traffic Act, Cap. 403 §9) still
  circulates on third-party mirrors as a 0-AcroForm-widget flat PDF, described
  by current guides only as a conditional/legacy artifact, not the primary
  submission channel. **Dead end.**
- **Taxes** — KRA's `IT1_Individual_Resident_Return` Excel workbook
  (`kra.go.ke`, version 19.0.3, March 2026) is a genuine, currently maintained,
  richly structured (34-sheet, well over 100 field) offline-preparation
  template later uploaded to the login-gated iTax portal. This is a real,
  strong candidate — set aside this cycle only in favour of National ID's
  more tractable single-form scope, and flagged below as next cycle's
  strongest backlog candidate.
- **Visa** — Kenya's eTA system (`etakenya.go.ke`, replacing the old
  evisa.go.ke since Gazette Supplement No. 1 of 2024-01-02) is a pure online
  wizard with a hard payment gate (~US$34) and no government-published
  specimen form of any kind; only a third-party travel-agency guide
  reconstructs the field list. **Dead end** (no unauthenticated specimen to
  cite).
- **National ID** — Reg. 136A (this schema). A genuine, currently-referenced,
  33-widget fillable AcroForm; chosen as this cycle's candidate.

## Sources examined

### Source 1 — Reg. 136A PDF (chosen as `source.url`)

- **URL:** <http://www.kenyaembassystockholm.com/pdfs/REG_136Dx.pdf> — a
  Kenyan diplomatic mission's own site. Fetched directly via `curl`: **HTTP
  200**, `Content-Type: application/pdf`, **40,414 bytes**,
  `Last-Modified: Mon, 04 Jul 2022 08:52:06 GMT`,
  `sha256: 54466885dc7d70f3f0efacc63385dd6206337ed7f160b1114b719cf092183b9b`.
- NRB's own current intake channel (`usajili.go.ke/nrb`, confirmed live via a
  fresh `HTTP 200` fetch this cycle) describes first-time/replacement ID
  registration only as an in-person/eCitizen process and publishes no
  downloadable specimen of this or any equivalent form — consistent with
  several other jurisdictions' legacy Reg./paper forms in this registry, an
  embassy-hosted mirror is cited in `source.url` rather than an
  agency-hosted copy, because none exists.
- **Cross-checked against a second, independent mirror**:
  `https://kenyaembassydc.org/wp-content/uploads/REG_136Dx.pdf` — HTTP 200,
  40,889 bytes, `sha256: 1762b6e53463bb1d2dc0e3d8d4d002f2039f6e228af1dc16f929e44e41c3a756`
  (a different hash/byte size from Source 1, i.e. a distinct re-save, not a
  byte-identical mirror). `pdfjs-dist` extraction of both files independently
  confirms an **identical 33-widget AcroForm** — same 3-page structure, same
  per-page widget counts (21/12/0), same internal XFA-style field names
  (`topmostSubform[0].Page1[0].TextField1[0]`, etc.) in both files. This
  resolves the two-mirror ambiguity: both are the same form, one simply
  re-saved/re-uploaded, not a materially different edition — no scope
  discrepancy to disclose beyond the byte-level difference itself.
- A third candidate mirror, `kenyahighcom.org.uk/wp-content/uploads/2021/01/REG-136A.pdf`,
  returned **HTTP 404** on direct fetch this cycle and was not used.

### Source 2 — `pdfjs-dist` structural extraction (own re-derivation)

- `getDocument().promise` + `page.getAnnotations()` across all 3 pages of
  Source 1 confirms **33 real `Tx` (text) AcroForm widgets** — 21 on page 1,
  12 on page 2, 0 on page 3 — and `getFieldObjects()` confirms
  `IsAcroFormPresent: true`. **0** widgets are `Btn` (checkbox/radio) type —
  material to the item-22 scoping decision below.
- Every widget's own internal `fieldName` is a generic XFA-style token
  carrying no semantic meaning (`TextField1[4]`, `TextField5[0]`, etc.), so
  each of the 33 widgets was mapped to its printed label by extracting
  `page.getTextContent()` per page (keeping each text item's PDF-space
  `x`/`y` from its `transform` matrix) and correlating each widget's `rect`
  against the nearest text-content item at matching y-coordinate — the same
  technique this registry has used for other out-of-order/generic-named
  AcroForms (cf. `dk/skattestyrelsen`, GOV-2253). The full widget → label
  correlation:

  **Page 1** (21 widgets, all preceding a numbered item list preceded by one
  unnumbered header line):
  - `TextField1[0]` → header line, "Nambari ya Kitambulisho (Identity Card
    No.)" (before item 1)
  - `TextField1[1]` → item 1, "Majina Kamili (Full Names)"
  - `TextField5[0]` → item 2, "Tarehe ya Kuzaliwa (Date of birth)"
  - `TextField2[0]` → item 3, "Mume/Mke (Male/Female)"
  - `TextField1[2]` → item 4, "Majina ya baba (Father's name)"
  - `TextField1[3]` → item 5, "Majina ya Mama (Mother's Name)"
  - `TextField3[0]` → item 6, "Marital Status"
  - `TextField1[4]` → item 7, "Majina ya Mume (Husband's full names)"
  - `TextField1[5]` → item 8, "Nambari ya kitambulisho ya Mume (Husband's
    ID/No.)"
  - `TextField1[6]` → item 9, "Wilaya ya kuzaliwa (District Of Birth)"
  - `TextField1[7]` → item 10, "Kabila (Tribe)"
  - `TextField1[8]` → item 11, "Ukoo (Clan)"
  - `TextField1[9]` → item 12, "Mlango (Family)"
  - `TextField1[10]` → item 13, "Wilaya ya Makao (Home District)"
  - `TextField1[11]` → item 14, "Tarafa (Division)"
  - `TextField1[12]` → item 15, "Eneo la Bunge (Constituency)"
  - `TextField1[13]` → item 16, "Mtaa (Location)"
  - `TextField1[14]` → item 17, "Mtaa Mdogo (Sub-location)"
  - `TextField1[15]` → item 18, "Kijiji (Village/Estate)"
  - `TextField1[16]` → item 19, "Anwani (Home Address)"
  - `TextField1[17]` → item 20, "Kazi (Occupation)"

  **Page 2** (12 widgets):
  - `TextField1[0]` → item 21(a), "Telephone Number"
  - `TextField1[1]` → item 21(b), "Email"
  - `TextField1[2]` → item 22(1)(a), "Applicant's Birth Certificate Number"
  - `TextField1[3]` → item 22(1)(b), "Applicant's Passport Number"
  - `TextField1[4]` → item 22(1)(b), "R.Number" (second blank on the same
    line)
  - `TextField1[5]` → item 22(2)(a), "Parent's Identity card Number"
  - `TextField1[6]` → item 22(2)(b), "Passport number" (parent's)
  - `TextField1[7]` → item 22(2)(b), "R. Number" (parent's, second blank)
  - `TextField1[8]` → item 22(3), "Certificate of registration or
    naturalization Certificate Number"
  - `TextField1[9]` / `TextField1[10]` → item 22(4), "Any other Document"
    (two consecutive blank lines — modelled as description + number)
  - `TextField4[0]` → item 23, "Tarehe (Date)" (the date half of the
    "Sahihi …… Tarehe ……" signature/date line; no widget exists for the
    signature half itself, so it is not modelled as a field, consistent with
    this registry's general practice of not treating raw signature capture
    as a data field)

  All 33 widgets are accounted for by this mapping; no widget is left
  unexplained and no printed item is claimed to have a widget it does not.
- **Confirmed no-widget regions** (i.e. genuinely out of scope, not merely
  deprioritized): the pre-printed "REG. 136C SERIAL NUMBER" /
  "FINGERPRINT CLASSIFICATION" header block; the "RIGHT/LEFT HAND THUMB
  PRINT (official use)" boxes; the entire item 24 witness block (name,
  ID/passport no., address, signature/date); the "FOR OFFICIAL USE ONLY"
  block (items 25–26: identifying officer, registration officer, office of
  issue, both official stamps). `getAnnotations()` returns zero widgets
  anywhere in these regions, confirmed independently rather than inferred
  from the section headings alone.

### Source 3 — legal-currency and administering-body check

- Confirmed via fresh web search that the **Registration of Persons Act,
  Cap. 107**, and the **Registration of Persons Rules, 2024** (published on
  `interior.go.ke`) both remain in force in 2026, and that a 2026 Legal
  Notice (No. 76, Registration of Persons (Amendment) Rules, 2026) actively
  amends this same instrument (an ID-replacement fee waiver extended through
  October 2026) — i.e. the underlying legal instrument is actively
  maintained, not dormant.
- Confirmed the **National Registration Bureau (NRB)** is the current
  administering body via a direct, live fetch of `https://usajili.go.ke/nrb`
  (HTTP 200) and `https://interior.go.ke` (HTTP 200, redirected from
  `www.interior.go.ke`) — NRB sits under the **State Department for
  Immigration and Citizen Services**, within the **Ministry of Interior and
  National Administration** (Executive Order No. 2 of 2023).
- `kenyalaw.org`'s consolidated Registration of Persons Rules reference
  "Form Reg. 136A/B/C" by name in their schedules; a direct fetch of
  `new.kenyalaw.org` for the full schedule text returned **HTTP 403** (WAF
  block) this cycle — disclosed as a limitation, consistent with the same
  WAF behaviour this registry's `ke/brs` schema (GOV-2493) already recorded
  against the same host.

## Field inventory and scoping/disclosure decisions

- **`existingIdCardNumber`** (the unlabelled field above item 1) is modelled
  as **optional**, on the reading that this single form serves both
  first-time applicants (who leave it blank) and applicants replacing a
  previously issued card (who enter their existing number). The form's own
  text never uses the words "replacement" or "first-time" — this is an
  inference from the field's position and NRB's general dual-purpose framing
  of this process, not a printed instruction, and is disclosed as a judgment
  call rather than presented as a literal quote from the source.
- **`maritalStatus`** (item 6) is modelled as free-text `string`, not
  `enum`, because the source prints only a blank line with no candidate
  values — inventing an enum not present on the source would violate
  source-fidelity (SPEC.md §3 principle 2).
- **Item 22's "(TICK WHERE APPLICABLE)" instruction has no corresponding
  checkbox/radio widget** — confirmed independently (all 33 widgets are `Tx`
  type, 0 are `Btn`). The five alternative supporting-evidence reference
  numbers (birth certificate; passport [+ its own undefined "R.Number"];
  parent's ID card; parent's passport [+ its own "R. Number"]; certificate of
  registration/naturalization; any other document) are each modelled as
  independently **optional** string fields, with the "at least one of these
  must be supplied" requirement captured instead at the `documents[]` level
  (`supportingIdentityDocument`, `category: identity-document`,
  `required: true`, `acceptedTypes` enumerating the five alternatives). The
  spec's `exclusivityGroups` (§8.4) does not fit here (boolean fields only),
  and `crossFieldValidation`'s `requirePresent` (§8.3) needs a triggering
  `when` condition rather than expressing "at least one of N independently
  optional fields" — so this "at least one" constraint is disclosed in prose
  (in `schema.json`'s own `verification.notes` and here) rather than encoded
  as a machine-checkable rule.
- The two "R.Number"/"R. Number" fields (next to the passport-number blanks,
  applicant's and parent's) are modelled with a plain description stating the
  form itself does not define what they are, rather than guessing a meaning
  (e.g. "refugee number" or "registration number") not stated on the source.
- `applicantDeclaration` (`documents[]`, `category: attestation`) quotes item
  23's certification text verbatim in both languages as printed:
  "Nathibitisha kuwa maelezo yote niliyoyatoa Ni ya kweli. (I certify that
  all the information I have given is correct.)"

## Conformance run

Two mock conformance fixtures were built against `schema.json` with a
from-scratch, ajv-free checker script (evaluates `required`/`requiredWhen`,
per-type `validation` keywords, and `documents[]` `required`/`requiredWhen`
directly against the meta-schema's own rules) — not any author-provided
tooling, since no shared `tools/conformance-runner.mjs` exists yet in this
repo:

- `first-time-unmarried-applicant-birth-certificate.json` — an unmarried
  first-time female applicant in Kisumu County, supporting evidence = birth
  certificate. **0 errors.**
- `replacement-married-applicant-parent-id-and-passport.json` — a married
  female applicant in Nyeri County replacing an existing card, with husband's
  details, supporting evidence = parent's ID + passport (exercising the
  optional husband/parent/passport-R.Number fields together). **0 errors.**

Four mutation-control fixtures, each a single deliberate violation of the
first valid fixture, each correctly raised **exactly 1 error**:

- `mutation-control-missing-required-field.json` — removes `occupation`
  (required) → 1 error.
- `mutation-control-email-pattern-violation.json` — sets `email` to
  `"not-an-email"` → 1 error (pattern violation).
- `mutation-control-missing-required-document.json` — omits the
  `applicantDeclaration` document → 1 error.
- `mutation-control-sex-enum-violation.json` — sets `sex` to `"unspecified"`
  (not in the `["male","female"]` enum) → 1 error.

`node tools/validate.mjs` and `node tools/validate-ajv.mjs` (JSON Schema
draft 2020-12 meta-schema conformance) both pass clean for
`registry/ke/nrb/application-for-identity-card/1.0.0/schema.json`.

## Backlog note

Kenya now stands at **2 of 6 verticals** (Business Formation, National ID);
Passport, DMV, and Visa are confirmed dead ends per the scouting summary
above (not to be re-screened absent a material change, e.g. a new
unauthenticated specimen appearing). **Taxes (KRA's IT1 individual resident
return, `kra.go.ke`, a genuine, currently-maintained, richly structured
Excel workbook)** is flagged as the strongest ready-to-author backlog
candidate for a future cycle.
