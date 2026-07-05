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
// It also validates any OPTIONAL sibling `mapping.json` companion artifact
// (spec v0.2, GSP-0011): structural shape plus the referential-integrity rule
// (SPEC.md §13.2 / §10 rule 7) — every `mapping.json` field name must resolve
// to a field defined in the sibling `schema.json`. Absence of `mapping.json`
// is never an error and has no bearing on the sibling schema's conformance.
//
// It also checks (GOV-1234, full-registry runs only) that every entry in the
// committed `tools/govschema-client/registry-index.json` resolves to a real,
// validating `schema.json` on disk with matching id/version/edition. This is
// a defense-in-depth check independent of the existing "is the index stale"
// CI step (which regenerates the index and diffs it): that step can only
// fire once the referenced file exists in the checkout being tested, so it
// cannot catch a dangling entry committed from a shared/dirty working tree
// where `build-index` picked up another author's uncommitted WIP schema
// (see GOV-1233).
//
// This intentionally implements only the subset of JSON Schema the meta-schema
// uses, so the registry can be validated in CI with no install step. For full
// JSON Schema draft 2020-12 validation, run any standard validator (e.g. ajv)
// against the spec/vN/govschema.schema.json (or mapping.schema.json) the
// document targets.
//
// Usage:
//   node tools/validate.mjs                 # validate every schema in registry/
//   node tools/validate.mjs <path/to/schema.json> [...]
//
// Exit code 0 if all documents pass, 1 otherwise.

import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative, sep, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const REGISTRY = join(ROOT, "registry");
const INDEX_PATH = join(ROOT, "tools", "govschema-client", "registry-index.json");

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

function findMappings(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) out.push(...findMappings(p));
    else if (entry === "mapping.json") out.push(p);
  }
  return out;
}

// Registry hygiene: a GovSchema document MUST be a file named exactly
// `schema.json` at registry/<id>/<version>/schema.json (see registry/README.md),
// with an OPTIONAL sibling `mapping.json` (GSP-0011). Any other `*.json` under
// registry/ is a document that findSchemas()/findMappings() — and therefore CI
// — would silently skip: a non-conforming or mis-named file masquerading as
// published content. Surface those as hard errors so the registry can never
// contain a document that escapes validation.
function findStrayDocuments(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) out.push(...findStrayDocuments(p));
    else if (entry.endsWith(".json") && entry !== "schema.json" && entry !== "mapping.json")
      out.push(p);
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

// Structural validation of a mapping.json document (spec/v0.2/mapping.schema.json,
// GSP-0011). `schemaFieldNames` is the set of field names defined in the sibling
// schema.json — undefined if the sibling could not be read, in which case the
// referential-integrity rule (§10 rule 7) is skipped and reported separately.
function validateMappingDocument(doc, schemaFieldNames, errs) {
  const req = ["$schema", "mappingVersion", "schema", "source", "verification", "fields"];
  for (const k of req) if (!(k in doc)) errs.push(`missing required member: ${k}`);
  for (const k of Object.keys(doc))
    if (!req.includes(k)) errs.push(`unknown member: ${k}`);

  if (doc.mappingVersion != null && !SEMVER.test(doc.mappingVersion))
    errs.push(`mappingVersion is not valid semver: ${doc.mappingVersion}`);

  const s = doc.schema;
  if (s && typeof s === "object") {
    for (const k of Object.keys(s))
      if (k !== "id" && k !== "version") errs.push(`schema has unknown member: ${k}`);
    if (!ID_RE.test(s.id || "")) errs.push(`schema.id does not match required pattern: ${s.id}`);
    if (s.version != null && !SEMVER.test(s.version))
      errs.push(`schema.version is not valid semver: ${s.version}`);
  } else if (s !== undefined) {
    errs.push("schema must be an object");
  }

  const src = doc.source;
  if (src && typeof src === "object") {
    for (const k of Object.keys(src)) if (k !== "url") errs.push(`source has unknown member: ${k}`);
    if (!src.url) errs.push("source.url is required");
  } else if (src !== undefined) {
    errs.push("source must be an object");
  }

  const v = doc.verification;
  if (v && typeof v === "object") {
    for (const k of Object.keys(v))
      if (!["method", "lastVerifiedAt", "nextReviewBy", "notes"].includes(k))
        errs.push(`verification has unknown member: ${k}`);
    if (!v.method) errs.push("verification.method is required");
    if (!DATE_RE.test(v.lastVerifiedAt || ""))
      errs.push(`verification.lastVerifiedAt must be YYYY-MM-DD: ${v.lastVerifiedAt}`);
  } else if (v !== undefined) {
    errs.push("verification must be an object");
  }

  if (!Array.isArray(doc.fields) || doc.fields.length === 0) {
    errs.push("fields must be a non-empty array");
    return;
  }
  const seen = new Set();
  for (const [i, f] of doc.fields.entries()) {
    const at = `fields[${i}]`;
    if (f && typeof f === "object") {
      for (const k of Object.keys(f))
        if (k !== "name" && k !== "locators") errs.push(`${at} has unknown member: ${k}`);
    }
    const name = f && f.name;
    if (!FIELD_NAME_RE.test(name || "")) errs.push(`${at}.name invalid or missing: ${name}`);
    if (name && seen.has(name)) errs.push(`${at}.name duplicated: ${name}`);
    if (name) seen.add(name);
    if (name && schemaFieldNames && !schemaFieldNames.has(name))
      errs.push(`${at}.name "${name}" does not resolve to a field in the sibling schema.json`);

    const locators = f && f.locators;
    if (!Array.isArray(locators) || locators.length === 0) {
      errs.push(`${at}.locators must be a non-empty array`);
      continue;
    }
    for (const [j, loc] of locators.entries()) {
      const lat = `${at}.locators[${j}]`;
      if (loc && typeof loc === "object") {
        for (const k of Object.keys(loc))
          if (k !== "signal" && k !== "value") errs.push(`${lat} has unknown member: ${k}`);
      }
      if (!loc || !loc.signal) errs.push(`${lat}.signal is required`);
      if (!loc || !loc.value) errs.push(`${lat}.value is required`);
    }
  }
}

// Path/back-reference consistency for mapping.json: the sibling directory's
// <id>/[<edition>/]<version> MUST equal `schema.id` / `schema.version` inside
// the mapping document (the same rule §10 rule 1/6 apply to schema.json itself).
function validateMappingPath(file, doc, errs, hasEdition) {
  const rel = relative(REGISTRY, file).split(sep);
  const min = hasEdition ? 5 : 4;
  const shape = hasEdition
    ? "registry/<id>/<edition>/<version>/mapping.json"
    : "registry/<id>/<version>/mapping.json";
  if (rel.length < min || rel[rel.length - 1] !== "mapping.json") {
    errs.push(`file is not at ${shape}: ${rel.join("/")}`);
    return;
  }
  const versionDir = rel[rel.length - 2];
  const idFromPath = hasEdition
    ? rel.slice(0, rel.length - 3).join("/")
    : rel.slice(0, rel.length - 2).join("/");
  const s = doc.schema || {};
  if (s.id && s.id !== idFromPath)
    errs.push(`schema.id "${s.id}" does not match path "${idFromPath}"`);
  if (s.version && s.version !== versionDir)
    errs.push(`schema.version "${s.version}" does not match version directory "${versionDir}"`);
}

// Referential integrity of the committed registry-index.json (GOV-1234).
// `validatedByPath` maps the posix-style path (relative to ROOT, as computed
// by generate-index.mjs) of every schema.json found under registry/ to
// whether it passed structural validation and its parsed document — i.e.
// exactly the universe this same run of validate.mjs just checked. Every
// index entry must resolve into that universe with matching metadata;
// anything else is a dangling or drifted reference.
function validateIndexReferences(validatedByPath, errs) {
  if (!existsSync(INDEX_PATH)) {
    errs.push(`file not found: ${relative(ROOT, INDEX_PATH)}`);
    return;
  }
  let index;
  try {
    index = JSON.parse(readFileSync(INDEX_PATH, "utf8"));
  } catch (e) {
    errs.push(`invalid JSON: ${e.message}`);
    return;
  }
  if (!Array.isArray(index.schemas)) {
    errs.push("`schemas` must be an array");
    return;
  }

  for (const [i, entry] of index.schemas.entries()) {
    const at = `schemas[${i}] (${entry && entry.id}@${entry && entry.version})`;
    const path = entry && entry.path;
    if (!path || !existsSync(join(ROOT, path))) {
      errs.push(`${at}: path does not resolve to an existing file: ${path}`);
      continue;
    }
    const found = validatedByPath.get(path);
    if (!found) {
      errs.push(
        `${at}: path is not a registered registry/**/schema.json: ${path} ` +
          "(exists on disk but was not committed under registry/, or failed to parse as JSON)"
      );
      continue;
    }
    if (!found.valid)
      errs.push(`${at}: referenced file fails structural validation: ${path}`);
    if (found.doc.id !== entry.id)
      errs.push(`${at}: index id does not match document id "${found.doc.id}" at ${path}`);
    if (found.doc.version !== entry.version)
      errs.push(
        `${at}: index version does not match document version "${found.doc.version}" at ${path}`
      );
    const docEdition = (found.doc.edition && found.doc.edition.label) ?? null;
    if (docEdition !== (entry.edition ?? null))
      errs.push(
        `${at}: index edition "${entry.edition ?? null}" does not match document edition "${docEdition}" at ${path}`
      );
  }
}

function main() {
  const args = process.argv.slice(2);
  const files = args.length
    ? args.filter((f) => f.endsWith("schema.json"))
    : findSchemas(REGISTRY);
  const mappingFiles = args.length
    ? args.filter((f) => f.endsWith("mapping.json"))
    : findMappings(REGISTRY);

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
  if (files.length === 0 && mappingFiles.length === 0 && strayFailed === 0) {
    console.log("No schemas found under registry/. Nothing to validate.");
    return;
  }
  // dirname(schema.json) -> { fieldNames, hasEdition }, so a sibling mapping.json
  // can be checked against the schema actually on disk rather than re-deriving it.
  const schemaDirInfo = new Map();
  // posix-style path (relative to ROOT, matching generate-index.mjs) -> { valid, doc },
  // so registry-index.json entries can be cross-checked against what this run
  // actually found and validated (GOV-1234).
  const validatedByPath = new Map();
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

    schemaDirInfo.set(dirname(file), {
      hasEdition,
      fieldNames: new Set((Array.isArray(doc.fields) ? doc.fields : []).map((f) => f && f.name)),
    });

    const label = relative(ROOT, file);
    validatedByPath.set(label.split(sep).join("/"), { valid: errs.length === 0, doc });
    if (errs.length) {
      console.error(`FAIL ${label}`);
      for (const e of errs) console.error(`  - ${e}`);
      failed++;
    } else {
      console.log(`ok   ${label}`);
    }
  }

  // registry-index.json referential integrity (GOV-1234). Only meaningful
  // when scanning the whole registry — the index is a global artifact, not
  // scoped to whatever explicit paths were passed on the command line.
  let indexFailed = 0;
  if (!args.length) {
    const errs = [];
    validateIndexReferences(validatedByPath, errs);
    const label = relative(ROOT, INDEX_PATH);
    if (errs.length) {
      console.error(`FAIL ${label}`);
      for (const e of errs) console.error(`  - ${e}`);
      indexFailed = 1;
    } else {
      console.log(`ok   ${label}`);
    }
  }

  // Sibling mapping.json companions (spec v0.2, GSP-0011). Absence is never an
  // error; presence is validated structurally plus referential integrity
  // against the sibling schema.json actually found in the same directory.
  let mappingFailed = 0;
  for (const file of mappingFiles) {
    const errs = [];
    let doc;
    try {
      doc = JSON.parse(readFileSync(file, "utf8"));
    } catch (e) {
      console.error(`FAIL ${file}\n  - invalid JSON: ${e.message}`);
      mappingFailed++;
      continue;
    }

    const info = schemaDirInfo.get(dirname(file));
    if (!info) errs.push("no sibling schema.json found in the same directory");
    validateMappingDocument(doc, info && info.fieldNames, errs);
    validateMappingPath(file, doc, errs, info ? info.hasEdition : false);

    const label = relative(ROOT, file);
    if (errs.length) {
      console.error(`FAIL ${label}`);
      for (const e of errs) console.error(`  - ${e}`);
      mappingFailed++;
    } else {
      console.log(`ok   ${label}`);
    }
  }

  console.log(
    `\n${files.length - failed}/${files.length} document(s) passed.` +
      (mappingFiles.length
        ? ` ${mappingFiles.length - mappingFailed}/${mappingFiles.length} mapping.json companion(s) passed.`
        : "") +
      (strayFailed ? ` ${strayFailed} non-conforming registry file(s).` : "") +
      (indexFailed ? " registry-index.json has dangling/drifted entries." : "")
  );
  process.exit(failed || mappingFailed || strayFailed || indexFailed ? 1 : 0);
}

main();
