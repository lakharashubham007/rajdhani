const mongoose = require("mongoose");

const batchAllocationSchema = new mongoose.Schema(
  {
    // inventory_id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Inventory", // Reference to the Inventory table
    // },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products", // Reference to the Products table
    },
    so_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SalesOrder", // Reference to the Sales Order table
    },
    stock_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StockMaintenance", // Reference to the Stock Maintenance table
    },
    quantity: {
      type: Number,
      default: 0, // Tracks the quantity allocated from the batch
    },
    quantity_used: {
      type: Number,
      default: 0, // Tracks the quantity allocated from the batch
    },
    is_archived: {
      type: Boolean,
      default: false, // Indicates if the allocation is archived
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }, // Auto-manages createdAt and updatedAt fields
  }
);

const BatchAllocation = mongoose.model("BatchAllocation", batchAllocationSchema);

module.exports.BatchAllocation = BatchAllocation;
