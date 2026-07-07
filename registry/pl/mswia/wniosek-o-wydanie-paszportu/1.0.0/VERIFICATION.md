# Verification record — `pl/mswia/wniosek-o-wydanie-paszportu` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-07`

This is **GOV-1685**: research, document, test, and author Poland's Passport
vertical, a confirmed-open, unscreened backlog candidate (global Passport was
17/22 jurisdictions before this cycle). Poland was already open (National ID,
Business Formation, DMV; 3/6 verticals) — this closes its Passport gap,
bringing Poland to 4/6.

## Why this source, not a dead end

Poland's passport application (like its dowód osobisty) moved to a
clerk-filled electronic form in 2022: gov.pl's own "Uzyskaj paszport" service
page states in its own words that no paper wniosek needs to be prepared at
all ("Nie musisz przygotowywać wniosku o paszport" language pattern —
confirmed live this cycle), since the passport office fills an equivalent
electronic application from data the applicant supplies plus registry data,
during the mandatory in-person visit. No downloadable AcroForm PDF and no
field-numbered informator/guide PDF was found for this specific process this
cycle (unlike `pl/mswia/wniosek-o-wydanie-dowodu-osobistego`, whose sibling
dowód osobisty process still has a genuine gazetted AcroForm PDF, and unlike
`es/aeat`'s Modelo 036, whose casilla-numbered guide PDF was this registry's
prior fallback technique). Several candidate paper-form links were checked
and rejected as sources this cycle:

- `formularzeidruki.pl`'s "wzór wniosku o wydanie paszportu" page is a
  third-party scraped-content site whose own "download" links resolve to
  Google Drive file/document links, not an official government artifact —
  rejected as unverifiable and non-authoritative.
- `bip.powiat-otwocki.pl`'s "Wzór poprawnie wypełnionego wniosku
  paszportowego dla osób pełnoletnich" PDF is a genuine local-government (BIP)
  document, but its content is a single page holding only its own title as
  extractable text — the actual "correctly filled example" content is a
  scanned/embedded image, not text or an AcroForm layer, and (per its own
  title) is a specimen/exemplar, not the current authoritative wzór — not
  used as a field-source.
- The Rozporządzenie MSWiA z dnia 9 września 2022 r. w sprawie dokumentów
  paszportowych (Dz. U. z 2022 r. poz. 2050), the regulation implementing the
  Act below, was checked in full (49 pages, extracted directly via
  `pdfjs-dist`) on the hypothesis that it might gazette a wniosek template the
  way the dowód osobisty regulation does. It does not: its five annexes are
  the wzór of the passport booklet itself (Załącznik 1), the temporary
  passport (2), the diplomatic passport (3), the service passport (4), and
  the temporary passport's personalization sticker (5) — none is an
  application-form template. This confirms no gazetted wniosek wzór exists
  for this process.

Rather than treat the absence of a downloadable form as a dead end (the
conclusion three prior cycles reached for Spain's DNI and this cycle
re-reached for Chile's passport/national-ID gaps), this document instead
sources every field directly from **Art. 33 of the Ustawa z dnia 27 stycznia
2022 r. o dokumentach paszportowych** — the primary legislation that
enumerates, by name, exactly what data the wniosek o wydanie dokumentu
paszportowego must contain. This is a materially stronger source than a
scraped or rendered form would be: it is the legal definition of the form's
required content, not one office's implementation of it, and it is
unauthenticated, unambiguous, and directly citable article-by-article.

## Sources examined

### Source 1 (primary `source`, the governing Act)

- **Document:** Ustawa z dnia 27 stycznia 2022 r. o dokumentach paszportowych
  — current consolidated text (tekst jednolity), Dz. U. z 2024 r. poz. 1063.
- **URL:** <https://api.sejm.gov.pl/eli/acts/DU/2024/1063/text.pdf> (Sejm's
  own ELI act-text API, HTTP 200, no login).
- **Retrieved / reviewed:** 2026-07-07.
- **Extraction method:** downloaded directly via `curl`, parsed in full (29
  pages) with `pdfjs-dist`'s `page.getTextContent()`. Cross-checked against
  the original enacted text, Dz. U. z 2022 r. poz. 350
  (`https://api.sejm.gov.pl/eli/acts/DU/2022/350/text.pdf`, 30 pages,
  extracted the same way) — every article this document models (Art. 5,
  17, 21, 28, 30, 31, 33, 36, 38, 41, 42, 43, 46) is verbatim-identical
  between the 2022 original and the 2024 consolidated text on every point
  used here; only the cross-referenced-Act citation footnotes (e.g. which
  Dz. U. issue amended the emerytury i renty Act) differ, which this
  document does not depend on.
- **What it confirms:** Art. 5 ust. 1 (citizenship is the sole eligibility
  gate: "Prawo do posiadania dokumentu paszportowego przysługuje każdemu
  obywatelowi polskiemu"); Art. 33 (the wniosek's full statutory content:
  ust. 1 pkt 1 the applicant's identity data lit. a-g, pkt 2 the applicant's
  own signature reproduction, pkt 3 parent/guardian/curator data for a
  person without full legal capacity, pkt 4 the applicant's correspondence
  address, pkt 5 the truthfulness declaration and criminal-liability clause,
  pkt 6 the applicant's signature, pkt 7 the office's own adnotacje
  urzędowe; ust. 3 the optional contact-data-register phone/email); Art. 36
  (the seven categories of documents/evidence an applicant presents); Art.
  38 ust. 5 (the office's own discretion to additionally request birth
  surname, previous surnames, and parents' given names/surnames/birth
  surnames to help establish identity); Art. 41 (the full photograph
  specification, its 6-month freshness window, and its named exceptions);
  Art. 42 (fingerprint collection and its two exemptions); Art. 17 (10-year
  standard adult validity); Art. 21 (the ~10 statutory reduced/exempt-fee
  categories); Art. 46-47 (the rare "second passport" pathway, out of
  scope).

### Source 2 (corroborating, the live gov.pl service description)

- **URL:**
  <https://www.gov.pl/web/gov/uzyskaj-paszport-usluga-dla-osoby-doroslej>
  (HTTP 200, no login).
- **Retrieved / reviewed:** 2026-07-07.
- **What it confirms:** the practical, non-statutory detail the Act itself
  does not state — that no paper wniosek is prepared at all in the ordinary
  case (the office fills an electronic form in front of the applicant); the
  current standard fee (140 PLN) and named reduced-fee groups in plain
  language (students 18-26, pensioners, disability-benefit recipients, and
  20+ other categories, consistent with Art. 21's own longer statutory
  list); the ~1-month standard processing time; that fingerprints are taken
  in person; and that a distinct `uzyskaj-paszport-tymczasowy` service
  exists for the temporary passport, corroborating this document's decision
  to exclude that process (mirroring `de/bmi/passport-application`'s
  exclusion of the vorläufiger Reisepass on the same basis).

### Source 3 (corroborating, a voivodeship-office service description)

- **URL:**
  <https://www.katowice.uw.gov.pl/usluga/paszporty/paszport-dla-osoby-pelnoletniej>
  — attempted this cycle but could not be retrieved (TLS certificate
  verification failure on this cycle's fetch tooling, not a login/CAPTCHA/WAF
  gate). Not used as a source; listed here for a future reviewer to retry
  with different tooling, the same disclosure discipline this registry
  applies to any source it could not actually read this cycle.

## Field inventory (Phase 2)

All 18 `fields[]` entries and the 4 `documents[]` entries carry their own
Art./pkt `sourceRef` inline in `schema.json`. Summary by step:

| Step | Fields | Required for this v1.0.0? |
|---|---|---|
| Eligibility | `isPolishCitizen` | Required (folds Art. 33 ust. 1 pkt 1 lit. e `obywatelstwo` into a single gate — judgment call 1) |
| Applicant details | `nazwisko`, `imiona`, `dataUrodzenia`, `miejsceUrodzenia`, `plec`, `pesel` | All required — Art. 33 ust. 1 pkt 1 lit. a/b/c/d/f/g |
| Supplementary identity data | `nazwiskoRodowe`, `poprzednieNazwiska`, `imieOjca`, `imieMatki`, `nazwiskoRodoweMatki`, `nazwiskoRodoweOjca` | All optional — Art. 38 ust. 5 is discretionary ("może żądać"), not universal (judgment call 2) |
| Correspondence and contact | `correspondenceAddressLine`, `correspondenceCity`, `correspondencePostalCode` required; `numerTelefonuKontaktowy`, `adresEmailKontaktowy` optional | Address required per Art. 33 ust. 1 pkt 4; phone/email optional per Art. 33 ust. 3 |
| Fee | `claimsReducedOrExemptFee` | Optional |
| Documents | `currentIdentityDocument` (optional), `photo` (required), `proofOfFeePayment` (required), `reducedOrExemptFeeProof` (optional, `requiredWhen` `claimsReducedOrExemptFee` true) | Per Art. 36 |

Total: **18 fields** plus **4 `documents[]` entries**. No
`crossFieldValidation` or `exclusivityGroups` are modelled — the one
conditional relationship this cycle found structurally confirmable
(`reducedOrExemptFeeProof`'s dependency on `claimsReducedOrExemptFee`) is
expressed as a `requiredWhen` gate on the document itself.

## Access notes and judgment calls

1. **`isPolishCitizen` folds the Act's own `obywatelstwo` (citizenship) data
   element (Art. 33 ust. 1 pkt 1 lit. e) into a single boolean eligibility
   gate with `eligibleValues: [true]`,** rather than an open citizenship
   field. Reasoning: Art. 5 ust. 1 makes Polish citizenship the sole
   condition of the right to hold a passport document at all; no other
   citizenship value is a legitimate input to this specific process. This is
   the exact same treatment `pl/mswia/wniosek-o-wydanie-dowodu-osobistego`
   gives its own analogous `obywatelstwoPolskie` field, and this document
   follows that sibling schema's precedent directly.
2. **The six "supplementary identity data" fields
   (`nazwiskoRodowe`/`poprzednieNazwiska`/`imieOjca`/`imieMatki`/
   `nazwiskoRodoweMatki`/`nazwiskoRodoweOjca`) are modelled as optional, not
   required,** even though the sibling dowód osobisty schema requires close
   analogues (`imieOjca`, `imieMatki`, `nazwiskoRodoweMatki`) unconditionally.
   This is a real difference in the two source instruments, not an
   oversight: the dowód osobisty form's own AcroForm makes these required
   fields on every application; the passport Act's Art. 38 ust. 5 instead
   frames the office's right to request this data as discretionary ("może
   żądać podania"), used only when needed to establish identity,
   citizenship, or other data necessary for the application — a genuine
   conditional collection, not a universal one. Modelling it as optional
   reflects the source's own wording rather than importing the sibling
   schema's requiredness by analogy.
   **Correction (post-review, GOV-1687):** an earlier revision of this
   document carried over the sibling dowód osobisty schema's exact 3-field
   set (`imieOjca`/`imieMatki`/`nazwiskoRodoweMatki`) by analogy instead of
   independently transcribing Art. 38 ust. 5 pkt 2's own text, which names
   given names, surnames, *and* birth surnames for **both** parents. The
   review gate caught this and `nazwiskoRodoweOjca` (father's birth
   surname, the direct parallel to the modelled `nazwiskoRodoweMatki`) has
   been added. The parents' current/plain surnames (`nazwisko matki`/
   `nazwisko ojca`, distinct from their birth surnames) are pkt 2 text but
   are deliberately still **not** modelled as separate fields in this
   v1.0.0: the parent's *birth* surname is the datum this Act's own drafting
   treats as identity-corroborating (it is stable and does not change on
   marriage, unlike a current surname), and the sibling identity-card form's
   own field set independently confirms birth surname, not current surname,
   as the data element gathered for this purpose in Polish civil-registry
   practice. A future revision could add `nazwiskoMatki`/`nazwiskoOjca` if a
   field-numbered source ever confirms the office collects them separately
   from the birth-surname fields.
3. **`plec`'s two enum values (`kobieta`/`mężczyzna`) are borrowed from
   `pl/mswia/wniosek-o-wydanie-dowodu-osobistego`'s own confirmed AcroForm
   export values, not from this document's own source review** — the Act's
   Art. 33 ust. 1 pkt 1 lit. f requires a `płeć` data element without
   stating its coded values, and no field-level Polish passport form exists
   this cycle to confirm them directly. Disclosed as an inference from a
   same-jurisdiction sibling schema's own directly-confirmed source, not
   from this document's own primary source.
4. **The correspondence address (`correspondenceAddressLine`/
   `correspondenceCity`/`correspondencePostalCode`) is modelled as three
   fields, not the five-field split
   `pl/mswia/wniosek-o-wydanie-dowodu-osobistego` uses for its own
   (optional) correspondence-address block.** That sibling schema's 5-way
   split (ulica/numerDomu/numerLokalu/kodPocztowy/miejscowość) came directly
   from its own AcroForm's own field-by-field structure; no such form exists
   for this process to show how — or whether — the electronic wniosek's own
   internal address field is subdivided. This document instead uses the
   simpler 3-field address convention (`street-line`/`city`/`postal-code`)
   already established elsewhere in this registry for a source that names an
   address as one requirement without a confirmed sub-field breakdown (e.g.
   `gb/hmpo/passport-application-first-adult`'s
   `addressLine1`/`addressTown`/`postcode`). Also unlike that sibling
   schema, this address is modelled as **required**, because Art. 33 ust. 1
   pkt 4 lists it among the wniosek's unconditionally required elements
   (items 1-7 of ust. 1), with no "not obligatory" qualifier anywhere in the
   Act's own text — a real difference from the dowód osobisty form's own
   explicit "nie jest obowiązkowy" callout for its own correspondence block.
5. **`claimsReducedOrExemptFee` does not enumerate Art. 21's ~10 statutory
   reduced/exempt-fee categories as a closed `validation.enum`.** The
   categories (minors under 12 and 12-18, students/pupils 18-26, pensioners,
   holders of a social pension, persons with a disability certificate and
   their dependent spouses, residents of social-care homes or recipients of
   standing social-assistance benefits, combatants, and certified
   anti-communist-opposition activists/persons repressed for political
   reasons, among others enumerated across Art. 21 ust. 1 pkt 1-10+) each
   cross-reference a distinct external Act (pension law, disability law,
   social-assistance law, combatants' law, etc.), are amended independently
   of the passport Act, and are exactly the kind of granular, cross-Act
   enumeration this document's own single-cycle source review cannot keep
   reliably current — left as a boolean flag plus a supporting-evidence
   document rather than fabricated as a closed list, consistent with this
   registry's convention of omitting an unconfirmed enumeration rather than
   guessing one.
6. **The photograph's two named exceptions (a registered religious
   community's certificate for headwear; a disability certificate for dark
   glasses) are described in the `photo` document's own `handling` prose but
   are not modelled as their own separate `documents[]` entries.** Reasoning:
   both are narrow, applicant-specific edge cases of a single document
   requirement (the photo itself), not independently-required artifacts of
   the general adult pathway this document scopes to; disclosed here rather
   than silently dropped.
7. **The minor/ward pathway (a parent, legal guardian, or curator filing on
   behalf of a person without or with limited legal capacity, Art. 28 ust.
   2, Art. 30 ust. 2, and the parental-consent machinery of Art. 43) is
   entirely out of scope**, mirroring
   `pl/mswia/wniosek-o-wydanie-dowodu-osobistego`'s own exclusion of its
   analogous pathway. A future revision could add it as its own set of
   representative-identity and consent fields.
8. **The applicant's own signature reproduction (Art. 33 ust. 1 pkt 2 and pkt
   6) and the fingerprint biometric (Art. 42) are not modelled as
   `fields[]` or `documents[]` entries at all.** Both are captured in person,
   directly onto the passport office's own signature-capture device or
   fingerprint scanner, during the mandatory attendance this document's
   final `in_person_biometric_submission` step describes — there is no
   applicant-suppliable value for either ahead of that appointment, the same
   treatment `de/bmi/passport-application` gives the German Reisepass
   process's own in-person-only submission channel.
9. **The office's own "adnotacje urzędowe" (official annotations, Art. 33
   ust. 1 pkt 7) are entirely out of scope**, the same clerk-only exclusion
   `pl/mswia/wniosek-o-wydanie-dowodu-osobistego` applies to its own
   identically-named block.
10. **The separate paszport tymczasowy (temporary passport, its own Art. 35
    no-PESEL data set and Art. 48 emergency-reason eligibility), paszport
    dyplomatyczny, and paszport służbowy processes are entirely out of
    scope**, each having its own distinct eligible-population and
    data-collection rules under this same Act; and the rare "second
    passport" pathway (Art. 46-47, granted only in exceptional
    life/health/humanitarian/state-security circumstances) is likewise out
    of scope. Candidates for future, separately-versioned schemas.
11. **No fee amount is encoded as authoritative data**, consistent with
    every schema in this registry (fee schedules are set by separate,
    independently-amended regulation and change over time).

## Test run (Phase 4)

No live submission was attempted: the application requires the applicant's
own personal attendance at a Polish passport office or consulate, and
submitting fabricated data against Poland's live Rejestr Dokumentów
Paszportowych and PESEL registry is not a safe or reversible action.

Instead, one fully hand-constructed mock record was built from this
document's own field inventory and checked by a small ad hoc Node script
(not just eyeballed) against every field's `required`/`requiredWhen`/
`validation` rule; it is committed as this document's conformance fixture
(`conformance/pl/mswia/wniosek-o-wydanie-paszportu/1.0.0/application-packet.json`).

**Scenario (committed fixture) — an adult Polish citizen renewing an
expiring passport, with the office additionally requesting her mother's
maiden name, a full correspondence address and both optional contact
channels supplied, and a student (18-26) reduced-fee claim with proof.**
`isPolishCitizen: true` (satisfies `eligibleValues: [true]`), `nazwisko:
"Zielińska"`, `imiona: "Aleksandra"`, `dataUrodzenia: "2001-11-19"`,
`miejsceUrodzenia: "Wrocław"`, `plec: "kobieta"` (valid enum member),
`pesel: "01111912345"` (11 digits), `nazwiskoRodoweMatki: "Kowalczyk"`
supplied (the other five optional identity-corroboration fields
deliberately left absent, to also exercise the "optional and independently
settable" path), `correspondenceAddressLine`/`correspondenceCity` supplied,
`correspondencePostalCode: "50-051"` (matches `NN-NNN`),
`numerTelefonuKontaktowy`/`adresEmailKontaktowy` supplied (the email matches
the field's pattern), `claimsReducedOrExemptFee: true` with
`reducedOrExemptFeeProof` supplied (satisfying its own `requiredWhen`
gate), plus `currentIdentityDocument`, `photo`, and `proofOfFeePayment`
documents supplied. The ad hoc script re-checks every `required`/
`requiredWhen` field and document, and every `validation.pattern`/
`validation.enum` rule, directly against `schema.json` (not just
eyeballed) — **zero errors**:

```
$ node check.mjs schema.json application-packet.json
All required/requiredWhen/enum/pattern checks passed against application-packet.json
```

**Negative controls** (each run through the same script against a variant
payload, not committed as separate fixture files):

- (a) `pesel: "123"` — caught: `FIELD pesel: value "123" fails pattern
  ^[0-9]{11}$`.
- (b) `plec: "K"` — caught: `FIELD plec: value "K" not in enum
  ["kobieta","mężczyzna"]` (only the two literal values are accepted, not an
  abbreviation).
- (c) `correspondencePostalCode: "50051"` (no hyphen) together with
  `claimsReducedOrExemptFee: true` and no `reducedOrExemptFeeProof`
  supplied — caught **both** violations in one run: the postal-code pattern
  failure, and `DOCUMENT reducedOrExemptFeeProof: required but missing`,
  confirming the `requiredWhen` gate is live, not decorative.
- (d) `isPolishCitizen: false` — correctly identified as a well-formed,
  passing value that is nonetheless outside `eligibleValues: [true]`; the
  script reports it as a routing-outcome note, not a rule violation, per
  GSP-0018 — confirming this document's eligibility gate does not
  double as a spurious data-validation error.
- (e) omitting `nazwisko` entirely — caught: `FIELD nazwisko: required but
  missing`.

All five negative controls were correctly identified by the script, and the
one positive-but-ineligible control (d) was correctly *not* flagged as an
error. This is the same "requiredWhen actually gates" discipline a prior
cycle's mock-data run caught a real bug with (see `MEMORY.md`:
`notEquals`-empty-string-absent-field-bug and the ZA ITR14 `requiredWhen`
catch) — here it confirms the gate is correct rather than finding a defect
to fix.

Both meta-schema validators were run against the finished document and pass
clean:

```
$ node tools/validate.mjs registry/pl/mswia/wniosek-o-wydanie-paszportu/1.0.0/schema.json
ok   registry/pl/mswia/wniosek-o-wydanie-paszportu/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/pl/mswia/wniosek-o-wydanie-paszportu/1.0.0/schema.json
ok   registry/pl/mswia/wniosek-o-wydanie-paszportu/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).
```
