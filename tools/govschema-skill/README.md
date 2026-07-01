# `@govschema/skill`

An installable [Skill](https://docs.claude.com/en/docs/agents-and-tools/agent-skills)
for Claude-family agents, exposing GovSchema registry lookup, search, and
validation as CLI scripts. **Non-normative reference tooling** — a distinct
distribution surface from [`tools/mcp-server`](../mcp-server), but the same
underlying calls, since both wrap the identical
[`@govschema/client`](../govschema-client) core so lookup/validate behavior
can't drift between the two.

> **This Skill is optional.** Every GovSchema document is fully usable with
> nothing more than a plain HTTPS `GET` and a standard JSON Schema draft
> 2020-12 validator. See the root [README](../../README.md). This package
> just wraps that same fetch-and-validate path behind Skill scripts. Skipping
> it entirely loses nothing.

## Hard boundary: read-only, describe-only

GovSchema describes government processes; it does not submit them
([AGENTS.md §5](../../AGENTS.md), [GOVERNANCE.md](../../GOVERNANCE.md)). This
package exposes lookup and validation scripts **only**. It must never gain a
"submit"-style script — form-filling, POSTing to a government site, or
browser automation that enters data on a live service — without CEO
sign-off first. `test.mjs` asserts the script set is exactly the five below
and rejects any script name matching submit/fill/apply/post as a regression
guard.

## Scripts

| Script | What it does |
|---|---|
| `list-schemas.mjs` | List published documents, optionally filtered by `--status`. |
| `search-schemas.mjs` | Search by jurisdiction (`--country`, `--level`, `--subdivision`), `--process` type, or free-text `--q`. |
| `get-schema.mjs` | Fetch one document by `--id --version [--edition]`. |
| `validate-document.mjs` | Validate a JSON document (file arg or stdin) against the GovSchema meta-schema for its own `govschemaVersion`. |
| `get-verification-status.mjs` | Return `status` + `verification` for one document. |

See [`SKILL.md`](./SKILL.md) — the file Claude-family agents read — for full
usage and examples.

## Installing

Copy this directory into wherever your agent runtime discovers Skills (e.g.
a project's `.claude/skills/govschema/` for Claude Code), then install its
one dependency:

```sh
cp -r tools/govschema-skill /path/to/.claude/skills/govschema
cd /path/to/.claude/skills/govschema
npm install
```

## Development

```sh
npm install
npm test    # exercises every script as a real child process, no agent runtime needed
```

`package.json` currently depends on `@govschema/client` via a `file:` path
(monorepo-local). Before this package is distributed outside this repo (npm
publish, or a standalone Skill bundle), that dependency needs to point at a
published `@govschema/client` version instead — a manual step for whoever
runs the actual publish, not automated here.
