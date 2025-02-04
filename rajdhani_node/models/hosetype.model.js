const mongoose = require("mongoose");

const hoseTypeSchema = new mongoose.Schema(
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

const HoseType = mongoose.model("HoseType", hoseTypeSchema);

module.exports.HoseType = HoseType;
