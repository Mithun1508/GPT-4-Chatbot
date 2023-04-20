# GPT-4 AI Chatbot
![ChatBot](https://a11ybadges.com/badge?logo=chatbot)
![OpenGL](https://a11ybadges.com/badge?logo=opengl)
![Dependabot](https://a11ybadges.com/badge?logo=dependabot)

A chatbot that runs on GPT-4, built with Langchain and Next.js.  This is a similar project to [AmjadGPT](https://ai.repl.page), except for the fact that it runs on GPT-4 and has no training data.

# Quota & Limits

By default, all users get a total of 10 responses.  After you've used up the 10 responses, you must add your own OpenAI API key (Open the settings tab) or [tip this Repl](https://gpt4.repl.page/__repl) to increase your quota.

One response is one question asked followed by one answer from the chatbot.  Your quota will not be measured in tokens or response length.

 - **100 Cycles tip 🍬** - Quota increased by 20 responses
 - **500 Cycles tip 🍕** - Quota increased by 100 responses
 - **1000 Cycles tip 🌯** - Quota increased by 200 responses

# Self-Hosting Instructions

1. Set up the following environment variables:
   - `DEFALT_QUOTA_LIMIT` - the amount of responses a user can get by default
   - `MONGO_URI` - a MongoDB database URI
   - `OPENAI_API_KEY` - An OpenAI API key (make sure you have access to GPT-4)
2. Run `yarn dev` or `yarn build && yarn start`
3. Done!

---

![Screenshot 2023-03-20 065634](https://user-images.githubusercontent.com/93249038/226226628-87abeb36-141e-4bb0-a6d3-163e348ba1fc.png)
