# Verification record — `kz/moj/state-registration-limited-liability-partnership` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-17`

This is a `GovSchema Standard Research` cycle (**GOV-3459**, a backlog
candidate scouted in parallel with Morocco during the **GOV-3454** cycle and
delegated as a child issue, authored this cycle). Kazakhstan opens as this
registry's **72nd jurisdiction**.

## Why this candidate

The GOV-3454 cycle scouted three new-jurisdiction candidates in parallel:
Morocco (authored that same cycle via `ma/maec/evisa-application`), Bahrain
(confirmed a dead end — every vertical funnels through a unified SSO login or
a WAF-gated e-visa), and Kazakhstan. Kazakhstan's own government legal-text
publisher, `adilet.zan.kz` (part of the Ministry of Justice's ИПС «Әділет»
system), was found to publish entire Rules-of-service annexes — including the
actual application-form text, not just procedure/fee prose — unauthenticated
and in full, with no CAPTCHA/WAF/login gate. This is the same class of source
strength this registry has repeatedly favoured (e.g. `tax.gov.kh` for
Cambodia, `eta.gov.eg` for Egypt).

Kazakhstan's other candidate verticals were screened the same cycle and found
weak/gated (see GOV-3459's own backlog note, reconfirmed this cycle by
re-fetching each cited domain before writing this record):

- **Visa** (`e-visa.gov.kz`/`vmp.gov.kz`): the application flow loads Google
  reCAPTCHA. CAPTCHA-gated.
- **Taxes filing** (`kgd.gov.kz`/`salyk.kz`): actual filing happens in the
  login+EDS-gated "Taxpayer's Cabinet" (`cabinet.salyk.kz`). A blank
  Individual Income Tax Declaration (Form 220.00) is separately published via
  the same `adilet.zan.kz` Ministry-of-Finance-order route and is a viable
  backlog candidate for a future cycle.
- **DMV, Passport, National ID** (`egov.kz`): service pages describe the
  process in prose, but the actual wizards require portal login plus an
  EDS/SMS signature; no field structure is visible unauthenticated.

**Business Formation — authored this cycle**, via the LLC/ТОО
state-registration application, Appendix 2 to the Rules for the state
service "State registration of legal entities, accounting registration of
their branches and representative offices."

## Sources examined

### Primary source

- **Authority:** Министерство юстиции Республики Казахстан (Ministry of
  Justice of the Republic of Kazakhstan) — official site confirmed at
  `https://www.gov.kz/memleket/entities/adilet`.
- **Document — Order of the Acting Minister of Justice of the Republic of
  Kazakhstan No. 66, 29 May 2020** ("Об утверждении правил оказания
  государственных услуг в сфере государственной регистрации юридических лиц
  и учетной регистрации филиалов и представительств"), registered with the
  Ministry of Justice 29 May 2020 No. 20771.
  - **URL (directly retrieved, HTTP 200):**
    `https://adilet.zan.kz/rus/docs/V2000020771`
  - **Access note:** the server's TLS certificate chain is missing an
    intermediate (`openssl verify` returns code 21, unauthorized
    certificate); `curl -k` or any browser that tolerates the chain loads
    the page fine at HTTP 200. This is a server misconfiguration, not a real
    access gate — re-confirmed this cycle with a fresh fetch.
  - **File identity:** full consolidated-legislation HTML page, 682,112
    bytes, `sha256:f0ccd41a3df5dffef92a96ed0c682c807e4ce728dc1106642e90ea638d03fa27`.
  - **Structure confirmed:** the page publishes numbered Appendices for
    several distinct state services and process variants sharing the same
    Rules. **Appendix 1** is an output *Extract* (Выписка) from the National
    Register of Business Identification Numbers — a produced document, not
    an input form. **Appendix 2** — "Заявление о государственной
    регистрации субъектов малого и среднего предпринимательства, также на
    открытие банковского счета и обязательным страхованием работника от
    несчастных случаев..." — is the genuine 23-item numbered application
    form this schema models. Appendices 3 and onward cover other
    registration/branch/representative-office/reorganisation/liquidation
    variants not modelled here.
  - **Extraction method:** raw HTML fetched directly (`curl -k`), decoded as
    UTF-8, `<br>`/tag-stripped to plain text, and read in full in Russian.
    Every one of the form's 23 numbered items was mapped to this schema's
    fields in item order; no OCR or PDF-rendering step was needed since the
    source is native text-layer HTML.

### External reference

- **IIN (Individual Identification Number) format:** confirmed as a 12-digit
  personal identifier under Kazakhstan's State Population Register Law — a
  well-documented national convention, not assumed from the form's own
  underscore-ruled blanks (which carry no digit-count indicator). Modelled
  as `^[0-9]{12}$` for `directorIin`, `founderIin`, and
  `beneficialOwnerIin`.

## Scope and disclosed boundaries

This schema is deliberately scoped to **a single Kazakhstan-resident
natural-person founder who is also the sole beneficial owner** — the most
common single-founder ТОО formation, and the same scoping convention this
registry's `am/moj/state-registration-limited-liability-company` (GOV-3351)
schema already established for Armenia's equivalent single-founder LLC form.
Explicitly out of scope, and disclosed rather than silently omitted:

- **Multiple founders** — item 6 of the source form describes a repeating
  table of resident founders; only one is modelled.
- **Non-resident founders** (item 6.1) and **corporate (legal-entity)
  founders**, both resident and non-resident — the source form's own
  branching for these is not modelled.
- **A beneficial owner distinct from the founder** — item 8 is modelled as a
  single block that, in the ordinary single-founder case, describes the same
  natural person as the founder.
- **The branch (филиал) and representative-office (представительство)
  variants** of the same form — `entityType`'s own enum discloses these as
  named values without this schema modelling their (likely different)
  downstream field requirements.
- **Items 1 (Форма организации) and 2 (Организационно-правовая форма)**:
  both are live e-government-cabinet dropdown selections with no published
  closed value list in the form text itself. `entityType` is modelled as a
  disclosed judgment-call enum limited to the three values implied by the
  Rules' own title; `organizationalLegalForm` is modelled as a free string,
  with this schema's own scope (ТОО) documented in its description rather
  than invented as a closed enum.
- **Items 15/16/20 (bank, bank branch, insurance company selection)**: each
  is printed as a "выбор из справочника" (selection from a directory)
  internal to the live cabinet, with no enumerated list published in the
  form text; modelled as free strings.
- **Item 10 (Регистрирующий орган)**: the form's own text states this is
  auto-derived from the address given in item 9, not an applicant-entered
  value — disclosed, not modelled as a field.

## Conformance fixtures

10 fixtures are committed under
`conformance/kz/moj/state-registration-limited-liability-partnership/1.0.0/`:
2 valid submissions (0 errors each — one minimal, required-fields-only
submission with the bank/insurance bundle declined; one fuller submission
with every optional field populated and the bank/insurance bundle accepted,
exercising every `requiredWhen` branch) and 8 mutation-control fixtures (each
expected to raise exactly 1 error): a missing required `companyNameRussian`,
an invalid `directorIin` pattern (wrong digit count), an invalid
`postalCode` pattern, an invalid `emailAddress` pattern, an invalid
`entityType` enum value, a missing `bankName` when
`openBankAccountAndInsurance` is true, a missing `executiveBodyName` when
`executiveBodyType` is `collegial`, and a `founderOwnershipSharePercent`
above the valid 0-100 range. All 10 were checked with a from-scratch,
throwaway Node mock validator implementing this schema's own
`required`/`requiredWhen`/`validation` rules (not committed, per this
registry's established per-cycle practice). Both `tools/validate.mjs` and
`tools/validate-ajv.mjs` pass at 527/527 across the full registry with this
schema added.

## Known gaps

- Kazakhstan's remaining verticals — DMV, Passport, Visa, Taxes, and
  National ID — are open backlog. Visa is confirmed CAPTCHA-gated and
  DMV/Passport/National ID are confirmed login+EDS-gated this cycle (see
  "Why this candidate" above); Taxes has a disclosed, ready-to-scope
  `adilet.zan.kz`-sourced backup candidate (Form 220.00).
- The multi-founder, non-resident-founder, and corporate-founder paths are a
  disclosed, open backlog candidate for a future minor-version cycle — see
  "Scope and disclosed boundaries" above.
- The branch and representative-office variants of the same Rules (also
  filed via this same web page's other appendices) are a disclosed, open
  backlog candidate.

## Verification method assessment

`manual-source-review-v1` — a human/agent read the primary source directly
and transcribed its fields. No automated re-verification tooling exists yet
for this schema; `nextReviewBy` is set 6 months out per the practice's
default cadence.
