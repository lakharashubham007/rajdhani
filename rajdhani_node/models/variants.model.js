const mongoose = require("mongoose");

// Variant Category Schema
const variantCategorySchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true, maxlength: 150 },
    description: { type: String, trim: true, maxlength: 500 },
}, { timestamps: true });

const VariantCategory = mongoose.model("VariantCategory", variantCategorySchema);

// Variant Subcategory Schema
const variantSubCategorySchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true, maxlength: 150 },
    description: { type: String, trim: true, maxlength: 500 },
    variantCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'VariantCategory', required: true },
}, { timestamps: true });

const VariantSubCategory = mongoose.model("VariantSubCategory", variantSubCategorySchema);

// Variant Sub-Subcategory Schema
const variantSubSubCategorySchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true, maxlength: 150 },
    description: { type: String, trim: true, maxlength: 500 },
    variantSubCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'VariantSubCategory', required: true },
}, { timestamps: true });

const VariantSubSubCategory = mongoose.model("VariantSubSubCategory", variantSubSubCategorySchema);

// Variant Schema
const variantSchema = new mongoose.Schema({
    name: { type: String, trim: true, maxlength: 150 },
    variantType: { type: String,  trim: true, maxlength: 150 },
    // description: { type: String, trim: true, maxlength: 500 },
    // variantCode: { type: String, trim: true, maxlength: 50 },
    // variantSku: { type: String, trim: true, maxlength: 50 },
    // variantQrCode: { type: String, trim: true, maxlength: 50 },
    // fittingSizeId: { type: mongoose.Schema.Types.ObjectId, ref: 'FittingSize' },
    // threadId: { type: mongoose.Schema.Types.ObjectId, ref: 'Thread' },
    // variantCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Categories' },
    // variantSubCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subcategories' },
    // variantSubSubCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'SubSubcategory' },
    // brandId: { type: mongoose.Schema.Types.ObjectId, ref: 'Brands' },
    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

const Variants = mongoose.model("Variant", variantSchema);

module.exports = {
    Variants,
    VariantCategory,
    VariantSubCategory,
    VariantSubSubCategory
};
