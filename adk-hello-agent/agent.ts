import { StreamMonitorAgent } from "@wave-av/adk";

const monitor = new StreamMonitorAgent({
  apiKey: process.env.WAVE_AGENT_KEY!,
  agentName: "hello-quality-monitor",
  streamIds: [process.env.WAVE_STREAM_ID!],
  autoRemediate: true,

  onQualityDrop: async (alert) => {
    console.log(
      `Quality drop on ${alert.streamId}: ${alert.metric} = ${alert.value} (threshold: ${alert.threshold})`
    );
  },

  onRemediation: async (action) => {
    console.log(
      `Auto-remediated: ${action.type} on ${action.streamId}`
    );
  },
});

console.log("Starting quality monitor agent...");
await monitor.start();
console.log("Agent running. Press Ctrl+C to stop.");

process.on("SIGINT", async () => {
  console.log("Shutting down...");
  await monitor.stop();
  process.exit(0);
});
