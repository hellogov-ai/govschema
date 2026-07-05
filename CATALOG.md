# GovSchema Standards Catalog

**As of 2026-07-05** | Comprehensive registry of published government service schemas by jurisdiction and vertical

## Executive Summary

**13 jurisdictions** | **100+ published schemas** covering 6 verticals across government services globally.

| Vertical | Coverage | Target Gaps |
|----------|----------|------------|
| **Passport** | 8/13 (61%) | ZA, SG, IN, NL, GB partial |
| **DMV** | 9/13 (69%) | ZA, SG, IE, NL, FR incomplete |
| **Business Formation** | 9/13 (69%) | ZA, CA, IN, NZ, IE gaps |
| **Taxes** | 9/13 (69%) | SG, IE, NZ, CA gaps |
| **Visa** | 10/13 (77%) | ZA, SG, IN, GB UK-visa gaps |
| **National ID** | 6/13 (46%) | IN, NL, AU, SG, NZ, ZA gaps |

---

## By Vertical

### Passport (8/13 jurisdictions)

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
- SG (Singapore ICA) — no schema yet
- IN (India MEA) — no schema yet
- NL (Netherlands SVB/IND) — no schema yet

---

### DMV — Vehicle Registration, Licensing, Permits (9/13 jurisdictions)

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
| **US** | 10+ | CA (registration, title, DL, tag renewal), FL (7 schemas), plus DE/VA/NY |

**Missing/Incomplete:**
- ZA (RTMC exists, but no renewal/transfer) — needs expansion
- SG (LTA) — no schema yet
- GB/CA/US — CDL (commercial driver license), hazmat endorsements

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

### Taxes — Income Tax Return, Tax Filing (9/13 jurisdictions)

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
- SG (no individual income tax schema yet) |
- IE (Revenue forms missing, excepting VAT return) |
- CA (only 2022 T1; needs more recent years, corporate, self-employment) |
- All jurisdictions: corporate/business tax returns minimal coverage |

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

### National ID & Civic Documents (6/13 jurisdictions)

| Jurisdiction | Schemas | Coverage |
|--------------|---------|----------|
| **AU** | 1 | Voter enrolment (AEC) |
| **CA** | 1 | SIN (Social Insurance Number) application |
| **DE** | 1 | National identity card (Personalausweis) + voter registration abroad |
| **FR** | 1 | National identity card (first-time adult, Cerfa 12100*03) |
| **GB** | 1+ | Voter registration (electoral commission) |
| **IE** | 1 | Voter registration (Electoral Commission) |
| **NZ** | 2 | Voter registration + RealMe identity verification |

**Missing:**
- ZA (no voter registration or national ID online systems) |
- IN (no voter registration or Aadhar online services yet) |
- NL (no identity card or voter registration schema) |
- SG (no NRIC loss/damage or voter registration) |
- US (no federalized voter registration; varies by state — only AK/CO/VT started) |
- AU/FR/DE/GB (Steuer-ID, NRIC re-registration not covered) |

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

### SG — Singapore (9 schemas, 4 verticals)

| Agency | Vertical | Schemas |
|--------|----------|---------|
| ACRA | Business Formation | 2 (Pte Ltd, sole proprietor) |
| ICA | Visa | Entry visa (5 schemas across visa types) |
| IRAS | Taxes | (no published schema yet) |
| LTA | DMV | 2 (vehicle registration, vehicle ownership transfer) |
| SPF | National ID | (no published schema yet) |

**Coverage:** Visa ✓, Business ✓, DMV ✓ (vehicle only)
**Gaps:** Passport, tax return (IRAS), national identity (NRIC loss/damage, re-registration), driver licence (LTA maintains it but not yet published)

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
| **SG** | ✗ | ✓ | ✓ | ✗ | ✓ | ✗ | 9 |
| **US** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 60+ |
| **ZA** | ✗ | ✓ | ✓ | ✓ | ✗ | ✗ | 5 |

**Status:**
- ✓ = At least one schema published (may be partial)
- ✗ = No schema published

---

## Known Gaps & Opportunities

### High-Priority (Single Schema Fills Jurisdiction Gap)

1. **Passport (4 missing):**
   - ZA (DHA): high-value (opens ZA/DHA vertical)
   - SG (ICA): mid-value (completes SG)
   - IN (MEA): mid-value (completes IN passport, but complex flow)
   - NL (IND): low-value (completes NL; renewal-only form)

2. **National ID (7 missing/partial):**
   - IN (voter registration, Aadhar): high-value multi-schema
   - SG (NRIC loss/damage, re-registration): low-value
   - ZA (voter registration): low-value (online services not available)
   - NL (identity card): low-value
   - US (federal voter, not state-level): federated gap

3. **Taxes (4 missing):**
   - SG (IRAS individual/corporate): mid-value (highest-income jurisdiction)
   - IE (corporate, sole trader): mid-value
   - CA (2023+ tax years, corporate): mid-value
   - IN (ITR-2, ITR-3, ITR-4, sole trader): high-value multi-schema

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

1. **SG (completes 4/6 verticals): IRAS tax, driver licence (LTA)**
2. **IN (expands 2 verticals): Passport, work/student visa, ITR variants**
3. **ZA (completes 1/6 verticals): DHA Passport**
4. **NL (completes 2/6 verticals): Passport (IND), corporate tax (BD)**
5. **NZ (completes 1/6 verticals): Passport (DIA)**

---

## Methodology

- **Scraping:** `find registry -name schema.json` across all published versions
- **Classification:** Vertical assigned based on schema name, title, agency
- **Versioning:** Multiple versions (e.g., 1.0.0, 1.1.0) noted per schema; no filtering for latest
- **Jurisdiction:** Based on ISO 3166-1 alpha-2 code (AU, CA, DE, FR, GB, IE, IN, NL, NZ, SG, US, ZA)

---

**Generated by:** GOV-1221 Phase 1 research | Standards Engineer
