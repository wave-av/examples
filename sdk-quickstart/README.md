# SDK quickstart

Create a live stream, start it, and fetch viewer analytics with `@wave-av/sdk`.

## Setup

```bash
pnpm install
cp .env.example .env
# Add your WAVE_API_KEY to .env
```

## Run

```bash
pnpm start
```

## What it does

1. Creates a WebRTC stream with recording enabled
2. Starts the stream
3. Fetches 24-hour viewer analytics
4. Prints peak concurrent viewers
5. Stops the stream and cleans up
