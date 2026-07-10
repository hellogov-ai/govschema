# Verification record — at/bmeia/schengen-visa-application@1.0.0

## Candidate selection

This is Austria's Visa vertical, a candidate already screened and
confirmed viable (but left unauthored) in the prior GOV-2121 cycle
("Austria's National ID vertical opens"): the EU/Schengen uniform "Formular
C1" Schengen visa application (`Antragsformular_Visum_C_NEU.pdf`, 285,208
bytes, 4 pages, field-numbered with no AcroForm layer). That cycle noted it
as "a real, legitimate, open candidate for a future cycle, but a
comparatively thinner 'Austria' story" than the other two verticals it
screened (Passport, National ID) — both of which have since been authored
(GOV-2121, GOV-2128). With Business Formation, Taxes, National ID, and
Passport now all live, Visa is Austria's last remaining open, viable,
screened backlog candidate; DMV remains a confirmed weak/dead-end candidate
from an earlier cycle (Kfz-Zulassung is in-person/counter-driven with no
downloadable specimen).

This document does not re-litigate that screening; it starts from a fresh,
from-scratch re-fetch and re-extraction of the candidate the prior cycle
identified only by filename and byte count, rather than trusting those
numbers.

## Source

- **Primary:**
  `https://www.bmeia.gv.at/fileadmin/user_upload/Allgemein/Formulare/Antragsformular_Visum_C_NEU.pdf`
  — confirmed by direct `curl` fetch with a browser User-Agent: HTTP 200,
  `content-type: application/pdf`, exactly **285,208 bytes**
  (SHA-256 `502e46f0b12a52b3f8af1ce9023bbd53b3a54d702e28a391bbcf1581894edf42`)
  — matching the byte count the prior GOV-2121 cycle independently recorded
  when it screened (but did not author) this same specimen. Hosted directly
  in BMEIA's central "Allgemein/Formulare" forms library, the same host
  already established as canonical for this registry's other `at/bmeia`
  and `at/bmi` schemas.
- **Authority page:** `https://www.bmeia.gv.at/en/travel-stay/entrance-and-residence-in-austria/visa`
  — HTTP 200, BMEIA's own English-language visa overview page, which itself
  names "Form C1" and discusses the Schengen short-stay visa process.
- This is the EU-harmonised uniform application form set out in Annex I to
  Regulation (EC) No 810/2009 (the Visa Code) — legally identical in field
  content across every Schengen state, though each state hosts and
  administers its own copy/translation set and intake process. A search of
  this registry found no existing schema modelling this literal harmonised
  paper template under any jurisdiction: the closest neighbours are
  `fr/france-visas/schengen-visa-application` (France's own bespoke
  *online-portal* intake form for the same visa category, with a
  France-specific field set, not the Annex I paper template) and several
  *national/long-stay* (category D) visa schemas
  (`de/auswaertiges-amt/national-visa-application`,
  `es/maec/solicitud-visado-nacional`,
  `cz/mzv/zadost-o-udeleni-dlouhodobeho-viza`,
  `ee/vm/long-stay-visa-application`), which are explicitly *not*
  EU-harmonised (only short-stay Schengen "C" visas use the uniform Annex I
  template; long-stay "D" visas remain each state's own design). This
  document is therefore this registry's first schema modelling the literal
  harmonised short-stay template, via Austria's own hosted copy of it.

## Extraction technique

Fetched the PDF directly and processed it with `pdfjs-dist` (the same
technique this registry's prior `is/skatturinn` and `at/*` cycles used):

- `getDocument(...).numPages` → **4**.
- `page.getAnnotations()` on every one of the 4 pages → **0** `Widget`-subtype
  annotations on any page (confirmed independently for pages 1-4, not
  assumed from the prior cycle's disclosure).
- `doc.getFieldObjects()` → an empty object (0 keys), consistent with the
  above.

This is therefore a genuine flat/print specimen with **no AcroForm layer**,
exactly as the prior GOV-2121 screening cycle disclosed — independently
reconfirmed here, not merely trusted. All page text was then extracted with
`getTextContent()` (per-page, with each text run's x/y position) and
cross-walked against the form's own printed field numbers ("1." through
"37.") visible in that text stream, to build this document's field list.
No field numbering, label wording, or checkbox option set was taken from
prior knowledge of the well-known EU Annex I template without confirming it
against this session's own extraction of this specific PDF.

## Field model

The source's own numbering (fields 1-37) is used directly as this
document's `sourceRef` anchor for every field, following this registry's
established convention for numbered-line, non-fillable specimens. Several
numbered items expand into more than one GovSchema field because the
printed box contains more than one independently blank sub-item (e.g. field
17's address/e-mail heading and its distinct "Telephone number(s)" heading;
field 26's own conditional validity-date sub-block) or more than one
independent checkbox (e.g. field 33's cost-of-travel-funded-by selector and
its two separate means-of-support checklists) — yielding **74 fields** in
total from the 37 printed items. Two constructs from GSP-0013 are used for
the first time in an `at/bmeia` cycle:

- **`exclusivityGroups`**: field 33's four "who pays" checkboxes
  (`fundedByApplicant`, `fundedBySponsor`, `fundedBySeeField31Or32`,
  `fundedByOtherEntity`) are modelled as independent optional booleans (this
  specimen carries no AcroForm radio-group layer to merge them into a true
  enum, unlike the sibling `at/bmi` cycle's genuine PDF radio groups) but
  are declared mutually exclusive via one `exclusivityGroups` entry, since
  the source's own layout ("werden getragen ... vom Antragsteller
  selbst/... von anderer Seite/... siehe Feld 31 oder 32/... von sonstiger
  Stelle") presents them as one single-answer question. The two
  means-of-support checklists nested under this question (6 for the
  applicant, 5 for the sponsor) are deliberately **not** placed in an
  exclusivity group — the source lets an applicant tick more than one (e.g.
  both "cash" and "credit card").
- **`crossFieldValidation`**: two `compare` rules — the intended departure
  date from the Schengen area must be on or after the intended arrival date
  (fields 29-30), and the travel document's expiry must be on or after its
  issue date (fields 14-15).

**Disclosed scope decision — asterisked fields.** The source form itself
prints a `*` beside fields 19, 20, 31, 32, and the cost-of-travel selector
of field 33, with a footnote (in all four printed languages) stating these
"shall not be filled in by family members of EU, EEA or CH citizens ...
while exercising their right to free movement" — who instead complete
fields 34-35. This is a real conditional exemption, but the source states
it only as free-standing footnote prose tied to the applicant's own
family-member status, not as a structured rule keyed to a single yes/no
field this document already models (fields 34-35 have no companion
"are you such a family member?" boolean of their own — their being filled
in at all *is* the signal). Rather than inventing a field the source does
not print solely to drive a `requiredWhen`, each affected field's own
`description` discloses the exemption in prose — the same "disclosed rather
than falsely encoded" approach this registry's `at/bmi` cycle took for its
own four-way identity-proof branch.

**Disclosed scope decision — the declaration paragraph.** Pages 3-4 carry a
lengthy, multi-paragraph declaration (data-processing/VIS consent; awareness
that the visa fee is non-refundable; awareness of the travel-medical-
insurance requirement for a multiple-entry visa; the standard
accuracy/completeness declaration and its consequences; awareness that visa
possession alone does not guarantee entry) immediately before the single
signature line (field 37). The source presents this as one continuous prose
block with no per-statement checkbox of its own — unlike, say, a form with
one checkbox per acknowledgement — so it is paraphrased into a single
`documents[]` attestation entry's `statement`, not quoted verbatim (the full
text is long, multilingual, and includes legal citations) and not split
into invented per-statement boolean fields the source does not itself
provide.

**Photo requirement.** Page 1 carries a "PHOTO" placeholder box (top right)
with no accompanying AcroForm widget, consistent with the flat/print nature
of the whole specimen — modelled as a required `documents[]` entry
(`applicantPhoto`), matching this registry's precedent for other AT
identity/travel-document schemas.

## Mock conformance test run

Two scenarios were built under
`conformance/at/bmeia/schengen-visa-application/1.0.0/` and checked against
this schema's own `required`/`requiredWhen`/`visibleWhen`/`validation`/
`documents[]`/`exclusivityGroups`/`crossFieldValidation` grammar with a
disposable checker script (`/tmp/gov2135-at-visa/check_conformance.mjs`,
not committed — the same technique used for `at/bmi/national-identity-card-application`,
GOV-2121, extended to also evaluate `exclusivityGroups` and
`crossFieldValidation`, since this is the first `at/bmeia`/`at/bmi` cycle to
use either construct):

- **`application-packet-tourist-single-entry.json`**: Marina Alvarez, a
  Colombian tourist applying for a single-entry, 10-day Schengen visa,
  self-funded, no prior Schengen visa, no fingerprints previously
  collected, not a family member of an EU/EEA/CH citizen. **30 fields
  collected, 44 correctly not-applicable, 0 errors**; both required
  `documents[]` entries (`applicantPhoto`,
  `applicantOrRepresentativeSignature`) provided.
- **`application-packet-eu-family-member-multiple-entry.json`**: Yelena
  Petrova, a Bulgarian national resident in Switzerland (holding a Swiss
  residence permit), the spouse of a Swiss citizen (populating fields 34-35
  and correctly leaving the asterisked fields 19/20/31/32 blank per the
  disclosed exemption), applying for a multiple-entry, 30-day visa,
  sponsor-funded by her spouse (who also provides accommodation and covers
  all expenses), with a Schengen visa issued in the past three years and
  fingerprints previously collected. **44 fields collected, 30 correctly
  not-applicable, 0 errors**.
- **Eight mutation/negative controls**, each derived from a base scenario
  with exactly one defect introduced, and each correctly raised exactly one
  error (confirming the checker is not vacuously passing):
  1. Removing the required `surname` from scenario 1 → `missing-required`.
  2. Setting `durationOfIntendedStayDays` to `400` on scenario 1 (violates
     the `maximum: 365` bound) → `range-violation`.
  3. Setting `sex` to `"unspecified"` on scenario 1 (not in its 2-option
     `enum`) → `enum-violation`.
  4. Setting `maritalStatus` to `"other"` on scenario 1 while leaving
     `maritalStatusOtherDescription` unset → `requiredWhen` conditional-
     required violation.
  5. Removing the required `applicantPhoto` document from scenario 1 →
     `missing-required-document`.
  6. Removing the required `applicantOrRepresentativeSignature` document
     from scenario 1 → `missing-required-document`.
  7. On scenario 2, additionally setting `fundedByApplicant` to `true`
     (alongside the base scenario's `fundedBySponsor: true`) →
     `exclusivity-violation` on the `costOfTravelFundedBySelection` group —
     confirming the new `exclusivityGroups` construct actually fires.
  8. On scenario 1, setting `intendedDepartureDateFromSchengenArea` to a
     date before `intendedArrivalDateInSchengenArea` →
     `cross-field-violation` on the `departureNotBeforeArrival` rule —
     confirming the new `crossFieldValidation` construct actually fires.

The schema was also validated against the GovSchema v0.3 meta-schema with
`node tools/validate.mjs` and `node tools/validate-ajv.mjs` (both pass), and
against
`node tools/verify-sources.mjs registry/at/bmeia/schengen-visa-application/1.0.0`
(0 warnings, 3 URLs checked, 0 allowlisted, all clear).

## Pre-PR re-verification

Immediately before finalizing this record, the primary source PDF was
re-fetched live a second time in this same session, with a realistic
browser User-Agent: HTTP 200, `content-type: application/pdf`, exactly
285,208 bytes, **SHA-256-identical** to the first fetch
(`502e46f0b12a52b3f8af1ce9023bbd53b3a54d702e28a391bbcf1581894edf42`). The
authority URL was re-checked live and returns HTTP 200.
`node tools/verify-sources.mjs registry/at/bmeia/schengen-visa-application/1.0.0`
reports all clear (0 warnings) on this same re-verification pass.

## Path to a `verified` claim (next step)

To advance from `status: draft` to `status: verified`, a future reviewer
would: confirm with BMEIA or an Austrian mission whether any mission-level
variant (bilingual/trilingual, per-mission translations) has superseded
this central specimen, mirroring the companion-variant question already
open for `at/bmeia/passport-or-identity-card-application`; and consider
whether a second Schengen state's own hosted copy of the same Annex I
template is worth cross-checking byte-for-byte on the shared numbered
fields (expected to match exactly, since the template is EU-harmonised),
as an additional-source corroboration in the style of this registry's
`de/gewerbeamt` and `at/gewerbebehoerde` multi-edition cross-checks.

## Scope and jurisdiction notes

Gives Austria (GovSchema's 31st jurisdiction) its **5th of 6 verticals**
(Business Formation, Taxes, National ID, Passport, Visa); DMV remains a
confirmed weak/dead-end candidate from a prior cycle (in-person/counter-
driven Kfz-Zulassung, no downloadable specimen) — the last open item before
Austria could reach full 6/6 coverage would require a materially different
kind of source (e.g. a live administrative contact) than the PDF-forms
approach this registry's AT cycles have used so far.
