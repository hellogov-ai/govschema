# Brand asset provenance

The GovSchema mark — notched-circle icon + bold custom "GovSchema" wordmark —
is the canonical brand mark established for [govschema.org](https://govschema.org)
(board-supplied replacement mark, GOV-666, 2026-07-02, superseding the earlier
ink-square `{ }` brace mark: GOV-281, refined geometry GOV-208, board-confirmed
GOV-197, Direction C recolor GOV-303 Phase 6). These files are a direct copy
from `govschema-landing`, not a redraw, so the standard repo and the marketing
site share one identity (re-synced GOV-806).

| File               | Purpose                                                                    |
| ------------------ | --------------------------------------------------------------------------- |
| `favicon.svg`       | Source vector, mark only (64×64 viewBox, paper mark on ink badge).         |
| `logo-lockup.svg`   | Source vector, icon + wordmark + tagline (1039×235 viewBox, ink on light). |
| `icon.png`          | Rasterized `favicon.svg` (256×256) — GitHub-safe raster for docs.          |
| `logo-lockup.png`   | Rasterized `logo-lockup.svg` (2078×470, 2x) — for docs/press use.          |

To regenerate the PNGs after a source SVG change, rasterize with
[resvg](https://github.com/RazrFalcon/resvg) using the IBM Plex Sans/Mono
faces (see `govschema-landing/tools/rasterize.mjs` for the reference
pipeline) — do not redraw the mark by hand.

If the landing site's mark ever changes, re-copy these files from
`govschema-landing/assets/{favicon.svg,brand/logo-lockup.svg}` rather than
editing them independently, so the two repos never drift.
