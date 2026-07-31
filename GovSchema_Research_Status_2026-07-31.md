# GovSchema Standard Research Status & Priority Targets
**Date**: 2026-07-31  
**Document Version**: 1.0  
**Issue**: GOV-5725

## Executive Summary

This document catalogs the current state of GovSchema's registry (100 jurisdictions, 693 published schemas across 6 verticals) and identifies priority research targets for expanding coverage. The research focus is on the six service verticals requested: DMV, Business Formation, Visa, Passport, Taxes, and National ID & Civic Documents.

---

## Part 1: Current Registry Catalog

### Overall Statistics
- **Jurisdictions**: 100 countries/regions
- **Published Schemas**: 693 documents  
- **Service Verticals**: 6
  - Passport
  - DMV (Driver's License, Vehicle Registration, Tag/Title, CDL, IDL)
  - Business Formation (LLC, EIN, Incorporation)
  - Visa (Online visa applications)
  - Taxes (Online tax filing)
  - National ID & Civic Documents

### Coverage by Vertical (as of 2026-07-26)

| Vertical | Coverage | Status | Key Gaps |
|----------|----------|--------|----------|
| **Taxes** | 17/17 (100%) | ✓ COMPLETE | Sub-process expansion only |
| **DMV** | 16/17 (94%) | Nearly complete | **BR** (Brazil) missing; CDL/IDL expansion needed for US-CA, IE, GB |
| **Business Formation** | 16/17 (94%) | Nearly complete | **AE** (UAE) confirmed dead-end; **BR** missing |
| **Passport** | 63/98 (64%) | In progress | **AE**, **CL**, **ES**, **BR** among 35 unscreened jurisdictions |
| **Visa** | 15/17 (88%) | Nearly complete | **NL, ZA, BR** confirmed dead-ends; **CL, ES** unscreened |
| **National ID & Civic Documents** | 15/17 (88%) | Nearly complete | **BR, MX** not modelled; **AE** newly modelled |

### Jurisdictions at 5/6 Verticals (Single Gap to Close)

High-value targets for completing jurisdictions:
- **Switzerland (CH)**: 6/6 ✓ CLOSED (2026-07-26)
- **South Korea (KR)**: 6/6 ✓ CLOSED (via Business Formation, 2026-07-26)
- **Bulgaria (BG)**: 4/6 (Passport, Taxes, Visa, DMV) — missing National ID
- **Romania (RO)**: 5/6 (Taxes, DMV, Business Formation, Visa, Passport) — missing National ID & Civic Documents
- **Nigeria (NG)**: 5/6 (Business Formation, Taxes, Visa, National ID, Passport) — missing DMV (confirmed dead-end)
- **Thailand (TH)**: 5/6 (Taxes, Business Formation, Visa, DMV, Passport) — missing National ID (confirmed dead-end)

### Brazil (BR) — The Largest Gap

**Status**: Missing from ALL 6 verticals (critical priority)
- **Passport**: Not modelled
- **DMV**: Not modelled (but Australia/other DMV schemas exist)
- **Business Formation**: Not modelled
- **Visa**: Confirmed dead-end (no online visa application)
- **Taxes**: Not modelled
- **National ID & Civic Documents**: Not modelled

**Action**: BR is a high-priority research target due to its size, economic importance, and complete absence from the registry.

---

## Part 2: Research Targets & Priority Queue

### Priority Tier 1: Highest Value (Complete Jurisdictions)

#### Brazil (BR)
- **Rationale**: 5/6 + large market; potential to close jurisdiction
- **Target Verticals**:
  - Business Formation (CNPJ registration via portal)
  - DMV (CNH - Carteira Nacional de Habilitação)
  - National ID (CPF registration online)
  - Passport (Policia Federal online forms)
  - Taxes (Receita Federal digital filing)

#### Mexico (MX)
- **Current**: 4/6 (Business Formation, DMV, Passport, Taxes)
- **Missing**: Visa (confirmed in-person biometric requirement), National ID (CURP confirmed in-person/biometric-only)
- **Note**: CURP is a dead-end per prior cycles

### Priority Tier 2: Near-Complete Jurisdictions (Closing 5/6 to 6/6)

#### Bulgaria (BG) — National ID Only
- **Current**: 4/6 (Passport ✓, Taxes ✓, Visa ✓, DMV ✓)
- **Gap**: National ID & Civic Documents
- **Source**: DBDS civil-identity-document system (shares source with Passport/DMV)

#### Romania (RO) — National ID Only
- **Current**: 5/6 (Passport ✓, Taxes ✓, Business Formation ✓, Visa ✓, DMV ✓)
- **Gap**: National ID & Civic Documents
- **Source**: Romanian identity authority (MAE, Interior Ministry)

### Priority Tier 3: Passport Expansion

35 jurisdictions remain with Passport unscreened. Notable candidates:
- **Chile (CL)**: 5/6 (all but Passport unscreened)
- **Spain (ES)**: 5/6 (Passport confirmed weak, likely EU-harmonized duplicate)
- **United Arab Emirates (AE)**: Business Formation confirmed dead-end; other verticals unexplored
- **Colombia (CO)**: 2/6 (partial coverage)

---

## Part 3: Research Methodology

### Step 1: Jurisdiction & Service Screening
For each target jurisdiction & vertical:
1. Identify the relevant government authority
2. Locate the official online portal/form location
3. Verify if a fillable/downloadable form exists
4. Document the form URL, file size, and last-modified date
5. Mark as "Open", "Dead-end", or "Deferred" with reasoning

### Step 2: Field Documentation
Once a valid form is confirmed:
1. Extract all visible form fields (text inputs, dropdowns, checkboxes, etc.)
2. Document:
   - Field name (printed label)
   - HTML/AcroForm internal name (if available)
   - Field type (text, number, date, enum, checkbox, etc.)
   - Validation rules (format, length, regex)
   - Example valid input
3. Identify required vs. optional fields
4. Map conditional visibility (e.g., spouse details visible only if married)

### Step 3: Field-Level Data Mapping
For each field:
| Field Name | Internal ID | Type | Required | Example Input | Notes |
|------------|------------|------|----------|---------------|-------|
| First Name | firstName | text | yes | John | Max 50 chars |
| Birth Date | dob | date | yes | 1990-01-15 | YYYY-MM-DD |
| ... | ... | ... | ... | ... | ... |

### Step 4: Form Test Run
- Submit a complete form with valid example/mock data
- Verify acceptance without errors
- Document any validation feedback
- Record successful submission confirmation

### Step 5: Schema Creation
- Author a GovSchema-compliant JSON Schema using the spec format
- Define all fields, types, validation, and requiredWhen gates
- Include verification practices documenting the source
- Create conformance fixtures (valid scenarios, edge cases)

### Step 6: Registry Cataloging
- Place schema in correct directory: `registry/{jurisdiction_code}/{authority}/{form-name}@{version}.json`
- Rebuild registry index
- Update CATALOG.md with new entry

---

## Part 4: Known Data Sources & Portal Patterns

### Tax Filing Portals
- **Brazil (BR)**: Receita Federal (receita.gov.br) - IRPF for individual income tax
- **Mexico (MX)**: SAT (sat.gob.mx) - Declaración Anual (annual tax return)
- **Spain (ES)**: AEAT (aeat.es) - Renta y Patrimonios

### Business Formation Portals
- **Brazil (BR)**: Junta Comercial (state-level) + Federal CNPJ via Receita Federal
- **Mexico (MX)**: SAT for RFC registration + RUC
- **Colombia (CO)**: Cámara de Comercio (chamber of commerce by state)

### DMV Portals
- **Brazil (BR)**: DETRAN (state-level departments) + Federal CNH via SERPRO
- **Mexico (MX)**: REPUVE + ATRM (vehicle registry)
- **Chile (CL)**: SIRAUBE (vehicle registration)

### Passport Portals
- **Brazil (BR)**: Polícia Federal (pf.gov.br) - Passaporte brasileiro
- **Chile (CL)**: SRE (servicio.cl) - Tramite.cl portal
- **Colombia (CO)**: Migración Colombia + PEP (portal)

### National ID Portals
- **Brazil (BR)**: Secretariat of State (biometric national ID card)
- **Bulgaria (BG)**: DBDS (civil status documents)
- **Romania (RO)**: Interior Ministry (ID card registration)

---

## Part 5: Known Challenges & Workarounds

### Challenge 1: Bot Mitigation & JavaScript Challenges
- **Solution**: Use Playwright (headless browser automation) with real browser context
- **Examples**: Sucuri JS challenge (GOV-4424), reCAPTCHA gates (GOV-1497)

### Challenge 2: Portal-Only Forms (No Downloadable PDF)
- **Solution**: Extract from official support documentation, screenshots, or hidden HTML input payloads
- **Examples**: Rwanda IremboGov, Indonesia imigrasi portal (GOV-2629)

### Challenge 3: Archived/Superseded Forms
- **Solution**: Use Wayback Machine (archive.org) to locate live specimens
- **Examples**: Australia passports.gov.au (site hangs), Italy questure.poliziadistato.it (WAF blocks)

### Challenge 4: Glyph Encoding & Text Extraction
- **Solution**: Use pdfjs-dist for AcroForm field extraction, ToUnicode-CMap for garbled text, node-canvas for visual verification
- **Examples**: Turkish forms (Eğitim Durumu bug), Malta glyph-indexed PDF

### Challenge 5: Multi-Page Forms with Bounded Tables
- **Solution**: Count printed rule spacing for table row bounds; confirm via canvas render
- **Examples**: Mauritius LP3 (unbounded vs. LP2 bounded), Mauritius Migrationsamt family table (4 rows, 4 checkboxes)

---

## Part 6: Next Steps & Timeline

### Immediate Actions (This Cycle)
1. ✅ Catalog current registry state (COMPLETE)
2. 📋 Screen Brazil (BR) across all 6 verticals for viable candidates
3. 📋 Identify Brazil's top candidate by form complexity & availability
4. 📋 Research & document fields for top candidate
5. 📋 Author initial schema and test fixtures

### Follow-Up Cycles
- Complete remaining Brazil verticals (1-2 per cycle)
- Close Bulgaria & Romania via National ID verticals
- Passport expansion (CL, ES, AE candidates)
- Visa expansion (ES, CL candidates)

### Success Metrics
- Brazil moved from 0/6 to at least 1/6 verticals
- One Brazil vertical fully modelled with schema, fixtures, and VERIFICATION.md
- Registry index rebuilt and validated
- CATALOG.md updated with new entry and findings

---

## Appendices

### A. Vertical Definitions (per GovSchema Standard)
- **Passport**: First-time issuance, renewal, replacement, emergency travel documents
- **DMV**: Driver's license, vehicle registration, title, tag, CDL, IDL
- **Business Formation**: LLC/LLP/Partnership/Corporation registration, name reservation, EIN/tax ID
- **Visa**: Online visa applications (tourist, work, residence permit, etc.)
- **Taxes**: Individual & corporate income tax filing, value-added tax (VAT), payroll
- **National ID & Civic Documents**: National identity card, voter registration, civil status certificates, CPF/CURP/ID numbers

### B. Filing Conventions
- **Field Naming**: Use camelCase for JSON keys (firstName, dateOfBirth)
- **Validation**: Leverage JSON Schema keywords (pattern, minLength, maxLength, enum)
- **Bounded Slots**: Use items/minItems/maxItems for repeating field arrays (e.g., family members table)
- **Conditional Fields**: Use requiredWhen gates for fields visible only under certain conditions

### C. Verification Practices Template
Each schema includes a VERIFICATION.md documenting:
- Original PDF/form URL
- SHA-256 hash of retrieved form
- Extraction method (text layer, canvas render, etc.)
- Field-by-field source mapping
- Known defects/findings (orphaned checkboxes, mislabeled fields, etc.)
- Conformance fixture scenarios

---

**Document Status**: Initial catalog & planning document  
**Next Review**: Upon completion of Brazil DMV/Business Formation research  
**Owner**: Standards Engineer (Claude)
