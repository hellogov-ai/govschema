# Verification record — tt/imd/visa-application@1.0.0

## Candidate selection

GOV-4596 ("GovSchema Standard Research"). Known Gaps entry 0m banked
Trinidad and Tobago's Visa vertical as open backlog since the GOV-4568
cycle, alongside National ID & Civic Documents; Passport, DMV, Taxes, and
Business Formation were authored in the GOV-4568/GOV-4575/GOV-4582/GOV-4589
cycles. This cycle scouted Visa fresh rather than trusting the banked
entry's own preliminary source list, since two different paper "Visa
Application Form" PDFs are hosted across `nationalsecurity.gov.tt` and
`foreign.gov.tt` and neither was independently confirmed current.

## Reaching the live source

Three PDF candidates were fetched and their text layers checked with
`pdfjs-dist`:

- `nationalsecurity.gov.tt/wp-content/uploads/2022/11/Visa-Application-Form.pdf`
  (973,375 bytes) — 2 pages, **no extractable text layer** (image-only scan).
- `foreign.gov.tt/documents/640/15._Trinidad_and_Tobago_Visa_Application_Form_xTZKWUO.pdf`
  (237,733 bytes) — 2 pages, **no extractable text layer**.
- `foreign.gov.tt/documents/147/Document_1_-_Visa_Application_Form.pdf`
  (44,157 bytes) — 2 pages, genuine text layer, 23 numbered questions,
  Adobe LiveCycle Designer XFA metadata dated 2010-01-12.

Before authoring against the one specimen with real text, `foreign.gov.tt`'s
own current "Visas" service page (`foreign.gov.tt/services/visas/`) was
fetched fresh and found to **redirect entirely to the e-Visa portal**
(`nationalsecurity.gov.tt/divisions/immigrationdivision/evisa-online/`),
with no remaining reference to any downloadable form — the page states
only "For information on visas for entry into Trinidad and Tobago, please
visit the e-Visa Portal at:". A 2024-04-26 Ministry of National Security
media release ("Launch of New E-Visa and E-Student Permit Online Portals
at the Immigration Division") independently confirms the online portal,
not the paper forms (the 2010 XFA specimen among them), is the current
live process. Per this registry's source-of-truth-fidelity practice, the
live e-Visa portal is modelled instead of the paper form.

The evisa-online page links to `https://evisa.ttservices.online/tt-evisa-entitlement-online-ui/`,
a server-rendered Vaadin (Flow) Java application sitting behind a
Cloudflare bot check that returns a hard 403 to a plain `curl` (even with a
realistic desktop `User-Agent`). Reached with a real Playwright/Chromium
session (this registry's own established sandboxed-launch recipe —
`LD_LIBRARY_PATH=/paperclip/chrome-sysroot/usr/lib/x86_64-linux-gnu`,
`FONTCONFIG_FILE=/paperclip/chrome-sysroot/my-fonts.conf`, a realistic
desktop Chrome UA), which passed the Cloudflare challenge with a plain
`domcontentloaded` wait and returned the real landing page ("Home / Check
Your Photo / Apply For Visa / Track Visa Application / Resume Visa
Application / Pay Visa Fees / Help").

## Extraction method

Walked the live wizard interactively with Playwright, screen by screen,
using mock applicant data (a Chinese national, leisure-purpose applicant),
rather than static bundle re-extraction — Vaadin Flow ships its UI as
server-rendered custom elements (`vaadin-combo-box`, `vaadin-text-field`,
`vaadin-date-picker`) with combo-box option lists fetched live per-open
from the server, not embedded in a client-side bundle the way an Angular
SPA (e.g. this registry's `zw/immigration/evisa-application`) would be, so
there is no static specimen to re-extract offline. Every screen was
screenshotted and every field label read directly from the rendered page;
enum option lists (Purpose of visit's 21 values; Title's 3; Sex's 2;
Marital status's 5) were captured by opening each combo box and either
screenshotting the full list or scrolling through it. The "Find out if you
can apply online" eligibility pre-check was completed once with Chinese
nationality + LEISURE/BEACH VACATION + a 14-day stay + passport-valid=Yes,
confirmed eligible ("You can apply for a new visa online."), and the full
7-step wizard (Getting Started → Enter Details [5 sub-sections] → Upload
Photo → Upload Documents → Review Application → Submit Payment →
Confirmation) was walked through the end of Enter Details' Additional
Information sub-section using this mock applicant. Upload Photo, Upload
Documents, Review Application, and Submit Payment were reached and their
on-screen instructions read, but not filled with real files/payment
details — this schema does not create an account or file a real
application on a live government system, consistent with this registry's
standing practice (see e.g. `zw/immigration/evisa-application`'s own
verification notes on the same principle).

The Ministry of National Security's own "EVISAS SUPPORTING DOCUMENTS" PDF
(`nationalsecurity.gov.tt/wp-content/uploads/2024/04/List-of-Supporting-Documents-for-Visas-Revised.pdf`,
72,244 bytes) was fetched directly and its text extracted cleanly with
`pdfjs-dist`, giving the authoritative, itemised list of the 11 selectable
supporting-document types offered on the Upload Documents step, without
needing to interact with that step's file-picker widget directly. The
800 TTD non-refundable application fee and accepted Visa/Mastercard
payment methods are stated on the Immigration Division's own evisa-online
landing page, independently of the live wizard's own Submit Payment step.

## Disclosed findings

1. **The paper `Document_1_-_Visa_Application_Form.pdf` (23 numbered
   questions) is superseded, not modelled.** Its data model closely
   parallels the live e-Visa wizard's own Personal Information/Contact
   Information/Additional Information sections (family name, present
   nationality, occupation, annual income, deportation history, purpose
   and address of visit, two references, accompanying children), giving
   confidence the online system is a faithful digitisation of the same
   underlying government process rather than an unrelated product — but
   the paper form itself is no longer the process an applicant is
   directed to use.
2. **`nationality` and `nationalityAtBirth` are modelled as open strings**,
   not closed enums, despite being presented as combo boxes on the source.
   Both combo boxes' selectable lists cover essentially the full range of
   world nationalities/demonyms (confirmed spot-checking multiple
   substrings — "CHIN" resolved "CHINESE"/"CHINESE MACAU"; the list is
   filterable, not a small fixed set) — fabricating an exhaustive enum
   would risk silently excluding a valid nationality never observed during
   this cycle's scouting.
3. **`purposeOfVisit`'s 21-value enum was captured in full** by opening the
   combo box, typing no filter, and scrolling through the entire rendered
   list end-to-end (confirmed reaching "YACHTING" as the final,
   alphabetically-last entry) — not sampled or inferred from a partial
   screenshot.
4. **The `title`/`sex`/`maritalStatus` enums (3/2/5 values respectively)
   were each confirmed by opening their combo box and screenshotting the
   full rendered option list** — Title offers only `MR.`/`MRS.`/`MS.` (no
   `DR.` or other honorific, unlike this registry's other, paper-sourced
   TT schemas' broader title lists elsewhere in the registry).
5. **`multipleEntryVisa` is modelled as a real, editable boolean field**,
   not excluded as a fixed constant, even though the Immigration Division's
   own evisa-online page describes this product as always being a
   "Multiple Entry eVisa" and the source pre-fills the value to YES — the
   field renders as a genuinely interactive combo box in the wizard, not a
   disabled/read-only display element (contrast with `visaType`, the
   Getting Started step's own read-only "E-VISA" label, which this schema
   excludes as a non-applicant-supplied constant).
6. **`deportationDetails` is `requiredWhen everDeportedFromTT equals true`**,
   matching the source's own behavior: the field's input box is visibly
   greyed out/disabled until "Ever deported from Trinidad and Tobago" is
   answered YES, confirmed by toggling the answer and re-screenshotting.
7. **`convictionDetails` ("State any convicted offences and conviction
   date") is modelled unconditionally optional, not gated behind any
   boolean of its own** — the source presents it directly beneath the
   deportation-details field in the same "Additional Data" panel with no
   accompanying yes/no discriminator, unlike `deportationDetails` immediately
   above it.
8. **Neither Reference #1 nor Reference #2's fields carry a required
   marker (`•`) anywhere in the live wizard**, confirmed by direct visual
   inspection of the Additional Information screen — disclosed as a
   genuine difference from this registry's own `tt/imd/passport-application-first-adult`
   schema, whose paper-form references are explicitly mandatory. Both
   references' 9 fields are therefore modelled `required: false` here,
   reflecting the online system's own, less strict behavior rather than
   assuming parity with the sibling passport schema.
9. **The Additional Information step's "Children Information" grid
   (dynamic Add/Edit/Delete Child rows: Surname, Given Name, Date of
   Birth, Birth Country, Birth Place) is excluded from `fields[]`
   entirely.** Unlike this registry's bounded-repeating-group precedent
   (e.g. `tt/imd/passport-application-first-adult`'s previousMarriage1..3),
   the source discloses no fixed maximum row count for this grid — it is a
   genuinely open-ended add/remove list — and the same screen's own
   printed instruction ("The parent/guardian is required to submit a
   separate application for each child") indicates any accompanying minor
   ultimately needs their own, separate e-Visa application regardless of
   what is recorded here, making this grid supplementary disclosure rather
   than the primary path for a minor's own visa data.
10. **`confirmEmailMatchesEmail` and `passportExpiryAfterIssue` are
    modelled as `crossFieldValidation` rules** — both map cleanly to
    GSP-0013's direct field-to-field `fieldCompare` grammar (an exact
    string match; a strict later-than date comparison) and were confirmed
    as genuinely enforced by the source (an "Email"/"Confirm email" pair;
    an Issue-date/Expiry-date pair on the same Passport Information panel).
11. **The 800 TTD application fee is modelled as a `category: payment`
    document entry** (`amount: {currency: "TTD", value: 800}`,
    `methods: ["visa", "mastercard"]`), per the Immigration Division's own
    evisa-online page text, rather than as a data field — consistent with
    this registry's `documents[]` convention for payment obligations.
12. **The Upload Photo step's own published constraints (JPEG/PNG/BMP,
    15 KB–7,584 KB, 480×640–4,800×6,400 pixels) are modelled on the
    `applicantPhoto` document's `constraints`** using `maxBytes` (7,584 KB
    converted to 7,766,016 bytes) and `mediaTypes`; the pixel-dimension
    bounds have no corresponding keyword in GSP-0007's file-validation
    shape (`maxBytes`/`mediaTypes` only) and are disclosed here in this
    note rather than fabricated into an unsupported schema field.

## Conformance

3 valid mock scenarios — `valid-leisure-first-time-applicant` (a first-time
Chinese leisure applicant with no deportation/conviction/prior-visa
history); `valid-business-with-prior-visa-issued` (an Indian business
applicant who has previously held and been issued a Trinidad and Tobago
visa, exercising the `previousVisaWasIssued` `visibleWhen`/`requiredWhen`
gate, plus a completed Reference #1); and
`valid-deportation-disclosed-with-second-reference` (a Nigerian
visiting-friends-and-relatives applicant who discloses a past deportation,
exercising the `deportationDetails` `requiredWhen` gate, plus both
references completed) — plus 33 mutation-control fixtures (one
missing-required-field fixture for each of this schema's 33 statically
required fields) and one unknown-field-rejected fixture, committed under
`conformance/tt/imd/visa-application/1.0.0/`.

An ephemeral, from-scratch conformance checker (deriving required/
requiredWhen/visibleWhen rules and the two `crossFieldValidation` rules
directly from this schema's own `fields[]`, discarded after use, not
committed) ran all 37 fixtures: all 3 valid scenarios at 0 errors, all 33
static-required mutation controls each raising exactly 1 error, the
unknown-field fixture correctly rejected, and confirmed every
`requiredWhen`/`visibleWhen`/`crossFieldValidation` field reference
resolves to a real field name (0 dangling references). Validated clean
with `node tools/validate.mjs` and `node tools/validate-ajv.mjs`,
individually and as part of the full registry run (635/635 documents
passing both). `registry-index.json` regenerated via `npm run build-index`
in `tools/govschema-client/` (634 → 635 entries).
