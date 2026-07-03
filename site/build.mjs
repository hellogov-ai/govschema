#!/usr/bin/env node
/**
 * GovSchema static site generator — zero runtime dependencies.
 *
 * Content lives in content/site.json as a list of pages, each a list of typed
 * sections. Each section type has one renderer below. Adding a new marketing
 * page means adding data, not code; adding a new layout means adding one
 * renderer. This is the "automate the build" lever: pages are produced from
 * structured content, repeatably.
 *
 * Usage: node build.mjs   ->   writes ./dist
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(fileURLToPath(import.meta.url));
const SRC = join(ROOT, "content", "site.json");
const ASSETS = join(ROOT, "assets");
const OUT = join(ROOT, "dist");
const REPO_ROOT = join(ROOT, "..");

/** Escape text destined for HTML text nodes / attributes. */
const esc = (s = "") =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** Inline content is authored by us and may contain trusted markup (e.g. <strong>, <a>). */
const inline = (s = "") => String(s);

const attr = (s = "") => esc(s);

// ----------------------------------------------------------------------------
// Section renderers. Each takes the section object and the site globals.
// ----------------------------------------------------------------------------

const renderActions = (actions = []) =>
  actions.length
    ? `<div class="actions">${actions
        .map(
          (a) =>
            `<a class="btn ${a.primary ? "btn-primary" : "btn-secondary"}" href="${attr(
              a.href
            )}">${esc(a.label)}</a>`
        )
        .join("")}</div>`
    : "";

const sectionHeading = (s) =>
  s.heading
    ? `<h2 class="section-heading">${
        s.number ? `<span class="section-number">§${esc(s.number)}</span>` : ""
      }<span>${esc(s.heading)}</span></h2>`
    : "";

const renderers = {
  hero: (s) => `
  <header class="hero">
    <div class="wrap hero-inner">
      ${s.eyebrow ? `<p class="eyebrow">${esc(s.eyebrow)}</p>` : ""}
      <h1 class="hero-title">${esc(s.heading)}</h1>
      ${s.lead ? `<p class="hero-lead">${inline(s.lead)}</p>` : ""}
      ${renderActions(s.actions)}
      ${s.meta_line ? `<p class="hero-meta">${esc(s.meta_line)}</p>` : ""}
    </div>
  </header>`,

  section: (s) => `
  <section class="block" ${s.id ? `id="${attr(s.id)}"` : ""}>
    <div class="wrap measure">
      ${sectionHeading(s)}
      ${(s.body || []).map((p) => `<p class="prose">${inline(p)}</p>`).join("")}
    </div>
  </section>`,

  definitions: (s) => `
  <section class="block block-alt" ${s.id ? `id="${attr(s.id)}"` : ""}>
    <div class="wrap">
      ${sectionHeading(s)}
      <dl class="def-grid">
        ${(s.items || [])
          .map(
            (it) => `
        <div class="def-card">
          <dt class="def-term">${esc(it.term)}${
              it.abbr ? ` <span class="def-abbr">${esc(it.abbr)}</span>` : ""
            }</dt>
          <dd class="def-body">
            <p class="prose">${inline(it.definition)}</p>
            ${it.example ? `<p class="def-example">${inline(it.example)}</p>` : ""}
          </dd>
        </div>`
          )
          .join("")}
      </dl>
    </div>
  </section>`,

  columns: (s) => `
  <section class="block" ${s.id ? `id="${attr(s.id)}"` : ""}>
    <div class="wrap">
      ${sectionHeading(s)}
      <div class="col-grid">
        ${(s.columns || [])
          .map(
            (c) => `
        <div class="col-card">
          <h3 class="col-label">${esc(c.label)}</h3>
          <p class="prose">${inline(c.body)}</p>
          ${
            c.points && c.points.length
              ? `<ul class="ticklist">${c.points
                  .map((p) => `<li>${inline(p)}</li>`)
                  .join("")}</ul>`
              : ""
          }
        </div>`
          )
          .join("")}
      </div>
    </div>
  </section>`,

  steps: (s) => `
  <section class="block block-alt" ${s.id ? `id="${attr(s.id)}"` : ""}>
    <div class="wrap">
      ${sectionHeading(s)}
      <ol class="steps">
        ${(s.steps || [])
          .map(
            (st, i) => `
        <li class="step">
          <span class="step-num">${i + 1}</span>
          <div>
            <h3 class="step-title">${esc(st.title)}</h3>
            <p class="prose">${inline(st.body)}</p>
          </div>
        </li>`
          )
          .join("")}
      </ol>
    </div>
  </section>`,

  status: (s) => `
  <section class="block" ${s.id ? `id="${attr(s.id)}"` : ""}>
    <div class="wrap measure">
      ${sectionHeading(s)}
      ${s.body ? `<p class="prose">${inline(s.body)}</p>` : ""}
      <table class="status-table">
        <tbody>
        ${(s.rows || [])
          .map(
            (r) => `
          <tr>
            <th scope="row">${esc(r.label)}</th>
            <td>${esc(r.value)}</td>
            <td class="status-cell"><span class="badge badge-${attr(
              r.state || "planned"
            )}">${esc((r.state || "planned").replace("-", " "))}</span></td>
          </tr>`
          )
          .join("")}
        </tbody>
      </table>
    </div>
  </section>`,

  cta: (s) => `
  <section class="block block-cta" ${s.id ? `id="${attr(s.id)}"` : ""}>
    <div class="wrap measure">
      ${sectionHeading(s)}
      ${s.body ? `<p class="prose">${inline(s.body)}</p>` : ""}
      ${renderActions(s.actions)}
    </div>
  </section>`,
};

function renderNav(site) {
  const links = (site.nav || [])
    .map(
      (n) =>
        `<a href="${attr(n.href)}"${
          n.external ? ' target="_blank" rel="noopener"' : ""
        }>${esc(n.label)}</a>`
    )
    .join("");
  return `
  <nav class="topnav">
    <div class="wrap topnav-inner">
      <a class="brand" href="./">
        <img class="brand-mark" src="assets/favicon.svg" alt="" width="24" height="24" />
        <span class="brand-name">${esc(site.name)}</span>
      </a>
      <div class="topnav-links">${links}</div>
    </div>
  </nav>`;
}

function renderFooter(site) {
  const f = site.footer || {};
  const cols = (f.columns || [])
    .map(
      (c) => `
      <div class="footer-col">
        <h4>${esc(c.title)}</h4>
        <ul>${(c.links || [])
          .map(
            (l) =>
              `<li><a href="${attr(l.href)}">${esc(l.label)}</a></li>`
          )
          .join("")}</ul>
      </div>`
    )
    .join("");
  return `
  <footer class="site-footer">
    <div class="wrap">
      <div class="footer-grid">
        <div class="footer-about">
          <span class="brand-name">${esc(site.name)}</span>
          <p class="footer-disclaimer">${inline(f.disclaimer || "")}</p>
        </div>
        ${cols}
      </div>
      <div class="footer-base">
        <p>${inline(f.license || "")}</p>
        <p>© ${esc(site.name)} — an open-source standards foundation.</p>
      </div>
    </div>
  </footer>`;
}

// ----------------------------------------------------------------------------
// llms.txt / llms-full.txt (https://llmstxt.org) — generated from the same
// site.json data as the HTML, and written to both site/dist/ (served at
// https://govschema.org/llms.txt) and the repo root (renders on GitHub), so
// the two copies can't drift out of hand-maintained sync.
// ----------------------------------------------------------------------------

function renderLlmsHeader(site) {
  const disclaimer = (site.footer && site.footer.disclaimer) || "";
  return [`# ${site.name}`, "", `> ${site.description}`, "", disclaimer].join("\n");
}

function renderLlmsTxt(site) {
  const links = (site.llms && site.llms.links) || [];
  const list = links.map((l) => `- [${l.label}](${l.href}): ${l.description}`).join("\n");
  return [renderLlmsHeader(site), "", "## Standard", "", list, ""].join("\n");
}

function renderLlmsFullTxt(site, specText) {
  return [renderLlmsHeader(site), "", "---", "", specText.trimEnd(), ""].join("\n");
}

function renderPage(page, site) {
  const body = (page.sections || [])
    .map((s) => {
      const r = renderers[s.type];
      if (!r) {
        console.warn(`  ! unknown section type: ${s.type}`);
        return "";
      }
      return r(s, site);
    })
    .join("\n");

  return `<!doctype html>
<html lang="${attr(site.lang || "en")}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(page.title || site.name)}</title>
  <meta name="description" content="${attr((page.meta && page.meta.description) || site.description)}" />
  <meta name="theme-color" content="${attr(site.themeColor || "#1a1a18")}" />
  <meta property="og:title" content="${attr(page.title || site.name)}" />
  <meta property="og:description" content="${attr((page.meta && page.meta.description) || site.description)}" />
  <meta property="og:type" content="website" />
  ${site.url ? `<meta property="og:url" content="${attr(site.url)}" />` : ""}
  ${site.url ? `<link rel="canonical" href="${attr(site.url)}" />` : ""}
  <link rel="icon" href="assets/favicon.svg" type="image/svg+xml" />
  <link rel="stylesheet" href="assets/styles.css" />
</head>
<body>
${renderNav(site)}
<main>
${body}
</main>
${renderFooter(site)}
</body>
</html>
`;
}

function build() {
  const data = JSON.parse(readFileSync(SRC, "utf8"));
  const site = data.site || {};
  rmSync(OUT, { recursive: true, force: true });
  mkdirSync(OUT, { recursive: true });

  if (existsSync(ASSETS)) {
    cpSync(ASSETS, join(OUT, "assets"), { recursive: true });
  }

  let count = 0;
  for (const page of data.pages || []) {
    const html = renderPage(page, site);
    const file = join(OUT, `${page.slug}.html`);
    writeFileSync(file, html, "utf8");
    console.log(`  ✓ ${page.slug}.html (${html.length} bytes)`);
    count++;
  }

  // GitHub Pages: disable Jekyll processing of our static output.
  writeFileSync(join(OUT, ".nojekyll"), "", "utf8");

  const specPath = join(REPO_ROOT, (site.llms && site.llms.specPath) || "spec/v0.2/SPEC.md");
  const specText = readFileSync(specPath, "utf8");
  const generated = {
    "llms.txt": renderLlmsTxt(site),
    "llms-full.txt": renderLlmsFullTxt(site, specText),
  };
  for (const [name, content] of Object.entries(generated)) {
    writeFileSync(join(OUT, name), content, "utf8");
    writeFileSync(join(REPO_ROOT, name), content, "utf8");
    console.log(`  ✓ ${name} (dist/ + repo root)`);
  }

  console.log(`Built ${count} page(s) -> dist/`);
}

build();
