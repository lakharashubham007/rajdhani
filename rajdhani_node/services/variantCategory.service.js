const { VariantCategory } = require('../models'); // Assuming VariantCategory is the model for the variant category schema

// Create a new Variant Category
const createVariantCategory = async (data) => {
  try {
    const newVariantCategory = await VariantCategory.create(data);
    return newVariantCategory;
  } catch (error) {
    console.error('Error creating variant category:', error);
    throw error;
  }
};

// Service to get all Variant Categories with pagination, sorting, and search
const getVariantCategories = async (page, limit, sort, search) => {
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

    // Find categories with applied filters, sorting, and pagination
    const variantCategoryList = await VariantCategory.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    // Get the total count of documents for pagination info
    const totalVariantCategories = await VariantCategory.countDocuments(filter);

    return {
      variantCategories: variantCategoryList,
      totalVariantCategories,
      totalPages: Math.ceil(totalVariantCategories / limit),
      currentPage: page,
      rowsPerPage: limit
    };
  } catch (error) {
    console.error('Error getting variant categories:', error);
    throw error;
  }
};

// Get a single Variant Category by ID
const getVariantCategoryById = async (id) => {
  try {
    const variantCategory = await VariantCategory.findById(id);
    return variantCategory;
  } catch (error) {
    console.error('Error getting variant category by ID:', error);
    throw error;
  }
};

//update
const updateVariantCategory = async (id, updateData) => {
    try {
        const updatedVariantCategory = await VariantCategory.findByIdAndUpdate(
            id,
            updateData,
            { new: true } // This ensures the updated document is returned
        );
        return updatedVariantCategory;
    } catch (error) {
        console.error('Error updating variant category:', error);
        throw error;
    }
};


// Delete a Variant Category by ID
const deleteVariantCategory = async (id) => {
  try {
    const deletedVariantCategory = await VariantCategory.findByIdAndDelete(id);
    return deletedVariantCategory;
  } catch (error) {
    console.error('Error deleting variant category:', error);
    throw error;
  }
};

module.exports = {
  createVariantCategory,
  getVariantCategories,
  getVariantCategoryById,
  updateVariantCategory,
  deleteVariantCategory
};
