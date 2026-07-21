# Verification record — lv/ur/sole-trader-registration-kr2@1.0.0

## Candidate selection

GOV-4129 is a child of GOV-4128 ("GovSchema Standard Research"). Latvia's
Business Formation vertical — the Register of Enterprises' (Uzņēmumu
reģistrs) Form KR2 sole-trader registration form — was banked as a
pre-scouted, ready-to-author candidate in the prior cycle (GOV-4121/GOV-4124,
which opened Cyprus's Passport vertical instead) after Latvia's other five
verticals were screened and found weaker:

- **DMV (CSDD)** — fully `e.csdd.lv`-login-gated, no downloadable form.
- **Visa** — a confirmed field-for-field duplicate of the EU-harmonized
  Schengen Annex I template already modelled elsewhere in this registry.
- **Passport and National ID (PMLP)** — both in-person-appointment-only,
  with only a stale 2017 third-party-hosted specimen found for either.
- **Taxes** — not screened this cycle; Business Formation was the clear win
  regardless.

No re-scouting of alternative jurisdictions was needed this cycle — the
candidate was already fully identified and estimated by the prior cycle's
scouting pass.

## Reaching the live source

Fetched `https://apraksti.ur.gov.lv/lv/KR2%20veidlapa` fresh this cycle with
a plain `curl` request and a standard desktop User-Agent — no login,
CAPTCHA, or WAF gate encountered.

- HTTP 200, `Content-Type:
  application/vnd.openxmlformats-officedocument.wordprocessingml.document`,
  `Content-Length: 47737`. Served by a Drupal 11 site
  (`x-generator: Drupal 11 (https://www.drupal.org)`).
- sha256: `9073145e1ba75a2bd51c90b6cb6d4af51c1d6d18666383a9eac6fc838f326595`.
- `docProps/core.xml` records `dcterms:modified` of
  `2025-10-06T13:57:00Z` and `dc:creator`/`cp:lastModifiedBy` of two named UR
  staff — consistent with the pre-scouted estimate (~46KB,
  last-modified 2025-10-06).

## Structure of the source

This is a native, unauthenticated Word Open XML (`.docx`) document, not a
PDF — a born-digital form with a full, clean text layer (`word/document.xml`),
not a scan requiring OCR or visual rendering. It carries no Word
content-control (`w:sdt`) fields; every checkbox on the form is instead a
literal Wingdings glyph run
(`<w:sym w:font="Wingdings" w:char="..."/>`) embedded directly in the text
flow. Two distinct glyphs are used: `F0FD` (three occurrences) marks an
"Atzīmēt" ("Mark") instruction immediately preceding one or more selectable
options, and `F0A8` (five occurrences) is the empty checkbox glyph for each
individual option. Four of the five `F0A8` occurrences are real, fillable
checkboxes (custodian/guardian in Section 5; mail/email notification method
in Section 8); the fifth sits decoratively before the "Apliecinājums"
sub-heading in Section 4 and is not itself a selectable option. All ten of
the form's own numbered sections and every field below were extracted and
verified directly against the raw XML (paragraph and table-row boundaries),
not from a flattened text dump alone.

Three of the form's ten sections repeat the same identity-block shape: the
individual merchant (Section 1), an appointed guardian (Section 5), and a
person signing on the merchant's behalf (Section 6). Each prints the same
two-header pattern — "Personas, kurai Latvijas Republikā ir piešķirts
personas kods" ("...has been assigned a personal code") versus "...nav
piešķirts" ("...has not been assigned one") — gating two mutually exclusive
sub-blocks, with no checkbox distinguishing which applies. Each is modelled
with an invented `hasLatvianPersonalCode`-style gating boolean, the
convention this registry uses elsewhere a form draws its own either/or line
without a checkbox to encode it (e.g. `applicantIsMinor` in
`cy/crmd/passport-application`).

## Disclosed source-fidelity findings

1. **A structural asymmetry between the three identity sub-blocks.**
   Sections 1 and 5 both print an "Adrese, kurā persona ir sasniedzama" row
   under their "has a Latvian personal code" sub-header (with a "not
   obligatory unless no registered address" carve-out); Section 6's
   equivalent sub-header has no such address row at all — only "Personas
   kods." Modelled as printed (`signerHasLatvianPersonalCode` gates only
   `signerPersonalCode`, with no `signerAddress` counterpart), rather than
   assuming the omission was an oversight and adding a field the source
   does not have.
2. **The address-hierarchy rows in Section 3 carry no per-row conditional
   marker.** Latvia's own administrative structure means only a subset of
   Novads/Novada pilsēta-pagasts/Pilsēta/Ciems applies to any one address
   (an independent-city address uses "Pilsēta" alone; a rural address uses
   "Novads" plus "Ciems"; etc.), but the form gives no field-level signal
   distinguishing which combination is in play. All four rows are modelled
   unconditionally optional, with the ambiguity disclosed on each field
   rather than guessed at.
3. **Two distinct "not obligatory" carve-outs coexist for the same
   underlying concept.** The "has personal code" address row (Sections 1
   and 5) carries an explicit conditional carve-out ("not obligatory unless
   no registered address"); the "no personal code" address row immediately
   below it carries none. Modelled as two separate fields
   (`address`/`guardianAddress` vs. `foreignAddress`/`guardianForeignAddress`)
   rather than one shared field, to avoid collapsing two differently
   conditioned rows into a single requiredness rule.
4. **Section 10 (state-fee payment) is entirely conditionally skippable,
   with no field to gate on.** Its own header states the section is not
   filled in when the application is submitted via the Register of
   Enterprises' service portal (fee payable only through the portal) or
   when a separate payment-confirming document is attached — neither
   condition corresponds to a field anywhere on the form. Every Section 10
   field is modelled unconditionally optional; the natural-person/
   legal-person payer split still uses an invented gating boolean
   (`stateFeePayerIsLegalPerson`, itself optional) mirroring the
   personal-code either/or convention used elsewhere in this schema.
5. **Section 9's two signature slots carry no role label.** Both are
   printed identically ("Vārds," "Uzvārds," "Personas kods (ja nav personas
   koda, dzimšanas datums)," "Paraksts*," "Datums*") with nothing
   distinguishing whether the individual merchant, a guardian, or a
   representative belongs in the first slot versus the second. Disclosed on
   `signatory2*` rather than guessed at.
6. **Section 4's confirmation text has no individual checkboxes of its
   own.** The "Apliecinājums" sub-heading is preceded by a decorative
   Wingdings glyph (the fifth `F0A8` occurrence, distinct from the four real
   checkboxes described above), but the three "Apliecinu, ka:" bullet
   points beneath it are plain attestation text with no per-bullet
   checkbox. Modelled as one combined `documents[]` attestation statement
   (`microEnterpriseTaxStatusAttestation`) rather than three separate
   boolean fields.

## Conformance

2 valid mock scenarios
(`valid-natural-person-no-guardian.json`, an individual merchant with a
Latvian personal code, no guardian/custodian, and a portal submission that
skips Section 10 entirely;
`valid-foreign-person-with-guardian-and-payment.json`, an individual
merchant with no Latvian personal code who has an appointed guardian, a
representative-on-behalf signer, and a natural-person state-fee payment)
plus 8 mutation-control fixtures (a missing statically-required field; a
missing `personalCode` while `hasLatvianPersonalCode` is true; a missing
`foreignAddress` while `hasLatvianPersonalCode` is false; a missing guardian
identity field while `guardianAppointed` is true; both `custodianAppointed`
and `guardianAppointed` set true at once, violating their
`exclusivityGroup`; a missing `decisionNotificationEmailAddress` while
`notifyByEmail` is true; an invalid `personalCode` pattern; and an unknown
top-level field) are committed under
`conformance/lv/ur/sole-trader-registration-kr2/1.0.0/`.

An ephemeral, from-scratch mock validator (deriving required/`requiredWhen`/
`exclusivityGroups` rules directly from this schema's own `fields[]`/
`documents[]`, not committed) ran all 10 fixtures: both valid scenarios at 0
errors, all 8 mutation controls each raising exactly 1 error, and confirmed
every `requiredWhen` field reference resolves (0 dangling references).

`node tools/validate.mjs` and `node tools/validate-ajv.mjs` both pass at
569/569 for the full registry, individually and as part of the full run.

## Scope boundaries

This document models every applicant-facing field on the form's ten
sections. The source form carries no separate clerk-only or "for official
use" block to exclude. Filing occurs either on paper or through the
Register of Enterprises' own service portal (`registrs.ur.gov.lv`); this
schema does not file the application itself, and the live source is always
authoritative. GovSchema is independent and is not affiliated with,
endorsed by, or operated by the Republic of Latvia or its Register of
Enterprises.
