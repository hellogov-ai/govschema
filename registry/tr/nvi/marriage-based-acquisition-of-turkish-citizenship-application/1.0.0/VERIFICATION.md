# Verification record — tr/nvi/marriage-based-acquisition-of-turkish-citizenship-application@1.0.0

## Candidate selection

GOV-4832 ("GovSchema Standard Research"). The GOV-4818 cycle opened
Türkiye as the registry's 100th jurisdiction via Form Vat-3 (general
acquisition of citizenship), confirming all five other verticals as dead
ends and banking the remaining VAT-1/2/4-11 forms on
`nvi.gov.tr/vatandaslik-ile-ilgili-formlar` as future National ID & Civic
Documents companion-schema candidates. GOV-4825 subsequently authored
VAT-9 (renunciation). This cycle re-scanned that same page fresh, fetched
and field-counted all nine still-unauthored forms (VAT-1, VAT-2, VAT-4,
VAT-5, VAT-6, VAT-7, VAT-8, VAT-10, VAT-11) via `pdfjs-dist`'s
`getAnnotations()`, and selected **VAT-6** — "Acquisition of Turkish
Citizenship Through Marriage" — as the strongest remaining candidate: a
single-page, 86-widget AcroForm covering one of the most common real-world
citizenship pathways (a foreign national married to a Turkish citizen),
structurally distinct from both already-authored siblings (VAT-3's
marital-status-gated spouse block vs. this form's always-present spouse
section; VAT-9's renunciation direction vs. this form's acquisition
direction).

## Reaching the live source

- **Form Vat-6**:
  `https://www.nvi.gov.tr/kurumlar/nvi.gov.tr/mevzuat/nufusmevzuat/Formlar/Vatandaslik/Vat6_Evlenme.pdf`
  — confirmed live directly from NVI's own current
  `nvi.gov.tr/vatandaslik-ile-ilgili-formlar` listing page (`href` scraped
  fresh this cycle), HTTP 200, `Content-Type: application/pdf`,
  `Content-Length: 1340678` bytes (matches the downloaded file exactly),
  sha256 `e62a7748c75bef9c6f4c07258147c0e05bf93d80e7f6d501692823bc8e50797c`,
  `Last-Modified: Tue, 04 Aug 2020 08:33:50 GMT`, no login/CAPTCHA gate.
  Retrieved 2026-07-25.
- Field structure extracted with `pdfjs-dist`'s `getAnnotations()` (86
  AcroForm widgets on a single page, 85 unique field names — the
  `Cinsiyet` radio-button pair shares one field name across its two
  widgets). Every widget's `rect` was additionally rendered at scale 2.2
  via `node-canvas` and visually cross-checked against the printed table
  headers, since the source reuses ambiguous numeric suffixes across
  distinct sections (e.g. `Ad_1`/`Soyad_1` for the applicant's foreign
  name vs. `Ad_11`/`Soyad_11` for the same applicant's Turkish-script
  name; `Ad_3`/`Ad_33` for a child's foreign vs. Turkish-script given
  name) — every field was resolved to the label its rendered position
  sits directly beneath, not inferred from suffix pattern alone.
- Legal basis: Law No. 5901 on Turkish Citizenship (Türk Vatandaşlığı
  Kanunu), Article 16 — the form's own closing declaration cites this
  article by number ("5901 sayılı Türk Vatandaşlığı Kanununun 16'ncı
  maddesine göre evlenme yoluyla Türk vatandaşlığını kazanmak
  istiyorum").

## Findings / disclosed scoping calls

1. **Every one of the 86 widgets reconciles cleanly to 68 logical
   `fields[]`** — the reduction is entirely accounted for by composite
   day/month/year boxes collapsing to a single `date` field
   (`dateOfBirth`, `marriageDate`, `spouseDateOfBirth`,
   `child{1,2,3}DateOfBirth`, `declarationDate` — 6 dates × 3 widgets each
   = 18 widgets → 6 fields), the applicant's own split area-code/subscriber
   phone boxes and split local-part/domain email boxes each collapsing to
   one field (4 widgets → 2 fields), and the `Cinsiyet` radio pair
   collapsing to one `sex` field (2 widgets → 1 field). Verified
   programmatically: 29 applicant-block widgets → 24 fields, 14
   spouse-block widgets → 10 fields, 39 children-table widgets (13 × 3) →
   33 fields, 3 declaration-date widgets → 1 field, plus the excluded
   1-widget signature line — 86 widgets in, 68 `fields[]` + 1 excluded
   widget out.
2. **A dedicated, always-required Turkish-citizen-spouse block**
   (`spouseIdentityNumber` through `spouseEducationLevel`), unlike Vat-3's
   conditionally-`requiredWhen`-gated spouse fields — this form's very
   premise is marriage to a Turkish citizen, so the source carries no
   marital-status branching at all; the spouse section is unconditionally
   present on the form (`TÜRK VATANDAŞI EŞE AİT BİLGİLER` — "Information
   About the Turkish Citizen Spouse"). `spouseIdentityNumber` uses the
   genuine 11-digit `T.C. Kimlik No` pattern (`^[1-9][0-9]{10}$`), the
   same pattern Vat-9's `identityNumber` uses for its own
   already-a-citizen applicant.
3. **`submittedToOffice`/`submittedToOfficeType` split**, following Vat-9's
   precedent rather than Vat-3's single `submittedToGovernorate` — Vat-6's
   own salutation-line dropdown widget (`Makam`) offers the same two
   mutually exclusive destinations, `VALİLİĞİNE` (Governorship, domestic)
   and `BAŞKONSOLOSLUĞUNA` (Consulate General, abroad), reflecting that a
   foreign spouse may be filing from outside Türkiye.
4. **`useMaidenNameWithMarriedSurname`/`maidenName`** reuses Vat-3's exact
   pair (a `boolean` checkbox gating a `requiredWhen`-conditional maiden-
   surname text field) — Vat-6 poses the identical question
   ("Evlilik Soyadı ile birlikte Bekârlık Soyadı kullanılacak mı?") with
   the same single-checkbox-beside-a-text-box layout.
5. **The 3-column minor-children table has 11 fields per child**, one
   fewer than Vat-3's 12 — Vat-6's table provides only a single
   `Türkçe Adı` (Turkish-script given name) row and has **no** separate
   `Alacağı Soyadı` ("surname to be acquired") row that Vat-3's own
   children table carries; confirmed both from the visual render (the
   printed row labels stop at `Türkçe Adı` before `Anne Adı`) and from the
   annotation dump (no `Soyad_33`/`Soyad_44`/`Soyad_55` widgets exist,
   only `Ad_33`/`Ad_44`/`Ad_55`). Modelled as the same bounded-slot
   `child1`/`child2`/`child3` precedent (all fields optional, per the same
   reasoning as Vat-3 and Vat-9).
6. **The Turkish spouse's own block has no `Uyruğu` (nationality) row** —
   confirmed by both the visual render and the absence of a `Uyruk_2`
   widget in the annotation dump, consistent with the spouse being a
   Turkish citizen by definition on this form.
7. **`hasPriorCriminalConviction`/`hasPendingProsecution`** reuse Vat-3's
   exact enum fields and labels verbatim — the same "Evet-Hayır" (Yes/No)
   question pair appears in the same position on this form.
8. **`phoneNumber` and `emailAddress` each collapse a visually-split pair
   of input boxes into one field**, matching Vat-3's and Vat-9's own
   precedent — the source prints a parenthetical area-code box before the
   phone number and splits the email box around a fixed, non-editable "@"
   glyph.
9. **`educationLevel`, `occupation`, and `religion` are left optional**
   for the applicant (no explicit required marker on the form for these
   three, matching Vat-3's and Vat-9's treatment of the identical
   fields), while the equivalent `spouseOccupation`/`spouseEducationLevel`
   are likewise left optional. All other applicant- and spouse-block
   fields are `required: true`, since the form itself provides no
   required/optional marker convention anywhere (same disclosed judgment
   call as both sibling schemas) and these particular fields are the ones
   Vat-3/Vat-9 already established as non-essential biographic detail.
10. **Out of scope**: the header's office-completed `Kayıt Tarihi`/
    `Kayıt No` (registration date/number), the biometric-photograph box,
    and the closing `Ad Soyad`/`İmza` (printed name/signature) line — the
    same widget (`Başvuran Ad`) that both Vat-3 and Vat-9 exclude for
    their own equivalent line. `declarationDate` (the date accompanying
    the signature) is kept in scope as applicant-provided data, distinct
    from the signature mark itself.
11. This closes one of the nine remaining GOV-4818-banked VAT candidates.
    VAT-1, VAT-2, VAT-4, VAT-5, VAT-7, VAT-8, VAT-10, and VAT-11 remain
    open, unscreened backlog candidates on the same NVI page for a future
    companion-schema cycle. Türkiye remains 1 of 6 verticals open
    (National ID & Civic Documents) — this is a third schema within that
    already-open vertical, not a new vertical or jurisdiction.

## Conformance

2 valid mock scenarios — `valid-minimal-no-children-governorate` (the 29
unconditionally-required fields only, no children, filed domestically
with a Governorate, maiden name not used) and
`valid-consulate-general-with-three-children` (filed with a Consulate
General abroad, maiden name in use, every optional field populated, all 3
children columns fully filled) — plus 29 static-`required`-field mutation
fixtures (one per required field), 1 `requiredWhen` mutation
(`maidenName` omitted while `useMaidenNameWithMarriedSurname` is `true`),
and 1 unknown-field-rejected fixture — 33 fixtures total, committed under
`conformance/tr/nvi/marriage-based-acquisition-of-turkish-citizenship-application/1.0.0/`.

An ephemeral, from-scratch conformance checker (deriving required-field
and `requiredWhen` rules directly from this schema's own `fields[]`,
discarded after use, not committed) ran all 33 fixtures: both valid
scenarios at 0 missing-field errors, every mutation fixture raising
exactly the one error it targets, and the unknown-field fixture's extra
key correctly flagged — 33/33 passing. Validated clean with
`node tools/validate.mjs` and `node tools/validate-ajv.mjs`
(668/668 documents, both individually and as part of the full registry
run). `registry-index.json` regenerated via `npm run build-index` in
`tools/govschema-client/`.
