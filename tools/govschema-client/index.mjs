// @govschema/client — non-normative reference client for the GovSchema
// registry. See README.md: this is a convenience wrapper, not part of the
// standard. Everything it does — list, search, fetch, validate — an agent can
// do itself with a plain HTTPS GET and a JSON Schema validator; nothing here
// is authoritative in its own right.

import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const HERE = dirname(fileURLToPath(import.meta.url));
const BUNDLED_INDEX = JSON.parse(readFileSync(join(HERE, "registry-index.json"), "utf8"));

// Default remote source: the published registry on the `main` branch. Used
// only when no local checkout is found (e.g. a bare `npx` run with nothing
// cloned) — see README.md "Data sources".
const DEFAULT_BASE_URL = "https://raw.githubusercontent.com/hellogov-ai/govschema/main";

export class GovSchemaNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "GovSchemaNotFoundError";
  }
}

// Auto-detect a local repo checkout by walking up from this module looking
// for sibling registry/ and spec/ directories. Works when this package is
// installed inside a clone of the govschema repo (e.g. tools/govschema-client
// itself, or a workspace dependency); falls through to remote fetch otherwise.
function findLocalRoot() {
  let dir = HERE;
  for (let i = 0; i < 8; i++) {
    if (existsSync(join(dir, "registry")) && existsSync(join(dir, "spec"))) return dir;
    const parent = dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return null;
}

function specLine(version) {
  const m = /^(\d+)\.(\d+)\./.exec(version || "");
  return m ? `${m[1]}.${m[2]}` : null;
}

function schemaPath({ id, version, edition }) {
  return edition ? `registry/${id}/${edition}/${version}/schema.json` : `registry/${id}/${version}/schema.json`;
}

export class GovSchemaClient {
  /**
   * @param {object} [opts]
   * @param {string} [opts.registryRoot] - path to a local govschema repo checkout. Defaults to
   *   auto-detection, then the GOVSCHEMA_REGISTRY_ROOT env var, then remote HTTPS fetch.
   * @param {string} [opts.baseUrl] - base URL to fetch registry/spec files from when no local
   *   checkout is used. Defaults to the `main` branch on GitHub.
   * @param {object} [opts.index] - override the bundled registry-index.json (mainly for tests).
   */
  constructor(opts = {}) {
    this.registryRoot = opts.registryRoot || process.env.GOVSCHEMA_REGISTRY_ROOT || findLocalRoot();
    this.baseUrl = (opts.baseUrl || DEFAULT_BASE_URL).replace(/\/+$/, "");
    this.index = opts.index || BUNDLED_INDEX;

    this._ajv = new Ajv2020({ allErrors: true, strict: false });
    addFormats(this._ajv);
    this._metaValidators = new Map();
  }

  /** List documents from the bundled registry index. Optionally filter by status. */
  listSchemas({ status } = {}) {
    return this.index.schemas.filter((e) => !status || e.status === status);
  }

  /**
   * Search the bundled registry index by jurisdiction, process type, or free text.
   * All filters are optional and combine with AND.
   */
  search({ country, level, subdivision, process, q } = {}) {
    const needle = q ? q.toLowerCase() : null;
    return this.index.schemas.filter((e) => {
      if (country && e.jurisdiction?.country !== country.toUpperCase()) return false;
      if (level && e.jurisdiction?.level !== level) return false;
      if (subdivision && e.jurisdiction?.subdivision !== subdivision) return false;
      if (process && e.process?.type !== process) return false;
      if (needle) {
        const hay = `${e.id} ${e.title} ${e.authority?.name || ""}`.toLowerCase();
        if (!hay.includes(needle)) return false;
      }
      return true;
    });
  }

  _findIndexEntry({ id, version, edition }) {
    return this.index.schemas.find(
      (e) => e.id === id && e.version === version && (edition ? e.edition === edition : !e.edition)
    );
  }

  async _readPath(relPath) {
    if (this.registryRoot) {
      const full = join(this.registryRoot, relPath);
      if (!existsSync(full)) throw new GovSchemaNotFoundError(`no such file in local checkout: ${relPath}`);
      return readFileSync(full, "utf8");
    }
    const url = `${this.baseUrl}/${relPath}`;
    let res;
    try {
      res = await fetch(url);
    } catch (e) {
      throw new GovSchemaNotFoundError(`fetch failed for ${url}: ${e.message}`);
    }
    if (!res.ok) throw new GovSchemaNotFoundError(`fetch ${url} returned HTTP ${res.status}`);
    return res.text();
  }

  /** Fetch one document by (id, version[, edition]). Throws GovSchemaNotFoundError if absent. */
  async getSchema({ id, version, edition } = {}) {
    if (!id || !version) throw new TypeError("getSchema requires { id, version }");
    const entry = this._findIndexEntry({ id, version, edition });
    const relPath = entry ? entry.path : schemaPath({ id, version, edition });
    const text = await this._readPath(relPath);
    return JSON.parse(text);
  }

  async _metaSchemaValidator(line) {
    if (this._metaValidators.has(line)) return this._metaValidators.get(line);
    const text = await this._readPath(`spec/v${line}/govschema.schema.json`);
    const validate = this._ajv.compile(JSON.parse(text));
    this._metaValidators.set(line, validate);
    return validate;
  }

  /**
   * Validate a document against the GovSchema meta-schema for the spec line named by its own
   * `govschemaVersion` — the same check `tools/validate-ajv.mjs` runs in CI.
   * @returns {Promise<{valid: boolean, errors: Array}>}
   */
  async validate(document) {
    const line = specLine(document?.govschemaVersion);
    if (!line) {
      return {
        valid: false,
        errors: [{ message: `unknown/unsupported govschemaVersion: ${document?.govschemaVersion}` }],
      };
    }
    let validateFn;
    try {
      validateFn = await this._metaSchemaValidator(line);
    } catch (e) {
      return { valid: false, errors: [{ message: `cannot load meta-schema for spec v${line}: ${e.message}` }] };
    }
    const valid = validateFn(document);
    return { valid, errors: valid ? [] : validateFn.errors };
  }

  /** Return { id, version, edition, status, verification } for one document. */
  async getVerificationStatus({ id, version, edition } = {}) {
    const doc = await this.getSchema({ id, version, edition });
    return {
      id: doc.id,
      version: doc.version,
      edition: doc.edition?.label ?? null,
      status: doc.status,
      verification: doc.verification,
    };
  }
}
