# WAVE examples

Working code examples for the WAVE developer platform.

## SDK examples

| Example | Description | Run |
|---------|-------------|-----|
| [basic-stream](./sdk/basic-stream/) | Create and start a live stream | `npx tsx sdk/basic-stream/index.ts` |
| [clips](./sdk/clips/) | Create clips from a stream | `npx tsx sdk/clips/index.ts` |
| [captions](./sdk/captions/) | Generate captions with speaker diarization | `npx tsx sdk/captions/index.ts` |
| [analytics](./sdk/analytics/) | Query viewer analytics | `npx tsx sdk/analytics/index.ts` |

## ADK examples

| Example | Description | Run |
|---------|-------------|-----|
| [stream-monitor](./adk/stream-monitor/) | Autonomous stream quality monitor | `npx tsx adk/stream-monitor/index.ts` |
| [clip-factory](./adk/clip-factory/) | AI-powered highlight clipper | `npx tsx adk/clip-factory/index.ts` |

## MCP server

| Example | Description |
|---------|-------------|
| [claude-config](./mcp/claude-config/) | Configure MCP server for Claude Code |
| [cursor-config](./mcp/cursor-config/) | Configure MCP server for Cursor |

## Prerequisites

- Node.js 18+
- A WAVE API key ([get one free](https://wave.online/developers))

## Setup

```bash
git clone https://github.com/wave-av/examples.git
cd examples
npm install
export WAVE_API_KEY=your_key_here
```

## License

MIT
