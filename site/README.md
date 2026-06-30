# GovSchema site

The GovSchema landing/marketing site. A **data-driven static generator** with
zero runtime dependencies — pages are produced from structured content, so new
marketing pages mean adding data, not writing HTML. This is the lever for
automating the build of landing/marketing material.

## How it works

```
site/
├─ content/site.json   # all copy + site config (the data layer)
├─ build.mjs           # renders each page from typed sections -> dist/
├─ serve.mjs           # local preview server
├─ assets/             # styles.css, favicon.svg (copied verbatim to dist/)
└─ dist/               # build output (generated; deployed to GitHub Pages)
```

`content/site.json` holds a `site` object (name, nav, footer) and a list of
`pages`. Each page is a list of **typed sections**. Each section `type` maps to
one renderer in `build.mjs`:

| type          | purpose                                  |
| ------------- | ---------------------------------------- |
| `hero`        | page header — eyebrow, title, lead, CTAs |
| `section`     | numbered prose block                     |
| `definitions` | term/definition cards                    |
| `columns`     | side-by-side cards (e.g. dual audience)  |
| `steps`       | numbered process steps                   |
| `status`      | status table with state badges           |
| `cta`         | call-to-action band                      |

Add a new page by appending to `pages`; add a new layout by adding one renderer.

## Build & preview

```sh
npm run build      # node build.mjs  -> writes dist/
npm run serve      # preview dist/ at http://localhost:4321
npm run dev        # build then serve
```

Requires Node ≥ 18. No `npm install` needed — there are no dependencies.

## Deploy

Pushes to `main` that touch `site/**` trigger
[`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml), which builds
`dist/` and publishes it to GitHub Pages. The build is fully reproducible from
`content/` + `assets/`.

## Editing copy

Voice is standards-body (ISO/IETF/W3C), not startup: confidence without hype, no
AI-hype words. Copy speaks to both audiences — technical credibility for
agent developers, plain-language reassurance for the people agents act for. All
copy is in `content/site.json`; no copy is hard-coded in `build.mjs`.
