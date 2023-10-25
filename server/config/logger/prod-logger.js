const { createLogger, format, transports } = require("winston");
const { combine, timestamp, errors, json } = format;
function buildProdLogger() {
  return createLogger({
    format: combine(errors({ stack: true }), timestamp(), json()),
    defaultMeta: { service: "user-service" },
    transports: [new transports.Console()],
  });
}
module.exports = buildProdLogger;
