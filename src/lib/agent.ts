import { CdpAgentkit } from "@coinbase/cdp-agentkit-core";
import { CdpToolkit } from "@coinbase/cdp-langchain";
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage } from "@langchain/core/messages";

export async function getAgentResponse(message: string, address: string): Promise<string> {
  try {
    const llm = new ChatOpenAI({
      model: "grok-beta",
      apiKey: import.meta.env.VITE_XAI_API_KEY,
      configuration: {
        baseURL: "https://api.x.ai/v1"
      }
    });

    const config = {
      networkId: import.meta.env.VITE_NETWORK_ID || "base-sepolia",
    };

    const agentkit = await CdpAgentkit.configureWithWallet(config);
    const cdpToolkit = new CdpToolkit(agentkit);
    const tools = cdpToolkit.getTools();

    const response = await llm.invoke([
      new HumanMessage(`User (${address}): ${message}`)
    ]);

    return response.content.toString();
  } catch (error) {
    console.error('Agent response error:', error);
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
}