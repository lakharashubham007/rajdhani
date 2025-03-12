const mongoose = require("mongoose");

const fittingThreadSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            maxlength: 50,
        },
        code: {
            type: String,
            trim: true,
        },
        dsc_code: {
            type: String,
            trim: true,
        },
        dsc: {
            type: String,
            trim: true,
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

const FittingThreads = mongoose.model("FittingThreads", fittingThreadSchema);

module.exports.FittingThreads = FittingThreads;
