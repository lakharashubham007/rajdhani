const { VariantSubSubCategory } = require('../models');

// Create a new Variant Sub-Subcategory
const createVariantSubSubCategory = async (data) => {
  try {
    const newVariantSubSubCategory = await VariantSubSubCategory.create(data);
    return newVariantSubSubCategory;
  } catch (error) {
    console.error('Error creating variant sub-subcategory:', error);
    throw error;
  }
};

// Service to get all Variant Sub-Subcategories with pagination, sorting, and search
const getVariantSubSubCategories = async (page, limit, sort, search) => {
  try {
    const skip = (page - 1) * limit;

    // Build a dynamic filter for searching
    const filter = search ? { name: { $regex: search, $options: 'i' } } : {};

    // Parse the sort parameter
    let sortOptions = {};
    if (sort) {
      const [field, order] = sort.split(':');
      sortOptions[field] = (order === 'dsc') ? -1 : 1; // -1 for descending, 1 for ascending
    } else {
      sortOptions = { name: 1 }; // Default sort by name in ascending order if sort is not provided
    }

    // Find sub-subcategories with applied filters, sorting, and pagination
    const variantSubSubCategoryList = await VariantSubSubCategory.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    // Get the total count of documents for pagination info
    const totalVariantSubSubCategories = await VariantSubSubCategory.countDocuments(filter);

    return {
      variantSubSubCategories: variantSubSubCategoryList,
      totalVariantSubSubCategories,
      totalPages: Math.ceil(totalVariantSubSubCategories / limit),
      currentPage: page,
      rowsPerPage: limit
    };
  } catch (error) {
    console.error('Error getting variant sub-subcategories:', error);
    throw error;
  }
};

// Get a single Variant Sub-Subcategory by ID
const getVariantSubSubCategoryById = async (id) => {
  try {
    const variantSubSubCategory = await VariantSubSubCategory.findById(id);
    return variantSubSubCategory;
  } catch (error) {
    console.error('Error getting variant sub-subcategory by ID:', error);
    throw error;
  }
};

// Update a Variant Sub-Subcategory by ID
const updateVariantSubSubCategory = async (id, updateData) => {
  try {
    const updatedVariantSubSubCategory = await VariantSubSubCategory.findByIdAndUpdate(
      id,
      updateData,
      { new: true } // This ensures the updated document is returned
    );
    return updatedVariantSubSubCategory;
  } catch (error) {
    console.error('Error updating variant sub-subcategory:', error);
    throw error;
  }
};

// Delete a Variant Sub-Subcategory by ID
const deleteVariantSubSubCategory = async (id) => {
  try {
    const deletedVariantSubSubCategory = await VariantSubSubCategory.findByIdAndDelete(id);
    return deletedVariantSubSubCategory;
  } catch (error) {
    console.error('Error deleting variant sub-subcategory:', error);
    throw error;
  }
};

module.exports = {
  createVariantSubSubCategory,
  getVariantSubSubCategories,
  getVariantSubSubCategoryById,
  updateVariantSubSubCategory,
  deleteVariantSubSubCategory
};
