const { Thread } = require('../models');

// Create a new Thread
const createThread = async (data) => {
  try {
    const newThread = await Thread.create(data);
    return newThread;
  } catch (error) {
    console.error('Error creating thread:', error);
    throw error;
  }
};


// Get all threads without pagination, sorting, or search
const getAllThreads = async () => {
  try {
    const threads = await Thread.find({}); // Fetch all threads
    return threads;
  } catch (error) {
    console.error('Error fetching threads:', error);
    throw error;
  }
};

// Get Threads with pagination, sorting, and searching
const getThreads = async (page, limit, sort, search) => {
  try {
    const skip = (page - 1) * limit;
    const filter = search ? { threadSize: { $regex: search, $options: 'i' } } : {};

    let sortOptions = {};
    if (sort) {
      const [field, order] = sort.split(':');
      sortOptions[field] = order === 'dsc' ? -1 : 1; // Sorting logic (ascending/descending)
    } else {
      sortOptions = { created_at: -1 }; // Default sorting by thread size
    }

    const threadList = await Thread.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    const totalThreads = await Thread.countDocuments(filter);

    return {
      threads: threadList,
      totalThreads,
      totalPages: Math.ceil(totalThreads / limit),
      currentPage: page,
      rowsPerPage: limit
    };
  } catch (error) {
    console.error('Error getting threads:', error);
    throw error;
  }
};

// Get a single Thread by ID
const getThreadById = async (id) => {
  try {
    const thread = await Thread.findById(id);
    return thread;
  } catch (error) {
    console.error('Error getting thread by ID:', error);
    throw error;
  }
};

// Update a Thread by ID
const updateThread = async (id, updateData) => {
  try {
    const updatedThread = await Thread.findByIdAndUpdate(id, updateData, { new: true });
    return updatedThread;
  } catch (error) {
    console.error('Error updating thread:', error);
    throw error;
  }
};

// Delete a Thread by ID
const deleteThread = async (id) => {
  try {
    const deletedThread = await Thread.findByIdAndDelete(id);
    return deletedThread;
  } catch (error) {
    console.error('Error deleting thread:', error);
    throw error;
  }
};

// Update the 'isActive' status of a Thread by ID
const updateThreadStatus = async (id, isActive) => {
  try {
    const updatedThread = await Thread.findByIdAndUpdate(
      id,
      { isActive },
      { new: true }
    );
    return updatedThread;
  } catch (error) {
    console.error('Error updating thread status:', error);
    throw error;
  }
};

module.exports = {
  createThread,
  getThreads,
  getThreadById,
  updateThread,
  deleteThread,
  updateThreadStatus,
  getAllThreads
};
