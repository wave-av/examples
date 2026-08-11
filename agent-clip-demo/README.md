# WAVE agent-video demo

"An agent speaks, and video appears."

This demo reproduces the keystone WAVE pipeline — from voice narration to
deliverable video clip — against the **live production API**.

## The pipeline

```
source recording (R2, org-scoped, registered)
    │
    ▼
POST /v1/voice {text}                       → 200 audio/mpeg  (narration MP3)
POST /v1/clips {source, in, out}            → 201 clipId
    │
    ▼ clip engine (CF Media Transformations)
    │
    ▼ <org>/clips/<clipId>/clip.mp4          → wave-clips bucket
    │
    ▼ signed URL via media.wave.online       → 200 video/mp4
```

All three steps were verified end-to-end against `api.wave.online` using a
real Big Buck Bunny source recording. The clip engine produced a 46KB,
5-second, 1280×720 H.264/AAC video served via signed delivery.

## Run it yourself

```bash
export WAVE_API_KEY=<your key with clips:write>
export WAVE_ORG_ID=<your org id>
export WAVE_SOURCE_RECORDING_ID=<registered recording id>

node demo.mjs all
```

This calls the live API, creates a clip, and downloads the produced video.

## Demos

| Command | What it does |
|---------|-------------|
| `node demo.mjs synthesize` | Call POST /v1/voice → save MP3 |
| `node demo.mjs create-clip` | Call POST /v1/clips → print signed URL |
| `node demo.mjs delivery` | Create clip + fetch bytes |
| `node demo.mjs all` | All three in sequence |

## Contract note

The live gateway accepts `{source: "<recordingId>", in: "0s", out: "5s"}`
(plain string source + relative time strings). The published SDK on `main`
still models an older object form; parity is tracked in `sdk` PR #67. This
demo uses direct `fetch` so it works today.

## Files

| File | Purpose |
|------|---------|
| `demo.mjs` | Runnable pipeline script |
| `index.html` | Showcase page with embedded demo video |
| `demo-video.mp4` | Sample output: WAVE narration over Big Buck Bunny clip |
| `package.json` | Project metadata |
