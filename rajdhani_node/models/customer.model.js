const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    company_name: { type: String, trim: true },
    fname: { type: String, trim: true },
    lname: { type: String, trim: true },
    email: { type: String, trim: true },
    mobile_no1: { type: String, trim: true },
    mobile_no2: { type: String, trim: true },
    address: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    country: { type: String, trim: true },
    pin_code: { type: String, trim: true, maxlength: 10 },
    image: {
      type: String,
      trim: true,
      default: "rajdhani_product.jpg",
    },
    status: {
      type: Boolean,
      default: true,
    },
    customer_billing_details: {
      name: { type: String },
      email: { type: String },
      mobile_no1: { type: String },
      mobile_no2: { type: String },
      country: { type: String },
      state: { type: String },
      city: { type: String },
      pin_code: { type: String },
      state_tin_code: { type: String },
      address: { type: String },
      gstNumber: { type: String },
    },
    customer_shipping_details: {
      name: { type: String },
      address: { type: String },
      gstNumber: { type: String },
      country: { type: String },
      state: { type: String },
      city: { type: String },
      pin_code: { type: String },
      mobile_no1: { type: String },
      mobile_no2: { type: String },
      email: { type: String },
      state_tin_code: { type: String },
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const Customer = mongoose.model("Customer", customerSchema);

module.exports.Customer = Customer;
