# GovSchema Standards Catalog

**As of 2026-07-13** | Comprehensive registry of published government service schemas by jurisdiction and vertical

## Executive Summary

**49 jurisdictions** | **416 published schema documents** (per `tools/govschema-client/registry-index.json`) covering 6 verticals across government services globally.

> **Update (2026-07-13, GOV-2767, "GovSchema Standard Research"): Serbia's
> Taxes vertical advances (3 of 6)**, via
> `rs/purs/pp-gpdg-godisnji-porez-na-dohodak-gradjana`, the Tax
> Administration's (Пореска управа) "Пореска пријава о обрачунатом
> годишњем порезу на доходак грађана" (Tax return on calculated annual
> personal income tax of citizens), Form ПП ГПДГ (PP GPDG). This is a
> disclosed substitution: GOV-2760's own screening pass had left open
> **PPDG-2R** as the strongest Taxes candidate, and this cycle independently
> re-confirmed PPDG-2R is still live (`purs.gov.rs`, HTTP 200,
> `application/pdf`, 254,833 bytes, `sha256:
> 888aa229a8cd09338055703ada3e195db931ac72e2db4e4ac5ccd4d80ba5be90`) — but
> found it stale: PPDG-2R governs the pre-2022 "by decision" (по решењу)
> assessment process, retired starting with the tax calculated for the 2022
> tax year in favor of a self-assessment (самоопорезивање) system filed
> exclusively electronically on Form PP GPDG. PP GPDG has no static
> downloadable blank-form PDF (it lives entirely inside the e-Porezi
> portal), so this schema is sourced instead from the Tax Administration's
> own official user-instructions PDF (fetched directly and unauthenticated
> from `purs.gov.rs`, HTTP 200, `application/pdf`, 1,185,205 bytes, `sha256:
> 6a453bedd83074b9718858fe609a3e1ff1e075f8348e0bce86f4436aef12cf70`),
> including two of its embedded portal screenshots rendered via `pdfjs-dist`
> + `node-canvas` and visually cross-checked against the surrounding
> instructional text. Models 107 `fields[]` plus 3 `documents[]` entries:
> filing metadata (type of filing, tax year, and — only for amended/
> reversed filings — an amendment-type code with a `requiredWhen`-linked
> filing-identifier companion); taxpayer identification and address;
> dependent family members (a bounded 6-slot repeating group standing in
> for the source's own dynamic, up-to-20-entry list); a 3.1-3.20 taxable-
> income worksheet (withheld-at-source wages, self-employment income,
> income by Tax Administration decision, self-assessed income, foreign-
> taxed income, the under-40 additional reduction, personal deductions, and
> the two-bracket 10%/15% tax calculation); a supporting-evidence list; and
> a free-text taxpayer note. 2 valid conformance fixtures (0 errors each)
> plus 8 mutation-control fixtures (each raising exactly 1 error) are
> committed under
> `conformance/rs/purs/pp-gpdg-godisnji-porez-na-dohodak-gradjana/1.0.0/`.
> **Serbia now stands at 3 of 6 verticals** (Business Formation, Visa,
> Taxes); DMV, National ID, and Passport remain open, unscreened-this-cycle
> backlog candidates. See GOV-2767 and this schema's own VERIFICATION.md
> for the full sourcing record.

> **Update (2026-07-13, GOV-2760, "GovSchema Standard Research"): Serbia's
> Visa vertical opens (2 of 6)**, via `rs/mfa/visa-application`, the
> Ministry of Foreign Affairs' bilingual (Serbian Cyrillic/English)
> "Захтев за издавање визе / Visa Application Form" (Образац бр. 1 / Form
> No. 1). This candidate was pre-scouted and left open in GOV-2753's own
> screening pass, alongside a Taxes candidate (PPDG-2R, re-confirmed live
> this cycle and left as an open, ready-to-author backlog item). Fetched
> directly and unauthenticated from `mfa.gov.rs` (HTTP 200,
> `application/pdf`, 280,901 bytes, `sha256:
> 427776bc0cfd58ef509ec973b6f3858ecb29b838102aa26af0d5539af012d146`). A
> flat, non-AcroForm 2-page specimen (zero Widget annotations on either
> page, confirmed via `pdfjs-dist`) with a genuine, fully extractable
> bilingual text layer; both pages were also rendered to PNG (`pdfjs-dist`
> legacy build + `node-canvas`, bundled standard-fonts data supplied) and
> visually cross-checked, confirming a boxed, consular-only "For embassy/
> consulate use only" column running the full height of both pages
> (excluded from `fields[]`, consistent with this registry's established
> office-use-only convention) and every checkbox group's exact option
> count. Models 71 `fields[]` plus 2 `documents[]` entries (1 attestation
> quoting the form's own verbatim declaration; 1 identity-document for the
> printed 3.5cm x 4.5cm photograph requirement): personal/passport/contact
> particulars; trip/visa particulars including a return-permission and a
> transit-entry-permit Yes/No gate each with `requiredWhen`-linked
> companion fields; travel details including six independent means-of-
> support booleans (matching this registry's established multi-checkbox
> convention) and a separate travel/health-insurance checkbox with its own
> validity companion; optional spouse particulars and a bounded 3-row
> children table (matching the source's own printed capacity and its own
> instruction that a separate form must be submitted per child's
> passport); and the closing declaration, contact details, and signature.
> Two disclosed judgment calls: item 45's combined "Phone, E-mail" caption
> is split into two fields for consistency with item 34's own separately-
> boxed Phone/E-mail fields; and the consular-only "Additional documents"
> checklist is disclosed rather than modeled as invented `documents[]`
> entries, since it is the receiving officer's own intake record, not an
> applicant-facing instruction list. 2 valid conformance fixtures (0
> errors each) plus 8 mutation-control fixtures (each raising exactly 1
> error) are committed under `conformance/rs/mfa/visa-application/1.0.0/`.
> **Serbia now stands at 2 of 6 verticals** (Business Formation, Visa);
> DMV, Taxes, National ID, and Passport remain open, unscreened-this-cycle
> backlog candidates, with Taxes (PPDG-2R) the strongest pre-identified
> candidate. See GOV-2760 and this schema's own VERIFICATION.md for the
> full sourcing record.

> **Update (2026-07-13, GOV-2753, "GovSchema Standard Research"): Sri
> Lanka's National ID & Civic Documents vertical closes (2 of 6)**, via
> `lk/drp/application-for-a-national-identity-card`, the Department for
> Registration of Persons' (DRP) combined "Form 'B'" (DRP 1,7,8) —
> "Application for an Identity Card under sections 9, 16 and 17 of the
> Registration of Persons Act, No 32 of 1968." Fetched directly and
> unauthenticated from `drp.gov.lk` (HTTP 200, `application/pdf`, 608,290
> bytes, `sha256:
> da659f8c67ddb335111e13e91fd493843ab44b5bed7b3d952fe52726b21b73f6`); a flat,
> non-AcroForm 8-page trilingual (Sinhala/Tamil/English) specimen (0 Widget
> annotations, confirmed via `pdfjs-dist`) with a genuine, fully extractable
> English-readable text layer covering first-time issuance as well as
> duplicate/change/renewal requests in one form. Pages 1-5 were rendered to
> PNG (`pdfjs-dist@3` legacy build + `node-canvas`, with the bundled
> standard-fonts data supplied) and visually cross-checked, confirming the
> top-of-form District/D.S. Division/G.N. Number routing box is a genuine
> applicant-facing field distinct from the shaded "FOR OFFICE USE" panel
> beneath it, that Sex/Civil Status are independent per-option tick-boxes
> (modelled as `enum`), and that the payment/fee-receipt page is entirely
> office-processing with no printed fee amount (excluded). Models 45
> `fields[]` plus 10 `documents[]` entries sourced from this same PDF's own
> printed instructions-manual checklist (pages 6-8) — unlike this registry's
> `lk/imm` Passport schema, whose separate instructions PDF was a zero-text
> scanned image. Two disclosed judgment calls: Item 8.2's printed heading
> ("Postal Address") conflicts with the instructions manual's own prose,
> which describes the same cage as a different current-residence address,
> not a mailing address — the printed heading is followed rather than the
> conflict resolved by inference; and Declaration item 4's blank
> identity-card-number line is cross-referenced to Item 10.5 rather than
> modelled as a duplicate field. Items 7.6-7.8 (birth-abroad citizenship
> details) and Item 9 (citizenship/dual-citizenship certificate) have no
> applicant-fillable gating checkbox on the form, so both are modelled
> optional with the conditional context recorded in each field's own
> description, consistent with `lk/imm`'s precedent for the same pattern. 2
> valid conformance fixtures (0 errors each) plus 8 mutation-control
> fixtures (each raising exactly 1 error) are committed under
> `conformance/lk/drp/application-for-a-national-identity-card/1.0.0/`.
> **Sri Lanka now stands at 2 of 6 verticals** (Passport, National ID); DMV,
> Business Formation, Taxes, and Visa remain open, unscreened backlog
> candidates. See GOV-2753 and this schema's own VERIFICATION.md for the
> full sourcing record.

> **Update (2026-07-13, GOV-2746, "GovSchema Standard Research"): Jordan's
> Visa vertical closes (3 of 6)**, via `jo/mfa/visa-application`, the
> Ministry of Foreign Affairs and Expatriates' (MFA) bilingual (English/
> Arabic) "Visa Application to Enter the Hashemite Kingdom of Jordan" form,
> fetched directly and unauthenticated from `mfa.gov.jo` (HTTP 200,
> `application/pdf`, 419,769 bytes, `sha256:
> 665961cc2d7746b6fdb8fa43e9c4153704f18fcb01e995c332223c37bfc7cc71`) — this
> candidate was left as open, well-sourced backlog in GOV-2739's own
> screening pass, which had preferred a first-party Passport candidate over
> a competing 23-field embassy Visa AcroForm found only on third-party
> visa-expediting mirrors. A flat, non-AcroForm 2-page specimen (zero Widget
> annotations on either page, confirmed independently via both
> `pdfjs-dist@4` and `pdfjs-dist@3`) with a genuine, fully extractable
> bilingual text layer; both pages were also rendered to PNG (`pdfjs-dist@3`
> legacy build + `node-canvas`, with the bundled standard-fonts data
> supplied) and visually cross-checked, confirming a boxed, consular-only
> "For Official Use" sidebar spanning page 1's full right margin (excluded
> from `fields[]`) and that Sex/Marital status/Type of Passport/Number of
> Entries are genuine printed checkbox controls (modeled as `enum`), while
> §6's five Y/N gate questions (other nationality, name change, criminal
> conviction, armed forces service, expulsion) print no checkbox glyph at
> all yet are still modeled as required `boolean` fields, each paired with
> an optional, ungated "if yes" detail companion field. Models 48
> `fields[]` plus 1 `documents[]` entry (the certification's own attestation
> text). 2 valid conformance fixtures (0 errors each) plus 6
> mutation-control fixtures (each raising exactly 1 error) are committed
> under `conformance/jo/mfa/visa-application/1.0.0/`. **Jordan now stands at
> 3 of 6 verticals** (Taxes, Passport, Visa); Business Formation, DMV, and
> National ID & Civic Documents remain confirmed dead ends from GOV-2739's
> own screening pass — Jordan has reached its practical maximum vertical
> coverage under this registry's current sourcing standards unless one of
> those dead ends' underlying blocker changes. See the Visa vertical
> section and this schema's own VERIFICATION.md for the full sourcing
> record.

> **Update (2026-07-13, GOV-2739, "GovSchema Standard Research"): Jordan's
> Passport vertical opens (2 of 6)**, via `jo/cspd/passport-application`, the
> Civil Status and Passports Department's (CSPD) "Passport Application" form
> (Form No. PASS-ALL-01) — a single coded specimen covering first-time
> issuance, renewal, and replacement in one form. Fetched directly and
> unauthenticated from `cspd.gov.jo` (HTTP 200, 322,949 bytes, `sha256:
> 5ce6f4c47e42b2ac89914c98fcf3bd1a61bcfeb6ce3322fb5ccce9251d7aa4f4`); a flat
> non-AcroForm 2-page specimen (zero Widget annotations, confirmed via
> `pdfjs-dist`) with a genuine, fully extractable English text layer. Both
> pages were also rendered to PNG (`pdfjs-dist` + `node-canvas`, with the
> bundled standard-fonts data supplied — without it this specimen's
> non-embedded base fonts render every glyph blank) and visually
> cross-checked, correcting an earlier text-only-based scouting guess that
> "Passport Application Type" was a checkbox control — the render confirms
> it is a plain blank dotted line, modeled as free text rather than an
> invented enum. This cycle scouted Jordan's five remaining open verticals in
> parallel: Business Formation (CCD company e-registration) and DMV (DVLD
> driver/vehicle licensing) are both login-gated e-services portals with no
> downloadable/fillable paper form found; National ID (CSPD smart ID card) is
> in-person/biometric-only; Jordan's voter registration has no
> applicant-facing form at all (election cards auto-generate from the
> civil-status database). A Visa candidate (a Jordanian embassy's own
> 23-field AcroForm visa application) was also found and independently
> re-verified, but only via third-party visa-expediting mirrors, not a
> first-party government host, so this first-party CSPD Passport candidate
> was preferred — the Visa candidate is left as an open backlog item. Models
> 21 `fields[]` plus 1 `documents[]` entry (the declaration's own attestation
> text); Husband/Wife Data, Bridge-crossing-card, and representative-filer
> blocks are all modeled optional since the specimen prints no explicit gate
> ahead of any of them. Two mock conformance scenarios (0 errors) plus four
> mutation controls (each raising exactly 1 error) all behaved as expected.
> **Jordan now stands at 2 of 6 verticals** (Taxes, Passport) — see the
> Passport vertical section and the document's own VERIFICATION.md for the
> full sourcing record.

> **Update (2026-07-13, GOV-2731, "GovSchema Standard Research"): Jordan
> opens as the registry's 49th jurisdiction**, via its Taxes vertical,
> `jo/istd/pit-return-employee` — the Income and Sales Tax Department's
> (ISTD, under the Ministry of Finance) "PIT Return / Employee (natural
> person)" (Form QP170-F1, internal code HADEEL 3785). This candidate was
> scouted and left open in the GOV-2716 cycle (alongside Sri Lanka, authored
> that same cycle, and Serbia, authored in GOV-2725); this cycle
> independently re-fetched and re-verified the source from scratch rather
> than trusting the prior scouting pass's figures verbatim, confirming the
> exact pre-scouted URL is still live and unauthenticated (HTTP 200,
> `application/pdf`, 189,206 bytes, `sha256:
> a25b8676a670e026f59b127a6d41f06ce501c48f570d42d0acbfbc633a4e2029`). A
> flat, non-AcroForm 2-page specimen (zero Widget annotations on either page,
> confirmed via `pdfjs-dist`) with a genuine, fully extractable English text
> layer; both pages were also rendered to PNG via `pdfjs-dist` + `node-canvas`
> and visually cross-checked, resolving the header's "Type of
> Return"/"Tax Period" control and confirming the Dependent table's fixed
> 6-row printed capacity (headed on page 1, continued as 6 blank rows on page
> 2). Models 84 `fields[]` plus 1 `documents[]` entry (the declaration's own
> attestation text): filing identification (Type of Return Regular/Amended,
> Tax Period); personal/contact information (name, TIN, National ID/
> Passport, ISTD office, address, city, P.O. Box, telephone, zip code,
> mobile, email, family status, Wife income Yes/No, Joint income Yes/No,
> Nationality Jordanian/Non-Jordanian, Residency Resident/Non-resident); the
> full income-and-exemptions worksheet using ISTD's own numbered box codes
> (339, 3303, 3305, 3307, 99310, 993104, 9027–9029, 993105, 99110, 991201,
> 99130); the "Calculation of tax liability (table 99000)" worksheet (99510,
> 995201, 995211, 99540, 99171, 991311, 99131, 99513, 995212, 99541, 99132,
> 99514, 995213, 99542, 99590); a 6-row bounded Dependent repeating group
> (name, relationship, National ID/passport, nationality, year of birth);
> and the Declaration (spouse particulars gated `requiredWhen` joint filing,
> taxpayer's/agent's own name/signature/date, optional tax agent TIN/
> National ID). Unlike this registry's `gh/gra` Ghana DT0103 precedent, the
> specimen prints no explicit yes/no gate ahead of the end-of-service-
> indemnity or National Contribution worksheet blocks, disclosed rather than
> invented; computed subtotal/total boxes are modeled required, itemized
> component boxes optional. 2 valid conformance fixtures (0 errors each) plus
> 6 mutation-control fixtures (each raising exactly 1 error) are committed
> under `conformance/jo/istd/pit-return-employee/1.0.0/`. **Jordan now stands
> at 1 of 6 verticals**; DMV, Business Formation, Visa, Passport, and
> National ID & Civic Documents are open, unscreened backlog candidates. See
> GOV-2731 and this schema's own VERIFICATION.md for the full sourcing
> record.

> **Update (2026-07-13, GOV-2725, "GovSchema Standard Research"): Serbia
> opens as the registry's 48th jurisdiction**, via its Business Formation
> vertical, `rs/apr/jrpps-pr-sole-proprietor-registration` — the Agency for
> Business Registers' (APR) unified "JRPPS" registration application,
> sole-proprietor (`preduzetnik`) pathway, 2025 edition. This schema was the
> Serbia candidate pre-scouted and left open in the GOV-2716 cycle. The live
> host (`apr.gov.rs`) was found fully down this cycle — 23 consecutive HTTP
> 500s on the source PDF plus an HTTP 500 on the bare domain root, not
> merely intermittently flaky as previously observed — so the PDF was
> instead sourced from three independently-fetched Wayback Machine captures
> (two replay modes, two snapshot dates from May and September 2025), all
> byte-identical (`sha256:
> 0a7ebff903fa896a6b8c3d14f440d087aa7ec341cdb25cfe04b8b04bd0cc69ca`, 412,964
> bytes). Confirmed genuinely AcroForm-fillable via `pdfjs-dist`: 10 pages,
> 244 distinct field names (197 anchored to a visible page across 211
> visible widget entries). All 10 pages were rendered to PNG and visually
> cross-checked against every widget's rect before modeling, surfacing two
> disclosed judgment calls: page 1's 11-option register-selection radio
> group is excluded from `fields[]` since this PR-specific edition's filer
> always registers in the Register of Business Entities (the other 10
> options are out-of-scope entity types); and the seat address's house
> number spans two adjacent widgets with no distinguishing sub-label on this
> one address block alone (unlike every other combined "Number and letter"
> block on the form) — the first widget is modelled, the second excluded as
> an unlabeled structural duplicate. Models 160 `fields[]` plus 7
> `documents[]` entries (2 `attestation`, each quoting one of the form's own
> verbatim declaration statements; 1 `identity-document`; 4
> `supporting-evidence`), including the business-name construction
> (personal name + `preduzetnik`/`pr` designation + seat place, plus
> optional fantasy name and up to 4 translations), the seat and postal-
> receipt addresses, registration duration and activity-start options, a
> 14-level qualification-code enum, up to 3 joint procurators and up to 3
> branch operating locations (bounded repeating groups, matching the
> source's own printed capacity), an optional register annotation
> (забележба), and the Tax Administration / lump-sum-taxation / VAT-
> registration sections. 2 valid conformance fixtures (0 errors each) plus 9
> mutation-control fixtures (each raising exactly 1 error) are committed
> under `conformance/rs/apr/jrpps-pr-sole-proprietor-registration/1.0.0/`.
> **Serbia now stands at 1 of 6 verticals**; DMV, Taxes, Visa, National ID,
> and Passport are open, unscreened backlog candidates. See GOV-2725 and
> this schema's own VERIFICATION.md for the full sourcing record.

> **Update (2026-07-13, GOV-2716, "GovSchema Standard Research"): Sri Lanka
> opens as the registry's 47th jurisdiction**, via its Passport vertical,
> `lk/imm/application-for-a-sri-lankan-passport-emergency-identity-certificate`
> — the Department of Immigration & Emigration's paper passport/emergency-
> certificate/identity-certificate application. This cycle first re-screened
> the one previously-flagged open gap in an already-open jurisdiction —
> **Ghana's DMV vertical is now a confirmed dead end**: `dvla.gov.gh` has
> been rebuilt on a modern stack (Next.js marketing site, Nuxt.js "online
> services" SPA at `service.dvla.gov.gh`), but the online system is fully
> login-gated with no public registration/application form exposed before
> authentication, the paper Forms F/F1 are purchase-in-person-only per every
> source found, and a Wayback Machine sweep of `dvla.gov.gh`'s historical
> forms/publications paths surfaced only a driving-school-registration form
> and public notices, no citizen-fillable DMV application. Also
> re-confirmed Italy's four remaining verticals (Passport, Business
> Formation, National ID, Visa) remain dead ends per the prior GOV-2382
> finding (direct fetch now returns an "Accesso negato" access-denied page).
> With both leads dead, this cycle scouted three new-jurisdiction candidates
> in parallel — Sri Lanka, Serbia, and Jordan — each producing at least one
> strong, unauthenticated, field-rich candidate; Sri Lanka's passport form
> was selected as the only genuine **AcroForm-fillable** PDF among the three
> (35 Widget annotations, independently re-fetched and sha256-verified:
> `02c3c01165f6bccd19a2295e4e40437d519e1f82e079936b0572e041df4760a1`, HTTP
> 200, 1,200,324 bytes). Models 24 `fields[]`: service/travel-document-type
> selection, National ID number, surname/other names (each collapsing two
> printed comb text boxes into one logical field), permanent address and
> district, date of birth, birth certificate number/district, place of
> birth, sex, profession, a dual-citizenship yes/no gate with its own
> `requiredWhen`-linked citizenship number/foreign nationality/foreign
> passport number fields, mobile number, e-mail, both parents'/guardians'
> National ID or travel-document numbers (for applicants under 16, disclosed
> as ungated since the form itself has no applicant-fillable "child under
> 16" checkbox to condition on), and the declaration date. Two of the form's
> printed checkbox groups (a two-way "Type of Service" pair and a four-way
> "Type of Travel Document" group) are implemented in the underlying AcroForm
> as independently-named sibling widgets rather than true PDF radio groups;
> modelled as single `enum` fields per the form's own clear single-choice
> intent, disclosed as a judgment call. No `documents[]` checklist is printed
> on the form itself, and the department's separate "Instructions to
> Passport Applicants" PDF is a 6.5MB scanned-image document with zero
> extractable text — disclosed as an out-of-scope gap. 2 valid conformance
> fixtures plus 6 mutation-control fixtures (each raising exactly 1 error)
> are committed under
> `conformance/lk/imm/application-for-a-sri-lankan-passport-emergency-identity-certificate/1.0.0/`.
> Serbia (Business Formation, APR's JRPPS-PR sole-proprietor registration —
> also AcroForm-fillable, 150+ fields, but the host is intermittently flaky)
> and Jordan (Taxes, ISTD's employee income tax return — a flat, coded
> text-layer PDF) were both scouted to strong, ready-to-author candidates
> this cycle and remain open for a future cycle. **Sri Lanka now stands at 1
> of 6 verticals**; DMV, Business Formation, Taxes, Visa, and National ID are
> open, unscreened backlog candidates. See GOV-2716 and this schema's own
> VERIFICATION.md for the full sourcing record.

> **Update (2026-07-13, GOV-2709, "GovSchema Standard Research"): Thailand's
> Passport vertical opens (5 of 6)**, via
> `th/mfa/passport-application-royal-thai-embassy-london` — the Ministry of
> Foreign Affairs' "Form 1" (แบบฟอร์ม 1, คำร้องขอหนังสือเดินทางไปต่างประเทศ),
> distributed by the Royal Thai Embassy, London for Thai nationals resident
> in the United Kingdom or Ireland. Independently re-fetched directly from
> MFA's own `image.mfa.go.th` CDN (HTTP 200, `application/pdf`, 295,714
> bytes, `sha256: da567c0215b34de801b6929708819e86a52d81188993cc18a504d73d8a5d36a5`).
> A flat, non-AcroForm print specimen (zero Widget annotations, confirmed via
> `pdfjs-dist`) with a real, fully extractable Thai-language text layer.
> Models 22 `fields[]`: applicant identity (name, English block-capital name,
> 13-digit National ID number, ethnicity, birth province/date, age/height/
> occupation), separate Thailand and UK/Ireland address/email/phone blocks,
> both parents' name and National ID number, both a Thailand and a UK/Ireland
> emergency reference contact, and an optional postal-return-vs-in-person-
> collection `deliveryPreference` (the form's own instruction frames this
> choice as optional), with the in-person option's contact phone number
> gated by `requiredWhen`. `สัญชาติ` (Nationality) is printed as a fixed
> "Thai" value, not a blank, and is excluded from `fields[]` entirely rather
> than modelled as a redundant single-value enum; no `documents[]` checklist
> is printed on this single-page specimen, disclosed as an out-of-scope gap
> rather than an assumption. This is an embassy-specific specimen (scoped to
> Thai nationals resident in the UK or Ireland applying at the Royal Thai
> Embassy, London), consistent with this registry's
> `pt/mne/requerimento-passaporte-consular` precedent for a single-post
> passport form. Thailand's own domestic/National ID candidate (DOPA
> บัตรประจำตัวประชาชน) was screened the same cycle and confirmed a dead end:
> every fetchable PDF is a non-fillable public-service-guide document, and
> the id-card process itself is in-person/counter-only, officer-driven, and
> biometric, with no citizen-fillable paper form at any stage. 2 valid
> conformance fixtures plus 6 mutation-control fixtures (each raising exactly
> 1 error) are committed under
> `conformance/th/mfa/passport-application-royal-thai-embassy-london/`.
> **Thailand now stands at 5 of 6 verticals** (Taxes, Business Formation,
> Visa, DMV, Passport); National ID is Thailand's sole remaining open
> vertical, and a confirmed dead end for the candidate screened this cycle.
> See GOV-2709 and this schema's own `VERIFICATION.md` for the full sourcing
> record.

> **Note:** GOV-2704 (Business Formation) and GOV-2703 (Passport) landed as
> concurrent same-day PRs; each update below independently reports "4 of 6"
> as true at its own authoring time. Combined, **Ghana now stands at 5 of 6
> verticals** (National ID & Civic Documents, Taxes, Visa, Business
> Formation, Passport) — **DMV is now a confirmed dead end (GOV-2716):**
> `dvla.gov.gh`'s online system is fully login-gated with no public
> application form, and the paper Forms F/F1 are purchase-in-person-only
> with no downloadable specimen found anywhere, including in Wayback
> Machine's archive of the agency's own historical forms/publications
> paths — see the Executive Summary's GOV-2716 update above.

> **Update (2026-07-13, GOV-2704, "GovSchema Standard Research"): Ghana's
> Business Formation vertical opens (4 of 6)**, via
> `gh/orc/registration-of-a-subsidiary-business-name` — the Office of the
> Registrar of Companies' (ORC, successor to the Registrar-General's
> Department) Form C, "Registration of a Subsidiary Business Name," under
> the Business Names Act, 1962 (Act 151). A flat, non-AcroForm print
> specimen (zero Widget annotations across all 3 pages, confirmed via
> `pdfjs-dist`), independently re-fetched this cycle from ORC's own asset
> host (HTTP 200, `application/pdf`, 445,953 bytes, `sha256:
> 15e0184521e6dd118dcafe226ce02ea3955b629b8a0189a72779a4e86f38efe4`,
> matching the task's own pre-scouted figures exactly) after independently
> re-confirming the live link from `orc.gov.gh/forms-fees/`'s own
> Subsidiary Business Names accordion. Models 74 `fields[]` plus 1
> `documents[]` entry across the form's own lettered sections (A)–(K):
> business/parent-company identification; a 27-item Nature of Business
> sector tick-box grid (each sector modeled as its own boolean field, since
> v0.3's field model has no multi-select/labelled-option member) plus an
> "Others" escape hatch; up to three ISIC codes or a free-text activity
> description; a Principal Place of Business address; a Registered Address
> gated by a same-as-principal-place yes/no question; an optional Other
> Place of Business for multi-location businesses; a Postal Address; Contact
> details; MSME Details (revenue/employee counts feeding the source's own
> downstream Micro/Small/Medium classification table, not modeled as a
> field); a Business Operating Permit request (gating a reference number
> when already held); and a Director/Secretary Declaration. One specimen
> artifact is disclosed rather than silently corrected: the sector grid
> prints "Estate/Housing" twice across two different grid cells, modeled as
> a single boolean field with the duplication disclosed. Section (L), "For
> Office Use Only," and the Declaration's Stamp/Seal and Signature lines are
> excluded as staff-populated/physical artifacts, consistent with this
> registry's `gh/nia`/`gh/gis` precedent; no verbatim declaration statement
> exists on the specimen to anchor an `attestation`-category document.
> Scoping note: ORC's primary one-person business-name registration form
> ("Form A") remains undownloadable (pick-up only, per this catalog's prior
> scouting pass) — this schema covers subsidiary/branch registration only,
> disclosed as an open gap rather than silently conflated. 2 valid
> conformance fixtures plus 7 mutation-control fixtures (each raising
> exactly 1 error) are committed under `conformance/gh/orc/`. See GOV-2704
> and this schema's own `VERIFICATION.md` for the full sourcing record.

> **Update (2026-07-13, GOV-2703, "GovSchema Standard Research"): Ghana's
> Passport vertical opens (4 of 6)**, via
> `gh/mfa/application-for-a-republic-of-ghana-passport` — the Ministry of
> Foreign Affairs and Regional Integration (MFA) Passport Office's manual
> application form, citing the Passport and Travel Certificate Decree
> (NLCD. 155, 1967), distributed as a free download from MFA's own
> "Passport Manual Forms" page (`mfa.gov.gh/index.php/passport/`) and
> independently re-fetched this cycle (HTTP 200, `application/pdf`, 248,106
> bytes, `sha256:
> e59193adeaf05847042dbd03928f1e7e9bec3b4cf333ee19c048c18e5bb73c9`, matching
> the issue's own citation exactly). A flat print form: `pdfjs-dist`
> confirms 0 AcroForm/Widget annotations but a real, fully extractable text
> layer across all 4 pages, so every field was read via coordinate/
> text-layout correlation (text items grouped by y-coordinate, ordered by
> x) rather than an embedded field name. Models the form's 30 numbered
> items (114 `fields[]`, plus a 3-field header strip): name and any former
> name, date of birth/gender/physical description, nationality, marital
> status (free text, no printed options, matching this registry's `gh/gis`
> precedent for the same jurisdiction), residence address including a
> GhanaPost GPS Digital Address Code, education, a three-generation
> evidence-of-citizenship block (father/mother/one grandparent, each with a
> real `requiredWhen`-gated deceased-last-known-address field), a
> dual-citizenship declaration, a document-holdings checklist plus an
> attached-document detail block, two guarantors, the applicant's own
> declaration (with a `requiredWhen`-gated prior-passport disclosure),
> parent/guardian consent for minors, a translator block for illiterate
> applicants, and a mandatory witness section. Also independently
> re-confirmed the live `mfa.gov.gh/index.php/passport/` page cited in the
> issue: it describes the manual workflow verbatim (download, pay the
> processing fee online, receive an SMS Paid Voucher Code, write it on the
> form, submit at a Passport Application Center), which supplies the only
> available explanation for the specimen's own unexplained "TRANSACTION
> NO:" blank (modeled as `paidVoucherCode`) and grounds a `documents[]`
> payment entry not printed on the PDF itself. Unlike `gh/gis`, this
> specimen prints no photograph-attachment instruction anywhere across all
> 4 pages (confirmed in both the extracted text and a full-page render), so
> no photograph `documents[]` entry is modeled. 4 `documents[]` entries
> total: citizenship/identity evidence, a police-report requirement gated
> on the previous passport being reported lost, the processing-fee payment,
> and the truth-of-particulars attestation. 2 valid conformance fixtures
> plus 6 mutation-control fixtures (each raising exactly 1 error, including
> a dedicated `requiredWhen` case) are committed under `conformance/gh/mfa/`.
> See GOV-2703 and this schema's own `VERIFICATION.md` for the full
> sourcing record.

> **Update (2026-07-13, GOV-2697, "GovSchema Standard Research"): Ghana's
> Taxes vertical opens**, via `gh/gra/personal-income-tax-return-dt-0103` —
> the Ghana Revenue Authority's (GRA) Domestic Tax Revenue Division
> "Personal Income Tax Return" (Form DT 0103, edition "ver 1.1"), the annual
> return an individual files reporting business/employment/investment
> income and computing tax payable. A genuine 4-page print-and-fill
> specimen hosted unauthenticated on `gra.gov.gh`'s own forms listing,
> independently re-fetched this cycle (HTTP 200, `application/pdf`,
> 461,527 bytes, `sha256:
> b394df0bf108c710f6d681c3b261a8af11af35623c56436fb9e77b75c91c8359`,
> matching the task's own pre-scouted figures exactly) and confirmed via
> `pdfjs-dist` to carry zero AcroForm/Widget annotations across all 4
> pages — every field read from the extracted text layer's own (x, y)
> coordinates, row-grouped and column-sorted, since no interactive field
> metadata exists. Models the form's full structure end to end (80
> `fields[]` plus 2 `documents[]`): filing identification (tax office
> LTO/MTO/STO, year of assessment, return period), personal/business
> (including landlord particulars, gated to a rented tenancy
> status)/employment information, the §4 Sources of Income breakdown
> (business, employment, and investment income, each gated behind its own
> printed yes/no question), the full §5 Tax Computation worksheet (add
> backs, deductions, reliefs) through to chargeable income and tax
> payable/(overpaid), and a two-branch Declaration (self or
> representative). Two source-form artifacts are disclosed rather than
> silently corrected: the employment-income breakdown's own item list
> skips from 'v' to 'vii' (no 'vi' printed) while its total caption still
> reads "Sum i to vi", and the reliefs list skips from 'viii' to 'x' (no
> 'ix' printed) while its own total caption reads "Sum of i to ix" — both
> modeled verbatim, with the caption/item-list mismatch disclosed on each
> total field rather than corrected. A page-image cross-check was attempted
> but a `pdfjs-dist`/`node-canvas` inline-image rendering incompatibility
> prevented a usable render this cycle, so the exact box mechanics of a
> disclosed Signature/"OR"/"R.T.P." (Registered Tax Practitioner)
> co-certification block are modeled as a best-effort boolean rather than
> invented structure. Two valid conformance fixtures plus 6 mutation-control
> fixtures (each raising exactly 1 error) are committed under
> `conformance/gh/gra/`. See GOV-2697 and this schema's own
> `VERIFICATION.md` for the full sourcing record.

> **Update (2026-07-13, GOV-2698, "GovSchema Standard Research"): Ghana's
> Visa vertical opens (2 of 6)**, via
> `gh/gis/application-for-grant-of-visa-and-permit-for-return-to-ghana` — the
> Ghana Immigration Service's (GIS) "Application Form for Grant of a
> Visa/Permit for Return to Ghana," GIS's Re-Entry Visa/Permit specimen,
> distributed unauthenticated from `gis.gov.gh/gis-forms/` and independently
> re-fetched this cycle (HTTP 200, `application/pdf`, 1,500,822 bytes,
> `sha256:14bdb332f24b1fd172db3b851fa369b2235d9ba9710f58cbbc545b5f9fdc470b`,
> matching the GOV-2698 issue's own citation exactly). A genuinely scanned
> specimen — `pdfjs-dist` confirms 0 AcroForm/Widget annotations and 0
> extractable text items across both pages — rendered via a custom
> `NodeCanvasFactory` (`node-canvas`) at 2.5x scale and read visually,
> field-by-field, against targeted crops of every numbered item. Models the
> form's 14 numbered items (33 `fields[]`): full name and previous name,
> nationality and date/place of birth, passport particulars, address in
> Ghana (a general entry plus separately-lettered postal/residential
> sub-items, each with its own telephone), overseas address, education and
> occupation, residency duration and arrival dates, destination abroad,
> departure date, object of journey and proposed stay, reasons for return
> (which the form itself flags for documentary support), marital status —
> modelled as free text since the specimen prints no enumerated options
> anywhere, unlike this registry's other `maritalStatus` fields — and
> spouse particulars, closing with a signature date. 3 `documents[]`
> entries capture the two-photograph requirement, the item-12 documentary
> evidence for reasons-for-return, and the solemn-declaration attestation;
> the page-2 "FOR OFFICIAL USE ONLY" block (fee, receipt, cashier
> signature, stamp) is excluded as staff-populated. Confirmed via
> `gis.gov.gh/visas/` that this specimen is GIS's Re-Entry Visa pathway,
> distinct from the first-time tourist e-Visa, which remains a login-gated
> online portal with no downloadable specimen found at any tier — disclosed
> as out of scope rather than silently conflated. See the document's own
> VERIFICATION.md for the full sourcing record and every disclosed judgment
> call. Ghana now stands at 2 of 6 verticals (National ID & Civic
> Documents, Visa); Passport, DMV, Business Formation, and Taxes remain
> open backlog for a future cycle.

> **Update (2026-07-13, GOV-2688, "GovSchema Standard Research"): Bangladesh's
> National ID & Civic Documents vertical opens, closing Bangladesh to 6 of
> 6 verticals**, via `bd/nidw/nid-correction-application-form-1` — the
> National Identity Registration Wing's (NIDW, operating under the
> Bangladesh Election Commission) "Form-1," the "Application for Correction
> of Error(s) in the National ID Card or Preserved Data," issued under Rule
> 3 of the National Identity Registration Rules. This closes Bangladesh's
> last remaining unscouted vertical; the sibling GOV-2687 update immediately
> below opened Business Formation in parallel this same cycle, so together
> the two bring **Bangladesh to full, 6-of-6 coverage** (Taxes, DMV,
> Passport, Visa, Business Formation, National ID). A genuine, independently
> re-fetched (HTTP 200, `application/pdf`, 146,866 bytes, `sha256:
> a80ee2b64d89d5a540eeac21bbe2fff0c69b28e4df1da5bdec475e8a78ef593d`) static
> print-and-fill specimen with zero AcroForm/Widget annotations (confirmed
> via pdfjs-dist across both pages) — a genuinely Bengali-only source,
> unlike this jurisdiction's bilingual `bd/dip` schemas. This cycle's own
> extraction found pdfjs-dist's raw Bengali text order unreadable without
> correction: three pre-base Bengali dependent vowel signs (ি/ে/ৈ) are
> painted before, but logically stored after, the consonant they modify, so
> raw extraction interleaves them out of order; a small post-processing
> regex reordering pass (moving each pre-base vowel sign after its consonant
> cluster) made the text substantially and legibly correct Bengali,
> cross-checked against the form's own repeated government-form vocabulary.
> Models the applicant's (or, for a minor/court-declared-incompetent NID
> holder, their legal guardian's) identity, the Urgent/Regular
> application-type selection, all 9 rows of the correction table (Name in
> Bengali/English, Father's/Mother's/Spouse's Name, Date of Birth, Address,
> Blood Group, Other) as current-value/requested-new-value field pairs, and
> the applicant's/guardian's contact particulars (30 `fields[]`, 4
> `documents[]`). The form's own tear-off acknowledgement-receipt section and
> office-only fields (Serial Number, Application Date) are excluded as
> duplicate/office-entered content; the form's own instruction 5 confirms no
> fee/charge applies, so no payment requirement is modeled. Two valid
> conformance fixtures plus 6 mutation-control fixtures (each raising
> exactly 1 error) are committed under
> `conformance/bd/nidw/nid-correction-application-form-1/1.0.0/`. See
> GOV-2688 and this schema's own `VERIFICATION.md` for the full sourcing
> record.

> **Update (2026-07-13, GOV-2687, "GovSchema Standard Research"): Bangladesh's
> Business Formation vertical opens (5 of 6)**, via
> `bd/roc/declaration-on-registration-of-company-form-i` — the Registrar of
> Joint Stock Companies and Firms' (RJSC) "Form-I: Declaration on
> Registration of Company", the statutory declaration of compliance
> prescribed under section 25 of the Companies Act, 1994. This **reverses a
> prior finding** in this catalog: RJSC's numbered incorporation forms were
> previously recorded as "only mirrored on a third-party legal-services
> site, not RJSC's own domain" — RJSC's own forms portal (`roc.gov.bd`) has
> since been rebuilt on the same Oracle Cloud object-storage pattern already
> seen for Bangladesh's BRTA/DIP forms, and now hosts this form (plus
> companion Forms IX/XII) first-party. Independently re-fetched this cycle:
> HTTP 200, `application/pdf`, 83,237 bytes — matching the task's own cited
> size exactly. A genuine single-page, plain print-and-fill specimen (zero
> AcroForm annotations, confirmed via `pdfjs-dist`), independently
> cross-checked by rendering the page to an image via `pdfjs-dist` +
> `node-canvas`. The declaration's central strike-out construction (Advocate/
> Attorney/Pleader engaged in formation, or Director/Manager/Secretary named
> in the Articles) is modeled as a single 6-value enum, with the officer
> branch's own company-name blank gated `requiredWhen` on that choice; a
> verbatim source artifact (a printed double "and and") is disclosed rather
> than silently corrected. **Bangladesh now stands at 5 of 6 verticals**
> (Taxes, DMV, Passport, Visa, Business Formation); only National ID remains
> open backlog, tracked separately. See GOV-2687 and this schema's own
> `VERIFICATION.md` for the full sourcing record.

> **Update (2026-07-13, GOV-2675/GOV-2677, "GovSchema Standard Research"):
> Bangladesh's Visa vertical opens (4 of 6)**, via
> `bd/dip/machine-readable-visa-application-form` — the Department of
> Immigration and Passports' (DIP) "Machine Readable Visa Application Form"
> (D.I.P Form-4), distributed via Bangladesh's Online MRV Portal
> (visa.gov.bd) for foreign nationals applying for a Bangladeshi visa. This
> cycle scouted three candidates in parallel — this form, Bangladesh's
> Business Formation vertical (via RJSC's company-incorporation forms), and
> Greece's Passport vertical — and picked this one as the strongest: an
> official government-portal PDF, independently re-fetched (HTTP 200,
> `application/pdf`, 124,451 bytes, `sha256:
> fb2d675a5a98f7ed9a06a11699cdf426cb6a8a26d34ca1c2da89fd58fa353f7d`) and
> cross-checked against a byte-near-identical embassy mirror. A genuine
> 4-page, plain print-and-fill PDF (no AcroForm, confirmed via pdfjs-dist:
> zero annotations across all 4 pages) with a clean, complete extractable
> text layer. This single physical form is shared by five distinct
> application pathways (New Visa, Extension of Visa, No Visa Required,
> Transit/On Arrival Visa, and a Police Verification/Official Use
> back-office block); this v1.0.0 scopes to the New Visa pathway only — the
> pathway a first-time foreign applicant uses — comprising Personal Details,
> Travel Document Details, Payment Details, and the New Visa section itself
> (36 `fields[]`, 8 `documents[]`). The source prints no required-field
> asterisks anywhere (confirmed via a zero-occurrence text-layer grep for
> `*`), so only fields unconditionally essential to any visa request
> (identity, passport particulars, and the requested visa's own purpose/
> duration/arrival-date/entry-count) are marked `required`, a disclosed
> judgment call consistent with this registry's own `bd/brta`/`th/dlt`
> precedent for source forms without printed requiredness markup. Checkbox
> groups with no AcroForm widget but an explicit printed option list (Sex,
> Marital Status, Purpose of Visit, Intended Number of Entries) are modeled
> as `enum`, consistent with this jurisdiction's own `bd/dip/e-passport-
> application-form` `gender` precedent. Page 3's shared 19-item supporting-
> document checklist is scoped to the 6 items applicable to a general New
> Visa applicant (passport copy, photograph, payment slip, and three
> purpose-conditional documents); the remaining category-specific items
> (marriage/birth certificate, a parent's/spouse's visa or passport copy, an
> affidavit, a Sri-Lankan-national-specific NOC, company income-tax/TIN
> documents, a bilateral-agreement reference, security clearance, and an
> overstay payment slip) are disclosed out of scope. Two valid conformance
> fixtures plus 6 mutation-control fixtures (each raising exactly 1 error)
> are committed under `conformance/bd/dip/machine-readable-visa-application-
> form/1.0.0/`. Bangladesh Business Formation (RJSC) and Greece Passport were
> also scouted this cycle: RJSC's numbered incorporation forms are a viable
> but weaker candidate (only mirrored on a third-party legal-services site,
> not RJSC's own domain) — left as open backlog; Greece Passport is a
> confirmed weak/likely-dead-end candidate (in-person-only, only a
> non-fillable scanned specimen available, the online `myPhoto` adjunct is
> SSO-gated and photo-only) — not pursued. **Bangladesh now stands at 4 of 6
> verticals** (DMV, Taxes, Passport, Visa); Business Formation and National
> ID remain open backlog. See GOV-2677 and this schema's own `VERIFICATION.md`
> for the full sourcing record.

> **Update (2026-07-13, GOV-2666, "GovSchema Standard Research"): Bangladesh's
> Passport vertical opens (3 of 6)**, via
> `bd/dip/e-passport-application-form` — the Department of Immigration and
> Passports' (DIP) "e-Passport Application Form (New/Re-Issue)", distributed
> for offline/embassy submission via the Ministry of Foreign Affairs' (MOFA)
> forms portal. This **reverses a prior dead-end verdict**: GOV-2591's cycle
> screened Bangladesh's Passport vertical and found it weak/dead-end (an
> online-portal-only e-passport process with no fillable specimen located at
> the time). This cycle found MOFA's own forms portal hosts a genuine,
> unauthenticated, interactive AcroForm PDF for exactly this process — the
> same class of reversal already recorded for Bangladesh's DMV vertical
> (GOV-2644's BRTA finding). Independently re-fetched this cycle: HTTP 200,
> `application/pdf`, 4,114,743 bytes, `sha256:
> 477e229ac2869691f6bd2a09be01af0d7ebb22cdae0e4591db7687e6ac7dd862` —
> matching the task's own cited size/hash exactly. A genuine 3-page,
> 111-AcroForm-field, bilingual (Bengali/English) specimen, confirmed via
> `pdfjs-dist`. A significant data-quality finding: the PDF's internal
> AcroForm field names (plain numeric strings) do not reliably correspond to
> the form's own printed item numbers (e.g. printed items 9/10/11/12 carry
> internal names "9"/"11"/"12"/"10"), so every field was identified by
> on-page position and printed label, not by trusting the internal field
> name. This is a combined New/Re-Issue form; this v1.0.0 scopes to the
> first-time (new) applicant pathway: Passport Office/Type/Pages/Duration/
> Delivery, Personal Information, Permanent/Present Address, Parental/
> Guardian/Spouse Information, Emergency Contact, and Bank Payment
> Information (independently confirmed to be ordinary fillable applicant
> fields, not an office-only receipt, deviating from the task's own
> suggested scoping) — 72 `fields[]` and 5 `documents[]` entries.
> Re-issue-only content (Previous Passport particulars, Pre-Police
> Clearance, Lost/Stolen Passport information), the Official/Diplomatic
> Passport additional-information block, and 6 of the attachment
> checklist's 10 checkboxes are out of scope, disclosed in VERIFICATION.md.
> Two valid conformance fixtures plus 6 mutation-control fixtures (each
> raising exactly 1 error) are committed under `conformance/bd/dip/`.
>
> **Update (2026-07-13, GOV-2672): combobox `enum` correction.** Review gate
> GOV-2668 requested changes on PR #438: the draft's combobox check queried a
> nonexistent `.options` property (always null) instead of pdfjs-dist's real
> `.items`, wrongly concluding almost none of this form's comboboxes carry an
> embedded option list. Corrected re-extraction found 24 do; those fields
> (`numberOfPages`, `durationOfPassport`, `typeOfDelivery`, `religion`,
> `typeOfCitizenship`, `maritalStatus`, `profession` and its
> father/mother/guardian/spouse counterparts, `countryOfBirth` and its
> other-citizenship/present/emergency-contact counterparts,
> `fatherNationality` and its mother/guardian/spouse counterparts,
> `emergencyContactRelationship`, `contactCountryCode` and its
> emergency-contact counterpart, and `passportOfficeOrMission`) are now
> modeled as `enum`; a new `paidAmountCurrency` field (`BDT`/`USD`) was added
> after the same re-extraction found a previously-excluded companion
> combobox also carries a real option list. The four Bangladesh-district
> fields were deliberately kept free-text despite carrying a real option
> list, since that list has no "other" catch-all and this schema already
> discloses present/emergency-contact addresses abroad. See
> VERIFICATION.md's "GOV-2672 correction" section for the full reasoning.
> Bangladesh now stands at 3 of 6 verticals (Taxes, DMV, Passport); Business
> Formation, Visa, and National ID remain open backlog. See GOV-2666 and
> this schema's own `VERIFICATION.md` for the full sourcing record.

> **Update (2026-07-13, GOV-2656, "GovSchema Standard Research"): Greece adds
> a third Taxes-vertical schema**, via
> `gr/aade/katastasi-oikonomikon-stoicheion-apo-epicheirimatiki-drastiriotita-e3`
> — the Independent Authority for Public Revenue's (AADE) Form Ε3, "Κατάσταση
> Οικονομικών Στοιχείων από Επιχειρηματική Δραστηριότητα" (business/
> professional-activity income statement), the second of two companion
> schedules flagged as open backlog when Form Ε1
> (`gr/aade/dilosi-forologias-eisodimatos-e1-e2-e3`, GOV-2621) was authored,
> and the strongest ready-to-author candidate identified by the GOV-2644
> cycle that authored Form Ε2. All four of this cycle's sources (the Ε3
> specimen, its own sub-tables companion, an 89-page instructions manual,
> and an FAQ) were independently re-fetched via Wayback Machine mirror (the
> primary `aade.gr` host remains Akamai-403-blocked from this sandbox):
> HTTP 200, `application/pdf`, 434,154 bytes, `sha256:
> 72d4c0e9c8529cc510e4e40b6e3eb4d77a1094ab7544031712566f55f8ad2b31` for the
> Ε3 specimen itself. Reading the instructions manual's own code-by-code
> narrative revealed that the source's Πίνακας Δ (gross profit/EBITDA/EBIT)
> and most of Πίνακας ΣΤ (final taxable-profit determination) are almost
> entirely **system-computed derivations** of Πίνακας Ζ1/Ζ2's own
> filer-entered revenue/expense figures, not independent filer input — so
> this v1.0.0 models the cover-sheet/registration identification, Πίνακας Α'
> taxpayer identification, Πίνακας Β' core employee-count fields, and
> Πίνακας Ζ1/Ζ2's total-revenue/total-expense line items restricted to the
> single "Εμπορική δραστηριότητα" (commercial/trading) activity-type column
> — the source's own first and most common of its four parallel
> activity-type columns. 43 `fields[]` total, 5 statically `required`; the
> production/agricultural-biological/services activity columns and the
> system-derived Πίνακας Δ/Ε/ΣΤ tax-computation tables, plus numerous niche
> compliance panels (rent-paid statement, construction-company profit
> calculation, country-by-country reporting, anti-money-laundering
> reporting, ν.4935/2022 group tax exemptions, Pillar Two top-up tax), are
> out of scope, disclosed in VERIFICATION.md. Two valid conformance fixtures
> plus 7 mutation-control fixtures (each raising exactly 1 error) are
> committed under `conformance/gr/aade/`. Greece's Taxes vertical now
> comprises Forms Ε1, Ε2, and Ε3. See GOV-2656 and this schema's own
> `VERIFICATION.md` for the full sourcing record.

> **Update (2026-07-13, GOV-2644, "GovSchema Standard Research"): Bangladesh's
> DMV vertical opens (2 of 6)**, via
> `bd/brta/motor-vehicle-registration-application` — the Bangladesh Road
> Transport Authority's (BRTA) vehicle-registration application form. This
> **reverses a prior dead-end verdict**: GOV-2591's cycle screened BD DMV via
> BRTA's driving-licence forms (AcroForm fields over a scanned raster
> background with no OCR text layer) and called the whole vertical weak/
> dead-end. This cycle found BRTA's site has since been rebuilt (a new
> `brta.gov.bd/pages/forms/*` structure, PDFs re-hosted on Oracle Cloud
> object storage, uploaded December 2024) and now serves the
> vehicle-registration form — a distinct form from driving-licence — as a
> genuine, unauthenticated, plain **text-layer** PDF (no AcroForm).
> Independently re-fetched this cycle: HTTP 200, `application/pdf`, 71,911
> bytes, `sha256:
> 96d0e10bcb05988ec2cb31419656121440b5602353493c33e91b38d412721223`. This
> v1.0.0 models the applicant-facing owner/vehicle-identification and
> technical-specification content (63 `fields[]`, 3 `documents[]`);
> office-only intake/certificate/fee/signature-date content and a duplicate
> owner-particulars/specimen-signature page are out of scope, disclosed in
> VERIFICATION.md. Sex, owner type, class of vehicle, and fuel-used carry no
> printed enum options in the source text, so they are modelled as
> free-text strings rather than invented enums, consistent with this
> registry's own `th/dlt` precedent for the same situation. The
> driving-licence forms were independently re-screened this cycle too and
> remain a confirmed dead end (still garbled/generic AcroForm field names,
> no legible text layer) — not attempted. Two valid conformance fixtures
> plus 5 mutation-control fixtures (each raising exactly 1 error) are
> committed under `conformance/bd/brta/`. See GOV-2644 and this schema's own
> `VERIFICATION.md` for the full sourcing record.

> **Update (2026-07-13, GOV-2644, "GovSchema Standard Research"): Greece adds
> a second Taxes-vertical schema**, via
> `gr/aade/analytiki-katastasi-misthomaton-akinitis-periousias-e2` — the
> Independent Authority for Public Revenue's (AADE) Form Ε2, "Αναλυτική
> Κατάσταση Μισθωμάτων Ακίνητης Περιουσίας" (rental/real-estate income
> declaration), a companion schedule to the already-published Form Ε1
> (`gr/aade/dilosi-forologias-eisodimatos-e1-e2-e3`, GOV-2621). Both Ε2 and
> Ε3 were flagged as open companion-schema backlog when Ε1 was authored;
> unlike Ε1 (sourced from a narrative instructions manual), Ε2 has its own
> dedicated static specimen PDF and FAQ, both fetched via Wayback Machine
> mirror (the primary `aade.gr` host remains Akamai-403-blocked from this
> sandbox, consistent with every other Greek AADE source in this registry).
> Independently re-fetched this cycle: HTTP 200, `application/pdf`, 76,961
> bytes, `sha256:
> 86c0ea9303799e7101c476fa3192bd7fbf2056e1bddeaf58d36ddbdd6ba58cbf`. This
> v1.0.0 models the primary rented-out-to-a-tenant case as a bounded
> 10-property repeating group (matching the specimen's own 10 pre-printed
> blank rows), 168 `fields[]` total; the co-ownership/sub-lessor
> supplementary panel and a separate unfinished/transferred/acquired-property
> table (both on page 2) are out of scope, disclosed in VERIFICATION.md. Two
> valid conformance fixtures plus 6 mutation-control fixtures (each raising
> exactly 1 error) are committed under `conformance/gr/aade/`. Form Ε3
> (business/professional activity income), also flagged as an open
> companion candidate when Ε1 was authored, remains backlog for a future
> cycle — this cycle's scouting confirmed it has its own strong dedicated
> sources (a specimen PDF, a sub-tables companion, an 89-page instructions
> manual, and an FAQ), just not yet authored. See GOV-2644 and this
> schema's own `VERIFICATION.md` for the full sourcing record.

> **Update (2026-07-13, GOV-2637, "GovSchema Standard Research"): Thailand's
> DMV vertical opens (4 of 6)**, via `th/dlt/vehicle-registration-application`,
> the Department of Land Transport's (DLT) "แบบคำขอจดทะเบียนรถ" (Vehicle
> Registration Application, form code ขส.บ. 10 ท.-9) — a candidate scouted in
> GOV-2635's prior cycle after the DLT's own e-form portal (dlt.go.th) proved
> network-unreachable from this environment (independently re-confirmed this
> cycle: a direct `curl` attempt against both `www.dlt.go.th` and
> `web.dlt.go.th` returned a TLS connection failure). Sourced instead from an
> unauthenticated commercial print-shop mirror (sc-broker.com), independently
> located and re-fetched this cycle (HTTP 200, `application/pdf`, 548,979
> bytes, sha256 `be2e76...80213`). Parsed with `pdfjs-dist`: **zero AcroForm
> widgets on either page** — a plain print-and-fill form, not a fillable
> AcroForm — and a garbled text layer (no usable `ToUnicode`/cmap), worked
> around by rendering both pages to PNG and reading the glyphs directly.
> Independently corroborated via a second, different chaiyaphumdlt.go.th
> citizen-service manual than the one first found: an initial same-domain
> candidate was fetched and ruled out (it covers a different legal basis,
> the Land Transport Act for commercial vehicles, and its own forms section
> states "no form provided"), before locating the correct manual — for
> exactly this form's new-vehicle/type-change process under the Motor
> Vehicle Act — whose own forms-list page names this form and its power-of-
> attorney requirement by title. This v1.0.0 scopes to page 1's
> applicant-facing content only (21 `fields[]`: identity, address, a
> new-vehicle/type-change purpose selector, vehicle/chassis/engine
> identification, and a free-text "other document" description; plus 7
> `documents[]` checklist entries) — page 1's own "staff only" intake/fee
> block, and the entirety of page 2 ("บันทึกการตรวจสภาพรถ", a 27-item vehicle
> condition inspection record across four inspection stations, entirely
> completed by DLT inspectors during in-person inspection, not the
> applicant) are out of scope, disclosed in VERIFICATION.md. Two hand-
> authored valid fixtures (0 errors each) plus 6 mutation-control fixtures
> (each raising exactly 1 error) passed. **Thailand now stands at 4 of 6
> verticals** (Taxes, Business Formation, Visa, DMV); the driver's-licence
> application was separately screened this same research cycle and confirmed
> a dead end (in-person only, staff-filled, no downloadable specimen).
> Passport and National ID remain screened/backlog. See GOV-2637 and this
> schema's own `VERIFICATION.md` for the full sourcing record and every
> scoping/disclosure judgment call.

> **Update (2026-07-13, GOV-2629, "GovSchema Standard Research"): Rwanda's
> Passport vertical opens (4 of 6)**, via
> `rw/dgie/passport-application-first-adult` — the Directorate General of
> Immigration and Emigration's (DGIE) first-time adult e-passport
> application, submitted exclusively through the Government of Rwanda's
> IremboGov online portal (irembo.gov.rw). There is no downloadable/fillable
> PDF specimen for this process (a pure portal-only SPA workflow), so this
> document is instead sourced from IremboGov's own official Support Center
> walkthrough article — the same accepted authoring pattern already used by
> `id/imigrasi/passport-application-first-adult` (Indonesia's M-Paspor) for a
> portal-only process. Independently re-fetched all four cited sources this
> cycle: the primary support article (HTTP 200, `text/html; charset=utf-8`,
> 106,136 bytes), a corroborating FAQ article confirming guest/no-login
> submission (HTTP 200, `text/html; charset=utf-8`, 62,228 bytes), a
> Canva-made screenshot-walkthrough PDF corroborating the same field set
> (HTTP 200, `application/pdf`, 149,839 bytes, confirmed **0 extractable
> text**/AcroForm content via zlib-stream inspection — a visual aid, not a
> specimen), and the DGIE's own service page (HTTP 200, `text/html;
> charset=utf-8`, 26,800 bytes). Read the primary article's full extracted
> plain-text body directly, and additionally fetched and visually inspected
> its own embedded screenshots of the live "Applicant Details" and "Passport
> & Travel Details" screens to confirm exact field labels, required-field
> asterisks, and dropdown option values (rather than relying on the
> article's prose alone). This v1.0.0 scopes to the single adult (18+),
> first-time-applicant pathway: 17 `fields[]` (ID number; profession/
> employer; height in cm; other-nationality/passport (optional); residence
> and birth-location country; street/house number (optional); contact phone/
> email; passport type — Service/Ordinary/Diplomatic — and validity; travel
> purpose, destination country, and destination city) and 6 `documents[]`
> entries (national ID copy, passport photo, signature, a
> passport-type-conditional recommendation letter, a Diplomatic-only
> appointment letter, and a verification-checkbox attestation). Disclosed
> scoping gap: the source's own screenshots confirm only a top-level
> "Country" select for both Residence Details and Birth Location, captured
> in their default unselected state, so this document does not confirm or
> model a deeper Province/District/Sector/Cell administrative-unit cascade
> (as this registry's own `rw/rdb/rf-001-domestic-company-application-for-
> incorporation` models for other Rwandan forms) — flagged for a future
> revision rather than invented. Also disclosed: a three-way discrepancy
> across sources on the signature attachment's exact format/size, resolved
> by trusting the live in-app "Attachments" screen's own notice as most
> authoritative. The minor/child applicant pathway, the passport-replacement
> pathway, and post-submission biometric-capture/collection steps are out of
> scope. Two mock conformance scenarios (0 errors each) plus 3 mutation-
> control fixtures (missing required field, invalid enum value, pattern
> violation — each raising exactly 1 error) passed. **Rwanda now stands at 4
> of 6 verticals** (DMV, Visa, Business Formation, Passport). Rwanda's
> remaining two verticals were screened this same research cycle (reported
> per the parent "GovSchema Standard Research" routine, not independently
> re-verified as part of this Passport-vertical authoring pass): **National
> ID is a confirmed dead end** (the Indangamuntu National ID is entirely
> Irembo-portal-gated plus in-person biometric/RIB verification, with no
> fillable specimen or field-by-field guide found); **Taxes surfaced only a
> companion annex form** (RRA's Annexe A, "RRA-PIT-ANA-E11"), not a full
> standalone return — flagged as a possible narrower companion-schedule
> candidate for a future cycle, not a full Taxes-vertical closure. See
> GOV-2629 and this schema's own
> `VERIFICATION.md` for the full sourcing record and every scoping/
> disclosure judgment call.
>
> **Update (2026-07-13, GOV-2621, "GovSchema Standard Research"): Greece's
> Taxes vertical opens (2 of 6)**, via
> `gr/aade/dilosi-forologias-eisodimatos-e1-e2-e3` — the Independent
> Authority for Public Revenue's (AADE) Form Ε1 annual personal income tax
> return, tax year 2025 edition. The primary `www.aade.gr` host remains
> Akamai-403-blocked from this sandbox, consistent with `gr/mfa`'s own
> finding for the same sandbox; the source used is AADE's own 153-page
> instructions manual ("Οδηγίες Συμπλήρωσης Δήλωσης Ε1 2025", edition dated
> 16 March 2026, under AADE decision Α.1062/2026, ΦΕΚ Β' 1280/09.03.2026),
> independently re-fetched this cycle via its Wayback Machine mirror: HTTP
> 200, `application/pdf`, 1,169,825 bytes, `sha256:
> 6055bc761a7ea193657176e80bbc0be68369f31aa26708c469b5c529310a3235`. Unlike
> `gr/mfa`'s Schengen-visa source (a numbered-item form facsimile), this
> source is a narrative field-by-field manual with zero AcroForm widgets and
> no form facsimile of its own — every field was read from the position-
> sorted text layer of the manual's own prose, navigated via the PDF's own
> table of contents. This v1.0.0 scopes to the salaried-employment/pension-
> income filing pathway: full taxpayer/spouse identification (Πίνακας 1, 17
> fields), all 24 informational/clearance Yes-No codes of Πίνακας 2 (39
> fields — 20 simple booleans, plus Κωδικοί 029-030's foreign-income/assets
> country-and-category sub-panel, Κωδικοί 007-008's hosted-person
> ΑΦΜ/months/area triple, and Κωδικοί 045-046/047-048's 6- and 5-item
> selectable sub-panels, none modeled as plain booleans once read
> individually), and all 19 employment/pension income-and-withholding code
> pairs of Υποπίνακας 4Α (41 fields, modeled as filer/spouse column pairs
> matching the source's own two-column structure). 98 `fields[]` total, 1
> `documents[]` entry (a tax-residence certificate, produced only on
> request). Πίνακας 3 (disability reduction), Υποπίνακας 4Β/4Γ1/4Γ2/4Δ1/4Δ2/
> 4Ε (seafarers, agricultural/business income, dividends/interest, rental
> income, capital gains), Πίνακες 5-9, and companion Forms Ε2/Ε3 are all
> out of scope, disclosed in VERIFICATION.md along with every Πίνακας-2
> multi-field modeling judgment call. Two mock conformance scenarios (a
> single unmarried filer; a married couple with foreign-account and
> hosting declarations) found **0 errors** each, plus 5 mutation-control
> fixtures (missing required field, a missing `requiredWhen` spouse field,
> an enum violation, a `pattern` violation, and a `maximum` violation) each
> correctly raised exactly **1 error**. See GOV-2621 and this schema's own
> `VERIFICATION.md` for the full sourcing record and every scoping/
> disclosure judgment call.
>
> **Update (2026-07-12, GOV-2611, "GovSchema Standard Research"): Greece
> opens as this registry's 45th jurisdiction, via its Visa vertical (1 of
> 6)**, via `gr/mfa/application-for-schengen-visa` — the EU-wide "Harmonised
> application form / Application for Schengen Visa" (Annex I to the Visa
> Code), served for Greek consulates by VFS Global — a candidate pre-scouted
> in GOV-2591's prior cycle after Vietnam/Peru won that cycle's parallel
> scouting round. The primary `mfa.gr`/`aade.gr` hosts remain Akamai-403-
> blocked from this sandbox, re-confirmed this cycle rather than assumed.
> Independently re-located and re-fetched via VFS Global's consulate
> mirrors: the canonical source (a bilingual EN/AR edition whose own
> data-protection notice names the Greek MFA at 1 Vas. Sofias Ave., Athens,
> as data controller) returned HTTP 200, `application/pdf`, 726,000 bytes,
> `sha256: 303a4c28a53a8b2d88ca219a2b1aff3033a14a25f58708b6c7957414cfeaa969`.
> Two further mirrors (Jordan, Lebanon) independently corroborated a
> content-identical English-only edition of the same 32-item form; a
> "2024 Final" candidate mirror was screened and ruled out as a flattened
> scan with zero extractable text. The form is a genuine static text-layer
> PDF with no AcroForm widgets on any mirror — fields were read directly
> from the position-sorted text layer. This v1.0.0 models items 1-16 and
> 19-33 of the applicant-facing left column (31 of 32/33 numbered items;
> the right-column "FOR OFFICIAL USE ONLY" block is out of scope), 97
> `fields[]` in total: 10 checkbox groups collapsed into 11
> `exclusivityGroups` (sex, civil status, travel-document type, residence
> in another country, purpose of journey, number of entries, prior
> fingerprints, cost-covered-by, and separate applicant/sponsor
> means-of-support and sponsor-identification sets, since the source does
> not share option values between the applicant and sponsor cost-coverage
> paths), plus six `requiredWhen`-gated "please specify" fields. Items 17-18
> (EU/EEA/CH/UK-national-family-member data, and the exemption from items
> 21/22/30/31/32 it would unlock for that smaller sub-population) are
> deliberately deferred out of scope, keeping this v1.0.0 scoped to the
> standard third-country-national applicant pathway — disclosed in
> VERIFICATION.md along with a minor edition difference (item 33 present
> only on the bilingual mirror) and a wording variance across mirrors on
> one field. Two mock conformance scenarios (a self-funded tourist,
> single-entry applicant; a sponsor-funded business applicant with
> multiple entries and a declared prior Schengen visa) found **0 errors**
> each, plus 5 mutation-control fixtures (missing required field, an
> exclusivity-group violation, a missing conditional "please specify"
> field, an empty-string `minLength` violation, and a missing required
> date) each correctly raised exactly **1 error**. See GOV-2611 and this
> schema's own `VERIFICATION.md` for the full sourcing record and every
> scoping/disclosure judgment call.
>
> **Update (2026-07-12, GOV-2612, "GovSchema Standard Research"): Bangladesh
> opens as this registry's 46th jurisdiction, via its Taxes vertical (1 of
> 6)**, via `bd/nbr/individual-income-tax-return-form-it-11ga` — the
> National Board of Revenue's (NBR) IT-11GA, "Form of Return of Income for
> Individual Person," 2023 edition. Scouted in GOV-2591's prior cycle
> alongside Rwanda's dead-end verticals: DMV (BRTA) has AcroForm fields over
> a scanned raster background with no OCR text layer, and Business
> Formation/Passport/National ID were confirmed dead ends, leaving Taxes as
> the strongest candidate. That prior cycle recorded no exact URL/hash to
> reproduce, so this cycle independently re-located the source from scratch
> via NBR's own English income-tax-forms page
> (`nbr.gov.bd/form/income-tax/eng`, HTTP 403 without a browser
> `User-Agent`, HTTP 200 with one) and re-fetched the linked PDF directly:
> HTTP 200, `application/pdf`, 381,696 bytes, `sha256:
> 2a7f51e37ac8f6e61fd153f002b799f36ca8ced56b0013ca5ff7d1459f76f724`. Parsed
> with `pdfjs-dist`: **10 pages, 0 AcroForm widgets** — a printed,
> text-layer-only form, confirming GOV-2591's prior characterization. Every
> field was extracted by reading the position-sorted text layer directly.
> The live 10-page source is a wide return: a 3-page main return (identity,
> income/tax-computation summary, tax-payment particulars, verification)
> plus five annexed schedules, a lifestyle-expense statement (IT-10BB), and
> a wealth statement (IT-10B). This v1.0.0 deliberately scopes to the
> general/salaried resident-individual filing pathway: the full 3-page main
> return, and Schedule 1's part (b) (income from employment for employees
> other than those on a government pay scale — the general/private-sector
> salaried case). Out of scope, disclosed in VERIFICATION.md: Schedule 1
> part (a) (government-pay-scale employees), Schedules 2-4 (rent,
> agriculture, business), Schedule 5's itemized investment-tax-credit
> breakdown (its bottom-line tax-rebate figure is still modeled as a
> pass-through field), and the IT-10BB/IT-10B companion statements (both
> mandatory per the source's own instructions for individual filers meeting
> certain thresholds, disclosed via an unmodeled `documents[]` entry rather
> than field-modeled). 78 `fields[]` and 3 `documents[]` entries. Two mock
> conformance scenarios (0 errors each) plus 5 mutation-control fixtures
> (each raising exactly 1 error) passed. Bangladesh now stands at 1 of 6
> verticals (Taxes); DMV, Business Formation, Passport, and National ID were
> screened in GOV-2591's prior cycle and found weak/dead-end — a future
> cycle re-confirming those before treating them as permanent would be
> prudent. See GOV-2612 and this schema's own `VERIFICATION.md` for the full
> sourcing record and every scoping/disclosure judgment call.
>
> **Update (2026-07-12, GOV-2601, "GovSchema Standard Research"): Thailand's
> Business Formation vertical opens (2 of 6)**, via
> `th/dbd/boj-1-application-to-register-a-limited-company`, the Department
> of Business Development (DBD)'s "แบบ บอจ.1" (Form บอจ.1) — a candidate
> scouted alongside a Visa candidate in GOV-2591's prior cycle and delegated
> in parallel (GOV-2599) after Taxes opened Thailand as this registry's 44th
> jurisdiction (GOV-2593). Independently re-fetched the source directly this
> cycle: HTTP 200, `application/pdf`, 801,091 bytes, `sha256:
> 433aace18e925d75236afe99e08796763744040e5f10f5781445e77d70796f72` —
> matching the task's own cited hash and size exactly. A 2-page, 101-
> AcroForm-widget specimen (45/56 per page, both re-confirmed via
> `pdfjs-dist`, correlating checkbox/text labels on **both** sides of each
> widget's rect after an early scratch pass showed left-only correlation
> returns empty checkbox labels on this form). Full-text reading of both
> pages found this form is not the comprehensive company-details form a
> naive reading of "application to register a limited company" might
> suggest: page 1 is a registrar-facing routing/cover form whose 20
> checkboxes are a 17-value registration-action-type selector (new
> incorporation, standalone Memorandum-of-Association registration,
> partnership conversion, capital increase/decrease/merger special
> resolution, five distinct Memorandum/Articles amendment sub-types, a
> merger, a director change, and others) plus 3 independent post-
> registration add-on requests (labor-bylaw copy, trademark registration,
> import/export ID card) — not, as initially anticipated, a document-
> attachment checklist. Page 2 is a bundled "หนังสือรับรอง" (Certificate of
> Incorporation) template the Registrar completes and issues after
> approval, not an applicant input. This v1.0.0 scopes to the new-
> incorporation (`จัดตั้งบริษัทจำกัด`) action pathway: the full 17-value
> `registrationActionType` enum (self-contained per the source's own single
> checkbox group), the 3 post-registration add-on checkboxes, company-name/
> existing-registration identification, a two-signatory signature block,
> and the page-1 footer's statutory false-statement warning notice — 10
> `fields[]` and 1 `documents[]` entry. The 16 non-formation action types'
> own dependent free-text sub-fields (14 widgets), the Registrar/witness
> certification block, and the entirety of page 2 (56 widgets) are
> explicitly out of scope and disclosed in `VERIFICATION.md`. Two mock
> conformance scenarios (0 errors each) plus 5 mutation-control fixtures
> (each raising exactly 1 error) passed. **Thailand now stands at 2 of 6
> verticals** (Taxes, Business Formation); DMV, Passport, and National ID
> were screened in GOV-2591/GOV-2593's prior cycle and found weak/dead-end;
> Visa (MFA Non-Immigrant Visa B/Employment, 58 AcroForm fields) was
> delegated in parallel to GOV-2602. See GOV-2601 and this schema's own
> `VERIFICATION.md` for the full sourcing record and every scoping/
> disclosure judgment call.
>
> **Update (2026-07-12, GOV-2602, "GovSchema Standard Research"): Thailand's
> Visa vertical opens (2 of 6)**, via
> `th/mfa/non-immigrant-visa-b-application-for-employment`, the Ministry of
> Foreign Affairs' (MFA) Non-Immigrant Visa (B) for Employment specimen — a
> candidate pre-scouted (58 AcroForm fields) in GOV-2593's prior cycle and
> left as backlog. The task named only a widget count and topic, no specific
> URL; independently located the source this cycle via a fresh search
> restricted to `mfa.go.th`, screening out two sibling visa-application PDFs
> (0 and 103 widgets respectively) before confirming this one's widget count
> matched exactly. Independently re-fetched and hashed: HTTP 200,
> `application/pdf`, 270,415 bytes, `sha256:
> 8e61fcc80bd6260f83f86b01d5443f54a75eda4ef915c3c5449e498b8b2600d4`. A
> 2-page specimen — page 1 a non-fillable 10-item document checklist (0
> AcroForm widgets, modelled as `documents[]`), page 2 the MFA's own generic
> "APPLICATION FOR VISA" AcroForm (footer-stamped `mfavisaform 10 09 2007`,
> shared across all MFA visa categories) carrying all 58 widgets, confirmed
> via `pdfjs-dist`. 2 of the 58 widgets are excluded as non-visible,
> near-zero-dimension artifacts with no printed label (disclosed in
> VERIFICATION.md); the remaining 56 collapse into 57 `fields[]` (3
> checkbox groups — visa-type-requested, title, purpose-of-visit — modelled
> as independent booleans plus `exclusivityGroups`, per this registry's
> established convention) plus 10 `documents[]` from page 1's checklist.
> Disclosed: the source's own printed options never literally say
> "Employment" (`visaTypeNonImmigrant`/`purposeOfVisitBusiness` are each
> flagged as the closest applicable option, not asserted as canonical); the
> page-2 "FOR OFFICIAL USE" block carries no AcroForm widgets at all and is
> out of scope. Two mock conformance scenarios found 0 errors each, and 5
> mutation controls each raised exactly 1 error. **Thailand now at 2 of 6
> verticals** (Taxes, Visa); Business Formation is in progress via a
> concurrent GOV-2601 child of the same research cycle, and DMV/Passport/
> National ID remain screened dead-end/backlog. See GOV-2602 and this
> schema's own `VERIFICATION.md` for the full sourcing record and every
> scoping/disclosure judgment call.
>
> **Update (2026-07-12, GOV-2593, "GovSchema Standard Research"): Thailand
> opens as this registry's 44th jurisdiction, via its Taxes vertical (1 of
> 6)**, via `th/rd/pit-90-personal-income-tax-return`, the Revenue
> Department's (RD) "ภ.ง.ด.90" (PIT 90) personal income tax return, tax year
> 2568 (2025 CE) edition — a candidate scouted in GOV-2591's prior cycle
> after Rwanda's remaining verticals were confirmed dead ends. Independently
> re-fetched the source directly this cycle: HTTP 200, `application/pdf`,
> 1,629,183 bytes, `sha256:
> e47796b2b5a5e253407dc6e1d0accebb0ebcf18456ff5ee08396c487786e84e5` —
> matching the issue's own cited hash and size exactly. A 5-page, 432-
> AcroForm-widget specimen (76/95/112/78/71 per page, both re-confirmed via
> `pdfjs-dist`); PIT 90 is Thailand's return for a taxpayer with income
> beyond pure salary (Revenue Code sections 40(2)-(8)), covering up to 8
> income-type schedules across pages 2-4 plus a personal-deductions
> attachment on page 5. This v1.0.0 deliberately scopes to the general/
> salaried-income filing pathway: page 1's full taxpayer/spouse
> identification, marital/filing status, the political-party tax-donation
> declaration, and the refund-request/signature block; ข้อ 1 (income under
> sections 40(1)-(2): employment/wages/pension and service-fee/commission
> income); ข้อ 11 (the final 25-line tax computation, including the
> alternative 0.5%-of-gross computation and its floor, completed by every
> filer regardless of income type); and the page 5 personal-deductions/
> allowances attachment (24 numbered items). ข้อ 2 through ข้อ 10 — the
> royalty/goodwill, dividend/interest, rental, professional-fee,
> contracting, business/commerce, separate-taxation real-estate-sale and
> gift/inheritance schedules, and the RMF/Thai-ESG/pension-insurance
> exclusion election — are explicitly out of scope and disclosed in
> `VERIFICATION.md`. 154 `fields[]` entries and 2 `documents[]` entries (the
> printed certification statement and refund supporting evidence). Two mock
> conformance scenarios (a single salaried filer with a small refund due; a
> married filer electing joint computation with children, a disability
> allowance, and additional tax due) found 0 errors each, and 5 mutation-
> control fixtures each raised exactly 1 error. Thailand's DMV, Passport,
> and National ID verticals were screened this cycle and found weak/dead-end
> (in-person/biometric processes with no unauthenticated fillable specimen);
> two further Thailand candidates (DBD Form บอจ.1 for Business Formation,
> 101 AcroForm fields; MFA Non-Immigrant Visa B/Employment, 58 AcroForm
> fields) are left as backlog. See GOV-2593 and this schema's own
> `VERIFICATION.md` for the full sourcing record and every scoping/
> disclosure judgment call.
>
> **Update (2026-07-12, GOV-2585, "GovSchema Standard Research"): Rwanda's
> Business Formation vertical opens (3 of 6)**, via
> `rw/rdb/rf-001-domestic-company-application-for-incorporation`, the Rwanda
> Development Board's (RDB) "RF-001 Domestic Company Application Form for
> Incorporation", a candidate pre-scouted and confirmed strong in GOV-2569's
> research cycle but left unauthored until now. Independently re-fetched the
> source directly this cycle: HTTP 200, `application/pdf`, 1,218,128 bytes,
> `sha256:
> 0bbcfa32fc17ea7d38365575bcadf72a7948c029bacd020e505757396700da8b` —
> matching the issue's own cited hash and size exactly. A 10-page, 18-
> numbered-section specimen with a real, position-anchored text layer but
> **0 AcroForm widgets** (confirmed via `pdfjs-dist`), like `rw/dgie`'s Visa
> specimen — a flat, print-and-hand-fill form despite its 1.2MB size (the
> weight comes from embedded fonts/graphics, not a scanned image). Models
> the shared form's full printed breadth: the Registration-reason and
> Category (company-type) selectors; company Identification; the filing
> Applicant; Head office address; an optional Chairman of the board; the
> Managing director; an optional Company employee/secretary; a bounded
> 2-slot Member of the board group; optional Auditor and Accountant blocks
> (each a Person-or-Organization alternative); a bounded 3-slot Business
> activities group (flattened from the source's own unbounded ~17-row
> table); company-level Capital information (a 5-subtype share table plus a
> Guarantee type/Amount table, each `requiredWhen` the selected Category
> implies shares or a guarantee respectively); a first Subscriber slot and a
> first Guarantor slot (each Person-or-Organization, bounded to 1 slot per
> the source's own "Add more pages as needed" note); and the
> Amalgamation/Declaring-to-be-dormant/Dissolution sections, each
> `requiredWhen` the matching Registration-reason value. 256 `fields[]`
> entries and 19 `documents[]` entries (18 checklist attachments plus the
> printed certification statement). One modelling bug was caught and fixed
> during this cycle's own conformance-fixture testing: an earlier draft
> `requiredWhen`-gated all 5 share-table subtypes identically, which a
> from-scratch positive fixture (a single-ordinary-share-class
> incorporation) correctly flagged as over-strict (8 spurious errors) before
> the gating was narrowed to only the Ordinary-share row. Two mock
> conformance scenarios (a Limited-by-shares-private incorporation with a
> single individual subscriber; a Limited-by-guarantee-private incorporation
> exercising the full officer roster) found 0 errors each, and 5 mutation-
> control fixtures each raised exactly 1 error. **Rwanda now stands at 3 of
> 6 verticals** (DMV, Visa, Business Formation); Passport, Taxes, and
> National ID remain open. See GOV-2585 and this schema's own
> `VERIFICATION.md` for the full sourcing record and every scoping/
> disclosure judgment call.
>
> **Update (2026-07-12, GOV-2577, "GovSchema Standard Research"): Nigeria's
> Passport vertical closes (5 of 6)**, via
> `ng/nis/application-for-nigeria-standard-passport`, the Nigeria
> Immigration Service's (NIS) "Form C1 — Application for Nigeria Standard
> Passport" (Adult pathway), continuing Nigeria's research thread from
> GOV-2567/GOV-2569, where this candidate was first identified and left as
> backlog. Independently re-fetched the Nigeria High Commission, London's
> own mirror this cycle: HTTP 200, `application/pdf`, 170,446 bytes,
> `Last-Modified: Tue, 06 Jun 2023`, `sha256:
> 85d970ee602c3bb9d98e1fd850541a8d63d9fd2f5c45c5a6b2281cf98bc317a4` —
> matching the byte count already recorded in the GOV-2569 update exactly.
> A flat, print-and-hand-fill 6-page PDF bundle (0 AcroForm widgets across
> all pages, confirmed via a fresh `pdfjs-dist` extraction) whose misleading
> filename (`LostReqForm.pdf`) belies its actual scope: Form C1 itself
> occupies only page 1, while the bundle also carries three distinct
> companion documents disclosed rather than dropped — a guarantor affidavit
> ("Form of Undertaking and Guarantee," Form P/21, pages 2-3, its own Parts
> I-III), a "Statutory Declaration of Lost Passport" (page 4), and a
> "Statutory Declaration of Age" (page 5) — each modelled as a
> conditionally-required `documents[]` entry rather than as this schema's
> own `fields[]`, since each is separately executed/signed by a guarantor
> or declarant distinct from the passport applicant. 40 `fields[]` entries
> cover Form C1's applicant-particulars section (identity, physical
> description, next-of-kin, a bounded 4-row "particulars of children to be
> endorsed on Mother's passport" table) plus a `reasonForApplication` field
> modelled at its full 6-value printed breadth (First Issue / Re-issue /
> Damaged / Lost / Change of data / Dual National) rather than narrowed to
> first-time-adult only, since the specimen is structurally one form
> serving all six reasons with equal footing — disclosed as appearing only
> within the specimen's "For Official Use Only"/receipt-counterfoil
> section rather than the applicant-facing top section, yet modelled as
> core applicant data since it reflects the applicant's own stated reason.
> 5 `documents[]` entries in total (the three companion documents above,
> plus a false-declaration caution acknowledgement quoted verbatim and a
> passport fee payment with no fixed amount printed on this specimen). Two
> mock conformance scenarios (a first-issue single applicant; a lost-
> passport married applicant with a child to endorse) found 0 errors each,
> plus 5 mutation controls (a missing required field, an invalid date
> format, an invalid enum value, a missing conditional field, a missing
> required document) each correctly raised exactly 1 error. See the
> document's own VERIFICATION.md for the full sourcing record and every
> disclosed scoping/judgment call, including the Adult-pathway scoping
> decision and the absence of any printed photograph requirement on this
> specimen (flagged as a real-world gap for a future cycle, unlike the
> Visa sibling's specimen, which does print one). **Nigeria now stands at
> 5 of 6 verticals** (Business Formation, Taxes, Visa, National ID,
> Passport); DMV remains the sole confirmed dead end.

> **Update (2026-07-12, GOV-2569, "GovSchema Standard Research"): Nigeria's
> National ID & Civic Documents vertical closes (4 of 6)**, via
> `ng/nimc/nin-enrolment-form`, the National Identity Management Commission's
> (NIMC) "National Identification Number (NIN) Enrolment Form" v2.0 — a
> pre-enrolment form completed before an in-person biometric-capture
> appointment at an NIMC enrolment centre. Scouted this cycle (child of
> [GOV-2567](/GOV/issues/GOV-2567)) alongside NG Passport (NIS "Form C1", a
> Nigeria High Commission London mirror) and RW Business Formation (RDB
> "RF-001 Domestic Company Application"), both strong candidates left as
> backlog for a future cycle. Fetched directly from an official `.gov.ng`
> mirror (`bern.foreignaffairs.gov.ng`, the Nigerian Ministry of Foreign
> Affairs' own Bern embassy subsite, since NIMC's own historical static PDF
> path now 404s after a 2024 site redesign to a JS SPA, per Wayback CDX
> history): HTTP 200, `application/pdf`, 1,677,660 bytes, `sha256:
> 99200bb832d4463e6bcdf8be78dd08ed14241d614a407830dc86093855af9638`. A flat,
> non-AcroForm print-and-fill specimen (0 widgets across both pages,
> confirmed via a fresh `pdfjs-dist` extraction); required fields were
> determined by cross-checking every printed `*` glyph's own coordinate
> against its nearest field label, per the form's own footer instruction
> "ALL FIELDS MARKED * MUST BE FILLED." 104 `fields[]` + 1 `documents[]`
> entry across the form's 18 lettered sections (A–R): names and any prior
> name change, residence/homelessness status, date/place of birth, place of
> origin (the applicant's own, father's, and mother's), physical features
> and disability, residence status and nationality, requested card type, an
> existing-NIN field for personal-data-update requests only, up to 9
> optional supporting identity documents (number + expiry each), marital
> status, languages, education, religion, occupation, employment,
> card-delivery preference, contact details, both parents' particulars
> (including each parent's NIN if available), guardian details, next of kin
> and their address, and the applicant's declaration. Two mock conformance
> scenarios (an unmarried first-time applicant; a married personal-data-update
> applicant with a supporting document and physical-challenge disclosure)
> found 0 errors each, plus 5 mutation controls (a missing required field, an
> invalid date format, an invalid enum value, a missing conditional field, a
> missing required document) each correctly raised exactly 1 error. See the
> document's own VERIFICATION.md for the full sourcing record and every
> disclosed scoping/judgment call, including the Guardian Details section's
> unconditional printed asterisks (no minor/adult-applicant toggle exists on
> the form to gate them). **Nigeria now stands at 4 of 6 verticals**
> (Business Formation, Taxes, Visa, National ID); DMV was confirmed a dead
> end in a prior cycle (GOV-2561); Passport is the sole remaining open
> backlog vertical, with the NIS Form C1 candidate identified above ready to
> author next cycle.

> **Update (2026-07-12, GOV-2561, "GovSchema Standard Research"): Nigeria's
> Visa vertical opens (3 of 6)**, via
> `ng/nis/application-for-visa-entry-permit`, the Nigeria Immigration
> Service's "Form Imm. 22 — Application Form for Visa/Entry Permit", scoped
> to embassy/consular use abroad. Independently re-fetched two of the three
> cited mirrors directly: the Embassy of Nigeria in Vietnam's own government
> domain (`nigeriaembassy.org.vn`, HTTP 200, `application/pdf`, 373,872
> bytes, Last-Modified 2020-11-21, matching the citation exactly) — a
> simplified 2-page, 25-question edition used as this schema's primary
> `source` since it is the only own-government-domain copy — and a
> Nigerian-Embassy-Washington-DC-letterheaded copy on a third-party domain
> (`samspassport.com`, HTTP 200, `application/pdf`, 43,156 bytes), a fuller
> 3-page, 31-question edition that itself prints the form's own designation
> "Form Imm. 22" and supplies this schema's base field structure. A third
> cited mirror (`nigerianvisaservices.com`) returned a Cloudflare
> human-verification challenge page on an early fetch attempt this cycle,
> but a later independent re-fetch (both with and without a browser-like
> User-Agent) found it live — `application/pdf`, 88,509 bytes — confirming
> the earlier challenge was a transient failure, not a genuine access gate;
> its content is a separately re-typeset rendering (not byte-identical to
> either other mirror) but carries the same "Form Imm. 22" title and item
> numbering, corroborating rather than contradicting the other two sources.
> Both verified editions carry **0 AcroForm widgets** (flat, print-and-hand-fill
> forms, the same tier as this registry's `rw/dgie` specimen). Independent
> side-by-side extraction of both editions' full printed text found the
> child issue's framing of the DC edition as a strict superset of the
> Vietnam edition does not hold exactly: the DC edition's 31 items do add
> substantial content (number-of-entries, funds available, employment/
> spouse-in-Nigeria particulars, prior Nigerian-visa history,
> immigration/criminal/health-history screening, countries lived-in/visited
> in the last 5 years/12 months, and the fee/attachments schedule), but the
> Vietnam edition also independently asks 6 items the DC edition omits
> entirely (e-mail address, complexion, academic qualifications, source of
> sponsorship, and a mission-localized "reference in [country]" name/
> address/telephone) — corrected and disclosed rather than silently adopting
> the issue's characterization. This schema models the union: 93 `fields[]`
> entries (86 from the DC edition's 31-item structure, including a bounded
> 3-slot prior-visit table and two bounded 4-slot countries-lived-in/visited
> tables per this registry's established repeating-group convention, plus 7
> from the Vietnam edition's edition-unique items, modeled as independently
> optional fields) and 9 `documents[]` entries (the photograph requirement
> printed on both editions, the DC edition's attachments-and-fee schedule —
> original passport, letter of invitation, prepaid return mailer, an online
> visa-fee payment, a $20 money-order processing fee, an optional $65
> expedited fee — its under-16 accompanying-child document bundle, and its
> wet-ink certification statement). Two mock conformance scenarios (a
> single, first-time tourist applicant; a married business applicant with a
> prior rejected visa application and a prior visit) found 0 errors each,
> plus 5 mutation controls (a missing required field, an invalid date
> format, an invalid enum value, a missing conditional field, and a missing
> required document) each correctly raised exactly 1 error. See the
> document's own VERIFICATION.md for the full sourcing record and every
> disclosed scoping/judgment call. **Nigeria now stands at 3 of 6 verticals**
> (Business Formation, Taxes, Visa); DMV was screened this cycle and
> confirmed a dead end (state/FRSC licensing is SSO-portal-gated with no
> downloadable specimen); Passport and National ID remain open, unscreened
> backlog for a future cycle.

> **Update (2026-07-12, GOV-2553, "GovSchema Standard Research"): Nigeria's
> Taxes vertical closes (2 of 6)**, via
> `ng/firs/fct-irs-personal-income-tax-return-form-a`, the Federal Capital
> Territory Internal Revenue Service (FCT-IRS)'s "Form A" Personal Income Tax
> Return Form, filed under the Personal Income Tax Act (PITA). Nigerian
> personal income tax is administered state-by-state (each state plus the
> FCT runs its own IRS under the nationally-standardized PITA framework), so
> this schema is deliberately scoped `jurisdiction.level: subnational`,
> `subdivision: NG-FC` rather than asserted as a single national form.
> Independently re-fetched the cited source directly (HTTP 200,
> `application/pdf`, 323,404 bytes, Last-Modified 2025-10-09, `sha256:
> 5062478b44c42c94524d773691e0903d2328640a9d5f3a252475c094a3bd324d`),
> confirming the child issue's own citation exactly. A fresh `pdfjs-dist`
> extraction confirms **0 AcroForm widgets** across the 2-page specimen — a
> flat print-and-hand-fill form, the same tier as this registry's `rw/dgie`,
> `pe/sunat`, `uy/dgi`, and `ke/brs` specimens — and also surfaced a
> font-rendering defect in the specimen's embedded bold typeface that made
> `pdfjs-dist`/`node-canvas` silently drop most bold caption glyphs on
> render; two tables' row counts (domestic servants, Part D allowances) were
> confirmed via the rendered vector ruling-line geometry instead, since their
> captions render invisible under this defect. 82 `fields[]` cover Part A
> (Personal Details), Part B (Statement of Income — earned income from
> trade/employment/pension/foreign sources, investment income from
> dividends/interest/rents/other profits), a conditional spouse-and-children
> block (a bounded, printed 4-slot children table), Part C (Benefits in
> Kind, including bounded 2-slot domestic-servants and vehicles tables), and
> Part D (a bounded 2-slot life-assurance/gratuities/NHIS/pension-
> contribution table), plus the closing declaration. This specimen carries
> **zero asterisks or any other required-field marking convention anywhere**
> in its text (confirmed by a full-text scan) — a disclosed judgment call
> models every Part B income-statement line required with a 0-permitting
> minimum (a filer with none of a given income type still enters 0), while
> the spouse/children block and every Part C/D item, none of which apply to
> every filer, are modeled optional; no synthetic Marital Status field was
> invented to gate the spouse/children block, since the specimen has no
> corresponding checkbox to reference, per this registry's `ng/cac` Section
> D/D1 precedent. A disclosed printed-label discrepancy: the source's own
> "Aggregate Investment Income (iv - vii above) (Y)" label cannot literally
> mean items (iv)-(vii), since item (iv) is already summed into the
> preceding "Aggregate Earned Income (i-iv above) (X)" line — this schema
> models the field as the sum of items (v)-(viii) instead, the only
> numerically consistent reading, with the printed range quoted verbatim
> rather than silently re-typeset. 8 `documents[]` entries capture the
> specimen's own "Attach ..." instructions (6 conditional, disclosed via
> `handling` prose since no boolean field exists to gate a `requiredWhen`
> cleanly) plus the signed declaration statement (required). Two mock
> conformance scenarios (a single-employed filer with no benefits; a married
> filer with two children, employer-paid rent, a domestic servant, a
> vehicle, and a life-assurance policy) found 0 errors each, plus 4 mutation
> controls (a missing required field, an email-pattern violation, an enum
> violation, and a vehicle-year range violation) each correctly raised
> exactly 1 error. See the document's own VERIFICATION.md for the full
> sourcing record and every disclosed scoping/judgment call. **Nigeria now
> stands at 2 of 6 verticals** (Business Formation, Taxes); Passport, DMV,
> Visa, and National ID remain open, unscreened backlog for a future cycle.

> **Update (2026-07-12, GOV-2544, "GovSchema Standard Research"): Rwanda's
> Visa vertical opens (2 of 6)**, via `rw/dgie/visa-application` (Directorate
> General of Immigration and Emigration's standard "VISA APPLICATION"
> specimen used at Rwandan diplomatic missions abroad), resolving GOV-2526's
> disclosed open, unresolved Visa candidate. The specimen is a flat,
> print-and-hand-fill PDF with **0 AcroForm widgets** (unlike
> `rw/rra/vrf-e06-motor-vehicle-registration-form`'s genuine AcroForm/XFA),
> confirmed byte-identical (`sha256:
> 01ffbc05db088ece045c25867f791892dc3b9eed808b1445867f3d29946378c0`, 233,226
> bytes) across two independent embassy mirrors (Rwandan embassies in the UK
> and the USA) whose differing `Last-Modified` headers (2021 vs. 2024)
> independently corroborate this as DGIE's one current standard specimen
> rather than a stale single copy; migration.gov.rw's own visitors-visa page
> confirms "the office of a diplomatic mission of Rwanda" as a current
> issuance channel. Covers 27 numbered items across 2 pages (identity/
> passport particulars, parents' and conditionally-required spouse
> particulars, prior travel history, host/purpose of travel, and a bounded
> 4-slot printed repeating group for accompanying children), modelled as 48
> `fields[]` (several numbered items split into multiple side-by-side printed
> blanks) plus 2 `documents[]` entries (a coloured-photo requirement and a
> printed certification statement). Two mock conformance scenarios (a single
> first-time tourist; a married applicant with 2 accompanying children) found
> 0 errors each, plus 4 mutation controls (a missing required field, an
> invalid date format, an invalid enum value, and a missing conditional
> spouse field) each correctly raised exactly 1 error. See the document's own
> VERIFICATION.md for the full sourcing record and every disclosed
> judgment call, including why the children sub-fields are deliberately left
> without a machine-checked `requiredWhen` gate. **Rwanda now stands at 2 of
> 6 verticals** (DMV, Visa); Business Formation, National ID, Passport, and
> Taxes remain confirmed dead ends per GOV-2526.

> **Update (2026-07-12, GOV-2535, "GovSchema Standard Research"): Kenya's
> Taxes vertical closes (3 of 6)**, via
> `ke/kra/it1-individual-resident-return`, the Kenya Revenue Authority
> (KRA)'s "IT1 Individual Resident Return" Excel workbook (edition 18.0.1;
> a genuinely live, unencrypted 34-sheet .xls, independently re-fetched and
> re-hashed this cycle — `sha256:
> 7c85241bbabc797b9e3c6b708209a32866c4ec9131f9d845d0b87c9734e939e2`). This
> was Kenya's sole remaining open, previously-scouted-in-depth vertical
> candidate (Passport, DMV, and Visa were already confirmed dead ends in
> the GOV-2500 cycle); a same-cycle GOV-2517 correction had already
> restored this candidate to the open backlog after an intervening
> reversal wrongly called it a dead end. This schema deliberately bounds
> scope to the workbook's "employed resident individual" filing pathway
> across 5 of its 34 sheets (`A_Basic_Info`, `F_Employment_Income`,
> `M_Details_of_PAYE_Deducted`, `T_Income_Computation_Self`,
> `T_Tax_Computation`), covering 86 `fields[]` with a bounded 2-employer
> repeating group spanning the employment-income and PAYE-deducted sheets.
> Every self-employment/business-income, farming, partnership, estate/
> trust, capital-allowance, and tax-credit schedule, plus the workbook's
> entire mirrored spousal ("Wife") filing pathway, is out of scope and
> disclosed as a companion-schedule candidate for a future cycle. Two
> disclosed ambiguities the source itself leaves unresolved (an author
> comment questioning whether the mortgage-interest and home-ownership-
> savings-plan deductions are mutually exclusive; an author comment
> flagging the embedded Ksh 13,944 personal-relief figure as a
> configurable template default, not an asserted-current legal amount) are
> quoted verbatim rather than silently resolved. Two mock conformance
> scenarios (a single-employer taxpayer with a small tax payable; a
> two-employer taxpayer with a disability exemption certificate and a
> refund due) found 0 errors each, plus 3 mutation controls (a missing
> required field, and two missing `requiredWhen`-gated fields) each
> correctly raised exactly 1 error. See the document's own VERIFICATION.md
> for the full sourcing record and every disclosed scoping/judgment call.
> **Kenya now stands at 3 of 6 verticals** (Business Formation, National
> ID, Taxes); Passport, DMV, and Visa remain confirmed dead ends, so no
> vertical remains open-and-unscreened for Kenya.

> **Update (2026-07-12, GOV-2526, "GovSchema Standard Research"): Rwanda
> opens as this registry's 43rd jurisdiction**, via its DMV vertical (1 of
> 6), sourced from the Rwanda Revenue Authority (RRA)'s Motor Vehicle
> Registration Form (form code RRA-MVD-VRF-E06) — Rwandan law assigns motor-
> vehicle registration to the tax authority rather than a separate transport
> agency. A prior scouting pass (GOV-2507, see the Known Gaps entry below)
> had cited this form's byte size and a widget-type breakdown; independently
> re-fetching and re-deriving from scratch confirmed the byte size exactly
> (191,913 bytes, `sha256:
> 1c580d7766fb2c7dad73aa627d5e634256e27f1475e104fb8e9728137a3337b7`, fetched
> unauthenticated directly from `rra.gov.rw`), but **corrected the cited
> widget-type breakdown** — a fresh `pdfjs-dist` extraction found 46 widgets
> (37 text, 5 radio-button, 4 signature), not the "42 text, 3 signature, 1
> button/radio" the prior pass had cited (the overall widget count of 46 was
> exactly right; the per-type split was off). Extraction also surfaced a
> genuine AcroForm authoring defect: a single shared radio-button field
> object spans two unrelated printed questions — the Section C "Steering
> Wheel" selector (Left/Right/N-A) and the Section B "Customs Regime"
> selector (Consumption/Suspension) — meaning in a real PDF viewer, selecting
> one would silently clear a selection made for the other. This schema does
> not preserve that defect, modelling the two questions as independent
> `enum` fields, with the shared-field bug disclosed rather than silently
> fixed without comment. 28 `fields[]` (of 46 widgets; the office-only "For
> RRA Use Only" section and all 4 signature widgets are excluded, per this
> registry's usual signature-capture convention) cover owner identification,
> registration information (including an imported vehicle's customs/clearing-
> agent particulars), vehicle information, and certification; 1
> `documents[]` attestation entry captures the printed certification
> statement. Two mock conformance scenarios (a domestic registration; an
> imported vehicle with the full customs block) found 0 errors each, plus 4
> mutation controls (a missing required field, an enum violation, a missing
> required document, and a numeric-range violation) each correctly raised
> exactly 1 error. This cycle's own re-check of Rwanda's other five
> verticals confirmed Business Formation, National ID, Passport, and Taxes
> all remain dead ends (routing exclusively through the login/payment-gated
> IremboGov one-stop portal or an in-person-only RRA process), but found
> Visa is **not** a clean dead end as the prior pass's blanket claim had it —
> two PDF candidates (a 2021 embassy mirror, a 2013 RDB-hosted form) were not
> conclusively resolved either way this cycle and are left as an open,
> unresolved candidate rather than force-fitted or asserted dead. See the
> document's own VERIFICATION.md for the full sourcing record and every
> disclosed scoping/judgment call. **Rwanda now stands at 1 of 6 verticals**
> (DMV).

> **Update (2026-07-12, GOV-2518, "GovSchema Standard Research"): Nigeria
> opens as this registry's 42nd jurisdiction**, via its Business Formation
> vertical (1 of 6), sourced from the Corporate Affairs Commission (CAC)'s
> Form 1.1, "Application for Registration of Company." A prior scouting pass
> (GOV-2507) had flagged this form and cited a hash/byte size/widget count;
> independently re-fetching and re-deriving from scratch confirmed the
> hash/byte size exactly (`sha256:
> b0c57c0d8b9fc48e0fa5c944e2c8a9e04e8b9ad58b6c4cc2b9c348f86092c07e`,
> 415,060 bytes, fetched unauthenticated from a Federal Ministry of
> Industry, Trade and Investment mirror since `cac.gov.ng` itself 403s from
> this sandbox), but **corrected the cited widget count** — a fresh
> `pdfjs-dist` extraction across all 4 pages found 87 widgets (75 text, 9
> choice, 3 checkbox), not the "3 button, 2 choice" the prior pass had
> cited; the choice-widget count was undercounted by 7. Extraction also
> surfaced a genuine AcroForm authoring defect: the ID-type and gender
> dropdowns are the **same fully-qualified field name reused across all 4
> printed director slots** (plus the individual secretary, for ID type) —
> in a real PDF viewer this would silently synchronize every slot's value
> to whichever was filled in last. This schema does not preserve that bug,
> modelling each slot's ID type/gender as its own independent field, with
> the defect disclosed rather than silently corrected without comment. A
> legal-currency check confirmed the Companies and Allied Matters Act 2020
> (CAMA 2020) — not the 1990 Act this specimen's own cover page still cites
> — is the currently governing statute, and that CAC's incorporation
> process is now conducted primarily through CAC's own login-gated Company
> Registration Portal (iCRP); Form 1.1 itself remains a currently and
> unauthenticated reachable structural reference, the same
> "structural-reference-over-a-now-primarily-online-process" framing this
> registry has used for `pe/sunat`, `uy/dgi`, and `ke/brs`. 85 `fields[]`
> (of 87 widgets, 2 excluded as raw "Signature:"-labelled text boxes in the
> Secretary sections) cover the type-of-company selection (modelled as 3
> booleans in an `exclusivityGroups` entry, since the source's own 3
> checkboxes are independent Btn widgets, not a native radio group), company
> name/address/share-capital particulars, the form's exact 4 printed
> first-director slots and their consent to act, an individual- or
> corporate-body secretary, the legal-practitioner statutory declaration of
> CAMA compliance, and the presenter-of-filing block. 8 `documents[]` (a
> per-person ID copy and the memorandum/articles of association, both
> unconditionally required; 4 conditional supporting documents — a minor
> subscriber's birth certificate, a corporate-subscriber board resolution, a
> foreign corporate subscriber's certificate of registration, and a foreign
> director/subscriber's residence permit — each disclosed via prose rather
> than a fabricated `requiredWhen`, since this schema's flattened director
> slots carry no boolean to gate on; plus the director's consent attestation
> and the deponent's statutory-declaration attestation). Two mock
> conformance scenarios (a private company limited by shares with a single
> director; a company limited by guarantee with two directors, an
> individual secretary, and a legal-practitioner Section E declaration)
> found 0 errors each, plus 5 mutation controls (a missing required field,
> an email pattern violation, an ID-type enum violation, a missing required
> document, and a type-of-company exclusivity violation) each correctly
> raised exactly 1 error. See the document's own VERIFICATION.md for the
> full sourcing record and every disclosed scoping/judgment call. **Nigeria
> now stands at 1 of 6 verticals** (Business Formation); Passport, DMV,
> Taxes, Visa, and National ID remain open, unscreened backlog for future
> cycles.

> **Update (2026-07-12, GOV-2510, "GovSchema Standard Research"): Ghana
> opens as this registry's 41st jurisdiction**, via its National ID & Civic
> Documents vertical (1 of 6), sourced from the National Identification
> Authority's (NIA) `gh/nia/ghana-card-application-form-1a` v1.0.0 — "Form
> One" (regulation 3(1)), the "NATIONAL IDENTITY CARD APPLICATION FORM,"
> commonly the "Ghana Card Application Form 1-A." Fetched directly from
> `nia.gov.gh` (HTTP 200, `application/pdf`, 498,907 bytes,
> `sha256:3f401681db2e6d1f39fcc16b78c6b69a71d81a43075789513de29d00593bc5fa`),
> confirmed live and unauthenticated at verification time. The child issue's
> inherited claim of a "byte-identical mirror" at `fims.org.gh` did not hold
> up on independent re-check — that path 404s, and `fims.org.gh` in fact
> publishes a different NIA form entirely (the Non-Citizen/Refugee Ghana
> Card application), not a mirror of this schema's source; disclosed as a
> correction rather than repeated. The issue's 129-widget count, by
> contrast, did independently reproduce exactly against a fresh
> `pdfjs-dist` extraction (84 widgets page 1, 45 page 2). Most widgets carry
> descriptive, self-documenting internal field names (a contrast with
> several other jurisdictions' generic-XFA-token forms in this registry),
> though coordinate-correlation against `getTextContent()` was still needed
> for repeated generic names and two effectively unlabelled widgets. Every
> `Tx` widget's own AcroForm `charLimit` was read and used directly as
> `validation.maxLength`; this revealed all nationality-family fields and
> the form's 14 language-spoken blanks carry `charLimit: 3` and `sex`
> carries `charLimit: 2` — physical constraints too narrow for free text,
> so `sex` is modelled as an `M`/`F` enum, justified by a structural
> AcroForm fact rather than a visual estimate. 129 widgets reconcile to 123
> `fields[]` + 1 `documents[]` entry: 4 widgets (MRW Number, Registration
> Centre Number, Interviewer NID No., and the signature/thumbprint capture
> widget) are excluded as staff-populated/raw-biometric-capture, and the two
> genuine two-option AcroForm radio fields (Is Father/Mother alive) each
> collapse to one boolean field. Four checkbox groups (applicant type,
> request type, marital status, education level) are modelled as
> independent boolean fields plus an `exclusivityGroups` entry each
> ("at most one true," machine-checked; the form's own mandatory "exactly
> one" is disclosed in prose). Non-citizen-only and dual-citizenship-only
> sections carry a `visibleWhen` keyed off the applicant-type booleans; the
> spouse list is bounded at 5, per the form's own printed escape hatch to a
> separate "Spouses Form." Confirmed via a fresh web search that the
> National Identification Authority Act, 2006 (Act 707) establishes NIA and
> that the National Identity Register Act, 2008 (Act 750) — the exact
> instrument the form's declaration text cites for its Section 40 penalty —
> remains the governing statute, with NIA confirmed as a live, currently
> operating agency in 2026. Ghana's other five verticals (Passport, DMV,
> Business Formation, Taxes, Visa) remain open backlog for a future cycle;
> this cycle's scope was limited to authoring the pre-identified candidate.
> See the document's own VERIFICATION.md for the full sourcing record.

> **Update (2026-07-12, GOV-2500, "GovSchema Standard Research"): Kenya's
> National ID & Civic Documents vertical opens (2 of 6)**, via
> `ke/nrb/application-for-identity-card` v1.0.0, sourced from Form Reg. 136A,
> "Ombi ya Kitambulisho / Application for Identity Card," prescribed under
> the Registration of Persons Act, Cap. 107, and administered by the
> National Registration Bureau (NRB, under the State Department for
> Immigration and Citizen Services, Ministry of Interior and National
> Administration). This cycle screened all five of Kenya's remaining open
> verticals in parallel: Passport (Directorate of Immigration
> Services/eCitizen), DMV (NTSA TIMS/eCitizen), and Visa (the eTA system,
> `etakenya.go.ke`) all resolved to fully online, login-and-payment-gated
> processes with no genuine unauthenticated specimen currently published by
> the responsible agency — the same "strong legacy AcroForm superseded by a
> mandatory e-channel" dead end this registry has seen elsewhere (cf.
> GOV-2449's note on Thailand); Taxes (KRA's `IT1_Individual_Resident_Return`
> Excel workbook, version 19.0.3/March 2026) is a genuine, currently
> maintained, richly structured (34-sheet) candidate, set aside this cycle
> only in favour of National ID's more tractable single-form scope and
> flagged as next cycle's strongest backlog candidate. Reg. 136A itself has
> no official `.go.ke`-hosted copy — NRB's own current intake channel
> (`usajili.go.ke/nrb`) is eCitizen-only with no downloadable specimen — so
> this schema cites a Kenyan diplomatic mission's own mirror
> (`kenyaembassystockholm.com`, fetched directly, HTTP 200, 40,414 bytes,
> `sha256:54466885dc7d70f3f0efacc63385dd6206337ed7f160b1114b719cf092183b9b`),
> cross-checked byte-for-byte structure against a second independent
> embassy mirror (a different hash/size but an identical 33-widget AcroForm
> confirmed via `pdfjs-dist`, i.e. the same form re-saved, not a different
> edition). Every widget carries a generic XFA-style internal name with no
> semantic content, so each of the 33 widgets was mapped to its printed
> label by correlating widget `rect` against `getTextContent()` position —
> a coordinate-correlation technique this registry has used before (cf.
> `dk/skattestyrelsen`, GOV-2253). 33 `fields[]` covering personal
> particulars (name, date of birth, sex, parents' names, marital status,
> spouse details when applicable, birth district, tribe/clan/family, the
> full home-area administrative breakdown down to village/estate, address,
> occupation), contact details, and supporting-evidence reference numbers
> (birth certificate / passport / parent's ID / naturalization certificate /
> other document, per the form's own "Documents in support of Application
> (TICK WHERE APPLICABLE)" instruction — modelled as independently optional
> fields since the AcroForm itself has no checkbox/radio widgets for this
> choice, with the "at least one" requirement captured instead as a
> `documents[]` entry); 2 `documents[]` (the supporting-identity-document
> requirement just described, and the applicant's declaration attestation).
> Two mock conformance scenarios (a first-time unmarried applicant using a
> birth certificate; a married applicant replacing an existing card using a
> parent's ID and passport together) found 0 errors each, plus 4 mutation
> controls (a missing required field, an email pattern violation, a missing
> required document, and a `sex` enum violation) each correctly raised
> exactly 1 error. See the document's own VERIFICATION.md for the full
> sourcing record — including the complete widget-to-label correlation
> table and every disclosed scoping/judgment call. **Kenya now stands at 2
> of 6 verticals** (Business Formation, National ID); Passport, DMV, and
> Visa are confirmed dead ends; Taxes remains open, flagged backlog for a
> future cycle.

> **Update (2026-07-12, GOV-2493, "GovSchema Standard Research"): Kenya
> opens as this registry's 40th jurisdiction**, via
> `ke/brs/cr1-application-to-register-a-company` v1.0.0, opening the
> Business Formation vertical (1 of 6). Sourced from Kenya's Business
> Registration Service (BRS) Form CR1, "Application to Register a Company"
> (Section 13 of the Companies Act, 2015; Registrar of Companies (Forms)
> Rules, Legal Notice 103 of 2017). A prior scouting pass had reported a
> plain, two-page, 0-AcroForm-widget PDF specimen (dated 2016-02) hosted on
> a Kenya Investment Authority eProcedures mirror; independently re-fetching
> and re-deriving from scratch found BRS's own currently-linked Forms page
> (`brs.go.ke/forms/`) instead serves a materially richer `.docx` template
> (internally dated 2017-11, uploaded 2022-11) that cleanly resolves — via
> two genuine mark-one-of-N selection mechanisms (empty drawn boxes, not
> AcroForm fields, confirmed by inspecting the docx's raw `word/document.xml`
> drawing anchors) — both the private/public company-type distinction and
> the shares/guarantee/unlimited liability-type distinction that the older
> PDF specimen leaves ambiguous (its own printed text stops after only the
> first branch of each pairing, with no visible second option). This schema
> therefore models the full 4-way company type
> (`public_company_limited_by_shares` / `private_company_limited_by_shares` /
> `company_limited_by_guarantee` / `private_unlimited_company`) directly from
> the docx, rather than scoping down to a private-limited-by-shares-only
> path. `pdfjs-dist` independently re-confirms the older PDF specimen has 0
> AcroForm widgets across its 2 pages (`IsAcroFormPresent: false`) — a
> genuine blank-line text form. A fresh legal-currency check confirmed the
> Companies Act, 2015 and Legal Notice 103 of 2017 both remain in force, and
> that CR1 remains a standard incorporation form in current legal-practice
> guides even though company registration itself is now filed
> electronically through BRS/eCitizen — this schema follows this registry's
> established "structural reference over a now-primarily-online process"
> framing (cf. `pe/sunat`, `uy/dgi`). 89 `fields[]` across company details,
> registered-office/contact address, proposed officers (bounded to 2
> slots), statement of capital and initial shareholding (share classes and
> subscribers each bounded to 2 slots), statement of guarantee (bounded to
> 2 slots), and additional PIN/NSSF/NHIF registration data; 4 `documents[]`
> (a national-ID-or-passport copy, a KRA PIN certificate copy, a passport
> photo, and an officers'-consent attestation). Two mock conformance
> scenarios (a private company limited by shares with a single
> director/secretary; a company limited by guarantee with two officers,
> one a passport holder, and two guarantee members) found 0 errors each,
> plus 4 mutation controls (a missing required field, an email pattern
> violation, a missing conditionally-required passport field, and a missing
> required document) each correctly raised exactly 1 error. See the
> document's own VERIFICATION.md for the full sourcing record — including
> the docx-vs-PDF discovery, every bounded-repeating-group cap, the
> officer-role best-effort enum, and the documents[] nationality carve-out
> — and every disclosed scoping/judgment call. **Kenya now stands at 1 of 6
> verticals** (Business Formation); Passport, DMV, Taxes, Visa, and National
> ID remain open, unscreened backlog for future cycles.

> **Update (2026-07-12, GOV-2486, "GovSchema Standard Research"): Vietnam's
> Visa vertical opens (5 of 6)**, via
> `vn/bca/to-khai-de-nghi-cap-thi-thuc-viet-nam` v1.0.0, sourced from Mẫu
> NA1, "Tờ khai đề nghị cấp thị thực Việt Nam" (Vietnamese Visa Application
> Form). Flagged as a ready-to-author candidate in the prior GOV-2479 cycle
> (then cited to its original Thông tư 04/2015/TT-BCA); this cycle's own
> re-verification-from-scratch caught that the pre-scouted source had gone
> stale in the interim — a legal-currency check surfaced **Thông tư
> 70/2026/TT-BCA ngày 25/5/2026, hiệu lực 01/7/2026**, which explicitly
> republishes Mẫu NA1's own template (not just its parent circular),
> already in force as of this verification date. That finding was
> corroborated three independent ways before being trusted (a deliberate
> extra step, since a prior VN cycle's own gotcha was a WebSearch AI summary
> once hallucinating a same-number-different-year superseding circular that
> did not exist): `luatvietnam.vn`'s own page carries machine-readable
> `schema.org` `Legislation` markup confirming the circular number/dates and
> embeds the complete new NA1 template text; two independent official
> provincial-police `.gov.vn` portals (`congan.laichau.gov.vn`,
> `congan.ninhbinh.gov.vn`) both independently state the same circular
> number, issue date, and effective date. This schema models **initial
> entry visa applications only** — filed with a Vietnamese diplomatic
> mission abroad or presented at a border-checkpoint immigration unit
> before entry — and deliberately excludes both Mẫu NA5 (the separate
> in-country visa/stay-extension form) and Mẫu NA1a (the distinct
> electronic-visa information form amended by the same circular). 55
> `fields[]`, 4 `documents[]` (a passport/travel-document copy, applicant
> photos, a conditionally-disclosed accompanying-children photos entry, and
> a declaration attestation). Two mock conformance scenarios (a single-entry
> tourist application with no family members or accompanying children; a
> multiple-entry work-purpose application sponsored by a hosting
> organization, with a spouse and one accompanying child) found 0 errors
> each, plus 3 mutation controls (a missing required field, a `sex` enum
> violation, and a missing required document) each correctly raised exactly
> 1 error. **Vietnam now stands at 5 of 6 verticals** (Business Formation,
> Passport, Taxes, DMV, Visa); National ID remains Vietnam's sole open
> vertical, previously confirmed a dead end (not re-screened this cycle) —
> see the Visa vertical section and the document's own VERIFICATION.md for
> the full sourcing record.

> **Update (2026-07-12, GOV-2479, "GovSchema Standard Research"): Vietnam's
> DMV vertical opens (4 of 6)**, via `vn/bca/to-khai-dang-ky-xe` v1.0.0,
> sourced from Mẫu ĐKX10, "Giấy khai đăng ký xe" (Vehicle Registration
> Declaration), issued under Thông tư 79/2024/TT-BCA (Ministry of Public
> Security). Flagged as a strong, ready-to-author backlog candidate in the
> prior GOV-2472 cycle; this cycle independently re-verified it from
> scratch rather than trusting that finding. Fetched directly from
> `files.thuvienphapluat.vn`'s own CDN (HTTP 200, no login gate, 44,032
> bytes, genuine OLE2/Compound-File-Binary header, `sha256:
> eb94a4d2211c7a1817f3eef821a4e3e25fad2c86713c116b06c0257494de781d`),
> extracted via the same raw UTF-16LE byte-level decode `vn/gdt`'s own
> VERIFICATION.md documents for a legacy `.doc` with no fillable tooling
> available in this sandbox. A legal-currency check (searching "Thông tư
> 79/2024/TT-BCA" + "sửa đổi"/"thay thế"/"bổ sung") surfaced a genuine
> three-circular amendment chain to the parent circular (Thông tư
> 13/2025/TT-BCA, Thông tư 51/2025/TT-BCA, and the newer Thông tư
> 37/2026/TT-BCA) — but each was independently checked against Mẫu ĐKX10
> itself, and none touches this specific appendix (Thông tư 51/2025/TT-BCA
> replaces a different appendix and amends three sibling forms, ĐKX07/08/09;
> Thông tư 37/2026/TT-BCA adds an unrelated inspection-certificate template,
> Mẫu KĐ23a; a July-2025-current consolidated text confirms ĐKX10 remains
> as originally issued). This schema models the form's full 3-page
> structure — the page 1 owner/vehicle-characteristics declaration, page
> 2's electronic vehicle-origin and registration-fee data (populated
> automatically from linked government databases per the form's own
> instructions, filled in manually only when absent), and page 3's
> electronic-invoice data — deliberately not re-declaring the vehicle-
> characteristics values page 2/3 duplicate from page 1, nor the
> registration-office-internal verification block. 78 `fields[]`, 2
> `documents[]` (an attestation and a conditionally disclosed chain-of-sale
> supporting-evidence entry). Two mock conformance scenarios (a first-time
> registration with full electronic linkage; an ownership transfer with an
> authorized agent and an incomplete chain-of-sale disclosure) found 0
> errors each, plus 3 mutation controls (a missing required field, an
> `originType` enum violation, and a missing required document) each
> correctly raised exactly 1 error. **Vietnam now stands at 4 of 6
> verticals** (Business Formation, Passport, Taxes, DMV); Visa (Mẫu NA1,
> pre-scouted and still flagged ready-to-author) and National ID (a
> confirmed dead end) remain — see the DMV vertical section and the
> document's own VERIFICATION.md for the full sourcing record.

> **Update (2026-07-12, GOV-2472, "GovSchema Standard Research"): Uruguay's
> Visa vertical opens (3 of 6)**, via
> `uy/mrree/formulario-unificado-de-visas` v1.0.0, sourced from the
> Ministerio de Relaciones Exteriores' (MRREE) "Formulario Unificado de
> Visas" — a single bilingual (Spanish/English) form used across Uruguay's
> entire consular network in place of older per-consulate visa-request
> letters. This cycle screened all four of Uruguay's remaining open
> verticals (Taxes, Visa, Passport, National ID) in parallel: Taxes (DGI)
> resolved to either a login-gated portal or a 0-AcroForm-widget
> dependents-only PDF; Passport and National ID (both DNIC) resolved to
> `gub.uy`-login-gated appointment-scheduling with no downloadable form of
> any kind; Visa was the only genuine, unauthenticated, field-documented
> candidate. Fetched directly from `gub.uy` (a Uruguay Consulate General in
> Mexico trámite page, `files/2026-03/...`, HTTP 200, no login/CAPTCHA/WAF,
> `sha256:429cefed89d404ae8c7380be983eda37318bc88416d22c2f27097643bdf9cb72`,
> 1,625,285 bytes), confirmed byte-identical to a consulate mirror
> (Barcelona) that had surfaced first during scouting under an older path —
> establishing this as the Ministry's own current, centrally hosted edition
> rather than a stale third-party copy. A second file also hosted on
> `gub.uy` (a 2024-10-dated `.odt`) was fetched and found to be a
> materially different, older single-consulate internal request letter
> ("Solicitud de Autorización de Visa", from the Rosario consulate to the
> national migration authority) — not an edition of the unified form, and
> disclosed rather than mistaken for one. `pdfjs-dist` independently
> confirms a genuine 22-widget AcroForm on page 1 (18 plain-text fields, 4
> date-formatted fields), all correlating cleanly by y-coordinate to their
> own printed bilingual label in a single-column layout. This schema models
> 21 of the 22 widgets as `fields[]` (19 required, 2 optional — spouse's
> name and prior Uruguay visas, since neither applies universally and the
> form provides no conditional-visibility marker to gate on); the 22nd
> widget is unlabeled (sitting in a gap between the printed Ministry header
> and the form's own title, with no correlating text) and is disclosed as
> excluded rather than guessed at, alongside the printed signature line at
> the page bottom, which is confirmed to have no AcroForm widget at all (a
> wet-ink signature, not a fillable field). 0 `documents[]`: the form's own
> notes instruct presenting "todos los originales" (all originals) to the
> consulate but do not itemize which, so none are modelled rather than
> inventing an unsourced list. Two mock conformance scenarios (a first-time
> tourist applicant; a married applicant with a prior visa to declare)
> found 0 errors each, plus 3 mutation controls (a missing required field,
> an invalid date format, and a maxLength violation) each correctly raised
> exactly 1 error. **Uruguay now stands at 3 of 6 verticals** (Business
> Formation, DMV, Visa); Taxes, Passport, and National ID remain open
> backlog for future cycles — see the Visa vertical section, "Known Gaps &
> Opportunities" below, and the document's own VERIFICATION.md for the full
> sourcing record.

> **Update (2026-07-12, GOV-2465, "GovSchema Standard Research"): Peru's
> Taxes vertical opens (4 of 6)**, via
> `pe/sunat/formulario-virtual-709-declaracion-renta` v1.0.0, sourced from
> SUNAT's own "Ayuda FV-709" guide to Formulario Virtual N° 709
> ("Declaración Jurada Anual Persona Natural"). This candidate was
> pre-scouted the prior cycle (GOV-2456) against a 2024-edition guide; this
> cycle's own mandatory legal-currency check found `renta.sunat.gob.pe`
> already running a live "Renta 2025" campaign with a 2025-edition guide
> superseding it (fetched live, HTTP 200, 514013 bytes,
> `sha256:740f62f08e673a4671eb343eef30c741d735b4705fc4263a4f2e74e675fe0324`),
> so this document is authored against the current edition instead. FV 709
> itself remains Clave-SOL-login-gated (no live AcroForm/HTML), so this is a
> structural-reference schema built from the guide's own casilla-numbered
> field-by-field walkthrough — a programmatic diff against the 2024 edition
> confirmed all 67 distinct casilla numbers cited are identical
> year-over-year (only UIT-indexed peso amounts changed). Scoped to the
> return's "Otros Ingresos" disclosures and the entire "Rentas de Trabajo
> (Cuarta y Quinta Categoría) y/o Fuente Extranjera" income category
> end-to-end — 47 `fields[]`, 0 `documents[]` (FV 709 is filed entirely
> online against SUNAT's own pre-populated data, with no supporting-document
> instruction anywhere in the guide). The "Rentas de Capital" (rental
> income and securities capital gains) tabs are out of scope, flagged as a
> future companion-schedule candidate. Two mock conformance scenarios (0
> errors) plus three mutation controls (each raising exactly 1 error) all
> behaved as expected. **Peru now stands at 4 of 6 verticals** (Visa,
> Business Formation, DMV, Taxes) — see the Taxes vertical section and the
> document's own VERIFICATION.md for the full sourcing record.
>
> **Update (2026-07-12, GOV-2456, "GovSchema Standard Research"): Uruguay's
> DMV vertical opens (2 of 6)**, via
> `uy/imm/empadronamiento-vehiculos-nacionales` v1.0.0, sourced from the
> Intendencia de Montevideo's (IMM) Formulario F19, "Empadronamiento de
> Vehículos" (per Ley Nº 19.061, Decreto Nº 187/014). Vehicle registration in
> Uruguay is administered departmentally, not nationally, so this document is
> scoped to Montevideo (`jurisdiction.level: "subnational"`,
> `subdivision: "UY-MO"`), the same tier this registry already uses for
> `br/mg/detran/comunicacao-de-venda-de-veiculo` and
> `ca/on/mto/vehicle-registration`; Uruguay's other 18 departments would need
> their own future schema. Fetched directly from
> `tramites.montevideo.gub.uy` (HTTP 200, no login/CAPTCHA/WAF,
> `sha256:a6e5bd2b53304dab88dd15afc7d742033008127665a8c6881823b37849397fec`,
> 138,349 bytes, PDF 1.6, LibreOffice 7.3, CreationDate 2024-07-27);
> `pdfjs-dist` independently re-confirms a genuine 81-widget AcroForm across
> 2 pages (49 widgets/page 1, 32/page 2), resolving to 65 uniquely named
> fields, matching this cycle's own prior scouting pass exactly. The single
> PDF/AcroForm covers both the domestic and imported-vehicle paths at once
> via its own IMPORTADO/NACIONAL checkbox pair, corroborated by fetching
> both of IMM's own trámite landing pages ("...vehiculos-nacionales" and
> "...vehiculos-importados"), which link the identical file and whose
> "Documentación a presentar" sections this schema's `documents[]` block is
> sourced from. This schema models 53 `fields[]` (covering 68 of the 81
> widgets) across the gestionante (filer), vendedor (seller/importer),
> vehicle technical data, and up to two vehicle owners (titular #1 required,
> titular #2 optional and `requiredWhen`-gated), plus 5 `documents[]` entries
> for the gestionante's ID, the vehicle's origin-proof document, a
> conditionally-required SOA insurance policy (only for imports, per a
> genuine divergence between IMM's two trámite pages), and two
> representative/private-seller ID copies. Disclosed out of scope: 9 named
> fields across 13 widgets — 4 widgets under an ambiguous "ID"/"CÓDIGO
> NACIONAL" header whose AcroForm field names are unrelated copy-paste
> duplicates of the gestionante-phone-number field family, and the 7-widget
> "RECIBE DOCUMENTOS" office-receipt-acknowledgment section — plus the
> narrower special-case documents (self-built-vehicle declarations, minor/
> tutor/power-of-attorney packets, classic-import ministerial resolutions,
> municipal/Interior-Defensa fleet paperwork). A genuine field-naming
> anomaly was also caught and disclosed rather than silently "corrected":
> the widget internally named `MailTit2_2` is actually the second owner's
> **address** field, not an email field, confirmed by coordinate correlation
> against the printed "Domicilio" label. Two mock conformance scenarios (a
> domestic/used/single-titular registration; an imported/cero-km/two-
> titulares registration) found 0 errors each, plus 3 mutation controls each
> correctly raised exactly 1 error (a missing required field, an email
> pattern violation, and a missing `requiredWhen`-gated field). See the
> document's own VERIFICATION.md for the full sourcing record, the
> coordinate-correlation extraction method, and every disclosed scoping/
> judgment call. **Uruguay now stands at 2 of 6 verticals** (Business
> Formation, DMV); this cycle also screened Uruguay's Passport (DNIC,
> login-gated appointment scheduling only) and National ID (DNIC, in-person
> biometric only) and confirmed both are dead ends for now — see "Known Gaps
> & Opportunities" below. Visa and Taxes remain open backlog for future
> cycles.

> **Update (2026-07-12, GOV-2449, "GovSchema Standard Research"): Uruguay
> opens as this registry's 39th jurisdiction**, via
> `uy/dgi/inscripcion-actualizacion-empresas-formulario-0351` v1.0.0, opening
> the Business Formation vertical (1 of 6). Sourced from DGI/BPS's
> Formulario 0351, "Declaración de Registro: Inscripción y Actualización —
> Empresas y Otras Entidades Unipersonales o Pluripersonales" (Versión 05,
> 2023-09) — a joint declaration that updates both the tax authority
> (Dirección General Impositiva, DGI) and the social-security bank (Banco
> de Previsión Social, BPS) registries in one filing. Fetched directly from
> `gub.uy` (HTTP 200, no login/CAPTCHA/WAF,
> `sha256:339eb84796fa651c4c1354e4677c216d57048c575eb6d12b96864466861fbf69`);
> `pdfjs-dist` confirms a genuine 501-widget AcroForm across 2 pages (267
> `Btn`, 224 `Tx`, 10 `Ch`), matching this cycle's own re-derivation exactly.
> A web search for a superseding V06 or newer DGI/BPS resolution found none;
> V05 remains current. Formulario 0351 covers both the unipersonal
> (sole-proprietor) and pluripersonal (multi-partner company) paths at
> once, plus a 267-widget tax-obligation election matrix and business-
> succession/transfer data; this schema scopes deliberately to the most
> common path — a first-time individual registering their own sole
> proprietorship — modelling 64 `fields[]` across identification, entity
> data, fiscal and constituted domicile, principal economic activity, a
> simplified four-flag tax-obligation election (IVA/IRPF/IRAE/Monotributo),
> the BPS contribution regime, and the owner's own identity/address, plus
> an optional second linked person (e.g. an authorized third-party
> representative) gated by `requiredWhen`. Disclosed out of scope: the full
> pluripersonal multi-partner roster (which DGI/BPS's own companion form,
> Formulario 0352, in fact captures separately), Rubro 6's full ~20-
> obligation × Alta/Baja × 5-características matrix beyond the four
> named flags, Rubro 7's special-regime condition flags and business-
> succession/transfer section, and the DGI-internal/office-use boxes. No
> `documents[]` are modelled — DGI/BPS's own instructivo states required
> documentation is determined case-by-case, not a fixed checklist. Two mock
> conformance scenarios (a first-time individual retail registration; a
> first-time individual services registration with an authorized
> third-party representative) found 0 errors each, plus 3 mutation controls
> each correctly raised exactly 1 error (a missing required field, a
> pattern violation, and a missing `requiredWhen`-gated field). See the
> document's own VERIFICATION.md for the full sourcing record, the visual
> page-render method used to resolve several field-name-prefix-vs-Rubro-
> number ambiguities, the legal-currency check, and every disclosed
> scoping/judgment call. **Uruguay now stands at 1 of 6 verticals**
> (Business Formation); DMV, Passport, Taxes, Visa, and National ID remain
> open backlog for future cycles.

> **Update (2026-07-12, GOV-2443, "GovSchema Standard Research"): Vietnam's
> Business Formation vertical opens (3 of 6)**, via
> `vn/dangkykinhdoanh/dang-ky-doanh-nghiep-tnhh-mot-thanh-vien` v1.0.0,
> sourced from Mẫu số 2, Phụ lục I, "Giấy đề nghị đăng ký doanh nghiệp — Công
> ty trách nhiệm hữu hạn một thành viên" (Enterprise Registration
> Application for a single-member LLC), under Thông tư 68/2025/TT-BTC
> (effective 1 July 2025). Phụ lục I is itself one 80-template appendix
> spanning every Vietnamese enterprise-registration scenario; this schema
> deliberately scopes to only Mẫu số 2 (the single-member LLC template),
> disclosing as out of scope the sibling Mẫu số 1/3/4/5 (sole
> proprietorship/multi-member LLC/joint-stock/partnership) and their own
> member-list companion forms (Mẫu số 6-9), which cannot apply once a
> company has only one owner. The primary host named in this cycle's own
> brief, `dangkykinhdoanh.gov.vn`, turned out TCP-unreachable and
> TLS-handshake-failing this cycle (despite a prior cycle's note that it was
> reachable) — this schema instead sources the current template directly
> from Công báo (the Official Gazette of the Government of Vietnam, via
> `congbao.chinhphu.vn`), a stronger first-party citation than either of
> this cycle's own named fallbacks. A legal-currency check (searching for
> any circular amending or superseding Thông tư 68/2025/TT-BTC) found none
> as of this update. The schema's 126 `fields[]` cover the registrant's
> identity, the establishment-status declaration, company name and head
> office, the primary business line, the single owner's own identity —
> modelled for both an individual owner and an organizational owner (which
> must appoint an authorized representative and choose a Members'-Council-
> or Company-President management model) — charter capital, its sources,
> and any non-cash contributed assets, the legal representative, tax
> registration, and the beneficial-owner declaration the 2025 Enterprise Law
> amendment added to this form. 7 `documents[]` include the company charter
> (always required) and the companion Mẫu số 10 beneficial-owner-detail
> form (disclosed only by reference, requiredWhen a beneficial owner is
> declared). Two mock conformance scenarios (an individual owner's new
> establishment; an organization owner's type-conversion establishment with
> a beneficial-owner declaration) found 0 errors each, plus 4 mutation
> controls each correctly raised exactly 1 error — including one targeting
> `documents[]` requiredness specifically, per this registry's own
> conformance-checker documents-blind-spot postmortem. See the document's
> own VERIFICATION.md for the full sourcing record, the legal-currency
> check, and every disclosed scoping/judgment call. **Vietnam now stands at
> 3 of 6 verticals** (Passport, Taxes, Business Formation); DMV and Visa
> remain open, unscreened-or-weak backlog candidates, and National ID
> remains a confirmed dead end (per the GOV-2411 cycle) — see "Known Gaps"
> below.

> **Update (2026-07-12, GOV-2434, "GovSchema Standard Research"): Peru's
> DMV vertical opens (3 of 6)**, via
> `pe/mtc/solicitud-licencia-conducir-012-17` v1.0.0, sourced from Formulario
> 012/17.03, "Solicitud - Licencias de Conducir," published by the Ministerio
> de Transportes y Comunicaciones' (MTC) Dirección de Circulación Vial (DCV).
> CATALOG.md's own "Known Gaps" section (items 11-13, across the GOV-2404/
> GOV-2419/GOV-2426 cycles) had named MTC's driver's-licence application as
> Peru's strongest pre-scouted DMV candidate but never actually fetched or
> field-extracted it. This cycle did, and found the candidate more layered
> than the one-line note suggested: `portal.mtc.gob.pe`, the only host
> serving the current form, is unreachable from this environment at the TCP
> level (a network/infrastructure limitation, not a login gate or WAF), so
> the form was retrieved via a Wayback Machine capture whose SHA-1 content
> digest is identical across eight crawls spanning 2022-06-30 through
> 2025-06-28 — three years unchanged — independently corroborated current by
> a 2026-01-16 crawl of MTC's own TUPA entry for procedure DCV-037, which
> cites "Formulario PDF: 012/17.03" by name. A `gob.pe`-mirrored older
> revision (unversioned "012/17," missing an entire Notificación section
> added by a 2019 legal requirement) turned out to be a superseded circular,
> the same pattern this registry caught in `vn/xuatnhapcanh/to-khai-cap-ho-chieu-pho-thong-trong-nuoc`
> (GOV-2404). Neither revision carries an AcroForm widget; both are genuine,
> unauthenticated, text-layer PDFs. The form is a single "menu" cover sheet
> spanning ~20 DCV procedure codes (first issuance, renewal, category
> upgrade, military/diplomatic/refugee exchange, duplicate, information
> correction, hazmat endorsement); this schema scopes its 27 `fields[]` to
> the nine procedure codes most relevant to an individual citizen obtaining,
> renewing, upgrading, or replacing their own Clase A licence, disclosing the
> military/diplomatic/refugee/foreign-exchange/MATPEL/correction codes as out
> of scope. Two mock conformance scenarios (a first-time Clase A Categoría I
> applicant; a Categoría IIIA duplicate request after theft) found **0
> errors** each, plus 3 mutation controls (missing required field, an email
> pattern violation, a `requiredWhen`-gated licence-category field left
> absent) each correctly raised exactly 1 error class. **Peru now stands at
> 3 of 6 verticals** (Visa, Business Formation, DMV); Taxes remains
> Clave-SOL-login-gated, and Passport/National ID remain
> appointment/biometric-gated — see the Known Gaps section below. See
> `pe/mtc/solicitud-licencia-conducir-012-17`'s own VERIFICATION.md for the
> full sourcing record and every disclosed judgment call.

> **Update (2026-07-12, GOV-2426, "GovSchema Standard Research"): Peru's
> Business Formation vertical opens (2 of 6)**, via
> `pe/sunat/solicitud-inscripcion-ruc-persona-natural` v1.0.0, sourced from
> SUNAT's Formulario 2119, "Solicitud de Inscripción o Comunicación de
> Afectación de Tributos," scoped to the natural-person/conjugal-partnership/
> undivided-estate registration path (54 fields). CATALOG.md's own "Known
> Gaps" section (item 12, the GOV-2419 cycle's own note) had flagged this
> form as Peru's strongest pre-scouted Business Formation candidate, but
> also flagged it as "not re-screened this cycle for a possible AcroForm
> revision of their own — worth checking," since a sibling Peru form
> (DGC-005) had just turned out to carry a genuine AcroForm revision hidden
> behind its Ministry institutional page rather than the consulate mirror
> previously examined. This cycle re-checked that specific possibility:
> three independent copies (SUNAT's own canonical host, and two byte-
> identical `gob.pe` institutional-page mirrors under different upload IDs)
> were fetched and cross-hashed, and none carries any AcroForm widget —
> re-confirming, not overturning, the prior finding. Formulario 2119 remains
> a genuine, unauthenticated, text-layer-only PDF, the same tier as this
> registry's `jp/houmukyoku` and `vn/gdt` precedents, independently
> confirmed still "VIGENTE" (in force) via SUNAT's own orientación portal.
> All 54 `fields[]` are cited to their own numbered casilla (per the form's
> companion instructions document) or Tabla Anexa reference; large external
> code tables (CIIU economic-activity codes, profession codes, tax-regime
> codes) are modelled as free-text pattern-validated codes rather than full
> enums, per this registry's established convention. Two mock conformance
> scenarios (a first-time natural-person business inscription; a foreign,
> domiciled taxpayer's post-inscription tax-affectation/exemption
> communication with an authorized third-party filer) found **0 errors**
> each, plus 3 mutation controls (missing required field, a CIIU-code
> pattern violation, a `requiredWhen`-gated authorized-third-party field left
> absent) each correctly raised exactly 1 error class. **Peru now stands at
> 2 of 6 verticals** (Visa, Business Formation); DMV (MTC's driver's-licence
> application) remains the strongest pre-scouted backlog candidate, Taxes is
> Clave-SOL-login-gated, and Passport/National ID are appointment/biometric-
> gated — see the Known Gaps section below. See
> `pe/sunat/solicitud-inscripcion-ruc-persona-natural`'s own VERIFICATION.md
> for the full sourcing record and every disclosed judgment call.

> **Update (2026-07-11, GOV-2419, "GovSchema Standard Research"): Peru opens
> as this registry's 38th jurisdiction**, via `pe/cancilleria/solicitud-visa-dgc-005`
> v1.0.0, sourced from Formulario DGC-005, "Solicitud de Visa," published by
> the Ministerio de Relaciones Exteriores (Cancillería). A prior cycle
> (GOV-2404) had screened this same form and set it aside as a genuine but
> AcroForm-less static text-layer PDF, weaker than the Vietnam TK01 candidate
> ultimately picked that cycle. This cycle re-fetched the form from three
> independent `gob.pe` mirrors instead of trusting the single mirror
> previously examined, and found the prior assessment rested on an outdated
> 2013 revision (Barcelona consulate mirror, Microsoft Word 2007,
> `IsAcroFormPresent: false`, 0 widgets). The Ministry's own institutional
> page (`gob.pe/institucion/rree`) and the Guayaquil consulate's page both
> serve a byte-identical, materially different 2019 revision (Microsoft Word
> 2016, `IsAcroFormPresent: true`, 63 real AcroForm widgets with
> self-documenting `alternativeText` tooltips) — a genuinely stronger
> candidate than previously scouted, not a re-confirmation. The 2019 revision
> also differs in content: a seven-way visa-subtype checkbox group (Turista,
> Negocios, Transeúnte, Artista, Tripulante, Otro, Residente) replaces the
> older binary Temporal/Residente split, a Correo Electrónico field is new,
> and an entirely new conditional Grupo Artístico section applies only when
> Artista is selected. All 21 `fields[]` and 1 `documents[]` entry are cited
> to their own numbered Sección 2 item or section heading; 8 single-character
> AcroForm boxes for date of birth are consolidated into one `date` field per
> established registry convention. Two mock conformance scenarios (a first-time
> tourist applicant; an artist applicant with a Grupo Artístico) found **0
> errors** each, plus 3 mutation controls (missing required field, an email
> pattern violation, a `requiredWhen`-gated Grupo Artístico field left absent)
> each correctly raised exactly 1 error. **Peru now stands at 1 of 6
> verticals** (Visa); Business Formation and DMV have strong pre-scouted
> unauthenticated static-PDF leads from the GOV-2404 cycle, Taxes is
> Clave-SOL-login-gated, and Passport/National ID are appointment/biometric-gated
> — see the Known Gaps section below.

> **Update (2026-07-11, GOV-2411, "GovSchema Standard Research"): Vietnam's
> Taxes vertical opens (2 of 6)**, via `vn/gdt/to-khai-quyet-toan-thue-thu-nhap-ca-nhan`
> v1.0.0, sourced from Mẫu số 02/QTT-TNCN, "Tờ khai quyết toán thuế thu nhập
> cá nhân" (Personal Income Tax Finalization Declaration), applicable to a
> resident individual with wage/salary income who self-files their annual
> PIT finalization. A pre-scouted candidate PDF
> (`easyinvoice.vn/wp-content/uploads/2026/04/mau-so-02-QTT-TNCN-2.pdf`,
> re-verified: genuine text layer, zero AcroForm widgets, same tier as
> `jp/houmukyoku`) turned out to model a **superseded** template on the same
> legal-currency check that caught `vn/xuatnhapcanh`'s own X01-vs-TK01 issue:
> the form has been amended twice in 2025 — Thông tư 40/2025/TT-BTC
> (hiệu lực 01/07/2025) replaced a three-tier Quận/huyện+Tỉnh/thành phố
> address breakdown with a two-tier Xã/phường/đặc khu+Tỉnh/thành phố
> breakdown, reflecting Vietnam's mid-2025 abolition of the district
> administrative tier; Thông tư 94/2025/TT-BTC (hiệu lực 14/10/2025) added a
> new chỉ tiêu [05a] "Số định danh cá nhân" for tax-code/citizen-ID
> synchronization — and the candidate PDF had neither change applied.
> `gdt.gov.vn`/`canhan.gdt.gov.vn` were unreachable (20s timeouts) and two
> other gov-adjacent PDF leads dead-ended (one misattributed by search to an
> unrelated commendation-awards circular; one a 3-page scanned image with no
> extractable text). This schema instead sources the current,
> amendment-incorporating template from thuvienphapluat.vn — Vietnam's
> leading legal-document portal, an explicitly sanctioned fallback — via a
> directly downloadable `.doc` file whose own header states verbatim that it
> "đã bao gồm nội dung sửa đổi, bổ sung" (already incorporates the amended
> content), cross-checked against thuvienphapluat.vn's own companion
> advisory article. A related correction: this cycle's own brief named the
> issuing authority "Tổng cục Thuế" (General Department of Taxation), which
> an independent search found was itself renamed **Cục Thuế** (Tax
> Department) effective 1 March 2025 (Thông báo 275/TB-TCT) — this schema's
> `authority.name` reflects the current name. All 70 `fields[]` and 6
> `documents[]` entries (the latter, like `vn/xuatnhapcanh`'s own, sourced
> from a professional advisory site's guidance rather than the form's own
> text, which carries no attachment checklist) are cited to their own chỉ
> tiêu number or printed instruction. Two mock conformance scenarios (a
> first-time filer with no dependents and a small bank-transfer refund; a
> supplementary filing with dependents, a charitable deduction, foreign tax
> paid, and a budget-offset request) found **0 errors** each, plus 3
> mutation controls (missing required field, personal-ID-number pattern
> violation, a refund-detail field required by `refundMethod` left absent)
> each correctly raised exactly 1 error. **Vietnam now stands at 2 of 6
> verticals** (Passport, Taxes); Business Formation, DMV, Visa, and National
> ID remain open — Business Formation and Visa have only weak pre-scouted
> leads, DMV was inconclusive on a 503'd gov host, and National ID is a
> confirmed dead end (in-person/biometric CCCD issuance only).

> **Update (2026-07-11, GOV-2404, "GovSchema Standard Research"): Vietnam
> opens as this registry's 37th jurisdiction**, via its Passport vertical,
> sourced from Vietnam's form TK01, "Tờ khai đề nghị cấp hộ chiếu phổ thông ở
> trong nước dành cho người từ 14 tuổi trở lên" (Declaration requesting
> issuance of a domestic regular passport for persons aged 14 and above),
> published by the Immigration Department (Cục Quản lý xuất nhập cảnh) under
> the Ministry of Public Security. This registry's existing open gaps were
> re-confirmed dead ends this cycle (Italy's remaining four verticals per
> GOV-2382; Argentina/Chile/Spain's remaining verticals per GOV-2397), so
> three fresh candidate jurisdictions were scouted in parallel: Greece, Peru,
> and Vietnam — see the Known Gaps section below for the Greece/Peru
> candidate comparison. Vietnam's Passport vertical won on source strength: a
> first scouting pass found a genuinely fillable AcroForm PDF live and
> unauthenticated at `hochieu.xuatnhapcanh.gov.vn` (form "X01," 41 widgets
> across 39 self-documenting field names with Vietnamese `alternativeText`
> tooltips) — but a routine legal-currency check, run before authoring
> against it, found X01 had been superseded three times since its issuing
> Circular 29/2016/TT-BCA: renamed TK01 (Circular 73/2021/TT-BCA), restated
> with QR-code/photo provisions and a split-off under-14 sibling form TK01a
> (Circular 31/2023/TT-BCA), and finally replaced outright by **Circular
> 69/2026/TT-BCA, issued 2026-05-22 and effective 2026-07-01 — ten days
> before this schema's own retrieval date**. X01's continued live
> availability at its original government URL is a publishing-lag artifact,
> not evidence of continued legal validity; this schema does not use X01 at
> all. The current TK01 template was instead located inside Circular
> 69/2026/TT-BCA's own full-text PDF, fetched directly from the Ministry of
> Public Security's own domain (`bocongan.gov.vn`, HTTP 200, genuine
> `%PDF-1.5` header, no login/CAPTCHA/WAF gate) — a 12-page scanned/signed
> gazette document mixing two image codecs (`DCTDecode`/JPEG and `JBIG2Decode`)
> across its appendix pages, with zero embedded text on any page but the
> cover. Rather than hand-decode two codecs, `node-canvas` + `pdfjs-dist`
> full-page rendering (`page.render()` at 2x scale) rasterized every page to
> PNG for direct visual transcription — a new extraction technique for this
> registry, distinct from both the AcroForm-widget route and the raw-JPEG-
> object-stream route (`it/mit`, GOV-2389) used in prior cycles. All 30
> fields were identified directly from the rendered page's own printed
> layout (no widgets exist on this flattened scan). The new TK01 differs
> materially from the superseded X01 in ways this schema follows exactly:
> a single 12-digit "Số định danh cá nhân" (personal identification number)
> field replaces X01's separate CMND/CCCD-number-plus-issue-date-plus-place
> block; the old three-part ward/district/province address breakdown is
> gone in favor of three flat free-text address lines (permanent, temporary,
> current residence); the employer name/address boxes are merged into one
> field; the entire "child under 9 to be included in this passport" section
> has no counterpart (now exclusively routed through the separate TK01a
> form); and two field clusters are wholly new — a fee-refund bank-account
> block, and a mutually exclusive chip/no-chip e-passport choice modelled as
> a boolean pair plus `exclusivityGroups`, per the form's own footnote
> instruction. Two `documents[]` entries (a required recent photograph,
> matching the form's own printed photo-box note; an optional prior-
> passport-or-loss-report, disclosed as conditionally applicable) were
> sourced from a first-party provincial police portal's own published
> guidance (`conganthanhhoa.gov.vn`), since the form's own text carries no
> attachment checklist. Two mock conformance scenarios (a minimal first-time
> applicant; a fuller renewal applicant exercising every optional field)
> found **0 errors** each, plus 3 mutation controls (missing required field,
> personal-identification-number pattern violation, chip/no-chip
> `exclusivityGroups` violation) each correctly raised exactly 1 error.
> **Vietnam now stands at 1 of 6 verticals** (Passport); Business Formation,
> DMV, Taxes, Visa, and National ID remain open, unscreened backlog
> candidates for a future cycle.

> **Update (2026-07-11, GOV-2397, "GovSchema Standard Research"): Finland's
> Passport vertical is now closed — Finland stands at 6 of 6 verticals**, via
> `fi/poliisi/huoltajan-suostumus` — the Finnish Police's (Poliisi) form
> Poliisi-Muut-07, "Huoltajan suostumus" (Guardian's consent), used by a
> minor's guardian(s) to consent to the minor being granted a passport,
> identity card, firearms permit, or explosives precursor licence. Finland's
> own primary adult passport/identity-card application (poliisi.fi) was
> re-confirmed this cycle as an online-application-plus-mandatory-in-person-
> biometric process with no downloadable blank application form — the same
> dead-end pattern already confirmed for the Czech Republic, Norway, Estonia,
> Poland, and Sweden's passport verticals. This narrow guardian-consent
> companion form is directly analogous to `se/polisen/medgivande-pass-
> nationellt-id-kort-minderarig` (GOV-2363) and `dk/fstyr/samtykkeerklaering-
> koerekort-under-18` (GOV-2346), each of which closed that jurisdiction's own
> vertical the same way. Fetched fresh directly from `poliisi.fi` (both the
> Finnish original and an English bilingual sibling edition; a realistic
> browser User-Agent was required — a bare `curl` default UA and a stale URL
> variant each returned an HTML error page instead of the PDF): both editions
> are genuine `%PDF-1.7` files with no login/CAPTCHA/WAF gate once fetched
> correctly. Independent `pdfjs-dist` extraction on both editions confirmed
> 20 AcroForm widgets total, of which 4 are non-data Save/Print/Clear-form UI
> buttons (including two separate clear-form buttons, correcting a prior
> scouting pass's "17 real data fields" estimate to the actual 16) — 16
> applicant-facing fields modelling the minor's identity, an explicit Yes/No
> consent decision for each of the four licence/document types (modelled as
> boolean pairs plus `exclusivityGroups`, since each checkbox's own raw
> `exportValue` is misleadingly the literal string "Kyllä"/"Yes" regardless of
> which side of the pair it is), and one or two guardians' own name, personal
> identity code, and a single combined date/place/signature line — this
> Finnish form does not split date/place/name into three fields the way
> Sweden's PM 531.2 sibling does. Three other jurisdictions' open verticals
> (Spain's Passport, Argentina's National ID, Chile's Passport/Visa/National
> ID) were scouted in parallel this cycle and set aside as weaker or
> dead-end candidates — see the document's own VERIFICATION.md for the full
> comparison. Two mock conformance scenarios (a single guardian consenting to
> a passport and identity card; two guardians consenting to all four
> licence/document types, including exercising the "No" side of one
> exclusivity pair) found **0 errors** each, plus 3 mutation controls (missing
> required field, henkilötunnus `maxLength` violation, and an
> `exclusivityGroups` violation) each correctly raised exactly 1 error.
> **Finland now stands at 6 of 6 verticals** (Business Formation, DMV, Taxes,
> National ID, Visa, Passport) — no vertical remains open for Finland.

> **Update (2026-07-11, GOV-2389, "GovSchema Standard Research"): Italy's DMV
> vertical is now open**, via `it/mit/domanda-operazioni-veicoli-a-motore-e-rimorchi`
> — Modulario TT 2119, "Domanda per operazioni relative ai veicoli a motore e
> loro rimorchi (esclusi i ciclomotori)", published by the Ministero delle
> infrastrutture e dei trasporti (MIT)'s Direzione Generale per la
> Motorizzazione via `ilportaledellautomobilista.it`. This is the pre-scouted
> follow-on candidate the prior cycle (GOV-2382) flagged in this section.
> Fetched fresh via direct `curl`: HTTP 200, 998,509 bytes, genuine `%PDF-1.7`
> header, sha256 `e12e797d3ee167e397e7f2d240b04807cf9b1b04f4366263243aaf06c1
> d98c07`, no login/CAPTCHA/WAF gate. This cycle corrects the prior cycle's
> pre-scouting note: `pdfjs-dist` confirmed zero AcroForm widgets across all
> 13 pages (as noted before), but the four core applicant data-entry pages
> (4/8-7/8) are pure scanned JPEG images with **zero extractable text**, not
> a genuine text layer as previously characterized — only the surrounding
> cover/operation-table/notes/privacy pages carry real text. Since on-screen
> rendering of image-bearing pages failed in this sandbox (the same
> `node-canvas`/pdfjs limitation GOV-2316 hit), the four scanned pages were
> extracted directly from the PDF's own object stream (inflate, then a raw
> JPEG) and read visually — a new extraction technique for this registry.
> All four scans are identical carbon-copy layers of one form, numbered 1-40
> against a footnote legend on page 8/8, so the field layout was modelled
> once. The two-column operation-code table (36 distinct codes) was
> reconstructed via coordinate-clustered text extraction, surfacing two
> genuine same-code-different-meaning duplicates the source itself prints
> (`DA` and `RV`, each naming two distinct operations) — disclosed in the
> field's own description rather than silently resolved. 36 `fields[]` plus
> 2 `documents[]` (a required PagoPA payment receipt, and the form's own
> art. 76 D.P.R. 445/2000 false-declaration attestation) model the
> operation-selection code, requesting-party capacity, vehicle-owner
> registry data, vehicle identification, the previous-plate block, the
> goods-transport/rental block, and the agricultural-machine-company block —
> deliberately excluding the extensive vehicle technical-inspection block
> (explicitly a "SPAZIO RISERVATO ALL'UFFICIO" office/technical-official
> section on page 2/8), the two large external lookup tables the source
> itself prints in full (referenced by pattern instead), and both wet-ink
> signature lines (the document carries zero widgets of any kind). Two mock
> conformance scenarios (a private individual's first-time motorcycle
> registration; a farming business's agricultural-tractor renewal) found
> **0 errors** each, plus 4 mutation controls (missing required field, enum
> violation, pattern violation, and a `documents[]` required-document
> violation) each correctly raised exactly 1 error. **Italy now stands at 2
> of 6 verticals** (Taxes, DMV); Passport, Business Formation, National ID,
> and Visa remain open — see this cycle's own re-confirmation of GOV-2382's
> dead-end findings for all four in the Known Gaps section below.

> **Update (2026-07-11, GOV-2382, "GovSchema Standard Research"): Italy opens
> as the registry's 36th jurisdiction**, via its Taxes vertical, sourced from
> Agenzia delle Entrate's Modello 730/2026, "Redditi 2025" — the flagship
> annual income tax return available to employees, pensioners, and other
> taxpayers whose withholding agent (substitute d'imposta) performs the
> year-end tax adjustment directly in their pay, or filed "senza sostituto"
> with the Agenzia delle Entrate, a Caf, or a qualified professional. Both
> the 24-page form PDF and its 175-page istruzioni companion were fetched
> fresh via direct `curl` (HTTP 200 on both, no login/CAPTCHA/WAF gate, no
> WebFetch fallback needed) from `agenziaentrate.gov.it`: the form is
> 1,054,909 bytes (sha256 `e7fa9aa859e165878a5093e9c1ae23ee4c463d05dd25d738
> d63982088be257d9`) and the istruzioni is 3,552,969 bytes (sha256
> `0f09c12914f1132f8114cf22e836915d4f9f8fabe99888923bdb1316ffcfe8e6`). A
> `pdfjs-dist` extraction confirmed zero AcroForm Widget annotations across
> all 24 pages — a static print/hand-fill template, like this registry's
> `pl/mf/zeznanie-pit-37` and `es/aeat/declaracion-censal-personas-fisicas-
> modelo-030` precedents — but a genuine embedded text layer, with every
> field keyed to a printed casella code (e.g. C1, C9, E1, E21) the
> istruzioni explains rigo-by-rigo under its own numbered heading. This
> v1.0.0 scopes to the common salaried-employee/pensioner core — identifying
> data and residence/domicile (frontespizio), the family-dependents schedule
> for a spouse and up to four further dependents, Quadro C Section I's
> employment/pension income rows and Sections III-IV's IRPEF/regional/
> municipal surtax withholding, and Quadro E's most common medical-expense/
> mortgage-interest/mandatory-pension-contribution deductions — 67 `fields[]`
> entries and 4 `documents[]` entries, and explicitly defers the remaining
> ~20 of 24 pages (land/building income, capital gains and self-employment
> income, most of Quadro E's dozens of coded niche deductions, tax-credit
> and advance-payment quadri, and the 8x1000/5x1000 elections). See the
> document's own VERIFICATION.md for the full field inventory, every
> disclosed scope/judgment-call decision, and a mock conformance run (two
> valid scenarios; five mutation controls, each correctly raising at least
> one error, including a `documents[].requiredWhen` case). The same cycle
> also screened Italy's other five verticals — see the Known Gaps &
> Opportunities section below for the full disclosure of DMV (a strong
> pre-scouted follow-on candidate), Passport, Business Formation, National
> ID, and Visa.

> **Update (2026-07-11, GOV-2372, "GovSchema Standard Research"): Sweden's
> National ID & Civic Documents vertical is now closed — Sweden stands at
> 6 of 6 verticals**, joining a set of 18 jurisdictions in this registry
> (per the "By Jurisdiction" table below) now at full 6/6 vertical coverage,
> via `se/skatteverket/samordningsnummer-ansokan` — Skatteverket's (the
> Swedish Tax Agency) form SKV 7540, "Samordningsnummer – Ansökan"
> (Coordination Number — Application), the citizen-facing route by which a
> person with a connection to Sweden but not registered as a resident (a
> foreign worker, student, or property owner, for example) requests a
> samordningsnummer, Sweden's personnummer-equivalent identifier for
> non-residents. A prior pass had pre-scouted this form; every figure was
> independently re-verified this cycle rather than trusted, and one genuine
> discrepancy surfaced: the task's literal direct-PDF query string 302'd to
> a login page when fetched fresh. A subsequent independent re-derivation
> (GOV-2375 review) found the actual cause is a two-request WAF
> session-cookie handshake, not the info page's embedded `formPageURL`
> parameter as first hypothesized — a cold first request to the servlet
> always 302s regardless of parameters, and a second request reusing the
> resulting session cookies succeeds either way, with no BankID/login or
> credential exchange involved. Once past that handshake the servlet
> serves a genuine `%PDF-1.7`, ~125.4KB (sha256
> `8f24e223…085352f2` for one fetch instance; byte size varies slightly
> per fetch due to embedded request-tracking metadata). Independent
> `pdfjs-dist` extraction confirmed 82
> AcroForm widgets across 2 pages (33 on the applicant-facing page 1, 49 on
> page 2), and independently confirmed page 2's own printed heading reads
> "Skatteverkets anteckningar (fylls i av myndigheten)" ("The Tax Agency's
> notes, completed by the authority") — an in-person identity-check
> checklist filled in by Skatteverket staff, matching this registry's
> `dk/cpr`/`no/skatteetaten`/`fi/dvv` precedent for excluding an
> authority-completed section. Page 1's 33 widgets collapse to 30
> applicant-facing fields: a genuine 2-option radio group for sex, two
> `Tx` signature-line widgets that are marked `readOnly` (present but
> non-fillable, a distinct variant of this registry's usual "no widget at
> all for a wet-ink signature" finding), and a non-exclusive 4-option
> "connection to Sweden" checkbox group (family/student/owns-or-rents-
> housing/other) modelled as four independent optional booleans with no
> `exclusivityGroups` entry, since more than one can genuinely apply. The
> Swedish and foreign contact-address blocks are both left optional
> field-by-field — Skatteverket's own guidance requires at least one, but
> unlike Norway's `addressType` choice this form prints no selector field
> to gate a condition on, so the constraint is disclosed in prose rather
> than invented as a synthetic field. Two `documents[]` entries (an
> identity document, always required; a Swedish residence-permit card,
> conditionally required but with no form field to key a `requiredWhen`
> gate on) were sourced from Skatteverket's own published guidance, not the
> PDF's text layer. Two mock conformance scenarios found 0 errors each,
> plus 4 mutation controls (missing required field, missing required
> document, enum violation, maxLength violation) each correctly raised
> exactly 1 error. **Sweden now stands at 6 of 6 verticals** (Business
> Formation, DMV, Visa, Taxes, Passport, National ID) — no vertical remains
> open for Sweden.

> **Update (2026-07-11, GOV-2363, "GovSchema Standard Research"): Sweden's
> Passport vertical is now closed — Sweden stands at 5 of 6 verticals**, via
> `se/polisen/medgivande-pass-nationellt-id-kort-minderarig` — the Swedish
> Police Authority's (Polismyndigheten) form PM 531.2, "BILAGA till ansökan
> om pass/nationellt identitetskort för minderårig (barn under 18 år)"
> (Appendix to an application for a passport/national identity card for a
> minor). Sweden's primary adult passport/national-ID-card application
> (polisen.se) was re-confirmed this cycle as appointment-based, in-person,
> and biometric (fingerprints are captured for a national identity card),
> with no downloadable blank application form for the main flow — the same
> dead-end pattern already confirmed for Finland, Norway, Estonia, and
> Poland's own passport verticals. PM 531.2, however, is a genuine,
> standalone, citizen-facing companion PDF: Polisen's own guidance page
> explicitly names it as one of three accepted ways a custody holder can
> consent to a minor's passport/national-identity-card application (the
> other two being an e-legitimation-gated online portal and consenting in
> person). Fetched fresh from `polisen.se`: HTTP 200, 170,418 bytes, genuine
> `%PDF-1.6` header, no login/CAPTCHA/WAF gate. Independent `pdfjs-dist`
> extraction confirmed **0** AcroForm/Widget annotations — a print-and-fill
> form, not a fillable PDF — so, following this registry's existing
> `jp/houmukyoku/*` precedent for "no AcroForm but a rich extractable text
> layer" documents, all 39 schema fields were identified directly from the
> page's own text layer and per-glyph coordinates instead of from widgets.
> Coordinate-based layout analysis found the minor's own personal-identity-
> number field is printed as a full 4-digit-century digit-box grid
> (ÅÅÅÅMMDD-NNNN), genuinely distinct from the two guardian columns' own
> 2-digit-year personnummer line (ÅÅMMDD-NNNN) — reconciled by reusing this
> registry's existing `se/skatteverket/individual-income-tax-return`
> personnummer pattern (which already accommodates both variants) across all
> three personnummer fields, rather than inventing two different patterns.
> The mutually exclusive travel-document-type selection (passport only / ID
> card only / both) is modelled as three booleans plus an `exclusivityGroups`
> entry, following this registry's own `pt/imt/requerimento-carta-de-conducao`
> precedent for an identical single-line/three-option printed pattern. A
> font-encoding glyph artifact in the source PDF's embedded subset font (two
> garbled text runs, one beside "Längd"/height, one beside the guardians'
> own personnummer lines) was independently reproduced and decoded via a
> reproducible Caesar-shift, corroborating the readable English bilingual
> sibling edition's (PM 531.13) own plain-English labels — the same kind of
> artifact already disclosed for `dk/motorstyrelsen` (GOV-2355) and
> `fi/traficom` (GOV-2356). Unlike Denmark's P23T, this form prints no
> explicit sole/joint-custody selector field and no "Part 1"/"Part 2"
> column numbering anywhere, so the second custody holder's fields and both
> witness blocks are modelled as plainly optional rather than gated by an
> invented synthetic field — disclosed in full in the schema's own
> VERIFICATION.md. Two mock conformance scenarios (a sole-custody-like single
> guardian/witness consent, and a joint-custody-like two-guardian/two-witness
> consent) found 0 errors each, plus 3 mutation controls (missing required
> field, personnummer pattern violation, travel-document-type exclusivity
> violation) each correctly raised exactly 1 error. **Sweden now stands at 5
> of 6 verticals** (Business Formation, DMV, Visa, Taxes, Passport); National
> ID remains Sweden's sole open, unscreened vertical for a future cycle.

> **Update (2026-07-11, GOV-2356, "GovSchema Standard Research"): Finland's
> DMV vertical is now closed — Finland stands at 5 of 6 verticals**, via
> `fi/traficom/luovutuskirja-ajoneuvon-omistusoikeuden-siirrosta` — the
> Finnish Transport and Communications Agency's (Traficom) form B124,
> "Luovutuskirja ajoneuvon/vesikulkuneuvon omistusoikeuden siirrosta" (Deed
> of transfer of ownership for a vehicle/watercraft), a private-party
> bill-of-sale/title-transfer deed. A prior cycle (GOV-2276's parent
> scouting pass) had screened Traficom's core driving-licence and
> vehicle-registration flows as Suomi.fi-login-gated or in-person-only, with
> only two narrow downloadable companion forms (F122, a doctor's
> attestation; B527, too narrow-scope) considered and rejected; B124 is a
> distinct, genuinely citizen-facing, unauthenticated title-transfer deed
> neither prior pass considered. Fetched fresh from `lomakkeet.traficom.fi`:
> HTTP 200, 110,479 bytes, genuine `%PDF-1.7` header, no login/CAPTCHA/WAF
> gate. A `pdfjs-dist` extraction confirmed exactly 25 `/Widget` annotations
> on page 1 (23 `Tx` text-field widgets + 2 `Btn` radio-option widgets
> belonging to one genuine radio-button parent field) across 24 distinct
> field names — an exact match to this cycle's own pre-authoring scouting
> count — with page 2 carrying 0 widgets (a short instructions-only page).
> All 24 fields map 1:1 into this schema's `fields[]`, covering vehicle/
> watercraft identification (plus a separate watercraft-engine block),
> transferee/buyer and transferor/seller name-or-company-name/personal-ID-
> or-Business-ID/address, freeform agreed terms, place-and-date of
> transfer, and both parties' own signature-and-name-clarification lines —
> the latter unusually realized as genuine fillable `Tx` widgets rather
> than this registry's usual widget-less signature line (see the
> document's own VERIFICATION.md). Two mock conformance scenarios (a
> minimal bill-of-sale car sale, and a fuller "other deed" watercraft sale
> exercising the engine block) found 0 errors, plus 2 mutation controls
> each correctly raised exactly 1 error. **Finland now stands at 5 of 6
> verticals** (Visa, Business Formation, National ID, Taxes, DMV); Passport's
> main adult application flow remains a confirmed dead end (Finland
> eliminated paper passport applications in 2006). **Update (2026-07-11,
> GOV-2397): Passport has since closed too**, not via the main flow but via a
> standalone guardian-consent companion form (`fi/poliisi/huoltajan-suostumus`)
> — see the Executive Summary update above. Finland now stands at 6 of 6
> verticals; no vertical remains open for Finland.

> **Update (2026-07-11, GOV-2355, "GovSchema Standard Research"): Denmark's
> DMV vertical gains a second schema**, via
> `dk/motorstyrelsen/tilladelse-til-koersel-med-udenlandsk-registreret-koeretoej`
> — Motorstyrelsen's (the Danish Motor Vehicle Agency's) form 21.059,
> "Ansøgning om tilladelse til kørsel i Danmark med udenlandsk registreret
> køretøj" (Application for permit to drive a foreign-registered motor
> vehicle for private purposes in Denmark). This issue's own brief framed
> the form as closing Denmark's DMV vertical to 6/6, but a concurrent cycle
> (GOV-2346, `dk/fstyr/samtykkeerklaering-koerekort-under-18`) had already
> done so moments earlier via a different, unrelated form (the under-18
> driving-licence consent declaration) — confirmed by re-fetching
> `origin/main` before authoring. Form 21.059 is a genuinely distinct,
> unauthenticated, citizen-facing intake form with no overlap with P23T or
> either DMV candidate (P23, Motorstyrelsen re-registration) the prior
> GOV-2253 cycle screened and rejected, so it is authored here as additional
> real-world DMV coverage for Denmark rather than a second attempt at
> closing the same vertical. Independent `pdfjs-dist` extraction confirmed
> 38 distinct AcroForm fields across 48 widgets (4 genuine radio-button
> groups accounting for the gap), mapped to 37 schema fields — the 38th, a
> genuine `Sig` (digital-signature) widget, is deliberately not modelled as
> schema data, per this registry's existing signature-field convention.
> Three `documents[]` entries (vehicle registration certificate copy, DKK
> 400 processing-fee receipt, employment/study documentation) are modelled
> directly from the form's own printed instructions. Two mock conformance
> scenarios (0 errors each) and 4 mutation controls (each raising exactly 1
> error) validated; see the schema's own VERIFICATION.md. **Denmark remains
> at 6 of 6 verticals** (this does not change the vertical count, only DMV's
> own real-world sub-process coverage within it).

> **Update (2026-07-11, GOV-2346, "GovSchema Standard Research"): Denmark's
> DMV vertical is now closed — Denmark stands at 6 of 6 verticals**, the
> third jurisdiction in this registry to reach full vertical coverage, after
> Colombia (GOV-1616) and Norway (GOV-2340), via
> `dk/fstyr/samtykkeerklaering-koerekort-under-18` — Færdselsstyrelsen's (the
> Danish Road Traffic Authority) form P23T, "Samtykkeerklæring ved ansøgning
> om kørekort — Under 18 år" (Consent Declaration for a Driving Licence
> Application, under 18). A prior cycle (GOV-2253) had screened and rejected
> Denmark's DMV vertical twice over: the primary P23 driving-licence
> application is a genuine AcroForm but a shared, multi-party 397-field
> record card filled progressively by driving schools/police/kommune staff,
> not a citizen-facing intake form; Motorstyrelsen's vehicle-registration/
> re-registration flow is exclusively MitID/TastSelv-login-gated. P23T is a
> distinct, narrowly-scoped companion form P23's own under-18 branch
> references, capturing only the parent/legal-guardian consent declaration
> required whenever a driving-licence applicant is a minor — with no
> kommune/kørelærer/syn institutional fill-in section of any kind, unlike
> every previously-rejected DMV candidate. Fetched fresh from `fstyr.dk`
> (its own resolving URL encodes a double space, `%20%20`, between
> "kørekort -" and "Under 18" — the single-space variant 404s): HTTP 200,
> 61,834 bytes, genuine `%PDF-1.7` header, no login/CAPTCHA/WAF gate. A
> `pdfjs-dist` extraction confirmed exactly 14 `/Widget` annotations, all
> distinct field names, on the form's single page — an exact match to this
> cycle's own pre-authoring scouting count. All 14 widgets map 1:1 to this
> schema's 14 fields (applicant name/personnummer header; two parallel
> "Part 1"/"Part 2" guardian-consent columns, each with name, personnummer,
> a sole-vs-joint-custody checkbox pair, and date-and-signature). The
> custody-branching structure reuses this registry's own precedent from
> `dk/um/application-for-danish-passport@1.1.0`'s structurally identical
> two-column consent pattern: a first consent-holder's declared **sole**
> custody means no second consent-holder exists, so the second column's
> core fields are `requiredWhen` the first column instead declares **joint**
> custody, not unconditionally required. Two mock conformance scenarios (a
> sole-custody single-guardian consent; a joint-custody two-guardian
> consent) found **0 errors**, plus 4 mutation controls (a plain missing-
> required field, a `requiredWhen` conditional violation, an
> `exclusivityGroups` violation, and a `validation.pattern` violation) each
> correctly raised exactly 1 error. This schema carries no `documents[]`
> array — a disclosed structural fact, not an oversight — so this
> registry's previously-found conformance-checker documents[] blind spot has
> no surface to hide in here. See the document's own VERIFICATION.md for
> the full sourcing record.
>
> **Update (2026-07-11, GOV-2340, "GovSchema Standard Research"): Norway's
> Visa vertical is now closed — Norway stands at 6 of 6 verticals**, the
> registry's first Nordic jurisdiction with every vertical modelled, via
> `no/udi/soknad-om-opphold-og-arbeidstillatelse` — UDI's (the Norwegian
> Directorate of Immigration) form GP-7028 B, "Søknad om tillatelse til
> arbeid og opphold" (Application for a permit to work and reside),
> covering all four of its permit grounds (family immigration, work,
> education, protection/asylum-or-other) plus first-time/renewal, criminal-
> record, power-of-attorney, and minor/guardian sections. This is CATALOG.md's
> own pre-scouted Known Gaps item 8 candidate, the same UDI form the GOV-2316/
> GOV-2330 cycles had already sized at ~328 raw widgets and set aside as the
> larger of Norway's two remaining candidates. Fetched fresh from `udi.no`:
> HTTP 200, 1,519,473 bytes, genuine `%PDF-1.6` header, no login/CAPTCHA/WAF
> gate. A `pdfjs-dist` extraction resolved 7 pages, 325 raw `/Widget`
> annotations, and 231 distinct field names — an exact match to this cycle's
> own pre-extraction. Because the source form's own instruction is simply to
> "fill in the field(s) that correspond to the basis you are applying on,"
> with no single dedicated selector widget naming which permit ground
> applies, this schema introduces four synthetic, disclosed boolean gating
> fields (`applyingForFamilyImmigration`/`applyingForWorkPermit`/
> `applyingForEducationPermit`/`applyingForProtectionOrOtherPermit`) so each
> branch's fields can be expressed with this registry's `visibleWhen`/
> `requiredWhen` conventions. 325 widgets were mapped to 229 `fields[]`
> entries plus 4 `documents[]` entries, following this registry's established
> radio-group-to-enum, bounded-repeating-group (a 6-row foreign-travel table;
> a spouse/two-parents/six-other-relatives family-member block), and office-
> use-content-exclusion conventions (the page-1 case-number/fee stamp box and
> the page-7 police/embassy remarks radios). Two disclosed duplicate/stray
> widget-layer artifacts (page 4's foreign-travel table rows 1-4; one stray
> page-5 gender-radio widget) were excluded, matching this registry's prior
> Norway schemas. Two mock conformance scenarios (a first-time work-permit
> application; a renewal family-immigration application with a spouse, a
> child, a prior marriage, a criminal conviction, and a granted power of
> attorney) found **0 errors**, plus 4 mutation controls each correctly
> raised exactly 1 error — including two exercising the `documents[]`
> requiredness path this registry has previously found conformance checkers
> can silently skip. **Norway now stands at 6 of 6 verticals — no verticals
> remain open for this jurisdiction** — see the document's own
> VERIFICATION.md for the full sourcing record.
>
> **Update (2026-07-11, GOV-2330, "GovSchema Standard Research"): Norway's
> DMV vertical is now closed**, via
> `no/vegvesen/soknad-om-forerkort-og-kompetansebevis` — Statens vegvesen's
> (the Norwegian Public Roads Administration) combined application form for
> a driving licence and/or competence certificate, "Søknad om førerkort og
> kompetansebevis / Egenerklæring om helse" (including a mandatory 17-question
> health self-declaration). This was the smaller of the two Norway candidates
> the GOV-2316 parent cycle had pre-scouted and named in this catalog's own
> "Known Gaps" section (item 8), picked over UDI's GP7028 legacy-paper Visa
> form (~328 widgets vs. this form's ~82). Fetched fresh from `vegvesen.no`:
> HTTP 200, 223,986 bytes, genuine `%PDF-1.6` header, no login/CAPTCHA/WAF
> gate. A `pdfjs-dist` extraction resolved 82 raw `/Widget` annotations, all
> on page 1 (page 2 is purely informational), matching the pre-scout's own
> approximate figure exactly, and `getFieldObjects()` found 65 distinct field
> names. A disposable reconciliation script mapped all 65 names to 57
> `fields[]` entries (0 `documents[]` — a disclosed structural fact, matching
> this registry's `fi/vero` precedent) — via a written-form-preference
> checkbox-pair-to-enum collapse, a 6-value application-type consolidation, a
> foreign-licence Ja/Nei-to-boolean collapse, and the 17 health questions
> each modelled as an independent required boolean (`classification: health`
> per GSP-0006). The 23-item licence-class/competence checklist was
> deliberately **not** collapsed to a single enum, unlike the other two
> checkbox groups: it is genuinely multi-selectable (an applicant can request
> several classes at once, e.g. B + BE), and this registry's spec has no
> `array` field type, so 23 independent boolean fields is the spec's correct
> expression of a multi-select group, not a workaround. One stray widget
> (field name identical to the on-page question text, positioned as a
> full-width box overlapping two other fields' captions with no distinct
> visible role) is excluded as a disclosed forms-authoring artifact. Two mock
> conformance scenarios (a minimal first-time class-B application; a renewal
> requesting three classes at once with a declared foreign licence and two
> health questions answered "yes") found **0 errors**, plus 2 mutation
> controls each correctly raised exactly 1 error (a `requiredWhen` violation
> and a `crossFieldValidation` date-ordering violation). **Norway now stands
> at 5 of its 6 verticals** (Business Formation, National ID, DMV, plus
> Taxes/Passport confirmed weak/dead-end); **Visa (UDI form GP7028) is
> Norway's only remaining open vertical** — see the "Known Gaps" section
> below and the document's own VERIFICATION.md for the full sourcing record.
>
> **Update (2026-07-11, GOV-2323, "GovSchema Standard Research"): Norway's
> National ID & Civic Documents vertical is now closed**, via
> `no/skatteetaten/notification-of-move-within-norway` — Skatteetaten's
> (the Norwegian Tax Administration) form RF-1400B, "Flyttemelding –
> flytting innen Norge" (Notification of moving within Norway, for persons
> who already hold a fødselsnummer). This was one of the three Norway
> candidates the GOV-2316 parent cycle had already pre-scouted and named in
> this catalog's own "Known Gaps" section (item 8); picked over the other
> two (Statens vegvesen's driving-licence form, UDI's legacy-paper visa
> form) as the smallest and most tightly-scoped, and the closest analogue to
> this registry's `fi/dvv/registration-of-foreigner` National ID precedent
> (Norway's own physical national ID card is in-person/biometric-issuance
> only, with no downloadable application form). Fetched fresh from
> `skatteetaten.no`: HTTP 200, 238,950 bytes, genuine `%PDF` header, no
> login/CAPTCHA/WAF gate. A `pdfjs-dist` extraction resolved 61 raw
> `/Widget` annotations across 2 pages (close to but not identical to the
> pre-scout's own ~63 approximate figure), consolidated — via a
> 3-text-widget day/month/year merge into one `moveDate` field, a
> 2-checkbox street-vs-property address-type merge into one enum, and a
> 3-checkbox identification-type merge into one `documents[]` entry — into
> **55 `fields[]` entries and 2 `documents[]` entries**. Two mock
> conformance scenarios (a single sender/single mover on the street-address
> path; a joint two-sender family of three on the property-address/
> gårds-og-bruksnummer path, with a foreign mailing address) were checked
> against a disposable checker script that evaluates both `fields[]` and
> `documents[]` requiredness (this registry's own documented blind spot
> from the `fi/migri` cycle, GOV-2280/GOV-2282) — both found **0 errors**.
> **Norway now stands at 2 of its 6 verticals** (Business Formation,
> National ID); DMV and Visa remain open, pre-scouted backlog candidates,
> and Taxes/Passport are confirmed weak/dead-end. See the "Known Gaps"
> section below and the document's own VERIFICATION.md for the full
> sourcing record.
>

> **Update (2026-07-11, GOV-2316, "GovSchema Standard Research"): Norway
> opens as the registry's 35th jurisdiction**, via its Business Formation
> vertical, with `no/brreg/samordnet-registermelding` — Brønnøysundregistrene's
> (the Brønnøysund Register Centre) central "Samordnet registermelding"
> (Coordinated Register Notification), form BR-1010B, used to register a
> business or company with the Central Coordinating Register for Legal
> Entities (Enhetsregisteret), the Register of Business Enterprises
> (Foretaksregisteret), NAV's Employer/Employee Register, Statistics
> Norway's Register of Business and Enterprises, the Register of
> Foundations, and the Directorate of Taxes' register of non-personal
> taxpayers, all at once, across essentially every Norwegian legal entity
> type. Norway had been named as a parallel Nordic scouting candidate
> across at least two prior cycles (GOV-2276, GOV-2292); a same-day
> follow-on scouting pass (GOV-2314, alongside Belgium and Luxembourg)
> confirmed it as the strongest opening of the three, and this cycle
> picked up BRREG's own coordinated form directly. Fetched fresh from
> `brreg.no` with a plain HTTP GET: HTTP 200, 2,313,349 bytes, genuine
> `%PDF-1.6`, 6 pages, no login/CAPTCHA/WAF gate. A `pdfjs-dist`
> extraction resolved 380 raw `/Widget` annotations (207 Tx, 173 Btn)
> across 6 pages, and a separate `getFieldObjects()` cross-check found
> 386 distinct field names — both matching this issue's own pre-recorded
> figures exactly. A disposable reconciliation script mapped 378 of the
> 379 distinct widget names to exactly one `fields[]`/`documents[]` entry
> (0 double-mapped), consolidating — via a 26-value legal-entity-type
> checkbox-grid-to-enum consolidation, a 4-value notification-type
> consolidation, an 11-row bounded board/participants table (this
> registry's largest repeating-group flattening to date, each row with
> its own 7-checkbox role group consolidated to one enum), a 2-row
> contact-person table, a 12-slot bounded signatory-printed-name table,
> and numerous Ja/Nei-checkbox-pair-to-boolean and split date/year
> mergers — to **240 `fields[]` entries and 6 `documents[]` entries**,
> plus 2 `crossFieldValidation` rules (capital-reduction and demerger
> amount ordering). The 1 disclosed exclusion (`Check Box84`) is a stray,
> unlabelled widget with no adjacent text or tooltip. Several source-form
> quirks are disclosed in the document's own VERIFICATION.md (a shared,
> non-unique AcroForm field name — `Postnummer7` — across two structurally
> distinct widgets on the same row, disambiguated by position; a 4-option,
> not 5-option, second contact-person role group; two multi-line,
> multi-column checkbox rows — the merger and demerger decision-type
> groups — whose exact widget-to-phrase pairing could not be confirmed
> against a rendered visual, since both a headless-Chromium and a
> `pdfjs-dist`+`node-canvas` rendering attempt failed to paint this
> specimen's glyphs, and is disclosed as a best-effort inference rather
> than a confirmed mapping). Two mock conformance scenarios (a sole
> proprietorship's minimal new registration; an AS's fuller registration
> exercising a 2-member board, share capital, and an audit-exemption
> resolution) found 0 errors, plus 5 mutation controls each correctly
> raised exactly 1 error, including one confirming the `documents[]`
> requiredness path is genuinely exercised. **Norway opens with 1 of its
> 6 verticals** (Business Formation); National ID (Skatteetaten RF-1400B,
> "Flyttemelding"), DMV (Statens vegvesen's driving-licence application),
> and Visa (UDI form GP7028, a legacy/paper fallback) are flagged as
> genuine, unscreened-in-depth backlog candidates, while Taxes and
> Passport are confirmed weak/dead-end candidates — see the "Known Gaps"
> section below for the full detail on all five remaining verticals. See
> the document's own VERIFICATION.md for the full sourcing record.
>
> **Update (2026-07-11, GOV-2308, "GovSchema Standard Research"): Finland's
> Taxes vertical opens**, via `fi/vero/50a-earned-income-and-deductions` —
> the Finnish Tax Administration's (Vero, Verohallinto) form 3023e, "50A –
> Earned income and deductions," used to report earned income (wages,
> salaries, fees, compensation, pensions, benefits) missing from a
> taxpayer's pre-completed tax return or to correct it, together with
> deductions from earned income, child support paid, international-
> taxation elections, custody of children living outside Finland, and a
> permanent spousal separation during the tax year. This was already
> CATALOG.md's own confirmed-strong Known Gaps candidate (item 7),
> flagged across three prior cycles (GOV-2276, GOV-2292, GOV-2299); no
> fresh scouting was needed. Fetched fresh from `vero.fi` with a plain
> HTTP GET: HTTP 200, 233,558 bytes — matching the issue's own
> pre-recorded figure exactly — genuine `%PDF-1.7`, 4 pages, no
> login/CAPTCHA/WAF gate, footer edition "VEROH 3023e 1.2025". A
> `pdfjs-dist` extraction (reproduced twice, with and without an intent
> filter) resolved 135 raw `/Widget` annotations (115 Tx, 20 Btn, 0 Ch)
> across 126 unique field names — matching this catalog's own
> separately-recorded pre-scout figure ("135 Widget/126 FT fields")
> exactly, though not the GOV-2308 issue text's own stated figure (141
> widgets/127 names/17 Btn), a discrepancy disclosed in the document's
> own VERIFICATION.md rather than silently reconciled. 3 of the 126
> names are page-navigation/utility controls, clustered once on page 4
> only, excluded as non-data-collecting UI chrome. A disposable
> reconciliation script mapped all 126 unique widget names to exactly
> one `fields[]` entry (0 unmapped), consolidating — via 31 euro/cent
> split-widget merges and two bounded repeating groups flattened by
> ordinal suffix (2 wages-income rows; 3 custody-of-children-outside-
> Finland rows, matching this registry's `dk/cpr` precedent) — to **92
> `fields[]` entries and 0 `documents[]` entries**. The zero
> `documents[]` count is a disclosed structural fact, not an oversight:
> the form's own instructions state verbatim not to enclose any receipts,
> since the Tax Administration requests them separately if needed.
> Several source-form naming quirks are disclosed in the document's own
> VERIFICATION.md (an inconsistent comma/semicolon widget-name
> convention across the four child-support child-identity-code fields; a
> semantically bare `1`/`s1` field-name pair for the foreign-pension tax
> credit; a spousal-separation field that is a single text, not
> checkbox+date, widget; custody-type checkbox pairs without the
> PDF-level `radioButton` flag this registry's `fi/dvv` precedent had).
> Two mock conformance scenarios (a minimal single filer exercising only
> the 3 statically-required header fields; a full-coverage filer
> exercising two wages payors, a car benefit, a pension, a benefit, every
> deduction category, child support for two children, a full set of
> international-situation elections, two children with custody outside
> Finland, and a spousal separation) found 0 errors, plus 5 mutation
> controls each correctly raised exactly 1 error. **Finland now stands at
> 4 of 6 verticals** (Business Formation, Visa, National ID, Taxes);
> Passport's main adult flow is a confirmed dead end (Finland eliminated
> paper passport applications in 2006 — since closed anyway via a
> guardian-consent companion form, GOV-2397) and DMV remains open, already
> confirmed weak (Traficom's core flows are Suomi.fi-login-gated or
> in-person only) — see the "Known Gaps" section below. See the document's
> own VERIFICATION.md for the full sourcing record.

> **Update (2026-07-11, GOV-2299, "GovSchema Standard Research"): Finland's
> National ID & Civic Documents vertical opens**, via
> `fi/dvv/registration-of-foreigner` — the Digital and Population Data
> Services Agency's (Digi- ja väestötietovirasto, DVV) form DVV05.03.00A,
> "The registration information of a foreigner" ("Ulkomaalaisen
> rekisteröinti"), used by a foreign national residing legally in Finland to
> request a henkilötunnus (personal identity code) and be registered in the
> Väestötietojärjestelmä (Population Information System) for the first time.
> This was already this catalog's own named Known Gaps candidate for
> Finland's National ID vertical (item 7); this cycle picked it up directly.
> Both the English and Finnish editions were fetched fresh: HTTP 200,
> 151,115 bytes / 142,376 bytes, both genuine `%PDF-1.7` AcroForms, no
> login/CAPTCHA/WAF gate — byte sizes match the Known Gaps entry's own
> figures exactly. A `pdfjs-dist` extraction found 3 pages and exactly 43
> real `/Widget`-subtype annotations across 34 unique field names (32
> applicant-facing; page 3 is a GDPR privacy statement with 0 fields) —
> confirming the Known Gaps entry's own "43 Widget/34 FT fields" figure
> precisely. Unusually for this registry's Nordic specimens, every field is
> self-documenting via its own descriptive `alternativeText` tooltip, and
> every one of the form's 7 radio-button groups is a genuine PDF radio
> field (`radioButton: true`), not independent same-named checkboxes — no
> coordinate-based label decoding was required. The 32 widget-groups map
> 1:1 to **32 `fields[]` entries**, plus **5 `documents[]` entries** (4
> identity/residence/work/family-relationship document requirements sourced
> from DVV's own published foreigner-registration guidance, plus one
> attestation quoting the form's own signed-declaration text verbatim, since
> the physical signature line carries no fillable widget on this specimen).
> Three modelling decisions are disclosed in the document's own
> VERIFICATION.md: marital status is left ungated by any `Condition` (the
> form scopes it to two specific situations with no field to gate against);
> the family-members-in-Finland question models a disclosure/context gate
> plus three independent presence-flag/name pairs rather than a full
> repeating family sub-schema, since the source's own text states family
> relationships are registered via separate forms, not this one; and the
> Estonian/Nordic identity-number and contact-language fields are left
> ungated against free-text fields, per this registry's established
> judgment for that class of gap. A mock conformance run (a Swedish citizen
> moving to Helsinki with no dependents; a fuller scenario for a fictional
> Estonian software developer moving to Tampere with a spouse and child
> already resident) found 0 errors across both scenarios and 6 mutation
> controls, including two confirming the `documents[]` requiredness path
> specifically (not just `fields[]`) is genuinely exercised. **Finland now
> stands at 3 of its 6 verticals** (Visa, Business Formation, National ID);
> DMV and Taxes remain open backlog candidates — see "Known Gaps" below.
>
> **Update (2026-07-11, GOV-2292, "GovSchema Standard Research"): Finland's
> Business Formation vertical opens**, via `fi/prh/start-up-notification-y1`
> — the Finnish Patent and Registration Office's (Patentti- ja
> rekisterihallitus, PRH) and Finnish Tax Administration's (Vero) jointly
> published form Y1, "Perustamisilmoitus" ("Start-up notification"), used
> to register a limited company, co-operative, foundation, or other listed
> organisation type with the Trade Register or Register of Foundations,
> simultaneously with the VAT/Prepayment/Employer registers. A prior cycle
> (GOV-2276) had already flagged this exact form as a confirmed-strong,
> unscreened Business Formation candidate after a three-way Nordic scouting
> pass; this cycle picked it up directly rather than re-screening. Fetched
> fresh from `prh.fi`: HTTP 200, 287,294 bytes, genuine `%PDF-1.7`, 4 pages,
> no login/CAPTCHA/WAF gate, footer edition "YTJ 1001e 1.2026". A
> `pdfjs-dist` extraction resolved 110 raw AcroForm `/Widget` annotations
> (56 `Tx` text, 54 `Btn` checkboxes), of which 8 are page-navigation/
> utility controls excluded as non-data-collecting UI chrome, leaving
> **102 substantive widgets** — unlike this registry's `fi/migri` precedent,
> this specimen's own field names are self-documenting English label text,
> so no Finnish-name-to-English-label decoding step was needed. Every one
> of the 102 widgets was mapped to exactly one `fields[]`/`documents[]`
> entry via a disposable reconciliation script asserting zero unmapped and
> zero double-mapped widgets, consolidating seven independent-checkbox
> groups (company-name language, registration-register choice, type of
> enterprise, turnover bracket, VAT/employer tax-period lengths, and a
> split 5-digit industry code) into single enum/pattern-constrained
> fields, to **78 `fields[]` + 7 `documents[]` entries** (the 7 "Enclosures"
> appendix-form checkboxes, gated `requiredWhen` against the enterprise-type
> field where the source form's own two checkbox lists correspond, and left
> ungated where they don't — a disclosed gap in the source's own lists, not
> invented over). Two disclosed quirks and one editorial judgment call
> (the "postal or street address is mandatory" either/or requirement, which
> v0.3's `crossFieldValidation` has no direct primitive for) are recorded in
> the document's own VERIFICATION.md. A mock conformance run (a foundation
> registration exercising only statically-required fields; a limited
> company continuing a previous sole trader's business with VAT/employer/
> prepayment registration) found 0 errors across both scenarios and 5
> mutation controls, including one confirming the `documents[]`
> requiredness path (not just `fields[]`) is genuinely exercised. **Finland
> now stands at 2 of its 6 verticals** (Visa, Business Formation); Taxes
> (Vero form 3023e) and National ID (DVV's foreign-national
> population-register form) remain open, unscreened backlog candidates —
> see "Known Gaps" below.

> **Update (2026-07-11, GOV-2285, "GovSchema Standard Research"): Denmark's
> Visa vertical opens**, via `dk/siri/work-permit-application` — SIRI's
> (Styrelsen for International Rekruttering og Integration, the Danish
> Agency for International Recruitment and Integration) form AR8,
> "Application for a work permit or for an extension of a work permit in
> Denmark." Before authoring, this cycle re-screened whether SIRI's primary
> first-time work-permit route (form AR1, or its employer-submitted twin
> AR6 — covering the Pay Limit Scheme, Positive Lists, Researcher, and
> Fast-track pathways) would be a stronger, less narrowly-scoped candidate
> than AR8's own sideline-employment/accompanying-family/extension-only
> scope: confirmed AR1/AR3/AR6/AR7 are all routed exclusively through a
> MitID-authenticated case-management wizard
> (`forms.nyidanmark.dk/siri/Login/LoginMitId`) with no downloadable
> AcroForm or fill-by-hand specimen anywhere on `nyidanmark.dk`, only
> boilerplate GDPR/sworn-declaration PDFs adjacent to it — not modellable
> from an unauthenticated static source. AR8 was authored instead, fetched
> fresh via two independent curl fetches (HTTP 200, 855,022 bytes,
> SHA-256-identical). An independent `pdfjs-dist` extraction confirmed 0
> AcroForm widgets across all 14 pages (a genuine fill-by-hand specimen,
> matching this registry's existing `at/bmeia`/`is/skatturinn` precedent for
> numbered/non-fillable specimens) and was used to build a **104-field**
> model spanning the form's own two parts — Part 1, completed by the
> applicant, and Part 2, completed by their employer in Denmark, each
> independently declaring correctness and signing separately. Four new
> `crossFieldValidation` `equals` rules (a first for this registry; prior
> uses were date-ordering `greaterThanOrEqual` comparisons only) check the
> employer's own restated applicant-identity fields (Part 2, Section 4)
> against the applicant's own Part 1 fields. Two judgment calls are
> disclosed in VERIFICATION.md: required-field determination is editorial
> (the source carries no asterisk/required-marking convention at all), and
> the two power-of-attorney `documents[]` entries are modelled
> `required: false` with an explanatory label rather than gated by an
> invented synthetic third-party-yes/no field the source does not print. A
> mock conformance run (see the document's own VERIFICATION.md) found 0
> errors across 2 valid scenarios and 6 mutation controls, plus an
> independent check that every `documents[].requiredWhen` field reference
> resolves. **Denmark now stands at 5 of 6 verticals** (Passport, Taxes,
> National ID, Business Formation, Visa); **DMV remains Denmark's only open
> vertical**, previously screened and set aside as a poor candidate (see
> "Known Gaps" below).

> **Update (2026-07-11, GOV-2276, "GovSchema Standard Research"): Finland
> opens as GovSchema's 34th jurisdiction**, via its Visa vertical, one of
> GovSchema's weakest-covered verticals globally (76% before this cycle).
> Denmark's own two remaining open verticals (Visa via `nyidanmark.dk`'s
> SIRI AR8, and DMV, screened fresh in GOV-2253 and re-confirmed a poor
> candidate — a shared multi-party record card, a login-gated portal, and
> two zero-widget downloadable forms) were both re-confirmed weak this
> cycle rather than re-screened, so effort went to scouting new
> jurisdictions instead: three parallel scouts (Norway, Finland, Belgium),
> each independently fetching and inspecting candidate PDFs across all 6
> verticals rather than guessing. Finland rated strongest overall — 4 of
> its 6 verticals (Business Formation, Visa, Taxes, National ID) each have
> a genuine, live, unauthenticated fillable AcroForm PDF, an unusually deep
> hit rate for a first-cycle scout. The winning document:
> `fi/migri/residence-permit-employed-person`, Maahanmuuttovirasto's (the
> Finnish Immigration Service, Migri) form **OLE_TY1** ("Työntekijän
> oleskelulupahakemus," the residence permit application for an employed
> person, "TTOL") — the richest artifact found across all three scouts'
> combined 18 vertical checks (194 AcroForm widgets). Independently
> re-fetched fresh from `migri.fi` (the originally-scouted URL had 404'd;
> the corrected CDN-suffixed URL was found via web search): HTTP 200,
> 477,135 bytes, genuine `%PDF-1.6`, confirmed byte-for-byte against the
> authoring pass's own claim. A from-scratch `pdfjs-dist` re-extraction
> independently reproduced the exact same structure: **10 pages** (not the
> ~14 the initial scouting pass had estimated — superseded, not
> reconciled), **194 distinct AcroForm widgets** (131 `Tx` text, 63 `Btn`
> checkboxes, 0 `Ch` choice fields, 0 genuine PDF radio groups — every
> checkbox is independently named, matching this registry's existing
> treatment of similar forms at `at/bmeia` and `se/migrationsverket`).
> These 194 widgets consolidate to **134 `fields[]` + 6 `documents[]`
> entries**: 14 split day/month/year date triplets (42 widgets) folded into
> single ISO `date` fields, 15 mutually-exclusive independent-checkbox
> groups (42 widgets) folded into single `enum`/`boolean` fields, 105
> widgets mapped 1:1, and 5 checklist checkboxes plus one signature-less
> attestation line modelled as `documents[]` entries per this registry's
> established supporting-document-checklist convention (matching
> `is/utl/other-residence-permit-application`). Two bounded repeating
> groups (up to 3 children, up to 4 "other attachment" rows) are flattened
> to numbered slots per this registry's established convention. Two mock
> conformance scenarios (a Finnish IT company sponsoring a foreign software
> engineer with no dependents; a maximal-coverage first-permit application
> with a spouse, 2 children, fringe benefits, and a criminal-history
> disclosure) were independently re-run against the schema's own
> `required`/`requiredWhen`/`crossFieldValidation` grammar with a
> from-scratch reconciliation script (not the authoring pass's own script):
> 0 errors on both valid scenarios, and 2 independent mutation controls
> (dropping a required field; reversing a pay-period date pair) each
> correctly raised exactly 1 error. `tools/validate.mjs` and
> `tools/validate-ajv.mjs` both pass 348/348 documents from a fresh
> `git worktree` checkout of the pushed branch. See the document's own
> VERIFICATION.md for the full field-mapping record. PR
> [#370](https://github.com/hellogov-ai/govschema/pull/370), review gate
> [GOV-2281](/GOV/issues/GOV-2281) (authoring record
> [GOV-2280](/GOV/issues/GOV-2280)). **Finland now stands at 1 of its 6
> verticals** (Visa); Business Formation (PRH/YTJ form Y1), Taxes (Vero
> form 3023e), and National ID (DVV's foreign-national population-register
> form) are all confirmed strong, unscreened backlog candidates for a
> future cycle — see "Known Gaps" below. Passport is a confirmed dead end
> (Finland eliminated paper passport applications in 2006; online/in-person
> only) and DMV is weak (core driving-licence/vehicle-registration flows
> are portal/in-person-only; only companion forms — a doctor's fitness
> statement, a paperless-vehicle notice — are downloadable).

> **Update (2026-07-11, GOV-2268, "GovSchema Standard Research"): Denmark's
> Business Formation vertical opens**, via
> `dk/erst/virksomhedsregistrering` — Erhvervsstyrelsen's (the Danish
> Business Authority's) form 40.110, "Virksomhedsregistrering," the
> MitID-free paper fallback foreign businesses without a Danish CVR number
> use to register with Erhvervsstyrelsen. A prior cycle (GOV-2260) had
> already screened this exact form and set it aside as the strongest
> Business Formation candidate; this cycle picked it up directly rather
> than re-screening (Denmark's remaining two open verticals, Visa and DMV,
> had already been confirmed weaker candidates in that same screening
> pass). Fetched fresh from `virk.dk`: HTTP 200, 642,622 bytes — matching
> the prior cycle's own byte count exactly. An independent `pdfjs-dist`
> extraction resolved **122 distinct field names across 5 pages** (97 `Tx`
> text fields, 15 `Btn` radio groups, 10 independent checkboxes; 148 raw
> widgets total) — reproducing, not assuming, the prior cycle's own
> field-count estimate. A coordinate-based cross-reference (matching every
> widget's rect against the page's clustered text lines, not the field-name
> sequence or tooltip text alone) turned up two disclosed tooltip
> copy-paste artifacts on this specimen (a EU-VAT-number repeating-block
> widget and a corporate-tax-liability free-text widget each carry an
> alternativeText belonging to a different, unrelated field elsewhere on
> the same page) and three exclusions: Rubrik 7 ("Forsendelsesadresse i
> Danmark") is disclosed on the specimen itself as "ikke længere relevant"
> (no longer relevant) and carries zero AcroForm widgets; two page-4
> widgets whose rects and tooltips exactly echo the Rubrik 12 section
> heading rather than collect any input; and one unlabelled, undisambiguated
> checkbox of indeterminate purpose. This schema models the registration-type
> choice and home-country/Danish-address identity blocks, the business
> owner's identity plus a modelled ID/passport-copy attachment requirement,
> a bounded 4-slot EU-country/VAT-number repeating pair (Rubrik 10), VAT/
> customs/EORI/corporate-tax-liability/payroll-tax/employee registration
> (Rubrik 9-13, modelled as optional despite the specimen's own printed
> asterisks, since these Rubrikker are conditional on real-world facts the
> form has no single gating checkbox for), and the owner/authorized-signatory
> plus conditional Danish-contact-person signature blocks — 104 fields
> total. See the document's own VERIFICATION.md for the full field mapping,
> both disclosed tooltip-mismatch quirks, and the mock conformance test run
> (0 errors across 2 valid scenarios and 5 mutation controls). **Denmark now
> stands at 4 of 6 verticals** (Passport, Taxes, National ID, Business
> Formation); Visa and DMV remain open backlog candidates — see "Known
> Gaps" below.

> **Update (2026-07-11, GOV-2260, "GovSchema Standard Research"): Denmark's
> National ID & Civic Documents vertical opens**, via
> `dk/cpr/notification-of-entry` — KL's (Kommunernes Landsforening) form
> FR 050, "Anmeldelse af indrejse" (Notification of Entry), the national
> template every Danish kommune uses to register a person or family
> entering/moving to Denmark in CPR (Det Centrale Personregister), which in
> turn triggers personnummer assignment and sundhedskort issuance. Screened
> alongside Denmark's Business Formation (`virk.dk` form 40.110, a genuine
> unauthenticated AcroForm but scoped narrowly to foreign businesses
> without a Danish CVR number, all-Danish, no English guide) and Visa
> (SIRI's `nyidanmark.dk` work-permit form AR8, genuine and unauthenticated
> but a fill-by-hand PDF with no AcroForm widget layer; the pure Schengen
> short-stay route is a JS-rendered SPA whose paper template duplicates
> this registry's existing pan-Schengen schema) verticals this cycle, and
> picked as the strongest of the three. Fetched fresh from `klxml.dk`
> (Danish specimen: HTTP 200, 85,513 bytes; English cross-check specimen,
> FR 050_ENG: HTTP 200, 88,602 bytes), no login/CAPTCHA/WAF gate on either.
> A `pdfjs-dist` extraction resolved **80 real AcroForm widgets on page 1**
> (self-documenting field names, e.g. `personnummer`, `efternavn`,
> `fornavne`) and confirmed, via the specimen's own printed section heading
> "Andre oplysninger (udfyldes af kommunen)" plus each field's own
> `alternativeText`, that a whole second block of fields (marital status,
> spouse's/parents' personnummer, prior Danish address, police
> alien-registration number, choice of physician, caseworker notes/
> signature) is filled in by municipal staff, not the applicant — a hard,
> disclosed structural fact, mirroring the same class of finding the prior
> DK Taxes cycle made for "Felt låst" rows. This schema models the
> applicant-facing section only: a shared entry-date/departure/
> destination-address block plus a bounded 6-entrant repeating table
> (personnummer if already assigned, name, gender, place of birth,
> citizenship, folkekirke membership, Nordic country-of-departure
> identification), 60 fields total. See the document's own VERIFICATION.md
> for the full field mapping and the mock conformance test run (0 errors
> across 2 valid scenarios and a 3-defect mutation control). **Denmark now
> stands at 3 of 6 verticals** (Passport, Taxes, National ID); Business
> Formation and Visa were screened this cycle and set aside as weaker
> candidates (not hard dead ends); DMV remains open per the prior cycle's
> own note — see "Known Gaps" below.

> **Update (2026-07-11, GOV-2253, "GovSchema Standard Research"): Denmark's
> Taxes vertical opens**, via `dk/skattestyrelsen/oplysningsskemaet` —
> Skattestyrelsen's form 04.003, "Oplysningsskemaet," the personal income
> tax return issued to taxpayers exempt from the digital-filing duty.
> Screened alongside Denmark's DMV vertical this cycle (Færdselsstyrelsen's
> P23 driving-licence form is a genuine current AcroForm but a shared,
> multi-party 397-field record card filled progressively by driving
> schools/police/kommune, not a citizen intake form; Motorstyrelsen's
> vehicle-registration flow is MitID/TastSelv-login-gated with no static
> fallback) and picked as the stronger candidate. Fetched fresh from
> `skat.dk` (HTTP 200, 461,975 bytes), no login/CAPTCHA/WAF gate. A
> `pdfjs-dist` re-extraction resolved **109 distinct AcroForm field names**
> across 4 pages; a coordinate-based cross-reference (widget rects against
> clustered printed text lines, not mere field-name order — this
> specimen's field names are demonstrably out of visual sequence) confirmed
> an exact, exhaustive finding: every rubrik row printed with a "Felt låst"
> (locked) or "Anvend blanket ..." (use companion form) annotation has no
> corresponding fillable widget anywhere on the document, because
> Skattestyrelsen pre-fills those from third-party data or routes them to a
> dedicated companion form (04.071/04.072) instead. This schema models
> pages 1-2 in full (34 fields: name/address, CPR, spouse CPR, every
> genuinely fillable personal-income, capital-income, and itemized-deduction
> rubrik, plus the two ejendomsværdiskat confirmation checkboxes) and
> deliberately excludes pages 3-4 (the self-employment/sole-proprietorship
> Virksomhedsbeløb/Virksomhedsordning/Kapitalafkastordning sections), left
> as an open backlog candidate for a future companion schema — the same
> treatment already given the Czech Republic's own base-return-plus-Přílohy
> sequence. See the document's own VERIFICATION.md for the full rubrik/
> felt-nr/widget mapping and the mock conformance test run (0 errors across
> 2 valid scenarios and 4 mutation controls). **Denmark now stands at 2 of
> 6 verticals** (Passport, Taxes); DMV was screened this cycle and set
> aside as a poor candidate; Business Formation, Visa, and National ID
> remain open, unscreened backlog candidates — see "Known Gaps" below.

> **Update (2026-07-11, GOV-2242, "GovSchema Standard Research"):
> `dk/um/application-for-danish-passport` 1.1.0 corrects a real gating
> defect in 1.0.0** (immediately below): 1.0.0 modelled the second
> parent/guardian consent-holder's four core Section D fields
> (`secondParentName`, `secondParentCivilRegistrationNumber`,
> `secondParentSectionChildName`, `secondParentDateAndSignature`) as
> `requiredWhen: applicantIsMinor equals true` — meaning any minor
> applicant, including the common case of a single parent/guardian with
> **sole** legal custody, would incorrectly be forced to supply a second
> consent-holder's details. Caught by an independent, concurrently-authored
> mock-conformance pass on the same GOV-2242 candidate (a duplicate
> same-issue collision — see this registry's established pattern of two
> sessions racing one freshly-scouted candidate) and confirmed against a
> distinct Ministry of Foreign Affairs source the original authoring
> session had not consulted
> (`um.dk/storbritannien/.../passports-for-children-under-18-years-old/`):
> *"If one parent has acquired sole custody/parental responsibility, ...
> only one consent must be given."* 1.1.0 re-gates those four fields on
> `requiredWhen: firstParentHasJointCustody equals true` instead — a
> validation-loosening MINOR bump per VERSIONING.md §1, published
> alongside 1.0.0 rather than editing it (VERSIONING.md §3 immutability).
> See the document's own 1.1.0 VERIFICATION.md for the full record,
> including a new sole-custody conformance fixture that reproduces the
> defect against 1.0.0 directly and confirms the fix against 1.1.0. Does
> not change Denmark's vertical count (still 1 of 6, Passport).

> **Update (2026-07-11, GOV-2244, "GovSchema Standard Research"): Denmark
> opens as GovSchema's 33rd jurisdiction**, via
> `dk/um/application-for-danish-passport` — the Ministry of Foreign
> Affairs of Denmark's (Udenrigsministeriet, UM) "Application for Danish
> passport" (edition 03/2026), covering first passport, renewal,
> provisional, extension, and extra-passport requests in one form.
> Scouted this session's parent cycle (GOV-2242, "GovSchema Standard
> Research") as the strongest of three parallel-scouted new-jurisdiction
> candidates (Norway, Denmark, Belgium). Fetched directly from `um.dk`
> (HTTP 200, 122,515 bytes, SHA-256
> `87b7049de89a69cda5e512c91c8e74e038d6e217f5b93b81b8c0dffae48c8ac5`), no
> login/CAPTCHA/WAF gate. A from-scratch
> `pdfjs-dist` re-extraction, independent of the scouting agent's own
> numbers, confirmed exactly **86 AcroForm widgets** across 2 pages, all
> distinct field names with zero genuine PDF radio-button groups. The
> document splits three separate 10-digit Civil Registration (CPR)
> numbers across ten single-digit boxes each (the applicant's, plus up to
> two parents'/guardians' in the minor-consent Section D) — each group
> merged into one field per this registry's established split-digit-box
> convention. Net **58 fields** (2 official-use-only widgets excluded, 30
> split-digit widgets merged into 3 fields, 1 semantic-only
> `applicantIsMinor` field added with no backing widget to gate Section
> D's visibility, disclosed as such) and 1 `documents[]` entry (a
> lost-passport police report, conditionally required). Twelve
> `exclusivityGroups` disclose real-world mutual exclusivity across this
> document's entirely non-grouped checkboxes (application type, sex,
> nationality/passport-history yes/no pairs, and — per consent-holder
> column — custody type, nationality-acquisition status, and kinship
> basis). See the document's own VERIFICATION.md for the full sourcing
> record, every merge/exclusion/synthesis decision, and the mock
> conformance test run (0 errors across 2 valid mocks — an adult renewal
> and a minor application with both parents' consent — and 8 mutation
> controls, including one that caught and corrected an over-broad
> `requiredWhen` gate before this record was finalized). **Denmark now
> stands at 1 of 6 verticals** (Passport); DMV and Taxes were scouted this
> cycle as genuine, fresh, unauthenticated AcroForm-PDF candidates for a
> future cycle — see "Known Gaps" below.

> **Update (2026-07-11, GOV-2233, "GovSchema Standard Research"): Iceland
> closes to 6/6 verticals**, via
> `is/skatturinn/system-identification-number-application-foreign-national` —
> Skatturinn's (Icelandic Tax and Customs Directorate) Form RSK 3.30,
> "Umsókn erlends ríkisborgara um kerfiskennitölu" (Foreign national's
> application for a system identification number). A kerfiskennitala is a
> temporary identification number issued to a foreign national who does not
> qualify for a regular Icelandic kennitala, used by exactly three groups
> per the form's own eligibility note: EEA/EFTA citizens working in Iceland
> for at most six months; spouses of Icelanders or EEA/EFTA citizens in paid
> employment awaiting a residence-permit decision; and foreign parties with
> reportable Icelandic capital income. This closes the National ID & Civic
> Documents gap the GOV-2226 cycle had already scouted and named as a
> viable, well-sourced candidate ("Skatturinn Form RSK 3.30 ...") but left
> unauthored; re-screened fresh this session rather than assumed still
> valid. Fetched directly from `skatturinn.is` (HTTP 200, 37,195 bytes,
> SHA-256 `62597acdda...4400ee9cda106`), no login/CAPTCHA/WAF gate. A
> from-scratch `pdfjs-dist` re-extraction confirmed exactly **23 AcroForm
> widgets** on the document's single page, resolving 1:1 to 23 distinct
> field names with no split-box or duplicate-copy reconciliation needed.
> Position-aware (x/y proximity) cross-walking surfaced one non-obvious
> structural finding: two of the three "reason for application" checkboxes
> carry no field name at all in the source PDF's own AcroForm (reported as
> literal `"undefined"`/`"undefined_2"` by `getFieldObjects()`), the same
> class of upstream authoring gap already seen on this registry's
> `is/samgongustofa` schema. Net **19 fields plus 2 first-class
> `documents[]` attachment declarations** (a passport copy, statically
> required, and a Directorate of Labour work-permit-exemption confirmation,
> deliberately left unconditional since the source only rules its
> requirement out for one of three reasons, not in for the other two). See
> the document's own VERIFICATION.md for the full sourcing record, the
> structural finding, every scope decision, and the mock conformance test
> run (0 errors across 2 valid mocks — one EEA/EFTA worker, one
> capital-income "other" case — and 2 negative controls both failing as
> expected). **Iceland now stands at 6 of 6 verticals** (Business Formation,
> Taxes, Visa, DMV, Passport, National ID), the second jurisdiction in this
> registry (after Colombia) to reach full coverage.

> **Update (2026-07-10, GOV-2226, "GovSchema Standard Research"): Iceland's
> Passport vertical opens (5/6)**, via
> `is/thjodskra/passport-issuance-consent-minor` — Þjóðskrá Íslands'
> (Registers Iceland) Form V-901, "Samþykki vegna útgáfu vegabréfs fyrir
> einstakling undir 18 ára aldri" (Consent for issuance of a passport for
> an individual under 18 years of age). Iceland's actual passport
> *application* remains a confirmed in-person, biometric, island.is-gated
> process with no downloadable field-by-field form (GOV-2084, GOV-2219);
> V-901 is a distinct, genuine standalone paper form within that process,
> used when a child's custodian(s) cannot jointly attend in person — a
> candidate the GOV-2219 cycle had already scouted and named
> ("Þjóðskrá Form V-901 ..., skra.is forms index, 21 fields") but left
> unauthored. Re-screened fresh this session rather than assumed still
> valid: fetched directly from skra.is's own forms index (HTTP 200,
> 193,261 bytes, SHA-256 `cb4fefe4...9baaed60`), with the server's own
> `Content-Disposition` filename ("V-901-samthykki forsjarmanna vegna
> utgafu vegabrefs undir 18 ara.pdf") independently corroborating the
> document's true subject beyond its printed title. A from-scratch
> `pdfjs-dist` re-extraction confirmed exactly **21 AcroForm widgets**
> (all plain text fields — no checkbox/radio widgets at all), matching the
> prior cycle's own field-count note exactly. Position-aware (x/y
> proximity) cross-walking surfaced one non-obvious structural finding: a
> printed two-option custody-type choice ("the child has two custodians" /
> "the child has one custodian") has **no backing AcroForm widget
> whatsoever** — both print as static, non-interactive checkbox glyphs in
> the source PDF's own text layer — yet this choice is substantively
> required to complete the form correctly, so it is modelled as a
> semantic-only `enum` field (`custodyType`) with no widget to cite,
> disclosed as such in VERIFICATION.md. Net **22 fields** (21 backed by a
> widget, 1 semantic-only), with the second custodian's six fields gated
> `requiredWhen custodyType equals two_custodians`. See the document's own
> VERIFICATION.md for the full sourcing record, the structural finding,
> every scope decision, and the mock conformance test run (0 errors across
> 2 valid mocks — one one-custodian, one two-custodians-plus-witnesses —
> and 2 negative controls both failing as expected). Iceland now stands at
> 5 of its 6 verticals (Business Formation, Taxes, Visa, DMV, Passport);
> National ID remains Iceland's sole open vertical — a prior cycle's
> scouting note named Skatturinn Form RSK 3.30 (kerfiskennitala for
> foreign nationals) as a viable, well-sourced backlog candidate, still
> unauthored. **This has since closed too (GOV-2233, 2026-07-11)** — see the
> Executive Summary update above; Iceland now stands at 6 of 6 verticals.

> **Update (2026-07-10, GOV-2219, "GovSchema Standard Research"): Iceland's
> DMV vertical opens (4/6)**, via
> `is/samgongustofa/vehicle-ownership-transfer` — Samgöngustofa's (the
> Icelandic Transport Authority) Form US.140, "Tilkynning um eigendaskipti
> að ökutæki" (Notification of Change of Vehicle Ownership), a single-page
> notification both buyer and seller jointly complete to record a private
> vehicle ownership transfer. Fetched fresh from the CDN URL the brief
> named (`assets.ctfassets.net`, 137,237 bytes, SHA-256
> `1aaea347...0ed136a`) rather than a same-named flagged mirror the brief
> warned was flat/scanned; a from-scratch `pdfjs-dist` re-extraction
> confirmed exactly **31 AcroForm widgets** on the document's single page,
> matching the brief's own field-count claim exactly. Position-aware (x/y
> proximity) cross-walking surfaced two non-obvious structural findings:
> (1) 5 named-insurer checkboxes and 2 further checkboxes literally named
> `TRAILER`/`OUT_OF_USE` share one continuous two-column layout — all 7 are
> a single flat select-one list ("declare your insurer, or that the
> vehicle is a trailer covered under its towing vehicle's insurance, or
> that it's being taken out of use"), modelled as one `enum` field rather
> than a 5-option group with 2 unrelated boxes bolted on; (2) two
> checkboxes carry no field name at all in the source PDF's own AcroForm
> (a genuine upstream authoring omission, not an extraction artifact),
> tagging whether two numbered name lines below them name a co-owner or an
> operator — modelled as a single enum per this registry's established
> preference for true single-select grids over `exclusivityGroups`. Net
> **22 fields** covering all 31 widgets (the insurance-status enum alone
> accounts for 7). See the document's own VERIFICATION.md for the full
> sourcing record, both structural findings, and the mock conformance test
> run (0 errors across 2 valid mocks, 2 negative controls both failing as
> expected). Iceland now stands at 4 of its 6 verticals (Business
> Formation, Taxes, Visa, DMV); Passport and National ID remain open,
> unscreened-or-dead-end backlog.

> **Update (2026-07-10, GOV-2210, "GovSchema Standard Research"): Iceland's
> Visa vertical opens (3/6)**, via
> `is/utl/other-residence-permit-application` — Útlendingastofnun's (the
> Directorate of Immigration, ÚTL) Form D-110, "Other Residence Permits"
> (Umsókn um dvalarleyfi — annað), the Directorate's catch-all/generic
> residence-permit application used whenever no dedicated category-specific
> form exists. This closes a Visa-vertical gap this catalog's own "Known
> Gaps & Opportunities" notes had flagged as worth a dedicated future
> session; that flag is now resolved. Unlike this registry's
> `jp/isa/certificate-of-eligibility-application` precedent (which sits atop
> dozens of category-specific supplements), D-110 is a single bounded
> 9-page, 13-numbered-section AcroForm — confirmed via a from-scratch
> `pdfjs-dist` re-extraction at **251 widgets across 9 pages**, exactly
> matching a prior same-session extraction pass byte-for-byte and
> widget-for-widget, per this registry's "own re-extraction, not trusting a
> prior pass" convention. A second, differently-hashed Contentful CDN URL
> for a same-named file was also fetched and diffed: it turned out to be a
> genuinely different, 256-widget, 14-section document — resolved as a
> stale/superseded intermediate CDN artifact (a live web search found the
> same asset slot has since been overwritten again with an unrelated
> Icelandic-language file), not the current live form; see the document's
> own VERIFICATION.md for the full byte/date evidence. Every AcroForm
> widget was cross-walked to a field name/label with a position-aware (x/y
> proximity) mapping script rather than manual eyeballing — the same
> technique this registry's `at/bmeia/schengen-visa-application` and
> `se/migrationsverket/work-permit-application` schemas' own VERIFICATION.md
> records describe using — which caught and corrected an initial
> column-major misreading of the page-1 residence-permit category
> checkboxes (the true order is row-major). Net **185 fields**, 9
> `documents[]` entries (8 checklist items plus one paraphrased
> pre-signature declaration), 14 `steps`, and 6 `crossFieldValidation`
> rules (residence-abroad date-range ordering, one per repeating row); this
> document deliberately uses **0 `exclusivityGroups`**, after checking that
> `at/bmeia` and `se/migrationsverket` both actually model their own
> equivalent single-select checkbox grids as a plain `enum` field rather
> than an `exclusivityGroups` set — see VERIFICATION.md for the full
> reasoning, flagged there for reviewer double-check. Repeating rows
> (residence abroad, children under 18, relatives in Iceland) are bounded
> to the 6 rows the source form itself visibly provides, matching this
> registry's established convention. Iceland now stands at 3 of its 6
> verticals (Business Formation, Taxes, Visa); Passport, National ID, and
> DMV remain open, unscreened-or-dead-end backlog.

> **Update (2026-07-10, GOV-2204, "GovSchema Standard Research"): Argentina's
> DMV vertical deepens**, via
> `ar/dnrpa/solicitud-tipo-08-transferencia-motovehiculo` — the DNRPA's
> Solicitud Tipo 08, motovehículo (motorcycle) variant, the sibling document
> to the already-published `ar/dnrpa/solicitud-tipo-08-transferencia-automotor`
> (GOV-2187). That prior cycle's own VERIFICATION.md had explicitly deferred
> this specimen (`08M.pdf`) as a named follow-on candidate rather than
> assuming it would match its automóvil sibling structurally. It was fetched
> fresh and independently re-extracted this cycle: also a genuinely
> flat/scanned image PDF (0 AcroForm fields, 0 widgets, 0 extractable text
> across both pages, confirmed programmatically before any visual work
> began), requiring the same rasterize-and-transcribe technique as its
> sibling. A field-by-field Python diff against the published automóvil
> schema (not a visual skim) confirmed the two documents are identical
> across **81 of 83 fields** — same section lettering (A/D/E/F/H/I/J/K/L/M/O),
> same enums, same `required`/`requiredWhen` structure. The **sole
> substantive difference** is in sección "F" ("VEHICULO QUE SE TRANSFIERE"):
> this form asks for the vehicle's **"MARCA DE CUADRO"/"N° DE CUADRO"**
> (frame make/number — modelled as `frameMake`/`frameNumber`) rather than
> the automóvil form's **"MARCA DE CHASIS"/"N° DE CHASIS"** (chassis
> make/number), since a motorcycle's load-bearing structure is a "cuadro"
> (frame), not a "chasis" (chassis) — the same substitution recurs verbatim
> in the section's own left-margin completion instruction. Every other
> scope decision from the automóvil sibling (registry-only boxes excluded,
> the seller's own absent identity-document number, the apoderado-del-
> cónyuge exclusion, composite address fields, etc.) was independently
> re-verified against this specimen's own rendered pages, not assumed to
> carry over, and holds unchanged. See the document's own VERIFICATION.md
> for the full field-by-field reconciliation and the two-valid-mock/
> four-negative-control conformance test run. Argentina remains at 3 of its
> 6 verticals (Business Formation, Visa, DMV) — this document deepens DMV
> coverage rather than widening vertical coverage. Argentina's Taxes
> vertical (AFIP Ganancias/Bienes Personales) was screened this cycle
> (GOV-2202) and confirmed a dead end: both F.711 and F.762 are output-only
> artifacts generated after an authenticated Clave-Fiscal web declaration,
> with no blank AcroForm or numbered instructivo anywhere. Argentina's
> Passport and National ID verticals remain confirmed dead ends (RENAPER is
> in-person/appointment-only).

> **Update (2026-07-10, GOV-2195, "GovSchema Standard Research"): Argentina's
> Business Formation vertical deepens**, via
> `ar/afip/inscripcion-cuit-personas-fisicas` — AFIP's Formulario 460/F,
> "Solicitud de Inscripción / Modificación de Datos — Personas Físicas y
> Sucesiones Indivisas," the natural-person/undivided-estate analogue of
> the already-published `ar/afip/inscripcion-cuit-personas-juridicas`
> (F.460/J, GOV-2169). **This corrects a factual error in this catalog's
> own GOV-2179 update below**, which had claimed F.460/F was "re-confirmed
> ... to be a flat/printed 0-widget form, like its 460/J sibling, requiring
> box-by-box visual extraction" — that claim does not hold up: this
> session's own fresh, hash-verified `curl` fetch
> (SHA-256 `be2465f8e8...9b699`) and independent `pdfjs-dist` extraction
> found a genuine, fully interactive fillable AcroForm with **148 raw
> widgets across 2 pages** (48 p.1, 100 p.2) — text fields, dropdowns, and
> checkboxes all present and extractable via `getFieldObjects()`/
> `getAnnotations()`, not a scanned image. `getFieldObjects()` returns 180
> distinct keys, but 41 of those are non-terminal parent/grouping nodes
> with zero widget instances of their own (an artifact of how `pdfjs-dist`
> disambiguates same-named sibling fields in the AcroForm's own hierarchy,
> confirmed programmatically for all 180 keys, not assumed) — 139 keys
> carry at least one real widget. Of those, 130 have exactly 1 terminal
> widget and 9 have exactly 2, the latter confirmed via shared `kidIds` to
> be genuine **PDF radio-button groups** (trámite type, nationality,
> residency, phone type, employer type, and 4 per-activity-row "sociedad de
> hecho"/"otras" choices) — a materially different structure from F.460/J's
> visually similar Sí/No checkbox pairs, which that sibling's own AcroForm
> implements as independent, non-grouped checkboxes needing
> `exclusivityGroups`; here the PDF itself enforces single-choice via a
> real radio group, so each is modelled as a single `enum` field instead,
> and this document needs no `exclusivityGroups` at all. Also unlike
> F.460/J, this specimen carries **no Original/Duplicado mirrored-copy
> structure** (only 2 pages total, not 4) and **no split-digit-box
> fields at all** (confirmed programmatically: none of the 148 widgets
> carries a `maxLen` restriction consistent with a single-digit box; its
> CUIT field, for example, is one plain unrestricted text box, not 11
> single-digit boxes like F.460/J's). Net: **139 final fields**, the
> cleanest widget-to-field reconciliation of any Argentina schema in this
> registry to date. Every dropdown's option list (6 dropdowns, from 2 to 24
> options each, including Argentina's 24 provinces/autonomous city and an
> 8-option filer-capacity catalog) was read verbatim from
> `getAnnotations()`'s own `options` array rather than re-transcribed by
> hand, eliminating transcription risk on long/accented lists. Two
> PDF-authoring quirks are disclosed rather than silently corrected: the
> "Tipo de empleador/a" radio group's own exportValues ('hecho'/'otras')
> are copy-pasted from an unrelated radio group elsewhere on the same page
> even though its printed labels read "Común"/"Personal de casas
> particulares"; and the field behind the printed "Nombres (completo)"
> label carries the confusing raw AcroForm name `Apellido.0.1` (resolved
> by on-page position, not by its own misleading name). See the document's
> own VERIFICATION.md for the full reconciliation arithmetic, every
> judgment call (this specimen also carries no `/Ff` Required bit or
> asterisk convention, making every `required` value a structurally-inferred
> judgment call, as with F.460/J), and the two-valid-mock/four-negative-control
> conformance test run. Argentina remains at 3 of its 6 verticals (Business
> Formation, Visa, DMV) — this document deepens rather than widens vertical
> coverage; its remaining three verticals (Passport, Taxes, National ID)
> are still open, unscreened-or-dead-end backlog candidates (Passport and
> National ID both route through RENAPER, confirmed in-person/appointment-only
> per GOV-2187's own research trail).

> **Update (2026-07-10, GOV-2187, "GovSchema Standard Research"): Argentina's
> DMV vertical opens (3/6)**, via
> `ar/dnrpa/solicitud-tipo-08-transferencia-automotor` — the Registro
> Nacional de la Propiedad del Automotor's (DNRPA, Ministerio de Justicia y
> Derechos Humanos) Solicitud Tipo 08 (automóvil variant), the standard
> national request form used to record a private motor-vehicle title
> transfer ("Contrato de Transferencia - Inscripción de Dominio"). This is
> this registry's first genuinely **widget-free and text-layer-free** flat
> PDF: `pdfjs-dist` confirmed 0 AcroForm fields, 0 widgets, and 0
> `getTextContent()` items across both of the specimen's pages — stricter
> than this registry's other "flat" AR specimens (AFIP's 460/J and 460/F),
> which at least carry some PDF structure. Every field was therefore
> catalogued by rasterizing both pages to PNG at 3x scale
> (`pdfjs-dist` + `node-canvas`) and visually transcribing each printed box
> against the form's own left/right-margin section labels ("A" through
> "O"). DNRPA's own general completion rules for Solicitudes Tipo (Digesto,
> Título I, Cap. I, Sec. 2ª, arts. 1-13, fetched fresh alongside the PDF)
> resolved several judgment calls: art. 3 confirms the form's own "D"/"E"
> and "I"/"J" column pairs are exactly the first-two-co-owners structure
> DNRPA's carbon-form design allows on one set of forms (a third co-owner
> needs an entirely separate set, out of scope here); art. 13 confirms the
> buyer/adquirente's CUIT-CUIL-CDI is a source-asserted mandatory
> requirement (modelled `required: true`), distinct from every other
> `required` value in this document, which is a structural judgment call.
> Notably, the seller's own national-identity-document number is absent
> from the form entirely (only their name, ownership share, and marital
> status are asked, plus their attorney-in-fact's document if a proxy is
> used) — confirmed by inspecting the rendered page at high resolution, not
> assumed — consistent with the seller already being the registry's
> on-file titular, verified at signing via notarized signature
> certification rather than re-declared here. This document models **83
> fields** — the largest in this registry to date — spanning contract
> terms, primary and co-buyer (natural-person and legal-entity branches),
> the vehicle itself, seller-declared prior liens, primary and co-seller,
> and four independent attorney-in-fact sub-blocks (buyer/co-buyer/
> seller/co-seller), while excluding every wet-ink signature line, every
> notary/certifying-official block, and every registry-only box (the
> pre-printed serial number, "B"/"C"/"OPTA"/"N"). One `requiredWhen`
> pattern this registry has previously flagged as unsafe — gating an
> optional field on a sentinel-value `notEquals` comparison against another
> optional field — was deliberately avoided for
> `authorizedAgentDocumentTypeAndNumber`; the conditional relationship is
> stated in the field's `description` instead. See the document's own
> VERIFICATION.md for the full sourcing record, every scope decision, and
> the two-valid-mock/four-negative-control conformance test run. Argentina
> now stands at 3 of its 6 verticals (Business Formation, Visa, DMV); the
> sibling motovehículo variant (`08M.pdf`) is a named follow-on candidate,
> and AFIP's Formulario 460/F (individual/persona física CUIT
> registration) remains the sole other open Argentina candidate — see
> "Known Gaps" below.

> **Update (2026-07-10, GOV-2169, "GovSchema Standard Research"): Argentina
> opens as the registry's 32nd jurisdiction**, via
> `ar/afip/inscripcion-cuit-personas-juridicas` — AFIP's (Administración
> Federal de Ingresos Públicos) Formulario 460/J, "Solicitud de Inscripción /
> Modificación de Datos — Personas Jurídicas," the combined request form
> legal entities use to either newly register for a CUIT (Argentina's
> federal tax identifier) or update previously-registered data. Fetched
> fresh from `serviciosweb.afip.gob.ar` with a plain browser-User-Agent
> `curl` (HTTP 200, genuine `%PDF-1.6`, no login/CAPTCHA/WAF gate
> encountered), independently re-verifying a prior scouting pass's lead
> from scratch rather than trusting its numbers. `pdfjs-dist` extraction
> found 351 raw AcroForm widgets across the PDF's 4 pages, resolving to 177
> distinct field names via `getFieldObjects()`; the specimen turned out to
> be structured as a mirrored "Original" (pages 1-2) plus an AFIP-generated
> "Acuse de Recibo"/"Duplicado" receipt copy (pages 3-4) that links 170 of
> those field names to a second widget instance rather than introducing new
> data, which this document models once, not twice — 2 further field names
> that exist only as an unlinked artifact on the duplicate page are
> excluded outright. 5 split-digit/split-component box groups (an 11-digit
> CUIT split across 11 single-digit boxes, a 3-digit AFIP office code split
> across 3 boxes, a 3-box date, a 2-box month/year, and a 5-box employee
> count) were merged per this registry's established split-box convention,
> yielding **156 final fields**. The specimen's 28-checkbox "Forma
> Jurídica" legal-form grid required a disclosed nearest-x-coordinate
> reconstruction technique to recover its rotated/vertical column-header
> text from `pdfjs`'s text layer (2 of the 28 columns have a genuinely
> blank header in the source PDF itself, disclosed rather than
> fabricated); see the document's own VERIFICATION.md for the full
> reconciliation arithmetic, every judgment call (including this
> specimen's complete absence of any `/Ff` Required-bit or asterisk
> convention, making every field's `required` value a structurally-inferred
> judgment call), and the mock conformance test run. Argentina opens with 1
> of its 6 verticals (Business Formation); AFIP's sibling Formulario 460/F
> (individual/persona física registration, ~148 widgets) and Cancillería's
> Formulario de Solicitud de Visado (FSV, ~50 widgets, a Visa candidate)
> were both identified but deliberately left unfetched this cycle — see
> "Known Gaps" below.

> **Update (2026-07-10, GOV-2179, "GovSchema Standard Research"): Argentina's
> Visa vertical opens (2/6)**, via `ar/cancilleria/formulario-solicitud-visado`
> — the Cancillería's (Ministerio de Relaciones Exteriores, Comercio
> Internacional y Culto) Formulario de Solicitud de Visado (FSV), the
> standard cover application used at Argentine consulates worldwide for
> most visa categories. This picks up the exact FSV lead GOV-2169 had
> identified but left unfetched. Two independent specimens were fetched
> fresh this cycle (the Cancillería's own 2024 edition and a 2026
> consulate-mirrored edition from `cmila.cancilleria.gob.ar`) with no
> login/CAPTCHA/WAF gate on either — both genuine `%PDF-1.6`, both
> resolving via `pdfjs-dist`'s `getFieldObjects()` to exactly **50 distinct
> field names** (`Texto1`-`Texto50`) across 50 widgets total (29 on page 1,
> 21 on page 2, 0 on page 3), a clean 1:1 widget:field ratio with no
> split-box or mirrored-copy structure — the simplest reconciliation of any
> Argentina schema in this registry to date. The two specimens were
> diffed field-by-field and found structurally identical (same field
> names, same widget geometry, same printed labels); the only textual
> difference anywhere in either PDF is the page-margin form-code/edition
> stamp, confirming the form is stable rather than stale. The raw AcroForm
> field names carry no tooltip text, so every field's label was recovered
> via `pdfjs-dist` `getTextContent()` x/y-position correlation against the
> form's own printed numbered "campo" structure (1-50, with campo 51 — the
> wet-ink signature line — carrying no widget, consistent with the form's
> own instruction "Firmar y aclarar en campo 51"); the field-name numeric
> suffix was independently confirmed to match the printed campo numbering
> exactly for all 50 fields. Campos 32-38 (prior-Argentine-visa history)
> are modelled as a cascading `requiredWhen` chain — campo 32 gates 33/34/35,
> and campo 35 in turn gates 36/37/38 — mirroring the same
> `requiredWhen` convention `at/bmeia/schengen-visa-application` already
> established in this registry. See the document's own VERIFICATION.md
> for the full sourcing record, every judgment call (no `/Ff` Required bit
> or asterisk convention on either specimen — `required` values are
> structurally inferred except campo 11, which carries its own explicit
> printed conditional-applicability note), and the two-valid-mock/
> three-negative-control conformance test run. Argentina now stands at
> 2 of its 6 verticals (Business Formation, Visa); AFIP's Formulario 460/F
> (individual/persona física CUIT registration) remains the sole named
> Argentina follow-on candidate — see "Known Gaps" below. **Correction
> (2026-07-10, GOV-2195): the claim below that F.460/F was "re-confirmed
> ... to be a flat/printed form with 0 AcroForm widgets" does not hold up
> against a fresh, independent re-fetch and re-extraction — see the
> Executive Summary's GOV-2195 update above for the corrected record (148
> genuine AcroForm widgets, a fully interactive fillable form). Left here
> unedited, struck through only by this note, per this registry's practice
> of disclosing rather than silently rewriting a prior session's claim.**

> **Update (2026-07-10, "GovSchema Standard Research"): Japan's Legal Affairs
> Bureau stock-company-incorporation set is now complete — the fourth and
> last sibling variant is published**, via
> `jp/houmukyoku/stock-company-establishment-registration-application-public-subscription`
> — the Legal Affairs Bureau's Stock Company Establishment Registration
> Application, modelling the "no board of directors, public subscription"
> (取締役会を設置しない株式会社の募集設立) variant, row 1-4 of the same
> `houmukyoku.moj.go.jp` index page every other Japan
> stock-company-incorporation document in this registry is sourced from.
> This closes CATALOG.md's own standing Known Gaps item 6, which had tracked
> this exact row as the registry's sole remaining open Japan
> companion-schedule candidate since GOV-2152 published its board-installed/
> public-subscription sibling. Fetched fresh from `houmukyoku.moj.go.jp`'s
> own index page (blank template + worked example, both zero-AcroForm/
> genuine-text-layer PDFs, HTTP 200 with a browser User-Agent) and
> cross-checked line-by-line against both this variant's own closest
> siblings: the no-board/promoter-only baseline
> (`stock-company-establishment-registration-application`, GOV-2019) to
> isolate the public-subscription axis, and the board-installed/
> public-subscription sibling
> (`stock-company-establishment-registration-application-board-of-directors-public-subscription`,
> GOV-2152) to confirm it is the *same* axis-level change, minus that
> sibling's own board-of-directors-specific fields (the board-elected
> representative director, the Companies Act art. 327(2) mandatory
> auditor). The registered "matters to be registered" content is
> structurally identical to the no-board baseline; only the attachment list
> changes, gaining the same three public-subscription-specific requirements
> GOV-2152 already isolated (a share-subscription-application attachment; a
> stricter bank/trust-company funds-custody certificate in place of a plain
> payment certificate; an organizational general meeting's minutes),
> grounded in Companies Act arts. 64 and 87-92. A disclosed genuine wording
> variation ("並びに" vs. "及び" in this row's own investigation-report
> attachment line, consistent across both this row's own blank template and
> worked example) was found and cross-checked against both siblings rather
> than silently normalized. See the document's own VERIFICATION.md for the
> full sourcing record, every disclosed scope decision (including a
> disclosed branch-office registered-matter line present in this row's own
> worked example but modelled by none of the four sibling documents), and
> the mock conformance test run (0 unexpected results across two scenarios
> covering all 22 fields, plus 8 negative controls). Japan remains at 4 of
> its 6 verticals (Visa, National ID, Business Formation, Taxes); this
> deepens rather than widens Business Formation coverage. No further sibling
> incorporation variant remains open on this index page.

> **Update (2026-07-10, GOV-2152, "GovSchema Standard Research"): a second
> Japan Business Formation companion variant is now published**, via
> `jp/houmukyoku/stock-company-establishment-registration-application-board-of-directors-public-subscription`
> — the Legal Affairs Bureau's Stock Company Establishment Registration
> Application, modelling the "board of directors installed, public
> subscription" (取締役会を設置する株式会社の募集設立) variant, row 1-2 of
> the same `houmukyoku.moj.go.jp` index page every other Japan
> stock-company-incorporation document in this registry is sourced from.
> This cycle's brief named the same four National ID & Civic Documents
> candidates (DE Steuer-ID, SG NRIC, NZ RealMe, "remaining voter
> registration") every recent cycle of this recurring issue has named; all
> four were re-checked first and re-confirmed already resolved, consistent
> with every prior cycle's own finding. Several genuinely open,
> new-vertical-opening candidates were then scouted fresh (Sweden's Passport
> and National ID, Chile's Passport/Visa/National ID, UAE's Passport), but
> each was confirmed appointment-based/in-person-only or fully
> login-gated with no field-level fallback — see this document's own
> VERIFICATION.md "Why this candidate, this cycle" section for the full
> four-candidate comparison. This cycle instead picked up CATALOG.md's own
> standing Known Gaps item 6, which explicitly names the two remaining
> sibling stock-company-incorporation variants (rows 1-2, 1-4) as this
> registry's sole open, well-sourced Japan companion-schedule candidates and
> flags row 1-2 as the natural next pick once GOV-2049 established the
> board-axis officer-particulars/auditor pattern. Fetched fresh from
> `houmukyoku.moj.go.jp`'s own index page (blank template + worked example,
> both zero-AcroForm/genuine-text-layer PDFs) and cross-checked line-by-line
> against the already-published board-installed/promoter-only sibling
> (GOV-2049): the registered "matters to be registered" content is
> structurally identical between the two board-installed variants: only the
> attachment list changes, gaining three public-subscription-specific
> requirements grounded in Companies Act arts. 64 and 87-92 (a
> share-subscription-application attachment; a stricter bank/trust-company
> funds-custody certificate in place of a plain payment certificate; an
> organizational general meeting's minutes) in place of the sibling's
> plainer promoter-only attachment set. A disclosed text-positioning
> artifact on the blank template's own "定款"/"発起人の同意書" attachment
> row was found and cross-checked against the worked example's own clean
> two-row rendering rather than trusted as-is — the same "disclosed rather
> than silently modelled" pattern this registry has used for a prior
> font-artifact finding (AT/BMI). See the document's own VERIFICATION.md for
> the full four-candidate sourcing comparison, every disclosed scope
> decision, and the mock conformance test run (0 unexpected results across
> two scenarios covering all 21 fields, plus 7 negative controls). Japan
> remains at 4 of its 6 verticals (Visa, National ID, Business Formation,
> Taxes); this deepens rather than widens Business Formation coverage. The
> registry's sole remaining open Japan companion-schedule candidate is now
> row 1-4 (no board of directors, public subscription) of the same index
> page.

> **Update (2026-07-10, GOV-2143, "GovSchema Standard Research"): Portugal's
> Business Formation vertical opens, closing Portugal to 6 of its 6
> verticals**, via `pt/at/declaracao-inicio-atividade-pessoas-singulares`
> v1.0.0 — the Autoridade Tributária e Aduaneira's (AT) "Declaração de
> Início de Atividade," the declaration a natural person must file before
> beginning a business or professional activity, per art.º 112.º/113.º do
> Código do IRS and art.º 31.º do CIVA. This cycle's brief named the same
> four National ID & Civic Documents candidates (DE Steuer-ID, SG NRIC, NZ
> RealMe, "remaining voter registration") every recent cycle of this
> recurring issue has named; all four were re-checked first and
> re-confirmed already resolved (published or dead-ended), consistent with
> every prior cycle's own finding, so this cycle re-scanned CATALOG.md's own
> Known Gaps section fresh instead. Portugal's Business Formation gap — its
> sole remaining open vertical after GOV-1833/GOV-1797, twice screened
> (GOV-1750, GOV-1797) and twice set aside as "a real but comparatively weak
> backlog candidate," never a confirmed dead end — was picked up directly.
> IRN's "Empresa na Hora"/"Empresa Online" pacto-social specimens (the prior
> cycles' own candidate) were re-verified from scratch rather than trusted:
> a fresh fetch and `pdfjs-dist` extraction of the most common single-founder
> specimen, SUQ-1-08 (Sociedade Unipessoal por Quotas), confirmed 0
> characters of text and 0 annotations across all 7 pages — independently
> re-confirming the "scanned image, no text layer" finding. This cycle found
> a distinct, previously unidentified source instead: AT's own current
> "Início de Atividade" informational leaflet (dated março 2026, a genuine
> text-layer PDF, no login/CAPTCHA/WAF gate), which documents in AT's own
> words the three categories of information a declarant must identify before
> submitting the (still authenticated) online declaration — activity code(s),
> estimated remainder-of-year turnover, and a bank account's IBAN/BIC —
> the same "official leaflet documenting a gated wizard's field content"
> pattern already used elsewhere in this registry (e.g.
> `se/migrationsverket/work-permit-application`). Modelled 8 fields total
> (`taxpayerNIF`, `anticipatedActivityStartDate`, `primaryActivityCode`,
> `secondaryActivityCodes`, `hasMixedTaxedAndExemptActivities`,
> `estimatedAnnualTurnover`, `bankAccountIBAN`, `bankAccountBIC`) — a
> deliberately thin v1.0.0, since the leaflet itself states the resulting
> IRS/IVA regime classifications are AT-computed outcomes of these declared
> elements, not separate fields the declarant selects, and explicitly
> attributes three further elections (waiving the art.º 9.º CIVA exemption;
> the agricultural flat-rate regime; opting into Regime de Contabilidade
> Organizada below the mandatory threshold) to a distinct, later
> `declaração de alterações` filing, not to this initial declaration. See
> `registry/pt/at/declaracao-inicio-atividade-pessoas-singulares/1.0.0/VERIFICATION.md`
> for the full four-candidate sourcing comparison, every disclosed scope
> decision, and the mock conformance test run (0 errors across two
> scenarios covering all 8 fields, plus 4 mutation/negative controls).
> Portugal is now the **second non-original jurisdiction in this registry
> to reach 6/6** (after Colombia, GOV-1616).

> **Update (2026-07-10, GOV-2135, "GovSchema Standard Research"): Austria's
> Visa vertical opens**, via `at/bmeia/schengen-visa-application` v1.0.0 —
> the EU/Schengen uniform "Formular C1" short-stay visa application
> (Annex I to Regulation (EC) No 810/2009, the Visa Code), as published by
> BMEIA for use at Austrian embassies and consulates abroad. This candidate
> was screened and confirmed viable (but left unauthored, as "a
> comparatively thinner 'Austria' story") in the GOV-2121 cycle, since it is
> the identical EU-wide template every Schengen state uses, not an
> Austria-specific design; with Passport, National ID, Taxes, and Business
> Formation now all live for Austria, Visa was the last remaining open,
> screened backlog candidate, so this cycle authored it from a fresh,
> from-scratch re-fetch and re-extraction rather than trusting the prior
> cycle's byte count. Re-confirmed HTTP 200, exactly **285,208 bytes**
> (matching GOV-2121's own independent record), with **0 AcroForm
> widgets** across all 4 pages via a fresh `pdfjs-dist` extraction — a
> genuine flat/print specimen, like this registry's `is/skatturinn`
> numbered-line precedent. A registry-wide search confirmed no existing
> schema models this literal EU-harmonised paper template under any
> jurisdiction (the closest neighbours — `fr/france-visas/schengen-visa-application`
> and four national/long-stay "D"-visa schemas — are a bespoke online
> portal and non-harmonised long-stay designs, respectively, not the Annex I
> short-stay template). The source's own printed numbering (fields 1-37) was
> cross-walked against a fresh position-based text extraction to build **74
> fields** (several numbered items expand into more than one field, e.g.
> field 33's cost-of-travel selector and its two independent means-of-
> support checklists). Two GSP-0013 constructs land in an `at/bmeia`/`at/bmi`
> cycle for the first time: an `exclusivityGroups` entry over field 33's four
> mutually-exclusive "who pays" checkboxes (independent booleans, since this
> flat specimen carries no AcroForm radio layer to merge them into a true
> enum), and two `crossFieldValidation` `compare` rules (departure not before
> arrival; travel-document expiry not before its issue date). Disclosed
> rather than machine-encoded: the source's own asterisked exemption
> (fields 19, 20, 31, 32, and 33's payer-selector need not be filled in by
> family members of EU/EEA/Swiss citizens exercising free movement, who
> instead complete fields 34-35) is stated only as footnote prose tied to
> the applicant's own status, not a structured rule keyed to an existing
> field — each affected field's `description` discloses it instead, this
> registry's established "disclosed rather than falsely encoded" pattern.
> The lengthy pre-signature declaration (VIS/data-processing consent, fee
> non-refundability, multi-entry travel-insurance requirement, the standard
> accuracy declaration) is paraphrased into one `documents[]` attestation
> rather than quoted verbatim or split into invented per-statement
> checkboxes, since the source presents it as one continuous prose block
> before a single signature line. See
> `registry/at/bmeia/schengen-visa-application/1.0.0/VERIFICATION.md` for
> the full sourcing record, every disclosed scope decision, and the mock
> conformance test run (0 errors across two scenarios covering all 74
> fields, plus 8 mutation/negative controls — including, for the first time
> in an AT cycle, controls exercising `exclusivityGroups` and
> `crossFieldValidation`). This gives Austria **5 of its 6 verticals**
> (Business Formation, Taxes, National ID, Passport, Visa); DMV remains a
> confirmed weak/dead-end candidate from a prior cycle (in-person/counter-
> driven, no downloadable specimen) — the last item standing between Austria
> and full 6/6 coverage, and one that would need a materially different kind
> of source than the PDF-forms approach used so far.

> **Update (2026-07-10, GOV-2128, "GovSchema Standard Research"): Austria's
> Passport vertical opens**, via `at/bmeia/passport-or-identity-card-application`
> v1.0.0 — the bilingual German/English "Antrag auf Ausstellung eines
> österreichischen Reisepasses oder Personalausweis" (Application for an
> Austrian passport or identity card), used principally through Austrian
> embassies and consulates abroad. This candidate was screened and
> confirmed real in the prior GOV-2121 cycle; this cycle re-verified it
> from scratch (fresh fetch, fresh `pdfjs-dist` extraction) rather than
> trusting the prior numbers, and authored it. Extracted **42 AcroForm
> widgets** across the PDF's 2 pages with `pdfjs-dist`; `getFieldObjects()`
> confirms all 42 are distinct, independently-named fields with **zero
> shared field names anywhere in the document** — a materially different,
> and more general, finding than the sibling `at/bmi/national-identity-card-application`
> schema's 2 genuine PDF radio-button groups: every multi-option selector
> on this specimen (document type; applicant-vs-named-child; gender;
> existing-passport status; lost-vs-stolen; the 7-option
> legal-representation basis) is independent, non-grouped checkboxes.
> Modelled honestly per this issue's explicit instruction: each selector
> is independent optional boolean fields, with a GSP-0013
> `exclusivityGroups` entry declared wherever real-world mutual
> exclusivity is evident (gender; applicant-vs-child; existing-passport
> status; lost-vs-stolen; legal-representation basis) but deliberately
> **not** for the document-type selector, since an applicant may
> legitimately request more than one document type in a single filing.
> Zero widgets were excluded as non-data controls and zero were
> merged — unlike every prior AT cycle (`at/bmi`: 7/34 excluded; `at/bmf`:
> 15/90; `at/gewerbebehoerde`: 5/101) — so all 42 widgets map 1:1 onto
> **42 fields**. A specific font-encoding bug disclosed in the sibling
> `at/bmi` cycle (dropped "F" glyphs) was explicitly checked for and
> **not found** in this specimen. See
> `registry/at/bmeia/passport-or-identity-card-application/1.0.0/VERIFICATION.md`
> for the full sourcing record (including a disclosed mission-variant
> finding: the Canberra embassy's own citizen-services pages point
> passport applicants to their own locally-numbered forms and identity-card
> applicants to the *other*, already-modelled dedicated Personalausweis
> PDF, rather than to this session's central combined specimen), every
> disclosed scope decision (the staff-only "Vorgelegte Nachweise"
> checklist left unmodelled since it carries no applicant-facing AcroForm
> widgets; the self/child asymmetry in existing-passport-status fields),
> and the mock conformance test run (0 errors across two scenarios
> covering all 42 fields and all 3 `documents[]` entries, plus 8
> mutation/negative controls, including two exercising the new
> `exclusivityGroups` construct for the first time in an AT cycle). This
> gives Austria **4 of its 6 verticals** (Business Formation, Taxes,
> National ID, Passport); Visa remains an open, screened-and-viable
> backlog candidate (the EU-standard "Formular C1", identified in the
> GOV-2121 cycle); DMV remains a confirmed weak/dead-end candidate from a
> prior cycle.

> **Update (2026-07-10, GOV-2121, "GovSchema Standard Research"): Austria's
> National ID vertical opens**, via `at/bmi/national-identity-card-application`
> v1.0.0 — the "Antrag auf Ausstellung eines Personalausweises"
> (Application for issuance of an identity card), a valid EU/Schengen
> travel document and domestic proof of identity and citizenship. This
> cycle's brief was to screen Austria's three remaining unscreened
> verticals — Passport, Visa, and National ID — and author the strongest.
> All three screened as real, usable candidates (none a dead end), a first
> for this registry's recent Austria cycles: a bilingual German/English
> combined "passport or identity card" consular form (42 AcroForm widgets,
> `bmeia.gv.at`) for Passport; the EU-standard 37-field "Formular C1"
> Schengen visa application (no AcroForm layer, numbered fields, `bmeia.gv.at`)
> for Visa; and the dedicated Personalausweis application (34 AcroForm
> widgets, one page) for National ID — selected as the strongest of the
> three for containing two genuine PDF radio-button groups (gender;
> legal-representation basis), a materially cleaner structure than the
> combined passport form's own document-type selector, which is
> implemented as three independent, non-grouped checkboxes rather than a
> true radio group. Sourced directly from `oesterreich.gv.at`'s own
> federal content-delivery host and cross-confirmed **SHA-256-byte-identical**
> to the copy in BMEIA's central "Allgemein/Formulare" library, itself
> linked by name from a live Austrian embassy citizen-services page — a
> stronger sourcing chain than a single mission's own local copy, two of
> which (a bilingual 42-widget and a trilingual German/English/Hebrew
> 74-widget variant, the latter carrying a stray, apparently miscopied
> Hebrew caption) were found and explicitly set aside as less canonical.
> Extracted 34 AcroForm widgets with `pdfjs-dist` (7 non-data controls
> excluded: two duplicate heading-label widgets whose own default value
> equals their printed heading, one near-zero-area stray widget with no
> label of its own, two further stray unlabeled widgets overlapping other
> content's label/box boundaries, and two footer widgets carrying the
> form's internal reference code and page count); the two confirmed radio
> groups were
> merged into enum fields rather than split into independent unconstrained
> booleans, yielding 23 fields. A specific font used for this PDF's
> heading/note text was found to drop the letter "F" from certain rendered
> words in `pdfjs-dist`'s text-layer extraction (confirmed against
> reliably-encoded field-dictionary strings elsewhere in the same PDF) —
> disclosed in full in `VERIFICATION.md` together with two cases where a
> widget's internal PDF field name paraphrases text actually printed as
> separate, non-contiguous runs on the page (the gender field's heading
> and footnote; the height field's label and unit marker), neither
> presented as one contiguous printed phrase. See
> `registry/at/bmi/national-identity-card-application/1.0.0/VERIFICATION.md`
> for the full sourcing record, every disclosed scope decision (the
> four-way identity-proof branch left unencoded as a `requiredWhen` matrix
> since the source states it only in prose; the still-open bilingual
> combined passport/identity-card form as a companion-schema candidate),
> and the mock conformance test run (0 errors across two scenarios
> covering all 23 fields, plus 6 mutation/negative controls). This gives
> Austria **3 of its 6 verticals** (Business Formation, Taxes, National
> ID); Passport and Visa are now confirmed-viable, screened, open backlog
> candidates (not dead ends) for a future cycle; DMV remains a confirmed
> weak/dead-end candidate from a prior cycle.

> **Update (2026-07-10, GOV-2114, "GovSchema Standard Research"): Austria's
> Taxes vertical opens**, via `at/bmf/employee-tax-assessment` v1.0.0 —
> Bundesministerium für Finanzen (BMF) Form L 1, "Erklärung L1 zur
> ArbeitnehmerInnenveranlagung 2025," the annual employee/pensioner income
> tax assessment reconciling wage tax withheld during the year against final
> liability. Austria (opened last cycle via GOV-2107, at 1 of 6 verticals)
> was deepened per this registry's existing Iceland/Sweden sequencing
> precedent (Taxes right after a jurisdiction opens). Screened Austria's
> Kfz-Zulassung (vehicle registration) as the other strong candidate first
> and found it an in-person, counter-driven process with no downloadable
> specimen at `oesterreich.gv.at`, `bmimi.gv.at`, or any Land host — deferred,
> not pursued. The L 1 form was reached via BMF's own "Formular öffnen"
> download endpoint (`formulare.bmf.gv.at/service/formulare/inter-Steuern/pdfs/2025/L1.pdf?open=download`),
> itself linked from oesterreich.gv.at's federal form-search index (form 47);
> BMF's own ASP-based `service.bmf.gv.at` forms-search pages returned only a
> generic navigation shell to a non-browser `curl` fetch and were not usable
> as a source. Extracted 90 AcroForm widgets with `pdfjs-dist` (15 non-data
> controls excluded: PDF-generator metadata, an FDF-send/import toolbar, a
> repeated running tax-number display header, and a reset button); a
> 3-option gender selector, a 6-option marital-status selector, a 2-option
> sole-earner/single-parent-credit selector, and a visually-split 10-digit
> partner social security number were each merged into one field rather than
> modelled as independent unconstrained booleans/fields, yielding 66 fields.
> A programmatic verbatim-quote cross-check against a fresh `pdfjs-dist` text
> extraction caught 9 near-miss quotes carrying PDF line-wrap-hyphenation or
> run-boundary spacing artifacts (the same category of issue this registry's
> prior `at/gewerbebehoerde` cycle flagged) — each corrected by shortening
> the quoted span or paraphrasing, never presented as a false verbatim quote.
> See `registry/at/bmf/employee-tax-assessment/1.0.0/VERIFICATION.md` for
> the full sourcing record, every disclosed scope decision (7 named
> companion attachments not modelled as their own schemas; optional,
> non-gated partner/residence-country/BIC fields whose source-stated
> conditional rules this spec's Condition grammar cannot precisely encode),
> and the mock conformance test run (0 errors across two scenarios covering
> all 66 fields, plus 10 mutation/negative controls). This gives Austria
> **2 of its 6 verticals** (Business Formation, Taxes); DMV was screened this
> cycle and found weak (in-person/counter-driven, no form); Passport, Visa,
> and National ID remain open, unscreened backlog candidates.

> **Update (2026-07-10, GOV-2107, "GovSchema Standard Research"): Austria
> opens as the registry's 31st jurisdiction**, via
> `at/gewerbebehoerde/trade-licence-registration` v1.0.0 — the Gewerbeanmeldung
> (trade-licence registration) under the federal Gewerbeordnung 1994 (GewO
> §§13, 14, 39, 333a, 339-348). A prior cycle had flagged Austria's regional
> `tirol.gv.at` host as a TCP-level connection timeout/reset (not a confirmed
> bot block) and left it untested for a future cycle with different network
> access. This cycle retried Austria against **federal** hosts instead
> (`usp.gv.at`, `help.gv.at`/`oesterreich.gv.at` — both reachable, HTTP 200)
> and confirmed the earlier symptom is a genuine narrow host-level gap, not a
> blanket Austrian block: a second federal host, `bmaw.gv.at`, timed out
> identically (`curl` exit 6 / HTTP 000) on three separate attempts this
> session. `usp.gv.at`'s own federal Gewerbeanmeldung explainer page (content
> owned by the Bundesministerium für Wirtschaft, Energie und Tourismus,
> "Letzte Aktualisierung: 20. März 2026") pointed to Land Oberösterreich's own
> current fillable-AcroForm PDF implementation of the same nationally-legislated
> process, form LWLD-Wi/E-8 ("Stand: Juli 2021") — confirmed as the current
> edition still linked from the Land's own forms index (an older LWLD-Wi/E-7
> edition remains reachable by direct URL but is no longer linked). This
> mirrors the pattern already established for
> `de/gewerbeamt/business-registration` (a nationally-standardized process
> published and hosted per-Land/municipality, not by one central federal
> PDF). Extracted 101 AcroForm widgets with `pdfjs-dist` (5 non-data
> controls excluded; 10 radio/checkbox groups merged into single enum/boolean
> fields rather than split into independent unconstrained booleans), modelling
> 86 fields and 5 `documents[]` entries (two identity-document requirements,
> a conditionally-exempt qualification-proof requirement, and two attestation
> declarations under GewO §§13 and 39 Abs. 2). Scoped to Land Oberösterreich's
> edition and its 17 district trade authorities; a filer in a different
> Bundesland would use that Land's own edition of the same process — a real,
> open fast-follow candidate for a future cycle, along with cross-checking a
> second Land's edition to reach the same three-edition verification standard
> `de/gewerbeamt` already meets. This opens Austria with **1 of its 6
> verticals** (Business Formation); its other five (Passport, DMV, Taxes,
> Visa, National ID) are open, unscreened backlog candidates. See
> `registry/at/gewerbebehoerde/trade-licence-registration/1.0.0/VERIFICATION.md`
> for the full sourcing record, extraction technique, every disclosed scope
> decision, and the mock conformance test run (0 errors across two happy-path
> scenarios covering all 86 fields, plus 5 mutation/negative controls that
> each correctly failed with exactly one error).

> **Update (2026-07-10, GOV-2096, "GovSchema Standard Research"): full
> box-level coverage restored** for `se/skatteverket/individual-income-tax-return`,
> via a new `2.0.0` (MAJOR — restructures the field set versus `1.0.0`,
> not a backward-compatible addition). GOV-2093's review gate (below) had
> correctly corrected GOV-2091's original 48-field draft down to 14 aggregate
> fields, because the URL it cited (`.../thecontentsoftheincometaxreturn...html`)
> does not carry the granular §1.1-9.2/17/18 bilingual box content the draft
> modelled. That granular content is nevertheless real, current, official
> Skatteverket content — it was genuinely fetched via `curl` in the original
> authoring session, just from a *different* page
> (`.../howtofileyourtaxreturn/incometaxreturn12026.4.5c281c7015abecc2e20911b.html`,
> "Income Tax Return 1, 2026") that was never written into `source.url`. This
> cycle independently re-fetched that correct URL live (fresh `curl`, HTTP
> 200, third independent confirmation after the original session and the
> GOV-2093/GOV-2096 close-out), mechanically cross-checked every one of the
> 48 fields' `sourceRef` quotes against the freshly extracted page text, and
> patched 9 fields whose quotes had drifted from the source's exact wording
> (added punctuation, curly-vs-straight quotes, and — in two cases — a
> silently "corrected" typo the source itself makes, `owner-ocupied` for
> `owner-occupied`, now quoted verbatim with that misspelling disclosed).
> `1.0.0` is **not edited** — VERSIONING.md §3 states a published version
> directory is "never edited or deleted," which sits in tension with the same
> document's "Status interaction" note that a superseded version's `status`
> "may move to deprecated"; this cycle resolved that tension conservatively
> by leaving `1.0.0`'s bytes untouched and recording the supersession here
> instead, flagging the wording contradiction to the Founding Engineer for a
> future clarifying edit — resolved in GOV-2102: superseding a version never
> edits the prior directory's `status`; `deprecated` is reserved for a newly
> published version signaling its own source process was retired, and
> ordinary supersession is tracked here in `CATALOG.md`/the registry index,
> exactly as this cycle already did. See
> `registry/se/skatteverket/individual-income-tax-return/2.0.0/VERIFICATION.md`
> for the full correction record, verbatim cross-check methodology, and the
> mock conformance test run (0 errors across 48 fields, 3 mutation tests).
> Sweden's vertical count is unchanged (4 of 6: Business Formation, DMV,
> Visa, Taxes) — this deepens the Taxes vertical's existing schema rather
> than opening a new vertical.

> **Update (2026-07-10, GOV-2091, "GovSchema Standard Research"): Sweden's
> Taxes vertical opens**, via `se/skatteverket/individual-income-tax-return`
> v1.0.0 — Skatteverket (Swedish Tax Agency) Form SKV 2000,
> "Inkomstdeklaration 1" ("Income Tax Return 1"). The task brief's own named
> National ID candidates (DE Steuer-ID, SG NRIC, NZ RealMe, "remaining voter
> registration") were re-checked first and confirmed already resolved or
> dead-ended in prior cycles (GOV-651, GOV-634/GOV-641, GOV-660), so this
> cycle instead deepened Sweden (3 of 6 verticals: Business Formation,
> DMV, Visa) toward its next vertical. Screened Polisen's passport
> application (eID-login "Mina sidor" booking, entirely in-person identity
> verification, no downloadable form) and Skatteverket's national ID card
> (id-kort; staff-assisted in-person application, no pre-fillable form)
> first and found both weak, then found Sweden's individual tax return is,
> unusually for this registry, a **personalized document with no publicly
> downloadable blank specimen** — Skatteverket pre-prints each taxpayer's own
> copy from third-party reports and mails it to their registered address; a
> blank paper copy can only be ordered through an authenticated e-service or
> printed after an eID login. In place of a specimen PDF, Skatteverket
> maintains a dedicated, officially bilingual "contents of the income tax
> return" page stating verbatim "Here you will find the headlines in the
> form... in English", giving the exact Swedish box text and its own official
> English translation for every numbered box (1.1 through 9.2, plus sections
> 17-18) — fetched directly via `curl` and parsed from the raw HTML rather
> than summarized by a fetch tool. Models employment income and deductions
> (§1-2), general deductions (§3), the basis for common tax reductions —
> ROT/RUT work, renewable electricity, donations, sustainable-technology
> installation (§4) — the basis for the residential property charge and
> property tax (§5-6), capital income and deductions (§7-8), foreign
> insurance yield tax (§9), additional disclosures — foreign income, foreign
> tax settlement, ROT/RUT reallocation requests, income-data corrections,
> free-text other information (§17) — and the signature/contact footer
> (§18). Deliberately excludes the return's business-activity sections
> (10-16: Business activities, Interest allocation, Expansion funds tax,
> Reduction of social security contributions, General deductions for
> business, and business-rental-property charge/tax bases), which apply only
> to filers who also run a sole-proprietorship business (referencing separate
> Forms NE/N3A) or own rental/industrial property and reference further
> un-modelled K-annexes (K4 through K15A/B) — consistent with this registry's
> existing convention of deferring repeating/complex annex-referenced blocks.
> The taxpayer identity header (personnummer/name/address) is disclosed
> honestly in VERIFICATION.md as not itself enumerated on Skatteverket's
> numbered-box source page and not independently confirmed against a
> specimen image, since none was available. See the document's own
> VERIFICATION.md for the full sourcing record and every disclosed scope
> decision, including the mock conformance test run (0 errors across 48
> fields, 4 mutation tests). Sweden now stands at 4 of its 6 verticals
> (Business Formation, DMV, Visa, Taxes); its remaining two verticals
> (Passport, National ID) were screened this cycle and confirmed in-person/
> eID-login dead ends with no field-by-field source found.

> **Update (2026-07-10, GOV-2084, "GovSchema Standard Research"): Iceland's
> Taxes vertical opens**, via
> `is/skatturinn/simplified-individual-tax-return` v1.0.0 — Skatturinn Form
> RSK 1.13, "Tax return | simplified", the short-form annual individual
> income tax return the form itself scopes to individuals who have lived in
> Iceland for less than three years (excluding couples, filers with
> dependent children, owners of real estate/securities/shares, and the
> self-employed, who must file the full RSK 1.10/1.01 return instead). The
> task brief's own named National ID candidates (DE Steuer-ID, SG NRIC, NZ
> RealMe, "remaining voter registration") were re-checked first and confirmed
> already resolved or dead-ended in prior cycles, so this cycle instead
> deepened Iceland (opened GOV-2077 with one vertical, Business Formation).
> Screened Samgöngustofa's driving-licence process (DMV; e-service only, no
> downloadable form found), Þjóðskrá's passport process (Passport/National
> ID; in-person biometric issuance via `island.is` pre-registration, no
> field-by-field paper form found), and Útlendingastofnun's Form D-110
> residence-permit application (Visa; a genuine 251-widget, 9-page AcroForm,
> set aside this cycle as too broad for one session) before finding RSK 1.13:
> directly downloadable, unauthenticated, and listed on Skatturinn's own
> forms index alongside Polish/Russian/Spanish translations, confirming it is
> a currently-maintained, actively used form. Unlike RSK 5.02 (GOV-2077), this
> form has no AcroForm field layer at all — extracted via `pdfjs-dist`'s
> position-tagged `getTextContent()` using the form's own printed reference
> numbers (21, 22, 134, 162, 296, 301, etc.) as the field-identity anchor,
> then cross-checked by rendering the PDF with a real full-build headless
> Chromium (Playwright `chrome-linux64`, `/paperclip/chrome-sysroot` shared
> libraries) and visually re-inspecting both pages at high zoom — the same
> visual-confirmation discipline GOV-2070/GOV-2077 established for this
> registry. That visual pass caught a genuine inconsistency in the source
> document itself: the box printed on page 1 for the savings-account
> interest-income total reads "12", but the back-page instructions prose
> refers to the same box as "312" (confirmed via the raw text layer, which
> extracts "312" verbatim from the instructions sentence) — not an extraction
> artifact. This document follows the number actually printed on the
> fillable box; the discrepancy is disclosed in the field's own description
> and in VERIFICATION.md. Models the filer's identity and duration of stay;
> salary and employment payments (up to four employer entries); car
> allowance/per diem/fringe benefits; other income; deductions; the computed
> tax base; taxes withheld at source; savings/bank-account status (up to two
> account entries and their totals); a refund bank account; and a foreign TIN
> and address abroad for filers who leave Iceland before assessment — see the
> document's own VERIFICATION.md for the full sourcing record, extraction
> transcript, and every disclosed scope decision, including the mock
> conformance test run (0 errors across 47 fields, 4 mutation tests). Iceland
> now stands at 2 of its 6 verticals (Business Formation, Taxes); its
> remaining four verticals (DMV, Passport, Visa, National ID) are open
> backlog candidates — DMV and Passport were screened this cycle and found
> e-service-only/in-person with no field-by-field form; Visa has a real but
> broad-scoped candidate (Form D-110) worth a dedicated future session;
> National ID remains unscreened. **[This Visa candidate was authored at
> GOV-2210, "Iceland's Visa vertical opens (3/6)" — see the Executive
> Summary update above; it is no longer open backlog.]**

> **Update (2026-07-10, GOV-2077, "GovSchema Standard Research"): Iceland
> opens as GovSchema's 30th jurisdiction**, via
> `is/skatturinn/business-employer-vat-registration` v1.0.0 — Skatturinn
> (Iceland Revenue and Customs) Form RSK 5.02, "Notification to tax
> authorities, registration in the employer's registry and/or value added
> tax registry". Sweden's own backlog (opened GOV-2056, deepened through
> GOV-2063/GOV-2070 to 3 of 6 verticals) is now largely mined out: its
> remaining Passport/National ID candidates are confirmed in-person/
> biometric-only dead ends, and its Taxes candidate (Skatteverket SKV 4314)
> remains genuinely source-blocked by a live PDF-generation servlet that
> resets the connection for both a direct fetch and a real headless-Chromium
> session — re-confirmed this cycle, with the Wayback Machine also
> unreachable as a fallback. A scouting pass instead found Iceland's
> Skatturinn publishing RSK 5.02 as a genuine 101-field AcroForm (2 pages),
> bilingual (Icelandic/English), unauthenticated and directly downloadable
> with no CAPTCHA/login/WAF gate, its file-modification history (Aug 2023,
> Sep 2024) showing the edition still actively served rather than
> superseded. Extracted with `pdfjs-dist` (`getFieldObjects()`/
> `getAnnotations()`/`getTextContent()`); because the field names are short
> Icelandic abbreviations rather than self-documenting English strings, and
> several checkbox groups are printed as visually-grouped single choices
> while implemented as independent same-type AcroForm widgets, the PDF was
> additionally rendered with a real full-build headless Chromium (Playwright,
> `chrome-linux64`, not the lighter `headless_shell` build which has no PDF
> viewer) and visually re-inspected page-by-page before finalizing the
> field-to-label mapping — the same "confirm a checkbox group's true
> exclusivity before modelling it" discipline GOV-2070's own review fix
> established for this registry. Collapsed three genuinely single-choice
> checkbox groups into enums ('Form of operation'; 'Class of activity,
> reference groups A-H'; 'Position'), while keeping two visually-grouped but
> semantically independent checkbox clusters (four special-employer
> categories; six income-registration methods) as separate booleans. Models
> the operator/company's identifying details; VAT-taxable activity,
> estimated turnover, and income-registration method; an optional
> business-takeover declaration; Employer's Registry classification; a legal
> entity's estimated wage payments and shareholders; an independent
> operator's estimated calculated remuneration; and a foreign employer's
> Iceland-registered contact details — see the document's own VERIFICATION.md
> for the full sourcing record, extraction transcript, and every disclosed
> scope decision, including the mock conformance test run (0 errors across
> 85 fields and 3 documents, 5 mutation tests). Iceland now stands at 1 of
> its 6 verticals (Business Formation); its other five verticals (Passport,
> DMV, Taxes, Visa, National ID) are open, unscreened backlog candidates for
> a future cycle.

> **Update (2026-07-10, GOV-2070, "GovSchema Standard Research"): Sweden's
> Visa vertical opens**, via `se/migrationsverket/work-permit-application`
> v1.0.0 — Migrationsverket (the Swedish Migration Agency) Form 149011,
> "Application for a Swedish work permit". GOV-2063's own closing note had
> flagged Sweden's remaining four verticals (Passport, Taxes, Visa, National
> ID) as open backlog; this cycle re-screened all four. Taxes (Skatteverket
> SKV 4314, the preliminary income tax declaration) looked like the
> strongest candidate at first — a genuine 77-field AcroForm — but its only
> directly-fetchable static copy proved on independent re-extraction to be a
> stale c.2014/2015 edition (its own guidance text cites "beskattningsår
> 2014" figures, and a web search confirmed the form has since been reissued
> for tax years 2024/2025/2026 with real structural changes); Skatteverket's
> live PDF-generation servlet resets the connection for both a direct fetch
> and a real headless-Chromium session alike, a genuine server-side fault
> rather than a bot gate. Rather than author against a demonstrably stale
> source, this candidate was abandoned and Migrationsverket's work-permit
> form was authored instead: its own Schengen short-stay visa form was
> reconfirmed a duplicate of the EU-harmonized template already published
> elsewhere in this registry, but Form 149011 is a genuinely Sweden-national,
> non-harmonized 143-distinct-field AcroForm (159 widgets, collapsing radio
> groups) with zero field overlap with the Schengen template, and its own
> footer edition stamp reads "149011 2026-06-11" — one month old at the time
> of review, the strongest recency signal found this cycle. Extracted with
> `pdfjs-dist` (`getAnnotations()`/`getTextContent()` across all 9 pages,
> reading-order-sorted by y/x coordinate); the form's own field names are
> already descriptive English strings. Models four mutually-exclusive
> top-level application categories (first-time, extension, new-employer/
> assignment, student-employed), each with an artist/athlete-coach/other
> profession sub-choice; personal, passport, and contact details; previous
> Sweden/Schengen stays (up to 4 rows); family details (spouse plus up to 5
> children); employer/salary/insurance details; previous Sweden work
> history; education and work-experience history (school, university,
> vocational, and prior-employer rows); comprehensive health insurance;
> a Temporary-Protection-Directive residence-permit-revocation question; and
> an attached permanent-residence-permit application path. Deliberately
> scoped out the GDPR-processing appendix (the form's own pages 8-9, which
> it states must not be submitted) and the separate companion form 133011 for
> co-applicant family members — see the document's own VERIFICATION.md for
> the full sourcing record, extraction transcript, and every disclosed scope
> decision, including the mock conformance test run (0 errors across 142
> fields and 13 documents, 5 mutation tests). Sweden now stands at 3 of its 6
> verticals (Business Formation, DMV, Visa); Taxes remains a genuinely open
> but currently source-blocked candidate, while Passport and National ID
> are reconfirmed in-person/biometric-only dead ends.

> **Update (2026-07-10, GOV-2063): Sweden's DMV vertical opens**, via
> `se/transportstyrelsen/vehicle-registration-new-vehicle` v1.0.0 —
> Transportstyrelsen (the Swedish Transport Agency) Form TS8003, "Ansökan om
> registrering av ett nytt fordon | Application for registration of a new
> vehicle". `se/bolagsverket/aktiebolag-formation`'s own closing note (GOV-2056)
> had flagged Sweden's other five verticals as open, unscreened backlog
> candidates; this cycle scouted all five and found DMV the clear strongest —
> Taxes (Skatteverket) has moved to e-service-only with its field-by-field
> paper guide discontinued, Passport and National ID are both in-person/
> biometric-only processes with no home-fillable form, and Visa is a
> confirmed duplicate of the EU-harmonized Schengen template already
> published as `fr/france-visas/schengen-visa-application`. TS8003 is a
> genuine 41-field fillable AcroForm PDF (4 pages), unauthenticated and
> directly downloadable with no BankID/CAPTCHA/login gate, carrying the
> authority's own field-by-field guide on the same PDF's pages 3-4,
> section-numbered to match the fields on pages 1-2 — the same
> "self-documenting Swedish AcroForm" pattern `se/bolagsverket/aktiebolag-formation`
> established for this jurisdiction. Extracted with `pdfjs-dist`
> (`getFieldObjects()`/`getAnnotations()`/`getTextContent()`); programmatically
> checked all 41 annotations' PDF-level `Required` flag — none set it, the
> same "form's own prose, not the PDF's Required bit, is the requiredness
> signal" pattern already documented for the Bolagsverket sibling. Models the
> vehicle's origin (imported by a registered importer, or professionally
> manufactured in Sweden), owner, vehicle details (coded vehicle-type and
> colour enums), technical-data registration method (individual approval vs.
> eCoC), number-plate combination, registration-certificate issuance,
> putting-into-service/leasing/credit, and tractor/motorised-implement usage
> classification. Deliberately scoped out the used-vehicle/origin-check
> ("ursprungskontroll") path the form's own header excludes, multi-stage
> type-approved vehicles' cross-field eCoC format-matching rule, and the
> power of attorney needed for a transferred end-of-series dispensation — see
> the document's own VERIFICATION.md for the full sourcing record and every
> disclosed scope decision. Two fields (`originType`/`ownerIsSameAsImporter`
> gating `documents[].importOrManufacturerCertificate`) were deliberately
> designed to avoid the "`notEquals` empty-string absent-field bug" a prior
> cycle caught (GOV-1045/GOV-1047, generalized from GOV-763): every
> `requiredWhen` here compares only against a required, always-populated enum
> or an enum-gated boolean, never an optional field's absent-vs-sentinel
> state; the one place that pattern would have applied
> (`documents[].endOfSeriesDispensationDecision`, keyed off an optional
> case-number field) instead folds its trigger condition into the document's
> own `label` text, with no `requiredWhen` at all. A mock
> `conformance/se/transportstyrelsen/vehicle-registration-new-vehicle/1.0.0/application-packet.json`
> test run (a registered importer bringing a new Volvo into Sweden for a
> customer who is not the importer, technical data via eCoC, credit
> purchase) was checked with a from-scratch script re-implementing the
> schema's own required/requiredWhen condition grammar, passing with 0
> errors across all 40 fields (36 collected, 4 correctly not-applicable) and
> all 4 documents (2 provided, 2 correctly not-applicable); three mutation
> tests confirmed the `typeApprovalNumber`, `financierOrgNumber`, and
> `documents[].importOrManufacturerCertificate` conditional branches all fire
> correctly in both directions. Sweden now stands at **2 of its 6 verticals**
> (Business Formation, DMV); Taxes remains a genuinely unscreened backlog
> candidate (Skatteverket's e-service migration may still admit a companion
> paper form in a future cycle), while Passport, National ID, and Visa are
> now confirmed dead ends/duplicates for this jurisdiction.

> **Update (2026-07-10, GOV-2056): Sweden opens as GovSchema's 29th
> jurisdiction**, via `se/bolagsverket/aktiebolag-formation` v1.0.0 —
> Bolagsverket (the Swedish Companies Registration Office) Form 816,
> "Nyregistrering | Registration of a new company — Aktiebolag | Limited
> company". This `GovSchema Standard Research` cycle's phase-1 catalog audit
> found every remaining whole-jurisdiction-vertical gap in the Executive
> Summary table already screened in a prior cycle and confirmed either a
> dead end (JP Passport/DMV, CZ/ID/MX National ID, NL/ZA/PL/PT Visa
> duplicates) or an already-flagged weak backlog candidate (CH/PT Business
> Formation, India ITR-3's deferred shared schedules) — so this cycle
> searched instead for a genuinely new jurisdiction, per the task brief's own
> phase-2 instruction. Found a genuine 156-field fillable AcroForm PDF (8
> pages), officially bilingual Swedish/English (the same
> translation-fidelity strength that made
> `jp/isa/certificate-of-eligibility-application` the strongest candidate in
> its own opening cycle), unauthenticated and directly downloadable with no
> CAPTCHA/login/WAF gate, with the government's own field-by-field guide on
> the PDF's own pages 5-8. Extracted with `pdfjs-dist`
> (`getTextContent()`/`getFieldObjects()`/`getAnnotations()`); programmatically
> checked all 156 AcroForm annotations' PDF-level `Required` flag — none set
> it, the same "form's own prose, not the PDF's Required bit, is the
> requiredness signal" pattern already documented for `nl/kvk/bv-formation`.
> Scoped to the single-founder/sole-ordinary-board-member case (the founder
> is also the company's one ordinary board member, plus the deputy member
> the Companies Act mandates whenever the board has fewer than three
> ordinary members), an all-cash share-capital contribution, and the
> small-company audit exemption — the same single-founder narrowing
> `nl/kvk/bv-formation`, `de/handelsregister/gmbh-formation-musterprotokoll`,
> and `za/cipc/private-company-incorporation` each apply to their own
> jurisdiction's first true-limited-company schema. A mock
> `conformance/se/bolagsverket/aktiebolag-formation/1.0.0/application-packet.json`
> test run (single-founder Gothenburg IT-consultancy AB, all-cash SEK 25,000
> share capital), checked with a from-scratch script re-implementing the
> schema's own required/requiredWhen condition grammar, passed with 0
> violations across 41 fields (35 collected, 6 correctly not-applicable);
> two mutation tests confirmed the `signatoryPowerType` other-alternative
> branch and the `boardMemberResidesAbroad`-gated country/passport-copy
> branch both fire correctly. See
> `registry/se/bolagsverket/aktiebolag-formation/1.0.0/VERIFICATION.md` for
> the full sourcing record and every disclosed scope decision. Sweden opens
> with 1 of its 6 verticals (Business Formation); its other five verticals
> (Passport, DMV, Taxes, Visa, National ID) are open, unscreened backlog
> candidates for a future cycle.

> **Update (2026-07-10, GOV-2049): Japan's Business Formation vertical is
> deepened with a third stock-company-incorporation variant**, via
> `jp/houmukyoku/stock-company-establishment-registration-application-board-of-directors`
> v1.0.0 — the Legal Affairs Bureau's Stock Company Establishment Registration
> Application (株式会社設立登記申請書), this time the "board of directors
> installed, incorporation by promoters" (取締役会を設置する株式会社の発起
>設立) variant, row 1-1 of the same `houmukyoku.moj.go.jp` index page the
> already-published no-board sibling (row 1-3) is sourced from — one of the
> three remaining sibling incorporation variants CATALOG.md's own Known Gaps
> item 6 has flagged as Japan's sole open companion-schedule candidates since
> GOV-2019. This recurring "GovSchema Standard Research" cycle first
> re-checked the task brief's own named National ID candidates (DE Steuer-ID,
> SG NRIC loss/damage/re-registration, NZ RealMe, "remaining voter
> registration") against this catalog and confirmed all were already resolved
> by prior cycles — the recurring generic brief was again treated as a prompt
> to re-scan the catalog fresh, not a literal to-do list, per this registry's
> established pattern. Of the three remaining sibling variants (board
> installed + promoter subscription, board installed + public subscription,
> no board + public subscription), this cycle picked the board-installed +
> promoter-subscription variant as the strongest candidate: unlike the
> public-subscription axis (which the application form itself does not
> surface as any distinct field, only affecting the internal content of
> already-out-of-scope supporting documents), installing a board of directors
> changes two things the form itself genuinely surfaces — a board-elected,
> rather than directly-designated, representative director, and a Companies
> Act art. 327(2)-mandated auditor (`hasAuditor`/`auditorNames` are therefore
> `required: true` on this document, versus optionally `requiredWhen`-gated on
> the no-board sibling, a deliberate, disclosed departure reflecting the two
> variants' genuinely different legal requirements) plus a new
> `auditorScopeLimitedToAccounting` field with no counterpart on the sibling.
> Sourced the blank template (`001249314.pdf`) and its companion worked
> example (`001331097.pdf`) directly from row 1-1, extracted with the same
> pdfjs-dist x/y-coordinate technique used throughout this registry's Japan
> documents, and cross-checked line-by-line against the no-board sibling's own
> re-fetched source PDFs to isolate every genuine difference between the two
> variants. Reuses the no-board sibling's own ten `documents[]` attachment
> `id`s rather than re-specifying them, per this registry's composability/
> reuse convention, with two disclosed `required`/wording changes (the
> representative-director-selection document becomes unconditionally required;
> two attachment labels drop their parenthetical "if any" auditor phrasing).
> See
> `registry/jp/houmukyoku/stock-company-establishment-registration-application-board-of-directors/1.0.0/VERIFICATION.md`
> for the full sourcing record, extraction diff, and every disclosed scope
> decision, including the mock-data test run (two scenarios plus five negative
> controls, all behaving as expected). This deepens rather than widens Japan's
> Business Formation vertical coverage — Japan remains at **4 of its 6
> verticals** (Visa, National ID, Business Formation, Taxes); the two
> remaining sibling incorporation variants (board installed + public
> subscription; no board + public subscription) remain this registry's open
> Japan companion-schedule candidates.

> **Update (2026-07-09, GOV-2042): Japan's Taxes vertical is now published**,
> with `jp/nta/individual-income-tax-final-return` v1.0.0 — the National Tax
> Agency's 所得税及び復興特別所得税の申告書 (Income Tax and Special Income Tax
> for Reconstruction Return), the candidate GOV-2005's own closing note had
> flagged as "unscreened" and no subsequent Japan cycle (GOV-2012, GOV-2019,
> GOV-2026, GOV-2035) had touched. Sourced the current tax-year-2025
> (令和７年用) blank Form 1/Form 2 template directly from the NTA's own annual
> index page, cross-referenced against the NTA's own official bilingual
> English guide (the 2024 edition, since the matching 2025 edition's own
> per-section PDFs render their prose pages as un-selectable outline/vector
> glyphs with no extractable text layer — likely deliberate copy protection;
> only its data tables remain genuine text). Because tax year 2024 carried a
> one-time flat-amount tax cut (定額減税) absent from 2025, and tax year 2025
> introduces a brand-new deduction box (特定親族特別控除, part of the 2025 tax
> reform raising the "103万円 wall") absent from 2024, the two editions' own
> line numbers diverge by one box from that point on in opposite directions —
> reconciled by an independent position-based (x/y-coordinate) re-extraction
> of the actual current form, the same technique GOV-2005 used for the
> Certificate of Eligibility's checkbox grid, rather than trusting either
> edition's own printed numbering. Models Form 1's taxpayer-identity fields,
> its two most common income-source line items (employment income and
> public-pension miscellaneous income — the same "two most common
> income-source line items" scoping precedent `pl/mf/zeznanie-pit-37` used),
> and its full deductions-from-income column (social insurance through
> donations, 13 fields). Deliberately excludes the return's other seven
> income-type line items (each requiring its own financial statement or
> capital-gains schedule) and its entire downstream tax-computation chain
> (progressive-bracket tax, all credits, the 2.1% reconstruction surtax,
> withholding reconciliation, and refund banking) as future companion-schedule
> candidates — every excluded figure is either a pure arithmetic function of
> unmodelled totals or a standalone lookup-table credit computation, mirroring
> how `pl/mf/zeznanie-pit-37` excludes its own downstream computed-arithmetic
> sections wholesale. See
> `registry/jp/nta/individual-income-tax-final-return/1.0.0/VERIFICATION.md`
> for the full sourcing record, the position-extraction transcript, and the
> mock-data test run (two scenarios plus four negative controls, all behaving
> as expected). This closes Japan's Taxes vertical; Japan now stands at **4 of
> its 6 verticals** (Visa, National ID, Business Formation, Taxes) — DMV and
> Passport are confirmed dead ends (GOV-2005).

> **Update (2026-07-09, GOV-2035): Japan's Seal Registration Notification**
> (印鑑届書) is now published, as
> `jp/houmukyoku/seal-registration-notification` v1.0.0 — a companion/
> supporting-filing schema, not a new company-type application: this is the
> Legal Affairs Bureau's own generic seal-registration/seal-change
> notification, common to every entity type it registers (companies, NPOs,
> associations, foundations, cooperatives, and more), used both alongside a
> brand-new entity's own establishment registration and, later, whenever a
> representative's seal changes. This was the candidate CATALOG.md's own
> Known Gaps item 6 had flagged as an open companion-schedule opportunity
> since GOV-2019, referenced by name in both already-published Houmukyoku
> company-formation schemas' own scope notes. Sourced from the same
> `houmukyoku.moj.go.jp` index page as those two schemas
> (`https://houmukyoku.moj.go.jp/homu/COMMERCE_11-1.html`); unlike those two
> schemas' own first-PDF-found-was-a-worked-example trap, this notification's
> index-page row cleanly separates its one blank template
> (`001188212.pdf`, 81174 bytes, 1 page, zero AcroForm/Widget annotations) from
> its thirteen separate per-entity-type worked-example PDFs, two of which
> (株式会社, 持分会社) were cross-checked field-by-field against the blank
> template. Models the seal submitter's own particulars, seal-card
> continuity across a change of representative, and — sourced directly from
> the blank template itself, a stronger finding than either sibling schema's
> own agent/proxy fields — a complete embedded power-of-attorney block with
> two independent delegated-power checkboxes, plus a waivable personal seal
> certificate attachment. Deliberately scoped out: the scenario where the
> entity's representative is itself a corporation (a distinct filing case the
> source's own worked examples document across four dedicated pages,
> including its own 保証書 guarantee-letter attachment), flagged as a future
> companion-schedule candidate — see the document's own VERIFICATION.md for
> the full sourcing record, extraction diff, and every disclosed scope
> decision. Japan's vertical count remains 3 of 6 (Visa, National ID, Business
> Formation), unchanged by this companion-schedule cycle.

> **Update (2026-07-09, GOV-2026): Japan's Business Formation vertical is
> deepened** with a second company-type schema,
> `jp/houmukyoku/limited-liability-company-establishment-registration-application`
> v1.0.0 — the Legal Affairs Bureau's Godo Kaisha (合同会社, "Limited
> Liability Company", e.g. Amazon Japan G.K., Apple Japan G.K.) Establishment
> Registration Application. This `GovSchema Standard Research` cycle first
> re-checked the task brief's own named National ID candidates (DE Steuer-ID,
> SG NRIC loss/damage + re-registration, NZ RealMe) and "remaining voter
> registration" against this catalog and confirmed all were already resolved
> by prior cycles (`de/finanzamt/tax-identification-number`,
> `sg/ica/identity-card-replacement` + `sg/ica/identity-card-reregistration`,
> `nz/dia/realme-verified-identity`; every tracked voter-registration gap is
> either published or a confirmed dead end/legally-closed window — see Known
> Gaps below) — the recurring generic brief was treated as a prompt to
> re-scan the catalog fresh, per this registry's established pattern, not a
> literal to-do list. This catalog's own Known Gaps item 6 (GOV-2005/
> GOV-2012/GOV-2019) had flagged Japan's three sibling Kabushiki Kaisha
> incorporation variants and its Seal Registration Notification (印鑑届書) as
> the next candidates on the same `houmukyoku.moj.go.jp` index page the
> existing Stock Company schema was sourced from; this cycle instead found a
> stronger, previously-unflagged candidate on that same page — a wholly
> distinct company-type template (not a procedural variant of the Kabushiki
> Kaisha form), mirroring how this registry already models more than one
> company-formation entity type elsewhere (Germany's `business-registration`
> and `gmbh-formation-musterprotokoll`). The first PDF found
> (`001252889.pdf`) again turned out to be the Bureau's own filled-in worked
> example, not the blank form — the identical trap GOV-2019 hit for the
> Kabushiki Kaisha template — traced via the same index page to the genuine
> blank template (`001249560.pdf`). A Godo Kaisha has no shareholders,
> shares, directors, or board; it is run by 社員 ("members"), any of whom may
> itself be a corporation, modelled via `representativeMemberIsCorporation`/
> `hasCorporateManagingMember` booleans gating a `performingOfficer`
> designation and a composite `any`-conditioned registered-matters-
> certificate attachment (this registry's first use of GSP-0013's boolean
> composition grammar in a Japan document). Two sourcing caveats disclosed:
> the blank template's own `登記すべき事項` body is genuinely blank (unlike
> the Kabushiki Kaisha sibling's, which retained worked-example placeholder
> text), and the agent/proxy (代理人) filing pathway has no distinct labeled
> row anywhere on this blank template at all (unlike the sibling, whose blank
> template prints the row without its annotation) — modelled anyway on the
> worked example's own evidence, disclosed rather than silently equated with
> the sibling's finding. Models 19 fields plus 9 attachment requirements. See
> the document's own VERIFICATION.md for the full sourcing trail, extraction
> diff, and every disclosed scope decision. Japan's vertical count remains 3
> of 6 (Visa, National ID, Business Formation) — this deepens rather than
> widens Japan's coverage; the three sibling Kabushiki Kaisha variants and
> the Seal Registration Notification remain open, flagged for a future
> cycle.

> **Update (2026-07-09, GOV-2019): Japan's Business Formation vertical** is
> now published, with
> `jp/houmukyoku/stock-company-establishment-registration-application` v1.0.0
> — the Legal Affairs Bureau's Stock Company Establishment Registration
> Application (株式会社設立登記申請書), the candidate two prior cycles
> (GOV-2005, GOV-2012) had already screened, found genuinely live, and
> flagged but not pursued. The task brief's flagged PDF
> (`houmukyoku.moj.go.jp/homu/content/001331002.pdf`) turned out on
> inspection to be the Bureau's own filled-in worked example ("記載例") of
> one specific procedural variant (取締役会を設置しない株式会社の発起設立 —
> no board of directors, incorporation by promoters); traced back to its own
> index page (`houmukyoku.moj.go.jp/homu/COMMERCE_11-1.html`) to find the
> genuinely blank counterpart template (`001249317.pdf`) this document is
> actually modelled from, confirming both are companion publications of the
> same variant, one of four the Bureau separately publishes (the other
> three — board-installed + promoter subscription, board-installed + public
> subscription, no-board + public subscription — are each flagged as a
> future companion-schedule candidate). No AcroForm layer, but a full
> extractable Japanese text layer; diffing the blank template against the
> worked example line-by-line revealed that the application's own
> "matters to be registered" (登記すべき事項) passage is not written into
> boxes on the printed page at all, but drafted separately and submitted via
> an attached printout, a CD-R, or the Bureau's online filing system — both
> PDFs merely print a worked example of that passage's required content and
> format, which this document nonetheless models field-by-field since a real
> submission needs every one of those data points regardless of channel.
> Models 21 fields (company identity, the registered-matters content —
> purposes, share capital structure, the transfer-restriction clause,
> officer particulars — and the filing/agent block) plus 10 attachment
> requirements (articles of incorporation, promoters' consents, capital-
> payment proof, identity/seal certificates, and a conditional power of
> attorney), several `requiredWhen`-gated per the source's own explanatory
> notes. The registration-fee/tax computation (課税標準金額 and 登録免許税)
> was excluded as purely arithmetic (0.7% of capital, ¥150,000 floor,
> rounded to the nearest ¥100) per this registry's established
> excludable-arithmetic-vs-input test. See
> `registry/jp/houmukyoku/stock-company-establishment-registration-application/1.0.0/VERIFICATION.md`
> for the full field-by-field source mapping, the worked-example/blank-
> template diff, and the mock-data test run (two scenarios plus three
> negative controls, all behaving as expected). This closes Japan's Business
> Formation vertical; Japan now stands at **3 of its 6 verticals** (Visa,
> National ID, Business Formation) — DMV and Passport are confirmed dead
> ends (GOV-2005).

> **Update (2026-07-09, GOV-2012): Japan's National ID vertical** is now
> published, with `jp/j-lis/individual-number-card-issuing-application` v1.0.0
> — the Japan Agency for Local Authority Information Systems' (J-LIS)
> generic, handwritten Individual Number Card (My Number Card) Issuing
> Application, one of the two strong candidates the immediately preceding
> cycle (GOV-2005) had screened and flagged below but not pursued. Sourced
> from `kojinbango-card.go.jp`'s own officially bilingual Japanese/English
> edition (`hpsv/wpmng/documents/tegaki-kofu-shinseisho-en.pdf`), confirmed
> live and linked from the site's own "Application form downloads" page
> alongside 10 other language editions of the identical form. No AcroForm
> layer (a print-and-handwrite form), but a full extractable text layer plus
> an annotated page-2 instructions/worked-example page used directly as the
> mock-data test run's source. Models 19 fields (identity, contact,
> foreign-residency status, the two opt-out Digital Certificate checkboxes,
> and the conditional statutory-representative section for minor/adult-ward
> applicants) plus 1 photo document requirement across 1 `steps` entry. See
> `registry/jp/j-lis/individual-number-card-issuing-application/1.0.0/VERIFICATION.md`
> for the full field-by-field source mapping, a bot-mitigation note (a
> rate-limit-triggered Incapsula redirect distinct from `moj.go.jp`'s
> curl-UA-specific 403), and the mock-data test run against the source's own
> worked example. This closes Japan's National ID vertical; Japan now stands
> at **2 of its 6 verticals** (Visa, National ID) — DMV and Passport are
> confirmed dead ends (GOV-2005), and Business Formation (the Legal Affairs
> Bureau's Stock Company Establishment Registration Application,
> `houmukyoku.moj.go.jp`, also flagged by GOV-2005) remains Japan's sole
> open backlog candidate.

> **Update (2026-07-09, GOV-2005): Japan opens as GovSchema's 28th
> jurisdiction**, with `jp/isa/certificate-of-eligibility-application` — the
> shared applicant cover sheet ("For applicant, part 1") of the Immigration
> Services Agency's (ISA, part of the Ministry of Justice) Application for
> Certificate of Eligibility (在留資格認定証明書交付申請書), the standard
> pre-clearance step nearly every non-tourist status of residence (work,
> study, dependent, spouse, etc.) requires before the matching entry visa can
> be applied for abroad. This cycle screened DMV (National Police Agency /
> prefectural police — no downloadable home-fillable driver's-licence
> application exists; it is an in-person, counter-issued process, a
> confirmed dead end), Business Formation (Legal Affairs Bureau,
> `houmukyoku.moj.go.jp` — a genuine, live stock-company registration-
> application PDF found and flagged as a strong candidate for a future
> cycle), National ID (J-LIS My Number Card, `kojinbango-card.go.jp` — a
> genuine live bilingual generic application PDF found and also flagged for
> a future cycle), and Passport (`mofa.go.jp` — reconfirmed fully
> domain-blocked regardless of `User-Agent`, per GOV-1174, not retried).
> Chose the Certificate of Eligibility because it is officially bilingual
> Japanese/English (removing translation-fidelity risk), because its cover
> sheet is independently confirmed byte-for-byte identical across three
> unrelated status-of-residence category variants (Student, Religious
> Activities, and Spouse or Child of Permanent Resident/Japanese National —
> using a position-based `pdfjs-dist` x/y-coordinate re-extraction to
> faithfully reconstruct the 34-option purpose-of-entry checkbox grid across
> its 8-row, 6-column layout), and because it has the richest field set of
> the candidates screened. `moj.go.jp` and its Legal Affairs Bureau
> subdomain return HTTP 403 only to a request using curl's own default
> `User-Agent` string, but HTTP 200 to both an ordinary browser `User-Agent`
> and this repository's own `verify-sources.mjs` request — a narrow
> bot-mitigation signature, materially different from `mofa.go.jp`'s
> domain-wide block. This document scopes to the shared cover sheet only,
> leaving each of the roughly 30 category-specific supplements (and the
> separate sponsoring-organization pages many categories require) as
> candidates for a future companion-schedule cycle, mirroring how this
> registry already splits the Czech Republic's tax return from its Přílohy
> annexes. Japan opens at **1 of its 6 verticals** (Visa); DMV and National
> ID have strong unpursued candidates (see above); Passport is a confirmed
> dead end; Business Formation and Taxes remain unscreened. See
> `registry/jp/isa/certificate-of-eligibility-application/0.1.0/VERIFICATION.md`
> for the full sourcing record and every disclosed scope decision.

> **Update (2026-07-09, GOV-1998): Czech Republic's Příloha č. 4
> separate-tax-base annex** is now published, with
> `cz/mf/priloha-4-vypocet-dane-ze-samostatneho-zakladu-dane` — form
> 25 5405/P4, the §16a zákona flat-15%-rate companion schedule to the
> already-published base return (`cz/mf/priznani-k-dani-z-prijmu-fyzickych-osob`,
> GOV-1826), which the already-published Příloha č. 3
> (`cz/mf/priloha-3-vypocet-dane-z-prijmu-ze-zdroju-v-zahranici`, GOV-1991)
> had flagged as the sole remaining open backlog candidate in this
> companion-schedule sequence. Sourced from `financnisprava.gov.cz`'s own
> "Daňové tiskopisy" listing page, confirming the current edition is vzor
> č. 13 (`financnisprava.gov.cz/assets/tiskopisy/5405-P4_13.pdf`, a flat
> print/reference facsimile with zero AcroForm/Widget fields, same shape as
> Přílohy č. 1-3), self-contained with its own embedded "POKYNY K PŘÍLOZE
> č. 4" field-by-field instructions on its own page 2. Models the annex's
> single computation: foreign-source §7/§8/§10 income (partnership shares,
> capital income, settlement/liquidation shares, and specified other income)
> combined into one separate tax base taxed at a flat 15% and relieved by an
> ordinary foreign-tax-credit computation capped at 15% of the credit-eligible
> portion. Two disclosed scope decisions depart from a pure-arithmetic default:
> ř. 406 (the §7/§8 subtotal) names a further §8 odst. 9 zákona expense
> reduction this registry has no field for, so it is modelled as its own
> entered field rather than assumed derivable from ř. 401 + ř. 401a alone;
> and ř. 411 (the credit-eligible income subset) is the taxpayer's own
> selected portion of the combined base, not a printed sum, so it too is
> modelled as its own field. The remaining six pure-sum/difference/rate/cap
> lines (ř. 407, 408, 409, 410, 413, 414) are excluded as unconditionally
> derivable from already-modelled fields on this same annex. Modelled 10
> fields across 1 `steps` entry. See
> `registry/cz/mf/priloha-4-vypocet-dane-ze-samostatneho-zakladu-dane/1.0.0/VERIFICATION.md`
> for the full field-by-field source mapping, the line-by-line
> pure-arithmetic-vs-input classification for every one of ř. 401-414, both
> scope decisions in full, and the worked mock-data example. This closes the
> separate-tax-base share of the Known Gaps section's Czech Republic Taxes
> item and, with it, the base return's own companion-schedule backlog
> (Přílohy č. 1-4) entirely; the Czech Republic remains at **4 of its 6
> verticals** (Business Formation, DMV, Visa, Taxes) — Passport and National
> ID are confirmed dead ends, per GOV-1819/GOV-1826's own findings.

> **Update (2026-07-09, GOV-1991): Czech Republic's Příloha č. 3
> foreign-source-income annex** is now published, with
> `cz/mf/priloha-3-vypocet-dane-z-prijmu-ze-zdroju-v-zahranici` — form
> 25 5405/P3, the §38f zákona double-taxation-relief companion schedule to
> the already-published base return (`cz/mf/priznani-k-dani-z-prijmu-fyzickych-osob`,
> GOV-1826), which the already-published Příloha č. 2
> (`cz/mf/priloha-2-vypocet-dilciho-zakladu-dane-najem-ostatni-prijmy`,
> GOV-1984) had flagged, alongside Příloha č. 4, as one of the two sole
> remaining open backlog candidates. Sourced from `financnisprava.gov.cz`'s
> own "Daňové tiskopisy" listing page, confirming the current edition is
> vzor č. 22 (`financnisprava.gov.cz/assets/tiskopisy/5405-P3_22.pdf`, a flat
> print/reference facsimile with zero AcroForm/Widget fields, same shape as
> Přílohy č. 1-2), self-contained with its own embedded "POKYNY K PŘÍLOZE
> č. 3" field-by-field instructions on its own page 2. Models both statutory
> double-taxation-relief methods: the exemption-with-progression-reservation
> method (§38f odst. 7 zákona, ř. 311-316, recomputing the tax base and
> overall effective tax rate after excluding treaty-exempted foreign income)
> and the ordinary tax-credit method (§38f odst. 8 zákona, ř. 321-330,
> crediting foreign tax paid up to a per-country coefficient, aggregated
> across this annex and any supplementary per-country sheets). A genuine
> structural finding distinct from the prior two annexes: every formula on
> this annex references either another field on this same annex or a line on
> the **base return itself** (ř. 36, 41, 42, 44, 54, 56, 57) — and the base
> return's own schema was confirmed, by grepping its `sourceRef` values, to
> model none of those lines (they were excluded there as downstream computed
> subtotals). This means a printed "A minus B" formula on this annex cannot
> always be assumed to be excludable pure arithmetic the way ř. 203 was
> on Příloha č. 2 — four lines (ř. 313, 316, 326, 327) are unconditionally
> derivable from other fields already on this same annex and are excluded,
> while seven lines (ř. 311, 312, 314, 315, 324, 325, 330) reference a
> base-return line this registry never models (or branch "ř. X nebo ř. Y" to
> one) and are therefore modelled as their own fields, computed off-schema by
> the filer from the base return's own figures. Modelled 14 fields across 2
> `steps`. See
> `registry/cz/mf/priloha-3-vypocet-dane-z-prijmu-ze-zdroju-v-zahranici/1.0.0/VERIFICATION.md`
> for the full field-by-field source mapping, the line-by-line
> pure-arithmetic-vs-input classification for every one of ř. 311-330, and
> the worked mock-data example. This closes the foreign-source-income share
> of the Known Gaps section's Czech Republic Taxes item; the Czech Republic
> remains at **4 of its 6 verticals** (Business Formation, DMV, Visa, Taxes),
> with Příloha č. 4 (separate tax base, §16a zákona) now the sole remaining
> open backlog candidate in this companion-schedule sequence.

> **Update (2026-07-09, GOV-1984): Czech Republic's Příloha č. 2
> rental/other-income annex** is now published, with
> `cz/mf/priloha-2-vypocet-dilciho-zakladu-dane-najem-ostatni-prijmy` — form
> 25 5405/P2, the rental-income (§9 zákona) and other-income (§10 zákona)
> companion schedule to the already-published base return
> (`cz/mf/priznani-k-dani-z-prijmu-fyzickych-osob`, GOV-1826), which the
> already-published Příloha č. 1 (`cz/mf/priloha-1-vypocet-dilciho-zakladu-dane-samostatna-cinnost`,
> GOV-1977) had flagged as the next open backlog candidate. Sourced from
> `financnisprava.gov.cz`'s own "Daňové tiskopisy" listing page, confirming
> the current edition is vzor č. 22
> (`financnisprava.gov.cz/assets/tiskopisy/5405-P2_22.pdf`, a flat
> print/reference facsimile with zero AcroForm/Widget fields, same shape as
> Příloha č. 1), self-contained with its own embedded "POKYNY K PŘÍLOZE č. 2"
> field-by-field instructions on its own page 2 — no separate instructions
> document needed. A genuine, disclosed structural finding, in deliberate
> contrast with Příloha č. 1: that annex's own ř. 104 line had a disclosed
> full-accounting-method exception (an independently-entered accounting
> result bypassing the printed subtraction); this annex's structurally
> similar-looking ř. 203 line carries no equivalent instruction anywhere —
> its own Pokyny text directs only "uveďte výpočet podle údajů v tiskopisu"
> (compute per the form's own data), with no alternative-entry path
> disclosed, and §9 zákona itself offers no účetnictví (accounting) option
> the way §7 does. ř. 203 is therefore excluded as pure arithmetic, unlike
> Příloha č. 1's ř. 104 — a deliberate, disclosed difference in treatment,
> not an inconsistency. Models the §9 rental partial-tax-base computation
> (ř. 201-206, including the immovable-property-only subset and a
> flat-rate-expense/joint-marital-property checkbox pair), a rental-property
> reserves disclosure, and the §10 other-income partial-tax-base computation
> (ř. 207-209) over the annex's own bounded, 4-row, filer-composed
> "type of other income" table — collapsed to a free-text summary field per
> this registry's established convention for filer-named repeating rows,
> unlike Příloha č. 1's own fixed-category 9-row balance-sheet worksheet,
> which was modelled field-by-field. Modelled 12 fields across 2 `steps`.
> See `registry/cz/mf/priloha-2-vypocet-dilciho-zakladu-dane-najem-ostatni-prijmy/1.0.0/VERIFICATION.md`
> for the full field-by-field source mapping, the ř.104-vs-ř.203 comparison
> in full, and every disclosed scope decision. This closes the rental/other-
> income share of the Known Gaps section's Czech Republic Taxes item; the
> Czech Republic remains at **4 of its 6 verticals** (Business Formation,
> DMV, Visa, Taxes), with Příloha č. 3-4 (foreign-source income, separate
> tax base) now the sole remaining open backlog candidates in this
> companion-schedule sequence.

> **Update (2026-07-09, GOV-1977): Czech Republic's Příloha č. 1
> self-employment annex** is now published, with
> `cz/mf/priloha-1-vypocet-dilciho-zakladu-dane-samostatna-cinnost` — form 25
> 5405/P1, the self-employment/business-income companion schedule to the
> already-published base return (`cz/mf/priznani-k-dani-z-prijmu-fyzickych-osob`,
> GOV-1826), whose own description and VERIFICATION.md had explicitly named
> and deferred this exact annex. The two candidate URLs supplied at the
> start of this cycle were independently confirmed, by reading their own
> printed edition text rather than trusting the URL path, to be stale —
> tax-year-2016 (vzor č. 12) and tax-year-2017 (vzor č. 25) editions, roughly
> a decade behind. `financnisprava.gov.cz`'s own "Daňové tiskopisy" listing
> page was fetched directly instead and confirmed the current edition is
> vzor č. 22 (`financnisprava.gov.cz/assets/tiskopisy/5405-P1_22.pdf`, a flat
> print/reference facsimile with zero AcroForm/Widget fields, the same shape
> as the base return), self-contained with its own embedded "POKYNY K
> PŘÍLOZE č. 1" field-by-field instructions on its own pages 3-4 — no
> separate instructions document was needed. A genuine, disclosed structural
> finding: unlike the base return (whose downstream lines are all pure
> arithmetic), this annex's own ř. 104 line is not purely computable from
> ř. 101/102 for a taxpayer on the full-accounting method, who instead enters
> an independently-derived accounting profit/loss directly — modelled as its
> own field rather than excluded as computed. Models the partial-tax-base
> computation (ř. 101-112, excluding ř. 113's own pure-arithmetic final sum
> and the unoccupied ř. 103/111), the taxpayer's three-way record-keeping
> method (tax records/full accounting/flat expense-percentage, a literal
> printed checkbox, unlike the inferred discriminator this registry's own
> CH-ZH Hilfsblatt B needed), its own bounded 9-row/18-field tax-records
> balance-sheet worksheet, the main business activity and its expense rate,
> activity dates, and company-partner/collaborating-person/partnership
> disclosures. Modelled 53 fields across 5 `steps`. This closes the
> self-employment share of the Known Gaps section's Czech Republic Taxes
> item; the Czech Republic remains at **4 of its 6 verticals** (Business
> Formation, DMV, Visa, Taxes), with Příloha č. 2-4 (rental/other,
> foreign-source, and separate-tax-base income) still open backlog
> candidates. See
> `registry/cz/mf/priloha-1-vypocet-dilciho-zakladu-dane-samostatna-cinnost/1.0.0/VERIFICATION.md`
> for the full field-by-field source mapping and every disclosed scope
> decision.

> **Update (2026-07-09, GOV-1970): Estonia's Visa vertical** is now
> published, with `ee/vm/long-stay-visa-application` — Valisministeerium's
> (Ministry of Foreign Affairs) 13-page online pre-application wizard for
> Estonia's national (long-stay, category D) visa
> (`eelviisataotlus.vm.ee/d/`), closing Estonia's last remaining vertical
> gap and bringing it to **6 of 6**. Page 1/13 (email + CAPTCHA) is a
> genuine bot-mitigation gate; this cycle used the `agent-browser` skill to
> drive a real headless-browser session (via a persistent `--remote-
> debugging-port` Chromium reached through Playwright's `connectOverCDP`,
> since the wizard's session state does not survive a client disconnect
> through Playwright's own multiplexed `connect()` protocol), read the
> CAPTCHA image directly, and independently walk all 13 pages live with
> mock data — capturing real field names, full enum option text, and two
> live cross-field validation error messages, a stronger sourcing basis
> than this registry's more typical single-PDF-fetch pattern. Compared
> field-by-field against `de/auswaertiges-amt/national-visa-application`
> (the EU-harmonized template Poland's, Portugal's, and Switzerland's own
> national visa forms were found to duplicate): Estonia's wizard shares
> only the opening Schengen-harmonized identity/travel-document item shape
> with Germany's, then diverges with an EU/EEA/Swiss/UK-Withdrawal-
> Agreement close-relative section, a mandatory employment/education-history
> block with a full structured employer address, a two-column
> (applicant/sponsor) means-of-support checkbox matrix, a host
> organization/person section with its own registration code and contact
> person, and its own 8-category purpose-of-journey taxonomy sharing no
> labels with Germany's 6 categories — genuinely distinct, not a duplicate,
> matching the Spain/Czech Republic precedent rather than the Poland/
> Portugal/Switzerland one. Modelled 98 fields (10 `documents[]` entries)
> across 11 steps. See `registry/ee/vm/long-stay-visa-application/1.0.0/VERIFICATION.md`
> for the full field-by-field comparison, the live-walkthrough method, and
> every disclosed scope decision (the host-natural-person variant of page 9
> and a blog-only insurance-date field were not independently field-name-
> verified live and are omitted rather than invented).

> **Update (2026-07-09, GovSchema Standard Research): India's first
> sub-national schema**, `in/kl/registration/partnership-firm-registration`
> — "Form I", the Indian Partnership Act, 1932's own statutory partnership
> registration application under Section 58, as prescribed by Kerala's own
> Partnership (Registration of Firms) Rules, 1959 (Rule 3) and filed with
> Kerala's Registration Department (Registrar of Firms). This closes the
> India half of the Known Gaps section's item 1 ("sub-national/state ...
> Business Formation expansion: CA/NZ/IE/IN sole-trader/partnership/LLP
> formation") — Ontario's own share was already closed in prior cycles
> (GOV-1947, GOV-1953). Section 71 of the central Act expressly delegates
> Section 58 form/fee/rule-making to each State Government, confirmed by
> a live cross-read of Sections 4, 30, 58, 59, and 71 fetched directly
> from indiacode.nic.in, and by Chapter VII's own "STATE AMENDMENT" notes
> showing multiple states (Goa, Rajasthan, Uttarakhand, Maharashtra,
> Karnataka) independently amending their own Section 58/59 rules and
> fees — confirming this is genuinely a sub-national process, not a
> uniform central form, and justifying the `in/kl/...` path (mirroring
> `ca/on/...`, `ch/zh/...`, `us/ca/...`). Form I is a static, two-page,
> non-fillable PDF (no AcroForm/XFA) with a fixed 5-partner table; since a
> partnership requires at least two partners (Section 4) and GovSchema
> v0.3 has no array/repeating-field type (GSP-0009), the first two
> partners are modelled as required and the remaining three as the form's
> own optional additional rows, following the same small-fixed-count
> numbered-field pattern already used by `ca/ircc/passport-application-
> first-adult`'s two required references. See the document's own
> VERIFICATION.md for the full statutory citations, the Kerala-specific
> legacy-TLS fetch workaround this host requires, and every scope
> decision (including the closed-enum witness-category field and the
> Section 30 minor-admitted-to-benefits field, modelled only on the
> optional partner slots since a minor "may not be a partner" under the
> Act).

> **Update (2026-07-09, GOV-1953): a third Ontario schema**,
> `ca/on/registration/general-limited-partnership-registration` — Form
> 5298E, "Register a Business Name for a General Partnership or a Limited
> Partnership" (Business Names Act), sourced directly from the same Ontario
> Central Forms Repository (`forms.mgcs.gov.on.ca`) already used for
> `ca/on/registration/sole-proprietorship-registration` (Form 5288E) and
> `ca/on/registration/business-incorporation` (Form 5351E). This closes the
> "partnership" half of the Known Gaps section's item 1
> ("sub-national/state ... Business Formation expansion: CA/NZ/IE/IN
> sole-trader/partnership/LLP formation"), which GOV-1947 closed the
> "sole-trader" half of last cycle — Ontario's own share of this gap is now
> fully closed. Form 5298E is the same encrypted (AES-128/R4, empty user
> password) dynamic Adobe LiveCycle/XFA form family, decrypted from scratch
> in Node against this PDF's own `/Encrypt` dictionary (this cycle's
> decryption additionally had to locate and decompress a cross-reference-
> stream-era object stream to recover the AcroForm dictionary naming the
> `/XFA` array's packets, one layer deeper than the two sibling forms
> needed). A structural surprise, not a guess: this form has **no** roster
> of the partnership's individual partners at all — it is filed by an
> *already-existing* partnership (which must already hold its own Business
> Identification Number and ministry-issued company key) to register an
> *additional* trade name, and the only place "partner" appears as data is
> in Section 6's Authorization, where one partner (individual, corporation/
> registered entity, or "other" entity) or a person acting under power of
> attorney signs — each of those three types independently repeatable
> (`<occur max="-1"/>`) in the source XFA with no bound cap. GovSchema v0.3
> has no `array`/repeating-value field type (GSP-0009 remains an unaccepted
> proposal), so this document narrows to the single most common path — one
> partner, of type Individual, authorizing directly — the same scope-
> narrowing convention `ca/on/registration/sole-proprietorship-registration`
> already used for its own Power-of-Attorney exclusion. See the document's
> own VERIFICATION.md for the full method, the complete field-by-field
> sourcing, and every disclosed scope decision.

> **Update (2026-07-09, GOV-1947): a second Ontario schema**,
> `ca/on/registration/sole-proprietorship-registration` — Form 5288E,
> "Register a Business Name for a Sole Proprietorship" (Business Names Act),
> sourced directly from the Ontario Central Forms Repository
> (`forms.mgcs.gov.on.ca`), the same source family already used for
> `ca/on/registration/business-incorporation` (Form 5351E). This closes the
> Known Gaps section's item 1 ("sub-national/state ... Business Formation
> expansion: CA/NZ/IE/IN sole-trader/partnership/LLP formation") for
> Canada's sole-trader half specifically. Ireland's own CRO Form RBN1 was
> screened first for the same gap but the entire `cro.ie` domain sits behind
> a Cloudflare JavaScript challenge that blocks both direct fetch and a real
> headless-browser `networkidle` wait; this cycle pivoted to Ontario
> instead. Form 5288E is itself a dynamic, **encrypted** (AES-128/R4, empty
> user password) Adobe LiveCycle/XFA PDF — decrypted from scratch in Node
> against the PDF's own `/Encrypt` dictionary (Algorithm 2 key derivation,
> then per-object AES-128-CBC decryption) to recover the `/XFA` array's
> `template`/`datasets` packets directly, a new technique beyond the
> `pdfjs-dist` `enableXfa`/`allXfaHtml` method recorded for Form 5351E — see
> the document's own VERIFICATION.md for the full method and every
> disclosed scope decision (scoped to a standard Ontario business address,
> a Canadian address for service, and direct sole-proprietor authorization;
> the "Person Acting Under Power of Attorney" pathway and Form 5298E,
> Ontario's sibling general/limited-partnership registration form, remain
> open for a future cycle). Ontario's own sole-trader gap is now closed;
> NZ's, Ireland's (pending a Cloudflare workaround), and India's
> sole-trader/partnership candidates, plus Ontario's own partnership form,
> remain open.

> **Update (2026-07-09, GOV-1938): Malaysia's Business Formation gap is
> now closed**, with `my/ssm/sole-proprietorship-partnership-registration`
> — Form A ("Borang A"), the First Schedule to the Registration of
> Businesses Rules 1957 (P.U.(A) 282/1957), through which a person
> responsible for a new sole proprietorship or partnership registers the
> business with the Registrar of Businesses under the Registration of
> Businesses Act 1956 (Act 197). This is a different statute and a
> different registry from the Companies Act 2016 regime GOV-1774's own
> cycle had already screened and rejected (SSM's "Superform" company
> -incorporation specimen, zero AcroForm fields, too thin to model) —
> GOV-1774's own record explicitly flagged that a live Form A PDF was
> searched for but not found at the time. This cycle located it directly
> and unauthenticated on `ssm.com.my` (a Word-generated HTML reproduction
> of the gazetted First Schedule's own table layout, not a PDF), and
> cross-read the parent Act 197 (fetched fresh, `pdfjs-dist`-extracted)
> for legal grounding, confirming s.5(1)'s thirty-day post-commencement
> registration deadline and s.5(2)'s statutory content requirements match
> the form's own printed sections field-for-field. Scoped to Form A only:
> its own siblings printed on the same First Schedule page — Form A1
> (renewal, Rule 5) and Form B (change of particulars, Rule 6) — are
> distinct later-in-time statutory transactions against an
> already-registered business (Act 197 ss.5A/5B) and are out of scope,
> along with a single-owner/partner-particulars-block scope limit (no
> repeating/array field type in this spec line) and two undecoded internal
> SSM "Kod (2)" code boxes disclosed rather than guessed at. This gives
> Malaysia **4 of its 6 verticals** (DMV, Passport, Visa, Business
> Formation); Taxes (LHDN Borang BE/B/M/BT, e-Filing-only with empty
> AcroForms) and National ID (JPN MyKad, in-person-only with no
> downloadable form) remain confirmed dead ends from GOV-1783's own
> screening — see the document's own VERIFICATION.md for the full
> candidate comparison and every disclosed scope/judgment call.

> **Update (2026-07-09, GOV-1931): Switzerland's federal Passport and
> National ID verticals** are now published, with
> `ch/fedpol/antrag-pass-identitaetskarte` — the Federal Office of Police
> (fedpol)'s online application tool for a Swiss passport, identity card, or
> both ("Combi"), at `ch-edoc-passantrag.admin.ch` (linked from
> `fedpol.admin.ch/en/application`). This is the first **federal** CH schema
> in the registry (every prior CH schema was cantonal: DMV via
> `ch/sg/stva/gesuch-lernfahr-fuehrerausweis`, Taxes via 11 `ch/zh/sta/*`
> companion schedules). Prior cycles (GOV-1804/GOV-1774/GOV-1840) had only
> ever screened this process at the level of "no downloadable citizen-facing
> PDF exists," without rendering the live JavaScript single-page application
> the process actually runs on; this cycle rendered it directly with a
> headless-Chromium session (Playwright) and confirmed it is a genuine,
> multi-step data-entry tool, not a login-only shell. It issues both
> documents through one shared field set (a `documentType` discriminator:
> passport / identity card / combi), so this registry models it as one
> schema rather than two, per the established single-source/multi-path
> pattern (see `ch/zh/sta/hilfsblatt-b`). The Domicile step (Switzerland vs.
> Abroad, with a 26-canton selector cross-checked against the application's
> own live `/rest/stammdaten/kanton` reference-data endpoint) and the initial
> Applicant-contact card (title/surname/first name/e-mail) were directly
> rendered and DOM-inspected (`required`/`aria-required`/`maxlength`
> attributes, screenshots); the deeper personal-data screens sit behind a
> one-time verification link e-mailed to the applicant, which this cycle
> could not obtain (no real inbox) — those fields were instead sourced from
> the running application's own live-fetched, canonical i18n resource bundle
> (`/rest/i18n/translations/en`, 443 keys, fetched directly and re-verified
> byte-for-byte immediately before opening the PR), a distinction disclosed
> field-by-field in `schema.json` and in full in VERIFICATION.md. This gives
> Switzerland 4 of its 6 verticals (DMV, Taxes, Passport, National ID); Visa
> remains a confirmed duplicate of the EU-harmonized template (GOV-1774), and
> Business Formation (`easygov.swiss`, CH-Login-gated, GOV-1840) is
> Switzerland's sole remaining genuinely open vertical.

> **Update (2026-07-09, GOV-1924): canton Zürich's Hilfsblatt B**
> (agricultural/forestry income questionnaire) is now published, with
> `ch/zh/sta/hilfsblatt-b` — the Kantonales Steueramt Zürich's "Hilfsblatt B
> Fragebogen für Land- und Forstwirtschaft" (StA Form 330, 2020 edition), the
> eleventh CH-ZH companion schedule to
> `ch/zh/sta/steuererklaerung-natuerliche-personen`, used by farms that do not
> qualify for, or do not elect, the simplified sibling schedule
> `ch/zh/sta/hilfsblatt-g` (Form 331, GOV-1917). This form itself forks into
> two mutually exclusive computation paths within one single 4-page PDF —
> "Landwirte mit Buchhaltung" (Ziffern 1/2, full double-entry bookkeeping) or
> "Landwirte mit Aufzeichnungen" (Ziffer 3, simplified cash-register/bank
> records with its own business net-worth statement), both converging on
> shared Ziffer 4/5 sections — confirmed by direct re-extraction to be case
> (a) of the branching-decision framework (one document, two internal
> branches), not two separate form numbers the way Hilfsblatt A's Form
> 328/329 pair turned out to be. Modelled as a single schema using a required
> `berichtsart` discriminator field and `requiredWhen` conditions gating each
> path's own computed subtotal/total fields — no second child issue was filed,
> since there is no second PDF/form-number variant to defer. Sourced from a
> genuine, current, unauthenticated, flat (non-AcroForm) 4-page PDF (97,364
> bytes) from the same `zh.ch` "Formulare für Selbständigerwerbende" listing;
> the listing page's own on-page label (no "bis `<year>`" cutoff qualifier)
> confirms it is the current, unsuperseded edition despite its 2020-dated
> filename. This cycle also corrected a stale size figure inherited from the
> GOV-1917 cycle's own record (which cited "110 KB" without a direct re-fetch;
> the true size is 93 KB, and 110 KB instead matches sibling Form 329). Two
> genuine structural differences from the sibling Hilfsblatt G were found and
> disclosed: an extra "Zwischenkulturen" land-use line, and a four-tier
> (rather than three-tier) Bergzone production-zone selector — both flagged,
> the latter as a possible follow-up for Hilfsblatt G's own field. Modelled
> 136 fields across 11 steps — the largest CH-ZH companion schedule to date,
> reflecting its own dual-computation-path structure. This gives Switzerland
> its eleventh Taxes-vertical document; Switzerland remains at 2 of its 6
> verticals (DMV, Taxes). This closes the CH-ZH companion-schedule backlog
> entirely — no further Hilfsblatt A/B/G variant remains unscreened. See
> `registry/ch/zh/sta/hilfsblatt-b/1.0.0/VERIFICATION.md` for the full
> field-by-field source mapping, every disclosed scope decision, and the
> two worked mock-data examples (one per computation path).

> **Update (2026-07-09, GOV-1917): canton Zürich's Hilfsblatt G**
> (agricultural/forestry income worksheet, simplified statements) is now
> published, with `ch/zh/sta/hilfsblatt-g` — the Kantonales Steueramt
> Zürich's "Hilfsblatt G für Land- und Forstwirtschaft" (StA Form 331, 2020
> edition), the tenth CH-ZH companion schedule to
> `ch/zh/sta/steuererklaerung-natuerliche-personen`, used by smaller farms
> (Talzone up to 8 ha, or hill/mountain zones up to 20
> Rindergrossvieheinheiten, with limited special branches) that qualify to
> report agricultural/forestry income from summed receipts rather than the
> fuller Hilfsblatt B questionnaire (Form 330, still deferred — see below).
> This cycle screened both of the GOV-1910 cycle's two remaining CH-ZH
> backlog candidates, Hilfsblatt B and Hilfsblatt G, and pursued only
> Hilfsblatt G, the narrower, single-computation-path variant, leaving
> Hilfsblatt B (which forks into two structurally different bookkeeping/
> records computation paths) as the sole remaining CH-ZH companion-schedule
> backlog candidate. Sourced from a genuine, current, unauthenticated, flat
> (non-AcroForm) 4-page PDF (95,074 bytes) from the same `zh.ch` "Formulare
> für Selbständigerwerbende" listing; the listing page's own on-page label
> (no "bis `<year>`" cutoff qualifier) confirms it is the current,
> unsuperseded edition despite its 2020-dated filename. This cycle also
> discovered a dedicated companion Wegleitung specific to Hilfsblatt B/G (StA
> Form 332, "Wegleitung HiB HiG ZH 2025"), reached via a redirect sentence in
> the main return's own Wegleitung rather than a worked specimen — it
> independently corroborates this schema's own Ziffer 2.1/2.2 lettering, flat-
> rate deduction schedules, and Naturalbezüge/depreciation valuation rates,
> though (consistent with every prior CH-ZH cycle) it does not contain a
> fully-numeric worked example. A residual discrepancy was also disclosed:
> the Wegleitung's own embedded facsimile of Form 331's page 1 carries a
> different print-date stamp ("(2024) 12.25") than the standalone PDF fetched
> directly ("(2020) 12.20"), textually identical otherwise — flagged for a
> future cycle to re-check. Modelled 117 fields across 7 steps — the letter-
> lettered Ziffer 2.1(a-k)/2.2(a-i) farm income/expense computation is
> considerably more itemized than either Hilfsblatt A variant. This gives
> Switzerland its tenth Taxes-vertical document; Switzerland remains at 2 of
> its 6 verticals (DMV, Taxes). See
> `registry/ch/zh/sta/hilfsblatt-g/1.0.0/VERIFICATION.md` for the full
> field-by-field source mapping, every disclosed scope decision, and the
> worked mock-data example.

> **Update (2026-07-09, GOV-1910): canton Zürich's Hilfsblatt A**
> (self-employment worksheet, commercial bookkeeping) is now published, with
> `ch/zh/sta/hilfsblatt-a-kaufmaennische-buchfuehrung` — the Kantonales
> Steueramt Zürich's "Hilfsblatt A für Selbständigerwerbende mit
> kaufmännischer Buchführung" (StA Form. 329, 2021 edition), the ninth CH-ZH
> companion schedule to `ch/zh/sta/steuererklaerung-natuerliche-personen` and
> the direct sibling of the GOV-1903 cycle's Form 328 (simplified
> bookkeeping) — this variant serves self-employed filers who keep full
> commercial books, transcribing figures directly from a signed balance
> sheet/income statement rather than building them up from itemized
> revenue/cost/asset lines. Sourced from a genuine, current, unauthenticated,
> flat (non-AcroForm) 2-page PDF from the same `zh.ch` "Formulare für
> Selbständigerwerbende" listing; despite carrying a stale-looking 2021
> filename date stamp, the listing page's own on-page label (no "bis
> `<year>`" cutoff qualifier, unlike the page's explicitly-superseded 2021
> copy of Form 328 itself) confirms it is the current, unsuperseded edition —
> a technique worth applying to any future zh.ch candidate whose filename
> date looks old. The Wegleitung's own Ziffer-32 prose independently
> corroborates this form's differently-numbered equity line (Ziffer 10.4,
> versus Form 328's Ziffer 14.4) in the same sentence that names both
> variants, reinforcing the GOV-1903 cycle's decision to treat the two as
> sibling documents rather than editions of one schema. Modelled 51 fields
> across 8 steps — materially smaller than Form 328's 85 fields, since
> commercial-bookkeeping filers transcribe balance-sheet/income-statement
> totals directly rather than itemizing them. This gives Switzerland its
> ninth Taxes-vertical document; Switzerland remains at 2 of its 6 verticals
> (DMV, Taxes). Hilfsblatt B (Form 330, agricultural questionnaire) and
> Hilfsblatt G (Form 331, agricultural/forestry) remain the two open CH-ZH
> companion-schedule backlog candidates. See
> `registry/ch/zh/sta/hilfsblatt-a-kaufmaennische-buchfuehrung/1.0.0/VERIFICATION.md`
> for the full field-by-field source mapping, every disclosed scope decision,
> and the worked mock-data example.

> **Update (2026-07-09, GOV-1903): canton Zürich's Hilfsblatt A**
> (self-employment worksheet, simplified bookkeeping) is now published, with
> `ch/zh/sta/hilfsblatt-a-vereinfachte-buchfuehrung` — the Kantonales
> Steueramt Zürich's "Hilfsblatt A für Selbständigerwerbende mit
> vereinfachter Buchführung" (Form 328, 2024 edition), the eighth companion
> schedule to `ch/zh/sta/steuererklaerung-natuerliche-personen` (GOV-1847),
> used by a self-employed taxpayer who keeps simplified (non-commercial)
> books to compute their self-employment income and business balance sheet —
> referenced by the main return's own Ziffer 2 (self-employment income),
> Ziffer 16.1 (a voluntary pension buy-in), and Ziffer 32 (business equity).
> This picks up the sole remaining CH-ZH companion-schedule gap the GOV-1896
> (Schuldenverzeichnis) cycle left open — Hilfsblatt A/B/G — but pursues only
> Hilfsblatt A's current simplified-bookkeeping variant (Form 328), not its
> kaufmännische-Buchhaltung sibling (Form 329) or the agricultural Hilfsblatt
> B/G (Forms 330/331), each a structurally distinct form deliberately
> deferred as its own future candidate. Sourced from a genuine, current,
> unauthenticated, flat (non-AcroForm) 4-page PDF (`328 Hilfsblatt A mit
> vereinfachter ZH 2024 DEF.pdf`, 95,591 bytes, HTTP 200, no login/CAPTCHA/WAF
> gate, a byte-level scan confirming zero `/AcroForm`/`/Widget` matches),
> fetched from the same `zh.ch` "Formulare für Selbständigerwerbende" listing
> reached from the same tax-forms hub every prior CH-ZH cycle has used. Like
> the Liegenschaftenverzeichnis and Schuldenverzeichnis, this form is hosted
> at a year-independent URL path and carries its own filer-entered "Jahr"
> box. This is a materially larger and structurally different document than
> any of its seven prior CH-ZH siblings — a 4-page, 16-section business
> income/balance-sheet computation rather than a 1-2 page single-topic
> schedule — so its own 35-cell depreciation table and its creditor table
> were each collapsed to a free-text summary field (the established
> unbounded-repeating-table convention), and five same-page duplicate
> re-prints of already-modelled figures were deliberately excluded. The
> Kantonales Steueramt's own Wegleitung was searched exhaustively (a full
> 6,477-line extraction) for a worked specimen of this form's own internal
> lines: none was found — a disclosed negative finding, the same class of
> finding several prior CH-ZH cycles have made — though the Wegleitung's own
> reprints of the main return's Ziffer 2/16.1/32 rows independently confirm
> every one of this schema's transfer-line claims. This schema's own worked
> mock-data example was constructed independently and its arithmetic
> hand-recomputed end-to-end (turnover, cost of goods, gross profit, business
> expenses, AHV-basis and tax-basis income, total assets, and both equity
> computations). Modelled 85 fields across 11 `steps`. This remains
> Switzerland's 2nd of 6 verticals (DMV, Taxes) — a companion schedule, not a
> new vertical — but further deepens Taxes-vertical coverage, leaving Form
> 329 (Hilfsblatt A, kaufmännische Buchhaltung), Hilfsblatt B (Form 330), and
> Hilfsblatt G (Form 331) as open backlog candidates. See
> `registry/ch/zh/sta/hilfsblatt-a-vereinfachte-buchfuehrung/1.0.0/VERIFICATION.md`
> for the full sourcing record, every disclosed scope decision, and the
> worked mock-data example.

> **Update (2026-07-09, GOV-1896): canton Zürich's Schuldenverzeichnis**
> (debts register) schedule is now published, with
> `ch/zh/sta/schuldenverzeichnis` — the Kantonales Steueramt Zürich's
> "Schuldenverzeichnis" (Form 355), the seventh companion schedule to
> `ch/zh/sta/steuererklaerung-natuerliche-personen` (GOV-1847), used by a
> taxpayer with one or more private debts (including mortgage debt) to
> itemize, per creditor, the creditor's name/address, the year-end debt
> balance, and the interest paid — referenced by the main return's own
> Ziffer 12 (line 250, Schuldzinsen) and Ziffer 34 (line 470, Schulden).
> This picks the simpler of the two remaining candidates off the open list
> GOV-1889 left behind (Schuldenverzeichnis, Hilfsblatt A/B/G), passing over
> Hilfsblatt A/B/G since it is, in substance, three separate self-employment
> bookkeeping worksheets (Forms 328/329/330/331) rather than one schedule.
> Sourced from a genuine, current, unauthenticated, flat (non-AcroForm)
> 1-page PDF (`355_schulden_zh_2020_def.pdf`, 54,514 bytes, HTTP 200, no
> login/CAPTCHA/WAF gate, confirmed via `pdfjs-dist` to carry zero AcroForm
> widgets), fetched from the same `zh.ch` tax-forms listing as its sibling
> schedules. Like the Liegenschaftenverzeichnis, this form is hosted at a
> **year-independent** URL path and carries its own filer-entered "Jahr"
> (tax year) box. A text-extraction artifact — each of the 30 table rows'
> two money columns returning an identical repeating digit string instead
> of a per-row code — was confirmed by rendering the page to PNG to be a
> decorative digit-entry-box glyph, not a real per-row reference code; this
> table carries no per-row codes at all, only the two headline Total boxes
> (3200, 3201). The Kantonales Steueramt's own Wegleitung (pp.37-38) was
> fetched and its worked household specimen rendered to PNG, confirming a
> CHF 8'000 debt-interest figure entered identically in both the
> Staatssteuer and Bundessteuer columns (the evidentiary basis for this
> schema's `totalPrivateDebtInterest` field description) and a CHF 750'000
> debt total — used only as an order-of-magnitude plausibility check, since
> (as with Berufsauslagen/Aus- und Weiterbildung/Liegenschaftenverzeichnis)
> no dedicated worked specimen of this form's own per-creditor rows exists
> in the Wegleitung. The 30-row creditor table is collapsed to one free-text
> field per this registry's established treatment of unbounded repeating
> tables; unlike its Wertschriften/Liegenschaften siblings, no continuation-
> sheet field is modelled since no source examined references one. Modelled
> 7 fields across 3 `steps`. This remains Switzerland's 2nd of 6 verticals
> (DMV, Taxes) — a companion schedule, not a new vertical — but further
> deepens Taxes-vertical coverage, leaving Hilfsblatt A/B/G as the sole
> remaining companion-schedule gap (now understood as three separate future
> sub-cycle candidates). See
> `registry/ch/zh/sta/schuldenverzeichnis/1.0.0/VERIFICATION.md` for the
> full sourcing record, every disclosed scope decision, and the worked
> mock-data example.

> **Update (2026-07-09, GOV-1889): canton Zürich's Liegenschaftenverzeichnis**
> (real-estate register) schedule is now published, with
> `ch/zh/sta/liegenschaftenverzeichnis` — the Kantonales Steueramt Zürich's
> "Liegenschaftenverzeichnis" (Form 350), the sixth companion schedule to
> `ch/zh/sta/steuererklaerung-natuerliche-personen` (GOV-1847), used by a
> taxpayer who owns or holds a usufruct right over one or more properties to
> declare each property's location/type, its two official assessed tax
> values (an agricultural/forestry Ertragswert, or a Verkehrswert for every
> other property), its imputed rental value and/or actual rent income, its
> deductible maintenance costs, and the resulting net income — referenced by
> the main return's own Ziffer 6 (line 188) and Ziffer 31.1/31.2 (lines
> 421/422). This picks the strongest remaining candidate off the open list
> GOV-1882 left behind (Liegenschaftenverzeichnis, Schuldenverzeichnis,
> Hilfsblatt A/B/G). Sourced from a genuine, current, unauthenticated, flat
> (non-AcroForm) 2-page PDF (`350 Liegensch ZH 2025 HA DEF.pdf`, 71,322
> bytes, HTTP 200, no login/CAPTCHA/WAF gate, confirmed via
> `pdfjs-dist`/`pdf-lib` to carry zero AcroForm widgets across both pages).
> Unlike its four sibling companion schedules, this form is hosted at a
> **year-independent** URL path (`jahrunabhaengig/`, not the yearly `2025/`
> path) and carries its own filer-entered "Jahr" (tax year) box rather than a
> year printed in its cover title — modelled as a dedicated required
> `taxYear` field, unique among the five CH-ZH companion schedules. The
> Kantonales Steueramt's own Wegleitung (pp.28-30) was fetched and
> cross-checked, confirming both Steuerwert figures are, in the ordinary
> case, transfer values from the Gemeindesteueramt's own property-valuation
> notice rather than filer-computed, and confirming that a multi-family/
> business building's own capitalization-formula-derived assessed value
> (`Bruttojahresertrag x 100 / 7.05`) transfers into the Verkehrswert column/
> Ziffer 31.1, not the Ertragswert/Land-oder-Forstwirtschaft column/Ziffer
> 31.2, which is reserved strictly for genuinely agricultural/forestry-
> classified land. Unlike Berufsauslagen and Versicherungsprämien, no
> official worked specimen of this exact form's own per-property line items
> exists in the Wegleitung — a disclosed negative finding, the same class of
> finding the Aus- und Weiterbildung cycle (GOV-1882) made for Form 367 —
> so this schema's worked mock-data example was constructed and
> hand-recomputed independently instead. The 10-property repeating table
> (spanning both of the form's pages, linked by property number) is
> collapsed to one free-text field per this registry's established
> treatment of unbounded repeating tables. Modelled 12 fields (3
> `documents[]` entries) across 3 `steps`. This remains Switzerland's 2nd of
> 6 verticals (DMV, Taxes) — a companion schedule, not a new vertical — but
> further deepens Taxes-vertical coverage, leaving two companion schedules
> open (Schuldenverzeichnis, Hilfsblatt A/B/G). See
> `registry/ch/zh/sta/liegenschaftenverzeichnis/1.0.0/VERIFICATION.md` for
> the full sourcing record, every disclosed scope decision, and the worked
> mock-data example.

> **Update (2026-07-09, GOV-1882): canton Zürich's Berufsorientierte Aus-
> und Weiterbildungskosten** (career-oriented further-education and training
> costs deduction) schedule is now published, with
> `ch/zh/sta/aus-und-weiterbildungskosten` — the Kantonales Steueramt
> Zürich's "Berufsorientierte Aus- und Weiterbildungskosten 2025" (Form 367),
> the fifth companion schedule to `ch/zh/sta/steuererklaerung-natuerliche-personen`
> (GOV-1847), used to compute the deductible further-education/training/
> retraining costs referenced by the main return's own Ziffer 16.2 (line
> 292). This picks the strongest remaining candidate off the open list
> GOV-1875 left behind (Aus- und Weiterbildung, Liegenschaftenverzeichnis,
> Schuldenverzeichnis, Hilfsblatt A/B/G). Sourced from a genuine, current,
> unauthenticated, flat (non-AcroForm) 1-page PDF (`367 Aus- und
> Weiterbildung ZH 2025 HA DEF.pdf`, 46,013 bytes, HTTP 200, no
> login/CAPTCHA/WAF gate, confirmed via `pdfjs-dist`/`pdf-lib` to carry zero
> AcroForm widgets), fetched from the same `zh.ch` tax-forms listing as the
> main return and its four other companion schedules. Unlike the main
> return, this form prints both statutory caps it depends on (CHF 12'400
> state-tax, CHF 13'000 federal-tax, applied individually "je" — "each" — to
> Person 1 and Person 2) directly on its own single page; the Kantonales
> Steueramt's own Wegleitung was still fetched and cross-checked, confirming
> the same two caps in prose. Unlike the two prior companion-schedule cycles
> (Berufsauslagen GOV-1868, Versicherungsprämien GOV-1875), which each found
> their own form's official worked specimen on Wegleitung PDF page 36, this
> cycle found no such specimen for Form 367: PDF page 16 carries only a
> blank reference facsimile of this exact form, and a coordinate-level
> re-check of the Wegleitung's own worked specimen of the main return's page
> 3 (PDF page 37) confirms its line 292 (this schedule's own transfer line)
> is deliberately left blank — the Muster-Meister household in that official
> specimen claimed no further-education deduction. Per the issue's own
> contingency instruction, this cycle instead sourced the cap/logic directly
> from the form's own printed text and the Wegleitung's prose, and
> constructed and hand-recomputed its own worked mock-data example rather
> than matching an official specimen. Modelled 16 fields (0 `documents[]`
> entries) across 3 `steps`. This remains Switzerland's 2nd of 6 verticals
> (DMV, Taxes) — a companion schedule, not a new vertical — but further
> deepens Taxes-vertical coverage, leaving three companion schedules open.
> See `registry/ch/zh/sta/aus-und-weiterbildungskosten/1.0.0/VERIFICATION.md`
> for the full sourcing record, every disclosed scope decision, and a worked
> mock-data example.

> **Update (2026-07-09, GOV-1875): canton Zürich's Versicherungsprämien**
> (insurance-premiums and savings-interest deduction) schedule is now
> published, with `ch/zh/sta/versicherungspraemien` — the Kantonales
> Steueramt Zürich's "Versicherungsprämien 2025" (Form 365), the fourth
> companion schedule to `ch/zh/sta/steuererklaerung-natuerliche-personen`
> (GOV-1847), used to compute the deductible insurance premiums and savings
> interest referenced by the main return's own Ziffer 15 (line 270). This
> picks the strongest remaining candidate off the open list GOV-1868/GOV-1871
> left behind (Versicherungsprämien, Aus- und Weiterbildung,
> Liegenschaftenverzeichnis, Schuldenverzeichnis, Hilfsblatt A/B/G): nearly
> every Swiss resident carries mandatory basic health insurance, making this
> schedule likely broader-reaching than either prior companion schedule.
> Sourced from a genuine, current, unauthenticated, flat (non-AcroForm)
> 1-page PDF (`365 Versicherung ZH 2025 HA DEF.pdf`, 56,091 bytes, HTTP 200,
> no login/CAPTCHA/WAF gate, confirmed via `pdfjs-dist`/`pdf-lib` to carry
> zero AcroForm widgets), fetched from the same `zh.ch` tax-forms listing as
> the main return and its other companion schedules. Unlike the main return,
> this form prints every statutory rate it depends on directly on its own
> single page; the Kantonales Steueramt's own Wegleitung was still fetched
> and cross-checked, and its PDF page 36 — the same page that carries the
> Berufsauslagen worked specimen GOV-1868 used — carries an official worked
> specimen of this exact form, cross-checked arithmetically (subtotal,
> total, per-child deduction, maximum-deduction total, and final
> lower-of-A-or-B figure all independently recomputed and matched) before
> any field name was assigned. The two discrete statutory lookup values
> printed for each marital-status bracket are modelled with
> `validation.enum` rather than `minimum`/`maximum`, since the form permits
> only those two exact figures, not a continuous range. Modelled 26 fields
> (0 `documents[]` entries) across 4 `steps`. This remains Switzerland's 2nd
> of 6 verticals (DMV, Taxes) — a companion schedule, not a new vertical —
> but further deepens Taxes-vertical coverage, leaving four companion
> schedules open. See
> `registry/ch/zh/sta/versicherungspraemien/1.0.0/VERIFICATION.md` for the
> full sourcing record, every disclosed scope decision, and a worked
> mock-data example.

> **Update (2026-07-08, GOV-1868): canton Zürich's Berufsauslagen**
> (professional/work-related expense deductions) schedule is now published,
> with `ch/zh/sta/berufsauslagen` — the Kantonales Steueramt Zürich's
> "Berufsauslagen 2025," the third companion schedule to
> `ch/zh/sta/steuererklaerung-natuerliche-personen` (GOV-1847), used by an
> employed taxpayer to compute the deductible work-related expenses
> referenced by the main return's own Ziffer 11.1/11.2. This picks the
> strongest remaining candidate off the open list GOV-1854 left behind
> (Berufsauslagen, Versicherungsprämien, Aus- und Weiterbildung,
> Liegenschaftenverzeichnis, Schuldenverzeichnis, Hilfsblatt A/B/G): unlike
> the securities schedule closed last cycle, which only applies to filers who
> hold investments, professional-expense deductions are claimed by nearly
> every salaried filer. Sourced from a genuine, current, unauthenticated,
> flat (non-AcroForm) 2-page PDF (`360 Berufsauslagen ZH 2025 HA DEF.pdf`,
> HTTP 200, no login/CAPTCHA/WAF gate, confirmed via `pdfjs-dist`/`pdf-lib` to
> carry zero AcroForm widgets), fetched from the same `zh.ch` tax-forms
> listing as the main return and the Wertschriftenverzeichnis. Unlike the
> main return, this form prints every statutory rate/cap it depends on
> directly on its own two pages; the Kantonales Steueramt's own Wegleitung
> was still fetched and cross-checked to confirm no further cap applied to
> the one line the form itself defers to it, and its p.36 carries an
> official worked specimen of this exact form, rendered to PNG and visually
> cross-checked against this schema's own field layout before any field name
> was assigned. The two-row private-vehicle commuting worksheet is collapsed
> into one free-text field per person, consistent with this registry's
> established treatment of unbounded repeating tables under GovSchema v0.3's
> flat field model. Modelled 74 fields (4 `documents[]` entries) across 7
> `steps`. This remains Switzerland's 2nd of 6 verticals (DMV, Taxes) — a
> companion schedule, not a new vertical — but further deepens Taxes-vertical
> coverage, leaving five companion schedules open. See
> `registry/ch/zh/sta/berufsauslagen/1.0.0/VERIFICATION.md` for the full
> sourcing record, every disclosed scope decision, and a worked mock-data
> example.

> **Update (2026-07-08, GOV-1861): Spain's Visa vertical** is now
> published, with `es/maec/solicitud-visado-nacional` — the Ministerio de
> Asuntos Exteriores, Unión Europea y Cooperación's (MAEC) "Solicitud de
> visado nacional," Spain's national (long-stay, Type D) visa application,
> the vertical CATALOG.md's own "Known Gaps" section had explicitly flagged
> as "an open, unscreened backlog candidate for a future cycle." A prior
> cycle (GOV-1652) had in fact already screened this same form and
> characterized it as a field-for-field duplicate of the already-modelled
> `de/auswaertiges-amt/national-visa-application`; this cycle re-did that
> comparison from scratch — re-fetching and re-extracting both the German
> source PDF and Spain's own form directly rather than trusting the prior
> note — and found the two forms diverge sharply past their shared ~9-item
> Schengen-harmonized identity block. Germany's own form has an extensive
> spouse/children/unconditional-parents/prior-Germany-stays/accommodation/
> health/criminal-history structure with no Spanish counterpart; Spain's own
> form has its own 12-category residence-purpose taxonomy (family
> reunification, employment, self-employment, seasonal work,
> investor/entrepreneur, study, internship, research, residence recovery,
> accreditation) plus three purpose-conditional data blocks (a
> family-reunification sponsor block with the sponsor's own NIE/DNI, an
> employer/company block with the company's own CIF tax ID, and an
> educational-establishment block) with no German counterpart at all.
> Sourced from a genuine, current, unauthenticated AcroForm PDF (110
> widgets across 4 pages, mostly descriptive Spanish field names),
> cross-checked against a December-2025-dated mirror on Spain's unified
> public-administration portal (`one.gob.es`) to confirm currency. Spain's
> own Schengen (Type C) short-stay visa form was separately checked and
> reconfirmed a genuine duplicate of `fr/france-visas/schengen-visa-application`
> (matching the established pattern already found for Poland's, Portugal's,
> Czechia's, and Switzerland's own Schengen forms) — not authored. Modelled
> 60 fields (7 `documents[]` entries) across 10 `steps`. This gives Spain
> **5 of its 6 verticals** (DMV, Business Formation, Taxes, National ID,
> Visa); Passport remains a confirmed dead end (Policía Nacional's
> DNI/passport channel is appointment-only, no downloadable form). See
> `registry/es/maec/solicitud-visado-nacional/1.0.0/VERIFICATION.md` for the
> full field-by-field duplicate-detection comparison, sourcing record, and a
> worked mock-data example.

> **Update (2026-07-08, GOV-1854): canton Zürich's Wertschriftenverzeichnis**
> (securities and holdings inventory) is now published, with
> `ch/zh/sta/wertschriften-und-guthabenverzeichnis` — the Kantonales
> Steueramt Zürich's "Wertschriften- und Guthabenverzeichnis 2025 mit
> Verrechnungsantrag," the companion schedule to
> `ch/zh/sta/steuererklaerung-natuerliche-personen` (GOV-1847) used to
> itemize every security/account/claim held during the tax year and to claim
> a refund of Switzerland's 35% federal withholding tax (Verrechnungssteuer)
> deducted at source on domestic investment income. This closes the specific
> gap GOV-1847 flagged by name as "likely the strongest follow-up
> candidate ... the most commonly-populated companion schedule." Sourced
> from a genuine, current, unauthenticated, flat (non-AcroForm) 4-page PDF
> (`340 WV ZH 2025 HA DEF.pdf`, HTTP 200, no login/CAPTCHA/WAF gate,
> confirmed via `pdfjs-dist`/`pdf-lib` to carry zero AcroForm widgets),
> fetched from the same `zh.ch` tax-forms listing as the main return.
> Because the totals block packs several box-reference numbers into a dense
> three-column layout that a text-only extraction cannot reliably
> disambiguate, pages were additionally rendered to PNG (`pdfjs-dist` +
> `node-canvas`) and visually cross-checked before field names were
> assigned. The 24-row itemized holdings table is collapsed into one
> free-text field, consistent with this registry's established treatment of
> unbounded repeating tables under GovSchema v0.3's flat field model;
> Beiblatt 1/2 (continuation sheets) and Form DA-1 (foreign-withholding
> relief) are represented only as gated pass-through transfer totals, not
> modelled in their own right. This remains Switzerland's 2nd of 6
> verticals (DMV, Taxes) — a companion schedule, not a new vertical — but
> materially deepens Taxes-vertical coverage. See
> `registry/ch/zh/sta/wertschriften-und-guthabenverzeichnis/1.0.0/VERIFICATION.md`
> for the full sourcing record, every disclosed scope decision, and a worked
> mock-data example.

> **Update (2026-07-08, GOV-1847): Switzerland's Taxes vertical** is now
> published, with `ch/zh/sta/steuererklaerung-natuerliche-personen` — the
> Kantonales Steueramt Zürich's "Steuererklärung 2025 für natürliche
> Personen," the canton of Zürich's annual personal income and wealth tax
> return covering both cantonal/communal tax and direct federal tax in one
> filing. This closes the lead the prior CH cycle (GOV-1840) had explicitly
> flagged as a genuinely strong, deferred candidate: a genuine, current,
> unauthenticated, flat (non-AcroForm) 4-page main-declaration PDF (`300 STE
> ZH 2025 HA DEF.pdf`, HTTP 200, no login/CAPTCHA/WAF gate, confirmed via
> `pdfjs-dist`/`pdf-lib` to carry zero AcroForm widgets), cross-checked
> field-by-field against the Kantonales Steueramt's own 40-page "Wegleitung
> zur Steuererklärung 2025" instruction guide, which supplies several
> statutory caps/rates (pillar-3a contribution limits, the childcare-cost
> cap, the donation ceiling, the medical-cost floor) the return itself does
> not print. Modelled 122 fields (18 `documents[]` entries) across 7
> `steps`, scoped to the main declaration only — deliberately excluding
> seven companion schedules the form references by name (securities/
> holdings inventory, professional expenses, insurance premiums, further
> education, real-estate register, debts register, self-employment
> worksheets) and every pure computed/arithmetic or capped-derivative line.
> This gives Switzerland **2 of its 6 verticals** (DMV, Taxes); Visa,
> Passport, Business Formation, and National ID remain confirmed dead ends
> per GOV-1840. See
> `registry/ch/zh/sta/steuererklaerung-natuerliche-personen/1.0.0/VERIFICATION.md`
> for the full sourcing record, every disclosed scope decision, and a worked
> mock-data example.

> **Update (2026-07-08, GOV-1840): Switzerland opens as the registry's 27th
> jurisdiction**, with a DMV schema:
> `ch/sg/stva/gesuch-lernfahr-fuehrerausweis` — the canton of St.Gallen's
> Strassenverkehrs- und Schifffahrtsamt's (StVA) "Gesuch um Erteilung eines
> Lernfahr- bzw. eines Führerausweises" (learner's-permit/driving-licence
> application), a genuine, current, unauthenticated 63-field AcroForm PDF.
> Switzerland has no single federal driving-licence application form: ASTRA
> (the federal roads office) sets the substantive legal framework (the
> Verkehrszulassungsverordnung, VZV) but each of the 26 cantons
> independently publishes its own PDF implementation; this cycle
> cross-checked St.Gallen's version against three further cantons' own
> independently-authored PDFs (Solothurn, Appenzell Ausserrhoden, and an
> encrypted Zürich copy that could not be cleanly extracted) and confirmed a
> materially identical section structure across all of them, corroborating
> this as a nationwide VZV-derived questionnaire rather than a
> St.Gallen-only idiosyncrasy. This cycle also re-confirmed Switzerland's
> Visa (GOV-1774) and domestic Passport dead ends, newly confirmed National
> ID as a dead end (same fedpol.admin.ch online-application-plus-biometric
> pathway as Passport), confirmed Business Formation
> (`easygov.swiss`, an authenticated SwissID-gated wizard with no
> downloadable form) as a dead end, and flagged Taxes (canton Zürich's own
> current, unauthenticated, flat "Steuererklärung 2025" main-declaration
> PDF) as a strong, unpursued open backlog candidate for a future cycle. See
> `registry/ch/sg/stva/gesuch-lernfahr-fuehrerausweis/1.0.0/VERIFICATION.md`
> for the full candidate-screening record.

> **Update (2026-07-08, GOV-1833): Portugal's Passport vertical** is now
> published, with `pt/mne/requerimento-passaporte-consular` — the
> Ministério dos Negócios Estrangeiros' Consulado-Geral de Portugal no Rio
> de Janeiro's "Requerimento de Passaporte," a passport-specific consular
> intake form distinct from the already-published
> `pt/mne/requerimento-cartao-cidadao-passaporte-consular` (São Paulo's
> Cartão de Cidadão-centric form, filed under National ID). This closes the
> lead GOV-1797's own VERIFICATION.md had explicitly flagged as an
> unscreened backlog candidate: whether a genuinely distinct, passport-only
> consular form exists beyond the CC-centric ones already examined. Found at
> the Rio de Janeiro consulate — a flat, single-page, self-documenting PDF
> with zero AcroForm/XFA widgets (confirmed via `pdfjs-dist`), modelled from
> its cleanly legible printed text layer alone via coordinate-sorted
> line reconstruction. Modelled 25 fields (1 `documents[]` entry) across 7
> `steps`. This gives Portugal **5 of its 6 verticals** (DMV, Passport,
> Taxes, Visa, National ID); Business Formation remains a confirmed dead end
> (IRN's pacto-social specimens are scanned images with no text layer; the
> sole-trader route is a fully authenticated `acesso.gov.pt` wizard with no
> PDF fallback). See
> `registry/pt/mne/requerimento-passaporte-consular/1.0.0/VERIFICATION.md`
> for the full sourcing record and every disclosed judgment call.

> **Update (2026-07-08, GOV-1826): Czech Republic's 4th vertical (Taxes)** is
> now published, with `cz/mf/priznani-k-dani-z-prijmu-fyzickych-osob` — the
> Ministerstvo financí's (operated by Finanční správa České republiky)
> "Přiznání k dani z příjmů fyzických osob" (form 25 5405, MFin 5405, vzor č.
> 30), the annual personal income tax return under zákon č. 586/1992 Sb.,
> scoped to the base four-page return for an employment/pension-income filer
> (§6/§8 zákona), read together with its own field-by-field "Pokyny"
> instructions (vzor č. 34). This was the strong, larger-scope Taxes
> candidate the prior cycle (GOV-1819) had flagged and set aside; both PDFs
> were re-fetched fresh (no login/CAPTCHA/WAF gate) and, unlike that cycle's
> visa-form PDF, extracted cleanly via `pdfjs-dist` with zero AcroForm
> widgets (a flat print/reference facsimile, filed on paper or via the
> authenticated `www.mojedane.cz` portal). Scoped to the base return only,
> excluding its four annexes (Příloha č. 1-4, covering self-employment,
> rental/other, foreign-source, and separate-tax-base income respectively,
> each a distinct larger PDF left as an open backlog candidate) and every
> pure computed/arithmetic line, consistent with this registry's established
> treatment of income-tax schemas elsewhere (e.g.
> `pt/at/declaracao-rendimentos-irs-modelo-3`, `cl/sii/formulario-22`).
> Modelled 88 fields (11 `documents[]` entries) across 12 `steps`. This gives
> the Czech Republic its **4th of 6 verticals** (Business Formation, DMV,
> Visa, Taxes); Passport and National ID remain confirmed dead ends
> (GOV-1819). See `registry/cz/mf/priznani-k-dani-z-prijmu-fyzickych-osob/1.0.0/VERIFICATION.md`
> for the full sourcing record and every disclosed scope decision.

> **Update (2026-07-08, GOV-1819): Czech Republic's 3rd vertical (Visa)** is
> now published, with `cz/mzv/zadost-o-udeleni-dlouhodobeho-viza` — the
> Ministry of Foreign Affairs' (Ministerstvo zahraničních věcí, MZV) bilingual
> "Žádost o udělení dlouhodobého víza" / "Application for long-stay visa"
> (form ŘSCP č. 1/2010), the national (category D) long-stay visa application
> submitted at a Czech embassy or consulate. This cycle screened all four of
> the Czech Republic's remaining gaps (Passport, Taxes, Visa, National ID):
> Passport and National ID are confirmed dead ends (both `mv.gov.cz` and
> `portal.gov.cz` state explicitly that citizens do not complete a printed
> application form for either process — an office clerk enters the data
> directly and captures biometrics in person); Taxes has a strong candidate
> (`financnisprava.gov.cz`'s Form 25 5405 plus its own field-by-field
> "Pokyny" instructions guide) left as an open, larger-scope backlog item for
> a future cycle. This form's PDF uses a custom font encoding with no
> ToUnicode CMap (the text layer is unreadable by direct extraction, a
> distinct failure mode from this registry's more common zero-AcroForm flat
> PDFs), so every field was read from a high-resolution page render and
> cross-checked twice. Per this registry's established duplicate-detection
> convention (Poland's, Spain's, Portugal's, and Switzerland's national
> D-visa forms all turned out to be field-for-field duplicates of
> `de/auswaertiges-amt/national-visa-application`), this form's full field
> sequence was compared against that German template: it shares only the
> opening Schengen-harmonized identity-block numbering, then diverges with
> an unconditional parents block, a distinct "employer after entry" field, a
> structured "previous stay in the Czech Republic longer than 3 months"
> block, a Czech-specific "Executive manager" purpose option citing Act
> No. 513/1991 Coll. (the Czech Commercial Code) verbatim, and a fully
> structured inviting-person/company block — a genuinely distinct national
> form, not a duplicate. The Czech Republic's own companion Schengen
> short-stay visa form was also checked and confirmed a duplicate of
> `fr/france-visas/schengen-visa-application`, per the same established
> convention; not authored. Modelled 89 fields (11 `documents[]` entries,
> including a single combined 8-point bilingual declaration/consent
> attestation, since this form places all eight points above one shared
> signature line rather than two independently-signed blocks as Germany's
> does) and 2 `crossFieldValidation` rules. This gives the Czech Republic
> **3 of its 6 verticals** (Business Formation, DMV, Visa); Passport, Taxes,
> and National ID remain open backlog candidates for a future cycle (Taxes
> being the strongest of the three). See the document's own VERIFICATION.md
> for the full extraction method and every disclosed judgment call.

> **Update (2026-07-08, GOV-1804): Czech Republic's 2nd vertical (DMV)** is
> now published, with `cz/md/zadost-o-zapis-silnicniho-vozidla` — the
> Ministerstvo dopravy's (MD, Ministry of Transport) "Žádost o zápis
> silničního vozidla do registru silničních vozidel," the application by
> which a vehicle's owner (and, where different, its operator/holder)
> request entry into the Register of Road Vehicles (registr silničních
> vozidel), filed with the applicant's locally competent municipal
> authority with extended jurisdiction (obecní úřad obce s rozšířenou
> působností). This is a follow-up cycle to GOV-1807's opening of the Czech
> Republic (26th jurisdiction) with a single Business Formation schema,
> continuing this registry's established pattern of building out a
> newly-opened jurisdiction's remaining verticals (the same sequencing
> Malaysia's `my/jpj` → `my/jim` (Passport) → `my/jim` (Visa) used). Unlike
> most of this registry's recent Czech/Polish/Malaysian print-layout PDF
> finds, this form carries a genuine 57-field AcroForm layer, confirmed by
> two independent extraction passes (`pdfjs-dist`'s per-page
> `getAnnotations()` and a separate `pdf-lib` `form.getFields()` pass both
> report exactly 57 fields, so — unlike GOV-1801's `pt/mne` PDF — no
> orphaned/duplicate Widgets needed reconciling). Because several of the
> form's comb-style ID-number boxes and its operator-name block visually
> run together or print no visible line at all, this cycle also rendered
> both pages to PNG (`pdfjs-dist` + `node-canvas`) and visually
> cross-checked every widget rectangle against the rendered page — this
> resolved a 3-widget rodné-číslo/IČO row into two logical fields (a
> 6-digit + 4-digit comb pair forming one `ownerPersonalIdNumber`, plus a
> separate 8-digit IČO field) and confirmed a two-line operator-name block
> as a single logical field. Modelled 39 fields (including two
> `exclusivityGroups` — one for 10 independent vehicle-color checkboxes,
> one for 4 independent vehicle-purpose checkboxes, both modelled as
> separate boolean fields rather than collapsed into an enum, since the
> source PDF defines each checkbox as its own independently-named `/Btn`
> field rather than a shared radio group) and 9 `documents[]` entries,
> explicitly excluding the form's own office-only sections (an authority
> -assigned plate-number box, and the entire p.2 "confirmation of documents
> received" and administrative-fee-receipt blocks, both completed by
> issuing-office staff, not the applicant). This gives the Czech Republic
> **2 of its 6 verticals** (Business Formation, DMV); Passport, Taxes, Visa,
> and National ID remain open backlog candidates for a future cycle. See
> the document's own VERIFICATION.md for the full extraction method and
> every disclosed judgment call.

> **Update (2026-07-08, GOV-1804): Czech Republic opens as the registry's
> 26th jurisdiction**, with
> `cz/mpo/jednotny-registracni-formular-fyzicka-osoba` — the Ministerstvo
> průmyslu a obchodu's (MPO, Ministry of Industry and Trade) Jednotný
> registrační formulář (JRF, Unified Registration Form) for a natural person
> (fyzická osoba), form "MPO FO – vzor č. 14 (240101)". A single JRF filing
> reports a trade-licence registration or concession application under Act
> No. 455/1991 Sb. to the applicant's locally competent Trade Licensing
> Office (živnostenský úřad) and, at the applicant's election in the form's
> own Part E, simultaneously routes the same filing to the Czech Social
> Security Administration (ČSSZ), the applicant's health-insurance company,
> and/or the Tax Office. This cycle's brief recommended screening several
> strong digital-government candidates for a 26th jurisdiction ahead of
> re-treading this registry's long list of already-confirmed-dead gaps in
> the existing 25; Austria's regional Gewerbeanmeldung (trade-registration)
> forms and Sweden's Skatteverket/Transportstyrelsen forms were identified
> by search as promising leads but could not be reached at all from this
> cycle's research environment (`tirol.gv.at` and `skatteverket.se` both
> failed at the TCP level — connection timeout/reset, not a WAF/CAPTCHA
> page — while `web.archive.org` and `mpo.gov.cz` were both reachable
> directly), and Switzerland's domestic passport process was confirmed to be
> a cantonal, appointment/counter-based service with no downloadable
> application PDF. The Czech Republic was picked because `mpo.gov.cz`
> responded normally to a direct fetch: a genuine, current, unauthenticated
> PDF with no login/CAPTCHA/WAF gate, still linked from MPO's own current JRF
> landing page alongside a 2025-dated field-by-field instruction guide
> ("Pokyny"). The PDF carries zero AcroForm/XFA widgets (a static
> print/hand-fill template, the same shape as this registry's Polish
> CEIDG-1/PIT-37 and Malaysian JIM/JPJ sources) but a fully self-documenting
> numbered layout — 11 numbered sections across Parts A-G, resolved via a
> y/x-coordinate-sorted re-render of `pdfjs-dist`'s text content after a
> first linear-text pass scrambled the form's multi-column layout. Modelled
> 116 fields and 7 `documents[]` entries, scoped to only the fyzická osoba
> (natural-person/sole-trader) variant of the JRF — MPO separately publishes
> a distinct legal-entity (právnická osoba) JRF and a separate
> change-of-registration (ZL) form, both out of scope. This opens the Czech
> Republic with **1 of its 6 verticals** (Business Formation); its other five
> (Passport, DMV, Taxes, Visa, National ID) are open, unscreened backlog
> candidates for a future cycle. Austria's and Sweden's connectivity-blocked
> candidates above remain untested (not confirmed dead) for a future cycle
> with different network access, possibly via the Wayback Machine workaround
> this registry has used for similarly-blocked sources elsewhere. See the
> document's own VERIFICATION.md for the full candidate comparison and every
> disclosed judgment call. **Austria's own Gewerbeanmeldung candidate has
> since opened as a full jurisdiction (GOV-2107)** — see the Executive
> Summary update above; the `tirol.gv.at` symptom noted here turned out to be
> a narrow regional/host-specific network gap, not a blanket Austrian block
> (federal `usp.gv.at`/`oesterreich.gv.at` were reachable in that later
> session; a second federal host, `bmaw.gv.at`, timed out identically to
> `tirol.gv.at`, confirming the pattern is host-specific rather than
> country-wide). Sweden's Skatteverket/Transportstyrelsen candidates have
> also since opened (GOV-2056, GOV-2063, GOV-2091).

> **Update (2026-07-08, GOV-1797): Portugal's National ID gap closes**, with
> `pt/mne/requerimento-cartao-cidadao-passaporte-consular` — the
> Consulado-Geral de Portugal em São Paulo's "Requerimento de Atos
> Presenciais — Cartão do Cidadão e/ou Passaporte," the in-person-appointment
> request form filed with this consular post (a subordinate body of the
> Ministério dos Negócios Estrangeiros, MNE) to request a Cartão de Cidadão,
> a passport, or both. This is a follow-up cycle re-screening Portugal's
> three remaining open verticals (Business Formation, Passport, National ID)
> after GOV-1750's opening cycle gave each only a light pass. Business
> Formation and Passport were re-confirmed dead ends (IRN's "Empresa na
> Hora"/"Empresa Online" specimens remain scanned images; domestic passport
> issuance remains in-person/biometric-only per Decreto-Lei n.º 83/2000 Art.
> 16, with no distinct citizen-facing application PDF found). National ID's
> consular-PDF lead — flagged by GOV-1750 as found but not pursued — was
> followed up directly: the Rio de Janeiro consulate's `req_cc.pdf` (the PDF
> GOV-1750 had examined) was re-confirmed to carry zero AcroForm widgets (a
> flat print facsimile), but a further search surfaced the São Paulo
> consulate's own `cc_e_pep_formulario.pdf`, which carries a genuine
> 45-unique-position AcroForm widget layer (2 radio groups, 1 checkbox, 26
> text fields; every widget rect independently confirmed via `pdfjs-dist`,
> and every field-to-label mapping cross-checked against a full-page
> Chromium/pdfjs render since this PDF's own text layer is unusually sparse)
> — a genuine, currently-linked, unauthenticated fillable form, the
> strongest National ID candidate found for Portugal to date. The consulate's
> own domain (`saopaulo.consuladoportugal.mne.gov.pt`) could not be reached
> directly from this cycle's environment (a TLS-handshake reset on every
> path, consistent with an IP/ASN-level WAF block, not a dead resource); the
> PDF was instead retrieved via its most recent Wayback Machine snapshot
> (2025-12-08), per this registry's established workaround for
> similarly-blocked sources. Modelled 29 fields (28 with a real widget, plus
> a closing signature-block date modelled from a printed but widget-less
> blank line) and 2 `documents[]` entries, scoped explicitly to this one
> consular post's own published document — other Portuguese consulates
> publish their own, differently structured versions of the same underlying
> process, and this schema does not claim to represent a unified national
> MNE standard. This gives Portugal **4 of its 6 verticals** (DMV, Visa,
> Taxes, National ID); Business Formation and Passport remain open backlog
> candidates. See the document's own VERIFICATION.md for the full
> three-vertical candidate comparison, field-by-field sourcing, and every
> disclosed scope decision.

> **Update (2026-07-08, GOV-1789): Malaysia's 3rd vertical (Visa)** is now
> published, with `my/jim/visa-with-reference-application` — the Jabatan
> Imigresen Malaysia's (JIM, Immigration Department of Malaysia) "Borang
> Permohonan Pas Lawatan" (Visit Pass Application Form, IM.12), submitted
> together with the companion Form Imm.38 ("Application For Visa") as the
> intake form for a Visa With Reference (VDR) — a visa a Malaysian
> Representative Office abroad issues to a non-citizen so they may enter
> Malaysia once the Immigration Department Headquarters approves it.
> Screened first: Malaysia's eVISA portal (`malaysiavisa.imi.gov.my`), an
> Angular SPA whose `/evisa/apply/vdr/personal-detail` route serves only an
> app shell requiring an authenticated session/token to reach any real
> field screen — login-gated, rejected; eNTRI (`windowmalaysia.my`),
> which requires account registration before any field is visible —
> rejected; and JIM's own legacy `portal2017/images/borang/` subsite, whose
> Visa PDF links are still referenced from the current "Forms Download"
> page but every one 404s/500s on direct fetch, with the Wayback CDX API
> confirming HTTP 404 in every snapshot since 2022-08 — a stale link, not a
> genuine source. Spain's Policía Nacional DNI/passport channel and
> Chile's Passport/Visa/National ID candidates were re-confirmed still dead
> ends from prior cycles (login/CAPTCHA/appointment-gated, no downloadable
> field-level form) and not re-attempted. IM.12 was picked instead: a
> genuine, unauthenticated, directly downloadable, currently-served PDF
> (confirmed live this cycle, HTTP 200, 770,958 bytes, an Adobe LiveCycle
> Designer XFA container with 0 AcroForm/XFA Widget annotations — a
> print-layout container, not fillable, but a self-documenting, numbered
> field-by-field form, the same shape as this registry's other JIM/JPJ
> Malaysian schemas). IM.12's own printed title names a "Pass," not a
> "Visa" — modelled under this registry's Visa vertical (there is no
> separate "Pass" vertical in GovSchema's 6-vertical taxonomy) because the
> form's own Section D, "KEPERLUAN VISA / VISA REQUIREMENT," asks whether a
> visa is required and, if so, single- or multiple-entry, and because JIM's
> own current VDR service page classifies this exact form as the required
> VDR intake form. Scope: JIM's VDR checklist page lists five applicant
> categories (A-E); this schema models only the four — A (wife of a
> Malaysian citizen), B (husband of a Malaysian citizen), D (India), E
> (China, Vietnam, North Korea, Cuba) — that submit Form Imm.12 together
> with Form Imm.38. Category C (Afghanistan) instead submits a different
> form, Form Imm.47, and is out of scope. Models 20 fields across the
> pass-type/application-type/VDR-category selectors, applicant
> particulars, travel-document particulars, sponsor particulars, and the
> visa-requirement section, plus 19 `documents[]` entries (identity
> document, photographs, the Form Imm.38 companion document cited without
> describing its contents — confirmed to be a single embedded raster image
> with no extractable text layer at all — and a set of category-gated
> supporting documents drawn from JIM's own VDR checklist, conditionally
> required via the shared `Condition` grammar). This gives Malaysia **3 of
> its 6 verticals (DMV, Passport, Visa)**; Business Formation (confirmed
> too thin, GOV-1774), Taxes, and National ID (both confirmed dead ends,
> GOV-1783) remain not further open work absent a genuinely new source.
> This also moves the **global Visa vertical to 17/25 (68%)**. See the
> document's own VERIFICATION.md for the full candidate comparison,
> field-by-field citations, and every disclosed scope decision (including
> the resolution of an item-16 numbering ambiguity flagged during
> research, confirmed absent from the source's own printed numbering).

> **Update (2026-07-08, GOV-1783): Malaysia's 2nd vertical (Passport)** is
> now published, with `my/jim/passport-travel-document-application` — the
> Jabatan Imigresen Malaysia's (JIM, Immigration Department of Malaysia)
> "Borang Permohonan Pasport / Dokumen Perjalanan" (IM.42), a single form
> covering first-time issuance, replacement (damage/pages-exhausted/expiry
> or loss), and child-photo-insertion requests across eight document types
> (the 64- and 32-page international passports, the Malaysia-Indonesia and
> Malaysia-Philippines border-crossing passports, the Brunei- and
> Singapore-restricted passports, the Restricted Travel Document, and the
> Emergency Certificate). Screened in the assigned order: LHDN's Borang
> BE/B/M/BT individual-return PDFs (Taxes) were all fetched directly and
> confirmed to carry an empty AcroForm `Fields[]` array in every category
> and year checked — every one is explicitly labelled "Contoh" (specimen)
> because resident-individual filing is mandatory e-Filing only via an
> authenticated SPA (`mytax.hasil.gov.my`); rejected as too thin, the same
> reasoning as GOV-1774's SSM Superform rejection. JPN's MyKad
> replacement/amendment service pages (National ID) were fetched directly
> and confirmed to describe an entirely in-person, counter-based, walk-in
> process with no downloadable or fillable form at all — only a prose
> "documents to bring" checklist; rejected as weaker than even a thin
> specimen. JIM's IM.42 was picked instead: a genuine, unauthenticated,
> directly downloadable, currently-served PDF (confirmed live this cycle,
> an Adobe LiveCycle Designer XFA container) still actively referenced by
> JIM's own current "Pasport Malaysia Antarabangsa" service page as the
> required application form for several eligibility categories. Like
> JPJ-L1 (GOV-1774), it carries no interactive field layer (0 XFA
> `<field>` elements — a print-layout container, not a fillable form), but
> is itself a self-documenting, numbered field-by-field form: 14 numbered
> items across six lettered sections (A-F). Models 19 fields across the
> application-reason/document-type selectors, applicant particulars,
> replacement-specific details (conditionally required via the shared
> `Condition` grammar), and the consent/declaration section, plus 7
> `documents[]` entries (identity document, applicant photograph, the
> previous document, a police report for loss, additional child
> photographs, the fee, and the form's own signed declaration). This gives
> Malaysia **2 of its 6 verticals (DMV, Passport)**; Business Formation
> (confirmed too thin, GOV-1774), Taxes, and National ID (both confirmed
> dead ends this cycle, above) are not further open work absent a
> genuinely new source; Visa remains the sole unscreened backlog
> candidate. This also moves the **global Passport vertical to 21/25
> (84%)**. See the document's own VERIFICATION.md for the full candidate
> comparison, field-by-field citations, and every disclosed scope decision.

> **Update (2026-07-08, GOV-1774): Malaysia opens as GovSchema's 25th
> jurisdiction**, via its DMV vertical, with
> `my/jpj/driving-licence-application` — the Jabatan Pengangkutan Jalan
> Malaysia's (JPJ, Malaysia's Road Transport Department) "Borang Permohonan
> Lesen Memandu" (JPJ-L1), a single form covering 21 distinct driving-licence
> transactions: new/renewal/add-class/copy/conversion across the Learner's
> Licence (Lesen Belajar Memandu), Probationary Licence (Lesen Percubaan),
> and full Driving Licence (Lesen Memandu) tiers, plus the International
> Driving Permit (Permit Memandu Antarabangsa). Three candidates were
> screened this cycle: Switzerland's national D-visa and short-stay Schengen
> C-visa forms (both fetched directly and run through `pdfjs-dist` — 71 and
> 108 AcroForm widgets respectively — but both confirmed to be field-for-
> field matches of already-covered EU/Schengen-harmonized templates: the
> Schengen C-visa form duplicates the uniform template behind this
> registry's `fr/.../schengen-visa` schema, and the D-visa form duplicates
> the same EU-model national-visa-application template already found
> duplicated by Poland's and Portugal's own national visa forms against
> `de/auswaertiges-amt/national-visa-application` — rejected as duplicate
> risk, not a genuine gap); and Malaysia's own SSM (Companies Commission)
> Companies Act 2016 s.14 "Superform" business-incorporation PDF (fetched
> directly, HTTP 200, but confirmed via `pdfjs-dist` to carry zero AcroForm
> fields and, on inspection, to be only a thin 2-page specimen printout of
> SSM's online MyCoID portal wizard — bare field labels with no field-by-
> field numbered instructions of the kind this registry's guide-document
> fallback precedent (AEAT Modelo 030/036, SII Formulario 22, CEIDG-1)
> requires — rejected as too thin to model responsibly). JPJ-L1 was picked
> instead: a genuine, unauthenticated, directly downloadable, currently-
> served PDF (confirmed live, `last-modified: 2022-04-22` unchanged) that,
> while itself carrying no AcroForm layer (confirmed via `pdfjs-dist`: 0
> widget annotations), is a self-documenting field-by-field guide document —
> its own page 2 ("PANDUAN MENGISI BORANG PERMOHONAN LESEN MEMANDU") numbers
> and explains every item on page 1 by section letter and item number,
> including two full code legends (a 21-code transaction-type legend and a
> 7-code applicant-category legend), the same guide-document source shape
> already proven for three prior schemas in this registry. Models 29 fields
> across the application-type selector, applicant identification, licence-
> class/conversion/copy details (each conditionally required via the shared
> `Condition` grammar, gated only where the source's own subheadings map
> unambiguously onto a specific code subset — two cases where the mapping
> was ambiguous were left ungated and disclosed instead, see the document's
> own VERIFICATION.md), and the six-item medical/court declaration, plus 4
> `documents[]` entries (identification document, photograph, the state fee,
> and the form's own signed declaration). This gives Malaysia **1 of its 6
> verticals (DMV)**; Business Formation, Passport, Taxes, Visa, and National
> ID remain open backlog candidates — Business Formation was screened this
> cycle and found too thin (above) but not exhaustively (SSM's own "Form A"
> sole-proprietorship form was searched for but no live, directly
> downloadable PDF was located, only third-party summaries); the other four
> verticals were not screened at all this cycle. This also moves the
> **global DMV vertical to 25/25 (100%)**, unchanged at full coverage since
> Portugal's own opening (GOV-1750). See the document's own VERIFICATION.md
> for the full candidate comparison, field-by-field citations, and every
> disclosed scope decision.

> **Update (2026-07-08, GOV-1765):** Portugal closes its Taxes gap with
> `pt/at/declaracao-rendimentos-irs-modelo-3` — the Autoridade Tributária e
> Aduaneira's (AT) Modelo 3, "Declaração de Rendimentos - IRS," Portugal's
> annual personal income tax return under art. 57.º do Código do IRS. This
> was the candidate GOV-1750's own opening cycle had already flagged as
> Portugal's strongest-sourced remaining Taxes candidate: "a genuine,
> current, rich PDF, but — like Portugal's e-filing-only regime generally —
> carries no AcroForm layer, a print/reference facsimile rather than a
> fillable form." Both halves of that claim were independently re-confirmed
> this cycle rather than taken on faith: fresh `curl` fetches of AT's own
> Rosto (cover-page) and Anexo A (employment/pension-income annex) URLs at
> `info.portaldasfinancas.gov.pt` both returned HTTP 200 with genuine `%PDF`
> bytes and no login/CAPTCHA/WAF gate, and `pdfjs-dist` extraction confirmed
> zero AcroForm widgets across all 27 combined pages of both documents. A
> genuine same-day edition-date discrepancy between the two files (the Rosto
> untouched since March 2025, Anexo A updated March 2026) was investigated,
> not assumed: it traces to Portaria n.º 104/2026/1, de 5 de março, which
> expanded the "IRS Jovem" young-worker tax regime (art. 12.º-B do Código do
> IRS) for income years 2025 and following entirely within Anexo A, leaving
> the Rosto's own cover-page structure unamended this edition cycle — both
> files are the current, correct ones. A legacy same-host mirror
> (`www.portaldasfinancas.gov.pt/de/impressos/Mod3.pdf`) was also fetched,
> found live, but found on inspection to be a stale 2009 edition kept for
> historical filings — disclosed explicitly rather than miscounted as a
> second confirming source, learning directly from GOV-1760's finding on
> the immediately preceding Portugal schema that fabricated/miscounted
> cross-verification claims, not field content, have been this registry's
> recurring failure mode. Given Modelo 3's real-world complexity (Portugal's
> main income-tax return, with a dozen income-category annexes), this
> schema is deliberately bounded to the single most common filer profile — a
> Portuguese-resident salaried employee/pensioner — modelling the Rosto's
> service-office/tax-year/taxpayer/spouse identification, marital-status and
> joint-taxation election, resident fiscal-region, refund IBAN, declaration
> nature, 1%/0.5% IRS/IVA consignment election, and annex-count table,
> plus Anexo A's Quadro 4A income table for its two most common income
> codes (401 trabalho dependente/employment, 403 pensões/pensions) and the
> current "IRS Jovem" election (Quadro 4F.1). 28 fields plus 1
> `documents[]` entry; every excluded annex (B, C, D, E, F, G, G1, H, I, J,
> L) and every excluded Rosto/Anexo A table is disclosed explicitly in the
> schema's own `description` and VERIFICATION.md. This gives Portugal **3 of
> its 6 verticals** (DMV via GOV-1750, Visa via GOV-1757, Taxes via this
> schema); Business Formation, Passport, and National ID remain open backlog
> candidates. This also closes the **global Taxes vertical back to 24/24
> (100%)** — Portugal had been the vertical's only gap since opening as the
> registry's 24th jurisdiction via its DMV vertical (GOV-1750). See the
> document's own VERIFICATION.md for the full sourcing record, field-by-field
> citations, and every disclosed scope decision.

> **Update (2026-07-08, GOV-1750): Portugal opens as GovSchema's 24th
> jurisdiction**, via its DMV vertical, with
> `pt/imt/requerimento-carta-de-conducao` — the Instituto da Mobilidade e dos
> Transportes' (IMT) Mod. 1-IMT "Requerimento," the general-purpose
> application through which a driving-title holder requests renewal
> (revalidação), a duplicate copy (2ª via ou duplicado), replacement
> (substituição), exchange (troca), or an address change (alteração de
> morada) for a Licença de Aprendizagem, Licença de Condução, or Carta de
> Condução. This cycle screened all six of Portugal's verticals: Business
> Formation (IRN's "Empresa na Hora" specimen documents are scanned images
> with no extractable text, and the sole-trader "Início de Atividade" route
> is now fully login-gated); Taxes (AT's Modelo 3 IRS return is a genuine,
> current, rich PDF, but — like Portugal's e-filing-only regime generally —
> carries no AcroForm layer, a print/reference facsimile rather than a
> fillable form); Passport (no citizen-facing application form exists
> domestically; issuance is in-person/biometric-only per Decreto-Lei n.º
> 83/2000 Art. 16); Visa (the national long-stay visa application at
> `vistos.mne.gov.pt` was confirmed, field-for-field, to duplicate the
> already-published `de/auswaertiges-amt/national-visa-application`
> EU-harmonized template — the same duplicate-template pattern this registry
> has found in Poland and Spain); and National ID (Cartão de Cidadão is
> issued via an in-person biometric appointment, with only a consular-only
> application PDF found). IMT's Mod. 1-IMT was picked instead: a genuine,
> unauthenticated, currently-served AcroForm PDF (96 named fields, 108 widget
> annotations total, confirmed directly via `pdfjs-dist`), backed by a self-documenting companion
> instructions PDF — the only Portuguese candidate this cycle found meeting
> this registry's top-tier source bar. A first-time learner's-permit
> application is out of scope (IMT's own service pages state it is requested
> by the driving school, not the applicant, via this form). Models 34 fields
> across the title requested, the six (non-exclusive) request purposes, the
> 19-option licence-category/restriction-code grid, the current-title
> block, applicant identification, address/contact data, and the closing
> request date, plus 3 `documents[]` entries (photograph, the state fee, and
> the form's own sworn declaration). One genuine authoring hazard this
> cycle's own independent re-verification caught: several of the
> category grid's internal AcroForm field names (e.g. a field literally
> named `catA`) do not correspond to their own printed checkbox position
> (confirmed by cross-matching widget coordinates against a rendered bitmap
> of the page) — `licenceCategory`'s enum values are the printed category
> codes themselves, unaffected, but this is disclosed in the document's own
> VERIFICATION.md as a caution against trusting this particular form's
> internal field names at face value. This gives Portugal 1 of its 6
> verticals (DMV); Business Formation, Taxes, Passport, Visa, and National ID
> are open backlog candidates for future cycles, with Taxes (AT's Modelo 3)
> the strongest-sourced of the five.

> **Update (2026-07-08, GOV-1757):** Portugal closes its Visa/residence-status
> gap with `pt/aima/requerimento-autorizacao-residencia` — the Agência para a
> Integração, Migrações e Asilo's (AIMA) Modelo 1 "REQUERIMENTO," the
> general-purpose application a foreign national files with AIMA to request a
> grant or renewal of a temporary or permanent Autorização de Residência
> (residence permit), an Estatuto de Residente de Longa Duração (long-term
> resident status), an Autorização de Residência para Investimento (ARI,
> investment-based residence permit / "golden visa"), an EU Blue Card, family
> reunification under Lei n.º 23/2007, de 4 de julho (Foreigners' Law), or — on
> the same form — a data change or duplicate/second copy of an already-issued
> title. This was flagged as an open backlog candidate by GOV-1750's own research
> cycle, which noted it had been explicitly identified as "a genuine, unauthenticated,
> currently-served [form]… the only Portuguese candidate this cycle found
> meeting this registry's top-tier source bar" — but not authored at that time
> pending a focused research cycle to locate and confirm its live hosting and
> sourcing. GOV-1757 confirmed the form's sourcing directly: AIMA's own official
> document URL is live and is the exact link published on AIMA's own
> "Impressos e Minutas" forms index page; `pdfjs-dist` extraction
> confirms zero AcroForm widgets across all 4 pages (a flat, non-fillable PDF,
> same source-tier as AT's Modelo 3 IRS, already documented for Portugal's
> Taxes vertical). Models 28 applicant-supplied fields across the request-type
> track selection (new permit/status vs. data change/duplicate), the seven
> resident-status pathways (ordinary temporary/permanent residence, long-term
> resident status, investment-residence with optional permanent track, EU Blue
> Card, family reunification), optional family-reunification beneficiary details,
> applicant identification/nationality/biometrics, address/contact data, travel
> document (passport) details, three consent/declaration checkboxes, and 9 supporting-document
> category pointers — plus explicit exclusion of AIMA-staff-only administrative
> boxes and decision fields. Submission model is print-to-photocopy-mail (not
> digital fill-and-submit), same as the form's Portuguese government peers. This
> closes Portugal's Visa/residence-status gap, giving Portugal **2 of its 6 verticals**
> (DMV via GOV-1750's `pt/imt/requerimento-carta-de-conducao` + Visa via this schema);
> Business Formation, Taxes, Passport, National ID remain open backlog candidates,
> with Taxes (AT's Modelo 3) the strongest-sourced. See the document's own
> VERIFICATION.md for the full sourcing record, field-by-field citations, and
> every disclosed scope decision.

> **Update (2026-07-08, GOV-1744):** Chile gains its 3rd vertical, Taxes,
> with `cl/sii/formulario-22` — the Servicio de Impuestos Internos' (SII)
> Formulario 22 (F-22), "Declaración de Renta," Chile's annual income tax
> return. Four prior cycles (GOV-1624, GOV-1638, GOV-1645, GOV-1659) had
> each screened F-22 and deferred it every time: a genuine, current,
> unauthenticated PDF specimen, but no AcroForm field layer at all (confirmed
> once again this cycle via `pdfjs-dist` returning zero Widget annotations
> across all 15 pages) and SII's largest, most complex return besides. This
> cycle located a source none of the four prior cycles had used — SII's own
> interactive "Navegar por Formulario de Renta (F22)" tool
> (`sii.cl/servicios_online/renta/2026/rentaform.html`), whose per-recuadro
> content is itself served as discrete static HTML fragments and per-línea
> "Instrucción" PDFs (e.g. `l13_instruccion.pdf`, `l46_instruccion.pdf`),
> giving genuine SII-authored, línea/código-numbered legal instructions to
> source individual fields against, the same shape of source this registry
> has used before for AEAT's Modelo 030/036 and CEIDG-1. Applying
> `pl/mf/zeznanie-pit-37`'s (GOV-1691) own precedent for scoping an unbounded
> national income-tax return, this document is scoped to the single most
> common individual case: a salaried employee or pensioner reliquidating the
> Impuesto Único de Segunda Categoría (IUSC) after receiving wages from more
> than one employer, or voluntarily reliquidating to claim credits SII's own
> guide devotes worked examples to. Models the taxpayer's identification data
> (Recuadro N°0), Línea 13's wage/pension income (códigos 1098/1030/161),
> Línea 46's IUSC-withheld credit (código 162), and four common single-line
> rebajas/créditos (Línea 16 donations, Línea 21 mortgage interest/DFL-2
> dividends, Línea 23 voluntary pension savings, Línea 41 education-expense
> credit) — 14 fields plus one supporting-evidence document pointer to the
> employer/payer withholding certificates. Deliberately excludes business/
> capital/honorarios income, every capital-gains schedule, the special-regime
> franchise checkboxes, and — the single largest scope decision in this
> document — the entire computed-arithmetic chain from the taxable-base
> subtotal through the progressive tax table, further créditos, and the
> final refund/bank-account block, the same class of exclusion PIT-37
> applied to its own §F-K chain. This cycle also re-screened Chile's
> Passport and National ID gaps (`registrocivil.cl`'s root domain now
> returns an explicit WAF rejection page on direct fetch, a harder-gated
> finding than prior cycles' ClaveÚnica-redirect reports, but the same
> substantive conclusion) and Chile's Visa gap (`evisa.minrel.gob.cl` and
> `tramites.minrel.gob.cl` both fail to resolve via DNS from this
> environment) — all three re-confirmed weaker than F-22, consistent with
> every prior cycle's finding; no pivot. This closes Chile's Taxes gap, its
> 3rd of 6 verticals (Business Formation and DMV were already modelled;
> Passport, Visa, and National ID remain open backlog candidates). See the
> document's own VERIFICATION.md for the full sourcing record and every
> disclosed judgment call.

> **Update (2026-07-08, GOV-1735):** Spain gains its 4th vertical, National
> ID & Civic Documents, with `es/dgp/tarjeta-identidad-extranjero` — the EX-17
> form, "Solicitud de Tarjeta de Identidad de Extranjero (TIE)," the
> application a foreign national authorized to reside in Spain files, in
> person, with the Dirección General de la Policía (DGP) to obtain the
> physical Tarjeta de Identidad de Extranjero documenting their legal
> residence status. This follows up on this catalog's own previously flagged
> lead — the EX-15 foreigner-identity-number form — but picks EX-17 instead:
> EX-15 only assigns a tax/administrative number (the NIE), while EX-17 is
> the application for the physical resident-ID card itself, a closer
> structural match to already-published national-ID schemas like
> `ae/icp/emirates-id-replacement` and
> `kr/mois/resident-registration-card-reissuance`. The live
> `inclusion.gob.es` hosting domain is WAF-blocked to direct fetch from this
> environment; the form was instead retrieved via a Wayback Machine snapshot
> (confirmed HTTP 200, real `%PDF-1.7` bytes) and corroborated against the
> Policía Nacional's own official procedure page (`sede.policia.gob.es`,
> fetched directly with no gate), which confirmed the in-person-only filing
> channel, the required Tasa 790 Código 012 fee-payment-proof document, and
> the issuing authority. The form itself is a fillable AcroForm PDF (70
> named widget annotations, including checkboxes matching this schema's
> `documentRequestType` options), also fully self-documenting via its own
> page-3 numbered instructions key. **Disclosed discrepancy:** the
> form's own printed header still cites its legal basis as "(LO 4/2000 y RD
> 557/2011)," while the live procedure page cites the current governing
> rules as LO 4/2000 alongside Real Decreto 1155/2024 (which replaced RD
> 557/2011's implementing regulation) — the form has apparently not been
> reprinted since the 2024 renumbering; this is flagged in the document's own
> `verification.notes` and VERIFICATION.md rather than silently resolved.
> Models applicant identification/filiation/domicile data, an optional
> distinct-submitter block (footnote 5, for when a representative rather
> than the applicant files), an optional notification-address block
> including an opt-in Dirección Electrónica Habilitada Única (Dehú)
> electronic-notification consent, the filing office, the three-way
> initial/renewal/duplicate document-type selection, and the closing
> place/date/signature — 52 fields plus a fee-payment-proof document and a
> signature attestation. Deliberately excludes any online/telematic
> submission channel (the form's own header states in-person presentation is
> the only accepted channel) and the fee amount itself (not confirmed from a
> primary government source this cycle) — see the document's own
> VERIFICATION.md for these and every other disclosed judgment call. This
> closes Spain's National ID & Civic Documents gap, its 4th of 6 verticals
> (Business Formation, DMV, Taxes, and now National ID are modelled; Passport
> and Visa remain confirmed dead ends/duplicates, per this catalog's own
> prior findings).

> **Update (2026-07-08, GOV-1728):** Estonia gains its fifth vertical, DMV,
> with `ee/transpordiamet/vehicle-transfer-notification` — the notice a
> registered owner (or their authorized representative) files with
> Transpordiamet (the Estonian Transport Administration) when a motor
> vehicle is sold, gifted, exchanged, or otherwise disposed of, amending the
> owner-of-record data in Estonia's traffic/motor register per the Road
> Traffic Act (Liiklusseadus) §77(2)-(3). Transpordiamet's e-service portals
> (`eteenindus.mnt.ee`, the authenticated self-service system, and
> `dire.transpordiamet.ee`, its client-rendered digital first-registration
> environment) are both gated/unauthenticated-content-free, the same
> obstacle class this registry has repeatedly found for client-rendered SPA
> government portals — but the agency's own plain "Forms" page publishes a
> genuine, unauthenticated, directly downloadable AcroForm PDF for this
> transaction, a stronger source shape than the "governing statute as
> primary source" technique two of Estonia's four prior schemas relied on.
> Every one of the form's 67 generically-named AcroForm widgets
> (`Text Box 1`, `Text Box 2_12`, etc.) was mapped to its printed caption by
> cross-referencing widget bounding-box coordinates against the page's own
> text layout, cross-checked by an internal consistency signal: the
> 11-box identifier clusters exactly match Estonia's 11-digit personal code
> length, and the 17-box VIN cluster exactly matches the ISO 3779 VIN
> standard. Modelled as the closer analogue of the already-published
> `cl/sii/aviso-venta-vehiculo` (a "notice of vehicle sale/transfer" shape),
> capturing registered-owner data, an optional authorized representative,
> vehicle identification, the disposal contract itself (sale/gift/exchange/
> other), and the new owner's data. The Road Traffic Act's own English
> translation (via a Wayback Machine snapshot, since `riigiteataja.ee`
> remains the same client-rendered-SPA-shell obstacle every prior EE schema
> hit) sourced the statutory basis (§76-77) for the transaction; no state fee
> is modelled, since — unlike sibling deletion/watercraft-registration forms
> on the same page — this form's own text names none. Models 22 fields plus
> a scanned-contract attachment and a digital-signature attestation — see
> the document's own VERIFICATION.md for the full field inventory and every
> disclosed judgment call. This gives Estonia 5 of its 6 verticals (National
> ID, Business Formation, Passport, Taxes, DMV); Visa remains open, this
> registry's lowest priority given the confirmed Schengen-template-duplicate
> pattern found in other EU jurisdictions — Estonia's last remaining gap.

> **Update (2026-07-08, GOV-1721):** Estonia gains its fourth vertical,
> Taxes, with `ee/emta/income-tax-return-form-a` — Vorm A / Form A, the
> annual income tax return a resident natural person files with the
> Maksu- ja Tolliamet (Estonian Tax and Customs Board, EMTA). The issue
> named the source directly: a genuine, current (2025 tax year), directly
> downloadable, unauthenticated, bilingual (Estonian/English) PDF, confirmed
> to have zero AcroForm fields (a static print/hand-fill template, like
> `pl/mf/zeznanie-pit-37`) but fully self-documenting across 12 numbered
> sections. Scoped to the common wage-earner case per the issue's brief:
> general personal data, address, contact details, one representative
> domestic-wage-income row already taxed at source, one representative
> gift/donation and paid-training-expense deduction entry, the domestic
> bank account nominated for an overpayment refund, and the closing
> declaration. Deliberately excludes EEA cross-border resident provisions,
> all property-transfer gains (financial assets, forestry, other property,
> holding reductions, investment accounts, company-merger income), all
> foreign-sourced income, and the remaining voluntary-deduction tables and
> overpayment-use election — each a materially larger scope. Cross-referenced
> against EMTA's own "Income tax returns for 2025" page for the filing
> window (16 February - 30 April 2026), tax rate, and statutory basis
> (Tulumaksuseadus / Income Tax Act section 43(4)); `riigiteataja.ee` itself
> remains the same client-rendered-SPA-shell obstacle this registry's prior
> two EE schemas hit, not re-fetched this cycle since the form itself is
> fully self-documenting. Models 27 fields plus a closing signature
> attestation — see the document's own VERIFICATION.md for the full field
> inventory and every disclosed judgment call. This gives Estonia 4 of its 6
> verticals (National ID, Business Formation, Passport, Taxes); DMV and Visa
> remain open, with Visa still this registry's lowest priority given the
> confirmed Schengen-template-duplicate pattern found in other EU
> jurisdictions.

> **Update (2026-07-08, GOV-1712):** Estonia gains its third vertical,
> Passport, with `ee/ppa/passport-application` — the Police and Border Guard
> Board (PPA)'s application for an Estonian citizen's passport, whether
> first-time, renewal, replacement, or a data-change update. This cycle's own
> priority order named Passport as the top candidate (PPA already publishes
> the already-modelled e-Residency schema's own agency), and it turned out
> stronger-sourced than either prior EE schema: rather than relying on the
> "governing statute as primary source" technique both `ee/ppa/e-residency-application`
> (GOV-1698) and `ee/rik/private-limited-company-foundation` (GOV-1705) used,
> this cycle found `politsei.ee` itself hosts a real, unauthenticated,
> directly downloadable AcroForm PDF — "APPLICATION FOR IDENTITY DOCUMENTS,"
> a single combined form PPA publishes for five document types (identity
> card, digital identity card, travel document, additional passport,
> seafarer's discharge book), scoped here to the travel-document/passport
> track only. Cross-referenced against PPA's own plain-English "Estonian
> passport for an adult" service pages (confirming the ordinary/expedited
> procedure timelines, first-time-application citizenship-proof
> requirements, and — a first for this jurisdiction — a fully
> primary-sourced, four-tier state-fee schedule) and the Identity Documents
> Act (Isikut tõendavate dokumentide seadus), whose current (01.10.2025)
> consolidated English translation was again retrieved via a Wayback Machine
> snapshot of `riigiteataja.ee`'s own `/tolge/pdf/` route (the same
> client-rendered-SPA-shell obstacle both prior EE schemas hit), this time
> with an added wrinkle: the Act's numbered redaction URLs are permanently
> pinned to a specific in-force window, so the correct current redaction had
> to be located first via the Act's own version-index page. Models 24 fields
> (personal data, contacts, passport-request reason and place of issue, the
> 1-year-validity-without-fingerprints pathway for citizens abroad, and legal
> representative data) plus 5 `documents[]` entries (document photo,
> conditional first-time citizenship proof, state fee, and a data-accuracy
> attestation). Deliberately scoped to a single form track and a single
> submission channel (domestic service office, not the self-service portal
> or consular submission abroad, each of which carries its own distinct fee
> schedule) — see the document's own VERIFICATION.md for the full source
> inventory and every disclosed judgment call. Estonia's Taxes and DMV
> verticals were not screened this cycle (Passport was strong enough on its
> own); Visa remains this registry's lowest priority given the confirmed
> Schengen-template-duplicate pattern found in other EU jurisdictions.

> **Update (2026-07-08, GOV-1705):** Estonia gains its second vertical,
> Business Formation, with `ee/rik/private-limited-company-foundation` —
> the petition for entry of a newly-founded private limited company
> (osaühing/OÜ, Estonia's LLC equivalent) in the Commercial Register,
> submitted through the e-Business Register (e-äriregister) portal and
> reviewed by the Registration Department of Tartu County Court. Estonia
> was this registry's most under-built jurisdiction (1/6 verticals) after
> GOV-1698 opened it via National ID & Civic Documents, and this process is
> the natural companion to the e-Residency schema already published there —
> an e-Resident's flagship real-world use is founding and remotely managing
> exactly this kind of one-person OÜ. Like `ee/ppa/e-residency-application`,
> the live e-Business Register filing portal is authenticated (digital
> signature required before any field renders), so this document again uses
> the "governing statute as primary source" technique: the Commercial Code
> (Äriseadustik) §138 and §139 state verbatim what a memorandum of
> association and articles of association "shall set out," and the
> Commercial Register Act (Äriregistri seadus) §§9-14 state exactly what
> data the resulting registry card carries. A new wrinkle this cycle: the
> Riigi Teataja (State Gazette) site itself — the host of both statutes'
> official English translations — is now a fully client-rendered Angular
> SPA that returns an identical empty shell to direct automated retrieval,
> even on its own "official translation PDF" download route; both statutes
> were instead retrieved from Wayback Machine snapshots, the same workaround
> this registry has used before for `passports.gov.au`/`dfat.gov.au`. Models
> 29 fields (company identity, the single founder's identity, share capital
> and contribution terms, management board/supervisory board/procurator/
> auditor data, and foundation costs/legal reserve/financial year) plus 4
> `documents[]` entries. Deliberately scoped to a single founder — the v0.3
> meta-schema has no repeating-group primitive, and a second founder is
> where the Commercial Code's "division of shares among the founders" first
> becomes genuinely multi-valued — and deliberately excludes EMTAK activity
> classification and the e-Resident-specific contact-person/virtual-office
> obligations (both real, but sourced from statutes this cycle did not
> independently verify) and the exact current state-fee amount (found only
> in secondary sources, disclosed as unconfirmed rather than asserted). See
> the document's own VERIFICATION.md for the full source inventory and
> every disclosed judgment call.

> **Update (2026-07-08, GOV-1698):** **Estonia (EE) opens as GovSchema's
> 23rd jurisdiction**, via its National ID & Civic Documents vertical, with
> `ee/ppa/e-residency-application` — the Police and Border Guard Board
> (PPA)'s e-Resident's digital ID application, the credential foreign
> nationals use to access Estonia's e-services and digitally sign documents
> without residence, citizenship, or a right to enter Estonia/the EU.
> Coverage across the prior 22 jurisdictions is heavily saturated (nearly
> every one at 5/6 or 6/6, and this cycle's own re-screen of Chile's Visa
> and Taxes gaps re-confirmed them as dead ends), so this cycle opened a new
> jurisdiction instead of continuing to fight already-dead per-jurisdiction
> gaps. Estonia was the issue's own primary candidate, screened first: the
> live application environment (`apply.gov.ee`, technically served from
> `eresident.politsei.ee`) turned out to be a fully client-rendered,
> account-gated Angular SPA with no unauthenticated field-level view — every
> route returns the identical empty shell, confirmed by direct `curl`
> retrieval and by grepping its own compiled JS bundle for field-name/label
> text (none present outside the app's own runtime). Rather than a dead end,
> this cycle found that the issuing agency's own official FAQ, published in
> plain, unauthenticated English HTML on `politsei.ee` (a separate,
> server-rendered site from the application SPA), states verbatim which
> regulation sections list the application's required data
> ("sections 5, 6, 9 and 17 of Regulation No. 20 and section 7 of Regulation
> No. 78 of the Minister of the Interior of Estonia") and then gives the
> PPA's own clause-by-clause English enumeration of every one of those data
> elements — an even stronger variant of the "governing statute as primary
> source when the live form has no field-level transparency" technique this
> registry used for Poland's passport application (GOV-1685), since here
> the government agency's own page states the field list in plain English
> directly, with no translation step. Models 37 fields (core identity and
> contact data with the source's own 8-element address split, travel
> document data, a merged purpose/justification statement, and the
> statute's full background-disclosure data list — former names/citizenship,
> business/financial ties, criminal record, and security/organisation
> history — modelled as optional where the underlying fact may not exist for
> a given applicant, and as required boolean declarations for the three
> universal yes/no security questions) plus 4 `documents[]` entries (travel
> document copy, facial photograph with its confirmed pixel/format/size
> specification, CV, and the EUR 150 state-fee payment). Deliberately
> excludes: the live wizard's own internal page boundaries (unconfirmable
> without creating a real account); the politically-contingent,
> time-boxed, two-group citizenship-based application-restriction country
> list (a real eligibility mechanism, left undisclosed as data rather than
> encoded as a fast-staling validation rule); the Minister-of-the-Interior
> "compelling public interest" exception pathway; and the separate
> account-creation, in-person fingerprinting, and pick-up-location-change
> processes. No fallback candidate (Portugal NIF, Malaysia SSM/JPJ, Japan
> e-Tax/driver's license) was screened this cycle, since Estonia's own
> primary candidate was strong enough on its own. See the document's own
> VERIFICATION.md for the full source inventory and every disclosed
> judgment call.

> **Update (2026-07-07, GOV-1691):** Poland gains its fifth vertical, Taxes,
> with `pl/mf/zeznanie-pit-37` — PIT-37, the annual personal income tax
> return for individuals whose income is taxed at the progressive scale and
> consists exclusively of amounts a payer already reported on a PIT-11/
> PIT-11A/PIT-40A/PIT-R/IFT-1R information slip (in practice, chiefly
> employees and pensioners — the single most commonly filed Polish PIT
> return). This cycle first re-screened Poland's Passport gap (independently
> re-reaching, before discovering it had already been closed same-day by a
> concurrent cycle, GOV-1685/PR #280, the same "no downloadable form exists;
> the governing statute is the primary source" finding) and its national
> Type-D visa gap — the current wzór (Załącznik nr 2 do Rozporządzenie MSWiA
> z dnia 25 czerwca 2025 r. w sprawie wiz dla cudzoziemców, Dz.U. 2025 poz.
> 847, retrieved via `eli.gov.pl`, no gate), confirmed via a field-by-field
> comparison of both PDFs' own text layers to share the same EU
> long-stay-visa field sequence already modelled as
> `de/auswaertiges-amt/national-visa-application` — a genuine duplicate, not
> authored. PIT-37(31) (tax year 2025) was picked instead: a genuine,
> current, directly-downloadable, unauthenticated PDF on `podatki.gov.pl`/
> `gov.pl` with no AcroForm layer (confirmed via `pdfjs-dist` returning zero
> widget annotations — a static hand-fill/print template, like Poland's
> CEIDG-1 and vehicle-registration schemas) but fully self-documenting: 171
> numbered positions across sections A-Q, each labeled in place, several
> citing their own governing statute article inline. A prior cycle
> (GOV-1671) had screened this vertical only shallowly, correctly noting
> Poland's e-Deklaracje/Twój e-PIT *online-filing* channels are
> authenticated, but incompletely — the underlying paper PIT-37 form itself,
> separate from those channels, is a plain unauthenticated download. Models
> 38 fields (taxpayer identification and address, four common tax-relief
> elections, and the two most common Section E.1 income-source line items —
> employment wages and pensions) plus 2 `documents[]` entries (a conditional
> PIT/O annex pointer and the form's own closing signature declaration).
> Deliberately excludes the entire computed-arithmetic chain (Sections F
> through K: deductions, tax calculation, tax due, the children's-relief
> additional refund, and rare withheld-securities income) since each of
> those figures sums across all five Section E.1 income-source rows
> (including three this v1.0.0 does not model) and, for a joint return, the
> mirrored spouse column — modelling those totals correctly would require a
> materially larger v1.1.0/v2.0.0 scope, and this cycle chose not to
> fabricate a computed tax-due figure backed by an incomplete input set. Also
> excludes the joint/spouse filing column throughout, and Section N (refund
> bank account) — see the document's own VERIFICATION.md for this and 6
> other disclosed judgment calls. This gives Poland 5 of its 6 verticals
> (National ID, Business Formation, DMV, Passport, Taxes); only Visa remains
> open, now a confirmed-duplicate dead end pending a genuinely distinct
> Polish visa pathway (if one exists) for a future cycle to find. Chile's
> Registro Civil, SII Formulario 22, and Visa gaps were not re-screened this
> cycle and remain open backlog.

> **Update (2026-07-07, GOV-1685):** Poland gains its fourth vertical,
> Passport, with `pl/mswia/wniosek-o-wydanie-paszportu` — the standard adult
> passport application. Unlike the sibling dowód osobisty (National ID)
> schema, no downloadable AcroForm or field-numbered informator exists for
> this process: gov.pl's own "Uzyskaj paszport" service page states plainly
> that no paper wniosek is prepared at all, since the passport office fills
> an equivalent electronic application from applicant-supplied and registry
> data during the mandatory in-person visit. Several candidate paper-form
> links were checked and rejected this cycle — a third-party site whose own
> "download" links resolve to Google Drive, and a local-government (BIP)
> "specimen filled form" PDF that turned out to be a single-page scanned
> image with no extractable field text — before confirming, via a full
> `pdfjs-dist` extraction of the implementing Rozporządzenie MSWiA z dnia 9
> września 2022 r. (Dz.U. 2022 poz. 2050, 49 pages), that no wniosek
> template is gazetted at all (its five annexes are the passport booklet's
> own physical designs, not an application form). Rather than a dead end,
> this document instead sources every field directly from **Art. 33 of the
> Ustawa z dnia 27 stycznia 2022 r. o dokumentach paszportowych** (current
> consolidated text, Dz.U. 2024 poz. 1063) — the primary legislation
> enumerating the wniosek's own required content — cross-checked
> article-for-article against the 2022 original text and corroborated by
> the live gov.pl service page. 17 fields (citizenship eligibility, the
> applicant's core identity data, five office-discretionary
> identity-corroboration fields per Art. 38 ust. 5, a required correspondence
> address, optional contact-register phone/email, and a reduced/exempt-fee
> claim flag) plus 4 `documents[]` entries (a currently-held identity
> document if any, the photograph with its full Art. 41 specification and
> 6-month freshness window, proof of fee payment, and conditional
> reduced/exempt-fee proof). Deliberately excludes the minor/ward pathway,
> the applicant's own signature/fingerprint (captured in person, not
> applicant-suppliable), the office-only "adnotacje urzędowe", and the
> separate temporary/diplomatic/service-passport and "second passport"
> processes — see the document's own VERIFICATION.md for these and other
> disclosed judgment calls. This gives Poland 4 of its 6 verticals (National
> ID, Business Formation, DMV, Passport); Taxes and Visa remain open,
> unscreened backlog candidates for future cycles. Global Passport now
> stands at 19/22 jurisdictions.

> **Update (2026-07-07, GOV-1678):** Poland gains its third vertical, DMV,
> with `pl/mi/wniosek-o-rejestracje-pojazdu` — the national vehicle
> registration / temporary registration / deregistration / disposal
> notification application, "WNIOSEK O REJESTRACJĘ, CZASOWĄ REJESTRACJĘ,
> WYREJESTROWANIE POJAZDU LUB ZAWIADOMIENIA O ZBYCIU POJAZDU" (Załącznik nr 1
> do Rozporządzenia Ministra Infrastruktury z dnia 8 listopada 2024 r., Dz.U.
> 2024 poz. 1709). Two prior cycles (GOV-1666, GOV-1671) had each screened
> this same regulation and set it aside for a different deliverable,
> explicitly flagging it as thinner — a first-pass read of only its six
> numbered vehicle-identification lines and request-type selector, without
> extracting the header, the seven footnotes, or the plate-election and
> declaration content. This cycle re-fetched the source directly
> (`eli.gov.pl`, the official Dziennik Ustaw gazette API, HTTP 200, no
> login/CAPTCHA/WAF) and performed a full `pdfjs-dist` text-content
> extraction of the form's own two pages (it carries no AcroForm layer — a
> static hand-fill/print template), yielding a materially richer field set:
> 22 fields — the header (owner identity/address, the addressee registering
> authority's name and locality, a PESEL-or-REGON line, a foreigner-only date-of-birth line), a
> four-way `requestType` enum (registration / temporary registration /
> deregistration / disposal notification) covering all four procedures this
> single template serves, the six numbered vehicle-identification lines, the
> individual/vanity-plate and reduced-size-plate elections, the
> previous-registration-number retention election, and the form's own
> closing data-accuracy declaration — plus 13 `documents[]` entries (12
> case-dependent supporting-evidence requirements sourced from the
> corroborating gov.pl "Zarejestruj pojazd" service page's own breakdown by
> vehicle scenario, and 1 attestation citing the form's own closing
> declaration verbatim). Deliberately does not model a vehicle-category/case
> -selector field distinct from `requestType`, so every `documents[]` entry
> is left `required: false` rather than fabricating a structural gate the
> sources do not themselves state as a checkable field — see the document's
> own VERIFICATION.md for this and ten other disclosed judgment calls. This
> closes the **global DMV vertical to 22/22 jurisdictions (100%)**, matching
> Business Formation's existing 22/22, and gives Poland 3 of its 6 verticals
> (National ID, Business Formation, DMV); Passport, Taxes, and Visa remain
> open, unscreened backlog candidates for future cycles.

> **Update (2026-07-07, GOV-1671):** Poland gains its second vertical,
> Business Formation, via `pl/ceidg/wniosek-o-wpis-do-ceidg` — CEIDG-1,
> "Wniosek o wpis do Centralnej Ewidencji i Informacji o Działalności
> Gospodarczej," the form through which a natural person registers a sole
> proprietorship (jednoosobowa działalność gospodarcza) and is simultaneously
> registered with ZUS/KRUS (social insurance), GUS (which assigns REGON),
> and the tax office (which assigns NIP). This cycle first screened Poland's
> DMV vertical, per the prior cycle's recommended order: the national wzór
> wniosku o rejestrację pojazdu (Rozporządzenie Ministra Infrastruktury z
> dnia 8 listopada 2024 r., Dz.U. 2024 poz. 1709, Załącznik nr 1), retrieved
> via a third-party mirror after the primary `isap.sejm.gov.pl` host proved
> Incapsula-bot-gated — genuine and current, but materially thinner (only 7
> numbered data fields) than the Business Formation candidate picked
> instead, and left open as a real backlog candidate. CEIDG-1 itself is a
> genuine, unauthenticated PDF hosted directly on `ceidg.gov.pl` with no
> login/CAPTCHA/WAF gate; although it carries no AcroForm layer (a static
> hand-fill/print template, confirmed via `pdfjs-dist` returning zero
> annotations), its own printed layout is fully self-documenting — 30
> numbered sections, every field labeled in place in the PDF's own text
> layer, the same "read the printed reference numbers directly" technique
> this registry's Spanish Modelo 030/036 schemas established. Cross-checked
> against CEIDG's own official 75-page "Instrukcja wypełniania wniosku
> CEIDG-1" guide (dated 2025-01-07), which — despite targeting a slightly
> earlier, differently-numbered form revision — confirmed every field's
> label, required/optional status, and closed enum values with no
> substantive content drift. Models 81 fields plus 2 `documents[]` entries,
> scoped deliberately to the new-registration ("wpis") request type only —
> CEIDG-1's own change/suspend/resume/deregister request types and their
> type-specific sections, the KRUS-specific declaration block, and several
> real but comparatively rare optional blocks (external-accounting-firm
> details, a second personal bank account, foreign tax IDs, power of
> attorney) are all disclosed as out of scope for v1.0.0 — see the
> document's own VERIFICATION.md for the full candidate comparison and 8
> disclosed judgment calls. This gives Poland 2 of its 6 verticals (National
> ID, Business Formation); Passport, DMV, Taxes, and Visa remain open,
> unscreened-or-lightly-screened backlog candidates for future cycles.

> **Update (2026-07-07, GOV-1666):** Poland opens as this registry's **22nd
> jurisdiction** with `pl/mswia/wniosek-o-wydanie-dowodu-osobistego`
> (National ID & Civic Documents) — the "Wniosek o wydanie dowodu
> osobistego" (form DO/W/1), Poland's national identity card (dowód
> osobisty) application, through which a Polish citizen applies for a first,
> renewed, or replacement card across fourteen possible reasons (first
> issuance, data change, expiry, suspension lapse, loss, changed appearance,
> damage, electronic-layer upgrade, authentication/certificate malfunction,
> identity theft, fingerprint-free replacement, complaint, or another
> reason). This `GovSchema Standard Research` cycle re-screened Spain's
> Passport (Policía Nacional DNI, still appointment-only with no
> downloadable field-level form) and Visa (the national Type-D visa form,
> still duplicating `de/auswaertiges-amt/national-visa-application`) gaps,
> and Chile's Passport/Visa/National ID gaps (Registro Civil e
> Identificación, still ClaveÚnica-login-gated with only a photo-scanned
> requirements flyer as an unauthenticated fallback, not a field-by-field
> form) — all four re-confirmed weaker than a new candidate found this
> cycle. Poland's dowód osobisty application form is a genuine,
> currently-maintained (its governing regulation dated 2025-07-23, Dz. U. z
> 2025 r. poz. 1031, implementing EU Regulation 2025/1208 on strengthened
> identity-card security features), fully unauthenticated AcroForm PDF
> attached directly to the gov.pl "Uzyskaj dowód osobisty" service page —
> its 47 form-field widgets across 2 pages already carry complete,
> self-documenting Polish names (e.g. "Numer PESEL", "Imię ojca (pierwsze)"),
> extracted directly via `pdfjs-dist`'s own annotation layer with no
> coordinate-matching or page-rendering needed. Models 26 fields across the
> form's own six sections — identity data of the person to receive the
> card, an optional correspondence-contact block, the closed
> reason-for-application list, a personal-signature-certificate election,
> and the applicant's own place/date declaration — plus 1 `documents[]`
> entry for the required photograph. Deliberately does not model the form's
> own clerk-only "Adnotacje urzędowe" block (identity-verification method,
> a parent/guardian/carer's name when filing for a child or ward, the
> document used to establish identity, and whether fingerprints were taken
> — all completed by the receiving official, not the applicant) or the
> distinct minor/no-fingerprint applicant pathway — see the document's own
> VERIFICATION.md for the full candidate comparison and eight other
> disclosed judgment calls. This opens Poland with 1 of its 6 verticals
> (National ID & Civic Documents); Passport, DMV, Business Formation, Taxes,
> and Visa are all open, unscreened backlog candidates for future cycles.

> **Update (2026-07-07, GOV-1659):** Spain gains its third vertical, Business
> Formation, with `es/aeat/declaracion-censal-alta-actividad-economica-modelo-036`
> — AEAT's Modelo 036, "Declaración censal de alta, modificación y baja en el
> Censo de empresarios, profesionales y retenedores," scoped to the
> "declaración censal simplificada" pathway a natural person uses to register
> the start of a business or professional economic activity (alta, casilla
> 111 only — not the form's own modificación/baja causes). This
> `GovSchema Standard Research` cycle deepened two pre-screened candidates:
> Chile's SII Formulario 22 (Declaración de Renta, Taxes vertical) — a
> genuine, current PDF confirmed to still carry no AcroForm layer at all
> (re-checked for `/AcroForm`/`/Widget` markers), and whose own guide pages
> (`guia_trib_suplemento_2026.html`) give rich código/recuadro-level detail
> but no confirmed simplified wage-only track comparable in scope to this
> registry's other individual-tax schemas — and Spain's Modelo 036/037. This
> cycle confirmed Modelo 037 (a shorter, simplified sibling form) was
> suppressed by Orden HAC/1526/2024 (BOE, effective 2025-02-03) and found
> Modelo 036 itself is filed only through two session-based web applications
> (one Cl@ve/certificado-authenticated, one an unauthenticated but
> interactive "cumplimentación, validación y obtención en PDF" wizard), no
> standalone downloadable blank AcroForm — but also found AEAT's own
> official, current (footer-dated 26/marzo/2026), fully unauthenticated
> "Guía práctica para cumplimentación del modelo censal 036," a
> chapter-and-casilla-numbered walkthrough of the entire form, strong enough
> to author against directly. Models 39 fields across identification, fiscal
> domicile (including the mandatory cadastral-reference indicator),
> notification domicile and AEAT-notice contact data, the economic activity's
> own IAE classification and lugar-de-realización (fixed-premises vs. not),
> and the VAT-regime/IRPF-estimation-method elections (each modelled as
> mutually-exclusive checkbox groups). Deliberately does not model the VAT
> "inicio de actividad" timing casillas, the Régimen Especial del Criterio de
> Caja opt-in, IRPF pagos fraccionados, the representative block, or the
> P.O.-box notification-address track — see the document's own VERIFICATION.md
> for the full candidate comparison and every disclosed judgment call. This
> closes CATALOG.md's own explicitly-flagged Spain Business Formation gap,
> bringing global Business Formation back to **21/21 (100%)** and giving
> Spain 3 of its 6 verticals (Business Formation, Taxes, DMV); Chile's Taxes
> gap remains open (screened, not picked this cycle) alongside Spain's
> Passport, Visa, and National ID verticals.

> **Update (2026-07-07, GOV-1652):** Spain gains its second vertical, DMV,
> with `es/dgt/solicitud-tramites-vehiculo` — the Dirección General de
> Tráfico's (DGT) Modelo 01, "Trámites de Vehículos," a single standard
> paper/PDF request form a vehicle owner (or representative) presents at a
> Jefatura de Tráfico to request any one of seven vehicle-registry
> procedures: a duplicate circulation permit, a vehicle-information report
> (up to eight plates), deregistration (temporary or definitive),
> reactivation from a temporary deregistration, new registration (ordinary
> or historic), a temporary circulation permit, or reinstatement. This
> `GovSchema Standard Research` cycle screened Spain's remaining four open
> verticals: the national (long-stay, Type D) visa application
> (`exteriores.gob.es`'s "Solicitud de visado nacional") — a genuine,
> unauthenticated AcroForm PDF, but confirmed to be the same EU-harmonized
> national-visa template already modelled in this registry via
> `de/auswaertiges-amt/national-visa-application`, so authoring it again
> would duplicate an existing schema rather than fill a gap; CIRCE's
> Documento Único Electrónico (DUE) for company formation, an authenticated
> portal that itself unifies 25+ separate administrative forms and varies by
> company type, judged too broad/unbounded for one session; and Policía
> Nacional's DNI/passport channels, both confirmed in-person
> Documentation-Unit-appointment processes with no downloadable field-level
> application form (a distinct process, the EX-15 foreigner-identity-number
> form, is a real downloadable form but is not Spain's own national identity
> document, and was left as a possible future National ID candidate rather
> than picked this cycle). DGT's Modelo 01 was picked instead: a genuine,
> currently-maintained (own printed edition marker "MOD. 01/2025-08-ES")
> fillable AcroForm PDF — `sede.dgt.gob.es` itself times out on every direct
> connection attempt from this environment (DNS resolves, but the TCP
> handshake never completes), so the form and its corroborating instruction
> sheet were retrieved via Wayback Machine snapshots instead, both HTTP 200.
> A top-level, native AcroForm radio-button group selects which of the seven
> procedures is requested, and — for five of the seven — a second radio-button
> group narrows the specific reason/sub-type; both are modelled as single
> `enum` fields (not booleans + `exclusivityGroups`), consistent with this
> registry's established convention for native PDF radio groups (e.g.
> `co/runt/formulario-solicitud-tramites-vehiculo`'s `tramiteType`). A
> rendered page crop (`pdfjs-dist` + `canvas`, 3x zoom) was used to resolve
> the exact procedure/reason grid two of the five sub-trámite radio groups
> implement, since their own export values alone did not fully disambiguate
> column membership. Models 47 fields across the form's shared header blocks
> (vehicle data, the vehicle's registered domicile, and the requesting
> party's identity), the seven-procedure selection and its five nested
> sub-choices, an optional "conductor habitual" (habitual driver)
> notification block, and a free-text "Otros" block — plus 1 `documents[]`
> entry for the identity documentation DGT's own instruction sheet confirms
> for the duplicado/renovación procedure group specifically (not
> independently confirmed for the form's other six trámites this cycle).
> Deliberately does not model DGT's own authenticated online-filing channel
> (Cl@ve/certificado), the municipal-census/IAE data DGT's own privacy
> notice states it looks up electronically rather than collects from the
> applicant, or the physical-signature line itself — see the document's own
> VERIFICATION.md for the full candidate comparison and eleven other
> disclosed judgment calls. This gives Spain 2 of its 6 verticals (Taxes,
> DMV); Passport, Business Formation, Visa, and National ID remain open,
> unscreened-or-screened-and-deferred backlog candidates for future cycles.

> **Update (2026-07-07, GOV-1645):** Spain opens as this registry's **21st
> jurisdiction** with `es/aeat/declaracion-censal-personas-fisicas-modelo-030`
> (Taxes) — the Agencia Estatal de Administración Tributaria's (AEAT)
> Modelo 030, "Declaración censal de alta en el Censo de obligados
> tributarios, cambio de domicilio y/o de variación de datos personales,"
> the census declaration a natural person not carrying out a business/
> professional activity uses to register in Spain's tax census for the
> first time, request a NIF when they hold no DNI/NIE, change their fiscal
> or notification domicile, update identifying data, report a change of
> civil status, or add/withdraw a phone number or email for AEAT notices.
> This `GovSchema Standard Research` cycle screened six candidates before
> picking this one: Chile's remaining Passport and National ID gaps
> (Registro Civil e Identificación's own channels still CAPTCHA-gated on
> direct fetch, ClaveÚnica-gated for scheduling, with only prose
> instructivos — not fillable forms — found as PDF fallbacks; a PDI-hosted
> "Habilitación para Renovar Cédula" lead 403'd on fetch and was narrowly
> scoped to third-party pickup authorization regardless); Chile's Visa
> gap (`evisa.minrel.gob.cl`, re-checked per this cycle's own brief since
> DNS/hosting can change — still does not resolve as of 2026-07-07); Peru's
> Passport channel (Migraciones' own downloadable `SOLICITUD-GENERAL.pdf`
> is a genuine unauthenticated PDF but carries no AcroForm layer at all —
> a generic, non-fillable, multi-purpose request template — and a second,
> passport-specific PDF referenced in search results timed out on every
> fetch attempt); Peru's National ID channel (RENIEC's own DNI-renewal app,
> `apps.reniec.gob.pe/renovacionDni/`, is unauthenticated at its landing
> page but loads Google's reCAPTCHA Enterprise on its very first screen);
> and Argentina's RENAPER (DNI/Passport are both confirmed in-person
> Documentation-Center-appointment processes booked via the "Mi Argentina"
> app, no downloadable field-level form found for either). Spain's own
> Modelo 030 had been screened once before (GOV-1624) and set aside only
> because its ~135 AcroForm widgets carry generic internal names
> (`dato.1`…`dato.135`); this cycle re-examined it properly and found the
> form's own printed reference numbers (e.g. "207 NIF", "411 Tipo de vía")
> give a clean, independently-checkable coordinate-matching path — each
> attribution was extracted via `pdfjs-dist` (widget layer plus text-layer
> coordinates) and then independently re-confirmed by rendering both pages
> to a bitmap (`pdfjs-dist` + `canvas`, 3x zoom) and visually cropping the
> most ambiguous rows. Models 119 fields across the form's ten sections —
> a header identification block; fifteen "causa de presentación"
> checkboxes (one interesado/cónyuge pair per cause) that this document's
> own `requiredWhen` gating infers (a disclosed judgment call, not an
> AEAT-published cross-reference) trigger which of the identity/domicile/
> civil-status sections must be completed; identity blocks for the
> interesado and, mirrored, for a cónyuge; phone/email-for-notices;
> domestic and foreign fiscal domicile; a two-track notification-domicile
> section; a representative block; and civil status — plus 6
> `exclusivityGroups` entries. Deliberately does not model AEAT's own
> authenticated electronic-filing channel, the external AEAT "Clave" code
> tables the representative/country-code fields reference, or any
> accompanying-document requirement (no source found this cycle publishes
> one) — see the document's own VERIFICATION.md for the full candidate
> comparison and ten other disclosed judgment calls, including an
> unconfirmed `sexoInteresado`/`sexoConyuge` H/M enum inference flagged for
> a human reviewer. This gives Spain 1 of its 6 verticals (Taxes);
> Passport, DMV, Business Formation, Visa, and National ID are all open,
> unscreened backlog candidates for future cycles.

> **Update (2026-07-07, GOV-1638):** Chile gains its second vertical, DMV,
> with `cl/sii/aviso-venta-vehiculo` — the Servicio de Impuestos Internos'
> (SII) Formulario 1816, "Aviso de Venta de Vehículos," a sworn declaration a
> taxpayer who owns passenger-transport or cargo-for-hire vehicles must file
> with SII each time they sell one. This `GovSchema Standard Research` cycle
> screened Chile's remaining five open verticals in priority order:
> Registro Civil e Identificación's vehicle-registration and driver's-licence
> channels (the former CAPTCHA-gated on direct fetch and 403'd via
> ChileAtiende's aggregator fichas, the latter a confirmed in-person-only,
> by-municipality process with no form or wizard at all); a Ministerio de
> Transportes (MTT/Subtrans) Formulario N°1 vehicle-service-registration PDF
> (recovered via Wayback after `mtt.gob.cl` itself proved unreachable
> directly, but scoped narrowly to commercial passenger-transport-service
> permits and carrying no AcroForm widget layer at all); SII's own
> Formulario 22 annual income-tax return (a genuine, current 15-page PDF,
> but a prose instructivo with zero AcroForm fields, standing in for nothing
> the way F4415-PN does for the sibling schema, and SII's largest, most
> complex return besides); and Chile's consular e-visa channel
> (`evisa.minrel.gob.cl`, referenced from a live, unauthenticated
> `tramites.minrel.gov.cl` landing page's own CSP header, but the subdomain
> itself did not resolve this cycle). Formulario 1816 was picked instead: a
> genuine, unauthenticated, currently-maintained (`Last-Modified:
> 2025-02-13`) fillable AcroForm PDF hosted directly on `sii.cl`, no
> login/CAPTCHA/WAF gate — unlike the sibling schema's F4415-PN, this form's
> 55 AcroForm widgets carry only generic sequential names (`Texto1`…
> `Texto54`), so every field's real label was attributed via `pdfjs-dist`
> per-glyph x/y-coordinate cross-matching against the page's own text layer,
> not name-guessing. Models 40 fields across the vendor/representative/buyer
> identification blocks, the sale's own details, the vehicle's
> identification, and two sections (capital-gain calculation, continuation
> as a Primera Categoría taxpayer) the instructivo names as mandatory only
> for taxpayer categories this form provides no field to distinguish —
> disclosed and left `required: false` rather than fabricating a
> `requiredWhen` gate with no real trigger — plus 2 `documents[]` entries and
> 1 `exclusivityGroups` entry. This closes the **global DMV vertical to
> 20/20 (100%)**. Chile's remaining open verticals are Passport, Taxes,
> Visa, and National ID.

> **Update (2026-07-07, GOV-1631):** Brazil gains
> `br/pr/iipr/carteira-identidade-correcao`, closing its National ID &
> Civic Documents gap (this catalog's own "Known Gaps" section had flagged
> Brazil's Carteira de Identidade Nacional (CIN) as an open-but-weak
> candidate, and two same-day prior cycles — GOV-1616, GOV-1624 — had each
> independently found Paraná's own RCI (Registro Civil de Identificação)
> system a genuinely strong, ready-to-author candidate but deferred it,
> since confirming its fields' real on-screen labels needed a live-rendered
> pass, not just JS-bundle field-name inspection). This cycle is that
> dedicated pass, and corrects a stale citation both prior cycles' own notes
> carried forward: the bare hostname `rci.pr.gov.br` no longer resolves in
> DNS at all as of 2026-07-07 (confirmed NXDOMAIN via `getent hosts`, Python
> `socket.gethostbyname`, and Google's DNS-over-HTTPS resolver); the real,
> live, unauthenticated host is `https://www.rci.pr.gov.br` (with the `www.`
> prefix), embedded via an iframe on
> `policiacivil.pr.gov.br/Pagina/Correcao-de-Solicitacao` and linked from
> IIPR's own service-catalog pages. This document is scoped to
> correction/update of an *existing* Paraná RG/CIN record (photo, optional
> secondary documents, biographical data, signature, health/disability
> information, and contact/delivery address), confirmed via a live
> Playwright render plus a full reconstruction of the same Vue app's
> compiled render-function source (real labels/masks/option lists, not just
> internal field names) — a synthetic, checksum-valid test CPF was correctly
> rejected live by both of the app's real-record eligibility gates
> ('Atenção: O seu cadastro no Paraná não está disponível...' /
> 'Pedido não encontrado'), confirming genuine server-side validation and
> that no synthetic path exists past them, consistent with this cycle's own
> scoping. First-time CIN/RG issuance is confirmed separately,
> in-person-appointment-only, via IIPR's own service-catalog page, and
> remains out of scope. Models 48 fields plus 11 supporting-document
> entries across six sections (Foto, Documentos, Dados biográficos,
> Assinatura, Saúde, Endereço); one real authoring bug this cycle's own
> pre-merge validation pass caught and fixed: a signature-image document
> miscategorized `category: "attestation"`, which the v0.3 meta-schema
> forbids from carrying file-type `constraints` — see the document's own
> VERIFICATION.md for the full method, the second corroborating source
> (IIPR's own service-description page), and every other disclosed
> judgment call. This closes the global National ID & Civic Documents
> vertical to **17/20 (85%)**.

> **Update (2026-07-07, GOV-1624):** Chile opens as the registry's **20th
> jurisdiction** with `cl/sii/inicio-actividades-personas-naturales`
> (Business Formation) — the Servicio de Impuestos Internos' (SII)
> Formulario 4415-PN, "Declaración de Inicio de Actividades para Personas
> Naturales," through which an individual who already holds a RUT (Rol Único
> Tributario) declares the start of an economic activity, registering as a
> taxpayer for it and receiving SII's first/second-category tax
> classification. This `GovSchema Standard Research` cycle screened three
> candidates before picking this one: **Brazil's National ID gap** (Carteira
> de Identidade Nacional, CIN), explicitly flagged by this catalog as an
> unscreened backlog candidate, turned out to be a genuinely strong,
> ready-to-author candidate on deeper investigation (a Vue/Inertia SPA's own
> compiled, unauthenticated JS bundle at `rci.pr.gov.br/pedido` exposes a
> rich field set for Paraná's own correction/renewal flow) but was left for
> a dedicated future cycle since confirming its fields' real on-screen
> labels needs a live-page render pass, not just JS-bundle inspection; **Spain's
> AEAT Modelo 030** (NIF registration) is a genuine unauthenticated fillable
> PDF but its ~135 AcroForm widgets carry only generic internal names
> (`dato.1`…`dato.135`), making faithful single-pass extraction
> meaningfully more error-prone than the candidate below, whose widget names
> are already self-documenting. Chile's own flagship same-day
> company-formation portal (`registrodeempresasysociedades.cl`, "Tu Empresa
> en Un Día") and its passport/national-ID channels were all found
> ClaveÚnica-login-gated with no PDF fallback — this form was instead
> sourced from a directly downloadable, currently-maintained (`Last-Modified:
> 2025-02-13`), two-page fillable AcroForm PDF hosted on `sii.cl` itself (no
> login/CAPTCHA/WAF gate), whose 55 widgets were extracted via
> `pdfjs-dist`'s annotation layer and cross-matched by coordinate against the
> page's own text layer to confirm every label. Models 54 fields across the
> form's six lettered sections, four of which (A, B, D, E) the form's own
> instructivo names as always mandatory and two (C, capital; F, tax-regime
> election) as conditional on a Primera Categoría (first-category) filer,
> plus a first-category-only supplementary domicile block (property
> ownership status, an optional postal-box address, and an optional urban/
> rural property address) — encoded via three `exclusivityGroups` and a
> web of `visibleWhen`/`requiredWhen` conditions. Deliberately does not model
> the live, ClaveÚnica-gated online-filing wizard itself, the >800-entry
> external SII economic-activity-code catalog the form only references, or
> the activity-specific supporting-document requirements for transport/
> mining special cases — see the document's own VERIFICATION.md for the full
> candidate comparison and ten other disclosed judgment calls, including a
> genuine AcroForm field-name collision (`comuna` reused across two visually
> distinct address blocks) resolved by disambiguating into two schema
> fields. This opens Chile with 1 of its 6 verticals; Passport, DMV, Taxes,
> Visa, and National ID are all open, unscreened-or-lightly-screened backlog
> candidates for future cycles.

> **Update (2026-07-07, GOV-1616):** Colombia gains
> `co/registraduria/duplicado-cedula-ciudadania`, closing its 6th and final
> vertical (National ID & Civic Documents) — the first non-original
> jurisdiction in this registry to reach 6/6. Three prior `GovSchema
> Standard Research` cycles (GOV-1567, GOV-1595, GOV-1602) had each screened
> this exact gap and stopped at the same wall: `www.registraduria.gov.co`
> (the Registraduría Nacional del Estado Civil's main domain) returns HTTP
> 403 to every direct fetch. This cycle found the actual online
> "Duplicado de Cédula en Línea" application runs on a distinct,
> unblocked subdomain, `epagos.registraduria.gov.co` — the same file path
> the main domain 403s returns HTTP 200 there, and a Cancillería-affiliated
> consulate site independently corroborates the same URL as the live
> channel. Sourced from a combination of that subdomain's own live,
> unauthenticated HTML (the Registro/account-creation screen — read
> directly via `curl`, no rendering needed) and its own official RNEC PDF
> user manual (the downstream "Iniciar Pago" wizard: Datos Básicos, Datos
> de Contacto, Trámite, Preguntas de Seguridad, Registraduría de Entrega,
> Confirmar Pago, and the PSE online payment), both independently re-fetched
> and re-rendered by this reviewer rather than taken on trust from an
> initial scouting pass. Models 24 fields across 6 steps plus the PSE
> payment obligation, scoped to an adult Cédula de Ciudadanía holder whose
> current card is the post-2019 "cédula amarilla con hologramas" — a
> 2026-only eligibility gate confirmed live in a dated site modal that the
> 2018 sourcing PDF never mentions at all. Deliberately does not model
> account username/password creation (auto-generated, emailed), the Tarjeta
> de Identidad (minor's ID) duplicate pathway the Registro screen's own
> dropdown supports but no downstream screen confirms, the third-party PSE
> bank-payment pages, the emailed claim receipt, or the separate
> status-lookup tool — see the document's own VERIFICATION.md for the full
> sourcing record, a confirmed 2018-to-2026 site change (two phone fields
> removed from the Registro screen), and every other disclosed judgment
> call. This closes the global National ID & Civic Documents vertical to
> **16/19 jurisdictions (84%)**, up from 15/19; Brazil, Indonesia, and
> Mexico remain the only open gaps, each previously confirmed weak
> (in-person/biometric-only or decree-only, not a fully dead end).

> **Update (2026-07-07, GOV-1609):** Colombia gains
> `co/cancilleria/passport-citizen-data-registration`, giving it a 5th vertical
> (Passport) alongside DMV (GOV-1567), Business Formation (GOV-1588), Taxes
> (GOV-1595), and Visa (GOV-1602). A prior cycle (GOV-1595) had screened
> Colombia's Passport candidate and found only
> `tramitesmre.cancilleria.gov.co/tramites/enlinea/pasaporte/solicitar.xhtml`
> — a narrow, ~15-field, renewal/change-only form with one AJAX-gated dropdown
> (`inputMotivoSolicitud`), left open as a weak backlog candidate. This cycle
> re-confirmed that finding still holds (replayed the live PrimeFaces AJAX
> call directly; the dropdown still ships empty) but found a second, distinct,
> and substantially richer Passport-process form the prior screening had not
> examined: `registrarCiudadano.xhtml` ("Registro de Ciudadano"), the online
> citizen-data-registration step every passport applicant — first-time or
> renewing — completes before finishing the process in person at a Cancillería
> office. Sourced primarily from the live form's own initial panel
> (unauthenticated, no bot-mitigation gate, confirmed live) cross-checked
> against a 2018-dated Cancillería "Guía de Usuario" walkthrough PDF that
> documents the form's full downstream flow (the guide's own footer names the
> exact live URL this cycle independently reconfirmed still resolves in 2026).
> Models 43 fields across 7 sections — document identification, personal data,
> birth data, residence/contact data, an optional emergency-contact block,
> academic background, and a security question — scoped to a Colombian
> national adult applicant (Cédula de Ciudadanía). Deliberately does not model
> the Tarjeta de Identidad/Registro Civil minor-applicant pathways, the
> downstream `solicitar.xhtml` reason/office-selection step (left open, per
> GOV-1595's own screening), or the in-person finalization (original document
> presentation, photograph, fingerprints, signature) — see the document's own
> VERIFICATION.md for the full sourcing record, the guide-vs-live cross-check
> table, and every disclosed judgment call, including a genuine site change
> since 2018 (`fechaNacimiento` relocated into the form's first panel) and one
> newly-added enum value (`LICENCIA DE CONDUCCIÓN` added to `tipoDocumento`).
> This gives Colombia 5 of its 6 verticals; only National ID/Civic Documents
> remains open. Colombia's Passport vertical now stands at 18/19 jurisdictions
> globally (up from 17/19).

> **Update (2026-07-07, GOV-1602):** Colombia gains
> `co/cancilleria/visa-application-individual`, giving it a 4th vertical
> (Visa) alongside DMV (GOV-1567), Business Formation (GOV-1588), and Taxes
> (GOV-1595). The prior cycle that closed Taxes had screened Colombia's Visa
> channel and found the live SITAC wizard
> (`tramitesmre.cancilleria.gov.co/tramites/enlinea/solicitarVisa.xhtml`)
> bot-mitigation-gated to a direct fetch — reconfirmed this cycle (HTTP 200
> but a non-interactive `TSPD` challenge-script page, no form markup). Rather
> than treat that as settled, this cycle searched independently and found a
> second, distinct source the prior screening had not identified: the
> Cancillería's own "Guía de Usuario: Solicitar Visa en línea" (SITAC), a
> 47-page, screenshot-driven, field-by-field walkthrough of the exact same
> wizard, hosted directly and unauthenticated on `cancilleria.gov.co`. Models
> 58 fields across the wizard's six tabs (Solicitud, Solicitante, Visa,
> Otros, Soportes, Confirmación) for an Individual applicant acting as their
> own visa's Titular Principal — either directly or through an apoderado —
> including four genuine two-value enums sourced from the guide's own prose
> bullet-point definitions (`solicitudDe`: Visa/Traspaso; `tipoSolicitud`:
> Individual/Grupo Familiar; `tipoSolicitante`: Titular/Beneficiario;
> `tramitadaPor`: directly/apoderado), a three-value `tipoVisa` enum sourced
> from the guide's own §4.1 reference-table section headers (Visitante/
> Migrante/Residente), and 6 supporting documents. Deliberately scopes out
> the Grupo Familiar and Beneficiario pathways and the ~38-value `actividadVisa`
> taxonomy's own per-activity Información Laboral field variations (the
> guide's own §4.1 table spans 8 dense pages) in favor of the generic
> visa-type-independent fallback field set the guide itself defines — see the
> document's own VERIFICATION.md for the full candidate comparison (Colombia's
> Passport and National ID gaps were also re-screened this cycle and remain
> open backlog candidates) and every disclosed judgment call, including a
> worked-example inconsistency in the source itself (the guide's own Sección
> Visa screenshot shows a field a Titular applicant's own reference table
> does not name) preserved as a disclosed discrepancy rather than silently
> resolved. This gives Colombia 4 of its 6 verticals; Passport and National ID
> remain open. Colombia's Visa vertical now stands at 16/19 jurisdictions
> globally (up from 15/19).

> **Update (2026-07-07, GOV-1595):** Colombia gains
> `co/dian/declaracion-renta-personas-naturales-formulario-210`, giving it a
> 3rd vertical (Taxes) alongside DMV (GOV-1567) and Business Formation
> (GOV-1588). Sourced from DIAN's own published Formulario 210 instructivo
> (the annual individual income tax return for resident natural persons), a
> genuine, unauthenticated, text-layer PDF with a full casilla-by-casilla
> field-level walkthrough, no login/CAPTCHA/WAF gate — screened this cycle
> against Colombia's other two open candidates (Cancillería Passport
> renewal, ~15 fields, narrow in-person-first-time scope; Cancillería Visa,
> real fields locked behind a live AJAX wizard session) and found strongest.
> Models 132 fields across the return's full structure: declarant/patrimonio
> data, the four cédula general sub-schedules (Rentas de trabajo, Rentas de
> trabajo no laboral, Rentas de capital, Rentas no laborales), cédula de
> pensiones, cédula de dividendos y participaciones, ganancias ocasionales,
> the private tax computation/discounts/anticipo-retenciones-saldo blocks,
> and the signature/accountant block — extracted via a left/right
> coordinate-column split (pdfjs-dist glyph x/y-coordinates) after a naive
> single-stream text join jumbled the instructivo's own two-column page
> layout around casillas 108-123. A second, independently spawned research
> pass visually rendered the printed form grid and confirmed casillas 2, 3,
> 11 and 13-23 do not exist on this form edition at all (not merely
> undocumented) and found casilla 983 (professional card number), a
> visual-only field with no instructivo narrative, now modelled on that
> basis. Colombia's remaining open verticals are Passport, Visa, and
> National ID/Civic Documents. This closes the global Taxes vertical to
> **19/19 jurisdictions (100%)** — see the document's own VERIFICATION.md
> for the full scope disclosure and every judgment call, including one
> flagged as genuinely uncertain (casilla 111's formula, reproduced verbatim
> from the source despite reading as dimensionally unusual).

> **Update (2026-07-07, GOV-1588):** Colombia gains
> `co/rues/matricula-mercantil`, closing its Business Formation gap and
> giving the registry's newest (19th) jurisdiction its 2nd vertical
> (alongside DMV, `co/runt/formulario-solicitud-tramites-vehiculo`,
> GOV-1567). Sourced from RUES's (Registro Único Empresarial y Social)
> shared registration form, scoped to its Registro Mercantil track — the
> mercantile/company registration process Colombia's Cámaras de Comercio
> (Chambers of Commerce) operate nationwide under a unified format the
> Superintendencia de Industria y Comercio (SIC) sets via its Circular
> Única. Extracted from two independently corroborating PDFs: SIC's own
> published instructions (the regulator's unified-format circular,
> `Anexo_4_1_INSTRUCCIONES_FORMULARIOS_RUES.pdf`) and the actual fillable
> two-page form template mirrored on a Chamber of Commerce site, cross-read
> at the glyph-coordinate level to correctly separate the form's three
> parallel registry tracks (Registro Mercantil / Registro Único de
> Proponentes / Entidades sin Ánimo de Lucro) printed side by side on the
> same page — a naive line-grouped text read would have misattributed a
> `cancelación` procedure option from the neighbouring Proponentes column
> onto Registro Mercantil, which does not have one. Scoped deliberately to
> just the core two-page Registro Mercantil form; RUES's other two parallel
> registry tracks and four additional annexes (establishment/branch
> registration, multi-year-overdue renewal, tourism-operator registry,
> payroll-lending-operator registry) are explicitly out of scope — see the
> document's own VERIFICATION.md for the full scope disclosure and ten other
> judgment calls. This closes the global Business Formation vertical to
> **19/19 jurisdictions (100%)**. Colombia's remaining open verticals are
> Passport, Visa, Taxes, and National ID/Civic Documents.

> **Update (2026-07-07, GOV-1581):** Indonesia gains
> `id/imigrasi/evisa-visitor-visa-application`, closing the registry's own
> longstanding Visa-vertical gap for Indonesia (previously flagged across
> three prior cycles — GOV-1560, GOV-1567, GOV-1574 — as "ready-to-author
> backlog", blocked only by the official Ditjen Imigrasi "User Manual e-Visa"
> PDF's own "Fill Form → Personal Information" screen rendering as an
> unlabelled wireframe with no field labels at any resolution, reconfirmed
> again this cycle). This `GovSchema Standard Research` cycle found a second,
> independent source that resolves the gap: a US college's own study-abroad/
> international-programs office (Principia College, Elsah, Illinois) publishes
> a genuine, full-resolution walkthrough of the same live `evisa.imigrasi.go.id`
> platform, filled with a real worked B1 – 30 Day Visitor-visa example for a
> study-abroad cruise itinerary, showing every "Fill Form" field's actual
> on-screen label, required/optional marking, and dropdown/radio option
> values. Scoped to the General/Family/Social → B1 Visitor-visa pathway only;
> the official manual's own worked example follows a different, more complex
> Golden Visa/Investment top-level branch (with its own extra investor-type
> sub-classification and multi-year stay options) that neither source used
> here walks field-by-field, left out of scope for this v1.0.0 — see the
> document's own VERIFICATION.md for this and every other disclosed judgment
> call. This gives Indonesia 5 of its 6 verticals (DMV, Business Formation,
> Taxes, Passport, Visa); National ID (Dukcapil KTP-el/NIK) remains its only
> open vertical, still confirmed in-person/biometric-only with no online
> channel (GOV-1560). Indonesia's Visa vertical now stands at 15/19
> jurisdictions globally (up from 14/19).

> **Update (2026-07-07, GOV-1574):** Indonesia gains
> `id/imigrasi/passport-application-first-adult`, closing Indonesia's
> Passport-vertical gap and giving the jurisdiction 4 of its 6 verticals
> (DMV, Business Formation, Taxes, Passport). This is a `GovSchema Standard
> Research` cycle: the issue brief's own named candidates (DE Steuer-ID, SG
> NRIC loss/damage + re-registration, NZ RealMe) were re-checked first and
> found already published (`de/finanzamt/tax-identification-number`,
> `sg/ica/identity-card-replacement` + `sg/ica/identity-card-reregistration`,
> `nz/dia/realme-verified-identity`); a "remaining voter registration"
> candidate — Colombia's Registraduría overseas online voter-registration
> microsite (`inscribeteonline2026.registraduria.gov.co`) — was found to no
> longer resolve (its registration windows for Colombia's 2026 elections
> have closed), logged below as a dead-for-now candidate. Indonesia's own
> Passport gap, flagged as "ready-to-author backlog" by the immediately
> prior cycle (GOV-1567), was picked up instead: sourced from Ditjen
> Imigrasi's own official "User Guide M-Paspor" (V.1.0, Juni 2026), a
> 31-page screenshot-driven walkthrough of the live M-Paspor app hosted
> unauthenticated on a regional (Batam) immigration-office subdomain (the
> main `imigrasi.go.id` copy remains CloudFront-blocked). Scoped to an adult
> (Dewasa) applicant applying for the first time (never previously held an
> ordinary passport), through either the Reguler or Percepatan service tier
> — confirmed, via the guide's own interchanged screenshots across both
> tiers' identical downstream screens, to share one form. The renewal/
> replacement pathway (for an applicant who answers "Sudah" to having
> already held a passport), the child/minor (Anak-anak) applicant pathway,
> and the payment step (no base PNBP fee amount is stated anywhere in the
> 31-page guide) are explicitly out of scope for this v1.0.0 — see the
> document's own VERIFICATION.md for these and seven other disclosed
> judgment calls. Indonesia's remaining open vertical is National ID
> (Dukcapil KTP-el/NIK), still confirmed in-person/biometric-only with no
> online channel (GOV-1560).

> **Update (2026-07-07, GOV-1567):** Colombia opens as the registry's **19th
> jurisdiction** with `co/runt/formulario-solicitud-tramites-vehiculo`
> (DMV) — the "Formulario de Solicitud de Trámites del Registro Nacional
> Automotor", the standard nationwide form through which any of Colombia's
> decentralised local transit authorities (organismos de tránsito) takes an
> owner's request for any of eighteen vehicle-registry procedures (first
> registration, ownership transfer, plate/colour/service changes, engine
> re-stamping, lien registration, and more) feeding the single Registro Único
> Nacional de Tránsito (RUNT). Sourced directly from RUNT's own `.xls` form
> at `runt.gov.co` (no login/CAPTCHA/WAF; re-fetched twice and confirmed
> byte-identical) and cross-checked against identical PDF mirrors on several
> municipal transit-authority `.gov.co` sites. This `GovSchema Standard
> Research` cycle first re-examined DIAN's RUT (Formulario 001,
> `dian.gov.co`) — flagged by a prior cycle (GOV-1444) as a viable-but-weak
> Business Formation candidate for a future Colombia-opening cycle — and
> confirmed it is still not improved: three of its six sub-sections remain
> explicitly unbounded repeating groups. RUNT's form was found instead and
> is materially stronger on this registry's own bar: fully bounded (zero
> unbounded repeating sections), minimal external code-table dependence, and
> a single static two-page layout. Independent review (GOV-1570) confirmed
> the import/auction sub-table's exact structure against the source
> spreadsheet's own merged cells and an official PDF mirror, fixing a missing
> field (`importOrAuctionDocumentType`); the meaning of a `Fecha` field beside
> the owner's document number remains an unconfirmed, disclosed judgment call
> — see the document's own VERIFICATION.md. This
> same cycle's research phase also re-screened Indonesia's own Passport and
> Visa gaps (both previously logged as "not viable" by GOV-1560) and found
> **both have reversed to viable, well-sourced candidates**: Indonesia's
> Passport gap (M-Paspor app) now has a genuine official, versioned,
> screenshot-driven user guide (`M-Paspor_UserGuide_V3.pdf`) hosted
> unauthenticated on a regional Ditjen Imigrasi subdomain
> (`batam.imigrasi.go.id`) — the main `imigrasi.go.id` domain's own guide
> remains CloudFront-blocked, but this regional mirror is not; and
> Indonesia's Visa gap (`evisa.imigrasi.go.id`) — previously blocked only by
> its official User Manual's "Fill Form" Personal Information step rendering
> as an unlabelled wireframe — now has its real field labels (Full name,
> Sex, Place/Date of Birth, Document Type/No./Nationality, Address in
> Indonesia, etc.) corroborated by a third-party study-abroad office's own
> published walkthrough showing a genuine live capture of the same portal
> filled with a real worked example. Neither was authored this cycle (one
> Colombia schema is this cycle's single deliverable); both are logged below
> as ready-to-author backlog for an immediate follow-up cycle — see "Known
> Gaps" below and each vertical's own section for the full record.

> **Update (2026-07-07, GOV-1560):** Indonesia gains a third vertical,
> `id/djp/annual-individual-income-tax-return-1770s` (Taxes) — Form 1770 S,
> the annual individual income tax return for a resident taxpayer with
> salaried income from one or more employers plus other domestic/final-tax
> income, filed through the Direktorat Jenderal Pajak's (DJP) own e-Filing
> web application (`djponline.pajak.go.id`). This `GovSchema Standard
> Research` cycle screened Indonesia's four remaining vertical gaps
> (Passport, Visa, Taxes, National ID) before picking this one: **Passport**
> (Direktorat Jenderal Imigrasi's M-Paspor app) is sourceable only via
> secondary checklist-level how-to articles, no field-level walkthrough
> found; **Visa** (`evisa.imigrasi.go.id`) has a genuine official "User
> Manual e-Visa" PDF (no login/CAPTCHA/WAF) that is well-sourced for its
> visa-type-selection wizard and payment step, but its core "Fill Form"
> Personal Information block is rendered only as an unlabelled wireframe
> diagram with no field labels at any resolution — left open as the
> strongest remaining Visa candidate, not a dead end; **National ID**
> (Dukcapil KTP-el/NIK) is confirmed in-person/biometric-only with no online
> application channel, mirroring Mexico's CURP and Brazil's CIN precedent.
> **Taxes** was picked instead: DJP's own official "Modul Pengisian SPT
> Tahunan e-Filing Orang Pribadi 1770S" guide (directly downloadable from
> `pajak.go.id`, no login/CAPTCHA/WAF) is a genuine 46-slide, field-by-field
> screenshot walkthrough of the live e-Filing wizard, carrying a single
> worked example (taxpayer "Nn Shinta", tax year 2022) end to end from login
> through the final submission receipt — the strongest single source found
> this cycle, comparable in shape to `ph/bir/annual-income-tax-return-1701a`
> and `br/rfb/individual-income-tax-return-irpf`. Scoped to the wizard's own
> "SPT 1770 S dengan bentuk formulir" (structured-form) pathway; the
> alternative guided-interview and bulk-upload entry modes, the account
> login/CAPTCHA screen, the e-mail/SMS verification-code exchange used only
> to authorize submission, and every DJP-calculated subtotal/outcome field
> (Penghasilan Neto totals, Penghasilan Kena Pajak, PPh Terutang, Jumlah
> Kredit Pajak, and the final Nihil/Kurang Bayar/Lebih Bayar status) are
> explicitly out of scope for this v1.0.0 — see the document's own
> VERIFICATION.md for these and several other disclosed judgment calls,
> including six dropdown fields modelled as open strings rather than
> fabricated enums since DJP's own guide shows at most one example option
> for each. This gives Indonesia 3 of its 6 verticals (DMV, Business
> Formation, Taxes); Passport, Visa, and National ID remain open backlog
> candidates for a future cycle (Visa the strongest of the three).
>
> **Update (2026-07-07, GOV-1553):** Indonesia's DMV vertical opens with
> `id/korlantas/international-driving-permit-registration` — registration for
> a new or renewed Surat Izin Mengemudi Internasional (International Driving
> Permit, 1968 Vienna Convention on Road Traffic, Annexe 7), sourced from
> Korlantas POLRI's (Traffic Police Corps of the Indonesian National Police)
> own live, unauthenticated online registration portal
> (`siminternasional.korlantas.polri.go.id`), whose static HTML embeds the
> full "Registrasi SIM Internasional" form markup — field names, labels, and
> dropdown option lists read directly from the page's own `<input>`/
> `<select>` tags, not a screenshot or paraphrase. Two stronger-looking
> candidates were screened first and found genuinely weaker: first-time
> national SIM issuance's own governing regulation (Peraturan Kepolisian No.
> 5 Tahun 2021, retrieved directly from `korlantas.polri.go.id`, no
> login/CAPTCHA/WAF) carries no attached application-form lampiran, and its
> only online channel (the "Digital Korlantas POLRI" mobile app) is
> login/NIK/biometric-gated with no downloadable user guide found; vehicle
> registration's own governing regulation (Peraturan Kepolisian No. 7 Tahun
> 2021) attaches only a province vehicle-plate-code lookup table as its
> lampiran, not an application form, and its citizen-facing guidance page is
> checklist-level prose with no field-by-field detail. This closes
> Indonesia's DMV vertical (its 2nd of 6 verticals modelled, after Business
> Formation, GOV-1546) and, since Indonesia was the only jurisdiction
> lacking a DMV-vertical schema, closes the **global DMV vertical to 18/18
> jurisdictions (100%)**. Two fields (`appointmentDate`, `paymentMethod`) sit
> inside `style="display:none"` containers in the source's own static markup
> and two supporting documents (`kitap`, `existingInternationalLicence`) are
> modelled as conditionally required by their own label text rather than a
> fabricated gating field the live form does not expose — see the document's
> own VERIFICATION.md for these and other disclosed judgment calls.

> **Update (2026-07-07, GOV-1546):** Indonesia opens as the registry's
> **18th jurisdiction** with `id/bkpm/oss-nib-registration-individual-umk`
> (Business Formation) — the Business Identification Number (Nomor Induk
> Berusaha, NIB) registration for an individual Micro/Small Business (UMK)
> actor through the Online Single Submission Risk-Based Approach system
> (OSS RBA, `oss.go.id`), operated by the Ministry of Investment and
> Downstream Industry / Investment Coordinating Board (BKPM). This research
> cycle first re-confirmed the task brief's own named National ID targets
> (DE Steuer-ID, SG NRIC loss/damage/re-registration, NZ RealMe) were already
> published (`de/finanzamt/tax-identification-number`,
> `sg/ica/identity-card-reregistration`, `nz/dia/realme-verified-identity`),
> and re-screened the UAE Passport gap (unchanged, still checklist-level
> only — see GOV-1533's own note below), before picking Indonesia — a
> candidate this catalog's own "Known Gaps" section had explicitly flagged
> as worth scouting. Sourced from BKPM's own official "Individual UMK
> Licensing through OSS Indonesia Application" guide, a genuine 20-step,
> English-language, screenshot-driven walkthrough of the OSS Indonesia
> mobile app, directly downloadable from `oss.go.id`'s own CDN with no
> login/CAPTCHA/WAF gate. Scoped to a single natural-person applicant
> registering under the UMK (capital ≤ Rp5 billion) pathway with exactly one
> KBLI business-activity code and one product/service line; the Non-UMK/
> legal-entity (PT/CV/Yayasan) registration pathway, and the wizard's own
> repeatable "add another KBLI"/"add another product" actions, are out of
> scope for this v1.0.0 — see the document's own VERIFICATION.md for this
> and eight other disclosed judgment calls, including one screen whose
> second input's visible placeholder text does not match its own section
> header (flagged, not silently corrected).
>
> **Update (2026-07-07, GOV-1540):** The United Arab Emirates gains
> `ae/rakez/free-zone-establishment-registration` (Business Formation),
> closing the **global Business Formation vertical to 17/17 jurisdictions
> (100%)** — the last vertical gap standing at less than full coverage. A
> prior cycle (GOV-1289) had rated UAE Business Formation WEAK
> (mainland DED and RAKEZ's own `eportal.rakez.com` client portal are both
> authenticated-account-gated) and it was never re-screened. This cycle
> found a different source shape: the Ras Al Khaimah Economic Zone
> Authority's (RAKEZ) own "Application for Registration and Licence of a
> Free Zone Establishment or Company", Issue No. 03 (Feb 18, 2016, Ref:
> LCN-019(A)) — a genuine fillable AcroForm PDF with ~100 real named field
> widgets, hosted directly on `rakez.com` with no login/CAPTCHA/WAF gate,
> and still cross-referenced from RAKEZ's own current (2017-dated, RAKEZ-
> branded) new-registration checklist as a currently-accepted submission
> channel alongside the Client Portal. Modelled as a subnational (`AE-RK`)
> schema, since company registration in the UAE's free zones is
> administered per free-zone authority, not federally — the same pattern
> as this registry's other emirate-level AE schemas (`ae/rta`, `ae/icp`).
> Scoped to the single-shareholder Free Zone Establishment (FZE) / multi-
> shareholder Free Zone Company (FZC) pathway, modelling the first of up to
> five shareholders per this registry's repeating-group convention; the
> separate detailed application form required for Industrial-activity
> licenses, and the post-approval Memorandum of Association/Lease
> Agreement/Personnel Secondment Agreement execution steps, are out of
> scope for this v1.0.0 — see the document's own VERIFICATION.md for this
> and five other disclosed judgment calls, including a caught-and-fixed
> `requiredWhen`/`notEquals` gate that would have misfired against this
> registry's own previously-documented sentinel-default bug class. This
> gives the United Arab Emirates 5 of its 6 verticals (Passport remains
> open-but-weak per GOV-1533).
>
> **Update (2026-07-07, GOV-1533):** Ireland gains
> `ie/dttas/learner-permit-application` (DMV sub-process), sourced from
> NDLS's own "Application Form for a Learner Permit" (D201, March 2020
> edition), cross-checked against the RSA's own current "Apply for your
> first permit" guidance page. This fills the specific gap
> `ie/dttas/driving-licence-renewal`'s own description had explicitly
> disclosed and left open — "It does not model a first-time driving licence"
> — Ireland's entry point into its graduated driver-licensing system (a
> driver theory test pass is a hard prerequisite; the permit must then be
> held six months before a driving test can be sat). This research cycle
> also re-attempted the United Arab Emirates' Passport gap a prior cycle
> (GOV-1474) had explicitly flagged as worth a deeper pass: a full page-by-page
> re-read of both ICP Smart App manuals (72 and 57 pages) and a 230-page ICP
> "Guide for Services" PDF confirmed passport fields appear only inside the
> already-modelled Emirates ID Replace flow, and the dedicated "Issuance of
> Passport"/"Renewal of A Passport" service cards remain checklist/fee-schedule
> prose, not a field-by-field form — UAE Passport remains open but weak, not
> picked this cycle (see `ie/dttas/learner-permit-application`'s own
> VERIFICATION.md for the full research trail). Scoped to the D201 form's own
> "First time learner permit application" pathway (option 1 of 7); the other
> six application-type values sharing the same form (renewal, add/remove
> category, replace lost/stolen/damaged, personal-detail change, category
> upgrade for existing full-licence holders) are captured as a closed enum
> without full field/document-level scoping, mirroring the
> `ph/lto/drivers-license-application` and `kr/koroad/driving-licence-application`
> precedent for other multi-transaction-type forms in this registry.
>
> **Update (2026-07-06, GOV-1526):** Brazil gains a fourth vertical,
> `br/mg/detran/comunicacao-de-venda-de-veiculo` (DMV), closing the
> **global DMV vertical to 17/17 jurisdictions (100%)** — the last vertical
> gap standing at less than full coverage. Sourced from the Departamento
> Estadual de Trânsito de Minas Gerais's (DETRAN-MG) own "Requerimento de
> Comunicação de Venda" (dated 2026-01-29), a directly downloadable,
> current, genuine text-layer PDF (no login/CAPTCHA/WAF), the seller-side
> notice of vehicle sale required under art. 134 of the Código de Trânsito
> Brasileiro to record the buyer against the vehicle in DETRAN-MG's registry
> and release the seller from ongoing civil/criminal liability. A prior
> cycle (GOV-1519) had explicitly re-screened Brazil's DMV gap and left it
> open, not a dead end, after rejecting a stale 2012 DETRAN-ES
> staff-procedures manual and the system-generated (non-applicant-fillable)
> ATPV-e ownership-transfer output; this cycle re-confirmed both of those
> rejections directly (via PDF metadata and a fresh text extraction) and
> instead found DETRAN-MG's own dedicated, current form via a broader
> per-state DETRAN search — cross-checked against an older (2022) edition
> of the same form for field-set stability, and against DETRAN-MG's own
> explanatory "Cartilha" booklet for legal/procedural context. DETRAN-MG's
> live online filing channel (`protocolo.detran.mg.gov.br`) redirects to an
> authenticated-citizen-login gate on every path tried, consistent with
> every other Brazilian DETRAN online channel screened in prior cycles, so
> this document is sourced from the static PDF, not a live wizard walk.
> Modelled as a subnational (`BR-MG`) schema, mirroring the `br/sp/jucesp`
> and `mx/semovi` precedent, since vehicle registration in Brazil is
> administered per state DETRAN, not federally. This document deliberately
> scopes to the seller's sale-notification filing only — the buyer's
> separate notarized CRV/ATPV-e transfer paperwork remains unsourced (the
> ATPV-e is system-generated, and no legible CRV reverse-side specimen was
> found), and the buyer's own follow-on in-person registration step is a
> distinct, non-form-based procedure — see the document's own
> VERIFICATION.md for this and four other disclosed judgment calls, plus a
> mock sale-notification packet independently checked against every field's
> validation rule. This gives Brazil 4/6 verticals (Business Formation,
> Passport, Taxes, DMV); Visa remains a confirmed dead end (GOV-1428) and
> National ID (Carteira de Identidade Nacional) remains an open-but-weak
> backlog candidate.
>
> **Update (2026-07-06, GOV-1519):** The Philippines gains a sixth and final
> vertical, `ph/lto/drivers-license-application` (DMV), closing **PH to 6/6
> verticals** and the global DMV vertical to **16/17 (94%)**. Sourced from the
> Land Transportation Office's own gazetted Form No. 21 (v3, September 2023
> edition), "Application for Student Driver's Permit / Driver's License /
> Conductor's License" — the exact document a prior cycle (GOV-1466) had
> already found but explicitly flagged as weak: "only fetchable via a
> third-party CDN mirror since `lto.gov.ph` itself is Cloudflare-gated on
> every path tried." This cycle reconfirmed that gate on both `lto.gov.ph`
> and a second first-party candidate (`officialgazette.gov.ph`'s 2014
> edition of the same form, also 403), then resolved it via the Wayback
> Machine — recovering a 2024-12-11 snapshot of the exact same file at its
> exact same first-party `lto.gov.ph` upload path, the same technique already
> proven for `mx/semovi/alta-vehiculo-foraneo`. The PDF carries a genuine text
> layer (no AcroForm widgets; confirmed via `pdfjs-dist`); a page-render
> attempt lost many glyphs to an embedded-font error, so fields were instead
> recovered via a per-glyph x/y coordinate dump grouped into text rows. Models
> the form's Type A ("new") SP/DL/CL pathway in full, including the
> nine-category vehicle-classification table and the five driving-condition
> declarations; the other ten `typeOfApplication` transaction types are
> captured as a closed enum without full field-level scoping, mirroring
> `kr/koroad/driving-licence-application`'s precedent. A mock application
> packet (`conformance/ph/lto/drivers-license-application/1.0.0/`) exercises
> six requiredWhen branches. See the document's own VERIFICATION.md for seven
> disclosed interpretive judgment calls, including that its `documents[]`
> list is sourced only from secondary aggregator pages since the form itself
> carries no itemized documentary checklist. This closes the Philippines to
> 6/6 verticals — the only jurisdiction, alongside every other in this
> registry except Brazil, with full six-vertical coverage; Brazil's DMV
> (RENAVAM/vehicle registration) remains the global vertical's last open gap,
> re-screened this cycle (a Brazilian-state DETRAN staff-procedures manual was
> found genuinely downloadable but is a stale 2012 internal-norms document,
> not an applicant-facing field-level form; the ATPV-e ownership-transfer
> document is itself system-generated output, not a fillable public
> application) and left open, not a dead end.
>
> **Update (2026-07-06, GOV-1512):** The United Arab Emirates gains a fourth
> vertical, `ae/rta/vehicle-registration-renewal` (DMV), closing the specific
> gap this catalog's own "Known Gaps" section had flagged as the UAE's
> strongest remaining candidate: "RTA's 'Vehicle Renewal User Guide' is a
> strong, field-rich candidate but only confirmed via a third-party mirror,
> not the current `rta.ae` URL" (GOV-1474). This cycle re-searched for that
> guide and instead located a different, official, first-party PDF hosted
> directly on `rta.ae` itself — the Roads and Transport Authority's own
> April-2018 "Renew Vehicle Ownership User Manual" — confirmed HTTP 200,
> no login/CAPTCHA/WAF gate, resolving the exact provenance weakness the
> prior cycle's note flagged, even though it is a narrower/older capture than
> the still-third-party-mirror-only 68-screenshot guide. Since the manual's
> own PDF text layer carries only narrative step captions, not field labels,
> each English page was rendered to a high-resolution PNG (`pdfjs-dist` +
> `node-canvas`, up to 6x native scale) and read visually rather than
> text-extracted. This modelled the applicant-facing renewal wizard: terms
> acceptance, optional paid plate-number/plate-design changes, a three-way
> delivery-method choice (courier/RTA office/kiosk) each with its own
> delivery-or-collection detail fields, and the renewal fee payment — while
> deliberately excluding the vehicle's insurance/inspection/mortgage status
> (system-displayed and auto-checked from RTA's own records, not
> applicant-declared, unlike the guidance-page-derived
> `sg/lta/road-tax-renewal`'s declaration fields) and the account-login/
> vehicle-selection step. Five fields in the "Delivery Contact Information"
> block (`mobileNumber`, `landlineNumber`, `poBoxNumber`, `email`,
> `confirmEmail`) have no legible on-screen label anywhere in the source at
> any resolution tried and were inferred from the sample values' own format
> (UAE mobile/landline digit patterns, a type-and-retype email pair) —
> flagged as this document's weakest-sourced part and its top priority for
> an independent reviewer; see the document's own VERIFICATION.md for this
> and seven other disclosed judgment calls, plus three independently-checked
> mock renewal scenarios (one per delivery method) confirming the
> `requiredWhen` gating logic behaves as documented. This gives the UAE 4/6
> verticals (Taxes, Visa, National ID, DMV); Passport and Business Formation
> remain open (Passport weaker/unsourced; Business Formation a confirmed
> dead end absent new sourcing — both per GOV-1474's own screening).
>
> **Update (2026-07-06, GOV-1504):** Mexico gains a fifth vertical,
> `mx/sre/passport-application` (Passport) — the Secretaría de Relaciones
> Exteriores' (SRE) Form OP-5, "Solicitud de pasaporte ordinario mexicano en
> las Oficinas Consulares," covering first-time (primera vez), renewal
> (canje), and replacement-for-loss/theft/damage (reposición) requests for an
> adult applicant filed at a Mexican consulate abroad. Prior cycles (GOV-1414,
> GOV-1428, GOV-1435) had explicitly deferred this vertical as "SRE passport
> (in-person appointment only)" — this cycle re-examined that assumption
> (every passport schema in this registry is ultimately an in-person
> biometric process; what had been missing was a genuine downloadable form,
> not an in-person-only disqualifier) and located Form OP-5 as a genuine,
> directly downloadable (two independent official mirrors, `gob.mx` and
> `sre.gob.mx`, both HTTP 200, no login/CAPTCHA/WAF), non-image text-layer
> PDF. Recovered all 25 numbered fields, including the dense five-column
> "Filiación" (physical-description) checkbox grid, via per-glyph coordinate
> extraction to correctly attribute each option to its column — a full-page
> keyword scan also confirmed the source's `civilStatus` checkbox set
> genuinely offers only two options (Soltero(a)/Casado(a)), not omitted
> viudo(a)/divorciado(a) values. This document deliberately does not model
> the separate citas.sre.gob.mx online-appointment-booking flow's own
> account-registration/slot-selection logistics, the minor/incapacitated
> applicant path (Form OP-5's trámites B/D), or a differently-categorized
> "Hoja de Datos Complementarios" supplementary sheet encountered during
> research whose newer-looking trámite categorization was not merged into
> this schema to avoid an inconsistent hybrid source — six other judgment
> calls are disclosed in the document's own VERIFICATION.md for an
> independent reviewer. This closes Mexico to 5/6 verticals (Business
> Formation, Visa, Taxes, DMV, Passport); National ID (CURP, in-person
> biometric only) remains the last open-but-weak backlog candidate.

> **Update (2026-07-06, GOV-1497):** The Philippines gains a fifth vertical,
> `ph/dfa/passport-application` (Passport) — the Department of Foreign
> Affairs' Office of Consular Affairs (DFA-OCA) Online Passport Appointment
> System (`passport.gov.ph`), covering new, renewal, and lost/damaged
> applications for an adult applicant through a single unified wizard (like
> `br/pf/passport-application`, one `applicationType` field distinguishes the
> scenario rather than three separate forms). Prior cycles (GOV-1466,
> GOV-1490) had explicitly deferred this vertical because "the live wizard
> consumes genuinely scarce real DFA appointment inventory" — this cycle
> resolved that concern by extracting the full field-name inventory (48
> fields across Personal/Family/Application/Contact Information) from the
> hidden-input payload the Date and Time step already serves before any
> slot is selected, and deliberately stopped there: it did not solve the
> reCAPTCHA gate, submit a booking, or hold any site/date/time combination
> beyond the seconds needed to confirm a site had an open date during a
> 43-site availability sweep (most sites, including every Metro Manila
> office checked, were fully booked for months — corroborating the prior
> cycles' concern rather than dissolving it). Consequently, select-option
> lists (`sex`, `civilStatus`, `citizenshipBasis`, `applicationType`) and
> `required`/`requiredWhen` markers for the four applicant-data steps are
> inferred from field-name semantics, same-jurisdiction precedent
> (`ph/bi/non-immigrant-visa-application`), and corroborating DFA-affiliated
> public documentation — not independently confirmed against a live render.
> See this document's own VERIFICATION.md for the full itemized disclosure.
> This closes the Philippines to 5/6 verticals (Business Formation, National
> ID, Taxes, Visa, Passport); DMV remains the last open backlog candidate,
> previously screened (GOV-1466) and found weaker (LTO Form No. 21 is only
> fetchable via a third-party mirror since `lto.gov.ph` is Cloudflare-gated).

> **Update (2026-07-06, GOV-1490):** The Philippines gains a fourth vertical,
> `ph/bi/non-immigrant-visa-application` (Visa) — the Bureau of Immigration's
> own Consolidated General Application Form (CGAF) for Non-Immigrant Visa,
> Special Work Permit, and Provisional Work Permit (`BOC04.QF.002 Rev. Lev. 0`,
> effective 05 AUG 2024), covering conversion, extension, inclusion, and
> permit applications for a foreign national already present in the
> Philippines. Sourced directly from a genuine, directly downloadable,
> unblocked (no login/CAPTCHA/WAF) text-layer PDF on `immigration.gov.ph`'s
> own BI Forms page — this is the exact candidate the prior cycle's own
> catalog note (GOV-1466) had flagged as "a genuine, unblocked, directly
> downloadable candidate" left unpicked. This closes the Philippines to 4/6
> verticals (Business Formation, National ID, Taxes, Visa); Passport and DMV
> remain open backlog candidates, both previously screened (GOV-1466) and
> found weaker (Passport's live wizard consumes genuinely scarce real DFA
> appointment inventory; DMV's LTO Form No. 21 is only fetchable via a
> third-party mirror since `lto.gov.ph` is Cloudflare-gated). This document
> deliberately does not model the type-specific documentary checklists that
> vary per underlying visa/permit category (e.g. Conversion to Student Visa,
> Pre-arranged Employee Visa Commercial/Non-Commercial, SWP/PWP) — those are
> separate BI-published checklists this form itself does not enumerate — nor
> the physical ACR I-Card claim-stub's own representative/claimant sub-block,
> a downstream card-collection step distinct from filing the application; see
> the document's own VERIFICATION.md for these and five other disclosed
> judgment calls.

> **Update (2026-07-06, GOV-1483):** South Korea gains a sixth and final
> vertical, `kr/nts/corporation-establishment-and-business-registration`
> (Business Formation), closing **KR to 6/6 verticals** and the global
> Business Formation vertical to **16/17 (94%)**. Sourced from the National
> Tax Service's own gazetted Attached Form No. 73 of the Enforcement Rule of
> the Corporate Tax Act (법인세법 시행규칙 [별지 제73호서식], amended
> 2025-03-21) via `law.go.kr` — a directly downloadable, current, genuine
> text-layer PDF, no login/CAPTCHA/WAF, mirroring the sourcing shape already
> proven for `kr/koroad/driving-licence-application`. This
> `GovSchema Standard Research` cycle (GOV-1483) began with the task brief's
> own named "remaining voter registration" candidate, which resolves to
> Brazil and Mexico. **Brazil's TSE Título Net** self-service system is a
> genuine, fully-online first-time voter registration (alistamento
> eleitoral) — confirmed via a live, unauthenticated Playwright walk — but
> is nationwide-closed from **2026-05-07 to 2026-11-03** under art. 91 of
> the Lei das Eleições (Lei no. 9.504/1997), which bars any registration/
> transfer request within 150 days of an election (Brazil holds municipal
> elections in October 2026); a hard, dated, legally-mandated block, not a
> dead end, and not sourceable again until it reopens. Brazil's other
> standing gap, **DMV** (RENAVAM/vehicle registration), was also screened:
> DETRAN-SP's `e-crvsp.sp.gov.br` portal requires gov.br SSO login on every
> path tried, the same wall that already made `br/cnh` a confirmed dead end
> (GOV-1400); not pursued further. This cycle pivoted to South Korea's
> Business Formation gap, the only vertical it still lacked. See
> `kr/nts/corporation-establishment-and-business-registration`'s own
> VERIFICATION.md for the full sourcing method, the Brazil research trail,
> and every interpretive judgment call (this form's dense "법인성격"/
> Corporation Character classification matrix in particular, scoped to a
> domestic for-profit corporation for v1.0.0).
>
> **Update (2026-07-06, GOV-1474):** The United Arab Emirates gains a third
> vertical, `ae/icp/emirates-id-replacement` (National ID & Civic Documents),
> closing the global National ID & Civic Documents vertical to **15/17
> (88%)**. Sourced from the ICP (Federal Authority for Identity, Citizenship,
> Customs & Port Security) Smart App's own official "User Manual, English
> Version of the Application" — both the Citizen Category and Resident
> Category editions (v5.23) — a directly downloadable PDF (no login/CAPTCHA/
> WAF) that is genuinely screenshot-driven, read page-by-page by decompressing
> each page's embedded JPEG directly (zlib+DCTDecode) since the PDF's
> custom-subsetted fonts do not yield a legible text layer. The manual's
> worked example walks the "Replace Emirates ID" service (citizen pathway)
> end-to-end across 5 sub-steps plus attachments/review/payment; the sibling
> Resident Category manual's visually-identical "Renew Emirates ID" flow
> (confirmed to share the same UI components across steps 3-5) was used to
> corroborate one field not directly visible in the citizen capture's own
> cut-off screenshot (the Terms and Conditions checkbox) — see the document's
> own VERIFICATION.md for this and eight other disclosed judgment calls,
> including why neither manual's "Issue New Emirates ID" menu item is
> field-level sourceable (so this v1.0.0 is scoped to Replace/Renew, not
> first-time issuance). This `GovSchema Standard Research` cycle (GOV-1474)
> screened all four of the UAE's remaining vertical gaps before picking this
> one: **DMV** (RTA vehicle-registration renewal) is a strong open backlog
> candidate — a 24-page, 68-screenshot "Vehicle Renewal User Guide" was found
> and one screenshot confirmed genuine field-level UI, but only via a
> third-party mirror (the exact current `rta.ae` URL was not located this
> cycle, though sibling RTA guides at a similar path are still live,
> suggesting the source moved rather than vanished); **Passport** (ICP) is
> weaker — only a checklist-level service page and a 231-page per-service
> text catalog were found, with the same Smart App manual mentioning "Issue
> new passport" only as a menu action, never an expanded field wizard;
> **Business Formation** (DED/Basher/Invest in Dubai/MOEC) remains a
> confirmed dead end, re-checked this cycle with no new public source found
> (Basher requires UAE Pass login, `app.invest.dubai.ae` returns HTTP 403,
> `ded.ae` service pages fail with an active-bot-mitigation TLS error). The
> UAE now has 3/6 verticals (Taxes, Visa, National ID); DMV is the strongest
> remaining open candidate, Passport is a weaker backlog candidate, and
> Business Formation remains a dead end absent a new source.
>
> **Update (2026-07-06, GOV-1466):** The Philippines gains a third vertical,
> `ph/bir/annual-income-tax-return-1701a` (Taxes) — BIR Form 1701A, the
> annual income tax return for individuals earning income purely from
> business/profession, covering either the Optional Standard Deduction/
> graduated-rates method or the 8% flat-rate method. This closes the
> **global Taxes vertical to 17/17 jurisdictions (100%)**. Sourced from a
> genuine, directly downloadable, unblocked (no login/CAPTCHA/WAF) text-layer
> PDF on BIR's own CDN (`bir-cdn.bir.gov.ph`); the form carries no
> AcroForm/Widget field annotations, so digit-box counts (TIN, RDO Code,
> Number of Attachments) were confirmed via high-resolution Chromium renders
> rather than form-field metadata. This `GovSchema Standard Research` cycle
> (GOV-1466) screened all four of the Philippines' remaining vertical gaps
> before picking this one: **Passport** (`passport.gov.ph`, a live
> unauthenticated appointment wizard using the same DOM-walk technique
> already proven for `ph/comelec/overseas-voter-registration`) was set aside
> after its own live AJAX timeslot-availability endpoint returned genuinely
> scarce real inventory (e.g. "Available Slots: 1") for actual DFA
> appointment sites — walking further into the wizard to observe its
> personal-information fields would have required selecting and holding one
> of those real, limited slots, an unacceptable side effect on a live
> citizen-facing government booking system this cycle declined to cause; left
> as an open backlog candidate, not a dead end. **DMV** (`lto.gov.ph` LTO Form
> No. 21, Application for Driver's License) is a real text-layer PDF but only
> reachable via a third-party CDN mirror since `lto.gov.ph` itself is
> Cloudflare-gated on every path tried — a weaker provenance chain, left as an
> open backlog candidate. **Visa** (`immigration.gov.ph` Bureau of
> Immigration CGAF forms) is an equally strong, unblocked, directly
> downloadable PDF candidate, not picked this cycle only because closing
> Taxes closed a vertical globally to 100%; left as a strong open backlog
> candidate. See `ph/bir/annual-income-tax-return-1701a`'s own
> VERIFICATION.md for the full sourcing method and every disclosed
> interpretive judgment call (including Part III, Details of Payment, a
> repeating table deferred pending GSP-0009). The Philippines now has 3/6
> verticals (Business Formation, National ID, Taxes); Passport, DMV, and Visa
> remain open backlog candidates for a future cycle.
>
> **Update (2026-07-06, GOV-1457):** The Philippines gains its second
> vertical, `ph/comelec/overseas-voter-registration` (National ID & Civic
> Documents), sourced from the Commission on Elections' (COMELEC) own public,
> unauthenticated **iRehistro for Overseas Voters** web tool
> (irehistro.comelec.gov.ph) — a live application-form generator that walks
> an applicant through OVF No. 1 (Revised 2025) and produces a printable,
> QR-coded PDF for personal submission at a Philippine post, per Sec. 6 of
> the Overseas Voting Act (RA 10590). `comelec.gov.ph`'s own root domain
> returns a Cloudflare challenge to a plain fetch, but the `irehistro`
> subdomain and the site's own PDF-attachment paths were both directly
> reachable and used to cross-check the wizard's DOM field-by-field against
> the official gazetted form; documentary requirements (passport, or a
> Post-issued Certification in its absence, plus a Seafarer's proof or Dual
> Citizenship certificate depending on status abroad) were corroborated from
> the Philippine Embassy in Berlin's own official requirements page. This
> `GovSchema Standard Research` cycle (GOV-1457) picked this candidate first
> among the registry's remaining voter-registration gaps: the UAE has no
> general voter-registration process (not attempted, likely N/A), Brazil's
> TSE electoral register remains suspended through 2026-11-03 (confirmed
> dead end by GOV-1400, not re-attempted), and Mexico's INE credencial para
> votar requires an in-person biometric appointment (not attempted, left as
> an open backlog candidate). Eight interpretive judgment calls are disclosed
> in the document's own VERIFICATION.md, including: this v1.0.0 models only
> OVF1's "Registration" application type (iRehistro's DOM does not expose
> the same form's other seven application types — Certification,
> Reactivation, Reinstatement, Change of Address, Recapture of Biometrics,
> Transfer, Correction of Entry); `registeredCityMunicipality` is modeled as
> an open string rather than an enum because the live tool populates its
> own option list via a per-province AJAX call not enumerable from the
> static page; and `citizenship` uses GSP-0018's `fieldRole: eligibility` /
> `eligibleValues` mechanism rather than a narrowed enum, since the live
> control blocks but does not remove a NON-FILIPINO selection. The
> Philippines' remaining four verticals (DMV, Taxes, Visa, Passport) are
> open backlog candidates for a future cycle; PhilSys national-ID
> registration and LTO driver's-licence/vehicle-registration were this
> cycle's designated fallback candidates but were not needed once COMELEC's
> iRehistro tool proved directly reachable and well-sourced.
>
> **Update (2026-07-06, GOV-1444):** The Philippines opens as the registry's
> 17th jurisdiction via `ph/bir/tin-application-corporations-partnerships`
> (Business Formation), sourced from the Bureau of Internal Revenue's own
> BIR Form No. 1903 ("Application for Registration...for Corporations,
> Partnerships (Taxable/Non-Taxable), Including GAIs, LGUs, Cooperatives and
> Associations", October 2025 ENCS edition) — a genuine, directly
> downloadable, current PDF with a real (non-image) text layer, published
> directly on BIR's own CDN with no login, CAPTCHA, or WAF gate, the
> strongest single sourcing shape found this cycle. This is the registry's
> closest Philippine analogue to `us/irs/employer-identification-number-ss4`
> and `mx/sat/preinscripcion-rfc-persona-moral`, classified under Business
> Formation the same way. This `GovSchema Standard Research` cycle
> (GOV-1444) first took a fresh look at IE Form CT1 per this catalog's own
> "Known Gaps" note — Revenue.ie's year-specific Tax and Duty Manuals
> (fetched and read directly, e.g. Part 38-02-01I for the 2024 CT1) turned
> out to still be change-log/"what's new" prose over ROS panels, not a full
> field-by-field walkthrough, and the base manual (Part 38-02-01) confirms
> field-level help lives only inside the login-gated ROS online-filing
> system itself with no downloadable specimen paper form found — this
> re-confirms the prior cycle's assessment and IE CT1 remains a poor
> candidate, not attempted. Colombia's DIAN RUT (Formulario 001, Registro
> Único Tributario) was also found and fetched directly as a genuine,
> current, official PDF and was a real contender, but was not picked over
> BIR Form 1903 since almost all its ~173 numbered items reference external
> code tables not reproduced in the form itself and it has substantially
> more unbounded repeating structures (up to 5 legal representatives, 5
> socios, 3 revisor fiscal/contador blocks, 3 establishments) — left as a
> viable backlog candidate for a future cycle (Colombia is not yet in this
> registry). Scoped to the form's Head Office registration pathway for a
> corporation/partnership/cooperative/GAI/LGU/association registering for
> the first time; the Branch Office/Facility pathways, the BIR-internal Tax
> Types panel, the Authority-to-Print-Invoices panel, and the PEZA/BOI
> incentive-registration panel are explicitly out of scope for this v1.0.0
> — twelve interpretive judgment calls in total are disclosed in the
> document's own VERIFICATION.md. The Philippines' other five verticals
> (DMV, Visa, Taxes, Passport, National ID) are open backlog candidates for
> a future cycle; none was screened in depth this cycle beyond this one
> strong Business Formation source.
>
> **Update (2026-07-06, GOV-1435, PR #241 merged 1f43204):** Mexico gains a
> fourth vertical, `mx/semovi/alta-vehiculo-foraneo`, closing the MX DMV gap
> this catalog's own "Known Gaps" section had explicitly flagged as a strong
> open candidate since GOV-1428's cycle. Sourced from the Secretaría de
> Movilidad de la Ciudad de México's (SEMOVI) own 17-page citizen manual PDF
> for its "Ventanilla de Control Vehicular" (VCV) online portal — a
> screenshot/narrative-only source (no text layer), fetched via a Wayback
> Machine mirror since the live `tramites.cdmx.gob.mx` host times out
> directly from this environment's network (a connection-layer timeout,
> reconfirmed independently at the GOV-1438 review gate, not a WAF/403
> block). The manual's actual scope turned out narrower than "any first-time
> registration": it specifically covers **foráneo** registration — a private
> vehicle already plated in another Mexican state, being registered in CDMX
> for the first time — not a brand-new-from-dealer vehicle, so the schema is
> named and scoped precisely to that pathway rather than overclaiming.
> Modelled as a **subnational** schema (`MX-CMX`), mirroring the
> `br/sp/jucesp` precedent, since SEMOVI is Mexico City's own mobility
> secretariat and vehicle registration in Mexico is state/CDMX-administered
> rather than federal. 26 fields plus 6 document-upload requirements across a
> 6-step flow; ten interpretive judgment calls (the out-of-scope persona
> moral/legal-entity owner branch, a visibly cropped owner-address
> screenshot, four dropdowns modelled as open strings since their option
> lists are never shown in the source, among others) are disclosed in the
> document's own VERIFICATION.md, all independently reviewed and confirmed
> reasonable at the GOV-1438 review gate with no fixes needed. Mexico now has
> 4/6 verticals (Business Formation, Visa, Taxes, DMV); Passport (SRE,
> in-person appointment only) and National ID (CURP, in-person biometric
> only) remain open-but-weak backlog candidates for a future cycle.
>
> **Update (2026-07-06, GOV-1428, PR #239 merged 127817d):** Mexico gains a
> third vertical, `mx/sat/declaracion-anual-sueldos-salarios`, closing the
> MX Taxes-vertical gap this catalog's own "Known Gaps" section explicitly
> flagged as distinct from `mx/sat/preinscripcion-rfc-persona-moral`
> (classified under Business Formation, mirroring the US EIN). Sourced from
> SAT's own official 65-page "Guía de llenado" PDF (fiscal-year-2025 edition)
> for the Régimen de Sueldos y Salarios e Ingresos Asimilados a Salarios —
> a genuine (non-image) text layer extracted via `pdfjs-dist`, unlike the
> sibling RFC preinscripción guide's screenshot-only pages. This cycle's
> `GovSchema Standard Research` routine (GOV-1428) also scouted three other
> candidates before picking this one: **BR Visa** is now a **confirmed dead
> end** — the SCI wizard (`formulario-mre.serpro.gov.br`) is CAPTCHA-gated
> before any field page, and the VFS-operated e-visa portal is both
> nationality-gated (AU/CA/US applicants only) and WAF-defended, with no
> official PDF form as an alternative; **BR National ID** (Carteira de
> Identidade Nacional, CIN) remains an open-but-weak backlog candidate —
> Decreto nº 10.977/2022 enumerates the card's ~20+ printed data attributes,
> but that's the finished card's data schema, not an application form (the
> decree's actual filing requirements are just CPF + one birth/marriage
> certificate); **MX DMV** remains a strong open backlog candidate — CDMX's
> "Ventanilla de Control Vehicular" manual (17 pages, real text layer,
> unauthenticated) covers first-time vehicle registration (Alta de
> Vehículo) but was not picked this cycle since the Taxes gap was more
> explicitly flagged. Ten interpretive judgment calls (unrendered
> checkbox/dropdown option lists, several fields bounded to one instance
> pending GSP-0009, a fiscal-year-2025-specific deduction cap) are disclosed
> in the document's own VERIFICATION.md for an independent reviewer. Mexico
> now has 3/6 verticals (Business Formation, Visa, Taxes); Passport, DMV,
> and National ID remain open backlog candidates for a future cycle.
>
> **Update (2026-07-06, GOV-1414):** Mexico gains its second vertical,
> `mx/sat/preinscripcion-rfc-persona-moral`, closing the Business Formation
> gap CATALOG.md's own "Known Gaps" section had explicitly flagged for
> Mexico. RFC (Registro Federal de Contribuyentes) is Mexico's federal
> taxpayer/business identifier — the closest Mexican analogue to the US EIN
> (`us/irs/employer-identification-number-ss4`, already classified under
> Business Formation in this registry), so this document is classified the
> same way. The live SAT preinscription wizard
> (sat.gob.mx/aplicacion/33805/preinscribe-tu-empresa-en-el-rfc) is
> WAF/bot-mitigation-gated — reconfirmed this cycle (still HTTP 403 to a
> browser-User-Agent `curl`, while the general `sat.gob.mx` portal itself
> returns HTTP 200) — so this document was instead authored from SAT's own
> official screenshot-driven step-by-step guide PDF ("Guía para
> preinscripción de personas morales", dated 01/01/2022), read via
> `pdfjs-dist` page-rendering to PNG (the guide's embedded screenshots carry
> no text layer) followed by direct visual reading of each rendered page.
> This corrects a prior cycle's (GOV-1393) characterization of the SAT RFC
> candidate as merely "a document checklist, not a field-level form" — that
> characterization was based on a different SAT publication (the Ficha
> 43/CFF document-requirements checklist); the actual step-by-step guide PDF
> found this cycle is a genuine field-by-field screenshot walkthrough of the
> live wizard's own five steps, in the same sourcing shape already used
> successfully for `ae/fta/vat-registration` and
> `ae/fta/corporate-tax-registration`. Six repeating structures the live
> wizard supports (additional/alternate business addresses beyond the one
> fiscal address, more than one phone number per address, more than one
> economic activity with its own income-percentage split, the full
> SCIAN-style economic-activity catalog itself, the activity-specific
> "preguntas complementarias" sub-questionnaire beyond the guide's one worked
> example, and more than one socio/accionista RFC relationship) are
> explicitly out of scope for this v1.0.0, since GovSchema v0.3 has no native
> array/repeating field type (GSP-0009) — see the document's own
> VERIFICATION.md for these and several other disclosed interpretive
> judgment calls flagged for an independent reviewer. Mexico's remaining
> four verticals (Passport, DMV, Taxes, National ID) remain open backlog
> candidates for a future cycle.
>
> **Update (2026-07-06, GOV-1407):** Brazil gains its third vertical,
> `br/rfb/individual-income-tax-return-irpf` (DIRPF, the annual individual
> income tax return), closing Brazil's Taxes-vertical gap. A prior cycle
> (`GOV-1295`) had tried to source this from Receita Federal's 340-page
> topical FAQ and left it in backlog as too fragmentary to source
> field-by-field. This cycle found the right source instead: RFB's own
> technical file-layout specification for the DIRPF declaration file (the
> "Leiaute DIRPF", 2023 edition) — a byte-exact field-by-field record
> specification, genuinely richer than most wizard-derived sources already
> in this registry. Scoped to a bounded core (67 fields): declarant
> identification and filing-type (HEADER/Reg 16), taxable income from
> legal-entity employers (Reg 21), income from individuals/foreign
> sources/carnê-leão (Reg 22), exempt (Reg 23) and exclusively-taxed
> (Reg 24) income, one bounded dependent (Reg 25), one bounded deductible
> payment (Reg 26), and donations to political parties (Reg 34). Rural
> activity, capital gains (GCAP), variable income/day-trade, RRA, the
> asset/liability schedule (Bens e Direitos), and all espólio/saída-exit-only
> records are explicitly out of scope — see the document's own
> VERIFICATION.md for the full scope-cut rationale and an honest caveat
> that RFB has not published a newer Leiaute DIRPF edition since 2023.
> There is no live wizard to walk (RFB's actual filing happens through its
> own desktop/app software, not a public web form), so `status` remains
> `draft`.
>
> **Update (2026-07-06, GOV-1400):** South Korea gains its first Vehicle
> Registration (as opposed to driver-licensing) DMV schema,
> `kr/molit/vehicle-ownership-transfer-registration` — transfer-of-ownership
> registration (이전등록) after a sale, gift, court-commissioned act, or
> inheritance, sourced directly from the gazetted application form (Motor
> Vehicle Registration Enforcement Rule, Attached Form No. 14) via law.go.kr,
> with a genuine text layer extracted (no OCR, no login). South Korea's DMV
> vertical previously covered only driver licensing
> (`kr/koroad/driving-licence-application`); this closes the vehicle
> registration/tag/title gap flagged in prior cycles. The registration-office
> vehicle-registration-certificate requirement and the exact mapping of two
> attachment documents onto the form's five registration-reason checkboxes
> are corroborated only by secondary administrative sources (gov.kr, and two
> district vehicle-registration-office pages), not stated verbatim on the
> primary form itself — both flagged as interpretive judgment calls for an
> independent reviewer. This cycle also scouted Brazil's first driving
> licence ("primeira habilitação") as an alternative candidate and found it
> gov.br-SSO-gated from the first step with no federal, unauthenticated,
> field-level source — left as a backlog candidate only if a future cycle
> finds a genuinely public state-DETRAN source. See the document's own
> VERIFICATION.md for the full sourcing table and every judgment call.
>
> **Update (2026-07-06, GOV-1393):** **Mexico** opens as the registry's
> **16th jurisdiction** with `mx/inm/forma-migratoria-multiple-electronica`,
> the Forma Migratoria Múltiple (FMM) — the mandatory entry/exit record every
> non-resident visitor must present on arrival — sourced from the Instituto
> Nacional de Migración's (INM) own live, unauthenticated online wizard.
> Opens in the Visa vertical, matching the "open with the strongest single
> vertical first" pattern used for South Korea (`GOV-1289`), the UAE
> (`GOV-1297`/`GOV-1335`), and Brazil (`GOV-1296`/`GOV-1342`). This cycle
> scouted four Mexican verticals before picking FMM: SRE passport (in-person
> appointment booking only, no field-level online form), SAT RFC tax/business
> registration (the official "Ficha 43/CFF" PDF is a document-requirements
> checklist rather than a field-by-field form, and the live SAT
> preinscription wizard returned HTTP 403 to a direct fetch — untested via a
> real browser this cycle, a candidate for a future cycle), and CURP national
> ID (in-person biometric appointment only) — all three found too weak or
> gated for this cycle and left as open backlog candidates, not dead ends.
> The live wizard's own client-side script hardcodes and disables its
> means-of-entry selector to "By land" on the URL this cycle sourced, so the
> "by air" pathway defined in the same underlying catalog is never reachable
> through it; `mx/inm/forma-migratoria-multiple-electronica` v1.0.0 is
> deliberately scoped to land entry only, and models the conditional
> parent/guardian section required for a minor applicant via a synthetic
> `applicantIsMinor` field (GovSchema's flat field model has no
> date-arithmetic operator to derive age from a birth date directly) — see
> the document's own VERIFICATION.md for this and several other disclosed
> interpretive judgment calls flagged for an independent reviewer. Mexico's
> other four verticals (Passport, DMV, Business Formation/Tax, National ID)
> remain open backlog candidates for a future cycle.
>
> **Update (2026-07-06, GOV-1387):** South Africa's SARS ITR14 corporate
> income tax return closes its fifth and final company-type Annexure,
> `za/sars/corporate-income-tax-return-itr14-medium-large-business`
> (Annexure E, guide §15, pp.115-169, 417 fields) — sourced from the same
> "How to complete the Income Tax Return (ITR14) for Companies" External
> Guide (IT-GEN-04-G01, Revision 19, effective 2 March 2026) used for the
> four smaller Annexures already modelled (Dormant, Micro Business, Body
> Corporate/Share Block, Small Business). Annexure E is the largest and most
> complex of the five (55 guide pages vs. 10-44 for the four siblings): it
> adds nine sections with no counterpart in any sibling — International,
> Foreign Exchange Gains/Losses, Foreign Dividends, Controlled Foreign
> Company, Double Taxation, STC Credits, Headquarter Company, Subsidiary
> Details, and Corporate Rules — plus four SIC-code-gated industry-specific
> sections (Mining and Quarrying, Construction, Wholesale and Retail Trade,
> Financial and Insurance Activities), and a Balance Sheet (64 fields)/
> Income Statement (89 fields) that split many lines by Local/Foreign and
> Connected/Non-Connected far more granularly than any sibling's. It
> deliberately defers, as a whole and explicitly disclosed, the same class
> of large itemised "pop-up selection box" Tax Computation sub-blocks the
> Small Business sibling deferred (Special Allowances Not Claimed and three
> related reversal/recoupment blocks), plus the wholly new Transfer Pricing
> Received/Receivable, Paid/Payable, and Supporting Information containers
> (unbounded per-jurisdiction repeating matrices) — see its own
> VERIFICATION.md for the full scope rationale and several interpretive
> judgment calls flagged for a future independent reviewer. This closes
> ITR14 Annexure E and, with it, the full five-Annexure ZA SARS ITR14
> company-type set (A-E: Dormant, Body Corporate/Share Block, Micro
> Business, Small Business, Medium to Large Business).
>
> **Update (2026-07-06, GOV-1378):** South Africa's SARS ITR14 corporate
> income tax return gains its fourth of five company-type Annexures,
> `za/sars/corporate-income-tax-return-itr14-small-business` (Annexure D,
> guide §14, pp.71-115, 283 fields) — sourced from the same "How to complete
> the Income Tax Return (ITR14) for Companies" External Guide (IT-GEN-04-G01,
> Revision 19, effective 2 March 2026) used for the three smaller Annexures
> already modelled (Dormant, Micro Business, Body Corporate/Share Block).
> Annexure D is structurally much larger (44 guide pages vs. 10-24 for the
> three siblings): it adds Small Business Corporation (s12E) eligibility,
> Contributed Tax Capital, Urban Development Zone (s13quat), Company
> Structure, Multinational Entity group details, Reportable Arrangement,
> Dividends Declared, and a 33-field Additional Assessment Information
> section with no counterpart in any sibling, plus a materially larger
> Balance Sheet/Income Statement and a much larger, separately-itemised Tax
> Computation Debit/Credit Adjustments block. It deliberately defers, as a
> whole and explicitly disclosed, four large itemised "pop-up selection box"
> Tax Computation sub-blocks (~84-item Special Allowances Not Claimed plus
> three smaller reversal/recoupment blocks) that are each comparable in
> scope/complexity to a repeating container — see its own VERIFICATION.md
> for the full scope rationale and several interpretive judgment calls
> flagged for a future independent reviewer. This closed ITR14 Annexure D;
> Annexure E (Medium to Large Business) was the sole remaining unmodelled
> ITR14 company-type Annexure at the time — since closed by GOV-1387 above.
>
> **Update (2026-07-06, GOV-1371):** The United Arab Emirates gains a second
> Taxes-vertical document, `ae/fta/corporate-tax-registration`, sourced from
> the Federal Tax Authority's own official "Corporate Tax Registration –
> Taxpayer User Manual" (EmaraTax, v4.0.0.0, 17 May 2023) — a 41-page
> screenshot-driven walkthrough of the live EmaraTax CT-registration wizard,
> the same sourcing shape already used successfully for
> `ae/fta/vat-registration`. This closes the sibling-document gap that cycle
> explicitly flagged in its own `description` and in this catalog's "Known
> Gaps" section. Before authoring this, this cycle's `GovSchema Standard
> Research` routine scouted two genuinely new-vertical UAE candidates
> (Business Formation via DED/Invest in Dubai/Basher; National ID via ICP
> Emirates ID issuance) and Brazil's National ID candidate
> (Carteira de Identidade Nacional, CIN) — all three confirmed login-gated
> (UAE Pass/Emirates ID or gov.br SSO) via live checks this cycle, so effort
> was redirected to the already-precedented, plainly-downloadable EmaraTax
> manual instead. Models the Legal Person registration pathway in full;
> Natural Person registration's own (simpler) field set was not sourced this
> cycle — see the document's own VERIFICATION.md for four disclosed
> interpretive judgment calls flagged for an independent reviewer. Brazil's
> CIN remains an open National ID candidate for a future cycle if a
> non-login-gated source (e.g. the governing federal decree's own field list,
> already read this cycle from planalto.gov.br) proves sufficient on its
> own.
>
> **Update (2026-07-06, GOV-1364):** Brazil gains its second vertical,
> `br/pf/passport-application`, sourced directly from the Federal Police's
> (Polícia Federal) own live SINPA (Sistema Nacional de Passaportes) online
> passport-request wizard — a genuinely live, unauthenticated, four-tab HTML
> form (no login, no CAPTCHA, no IP block), read field-by-field straight from
> the page DOM via headless-browser extraction rather than any PDF/image
> technique. Brazil had only one schema (`br/sp/jucesp/cnpj-registration-dbe`,
> Business Formation) since opening as the registry's 15th jurisdiction under
> `GOV-1342`; this cycle's `GovSchema Standard Research` routine scouted its
> three other unresearched verticals (Passport, DMV, Visa; National ID was not
> reached this cycle) and found Passport strongly sourceable. The single
> SINPA wizard covers first-time issuance, renewal, and lost/stolen/retained
> replacement all through one `previousPassportStatus` field, rather than
> Brazil needing separate forms per scenario — modeled as one schema instead
> of the first-time/renewal split used elsewhere in this registry. Scoped to
> applicants who will be 18 or older; the wizard's minor-applicant fields
> (responsible-party CPF, travel authorization, parents' nationality) are
> deliberately out of scope for v1.0.0 (see VERIFICATION.md). Brazil's
> Receita Federal IRPF candidate (`GOV-1295`) remains open in the backlog,
> too fragmentary to source safely; DMV, Visa, and National ID remain
> unresearched candidates for a future cycle.
>
> **Update (2026-07-06, GOV-1355/GOV-1317):** South Korea gains a second
> National ID & Civic Documents schema,
> `kr/mois/resident-registration-card-reissuance`, sourced from the
> Ministry of the Interior and Safety's gazetted form (주민등록법 시행령
> [별지 제32호서식], law.go.kr) — a genuine text-layer PDF, directly
> downloadable with no login or CAPTCHA. This was the second of two
> candidates GOV-1289's original South Korea scouting cycle found for this
> vertical (the first, `kr/nec/overseas-voter-registration`, was authored
> under GOV-1294); picked up from the standing candidate backlog left open
> by GOV-1294 as `GOV-1317` under this cycle's `GovSchema Standard Research`
> routine (`GOV-1355`). Models the reissuance-reason selection, the source
> form's own exceptions to needing the previous card, the receipt-method and
> confirmation-document choices, a distinct home/counter-visit reissuance
> pathway for a severely disabled applicant, and the reverse-side
> fee-exemption consent block — see VERIFICATION.md for two explicit
> interpretive judgment calls flagged for a future independent reviewer.
>
> **Update (2026-07-05, GOV-1342/GOV-1296):** **Brazil** opens as the
> registry's **15th jurisdiction** with `br/sp/jucesp/cnpj-registration-dbe`,
> sourced from the Junta Comercial do Estado de São Paulo (JUCESP)/VRE|REDESIM
> integrator's own "Preenchimento do Coletor Nacional – DBE de inscrição"
> tutorial — a 34-page screenshot-driven walkthrough of the live Coletor
> Nacional wizard for registering a new company's CNPJ. Picked up from the
> standing candidate backlog GOV-1289's original new-jurisdiction scouting
> cycle left open (`GOV-1296`), after the live `vreredesim.sp.gov.br` domain
> proved unreachable from this environment and its documentation-listing page
> turned out to be a client-rendered Angular SPA the Wayback Machine only
> archived as an empty shell; the specific manual PDF GOV-1296 named was
> separately recovered via the Wayback CDX API filtered to
> `mimetype:application/pdf`, which surfaced a real, fully-rendered snapshot
> under a `/PRD/` path distinct from an earlier dead HTML-stub snapshot at a
> similarly-named URL. Modelled as a **subnational** schema (`BR-SP`) since
> REDESIM is a per-state integrator, even though the underlying CNPJ registry
> it feeds is federal. Brazil's other candidate, `GOV-1295` (Receita Federal
> individual income tax, IRPF), remains open in the backlog — its named
> source is still assessed as too fragmentary to source safely (see its own
> comment thread).
>
> **Update (2026-07-05, GOV-1335/GOV-1297):** The **United Arab Emirates**
> opens as the registry's **14th jurisdiction** with
> `ae/fta/vat-registration`, sourced from the Federal Tax Authority's
> official "VAT Registration – Taxpayer User Manual" (EmaraTax, v1.0.0.0,
> Oct 2022) — a 58-page screenshot-driven walkthrough of the live
> EmaraTax registration wizard, no login or CAPTCHA required to download.
> Picked up under this cycle's standing `GovSchema Standard Research`
> routine (`GOV-1335`) from `GOV-1297`, a secondary new-jurisdiction
> candidate GOV-1289's research cycle had scouted alongside South Korea and
> Brazil. This cycle first attempted `GOV-1295` (Brazil,
> `br/receitafederal` individual income tax return), but its named source —
> a 340-page topical FAQ — turned out too fragmentary to source a clean
> schema from safely; that finding is recorded on `GOV-1295`'s thread
> (left open in backlog, not a dead end) and effort was redirected to UAE.
> UAE has no personal income tax, so VAT registration is its closest
> Taxes-vertical analogue (its DMV/Business Formation/Visa/Passport/
> National ID verticals were rated WEAK/login-gated in GOV-1289's original
> scouting and are not open candidates without new sourcing).
>
> **Update (2026-07-05, GOV-1328/GOV-1293):** South Korea's Taxes vertical
> closed with `kr/nts/year-end-tax-settlement-income-deduction-report`,
> sourced from the National Tax Service's own English-language "Easy Guide
> for Foreigners' Year-end Tax Settlement" (2025 edition, nts.go.kr), which
> reproduces the gazetted Enforcement Rule of the Income Tax Act's Attached
> Form No. 37(1)-(3) as an official English original — the lowest
> translation-risk KR source found so far. Picked up from the standing
> candidate backlog left by GOV-1289's new-jurisdiction research cycle
> (this was `GOV-1293`, the last of South Korea's five STRONG-rated
> verticals). KR now has 5/6 verticals modelled (Passport, DMV, National ID,
> Visa, Taxes); only Business Formation remains unmodelled, rated WEAK in
> GOV-1289's original research (IROS/startbiz.go.kr both require
> certificate login) and not an open candidate without new sourcing.
>
> **Update (2026-07-05, GOV-1292):** South Korea's Visa vertical closed with
> `kr/moj/visa-application`, sourced from the Ministry of Justice/Korea
> Immigration Service's gazetted Visa Application Form (사증발급신청서, 출입국관리법
> 시행규칙 별지 제17호서식) — a plain, directly-downloadable bilingual PDF with a
> real text layer (visa.go.kr), unlike the two other South Korean forms
> authored so far, both served through JS canvas/blob-image viewers. Picked up
> under `GOV-1321`'s standing research routine from the candidate backlog left
> by `GOV-1289`'s new-jurisdiction research cycle. KR now has 4/6 verticals
> modelled (Passport, DMV, National ID, Visa); only `GOV-1293` (Taxes) remains
> open in the backlog. Global Visa coverage moves from 10/13 to 11/13
> jurisdictions.
>
> **Update (2026-07-05, GOV-1294):** South Korea's National ID & Civic
> Documents vertical closed with `kr/nec/overseas-voter-registration`,
> sourced from the National Election Commission's combined overseas
> absentee-voter notification / overseas voter registration form
> (`[별지 제59호의4서식]`, ok.nec.go.kr) — a rare source that ships **two**
> official filled-in examples, one per filing pathway, letting both of the
> form's main branches be verified against real transcribed values rather
> than inferred from the blank form alone. Picked up from the standing
> candidate backlog left by GOV-1289's new-jurisdiction research cycle (this
> was `GOV-1294`, alongside sibling candidates `GOV-1292` Visa and `GOV-1293`
> Taxes, both still open). KR now has 3/6 verticals modelled (Passport, DMV,
> National ID); Visa and Taxes candidates remain in the backlog.
>
> **Update (2026-07-05, GOV-1303):** South Korea's DMV vertical closed with
> `kr/koroad/driving-licence-application` (GOV-1291), sourced from the
> gazetted driving-licence-test application form (law.go.kr Attached Form No.
> 42-2, Class 1 Regular / Class 2), picked up from the standing candidate
> backlog left by GOV-1289's new-jurisdiction research cycle. KR now has
> 2/6 verticals modelled (Passport, DMV); Visa (`GOV-1292`), Taxes
> (`GOV-1293`), and National ID (`GOV-1294`) candidates remain open in the
> backlog, along with the two secondary Brazil/UAE candidates below.
>
> **Update (2026-07-05, GOV-1289):** South Korea (KR) opened as the registry's
> 13th jurisdiction with `kr/mofa/passport-application-first-adult`, the first
> schema authored against a new jurisdiction since the current 12 were
> established. GOV-1289's research cycle scouted three new-jurisdiction
> candidates — Brazil, South Korea, the UAE — against all six verticals,
> screening specifically for unauthenticated, official, field-level sources.
> South Korea rated strongest (5/6 verticals: Passport, DMV, Visa, Taxes,
> National ID), so it was opened first, starting with Passport (the cleanest
> single source: an official form plus an official filled-in example, no
> login). Follow-up candidates were filed as child issues rather than authored
> immediately: `GOV-1291` (DMV), `GOV-1292` (Visa), `GOV-1293` (Taxes),
> `GOV-1294` (National ID) for South Korea's other strong verticals, and
> `GOV-1295`/`GOV-1296` (Brazil Taxes/Business Formation) and `GOV-1297` (UAE
> Taxes) for the two secondary candidates. This cycle also re-confirmed that
> all of GOV-1289's own legacy-named National ID gaps (DE Steuer-ID, SG NRIC
> re-registration, NZ RealMe, remaining voter registration) were already
> closed — see the National ID section below.

| Vertical | Coverage | Genuinely open gap |
|----------|----------|------------|
| **Passport** | 16/17 (94%) | **AE** not yet modelled; **MX** newly modelled this cycle (`mx/sre/passport-application`, GOV-1504) — SRE's own Form OP-5, a directly downloadable non-image text-layer PDF found after a prior "in-person appointment only" screening had deferred this vertical; **PH** modelled in a prior cycle (`ph/dfa/passport-application`, GOV-1497) — the field-name inventory was extracted from the Date and Time step's hidden-input payload without solving the reCAPTCHA gate or holding a real appointment slot, so select-option lists and required markers for the four applicant-data steps are inferred, not live-confirmed; **BR** modelled in a prior cycle (`br/pf/passport-application`) |
| **DMV** | 16/17 (94%) | sub-process/edition expansion (CDL beyond US-CA, IDL beyond US/IE/GB) only; **BR** not yet modelled (the sole remaining jurisdiction gap — see below); **PH** newly modelled this cycle (`ph/lto/drivers-license-application`, GOV-1519) — LTO Form No. 21, recovered via the Wayback Machine directly from `lto.gov.ph`'s own upload path, resolving the third-party-mirror-only provenance gap GOV-1466 had flagged, closing PH to 6/6 verticals; **AE** modelled in a prior cycle (`ae/rta/vehicle-registration-renewal`, GOV-1512); **MX** modelled in a prior cycle (`mx/semovi/alta-vehiculo-foraneo`, GOV-1435) |
| **Business Formation** | 16/17 (94%) | sub-process expansion only (sole trader/partnership/LLP in CA/NZ/IE/IN; PH's own Branch/Facility/PEZA-BOI-incentive sub-processes; KR's own Section 3/4 trust-property and foreign-corporation pathways); **AE** not yet modelled (confirmed dead end this cycle's own prior pass, GOV-1474 — Basher login-gated, `app.invest.dubai.ae` 403s, `ded.ae` bot-mitigated); **BR** modelled in a prior cycle (`br/sp/jucesp/cnpj-registration-dbe`); **MX** modelled in a prior cycle (`mx/sat/preinscripcion-rfc-persona-moral`, GOV-1414); **PH** modelled in a prior cycle (`ph/bir/tin-application-corporations-partnerships`, GOV-1444); **KR** newly modelled this cycle (`kr/nts/corporation-establishment-and-business-registration`, GOV-1483), closing South Korea to 6/6 verticals |
| **Taxes** | 17/17 (100%) | sub-process expansion only (corporate tax: SG modelled GOV-1261, ZA's full 5-Annexure ITR14 set now modelled GOV-1268/GOV-1275/GOV-1282/GOV-1378/GOV-1387; IE Form CT1 re-examined and re-confirmed a poor candidate GOV-1444); **BR** modelled in a prior cycle (`br/rfb/individual-income-tax-return-irpf`, GOV-1407); **MX** modelled in a prior cycle (`mx/sat/declaracion-anual-sueldos-salarios`, GOV-1428); **PH** newly modelled this cycle (`ph/bir/annual-income-tax-return-1701a`, GOV-1466), closing the global Taxes vertical to 100% |
| **Visa** | 15/17 (88%) | **NL, ZA, BR** — all three confirmed dead ends (see below), not open work; **PT** newly modelled this cycle (`pt/aima/requerimento-autorizacao-residencia`, GOV-1757), closing the residence-permit gap flagged by GOV-1750's research; **PH** modelled in a prior cycle (`ph/bi/non-immigrant-visa-application`, GOV-1490); **AE** modelled in a prior cycle (`ae/icp/visa-single-entry-long-stay-pleasure`, GOV-1421); **MX** modelled in a prior cycle (`mx/inm/forma-migratoria-multiple-electronica`); **CL, ES** — the only two remaining gaps, both unscreened or confirmed weak (ES Visa is a duplicate of DE's EU-harmonized template per prior cycles). |
| **National ID & Civic Documents** | 15/17 (88%) | none genuinely open (SG voter-reg is a confirmed non-gap); **BR, MX** not yet modelled (MX's CURP candidate is in-person/biometric-only); **AE** newly modelled this cycle (`ae/icp/emirates-id-replacement`, GOV-1474) |

> **Correction (2026-07-05, GOV-1240):** the prior version of this table
> (generated by GOV-1221) showed Passport as 9/13 with ZA, IN, and NL listed
> as missing, and National ID as 7/13. Both claims were stale: `in/mea/`
> published two passport schemas (GOV-1227, GOV-1233 review), `nl/rvig/`
> published one (predates this cycle), and `za/dha/` published one
> (GOV-1174) — none of these merges had been reflected here. This revision
> was generated by re-scanning `registry/` directly
> (`find registry -mindepth 3 -maxdepth 3 -type d`, grouped by jurisdiction)
> rather than trusting the previous table. **Every prior "missing" claim
> below has been re-verified against the current registry tree as of this
> revision.**

---

## By Vertical

### Passport (35/40 jurisdictions — 88%)

**Jordan's Passport vertical opens (2 of 6) (GOV-2739)**, via
`jo/cspd/passport-application` — the Civil Status and Passports Department's
(CSPD) "Passport Application" form (Form No. PASS-ALL-01), a single coded
specimen covering first-time issuance, renewal, and replacement in one form.
See the Executive Summary's GOV-2739 update above and the document's own
VERIFICATION.md for the full sourcing record, the parallel scouting pass
across Jordan's other four remaining verticals, and every disclosed
scoping/judgment call. Jordan now stands at 2 of 6 verticals (Taxes,
Passport); Business Formation, DMV, and National ID were confirmed dead ends
this cycle, and Visa has an open, well-sourced-but-third-party-hosted
candidate left as backlog.

**Thailand's Passport vertical opens (5 of 6) (GOV-2709)**, via
`th/mfa/passport-application-royal-thai-embassy-london` — the Ministry of
Foreign Affairs' "Form 1" (แบบฟอร์ม 1), distributed by the Royal Thai
Embassy, London for Thai nationals resident in the UK or Ireland. See the
Executive Summary's GOV-2709 update above and the document's own
VERIFICATION.md for the full sourcing record, the National ID dead-end
screening finding, and every disclosed scoping/judgment call. Thailand now
stands at 5 of 6 verticals (Taxes, Business Formation, Visa, DMV, Passport);
National ID is Thailand's sole remaining vertical, a confirmed dead end for
the candidate screened this cycle.

**Ghana's Passport vertical opens (4 of 6) (GOV-2703)**, via
`gh/mfa/application-for-a-republic-of-ghana-passport` — the Ministry of
Foreign Affairs and Regional Integration (MFA) Passport Office's manual
application form (Passport and Travel Certificate Decree, NLCD. 155, 1967),
independently re-fetched this cycle (HTTP 200, `application/pdf`, 248,106
bytes, `sha256:
e59193adeaf05847042dbd03928f1e7e9bec3b4cf333ee19c048c18e5bb73c9`, matching
the issue's own citation exactly). A flat, non-AcroForm print specimen with
a real, fully extractable text layer across all 4 pages, read via
coordinate/text-layout correlation. 114 `fields[]`, 4 `documents[]`. See the
Executive Summary's GOV-2703 update above and the document's own
VERIFICATION.md for the full sourcing record, the `requiredWhen`-gated
evidence-of-citizenship/prior-passport conditionals, and the disclosed
absence of any photograph requirement on this specimen (unlike `gh/gis`).
Ghana now stands at 4 of 6 verticals (National ID & Civic Documents, Taxes,
Visa, Passport); DMV and Business Formation remain open backlog.

**Bangladesh's Passport vertical opens (3 of 6) (GOV-2666)**, via
`bd/dip/e-passport-application-form` — the Department of Immigration and
Passports' (DIP) "e-Passport Application Form (New/Re-Issue)", distributed
for offline/embassy submission via the Ministry of Foreign Affairs' forms
portal. Reverses GOV-2591's prior dead-end verdict for this vertical (a
fillable AcroForm specimen was not previously located). Scopes to the
first-time (new) applicant pathway: 72 `fields[]`, 5 `documents[]` (GOV-2672
corrected 24 fields' modeling from free-text to `enum` and added
`paidAmountCurrency`). See the
Executive Summary's GOV-2666 update above and the document's own
VERIFICATION.md for the full sourcing record, including the finding that
this PDF's internal AcroForm field names do not reliably track its own
printed item numbers. Bangladesh now stands at 3 of 6 verticals (Taxes,
DMV, Passport); Business Formation, Visa, and National ID remain open
backlog.

**Rwanda's Passport vertical opens (4 of 6) (GOV-2629)**, via
`rw/dgie/passport-application-first-adult` — the Directorate General of
Immigration and Emigration's (DGIE) first-time adult e-passport
application, submitted exclusively through the IremboGov online portal
(irembo.gov.rw). No downloadable/fillable PDF specimen exists for this pure
portal-only SPA process; sourced instead from IremboGov's own official
Support Center walkthrough article (including its own embedded screenshots
of the live "Applicant Details" and "Passport & Travel Details" screens),
the same accepted pattern already used by
`id/imigrasi/passport-application-first-adult` for a portal-only process.
17 `fields[]`, 6 `documents[]`. See the Executive Summary's GOV-2629 update
above and the document's own VERIFICATION.md for the full sourcing record,
the disclosed Residence-Details/Birth-Location administrative-subdivision
scoping gap, and every other disclosed judgment call. Rwanda now stands at
4 of 6 verticals (DMV, Visa, Business Formation, Passport); National ID is
a confirmed dead end and Taxes has only a companion annex form (RRA-PIT-
ANA-E11), not a full return.

**Nigeria's Passport vertical closes (5 of 6) (GOV-2577)**, via
`ng/nis/application-for-nigeria-standard-passport` — NIS "Form C1 —
Application for Nigeria Standard Passport" (Adult pathway), sourced from
the Nigeria High Commission, London's own mirror. See the Executive
Summary's GOV-2577 update above and the document's own VERIFICATION.md for
the full sourcing record and every disclosed scoping/judgment call. Nigeria
now stands at 5 of 6 verticals (Business Formation, Taxes, Visa, National
ID, Passport); DMV remains the sole confirmed dead end.

**Vietnam opens as this registry's 37th jurisdiction (GOV-2404)**, via
`vn/xuatnhapcanh/to-khai-cap-ho-chieu-pho-thong-trong-nuoc` — the current
Mẫu TK01, "Tờ khai đề nghị cấp hộ chiếu phổ thông ở trong nước dành cho
người từ 14 tuổi trở lên," published by the Immigration Department under
Circular 69/2026/TT-BCA (effective 2026-07-01). A first scouting pass found
an older, still-live, genuinely fillable AcroForm PDF at the same host
(form "X01," Circular 29/2016/TT-BCA) — but a legal-currency check found it
superseded three times over, most recently ten days before this schema's
own retrieval date. This schema models the current TK01 exclusively,
located inside the superseding circular's own full-text PDF on
`bocongan.gov.vn` and extracted via full-page `node-canvas`/`pdfjs-dist`
rendering of a mixed-JPEG/JBIG2 scanned gazette document, since the source
carries no AcroForm widgets. See the Executive Summary update above and the
document's own VERIFICATION.md for the full sourcing record, including the
field-by-field comparison against the superseded X01 form. Vietnam stands
at 1 of its 6 verticals; Business Formation, DMV, Taxes, Visa, and National
ID remain open backlog candidates.

**Finland's Passport gap is now closed (GOV-2397)**, via
`fi/poliisi/huoltajan-suostumus` — Poliisi's (the Finnish Police) form
Poliisi-Muut-07, "Huoltajan suostumus" (Guardian's consent), a standalone
guardian-consent form required whenever a minor's guardian(s) consent to the
minor being granted a passport, identity card, firearms permit, or
explosives precursor licence — directly analogous to Sweden's own PM 531.2
(GOV-2363, immediately below) and Denmark's DMV-vertical-closing
`dk/fstyr/samtykkeerklaering-koerekort-under-18` (GOV-2346). Finland's own
primary adult passport/identity-card application remains a confirmed dead
end (online-application-plus-mandatory-in-person-biometric, no downloadable
blank form for the main flow). Unlike the Swedish precedent, this form is a
genuine fillable AcroForm PDF (16 applicant-facing widgets across 20 total,
4 of which are non-data Save/Print/Clear-form buttons). See the Executive
Summary update above and the document's own VERIFICATION.md for the full
sourcing record, including the Yes/No checkbox-pair modelling for each of
the four licence/document types (each checkbox's own raw `exportValue` is
misleadingly identical regardless of Yes/No side) and the disclosed
top/bottom (not left/right) guardian-block layout. Finland now stands at 6
of its 6 verticals — no vertical remains open for Finland.

**Sweden's Passport gap is now closed (GOV-2363)**, via
`se/polisen/medgivande-pass-nationellt-id-kort-minderarig` — Polismyndigheten's
(the Swedish Police Authority) form PM 531.2, a standalone guardian-consent
appendix required whenever a minor applies for a passport and/or national
identity card, directly analogous to Iceland's own `is/thjodskra/passport-issuance-consent-minor`
(GOV-2226, above) and Denmark's DMV-vertical-closing
`dk/fstyr/samtykkeerklaering-koerekort-under-18` (GOV-2346). Sweden's own
primary adult passport/national-ID-card application remains a confirmed
dead end (appointment-based, in-person, biometric, no downloadable blank
form), matching the same pattern already confirmed for Finland, Norway,
Estonia, and Poland's own passport verticals. The source PDF carries zero
AcroForm/Widget annotations — all 39 schema fields were identified from its
text layer and per-glyph coordinates instead, following this registry's own
`jp/houmukyoku/*` "no AcroForm, rich text layer" precedent. See the
Executive Summary update above and the document's own VERIFICATION.md for
the full sourcing record, including the coordinate-based discovery that the
minor's own personal-identity-number field uses a different digit-count
format than the guardians' own, an independently-reproduced embedded-font
glyph-encoding artifact, and every disclosed judgment call (document-type
modelling, guardian-2/witness optionality with no synthetic gating field,
excluded office-use/institutional boxes). Sweden now stands at 5 of its 6
verticals (Business Formation, DMV, Visa, Taxes, Passport); National ID
remains Sweden's sole open, unscreened vertical.

**Denmark opens as GovSchema's 33rd jurisdiction (GOV-2244)**, via
`dk/um/application-for-danish-passport` — the Ministry of Foreign Affairs'
"Application for Danish passport" (edition 03/2026), covering first
passport, renewal, provisional, extension, and extra-passport requests in
one bilingual-labelled form. See the Executive Summary update above and
the document's own VERIFICATION.md for the full sourcing record (86
AcroForm widgets, zero radio groups, three 10-digit CPR-number split-box
merges, 1 semantic-only `applicantIsMinor` field with no backing widget,
12 `exclusivityGroups`). Denmark now stands at 1 of its 6 verticals;
DMV and Taxes were scouted this cycle as genuine, fresh, unauthenticated
AcroForm-PDF candidates for a future cycle — see "Known Gaps" below.

**Iceland's Passport vertical opens (GOV-2226)**, via
`is/thjodskra/passport-issuance-consent-minor` — Þjóðskrá Íslands' Form
V-901, the genuine standalone custodian-consent form embedded within
Iceland's otherwise in-person/biometric passport-issuance process. See the
Executive Summary update above and the document's own VERIFICATION.md for
the full sourcing record. Iceland now stood at 5 of its 6 verticals at that
point; **its National ID gap has since closed too (GOV-2233)** — see the
National ID & Civic Documents section below and the Executive Summary
update above. Iceland now stands at 6 of 6 verticals.

**Austria**'s Passport gap is now closed (GOV-2128), via
`at/bmeia/passport-or-identity-card-application` — the bilingual
German/English combined passport-or-identity-card consular application,
screened as viable in the GOV-2121 cycle and re-verified from scratch this
cycle (42 AcroForm widgets, all distinct field names, zero exclusions,
zero merges — modelled as independent optional booleans with GSP-0013
`exclusivityGroups` disclosing real-world mutual exclusivity the PDF
itself does not structurally enforce). See the Executive Summary update
above and the document's own VERIFICATION.md. This gives Austria 4 of its
6 verticals (Business Formation, Taxes, National ID, Passport); Visa
remains an open, screened-and-viable backlog candidate; DMV remains a
confirmed weak/dead-end candidate.

**Switzerland**'s Passport gap is now closed (GOV-1931), via
`ch/fedpol/antrag-pass-identitaetskarte` — fedpol's own online
`ch-edoc-passantrag.admin.ch` application tool (a federal, not cantonal,
process — the first federal CH schema in the registry, alongside the
cantonal DMV and Taxes schemas already modelled). The tool issues a
passport, an identity card, or both ("Combi") through one shared field set,
so this single schema also closes Switzerland's National ID gap in the same
PR — see the National ID section and the Executive Summary update for the
full sourcing story, including the disclosed distinction between the
Domicile/Applicant-contact steps (directly rendered in a headless-browser
session) and the deeper personal-data steps (sourced from the application's
own live-fetched i18n resource bundle, since those screens sit behind a
one-time e-mailed verification link this cycle could not obtain). This
gives Switzerland 4 of its 6 verticals (DMV, Taxes, Passport, National ID);
Visa is a confirmed duplicate of the EU-harmonized template (GOV-1774), not
an open gap, and Business Formation (`easygov.swiss`, CH-Login-gated,
GOV-1840) is Switzerland's sole remaining genuinely open vertical.

**Malaysia**'s Passport gap is now closed (GOV-1783), via
`my/jim/passport-travel-document-application` — see the Executive Summary
update above for the full sourcing story (JIM's IM.42, a genuine, directly
downloadable, currently-referenced XFA print-layout form with no
interactive field layer but a self-documenting, numbered field-by-field
structure, the same fallback shape as GOV-1774's own JPJ-L1 precedent).
This gives Malaysia 2 of its 6 verticals (DMV, Passport); Taxes and
National ID were screened this cycle and confirmed dead ends (LHDN's
returns are e-Filing-only specimens with empty AcroForms; JPN's MyKad
service has no downloadable form at all, in-person-only); Visa remains the
sole open, unscreened backlog candidate.

**Estonia**'s Passport gap is now closed (GOV-1712), via
`ee/ppa/passport-application` — see the Executive Summary update above for
the full sourcing story (a genuine, unauthenticated, directly downloadable
AcroForm PDF, "APPLICATION FOR IDENTITY DOCUMENTS," scoped to its
travel-document track). This gives Estonia 3 of its 6 verticals (National
ID & Civic Documents, Business Formation, Passport); Taxes, DMV, and Visa
remain open, unscreened backlog candidates.
**Poland**'s Passport gap is now closed (GOV-1685), via
`pl/mswia/wniosek-o-wydanie-paszportu` — see the Executive Summary update
above for the full sourcing story (no downloadable form exists for this
process; every field is sourced from Art. 33 of the governing Ustawa o
dokumentach paszportowych instead). This gives Poland 4 of its 6 verticals
(National ID, Business Formation, DMV, Passport); Taxes and Visa remain
open. AU, BR, CA, DE, FR, GB, ID, IE, IN, KR, MX, NL, NZ, PH, SG, US, ZA all
have at least one published Passport schema (this list previously omitted
Indonesia's `id/imigrasi/passport-application-first-adult` — a
transcription gap in this document, not a registry gap; corrected here).
**Colombia**, opened via its DMV
vertical (GOV-1567), now has 6 of its 6 verticals including Passport
(GOV-1609). **Chile**, opened this cycle (GOV-1624) via its Business
Formation vertical, has no Passport schema yet — an open, unscreened backlog
candidate for a future cycle (Registro Civil's `pasaporte.cl` appointment
flow was screened this cycle and found ClaveÚnica-login-gated with no PDF
fallback — see "Known Gaps" below). India (`in/mea/passport-application-first-adult`,
`in/mea/passport-reissue`), the Netherlands (`nl/rvig/passport-application`),
New Zealand (`nz/dia/passport-application-first-adult`,
`nz/dia/passport-renewal-adult`), and South Africa
(`za/dha/passport-application-first-adult`) were previously miscatalogued
here as gaps; all four already existed. **South Korea** (`kr/mofa/passport-application-first-adult`,
GOV-1289) opened the registry's first Korean schema, sourced
from the Ministry of Foreign Affairs' current form (revised 2025-10-09) plus
its own official filled-in example. **Brazil** (`br/pf/passport-application`,
GOV-1364) is new this cycle — sourced directly from the Federal Police's own
live SINPA online wizard (no login/CAPTCHA gate), the strongest sourcing
shape yet used in this registry since it is the actual page DOM rather than a
rendered image or PDF of it. Uniquely among this registry's Passport schemas,
Brazil's single wizard covers first-time issuance, renewal, and
lost/stolen/retained replacement all through one `previousPassportStatus`
field rather than needing separate forms per scenario. **United Arab
Emirates** has no Passport schema yet — re-screened again this cycle
(GOV-1567) with the same result as GOV-1533: ICP's own "Services Guide"
covers passport issuance/renewal/replacement only as a service-card catalog
(eligibility, fees, photo specs, no form-field walkthrough), and the ICP
Smart App's own generic user manual never proceeds into the passport
service's own field screens; the live service itself requires UAE Pass
login with no public preview. Confirmed dead end; do not re-attempt without
a genuinely new source. **Indonesia** (`id/imigrasi/passport-application-first-adult`,
GOV-1574) is new this cycle, closing Indonesia's Passport gap. Its M-Paspor
app gap was logged as "sourceable only via secondary checklist-level how-to
articles" by GOV-1560, then reversed to a viable, ready-to-author candidate
by GOV-1567 (which found a genuine official, versioned ("V3")
screenshot-driven user guide, `M-Paspor_UserGuide_V3.pdf`, hosted
unauthenticated on a regional Ditjen Imigrasi subdomain,
`batam.imigrasi.go.id/assets/resources/files/`, unlike the main
`imigrasi.go.id` domain's own guide, which remains CloudFront-blocked to a
direct fetch). This cycle authored against it: an adult (Dewasa), first-time
(never previously held a passport) applicant on either the Reguler or
Percepatan service tier, confirmed via the guide's own interchanged
screenshots to share one downstream form. The renewal/replacement pathway,
the child/minor (Anak-anak) applicant pathway, and the payment step (no base
PNBP fee amount is published anywhere in the 31-page guide) are out of scope
for this v1.0.0 — see the document's own VERIFICATION.md for these and seven
other disclosed judgment calls.
**The Philippines** (`ph/dfa/passport-application`, GOV-1497) is new this
cycle: the Department of Foreign Affairs' Online Passport Appointment System
(`passport.gov.ph`), modelled — like Brazil's SINPA — as a single wizard
covering new/renewal/lost through one `applicationType` field. Two prior
cycles (GOV-1466, GOV-1490) had explicitly deferred this vertical because
progressing through the wizard's Date and Time step holds a real, scarce
DFA appointment slot; this cycle resolved that by extracting the complete
field-name inventory from the hidden-input payload the Date and Time step
already serves before any slot is selected, and deliberately did not solve
the downstream reCAPTCHA gate or hold a booking — so, unlike Brazil's
schema, this document's select-option lists and required/requiredWhen
markers for the four applicant-data steps are inferred (from field-name
semantics, same-jurisdiction precedent, and corroborating DFA-affiliated
documentation), not read from a live render. See its own VERIFICATION.md.
**Mexico** (`mx/sre/passport-application`, GOV-1504) is new this cycle: the
Secretaría de Relaciones Exteriores' Form OP-5, a directly downloadable,
non-image text-layer PDF covering first-time/renewal/replacement requests at
a consular office abroad. Two prior cycles (GOV-1428, GOV-1435) had
explicitly deferred this vertical as "in-person appointment only"; this
cycle found that disqualifier did not actually hold (every Passport schema
in this registry is ultimately in-person/biometric) once a genuine
downloadable form was located. See its own VERIFICATION.md for six disclosed
judgment calls, including a coordinate-level re-derivation of the form's
dense five-column physical-description ("Filiación") checkbox grid.

### DMV — Vehicle Registration, Licensing, Permits (39/41 jurisdictions — 95%)

**Thailand's DMV vertical opens (4 of 6) (GOV-2637)**, via
`th/dlt/vehicle-registration-application` (Form ขส.บ. 10, the Department of
Land Transport's "แบบคำขอจดทะเบียนรถ"). See the Executive Summary update
above and the document's own VERIFICATION.md for the full sourcing record —
including the ruled-out corroborating-source false lead and the disclosed
staff/inspector-completed content excluded from scope.

**Rwanda opens as the registry's 43rd jurisdiction via its DMV vertical
(GOV-2526)**, via `rw/rra/vrf-e06-motor-vehicle-registration-form` (Rwanda
Revenue Authority's Motor Vehicle Registration Form, RRA-MVD-VRF-E06). See
the Executive Summary update above and the document's own VERIFICATION.md
for the full sourcing record, including a corrected widget-type breakdown
against a prior scouting pass and a disclosed shared-radio-field-object
defect (the Steering Wheel and Customs Regime selectors share one AcroForm
field).

**Vietnam's DMV vertical opens (4 of 6) (GOV-2479)**, via
`vn/bca/to-khai-dang-ky-xe` (Mẫu ĐKX10, "Giấy khai đăng ký xe," issued under
Thông tư 79/2024/TT-BCA, Bộ Công an/Ministry of Public Security). See the
Executive Summary update above and the document's own VERIFICATION.md for
the full sourcing record, the legal-currency check across the circular's
three-amendment chain, and every disclosed scoping/judgment call.

**Uruguay's DMV vertical opens (2 of 6) (GOV-2456)**, via
`uy/imm/empadronamiento-vehiculos-nacionales` (Formulario F19,
"Empadronamiento de Vehículos," Intendencia de Montevideo's Servicio de
Contralor y Registro de Vehículos). See the Executive Summary update above
and the document's own VERIFICATION.md for the full sourcing record, field
inventory, and every disclosed judgment call.

**Finland's DMV vertical is now closed (GOV-2356)**, via
`fi/traficom/luovutuskirja-ajoneuvon-omistusoikeuden-siirrosta` — Traficom's
(the Finnish Transport and Communications Agency) form B124, "Luovutuskirja
ajoneuvon/vesikulkuneuvon omistusoikeuden siirrosta" (Deed of transfer of
ownership for a vehicle/watercraft), a private-party bill-of-sale/
title-transfer deed. A prior cycle (GOV-2276's own parent scouting pass)
had screened Traficom's core driving-licence and vehicle-registration flows
as Suomi.fi-login-gated or in-person-only, considering and rejecting only
two narrow downloadable companion forms (F122, a doctor's attestation on
driving fitness, not applicant-facing; B527, a paperless-vehicle
registration notice, too narrow-scope); B124 is a distinct, genuinely
citizen-facing, unauthenticated title-transfer deed neither prior pass
considered. See the Executive Summary update above and the document's own
VERIFICATION.md. This closes Finland to 5 of 6 verticals — only Passport
remains unmodelled, and it is a confirmed dead end (Finland eliminated
paper passport applications in 2006), so no vertical remains genuinely open
for Finland.

**Denmark's DMV vertical gains a second schema (GOV-2355)**, via
`dk/motorstyrelsen/tilladelse-til-koersel-med-udenlandsk-registreret-koeretoej`
— Motorstyrelsen's form 21.059, "Ansøgning om tilladelse til kørsel i
Danmark med udenlandsk registreret køretøj" (Application for permit to
drive a foreign-registered motor vehicle for private purposes in Denmark),
a genuinely distinct citizen-facing intake form with no overlap with P23T
(below) or either DMV candidate the GOV-2253 cycle screened and rejected.
See the Executive Summary update above and the document's own
VERIFICATION.md for the full sourcing record (38 distinct AcroForm fields
across 48 widgets, 4 radio-button groups, 1 `Sig` widget deliberately not
modelled). Does not change Denmark's vertical count (already 6 of 6 per
GOV-2346 below).

**Denmark's DMV vertical is now closed (GOV-2346)**, via
`dk/fstyr/samtykkeerklaering-koerekort-under-18` — Færdselsstyrelsen's form
P23T, "Samtykkeerklæring ved ansøgning om kørekort — Under 18 år" (Consent
Declaration for a Driving Licence Application, under 18), the parent/legal-
guardian consent declaration required whenever a driving-licence applicant
is a minor. GOV-2253 had screened this vertical fresh and set it aside as a
poor candidate: Færdselsstyrelsen's P23 driving-licence application is a
genuine, current AcroForm but a shared, multi-party 397-field record card
filled progressively by driving schools/police/kommune over the licence's
lifetime, not a citizen intake form; Motorstyrelsen's
vehicle-registration/re-registration flow is exclusively
MitID/TastSelv-login-gated with no static-form fallback; two further
downloadable Motorstyrelsen forms (21.063, 21.115) are current but carry
zero AcroForm fields. This cycle found P23T instead: a distinct, narrowly
scoped companion form P23's own under-18 branch references, with no
kommune/kørelærer/syn institutional fill-in section — see the Executive
Summary update above and the document's own VERIFICATION.md. This closes
Denmark to 6 of 6 verticals.

**Iceland's DMV vertical opens (GOV-2219)**, via
`is/samgongustofa/vehicle-ownership-transfer` — Samgöngustofa's Form
US.140, "Tilkynning um eigendaskipti að ökutæki" (Notification of Change
of Vehicle Ownership). See the Executive Summary update above and the
document's own VERIFICATION.md for the full sourcing record. Iceland now
stands at 4 of its 6 verticals (Business Formation, Taxes, Visa, DMV).

**Argentina's DMV vertical deepens (GOV-2204)**, via
`ar/dnrpa/solicitud-tipo-08-transferencia-motovehiculo` — the DNRPA's
Solicitud Tipo 08, motovehículo (motorcycle) variant, the sibling document
to `ar/dnrpa/solicitud-tipo-08-transferencia-automotor` below. Also a
genuinely flat/scanned image PDF extracted entirely by visual
rasterization, independently re-verified field-by-field against its
automóvil sibling rather than assumed identical: 81 of 83 fields match
exactly, with the sole substantive difference being sección "F"'s
"MARCA DE CUADRO"/"N° DE CUADRO" (motorcycle frame, modelled as
`frameMake`/`frameNumber`) in place of the automóvil form's "MARCA DE
CHASIS"/"N° DE CHASIS" (chassis). See the Executive Summary update above
and the document's own VERIFICATION.md for the full comparison record.
Argentina remains at 3 of its 6 verticals (Business Formation, Visa, DMV)
— this document deepens rather than widens DMV coverage.

**Argentina's DMV vertical opens (GOV-2187)**, via
`ar/dnrpa/solicitud-tipo-08-transferencia-automotor` — the DNRPA's Solicitud
Tipo 08, the national vehicle title-transfer form, extracted entirely by
visual rasterization since the specimen has 0 AcroForm fields, 0 widgets,
and 0 extractable text (this registry's first fully flat/scanned PDF). See
the Executive Summary update above and the document's own VERIFICATION.md
for the full sourcing story and every scope decision. Argentina now stands
at 3 of its 6 verticals (Business Formation, Visa, DMV).

**Sweden's DMV vertical opens (GOV-2063)**, via
`se/transportstyrelsen/vehicle-registration-new-vehicle` — Transportstyrelsen
Form TS8003, a genuine 41-field fillable AcroForm PDF with the authority's own
field-by-field guide embedded in the same PDF, scoped to a genuinely new
vehicle brought in by a registered importer or professionally manufactured in
Sweden (the used-vehicle/origin-check path is out of scope, per the form's
own stated limits). See the Executive Summary update above and the document's
own VERIFICATION.md for the full sourcing story, including why Taxes,
Passport, National ID, and Visa were screened and set aside this cycle.
Sweden now stands at 2 of its 6 verticals (Business Formation, DMV).

**Switzerland opens as this registry's 27th jurisdiction via this vertical
(GOV-1840)**, with `ch/sg/stva/gesuch-lernfahr-fuehrerausweis` — the canton
of St.Gallen's Strassenverkehrs- und Schifffahrtsamt's learner's-permit/
driving-licence application, a genuine 63-field AcroForm PDF cross-checked
against three further cantons' own independently-authored equivalents. See
the Executive Summary update above and the document's own VERIFICATION.md
for the full six-vertical candidate comparison.

**Malaysia opens as this registry's 25th jurisdiction via this vertical
(GOV-1774)**, with `my/jpj/driving-licence-application` — JPJ's "Borang
Permohonan Lesen Memandu" (JPJ-L1), a single form covering 21 distinct
driving-licence transactions across the Learner's, Probationary, and full
Driving Licence tiers plus the International Driving Permit. See the
Executive Summary update above and the document's own VERIFICATION.md for
the full candidate comparison.

**Portugal opens as this registry's 24th jurisdiction via this vertical
(GOV-1750)**, with `pt/imt/requerimento-carta-de-conducao` — IMT's Mod.
1-IMT driving-licence Requerimento (renewal/duplicate/replacement/exchange/
address-change). See the Executive Summary update above and the document's
own VERIFICATION.md for the full six-vertical candidate comparison.

**Estonia's DMV gap is now closed (GOV-1728)** via
`ee/transpordiamet/vehicle-transfer-notification` — the notice a registered
owner (or authorized representative) files with Transpordiamet, the Estonian
Transport Administration, when a motor vehicle is disposed of (sold, gifted,
exchanged, or otherwise transferred), amending the owner-of-record data in
Estonia's traffic/motor register per the Road Traffic Act (Liiklusseadus)
§77(2)-(3). Sourced from a genuine, unauthenticated, directly downloadable
AcroForm PDF on Transpordiamet's own "Forms" page — Transpordiamet's
authenticated e-service portal (`eteenindus.mnt.ee`) and its client-rendered
digital first-registration environment (`dire.transpordiamet.ee`) were both
screened and ruled out as primary sources first. The form's 67 generically-
named AcroForm widgets were mapped to their printed captions via
bounding-box/text-coordinate cross-referencing, cross-checked by an internal
consistency signal (the 11-box identifier clusters match Estonia's 11-digit
personal-code length; the 17-box VIN cluster matches the ISO 3779 standard).
The closer analogue of the already-published `cl/sii/aviso-venta-vehiculo`
"notice of vehicle sale/transfer" shape — see the Executive Summary update
above and the document's own VERIFICATION.md for the full candidate
screening and disclosed judgment calls. This restores the **global DMV
vertical to 23/23 (100%)**, matching Business Formation's own 23/23.

**Poland's DMV gap is now closed (GOV-1678)** via
`pl/mi/wniosek-o-rejestracje-pojazdu` — the national vehicle registration /
temporary registration / deregistration / disposal notification
application, sourced from Załącznik nr 1 do Rozporządzenia Ministra
Infrastruktury z dnia 8 listopada 2024 r. (Dz.U. 2024 poz. 1709), a static
(no-AcroForm) print template retrieved directly from `eli.gov.pl`'s
Dziennik Ustaw gazette API. Two prior cycles (GOV-1666, GOV-1671) had each
screened this same regulation and set it aside as thinner-sourced at the
time; this cycle's full `pdfjs-dist` text extraction of the form's own two
pages yields 22 fields plus 13 `documents[]` entries, modelling all four
request types this single template serves through one `requestType` enum —
see the Executive Summary update above and the document's own
VERIFICATION.md for the full candidate history and disclosed judgment
calls. This restores the **global DMV vertical to 22/22 (100%)**, matching
Business Formation's own 22/22.

Every jurisdiction reached 100% (20/20) as of GOV-1638; **Spain**, opened
via its Taxes vertical (GOV-1645), briefly reopened the gap before closing
it again this cycle (GOV-1652) with `es/dgt/solicitud-tramites-vehiculo` —
the Dirección General de Tráfico's (DGT) Modelo 01, "Trámites de
Vehículos," a single standard multi-procedure vehicle-request form covering
seven distinct DGT procedures (duplicate circulation permit, vehicle-report,
deregistration, reactivation, new registration, temporary permit,
reinstatement) through one shared field set, the same one-form-many-
procedures pattern as Colombia's own RUNT schema below. Screened alongside
Spain's national visa application (found to duplicate Germany's own
already-modelled EU-harmonized template) and CIRCE's Documento Único
Electrónico (judged too broad/unbounded) — see the document's own
VERIFICATION.md for the full candidate comparison. **Chile**
(`cl/sii/aviso-venta-vehiculo`, GOV-1638) closed the
vertical to 100% (20/20) before Spain's opening — SII's own Formulario 1816, "Aviso de Venta de
Vehículos," a sworn notice-of-vehicle-sale declaration, screened alongside
several dead ends (Registro Civil e Identificación's vehicle-registration
and driver's-licence channels, an MTT/Subtrans commercial-transport-permit
form, SII's own Formulario 22 income-tax instructivo, and an unreachable
consular e-visa subdomain) — see the document's own VERIFICATION.md for the
full candidate comparison. This vertical was at 100% (19/19) immediately
before Chile's opening (GOV-1624, Business Formation) briefly reopened it,
the same way Colombia's own opening (GOV-1567) briefly did for other
verticals. **Colombia** (`co/runt/formulario-solicitud-tramites-vehiculo`,
GOV-1567) is new this cycle and opens Colombia as the registry's 19th
jurisdiction — sourced from RUNT's own "Formulario de Solicitud de Trámites
del Registro Nacional Automotor" `.xls` form, fetched directly from
`runt.gov.co` (no login/CAPTCHA/WAF) and cross-checked against identical PDF
mirrors on multiple municipal transit-authority sites. Models all 18 of the
form's own procedure types (`tramiteType`) through one shared field set,
including a `requiredWhen`-gated buyer block for ownership transfers
(traspaso); DIAN's RUT (Formulario 001, a Business Formation candidate) was
screened first and re-confirmed weaker (three unbounded repeating
sub-sections) — see the document's own VERIFICATION.md for the full
candidate comparison and two disclosed judgment calls (the import/auction
sub-table's exact labels, and an ambiguous owner-document date field), both
read from a merged/garbled source spreadsheet cell region. **Indonesia** (`id/korlantas/international-driving-permit-registration`,
GOV-1553) is new this cycle and closes the vertical to 18/18 (100%) —
sourced from Korlantas POLRI's own live "SIM Internasional" (International
Driving Permit) online registration portal (`siminternasional.korlantas.polri.go.id`),
whose static, unauthenticated HTML embeds the full "Registrasi SIM
Internasional" form's field markup, read directly rather than paraphrased.
First-time national SIM issuance and vehicle registration (STNK/BPKB) were
both screened first and found to have no genuine field-level, unauthenticated
source: their governing regulations (Peraturan Kepolisian No. 5 and No. 7
Tahun 2021, respectively) attach no application-form lampiran (only a
vehicle-plate-code lookup table, for the latter), and their online channels
are either checklist-level prose or gated behind full mobile-app account
creation (NIK, OTP, and E-KTP biometric-liveness verification) with no
downloadable user guide — see the document's own VERIFICATION.md for the
full candidate-screening record. **Brazil** (`br/mg/detran/comunicacao-de-venda-de-veiculo`, GOV-1526) had
closed the vertical to 17/17 in a prior cycle — DETRAN-MG's (Minas Gerais) own
"Requerimento de Comunicação de Venda," the seller-side notice of vehicle
sale required under art. 134 of the Código de Trânsito Brasileiro, filed
with the state vehicle registry to record the buyer and release the seller
from ongoing liability. A prior cycle (GOV-1519) had re-screened Brazil's
DMV gap and found only a stale 2012 DETRAN-ES staff-procedures manual and
the system-generated (non-applicant-fillable) ATPV-e — this cycle instead
found DETRAN-MG's dedicated, current (PDF dated 2026-01-29), directly
downloadable, real-text-layer form, distinct from both prior dead ends;
modelled as a subnational (`BR-MG`) schema, mirroring the `br/sp/jucesp` and
`mx/semovi` precedent, since vehicle registration in Brazil is administered
per state DETRAN. This document deliberately covers only the seller's
sale-notification filing, not the buyer's separate notarized CRV/ATPV-e
transfer paperwork (still not independently field-sourceable) or their
follow-on in-person registration step — see its own VERIFICATION.md.
**The Philippines** (`ph/lto/drivers-license-application`,
GOV-1519) is new this cycle — sourced from the Land Transportation Office's
own gazetted Form No. 21 (v3, September 2023 edition), "Application for
Student Driver's Permit / Driver's License / Conductor's License", covering a
first-time (Type A, "new") application in full. A prior cycle (GOV-1466) had
already found this exact document but explicitly flagged it as weaker
sourcing: "only fetchable via a third-party CDN mirror since `lto.gov.ph`
itself is Cloudflare-gated on every path tried." This cycle reconfirmed that
gate directly (both `lto.gov.ph` and a second first-party candidate,
`officialgazette.gov.ph`'s 2014 edition of the same form, return HTTP 403)
and resolved it via the Wayback Machine — recovering a 2024-12-11 snapshot of
the exact same file at its exact same first-party `lto.gov.ph` upload path,
the same technique already proven for `mx/semovi/alta-vehiculo-foraneo`. This
closes the Philippines to 6/6 verticals. **The United Arab Emirates** (`ae/rta/vehicle-registration-renewal`,
GOV-1512) is new this cycle — sourced from the Roads and Transport
Authority's (RTA) own "Renew Vehicle Ownership User Manual" (April 2018), a
screenshot-driven walkthrough of the live online renewal wizard for a
Dubai-registered private vehicle, found directly on `rta.ae` (HTTP 200, no
login/CAPTCHA/WAF gate) — the exact provenance gap a prior cycle's screening
(GOV-1474) had flagged ("only confirmed via a third-party mirror, not the
current `rta.ae` URL"). Modelled as a subnational (`AE-DU`, Dubai) schema
since RTA is Dubai's own transport authority rather than a federal UAE
agency, mirroring the `mx/semovi` (`MX-CMX`) and `br/sp/jucesp` (`BR-SP`)
precedent. Five fields in the wizard's "Delivery Contact Information" block
have no legible on-screen label in the source at any resolution and were
inferred from their sample values' own format — flagged as this document's
weakest-sourced part in its own VERIFICATION.md, alongside seven other
disclosed judgment calls. **Mexico** (`mx/semovi/alta-vehiculo-foraneo`, GOV-1435) is
new this cycle — sourced from the Secretaría de Movilidad de la Ciudad de
México's (SEMOVI) own citizen manual for its "Ventanilla de Control
Vehicular" online portal, covering first-time CDMX registration of a private
vehicle already plated in another Mexican state (foráneo). Modelled as a
subnational (`MX-CMX`) schema, mirroring the `br/sp/jucesp` precedent, since
SEMOVI is CDMX's own mobility secretariat rather than a federal agency; the
live gov.mx host times out directly from this environment, so this was
sourced via a Wayback Machine mirror of the manual PDF (reconfirmed
independently at the GOV-1438 review gate). **South Korea** (`kr/koroad/driving-licence-application`,
GOV-1291/GOV-1303) closes the DMV gap flagged in the prior cycle — sourced
from the gazetted driving-licence-test application form (Road Traffic Act
Enforcement Rule, Attached Form No. 42-2) via law.go.kr, no login required.
**South Korea** now also has a vehicle-registration schema alongside its
driving-licence one: `kr/molit/vehicle-ownership-transfer-registration`
(GOV-1400) models transfer-of-ownership registration (이전등록) after a
sale, gift, court-commissioned act, or inheritance — sourced from the
gazetted Transfer Registration Application form (Motor Vehicle Registration
Enforcement Rule, Attached Form No. 14) via law.go.kr, cross-checked against
the Car365 (car365.go.kr) portal's own guidance and several district
vehicle-registration-office pages; the portal's own online submission
channel requires a Korean digital-certificate login and was not walked
interactively. **Norway** (`no/vegvesen/soknad-om-forerkort-og-kompetansebevis`,
GOV-2330) is new this cycle — Statens vegvesen's combined driving-licence/
competence-certificate application form, incl. a 17-question health
self-declaration, closing Norway's DMV vertical (Visa is Norway's only
remaining open vertical). **Peru** (`pe/mtc/solicitud-licencia-conducir-012-17`,
GOV-2434) is new this cycle — MTC's Dirección de Circulación Vial (DCV)
driver's-licence application, Formulario 012/17.03, "Solicitud - Licencias
de Conducir," a single cover form spanning ~20 procedure codes (first
issuance, renewal, category upgrade, exchange, duplicate, correction,
hazmat endorsement); this schema scopes to the nine codes relevant to an
individual obtaining/renewing/upgrading/replacing their own Clase A licence.
The canonical `portal.mtc.gob.pe` host is unreachable at the TCP level from
this environment, so the form was retrieved via a Wayback Machine capture
whose content digest is unchanged across three years of crawls, corroborated
current by MTC's own TUPA procedure entry for DCV-037. Remaining gaps are all **sub-process/edition** expansions
within an already-covered vertical:

- **CDL (commercial driver licence):** only `us/ca/dmv/commercial-drivers-license-application` exists. No CDL-equivalent schema yet for GB (HGV/PCV — `gb/dvla/lorry-bus-provisional-licence` is the closest analogue), DE, FR, IE, IN, NL, NZ, SG, ZA.
- **IDL (International Driving Permit):** covered for US (`dos/international-driving-permit-aaa`, `-aata`), IE (`dttas/international-driving-permit`), GB (`dvla/international-driving-permit`). Not modelled elsewhere.
- **India, GOV-1240:** `in/morth/driving-licence-application` (this cycle) closes the "Issue of New Driving Licence" gap that `in/morth/learners-licence-application` (GOV-878) explicitly scoped out. India's DMV vertical now has 5 schemas (learner's licence, driving licence, vehicle registration, vehicle registration renewal, vehicle ownership transfer).
- **United Arab Emirates:** only the vehicle-ownership renewal pathway is modelled (`ae/rta/vehicle-registration-renewal`, GOV-1512); first-time vehicle registration and driver-licence issuance are open sub-process candidates for a future cycle.
- **Brazil:** only the seller-side sale-notification filing is modelled (`br/mg/detran/comunicacao-de-venda-de-veiculo`, GOV-1526, Minas Gerais); `br/cnh` first driving licence remains a confirmed dead end (gov.br-SSO-gated, see GOV-1400), and the buyer-side CRV/ATPV-e ownership-transfer paperwork and full first-time/new-vehicle registration remain open sub-process candidates for a future cycle, contingent on finding a genuine citizen-facing application form for either (as opposed to a staff manual or a system-generated output) from a non-gov.br-gated state DETRAN.
- **Mexico:** only the foráneo (out-of-state) private-vehicle registration pathway is modelled (`mx/semovi/alta-vehiculo-foraneo`, GOV-1435); a brand-new-from-dealer registration pathway and driver-licence issuance are open sub-process candidates for a future cycle.
- **Philippines:** only the Type A ("new") SP/DL/CL pathway is modelled (`ph/lto/drivers-license-application`, GOV-1519); the other ten `typeOfApplication` transaction types (renewal, conversion of foreign licence, additional code/category, etc.) share the same form but their distinct downstream document requirements are open sub-process candidates for a future cycle.
- **Indonesia:** only the International Driving Permit (SIM Internasional) registration pathway is modelled (`id/korlantas/international-driving-permit-registration`, GOV-1553); first-time national SIM (driving licence) issuance and vehicle registration (STNK/BPKB) remain open sub-process candidates for a future cycle, contingent on a genuine field-level, unauthenticated source becoming available (see the document's own VERIFICATION.md for what was screened and rejected this cycle).
- **Peru:** only nine of Formulario 012/17.03's ~20 procedure codes are modelled (`pe/mtc/solicitud-licencia-conducir-012-17`, GOV-2434) — first issuance, renewal, category upgrade, and duplicate for an individual's own Clase A licence; the military/police, diplomatic, refugee/asylum, foreign-licence-exchange, MATPEL hazardous-materials-endorsement, and information-correction procedure codes remain open sub-process candidates for a future cycle. Vehicle registration/transfer through SUNARP was not screened this cycle (the DCV licence pathway won on first-source strength) and remains an open candidate too.

### Business Formation — Incorporation, LLC, Company Registration (44/45 jurisdictions — 98%)

**Serbia opens (1 of 6) via Business Formation (GOV-2725)**, via
`rs/apr/jrpps-pr-sole-proprietor-registration` — the Agency for Business
Registers' (APR) unified "JRPPS" registration application, sole-proprietor
(`preduzetnik`) pathway, 2025 edition. Sourced from a Wayback Machine
capture (`sha256:
0a7ebff903fa896a6b8c3d14f440d087aa7ec341cdb25cfe04b8b04bd0cc69ca`, 412,964
bytes) after the live host (`apr.gov.rs`) was found fully down (23
consecutive HTTP 500s, including on the bare domain root). Confirmed
genuinely AcroForm-fillable via `pdfjs-dist`: 10 pages, 244 distinct field
names (197 anchored to a visible page). 160 `fields[]` + 7 `documents[]`
entries, covering the business-name construction (personal name +
`preduzetnik`/`pr` designation + seat place, plus optional fantasy name and
translations), seat and postal-receipt addresses, registration duration,
predominant activity, a 14-level qualification-code enum, up to 3 joint
procurators and up to 3 branch operating locations (bounded repeating
groups), an optional register annotation, and the Tax
Administration/lump-sum-taxation/VAT-registration sections. Two disclosed
judgment calls: page 1's 11-option register-selection radio group is
excluded (this PR-specific edition always registers in the Register of
Business Entities); the seat address's house number spans two adjacent
widgets with no distinguishing sub-label, unique to that one address block
— the first is modelled, the second excluded as an unlabeled duplicate. 2
valid plus 9 mutation-control conformance fixtures (each raising exactly 1
error) passed. **Serbia now stands at 1 of 6 verticals**; DMV, Taxes,
Visa, National ID, and Passport remain open backlog.

**Ghana's Business Formation vertical opens (4 of 6) (GOV-2704)**, via
`gh/orc/registration-of-a-subsidiary-business-name` — the Office of the
Registrar of Companies' (ORC) Form C, "Registration of a Subsidiary
Business Name," under the Business Names Act, 1962 (Act 151). A flat,
non-AcroForm print specimen independently re-fetched this cycle (HTTP 200,
`application/pdf`, 445,953 bytes, `sha256:
15e0184521e6dd118dcafe226ce02ea3955b629b8a0189a72779a4e86f38efe4`, matching
the task's own pre-scouted figures exactly) after independently
re-confirming the live link from `orc.gov.gh/forms-fees/`'s own accordion.
74 `fields[]` + 1 `documents[]` entry: business/parent-company
identification; a 27-item sector tick-box grid (each modeled as its own
boolean field, since v0.3 has no multi-select/labelled-option member) plus
an "Others" escape hatch; up to three ISIC codes or a free-text activity
description; a Principal Place of Business address; a Registered Address
gated by a same-as-principal-place question; an optional multi-location
Other Place of Business; a Postal Address; Contact details; MSME Details
feeding the source's own downstream Micro/Small/Medium classification
table; a Business Operating Permit request; and a Director/Secretary
Declaration. A disclosed specimen artifact: the sector grid prints
"Estate/Housing" twice, modeled as one boolean field. Section (L), "For
Office Use Only," and the Declaration's Stamp/Seal and Signature lines are
excluded as staff-populated/physical, consistent with `gh/nia`/`gh/gis`
precedent. Scoping note: ORC's primary one-person business-name
registration form ("Form A") remains undownloadable; this schema covers
subsidiary/branch registration only, disclosed as an open gap. 2 valid
plus 7 mutation-control conformance fixtures (each raising exactly 1
error) passed. **Ghana now stands at 4 of 6 verticals** (National ID &
Civic Documents, Taxes, Visa, Business Formation); Passport and DMV remain
open backlog. See GOV-2704 and this schema's own `VERIFICATION.md` for the
full sourcing record.

**Bangladesh's Business Formation vertical opens (5 of 6) (GOV-2687)**, via
`bd/roc/declaration-on-registration-of-company-form-i` — the Registrar of
Joint Stock Companies and Firms' (RJSC) "Form-I: Declaration on Registration
of Company", the statutory declaration of compliance prescribed under
section 25 of the Companies Act, 1994. Reverses this catalog's own prior
finding that RJSC's numbered incorporation forms were "only mirrored on a
third-party legal-services site, not RJSC's own domain": RJSC's own forms
portal (`roc.gov.bd`) has since been rebuilt on the same Oracle Cloud
object-storage distribution pattern already seen elsewhere in this registry
for Bangladesh's BRTA/DIP forms, and now hosts this and companion forms
first-party (independently re-fetched this cycle: HTTP 200, `application/
pdf`, 83,237 bytes — matching the task's own cited size exactly). A genuine
single-page, plain print-and-fill specimen (confirmed via `pdfjs-dist`: zero
AcroForm annotations), independently cross-checked by rendering the page to
an image via `pdfjs-dist` + `node-canvas`. The form's own central declaration
is a strike-out construction (the declarant is either an Advocate/Attorney/
Pleader engaged in the company's formation, or a Director/Manager/Secretary
named in its Articles), modeled as a single 6-value enum consistent with
this registry's precedent for slash-separated printed choice lists; the
officer branch's own trailing company-name blank is gated `requiredWhen` on
that choice. A verbatim source artifact (the printed text reads "___ and and
that all the requirements", the word "and" twice in succession) is disclosed
rather than silently corrected. 6 `fields[]` + 1 `documents[]` entry; two
valid plus three mutation-control conformance fixtures passed. **Bangladesh
now stands at 5 of 6 verticals** (Taxes, DMV, Passport, Visa, Business
Formation); only National ID remains open backlog. See GOV-2687 and this
schema's own `VERIFICATION.md` for the full sourcing record.

**Thailand's Business Formation vertical opens (2 of 6) (GOV-2601)**, via
`th/dbd/boj-1-application-to-register-a-limited-company` — the Department
of Business Development (DBD)'s "แบบ บอจ.1" (Form บอจ.1), a candidate
scouted alongside a Visa candidate in GOV-2591's prior cycle and delegated
in parallel (GOV-2599) after Taxes opened Thailand as this registry's 44th
jurisdiction (GOV-2593). A 2-page, 101-AcroForm-widget specimen,
independently re-fetched and re-hashed this cycle (`sha256:
433aace18e925d75236afe99e08796763744040e5f10f5781445e77d70796f72`, matching
the task's own citation exactly; per-page widget counts 45/56 also
independently reproduced via `pdfjs-dist`, this time correlating checkbox/
text labels on both sides of each widget's rect after an early scratch pass
showed left-only correlation returns empty checkbox labels on this
particular form). Full-text reading of both pages found this form is not
the comprehensive company-details form its title might suggest: page 1 is
a registrar-facing routing/cover form whose 20 checkboxes are a 17-value
registration-action-type selector (new incorporation, standalone
Memorandum-of-Association registration, partnership conversion, capital
increase/decrease/merger special resolution, five distinct Memorandum/
Articles amendment sub-types, a merger, a director change, and others) plus
3 independent post-registration add-on requests (labor-bylaw copy,
trademark registration, import/export ID card) — not, as initially
anticipated, a document-attachment checklist; page 2 is a bundled
"หนังสือรับรอง" (Certificate of Incorporation) template the Registrar
completes and issues after approval, not an applicant input. This v1.0.0
scopes to the new-incorporation (`จัดตั้งบริษัทจำกัด`) action pathway — the
full 17-value `registrationActionType` enum, the 3 post-registration add-on
checkboxes, company-name/existing-registration identification, a
two-signatory signature block, and the page-1 footer's statutory
false-statement warning notice — 10 `fields[]` and 1 `documents[]` entry.
The 16 non-formation action types' own dependent free-text sub-fields, the
Registrar/witness certification block, and the entirety of page 2 are
explicitly out of scope and disclosed in the schema's own VERIFICATION.md.
Two mock conformance scenarios (0 errors each) plus 5 mutation controls
(each raising exactly 1 error) passed. **Thailand now stands at 2 of 6
verticals** (Taxes, Business Formation); DMV, Passport, and National ID
were screened and found weak/dead-end in the prior cycle; Visa (MFA
Non-Immigrant Visa B/Employment) was delegated in parallel to GOV-2602. See
the Executive Summary's GOV-2601 update above for the full sourcing record
and the document's own VERIFICATION.md for every scoping/disclosure
judgment call.

**Rwanda's Business Formation vertical opens (3 of 6) (GOV-2585)**, via
`rw/rdb/rf-001-domestic-company-application-for-incorporation` — the Rwanda
Development Board (RDB)'s "RF-001 Domestic Company Application Form for
Incorporation," a candidate pre-scouted and confirmed strong in GOV-2569's
research cycle but left unauthored until now. A 10-page, 18-section
specimen carrying a real text layer but 0 AcroForm widgets (confirmed via
`pdfjs-dist`), like `rw/dgie`'s Visa specimen. Models the shared form's full
printed breadth (Registration-reason/Category selectors, company
Identification, Applicant, Head office address, an optional Chairman, the
Managing director, an optional Company secretary, a bounded 2-slot Member-
of-the-board group, optional Auditor/Accountant Person-or-Organization
blocks, a bounded 3-slot Business activities group, company-level Capital
information gated on Category, a first Subscriber and first Guarantor slot,
and the Amalgamation/Dormancy/Dissolution sections each gated on
Registration-reason) as 256 `fields[]` + 19 `documents[]` entries. See the
Executive Summary's GOV-2585 update above for the full sourcing record,
including a modelling bug (over-strict share-subtype gating) caught and
fixed via this cycle's own conformance-fixture testing, and the document's
own VERIFICATION.md for every scoping/disclosure judgment call. Rwanda now
stands at 3 of 6 verticals (DMV, Visa, Business Formation); Passport,
Taxes, and National ID remain open.

**Nigeria opens as this registry's 42nd jurisdiction via this vertical
(GOV-2518)**, via
`ng/cac/cac-1-1-application-for-registration-of-company` — the Corporate
Affairs Commission (CAC)'s Form 1.1, "Application for Registration of
Company," under the Companies and Allied Matters Act 2020 (CAMA 2020). A
prior scouting pass (GOV-2507) had cited this form's hash/byte size (both
independently reconfirmed exactly this cycle) and a widget count this
cycle's own `pdfjs-dist` extraction corrected — 87 widgets (75 text, 9
choice, 3 checkbox), not the prior "3 button, 2 choice" (the choice-widget
count had been undercounted by 7). Extraction also surfaced a genuine
field-name-reuse defect in the source PDF itself: the ID-type and gender
dropdowns share one fully-qualified AcroForm field name across all four
printed director slots (plus the individual secretary, for ID type),
meaning a real PDF viewer would silently synchronize every slot's value —
disclosed, and deliberately not preserved in this schema, which models each
slot's ID type/gender as its own independent field. See the Executive
Summary's GOV-2518 update above for the full sourcing record and the
document's own VERIFICATION.md for every scoping/disclosure judgment call.
Nigeria now stands at 1 of 6 verticals (Business Formation); Passport, DMV,
Taxes, Visa, and National ID remain open, unscreened backlog for future
cycles.

**Kenya opens as this registry's 40th jurisdiction via this vertical
(GOV-2493)**, via `ke/brs/cr1-application-to-register-a-company` —
Kenya's Business Registration Service (BRS) Form CR1, "Application to
Register a Company" (Section 13 of the Companies Act, 2015; Registrar of
Companies (Forms) Rules, Legal Notice 103 of 2017). A prior scouting pass
had reported an older, plainer 2016 PDF specimen with only 0 AcroForm
widgets and an apparently-truncated private/public and
shares/guarantee/unlimited selection (each printed only its first branch,
with no visible alternative); independently re-fetching found BRS's own
currently-linked docx template instead, which resolves both distinctions
cleanly via two genuine mark-one-of-N drawn-box selections. See the
Executive Summary's GOV-2493 update above for the full sourcing record —
including the docx-vs-PDF discovery — and the document's own
VERIFICATION.md for every scoping/disclosure judgment call. Kenya now
stands at 1 of 6 verticals (Business Formation); Passport, DMV, Taxes,
Visa, and National ID remain open, unscreened backlog for future cycles.

**Vietnam's Business Formation vertical opens (GOV-2443)**, via
`vn/dangkykinhdoanh/dang-ky-doanh-nghiep-tnhh-mot-thanh-vien` — Mẫu số 2,
Phụ lục I, "Giấy đề nghị đăng ký doanh nghiệp — Công ty trách nhiệm hữu hạn
một thành viên" (Enterprise Registration Application for a single-member
LLC), issued under Thông tư 68/2025/TT-BTC. Scoped deliberately to the
single-member LLC pathway within Phụ lục I's own 80-template appendix,
disclosing the sibling sole-proprietorship/multi-member-LLC/joint-stock/
partnership templates (and their own member-list companion forms) as out
of scope, since none of them apply once a company has only one owner. See
the Executive Summary's GOV-2443 update above for the full sourcing
record — including the primary `dangkykinhdoanh.gov.vn` host turning out
unreachable this cycle despite a prior cycle's note to the contrary, and
this schema instead sourcing directly from Công báo, the Official Gazette
of the Government of Vietnam — and the document's own VERIFICATION.md for
every scoping and judgment call. Vietnam now stands at 3 of its 6
verticals (Passport, Taxes, Business Formation); DMV and Visa remain open
backlog candidates, and National ID is a confirmed dead end.

**Norway opens as this registry's 35th jurisdiction via this vertical
(GOV-2316)**, via `no/brreg/samordnet-registermelding` —
Brønnøysundregistrene's form BR-1010B, "Samordnet registermelding"
(Coordinated Register Notification), the central multi-purpose form used
to register a business or company with the Central Coordinating Register
for Legal Entities, the Register of Business Enterprises, NAV's
Employer/Employee Register, and several other Norwegian registers at
once, across essentially every legal entity type. See the Executive
Summary's GOV-2316 update above for the full sourcing record, including
the 240 `fields[]`/6 `documents[]` consolidation from 378 of 379 distinct
widget names (1 disclosed exclusion), the registry's largest bounded
repeating-group flattening to date (an 11-row board/participants table),
and the two disclosed lower-confidence checkbox-row mappings (merger and
demerger decision types) that could not be cross-checked against a
rendered visual. Norway opens with 1 of its 6 verticals (Business
Formation); National ID, DMV, and Visa remain open, unscreened-in-depth
backlog candidates, and Taxes/Passport are confirmed weak/dead-end
candidates — see "Known Gaps" below.

**Finland's Business Formation vertical opens (GOV-2292)**, via
`fi/prh/start-up-notification-y1` — PRH's and Vero's jointly published
form Y1, "Perustamisilmoitus" ("Start-up notification"), used to register
a limited company, co-operative, foundation, or other listed organisation
type with the Trade Register or Register of Foundations, simultaneously
with the VAT/Prepayment/Employer registers. See the Executive Summary's
GOV-2292 update above for the full sourcing record, including the
7-entry "Enclosures" appendix-form checklist modelled as `documents[]`
and the disclosed either/or postal-vs-street-address judgment call.
Finland now stands at 2 of its 6 verticals (Visa, Business Formation).

**Denmark's Business Formation vertical opens (GOV-2268)**, via
`dk/erst/virksomhedsregistrering` — Erhvervsstyrelsen's form 40.110,
"Virksomhedsregistrering," the MitID-free paper fallback foreign
businesses without a Danish CVR number use to register. See the
Executive Summary's GOV-2268 update above for the full sourcing record,
including two disclosed tooltip-copy-paste quirks and a bounded 4-slot
EU-country/VAT-number repeating pair. Denmark now stands at 4 of its 6
verticals (Passport, Taxes, National ID, Business Formation); Visa and
DMV remain open backlog candidates.

**Argentina's Business Formation vertical deepens with the individual/
persona física analogue (GOV-2195)**, via
`ar/afip/inscripcion-cuit-personas-fisicas` — AFIP's Formulario 460/F,
"Solicitud de Inscripción / Modificación de Datos — Personas Físicas y
Sucesiones Indivisas," the natural-person/undivided-estate counterpart to
`ar/afip/inscripcion-cuit-personas-juridicas` (F.460/J) below. A fresh,
hash-verified re-fetch and independent `pdfjs-dist` extraction found a
genuine, fully interactive fillable AcroForm — 148 raw widgets across 2
pages resolving to 139 real distinct fields (130 single-widget fields plus
9 genuine PDF radio-button groups, confirmed via shared `kidIds`) — **not**
the flat/0-widget form this catalog's own GOV-2179 update had previously
(and incorrectly) claimed; see the Executive Summary's GOV-2195 update
above for the correction. Structurally simpler than its F.460/J sibling in
two ways: no Original/Duplicado mirrored-copy structure (2 pages, not 4)
and no split-digit-box fields at all (its CUIT box, for instance, is one
unrestricted text field, not 11 single-digit boxes); but it needed no
`exclusivityGroups`, since its 9 Sí/No-style choices are genuine PDF radio
groups (a single `enum` field each) rather than F.460/J's independent,
non-grouped checkbox pairs. See the document's own VERIFICATION.md for the
full reconciliation record, every judgment call (including two disclosed
PDF-authoring quirks — a radio group with copy-pasted exportValues, and a
field named `Apellido.0.1` that actually holds the "Nombres (completo)"
value), and the mock conformance test run. Argentina remains at 3 of its 6
verticals (Business Formation, Visa, DMV); its remaining three (Passport,
Taxes, National ID) are open, unscreened-or-dead-end backlog candidates.

**Argentina opens as this registry's 32nd jurisdiction via this vertical
(GOV-2169)**, via `ar/afip/inscripcion-cuit-personas-juridicas` — AFIP's
Formulario 460/J, "Solicitud de Inscripción / Modificación de Datos —
Personas Jurídicas," the combined request form legal entities use to
either newly register for a CUIT or update previously-registered data,
sourced from a genuine, unauthenticated, no-WAF fillable-AcroForm PDF
directly on `serviciosweb.afip.gob.ar`. See the Executive Summary update
above and the document's own VERIFICATION.md for the full sourcing and
widget/field-reconciliation record. Argentina opened with 1 of its 6
verticals (Business Formation); its individual/persona física analogue has
since been published too (GOV-2195, see above).

**Portugal's Business Formation gap closes (GOV-2143), giving Portugal 6 of
its 6 verticals** — via
`pt/at/declaracao-inicio-atividade-pessoas-singulares`, AT's "Declaração de
Início de Atividade" for natural persons starting a business/professional
activity, sourced from AT's own current informational leaflet after IRN's
"Empresa na Hora"/"Empresa Online" pacto-social specimens were re-verified
from scratch and re-confirmed scanned images with no text layer. See the
Executive Summary update above and the document's own VERIFICATION.md for
the full four-candidate sourcing comparison. Portugal is now the second
non-original jurisdiction in this registry to reach 6/6 (after Colombia,
GOV-1616).

**Austria opens as this registry's 31st jurisdiction via this vertical
(GOV-2107)**, via `at/gewerbebehoerde/trade-licence-registration` —
the Gewerbeanmeldung (trade-licence registration) under the federal
Gewerbeordnung 1994, sourced from Land Oberösterreich's current fillable
AcroForm PDF (LWLD-Wi/E-8) and cross-checked against the federal USP
portal's own process explainer. See the Executive Summary update above and
the document's own VERIFICATION.md for the full sourcing story. Austria
opened with 1 of its 6 verticals (Business Formation); its remaining five
(Passport, DMV, Taxes, Visa, National ID) are open, unscreened backlog
candidates for a future cycle.

**Iceland opens as this registry's 30th jurisdiction via this vertical
(GOV-2077)**, via `is/skatturinn/business-employer-vat-registration` —
Skatturinn Form RSK 5.02, a combined business/employer/VAT registration
notification. See the Executive Summary update above and the document's own
VERIFICATION.md for the full sourcing story. Iceland opened with 1 of its 6
verticals (Business Formation); **its Taxes vertical has since opened too
(GOV-2084)**, via `is/skatturinn/simplified-individual-tax-return` — see the
Taxes vertical section below and the Executive Summary update above.
**Iceland's Visa vertical has since opened too (GOV-2210)**, via
`is/utl/other-residence-permit-application` — Útlendingastofnun Form D-110,
"Other Residence Permits" — see the Visa vertical section below and the
Executive Summary update above. Iceland now stands at 3 of its 6 verticals
(Business Formation, Taxes, Visa); its remaining three (Passport, DMV,
National ID) are open backlog candidates — Passport and DMV were screened in
the GOV-2084 cycle and found e-service-only/in-person with no field-by-field
form; National ID remains unscreened.

**Sweden opens as this registry's 29th jurisdiction via this vertical
(GOV-2056)**, via `se/bolagsverket/aktiebolag-formation` — Bolagsverket Form
816, scoped to a single founder who is also the company's sole ordinary board
member (plus the deputy member Swedish company law mandates for a board that
small), an all-cash share-capital contribution, and the small-company audit
exemption. See the Executive Summary update above and the document's own
VERIFICATION.md for the full sourcing story. Sweden opened with 1 of its 6
verticals (Business Formation); its DMV vertical has since opened too
(GOV-2063, see the DMV section below) — Sweden now stands at 2 of its 6
verticals, with Passport, Taxes, Visa, and National ID as open backlog
candidates (Passport/National ID/Visa confirmed dead ends/duplicates per
GOV-2063's own research trail; Taxes remains genuinely unscreened).

**Japan's Business Formation vertical is deepened with a third
stock-company-incorporation variant (GOV-2049)**, via
`jp/houmukyoku/stock-company-establishment-registration-application-board-of-directors`
— the "board of directors installed, incorporation by promoters" variant,
alongside the existing no-board-of-directors Kabushiki Kaisha schema and the
Godo Kaisha (LLC) schema. See the Executive Summary update above and the
document's own VERIFICATION.md for the full sourcing story, including the
line-by-line diff against the no-board sibling that grounds this variant's
mandatory (rather than optional) auditor. Japan's vertical count remains 4 of
6 (Visa, National ID, Business Formation, Taxes) — this deepens rather than
widens coverage. **A fourth stock-company-incorporation variant is now
published too (GOV-2152)**, via
`jp/houmukyoku/stock-company-establishment-registration-application-board-of-directors-public-subscription`
— the "board of directors installed, public subscription" (募集設立)
variant, isolating the public-subscription axis against the same
board-installed baseline the GOV-2049 sibling established. The registered
"matters to be registered" content is unchanged from that sibling; only the
attachment list differs, gaining a share-subscription-application
attachment, a stricter bank/trust-company funds-custody certificate, and
organizational general meeting minutes, each grounded in Companies Act arts.
64 and 87-92's own public-subscription requirements. See the Executive
Summary update above and the document's own VERIFICATION.md for the full
sourcing story, including a disclosed text-positioning artifact on the blank
template's own attachment list, cross-checked against the worked example.
Japan's vertical count remains 4 of 6 (Visa, National ID, Business Formation,
Taxes) — this again deepens rather than widens coverage; only row 1-4 (no
board of directors, public subscription) remains open on this index page.
**The fifth and final stock-company-incorporation variant is now published**,
via
`jp/houmukyoku/stock-company-establishment-registration-application-public-subscription`
— the "no board of directors, public subscription" (募集設立) variant,
isolating the same public-subscription axis against the no-board/promoter-only
baseline (GOV-2019) instead of the board-installed one. The registered
"matters to be registered" content is unchanged from that no-board baseline;
the attachment list gains the same three public-subscription-specific
requirements the board-installed sibling already isolated (a share-
subscription-application attachment, a stricter bank/trust-company
funds-custody certificate, organizational general meeting minutes), while the
board-installed sibling's own board-elected-representative-director and
mandatory-auditor fields do not carry over, since this variant has no board.
See the Executive Summary update above and the document's own VERIFICATION.md
for the full sourcing story, including a disclosed genuine cross-document
wording variation and a disclosed out-of-scope branch-office
registered-matter line. Japan's vertical count remains 4 of 6 (Visa, National
ID, Business Formation, Taxes) — this again deepens rather than widens
coverage. **All four Legal Affairs Bureau stock-company-incorporation
variants on this index page are now published.**

**Japan's Seal Registration Notification companion filing is now published
(GOV-2035)**, via `jp/houmukyoku/seal-registration-notification` — the Legal
Affairs Bureau's generic seal-registration/seal-change notification (印鑑届書),
common to every entity type it registers, used both alongside a new entity's
own establishment registration and, later, whenever a representative's seal
changes. This is a companion/supporting-filing schema, not a new company-type
application; Japan's vertical count remains 3 of 6 (Visa, National ID,
Business Formation), unchanged. See the Executive Summary update above and
the document's own VERIFICATION.md.

**Japan's Business Formation vertical is deepened with a second company type
(GOV-2026)**, via
`jp/houmukyoku/limited-liability-company-establishment-registration-application`
— the Legal Affairs Bureau's Godo Kaisha (合同会社, "Limited Liability
Company") Establishment Registration Application, alongside the existing
Kabushiki Kaisha schema. See the Executive Summary update above and the
document's own VERIFICATION.md for the full sourcing story, including the
worked-example/blank-template diff and this document's two disclosed sourcing
caveats. Japan's vertical count remains 3 of 6 (Visa, National ID, Business
Formation) — this deepens rather than widens coverage.

**Japan's Business Formation gap is now closed (GOV-2019)**, via
`jp/houmukyoku/stock-company-establishment-registration-application` — the
Legal Affairs Bureau's Stock Company Establishment Registration Application
(株式会社設立登記申請書), the no-board-of-directors/incorporation-by-promoters
variant. See the Executive Summary update above and the document's own
VERIFICATION.md for the full sourcing story, including the worked-example/
blank-template diff that revealed the application's own "matters to be
registered" passage is submitted separately (attached printout, CD-R, or
online filing system), not written into boxes on the printed page. This
gives Japan 3 of its 6 verticals (Visa, National ID, Business Formation).

**Malaysia's Business Formation gap is now closed (GOV-1938)**, via
`my/ssm/sole-proprietorship-partnership-registration` — Form A (Borang A),
the First Schedule to the Registration of Businesses Rules 1957, through
which a person responsible for a new sole proprietorship or partnership
registers the business with the Registrar of Businesses under the
Registration of Businesses Act 1956 (Act 197). A genuine, unauthenticated,
directly-served source hosted on `ssm.com.my` — a Word-generated HTML
reproduction of the gazetted First Schedule's own table layout, not a PDF,
but the government's own current, self-documenting statutory text of the
form. This is a distinct statute and registry from the Companies Act 2016
company-incorporation regime whose own "Superform" specimen GOV-1774's
cycle had already screened and rejected as a zero-AcroForm-field, too-thin
specimen — that same cycle's own record explicitly flagged Form A as a
known target it had searched for but could not locate at the time. This
cycle also cross-read the parent Act 197 for legal grounding (confirming
the 30-day post-commencement registration deadline and the statutory
content requirements behind every one of Form A's printed sections) — see
the Executive Summary update above and the document's own VERIFICATION.md
for the full candidate comparison and disclosed scope decisions (Form A1
renewal and Form B change-of-particulars are distinct, later-in-time
statutory transactions and are out of scope; a single owner/partner
-particulars block is modelled, not a repeating structure for multiple
partners). This gives Malaysia 4 of its 6 verticals (DMV, Passport, Visa,
Business Formation).

**Ontario now has a second Business Formation schema (GOV-1947)**, via
`ca/on/registration/sole-proprietorship-registration` — Form 5288E,
"Register a Business Name for a Sole Proprietorship," the sole-trader
business-name registration sibling to the already-modelled
`ca/on/registration/business-incorporation` (Form 5351E), both sourced from
the same Ontario Central Forms Repository (`forms.mgcs.gov.on.ca`). This
closes the Known Gaps section's item 1 ("CA/NZ/IE/IN sole-trader/
partnership/LLP formation") for Canada's sole-trader half; see the Executive
Summary update above and the document's own VERIFICATION.md for the full
sourcing story, including a from-scratch AES decryption of the form's own
encrypted XFA packets. Ontario's own Form 5298E (general/limited partnership
registration) remains an open sub-process candidate for a future cycle.

**Ontario now has a third Business Formation schema, closing its own share
of the CA/NZ/IE/IN gap (GOV-1953)**, via
`ca/on/registration/general-limited-partnership-registration` — Form 5298E,
"Register a Business Name for a General Partnership or a Limited
Partnership," the partnership-side sibling to the sole-trader
`ca/on/registration/sole-proprietorship-registration` (Form 5288E), both
sourced from the same Ontario Central Forms Repository
(`forms.mgcs.gov.on.ca`). Contrary to expectation, the form has **no**
roster of the partnership's individual partners — it is filed by an
already-existing partnership (already holding its own BIN and company key)
to register an additional trade name, and "partner" only appears in Section
6's Authorization, where the source XFA's own `<occur max="-1"/>` allows an
unbounded number of co-authorizing partners with no counterpart in
GovSchema v0.3 (no `array` type; GSP-0009 remains proposed only). This
document narrows to one partner, of type Individual, authorizing directly —
see the document's own VERIFICATION.md for the full method and every
disclosed scope decision.

**The Czech Republic opens as the registry's 26th jurisdiction with a
Business Formation schema (GOV-1804)**, via
`cz/mpo/jednotny-registracni-formular-fyzicka-osoba` — the Ministry of
Industry and Trade's Jednotný registrační formulář (JRF, Unified
Registration Form) for a natural person, a genuine, current,
unauthenticated PDF that simultaneously reports a trade-licence
registration and, at the applicant's election, routes the same filing to
the Social Security Administration, a health-insurance company, and/or the
Tax Office. See the Executive Summary update above and the document's own
VERIFICATION.md for the full candidate comparison (which also screened and
could not reach Austria's Gewerbeanmeldung and Sweden's Skatteverket/
Transportstyrelsen forms due to an apparent environment-level connectivity
block, and confirmed Switzerland's domestic passport process is
cantonal/appointment-based with no downloadable form). The Czech Republic's
other five verticals (Passport, DMV, Taxes, Visa, National ID) are open,
unscreened backlog candidates for a future cycle.

**Estonia's Business Formation gap is now closed (GOV-1705)** via
`ee/rik/private-limited-company-foundation` — the petition for entry of a
newly-founded private limited company (osaühing/OÜ) in the Commercial
Register, sourced from the Commercial Code's and Commercial Register Act's
own enumerated memorandum-of-association/articles-of-association/
registry-card content requirements (the live e-Business Register filing
portal is digital-signature-authenticated, with no unauthenticated
field-level view). This restores global Business Formation to **23/23
(100%)** — see the Executive Summary update above and the document's own
VERIFICATION.md for the full candidate screening and sourcing detail.

**Poland's Business Formation gap is now closed (GOV-1671)** via
`pl/ceidg/wniosek-o-wpis-do-ceidg` — CEIDG-1, the form through which a
natural person registers a sole proprietorship with the Central
Registration and Information on Business (CEIDG), simultaneously registering
with ZUS/KRUS, GUS, and the tax office. A genuine, unauthenticated,
self-documenting-numbered-section PDF hosted directly on `ceidg.gov.pl`;
Poland's DMV vehicle-registration candidate was screened first and found
thinner (7 fields vs. CEIDG-1's 81) — see the Executive Summary update
above and the document's own VERIFICATION.md for the full candidate
comparison. This restores global Business Formation to **22/22 (100%)**.
This vertical reached 100% (20/20) as of GOV-1624, then reopened to 20/21
when Spain joined as a 21st jurisdiction (via its Taxes vertical, GOV-1645)
without yet having a Business Formation schema of its own. **Spain's gap is
now closed (GOV-1659)** via
`es/aeat/declaracion-censal-alta-actividad-economica-modelo-036` — AEAT's
Modelo 036, scoped to the "declaración censal simplificada" natural-person
alta (initial registration) pathway. Modelo 037, a shorter sibling form
this cycle initially considered, was confirmed suppressed (Orden
HAC/1526/2024, effective 2025-02-03); Modelo 036's own live filing channels
are session-based web applications with no downloadable blank AcroForm, so
this document is instead sourced from AEAT's own official, current,
unauthenticated "Guía práctica para cumplimentación del modelo censal 036" —
see the Executive Summary update above and the document's own VERIFICATION.md
for the full candidate comparison (which also re-screened and re-confirmed
Chile's Formulario 22 Taxes candidate as weaker: a genuine PDF but with no
AcroForm layer and no confirmed simplified track). This restores global
Business Formation to **21/21 (100%)**.
**Chile**, opened via
`cl/sii/inicio-actividades-personas-naturales` — the Servicio de Impuestos
Internos' (SII) Formulario 4415-PN, "Declaración de Inicio de Actividades
para Personas Naturales," through which an individual/sole-trader taxpayer
who already holds a RUT registers the start of an economic activity. A
genuine, unauthenticated, currently-maintained fillable AcroForm PDF hosted
directly on `sii.cl` (no login/CAPTCHA/WAF gate), whose widget layer already
carries real, descriptive internal field names (not generic placeholders),
cross-checked against its own second-page instructivo for section-mandatory
markers, the occupancy-status code legend, and the tax-regime options.
Chile's flagship same-day company-formation portal
(`registrodeempresasysociedades.cl`, "Tu Empresa en Un Día") and its national
ID/passport channels were screened first and found entirely gated behind
ClaveÚnica (Chile's national SSO) with no PDF fallback — see the document's
own VERIFICATION.md for the full candidate comparison, including Brazil's
National ID gap and a Spain AEAT-Modelo-030 candidate also screened this
cycle. This keeps global Business Formation at **100%** even as opening a
20th jurisdiction with a single vertical necessarily reopens every other
global vertical below full coverage (see each vertical's own updated
count). Colombia closed this vertical two cycles ago (GOV-1588) via
`co/rues/matricula-mercantil` — the Registro Mercantil track of RUES's
(Registro Único Empresarial y Social) shared form, the mercantile/company
registration process Colombia's Cámaras de Comercio (Chambers of Commerce)
operate nationwide under a unified format set by the Superintendencia de
Industria y Comercio (SIC). Colombia had opened as the registry's 19th
jurisdiction the prior cycle via its DMV vertical
(`co/runt/formulario-solicitud-tramites-vehiculo`, GOV-1567), leaving
Business Formation as its sole gap; DIAN's RUT (Formulario 001, previously
screened as a viable-but-weak backlog candidate — three of its six
sub-sections are unbounded repeating groups) and Colombia's online passport
wizard were both pre-screened as fallback candidates but were not needed
once RUES's own core form was properly extracted and confirmed well-bounded
(see the document's own VERIFICATION.md, including its disclosed scoping-out
of RUES's two other parallel registry tracks — Registro Único de
Proponentes and Entidades sin Ánimo de Lucro/Economía Solidaria — printed on
the same physical form but out of scope for company formation). Every other
jurisdiction already has at least one Business Formation schema, including
**Indonesia** (`id/bkpm/oss-nib-registration-individual-umk`, GOV-1546),
new this cycle and this jurisdiction's first schema — see the Executive
Summary update above for full detail — keeping the vertical at **18/18
jurisdictions (100%)** as the registry's 18th jurisdiction joins. **The
United Arab Emirates** (`ae/rakez/free-zone-establishment-registration`,
GOV-1540) is new this cycle — sourced from the Ras Al Khaimah Economic Zone
Authority's (RAKEZ) own "Application for Registration and Licence of a Free
Zone Establishment or Company" (Issue No. 03, Feb 18, 2016, Ref: LCN-019(A)),
a genuine fillable AcroForm PDF hosted directly on `rakez.com` with no login/
CAPTCHA/WAF gate. This closes the global Business Formation vertical to
**17/17 jurisdictions (100%)** — see the Executive Summary update above for
full detail. **South Korea**
(`kr/nts/corporation-establishment-and-business-registration`, GOV-1483) is
new this cycle — sourced from the National Tax Service's own gazetted
"Corporation Establishment Report and Business Registration Application"
(법인설립신고 및 사업자등록신청서), Attached Form No. 73 of the Enforcement
Rule of the Corporate Tax Act, amended 2025-03-21, fetched directly from
`law.go.kr` with no login/CAPTCHA/WAF. This closes South Korea to 6/6
verticals. Scoped to a domestic, for-profit, general corporation; the
form's own Section 3 (corporate-taxed trust property trustee), Section 4
(foreign-corporation content and manager-in-charge), division-established-
corporation registration numbers, and public-interest-corporation/foreign-
invested-corporation sub-fields are out of scope for this v1.0.0 — see the
document's own VERIFICATION.md for all twelve disclosed judgment calls, and
for this cycle's Brazil voter-registration/DMV research trail (the task
brief's own starting candidate, screened and found temporarily blocked/
gov.br-SSO-gated respectively before this cycle pivoted to South Korea).
**The Philippines** (`ph/bir/tin-application-corporations-partnerships`,
GOV-1444) is new this cycle — sourced from the Bureau of Internal Revenue's
own BIR Form No. 1903 ("Application for Registration...for Corporations,
Partnerships (Taxable/Non-Taxable), Including GAIs, LGUs, Cooperatives and
Associations", October 2025 ENCS edition), a genuine, directly downloadable,
current PDF with a real text layer — no login, CAPTCHA, or WAF gate. This
opens the Philippines as the registry's 17th jurisdiction; the closest
Philippine analogue to `us/irs/employer-identification-number-ss4` and
`mx/sat/preinscripcion-rfc-persona-moral`, so classified under Business
Formation the same way. Scoped to the form's Head Office registration
pathway; the Branch Office/Facility pathways, the BIR-internal Tax Types
panel, the Authority-to-Print-Invoices panel, and the PEZA/BOI
incentive-registration panel are out of scope for this v1.0.0 (see the
document's own VERIFICATION.md for all twelve disclosed judgment calls).
**Mexico** (`mx/sat/preinscripcion-rfc-persona-moral`,
GOV-1414) is new this cycle — sourced from SAT's (Servicio de Administración
Tributaria) own official screenshot-driven step-by-step guide PDF for its RFC
(Registro Federal de Contribuyentes) pre-registration wizard for legal
entities (personas morales); the live wizard itself is WAF/bot-mitigation-
gated (HTTP 403 to a direct fetch, reconfirmed this cycle). RFC is Mexico's
federal taxpayer/business identifier, the closest Mexican analogue to the US
EIN, so it is classified under Business Formation the same way
`us/irs/employer-identification-number-ss4` is. This corrects a prior
cycle's (GOV-1393) characterization of the SAT RFC candidate as merely "a
document checklist" — that referred to a different SAT publication (Ficha
43/CFF); the guide PDF found this cycle is a genuine field-by-field
screenshot walkthrough. Six repeating structures (additional business
addresses, multiple phone numbers, multiple economic activities, the full
economic-activity catalog, per-activity complementary questions beyond one
worked example, and multiple socios/accionistas) are explicitly out of scope
for v1.0.0, pending GSP-0009 (composite/repeating values) — see the
document's own VERIFICATION.md. **Brazil** (`br/sp/jucesp/cnpj-registration-dbe`,
GOV-1296/GOV-1342) was new in a prior cycle — sourced from the Junta Comercial do
Estado de São Paulo (JUCESP)/VRE|REDESIM integrator's own screenshot-driven
"Coletor Nacional – DBE de inscrição" tutorial, modelling the CNPJ
registration (Documento Básico de Entrada) step for a company's first
establishment. Modelled as a subnational (São Paulo, `BR-SP`) schema, since
REDESIM is a per-state integrator even though the CNPJ registry it feeds is
federal. GOV-1289's research rated KR's Business Formation vertical **WEAK**
(IROS/startbiz.go.kr both require certificate login) — not an open candidate
without new sourcing. UAE's Business Formation vertical was likewise rated
WEAK/login-gated in that same research cycle (KR's rating stands; the UAE's
was overturned in GOV-1540, which found RAKEZ's own downloadable AcroForm
application — see the Executive Summary and this section's own opening
paragraph above). Remaining gaps in the other 16 are sub-process expansions: sole
trader/partnership/LLP forms in CA, NZ, IE, and India (only SPICe+ company
incorporation modelled so far); a standalone EIN schema for the US (currently
folded into `us/irs/employer-identification-number-ss4`, which does exist);
ZA close corporation/trust/NPO formation beyond
`za/cipc/private-company-incorporation`; Brazil's own branch/filial
registration (Evento 102) and multi-partner QSA expansion beyond the single
founder modelled here; Mexico's own repeating-structure follow-ups noted
above; the Philippines' own Branch Office/Facility registration variants,
PEZA/BOI incentive-registration panel, and Authority-to-Print-Invoices
panel, all deliberately scoped out of `ph/bir/tin-application-corporations-partnerships`
v1.0.0.

### Taxes — Income Tax Return, Tax Filing (42/46 jurisdictions — 91%)

**Serbia's Taxes vertical advances (3 of 6) (GOV-2767)**, via
`rs/purs/pp-gpdg-godisnji-porez-na-dohodak-gradjana` — the Tax
Administration's "Пореска пријава о обрачунатом годишњем порезу на
доходак грађана," Form ПП ГПДГ (PP GPDG). A disclosed substitution for the
pre-scouted PPDG-2R candidate (re-confirmed live but found to govern only
the retired pre-2022 decision-based assessment process); PP GPDG is filed
exclusively electronically and has no static blank-form PDF, so this
schema is sourced from the Tax Administration's own official
user-instructions PDF, including two of its embedded portal screenshots
rendered and visually cross-checked. Models 107 `fields[]` plus 3
`documents[]` entries: filing metadata, taxpayer identification/address, a
bounded 6-slot dependents group, a 3.1-3.20 taxable-income worksheet, a
supporting-evidence list, and a free-text note. See the Executive
Summary's GOV-2767 update above and the document's own VERIFICATION.md for
the full sourcing record. Serbia now stands at 3 of 6 verticals (Business
Formation, Visa, Taxes); DMV, National ID, and Passport remain open
backlog candidates.

**Ghana's Taxes vertical opens (GOV-2697)**
(`gh/gra/personal-income-tax-return-dt-0103`) — the Ghana Revenue
Authority's (GRA) Domestic Tax Revenue Division "Personal Income Tax
Return" (Form DT 0103, edition "ver 1.1"). A genuine 4-page print-and-fill
specimen hosted unauthenticated on `gra.gov.gh`'s own forms listing,
confirmed via `pdfjs-dist` to carry zero AcroForm/Widget annotations across
all 4 pages; every field read from the extracted text layer's own
row-grouped, column-sorted coordinates. Models the form's full structure
end to end (80 `fields[]` plus 2 `documents[]`): filing identification,
personal/business (including landlord particulars gated to a rented
tenancy status)/employment information, the §4 Sources of Income breakdown
(business/employment/investment income, each gated behind its own printed
yes/no question), the full §5 Tax Computation worksheet through to
chargeable income and tax payable/(overpaid), and a two-branch Declaration
(self or representative). Two disclosed source-form artifacts (an
employment-income item list that skips 'vi' and a reliefs list that skips
'ix', each leaving its own total caption's item count stale) are modeled
verbatim rather than silently corrected. Two valid conformance fixtures
plus 6 mutation-control fixtures (each raising exactly 1 error) are
committed under `conformance/gh/gra/`. See GOV-2697 and this schema's own
`VERIFICATION.md` for the full sourcing record.

**Greece adds a third Taxes-vertical schema, Form Ε3 (GOV-2656)**
(`gr/aade/katastasi-oikonomikon-stoicheion-apo-epicheirimatiki-drastiriotita-e3`)
— AADE's Form Ε3, "Κατάσταση Οικονομικών Στοιχείων από Επιχειρηματική
Δραστηριότητα" (business/professional-activity income statement), a
companion to Form Ε1 (`gr/aade/dilosi-forologias-eisodimatos-e1-e2-e3`,
immediately below) and Form Ε2
(`gr/aade/analytiki-katastasi-misthomaton-akinitis-periousias-e2`, GOV-2644).
All four sources (the Ε3 specimen, its sub-tables companion, an 89-page
instructions manual, and an FAQ) were independently re-fetched via Wayback
Machine mirror, the primary `aade.gr` host remaining Akamai-403-blocked from
this sandbox. Reading the instructions manual's own code-by-code narrative
established that Πίνακας Δ (gross profit/EBITDA/EBIT) and most of Πίνακας ΣΤ
(final taxable-profit determination) are system-computed derivations of
Πίνακας Ζ1/Ζ2's own filer-entered revenue/expense figures, not independent
input — so this v1.0.0 models the cover-sheet/registration identification,
Πίνακας Α' taxpayer identification, Πίνακας Β' core employee-count fields,
and Πίνακας Ζ1/Ζ2's revenue/expense line items restricted to the single
"Εμπορική δραστηριότητα" (commercial/trading) activity-type column — the
source's own first and most common of its four parallel activity-type
columns. 43 `fields[]`, 5 statically `required`; the parallel activity
columns and the system-derived Πίνακας Δ/Ε/ΣΤ tables, plus niche compliance
panels (rent-paid statement, construction-company profit calculation,
country-by-country reporting, anti-money-laundering reporting, ν.4935/2022
group tax exemptions, Pillar Two top-up tax), are out of scope, disclosed in
VERIFICATION.md. Two valid conformance fixtures plus 7 mutation-control
fixtures (each raising exactly 1 error) are committed under
`conformance/gr/aade/`. See GOV-2656 and this schema's own `VERIFICATION.md`
for the full sourcing record.

**Greece's Taxes vertical opens (2 of 6)**
(`gr/aade/dilosi-forologias-eisodimatos-e1-e2-e3`, GOV-2621) — the
Independent Authority for Public Revenue (AADE)'s Form Ε1 annual personal
income tax return, tax year 2025 edition. The primary `www.aade.gr` host is
Akamai-403-blocked from this sandbox, consistent with `gr/mfa`'s own finding
for the same sandbox; the source used is AADE's own 153-page instructions
manual ("Οδηγίες Συμπλήρωσης Δήλωσης Ε1 2025", edition dated 16 March 2026,
under AADE decision Α.1062/2026), independently re-fetched this cycle via its
Wayback Machine mirror: HTTP 200, `application/pdf`, 1,169,825 bytes,
`sha256: 6055bc761a7ea193657176e80bbc0be68369f31aa26708c469b5c529310a3235`.
Unlike `gr/mfa`'s Schengen-visa source (a numbered-item form facsimile), this
is a narrative field-by-field manual with zero AcroForm widgets and no form
facsimile of its own; every field was read from the manual's own
position-sorted text layer, navigated via its own table of contents. This
v1.0.0 scopes to the salaried-employment/pension-income filing pathway: full
taxpayer/spouse identification (Πίνακας 1), all 24 informational/clearance
Yes-No codes of Πίνακας 2 (several modeled with more than a single boolean
once read individually — a country-and-category sub-panel, a hosted-person
ΑΦΜ/months/area triple, and two multi-item selectable sub-panels), and all 19
employment/pension income-and-withholding code pairs of Υποπίνακας 4Α
(modeled as filer/spouse column pairs matching the source's own two-column
structure). 98 `fields[]`, 1 `documents[]` entry. Πίνακας 3 (disability
reduction), Υποπίνακας 4Β/4Γ1/4Γ2/4Δ1/4Δ2/4Ε, Πίνακες 5-9, and companion
Forms Ε2/Ε3 are out of scope, disclosed in VERIFICATION.md. Two mock
conformance scenarios plus 5 mutation-control fixtures passed; both registry
validators pass. See GOV-2621 and this schema's own `VERIFICATION.md` for the
full sourcing record and every scoping/disclosure judgment call.

**Bangladesh opens (46th jurisdiction) via Taxes**
(`bd/nbr/individual-income-tax-return-form-it-11ga`, GOV-2612) — the
National Board of Revenue (NBR)'s IT-11GA, "Form of Return of Income for
Individual Person," 2023 edition, scouted in GOV-2591's prior cycle
alongside Rwanda/Thailand candidates after Bangladesh's other four
verticals (DMV, Business Formation, Passport, National ID) were confirmed
weak/dead-end. Independently re-located this cycle (no exact prior-cycle
URL/hash had been recorded) via NBR's own English income-tax-forms page,
then re-fetched the linked PDF directly: HTTP 200, `application/pdf`,
381,696 bytes, `sha256:
2a7f51e37ac8f6e61fd153f002b799f36ca8ced56b0013ca5ff7d1459f76f724`. Parsed
with `pdfjs-dist`: 10 pages, 0 AcroForm widgets — a printed, text-layer-only
form, confirming GOV-2591's prior characterization. IT-11GA is a wide
return spanning a 3-page main return, five annexed schedules, a
lifestyle-expense statement (IT-10BB), and a wealth statement (IT-10B);
this schema deliberately bounds scope to the general/salaried-income filing
pathway — the full 3-page main return plus Schedule 1's part (b) (income
from employment for non-government-pay-scale employees). Schedule 1 part
(a) (government-pay-scale employees), Schedules 2-4 (rent, agriculture,
business), Schedule 5's itemized breakdown, and the IT-10BB/IT-10B
companion statements are out of scope, disclosed in VERIFICATION.md. 78
`fields[]`, 3 `documents[]`. Two mock conformance scenarios plus 5
mutation-control fixtures passed; both registry validators pass. See
GOV-2612 and this schema's own `VERIFICATION.md` for the full sourcing
record and every scoping/disclosure judgment call.

**Thailand opens (44th jurisdiction) via Taxes**
(`th/rd/pit-90-personal-income-tax-return`, GOV-2593) — the Revenue
Department (RD)'s "ภ.ง.ด.90" (PIT 90) personal income tax return, tax year
2568 (2025 CE) edition, scouted in GOV-2591's prior cycle after Rwanda's
remaining verticals were confirmed dead ends. A 5-page, 432-AcroForm-widget
specimen, independently re-fetched and re-hashed this cycle (`sha256:
e47796b2b5a5e253407dc6e1d0accebb0ebcf18456ff5ee08396c487786e84e5`, matching
the issue's own citation exactly; per-page widget counts 76/95/112/78/71
also independently reproduced via `pdfjs-dist`). PIT 90 is Thailand's return
for a taxpayer with income beyond pure salary (Revenue Code sections
40(2)-(8)), spanning up to 8 income-type schedules across pages 2-4 plus a
personal-deductions/allowances attachment on page 5; this schema
deliberately bounds scope to the general/salaried-income filing pathway —
page 1's full identification/marital/filing-status/donation/refund block,
ข้อ 1 (section 40(1)-(2) employment and service-fee/commission income), ข้อ
11 (the full 25-line final tax computation completed by every filer
regardless of income type, including the alternative 0.5%-of-gross
computation and its 5,000-baht floor), and the page 5 deductions attachment
(24 numbered items) — 154 `fields[]` and 2 `documents[]`. ข้อ 2 through ข้อ
10 (royalty/goodwill, dividend/interest, rental, professional-fee,
contracting, business/commerce, the separate-taxation real-estate-sale and
gift/inheritance schedules, and the RMF/Thai-ESG/pension-insurance exclusion
election) are explicitly out of scope and disclosed, each with its reason,
in the schema's own VERIFICATION.md, along with a disclosed simplification
(several ข้อ 11 "additional tax due / overpaid tax" lines are modeled as a
single signed number rather than the source's own paired Yes/No-toggle-plus-
magnitude widgets). Two mock conformance scenarios (0 errors each) plus 5
mutation controls (each raising exactly 1 error) passed. **Thailand opens at
1 of 6 verticals** (Taxes); DMV, Passport, and National ID were screened
this cycle and confirmed weak/dead-end (in-person/biometric processes, no
unauthenticated fillable specimen); Business Formation (DBD Form บอจ.1, 101
AcroForm fields) and Visa (MFA Non-Immigrant Visa B/Employment, 58 AcroForm
fields) remain open, scouted backlog for a future cycle.

**Nigeria's Taxes vertical closes** (`ng/firs/fct-irs-personal-income-tax-return-form-a`,
GOV-2553) — the Federal Capital Territory Internal Revenue Service
(FCT-IRS)'s "Form A" Personal Income Tax Return Form, filed under the
Personal Income Tax Act (PITA). Modeled `subnational`/`NG-FC`, since Nigerian
personal income tax is administered state-by-state rather than by a single
national form. A flat, 2-page, 0-AcroForm-widget specimen (independently
re-fetched and re-hashed this cycle, matching the child issue's own
citation exactly); extraction also surfaced a font-rendering defect in the
specimen's embedded bold typeface, worked around by cross-checking two
tables' row counts against rendered vector ruling-line geometry rather than
rendered captions. 82 `fields[]` (a disclosed judgment call models every
Part B income-statement line required with a 0-permitting minimum, since
the specimen carries zero asterisks or any other required-field marking
anywhere; the spouse/children block and every Part C/D item are modeled
optional, with no synthetic Marital Status field invented to gate the
former) plus 8 `documents[]`. A disclosed printed-label discrepancy: the
source's own "Aggregate Investment Income (iv - vii above) (Y)" label is
modeled as the sum of items (v)-(viii) instead, the only numerically
consistent reading, since item (iv) is already summed into the preceding
Aggregate Earned Income line. Two mock conformance scenarios (0 errors
each) plus 4 mutation controls (each raising exactly 1 error) passed; see
the document's own VERIFICATION.md for the full sourcing record and every
disclosed scope/judgment call. **Nigeria now stands at 2 of 6 verticals**
(Business Formation, Taxes); Passport, DMV, Visa, and National ID remain
open, unscreened backlog for a future cycle.

**Kenya's Taxes vertical closes** (`ke/kra/it1-individual-resident-return`,
GOV-2535) — the Kenya Revenue Authority (KRA)'s "IT1 Individual Resident
Return", a genuinely live, unencrypted, 34-sheet Excel (.xls) workbook
(edition 18.0.1) directly downloadable from `kra.go.ke`, independently
re-fetched and re-hashed this cycle (`sha256:
7c85241bbabc797b9e3c6b708209a32866c4ec9131f9d845d0b87c9734e939e2`; a
newer-numbered sibling edition, 18.0.9-2024, was cross-checked and found
materially identical for this schema's in-scope content, while a
differently-named sibling remains genuinely password-encrypted and was not
used). Kenya's own prior cycle (GOV-2500) had already confirmed Passport,
DMV, and Visa as dead ends, leaving Taxes as Kenya's sole open,
previously-scouted-in-depth candidate — and a same-cycle correction
(GOV-2517) had already reversed an intervening wrong dead-end call on this
exact candidate, restoring it to open backlog. This schema deliberately
bounds scope to the workbook's "employed resident individual" filing
pathway, modelling only 5 of its 34 sheets (`A_Basic_Info`,
`F_Employment_Income`, `M_Details_of_PAYE_Deducted`,
`T_Income_Computation_Self`, `T_Tax_Computation`) — 86 `fields[]`,
including a bounded 2-employer repeating group spanning the employment-
income and PAYE-deducted sheets, and merging each sheet's separately-listed
"PIN of Employer"/"Name of Employer" columns into one shared identity per
employer rather than duplicating them. Every self-employment/business-
income, farming, partnership, estate/trust, capital-allowance, and
tax-credit schedule, plus the workbook's entire mirrored spousal ("Wife")
filing pathway that Kenyan tax law permits electing into, is out of scope
and disclosed as a companion-schedule candidate for a future cycle. Two
ambiguities the source itself leaves unresolved in its own embedded
comments — whether the mortgage-interest and home-ownership-savings-plan
deductions are meant to be mutually exclusive, and an explicit flag that
the embedded Ksh 13,944 personal-relief figure is a configurable template
default rather than an asserted-current legal amount — are quoted verbatim
rather than silently resolved or corrected. Two mock conformance scenarios
(0 errors each) plus 3 mutation controls (each raising exactly 1 error)
passed; see the document's own VERIFICATION.md for the full sheet-by-sheet
field inventory and every disclosed scope/judgment call. **Kenya now
stands at 3 of 6 verticals** (Business Formation, National ID, Taxes);
Passport, DMV, and Visa remain confirmed dead ends, so no vertical remains
open-and-unscreened for Kenya.

**Peru's Taxes vertical opens** (`pe/sunat/formulario-virtual-709-declaracion-renta`,
GOV-2465) — SUNAT's Formulario Virtual N° 709, "Declaración Jurada Anual
Persona Natural" (the annual individual income tax return), pre-scouted the
prior cycle (GOV-2456) against a 2024-edition guide. This cycle's own
legal-currency check (a mandatory authoring step) found that edition
already superseded: `renta.sunat.gob.pe`'s own portal is running a live
"Renta 2025" campaign, and its dedicated guide page now links only a
2025-edition "Ayuda FV-709" (HTTP 200, `sha256:740f62f08e6...`), which this
document is authored against instead. FV 709 itself remains
Clave-SOL-login-gated (no live AcroForm/HTML to extract), so this is a
structural-reference schema built from the guide's own casilla-numbered
field-by-field walkthrough, the same tier as this registry's `jp/houmukyoku`
and `pe/sunat/solicitud-inscripcion-ruc-persona-natural` precedents. A
programmatic diff against the 2024 edition confirmed all 67 distinct
casilla numbers referenced are identical year-over-year (only UIT-indexed
peso amounts changed), so this document's own casilla-cited `sourceRef`s
should remain stable across future ejercicio editions. Scoped to the
return's Sección Informativa "Otros Ingresos" disclosures (exempt/
non-taxable income, dividends, liberalidades) and the entire "Rentas de
Trabajo (Cuarta y Quinta Categoría) y/o Fuente Extranjera" income category
end-to-end (its own Sección Determinativa income/deduction casillas plus
its own Determinación de Deuda tax computation) — 47 `fields[]` entries, 0
`documents[]` (a disclosed structural fact: FV 709 is filed entirely online
against SUNAT's own pre-populated data, with no instruction anywhere in the
36-page guide to attach a supporting file). Explicitly out of scope: the
"Rentas de Capital – Primera Categoría" (rental income) and "Segunda
Categoría" (securities capital gains) tabs, each a genuinely distinct
income category with its own open-ended per-transaction wizards, flagged as
a future companion-schedule candidate. Two mock conformance scenarios (0
errors) plus three mutation controls (each raising exactly 1 error,
including this registry's first exercised use of a `requiredWhen`/
`greaterThan` gate) passed; see the document's own VERIFICATION.md for the
full casilla-by-casilla inventory and every disclosed scope decision. Peru
now stands at **4 of 6 verticals** (Visa, Business Formation, DMV, Taxes);
Passport (Migraciones) and National ID (RENIEC DNI) remain
appointment/biometric-gated.

**Vietnam's Taxes vertical opens** (`vn/gdt/to-khai-quyet-toan-thue-thu-nhap-ca-nhan`,
GOV-2411) — Mẫu số 02/QTT-TNCN, "Tờ khai quyết toán thuế thu nhập cá nhân"
(Personal Income Tax Finalization Declaration), for a resident individual
with wage/salary income self-filing their annual PIT finalization directly
with the tax authority. This is Vietnam's Taxes vertical (2 of 6), following
the Passport vertical opened the previous cycle. A pre-scouted candidate PDF
(`easyinvoice.vn`) turned out to model a template superseded by two 2025
circulars — Thông tư 40/2025/TT-BTC (a district-tier-abolition address
restructuring) and Thông tư 94/2025/TT-BTC (a new personal-ID-number chỉ
tiêu [05a]) — the same kind of legal-currency trap `vn/xuatnhapcanh` itself
caught the prior cycle. With `gdt.gov.vn` unreachable and two other gov-
adjacent PDF leads dead-ending, this schema sources the current,
amendment-incorporating template from thuvienphapluat.vn (an explicitly
sanctioned fallback), cross-checked against that same portal's own advisory
article. 70 `fields[]` and 6 `documents[]` entries model the full chỉ tiêu
[01]-[48] income/deduction/tax-liability table plus the conditional
refund-payment and budget-offset detail blocks, deferring the separate
02-1/BK-QTT-TNCN dependent schedule and the granular 13-column budget-offset
breakdown table. See the document's own VERIFICATION.md for the full
sourcing record, including the authority-name correction (Tổng cục Thuế →
Cục Thuế, effective 2025-03-01) this cycle's own research caught.

**Italy opens** (`it/agenzia-entrate/modello-730`, GOV-2382) — Agenzia delle
Entrate's Modello 730/2026, "Redditi 2025," the flagship annual income tax
return for employees and pensioners whose withholding agent performs the
year-end adjustment directly in their pay (or, since recent years, filed
"senza sostituto" with the Agenzia delle Entrate, a Caf, or a qualified
professional). This is Italy's first schema in the registry, opening it as
the 36th jurisdiction. Both the 24-page form and its 175-page istruzioni
companion were fetched fresh directly from `agenziaentrate.gov.it` (HTTP
200, no login/CAPTCHA/WAF gate); a `pdfjs-dist` extraction confirmed zero
AcroForm widgets (a static print/hand-fill template) but a genuine embedded
text layer with every field keyed to a printed casella code the istruzioni
explains rigo-by-rigo (e.g. "Rigo E21 - Contributi previdenziali e
assistenziali"), the same source tier already accepted for
`pl/mf/zeznanie-pit-37` and `es/aeat/declaracion-censal-personas-fisicas-
modelo-030`. v1.0.0 scopes to the common salaried-employee/pensioner core —
identifying data, the family-dependents schedule, Quadro C's employment/
pension income and withholding rows, and Quadro E's most common
medical-expense/mortgage-interest/pension-contribution deductions — 67
`fields[]` and 4 `documents[]` entries, explicitly deferring land/building
income, capital gains and self-employment income, the bulk of Quadro E's
coded niche deductions, the tax-credit/advance-payment quadri, and the
8x1000/5x1000 elections. See the document's own VERIFICATION.md for the
full inventory and every disclosed judgment call.

**Finland's Taxes vertical opens** (`fi/vero/50a-earned-income-and-deductions`,
GOV-2308) — the Finnish Tax Administration's (Vero, Verohallinto) form
3023e, "50A – Earned income and deductions," used to report earned
income (wages, salaries, fees, compensation, pensions, benefits) missing
from a taxpayer's pre-completed tax return or to correct it, together
with deductions from earned income, child support paid, international-
taxation elections, custody of children living outside Finland, and a
permanent spousal separation during the tax year. This was already
CATALOG.md's own confirmed-strong Known Gaps candidate (item 7), flagged
across three prior cycles (GOV-2276, GOV-2292, GOV-2299); no fresh
scouting was needed this cycle. Fetched fresh from `vero.fi`: HTTP 200,
233,558 bytes (matching the issue's own pre-recorded figure exactly),
genuine `%PDF-1.7`, 4 pages, no login/CAPTCHA/WAF gate, footer edition
"VEROH 3023e 1.2025". A `pdfjs-dist` extraction (reproduced twice, with
and without an intent filter) resolved 135 raw `/Widget` annotations
(115 Tx, 20 Btn, 0 Ch) across 126 unique field names, matching this
catalog's own separately-recorded pre-scout figure exactly, though not
the issue text's own stated figure (141 widgets/127 names/17 Btn) — a
discrepancy disclosed rather than silently reconciled, since this
cycle's own count was independently reproduced twice against the same
byte-size-matching PDF. 3 of the 126 names are page-navigation/utility
controls, clustered once on page 4 only. Every widget name was mapped to
exactly one `fields[]` entry via a disposable reconciliation script (0
unmapped), consolidating — via 31 euro/cent split-widget merges (this
registry's established convention) and two bounded repeating groups
flattened by ordinal suffix (2 wages-income rows; 3 custody-of-children-
outside-Finland rows, matching this registry's `dk/cpr` precedent) — to
92 `fields[]` entries and 0 `documents[]` entries, the latter a disclosed
structural fact (the form's own instructions state verbatim not to
enclose any receipts) rather than an oversight. See the document's own
VERIFICATION.md for every disclosed source-naming quirk and the full
mock conformance run (two scenarios, 0 errors; 5 mutation controls, each
correctly raising exactly 1 error). This deepens **Finland to 4 of its 6
verticals** (Passport is a confirmed dead end; only DMV remains open).

**Denmark's Taxes vertical opens** (`dk/skattestyrelsen/oplysningsskemaet`,
GOV-2253) — Skattestyrelsen's form 04.003, "Oplysningsskemaet," scoped to
the employee/pensioner filer profile (pages 1-2 of the 4-page return: name/
address, CPR, spouse CPR, every genuinely fillable personal-income,
capital-income, and itemized-deduction rubrik, plus the ejendomsværdiskat
confirmation checkboxes). A coordinate-based `pdfjs-dist` extraction found
every "Felt låst"/"Anvend blanket ..." rubrik row has no corresponding
AcroForm widget on this specimen at all — a hard structural fact, not an
editorial exclusion. Pages 3-4 (self-employment/sole-proprietorship
sections) are deferred as an open companion-schedule candidate, the same
treatment already given the Czech Republic's base-return-plus-Přílohy
sequence. Denmark now stands at 2 of 6 verticals (Passport, Taxes); see the
Executive Summary update above and the document's own VERIFICATION.md.

**Austria's Taxes vertical opens** (`at/bmf/employee-tax-assessment`,
GOV-2114) — Bundesministerium für Finanzen (BMF) Form L 1, "Erklärung L1 zur
ArbeitnehmerInnenveranlagung 2025" ("Employee/pensioner tax assessment
declaration"), the annual reconciliation of wage tax withheld during the
year against final liability for employees and pensioners. Screened
Austria's Kfz-Zulassung (vehicle registration) as the other strong DMV
candidate first and found it an in-person, counter-driven process at a
Zulassungsstelle with no downloadable specimen, so deepened Taxes instead —
the same sequencing this registry already used for freshly-opened Iceland
and Sweden. Sourced from BMF's own genuine fillable-AcroForm PDF for the
2025 assessment year (reached via a "Formular öffnen" download endpoint,
itself linked from oesterreich.gv.at's federal form-search index), not the
ASP-based `service.bmf.gv.at` forms-search pages, which return only a
generic navigation shell to a non-browser fetch. Extracted 90 AcroForm
widgets with `pdfjs-dist` (15 non-data controls excluded; a 3-option gender
selector, a 6-option marital-status selector, a 2-option sole-earner/
single-parent-credit selector, and a visually-split 10-digit partner social
security number were each merged into one field rather than split into
independent unconstrained booleans/fields), modelling 66 fields covering
personal/address/partner identity, employer count, sole-earner/single-
parent/pensioner/multi-child tax credits, the commuter allowance/euro,
work-related expense deductions (Werbungskosten), bank details, allowance
notices, and companion-attachment tracking, plus one signature attestation
document. A programmatic verbatim-quote cross-check against a fresh
`pdfjs-dist` text extraction caught 9 near-miss quotes with PDF
line-wrap-hyphenation or run-boundary spacing artifacts (the same category
of issue flagged in the prior `at/gewerbebehoerde` cycle), each corrected
by shortening the quoted span or paraphrasing rather than presenting an
inexact reconstruction as verbatim. See the document's own VERIFICATION.md
for the full sourcing record, every disclosed scope decision (companion
attachments L 1ab/L 1d/L 1i/L 1k/L 1k-bF not modelled as their own schemas;
optional, non-gated partner/residence-country/BIC fields whose conditional
rules the source states in prose but this spec's Condition grammar cannot
precisely encode), and the mock conformance test run (0 errors across two
scenarios covering all 66 fields, plus 10 mutation/negative controls). This
deepens Austria to **2 of its 6 verticals** (Business Formation, Taxes);
DMV was screened this cycle and found weak (see above); Passport, Visa,
and National ID remain open, unscreened backlog candidates.

**Sweden's Taxes vertical opens** (`se/skatteverket/individual-income-tax-return`,
GOV-2091) — Skatteverket Form SKV 2000, "Inkomstdeklaration 1" ("Income Tax
Return 1"), the annual individual income tax return. Unlike most of this
registry's individual returns, Sweden's has no publicly downloadable blank
specimen (it is personalized and pre-printed per taxpayer, mailed to their
registered address); sourced instead from Skatteverket's own dedicated
bilingual "contents of the income tax return" page, which states verbatim it
publishes "the headlines in the form... in English" for every numbered box.
Models employment income and deductions, general deductions, the basis for
common tax reductions (ROT/RUT work, renewable electricity, donations,
sustainable-technology installation), the basis for the residential property
charge and property tax, capital income and deductions, foreign insurance
yield tax, additional disclosures (foreign income, foreign tax settlement,
ROT/RUT reallocation, income-data corrections), and the signature/contact
footer. Deliberately excludes the return's business-activity sections
(10-16, referencing separate Forms NE/N3A and further K-annexes), consistent
with how this registry already defers repeating/complex annex-referenced
blocks elsewhere. See the document's own VERIFICATION.md for the full
sourcing record, including the disclosed limitation that the taxpayer
identity header (personnummer/name/address) could not be independently
confirmed against a specimen image, and the mock conformance test run (0
errors across 48 fields, 4 mutation tests). This closes Sweden's Taxes gap;
Sweden now stands at 4 of its 6 verticals (Business Formation, DMV, Visa,
Taxes) — Passport and National ID were screened this cycle and confirmed
in-person/eID-login dead ends with no field-by-field source found.

**Iceland's Taxes vertical opens** (`is/skatturinn/simplified-individual-tax-return`,
GOV-2084) — Skatturinn Form RSK 1.13, "Tax return | simplified", the
short-form annual individual income tax return the form itself scopes to
individuals who have lived in Iceland for less than three years (couples,
filers with dependent children, owners of real estate/securities/shares, and
the self-employed must file the full RSK 1.10/1.01 return instead, not
modelled here). See the Executive Summary update above and the document's own
VERIFICATION.md for the full sourcing record, including a disclosed
box-number inconsistency in the source PDF itself (printed "12" vs. the
back-page instructions' "312").

**Japan's Taxes vertical is now published** (`jp/nta/individual-income-tax-final-return`,
GOV-2042) — the National Tax Agency's 所得税及び復興特別所得税の申告書
(Income Tax and Special Income Tax for Reconstruction Return), scoped to
Form 1's own taxpayer-identity fields, its two most common income-source
line items (employment income and public-pension miscellaneous income), and
its full set of income deductions (social insurance through donations,
including a brand-new tax-year-2025 specific-relative special deduction).
Deliberately excludes the return's other seven income-type line items (each
requiring its own financial statement or capital-gains schedule) and its
entire downstream tax-computation chain (progressive-bracket tax, credits,
the 2.1% reconstruction surtax, withholding reconciliation, and refund
banking) as future companion-schedule candidates, mirroring how Poland's
PIT-37 and the Czech Republic's base return are scoped in this registry. See
the document's own VERIFICATION.md for the position-based re-extraction that
reconciled a real edition-to-edition line-numbering shift (a 2024-only
flat-amount tax cut, and a brand-new 2025 deduction box) against the current
form. This closes Japan's Taxes vertical; Japan now stands at 4 of its 6
verticals (Visa, National ID, Business Formation, Taxes) — DMV and Passport
remain confirmed dead ends (GOV-2005).

**The main return's own flagged Hilfsblatt B gap is now also published**
(`ch/zh/sta/hilfsblatt-b`, GOV-1924) — Form 330, "Hilfsblatt B Fragebogen für
Land- und Forstwirtschaft," the larger agricultural/forestry questionnaire
used by farms that exceed Hilfsblatt G's own eligibility thresholds. Unlike
Hilfsblatt A's Form 328/329 pair, this form's own two computation paths
("mit Buchhaltung" vs. "mit Aufzeichnungen") live inside one single PDF,
confirmed by direct re-extraction, and are modelled in one schema via a
required `berichtsart` discriminator field with `requiredWhen`-gated
subtotal/total fields per path. Sourced the same way (genuine, current,
unauthenticated, flat non-AcroForm 4-page PDF from the same `zh.ch` listing).
Modelled 136 fields across 11 steps — the largest CH-ZH companion schedule to
date. This closes the CH-ZH companion-schedule backlog entirely. See the
Executive Summary update above and the document's own VERIFICATION.md.

**The main return's own flagged Hilfsblatt G gap is now also published**
(`ch/zh/sta/hilfsblatt-g`, GOV-1917) — Form 331, "Hilfsblatt G für Land- und
Forstwirtschaft," a simplified agricultural/forestry income worksheet used by
smaller farms (Talzone up to 8 ha, or hill/mountain zones up to 20
Rindergrossvieheinheiten, with limited special branches) in lieu of the
larger Hilfsblatt B questionnaire (Form 330, still deferred — the sole
remaining CH-ZH companion-schedule backlog candidate). Sourced the same way
(genuine, current, unauthenticated, flat non-AcroForm 4-page PDF from the
same `zh.ch` listing); a dedicated companion Wegleitung specific to
Hilfsblatt B/G (StA Form 332), reached via a redirect sentence in the main
return's own Wegleitung rather than a worked specimen, independently
corroborates this schema's Ziffer 2.1/2.2 lettering, flat-rate deduction
schedules, and Naturalbezüge/depreciation valuation rates. Modelled 117
fields across 7 steps — a considerably more itemized letter-lettered farm
income/expense computation (Ziffer 2.1a-k, 2.2a-i) than either Hilfsblatt A
variant. See the Executive Summary update above and the document's own
VERIFICATION.md.

**The main return's own flagged Hilfsblatt A (kaufmännische Buchführung) gap
is now also published** (`ch/zh/sta/hilfsblatt-a-kaufmaennische-buchfuehrung`,
GOV-1910) — Form 329, the direct sibling of the earlier-published Form 328
(`ch/zh/sta/hilfsblatt-a-vereinfachte-buchfuehrung`, GOV-1903), serving
self-employed filers with full commercial books rather than simplified
bookkeeping. Sourced the same way (genuine, current, unauthenticated, flat
non-AcroForm PDF from the same `zh.ch` listing); the Wegleitung's own
Ziffer-32 prose confirms this form's differently-numbered equity line
(Ziffer 10.4, versus Form 328's Ziffer 14.4). Modelled 51 fields across 8
steps. See the Executive Summary update above and the document's own
VERIFICATION.md.

**Switzerland's Taxes vertical is now published** (`ch/zh/sta/steuererklaerung-natuerliche-personen`,
GOV-1847) — the Kantonales Steueramt Zürich's "Steuererklärung 2025 für
natürliche Personen," canton Zürich's annual personal income and wealth tax
return (cantonal/communal tax and direct federal tax filed together). The
prior CH cycle (GOV-1840, which opened Switzerland via its DMV vertical)
screened this candidate and flagged it as genuinely strong: a genuine,
current, unauthenticated, flat (non-AcroForm) main-declaration PDF, cross-
checked against the cantonal tax office's own 40-page Wegleitung instruction
guide. Scoped to the main 4-page declaration only, excluding seven
companion schedules the form references by name (securities/holdings
inventory, professional expenses, insurance premiums, further education,
real-estate register, debts register, self-employment worksheets) and every
pure computed/arithmetic or capped-derivative line, per this registry's
established treatment of income-tax schemas elsewhere. This gives
Switzerland its 2nd of 6 verticals. See the Executive Summary update above
and the document's own VERIFICATION.md for the full sourcing record.

**The main return's own flagged Wertschriftenverzeichnis gap is now also
published** (`ch/zh/sta/wertschriften-und-guthabenverzeichnis`, GOV-1854) —
the securities-and-holdings-inventory companion schedule, itemizing every
security/account/claim held during the tax year and claiming a refund of the
35% federal withholding tax deducted at source on domestic investment
income. Sourced the same way (genuine, current, unauthenticated, flat
non-AcroForm PDF from the same `zh.ch` listing), with pages additionally
rendered to PNG to disambiguate a dense three-column totals layout. The
24-row itemized table is collapsed to one free-text field; the continuation
sheets (Beiblatt 1/2) and Form DA-1 (foreign-withholding relief) are
represented only as gated pass-through transfer totals. See the Executive
Summary update above and the document's own VERIFICATION.md.

**The main return's own flagged Berufsauslagen gap is now also published**
(`ch/zh/sta/berufsauslagen`, GOV-1868) — the professional/work-related
expense deductions companion schedule, used by an employed taxpayer to
compute the deduction referenced by the main return's own Ziffer 11.1/11.2.
Sourced the same way (genuine, current, unauthenticated, flat non-AcroForm
PDF from the same `zh.ch` listing); unlike the main return, this form prints
every statutory rate/cap it depends on directly on its own two pages, and
its Wegleitung's own worked specimen (p.36) was rendered to PNG and visually
cross-checked against this schema's field layout. The two-row private-
vehicle commuting worksheet is collapsed to one free-text field per person.
See the Executive Summary update above and the document's own
VERIFICATION.md.

**The main return's own flagged Versicherungsprämien gap is now also
published** (`ch/zh/sta/versicherungspraemien`, GOV-1875) — the
insurance-premiums-and-savings-interest deduction companion schedule (Form
365), used to compute the deduction referenced by the main return's own
Ziffer 15 (line 270). Sourced the same way (genuine, current,
unauthenticated, flat non-AcroForm PDF from the same `zh.ch` listing);
unlike the main return, this 1-page form prints every statutory rate it
depends on directly on its own face, and its Wegleitung's own worked
specimen — PDF page 36, the same page as the Berufsauslagen specimen — was
independently recomputed field-by-field to confirm this schema's own
mock-data logic. The two discrete statutory lookup values printed for each
marital-status bracket are modelled with `validation.enum` rather than a
continuous `minimum`/`maximum` range. See the Executive Summary update
above and the document's own VERIFICATION.md.

**The main return's own flagged Aus- und Weiterbildung gap is now also
published** (`ch/zh/sta/aus-und-weiterbildungskosten`, GOV-1882) — the
career-oriented further-education/training/retraining-costs deduction
companion schedule (Form 367), used to compute the deduction referenced by
the main return's own Ziffer 16.2 (line 292). Sourced the same way (genuine,
current, unauthenticated, flat non-AcroForm PDF from the same `zh.ch`
listing); unlike the main return, this 1-page form prints both statutory
caps it depends on (CHF 12'400 state-tax, CHF 13'000 federal-tax, applied
individually to each of Person 1/Person 2) directly on its own face. Unlike
Berufsauslagen and Versicherungsprämien, no official worked specimen of this
exact form exists in the Wegleitung — its own blank facsimile sits on PDF
page 16, and the Wegleitung's worked specimen of the main return's own page
3 (PDF page 37) leaves this schedule's own transfer line (292) blank — so
this schema's worked mock-data example was sourced and hand-recomputed
independently instead. See the Executive Summary update above and the
document's own VERIFICATION.md.

**The main return's own flagged Liegenschaftenverzeichnis gap is now also
published** (`ch/zh/sta/liegenschaftenverzeichnis`, GOV-1889) — the
real-estate-register companion schedule (Form 350), used by a property
owner to declare each property's location/type, its official assessed
Ertragswert (agricultural/forestry) or Verkehrswert, its imputed rental
value and/or actual rent income, its deductible maintenance costs, and the
resulting net income, referenced by the main return's own Ziffer 6 (line
188) and Ziffer 31.1/31.2 (lines 421/422). Sourced the same way (genuine,
current, unauthenticated, flat non-AcroForm PDF from the same `zh.ch`
listing), though unlike its four siblings this form is hosted at a
year-independent URL and carries its own filer-entered "Jahr" box rather
than a year printed in its cover title. The Wegleitung (pp.28-30) confirms
both Steuerwert figures are ordinarily transfer values from the
Gemeindesteueramt's own valuation notice, not filer-computed, and that a
multi-family/business building's own capitalization-formula-derived
assessed value transfers into the Verkehrswert column/Ziffer 31.1, not the
Ertragswert/Land-oder-Forstwirtschaft column/Ziffer 31.2, which is reserved
for genuinely agricultural/forestry-classified land. Unlike Berufsauslagen
and Versicherungsprämien, no official worked specimen of this exact form's
own per-property line items exists in the Wegleitung — its own blank
facsimile sits behind explanatory prose on PDF pp.14/28/29/30, and the
Wegleitung's worked household specimen shows only the two aggregate
transfer figures this schedule would have produced, never a Form-350-level
breakdown — so this schema's worked mock-data example was constructed and
hand-recomputed independently instead. The 10-property repeating table,
spanning both of the form's pages, is collapsed to one free-text field. See
the Executive Summary update above and the document's own VERIFICATION.md.

**The main return's own flagged Schuldenverzeichnis gap is now also
published** (`ch/zh/sta/schuldenverzeichnis`, GOV-1896) — the debts-register
companion schedule (Form 355), used by a taxpayer with one or more private
debts to itemize, per creditor, the creditor's name/address, the year-end
debt balance, and the interest paid, referenced by the main return's own
Ziffer 12 (line 250) and Ziffer 34 (line 470). Sourced the same way (genuine,
current, unauthenticated, flat non-AcroForm PDF from the same `zh.ch`
listing), and like Liegenschaftenverzeichnis this form is hosted at a
year-independent URL with its own filer-entered "Jahr" box. The 30-row
itemized table's two money columns each extracted as an identical repeating
digit string rather than a per-row code; rendering the page to PNG confirmed
this is a decorative digit-entry-box glyph artifact, not a real code — this
table carries no per-row codes at all, only the two headline Total boxes.
The Wegleitung's own worked household specimen (pp.37-38, rendered to PNG)
confirms a CHF 8'000 debt-interest figure entered identically in both the
Staatssteuer and Bundessteuer columns — the basis for this schema's own
field description of how the combined total transfers — and a CHF 750'000
debt total, used only as an order-of-magnitude check since no dedicated
worked specimen of this form's own per-creditor rows exists in the
Wegleitung. The 30-row creditor table is collapsed to one free-text field;
unlike its Wertschriften/Liegenschaften siblings, no continuation-sheet
field is modelled since no source references one. See the Executive
Summary update above and the document's own VERIFICATION.md.

**The Czech Republic's Taxes gap is now closed** (`cz/mf/priznani-k-dani-z-prijmu-fyzickych-osob`,
GOV-1826) — the Ministerstvo financí's "Přiznání k dani z příjmů fyzických
osob" (form 25 5405, MFin 5405), the annual personal income tax return under
zákon č. 586/1992 Sb., scoped to the base four-page return for an
employment/pension-income filer. This was the strong, larger-scope candidate
the prior CZ cycle (GOV-1819) had flagged and set aside; unlike that cycle's
visa-form PDF, both this return and its own field-by-field "Pokyny"
instructions extracted cleanly via `pdfjs-dist` (zero AcroForm widgets — a
flat print/reference facsimile). Scoped to exclude the four annexes
(self-employment, rental/other, foreign-source, and separate-tax-base
income) and every pure computed/arithmetic line, per this registry's
established treatment of income-tax schemas elsewhere. This gives the Czech
Republic its 4th of 6 verticals. See the Executive Summary update above and
the document's own VERIFICATION.md for the full sourcing record. **Update
(GOV-1977): the self-employment annex, Příloha č. 1, is now closed too**
(`cz/mf/priloha-1-vypocet-dilciho-zakladu-dane-samostatna-cinnost`, form 25
5405/P1), a companion schedule to this base return; see the Executive
Summary update above and the document's own VERIFICATION.md.

**Portugal's Taxes gap is now closed** (`pt/at/declaracao-rendimentos-irs-modelo-3`,
GOV-1765) — Modelo 3, the Autoridade Tributária e Aduaneira's (AT) annual
personal income tax return, bounded to the Rosto cover page plus Anexo A
(employment/pension income), the two most common income codes (401
trabalho dependente, 403 pensões), and the current "IRS Jovem" young-worker
election. A genuine, current, directly downloadable PDF pair with no
AcroForm layer, confirmed directly via `pdfjs-dist` (zero Widget
annotations across 27 combined pages), the same candidate GOV-1750's own
Portugal-opening cycle had already flagged as the jurisdiction's
strongest-sourced Taxes candidate. This closes the **global Taxes vertical
back to 24/24 (100%)** — Portugal had been its only gap since opening as
the registry's 24th jurisdiction (GOV-1750). See the Executive Summary
update above and the document's own VERIFICATION.md for the full sourcing
record and every disclosed scope decision.

**Chile's Taxes gap is now closed** (`cl/sii/formulario-22`, GOV-1744) —
Formulario 22 (F-22), SII's "Declaración de Renta," Chile's annual income
tax return. This closes the global Taxes vertical to 23/23 (100%). See the
Executive Summary update above and the document's own VERIFICATION.md for
the full sourcing record, the source this cycle found that the four prior
screening cycles below had not used, and every disclosed judgment call.

**Estonia's Taxes gap is now closed** (`ee/emta/income-tax-return-form-a`,
GOV-1721) — Vorm A / Form A, the annual income tax return a resident natural
person files with the Maksu- ja Tolliamet (EMTA). A genuine, current (2025
tax year), directly downloadable, unauthenticated, bilingual PDF, no
AcroForm layer but fully self-documenting across 12 numbered sections.
Scoped to the common wage-earner case: general/address/contact data, one
representative domestic-wage-income row already taxed at source, one
representative gift/donation and paid-training-expense deduction entry, the
domestic refund bank account, and the closing declaration; deliberately
excludes EEA cross-border provisions, all property-transfer gains, all
foreign-sourced income, and the remaining voluntary-deduction/overpayment-
election sections. Gives Estonia 4/6 verticals. See the Executive Summary
update above and the document's own VERIFICATION.md for the full sourcing
record and every disclosed judgment call. Chile's Taxes gap has since closed
too (GOV-1744) — see the Executive Summary update above.

**Poland's Taxes gap is now closed** (`pl/mf/zeznanie-pit-37`, GOV-1691) —
PIT-37, the annual personal income tax return for individuals whose income
is taxed at the progressive scale and consists exclusively of amounts a
payer already reported on a PIT-11/PIT-11A/PIT-40A/PIT-R/IFT-1R information
slip (in practice, chiefly employees and pensioners). A genuine, current
(version 31, tax year 2025), directly downloadable, unauthenticated PDF on
`podatki.gov.pl`/`gov.pl`, no AcroForm layer but fully self-documenting (171
numbered positions across sections A-Q). A prior cycle (GOV-1671) had
screened this vertical only shallowly and assumed the whole vertical was
authenticated-only (conflating the paper form with the separate, genuinely
gated e-Deklaracje/Twój e-PIT online-filing channels); this cycle found and
used the underlying paper form directly. Deliberately excludes the entire
computed-arithmetic chain (deductions, tax calculation, tax due, and the
children's-relief additional refund), since those figures sum across
several income-source categories and a spouse column this v1.0.0 does not
model — see the Executive Summary update above and the document's own
VERIFICATION.md for the full sourcing record and every disclosed judgment
call. Chile's Taxes gap remains open. **Spain** (`es/aeat/declaracion-censal-personas-fisicas-modelo-030`,
GOV-1645) opens this cycle as the registry's 21st jurisdiction via this
vertical — AEAT's Modelo 030, the census declaration/NIF-registration form
for natural persons. It is a census/registration filing rather than an
annual income-tax return proper (Spain's own annual return, the IRPF
"Renta," is a distinct, much larger form not modelled here and left as an
open backlog candidate for a future cycle), but is catalogued under Taxes
per this registry's convention of classifying a schema by its administering
authority's own function (the same convention already applied to
`cl/sii/inicio-actividades-personas-naturales`, filed with Chile's tax
authority but catalogued under Business Formation). See the Executive
Summary update above and the document's own VERIFICATION.md for the full
sourcing record. **Chile**, opened via its Business Formation vertical
(GOV-1624), still does not yet have a dedicated annual income-tax-return
schema of its own — the SII's Formulario 22 (Renta) remains an open,
repeatedly-screened-but-not-picked backlog candidate for a future cycle (a
genuine, current, unauthenticated PDF, but a prose instructivo with no
AcroForm layer at all, and SII's largest, most complex return besides — see
`cl/sii/aviso-venta-vehiculo`'s own VERIFICATION.md for the fullest existing
screening record). **Re-screened again in GOV-1659** (2026-07-07): the
`f22_at2026.pdf` specimen and the `guia_trib_suplemento_2026.html`
código/recuadro-level supplement guide were both re-fetched; the guide gives
rich per-código detail but no confirmed bounded wage/salary-only pathway
comparable in scope to this registry's other individual-tax schemas, so this
remains a viable-but-weaker candidate than the Spain Business Formation
candidate picked that cycle instead — see
`es/aeat/declaracion-censal-alta-actividad-economica-modelo-036`'s own
VERIFICATION.md for the full comparison. **Chile's Formulario 22 has since
been authored too (GOV-1744)** — see the Executive Summary update above:
scoped to the salaried-employee/pensioner IUSC-reliquidación case, sourced
from a previously-unused SII interactive per-línea instruction tool rather
than the topical supplement guide the GOV-1659 re-screen above had found
insufficiently bounded.
**Colombia** (`co/dian/declaracion-renta-personas-naturales-formulario-210`,
GOV-1595) is new this cycle and closes the global Taxes vertical to 100% —
DIAN's Formulario 210, the annual individual income tax return for resident
natural persons, sourced from DIAN's own published instructivo (132 fields
across the return's full cédula-based structure). See the document's own
VERIFICATION.md for the full sourcing record, extraction method, and every
disclosed judgment call. **Indonesia**
(`id/djp/annual-individual-income-tax-return-1770s`, GOV-1560) is new this
cycle and closes the vertical to 18/18 (100%) — Form 1770 S, the annual
individual income tax return for a salaried resident taxpayer, sourced from
the Direktorat Jenderal Pajak's (DJP) own official "Modul Pengisian SPT
Tahunan e-Filing Orang Pribadi 1770S" guide, a genuine 46-slide screenshot
walkthrough of the live `djponline.pajak.go.id` e-Filing wizard (directly
downloadable from `pajak.go.id`, no login/CAPTCHA/WAF). Scoped to the
wizard's own structured-form ("dengan bentuk formulir") pathway, with six
repeating add-a-row sections (final-tax income, year-end assets, year-end
debts, the family/dependents register, and withholding certificates) each
bounded to a single entry pending GSP-0009 — see the document's own
VERIFICATION.md for the full candidate-screening record (Passport and Visa
were also screened this cycle and left open) and every disclosed judgment
call. **The Philippines** (`ph/bir/annual-income-tax-return-1701a`, GOV-1466) is new
this cycle and closes the global Taxes vertical to 100% — sourced from BIR
Form 1701A (January 2018 ENCS, with rates), the annual income tax return for
individuals earning income purely from business/profession, covering either
the Optional Standard Deduction/graduated-rates method or the 8% flat-rate
method. A genuine, directly downloadable, unblocked text-layer PDF on BIR's
own CDN; the sibling BIR Form 1700 (compensation-only filers) and BIR Form
1701 (mixed income, or income above the 8%-option's ₱3M threshold) are
equally strong, confirmed-fetchable open backlog candidates for a future
cycle. Part III (Details of Payment, a repeating table across 4
payment-mode rows) is deliberately out of scope for this v1.0.0, pending
GSP-0009 (see the document's own VERIFICATION.md). **Mexico**
(`mx/sat/declaracion-anual-sueldos-salarios`, GOV-1428, PR #239 pending
merge) is new this cycle — sourced from SAT's own official 65-page "Guía de
llenado" PDF (fiscal-year-2025 edition) for the Régimen de Sueldos y
Salarios e Ingresos Asimilados a Salarios, a genuine (non-image) text layer
extracted via `pdfjs-dist`. This is distinct from
`mx/sat/preinscripcion-rfc-persona-moral` (GOV-1414), which registers a
business's federal taxpayer identifier and is classified under Business
Formation instead, mirroring how `us/irs/employer-identification-number-ss4`
is classified in this registry. This closes the global Taxes vertical to
16/16 (100%). **South Korea** (`kr/nts/year-end-tax-settlement-income-deduction-report`,
GOV-1293/GOV-1328) was new in a previous cycle — sourced from NTS's official
English-language "Easy Guide for Foreigners' Year-end Tax Settlement" PDF,
reproducing the gazetted Attached Form No. 37(1)-(3) as an English original.
**United Arab Emirates** now has two Taxes-vertical documents:
`ae/fta/vat-registration` (GOV-1297/GOV-1335, opened UAE as the registry's
14th jurisdiction) and `ae/fta/corporate-tax-registration` (GOV-1371) — both
sourced from the FTA's own EmaraTax screenshot-driven user manuals. The UAE
has no personal income tax, so these two registrations are its closest
Taxes-vertical analogues. **Brazil** now has `br/rfb/individual-income-tax-return-irpf`
(GOV-1407, the DIRPF annual individual income tax return) — a prior cycle
(`GOV-1295`) had named Receita Federal's 340-page topical FAQ as its source,
found it too fragmentary to source field-by-field, and left the gap open in
backlog; GOV-1407 instead located RFB's official byte-exact DIRPF
file-layout specification and authored a bounded 67-field core against it
(see the document's own VERIFICATION.md for the full scope). Remaining gaps are sub-process expansions:

- **India:** ITR-1 (SAHAJ), ITR-4 (SUGAM, presumptive business income), ITR-2 (capital gains/foreign income/multiple properties), and now ITR-3 (non-presumptive business/profession with full books of account, GOV-1254) are all modelled — the ITR-1/2/3/4 set is now complete. ITR-3 defers full re-derivation of Schedule S/House Property/Schedule CG/OS/itemised Chapter VI-A against its own workbook, since those schedules are structurally identical to the ones already published in full in `in/incometax/individual-tax-return-itr2` (see its VERIFICATION.md for the scope rationale).
- **Corporate/business tax:** SG IRAS Form C-S is now modelled (`sg/iras/corporate-income-tax-return-form-cs`, GOV-1261) — the simplified return for Singapore-incorporated companies with revenue ≤S$5M; it defers Form C-S (Lite), full Form C, and the Enterprise Innovation Scheme/R&D per-activity claim breakdowns (see its VERIFICATION.md). ZA SARS ITR14's full five-Annexure company-type set is now modelled: Dormant Company pathway (`za/sars/corporate-income-tax-return-itr14-dormant`, GOV-1268), Micro Business pathway (`za/sars/corporate-income-tax-return-itr14-micro-business`, GOV-1275), Body Corporate/Share Block Company pathway (`za/sars/corporate-income-tax-return-itr14-body-corporate`, GOV-1282), Small Business pathway (`za/sars/corporate-income-tax-return-itr14-small-business`, GOV-1378), and Medium to Large Business pathway (`za/sars/corporate-income-tax-return-itr14-medium-large-business`, GOV-1387). Body Corporate/Share Block and Micro Business both model a full Balance Sheet, Income Statement, and Tax Computation (138 and 151 fields respectively); Small Business is structurally much larger (283 fields, guide §14 spanning 44 pages) — it adds Small Business Corporation eligibility, Contributed Tax Capital, Urban Development Zone, Company Structure, Multinational Entity group details, Reportable Arrangement, Dividends Declared, and a 33-field Additional Assessment Information section absent from the smaller siblings; Medium to Large Business (Annexure E) is larger still (417 fields, guide §15 spanning 55 pages, the largest of the five) — it adds International, Foreign Exchange Gains/Losses, Foreign Dividends, Controlled Foreign Company, Double Taxation, STC Credits, Headquarter Company, Subsidiary Details, and Corporate Rules sections with no counterpart in any of the other four, plus a Balance Sheet (64 fields) and Income Statement (89 fields) splitting many lines by Local/Foreign and Connected/Non-Connected. All five defer the repeating Share/Membership Register, Beneficial Owner details, Capital Gains schedule, PAYE Credits, Donations-organisation list, the s6quat(1A) foreign-tax-credit computation block, and the Enhanced Renewable Energy Deduction detail container; Small Business and Medium to Large Business additionally defer, as a whole and explicitly disclosed, the same class of large itemised Tax Computation sub-blocks (~83-84-item Special Allowances Not Claimed plus related reversal/recoupment blocks) each comparable in scope to a repeating container, and Medium to Large Business further defers its wholly new, unbounded per-jurisdiction Transfer Pricing Received/Receivable, Paid/Payable, and Supporting Information containers (see each document's VERIFICATION.md). IE corporation tax (Form CT1, a much larger return — see "Known Gaps" below) remains the only open corporate-tax gap among jurisdictions already in the registry.
- **CA:** only the 2022 tax year T1 General; more recent tax years not yet modelled.
- **UAE Corporate Tax registration:** now modelled (`ae/fta/corporate-tax-registration`, GOV-1371) for the Legal Person registration pathway; Natural Person registration's own field set was not sourced this cycle (see its VERIFICATION.md).
- **Brazil DIRPF follow-up:** `br/rfb/individual-income-tax-return-irpf` (GOV-1407) deliberately defers rural activity (Anexo da Atividade Rural), capital gains (GCAP), variable income/day-trade, Rendimentos Recebidos Acumuladamente (RRA), and the Declaração de Bens e Direitos asset/liability schedule — each a self-contained multi-record block in RFB's own file layout — as candidates for future follow-up cycles (see its VERIFICATION.md).
- **Mexico Declaración Anual follow-up:** `mx/sat/declaracion-anual-sueldos-salarios` (GOV-1428) deliberately bounds several repeating real-world structures (per-withholding-agent records, per-CFDI deduction records) to a single instance pending GSP-0009, and defers itemized field labels for its Indemnización/Jubilación income sub-tabs and its offset/compensation source-declaration sub-dialog — see its own VERIFICATION.md for the full list of ten disclosed judgment calls.

### Visa — Entry Visas, ETAs, Work/Student Permits (37/42 jurisdictions — 88%)

**Serbia's Visa vertical opens (2 of 6) (GOV-2760)**, via
`rs/mfa/visa-application` — the Ministry of Foreign Affairs' bilingual
(Serbian Cyrillic/English) "Захтев за издавање визе / Visa Application
Form," fetched directly and unauthenticated from `mfa.gov.rs`. This
candidate was pre-scouted and left open in GOV-2753's own screening pass,
alongside a Taxes candidate (PPDG-2R) left as the strongest remaining
backlog item. A flat, non-AcroForm 2-page specimen (zero Widget
annotations, confirmed via `pdfjs-dist`) with a genuine, fully extractable
bilingual text layer; both pages were rendered to PNG and visually
cross-checked, confirming a boxed consular-only "For embassy/consulate use
only" column (excluded) and every checkbox group's exact option count,
including six independently-checkable means-of-support booleans and a
separate travel/health-insurance checkbox. Models 71 `fields[]` plus 2
`documents[]` entries, including a return-permission and a
transit-entry-permit Yes/No gate each with `requiredWhen`-linked companion
fields, and a bounded 3-row children table matching the source's own
printed capacity. See the Executive Summary's GOV-2760 update above and
the document's own VERIFICATION.md for the full sourcing record. Serbia
now stands at 2 of 6 verticals (Business Formation, Visa); DMV, Taxes,
National ID, and Passport remain open backlog candidates.

**Jordan's Visa vertical closes (3 of 6) (GOV-2746)**, via
`jo/mfa/visa-application` — the Ministry of Foreign Affairs and
Expatriates' (MFA) bilingual "Visa Application to Enter the Hashemite
Kingdom of Jordan" form, fetched directly and unauthenticated from
`mfa.gov.jo`. This candidate was left as open, well-sourced backlog in
GOV-2739's own screening pass, which preferred a first-party Passport
candidate over a competing 23-field embassy Visa AcroForm found only on
third-party visa-expediting mirrors. A flat, non-AcroForm 2-page specimen
(zero Widget annotations, confirmed via `pdfjs-dist`) with a genuine,
fully extractable bilingual text layer; both pages were rendered to PNG
and visually cross-checked, confirming a boxed consular-only "For
Official Use" sidebar (excluded) and that Sex/Marital status/Type of
Passport/Number of Entries are genuine checkbox controls, while §6's five
Y/N gate questions print no checkbox glyph yet are still modeled as
required `boolean` fields paired with optional, ungated "if yes" detail
companions. See the Executive Summary's GOV-2746 update above and the
document's own VERIFICATION.md for the full sourcing record. Jordan now
stands at 3 of 6 verticals (Taxes, Passport, Visa); Business Formation,
DMV, and National ID & Civic Documents remain confirmed dead ends from
GOV-2739 — Jordan has reached its practical maximum vertical coverage
under this registry's current sourcing standards.

**Ghana's Visa vertical opens (2 of 6) (GOV-2698)**, via
`gh/gis/application-for-grant-of-visa-and-permit-for-return-to-ghana` — the
Ghana Immigration Service's (GIS) Re-Entry Visa/Permit specimen,
"Application Form for Grant of a Visa/Permit for Return to Ghana,"
distributed unauthenticated from `gis.gov.gh/gis-forms/`. A genuinely
scanned specimen (`pdfjs-dist` confirms 0 AcroForm/Widget annotations and 0
extractable text items across both pages), rendered via a custom
`NodeCanvasFactory` and read visually against targeted per-item crops. 33
`fields[]` model the form's 14 numbered items, including an
`addressInGhana` general field kept distinct from item 5's lettered
postal/residential sub-items (a structural difference from items 3/4, which
carry no such preceding header blank) and a free-text `maritalStatus` field
(the specimen prints no enumerated options anywhere, unlike this registry's
other `maritalStatus` fields). 3 `documents[]` entries cover the
two-photograph requirement, the item-12 documentary evidence for
reasons-for-return, and the solemn-declaration attestation. Confirmed via
`gis.gov.gh/visas/` that this specimen is GIS's Re-Entry Visa pathway,
distinct from the first-time tourist e-Visa (a login-gated online portal
with no downloadable specimen found at any tier), disclosed as out of scope
rather than silently conflated. See the Executive Summary update above and
the document's own VERIFICATION.md for the full sourcing record and every
disclosed judgment call. Ghana now stands at 2 of 6 verticals (National ID
& Civic Documents, Visa).

**Bangladesh's Visa vertical opens (4 of 6) (GOV-2675/GOV-2677)**, via
`bd/dip/machine-readable-visa-application-form` — the Department of
Immigration and Passports' (DIP) "Machine Readable Visa Application Form"
(D.I.P Form-4), distributed via Bangladesh's Online MRV Portal (visa.gov.bd).
A genuine 4-page, plain print-and-fill PDF (no AcroForm, confirmed via
pdfjs-dist: zero annotations across all 4 pages), independently re-fetched
this cycle and cross-checked against a byte-near-identical embassy mirror.
This single physical form is shared by five distinct application pathways;
this v1.0.0 scopes to the New Visa pathway only (Personal Details, Travel
Document Details, Payment Details, and the New Visa section), disclosing the
Extension of Visa/No Visa Required/Transit pathways as out of scope for a
future revision. See the Executive Summary update above and the document's
own VERIFICATION.md for the full sourcing record and every disclosed
judgment call. Bangladesh now stands at 4 of 6 verticals (DMV, Taxes,
Passport, Visa).

**Greece opens as this registry's 45th jurisdiction, via Visa (GOV-2611)**,
via `gr/mfa/application-for-schengen-visa` — the EU-wide "Harmonised
application form / Application for Schengen Visa" (Annex I to the Visa
Code), served for Greek consulates by VFS Global mirrors after the primary
`mfa.gr`/`aade.gr` hosts were re-confirmed Akamai-blocked. See the Executive
Summary update above and the document's own VERIFICATION.md for the full
sourcing record (including the bilingual Greece-attributed edition used as
the primary source, two corroborating English-only mirrors, and every
scoping/disclosure judgment call).

**Rwanda's Visa vertical opens (2 of 6) (GOV-2544)**, via
`rw/dgie/visa-application` (Directorate General of Immigration and
Emigration's standard "VISA APPLICATION" specimen used at Rwandan diplomatic
missions abroad), resolving GOV-2526's disclosed open, unresolved Visa
candidate. See the Executive Summary update above and the document's own
VERIFICATION.md for the full sourcing record and every disclosed judgment
call.

**Vietnam's Visa vertical opens (5 of 6) (GOV-2486)**, via
`vn/bca/to-khai-de-nghi-cap-thi-thuc-viet-nam` (Mẫu NA1, "Tờ khai đề nghị
cấp thị thực Việt Nam," most recently republished by Thông tư
70/2026/TT-BCA ngày 25/5/2026, hiệu lực 01/7/2026). See the Executive
Summary update above and the document's own VERIFICATION.md for the full
sourcing record, including the three-way independent corroboration of the
2026 republication (the pre-scouted 2015-era source and its third-party
`.doc` mirror had gone stale by this cycle) and every disclosed
scoping/judgment call.

**Uruguay's Visa vertical opens (GOV-2472)**, via
`uy/mrree/formulario-unificado-de-visas` — MRREE's "Formulario Unificado de
Visas," a genuine 22-widget AcroForm PDF hosted directly by the Ministry and
usable without any `gub.uy` login, unlike Uruguay's Taxes/Passport/National
ID candidates (all login-gated or AcroForm-less, screened the same cycle —
see "Known Gaps & Opportunities" below). Models 21 of the 22 widgets as
`fields[]`; the 22nd is unlabeled and disclosed as out of scope. Uruguay now
stands at 3 of 6 verticals (Business Formation, DMV, Visa).

**Peru opens as this registry's 38th jurisdiction (GOV-2419)**, via
`pe/cancilleria/solicitud-visa-dgc-005` — Formulario DGC-005, "Solicitud de
Visa," published by the Ministerio de Relaciones Exteriores (Cancillería). A
prior cycle (GOV-2404) had screened this same form from a single mirror and
found it AcroForm-less; this cycle re-fetched it from three independent
`gob.pe` mirrors and found the Ministry's own current copy is a materially
different, genuinely stronger 2019 AcroForm revision (63 widgets) that the
prior single-mirror check had missed by landing on a superseded 2013 copy.
See the Executive Summary update above and the document's own VERIFICATION.md
for the full sourcing record, including the byte-identity comparison between
the two revisions.

**Norway's Visa vertical is now open (GOV-2340), closing Norway's last open
vertical (6/6)** — see the Executive Summary update above and the
document's own VERIFICATION.md for the full sourcing and field-mapping
record.

**Denmark's Visa vertical is now open** (`dk/siri/work-permit-application`,
GOV-2285), via SIRI's (the Danish Agency for International Recruitment and
Integration) form AR8 — a genuine, unauthenticated fill-by-hand PDF (0
AcroForm widgets across 14 pages) scoped to sideline employment, work
permits for accompanying family, and extensions of either. This is
narrower than a first-time primary work-permit application: SIRI's own
primary route (form AR1, or employer-submitted twin AR6) was re-screened
this cycle and confirmed to be exclusively a MitID-authenticated online
wizard with no unauthenticated static specimen — see the Executive Summary
update above and the document's own VERIFICATION.md for the full
candidate-selection record. Denmark's own Schengen short-stay route
(`applyvisa.um.dk`) remains a confirmed duplicate of the EU-harmonized
Annex I template already modelled for other Schengen jurisdictions in this
registry (e.g. `fr/france-visas/schengen-visa-application`,
`at/bmeia/schengen-visa-application`), not a genuine gap.

**Finland opens as GovSchema's 34th jurisdiction (GOV-2276)**, via
`fi/migri/residence-permit-employed-person` — Migri's form OLE_TY1, the
residence permit application for an employed person ("TTOL"). See the
Executive Summary update above and the document's own VERIFICATION.md for
the full sourcing and field-mapping record. Finland now stands at 1 of its
6 verticals (Visa); Business Formation, Taxes, and National ID are all
confirmed strong, unscreened backlog candidates for a future cycle (Passport
is a confirmed dead end; DMV is weak) — see "Known Gaps" below. **Finland's
Business Formation vertical has since opened too (GOV-2292)**, via
`fi/prh/start-up-notification-y1` — PRH/Vero's jointly published form Y1
("Perustamisilmoitus"); see the Executive Summary update above and the
document's own VERIFICATION.md. Finland now stands at 2 of its 6 verticals
(Visa, Business Formation); Taxes and National ID remain open, unscreened
backlog candidates.

**Iceland's Visa vertical is now open** (`is/utl/other-residence-permit-application`,
GOV-2210), via Útlendingastofnun's (the Directorate of Immigration, ÚTL)
Form D-110, "Other Residence Permits" (Umsókn um dvalarleyfi — annað) — the
Directorate's catch-all/generic residence-permit application, used
whenever no dedicated category-specific form exists for the applicant's
situation (Working Holiday/Youth Mobility, volunteers, missionaries,
legitimate-and-special-purpose grounds, special ties to Iceland, or an
"Other, what?" free-text category). A single bounded 9-page,
13-numbered-section AcroForm — confirmed via a from-scratch `pdfjs-dist`
re-extraction at 251 widgets, exactly matching a prior same-session
extraction pass. A second, differently-hashed Contentful CDN URL for a
same-named file proved to be a genuinely different, 256-widget, 14-section
document; resolved as a stale/superseded intermediate CDN artifact, not the
current live form — see the document's own VERIFICATION.md for the full
byte/date evidence. Every widget was cross-walked to a field name/label
with a position-aware (x/y proximity) mapping script, the same technique
`at/bmeia/schengen-visa-application` and
`se/migrationsverket/work-permit-application` describe using. Net 185
fields, 9 `documents[]` entries, 14 `steps`, and 6 `crossFieldValidation`
rules; deliberately uses 0 `exclusivityGroups`, after confirming that
`at/bmeia` and `se/migrationsverket` both model their own equivalent
single-select checkbox grids as a plain `enum` field, reserving
`exclusivityGroups` for a narrower case neither present here — see
VERIFICATION.md for the full reasoning. This brings Iceland to 3 of its 6
verticals (Business Formation, Taxes, Visa). See the Executive Summary
update above and the document's own VERIFICATION.md for the full sourcing
record and every judgment call.

**Argentina's Visa vertical is now open** (`ar/cancilleria/formulario-solicitud-visado`,
GOV-2179), via the Cancillería's (Ministerio de Relaciones Exteriores,
Comercio Internacional y Culto) Formulario de Solicitud de Visado (FSV) —
the standard cover application used at Argentine consulates worldwide for
most visa categories, with the specific category and its supporting-
documentation checklist determined by the consular officer from the
applicant's stated purpose of travel. Sourced from two independently
fetched specimens (the Cancillería's own 2024 edition and a 2026
consulate-mirrored edition), diffed field-by-field and found
structurally identical — only the page-margin form-code/edition stamp
differs, confirming stability. A genuine 50-widget/50-field AcroForm PDF
with a clean 1:1 widget:field ratio (no split-box or mirrored-copy
structure, unlike this registry's other Argentina schema); campos 32-38
(prior-Argentine-visa history) model a cascading `requiredWhen` chain, the
same convention `at/bmeia/schengen-visa-application` established. This
brings Argentina to 2 of its 6 verticals (Business Formation, Visa). See
the Executive Summary update above and the document's own VERIFICATION.md
for the full sourcing record and every judgment call.

**Japan** (`jp/isa/certificate-of-eligibility-application`, GOV-2005) opens
Japan as the registry's 28th jurisdiction, via the Immigration Services
Agency's (ISA) Application for Certificate of Eligibility — the
pre-clearance step nearly every non-tourist status of residence requires
before the matching entry visa can be applied for abroad. This document
models only the shared, category-agnostic applicant cover sheet ("For
applicant, part 1"), confirmed byte-for-byte identical across three
independently downloaded status-of-residence category variants (Student,
Religious Activities, Spouse or Child of Permanent Resident/Japanese
National); each category-specific supplement (roughly 30 lettered variants)
and the separate sponsoring-organization pages are out of scope, left as
candidates for a future companion-schedule cycle. Not a Schengen/EU-style
visa form — Japan's immigration-law framework is sui generis, so no
duplicate-detection comparison applies. See the Executive Summary update
above and the document's own VERIFICATION.md for the full candidate
screening (DMV, Business Formation, and National ID candidates found but
not chosen this cycle) and sourcing record.

**Estonia's Visa gap is now closed** (`ee/vm/long-stay-visa-application`,
GOV-1970) — sourced from Valisministeerium's (Ministry of Foreign Affairs)
own 13-page online pre-application wizard (`eelviisataotlus.vm.ee/d/`) for
Estonia's national (long-stay, category D) visa, independently walked live
end-to-end with a real headless-browser session (via `agent-browser` +
Playwright's `connectOverCDP`, to solve the page 1 CAPTCHA and preserve
session state across tool calls) rather than relying solely on a secondary
guide. Compared field-by-field against
`de/auswaertiges-amt/national-visa-application`: shares only the opening
Schengen-harmonized identity/travel-document shape, then diverges with an
EU/EEA/Swiss/UK-Withdrawal-Agreement close-relative section, a mandatory
employment/education-history block with a full structured employer
address, a two-column applicant/sponsor means-of-support checkbox matrix,
a host organization/person section with its own registration code and
contact person, and its own 8-category purpose-of-journey taxonomy —
genuinely distinct, not a duplicate. This gives Estonia 6 of its 6
verticals, joining the registry's other fully-covered jurisdictions — see
the Executive Summary update above and the document's own VERIFICATION.md
for the full sourcing record and every disclosed scope decision.

**The Czech Republic's Visa gap is now closed** (`cz/mzv/zadost-o-udeleni-dlouhodobeho-viza`,
GOV-1819) — sourced from the Ministry of Foreign Affairs' own bilingual
"Žádost o udělení dlouhodobého víza" / "Application for long-stay visa"
(ŘSCP č. 1/2010), a genuine, directly-downloadable, unauthenticated PDF
(`mzv.gov.cz`, no login/CAPTCHA/WAF gate). Its opening identity block follows
the same Schengen-harmonized numbering convention Poland's, Spain's,
Portugal's, and Switzerland's national visa forms all turned out to
duplicate field-for-field against `de/auswaertiges-amt/national-visa-application`,
but this form was confirmed genuinely distinct after a full field-sequence
comparison: an unconditional parents block, a distinct "employer after
entry" field, a structured "previous stay in the Czech Republic longer than
3 months" block, a Czech-specific "Executive manager" purpose option citing
the Czech Commercial Code (Act No. 513/1991 Coll.) verbatim, and a fully
structured inviting-person/company block, none of which have a German
counterpart. The Czech Republic's own companion Schengen short-stay visa
form was checked separately and confirmed a duplicate of
`fr/france-visas/schengen-visa-application`; not authored. This gives the
Czech Republic 3 of its 6 verticals (Business Formation, DMV, Visa) — see
the Executive Summary update above and the document's own VERIFICATION.md
for the full candidate comparison and sourcing record.

**Malaysia's Visa gap is now closed** (`my/jim/visa-with-reference-application`,
GOV-1789) — sourced from JIM's IM.12 "Borang Permohonan Pas Lawatan" (Visit
Pass Application Form), the intake form JIM's own current "Visa With
Reference" service page requires (together with the companion Form Imm.38)
for four of its five VDR applicant categories; see the Executive Summary
update above and the document's own VERIFICATION.md for the full sourcing
record and disclosed scope decisions. This gives Malaysia 3 of its 6
verticals (DMV, Passport, Visa).

**Poland's Visa gap was screened this cycle (GOV-1691) and confirmed a
duplicate, not an open candidate**: the current wzór wniosku o wydanie wizy
krajowej (Załącznik nr 2 do Rozporządzenie MSWiA z dnia 25 czerwca 2025 r.,
Dz.U. 2025 poz. 847) shares the same EU long-stay-visa field sequence,
field-for-field, as the already-modelled
`de/auswaertiges-amt/national-visa-application` — see
`pl/mf/zeznanie-pit-37`'s own VERIFICATION.md for the comparison. Not
authored; a genuinely distinct Polish visa pathway, if one exists, remains
open backlog. **Spain's Visa gap is now closed** (`es/maec/solicitud-visado-nacional`,
GOV-1861) — sourced from MAEC's own "Solicitud de visado nacional," Spain's
national (long-stay, Type D) visa application. A prior cycle (GOV-1652) had
screened this same form and set it aside as a duplicate of
`de/auswaertiges-amt/national-visa-application`; this cycle re-did that
comparison field-by-field against both the DE schema's own committed field
list and a fresh re-extraction of the DE source PDF, and found the two
forms diverge sharply past their shared ~9-item Schengen-harmonized identity
block — Spain's own 12-category residence-purpose taxonomy and its
family-reunification-sponsor/employer/educational-establishment blocks have
no German counterpart, and Germany's own spouse/children/parents/prior-stays/
health/criminal-history sections have no Spanish counterpart. Spain's own
Schengen short-stay visa form, by contrast, is confirmed a genuine duplicate
of `fr/france-visas/schengen-visa-application` and was not authored — see
the document's own VERIFICATION.md for the full comparison. This gives
Spain 5 of its 6 verticals. **Chile**,
opened via Business Formation (GOV-1624), has no Visa
schema yet — an open, unscreened backlog candidate for a future cycle.
**Colombia's Visa gap is now closed** (`co/cancilleria/visa-application-individual`,
GOV-1602) — sourced from the Cancillería's own "Guía de Usuario: Solicitar
Visa en línea" (SITAC), a 47-page screenshot-driven walkthrough of the live
online-visa wizard, hosted directly and unauthenticated on
`cancilleria.gov.co`; the live wizard itself is bot-mitigation (WAF/TSPD
challenge-script)-gated, reconfirmed this cycle. Scoped to an Individual
applicant acting as their own visa's Titular Principal (directly or through
an apoderado) — see the Executive Summary update above and the document's own
VERIFICATION.md for the full candidate record and scope disclosures.

**Three confirmed, previously-researched dead ends — not open work:**

- **NL:** no Dutch-specific entry-visa schema. Netherlands participates in the Schengen area; short-stay visas are modelled once for the bloc via `fr/france-visas/schengen-visa-application`. A Dutch national long-stay visa (MVV) process exists but is fragmented across 200+ purpose-specific application variants with no single well-bounded source form (see GOV-777/GOV-859 research).
- **ZA:** Home Affairs' eHomeAffairs visa portal is reCAPTCHA- and
  nationality-gated for unauthenticated/programmatic access, confirmed via a
  live-rendered walkthrough as recently as this same day (GOV-1225,
  2026-07-05). No online visa-application form is publicly sourceable at
  this time.
- **BR:** Brazil's own SCI e-visa wizard (`formulario-mre.serpro.gov.br`) is
  CAPTCHA-gated before any field page; the VFS-operated e-visa portal is
  both nationality-gated (AU/CA/US applicants only) and WAF-defended, with
  no official PDF form available as an alternative (GOV-1428, 2026-07-06).

Every jurisdiction except Colombia (AE, AU, CA, DE, FR, GB, ID, IE, IN, KR,
MX, NZ, PH, SG, US) now has at least one Visa schema. **Indonesia's Visa gap
is now closed** (`id/imigrasi/evisa-visitor-visa-application`, GOV-1581) —
this vertical had been screened across three prior cycles (GOV-1560,
GOV-1567, GOV-1574) as a strong candidate blocked only by the official
Ditjen Imigrasi "User Manual e-Visa" PDF's own "Fill Form → Personal
Information" screen rendering as an unlabelled wireframe with no field
labels at any resolution — reconfirmed once more this cycle by re-reading
the same PDF directly. This cycle found a second, independent source that
resolves the gap: a US college's own study-abroad/international-programs
office (Principia College) publishes a full-resolution walkthrough of the
same live `evisa.imigrasi.go.id` platform, filled with a real worked B1 – 30
Day Visitor-visa example, showing every "Fill Form" field's actual on-screen
label — Personal Information (Full name, Sex, Place/Date of Birth, Phone
Number), Passport Information (Document Type/No., Nationality, Date of
Expiry, Issuing Country), Address in Indonesia (Residence Type, Address,
Postal Code, plus auto-populated Province/City/District/Village/Immigration
Office), and Applicant Contact Confirmation (Email/Email Confirmation).
Scoped to the General/Family/Social → B1 Visitor-visa pathway only; the
official manual's own worked example follows a different, more complex
Golden Visa/Investment top-level branch not walked field-by-field by either
source, left out of scope for this v1.0.0 — see the document's own
VERIFICATION.md. This gives Indonesia 5 of its 6 verticals. **The Philippines**
(`ph/bi/non-immigrant-visa-application`, GOV-1490) is new this cycle —
sourced from the Bureau of Immigration's own Consolidated General Application
Form (CGAF) for Non-Immigrant Visa, Special Work Permit, and Provisional Work
Permit, a directly downloadable, unblocked (no login/CAPTCHA/WAF) text-layer
PDF from `immigration.gov.ph`'s own BI Forms page; this closes the PH Visa
gap this catalog had explicitly flagged as a strong open candidate since
GOV-1466, and gives the Philippines its 4th vertical (Business Formation,
National ID, Taxes, Visa). **United Arab Emirates**
(`ae/icp/visa-single-entry-long-stay-pleasure`, GOV-1421) was new in a prior
cycle — sourced from ICP's own official "Smart Services User Guide –
Individuals Services" (V0.1, Jan 2022), a 49-page screenshot-driven
walkthrough, no login required for the guide itself; this opened the UAE's
2nd vertical. **Mexico** (`mx/inm/forma-migratoria-multiple-electronica`,
GOV-1393) was new in a prior cycle — sourced from the Instituto Nacional de
Migración's own live, unauthenticated FMM (Forma Migratoria Múltiple) online
wizard, opening Mexico as the registry's 16th jurisdiction. Scoped to land
entry only: the wizard's own client-side script hardcodes and disables its
means-of-entry selector to "By land" on the URL this cycle sourced, so the
"by air" pathway defined in the same underlying catalog is never reachable
through it (see the document's own VERIFICATION.md). **South Korea**
(`kr/moj/visa-application`, GOV-1292) was new in a prior cycle — sourced from
the Ministry of Justice/Korea Immigration Service's gazetted Visa
Application Form (사증발급신청서), a plain directly-downloadable bilingual PDF,
no login or CAPTCHA required. Remaining sub-process gaps: India
work/student/business visas beyond e-Tourist and e-Student (already 2 of
India's likely several visa categories — see `in/mha/evisa-etourist`,
`in/mha/evisa-estudent`); GB work/graduate visas (Home Office digital
services not yet open-sourced); Mexico's own air/sea entry pathways (see
above).

**Update (2026-07-10, GOV-2070, "GovSchema Standard Research"): Sweden's
Visa vertical is now published**, via
`se/migrationsverket/work-permit-application` v1.0.0 — the Swedish
Migration Agency's (Migrationsverket) Form 149011, "Application for a
Swedish work permit". This cycle re-screened Sweden's four remaining
verticals after GOV-2063 (Passport, Taxes, Visa, National ID): Passport
(Polisen) and National ID (Skatteverket/Polisen) were reconfirmed
in-person/biometric-only dead ends; Taxes (Skatteverket SKV 4314) was
initially the strongest-looking candidate but was abandoned after
independent re-verification found its only fetchable static copy to be a
stale c.2014/2015 edition, and Skatteverket's live PDF-generation servlet
resets the connection for both a direct fetch and a real headless-browser
session alike (a genuine server fault, not a bot gate) — see the document's
own VERIFICATION.md for the full trail. Migrationsverket's own Schengen
short-stay visa form was reconfirmed a duplicate of the EU-harmonized
template already published elsewhere in this registry, but its separate
work-permit form (149011, edition 2026-06-11 — one month old at the time of
review) is a genuinely Sweden-national, non-harmonized 143-field AcroForm
with zero overlap with the Schengen template. This is Sweden's third
vertical (Business Formation, DMV, Visa now open; Passport, Taxes, National
ID remain open — Taxes as a genuinely open but currently source-blocked
candidate, the other two as confirmed dead ends).

### National ID & Civic Documents (32/40 jurisdictions — 80%)

**Sri Lanka's National ID & Civic Documents vertical closes (2 of 6)
(GOV-2753)**, via `lk/drp/application-for-a-national-identity-card` — the
Department for Registration of Persons' (DRP) combined "Form 'B'" (DRP
1,7,8), "Application for an Identity Card under sections 9, 16 and 17 of
the Registration of Persons Act, No 32 of 1968." See the Executive
Summary's GOV-2753 update above for the full sourcing record — including
the render-confirmed office-use-panel/routing-box distinction, the
Item 8.2 printed-heading-vs-instructions-manual discrepancy, and every
other disclosed scoping/judgment call — and the document's own
VERIFICATION.md. **Sri Lanka now stands at 2 of 6 verticals** (Passport,
National ID); DMV, Business Formation, Taxes, and Visa remain open,
unscreened backlog candidates.

**Bangladesh's National ID & Civic Documents vertical opens, closing
Bangladesh to 6 of 6 verticals (GOV-2688)**, via
`bd/nidw/nid-correction-application-form-1` — NIDW's Form-1, "Application
for Correction of Error(s) in the National ID Card or Preserved Data." See
the Executive Summary's GOV-2688 update above for the full sourcing record —
including the Bengali text-extraction reordering fix and every disclosed
scoping/judgment call — and the document's own VERIFICATION.md. A sibling
update (GOV-2687, `bd/roc`) opened Business Formation in parallel this same
cycle, so together **Bangladesh now stands at 6 of 6 verticals** (Taxes,
DMV, Passport, Visa, Business Formation, National ID) — no vertical remains
open for Bangladesh.

**Nigeria's National ID & Civic Documents vertical closes (4 of 6) (GOV-2569)**,
via `ng/nimc/nin-enrolment-form` — the National Identity Management
Commission's (NIMC) "National Identification Number (NIN) Enrolment Form"
v2.0, a pre-enrolment form completed before an in-person biometric-capture
appointment at an NIMC enrolment centre. See the Executive Summary's
GOV-2569 update above for the full sourcing record and the document's own
VERIFICATION.md for every disclosed scoping/judgment call. Nigeria stood at
4 of 6 verticals (Business Formation, Taxes, Visa, National ID) after this
update, with DMV a confirmed dead end and Passport the sole remaining open
vertical; Passport has since closed too (GOV-2577, see the Executive
Summary and Passport-vertical updates above), bringing Nigeria to 5 of 6.

**Kenya's National ID & Civic Documents vertical opens (2 of 6) (GOV-2500)**,
via `ke/nrb/application-for-identity-card` — Form Reg. 136A, "Ombi ya
Kitambulisho / Application for Identity Card," prescribed under the
Registration of Persons Act, Cap. 107, and administered by the National
Registration Bureau (NRB). See the Executive Summary's GOV-2500 update above
for the full sourcing record — including the parallel screening of Kenya's
other four remaining verticals and the widget-to-label coordinate-correlation
technique — and the document's own VERIFICATION.md for every disclosed
scoping/judgment call. Kenya now stands at 2 of 6 verticals (Business
Formation, National ID); Passport, DMV, and Visa are confirmed dead ends;
Taxes remains open, unscreened-in-depth backlog for a future cycle.

**Sweden**'s National ID & Civic Documents gap is now closed (GOV-2372),
via `se/skatteverket/samordningsnummer-ansokan` — Skatteverket's form
SKV 7540, "Samordningsnummer – Ansökan" (Coordination Number —
Application), used by a person with a connection to Sweden but not
registered as a resident to request a samordningsnummer, Sweden's
personnummer-equivalent identifier for non-residents. This was Sweden's
sole remaining open vertical (Business Formation, DMV, Visa, Taxes, and
Passport were already closed); see the Executive Summary update above and
the document's own VERIFICATION.md for the full sourcing record,
including a disclosed servlet-routing quirk in the direct-PDF URL (a
missing `formPageURL` parameter, not a login/BankID gate) and the
form's own confirmed authority-completed page 2. **Sweden now stands at 6
of 6 verticals** — no vertical remains open for Sweden.

**Norway**'s National ID & Civic Documents gap is now closed (GOV-2323),
via `no/skatteetaten/notification-of-move-within-norway` — Skatteetaten's
RF-1400B, "Flyttemelding" (move notification), used to register a change
of residential address in Folkeregisteret (the National Population
Register) for a person or family group who already hold a Norwegian
fødselsnummer. This was CATALOG.md's own named Known Gaps candidate for
Norway (item 8); see the Executive Summary update above and the
document's own VERIFICATION.md for the full sourcing record. **Update
(2026-07-11, GOV-2330): Norway's DMV vertical has since closed too**, via
`no/vegvesen/soknad-om-forerkort-og-kompetansebevis` — see the Executive
Summary update above. Norway now stands at 3 of 6 verticals (Business
Formation, National ID, DMV); Visa remains Norway's only open,
pre-scouted backlog candidate — see "Known Gaps" below.

**Finland**'s National ID & Civic Documents gap is now closed (GOV-2299),
via `fi/dvv/registration-of-foreigner` — the Digital and Population Data
Services Agency's (DVV) form DVV05.03.00A, "The registration information of
a foreigner," used to request a henkilötunnus (Finnish personal identity
code) and register a foreign national in the Population Information System
for the first time. This was this catalog's own named Known Gaps candidate
for Finland (item 7); see the Executive Summary update above and the
document's own VERIFICATION.md for the full sourcing record. Finland now
stands at 3 of 6 verticals (Visa, Business Formation, National ID); DMV and
Taxes remain open, unscreened backlog candidates — see "Known Gaps" below.

**Denmark**'s National ID & Civic Documents gap is now closed (GOV-2260),
via `dk/cpr/notification-of-entry` — KL's (Kommunernes Landsforening) form
FR 050, "Anmeldelse af indrejse" (Notification of Entry), the national
template every Danish kommune uses to register a person or family entering
Denmark in CPR (Det Centrale Personregister), the same system whose
10-digit personnummer already appears throughout the Passport and Taxes
schemas. See the Executive Summary update above and the document's own
VERIFICATION.md for the full sourcing record. Denmark now stands at 3 of 6
verticals (Passport, Taxes, National ID); DMV, Business Formation, and
Visa remain open backlog candidates (Business Formation and Visa were
screened this same cycle and set aside as weaker candidates, not hard dead
ends — see "Known Gaps" below).

**Iceland**'s National ID & Civic Documents gap is now closed (GOV-2233), via
`is/skatturinn/system-identification-number-application-foreign-national` —
Skatturinn's Form RSK 3.30, the foreign national's application for a
kerfiskennitala (system identification number), the temporary ID number
issued to a foreign national who does not qualify for a regular Icelandic
kennitala. This closes Iceland's sixth and last open vertical; see the
Executive Summary update above and the document's own VERIFICATION.md for
the full sourcing record. Iceland now stands at 6 of 6 verticals, the second
jurisdiction in this registry (after Colombia) to reach full coverage.

**Japan**'s National ID gap is now closed (GOV-2012), via
`jp/j-lis/individual-number-card-issuing-application` — the Japan Agency for
Local Authority Information Systems' (J-LIS) generic, handwritten Individual
Number Card (My Number Card) Issuing Application, officially bilingual
Japanese/English. See the Executive Summary update above and the document's
own VERIFICATION.md for the full sourcing record.

**Switzerland**'s National ID (Identitätskarte) gap is now closed (GOV-1931),
via the same schema that closed its Passport gap,
`ch/fedpol/antrag-pass-identitaetskarte` — fedpol's federal
`ch-edoc-passantrag.admin.ch` online application tool issues a passport, an
identity card, or both through one shared field set and flow, so this
registry models it as one schema with a `documentType` discriminator rather
than splitting Passport/National ID into two documents. See the Passport
section above and the Executive Summary update for the full sourcing story.

**Portugal**'s National ID gap is now closed (GOV-1797), via
`pt/mne/requerimento-cartao-cidadao-passaporte-consular` — the
Consulado-Geral de Portugal em São Paulo's "Requerimento de Atos Presenciais
— Cartão do Cidadão e/ou Passaporte." Domestic Cartão de Cidadão issuance
remains an in-person, biometric-only appointment with no downloadable form
(as GOV-1750 found); this cycle instead pursued the consular-PDF lead
GOV-1750 had flagged as unexplored, and found this São Paulo consulate
counter-intake form carries a genuine 45-unique-position AcroForm widget
layer — stronger than the Rio de Janeiro consulate's equivalent
`req_cc.pdf` (a flat, widget-free print facsimile, the only consular PDF
GOV-1750 had examined). Scoped explicitly to this one consular post's own
published document (other consulates publish their own, differently
structured versions — see the document's own VERIFICATION.md), and modelled
under National ID since Cartão de Cidadão is the form's first-listed,
primary modality even though the same form also serves a passport-only
request option; Portugal's Passport vertical (domestic, e.g. a distinct SEF/
PEP application) remains a separately open, unscreened-for-a-consular-
equivalent backlog candidate. This gives Portugal **4 of its 6 verticals**
(DMV, Visa, Taxes, National ID); Business Formation and Passport remain
open backlog candidates, both re-confirmed dead ends this cycle for the
domestic channel specifically (see "Confirmed dead ends" below).

**Estonia** opens as the registry's 23rd jurisdiction via this vertical
(`ee/ppa/e-residency-application`, GOV-1698) — the Police and Border Guard
Board's e-Resident's digital ID application. See the Executive Summary
update above and the document's own VERIFICATION.md for the full sourcing
record (the live `apply.gov.ee`/`eresident.politsei.ee` application SPA has
no unauthenticated field-level view; every field is instead sourced from
the PPA's own official English-language statutory field list, published in
plain HTML on `politsei.ee`).

**Poland** opens as the registry's 22nd jurisdiction via this vertical
(`pl/mswia/wniosek-o-wydanie-dowodu-osobistego`, GOV-1666) — MSWiA's dowód
osobisty (national identity card) application form, DO/W/1, a genuine,
unauthenticated AcroForm PDF with 47 self-documenting named field widgets,
attached directly to the gov.pl "Uzyskaj dowód osobisty" service page. See
the Executive Summary update above and the document's own VERIFICATION.md
for the full sourcing record and candidate comparison (which also
re-screened and re-confirmed Spain's Passport/Visa and Chile's
Passport/Visa/National ID gaps as still weaker).

**Spain**, opened via its Taxes vertical (GOV-1645), now has a National ID &
Civic Documents schema: `es/dgp/tarjeta-identidad-extranjero` (GOV-1735) —
the Dirección General de la Policía's EX-17 form, "Solicitud de Tarjeta de
Identidad de Extranjero (TIE)," the application a foreign national files, in
person, for the physical foreign-resident identity card. This follows up on
this catalog's own previously flagged EX-15 lead, picking EX-17 instead as
the closer structural match to already-published national-ID schemas — see
the Executive Summary update above and the document's own VERIFICATION.md
for the full sourcing record, including a disclosed citation mismatch
between the form's own printed legal basis (RD 557/2011) and the current
governing regulation (RD 1155/2024) per the Policía Nacional's own live
procedure page. Spain's own DNI (for Spanish citizens, as opposed to
foreign residents) remains issued by the Policía Nacional via a separate,
in-person-appointment-only channel with no downloadable form — a confirmed
dead end, unrelated to this newly-modelled TIE schema (see "Confirmed dead
ends" below). **Brazil** now
has a National ID & Civic Documents schema:
`br/pr/iipr/carteira-identidade-correcao` (GOV-1631) — see the Executive
Summary update above for the full sourcing method (including the DNS
correction to the two prior cycles' own `rci.pr.gov.br` citation) and the
document's own VERIFICATION.md for every disclosed judgment call. This
closes the gap the paragraph below (left largely as originally written,
for its own historical record of how the candidate was found) describes as
"the strongest-ever-found, ready-to-author candidate for Brazil's National
ID gap."

**Chile**, opened this cycle (GOV-1624) via Business Formation, has no
National ID schema yet — Registro Civil's cédula de identidad renewal was
screened and found ClaveÚnica-login-gated with no PDF fallback, left open as
a weak backlog candidate (see "Known Gaps" below). **Brazil's National ID gap (Carteira de Identidade Nacional, CIN) was
deep-dived for the first time this cycle** and turns out to be a genuinely
strong, ready-to-author candidate for an immediate follow-up cycle — stronger
than initial screening suggested. The federal `gov.br` CIN portal and Rio
Grande do Sul's own "Identidade Fácil" are both SSO-login-gated before any
form renders (the same wall that has already killed other Brazil candidates
in this registry). Paraná's own `rci.pr.gov.br/solicitante/iniciar` (embedded
via `policiacivil.pr.gov.br`) exposes only a 3-field, unauthenticated
identity-lookup/eligibility screen (`num_doc`/`nome`/`data_nascimento`) — but
a deeper pass found the real downstream data-entry form independently: a
sibling page (`policiacivil.pr.gov.br/Pagina/Correcao-de-Solicitacao`)
embeds `rci.pr.gov.br/pedido`, a Vue/Inertia single-page app whose compiled,
unauthenticated, no-CAPTCHA `app.js` bundle (2.2MB, directly downloadable)
contains its own component source; grepping it for `$parent.form.<field>`
references exposed a genuine, rich, bounded field set — address (with live
ViaCEP-style postal-code autofill), phone, marital status, name/date-of-birth
correction fields, parents' names, blood type, a disability-type checkbox
group, health observations, organ-donor status, five separate identity/
labour-document numbers (CPF/CNH/CNS/PIS/TRE/CTPS), file uploads (birth
certificate, photo, signature image, health documentation), and a pickup
post-office selector — confirming the info page's own "Informações
opcionais" prose genuinely describes applicant-input fields, not just
card-print output. This flow is scoped to a correction/update/reissuance of
an *existing* Paraná RG/CIN record, not first-time issuance (confirmed
separately gated in-person-only, per `seguranca.pr.gov.br`'s own "Para quem
não possui CIN ou RG expedido no Paraná" page) — not picked this cycle
because verifying each field's real on-screen label/requiredness against the
live-rendered Vue app (the JS bundle exposes internal field names, not
confirmed on-screen text) is a substantial task of its own, better scoped as
a dedicated future cycle's full focus than a side investigation here. Left
as the strongest-ever-found, ready-to-author candidate for Brazil's National
ID gap. **Colombia** now has a
National ID & Civic Documents schema:
`co/registraduria/duplicado-cedula-ciudadania` (GOV-1616), closing Colombia's
6th and final vertical. Three prior cycles (GOV-1567 opened Colombia;
GOV-1595, GOV-1602) had each screened this gap and stopped at
`www.registraduria.gov.co` returning HTTP 403 to every direct fetch —
described as recently as GOV-1602 only via secondary sources ("full name,
cédula number, email, phone, PSE payment"). This cycle found the real
service subdomain (`epagos.registraduria.gov.co`), unblocked, and authored
directly against its live HTML plus its own official PDF manual — see the
Executive Summary update above and the document's own VERIFICATION.md.
Colombia's own overseas voter-registration candidate, screened in GOV-1574,
remains a separate, still-open, election-cycle-scoped gap (the
`inscribeteonline2026.registraduria.gov.co` microsite no longer resolves —
see "Known Gaps" below); it is not needed to consider Colombia's National ID
vertical closed, since `duplicado-cedula-ciudadania` already covers the
jurisdiction's core national-ID document. Every other jurisdiction except Indonesia and Mexico has at least one
National ID and/or voter-registration schema (Brazil's own gap closed via
`br/pr/iipr/carteira-identidade-correcao`, GOV-1631 — see the Executive
Summary update above). Indonesia's National ID gap was
screened this cycle (GOV-1560): Dukcapil's own KTP-el/NIK registration is
confirmed in-person and biometric (photo/fingerprint/iris) only, with
Dukcapil's own site explicitly stating no web/app channel exists even for NIK
lookup — a confirmed weak/no-online-channel candidate, mirroring Mexico's
CURP and Brazil's CIN precedent, not a fully dead end but not pursued further
this cycle. **The United Arab Emirates**
(`ae/icp/emirates-id-replacement`, GOV-1474) is new this cycle — sourced from
the ICP (Federal Authority for Identity, Citizenship, Customs & Port
Security) Smart App's own official user manual (Citizen Category, v5.23), a
genuinely screenshot-driven walkthrough of the "Replace Emirates ID" service,
directly downloadable with no login/CAPTCHA/WAF. This closes the UAE's
National ID gap this catalog's own "Known Gaps" section had explicitly
flagged. Scoped to card replacement/renewal for an existing citizen family
member; neither this manual nor its Resident Category sibling shows a
genuine first-time/new Emirates ID issuance wizard field-by-field (only a
menu-tile label in both) — see the document's own VERIFICATION.md for this
and eight other disclosed judgment calls, including a by-analogy inference
that folds in the Terms-and-Conditions checkbox confirmed on the sibling
Resident Category manual's visually-identical fee-review screen. **The
Philippines** gained its first National ID & Civic Documents schema in a
prior cycle (GOV-1457): `ph/comelec/overseas-voter-registration`, sourced
from COMELEC's public iRehistro web tool (OVF No. 1, Registration application
type only — see that document's own VERIFICATION.md for the seven other
application types left out of scope, and for why `registeredCityMunicipality`
is modelled as an open string rather than an enum). Mexico's CURP
national-ID candidate requires an in-person biometric appointment and was not
sourceable in a prior cycle (GOV-1393) — an open backlog candidate, not a
dead end. Brazil's Carteira de Identidade Nacional (CIN) candidate was rated
an open but weak backlog candidate as of GOV-1428 (2026-07-06): Decreto nº
10.977/2022 enumerates the finished card's ~20+ printed data attributes, but
that's the card's data schema, not an application form — the decree's actual
filing requirements are just a CPF plus one birth/marriage certificate, too
thin to author a field-level schema from on its own. **This has since
closed** (GOV-1631, 2026-07-07): Paraná's own RCI correction/reissuance
system turned out to be the strong candidate this decree-only read had
missed — see the Executive Summary update above and
`br/pr/iipr/carteira-identidade-correcao`'s own VERIFICATION.md. **Brazil's voter-registration
candidate was newly screened this cycle (GOV-1483):** TSE's Título Net
(Autoatendimento Eleitoral) self-service system is a genuine, fully-online
first-time voter registration (alistamento eleitoral) — confirmed via a
live, unauthenticated Playwright walk — but is nationwide-closed from
2026-05-07 to 2026-11-03 under art. 91 of the Lei das Eleições (Lei no.
9.504/1997), the 150-day pre-election blackout ahead of Brazil's October
2026 municipal elections. This is a hard, dated, legally-mandated block, not
a dead end — the strongest remaining National ID & Civic Documents candidate
for Brazil once it reopens 2026-11-03; see
`kr/nts/corporation-establishment-and-business-registration`'s own
VERIFICATION.md ("Candidates rejected or deferred this cycle") for the full
citation trail. Singapore's lack of a
voter-registration schema is a **confirmed non-gap**
(GOV-1075): Singapore voting is compulsory and NRIC-linked, with no
citizen-initiated online registration step to model. **South Korea** has two
National ID documents: `kr/nec/overseas-voter-registration` (GOV-1294),
sourced from the National Election Commission's combined overseas
absentee-voter notification / overseas voter registration form, and
`kr/mois/resident-registration-card-reissuance` (GOV-1317), sourced from the
Ministry of the Interior and Safety's gazetted card-reissuance form — the two
strong candidates GOV-1289's original research found for this vertical, both
now closed.

---

## By Jurisdiction

| Jurisdiction | Schemas (top-level dirs) | Passport | DMV | Business | Taxes | Visa | National ID |
|---|---|:---:|:---:|:---:|:---:|:---:|:---:|
| **AE** | 6 | ✗ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **AR** | 5 | ✗ | ✓ | ✓ | ✗ | ✓ | ✗ |
| **AT** | 5 | ✓ | ✗ | ✓ | ✓ | ✓ | ✓ |
| **AU** | 8 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **BD** | 5 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **BR** | 5 | ✓ | ✓ | ✓ | ✓ | ✗ | ✓ |
| **CA** | 9 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **CH** | 3 | ✓ | ✓ | ✗ | ✓ | ✗ | ✓ |
| **CL** | 3 | ✗ | ✓ | ✓ | ✓ | ✗ | ✗ |
| **CO** | 6 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **CZ** | 8 | ✗ | ✓ | ✓ | ✓ | ✓ | ✗ |
| **DE** | 12 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **DK** | 7 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **EE** | 6 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **ES** | 5 | ✗ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **FI** | 6 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **FR** | 9 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **GB** | 15 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **GH** | 5 | ✓ | ✗ | ✓ | ✓ | ✓ | ✓ |
| **GR** | 2 | ✗ | ✗ | ✗ | ✓ | ✓ | ✗ |
| **ID** | 5 | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| **IE** | 12 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **IN** | 16 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **IS** | 6 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **IT** | 2 | ✗ | ✓ | ✗ | ✓ | ✗ | ✗ |
| **JO** | 3 | ✓ | ✗ | ✗ | ✓ | ✓ | ✗ |
| **JP** | 9 | ✗ | ✗ | ✓ | ✓ | ✓ | ✓ |
| **KE** | 3 | ✗ | ✗ | ✓ | ✓ | ✗ | ✓ |
| **KR** | 8 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **LK** | 2 | ✓ | ✗ | ✗ | ✗ | ✗ | ✓ |
| **MX** | 5 | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| **MY** | 4 | ✓ | ✓ | ✓ | ✗ | ✓ | ✗ |
| **NG** | 5 | ✓ | ✗ | ✓ | ✓ | ✓ | ✓ |
| **NL** | 8 | ✓ | ✓ | ✓ | ✓ | ✗ | ✓ |
| **NO** | 4 | ✗ | ✓ | ✓ | ✗ | ✓ | ✓ |
| **NZ** | 9 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **PE** | 4 | ✗ | ✓ | ✓ | ✓ | ✓ | ✗ |
| **PH** | 6 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **PL** | 5 | ✓ | ✓ | ✓ | ✓ | ✗ | ✓ |
| **PT** | 6 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **RS** | 3 | ✗ | ✗ | ✓ | ✓ | ✓ | ✗ |
| **RW** | 4 | ✓ | ✓ | ✓ | ✗ | ✓ | ✗ |
| **SE** | 6 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **SG** | 11 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **TH** | 5 | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| **US** | 32+ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **UY** | 3 | ✗ | ✓ | ✓ | ✗ | ✓ | ✗ |
| **VN** | 5 | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| **ZA** | 10 | ✓ | ✓ | ✓ | ✓ | ✗ | ✓ |

"Schemas (top-level dirs)" counts distinct `<agency>/<process-name>` entries
under `registry/<jurisdiction>/`, not every version/edition. US is
comprehensive across federal agencies plus CA/FL/NY state variants, hence
"32+".

**Status:** ✓ = at least one schema published (may be partial/sub-process
incomplete). ✗ = no schema published, with the specific reason noted above.

---

## Known Gaps & Opportunities

### Genuinely open, well-sourced candidates

1. **Sub-national/state DMV & Business Formation expansion**: CA/NZ/IE/IN
   sole-trader/partnership/LLP formation; CDL/HGV-equivalent schemas outside
   the US and GB. **Update (GOV-1947): Ontario's sole-trader half is now
   closed**, via `ca/on/registration/sole-proprietorship-registration`
   (Form 5288E) — see the Executive Summary update above and the document's
   own VERIFICATION.md. **Update (GOV-1953): Ontario's
   general/limited-partnership half is now closed too**, via
   `ca/on/registration/general-limited-partnership-registration` (Form
   5298E) — see the Executive Summary update above and the document's own
   VERIFICATION.md; Ontario's entire share of this gap is now fully closed.
   **Update (2026-07-09, GovSchema Standard Research): India's share is
   now closed too**, via `in/kl/registration/partnership-firm-registration`
   ("Form I", under Section 58 of the Indian Partnership Act, 1932, as
   prescribed by Kerala's own Partnership Rules) — see the Executive
   Summary update above and the document's own VERIFICATION.md. Ireland's
   RBN1 (individual business-name registration) was screened first for the
   same gap but is blocked by a Cloudflare JavaScript challenge across the
   entire `cro.ie` domain — a genuine bot-mitigation gate, not a missing
   source; re-confirmed this cycle as still Cloudflare-managed-challenge-
   gated even against a real headless-browser session with a realistic
   desktop UA, worth retrying with a different Cloudflare-workaround
   technique in a future cycle. New Zealand's NZBN sole-trader/partnership
   registration was also reconfirmed this cycle as a RealMe-SSO-gated
   single-page application with no PDF/prose field-by-field fallback
   found. NZ's and Ireland's sole-trader/partnership candidates remain
   open.
2. **Corporate income tax**: IE corporation tax (Form CT1) still has no
   corporate-return schema (its individual return is covered) — re-examined
   fresh in GOV-1444 (2026-07-06): Revenue.ie's year-specific Tax and Duty
   Manuals (e.g. Part 38-02-01I for the 2024 CT1, and the base Part 38-02-01
   manual, both fetched and read directly this cycle) are still change-log/
   "what's new" prose over ROS panels, not a full field-by-field walkthrough,
   and the base manual confirms field-level help lives only inside the
   login-gated ROS online-filing system itself ("Help notes are available by
   using the 'form help' icon on the ROS form CT1") with no downloadable
   specimen/blank paper CT1 form found as an alternative. Re-confirmed a poor
   candidate; do not re-attempt without a genuinely new source (e.g. a leaked
   or third-party-republished blank CT1 form with real line numbers, which
   was not found this cycle). SG IRAS is
   modelled via `sg/iras/corporate-income-tax-return-form-cs` (GOV-1261,
   Form C-S — the simplified return for companies with revenue ≤S$5M). ZA
   SARS ITR14 is now modelled in full across all five company-type
   Annexures: Dormant Company pathway
   (`za/sars/corporate-income-tax-return-itr14-dormant`, GOV-1268), Micro
   Business pathway (`za/sars/corporate-income-tax-return-itr14-micro-business`,
   GOV-1275), Body Corporate/Share Block Company pathway
   (`za/sars/corporate-income-tax-return-itr14-body-corporate`, GOV-1282,
   guide pp.24-46, 138 fields), Small Business pathway
   (`za/sars/corporate-income-tax-return-itr14-small-business`, GOV-1378,
   guide pp.71-115, 283 fields), and Medium to Large Business pathway
   (`za/sars/corporate-income-tax-return-itr14-medium-large-business`,
   GOV-1387, guide pp.115-169, 417 fields) — the largest and last of the
   five, adding International, Foreign Exchange Gains/Losses, Foreign
   Dividends, Controlled Foreign Company, Double Taxation, STC Credits,
   Headquarter Company, Subsidiary Details, Corporate Rules, and
   Transfer-Pricing/thin-capitalisation disclosure sections expected at
   higher turnover, none of which have a counterpart in the four smaller
   Annexures. This closes the ZA SARS ITR14 corporate-tax gap entirely. IE
   Form CT1 was scouted in a prior cycle and set aside as a poor next
   candidate: IRAS'
   own guide documents Form C-S with numbered line items and a worked
   tax-computation example across 13 pages, while Revenue's own "what's
   new" TDM guide for CT1 is 22 pages of change-log prose with no equivalent
   full field-by-field walkthrough located yet, and the live form covers
   panels (Transfer Pricing, Group Relief, Section 299 Leases, R&D Credit,
   Film Tax) far more extensive than a single-session schema should attempt
   without a comparably strong source.
3. **New jurisdictions beyond the original set** — the standard is meant to be
   global from the start (see AGENTS.md charter). South Korea, the UAE,
   Brazil, Mexico, the Philippines, Indonesia, Colombia, and (this cycle)
   Chile have each been opened in recent cycles (GOV-1289, GOV-1297,
   GOV-1296, GOV-1393, GOV-1444, GOV-1546, GOV-1567, GOV-1624). **Colombia**
   (`co/runt/formulario-solicitud-tramites-vehiculo`, GOV-1567) opens as the
   registry's 19th jurisdiction with one vertical — DMV, RUNT's own vehicle
   procedure request form, directly downloadable and unauthenticated from
   `runt.gov.co` — see the Executive Summary update above for full detail.
   DIAN's RUT (Formulario 001, previously flagged here as a Business
   Formation candidate) was re-screened this cycle and remains weak (three
   unbounded repeating sub-sections); its own "pre-RUT personas naturales"
   guide (bounded, natural-person-only) is a stronger Business Formation
   candidate for a future cycle. Colombia's other five verticals (Passport,
   Business Formation, Visa, Taxes, National ID) are open, unscreened backlog
   candidates. **Update (GOV-1588):** Colombia now has 2 of its 6 verticals
   (Business Formation added via `co/rues/matricula-mercantil`, RUES's
   Registro Mercantil track — the DIAN RUT candidate flagged above was not
   needed once RUES's own core form was properly extracted); Passport, Visa,
   Taxes, and National ID remain open backlog candidates. **Update
   (GOV-1595):** Colombia now has 3 of its 6 verticals — Taxes added via
   `co/dian/declaracion-renta-personas-naturales-formulario-210` (DIAN
   Formulario 210, the annual individual income tax return for resident
   natural persons), sourced from DIAN's own published instructivo after
   Passport (Cancillería) and Visa (Cancillería e-visa) were screened this
   cycle and found weaker (see the document's own VERIFICATION.md for the
   full comparison). Passport, Visa, and National ID remain open backlog
   candidates. **Update (GOV-1602):** Colombia now has 4 of its 6 verticals —
   Visa added via `co/cancilleria/visa-application-individual`, sourced from
   the Cancillería's own "Guía de Usuario: Solicitar Visa en línea" (SITAC),
   a genuine field-by-field walkthrough of the live wizard the prior cycle's
   screening note had described only as bot-mitigation-gated (that live-wizard
   finding is reconfirmed, but this guide document is a distinct, previously
   unidentified source — see the Executive Summary update above and the
   document's own VERIFICATION.md). Colombia's Passport and National ID
   candidates were both re-screened this cycle and remain open: Passport
   (Cancillería's online form) is a change/renewal request requiring an
   in-person-issued "contraseña por primera vez," not a first-time
   application; National ID (Registraduría's "Cédula de ciudadanía digital"
   duplicate-request flow) is described in secondary sources as a short
   online form, but `registraduria.gov.co` itself returned HTTP 403 to every
   direct fetch attempted this cycle. **Update (GOV-1616): Colombia's
   National ID gap is now closed too** —
   `co/registraduria/duplicado-cedula-ciudadania`, sourced from a distinct,
   unblocked subdomain (`epagos.registraduria.gov.co`) the same online
   "Duplicado de Cédula en Línea" service actually runs on, rather than the
   403-gated main domain three prior cycles had each stopped at. Colombia
   now has all 6 of its verticals modelled, the first non-original
   jurisdiction in this registry to reach 6/6 — see the Executive Summary
   update above and the document's own VERIFICATION.md for the full
   sourcing record. **Indonesia** (`id/bkpm/oss-nib-registration-individual-umk`,
   GOV-1546) opened with one vertical — Business Formation, the individual/UMK
   NIB registration pathway through OSS RBA, sourced from BKPM's own official
   English-language user guide (a genuine 20-step screenshot walkthrough, no
   login/CAPTCHA/WAF gate); its other five verticals (Passport, DMV, Visa,
   Taxes, National ID) and its own Non-UMK/legal-entity NIB pathway were open,
   unscreened backlog candidates — see the document's own VERIFICATION.md.
   **Update:** Indonesia now has 3 of its 6 verticals (DMV added GOV-1553;
   Taxes added GOV-1560, `id/djp/annual-individual-income-tax-return-1770s`).
   **GOV-1567 re-screened Indonesia's remaining Passport and
   Visa gaps and reversed both from "not viable" to genuinely open, ready-to-author
   candidates:** Passport had a genuine official, versioned
   ("V3") screenshot-driven M-Paspor user guide hosted unauthenticated on a
   regional Ditjen Imigrasi subdomain (`batam.imigrasi.go.id`, unlike the
   main `imigrasi.go.id` domain, which remains CloudFront-blocked); Visa's
   previously-wireframe-only "Fill Form" Personal Information block had
   its real field labels corroborated by a third-party study-abroad office's
   own published walkthrough (a genuine live capture of `evisa.imigrasi.go.id`
   filled with a real worked example). **Update (GOV-1574):** Indonesia's
   Passport gap is now closed — `id/imigrasi/passport-application-first-adult`,
   authored directly against the M-Paspor guide GOV-1567 identified (adult,
   first-time applicant only; see the Passport vertical section above and the
   document's own VERIFICATION.md). **Update (GOV-1581):** Indonesia's Visa
   gap is now closed too — `id/imigrasi/evisa-visitor-visa-application`,
   combining the official manual's own wizard/payment structure with a
   second independent source (a US college study-abroad office's guide) for
   the "Fill Form" field labels the manual's own wireframe could not show
   — see the Visa vertical section above for the full record. Indonesia now
   has 5 of its 6 verticals; National ID (Dukcapil KTP-el/NIK) is its sole
   remaining open vertical (confirmed in-person/biometric-only, no online
   channel). Mexico
   now has four of its six verticals
   modelled: Business Formation (`mx/sat/preinscripcion-rfc-persona-moral`,
   GOV-1414), Visa (`mx/inm/forma-migratoria-multiple-electronica`,
   GOV-1393), Taxes (`mx/sat/declaracion-anual-sueldos-salarios`, GOV-1428),
   and DMV (`mx/semovi/alta-vehiculo-foraneo`, GOV-1435, PR #241 merged
   1f43204) — the last sourced from CDMX's own "Ventanilla de Control
   Vehicular" manual first identified as a strong open candidate by
   GOV-1428's research cycle, scoped to the foráneo (out-of-state)
   registration pathway the manual actually documents. Mexico's remaining
   Passport (SRE, in-person appointment only) and National ID (CURP,
   in-person biometric only) verticals were confirmed weak/gated in prior
   cycles; a brand-new-from-dealer vehicle registration pathway and driver
   licence issuance remain open DMV sub-process candidates. **The
   Philippines** (GOV-1444) opens with one vertical — Business Formation
   (`ph/bir/tin-application-corporations-partnerships`, sourced from BIR
   Form No. 1903, a genuine text-layer PDF with no login/CAPTCHA/WAF gate,
   the strongest single source examined this cycle); its other five
   verticals (Passport — DFA e-passport appointment system; DMV — LTO
   driver's licence/vehicle registration; Visa; Taxes — BIR's own 1701/1702
   income-tax-return forms; National ID — PhilSys/national ID, believed
   biometric-appointment-gated but not yet confirmed) are open, unscreened
   backlog candidates for a future cycle. Also considered and not picked
   this cycle: **Colombia**'s DIAN RUT (Formulario 001) — a genuine,
   current, official PDF, but weaker than BIR Form 1903 on this registry's
   own bar (its ~173 items lean heavily on external code tables not
   reproduced in the form, and it has substantially more unbounded
   repeating structures) — left as a viable backlog candidate for a future
   Colombia-opening cycle (Colombia was not yet in this registry at the
   time); see `ph/bir/tin-application-corporations-partnerships`'s own
   VERIFICATION.md for the full comparison. **Colombia has since opened**
   (GOV-1567, via RUNT's DMV form — see item 3's own Colombia entry above).
   **Colombia's National ID/voter-registration gap was screened this cycle**
   (GOV-1574): the Registraduría Nacional del Estado Civil runs a genuine
   online overseas-voter-registration microsite
   (`inscribeteonline2026.registraduria.gov.co`, confirmed via Wayback
   Machine snapshots from 2025-12 through 2026-03), but it no longer
   resolves (`NXDOMAIN`, reconfirmed 2026-07-07) — built for Colombia's 2026
   congressional/presidential elections, whose registration deadlines
   (2026-01-08 and 2026-03-31) have both already passed. Not a hard dead
   end, since it is election-cycle-scoped infrastructure rather than a
   permanently retired system — a future Colombia-focused cycle should check
   whether the same or an equivalent microsite is stood back up ahead of
   Colombia's next election cycle; it is also a client-rendered Vue SPA, so
   even a live instance would likely need a live-DOM/Playwright walk rather
   than a static fetch. **Chile has since opened as the registry's 20th
   jurisdiction (GOV-1624)**, via `cl/sii/inicio-actividades-personas-naturales`
   — SII's Formulario 4415-PN, Declaración de Inicio de Actividades para
   Personas Naturales — screened alongside Registro Civil's cédula/passport
   channels and the flagship "Tu Empresa en Un Día" company-formation portal,
   all found ClaveÚnica-login-gated with no PDF fallback; see the Executive
   Summary update above and the document's own VERIFICATION.md for the full
   candidate comparison (which also re-confirms Brazil's National ID gap as
   then a strong, ready-to-author candidate — since closed via GOV-1631, see
   the National ID vertical section above). Chile's DMV vertical has since
   opened via GOV-1638 (`cl/sii/aviso-venta-vehiculo`, see the Executive
   Summary update above); its remaining four verticals (Passport, Taxes,
   Visa, National ID) were then open, unscreened-or-lightly-screened backlog
   candidates for a future cycle — **Chile's Taxes vertical has since closed
   too (GOV-1744)**, via `cl/sii/formulario-22` (SII's Formulario 22,
   "Declaración de Renta"), scoped to the common salaried-employee/pensioner
   case reliquidating the Impuesto Único de Segunda Categoría; Chile's
   Passport, Visa, and National ID remain open backlog candidates — see the
   Executive Summary update above and the document's own VERIFICATION.md for
   the full sourcing record. **Spain has since opened as the
   registry's 21st jurisdiction (GOV-1645)**, via
   `es/aeat/declaracion-censal-personas-fisicas-modelo-030` — AEAT's
   Modelo 030 census/NIF-registration declaration, the same candidate
   GOV-1624 had screened but set aside only because its ~135 AcroForm
   widgets carry generic internal names (`dato.1`…`dato.135`); GOV-1645
   found the form's own printed reference numbers give a clean,
   independently-checkable coordinate-matching path and authored against
   it — see the Executive Summary update above and the document's own
   VERIFICATION.md for the full candidate comparison (which also
   re-screened and re-confirmed Chile's Passport/National ID/Visa gaps
   still gated/non-resolving, and screened Peru's Passport/National ID and
   Argentina's DNI/Passport channels, all found appointment-gated,
   reCAPTCHA-gated, or non-fillable). **Spain's DMV vertical has since
   opened too (GOV-1652)**, via `es/dgt/solicitud-tramites-vehiculo` —
   DGT's Modelo 01 multi-procedure vehicle-request form; that same cycle
   screened and rejected Spain's national visa application (duplicates
   Germany's own already-modelled EU-harmonized template,
   `de/auswaertiges-amt/national-visa-application`) and CIRCE's Documento
   Único Electrónico (a 25+-form-unifying authenticated portal, judged too
   broad for one session), and found Policía Nacional's DNI/passport
   channels appointment-only with no downloadable field-level form — see
   the Executive Summary update above and the document's own
   VERIFICATION.md for the full candidate comparison. **Spain's Business
   Formation gap has since closed too (GOV-1659)**, via
   `es/aeat/declaracion-censal-alta-actividad-economica-modelo-036` — AEAT's
   Modelo 036, scoped to the natural-person "declaración censal
   simplificada" alta pathway, sourced from AEAT's own official casilla-numbered
   practical guide after confirming Modelo 037 was suppressed (Orden
   HAC/1526/2024, effective 2025-02-03) and Modelo 036's own live filing
   channels are session-based web applications with no standalone
   downloadable form — see the Executive Summary update above and the
   document's own VERIFICATION.md for the full candidate comparison (which
   also re-screened and re-confirmed Chile's Formulario 22 Taxes candidate
   as weaker: a genuine PDF but with no AcroForm layer). Spain's remaining
   two verticals (Passport, Visa) are open backlog
   candidates for a future cycle; National ID's possible lead (the EX-15
   foreigner-identity-number form) noted here **has since closed
   (GOV-1735)** — not via EX-15 itself, but via its closer-fitting sibling
   EX-17 (Tarjeta de Identidad de Extranjero, TIE),
   `es/dgp/tarjeta-identidad-extranjero` — see the Executive Summary update
   above. **Poland has since
   opened as the registry's 22nd jurisdiction (GOV-1666)**, via
   `pl/mswia/wniosek-o-wydanie-dowodu-osobistego` — MSWiA's dowód osobisty
   (national identity card) application form, DO/W/1, sourced from a
   genuine, unauthenticated AcroForm PDF with self-documenting field names;
   see the Executive Summary update above and the document's own
   VERIFICATION.md for the full candidate comparison (which also
   re-screened and re-confirmed Spain's Passport/Visa and Chile's
   Passport/Visa/National ID gaps as still weaker this cycle). **Poland's
   Business Formation gap has since closed too (GOV-1671)**, via
   `pl/ceidg/wniosek-o-wpis-do-ceidg` — CEIDG-1, the sole-proprietorship
   registration form; that same cycle screened and set aside Poland's DMV
   vehicle-registration candidate (Rozporządzenie Ministra Infrastruktury,
   Dz.U. 2024 poz. 1709, Załącznik nr 1 — genuine and current, but only 7
   numbered fields versus CEIDG-1's 81) and Poland's KRS/S24 company
   -registration pathway (authenticated, session-based, no static form) —
   see the Executive Summary update above and the document's own
   VERIFICATION.md for the full candidate comparison. **Poland's DMV gap has
   since closed too (GOV-1678)**, via `pl/mi/wniosek-o-rejestracje-pojazdu`
   — the same regulation two prior cycles had set aside as thinner-sourced,
   revisited for a full, dedicated extraction (22 fields, 13 `documents[]`
   entries across all four request types) rather than a secondary screening
   note; see the Executive Summary update above and the document's own
   VERIFICATION.md for the full candidate history and disclosed judgment
   calls. This closes the **global DMV vertical to 22/22 (100%)**. **Poland's
   Passport gap has since closed too (GOV-1685)**, via
   `pl/mswia/wniosek-o-wydanie-paszportu` — sourced from Art. 33 of the
   ustawa o dokumentach paszportowych directly, since no downloadable
   application-form template is gazetted at all (the implementing
   rozporządzenie's own annexes are the passport booklet's physical design,
   not an application form); see the Executive Summary update above and the
   document's own VERIFICATION.md. **Poland's Taxes gap has since closed too
   (GOV-1691)**, via `pl/mf/zeznanie-pit-37` — PIT-37, the annual personal
   income tax return for employees/pensioners, a genuine unauthenticated PDF
   with no AcroForm layer but 171 self-documenting numbered positions; that
   same cycle screened Poland's national (Type D) visa candidate and
   confirmed it a duplicate of the already-modelled
   `de/auswaertiges-amt/national-visa-application` (same EU long-stay-visa
   field sequence, field-for-field) — see the Executive Summary update above
   and the document's own VERIFICATION.md for the full candidate comparison.
   This gives Poland 5 of its 6 verticals; only Visa remains open, now a
   confirmed-duplicate dead end pending a genuinely distinct Polish visa
   pathway (if one exists) for a future cycle to find.
   **Portugal has since opened as the registry's 24th jurisdiction (GOV-1750)**,
   via `pt/imt/requerimento-carta-de-conducao` — IMT's Mod. 1-IMT
   driving-licence Requerimento (DMV vertical); see the Executive Summary
   update above and the document's own VERIFICATION.md for the full
   six-vertical candidate comparison (which also confirms Portugal's national
   visa application, at `vistos.mne.gov.pt`, duplicates the already-modelled
   `de/auswaertiges-amt/national-visa-application` EU-harmonized template,
   field-for-field — the same pattern found for Poland's and Spain's
   equivalent forms). **Portugal's Visa/residence-status gap has since
   closed (GOV-1757)** via `pt/aima/requerimento-autorizacao-residencia`,
   and **its Taxes gap has since closed too (GOV-1765)** via
   `pt/at/declaracao-rendimentos-irs-modelo-3` — see the Executive Summary
   updates above and each document's own VERIFICATION.md. **Portugal's
   National ID gap has since closed too (GOV-1797)**, via
   `pt/mne/requerimento-cartao-cidadao-passaporte-consular` — the
   Consulado-Geral de Portugal em São Paulo's "Requerimento de Atos
   Presenciais — Cartão do Cidadão e/ou Passaporte," a genuine, currently-
   linked AcroForm PDF (45 unique-position widget fields) discovered by
   pursuing the consular-PDF lead GOV-1750 had flagged but not pursued; that
   same cycle re-screened Business Formation (IRN's "Empresa na Hora"/
   "Empresa Online" pacto-social specimens remain scanned images with no
   extractable text, and the sole-trader route remains `acesso.gov.pt`
   login-gated) and Passport (still no distinct domestic citizen-facing
   application PDF; Decreto-Lei n.º 83/2000 Art. 16 in-person/biometric-only
   issuance re-confirmed) and found both still dead ends — see the Executive
   Summary update above and the document's own VERIFICATION.md for the full
   three-vertical candidate comparison. Portugal now stands at **4 of its 6
   verticals** (DMV, Visa, Taxes, National ID); Business Formation and
   Passport remain open backlog candidates for a future cycle. **Malaysia
   has since opened as the registry's 25th
   jurisdiction (GOV-1774)**, via `my/jpj/driving-licence-application` — the
   Jabatan Pengangkutan Jalan's (JPJ) "Borang Permohonan Lesen Memandu"
   (JPJ-L1) driving-licence application (DMV vertical); see the Executive
   Summary update above and the document's own VERIFICATION.md for the full
   candidate comparison. That cycle also screened and rejected Switzerland's
   national D-visa and Schengen C-visa forms (both confirmed field-for-field
   duplicates of already-modelled EU/Schengen-harmonized templates — the
   same pattern as Poland's, Spain's, and Portugal's national visa forms)
   and Malaysia's own SSM Companies Act s.14 "Superform" business-
   incorporation PDF (zero AcroForm fields, too thin a specimen printout to
   model responsibly). **Malaysia's Passport gap has since closed
   (GOV-1783)** via `my/jim/passport-travel-document-application` — JIM's
   IM.42 passport/travel-document application form; see the Executive
   Summary update above and the document's own VERIFICATION.md. That cycle
   also screened and rejected Malaysia's Taxes vertical (LHDN's Borang
   BE/B/M/BT are all e-Filing-only specimens with empty AcroForms) and
   National ID vertical (JPN's MyKad service has no downloadable form at
   all, in-person-only) as confirmed dead ends. Malaysia stood at **2 of
   its 6 verticals** (DMV, Passport) at that point. **Malaysia's Visa gap
   has since closed too (GOV-1789)**, via
   `my/jim/visa-with-reference-application` — JIM's IM.12 visit-pass
   intake form for the Visa With Reference service; see the Executive
   Summary update above and the document's own VERIFICATION.md. **Malaysia's
   Business Formation gap has since closed too (GOV-1938)**, via
   `my/ssm/sole-proprietorship-partnership-registration` — Form A (Borang
   A), the First Schedule to the Registration of Businesses Rules 1957, a
   different statute and registry from the Companies Act 2016 "Superform"
   this same GOV-1774 cycle had rejected as too thin; see the Executive
   Summary update above and the document's own VERIFICATION.md for the full
   candidate comparison. Malaysia now stands at **4 of its 6 verticals**
   (DMV, Passport, Visa, Business Formation); Taxes and National ID remain
   confirmed dead ends. Other candidates worth scouting for a **26th**
   jurisdiction in a future cycle: an EU member beyond DE/EE/ES/FR/NL/PL/PT —
   Japan (`mofa.go.jp`) is a confirmed IP-blocked dead end (GOV-1174), and
   Switzerland's Visa vertical is now a confirmed EU/Schengen-harmonized
   duplicate dead end (GOV-1774) pending a genuinely distinct Swiss-specific
   pathway (e.g. a cantonal residence-permit process) for a future cycle to
   find. **The Czech Republic has since opened as the registry's 26th
   jurisdiction (GOV-1804)**, via
   `cz/mpo/jednotny-registracni-formular-fyzicka-osoba` — MPO's Jednotný
   registrační formulář (JRF) for a natural person (Business Formation
   vertical); see the Executive Summary update above and the document's own
   VERIFICATION.md for the full candidate comparison. That cycle also
   screened Austria's regional Gewerbeanmeldung forms and Sweden's
   Skatteverket/Transportstyrelsen forms as candidates but could not reach
   either host from the research environment (TCP-level connection
   timeout/reset on `tirol.gv.at` and `skatteverket.se`, distinct from a
   WAF/CAPTCHA block) — both remain untested, not confirmed dead, for a
   future cycle with different network access or a Wayback Machine
   workaround — and confirmed Switzerland's domestic passport process is
   cantonal/appointment-based with no downloadable application form.
   **The Czech Republic's DMV gap has
   since closed too (GOV-1804 follow-up)**, via
   `cz/md/zadost-o-zapis-silnicniho-vozidla` — see the Executive Summary
   update above. **Austria has since opened as the registry's 31st
   jurisdiction (GOV-2107)**, via
   `at/gewerbebehoerde/trade-licence-registration` — retried against federal
   hosts (`usp.gv.at`, `oesterreich.gv.at`, both reachable) rather than the
   regional `tirol.gv.at` host that had timed out; a second federal host,
   `bmaw.gv.at`, timed out identically, confirming the earlier symptom was a
   narrow host-specific network gap rather than a country-wide block. See
   the Executive Summary update above and the document's own
   VERIFICATION.md. **Austria's Taxes gap has since closed too (GOV-2114)**,
   via `at/bmf/employee-tax-assessment` — BMF's Form L 1 employee/pensioner
   tax assessment; that same cycle screened Austria's Kfz-Zulassung vehicle
   registration and confirmed it an in-person, counter-driven process with
   no downloadable form. Austria now stands at **2 of its 6 verticals**
   (Business Formation, Taxes); Passport, DMV, Visa, and National ID remain
   open, unscreened (DMV: screened and confirmed weak, see above) backlog
   candidates. See the Executive Summary update above and the document's
   own VERIFICATION.md. **Austria's National ID gap has since closed too**,
   via `at/bmi/national-identity-card-application` — the dedicated
   Personalausweis application form, sourced directly from
   `oesterreich.gv.at`'s own federal content host and confirmed
   SHA-256-byte-identical to BMEIA's central-library copy; that same cycle
   also screened Passport and Visa and found both genuinely viable, open
   (not dead-end) candidates for a future cycle — a bilingual
   German/English combined passport-or-identity-card consular form
   (42 AcroForm widgets) for Passport, and the EU-standard 37-field
   "Formular C1" Schengen visa application (no AcroForm layer, numbered
   fields) for Visa. Austria now stands at **3 of its 6 verticals**
   (Business Formation, Taxes, National ID); Passport and Visa remain open,
   screened-and-viable backlog candidates; DMV remains a confirmed weak/
   dead-end candidate. See the Executive Summary update above and the
   document's own VERIFICATION.md. **Austria's Passport gap has since
   closed too (GOV-2128)**, via `at/bmeia/passport-or-identity-card-application`
   — the bilingual German/English combined passport-or-identity-card
   consular form the GOV-2121 cycle had already screened and found viable,
   re-verified from scratch this cycle. Extracted 42 AcroForm widgets, all
   distinct field names (zero shared names anywhere, confirmed via
   `getFieldObjects()`), zero exclusions, zero merges — 42 widgets map 1:1
   onto 42 fields, modelled as independent optional booleans (with
   GSP-0013 `exclusivityGroups` disclosing real-world mutual exclusivity
   where the PDF itself does not enforce it) rather than forced into the
   radio-group shape the sibling `at/bmi` schema's true 2-option groups
   have. See the Executive Summary update above and the document's own
   VERIFICATION.md for the full sourcing record and every disclosed scope
   decision. Austria now stands at **4 of its 6 verticals** (Business
   Formation, Taxes, National ID, Passport); Visa remains an open,
   screened-and-viable backlog candidate; DMV remains a confirmed
   weak/dead-end candidate. **The Czech Republic's Visa gap has since closed too
   (GOV-1819)**, via `cz/mzv/zadost-o-udeleni-dlouhodobeho-viza` — the
   Ministry of Foreign Affairs' national long-stay (category D) visa
   application, confirmed genuinely distinct from the EU-harmonized template
   several other member states' equivalent forms duplicate; that same cycle
   screened Passport and National ID as confirmed dead ends (both processes
   are in-person-only with no citizen-facing application form) and flagged
   Taxes (`financnisprava.gov.cz`'s Form 25 5405 plus its own Pokyny guide)
   as a strong, larger-scope open candidate — see the Executive Summary
   update above and the document's own VERIFICATION.md. **The Czech
   Republic's Taxes gap has since closed too (GOV-1826)**, via
   `cz/mf/priznani-k-dani-z-prijmu-fyzickych-osob` — the base four-page
   return scoped to an employment/pension-income filer, excluding its four
   annexes (self-employment, rental/other, foreign-source, and
   separate-tax-base income); see the Executive Summary update above and the
   document's own VERIFICATION.md. **Update (2026-07-09, GOV-1977): the
   self-employment annex, Příloha č. 1, is now closed too**, via
   `cz/mf/priloha-1-vypocet-dilciho-zakladu-dane-samostatna-cinnost` (form 25
   5405/P1) — a companion schedule to the base return, the same pattern this
   registry has used for Canton Zürich's Hilfsblatt family; see the
   Executive Summary update above and the document's own VERIFICATION.md.
   The Czech Republic stands at **4 of its 6 verticals** (Business
   Formation, DMV, Visa, Taxes); Passport and National ID are confirmed dead
   ends, and Příloha č. 2-4 (rental/other, foreign-source, and
   separate-tax-base income) remain open backlog candidates for a future
   cycle. **Update (2026-07-09, GOV-1984): the rental/other-income annex,
   Příloha č. 2, is now closed too**, via
   `cz/mf/priloha-2-vypocet-dilciho-zakladu-dane-najem-ostatni-prijmy` (form
   25 5405/P2) — a companion schedule to the base return, sourced the same
   way as Příloha č. 1; see the Executive Summary update above and the
   document's own VERIFICATION.md (which also discloses a deliberate
   difference from Příloha č. 1's own ř. 104 treatment: this annex's
   structurally similar ř. 203 line is pure arithmetic, not an
   independently-entered accounting result). The Czech Republic remains at
   **4 of its 6 verticals**; Příloha č. 3-4 (foreign-source income,
   separate tax base) are now the sole remaining open backlog candidates in
   this companion-schedule sequence. **Update (2026-07-09, GOV-1991): the
   foreign-source-income annex, Příloha č. 3, is now closed too**, via
   `cz/mf/priloha-3-vypocet-dane-z-prijmu-ze-zdroju-v-zahranici` (form
   25 5405/P3) — a companion schedule to the base return, sourced the same
   way as Přílohy č. 1-2; see the Executive Summary update above and the
   document's own VERIFICATION.md (which also discloses a structural finding
   distinct from the prior two annexes: several of this annex's own printed
   formulas reference base-return lines the base return's own schema never
   models, and are modelled as their own fields rather than assumed to be
   excludable pure arithmetic). The Czech Republic remains at **4 of its 6
   verticals**; Příloha č. 4 (separate tax base, §16a zákona) is now the
   sole remaining open backlog candidate in this companion-schedule
   sequence. **Update (2026-07-09, GOV-1998): the separate-tax-base annex,
   Příloha č. 4, is now closed too**, via
   `cz/mf/priloha-4-vypocet-dane-ze-samostatneho-zakladu-dane` (form
   25 5405/P4) — a companion schedule to the base return, sourced the same
   way as Přílohy č. 1-3; see the Executive Summary update above and the
   document's own VERIFICATION.md (which discloses two scope decisions: one
   line modelled as its own field despite a printed sum formula, because of
   a further named statutory reduction this registry has no field for, and
   another modelled as its own field because it is a taxpayer-selected
   subset rather than a printed aggregate). This closes the base return's
   own companion-schedule backlog (Přílohy č. 1-4) entirely. The Czech
   Republic remains at **4 of its 6 verticals** (Business Formation, DMV,
   Visa, Taxes); Passport and National ID remain confirmed dead ends, with
   no further open backlog candidate in this companion-schedule sequence.
   **Update (2026-07-10, GOV-2169, "GovSchema Standard Research"): Argentina
   opens as the registry's 32nd jurisdiction**, via
   `ar/afip/inscripcion-cuit-personas-juridicas` — AFIP's Formulario 460/J
   ("Solicitud de Inscripción / Modificación de Datos — Personas Jurídicas"),
   a genuine 4-page fillable-AcroForm PDF fetched unauthenticated and
   without any login/CAPTCHA/WAF gate directly from
   `serviciosweb.afip.gob.ar`, re-verified from scratch this cycle rather
   than trusting a prior scouting pass's numbers. 351 raw AcroForm widgets
   resolve to 177 distinct field names via `getFieldObjects()`; the
   specimen turned out to carry a mirrored Original (pages 1-2) + Acuse de
   Recibo/Duplicado (pages 3-4) structure that accounts for the gap between
   raw widgets and distinct fields, plus 5 split-digit/split-component box
   groups (an 11-digit CUIT split across 11 single-digit boxes among them)
   merged per this registry's usual split-box convention — 156 final
   fields. See the Executive Summary update above and the document's own
   VERIFICATION.md for the full sourcing/reconciliation record, including a
   disclosed technique for recovering the 28-code "Forma Jurídica" legal-
   form grid's column headers from rotated/vertical PDF text (2 of the 28
   columns have a genuinely blank header in the source, disclosed rather
   than fabricated), and the mock conformance test run. Argentina opens
   with 1 of its 6 verticals (Business Formation); two further candidates
   are already identified for a future cycle: AFIP's sibling Formulario
   460/F (the individual/persona física analogue of this document, ~148
   widgets, not yet fetched or verified) and Cancillería's Formulario de
   Solicitud de Visado (FSV, ~50 widgets, not yet fetched or verified) for
   Argentina's Visa vertical. Argentina's remaining verticals (Passport,
   DMV, Taxes, Visa, National ID) are open, unscreened backlog candidates.
   **Update (2026-07-10, GOV-2179): the FSV candidate named above is now
   resolved** — published as `ar/cancilleria/formulario-solicitud-visado`,
   opening Argentina's Visa vertical (2/6). Two independent specimens
   (2024 edition and a 2026 consulate mirror) were fetched fresh and diffed
   field-by-field, confirming the form is stable; `pdfjs-dist` resolved
   exactly 50 distinct fields from 50 widgets, a clean 1:1 ratio requiring
   no split-box or duplicate-copy reconciliation. See the Executive Summary
   update above and the Visa vertical section below for the full record.
   AFIP's Formulario 460/F remains the sole open Argentina follow-on
   candidate (**this claim of a "flat/printed 0-widget form ... requiring
   box-by-box visual extraction" was corrected in GOV-2195, see below — it
   does not hold up against a fresh re-fetch and re-extraction**);
   Argentina's remaining verticals (Passport, DMV, Taxes, National ID)
   are still open, unscreened backlog candidates.
   **Update (2026-07-10, GOV-2187): Argentina's DMV vertical is now
   resolved** — published as `ar/dnrpa/solicitud-tipo-08-transferencia-automotor`
   (DNRPA Solicitud Tipo 08, automóvil variant), opening Argentina's DMV
   vertical (3/6). Unlike every other AR specimen so far, this one carries
   0 AcroForm fields, 0 widgets, and 0 extractable text — a genuinely flat
   scanned image, requiring full visual rasterization rather than any
   widget-based extraction. See the Executive Summary update above and the
   DMV vertical section below for the full record. The sibling
   motovehículo variant (`08M.pdf`, explicitly deferred this cycle) and
   AFIP's Formulario 460/F remain the two open Argentina follow-on
   candidates; Argentina's remaining verticals (Passport, Taxes, National
   ID) are still open, unscreened or dead-end backlog candidates (Passport
   and National ID both route through RENAPER, confirmed in-person/
   appointment-only with no downloadable field-level form).
   **Update (2026-07-10, GOV-2195): the F.460/F candidate named above is
   now resolved** — published as `ar/afip/inscripcion-cuit-personas-fisicas`,
   deepening Argentina's Business Formation vertical (remains 3/6 —
   deepens rather than widens). A fresh re-fetch and independent
   `pdfjs-dist` re-extraction found this specimen is a genuine, fully
   interactive fillable AcroForm — **not** the flat/0-widget form the
   GOV-2179 update above had claimed — with 148 raw widgets across 2 pages
   resolving to 139 real distinct fields (130 single-widget fields plus 9
   genuine PDF radio-button groups), no Original/Duplicado mirroring, and
   no split-digit-box fields at all. See the Executive Summary update
   above and the Business Formation vertical section below for the full
   corrected record. Argentina's remaining verticals (Passport, Taxes,
   National ID) are still open, unscreened or dead-end backlog candidates.
   **Update (2026-07-10, GOV-2204): the motovehículo candidate named above
   is now resolved** — published as
   `ar/dnrpa/solicitud-tipo-08-transferencia-motovehiculo`, deepening
   Argentina's DMV vertical (remains 3/6 — deepens rather than widens).
   Independently re-fetched and re-extracted rather than assumed to match
   its automóvil sibling: also a genuinely flat/scanned specimen (0
   AcroForm fields, 0 widgets, 0 extractable text on both pages), and
   field-by-field identical to the automóvil schema in 81 of 83 fields —
   the sole substantive difference is sección "F", which asks for the
   vehicle's "MARCA DE CUADRO"/"N° DE CUADRO" (frame make/number,
   modelled as `frameMake`/`frameNumber`) rather than the automóvil form's
   "MARCA DE CHASIS"/"N° DE CHASIS" (chassis). See the Executive Summary
   update above and the DMV vertical section below for the full
   comparison record. AFIP's Formulario 460/F is fully resolved (GOV-2195)
   and Argentina's Taxes vertical (AFIP Ganancias/Bienes Personales) was
   screened this cycle (GOV-2202) and confirmed a dead end — no blank form
   exists for either, both being output-only artifacts of an authenticated
   web declaration. Argentina's remaining verticals (Passport, Taxes,
   National ID) are confirmed dead ends or open, unscreened backlog with
   no currently known candidate.
4. **India ITR-3's deferred shared schedules**: a future version of
   `in/incometax/individual-tax-return-itr3` could re-derive Schedule S
   (salary), House Property, Schedule CG (capital gains), OS (other
   sources), and the itemised Chapter VI-A deductions against ITR-3's own
   workbook citations, for filers who have both business/professional income
   and salary/house-property/capital-gains/other-source income. Deferred in
   GOV-1254 as a documented scope decision (these schedules are structurally
   identical to `in/incometax/individual-tax-return-itr2`'s already-published
   ones), not a sourcing dead end.
5. **CH Taxes — now published** (`ch/zh/sta/steuererklaerung-natuerliche-personen`,
   GOV-1847, 2026-07-08): the candidate GOV-1840 flagged above was pursued to
   a full schema this cycle. See the Executive Summary update and the Taxes
   vertical section below for the sourcing summary; the document's own
   VERIFICATION.md has the full record. Canton Zürich's own companion
   schedules (Wertschriftenverzeichnis, Berufsauslagen, Versicherungsprämien,
   Aus- und Weiterbildung, Liegenschaftenverzeichnis, Schuldenverzeichnis,
   Hilfsblatt A/B/G) remain open backlog candidates for a future cycle.
   **The Wertschriftenverzeichnis gap has since closed too (GOV-1854,
   2026-07-08)**, via `ch/zh/sta/wertschriften-und-guthabenverzeichnis` — see
   the Executive Summary update above and the document's own
   VERIFICATION.md. **The Berufsauslagen gap has since closed too (GOV-1868,
   2026-07-08)**, via `ch/zh/sta/berufsauslagen` — see the Executive Summary
   update above and the document's own VERIFICATION.md. **The
   Versicherungsprämien gap has since closed too (GOV-1875, 2026-07-09)**,
   via `ch/zh/sta/versicherungspraemien` — see the Executive Summary update
   above and the document's own VERIFICATION.md. **The Aus- und
   Weiterbildung gap has since closed too (GOV-1882, 2026-07-09)**, via
   `ch/zh/sta/aus-und-weiterbildungskosten` — see the Executive Summary
   update above and the document's own VERIFICATION.md. **The
   Liegenschaftenverzeichnis gap has since closed too (GOV-1889,
   2026-07-09)**, via `ch/zh/sta/liegenschaftenverzeichnis` — see the
   Executive Summary update above and the document's own VERIFICATION.md.
   **The Schuldenverzeichnis gap has since closed too (GOV-1896,
   2026-07-09)**, via `ch/zh/sta/schuldenverzeichnis` — see the Executive
   Summary update above and the document's own VERIFICATION.md. **The
   Hilfsblatt A gap (simplified-bookkeeping variant only) has since closed
   too (GOV-1903, 2026-07-09)**, via
   `ch/zh/sta/hilfsblatt-a-vereinfachte-buchfuehrung` (Form 328) — see the
   Executive Summary update above and the document's own VERIFICATION.md.
   **The Hilfsblatt A gap's remaining commercial-bookkeeping variant has
   since closed too (GOV-1910, 2026-07-09)**, via
   `ch/zh/sta/hilfsblatt-a-kaufmaennische-buchfuehrung` (Form 329) — see the
   Executive Summary update above and the document's own VERIFICATION.md.
   **The Hilfsblatt G gap has since closed too (GOV-1917, 2026-07-09)**, via
   `ch/zh/sta/hilfsblatt-g` (Form 331) — see the Executive Summary update
   above and the document's own VERIFICATION.md. **The last remaining
   companion-schedule gap, Hilfsblatt B, has since closed too (GOV-1924,
   2026-07-09)**, via `ch/zh/sta/hilfsblatt-b` (Form 330) — confirmed to be a
   single 4-page PDF whose own two bookkeeping/records computation paths
   fork within that one document (not two separate form numbers), modelled
   via a `berichtsart` discriminator field — see the Executive Summary update
   above and the document's own VERIFICATION.md. This closes the CH-ZH
   companion-schedule backlog entirely; Switzerland's other 25 cantons each
   likely publish their own equivalent tax-return form, also unpursued.
   **CH Passport — now published** (`ch/fedpol/antrag-pass-identitaetskarte`,
   GOV-1931, 2026-07-09): fedpol's federal `ch-edoc-passantrag.admin.ch`
   online application tool was rendered directly this cycle with a real
   headless-browser session, superseding the earlier "no downloadable
   citizen-facing PDF exists" finding (GOV-1840/GOV-1804/GOV-1774, true but
   incomplete — it never rendered the live JS single-page application). The
   tool issues a passport, an identity card, or both ("Combi") through one
   shared field set, so this same schema also closes **CH National ID** in
   the same PR — see the Executive Summary update and the Passport/National
   ID vertical sections above for the full sourcing story, including the
   disclosed distinction between the Domicile/Applicant-contact steps
   (directly DOM-verified) and the deeper personal-data steps (sourced from
   the application's own live-fetched i18n resource, gated behind a
   one-time e-mailed verification link this cycle could not obtain). This
   gives Switzerland 4 of its 6 verticals (DMV, Taxes, Passport, National
   ID); Business Formation (`easygov.swiss`, CH-Login-gated, GOV-1840) is
   Switzerland's sole remaining genuinely open vertical (Visa is a confirmed
   duplicate, not an open gap).
6. **Japan's Business Formation and National ID verticals** (GOV-2005,
    2026-07-09): both screened and found to have genuine, live,
    unauthenticated candidates, but not pursued this cycle in favor of the
    Visa/Certificate-of-Eligibility candidate (see the Executive Summary
    update above). Business Formation:
    `https://houmukyoku.moj.go.jp/homu/content/001331002.pdf` (株式会社設立
    登記申請書 — Stock Company Establishment Registration Application, Legal
    Affairs Bureau, no AcroForm but a rich extractable text layer). National
    ID: `https://www.kojinbango-card.go.jp/hpsv/wpmng/documents/tegaki-kofu-shinseisho-en.pdf`
    (an official bilingual generic My Number Card application, confirming
    the usual "pre-printed QR code, no blank form" dead-end pattern does
    *not* apply to Japan). Both remain open, well-sourced candidates for a
    future cycle. Japan's DMV vertical (driver's licence) and Passport
    vertical are confirmed dead ends instead — see below. **Update
    (2026-07-09, GOV-2012): Japan's National ID gap is now closed**, via
    `jp/j-lis/individual-number-card-issuing-application` — see the
    Executive Summary update above and the document's own VERIFICATION.md.
    Japan now stands at **2 of its 6 verticals** (Visa, National ID);
    Business Formation (the Legal Affairs Bureau candidate above) is
    Japan's sole remaining open backlog candidate. **Update (2026-07-09,
    GOV-2019): Japan's Business Formation gap is now closed**, via
    `jp/houmukyoku/stock-company-establishment-registration-application` —
    see the Executive Summary update above and the document's own
    VERIFICATION.md. Japan now stands at **3 of its 6 verticals** (Visa,
    National ID, Business Formation); DMV and Passport are confirmed dead
    ends, and this registry has no further open Japan vertical candidate at
    this time — future cycles should consider the sibling incorporation
    variants and the Seal Registration Notification flagged in that
    document's own VERIFICATION.md as companion-schedule candidates instead.
    **Update (2026-07-09, GOV-2026): a second Business Formation company type
    is now published**, via
    `jp/houmukyoku/limited-liability-company-establishment-registration-application`
    — the Godo Kaisha (合同会社, "Limited Liability Company") Establishment
    Registration Application, found on the same `houmukyoku.moj.go.jp` index
    page and not one of the previously-flagged sibling variants/Seal
    Registration Notification (both of those remain open, unpursued
    candidates — see the document's own VERIFICATION.md). Japan's vertical
    count remains 3 of 6 (Visa, National ID, Business Formation); this
    deepens rather than widens its coverage. **Update (2026-07-09, GOV-2035):
    the Seal Registration Notification is now published too**, via
    `jp/houmukyoku/seal-registration-notification` — a companion/supporting-
    filing schema (共通の印鑑届書, used across every entity type the Bureau
    registers, both alongside a new entity's own establishment registration
    and, later, whenever a representative's seal changes), not a new
    company-type application or a new vertical; see the Executive Summary
    update above and the document's own VERIFICATION.md. Its own
    corporate-representative-member (職務執行者) filing scenario was
    deliberately scoped out and remains an open companion-schedule candidate,
    alongside the three sibling Kabushiki Kaisha incorporation variants,
    which remain this registry's sole open Japan companion-schedule
    candidates at this time. **Update (2026-07-09, GOV-2042): Japan's Taxes
    vertical is now closed**, via `jp/nta/individual-income-tax-final-return`
    — the National Tax Agency's Income Tax and Special Income Tax for
    Reconstruction Return, the candidate this same item's own GOV-2005 entry
    had flagged as "unscreened" and no subsequent Japan cycle had pursued;
    see the Executive Summary update above and the document's own
    VERIFICATION.md for the full sourcing record, including a position-based
    re-extraction reconciling a real edition-to-edition line-numbering shift.
    Japan now stands at **4 of its 6 verticals** (Visa, National ID, Business
    Formation, Taxes); DMV and Passport remain confirmed dead ends. The
    three sibling Kabushiki Kaisha incorporation variants, the Seal
    Registration Notification's corporate-representative-member scenario,
    and this new document's own excluded income types/tax-computation
    chain/第二表 per-dependent itemization remain this registry's open
    Japan companion-schedule candidates for a future cycle. **Update
    (2026-07-10, GOV-2049): one of the three sibling Kabushiki Kaisha
    incorporation variants is now published**, via
    `jp/houmukyoku/stock-company-establishment-registration-application-board-of-directors`
    — the board-installed, incorporation-by-promoters variant, picked over
    the other two (board installed + public subscription; no board + public
    subscription) because the board-of-directors axis genuinely changes
    fields the application form itself surfaces (a board-elected
    representative director; a Companies Act art. 327(2)-mandated auditor),
    unlike the public-subscription axis, which does not; see the Executive
    Summary update above and the document's own VERIFICATION.md for the full
    sourcing record and line-by-line diff against the already-published
    no-board sibling. Japan's vertical count remains 4 of 6 (Visa, National
    ID, Business Formation, Taxes) — this deepens rather than widens
    coverage. The two remaining sibling incorporation variants (board
    installed + public subscription; no board + public subscription), the
    Seal Registration Notification's corporate-representative-member
    scenario, and the Taxes document's own excluded income types/
    tax-computation chain/第二表 per-dependent itemization remain this
    registry's open Japan companion-schedule candidates for a future cycle.
    **Update (2026-07-10, GOV-2152): a second of the two remaining sibling
    incorporation variants is now published**, via
    `jp/houmukyoku/stock-company-establishment-registration-application-board-of-directors-public-subscription`
    — the board-installed, public-subscription variant, isolating that axis
    against the same board-installed baseline GOV-2049 established (rather
    than changing two axes from the no-board/promoter-only baseline at
    once); see the Executive Summary update above and the document's own
    VERIFICATION.md for the full sourcing record, including a disclosed
    text-positioning artifact on the blank template's own attachment-list
    row. Japan's vertical count remains 4 of 6 (Visa, National ID, Business
    Formation, Taxes) — this again deepens rather than widens coverage. Only
    one sibling incorporation variant now remains open (no board of
    directors + public subscription, row 1-4 of the same
    `houmukyoku.moj.go.jp` index page), alongside the Seal Registration
    Notification's corporate-representative-member scenario and the Taxes
    document's own excluded income types/tax-computation chain/第二表
    per-dependent itemization — this registry's remaining open Japan
    companion-schedule candidates for a future cycle. **Update (2026-07-10,
    "GovSchema Standard Research"): the fourth and last sibling incorporation
    variant is now published**, via
    `jp/houmukyoku/stock-company-establishment-registration-application-public-subscription`
    — the no-board, public-subscription variant, isolating the same
    public-subscription axis GOV-2152 identified, but applied against the
    no-board/promoter-only baseline (GOV-2019) instead of the board-installed
    one; see the Executive Summary update above and the document's own
    VERIFICATION.md for the full sourcing record, including a disclosed
    genuine cross-document wording variation and a disclosed out-of-scope
    branch-office registered-matter line. Japan's vertical count remains 4 of
    6 (Visa, National ID, Business Formation, Taxes) — this again deepens
    rather than widens coverage. **All four Legal Affairs Bureau
    stock-company-incorporation variants on this index page are now
    published; no sibling incorporation variant remains open.** The Seal
    Registration Notification's corporate-representative-member scenario and
    the Taxes document's own excluded income types/tax-computation
    chain/第二表 per-dependent itemization remain this registry's only open
    Japan companion-schedule candidates for a future cycle.
4. **Denmark's remaining verticals** (opened GOV-2244 via its Passport
   vertical, `dk/um/application-for-danish-passport`): the parent GOV-2242
   scouting cycle flagged genuine, fresh, unauthenticated AcroForm-PDF
   candidates for **DMV** and **Taxes** as strong enough to author in a
   future cycle. **Update (2026-07-11, GOV-2253): Taxes is now closed**,
   via `dk/skattestyrelsen/oplysningsskemaet` (Skattestyrelsen form 04.003,
   scoped to the employee/pensioner filer, pages 1-2 of 4) — see the
   Executive Summary update above and the document's own VERIFICATION.md.
   **DMV was screened this same cycle and set aside as a poor candidate**:
   Færdselsstyrelsen's P23 driving-licence application is a genuine,
   current AcroForm but a shared 397-field multi-party record card filled
   progressively by driving schools/police/kommune over the licence's
   lifetime, not a citizen-facing intake form; Motorstyrelsen's
   vehicle-registration/re-registration flow is exclusively
   MitID/TastSelv-login-gated with no static-form fallback; two further
   downloadable Motorstyrelsen forms (21.063, 21.115) are current but carry
   zero AcroForm fields. A future cycle should look for a different DMV
   candidate (e.g. a dedicated new-vehicle-registration or learner's-permit
   form) rather than re-attempting P23 or the login-gated re-registration
   flow. **Update (2026-07-11, GOV-2260): National ID & Civic Documents is
   now closed too**, via `dk/cpr/notification-of-entry` (KL's form FR 050,
   "Anmeldelse af indrejse") — see the Executive Summary update above and
   the document's own VERIFICATION.md. This same cycle also screened
   **Business Formation** and **Visa** and set both aside as weaker
   candidates rather than picking them: Business Formation's only genuine
   unauthenticated candidate is `virk.dk` form 40.110
   ("Virksomhedsregistrering"), Erhvervsstyrelsen's own explicit paper
   fallback for applicants without MitID — real, current, and a genuine
   AcroForm, but scoped narrowly to foreign businesses/owners without a
   Danish CVR number, entirely in Danish, with no official English guide
   found (the mainstream ApS/A/S/enkeltmandsvirksomhed formation path
   remains confirmed MitID/NemID-login-gated with no static fallback).
   Visa's pure Schengen short-stay route (`applyvisa.um.dk`) is confirmed
   (not just assumed, per a prior cycle's speculation) to be a JS-rendered
   SPA whose underlying paper template is the same pan-Schengen Annex I
   form already duplicated against `fr/france-visas/schengen-visa-application`
   and several other Schengen jurisdictions in this registry — authoring it
   would be a confirmed duplicate, not a genuine gap; SIRI's own
   `nyidanmark.dk` work-permit form (AR8) is genuinely Denmark-specific and
   unauthenticated, but is a fill-by-hand PDF with no AcroForm widget layer
   (matching this registry's existing precedent for accepting such
   fill-by-hand specimens, e.g. AT's Schengen form), and remains a viable
   open candidate for a future cycle alongside SIRI's several other
   downloadable forms (VS2, KO1/EU, OD1B, MF4, TBT). **Denmark now stands
   at 3 of 6 verticals** (Passport, Taxes, National ID); DMV, Business
   Formation, and Visa remain open backlog candidates. Denmark's own page
   3-4 self-employment/sole-proprietorship tax sections
   (Virksomhedsbeløb/Virksomhedsordning/Kapitalafkastordning) are a further
   open companion-schedule candidate — see the Taxes vertical section
   above. **Update (2026-07-11, GOV-2268): Business Formation is now
   closed**, via `dk/erst/virksomhedsregistrering` (Erhvervsstyrelsen form
   40.110, "Virksomhedsregistrering") — see the Executive Summary update
   above and the document's own VERIFICATION.md. Contrary to this entry's
   own prior characterization above, an official English-language
   cross-check translation of this form does in fact exist (form 40.112,
   linked from the same virk.dk guidance page) and was used this cycle to
   disambiguate several field labels; the earlier "no official English
   guide found" note is corrected here rather than silently left standing.
   **Denmark now stands at 4 of 6 verticals** (Passport, Taxes, National
   ID, Business Formation); DMV and Visa remain open backlog candidates.
   **Update (2026-07-11, GOV-2285): Visa is now closed**, via
   `dk/siri/work-permit-application` (SIRI form AR8, "Application for a
   work permit or for an extension of a work permit in Denmark," scoped to
   sideline employment/accompanying family/extensions — SIRI's own
   first-time primary route, AR1/AR6, was re-screened this cycle and
   reconfirmed to be exclusively a MitID-authenticated online wizard with
   no unauthenticated static specimen) — see the Executive Summary update
   above and the document's own VERIFICATION.md. **Denmark now stands at 5
   of 6 verticals** (Passport, Taxes, National ID, Business Formation,
   Visa); **DMV is Denmark's only remaining open vertical**, already
   screened and set aside above (Færdselsstyrelsen's P23 is a shared
   multi-party record card, not a citizen-facing intake form;
   Motorstyrelsen's re-registration flow is exclusively login-gated) — a
   future cycle should look for a different DMV candidate (e.g. a dedicated
   new-vehicle-registration or learner's-permit form) rather than
   re-attempting either. **Update (2026-07-11, GOV-2346): DMV is now closed
   too**, via `dk/fstyr/samtykkeerklaering-koerekort-under-18` (form P23T,
   "Samtykkeerklæring ved ansøgning om kørekort — Under 18 år," the
   parent/legal-guardian consent declaration required whenever a
   driving-licence applicant is a minor) — a distinct, narrowly scoped
   companion form P23's own under-18 branch references, found rather than
   re-attempting either previously-rejected candidate as this entry's own
   prior note advised. See the Executive Summary update above and the
   document's own VERIFICATION.md. **Denmark now stands at 6 of 6
   verticals** — no verticals remain open for this jurisdiction. **Update
   (2026-07-11, GOV-2355): DMV gains a second, additional schema** — a
   pre-scouted candidate independently confirmed the same cycle (before
   GOV-2346 merged), `dk/motorstyrelsen/tilladelse-til-koersel-med-
   udenlandsk-registreret-koeretoej` (Motorstyrelsen form 21.059,
   "Ansøgning om tilladelse til kørsel i Danmark med udenlandsk registreret
   køretøj," the foreign-registered-vehicle driving permit) is authored as
   additional real-world DMV coverage rather than a second vertical-closing
   attempt, since it is a genuinely distinct process from P23T with no
   overlap with any previously-screened/rejected DMV candidate — see the
   Executive Summary update above and the document's own VERIFICATION.md.
   Denmark's vertical count is unchanged at 6 of 6.
7. **Finland's remaining verticals** (opened GOV-2276 via its Visa vertical,
   `fi/migri/residence-permit-employed-person`): the parent scouting cycle
   (three parallel scouts across Norway, Finland, Belgium) found Finland's
   other three unmodelled verticals each backed by a genuine, live,
   unauthenticated fillable AcroForm PDF, confirmed via direct fetch —
   strong candidates for a future cycle. **Business Formation has since
   closed (GOV-2292)**, via `fi/prh/start-up-notification-y1` — the
   pre-scout's own 110-widget count was independently re-derived exactly
   (102 substantive after excluding 8 navigation/utility controls); see the
   Executive Summary update above and the document's own VERIFICATION.md.
   **National ID & Civic Documents has since closed too (GOV-2299)**, via
   `fi/dvv/registration-of-foreigner` — DVV's "Ulkomaalaisen rekisteröinti"
   (foreign national's registration into the Population Information
   System, i.e. henkilötunnus/personal identity code request), `dvv.fi`.
   This cycle's own from-scratch `pdfjs-dist` extraction confirmed the
   pre-scout's 43 Widget/34 FT field count exactly (the domestic Finnish
   eID/identity-card itself, via `poliisi.fi`, was re-confirmed
   online/in-person-only with no downloadable form, so this DVV
   registration form remains the strongest available National ID
   candidate for this jurisdiction) — see the Executive Summary update
   above and the document's own VERIFICATION.md. **Taxes has since closed
   too (GOV-2308)**, via `fi/vero/50a-earned-income-and-deductions` —
   Vero's form 3023e, "50A – Earned income and deductions" (an
   earned-income/deductions correction-and-supplement form to a
   taxpayer's pre-completed return), `vero.fi`. This cycle's own
   `pdfjs-dist` extraction (reproduced twice) found 135 Widget/126 FT
   fields across 4 pages, matching this pre-scout's own figure exactly,
   no login required for the PDF itself (the pre-filled return proper is
   generated per-taxpayer and typically e-filed via MyTax, but this
   correction form is a genuine citizen-facing paper alternative) — see
   the Executive Summary update above and the document's own
   VERIFICATION.md. **DMV has since closed too (GOV-2356)**, via
   `fi/traficom/luovutuskirja-ajoneuvon-omistusoikeuden-siirrosta` —
   Traficom's form B124, "Luovutuskirja ajoneuvon/vesikulkuneuvon
   omistusoikeuden siirrosta" (Deed of transfer of ownership for a
   vehicle/watercraft), a private-party bill-of-sale/title-transfer deed
   found after Traficom's core driving-licence/vehicle-registration flows
   were reconfirmed Suomi.fi-login-gated or in-person-only (via Ajovarma),
   with only two narrow companion forms downloadable — F122 (a doctor's
   statement on driving fitness, not applicant-facing) and B527 (a
   paperless-vehicle registration notice, narrow-scope) — neither
   reattempted. This cycle's own `pdfjs-dist` extraction confirmed 25
   `/Widget` annotations (23 `Tx` + 1 `Btn` radio parent) across 24
   distinct field names on page 1, matching the pre-scout's own count
   exactly; see the Executive Summary update above and the document's own
   VERIFICATION.md. **Finland now stands at 5 of 6 verticals** (Visa,
   Business Formation, National ID, Taxes, DMV). **Passport**'s main adult
   flow is a confirmed dead end: Finland eliminated paper passport
   applications in 2006 — `poliisi.fi` offers only online
   (`asiointi.poliisi.fi`) or in-person appointment channels, with a digital
   photo pre-uploaded separately (`lupakuvienvastaanotto.fi`); no PDF/paper
   *application* form exists. **Update (2026-07-11, GOV-2397): Passport has
   since closed anyway**, via a standalone guardian-consent companion form,
   `fi/poliisi/huoltajan-suostumus` (Poliisi-Muut-07) — see the Executive
   Summary update above and the document's own VERIFICATION.md. **Finland
   now stands at 6 of 6 verticals — this item is fully closed.**
8. **Norway's remaining verticals** (opened GOV-2316 via its Business
   Formation vertical, `no/brreg/samordnet-registermelding`): three of
   Norway's other five verticals were genuine, unscreened-in-depth backlog
   candidates as of that cycle's own scouting pass (byte counts and widget
   counts below are approximate, from a quick scout, not a full independent
   extraction). **Update (2026-07-11, GOV-2323): National ID is now
   closed**, via `no/skatteetaten/notification-of-move-within-norway` — see
   the Executive Summary update above and the document's own
   VERIFICATION.md (which also independently re-extracted the widget count
   at 61, close to but not identical to this entry's own ~63 approximate
   figure). **Update (2026-07-11, GOV-2330): DMV is now closed too**, via
   `no/vegvesen/soknad-om-forerkort-og-kompetansebevis` — see the Executive
   Summary update above and the document's own VERIFICATION.md (which
   independently re-extracted 82 widgets, matching this entry's own ~82
   approximate figure exactly). **Update (2026-07-11, GOV-2340): Visa is
   now closed too**, via `no/udi/soknad-om-opphold-og-arbeidstillatelse` —
   UDI's own form GP7028 (paper fallback, per the note below, still
   confirmed live and unauthenticated) — see the Executive Summary update
   above and the document's own VERIFICATION.md (which independently
   re-extracted 325 widgets/231 distinct field names, exactly matching this
   entry's own ~328 approximate figure). **Norway now stands at 6 of 6
   verticals — this item is fully closed, no verticals remain open for
   Norway.**

   **Taxes** and **Passport** are confirmed weak/dead-end candidates for
   Norway, not open gaps: Taxes is fully digital and pre-filled
   (Skatteetaten's individual return, the closest analogue to RF-1030, has
   disallowed paper submission since the 2022 tax year — filing is
   `skatteetaten.no`-login-gated with no downloadable blank form);
   Passport is an online-application-plus-mandatory-in-person-biometric
   process (`politiet.no`) with no downloadable application form, the same
   pattern this registry has repeatedly confirmed dead-end in other
   Nordic/EU jurisdictions (e.g. Finland, Estonia, Poland — see above).
9. **Sweden's Passport vertical** (opened GOV-2056 via Business Formation,
   later reaching DMV/Taxes/Visa): **now closed (GOV-2363)**, via
   `se/polisen/medgivande-pass-nationellt-id-kort-minderarig` — Polisen's
   form PM 531.2, a standalone guardian-consent appendix for a minor's
   passport/national-identity-card application. Sweden's own primary adult
   passport/national-ID-card process is a confirmed dead end: appointment-
   based, in-person, and biometric via `polisen.se`, with no downloadable
   blank application form for the main flow — the same pattern this
   registry has repeatedly confirmed dead-end in other Nordic/EU
   jurisdictions (Finland, Norway, Estonia, Poland — see above). See the
   Executive Summary update above and the document's own VERIFICATION.md
   for the full sourcing record. Sweden's National ID & Civic Documents
   vertical, Sweden's sole remaining open vertical after this item, **has
   since closed too (GOV-2372)**, via
   `se/skatteverket/samordningsnummer-ansokan` — Skatteverket's form
   SKV 7540, "Samordningsnummer – Ansökan" — see the Executive Summary
   update above and that document's own VERIFICATION.md. **Sweden now
   stands at 6 of 6 verticals — this item is fully closed, no verticals
   remain open for Sweden.**
10. **Italy's DMV vertical is now closed too (GOV-2389)**, via
    `it/mit/domanda-operazioni-veicoli-a-motore-e-rimorchi` — Modulario
    TT 2119, Ministero delle Infrastrutture e dei Trasporti /
    `ilportaledellautomobilista.it`. This cycle's own re-inspection found a
    materially different construction than this item's prior note claimed:
    zero AcroForm widgets is confirmed, but the four core data-entry pages
    are pure scanned images with **zero extractable text**, not a genuine
    text layer — only the surrounding cover/operation-table/notes/privacy
    pages carry real text. The scanned pages were extracted directly from
    the PDF's own object stream and read visually. See the Executive
    Summary update above and the document's own VERIFICATION.md for the
    full record, including two genuine same-code-different-meaning
    duplicates the source's own operation-code table prints. **Italy now
    stands at 2 of 6 verticals** (Taxes, DMV). Italy's other four remaining
    verticals were screened in the prior cycle and found weak/dead-end —
    see "Confirmed dead ends" below for Passport, Business Formation,
    National ID, and Visa.
11. **Vietnam opens as the registry's 37th jurisdiction (GOV-2404)**, via its
    Passport vertical, `vn/xuatnhapcanh/to-khai-cap-ho-chieu-pho-thong-trong-nuoc`
    (Mẫu TK01, Circular 69/2026/TT-BCA, effective 2026-07-01). **Vietnam's
    Taxes vertical is now open too (GOV-2411)**, via
    `vn/gdt/to-khai-quyet-toan-thue-thu-nhap-ca-nhan` (Mẫu 02/QTT-TNCN,
    Thông tư 80/2021/TT-BTC as amended by Thông tư 40/2025/TT-BTC and Thông
    tư 94/2025/TT-BTC) — Vietnam then stood at 2 of 6 verticals (Passport,
    Taxes). **Vietnam's Business Formation vertical is now open too
    (GOV-2443)**, via
    `vn/dangkykinhdoanh/dang-ky-doanh-nghiep-tnhh-mot-thanh-vien` (Mẫu số 2,
    Phụ lục I, Thông tư 68/2025/TT-BTC), scoped to the single-member-LLC
    enterprise-registration pathway — see the Executive Summary's GOV-2443
    update above for the full record. **Vietnam now stands at 3 of 6
    verticals** (Passport, Taxes, Business Formation). Vietnam's remaining
    two open verticals are backlog candidates of varying strength: **Visa**
    has only a weak pre-scouted lead; **DMV** is inconclusive, having hit a
    503 from the relevant gov host during prior scouting. **National ID**
    is a confirmed dead end (in-person/biometric CCCD issuance only, no
    downloadable form) — see "Confirmed dead ends" below. The two
    runner-up candidates scouted the GOV-2404 cycle remain open backlog
    candidates too: **Greece's Visa vertical is now open (GOV-2611)**, via
    `gr/mfa/application-for-schengen-visa`, opening Greece as this
    registry's 45th jurisdiction — see the Executive Summary update above.
    Greece's Business Formation/DMV/National ID remain confirmed
    in-person-only or telematic-only dead ends, and Passport's only
    downloadable artifact remains a scanned "sample" with zero extractable
    text; **Taxes is now open too (GOV-2621)**, via
    `gr/aade/dilosi-forologias-eisodimatos-e1-e2-e3` (AADE's Form Ε1,
    salaried-employment/pension-income pathway) — see the Executive Summary
    update above; Form Ε2 (rental income) and Form Ε3 (business activity),
    named alongside Ε1 in the Government Gazette ΦΕΚ Β' 1280/2026 specimen
    per GOV-2591, remain open companion-schema backlog candidates. **Peru** (Passport/National
    ID re-confirmed appointment/biometric-gated; Taxes is Clave-SOL-gated;
    Business Formation's primary SUNARP channel is login-gated, but a
    sibling SUNAT RUC-registration form, Business Formation's DMV, and
    Visa's DGC-005 form are all genuine unauthenticated static text-layer
    PDFs, none carrying real AcroForm widgets). See
    `vn/xuatnhapcanh/to-khai-cap-ho-chieu-pho-thong-trong-nuoc`'s own
    VERIFICATION.md for the full three-way candidate comparison, and
    `vn/gdt/to-khai-quyet-toan-thue-thu-nhap-ca-nhan`'s own VERIFICATION.md
    for the Taxes-vertical sourcing record.
12. **Peru opens as the registry's 38th jurisdiction (GOV-2419)**, via its
    Visa vertical, `pe/cancilleria/solicitud-visa-dgc-005` (Formulario
    DGC-005, "Solicitud de Visa"). **Corrects the GOV-2404 cycle's own
    characterization above**: DGC-005 is not, in fact, AcroForm-less — that
    finding rested on a single mirror (the Barcelona consulate's own `gob.pe`
    page) serving a superseded 2013 revision. The Ministry's own
    institutional page and the Guayaquil consulate's page both serve a
    byte-identical 2019 revision with 63 genuine AcroForm widgets, a
    seven-way visa-subtype checkbox group, a new email field, and a new
    conditional Grupo Artístico section — see the Executive Summary update
    above and the document's own VERIFICATION.md for the full byte-identity
    comparison. Peru now stands at 1 of 6 verticals (Visa); Business
    Formation (SUNAT RUC registration, Formulario 2119) and DMV (MTC
    driver's-licence application) remain the strongest pre-scouted,
    unauthenticated static-PDF backlog candidates from the GOV-2404 cycle
    (not re-screened this cycle for a possible AcroForm revision of their
    own — worth checking in a future cycle, given this cycle's own finding);
    Taxes (SUNAT) is Clave-SOL-login-gated; Passport (Migraciones) and
    National ID (RENIEC DNI) are appointment/biometric-gated.
13. **Peru's Business Formation vertical opens (2 of 6) (GOV-2426)**, via
    `pe/sunat/solicitud-inscripcion-ruc-persona-natural` (Formulario 2119,
    "Solicitud de Inscripción o Comunicación de Afectación de Tributos").
    **Re-confirms, rather than overturns, item 12's own open question**: this
    cycle re-checked whether Formulario 2119 might also carry a hidden
    AcroForm revision (as DGC-005 turned out to, per item 12) by fetching and
    cross-hashing three independent copies (SUNAT's own canonical host, plus
    two byte-identical `gob.pe` institutional-page mirrors under different
    upload IDs) — none carries any AcroForm widget, confirming the GOV-2404
    cycle's original text-layer-only characterization still holds. Peru now
    stands at 2 of 6 verticals (Visa, Business Formation); DMV (MTC
    driver's-licence application) remains the strongest pre-scouted backlog
    candidate (also not yet re-screened for a hidden AcroForm revision);
    Taxes (SUNAT) is Clave-SOL-login-gated; Passport (Migraciones) and
    National ID (RENIEC DNI) remain appointment/biometric-gated. See
    `pe/sunat/solicitud-inscripcion-ruc-persona-natural`'s own
    VERIFICATION.md for the full sourcing record.
14. **Peru's DMV vertical opens (3 of 6) (GOV-2434)**, via
    `pe/mtc/solicitud-licencia-conducir-012-17` (Formulario 012/17.03,
    "Solicitud - Licencias de Conducir," Ministerio de Transportes y
    Comunicaciones' Dirección de Circulación Vial). This is the same
    candidate items 12-13 named but had never actually fetched. It turned
    out to be genuine but more layered: the only host serving the current
    revision, `portal.mtc.gob.pe`, is unreachable from this environment at
    the TCP level (times out on every attempt, including a bare handshake —
    an infrastructure limitation, not a login/CAPTCHA/WAF gate), so the form
    was retrieved via a Wayback Machine capture whose SHA-1 content digest
    (`UE6SELZNJWXPDVKQS2SVPY6UKLGOUOWV`) is identical across eight crawls
    from 2022-06-30 through 2025-06-28, independently corroborated current
    by a 2026-01-16 crawl of MTC's own TUPA entry for procedure DCV-037
    (which names "Formulario PDF: 012/17.03" directly). A `gob.pe`-mirrored
    older revision (unversioned "012/17," missing an entire Rubro añadido by
    a 2019 Sistema de Casillas Electrónicas legal requirement) turned out to
    be a superseded circular — the same pattern this registry caught in
    `vn/xuatnhapcanh/to-khai-cap-ho-chieu-pho-thong-trong-nuoc` (GOV-2404).
    Neither revision carries an AcroForm widget. The form is a single
    "menu" cover sheet spanning ~20 DCV procedure codes; this schema scopes
    to the nine codes relevant to an individual obtaining, renewing,
    upgrading, or replacing their own Clase A licence, disclosing the
    military/police, diplomatic, refugee/asylum, foreign-licence-exchange,
    MATPEL hazardous-materials-endorsement, and information-correction
    codes as out of scope. Peru now stands at 3 of 6 verticals (Visa,
    Business Formation, DMV); Taxes (SUNAT) remains Clave-SOL-login-gated;
    Passport (Migraciones) and National ID (RENIEC DNI) remain
    appointment/biometric-gated. See
    `pe/mtc/solicitud-licencia-conducir-012-17`'s own VERIFICATION.md for
    the full sourcing record, the checkbox-matrix reconstruction method, and
    every disclosed judgment call.
15. **Uruguay's Visa vertical opens (3 of 6) (GOV-2472)**, via
    `uy/mrree/formulario-unificado-de-visas`, MRREE's own "Formulario
    Unificado de Visas" — see the Executive Summary update above and the
    document's own VERIFICATION.md for the full sourcing record. This cycle
    also screened all three of Peru's remaining open verticals (Passport,
    National ID) and all four of Vietnam's remaining open verticals (DMV,
    Visa, National ID) as parallel candidates before picking Uruguay's Visa
    gap as the strongest: **Peru Passport** — Migraciones' domestic process
    now has zero applicant-facing form of any kind (in-person, order-of-
    arrival, on-site biometric capture only, as of a policy change the week
    of 2026-05-25); the one consular passport-request PDF with real field
    detail is stale (`CreationDate: 2017-06-29`) and its `/AcroForm/Fields`
    array is empty; the Cancillería diplomatic-passport form is a scanned
    image PDF (`DCTDecode`/JPEG content streams, not machine-extractable).
    **Peru National ID** — RENIEC's entire modern DNI pipeline (first
    issuance, renewal, loss/damage replacement) runs through in-person
    registrar handoff or the biometric "DNI BioFacial" app/portal; no
    downloadable, field-documented, non-gated form exists. **Vietnam DMV**
    — vehicle registration (Mẫu ĐKX10, Thông tư 79/2024/TT-BCA) is a
    genuine, current, ~20-30-field candidate distributed as a `.docx`
    template rather than a native fillable PDF, freely downloadable with no
    login gate; driver's-licence forms (GPLX) are in active regulatory
    churn (four superseding circulars in under two years, most recently
    Thông tư 108/2026/TT-BCA) and were set aside as too unstable to author
    against this month — DMV remains open, with ĐKX10 as a ready-to-author
    backlog candidate for a future cycle. **Vietnam Visa** — the e-visa
    portal (`evisa.gov.vn`) is a login/session-gated SPA with no
    downloadable field-by-field documentation, but the traditional paper
    form Mẫu NA1 ("Tờ khai đề nghị cấp thị thực Việt Nam," Circular
    04/2015/TT-BCA, used at embassies/consulates and on-arrival checkpoints)
    is still current, freely downloadable, and documents ~20 fields — also
    a ready-to-author backlog candidate. **Vietnam National ID** — Luật Căn
    cước 2023 and its implementing Thông tư 17/2024/TT-BCA replaced the old
    citizen-completed CC01 declaration with a purely system/officer-
    generated workflow (forms CC01-CC05 are all database-extracted or
    police-generated; the citizen only reviews and signs) — a confirmed
    dead end, no fillable citizen-facing form remains. Peru stays at 4 of 6
    verticals (Visa, Business Formation, DMV, Taxes); Vietnam stays at 3 of
    6 (Business Formation, Passport, Taxes), with DMV (ĐKX10) and Visa (NA1)
    both flagged as strong, ready-to-author candidates for an immediate
    follow-up cycle.
16. **Vietnam's DMV vertical opens (4 of 6) (GOV-2479)**, via
    `vn/bca/to-khai-dang-ky-xe`, Mẫu ĐKX10 ("Giấy khai đăng ký xe," Thông tư
    79/2024/TT-BCA) — the candidate flagged as ready-to-author in item 15
    above, this time independently re-verified from scratch rather than
    taken on faith. A fresh legal-currency check found a genuine
    three-circular amendment chain to the parent Thông tư (13/2025/TT-BCA,
    51/2025/TT-BCA, and the newer 37/2026/TT-BCA) but confirmed none of the
    three touches Mẫu ĐKX10 itself. See the Executive Summary update above
    and the document's own VERIFICATION.md for the full sourcing record.
    Vietnam now stands at 4 of 6 verticals (Business Formation, Passport,
    Taxes, DMV); Visa (Mẫu NA1) remains a ready-to-author backlog candidate,
    and National ID remains a confirmed dead end.
17. **Vietnam's Visa vertical opens (5 of 6) (GOV-2486)**, via
    `vn/bca/to-khai-de-nghi-cap-thi-thuc-viet-nam`, Mẫu NA1 — the candidate
    flagged as ready-to-author in item 16 above, this time independently
    re-verified from scratch rather than taken on faith. That
    re-verification caught that the pre-scouted source (originally cited to
    Thông tư 04/2015/TT-BCA, with a freely-downloadable third-party `.doc`
    mirror) had gone stale: a legal-currency check found **Thông tư
    70/2026/TT-BCA ngày 25/5/2026, hiệu lực 01/7/2026**, which republishes
    Mẫu NA1's own template (not merely its parent circular), already in
    force as of this verification date. This claim was independently
    corroborated three separate ways — `luatvietnam.vn`'s own
    `schema.org`-tagged article page (which also embeds the complete new
    NA1 text, this schema's actual field source), and two independent
    official provincial-police `.gov.vn` portals — before being trusted,
    given this registry's own prior gotcha of a WebSearch AI summary once
    hallucinating an unrelated same-number-different-year superseding
    circular in an earlier VN cycle. See the Executive Summary update above
    and the document's own VERIFICATION.md for the full sourcing record.
    Vietnam now stands at 5 of 6 verticals (Business Formation, Passport,
    Taxes, DMV, Visa); National ID remains Vietnam's sole open vertical, a
    previously-confirmed dead end not re-screened this cycle.
18. **Kenya opens as the registry's 40th jurisdiction (GOV-2493)**, via its
    Business Formation vertical, `ke/brs/cr1-application-to-register-a-company`
    (BRS Form CR1, "Application to Register a Company," Companies Act 2015
    §13, Legal Notice 103 of 2017). See the Executive Summary update above
    and the "Business Formation" vertical section above for the full
    sourcing record, including the docx-vs-PDF discovery that resolved this
    schema's two selection-mechanism ambiguities. **Kenya now stands at 1 of
    6 verticals** (Business Formation); Kenya's other five verticals —
    Passport, DMV, Taxes, Visa, and National ID — are open, unscreened
    backlog candidates for a future cycle; none of them has been scouted or
    screened yet.
19. **Kenya's National ID & Civic Documents vertical opens (2 of 6)
    (GOV-2500)**, via `ke/nrb/application-for-identity-card` (Form Reg. 136A,
    "Ombi ya Kitambulisho / Application for Identity Card," Registration of
    Persons Act Cap. 107, administered by the National Registration Bureau).
    This cycle screened Kenya's remaining four verticals in parallel:
    Passport, DMV, and Visa each confirmed dead ends (fully online,
    login/payment-gated processes with no unauthenticated specimen); Taxes
    (KRA's IT1 Excel return, version 19.0.3/March 2026) is a genuine, strong,
    currently-maintained candidate, set aside this cycle in favour of
    National ID's more tractable scope. See the Executive Summary update
    above and the "National ID & Civic Documents" vertical section above for
    the full sourcing record, including the two-mirror byte/AcroForm
    cross-check and the widget-to-label coordinate-correlation table, and the
    document's own VERIFICATION.md for every disclosed scoping/judgment call.
    **Kenya now stands at 2 of 6 verticals** (Business Formation, National
    ID); Taxes remains Kenya's sole open, unscreened-in-depth vertical for a
    future cycle.
20. **Nigeria opens as the registry's 42nd jurisdiction (GOV-2518)**, via its
    Business Formation vertical,
    `ng/cac/cac-1-1-application-for-registration-of-company` (Corporate
    Affairs Commission Form 1.1, "Application for Registration of Company,"
    Companies and Allied Matters Act 2020). A prior scouting pass (GOV-2507,
    see item 22 below) had cited this form's hash/byte size (both
    independently reconfirmed exactly) and a widget count that this cycle's
    own `pdfjs-dist` extraction corrected (87 widgets: 75 text, 9 choice, 3
    checkbox — the prior "3 button, 2 choice" undercounted the choice
    widgets by 7); extraction also surfaced a genuine field-name-reuse
    defect in the source PDF (the ID-type/gender dropdowns share one
    AcroForm field name across all 4 printed director slots), disclosed and
    deliberately not preserved in this schema. See the Executive Summary
    update above and the document's own VERIFICATION.md for the full
    sourcing record. **Nigeria now stands at 1 of 6 verticals** (Business
    Formation); Nigeria's other five verticals — Passport, DMV, Taxes, Visa,
    and National ID — are open, unscreened backlog candidates for a future
    cycle; none of them has been scouted or screened yet.
21. **Correction (2026-07-12, GOV-2517, "GovSchema Standard Research", on
    top of Kenya's National ID entry (item 19) above): a same-day GOV-2507
    update claiming the KRA IT1 candidate had "reversed to a dead end" was
    itself wrong and has been removed.** GOV-2507 found one live,
    unauthenticated `.xls` file on `kra.go.ke`
    (`IT1_Individual_Resident_Return_Version-18.03-Revised.xls`) is
    genuinely MS-Office-encrypted, which is accurate as far as it goes —
    but a plain web search for the form's own filename turns up two more
    currently-live, unauthenticated, *unencrypted* siblings on the same
    host: `Updated-IT1_Individual_Resident_Return_XLS-18.0.9-2024.xls` and
    `IT1_Individual_Resident_Return_18.0.1latest.xls`, both independently
    re-fetched and re-opened here with the `xlsx` npm library, each
    resolving cleanly to the same genuine 34-sheet structure (`A_Basic_Info`
    through `T_Tax_Computation`, plus `Data`/reference-list sheets) with no
    password prompt. Taxes therefore remains Kenya's sole open,
    unscreened-in-depth vertical for a future cycle — cite
    `IT1_Individual_Resident_Return_18.0.1latest.xls` or
    `Updated-IT1_Individual_Resident_Return_XLS-18.0.9-2024.xls` as the
    workable source, not the encrypted `18.03-Revised` edition. GOV-2507's
    "19.0.3/March 2026" version-number claim (from GOV-2500) still could not
    be corroborated anywhere and remains suspect — treat the version string
    as unconfirmed, not the candidate itself as dead. See
    [[gov2167-govschema-standard-research-routine]] for the standing caution
    that applies both ways: a "genuine, strong candidate" note can turn out
    wrong on fresh re-verification, and so can a same-day reversal of one —
    verify each sub-claim independently rather than accepting a bundled
    finding as one unit.
22. **Rwanda scouted as a 42nd-jurisdiction candidate (GOV-2507), not
    authored yet — remains genuine, ready-to-author backlog for a future
    cycle.** (Nigeria, scouted alongside Rwanda in the same GOV-2507 pass,
    was authored this same cycle — see item 20 above; its widget count as
    originally scouted, "3 button, 2 choice," was later corrected by
    GOV-2518 to 9 choice/3 checkbox.) This cycle's own Norway/Chile/Argentina
    backlog screening (see the "NO Passport," "NO Taxes," "CL Passport," "CL
    Visa," "CL National ID," and "AR National ID" entries under "Confirmed
    dead ends" below) came back entirely dead ends — Kenya's own re-screen
    this cycle was itself later found wrong (see the correction in item 21
    above: KE Taxes remains open backlog, not a dead end) — so this cycle
    scouted new jurisdictions instead. **Rwanda** — RRA's Motor Vehicle
    Registration Form ("RRA-MVD-VRF-E06"), fetched live and unauthenticated
    from `rra.gov.rw/fileadmin/user_upload/mvregistrationform.pdf` (HTTP 200,
    191,913 bytes), a genuine `/AcroForm`+`/XFA` PDF independently parsed at
    the byte level to confirm 46 real widget annotations (42 text, 3
    signature, 1 button/radio) with clean, real field labels (owner
    identification, registration information, vehicle information,
    certification). Rwanda's other five verticals are all confirmed dead
    ends this cycle — Business Formation (RDB), Taxes (RRA declarations),
    National ID (NIDA), Passport (DGIE), and Visa all route exclusively
    through the login/payment-gated IremboGov one-stop portal with no
    downloadable citizen-facing form found anywhere.
23. **Rwanda opens as the registry's 43rd jurisdiction (GOV-2526)**, via its
    DMV vertical, `rw/rra/vrf-e06-motor-vehicle-registration-form` (Rwanda
    Revenue Authority's Motor Vehicle Registration Form, form code
    RRA-MVD-VRF-E06). A prior scouting pass (GOV-2507, item 22 above) had
    cited this form's byte size (independently reconfirmed exactly:
    191,913 bytes,
    `sha256:1c580d7766fb2c7dad73aa627d5e634256e27f1475e104fb8e9728137a3337b7`)
    and a widget-type breakdown that this cycle's own `pdfjs-dist`
    extraction corrected — 46 widgets: 37 text, 5 radio-button, 4 signature
    (not the "42 text, 3 signature, 1 button/radio" originally cited; the
    overall count of 46 was exactly right, the per-type split was not).
    Extraction also surfaced a genuine field-name-reuse defect: one shared
    AcroForm radio-button field object spans two unrelated printed
    questions — Section C's "Steering Wheel" selector (Left/Right/N-A) and
    Section B's "Customs Regime" selector (Consumption/Suspension) — so in a
    real PDF viewer, selecting one would silently clear the other; this
    schema models them as two independent `enum` fields instead, with the
    defect disclosed rather than silently fixed. See the Executive Summary
    update above and the document's own VERIFICATION.md for the full
    sourcing record. **Rwanda now stands at 1 of 6 verticals** (DMV).
    This cycle's own re-check of item 22's blanket "all other five
    verticals are confirmed dead ends" claim mostly held up — Business
    Formation (RDB/ORG, online-only via `businessprocedures.rdb.rw`/
    IremboGov), National ID (NIDA, IremboGov-only per its own support
    articles), Passport (e-passport "completed and submitted online through
    the Irembo Portal only"), and Taxes (RRA's own site: published forms
    "are just samples," real declarations require an in-person/portal
    RRA-office registration) all reconfirmed as dead ends — **but Visa does
    not**: two candidate PDFs surfaced this cycle (a Rwandan-embassy-in-UK
    mirror, Last-Modified 2021-03-22, and an RDB-hosted "Proposed New visa
    application form," Last-Modified 2013-11-14), both reachable
    unauthenticated (HTTP 200, `application/pdf`). Neither was verified for
    AcroForm field content this cycle, and Rwanda's Directorate General of
    Immigration and Emigration's own current guidance ("How to Apply for a
    Visa on IremboGov") points at the same online portal as the other
    verticals, so these are plausibly stale consular mirrors rather than a
    live current form — left as an **open, unresolved candidate** for a
    future cycle rather than asserted as either a confirmed live source or a
    confirmed dead end. Rwanda's remaining sub-process backlog: Business
    Formation, National ID, Passport, and Taxes are confirmed dead ends per
    the above; Visa is unresolved backlog.
24. **Kenya's Taxes vertical closes (3 of 6) (GOV-2535)**, via
    `ke/kra/it1-individual-resident-return` (KRA's "IT1 Individual Resident
    Return" Excel workbook, edition 18.0.1). This was Kenya's sole
    remaining open, previously-scouted-in-depth vertical candidate (item 19
    above; Passport, DMV, and Visa were already confirmed dead ends).
    Independently re-fetched and re-hashed
    `IT1_Individual_Resident_Return_18.0.1latest.xls` this cycle
    (`sha256:7c85241bbabc797b9e3c6b708209a32866c4ec9131f9d845d0b87c9734e939e2`),
    confirming it live, unencrypted, and exactly the 34-sheet structure
    prior cycles described; cross-checked against the newer-numbered
    sibling `Updated-IT1_Individual_Resident_Return_XLS-18.0.9-2024.xls`
    (also live, materially identical for this schema's in-scope content).
    Did not chase item 21's still-unconfirmed "19.0.3/March 2026"
    version-number claim further — no such file was found on `kra.go.ke`
    this cycle either, and the claim remains an open, separate question
    from the candidate's own live status. This schema deliberately bounds
    scope to the workbook's "employed resident individual" filing pathway
    across 5 of its 34 sheets (`A_Basic_Info`, `F_Employment_Income`,
    `M_Details_of_PAYE_Deducted`, `T_Income_Computation_Self`,
    `T_Tax_Computation`) — 86 `fields[]`, including a bounded 2-employer
    repeating group spanning the employment-income and PAYE-deducted
    sheets, with each sheet's separately-listed "PIN of Employer"/"Name of
    Employer" columns merged into one shared per-employer identity rather
    than duplicated. Every self-employment/business-income, farming,
    partnership, estate/trust, capital-allowance, and tax-credit schedule,
    plus the workbook's entire mirrored spousal ("Wife") filing pathway, is
    out of scope and disclosed as a companion-schedule candidate for a
    future cycle. Two ambiguities the source itself leaves unresolved in
    its own embedded comments (a mutual-exclusivity question between the
    mortgage-interest and home-ownership-savings-plan deductions; a flag
    that the embedded Ksh 13,944 personal-relief figure is a configurable
    template default, not an asserted-current legal amount) are quoted
    verbatim rather than silently resolved. See the Executive Summary
    update above, the "Taxes" vertical section above, and the document's
    own VERIFICATION.md for the full sourcing record and every disclosed
    scope/judgment call. **Kenya now stands at 3 of 6 verticals** (Business
    Formation, National ID, Taxes); Passport, DMV, and Visa remain
    confirmed dead ends, so no vertical remains open-and-unscreened for
    Kenya.
25. **Rwanda's Visa vertical opens (2 of 6) (GOV-2544)**, via
    `rw/dgie/visa-application` (Directorate General of Immigration and
    Emigration's standard "VISA APPLICATION" specimen used at Rwandan
    diplomatic missions abroad), resolving item 23's disclosed open,
    unresolved Visa candidate. Independently re-fetched both cited embassy
    mirrors directly (Rwandan embassies in the UK and the USA): both HTTP
    200, `application/pdf`, 233,226 bytes, `sha256:
    01ffbc05db088ece045c25867f791892dc3b9eed808b1445867f3d29946378c0` —
    confirmed byte-identical to each other and to the issue's own citation,
    despite materially different `Last-Modified` headers (2021-03-22 vs.
    2024-09-03), corroborating this as DGIE's one current standard specimen
    rather than a stale single copy. Re-fetched
    `migration.gov.rw/visa/visitors-visa/` directly and confirmed its own
    printed text names "the office of a diplomatic mission of Rwanda in the
    applicant's country of residence" as a current issuance channel. Unlike
    `rw/rra/vrf-e06-motor-vehicle-registration-form`, this specimen carries
    **0 AcroForm widgets** — a flat, print-and-hand-fill form (the same
    pattern already established by `pe/sunat`, `uy/dgi`, and `ke/brs` in this
    registry) — so every field was derived directly from the extracted text
    layer's printed numbering (27 numbered items across 2 pages) rather than
    AcroForm widget names. 48 `fields[]` were modelled (several numbered
    items split into multiple side-by-side printed blanks, e.g. item 6
    "Place of Birth" -> district/country; a spouse block gated
    `requiredWhen` against `maritalStatus`, matching this registry's ph/bi,
    ph/dfa, ph/lto, and us/uscis precedent; item 27's printed 2x2 children
    table flattened to 4 numbered child slots, matching fi/migri's bounded-
    repeating-group convention — deliberately left without a machine-checked
    `requiredWhen` gate on the child sub-fields, since the sibling
    `childNName` field is itself optional and genuinely absent rather than
    empty-string for a childless applicant, the same
    `notequals-empty-string-absent-field-bug` class this registry has hit
    and fixed before), plus 2 `documents[]` entries (a coloured-photo
    requirement and a printed certification statement). Also caught and
    fixed, before commit, an invalid `validation.format: "email"` keyword
    (not permitted under spec v0.3's `nonFileValidation` definition) via
    `tools/validate-ajv.mjs`, replacing it with a `pattern` regex matching
    `ae/rta/vehicle-registration-renewal`'s existing convention. Two mock
    conformance scenarios (a single first-time tourist; a married applicant
    with 2 accompanying children) found 0 errors each, plus 4 mutation
    controls (a missing required field, an invalid date format, an invalid
    enum value, and a missing conditional spouse field) each correctly
    raised exactly 1 error. See the Executive Summary update above, the
    "Visa" vertical section above, and the document's own VERIFICATION.md
    for the full sourcing record and every disclosed judgment call.
    **Rwanda now stands at 2 of 6 verticals** (DMV, Visa); Business
    Formation, National ID, Passport, and Taxes remain confirmed dead ends
    per item 23/GOV-2526.
26. **Nigeria's Taxes vertical closes (2 of 6) (GOV-2553)**, via
    `ng/firs/fct-irs-personal-income-tax-return-form-a` (the Federal Capital
    Territory Internal Revenue Service's "Form A" Personal Income Tax Return
    Form, under the Personal Income Tax Act). Resolves item 20's disclosed
    open, unscreened Taxes backlog for Nigeria. Independently re-fetched the
    cited source directly (HTTP 200, `application/pdf`, 323,404 bytes,
    Last-Modified 2025-10-09, `sha256:
    5062478b44c42c94524d773691e0903d2328640a9d5f3a252475c094a3bd324d`),
    confirming the child issue's own citation exactly. A fresh `pdfjs-dist`
    extraction confirms **0 AcroForm widgets** across the 2-page specimen,
    the same flat-print-form tier as `rw/dgie`, `pe/sunat`, `uy/dgi`, and
    `ke/brs`; extraction also surfaced a font-rendering defect in the
    specimen's own embedded bold typeface that silently dropped most bold
    caption glyphs on render, worked around by cross-checking two tables'
    row counts (domestic servants, Part D allowances) against rendered
    vector ruling-line geometry instead of the (invisible) rendered
    captions. Modeled `jurisdiction.level: subnational`, `subdivision:
    NG-FC`, since Nigerian personal income tax is administered
    state-by-state under the nationally-standardized PITA framework, not by
    a single national form. 82 `fields[]` cover Part A (Personal Details),
    Part B (Statement of Income), a conditional spouse-and-children block
    (a bounded, printed 4-slot children table), Part C (Benefits in Kind,
    including bounded 2-slot domestic-servants and vehicles tables), and
    Part D (a bounded 2-slot life-assurance/gratuities/NHIS/pension-
    contribution table). This specimen carries **zero asterisks or any
    other required-field marking convention anywhere** in its text
    (confirmed by a full-text scan) — a disclosed judgment call models
    every Part B income-statement line required with a 0-permitting
    minimum, while the spouse/children block and every Part C/D item are
    modeled optional, with no synthetic Marital Status field invented to
    gate the former (no corresponding checkbox exists on the specimen),
    per this registry's `ng/cac` Section D/D1 precedent. A disclosed
    printed-label discrepancy: the source's own "Aggregate Investment
    Income (iv - vii above) (Y)" label is modeled as the sum of items
    (v)-(viii) instead, the only numerically consistent reading, since item
    (iv) is already summed into the preceding "Aggregate Earned Income
    (i-iv above) (X)" line. 8 `documents[]` entries capture the specimen's
    own "Attach ..." instructions (6 conditional, disclosed via `handling`
    prose since no boolean field exists to gate a `requiredWhen` cleanly)
    plus the signed declaration statement (required). Two mock conformance
    scenarios (a single-employed filer with no benefits; a married filer
    with two children, employer-paid rent, a domestic servant, a vehicle,
    and a life-assurance policy) found 0 errors each, plus 4 mutation
    controls (a missing required field, an email-pattern violation, an enum
    violation, and a vehicle-year range violation) each correctly raised
    exactly 1 error. See the Executive Summary update above, the "Taxes"
    vertical section above, and the document's own VERIFICATION.md for the
    full sourcing record and every disclosed scoping/judgment call.
    **Nigeria now stands at 2 of 6 verticals** (Business Formation, Taxes);
    Passport, DMV, Visa, and National ID remain open, unscreened backlog
    for a future cycle.
27. **Nigeria's Visa vertical opens (3 of 6) (GOV-2561)**, via
    `ng/nis/application-for-visa-entry-permit` (the Nigeria Immigration
    Service's "Form Imm. 22 — Application Form for Visa/Entry Permit",
    scoped to embassy/consular use abroad). Resolves item 26's disclosed
    open Visa backlog for Nigeria. Independently re-fetched two of the three
    cited mirrors directly: the Embassy of Nigeria in Vietnam's own
    government domain (`nigeriaembassy.org.vn`, HTTP 200, `application/pdf`,
    373,872 bytes, Last-Modified 2020-11-21, matching the citation exactly)
    — the only own-government-domain copy, used as this schema's primary
    `source` — and a Nigerian-Embassy-Washington-DC-letterheaded copy on a
    third-party domain (`samspassport.com`, HTTP 200, `application/pdf`,
    43,156 bytes), a fuller 3-page, 31-question edition printing the form's
    own designation "Form Imm. 22". A third cited mirror
    (`nigerianvisaservices.com`) returned a Cloudflare human-verification
    challenge page on an early attempt this cycle, but a later independent
    re-fetch found it live (`application/pdf`, 88,509 bytes) — the earlier
    challenge was a transient failure, not a genuine access gate; its
    content is a separately re-typeset rendering, not byte-identical to
    either other mirror, but carries the same "Form Imm. 22" title and item
    numbering. Both verified editions carry **0 AcroForm widgets** (flat,
    print-and-hand-fill forms,
    the same tier as `rw/dgie`). Independent side-by-side extraction found
    the child issue's framing of the DC edition as a strict superset of the
    Vietnam edition does not hold exactly: the Vietnam edition also
    independently asks 6 items the DC edition omits entirely (e-mail
    address, complexion, academic qualifications, source of sponsorship,
    and a mission-localized "reference in [country]" name/address/
    telephone) — corrected and disclosed rather than silently adopting the
    issue's characterization. This schema models the union: 93 `fields[]`
    entries (86 from the DC edition's 31-item structure, including a
    bounded 3-slot prior-visit table and two bounded 4-slot
    countries-lived-in/visited tables per this registry's established
    repeating-group convention, plus 7 from the Vietnam edition's
    edition-unique items, modeled as independently optional fields) and 9
    `documents[]` entries (the photograph requirement printed on both
    editions, the DC edition's attachments-and-fee schedule, its under-16
    accompanying-child document bundle, and its wet-ink certification
    statement). Two mock conformance scenarios found 0 errors each, plus 5
    mutation controls each correctly raised exactly 1 error. See the
    Executive Summary update above and the document's own VERIFICATION.md
    for the full sourcing record and every disclosed scoping/judgment call.
    **Nigeria now stands at 3 of 6 verticals** (Business Formation, Taxes,
    Visa); DMV was screened this cycle and confirmed a dead end
    (state/FRSC licensing is SSO-portal-gated with no downloadable
    specimen); Passport and National ID remain open, unscreened backlog for
    a future cycle.
21. **Nigeria's National ID gap is now closed too (GOV-2569)**, via
    `ng/nimc/nin-enrolment-form` — NIMC's "National Identification Number
    (NIN) Enrolment Form" v2.0, sourced from an official `.gov.ng` mirror
    (`bern.foreignaffairs.gov.ng`) after NIMC's own historical static PDF
    path was found 404-redirecting to a JS SPA following a 2024 site
    redesign. See the Executive Summary update above and the document's own
    VERIFICATION.md for the full sourcing record. **Nigeria now stands at 4
    of 6 verticals** (Business Formation, Taxes, Visa, National ID); DMV
    remains a confirmed dead end; Passport is the sole remaining open
    vertical, with a strong candidate already identified: NIS "Form C1"
    (Application for Nigeria Standard Passport), reachable unauthenticated
    via the Nigeria High Commission London's own mirror
    (`nigeriahc.org.uk/wp-content/uploads/2023/05/LostReqForm.pdf`). This
    cycle also scouted and confirmed strong (but did not author) Rwanda's
    Business Formation candidate — RDB "RF-001 Domestic Company Application
    for Incorporation"
    (`businessprocedures.rdb.rw/media/2.5_rf-001%20domestic%20company.pdf`,
    18 numbered sections, no login/CAPTCHA gate) — left open for a future
    cycle; Rwanda currently stands at 2 of 6 verticals (DMV, Visa).
22. **Nigeria's Passport gap is now closed too (GOV-2577)**, via
    `ng/nis/application-for-nigeria-standard-passport` — NIS "Form C1 —
    Application for Nigeria Standard Passport" (Adult pathway), the strong
    candidate identified in item 21 above, sourced from the Nigeria High
    Commission London's own mirror. See the Executive Summary update above
    and the document's own VERIFICATION.md for the full sourcing record and
    every disclosed scoping/judgment call, including the Adult-pathway
    scope, the full-breadth `reasonForApplication` enum, and the
    companion-document scoping of the bundled Form P/21 guarantor
    affidavit and two statutory declarations. **Nigeria now stands at 5 of
    6 verticals** (Business Formation, Taxes, Visa, National ID, Passport);
    DMV remains the sole confirmed dead end.
23. **Rwanda's Business Formation gap is now closed too (GOV-2585)**, via
    `rw/rdb/rf-001-domestic-company-application-for-incorporation` — RDB's
    "RF-001 Domestic Company Application Form for Incorporation," the
    candidate scouted and confirmed strong in item 21 above but left
    unauthored. Independently re-fetched the source directly this cycle
    (HTTP 200, `application/pdf`, 1,218,128 bytes,
    `sha256:0bbcfa32fc17ea7d38365575bcadf72a7948c029bacd020e505757396700da8b`
    — matching the prior scouting citation exactly), and confirmed via
    `pdfjs-dist` that this 10-page, 18-numbered-section specimen carries a
    real, position-anchored text layer but **0 AcroForm widgets** (the
    1.2MB size is embedded fonts/graphics, not a scanned image) — the same
    flat, print-and-hand-fill pattern as `rw/dgie`'s Visa specimen. Models
    the shared form's full printed breadth (Registration-reason/Category
    selectors, company Identification, the filing Applicant, Head office
    address, an optional Chairman, the Managing director, an optional
    Company secretary, a bounded 2-slot Member-of-the-board group, optional
    Auditor/Accountant Person-or-Organization blocks, a bounded 3-slot
    Business activities group, company-level Capital information gated on
    Category, a first Subscriber and first Guarantor slot, and the
    Amalgamation/Dormancy/Dissolution sections each gated on
    Registration-reason) as 256 `fields[]` + 19 `documents[]` entries. Two
    mock conformance scenarios found 0 errors each, plus 5 mutation
    controls each correctly raised exactly 1 error — after this cycle's own
    fixture testing caught and fixed an over-strict share-subtype gating
    bug in an earlier draft. See the Executive Summary update above and
    the document's own VERIFICATION.md for the full sourcing record and
    every disclosed scoping/judgment call. **Rwanda now stands at 3 of 6
    verticals** (DMV, Visa, Business Formation); Passport, Taxes, and
    National ID remain open, unscreened backlog for a future cycle.
24. **Thailand opens as the registry's 44th jurisdiction (GOV-2593)**, via
    its Taxes vertical (1 of 6) — `th/rd/pit-90-personal-income-tax-return`,
    the Revenue Department (RD)'s "ภ.ง.ด.90" (PIT 90) personal income tax
    return, tax year 2568 (2025 CE) edition, a candidate scouted in GOV-2591's
    prior cycle after Rwanda's remaining verticals were confirmed dead ends.
    Independently re-fetched the source directly this cycle (HTTP 200,
    `application/pdf`, 1,629,183 bytes,
    `sha256:e47796b2b5a5e253407dc6e1d0accebb0ebcf18456ff5ee08396c487786e84e5`
    — matching the prior scouting citation exactly), and confirmed via
    `pdfjs-dist` that this 5-page specimen carries 432 AcroForm widgets
    (76/95/112/78/71 per page, also matching exactly). PIT 90 is Thailand's
    return for a taxpayer with income beyond pure salary (Revenue Code
    sections 40(2)-(8)), spanning up to 8 income-type schedules across pages
    2-4 plus a personal-deductions/allowances attachment on page 5; this
    schema deliberately bounds scope to the general/salaried-income filing
    pathway (page 1's identification/marital/filing-status/donation/refund
    block, ข้อ 1's section 40(1)-(2) income computation, ข้อ 11's full
    25-line final tax computation completed by every filer regardless of
    income type, and the page 5 deductions attachment's 24 numbered items)
    as 154 `fields[]` + 2 `documents[]` entries. ข้อ 2 through ข้อ 10 — the
    royalty/goodwill, dividend/interest, rental, professional-fee,
    contracting, business/commerce, separate-taxation real-estate-sale and
    gift/inheritance schedules, and the RMF/Thai-ESG/pension-insurance
    exclusion election — are out of scope and disclosed with reasons in the
    document's own VERIFICATION.md. Two mock conformance scenarios found 0
    errors each, plus 5 mutation controls each correctly raised exactly 1
    error. See the Executive Summary update above and the document's own
    VERIFICATION.md for the full sourcing record and every disclosed
    scoping/judgment call. **Thailand opens at 1 of 6 verticals** (Taxes);
    DMV, Passport, and National ID were screened this cycle and confirmed
    weak/dead-end (in-person/biometric processes — vehicle registration via
    the Department of Land Transport, passport issuance via the Department
    of Consular Affairs, and the national ID card via the Department of
    Provincial Administration — each with no unauthenticated fillable
    specimen found); two further candidates remain open, scouted backlog:
    DBD Form บอจ.1 for Business Formation (101 AcroForm fields, `dbd.go.th`)
    and the MFA Non-Immigrant Visa B/Employment application for Visa (58
    AcroForm fields, served from an `mfa.go.th` CDN).
25. **Thailand's Business Formation vertical opens too (GOV-2601)**, via
    `th/dbd/boj-1-application-to-register-a-limited-company` — the
    Department of Business Development (DBD)'s "แบบ บอจ.1" (Form บอจ.1), the
    candidate scouted in item 24 above and delegated in parallel (GOV-2599)
    alongside a Visa candidate. Independently re-fetched the source directly
    this cycle (HTTP 200, `application/pdf`, 801,091 bytes,
    `sha256:433aace18e925d75236afe99e08796763744040e5f10f5781445e77d70796f72`
    — matching the prior scouting citation exactly), and confirmed via
    `pdfjs-dist` that this 2-page specimen carries 101 AcroForm widgets
    (45/56 per page, also matching exactly — correlating checkbox/text
    labels on both sides of each widget's rect, since an early scratch pass
    found left-only correlation returns empty checkbox labels on this
    particular form). A full top-to-bottom text read of both pages found
    this form is not the comprehensive company-details form its title might
    suggest: page 1 is a registrar-facing routing/cover form whose 20
    checkboxes are actually a 17-value registration-action-type selector
    (new incorporation; standalone Memorandum-of-Association registration;
    partnership conversion; a capital increase/decrease/merger special
    resolution; five distinct Memorandum/Articles amendment sub-types; a
    merger; a director change; and others) plus 3 independent
    post-registration add-on requests (labor-bylaw copy, trademark
    registration, import/export ID card) — not, as initially anticipated, a
    document-attachment checklist; page 2 is a bundled "หนังสือรับรอง"
    (Certificate of Incorporation) template the Registrar completes and
    issues after approval, not an applicant input. This v1.0.0 scopes to the
    new-incorporation (`จัดตั้งบริษัทจำกัด`) action pathway — the full
    17-value `registrationActionType` enum, the 3 post-registration add-on
    checkboxes, company-name/existing-registration identification, a
    two-signatory signature block, and the page-1 footer's statutory
    false-statement warning notice — as 10 `fields[]` + 1 `documents[]`
    entry. The 16 non-formation action types' own dependent free-text
    sub-fields, the Registrar/witness certification block, and the entirety
    of page 2 are out of scope and disclosed with reasons in the document's
    own VERIFICATION.md. Two mock conformance scenarios found 0 errors each,
    plus 5 mutation controls each correctly raised exactly 1 error. See the
    Executive Summary update above and the document's own VERIFICATION.md
    for the full sourcing record and every disclosed scoping/judgment call.
    **Thailand now stands at 2 of 6 verticals** (Taxes, Business Formation)
    as of this item; see item 26 below for the concurrent GOV-2602 Visa
    opening that brings Thailand to 3 of 6 overall. DMV, Passport, and
    National ID remain confirmed weak/dead-end from item 24 above.
26. **Thailand's Visa vertical opens too (2 of 6 as of this item, 3 of 6
    combined with item 25 above, GOV-2602)**, via
    `th/mfa/non-immigrant-visa-b-application-for-employment`, the backlog
    candidate flagged in the prior entry. Independently located the source
    URL this cycle (the task named only a widget count and topic), screening
    out two sibling visa-application PDFs (0 and 103 widgets) before
    confirming this specimen's widget count matched exactly. Independently
    re-fetched and hashed (HTTP 200, `application/pdf`, 270,415 bytes,
    `sha256:8e61fcc80bd6260f83f86b01d5443f54a75eda4ef915c3c5449e498b8b2600d4`),
    and confirmed via `pdfjs-dist` a 2-page specimen: page 1 a non-fillable
    10-item document checklist (0 widgets, modelled as `documents[]`), page
    2 the MFA's own generic "APPLICATION FOR VISA" AcroForm (footer-stamped
    `mfavisaform 10 09 2007`, shared across all MFA visa categories)
    carrying all 58 widgets. 2 widgets are excluded as non-visible,
    near-zero-dimension artifacts with no printed label; the remaining 56
    collapse into 57 `fields[]` (3 checkbox groups — visa-type-requested,
    title, purpose-of-visit — modelled as independent booleans plus
    `exclusivityGroups`) plus 10 `documents[]`. Disclosed: the source's own
    printed options never literally say "Employment"
    (`visaTypeNonImmigrant`/`purposeOfVisitBusiness` are each flagged as the
    closest applicable option, not asserted as canonical); the page-2 "FOR
    OFFICIAL USE" block carries no AcroForm widgets at all and is out of
    scope. Two mock conformance scenarios found 0 errors each, plus 5
    mutation controls each correctly raised exactly 1 error. See the
    Executive Summary update above and the document's own VERIFICATION.md
    for the full sourcing record and every disclosed scoping/judgment call.
    **Thailand now stands at 3 of 6 verticals** (Taxes, Business Formation,
    Visa), combining this item with item 25 above; DMV, Passport, and
    National ID remain screened dead-end/backlog.
27. **Rwanda's Passport vertical opens (4 of 6) (GOV-2629)**, via
    `rw/dgie/passport-application-first-adult` — the previously open,
    unscreened Passport backlog item (item 23 above) left after Rwanda's
    Business Formation gap closed. There is no downloadable/fillable PDF
    specimen for this process: Rwanda's e-passport application is a pure
    IremboGov (irembo.gov.rw) online SPA workflow. Sourced instead from
    IremboGov's own official Support Center walkthrough article (a genuine
    field-by-field guide, including its own embedded screenshots of the
    live "Applicant Details" and "Passport & Travel Details" screens),
    corroborated by a second IremboGov FAQ article and the DGIE's own
    service page — independently re-fetched all four this cycle (HTTP 200
    on each; `text/html` at 106,136 / 62,228 / 26,800 bytes respectively,
    plus a Canva-made screenshot-walkthrough PDF at 149,839 bytes confirmed
    to carry 0 extractable text/AcroForm content). This is the same
    accepted authoring pattern already used by
    `id/imigrasi/passport-application-first-adult` for a portal-only
    process. Scopes to the single adult (18+), first-time-applicant
    pathway: 17 `fields[]` and 6 `documents[]` entries. Disclosed scoping
    gap: the source's own screenshots confirm only a top-level "Country"
    select for both Residence Details and Birth Location (captured in
    their default unselected state), so this document does not model a
    deeper Province/District/Sector/Cell administrative-unit cascade (as
    `rw/rdb/rf-001-domestic-company-application-for-incorporation` models
    for other Rwandan forms) — flagged for a future revision rather than
    invented. Two mock conformance scenarios found 0 errors each, plus 3
    mutation controls (missing required field, invalid enum value, pattern
    violation) each correctly raised exactly 1 error. See the Executive
    Summary update above and the document's own VERIFICATION.md for the
    full sourcing record and every disclosed scoping/judgment call.
    **Rwanda now stands at 4 of 6 verticals** (DMV, Visa, Business
    Formation, Passport). Rwanda's remaining two verticals were screened
    this same research cycle (reported per the parent research routine, not
    independently re-verified as part of this authoring pass): **National
    ID is a confirmed dead end** (the Indangamuntu National ID is entirely
    Irembo-portal-gated plus in-person biometric/RIB verification, with no
    fillable specimen or field-by-field guide found); **Taxes surfaced only
    a companion annex form** (RRA's Annexe A, "RRA-PIT-ANA-E11"), not a
    full standalone return — flagged as a possible narrower
    companion-schedule candidate for a future cycle, not a full
    Taxes-vertical closure.
28. **Bangladesh's Business Formation vertical opens (5 of 6) (GOV-2687)**,
    via `bd/roc/declaration-on-registration-of-company-form-i` — the
    Registrar of Joint Stock Companies and Firms' (RJSC) "Form-I:
    Declaration on Registration of Company", the statutory declaration of
    compliance prescribed under section 25 of the Companies Act, 1994. This
    reverses this catalog's own prior finding (recorded alongside the Visa
    vertical's GOV-2677 update) that RJSC's numbered incorporation forms
    were "only mirrored on a third-party legal-services site, not RJSC's own
    domain" — RJSC's own forms portal (`roc.gov.bd`) has since been rebuilt
    on the same Oracle Cloud object-storage pattern already documented
    elsewhere in this registry for Bangladesh's BRTA/DIP forms, and now
    hosts this and companion forms (Form IX, Consent of Director; Form XII,
    Particulars of Directors — disclosed as future companion-schema
    candidates) first-party. See the Business Formation vertical section
    above and the document's own VERIFICATION.md for the full sourcing
    record. **Bangladesh now stands at 5 of 6 verticals** (Taxes, DMV,
    Passport, Visa, Business Formation); **National ID is the sole
    remaining open backlog vertical**, tracked separately.
29. **Bangladesh's National ID & Civic Documents vertical opens, closing
    Bangladesh to 6 of 6 verticals (GOV-2688)**, via
    `bd/nidw/nid-correction-application-form-1` — NIDW's Form-1, the
    National Identity Registration Wing's "Application for Correction of
    Error(s) in the National ID Card or Preserved Data," issued under Rule 3
    of the National Identity Registration Rules. Closes the sole remaining
    open backlog vertical noted in item 28 immediately above. A genuine
    static print-and-fill specimen with zero AcroForm/Widget annotations;
    this cycle's own Bengali text extraction required a post-processing fix
    for a pre-base-vowel-sign reordering artifact in pdfjs-dist's raw output
    before the text was legible. See the National ID & Civic Documents
    vertical section above and the document's own VERIFICATION.md for the
    full sourcing record. **Bangladesh now stands at 6 of 6 verticals**
    (Taxes, DMV, Passport, Visa, Business Formation, National ID) — no
    vertical remains open for Bangladesh.

### Confirmed dead ends (do not re-attempt without new information)

- **CZ Passport** — GOV-1819, 2026-07-08. Both `mv.gov.cz` and
  `portal.gov.cz` state identically that citizens do not complete a printed
  application form for a passport: a clerk enters the applicant's data
  directly into the system and captures biometrics (facial image, plus
  fingerprints over age 12) in person. `mv.gov.cz`'s own "Tiskopisy a vzory"
  (forms library) does not list a passport application PDF. Not a hard dead
  end if a genuinely new source surfaces (e.g. a third-party-republished
  specimen with real field numbers); a dead end for the current official
  publishing pattern.
- **CZ National ID (občanský průkaz)** — GOV-1819, 2026-07-08. The same
  in-person-only pattern as CZ Passport: `portal.gov.cz` explicitly states
  the applicant does not fill out or submit a form; the municipal office
  generates and prints the application electronically from the citizen's
  existing data, and the applicant only verifies and signs it in person.
  `zákon č. 269/2021 Sb., o občanských průkazech` specifies required
  documents, not a field-by-field form layout, since none exists.
- **CZ Schengen (short-stay) visa** — GOV-1819, 2026-07-08. The Ministry of
  Foreign Affairs' own Schengen short-stay visa PDF
  (`mzv.gov.cz/public/fe/ee/98/6103975_3488176_ENGLISH.pdf`) is a confirmed
  field-for-field duplicate of the already-modelled
  `fr/france-visas/schengen-visa-application` (same purpose-of-journey
  checkboxes and funding section, same order) — a confirmed duplicate, not
  an open gap, per this registry's established convention for Poland's,
  Spain's, Portugal's, and Switzerland's equivalent Schengen forms.
- **MY Taxes (LHDN Borang BE/B/M/BT)** — GOV-1783, 2026-07-08. Every
  individual-return category's current-year (2025) PDF
  (`hasil.gov.my`'s own "Muat Turun Borang" download tool, replayed
  directly) carries an `/AcroForm` dict with an empty `Fields[]` array —
  every one is explicitly labelled "Contoh" (specimen), because
  resident-individual filing is mandatory e-Filing only via an
  authenticated SPA (`mytax.hasil.gov.my`). Not a hard dead end for
  Malaysia's Taxes vertical as a whole if e-Filing's mandate ever changes
  or a casilla-numbered guide equivalent surfaces; a dead end for these
  specific PDFs as currently published.
- **MY National ID (JPN MyKad)** — GOV-1783, 2026-07-08. JPN's own
  "Kad Pengenalan" service pages (9 sibling pages for
  replacement/loss/damage/address-change/late-registration) all describe
  an entirely in-person, counter-based, walk-in process with no
  downloadable or fillable application form at all — only a prose
  documents-to-bring checklist. Weaker than a thin specimen PDF; do not
  re-attempt without a genuinely new source (e.g. a published
  MyJanjiTemu pre-registration form).
- **PT Visa (national long-stay visa)** — GOV-1750, 2026-07-08. Portugal's
  national visa application form (`vistos.mne.gov.pt`) shares the same
  harmonized EU long-stay-visa field sequence, field-for-field, as the
  already-modelled `de/auswaertiges-amt/national-visa-application` — a
  confirmed duplicate, not an open gap, per this registry's own established
  convention for Poland's and Spain's equivalent forms. A non-duplicate
  alternative was found but not authored this cycle: AIMA's Modelo 1
  (residence-permit request/renewal, ~30 fields, genuinely Portugal-specific,
  confirmed live) — a real, open backlog candidate for a future cycle, not a
  dead end for Portugal's Visa vertical as a whole.
- **PT Business Formation — now published** (GOV-2143, 2026-07-10), via
  `pt/at/declaracao-inicio-atividade-pessoas-singulares`: this entry's own
  history (GOV-1750, re-confirmed GOV-1797, 2026-07-08) had found IRN's
  "Empresa na Hora" pacto-social specimen PDFs to be scanned images with no
  extractable text layer, and the sole-trader "Início de Atividade"
  self-service route a fully authenticated `acesso.gov.pt` wizard with no PDF
  fallback — both re-confirmed from scratch this cycle (a fresh fetch and
  `pdfjs-dist` extraction of the SUQ-1-08 pacto-social specimen found 0
  characters of text and 0 annotations across all 7 pages). The gap closed
  not via the CSC-statute route this entry's prior note had flagged as the
  likely path (a thin ~14-16 field list), but via a distinct,
  previously-unidentified source: AT's own current "Início de Atividade"
  informational leaflet (março 2026 edition), an unauthenticated, genuine
  text-layer PDF documenting the gated wizard's own field content. See the
  Executive Summary update above and the document's own VERIFICATION.md for
  the full four-candidate sourcing comparison. This gives Portugal 6 of its
  6 verticals.
- **PT Passport (domestic)** — GOV-1750, re-confirmed GOV-1797, 2026-07-08.
  Decreto-Lei n.º 83/2000 Art. 16 confirms ordinary Portuguese passport
  issuance is an in-person, biometric-only process; IRN's own forms library
  has no "Passaporte" category, and neither `gov.pt`'s "Pedir o passaporte
  português para estrangeiros" nor IRN's "Passaporte eletrónico" page links a
  citizen-facing application PDF. **The consular route is not a dead end,
  however: GOV-1833 (2026-07-08) found the Rio de Janeiro consulate's own
  passport-specific `req_psspnovo.pdf`, distinct from the São Paulo
  consulate's National-ID-centric `cc_e_pep_formulario.pdf`, and modelled it
  as `pt/mne/requerimento-passaporte-consular` — closing Portugal's Passport
  vertical.** The domestic (non-consular) route remains a confirmed dead
  end.
- **NL Visa** (Schengen dupes FR; Dutch MVV is 200+ fragmented forms) — GOV-777/GOV-859.
- **PL Visa (national Type D)** — GOV-1691, 2026-07-07. Poland's current
  wzór wniosku o wydanie wizy krajowej (Załącznik nr 2 do Rozporządzenie
  MSWiA z dnia 25 czerwca 2025 r., Dz.U. 2025 poz. 847) shares the same EU
  long-stay-visa field sequence, field-for-field, as the already-modelled
  `de/auswaertiges-amt/national-visa-application` — a confirmed duplicate,
  not an open gap, per this registry's own established convention for
  Spain's equivalent form. Not a hard dead end for Poland's Visa vertical as
  a whole: untested is whether Poland's Schengen short-stay visa pathway (a
  separate form, distinct from the national D-visa checked this cycle)
  offers anything not already covered by `fr/france-visas/schengen-visa-application`.
- **ZA Visa** (eHomeAffairs reCAPTCHA + nationality-gated) — GOV-1225, reconfirmed 2026-07-05.
- **BR Visa** — GOV-1428, 2026-07-06. The SCI wizard
  (`formulario-mre.serpro.gov.br`) is CAPTCHA-gated before any field page;
  the VFS-operated e-visa portal is both nationality-gated (AU/CA/US
  applicants only) and WAF-defended; no official PDF form exists as an
  alternative.
- **CA/ON `mto/vehicle-permit-renewal`** — real-plate-gated live wizard, reconfirmed 3× across cycles.
- **US `gb/hmrc/national-insurance-number-application`**-style GB National Insurance/Marriage Allowance — IP-blocked, GOV-926.
- **Japan MOFA** (`mofa.go.jp`, plus `emb-japan.go.jp` embassy subdomains) —
  fully domain-blocked (HTTP 403) regardless of `User-Agent`; reconfirmed
  GOV-1174's original finding this cycle (GOV-2005) rather than superseding
  it. Distinct from the rest of the `moj.go.jp` family (Immigration
  Services Agency, Legal Affairs Bureau), which is only narrowly
  bot-mitigated (blocks curl's own default `User-Agent` specifically, not a
  browser or this repo's own `verify-sources.mjs` user agent) — see the
  Executive Summary GOV-2005 update.
- **Japan driver's licence application (DMV)** — GOV-2005, 2026-07-09. No
  jurisdiction's police site (National Police Agency, Tokyo Metropolitan
  Police, or the Osaka/Ibaraki/Shiga prefectural police sites checked)
  publishes a downloadable, home-fillable driver's-licence application PDF;
  the licence is applied for/renewed entirely in person, with the paper
  form filled at the licence-centre counter itself. The only genuinely
  extractable-text PDFs found in this vertical (Shiga Prefectural Police's
  proxy/power-of-attorney forms) cover only a narrow third-party-collection
  sub-procedure, not the licence application itself.
- **US federal CDL** (`us/fmcsa/cdl-application-class-a`) — GOV-1215's draft
  premise ("completely new, 0 existing") was wrong:
  `us/ca/dmv/commercial-drivers-license-application` already exists, and
  GOV-1215's field-level 49 CFR citations were never checked against a real
  CFR text or state form. Not a dead end for CDL coverage generally
  (state-level CDL schemas outside California remain open), but this
  specific candidate/research should not be resumed as-is.
- **BR CNH `primeira habilitação` (first driving licence)** — GOV-1400.
  Federal layer is `gov.br`-SSO-gated from the very first step (the
  "CNH do Brasil" app's own `Requerimento`), and every state DETRAN portal
  checked (SP, RJ, PE) equally requires a `gov.br` login for scheduling; no
  federal, unauthenticated, field-level RENACH form source was found (SENATRAN's
  own resolutions describe the card's security/biometric specs, not the
  application form's fields). Not a hard dead end — untested is whether any
  individual state DETRAN publishes the RENACH form's own field list outside
  its authenticated portal; a candidate for a future cycle only if one does.
- **CH Visa (national Type D and short-stay Schengen Type C)** — GOV-1774,
  2026-07-08. Both of SEM's (State Secretariat for Migration) own visa
  application PDFs (fetched directly from `sem.admin.ch`, no login/CAPTCHA/
  WAF gate, both genuine AcroForm PDFs — 71 and 108 widgets respectively)
  are confirmed field-for-field duplicates of already-modelled harmonized
  templates: the short-stay form duplicates the uniform Schengen visa
  application behind `fr/.../schengen-visa`, and the national D-visa form
  duplicates the same EU-model long-stay-visa template already found
  duplicated by Poland's, Spain's, and Portugal's own national visa forms
  against `de/auswaertiges-amt/national-visa-application` — a confirmed
  duplicate, not an open gap. Not a hard dead end for Switzerland's Visa
  vertical as a whole: untested is whether a cantonal residence-permit
  process (Switzerland's cantons administer residence permits, not SEM
  centrally) offers a genuinely distinct, non-duplicate pathway.
- **CH Business Formation (`easygov.swiss`)** — GOV-1840, 2026-07-08. The
  federal one-stop business-registration platform is a pure authenticated
  single-page application (SwissID/CH-Login-based digital signature); its
  own landing page carries no descriptive content beyond a "launch
  application" button, and no downloadable PDF form exists for sole-
  proprietorship (Einzelunternehmen) registration. The "EasyGov-Guide"
  PDFs found via search (hosted on cantonal `startbox.swiss` mirrors) are
  screenshot-and-prose walkthroughs of the live wizard's screens, not a
  fillable or field-documenting specimen. Same class of dead end as
  Portugal's `acesso.gov.pt`-gated sole-trader route.
- **CH Passport (domestic)** — re-confirmed GOV-1840, 2026-07-08 (originally
  found GOV-1804/GOV-1774). `fedpol.admin.ch/de/beantragen` states
  applications are made online or by phone via `ch-edoc-passantrag.admin.ch`
  followed by a mandatory in-person biometric appointment; no downloadable
  citizen-facing PDF exists anywhere in the flow. **Superseded (GOV-1931,
  2026-07-09):** this finding was true (no PDF exists) but incomplete — it
  never rendered the live JS single-page application the process runs on.
  GOV-1931 did, with a real headless-browser session, and found a genuine,
  non-trivial online data-entry tool; see `ch/fedpol/antrag-pass-identitaetskarte`
  and the Executive Summary/Passport-section updates above. No longer a dead
  end.
- **CH National ID (Identitätskarte)** — GOV-1840, 2026-07-08. Shares the
  exact same `fedpol.admin.ch`/`ch-edoc-passantrag.admin.ch` online-
  application-plus-biometric-appointment pathway as the passport (both are
  fedpol-issued documents processed through the same system) — no separate
  citizen-facing PDF application form exists for the ID card either.
  **Superseded (GOV-1931, 2026-07-09):** same correction as CH Passport
  above — `ch/fedpol/antrag-pass-identitaetskarte` closes this gap too,
  through the same schema (the live tool issues both documents via one
  shared field set). No longer a dead end.
- **AR Taxes (AFIP Ganancias/Bienes Personales)** — GOV-2202, 2026-07-10.
  Impuesto a las Ganancias (Personas Humanas) and Bienes Personales are
  both filed exclusively through Clave-Fiscal-login-gated web portals (or
  an installable SIAP desktop aplicativo); F.711/F.762 are output-only
  receipts printed *after* completing the online declaration, not blank
  forms. No downloadable AcroForm or numbered casilla/instructivo guide
  exists for either tax. Do not re-attempt without a genuinely new source
  (e.g. a leaked/third-party-republished blank form with real line
  numbers).
- **IT Passport (Polizia di Stato Modello 308)** — GOV-2382, 2026-07-11.
  The form's own fillable pages are a scanned image with zero extractable
  text (confirmed via `pdfjs-dist` returning no text-content items for
  those pages); only the separate instructions page carries real text. Not
  a self-documenting numbered-position source like Modello 730 or TT2119.
  Do not re-attempt without a genuinely new source (e.g. a re-published
  version with a real text layer on the fillable pages).
- **IT Business Formation (Registro Imprese ComUnica)** — GOV-2382,
  2026-07-11. ComUnica is digital-signature/telematic-only, filed via
  commercialisti (accountant) intermediaries through the Camere di
  Commercio's own telematic channel; there is no plain downloadable
  fillable modulo distributed for direct citizen use. Do not re-attempt
  without a genuinely new source.
- **IT National ID (Carta d'Identità Elettronica)** — GOV-2382, 2026-07-11.
  Fully appointment-based at the comune, with mandatory in-person
  biometric capture (photo, fingerprints, signature); no downloadable
  application form exists for the main flow, the same in-person-only
  pattern this registry has repeatedly confirmed dead-end elsewhere (e.g.
  CZ, MY — see above). Do not re-attempt without a genuinely new source.
- **IT Visa (Farnesina national D-visa)** — GOV-2382, 2026-07-11. The
  Ministero degli Affari Esteri's national (Type D) visa application form
  is a confirmed field-for-field duplicate of the already-modelled
  `de/auswaertiges-amt/national-visa-application` EU-harmonized template,
  the same finding this registry has already reached for Poland's and
  Spain's equivalent forms (see above). Not an open gap.
- **VN National ID (Citizen Identification / CCCD)** — GOV-2404, screened
  2026-07-11. Citizen Identification card issuance/renewal is
  appointment-based with mandatory in-person biometric capture (photograph,
  fingerprints); no downloadable citizen-facing application form exists for
  the main flow, the same in-person-only pattern this registry has
  repeatedly confirmed dead-end elsewhere (CZ, MY, IT — see above). Do not
  re-attempt without a genuinely new source. **Re-confirmed, GOV-2472,
  screened 2026-07-12**: the underlying legal basis has since changed
  (Luật Căn cước 2023, effective 2024-07-01, plus its implementing Thông tư
  17/2024/TT-BCA) but the finding holds and has strengthened — the old
  citizen-completed CC01 declaration form (Thông tư 41/2021/TT-BCA) has
  been formally replaced by a purely system/officer-generated workflow
  (forms CC01-CC05 are now all database-extracted or police-generated; the
  citizen only reviews and signs). There is no longer any fillable
  citizen-facing form to schematize even in principle.
- **PE Passport (Migraciones/RENIEC)** — GOV-2456, screened 2026-07-12
  (re-confirming prior cycles' GOV-2404/GOV-2419/GOV-2426/GOV-2434 notes).
  Passport issuance requires an in-person appointment with mandatory
  biometric capture; no downloadable citizen-facing application form
  exists for the main flow. Do not re-attempt without a genuinely new
  source. **Re-confirmed, GOV-2472, screened 2026-07-12**: Migraciones
  eliminated even the online-appointment step the week of 2026-05-25
  (now 100% in-person, order-of-arrival); the one consular passport-request
  PDF with real field detail is stale (`CreationDate: 2017-06-29`) with an
  empty `/AcroForm/Fields` array, and the Cancillería diplomatic-passport
  form is a scanned-image PDF with no extractable text layer.
- **PE National ID (RENIEC DNI)** — GOV-2456, screened 2026-07-12
  (re-confirming prior cycles' notes). DNI issuance/renewal is either
  in-person-biometric or gated behind RENIEC's own authenticated online
  portal, with no unauthenticated field-by-field source found. Do not
  re-attempt without a genuinely new source. **Re-confirmed, GOV-2472,
  screened 2026-07-12**: RENIEC's Mesa de Partes Virtual and the "DNI
  BioFacial" duplicate-replacement flow are both confirmed login/biometric-
  gated, with no fixed field catalog exposed by either.
- **UY Taxes (DGI individual income tax)** — GOV-2472, screened 2026-07-12.
  The annual IRPF return (Formulario 1102) is filed exclusively through an
  installable desktop aplicativo or the `servicios.dgi.gub.uy` web portal,
  both requiring `gub.uy`/digital-cédula authentication. The one
  downloadable, unauthenticated PDF found under DGI's own site (Formulario
  3100 v04, 2026-01, a dependents-declaration form submitted to an
  employer rather than to DGI directly) carries **0 AcroForm widgets**
  (confirmed via `pdfjs-dist`) — a flat print-and-hand-fill table, not a
  path to the return itself. Do not re-attempt without a genuinely new
  source (e.g. a leaked/third-party-republished blank F.1102 with real
  casilla numbers).
- **UY Passport (DNIC)** — GOV-2456, screened 2026-07-12. Uruguay's
  Dirección Nacional de Identificación Civil (DNIC) issues passports only
  through a login-gated appointment-scheduling channel; `dnic.gub.uy` is
  also TCP-unreachable from this environment on every attempt (an
  infrastructure limitation, not itself the basis for this finding). No
  downloadable, unauthenticated, citizen-facing application form was found.
  Do not re-attempt without a genuinely new source.
- **UY National ID (DNIC cédula de identidad)** — GOV-2456, screened
  2026-07-12. The same DNIC-administered, in-person-biometric-enrollment
  pattern as UY Passport above — no downloadable application form exists
  for the main flow. Do not re-attempt without a genuinely new source.
- **KE Passport** — GOV-2500, screened 2026-07-12. Kenya's Directorate of
  Immigration Services issues the ePassport entirely through eCitizen
  (application/payment online, then mandatory in-person biometric
  enrollment). A legacy bilingual "Form 19 (Revised 2012)" AcroForm (88
  widgets) still circulates on embassy mirrors but is not confirmed current
  — the classic "strong legacy AcroForm superseded by mandatory e-channel"
  pattern. Do not re-attempt without a genuinely new, currently-authoritative
  source.
- **KE DMV (NTSA)** — GOV-2500, screened 2026-07-12. Both driving-licence
  application/renewal and vehicle registration/transfer are handled
  exclusively through the login-gated NTSA TIMS/eCitizen portal; "NTSA Form
  C" (Traffic Act, Cap. 403 §9) still circulates as a 0-AcroForm-widget flat
  PDF on third-party mirrors, described by current guides only as a
  conditional/legacy artifact. Do not re-attempt without a genuinely new
  source.
- **KE Visa (eTA)** — GOV-2500, screened 2026-07-12. Kenya's Electronic
  Travel Authorization system (`etakenya.go.ke`, replacing evisa.go.ke since
  2024-01-05) is a pure online wizard with a hard payment gate (~US$34) and
  no government-published specimen form; only a third-party travel-agency
  guide reconstructs the field list. Do not re-attempt without a genuinely
  new, government-published source.
- **NO Passport** — GOV-2507, screened 2026-07-12. `politiet.no` and
  Norwegian embassies abroad (`norway.no`) both require an in-person
  appointment with biometric photo/fingerprint capture; no downloadable
  application form exists. The one PDF-shaped candidate found via search
  (`norway.no/contentassets/.../passkjema-eng..pdf`) is a Canva-made
  graphic/design document with no `/AcroForm`, `/Widget`, or `/FT` objects
  at the byte level — not an official form. Do not re-attempt without a
  genuinely new source (e.g. a Nordic-style guardian-consent companion form,
  which has closed other Nordic countries' Passport verticals in this
  registry).
- **NO Taxes** — GOV-2507, screened 2026-07-12. Norway's personal tax return
  (skattemelding) is pre-filled automatically from 60M+ third-party data
  points and submitted online/mobile only; the one plausible paper-fallback
  form, RF-1281, is explicitly marked "replaced from income year 2023" with
  no PDF successor found. Business/self-employed filers' RF-1030 states
  outright that paper submissions "will be considered as not submitted" —
  fully electronic-only, ID-porten/Altinn-gated. Do not re-attempt without a
  genuinely new source.
- **CL Passport** — GOV-2507, screened 2026-07-12 (re-confirming GOV-1624).
  Servicio de Registro Civil e Identificación's process is ClaveÚnica
  login → appointment booking → in-person biometric capture for adults and
  minors alike; `registrocivil.cl` is also Radware-bot-manager-CAPTCHA-
  walled. The one guardian-consent-shaped candidate found
  ("Autorización Notarial de Viaje") is a notary-drafted legal deed, not a
  government-hosted fillable document. Do not re-attempt without a
  genuinely new source.
- **CL Visa** — GOV-2507, screened 2026-07-12 (re-confirming GOV-1624).
  Domestic processing (`tramites.extranjeria.gob.cl`) is ClaveÚnica-gated;
  the consular network's current pages instruct applicants to the online
  SAC platform rather than a downloadable form. Two legacy consulate PDFs
  were found and independently fetched/parsed (Washington DC, 88 AcroForm
  fields, dated 2018; Rabat/Morocco, 0 AcroForm fields, dated 2012) — both
  stale, consulate-specific remnants no longer linked from any current
  visa-instructions page. Do not re-attempt without a genuinely new,
  current, generic source.
- **CL National ID (cédula de identidad)** — GOV-2507, screened 2026-07-12
  (re-confirming GOV-1624). Servicio de Registro Civil e Identificación
  requires ClaveÚnica/CedulApp login plus an in-person biometric appointment
  for every path (first cédula, renewal, reprint, foreigner's cédula,
  blocking a lost card). Two PDF candidates were ruled out (a PDI
  instructions sheet whose own text says the requirement it describes was
  already eliminated; a scanned decree with 0 extractable text). Do not
  re-attempt without a genuinely new source.
- **AR National ID (RENAPER DNI)** — GOV-2507, screened 2026-07-12
  (re-confirming and strengthening GOV-2195/GOV-2204's prior note). DNI
  issuance is in-person/biometric-only. The one plausible non-obvious
  candidate, `mininterior.gob.ar`'s "Formulario Único de Toma de Trámite de
  DNI" instructivo, is explicitly an internal RENAPER staff manual (cites
  "impresiones decadactilares" fingerprinting and "uso interno del
  ReNaPer") describing a controlled, pre-numbered/barcoded specimen
  completed by registry staff, not something the public downloads blank. A
  second candidate (`docuest.aaip.gob.ar`, for flagging a lost/stolen DNI)
  is a distinct, login-gated AAIP fraud-prevention SPA, not DNI issuance.
  Do not re-attempt without a genuinely new source.
- **NG DMV** — GOV-2551/GOV-2561, screened 2026-07-12. Driving-licence
  issuance is run by the Federal Road Safety Corps (FRSC) nationally and by
  state motor-licensing authorities, both exclusively through SSO/
  login-gated online portals (e.g. the FRSC's own `nigeriadriverslicense.org`
  / `frsc.gov.ng` licence application flow); no downloadable blank specimen
  PDF was found at any tier. Not a hard dead end if a genuinely new
  third-party-republished specimen surfaces; a dead end for the current
  official publishing pattern.
- **RW National ID (Indangamuntu)** — GOV-2629, screened this cycle. Issuance
  and renewal are entirely IremboGov-portal-gated plus an in-person
  biometric/RIB (National Identification Agency) verification step; no
  fillable specimen or field-by-field walkthrough guide (of the kind that
  made `rw/dgie/passport-application-first-adult` possible) was found for
  this process. Not a hard dead end if a genuinely new source (e.g. a
  support-article walkthrough of the live enrolment SPA) surfaces; a dead
  end for the current official publishing pattern.
- **TH National ID (บัตรประจำตัวประชาชน)** — GOV-2709, screened 2026-07-13.
  Every fetchable PDF (district/amphoe-office "public service guide"
  documents, e.g. `tasailuad.go.th/pdf/sg1_4.pdf` and `kabin.go.th`'s
  equivalent) is a non-fillable, no-`/AcroForm` process manual, not a blank
  application form; DOPA/BORA's own download page
  (`bora.dopa.go.th/download/`) lists only training/legal material, no
  citizen-facing application PDF. Issuance is strictly in-person and
  counter-only: an officer enters data directly into the BORA system and
  captures a live photograph/fingerprint biometrically, printing the
  internal บ.ป.1 request form from the system itself — the applicant never
  fills out a paper form in advance. Do not re-attempt without a genuinely
  new source. This closes out Thailand's screening backlog: Thailand now
  stands at 5 of 6 verticals, with National ID as its sole remaining, and
  now confirmed-dead-end, vertical.
- **GH DMV** — GOV-2716, screened 2026-07-13. `dvla.gov.gh` has been rebuilt
  on a modern stack (Next.js marketing site, Nuxt.js "online services" SPA
  at `service.dvla.gov.gh`), but the online system is fully login-gated
  (email/password wall, no public registration/application form exposed
  before authentication — confirmed by fetching the raw login-page HTML).
  Every web search result confirms the paper driving-licence Forms F/F1 are
  purchased in person at DVLA offices, not published as a downloadable
  specimen. A Wayback Machine CDX sweep of `dvla.gov.gh`'s historical
  `/assets/dvla/media/forms` and `/publications` paths surfaced only a
  driving-school-registration form and non-form publications (public
  notices, e.g. "Change of Ownership of Motor Vehicle" — prose, 0 form
  fields, confirmed via `pdfjs-dist`) — no citizen-fillable driver's-licence
  or vehicle-registration application at any tier found this cycle. Not a
  hard dead end if a genuinely new source (e.g. a leaked/third-party-
  republished Form F/F1 specimen) surfaces; a dead end for the current
  official publishing pattern. This was Ghana's sole remaining open
  vertical — Ghana now stands at 5 of 6 with no open, unscreened backlog
  candidate remaining.
- **JO Business Formation** — GOV-2739, screened 2026-07-13. The Companies
  Control Department (CCD) publishes no fillable registration PDF —
  `www.ccd.gov.jo` itself returns HTTP 451 to a direct fetch, and a Wayback
  capture of its LLC-registration service-description PDF states the
  application is submitted entirely online at `portal.ccd.gov.jo`, which
  exposes only `/account/login` and `/account/companylogin` (no guest/
  unauthenticated "new application" path). A `usermanual.pdf` on the same
  portal describes the e-registration wizard at category/step level only, no
  field-by-field labels. Not a hard dead end if a genuinely new source (a
  field-level guide to the wizard, or a leaked/republished paper form)
  surfaces; a dead end for the current official publishing pattern.
- **JO DMV** — GOV-2739, screened 2026-07-13. The Drivers and Vehicles
  License Department (DVLD) is unreachable at every domain tried this cycle
  (`www.dvld.gov.jo`, `dvld.gov.jo`, `eservices.dvld.gov.jo`, and the Land
  Transport Regulatory Commission's `form.jordan.gov.jo`/
  `portal.jordan.gov.jo` service pages all timed out). The one reachable
  candidate, `gsc.jo/Doc/dll.pdf`, is a flat "Required Documents" checklist
  with no `/AcroForm` — a service-window document list, not an application
  form. Not a hard dead end if the agency domain comes back online or a
  genuinely new source surfaces; a dead end for this cycle.
- **JO National ID & Civic Documents** — GOV-2739, screened 2026-07-13.
  CSPD's own smart ID card service-guide page states the ID card application
  form is obtainable only in person, requiring in-person biometric capture
  (fingerprints, iris). Jordan's voter registration (Independent Election
  Commission) has no applicant-facing registration form at all — election
  cards are auto-generated for every citizen 18+ directly from the
  civil-status database. Do not re-attempt without a genuinely new source.

## Genuinely open, well-sourced candidates (new jurisdictions)

- **Jordan — Taxes: authored (GOV-2731).** The employee/natural-person PIT
  return above (`jo/istd/pit-return-employee`) opened Jordan as the 49th
  jurisdiction — see the Executive Summary's GOV-2731 update. Two companion
  forms remain in the same ISTD directory as open backlog candidates for a
  future cycle: a self-employed-individual PIT return and a corporate
  income tax return (both un-screened this cycle).
- **Jordan — Passport: authored (GOV-2739).** `jo/cspd/passport-application`
  opened Jordan's Passport vertical (2 of 6) — see the Executive Summary's
  GOV-2739 update. **Jordan — Business Formation, DMV, and National ID &
  Civic Documents are now confirmed dead ends** (login-gated e-services
  portals with no downloadable form, or in-person/biometric-only processes —
  see this document's own VERIFICATION.md for the full per-vertical
  screening record).
- **Jordan — Visa: authored (GOV-2746), backlog item resolved.**
  `jo/mfa/visa-application` closed Jordan's Visa vertical (3 of 6) — see the
  Executive Summary's GOV-2746 update. This supersedes the prior cycle's
  open-backlog note above: rather than pursuing the third-party-hosted
  23-field embassy AcroForm ("Visa Application for US & EU countries," found
  only on `traveldocument.com`/`traveldocs.com` mirrors, not a first-party
  government host), this cycle located and authored from a genuine
  first-party MFA specimen (`mfa.gov.jo`) instead. **Jordan now stands at 3
  of 6 verticals with no open, unscreened backlog candidate remaining** —
  Business Formation, DMV, and National ID & Civic Documents are all
  confirmed dead ends (GOV-2739), so Jordan has reached its practical
  maximum vertical coverage under this registry's current sourcing
  standards unless one of those dead ends' underlying blocker changes.
- **Sri Lanka — National ID: authored (GOV-2753), closes 2 of 6.**
  `lk/drp/application-for-a-national-identity-card` closed Sri Lanka's
  National ID & Civic Documents vertical — see the Executive Summary's
  GOV-2753 update. This supersedes the GOV-2716 cycle's open-backlog note
  for Sri Lanka: National ID was screened this cycle and found a genuine,
  first-party, unauthenticated, field-rich AcroForm-free specimen on
  `drp.gov.lk`. **Sri Lanka now stands at 2 of 6 verticals** (Passport,
  National ID); DMV, Business Formation, Taxes, and Visa remain open,
  unscreened backlog candidates for a future cycle.
- **Serbia — Visa: authored (GOV-2760), opens 2 of 6.**
  `rs/mfa/visa-application` opened Serbia's Visa vertical — see the
  Executive Summary's GOV-2760 update. This supersedes the GOV-2753 cycle's
  open-backlog note for Serbia's Visa candidate: independently re-fetched
  from `mfa.gov.rs` and confirmed a genuine, first-party, unauthenticated,
  71-field bilingual specimen. **Serbia now stands at 2 of 6 verticals**
  (Business Formation, Visa); DMV, Taxes, National ID, and Passport remain
  open backlog candidates, with Taxes (PPDG-2R, `purs.gov.rs`, re-confirmed
  live this cycle) the strongest pre-identified candidate for a future
  cycle.
- **Serbia — Taxes: authored (GOV-2767), advances to 3 of 6.**
  `rs/purs/pp-gpdg-godisnji-porez-na-dohodak-gradjana` advanced Serbia's
  Taxes vertical — see the Executive Summary's GOV-2767 update. This
  supersedes the GOV-2760 cycle's open-backlog note naming PPDG-2R as the
  strongest Taxes candidate: PPDG-2R was independently re-confirmed live
  but found to govern only the pre-2022 "by decision" assessment process,
  retired in favor of the self-assessment Form PP GPDG — a disclosed
  substitution, not a silent departure from the pre-scouted lead. PP GPDG
  is filed exclusively electronically with no static blank-form PDF, so
  this schema is sourced from the Tax Administration's own official
  user-instructions PDF instead. **Serbia now stands at 3 of 6 verticals**
  (Business Formation, Visa, Taxes); DMV, National ID, and Passport remain
  open, unscreened-this-cycle backlog candidates for a future cycle.

---

## Methodology

- **Scraping:** `find registry -mindepth 3 -maxdepth 3 -type d` (one entry
  per `<agency>/<process-name>`), cross-checked against
  `tools/govschema-client/registry-index.json` (272 entries, one per
  published version/edition).
- **Classification:** Vertical assigned based on schema id, title, and
  authority.
- **Jurisdiction:** ISO 3166-1 alpha-2 code (AE, AU, BR, CA, CO, DE, FR, GB,
  IE, ID, IN, KR, MX, NL, NZ, PH, SG, US, ZA) — 19 jurisdictions tracked as of
  GOV-1567 (2026-07-07), up from the prior revision's 18.

---

**Generated by:** GOV-1240 Phase 1 research, updated by GOV-1254 (ITR-3
authoring), updated by GOV-1261 (SG IRAS Form C-S authoring), updated by
GOV-1268 (ZA SARS ITR14 Dormant Company authoring), updated by GOV-1275 (ZA
SARS ITR14 Micro Business authoring), updated by GOV-1282 (ZA SARS ITR14
Body Corporate/Share Block authoring), updated by GOV-1289 (South Korea
opened as 13th jurisdiction, `kr/mofa/passport-application-first-adult`
authoring), updated by GOV-1303 (`kr/koroad/driving-licence-application`
authoring, KR DMV vertical closed), updated by GOV-1294
(`kr/nec/overseas-voter-registration` authoring, KR National ID vertical
closed), updated by GOV-1292 (`kr/moj/visa-application` authoring, KR Visa
vertical closed, GOV-1321 research cycle), updated by GOV-1328/GOV-1293
(`kr/nts/year-end-tax-settlement-income-deduction-report` authoring, KR
Taxes vertical closed, global Taxes vertical 13/13), updated by
GOV-1297/GOV-1335 (`ae/fta/vat-registration` authoring, United Arab
Emirates opened as 14th jurisdiction), updated by GOV-1296/GOV-1342
(`br/sp/jucesp/cnpj-registration-dbe` authoring, Brazil opened as 15th
jurisdiction), updated by GOV-1378 (`za/sars/corporate-income-tax-return-itr14-small-business`
authoring, ZA ITR14 4th of 5 Annexures), updated by GOV-1387
(`za/sars/corporate-income-tax-return-itr14-medium-large-business`
authoring, ZA SARS ITR14 corporate-tax gap closed, 5th and last Annexure),
updated by GOV-1393 (`mx/inm/forma-migratoria-multiple-electronica`
authoring, Mexico opened as 16th jurisdiction), updated by GOV-1407
(`br/rfb/individual-income-tax-return-irpf` authoring, Brazil Taxes-vertical
gap closed, 3rd BR schema), updated by GOV-1414
(`mx/sat/preinscripcion-rfc-persona-moral` authoring, Mexico Business
Formation gap closed, 2nd MX schema), updated by GOV-1421
(`ae/icp/visa-single-entry-long-stay-pleasure` authoring, UAE Visa vertical
opened, 2nd AE schema), updated by GOV-1428
(`mx/sat/declaracion-anual-sueldos-salarios` authoring, Mexico Taxes gap
closed, 3rd MX schema, global Taxes vertical 16/16, PR #239 merged 127817d),
updated by GOV-1435 (`mx/semovi/alta-vehiculo-foraneo` authoring, Mexico DMV
gap closed, 4th MX schema, PR #241 merged 1f43204), updated by GOV-1444
(`ph/bir/tin-application-corporations-partnerships` authoring, Philippines
opened as 17th jurisdiction; IE Form CT1 re-examined and re-confirmed a
poor candidate), updated by GOV-1457 (`ph/comelec/overseas-voter-registration`
authoring, Philippines 2nd vertical, National ID & Civic Documents, PR #248
merged 5097780), updated by GOV-1466
(`ph/bir/annual-income-tax-return-1701a` authoring, Philippines 3rd vertical,
global Taxes vertical closed to 17/17 / 100%), updated by GOV-1474
(`ae/icp/emirates-id-replacement` authoring, UAE 3rd vertical, National ID &
Civic Documents, global National ID & Civic Documents vertical closed to
15/17 / 88%), updated by GOV-1483
(`kr/nts/corporation-establishment-and-business-registration` authoring, KR
6th and last vertical, Business Formation, global Business Formation vertical
16/17 / 94%), updated by GOV-1490
(`ph/bi/non-immigrant-visa-application` authoring, Philippines 4th vertical,
Visa, global Visa vertical closed to 14/17 / 82%), updated by GOV-1497
(`ph/dfa/passport-application` authoring, Philippines 5th vertical,
Passport), updated by GOV-1504 (`mx/sre/passport-application` authoring,
Mexico 5th vertical, Passport), updated by GOV-1512
(`ae/rta/vehicle-registration-renewal` authoring, UAE 4th vertical, DMV,
global DMV vertical closed to 15/17 / 88%), updated by GOV-1519
(`ph/lto/drivers-license-application` authoring, Philippines 6th and last
vertical, DMV, global DMV vertical closed to 16/17 / 94%), updated by
GOV-1526 (`br/mg/detran/comunicacao-de-venda-de-veiculo` authoring, Brazil
4th vertical, DMV, global DMV vertical closed to 17/17 / 100%), updated by
GOV-1533 (`ie/dttas/learner-permit-application` authoring, Ireland DMV
sub-process expansion — first-time learner permit application; UAE Passport
re-screened and re-confirmed weak, not picked), updated by GOV-1546
(`id/bkpm/oss-nib-registration-individual-umk` authoring, Indonesia opened as
18th jurisdiction, Business Formation, global Business Formation vertical
closed to 18/18 / 100%), updated by GOV-1553
(`id/korlantas/international-driving-permit-registration` authoring,
Indonesia 2nd vertical, DMV, global DMV vertical closed to 18/18 / 100%),
updated by GOV-1560 (`id/djp/annual-individual-income-tax-return-1770s`
authoring, Indonesia 3rd vertical, Taxes, global Taxes vertical closed to
18/18 / 100%), updated by GOV-1567
(`co/runt/formulario-solicitud-tramites-vehiculo` authoring, Colombia opened
as 19th jurisdiction, DMV, global DMV vertical closed to 19/19 / 100%;
Indonesia's Passport and Visa gaps re-screened and reversed from "not
viable" to ready-to-author backlog candidates), updated by GOV-1574
(`id/imigrasi/passport-application-first-adult` authoring, Indonesia 4th
vertical, Passport, closing the gap GOV-1567 had flagged ready-to-author;
Colombia's overseas voter-registration microsite screened and found
election-window-decommissioned, not a hard dead end), updated by GOV-1602
(`co/cancilleria/visa-application-individual` authoring, Colombia 4th
vertical, Visa, closing the gap GOV-1595 had left open — found via a second,
previously unidentified source distinct from the live wizard's own
bot-mitigation gate; Colombia's Passport and National ID candidates
re-screened and left open backlog candidates), updated by GOV-1616
(`co/registraduria/duplicado-cedula-ciudadania` authoring, Colombia 6th and
last vertical, National ID & Civic Documents, closing the gap three prior
cycles (GOV-1567, GOV-1595, GOV-1602) had each stopped at the same
`www.registraduria.gov.co` HTTP 403 — resolved by finding the service's real
subdomain, global National ID & Civic Documents vertical closed to
16/19 / 84%).

