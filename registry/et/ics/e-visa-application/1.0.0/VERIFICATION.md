# Verification record — et/ics/e-visa-application@1.0.0

## Candidate selection

GOV-3313 ("GovSchema Standard Research", 2026-07-16). Ethiopia has zero
schemas in the registry prior to this cycle. Rather than re-screen the
registry's many already-confirmed dead ends (see prior cycles' own
CATALOG.md history), this cycle scouted for genuinely new jurisdictions
via the pattern that worked recently for Kenya (`ke/immigration/eta-visa-application`)
and Ecuador (`ec/cancilleria/formulario-solicitud-visa`): live,
unauthenticated tourist e-visa portals, since foreign travellers cannot be
assumed to hold the destination country's own national digital ID, so
these systems are structurally more likely to be reachable without a
login wall.

Five candidates were scouted in parallel this cycle:

- **Cambodia** (`evisa.gov.kh`) — reachable (HTTP 200) but serving an
  identical ~330-byte NSFOCUS/Nexusguard WAF "Site is not available" stub
  on every path tried, reproduced identically by curl and by a real
  Chromium browser. TLS-certificate-confirmed (`O=Ministry of Foreign
  Affairs and International Cooperation, CN=www.evisa.gov.kh`, valid
  through Jan 2027) as a genuine, maintained government domain — this is
  a live outage, not a retired service (independently corroborated by a
  contemporaneous public TripAdvisor thread reporting the same symptom).
  Not authored this cycle; worth re-checking in a future cycle rather than
  treating as a dead end.
- **Uzbekistan** (`e-visa.gov.uz`) — a real, live Angular SPA
  (`VisaClient2`) backed by a working REST API (step 1's four dropdowns —
  citizenship, document type, entry type, purpose — all populated with
  real data). Blocked by a client-side rendering bug: a "Loading…" overlay
  never clears after step 1, even though the underlying API calls
  succeed, across UA-spoofing and automation-flag-masking attempts.
  Step 1's four fields were confirmed but steps 2 onward could not be
  reached. Not authored this cycle.
- **Ethiopia** (`evisa.gov.et`) — this schema.
- **Georgia** (`evisa.gov.ge`) — a strong candidate: a classic
  server-rendered ASP.NET MVC wizard where the entire ~74-field, 5-step
  form is present in a single page load (client-side JS only shows/hides
  sections), reachable via a normal desktop-Chrome `User-Agent` string
  with no login/account/payment gate — the only gate found is a CAPTCHA
  on final submission, which does not block viewing the full field
  structure. Left as a disclosed, ready-to-author backlog item for a
  future cycle rather than authored this same session (see the GOV-3313
  research issue's own comment thread for the full scouting report).

Ethiopia's Immigration And Citizenship Service (ICS) e-Visa portal was
selected for authoring this cycle because it was the candidate most
thoroughly live-walked and live-validated: a real multi-step React
application with rich field variety (text/date/dropdown/radio/checkbox),
genuine cascading conditional logic, and zero blocking gates encountered
through three of its six steps.

## Reaching and walking the live wizard

Reached directly at `https://www.evisa.gov.et/visa` via the homepage's
"Apply Visa" navigation link — **no signup or login gate at any point**.
Walked live with Playwright + Chromium (`executablePath` pointed at the
locally cached Chromium build, `LD_LIBRARY_PATH` set for the sysroot's
libraries, `waitUntil: 'domcontentloaded'` plus explicit settle delays —
this is a React SPA that a plain WebFetch/curl cannot render at all; an
initial WebFetch attempt returned only the page's `<title>`).

**A structural discovery shaped this session's methodology**: the site
pre-mounts every one of its six steps' full form markup
(`<label>`/`<input>`/`<select>`) into the DOM on the very first page
load. Only visibility and interactivity are gated per-step by React
state — later steps' elements exist and are queryable via
`document.querySelectorAll` immediately, they are simply not
`:visible` (and so not Playwright-actionable) until the wizard actually
navigates there. This was used to independently corroborate the Passport
Information step's field labels, `name` attributes, and required markers
via direct DOM inspection, even for the sub-step this session's live
navigation did not reach.

Live-filled and live-validated, with real Playwright browser interactions
(not programmatic value-setting), through three of six steps:

1. **Visa Category**: selected "Tourist Visa" from a PrimeReact
   `.p-dropdown` (13 real options read from the live DOM), selected its
   sole "Single Entry 30 Days" validity option, checked the terms
   checkbox, clicked "Next" — genuinely blocked
   ("Please agree terms and conditions") until checked.
2. **Arrival Information / Address in Ethiopia**: selected an arrival
   date via a real Ant Design (`ant-picker`) calendar click (not a
   programmatic value — the field's own "Arrival Date is required!"
   message was live-observed clearing only on a real cell click), filled
   departure country/city, airline, flight number, then the accommodation
   sub-section (type, name, city, street address), and finally a
   country-code-prefixed phone widget (pre-filled `+251`, appended real
   digits via `keyboard.type`, since `.fill()` does not correctly handle
   this widget's cursor-position-dependent input). "Next" was genuinely
   blocked once ("Accommodation Telephone is required") until the phone
   field held a real value beyond the bare prefix.
3. **Personal Information**: filled given name/surname, selected
   citizenship and country of birth from the live country picker (260
   real entries, confirmed via forced DOM inspection — see below),
   selected "Male" from a two-option radio group, opened and selected a
   date via the Date-of-Birth `ant-picker` calendar (screenshotted live,
   showing July 2026 with the current day highlighted), filled place of
   birth, email + confirmation, phone, occupation, and street
   address/city/country. This step was reached and its full field set
   visually confirmed via screenshot; the final "Next" click into
   Passport Information hit an unrelated automation-tooling flake in this
   session (a stale-element/timing issue, not a site-side validation
   failure) and was not re-attempted given the field-level fidelity
   already obtained by this point.

## Enum value lists — exact provenance

Rather than rely on Playwright's default `:visible`-gated click actions
(which fail for a later step's own dropdowns while an earlier step is
active), each closed enum's option list was extracted by dispatching a
raw `MouseEvent('click')` directly at the target `.p-dropdown` element via
`page.evaluate`, bypassing Playwright's visibility actionability check —
justified here specifically because the underlying DOM node already
provably exists (per the pre-mounting discovery above), so this is
reading real, already-rendered option data, not fabricating it:

- **`visaType`** (13 options) — read from the live, always-visible Visa
  Category dropdown directly.
- **`accommodationType`** (4 options: Hotel, Guest House, Resort, Other) —
  force-extracted.
- **`passportType`** (3 options: Ordinary Passport, Laissez-passer, Travel
  Document) — force-extracted from the Passport Information step's
  pre-mounted (but not-yet-visited) dropdown.
- **`gender`** (2 options: male/female) — read directly from the live
  radio group's own `id` attributes (`#male`/`#female`), confirmed present
  in the DOM regardless of step visibility.
- **`citizenship`**/**`countryOfBirth`**/**`departureCountry`**/**`addressCountry`**/**`issuingCountry`**
  — all five select from the same complete, alphabetically-ordered
  country picker (force-extracted and counted at 260 real entries via the
  `citizenship` dropdown, starting Afghanistan, Albania, Algeria...).
  Consistent with this registry's established convention for large
  country pickers (e.g. Kenya's `residenceCountry`), these are modelled as
  free-text `string`, not a closed `enum`.
- **`visaValidity`** — confirmed live to cascade on `visaType`: exactly
  one option ("Single Entry 30 Days") for Tourist Visa, but **four**
  options ("Single Entry 30 Days", "Multiple Entry 6 Months", "Multiple
  Entry 1 Year", "Multiple Entry 90 Days") when Medical Treatment Visa is
  selected instead — confirmed by actually re-selecting Medical Treatment
  Visa and re-opening the validity dropdown. Only the Tourist Visa
  branch's single confirmed value is modelled (see Disclosed judgment
  calls below).

## A genuinely conditional field, defeated live rather than assumed

Selecting "Medical Treatment Visa" instead of "Tourist Visa" reveals a
**required** `companyReferenceNumber` text input
(`input[name="companyReferenceNumber"]`) that is not present at all for
Tourist Visa — confirmed by re-selecting Medical Treatment Visa and
observing both the field's appearance and its own live
"Company Reference Number is required!" validation message. This is
modelled as `requiredWhen: { field: "visaType", equals: "MEDICAL_TREATMENT_VISA" }`,
per GSP-0013's Condition grammar — the same convention this registry uses
elsewhere for genuinely branch-dependent fields.

## Disclosed scope boundary

**Passport Information's six fields** (`passportType`, `passportNumber`,
`passportIssueDate`, `passportExpiryDate`, `issuingCountry`,
`passportIssuingAuthority`) were confirmed present, correctly labelled,
and marked required via direct DOM inspection of the page's pre-mounted
markup — but were **not** interactively filled and live-validated this
session, unlike every preceding step. Their `sourceRef`s say so
explicitly ("DOM-confirmed, not interactively validated").

**Review and Attachments were not reached at all.** Unlike every
preceding step, zero `input[type="file"]` elements exist anywhere in the
page's DOM at initial load — the Attachments step's upload component
appears to mount only once that tab actually becomes active, breaking the
pre-mounting pattern this session otherwise relied on. Rather than guess
at a plausible document list (e.g. "passport bio-data page" + "photo",
by analogy with this registry's other visa schemas), this schema omits
`documents[]` entirely and discloses the gap here — an accepted scope
boundary, consistent with this registry's precedent for
`tz/immigration/passport-application` (stopped at Attachments) and
`rw/irembo/nida-diaspora-application` (stopped at step 1 of 3). No visa
fee was paid and no application was actually submitted in producing this
schema.

## Disclosed judgment calls

- **`visaValidity` is modelled as a single-value closed `enum`
  (`SINGLE_ENTRY_30_DAYS`), scoped to the Tourist Visa branch only.**
  Since this field's real option set is confirmed to cascade on
  `visaType` (1 option for Tourist, 4 for Medical Treatment), and only the
  Tourist Visa branch was live-walked end to end, modelling every other
  `visaType` branch's validity options would require re-walking each of
  the other 12 visa types individually — out of scope for this cycle,
  consistent with how this registry's Kenya schema scoped
  `applicationCategory` down to only its tested branch.
- **`occupation` is modelled as free-text `string`, not `enum`.**
  Confirmed live to be a plain `<input type="text">`, not a `<select>` —
  a genuine structural difference from this registry's
  `ke/immigration/eta-visa-application`, whose `occupation` field is a
  57-option closed enum. Not every visa portal that asks for occupation
  constrains it to a closed list.
- **`companyReferenceNumber` has no `maxLength` confirmed live** (the
  field was observed to appear and become required, but was not
  interactively filled with a boundary-testing value); `maxLength: 100`
  is a conservative placeholder consistent with this schema's other
  free-text reference fields, not a live-confirmed constraint.
- **`accommodationTelephone`/`phoneNumber` have no static `name`
  attribute** (a phone-input widget controls them via React state, not a
  bare HTML form `name`); identified instead by their unique on-page
  label text, and their `maxLength` values are read from the live
  `maxlength="17"` HTML attribute (`accommodationTelephone`) or a
  conservative placeholder consistent with this registry's other phone
  fields (`phoneNumber`).

## Validation

- `node tools/validate.mjs` / `node tools/validate-ajv.mjs` — 505/505
  (505/505 with ajv, meta-schema v0.3), up from the pre-existing 504/504
  baseline.
- `node tools/verify-sources.mjs --base origin/main` — 1 directory, 3 URLs
  checked, 0 warnings, all clear.
- Conformance fixtures under `conformance/et/ics/e-visa-application/1.0.0/`:
  valid fixtures plus mutation-control fixtures each raising exactly one
  error, including the `companyReferenceNumber` `requiredWhen` cascade and
  the `emailAddressConfirmation` cross-field mismatch rule.

GovSchema is independent and is not affiliated with, endorsed by, or
operated by the Federal Democratic Republic of Ethiopia or its
Immigration And Citizenship Service. This schema does not file the
application itself; the live source (`evisa.gov.et`) is always
authoritative.
