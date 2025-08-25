const mongoose = require("mongoose");

const inventoryRejectionDetailsSchema = new mongoose.Schema(
  {
    so_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SaleOrder", // reference to Sales Orders collection
      required: true,
    },
    productionprocess_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductionProcess",
      required: true,
    },
    productionsheet_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductionSheet",
      required: true,
    },
    productionprocess_stage: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admins",
    },
    updated_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admins",
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

const InventoryRejectionDetails = mongoose.model(
  "InventoryRejectionDetails",
  inventoryRejectionDetailsSchema
);

module.exports.InventoryRejectionDetails = InventoryRejectionDetails;
