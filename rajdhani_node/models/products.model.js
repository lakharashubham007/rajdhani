const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 150, // Name of the product
        },
        description: {
            type: String,
            trim: true,
            maxlength: 500, // Detailed description of the product
        },
        image: {
            type: String,
            trim: true,
            maxlength: 191, // Main product image
            default: 'default-product-image.png', // Default image if none provided
        },
        gallery: [
            {
                type: String,
                trim: true,
                maxlength: 191, // Additional images in the gallery
            }
        ],
        category_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Categories', // Reference to the Categories collection
            required: true,
        },
        subcategory_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Categories', // Reference to the Subcategories (stored in the same collection as categories)
            default: null, // Nullable, for products without subcategories
        },
        brand_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Brands', // Reference to the Brands collection
            default: null,
        },
        part_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Parts', // Reference to the Parts collection for specific parts
            default: null,
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
        tags: [
            {
                type: String,
                trim: true,
                maxlength: 50, // Optional tags for better search/filtering
            }
        ],
        created_at: {
            type: Date,
            default: Date.now, // Automatically set to the current date/time
        },
        updated_at: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, // Adds createdAt and updatedAt fields
    }
);

const Products = mongoose.model("Products", productSchema);

module.exports.Products = Products;
