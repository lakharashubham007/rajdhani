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
            ref: 'Subcategories', // Reference to the Subcategories collection
            default: null, // Nullable for products without subcategories
        },
        subsubcategory_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SubSubcategory', // Reference to Subsubcategories collection
            default: null, // Nullable for products without sub-subcategories
        },
        brand_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Brands', // Reference to the Brands collection
            default: null,
        },
        variant_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Variant', // Reference to Variants collection
            default: null,
        },
        material: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Material', // Reference to Material collection
            default: null,
        },
        fittingSize: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'FittingSize', // Reference to Variants collection
            default: null,
        },
        // thread_type: {
        //     type: String,
        //     enum: ["ORS", "Metric", "BSP", "JIC"], // Thread types
        //     required: true,
        // },
        connection_type: {
            type: String,
            enum: ["Nut Crimp", "Flare", "O-Ring"], // Connection types
            // required: true,
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
       
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, // Adds createdAt and updatedAt fields
    }
);

const Products = mongoose.model("Products", productSchema);

module.exports.Products = Products;
