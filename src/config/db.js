const { Client } = require("pg");
require("dotenv").config();

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "users",
  password: "1234",
  port: 5432,
});
client
  .connect()
  .then(() => {
    console.log("database connected successfully");
  })
  .catch((e) => {
    console.log(e);
  });

module.exports = client;
