<div align="center">

# examples

**Working, runnable examples for the WAVE developer platform — the SDK, the ADK, and the MCP server. Each directory is a standalone project you can clone and run.**

![kind](https://img.shields.io/badge/kind-examples-555?style=flat-square) ![domain](https://img.shields.io/badge/domain-developer--tools-0a7?style=flat-square) ![lang](https://img.shields.io/badge/lang-TypeScript-3178c6?style=flat-square) ![visibility](https://img.shields.io/badge/visibility-public-brightgreen?style=flat-square) ![license](https://img.shields.io/badge/license-Apache--2.0-blue?style=flat-square)

[wave.online](https://wave.online) · [Docs](https://docs.wave.online) · [github](https://github.com/wave-av/examples)

</div>

---

## Examples

| Example | Package | Description |
| --- | --- | --- |
| [`sdk-quickstart`](./sdk-quickstart) | [`@wave-av/sdk`](https://github.com/wave-av/sdk) | Create a stream, start it, and fetch viewer analytics |
| [`adk-hello-agent`](./adk-hello-agent) | [`@wave-av/adk`](https://github.com/wave-av/adk) | Build an AI agent that monitors stream quality |
| [`mcp-server-setup`](./mcp-server-setup) | [`@wave-av/mcp-server`](https://github.com/wave-av/mcp-server) | Configure WAVE tools in Claude, Cursor, or any MCP client |
| [`getting-started`](./getting-started) | `@wave-av/sdk` | Walkthrough: your first live stream in under 5 minutes |
| [`mcp/claude-config`](./mcp/claude-config) | `@wave-av/mcp-server` | `.mcp.json` snippet for Claude Code / Cursor / Windsurf |

## Prerequisites

- Node.js 18+
- A WAVE API key ([get one here](https://wave.online/developers))

## Getting started

```bash
git clone https://github.com/wave-av/examples.git
cd examples

# Pick a runnable example (has its own package.json)
cd sdk-quickstart
pnpm install
pnpm start
```

The repo root also has two npm scripts wired to lighter-weight snippets:

```bash
pnpm run basic-stream    # runs sdk/basic-stream/index.ts
pnpm run stream-monitor  # runs adk/stream-monitor/index.ts
```

## Get help

- [Documentation](https://docs.wave.online)
- [SDK reference](https://github.com/wave-av/sdk)

## License

[Apache-2.0](./LICENSE) — see also [NOTICE](./NOTICE).

---

<!-- wave-standard-footer -->
<sub><b><a href="https://wave.online">wave.online</a></b> &nbsp;·&nbsp; <a href="https://docs.wave.online">Docs</a> &nbsp;·&nbsp; <a href="https://developer.wave.online">Developers</a></sub>
