const mongoose = require("mongoose");

const sheetNumberCounterSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // e.g., 'sheet_no'
  seq: { type: Number, default: 1000 }, // Starting sheet number
});

const SheetNumberCounter = mongoose.model("SheetNumberCounter", sheetNumberCounterSchema);

module.exports.SheetNumberCounter = SheetNumberCounter;