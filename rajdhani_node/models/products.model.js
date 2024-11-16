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
        product_id: {
            type: String,
            trim: true,
            maxlength: 150, // Name of the product
        },
        product_Type: {
            type: String,
            trim: true,
            maxlength: 150, // Name of the product
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
        brand: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Brands', // Reference to the Brands collection
            default: null,
        },
        variant: {
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
        thread_type: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Thread', // Reference to Thread collection
            default: null,
        },
        parts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Parts', // Reference to the Parts collection
                default: null,
            }
        ],
        pressure_rating: {
            type: String,
            
            trim: true,
            maxlength: 150, // Name of the product
        },
        temperature_range: {
            type: String,
            
            trim: true,
            maxlength: 150, // Name of the product
        },
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
