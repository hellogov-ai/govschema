# Verification record — `pl/mf/zeznanie-pit-37` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-07`

This is a `GovSchema Standard Research` cycle (**GOV-1691**). At the start of
this cycle, Poland stood at 3/6 verticals (DMV, Business Formation, National
ID). Mid-cycle, a fast-forward pull of `origin/main` revealed that a
concurrent cycle (GOV-1685, PR #280) had already merged Poland's Passport
vertical (`pl/mswia/wniosek-o-wydanie-paszportu`) via the governing statute
(Art. 33 ustawy o dokumentach paszportowych) as its primary source, since no
downloadable application form exists — the same finding this cycle
independently reached before discovering the merge (see "Candidates screened
and rejected" #1 below). That left Taxes and Visa as Poland's two remaining
gaps going into this cycle's candidate search.

## Why this candidate

The brief's priority order was: (1) Poland passport, (2) Poland national
(Type D) visa — flagged as a likely duplicate of the EU-harmonized template
already modelled as `de/auswaertiges-amt/national-visa-application`, to be
confirmed rather than assumed, (3) Poland PIT tax filing, (4)-(6) re-screens
of Chile's Registro Civil, SII Formulario 22, and (never-before-screened)
Visa candidates.

### Candidates screened and rejected

1. **Poland — Passport.** Independently re-screened before discovering it was
   already closed. `obywatel.gov.pl`/`gov.pl` confirm the current process:
   the passport office's clerk fills an electronic form from the applicant's
   PESEL/ID-card data during an in-person visit; no home-printable blank
   template is distributed (an applicant must always collect the original
   blank at the office in person, per multiple secondary sources). Found the
   governing wzór is set by Rozporządzenie Ministra Spraw Wewnętrznych i
   Administracji z dnia 9 września 2022 r. w sprawie dokumentów paszportowych
   (Dz.U. 2022 poz. 2050) — but that regulation's own Załączniki define only
   the **passport booklet's** physical/visual design (cover, personalization
   page, hologram placement), not an application form. This is exactly the
   "governing statute as primary source, no downloadable form" situation
   GOV-1685 had already resolved (merged as PR #280, `d208a603`) using Art.
   33 of the ustawa o dokumentach paszportowych. No further work needed —
   confirmed already done, not re-authored.
2. **Poland — National (Type D) visa.** The current wzór is Załącznik nr 2 do
   Rozporządzenie Ministra Spraw Wewnętrznych i Administracji z dnia 25
   czerwca 2025 r. w sprawie wiz dla cudzoziemców (Dz.U. 2025 poz. 847,
   in force from 2025-07-01, superseding a 2022/827 regulation confirmed
   repealed on eli.gov.pl). Retrieved directly from `eli.gov.pl` (HTTP 200,
   no login/CAPTCHA/WAF — the same host GOV-1678 established as a reliable,
   unauthenticated channel for Polish gazetted regulations) and extracted
   with `pdfjs-dist`. Its field sequence — nazwisko, nazwisko rodowe, imię,
   data urodzenia, miejsce urodzenia, państwo urodzenia, obywatelstwo, stan
   cywilny, płeć, rodzaj dokumentu podróży, numer/data wydania/ważny
   do/wystawiony przez, adres, cel podróży, ... — was compared field-by-field
   against `de/auswaertiges-amt/national-visa-application`'s own source PDF
   (`aufenthalten-data.pdf`, re-downloaded this cycle): Name/Familienname,
   Frühere Familienname(n), Vorname(n), Geburtsdatum, Geburtsort, Geburtsland,
   Staatsangehörigkeit, Familienstand, Geschlecht, Art des Reisedokuments,
   Nummer/Ausstellungsdatum/Gültig bis/Ausgestellt durch, Anschrift... — the
   same sequence, translated. Both are visibly built on the same EU
   long-stay-visa template lineage (itself close in structure to the
   Schengen Annex I short-stay form already modelled as
   `fr/france-visas/schengen-visa-application`, also checked this cycle for
   contrast). Confirmed a duplicate per this registry's own established
   precedent for Spain's equivalent form (`pl/mswia/wniosek-o-wydanie-dowodu-
   osobistego`'s VERIFICATION.md, GOV-1666/GOV-1671). Not authored.
3. **Chile — Registro Civil (Passport/National ID), SII Formulario 22
   (Taxes), Visa.** Not re-screened this cycle. Poland's PIT-37 (below) was
   already a clearly strong candidate at this cycle's third priority
   position, matching this registry's own "pick the single strongest
   candidate, depth over breadth" convention (see e.g. GOV-1671's own
   decision to stop at CEIDG-1 without re-screening every named backlog
   item). All three remain open, unscreened-this-cycle backlog; Chile Visa
   in particular has still never been screened in any cycle.

### Candidate picked: Poland Taxes — PIT-37

PIT-37, "Zeznanie o wysokości osiągniętego dochodu (poniesionej straty) w
roku podatkowym," is the annual personal income tax return for individuals
whose income is taxed at the progressive scale and consists exclusively of
amounts a payer already reported to them on a PIT-11/PIT-11A/PIT-40A/PIT-R/
IFT-1R information slip — in practice, primarily employees and pensioners.
It is the single most commonly filed Polish PIT return by volume. The
current version, PIT-37(31), is a genuine, directly downloadable,
unauthenticated PDF, no AcroForm layer (a static hand-fill/print template,
like `pl/ceidg/wniosek-o-wpis-do-ceidg` and `pl/mi/wniosek-o-rejestracje-
pojazdu`), but fully self-documenting: 171 numbered positions across
sections A-Q, each with its own inline printed label, several with inline
statute citations, and footnoted "Objaśnienia."

A prior cycle (GOV-1671, `pl/ceidg` VERIFICATION.md) had screened Poland's
Taxes vertical only shallowly, writing it off with: "Poland's Taxes vertical
(e-Deklaracje/Twój e-PIT, both requiring an authenticated session, not
screened in depth this cycle — left as backlog)." That assumption was
correct about the *online-filing* channels (e-Deklaracje and Twój e-PIT do
require an authenticated session) but incomplete: the underlying **paper
form itself** — the actual wzór the online systems digitise — is a plain,
unauthenticated download from `podatki.gov.pl`, entirely separate from those
gated channels. This cycle found and used that paper form directly.

## Sources examined

### Source 1 (primary `source`, the form)

- **Authority:** Ministerstwo Finansów (MF); the return is processed by
  Krajowa Administracja Skarbowa (KAS).
- **Document:** PIT-37, form version **31** (printed on every page footer as
  "PIT-37(31)"), covering tax year 2025 (filed 2026-02-15 through
  2026-04-30) — the current version as of this cycle's retrieval date, per
  `podatki.gov.pl`'s own formularze-do-druku-pit index (which lists no later
  version).
- **URL (index page, cited in `source.url`):**
  <https://www.podatki.gov.pl/pit/formularze-do-druku-pit/> — direct,
  unauthenticated, HTTP 200.
- **URL (direct PDF download, cited in `source.documentRef`):**
  <https://www.gov.pl/attachment/fc157458-24fe-4bf6-9474-cd00788e8c39> —
  direct `curl`, HTTP 200, no login/CAPTCHA/WAF, `Content-Type:
  application/pdf`, 266,678 bytes, 5 pages.
- **Retrieved / reviewed:** 2026-07-07.
- **Extraction method:** downloaded directly, then parsed with `pdfjs-dist`
  (`legacy/build/pdf.mjs`). `page.getAnnotations()` returned **zero** Widget
  annotations across all 5 pages — a static, print/hand-fill template, not a
  fillable PDF — so `page.getTextContent()` was used instead, reading the
  form's own printed numbered positions (poz. 1-171) and section letters
  (A-Q) plus every field's inline label, in full, across all 5 pages.
- **What it confirms:** every field this document models, verbatim, plus
  the closed enum options for `filingType`, `correctionType`,
  `taxSettlementMethod`, and `largeFamilyCardHolder`; the form's own inline
  statute citations for each income-source row (art. 12 ust. 1 for
  employment, art. 34 ust. 7 for pensions, art. 21 ust. 1 pkt 148/152/153/154
  for the four reliefs modelled); the exact closing declaration text used in
  `documents[].signatureDeclaration`; and the form's own printed legal basis
  ("Podstawa prawna: Art. 45 ust. 1 ustawy z dnia 26 lipca 1991 r. o
  podatku dochodowym od osób fizycznych"), used verbatim in
  `authority.operatedBy.basis` rather than a guessed regulation citation.

### Source 2 (attempted corroboration — not usable)

The same index page links an official "Broszura informacyjna" (instruction
brochure) for PIT-37, e.g.
`https://www.podatki.gov.pl/media/10539/broszura-pit-37-za-2024-r.pdf`.
Every such media link tried (both the 2024-year and 2023-year brochure, on
both `www.podatki.gov.pl` and `podatki.gov.pl`) returned **HTTP 404** at the
time of this review — the anchor tags are present in the page's HTML but the
underlying media asset is gone or has moved, apparent site-side link rot on
the government's own CMS, distinct from the entirely-absent-source-URL bug
GOV-1662 previously caught (there, the cited `source.url` itself was dead;
here, a would-be *secondary* corroborating link is dead, while the primary
source is confirmed live). This document does not cite the brochure and
relies instead on the primary PDF's own inline instructions and statute
references, the same single-source-but-self-documenting standard this
registry already applies to `pl/ceidg/wniosek-o-wpis-do-ceidg` and
`pl/mi/wniosek-o-rejestracje-pojazdu` (both also non-AcroForm, fully
self-labelled static templates).

## Field inventory (Phase 2)

All 38 `fields[]` entries and both `documents[]` entries, and their exact
PIT-37(31) position reference, are listed inline in `schema.json`'s own
`sourceRef` per field/document. Summary by section:

| Section | Representative fields | Modelled scope |
|---|---|---|
| Header + §A Urząd skarbowy i cel | `taxpayerTaxId`, `taxYear`, `taxOffice`, `filingType`, `correctionType` | Full; office-only fields "Numer dokumentu"/"Status" (poz. 3-4) excluded as system/office-assigned, not applicant-filled |
| §B Sposób rozliczenia | `taxSettlementMethod` | Full 6-value enum kept faithfully; joint/widowed/single-parent downstream spouse-column fields not modelled |
| §C.1 Dane podatnika | `surname`, `firstName`, `dateOfBirth`, address (10 fields) | Full for the taxpayer; §C.2 (spouse) entirely out of scope |
| §D Ulgi | 4 relief checkboxes + 1 income-covered-by-relief figure | Only the taxpayer column; D.2's 3 other income-type rows and the razem (total) row out of scope |
| §E.1 Dochody/straty podatnika | employment (5 fields) + pension (3 fields) | Only rows 1 (praca na etacie) and 2 (emerytury-renty); rows 3-5 (zlecenia/prawa autorskie/inne) and row-6 RAZEM out of scope |
| §F-K (arithmetic + rare) | — | Entirely out of scope (see schema `description` and judgment call 2 below) |
| §L 1,5% OPP | KRS number, amount, purpose, consent (4 fields) | Full |
| §M, §N | — | Out of scope (spouse PIT/D cross-reference; refund bank account) |
| §O KDR | `largeFamilyCardHolder` | Full |
| §P Kontakt | `contactPhone`, `contactEmail` | Full |
| §Q Oświadczenie | `documents[].signatureDeclaration` | Modelled as an attestation, not a field |

Total: **38 fields** plus **2 `documents[]` entries** (one conditional
supporting-evidence annex pointer, one required attestation). No
`crossFieldValidation` rules or `exclusivityGroups` are modelled.

## Access notes and judgment calls

1. **Office-only header fields excluded.** Poz. 3 ("Numer dokumentu") and
   poz. 4 ("Status") sit directly under the "WYŁĄCZNIE DO UŻYTKU SŁUŻBOWEGO"
   (for official use only) annotation next to poz. 1-2 on the form's own
   layout and read as system/processing identifiers rather than applicant
   -supplied data — the same class of exclusion `pl/mswia/wniosek-o-wydanie-
   dowodu-osobistego` applied to its own "Adnotacje urzędowe" clerk-only
   block.
2. **The entire computed-arithmetic chain (§F Odliczenia od dochodu, §G/H
   Obliczenie podatku, §I Obliczenie zobowiązania podatkowego, §J Dodatkowy
   zwrot z tytułu ulgi na dzieci, §K art. 45 ust. 3c income) is out of
   scope for v1.0.0, and this is the single largest scope decision in this
   document.** Every one of those sections' figures is either a direct sum
   across all five §E.1 income-source rows (including the three this
   schema does not model: umowy zlecenia, praktyki/staże + zasiłek
   macierzyński, prawa autorskie, and "inne źródła") and, for a joint
   return, the mirrored §E.2 spouse column, or a further calculation chained
   from that sum. Modelling those totals *correctly* would require modelling
   §E.1's remaining three rows and, for joint filers, all of §E.2 — a
   materially larger v1.1.0/v2.0.0 scope. Rather than fabricate a
   `podatek należny` (tax due) field backed by an incomplete input set (which
   would silently produce a wrong number for any filer with non-wage/pension
   income), this document omits the whole computed chain and discloses the
   omission in both the schema `description` and here. `publicBenefitOrgDonationAmount`
   (§L, poz. 152) is kept as a plain declared value without its own 1.5%-of
   poz.-141 cap validation, for the same reason.
3. **`taxSettlementMethod`'s enum keeps all 6 checkbox options printed on the
   live form**, even though this schema does not model the spouse-column
   fields a joint/widowed/single-parent selection would require on the real
   paper form. This mirrors `pl/ceidg/wniosek-o-wpis-do-ceidg`'s own
   precedent (judgment call 3 there) of keeping a faithful enum rather than
   silently narrowing it to only the values this version's field set fully
   supports; the narrower-scope consequence is disclosed in the field's own
   `description` and in the schema-level `description`.
4. **`taxpayerTaxId` accepts either a 10-digit NIP or an 11-digit PESEL**
   (`^[0-9]{10}$|^[0-9]{11}$`), matching the form's own instruction to cross
   out whichever does not apply on a single shared 11-box entry line. Most
   individual employee/pensioner filers use PESEL.
5. **Employment/pension money fields use `type: "number"` with only a
   `minimum: 0` constraint, not a stricter grosz-precision pattern.** The
   form itself prints separate złoty/grosz sub-boxes for every money field;
   this schema follows this registry's established convention of modelling
   a split currency amount as one decimal number (the same simplification
   `pl/mswia/wniosek-o-wydanie-dowodu-osobistego` used for its split
   day/month/year date boxes).
6. **`employmentIncomeCoveredByReliefs` (poz. 42) models only the "praca na
   etacie" row of §D.2's four-row income-covered-by-relief table**, since
   this schema's §E.1 income scope is itself limited to employment and
   pension income; §D.2's other three rows (umowy zlecenia, praktyki/staże,
   zasiłek macierzyński) and its row-5 RAZEM total (capped at 85,528 zł) are
   out of scope for the same reason as judgment call 2.
7. **§M (a joint filer's own separately-filed PIT/D annex cross-reference)
   and §N (bank account nominated for a refund) are both out of scope for
   v1.0.0.** Each is a real but comparatively narrow block on the live form:
   §M only matters when a joint return's PIT/D annex was filed by the other
   spouse under a different return, and §N is optional refund-routing
   information a filer may simply omit (the tax authority defaults to the
   last-registered account).

## Test run (Phase 3)

No live submission was attempted: e-Deklaracje/Twój e-PIT are both
authenticated, session-based systems requiring a real trusted profile
(profil zaufany) or bank-identity login, and the paper channel requires
mailing or hand-delivering an original signed form to a tax office —
submitting fabricated taxpayer data against Poland's live tax administration
is not a safe or reversible action.

Instead, one fully hand-constructed mock record was built from this
document's own field inventory (an employed Wrocław resident, PIT-37 filed
individually, no pension income, claiming no reliefs, with a 1.5%
public-benefit-organization donation) and validated with a purpose-written
script that compiles `schema.json`'s own `fields[]` (`type`/`validation`/
`required`) into a JSON Schema draft 2020-12 document and checks it with
`ajv`, plus a small hand-rolled evaluator for the `requiredWhen` leaf
conditions this document uses (`field`/`equals` only):

```
$ node validate_instance.mjs registry/pl/mf/zeznanie-pit-37/1.0.0/schema.json mock_pit37.json
Static (required/type/pattern/enum) validation: PASS
requiredWhen conditional validation: PASS

OVERALL: PASS
```

**Negative controls**, run against the same script to confirm it actually
catches violations rather than passing vacuously:

```
$ # taxpayerTaxId shortened to "123" — violates the 10-or-11-digit pattern
Static (required/type/pattern/enum) validation: FAIL
 - must match pattern "^[0-9]{10}$|^[0-9]{11}$"

$ # surname removed — violates required: true
Static (required/type/pattern/enum) validation: FAIL
 - must have required property 'surname'

$ # filingType set to "correction", correctionType omitted — violates requiredWhen
requiredWhen violation: correctionType is required when filingType == "correction"
requiredWhen conditional validation: FAIL

$ # filingType "correction" + correctionType "standard_correction" supplied
Static (required/type/pattern/enum) validation: PASS
requiredWhen conditional validation: PASS
OVERALL: PASS
```

The fourth control confirms the `requiredWhen` gate on `correctionType`
behaves correctly in both directions.

Both meta-schema validators were run against the finished document and pass
clean:

```
$ node tools/validate.mjs registry/pl/mf/zeznanie-pit-37/1.0.0/schema.json
ok   registry/pl/mf/zeznanie-pit-37/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/pl/mf/zeznanie-pit-37/1.0.0/schema.json
ok   registry/pl/mf/zeznanie-pit-37/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).
```
