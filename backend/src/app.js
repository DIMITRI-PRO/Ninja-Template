import express from "express";
import cors from "cors";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { existsSync } from "fs";
import cookieParser from "cookie-parser";
import router from "./router.js";
import log from "./services/logger.js";

const app = express();
const { loggingMiddleware } = log;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(loggingMiddleware);

// use some application-level middlewares
app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());

// Serve the public folder for public resources
app.use(express.static(join(__dirname, "../public")));

// Serve REACT APP
app.use(express.static(join(__dirname, "..", "..", "frontend", "dist")));

// API routes
app.use(router);

// Redirect all requests to the REACT app
const reactIndexFile = join(
  __dirname,
  "..",
  "..",
  "frontend",
  "dist",
  "index.html"
);

if (existsSync(reactIndexFile)) {
  app.get("*", (req, res) => {
    res.sendFile(reactIndexFile);
  });
}

export default app;
