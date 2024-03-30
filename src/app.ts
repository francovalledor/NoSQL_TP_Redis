import express, { Request, Response } from "express";
import redisClient from "./redisClient";

const app = express();

const SERVER_PORT = process.env.PORT || 3000;

app.get("/", async (req: Request, res: Response) => {
  const algo = await Promise.all(
    Object.entries(req.query).map(([key, value]) =>
      redisClient.set(key, value as string)
    )
  );

  const keys = await redisClient.keys("*");

  return res.json({ keys });
});

const initApp = async () => {
  await redisClient.connect();

  app.listen(SERVER_PORT, () => {
    console.log(`Listening on http://localhost:${SERVER_PORT}`);
  });

  process.on("SIGINT", () => {
    redisClient.quit();
    process.exit();
  });
};

initApp();
