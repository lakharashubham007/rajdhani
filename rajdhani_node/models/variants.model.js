const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 150, // Variant name
        },
        description: {
            type: String,
            trim: true,
            maxlength: 500, // Description of the variant
        },
        specification: {
            type: String,
            trim: true,
            maxlength: 500, // Specification details
        },
        tax: {
            type: Number,
            default: 0, // Tax percentage (e.g., 18 for 18%)
            min: 0,
        },
        price: {
            type: Number,
            required: true,
            min: 0, // Ensure price is non-negative
        },
        status: {
            type: Boolean,
            default: true, // Active status by default
        },
        part_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Parts', // Reference to the Parts collection
            required: true,
        },
        created_at: {
            type: Date,
            default: Date.now, // Automatically set to current date/time
        },
        updated_at: {
            type: Date,
            default: Date.now, // Automatically set to current date/time
        },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    }
);

const Variants = mongoose.model("Variants", variantSchema);

module.exports.Variants = Variants;
