const mongoose = require("mongoose");

const stateSchema = new mongoose.Schema({
  state_name: { type: String },
  tin_number: { type: String },
  state_code: { type: String }
});

const State = mongoose.model("State", stateSchema);

module.exports.State = State;
