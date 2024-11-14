const { Categories } = require('../models');

// Create a new Category
const createCategory = async (data, file) => {
  try {
    const newCategory = await Categories.create({ ...data, image: file || 'def.png' });
    return newCategory;
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
};


// Get all Categories
const getAllCategories = async () => {
  try {
      const categoryList = await Categories.find({});
      return categoryList;
  } catch (error) {
      console.error('Error getting categories:', error);
      throw error;
  }
};

// Service to get all categories with pagination, sorting, and search
const getCategories = async (page, limit, sort, search) => {
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
    const categoryList = await Categories.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    // Get the total count of documents for pagination info
    const totalCategories = await Categories.countDocuments(filter);

    return {
      categories: categoryList,
      totalCategories,
      totalPages: Math.ceil(totalCategories / limit),
      currentPage: page,
      rowsPerPage: limit
    };
  } catch (error) {
    console.error('Error getting categories:', error);
    throw error;
  }
};


// Get a single Category by ID
const getCategoryById = async (id) => {
  try {
    const category = await Categories.findById(id);
    return category;
  } catch (error) {
    console.error('Error getting category by ID:', error);
    throw error;
  }
};

// Update a Category by ID in the service
const updateCategory = async (id, updateData) => {
  try {
    const updatedCategory = await Categories.findByIdAndUpdate(
      id,
      updateData,
      { new: true } // Return the updated document
    );
    return updatedCategory;
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
};


// Delete a Category by ID
const deleteCategory = async (id) => {
  try {
    const deletedCategory = await Categories.findByIdAndDelete(id);
    return deletedCategory;
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
};

// Update Category Status
const updateCategoryStatus = async (categoryId, status) => {
  try {
    const updatedCategory = await Categories.findByIdAndUpdate(
      categoryId,
      { status },
      { new: true } // Return the updated document
    );
    return updatedCategory;
  } catch (error) {
    console.error('Error updating category status:', error);
    throw error;
  }
};

module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  updateCategoryStatus,
  getAllCategories
};
