const mongoose = require("mongoose");

const inventoryRejectionItemsSchema = new mongoose.Schema(
  {
    inventoryrejectiondetails_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "InventoryRejectionDetails",
    //   required: true,
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
    //   required: true,
    },
    reject_quantity: {
      type: Number,
    //   required: true,
      min: 0,
    },
    replace_quantity: {
      type: Number,
      default: 0,
      min: 0,
    },
    requested_quantity: {
      type: Number,
      default: 0,
      min: 0,
    },
    reason: {
      type: String,
      trim: true,
      maxlength: 5000,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admins",
    //   required: true,
    },
    updated_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const InventoryRejectionItems = mongoose.model(
  "InventoryRejectionItems",
  inventoryRejectionItemsSchema
);

module.exports.InventoryRejectionItems = InventoryRejectionItems;
