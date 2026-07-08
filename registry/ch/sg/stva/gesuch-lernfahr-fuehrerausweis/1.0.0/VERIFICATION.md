# Verification record — `ch/sg/stva/gesuch-lernfahr-fuehrerausweis` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-08`

This is **GOV-1840**: a "GovSchema Standard Research" cycle whose primary
target was opening **Switzerland as the registry's 27th jurisdiction**.
CATALOG.md's own Known Gaps entry (GOV-1774) had already confirmed
Switzerland's Visa vertical as a dead end (SEM's national Type-D and
short-stay Schengen Type-C visa PDFs are field-for-field duplicates of
already-modelled EU-harmonized templates) and its domestic Passport process
as cantonal/appointment-based with no downloadable form, leaving DMV,
Business Formation, Taxes, Passport, and National ID unscreened. This cycle
screened all five and picked **DMV**.

## Candidate screening

### DMV — picked: canton St.Gallen's `Gesuch um Erteilung eines Lernfahr- bzw. eines Führerausweises`

Switzerland has no single federal application-processing body for driving
licences: the Bundesamt für Strassen (ASTRA, the federal roads office) sets
the substantive legal framework (the Verkehrszulassungsverordnung, VZV) —
including the medical-fitness self-declaration questionnaire and vision-test
requirements this document's Sections 2 and 4 implement — but each of
Switzerland's 26 cantons administers its own driving-licence register and
independently publishes its own PDF implementation of the application form.
This cycle located and cross-checked **four** different cantons' own current
PDFs for the same substantive application (all found via a `Formular 46`
/"Gesuch um Erteilung eines Lernfahr- bzw. Führerausweises"-style web search
the research brief itself flagged as a strong lead):

| Canton | URL host | Fetched | AcroForm fields |
|---|---|---|---|
| **St.Gallen (picked)** | `www.sg.ch` | HTTP 200, `%PDF-1.6`, 1,204,797 bytes, no `/Encrypt` | 63, clean human-readable field names (`Name`, `Vorname`, `Geburtsdatum`, `Stoffwechsel`, `AHV_1`..`AHV_4`, etc.) |
| Solothurn | `so.ch` | HTTP 200, 400,113 bytes | 121, clean field names (`SehtestDatum`, `2_ja_6`, `Möchten Sie zusätzlich einen elektronischen Lernfahrausweis (eLFA) erhalten?`, etc.) |
| Appenzell Ausserrhoden | `ar.ch` | HTTP 200, 236,956 bytes | 73, clean field names (`Email`, `MobilNr`, `Vorname`, etc.) |
| Aargau | `derfahrlehrer.ch` (3rd-party mirror) | HTTP 200, 533,528 bytes | 0 — flat, non-fillable |
| Zürich (official) | `www.zh.ch` | HTTP 200, 246,625 bytes | Genuine AcroForm but **encrypted**: `pdf-lib` throws `EncryptedPDFError`, and even with `ignoreEncryption: true` every field name decodes to garbled binary (a permissions-only encryption whose string crypt filter this tooling could not cleanly reverse) — not usable as a clean source |

St.Gallen's version was picked as the primary source: a genuine,
unauthenticated, currently-linked AcroForm PDF with clean field names, no
login/CAPTCHA/WAF gate, and (unlike Zürich's own official copy) no
encryption obstructing extraction. That three independently-run cantons
(SG, SO, AR) each separately implemented a fillable PDF with materially the
same section structure (Personalien → Krankheiten/Behinderungen/
Substanzkonsum → Beistand und Massnahmen → Sehtest → Bestätigung durch das
Einwohneramt) — not merely the same title — corroborates that this is a
nationwide, VZV-derived questionnaire rather than a St.Gallen-only
idiosyncrasy, even though no single ASTRA-hosted canonical PDF was found
(ASTRA's own `astra.admin.ch` publishes the VZV instructions/circulars this
form implements, e.g. `Weisungen betreffend die Ausstellung von Lernfahr-
und Führerausweisen`, but not a citizen-facing fillable copy of the
application form itself).

Confirmed live and current: `https://www.sg.ch/verkehr/strassenverkehr/lernfahrausweise/lernfahrausweis.html`
(the canton's own landing page) links this exact PDF and describes the
process in matching terms (vision test by a recognized optician, CHF 30 fee,
submission in person or by post). `stva.sg.ch` (the authority's own short
domain, printed in the PDF's own footer) redirects (HTTP 301) to
`https://www.sg.ch/verkehr/strassenverkehr.html`, confirming StVA and the
`sg.ch` cantonal site are the same authority.

### Business Formation — screened, confirmed dead end: `easygov.swiss`

`easygov.swiss` (the federal one-stop business-registration platform) is a
pure single-page application: its own landing page's only content is a
"Starte Anwendung" (launch application) button with no descriptive HTML —
registration itself requires launching the authenticated wizard (SwissID/
CH-Login-based digital signature for a fully online founding). No
downloadable PDF form exists for sole-proprietorship (Einzelunternehmen)
registration; the "EasyGov-Guide Einzelunternehmen" PDFs surfaced by search
(hosted on cantonal `startbox.swiss` mirrors, e.g. Bern's and Zurich's) are
themselves screenshots-and-prose walkthroughs of the live wizard's screens,
not a fillable or field-documenting specimen with real field names — a
thinner source than a genuine PDF or field-by-field guide, and the
underlying process is authenticated end-to-end. Same class of dead end as
Portugal's `acesso.gov.pt`-gated sole-trader route and Czech's already-closed
`mpo` sole-proprietorship path.

### Taxes — screened, found genuinely strong, deferred: canton Zürich's `Steuererklärung 2025`

Canton Zürich's own tax office (`zh.ch`) publishes both an online-filing
portal (`ZHprivateTax`, marketed as "kein Ausdrucken, keine Unterschrift,
kein Postversand") **and** a genuine, current, unauthenticated, flat
(non-AcroForm) PDF main declaration for individuals: `300 STE ZH 2025 HA
DEF.pdf` (fetched directly, HTTP 200, `%PDF-1.4`, 99,652 bytes, no
`/Encrypt`, no login/CAPTCHA gate), plus companion PDFs (securities/
holdings inventory, professional-expenses, insurance-premiums schedules) and
a 40-page official Wegleitung (instruction guide). The main form's text
layer is fully legible with numbered line items (`100`, `101`, `102`...)
matching the CZ/PL/EE tax-form pattern this registry has modelled before.
This is a genuinely strong, open backlog candidate for Switzerland's Taxes
vertical — **not pursued to a full schema this cycle** only because DMV was
already picked per the research brief's own priority order and this
registry's practice of publishing one well-sourced schema per cycle rather
than spreading effort across two. A future cycle should pursue this
directly rather than re-screening.

### Passport — re-confirmed dead end

`fedpol.admin.ch/de/beantragen` (the Federal Office of Police's own passport/
ID page) states applications are made "online, telefonisch oder bei der
Passstelle ihres Wohnkantons" (online, by phone, or at the home canton's
passport office) via a single federal system (`ch-edoc-passantrag.admin.ch`)
followed by a mandatory in-person biometric appointment ("Nach Prüfung Ihres
Antrags werden Sie aufgefordert, sich an Ihren Wohnkanton oder Ihre
Wohngemeinde zu wenden, wo Ihre Daten erfasst werden") — no downloadable
citizen-facing PDF anywhere in the flow. Consistent with the prior cycle's
finding (GOV-1804/GOV-1774: "Switzerland's domestic passport process is
cantonal/appointment-based with no downloadable form"), re-verified this
cycle directly against fedpol's own current page rather than taken on
faith.

### National ID — screened, confirmed dead end (new this cycle)

The Swiss Identitätskarte shares the exact same `fedpol.admin.ch` /
`ch-edoc-passantrag.admin.ch` online-application-plus-biometric-appointment
pathway as the passport (both are fedpol-issued documents processed through
the same online system) — no separate, distinct, citizen-facing PDF
application form exists for the ID card either. Not previously explicitly
screened in this registry's CATALOG.md (prior cycles screened Visa and
Passport but left National ID as "unscreened backlog"); this cycle closes
that gap with a confirmed dead end.

## Access notes

No access blocks: `sg.ch`, `so.ch`, `ar.ch`, `zh.ch`, `easygov.swiss`, and
`fedpol.admin.ch` were all reachable directly from this environment with
plain `curl`/`WebFetch` — no TCP-level reset, WAF, or CAPTCHA gate
encountered anywhere in this cycle's research (unlike the prior cycle's
`tirol.gv.at`/`skatteverket.se` connectivity failures). The only genuine
technical obstacle was Zürich's own official PDF being encrypted in a way
this tooling could not cleanly reverse (see the DMV candidate table above);
St.Gallen's unencrypted equivalent was used instead.

Image rendering of the picked PDF (the cross-check technique used for
`cz/md/zadost-o-zapis-silnicniho-vozidla`, rendering pages to PNG via
`pdfjs-dist` + `node-canvas` to visually verify ambiguous widget/label
pairings) was attempted but failed: `pdfjs-dist`'s canvas renderer throws
`TypeError: Image or Canvas expected` inside `paintInlineImageXObject` when
rendering this specific PDF's page content (most likely an inline image,
e.g. the digital-photo QR code, in a colour space or encoding this
`canvas`/`pdfjs-dist` version pairing cannot rasterize) — reproduced
identically in two independent working directories with the same
`pdfjs-dist`/`canvas` versions that successfully rendered the CZ DMV PDF, so
this is specific to this PDF, not a general environment regression.
Extraction instead relied on `pdfjs-dist`'s `getTextContent()` per-item
`(x, y)` coordinates cross-referenced against each AcroForm widget's own
rectangle (via both `pdfjs-dist`'s `page.getAnnotations()` and `pdf-lib`'s
`form.getFields()`/`acroField.getWidgets()`), which for a single-column
layout (this form's Sections 1-3 and 5) reconstructs field/label pairing
with the same reliability as a rendered-image cross-check; every field-label
pairing below was independently confirmed by checking that field rects and
label y-ranges are strictly monotonically ordered top-to-bottom with no
gaps or swaps (see Field inventory).

## Extraction method

1. Fetched the PDF directly (`curl`, no auth/cookies needed).
2. Extracted every AcroForm field via `pdf-lib`'s `form.getFields()`: 63
   fields total (matches `pdfjs-dist`'s per-page `getAnnotations()` widget
   count: 80 Widget annotations across 2 pages — 75 on p.1, 5 on p.2 —
   collapsing to 63 unique field names because several fields share one
   name across multiple widgets: the 19 two-state health/behaviour
   checkboxes, the 2-widget `Geschlecht` gender toggle, and the 2-widget
   `Gruppe1` application-type radio).
3. Extracted page text with `pdfjs-dist`'s `getTextContent()`, grouped into
   printed lines by rounding each item's `y` transform to a 6-unit bucket
   (coarser than a naive 1-2 unit rounding, which otherwise splits a single
   visually-bold line — rendered via 3-4 overlapping duplicate glyph paths,
   a font-weight-faking technique this specific PDF uses — into several
   spurious near-duplicate line buckets) and de-duplicating repeated
   `(x, str)` pairs within each bucket.
4. Cross-referenced each AcroForm widget's rectangle (`y`-range) against the
   nearest printed line's `y`-range to pair every field with its label,
   verifying the full top-to-bottom sequence for internal consistency (no
   two fields' rect ranges out of order relative to their paired labels).
5. Used `pdf-lib`'s `AP`/`N` appearance-stream key lookup to read each
   checkbox/radio widget's on-state export value (e.g. `Gruppe1`'s two
   widgets export `/Auswahl1` and `/Auswahl2`; `Geschlecht`'s two widgets
   export `/ja` and `/nein`) to confirm which physical checkbox corresponds
   to which value, independent of on-page reading order.
6. Corroborated the form's national (not St.Gallen-only) character by
   independently fetching and extracting Solothurn's and Appenzell
   Ausserrhoden's own PDFs and confirming a materially identical section
   structure (see DMV candidate table above).

## Field inventory

63 raw AcroForm fields → 55 `fields[]` entries (some raw fields intentionally
collapsed into one logical value; some raw fields intentionally excluded as
office/third-party-completed — see Judgment calls) + 6 `documents[]` entries.

| Source field(s) | Printed label (extracted) | Modelled as |
|---|---|---|
| `Gruppe1` (2 widgets) | "Gesuch um Erteilung..." / "Gesuch um Umtausch..." | `applicationType` (enum) |
| `Kontrollkästchen2.0.0`..`2.19` (21 widgets) | "A / A bis 35 kW / A1 / B / B1 / C / C1 / D / D1 / BE / CE / C1E / DE / D1E / F / G / M / BPT121 / BPT122 / CZV95 / C1 118" | 21 `wantsLicenceCategory*` booleans |
| `Name` | "Name (Geburtsname aufführen...)" | `fullName` |
| `Vorname` | "Vorname(n)" | `firstName` |
| `Strasse` | "Strasse, Nr." | `streetAndNumber` |
| `PLZ` | "PLZ" | `postalCode` |
| `Wohnsitz` | "Wohnsitz" | `placeOfResidence` |
| `Heimatort` | "Heimatort (ausländische Staatsangehörige: Heimatstaat)" | `placeOfOriginOrHomeState` |
| `Geburtsdatum` | "Geburtsdatum (Tag/Monat/Jahr)" | `dateOfBirth` |
| `Geschlecht` (2 widgets) | "weiblich" / "männlich" | `gender` (enum) |
| `Telefonnummer` | "Telefonnummer" | `phoneNumber` |
| `E-Mail` | "E-Mail" | `email` |
| `AHV_1`..`AHV_4` (4 widgets) | "AHV-Nummer (ersichtlich auf der Krankenversicherungskarte)" | `ahvNumber` (1 combined field) |
| `Stoffwechsel` | "Zuckerkrankheit oder andere Stoffwechselerkrankung" | `hasMetabolicDisease` |
| `Herz` | "Herz-Kreislauf-Erkrankung" | `hasCardiovascularDisease` |
| `Augen` | "Augenerkrankung" | `hasEyeDisease` |
| `Atmung` | "Erkrankung der Atmungsorgane (u.a. Asthma...)" | `hasRespiratoryDisease` |
| `Bauch` | "Erkrankung der Bauchorgane (u.a. Diabetes)" | `hasAbdominalOrganDisease` |
| `Nerven` | "Erkrankung des Nervensystems (MS, Parkinson usw.)" | `hasNervousSystemDisease` |
| `Nieren` | "Nierenerkrankung" | `hasKidneyDisease` |
| `Schlaf` | "erhöhte Tagesschläfrigkeit" | `hasExcessiveDaytimeSleepiness` |
| `Schmerz` | "chronische Schmerzzustände" | `hasChronicPain` |
| `Unfall` | "nicht folgenlos ausgeheilte Unfallverletzung" | `hasUnhealedAccidentInjury` |
| `Hirn` | "Krankheit mit Hirnleistungsstörungen" | `hasBrainPerformanceDisorder` |
| `Alkohol` | "Probleme mit Alkohol, Betäubungsmitteln?" | `hasAlcoholOrDrugProblem` |
| `Alkohol Behandlung` | "Wenn ja, in Behandlung?" | `alcoholOrDrugTreatment` |
| `Psyche` | "eine psychische Erkrankung?" | `hasPsychiatricIllness` |
| `Psyche Behandlung` | "Wenn ja, in Behandlung?" | `psychiatricTreatment` |
| `Epilepsie` | "Epilepsie oder epilepsieähnliche Anfälle?" | `hasEpilepsy` |
| `Krankheiten` | "Ohnmachtsanfälle/Schwächezustände/Einschlafneigung?" | `hasFaintingOrSleepinessEpisodes` |
| `Behinderung` | "Haben Sie andere Krankheiten oder Behinderungen..." | `hasOtherConditionAffectingSafeDriving` |
| `Vormund` | "Stehen Sie unter einer umfassenden Beistandschaft?" | `hasComprehensiveGuardianship` |
| `Adresse Beistand` | "Name, Adresse der Vertreterin oder des Vertreters" | `representativeNameAndAddress` |
| `Fahrverbot` | "Wurde Ihnen schon einmal... verweigert oder entzogen...?" | `licenceEverRefusedOrRevoked` |
| `Tagesdatum` | "Datum" (beside "Unterschrift") | `dateOfRequest` |
| 5 page-2 checkboxes (`1 farbiges Passfoto...`, `Nothelferausweis`, `ausländischer Führerausweis Original...`, `Kopie Ausländerausweis...`, `Kopie gültiger Lehrvertrag...`) | "Beilagen (bitte Zutreffende ankreuzen)" | 5 `documents[]` entries |
| *(no widget — Section 4 fully unfillable)* | "4. Sehtest auszufüllen durch anerkanntes Schweizer Optikergeschäft oder Augenarztpraxis..." | `visionTestCertificate` `documents[]` entry (attestation) |
| *(no widget — office-completed)* | "5. Bestätigung der Identifikation... durch das Einwohneramt", "Bitte nicht ausfüllen" (Ku/Pin-Nr, ADMAS, Nothelfer, Einreise) | excluded (out of scope) |
| *(no widget — ink signature only)* | "Für Minderjährige/umfassend verbeiständete Personen, Unterschrift der gesetzlichen Vertretung" | excluded (out of scope) |

## Worked example

A mock, internally-consistent applicant: **Sara Meier**, a 19-year-old
St.Gallen resident applying for her first learner's permit (category B),
with no health conditions and no guardianship, using the digital photo
upload (so no physical photo is attached).

| Field | Example value | Notes |
|---|---|---|
| `applicationType` | `"issuance"` | First-time learner's permit, not an exchange. |
| `wantsLicenceCategoryB` | `true` | All other 20 `wantsLicenceCategory*` fields `false`. |
| `fullName` | `"Meier"` | |
| `firstName` | `"Sara"` | |
| `streetAndNumber` | `"Rorschacherstrasse 12"` | |
| `postalCode` | `"9000"` | St.Gallen. |
| `placeOfResidence` | `"St.Gallen"` | |
| `placeOfOriginOrHomeState` | `"Wil SG"` | Swiss citizen's Heimatort. |
| `dateOfBirth` | `"2007-03-14"` | Applicant is 19. |
| `gender` | `"female"` | |
| `phoneNumber` | `"+41 79 555 12 34"` | |
| `email` | `"sara.meier@example.ch"` | |
| `ahvNumber` | `"7561234567897"` | 13-digit format, matches `^756[0-9]{10}$`. |
| `hasMetabolicDisease` .. `hasOtherConditionAffectingSafeDriving` | `false` (all 18) | No health conditions declared. |
| `alcoholOrDrugTreatment` | *(absent)* | Correctly omitted/not required: `hasAlcoholOrDrugProblem` is `false`, so `requiredWhen` does not fire. |
| `psychiatricTreatment` | *(absent)* | Same: `hasPsychiatricIllness` is `false`. |
| `hasComprehensiveGuardianship` | `false` | |
| `representativeNameAndAddress` | *(absent)* | Correctly omitted: `requiredWhen` (`hasComprehensiveGuardianship` = `true`) does not fire. |
| `licenceEverRefusedOrRevoked` | `false` | |
| `dateOfRequest` | `"2026-07-08"` | |
| `documents[].passportPhoto` | not attached | Consistent: Sara uses the QR-code digital-photo service instead. |
| `documents[].firstAidCertificate` | attached | Required in substance for a first-time category-B applicant (VZV Art. 10); modelled `required: false` with the condition stated in the label since no boolean field cleanly gates it (see Judgment calls). |
| `documents[].foreignLicenceOriginal` | not attached | Correctly gated: `requiredWhen` (`applicationType` = `"exchange"`) does not fire since `applicationType` is `"issuance"`. |
| `documents[].foreignResidencePermitCopy` | not attached | Same `requiredWhen` gate, same reason. |
| `documents[].apprenticeshipContractCopy` | not attached | Sara is not a trainee in one of the listed apprenticeships. |
| `documents[].visionTestCertificate` | attached | Sara has never held a Swiss learner's/driving licence, so the condition in the label applies; completed by her optician directly on Section 4 of the physical form (out of scope as a `fields[]` entry — see Judgment calls). |

A second branch of the same worked example confirms the `exchange`
pathway's gates: setting `applicationType` to `"exchange"` and
`wantsLicenceCategoryB` to `true` (representing a foreign B-category licence
holder) correctly flips both `foreignLicenceOriginal` and
`foreignResidencePermitCopy` to required per their `requiredWhen`, while
`firstAidCertificate`'s own stated condition ("required for a first-time
application... unless... applying for an exchange") would no longer apply —
consistent with the label's own stated scope even though (per Judgment call
3) this schema does not encode that exemption as a structural
`requiredWhen`, only as label prose.

A third branch confirms the guardianship gate: setting
`hasComprehensiveGuardianship` to `true` correctly makes
`representativeNameAndAddress` required per its own `requiredWhen`.

No live submission was attempted: filing this application results in a real
learner's-permit/driving-licence record with a Swiss cantonal authority and
a real CHF 30 fee — not a safe or reversible action to simulate against a
live government process, consistent with this registry's standing
discipline.

## Judgment calls

1. **Modelled only the applicant-facing sections (1-3, plus the
   self-declared item positioned under Section 5's own heading); excluded
   Section 4 (Sehtest) as `fields[]`, Section 5's confirmation
   stamp/signature, the legal-representative signature block, and the
   internal "Bitte nicht ausfüllen" office-code box.** Section 4 (Sehtest)
   carries **zero** AcroForm widgets of its own in the St.Gallen PDF — it is
   filled and signed in ink directly on the printed page by a recognized
   optician or ophthalmologist, a genuinely third-party-completed
   attestation physically embedded in the same document rather than a
   separate attached certificate. This is a different situation from this
   registry's established "for office use only, completed post-approval"
   exclusion (e.g. `cz/md/zadost-o-zapis-silnicniho-vozidla`'s Part G), since
   the vision test happens *before* submission — but it is still not
   applicant-entered data, so it is modelled instead as a `documents[]`
   attestation entry (`visionTestCertificate`) rather than fabricated as
   fillable `fields[]`. Section 5's own confirmation stamp/signature
   (completed by the Einwohneramt or StVA itself) and the legal
   representative's own ink signature block are excluded on the same basis
   as this registry's standard office-completed-section exclusion.
2. **`Fahrverbot` (positioned under the Section 5 heading) is modelled as an
   applicant field (`licenceEverRefusedOrRevoked`), not excluded alongside
   the rest of Section 5.** Its own printed question ("Wurde Ihnen schon
   einmal... verweigert oder entzogen...?") is a first-person self-declared
   question the applicant answers, textually and structurally distinct from
   the stamp/signature confirmation that follows it — the section heading
   groups them physically on the page but does not change who answers each
   part.
3. **No `requiredWhen` gate on `firstAidCertificate` or
   `visionTestCertificate`, despite the source stating real conditions.**
   `firstAidCertificate`'s exemption depends on already holding a licence in
   category A/A1/B/B1 or applying for an exchange — a fact this schema's
   field set cannot reliably reconstruct (holding a prior foreign licence in
   the requested category is not itself a field). `visionTestCertificate`'s
   exemption depends on already holding a valid Swiss learner's/driving
   licence — also not captured by any field here (this document only models
   a first-time-shaped application). Both are modelled `required: false`
   with the actual condition stated in the document's own `label`, the same
   convention this registry used for `cz/md/zadost-o-zapis-silnicniho-vozidla`'s
   own nuanced `documents[]` conditions (judgment call 10 there).
4. **`ahvNumber` combines 4 separate comb-box widgets into one logical
   field**, consistent with this registry's established practice for split
   identity-number comb boxes (e.g. the same CZ DMV document's
   `ownerPersonalIdNumber`). The pattern `^756[0-9]{10}$` follows the
   official Swiss AHV/AVS 13-digit numbering scheme (a `756` country prefix
   followed by 10 further digits, printed in the source as 3+4+4+2-digit
   comb-box groups with no separators).
5. **`gender`'s enum values (`female`/`male`) are this schema's own
   semantic labels, not the source PDF's own on-widget export values.** The
   source's 2-widget `Geschlecht` checkbox pair exports `/ja` for the
   "weiblich" widget and `/nein` for "männlich" — plainly a copy-paste
   authoring artifact from a yes/no checkbox template elsewhere in the same
   form, not a meaningful "yes/no" gender semantic. Disclosed rather than
   silently reproduced, so a future reviewer does not mistake `/ja`/`/nein`
   for an intentional design choice.
6. **No `exclusivityGroups` entry for the 21 licence-category checkboxes**,
   unlike this registry's precedent for CZ DMV's vehicle-color/purpose
   checkbox groups. A vehicle has exactly one color, but a single
   application can plausibly request more than one licence category at once
   (e.g. BE alongside B) — the source form does not state a one-category-
   per-filing restriction, so no exclusivity constraint is asserted, per
   this registry's discipline against fabricating a rule the source does
   not itself impose.
7. **`jurisdiction.level` is `subnational` with `subdivision: "CH-SG"`**,
   not `national`, unlike this registry's treatment of CZ's DMV document
   (filed locally but modelled nationally because MD, a national ministry,
   directly publishes and owns the exact form used everywhere in the
   country). Switzerland's cantons do not merely execute a single federal
   form on ASTRA's behalf — St.Gallen, Solothurn, Appenzell Ausserrhoden,
   and Zürich each independently authored their own distinct PDF
   implementation (different field names, different field counts: 63 vs.
   121 vs. 73 vs. an encrypted unknown count) of the same VZV-mandated
   substantive content. The form itself is genuinely canton-specific even
   though the underlying legal requirements are federal, so this document
   is scoped and classified the same way this registry already classifies
   `us/ca/dmv/*` and `mx/semovi/alta-vehiculo-foraneo` (a specific
   subnational authority's own form, not a claim that every Swiss canton's
   form is identical to this one).
8. **`dateOfRequest` (`Tagesdatum`) is modelled as a general request date**,
   not specifically the legal representative's signature date, even though
   its rect sits near both a general applicant "Datum: Unterschrift:" line
   and, just above it, "Für Minderjährige/umfassend verbeiständete Personen,
   Unterschrift der gesetzlichen Vertretung" — page-rendering to visually
   disambiguate the two was attempted and failed (see Access notes), so the
   more general, source-safe reading is used rather than asserting a
   specific attribution the text-coordinate extraction alone cannot fully
   confirm.
9. **No live submission was attempted** (see Worked example) — filing this
   application creates a real permit/licence record and a real CHF 30 fee
   with a Swiss cantonal authority.

## Validation

```
$ node tools/validate.mjs registry/ch/sg/stva/gesuch-lernfahr-fuehrerausweis/1.0.0/schema.json
ok   registry/ch/sg/stva/gesuch-lernfahr-fuehrerausweis/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/ch/sg/stva/gesuch-lernfahr-fuehrerausweis/1.0.0/schema.json
ok   registry/ch/sg/stva/gesuch-lernfahr-fuehrerausweis/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).

$ node tools/verify-sources.mjs registry/ch/sg/stva/gesuch-lernfahr-fuehrerausweis/1.0.0
verify-sources: checking 1 schema version directory...

verify-sources: 1 directory, 4 URLs checked, 0 warning(s), 0 allowlisted, all clear.
```

`tools/govschema-client`'s `npm run build-index` was run afterward; the
resulting `registry-index.json` diff is purely additive (one new entry for
this document, no reordering or modification of any existing entry).
