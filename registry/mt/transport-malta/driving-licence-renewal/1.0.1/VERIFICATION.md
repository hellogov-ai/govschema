# Verification record — mt/transport-malta/driving-licence-renewal@1.0.1

## PATCH 1.0.0 → 1.0.1

GOV-4241 review gate (PR #639 follow-up). The 1.0.0 record claimed the
retrieved PDF begins `%PDF-1.4`; independent review re-checked the raw
header bytes and found `%PDF-1.5` instead. Purely a prose correction to a
verification-record detail — no field, validation, or structural change of
any kind — so this ships as a PATCH per VERSIONING.md's immutability rule
rather than editing the published 1.0.0 directory. Every other detail below
is otherwise identical to 1.0.0's own record.

## Candidate selection

GOV-4239 ("GovSchema Standard Research", parent GOV-4237). Closes Malta's
only remaining open (non-dead-end) DMV backlog item, per the GOV-4215
scouting cycle and CATALOG.md's Known Gaps section — Transport Malta's
"Form DRV019 — Driving Licence Renewal Form". Deepens Malta past its four
already-published verticals (`mt/jobsplus/self-employed-declaration-of-commencement`,
Business Formation; `mt/identita/passport-application`, Passport;
`mt/identita/national-identity-card-application`, National ID & Civic
Documents; `mt/identita/long-stay-visa-application`, Visa), opening the DMV
vertical (5 of 6). Only Taxes remains a confirmed dead end after this
cycle.

## Reaching the live source

Target: `https://www.transport.gov.mt/include/filestreaming.asp?fileid=5660`.

- The live origin `transport.gov.mt` is Cloudflare-JS-challenge-gated on
  every path attempted, including the file-streaming endpoint itself —
  confirmed freshly this cycle: a direct `curl` (with a realistic desktop
  Chrome User-Agent) returns HTTP 403 with `cf-mitigated: challenge`. This
  matches the earlier GOV-4215 scouting cycle's own finding for this
  domain.
- Retrieved instead via a Wayback Machine snapshot of the live PDF-
  streaming endpoint, crawled before/without hitting the gate:
  `http://web.archive.org/web/20250206231949/https://www.transport.gov.mt/include/filestreaming.asp?fileid=5660`.
  This is the same Wayback-workaround precedent already used for gov.au
  sources (see memory `gov-au-wayback-workaround`).
- HTTP 200, `Content-Type: application/pdf`, 590,784 bytes.
- sha256 of the retrieved bytes: `31da48262fc544080c6b5f422e8e845debd41eeb0f441402629298a0498b0e5e`.
  Independently re-fetched and re-hashed this cycle rather than trusted
  from the issue's own report alone — both byte count and hash match
  exactly, per this registry's standing skepticism practice.
- Confirmed mechanically: the retrieved bytes begin `%PDF-1.5` and contain
  zero `/AcroForm`/`/Widget`/`/FT` occurrences — a flat, print-and-fill
  specimen, not an interactive AcroForm PDF. Also confirmed via
  `page.getAnnotations()` returning 0 entries for both of its 2 pages, so
  no field-level metadata exists on the PDF itself to consult.

## Extraction method

Unlike the earlier GOV-4215 scouting cycle's concern that Transport Malta
mirrors would need "better PDF tooling" for a glyph-index/CID font issue
(the same issue this registry's own `mt/identita/passport-application` and
`mt/identita/national-identity-card-application` needed a ToUnicode-CMap
workaround for), this PDF's own text-showing operators decode cleanly via
`pdfjs-dist`'s standard `getTextContent()` API (already vendored at
`/tmp/node_modules/pdfjs-dist` from prior cycles) — no custom glyph-index
font encoding, no ToUnicode CMap workaround needed. Confirmed via a scratch
Node script this cycle. Text was rendered per page, grouped by y-coordinate
row and sorted by x-coordinate, to reconstruct each bilingual
(Maltese/English) field label and instruction in its printed layout
position.

Page 2 is entirely a bilingual Data Protection Privacy Notice with no
applicant input and is excluded.

Models 10 `fields[]` across 4 steps (Personal Details; Driving Licence
Renewal Method; Declarations; Signature and Photograph) plus 2
`documents[]` entries.

## Disclosed source-fidelity findings

1. **Whole-block conditional Personal Details section, modelled as a
   directly-supplied boolean gate.** The "Personal Details" block's own
   printed note reads, verbatim: "Fill in only in case of changes in your
   personal details and send a copy of your ID Card." Not a printed
   checkbox — modelled as `personalDetailsHaveChanged`, the same
   convention this registry's own `mt/identita/national-identity-card-application`
   (`addressHasChanged`) and `mt/identita/passport-application`
   (`spouseSectionApplies` et al.) each established for a compound/
   whole-section printed condition. It gates the requiredness of
   `nameAndSurname`/`address`/`postCode`/`idCardNumber` and the
   `idCardCopy` document. `telephoneOrMobile` is modelled unconditionally
   optional regardless of this gate, the same convenience-contact-field
   treatment `mt/identita/national-identity-card-application` gave its
   equivalent `telephoneNumber`/`mobileNumber` fields.

2. **`renewalChannel` modelled as a required enum, same treatment as this
   registry's own `ie/dttas/driving-licence-renewal`.** The form's three
   numbered options (online via `www.licenzji-xufiera.gov.mt`; by post
   with payment; in person at a Transport Malta office) are a genuine
   top-level decision point governing the rest of the renewal, even on a
   flat print specimen with no interactive checkbox — the same treatment
   `ie/dttas/driving-licence-renewal` gave its structurally identical
   `applicationChannel` field. This schema excludes the form's own
   detailed within-channel payment logistics (the printed cheque-payee
   name, the two banks' IBAN/BIC pairs for postal renewals, and the
   in-person card-payment note) as back-office/payment-processing detail
   rather than a fillable applicant field — none of it is a blank the
   applicant completes, unlike (for example)
   `mt/identita/national-identity-card-application`'s own
   `servizzGovHubLocation` blank line. This follows this issue's own
   suggested judgment call and this registry's general convention of
   excluding office/payment-processing detail.

3. **Both printed declarations modelled as directly-supplied declaration
   content, not a "yes/no + details" compound.** Unlike this issue's own
   scouting summary, which described the medical declaration as a
   "yes/no + details" field, the retrieved PDF text contains no details
   blank and no present-tense disclosure question for either declaration:
   - "I declare that if I have a medical condition which has become worse
     after the licence was issued, or if I develop a new condition, I will
     inform the Authority immediately" is a forward-looking commitment to
     notify the Authority of a *future* change, not a question about a
     *current* condition.
   - "I declare that I have been a resident of Malta for at least 185 days
     in the last calendar year" is a plain declaration sentence with no
     accompanying blank line or checkbox either.

   Both are modelled as the applicant's own directly-supplied declaration
   content — `acknowledgesMedicalConditionNotificationDuty` and
   `residentInMaltaAtLeast185Days` respectively — each a required boolean
   capturing the applicant's declared value, with no separate free-text
   "details" field fabricated against unprinted form content.

4. **Photograph modelled unconditionally optional, not gated on the
   personal-details-changed condition.** The "Affix a clear background
   coloured photo" instruction sits well below the Personal Details block
   (confirmed via this cycle's own y-coordinate layout read) and carries
   no printed conditional of its own. This issue's own scouting note
   asserts the photograph is "only required if personal details have
   changed since the last licence," but that condition appears nowhere in
   the retrieved PDF text and could not be independently re-confirmed
   against a live Transport Malta service page this cycle — the domain is
   Cloudflare-gated on every path, and no matching Wayback snapshot of the
   specific renewal-guidance page was located within this cycle's search.
   Per this registry's own established "disclose rather than fabricate an
   unprinted field" convention (see `mt/identita/passport-application`'s
   own Finding 6, an analogous external-guidance-only condition), the
   `photograph` document is modelled unconditionally optional rather than
   gated on `personalDetailsHaveChanged`, with this external claim
   disclosed here as informational context only.

## Conformance

2 valid mock scenarios and 8 mutation-control fixtures committed under
`conformance/mt/transport-malta/driving-licence-renewal/1.0.1/`:

- `valid-address-change-online.json` — a renewal reflecting a change of
  personal details (name, address, post code, ID Card number), renewing
  online, both declarations affirmed.
- `valid-no-change-by-post.json` — a straightforward renewal with no
  personal-details change, renewing by post, both declarations affirmed.
- 8 mutation controls: a missing statically-required field
  (`mutation-missing-personaldetailshavechanged-required.json`); a missing
  `nameAndSurname` while `personalDetailsHaveChanged` is true
  (`mutation-missing-nameandsurname-requiredwhen.json`); a missing
  `idCardNumber` while `personalDetailsHaveChanged` is true
  (`mutation-missing-idcardnumber-requiredwhen.json`); an invalid
  `renewalChannel` enum value (`mutation-invalid-renewalchannel-enum.json`);
  a missing `acknowledgesMedicalConditionNotificationDuty`
  (`mutation-missing-acknowledgesmedicalconditionnotificationduty-required.json`);
  a missing `residentInMaltaAtLeast185Days`
  (`mutation-missing-residentinmaltaatleast185days-required.json`); a
  missing `signature` (`mutation-missing-signature-required.json`); and an
  unknown top-level field (`mutation-unknown-field-rejected.json`).

An ephemeral, from-scratch conformance checker (deriving required/
requiredWhen rules directly from this schema's own `fields[]`, discarded
after use, not committed) ran all 10: both valid scenarios at 0 errors, all
8 mutation controls each raising exactly 1 error, and confirmed every
`requiredWhen` field reference resolves (0 dangling references). Note that,
consistent with this registry's own fixture convention (see e.g.
`mt/identita/national-identity-card-application`'s own fixtures),
`documents[]` requiredness is not exercised via these field-only mock
fixtures.

Validated clean with `node tools/validate.mjs` and `node tools/validate-ajv.mjs`
(585/585 both), individually and as part of the full registry run.
`registry-index.json` regenerated via `npm run build-index` in
`tools/govschema-client/` (584 → 585 entries).
