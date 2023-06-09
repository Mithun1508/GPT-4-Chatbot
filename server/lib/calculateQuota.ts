import { Quota } from "server/mongo";
import Gql from "./gql";
import { NextApiRequest } from "next";

const gql = new Gql("");

export default async function calculateQuota(req: NextApiRequest) {
  const username = String(req.headers["x-replit-user-name"]);

  let usage = 0;
  let total = Number(process.env.DEFAULT_QUOTA_LIMIT);

  const quota = await Quota.findOne({
    username,
  });
  if (quota) {
    const gqlReq = await fetch(
      "https://tipcount.replitironclad.repl.co/res.json"
    ).then((r) => r.json());
    if (quota) {
      usage = quota.responseCount;
    }
    if (gqlReq?.data?.repl?.topTippers?.length) {
      const tips = gqlReq.data.repl.topTippers;
      const tipsByUser = tips.find((x) => x.user.username === username);
      if (tipsByUser) {
        total += Math.floor(tipsByUser.totalCyclesTipped / 5);
      }
    }

    if (quota.apiKey) {
      return {
        usage: 0,
        total: 1,
        apiKey: quota.apiKey,
      };
    }

    return {
      total,
      usage,
      apiKey: null,
    };
  } else {
    const q = new Quota({
      username,
      responseCount: 0,
    });
    q.save();
    return {
      total,
      usage: 0,
      apiKey: null,
    };
  }
}
