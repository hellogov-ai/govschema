# Verification record — `it/ministero-dell-interno/carta-identita-elettronica` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-15`

This is **GOV-3050**, a pre-scouted child issue of GOV-3045's "GovSchema
Standard Research" cycle (itself downstream of GOV-3054's scouting),
authoring Italy's National ID vertical opener. Italy stood at 5/6 (DMV,
Taxes, Visa, Passport, Business Formation) before this schema — the last
remaining gap — and reaches **6/6** with this schema.

## Overturning a stale registry finding

This registry's own **GOV-2382** (recorded in
`registry/it/agenzia-entrate/modello-730/1.0.0/VERIFICATION.md`) previously
recorded Italy's National ID vertical as "fully appointment-based... no
downloadable form," based on a screening pass that only checked the
national CIE booking portal (`prenotazionicie.interno.gov.it`), which is
genuinely appointment-gated. That screening never discovered the municipal-
form-publishing pattern used by many of Italy's ~8,000 comuni (city halls),
which publish their own intake PDF for the same nationally standardized
process. This cycle overturns that finding using Comune di Tre Ville
(provincia di Trento) as the concrete exemplar.

## Sources examined and fetched fresh

All three PDFs named in the issue were independently re-fetched via direct
`curl` this cycle (2026-07-15), and the national CIE portal was checked for
corroboration.

### 1. Adult CIE request (the source used for this schema)

- **URL:** `https://www.comune.treville.tn.it/ocmultibinary/download/982/17250/4/791db8cc30b53db849eebccf1af54564.pdf`
- **HTTP 200**, `content-type: application/pdf`
- **Size:** 233,313 bytes — matches the issue's own citation exactly.
- **sha256:** `2512f791c0a4a47b55158f91dbb379be609b99943531c8657416d98161b13e57`
  — matches the issue's own citation exactly, independently recomputed via
  `sha256sum` in this sandbox.
- **Pages:** 2 (confirmed via `pdfjs-dist`'s `doc.numPages`).

### 2. Minor CIE request (fetched and read as corroboration; not modelled)

- **URL:** `https://www.comune.treville.tn.it/ocmultibinary/download/982/17250/4/204bebdc2ad90037427205cb3874cae9.pdf`
- **HTTP 200**, `content-type: application/pdf`
- **Size:** 232,186 bytes — matches the issue's own citation exactly.
- **sha256:** `2204cc92bef81ef92e13f819e0f17bc47ce5d1994f076dfc93325c7f9284eb74`
  — matches the issue's own citation exactly.

### 3. Parental consent to expatriation ("ASSENSO") deed (fetched and read as corroboration; not modelled)

- **URL:** `https://www.comune.treville.tn.it/ocmultibinary/download/982/17250/4/c25135b81358a57d629f0f3d0d9c7ffb.pdf`
- **HTTP 200**, `content-type: application/pdf`
- **Size:** 517,087 bytes — matches the issue's own citation exactly.
- **sha256:** `d877c51a581468041f312f3a940c38409def6c979bafaeec0a22ce92c64546fc`
  — matches the issue's own body citation exactly. Note: the abbreviated
  hash string embedded directly in this task's own prompt text
  (`d877c51a581358a57d629f0f3d0d9c7ffb.pdf`, which is not even hex — it's
  the filename concatenated onto a truncated hash) was a copy/paste
  artifact in that one relay of the finding; the issue body itself (GOV-3050,
  fetched via the Paperclip API) carries the correct full hash, which is
  the one recomputed and confirmed here.

### Landing/index page

- `https://www.comune.treville.tn.it/Amministrazione/Documenti-e-dati/Modulistica/Modulo-richiesta-carta-d-identita-elettronica-CIE`
  — confirmed reachable, links to all three PDFs above.

### National portal corroboration

`cartaidentita.interno.gov.it` requires the `www.` prefix or DNS fails to
resolve (confirmed again this cycle):

- `https://www.cartaidentita.interno.gov.it/en/request-cie/` — **HTTP 200**.
  States: "It is possible to apply for an Electronic Identity Card (CIE) at
  one's Municipality of residence or domicile" — independently corroborating
  the municipal-intake pattern this schema is built on — and links to a
  separate "Release and renew minors" page, corroborating that minors are a
  materially distinct process (reinforcing the decision to scope this schema
  to adults only, see below).
- `https://www.cartaidentita.interno.gov.it/en/release-and-renew-in-italy/`
  — **HTTP 200** (redirects to itself on the same host; no cross-domain
  redirect). States, verbatim: "In order to issue the Electronic Identity
  Card, a fee of € 16.79 plus the fixed and secretarial fees, where
  applicable, must be paid to the municipality's offices" — consistent with
  the source form's own printed total, "PAGATO € 22,20" (an office-ticked
  total inclusive of the fixed/secretarial components; not a discrepancy,
  see the Documents/fee section below). Also states the applicant, at the
  counter: "Provides the clerk with the photograph," "Proceed... to acquire
  fingerprints," "Provides the consent or denial to organ donation" (all
  independently corroborating the modelled `organDonationDeclaration` field
  as a genuine national feature, not a Tre-Ville-specific addition), and
  "Indicates the preferred modality of collection of the document (delivery
  to a specified address or withdrawal from the Town Hall)" (independently
  corroborating `deliveryMethod`/`pickupOffice` as genuinely applicant-facing
  choices, not office-reserved). Also states: "In case the applicant for the
  CIE is parent of minors, it is necessary that the applicant also present a
  declaration of consent to expatriation signed by the other parent..."
  — independently corroborating the real-world role of the ASSENSO PDF
  above, reinforcing the decision to leave the minor path out of this
  schema's scope (a materially different consent chain) rather than
  conflate it into one schema.

## Extraction method

All three PDFs are genuinely **blank, non-AcroForm templates** with
underscore-rule fill-ins, not fillable forms: `pdfjs-dist` 4.10.38
(`legacy/build/pdf.mjs`) `page.getAnnotations()` returns **zero** `/Widget`
annotations on every page of all three files (`getAnnotations()` returns
only 4 non-widget `Link`-type annotations on each form's page 2, the privacy
notice page — consistent across all three PDFs, which share an identical
page 2). Each form carries a genuine vector-text layer on page 1, extracted
via `getTextContent()` with y-coordinate row-clustering (items grouped
within a 3pt y-tolerance band, then sorted by x within each row — the same
row-reconstruction technique this registry's `gr/yme` cycle, GOV-3026,
established): 149 text items for the adult form, 136 for the minor form, 70
for the ASSENSO deed. No OCR or image-XObject rendering was needed — this is
a much simpler extraction than the `it/poliziadistato` passport form (which
required `mupdf`-based rendering because its background was a flat scanned
image). `doc.numPages` is 2 for all three PDFs (page 1 the form itself, page
2 an identical GDPR/privacy notice about the Comune di Tre Ville's data
controller).

## Scope decision: adult (maggiorenne) request only

This schema models the **adult** request (`791db8cc...pdf`) only, following
this registry's own `it/poliziadistato/richiesta-passaporto-maggiorenni`
precedent of authoring the adult passport variant alone and leaving the
minor variant as a natural follow-up companion schema. The minor request
differs materially, not just cosmetically:

- The declarant is a parent/guardian ("Firma di un genitore"), not the card
  holder themselves.
- There is **no organ-donation section at all** on the minor form (correctly
  absent — minors cannot make this declaration).
- A minor's CIE valid for expatriation additionally requires the other
  parent's/guardian's consent (the ASSENSO deed, or a giudice tutelare
  authorization) — a distinct cross-form dependency this schema's adult-only
  scope does not need to model.

Both the minor request and the ASSENSO deed were fetched and read in full
this cycle (see hashes above) specifically to confirm this is a genuine,
internally consistent national form family (all three PDFs share an
identical page 2 privacy notice, the same legal citations, and the same
comune), not a one-off municipal invention — but neither is modelled as
fields/documents in this schema.

## Directory/agency slug: `ministero-dell-interno`

The immediate, front-line publishing/receiving authority for this document
is genuinely local — the Comune's own Ufficio Anagrafe — and varies by
municipality (Comune di Tre Ville is the concrete exemplar sourced here; a
different comune's own CIE intake form would carry its own municipal
branding and its own local pickup-desk names, but the same nationally
standardized fields). This mirrors `de/bmi/national-identity-card-application`
exactly: Germany's Personalausweis is likewise requested in person at a
local Bürgeramt (citizen office) that varies by city, yet that schema is
filed under `de/bmi` — the national ministry (Bundesministerium des Innern)
that designs and standardizes the process — with `authority.name` recording
the local office generically and `authority.abbreviation` carrying the
national ministry's own abbreviation. This schema follows the identical
convention: the folder is `it/ministero-dell-interno` (Ministero
dell'Interno operates the national CIE system end to end, including
production via the Istituto Poligrafico e Zecca dello Stato and the
`cartaidentita.interno.gov.it` portal), while `authority.name` records a
generic "Comune — Ufficio Anagrafe" front-line office with the concrete Tre
Ville exemplar disclosed, and `authority.operatedBy` names the Ministero
dell'Interno with its statutory basis — the identical `authority`/
`operatedBy` shape already used by this registry's own
`it/poliziadistato/richiesta-passaporto-maggiorenni` schema (Questura
front-line office, Ministero dell'Interno as `operatedBy`).

## Field inventory and scope

**15 `fields[]` entries** (directly counted from `schema.json`, not
estimated), plus **2 `documents[]` entries**.

In scope: applicant identity (`applicantFullName`), contact details
(`phoneNumber`, `email`), the three-way request-type declaration
(`requestType`: `prima_emissione` / `rinnovo_per_scadenza` /
`rinnovo_per_furto_smarrimento_deterioramento`), the two-way
expatriation-validity declaration (`expatriationValidity`), birth data
(`birthPlace`, `dateOfBirth`), residence address (`residenceStreetAddress`,
`residenceHouseNumber` — the Comune name itself is pre-printed on the
source, since filing is by definition at the Comune of residence/domicile),
height (`heightCm`), the organ-and-tissue-donation declaration
(`organDonationDeclaration`: consent / refusal / no preference expressed —
independently corroborated as a genuine national CIE feature, see above),
the declaration date (`applicationDate`, printed on the same line as the
place of signing, immediately above — but distinct from — the wet-ink
signature line), the delivery-method choice (`deliveryMethod`:
direct-to-applicant / via a named delegate, with `delegateFullName`
required only when `deliveryMethod` is `delega`), and the pickup-desk choice
(`pickupOffice`, this comune's own three named service points).

**Deliberately out of scope:**

- The office-only processing strip at the foot of page 1 — a fee-paid
  checkbox ("PAGATO € 22,20") and an old/expired-document-surrendered
  tracking checkbox ("DOCUMENTO SCADUTO RITIRATO" / "DA RITIRARE") — both
  printed below the "RITIRO" (pickup) line but outside the form's own
  "ALLA PRESENTE ALLEGA" (attached hereto) list, and both plainly ticked by
  the municipal clerk after the counter transaction (payment is made in
  cash/card directly at the counter, not evidenced by a document the
  applicant produces beforehand — unlike, for example, the passport
  schema's postal-bollettino payment receipt), following this registry's
  `dk/cpr`/`se/skatteverket`/`it/mit`/`it/poliziadistato` office-reserved-
  content precedent. No payment `documents[]` entry is modelled for the same
  reason.
- The wet-ink signature line ("Firmato" / blank line beneath it) — no
  separate data-entry box of its own, following this registry's established
  convention of not modelling a bare signature line.
- All content specific to the minor request and the ASSENSO consent deed
  (see "Scope decision" above).
- In-person biometric/procedural steps described only on the national
  portal (fingerprint capture, live photo acquisition, registry-data
  verification against the Comune's own anagrafe) — these are office-side
  procedural steps that happen after this form is presented, not applicant-
  form data fields.

## Documents

Transcribed from the form's own "ALLA PRESENTE ALLEGA" (attached hereto)
list:

1. `recentPhoto` (supporting-evidence, required) — "1 fotografia (formato
   fototessera) recente e a capo scoperto" (one recent, bare-headed,
   passport-style photograph).
2. `policeLossReportCopy` (supporting-evidence, `requiredWhen: requestType
   equals rinnovo_per_furto_smarrimento_deterioramento`) — "Dichiarazione
   della locale Autorità di P.S. comprovante la denuncia di smarrimento (ove
   ricorra il caso)" (a Public Security Authority declaration evidencing the
   loss/theft report, "where applicable"). The source form combines theft,
   loss, and mere deterioration into a single `requestType` checkbox option
   without a separate sub-field distinguishing them, so this `requiredWhen`
   condition is gated on the whole option as printed — a disclosed judgment
   call, not a fabricated finer-grained trigger absent from the source.

## Conformance testing

A from-scratch, ephemeral field-by-field conformance checker (deriving
required/`requiredWhen`/`enum`/`pattern`/`minimum` rules directly from this
schema's own `fields[]`/`documents[]`; discarded after use, not committed)
was run against 2 valid scenarios and 6 mutation controls in
`conformance/it/ministero-dell-interno/carta-identita-elettronica/1.0.0/`:

1. `valid-first-issuance-office-pickup.json` — a first-time applicant,
   requesting a card valid for expatriation, organ-donation consent, direct
   postal delivery, no delegate. **0 errors.**
2. `valid-lost-document-renewal-with-delegate.json` — a renewal for
   theft/loss/deterioration (triggering the police-report document),
   organ-donation refusal, collection by a named delegate. **0 errors.**

Six mutation controls, each hand-derived from a passing scenario by
introducing exactly one violation:

1. `mutation-control-missing-required-field.json` — deletes
   `applicantFullName`. **1 error** (missing required field).
2. `mutation-control-missing-required-document.json` — removes
   `recentPhoto` from `documents[]`. **1 error** (missing required
   document).
3. `mutation-control-enum-violation.json` — sets `requestType` to
   `"duplicato"` (not in the 3-value enum). **1 error.**
4. `mutation-control-pattern-violation.json` — sets `email` to
   `"not-an-email"` (fails the email pattern). **1 error.**
5. `mutation-control-requiredwhen-violation.json` — derived from scenario 2
   (theft/loss/deterioration renewal), removes `policeLossReportCopy` from
   `documents[]`. **1 error** (missing conditionally-required document).
6. `mutation-control-minimum-violation.json` — sets `heightCm` to `50`
   (below the 100cm minimum). **1 error.**

All six mutation controls raised exactly the expected single error; the two
passing scenarios raised zero.

## Meta-schema validation

- `node tools/validate.mjs registry/it/ministero-dell-interno/carta-identita-elettronica/1.0.0/schema.json`
  — **ok**.
- `node tools/validate-ajv.mjs registry/it/ministero-dell-interno/carta-identita-elettronica/1.0.0/schema.json`
  — **ok** (ajv 2020-12, spec v0.3 meta-schema).
- Full registry re-run after adding this schema: both validators pass
  461/461 (up from the pre-existing 460/460 baseline).
