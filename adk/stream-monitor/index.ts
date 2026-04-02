/**
 * WAVE ADK — Stream monitor agent example
 *
 * Monitors stream quality and logs alerts.
 *
 * Usage:
 *   export WAVE_AGENT_KEY=your_key_here
 *   npx tsx adk/stream-monitor/index.ts
 */
import { AgentToolkit } from '@wave-av/adk';

const toolkit = new AgentToolkit({
  apiKey: process.env.WAVE_AGENT_KEY!,
});

async function main() {
  // List available tools
  const tools = toolkit.toMCPTools();
  console.log(`Available tools (${tools.length}):`);
  for (const tool of tools) {
    console.log(`  ${tool.name} — ${tool.description.slice(0, 60)}...`);
  }

  // Find a specific tool (with did-you-mean on typos)
  try {
    const monitorTool = toolkit.findTool('wave_monitor_stream');
    console.log(`\nFound: ${monitorTool.name}`);
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
  }
}

main().catch(console.error);
