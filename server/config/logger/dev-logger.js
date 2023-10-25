const { createLogger, format, transports } = require("winston");
const { colorize, combine, timestamp, printf } = format;
function buildDevLogger() {
  const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp}: ${level}: ${message}`;
  });
  return createLogger({
    format: combine(
      colorize(),
      timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      logFormat
    ),
    defaultMeta: { service: "user-service" },
    transports: [new transports.Console()],
  });
}
module.exports = buildDevLogger;
