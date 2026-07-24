# Verification record — be/diplomatie/passport-application@1.0.0

## Candidate selection

GOV-4645 ("GovSchema Standard Research"). Belgium was scouted, across all 6
target verticals, during GOV-4638's parallel new-jurisdiction pass alongside
Hungary and Tunisia. That cycle found Belgium strong on several verticals —
Passport (the Foreign Affairs ministry's own 2024 adult/child passport
application PDF, no caveats), Visa (a full 37-field national long-stay visa
PDF), and DMV (the federal DIV vehicle-registration specimen) — with
Business Formation and Taxes each STRONG but caveated (a supplementary
"missing-data" form rather than the primary incorporation path; a
preparation guide rather than the return itself) and National ID weak (a
2-field deregistration certificate, not an ID application). Passport was
banked as "the strongest candidate to open Belgium" and is authored here,
opening Belgium as a new jurisdiction. Belgium's other five verticals were
not independently re-verified byte-for-byte this cycle beyond GOV-4638's own
scouting pass and remain open backlog for a future cycle.

## Reaching the live source

`https://diplomatie.belgium.be/sites/default/files/2024-07/2024-FR-Demande-de-passeport-formulaire-pour-adultes-et-enfants-%C3%A0-partir-de-6-ans.pdf`

- **A relative-URL host-resolution pitfall surfaced and was corrected before
  reaching this final URL.** The ministry's own public forms-listing page
  (`https://diplomatie.belgium.be/en/belgians-abroad/forms`) links this PDF
  by a site-root-relative path
  (`/sites/default/files/2024-07/2024-FR-Demande-de-passeport-...pdf`) with
  no `<base>` tag, meaning it resolves against the *linking page's own
  host*, `diplomatie.belgium.be`. A first fetch attempt guessed the wrong
  host, `www.belgium.be` (the national government portal, a plausible
  sibling domain since other Belgian ministries mirror content there), and
  returned an Incapsula/Imperva bot-challenge page (`<html>` with a CAPTCHA
  image, not a PDF) on one variant of that guess, and a genuine `404` from
  `www.belgium.be` on a second, better-formed attempt — both are artifacts
  of fetching the wrong host, not a live-source failure. Re-deriving the
  correct host directly from the linking page's own canonical URL
  (`diplomatie.belgium.be`) and re-fetching from there succeeded cleanly.
  Future cycles re-verifying this source: use `diplomatie.belgium.be`, not
  `www.belgium.be` or `belgium.be`.
- Plain unauthenticated `curl` request (realistic desktop `User-Agent`
  header; no session/cookie state, no CAPTCHA/WAF challenge from the
  correct host).
- HTTP 200, **167,450 bytes** retrieved — close to the ~164KB GOV-4638
  scouting estimate (the small difference is expected: the estimate came
  from a directory-listing display figure, not a byte-for-byte fetch).
- PDF header `%PDF-1.7\r\n%...` at byte 0.
- sha256 of the retrieved bytes:
  `7e31b4e8d5b0caa2d1dbddacf7ecca72322f74053d6f06778d82cc590983a667`.
- 2 pages, confirmed via `pdfjs-dist`'s `numPages`.
- `getAnnotations()` returned exactly 2 annotations, both on page 1 and both
  `subtype: "Link"` (a hyperlink to the cited law's full text on
  `ejustice.just.fgov.be`, and a hyperlink to the ministry's own passport
  service page) — genuine navigational links embedded in the PDF, not
  AcroForm text/checkbox widgets. This is a flat, print-and-fill specimen
  with zero interactive form fields.
- This is the **French-language edition**. The same July 2024 form is also
  published in parallel Dutch (`2024-NL-Paspoortaanvraag-...`, 171.39 KB)
  and German (`2024-DE-Reisepassantrag-...`, 156.22 KB) editions, linked
  from the same forms-listing page — confirmed to be independently
  published files (not the same PDF relabelled), not fetched/diffed this
  cycle. This differs from tn/dgsn/passport-application's single bilingual
  document; Belgium publishes one language per file rather than one
  document with parallel-column bilingual text.

### Authority attribution

The form's own printed header reads "ROYAUME DE BELGIQUE" / "Service public
fédéral Affaires étrangères, Commerce extérieur et Coopération au
Développement". `authority` is attributed to this Federal Public Service
directly; `diplomatie.belgium.be` is modelled as the ministry's own public
brand/portal for this service (the domain the ministry itself uses across
every consular post's own subdomain, e.g. `canada.diplomatie.belgium.be`),
not a separate third-party hosting portal — unlike, e.g.,
`tt/imd/passport-application-first-adult`'s distinction between a portal
host and a different issuing authority, here the ministry and the portal
brand are the same entity.

## Extraction method

`pdfjs-dist` (vendored at `/tmp/node_modules/pdfjs-dist`, loaded via
`legacy/build/pdf.js` under `createRequire`) `getTextContent()` read every
text item's raw string and `x`/`y` transform position on both pages,
grouped by rounded `y` into printed rows. The text layer is clean,
non-rasterized, and complete on both pages — every printed label, including
all footnote text, extracts as real, legible characters.

**However, this specimen's checkbox squares themselves are vector-drawn
line art, not font glyphs** — unlike tn/dgsn/passport-application's
dingbat/checkbox-font artifacts, which at least appear as stray decoded
characters in the text layer, this form's checkboxes produce **no text
item at all**. The text-content extraction alone could not confirm how many
options exist per group, their exact adjacency/grouping, or which groups
are genuinely mutually exclusive vs. independently toggleable. To resolve
this, both pages were rendered to PNG via `node-canvas` (vendored at
`/tmp/node_modules/canvas`) at 3x scale and read visually — every checkbox
group (Sexe; État civil; Première langue du passeport; Type de passeport;
Enregistrement des données biométriques; Mode de retrait du passeport) was
directly confirmed on the rendered image, including the fixed (non-checkbox)
"belge" nationality pre-fill and the adjoining blank "Autre(s)" line. This
is the converse of the "clean text layer, checkbox needs a visual pass"
and "clean text layer despite stray undecoded checkbox glyphs" failure
modes this registry's own `gov-form-pdf-extraction` reference already
documents — here the text layer is entirely clean but silently omits the
checkboxes altogether, a third, distinct pattern worth recording alongside
the other two.

## Document structure

**Page 1** — header (Kingdom of Belgium / FPS Foreign Affairs); two
instructional paragraphs on where to file (own consular post of
registration vs. another post or a Belgian municipal administration);
**Section 1, "Mes données personnelles ou celles de l'enfant"** (12 numbered
items: name, first name(s), title of nobility, spouse's name, date of
birth, sex, place of birth, nationality (fixed "belge" plus a blank for
additional nationalities), marital status, address, phone number, email);
**Section 2, "Information sur le traitement des données"** (pure privacy-law
citation text, no applicant fields); **Section 3, "Conservation facultative
de longue durée"** (pure explanatory text describing the standard 3-month
vs. optional 7-year data-retention policy — the actual opt-in checkbox for
this choice appears later, on page 2, not here).

**Page 2** — **Section 4, "Mes choix"** (5 numbered sub-items: first
language of the passport; passport type, with a bolded surcharge caveat on
the 66-page option; biometric-data registration location, with a blank for
the flying-consul mission's own location/date; passport collection method,
4 mutually exclusive options plus a grey callout box explaining the mail
option's own risk/cost and pre-paid-envelope instruction; the optional
7-year data-retention checkbox itself, with a note restricting it to
consular posts); a declaration block (date; applicant's signature, footnoted
as gender-neutral; a "for the minor" sub-block: a 2-row table for a
parent/guardian/legal representative's name, relationship to the minor, and
signature); three footnotes (the epicene-language note; a note that the
minor-signature requirement depends on the minor's country of residence's
own regulations; an instruction to attach supporting documents for the
legal-representative block).

## Scope: sections and fields excluded

- **Section 2's privacy-law citation text and Section 3's retention-policy
  explanatory text are excluded in their entirety** — both are pure prose
  describing legal authority and general policy, printed ahead of the
  actual opt-in checkbox (which lives in Section 4, item 5, and *is*
  modelled as `longTermDataRetentionOptIn`), not applicant-fillable content
  themselves.
- **The grey callout box on page 2 explaining the mail-collection option**
  ("L'envoi du passeport par courrier se fait sous votre responsabilité et
  à vos frais... Joignez à votre demande une enveloppe déjà affranchie...")
  is instructional text describing how to exercise the `MAIL` choice
  already captured in `passportCollectionMethod`, not a separate field.

## Scope: fields excluded from `documents[]`

**`documents` is omitted entirely from this schema.** The only
document-related text on this specimen is the third footnote, "Joindre les
pièces justificatives!" ("Attach supporting documents!"), attached to the
minor's legal-representative block — a generic instruction with no named
list of specific document types (unlike, e.g., a source that names "Birth
Certificate" or "Two Photographs" explicitly). Modelling a `documents[]`
array here would mean inventing document types this source does not name,
which this registry's source-fidelity standard does not permit.

## Scope: judgment calls on requiredness

This source has no asterisk/mandatory-marking convention anywhere on either
page (its own footnote markers `*`, `**`, `***` denote clarifying notes —
gender-neutral language, minor-signature country-dependence, and an
attach-documents instruction — not a required-field marker), so
requiredness was assigned by engineering judgment, following this
registry's standard approach (core identity/eligibility/declaration fields
required; secondary/ambiguous fields optional):

1. **`spouseName` modelled unconditionally optional, with no `requiredWhen`
   link to `maritalStatus`.** This is a deliberate departure from this
   registry's own adjacency-based conditional-inference precedent (e.g.
   tn/dgsn/passport-application's spouse block, gated on `maritalStatus`
   because it sits directly beneath the marital-status checklist with no
   separate discriminator). Here, "Nom du conjoint" is item 4, several
   printed lines above the État civil (marital status) group at item 9,
   with no adjacent or cross-referencing label linking the two — asserting
   a `requiredWhen` link here would be inferring a connection this
   specimen's own layout does not support.
2. **`phoneNumber` and `email` modelled required**, not optional
   supplementary disclosures. Both are the form's own sole named channels
   for the consular post to reach the applicant about appointment
   scheduling, flying-consul mission logistics, and passport-pickup
   coordination — functionally load-bearing to the process this form
   supports, not a secondary disclosure comparable to, e.g.,
   `otherNationalities` below.
3. **`otherNationalities` modelled optional**, as a supplementary
   disclosure distinct from the form's fixed "belge" nationality pre-fill,
   consistent with this registry's treatment of comparable fields elsewhere
   (e.g. tn/dgsn/passport-application's own `otherNationalities`).
4. **`flyingConsulMissionLocation` gated on `biometricDataRegistrationLocation`
   equalling `FLYING_CONSUL_MISSION`.** Unlike `spouseName` above, this
   blank line is printed directly on the same option line as its
   discriminator ("lors de la mission flying consul prévue à ……………"), the
   most direct possible adjacency — this schema does assert the conditional
   link here.
5. **The legal-representative block (`legalRepresentative1Name`/
   `legalRepresentative1RelationshipToMinor`/`legalRepresentative1Signature`
   and its `2` siblings) modelled unconditionally optional, with no
   discriminator field.** This form covers both adults and children 6+ on a
   single specimen with no explicit "is this applicant a minor?" checkbox
   or field anywhere — unlike other registry sources with an explicit
   applicant-type discriminator (e.g. `applicantType` on
   `mu/nlta/vehicle-registration-mark-application`), fabricating one here
   would invent a field this source does not print. The block is modelled
   as a bounded 2-slot structure (matching the specimen's own two printed
   blank table rows), per this registry's bounded-slot convention (e.g.
   `director1`/`director2`-style fields), left optional throughout.

## Conformance

2 mock scenarios were reasoned through by hand against this schema's own
`fields[]` conditions (not committed as fixture files, following this
registry's own precedent for single flat-PDF passport schemas, e.g.
`tt/imd/passport-application-first-adult`, `tn/dgsn/passport-application`):
(1) an adult applicant registering biometrics at their own consular post,
collecting the passport in person — resolves with `flyingConsulMissionLocation`
correctly not required (`biometricDataRegistrationLocation` = `CONSULAR_POST`)
and no legal-representative fields required; (2) a minor applicant whose
biometrics are registered during a flying-consul mission, passport sent by
mail — correctly requires `flyingConsulMissionLocation` (via
`biometricDataRegistrationLocation` = `FLYING_CONSUL_MISSION`), with
`passportCollectionMethod` = `MAIL`, and the legal-representative fields
left optional (no discriminator exists to require them, per the judgment
call above, even though this scenario is in fact a minor's application).
The sole `requiredWhen` condition in this schema
(`biometricDataRegistrationLocation`) was exercised both true and false
across the two scenarios.

Validated clean with `node tools/validate.mjs` and `node
tools/validate-ajv.mjs` (ajv 2020-12 against
`spec/v0.3/govschema.schema.json`). `registry-index.json` regenerated via
`npm run build-index` in `tools/govschema-client/`.

Models 26 `fields[]` across 3 steps, 0 `documents[]` entries (omitted per
the scoping note above).
