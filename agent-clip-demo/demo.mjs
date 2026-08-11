#!/usr/bin/env node
/**
 * WAVE agent-video demo — "an agent speaks, and video appears."
 *
 * Reproduces the keystone pipeline against the live WAVE API:
 *
 *   1. synthesize — call POST /v1/voice → real MP3 narration
 *   2. create-clip — call POST /v1/clips {source, in, out} → clipId
 *   3. delivery   — fetch the produced clip from media.wave.online
 *
 * Credentials (from env, never committed):
 *   WAVE_API_KEY                key with clips:write (+ voice:write for demo 1)
 *   WAVE_ORG_ID                 owning org id (X-Organization-Id header)
 *   WAVE_SOURCE_RECORDING_ID     an existing registered source recording id
 *
 * Usage:
 *   export WAVE_API_KEY=... WAVE_ORG_ID=... WAVE_SOURCE_RECORDING_ID=...
 *   node demo.mjs [synthesize | create-clip | delivery | all]
 */
const cmd = process.argv[2] ?? 'all';

const BASE = process.env.WAVE_BASE_URL ?? 'https://api.wave.online';
const MEDIA = process.env.WAVE_MEDIA_BASE ?? 'https://media.wave.online';
const API_KEY = process.env.WAVE_API_KEY;
const ORG = process.env.WAVE_ORG_ID ?? '';
const SOURCE = process.env.WAVE_SOURCE_RECORDING_ID ?? '';

if (!API_KEY) { console.error('WAVE_API_KEY required'); process.exit(1); }
if (!SOURCE && cmd !== 'synthesize') { console.error('WAVE_SOURCE_RECORDING_ID required'); process.exit(1); }

function hdrs(accept) {
  const h = { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' };
  if (accept) h.Accept = accept;
  if (ORG) h['X-Organization-Id'] = ORG;
  return h;
}

async function api(method, path, body) {
  const opts = { method, headers: hdrs() };
  if (body) opts.body = JSON.stringify(body);
  const r = await fetch(`${BASE}${path}`, opts);
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
  const buf = Buffer.from(await r.arrayBuffer());
  console.log(`synthesize: ${buf.length} bytes MP3 for "${text.slice(0, 50)}..."`);
  return buf;
}

async function createClip(inSec, outSec, title) {
  const raw = await api('POST', '/v1/clips', { source: SOURCE, in: `${inSec}s`, out: `${outSec}s`, title });
  const clip = JSON.parse(raw);
  const dur = String(clip.duration ?? '').replace(/s$/, '');
  console.log(`create-clip: id=${clip.clipId} org=${clip.org} in=${clip.in} duration=${dur}s`);
  if (clip.assets?.[0]?.url) {
    console.log(`create-clip: delivery url => ${clip.assets[0].url}`);
  }
  if (clip.assets?.[0]?.key) {
    console.log(`create-clip: asset key => ${clip.assets[0].key}`);
  }
  return clip;
}

import { writeFile } from 'node:fs/promises';

async function delivery(url) {
  const r = await fetch(url);
  const buf = Buffer.from(await r.arrayBuffer());
  const ct = r.headers.get('content-type') ?? 'unknown';
  console.log(`delivery: ${buf.length} bytes (${ct})`);
  const fn = `wave-demo-${Date.now()}.mp4`;
  await writeFile(fn, buf);
  console.log(`delivery: saved to ${fn}`);
  return buf;
}

async function doSynthesize() {
  const text = process.env.WAVE_NARRATION ?? 'An agent watches, speaks, and clips. This is Wave.';
  return synthesize(text);
}

async function doCreateClip() {
  const in0 = process.env.WAVE_CLIP_IN ?? '0';
  const out0 = process.env.WAVE_CLIP_OUT ?? '5';
  const clip = await createClip(Number(in0), Number(out0), 'wave-agent-demo');
  return clip;
}

async function doDelivery() {
  const clip = await doCreateClip();
  const url = clip.assets?.[0]?.url;
  if (!url) throw new Error('no delivery url returned from clip create');
  return delivery(url);
}

const dispatch = { synthesize: doSynthesize, 'create-clip': doCreateClip, delivery: doDelivery };
const runner = dispatch[cmd] ?? (async () => { await doSynthesize(); await doCreateClip(); await doDelivery(); });

runner().catch(err => { console.error(err.message); process.exit(1); });
