const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema(
  {
    lot_no: {
      type: String,
      trim: true,
    },
    batch_no: {
      type: String,
      trim: true,
    },
    po_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PurchaseOrder", // Reference to the Purchase Order
    },
    bill_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PurchaseOrderBill", // Reference to the Purchase Order Bill
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admins", // User who created the batch/lot
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }, // Auto-manages createdAt and updatedAt fields
  }
);

const Batch = mongoose.model("Batch", batchSchema);

module.exports.Batch = Batch;
