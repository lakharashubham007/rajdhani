const { HoseDashSize } = require('../models');

// Create a new HoseDashSize
const createHoseDashSize = async (data) => {
  try {
    const newHoseDashSize = await HoseDashSize.create(data);
    return newHoseDashSize;
  } catch (error) {
    console.error('Error creating hose dash size:', error);
    throw error;
  }
};

// Get all HoseDashSizes (for dropdowns or testing)
const getAllHoseDashSizes = async () => {
  try {
    return await HoseDashSize.find({});
  } catch (error) {
    console.error('Error getting hose dash sizes:', error);
    throw error;
  }
};

// Get HoseDashSizes with pagination, sorting, and search
const getHoseDashSizes = async (page, limit, sort, search) => {
  try {
    const skip = (page - 1) * limit;
    const filter = search ? { size: { $regex: search, $options: 'i' } } : {};
    let sortOptions = {};
    
    if (sort) {
      const [field, order] = sort.split(':');
      sortOptions[field] = order === 'dsc' ? -1 : 1;
    } else {
      sortOptions = { size: 1 };
    }

    const hoseDashSizes = await HoseDashSize.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);
    const totalHoseDashSizes = await HoseDashSize.countDocuments(filter);

    return {
      hoseDashSizes,
      totalHoseDashSizes,
      totalPages: Math.ceil(totalHoseDashSizes / limit),
      currentPage: page,
      rowsPerPage: limit
    };
  } catch (error) {
    console.error('Error getting hose dash sizes:', error);
    throw error;
  }
};

// Get a single HoseDashSize by ID
const getHoseDashSizeById = async (id) => {
  try {
    return await HoseDashSize.findById(id);
  } catch (error) {
    console.error('Error getting hose dash size by ID:', error);
    throw error;
  }
};

// Update a HoseDashSize by ID
const updateHoseDashSize = async (id, updateData) => {
  try {
    return await HoseDashSize.findByIdAndUpdate(id, updateData, { new: true });
  } catch (error) {
    console.error('Error updating hose dash size:', error);
    throw error;
  }
};

// Delete a HoseDashSize by ID
const deleteHoseDashSize = async (id) => {
  try {
    return await HoseDashSize.findByIdAndDelete(id);
  } catch (error) {
    console.error('Error deleting hose dash size:', error);
    throw error;
  }
};

// Update HoseDashSize Status
const updateHoseDashSizeStatus = async (id, status) => {
  try {
    return await HoseDashSize.findByIdAndUpdate(id, { status }, { new: true });
  } catch (error) {
    console.error('Error updating hose dash size status:', error);
    throw error;
  }
};

module.exports = {
  createHoseDashSize,
  getAllHoseDashSizes,
  getHoseDashSizes,
  getHoseDashSizeById,
  updateHoseDashSize,
  deleteHoseDashSize,
  updateHoseDashSizeStatus
};