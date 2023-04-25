// const mongoose = require('mongoose');

const {Schema} = mongoose;
const {Types: {ObjectId}} = Schema;

enum TODO_STATE {
  TODO = 1,
  ALTER,
}

const todoSchema = new Schema({
  id: {
    type: Number,
    require: true,
    unique: true,
  },
  groupId: {
    type: ObjectId,
    require: true,
    ref: 'Todo',
    
  },
  title: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
  startDb: {
    type: Date,
    default: Date.now,
  },
  endDt: {
    type: Date,
    default: Date.now,
  },
  tag: {
    type: String,
  },
  icon: {
    type: String,
  },
  progress: {
    type: Number,
  },
  state: {
    type: TODO_STATE,
  }
});

module.exports = mongoose.model('Todo', todoSchema);