const mongoose = require("mongoose");

const statetinSchema = new mongoose.Schema({
  state_name: { type: String },
  tin_number: { type: String },
  state_code: { type: String }
});

const StateTin = mongoose.model("Statetin", statetinSchema);

module.exports.StateTin = StateTin;
