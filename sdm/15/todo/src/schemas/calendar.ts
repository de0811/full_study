import { Types } from "mongoose";

const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;
;

const calendarSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  owner: {
    type: Types.ObjectId,
    required: true,
    ref: 'User',
  },
  owners: [{
    type: Types.ObjectId,
    ref: 'User',
  }],
});

module.exports = mongoose.model('Calendar', calendarSchema);