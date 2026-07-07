# GovSchema Standards Catalog

**As of 2026-07-07** | Comprehensive registry of published government service schemas by jurisdiction and vertical

## Executive Summary

**20 jurisdictions** | **261 published schema documents** (per `tools/govschema-client/registry-index.json`) covering 6 verticals across government services globally.

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
| **Visa** | 14/17 (82%) | **NL, ZA, BR** — all three confirmed dead ends (see below), not open work; **PH** newly modelled this cycle (`ph/bi/non-immigrant-visa-application`, GOV-1490), closing the candidate this catalog's own "Known Gaps" note had flagged as strong and open; **AE** modelled in a prior cycle (`ae/icp/visa-single-entry-long-stay-pleasure`, GOV-1421); **MX** modelled in a prior cycle (`mx/inm/forma-migratoria-multiple-electronica`) |
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

### Passport (17/20 jurisdictions)

AU, BR, CA, DE, FR, GB, IE, IN, KR, MX, NL, NZ, PH, SG, US, ZA all have at
least one published Passport schema. **Colombia**, opened via its DMV
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

### DMV — Vehicle Registration, Licensing, Permits (20/20 jurisdictions — 100%)

Every jurisdiction has at least one DMV-vertical schema (driver licensing,
International Driving Permit, and/or vehicle registration/transfer/sale).
**Chile** (`cl/sii/aviso-venta-vehiculo`, GOV-1638) closes the vertical back
to 100% this cycle — SII's own Formulario 1816, "Aviso de Venta de
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
interactively. Remaining gaps are all **sub-process/edition** expansions
within an already-covered vertical:

- **CDL (commercial driver licence):** only `us/ca/dmv/commercial-drivers-license-application` exists. No CDL-equivalent schema yet for GB (HGV/PCV — `gb/dvla/lorry-bus-provisional-licence` is the closest analogue), DE, FR, IE, IN, NL, NZ, SG, ZA.
- **IDL (International Driving Permit):** covered for US (`dos/international-driving-permit-aaa`, `-aata`), IE (`dttas/international-driving-permit`), GB (`dvla/international-driving-permit`). Not modelled elsewhere.
- **India, GOV-1240:** `in/morth/driving-licence-application` (this cycle) closes the "Issue of New Driving Licence" gap that `in/morth/learners-licence-application` (GOV-878) explicitly scoped out. India's DMV vertical now has 5 schemas (learner's licence, driving licence, vehicle registration, vehicle registration renewal, vehicle ownership transfer).
- **United Arab Emirates:** only the vehicle-ownership renewal pathway is modelled (`ae/rta/vehicle-registration-renewal`, GOV-1512); first-time vehicle registration and driver-licence issuance are open sub-process candidates for a future cycle.
- **Brazil:** only the seller-side sale-notification filing is modelled (`br/mg/detran/comunicacao-de-venda-de-veiculo`, GOV-1526, Minas Gerais); `br/cnh` first driving licence remains a confirmed dead end (gov.br-SSO-gated, see GOV-1400), and the buyer-side CRV/ATPV-e ownership-transfer paperwork and full first-time/new-vehicle registration remain open sub-process candidates for a future cycle, contingent on finding a genuine citizen-facing application form for either (as opposed to a staff manual or a system-generated output) from a non-gov.br-gated state DETRAN.
- **Mexico:** only the foráneo (out-of-state) private-vehicle registration pathway is modelled (`mx/semovi/alta-vehiculo-foraneo`, GOV-1435); a brand-new-from-dealer registration pathway and driver-licence issuance are open sub-process candidates for a future cycle.
- **Philippines:** only the Type A ("new") SP/DL/CL pathway is modelled (`ph/lto/drivers-license-application`, GOV-1519); the other ten `typeOfApplication` transaction types (renewal, conversion of foreign licence, additional code/category, etc.) share the same form but their distinct downstream document requirements are open sub-process candidates for a future cycle.
- **Indonesia:** only the International Driving Permit (SIM Internasional) registration pathway is modelled (`id/korlantas/international-driving-permit-registration`, GOV-1553); first-time national SIM (driving licence) issuance and vehicle registration (STNK/BPKB) remain open sub-process candidates for a future cycle, contingent on a genuine field-level, unauthenticated source becoming available (see the document's own VERIFICATION.md for what was screened and rejected this cycle).

### Business Formation — Incorporation, LLC, Company Registration (20/20 jurisdictions — 100%)

**Chile**, opened this cycle (GOV-1624) via
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

### Taxes — Income Tax Return, Tax Filing (19/20 jurisdictions — 95%)

This vertical was at 100% (19/19) immediately before this cycle; **Chile**,
opened this cycle (GOV-1624) via its Business Formation vertical
(`cl/sii/inicio-actividades-personas-naturales`), does not yet have a
dedicated annual income-tax-return schema of its own — the SII's Formulario
22 (Renta) is an open, unscreened backlog candidate for a future cycle.
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

### Visa — Entry Visas, ETAs, Work/Student Permits (16/20 jurisdictions)

**Chile**, opened this cycle (GOV-1624) via Business Formation, has no Visa
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

### National ID & Civic Documents (17/20 jurisdictions — 85%)

**Brazil** now has a National ID & Civic Documents schema:
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
| **AU** | 8 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **BR** | 5 | ✓ | ✓ | ✓ | ✓ | ✗ | ✓ |
| **CA** | 8 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **CL** | 2 | ✗ | ✓ | ✓ | ✗ | ✗ | ✗ |
| **CO** | 6 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **DE** | 12 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **FR** | 9 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **GB** | 15 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **ID** | 5 | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| **IE** | 12 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **IN** | 15 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **KR** | 8 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **MX** | 5 | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| **NL** | 8 | ✓ | ✓ | ✓ | ✓ | ✗ | ✓ |
| **NZ** | 9 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **PH** | 6 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
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
   Visa, National ID) are open, unscreened-or-lightly-screened backlog
   candidates for a future cycle. Candidates worth scouting for a 21st
   jurisdiction in
   a future cycle: Spain (AEAT's Modelo 030 is a strong, genuinely
   unauthenticated PDF candidate, screened but not picked this cycle — see
   GOV-1624's own VERIFICATION.md), Argentina, Peru, Portugal, Poland, or an
   EU member beyond DE/FR/NL — Japan (`mofa.go.jp`) is a confirmed IP-blocked
   dead end (GOV-1174).
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

