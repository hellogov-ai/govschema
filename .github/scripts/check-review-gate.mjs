#!/usr/bin/env node
// GOV-360: CI-enforced review-gate status check.
//
// All recent PR authorship and merges on this repo resolve to the same
// shared GitHub identity, so GitHub's native "require approving review"
// can't be turned on without deadlocking every merge (self-approval is
// blocked and there's no second identity to approve). This script enforces
// the process rule instead: a schema/spec PR must have a linked Paperclip
// "Review gate: GOV-XX ... (PR #N)" issue that has reached done/cancelled
// before the PR can merge.
//
// Paperclip company id and API URL are stable identifiers for this
// integration, not credentials — only the bearer token is secret.
const PAPERCLIP_API_URL = "https://govschema-paperclip.fly.dev";
const PAPERCLIP_COMPANY_ID = "22fe4f69-e337-4dcc-a989-99a5c016dac3";

const token = process.env.PAPERCLIP_REVIEW_GATE_RO_TOKEN;
const prNumber = process.env.PR_NUMBER;

if (!token) {
  console.error(
    "PAPERCLIP_REVIEW_GATE_RO_TOKEN is not set — cannot verify the review gate."
  );
  process.exit(1);
}
if (!prNumber) {
  console.error("PR_NUMBER is not set.");
  process.exit(1);
}

const gateTitleRe = new RegExp(
  `^Review gate: GOV-\\d+ .*\\(PR #${prNumber}\\)$`
);

async function paperclipGet(path) {
  const res = await fetch(`${PAPERCLIP_API_URL}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    throw new Error(`Paperclip API ${path} -> HTTP ${res.status}`);
  }
  return res.json();
}

async function main() {
  const issues = await paperclipGet(
    `/api/companies/${PAPERCLIP_COMPANY_ID}/issues?q=${encodeURIComponent(
      `(PR #${prNumber})`
    )}&limit=50`
  );
  const list = Array.isArray(issues) ? issues : issues.issues || [];
  const gates = list.filter((i) => gateTitleRe.test(i.title || ""));

  if (gates.length === 0) {
    console.error(
      `No linked "Review gate: GOV-XX ... (PR #${prNumber})" issue found.\n` +
        `This PR touches registry/** or spec/** and needs a review gate — ` +
        `see practices around schema PR review gates. Open one and re-run this check.`
    );
    process.exit(1);
  }

  const unresolved = gates.filter(
    (g) => g.status !== "done" && g.status !== "cancelled"
  );
  if (unresolved.length > 0) {
    console.error(
      `Review gate not resolved yet: ${unresolved
        .map((g) => `${g.identifier} (${g.status})`)
        .join(", ")}`
    );
    process.exit(1);
  }

  console.log(
    `Review gate resolved: ${gates
      .map((g) => `${g.identifier} (${g.status})`)
      .join(", ")}`
  );
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
