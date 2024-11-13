const { VariantSubCategory } = require('../models');

// Create a new Variant Subcategory
const createVariantSubCategory = async (data) => {
  try {
    const newVariantSubCategory = await VariantSubCategory.create(data);
    return newVariantSubCategory;
  } catch (error) {
    console.error('Error creating variant subcategory:', error);
    throw error;
  }
};

// Service to get all Variant Subcategories with pagination, sorting, and search
const getVariantSubCategories = async (page, limit, sort, search) => {
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

    // Find variant subcategories with applied filters, sorting, and pagination
    const variantSubCategoryList = await VariantSubCategory.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    // Get the total count of documents for pagination info
    const totalVariantSubCategories = await VariantSubCategory.countDocuments(filter);

    return {
      variantSubCategories: variantSubCategoryList,
      totalVariantSubCategories,
      totalPages: Math.ceil(totalVariantSubCategories / limit),
      currentPage: page,
      rowsPerPage: limit
    };
  } catch (error) {
    console.error('Error getting variant subcategories:', error);
    throw error;
  }
};

// Get a single Variant Subcategory by ID
const getVariantSubCategoryById = async (id) => {
  try {
    const variantSubCategory = await VariantSubCategory.findById(id);
    return variantSubCategory;
  } catch (error) {
    console.error('Error getting variant subcategory by ID:', error);
    throw error;
  }
};

// Update a Variant Subcategory by ID
const updateVariantSubCategory = async (id, updateData) => {
  try {
    const updatedVariantSubCategory = await VariantSubCategory.findByIdAndUpdate(
      id,
      updateData,
      { new: true } // This ensures the updated document is returned
    );
    return updatedVariantSubCategory;
  } catch (error) {
    console.error('Error updating variant subcategory:', error);
    throw error;
  }
};

// Delete a Variant Subcategory by ID
const deleteVariantSubCategory = async (id) => {
  try {
    const deletedVariantSubCategory = await VariantSubCategory.findByIdAndDelete(id);
    return deletedVariantSubCategory;
  } catch (error) {
    console.error('Error deleting variant subcategory:', error);
    throw error;
  }
};

module.exports = {
  createVariantSubCategory,
  getVariantSubCategories,
  getVariantSubCategoryById,
  updateVariantSubCategory,
  deleteVariantSubCategory
};
