# GovSchema

**Open standards for how AI agents interact with government services.**

GovSchema publishes versioned, machine-readable **schemas** for government forms
and processes — DMV systems, passports, visas, company formation, and beyond —
together with **verification practices** that confirm each schema matches its
live government source. It is the standard layer that agent developers build on
top of.

GovSchema is stewarded by an independent, non-profit foundation. We are to
agent–government interaction what ISO, the IETF, and the W3C are to their
domains: a neutral body that defines and maintains the standard.

> **What this is for two audiences.**
> For **agent developers**: a stable, validated, semantically-versioned schema
> you can fetch, pin, and program against — with provenance and a verification
> record attached, so you know how current it is.
> For **the people those agents act on behalf of**: a public, auditable record
> of what a government process actually asks for, maintained by a neutral
> non-profit — not a black box.

> **What this is not.** GovSchema is **not** a government entity and is **not**
> endorsed by or affiliated with any government. It does **not** fill out or
> submit forms — it is the standard, not the agent. It stores **no** personal
> data: schemas describe forms, they don't contain anyone's answers.

This is an early, founding-stage project. We are founding a standard, and the
specification line is explicitly pre-stable (`v0.x`).

## Repository layout

| Path             | What lives there                                                        |
| ---------------- | ----------------------------------------------------------------------- |
| [`spec/`](./spec) | The GovSchema specification and its machine-readable meta-schema.      |
| [`registry/`](./registry) | All published schemas, one immutable directory per version.    |
| [`discovery/`](./discovery) | The discovery catalog — a prioritized backlog of processes to schematize next. |
| [`practices/`](./practices) | Verification practices — documented methods for confirming a schema matches its source. |
| [`tools/`](./tools) | Tooling to validate schemas (zero-dependency, CI-ready), plus an optional reference client and MCP server for agent consumption. |
| [`site/`](./site) | The landing/marketing site — a data-driven static generator (zero-dependency). |
| [`VERSIONING.md`](./VERSIONING.md) | How the spec and each schema are versioned.            |
| [`GOVERNANCE.md`](./GOVERNANCE.md) | How decisions are made.                                |
| [`CONTRIBUTING.md`](./CONTRIBUTING.md) | How to add or correct a schema.                    |

## A schema at a glance

A GovSchema document is one JSON object describing one government process: its
jurisdiction and authority, the exact live source it was derived from, the
fields an agent must collect (typed, validated, and traced to the source form),
an optional process flow, and a verification record. It validates against the
meta-schema for the spec line it targets — the current line is
[`spec/v0.2/govschema.schema.json`](./spec/v0.2/govschema.schema.json) (which adds
an `edition` axis for time-versioned forms; v0.1 documents remain conforming and
validate against [`spec/v0.1`](./spec/v0.1/govschema.schema.json)).

See the reference schemas:
- [`registry/us/ca/dmv/vehicle-registration-renewal/1.0.0`](./registry/us/ca/dmv/vehicle-registration-renewal/1.0.0/schema.json)
- [`registry/gb/hmpo/passport-renewal-adult/1.0.0`](./registry/gb/hmpo/passport-renewal-adult/1.0.0/schema.json)

## Registry layout & versioning (the short version)

A schema's location is derived from its identity:

```
registry/<country>/<…>/<process>/<version>/schema.json
        └─────────── id ───────────┘ └ semver ┘
```

The `id` and `version` inside the document must match the path; tooling enforces
it. Each schema carries its **own** semantic version: MAJOR = breaking for a
consuming agent, MINOR = backward-compatible addition, PATCH = no contract
change (e.g. a re-verification). Published version directories are **immutable** —
corrections ship as a new version, so a pinned `(id, version)` always resolves
to the same bytes. Full rules: [registry/README.md](./registry/README.md) and
[VERSIONING.md](./VERSIONING.md).

## Validate locally

```sh
node tools/validate.mjs
```

Checks every schema against the meta-schema and confirms each one's
`id`/`version` match its path. Runs with plain Node (≥18), no install. CI runs
the same check on every push and pull request.

## Scope

GovSchema is global and multi-jurisdictional by design. Early coverage focuses
on a small number of jurisdictions (the schemas above are format references),
but no jurisdiction is privileged — every country sits at the same top level of
the registry.

## Contributing

We welcome new schemas, corrections, re-verifications, and tooling. Start with
[CONTRIBUTING.md](./CONTRIBUTING.md) and the
[specification](./spec/v0.2/README.md). All participation is under our
[Code of Conduct](./CODE_OF_CONDUCT.md).

## License

- **Schema content, specification text, and verification practices**
  (`registry/`, `spec/`, `practices/`): [CC-BY-4.0](./LICENSE-SCHEMAS).
- **Tooling and code** (`tools/`): [Apache-2.0](./LICENSE).
