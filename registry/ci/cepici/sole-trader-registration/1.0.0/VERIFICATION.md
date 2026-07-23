# Verification record — ci/cepici/sole-trader-registration@1.0.0

## Candidate selection

GOV-4561 ("GovSchema Standard Research"). Côte d'Ivoire's Business Formation
vertical was the sole item left open in Known Gaps entry 0l after Visa
(GOV-4539), Taxes (GOV-4547), and Passport (GOV-4554) were each authored in
prior cycles this same week — CEPICI's own "formulaire unique" sole-trader
candidate and DGI's `Formulaire_Enregistrement_des_Entreprises_FNE.doc` were
both flagged real but CEPICI's live host was recorded as sitting behind a
Sucuri Cloudproxy JS challenge that a plain `curl`/fetch cannot pass — "not a
login wall, but not authorable without real-browser-automation access this
cycle."

## Reaching the live source

Real-browser automation access was available this cycle. A Playwright/
Chromium session (this registry's own standing
`browser-playwright-sandboxed-env-setup` recipe: vendored Chromium binary,
`LD_LIBRARY_PATH`/`FONTCONFIG_FILE` environment fixes, realistic desktop
Chrome User-Agent) navigated `https://cepici.gouv.ci` and `https://www.cepici.ci`
— both redirected (HTTP 307) to `https://cepici.ci`, which loaded past the
Sucuri challenge cleanly in the real browser (title "Bienvenue CEPICI", full
page content rendered, no challenge page).

From the homepage: "Services" → "Guichet Unique des Formalités d'Entreprise"
→ "Création d'entreprise" (`https://cepici.ci/infos-creation-entreprise`) →
"SERVICE A LA CREATION D'ENTREPRISES" card → "VOIR PLUS" link →
`https://cepici.ci/creation-entreprise`, which lists CEPICI's own document
library for business creation, organised by legal form. Under the
"PERSONNE PHYSIQUE" (individual/sole-trader) heading, "Formulaire unique"
links to `https://cepici.ci/admin/pdf/codeinvestir/1752162607.pdf`.

That PDF asset URL itself is **not** behind the Sucuri challenge — confirmed
by fetching it directly with a plain, unauthenticated `curl` request (no
browser, cookies, or session needed), using a realistic desktop Chrome
User-Agent:

```
HTTP/2 200
content-type: application/pdf
content-length: 29145
server: Sucuri/Cloudproxy
```

sha256 `a55c3a61d8e0b3f609085746841cdac7561df01568947825ed4a32a8593b970d`.

A companion document from the same page, the "Liste exhaustive des pièces à
fournir pour l'Entreprise individuelle"
(`https://cepici.ci/admin/pdf/codeinvestir/1767862894.pdf`), was also
independently fetched directly (HTTP 200, 300,464 bytes) and read in full —
it supplies this schema's `documents[]` checklist and the blanket
requiredness instruction discussed in Finding 1 below.

## Extraction method

Text extracted via `pdfjs-dist`'s `getTextContent()` API (vendored at
`/tmp/node_modules/pdfjs-dist`), reading each item's raw string and x/y
transform position, grouped by y-coordinate row to reconstruct reading order.
`getAnnotations()` confirmed zero `/Widget` annotations across all 3 pages —
a flat (non-AcroForm) specimen, consistent with every other document in this
jurisdiction's family.

All 3 pages were additionally rendered to PNG via `pdfjs-dist` +
`node-canvas` (vendored at `/tmp/node_modules/canvas`) at 2.5x scale. As with
several prior specimens in this registry, this document's glyphs render as
blank/invisible in the rasterized PNG despite extracting correctly through
the text layer — a broken-glyph-mapping/correct-underlying-text-extraction
pattern, not missing content. Box and table gridlines (vector-drawn, not
glyphs) render correctly regardless, and were used to independently
corroborate the Section V table's column/row counts against the text layer's
own x/y-coordinate groupings (see Finding 4).

## Document structure

3 pages:

- **Page 1**: the office-only "CADRE RESERVE AU CEPICI" box (excluded); the
  "DECLARANT RESPONSABLE POUR L'ACCOMPLISSEMENT DES FORMALITES" block; a
  three-year (ANNEE 1/2/3) investment-amount and employment-count projection
  table. Footer stamp "FU/PP-1/2".
- **Page 2**: Sections I (entrepreneur identification) through V (persons
  empowered to bind the business), and the declaration date/place/signature
  line.
- **Page 3**: footer page-number stamp only ("FU/PP-2/2"), no further
  content.

Models 71 `fields[]` across 7 steps (27 statically required) and 11 `documents[]` entries.

## Fields modelled

See `schema.json`'s own `steps[]`/`fields[]` for the full list; summarized by
step:

1. **Declarant and Investment Projections** — the responsible declarant's
   own identity/contact particulars, plus the three-year investment-amount
   and employment-count projections.
2. **Entrepreneur Identification** — the individual entrepreneur's own name,
   date/place of birth, domicile, nationality, and marital status.
3. **Spouse Identification** — a conditionally-applicable cluster, entirely
   optional (Finding 2).
4. **Business Activities** — activities, operating form, employee/
   establishment particulars, projected turnover, trade name/purpose.
5. **Localisation** — head-office and establishment address particulars,
   cadastral references, postal address and phone.
6. **Persons Empowered to Bind the Business** — a bounded 3-slot repeating
   group (Finding 4).
7. **Declaration** — declaration date and signature.

## Disclosed source-fidelity findings

1. **The companion pièces-à-fournir document's blanket "toutes obligatoires"
   ("all of it is mandatory") instruction is applied to every Section
   I/III/IV/declarant field that is unconditionally applicable to any
   filer.** The pièces-list states: "Il est important de remplir toutes les
   informations contenues dans le formulaire unique ; elles sont toutes
   obligatoires (exemple : chiffre d'affaires prévisionnel, régime
   d'imposition, numéros de téléphone …)" — an authority-issued blanket-
   required instruction. This is the only document in this registry's Côte
   d'Ivoire family to carry such an explicit statement (the sibling
   `ci/dst/visa-application` and `ci/dst/passport-application` schemas rely
   on per-field judgment calls in the absence of any such statement). It is
   NOT extended to the two structurally-conditional clusters modelled
   optional per Findings 2 and 4 (spouse identification; additional
   empowered persons), since a blanket instruction to complete "all the
   information" cannot literally require information that does not exist
   for a given filer (an unmarried entrepreneur has no spouse to declare),
   nor to sub-components of a premises description that may not apply to
   every property type (floor number, door number, cadastral references —
   see Finding 3).
2. **The "II- IDENTIFICATION DU CONJOINT" (spouse identification) cluster is
   modelled entirely optional, with no `visibleWhen`/`requiredWhen` gate to
   `maritalStatus`.** Unlike this registry's sibling
   `ci/dst/passport-application` schema (whose source form prints a literal
   C/M/D/V marital-status checkbox/box-grid enum that schema's own spouse
   cluster gates on), this form's "Situation matrimoniale" is a single
   free-text blank line with no printed options — there is no discrete,
   enumerable value to construct a reliable machine condition against, so
   `maritalStatus` is modelled as a plain `string` field and the spouse
   cluster is left ungated (optional throughout), rather than fabricating an
   enum this specimen does not print.
3. **The premises/localisation sub-fields describing a specific building's
   internal layout or land-registry references
   (`headOfficeFloorNumber`/`headOfficeDoorNumber`,
   `establishmentFloorNumber`/`establishmentDoorNumber`, `lotNumber`,
   `ilot`, `cadastralSection`, `cadastralParcelle`, `titleFoncierNumber`) are
   modelled optional**, since these are conditional on the specific property
   (an unbuilt or non-multi-story premises may have no floor/door number; a
   leased office may have no land-title/cadastral references of its own) —
   `city`, `commune`, and `quartier` (the form's own three primary
   location-identification captions) are modelled required per Finding 1's
   blanket instruction, since every business has a city/commune/quartier
   regardless of building specifics.
4. **"V- IDENTIFICATION DES PERSONNES AYANT LE POUVOIR D'ENGAGER
   L'ENTREPRISE" is modelled as a bounded 3-slot repeating group, all fields
   optional.** The rendered page shows a 4-column, 5-row table — one label
   column ("Nom"/"Prénoms"/"Date et lieu de naissance"/"Nationalité"/
   "Domicile", confirmed via the text layer's own x-coordinate grouping: all
   five labels share the identical x=59 left-margin position, meaning they
   are row labels, not column headers) plus three further data columns —
   matching the companion pièces-list's own "NB : En cas de désignation
   d'une personne pouvant engager l'entreprise, produire..." note, which
   frames this as a conditional designation, not a mandatory one. This
   schema's own documents checklist (Finding 6) does not separately
   duplicate the near-identical identity/criminal-record/residence-
   certificate document set the pièces-list's own "NB" sub-items (a/b/c)
   describe for such a designated person, since it is structurally identical
   to the entrepreneur's own already-modelled document set and this bounded
   table is itself optional.
5. **`dateAndPlaceOfBirth` and its spouse/representative-table counterparts
   are each modelled as a single combined `string` field, not split into
   separate date-of-birth and place-of-birth fields.** Unlike this
   registry's sibling `ci/dst/passport-application` and
   `ci/dst/visa-application` schemas (whose source forms print separate
   "J M A" day/month/year box grids and a distinct "Lieu de naissance"
   caption), this specimen prints one shared blank line captioned "Date et
   lieu de naissance" throughout (Section I, Section II, and the Section V
   table) with no internal box/caption split — splitting it would fabricate
   a structure this specimen does not present.
6. **The `documents[]` list is drawn from the companion pièces-à-fournir
   document, not from this form's own text** (this form prints no
   attached-documents checklist of its own, unlike the sibling
   passport/visa schemas' printed "Documents joints" sections).
   `identityDocumentCopy`, `birthCertificateOrFiliationDocument`,
   `residenceCertificate`, `leaseContractOrPropertyProof`, and
   `locationPlan` are modelled `required: true` (the pièces-list states
   production of every listed document is mandatory for the dossier to be
   processed, and these five apply to every individual-entrepreneur filer
   regardless of circumstance). `criminalRecordExtractAbidjan` and
   `swornDeclarationOfHonorWithCriminalRecord` are modelled `required: false`
   as a disclosed either/or pair (the pièces-list itself conditions which
   applies on whether the entrepreneur/manager was born within the Abidjan
   Commercial Court's own territorial jurisdiction, a condition this schema
   has no field to test). `emancipationAct`,
   `marriageCertificateOrFamilyRecordBook`, `regulatedActivityAuthorization`,
   and `powerOfAttorneyOrOtherDocument` are modelled `required: false`,
   matching the pièces-list's own "Autres" framing (emancipated minor /
   legally married / regulated activity / procuration, each conditional on
   the filer's own circumstances).
7. **The three-year investment- and employment-projection figures
   (`investmentYearNAmount`/`employeesYearN` for N=1..3) are all modelled
   `required: true`**, per Finding 1's blanket-required instruction — the
   source prints all three years' columns identically, with no asterisk or
   note distinguishing any one year as optional, and the pièces-list's own
   worked example of a mandatory field ("chiffre d'affaires prévisionnel")
   is a structurally identical projected-figure field.
8. **The signature is modelled as a plain `signature` string field, not a
   `documents[]` entry**, matching this registry's `ci/dst/visa-application`
   and `ci/dgi/microenterprise-tax-declaration` precedent for this
   jurisdiction's own signature-block convention.

## Conformance

3 valid mock scenarios (an unmarried sole entrepreneur with no additional
empowered representative and no CNPS-registered employees; a married
entrepreneur declaring a spouse under the séparation de biens regime with one
additional empowered representative; a multi-establishment entrepreneur
declaring two additional empowered representatives and secondary-
establishment details) plus 29 mutation-control fixtures (a missing-required-
field fixture for each of this schema's 27 statically-required fields, an
invalid-type fixture, and an unknown-field-rejected fixture) are committed
under
`conformance/ci/cepici/sole-trader-registration/1.0.0/`.

An ephemeral, from-scratch conformance checker (deriving required/type rules
directly from this schema's own `fields[]`, discarded after use, not
committed) ran all fixtures: all 3 valid scenarios at 0 errors, and all
mutation controls each raising exactly 1 error of the expected kind.
Validated clean with `node tools/validate.mjs` and
`node tools/validate-ajv.mjs`, individually and as part of the full registry
run. `registry-index.json` regenerated via `npm run build-index` in
`tools/govschema-client/`.
