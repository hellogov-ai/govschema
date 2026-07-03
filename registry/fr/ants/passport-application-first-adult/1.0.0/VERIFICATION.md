# Verification record — `fr/ants/passport-application-first-adult` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-03`

The document was derived from the publisher's own live process guidance and
the official Cerfa form's printed field set and instructional tooltips, but
the online submission channel that now processes the majority of these
requests (ANTS's pré-demande service) sits behind an authenticated account
this review could not reach — so the practice's field-by-field comparison
against a *live* screen set has not been completed. It therefore remains
`draft`, not `verified`.

## Sources examined

- **Document `(id, version)`:** `fr/ants/passport-application-first-adult` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** Agence Nationale des Titres Sécurisés (ANTS), the operator of
  the online pré-demande and passport-manufacturing system, under the
  Ministère de l'Intérieur et des Outre-mer, which is legally responsible for
  the passport itself; applications are lodged at any passport-equipped
  mairie (or a French embassy/consulate abroad), not at ANTS directly.
- **Process guidance:** <https://www.service-public.fr/particuliers/vosdroits/F14929>
  — "Passeport d'un majeur : première demande", fetched live (curl, raw HTML,
  HTTP 200, no block), 2026-07-03. Last verified by the publisher per the
  page footer: "Vérifié le 08 avril 2026 — Service Public / Direction de
  l'information légale et administrative (Premier ministre), Ministère chargé
  de l'intérieur". Confirms: the branching document requirements by identity-
  card status (valid / expired under 5 years / expired over 5 years / none),
  the identity-photo and proof-of-address freshness windows (6 months, 1
  year), the fiscal-stamp fee (86 EUR mainland / 43 EUR Guyane), the two
  submission channels (in France vs. abroad), and the pré-demande-vs-counter-
  form branch ("Si vous avez fait la pré-demande, le numéro et/ou QR code
  obtenus, si vous n'avez pas fait de pré-demande, vous devrez remplir et
  signer le formulaire qui vous sera remis au guichet").
- **Primary form source:** Cerfa **12100\*02**, "Demande de passeport" —
  historically the paper form completed at a mairie/prefecture counter, and
  the same underlying état-civil field set the online pré-demande collects.
  service-public.fr's own dedicated online-form endpoint for this Cerfa
  number (`formulaires.service-public.fr/gf/cerfa_12100.do`) now returns
  "Le formulaire que vous demandez n'existe pas" (retired), and the
  once-linked direct download at a French consulate site
  (`washington.consulfrance.org`) now redirects to an unrelated page —
  both expected, since service-public.fr's own guidance page confirms the
  process has moved to ANTS's online pré-demande. The form's field content
  was instead retrieved from a long-established third-party fillable-PDF
  mirror (`ec.ccm2.net`, hosting a file from `commentcamarche.net` /
  droit-finances, a well-known French consumer-law reference site), and its
  form number/edition/section-structure cross-checked against two
  independent descriptive sources, `juristique.org` ("Cerfa 12100\*02 :
  passeport pour une personne majeur", confirms form number, the
  Ministère de l'Intérieur et des Outre-mer as the issuing administration,
  and the form's two-part structure — état civil, then attestation sur
  l'honneur/date/lieu/signature) and `documentissime.fr` (same form
  identified independently). A third mirror
  (`igon.fr/.../Cerfa-CNI-Passeports-12101-02-Majeur.pdf`) was also
  retrieved but discarded: it is Cerfa 12101\*02, the **minor's** identity-
  card/passport form, not this one, and it carried no text layer or
  annotations to cross-check against.
- **PDF extraction method:** the retrieved PDF is a scanned/rasterised form
  (`getTextContent()` returns no text on either page) with an AcroForm/XFA
  overlay of fillable widgets added by the third-party site — a fourth
  distinct PDF shape in this registry, after the no-AcroForm static case
  (AU NAT 2541, DE ESt 1 A, this schema's sibling FR Cerfa 13750), the
  dynamic-XFA case (DGT i-Kfz), and the has-AcroForm-shell-but-empty-Fields
  case (DE ESt 1 A). Field content was extracted via `pdfjs-dist`'s
  `getAnnotations()`, which exposed each widget's `alternativeText` (an
  applicant-facing tooltip quoting the form's own instructional text
  verbatim) and, for radio-button groups, coordinates and numeric export
  values. Every collected field's `sourceRef` quotes the widget's own
  tooltip text directly.
- **What was deliberately left unmodeled** (present on the source PDF but not
  captured as a `fields[]` or `documents[]` entry, because the extracted
  metadata could not confirm their printed option labels and no OCR tool was
  available in this sandbox to read the underlying scanned image):
  - `CasesTypeDemande` — a single checkbox near the top margin of page 1,
    positioned like an administrative-use marking rather than an
    applicant-facing field; not modelled.
  - `CasesNation` — an 11-checkbox group (two columns), most likely a
    checklist of accepted nationality-justification document types; too
    ambiguous to model as a single field without guessing the option set.
  - `CasesMot1` / `CasesMot2` — two 2-option checkbox pairs immediately
    below the usage-name-origin checkboxes; purpose not confirmed.
  - `Champ_de_texte1` through `Champ_de_texte6` and `pref1` (likely the
    destination préfecture, but the widget's own tooltip is just the literal
    string "pref1", i.e. never relabelled by the third-party editor) — seven
    generic, unrelabelled text boxes whose content could not be determined
    from the extracted metadata alone. Separately, the widget named
    `Couleur2` carries the tooltip "Numéro de téléphone portable" (mobile
    phone) rather than anything colour-related — clear evidence the
    third-party editor recycled/mislabelled internal widget names from a
    template — so this schema's `mobilePhone` field is sourced from the
    differently-named `Tel` widget's own longer tooltip instead, which
    describes the same mobile-phone purpose in full sentences.
  - `Champ_image1` / `Champ_image2` / `Champ_image3` — image-attachment
    placeholders, most likely the applicant photo and signature; represented
    instead at the coarser `documents[]` grain (`identityPhoto`,
    `signature`), consistent with how photo/signature requirements are
    modelled elsewhere in this registry.
- **Requiredness not independently confirmed:** the filiation block (both
  parents' family name, given names, date of birth, place of birth, and
  nationality) is present on the source form with the same field-level
  detail as the applicant's own état-civil block, but the extracted widget
  metadata carries no explicit required/optional marking. Rather than assume
  it is mandatory for an adult applicant (French administrative identity
  forms have historically collected filiation for all applicants, but this
  specific Cerfa edition's requiredness was not independently confirmed),
  all ten filiation fields are modelled `required: false`.
- **Height field:** modelled as `type: number` (meters) even though the
  form's own printed example uses a French-locale comma decimal ("1,20 m");
  the semantic value is a plain decimal, and the comma-formatting detail is
  carried in the field's `description` instead of asserted as a `validation`
  constraint.
- **Guyane fiscal-stamp exception:** service-public.fr states the fee is 43
  EUR in Guyane versus 86 EUR elsewhere. The `fiscalStamp` document models
  only the mainland amount (86 EUR); the Guyane variant is noted in
  `sourceRef` prose rather than a second `documents[]` entry or a
  jurisdiction-conditional amount, since the spec's `amount` shape does not
  currently support a conditional value.
- **Attestation wording not sourced verbatim:** the exact French legal text
  of the signed declaration ("Fait à ... le ... Signature") was not
  recovered from the extracted metadata, so the `signature` document entry
  omits the optional `statement` field rather than paraphrase it.
- **Live online channel identified but not reached:**
  `predemande-passeport.ants.gouv.fr` (ANTS's pré-demande portal) requires an
  authenticated account this review could not reach, and
  `demarches.interieur.gouv.fr`'s own "comment remplir le formulaire" guidance
  page returned a connection-level failure (`TLSV1_ALERT_UNRECOGNIZED_NAME`)
  from this sandbox with no Wayback Machine snapshot available as a
  fallback — both are honest gaps, not silently glossed over.
- **Companion candidates left for a future cycle:** service-public.fr splits
  this same underlying Cerfa 12100\*02 field set into separate fiches by
  situation — "Renouvellement" (F21091), "Passeport perdu" (F21246),
  "Passeport volé" (F21247) — mirroring the first-adult/renewal-adult
  schema pairs already published for AU, CA, GB, and IE. This document is
  scoped to the first-time case only, matching that naming convention
  (`passport-application-first-adult`); a renewal companion is a natural next
  candidate and would reuse most of this field set.

## Scope

Out of scope for this version: the minor's passport process (a separate
Cerfa 12101\*02 form and separate service-public.fr fiches), renewal/lost/
stolen passeport situations, and the online pré-demande portal's own
screen-by-screen flow.
