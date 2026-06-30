
## Agent Chat (interactive chat plugin)

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

## Agent Chat (interactive chat plugin)

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
