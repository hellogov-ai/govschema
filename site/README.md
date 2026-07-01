# GovSchema site

The GovSchema landing/marketing site. A **data-driven static generator** with
zero runtime dependencies: pages are produced from structured content, so new
marketing pages mean adding data, not writing HTML. This is the lever for
automating the build of landing/marketing material.

## How it works

```
site/
├─ content/site.json   # all copy + site config (the data layer)
├─ build.mjs           # renders each page from typed sections -> dist/
├─ serve.mjs           # local preview server
├─ assets/             # styles.css, favicon.svg (copied verbatim to dist/)
└─ dist/               # build output (generated; deployed to Vercel)
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

Requires Node ≥ 18. No `npm install` needed: there are no dependencies.

## Deploy

The site is a static `dist/` directory, so any static host works. The build is
fully reproducible from `content/` + `assets/`.

**Current host — Vercel.** Live at **https://govschema.vercel.app**. Deployed to
the `govschema` project on the `hellogov-ai` Vercel team using the foundation's
provisioned credentials. From this directory:

```sh
# VERCEL_TOKEN and VERCEL_ORG_ID are provided by the environment.
# VERCEL_PROJECT_ID pins the deploy to the existing `govschema` project so a
# fresh checkout never creates a stray project.
VERCEL_PROJECT_ID=prj_RiugKaZOLw4xiBsys6qieyqINPeh \
  vercel deploy --prod --yes --token "$VERCEL_TOKEN"
```

Vercel runs `node build.mjs` (see [`vercel.json`](./vercel.json)) and serves
`dist/`, so the deployed bytes are reproducible from `content/` + `assets/`.
Re-running the command ships the latest build and re-aliases
`govschema.vercel.app`.

**Alternative — GitHub Pages.** When the GovSchema GitHub organisation exists,
pushes to `main` touching `site/**` trigger
[`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml), which builds
`dist/` and publishes it to Pages. (Kept ready; not the active host today.)

## Editing copy

Voice is standards-body (ISO/IETF/W3C), not startup: confidence without hype, no
AI-hype words. Copy speaks to both audiences — technical credibility for
agent developers, plain-language reassurance for the people agents act for. All
copy is in `content/site.json`; no copy is hard-coded in `build.mjs`.
