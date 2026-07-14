# Verification record — `mk/crm/prijava-za-upis-na-osnovanje-trgovec-poedinec` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-14`

This is a `GovSchema Standard Research` cycle (**GOV-2941**), following the
**GOV-2937** research cycle's pre-verification of this candidate. Advances
North Macedonia's Business Formation vertical. Of the three sibling issues
from the same GOV-2937 cycle, GOV-2940 (DMV) had already merged to `main`
by the time this document was authored, while GOV-2939 (Passport, PR open
pending its review gate) and GOV-2942 (National ID, still `in_progress`)
had not — so North Macedonia stands at **3 of 6** verticals (Taxes
GOV-2919, DMV GOV-2940, plus this document) once this PR lands, not the
"4/6" figure in this issue's own title, which assumed all four sibling
issues would complete first. See `CATALOG.md`'s own note on this for the
reconciliation process if the remaining siblings land in a different order
than assumed.

## Source re-verification (Phase 1)

- **Authority:** Централен регистар на Република Северна Македонија (ЦРРСМ
  / Central Registry of the Republic of North Macedonia, CRM) — the
  government body responsible for the Trade Register and the Register of
  Other Legal Entities.
- **Source page:** `https://www.crm.com.mk/mk/uslugi/izvrsham-upis-ili-zavrsham-obvrska/osnovaj-nov-subjekt/registratsija-na-subjekt-preku-registratsionen-agent`
- **PDF URL:** `https://www.crm.com.mk/CRMPublicPortalApi/api/files/1d35717c-e6e6-ea11-a82f-000d3a28d0e4?ln=1` (served as `Content-Disposition: attachment; filename=POe.pdf`)
- **Retrieved / reviewed:** 2026-07-14, independently re-fetched this cycle
  with `curl -sL --max-time 180` (a large file), not trusted from GOV-2937's
  scouting report as-is.
- **HTTP status:** `200`. **Content-Type:** `application/pdf`. **Size:**
  `19,571,140` bytes (~18.7 MiB) — matches the figure GOV-2937 recorded
  exactly. **sha256:**
  `89f02ea72ff080151b98926fcaf20464480b19c4361543fb03f83cae0c960633` —
  independently computed this cycle with `sha256sum` against a fresh
  download. No login/cookie/auth was required to download the blank form.
- **File type:** a genuine, large (11-page) PDF with a real XFA/LiveCycle-
  style AcroForm, `%PDF-1.7` magic bytes. Each page's own text layer is
  empty (the visible form is a rasterized/scanned background image), but
  every page carries real `Widget` annotations with genuine
  `fieldName`/`fieldValue`/`rect` data.
- **Extraction method:** `pdfjs-dist@3` (`legacy/build/pdf.js`,
  `getAnnotations()` per page, filtered to `subtype === "Widget"`), run
  from scratch this cycle against the freshly re-fetched PDF. Confirmed
  **11 pages** and **537 Widget annotations** — both exactly matching the
  issue's own pre-verification claim. Label correlation was done by
  rendering each page to a PNG at 2.2x scale via `pdfjs-dist` + `canvas`
  (same technique as this registry's established
  node-canvas+pdfjs precedent) and visually cross-referencing each widget's
  `rect` against the rendered page image, since the empty text layer rules
  out coordinate-to-text-content correlation (the technique used on
  genuinely text-layered forms elsewhere in this registry).

## Scoping decision (why 85 of 537 widgets)

The source PDF is CRM's **one universal founding-registration form**,
shared verbatim across every subject type the Trade Register and the
Register of Other Legal Entities record: sole trader (трговец-поединец),
ДООЕЛ/ДОО (LLC-equivalents), joint-stock and partnership forms, foreign-
subject branches, and institutions/funds/cooperatives under the other-
legal-entities register. Per this issue's own scoping guidance (mirroring
`si/ajpes/prijava-za-vpis-v-poslovni-register-sole-proprietor`'s precedent,
GOV-2910), this v1.0.0 scopes to the single most citizen-relevant path: a
natural person registering as a **sole trader (трговец-поединец)** — the
simplest single-founder route the form supports, requiring no share
capital, no separate management/supervisory body, and no co-founders,
since the trader represents the registrant personally.

### Document structure (11 pages)

| Page | Content | In scope? |
|---|---|---|
| 1 | §1 Подносител (submitter), §2.1/§2.2 entity-type checkboxes, §3 Firma, §4 abbreviated name, §5 founding act/duration, §6 registered seat | **Partially** — §1, §3-§6, and only the "Трговец-поединец" checkbox of §2.1 |
| 2 | §7 Основна главнина (share capital), §8 Основачи (founders) | **No** — capital/founders structure doesn't exist for a sole trader |
| 3 | §9.1 representation body (trade register), §9.2 representation body (other-legal-entities register) | **Partially** — only the sole trader's own self-representation block of §9.1 |
| 4 | §10 Предмет на работење (activities table), §11 foreign trade, §12 area of operation | **Partially** — §10 (first 5 of 18 rows), §11; not §12 |
| 5 | §13 Прокурист (procurator), §14 Подружница (branch) | **No** — optional extras, deferred |
| 6 | §15 predominant activity, §16 bank, §17 voluntary VAT registration, §18 other contact data, attachments checklist, decision-delivery method, applicant/signature block | **Partially** — all of §15-§18 and the delivery/applicant/signature blocks; a sole-trader-relevant subset of the attachments checklist |
| 7 | "УПАТСТВО" (filling instructions) | N/A — 0 widgets |
| 8 | "ДОПОЛНИТЕЛНА СТРАНА ЗА ОСНОВАЧИ" (additional founders page) | **No** — continuation page for §8, out of scope since §8 itself is out of scope |
| 9 | "ДОПОЛНИТЕЛНА СТРАНА ЗА ОРГАН НА ЗАСТАПУВАЊЕ..." (additional representation-body page) | **No** — continuation page for §9, capped |
| 10 | "ДОПОЛНИТЕЛНА СТРАНА ЗА ПРЕДМЕТ НА РАБОТЕЊЕ" (additional activities page) | **No** — continuation page for §10, capped |
| 11 | "ДОПОЛНИТЕЛНА СТРАНА ЗА ПРОКУРИСТИ И ПОДРУЖНИЦИ" (additional procurator/branch page) | **No** — continuation page for §13/§14, out of scope |

## Field inventory (Phase 2) — 85-of-537 widget reconciliation

All 85 `fields[]` entries and their exact source-form section/label
reference are listed inline in `schema.json`'s own `sourceRef` per field —
a strict 1:1 correspondence (no widget maps to more than one field, and no
field is backed by more than one widget, unlike e.g.
`si/mzez/vloga-za-pridobitev-osebne-izkaznice`'s multi-widget fields).

### Per-page included/excluded widget tally

| Page | Total widgets | Included in `fields[]` | Excluded (category) |
|---|---:|---:|---|
| 1 | 45 | 27 | 18 — §2.1's other 7 entity-type checkboxes + free text (9), all of §2.2 (7 checkboxes + free text, 9) |
| 2 | 78 | 0 | 78 — §7 share capital, §8 founders (both entity types with equity structure, N/A) |
| 3 | 55 | 16 | 39 — §9.1's other 6 representation-body roles + 5 "Својство" board-capacity checkboxes + "Правно лице" toggle + its free text (13), all of §9.2 (26) |
| 4 | 42 | 13 | 29 — §10 rows 6-18 (13 rows × 2 = 26), §12 (1), continuation-page flag + page-number field (2) |
| 5 | 37 | 0 | 37 — §13 Прокурист, §14 Подружница (optional extras, deferred) |
| 6 | 55 | 29 | 26 — 1 unlabeled/blank multiline widget, 2 company-governance-specific attachment checkboxes (Доказ за уплатена основна главница, Статут), the entire company-governance right column of the attachments checklist (14 checkboxes + 5 "Друго" text fields), 2 of the left column's 4 "Друго" slots (capped) |
| 7 | 0 | 0 | N/A — instructions page, no widgets |
| 8 | 88 | 0 | 88 — continuation page for §8 (out of scope) |
| 9 | 56 | 0 | 56 — continuation page for §9 (capped to the main page's single self-representation block) |
| 10 | 45 | 0 | 45 — continuation page for §10 (capped to the main page's first 5 rows) |
| 11 | 36 | 0 | 36 — continuation page for §13/§14 (out of scope) |
| **Total** | **537** | **85** | **452** |

### Included-field summary by section

| Section | Representative fields | Modelled scope |
|---|---|---|
| §1 Подносител | `submitterSurname`, `submitterEmbg`, `submitterStreet`..`submitterCountry`, `submitterIsAuthorizedPerson`/`submitterIsProxy`/`submitterIsOtherCapacity` | Full |
| §2.1 (entity type) | `isSoleTrader` | 1 of 9 checkboxes — fixed `true` for this schema's scope |
| §3-§6 | `businessName`, `abbreviatedName`, `foundingActDescription`, `durationUnlimited`/`durationLimited`/`durationLimitedUntilText`, `seatMunicipality`..`seatApartment` | Full |
| §9.1 (self-representation) | `representativeIsSoleTrader`, `representativeIsIndividual`, `representativeEmbg`, `representativeSurname`..`representativeCountry`, `representationAuthorizationUnlimited`/`Limited`/`LimitationText` | 2 of 8 role checkboxes (fixed `true`) + full identity/address/authorization block |
| §10-§11 (activities) | `allActivitiesPerNKD`, `activityCode1..5`/`activityName1..5`, `willConductForeignTrade`, `foreignTradeActivitiesDescription` | Bounded 5-of-18-row subset (see judgment call 2) |
| §15-§18 | `predominantActivityCode`/`Name`, `bankName`, `voluntaryVatRegistrationYes`/`No`, `contactPhone`/`Fax`/`website`/`email` | Full |
| Attachments checklist | `attachmentZPForm`, `attachmentDeclarationArt29ZTD`, `attachmentDeclarationNoActivityBan`, `attachmentFoundingAct`, `attachmentPermit`, `attachmentProofOfOwnership`, `attachmentIdDocumentCopy`, `attachmentApprovalFromCompetentAuthority`, `attachmentOther1`/`Text`, `attachmentOther2`/`Text` | Sole-trader-relevant subset (see judgment call 3) |
| Decision delivery | `deliveryInPerson`, `deliveryByPost`, `deliveryPostalAddress` | Full |
| Applicant/signature | `applicantEmbg`, `applicantSurname`, `applicantGivenName`, `signaturePlace`, `signatureDate`, `documents[].applicantSignature` | Full |

Total: **85 `fields[]`** entries (23 `required: true`, 62 `required: false`
some of which carry `requiredWhen`), **1 `documents[]`** entry, and **5
`exclusivityGroups`** entries. No `crossFieldValidation` rules were needed
beyond what `requiredWhen` already expresses.

## Access notes and judgment calls

1. **The empty per-page text layer required a visual, not coordinate-to-
   text, label-correlation method.** Every one of the source form's 11
   pages renders its printed labels and borders as part of a rasterized
   background image rather than as extractable PDF text (confirmed by an
   exhaustive `getTextContent()` dump per page returning no items), while
   the fillable widgets themselves are genuine, separately positioned
   `Widget` annotations. Each in-scope page was rendered to a PNG at 2.2x
   scale (`pdfjs-dist` + `node-canvas`) and every included widget's `rect`
   was matched by eye against the rendered page, then cross-checked by
   re-deriving each visual row's field order from `rect` y/x coordinates
   sorted into bands (tolerance ±6pt) — not a single-pass guess.
2. **The activities table (§10) is modelled as a bounded 5-of-18-row
   subset, not the form's own full capacity**, unlike
   `si/ajpes/prijava-za-vpis-v-poslovni-register-sole-proprietor`'s
   unbounded 5-row table (that form's own full printed capacity). This
   registry's own `mk/ujp/danochna-prijava-na-danokot-na-dodadena-vrednost`
   precedent (GOV-2919) already established a 5-of-21-row cap rationale for
   a genuinely large repeating schedule on a Macedonian government form;
   the same rationale applies here — 18 rows (36 counting the page 10
   continuation) is far beyond what the realistic common case needs (most
   sole traders register 1-3 activity codes), and a filer needing more than
   5 can still use the paper form's own continuation-page mechanism
   (out of scope for this schema, not lost as data). The dedicated,
   always-required `predominantActivityCode`/`predominantActivityName`
   pair (§15) is a separate, single-value field on the source form, not
   part of this bounded table, and is modelled without a cap.
3. **The attachments checklist is scoped to sole-trader-relevant document
   types, excluding company-governance-specific items entirely, rather
   than modelled as a flat 1:1 checklist.** The source form's own printed
   checklist mixes items relevant to any subject type (ЗП Образец,
   declarations under ЗТД чл.29, identity-document photocopy, permits,
   proof of ownership, approvals) with items that only make sense for
   subject types with governance bodies the sole trader path doesn't have:
   "Доказ за уплатена основна главница" (proof of paid-in share capital),
   "Статут" (statute), and the entire right column (Изјава согласно член
   32 од ЗТД, Извештај од проценувач, four board/manager-election
   decisions, "Доказ за уплатен надоместок", "Записник од Собрание" —
   all company-governance documents). These are excluded as genuinely N/A
   to a sole trader, not merely deferred. The remaining left-column
   "Друго" free-text slots are capped at 2 of the form's own 4 (same
   bounded-subset rationale as judgment call 2); the right column's 5
   "Друго" slots are excluded entirely along with the rest of that column.
4. **`isSoleTrader`, `representativeIsSoleTrader`, and
   `representativeIsIndividual` are modelled as `required: true` booleans
   with no formal `const`/`enum` enforcement of `true`**, since
   `spec/v0.3`'s `nonFileValidation` keyword set has no `const` keyword for
   booleans. Each field's own `description` discloses that it is fixed to
   `true` for this schema's declared scope — the same category of
   disclosure this registry uses whenever a schema's scope, not the source
   form's own structure, fixes a value (e.g. a single-purpose variant of a
   shared form).
5. **The one unlabeled, blank multiline widget on page 6** (a full-width
   text field sitting in visually empty whitespace between the §18 "Други
   податоци" contact rows and the "Кон пријавата за упис приложувам:"
   attachments heading, confirmed by cropping and re-rendering that exact
   region) **is excluded rather than assigned an invented purpose.** No
   caption, border, or nearby label suggests any function for it; it is
   most plausibly an unused layout/spacing artifact in the underlying
   XFA template.
6. **EMBG (Единствен матичен број на граѓанин) is modelled as a flat
   13-digit `pattern` string on `submitterEmbg`, `representativeEmbg`, and
   `applicantEmbg`**, even though only the applicant's own widget
   (`TextField8[31]`, page 6) carries an explicit AcroForm `maxLen: 13` —
   the submitter's and representative's equivalent widgets
   (`TextField8[0]`, `TextField8[27]`) report `maxLen: 0` (no length cap
   set in the PDF itself). All three are captioned identically ("ЕМБГ") and
   represent the same well-documented former-Yugoslav 13-digit unique
   citizen number format; the same `^[0-9]{13}$` pattern is applied to all
   three for consistency with the real-world data format, rather than
   reproducing the source PDF's own internal inconsistency.
7. **§12 "Подрачје на дејствување" is excluded per the form's own printed
   footnote**, not an inferred judgment call: the page's own asterisked
   note reads "* (Се однесува на субјекти на упис од точка 2.2)" (applies
   to subjects registered under point 2.2), and a sole trader is
   registered under §2.1, not §2.2 — a directly first-party-sourced
   exclusion.
8. **No shared/reusable "address" field-type exists in `spec/v0.3`** — the
   submitter, representative, and registered-seat addresses are each
   modelled as their own flat string fields (`*Street`/`*StreetNumber`/
   `*Entrance`/`*Apartment`/`*Place`/`*Municipality`/`*Country`),
   consistent with this registry's established convention for parallel
   address blocks (e.g. `hr/portor`'s `owner*`/`business*` prefixes,
   `si/ajpes`'s per-role address fields).
9. **`authority`.** CRM (Централен регистар на Република Северна
   Македонија) is modelled without an `operatedBy` sub-object, following
   this registry's majority convention for a standalone competent body.
   CRM's own governing framework is the Закон за трговските друштва (ЗТД,
   Law on Trade Companies) and the Закон за еднoшалтерски систем и за
   водење на трговски регистар и регистар на други правни лица (Law on
   the One-Stop-Shop System and Trade Register) — cited by the source
   form's own attachment-checklist item "Изјава согласно член 29/32 од
   ЗТД".

## Test run (Phase 3)

No live CRM e-filing/submission was attempted: CRM's own submission channel
requires a qualified digital certificate (out of scope per the issue's own
framing — only the blank-form download needed to be gate-free), and
submitting fabricated applicant/registrant data against a live North
Macedonian government registry is not a safe or reversible action.

Instead, this document's own structural validity was confirmed with this
registry's standard tooling:

```
$ node tools/validate.mjs registry/mk/crm/prijava-za-upis-na-osnovanje-trgovec-poedinec/1.0.0/schema.json
ok   registry/mk/crm/prijava-za-upis-na-osnovanje-trgovec-poedinec/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/mk/crm/prijava-za-upis-na-osnovanje-trgovec-poedinec/1.0.0/schema.json
ok   registry/mk/crm/prijava-za-upis-na-osnovanje-trgovec-poedinec/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

Mock conformance fixtures were built against `schema.json` and committed
under `conformance/mk/crm/prijava-za-upis-na-osnovanje-trgovec-poedinec/1.0.0/`,
following this registry's current flat `valid-*.json`/`mutation-control-
*.json` naming convention:

- `valid-minimal-required-only.json` — a sole trader registering with only
  the statically `required: true` fields populated (no activities beyond
  the predominant one, no attachments, unlimited duration, in-person
  decision delivery). **0 errors.**
- `valid-full-with-limited-duration-and-foreign-trade.json` — a sole trader
  with a limited (fixed-term) duration, two listed activities in addition
  to the predominant one, a foreign-trade declaration, one "other"
  attachment, and postal decision delivery — exercising every
  `requiredWhen` gate's *true* branch at once. **0 errors.**

Five mutation-control fixtures, each a single deliberate violation of the
first valid fixture, each raising **exactly 1 error**:

- `mutation-control-missing-static-required-business-name.json` — removes
  `businessName` (plain `required: true`) → 1 error.
- `mutation-control-invalid-pattern-embg.json` — sets `applicantEmbg` to a
  9-digit string → 1 error (13-digit pattern violation).
- `mutation-control-missing-conditional-duration-limited-until.json` — sets
  `durationLimited` to `true` without adding `durationLimitedUntilText` →
  1 error (conditional `requiredWhen` violation).
- `mutation-control-exclusivity-group-violation-vat.json` — sets both
  `voluntaryVatRegistrationYes` and `voluntaryVatRegistrationNo` to `true`
  → 1 error (`exclusivityGroups` violation).
- `mutation-control-missing-conditional-attachment-other-text.json` — sets
  `attachmentOther1` to `true` without adding `attachmentOther1Text` → 1
  error (conditional `requiredWhen` violation).

Each fixture's `fields`/expected-error claim was hand-evaluated against
`schema.json`'s own `required`/`requiredWhen`/`validation`/
`exclusivityGroups` rules (no shared `tools/conformance-runner.mjs` exists
yet in this repo, consistent with this registry's established practice of
disclosing that gap rather than writing bespoke throwaway tooling per
schema).

A full-registry run after regenerating
`tools/govschema-client/registry-index.json` (via `npm run build-index`)
confirms no regression — see the PR description for the before/after
document counts, since North Macedonia's sibling GOV-2939/GOV-2940/GOV-2942
issues may land concurrently and change the exact total between when this
file was written and when the PR is merged.
