# Verification record — ba/mup-rs/lost-or-stolen-travel-document-report-abroad@1.0.0

## Candidate selection

GOV-4811 ("GovSchema Standard Research"). GOV-4720 (2026-07-24) authored
`ba/mup-rs/lost-or-stolen-travel-document-report@1.0.0` (Obrazac GPI-1,
the domestic-filing variant), opening Bosnia and Herzegovina's Passport
vertical, and disclosed Obrazac GPI-2 — the same report filed instead with
a Bosnia and Herzegovina diplomatic-consular mission (DKP) abroad — as open
backlog for a future companion schema, having already field-for-field
diffed the two PDFs at that time and recorded GPI-2's own byte count
(158,466 bytes) and sha256
(`a6589559869261514ff2cd07c4959b686454125fbc841caa1617dab1119c41ab`). By
GOV-4811, Bosnia and Herzegovina had reached 5 of 6 verticals (GOV-4741),
with Visa the sole confirmed dead end; this banked GPI-2 candidate was the
strongest, lowest-risk next deliverable — a companion schema within an
already-open vertical, following this registry's established main-form-
now/companion-form-later convention (e.g. `hu/nav`'s deferred detail
sheets, `kz`'s Form 220.0X/250.0X series, `sz/rtd`'s ACR companion).

## Reaching the live source and re-verification

Re-fetched independently this cycle rather than trusted from the banked
record:

- **Obrazac GPI-2**
  (`https://mup.vladars.rs/lat/documents/putne_isprave/ObrazacGPI_2.pdf`,
  HTTP 200, `Content-Type: application/pdf`, 158,466 bytes, sha256
  `a6589559869261514ff2cd07c4959b686454125fbc841caa1617dab1119c41ab`) —
  **byte-identical** to the GOV-4720-banked record; no change since that
  cycle.

## Extraction method

`pdfjs-dist` (`/tmp/node_modules/pdfjs-dist/legacy/build/pdf.js`) read
every text item on both pages of GPI-2 in natural top-to-bottom reading
order — no non-sequential-reading-order or vector-checkbox scrambling
encountered, matching GPI-1's own extraction finding. The printed answer
lines are plain underscores (a flat, non-fillable specimen); the
lost/stolen checkbox pair is confirmed by the same visual layout as GPI-1
(not independently re-rendered with `node-canvas` this cycle, since the
checkbox pair's position and labels are identical to GPI-1's own
already-confirmed layout). Both Bosnian (Latin script) and Serbian
(Cyrillic script) are present throughout, as with GPI-1.

For rigor, GPI-1 was also independently re-fetched and re-extracted this
cycle (not merely recalled from the prior VERIFICATION.md) so the two
forms' text streams could be diffed directly side-by-side rather than
relying on the banked description of the difference alone. GPI-1 re-fetched
byte-identical to its own published record (164,608 bytes, sha256
`b07abcc121542f2e60e61d53dd5e7d429a15e5a5f25961e396f7c1b9a3a65a97`).

## Field-for-field diff against GPI-1

The two forms share an identical structure (header, five numbered
sections, page break at the same point). Direct comparison of both
extracted text streams found:

1. **Header addressee.** GPI-1: "Naziv organa kome se prijava podnosi"
   (name of the [domestic] authority to which the report is submitted).
   GPI-2: "Naziv DKP kome se prijava podnosi" (name of the DKP to which the
   report is submitted). Modelled as `receivingMissionName` in this
   schema, replacing GPI-1's `receivingAuthorityName`.
2. **Section 4 loss-location item.** GPI-1: "MJESTO NESTANKA PUTNE
   ISPRAVE/PUTOVNICE" (place of loss). GPI-2: "MJESTO I DRŽAVA NESTANKE
   PUTNE ISPRAVE/PUTOVNICE" (place **and country** of loss) — matches the
   GOV-4720 banked-diff prediction exactly. Modelled as
   `placeAndCountryOfLoss`, replacing GPI-1's `placeOfLoss`.
3. **A field with no GPI-1 counterpart, not previously disclosed by the
   GOV-4720 banked description.** GPI-2's Section 4 prints an additional
   line, "ORGAN KOME JE PRIJAVLJEN NESTANAK PUTNE ISPRAVE/PUTOVNICE"
   (authority to which the loss/theft was [itself] reported) — absent
   from GPI-1's Section 4 entirely. Interpreted as the (typically local,
   foreign) authority the applicant first reported the loss/theft to
   before filing this DKP report — a distinct concept from
   `receivingMissionName` (the DKP this form is filed with). Modelled as
   the new field `authorityLossReportedTo`. This is the one place this
   cycle's independent re-diff went beyond what the GOV-4720 banked note
   had recorded, underscoring why the source-fidelity standard calls for
   re-fetching and re-diffing rather than authoring from a banked summary
   alone.
4. **Section 5 (staff-completed, out of scope both forms).** GPI-1:
   "popunjava policijski službenik ili nadležni organ" (completed by a
   police officer or competent authority). GPI-2: "popunjava DKP"
   (completed by the DKP). Both list the same fields (issuing-authority
   name, missing document's serial number, its date of issuance, a
   protocol number, an authorized officer's signature/stamp) — structurally
   identical, only the completing party differs. Excluded from this schema
   exactly as GPI-1 excludes its own Section 5.
5. Every other field (holder identity in Section 1, permanent/temporary
   residence in Sections 2-3, `documentStatus`, `issuingAuthority`,
   `dateOfLoss`, `circumstancesDescription`, and the filing/reporter-
   identification block) is identical in wording and position between the
   two forms and is carried over unchanged from GPI-1's own modelling
   decisions (see that document's own VERIFICATION.md for the rationale
   behind each, e.g. the `holderDateOfBirth`/`holderPlaceAndCountryOfBirth`
   split from a single combined heading, and the unpatterned ID-number
   validation).

## Disclosed findings and interpretation choices

1. **`receivingMissionName` and `authorityLossReportedTo` are both modelled
   as required**, matching this registry's own precedent on
   `receivingAuthorityName` in GPI-1 — both sit in the applicant-facing
   body of the form with no explicit mandatory marker printed, but no
   basis in the source to treat them as optional either.
2. **`filingPlace` is described here as "the place (city abroad)"** rather
   than GPI-1's "town/municipality" — GPI-2's own instructional footer
   states the receiving DKP must relay a copy to the document's issuing
   authority in Bosnia and Herzegovina, confirming this form's filing
   location is understood to be outside the country, unlike GPI-1's
   domestic filing.
3. **GPI-1's remaining interpretation choices carry over unchanged**: the
   date/place-and-country split on `holderDateOfBirth`/
   `holderPlaceAndCountryOfBirth`, `holderTemporaryAddress`/
   `holderTemporaryAddressPlace` modelled as optional, and
   `holderPersonalId`/`reporterIdCardNumber` modelled without a specific
   digit-count pattern — see GPI-1's own VERIFICATION.md Findings 1, 3, and
   4 for the full rationale, which applies identically here since these
   portions of the two forms are unchanged.
4. This schema does not re-screen DMV, Taxes, Visa, or National ID; Bosnia
   and Herzegovina's own standing findings for those verticals (DMV open/
   authored, Taxes authored, Visa a confirmed dead end, National ID
   authored) are unchanged by this companion-schema addition — see the
   Executive Summary and `CATALOG.md` Known Gaps entry 0p for the full
   record.

## Conformance

2 valid mock scenarios — `valid-stolen-passport-reported-to-local-police`
(exercises the DKP-abroad-filing scenario with a foreign local-police
`authorityLossReportedTo` and both optional temporary-residence fields
present) and `valid-lost-passport-no-temporary-residence` (exercises the
temporary-residence fields' absent case) — plus 20 static-`required`-field
mutation fixtures (one per `required: true` field) and 1 unknown-field-
rejected fixture, committed under
`conformance/ba/mup-rs/lost-or-stolen-travel-document-report-abroad/1.0.0/`.
This form has no conditional (`requiredWhen`) fields to gate — every
field's requiredness is unconditional, matching GPI-1's own finding.

An ephemeral, from-scratch conformance checker (deriving required rules
directly from this schema's own `fields[]`, discarded after use, not
committed) ran all 23 fixtures: both valid scenarios at 0 errors, all 20
mutation controls each raising exactly 1 error, and the unknown-field
fixture correctly rejected. Validated clean with `node tools/validate.mjs`
and `node tools/validate-ajv.mjs`, individually and as part of the full
registry run. `registry-index.json` regenerated via `npm run build-index`
in `tools/govschema-client/`.
