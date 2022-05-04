const express = require("express");
const todoRoutes = require("./router/todo");

require("dotenv").config();
const app = express();

const port = process.env.PORT;
const userRoutes = require("./router/user");

require("./config/db");

app.use(express.json());
app.use("/api/auth/user", userRoutes);
app.use("/api/auth/user", todoRoutes);
app.listen(port, () => {
  console.log(`server is listen on ${port}`);
});
