# Verification record — ci/dst/visa-application@1.0.0

## Candidate selection

GOV-4539 ("GovSchema Standard Research", 2026-07-23). Côte d'Ivoire was not
previously in this registry (89 jurisdictions before this cycle). Scouted
fresh across all 6 verticals via an independent research agent, then
independently re-verified before authoring:

- **DMV** — confirmed dead end. DGTTC (`dgttc.ci`) and OSER handle
  licensing/registration in person via auto-écoles/CGI centers; the only
  online channel found (`eservices.cgi.ci/avit/`) is a login/account-gated
  SPA. No downloadable driving-licence or vehicle-registration form found on
  any official domain.
- **Business Formation** — a real candidate (CEPICI's "formulaire unique"
  sole-trader form, and DGI's `Formulaire_Enregistrement_des_Entreprises_FNE.doc`,
  the latter confirmed live and ungated), but CEPICI's own live host
  currently sits behind a Sucuri bot-detection JS challenge that 307/404s a
  plain fetch — left as open backlog pending a real-browser-capable pass.
- **Visa** — STRONG (this schema). See below.
- **Passport** — STRONG, independently re-verified
  (`https://snedai.com/docs/formulaire_passeport.pdf`, HTTP 200, 69,840
  bytes) but not authored this cycle; left as open backlog for a future
  cycle, alongside Visa's sibling verification.
- **Taxes** — a real, unauthenticated, live candidate (DGI's
  micro-enterprise income-tax declaration,
  `11_DECLARATION_DE_LIMPOT_DES_MICROENTREPRISES.pdf`, 245,929 bytes), left
  as open backlog for a future cycle.
- **National ID & Civic Documents** — weak. ONECI's actual CNI application
  is a live, unauthenticated HTML pre-enrollment form (not a static
  document); the only PDF found on `oneci.ci` is an instructions/checklist
  sheet, not the fillable form itself.

Visa was chosen for this cycle's authoring since it is one of GovSchema's
six core verticals and its bilingual specimen was the more completely
legible of the two STRONG candidates (Visa, Passport) on independent
review.

## Reaching the live source

Fetched `https://snedai.com/docs/Formulaire_visa.pdf` directly with a plain
`curl` request using a realistic desktop User-Agent (Cloudflare-fronted but
not gated — no login wall, CAPTCHA, or paywall):

- HTTP 200, `Content-Type: application/pdf`, `Content-Length: 128087` — a
  byte-for-byte match with the scouting agent's own reported size.
- sha256 `80384ff148e9a323df4109388ac5f9de93e70ff750301a4488e13957596265d2`.
- `snedai.com` (Société Nouvelle d'Exploitation du Domaine Aéroportuaire
  d'Abidjan — the Abidjan airport operator) mirrors this Ministry of the
  Interior form for arriving/departing travellers, a third-party-but-
  official-content mirror of the same genre this registry has accepted
  before (e.g. Ireland's `dlrceb.ie`-mirrored RBN1, GOV-4178).

## Extraction method

Extracted with `pdfjs-dist` (vendored from an existing session scratch
install at `/tmp/node_modules`), reading each page's `getTextContent()`
output directly, grouped by y-coordinate row (±4pt tolerance) and sorted by
x-coordinate to reconstruct column/reading order. Both of the document's 2
pages were additionally rendered to PNG via `pdfjs-dist` + `node-canvas`
(also vendored at `/tmp/node_modules/canvas`) at 2.5x scale and visually
reviewed — necessary because the raw text layer alone cannot distinguish an
office-only box from an applicant-facing one on this form.

## Document structure

A 2-page, bilingual (French/English) form: "Formulaire de demande de
Visa/Application for Visa", Ministère de l'Intérieur / Direction de la
Surveillance du Territoire (DST). Page 1 carries a "RESERVE A
L'ADMINISTRATION" office box (top) followed by the applicant's identity,
passport, and visa-request fields. Page 2 carries a conditional
business-contacts block, a declaration paragraph, and the signature block
(applicant + authority representative).

## Fields modelled

32 `fields[]` across 6 steps (Applicant Identity; Occupation and Passport
Particulars; Visa Sought and Reason for Travel; Merchants/Industrialists to
Meet — Business Trips Only; Address in Côte d'Ivoire and Host/Relative;
Declaration and Signature) plus 1 `documents[]` entry (the form's own
"Photo" placeholder box).

## Disclosed source-fidelity findings

1. **The entire top box (from the page's own top rule down to just above
   "Nom (en majuscule)") is excluded as office-only.** The rendered page
   confirms this box is divided into three columns — "Durée du séjour" (the
   office's own granted-length-of-stay determination: Transit/Court
   séjour/Long séjour), "Service qui établit le Visa" (Ambassade or DST
   (Côte d'Ivoire), a fixed two-option office routing choice), and "RESERVE
   A L'ADMINISTRATION" itself (Date du dépôt de la demande, Dossier traité
   par, and a numbered 1-7 Pièces jointes checklist) — none of it printed
   as applicant input. This is a distinct decision from the form's
   applicant-facing "Durée du visa sollicité" (requested visa duration)
   lower on the same page, which carries an almost-identical Transit/Court
   séjour wording but is modelled as `requestedVisaDuration` (Finding 6
   below) since it is the applicant's own request, not the office's grant.
2. **The unlabelled row of boxes directly beneath "Résidence actuelle"
   (Present residence) and above "Profession" is excluded.** The rendered
   page confirms a full-width row of entry boxes with no adjacent label in
   either French or English anywhere on the page — no derivable meaning, so
   no field is fabricated for it.
3. **`maritalStatus` modelled as a literal `C`/`M`/`D`/`V` enum, not
   spelled-out status names.** The source prints only the four single
   letters ("Situation matrimoniale (Marital's Status) C M D V") with no
   expansion anywhere on either page — unlike this registry's other
   marital-status fields (e.g. `bw/dic/visa-application`'s
   `maritalStatus`), which are sourced from forms that spell every option
   out in full. The C/M/D/V initials are modelled as-is (matching the
   standard French administrative ordering
   Célibataire/Marié(e)/Divorcé(e)/Veuf(ve) — Single/Married/Divorced/
   Widowed — but that expansion is this registry's own inference, not
   printed on the source, and is disclosed rather than substituted as the
   enum's actual values).
4. **`sex` modelled as a literal `M`/`F` enum, not spelled-out
   `MALE`/`FEMALE`.** Unlike `bw/dic/visa-application`'s `sex` field
   (sourced from a form that prints "Male"/"Female" in full), this source's
   "Sexe : (Gender) M ▢ F ▢" never spells out either value anywhere on
   either page — modelled literally per the source's own printed letters.
5. **`spouseName` sourced from a field whose French and English captions
   disagree on gender-neutrality.** The French caption reads "Nom du
   conjoint" (spouse's name, gender-neutral), but the form's own English
   translation reads "(Husband name)" — narrower than the French. Modelled
   as gender-neutral `spouseName` per the French (the form's
   primary-language caption), with the English asymmetry disclosed here
   rather than silently resolved.
6. **`requestedVisaDuration` ("Durée du visa sollicité"/"Validity period of
   visa") is a separate, applicant-facing field from the office-only
   top-box duration discussed in Finding 1**, despite both printing a
   near-identical Transit/Court séjour wording. This field's own third
   option reads "Sortie-retour (un an)"/"(In an out : 1 year)" — distinct
   from the office box's own third option, "Long séjour (1 à 2 ans)"/"Long
   stay (from 1 to 2 years)" — confirming these are two structurally
   different fields on the same page, not one field duplicated by
   extraction.
7. **The 3-slot business-contacts block (`businessContact1Name`/`Address`
   through `businessContact3Name`/`Address`) is gated
   `visibleWhen`/`requiredWhen` on `travelReason` equalling `BUSINESS`, per
   the section's own printed instruction** ("Indiquez avec précision les
   noms et adresses ... s'il s'agit d'un voyage d'affaires" — "Indicate
   precisely names and addresses ... if it's a business trip"), a genuine
   printed conditional this registry's GSP-0013 grammar is built to
   express. Only the first slot (`businessContact1Name`/
   `businessContact1Address`) is `requiredWhen` gated; the second and third
   slots remain optional even when visible, since the source gives no
   indication that meeting more than one contact is expected of every
   business traveller.
8. **The page-2 declaration paragraph ("Vous engagez-vous à n'accepter
   aucun emploi rémunéré ...") is excluded — it is pure declaratory prose
   printed immediately above the signature block, with no discrete
   checkbox, Oui/Non pair, or blank answer line printed anywhere near it**,
   unlike a genuine yes/no question. The applicant's agreement is captured
   by the act of signing, already modelled via `applicantSignature`.
9. **`photo` modelled as a required `documents[]` entry, matching this
   registry's `bw/dic/visa-application` precedent for a placeholder photo
   box.** The rendered page confirms the box is drawn within the visual
   area beside the RESERVE-A-L'ADMINISTRATION column, but it is genuinely
   the applicant's own photo affixed to the application, not an
   office-completed field.
10. **`addressInCotedIvoire` and the three "Répondant en Côte d'Ivoire"
    (Relative in Côte d'Ivoire) fields (`relativeName`, `relativeAddress`,
    `relativePhone`) are modelled as required.** Neither section prints an
    optionality marker; unlike `bw/dic/visa-application`'s own references
    section (Finding 4 there, excluded from required status due to a
    genuinely unlabelled shared box), this form dedicates one clearly
    bounded, singly-labelled field to each, with no ambiguity about what is
    being asked.

## Conformance

3 valid mock scenarios — `valid-tourist-short-stay` (a single, ordinary
passport, short-stay holiday applicant with a full relative-in-country
section); `valid-business-with-contact` (a married business applicant
declaring one merchant contact, exercising `maidenName`/`spouseName` and the
gated `businessContact1Name`/`businessContact1Address`); and
`valid-transit-diplomatic` (a widowed, diplomatic-passport transit applicant
on a mission) — plus 15 mutation-control fixtures (a missing-required-field
fixture for each of `surname`, `givenNames`, `dateOfBirth`, `sex`,
`placeOfBirth`, `maritalStatus`, `originNationality`, `presentNationality`,
`presentResidence`, `passportNumber`, `passportType`, `visaType`,
`requestedVisaDuration`, `travelReason`, and `applicantSignature`; an
invalid-enum fixture for `maritalStatus`; and an unknown-field-rejected
fixture) are committed under `conformance/ci/dst/visa-application/1.0.0/`.

An ephemeral, from-scratch conformance checker (deriving required/enum
rules directly from this schema's own `fields[]`, including its
`visibleWhen`/`requiredWhen` gates, discarded after use, not committed) ran
all 19 fixtures: all 3 valid scenarios at 0 errors, and all 16 mutation
controls each raising exactly 1 error of the expected kind.

Validated clean with `node tools/validate.mjs` and `node tools/validate-ajv.mjs`,
individually and as part of the full registry run. `registry-index.json`
regenerated via `npm run build-index` in `tools/govschema-client/`.
