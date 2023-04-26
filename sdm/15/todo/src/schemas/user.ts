import { Types } from "mongoose";

const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;

enum PROVIDER_STATE {
  LOCAL = 'local',
  KAKAO = 'kakao',
}

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
  },
  snsId: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userNm: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    enum: Object.values(PROVIDER_STATE),
    default: PROVIDER_STATE.LOCAL,
  },
  createDt: {
    type: Date,
    default: Date.now,
  },
  updateDt: {
    type: Date,
    default: Date.now,
  },
  delete: {
    type: Boolean,
    default: false,
  },
 });

module.exports = mongoose.model('User', userSchema);