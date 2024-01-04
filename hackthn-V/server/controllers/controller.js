const User = require("../model/user.js");
const Todo = require("../model/todo.js");
const Comment = require("../model/comments.js");
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");
// login route
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "User doesn't exist. Please Signup" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ message: "Password is not valid. Please try again." });
    }

    const token = jwt.sign({ user: user }, "for-now-there-is-no-secret", {
      expiresIn: "1h",
    });

    res.json({ token, message: "You are logged in..", userId: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// sign up request
// Signup route
exports.signUp = async (req, res) => {
  console.log("signing you up...");
  try {
    const { name, email, password } = req.body;
    if(name === "" || email === "" || password === ""){
      return res.status(400).json({message: "Invalid data send!"})
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    res.status(201).json({ success: true, user, message: `welcome ${user.name}` });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error...." });
  }
};

// getting all users
exports.getUsers = async (req, res) => {
  User.find()
    .then((users) => res.send({ users: users }))
    .catch((err) => res.send({ err: "err fetching users" }));
};

// get tasks
exports.getUserTasks = async (req, res) => {
  console.log("fetching tasks......");
  try {
    // const userId = req.user._id;
    // console.log("id => ", userId)
    const todos = await Todo.find({});
    res.status(200).json({ success: true, data: todos });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// craete task
exports.createTodo = async (req, res) => {
  console.log("creating.,...");
  const { title, priority, status, tags } = req.body;

  console.log(title, priority, status, tags);
  try {
    const newTodo = new Todo({
      title,
      priority,
      status,
      tags,
      user: req.user._id,
    });
    // Save the new todo to the database
    await newTodo.save();
    console.log("hurray");
    res.status(201).json({ success: true, data: newTodo });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// change status

exports.changeTodoStatus = async (req, res) => {
  console.log("updating.....");
  try {
    const { status, id } = req.body;
    const userId = req.user._id;
    const uid = new ObjectId(id);
    console.log(uid, status, userId);
    const todo = await Todo.findOne({ _id: uid });
    if (!todo) {
      return res.status(404).json({ success: false, error: "Todo not found" });
    }
    const filter = {
      _id: id,
    };
    console.log(todo);
    // Update the todo status
    todo.status = status;
    await todo.save();
    console.log(todo);
    res.status(200).json({ success: true, data: todo });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// delete task
exports.deleteTask = async (req, res) => {
  const id = req.params.id;
  Todo.findByIdAndDelete(id)
    .then((del) => {
      res.status(200).json({ success: "Task has been deleted" });
    })
    .catch((err) => {
      res.status(500).json({ err: "server error" });
    });
};

// add comments
exports.addComment = async (req, res) => {
  console.log("Comment");
  const { userId, todoId, comment } = req.body;
  if (userId === "" || todoId === "" || comment === "") {
    return res
      .status(400)
      .json({ message: "Invalid credentials, please add comment..." });
  }
  const comm = new Comment({
    user: userId,
    todoId,
    comment,
  });
  const com = await comm.save();
  return res.status(201).json({ message: "Comment added..", comment: com });
};
