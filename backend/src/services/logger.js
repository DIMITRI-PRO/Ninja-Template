import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({
      format: () =>
        new Date().toLocaleString("fr-FR", {
          timeZone: "Europe/Paris",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
    }),
    winston.format.printf(({ level, message, timestamp }) => {
      return `[${timestamp}] - ${level}: ${message}`;
    })
  ),
  transports: [new winston.transports.Console()],
});

const getColorizedStatus = (status) => {
  switch (status) {
    case 200:
      return `\x1b[32m${status}\x1b[0m`; // green
    case 400:
      return `\x1b[31m${status}\x1b[0m`; // red
    case 401:
      return `\x1b[31m${status}\x1b[0m`; // red
    case 403:
      return `\x1b[31m${status}\x1b[0m`; // red
    case 404:
      return `\x1b[31m${status}\x1b[0m`; // red
    case 422:
      return `\x1b[33m${status}\x1b[0m`; // yellow
    case 500:
      return `\x1b[31m${status}\x1b[0m`; // red
    default:
      return status;
  }
};

const loggingMiddleware = ({ method, originalUrl }, res, next) => {
  res.on("finish", () => {
    const status = res.statusCode;
    const colorizedStatus = getColorizedStatus(status);
    logger.info(`${colorizedStatus} ${method} ${originalUrl}`);
  });
  next();
};

const loggingError = (type, message) => {
  logger.info(`\x1b[31m${type}\x1b[0m ${message}`);
};

export default { loggingMiddleware, loggingError };
