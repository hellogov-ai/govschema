# Verification record — `hr/porezna-uprava/prijava-poreza-na-dohodak` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-14`

This is a `GovSchema Standard Research` cycle (**GOV-2883**). Croatia was not
previously in the registry (51 jurisdictions existed at the start of this
cycle). This document opens Croatia as the registry's **52nd jurisdiction**,
via the Taxes vertical.

## Why this candidate

Croatia's Ministry of Finance / Tax Administration (Porezna uprava) publishes
an annual personal income tax return, "PRIJAVA POREZA NA DOHODAK" (internally
referenced here as Obrazac DOH), directly and unauthenticated from its own
document host. It is a genuine, current, 8-page text-layer PDF (confirmed not
scanned, via `pdfjs-dist` text extraction), with no AcroForm widget layer — a
static hand-fill/print template, the same pattern this registry already
applies to Poland's PIT-37 and Bulgaria's Обр. 2001. Its own printed section
numbers and column headers are fully self-documenting.

## Sources examined

### Source 1 (primary `source`, the form)

- **Authority:** Porezna uprava (Croatian Tax Administration), a body within
  Ministarstvo financija (Ministry of Finance).
- **URL:** `https://porezna-uprava.gov.hr/UserDocsImages/Dokumenti%20obrasci/DOH.pdf`
- **Retrieved / reviewed:** 2026-07-14, independently re-fetched this cycle
  with `curl`.
- **HTTP status:** 200. **Content-Type:** `application/pdf`. **Size:**
  271,486 bytes. **sha256:**
  `506fdc3469a457a60bdd71f924c379d7daf10a4ab2f2d5f83068b08b548c152c`
  (independently computed this cycle with `sha256sum`, not trusted from any
  prior report).
- **Extraction method:** downloaded directly, then parsed with `pdfjs-dist`
  (`legacy/build/pdf.js`, CommonJS `require`, matching this registry's
  established technique for this environment, which has no
  `pdftotext`/`pdftoppm`). `page.getAnnotations()` returned **zero** Widget
  annotations across all **8** pages — confirming a static, print/hand-fill
  template, not a fillable AcroForm PDF — so `page.getTextContent()` was
  used instead, reading the form's own printed section numbers (1-8, with
  sub-sections like 4.1.1-4.1.8) and column headers across all 8 pages, in
  full, independently of any prior extraction.
- **What it confirms:** every field this document models, verbatim,
  including the closed enum values for `dependentXDisabilityMarking`
  ("I"/"I*"); the exact 9-row relief table in Section 6 with its inline
  statute citations (čl. 20, čl. 22, čl. 33 st.1 t.1, čl. 46 st.1, čl. 42
  st.1, čl. 43, čl. 46 st.2 (×2), čl. 46 st.3-4, all "Zakona" = Zakon o
  porezu na dohodak); and the exact closing declaration text used in
  `documents[].signatureDeclaration`, "ZA ISTINITOST I VJERODOSTOJNOST
  PODATAKA JAMČIM VLASTITIM POTPISOM."
- **What it does NOT print:** unlike Poland's PIT-37, the Obrazac DOH PDF's
  own text carries no explicit "pravna osnova"/legal-basis citation line
  naming the enabling statute and article. `authority.operatedBy.basis` is
  therefore drawn from independent research (Source 2 below), not the form's
  own printed text — a disclosed difference from the PIT-37 precedent.

### Source 2 (governing legislation, for `authority.operatedBy.basis`)

Independent web research (not the form's own printed text) located:

- **Zakon o porezu na dohodak** (Income Tax Act), consolidated at
  `zakon.hr/z/85/zakon-o-porezu-na-dohodak`, originally Narodne novine
  115/16, subsequently amended by 106/18, 121/19, 32/20, 138/20, 151/22, and
  114/23. This is the primary statute establishing personal income tax and
  the annual-return obligation; the form's own Section 6 relief table cites
  several of its articles inline (see above) as "Zakona" without repeating
  the full title, confirming this is the statute the form itself means.
- **Pravilnik o porezu na dohodak** (Income Tax Ordinance), the implementing
  regulation, Narodne novine 10/17, subsequently amended through 143/23 (per
  `zakon.hr/c/podzakonski-propis/18269/...` and the Porezna uprava's own
  `porezna-uprava.gov.hr/hr/pravilnik-o-dopunama-pravilnika-o-porezu-na-dohodak/6790`
  page). This is the regulation that prescribes return procedures and forms.
- **What was NOT independently pinned down:** the exact article number of
  the Zakon that specifically mandates filing an annual return (a WebFetch
  pass over the consolidated `zakon.hr` text found references to "godišnja
  porezna prijava" scattered across Articles 13, 26, and others in the
  personal-deduction/tax-card context, but the page's visible content was
  truncated before reaching the later "UTVRĐIVANJE I NAPLATA POREZA NA
  DOHODAK" (assessment and collection) chapter that most likely contains the
  specific filing-obligation article). Rather than guess a specific article
  number the form itself does not print and this cycle could not
  independently confirm, `authority.operatedBy.basis` cites the Zakon and
  Pravilnik by their Narodne novine numbers only, without a specific article
  citation — a narrower, more honest claim than PIT-37's (whose exact
  article was printed on the form itself).

## Candidates screened this cycle — Croatia's other five verticals

Per this cycle's brief, all five of Croatia's other verticals were screened
via WebSearch/WebFetch before committing to Taxes as the opening vertical.
None had been screened in any prior cycle (Croatia was not yet in the
registry).

1. **DMV — driving-licence issuance (vozačka dozvola).** `mup.gov.hr`
   (`https://mup.gov.hr/vozacka-dozvola-332/332`) states plainly: "Obrazac
   zahtjeva za izdavanje vozačke dozvole ispisuje službenik na šalteru, a
   podnositelj zahtjeva svojim potpisom na obrascu potvrđuje točnost
   ispisanih podataka" (the application form is printed by the clerk at the
   counter from the Ministry's own information system; the applicant only
   signs to confirm the printed data's accuracy). **Dead end** — no public
   blank template exists to distribute.
2. **DMV — vehicle registration (registracija vozila / prometna dozvola).**
   Registration is handled in person at a Stanica za tehnički pregled
   vozila (licensed vehicle-inspection station; see `cvh.hr` and
   `mup.gov.hr/gradjani-281562/moji-dokumenti-281563/registracija-vozila-331/331`).
   The owner presents proof of ownership and payment of statutory fees/
   duties/insurance in person; no standalone downloadable application
   template was found. **Dead end**, same officer/station-mediated pattern
   as driving-licence issuance.
3. **Business Formation — obrt (craft/trade business) registration.**
   Found a genuine, directly downloadable, unauthenticated form: "Prijava za
   upis u Obrtni registar" at
   `https://portor.gov.hr/dokumenti/OR_prijava_za_upis_u_obrtni_registar.doc`
   — independently re-fetched this cycle: HTTP 200, `Content-Type:
   application/msword`, 141,824 bytes, sha256
   `cb809f58ad127ef7297d0e8921fda811f50d2524d1005d65cfabbdd7a767303e`. This is
   a **strong candidate**, structurally similar to Bulgaria's OKD-5 (a
   Word-format, not AcroForm, source). **Not authored this cycle** (this
   cycle's brief scoped Croatia's opening to Taxes only); left as open,
   ready-to-author backlog for a future cycle.
4. **Visa — long-term (Type D) national visa.** MVEP (Ministry of Foreign
   and European Affairs) publishes
   `https://mvep.gov.hr/UserDocsImages/dokumenti/obrasci/LongtermVisaApplication-English.pdf`
   (and a Croatian-language mirror) — independently re-fetched this cycle:
   HTTP 200, `application/pdf`, 670,331 bytes. Extracted with `pdfjs-dist`
   and compared field-by-field against the already-modelled EU-harmonized
   long-stay-visa template (`de/auswaertiges-amt/national-visa-application`,
   `bg/mvnr/zayavlenie-za-izdavane-na-natsionalna-viza-tip-d`,
   `es/maec/solicitud-visado-nacional`): the same 30-numbered-field sequence
   (surname(s)/family name(s), former family name(s), first name(s), date of
   birth, place of birth, country of birth, current nationality, sex,
   marital status, national identity number, travel-document details,
   home address, residence in a third country, occupation/employer,
   temporary-stay purpose, family-reunification relationship, intended
   accommodation address, closing HVIS data-protection declaration, etc.),
   confirming this is the same EU long-stay (Type D) visa template lineage
   already modelled multiple times in this registry. **Confirmed a
   duplicate, not authored**, per this registry's established precedent for
   this exact template (see e.g. `pl/mf/zeznanie-pit-37`'s VERIFICATION.md,
   which reached the same conclusion for Poland's equivalent form).
5. **Passport (putovnica).** `mup.gov.hr` and `eputovnica.mup.hr` describe
   the process: either an in-person application where a police-authority
   clerk enters the applicant's data electronically, or (for an existing
   passport holder with a Croatian eID no older than one year) a fully
   online e-Zahtjev submission through e-Građani — no downloadable blank
   application template is distributed in either channel. **Dead end**,
   same officer/system-mediated pattern this cycle found for DMV.
6. **National ID (osobna iskaznica).** `mup.gov.hr` and multiple secondary
   sources (`expatincroatia.com`, `welcome-center-croatia.com`) confirm: "the
   official at the counter prints the request form with data from the
   Ministry of Interior's Information System, and the party confirms the
   accuracy and truthfulness of the entered data with their signature" — the
   applicant provides fingerprints and a signature but never fills a blank
   public template. **Dead end**, the same pattern as passport and driving
   licence — Croatia's MUP-issued civil identity documents are uniformly
   officer/system-mediated at the counter, not distributed as blank
   downloadable forms.

**Summary:** Taxes (this document) and Business Formation (obrt, strong,
unauthored backlog) are Croatia's two vetted-open verticals; DMV, Passport,
and National ID are all confirmed dead ends this cycle (officer/system-
mediated, no public blank template); Visa is a confirmed duplicate of an
already-modelled EU-harmonized template.

## Field inventory (Phase 2)

All 86 `fields[]` entries and the 1 `documents[]` entry, and their exact
Obrazac DOH position reference, are listed inline in `schema.json`'s own
`sourceRef` per field/document. Summary by section:

| Section | Representative fields | Modelled scope |
|---|---|---|
| Header | `taxYear`, `taxOfficeAndBranch` | Full |
| §1 Opći podaci | `fullNameAndParentName`, `residentialAddress`, `phone`, `email`, `oib`, `assistedAreaOrVukovarResident`, `bankAccountNumber`, `bankNameAndSeat`, `representativeName`, `representativeAddress`, `representativeOib` (11 fields) | Full for §1.1-1.4, 1.7, 1.8; §1.5 (multi-period residence table) and §1.6 (HRVI disability-status table) excluded as narrow edge cases outside the salaried-employee/pensioner scope |
| §2 Uzdržavani članovi uže obitelji | `dependent1..3` × 8 sub-fields (24 fields) | Bounded repeating group capped at 3 of the paper form's own 7 numbered rows |
| §3 Uvećanje osobnog odbitka | `healthInsuranceContributionsPaidDomestically`, `donationsGiven`, `increasedPersonalDeductionTotal` (3 fields) | Full |
| §4.1.1 Plaća ostvarena u tuzemstvu izvan potpomognutih područja | `employer1..3` × 5 sub-fields + 2 totals (17 fields) | Bounded repeating group capped at 3 of the paper form's own 6 numbered rows, plus its UKUPNO total |
| §4.1.5 Mirovina ostvarena u tuzemstvu | `pensionPayer1..3` × 5 sub-fields + 2 totals (17 fields) | Structured and capped identically to §4.1.1 |
| §6 Olakšice, oslobođenja i poticaji | 9 relief amount fields | Full — flat 9-row table |
| §7 Popis priloženih isprava | `listOfAttachedDocuments` | Full, modelled as free text (the paper form itself is blank lines, not a predefined checklist) |
| §8 Napomene / declaration | `taxpayerNotes`, `declarationDate`, `documents[].signatureDeclaration` | Full |

Total: **86 `fields[]`** entries (7 `required: true`) plus **1 `documents[]`**
entry (a required attestation). No `crossFieldValidation` rules or
`exclusivityGroups` are modelled.

## Access notes and judgment calls

1. **Scope mirrors the PIT-37/PL precedent: the salaried-employee/pensioner
   case only, not the whole form.** Excluded, and disclosed in the schema's
   own `description`: §1.5 (multi-period residence table) and §1.6 (HRVI
   war-disabled-veteran disability-status table), both narrow pathways;
   §4.1.2/4.1.3/4.1.4 (wages earned in assisted areas/Vukovar, or abroad) and
   §4.1.6 (foreign pension income); §4.1.7 (a computed total chained off the
   unmodelled foreign-income rows) and §4.1.8 (HRVI-exempt income); §4.2
   (other income — board fees, royalties, artist/sportsperson income, sales-
   agent commissions, prizes, student work, journalist/athlete honoraria);
   §4.3 (self-employment/crafts/freelance/agriculture income — the form's
   single most complex section, with its own loss-carryforward and social-
   contribution sub-calculations); and §5 (the grand-total figure, which
   sums across the unmodelled §4.2/§4.3 sections and so cannot be correctly
   derived from this schema's field set).
2. **Bounded repeating groups capped at 3, not the paper form's own 6-7 row
   capacity**, for §2 (dependents, form has 7 rows), §4.1.1 (employers, form
   has 6 rows), and §4.1.5 (pension payers, form has 6 rows). This mirrors
   this registry's established convention (e.g. `gb/hmrc/child-benefit-
   claim-ch2` capping at the form's own capacity, `se/migrationsverket/work-
   permit-application` modelling up to 5 children) of choosing a reasonable,
   disclosed cap rather than either silently truncating without disclosure
   or mechanically modelling every possible row; 3 covers the overwhelming
   majority of real filers (most taxpayers have at most a handful of
   dependents and 1-3 employers/pension payers in a given year) while
   keeping the schema's size proportionate to its "most common case" scope.
3. **`increasedPersonalDeductionTotal` (§3.3), `employerXIncome`/
   `employerXTaxPaid` totals, and `pensionPayerXIncome`/`totalDomestic*`
   totals are modelled as plain declared values, not computed.** Each is
   directly derivable from other fields this schema *does* model (unlike
   PIT-37's excluded computed-arithmetic chain, which depended on unmodelled
   income categories), so including them as declared figures — the same
   treatment PIT-37 gave `employmentTaxableIncome` (poz. 54, dependent only
   on two already-modelled fields) — is consistent with this registry's
   practice; this schema does not itself enforce the arithmetic.
4. **`oib` fields use an 11-digit pattern** (`^[0-9]{11}$`), Croatia's fixed-
   length OIB (Osobni identifikacijski broj) format, applied uniformly to
   the taxpayer, representative, dependents, employers, and pension payers
   (OIB is used for both natural and legal persons in Croatia).
5. **`dependentXDisabilityMarking` models the form's own "I ili I*"
   distinction as a 2-value enum** (`I`, `I_star`), left absent (not a third
   enum value) when the dependent carries no disability marking at all —
   consistent with this registry's convention of using field absence, not an
   explicit "none" enum value, to represent "not applicable."
6. **Money fields use `type: "number"` with only a `minimum: 0` constraint**,
   consistent with this registry's established convention for EUR-denominated
   amounts (e.g. `pl/mf/zeznanie-pit-37`'s złoty/grosz fields), rather than a
   stricter 2-decimal-place pattern.
7. **`bankAccountNumber`/`bankNameAndSeat` and `representativeName`/
   `representativeAddress`/`representativeOib` are all optional (`required`
   omitted/false)**, since not every filer nominates a refund account or
   files through a representative/tax advisor — the form itself leaves these
   blank when inapplicable.
8. **Section 7 (`listOfAttachedDocuments`) is modelled as a plain string
   field, not a `documents[]` entry.** Unlike PIT-37's PIT/O annex (a named,
   specific attachment with its own conditional trigger), the Obrazac DOH's
   §7 is literally blank lines for the filer to freely list whatever they
   attach — there is no predefined document-type vocabulary printed on the
   form to model as distinct `documents[]` entries.
9. **`authority.operatedBy.basis` cites the Zakon o porezu na dohodak and
   Pravilnik o porezu na dohodak by their Narodne novine numbers, without a
   specific article citation for the annual-filing obligation** — see
   "Sources examined, Source 2" above for why a more specific citation
   (matching PIT-37's precedent of quoting the form's own printed "Podstawa
   prawna" line) was not available: the Obrazac DOH PDF prints no such line,
   and this cycle's research could not conclusively pin the exact article
   number from the consolidated statute text before it was truncated.

## Test run (Phase 3)

No live submission was attempted: Porezna uprava's e-Porezna online-filing
channel is an authenticated, session-based system requiring a real
certificate/token-based login, and the paper channel requires mailing or
hand-delivering an original signed form to a tax office — submitting
fabricated taxpayer data against Croatia's live tax administration is not a
safe or reversible action.

Instead, this document's own structural validity was confirmed with this
registry's standard tooling:

```
$ node tools/validate.mjs registry/hr/porezna-uprava/prijava-poreza-na-dohodak/1.0.0/schema.json
ok   registry/hr/porezna-uprava/prijava-poreza-na-dohodak/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/hr/porezna-uprava/prijava-poreza-na-dohodak/1.0.0/schema.json
ok   registry/hr/porezna-uprava/prijava-poreza-na-dohodak/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

A full-registry run after regenerating `tools/govschema-client/registry-index.json`
(via `npm run build-index`) confirms no regression:

```
$ node tools/validate.mjs
425/425 document(s) passed. 3/3 mapping.json companion(s) passed.
```

(Up from 424/424 on `main` before this document was added — independently
re-confirmed by stashing this branch's changes and re-running the validator
against `main`'s own working tree, rather than trusting a prior count.)
