const mongoose = require("mongoose");

const packingItemsSchema = new mongoose.Schema(
  {
    packingDetails_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PackingDetails",
    },
    so_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SaleOrder",
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products", // Replace with your Product model nam
    },
    packing_quantity: {
      type: Number,
    },
    ordered_quantity: {
      type: Number,
    },
    // Packing array field
    packing: [
      {
        packed_quantity: {
          type: Number,
        },
        packing_type: {
          type: String,
          trim: true,
        },
      },
    ],
    operator_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Operator", // or Employees/Operators collection if you have one
      },
    ],
    operator_name: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const PackingItems = mongoose.model("PackingItems", packingItemsSchema);

module.exports.PackingItems = PackingItems;
