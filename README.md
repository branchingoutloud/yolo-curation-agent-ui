# YOLO Deep Agent — UI

This is the web UI for the **YOLO Curation & Training Agent** — a `deepagents`-native
system that takes a detection use case, sources and curates training data, trains a
YOLO model, evaluates it, and proposes iterations. This repo is the frontend only; the
agent itself (orchestrator + subagents + tools + sandboxes) lives in a **sibling
repo**, `yolo-deep-agent/`, and is served locally via `langgraph dev`.

This UI was originally based on [Deep Agents UI](https://github.com/langchain-ai/deep-agents-ui)
(MIT licensed, LangChain) and talks to any LangGraph deployment over the
`@langchain/langgraph-sdk` — no code changes were needed to point it at this project,
only configuration (Deployment URL + Assistant ID, below).

## Expected layout

```
some-parent-dir/
├── yolo-deep-agent/        # Python: agent.py, subagents/, skills/, tools/, backends/
└── deep-agents-ui/         # this repo
```

The two are independent git repos — run and develop them separately.

## Quickstart

**1. Start the agent's LangGraph server** (in the sibling `yolo-deep-agent/` repo):

```bash
cd ../yolo-deep-agent
pip install -U "langgraph-cli[inmem]"
langgraph dev
```

This should print something like:

```
- 🚀 API: http://127.0.0.1:2024
- 🎨 Studio UI: https://smith.langchain.com/studio/?baseUrl=http://127.0.0.1:2024
- 📚 API Docs: http://127.0.0.1:2024/docs
```

Confirm it's up before touching the UI:

```bash
curl http://127.0.0.1:2024/assistants/search -X POST -H "Content-Type: application/json" -d '{}'
```

should return an assistant whose ID matches the key set in `yolo-deep-agent/langgraph.json`
(e.g. `"yolo-agent"`).

**2. Install and run this UI**

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000). On first run you'll be prompted
to configure:

- **Deployment URL**: `http://127.0.0.1:2024` (the local LangGraph server above, or a
  deployed URL)
- **Assistant ID**: the graph key from `langgraph.json` — e.g. `yolo-agent`
- **LangSmith API Key** (optional for local dev): only needed if pointing at a
  deployed, non-local LangGraph server

Settings are editable anytime via the Settings button in the header. To skip the
setup form entirely (handy for repeated demo runs), set:

```bash
# .env.local
NEXT_PUBLIC_LANGSMITH_API_KEY="lsv2_xxxx"
```

Note the deployment URL and assistant ID themselves are only ever entered via the
Settings UI (and persisted to `localStorage`) — there's no env var for those.

## What shows up, and how it maps to the agent

| UI panel         | What it renders                                                                                                       | Backing agent concept                                |
| ---------------- | --------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| Chat thread      | Orchestrator's messages and `task()` calls to subagents                                                               | The orchestrator graph                               |
| Files panel      | Live virtual filesystem — `plan.md`, `sources.json`, `dataset/data.yaml`, `eval_report.md`, `weak_classes.json`, etc. | The agent's `CompositeBackend` / `FilesystemBackend` |
| Todos            | Whatever the orchestrator writes via `write_todos`                                                                    | Orchestrator's self-planning                         |
| Approval prompts | Pauses with approve/edit/reject when the orchestrator calls `request_approval`                                        | The three HITL gates (plan → model size → iteration) |

**Debug Mode** (toggle in the UI) steps the graph one LangGraph node at a time instead
of running end-to-end. Useful for rehearsing or isolating a failing subagent call —
turn it **off** for a live/demo run so the three gates pause only where the agent's
`interrupt_on` config says to, not on every node.

## Development

```bash
yarn dev            # dev server (Turbopack)
yarn build           # production build
yarn start           # run production build
yarn lint            # eslint .
yarn lint:fix        # eslint . --fix
yarn format          # prettier --write .
yarn format:check    # prettier --check .
```

There is no test suite configured in this repo.

## Fallback: agent-chat-ui

If this UI has rough edges against the agent's graph shape, the same LangGraph server
also works with [`langchain-ai/agent-chat-ui`](https://github.com/langchain-ai/agent-chat-ui)
with zero backend changes — just point it at the same deployment URL + assistant ID.
It won't show the Files/Todos panels, but chat and HITL approval still work.
