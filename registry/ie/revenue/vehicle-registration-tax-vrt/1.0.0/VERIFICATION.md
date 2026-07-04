# Verification record — `ie/revenue/vehicle-registration-tax-vrt` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-04`

## Why this schema exists

This closes a gap the catalog itself flagged in the prior research cycle
(GOV-960): 7 of this registry's 11 jurisdictions (AU, SG, CA, IE, NZ, IN, NL)
had a Drivers-Licence schema but no Vehicle Registration/Tag/Title schema in
the DMV vertical, unlike DE/FR/GB/US which have both. Two candidates were
proposed to close that gap: `ca/on/mto/vehicle-permit-renewal` (blocked —
its live Angular wizard performs a real server-side eligibility lookup
against an already-issued plate/permit pair, which cannot be supplied
without a real Ontario vehicle) and `ie/revenue/vehicle-registration-tax-vrt`
(this document), whose catalog note identified a "private-importer paper
channel... a downloadable, non-interactive form, this registry's usual
preferred source shape" as the more tractable path. That path is what this
document models.

## Sources examined

- **Document `(id, version)`:** `ie/revenue/vehicle-registration-tax-vrt` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Office of the Revenue Commissioners (VRT is a Revenue tax);
  the National Car Testing Service (NCTS), operated under contract by Applus
  Inspection Services Ireland Ltd, runs the physical inspection centres and
  forwards the scanned declaration to Revenue — modelled via
  `authority.operatedBy` (GSP-0020), the same shape used for
  `nz/dia/realme-verified-identity`.
- **Primary source:** Form VRTVPD2 ("VRT — Vehicle Purchase Details Form,
  Persons other than authorised traders"), Revenue reference
  `RPC016052_EN_WB_L_1` —
  <https://www.revenue.ie/en/vrt/documents/vrt/form-vrtvpd2.pdf> — fetched
  directly as a **raw PDF** via `curl`, 2026-07-04. No bot-block was
  encountered (unlike several other Revenue-adjacent sites in this
  registry's history); the file downloaded cleanly on the first request.
- **Field-extraction method:** the PDF's real AcroForm structure, parsed
  with `pdfjs-dist` (`page.getAnnotations()` for every Widget, cross-matched
  against `page.getTextContent()` for the surrounding label text) — the same
  technique used for `us/dos/passport-application-ds11` and other
  AcroForm-bearing sources in this registry. **29 Widget annotations** were
  found: 24 text fields (`/Tx`) and one 4-state checkbox group (`/Btn`,
  shared field name `Check Box27`, export values `MD`/`AH`/`OB`/`PI`). The
  visible signature line is a static text object, **not** a fillable
  field — confirming a wet-ink signature is required and cannot itself be
  represented as schema-collectible data (handled instead via the
  `signedDeclaration` `documents[]` attestation entry, GSP-0014).
- **Independent cross-check:** a separate research pass (a different agent,
  working from the PDF's rendered text and its own independent AcroForm
  read, without seeing this schema's field list in advance) reconstructed
  the same 29 widgets with the same field names, labels, and checkbox export
  values before this schema was authored — the two extractions were
  compared field-by-field and agreed completely. This is the same
  double-extraction discipline used for `fr/ants/*` CID-keyed-font PDFs
  earlier in this registry's history, applied here even though VRTVPD2 has
  a normal (non-CID) font, since it is the first fully AcroForm-driven
  authoring pass this cycle.
- **Process/secondary sources:**
  - ncts.ie VRT FAQ (<https://www.ncts.ie/vrtfaq/>) — inspection booking
    window, document checklist, payment methods.
  - Revenue "Registering an imported vehicle" and "Calculating VRT" pages
    (revenue.ie/en/vrt/) — OMSP/CO2/NOx calculation basis, new-vs-used
    document requirements, post-Brexit customs-MRN requirement for Great
    Britain / other non-EU imports.
  - Revenue's VRT Manual (Tax and Duty Manual, revenue.ie/en/tax-professionals/tdm/vehicle-registration-tax/)
    — background on the wider VRT framework (not itself quoted for any
    field, since no field here depends on the Manual's technical detail).
- **Retrieved / reviewed:** 2026-07-04.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial
  authoring source review).

## What was confirmed against the source

| Source element | Field(s) / document(s) |
|---|---|
| Form VRTVPD1 (traders, ROS) vs Form VRTVPD2 ("Persons other than authorised traders") — revenue.ie VRT forms listing | `importerType` |
| Revenue "Registering an imported vehicle" — new-vehicle vs used-vehicle document lists | `vehicleCondition`, `euCertificateOfConformity`, `foreignRegistrationCertificate`, `co2AndNoxEmissionsConfirmation` |
| NCTS FAQ / Revenue guidance on post-Brexit imports — customs MRN needed for GB/non-EU | `importOrigin`, `customsDeclarationMrn` |
| VRTVPD2 §1 "VIN / Chassis No." (Text2) | `vin` |
| VRTVPD2 §1 "Foreign Registration No." (Text1) | `foreignRegistrationNumber` |
| VRTVPD2 §1 "Make" (Text3) | `make` |
| VRTVPD2 §1 "Model" (Text5) | `model` |
| VRTVPD2 §1 "Version" (Text4) | `vehicleVersion` |
| VRTVPD2 §2 "Type of Seller (please tick one)" (Check Box27, MD/AH/OB/PI) | `sellerType` |
| VRTVPD2 §2 "Name / Business Name" (Text10) | `sellerName` |
| VRTVPD2 §2 "Address" (Text11) | `sellerAddress` |
| VRTVPD2 §2 "Contact Number" (Text12) | `sellerContactNumber` |
| VRTVPD2 §2 "VAT Number (if applicable)" (TextVAT) | `sellerVatNumber` |
| VRTVPD2 §2 "Email Address (if available)" (Text14) | `sellerEmail` |
| VRTVPD2 §2 "Website (if available)" (Text15) | `sellerWebsite` |
| VRTVPD2 §3 "Name" (Text6) | `thirdPartyImporterName` |
| VRTVPD2 §3 "Address (include Eircode)" (Text7) | `thirdPartyImporterAddress` |
| VRTVPD2 §3 "Contact Number" (Text8) | `thirdPartyImporterContactNumber` |
| VRTVPD2 §3 "Email Address (if available)" (Text9) | `thirdPartyImporterEmail` |
| VRTVPD2 §3 "Revenue Customer No. (PPSN / VAT)" (Text23) | `thirdPartyImporterRevenueCustomerNumber` |
| VRTVPD2 §4 "Purchase Price (incl. VAT)" (Text16) | `purchasePriceIncludingVat` |
| VRTVPD2 §4 "VAT Amount* (if applicable)... *If the vehicle was not purchased from a Private Individual..." (Text18) | `vatAmount` |
| VRTVPD2 §4 "Date of Sale / Purchase" (Text17) | `dateOfSaleOrPurchase` |
| VRTVPD2 §4 "Date of Entry into the State" (Text19) | `dateOfEntryIntoState` |
| ncts.ie VRT FAQ — 7-day booking window, 30-day registration deadline (from date of entry) | `dateOfEntryIntoState` description |
| VRTVPD2 Declaration "Name (Block Letters)" (Text22) | `declarantName` |
| VRTVPD2 Declaration "Date" (Text20) | `declarationDate` |
| VRTVPD2 Declaration "PPSN / Revenue Customer No." (Text21) | `declarantPpsnOrRevenueCustomerNumber` |
| VRTVPD2 Declaration paragraph, verbatim | `signedDeclaration` (attestation `statement`) |
| VRTVPD2 "An Invoice / Declaration of Sale from the vehicle seller must accompany this form." | `invoiceOrDeclarationOfSale` |
| ncts.ie VRT FAQ — ID, address proof, PPSN evidence at inspection | `photoIdentification`, `addressProof`, `ppsnEvidence` |
| ncts.ie VRT FAQ — shipping/travel documents evidencing entry date | `entryDateEvidence` |

## Honesty flags (deliberate, recorded rather than glossed over)

- **VRT/NOx amount is not modelled as applicant data.** The actual tax due
  is a government-computed output of the vehicle's Open Market Selling
  Price (OMSP) and its CO2/NOx emissions bands — Revenue calculates it at
  the NCTS centre from the supporting documents, not from a number the
  applicant enters. This mirrors `gb/dvla/vehicle-tax`, which likewise does
  not model the tax-rate computation itself, only the reference data feeding
  it. A future revision could model the CO2/NOx *inputs* (e.g. WLTP CO2
  figure, NOx mg/kWh) as additional fields if a companion "VRT estimate"
  agent workflow is ever in scope; this v1.0.0 sticks to what VRTVPD2 itself
  collects.
- **`vin` length (17) is an inference, not a VRTVPD2-stated rule.** The form
  gives no explicit length constraint on "VIN / Chassis No."; 17 is the
  worldwide ISO 3779 standard already used for every other vehicle-VIN field
  in this registry (e.g. `de/kba/vehicle-registration`,
  `us/ca/dmv/vehicle-registration-renewal`). Flagged as inference-by-analogy,
  not an equally well-sourced figure as the rest of the schema — the same
  discipline recorded in `de/kba/vehicle-registration`'s own VERIFICATION.md.
- **`vehicleVersion` optionality is inferred, not stated.** VRTVPD2 marks
  some fields "(if applicable)" or "(if available)" explicitly (VAT number,
  email, website) but not "Version" — this schema treats it as optional
  anyway, since not every vehicle carries a distinct trim/version
  designation, rather than assuming the absence of an annotation means
  strictly required.
- **`foreignRegistrationNumber`'s `requiredWhen vehicleCondition == used`
  gate is a logical inference**, not a rule stated on the form itself
  (which has no "if applicable" note on this box). A brand-new vehicle
  being registered for the first time anywhere would have no prior foreign
  registration to cite; a used, previously-registered import would. Flagged
  as a derived gate, not a literal source quote.
- **No live NCTS/Revenue transaction was tested.** VRTVPD2 is a paper form
  handed in, in person, at a physical NCTS inspection appointment alongside
  a real vehicle — there is no online submission channel to drive (unlike
  the authorised-trader path, which is ROS/login-gated and out of scope
  here regardless). This is the same physical/in-person constraint recorded
  for `us/fl/doh/birth-certificate-request` and `ie/dttas/driving-licence-renewal`.
  A worked walkthrough with representative mock values is given below and
  in `conformance/ie/revenue/vehicle-registration-tax-vrt/1.0.0/` in place
  of a live test run.
- **Scope narrowed to the private-importer channel only**, per the catalog
  candidate's own note — the authorised-trader channel (Form VRTVPD1 via
  ROS) is a distinct, login-gated flow deliberately out of scope, the same
  boundary drawn around `in/mca/company-incorporation-spice-plus` and
  `in/mha/evisa-etourist`.

## Worked example (mock data, not a live submission)

**Scenario:** a private individual importing a used car purchased from a
motor dealer in Great Britain, declaring it at an NCTS centre.

| Field | Mock value |
|---|---|
| `importerType` | `private_individual` |
| `vehicleCondition` | `used` |
| `importOrigin` | `great_britain` |
| `vin` | `WBA3A5C50DF123456` |
| `foreignRegistrationNumber` | `LM19 XYZ` |
| `make` | `BMW` |
| `model` | `3 Series` |
| `vehicleVersion` | `320d SE` |
| `sellerType` | `motor_dealer` |
| `sellerName` | `Northgate Motors Ltd` |
| `sellerAddress` | `14 Northgate Road, Leeds, LS1 4AB, United Kingdom` |
| `sellerContactNumber` | `+44 113 496 0000` |
| `sellerVatNumber` | `GB123456789` |
| `sellerEmail` | `sales@northgatemotors.example` |
| `sellerWebsite` | `www.northgatemotors.example` |
| `purchasePriceIncludingVat` | `18500` |
| `vatAmount` | `3083.33` |
| `dateOfSaleOrPurchase` | `2026-06-02` |
| `dateOfEntryIntoState` | `2026-06-10` |
| `declarantName` | `MAIREAD WALSH` |
| `declarationDate` | `2026-06-16` |
| `declarantPpsnOrRevenueCustomerNumber` | `1234567TA` |

Walking this data through the modelled `steps[]`: `importerType` is
`private_individual`, so `eligibility_and_vehicle_facts` falls through to
`vehicle_details` (no exit triggered) → `seller_details` →
`third_party_importer` (left blank — no third party involved, all fields
optional and correctly not required in this scenario) →
`purchase_and_entry_details`, where `vatAmount` is required and supplied
because `sellerType` is `motor_dealer`, not `private_individual` → `declaration`,
the final step. `vehicleCondition: used` correctly requires
`foreignRegistrationCertificate` and `co2AndNoxEmissionsConfirmation` in
`documents[]`; `importOrigin: great_britain` correctly requires
`customsDeclarationMrn`. This is a self-consistency check of the schema's
own branching and conditional-requirement logic (also run mechanically —
see `conformance/ie/revenue/vehicle-registration-tax-vrt/1.0.0/`), not a
substitute for a live NCTS transaction — see the honesty flag above.

## Path to `verified`

1. Obtain a real (or realistically complete) VRT declaration packet from a
   past private import to confirm the field set end-to-end against an
   actual NCTS-accepted submission.
2. Resolve the exact document-freshness/format rules NCTS applies at
   individual centres (some detail on `addressProof` and `ppsnEvidence` is
   drawn from the ncts.ie FAQ rather than a Revenue-published manual).
3. Add the authorised-trader channel (Form VRTVPD1 via ROS) as a sibling
   document once a ROS test/sandbox credential is available, mirroring how
   this schema's `importerType` eligibility gate already anticipates that
   branch.
4. Consider modelling the OMSP/CO2/NOx *input* data (not the tax computed
   from it) if a future companion "VRT estimate" schema or tool is scoped.
