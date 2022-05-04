const express = require("express");
const todoRoutes = express();
const { tokenVarify } = require("../service/todoService");
const { todoValidation } = require("../middleware/todoMiddleware");
const {
  addTodo,
  editTodo,
  deleteTodo,
  showAllTodoForOneUser,
  cheacked,
} = require("../controller/todoController");
todoRoutes.post("/todo", todoValidation, tokenVarify, addTodo);
todoRoutes.put("/todo/:id", todoValidation, tokenVarify, editTodo);
todoRoutes.delete("/todo/:id", deleteTodo);
todoRoutes.get("/todo/:id", showAllTodoForOneUser);
todoRoutes.patch("/todo/:id", tokenVarify, cheacked);
module.exports = todoRoutes;
