# Verification record — ge/mfa/evisa-application@1.0.0

## Candidate selection

GOV-3313 ("GovSchema Standard Research", 2026-07-16) scouted Georgia's
e-Visa portal alongside four other candidates while looking for a new
jurisdiction, found it a strong, ~74-field, unauthenticated candidate, but
authored Ethiopia instead that cycle and left Georgia as disclosed
backlog (see this registry's own CATALOG.md "Known Gaps & Opportunities"
section, entry "GOV-3313 — Georgia"). This cycle (GOV-3321) picked up
that candidate and authored it. Georgia had no prior schema of any kind
in this registry; this opens it as the registry's 65th jurisdiction with
one vertical (Visa).

## Reaching the live source

Fetched `https://evisa.gov.ge/GeoVisa/en/VisaApp` twice this session with
a plain `curl`, using a standard desktop Chrome User-Agent string (the
root domain and some mirrors WAF-block a default headless/no-UA
fingerprint, but succeed immediately once a normal UA is set — this was
independently reconfirmed, matching the prior cycle's own note):

- HTTP 200, `Content-Type: text/html; charset=utf-8`, `Content-Length: 95545`
- sha256 `98ed9f59219a74850b6aee3b2ec0a145ae73a1349bb92f78085f760e0c80b652`
  both times.
- Response headers confirm `Server: Microsoft-IIS/10.0`, `X-AspNetMvc-Version: 4.0`,
  `X-AspNet-Version: 4.0.30319`, and a custom `Server: MFA of Georgia` header —
  a genuine, government-operated ASP.NET MVC application, not a CDN/WAF stub.

No login, account creation, or payment gate blocks reaching or reading
this page.

## Structure of the source: one ViewModel, one step visibly rendered

This is a single server-rendered page whose one `<form>` element spans
the *entire* wizard's underlying C# ViewModel — not five separate partial
views. Only the first step, "Citizenship/Country" (marked `class="active"`
in the page's own `wizard-steps` navigation table, and delimited by an
explicit `<!-- #region Citizenship Step --> ... <!-- #endregion Citizenship Step -->`
HTML comment pair), renders its inputs as normal, visible, interactive
controls (`<select>`, `<input type="checkbox">`, `<input type="text">`).
Every other step's fields — Travel Information, Terms & Conditions,
Personal Information, and Verification — are already present in the same
HTTP response, but as `type="hidden"` inputs with empty/default values.
This is the standard ASP.NET MVC pattern of serializing the full model as
hidden fields to preserve state across postbacks; it is not evidence that
those steps are independently reachable without a server round-trip (they
are not — see below).

Critically, ASP.NET's unobtrusive client validation auto-generates
`data-val-required`/`data-val-date`/`data-val-number`/`data-val-range`
attributes directly from the underlying model's own C#
`[Required(ErrorMessage="...")]`/`[Range(...)]` attributes. These
attributes are present on the hidden inputs for every later step exactly
as they would be on the visible inputs once that step actually renders —
they are accurate, government-authored field descriptions tied to the
model property, not something that changes based on which step is
currently displayed. This is the basis for modelling the Travel
Information, Terms & Conditions, and Personal Information steps' fields
below without needing to interactively reach them.

## The Citizenship/Country step, confirmed live via Playwright

Walked with Playwright + Chromium (`executablePath` pointed at the
locally cached Chromium build at
`/paperclip/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome`,
`LD_LIBRARY_PATH` set to the sysroot's `libglib-2.0.so.0` path,
`waitUntil: 'domcontentloaded'`). Read all four `<select>` elements'
option lists directly from the live DOM:

- **`#Citizenship`** (192 real entries plus "Not Specified"): AFGHANISTAN,
  ALBANIA, ALGERIA, ANDORRA, ANGOLA, ANTIGUA & BARBUDA, ARGENTINA, ARMENIA,
  AUSTRALIA, AUSTRIA, AZERBAIJAN, BAHAMAS, BAHRAIN, BANGLADESH, BARBADOS,
  BELARUS, BELGIUM, BELIZE, BENIN, BHUTAN, BOLIVIA, BOSNIA & HERZEGOVINA,
  BOTSWANA, BRAZIL, BRUNEI DARUSSALAM, BULGARIA, BURKINA FASO, BURUNDI,
  CAMBODIA, CAMEROON, CANADA, CAPE VERDE, CENTRAL AFRICAN REPUBLIC, CHAD,
  CHILE, CHINA, COLOMBIA, COMOROS, CONGO (DEMOCRATIC REPUBLIC), CONGO
  (REPUBLIC), COSTA RICA, COTE D'IVOIRE, CROATIA, CUBA, CYPRUS, CZECH
  REPUBLIC, DENMARK, DJIBOUTI, DOMINICA (COMMONWEALTH), DOMINICAN
  REPUBLIC, ECUADOR, EGYPT, EL SALVADOR, EQUATORIAL GUINEA, ERITREA,
  ESTONIA, ETHIOPIA, FIJI, FINLAND, FRANCE, GABON, GAMBIA, GERMANY, GHANA,
  GREECE, GRENADA, GUATEMALA, GUINEA, GUINEA-BISSAU, GUYANA, HAITI,
  HONDURAS, HUNGARY, ICELAND, INDIA, INDONESIA, IRAN, IRAQ, IRELAND,
  ISRAEL, ITALY, JAMAICA, JAPAN, JORDAN, KAZAKHSTAN, KENYA, Kingdom of
  Eswatini, KIRIBATI, KOREA (DEMOCRATIC PEOPLE'S REPUBLIC), KOREA
  (REPUBLIC), KUWAIT, KYRGYZSTAN, LAO PEOPLE'S DEMOCRATIC REPUBLIC
  (LAOS), LATVIA, LEBANON, LESOTHO, LIBERIA, LIBYA, LIECHTENSTEIN,
  LITHUANIA, LUXEMBOURG, MADAGASCAR, MALAWI, MALAYSIA, MALDIVES, MALI,
  MALTA, MARSHALL ISLANDS, MAURITANIA, MAURITIUS, MEXICO, MICRONESIA,
  MOLDOVA, MONACO, MONGOLIA, MONTENEGRO, MOROCCO, MOZAMBIQUE, MYANMAR,
  NAMIBIA, NAURU, NEPAL, NETHERLANDS, NEW ZEALAND, NICARAGUA, NIGER,
  NIGERIA, NORTH MACEDONIA, NORWAY, OMAN, PAKISTAN, PALAU, PANAMA, PAPUA
  NEW GUINEA, PARAGUAY, PERU, PHILIPPINES, POLAND, PORTUGAL, QATAR,
  ROMANIA, RUSSIA, RWANDA, SAINT KITTS & NEVIS, SAINT LUCIA, SAINT
  VINCENT & GRENADINES, SAMOA, SAN MARINO, SAO TOME & PRINCIPE, SAUDI
  ARABIA, SENEGAL, SERBIA, SEYCHELLES, SIERRA LEONE, SINGAPORE, SLOVAKIA,
  SLOVENIA, SOLOMON ISLANDS, SOMALIA, SOUTH AFRICA, SOUTH SUDAN, SPAIN,
  SRI LANKA, SUDAN, SURINAME, SWEDEN, SWITZERLAND, SYRIAN ARAB REPUBLIC,
  TAJIKISTAN, TANZANIA (UNITED REPUBLIC), THAILAND, TIMOR-LESTE, TOGO,
  TONGA, TRINIDAD & TOBAGO, TUNISIA, TURKEY, TURKMENISTAN, TUVALU,
  UGANDA, UKRAINE, UNITED ARAB EMIRATES, UNITED KINGDOM, UNITED STATES OF
  AMERICA, URUGUAY, UZBEKISTAN, VANUATU, VENEZUELA, VIETNAM, YEMEN,
  ZAMBIA, ZIMBABWE. Note Georgia itself is absent from this list (a
  Georgian citizen does not need this e-Visa).
- **`#DocumentType`** (4 real entries): Diplomatic, Ordinary,
  Service/Special/Official, Travel Document for Stateless Person.
- **`#VisaType`** (7 real entries, non-contiguous underlying values 1-6
  and 8 — value 7 does not exist): Tourism, Business/Professional,
  Visiting friends and relatives, Study and Training less than 90 days,
  Health and medical care, Religion/Pilgrimages, Tourism up to 1 year.
  This field's own client-side `data-val-range` (`min=1, max=2`) is
  visibly stale relative to its own `<option>` list — a genuine
  government-side inconsistency between the validation attribute and the
  actual options rendered, not an extraction error on this schema's part.
  The schema's `visaType` enum uses the DOM's own live options, the more
  authoritative source.
- **`#SupportingDocumentCountry`** (45 real entries plus "Not
  Specified"): Australia, Austria, Bahrain, Belgium, Bulgaria, Canada,
  Croatia, Cyprus, Czech Republic, Denmark, Estonia, Finland, France,
  Germany, Greece, Hungary, Iceland, Ireland, Israel, Italy, Japan, Korea
  (Republic), Kuwait, Latvia, Liechtenstein, Lithuania, Luxembourg,
  Malta, Netherlands, New Zealand, Norway, Oman, Poland, Portugal,
  Qatar, Romania, Saudi Arabia, Slovak Republic, Slovenia, Spain, Sweden,
  Switzerland, United Arab Emirates, United Kingdom, USA.

Reading the page's own `checkfirstpage()` client-side validator function
directly (rather than relying only on the `data-val-*` attributes)
confirmed that of the six visible Citizenship/Country-step controls, only
`Citizenship`, `DocumentType`, `VisaType`, `SecurityCode` (the CAPTCHA,
excluded — see below), and `HasReadBorderCrossInfo` are actually checked
before the step can advance; `HasInsurance` and `SupportingDocumentCountry`
are validated by lines that are commented out in the live script (visible
directly in the page source as JS `//` comments) — confirmed live, not
inferred, and the basis for modelling both as optional in this schema.

## The CAPTCHA gate, and why Representative/Companion and documents are out of scope

The step's "NEXT" button runs `checkfirstpage()`, which (once its checks
pass) fires an AJAX GET to `/GeoVisa/en/VisaApp/CheckAllDocuments` with
the selected country/document-type/visa-type and the CAPTCHA value, then
conditionally clicks a second, hidden "NEXT" button (`#formsubmit`) that
performs the actual form POST advancing the wizard server-side.

This session used Playwright to select real values for `Citizenship`,
`DocumentType`, and `VisaType`, checked `HasReadBorderCrossInfo` (via
`window.checkBorderCrossCheckBox(true)`, its own exposed JS function,
since the checkbox's native click target is covered by custom CSS
styling), and then directly invoked `document.getElementById('formsubmit').click()`
to attempt the real server POST, bypassing the client-side
`checkfirstpage()` gate entirely (to test whether server-side validation
would still allow progress even with an arbitrary CAPTCHA value). The
server rejected this with an "Error — Security verifivation code is
incorrect" [sic, the site's own typo] modal and re-rendered step 1 rather
than advancing — confirming the CAPTCHA (`SecurityCode`, backed by an
image at `/GeoVisa/CaptchaImageHandler.ashx`) is a genuine, server-side-
enforced gate, not merely client-side theater.

Separately, a plain unauthenticated GET to
`/GeoVisa/en/VisaApp/CheckAllDocuments` (with a placeholder captcha
value) returned HTTP 500, consistent with that endpoint expecting a
CAPTCHA token tied to the current session rather than an arbitrary
string.

Solving or otherwise bypassing this CAPTCHA was out of scope for this
research task (reading the form's own public structure), so two parts of
the live wizard could not be confirmed and are excluded from this schema
as a disclosed scope boundary:

1. **The Representative and Travelling-With-Companion sub-flows.** Both
   are gated by their own opt-in checkbox (`ByRepresentative`,
   `WithCompanion`) and each requires selecting a "relationship to the
   applicant"/"relationship to the accompanying person" from a numeric-ID
   `<select>` (`ConnectionToRepresentativeID`, `CompanionPersonN` for up
   to 10 companions) whose option-value-to-label mapping is not present
   anywhere in this page's markup (unlike `DocumentType`/`VisaType`,
   whose full option lists *are* present even as hidden-step
   placeholders) — it can only be read once the Personal Information step
   actually renders, which the CAPTCHA gate blocks. Modelling these
   fields with a guessed or empty enum would violate this registry's own
   precision-over-cleverness standard, so the entire sub-flow (including
   the two opt-in toggle checkboxes themselves) is left unmodelled.
2. **All file-upload fields** (`Photo`, `PassportScan`,
   `SupportingDocument`, `TravelInsurance`, `HotelReservation`,
   `TwoWayTicket`, `BankStatement`, `RegistryStatement`). None of their
   hidden placeholders carry a `data-val-required` attribute at all —
   their required/optional status is instead determined by the
   `CheckAllDocuments` AJAX response's per-country `AdditionalDocuments`/
   `NeedVisa`/`CanGetVisa` flags (read directly from the client-side
   `displaymodaldialog1()` function, which shows/hides the corresponding
   document-checklist `<li>` items and switches between requiring
   `BankStatement` (`VisaType == 1`, i.e. Tourism) vs. `RegistryStatement`
   (`VisaType == 2`, i.e. Business/Professional) based on that server
   response) — a genuinely server-side, per-country decision this session
   could not exercise without a valid CAPTCHA token. Rather than guess
   which of Georgia's 192 listed citizenships trigger which combination,
   this entire vertical slice (all `documents[]`) is left unmodelled this
   cycle.

Both are candidates for a focused follow-up cycle that solves the CAPTCHA
(e.g. by capturing a real solved-CAPTCHA session cookie through manual
browser interaction, or by re-screening for a downloadable/paper
equivalent form) to complete this schema's `documents[]` and the
Representative/Companion fields.

## Terms & Conditions and Personal Information steps, sourced from the hidden-field metadata

The eleven Terms & Conditions checkboxes and the seven Personal
Information fields modelled in `schema.json` were all read directly from
their own `data-val-required`/`data-val-date`/`data-val-number`/
`data-val-range` attributes in the same HTTP response described above —
every attestation's exact wording (e.g. "I can prove that I hold a return
ticket, hotel reservation and at least 50 $ per each day of my stay")
comes verbatim from the live page's own `data-val-required` message, not
paraphrased. `FirstName`/`LastName`/`DocumentNumber`'s character-class
constraints come from the page's own jQuery `keyup`/`blur` handlers
(`$('#FirstName').bind('keyup blur', function () { $(this).val($(this).val().replace(/[^A-Z a-z]/g, '')) })`,
etc.), read directly from the page's inline `<script>` block, not
inferred.

One field, `sex`, is modelled with a caveat: the underlying model
constrains it to a numeric range of exactly two values
(`data-val-range-min="0"`, `data-val-range-max="1"`) and requires it
(`data-val-required="The Sex field is required."`), but the actual `<select>`
or radio-group markup that would show which option text maps to which
value is not present in this response (it belongs to the un-rendered
Personal Information step) — modelled as a binary `MALE`/`FEMALE` enum on
the reasonable inference that a binary "Sex" field offers exactly those
two options, but the exact value-to-label mapping was not directly
confirmed this session.

## Conformance

2 valid fixtures (0 errors each — one Tourism/Ordinary-document
applicant, one Business/Diplomatic-document applicant exercising the
optional `hasTravelInsurance`/`supportingDocumentCountry` fields) plus 6
mutation-control fixtures (each omitting exactly one required field,
raising exactly 1 error) are committed under
`conformance/ge/mfa/evisa-application/1.0.0/`. Both `tools/validate.mjs`
and `tools/validate-ajv.mjs` pass at 506/506 with this document included.
