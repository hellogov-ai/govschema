# AGENTS.md — GovSchema Operating Guide

> Read this file first, before doing any work. It defines what GovSchema is, the
> hard boundaries you must never cross, and how you are expected to operate.
> Claude Code and other agents read this automatically; treat it as binding.

## 1. Mission
GovSchema is a private, open-source foundation building the open standards that let
AI agents interact reliably with government services — DMV systems, passports,
visas, company formation, and beyond.

## 2. Vision
A world where any AI agent can reliably complete a government process on behalf of
a human, because the schema for that process is open, trusted, and maintained — the
same way ISO standards let machines and industries interoperate predictably.

## 3. Who We Serve
- **Primary user:** AI agents that navigate government forms, websites, and
  processes programmatically.
- **Secondary user (beneficiary):** the humans those agents act on behalf of.
- Public-facing copy should speak to both: technical credibility for agent builders,
  and a plain-language safety outcome for the human end-user.

## 4. What Success Looks Like
- Published, versioned, machine-readable schemas for government forms/processes.
- Published verification practices to confirm a schema is accurate and current.
- Broad adoption by agent developers building against GovSchema instead of scraping.
- Recognition as the de facto standards body — the "ISO for agent-government interaction."

## 5. Hard Boundaries — NEVER cross these
- **Not government-affiliated.** Never imply official endorsement by any government
  or agency. We are independent and open-source.
- **Not an agent product.** We do NOT build or sell an AI agent that fills out forms.
  We build the schema/standard layer agents are built on.
- **Global from day one.** Not a single-country effort, even if early schemas focus
  on a few jurisdictions.
- **Not a SaaS with a pricing page.** Avoid product-sales language ("buy now,"
  "pricing tiers") unless a specific monetization model is explicitly defined.
- **Never reveal, log, print, or commit secrets** (tokens, keys, `.env`). See §8.

## 6. Glossary (use consistently)
- **Schema** — a standardized, machine-readable definition of a government form,
  process, or website interaction (fields, validation rules, flow steps) an agent
  can consume programmatically.
- **Verification practice** — a documented method for confirming a schema is
  accurate, current, and matches the live government source.
- **Agent** — an autonomous/semi-autonomous AI system acting on behalf of a human.
- **Standard** — the overall specification (format, conventions, governance) all
  GovSchema schemas conform to.
- **Foundation** — GovSchema the organization. Never use "foundation" to mean the
  schema library or tech stack.

## 7. Voice & Tone (for any public/marketing/landing content)
- Credible, technical, standards-body tone — closer to ISO/IETF/W3C than a startup.
  Confidence without hype.
- Avoid AI-hype language ("revolutionary," "supercharge," "game-changing"). Lead
  with precision and proof (real schemas, real coverage, real verification methods).
- It's fine to acknowledge this is early — frame it as "founding the standard,"
  not "disrupting an industry."

## 8. Secrets & Credentials
The following are available in your environment. Use them; never expose them.
- `GITHUB_TOKEN` — git push/PR access to GovSchema repos.
- `VERCEL_TOKEN`, `VERCEL_ORG_ID` — Vercel deploys (team scope = `VERCEL_ORG_ID`).
- `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID` — DNS for `govschema.org`.
- `ANTHROPIC_API_KEY`, `OPENROUTER_API_KEY`, `REPLICATE_TOKEN` — model/inference access.

Rules:
- Never print, echo, or log secret values. Never commit them or any `.env` file.
- Reference them only via environment variables in commands.
- If a secret seems missing or invalid, stop and report it — do not hardcode a value.

## 9. Repositories
- **`hellogov-ai/govschema`** — PUBLIC repo for the standard (the spec + the
  machine-readable schemas). Route all standard/schema work here.
- **`hellogov-ai/govschema-landing`** — PRIVATE repo containing the public-facing
  Next.js landing site (marketing + docs), deployed to Vercel. Route site,
  marketing, and docs work here.

## 10. Domain & DNS
- `govschema.org` is our domain, already set up in Cloudflare.
- `CLOUDFLARE_API_TOKEN` can edit DNS for `govschema.org`. Read existing records
  first, make the minimal change, and never delete records you didn't intend to touch.

## 11. How You Operate (autonomy: FULL)
You are authorized to ship autonomously. You do not need to wait for human approval
to merge, deploy to production, or change DNS. With that authority:
- **Git:** work on a feature branch, open a PR with a clear description, then you may
  merge it yourself. Keep `main` releasable at all times. Use clear, conventional
  commit messages. Never force-push `main`.
- **Deploys (Vercel):** production deploys are allowed.
  `npx vercel deploy --prod --token "$VERCEL_TOKEN" --scope "$VERCEL_ORG_ID"`.
- **DNS (Cloudflare):** changes to `govschema.org` are allowed via the Cloudflare API.
- **Quality gate before shipping:** run available build/lint/tests; don't deploy a
  broken build. Verify the deploy/DNS change took effect, then summarize what you did.
- **Be reversible:** prefer changes that are easy to roll back. Document anything
  destructive in the PR/commit body.

## 12. Working Style
- Start from the goal; break it into small, verifiable steps.
- Leave the repo better than you found it: docs, tests, and types where reasonable.
- When you finish a unit of work, report: what changed, why, links to PR/deploy, and
  any follow-ups.

## 13. Agent Chat (interactive chat plugin)
When `$PAPERCLIP_WAKE_REASON` is `Agent Chat`, a human has messaged you directly
through the Agent Chat plugin. Skip the normal heartbeat/task workflow and instead:

1. Read your chat inbox at `~/.agent-chat/<your-agent-id>.md`. Get your agent id with:
   `curl -s -H "Authorization: Bearer $PAPERCLIP_API_KEY" "$PAPERCLIP_API_URL/api/agents/me" | python3 -c "import sys,json; print(json.load(sys.stdin)['id'])"`
2. Respond conversationally to the latest message from the board.
3. You have full access to your workspace, project files, tools, and the Paperclip
   API — use them to answer accurately and to take the actions the human asks for
   (e.g. create/assign issues, delegate to other agents, kick off work).
4. Output your response as plain text and exit cleanly.
5. Do NOT run the regular task-inbox/heartbeat workflow during an Agent Chat wake.
