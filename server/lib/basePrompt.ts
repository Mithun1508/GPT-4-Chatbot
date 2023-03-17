const basePrompt = `You are a helpful AI assistant.
History refers to the conversation you are having with the human.
---
History: {history}
---
Human: {prompt}
AI Assistant:`;

export default basePrompt;
