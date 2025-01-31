const { FittingThreads } = require('../models');

// Create a new FittingThread
const createFittingThread = async (data) => {
  try {
    const newFittingThread = await FittingThreads.create(data);
    return newFittingThread;
  } catch (error) {
    console.error('Error creating fitting thread:', error);
    throw error;
  }
};

// Get all FittingThreads (simple method for dropdowns or testing)
const getAllFittingThreads = async () => {
  try {
    const fittingThreadList = await FittingThreads.find({});
    return fittingThreadList;
  } catch (error) {
    console.error('Error getting fitting threads:', error);
    throw error;
  }
};

// Get FittingThreads with pagination, sorting, and search
const getFittingThreads = async (page, limit, sort, search) => {
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

    // Find fitting threads with applied filters, sorting, and pagination
    const fittingThreadList = await FittingThreads.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    // Get the total count of documents for pagination info
    const totalFittingThreads = await FittingThreads.countDocuments(filter);

    return {
      fittingThreads: fittingThreadList,
      totalFittingThreads,
      totalPages: Math.ceil(totalFittingThreads / limit),
      currentPage: page,
      rowsPerPage: limit
    };
  } catch (error) {
    console.error('Error getting fitting threads:', error);
    throw error;
  }
};

// Get a single FittingThread by ID
const getFittingThreadById = async (id) => {
  try {
    const fittingThread = await FittingThreads.findById(id);
    return fittingThread;
  } catch (error) {
    console.error('Error getting fitting thread by ID:', error);
    throw error;
  }
};

// Update a FittingThread by ID
const updateFittingThread = async (id, updateData) => {
  try {
    const updatedFittingThread = await FittingThreads.findByIdAndUpdate(id, updateData, { new: true });
    return updatedFittingThread;
  } catch (error) {
    console.error('Error updating fitting thread:', error);
    throw error;
  }
};

// Delete a FittingThread by ID
const deleteFittingThread = async (id) => {
  try {
    const deletedFittingThread = await FittingThreads.findByIdAndDelete(id);
    return deletedFittingThread;
  } catch (error) {
    console.error('Error deleting fitting thread:', error);
    throw error;
  }
};

// Update FittingThread Status
const updateFittingThreadStatus = async (fittingThreadId, status) => {
  try {
    const updatedFittingThread = await FittingThreads.findByIdAndUpdate(
      fittingThreadId,
      { status },
      { new: true }
    );
    return updatedFittingThread;
  } catch (error) {
    console.error('Error updating fitting thread status:', error);
    throw error;
  }
};

module.exports = {
  createFittingThread,
  getFittingThreads,
  getFittingThreadById,
  updateFittingThread,
  deleteFittingThread,
  updateFittingThreadStatus,
  getAllFittingThreads
};
