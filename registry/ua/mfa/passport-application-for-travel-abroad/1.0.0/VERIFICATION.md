# Verification record — `ua/mfa/passport-application-for-travel-abroad` v1.0.0

This file is the **source-review record** for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice. It documents the provenance of the published fields and states the
current verification claim honestly.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-17`

This is **GOV-3537** ("GovSchema Standard Research"), deepening Ukraine's
own disclosed Passport backlog candidate rather than scouting a new
jurisdiction. Ukraine (opened as the registry's 73rd jurisdiction via
GOV-3513, Business Formation) had its Visa (GOV-3523) and Taxes (GOV-3531)
verticals opened by the two preceding same-week research cycles, each of
which re-confirmed this jurisdiction's Passport candidate as "STRONG" (a
directly downloadable, government-published form) and left it as open,
disclosed backlog — see CATALOG.md's "Genuinely open, well-sourced
candidates" section.

## Why this candidate

The disclosed backlog note names one specific URL
(`https://libya.mfa.gov.ua/storage/app/sites/121/imported_content/5e30694f7a7d6.pdf`)
and flags that its own Wayback Machine mirror was truncated at 1 MB, needing
a fresh full fetch. Ukraine's remaining two verticals (DMV, National ID) were
already found weak by the GOV-3513 cycle, so this candidate was the clear
next step for deepening this jurisdiction rather than cold-scouting a new
one, per the standing GovSchema Standard Research routine.

## Sources examined

### Source 1 (primary `source`)

- **Authority:** Ministry of Foreign Affairs of Ukraine (MFA), mirrored on
  the consular pages of the Embassy of Ukraine in Libya
- **Document:** "ЗАЯВА-АНКЕТА на оформлення паспорта громадянина України для
  виїзду за кордон" (Application-questionnaire for issuance of a passport of
  a citizen of Ukraine for travel abroad)
- **Cited URL:** `https://libya.mfa.gov.ua/storage/app/sites/121/imported_content/5e30694f7a7d6.pdf`
- **Direct fetch:** HTTP 403 in this sandbox (the same pattern the
  GOV-3513/GOV-3523/GOV-3531 cycles each hit against `mfa.gov.ua` and its
  subdomains).
- **Wayback Machine mirror actually fetched:**
  `https://web.archive.org/web/20220413044121if_/https://libya.mfa.gov.ua/storage/app/sites/121/imported_content/5e30694f7a7d6.pdf`
  — a **different, earlier capture** than the one the backlog note itself
  had checked. The CDX index for this exact URL lists 3 captures with a 200
  status: `20210508193019`, `20220413044121`, and `20220705215542`. The
  backlog note's own capture (`20220705215542`) was re-fetched and
  reconfirmed truncated: HTTP 200 but exactly 1,048,576 bytes, with the
  mirror's own response header stating `warning: 299 wayback content
  truncated by "length"`, versus its own `x-archive-orig-content-length:
  1293642`. The `20220413044121` capture (three months earlier) returns the
  **full, untruncated** file: HTTP 200, 1,293,642 bytes, exactly matching
  its own `x-archive-orig-content-length` header with no truncation
  warning.
- **Retrieved:** 2026-07-17, HTTP 200 (independently re-fetched twice,
  identical size and hash both times)
- **File:** 1,293,642 bytes,
  `sha256:71628425ada5a3461d91dd2fe66c8fe8855ce7e5459d46c9e3e528e1b05b44b6`
- **Structure confirmed:** a genuine 2-page AcroForm PDF — 57 `/Widget`
  annotations total (37 on page 1, 20 on page 2), confirmed via
  `pdfjs-dist`'s `getAnnotations()`. Field names are fully generic and
  non-self-documenting (`fill_1`..`fill_17` on page 1, `fill_1_2`..`fill_17_2`
  on page 2, and five checkbox radio groups `Group1`-`Group5`).
- **Extraction method:** every widget's own PDF rectangle (`rect`, in PDF
  user-space coordinates) was extracted alongside every text-content item's
  own position (`transform[4]`/`transform[5]`) via `pdfjs-dist`'s
  `getTextContent()`, then each widget was matched to the nearest text row
  directly above or immediately beside it — the same coordinate-correlation
  technique this registry uses for other sources with generic AcroForm field
  names (e.g. `pl/mswia/wniosek-o-wydanie-dowodu-osobistego`). Text rows were
  reconstructed by grouping text items with `y`-coordinates within 2pt of
  each other, then sorting left-to-right by `x`; widget-to-checkbox-choice
  correlation for the five radio groups additionally used each choice's own
  `x`-position, since a printed checkbox glyph sits immediately left of its
  own label and multiple choices commonly share one row across 2-3 columns.

## Field inventory (Phase 3)

The source prints its own field numbers 1-10 on page 1 and 11-15 on page 2;
the two applicant-facing signature blocks and every officer-facing block
below field 15 are unnumbered.

| Field (schema `name`) | Label (source) | Field no. / page |
|---|---|---|
| `residenceStatusAbroad` | Оформлення паспорта для (Постійне / Тимчасове проживання) | 1, p.1 |
| `issuanceCircumstance` + `issuanceCircumstanceOtherDescription` | Обставини, за яких оформляється паспорт (10 checkboxes) | 2, p.1 |
| `childUnder16Reason` + `childUnder16ReasonOtherDescription` | Якщо паспорт оформляється для дитини віком до 16 років, з якої причини (5 checkboxes) | 3, p.1 |
| `taxpayerRegistrationNumber` | Реєстраційний номер облікової картки платника податків (ідентифікаційний номер) | 4, p.1 |
| `surnameUkrainian`/`surnameLatin`/`givenNameUkrainian`/`givenNameLatin`/`patronymicUkrainian` | Прізвище / Ім'я / По батькові (українською мовою / латиницею) | 5, p.1 |
| `previousFullName1`/`previousFullName2`/`previousFullName3` | Прізвище, ім'я, по батькові, якими користувалися раніше | 6, p.1 |
| `dateOfBirth` | Дата народження (дд.мм.рррр) | 7, p.1 |
| `sex` | Стать (жіноча / чоловіча / не зазначено) | 8, p.1 |
| `residenceAbroadCountry`/`residenceAbroadRegion`/`residenceAbroadPostalAddressLine1-3` | Місце проживання за кордоном | 9, p.1 |
| (documents[] `signatureSpecimen`) | Зразок підпису, який буде вноситися до паспорта | 10, p.1 |
| (documents[] `applicantPhoto`) | Фото | unnumbered, top-right p.1 |
| `ukraineResidenceOblastName`/`...DistrictName`/`...SettlementType`/`...SettlementName`/`...StreetType`/`...StreetName`/`...HouseNumber`/`...BuildingNumber`/`...ApartmentNumber`/`...PostalCode` | Місце проживання в Україні (для ПМП: останнє місце проживання в Україні до виїзду за кордон) | 11, p.2 |
| `contactPhoneNumber`/`contactEmailAddress` | Контакти особи | 12, p.2 |
| `consularRegistrationStatus` + `consularRegistrationSince` + `consularInstitutionName` | Перебування на консульському обліку | 13, p.2 |
| `temporaryResidenceReason` | Для тимчасового проживання за кордоном: причина/мета проживання за кордоном | 14, p.2 |
| `permanentResidencePermitIssuedBy`/`permanentResidencePermitDate` | Для осіб, що отримали дозвіл на виїзд на постійне проживання за кордоном | 15, p.2 |
| (documents[] `applicantConsentDeclarationAndSignature`) | Заяву-анкету заповнив (consent paragraph + signature) | unnumbered, p.2 |

Not modelled (out of scope): "Заяву-анкету прийняв" (officer received),
"Рішення про оформлення паспорта" (officer decision), "Оформлено новий
паспорт" (new passport series/number/date, officer-recorded) — three
consecutive officer-only signature/stamp/date blocks with no applicant-facing
content — and "Паспорт одержав" (a second applicant signature, captured at
passport pickup/collection, not at filing).

## Access notes and judgment calls

1. **The disclosed backlog note's own Wayback capture (`20220705215542`) is
   genuinely truncated** — re-confirmed this cycle via the mirror's own
   `warning: 299 wayback content truncated by "length"` response header,
   with its own `x-archive-orig-content-length` (1,293,642 bytes) exceeding
   what was actually served (1,048,576 bytes, exactly 1 MiB — Wayback's own
   per-capture crawl-size cap, not a corrupt/partial file on the origin's
   side). The CDX index for this exact URL was queried directly
   (`web.archive.org/cdx/search/cdx?url=...&output=json`) to find the two
   sibling captures; the `20220413044121` capture (three months earlier)
   is the one actually used, and is a complete, non-truncated file.
2. **All 57 widgets carry fully generic field names** (`fill_N`, `fill_N_2`,
   `GroupN`) with no self-documenting hint of their own meaning — every
   field's semantics were resolved purely from coordinate correlation
   against the page's own text layer, not from the field names themselves.
3. **Group2's (field 2's) ninth checkbox choice, "Паспорт дитини віком до 16
   років" (passport for a child under 16), reads at first glance like a
   section subheading** (it visually introduces field 3's own child-specific
   reason block immediately below it) **but is confirmed to be Group2's own
   ninth radio-button choice**, not a subheading, because a `Group2` widget
   with `buttonValue: "Choice9"` sits at exactly that text row's own
   coordinates (col. 3, y623-635) — the same pattern every other Group2
   choice follows. This is the one checkbox in Group2 that, when selected,
   makes field 3 (the child-specific reason sub-checklist) meaningful; the
   schema keys `childUnder16Reason`'s own `requiredWhen` to this exact
   value (`first-passport-for-child-under-16`).
4. **Group4's (field 8's, sex) three checkboxes' left-to-right label order
   is жіноча (female) / чоловіча (male) / не зазначено (not specified)**,
   matched to the three `Group4` widgets' own left-to-right `rect.x0`
   order (357, 408, 470), since each printed checkbox glyph sits
   immediately left of its own label's `x`-position (374, 425, 488) — a
   consistent ~15-20pt checkbox-to-label offset confirmed across every other
   checkbox group on this source.
5. **Field 9's postal-address sub-block (3 identical blank lines,
   `fill_15`/`fill_16`/`fill_17`) and field 6's previous-names sub-block (3
   identical blank lines, `fill_9`/`fill_10`/`fill_11`) are each modelled as
   3 numbered fields** (`residenceAbroadPostalAddressLine1-3`,
   `previousFullName1-3`), the same bounded-repeating-line convention this
   registry already uses elsewhere (e.g.
   `criminalRecordPersonPreviousGivenName1` in
   `sk/mzv/ziadost-o-obciansky-preukaz`) — only line 1 of each triplet is
   `required`; lines 2-3 are optional continuation lines.
6. **Field 11's address sub-fields mirror this registry's own established
   Ukrainian-address field-naming convention** from
   `ua/moj/state-registration-individual-entrepreneur` (`oblastName`,
   `districtName`, `settlementName`, `streetTypeAndName`, `houseNumber`,
   `buildingNumber`, `apartmentNumber`, `postalCode`), prefixed
   `ukraineResidence*` here to disambiguate from field 9's own
   `residenceAbroad*` address fields on the same document. Unlike that
   sibling schema, this source's own settlement-type and street-type boxes
   (`fill_3_2`, `fill_5_2`) are plain `Tx` (free-text) widgets, not
   checkboxes, so `ukraineResidenceSettlementType`/`ukraineResidenceStreetType`
   are modelled as free-text strings (the applicant writes e.g. "місто" or
   "вулиця" themselves), not as an `enum`.
7. **Field 11's own "для ПМП" (for permanent-residence-abroad status)
   parenthetical is the only textual link between field 11 and field 1's
   residence-status selection.** Rather than leave field 11 unconditionally
   required for every applicant — which would over-scope a Ukraine-residence
   disclosure the source itself qualifies — `ukraineResidenceOblastName` (the
   sole sub-field this schema marks `required` at all within the block) is
   modelled `requiredWhen: residenceStatusAbroad equals
   permanent-residence-abroad`, with every other sub-field in the block
   `visibleWhen` the same condition. This mirrors the gating this source
   states explicitly and unambiguously for fields 14 and 15 (see below), but
   is itself a **disclosed judgment call, not a directly printed condition**
   — the "для ПМП" parenthetical is genuinely ambiguous about whether it
   restricts applicability to that cohort or merely clarifies intent for it.
8. **Fields 14 and 15 are each explicitly, unambiguously scoped to one of
   field 1's own two values** by their own printed headers — field 14: "Для
   тимчасового проживання за кордоном" (for temporary residence abroad);
   field 15: "Для осіб, що отримали дозвіл на виїзд на постійне проживання за
   кордоном" (for persons who received permission to depart for permanent
   residence abroad) — modelled `requiredWhen: residenceStatusAbroad equals
   temporary-residence-abroad` and `...equals permanent-residence-abroad`
   respectively. This is the one place on this form where field 1's own two
   values are explicitly named as a gating condition for a later field,
   which is also why `residenceStatusAbroad`'s own two enum values are named
   `temporary-residence-abroad`/`permanent-residence-abroad` rather than a
   more generic pair.
9. **`taxpayerRegistrationNumber` carries no printed conditional qualifier
   but is modelled `required: false`** — a disclosed scoping judgment (not a
   printed condition): Ukrainian citizens are not universally issued or
   required to hold this number (e.g. those with a registered religious
   objection under Article 71.2 of the Tax Code of Ukraine, or citizens born
   and residing abroad who never registered in Ukraine's taxpayer system),
   and the source provides no separate "if applicable" gate to key a
   `requiredWhen` against — the same treatment this registry gives
   comparable not-universally-issued identifier fields elsewhere (e.g.
   `nationalIdentityNumber` in `ua/mfa/visa-application-form`).
10. **No required-field asterisks or other visual requiredness markers exist
    anywhere in this source's extracted text layer**, for any of its 15
    numbered fields — confirmed by direct text search of every decoded
    string across both pages. Requiredness was therefore determined
    structurally: a field with no printed conditional qualifier is modelled
    `required: true`, consistent with this being a mandatory consular
    application form where an incomplete unconditional field blocks
    processing; every field with a printed conditional qualifier or an
    explicit "if any"/"if applicable" annotation is modelled `required:
    false`, with `requiredWhen`/`visibleWhen` tied to its own parent field
    where the source states or clearly implies one.
11. **The signature-specimen box (field 10) and the applicant's photo box
    (unnumbered, top-right of page 1) have no AcroForm widget of their
    own** — confirmed by the widget list ending at `fill_17` (page 1) with
    no widget rectangle anywhere near either box's own printed position.
    Both are physical specimens pasted/signed into a printed box, not
    fillable text fields, and are modelled as `documents[]` entries
    (`identity-document` category, matching this registry's treatment of
    the analogous `applicantPhoto` entry in `ua/mfa/visa-application-form`).

## Test run (Phase 4)

No live submission was attempted: this is Ukraine's own foreign-facing
consular application to a real, currently-operating government, and there is
no safe, reversible way to test a real submission against it — the same
reasoning already documented for this registry's other live
government-passport and -visa schemas (e.g. `ua/mfa/visa-application-form`).

Instead, a small purpose-built Node.js interpreter for this schema's own
`required`/`requiredWhen`/`visibleWhen` (`Condition` grammar), `enum`, and
`pattern`/`minLength`/`maxLength` `validation` rules was run against 10
fixtures in `conformance/ua/mfa/passport-application-for-travel-abroad/1.0.0/`:

- `minimal-required-only-valid.json` — `residenceStatusAbroad:
  temporary-residence-abroad`, `issuanceCircumstance:
  passport-term-expired`, `consularRegistrationStatus: not-registered`
  (every conditional block that could be left untriggered, is); passes with
  zero errors.
- `fuller-conditional-blocks-triggered-valid.json` — `residenceStatusAbroad:
  permanent-residence-abroad` (triggering every field 11/15 sub-field),
  `issuanceCircumstance: first-passport-for-child-under-16` with
  `childUnder16Reason: other` (triggering both `other`-description chains),
  `consularRegistrationStatus: permanent` (triggering its own since-when
  date and institution name); every field this triggers as required/visible
  is filled in; passes with zero errors.
- 8 mutation-invalid fixtures, each derived from one of the two valid
  fixtures with exactly one targeted violation, and each correctly rejected
  for exactly that reason: one missing unconditional required field
  (`surnameUkrainian`), two invalid `enum` values (`sex: "other"`,
  `consularRegistrationStatus: "unknown"`), one invalid `pattern`
  (`taxpayerRegistrationNumber: "12345"`, not 10 digits), and four
  `requiredWhen` violations (`temporaryResidenceReason`,
  `permanentResidencePermitDate`, `consularInstitutionName`,
  `childUnder16Reason`, each left absent while their own parent condition is
  triggered).

Both meta-schema validators (`tools/validate.mjs` and `tools/validate-ajv.mjs`)
were run against the finished document and pass clean (536/536 both),
alongside every other document already in the registry.
