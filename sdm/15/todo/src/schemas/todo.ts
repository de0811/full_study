import { Types } from "mongoose";

const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;

const TODO_STATE = {
  TODO: 1,
  ALTER: 2,
};

const todoSchema = new Schema({
  calendarId: {
    type: Types.ObjectId,
    required: true,
    ref: 'Calendar',
  },
  groupId: {
    type: Types.ObjectId,
    required: true,
    ref: 'Todo',
    default: () => new Types.ObjectId(),
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  startDt: {
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
    type: Number,
    enum: Object.values(TODO_STATE),
    default: TODO_STATE.TODO,
  },
});

module.exports = mongoose.model('Todo', todoSchema);