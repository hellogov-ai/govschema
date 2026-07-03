# Verification record — `nz/companiesoffice/company-incorporation` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-03`

The document was derived entirely from the Companies Office's own Help
Centre prose describing what its online incorporation application collects,
not from the live authenticated screens themselves (which sit behind a
RealMe® login this review could not reach). It therefore remains `draft`,
not `verified` — the same posture already used for `nz/dia/realme-verified-identity`.

## Sources examined

- **Document `(id, version)`:** `nz/companiesoffice/company-incorporation` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** New Zealand Companies Office (Ministry of Business,
  Innovation and Employment), which maintains the Companies Register under
  the Companies Act 1993.
- **Primary sources (all fetched directly by this review — raw HTML parsed
  for article text, not an AI-summarized fetch — HTTP 200 on each):**
  - <https://companies-register.companiesoffice.govt.nz/help-centre/starting-a-company/incorporating-a-company/>
    — process overview, the two incorporation-time fees ("$10 (plus GST) to
    reserve a company name and $118.74 (plus GST) to apply to incorporate a
    company"), the 20-working-day completion window, company contact
    address requirements, and the constitution options.
  - <https://companies-register.companiesoffice.govt.nz/help-centre/company-directors/registering-the-appointment-of-a-director/>
    — the exact director field set ("full legal name", "date and place of
    birth", "residential address — this must be a physical street address,
    not a PO Box, Private Bag or DX service", "date of appointment", plus
    optional email/telephone/mobile/fax) and the 20-working-day consent-form
    deadline.
  - <https://companies-register.companiesoffice.govt.nz/help-centre/company-directors/who-can-be-a-director/>
    — the residency rule ("at least one director who lives in: New Zealand,
    or Australia and is a current director of a company incorporated in
    Australia", with an ACN required for the latter case).
  - <https://companies-register.companiesoffice.govt.nz/help-centre/starting-a-company/registering-a-shareholder/>
    — the exact per-shareholder-type field sets (individual: full legal
    name, residential address, IRD number if NZ-resident and registering
    for tax; NZ company: full legal name and incorporation/registration
    number; other entity: full legal name, country of origin, registered
    address; trustees: full legal name and residential address per
    trustee) and the rule that unincorporated trusts cannot themselves be
    registered.
  - <https://companies-register.companiesoffice.govt.nz/help-centre/starting-a-company/issuing-shares-in-a-company/>
    — confirms every company must have at least one shareholder and issue
    at least one share.
  - <https://companies-register.companiesoffice.govt.nz/help-centre/starting-a-company/ultimate-holding-companies/>
    — the exact UHC disclosure field set (name, country of registration,
    registration number or code if any, registered office address).
  - <https://companies-register.companiesoffice.govt.nz/help-centre/starting-a-company/tax-registration/>
    — the exact optional bundled tax-registration field set (BIC code,
    trading name, business-premises address, postal address for tax,
    contact phone/person, fringe-benefits question, non-active declaration,
    and — if registering as an employer — employment start date, pay
    frequency, first pay-cycle date).
- **Corroborating source:** business.govt.nz's general "Starting a company"
  guidance page confirms the same online, RealMe®-gated process at a
  higher level ("You must register your company with the Companies Office.
  This is known as incorporating a company. ... Sign in to the Companies
  Office website with your RealMe® login."), but returned a RedShield
  bot-detection block on direct fetch in this sandbox — the same class of
  block already documented for nzta.govt.nz in this registry's DMV
  candidates. It was instead read via a Wayback Machine snapshot
  (`web.archive.org/web/20250901115220/...`) and used only to corroborate
  the primary Help Centre sources above, not as a field-level source in its
  own right.
- **Live channel not reached:** the authenticated online-services screens
  themselves (behind RealMe®) were not reached, consistent with the
  approach already taken for `nz/dia/realme-verified-identity` — this
  schema sources from the operator's own published description of what a
  login-gated process collects rather than the live screens.
- **Scope decisions:**
  - Modelled a first and second director, and a first and second
    shareholder, rather than an arbitrary repeating group — the same
    two-instance-cap limitation already noted for the FR and AU schemas
    authored earlier in this cycle (`fr/inpi/micro-entrepreneur-activity-declaration`,
    `au/asic/proprietary-company-registration`); a real company may have
    more of either.
  - `constitutionSource`'s two enum values (`purchased_from_third_party`,
    `self_drafted`) map to the source's own two upload paths; "incorporate
    without a constitution" is represented by `hasConstitution: false`
    rather than a third enum value.
  - `director1ResidencyBasis`/`director1AustralianCompanyAcn` are modelled
    only on the first director (the schema's minimum-viable compliance
    signal is that *at least one* director meets the residency rule); the
    second director's residency basis is not separately modelled.
  - The tax-registration bundle's "confirm who your tax agent is" branch
    (mentioned in the source's own numbered step 4) was not reached in the
    fetched page content and is left unmodelled rather than guessed.
  - Annual-return obligations (a recurring $49.74-plus-GST filing, not part
    of the incorporation transaction itself) are out of scope for this
    version — a natural companion schema for a future cycle.

## Test run (mock data)

Two mock scenarios were run against this schema version's `required`/
`requiredWhen`/`visibleWhen` gating logic with the same standalone validator
script used for the FR and AU schemas authored earlier this cycle (not
committed — mirrors the checks `tools/validate.mjs` and
`tools/validate-ajv.mjs` already run structurally):

1. A single-director, single-individual-shareholder company with no
   constitution, no UHC, and no bundled tax registration — confirms every
   optional/conditional block correctly stays unset. Committed as this
   version's `conformance/.../application-packet.json` fixture.
2. A two-director company (the second director resident in Australia),
   two shareholders (an individual and a registered NZ company), a
   purchased constitution, a UHC, and full bundled tax registration
   including employer registration — exercises every conditional branch
   simultaneously. A deliberately broken variant (with
   `uhcCountryOfRegistration` omitted) correctly **failed** with
   `MISSING required field: uhcCountryOfRegistration`, confirming the gate
   fires; restoring the field passed. Not committed as a fixture
   (single-packet-per-version convention), but recorded here as the branch
   coverage this version's conditional logic received.

Both `tools/validate.mjs` and `tools/validate-ajv.mjs` (full JSON Schema
2020-12 meta-schema, ajv) pass for this document.

## Known gaps / future work

- Reach the live, RealMe®-gated online-services screen flow to confirm this
  schema's field set and gating match the actual application, not just the
  Help Centre's own description of it.
- Model a third-or-later director/shareholder as a repeating structure.
- Model the "confirm who your tax agent is" branch once its field content
  is sourced.
- A companion annual-return schema is a natural next candidate.

## Scope

Out of scope for this version: a third-or-later director or shareholder,
the tax-agent-nomination sub-branch of tax registration, and annual-return
filing.
