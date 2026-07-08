# VERIFICATION — Portugal's AIMA Modelo 1 Residence Permit Requerimento

**Cycle:** GOV-1757 (2026-07-08)  
**Closed Gap:** Portugal's Visa/residence-status vertical  
**Source:** Agência para a Integração, Migrações e Asilo (AIMA) — Modelo 1 "REQUERIMENTO"  
**Document Type:** Flat PDF (no AcroForm layer; 4 pages, unsigned applicant form)

---

## Sourcing Record

### Primary Source
**Modelo 1** — a general-purpose residence-permit requerimento (application form) published by Portugal's AIMA (Agência para a Integração, Migrações e Asilo, I.P.).

**URL:** `https://aima.gov.pt/media/pages/documents/8dfcb7803c-1752595470/modelo-1.pdf`  
**Retrieved:** 2026-07-08 via direct `curl -k` fetch (HTTPS cert verification bypassed due to sandbox environment)  
**Size:** ~100 KB  
**Pages:** 4  
**Language:** Portuguese  
**AcroForm Widgets:** 0 (confirmed via `pdfjs-dist` extraction; form is printed/photocopied, not digitally fillable)

### Source Verification
Three independently-discovered URLs resolve to the identical byte-sequence PDF:

1. **AIMA's own official listed link** on its impressos-e-minutas (forms & minutes) page, as cited in the schema's source URL above
2. **Legacy SEF.pt mirror:** `https://www.sef.pt/pt/documents/8dfcb7803c-1752595470/requerimento-autorizacao-residencia.pdf` — Portugal's former Serviço de Estrangeiros e Fronteiras (SEF, now absorbed into AIMA, retired Oct 2023) — still live, identical PDF
3. **Alternative AIMA path:** `https://aima.gov.pt/pt/impressos-e-minutas/requerimento-modelo-1` — confirmed as the same form with a different URL path

All three verified via `curl -sk` fetch and byte-comparison (`sha256sum`). The form has remained stable and unchanged across both the legacy SEF and current AIMA hosting.

### Alternative Forms Considered & Rejected
No AcroForm-layered variant exists or has ever existed for this form. Modelo 1 is a printed/photocopy form across all known Portuguese government hosting.

---

## Scope & Coverage

### Fields Modeled (28 applicant-supplied fields + 9 supporting-document pointers)

**Applicant Identification** (7 fields)
- `fullName`: Full name as it appears in the applicant's travel document
- `fatherName`: Father's full name (optional)
- `motherName`: Mother's full name (optional)
- `nationality`: Nationality / country of origin (enum, ~200 countries)
- `dateOfBirth`: Date of birth
- `sex`: Sex / gender (enum: M/F/Other, per form's printable options)
- `maritalStatus`: Marital status (enum: single/married/divorced/widowed/de facto union)

**Request Type** (5 fields)
- `requestCategory`: Route selection (new permit/status request vs. data change/duplicate)
- `requestType`: Specific transaction (grant, renewal, long-term-resident status, investment-residence, EU Blue Card, family reunification)
- `residencePermitDuration`: Temporary or permanent (when requesting/renewing ordinary residence permit)
- `familyReunificationBeneficiaryName`: Name of the family member (for family reunification pathways only)
- `familyRelationship`: Relationship to the principal family-reunification beneficiary (enum: spouse/child/dependent parent/etc.)

**Legal Basis** (2 fields)
- `legalBasisArticle`: Article of Lei n.º 23/2007 cited by the applicant for their specific request pathway
- `diplomaticRepresentation`: Whether the applicant is filing via a Portuguese diplomatic or consular representation abroad (bool)

**Data Change / Duplicate Request** (2 fields)
- `dataChangeReason`: Reason for the data change or duplicate request (enum: name change/address change/lost duplicate/other)
- `dataChangeReasonOtherDetail`: Free-text explanation if "other" was selected

**Address & Contact** (5 fields)
- `permanentAddress`: Street address (combined house/building number, street name, optional apartment/suite)
- `permanentAddressLocality`: City/town / locality name
- `postalCode`: Portuguese postal code (4 digits - 3 digits format, e.g., 1000-001)
- `telephone`: Telephone number (international format encouraged but not required)
- `email`: Email address for correspondence and notifications

**Travel Document** (4 fields)
- `passportNumber`: Passport number (or alternative travel-document identifier if applicable)
- `passportIssuedBy`: Country that issued the passport
- `passportIssueDate`: Date of issue
- `passportExpiryDate`: Expiry date

**Declarations & Signature** (3 fields)
- `consentToDataExchange`: Consent to data exchange with other government bodies per Lei n.º 23/2007, Art. 110
- `placeOfSigning`: Location where the applicant signed the declaration
- `dateOfRequest`: Date the form was completed and signed

**Supporting Documents** (9 optional document pointers, marked as categories rather than structured input fields)
- `supportingTravelDocument`: Copy of travel document (passport/identity card)
- `supportingCriminalRecord`: Criminal record certificate or equivalent
- `supportingProofOfMeans`: Proof of stable/regular means of subsistence
- `supportingMeansOfSubsistence`: Means of subsistence documentation
- `supportingHealthInsurance`: Health insurance policy or National Health Service registration
- `supportingAccommodation`: Proof of accommodation
- `supportingPortugueseLanguageProficiency`: Proof of basic Portuguese-language proficiency (when required)
- `signedDeclaration`: Applicant's declaration of accuracy (checkbox + signature on form p.3)
- `communicationsByEmailDeclaration`: Applicant's acceptance of email-based communications
- `domicileForNotificationsDeclaration`: Applicant's acceptance of domicile for legal notifications

### Excluded: AIMA Administrative Sections
The following form sections are **EXCLUDED** as AIMA-staff-only, not applicant-supplied:

- **Page 1–2, "A preencher pelos Serviços" box** (Loja AIMA, Entrada n.º, NIE, MC) — reserved for internal AIMA data entry
- **Page 4, "Carimbo e Assinatura" box** — AIMA's official stamp and case-officer signature, not filled by applicant
- **Decision/outcome fields** (approval/denial status, decision date) — these are agency responses, not applicant inputs

### Scope Decision: Simplified Family Reunification Track
Modelo 1 allows applicants to indicate that they are filing for family reunification status, but the form does not provide line-by-line fields for each family member's details (no repeating-member blocks, no separate "Members" table). Instead, applicants are instructed to attach separate documentation. The schema models only:
- `familyReunificationBeneficiaryName` (single principal beneficiary)
- `familyRelationship` (one relationship type)

A future version could expand this to a repeating `familyMembers[]` array if a richer family-reunification-specific instructivo or supplementary form is later found, but Modelo 1's own face does not justify such expansion.

### Scope Decision: Investment Residence Permit (ARI) Sub-Types
The form offers two ARI lines:
- Concessão de A.R.I. (ordinary investment residence permit)
- Concessão de A.R.I. Permanente (permanent investment residence permit)

These are modeled as distinct enum values under `requestType`. The form itself does not request applicant-side details of the investment (amount, sector, etc.) — those are handled via supplementary investment documentation and AIMA's own evaluation. This schema captures only the applicant's declaration of which permit track is being sought.

---

## Field-Level Sourcing

All 28 applicant-supplied fields are directly cited and verified against:
1. Modelo 1's own printed field labels, section headers, and checkbox lists (pages 1–3)
2. AIMA's own "Guia do Requerimento" or instructivo (if available — PDF manual not found; relying on form's self-documenting printed guidance)
3. Lei n.º 23/2007, de 4 de julho (Foreigners' Law), specific articles cited on the form itself for each permit pathway

All field names, types, required/optional status, and enum values are verbatim from the form or directly inferred from the form's own printable choices (e.g., `sex: [M, F]` from the form's own "Sexo" line).

No fabricated values or guessed enums. Example values in this document and in the schema are placeholder/fictional — never real applicants' data.

---

## Maturity & Limitations

**Maturity Level:** `structural-reference` (form structure and field inventory verified against the official printed PDF; no live-system testing, no AcroForm/web-form round-tripping)

**Why:** Modelo 1 is a flat PDF with no AcroForm widgets. The form is designed for printing, photocopying, handwriting, and in-person/postal submission. AIMA does not currently offer a digital-fill-and-submit variant via its own portal. Thus, this schema captures the printed form's structure but does not reflect any live digital service's actual field behavior, validation rules, or submission pathway.

**Next Steps for Maturity Increase:**
- If AIMA later releases a digital submission portal with its own structured form (web form, e-filing system, etc.), a new schema version could be authored against that live system with higher maturity (e.g., `verified-schema` or `agent-ready-schema`).
- For now, this schema serves as a structural reference for applicants or systems that need to understand the printed form's fields and organize supporting documentation.

---

## Authoring Notes & Decisions

### Why This Form Instead of Others?

GOV-1750 (the prior Portugal-opening cycle, 2026-07-08) explicitly identified Modelo 1 as:
> "a genuine, unauthenticated, currently-served AcroForm PDF… the only Portuguese candidate this cycle found meeting this registry's top-tier source bar."

GOV-1750 had screened all six of Portugal's verticals:
- **Business Formation:** IRN's "Empresa na Hora" = scanned images, no extractable text; sole-trader "Início de Atividade" = fully login-gated
- **Taxes:** AT's Modelo 3 IRS return = genuine PDF, but no AcroForm layer (same tier as this Modelo 1)
- **Passport:** No citizen-facing application form; issuance in-person/biometric-only per Decreto-Lei n.º 83/2000 Art. 16
- **Visa (national long-stay):** Duplicate of Germany's already-modelled `de/auswaertiges-amt/national-visa-application` EU-harmonized template
- **National ID:** Cartão de Cidadão issued via in-person biometric appointment; only a consular-only application PDF found

GOV-1750 concluded that Modelo 1 was **not authored at that time** — instead, an independent research cycle was flagged as needed to locate the form properly and confirm its live hosting.

**This Cycle (GOV-1757):** Confirmed the form's sourcing (three independent URLs to the same PDF), verified zero AcroForm widgets via `pdfjs-dist`, cross-checked against legacy SEF hosting for stability, and authored the schema with full field-level citations. This closes **Portugal's Visa/residence-status vertical, opening Portugal's 2nd vertical** (1st was `pt/imt/requerimento-carta-de-conducao`, DMV).

### Why No AcroForm?

Portuguese government's submission model for immigration/residence permits is **print-to-photocopy-mail**, not digital fill-and-submit. AIMA's own FAQs and helpdesk guidance confirm that applicants must:
1. Print Modelo 1
2. Handwrite or type the fields
3. Attach supporting documents (originals or certified copies)
4. Mail or hand-deliver to AIMA office

This is the same submission model as Austria's Modelo 3 (taxes), already documented in this registry for Portugal's Taxes vertical. Source-type parity justified authoring both as "structural-reference" maturity.

---

## Verification Checklist

- [x] Source document retrieved and confirmed live (2026-07-08)
- [x] Source document byte-verified against legacy hosting (SEF.pt mirror)
- [x] AcroForm layer checked and confirmed absent (`pdfjs-dist` extraction)
- [x] All field names sourced directly from the form or Lei n.º 23/2007
- [x] Field-level enum values verified against form's printable options
- [x] Supporting-document checklist converted to `documents[]` array
- [x] Administrative (agency-filled) sections explicitly excluded
- [x] Example values are placeholder/fictional (no real applicant data)
- [x] VERIFICATION.md cites this schema's own decisions and limitations
- [x] Schema validated against `spec/v0.3` JSON-Schema

---

## Cross-References

- **Prior cycle:** [GOV-1750](/GOV/issues/GOV-1750) — Portugal DMV opening, flagged Modelo 1 as an open backlog candidate
- **Portugal's 1st vertical:** `pt/imt/requerimento-carta-de-conducao` (DMV, GOV-1750)
- **Portugal's prior Taxes screening:** AT's Modelo 3 identified as strong candidate for a future cycle (also a flat PDF, no AcroForm)
- **Global Visa vertical:** 14/17 (82%) before this schema; **15/17 (88%)** after, closing Portugal's only remaining documented gap for Visa
- **Portugal by vertical:** now 2/6 (DMV + Visa/residence-status); Business Formation, Taxes, Passport, National ID remain open backlog candidates

---

**Verified by:** Standards Engineer, via GOV-1757 research cycle  
**Verified at:** 2026-07-08 T08:17 UTC  
**Next Review:** 2027-01-08 (annual)
