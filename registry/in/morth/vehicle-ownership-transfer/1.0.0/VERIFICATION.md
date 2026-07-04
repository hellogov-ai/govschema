# Verification record — `in/morth/vehicle-ownership-transfer` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-04`

The document was **derived directly from the primary legal source** below,
which is stronger sourcing than a guidance page or a third-party mirror. But
the live transactional Parivahan/VAHAN "Transfer of Ownership" e-service
itself is state-instanced and login-gated and could not be walked screen by
screen, so the full field-by-field comparison `manual-source-review-v1`
(Procedure step 2) requires against a live portal has **not** been
completed. It therefore remains `draft`, not `verified`.

## Sources examined

- **Document `(id, version)`:** `in/morth/vehicle-ownership-transfer` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Ministry of Road Transport and Highways (MoRTH), Government
  of India, acting through the state Regional Transport Offices (RTOs) as
  registering authorities.
- **Primary source URL:**
  <https://upload.indiacode.nic.in/showfile?actid=AC_CG_61_1084_00001_00001_1554966634246&type=rule&filename=the_central_motor_vehicles_rules%2C_1989.pdf> —
  the full, consolidated text of the **Central Motor Vehicles Rules, 1989**,
  as republished by indiacode.nic.in, the Government of India's official
  legislative-text repository (part of the National Informatics Centre /
  Ministry of Law and Justice's India Code portal). Fetched directly with
  `curl`, HTTP 200, a genuine 5.1 MB `%PDF-1.6` binary (not an HTML wrapper).
  Text-extracted with `pdfjs-dist` (`getTextContent`, grouped by rounded
  y-coordinate to reconstruct line order, since the source is a scanned/
  reflowed statutory PDF with no fillable AcroForm fields).
- **Rule 55 ("Transfer of ownership"), page 63 of the extracted PDF:** read
  in full. States that (1) the transferor reports the sale in **Form 29** to
  the registering authorities of both the transferor's and transferee's
  jurisdiction; (2) the transferee applies for transfer in **Form 30**,
  accompanied by the certificate of registration, the certificate of
  insurance, and the fee under Rule 81; and (3) where the transfer falls
  under a different clause of section 50(1)(a) — in practice, a
  cross-jurisdiction relocation case — Form 30 must additionally be
  accompanied by a no-objection certificate (or one of two alternative
  declarations) under section 48. This sub-rule-(3) NOC branch is out of
  scope for v1.0.0 (see "Scope" below).
- **Form 29, page 313 of the extracted PDF ("NOTICE OF TRANSFER OF OWNERSHIP
  OF A MOTOR VEHICLE", `[See Rule 55(1)]`):** read and transcribed in full —
  every printed field/blank, the hire-purchase/lease/hypothecation clause,
  the "handed over" and "not superdari and free from all encumbrances"
  declarations, and the registering-authority endorsement block.
- **Form 30, pages 314-315 of the extracted PDF ("APPLICATION FOR INTIMATION
  AND TRANSFER OF OWNERSHIP OF A MOTOR VEHICLE", `[See Rule 55(2) and (3)]`):**
  read and transcribed in full, including both **Part I** (for the
  transferor: name, relation, address, sale declaration) and **Part II**
  (for the transferee: name, relation, age, address, purchase declaration),
  the financier's consent block, and the specimen-signature requirement.
- **Retrieved / reviewed:** 2026-07-04 (source confirmed live at authoring
  time).
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial
  authoring source review).

### Sourcing note: morth.nic.in/morth.gov.in unreachable as static PDFs

The Ministry's own site previously hosted each CMVR chapter as a standalone
PDF (`morth.nic.in/sites/default/files/CMVR-chapter<N>_1.pdf`, referenced by
several third-party mirrors). As of 2026-07-04, `morth.nic.in` 301-redirects
to `morth.gov.in`, and that path now returns an HTML shell for a
JavaScript-rendered page, not a PDF — the historical static chapter files are
no longer served at that location. No Wayback Machine snapshot of that exact
path was found either (`archive.org/wayback/available` returned no archived
snapshot). The indiacode.nic.in consolidated-rules PDF was used instead: it
is an official Government of India source, the full and current rule text
(not a chapter excerpt), and it was fetched directly with no access block.

## What was directly observed vs. inferred

| Field | Basis |
|---|---|
| `vehicleRegistrationMark`, `vehicleMake`, `vehicleChassisOrEngineNumber`, `saleDate` | **Directly observed**, Form 29's opening sentence and Form 30 Part II's registration-mark line. |
| `transferorName`, `transferorAddress` | **Directly observed**, Form 29's "I/We...resident of" and Form 30 Part I's "Name of the transferor"/"Full Address". |
| `transferorRelationType`, `transferorRelatedPersonName` | **Directly observed**, Form 30 Part I's "Son/Wife/Daughter of" line (Form 29 itself does not ask the transferor's relation, only the transferee's — Form 30 Part I is the source for this pair). |
| `vehicleUnderHirePurchaseLeaseOrHypothecation`, `financierName` | **Directly observed**, Form 29's "under an agreement of hire purchase/lease/hypothecation with..." clause and Form 30's financier consent block ("Full name and address of the Financier"). |
| `registrationAndInsuranceCertificatesHandedOver` | **Directly observed**, verbatim from Form 29: "The Registration Certificate and Insurance Certificate have been handed over to him/her/them." |
| `transferorNotSuperdariDeclaration`, `transfereeNotSuperdariDeclaration` | **Directly observed**, verbatim declaration text on Form 29 and Form 30 Part II respectively. "Superdari" (interim judicial custody of case-property vehicles) is an Indian legal term of art carried over unchanged from the source rather than paraphrased, consistent with source-fidelity practice. |
| `transfereeName`, `transfereeRelationType`, `transfereeRelatedPersonName`, `transfereeAddress` | **Directly observed**, Form 29's "Shri/Smt...(Name) Son/Wife/Daughter of...residing at" and Form 30 Part II's equivalent labelled fields. |
| `transfereeAge` | **Directly observed**, Form 30 Part II's "Age" field. Not present on Form 29. `validation.minimum: 18` reflects that vehicle ownership (as opposed to a Learner's Licence, which permits 16-18 for MCWOG) is not itself age-gated by Rule 55, but 18 is used as the ordinary age of contractual majority in India; a future reviewer should confirm whether any live-portal input mask enforces this independently. |
| `documents[].certificateOfRegistration`, `documents[].certificateOfInsurance` | **Directly observed**, Rule 55(2)(i)-(ii) and Form 30 Part II's "which is enclosed"/"is also enclosed" phrasing. |
| `documents[].transfereeProofOfAddress` | **Directly observed**, Form 30 Part II's parenthetical "(Proof of address to be enclosed)". |
| `documents[].financierConsentAndSpecimenSignature` | **Directly observed**, Form 30's financier-consent block and its closing instruction that specimen signatures of the financier and registered owner be obtained for attestation against Forms 23 and 24. |
| `documents[].transferFee` | **Directly observed reference (Rule 55(2)(iii)), amount not encoded.** Rule 81 sets fees by rule and vehicle class rather than stating a flat amount in Rule 55 itself; consistent with `in/morth/learners-licence-application`'s fee convention, the amount is not hard-coded here. |

## Test run with mock data

A mock application packet was assembled at
`conformance/in/morth/vehicle-ownership-transfer/1.0.0/application-packet.json`
using fabricated transferor/transferee/vehicle details (not a real
registration mark, chassis number, or address) and checked field-by-field
against this schema's own `required`/`requiredWhen`/`validation`/
`eligibleValues` constraints — including the `vehicleUnderHirePurchaseLeaseOrHypothecation`
branch, exercised once as `false` (the ordinary case, `financierName` and the
financier-consent document correctly not applicable) in the packet, with the
`true` branch reasoned through separately and recorded in
`fieldsNotApplicable`/`branchNotExercised` notes. No value was submitted to
any government system: the live Parivahan/VAHAN "Transfer of Ownership"
e-service is a state-instanced, login-gated transactional portal with no
public test/sandbox mode, so — consistent with this registry's treatment of
other credential-gated live services (e.g. `sg/lta/vehicle-ownership-transfer`,
`in/morth/learners-licence-application`) — this review did not attempt to
exercise a live wizard end to end.

## Scope and jurisdiction notes

- **Ordinary individual-to-individual sale, same registering-authority
  jurisdiction, non-transport vehicle only.** Out of scope for v1.0.0:
  - The Rule 55(3) branch, where the vehicle is to be kept in a different
    state/RTO jurisdiction and an additional no-objection certificate (or
    one of the rule's two alternative declarations) under section 48 is
    required. This is a materially different, multi-document evidentiary
    path that deserves its own careful modelling rather than being folded in
    as an afterthought.
  - Transfer on the death of the registered owner (Form 31, per Rule 56(2)),
    a distinct process with its own succession-evidence requirements.
  - Transport/commercial vehicles, which Form 30 Part II also references
    needing an enclosed certificate of fitness.
  - Transfer to or from a company or other non-individual entity.
  - Vehicle registration itself (Form 20), a separate process.
- **This closes India's "Vehicle Registration/Tag/Title" gap in the DMV
  vertical**, one of the four remaining jurisdictions (alongside CA, NZ, NL)
  identified by the GOV-960 per-country x per-vertical audit and already
  closed for SG under GOV-1000: `in/morth/learners-licence-application`
  (Drivers Licence) was already published, but India had no Vehicle
  Registration/Tag/Title schema at all. Ownership transfer (rather than, say,
  renewal — vehicle registration in India does not expire and require
  renewal the way a US/GB tag/road-tax does, except at the 15/20-year
  fitness-renewal mark, itself a separate process) was chosen because it is
  backed by two genuine, verbatim statutory forms (Form 29, Form 30) reached
  from a primary legal source, giving direct field-level traceability that
  matches this registry's sourcing preference for a concrete form artifact
  over guidance-prose-only transcription.

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies `manual-source-review-v1`
(Procedure step 2) field-by-field against a live state instance of the
Parivahan/VAHAN "Transfer of Ownership" e-service using a genuine login and
an actual registered vehicle pair (seller + buyer), confirms the
`transfereeAge` minimum and whether any address sub-structure is imposed by
the live portal beyond the source forms' free-text lines, resolves any
discrepancy by shipping a **new schema version** (immutability — VERSIONING
§3, practice Procedure step 5), and records the outcome here plus sets
`status: verified` with a current `verification.lastVerifiedAt`/
`nextReviewBy`.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01**
(6 months). Re-check the source on or before that date and on any
`source.url` change.
