import fs from "fs";
import path, { dirname } from "path";
import url, { fileURLToPath } from "url";
import log from "../services/logger.js";

const { loggingError } = log;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const subDirs = fs
  .readdirSync(__dirname, { withFileTypes: true, encoding: "utf-8" })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name);

const modules = {};

for (const subDir of subDirs) {
  try {
    const indexPath = path.join(__dirname, subDir, "index.js");
    const indexPathUrl = url.pathToFileURL(indexPath);
    // eslint-disable-next-line no-await-in-loop
    const module = await import(indexPathUrl.href);
    modules[subDir] = module.default;
  } catch (err) {
    loggingError(
      "[Export: Failed] or [MissingFile: index.js]",
      ` ${__dirname}\\${subDir}`
    );
  }
}

export default modules;
