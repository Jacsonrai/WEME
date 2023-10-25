const mongoose = require("mongoose");
const logger = require("./logger");
const { env, mongodb_password, mongodb_user } = require("./variables");

// set mongoose Promise to Bluebird
mongoose.Promise = Promise;

// Exit application on error
mongoose.connection.on("error", (err) => {
  logger.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});

// print mongoose logs in dev env
if (env === "development") {
  mongoose.set("debug", true);
}
const uri = `mongodb+srv://${mongodb_user}:${mongodb_password}@cluster0.blokf.mongodb.net/`;

/**
 * Connect to mongo db
 *
 * @returns {object} Mongoose connection
 * @public
 */
exports.connect = () => {
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => logger.info("MONGODB CONNECTED"));

  return mongoose.connection;
};
