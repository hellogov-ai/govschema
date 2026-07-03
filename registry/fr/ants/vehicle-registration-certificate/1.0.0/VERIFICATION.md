# Verification record — `fr/ants/vehicle-registration-certificate` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-03`

The document was derived directly from the official Cerfa form's own printed
text and cross-checked against its publisher's guidance page, but the online
submission channel that now actually processes these requests
(`immatriculation.ants.gouv.fr`) sits behind an authenticated session this
review could not reach — so the practice's field-by-field comparison against
a *live* screen set (Procedure step 2) has not been completed. It therefore
remains `draft`, not `verified`.

## Sources examined

- **Document `(id, version)`:** `fr/ants/vehicle-registration-certificate` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Agence Nationale des Titres Sécurisés (ANTS), the operator of
  France's national vehicle-registration system (Système d'Immatriculation
  des Véhicules, SIV), under the Ministère de l'Intérieur; the underlying
  Cerfa form is published via service-public.fr / Direction de
  l'information légale et administrative (DILA).
- **Primary form source:** Cerfa **13750\*07**, "Demande de certificat
  d'immatriculation d'un véhicule" (Articles R. 322-1 et suivants du code de
  la route). Retrieved as a PDF (2026-07-03) and cross-matched by form number
  and edition against three independent mirrors of the same DILA-published
  file (`eplaque.fr`, `cartegrise.com`, the préfecture de l'Hérault's own
  download link) — all three serve byte-identical form content for edition
  `13750*07`.
- **Guidance page:** <https://www.service-public.fr/particuliers/vosdroits/R13567>
  — "Demande de certificat d'immatriculation d'un véhicule", fetched live
  (curl, raw HTML, HTTP 200, no block), 2026-07-03. Confirms: the Cerfa
  number/edition (`13750*07`), that the service is free (`Coût: Service
  gratuit`), the 5-step process ("Remplir le formulaire en ligne / Télécharger
  / Imprimer / Signer / Conserver 1 exemplaire signé", with a note that the
  blank form may instead be filled by hand), and the required supporting
  documents ("Selon la démarche effectuée, préparer notamment : Certificat
  d'immatriculation [the existing certificate] ; Justificatif d'identité ou
  extrait KBis [proof of identity, or a KBis extract if the applicant is a
  personne morale]"). Last verified by the publisher per the page footer:
  "Vérifié le 19 juin 2026".
- **PDF extraction method:** the Cerfa PDF carries an `/AcroForm` shell but
  **zero Widget annotations** — a static print-and-sign form, the same shape
  as AU's NAT 2541 and DE's ESt 1 A (a third confirmed instance of this
  no-fillable-fields pattern in this registry). Text was extracted with
  `pdfjs-dist`'s `getTextContent()`, position-sorted (`y` descending, then
  `x` ascending) to reconstruct the printed reading order, since there is no
  AcroForm field name to anchor to. Every field's `sourceRef` quotes the
  form's own printed label text directly.
- **Live online channel identified but not reached:** `immatriculation.ants.gouv.fr`
  (ANTS's SIV portal) and its private-professional-partner equivalents are
  the channel that actually processes the vast majority of these requests
  today (prefecture counters for vehicle registration closed nationally in
  November 2017). Both require an authenticated FranceConnect session (for
  an individual) or a professional account (for a registered intermediary
  such as a dealer or agent); neither was reachable from this environment,
  so the schema is sourced from the Cerfa form and its guidance page, not
  from the live portal's own screens.
- **Retrieved / reviewed:** 2026-07-03.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial authoring
  source review).

## What was directly observed vs. inferred

| Field / group | Basis |
|---|---|
| `procedureType` (6 checkbox options) | Directly quoted from the form's own "Veuillez cocher la case correspondante" instruction. |
| Vehicle description fields (`make`, `commercialDenomination`, `typeVariantVersion`, `vehicleIdentificationNumber`, `nationalVehicleCategory`) | Directly quoted, including the EU-harmonised registration-document codes printed alongside each (D.1, D.2, D.3, E, J.1). |
| `dominantColor` (10 named colours) | Directly read from the printed 3-column checkbox grid under "COULEUR DOMINANTE" — position-sorted text confirms the grid is Noir/Jaune/Gris, Marron/Vert/Blanc, Rouge/Bleu, Orange/Beige (3 columns × up to 4 rows). |
| `colorShade` (Clair/Foncé) | **Directly observed but not confirmed at box level.** "Clair" and "Foncé" print in a column of their own, offset from the 10 named-colour checkboxes rather than repeated once per colour. Whether this is one shade modifier applied to whichever colour is checked, or an independent field, is not stated anywhere on the form; modelled as an independent optional `enum`, the conservative reading. |
| `rentalArrangement`, LOUEUR/LOCATAIRE gating | Directly quoted: the rental checkbox line ("en location longue durée / en location courte durée / en crédit-bail") and the two section headers' own parenthetical scope notes ("(en cas de location ou crédit-bail)" for LOUEUR; "(en cas de location longue durée ou crédit-bail)" for LOCATAIRE) state precisely which rental type requires which block. |
| TITULAIRE / CO-TITULAIRE / LOUEUR / LOCATAIRE identity and address sub-fields | Directly quoted from each section's printed field labels. The four sections repeat the same "Personne physique ou entreprise individuelle / Personne morale", "NOM DE NAISSANCE et PRÉNOM ou RAISON SOCIALE", "NOM D'USAGE (facultatif)" structure; CO-TITULAIRE is confirmed **narrower** than the other three (no separate address/date-of-birth block is printed for it — the printed form only carries a name/SIRET block, immediately followed by the LOUEUR heading). |
| `hasCoHolder` / `multiOwnerCount` | Directly quoted ("Dans le cas de multi-propriété, veuillez indiquer le nombre de personnes titulaires du certificat d'immatriculation"). The form provides space for exactly **one** CO-TITULAIRE; a multi-propriété case with 3+ joint holders is out of scope here (see Scope below). |
| `optOutOfCommercialDataReuse` | Directly quoted ("Je m'oppose à la réutilisation de mes données personnelles à des fins de prospection commerciale\*\*: Oui / Non"). |
| `titleDeliveryMethod` | Directly quoted ("Mode d'expédition du titre: Voie postale / Retrait à l'Imprimerie Nationale"). |
| `identityProof` / `kbisExtract` / `priorRegistrationCertificate` documents | Directly quoted from service-public.fr's own "Documents à préparer" list, not from the Cerfa form itself (the form's printed page does not itemise supporting documents). |
| `signature` document | The form's own signature block ("Fait à: ... Le: ...", "Signature:", "(Pour les sociétés: nom, qualité du signataire et cachet)") is directly observed, but **no exact attestation sentence is printed** next to it (unlike, e.g., DS-82's "I certify under penalties of perjury..."). No `statement` member is set on this entry — the same honesty discipline used for `de/finanzamt/income-tax-return-elster`, which omitted a `documents[]` attestation entirely for the same reason; here the signature requirement itself is still directly sourced, so the entry is kept but left without invented wording. |

## Scope and jurisdiction notes

- **Whole of France** (`jurisdiction.country: FR`, `level: national`) — vehicle
  registration is a national competence exercised through ANTS/SIV, not a
  regional one.
- **Models the Cerfa 13750 form's own field set**, which underlies first
  registration, duplicates, corrections, and the address/civil-status/
  technical-characteristics amendment flows alike (`procedureType`). It does
  **not** model the online SIV portal's own screen-by-screen flow (out of
  reach, see above), nor the distinct paper notice `51291#03` referenced on
  the guidance page as the accompanying "mode d'emploi" (not independently
  opened this cycle).
- **Multi-propriété beyond one co-holder is out of scope.** The printed form
  has room for exactly one CO-TITULAIRE; the guidance for 3+ joint holders
  (a supplementary annex) was not sourced and is not modelled.
- **CADRE RÉSERVÉ À L'ADMINISTRATION is out of scope.** The form's own
  administration-only block (acceptance/rejection, reasons for rejection) is
  filled in by the registration authority after submission, not by the
  applicant, and is not modelled as a field.
- **No hard length/format constraint asserted on `vehicleIdentificationNumber`.**
  A 17-character VIN is the general international convention, but the form
  itself does not state a length, so none is enforced here — consistent with
  not inventing constraints the source doesn't publish.
- This is GovSchema's **first France (`fr/*`) schema and the ninth
  jurisdiction in the DMV vertical** (after GB, DE, CA, AU, NZ, SG, US, and
  US-state entries), advancing the standard's multi-jurisdictional coverage
  per the GovSchema Standard Research routine's mandate to look beyond
  already-closed candidates once a focus vertical's tracked backlog is
  exhausted.

## "Test run" (non-submitting)

Per GovSchema's own boundary (`GOVERNANCE.md`: GovSchema describes and
verifies government processes; it does not submit them), no live submission
was attempted — there is no public sandbox for the SIV system, and probing it
with invented identifiers would mean testing a live government
record-matching system, which prior review cycles in this registry have
consistently treated as out of scope. Instead, a full mock **conformance
packet** was built at
[`conformance/fr/ants/vehicle-registration-certificate/1.0.0/application-packet.json`](../../../../../conformance/fr/ants/vehicle-registration-certificate/1.0.0/application-packet.json)
modelling a private individual's first-time registration (no rental, single
holder, postal delivery): 28 fields collected, 56 correctly excluded as
not-applicable to that scenario (28 + 56 = 84, the schema's full field count —
exact coverage), checked programmatically against the schema's own
`required`/`requiredWhen`/`visibleWhen` rules (0 errors) using a small
`Condition` interpreter covering every operator in §8.1 (`equals`, `notEquals`,
`in`, `all`).

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer applies `manual-source-review-v1`
(Procedure step 2) field-by-field against ANTS's `immatriculation.ants.gouv.fr`
live screens — the blocker this cycle could not clear — using an authorised
FranceConnect session or a professional-partner test account if ANTS ever
publishes one, confirms or corrects the `colorShade` and CO-TITULAIRE-scope
assumptions above, and records the outcome here with an updated
`verification.lastVerifiedAt`.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01** (6 months).
Re-check the source on or before that date and on any `source.url` or Cerfa
edition change (the form is currently edition `13750*07`).
