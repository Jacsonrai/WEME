const { port, env } = require("./config/variables");
const logger = require("./config/logger/");
const app = require("./config/express");
const DB = require("./config/mongoose");
//open mongoose connection
DB.connect();
app.listen(port, () => {
  console.log(
    "====================================================================="
  );
  logger.info(`server started on port ${port} (${env})`);

  console.log(
    "====================================================================="
  );
});
