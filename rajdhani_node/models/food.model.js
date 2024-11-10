const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },
        shortDescription: {
            type: String,
            required: true,
            trim: true,
            maxlength: 255,
        },
        image: {
            type: String, // Assuming this will hold a URL or path to the image
            trim: true,
            maxlength: 255,
            default: null, // Nullable
        },
        restaurant: {
            type: mongoose.Schema.Types.ObjectId, // Assuming restaurant is a reference to another document
            required: true,
            ref: 'Restaurants', // Replace 'Restaurant' with your actual restaurant model name
        },
        category: {
            type: mongoose.Schema.Types.ObjectId, // Assuming category is a reference
            required: true,
            ref: 'Categories', // Replace 'Category' with your actual category model name
        },
        subCategory: {
            type: mongoose.Schema.Types.ObjectId, // Assuming subCategory is a reference
            required: true,
            ref: 'Categories', // Replace 'SubCategory' with your actual sub-category model name
        },
        foodType: {
            type: String,
            enum: ['Veg', 'Non-Veg'], // Define valid food types
            required: true,
        },
        addons: {
            type: mongoose.Schema.Types.ObjectId, // Assuming addons is a reference
            required: true,
            ref: 'Addons', // Replace 'Addon' with your actual addons model name
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        discountType: {
            type: String,
            required: true,
        },
        discount: {
            type: Number,
            required: true,
            min: 0,
        },
        maxQuantity: {
            type: Number,
            required: true,
            min: 1,
        },
        tags: {
            type: String,
            trim: true,
            maxlength: 255,
        },
        startTime: {
            type: String, // Can be converted to Date if required
            required: true,
        },
        endTime: {
            type: String, // Can be converted to Date if required
            required: true,
        },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    }
);

const Food = mongoose.model("Food", foodSchema);

module.exports.Food = Food;
