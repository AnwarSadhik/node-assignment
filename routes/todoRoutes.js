
import express from "express";

import { requireSignIn } from "../middleware/authWall.js";
import * as todos from "../controllers/todo.js"

const router = express.Router();

router.post("/create", requireSignIn,todos.createTodo)
router.get("/", requireSignIn,todos.getAllTodos)
router.put("/:todoId/edit",requireSignIn,todos.editTodo)
router.delete("/:todoId/delete", requireSignIn,todos.deleteTodo)

export { router as todoRoutes }