/* eslint-disable no-restricted-syntax */
import fs from "fs";
import dotenv from "dotenv";
import mysql from "mysql2/promise";
import path, { dirname } from "path";
import url, { fileURLToPath } from "url";
import log from "../services/logger.js";

const { loggingError } = log;

dotenv.config();

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const pool = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

pool.getConnection().catch(() => {
  console.warn(
    "Warning:",
    "Failed to get a DB connection.",
    "Did you create a .env file with valid credentials?",
    "Routes using models won't work as intended"
  );
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const subDirs = fs
  .readdirSync(__dirname, { withFileTypes: true, encoding: "utf-8" })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name);

const models = {};

for (const subDir of subDirs) {
  try {
    const indexPath = path.join(__dirname, subDir, "index.js");
    const indexPathUrl = url.pathToFileURL(indexPath);
    // eslint-disable-next-line no-await-in-loop
    const module = await import(indexPathUrl.href);
    models[subDir] = module.default;
    const Manager = models[subDir];

    if (Manager.setConnection) Manager.setConnection(pool);
    else console.error(`Cannot set connection with: [${subDir}] directory`);
  } catch (err) {
    loggingError(
      "[Export: Failed] or [MissingFile: index.js]",
      ` ${__dirname}\\${subDir}`
    );
  }
}
export default models;
