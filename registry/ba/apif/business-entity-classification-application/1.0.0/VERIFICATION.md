# Verification record — ba/apif/business-entity-classification-application@1.0.0

## Candidate selection

GOV-4713 ("GovSchema Standard Research"). This cycle re-scanned CATALOG.md
fresh and found every recently-banked backlog candidate for a
partway-open jurisdiction exhausted: Kyrgyzstan's, Belgium's, Hungary's,
Tunisia's, Mauritius's, and Trinidad and Tobago's remaining verticals are
each a confirmed dead end, weak/unreachable, or already screened with no
live candidate. Kosovo's ARBK Form A0 (LLC registration,
`arbk.rks-gov.net`, live and unauthenticated) was scouted first and
confirmed HTTP 200, but Kosovo has no ISO 3166-1 alpha-2 country code
(contested statehood; not an ISO member for country codes) — this
registry's own `id` and `jurisdiction.country` fields require one (per
`spec/v0.3/govschema.schema.json`), and adopting an ad-hoc code (e.g. the
widely-used but non-ISO "XK") would be a governance precedent for how
this registry handles non-ISO-recognized territories, not a build
decision — set aside without authoring, disclosed here rather than
silently dropped, for the Founding Engineer/CEO to decide if raised
again. Bosnia and Herzegovina (ISO code `BA`, uncontested) was scouted
next.

## Reaching the live source

APIF (Agencija za posredničke, informatičke i finansijske usluge) is
Republika Srpska's own registry authority, administering the Register of
Business Entities (Registar poslovnih subjekata, RPS) — one of Bosnia and
Herzegovina's two constituent entities (Federation of Bosnia and
Herzegovina and Brčko District each run separate registration systems,
not covered by this schema).

`https://www.apif.net` uses a legacy TLS configuration (Diffie-Hellman
key size below modern OpenSSL's default security level) that a plain
`curl` rejects with `SSL routines::dh key too small`; every fetch against
this domain in this cycle used `--ciphers 'DEFAULT@SECLEVEL=1'` to
downgrade the client's own minimum acceptable security level for this
one connection.

APIF's "Registar poslovnih subjekata" page
(`https://www.apif.net/index.php?option=com_content&view=article&id=140%3Aregistar-poslovnih-subjekata-2&catid=15&lang=bs&Itemid=270`,
HTTP 200) lists dozens of real, directly-linked PDF/ZIP forms with no
login/CAPTCHA/WAF gate. Two candidates were found and compared:

1. **`Prijava za registraciju poslovnih subjekata u sudu v8.zip`** (the
   agency's own primary "Application for registration of business
   entities with the court") — fetched (HTTP 200, 4,858,165 bytes zipped;
   the contained PDF is 4,983,253 bytes, sha256
   `818735da72b6f7843d749b5ed978a432a3d8328a39ef874a74025ca02b8680d1`).
   **Confirmed a dynamic XFA (Adobe LiveCycle) form, not a static
   AcroForm or flat text-layer PDF** — see "Extraction method, candidate
   1" below. Not authored; this is a genuinely new PDF-extraction failure
   mode for this registry (distinct from every prior flat-scan, vector-
   checkbox, or non-sequential-reading-order case documented in
   `gov-form-pdf-extraction`), disclosed here as a dead end for this
   toolchain, not a dead end for the underlying government process
   itself.
2. **`APIF_PRIJAVA-RPS1.pdf`** ("Form RPS-1", Application for
   Classification of a Business Entity by Activity) — fetched directly
   (`https://www.apif.net/images/dokumenti/APIF_PRIJAVA-RPS1.pdf`, HTTP
   200, `Content-Type: application/pdf`, 212,229 bytes, sha256
   `e2229b6f432342498c4106562d14900b12d369c062e99389697a3a227fab16ff`,
   `Last-Modified: Tue, 14 Jan 2020`, confirming a long-stable specimen).
   A clean, flat (non-AcroForm) 4-page PDF with a real extractable text
   layer. **Authored, as this v1.0.0.** RPS-1 is not a mere companion
   annex to the XFA court-registration form: it is independently filed
   directly with APIF (whose own registry, the RPS, RPS-1 is literally
   named for) to enter/update a business entity's classification
   profile — a genuine, freestanding government registration action in
   its own right, confirmed by the form's own instruction sheet ("Извод
   из Упутства за попуњавање пријаве РПС-1") describing it as filed "у
   случају настанка или престанка пословног субјекта" (in case of
   establishment or cessation of the business entity), among other
   trigger events.

## Extraction method

`pdfjs-dist` (vendored at `/tmp/node_modules/pdfjs-dist`,
`legacy/build/pdf.js` — the `.mjs` entry point referenced in this
registry's own prior sessions was not present in this environment's
install; the legacy CommonJS build was used instead with no functional
difference).

**Candidate 1 (rejected):** `getDocument().promise` reports a single page
whose only extractable text is Adobe's own standard "Please wait... If
this message is not eventually replaced by the proper contents of the
document, your PDF viewer may not be able to display this type of
document" placeholder. `getAnnotations()` returns zero `/Widget`
annotations. `getFieldObjects()` returns `null`. `doc.isPureXfa` reports
`false` (the raw bytes contain no literal `XFA` string, likely because
the `/AcroForm` dictionary pointing to the XFA packet streams is itself
stored inside a compressed object stream that a plain byte-search does
not decompress), yet `getJSActions()` returns Adobe's own
`!ADBE::0200_VersChkCode_XFACheck` script verbatim, which explicitly
branches on `xfa_installed`/`xfa_version` and prompts the reader to
install the "XFA" Acrobat plugin component — conclusive confirmation
this is a dynamic XFA form outside pdfjs's (and this toolchain's)
rendering capability, not a corrupt or encrypted file. No further
extraction attempted.

**Candidate 2 (authored):** `getAnnotations()` confirmed zero `/Widget`
annotations across all 4 pages — a flat, non-AcroForm specimen, matching
this registry's already-documented flat-PDF pattern. `getTextContent()`
read every text item's raw string and its `transform` x/y position for
pages 1-3 (the form's own 3 content pages); page 4
("Извод из Упутства за попуњавање пријаве РПС-1") is the form's own
official field-by-field instruction sheet and was read in full to
recover authoritative enum value lists, requiredness carve-outs, and
scoping boundaries — a genuinely strong source, comparable to this
registry's own precedent of preferring an authority-published completion
guide over inference from the blank form alone (e.g. `hu/nav`'s
"nyomtatványkép" companion guide, `lv/vid`'s Cabinet Regulation
citations). Text items read in natural top-to-bottom order on every
page with no non-sequential-reading-order or vector-checkbox complication
encountered this cycle (Cyrillic Serbian text throughout; no glyph-index
scrambling observed).

## Document structure

Page 1: Section I "ОПШТИ ПОДАЦИ" (general data — firm name (full and
abbreviated), organization form, ownership form, capital origin,
territorial scope, foreign-trade registration), Section II "ПОДАЦИ О
СЈЕДИШТУ И АДРЕСИ" (seat and address — postal code/settlement,
street/number, municipality/city, entity/district, phone, fax, email,
director/manager name, JMBG/JIB, sex), and the start of Section III
"ПОДАЦИ ИЗ ДРУГИХ РЕГИСТАРА" (identification number from other
registers — tax-authority JIB), plus a bottom "Попуњава АПИФ" (Filled in
by APIF) block (registration authority, registration number, date of
entry into the special register) that is authority-populated and
excluded. Page 2: Section IV "ПОДАЦИ О ДЈЕЛАТНОСТИ" (activity data — a
change-of-core-activity table applicable only to later reclassification
events, not modelled here; core activity proposal and APIF's own
determined-activity field, the latter authority-populated and excluded;
number of employees) and Section V "ПОДАЦИ О ПОСЛОВНОМ СУБЈЕКТУ КОЈИ ВОДИ
ПОСЛОВНЕ КЊИГЕ" (the accounting-responsible firm/bookkeeper's own JIB,
matični broj, address, phone, and name). Page 3: Section VI "ПОДАЦИ О
ПРОМЈЕНИ" (type of change — 1.1 emergence, codes 11-16; 1.2 cessation,
codes 21-29; 1.3 other changes, codes 31-92, multi-selectable) and the
closing applicant-declaration block (completed-by name, date, JMBG,
ID-card/passport number and place of issuance, plus a "М.П." seal
placeholder — a physical stamp box, not applicant-entered data, and
excluded). Page 4 is the form's own instruction sheet, read for context
but not itself a fillable page.

## Disclosed findings and interpretation choices

1. **`businessNameAbbreviated` is modelled as optional (`required:
   false`)**, unlike `businessNameFull`. The instruction sheet describes
   how to complete both (1.1 as the full statutory name, 1.2 as the
   abbreviated statutory name) but states no independent requiredness for
   either; not every registered entity necessarily has a distinct
   statutory abbreviated name, so the more permissive reading is taken
   and disclosed here rather than asserted, consistent with this
   registry's precedent (`notequals-empty-string-absent-field-bug`,
   the KG STI-163 cycle's own `iin` finding) of not fabricating a
   requirement the source does not itself state.
2. **`organizationForm`'s enum splits the instruction sheet's own
   "удружење фондација" (no comma) into two separate values, `association`
   and `foundation`.** Association (удружење) and foundation (фондација)
   are two well-established, structurally distinct legal-entity forms
   under regional civil law (also seen independently enumerated
   elsewhere in this same instruction line, e.g. "вјерска
   организација/заједница" is punctuated with a slash where the source
   intends a genuine either/or, unlike this bare juxtaposition); reading
   them as one hybrid literal token would not match any real legal form.
   Disclosed as an interpretation choice, not a literal transcription,
   since the source's own line has no comma or slash separating these two
   specific words.
3. **`entityOrDistrict` is modelled as free-text `string`, not an
   `enum`**, unlike `organizationForm`/`ownershipForm`/`capitalOrigin`/
   `territoryEstablishedFor`. The instruction sheet gives an explicit
   "уписати један од сљедећих одговора" (write one of the following
   answers) closed list for each of those four items; for Section II's
   own "ентитет/дистрикт" item, the instruction sheet only says to write
   in the entity/district as part of the seat address ("уписати ...
   општину, ентитет/дистрикт ...") with no enumerated value list
   attached. Rather than assume this must be one of Bosnia and
   Herzegovina's three constituent parts (Republika Srpska, Federation of
   Bosnia and Herzegovina, Brčko District) — a plausible but unstated
   inference — this field is modelled as free text, disclosed here as a
   judgment call a future cycle could tighten if a completion guide
   states otherwise.
4. **`directorSex` is modelled as unconditionally optional**, despite
   item 8.2 printing a plain "мушки-1/женски-2" (male/female) choice.
   Item 8.1 ("ЈМБГ/ЈИБ") itself accepts either a natural person's JMBG or
   a legal entity's own JIB as the director/manager identifier, meaning
   the director/manager need not be a natural person — in which case a
   sex marker has no referent. The form provides no separate
   individual-vs-entity discriminator field to gate on; rather than
   invent one, `directorSex` is left optional and the structural tension
   disclosed here, following this registry's stated preference (see
   `notequals-empty-string-absent-field-bug`) for gating only an
   unambiguous case over fabricating an unstated condition.
5. **`accountingFirmRegistrationNumber` is modelled as optional**, unlike
   the other four Section V fields. The instruction sheet states this
   section must be completed "без обзира да ли је књиговођа запослен у
   пословном субјекту или у оквиру специјализоване књиговодствене
   фирме" (regardless of whether the bookkeeper is employed within the
   business entity itself or within a specialized bookkeeping firm). When
   the accounting-responsible firm is the very entity being registered
   by this same application (in-house/self-accounting), that entity's own
   matični broj is, by this form's own separate instruction sheet note
   ("Приликом подношења пријаве за настанак пословног субјекта, матични
   број у Пријаву РПС-1 уписује АПИФ"), assigned by APIF only upon
   processing this application — i.e. it structurally cannot yet be known
   to the applicant at establishment in that specific scenario. Left
   optional and disclosed, rather than asserted unconditionally required.
6. **`changeType` is scoped to the six 'emergence' codes (11-16) only**;
   the form's own further cessation (21-29) and pure-amendment (31-92)
   change types are out of scope for this schema and not modelled,
   consistent with GovSchema's Business Formation vertical being about
   bringing a new business entity into existence, not closing or amending
   an already-registered one. Disclosed as backlog for a future companion
   schema, following this registry's established main-form-now/
   companion-annex-later convention (e.g. Hungary's deferred companion
   sheets, Kazakhstan's Form 220.00/250.00 series). The page-3 "planned
   number of employees per activity class" table (applicable only "ако
   пословни субјекат пријављује више од једне дјелатности", i.e. only
   when reporting more than one activity) is likewise excluded from this
   v1.0.0 for the same reason — it is a bounded-but-conditional
   multi-activity addendum to the single `proposedActivity` field already
   modelled, not required for the common single-activity establishment
   case.
7. **`applicantPersonalId` (ЈМБГ) is modelled without a specific
   digit-count pattern**, matching this registry's own precedent on the
   same field type (`rs/apr/jrpps-pr-sole-proprietor-registration`'s own
   JMBG fields) — the JMBG's well-known 13-digit format is a general
   regional convention, not a length this specific form's own printed
   text states, and the printed comb-box placeholder's exact character
   count was not treated as authoritative.
8. **`directorPersonalOrEntityId`, `taxpayerId`, `accountingFirmTaxId`,
   and `accountingFirmRegistrationNumber` are likewise modelled without a
   specific digit-count pattern**, for the same reason as Finding 7 — none
   of JMBG, JIB, or matični broj lengths are stated on this form or its
   own instruction sheet.

## Conformance

3 valid mock scenarios — `valid-establishment-single-activity` (a plain
new-entity establishment, `changeType: establishment`, exercising
`predecessorEntityIds`'s `requiredWhen` gate in its required-false
branch), `valid-merger-creation-with-predecessors` (entity creation via
merger, exercising `predecessorEntityIds`'s `requiredWhen` gate in its
required-true branch), and `valid-establishment-female-director-no-fax`
(establishment with a natural-person female director and no fax/email
supplied, exercising every unconditionally-optional field's absent
case) — plus 27 static-`required`-field mutation fixtures (one per
`required: true` field), 1 `requiredWhen`-gate mutation fixture
(`mutation-missing-predecessorentityids-requiredwhen-merger`), and 1
unknown-field-rejected fixture, committed under
`conformance/ba/apif/business-entity-classification-application/1.0.0/`.

An ephemeral, from-scratch conformance checker (deriving required/
requiredWhen rules directly from this schema's own `fields[]`, discarded
after use, not committed) ran all 32 fixtures: all 3 valid scenarios at 0
errors, all 28 mutation controls each raising exactly 1 error, and the
unknown-field fixture correctly rejected. Validated clean with
`node tools/validate.mjs` and `node tools/validate-ajv.mjs`, individually
and as part of the full registry run (651/651). `registry-index.json`
regenerated via `npm run build-index` in `tools/govschema-client/`.
