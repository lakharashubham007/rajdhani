const mongoose = require("mongoose");

const gatePassItemsSchema = new mongoose.Schema(
  {
    gatePassDetails_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GatePassDetails", // Gate pass document reference
      // required: true,
    },
    packingItem_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PackingItems", // Link to packed item
      // required: true,
    },
    so_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SaleOrder", // To trace back to SO
      // required: true,
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
      // required: true,
    },
    packing_quantity: {
      type: Number,
      // required: true,
    },
    ordered_quantity: {
      type: Number,
      // required: true,
    },
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
    status: {
      type: String,
      enum: ["Pending", "Approved", "Dispatched"],
      default: "Pending",
    },
    remarks: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const GatePassItems = mongoose.model("GatePassItems", gatePassItemsSchema);

module.exports.GatePassItems = GatePassItems;
