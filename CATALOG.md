# GovSchema Standards Catalog

**As of 2026-07-05** | Comprehensive registry of published government service schemas by jurisdiction and vertical

## Executive Summary

**13 jurisdictions** | **217 published schema documents** (per `tools/govschema-client/registry-index.json`) covering 6 verticals across government services globally.

> **Update (2026-07-05, GOV-1328/GOV-1293):** South Korea's Taxes vertical
> closed with `kr/nts/year-end-tax-settlement-income-deduction-report`,
> sourced from the National Tax Service's own English-language "Easy Guide
> for Foreigners' Year-end Tax Settlement" (2025 edition, nts.go.kr), which
> reproduces the gazetted Enforcement Rule of the Income Tax Act's Attached
> Form No. 37(1)-(3) as an official English original — the lowest
> translation-risk KR source found so far. Picked up from the standing
> candidate backlog left by GOV-1289's new-jurisdiction research cycle
> (this was `GOV-1293`, the last of South Korea's five STRONG-rated
> verticals). KR now has 5/6 verticals modelled (Passport, DMV, National ID,
> Visa, Taxes); only Business Formation remains unmodelled, rated WEAK in
> GOV-1289's original research (IROS/startbiz.go.kr both require
> certificate login) and not an open candidate without new sourcing.
>
> **Update (2026-07-05, GOV-1292):** South Korea's Visa vertical closed with
> `kr/moj/visa-application`, sourced from the Ministry of Justice/Korea
> Immigration Service's gazetted Visa Application Form (사증발급신청서, 출입국관리법
> 시행규칙 별지 제17호서식) — a plain, directly-downloadable bilingual PDF with a
> real text layer (visa.go.kr), unlike the two other South Korean forms
> authored so far, both served through JS canvas/blob-image viewers. Picked up
> under `GOV-1321`'s standing research routine from the candidate backlog left
> by `GOV-1289`'s new-jurisdiction research cycle. KR now has 4/6 verticals
> modelled (Passport, DMV, National ID, Visa); only `GOV-1293` (Taxes) remains
> open in the backlog. Global Visa coverage moves from 10/13 to 11/13
> jurisdictions.
>
> **Update (2026-07-05, GOV-1294):** South Korea's National ID & Civic
> Documents vertical closed with `kr/nec/overseas-voter-registration`,
> sourced from the National Election Commission's combined overseas
> absentee-voter notification / overseas voter registration form
> (`[별지 제59호의4서식]`, ok.nec.go.kr) — a rare source that ships **two**
> official filled-in examples, one per filing pathway, letting both of the
> form's main branches be verified against real transcribed values rather
> than inferred from the blank form alone. Picked up from the standing
> candidate backlog left by GOV-1289's new-jurisdiction research cycle (this
> was `GOV-1294`, alongside sibling candidates `GOV-1292` Visa and `GOV-1293`
> Taxes, both still open). KR now has 3/6 verticals modelled (Passport, DMV,
> National ID); Visa and Taxes candidates remain in the backlog.
>
> **Update (2026-07-05, GOV-1303):** South Korea's DMV vertical closed with
> `kr/koroad/driving-licence-application` (GOV-1291), sourced from the
> gazetted driving-licence-test application form (law.go.kr Attached Form No.
> 42-2, Class 1 Regular / Class 2), picked up from the standing candidate
> backlog left by GOV-1289's new-jurisdiction research cycle. KR now has
> 2/6 verticals modelled (Passport, DMV); Visa (`GOV-1292`), Taxes
> (`GOV-1293`), and National ID (`GOV-1294`) candidates remain open in the
> backlog, along with the two secondary Brazil/UAE candidates below.
>
> **Update (2026-07-05, GOV-1289):** South Korea (KR) opened as the registry's
> 13th jurisdiction with `kr/mofa/passport-application-first-adult`, the first
> schema authored against a new jurisdiction since the current 12 were
> established. GOV-1289's research cycle scouted three new-jurisdiction
> candidates — Brazil, South Korea, the UAE — against all six verticals,
> screening specifically for unauthenticated, official, field-level sources.
> South Korea rated strongest (5/6 verticals: Passport, DMV, Visa, Taxes,
> National ID), so it was opened first, starting with Passport (the cleanest
> single source: an official form plus an official filled-in example, no
> login). Follow-up candidates were filed as child issues rather than authored
> immediately: `GOV-1291` (DMV), `GOV-1292` (Visa), `GOV-1293` (Taxes),
> `GOV-1294` (National ID) for South Korea's other strong verticals, and
> `GOV-1295`/`GOV-1296` (Brazil Taxes/Business Formation) and `GOV-1297` (UAE
> Taxes) for the two secondary candidates. This cycle also re-confirmed that
> all of GOV-1289's own legacy-named National ID gaps (DE Steuer-ID, SG NRIC
> re-registration, NZ RealMe, remaining voter registration) were already
> closed — see the National ID section below.

| Vertical | Coverage | Genuinely open gap |
|----------|----------|------------|
| **Passport** | 13/13 (100%) | none — closed |
| **DMV** | 13/13 (100%) | sub-process/edition expansion (CDL beyond US-CA, IDL beyond US/IE/GB) |
| **Business Formation** | 12/13 (92%) | sub-process expansion only (sole trader/partnership/LLP in CA/NZ/IE/IN); **KR** not yet modelled |
| **Taxes** | 13/13 (100%) | sub-process expansion only (corporate tax: SG modelled GOV-1261, ZA Dormant/Micro-Business/Body-Corporate modelled GOV-1268/GOV-1275/GOV-1282; IE Form CT1, ZA's other 2 ITR14 Annexures still open) |
| **Visa** | 11/13 (85%) | **NL, ZA** — both confirmed dead ends (see below), not open work |
| **National ID & Civic Documents** | 13/13 (100%) | none — closed (SG voter-reg is a confirmed non-gap) |

> **Correction (2026-07-05, GOV-1240):** the prior version of this table
> (generated by GOV-1221) showed Passport as 9/13 with ZA, IN, and NL listed
> as missing, and National ID as 7/13. Both claims were stale: `in/mea/`
> published two passport schemas (GOV-1227, GOV-1233 review), `nl/rvig/`
> published one (predates this cycle), and `za/dha/` published one
> (GOV-1174) — none of these merges had been reflected here. This revision
> was generated by re-scanning `registry/` directly
> (`find registry -mindepth 3 -maxdepth 3 -type d`, grouped by jurisdiction)
> rather than trusting the previous table. **Every prior "missing" claim
> below has been re-verified against the current registry tree as of this
> revision.**

---

## By Vertical

### Passport (13/13 jurisdictions) — closed

AU, CA, DE, FR, GB, IE, IN, KR, NL, NZ, SG, US, ZA all have at least one
published Passport schema. India (`in/mea/passport-application-first-adult`,
`in/mea/passport-reissue`), the Netherlands (`nl/rvig/passport-application`),
New Zealand (`nz/dia/passport-application-first-adult`,
`nz/dia/passport-renewal-adult`), and South Africa
(`za/dha/passport-application-first-adult`) were previously miscatalogued
here as gaps; all four already existed. **South Korea** (`kr/mofa/passport-application-first-adult`,
GOV-1289) is new this cycle — the registry's first Korean schema, sourced
from the Ministry of Foreign Affairs' current form (revised 2025-10-09) plus
its own official filled-in example.

### DMV — Vehicle Registration, Licensing, Permits (13/13 jurisdictions)

Every jurisdiction now has at least one DMV-vertical schema (driver licensing
and/or vehicle registration). **South Korea** (`kr/koroad/driving-licence-application`,
GOV-1291/GOV-1303) closes the DMV gap flagged in the prior cycle — sourced
from the gazetted driving-licence-test application form (Road Traffic Act
Enforcement Rule, Attached Form No. 42-2) via law.go.kr, no login required.
Remaining gaps are all **sub-process/edition** expansions within an
already-covered vertical:

- **CDL (commercial driver licence):** only `us/ca/dmv/commercial-drivers-license-application` exists. No CDL-equivalent schema yet for GB (HGV/PCV — `gb/dvla/lorry-bus-provisional-licence` is the closest analogue), DE, FR, IE, IN, NL, NZ, SG, ZA.
- **IDL (International Driving Permit):** covered for US (`dos/international-driving-permit-aaa`, `-aata`), IE (`dttas/international-driving-permit`), GB (`dvla/international-driving-permit`). Not modelled elsewhere.
- **India, GOV-1240:** `in/morth/driving-licence-application` (this cycle) closes the "Issue of New Driving Licence" gap that `in/morth/learners-licence-application` (GOV-878) explicitly scoped out. India's DMV vertical now has 5 schemas (learner's licence, driving licence, vehicle registration, vehicle registration renewal, vehicle ownership transfer).

### Business Formation — Incorporation, LLC, Company Registration (12/13 jurisdictions)

Every jurisdiction except South Korea has at least one Business Formation
schema. GOV-1289's research rated KR's Business Formation vertical **WEAK**
(IROS/startbiz.go.kr both require certificate login) — not an open candidate
without new sourcing. Remaining gaps in the other 12 are sub-process
expansions: sole trader/partnership/LLP forms in CA, NZ, IE, and India (only
SPICe+ company incorporation modelled so far); a standalone EIN schema for
the US (currently folded into `us/irs/employer-identification-number-ss4`,
which does exist); ZA close corporation/trust/NPO formation beyond
`za/cipc/private-company-incorporation`.

### Taxes — Income Tax Return, Tax Filing (13/13 jurisdictions) — closed

Every jurisdiction now has at least one individual income-tax-return schema.
**South Korea** (`kr/nts/year-end-tax-settlement-income-deduction-report`,
GOV-1293/GOV-1328) is new this cycle — sourced from NTS's official
English-language "Easy Guide for Foreigners' Year-end Tax Settlement" PDF,
reproducing the gazetted Attached Form No. 37(1)-(3) as an English original.
Remaining gaps are sub-process expansions:

- **India:** ITR-1 (SAHAJ), ITR-4 (SUGAM, presumptive business income), ITR-2 (capital gains/foreign income/multiple properties), and now ITR-3 (non-presumptive business/profession with full books of account, GOV-1254) are all modelled — the ITR-1/2/3/4 set is now complete. ITR-3 defers full re-derivation of Schedule S/House Property/Schedule CG/OS/itemised Chapter VI-A against its own workbook, since those schedules are structurally identical to the ones already published in full in `in/incometax/individual-tax-return-itr2` (see its VERIFICATION.md for the scope rationale).
- **Corporate/business tax:** SG IRAS Form C-S is now modelled (`sg/iras/corporate-income-tax-return-form-cs`, GOV-1261) — the simplified return for Singapore-incorporated companies with revenue ≤S$5M; it defers Form C-S (Lite), full Form C, and the Enterprise Innovation Scheme/R&D per-activity claim breakdowns (see its VERIFICATION.md). ZA SARS ITR14's Dormant Company pathway (`za/sars/corporate-income-tax-return-itr14-dormant`, GOV-1268), Micro Business pathway (`za/sars/corporate-income-tax-return-itr14-micro-business`, GOV-1275), and Body Corporate/Share Block Company pathway (`za/sars/corporate-income-tax-return-itr14-body-corporate`, GOV-1282) are now modelled — the three smallest of ITR14's five company-type Annexures. Body Corporate/Share Block and Micro Business both model a full Balance Sheet, Income Statement, and Tax Computation (138 and 151 fields respectively); each defers the repeating Share/Membership Register, Beneficial Owner details, Capital Gains schedule, PAYE Credits, Donations-organisation list, the s6quat(1A) foreign-tax-credit computation block, and the Enhanced Renewable Energy Deduction detail container (see each document's VERIFICATION.md). Remaining ITR14 Annexures D/E (Small Business, Medium to Large Business) and IE corporation tax (Form CT1, a much larger return — see "Known Gaps" below) remain unmodelled.
- **CA:** only the 2022 tax year T1 General; more recent tax years not yet modelled.
- **Secondary new-jurisdiction candidates (not opened yet):** Brazil's Receita Federal IRPF ("Perguntão" guide, `GOV-1295`) and the UAE's FTA VAT/Corporate Tax EmaraTax guides (`GOV-1297`) both rated STRONG in GOV-1289's research, but South Korea was prioritized as the stronger overall candidate.

### Visa — Entry Visas, ETAs, Work/Student Permits (11/13 jurisdictions)

**Two confirmed, previously-researched dead ends — not open work:**

- **NL:** no Dutch-specific entry-visa schema. Netherlands participates in the Schengen area; short-stay visas are modelled once for the bloc via `fr/france-visas/schengen-visa-application`. A Dutch national long-stay visa (MVV) process exists but is fragmented across 200+ purpose-specific application variants with no single well-bounded source form (see GOV-777/GOV-859 research).
- **ZA:** Home Affairs' eHomeAffairs visa portal is reCAPTCHA- and
  nationality-gated for unauthenticated/programmatic access, confirmed via a
  live-rendered walkthrough as recently as this same day (GOV-1225,
  2026-07-05). No online visa-application form is publicly sourceable at
  this time.

Every other jurisdiction (AU, CA, DE, FR, GB, IE, IN, KR, NZ, SG, US) has at
least one Visa schema. **South Korea** (`kr/moj/visa-application`, GOV-1292)
is new this cycle — sourced from the Ministry of Justice/Korea Immigration
Service's gazetted Visa Application Form (사증발급신청서), a plain
directly-downloadable bilingual PDF, no login or CAPTCHA required. Remaining
sub-process gaps: India work/student/business visas beyond e-Tourist and
e-Student (already 2 of India's likely several visa categories — see
`in/mha/evisa-etourist`, `in/mha/evisa-estudent`); GB work/graduate visas
(Home Office digital services not yet open-sourced).

### National ID & Civic Documents (13/13 jurisdictions) — closed

Every jurisdiction has at least one National ID and/or voter-registration
schema. Singapore's lack of a voter-registration schema is a **confirmed
non-gap** (GOV-1075): Singapore voting is compulsory and NRIC-linked, with no
citizen-initiated online registration step to model. **South Korea**
(`kr/nec/overseas-voter-registration`, GOV-1294) is new this cycle — sourced
from the National Election Commission's combined overseas absentee-voter
notification / overseas voter registration form, one of two strong
candidates GOV-1289's research found for KR's National ID vertical (the
other, a Resident Registration Card reissuance form, remains a candidate for
a future second KR National ID document if needed).

---

## By Jurisdiction

| Jurisdiction | Schemas (top-level dirs) | Passport | DMV | Business | Taxes | Visa | National ID |
|---|---|:---:|:---:|:---:|:---:|:---:|:---:|
| **AU** | 8 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **CA** | 8 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **DE** | 12 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **FR** | 9 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **GB** | 15 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **IE** | 11 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **IN** | 15 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **KR** | 5 | ✓ | ✓ | ✗ | ✓ | ✓ | ✓ |
| **NL** | 8 | ✓ | ✓ | ✓ | ✓ | ✗ | ✓ |
| **NZ** | 9 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **SG** | 11 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **US** | 32+ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **ZA** | 9 | ✓ | ✓ | ✓ | ✓ | ✗ | ✓ |

"Schemas (top-level dirs)" counts distinct `<agency>/<process-name>` entries
under `registry/<jurisdiction>/`, not every version/edition. US is
comprehensive across federal agencies plus CA/FL/NY state variants, hence
"32+".

**Status:** ✓ = at least one schema published (may be partial/sub-process
incomplete). ✗ = no schema published, with the specific reason noted above.

---

## Known Gaps & Opportunities

### Genuinely open, well-sourced candidates

1. **Sub-national/state DMV & Business Formation expansion**: CA/NZ/IE/IN
   sole-trader/partnership/LLP formation; CDL/HGV-equivalent schemas outside
   the US and GB.
2. **Corporate income tax**: IE corporation tax (Form CT1) still has no
   corporate-return schema (its individual return is covered). SG IRAS is
   modelled via `sg/iras/corporate-income-tax-return-form-cs` (GOV-1261,
   Form C-S — the simplified return for companies with revenue ≤S$5M). ZA
   SARS ITR14 is now modelled for its Dormant Company pathway
   (`za/sars/corporate-income-tax-return-itr14-dormant`, GOV-1268), its
   Micro Business pathway (`za/sars/corporate-income-tax-return-itr14-micro-business`,
   GOV-1275), and its Body Corporate/Share Block Company pathway
   (`za/sars/corporate-income-tax-return-itr14-body-corporate`, GOV-1282,
   guide pp.24-46, 138 fields) — three of ITR14's five company-type
   Annexures. Its other two Annexures (Small Business, Medium to Large
   Business) remain open, each a structurally larger return with its own
   Balance Sheet/Income Statement/Tax Computation containers plus
   size-specific disclosures (e.g. Small Business's Annexure D is the next
   natural candidate — see the guide's own §14, pp.71+). IE Form CT1 was
   scouted in a prior cycle and set aside as a poor next candidate: IRAS'
   own guide documents Form C-S with numbered line items and a worked
   tax-computation example across 13 pages, while Revenue's own "what's
   new" TDM guide for CT1 is 22 pages of change-log prose with no equivalent
   full field-by-field walkthrough located yet, and the live form covers
   panels (Transfer Pricing, Group Relief, Section 299 Leases, R&D Credit,
   Film Tax) far more extensive than a single-session schema should attempt
   without a comparably strong source.
3. **New jurisdictions beyond the current 12** — the standard is meant to be
   global from the start (see AGENTS.md charter); no next candidate has been
   researched yet this cycle. Candidates worth scouting in a future cycle:
   Brazil, Mexico, South Korea, UAE, or an EU member beyond DE/FR/NL — Japan
   (`mofa.go.jp`) is a confirmed IP-blocked dead end (GOV-1174).
4. **India ITR-3's deferred shared schedules**: a future version of
   `in/incometax/individual-tax-return-itr3` could re-derive Schedule S
   (salary), House Property, Schedule CG (capital gains), OS (other
   sources), and the itemised Chapter VI-A deductions against ITR-3's own
   workbook citations, for filers who have both business/professional income
   and salary/house-property/capital-gains/other-source income. Deferred in
   GOV-1254 as a documented scope decision (these schedules are structurally
   identical to `in/incometax/individual-tax-return-itr2`'s already-published
   ones), not a sourcing dead end.

### Confirmed dead ends (do not re-attempt without new information)

- **NL Visa** (Schengen dupes FR; Dutch MVV is 200+ fragmented forms) — GOV-777/GOV-859.
- **ZA Visa** (eHomeAffairs reCAPTCHA + nationality-gated) — GOV-1225, reconfirmed 2026-07-05.
- **CA/ON `mto/vehicle-permit-renewal`** — real-plate-gated live wizard, reconfirmed 3× across cycles.
- **US `gb/hmrc/national-insurance-number-application`**-style GB National Insurance/Marriage Allowance — IP-blocked, GOV-926.
- **Japan MOFA** (`mofa.go.jp`) — fully IP-blocked.
- **US federal CDL** (`us/fmcsa/cdl-application-class-a`) — GOV-1215's draft
  premise ("completely new, 0 existing") was wrong:
  `us/ca/dmv/commercial-drivers-license-application` already exists, and
  GOV-1215's field-level 49 CFR citations were never checked against a real
  CFR text or state form. Not a dead end for CDL coverage generally
  (state-level CDL schemas outside California remain open), but this
  specific candidate/research should not be resumed as-is.

---

## Methodology

- **Scraping:** `find registry -mindepth 3 -maxdepth 3 -type d` (one entry
  per `<agency>/<process-name>`), cross-checked against
  `tools/govschema-client/registry-index.json` (216 entries, one per
  published version/edition).
- **Classification:** Vertical assigned based on schema id, title, and
  authority.
- **Jurisdiction:** ISO 3166-1 alpha-2 code (AU, CA, DE, FR, GB, IE, IN, KR,
  NL, NZ, SG, US, ZA) — 13 jurisdictions tracked as of GOV-1289 (2026-07-05),
  up from the prior revision's 12.

---

**Generated by:** GOV-1240 Phase 1 research, updated by GOV-1254 (ITR-3
authoring), updated by GOV-1261 (SG IRAS Form C-S authoring), updated by
GOV-1268 (ZA SARS ITR14 Dormant Company authoring), updated by GOV-1275 (ZA
SARS ITR14 Micro Business authoring), updated by GOV-1282 (ZA SARS ITR14
Body Corporate/Share Block authoring), updated by GOV-1289 (South Korea
opened as 13th jurisdiction, `kr/mofa/passport-application-first-adult`
authoring), updated by GOV-1303 (`kr/koroad/driving-licence-application`
authoring, KR DMV vertical closed), updated by GOV-1294
(`kr/nec/overseas-voter-registration` authoring, KR National ID vertical
closed), updated by GOV-1292 (`kr/moj/visa-application` authoring, KR Visa
vertical closed, GOV-1321 research cycle), updated by GOV-1328/GOV-1293
(`kr/nts/year-end-tax-settlement-income-deduction-report` authoring, KR
Taxes vertical closed, global Taxes vertical now 13/13) | Standards Engineer
