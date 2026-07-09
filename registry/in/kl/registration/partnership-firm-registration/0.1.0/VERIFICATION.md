# Verification record — `in/kl/registration/partnership-firm-registration` v0.1.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-09`

The document was derived directly from Kerala's Registration Department's
own published Form I PDF, cross-read against the central Indian Partnership
Act, 1932's own text (Sections 4, 30, 58, 59, 71) fetched live from
indiacode.nic.in, and against the Kerala Partnership (Registration of Firms)
Rules, 1959. It remains `draft`, not `verified`.

## Candidate screening this cycle

This closes the India half of CATALOG.md's own Known Gaps section item 1
("sub-national/state ... Business Formation expansion" flagged open for
CA/NZ/IE/IN sole-trader/partnership/LLP formation). Ontario's own
sole-trader and general/limited-partnership halves of the same gap were
closed in prior cycles (GOV-1947, GOV-1953). This cycle targets India's
share: "Form I", the Indian Partnership Act's own statutory partnership
registration application (Section 58), located as published directly by
Kerala's Registration Department.

## Sources examined

- **Document `(id, version)`:** `in/kl/registration/partnership-firm-registration` / `0.1.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Registration Department, Government of Kerala — the
  Inspector General of Registration (IGR) acts as Registrar of Firms under
  the Indian Partnership Act, 1932 for the State of Kerala.
  <https://registration.kerala.gov.in/en/partnership-registration/>
  (fetched directly, HTTP 200; confirms "In these rules, 'Registrar' means
  the Registrar of Firms" and the IGR's role and contact details, and lists
  "Partnership firms" among the department's registration services).
- **Primary source (the form itself):** Form I, "See rules 3", THE INDIAN
  PARTNERSHIP ACT 1932, APPLICATION FOR REGISTRATION OF FIRM —
  <https://keralaregistration.gov.in/fileUploads/indianpartnershipact_form1.pdf>
  — a static, two-page, non-fillable PDF (no AcroForm/XFA layer; confirmed
  by `pdfjs-dist`'s `getTextContent()` returning ordinary positioned text
  runs, not form-field objects).
- **Fetch method and the legacy-TLS workaround (important for
  re-verification):** a direct fetch to `keralaregistration.gov.in` fails
  with a legacy-TLS error (`SSL routines::dh key too small`) — the server
  offers only a weak/legacy DH key exchange, not a bot/CAPTCHA/WAF gate.
  Two workarounds were used and confirmed this cycle:
  - `curl`: `curl -sk --ciphers 'DEFAULT@SECLEVEL=1' -A "Mozilla/5.0"
    "https://keralaregistration.gov.in/fileUploads/indianpartnershipact_form1.pdf"
    -o form1.pdf` → HTTP 200, 6406 bytes.
  - Node's global `fetch` (the same fetch `tools/verify-sources.mjs` uses
    internally) fails the identical TLS error by default, but succeeds when
    the process is started with `NODE_OPTIONS="--tls-cipher-list=DEFAULT@SECLEVEL=1"`
    set in the environment — confirmed this cycle with
    `NODE_OPTIONS="--tls-cipher-list=DEFAULT@SECLEVEL=1" node -e
    "fetch('https://keralaregistration.gov.in/fileUploads/indianpartnershipact_form1.pdf").then(...)"`,
    which returned HTTP 200 and the identical 6406-byte payload as the
    `curl` fetch. **A reviewer re-verifying this document's `source.url`
    with `tools/verify-sources.mjs` MUST run it with that same
    `NODE_OPTIONS` value set in the environment**, e.g.:
    `NODE_OPTIONS="--tls-cipher-list=DEFAULT@SECLEVEL=1" node
    tools/verify-sources.mjs registry/in/kl/registration/partnership-firm-registration/0.1.0`
    — without it, the live re-fetch fails with the TLS error (falling back
    to a Wayback-history check rather than a live 200) even though the
    citation is genuinely live and unauthenticated.
- **Field-extraction method:** the fetched PDF's bytes were loaded with
  `pdfjs-dist` (`legacy/build/pdf.js`, `getDocument()` +
  `page.getTextContent()` per page, joining each page's text-run `str`
  values) — a fresh extraction performed this cycle, not reused from any
  earlier session. Two pages recovered (`numPages: 2`). The extracted text
  matches the field content, section labels, partner-table structure, and
  the full N.B. footnote text quoted throughout this document and
  `schema.json` verbatim (character-for-character, modulo whitespace
  introduced by the row/column text-run join order — this is a static,
  fixed-layout PDF with a two-column address/signature block on page 1, so
  a naive left-to-right, top-to-bottom text-run join interleaves those two
  columns' words; every quoted phrase below was independently confirmed
  against the raw per-run text, not just the joined string, to rule out a
  join-order artifact changing a word's meaning).
- **Statutory cross-read:** THE INDIAN PARTNERSHIP ACT, 1932 (Act No. 9 of
  1932), consolidated text —
  <https://www.indiacode.nic.in/bitstream/123456789/19863/1/indian_partnership_act_1932.pdf>
  — fetched directly (HTTP 200, 339326 bytes), extracted the same way with
  `pdfjs-dist` (26 pages). Sections read in full: 4 (definition of
  "partnership"/"partner"/"firm"), 30 (minors admitted to the benefits of
  partnership), 58 (application for registration), 59 (registration), and
  71 (power to make rules). Exact quotes are reproduced in the scope
  decisions below.
- **State rules cross-read:** the Kerala Partnership (Registration of
  Firms) Rules, 1959, Rule 3 ("Form and verification of statements under
  sections 58 & 60") — confirmed via a live fetch of
  <https://www.legitquest.com/act/the-kerala-partnership-registration-of-firms-rules-1959/DF2F>,
  which quotes Rule 3 as: "The statement submitted to the Registrar under
  sections 58 and 60 of the Act shall respectively be in Forms I and II
  annexed to these rules together with the fees specified in those forms
  and shall be verified in the manner indicated therein." This corroborates
  Form I's own printed heading, "FORM 'I' (See rules 3)".
- **Retrieved / reviewed:** 2026-07-09.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial
  authoring source review).

## Scope decision 1 — jurisdiction/directory path: sub-national (Kerala), not central

**Decision:** `in/kl/registration/partnership-firm-registration`,
`jurisdiction.subdivision: IN-KL`, `jurisdiction.level: subnational`.

**Reasoning.** The Indian Partnership Act, 1932 is a central statute
(applies to "the whole of India", Section 1(2)), but Section 71 expressly
delegates rule-making for the registration process to each **State
Government**:

> "71. Power to make rules. — (1) The State Government may by notification
> in the Official Gazette make rules prescribing the fees which shall
> accompany documents sent to the Registrar of Firms... (2) The State
> Government may also make rules — (a) prescribing the form of statement
> submitted under section 58, and of the verification thereof..."

This is exactly what happened in Kerala: the Kerala Partnership
(Registration of Firms) Rules, 1959, made under this Section 71 power,
prescribe Form I itself ("Rule 3... shall respectively be in Forms I and
II annexed to these rules") and Kerala's own Registrar of Firms is the
state's Inspector General of Registration, not a central official.
Confirming the hypothesis further, the Act's own "STATE AMENDMENT" notes
throughout Chapter VII (see the extracted Act text) show multiple states
(Goa, Rajasthan, Uttarakhand, Maharashtra, Karnataka) independently amending
or substituting their own Section 58/59/59A/69A/70 rules, fees, and even the
form's own online/offline procedure — confirming each state genuinely runs
its own Partnership Rules and Registrar of Firms, not one uniform form used
verbatim nationwide. This document is therefore properly modelled as a
**sub-national** Kerala schema, at `in/kl/...`, mirroring this registry's
existing sub-national convention (`ca/on/registration/...`,
`ch/zh/sta/...`, `us/ca/...`).

## Scope decision 2 — repeating partner rows (1-5)

**Decision:** model `partner1FullName`/`partner1PermanentAddress`/
`partner1DateOfJoining` and the same three sub-fields for `partner2` as
**required**; the same three sub-fields for `partner3`/`partner4`/`partner5`
(plus a fourth, `partnerXMinorAdmittedToBenefits` — see decision 4) as
**optional**, matching Form I's own fixed 5-row printed table.

**Reasoning.** GovSchema v0.3 has no `array`/repeating-field type
(`spec/proposals/0009-composite-repeating-values.md`, GSP-0009, still
`Status: Proposed`, confirmed by grepping the entire `registry/` tree for
`"type": "array"` — zero matches). Form I's own printed layout is a **fixed**
5-row table (not an unbounded repeat, unlike the XFA `<occur max="-1"/>`
groups found in the Ontario partnership schemas), so a bounded, flattened,
numbered-field design is the right shape rather than a narrowed
single-partner model. Section 4 of the Act defines a partnership as "the
relation between **persons** who have agreed to share the profits of a
business" (plural, and "persons who have entered into partnership with one
another are called individually 'partners' and collectively 'a firm'") —
a partnership requires at least two partners. Following this registry's
best precedent for a small, fixed-count repeat
(`ca/ircc/passport-application-first-adult`'s `reference1FullName`/
`reference2FullName`, both required for exactly 2 references), this
document models `partner1*`/`partner2*` as required and `partner3*`
through `partner5*` as the form's own optional additional rows.

## Scope decision 3 — witness field: closed enum

**Decision:** `witnessCategory` is a closed `enum` of 8 values.

**Reasoning.** Form I's own N.B. reads, verbatim from this cycle's own
fresh extraction: "This form must be signed by all partners or their
agents specially authorised in this behalf in the presence of a witness or
witnesses who must be either Gazetted officer, Advocate, Attorney, Vakil,
Honorary Magistrate, Chartered Accountant, Income tax Practioner or
Registered State Auditor." (the source's own text has the typo "Practioner",
missing an "i"; this document's enum value `income_tax_practitioner` is
spelled correctly as a machine key, since GovSchema field `name`/`enum`
values are stable identifiers, not verbatim source transcriptions — the
verbatim source text, typo included, is quoted here and in the field's own
`description`/`sourceRef`). This is an **exhaustive "either...or" list with
no trailing "etc."/"such as"/"or other" qualifier** — confirmed by reading
straight through to the sentence's own full stop after "Registered State
Auditor." — so it is modelled as a closed `enum`, not free text.

## Scope decision 4 — minor partner clause: a real, disclosed field

**Decision:** a boolean field, `partnerXMinorAdmittedToBenefits`, modelled
on the optional partner slots only (`partner3`, `partner4`, `partner5`), not
on the two required partner slots (`partner1`, `partner2`).

**Reasoning.** Form I's own N.B. footnote states: "If any partner is a
minor the fact whether he is entitled to the benefits of partnership should
be set out therein." Section 30 of the Act governs this directly:

> "30. Minors admitted to the benefits of partnership. — (1) A person who
> is a minor according to the law to which he is subject may not be a
> partner in a firm, but, with the consent of all the partners for the
> time being, he may be admitted to the benefits of partnership."

Since a minor **"may not be a partner"** (only admitted to the *benefits*
of partnership), a minor cannot occupy one of the two required partner
slots this document models (`partner1`/`partner2`, chosen specifically
because Section 4 requires at least two genuine partners for a
partnership to exist) — restricting `partnerXMinorAdmittedToBenefits` to
the optional `partner3`-`partner5` slots is the legally consistent design,
not an arbitrary choice. This rises to a real field (rather than being
left out of scope for v0.1.0) because the form prints it as an explicit,
named data point the applicant must address for any partner who is a
minor, and Section 30 gives it a precise statutory meaning to cite in the
field's own `description`.

## What was confirmed against the source

| Source element | Field(s) |
|---|---|
| Page 1, "Presented or forwarded to the Registrar of Firms for filing by Sri/Smt..." | `presentedByName` |
| Page 1, preamble / "The Firm Name" | `firmName` |
| Page 1, "Place of business :- (a) Principal Place :" | `principalPlaceOfBusiness` |
| Page 1, "Place of business :- (b) Other Places :" | `otherPlacesOfBusiness` |
| Page 1, "Duration of the Firm:" | `durationOfFirm` |
| Page 1, partner table rows 1-5, "Name of partners in full" / "Permanent Address (in full)" / "Date of joining the firm" | `partner1FullName`...`partner5DateOfJoining` |
| Page 2, N.B. footnote, minor clause | `partner3MinorAdmittedToBenefits`, `partner4MinorAdmittedToBenefits`, `partner5MinorAdmittedToBenefits` |
| Page 1, "Station :........." / "Date :........." | `declarationStation`, `declarationDate` |
| Page 2, N.B., witness categories | `witnessCategory` |
| Page 1, preamble statement ("We, the undersigned... hereby apply for registration...") | `documents[].registrationStatementAttestation` |
| Page 2, per-partner declaration block ("I ... do hereby declare that the above statement is true and correct...") | `documents[].partnerVerificationDeclaration` |

Every field's `sourceRef` cites the page and printed label/section it was
taken from. Section 58(1)'s own six statutory content items (a-f: firm
name, principal place, other places, date of joining, names/addresses,
duration) map one-to-one onto `firmName`, `principalPlaceOfBusiness`,
`otherPlacesOfBusiness`, `partnerXDateOfJoining`, `partnerXFullName`/
`partnerXPermanentAddress`, and `durationOfFirm` respectively — confirmed
by reading Section 58(1) verbatim (quoted in scope decision 1's source and
directly below) side-by-side with the form's own printed labels.

Section 58(1), quoted in full from this cycle's own extraction of the
indiacode.nic.in Act text: "The registration of a firm may be effected at
any time by sending by post or delivering to the Registrar of the area in
which any place of business of the firm is situated or proposed to be
situated, a statement in the prescribed form and accompanied by the
prescribed fee, stating — (a) the firm name, (b) the place or principal
place of business of the firm, (c) the names of any other places where the
firm carries on business, (d) the date when each partner joined the firm,
(e) the names in full and permanent addresses of the partners, and (f) the
duration of the firm. The statement shall be signed by all the partners, or
by their agents specially authorised in this behalf." — confirms Form I
asks for exactly this content, nothing more, nothing fabricated.

## What is NOT independently confirmed / out of scope

- **The filing fee** ("Filings fee Rs. 15/-" printed on Form I). Not
  modelled as authoritative data, consistent with every other schema in
  this registry — fees printed on a static form are liable to be outdated
  (Kerala's own rules have been amended since, per the "Kerala Partnership
  (Registration of Firms) (Amendment) Rules, 2025" found during this
  cycle's research but not itself fetched/verified, since fees are out of
  scope regardless of their current value).
- **A partnership with more than 5 partners.** Form I's own printed table
  caps at 5 rows; a firm with 6+ partners is out of scope for this
  document.
- **Amendment/change filings** under Sections 60 (alteration of firm name
  or principal place), 61 (branches), 62 (partner name/address changes), 63
  (change in constitution/dissolution) — distinct forms/transactions (Form
  I only covers the initial Section 58 registration statement), not fetched
  or modelled this cycle.
- **The precise legal meaning of "duration of the firm" as free text.**
  `durationOfFirm` is modelled as a bounded free-text string (matching the
  form's own blank-line presentation), not a closed `enum` of e.g. "at
  will"/"fixed term", since the Act itself (Section 7) only names
  "partnership at will" as the default when no provision is made — it does
  not enumerate a closed set of duration types.
- **The precise content and format of the online EGROOPS filing channel**
  (`egroops.kerala.gov.in`, referenced by third-party sources found during
  this cycle's research but not itself fetched or modelled) — this document
  is derived from Form I's own static/printable PDF, not the online portal's
  own field set, which may differ in presentation though not in the
  underlying Section 58 statutory content.
- **The Kerala Partnership (Registration of Firms) (Amendment) Rules,
  2025** — found referenced during this cycle's research (a third-party
  regtech update page) but not itself fetched; Form I's own PDF, fetched
  directly this cycle, is treated as the authoritative current form absent
  a confirmed amendment to Form I's own content (as distinct from the fee
  schedule, which is out of scope regardless per above).

## Scope and jurisdiction notes

- This is GovSchema's **first India sub-national schema** — every other
  `in/*` schema in the registry (`in/eci`, `in/incometax`, `in/mca`,
  `in/mea`, `in/mha`, `in/morth`) is a central-government process. This
  document sits at `in/kl/...` per scope decision 1.
- No `visibleWhen`/`requiredWhen` conditional logic is used: every field's
  requiredness is a static fact derivable directly from Section 58(1)'s own
  content list (for `firmName`/`principalPlaceOfBusiness`/`durationOfFirm`/
  `partner1*`/`partner2*`) or from the form's own optional-row structure
  (for `partner3*`-`partner5*` and `otherPlacesOfBusiness`), with no
  conditional branch in the source to model. This also avoids gating an
  optional field's requiredness on another optional field being
  non-empty via `notEquals` against an absent value — a known anti-pattern
  in this registry.
- `declarationStation`/`declarationDate`/`witnessCategory` are marked
  `required: true` by inference from their necessity to complete a valid
  statement and its verification, not from an explicit "mandatory field"
  marker — Form I is a static, printed (non-XFA/AcroForm) PDF with no
  such marker system at all, unlike the Ontario/Malaysia dynamic-form
  precedents in this registry. This inference is disclosed here rather
  than asserted silently.

## Worked example

A fully valid, plausible mock filing (a three-partner Kerala partnership,
"Nair & Menon Trading Company," partners Priya Nair, Arjun Menon, and
Lakshmi Pillai, principal place of business in Ernakulam with one
additional branch place in Thodupuzha, "at will" duration, witnessed by an
advocate) was constructed as a JSON data instance covering all 16 populated
fields (the 12 required fields, plus 4 of this document's 14 optional
fields — `presentedByName`, `otherPlacesOfBusiness`, and `partner3`'s three
sub-fields plus its `partner3MinorAdmittedToBenefits: false`). This
document's own `fields[]` array was mechanically translated into an
ordinary JSON Schema (draft 2020-12) — `type`/`validation` per field become
`properties.<name>.type`/sibling keywords, `required: true` fields become
top-level `required` — and the mock instance was validated against that
derived schema with `ajv` (the same `ajv` version `tools/validate-ajv.mjs`
and `tools/govschema-client` already depend on, resolved from
`tools/node_modules/ajv`). Result: **26 properties, 12 required, valid**.
A negative control was also run against the same derived schema: removing
`partner2FullName` and setting `witnessCategory` to an out-of-enum value
(`"notary_public"`) correctly produced two validation errors (`must have
required property 'partner2FullName'` and `witnessCategory must be equal
to one of the allowed values`), confirming the derived schema's
`required`/`enum` constraints are actually enforced, not just present. This
document itself was also separately validated against the GovSchema v0.3
meta-schema with both `tools/validate-ajv.mjs` and `tools/validate.mjs` (see
"Path to a `verified` claim" below for what remains to reach `status:
verified`). The mock instance and derived JSON Schema are not committed to
the registry, consistent with this registry's existing precedent of not
persisting worked examples as registry fixtures.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer drives the live Kerala
Registration Department's online filing channel (EGROOPS) or an in-person
filing with a mock statement and records the outcome here — shipping a new
schema version if discrepancies are found (VERSIONING.md §3, immutability).

## Re-verification

Per the practice's Cadence, `nextReviewBy` is set to **2027-01-09** (6
months).
