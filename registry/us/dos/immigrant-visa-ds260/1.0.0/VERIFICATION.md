# Verification record — `us/dos/immigrant-visa-ds260` v1.0.0

This file is the source-review record for this document version, per the
[`manual-source-review-v1`](../../../../../practices/manual-source-review-v1.md)
practice.

## Current claim

- **`status`:** `draft`
- **`verification.method`:** `manual-source-review-v1`
- **`verification.lastVerifiedAt`:** `2026-07-02`

`draft`, not `verified`, because the live DS-260 application itself sits behind
CEAC's authenticated case session (an NVC case number plus invoice ID, or a
Diversity Visa case number plus principal applicant date of birth) that this
environment cannot pass without a genuine, currently-pending immigrant visa
case. See "What was not done" below.

## Sources examined

- **Document `(id, version)`:** `us/dos/immigrant-visa-ds260` / `1.0.0`
- **Spec version:** GovSchema `0.3.0`
- **Authority:** U.S. Department of State, Bureau of Consular Affairs (DOS).
- **`https://travel.state.gov/content/dam/visas/DS-260-Exemplar.pdf`** — "DS-260
  IV Application SAMPLE" (Bureau of Consular Affairs, Consular Systems and
  Technology, dated October 2019). Fetched live via `curl` (HTTP 200), rendered
  page-by-page with `pdfjs-dist` + `canvas` (no text-layer OCR needed — every
  page is a full-resolution screenshot of the live CEAC UI), then visually read
  with the multimodal `Read` tool. This is the primary, strongest source: 111
  pages walking every CEAC screen for this form — Sign In, Summary, Getting
  Started, Personal Information 1–2, Present/Previous Address, Mailing/Permanent
  Address, Family Information (Parents, Spouse, Previous Spouse, Children),
  Previous U.S. Travel, Present/Previous/Additional Work-Education-Training,
  Petitioner, all eight Security and Background sub-pages (Medical and Health,
  Criminal, Security 1, Security 2, Immigration Law Violations 1–2,
  Miscellaneous 1–2), Social Security Number, and Sign and Submit — each page
  captioned with the exact branch/answer combination it illustrates (e.g. "Answered
  'Yes' to the question 'Have you ever used other names...'"), letting the
  branching logic be read directly off the government's own illustrative
  screenshots rather than inferred from prose.
- **`https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/forms/online-immigrant-visa-forms/ds-260-faqs.html`**
  — "DS-260 Immigrant Visa Electronic Application" FAQ. Fetched live, 2026-07-02.
  Confirms the CEAC case-access precondition (NVC case number + invoice ID, or
  DV case number + principal applicant date of birth), the "most fields
  mandatory, 'Does Not Apply' where offered" completion rule, and the
  20-minute idle-session save/logout behavior — all still current as of this
  review, corroborating that the 2019 exemplar's screen flow has not
  structurally changed.
- **`https://travel.state.gov/content/travel/en/us-visas/immigrate/the-immigrant-visa-process/step-5-collect-financial-evidence-and-other-supporting-documents/step-6-complete-online-visa-application.html`**
  — "Step 6: Complete Online Visa Application (DS-260)". Fetched live,
  2026-07-02. Confirms the PAID-status precondition, the CEAC "START NOW"
  entry point, and that submitting the DS-260 does not itself formally execute
  a visa application (the interview does).
- **`https://eforms.state.gov/Forms/ds260.PDF`** — the official eforms stub for
  DS-260. Examined but not used as a field source: it is a one-page notice
  stating "This form is completed online," with no field content, confirming
  DS-260 has no separate fillable-PDF form (unlike DS-11/DS-64/DS-82).

## What was not done — the one honest gap

No live walkthrough of the CEAC DS-260 wizard itself (`ceac.state.gov`) was
performed. Access requires a real, currently-pending immigrant visa case (an
NVC-issued case number and invoice ID, or a Diversity Visa case number and the
principal applicant's date of birth) — there is no sandbox/test case in this
environment, and fabricating one would mean submitting an invented case claim
into a live federal consular-processing system used for actual visa
adjudication. This is the same discipline this registry applies to every other
authenticated/login-gated government service (see `us/cbp/esta-application`,
`nz/dia/realme-verified-identity`, and — for the same CEAC system — this
schema's own sibling `us/dos/nonimmigrant-visa-ds160`, which independently hit
the identical case-login wall for DS-160 and used a different, comparably
strong substitute source: an OMB-cleared printed-form reproduction rather than
this schema's screenshot walkthrough).

Consequently: the exemplar PDF is dated **October 2019**, roughly seven years
before this review. The two 2026-fetched guidance pages above corroborate that
the case-access precondition, field-completion rules, and session behavior are
unchanged, but neither republishes the DS-260's exact current field inventory,
so a field CEAC has since added, removed, or renamed since 2019 would not be
caught by this review. This is a genuinely different (and, this schema argues,
stronger) sourcing grain than a marketing/FAQ page — it shows literal rendered
screens and their branching captions, not summarized prose — but it remains one
grain below a direct, current-day field-by-field form comparison. `status`
stays `draft` for this reason.

## Modelling decisions

- **No structural repeat/array construct exists in spec v0.3.** GovSchema
  v0.3's `field` object has no `array`/list type (§6.3 permits only `string`,
  `number`, `integer`, `boolean`, `date`, `enum`, `file`, `object`). DS-260 has
  many sections the live form lets an applicant repeat via an "Add Another"
  control: other names used, previous addresses, additional phone numbers,
  additional email addresses, social media platforms, other nationalities,
  previous U.S. visits, previous spouses, children, previous employers,
  educational institutions, countries visited, and periods of military
  service. Following this registry's existing precedent for the same
  constraint (`us/dos/passport-application-ds11`'s `otherNamesUsed`, a single
  free-text field for an unbounded list of prior names), every repeatable
  *structured* group in this schema (e.g. one child, one previous employer, one
  previous spouse) is modelled as the flat field set for **one representative
  entry**, with each field's `description` stating that the live form supports
  additional entries via "Add Another." This is a genuine gap worth flagging
  to the Founding Engineer as a possible future spec proposal (a bounded
  repeat-group construct), not something this routine authoring task should
  invent unilaterally.
- **Opaque single-string address fields**, for father/mother/spouse/petitioner/
  preparer current addresses and the previous-employer/institution addresses,
  follow the same "carried opaquely" precedent as
  `ca/on/registration/business-incorporation`'s `directorAddressForService`:
  the exemplar shows these as a labelled multi-box subform (street/city/state/
  postal/country) but this schema collapses each to one field rather than
  re-deriving a fresh per-entity address object shape not otherwise used
  elsewhere in this document, and notes the shape in the field description.
  Present/permanent/mailing addresses on the applicant's own Address and Phone
  and Mailing and Permanent Address steps — which the exemplar shows as the
  primary, most-scrutinized address entry — are instead modelled field-by-field
  (line 1/2, city, state/province, postal code, country) for full fidelity.
- **Every Security and Background screening question is a boolean paired with
  a conditionally-required `Explanation` string field**, `visibleWhen`/
  `requiredWhen` the boolean is `true` — this is exactly what the exemplar
  shows: each Yes/No question under Medical and Health, Criminal, Security 1–2,
  Immigration Law Violations 1–2, and Miscellaneous 1–2 reveals its own
  "Explain" textarea only when answered Yes. The sole exception is
  `hasVaccinationDocumentation` (the only positively-framed question in that
  set — Yes is the compliant answer), which the exemplar shows with no Explain
  box even when answered Yes, so this schema omits an explanation field for it.
  `us/cbp/esta-application`'s nine VWP eligibility booleans were considered as
  a simpler alternative pattern but were not followed, because ESTA's live form
  genuinely has no explanation field for a Yes answer — DS-260's does, per
  direct visual confirmation of the exemplar screenshots, and modelling to the
  weaker ESTA-style pattern would have dropped real fields the source shows.
- **`currentMaritalStatus` gates the entire `family_spouse` step** (`visibleWhen`
  requiring `married` or `separated`), matching the exemplar's own sidebar,
  which omits the "Spouse" navigation entry entirely for an unmarried
  applicant's demo fill (confirmed by comparing the Parents-step and
  Spouse-step screenshots, whose left-hand navigation differs exactly on this
  point).
- **`everBeenInUS` gates both Immigration Law Violations 1 and 2 the same way**
  in the underlying live form (per the exemplar's own captions: "Displayed for
  all applicants who answered 'Yes' to 'Have you ever been to the U.S.?' on the
  Previous U.S. Travel page"), but this schema only encodes that gate
  explicitly in Immigration Law Violations 2's field descriptions —
  Immigration Law Violations 1 renders for all applicants per its own
  caption ("Displayed for all applicants"). This asymmetry is taken directly
  from the two sections' distinct captions, not assumed.
- **Occupation and visa-classification enumerations** (`primaryOccupation`,
  `intendedUSOccupation`, `spouseOccupation`, `lastVisaClassification`) are
  populated from the option lists spelled out in the exemplar's own captions
  (e.g. page 41's full enumerated primary-occupation list); `lastVisaClassification`
  is modelled as an open string rather than a closed enum because the exemplar
  does not spell out that particular dropdown's full option list the way it
  does for occupation.
- **No `documents[]` member.** The DS-260 itself collects no fee and no
  applicant-uploaded file during the online application (photo and biometric
  collection happen separately, at the in-person interview); the only
  file-adjacent artifact visible in the exemplar (the CAPTCHA image on the
  Sign and Submit page) is a live-form anti-automation control, not applicant
  input, and is intentionally not modelled as a field.
- **CAPTCHA and the "Sign and Submit Application" button are intentionally
  excluded** from `fields` for the same reason: they are live-session
  mechanics, not data the applicant supplies about themselves.

## Out of scope

- **The CEAC account/case-creation flow itself** (NVC case setup, fee payment,
  DS-261 choice of agent/address) — this schema begins at the DS-260 form
  proper, consistent with the source's own "Step 6" framing (DS-261 and fee
  payment are earlier steps).
- **The consular interview and post-DS-260 document review** — the source is
  explicit that submitting DS-260 does not formally execute the visa
  application; that happens at interview.
- **Diversity Visa (DV)-only field variants** are noted where the exemplar
  calls them out (e.g. certain Present Work/Education fields "displayed only
  for Diversity Visa (DV) principal applicants") but are not separately
  modelled as their own conditional fields, since this schema targets the
  general family/employment-based DS-260 flow, consistent with this
  registry's scope (individuals, not DV-specific sub-processes) and with the
  DS-160 sibling's own scoping choice.

## Re-verification

Per the practice's cadence, `nextReviewBy` is set to **2027-01-02** (6 months).
Re-check the FAQ and "Step 6" pages above at that time, and attempt a fresh
search for a more current BCA screenshot walkthrough than the October 2019
exemplar. If a future session gains legitimate access to a live, in-progress
CEAC case (e.g. via a cooperating applicant or an official DOS sandbox, should
one ever exist), re-verify by direct form walkthrough and promote `status` to
`verified`, per `de/finanzamt/tax-identification-number`'s precedent.
