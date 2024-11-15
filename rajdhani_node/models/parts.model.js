const mongoose = require("mongoose");

const partsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 191, // Matches SQL varchar(191)
        },
        description: {
            type: String,
            trim: true,
            maxlength: 1000, // A reasonable length for descriptions
        },
        type: {
            type: String,
            trim: true,
            maxlength: 191, // Matches SQL varchar(191)
        },
        material_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Material', // Reference to the Brands collection
            required: true,
        },
        fittingsize_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'FittingSize', // Reference to the Brands collection
            required: true,
        },
        // image: {
        //     type: String,
        //     trim: true,
        //     maxlength: 191,
        //     default: 'default-image.png', // Default image if not provided
        // },
        // gallery: {
        //     type: [String], // Array of strings for multiple images
        //     default: [],
        // },
        // brand_id: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'Brands', // Reference to the Brands collection
        //     required: true,
        // },
        // hsn_no: {
        //     type: String,
        //     trim: true,
        //     maxlength: 50,
        // },
        // ean_no: {
        //     type: String,
        //     trim: true,
        //     maxlength: 50,
        // },
        // tax: {
        //     type: Number, // Store tax as a percentage or fixed amount
        //     default: 0,
        // },
        // category_id: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'Categories', // Reference to the Categories collection
        //     required: true,
        // },
        // subcategory_id: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'Subcategories', // Reference to the Subcategories collection
        //     required: true,
        // },
        status: {
            type: Boolean,
            default: true, // Active by default
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

const Parts = mongoose.model("Parts", partsSchema);

module.exports.Parts = Parts;
