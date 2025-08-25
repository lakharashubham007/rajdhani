const mongoose = require("mongoose");

const gatePassDetailsSchema = new mongoose.Schema(
    {
        packingDetails_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "PackingDetails", // Link to finalized packing
            // required: true,
        },
        so_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "PackingDetails", // Link to finalized packing
            // required: true,
        },

        // New optional fields
        isPacked: {
            type: Boolean,
            default: false, // optional, can be left undefined
        },
        // isFinalizeBy: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "Admins", // or User model if different
        // },
        party_name: {
            type: String,
            trim: true,
        },
        // party_id: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "Customer", // update ref if you have a Customer model
        // },
        // gate_pass_no: {
        //     type: String,
        //     trim: true,
        //     // unique: true, // optional but recommended
        // },
        request_date: {
            type: Date,
            default: Date.now,
        },
        approved_date: {
            type: Date,
        },
        status: {
            type: String,
            enum: ["Requested", "Approved", "Rejected", "Dispatched", "Pending"],
            default: "Requested",
        },
        requested_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admins", // User who requested
        },
        approved_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admins", // Who approved the gate pass
        },
        vehicle_no: {
            type: String,
            trim: true,
        },
        driver_name: {
            type: String,
            trim: true,
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

const GatePassDetails = mongoose.model("GatePassDetails", gatePassDetailsSchema);

module.exports.GatePassDetails = GatePassDetails;
