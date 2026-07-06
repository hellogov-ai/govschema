# GovSchema Standards Catalog

**As of 2026-07-06** | Comprehensive registry of published government service schemas by jurisdiction and vertical

## Executive Summary

**15 jurisdictions** | **224 published schema documents** (per `tools/govschema-client/registry-index.json`) covering 6 verticals across government services globally.

> **Update (2026-07-06, GOV-1387):** South Africa's SARS ITR14 corporate
> income tax return closes its fifth and final company-type Annexure,
> `za/sars/corporate-income-tax-return-itr14-medium-large-business`
> (Annexure E, guide §15, pp.115-169, 417 fields) — sourced from the same
> "How to complete the Income Tax Return (ITR14) for Companies" External
> Guide (IT-GEN-04-G01, Revision 19, effective 2 March 2026) used for the
> four smaller Annexures already modelled (Dormant, Micro Business, Body
> Corporate/Share Block, Small Business). Annexure E is the largest and most
> complex of the five (55 guide pages vs. 10-44 for the four siblings): it
> adds nine sections with no counterpart in any sibling — International,
> Foreign Exchange Gains/Losses, Foreign Dividends, Controlled Foreign
> Company, Double Taxation, STC Credits, Headquarter Company, Subsidiary
> Details, and Corporate Rules — plus four SIC-code-gated industry-specific
> sections (Mining and Quarrying, Construction, Wholesale and Retail Trade,
> Financial and Insurance Activities), and a Balance Sheet (64 fields)/
> Income Statement (89 fields) that split many lines by Local/Foreign and
> Connected/Non-Connected far more granularly than any sibling's. It
> deliberately defers, as a whole and explicitly disclosed, the same class
> of large itemised "pop-up selection box" Tax Computation sub-blocks the
> Small Business sibling deferred (Special Allowances Not Claimed and three
> related reversal/recoupment blocks), plus the wholly new Transfer Pricing
> Received/Receivable, Paid/Payable, and Supporting Information containers
> (unbounded per-jurisdiction repeating matrices) — see its own
> VERIFICATION.md for the full scope rationale and several interpretive
> judgment calls flagged for a future independent reviewer. This closes
> ITR14 Annexure E and, with it, the full five-Annexure ZA SARS ITR14
> company-type set (A-E: Dormant, Body Corporate/Share Block, Micro
> Business, Small Business, Medium to Large Business).
>
> **Update (2026-07-06, GOV-1378):** South Africa's SARS ITR14 corporate
> income tax return gains its fourth of five company-type Annexures,
> `za/sars/corporate-income-tax-return-itr14-small-business` (Annexure D,
> guide §14, pp.71-115, 283 fields) — sourced from the same "How to complete
> the Income Tax Return (ITR14) for Companies" External Guide (IT-GEN-04-G01,
> Revision 19, effective 2 March 2026) used for the three smaller Annexures
> already modelled (Dormant, Micro Business, Body Corporate/Share Block).
> Annexure D is structurally much larger (44 guide pages vs. 10-24 for the
> three siblings): it adds Small Business Corporation (s12E) eligibility,
> Contributed Tax Capital, Urban Development Zone (s13quat), Company
> Structure, Multinational Entity group details, Reportable Arrangement,
> Dividends Declared, and a 33-field Additional Assessment Information
> section with no counterpart in any sibling, plus a materially larger
> Balance Sheet/Income Statement and a much larger, separately-itemised Tax
> Computation Debit/Credit Adjustments block. It deliberately defers, as a
> whole and explicitly disclosed, four large itemised "pop-up selection box"
> Tax Computation sub-blocks (~84-item Special Allowances Not Claimed plus
> three smaller reversal/recoupment blocks) that are each comparable in
> scope/complexity to a repeating container — see its own VERIFICATION.md
> for the full scope rationale and several interpretive judgment calls
> flagged for a future independent reviewer. This closed ITR14 Annexure D;
> Annexure E (Medium to Large Business) was the sole remaining unmodelled
> ITR14 company-type Annexure at the time — since closed by GOV-1387 above.
>
> **Update (2026-07-06, GOV-1371):** The United Arab Emirates gains a second
> Taxes-vertical document, `ae/fta/corporate-tax-registration`, sourced from
> the Federal Tax Authority's own official "Corporate Tax Registration –
> Taxpayer User Manual" (EmaraTax, v4.0.0.0, 17 May 2023) — a 41-page
> screenshot-driven walkthrough of the live EmaraTax CT-registration wizard,
> the same sourcing shape already used successfully for
> `ae/fta/vat-registration`. This closes the sibling-document gap that cycle
> explicitly flagged in its own `description` and in this catalog's "Known
> Gaps" section. Before authoring this, this cycle's `GovSchema Standard
> Research` routine scouted two genuinely new-vertical UAE candidates
> (Business Formation via DED/Invest in Dubai/Basher; National ID via ICP
> Emirates ID issuance) and Brazil's National ID candidate
> (Carteira de Identidade Nacional, CIN) — all three confirmed login-gated
> (UAE Pass/Emirates ID or gov.br SSO) via live checks this cycle, so effort
> was redirected to the already-precedented, plainly-downloadable EmaraTax
> manual instead. Models the Legal Person registration pathway in full;
> Natural Person registration's own (simpler) field set was not sourced this
> cycle — see the document's own VERIFICATION.md for four disclosed
> interpretive judgment calls flagged for an independent reviewer. Brazil's
> CIN remains an open National ID candidate for a future cycle if a
> non-login-gated source (e.g. the governing federal decree's own field list,
> already read this cycle from planalto.gov.br) proves sufficient on its
> own.
>
> **Update (2026-07-06, GOV-1364):** Brazil gains its second vertical,
> `br/pf/passport-application`, sourced directly from the Federal Police's
> (Polícia Federal) own live SINPA (Sistema Nacional de Passaportes) online
> passport-request wizard — a genuinely live, unauthenticated, four-tab HTML
> form (no login, no CAPTCHA, no IP block), read field-by-field straight from
> the page DOM via headless-browser extraction rather than any PDF/image
> technique. Brazil had only one schema (`br/sp/jucesp/cnpj-registration-dbe`,
> Business Formation) since opening as the registry's 15th jurisdiction under
> `GOV-1342`; this cycle's `GovSchema Standard Research` routine scouted its
> three other unresearched verticals (Passport, DMV, Visa; National ID was not
> reached this cycle) and found Passport strongly sourceable. The single
> SINPA wizard covers first-time issuance, renewal, and lost/stolen/retained
> replacement all through one `previousPassportStatus` field, rather than
> Brazil needing separate forms per scenario — modeled as one schema instead
> of the first-time/renewal split used elsewhere in this registry. Scoped to
> applicants who will be 18 or older; the wizard's minor-applicant fields
> (responsible-party CPF, travel authorization, parents' nationality) are
> deliberately out of scope for v1.0.0 (see VERIFICATION.md). Brazil's
> Receita Federal IRPF candidate (`GOV-1295`) remains open in the backlog,
> too fragmentary to source safely; DMV, Visa, and National ID remain
> unresearched candidates for a future cycle.
>
> **Update (2026-07-06, GOV-1355/GOV-1317):** South Korea gains a second
> National ID & Civic Documents schema,
> `kr/mois/resident-registration-card-reissuance`, sourced from the
> Ministry of the Interior and Safety's gazetted form (주민등록법 시행령
> [별지 제32호서식], law.go.kr) — a genuine text-layer PDF, directly
> downloadable with no login or CAPTCHA. This was the second of two
> candidates GOV-1289's original South Korea scouting cycle found for this
> vertical (the first, `kr/nec/overseas-voter-registration`, was authored
> under GOV-1294); picked up from the standing candidate backlog left open
> by GOV-1294 as `GOV-1317` under this cycle's `GovSchema Standard Research`
> routine (`GOV-1355`). Models the reissuance-reason selection, the source
> form's own exceptions to needing the previous card, the receipt-method and
> confirmation-document choices, a distinct home/counter-visit reissuance
> pathway for a severely disabled applicant, and the reverse-side
> fee-exemption consent block — see VERIFICATION.md for two explicit
> interpretive judgment calls flagged for a future independent reviewer.
>
> **Update (2026-07-05, GOV-1342/GOV-1296):** **Brazil** opens as the
> registry's **15th jurisdiction** with `br/sp/jucesp/cnpj-registration-dbe`,
> sourced from the Junta Comercial do Estado de São Paulo (JUCESP)/VRE|REDESIM
> integrator's own "Preenchimento do Coletor Nacional – DBE de inscrição"
> tutorial — a 34-page screenshot-driven walkthrough of the live Coletor
> Nacional wizard for registering a new company's CNPJ. Picked up from the
> standing candidate backlog GOV-1289's original new-jurisdiction scouting
> cycle left open (`GOV-1296`), after the live `vreredesim.sp.gov.br` domain
> proved unreachable from this environment and its documentation-listing page
> turned out to be a client-rendered Angular SPA the Wayback Machine only
> archived as an empty shell; the specific manual PDF GOV-1296 named was
> separately recovered via the Wayback CDX API filtered to
> `mimetype:application/pdf`, which surfaced a real, fully-rendered snapshot
> under a `/PRD/` path distinct from an earlier dead HTML-stub snapshot at a
> similarly-named URL. Modelled as a **subnational** schema (`BR-SP`) since
> REDESIM is a per-state integrator, even though the underlying CNPJ registry
> it feeds is federal. Brazil's other candidate, `GOV-1295` (Receita Federal
> individual income tax, IRPF), remains open in the backlog — its named
> source is still assessed as too fragmentary to source safely (see its own
> comment thread).
>
> **Update (2026-07-05, GOV-1335/GOV-1297):** The **United Arab Emirates**
> opens as the registry's **14th jurisdiction** with
> `ae/fta/vat-registration`, sourced from the Federal Tax Authority's
> official "VAT Registration – Taxpayer User Manual" (EmaraTax, v1.0.0.0,
> Oct 2022) — a 58-page screenshot-driven walkthrough of the live
> EmaraTax registration wizard, no login or CAPTCHA required to download.
> Picked up under this cycle's standing `GovSchema Standard Research`
> routine (`GOV-1335`) from `GOV-1297`, a secondary new-jurisdiction
> candidate GOV-1289's research cycle had scouted alongside South Korea and
> Brazil. This cycle first attempted `GOV-1295` (Brazil,
> `br/receitafederal` individual income tax return), but its named source —
> a 340-page topical FAQ — turned out too fragmentary to source a clean
> schema from safely; that finding is recorded on `GOV-1295`'s thread
> (left open in backlog, not a dead end) and effort was redirected to UAE.
> UAE has no personal income tax, so VAT registration is its closest
> Taxes-vertical analogue (its DMV/Business Formation/Visa/Passport/
> National ID verticals were rated WEAK/login-gated in GOV-1289's original
> scouting and are not open candidates without new sourcing).
>
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
| **Passport** | 14/15 (93%) | **AE** not yet modelled; **BR** newly modelled this cycle (`br/pf/passport-application`) |
| **DMV** | 13/15 (87%) | sub-process/edition expansion (CDL beyond US-CA, IDL beyond US/IE/GB); **AE, BR** not yet modelled |
| **Business Formation** | 13/15 (87%) | sub-process expansion only (sole trader/partnership/LLP in CA/NZ/IE/IN); **KR, AE** not yet modelled; **BR** newly modelled this cycle (`br/sp/jucesp/cnpj-registration-dbe`) |
| **Taxes** | 14/15 (93%) | sub-process expansion only (corporate tax: SG modelled GOV-1261, ZA's full 5-Annexure ITR14 set now modelled GOV-1268/GOV-1275/GOV-1282/GOV-1378/GOV-1387; IE Form CT1 still open); **BR** not yet modelled (GOV-1295 Receita Federal IRPF candidate too fragmentary so far) |
| **Visa** | 11/15 (73%) | **NL, ZA** — both confirmed dead ends (see below), not open work; **AE, BR** not yet modelled |
| **National ID & Civic Documents** | 13/15 (87%) | none genuinely open (SG voter-reg is a confirmed non-gap); **AE, BR** not yet modelled |

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

### Passport (14/15 jurisdictions)

AU, BR, CA, DE, FR, GB, IE, IN, KR, NL, NZ, SG, US, ZA all have at least one
published Passport schema. India (`in/mea/passport-application-first-adult`,
`in/mea/passport-reissue`), the Netherlands (`nl/rvig/passport-application`),
New Zealand (`nz/dia/passport-application-first-adult`,
`nz/dia/passport-renewal-adult`), and South Africa
(`za/dha/passport-application-first-adult`) were previously miscatalogued
here as gaps; all four already existed. **South Korea** (`kr/mofa/passport-application-first-adult`,
GOV-1289) opened the registry's first Korean schema, sourced
from the Ministry of Foreign Affairs' current form (revised 2025-10-09) plus
its own official filled-in example. **Brazil** (`br/pf/passport-application`,
GOV-1364) is new this cycle — sourced directly from the Federal Police's own
live SINPA online wizard (no login/CAPTCHA gate), the strongest sourcing
shape yet used in this registry since it is the actual page DOM rather than a
rendered image or PDF of it. Uniquely among this registry's Passport schemas,
Brazil's single wizard covers first-time issuance, renewal, and
lost/stolen/retained replacement all through one `previousPassportStatus`
field rather than needing separate forms per scenario. **United Arab
Emirates** has no Passport schema yet — no candidate was sourced for it this
cycle (see the Taxes entry below for the UAE document that was authored).

### DMV — Vehicle Registration, Licensing, Permits (13/14 jurisdictions)

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
- **United Arab Emirates** has no DMV schema yet — not researched this cycle (Taxes was the sourced vertical for the new UAE jurisdiction; see below).

### Business Formation — Incorporation, LLC, Company Registration (13/15 jurisdictions)

Every jurisdiction except South Korea and the United Arab Emirates has at
least one Business Formation schema. **Brazil** (`br/sp/jucesp/cnpj-registration-dbe`,
GOV-1296/GOV-1342) is new this cycle — sourced from the Junta Comercial do
Estado de São Paulo (JUCESP)/VRE|REDESIM integrator's own screenshot-driven
"Coletor Nacional – DBE de inscrição" tutorial, modelling the CNPJ
registration (Documento Básico de Entrada) step for a company's first
establishment. Modelled as a subnational (São Paulo, `BR-SP`) schema, since
REDESIM is a per-state integrator even though the CNPJ registry it feeds is
federal. GOV-1289's research rated KR's Business Formation vertical **WEAK**
(IROS/startbiz.go.kr both require certificate login) — not an open candidate
without new sourcing. UAE's Business Formation vertical was likewise rated
WEAK/login-gated in that same research cycle and was not revisited this
cycle. Remaining gaps in the other 13 are sub-process expansions: sole
trader/partnership/LLP forms in CA, NZ, IE, and India (only SPICe+ company
incorporation modelled so far); a standalone EIN schema for the US (currently
folded into `us/irs/employer-identification-number-ss4`, which does exist);
ZA close corporation/trust/NPO formation beyond
`za/cipc/private-company-incorporation`; Brazil's own branch/filial
registration (Evento 102) and multi-partner QSA expansion beyond the single
founder modelled here.

### Taxes — Income Tax Return, Tax Filing (14/14 jurisdictions) — closed

Every jurisdiction now has at least one Taxes-vertical schema.
**South Korea** (`kr/nts/year-end-tax-settlement-income-deduction-report`,
GOV-1293/GOV-1328) was new in the previous cycle — sourced from NTS's official
English-language "Easy Guide for Foreigners' Year-end Tax Settlement" PDF,
reproducing the gazetted Attached Form No. 37(1)-(3) as an English original.
**United Arab Emirates** now has two Taxes-vertical documents:
`ae/fta/vat-registration` (GOV-1297/GOV-1335, opened UAE as the registry's
14th jurisdiction) and `ae/fta/corporate-tax-registration` (GOV-1371, new
this cycle) — both sourced from the FTA's own EmaraTax screenshot-driven
user manuals. The UAE has no personal income tax, so these two registrations
are its closest Taxes-vertical analogues. This cycle first attempted a
Brazil candidate (`GOV-1295`, Receita Federal IRPF), but its named
source turned out to be a 340-page topical FAQ rather than a field-by-field
guide, too fragmentary to source safely — left open in backlog with findings
rather than authored against (see `GOV-1295`). Remaining gaps are sub-process
expansions:

- **India:** ITR-1 (SAHAJ), ITR-4 (SUGAM, presumptive business income), ITR-2 (capital gains/foreign income/multiple properties), and now ITR-3 (non-presumptive business/profession with full books of account, GOV-1254) are all modelled — the ITR-1/2/3/4 set is now complete. ITR-3 defers full re-derivation of Schedule S/House Property/Schedule CG/OS/itemised Chapter VI-A against its own workbook, since those schedules are structurally identical to the ones already published in full in `in/incometax/individual-tax-return-itr2` (see its VERIFICATION.md for the scope rationale).
- **Corporate/business tax:** SG IRAS Form C-S is now modelled (`sg/iras/corporate-income-tax-return-form-cs`, GOV-1261) — the simplified return for Singapore-incorporated companies with revenue ≤S$5M; it defers Form C-S (Lite), full Form C, and the Enterprise Innovation Scheme/R&D per-activity claim breakdowns (see its VERIFICATION.md). ZA SARS ITR14's full five-Annexure company-type set is now modelled: Dormant Company pathway (`za/sars/corporate-income-tax-return-itr14-dormant`, GOV-1268), Micro Business pathway (`za/sars/corporate-income-tax-return-itr14-micro-business`, GOV-1275), Body Corporate/Share Block Company pathway (`za/sars/corporate-income-tax-return-itr14-body-corporate`, GOV-1282), Small Business pathway (`za/sars/corporate-income-tax-return-itr14-small-business`, GOV-1378), and Medium to Large Business pathway (`za/sars/corporate-income-tax-return-itr14-medium-large-business`, GOV-1387). Body Corporate/Share Block and Micro Business both model a full Balance Sheet, Income Statement, and Tax Computation (138 and 151 fields respectively); Small Business is structurally much larger (283 fields, guide §14 spanning 44 pages) — it adds Small Business Corporation eligibility, Contributed Tax Capital, Urban Development Zone, Company Structure, Multinational Entity group details, Reportable Arrangement, Dividends Declared, and a 33-field Additional Assessment Information section absent from the smaller siblings; Medium to Large Business (Annexure E) is larger still (417 fields, guide §15 spanning 55 pages, the largest of the five) — it adds International, Foreign Exchange Gains/Losses, Foreign Dividends, Controlled Foreign Company, Double Taxation, STC Credits, Headquarter Company, Subsidiary Details, and Corporate Rules sections with no counterpart in any of the other four, plus a Balance Sheet (64 fields) and Income Statement (89 fields) splitting many lines by Local/Foreign and Connected/Non-Connected. All five defer the repeating Share/Membership Register, Beneficial Owner details, Capital Gains schedule, PAYE Credits, Donations-organisation list, the s6quat(1A) foreign-tax-credit computation block, and the Enhanced Renewable Energy Deduction detail container; Small Business and Medium to Large Business additionally defer, as a whole and explicitly disclosed, the same class of large itemised Tax Computation sub-blocks (~83-84-item Special Allowances Not Claimed plus related reversal/recoupment blocks) each comparable in scope to a repeating container, and Medium to Large Business further defers its wholly new, unbounded per-jurisdiction Transfer Pricing Received/Receivable, Paid/Payable, and Supporting Information containers (see each document's VERIFICATION.md). IE corporation tax (Form CT1, a much larger return — see "Known Gaps" below) remains the only open corporate-tax gap among jurisdictions already in the registry.
- **CA:** only the 2022 tax year T1 General; more recent tax years not yet modelled.
- **UAE Corporate Tax registration:** now modelled (`ae/fta/corporate-tax-registration`, GOV-1371) for the Legal Person registration pathway; Natural Person registration's own field set was not sourced this cycle (see its VERIFICATION.md).
- **Secondary new-jurisdiction candidate (not opened yet):** Brazil's Receita Federal IRPF (`GOV-1295`) remains open in backlog pending either a stronger source or a narrower single-schedule scope — see its comment thread.

### Visa — Entry Visas, ETAs, Work/Student Permits (11/14 jurisdictions)

**Two confirmed, previously-researched dead ends — not open work:**

- **NL:** no Dutch-specific entry-visa schema. Netherlands participates in the Schengen area; short-stay visas are modelled once for the bloc via `fr/france-visas/schengen-visa-application`. A Dutch national long-stay visa (MVV) process exists but is fragmented across 200+ purpose-specific application variants with no single well-bounded source form (see GOV-777/GOV-859 research).
- **ZA:** Home Affairs' eHomeAffairs visa portal is reCAPTCHA- and
  nationality-gated for unauthenticated/programmatic access, confirmed via a
  live-rendered walkthrough as recently as this same day (GOV-1225,
  2026-07-05). No online visa-application form is publicly sourceable at
  this time.

Every other jurisdiction (AU, CA, DE, FR, GB, IE, IN, KR, NZ, SG, US) has at
least one Visa schema. **South Korea** (`kr/moj/visa-application`, GOV-1292)
was new in the previous cycle — sourced from the Ministry of Justice/Korea
Immigration Service's gazetted Visa Application Form (사증발급신청서), a plain
directly-downloadable bilingual PDF, no login or CAPTCHA required. **United
Arab Emirates** has no Visa schema yet — not researched this cycle. Remaining
sub-process gaps: India work/student/business visas beyond e-Tourist and
e-Student (already 2 of India's likely several visa categories — see
`in/mha/evisa-etourist`, `in/mha/evisa-estudent`); GB work/graduate visas
(Home Office digital services not yet open-sourced).

### National ID & Civic Documents (13/14 jurisdictions)

Every jurisdiction except the United Arab Emirates has at least one National
ID and/or voter-registration schema; UAE was not researched for this vertical
this cycle. Singapore's lack of a voter-registration schema is a **confirmed
non-gap** (GOV-1075): Singapore voting is compulsory and NRIC-linked, with no
citizen-initiated online registration step to model. **South Korea** now has
two National ID documents: `kr/nec/overseas-voter-registration` (GOV-1294),
sourced from the National Election Commission's combined overseas
absentee-voter notification / overseas voter registration form, and
`kr/mois/resident-registration-card-reissuance` (GOV-1317), sourced from the
Ministry of the Interior and Safety's gazetted card-reissuance form — the two
strong candidates GOV-1289's original research found for this vertical, both
now closed.

---

## By Jurisdiction

| Jurisdiction | Schemas (top-level dirs) | Passport | DMV | Business | Taxes | Visa | National ID |
|---|---|:---:|:---:|:---:|:---:|:---:|:---:|
| **AE** | 2 | ✗ | ✗ | ✗ | ✓ | ✗ | ✗ |
| **AU** | 8 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **BR** | 2 | ✓ | ✗ | ✓ | ✗ | ✗ | ✗ |
| **CA** | 8 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **DE** | 12 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **FR** | 9 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **GB** | 15 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **IE** | 11 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **IN** | 15 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **KR** | 6 | ✓ | ✓ | ✗ | ✓ | ✓ | ✓ |
| **NL** | 8 | ✓ | ✓ | ✓ | ✓ | ✗ | ✓ |
| **NZ** | 9 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **SG** | 11 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **US** | 32+ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **ZA** | 10 | ✓ | ✓ | ✓ | ✓ | ✗ | ✓ |

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
   SARS ITR14 is now modelled in full across all five company-type
   Annexures: Dormant Company pathway
   (`za/sars/corporate-income-tax-return-itr14-dormant`, GOV-1268), Micro
   Business pathway (`za/sars/corporate-income-tax-return-itr14-micro-business`,
   GOV-1275), Body Corporate/Share Block Company pathway
   (`za/sars/corporate-income-tax-return-itr14-body-corporate`, GOV-1282,
   guide pp.24-46, 138 fields), Small Business pathway
   (`za/sars/corporate-income-tax-return-itr14-small-business`, GOV-1378,
   guide pp.71-115, 283 fields), and Medium to Large Business pathway
   (`za/sars/corporate-income-tax-return-itr14-medium-large-business`,
   GOV-1387, guide pp.115-169, 417 fields) — the largest and last of the
   five, adding International, Foreign Exchange Gains/Losses, Foreign
   Dividends, Controlled Foreign Company, Double Taxation, STC Credits,
   Headquarter Company, Subsidiary Details, Corporate Rules, and
   Transfer-Pricing/thin-capitalisation disclosure sections expected at
   higher turnover, none of which have a counterpart in the four smaller
   Annexures. This closes the ZA SARS ITR14 corporate-tax gap entirely. IE
   Form CT1 was scouted in a prior cycle and set aside as a poor next
   candidate: IRAS'
   own guide documents Form C-S with numbered line items and a worked
   tax-computation example across 13 pages, while Revenue's own "what's
   new" TDM guide for CT1 is 22 pages of change-log prose with no equivalent
   full field-by-field walkthrough located yet, and the live form covers
   panels (Transfer Pricing, Group Relief, Section 299 Leases, R&D Credit,
   Film Tax) far more extensive than a single-session schema should attempt
   without a comparably strong source.
3. **New jurisdictions beyond the current 15** — the standard is meant to be
   global from the start (see AGENTS.md charter). South Korea, the UAE, and
   Brazil have each been opened in recent cycles (GOV-1289, GOV-1297,
   GOV-1296). Candidates worth scouting in a future cycle: Mexico, or an EU
   member beyond DE/FR/NL — Japan (`mofa.go.jp`) is a confirmed IP-blocked
   dead end (GOV-1174).
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
  `tools/govschema-client/registry-index.json` (222 entries, one per
  published version/edition).
- **Classification:** Vertical assigned based on schema id, title, and
  authority.
- **Jurisdiction:** ISO 3166-1 alpha-2 code (AE, AU, BR, CA, DE, FR, GB, IE,
  IN, KR, NL, NZ, SG, US, ZA) — 15 jurisdictions tracked as of
  GOV-1296/GOV-1342 (2026-07-05), up from the prior revision's 14.

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
Taxes vertical closed, global Taxes vertical 13/13), updated by
GOV-1297/GOV-1335 (`ae/fta/vat-registration` authoring, United Arab
Emirates opened as 14th jurisdiction), updated by GOV-1296/GOV-1342
(`br/sp/jucesp/cnpj-registration-dbe` authoring, Brazil opened as 15th
jurisdiction), updated by GOV-1378 (`za/sars/corporate-income-tax-return-itr14-small-business`
authoring, ZA ITR14 4th of 5 Annexures), updated by GOV-1387
(`za/sars/corporate-income-tax-return-itr14-medium-large-business`
authoring, ZA SARS ITR14 corporate-tax gap closed, 5th and last Annexure) | Standards Engineer
