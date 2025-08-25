const mongoose = require("mongoose");

const inventoryItemsLogSchema = new mongoose.Schema(
  {
    inventory_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Inventory",
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
    },
    so_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SaleOrder",
      default: null
    },

    product_code: { type: String },
    product_name: { type: String, trim: true },

    // Action performed on inventory
    action_type: {
      type: String,
      enum: ["ADD", "REMOVE", "ADJUST", "TRANSFER", "ASSIGN", "RESERVE", "REJECT", "REPLACE", "ASSIGN&RESERVE", "Stock Journal", "Stock Journal - Source", "Stock Journal - Destination"],
    },

    // Quantity details
    assign_quantity: { type: Number, }, // + or - value
    reserve_quantity: { type: Number, },
    ordered_quantity: { type: Number, },
    quantity: { type: Number, },

    // Pricing at the time of change
    base_price: { type: Number },
    price_with_tax: { type: Number },

    // Optional details
    location_name: { type: String, trim: true },
    rack_location: { type: String, trim: true },

    // Reference to related documents (Purchase Order, Sales Order, etc.)
    reference_type: { type: String }, // e.g., "PO", "SO", "MANUAL"
    reference_id: { type: mongoose.Schema.Types.ObjectId },

    // Reason for change
    note: { type: String, trim: true },
    narration: { type: String, trim: true },

    // delivery
    isDeliverable: {
      type: Boolean,
      default: false // optional: set default
    },


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
    timestamps: true, // automatically creates createdAt & updatedAt
  }
);

const InventoryItemsLog = mongoose.model("InventoryItemsLog", inventoryItemsLogSchema);

module.exports.InventoryItemsLog = InventoryItemsLog;
