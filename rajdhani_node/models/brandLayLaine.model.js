const mongoose = require("mongoose");

const brandLayLineSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            maxlength: 50,
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

const BrandLayLine = mongoose.model("BrandLayLine", brandLayLineSchema);

module.exports.BrandLayLine = BrandLayLine;
