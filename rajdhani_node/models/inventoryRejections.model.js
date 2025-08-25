const mongoose = require("mongoose");

const inventoryRejectionSchema = new mongoose.Schema(
  {
    so_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SalesOrder",
      default: null,
    },
    pp_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductionProcess", // adjust model name if different
      default: null,
    },
    ps_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProcessStage", // adjust model name if different
      default: null,
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
      required: true,
    },
    pp_stage: {
      type: String,
      trim: true,
    },

    // Quantities
    rejected_qty: { type: Number, required: true, default: 0 },
    replace_qty: { type: Number, default: 0 },
    requested_qty: { type: Number, default: 0 }, // extra as per your flow

    // Reason for rejection
    reason: { type: String, trim: true },

    // Who created/updated this record
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admins",
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admins",
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

const InventoryRejection = mongoose.model("InventoryRejection", inventoryRejectionSchema);

module.exports.InventoryRejection = InventoryRejection;
