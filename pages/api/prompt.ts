import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import isReplAuthed from "../../server/lib/auth/isReplAuthed";
import createRateLimiter from "../../server/lib/auth/rateLimiter";
import { Quota, Response } from "server/mongo";
import calculateQuota from "server/lib/calculateQuota";
import generateResponse from "server/lib/generateResponse";

const app = nc();

app.use(isReplAuthed);
app.use(
  createRateLimiter({
    maxRequests: 20,
    windowMs: 1000 * 60,
  })
);
app.post(async (req: NextApiRequest, res: NextApiResponse) => {
  // const { prompt, history, apiKey } = req.body;
  // const username = req.headers["x-replit-user-name"];

  // if (
  //   typeof prompt === "string" &&
  //   Array.isArray(history) &&
  //   history.every((e) => typeof e === "string")
  // ) {
  //   const { total, usage } = await calculateQuota(req);
  //   if (usage >= total) {
  //     res.status(429).json({
  //       success: true,
  //       answer: `You've used up your quota of ${total} responses.  If you would like to increase your quota, you can add your own OpenAI API key in settings (make sure you have access to GPT-4), or [tip this Repl](https://gpt4.repl.page/__repl).`,
  //     });
  //     return;
  //   }

  //   const resp = await generateResponse({
  //     history,
  //     prompt,
  //     apiKey,
  //   });

  //   if (typeof resp === "string") {
  //     const userQuota = await Quota.findOne({
  //       username,
  //     });

  //     const PromptLog = new Response({
  //       prompt,
  //       response: resp,
  //       username,
  //       apiKey: apiKey || null,
  //     });

  //     if (userQuota) {
  //       if (!userQuota.apiKey) {
  //         userQuota.responseCount++;
  //       }
  //       await userQuota.save();
  //     } else {
  //       const newUserQuota = new Quota({
  //         username,
  //         responseCount: 1,
  //       });
  //       await newUserQuota.save();
  //     }
  //     await PromptLog.save();

  //     await fetch("https://logs.replitironclad.repl.co/data", {
  //       method: "POST",
  //       body: JSON.stringify(PromptLog),
  //       headers: {
  //         "Content-Type": "application/json",
  //         accept: "application/json",
  //       },
  //     })
  //       .then((r) => r.json())
  //       .then(console.log);

  //     res.status(200).json({
  //       success: true,
  //       answer: resp,
  //     });
  //   } else {
  //     res.status(500).json({
  //       success: false,
  //       answer: null,
  //       message: "Internal Server Error, Please try again",
  //     });
  //   }
  // } else {
  //   res.status(400).json({
  //     success: false,
  //     answer: null,
  //     message: "Invalid request body",
  //   });
  // }

  res.status(200).json({
    success: true,
    answer: `Due to high traffic, this chat has been temporarily paused.  In the meantime, you can fill out [this form](https://docs.google.com/forms/d/e/1FAIpQLSc1oRRN5FyRStpXe5owttJQl6rkByiIfCAv_7xHKq7UQ2cK2Q/viewform?usp=sf_link) if you would like to be added to the waitlist.`,
  });
});

export default app;
