const mongoose = require("mongoose");

const subcategoriesSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 191, // Matches SQL varchar(191)
        },
        image: {
            type: String,
            trim: true,
            maxlength: 191, // Matches SQL varchar(191)
            default: 'def.png', // Default image as per SQL
        },
        category_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Categories', // References the Categories model
            required: true, // Ensures that each subcategory is linked to a category
        },
        position: {
            type: Number,
            default: 0, // Default position value
        },
        status: {
            type: Boolean,
            default: true, // Indicates if the subcategory is active
        },
        priority: {
            type: Number,
            default: 0, // Priority setting
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
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, // Adds createdAt and updatedAt fields
    }
);

// Create the model
const Subcategories = mongoose.model("Subcategories", subcategoriesSchema);

module.exports.Subcategories = Subcategories;
