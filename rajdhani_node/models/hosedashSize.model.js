const mongoose = require("mongoose");

const hoseDashSizeSchema = new mongoose.Schema(
    {
        size: {
            type: String,
            trim: true,
        },
        code: {
            type: String,
            trim: true,
        },
        dsc_code: {
            type: String,
            trim: true,
        },
        dash_code: {
            type: String,
            trim: true
        },
        status: {
            type: Boolean,
            default: true,
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

const HoseDashSize = mongoose.model("HoseDashSize", hoseDashSizeSchema);

module.exports.HoseDashSize = HoseDashSize;
