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

// Get all SubSubcategories
const getAllSubSubcategories = async () => {
  try {
      const subSubcategoryList = await SubSubcategory.find({}).populate('subcategory_id'); // Populate if there's a reference field
      return subSubcategoryList;
  } catch (error) {
      console.error('Error getting subSubcategories:', error);
      throw error;
  }
};

// Service: Get all Sub-Subcategories with pagination, sorting, and search
const getSubSubcategories = async (page, limit, sort, search) => {
  try {
    const skip = (page - 1) * limit; // Calculate skip value for pagination

    // Build a dynamic filter for searching by name
    const filter = search ? { name: { $regex: search, $options: 'i' } } : {};

    // Parse the sort parameter (format: field:order)
    const sortOptions = {};
    if (sort) {
      const [field, order] = sort.split(':');
      sortOptions[field] = order === 'dsc' ? -1 : 1;
    } else {
      sortOptions.name = 1; // Default sort by name in ascending order
    }

    // Query with filters, pagination, sorting, and population
    const subSubcategoryList = await SubSubcategory.find(filter)
      .populate('subcategory_id') // Populate subcategory reference if needed
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    // Get total count for pagination metadata
    const totalSubSubcategories = await SubSubcategory.countDocuments(filter);

    return {
      subSubcategories: subSubcategoryList,
      totalSubSubcategories,
      totalPages: Math.ceil(totalSubSubcategories / limit),
      currentPage: page,
      rowsPerPage: limit
    };
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
// const updateSubSubcategory = async (id, data, file) => {
//   try {
//     const updatedSubSubcategory = await SubSubcategory.findByIdAndUpdate(
//       id,
//       { ...data, ...(file && { image: file }) },
//       { new: true }
//     );
//     return updatedSubSubcategory;
//   } catch (error) {
//     console.error('Error updating sub-subcategory:', error);
//     throw error;
//   }
// };

// Update a Sub-Subcategory by ID
const updateSubSubcategory = async (id, updateData) => {
  try {
    const updatedSubSubcategory = await SubSubcategory.findByIdAndUpdate(
      id,
      updateData,
      { new: true } // Return the updated document
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
  deleteSubSubcategory,
  getAllSubSubcategories
};
