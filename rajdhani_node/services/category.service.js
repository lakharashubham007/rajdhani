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
const getCategories = async () => {
  try {
    const categoryList = await Categories.find({});
    return categoryList;
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

// Update a Category by ID
const updateCategory = async (id, data, file) => {
  try {
    const updatedCategory = await Categories.findByIdAndUpdate(
      id,
      { ...data, ...(file && { image: file }) },
      { new: true }
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
  updateCategoryStatus
};
