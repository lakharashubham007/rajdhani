const { FittingDashSize } = require('../models');

// Create a new FittingDashSize
const createFittingDashSize = async (data) => {
  try {
    const newFittingDashSize = await FittingDashSize.create(data);
    return newFittingDashSize;
  } catch (error) {
    console.error('Error creating fitting dash size:', error);
    throw error;
  }
};

// Get all FittingDashSizes (simple method for dropdowns or testing)
const getAllFittingDashSizes = async () => {
  try {
    const fittingDashSizeList = await FittingDashSize.find({});
    return fittingDashSizeList;
  } catch (error) {
    console.error('Error getting fitting dash sizes:', error);
    throw error;
  }
};

// Get FittingDashSizes with pagination, sorting, and search
const getFittingDashSizes = async (page, limit, sort, search) => {
  try {
    const skip = (page - 1) * limit;
    const filter = search ? { name: { $regex: search, $options: 'i' } } : {};
    
    let sortOptions = {};
    if (sort) {
      const [field, order] = sort.split(':');
      sortOptions[field] = order === 'dsc' ? -1 : 1;
    } else {
      sortOptions = { name: 1 };
    }
    
    const fittingDashSizeList = await FittingDashSize.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);
    
    const totalFittingDashSizes = await FittingDashSize.countDocuments(filter);

    return {
      fittingDashSizes: fittingDashSizeList,
      totalFittingDashSizes,
      totalPages: Math.ceil(totalFittingDashSizes / limit),
      currentPage: page,
      rowsPerPage: limit
    };
  } catch (error) {
    console.error('Error getting fitting dash sizes:', error);
    throw error;
  }
};

// Get a single FittingDashSize by ID
const getFittingDashSizeById = async (id) => {
  try {
    const fittingDashSize = await FittingDashSize.findById(id);
    return fittingDashSize;
  } catch (error) {
    console.error('Error getting fitting dash size by ID:', error);
    throw error;
  }
};

// Update a FittingDashSize by ID
const updateFittingDashSize = async (id, updateData) => {
  try {
    const updatedFittingDashSize = await FittingDashSize.findByIdAndUpdate(id, updateData, { new: true });
    return updatedFittingDashSize;
  } catch (error) {
    console.error('Error updating fitting dash size:', error);
    throw error;
  }
};

// Delete a FittingDashSize by ID
const deleteFittingDashSize = async (id) => {
  try {
    const deletedFittingDashSize = await FittingDashSize.findByIdAndDelete(id);
    return deletedFittingDashSize;
  } catch (error) {
    console.error('Error deleting fitting dash size:', error);
    throw error;
  }
};

// Update FittingDashSize Status
const updateFittingDashSizeStatus = async (fittingDashSizeId, status) => {
  try {
    const updatedFittingDashSize = await FittingDashSize.findByIdAndUpdate(
      fittingDashSizeId,
      { status },
      { new: true }
    );
    return updatedFittingDashSize;
  } catch (error) {
    console.error('Error updating fitting dash size status:', error);
    throw error;
  }
};

module.exports = {
  createFittingDashSize,
  getFittingDashSizes,
  getFittingDashSizeById,
  updateFittingDashSize,
  deleteFittingDashSize,
  updateFittingDashSizeStatus,
  getAllFittingDashSizes
};