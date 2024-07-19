const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
  Player_name: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
    default:
      "https://img.freepik.com/premium-vector/anonymous-user-circle-icon-vector-illustration-flat-style-with-long-shadow_520826-1931.jpg",
  },
  loan: {
    type: Number,
    default: 0,
  },
  amount: {
    type: Number,
    default: 0,
  },
  mortgage: {
    type: String,
  },
  properties: {
    type: Array,
    default: Array,
  },
  game_id: {
    type: String,
    require: true,
  },
  lap_money: {
    type: Number,
    require: true,
    default: 2000000,
  },
  color: {
    type: String,
  },
});

const user = mongoose.model("players", userschema);

module.exports = user;
