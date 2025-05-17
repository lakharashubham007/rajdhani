const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    store_id: {
      // type: mongoose.Schema.Types.ObjectId,
      // ref: "Store",
      type: String,
      default: "1",
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
      index: true,
    },
    product_code: { type: String },
    fitting_Code: { type: String },
    product_unit: { type: String },
    product_name: {
      type: String,
      trim: true,
    },
    skive_type: {
      type: String,
    },
    wire_type: {
      type: String,
    },
    thread_type: {
      type: String,
    },
    ring_type: {
      type: String,
    },
    bendangle: {
      type: String,
    },
    total_quantity: {
      type: Number,
      default: 0,
    },
    base_price: {
      type: Number,
    },
    cgst: {
      type: Number,
      default: 0,
    },
    sgst: {
      type: Number,
      default: 0,
    },
    igst: {
      type: Number,
      default: 0,
    },
    cess: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
    },
    price_with_tax: {
      type: Number,
    },
    location_name: {
      type: String,
      trim: true,
    },
    rack_location: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      default: "true",
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const Inventory = mongoose.model("Inventory", inventorySchema);

module.exports.Inventory = Inventory;
