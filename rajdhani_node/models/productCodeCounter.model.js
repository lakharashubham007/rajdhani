const mongoose = require("mongoose");

const productCodeCounterSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      trim: true,
    },
    category_series_code: {
      type: Number,
      required: true,
    },
    last_assigned_product_code: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }, // Auto-manages createdAt and updatedAt fields
  }
);

const ProductCodeCounter = mongoose.model("ProductCodeCounter", productCodeCounterSchema);

module.exports.ProductCodeCounter = ProductCodeCounter;
