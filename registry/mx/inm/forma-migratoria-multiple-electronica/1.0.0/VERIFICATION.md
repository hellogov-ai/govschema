# Verification record — `mx/inm/forma-migratoria-multiple-electronica` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-06`

The document was derived from a **directly-read live source**: the Instituto
Nacional de Migración's (INM) own Forma Migratoria Múltiple (FMM) electronic
wizard, read field-by-field from the live DOM plus its own unminified
client-side validation source code. It remains `draft`, not `verified`,
pending an independent second reviewer's field-by-field pass.

## Why this document exists

This cycle (`GOV-1393`, the recurring `GovSchema Standard Research` routine)
scouted Mexico as a new-jurisdiction candidate — CATALOG.md's "Known Gaps &
Opportunities" section had explicitly flagged Mexico, alongside an EU member
beyond DE/FR/NL, as worth scouting once South Korea, the UAE, and Brazil had
each been opened in recent cycles. Four Mexican verticals were scouted:

- **SRE passport** — in-person appointment booking only, no field-level
  online form. Skipped.
- **SAT RFC (tax/business registration)** — the official "Ficha 43/CFF" PDF
  is a document-requirements checklist, not a field-by-field form; the live
  SAT preinscription wizard returned HTTP 403 to a direct fetch (untested via
  a real browser this cycle — a candidate for a future cycle). Skipped.
- **CURP (national ID)** — requires an in-person biometric appointment.
  Skipped.
- **INM FMM (this document)** — **strong candidate.** A genuinely live,
  unauthenticated wizard with no login and no CAPTCHA gate ahead of the final
  save action.

This opens **Mexico as the registry's 16th jurisdiction**, in the Visa
vertical, matching the "open with the strongest single vertical first"
pattern used for South Korea (`GOV-1289`), the UAE (`GOV-1297`/`GOV-1335`),
and Brazil (`GOV-1296`/`GOV-1342`).

## Source examined

- **Document `(id, version)`:** `mx/inm/forma-migratoria-multiple-electronica` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Instituto Nacional de Migración (INM)
- **Primary source URLs:**
  - English: <https://www.inm.gob.mx/fmme/publico/en/solicitud.html>
  - Spanish (default locale): <https://www.inm.gob.mx/fmme/publico/solicitud.html>
    — note this is **not** `.../publico/es/solicitud.html`. INM's `en`/`ja`/`cn`/`ko`
    variants each have their own path segment, but Spanish is served at the
    bare `.../publico/` path with no `es` segment; `.../publico/es/solicitud.html`
    returns a genuine `404` (confirmed both via `curl` and via a real headless
    browser navigation, so this is not a bot-blocking artifact). The
    background research brief for this cycle had assumed a `.../es/` path by
    analogy with the other locales; this was corrected during extraction.
  - Field-option catalog (both locales' dropdowns are populated from this):
    `https://www.inm.gob.mx/fmme/resources/solicitud/meta-resources/catalogos?lang=en`
    (and `?lang=es`) — an XML document, despite the URL's JSON-suggestive path
    segment (`meta-resources`).
- **Retrieved / reviewed:** 2026-07-06
- **Reviewer:** GovSchema Engineering (initial authoring source-review)

## Extraction method

1. Rendered both `.../en/solicitud.html` and `.../publico/solicitud.html`
   (Spanish) with a headless Chromium (Playwright-core, per
   `[[browser-screenshots-setup]]`) at 1366×1400/1600. No login, no redirect,
   no CAPTCHA blocks the page itself.
2. The page ships all field markup for every section in a single initial page
   load (an "accordion" with a single panel labelled "By Land" in English /
   "Terrestre" in Spanish) — checking its terms-acceptance checkbox reveals
   the full form via `slideDown()`, not a fresh page fetch. Ran
   `document.querySelectorAll('input, select, textarea')` and recorded every
   element's `id`, native `type`, and (crucially) discovered that **every
   native HTML validation attribute (`required`, `pattern`, `maxlength`) is
   unset on every field** — this site enforces its own required/format rules
   entirely through a custom jQuery validation object attached via
   `$(el).configura({...})`, not through native HTML5 form validation.
3. Because of finding 2, DOM inspection alone would have under-reported
   required-ness and pattern constraints for nearly every field. This
   document's field-level `required`/`validation` claims are instead sourced
   **directly from the wizard's own unminified client-side JavaScript**,
   fetched directly (no login needed — these are plain static assets):
   - `https://www.inm.gob.mx/fmme/js/jquery.inm.fmme.solicitud-1.0.0.js` — the
     FMM-specific controller: which fields are required by default, which
     become required only conditionally (the guardian block; the airline/
     flight-number pair for air entry), the exact 30-day arrival window / 180-
     day maximum stay / passport-must-outlast-stay date rules, the minor/
     guardian age computation, and the catalog-filtering logic (see below).
   - `https://www.inm.gob.mx/util/js/jquery.inm.common.validator-3.1.4.js` —
     the shared validator: the default per-type `required`/`maxlength`/
     `pattern` values (e.g. every untyped `text` input defaults to
     `maxlength: 40`, `pattern: /^[A-Za-z0-9 ]+$/`, required `true`, unless a
     later `.configura()` call overrides it — which is how `direccionResidencia`/
     `domicilioMexico` keep `maxlength: 40` but get a custom punctuation-
     inclusive `pattern`), the `email`/`date`/`nombre-icao` type patterns, and
     the confirmation-field equality checks.
4. Fetched the catalog endpoint directly (`?lang=en` and `?lang=es`) and
   parsed the XML to get every dropdown's **full, exact option set**: 244
   countries (with ISO alpha-2/alpha-3 codes), 32 Mexican states, 60 land
   points of entry, 38 air points of entry (unused — see Out of scope), 20
   reason-of-trip entries (4 top-level + 16 sub-reasons), 2 genders, 2
   document types, 2 means-of-entry values.
5. Ran a full interactive dry run against the live wizard with fabricated
   data (see Mock-data conformance check below): filled every field with
   valid mock values, triggered every confirmation-mismatch case one at a
   time to capture the live wizard's own error text, and set a birth date
   making the applicant a minor to confirm the guardian section's exact
   trigger and field set. **Never** clicked the final "confirmar" action that
   would actually POST to `/fmme/resources/solicitud/` — this is a read-only
   verification exercise, not a real transaction, per `GOVERNANCE.md`.

## What was confirmed directly (verbatim, from the live DOM/JS/catalog)

- Every field's `id`, section grouping (`Entry Information` / `Personal
  information` / `Identification document` / `Place of residence` / `Trip
  information` / `Father, mother or guardian information` / `Email`), and
  English + Spanish label text.
- Every dropdown's full, exact option set (see step 4 above) — none
  paraphrased or truncated internally; the two very large ones (244
  countries, described in nationality/countryOfBirth/etc.) are cited as a
  closed catalog rather than enumerated in the schema, per this registry's
  existing convention for oversized enumerations (see `us/cbp/esta-application`'s
  `countryOfBirth`/`nationality` fields, which use the same "ISO 3166-1
  alpha-2, not enumerated" pattern).
- The exact required/optional/conditionally-required status of every field
  (from the validator source, not the native DOM attributes — see Extraction
  method step 2-3).
- The four confirmation-field-mismatch error strings ("Does not match with
  the number of the document." / "...issuing date." / "...expiration date."
  / "...email.") and the "Required" per-field error, all captured live by
  triggering each condition.
- The guardian ("Father, mother or guardian information") section's exact
  trigger (`utils.validaMenorEdad()`: applicant's age at `arrivalDate`
  computed from `dateOfBirth` is under 18) and its exact field set (6 fields,
  all becoming visible and required together) — confirmed live by setting a
  birth date yielding age 10 and screenshotting the revealed section.
- The `reasonOfTrip` under-2-years business exclusion: confirmed live by
  setting a birth date yielding an applicant under 2 years old at arrival and
  observing `motivoViaje`'s option list shrink to `Tourism`/`Other` only
  (`Business` removed) — `utils.cargaMotivosViaje2anios()`.

## Interpretive judgment calls flagged for an independent reviewer

1. **Land-entry-only scope, and why "by air" is not modelled.** The English
   background brief for this cycle assumed the wizard offered a real
   land/air/sea choice. On close inspection of the live page and its
   controller script, this specific URL's single accordion panel is
   permanently labelled "By Land"/"Terrestre", and the moment the terms
   checkbox is accepted, the controller runs
   `viaInternacion = "terrestre"; utils.cambiaViaInternacion();` **unconditionally** —
   this filters the `#internacion` (`meansOfEntry`) `<select>` down to a
   single option and disables it. Confirmed live: after accepting terms, the
   rendered `#internacion` element has exactly two `<option>`s ("Select One"
   and "By land") and `disabled === true`; the "By air" value is not merely
   hidden, it is absent from the option list entirely. The underlying
   catalog (`tiposFlujo`) and the controller's own conditional logic
   (`cargaCatalogoPuntosInternacion`) still define an "aereo" pathway with an
   associated airline-name/flight-number pair and a 38-entry air
   point-of-entry catalog, but **no URL or path found this cycle reaches it**
   (no `?tipo=aereo`-style parameter, no sibling `solicitudAerea.html`, no
   link to one from the FMM landing pages). Rather than model an unreachable
   branch as if it were live, this v1.0.0 document is deliberately scoped to
   the land-entry pathway only, with `meansOfEntry` modelled as a
   single-value enum (`["land"]`) rather than a real user choice. If a
   distinct air-entry INM wizard URL is found in a future cycle, it should
   become either a sibling document or a `visibleWhen`-gated extension of
   this one — flagged here rather than guessed at.
2. **`applicantIsMinor` is a synthetic field, not a source field.** The live
   wizard computes "is the applicant a minor" from `dateOfBirth` and
   `arrivalDate` and uses that computed fact — never asked of the applicant
   directly — to gate the guardian section. GovSchema's v0.3 field/Condition
   model is flat and has no date-arithmetic operator (§16 of SPEC.md lists
   "Calculated / derived fields" as an explicitly deferred construct), so
   there is no way to express "age at arrival < 18" as a `Condition` over
   `dateOfBirth` and `arrivalDate` directly. This document introduces
   `applicantIsMinor` as an explicit boolean gate — the same pattern
   SPEC.md §6.7's own worked example uses for `isLLC` — and documents in the
   field's own `description` that it is derived, not itself a form field. A
   reviewer should confirm this is the right resolution versus, e.g., scoping
   the document to adults only (the precedent `br/pf/passport-application`
   took) — this cycle chose to model the minor pathway instead, since the
   task's own dry-run requirement explicitly called out exercising the
   conditional guardian section.
3. **The guardian-must-also-be-an-adult rule is not encoded as a second
   synthetic field.** The live wizard raises an error ("The tutor must be of
   legal age.") if the guardian's own `fechaNacimientoTutor` also computes to
   under 18 at final submission — a second, independent age computation, this
   time with no fixed comparison date encoded in this document (the live
   check compares the guardian's `fechaNacimientoTutor` against *today*, not
   `arrivalDate`, unlike the applicant's own age check). Introducing a second
   synthetic boolean here felt like compounding an already-disclosed
   modelling gap rather than resolving it cleanly; this rule is instead
   recorded as prose in `guardianDateOfBirth`'s `description`. Confirmed live
   by observing the error text with an empty `fechaNacimientoTutor` field
   (which fails the age check by producing a negative/invalid age).
4. **Country fields modelled as ISO 3166-1 alpha-2, not the catalog's own
   opaque numeric IDs.** The live form's actual submitted payload
   (`solicitante.pais.id`, etc., per `utils.creaFmme()`) references a country
   by an internal numeric catalog ID (e.g. `57` for the United States), not
   an ISO code — the ISO alpha-2/alpha-3 codes only exist as *additional*
   attributes (`clave`/`iso3`) on each catalog entry, not as the value the
   form transmits. This document models every country-valued field
   (`nationality`, `countryOfBirth`, `documentIssuingCountry`,
   `countryOfResidence`, `guardianNationality`, `guardianCountryOfBirth`) as
   the ISO 3166-1 alpha-2 code rather than the numeric ID, since alpha-2 is
   the internationally standard, jurisdiction-neutral encoding this
   registry's design principles call for (SPEC.md §3 principle 6) and is
   still recoverable from the same catalog (`clave` per entry). A consumer
   that needs to actually drive this specific live form would need to
   resolve alpha-2 → the current numeric ID via INM's own catalog endpoint at
   fill time, since the numeric IDs are an internal implementation detail
   with no external stability guarantee (unlike the ISO code).
5. **`especifiqueMotivo`'s two non-standard-English values.** `resident`
   (source `clave` `otro/residente`) has no English `traduccion` in the
   catalog at all — even under `?lang=en` the entry is untranslated Spanish
   ("Residente"); this document supplies its own English slug. Separately,
   `artist_and_sportsman` (source `clave` `otro/artista-deportista`)
   preserves the catalog's own English translation text verbatim, including
   what reads as a source-side spelling choice ("Sportman" rather than
   "Sportsman") — kept as-is rather than silently "corrected", since
   GovSchema describes the source, it does not edit it.
6. **The 180-day-stay and passport-validity offset rules are prose, not
   `crossFieldValidation`.** `departureDate` must be ≥ `arrivalDate` **and**
   ≤ `arrivalDate` + 179 days; `documentExpiryDate` must be ≥ `arrivalDate` +
   179 days. Only the `≥` half of the first rule is expressible with the
   v0.3 `Condition`/`crossFieldValidation` grammar's `compare` operators
   (`greaterThanOrEqual` between two field values, encoded as
   `departureNotBeforeArrival`); the "+179 days" offset itself has no
   representation in a grammar whose leaf comparisons take another field's
   *raw* value, not an arithmetic transform of it (SPEC.md §16 lists relative/
   calculated constraints as out of scope for v0.3). Both offset rules are
   recorded as descriptive prose on `departureDate` and `documentExpiryDate`
   instead of a (necessarily incomplete, and therefore misleading)
   `crossFieldValidation` entry.
7. **No `documents[]` entries.** The FMM wizard itself collects no file
   uploads and states no fee amount on this page; a separate INM payment
   portal (`inmex.html`) is referenced only as after-the-fact guidance in the
   review-step copy, with no amount shown. Consistent with the
   `br/pf/passport-application` precedent for an unstated, separately-paid
   fee, this document leaves `documents[]` absent rather than guessing an
   amount or modelling a paymentless placeholder.
8. **`steps` reflect the wizard's own visual section headings on a single
   scrollable page, not a multi-tab flow.** Unlike
   `br/pf/passport-application`'s SINPA wizard (four real, separately-clicked
   tab panels), INM's FMM renders as one continuously-scrollable page with
   `<h2>`/`<h3>` section headings and a single "Save" (`procesar`) button at
   the bottom. `steps` is still used here, matching this registry's general
   convention of grouping fields for presentation, but a reviewer should
   read `steps[].next` as "the next section on the same page", not as a
   literal page transition the way it is for SINPA or most other
   multi-screen wizards in this registry.

## Mock-data conformance check (Phase 4)

A fabricated, non-submitting mock application packet lives at
`conformance/mx/inm/forma-migratoria-multiple-electronica/1.0.0/application-packet.json`
(+ `.txt` rendering): a fictitious US tourist, adult, entering by land at "El
Chaparral" bound for Baja California. This exact data set was entered into
the live wizard field-by-field (see Extraction method step 5): the wizard's
own client-side validation accepted it in full, and clicking "Save"
(`procesar`) produced **zero** validation errors other than the empty CAPTCHA
verification-code field (which this document does not model — see the
top-level `description`). Variants were then run one field-change at a time
directly against the live wizard (not a local reimplementation) to confirm
each rule this document claims:

- Mismatched `documentNumberConfirmation` → live error "Does not match with
  the number of the document."
- Mismatched `documentIssueDateConfirmation` → live error "Does not match
  with the issuing date."
- Mismatched `documentExpiryDateConfirmation` → live error "Does not match
  with the expiration date."
- Mismatched `emailConfirmation` → live error "Does not match with the
  email."
- Birth date yielding age 10 at arrival → guardian section appears, its six
  fields become required (empty birth date → "The tutor must be of legal
  age." error, confirming rule 3 above).
- Birth date yielding age under 2 at arrival → `reasonOfTrip`'s live option
  list drops to `Tourism`/`Other` only.

This document was **not** submitted to `inm.gob.mx` or any other live system
at any point — the final "confirmar" POST action was never invoked, per
`GOVERNANCE.md`.

## What is out of scope for v1.0.0

- **Air and sea entry** — see judgment call 1 above.
- **The CAPTCHA/verification-code step and final submission** — this
  document ends at the point the live wizard itself reaches a
  client-side-valid, ready-to-save state; the CAPTCHA image/code pair and the
  POST to `/fmme/resources/solicitud/` are excluded by design (per
  `AGENTS.md` and `GOVERNANCE.md`, GovSchema never submits on anyone's
  behalf).
- **Fee payment** — see judgment call 7 above.
- **The post-save PDF download** and folio/tracking-number retrieval flow —
  these happen only after a real submission and are not part of the
  data-entry wizard this document models.
- **Mexico's other four verticals** (Passport, DMV, Business Formation/Tax,
  National ID) — all scouted this cycle and found weak or gated for now (see
  "Why this document exists" above); left as open backlog candidates for a
  future cycle, not dead ends. SAT's live preinscription wizard in
  particular (403 to a direct fetch) is worth a real-browser retry.

## Path to a `verified` claim (next step)

To advance this document to `status: verified`, a reviewer needs to
independently re-render the same live FMM wizard (both language variants),
re-check every `sourceRef` and validator-derived constraint against the live
JS source directly (not just the rendered DOM, which under-reports
constraints — see Extraction method step 2), re-confirm the land-only entry
scope is still accurate, and confirm no newer wizard revision has changed the
field set or catalog.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-06** (~6
months): this is the registry's first Mexican document and the first
document in this registry sourced by direct client-side-validator-source
inspection (rather than pure DOM/PDF/screenshot extraction), so the shorter
end of the cadence is appropriate until the technique and the land-only scope
boundary are independently confirmed. Re-check the source, and confirm no
newer wizard revision has been published, on or before that date and on any
`source.url` change.
