const { Batch } = require('../models');

// Create a new Batch
const createBatch = async (data) => {
  try {
    const newBatch = await Batch.create(data);
    return newBatch;
  } catch (error) {
    console.error('Error creating batch:', error);
    throw error;
  }
};

// Get all Batches (simple method without any pagination or filters for testing purposes)
const getAllBatches = async () => {
  try {
    const batchList = await Batch.find({});
    return batchList;
  } catch (error) {
    console.error('Error getting batches:', error);
    throw error;
  }
};

// Get Batches with pagination, sorting, and search
const getBatches = async (page, limit, sort, search) => {
  try {
    const skip = (page - 1) * limit;

    // Build a dynamic filter for searching
    const filter = search ? { lot_no: { $regex: search, $options: 'i' } } : {};

    // Parse the sort parameter
    let sortOptions = {};
    if (sort) {
      const [field, order] = sort.split(':');
      sortOptions[field] = order === 'dsc' ? -1 : 1; // -1 for descending, 1 for ascending
    } else {
      sortOptions = { created_at: -1 }; // Default sort by created_at in descending order
    }

    // Find batches with applied filters, sorting, and pagination
    const batchList = await Batch.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    // Get the total count of documents for pagination info
    const totalBatches = await Batch.countDocuments(filter);

    return {
      batches: batchList,
      totalBatches,
      totalPages: Math.ceil(totalBatches / limit),
      currentPage: page,
      rowsPerPage: limit
    };
  } catch (error) {
    console.error('Error getting batches:', error);
    throw error;
  }
};

// Get a single Batch by ID
const getBatchById = async (id) => {
  try {
    const batch = await Batch.findById(id);
    return batch;
  } catch (error) {
    console.error('Error getting batch by ID:', error);
    throw error;
  }
};

// Update a Batch
const updateBatch = async (id, updateData) => {
  try {
    const updatedBatch = await Batch.findByIdAndUpdate(
      id,
      updateData,
      { new: true } // Return the updated document
    );
    return updatedBatch;
  } catch (error) {
    console.error('Error updating batch:', error);
    throw error;
  }
};

// Delete a Batch by ID
const deleteBatch = async (id) => {
  try {
    const deletedBatch = await Batch.findByIdAndDelete(id);
    return deletedBatch;
  } catch (error) {
    console.error('Error deleting batch:', error);
    throw error;
  }
};

const updateBatchStatus = async (batchId, status) => {
    try {
      const updatedBatch = await Batches.findByIdAndUpdate(
        batchId,
        { status },
        { new: true } // Return the updated document
      );
      return updatedBatch;
    } catch (error) {
      console.error('Error updating batch status:', error);
      throw error;
    }
  };

module.exports = {
  createBatch,
  getAllBatches,
  getBatches,
  getBatchById,
  updateBatch,
  deleteBatch,
  updateBatchStatus
};
