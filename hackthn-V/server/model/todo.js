const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now, 
 },
 priority: {
    type: String,
    default: false,
  },
  dueDate: {
    type: Date,
    default: Date.now 
  },
  status: {
    type: String,
    default: false,
  },
  tags: {
    type:[],
    default:[]
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
