const { Subcategories } = require('../models');

// Create a new Subcategory
const createSubcategory = async (data, file) => {
  try {
    const newSubcategory = await Subcategories.create({ ...data, image: file });
    return newSubcategory;
  } catch (error) {
    console.error('Error creating subcategory:', error);
    throw error;
  }
};

// Get all Subcategories
const getSubcategories = async () => {
  try {
    const subcategoryList = await Subcategories.find({}).populate('category_id');
    return subcategoryList;
  } catch (error) {
    console.error('Error getting subcategories:', error);
    throw error;
  }
};

// Get a single Subcategory by ID
const getSubcategoryById = async (id) => {
  try {
    const subcategory = await Subcategories.findById(id).populate('category_id');
    return subcategory;
  } catch (error) {
    console.error('Error getting subcategory by ID:', error);
    throw error;
  }
};

// Update a Subcategory by ID
const updateSubcategory = async (id, data, file) => {
  try {
    const updatedSubcategory = await Subcategories.findByIdAndUpdate(
      id,
      { ...data, ...(file && { image: file }) },
      { new: true }
    );
    return updatedSubcategory;
  } catch (error) {
    console.error('Error updating subcategory:', error);
    throw error;
  }
};

// Delete a Subcategory by ID
const deleteSubcategory = async (id) => {
  try {
    const deletedSubcategory = await Subcategories.findByIdAndDelete(id);
    return deletedSubcategory;
  } catch (error) {
    console.error('Error deleting subcategory:', error);
    throw error;
  }
};

module.exports = {
  createSubcategory,
  getSubcategories,
  getSubcategoryById,
  updateSubcategory,
  deleteSubcategory
};
