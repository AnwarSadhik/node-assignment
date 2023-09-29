import Todo from "../models/todoModel.js";
import mongoose from "mongoose";

export const createTodo = async (req, res, next) => {
  const { text } = req.body;
  try {
    if (!text || text === "" || text.length === 0) {
      const err = new Error(`require a text field`);
      err.statusCode = 400;
      throw err;
    }

    const data = await Todo.create({
      text,
      userId: req.user._id,
    });

    res.status(201).json({ data });
  } catch (error) {
    next(error);
  }
};

export const getAllTodos = async (req, res, next) => {
  try {
    const data = await Todo.find({ userId: req.user._id });

    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};

export const editTodo = async (req, res, next) => {
  const { todoId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(todoId)) {
    const err = new Error(`Invalid todoId`);
    err.statusCode = 400;
    return next(err);
  }

  try {
    const todo = await Todo.findById(todoId);
    if (!todo) {
      const err = new Error(`Todo not found`);
      err.statusCode = 404;
      throw err;
    }
    todo.text = req.body.text;
    await todo.save();

    res.status(200).json({ message: "Todo update succesfull" });
  } catch (error) {
    next(error);
  }
};

export const deleteTodo = async (req, res, next) => {
  const { todoId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(todoId)) {
    const err = new Error(`Invalid todoId`);
    err.statusCode = 400;
    return next(err);
  }
  try {
    const todo = await Todo.findById(todoId);
    if (!todo) {
      const err = new Error(`Todo not found`);
      err.statusCode = 404;
      throw err;
    }

    if (String(todo.userId) !== req.user.id) {
      const err = new Error(
        `Unauthorized. You can only delete your own todos.`
      );
      err.statusCode = 403;
      throw err;
    }

    await todo.deleteOne();
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const getTodos = async (req, res, next) => {
  const { page = 1, perPage = 10 } = req.query;
  try {
    const pageNum = parseInt(page);
    const perPageNum = parseInt(perPage);

    if (isNaN(pageNum) || isNaN(perPageNum) || pageNum < 0 || perPageNum < 0) {
      const err = new Error(`Invalid page or perPage parameters`);
      err.statusCode = 400;
      throw err;
    }
    const skip = (pageNum - 1) * perPageNum;
    const todos = await Todo.find({ userId: req.user.id })
      .skip(skip)
      .limit(perPageNum)
      .exec();
      
      const totalTodos = await Todo.countDocuments({ userId: req.user._id });
      res.status(200).json({
        todos,
        currentPage: pageNum,
        totalPages: Math.ceil(totalTodos / perPageNum),
        totalItems: totalTodos,
      });

  } catch (error) {
    next(error);
  }
};
