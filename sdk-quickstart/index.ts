import { Wave } from "@wave-av/sdk";

const wave = new Wave({
  apiKey: process.env.WAVE_API_KEY!,
  organizationId: process.env.WAVE_ORG_ID!,
});

async function main() {
  // Create a WebRTC stream with recording
  const stream = await wave.pipeline.create({
    title: "SDK Quickstart Stream",
    protocol: "webrtc",
    recording_enabled: true,
  });
  console.log(`Stream created: ${stream.id}`);

  // Start streaming
  await wave.pipeline.start(stream.id);
  console.log("Stream started");

  // Fetch viewer analytics
  const viewers = await wave.pulse.getViewerAnalytics({
    time_range: "24h",
  });
  console.log(`Peak concurrent viewers: ${viewers.peak_concurrent}`);

  // Stop and clean up
  await wave.pipeline.stop(stream.id);
  console.log("Stream stopped");
}

main().catch(console.error);
