# Verification record — `de/gewerbeamt/business-registration` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and flow and
states the current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-03`

The document was derived from three independent Länder/municipal editions of
the nationally standardized GewA 1 form (each a genuine fillable AcroForm
PDF), plus a city Ordnungsamt's own field-by-field completion guide. It
closes the Business Formation vertical's last open jurisdiction (DE — see
`gov777-fr-national-id-and-vertical-audit.md`, which left this as the only
remaining gap after au/asic and nz/companiesoffice). No live municipal
online-Gewerbeanmeldung portal was submitted end-to-end (channel varies by
municipality — many remain paper/in-person only), so status remains `draft`,
not `verified`.

## Sources examined

- **Document `(id, version)`:** `de/gewerbeamt/business-registration` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Legal basis:** § 14 GewO (Gewerbeordnung) and § 55c GewO (itinerant
  trades), which require prompt notification of a new trade to the locally
  competent Gewerbeamt/Ordnungsamt; the exact nationwide form layout is fixed
  by the Gewerbeanzeigeverordnung (GewAnzV), a federal ordinance, which is
  why every municipality's "GewA 1" carries the same field content despite
  being administered locally (the same "nationally standardized, locally
  administered" pattern already used for `de/bmi/residence-registration`).
- **Primary form sources, cross-checked against each other field-by-field:**
  - Freie und Hansestadt Hamburg's own **bilingual German/English** GewA 1
    edition (`fhh1.hamburg.de/Dibis/form/pdf/Formular-Gewerbeanmeldung_en.pdf`) —
    used as this schema's canonical field-numbering and label source, since
    its own official English translation is unambiguous and page 4 states
    the German original remains legally binding.
  - Freistaat Sachsen's formularservice edition
    (`formularservice-sachsen.de/nfs/upload_formular/9/GewerbeAnmeldung_1.pdf`) —
    a genuine fillable AcroForm (confirmed via `pdfjs-dist` `getAnnotations()`
    returning real `F1xx`-style field names), used to confirm the field
    ordering and printed cadre text independently of Hamburg's edition.
  - Freistaat Bayern's state-ministry edition
    (`stmwi.bayern.de/fileadmin/user_upload/stmwi/publikationen/pdf/Gewerbeanmeldung.pdf`) —
    a third independent copy, retrieved to confirm the Sachsen/Hamburg field
    set was not an outlier.
  - Hamburg and Sachsen carry identical field content in identical numbered
    order (1 through 33, with 25/27 reserved for section headings rather
    than data fields), which is the direct evidence for the
    "bundeseinheitlicher Vordruck" (nationally uniform form) claim in this
    document's `description`. Bayern is **not** a clean third confirmation
    of that numbering: its edition inserts one extra field — a "Name des
    Geschäfts ... (Geschäftsbezeichnung)" trade-name field, immediately
    after the register-entry fields — that Hamburg and Sachsen do not have,
    which shifts all of Bayern's own subsequent field numbers by +1 relative
    to Hamburg/Sachsen (its own intro text cites "Feldern 4 bis 11" for the
    personal-details block that Hamburg/Sachsen number "fields 3-9"). An
    earlier draft of this document mis-cited that Bayern-only field as
    Hamburg's field 3 (which is actually "Surname") and modelled it as a
    `tradeName` field; that field has been removed from this version since
    it is not part of the Hamburg/Sachsen canonical numbering this document
    otherwise uses throughout, and a Land-specific extra field is out of
    scope for a v1.0.0 built on the nationally-standardized form. Everything
    else in Bayern's field content and ordering (register-entry fields
    onward, once its own +1 shift is accounted for) matches Hamburg/Sachsen.
- **PDF extraction method:** `pdfjs-dist`'s `getTextContent()` (full printed
  instructional text, in both German and — for Hamburg's edition — English)
  and `getAnnotations()` (each fillable field's internal AcroForm name),
  the same technique used for `fr/inpi/micro-entrepreneur-activity-declaration`.
  Hamburg's edition additionally carries English-translated tooltip/field
  text directly in its annotation values (e.g. `"If yes, it contains the
  following conditions or restrictions:"`), which is what let this document
  quote clean English field labels rather than translating the German
  originals by hand.
- **Requiredness / conditional-visibility guidance:** the City of
  Düsseldorf Ordnungsamt's own 4-page **"Anleitung zur Gewerbeanmeldung"**
  (`duesseldorf.de/fileadmin/Amt32/ordnungsamt/Gewerbe/Anleitung_GewA1.pdf`,
  plain informational PDF, no form fields) gives an explicit field-by-field
  completion guide, e.g. "Einzelunternehmen: Lassen Sie Feld 1 und 2 leer"
  (sole traders: leave fields 1-2 blank), "Nur bei Zweigniederlassungen oder
  unselbständigen Zweitstellen ausfüllen" (only for branches/dependent
  branches), "Nur für Handwerksbetriebe" (only for craft businesses). This
  document's `requiredWhen`/`visibleWhen` gates on `applicantType`,
  `registrationScope`, `businessType`, `filingCategory`,
  `newEstablishmentReason`, `isGermanNational`, and the permit/craft/
  residence-permit boolean chains are traced directly to this guide's
  per-field explanations, not inferred from the bare form layout.
- **Note-field numbering caveat:** Düsseldorf's own instructional PDF uses a
  field numbering shifted by roughly +1 to +2 in the personal-details/
  activity sections relative to the Hamburg/Sachsen form editions themselves
  (a cosmetic drafting difference between that city's internal crib sheet
  and the GewA 1 form proper) — this document's `sourceRef`s cite the
  Hamburg-numbered form fields (the form itself, which agents actually see),
  and use Düsseldorf's guidance only for the underlying *rule* (which entity
  type completes which section), matched by field content/label rather than
  by number, to avoid propagating that numbering drift. Bayern's own
  numbering is shifted similarly (see above) and was likewise not used for
  any `sourceRef` in this document — only Hamburg's numbering is cited.
- **Supporting-documents list (`documents[]`):** the GewA 1 form itself does
  not print a checklist of attachments; the identity-document copy, the
  register extract (for already-registered entities), the Handwerksrolle
  extract/Handwerkskarte (craft businesses), the residence-permit copy
  (non-German nationals), and the registration fee were cross-checked
  across several independent municipal/explainer sources
  (gewerbeanmeldung.de, taxfix.de, gruenderplattform.de) that agree on this
  set; none of the four is a primary/official source in its own right; see
  "Known gaps" below.
- **Fee and deadline:** the registration fee is set by each municipality's
  own Kostensatzung (cited secondary-source range: roughly EUR 10-65), so
  this document's `registrationFeePayment` document entry deliberately
  omits a fixed `amount` object rather than publish a number that would be
  wrong for most municipalities. The "register promptly, in practice within
  about a week of starting the activity" norm under § 14 GewO is likewise a
  secondary-source characterisation (gewerbeanmeldung.de, taxfix.de,
  gruenderplattform.de all agree), not a numeric deadline printed on the
  form itself, and is not modelled as a field.
- **Deliberately out of scope for this version:**
  - Full GmbH/AG incorporation (drafting the Gesellschaftsvertrag/Satzung,
    notarial certification under the Beurkundungsgesetz, and the
    Handelsregister entry itself) — this document begins only at the
    Gewerbeanmeldung step that follows any such entity's formation/
    existence, per its `description`.
  - The Handwerksrolle *entry application* process itself (only a
    yes/no-plus-detail flag on whether a Handwerkskarte already exists is
    modelled here, matching what the GewA 1 form itself asks).
  - The Reisegewerbekarte (itinerant-trade licence) application — only the
    GewA 1's own "is this also an itinerant trade" checkbox is modelled.
  - A local manager/authorised-representative appointment mechanism for a
    foreign owner residing overseas, analogous to the scoping already used
    in `sg/acra/sole-proprietorship-registration` — this document assumes
    the registrant (or the entity's named representative) is available to
    sign in person or via the entity's own legal representative.
  - Corrections/re-registration (Ummeldung) and de-registration
    (Gewerbeabmeldung) — separate forms/processes, not this one.

## Test run (mock data)

Two scenarios were run against this schema version's `required`/
`requiredWhen`/`visibleWhen` gating logic with a standalone Node evaluator
script implementing the shared Condition grammar (GSP-0013) exactly as
specified (not committed — mirrors the structural checks `tools/validate.mjs`
and `tools/validate-ajv.mjs` already run):

1. A sole trader (Einzelunternehmerin) registering a brand-new, full-time
   retail trade at her own home address, German national, no branches, no
   employees, no permits — confirms every register-entry, branch-office,
   takeover, craft, and residence-permit conditional field is correctly
   gated off. Committed as this version's
   `conformance/.../application-packet.json` fixture. A deliberately broken
   variant (with `activityStartDate` omitted) correctly **failed** with
   `MISSING required field: activityStartDate`.
2. A GbR partner, non-German (Austrian) national, registering a craft
   business as a dependent branch office of another premises, taking over
   an existing business by inheritance, holding a conditional residence
   permit — exercises every conditional branch simultaneously
   (`registeredCompanyName`/`gbrPartnerNames`, `otherNationality`,
   `principalEstablishment*`, `takeoverReason`/`formerOperatorOrCompanyName`/
   `formerEstablishment*`, `hasCraftsRollCard`/`craftsCardIssueDateAndChamber`,
   `hasResidencePermit`/`residencePermitIssueDateAndAuthority`/
   `residencePermitHasConditions`/`residencePermitConditionsDetail`). Not
   committed as a fixture (single-packet-per-version convention), but a
   deliberately broken variant (with `residencePermitConditionsDetail`
   omitted despite `residencePermitHasConditions: true`) correctly **failed**
   with `MISSING required field: residencePermitConditionsDetail`; restoring
   the field passed.

Both `tools/validate.mjs` and `tools/validate-ajv.mjs` (full JSON Schema
2020-12 meta-schema, ajv) pass for this document.

## Known gaps / future work

- Independently confirm the `documents[]` checklist (identity document,
  register extract, Handwerksrolle extract, residence-permit copy) against
  a Gewerbeamt's own published checklist rather than third-party explainer
  sites, ideally from several different Länder to check for local variance.
- Submit (or observe a submission of) at least one municipality's online
  Gewerbeanmeldung portal end-to-end to promote this document to `verified`.
- A natural next sibling is the Gewerbe-**Ab**meldung (de-registration) and
  Gewerbe-**Um**meldung (change-of-details) forms, which share most of this
  form's identity/premises fields.

## Scope

Out of scope for this version: GmbH/AG incorporation itself, Handwerksrolle
entry application, Reisegewerbekarte application, foreign-owner local-manager
appointment, and Ummeldung/Abmeldung (change/de-registration).
