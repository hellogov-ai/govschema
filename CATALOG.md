# GovSchema Standards Catalog

**As of 2026-07-06** | Comprehensive registry of published government service schemas by jurisdiction and vertical

## Executive Summary

**17 jurisdictions** | **237 published schema documents** (per `tools/govschema-client/registry-index.json`) covering 6 verticals across government services globally.

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
| **Passport** | 14/17 (82%) | **AE, MX** not yet modelled; **PH** screened (GOV-1466) and deliberately deferred — `passport.gov.ph`'s live wizard is real and DOM-walkable, but its Schedule step consumes genuinely scarce real DFA appointment inventory, so this cycle declined to walk further; open backlog candidate, not a dead end; **BR** modelled in a prior cycle (`br/pf/passport-application`) |
| **DMV** | 14/17 (82%) | sub-process/edition expansion (CDL beyond US-CA, IDL beyond US/IE/GB); **AE, BR** not yet modelled; **PH** screened (GOV-1466) — LTO Form No. 21 exists but is only fetchable via a third-party CDN mirror since `lto.gov.ph` itself is Cloudflare-gated; open backlog candidate; **MX** modelled in a prior cycle (`mx/semovi/alta-vehiculo-foraneo`, GOV-1435) |
| **Business Formation** | 15/17 (88%) | sub-process expansion only (sole trader/partnership/LLP in CA/NZ/IE/IN; PH's own Branch/Facility/PEZA-BOI-incentive sub-processes); **KR, AE** not yet modelled; **BR** modelled in a prior cycle (`br/sp/jucesp/cnpj-registration-dbe`); **MX** modelled in a prior cycle (`mx/sat/preinscripcion-rfc-persona-moral`, GOV-1414); **PH** newly modelled this cycle (`ph/bir/tin-application-corporations-partnerships`, GOV-1444), opening the Philippines as the registry's 17th jurisdiction |
| **Taxes** | 17/17 (100%) | sub-process expansion only (corporate tax: SG modelled GOV-1261, ZA's full 5-Annexure ITR14 set now modelled GOV-1268/GOV-1275/GOV-1282/GOV-1378/GOV-1387; IE Form CT1 re-examined and re-confirmed a poor candidate GOV-1444); **BR** modelled in a prior cycle (`br/rfb/individual-income-tax-return-irpf`, GOV-1407); **MX** modelled in a prior cycle (`mx/sat/declaracion-anual-sueldos-salarios`, GOV-1428); **PH** newly modelled this cycle (`ph/bir/annual-income-tax-return-1701a`, GOV-1466), closing the global Taxes vertical to 100% |
| **Visa** | 13/17 (76%) | **NL, ZA, BR** — all three confirmed dead ends (see below), not open work; **PH** screened (GOV-1466) — Bureau of Immigration's CGAF forms (`immigration.gov.ph`) are a genuine, unblocked, directly downloadable candidate, not picked this cycle only because Taxes closed a vertical globally; strong open backlog candidate; **AE** modelled in a prior cycle (`ae/icp/visa-single-entry-long-stay-pleasure`, GOV-1421); **MX** modelled in a prior cycle (`mx/inm/forma-migratoria-multiple-electronica`) |
| **National ID & Civic Documents** | 14/17 (82%) | none genuinely open (SG voter-reg is a confirmed non-gap); **AE, BR, MX** not yet modelled (MX's CURP candidate is in-person/biometric-only); **PH** newly modelled this cycle (`ph/comelec/overseas-voter-registration`, GOV-1457) |

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

### Passport (14/17 jurisdictions)

AU, BR, CA, DE, FR, GB, IE, IN, KR, NL, NZ, SG, US, ZA all have at least one
published Passport schema. India (`in/mea/passport-application-first-adult`,
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
Emirates** has no Passport schema yet — no candidate was sourced for it this
cycle (see the Taxes entry below for the UAE document that was authored).
**The Philippines**, new this cycle (see Business Formation below), also has
no Passport schema yet — not screened this cycle, an open backlog candidate
(DFA e-passport appointment system) for a future one.

### DMV — Vehicle Registration, Licensing, Permits (14/17 jurisdictions)

Every jurisdiction except the United Arab Emirates, Brazil, and (new this
cycle) the Philippines now has at
least one DMV-vertical schema (driver licensing and/or vehicle
registration). **Mexico** (`mx/semovi/alta-vehiculo-foraneo`, GOV-1435) is
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
interactively. Remaining gaps are all **sub-process/edition** expansions
within an already-covered vertical:

- **CDL (commercial driver licence):** only `us/ca/dmv/commercial-drivers-license-application` exists. No CDL-equivalent schema yet for GB (HGV/PCV — `gb/dvla/lorry-bus-provisional-licence` is the closest analogue), DE, FR, IE, IN, NL, NZ, SG, ZA.
- **IDL (International Driving Permit):** covered for US (`dos/international-driving-permit-aaa`, `-aata`), IE (`dttas/international-driving-permit`), GB (`dvla/international-driving-permit`). Not modelled elsewhere.
- **India, GOV-1240:** `in/morth/driving-licence-application` (this cycle) closes the "Issue of New Driving Licence" gap that `in/morth/learners-licence-application` (GOV-878) explicitly scoped out. India's DMV vertical now has 5 schemas (learner's licence, driving licence, vehicle registration, vehicle registration renewal, vehicle ownership transfer).
- **United Arab Emirates** has no DMV schema yet — not researched this cycle (Taxes was the sourced vertical for the new UAE jurisdiction; see below).
- **Brazil** has no DMV schema yet — `br/cnh` first driving licence remains a confirmed dead end (gov.br-SSO-gated, see GOV-1400); vehicle registration (RENAVAM/DETRAN) not yet researched.
- **Mexico:** only the foráneo (out-of-state) private-vehicle registration pathway is modelled (`mx/semovi/alta-vehiculo-foraneo`, GOV-1435); a brand-new-from-dealer registration pathway and driver-licence issuance are open sub-process candidates for a future cycle.

### Business Formation — Incorporation, LLC, Company Registration (15/17 jurisdictions)

Every jurisdiction except South Korea and the United Arab Emirates has at
least one Business Formation schema. **The Philippines** (`ph/bir/tin-application-corporations-partnerships`,
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
WEAK/login-gated in that same research cycle and was not revisited this
cycle. Remaining gaps in the other 15 are sub-process expansions: sole
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

### Taxes — Income Tax Return, Tax Filing (17/17 jurisdictions — 100%)

Every jurisdiction now has at least one Taxes-vertical schema. **The
Philippines** (`ph/bir/annual-income-tax-return-1701a`, GOV-1466) is new
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

### Visa — Entry Visas, ETAs, Work/Student Permits (13/17 jurisdictions)

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

Every other jurisdiction (AE, AU, CA, DE, FR, GB, IE, IN, KR, MX, NZ, SG, US)
has at least one Visa schema. **The Philippines** (new this cycle — see
Business Formation above) has no Visa schema yet; not screened this cycle,
an open backlog candidate. **United Arab Emirates**
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

### National ID & Civic Documents (14/17 jurisdictions)

Every jurisdiction except the United Arab Emirates, Brazil, and Mexico has at
least one National ID and/or voter-registration schema. **The Philippines**
gained its first National ID & Civic Documents schema this cycle
(GOV-1457): `ph/comelec/overseas-voter-registration`, sourced from
COMELEC's public iRehistro web tool (OVF No. 1, Registration application
type only — see that document's own VERIFICATION.md for the seven other
application types left out of scope, and for why `registeredCityMunicipality`
is modelled as an open string rather than an enum). Mexico's CURP
national-ID candidate requires an in-person biometric appointment and was not
sourceable this cycle (GOV-1393) — an open backlog candidate, not a dead end.
Brazil's Carteira de Identidade Nacional (CIN) candidate remains an open but
weak backlog candidate (GOV-1428, 2026-07-06): Decreto nº 10.977/2022
enumerates the finished card's ~20+ printed data attributes, but that's the
card's data schema, not an application form — the decree's actual filing
requirements are just a CPF plus one birth/marriage certificate, too thin to
author a field-level schema from on its own. Singapore's lack of a
voter-registration schema is a **confirmed non-gap**
(GOV-1075): Singapore voting is compulsory and NRIC-linked, with no
citizen-initiated online registration step to model. **South Korea** now has
two National ID documents: `kr/nec/overseas-voter-registration` (GOV-1294),
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
| **AE** | 3 | ✗ | ✗ | ✗ | ✓ | ✓ | ✗ |
| **AU** | 8 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **BR** | 3 | ✓ | ✗ | ✓ | ✓ | ✗ | ✗ |
| **CA** | 8 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **DE** | 12 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **FR** | 9 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **GB** | 15 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **IE** | 11 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **IN** | 15 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **KR** | 7 | ✓ | ✓ | ✗ | ✓ | ✓ | ✓ |
| **MX** | 4 | ✗ | ✓ | ✓ | ✓ | ✓ | ✗ |
| **NL** | 8 | ✓ | ✓ | ✓ | ✓ | ✗ | ✓ |
| **NZ** | 9 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **PH** | 3 | ✗ | ✗ | ✓ | ✓ | ✗ | ✓ |
| **SG** | 11 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **US** | 32+ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
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
   the US and GB.
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
3. **New jurisdictions beyond the current 17** — the standard is meant to be
   global from the start (see AGENTS.md charter). South Korea, the UAE,
   Brazil, Mexico, and (this cycle) the Philippines have each been opened in
   recent cycles (GOV-1289, GOV-1297, GOV-1296, GOV-1393, GOV-1444). Mexico
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
   Colombia-opening cycle (Colombia is not yet in this registry); see
   `ph/bir/tin-application-corporations-partnerships`'s own VERIFICATION.md
   for the full comparison. Candidates worth scouting for an 18th
   jurisdiction in a future cycle: Indonesia (OSS/NIB business
   registration, not screened in detail this cycle), an EU member beyond
   DE/FR/NL — Japan (`mofa.go.jp`) is a confirmed IP-blocked dead end
   (GOV-1174).
4. **India ITR-3's deferred shared schedules**: a future version of
   `in/incometax/individual-tax-return-itr3` could re-derive Schedule S
   (salary), House Property, Schedule CG (capital gains), OS (other
   sources), and the itemised Chapter VI-A deductions against ITR-3's own
   workbook citations, for filers who have both business/professional income
   and salary/house-property/capital-gains/other-source income. Deferred in
   GOV-1254 as a documented scope decision (these schedules are structurally
   identical to `in/incometax/individual-tax-return-itr2`'s already-published
   ones), not a sourcing dead end.

### Confirmed dead ends (do not re-attempt without new information)

- **NL Visa** (Schengen dupes FR; Dutch MVV is 200+ fragmented forms) — GOV-777/GOV-859.
- **ZA Visa** (eHomeAffairs reCAPTCHA + nationality-gated) — GOV-1225, reconfirmed 2026-07-05.
- **BR Visa** — GOV-1428, 2026-07-06. The SCI wizard
  (`formulario-mre.serpro.gov.br`) is CAPTCHA-gated before any field page;
  the VFS-operated e-visa portal is both nationality-gated (AU/CA/US
  applicants only) and WAF-defended; no official PDF form exists as an
  alternative.
- **CA/ON `mto/vehicle-permit-renewal`** — real-plate-gated live wizard, reconfirmed 3× across cycles.
- **US `gb/hmrc/national-insurance-number-application`**-style GB National Insurance/Marriage Allowance — IP-blocked, GOV-926.
- **Japan MOFA** (`mofa.go.jp`) — fully IP-blocked.
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

---

## Methodology

- **Scraping:** `find registry -mindepth 3 -maxdepth 3 -type d` (one entry
  per `<agency>/<process-name>`), cross-checked against
  `tools/govschema-client/registry-index.json` (232 entries, one per
  published version/edition).
- **Classification:** Vertical assigned based on schema id, title, and
  authority.
- **Jurisdiction:** ISO 3166-1 alpha-2 code (AE, AU, BR, CA, DE, FR, GB, IE,
  IN, KR, MX, NL, NZ, PH, SG, US, ZA) — 17 jurisdictions tracked as of
  GOV-1444 (2026-07-06), up from the prior revision's 16.

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
global Taxes vertical closed to 17/17 / 100%) |
Standards Engineer
