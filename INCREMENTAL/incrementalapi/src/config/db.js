const dotenv = require("dotenv");
dotenv.config();
const arangojs = require("arangojs");
// Database connection
const DB = new arangojs.Database({
  url: process.env.DB_URL,
});
// Database selection
DB.useDatabase(process.env.DB_NAME);
// Specify the database user
DB.useBasicAuth(process.env.DB_USER, process.env.DB_PASS);
module.exports = DB;
