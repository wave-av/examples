# MCP server setup

Configure the WAVE MCP server so your AI coding assistant can manage streams, productions, and analytics.

## 1. Get an API key

Create one at [wave.online/settings/api-keys](https://wave.online/settings/api-keys), or via CLI:

```bash
npx @wave-av/sdk auth login
```

## 2. Configure your AI tool

Add to your `.mcp.json` (Claude Code, Cursor, Windsurf):

```json
{
  "mcpServers": {
    "wave": {
      "command": "npx",
      "args": ["-y", "@wave-av/mcp-server"],
      "env": {
        "WAVE_API_KEY": "wave_live_..."
      }
    }
  }
}
```

### Claude Desktop

Add to `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "wave": {
      "command": "npx",
      "args": ["-y", "@wave-av/mcp-server"],
      "env": {
        "WAVE_API_KEY": "wave_live_..."
      }
    }
  }
}
```

## 3. Try it

Ask your AI assistant:

> "List my WAVE streams"

> "Create a new WebRTC stream called 'Team standup'"

> "Show me viewer analytics for the last 24 hours"

## Available tools

| Tool | Description |
|------|-------------|
| `wave_list_streams` | List streams with status filtering |
| `wave_create_stream` | Create a stream with protocol options |
| `wave_start_stream` | Start streaming |
| `wave_stop_stream` | Stop an active stream |
| `wave_get_stream_health` | Real-time health metrics |
| `wave_list_productions` | List studio productions |
| `wave_create_production` | Create a multi-camera production |
| `wave_get_viewer_analytics` | Viewer counts and trends |

See the full list in the [MCP server repo](https://github.com/wave-av/mcp-server).
