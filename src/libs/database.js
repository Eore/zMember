let mongoose = require("mongoose");

let env = process.env;
let host = env.DB_HOST;
let port = env.DB_PORT;
let database = env.DB_NAME;
let user = env.DB_USERNAME;
let password = env.DB_PASSWORD;

module.exports = () =>
  mongoose.connect(
    `mongodb://${host}:${port}/${database}`,
    { useMongoClient: true }
  );
