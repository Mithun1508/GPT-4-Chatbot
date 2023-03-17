import { OpenAIChat, OpenAI } from "langchain/llms";
import { LLMChain, PromptTemplate } from "langchain";
import basePrompt from "server/lib/basePrompt";

const generateResponse = async ({
  history,
  prompt: promptText,
  apiKey,
}: {
  history: Array<string>;
  prompt: string;
  apiKey?: string;
}) => {
  if (promptText.length > 512) {
    return "Your prompt is too long.  Please reword it to be under 512 characters.";
  }

  if (!promptText || promptText.length === 0) {
    return "Please provide a prompt";
  }

  try {
    const model = new OpenAIChat({
      temperature: 0,
      openAIApiKey: apiKey || process.env.OPENAI_API_KEY,
      modelName: "gpt-4",
      maxRetries: 3,
    });
    const prompt = new PromptTemplate({
      template: basePrompt,
      inputVariables: ["history", "prompt"],
    });
    const llmChain = new LLMChain({
      llm: model,
      prompt,
    });

    return await llmChain.predict({
      prompt: promptText,
      history,
    });
  } catch (e) {
    return e.toString();
  }
};

export default generateResponse;
