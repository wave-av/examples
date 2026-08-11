#!/usr/bin/env node
/**
 * WAVE agent-video demo — "an agent speaks, and video appears."
 *
 * Reproduces the keystone pipeline against the live WAVE API.
 *
 * All three steps verified end-to-end against api.wave.online and
 * media.wave.online with a real Big Buck Bunny source recording:
 *
 *   POST /v1/voice {text}          → 200 audio/mpeg (narration MP3)
 *   POST /v1/clips {source,in,out} → 201 clipId + signed delivery URL
 *   media.wave.online/...?sig=     → 200 video/mp4 (produced clip)
 *
 * Credentials from env (never committed):
 *   WAVE_API_KEY                clips:write (+ voice:write for synthesize)
 *   WAVE_ORG_ID                 owning org id
 *   WAVE_SOURCE_RECORDING_ID    registered source recording id
 */

import { readFileSync, writeFileSync } from 'node:fs';

const cmd = process.argv[2] ?? 'all';

const BASE = process.env.WAVE_BASE_URL ?? 'https://api.wave.online';
const MEDIA = process.env.WAVE_MEDIA_BASE ?? 'https://media.wave.online';
const KEY = process.env.WAVE_API_KEY;
const ORG = process.env.WAVE_ORG_ID ?? '';
const SRC = process.env.WAVE_SOURCE_RECORDING_ID ?? '';

if (!KEY) { console.error('WAVE_API_KEY required'); process.exit(1); }

function hdrs(accept) {
  const h = { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' };
  if (accept) h.Accept = accept;
  if (ORG) h['X-Organization-Id'] = ORG;
  return h;
}

async function api(method, path, body) {
  const r = await fetch(`${BASE}${path}`, {
    method,
    headers: hdrs(),
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const text = await r.text().catch(() => '');
  if (!r.ok) throw new Error(`${method} ${path} ${r.status} ${text.slice(0, 300)}`);
  return text;
}

async function synthesize(text) {
  const r = await fetch(`${BASE}/v1/voice`, {
    method: 'POST',
    headers: { ...hdrs(), Accept: 'audio/mpeg' },
    body: JSON.stringify({ text }),
  });
  if (!r.ok) throw new Error(`voice ${r.status}`);
  const mp3 = Buffer.from(await r.arrayBuffer());
  writeFileSync('demo-narration.mp3', mp3);
  console.log(`✓ synthesized ${mp3.length} bytes → demo-narration.mp3`);
  return mp3;
}

async function createClip(t, inSec, outSec) {
  if (!SRC) throw new Error('WAVE_SOURCE_RECORDING_ID required');
  const raw = await api('POST', '/v1/clips', {
    source: SRC, in: `${inSec}s`, out: `${outSec}s`, title: t,
  });
  const clip = JSON.parse(raw);
  const dur = String(clip.duration ?? '').replace(/s$/, '');
  console.log(`✓ clip ${clip.clipId.slice(0, 12)}… in=${clip.in} duration=${dur}s`);

  if (clip.assets?.[0]?.url) {
    console.log(`  delivery → ${clip.assets[0].url.slice(0, 70)}…`);
    const r = await fetch(clip.assets[0].url);
    if (r.ok) {
      const buf = Buffer.from(await r.arrayBuffer());
      const fn = `demo-clip-${clip.clipId.slice(0, 8)}.mp4`;
      writeFileSync(fn, buf);
      console.log(`  saved → ${fn} (${buf.length} bytes, ${r.headers.get('content-type')})`);
    }
  }
  return clip;
}

const DEMO_NARRATION = 'An agent watches, speaks, and clips. This is Wave.';

switch (cmd) {
  case 'synthesize':
    await synthesize(process.env.WAVE_NARRATION ?? DEMO_NARRATION);
    break;

  case 'clip': {
    const clip = await createClip(
      'wave-agent-demo',
      Number(process.env.WAVE_CLIP_IN ?? '0'),
      Number(process.env.WAVE_CLIP_OUT ?? '5'),
    );
    if (clip?.assets?.[0]?.url) {
      console.log(`\nopen the delivery URL in your browser to watch the produced clip:`);
      console.log(clip.assets[0].url);
    }
    break;
  }

  case 'all':
    await synthesize(process.env.WAVE_NARRATION ?? DEMO_NARRATION);
    await createClip('wave-agent-demo', 0, 5);
    break;

  default:
    console.error(`usage: node demo.mjs [ synthesize | clip | all ]`);
    process.exit(1);
}
