# WAVE examples

Working examples for the WAVE developer platform. Each directory is a standalone project you can clone and run.

## Examples

| Example | Package | Description |
|---------|---------|-------------|
| [`sdk-quickstart`](./sdk-quickstart) | [`@wave-av/sdk`](https://github.com/wave-av/sdk) | Create a stream, start it, and fetch viewer analytics |
| [`mcp-server-setup`](./mcp-server-setup) | [`@wave-av/mcp-server`](https://github.com/wave-av/mcp-server) | Configure WAVE tools in Claude, Cursor, or any MCP client |
| [`adk-hello-agent`](./adk-hello-agent) | [`@wave-av/adk`](https://github.com/wave-av/adk) | Build an AI agent that monitors stream quality |

## Prerequisites

- Node.js 18+
- A WAVE API key ([get one here](https://wave.online/settings/api-keys))

## Getting started

```bash
# Clone this repo
git clone https://github.com/wave-av/examples.git
cd examples

# Pick an example
cd sdk-quickstart
pnpm install
pnpm start
```

## Get help

- [Documentation](https://docs.wave.online)
- [SDK reference](https://github.com/wave-av/sdk)
- [Discussions](https://github.com/orgs/wave-av/discussions)

## License

[MIT](./LICENSE)
