const { Design } = require('../models');

// Create a new Design
const createDesign = async (data) => {
  try {
    const newDesign = await Design.create(data);
    return newDesign;
  } catch (error) {
    console.error('Error creating design:', error);
    throw error;
  }
};

// Get all Designs (simple method for testing)
const getAllDesigns = async () => {
  try {
    const designList = await Design.find({});
    return designList;
  } catch (error) {
    console.error('Error getting designs:', error);
    throw error;
  }
};

// Get Designs with pagination, sorting, and search
const getDesigns = async (page, limit, sort, search) => {
  try {
    const skip = (page - 1) * limit;

    // Build a dynamic filter for searching
    const filter = search ? { name: { $regex: search, $options: 'i' } } : {};

    // Parse the sort parameter
    let sortOptions = {};
    if (sort) {
      const [field, order] = sort.split(':');
      sortOptions[field] = order === 'dsc' ? -1 : 1;
    } else {
      sortOptions = { name: 1 };
    }

    // Find designs with applied filters, sorting, and pagination
    const designList = await Design.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    // Get the total count of documents for pagination info
    const totalDesigns = await Design.countDocuments(filter);

    return {
      designs: designList,
      totalDesigns,
      totalPages: Math.ceil(totalDesigns / limit),
      currentPage: page,
      rowsPerPage: limit
    };
  } catch (error) {
    console.error('Error getting designs:', error);
    throw error;
  }
};

// Get a single Design by ID
const getDesignById = async (id) => {
  try {
    const design = await Design.findById(id);
    return design;
  } catch (error) {
    console.error('Error getting design by ID:', error);
    throw error;
  }
};

// Update a Design by ID
const updateDesign = async (id, updateData) => {
  try {
    const updatedDesign = await Design.findByIdAndUpdate(id, updateData, { new: true });
    return updatedDesign;
  } catch (error) {
    console.error('Error updating design:', error);
    throw error;
  }
};

// Delete a Design by ID
const deleteDesign = async (id) => {
  try {
    const deletedDesign = await Design.findByIdAndDelete(id);
    return deletedDesign;
  } catch (error) {
    console.error('Error deleting design:', error);
    throw error;
  }
};

// Update Design Status
const updateDesignStatus = async (designId, status) => {
  try {
    const updatedDesign = await Design.findByIdAndUpdate(
      designId,
      { status },
      { new: true }
    );
    return updatedDesign;
  } catch (error) {
    console.error('Error updating design status:', error);
    throw error;
  }
};

module.exports = {
  createDesign,
  getDesigns,
  getDesignById,
  updateDesign,
  deleteDesign,
  updateDesignStatus,
  getAllDesigns
};
