import cors from "cors";
import express from "express";
import { env, normalizeOrigin } from "./config/env.js";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";
import { dsaProgressRouter } from "./routes/dsaProgress.js";
import { donationsRouter, handleDonationWebhook } from "./routes/donations.js";
import { healthRouter } from "./routes/health.js";
import { noteProgressRouter } from "./routes/noteProgress.js";

export function createApp() {
  const app = express();

  app.use(
    cors({
      credentials: true,
      origin(origin, callback) {
        if (!origin || env.allowedOrigins.includes(normalizeOrigin(origin))) {
          callback(null, true);
          return;
        }
        callback(null, false);
      },
    }),
  );
  app.get("/", (req, res) => {
    if (req.query.error || req.query.code || Object.keys(req.query).length > 0) {
      const queryString = new URLSearchParams(req.query as Record<string, string>).toString();
      return res.redirect(`${env.clientOrigin}/?${queryString}`);
    }
    res.json({ message: "Server is running" });
  });
  app.get("/api/auth/providers", (_request, response) => {
    response.json({
      providers: {
        github: Boolean(env.githubClientId && env.githubClientSecret),
      },
    });
  });

  app.all("/api/auth", toNodeHandler(auth));
  app.all("/api/auth/*splat", toNodeHandler(auth));

  // Signature verification needs the raw request body, so this route must be
  // registered before the JSON body parser.
  app.post(
    "/api/donations/webhook",
    express.raw({ type: "application/json" }),
    handleDonationWebhook,
  );

  app.use(express.json({ limit: "1mb" }));

  app.use("/api/health", healthRouter);
  app.use("/api/donations", donationsRouter);
  app.use("/api/dsa/progress", dsaProgressRouter);
  app.use("/api/notes/progress", noteProgressRouter);

  app.use((_request, response) => {
    response.status(404).json({
      message: "Route not found",
    });
  });

  return app;
}
