const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema(
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
        type: {
            type: String,
            trim: true,
           },
        parent_id: {
            type: String,
            trim: true, // If no parent, it can be null
        },
        position: {
            type: Number,
            // required: true,
            default: 0, // Default value as per SQL
        },
        status: {
            type: Boolean,
            default: true, // Default value as per SQL (tinyint(1))
        },
        priority: {
            type: Number,
            // required: true,
            default: 0, // Default value as per SQL
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
const Categories = mongoose.model("Categories", categoriesSchema);

module.exports.Categories = Categories;
