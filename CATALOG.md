# GovSchema Standards Catalog

**As of 2026-07-05** | Comprehensive registry of published government service schemas by jurisdiction and vertical

## Executive Summary

**13 jurisdictions** | **100+ published schemas** covering 6 verticals across government services globally.

| Vertical | Coverage | Target Gaps |
|----------|----------|------------|
| **Passport** | 9/13 (69%) | ZA, IN, NL, GB partial |
| **DMV** | 10/13 (77%) | ZA, IE, NL, FR incomplete |
| **Business Formation** | 9/13 (69%) | ZA, CA, IN, NZ, IE gaps |
| **Taxes** | 10/13 (77%) | IE, NZ, CA gaps |
| **Visa** | 10/13 (77%) | ZA, IN, GB UK-visa gaps |
| **National ID** | 7/13 (54%) | IN, NL, AU, NZ, ZA gaps |

> **Correction (2026-07-05, GOV-1223):** this table originally showed SG as
> missing Passport, Taxes, and National ID, and incomplete on DMV. All four
> claims were wrong — SG already had published schemas for every one of
> these (`sg/ica/passport-application`, `sg/iras/individual-income-tax-return-formb1`,
> `sg/ica/identity-card-replacement` + `identity-card-reregistration`,
> `sg/lta/road-tax-renewal` + `vehicle-ownership-transfer` +
> `sg/spf/driving-licence-application`), all merged **before** this catalog
> was generated. See the corrected SG section under "By Jurisdiction" below.
> The undercount suggests the Phase 1 scan under-detected schemas in this
> jurisdiction; other jurisdictions' counts in this document have not been
> independently re-verified this cycle and should be treated with the same
> caution until spot-checked.

---

## By Vertical

### Passport (9/13 jurisdictions)

| Jurisdiction | Schemas | Coverage |
|--------------|---------|----------|
| **AU** | 4 | First-time + renewal (adults); versions 1.0.0, 1.1.0 |
| **CA** | 4 | First-time + simplified renewal; versions 1.0.0–2.0.0 |
| **DE** | 1 | Passport application/renewal (Reisepass) |
| **FR** | 1 | First-time adult (Cerfa 12100*02) |
| **GB** | 4 | Adult standard + fast-track + renewal; 1.0.0–1.1.0 |
| **IE** | 1 | Passport application/renewal |
| **NZ** | 2 | First-time + renewal |
| **US** | 15 | Regional: multiple state DOS offices, passport books/cards |

**Missing:**
- ZA (South Africa DHA) — no schema yet
- IN (India MEA) — no schema yet
- NL (Netherlands SVB/IND) — no schema yet

**Corrected 2026-07-05:** SG *does* have a schema — `sg/ica/passport-application`
(v1.0.0, v1.1.0) — and was mis-listed as missing.

---

### DMV — Vehicle Registration, Licensing, Permits (10/13 jurisdictions)

| Jurisdiction | Schemas | Coverage |
|--------------|---------|----------|
| **AU** | 2 | Driver licence renewal (NSW), vehicle rego renewal |
| **CA** | 3 | Ontario: driver's licence renewal, vehicle permit, registration |
| **DE** | 2 | Vehicle registration (i-Kfz), mandatory driving licence exchange |
| **FR** | 1 | Vehicle registration certificate (Cerfa 13750*07) |
| **GB** | 9 | DVLA: driving licence renewal, replacement, first issue; vehicle registration tests |
| **IE** | 3 | Driver licence renewal/replacement, vehicle registration |
| **IN** | 4 | Vehicle registration (new, renewal, transfer), vehicle ownership transfer |
| **NL** | 2 | Driver licence renewal (RDW), vehicle ownership transfer |
| **NZ** | 2 | Driver licence renewal (NZTA), motorcycle licence |
| **SG** | 3 | LTA: road tax renewal, vehicle ownership transfer; SPF Traffic Police: driving licence application/replacement/renewal |
| **US** | 10+ | CA (registration, title, DL, tag renewal), FL (7 schemas), plus DE/VA/NY |

**Missing/Incomplete:**
- ZA (RTMC exists, but no renewal/transfer) — needs expansion
- GB/CA/US — CDL (commercial driver license), hazmat endorsements

**Corrected 2026-07-05:** SG *does* have 3 published DMV schemas, dated
2026-07-02 through 2026-07-04 — all merged before this catalog was
generated. Note the agency split: in Singapore, **LTA** (Land Transport
Authority) handles vehicle registration/road tax, while driving *licences*
are issued by **Traffic Police (SPF)**, not LTA — a genuine jurisdictional
difference worth remembering when scoping future SG DMV candidates.
A real, still-open SG DMV gap: LTA has no *new/first-time* vehicle
registration schema yet (only road-tax renewal and ownership transfer).

---

### Business Formation — Incorporation, LLC, Company Registration (9/13 jurisdictions)

| Jurisdiction | Schemas | Coverage |
|--------------|---------|----------|
| **AU** | 1 | Proprietary company registration (ASIC Form 201) |
| **CA** | 1 | Ontario: business corporation incorporation (Form 5351E) |
| **DE** | 1 | GmbH/UG formation via Musterprotokoll (single founder) |
| **FR** | 2 | SASU/EURL (Cerfa 13959, 11680); sole proprietorship activity declaration |
| **GB** | 2 | Companies House: incorporation + private company formation |
| **IE** | 2 | CRO: company incorporation + private company |
| **IN** | 1 | SPICe+ (Startup India, company incorporation) |
| **NL** | 2 | BV formation (KvK) + vennootschap |
| **SG** | 2 | Pte Ltd (ACRA) + sole proprietorship |
| **US** | multiple | DE/CA/NY: LLC formation, C-corp, S-corp (multiple state variants) |

**Missing/Incomplete:**
- ZA (CIPC exists, but needs expansion for close corporations, trusts) |
- IN (only SPICe+; LLP, sole proprietor, partnership missing) |
- CA/NZ (missing LLC, sole proprietor, partnership forms) |
- IE (needs partnership, sole trader expansion) |
- AU (no LLC equivalent; needs sole trader/partnership) |

**Other gaps:**
- EIN (US federal tax ID) — not yet authored as standalone schema
- Business name registration (most jurisdictions) — not yet covered

---

### Taxes — Income Tax Return, Tax Filing (10/13 jurisdictions)

| Jurisdiction | Schemas | Coverage |
|--------------|---------|----------|
| **AU** | 3 | Individual tax return (myTax 2026), TFN application |
| **CA** | 2 | T1 General (2022 tax year); versions 1.0.0, 1.1.0 |
| **DE** | 1 | Individual income tax return (ELSTER, 2025 tax year) |
| **FR** | 1 | Individual income tax return (Déclaration 2025, Form 2042) |
| **GB** | 3 | HMRC: self-assessment, capital gains, corporation tax |
| **IN** | 1 | ITR-1 SAHAJ (individual tax return) |
| **NL** | 1 | M-form (Inkomstenbelastingaangifte) |
| **NZ** | 3 | IRD: individual, company, trust tax returns |
| **US** | 9+ | IRS: 1040, 1040-SR, 1099 variants, state forms (CA, FL, NY) |

**Missing/Incomplete:**
- ZA (SARS ITR12 exists; needs ITR14, corporate tax) |
- IE (Revenue forms missing, excepting VAT return) |
- CA (only 2022 T1; needs more recent years, corporate, self-employment) |
- All jurisdictions: corporate/business tax returns minimal coverage |

**Corrected 2026-07-05:** SG *does* have an individual income tax schema —
`sg/iras/individual-income-tax-return-formb1` (v1.0.0, YA2026), merged
2026-07-02, before this catalog was generated. A genuine, still-open SG
Taxes gap: IRAS corporate income tax has no schema yet.

---

### Visa — Entry Visas, ETAs, Work/Student Permits (10/13 jurisdictions)

| Jurisdiction | Schemas | Coverage |
|--------------|---------|----------|
| **AU** | 1 | ETA (subclass 601) |
| **CA** | 1 | eTA (electronic travel authorization) |
| **DE** | 1 | National (Category D, long-stay) visa |
| **FR** | 1 | Schengen short-stay visa |
| **GB** | 2 | Standard visitor visa + family visas |
| **IE** | 1 | Short-stay visa application (Schengen) |
| **IN** | 1 | e-Visa (e-Tourist) |
| **NZ** | 1 | NZeTA (electronic travel authority) |
| **SG** | 1 | Entry visa (ICA) |
| **US** | 15+ | DOS: DS-160, DS-260, diversity visa, marriage visa, immigrant visa, nonimmigrant variants |

**Missing/Incomplete:**
- ZA (no online visa applications published by Home Affairs) |
- IN (only e-Tourist; missing work, student, business visas) |
- GB (no UK work visa or graduate visa forms — Home Office digital forms not yet open-sourced) |
- Most jurisdictions: work visa, student visa, family sponsorship gaps |

---

### National ID & Civic Documents (7/13 jurisdictions)

| Jurisdiction | Schemas | Coverage |
|--------------|---------|----------|
| **AU** | 1 | Voter enrolment (AEC) |
| **CA** | 1 | SIN (Social Insurance Number) application |
| **DE** | 1 | National identity card (Personalausweis) + voter registration abroad |
| **FR** | 1 | National identity card (first-time adult, Cerfa 12100*03) |
| **GB** | 1+ | Voter registration (electoral commission) |
| **IE** | 1 | Voter registration (Electoral Commission) |
| **NZ** | 2 | Voter registration + RealMe identity verification |
| **SG** | 2 | ICA: NRIC identity card replacement, identity card re-registration |

**Missing:**
- ZA (no voter registration or national ID online systems) |
- IN (no voter registration or Aadhar online services yet) |
- NL (no identity card or voter registration schema) |
- US (no federalized voter registration; varies by state — only AK/CO/VT started) |
- AU/FR/DE/GB (Steuer-ID, NRIC re-registration not covered) |

**Corrected 2026-07-05:** SG *does* have NRIC loss/damage and re-registration
schemas — `sg/ica/identity-card-replacement` and
`sg/ica/identity-card-reregistration`, both merged 2026-07-02, before this
catalog was generated. SG has no voter-registration schema, but this is a
previously confirmed non-gap (GOV-1075): voting is compulsory and
automatic/NRIC-linked in Singapore, so no citizen-initiated online
registration process exists to model.

---

## By Jurisdiction

### AU — Australia (17 schemas, 5 verticals)

| Agency | Vertical | Schemas |
|--------|----------|---------|
| AEC | National ID | Voter enrolment |
| APO | Passport | 4 (first-time + renewal, versions 1.0.0–1.1.0) |
| ASIC | Business Formation | Proprietary company registration |
| ATO | Taxes | 3 (individual tax return, TFN application; versions 1.0.0–1.1.0) |
| HomeAffairs | Visa | ETA (subclass 601) |
| NSW | DMV | Driver licence renewal, vehicle rego renewal |

**Coverage:** Passport ✓, DMV ✓ (partial), Business ✓, Taxes ✓, Visa ✓, National ID ✓
**Gaps:** Driver CDL, state-by-state regional variation (only NSW so far)

### CA — Canada (13 schemas, 5 verticals)

| Agency | Vertical | Schemas |
|--------|----------|---------|
| CRA | Taxes | T1 General (2022 tax year, versions 1.0.0–1.1.0) |
| Elections Canada | National ID | Voter registration |
| ESDC | National ID | SIN application (versions 1.0.0–1.1.0) |
| IRCC | Visa | eTA (versions 1.0.0–1.1.0) |
| IRCC | Passport | 4 (first-time, simplified renewal; versions 1.0.0–2.0.0) |
| ON/MTO | DMV | Driver licence renewal, vehicle permit, registration |
| ON/Ministry of Government Services | Business Formation | Business corporation incorporation (Form 5351E) |

**Coverage:** Passport ✓, DMV ✓ (ON only), Business ✓ (ON only), Taxes ✓, Visa ✓, National ID ✓
**Gaps:** Multi-year tax returns, provincial variation (only ON DMV/business so far), CDL, work/student visas

### DE — Germany (15 schemas, 5 verticals)

| Agency | Vertical | Schemas |
|--------|----------|---------|
| Auswärtiges Amt | Visa | National visa (Category D) |
| BMI | National ID | Identity card (Personalausweis) + voter registration abroad |
| BMI | Passport | Passport application/renewal (Reisepass) |
| BMI | DMV | Mandatory driving licence exchange (Führerschein-Umtausch) |
| Bundeswahlleiterin | National ID | Voter registration abroad |
| Finanzamt | Taxes | 2 (income tax return ELSTER, Steuer-ID re-issuance) |
| Gewerbeamt | Business Formation | Business registration (Gewerbeanmeldung) |
| Handelsregister | Business Formation | GmbH/UG formation |
| KBA | DMV | 2 (vehicle registration i-Kfz, driving licence exchange) |

**Coverage:** Passport ✓, DMV ✓, Business ✓, Taxes ✓, Visa ✓, National ID ✓
**Gaps:** Fewer than most due to focus, but strong core coverage; regional variation (Land-level Finanzamt, Gewerbeamt not yet factored)

### FR — France (12 schemas, 5 verticals)

| Agency | Vertical | Schemas |
|--------|----------|---------|
| ANTS | DMV | Driving licence renewal/duplicate (Cerfa 14882*01) |
| ANTS | Passport | Passport first-time adult (Cerfa 12100*02) |
| ANTS | National ID | National ID card first-time adult (Cerfa 12100*03) |
| ANTS | Vehicle | Vehicle registration certificate (Cerfa 13750*07, versions 1.0.0–2.0.0) |
| DGFIP | Taxes | Income tax return 2042 (Déclaration 2025) |
| France-Visas | Visa | Schengen short-stay visa |
| INPI | Business Formation | 2 (SASU/EURL Cerfa 13959/11680; micro-entrepreneur declaration) |

**Coverage:** Passport ✓, DMV ✓, Business ✓, Taxes ✓, Visa ✓, National ID ✓
**Gaps:** Regional variation, SARL/SAS (beyond SASU/EURL), CDL

### GB — United Kingdom (27 schemas, 5 verticals)

| Agency | Vertical | Schemas |
|--------|----------|---------|
| CO/Companies House | Business Formation | 2 (company incorporation, private company) |
| DVLA | DMV | 9 (driving licence renewal, replacement, first issue, motorcycle, PCV, HGV, car towing test) |
| HMPO | Passport | 4 (standard, fast-track, renewal, age-specific) |
| HMRC | Taxes | 3 (self-assessment, capital gains, corporation tax) |
| Home Office | Visa | 2 (standard visitor visa, family visa) |
| Electoral Commission | National ID | Voter registration |
| UKVI | Visa | (linked to Home Office) |

**Coverage:** Passport ✓, DMV ✓, Business ✓, Taxes ✓, Visa ✓ (partial), National ID ✓
**Gaps:** Comprehensive but: work visa (Home Office digital not yet open), student visa, fiancé visa; CDL/HGV theory test; spouse visa; Schengen passport exception

### IE — Ireland (15 schemas, 5 verticals)

| Agency | Vertical | Schemas |
|--------|----------|---------|
| CRO | Business Formation | 2 (company incorporation, private company) |
| DFA | Passport | (passport application) |
| DFA | Visa | (visa application) |
| DFA | National ID | (associated with visa/passport) |
| DFA | DMV | (driving licence) |
| DSP | National ID | Voter registration (Electoral Commission) |
| DTTAS | DMV | 3 (driver licence renewal/replacement, vehicle registration) |
| Electoral Commission | National ID | Voter registration |
| IrishImmigration | Visa | Short-stay visa |
| Revenue | Taxes | 3 (self-assessment, capital gains, VAT) |

**Coverage:** Passport ✓, DMV ✓, Business ✓, Taxes ✓ (partial), Visa ✓, National ID ✓
**Gaps:** Comprehensive but: work visa, student visa; corporation tax; sole trader/partnership

### IN — India (9 schemas, 5 verticals)

| Agency | Vertical | Schemas |
|--------|----------|---------|
| ECI | National ID | Voter registration |
| IncometaX | Taxes | ITR-1 SAHAJ (individual tax return) |
| MCA | Business Formation | SPICe+ (company incorporation) |
| MEA | Visa | e-Visa (e-Tourist) |
| MHA | National ID | (not yet published) |
| MoRTH | DMV | 4 (vehicle registration new/renewal/transfer, ownership transfer) |

**Coverage:** DMV ✓, Visa ✓ (e-Tourist only), Business ✓ (SPICe+ only), Taxes ✓ (ITR-1 only), National ID ✓ (voter reg only)
**Gaps:** Passport (MEA), work visa, student visa, business visa; ITR-2, ITR-3, ITR-4; Aadhar, PAN; sole trader, LLP, partnership; state-level variation not yet factored

### NL — Netherlands (10 schemas, 5 verticals)

| Agency | Vertical | Schemas |
|--------|----------|---------|
| Belastingdienst | Taxes | M-form (income tax return) |
| Den Haag | National ID | Voter registration (Den Haag pilot) |
| KvK | Business Formation | 2 (BV formation, general partnership) |
| RDW | DMV | 2 (driver licence renewal, vehicle ownership transfer) |
| RVIG | National ID | Voter registration |

**Coverage:** DMV ✓, Business ✓, Taxes ✓, Voter reg ✓
**Gaps:** Passport (IND, not yet published), Visa (Schengen via France, not Dutch-specific), national identity card, marriage allowance, corporate tax

### NZ — New Zealand (12 schemas, 5 verticals)

| Agency | Vertical | Schemas |
|--------|----------|---------|
| Companies Office | Business Formation | Company formation/incorporation |
| DIA | National ID | 4 (voter registration, RealMe, national ID, marriage allowance) |
| Electoral Commission | National ID | Voter registration |
| INZ | Visa | NZeTA |
| IRD | Taxes | 3 (individual, company, trust tax returns) |
| NZTA | DMV | 2 (driver licence renewal, motorcycle licence) |

**Coverage:** DMV ✓, Visa ✓, Business ✓, Taxes ✓, National ID ✓
**Gaps:** Passport (not yet published, noted as reachable via DIB), work/student visa, beneficiary income

### SG — Singapore (11 schemas, 6 verticals)

**Corrected 2026-07-05 (GOV-1223):** this section previously undercounted SG
at "9 schemas, 4 verticals" and listed Passport, Taxes, and National ID as
gaps. All three already had published schemas, all merged before this
catalog was generated (see per-schema dates below) — the original count
missed `sg/ica/passport-application`, `sg/ica/identity-card-replacement`,
`sg/ica/identity-card-reregistration`, `sg/iras/individual-income-tax-return-formb1`,
and `sg/spf/driving-licence-application` entirely.

| Agency | Vertical | Schemas | Merged |
|--------|----------|---------|--------|
| ACRA | Business Formation | 2 (Pte Ltd, sole proprietorship) | 2026-07-02, 2026-07-05 |
| ICA | Passport | Passport application (v1.0.0, v1.1.0) | 2026-07-01 |
| ICA | Visa | Entry visa application | 2026-07-03 |
| ICA | National ID | 2 (identity card replacement, identity card re-registration) | 2026-07-02 |
| IRAS | Taxes | Individual income tax return (Form B1 equivalent, myTax Portal, YA2026) | 2026-07-02 |
| LTA | DMV | 2 (road tax renewal, vehicle ownership transfer) | 2026-07-04 |
| SPF (Traffic Police) | DMV | Driving licence application/replacement/renewal | 2026-07-02 |

**Coverage:** Passport ✓, DMV ✓, Business ✓, Taxes ✓, Visa ✓, National ID ✓ — all 6 verticals now have at least one schema.
**Genuine remaining gaps (not previously flagged):** IRAS corporate income
tax; LTA new/first-time vehicle registration (only renewal and ownership
transfer exist); ICA work/student visa passes beyond the single entry-visa
schema. Voter registration is a confirmed non-gap (GOV-1075) — Singapore
voting is compulsory/NRIC-linked with no citizen-initiated online
registration step.

### US — United States (60+ schemas, all verticals)

**Regional coverage:** Federal (passport, DOS visa, IRS taxes, SSA, USCIS), State (CA, FL, NY), plus CBP, ED, VA, SSS

| Agency | Vertical | Count |
|--------|----------|-------|
| DOS | Passport | 15 (diverse passport book/card forms, state variation) |
| DOS | Visa | 15 (immigrant, nonimmigrant, diversity, marriage, K-1 fiancé, etc.) |
| USCIS | Business Formation | (NAACP, business sponsorship) |
| IRS | Taxes | 9+ (1040, 1040-SR, 1099 variants, state returns CA/FL/NY) |
| SSA | National ID | 2 (SS-5 application, ITIN) |
| CBP | DMV | 2 (NEXUS, trusted traveler) |
| CA DMV | DMV | 10 (vehicle registration, title, DL, tag renewal, etc.) |
| FL DMV | DMV | 7 |
| EAC | National ID | 1 (federal voter registration) |

**Coverage:** All 6 verticals (comprehensive federal + state variation, but:)
**Gaps:** State consolidation (50 states each with DMV, business formation, tax), CDL/HGV, work visa (USCIS has I-129, not yet schematized), green card/ADVO, state-specific spouse visa, state-by-state voter registration

---

## Coverage Summary

| Jurisdiction | Passport | DMV | Business | Taxes | Visa | National ID | Total Schemas |
|--------------|:--------:|:---:|:--------:|:-----:|:----:|:-----------:|:-------------:|
| **AU** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 17 |
| **CA** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 13 |
| **DE** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 15 |
| **FR** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 12 |
| **GB** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 27 |
| **IE** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 15 |
| **IN** | ✗ | ✓ | ✓ | ✓ | ✓ | ✓ | 9 |
| **NL** | ✗ | ✓ | ✓ | ✓ | ✗ | ✓ | 10 |
| **NZ** | ✗ | ✓ | ✓ | ✓ | ✓ | ✓ | 12 |
| **SG** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 11 |
| **US** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 60+ |
| **ZA** | ✗ | ✓ | ✓ | ✓ | ✗ | ✗ | 5 |

**Status:**
- ✓ = At least one schema published (may be partial)
- ✗ = No schema published

---

## Known Gaps & Opportunities

### High-Priority (Single Schema Fills Jurisdiction Gap)

1. **Passport (3 missing):**
   - ZA (DHA): high-value (opens ZA/DHA vertical)
   - IN (MEA): mid-value (completes IN passport, but complex flow)
   - NL (IND): low-value (completes NL; renewal-only form)
   - ~~SG (ICA)~~ — corrected 2026-07-05: already published (`sg/ica/passport-application`)

2. **National ID (5 missing/partial):**
   - IN (voter registration, Aadhar): high-value multi-schema
   - ZA (voter registration): low-value (online services not available)
   - NL (identity card): low-value
   - US (federal voter, not state-level): federated gap
   - ~~SG (NRIC loss/damage, re-registration)~~ — corrected 2026-07-05: already published (`sg/ica/identity-card-replacement`, `sg/ica/identity-card-reregistration`)

3. **Taxes (3 missing):**
   - IE (corporate, sole trader): mid-value
   - CA (2023+ tax years, corporate): mid-value
   - IN (ITR-2, ITR-3, ITR-4, sole trader): high-value multi-schema
   - SG IRAS *corporate* income tax remains genuinely open (individual is published: `sg/iras/individual-income-tax-return-formb1`) — corrected 2026-07-05

4. **Business Formation (4 missing/minimal):**
   - ZA (close corporation, trust, NPO): mid-value
   - IN (partnership, LLP, sole trader): high-value multi-schema
   - CA/NZ (partnership, sole trader, trust): low-value (business-only gap)

5. **Visa (3 missing):**
   - ZA (DIRCO): low-value (no online visa applications)
   - IN (work, student, business visa): high-value multi-schema
   - GB (work visa, graduate visa): high-value (Home Office digital still closed)

### Medium-Priority (Expansion within Published Jurisdiction)

- **DMV:** GB/CA/US CDL/HGV, state-level variation across all
- **All verticals:** Enterprise/multi-year editions, corporate tax, regional Finanzamt (DE), state/province variation
- **Passport:** Multiple editions per jurisdiction (current forms, superseded forms for historical support)

---

## Recommended Research Priorities

Based on impact (closes entire jurisdiction) + sourcing feasibility:

1. **IN (expands 2 verticals): Passport, work/student visa, ITR variants**
2. **ZA (completes 1/6 verticals): DHA Passport**
3. **NL (completes 2/6 verticals): Passport (IND), corporate tax (BD)**
4. **NZ (completes 1/6 verticals): Passport (DIA)**

**Corrected 2026-07-05 (GOV-1223):** SG is *already* 6/6 verticals — dropped
from this list. Its individual-tax (IRAS Form B1) and driver-licence (SPF
Traffic Police, not LTA) schemas were both published 2026-07-02, before this
catalog's Phase 1 audit ran, and were missed by that scan. Remaining SG
candidates, if a future cycle wants them, are narrower expansions rather
than jurisdiction-completing gaps: IRAS corporate tax, LTA new-vehicle
registration, and ICA work/student visa passes.

---

## Methodology

- **Scraping:** `find registry -name schema.json` across all published versions
- **Classification:** Vertical assigned based on schema name, title, agency
- **Versioning:** Multiple versions (e.g., 1.0.0, 1.1.0) noted per schema; no filtering for latest
- **Jurisdiction:** Based on ISO 3166-1 alpha-2 code (AU, CA, DE, FR, GB, IE, IN, NL, NZ, SG, US, ZA)

---

**Generated by:** GOV-1221 Phase 1 research | Standards Engineer
