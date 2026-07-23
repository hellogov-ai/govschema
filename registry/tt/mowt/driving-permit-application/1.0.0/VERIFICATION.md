# Verification record — tt/mowt/driving-permit-application@1.0.0

## Candidate selection

GOV-4582 ("GovSchema Standard Research"). CATALOG.md's Known Gaps entry 0m
banked this candidate since the GOV-4568 cycle, which opened Trinidad and
Tobago as the registry's 91st jurisdiction and scouted four STRONG
verticals on official `.gov.tt` domains (Passport, DMV, Business Formation,
Taxes); Passport and Taxes were authored in the GOV-4568/GOV-4575 cycles.
This cycle picks up DMV — the Ministry of Works and Transport's (MOWT)
Form 4, "Application for Driving Permit(s)/Endorsement(s)" — leaving
Business Formation (Companies Registry Form 1, plus a Form 6
sole-proprietor statement already confirmed image-only with no extractable
text layer) as the sole remaining banked candidate.

## Reaching the live source

Known Gaps entry 0m recorded the source URL with an elided path
(`mowt.gov.tt/MOWT/media/General/Documents/.../Application-for-Driving-
Permits-Endorsement.pdf`) and the note that `mowt.gov.tt` needs `curl -k`
(a broken TLS certificate chain). The full path was not re-derivable from
the live site's own navigation this cycle: `mowt.gov.tt`'s Kentico-CMS-
rendered HTML pages (e.g. `/Services`, `/Divisions/Transport-Division/...`)
consistently returned HTTP 404 to a direct `curl` fetch — including with a
realistic desktop `User-Agent` — while the static-file `/MOWT/media/...`
path segment fetched cleanly, the same host-specific split this registry
has seen before (bot-mitigated HTML shell, unmitigated document library).
A web search recovered the exact live path,
`https://www.mowt.gov.tt/MOWT/media/General/Documents/New%20Transport%20
Division%20Forms%20-%20September%2016th%202020/Application-for-Driving-
Permits-Endorsement.pdf`, independently corroborated by three different
result snippets (including one explicitly captioned "FORM 4 Government of
the Republic of Trinidad and Tobago").

- Required `curl -k` (TLS certificate verification bypass) — a plain `curl`
  without it fails at the TLS handshake, matching the Known Gaps entry's own
  disclosed finding; a connectivity/certificate-chain characteristic of the
  host, not a login/CAPTCHA/WAF content gate.
- HTTP 200, `Content-Type: application/pdf`, **125,793 bytes** — matches the
  byte count independently recorded when this candidate was first banked in
  GOV-4568, confirming the source has not changed since.
- sha256 of the retrieved bytes:
  `528de723f2b6cec474ffa9c26936f12cd270a7bc5a7650b8b7bdaf333f0dd5a2`.
- PDF header `%PDF-1.6` at byte 0, 2 pages, confirmed via `pdfjs-dist`'s
  `numPages`.
- `getFieldObjects()`/`getAnnotations()` returned 72 named AcroForm fields
  across both pages (52 on page 1, 20 on page 2) — a genuine interactive
  form, unlike some other registry sources in this jurisdiction group.

### Authority attribution

The document's own header prints "GOVERNMENT OF THE REPUBLIC OF TRINIDAD
AND TOBAGO", cites "Motor Vehicles and Road Traffic Act, Chap. 48:50
Regulation 18", and is hosted under the Ministry of Works and Transport's
own Transport Division document library. This schema attributes `authority`
to the Ministry of Works and Transport (MOWT, `mowt.gov.tt`), the issuing
ministry whose own domain hosts the form and whose Transport Division/
Licensing Authority processes driving-permit applications.

## Extraction method

`pdfjs-dist` (vendored at `/tmp/node_modules/pdfjs-dist`) `getTextContent()`
read every text item's raw string and `transform` x/y position on both
pages, and `getFieldObjects()`/`getAnnotations()` enumerated every named
AcroForm field with its rect. Field-to-label mapping was derived by
cross-referencing each field's rect position against the nearest printed
text at the same y-coordinate (e.g. the `Classification1`-`Classification4`
checkboxes at y=702.9 line up under "Motorcycle / Light Motor Vehicle /
Heavy Motor Vehicle / Extra Heavy Motor Vehicle"; `Classification5`-`7` at
y=687.2 line up under "Omnibus / Tractor Wheel/Truck / Other" — 7
checkboxes for 7 printed options, not 8, since "Tractor Wheel/Truck" prints
as one combined option rather than two). The document is plain English
with clean, non-rasterized embedded fonts — the text layer extracted
completely and unambiguously; no glyph-mapping or pixel-scan workaround was
needed.

## Document structure

Page 1: Questions 1-14, the universal core application every transaction
type completes (permit type/classification/use; applicant particulars;
contact information; driving-permit history; endorsements, disqualification,
fitness declaration, and signature). Page 2: Question 15 (a notarized
statutory declaration, required only of "Duplicate" transaction applicants,
per the form's own Instructions to Applicants item 2), followed by the
Instructions to Applicants themselves and a "For Official Use" box.

## Scope

This v1.0.0 schema models Questions 1-14 only — the portion the form's own
Instructions to Applicants (item 1) states every applicant completes
regardless of transaction type. Two things are excluded, both disclosed
here rather than silently dropped:

1. **Question 15** ("Declaration in Respect of Application for Duplicate
   Driver's Permit, Taxi Driver's Licence/Badge, Motor Vehicle Licence,
   Conductor's Permit") — a formal statutory declaration under the
   Statutory Declarations Act Chap. 7:04, sworn before a Commissioner of
   Affidavits, required only of "Duplicate" transaction applicants (a
   minority of the five transaction types). Structurally it repeats the
   same conceptual values (the permit/licence/badge type held, and its
   number) across three near-identical prose blocks — "I am the holder of
   ___ No ___", "The said ___ No ___ was lost or stolen...", "The said ___
   No ___ was destroyed..." — with the applicant expected to complete only
   whichever of the lost/stolen or destroyed blocks applies, a distinction
   the specimen does not encode as a toggleable field. Combined with its
   requirement of in-person notarization (a step no agent-assisted
   remote filer can complete), this is out of scope for v1.0.0, on the same
   footing as this registry's standing practice of excluding sections that
   require a third-party official's in-person participation (e.g. the
   Uganda driving-licence schema's own excluded doctor's Medical Exam
   section, GOV-4335) — left as disclosed open backlog for a future cycle
   if a documented design for the repeated-value/either-or structure is
   worked out.
2. **The companion Form 12** ("Form of Medical Certificate for an Applicant
   for a Permit to Drive Motor Vehicles") — a wholly separate document
   (its own file, its own form number) completed entirely by a Registered
   Medical Practitioner based on a clinical examination (blood pressure
   reading, Snellen's-test visual acuity, subjective fitness judgments), not
   by the applicant. No agent assisting a human applicant can supply this
   content on the applicant's behalf; excluded outright, the same reasoning
   already applied to doctor-completed medical-exam content elsewhere in
   this registry (GOV-4335).

Within Questions 1-14, two fields (`applicationDate`, `signatureOfApplicant`)
are modelled from plain printed text ("Date:" / "Signature of Applicant")
even though — unlike every other field in this schema — the specimen
carries no distinct AcroForm annotation at that position; both are
disclosed as a finding rather than silently included as if backed by a
real interactive field.

## Disclosed findings and interpretation choices

1. **`ttPermitNumber`/`ttPermitIssueDate`/`authorisedVehicleClass` are
   gated `requiredWhen` an `any` condition over `currentlyHoldsTtPermit`
   OR `previouslyHeldTtPermit`**, per the form's own printed instruction,
   "If 'yes' to (i) or (ii) state number and date of Issue below" (Question
   9(iii)) — using GSP-0013's `any` condition composition, since this is a
   genuine two-field OR, not a single-field equality gate.
2. **`authorisedVehicleClass` is modelled as a free-text string, not the
   `vehicleClassification` enum reused** — the printed Instructions to
   Applicants define `vehicleClassification`'s 7 categories specifically
   for a *new* application; an applicant's *existing* permit (Question
   9(iv)) may print a different, older classification scheme the source
   does not itself enumerate.
3. **`sex`, like this registry's other Trinidad and Tobago schemas, is
   modelled from two independent checkbox annotations (`GenderM`/
   `GenderF`), not a single radio-button field** — `getFieldObjects()`
   confirms each is its own standalone widget (matching the
   `Transaction1`-`5`/`Classification1`-`7`/`Use1`-`3` pattern), not a
   shared-parent radio group; modelled as a mutually-exclusive `enum` per
   this registry's standing practice for this pattern.
4. **`endorsementParticulars` is modelled `required: false`** — the form's
   own Question 11 asks for particulars "of any endorsement(s) ... which
   you held or now hold", with no accompanying yes/no gate; left blank if
   the applicant has none to disclose, the same convention this registry
   applies to analogous open-text disclosure fields elsewhere.
5. **`disqualificationParticulars` is `requiredWhen previouslyDisqualified
   equals true`**, per the form's own printed "If 'yes' give particulars"
   directly beneath Question 12's yes/no gate.
6. **Postal (Question 8) fields are all `required: false`, with no
   `requiredWhen` gate** — the section's own header, "Contact Information
   if different from (7)", is conditional by its own wording but the
   specimen provides no boolean toggle field to key a `requiredWhen`
   condition on; modelled as ordinary optional fields with a `description`
   documenting the condition, following this registry's `lv/vid`-family
   precedent for a printed-but-unkeyable condition.
7. **Phone fields are split into three sub-fields
   (`residentialPhoneAreaCode`/`Exchange`/`Number` and the `postal*`
   equivalents)**, matching the three distinct AcroForm text-field widgets
   and rect widths printed under "Phone (   )    -    " (area code ~3
   digits, exchange ~3 digits, number ~4 digits — confirmed via each
   field's own rect width in `getFieldObjects()`), consistent with this
   registry's own precedent of one schema field per printed input box
   rather than a single concatenated phone-number field.
8. **Excluded as official-use-only, not applicant-supplied data:** page 2's
   "For Official Use" box.

## Conformance

3 valid mock scenarios — `valid-first-issue-motorcycle` (a first-time
motorcycle applicant with no prior permit history and no postal-address
override); `valid-renewal-with-prior-permit` (a renewal applicant
exercising the `currentlyHoldsTtPermit`-gated `ttPermitNumber`/
`ttPermitIssueDate`/`authorisedVehicleClass` trio, plus a postal address
different from the residential address); and `valid-provisional-with-
disqualification-disclosed` (a provisional applicant who discloses a past
disqualification, exercising `disqualificationParticulars`'s `requiredWhen`
gate) — plus 12 mutation-control fixtures (one missing statically-required
field from each of `transactionType`, `vehicleClassification`, `useType`,
`surname`, `firstName`, `sex`, `placeOfBirth`, `dateOfBirth`, `nationality`,
`residentialAddressStreet`, `residentialAddressCity`,
`currentlyHoldsTtPermit`, `previouslyHeldTtPermit`, `holdsPermitElsewhere`,
`previouslyDisqualified`, `physicallyMentallyFit`, `declarantName`,
`applicationDate`, `signatureOfApplicant` — 19 fixtures, one per statically
required field) and one unknown-field-rejected fixture, committed under
`conformance/tt/mowt/driving-permit-application/1.0.0/`.

An ephemeral, from-scratch conformance checker (deriving required/
requiredWhen rules directly from this schema's own `fields[]`, discarded
after use, not committed) ran all 23 fixtures: all 3 valid scenarios at 0
errors, all 19 static-required mutation controls each raising exactly 1
error, the unknown-field fixture correctly rejected, and confirmed every
`requiredWhen` field reference (including the two `any`-composed
conditions) resolves to a real field name (0 dangling references).
Validated clean with `node tools/validate.mjs` and
`node tools/validate-ajv.mjs`, individually and as part of the full
registry run.
