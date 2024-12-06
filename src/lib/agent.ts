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

    const response = await llm.invoke([
      new HumanMessage(
        `You are an AI assistant focused on blockchain and crypto topics. 
         User with wallet address ${address} asks: ${message}`
      )
    ]);

    return response.content.toString();
  } catch (error) {
    console.error('Agent response error:', error);
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
}
