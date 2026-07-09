# GovSchema Standards Catalog

**As of 2026-07-09** | Comprehensive registry of published government service schemas by jurisdiction and vertical

## Executive Summary

**27 jurisdictions** | **297 published schema documents** (per `tools/govschema-client/registry-index.json`) covering 6 verticals across government services globally.

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
> disclosed judgment call.

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

### Passport (21/27 jurisdictions — 78%)

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

### DMV — Vehicle Registration, Licensing, Permits (26/27 jurisdictions — 96%)

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

### Business Formation — Incorporation, LLC, Company Registration (24/27 jurisdictions — 89%)

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

### Taxes — Income Tax Return, Tax Filing (26/27 jurisdictions — 96%)

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
the document's own VERIFICATION.md for the full sourcing record.

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

### Visa — Entry Visas, ETAs, Work/Student Permits (18/27 jurisdictions — 67%)

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

### National ID & Civic Documents (21/27 jurisdictions — 78%)

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
| **AU** | 8 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **BR** | 5 | ✓ | ✓ | ✓ | ✓ | ✗ | ✓ |
| **CA** | 8 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **CH** | 2 | ✗ | ✓ | ✗ | ✓ | ✗ | ✗ |
| **CL** | 3 | ✗ | ✓ | ✓ | ✓ | ✗ | ✗ |
| **CO** | 6 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **CZ** | 4 | ✗ | ✓ | ✓ | ✓ | ✓ | ✗ |
| **DE** | 12 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **EE** | 5 | ✓ | ✓ | ✓ | ✓ | ✗ | ✓ |
| **ES** | 5 | ✗ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **FR** | 9 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **GB** | 15 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **ID** | 5 | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| **IE** | 12 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **IN** | 15 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **KR** | 8 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **MX** | 5 | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| **MY** | 3 | ✓ | ✓ | ✗ | ✗ | ✓ | ✗ |
| **NL** | 8 | ✓ | ✓ | ✓ | ✓ | ✗ | ✓ |
| **NZ** | 9 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **PH** | 6 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **PL** | 5 | ✓ | ✓ | ✓ | ✓ | ✗ | ✓ |
| **PT** | 5 | ✓ | ✓ | ✗ | ✓ | ✓ | ✓ |
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
   all, in-person-only) as confirmed dead ends. Malaysia stands at **2 of
   its 6 verticals** (DMV, Passport); Visa remains the sole open,
   unscreened backlog candidate. Other candidates worth scouting for a **26th**
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
   cantonal/appointment-based with no downloadable application form. The
   Czech Republic's DMV gap has since closed too (GOV-1804 follow-up)**, via
   `cz/md/zadost-o-zapis-silnicniho-vozidla` — see the Executive Summary
   update above. **The Czech Republic's Visa gap has since closed too
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
   document's own VERIFICATION.md. The Czech Republic stands at **4 of its 6
   verticals** (Business Formation, DMV, Visa, Taxes); Passport and National
   ID are confirmed dead ends, and Business Formation/DMV/Visa/Taxes's own
   four annexes/sub-processes remain open backlog candidates for a future
   cycle.
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
   Summary update above and the document's own VERIFICATION.md. The
   remaining companion-schedule gap, Hilfsblatt A/B/G, remains an open
   backlog candidate for a future cycle — in substance three separate
   self-employment/agricultural bookkeeping worksheets (Forms 328/329 for
   Hilfsblatt A, 330 for Hilfsblatt B, 331 for Hilfsblatt G) rather than one
   schedule, so most likely three separate future sub-cycles rather than
   one combined effort; none has yet been screened for tractability.
   Switzerland's other 25 cantons each likely publish their own equivalent
   tax-return form, also unpursued.

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
- **PT Business Formation** — GOV-1750, re-confirmed GOV-1797, 2026-07-08.
  IRN's "Empresa na Hora" pacto-social specimen PDFs remain scanned images
  with no extractable text layer (re-fetched and re-checked this cycle); the
  sole-trader "Início de Atividade" self-service route remains a fully
  authenticated `acesso.gov.pt` wizard with no PDF fallback found. Not a hard
  dead end (the Código das Sociedades Comerciais statute itself enumerates a
  thin ~14-16 field list, per GOV-1750's own note) — a real but comparatively
  weak backlog candidate for a future cycle.
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
  citizen-facing PDF exists anywhere in the flow.
- **CH National ID (Identitätskarte)** — GOV-1840, 2026-07-08. Shares the
  exact same `fedpol.admin.ch`/`ch-edoc-passantrag.admin.ch` online-
  application-plus-biometric-appointment pathway as the passport (both are
  fedpol-issued documents processed through the same system) — no separate
  citizen-facing PDF application form exists for the ID card either.

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

