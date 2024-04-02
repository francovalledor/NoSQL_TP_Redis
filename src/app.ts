import express, { Request, Response } from "express";
import redisClient from "./redisClient";
import { router as mandalorianRouter } from "./mandalorian/router";

const app = express();

const SERVER_PORT = process.env.PORT || 3000;

app.get("/", async (req: Request, res: Response) => {
  await Promise.all(
    Object.entries(req.query).map(([key, value]) =>
      redisClient.set(key, value as string)
    )
  );

  const keys = await redisClient.keys("*");

  return res.json({ keys });
});

app.use("/the-mandalorian", mandalorianRouter);

const initApp = async () => {
  await redisClient.connect();

  app.listen(SERVER_PORT, () => {
    console.log(`Server ready 🤙🏽 Listening on port ${SERVER_PORT}`);
  });

  process.on("SIGINT", () => {
    redisClient.quit();
    process.exit();
  });
};

initApp();
