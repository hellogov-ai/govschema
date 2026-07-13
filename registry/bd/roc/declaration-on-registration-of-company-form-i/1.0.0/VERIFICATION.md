# Verification record — `bd/roc/declaration-on-registration-of-company-form-i` v1.0.0

This file is the **source-review record** for this document version, per the
`manual-source-review-v1` practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-13`
- **`maturity.level`:** `structural-reference`

This is GovSchema Standard Research cycle **GOV-2687**. It opens
**Bangladesh's Business Formation vertical (5 of 6)**, using the Registrar of
Joint Stock Companies and Firms' (RJSC) "Form-I: Declaration on Registration
of Company", filed under section 25(2) of the Companies Act, 1994. Bangladesh
previously had four published verticals (Taxes —
`bd/nbr/individual-income-tax-return-form-it-11ga`; DMV —
`bd/brta/motor-vehicle-registration-application`; Passport —
`bd/dip/e-passport-application-form`; Visa —
`bd/dip/machine-readable-visa-application-form`). A sibling cycle, GOV-2688,
is authoring Bangladesh's National ID vertical in parallel; per that cycle's
own PR status at the time of this writing it had not yet merged to `main`, so
this document's own description says "5 of 6", not "6 of 6".

## Source verification (independently re-derived, not copied from the task briefing)

- **Forms-listing page:**
  `https://roc.gov.bd/pages/forms/6922d9b8933eb65569dffa1c` — independently
  re-fetched this cycle via
  `curl -sk -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"`
  (TLS certificate verification fails on this host by default, the same
  pattern already seen for BRTA/DIP elsewhere in this registry): **HTTP 200**,
  `Content-Type: text/html; charset=utf-8`, **110,032 bytes**. The page's own
  `<title>`/`og:site_name` read "কোম্পানি/বাণিজ্য সংগঠন | ফরম | যৌথমূলধন
  কোম্পানি ও ফার্মসমূহের পরিদপ্তর" — "Company/Trade Organization | Forms |
  Registrar of Joint Stock Companies and Firms" — confirming the issuing
  agency and this being its own (first-party) forms portal, not a
  third-party mirror. The PDF is linked from a chip literally labeled
  `ফরম-I` ("Form-I"), alongside sibling chips `ফরম-III`, `ফরম-IX`, `ফরম-XII`,
  etc., each pointing at the same object-storage host.
- **PDF source:**
  `https://objectstorage.ap-dcc-gazipur-1.oraclecloud15.com/n/axvjbnqprylg/b/V2Ministry/o/office-roc/2024/12/7010afce4927436495e26e4e85703678.pdf`
  — fetched independently this cycle via the same insecure-TLS `curl`
  invocation (this object-storage host also fails default certificate
  verification):
  - **HTTP 200**, `Content-Type: application/pdf`, **83,237 bytes** —
    matches the task briefing's own cited size exactly, independently
    re-derived.
  - **`sha256`:**
    `de10f506139c9c38984a7f68843eef151647c072e86b2d54b0cbbf8d6deceff7`
    (computed via `sha256sum` on the freshly-downloaded file).
  - `content-md5` response header: `BA+wr7YLJPZXXIzrBbNMWA==`, `last-modified:
    Mon, 05 Jan 2026 16:51:06 GMT`, `etag:
    4885234d-7441-44ab-8566-075147a79cc8` — captured here to anchor a future
    re-verification diff.
- **Secondary cross-check (legacy 2003-era HTML mirror):**
  `https://app.roc.gov.bd/Guidlines/Download/reg_form_i.html` — HTTP 200,
  `text/html`, 7,590 bytes (the plain `http://` URL 302-redirects to this
  `https://` one). Its plain-text content was diffed word-for-word against
  the PDF's own extracted text layer (below) and **matches exactly**,
  including every blank-line's printed length and the footnote "* Strike out
  the portion which does not apply" — corroborating that RJSC's current
  print-and-fill specimen is textually unchanged from the pre-rebuild-era
  form, and giving independent confidence the pdfjs-dist extraction below is
  complete and accurate.

## PDF structure, independently confirmed via `pdfjs-dist@4` (legacy build)

- **1 page.**
- `getFieldObjects()` returns **`null`** and `page.getAnnotations()` returns
  an **empty array** — genuinely **zero AcroForm/Widget annotations**. This
  is a static print-and-fill specimen, not an interactive form, consistent
  with this registry's existing `bd/brta` and `bd/nbr` Bangladesh schemas
  (as opposed to `bd/dip`'s two AcroForm-based schemas).
- `getTextContent()` returned a full, clean, English-only text layer on the
  form's single page. Every position (`x`,`y` from each item's transform) was
  captured and the items sorted into reading order (descending `y`, then
  ascending `x`) to reconstruct the form's own layout, reproduced in full
  below:

```
Form - I
Declaration on Registration of Company
THE COMPANIES ACT, 1994
(See Section 25)

Name of the Company ________________________________________________________

Declaration of compliance with the requirements of the companies act, 1994 made
pursuant to section 25 (2) on behalf of a company proposed to be Registered as the
___________________________________________________________________________

Presented for filing by _____________________________________________________

I, _______________________________ of _________________________________
____________________________________________________________________________
do solemnly and sincerely declare that I am an Advocate* / Attorney/ A Pleader
entitled to appear before High Court who is engaged in the formation of the company/ a
person named in the Articles as a Director/ Manager/ Secretary of the
____________________________________________and and that all the requirements of
the Companies Act, 1994 in respect of matters precedent to the registration of the said
company and incidental there to have been complied with, save only the payment to
the fees and sums payable on registration and I make the solemn declaration
conscientiously believing the same to be true.

                                                                        Signature

Note: The declaration need not to be-
  (a) Signed before a magistrate or an officer competent to administer others or
  (b) Stamps as a affidavit

________________________________________________________________________________

* Strike out the portion which does not apply
```

(The trailing blank line immediately above the final footnote is a printed
horizontal rule/separator, not a labeled blank — it carries no adjacent label
of its own anywhere in the text layer, unlike every other blank on the form,
so it is not modeled as a field.)

## Field derivation and a disclosed judgment call: two unconditional company-name mentions merged; a third, conditional one kept separate

The form's header blank labeled "Name of the Company" is the same
underlying fact — the company's proposed name — that the declarant is asked
to write out again in the declaration's opening sentence, **before** the
declarant-capacity strike-out clause (see next section) begins:

1. Header: `"Name of the Company ________"`.
2. Mid-paragraph, still part of the unconditional opening sentence:
   `"...on behalf of a company proposed to be Registered as the ________"`.

Both are modeled as **one** `companyName` field, citing both locations in
its `sourceRef` — modeling them as two separate fields would fabricate
redundant data the source itself does not distinguish (the declarant is not
being asked two different questions; both blanks are filled regardless of
which declarant-capacity branch is later selected).

A **third** mention of the company name appears later, *inside* the
declarant-capacity strike-out clause's officer branch: `"...as a Director/
Manager/ Secretary of the ________ and that all the requirements..."`. This
one is **not** merged into `companyName`, because — unlike the first two —
it is conditional: a declarant who strikes down to the Advocate/Attorney/A
Pleader branch strikes out this entire clause, blank included, so nothing is
written there in that case. This is modeled as its own field,
`declarantCompanyName`, gated `requiredWhen` `declarantCapacity` is one of
`DIRECTOR`/`MANAGER`/`SECRETARY` (see the next section for the full
strike-out derivation). In the source PDF, this blank is immediately
followed by the word "and" twice in succession (`"..._____ and and that all
the requirements..."`) — independently confirmed via this cycle's own
position-sorted text-layer extraction (reproduced in full above) to be a
verbatim artifact of the source form itself, not a transcription error on
this schema's part.

This three-way split (two unconditional mentions merged, one conditional
mention kept separate and `requiredWhen`-gated) was arrived at by re-reading
the sentence structure directly: "I am an Advocate/Attorney/A Pleader...
engaged in the formation of **the company**/ a person named in the Articles
as a Director/Manager/Secretary **of the [BLANK]**" — the first branch's
"the company" is a fixed generic reference (the company was already named
above), while the second branch's blank is where that branch specifically
re-names the company. Modeling all three mentions as one field, as an
earlier draft of this schema did, would have made the field unconditionally
`required: true` and inaccurately implied every declarant fills that third
blank regardless of capacity — corrected before this v1.0.0 was finalized.

## Field derivation: declarant capacity, expressed only via a strike-out instruction

The core of the declaration reads: "...I am an **Advocate\*** / **Attorney**/
**A Pleader** entitled to appear before High Court who is engaged in the
formation of the company/ a person named in the Articles as a **Director**/
**Manager**/ **Secretary** of the [company] and that all the requirements...".
There is no checkbox, radio button, or blank attached to this clause — the
form's own footnote ("\* Strike out the portion which does not apply")
instructs the declarant to physically cross out every option that does not
apply, leaving exactly one surviving title. This is modeled as a single
closed `declarantCapacity` enum of the six titles offered (`ADVOCATE`,
`ATTORNEY`, `PLEADER`, `DIRECTOR`, `MANAGER`, `SECRETARY`), the same class of
exception this registry already uses for a printed option list with no
dedicated widget (e.g. `bd/dip/e-passport-application-form`'s `gender`
field, corroborated by its own printed Bengali parenthetical listing three
options with no checkbox).

## Required-field policy: no printed asterisks anywhere on this form

Unlike `bd/dip`'s two AcroForm-based Bangladesh schemas (which cite specific
printed asterisks per item), this one-page static form carries **no printed
asterisk or other explicit required-field marker anywhere** — not even next
to "Advocate\*", whose asterisk is a footnote reference to the strike-out
instruction, not a required-field marker. Per this registry's own
established policy (never fabricate `required: true` without a source
marker or unconditional necessity), `required: true` is applied only to the
four fields that are **unconditionally essential to any submission of this
specific declaration**:

- `companyName` — the declaration is legally about a specific company; it is
  meaningless without one.
- `declarantName` — a declaration with no identified declarant is not a
  declaration.
- `declarantAddress` — printed directly beside the declarant's name in the
  same "I, [name] of [address]" clause, with no lesser status implied.
- `declarantCapacity` — the declaration's entire substance is the
  declarant's assertion of one specific capacity; without it, the sentence
  is grammatically and legally incomplete.

A fifth field, `declarantCompanyName`, is **conditionally** required
(`requiredWhen` `declarantCapacity` is `DIRECTOR`/`MANAGER`/`SECRETARY`) —
see "Field derivation" above for why this particular company-name mention,
unlike the other two, does not apply uniformly across both declarant-capacity
branches.

`presentedBy` ("Presented for filing by") is modeled as **optional**: it
identifies who submits the paperwork to RJSC (which, in practice, may be a
lawyer, filing agent, or the promoter, and is not necessarily the declarant),
a procedural detail separate from the substantive declaration itself, and —
unlike the fields above — it is not cross-referenced or repeated anywhere
else on the form. This is a disclosed judgment call: a future reviewer with
more direct knowledge of RJSC's actual filing-desk practice may reasonably
conclude it should be required instead.

## The "need not be sworn/stamped" note is not a requirement

The form's own closing note — "The declaration need not to be- (a) Signed
before a magistrate or an officer competent to administer others or (b)
Stamps as a affidavit" — is read as a **formality reduction** RJSC grants
this particular declaration relative to an ordinary sworn affidavit (no
magistrate attestation, no stamp duty), not an additional applicant
requirement. It places nothing on the applicant to model as a field or
`documents[]` entry, and is disclosed in the schema's own top-level
`description` rather than encoded.

## `documents[]`: the declaration's own attestation

The declaration's substantive attestation language (everything from "I do
solemnly and sincerely declare..." through "...conscientiously believing the
same to be true") is modeled as a single `documents[]` entry,
`declarationAttestation` (`category: attestation`, `required: true`,
`belongsTo: responsible-party`), with `statement` quoting the paragraph's
boilerplate verbatim (the blanks already captured by
`companyName`/`declarantCapacity`/`declarantCompanyName` are represented in
`statement` by the fixed wording around them, per this registry's existing
`bd/dip` precedent for the same construct). `belongsTo` is set to
`responsible-party` rather than `applicant`: the declarant attests *on
behalf of* the company being formed (and, in the Advocate/Attorney/Pleader
branch, may not be affiliated with it at all beyond handling its formation),
rather than being "the applicant" in their own right the way, e.g., a
passport applicant declaring their own application's accuracy is.

## Scoping decision: Form I only, not the full registration package

RJSC's forms portal hosts several companion forms filed as part of the same
company-registration package — notably **Form IX** (Consent of Director to
Act) and **Form XII** (Particulars of Directors/Manager/Managing Agents) —
via the identical object-storage hosting pattern (confirmed present on the
same listing page this cycle, both HTTP-reachable). Per the task's own
scoping guidance, this v1.0.0 is limited to **Form I** alone, since it is the
`section 25` declaration that most directly represents "the declaration a
promoter/director files to register a company" and is not trivially small
enough, together with the others, to obviously constitute one single filing
action modeled as one schema. Forms IX and XII (and any others on the same
listing) are flagged here as companion-schema candidates for a future
cycle, mirroring this registry's established companion-schema pattern (e.g.
the CH-ZH Hilfsblatt series, the GR AADE Ε1/Ε2/Ε3 forms).

## Language

`process.language` is set to `en`: the form's text layer is entirely
English, with no Bengali on this particular specimen (distinguishing it from
`bd/dip`'s two bilingual schemas). `process.type` is set to `registration`,
matching the form's own title ("Declaration on **Registration** of
Company").

## Conformance run

Two hand-authored valid fixtures under
`conformance/bd/roc/declaration-on-registration-of-company-form-i/1.0.0/`:

- **`valid-advocate-declarant.json`** — an advocate declarant (`ADVOCATE`),
  with `presentedBy` populated, `declarantCompanyName` correctly left absent
  (not required for this branch).
- **`valid-company-secretary-declarant.json`** — a company-officer declarant
  (`SECRETARY`), with `presentedBy` left absent (optional field) and
  `declarantCompanyName` populated, exercising both that field's own
  optionality and `declarantCompanyName`'s `requiredWhen` gate firing
  correctly (present, as required, for this branch).

Both were checked with a from-scratch Node conformance checker
(`check_conformance.mjs`, not committed — a disposable script, per this
registry's own established practice) implementing this schema's own
`required`/`type`/`validation.{enum,pattern,minLength,maxLength}` grammar and
the `documents[].required`/`provided` rule directly against
`spec/v0.3/SPEC.md`'s rules:

```
$ node check_conformance.mjs schema.json \
    valid-advocate-declarant.json \
    valid-company-secretary-declarant.json
valid-advocate-declarant.json: 0 error(s)
valid-company-secretary-declarant.json: 0 error(s)
```

Six mutation-control fixtures, each isolated to raise **exactly one** error:

- **`mutation-control-missing-company-name.json`** — drops `companyName` (a
  static `required: true` field) from the advocate-declarant valid fixture.
- **`mutation-control-missing-declarant-name.json`** — drops `declarantName`.
- **`mutation-control-missing-declarant-address.json`** — drops
  `declarantAddress`.
- **`mutation-control-invalid-enum-declarant-capacity.json`** — sets
  `declarantCapacity` to `"LAWYER"`, not one of the enum's 6 values.
- **`mutation-control-missing-declaration-attestation.json`** — sets the
  `declarationAttestation` document entry's `provided` to `false`, isolating
  the `documents[].required` violation with every field otherwise valid.
- **`mutation-control-missing-conditional-declarant-company-name.json`** —
  starts from the company-secretary valid fixture and drops only
  `declarantCompanyName`, isolating the `requiredWhen` violation (since
  `declarantCapacity` is still `SECRETARY`).

```
$ node check_conformance.mjs schema.json \
    mutation-control-missing-company-name.json \
    mutation-control-missing-declarant-name.json \
    mutation-control-missing-declarant-address.json \
    mutation-control-invalid-enum-declarant-capacity.json \
    mutation-control-missing-declaration-attestation.json \
    mutation-control-missing-conditional-declarant-company-name.json
mutation-control-missing-company-name.json: 1 error(s)
  - companyName: required but missing
mutation-control-missing-declarant-name.json: 1 error(s)
  - declarantName: required but missing
mutation-control-missing-declarant-address.json: 1 error(s)
  - declarantAddress: required but missing
mutation-control-invalid-enum-declarant-capacity.json: 1 error(s)
  - declarantCapacity: value "LAWYER" not in enum ["ADVOCATE","ATTORNEY","PLEADER","DIRECTOR","MANAGER","SECRETARY"]
mutation-control-missing-declaration-attestation.json: 1 error(s)
  - documents.declarationAttestation: required but not provided
mutation-control-missing-conditional-declarant-company-name.json: 1 error(s)
  - declarantCompanyName: required but missing
```

All six negative controls raised exactly one error each, and neither valid
scenario raised an unexpected error.

Both registry validators were run against the schema document and pass:

```
$ node tools/validate.mjs registry/bd/roc/declaration-on-registration-of-company-form-i/1.0.0/schema.json
ok   registry/bd/roc/declaration-on-registration-of-company-form-i/1.0.0/schema.json
1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/bd/roc/declaration-on-registration-of-company-form-i/1.0.0/schema.json
ok   registry/bd/roc/declaration-on-registration-of-company-form-i/1.0.0/schema.json [v0.3]
1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

(`tools/node_modules` did not have `ajv`/`ajv-formats` present in this
worktree at the start of this cycle; ran `npm ci --include=dev` inside
`tools/` first, per this registry's own known `NODE_ENV=production` gotcha.)

`tools/govschema-client/registry-index.json` was regenerated via
`npm run build-index` inside `tools/govschema-client/`.

## Scope and jurisdiction notes

- Opens Bangladesh's **Business Formation vertical (5 of 6)**; Taxes, DMV,
  Passport, and Visa are already published. National ID is being authored
  in parallel this same cycle by a sibling issue, GOV-2688 — not claimed
  done here unless/until its own PR is confirmed merged to `main`.
- `jurisdiction.level` is `national` — RJSC is Bangladesh's national company
  registrar.
- `process.type` is `registration`; see "Language" above for the
  `process.language: en` judgment call.
- Companion candidates for a future cycle: (1) RJSC's Form IX (Consent of
  Director to Act) and Form XII (Particulars of Directors/Manager/Managing
  Agents), both hosted via the same object-storage pattern as this form and
  filed as part of the same company-registration package; (2) Bangladesh's
  remaining National ID vertical, if GOV-2688's parallel effort does not
  complete it first.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-13** (6
months). A future review should prioritize: (1) confirming the
object-storage-hosted PDF has not been silently replaced with a revised
edition (this cycle captured its `last-modified: Mon, 05 Jan 2026 16:51:06
GMT` header and `etag` to anchor a future diff); (2) whether Forms IX/XII
should be authored as companion schemas; (3) re-confirming GOV-2688's
National ID vertical has landed, so Bangladesh's Executive Summary entry and
CATALOG.md can be updated from "5 of 6" to "6 of 6" once true.
