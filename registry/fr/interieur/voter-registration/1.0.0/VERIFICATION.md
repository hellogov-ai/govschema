# Verification record — `fr/interieur/voter-registration` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-04`

The document was derived directly from the current **Cerfa n°12669** form
("Demande d'inscription sur les listes électorales à l'usage des citoyens
français"), fetched without any bot-block directly from `interieur.gouv.fr`,
and corroborated against two live `service-public.gouv.fr` pages describing
the online démarche. `status` remains `draft`, not `verified` — see the
known discrepancy noted below.

## Sources examined

- **Document `(id, version)`:** `fr/interieur/voter-registration` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Ministère de l'Intérieur, which runs
  `elections.interieur.gouv.fr` and the Répertoire Électoral Unique (REU);
  individual communes are the statutory registration authorities that
  process applications and maintain each electoral roll.
- **Primary source:**
  <https://www.interieur.gouv.fr/content/download/32278/241326/file/formulaire_cerfa_12669-01.pdf>
  — Cerfa n°12669, "Demande d'inscription sur les listes électorales à
  l'usage des citoyens français" (2 pages). Fetched directly with `curl`,
  HTTP 200, a genuine 57,503-byte `%PDF` binary. Full page text was
  extracted via `pdfjs-dist` `getTextContent` across both pages: page 1
  (the form itself — état civil, situation du demandeur, coordonnées
  personnelles, declaration/signature, plus a "réservé à la mairie" block
  not modelled here) and page 2 (explanatory notice: required supporting
  documents, general recommendations, and the registration-deadline text).
- **Secondary sources (fetched live, 2026-07-04):**
  - <https://www.service-public.gouv.fr/particuliers/vosdroits/R16024> —
    "Demande d'inscription sur les listes électorales", which names the same
    form as **Cerfa 12669\*02** and states it is also completable online
    ("Réalisable aussi en ligne").
  - <https://www.service-public.gouv.fr/particuliers/vosdroits/F1367> —
    "Listes électorales : nouvelle inscription", which states the applicant
    "peut s'inscrire toute l'année" (can register all year round) via the
    online service, in person at the mairie, by mail, or through a proxy,
    each requiring the same identity proof, proof-of-residence-under-3-months,
    and the Cerfa form (or its online equivalent); confirms eligibility
    (age 18 by the day before the election, French citizenship, civil and
    political rights intact) and that citizens turning 18 (if pre-registered
    at 16) and post-2019 naturalised citizens are added automatically,
    without this form.
- **Retrieved / reviewed:** 2026-07-04.
- **Reviewer:** GovSchema Engineering (Standards Engineer — initial
  authoring source review).

## Known discrepancy — form edition and deadline text

The PDF instance retrieved carries the printed edition mark **"N° 12669 * 01"**
and states the registration must reach the mairie **"avant le 31 décembre"**
for effect on the following 1 March — the pre-2019-reform rule. The
`service-public.gouv.fr` pages fetched independently in this same pass
(R16024, F1367) both (a) refer to the same form as **"Cerfa 12669\*02"** and
(b) state the current rule is that registration is open **year-round**, with
election-specific processing continuing up to the sixth Wednesday before
the poll (per the 2019 Répertoire Électoral Unique reform, corroborated by
web-search summaries of third-party form mirrors during discovery, not
independently fetched). This schema does **not** model a `deadline` field or
any deadline text, so the discrepancy affects only this VERIFICATION.md's
provenance note, not a published field value. It is flagged here rather than
silently reconciled because the *02 edition's own field labels were not
independently fetched this cycle (interieur.gouv.fr's live "formulaire
d'inscription" landing page returned HTTP 403, and `diplomatie.gouv.fr`'s
mirrored copy 301-redirects to a dead link) — a future reviewer should locate
and diff the \*02 edition against this \*01-edition-derived schema before
promoting `status` to `verified`.

## What was directly observed vs. inferred

| Field(s) | Basis |
|---|---|
| `surname`, `maritalName`, `givenNames`, `sex`, `dateOfBirth` | **Directly observed**, page 1, section 1 (État civil), including the "indiquer le nom de jeune fille pour les femmes mariées" (give maiden name for married women) instruction attached to `surname`, not `maritalName`. |
| `placeOfBirthCommune`, `placeOfBirthDepartmentOrOverseas`, `placeOfBirthCountry` | **Directly observed**, page 1, section 1, including the Paris/Lyon/Marseille arrondissement instruction and the footnoted list of overseas collectivities (Guadeloupe, Martinique, Guyane, La Réunion, Saint-Pierre-et-Miquelon, Mayotte, Wallis-et-Futuna, Polynésie française, Nouvelle-Calédonie). `placeOfBirthDepartmentOrOverseas` is modelled `required: false` with a description explaining it applies only to French-born applicants — the leaf-compare grammar has no field-absence-conditioned-on-another-field's-value operator for "required only when country is France" without misfiring on the common absent case (the same class of gap recorded against `ie/electoral-commission/voter-registration`'s `previousNationalityEvidence`, GOV-1045), so this is deliberately left as a description-only convention rather than a `requiredWhen`. |
| `registrationCommune`, `registrationDepartmentOrOverseas` | **Directly observed**, page 1, section 2 (Situation du demandeur) — "Demande son inscription sur la liste électorale de la commune de". |
| `applicantSituation` | **Directly observed**, page 1, section 2's own three-way tick-box framing (Situation 1/2/3), transcribed verbatim into the field description and `sourceRef`. |
| `previousRegistrationCommune`, `previousRegistrationDepartmentOrOverseas` | **Directly observed**, page 1, section 2 — "Dans ce cas, indiquer impérativement le précédent lieu d'inscription" ("in that case" referring to Situation 3, change of commune). Modelled `requiredWhen: { field: applicantSituation, equals: change_of_commune }`, since `applicantSituation` has a closed enum, avoiding the absent-vs-sentinel misfire class noted above. |
| `alsoRegisteredOnConsularElectoralList`, `consularPost`, `consularCountry` | **Directly observed**, page 1, section 2's own conditional block for applicants also on a consular electoral list who want it cancelled. `consularPost`/`consularCountry` are `requiredWhen: { field: alsoRegisteredOnConsularElectoralList, equals: true }` — a boolean trigger field, so no absent-vs-empty-string ambiguity. |
| `addressLine1`, `postalCode`, `addressCommune`, `phoneNumber`, `email` | **Directly observed**, page 1, section 3 (Coordonnées personnelles du demandeur). `postalCode`'s 5-digit pattern is the standard published French postal code format, not read verbatim off the form (the form does not spell out the format) — flagged for a future reviewer to confirm, same caveat pattern as Eircode/PPSN patterns in `ie/electoral-commission/voter-registration`. The recommendation to supply `email` so the mairie can send an électronic acknowledgement is directly observed on page 2. |
| `declarationDate` | **Directly observed**, page 1 — "Date : __ / __ / __ Signature du demandeur :". |
| `identityAndNationalityProof`, `proofOfResidence` | **Directly observed**, page 2's own "Documents à fournir" section, which states in its own words that the applicant "doit impérativement faire parvenir... les trois types de documents suivants" (must send all three document types) — the form itself, an identity/nationality proof, and a proof of residence — modelled here as `required: true` unconditional documents (the form itself is out of scope as a "document" since this schema models its field data directly). The enumerated acceptable evidence types (ID card both sides / passport photo page / driving licence plus separate nationality proof; utility bill under 3 months / 5-year tax-roll registration / consular registration certificate plus commune-link proof for applicants abroad) are transcribed verbatim into each document's `label`. |

## Explicitly out of scope for v1.0.0

- **The live online téléservice's own screen-by-screen labels.** Both
  `service-public.gouv.fr` pages fetched this cycle describe the online
  service in prose but do not expose its field-by-field wizard; the paper
  Cerfa form is used as the data-model source, consistent with this
  registry's established precedent for schemas whose live online front end
  could not be independently walked (e.g. `gb/co/register-to-vote` citing
  the ITR-E paper form, `ie/electoral-commission/voter-registration` citing
  Form ERF1).
- **Automatic registration paths** — French citizens turning 18 who
  pre-registered at 16, and individuals naturalised after 2019 — both
  documented by `service-public.gouv.fr` as requiring no form at all.
- **Voting from a French consulate/embassy abroad as a distinct process**
  (a separate consular electoral list registration, only referenced here via
  the `alsoRegisteredOnConsularElectoralList` cancellation branch).
- **Special-case guidance for military personnel, itinerant workers (forains,
  gens du voyage), homeless applicants, or registration via a mandated
  representative** — each has its own procedural guidance referenced from
  `service-public.gouv.fr` but not a distinct form modelled here.
- **The "réservé à la mairie" block** on page 1 (registration-type checkbox,
  receipt/processing dates) — filled in by the commune, not the applicant.

## Test run with mock data

A mock application packet was assembled at
`conformance/fr/interieur/voter-registration/1.0.0/application-packet.json`
for an adult applicant registering for the first time in her birth commune,
not also registered on a consular list abroad — fabricated name, address,
and contact details, not a real person. It was checked with a standalone
script re-implementing the schema's own `required`/`requiredWhen`/
`validation`/`eligibleValues` evaluation (GSP-0013 condition grammar
`all`/`any`/`not`/leaf-compare, the same technique used for the last several
registration cycles): 22 fields + 2 documents evaluated, 0 violations.

Both conditional branches were separately exercised by mutating a copy of
the packet:

- `applicantSituation: change_of_commune` without the two
  `previousRegistration*` fields correctly produced 2 violations; adding
  `previousRegistrationCommune`/`previousRegistrationDepartmentOrOverseas`
  brought it back to 0.
- `alsoRegisteredOnConsularElectoralList: true` without `consularPost`/
  `consularCountry` correctly produced 2 violations; adding both fields
  brought it back to 0.

No value was submitted to any government system: this is a registration
process with no sandbox/test environment, so — consistent with this
registry's treatment of other in-person-or-mail-only transactions — this
review did not attempt a live submission.

## Scope and jurisdiction notes

This closes the gap flagged directly in `ie/electoral-commission/voter-registration`
v1.0.0's own VERIFICATION.md (authored under GOV-1043): "France's inscription
sur les listes électorales looks like a similar gap [to Ireland's, before that
schema closed it] but was not investigated this cycle — flagged as a
candidate for a future research pass." That same review confirmed Germany
and the Netherlands genuinely do not need an equivalent schema (both
auto-populate their electoral rolls from the existing municipal residence
register). Of this registry's core jurisdictions, this closes the last
material "remaining voter registration" gap named in GOV-1064/GOV-1043's own
research notes: US (CA/FL), GB, IE, CA, AU, IN, and now FR all have a
voter-registration schema; DE and NL are confirmed not applicable (automatic
registration); NZ and SG were not re-investigated this cycle and remain
open questions for a future pass (New Zealand requires individual enrolment
that is not obviously automatic; Singapore's register is compiled centrally
from National Registration Identity Card records and may be automatic —
neither was independently verified this cycle).

## Path to a `verified` claim (next step)

To advance to `status: verified`, a reviewer resolves the Cerfa \*01-vs-\*02
edition discrepancy noted above (retrieving the \*02 edition directly, or
successfully walking the live online démarche past `interieur.gouv.fr`'s
bot-block, e.g. via headless browser — the technique that worked for other
blocked targets in this registry, such as GOV-1038's NZTA schema), applies
`manual-source-review-v1` (Procedure step 2) field-by-field against it,
resolves any discrepancy found by shipping a **new schema version**
(immutability — VERSIONING §3, practice Procedure step 5), and records the
outcome here plus sets `status: verified` with a current
`verification.lastVerifiedAt`/`nextReviewBy`.

## Re-verification

Per the practice's **Cadence**, `nextReviewBy` is set to **2027-01-01**
(6 months). Re-check the source on or before that date and on any
`source.url` change, and in any case before the next French national
election cycle given the deadline-text discrepancy noted above.
