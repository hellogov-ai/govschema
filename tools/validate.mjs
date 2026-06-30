#!/usr/bin/env node
// GovSchema registry validator.
//
// Zero-dependency structural validator for GovSchema documents. It checks the
// rules that the foundation enforces on every published schema:
//   1. the document is valid JSON and a conforming GovSchema document
//      (required members, types, enums, semver, id pattern);
//   2. the document's `id` matches its path under registry/ (excluding the
//      <edition> directory too, for time-versioned forms — spec v0.2, GSP-0005);
//   3. the version directory name matches the document's `version`, and an
//      `edition`-bearing document's <edition> directory matches edition.label;
//   4. cross-references are consistent (step.fields and step.next resolve).
//
// This intentionally implements only the subset of JSON Schema the meta-schema
// uses, so the registry can be validated in CI with no install step. For full
// JSON Schema draft 2020-12 validation, run any standard validator (e.g. ajv)
// against the spec/vN/govschema.schema.json the document targets.
//
// Usage:
//   node tools/validate.mjs                 # validate every schema in registry/
//   node tools/validate.mjs <path/to/schema.json> [...]
//
// Exit code 0 if all documents pass, 1 otherwise.

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const REGISTRY = join(ROOT, "registry");

const SEMVER =
  /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-[0-9A-Za-z-.]+)?(?:\+[0-9A-Za-z-.]+)?$/;
const ID_RE = /^[a-z]{2}(\/[a-z0-9-]+){2,}$/;
const COUNTRY_RE = /^[A-Z]{2}$/;
const SUBDIVISION_RE = /^[A-Z]{2}-[A-Z0-9]{1,3}$/;
const FIELD_NAME_RE = /^[a-z][a-zA-Z0-9_]*$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

const STATUSES = ["draft", "verified", "deprecated"];
const LEVELS = ["national", "subnational", "municipal", "supranational"];
const FIELD_TYPES = ["string", "number", "integer", "boolean", "date", "enum", "file", "object"];
// Edition axis (spec v0.2+, GSP-0005). The `edition` member is OPTIONAL; when
// present it pins a time-versioned form's tax/award year and adds an <edition>
// registry-path layer. Keep this vocabulary in sync with
// spec/v0.2/govschema.schema.json ($defs/edition).
const EDITION_SCHEMES = ["us-tax-year", "gb-tax-year", "award-year"];
const EDITION_LABEL_RE = /^[a-z0-9][a-z0-9-]*$/;

// Whether a govschemaVersion (e.g. "0.2.0") is at least the given (major, minor).
function meetsMinor(version, major, minor) {
  const m = /^(\d+)\.(\d+)\./.exec(version || "");
  if (!m) return false;
  const maj = Number(m[1]);
  const min = Number(m[2]);
  return maj > major || (maj === major && min >= minor);
}

function findSchemas(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) out.push(...findSchemas(p));
    else if (entry === "schema.json") out.push(p);
  }
  return out;
}

// Registry hygiene: a GovSchema document MUST be a file named exactly
// `schema.json` at registry/<id>/<version>/schema.json (see registry/README.md).
// Any other `*.json` under registry/ is a document that findSchemas() — and
// therefore CI — would silently skip: a non-conforming or mis-named schema
// masquerading as published content. Surface those as hard errors so the
// registry can never contain a document that escapes validation.
function findStrayDocuments(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) out.push(...findStrayDocuments(p));
    else if (entry.endsWith(".json") && entry !== "schema.json") out.push(p);
  }
  return out;
}

function validateDocument(doc, errs) {
  const req = [
    "$schema", "govschemaVersion", "id", "version", "title",
    "status", "jurisdiction", "authority", "source", "verification", "fields",
  ];
  for (const k of req) if (!(k in doc)) errs.push(`missing required member: ${k}`);

  if (doc.govschemaVersion != null && !SEMVER.test(doc.govschemaVersion))
    errs.push(`govschemaVersion is not valid semver: ${doc.govschemaVersion}`);
  if (doc.version != null && !SEMVER.test(doc.version))
    errs.push(`version is not valid semver: ${doc.version}`);
  if (doc.id != null && !ID_RE.test(doc.id))
    errs.push(`id does not match required pattern: ${doc.id}`);
  if (doc.status != null && !STATUSES.includes(doc.status))
    errs.push(`status must be one of ${STATUSES.join(", ")}: ${doc.status}`);

  const j = doc.jurisdiction;
  if (j && typeof j === "object") {
    if (!COUNTRY_RE.test(j.country || ""))
      errs.push(`jurisdiction.country must be ISO 3166-1 alpha-2 uppercase: ${j.country}`);
    if (!LEVELS.includes(j.level))
      errs.push(`jurisdiction.level must be one of ${LEVELS.join(", ")}: ${j.level}`);
    if (j.subdivision != null && !SUBDIVISION_RE.test(j.subdivision))
      errs.push(`jurisdiction.subdivision must be ISO 3166-2: ${j.subdivision}`);
  }

  if (doc.authority && !doc.authority.name)
    errs.push("authority.name is required");

  const src = doc.source;
  if (src && typeof src === "object") {
    if (!src.url) errs.push("source.url is required");
    if (!DATE_RE.test(src.retrievedAt || ""))
      errs.push(`source.retrievedAt must be YYYY-MM-DD: ${src.retrievedAt}`);
  }

  const v = doc.verification;
  if (v && typeof v === "object") {
    if (!v.method) errs.push("verification.method is required");
    if (!DATE_RE.test(v.lastVerifiedAt || ""))
      errs.push(`verification.lastVerifiedAt must be YYYY-MM-DD: ${v.lastVerifiedAt}`);
  }

  // Edition (OPTIONAL, spec v0.2+). Validate shape here; path consistency
  // (rule 6) is checked in validatePath/main once the file location is known.
  if (doc.edition != null) {
    const e = doc.edition;
    if (typeof e !== "object" || Array.isArray(e)) {
      errs.push("edition must be an object");
    } else {
      for (const k of Object.keys(e))
        if (k !== "scheme" && k !== "label")
          errs.push(`edition has unknown member: ${k}`);
      if (!EDITION_SCHEMES.includes(e.scheme))
        errs.push(`edition.scheme must be one of ${EDITION_SCHEMES.join(", ")}: ${e.scheme}`);
      if (typeof e.label !== "string" || !EDITION_LABEL_RE.test(e.label))
        errs.push(`edition.label must match ${EDITION_LABEL_RE}: ${e.label}`);
    }
    // The edition axis is a v0.2 feature; a v0.1 document carrying it would be
    // rejected by the v0.1 meta-schema (additionalProperties:false).
    if (!meetsMinor(doc.govschemaVersion, 0, 2))
      errs.push(`edition requires govschemaVersion >= 0.2.0: ${doc.govschemaVersion}`);
  }

  const fieldNames = new Set();
  if (!Array.isArray(doc.fields) || doc.fields.length === 0) {
    errs.push("fields must be a non-empty array");
  } else {
    for (const [i, f] of doc.fields.entries()) {
      const at = `fields[${i}]`;
      if (!FIELD_NAME_RE.test(f.name || ""))
        errs.push(`${at}.name invalid or missing: ${f.name}`);
      if (fieldNames.has(f.name)) errs.push(`${at}.name duplicated: ${f.name}`);
      fieldNames.add(f.name);
      if (!f.label) errs.push(`${at}.label is required`);
      if (!FIELD_TYPES.includes(f.type))
        errs.push(`${at}.type must be one of ${FIELD_TYPES.join(", ")}: ${f.type}`);
    }
  }

  if (doc.steps != null) {
    if (!Array.isArray(doc.steps)) {
      errs.push("steps must be an array");
    } else {
      const stepIds = new Set(doc.steps.map((s) => s.id));
      for (const [i, s] of doc.steps.entries()) {
        const at = `steps[${i}]`;
        if (!s.id) errs.push(`${at}.id is required`);
        if (!s.title) errs.push(`${at}.title is required`);
        for (const fn of s.fields || [])
          if (!fieldNames.has(fn))
            errs.push(`${at} references unknown field: ${fn}`);
        if (s.next != null && !stepIds.has(s.next))
          errs.push(`${at}.next references unknown step: ${s.next}`);
      }
    }
  }
}

function validatePath(file, errs, hasEdition) {
  const rel = relative(REGISTRY, file).split(sep);
  // Layout: registry/<id-parts...>/<version>/schema.json, or, for a
  // time-versioned form (doc carries `edition`, spec v0.2+):
  //   registry/<id-parts...>/<edition>/<version>/schema.json
  // The document's `edition` member is the discriminator: only it tells us
  // whether the segment above <version> is an edition or part of <id>.
  const min = hasEdition ? 5 : 4;
  const shape = hasEdition
    ? "registry/<id>/<edition>/<version>/schema.json"
    : "registry/<id>/<version>/schema.json";
  if (rel.length < min || rel[rel.length - 1] !== "schema.json") {
    errs.push(`file is not at ${shape}: ${rel.join("/")}`);
    return;
  }
  const versionDir = rel[rel.length - 2];
  if (hasEdition) {
    const editionDir = rel[rel.length - 3];
    const idFromPath = rel.slice(0, rel.length - 3).join("/");
    return { versionDir, editionDir, idFromPath };
  }
  const idFromPath = rel.slice(0, rel.length - 2).join("/");
  return { versionDir, idFromPath };
}

function main() {
  const args = process.argv.slice(2);
  const files = args.length ? args : findSchemas(REGISTRY);

  let strayFailed = 0;

  // When scanning the whole registry, no GovSchema document may hide from CI
  // under a non-conforming filename. (Skipped when explicit paths are given.)
  if (!args.length) {
    for (const stray of findStrayDocuments(REGISTRY)) {
      console.error(`FAIL ${relative(ROOT, stray)}`);
      console.error(
        "  - registry documents MUST be named schema.json (registry/README.md); " +
          "rename or remove this file"
      );
      strayFailed++;
    }
  }

  let failed = 0;
  if (files.length === 0 && strayFailed === 0) {
    console.log("No schemas found under registry/. Nothing to validate.");
    return;
  }
  for (const file of files) {
    const errs = [];
    let doc;
    try {
      doc = JSON.parse(readFileSync(file, "utf8"));
    } catch (e) {
      console.error(`FAIL ${file}\n  - invalid JSON: ${e.message}`);
      failed++;
      continue;
    }

    validateDocument(doc, errs);
    const hasEdition =
      doc && typeof doc.edition === "object" && doc.edition != null && !Array.isArray(doc.edition);
    const paths = validatePath(file, errs, hasEdition);
    if (paths) {
      if (doc.id && doc.id !== paths.idFromPath)
        errs.push(`id "${doc.id}" does not match path "${paths.idFromPath}"`);
      if (doc.version && doc.version !== paths.versionDir)
        errs.push(`version "${doc.version}" does not match version directory "${paths.versionDir}"`);
      // Rule 6: the <edition> path segment MUST equal edition.label.
      if (hasEdition && doc.edition.label && doc.edition.label !== paths.editionDir)
        errs.push(
          `edition.label "${doc.edition.label}" does not match edition directory "${paths.editionDir}"`
        );
    }

    const label = relative(ROOT, file);
    if (errs.length) {
      console.error(`FAIL ${label}`);
      for (const e of errs) console.error(`  - ${e}`);
      failed++;
    } else {
      console.log(`ok   ${label}`);
    }
  }

  console.log(
    `\n${files.length - failed}/${files.length} document(s) passed.` +
      (strayFailed ? ` ${strayFailed} non-conforming registry file(s).` : "")
  );
  process.exit(failed || strayFailed ? 1 : 0);
}

main();
