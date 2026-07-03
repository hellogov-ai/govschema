# Verification record — `au/asic/proprietary-company-registration` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-03`

The document was derived from ASIC's own regulatory-resources confirmation of
Form 201's current status, business.gov.au's live guidance on the modern fee
and channel, and the Form 201 PDF's own printed field set — but the live
online lodgement channel (register.business.gov.au, myGovID/RAM-gated) was
not reached, so the practice's field-by-field comparison against a *live*
screen set has not been completed. It therefore remains `draft`, not
`verified`.

## Sources examined

- **Document `(id, version)`:** `au/asic/proprietary-company-registration` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Australian Securities and Investments Commission (ASIC),
  the national companies regulator under the Corporations Act 2001.
- **Process guidance:** <https://www.asic.gov.au/regulatory-resources/forms/forms-folder/201-application-for-registration-as-an-australian-company/>,
  fetched live 2026-07-03 (raw HTML, not a summarizer), confirms Form 201
  remains ASIC's current regulatory form for this process. The page's own
  content is limited to "Use Form 201 to register a new Australian company"
  plus lodgement and fee details (201A/201B/201C denote fee categories for
  the same form, not distinct page counts or field descriptions) — it does
  not describe the form's page count or field contents; those were verified
  directly against the retrieved PDF itself (8 pages total, "Page 1 of 8"
  through "Page 8 of 8", with the lodgement-details/cover content embedded
  in page 1 rather than a separate page). Fee and modern-channel confirmation
  from business.gov.au live search results: "you must register it on the
  Australian companies
  register, managed by ASIC. The fee is $636 from 1 July 2026 ($611 until 30
  June 2026)" and "you can use the Australian Government Business
  Registration Service at register.business.gov.au to handle multiple
  registrations in one place."
- **Primary form source:** ASIC Form 201, "Application for registration as
  an Australian company" (Corporations Act 2001, s117), footer-dated 17
  January 2011 — the edition still linked from ASIC's own current forms
  page. The direct `asic.gov.au`/`download.asic.gov.au` link resolved to an
  unrelated resource in this sandbox (not a valid PDF), so the form was
  instead retrieved from a long-established third-party form-library mirror
  (`calculus.net.au`), consistent with the "retired/hard-to-reach official
  form, sourced via a stable third-party mirror" technique already used for
  several FR Cerfa forms in this registry.
- **PDF extraction method:** the retrieved PDF has a genuine text layer (not
  scanned, not AcroForm-only) — `pdfjs-dist`'s `getTextContent()` returned
  the complete printed instructional text of every numbered section
  verbatim, which every field's `sourceRef` quotes directly.
- **Scope decision — proprietary company limited by shares only:** Form 201
  covers both proprietary and public companies, which branch significantly
  (a public company needs ≥3 directors including 2 Australia-resident, a
  mandatory Australia-resident secretary, published office hours, and in
  several cases a lodged constitution and ultimate-holding-company
  disclosure). This version models only the proprietary-company path — by
  far the dominant case for an individual or small group incorporating a
  business, and the AU jurisdiction's closest analogue to the "LLC /
  Incorporation" scope named in this vertical's brief. The following source
  sections are consequently **out of scope** for this version:
  - The public-company governance block (constitution lodgement, "relies
    entirely on replaceable rules" declaration, published office hours,
    special-purpose-company declaration under the Corporations (Review
    Fees) Regulations 2003).
  - Section 4, "Identify ultimate holding company" (relevant chiefly to
    public companies and wholly-owned subsidiaries).
  - The minimum-3-director/2-resident governance rule, which does not apply
    to a proprietary company.
  - A third-or-later officeholder or member: the source form supports
    repeating officeholder/member blocks (with photocopied extra pages for
    more than a handful); this schema models a first and second director,
    an optional secretary, and a first member only — additional
    officeholders/members are a natural follow-up extension, not modelled
    as a repeating group in this version.
  - Form 207Z/Form 208 lodgement obligations that follow from
    `areSharesIssuedOtherThanForCash: true` with a written contract: the
    source form directs the applicant to lodge those as separate forms,
    which this schema surfaces only implicitly (via the boolean field) and
    does not model as its own document requirement.
- **Requiredness for optional address subfields:** `director1AddressState`
  and `director1AddressPostcode` are modelled `required: false` even though
  a real submission would need them, because the source form does not
  visually distinguish their requiredness from the director's country field
  (which is genuinely optional, "if not Australia") — left conservative
  rather than guessed; a live-channel comparison should confirm this.
- **Fee amount:** modelled at 636 AUD (the post-1-July-2026 amount, matching
  the review date of 2026-07-03); the pre-1-July-2026 amount of 611 AUD is
  noted in the field's own `sourceRef` prose rather than modelled as a
  second amount, since the spec's `amount` shape does not support a
  time-conditional value (the same limitation already noted for the FR
  passport schema's Guyane fiscal-stamp exception).

## Test run (mock data)

Two mock scenarios were run against this schema version's `required`/
`requiredWhen`/`visibleWhen` gating logic with the same standalone validator
script used for the two FR schemas authored earlier this cycle (not
committed — mirrors the checks `tools/validate.mjs` and
`tools/validate-ajv.mjs` already run structurally):

1. A single-director company occupying its own registered office, no
   secretary, one member holding fully-paid ordinary shares for cash —
   confirms the "occupies own office" / "principal place same as
   registered office" / "no second director" / "no secretary" branches all
   correctly skip their conditional fields. Committed as this version's
   `conformance/.../application-packet.json` fixture.
2. A two-director company using a registered agent's office it does not
   itself occupy, a separate principal place of business, an appointed
   secretary, and shares issued other than for cash — exercises every
   conditional branch simultaneously. A deliberately broken variant (with
   `occupierConsentGiven` omitted) correctly **failed** with
   `MISSING required field: occupierConsentGiven`, confirming the gate
   fires; restoring the field passed. Not committed as a fixture
   (single-packet-per-version convention), but recorded here as the branch
   coverage this version's conditional logic received.

Both `tools/validate.mjs` and `tools/validate-ajv.mjs` (full JSON Schema
2020-12 meta-schema, ajv) pass for this document.

## Known gaps / future work

- Reach the live Business Registration Service screen flow (requires
  myGovID/RAM authentication) to confirm this schema's field set and gating
  match the actual online experience, not just the paper form.
- Model the public-company governance path as a sibling or extension.
- Model a third-or-later officeholder/member as a repeating structure once
  the spec has a clearer convention for it (several other schemas in this
  registry hit the same limitation, e.g. `fr/inpi/micro-entrepreneur-activity-declaration`'s
  single-employer-of-record scope).
- A companion ABN-only application (business.gov.au) for the sole-trader
  (non-company) case remains a distinct, narrower candidate.

## Scope

Out of scope for this version: public company registration, ultimate
holding-company disclosure, a third-or-later officeholder or member, and
Form 207Z/208 follow-on lodgements for non-cash share issuances.
