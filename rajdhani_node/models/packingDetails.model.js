const mongoose = require("mongoose");

const packingDetailsSchema = new mongoose.Schema(
    {
        so_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SaleOrder", // Replace with your SalesOrder model nam
        },
        date: {
            type: Date,
        },
        packed_date: {
            type: Date,
        },
        // voucher_no: {
        //     type: String,
        //     trim: true
        // },
        created_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admins", // User who created this packing entry
        },

        // New optional fields
        isFinalize: {
            type: Boolean,
            default: false, // optional, can be left undefined
        },
        isFinalizeBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admins", // or User model if different
        },
        party_name: {
            type: String,
            trim: true,
        },
        party_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer", // update ref if you have a Customer model
        },
        total_bags: {
            type: Number,
        },
        total_roll: {
            type: Number,
        },
        total_weight: {
            type: Number,
        },
        total_qty_pc: {
            type: Number,
        },
        total_qty_mtr: {
            type: Number,
        },
    },
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    }
);

const PackingDetails = mongoose.model(
    "PackingDetails",
    packingDetailsSchema
);

module.exports.PackingDetails = PackingDetails;
