# ADK hello agent

Build an AI agent that monitors stream quality and auto-remediates issues.

## Setup

```bash
pnpm install
cp .env.example .env
# Add your WAVE_AGENT_KEY to .env
```

## Run

```bash
pnpm start
```

## What it does

1. Connects to WAVE as a registered agent
2. Monitors a stream for quality drops (bitrate, framerate, latency)
3. Logs alerts when quality degrades
4. Auto-remediates by adjusting encoding parameters
5. Exposes `/health` and `/metrics` endpoints

## Agent lifecycle

```
Init -> Starting -> Running (heartbeat every 30s) -> Stopping -> Done
                      |
                      +-> Healthy -> Degraded -> Auto-remediate -> Healthy
```
