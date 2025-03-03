
const mongoose = require("mongoose");

const stockMaintenanceSchema = new mongoose.Schema(
    {
        batch_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lot",
        },
        lot_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lot",
        },
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Products",
        },
        bill_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "PurchaseOrderBill",
        },
        po_so_id: {
            type: mongoose.Schema.Types.ObjectId,
            refPath: "order_type_ref", // Dynamically references either "PurchaseOrder" or "SalesOrder"
        },
        order_type_ref: {
            type: String,
            enum: ["PurchaseOrder", "SalesOrder"], // Specifies which collection `po_so_id` refers to
        },
        order_type: {
            type: String, // Can be either "PO" (Purchase Order) or "SO" (Sales Order)
        },
        original_quantity: {
            type: Number,
            default: 0,
        },
        used_qty: {
            type: Number,
            default: 0,
        },
        remaining_qty: {
            type: Number,
            default: function () {
                return this.original_quantity - this.used_qty;
            },
        }
    },
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    }
);

const StockMaintenance = mongoose.model(
    "StockMaintenance",
    stockMaintenanceSchema
);

module.exports.StockMaintenance = StockMaintenance;
