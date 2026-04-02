/**
 * WAVE SDK — Basic stream example
 *
 * Creates a live stream, starts it, and prints the playback URL.
 *
 * Usage:
 *   export WAVE_API_KEY=your_key_here
 *   npx tsx sdk/basic-stream/index.ts
 */
import { Wave } from '@wave-av/sdk';

const wave = new Wave({
  apiKey: process.env.WAVE_API_KEY!,
  organizationId: process.env.WAVE_ORG_ID,
});

async function main() {
  // Create a stream
  const stream = await wave.pipeline.create({
    title: 'My first stream',
    protocol: 'webrtc',
    recording_enabled: true,
  });
  console.log(`Created stream: ${stream.id}`);

  // Start it
  await wave.pipeline.start(stream.id);
  console.log('Stream started');

  // Wait for it to go live
  const live = await wave.pipeline.waitForLive(stream.id);
  console.log(`Playback URL: ${live.playback_url}`);

  // Stop after 10 seconds
  setTimeout(async () => {
    await wave.pipeline.stop(stream.id);
    console.log('Stream stopped');
  }, 10000);
}

main().catch(console.error);
