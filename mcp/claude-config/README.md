# MCP server setup for Claude Code

Add this to your Claude Code `.mcp.json` (or Cursor/Windsurf settings):

```json
{
  "mcpServers": {
    "wave": {
      "command": "npx",
      "args": ["-y", "@wave-av/mcp-server"],
      "env": {
        "WAVE_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

## Get an API key

1. Sign up at [wave.online](https://wave.online)
2. Go to Settings > API keys
3. Create a new key

## Verify it works

After adding the config, restart your AI tool. You should see 19 WAVE tools available:

- `wave_list_streams` — list your streams
- `wave_create_stream` — create a new stream
- `wave_start_stream` — start streaming
- `wave_stop_stream` — stop streaming
- `wave_get_stream_health` — check stream quality
- And 14 more for studio, analytics, billing, and production

## Staging

For testing, use a staging key:

```json
{
  "env": {
    "WAVE_API_KEY": "wave_test_your_key",
    "WAVE_BASE_URL": "https://staging.wave.online"
  }
}
```
