import { OpenAIChat } from "langchain/llms";
import { LLMChain, PromptTemplate } from "langchain";
import { HNSWLib } from "langchain/vectorstores";
import { OpenAIEmbeddings } from "langchain/embeddings";
import basePrompt from "./basePrompt";

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
    const store = await HNSWLib.load(
      "vectorStore",
      new OpenAIEmbeddings({
        openAIApiKey: apiKey || process.env.OPENAI_API_KEY,
      })
    );
    const model = new OpenAIChat({
      temperature: 0,
      openAIApiKey: apiKey || process.env.OPENAI_API_KEY,
      modelName: "gpt-4",
      maxRetries: 3,
    });
    const prompt = new PromptTemplate({
      template: basePrompt,
      inputVariables: ["history", "prompt", "context"],
    });
    const llmChain = new LLMChain({
      llm: model,
      prompt,
    });

    const context: Array<string> = [];

    if (promptText.length > 10) {
      const data = await store.similaritySearch(promptText, 1);
      for (const item of data) {
        context.push(`Context:\n${item.pageContent}`);
      }
    }

    return await llmChain.predict({
      prompt: promptText,
      context,
      history,
    });
  } catch (e) {
    return e.toString();
  }
};

export default generateResponse;
