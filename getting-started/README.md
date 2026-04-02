# Getting started with WAVE

Build your first live stream in under 5 minutes.

## Prerequisites

- Node.js 18+
- A WAVE API key ([get one free](https://wave.online/developers))

## 1. Install the SDK

```bash
npm install @wave-av/sdk
```

## 2. Create your first stream

```typescript
import { Wave } from '@wave-av/sdk';

const wave = new Wave({
  apiKey: process.env.WAVE_API_KEY!,
});

// Create a WebRTC stream
const stream = await wave.pipeline.create({
  title: 'My first stream',
  protocol: 'webrtc',
  recording_enabled: true,
});

console.log(`Stream created: ${stream.id}`);
console.log(`Ingest URL: ${stream.ingest_url}`);
```

## 3. Start streaming

```typescript
await wave.pipeline.start(stream.id);

// Wait for it to go live
const live = await wave.pipeline.waitForLive(stream.id);
console.log(`Live! Playback: ${live.playback_url}`);
```

## 4. Add captions

```typescript
const track = await wave.captions.generate({
  media_id: stream.id,
  media_type: 'stream',
  language: 'en',
  speaker_diarization: true,
});

console.log(`Captions started: ${track.id}`);
```

## 5. Create a clip

```typescript
const clip = await wave.clips.create({
  title: 'Best moment',
  source: {
    type: 'stream',
    id: stream.id,
    start_time: 60,
    end_time: 90,
  },
});

const ready = await wave.clips.waitForReady(clip.id);
console.log(`Clip URL: ${ready.playback_url}`);
```

## 6. Check analytics

```typescript
const viewers = await wave.pulse.getViewerAnalytics({
  time_range: '1h',
});

console.log(`Peak viewers: ${viewers.peak_concurrent}`);
console.log(`Unique viewers: ${viewers.unique_viewers}`);
```

## 7. Stop the stream

```typescript
await wave.pipeline.stop(stream.id);
console.log('Stream stopped');
```

## Error handling

```typescript
import { WaveError, RateLimitError } from '@wave-av/sdk';

try {
  await wave.pipeline.create({ title: 'Test', protocol: 'webrtc' });
} catch (error) {
  if (error instanceof RateLimitError) {
    console.log(`Rate limited. Retry after ${error.retryAfter}ms`);
  } else if (error instanceof WaveError) {
    console.log(`${error.code}: ${error.message}`);
  }
}
```

## Next steps

- [SDK reference](https://github.com/wave-av/sdk) — all 34 API modules
- [ADK](https://github.com/wave-av/adk) — build AI video agents
- [MCP server](https://github.com/wave-av/mcp-server) — give Claude/Cursor video capabilities
- [More examples](https://github.com/wave-av/examples)
