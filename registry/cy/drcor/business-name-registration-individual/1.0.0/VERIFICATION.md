# Verification record — cy/drcor/business-name-registration-individual@1.0.0

## Candidate selection

GOV-4208 ("GovSchema Standard Research"). A fresh scan of CATALOG.md's own
"Known Gaps & Opportunities" section (item 0b, banked GOV-4169,
2026-07-21) found Cyprus's Form EE1 (business-name registration by an
individual) as the strongest genuinely-open, well-sourced candidate: an
unauthenticated, non-Cloudflare-gated, single-page official PDF at
`companies.gov.cy`, left unauthored only because that cycle's own scouting
pass reported the Greek text as "glyph-index-encoded (no ToUnicode CMap),
needing embedded-font glyph-mapping or a pixel-scan extraction pass beyond
what that cycle's scouting attempted." This cycle re-examined that specific
blocker before treating it as still valid, per this routine's own standing
procedure of treating prior "confirmed" findings with some skepticism
rather than accepting them at face value.

## Reaching the live source

Re-fetched `https://www.companies.gov.cy/assets/modules/wgp/articles/201801/53/docs/ee1.pdf`
directly with `curl` using a standard desktop Chrome User-Agent.

- HTTP 200, `Content-Type: application/pdf`, `Content-Length: 87675`,
  `Last-Modified: Tue, 07 May 2019 12:38:56 GMT` — byte-identical to the
  GOV-4169-era fetch (same content-length recorded in CATALOG.md).
- No login, CAPTCHA, or WAF gate on the asset itself.

## The glyph-encoding concern did not reproduce

Loaded the PDF with `pdfjs-dist`'s legacy Node build
(`legacy/build/pdf.js`, from a pre-existing `/tmp/node_modules/pdfjs-dist`
install used by many prior cycles) and called `page.getTextContent()`
directly — no manual glyph-to-Unicode mapping pass, no pixel-scan render
step. The returned `item.str` values are clean, directly readable Modern
Greek Unicode text end to end (e.g. `"Αίτηση για εγγραφή εμπορικής
επωνυμίας"`, `"Ο ΠΕΡΙ ΟΜΟΡΡΥΘΜΩΝ ΚΑΙ ΕΤΕΡΟΡΡΥΘΜΩΝ ΣΥΝΕΤΑΙΡΙΣΜΩΝ ΚΑΙ
ΕΜΠΟΡΙΚΩΝ ΕΠΩΝΥΜΙΩΝ ΝΟΜΟΣ"`). Whatever font-encoding property the prior
cycle's own tooling observed either does not affect `pdfjs-dist`'s
text-extraction path or was mischaracterized; either way, no glyph-mapping
or pixel-scan groundwork was actually needed to extract this form's text
faithfully. This is disclosed as a genuine correction of a prior cycle's
own recorded finding, not a silent overwrite of it.

## Structure of the source

One page, 265 text items, page size 595×842pt (A4). No AcroForm fields —
this is a flat, label-only printed form (confirmed by `pdfjs-dist` finding
no annotation/field objects), consistent with `cy/crmd/passport-application`
and most of this registry's other flat-PDF sources. Every text item's
`transform[4]`/`transform[5]` (x/y) was extracted and items were grouped by
rounded y-coordinate into printed rows, then ordered by x within each row —
this recovers the form's genuine multi-column layout (e.g. the y=419 row
prints "Αρ.Ταυτότητας" at x=137 and "Αρ. Διαβατηρίου" at x=351 side by
side, and the y=366 row prints three columns — "Κτίριο"/"Όροφος"/"Διαμ." —
on one line), which a single left-to-right text dump would not disclose.

Unlike `ie/cro/business-name-registration-individual`'s RBN1 (8 numbered
explanatory notes), this form carries **no footnotes or explanatory notes
at all** — every field is a plain labelled box with no note to
cross-reference. Every field description in this schema is therefore
derived directly from the label text and general knowledge of Cyprus's
business-name registration process (Cap. 116, Article 52), not from a
footnote citation.

## Disclosed source-fidelity findings and scoping decisions

1. **The owner-details section serves both an individual and a
   body-corporate owner on the same page.** The section header itself,
   "Στοιχεία Ιδιοκτήτη ή Ιδιοκτήτριας Εταιρείας," literally reads "Details
   of the Owner or of the Owning Company." The first row of that section
   pairs "Όνομα" (Name) with "Αρ.Εγγραφής" (Registration No.) — the latter
   only meaningful for a registered body corporate — while the immediately
   following row, "Επώνυμο" (Surname), applies only to a natural person.
   This document is scoped to **the individual-owner path only**, mirroring
   how this registry already scopes Ireland's structurally similar
   business-name-registration form into
   `ie/cro/business-name-registration-individual` specifically. The
   body-corporate-owner path (`ownerCompanyRegistrationNumber` and a
   company name distinct from `ownerGivenName`) is not modelled; a future
   companion document could cover it the same way
   `ie/cro/company-incorporation` and
   `ie/cro/business-name-registration-individual` are separate documents
   in this registry, rather than one document with a discriminated
   owner-type union.
2. **`ownerIdCardNumber` and `ownerPassportNumber` are both optional, with
   no encoded either/or rule.** The source form prints both boxes with no
   note stating which applies to which owner. This registry's own standing
   pitfall list (a `notEquals`-empty-string check against an absent
   optional field silently evaluates as if the field were present)
   specifically warns against encoding this kind of either/or as a brittle
   `crossFieldValidation` rule, so the relationship is disclosed in each
   field's own `description` instead.
3. **`nameApprovalApplicationNumber` and `natureOfBusinessCode` have no
   explanatory note distinguishing applicant-supplied from
   registrar-assigned values.** Both are modelled as optional, unconstrained
   strings rather than asserting either interpretation as certain.
4. **Two distinct address blocks, both split into the source's own
   separate boxes rather than collapsed to free text.** Unlike RBN1 (whose
   address fields print as single ruled writing areas and are modelled as
   single free-text strings), EE1 prints the place-of-business address and
   the owner's residential address each as separate street/building/floor/
   flat/parish-town-village/district/postal-code boxes (the owner's
   address additionally has its own country box; the place-of-business
   address does not, since a Cyprus-registered business's premises are
   necessarily domestic). This document follows the source's own
   granularity and splits each into its own leaf field, consistent with
   this registry's convention for other forms with genuinely separate
   printed boxes (e.g. `lv/ur/sole-trader-registration-kr2`).
5. **The correspondence address is the one exception, printed as a single
   free-text box** ("Όνομα και Διεύθυνση για Αλληλογραφία" — Name and
   Address for Correspondence), unlike the two structured address blocks
   above — modelled as a single `correspondenceAddress` string
   accordingly.
6. **No numbered-district checkbox grid.** Cyprus government forms
   sometimes render the six historic districts as a checkbox row; this
   form instead prints a single blank "Επαρχία" (District) box in both
   address blocks, so `placeOfBusinessDistrict`/`ownerDistrict` are
   modelled as free-text strings rather than a fabricated enum.
7. **`ownerSignatureConfirmed` records the fact of signature, not a
   signature image**, consistent with this registry's convention for other
   wet-signature declarations (e.g. `ie/cro/business-name-registration-individual`'s
   own `certificationDeclarationConfirmed`).

## Conformance

2 valid mock scenarios
(`valid-complete-individual-application.json`, a Cypriot-national owner
using an ID card number and only the statically-required fields;
`valid-foreign-national-passport-owner.json`, a UK-national owner using a
passport number, a company-presented correspondence address, and every
optional field populated) plus 6 mutation-control fixtures (five missing-
required-field cases, one from each of the five steps —
`businessName`, `ownerGivenName`, `dateOfCommencementOfBusiness`,
`ownerSignatureConfirmed`, `correspondenceName` — and one unknown-field
rejection) are committed under
`conformance/cy/drcor/business-name-registration-individual/1.0.0/`.

An ephemeral, from-scratch mock validator (deriving required-field and
unknown-field rules directly from this schema's own `fields[]`, not
committed) ran all 8 fixtures: both valid scenarios at 0 errors, all 6
mutation controls each raising exactly 1 error.

`node tools/validate.mjs` and `node tools/validate-ajv.mjs` both pass for
the full registry with this document included.

## Scope boundaries

This document models only the individual-owner path of Form EE1 (see
finding 1 above). It does not submit anything on an applicant's behalf;
the live `companies.gov.cy` source is always authoritative. GovSchema is
independent and is not affiliated with, endorsed by, or operated by
Cyprus, the Ministry of Energy, Commerce and Industry, or the Department
of Registrar of Companies and Intellectual Property.
