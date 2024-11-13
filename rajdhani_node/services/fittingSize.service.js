const { FittingSize } = require('../models');

// Create a new Fitting Size
const createFittingSize = async (data) => {
  try {
    const newFittingSize = await FittingSize.create(data);
    return newFittingSize;
  } catch (error) {
    console.error('Error creating fitting size:', error);
    throw error;
  }
};

// Service to get all Fitting Sizes with pagination, sorting, and search
const getFittingSizes = async (page, limit, sort, search) => {
  try {
    const skip = (page - 1) * limit;

    // Build a dynamic filter for searching
    const filter = search ? { size: { $regex: search, $options: 'i' } } : {};

    // Parse the sort parameter
    let sortOptions = {};
    if (sort) {
      const [field, order] = sort.split(':');
      sortOptions[field] = (order === 'dsc') ? -1 : 1; // -1 for descending, 1 for ascending
    } else {
      sortOptions = { size: 1 }; // Default sort by size in ascending order if sort is not provided
    }

    // Find fitting sizes with applied filters, sorting, and pagination
    const fittingSizeList = await FittingSize.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    // Get the total count of documents for pagination info
    const totalFittingSizes = await FittingSize.countDocuments(filter);

    return {
      fittingSizes: fittingSizeList,
      totalFittingSizes,
      totalPages: Math.ceil(totalFittingSizes / limit),
      currentPage: page,
      rowsPerPage: limit
    };
  } catch (error) {
    console.error('Error getting fitting sizes:', error);
    throw error;
  }
};

// Get a single Fitting Size by ID
const getFittingSizeById = async (id) => {
  try {
    const fittingSize = await FittingSize.findById(id);
    return fittingSize;
  } catch (error) {
    console.error('Error getting fitting size by ID:', error);
    throw error;
  }
};

// Update a Fitting Size by ID
const updateFittingSize = async (id, updateData) => {
  try {
    const updatedFittingSize = await FittingSize.findByIdAndUpdate(
      id,
      updateData,
      { new: true } // This ensures the updated document is returned
    );
    return updatedFittingSize;
  } catch (error) {
    console.error('Error updating fitting size:', error);
    throw error;
  }
};

// Delete a Fitting Size by ID
const deleteFittingSize = async (id) => {
  try {
    const deletedFittingSize = await FittingSize.findByIdAndDelete(id);
    return deletedFittingSize;
  } catch (error) {
    console.error('Error deleting fitting size:', error);
    throw error;
  }
};

//  Update the 'isActive' status of a Fitting Size by ID
const updateFittingSizeStatus = async (id, isActive) => {
  try {
    // Find the fitting size by ID and update the 'isActive' field
    const updatedFittingSize = await FittingSize.findByIdAndUpdate(
      id,
      { isActive },
      { new: true } // Return the updated document
    );
    
    return updatedFittingSize;
  } catch (error) {
    console.error('Error updating fitting size status:', error);
    throw error;
  }
};

module.exports = {
  createFittingSize,
  getFittingSizes,
  getFittingSizeById,
  updateFittingSize,
  deleteFittingSize,
  updateFittingSizeStatus
};
