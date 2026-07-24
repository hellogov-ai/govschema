# Verification record — ba/iddeea/national-identity-card-application@1.0.0

## Candidate selection

GOV-4734 ("GovSchema Standard Research"). Bosnia and Herzegovina stood at 3
of 6 verticals (Business Formation, Passport, Taxes — all scoped to
Republika Srpska only), with DMV and National ID left disclosed as open,
unscreened-for-a-live-form backlog by the GOV-4727 cycle. This cycle
re-screened both:

1. **DMV** — checked whether a state-level authority publishes what MUP RS
   would not. IDDEEA (the state-level agency that maintains BiH's vehicle
   register) publishes only informational/register pages
   (`iddeea.gov.ba/en/registers/`); actual registration filing remains
   handled by entity/cantonal MUP offices. Brčko District's own eUprava
   portal (`euprava.bdcentral.net`) turned out to host only a prose
   service-description page for "Registracija vozila po prvi put u BiH"
   (confirmed via a Wayback Machine snapshot after the live site returned
   a DNS `SERVFAIL`; see "Reaching the live source" below) — no
   downloadable form, just a list of required supporting documents. A
   state-level "Pravilnik o registriranju vozila u BiH" was also found
   (`bih-pravo.org`), but only references its own annex forms (Prilog 1,
   1a, 1b, 1c) by number without publishing the templates themselves.
   **Not authored — DMV remains open, unscreened-for-a-downloadable-form
   backlog.**
2. **National ID** — searched for a personal-identity-card (lična
   karta/osobna iskaznica) request form. Found a live, unauthenticated,
   flat PDF specimen of **Obrazac LK/OI-1** hosted by the Ministry of
   Interior of Sarajevo Canton (a Federation of Bosnia and Herzegovina
   cantonal authority), and confirmed — by separately fetching IDDEEA's
   own official copy of the implementing regulation
   (`iddeea.gov.ba/wp-content/uploads/WEB/.../Pravilnik_o_obrascu_licne_karte...`)
   — that this form is prescribed at the **state level**, not by any one
   entity or canton. **Authored as this v1.0.0.** This is the first BA
   schema in this registry scoped at `jurisdiction.level: "national"`
   rather than `"subnational"` (Republika Srpska), since the underlying
   legal basis and form are uniform nationwide.

## Reaching the live source

- **Obrazac LK/OI-1** (the request form itself):
  `https://mup.ks.gov.ba/sites/mup.ks.gov.ba/files/2023-01/lkoi1.PDF` —
  HTTP 200, `Content-Type: application/pdf`, 269,429 bytes, sha256
  `b92f7b6c692048c68c2dec3e63e12bfcea6dd5cb49638b09367c3a740c9dee8e`,
  `Last-Modified: Mon, 23 Jan 2023`. Hosted by the Ministry of Interior of
  Sarajevo Canton (a Federation of Bosnia and Herzegovina cantonal
  authority) as one of dozens of cantonal/entity front-counters that
  accept this identical, state-prescribed form.
- **Pravilnik o obrascu zahtjeva za izdavanje i zamjenu lične karte,
  postupku izdavanja i zamjene lične karte i načinu vođenja evidencija o
  zahtjevima** ("Službeni glasnik BiH", 39/02) — the implementing
  regulation that prescribes the LK/OI-1 request-form template itself —
  fetched directly from IDDEEA's own official domain:
  `https://www.iddeea.gov.ba/wp-content/uploads/WEB/ZAKONODAVSTVO/PODZAKONSKI%20AKTI/Li%C4%8Dna%20karta/3/Pravilnik_o_obrascu_zahtjeva_za_izdavanje_i_zamjenu_licne_karte_postupku_izdavanja_i_zamjene_licne_karte_39-02_bos.pdf`
  (HTTP 200, `Content-Type: application/pdf`, 66,146 bytes,
  `Last-Modified: Wed, 13 Sep 2023`). IDDEEA's same "Lična karta – akti"
  page (`iddeea.gov.ba/bs/licna-karta/`) also lists three later amending
  Pravilniks (2/09, 102/12, 41/14) not separately fetched; the currently
  hosted LK/OI-1 specimen (`Last-Modified: 2023-01-23`) is treated as the
  authoritative current-state template rather than reconstructing the
  form from the 2002 base regulation's own text.
- A **separate** state-level regulation, "Pravilnik o obrascu lične karte
  i podacima sadržanim u ličnoj karti" ("Službeni glasnik BiH", 32/01,
  fetched via `propisi.ks.gov.ba`), prescribes the physical identity
  *card's* own layout (a distinct document from the *request form*
  regulation above) — read only to confirm both regulations are
  state-level, published in the Official Gazette of Bosnia and
  Herzegovina rather than any entity/cantonal gazette.
- Brčko District's `euprava.bdcentral.net` (checked for both a DMV and a
  National ID candidate) returned a DNS `SERVFAIL` on direct fetch at the
  time of this cycle; a Wayback Machine snapshot
  (`web.archive.org/web/20250427222036/.../zahtjev-za-registrovanje-vozila-po-prvi-put-u-bih/`
  and `web.archive.org/web/20250711191127/.../zahtjev-za-izdavanje-licne-karte/`)
  confirmed both pages are informational service descriptions with no
  attached downloadable form — consistent with this registry's established
  Wayback-fallback practice (see `gov-au-wayback-workaround`) for a
  government host that is temporarily unreachable rather than permanently
  gone.

## Extraction method

`pdfjs-dist` (`/tmp/node_modules/pdfjs-dist/legacy/build/pdf.js`)
`getAnnotations()` and `getFieldObjects()` both returned empty/null — this
is a flat, non-fillable single-page specimen with no AcroForm or XFA
layer, printed with drawn checkbox squares and ruled answer lines rather
than form widgets. The raw text stream is **not** in visual reading
order (e.g. the footer's "Prilog:"/"Broj registra:" line and the
signature captions appear early in the extracted stream despite sitting
at the very bottom of the rendered page) — the same non-sequential
reading-order pattern already documented for this registry's other
6th-pattern PDF-extraction case. `node-canvas`
(`/tmp/node_modules/canvas`, rendered at 3x scale, `FONTCONFIG_FILE`
pointed at `/paperclip/chrome-sysroot/my-fonts.conf` to avoid a
font-loading crash) was used to render the page to PNG and visually
confirm every checkbox grouping, in particular: the single Yes/No
checkbox pair for `previousCardAttached`, the three mutually-exclusive
checkboxes for `collectionMethod`, and the sixteen-checkbox grid for
`replacementReason`.

## Document structure

Single page. Header: name of the receiving authority, and an
office-assigned reference number/date (excluded, see Finding 1). Item 1:
issuance-vs-replacement checkbox pair (`requestType`). Item 2: the
applicant's personal data (JMB, name, parent's name, sex, date/place of
birth, permanent-residence municipality, an optional temporary-residence
municipality for displaced persons/returnees, postal code, address, and
two request-only optional fields — entity citizenship and blood type,
each marked with a footnote stating they are entered only at the
applicant's own request). Item 3: data on a previously issued card
(place/registry number/date of issue, and a Yes/No checkbox for whether
the old card is physically enclosed) — relevant only when replacing a
card. Item 4: a sixteen-checkbox grid of specific reasons for replacement,
laid out in three visual columns. Item 5: a three-way checkbox for how
the applicant will collect the new card (in person, by proxy, or by
mail). Footer: a free-text enclosures line ("Prilog") and a second,
separately-labelled "Broj registra" reference number; signature lines for
the applicant and the receiving official; and a data-protection notice.

## Disclosed findings and interpretation choices

1. **The header's office-assigned reference number/date ("Broj"/"Datum")
   and the footer's "Broj registra" are excluded.** Both are populated by
   the receiving authority upon intake, not supplied by the applicant —
   consistent with this registry's established convention of excluding
   authority-populated fields (e.g. `ba/mup-rs/lost-or-stolen-travel-document-report`'s
   own excluded Section 5). `receivingAuthorityName` (the header's "Naziv
   organa/tijela" line) is retained as applicant-facing, since it is the
   authority the applicant is addressing the request to, not one it
   assigns.
2. **`applicantSex` is modelled as an open string, not an enum**, unlike
   several checkbox-backed fields on this same form. The rendered page
   shows a plain labelled answer line for "Spol/Pol" with no drawn
   checkbox squares beside it (unlike the clearly boxed Yes/No,
   three-way, and sixteen-option groups elsewhere on the form) —
   consistent with this registry's precedent of not fabricating an
   enum/checkbox structure the source does not itself visually present.
3. **`jurisdiction.level` is set to `"national"`, not `"subnational"`** —
   a deliberate departure from this registry's three existing Bosnia and
   Herzegovina schemas, which are all scoped to Republika Srpska. This
   form's own legal basis (the Zakon o ličnoj karti državljana BiH and its
   implementing Pravilnik, both published in the state-level "Službeni
   glasnik BiH") and IDDEEA's own state-level administration confirm the
   identical LK/OI-1 template is used regardless of which entity, canton,
   or the Brčko District a citizen files in — unlike the Republika
   Srpska-only APIF business-registration and MUP RS passport-report
   forms, which are genuinely separate per-entity systems. This is a
   disclosed judgment call: BiH's decentralized administration means no
   single central portal was fetched to prove nationwide adoption
   directly; it rests on the regulation's own state-level Official
   Gazette publication and IDDEEA's own state-level hosting of that
   regulation.
4. **`replacementReason` preserves an apparent near-duplicate pair
   verbatim** — "Promjena ličnog imena" (`personalNameChange`) and
   "Promjena imena" (`nameChange`) both appear as distinct, separately
   boxed checkboxes on the source (see the rendered image), despite
   translating to near-identical English. Not merged, per this registry's
   fidelity-over-cleanliness precedent (e.g. the GOV-4713 APIF cycle's own
   Finding on not collapsing what the source itself keeps distinct).
5. **`entityCitizenship` and `bloodType` are modelled as optional**, per
   the form's own footnote (`*`) stating both are entered only at the
   applicant's request — not otherwise mandatory data for the card.
6. **`previousCardIssuePlace`, `previousCardRegistryNumber`,
   `previousCardIssueDate`, `previousCardAttached`, and
   `replacementReason` are gated `requiredWhen requestType == "replacement"`.**
   Item 3's own heading ("Podaci o ranije izdanoj ličnoj karti") and item
   4's grid only have a data-need when an existing card is being
   replaced; a first-time issuance has no prior card to describe.
7. **Signature lines are out of scope**, consistent with every prior flat
   PDF schema in this registry (e.g. `ba/mup-rs/lost-or-stolen-travel-document-report`).
8. **DMV remains open, unscreened-for-a-downloadable-form backlog** — see
   "Candidate selection" above; not a confirmed dead end.

## Conformance

2 valid mock scenarios —
`valid-first-time-issuance-minimal` (requestType=issuance, exercising only
the 14 unconditionally-required fields) and
`valid-replacement-lost-card-with-optional-fields` (requestType=replacement,
exercising all 5 `requiredWhen`-gated fields plus every optional field:
temporaryResidenceMunicipalityForDisplaced, entityCitizenship, bloodType,
attachmentsDescription) — plus 14 static-`required`-field mutation
fixtures (one per unconditionally-required field), 5 `requiredWhen`
mutation fixtures (one per replacement-gated field, built from the second
valid scenario), and 1 unknown-field-rejected fixture, committed under
`conformance/ba/iddeea/national-identity-card-application/1.0.0/`.

An ephemeral, from-scratch conformance checker (deriving required/
`requiredWhen` rules directly from this schema's own `fields[]`,
discarded after use, not committed) ran all 22 fixtures: both valid
scenarios at 0 errors, all 19 mutation controls each raising exactly 1
error, and the unknown-field fixture correctly rejected. Validated clean
with `node tools/validate.mjs` and `node tools/validate-ajv.mjs`,
individually and as part of the full registry run (654/654).
`registry-index.json` regenerated via `npm run build-index` in
`tools/govschema-client/`.
