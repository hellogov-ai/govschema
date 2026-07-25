# Verification record — tr/nvi/general-acquisition-of-turkish-citizenship-application@1.0.0

## Candidate selection

GOV-4818 ("GovSchema Standard Research"). Türkiye (TR) was entirely absent
from the registry (99 jurisdictions before this cycle). A prior cycle had
briefly screened Türkiye's `evisa.gov.tr` for the Visa vertical only
(found to redirect to a commercial third-party domain) and left every
other vertical unscreened. This cycle screened all six verticals fresh:

1. **Passport** — `nvi.gov.tr`'s ordinary-passport process is entirely
   biometric/in-person via e-Devlet appointment booking
   (`randevu.nvi.gov.tr`); the only downloadable "Pasaport Talep
   Formları" on that domain are for **service/diplomatic passports**
   (government officials only), not applicant-facing. **Dead end.**
2. **DMV** — `egm.gov.tr/trafik-tescil-hakkinda` states vehicle
   registration forms (EK-1, M1) are obtained in person from Şoförler
   Odası (Drivers' Chambers), not published online; driver-license exam
   applications route through a login-gated MEB e-Sınav portal. **Dead
   end for a downloadable field-by-field form.**
3. **Business Formation** — MERSIS (`mersis.gtb.gov.tr`), Türkiye's
   central trade-registry system, requires a MERSIS account or
   e-Devlet/e-imza login before any field is shown — a genuine login
   gate hiding the field structure. The Ministry of Trade's published
   "esas sözleşme örneği" (model articles-of-association templates) are
   legal boilerplate contracts, not application forms. **Dead end.**
4. **Taxes** — GİB's own "Hazır Formlar" (Ready Forms) library at
   `dijital.gib.gov.tr/Formlar`, checked live, returned "Seçilen
   kategoriye ait kayıt bulunmamaktadır" (no records) for every category;
   all filing paths (e-Beyanname, İnteraktif/İnternet Vergi Dairesi,
   Hazır Beyan Sistemi) require T.C. Kimlik No + e-Devlet login. **Dead
   end** — Türkiye's tax administration is fully digitized with no
   paper-form fallback.
5. **Visa** — `evisa.gov.tr` re-screened live with a real Playwright
   browser (not just an HTTP fetch): it does redirect, inconsistently, to
   `dtvgroup.com.tr` ("DTV Consultancy... a subsidiary of the Foundation
   for Strengthening the Foreign Affairs Organization" — a real
   MFA-affiliated intermediary, correcting the prior cycle's "unrelated
   commercial domain" characterization). The application wizard itself
   (`evisa.gov.tr/en/apply/`) reaches a real step-1 screen (visa type,
   nationality, travel-document type, destination) but gates the actual
   personal-data page behind a reCAPTCHA before the field structure can
   be observed. **Dead end for schema extraction** (different reason
   than previously recorded, same outcome).
6. **National ID & Civic Documents** — `nvi.gov.tr/vatandaslik-ile-ilgili-formlar`
   publishes 11 live, unauthenticated, directly downloadable AcroForm
   PDFs (VAT-1 through VAT-11) covering Turkish-citizenship acquisition
   and loss, issued by the Ministry of Interior's own Nüfus ve
   Vatandaşlık İşleri Genel Müdürlüğü (NVI). **VAT-3** ("Genel Olarak
   Türk Vatandaşlığının Kazanılması Başvuru Formu" — General Acquisition
   of Turkish Citizenship Application Form) is the broadest of the
   series and was confirmed via `pdfjs-dist` to carry 100 genuine
   AcroForm fields (not a scanned image). **Authored as this v1.0.0** —
   opens Türkiye as the registry's 100th jurisdiction.

## Reaching the live source

- **Form Vat-3**:
  `https://www.nvi.gov.tr/kurumlar/nvi.gov.tr/mevzuat/nufusmevzuat/Formlar/Vatandaslik/Vat3_Genel_Kazanma.pdf`
  — HTTP 200, `Content-Type: application/pdf`, `Content-Length: 870243`
  bytes (matches the downloaded file exactly), sha256
  `e94cafefbbf09d9ec13c3b0849e8b227b2758ee959472824d9ce58f00d4f4533`,
  `Last-Modified: Tue, 04 Aug 2020 08:33:31 GMT`, no login/CAPTCHA gate,
  linked directly from NVI's own current "Vatandaşlık ile İlgili Formlar"
  listing page. Retrieved 2026-07-25.
- Field structure extracted with `pdfjs-dist`'s `getAnnotations()` (100
  AcroForm widgets on a single page) and cross-checked against the text
  layer (`getTextContent()`) for label wording. Because the form packs a
  dense two-column layout (applicant block, marital-status block, spouse
  block, and a 3-column minor-children table all on one page), the page
  was additionally rendered at scale 2.2 via `node-canvas` and visually
  inspected in cropped sections to confirm which printed label each
  AcroForm field name corresponds to — several field names on this form
  are not self-describing (e.g. `Soy` for the "Soyu" column, `Ad_33`/
  `Soyad_33` for "Türkçe Adı"/"Alacağı Soyadı" within the children table,
  as distinct from `Ad_3`/`Soyad_3` for "Yabancı Adı"/"Yabancı Soyadı" in
  the same column) and were only resolved correctly by matching each
  field's rendered `rect` y-coordinate against the row it visually sits
  in, not by name alone.
- Legal basis: Law No. 5901 on Turkish Citizenship (Türk Vatandaşlığı
  Kanunu), Article 11 — the form's own closing declaration cites this
  article by number ("5901 sayılı Türk Vatandaşlığı Kanununun 11'inci
  maddesi uyarınca Türk vatandaşlığını genel hükümlere göre kazanmak
  istiyorum").

## Findings / disclosed scoping calls

1. **`jurisdiction.level` is `"national"`** — NVI is Türkiye's central,
   state-level civil-registry authority; this form is filed with a
   provincial Governorate (Valilik) acting on NVI's behalf, not a
   subnational body with its own separate legal basis.
2. **`descentOrLineage` (source label "Soyu") is modelled as optional and
   described conservatively** — the form prints this as a bare column
   header inside the place-of-birth block with no further gloss or
   footnote defining it. Rather than guess at a semantic meaning (e.g.
   ethnic descent relevant to Türkiye's separate soydaş/descent-based
   citizenship pathway), this schema states the ambiguity explicitly in
   the field's own `description` and leaves it non-mandatory.
3. **`phoneNumber` and `emailAddress` each collapse a visually-split
   pair of input boxes into one field** — the source prints a
   parenthetical area-code box before the phone number and splits the
   email box around a fixed, non-editable "@" glyph. Both splits are
   typographic, not two independent pieces of data (unlike, say, a
   day/month/year triple), so each is modelled as a single semantic
   field, noted in its own `description`.
4. **`maritalStatus` is modelled as a 4-way enum** derived from four
   independently-named "Evet" checkbox widgets (Bekar/Evli/Boşanmış/Dul)
   that are visually a single-select group despite not sharing one
   PDF field name.
5. **`hasPriorCriminalConviction` and `hasPendingProsecution` are
   modelled as a 2-value enum (`yes`/`no`)**, not free text, even though
   their underlying AcroForm widgets are plain text boxes — the form's
   own printed instruction constrains the answer to "(Evet-Hayır)".
6. **`marriageDate` is `requiredWhen maritalStatus` is `married`,
   `divorced`, or `widowed`; `divorceDate` only when `divorced`;
   `spouseDeathDate` only when `widowed`; every `spouse*` field only
   when not `single`** — this is a direct transcription of the form's
   own printed footnote (a/b/c) stating exactly which combination of
   dates and spouse particulars must accompany each marital-status
   answer.
7. **`maidenName` is `requiredWhen useMaidenNameWithMarriedSurname` is
   `true`** — the form only provides a maiden-surname box conditioned on
   answering "yes" to the adjoining checkbox question.
8. **The 3-column minor-children table is modelled as bounded-slot
   `child1`/`child2`/`child3` fields (12 fields per child), all
   optional** — consistent with this registry's established
   bounded-slot precedent (e.g. `us/uscis/naturalization-n400`'s
   `child1Name`/`child2Name`/`child3Name`). The form provides exactly 3
   columns and states no further overflow procedure, so no more than 3
   slots are modelled.
9. **Out of scope**: the header's `Kayıt Tarihi`/`Kayıt No` (registration
   date/number, completed by the receiving authority upon intake, not
   the applicant), the biometric-photograph box, and the closing
   signature/printed-name line (`Ad Soyad`/`İmza`) — consistent with
   every prior flat-PDF schema in this registry. `declarationDate` (the
   date accompanying the signature) is kept in scope as applicant-
   provided data, distinct from the signature mark itself.
10. **DMV, Business Formation, Taxes, Visa, and Passport are all
    confirmed dead ends for Türkiye this cycle** (see "Candidate
    selection" above) — National ID & Civic Documents is Türkiye's only
    open vertical going into future cycles' backlog, via the remaining
    VAT-1/2/4-11 citizenship-related forms on the same NVI page (not
    screened field-by-field this cycle beyond confirming they exist as
    live AcroForm PDFs).

## Conformance

4 valid mock scenarios — `valid-single-applicant-minimal` (maritalStatus
= single, exercising only the 21 unconditionally-required fields),
`valid-married-applicant-with-spouse` (maritalStatus = married,
exercising `marriageDate` plus all 10 spouse fields), `valid-widowed-applicant-with-three-children`
(maritalStatus = widowed, exercising `marriageDate` + `spouseDeathDate` +
all 10 spouse fields + all 3 children columns fully filled), and
`valid-married-applicant-using-maiden-name` (exercises `maidenName`) —
plus 21 static-`required`-field mutation fixtures (one per
unconditionally-required field) and 14 `requiredWhen` mutation fixtures
(one per conditionally-required field: `maidenName`, `marriageDate`,
`divorceDate`, `spouseDeathDate`, and all 10 spouse fields, each built
from the appropriate positive scenario above), and 1
unknown-field-rejected fixture — 40 fixtures total, committed under
`conformance/tr/nvi/general-acquisition-of-turkish-citizenship-application/1.0.0/`.

An ephemeral, from-scratch conformance checker (deriving required/
`requiredWhen` rules directly from this schema's own `fields[]`,
discarded after use, not committed) ran all 40 fixtures plus the 10
scripted scenarios used during authoring: every valid scenario at 0
missing-field errors, every mutation fixture raising exactly the one
error it targets, and the unknown-field fixture's extra key correctly
ignored by requiredness logic (schema-level rejection of unknown fields
is an implementer's own JSON Schema `additionalProperties` concern, out
of this document's scope). Validated clean with `node tools/validate.mjs`
and `node tools/validate-ajv.mjs`, individually and as part of the full
registry run. `registry-index.json` regenerated via `npm run build-index`
in `tools/govschema-client/`.
