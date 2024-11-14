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
const getAllSubcategories = async () => {
  try {
    const subcategoryList = await Subcategories.find({}).populate('category_id');
    return subcategoryList;
  } catch (error) {
    console.error('Error getting subcategories:', error);
    throw error;
  }
};

// Get all Subcategories with pagination, sorting, and search
const getSubcategories = async (page, limit, sort, search) => {
  try {
    const skip = (page - 1) * limit;

    // Dynamic filter for search functionality
    const filter = search ? { name: { $regex: search, $options: 'i' } } : {};

    // Parse sorting parameter
    const sortOptions = {};
    if (sort) {
      const [field, order] = sort.split(':');
      sortOptions[field] = order === 'dsc' ? -1 : 1;
    } else {
      sortOptions.name = 1; // Default sort by name in ascending order
    }

    // Query the database with filters, sorting, and pagination
    const subcategoryList = await Subcategories.find(filter)
      .populate('category_id') // Populate category reference if needed
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    // Get total count for pagination metadata
    const totalSubcategories = await Subcategories.countDocuments(filter);

    return {
      subcategories: subcategoryList,
      totalSubcategories,
      totalPages: Math.ceil(totalSubcategories / limit),
      currentPage: page,
      rowsPerPage: limit
    };
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
const updateSubcategory = async (id, updateData) => {
  try {
    const updatedSubcategory = await Subcategories.findByIdAndUpdate(
      id,
      updateData,
      { new: true } // Return the updated document
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
  deleteSubcategory,
  getAllSubcategories
};
