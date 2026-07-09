# Verification record — `jp/j-lis/individual-number-card-issuing-application` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-09`
- **`maturity.level`:** `structural-reference`

## Why this candidate, this cycle

This is the recurring "GovSchema Standard Research" cycle (GOV-2012). Rather
than treat the issue's own generic phased brief as a literal todo list (the
established pattern for this recurring issue in prior cycles, e.g. GOV-1765
and GOV-2005), this cycle re-scanned `CATALOG.md`'s Known Gaps section fresh. Item 6
(recorded by the immediately preceding cycle, GOV-2005) had already screened
Japan's Business Formation and National ID verticals and flagged two specific,
live, genuine candidates it did not pursue:

- Business Formation: `houmukyoku.moj.go.jp/homu/content/001331002.pdf`
  (株式会社設立登記申請書 — Stock Company Establishment Registration
  Application, Legal Affairs Bureau) — Japanese-only, no AcroForm, rich
  extractable text layer.
- National ID: `kojinbango-card.go.jp/hpsv/wpmng/documents/tegaki-kofu-shinseisho-en.pdf`
  (個人番号カード交付申請書 — Individual Number Card Issuing Application) —
  officially bilingual Japanese/English, no AcroForm, rich extractable text
  layer plus an annotated field-by-field instructions page.

This cycle picked the **National ID** candidate over the Business Formation
one for the same reason GOV-2005 picked the Certificate of Eligibility over
both: it is officially bilingual on the same government-published page,
removing translation-fidelity risk entirely, whereas the Legal Affairs
Bureau's incorporation form is Japanese-only. It is also a shorter, more
tightly bounded single self-contained form (one generic two-page application,
no category-variant fan-out), a better fit for a `1.0.0` (not `0.1.0`) release
than a partial cover sheet would be.

## Sources examined

- **Document `(id, version)`:** `jp/j-lis/individual-number-card-issuing-application` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Japan Agency for Local Authority Information Systems
  (地方公共団体情報システム機構, J-LIS) — the special local-authority-joint
  administrative body responsible for the Individual Number Card system
  nationwide (`kojinbango-card.go.jp`).
- **Primary field-by-field source (fetched live, HTTP 200):**
  <https://www.kojinbango-card.go.jp/hpsv/wpmng/documents/tegaki-kofu-shinseisho-en.pdf>
  — 個人番号カード交付申請書 兼 電子証明書発行/更新申請書【手書用】,
  the Japanese/English bilingual, generic (non-personalized), handwritten
  application form. 2 pages: page 1 is the application itself; page 2 is an
  annotated instructions/example page (記入例) with a fully filled-in sample
  (applicant "ZHANG YULIAN") that doubles as this document's worked-example
  source.
- **Linking/listing page (fetched live, HTTP 200), confirming this is J-LIS's
  own official generic download, not an orphaned or superseded asset:**
  <https://www.kojinbango-card.go.jp/download/> (交付申請書等ダウンロード —
  "Application form downloads") lists this same PDF alongside 10 other
  language editions of the identical form (Japanese-only, Chinese Simplified,
  Chinese Traditional, Korean, Portuguese, Spanish, Vietnamese, Thai,
  Tagalog, Indonesian, Nepali) — all sharing the same `tegaki-kofu-shinseisho-*`
  filename stem, confirming a single canonical form translated into multiple
  languages rather than several distinct forms.
- **Retrieved / reviewed:** 2026-07-09.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial
  authoring source review).

### Bot-mitigation note

`kojinbango-card.go.jp` fronts different paths inconsistently. The bilingual
PDF cited above and the `/download/` listing page both returned HTTP 200 to a
plain default-`curl` request, a browser `User-Agent`, and this repository's
own `tools/verify-sources.mjs` `User-Agent`
(`GovSchema-source-verifier/1 (+https://github.com/hellogov-ai/govschema)`)
on first fetch this cycle — no bot mitigation observed on either URL,
unlike `moj.go.jp`'s curl-UA-specific 403 (GOV-2005). Two related paths were
found gated regardless of User-Agent: the pure-Japanese-only edition of the
same form (`tegaki-kofu-shinseisho.pdf`, both at the `hpsv/wpmng/documents/`
and `hpsv/wpmng/assets/pdf/download/` locations) and the site's own
`apprec/apply/mail_apply/` walkthrough page each returned an Incapsula
self-redirect (`HTTP 307`/`302` to the identical URL, with fresh
`visid_incap_*`/`incap_ses_*` cookies set each time) — a bot-challenge gate,
not a 403 block. Neither was needed as a source, since the bilingual EN PDF
(this document's citation) and the `/download/` listing page were sufficient
and returned clean 200s. Repeated rapid re-fetching of the bilingual PDF
during this same review session (roughly a dozen requests within a few
minutes, while cross-checking headers and re-running `verify-sources.mjs`)
did eventually trigger the same Incapsula redirect on that URL too partway
through this session — i.e. this looks like a request-rate trigger on an
otherwise unblocked path, not a permanent per-URL block. Re-fetching after a
pause returned HTTP 200 again. A reviewer re-running `verify-sources.mjs`
immediately after many other fetches against this same host in a short window
should expect to see transient `WARN`s and simply retry after a short pause
rather than treat it as a new dead end.

## Extraction method

The source PDF has no AcroForm/Widget layer (it is `【手書用】`, "for personal
handwriting," matching the DMV-family pattern in this registry's other
handwritten-only sources) — confirmed via `pdfjs-dist`-equivalent rendering:
the `Read` tool renders the PDF's own text/image content directly and
reproduced every printed row label, checkbox glyph, and the full page-2
instructions annotations without any garbling, consistent with a genuine
extractable text layer rather than a scanned image. Page 2's own filled-in
sample ("記入例") shows the exact same layout as page 1 with example values
overlaid and green annotation call-outs explaining each row — used directly
as this document's worked-example source (see "Mock-data test run" below).

## What page 1 maps to

- **個人番号 (ID Number)** → `individualNumber`, a required 12-digit code;
  the form's own footnote states this field is mandatory because an error
  here can misdirect card issuance. Modelled with a `^[0-9]{12}$` pattern
  (the sample shows `1234 5678 9012`, spaced for readability on the printed
  form but a plain 12-digit sequence).
- **氏名 (Name)** → `fullName`.
- **住所 (Address)** → `address`, one free-text block (no structured
  street/city/postal-code sub-boxes on this row).
- **生年月日 (Date of Birth)** → `dateOfBirth`.
- **性別 (Gender)** → `gender`, a binary 男・女 (Male/Female) choice.
- **旧氏又は通称 (Previous last name or Nickname (Appellation))** →
  `previousNameOrNickname`, optional — the form's own footnote ※3 states
  this only applies to applicants who have already separately registered a
  previous surname or nickname on their Certificate of Residence.
- **電話番号 (Phone Number)** → `phoneNumber`, modelled as optional. The
  form's footnote ※4 uses advisory language ("if the information is
  insufficient, you may be contacted") rather than the explicit "mandatory"
  language used for `individualNumber`, so this is a judgment call disclosed
  here rather than assumed required.
- **外国人住民の区分 (Foreign Residency Status)** → `foreignResidencyStatus`,
  optional (Japanese-national applicants leave it blank), a 6-value enum
  reproduced verbatim from the form's own instructions-page gloss.
- **点字 (Braille Type)** → `requestBraille`, a boolean opt-in checkbox. The
  form does not ask the applicant to separately write braille text; J-LIS
  transcribes the furigana/katakana name already on file into braille once
  this box is checked (per the form's own ※5 footnote), so no separate
  braille-text field is modelled.
- **在留期間等満了日の有無 / 在留期間等満了日 (Residency expiry date
  available or not / Residency expiry date)** → `hasResidencyExpiryDate`
  (boolean) and `residencyExpiryDate` (date, `requiredWhen`
  `hasResidencyExpiryDate` is `true`) — applies only to foreign residents
  whose residence card itself shows an expiration date.
- **申請日 (Application)** → `applicationDate`.
- **申請者氏名 (Applicant's Name)**, in the declaration/signature block
  below the certification statement → `applicantSignatureName`, a distinct
  printed box from `fullName` above (the declaration reads: "I herein certify
  the statement in this document is true and correct... I request to apply
  for an Individual Number Card and Digital Certificate"), required to be
  completed by the applicant personally per the instructions page ("Requires
  to be signed by the applicant Himself/herself").
- **署名用電子証明書 / 利用者証明用電子証明書 (Electronic certificate of
  the bearer's signature / Electronic certificate of user proof)** →
  `declineSignatureCertificate` / `declineUserAuthenticationCertificate`,
  both optional booleans. Both certificates are issued by default; the form's
  instruction is to black out the printed □ box only to opt **out** — so
  these are modelled as decline flags, not "please issue" flags, matching the
  form's own default-opt-in framing.
- **代理人記載欄 (Statutory Representative)** — ふりがな, 代理人氏名,
  本人との関係, 代理人住所, 電話番号 → `representativeFurigana`,
  `representativeName`, `representativeRelationToApplicant`,
  `representativeAddress`, `representativePhoneNumber`, all modelled as
  optional. The form states this section is completed "when the bearer
  [is] under the age of 15 years, or adult ward," but prints no separate
  checkbox marking that condition — it is inferred from context (the
  applicant's own age, derivable from this document's `dateOfBirth`, or
  adult-guardianship status, which no field on this form captures). Rather
  than invent a synthetic discriminator field with no printed counterpart on
  the source (a firmer stance than `requiredWhen` can honestly express here),
  this is disclosed as a scope decision: each representative field's own
  `description` states the real-world condition, and a consuming agent
  combines that with its own knowledge of the applicant's age/guardianship
  status.
- **The photo box** printed directly on page 1 (4.5cm × 3.5cm, with the full
  photo specification — recency, framing, lighting — printed on page 2) →
  `documents[].applicantPhoto`.

## What is NOT modelled (out of scope), and why

- **The mailing/return-envelope process itself** (J-LIS's own downloadable
  address-label sheet for the reply envelope, mentioned on page 2) — a
  packaging/logistics artifact, not a data field of the application.
- **The photo's own physical-mounting instructions** (writing name/DOB on
  the back before pasting) — a physical-handling instruction, not a data
  field.
- **The Business Formation candidate** (Legal Affairs Bureau's stock-company
  incorporation registration application, `houmukyoku.moj.go.jp`) screened
  and flagged by the prior cycle (GOV-2005) but not pursued this cycle — see
  "Why this candidate, this cycle" above. Remains open for a future cycle.
- **Any of the other 10 language editions** of this same form (Japanese-only,
  Chinese, Korean, Portuguese, Spanish, Vietnamese, Thai, Tagalog,
  Indonesian, Nepali) — not opened or cross-checked field-by-field this
  cycle; the bilingual English edition cited above is the basis for this
  document. The `/download/` listing page confirms they share the identical
  filename stem and are presented as translations of one canonical form, not
  separately verified as byte-identical in layout.

## Mock-data test run

Per this registry's established practice, a one-off Node.js script (not
committed to the repo) checking every `type`/`required`/`requiredWhen`/
`validation` constraint in `schema.json` was run against three realistic
scenarios plus three negative controls:

```
OK   Scenario 1: foreign resident, first-time card application (source's own worked example)
OK   Scenario 2: Japanese-national applicant, simplest path
OK   Scenario 3: minor applicant with statutory representative
FAIL   Negative control 1: missing residencyExpiryDate when hasResidencyExpiryDate=true (expected FAIL)
    - MISSING required field: residencyExpiryDate
FAIL   Negative control 2: invalid gender enum value (expected FAIL)
    - INVALID enum value for gender: nonbinary
FAIL   Negative control 3: individualNumber not 12 digits (expected FAIL)
    - INVALID pattern for individualNumber: 12345
```

Scenario 1 reproduces the source's own page-2 worked example (applicant
"ZHANG YULIAN," a foreign resident, `foreignResidencyStatus:
mid-to-long-term-resident`, with a residence-card expiry date disclosed).
Scenario 2 is a Japanese-national applicant taking the simplest path — every
foreign-residency and representative field absent. Scenario 3 exercises the
statutory-representative section for a minor applicant. The three negative
controls confirm the check script actually enforces `requiredWhen` (correctly
reporting the missing `residencyExpiryDate` once `hasResidencyExpiryDate` is
`true`), `validation.enum` (correctly rejecting a `gender` value not in the
form's binary male/female choice), and `validation.pattern` (correctly
rejecting a non-12-digit `individualNumber`) rather than trivially passing
everything. No defects were found in the schema itself.

Both registry validators were run against the schema document and pass:

```
$ node tools/validate.mjs registry/jp/j-lis/individual-number-card-issuing-application/1.0.0/schema.json
ok   registry/jp/j-lis/individual-number-card-issuing-application/1.0.0/schema.json
1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/jp/j-lis/individual-number-card-issuing-application/1.0.0/schema.json
ok   registry/jp/j-lis/individual-number-card-issuing-application/1.0.0/schema.json [v0.3]
1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

Full-registry validation (313/313 including this document) and
`node tools/verify-sources.mjs registry/jp/j-lis/individual-number-card-issuing-application/1.0.0`
were both re-run clean immediately before opening this PR (see the bot-
mitigation note above for the one transient-`WARN` retry this host required).

## Scope and jurisdiction notes

- This is Japan's second document in the registry (after
  `jp/isa/certificate-of-eligibility-application`, GOV-2005), and its first
  in the National ID vertical — Japan now has **2 of its 6 verticals**
  (Visa, National ID). DMV and Passport are confirmed dead ends (GOV-2005);
  Business Formation remains an open, well-sourced backlog candidate (see
  above).
- Agency slug `j-lis` (Japan Agency for Local Authority Information Systems)
  is a new JP authority segment, distinct from `isa`; `jurisdiction.level` is
  `national` (J-LIS operates nationwide, not prefecturally).
- `id`/process slug `individual-number-card-issuing-application` uses
  English, the official English name the source itself prints for this form
  ("INDIVIDUAL NUMBER CARD Issuing Application").
- `version` set to `1.0.0`, unlike the prior JP document's `0.1.0`: this
  document models one complete, self-contained, generic application form in
  full (not a partial cover sheet of a larger multi-part process), the same
  basis this registry has used elsewhere for a `1.0.0` initial release (e.g.
  `ee/vm/long-stay-visa-application`).
- Conditional requiredness uses `requiredWhen` (GSP-0013), consistent with
  every other recent document in this registry.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-09** (6
months). A future review should prioritize the Legal Affairs Bureau's Stock
Company Establishment Registration Application (`houmukyoku.moj.go.jp`,
flagged above) as Japan's remaining open Business Formation candidate, and
consider whether any of this form's other 10 language editions reveal a
field this English edition's translation understated.
