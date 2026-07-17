# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A Next.js (App Router) UI for the **YOLO Curation & Training Agent** — a `deepagents`-native
system (orchestrator + subagents: planning, sourcing, annotation, dataset, training, eval) that
takes a detection use case, sources/curates training data, trains a YOLO model, evaluates it,
and proposes iterations. This repo is the frontend only. The agent itself lives in a **sibling
Python repo**, `yolo-deep-agent/` (not nested here — see `README.md`), served locally via
`langgraph dev`. This app is a thin client: it connects to that LangGraph deployment via
`@langchain/langgraph-sdk` and renders the agent's message stream, todos/tasks, and virtual
files. There is no backend of its own — all agent logic lives in the external LangGraph
deployment.

This UI package was originally forked from [langchain-ai/deep-agents-ui](https://github.com/langchain-ai/deep-agents-ui)
(MIT) and is framework-generic — it required no code changes to work with this project, only
configuration (Deployment URL + Assistant ID via the Settings dialog). Treat the architecture
notes below as still accurate; the project-specific pieces are the Assistant ID convention and
the file/gate names the agent writes, covered in "Project-specific mapping" below.

## Commands

```bash
yarn install       # install deps (yarn is the package manager, see packageManager field)
yarn dev            # run Next.js dev server with Turbopack, http://localhost:3000
yarn build          # production build
yarn start          # run production build
yarn lint           # eslint .
yarn lint:fix       # eslint . --fix
yarn format         # prettier --write .
yarn format:check   # prettier --check .
```

There is no test suite configured in this repo.

To exercise the app end-to-end you need the sibling `yolo-deep-agent/` repo's LangGraph
server running (`langgraph dev`, from that repo's root), plus a Deployment URL
(`http://127.0.0.1:2024` for local dev) + Assistant ID (the graph key from that repo's
`langgraph.json`, e.g. `yolo-agent`) entered into this app's Settings dialog. `.env.local`
(see `.env.local.example`) only covers the optional `NEXT_PUBLIC_LANGSMITH_API_KEY` —
deployment URL and assistant ID are never env vars, only Settings-dialog/localStorage state.

## Project-specific mapping

This UI is generic — it renders whatever `messages`/`todos`/`files`/interrupt state a graph
exposes (see `StateType` in `useChat.ts`). For the YOLO agent specifically:

| UI surface | What appears here | Source in `yolo-deep-agent` |
|---|---|---|
| Chat thread | Orchestrator messages, `task()` calls to subagents (planning/sourcing/annotation/dataset/training/eval) | The orchestrator graph (`agent.py`) |
| Files panel | `plan.md`, `class_budget.json`, `sources.json`, `annotation_manifest.json`, `dataset/data.yaml`, `runs/train/metrics.json`, `runs/train/status.md`, `eval_report.md`, `weak_classes.json` | The agent's `CompositeBackend`/`FilesystemBackend` (`backends/project_backend.py`) |
| Todos | Orchestrator's self-tracked plan | `write_todos` calls in the orchestrator prompt |
| Approval prompt (`ToolApprovalInterrupt`) | Pauses with approve/edit/reject, three times per run | The `request_approval` tool + `interrupt_on={"request_approval": {...}}` in `agent.py` |

There are exactly **three** approval gates in this agent (plan, model size, iteration plan) —
if the UI's approval card is appearing more often than that, the mismatch is almost always on
the agent side (e.g. `interrupt_on` accidentally keyed on `task` instead of `request_approval`),
not in this repo.

Debug Mode (the step-through toggle wired to `runSingleStep` in `useChat.ts`) is for rehearsing
subagent calls one node at a time — turn it off before a live/demo run so the three gates above
are the only pauses.

## Architecture

**Connection/config model**: There is no server-side session. Deployment URL, Assistant ID, and (optional) LangSmith API key are configured once in the browser via the Settings dialog (`ConfigDialog`) and persisted to `localStorage` (`src/lib/config.ts`, key `deep-agent-config`). `HomePage` (`src/app/page.tsx`) reads this config on mount; if absent it forces the config dialog open. `assistantId` and `threadId` are also mirrored into the URL query string via `nuqs` so threads/assistants are shareable/bookmarkable and survive reloads.

**Client/provider layering** (outer to inner):
- `ClientProvider` (`src/providers/ClientProvider.tsx`) — constructs a single `@langchain/langgraph-sdk` `Client` from the deployment URL + API key and exposes it via `useClient()`.
- `ChatProvider` (`src/providers/ChatProvider.tsx`) — wraps the `useChat` hook's return value in context (`useChatContext()`), scoped to one active assistant/thread.
- `useChat` (`src/app/hooks/useChat.ts`) — the core integration point with LangGraph's `useStream` hook. It defines `StateType` (the shape of graph state this UI understands: `messages`, `todos`, `files`, `email`, `ui`) and wraps `stream.submit(...)` for the different interaction modes: `sendMessage`, `runSingleStep` (debug/step mode using checkpoints and `interruptBefore/After: ["tools"]`), `continueStream`, `resumeInterrupt` (answers a HumanInTheLoop interrupt), `markCurrentThreadAsResolved`, and `stopStream`.
- `useThreads` (`src/app/hooks/useThreads.ts`) — SWR-infinite-backed thread list/search against the same deployment, independent of the active chat stream (used by `ThreadList`).

**Debug/step mode**: The graph can be run fully end-to-end or stepped one tool call at a time via `runSingleStep`, using LangGraph checkpoints and `interruptBefore`/`interruptAfter: ["tools"]`. This is intended to pair with re-running specific steps (e.g. sub-agent calls) rather than only linear replay — see the `isRerunningSubagent` branch in `useChat.ts`.

**Message/tool-call reconciliation**: LangGraph streams raw `Message[]` (human/ai/tool), where tool calls and their results arrive as separate messages linked by `tool_call_id`. `ChatInterface.tsx` reconstructs a UI-friendly structure in `processedMessages`: it walks messages, attaches tool calls (from `tool_calls`, `additional_kwargs.tool_calls`, or `content` blocks of type `tool_use`, depending on model/provider shape) to their parent AI message, then matches later `tool` messages back to those calls by `tool_call_id` to fill in `status`/`result`. Do not assume tool calls always show up in one canonical field — handle all three shapes if touching this logic.

**HumanInTheLoop interrupts**: When the graph interrupts (e.g. for tool approval), `interrupt.value` carries `action_requests` (what the agent wants to do) and optional `review_configs` (what decisions are allowed per action). `ChatInterface` builds lookup maps for these keyed by action/tool name and passes them to the last message's `ChatMessage`/`ToolApprovalInterrupt`, which resolves the interrupt via `resumeInterrupt`.

**Virtual filesystem and tasks**: The agent's state includes a `files: Record<string, string>` map (a virtual FS the agent can read/write) and `todos: TodoItem[]` (its task list). These are rendered read/write (files editable via `setFiles`, which calls `client.threads.updateState`) in the collapsible tasks/files panel above the input box (`TasksFilesSidebar.tsx`'s `FilesPopover`) and are disabled while the stream is loading or an interrupt is pending.

**Directory layout**:
- `src/app/` — Next.js App Router root: `page.tsx` (the only real route), `layout.tsx`, and app-specific `components/`, `hooks/`, `types/`, `utils/` (business logic tied to this app, as opposed to generic UI primitives).
- `src/components/ui/` — generic shadcn/ui primitives (Radix-based: dialog, select, tabs, tooltip, resizable panels, etc.). Config in `components.json`; import alias `@/components/ui`. Prefer extending/composing these over hand-rolling new primitives.
- `src/providers/` — React context providers (`ClientProvider`, `ChatProvider`) — cross-cutting state, not UI.
- `src/lib/` — small standalone utilities/config not specific to the chat feature (`config.ts` for localStorage config, `utils.ts` for `cn()`).
- Path alias `@/*` maps to `src/*` (see `tsconfig.json`).

**Styling**: Tailwind CSS (with `tailwindcss-animate`, container queries, forms, typography plugins) plus `sass`. Use `cn()` (`src/lib/utils.ts`, clsx + tailwind-merge) to compose conditional class names rather than manual string concatenation.

## Conventions

- `@typescript-eslint/no-explicit-any` is disabled project-wide — `any` shows up deliberately around LangGraph message/tool-call shapes that vary by model provider; don't add lint suppressions for it.
- Unused function args are not flagged unless they don't start with `_`; unused vars follow the same `_`-prefix escape hatch (see `eslint.config.js`).
- Client components are marked `"use client"` explicitly (e.g. providers, page, interactive components) — this is a client-heavy app; only add server components where there's an actual reason to.
