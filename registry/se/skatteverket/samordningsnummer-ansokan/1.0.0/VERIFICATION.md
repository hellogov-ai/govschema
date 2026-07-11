# Verification record — se/skatteverket/samordningsnummer-ansokan@1.0.0

## Why this candidate (GOV-2372, "GovSchema Standard Research")

Sweden stood at 5 of 6 verticals (Business Formation, DMV, Visa, Taxes,
Passport published via GOV-2363/PR #387; National ID & Civic Documents
was Sweden's sole remaining open, unscreened vertical per that cycle's own
disclosure). This session's task named Skatteverket's (the Swedish Tax
Agency) form SKV 7540, "Samordningsnummer – Ansökan" (Coordination Number —
Application), as a pre-scouted candidate: the personnummer-equivalent
identity mechanism for people with a connection to Sweden who are not
registered residents (foreign workers, students, property owners, etc.).
Every figure the pre-scout supplied was independently re-verified this
session rather than trusted at face value — see below.

## Source fetch, including a disclosed discrepancy from the pre-scout

- Info page: `https://www.skatteverket.se/privat/etjansterochblanketter/blanketterbroschyrer/blanketter/info/7540.4.339cd9fe17d1714c077642d.html`
  — fetched fresh this session: HTTP 200, 89,606 bytes.
- The task's literal direct-PDF URL (`https://www1.skatteverket.se/lcmp2/lc_webapp/secure/PdfServlet.do?formularID=7540&sprak=sv&format=sform`)
  returned **HTTP 302 to a login page** (`login.do`) when fetched fresh from
  this session's sandbox with a plain GET — a genuine discrepancy from the
  pre-scout's claim of "no login/BankID needed", disclosed here rather than
  silently reconciled or worked around invisibly.
- **Correction from GOV-2375's independent review re-derivation:** the
  original hypothesis here — that the info page's embedded GET `<form>`'s
  hidden `formPageURL` parameter (the info page's own canonical URL) is
  what the bare query string omitted, and that replaying it is what makes
  the fetch succeed — does **not** hold up under a fresh, cold re-fetch.
  Replaying the exact `formularID=7540&sprak=sv&format=sform&formPageURL=<info
  page URL>` parameter set on a brand-new connection still 302s to
  `login.do`, identically to the bare query string. What actually gates
  access is a **two-request session/WAF cookie handshake**: *any* first
  `GET` to `PdfServlet.do` — with or without `formPageURL` — receives a
  `JSESSIONID` plus three F5/BIG-IP-style `TS...` cookies (and `cw1`/
  `ZiAnonymous`); a *second* `GET` reusing those cookies then succeeds —
  **HTTP 200, `application/pdf`** — independently of whether `formPageURL`
  is present (confirmed by replaying the plain bare-parameter URL as the
  second request and getting an identical successful result). This is
  anti-automation cookie-bootstrapping at the WAF layer, not a
  missing-parameter servlet-routing quirk as originally described, and
  still not a genuine BankID/login authentication gate — no credentials
  are ever exchanged either way. The practical conclusion is unchanged
  (this form is genuinely fetchable unauthenticated once the session
  cookies are primed, with a genuine `%PDF-1.7` header and the same 82
  widgets / field structure documented below); only the causal
  explanation is corrected here.
- **SHA-256:** `8f24e223860b73c9b93fbd3d82321c3448fa55213de4a01c2ef4dc19085352f2`
- **Byte size:** 125,496 bytes — close to but not identical to the
  pre-scout's ~125,387-byte estimate. Both figures are consistent with the
  same edition of the same form; the small difference is most likely
  session/response variance in the servlet's dynamically-assembled response
  (it embeds Oracle DMS request-tracking metadata) rather than a different
  document, and does not affect this schema's field mapping. Disclosed
  rather than silently reconciled to the pre-scout's number.
- `tools/verify-sources.mjs` flags this same bare-parameter URL with a
  transient-failure **warning** (not a hard failure) when re-checked without
  a browser session, for the same underlying reason: the CI-side check
  makes a single request and does not perform the two-request
  session-cookie handshake described above (regardless of `formPageURL`).
  This is expected and disclosed here so a reviewer does not mistake it for
  a dead link — the form remains live and fetchable, as demonstrated above.

## Extraction technique

`pdfjs-dist@3.11.174` (`legacy/build/pdf.js`, a throwaway `/tmp` scratch
install, not added to this repo's tracked `package.json`) was used via
`page.getAnnotations()` per page:

- **Page 1** (the applicant-facing page): **33 Widget annotations** — 24 `Tx`
  text fields, 2 `Btn` widgets forming one genuine 2-option radio group
  (`Kön`/sex), and 4 independent `Btn` checkboxes (`krsAlternativ[0-3]`, the
  "Vilken anknytning har du till Sverige?" connection-to-Sweden question).
- **Page 2**: **49 Widget annotations**, entirely `Tx`/`Btn` fields nested
  under a form hierarchy rooted at `subSKVAnt`/`subDok1`/`subDok2`/
  `subOvrigt`/`subUtfordAv`.
- **Total: 82 widgets** (33 `Tx` + 49 `Btn`), exactly matching the
  pre-scout's count, despite the byte-size discrepancy above.

`page.getTextContent()` was extracted for both pages with per-item x/y
coordinates, and independently confirms page 2's own printed heading reads
verbatim: **"Skatteverkets anteckningar (fylls i av myndigheten)"**
("The Tax Agency's notes (completed by the authority)") — establishing,
independently of the task brief, that the entire second page is
caseworker-only. Every one of page 2's 49 widgets sits under a checklist
for an in-person identity-verification appointment: document type (pass /
EU-EES ID card / uppehållstillståndskort / annat), whether the document has
a biometric chip, automated/MRZ/UV/ink/RFID checks, facial-comparison
status, and the officiating caseworker's own name and service office
(`Utförd av` — `Förnamn och efternamn`, `Servicekontor (ort)`). None of it
is modelled.

## Field structure: 33 page-1 widgets → 30 applicant-facing fields

Two collapses account for the 33→30 reduction, both disclosed rather than
silently applied:

1. **`gender`**: the two `Btn` widgets forming the `Kön` radio group
   (`radioButton: true`, confirmed via `getAnnotations()`) collapse into one
   `enum` field. Coordinate cross-reference (`getTextContent()` item
   positions) confirms `buttonValue "0"` sits directly beneath the printed
   "Man" label and `"1"` beneath "Kvinna", fixing the `enum` order
   (`["man", "kvinna"]`).
2. **The two `Underskrift` widgets are excluded, not modelled.** Both are
   genuine `Tx` (text-type) widgets, but both are marked `readOnly: true` in
   `getAnnotations()` — i.e. the AcroForm layer itself does not allow
   digital fill-in for these two boxes, unlike every other `Tx` widget on
   the page. This is a distinct case from this registry's more common
   "no widget at all for a wet-ink signature line" finding (e.g. `dk/cpr`,
   `no/skatteetaten`, `fi/dvv`): here a widget exists, but it is
   structurally non-fillable, so it is excluded from `fields[]` for the same
   underlying reason (no data-entry mechanism), disclosed as a distinct
   variant of that same convention.

No other page-1 widget required merging or splitting; every remaining
widget maps 1:1 to a `fields[]` entry.

## Two disclosed modelling judgment calls

1. **The Swedish and foreign contact-address blocks are each left fully
   optional, field-by-field**, even though Skatteverket's own info-page
   prose states a contact address is mandatory: *"Du ska också uppge en
   kontaktadress... Kontaktadressen kan vara i Sverige eller i ett annat
   land"* ("You must also state a contact address... The contact address
   can be in Sweden or in another country"), and the foreign-address block's
   own printed instruction — *"Anges endast om svensk kontaktadress
   saknas"* ("Specify only if a Swedish contact address is missing") —
   implies the two blocks are meant as alternatives, not independent
   options. **Unlike** Norway's `addressType` street/property choice (which
   has a dedicated 2-option `Btn` pair to gate a `requiredWhen` condition
   on), this form prints **no selector field** distinguishing which of the
   two address blocks the applicant intends to use. Per this registry's
   established "spec precision over cleverness" convention (see `fi/dvv`'s
   `maritalStatus`, `no/skatteetaten`'s mailing-address exclusivity, and
   this cycle's own task brief, which explicitly names this as the
   preferred approach when no printed field exists to key a condition on),
   no synthetic gating field is invented; the "at least one contact address
   is required" constraint is disclosed in each address field's own
   `description` and in this schema's top-level `description`, not enforced
   structurally.
2. **The non-exclusive "Vilken anknytning har du till Sverige?" checkbox
   group** (family / student / owns-or-rents-housing / other) is modelled
   as **four independent optional booleans with no `exclusivityGroups`
   entry**, since all four `Btn` widgets are confirmed independently
   checkable (`checkBox: true`, `radioButton: false` on every one, via
   `getAnnotations()`) and the form's own layout permits selecting more than
   one (e.g. an applicant could plausibly be both a student and a housing
   owner) — unlike this registry's `se/polisen` precedent's mutually
   exclusive travel-document-type row, which uses `exclusivityGroups`
   because only one of its three options can apply.

## `documents[]`: sourced from the info page, not the PDF's own text layer

This form's PDF has no in-PDF attachment checklist on its applicant-facing
page. The identity-verification document requirement is instead stated only
on Skatteverket's own SKV 7540 info page (fetched fresh this session):
*"Vid identitetskontrollen ska du överlämna pass, identitetskort eller annan
motsvarande handling. Har du uppehållstillstånd i Sverige ska du även
överlämna ditt uppehållstillståndskort."* ("At the identity check, you must
hand over a passport, ID card, or other equivalent document. If you hold a
residence permit in Sweden, you must also hand over your residence permit
card.") This yields two `documents[]` entries:

- `identityDocument` — `required: true` (always needed for the mandatory
  in-person identity check).
- `residencePermitCard` — `required: false`, conditional on the applicant
  holding a Swedish residence permit, a status this form has no field to key
  a `requiredWhen` gate on — left descriptive, following this registry's
  established convention for the same class of gap (e.g. `fi/dvv`'s
  `proofOfWorkOrStudy`).

## Excluded (not modelled), and why

- **The entire page-2 "Skatteverkets anteckningar (fylls i av myndigheten)"
  section** — 49 widgets — per the form's own printed heading, confirmed
  independently via `getTextContent()` (see "Extraction technique" above),
  consistent with this registry's `dk/cpr`, `no/skatteetaten`, and
  `fi/dvv` precedent for excluding an authority-completed in-person-process
  section.
- **The two `Underskrift` (signature) widgets** — see "Field structure"
  above: genuine `Tx` widgets, but `readOnly: true`, i.e. non-fillable.

## Mock conformance test run

Two valid scenarios and four mutation controls were built under
`conformance/se/skatteverket/samordningsnummer-ansokan/1.0.0/` and checked
with a disposable checker script (`/tmp/se-skv-extract/check_conformance.mjs`,
not committed — same technique used across this registry's other v1.0.0
cycles) that evaluates every field's `required`/`requiredWhen`/`visibleWhen`/
`validation` (`pattern`, `enum`, `minLength`/`maxLength`, `minimum`/
`maximum`) **and** every `documents[]` entry's `required`/`requiredWhen`
explicitly — not just `fields[]`, per this registry's own documented blind
spot (a disposable checker limited to `fields[]` alone has previously
reported a false "0 errors" on a schema with unconditionally-required
documents; see `conformance-checker-documents-blind-spot` precedent):

- `application-packet-minimal-required-only.json` — a single applicant
  (Indian citizen on a remote-work assignment) with only the required
  fields and the required `identityDocument` filled. **0 errors.**
- `application-packet-full-family-of-two-signatories.json` — a minor
  applicant (Brazilian citizen moving to live with a parent in Stockholm),
  both connection checkboxes (family + student) ticked, a Swedish contact
  address filled in full, both signatory columns completed (parent 1 and
  parent 2, per the form's own "both custody holders must sign for a minor"
  instruction), and both `documents[]` entries provided. **0 errors.**
- **Four mutation/negative controls**, each derived from the minimal
  scenario with exactly one defect introduced:
  1. removing required `signatory1Phone` → `missing-required`.
  2. dropping the required `identityDocument` from `documents[]` →
     `missing-required-document`.
  3. setting `gender` to `"other"` (violates `validation.enum:
     ["man", "kvinna"]`) → `enum-violation`.
  4. setting `addressLine1Abroad` to a 36-character string (violates
     `validation.maxLength: 35`) → `max-length-violation`.

  All four were correctly and individually flagged with exactly 1 error
  each, confirming the checker script discriminates rather than trivially
  passing every input, and that `documents[]` requiredness specifically
  (mutation 2) is genuinely exercised, not just asserted.

## Registry validation

- `node tools/validate.mjs registry/se/skatteverket/samordningsnummer-ansokan/1.0.0/schema.json` → `ok`, 1/1 passed
- `node tools/validate-ajv.mjs registry/se/skatteverket/samordningsnummer-ansokan/1.0.0/schema.json` → `ok` against the v0.3 meta-schema, 1/1 validated
- `node tools/validate.mjs` (full registry run) → 361/361 documents passed, 3/3 `mapping.json` companions passed
- `node tools/verify-sources.mjs registry/se/skatteverket/samordningsnummer-ansokan/1.0.0` → "1 directory, 4 URLs checked, 1 warning(s), 0 allowlisted, all clear" — the one warning is the bare-parameter `PdfServlet.do` URL discussed above (a servlet-routing quirk, not a dead link)
- `tools/govschema-client/registry-index.json` regenerated via `npm run build-index` (361 entries)

## Scope and jurisdiction notes

This closes Sweden's National ID & Civic Documents vertical, bringing
Sweden to **6 of 6 verticals** (Business Formation, DMV, Visa, Taxes,
Passport, National ID) — no vertical remains open for Sweden. Per
CATALOG.md's own "By Jurisdiction" table, Sweden joins a set of 18
jurisdictions in this registry now at full 6/6 vertical coverage (a mix of
jurisdictions from the registry's original launch set and later additions
such as Colombia and Denmark) — this is a real milestone for Sweden, not a
rare one for the registry as a whole, and this document does not claim
otherwise. This schema does not submit the application on the applicant's
behalf, and does not replace the mandatory in-person identity-check
appointment at a Skatteverket service office; the live source
(skatteverket.se) is always authoritative. GovSchema is independent and is
not affiliated with, endorsed by, or operated by the Kingdom of Sweden or
Skatteverket.
