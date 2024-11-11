const { SubSubcategory } = require('../models');

// Create a new Sub-Subcategory
const createSubSubcategory = async (data, file) => {
  try {
    const newSubSubcategory = await SubSubcategory.create({ ...data, image: file });
    return newSubSubcategory;
  } catch (error) {
    console.error('Error creating sub-subcategory:', error);
    throw error;
  }
};

// Get all Sub-Subcategories
const getSubSubcategories = async () => {
  try {
    const subSubcategoryList = await SubSubcategory.find({}).populate('subcategory_id');;
    return subSubcategoryList;
  } catch (error) {
    console.error('Error getting sub-subcategories:', error);
    throw error;
  }
};

// Get a single Sub-Subcategory by ID
const getSubSubcategoryById = async (id) => {
  try {
    const subSubcategory = await SubSubcategory.findById(id).populate('subcategory_id');;
    return subSubcategory;
  } catch (error) {
    console.error('Error getting sub-subcategory by ID:', error);
    throw error;
  }
};

// Update a Sub-Subcategory by ID
const updateSubSubcategory = async (id, data, file) => {
  try {
    const updatedSubSubcategory = await SubSubcategory.findByIdAndUpdate(
      id,
      { ...data, ...(file && { image: file }) },
      { new: true }
    );
    return updatedSubSubcategory;
  } catch (error) {
    console.error('Error updating sub-subcategory:', error);
    throw error;
  }
};

// Delete a Sub-Subcategory by ID
const deleteSubSubcategory = async (id) => {
  try {
    const deletedSubSubcategory = await SubSubcategory.findByIdAndDelete(id);
    return deletedSubSubcategory;
  } catch (error) {
    console.error('Error deleting sub-subcategory:', error);
    throw error;
  }
};

module.exports = {
  createSubSubcategory,
  getSubSubcategories,
  getSubSubcategoryById,
  updateSubSubcategory,
  deleteSubSubcategory
};
