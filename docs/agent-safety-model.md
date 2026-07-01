# The GovSchema agent safety model

This page restates, in plain language, what any agent, script, or service
built on GovSchema must and must not do. It exists for the reader who wants
the boundary before the specification — the normative version lives in
`spec/v0.3/SPEC.md` §14, "Agent conformance and safety boundary" (proposed as
[GSP-0017](../spec/proposals/0017-agent-conformance-safety-boundary.md));
where this page and that section disagree, the specification governs.

It applies to every way of consuming GovSchema listed in
[`docs/agent-consumption.md`](./agent-consumption.md) — a raw fetch, `llms.txt`,
the reference MCP server, the installable Skill, or your own client built
from scratch. None of them is a lighter-weight exception to any rule below.

## The one-sentence version

**GovSchema describes government processes. It does not authorize acting on
them, and neither does anything built on top of it.**

## The six rules

1. **A GovSchema document is not permission to submit anything.** Reading a
   schema, validating data against it, or seeing every field pass its
   `validation` rules never means "go ahead and send this to the
   government." GovSchema publishes the standard layer that submission
   agents are built on — it is not, and does not authorize, the act of
   submission itself.

2. **Always get a real "yes" before the final submit.** No matter how
   complete or well-validated the collected data looks, a conforming agent
   asks the human for explicit, informed confirmation immediately before any
   action that actually sends something to a government system. Passing
   validation is a statement about data shape; it says nothing about whether
   the user has actually reviewed and authorized what's about to happen.

3. **Handle sensitive and identity data more carefully than everything
   else.** If a field is marked with a non-default `classification`
   ([GSP-0006]) or a document requirement's `category` is
   `identity-document` ([GSP-0014]) — a passport number, a national ID, a
   birth certificate scan — treat it with at least: explicit confirmation
   before you use it, and never send it to a third party without the user's
   consent. That's a floor. Do more if your context calls for it (encrypt it
   at rest, don't log it in plaintext); never do less.

4. **Tell the user (or account for it yourself) when a schema might be
   stale.** Every GovSchema document carries a `status` (`draft` /
   `verified` / `deprecated`) and a `verification` record — and, once
   [GSP-0012]'s `maturity` badge lands, a maturity level too. Before you rely
   on a document to collect or check data, surface that signal to the user
   or factor it into your own logic. Don't quietly treat a `draft` or
   `deprecated` document, or one whose next scheduled review has already
   passed, as if it were current and fully checked.

5. **Never claim government backing.** GovSchema is independent. It is not a
   government entity and is not endorsed, certified, or affiliated with any
   government agency (see [`GOVERNANCE.md`](../GOVERNANCE.md)). Nothing you
   build on it — a form, a summary, a generated document — gets to claim
   otherwise. If a user could reasonably read your agent's output as
   official, that's a bug to fix, not a nuance to explain away.

6. **These rules don't get lighter the more convenient the layer is.**
   Whether you're hitting `registry/` over raw HTTPS, using `llms.txt` to
   discover schemas, calling the reference MCP server, or running the
   installable Skill — all five rules above apply exactly the same way.
   "It's just a thin wrapper" is not an exemption.

## Why this is honest about its limits

GovSchema is a set of published files and validation tooling. It has no
runtime in which to watch your agent operate and confirm it actually asked
the user before submitting, or actually handled a classified field
carefully. Rule 6's uniform application is the one place today where the
standard *can* enforce a piece of this structurally: the non-submitting
conformance fixtures ([GSP-0016]) have no "submit" action anywhere in their
vocabulary, so a fixture author cannot author a submission step even by
mistake. The rest of these rules are stated as real, normative obligations —
not aspirations — even though checking a specific implementation's compliance
with rules 2–5 is, for now, a matter of review and trust rather than
automated CI. A clearly stated boundary with an honest enforcement gap is
still worth more than no stated boundary at all.

[GSP-0006]: ../spec/proposals/0006-sensitivity-classification.md
[GSP-0012]: ../spec/proposals/0012-schema-maturity-levels.md
[GSP-0014]: ../spec/proposals/0014-documents-as-first-class-model.md
[GSP-0016]: ../spec/proposals/0016-conformance-fixtures.md
