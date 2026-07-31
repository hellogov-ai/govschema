# Verification record — cd/maeci/visa-application@1.0.0

## Candidate selection

GOV-5798 ("GovSchema Standard Research"). A prior cycle (GOV-5791) scouted 18
new-jurisdiction candidates in parallel and banked the Democratic Republic of
the Congo as one of 16 countries with at least one reachable, unauthenticated
candidate document (noted there as "DR Congo Passport and Visa AcroForms"),
without authoring any of the 16 (Papua New Guinea's Form A-17 was judged the
strongest single candidate that cycle and authored instead). This cycle
re-scouted DR Congo specifically and found the Ministère des Affaires
Étrangères et Coopération Internationale's (MAECI, Ministry of Foreign
Affairs and International Cooperation) own "Formulaire de Demande de Visa /
Visa Application Form" — a genuine 83-widget AcroForm distributed
unauthenticated by the Embassy of the Democratic Republic of the Congo in
Washington, DC — to be the stronger of the two banked candidates (a
richer field set than the DGM passport-application track, which was not
found as a directly downloadable form this cycle). Opens the Democratic
Republic of the Congo as the registry's 102nd jurisdiction, via the Visa
vertical (1 of 6).

## Reaching the live source

Target: `https://www.ambardcusa.org/wp-content/uploads/2018/07/Visas_application_writable.pdf`
("Formulaire de Demande de Visa / Visa Application Form," Ministère des
Affaires Étrangères et Coopération Internationale, distributed by the
Embassy of the Democratic Republic of the Congo in Washington, DC).

- Re-fetched directly: HTTP 200, `Content-Type: application/pdf`, **601,971
  bytes**.
- sha256 of the retrieved bytes: `ab7c73f01a0cbfdfc32d7bfed7abda4afb672757712e1a4d922219754c9d00cb`.
- No login, CAPTCHA, or WAF gate on the asset itself. The bare
  `ambardcusa.org` domain root now 301-redirects to `ambadrcusa.org`
  (a rebrand/consolidation of the embassy's own site since this file was
  first published in 2018), but the direct asset path
  (`/wp-content/uploads/2018/07/...`) continues to resolve on the original
  host with no redirect — confirmed directly this cycle, not assumed.
- The Ministry's own national site, `https://diplomatie.gouv.cd`, is live
  (HTTP 200) and is used as `authority.url`; the specific visa-application
  PDF was not found hosted there directly, consistent with this registry's
  established pattern of consular/embassy-hosted distribution for a
  national ministry's own form (see e.g.
  `ng/nis/application-for-visa-entry-permit`, sourced the same way from an
  embassy mirror of a Nigeria Immigration Service form).
- Confirmed mechanically via `pdfjs-dist`: the document is a genuine
  AcroForm (not a flat/print-and-fill specimen) with 2 pages, 58 form-field
  annotations on page 1 and 25 on page 2 (83 total raw widgets — Btn
  checkboxes and Tx text fields), each carrying an internal PDF field name
  independently extracted via `page.getAnnotations()`.

## Extraction method

`pdfjs-dist` (`getAnnotations()` for the 83 raw form-field widgets;
`getTextContent()`, row-grouped by y-coordinate and sorted by x-coordinate
per page, for the surrounding printed labels/instructions/footnotes) — no
glyph-index or `canvas` rendering workaround was needed; the embedded fonts
decode cleanly to readable French/English text. Each raw widget was matched
to its printed label and numbered item (1–16 on page 1, unnumbered
continuation plus Items 1–5 on page 2) by cross-referencing its rect
(x, y) coordinates against the nearest text row.

## Field modelling and disclosed findings

Models 60 `fields[]` across 7 steps mirroring the form's own numbered
sections (Section B Items 1–16 on page 1, continuing unnumbered onto page 2
before its own numbered Items 1–5), 3 `documents[]` entries (2 supporting
documents from Section A's own attachment checklist, 1 attestation from the
Item 5 declaration), and 1 `crossFieldValidation` rule.

Disclosed findings, all confirmed directly against the raw annotation/text
extraction rather than assumed:

1. **No printed required/optional signal anywhere on the form.** Unlike
   several sibling schemas in this registry (e.g. Identità-family asterisk
   conventions), this form marks no field as mandatory or optional with any
   printed symbol — footnote markers (*1) through (*8) are cross-references
   to explanatory notes, not requiredness signals. Every field's
   required/optional status here is a disclosed domain judgment call: core
   identity, passport, purpose-of-travel, and visa-type questions (the
   form's own numbered items 1–16) are modelled required; supplementary
   family/contact detail not itself numbered as its own item (email, father/
   mother's name and nationality, spouse detail when inapplicable, residency
   card, prior DRC visa, travel-supporting-document reference, place of
   mission, visa processing period) is modelled optional.
2. **Two internal PDF field names are reused/mismatched across the
   document**, a source-side authoring artifact rather than a schema
   modelling choice:
   - The residency card's own "Date d'expiration" line (Item 13, page 1) is
     internally named `voyage a specifier` — the same internal name used
     correctly elsewhere on the same page for Item 11's genuinely distinct
     "Autres types de titre de voyage à spécifier" field. Disambiguated here
     by rect position (y≈255 vs. y≈332), not by the internal field name;
     modelled as `residencyCardExpiration`, distinct from
     `otherTravelDocumentTypeDetails`.
   - The "Transit" radio checkbox itself (the only one of the form's four
     visa-type options — Transit / Une seule entrée / Deux entrées /
     Multiples entrées — implemented as an independent `Btn` widget rather
     than one bound radio group) is internally named `Aller Du`, reusing the
     label of its own first date sub-field rather than "Transit." Confirmed
     by rect position (y≈90, aligned with the "Transit a. Aller du/Depart
     from" text line, distinct from the `Transit Aller du` text-field
     widget at the same row). Modelled as one value (`TRANSIT`) of the
     `visaType` enum, consistent with how this registry already collapses
     the form's other independent-checkbox-implemented single-choice groups
     (`maritalStatus`, `passportType`, `purposeOfTravel`) into a single enum
     field each — nothing in the live PDF technically prevents multiple
     checkboxes from being ticked at once in any of these four groups, but
     the form's own layout and instructions present each as a single
     choice.
   - A minor, separate spelling inconsistency: the "Multiples entrées"
     internal field name for the group's own two date pairs is inconsistent
     between `Multiples entrees` (first pair) and `Multiple entrees`
     (second pair, singular). Disclosed, not corrected; both pairs are
     modelled as `multipleEntriesFirstFrom/To` and
     `multipleEntriesLastFrom/To`.
3. **Footnote (*3)** ("joindre la photocopie du visa de voyage dans le pays
   de la dernière destination/Please attach a copy of the travel visa for
   the country of final destination") **has no inline reference point
   anywhere on the form** — confirmed by searching every extracted text
   item across both pages for the substring; it appears only once, in the
   footnote-definitions block itself at the bottom of page 2. Unlike every
   other footnote ((*1), (*2), (*4), (*5), (*6), (*7)), which each have a
   confirmed inline `(*n)` marker next to the item they annotate, (*3) is
   orphaned. Not modelled as a field or document, since its intended
   attachment point cannot be determined from the source; disclosed rather
   than guessed. Footnote (*8) (embassy index/registration-number
   convention for the visa number) is likewise unreferenced inline, but its
   own text makes clear it belongs to the chancery-only section (see below),
   so it is excluded for that reason rather than treated as a second
   orphan.
4. **`hasSponsor` is a directly-supplied gate, not itself a printed
   checkbox.** Page 2's own Items 2–3 distinguish a sponsored traveller
   (providing an inviting individual/legal entity's name, address, phone
   number, and a "Garantie de la prise en charge") from a self-funded
   traveller (providing "Preuves des moyens de subsistances" instead), but
   the form prints no single yes/no control selecting between the two paths
   — the applicant's own choice of which block to fill is the only signal.
   Modelled as a boolean gate, the same convention this registry's
   `mt/identita/long-stay-visa-application` established for its own
   `hasHostInMalta`, with `sponsorName`/`sponsorAddress`/
   `sponsorPhoneNumber`/`sponsorshipGuarantee` each `requiredWhen hasSponsor
   equals true` and `proofOfFinancialMeans` `requiredWhen hasSponsor equals
   false`.
5. **The "SECTION À REMPLIR PAR LA CHANCELLERIE / SECTION TO BE FILLED OUT
   BY CHANCERY"** (visa application number, chancery officer's own notes,
   chancellor's signature) is excluded entirely — it is completed by embassy
   staff processing the application, not by the applicant, consistent with
   this registry's convention of modelling only the applicant-facing side of
   a government process.
6. **Bilingual French/English source, no discrepancy found.** Every label
   extracted and quoted in `sourceRef` above prints both languages side by
   side on the form itself (e.g. "Nom / Name," "Date de naissance/Date of
   Birth"); the two language versions of every label were cross-read against
   each other during extraction and found consistent throughout, with no
   translation mismatch.

## Conformance testing

2 valid mock scenarios (a single, unmarried business traveller requesting a
single-entry visa, self-funded with no sponsor; a married traveller
requesting a multiple-entry visa, sponsored by an inviting organisation, with
an "Autres" passport type requiring a specified travel-document detail) plus
8 mutation-control fixtures (a missing statically-required field; a missing
`spouseName` while `maritalStatus` is `MARRIED`; a missing
`otherTravelDocumentTypeDetails` while `passportType` is `OTHER`; a missing
`transitDepartureFrom` while `visaType` is `TRANSIT`; a missing `sponsorName`
while `hasSponsor` is `true`; a missing `proofOfFinancialMeans` while
`hasSponsor` is `false`; an invalid `maritalStatus` enum value; an unknown
top-level field), committed under
`conformance/cd/maeci/visa-application/1.0.0/`. An ephemeral, from-scratch
conformance checker (deriving required/requiredWhen rules directly from this
schema's own `fields[]`/`documents[]`, discarded after use, not committed)
ran all 10: both valid scenarios at 0 errors, all 8 mutation controls each
raising exactly 1 error, confirmed every `requiredWhen` field reference
resolves (0 dangling references), and confirmed the single
`crossFieldValidation` rule (`dateOfExpiration` after `dateOfIssue`) holds on
both valid scenarios. Validated clean with `node tools/validate.mjs` and
`node tools/validate-ajv.mjs`, individually and as part of the full registry
run.
