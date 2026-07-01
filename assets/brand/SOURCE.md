# Brand asset provenance

The GovSchema mark — navy square, white `{ }` brace — is the canonical brand
mark established for [govschema.org](https://govschema.org) (GOV-281, refined
geometry GOV-208). These files are a direct copy from `govschema-landing`, not
a redraw, so the standard repo and the marketing site share one identity.

| File               | Purpose                                                          |
| ------------------ | ----------------------------------------------------------------- |
| `favicon.svg`       | Source vector, mark only (64×64 viewBox).                        |
| `logo-lockup.svg`   | Source vector, mark + "GovSchema" wordmark (480×96 viewBox).      |
| `icon.png`          | Rasterized `favicon.svg` (256×256) — GitHub-safe raster for docs. |
| `logo-lockup.png`   | Rasterized `logo-lockup.svg` (960×192, 2x) — used in `README.md`. |

To regenerate the PNGs after a source SVG change, rasterize with
[resvg](https://github.com/RazrFalcon/resvg) using the IBM Plex Sans/Mono
faces (see `govschema-landing/tools/rasterize.mjs` for the reference
pipeline) — do not redraw the mark by hand.

If the landing site's mark ever changes, re-copy these files from
`govschema-landing/assets/{favicon.svg,brand/logo-lockup.svg}` rather than
editing them independently, so the two repos never drift.
