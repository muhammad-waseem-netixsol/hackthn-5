const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  todoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Todo', 
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});

const Comments = mongoose.model('Comments', commentsSchema);

module.exports = Comments;
