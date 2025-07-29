const mongoose = require("mongoose");

const operatorSchema = new mongoose.Schema(
  {
    fname: { type: String, trim: true },
    lname: { type: String, trim: true },
    email: { type: String, trim: true },
    mobile_no1: { type: String, trim: true },
    mobile_no2: { type: String, trim: true },
    address: { type: String, trim: true },
    qualification: { type: String, trim: true },
    state: { type: String, trim: true },
    date_of_joining: { type: String, trim: true },
    age: { type: String, trim: true },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const Operator = mongoose.model("Operator", operatorSchema);

module.exports.Operator = Operator;
