# Verification record — `cz/mpo/jednotny-registracni-formular-fyzicka-osoba` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-08`

**Amended same-day** in response to GOV-1807's review-gate findings on PR
#298: (1) `seatPostalCode` (§03.e) was missing the `requiredWhen
seatSameAsResidence == false` gate that its four sibling seat-address fields
(`seatStreet`/`seatHouseNumber`/`seatMunicipality`/`seatCountry`) carry —
inconsistent with §02's own unconditionally-`required` `residencePostalCode`
and with this registry's established convention for `sameAs`-style address
toggles (e.g. `za/sars/individual-income-tax-return-itr12`'s
`residentialAddressSameAsPostal` gates its postal-code field too). Fixed by
adding the same `requiredWhen` gate to `seatPostalCode`. (2) The §07-§11
summary table below stated the responsible-representative field count as
"33 (12+8+7+1+1...)" — the parenthetical sums to 29, not 33; the schema's
actual field count (116 total, verified independently) was never affected,
only this table's arithmetic. Fixed the table to read 29.

This is a `GovSchema Standard Research` cycle (**GOV-1804**). The registry's
25 existing jurisdictions are heavily screened, and this repository's own
`CATALOG.md` "Known Gaps & Opportunities" section documents a long list of
reconfirmed-dead gaps within them (Chile Passport/Visa/National ID, Spain
Passport, UAE Passport, several duplicate national-visa forms, etc.). Per the
established pattern of the last several cycles (Chile GOV-1624, Indonesia
GOV-1546, Poland GOV-1666, Estonia GOV-1698, Portugal GOV-1750, Malaysia
GOV-1774), this cycle prioritized opening a brand-new jurisdiction over
re-screening those confirmed dead ends.

## Why this candidate

### Candidates screened and rejected

1. **Austria — Gewerbeanmeldung (trade registration).** Several regional
   (Bundesland-level) PDF forms were identified by search (e.g. Tirol's
   `form01_01.pdf`, Upper Austria's `LWLD_Wi_E7`/`E8` forms). Every direct
   connection attempt to `www.tirol.gv.at` from this research environment
   timed out at the TCP level (`curl`: "Connection timed out after 20000ms"),
   with no HTTP response at all — distinct from a WAF/CAPTCHA block, more
   consistent with an IP/ASN-level block on this environment's egress range.
   Not re-attempted via Wayback Machine this cycle because a directly-reachable,
   comparably strong alternative (see below) was found first. Left as an
   untested, not-confirmed-dead candidate for a future cycle with different
   network access.
2. **Sweden — Skatteverket / Transportstyrelsen forms.** Skatteverket's SKV
   4805/448 (simplified employer declaration) and Transportstyrelsen's
   vehicle-transfer forms were identified by search. `www.skatteverket.se`
   returned `000` (connection failure) on a direct `curl` probe; the same
   environment-level access issue as Austria above, not attempted via
   Wayback this cycle. Left as an untested, not-confirmed-dead candidate.
3. **Switzerland — Passport (domestic issuance).** `ch.ch`'s own description
   of applying for a Swiss passport/ID card is "online, by telephone, or at
   the passport office in your canton" — a cantonal, appointment/counter
   -based process (biometric capture is mandatory for a Swiss passport) with
   no downloadable, field-level federal application PDF found. Switzerland's
   Visa vertical was already a confirmed duplicate dead end from a prior
   cycle (GOV-1774); Passport was the next-best vertical to check for this
   jurisdiction and was not picked. Left open, likely weak, for a future
   cycle (Switzerland's cantons administer passports individually, so a
   single national PDF may not exist at all).
4. **Czech Republic — screened and picked.** `mpo.gov.cz` (Ministerstvo
   průmyslu a obchodu, MPO) responded directly with HTTP 200 to every probe
   this cycle, unlike the Austrian/Swedish hosts above. Its own JRF
   (Jednotný registrační formulář, Unified Registration Form) landing page
   links a natural-person (fyzická osoba) trade-registration PDF and a
   parallel legal-entity (právnická osoba) PDF, both dated 2025 and both
   unauthenticated, no CAPTCHA/WAF gate. Picked over the two connectivity
   -blocked candidates above on the simple basis that it could actually be
   verified this cycle.

### Candidate picked: Czech Republic Business Formation — JRF (fyzická osoba)

The Jednotný registrační formulář (JRF) is the form the Ministry of Industry
and Trade publishes so a natural person can, in one filing, report a trade
-licence registration or concession application to their locally competent
Trade Licensing Office (živnostenský úřad) under Act No. 455/1991 Sb.
(živnostenský zákon), and simultaneously route the same filing on to the
Czech Social Security Administration (ČSSZ), a public health-insurance
company, and/or the Tax Office, per boxes the applicant checks in the form's
own Part E. This is a genuine, current, first-party government PDF — the
strongest and only fully-verifiable Business Formation candidate examined
this cycle.

## Sources examined

### Source 1 (primary `source`, the form)

- **Authority:** Ministerstvo průmyslu a obchodu (MPO, Ministry of Industry
  and Trade).
- **Document:** "Jednotný registrační formulář, fyzická osoba" — form
  footer reads "MPO FO – vzor č. 14 (240101)".
- **URL:**
  <https://mpo.gov.cz/assets/cz/podnikani/zivnostenske-podnikani/crm-jednotny-registracni-formular/2025/2/FO.pdf>
  (directly retrieved via `curl`, HTTP 200, no login; 2 pages, 78,208
  bytes).
- **Landing page confirming this is the current, live-linked form:**
  <https://mpo.gov.cz/cz/podnikani/zivnostenske-podnikani/crm-jednotny-registracni-formular/jednotny-registracni-formular---234081/>
  (fetched directly, HTTP 200; its own `href`s were grepped from the raw HTML
  to confirm the exact current asset path above, dated `2025/2` in the URL
  itself, rather than trusting a search-engine snippet).
- **Retrieved / reviewed:** 2026-07-08.
- **Extraction method:** downloaded directly, then parsed with `pdfjs-dist`
  (`legacy/build/pdf.js`). `page.getAnnotations()`-equivalent inspection (a
  raw byte scan for `/AcroForm`, `/Widget`, `/XFA`, `/FT`, `/Annot`) found
  **zero** matches on every stream — this is a static print/hand-fill
  template, not a fillable PDF, the same shape as this registry's
  `pl/ceidg/wniosek-o-wpis-do-ceidg` and `pl/mf/zeznanie-pit-37` sources.
  `page.getTextContent()` was used instead, but a first linear-concatenation
  pass badly scrambled the reading order because this form is laid out in
  multiple columns/blocks per page (numbered sections do not read
  top-to-bottom in the raw item order). A second pass sorted every text item
  by descending y-coordinate then ascending x-coordinate and grouped items
  into visual lines by y-proximity — this produced a clean, section-ordered
  transcript (`01 Podnikatel` through `11 Ustanovení odpovědného zástupce...`,
  then Parts B/C/E/F/G in their own printed order) that was used as the
  primary field inventory.
- **What it confirms:** all 11 numbered top-level sections (01-11) and Parts
  A-G's own lettered sub-item labels verbatim, including the two ANO/NE
  (yes/no) toggle fields (`03.a) sídlo trvale shodné s bydlištěm`, `06.k)
  provozovna podléhající kolaudaci`, `Část F.h) adresu použít i pro
  následující řízení`) and the `žena / muž` gender strike-out pair (`01.e`,
  `07.l`).

### Source 2 (corroborating, the official instruction guide)

- **Document:** "Pokyny k vyplnění jednotného registračního formuláře,
  fyzická osoba" (instructions for completing the JRF for a natural
  person), the same 2025-dated asset series as the form itself.
- **URL:**
  <https://mpo.gov.cz/assets/cz/podnikani/zivnostenske-podnikani/crm-jednotny-registracni-formular/2025/2/Pokyny-FO_2025.pdf>
  (directly retrieved, HTTP 200, no login; 4 pages, 77,404 bytes).
- **Retrieved / reviewed:** 2026-07-08.
- **What it confirms:** section-by-section prose explaining every numbered
  item's meaning and who must fill it in — including the exact instructions
  quoted/paraphrased in this schema's field descriptions: `01.o`
  (identifikační číslo osoby is filled in only by someone already assigned
  one), `03.a`'s same-as-residence toggle, `04`'s foreign-national-only
  scope, `05`'s free-trade-vs-craft/bound/licensed distinction and its
  numbered-annex continuation rule, `06`'s premises sub-items, `07`'s
  representative-appointment trigger (Act 455/1991 Sb. §7), `10`'s default
  appointment-date rule, Part B's SSZ-attachment-required-if-date-filled
  rule, Part C's minimum-advance statutory reference (§3a odst. 2 zákona č.
  592/1992 Sb.), and Part F's fully-optional correspondence-address block.
  No field named in the Pokyny was found missing from the form's own text
  layer, and no field in the form's text layer was found absent from the
  Pokyny's explanation — no substantive drift between the two documents.

## Field inventory (Phase 2)

All 116 `fields[]` entries and all 7 `documents[]` entries, and their exact
JRF section reference, are listed inline in `schema.json`'s own `sourceRef`
per field/document. Summary by section:

| Section | Fields | Notes |
|---|---|---|
| §01 Podnikatel | 16 (`titlePrefix`…`businessFirmName`) | Core identity fields (`firstName`, `surname`, `gender`, `placeOfBirth`, `birthCountry`, `citizenship`, `dateOfBirth`) required; `personalIdNumber`/`personIdentificationNumber` left mutually-optional (judgment call 1) |
| §02 Adresa bydliště | 8 | `residenceHouseNumber`/`PostalCode`/`Municipality`/`Country` required |
| §03 Adresa sídla | 9 (`seatSameAsResidence` + 8 address fields) | `seatSameAsResidence` required; `seatStreet`/`seatHouseNumber`/`seatPostalCode`/`seatMunicipality`/`seatCountry` `requiredWhen` it is `false`, mirroring §02's own required subset (orientation number/municipality part/district stay optional in both sections) |
| §04 Adresa pobytu (zahraniční osoby) | 8 | All optional — applies only to a foreign applicant with a granted/confirmed residence permit |
| §05 Předmět podnikání | 2 | `businessActivityDescription` required (models only the first, pořadové číslo 1, activity — see judgment call 2) |
| §06 Provozovna | 12 | All optional (a premises is not mandatory at initial registration) |
| §07-11 Odpovědný zástupce | 29 (12+8+7+1+1 across §07-§11) | All optional — applies only when a responsible representative is appointed (see judgment call 3) |
| Část B (ČSSZ) | 3 | `notifySocialSecurityAdmin` required; the branch/date fields `requiredWhen` it is `true` |
| Část C (zdravotní pojišťovna) | 8 | `notifyHealthInsuranceCompany` required; company name/code/start-date `requiredWhen` it is `true`; bank-account/advance-amount left optional even when notified (see judgment call 4) |
| Část E (routing) | 6 (2 of Část B/C's booleans live here structurally, plus 4 attachment-count fields + `notifyTradeLicensingOffice`/`notifyTaxOffice`) | `notifyTradeLicensingOffice`/`notifyTaxOffice` required; attachment counts optional |
| Část F (doručovací adresa) | 8 | All optional — the Pokyny explicitly states this whole Part is at the applicant's discretion |
| Část G (doplňující údaje) | 3 | All optional |
| Signature block | 4 | `signatureDate` required; submitter name/place optional |

Total: **116 fields** plus **7 `documents[]` entries** (the ČSSZ attachment,
gated `requiredWhen notifySocialSecurityAdmin: true`; the free-trade
category list; and four ungated continuation annexes/supporting documents —
see judgment call 5). No `crossFieldValidation` rules or `exclusivityGroups`
are modelled.

## Access notes and judgment calls

1. **`personalIdNumber` (rodné číslo) and `personIdentificationNumber`
   (identifikační číslo osoby) are both modelled as plain optional strings**,
   rather than a `requiredWhen`-gated either/or pair. The Pokyny explains
   `01.o` is filled in only by someone *already* assigned an identifikační
   číslo (implying `01.n`, rodné číslo, is the default identifier for
   everyone else) but does not present this as a form-level checkbox toggle
   this schema could gate on — modelling both as optional avoids fabricating
   a toggle field the source does not itself provide, at the cost of not
   structurally enforcing "exactly one of these two is present."
2. **Only the first business activity (`pořadové číslo 1`) is modelled as
   `businessActivityDescription`.** The form itself provides only one visible
   inline slot on the main two pages; a second and further activity is
   continued on a separate "Předmět podnikání" annex per the Pokyny —
   modelled here only as `documents[].additionalBusinessActivitiesAnnex`,
   consistent with this registry's established convention for bounded
   repeating structures pending GSP-0009 (no array field type in spec v0.3),
   e.g. `pl/ceidg/wniosek-o-wpis-do-ceidg`'s own PKD-code annex handling.
3. **§07-§11 (responsible representative, 33 fields) are modelled with no
   `required`/`requiredWhen` gate at all — every field is a plain optional.**
   The live form provides no single boolean toggle field for "is a
   responsible representative appointed?"; the Pokyny frames the whole block
   as filled in only when applicable ("Vyplní se pouze v případě, je-li
   odpovědný zástupce podnikatelem ustanoven"). Rather than fabricate a
   synthetic toggle field the source does not print, this schema leaves the
   entire block optional and documents the conditional nature in each
   field's own `description` and in this note.
4. **Part C's bank-account/advance-amount fields (`bankAccountNumber`,
   `bankRoutingCode`, `monthlyAdvanceAmount`) remain optional even when
   `notifyHealthInsuranceCompany` is `true`.** The Pokyny explicitly notes an
   applicant may not yet hold a bank account and that some months carry no
   advance-payment obligation at all — so these three sub-fields cannot be
   honestly modelled as unconditionally required whenever health-insurance
   notification is selected.
5. **Four `documents[]` entries
   (`additionalBusinessActivitiesAnnex`/`additionalResponsibleRepresentativeAnnex`/`additionalPremisesAnnex`/`powerOfAttorney`/`professionalQualificationDocument`)
   carry no `requiredWhen` gate**, since no boolean field in this schema
   reliably signals "a second business activity/representative/premises is
   being declared" or "this is a craft/bound/licensed, not free, trade" —
   modelling a fabricated gate would risk the absent-field-ambiguity class of
   bug this registry has previously hit (documented in this project's own
   internal notes on `notEquals`/`equals` gates against a possibly-absent
   optional field). Only `socialSecurityAdminAttachment` is gated, against
   the `required: true` field `notifySocialSecurityAdmin` (the same
   "always gate against a required field" convention `pl/ceidg`'s own
   VERIFICATION.md documents as judgment call 5 there).
6. **The JRF's own Part A instructions state it cannot itself carry a tax
   -registration application or a registration-data change/deregistration
   request** — those use separate Ministry of Finance forms (e.g.
   `MF_5101a`, `MF_5111`, `MF_5129`, all linked from the same landing page)
   attached to this filing when `notifyTaxOffice` is checked. Those
   companion forms' own fields are out of scope for this version.
7. **No repeating/array field type (GSP-0009).** As in judgment call 2, this
   applies equally to §06 (a second premises, via the
   `additionalPremisesAnnex` document) and §07 (a second responsible
   representative, via `additionalResponsibleRepresentativeAnnex`).
8. **This document models only the fyzická osoba (natural-person) variant.**
   MPO's landing page also links a separate právnická osoba (legal-entity)
   JRF PO PDF with a materially different field set (no personal-identity
   section, different registration particulars) and a separate ZL (Změnový
   list, change-of-registration) form for amending an existing entry — both
   out of scope for this version, consistent with how
   `pl/ceidg/wniosek-o-wpis-do-ceidg` scoped only its own new-registration
   pathway out of CEIDG-1's five.
9. **The Czech PSČ postal-code pattern (`^[0-9]{3} ?[0-9]{2}$`) accepts both
   the printed 5-digit form and the commonly-used "XXX XX" spaced form**,
   confirmed against the form's own "PSČ" boxes (drawn as a 5-cell grid with
   no visible space, but Czech postal convention and this registry's own
   practice for similar fields treat the optional space as equivalent).

## Test run (Phase 3)

No live submission was attempted: filing the JRF triggers a real trade
-licence registration with a Czech Trade Licensing Office and, depending on
the boxes checked, ČSSZ/health-insurance/tax-office notifications — creating
fabricated applicant records against these live government systems is not a
safe or reversible action, the same reasoning this registry has applied to
every comparable registration-type schema (e.g. `pl/ceidg`).

Both meta-schema validators were run against the finished document and pass
clean:

```
$ node tools/validate.mjs registry/cz/mpo/jednotny-registracni-formular-fyzicka-osoba/1.0.0/schema.json
ok   registry/cz/mpo/jednotny-registracni-formular-fyzicka-osoba/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/cz/mpo/jednotny-registracni-formular-fyzicka-osoba/1.0.0/schema.json
ok   registry/cz/mpo/jednotny-registracni-formular-fyzicka-osoba/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

A hand-written structural self-check (field-name uniqueness, no
`required`+`requiredWhen` conflicts, every `requiredWhen`/document
`requiredWhen` referencing an existing field name) was also run against the
generated document before submission and reported zero issues.
