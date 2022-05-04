const express = require("express");
const {
  signup,
  showUser,
  deleteOneUser,
  login,
  showAllUser,
} = require("../controller/userController");
const { tokenVarify } = require("../service/todoService");
const { userLoginValidation } = require("../middleware/userMiddleware");
const userRoutes = express.Router();

userRoutes.post("/signup", userLoginValidation, signup);
userRoutes.get("/showUser/:id", showUser);
userRoutes.get("/showuser", showAllUser);
userRoutes.post("/login", userLoginValidation, login);
userRoutes.delete("/deleteUser", tokenVarify, deleteOneUser);

module.exports = userRoutes;
