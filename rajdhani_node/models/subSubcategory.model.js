const mongoose = require("mongoose");

// Sub-Subcategory Schema
const subSubcategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 191,
        },
        image: {
            type: String,
            trim: true,
            maxlength: 191,
            default: 'def.png',
        },
        subcategory_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subcategories', // References Subcategory
            required: true,
        },
        position: {
            type: Number,
            default: 0,
        },
        status: {
            type: Boolean,
            default: true,
        },
        priority: {
            type: Number,
            default: 0,
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
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    }
);

const SubSubcategory = mongoose.model("SubSubcategory", subSubcategorySchema);

module.exports.SubSubcategory = SubSubcategory;
