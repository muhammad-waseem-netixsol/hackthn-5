const User = require("../model/user.js");
const Todo = require("../model/todo.js");
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// login route
 exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    console.log(user)

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
console.log("password match => ", passwordMatch);
    const token = jwt.sign({ id: user._id }, "for-now-there-is-no-secret", { expiresIn: '1h' });
    console.log("assigning token ");
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// sign up request 
// Signup route
exports.signUp = async (req, res) => {
    console.log("signing you up...");
    const { name,email, password } = req.body;
    console.log(name, email,password)
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: 'Email already exists' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(hashedPassword)
      const newUser = new User({
        name,
        email,
        password:hashedPassword,  
      });
      const user = await newUser.save();
      res.status(201).json({success: true,user});
    } catch (error) {
      res.status(500).json({ success:false,message: 'Internal server error....' });
    }
};
  

// getting all users 
exports.getUsers = async (req, res) => {
    User.find().then(users => res.send({users:users})).catch(err => res.send({err: "err fetching users"}));
};

// get tasks
exports.getUserTasks = async(req, res) => {
  console.log("fetching tasks......")
  try {
    const userId = req.user._id; 
    console.log("id => ", userId)
    const todos = await Todo.find({ user: userId });
    res.status(200).json({ success: true, data: todos });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
}

// craete task 
exports.createTodo = async (req, res) => {
  console.log("creating.,...")
  const { title, priority, status, tags } = req.body;
    console.log(req.user)
   console.log(title, priority, status, tags,)
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
    console.log("hurray")
    res.status(201).json({ success: true, data: newTodo });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// change status

exports.changeTodoStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;
    const userId = req.user._id; 
    const todo = await Todo.findOne({ _id: id, user: userId });

    if (!todo) {
      return res.status(404).json({ success: false, error: 'Todo not found' });
    }

    // Update the todo status
    todo.status = status;
    await todo.save();

    res.status(200).json({ success: true, data: todo });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// delete task
exports.deleteTask = async (req, res) => {
  const id = req.params.id;
  Todo.findByIdAndDelete(id).then(del => {
    res.status(200).json({success: "Task has been deleted"});
  }).catch(err => {
    res.status(500).json({err : "server error"})
  })
};