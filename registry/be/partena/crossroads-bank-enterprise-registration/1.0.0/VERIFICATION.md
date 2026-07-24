# Verification record — be/partena/crossroads-bank-enterprise-registration@1.0.0

## Candidate selection

GOV-4694 ("GovSchema Standard Research"). Belgium stood at 2 of 6 verticals
(Passport via GOV-4645, DMV via GOV-4680), with Business Formation and Taxes
banked as Belgium's only two remaining open, STRONG-but-caveated verticals
per GOV-4638's own scouting: Business Formation's caveat was "a supplementary
'missing-data' KBO form rather than the primary incorporation path," and
Taxes' caveat was "an exhaustive box-code preparation guide rather than the
blank return itself, which is mailed pre-printed rather than posted online."

This cycle re-screened both caveated candidates plus Tunisia's remaining
weak DMV candidate (`attt.com.tn`, confirmed still unreachable, both http and
https, plus no downloadable form on any live or Wayback-archived page) before
picking a deliverable, per this routine's own standing preference for
closing a vertical on an already-open jurisdiction. **Belgium's Taxes
candidate was re-confirmed as a dead end**: `finances.belgium.be`/
`fin.belgium.be` publish only "document préparatoire" box-by-box preparation
guides for Tax-on-web/MyMinfin (`doc-preparatoire-partie-1-rf-2026.pdf`,
`doc-preparatoire-partie-2-2025.pdf`) — never a blank downloadable PDF of the
return itself, which is mailed pre-printed directly to individual taxpayers.
**Belgium's Business Formation candidate is upgraded from caveated to
STRONG.** Belgium's business register — the Crossroads Bank for Enterprises
(Banque-Carrefour des Entreprises / Kruispuntbank van Ondernemingen, BCE/
KBO) — does not offer direct self-registration by the government: federal
law (Royal Decree of 11 June 2003 and successors) requires every BCE
registration to be filed through one of a small number of officially
recognized private "guichets d'entreprises" (business registration
counters) acting as the BCE's registration agents. `economie.fgov.be`'s own
BCE page confirms this, routing applicants to a recognized guichet rather
than offering any self-service form. One such recognized guichet, Partena
Professional asbl, publishes its own intake form directly and it turns out
to be the **primary** registration form (not a supplementary/correction
document as GOV-4638 had found under a different, narrower search) —
Belgium's genuine primary Business Formation path is a guichet-published
form under this statutory scheme, not a ministry-published one, the same
general pattern this registry has already modelled for Ethiopia
(`et/eic/...`) and other jurisdictions where a recognized-intermediary
architecture stands between the applicant and the register itself.

## Reaching the live source

`https://www.partena-professional.be/sites/default/files/uploads/Administrative%20docs%20&%20forms%20FR/EOL/Formulaire%20d'inscription%20BCE.pdf`
(exact path uses "Administrative" in URL-encoded form; see the literal query
string in `source.url` above for the byte-exact path used).

- Located via Partena Professional's own "Créer mon entreprise" (Start My
  Business) public process page, which links this form directly.
- Plain unauthenticated `curl` request (`curl -sIL` then `curl -sL`), no
  session/cookie state, no CAPTCHA/WAF challenge.
- HTTP 200, **600,346 bytes** retrieved, `content-type: application/pdf`,
  `last-modified: Mon, 22 Dec 2025 14:06:47 GMT`.
- sha256 of the retrieved bytes:
  `8099dcfe99be3a04550bc507e1d04f8088ad71d6ee73823c7ec4ed6fbafb0c23`.
- 6 pages, confirmed via `pdfjs-dist`'s `numPages`; a genuine AcroForm PDF
  (106 named form fields: `Text Field 1`-`106`, `Check Box 1`-`78`, one
  `Signature Field`), unlike several recent flat/print-only specimens this
  registry has modelled. Field names are auto-generated (`Text Field N`,
  `Check Box N`) with no semantic labels of their own — every field's real
  label and grouping was recovered from the surrounding printed text, not
  from the AcroForm field names themselves.
- Footer text confirms version "V.2025-11" and the issuing entity: "Guichet
  d'Entreprises Partena Professional asbl (agréé par A.R. du 11/06/2003) …
  N° Entr. : 0408.661.790".

### Authority attribution

`authority.name` names Partena Professional asbl explicitly as the
recognized guichet filing this registration, distinct from the BCE/KBO
itself (the register this filing ultimately feeds) and distinct from the
Federal Public Service Economy (the ministry the guichet-recognition scheme
sits under). This mirrors how the form's own footer identifies itself: a
private, statutorily-recognized intermediary, not a direct government
office. Belgium licenses multiple guichets (Partena Professional, Xerius,
Formalis, Securex, Acerta, and others) that each publish functionally
equivalent forms for the same statutory BCE inscription; this schema models
Partena Professional's own edition as the verified specimen, not a claim
that this is the only, or an officially singular, BCE intake form.

## Extraction method

`pdfjs-dist` (vendored at `/tmp/node_modules/pdfjs-dist`) `getTextContent()`
read every text item's raw string and `x`/`y` transform position; items were
grouped into horizontal text lines by clustering on shared `y` (±2pt) and
sorted left-to-right within each line, then cross-referenced against each
AcroForm annotation's own `rect` (via `page.getAnnotations()`) by vertical
band to recover each field's adjacent printed label. **This form's printed
text is in normal left-to-right reading order** (unlike several prior
non-Latin-script or coded-field-label cycles) — the extraction challenge
here was purely the AcroForm field names carrying no semantic information
of their own, requiring every one of the 106 fields to be manually
correlated to its nearest printed label by page position rather than by
field name.

## Document structure

Six pages, organized as 12 numbered sections: (1) "Coordonnées de
l'entreprise" — entrepreneur type, activity start date, company number if
known, company/trade name, name, national register/BIS number, phone/
email/website, bank account, data-sharing opt-outs; (2) "Adresse de
correspondance" — an alternate mailing address, completed only if
different from the applicant's domicile or registered office and/or
abroad; (3) "Unité d'établissement (siège d'exploitation)" — the
establishment unit's own address and a free-text activity description;
(4) "Capacités entrepreneuriales" — professional-competence declarations
for regulated activities; (5) "Activation TVA" — VAT-identification
activation as a Partena Professional service request, estimated turnover,
VAT-regime election; (6) "Autres formalités d'inscription" — ancillary
licenses/authorizations (butcher's license, professional card, door-to-door
sales authorization, food-safety agency registration, alcohol/tobacco
merchant authorization, UNISONO, court-registry deed filing) as further
opt-in Partena Professional service requests; (7) "Affiliation à la Caisse
d'Assurances Sociales de l'indépendant ou du mandataire de la société" —
self-employed social-insurance-fund affiliation as a Partena Professional
service request, with other-activity/foreign-activity/replacement-income
questions and a spouse/legal-cohabitant block feeding the provisional-
contribution calculation; (8) the equivalent company/director affiliation
request; (9) "Transfert vers Partena Caisse d'Assurances Sociales" —
transferring an existing affiliation from another fund; (10) "Secrétariat
Social" — payroll-service requests; (11) "Remarques" — free text; (12)
"Coordonnées du mandataire" — the applicant's own accountant/representative
(if any), a document-routing preference, GDPR-processing acknowledgement
bullet points, and the closing place/date/name/signature block. Page 6 is a
standalone decision-tree diagram ("Schéma : affiliation du conjoint
aidant") helping a self-employed applicant's spouse or legal cohabitant
work out their own social-insurance-affiliation status; its "checkbox"
annotations are large clickable regions over printed "oui"/"non" answers on
the diagram itself, not discrete data fields.

## Scope: sections excluded

This schema models sections 1, 2, and 3 (the BCE inscription proper: entity
identity, correspondence address, establishment unit and activity) plus
section 12's closing declaration and signature. **Excluded in their
entirety**, and disclosed here rather than modelled:

- **Section 4 (entrepreneurial capacities)** — conditional on whether the
  specific activity is legally regulated ("uniquement pour les entreprises
  concernées par la loi d'accès"), and its own fields ask about a
  *different* person's identity (whoever holds the professional
  qualification, "si différentes du demandeur") — a distinct sub-process
  from the entrepreneur's own registration.
- **Section 5 (VAT activation)**, **Section 6 (other formalities)**,
  **Section 7/8 (social-insurance-fund affiliation)**, **Section 9
  (fund transfer)**, and **Section 10 (Secrétariat Social)** — every one of
  these is explicitly phrased as a request that Partena Professional itself
  additionally handle a separate administrative action ("En remplissant ces
  informations, je souhaite que Partena Professional se charge de…" / "Je
  charge également Partena Professional des formalités suivantes"), i.e.
  opt-in engagements of this specific guichet's own paid service layer, not
  the statutory BCE inscription itself. A different recognized guichet's
  own equivalent form would not necessarily bundle these same service
  offers. Social-insurance-fund affiliation is a genuine separate legal
  obligation for a newly self-employed person (due within a statutory
  window of starting activity) but is not part of the BCE inscription this
  schema models; it is left as disclosed open backlog for a future,
  separately-scoped schema tied to a fund-affiliation-specific source
  rather than this guichet's own bundled service request.
- **Section 12's mandataire (accountant/representative) fields** — name,
  contact details, Partena intermediary/enterprise numbers, and the
  document-routing preference are the accountant's own particulars,
  completed only when the applicant uses one, and are not the applicant's
  own registration data.
- **Page 6's helper-spouse decision-tree diagram** — contains no
  applicant-fillable data field; it is a navigational aid the applicant
  works through to reach one of section 7's already-excluded fields.

`documents[]` are also **not** modelled from within any of these excluded
sections' own instructions (e.g. "Merci de joindre un extrait du casier
judiciaire" for the door-to-door authorization request) since the sections
themselves fall outside this schema's scope.

## Scope: fields excluded from steps 1-3/12 for other reasons

- **Top-of-page-1 "N° d'intermédiaire" / "N° de producteur" / "N° bureau
  bénéficiaire" fields** — printed at the top-right of page 1, these are
  Partena Professional's own internal case-routing numbers (intermediary/
  producer/office codes used in the guichet's own workflow), not
  applicant-supplied data, and excluded on that basis.

## Scope: judgment calls on requiredness and structure

This specimen carries no asterisk/mandatory-marking convention; requiredness
was assigned by engineering judgment against each field's own printed
context:

1. **`entrepreneurType` values.** Modelled as a 3-value enum
   (`INDIVIDUAL`/`COMPANY`/`UNINCORPORATED_ORGANIZATION`) matching the
   form's own three checkboxes ("Personne physique" / "Société (SRL,
   SA,…)" / "Organisation sans personnalité juridique (OSPJ)"). `COMPANY`
   is used as a general legal-entity value covering the form's own
   parenthetical examples (SRL/BV private limited company, SA/NV public
   limited company) rather than enumerating every Belgian company form,
   consistent with this registry's convention elsewhere of using a general
   `legalForm`-style free-text or coarse-enum field when a source names
   examples rather than a closed list.
2. **`companyNumberIfKnown` and both `documents[]` entries' "not yet known/
   held" conditions are not encoded as `requiredWhen` gates.** The source's
   own logic ties `articlesOfAssociationCopy`'s requiredness (for a COMPANY
   applicant specifically) to whether `companyNumberIfKnown` is filled in,
   and ties `identityDocumentCopy`'s requiredness to whether
   `nationalRegisterOrBisNumber` is filled in — in both cases, "this
   optional field was left blank" is the actual trigger. This registry's
   Condition grammar has no operator testing whether a field is absent;
   attempting to express it via `equals ""` or `notEquals ""` against an
   optional field hits the same undefined-comparison-against-an-absent-
   field class of problem this registry's own
   `notequals-empty-string-absent-field-bug` precedent already documents
   (there, the inverse direction: `notEquals ""` spuriously evaluating
   `true` against an absent field). Rather than risk either a spurious
   requirement or a spurious non-requirement, `articlesOfAssociationCopy`
   is gated only on the unambiguous, always-populated `entrepreneurType ==
   UNINCORPORATED_ORGANIZATION` case (where the source requires it
   outright, no further condition), with the COMPANY-plus-unknown-number
   case left as a disclosed instruction in the document's own `handling`
   text instead of a gate; `identityDocumentCopy` is left fully
   unconditional (`required: false`, no `requiredWhen`) with the same
   disclosure. A future schema revision could safely add this gate if a
   future GSP introduces an explicit "field is absent" operator.
3. **`lastName`/`firstName` modelled required unconditionally**, not
   gated to `entrepreneurType == INDIVIDUAL`. The form's own "Nom :… /
   Prénom :…" line in section 1 sits beneath the company/trade-name lines
   with no visible conditional instruction restricting it to individual
   applicants; per the section's own layout, a company or OSPJ applicant
   also completes this line for the person filing on the entity's behalf
   (confirmed by the parallel "N° de Registre National ou BIS" line
   immediately below it, itself a personal identifier gated to
   `INDIVIDUAL` specifically per judgment call 4 below, showing the
   Nom/Prénom line is not itself individual-only).
4. **`nationalRegisterOrBisNumber` gated to `entrepreneurType ==
   INDIVIDUAL`.** Belgium's National Register applies to natural persons;
   a company or OSPJ applicant's own representative may separately hold
   one, but the form's footnote (2) ties the identity-document fallback
   specifically to "vous" (the entrepreneur) in the individual-registration
   context, and section 1's own repeated appearance of this same numbered
   footnote against every "N° de Registre National ou BIS" instance
   registry-wide (sections 1, 4, and 7) is consistently person-scoped.
5. **`establishmentStreet`/`establishmentHouseNumber`/
   `establishmentPostalCode`/`establishmentCity` modelled required**,
   despite the section's own oui/non gate
   (`isEstablishmentUnitInBelgium`) technically scoping that specific
   question to foreign-enterprise registrations only. A domestic Belgian
   registration (the overwhelmingly common case, and this schema's default
   assumption) proceeds directly to the establishment-unit address without
   ever answering that oui/non question, so the address fields themselves
   are required unconditionally rather than gated behind a question most
   applicants never see.
6. **`activityDescription` modelled as a single multi-line string field**,
   consolidating the specimen's own 7 ruled blank lines into one field,
   matching this registry's established convention for multi-line
   free-text blocks elsewhere (e.g. Belgium's own DMV
   `additionalDeclarationsOrProxyOrDeliveryAddress`).
7. **`phone` modelled required, `email`/`website` modelled optional.** The
   phone/email line sits directly beneath the mandatory identity block
   with no explicit marking distinguishing the two from each other;
   engineering judgment treats the phone number as the primary contact
   channel a guichet needs to process the filing, with email and the
   separately-printed website line as supplementary.
8. **`ibanNumber`/`bicCode` modelled optional.** The "Compte bancaire" bank-
   account sub-section is visually set apart from the mandatory identity
   block with no instruction marking it mandatory; not every new
   registrant necessarily has a dedicated business bank account at filing
   time.
9. **Closing declaration's place/date/name/signature (section 12,
   unlabelled sub-block) modelled as the applicant's own, not the
   mandataire's.** The bulleted GDPR-acknowledgement text immediately
   preceding it ("Je reconnais avoir pris connaissance…", "mes données de
   caractère personnel", "Les données … communiquées dans le présent
   formulaire") speaks in the first person about the filer's own data
   being processed by "le Guichet d'Entreprises et la caisse d'Assurances
   sociales de Partena Professional" — consistent with this being the
   applicant's/client's own final declaration and signature, appearing
   after (not as part of) the optional mandataire-coordinates block earlier
   on the same page.

## Conformance

7 mock scenarios were exercised programmatically (ephemeral, uncommitted
Node script, `/tmp/gov4694/conformance.mjs`) against this schema's own
`fields[]`/`documents[]` `requiredWhen` conditions: (1) an individual
applicant with a minimal valid registration, including a supplied national
register number — resolves with zero missing fields/documents; (2) the
same individual applicant omitting the national register number —
correctly flags only `nationalRegisterOrBisNumber` itself (per judgment
call 2 above, `identityDocumentCopy` is not auto-flagged, by design); (3) a
company applicant missing `companyName` — correctly flagged; (4) the same
company applicant supplying `companyName` — resolves cleanly, with
`articlesOfAssociationCopy` correctly NOT required (COMPANY alone does not
trigger it, per judgment call 2); (5) an OSPJ applicant missing
`companyName` — correctly flags both `companyName` and
`articlesOfAssociationCopy` together; (6) the same OSPJ applicant supplying
`companyName` — `articlesOfAssociationCopy` still correctly required
(OSPJ's requirement is unconditional, independent of `companyName`); (7) an
individual applicant missing the establishment-unit address — correctly
flags all four address fields together. The `entrepreneurType`
`requiredWhen` gate (on `companyName`) and the `UNINCORPORATED_ORGANIZATION`
gate (on `articlesOfAssociationCopy`) were each exercised true and false
across these scenarios.

Validated clean with `node tools/validate.mjs` and `node
tools/validate-ajv.mjs` (ajv 2020-12 against
`spec/v0.3/govschema.schema.json`, after `npm ci --include=dev` in
`tools/`). `registry-index.json` regenerated via `npm run build-index` in
`tools/govschema-client/`.

Models 34 `fields[]` across 5 steps, 2 `documents[]` entries.
