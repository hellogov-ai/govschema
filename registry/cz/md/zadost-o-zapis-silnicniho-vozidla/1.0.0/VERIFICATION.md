# Verification record — `cz/md/zadost-o-zapis-silnicniho-vozidla` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-08`

This document was derived from a direct, unauthenticated fetch of the
Ministerstvo dopravy's (MD, Ministry of Transport) own published PDF, whose
AcroForm field layer was extracted programmatically and cross-checked against
a rendered image of both pages. It remains `draft`, not `verified`, pending
an independent second reviewer's field-by-field pass.

## Why this document exists

[GOV-1804](../../../../../CATALOG.md) is GovSchema's recurring standards
-research cycle. Its most recent prior run
([GOV-1807](../../jednotny-registracni-formular-fyzicka-osoba/1.0.0/VERIFICATION.md))
opened the Czech Republic as the registry's 26th jurisdiction with a single
Business Formation schema (`cz/mpo/jednotny-registracni-formular-fyzicka-osoba`),
leaving the Czech Republic's other five verticals (Passport, DMV, Taxes,
Visa, National ID) as open, unscreened backlog. This cycle picks up DMV,
following this registry's own established pattern of building out a
newly-opened jurisdiction's remaining verticals before screening a further
new jurisdiction (the same sequencing `my/jpj` → `my/jim` (Passport) →
`my/jim` (Visa) used for Malaysia).

## Source examined

- **URL:** `https://md.gov.cz/getattachment/Dokumenty/Silnicni-doprava/Elektronicke-formulare-(1)/Elektronicke-formulare/Zadost-o-zapis-silnicniho-vozidla-do-registru-silnicnich-vozidel-(1).pdf.aspx?lang=cs-CZ`
- **Retrieved:** 2026-07-08, HTTP 200, no login/CAPTCHA/WAF gate.
- **Format:** genuine `%PDF-1.6`, 683,153 bytes, linearized, 2 pages.
- Found via MD's own "Formuláře registru silničních vozidel" index page
  (`md.gov.cz/Dokumenty/Silnicni-doprava/Elektronicke-formulare`), which
  links this exact file as the current registration-application form.
- Candidates not pursued this cycle: MD's own site also links a companion
  "Přihláška k registraci vozidla" form on the third-party
  `registr-vozidel.cz` mirror and a "(4)"-suffixed near-duplicate PDF on
  `md.gov.cz` itself; both appeared in the same search results as the file
  used here but were not independently diffed against it — a possible
  further-vertical/edition-variant check for a future cycle, not pursued
  here since the "(1)"-suffixed file used is directly, currently linked from
  MD's own index and matches the same registr-vozidel process this
  document's title claims to cover.

## Extraction method

1. Fetched the PDF directly (`curl`, no auth/cookies needed).
2. Extracted every AcroForm field two independent ways and cross-checked the
   counts: `pdfjs-dist`'s per-page `page.getAnnotations()` (57 Widget
   annotations across 2 pages: 21 on p.1, 36 on p.2) and a separate
   `pdf-lib` `form.getFields()` pass (57 fields). The two techniques agree
   exactly, so — unlike GOV-1801's `pt/mne` PDF — this document's AcroForm
   field tree carries no orphaned/duplicate Widgets to reconcile.
3. Extracted each page's text content with `pdfjs-dist`'s `getTextContent()`,
   re-sorted by descending y then ascending x (not linear read order) to
   recover the form's true multi-column reading order, and matched each
   field's widget rectangle against the nearest printed label by position.
4. Rendered both pages to PNG with `pdfjs-dist` + `node-canvas` at 2.5x scale
   and visually inspected the rendered image wherever the rect/label
   matching in step 3 left more than one plausible reading — see Judgment
   calls below for the specific cases this resolved.
5. Where a field's role was still ambiguous after steps 3–4, inspected the
   field's own raw PDF dictionary (`Ff`, `MaxLen`) via `pdf-lib` — this is
   what distinguished the two adjoining rodné-číslo comb boxes (see below).

## Judgment calls

1. **The rodné-číslo/IČO row's three widgets are two logical values, not
   three.** Section A's identity row visually renders as what looks like a
   single unbroken 10-cell comb grid immediately followed by a second comb
   grid (confirmed by rendering the page to an image), but the AcroForm
   layer actually defines three separate fields there: `comb_3` (`MaxLen:
   6`), an unlabelled field pdfjs reports as `undefined` (`MaxLen: 4`), and
   `comb_5` (`MaxLen: 8`). `6 + 4 = 10` matches the Czech rodné číslo's own
   `RRMMDD/XXXX` format (6-digit birth-date prefix, up to 4-digit suffix)
   printed with no visible divider between the two boxes, which is why they
   render as one continuous grid; `comb_5`'s separate 8-digit box is the
   IČO alternative the row's own printed footnote describes. This document
   therefore models the first two widgets as a single logical
   `ownerPersonalIdNumber` field (pattern `^[0-9]{8,10}$`, permissive enough
   for both the 10-digit rodné-číslo case and the form's own fallback
   8-digit `DDMMRRRR` date-of-birth case) and the third as the separate
   `ownerIdentificationNumber`. The same reasoning applies to Section B's
   mirror-image `comb_6`/`undefined_2`/`comb_8` triple
   (`operatorPersonalIdNumber` / `operatorIdentificationNumber`).
2. **Section B's operator-name field spans two form fields (`fill_3`,
   `fill_6`) for one logical value.** Rendering the page showed no visible
   line or box under either the Section A or Section B name label at all
   (both are blank free-write areas) — but Section B's identical label text
   ("jméno, popřípadě jména a příjmení...") is followed by two separate
   blank field rows where Section A's copy of the same label has only one,
   evidently to leave room for a longer registered business name. Modelled
   as a single `operatorName` field, consistent with this registry's
   practice of modelling one printed value as one schema field even when
   the source form gives it extra visual room (e.g. this registry's own
   `cz/mpo/jednotny-registracni-formular-fyzicka-osoba` treats a
   two-line-wrapped label the same way).
3. **`comb_1` (top of p.1, "registrační značka (vyplní úřad)") is excluded**
   — its own printed label states the issuing office, not the applicant,
   completes it. Its 7-character `MaxLen` matches the standard Czech
   registration-mark length, confirming it is a real plate-number box, just
   one the applicant never fills in.
4. **`RZ` (p.1, plain "registrační značka" with no "(vyplní úřad)"
   qualifier) is modelled as an applicant field, `existingRegistrationNumber`.**
   Positioned beside the rodné-číslo footnote and before the required
   -documents list, with an 8-character `MaxLen`, it reads as the vehicle's
   pre-existing Czech plate number for a re-registration (as opposed to a
   first-time registration) — distinct from the office-only `comb_1` box.
5. **Out of scope — every field structurally inside "G. Potvrzení o
   převzetí dokladů žadatelem (nabytí právní moci)"** (p.2): the returned
   -document tabulation (plate/technical-certificate/registration
   -certificate numbers), "Jiné doklady", and both the applicant's and the
   "oprávněné úřední osoby" (authorized official's) signature/stamp lines.
   This section's own heading states it confirms the applicant *receiving
   back* processed documents once the registration has already acquired
   legal force — an office-completed post-approval receipt, not
   application-time applicant input, the same class of exclusion this
   registry documented for `ca/esdc/social-insurance-number-application`'s
   "for office use only" sections.
6. **Out of scope — the administrative-fee acknowledgment block** (p.2,
   "Správní poplatek ... Kč podle položky ... byl uhrazen v hotovosti.
   Doklad č. ..." plus its adjoining "podpis oprávněné úřední osoby" line).
   Sitting between Section F and the G heading with no section letter of
   its own, its own printed text ("was paid in cash. Receipt No. ...",
   confirmed by the issuing official's own signature) describes a
   counter-side payment receipt completed by MD/municipal staff at
   submission time, not applicant-declared data — excluded on the same
   basis as judgment call 5.
7. **The 10 vehicle-color checkboxes and the 4 vehicle-purpose checkboxes
   are each modelled as independent boolean fields joined by an
   `exclusivityGroups` entry, not collapsed into a single enum field.** The
   AcroForm layer defines each checkbox as its own independently-named
   `/Btn` field (`Check Box13`–`Check Box22` for color;
   `vozidlo taxislužby`/`toggle_2`/`toggle_3`/`vozidlo obecného užití` for
   purpose) rather than a single radio-button field with shared export
   values, so modelling each PDF widget as its own schema field is the more
   source-faithful choice; `exclusivityGroups` (GSP-0013 §5) then captures
   the real-world single-selection intent (a vehicle has one color, and at
   most one special-use declaration) without fabricating a constraint the
   source form's own field structure does not literally impose. This
   mirrors the existing `cl/sii/aviso-venta-vehiculo` precedent for a
   same-shaped checkbox group.
8. **`vehicleNotes` collapses four identical blank lines into one
   multi-line field.** The source form prints four consecutive dotted lines
   under "Poznámky (Zvláštní výbava a zařízení, povolené výjimky apod.)"
   with no sub-labels distinguishing them — one logical free-text value
   given four lines of writing room, modelled the same way as judgment call
   2's `operatorName`.
9. **The pre-Část-D "surrendering old plates/certificate" declaration**
   (`surrenderedPlateNumber`, `surrenderedPlateCount`,
   `surrenderedRegistrationCertificateSeries`,
   `surrenderedRegistrationCertificateNumber`) carries no `requiredWhen`
   gate. The source form provides no boolean field signalling "this
   application surrenders a prior registration," so — consistent with this
   registry's established practice of never fabricating a synthetic toggle
   the source itself does not print (see
   `cz/mpo/jednotny-registracni-formular-fyzicka-osoba`'s own judgment call
   3) — these four fields are left plain optional.
10. **`documents[]` required/optional split follows Část C's own printed
    conditions.** Two of the nine listed attachments carry no stated
    condition in the source text (`technicalFitnessDocument`,
    `thirdPartyLiabilityInsuranceDocument`) and are modelled `required:
    true`; the remaining seven are each conditioned on a fact this schema's
    field set cannot reliably gate on (e.g. "unless the vehicle is new,"
    "if identity is being verified") and are modelled `required: false`
    with the condition stated in each document's own `label`, the same
    convention this registry used for
    `cz/mpo/jednotny-registracni-formular-fyzicka-osoba`'s own
    `documents[]` entries.
11. **`jurisdiction.level` is `national`, not `subnational`,** even though
    filing itself happens at the applicant's locally competent obecní úřad
    obce s rozšířenou působností — the form and the register it feeds are
    both nationally standardized and MD-published, the same classification
    this registry already applies to
    `cz/mpo/jednotny-registracni-formular-fyzicka-osoba` (filed with a local
    živnostenský úřad but modelled as national).

## Test run (Phase 3)

No live submission was attempted: filing this application creates a real
vehicle-registration record (and, where Část B/existing-plate fields are
used, a real ownership/operator change) with a Czech municipal authority —
fabricating applicant/vehicle records against a live government register is
not a safe or reversible action, consistent with this registry's practice
for every comparable registration-type schema.

Both meta-schema validators were run against the finished document and pass
clean:

```
$ node tools/validate.mjs registry/cz/md/zadost-o-zapis-silnicniho-vozidla/1.0.0/schema.json
ok   registry/cz/md/zadost-o-zapis-silnicniho-vozidla/1.0.0/schema.json

1/1 document(s) passed.

$ node tools/validate-ajv.mjs registry/cz/md/zadost-o-zapis-silnicniho-vozidla/1.0.0/schema.json
ok   registry/cz/md/zadost-o-zapis-silnicniho-vozidla/1.0.0/schema.json [v0.3]

1/1 document(s) validated against the meta-schema (ajv 2020-12).
```

A hand-written structural self-check (field-name uniqueness, no
`required`+`requiredWhen` conflicts, every `exclusivityGroups` field name
resolving to a real boolean field, every `documents[]` id unique) was also
run against the generated document before submission and reported zero
issues.
