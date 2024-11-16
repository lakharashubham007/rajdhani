const { threadService } = require('../services');

// Create a new Thread
const createThread = async (req, res) => {
  try {
    const thread = await threadService.createThread(req.body);
    res.json({ success: true, thread, message: 'Thread created successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Controller to get all threads
const getAllThreads = async (req, res) => {
  try {
    const threads = await threadService.getAllThreads();
    res.json({ success: true, threads });
  } catch (error) {
    console.error('Error getting threads:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Get  Threads with pagination, sorting, and search
const getThreads = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sort = req.query.sort || 'threadSize';
    const search = req.query.search || '';

    const threads = await threadService.getThreads(page, limit, sort, search);
    res.json({ success: true, ...threads });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Get a single Thread by ID
const getThreadById = async (req, res) => {
  try {
    const thread = await threadService.getThreadById(req.params.id);
    if (!thread) {
      return res.status(404).json({ success: false, message: 'Thread not found' });
    }
    res.json({ success: true, thread });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Update a Thread by ID
const updateThread = async (req, res) => {
    try {
      // Define the fields that may need updating
      const fieldsToUpdate = ['threadSize', 'thread_type','measurementUnit', 'isActive']; // These are the fields in the Thread schema
      const updateData = {};
  
      // Conditionally add fields from request body to updateData
      fieldsToUpdate.forEach((field) => {
        if (req.body[field] !== undefined) {
          updateData[field] = req.body[field];
        }
      });
  
      // Check if any file (like an image or document) is provided and add it to updateData
      if (req.files && req.files.image && req.files.image[0]) {
        updateData.image = req.files.image[0].originalname;
      }
  
      // Set updated_at timestamp
      updateData.updated_at = Date.now();
  
      // Call the service to update the thread with only the changed fields
      const updatedThread = await threadService.updateThread(req.params.id, updateData);
  
      if (!updatedThread) {
        return res.status(404).json({ success: false, message: 'Thread not found' });
      }
  
      res.json({ success: true, updatedThread, message: 'Thread updated successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };
  

// Delete a Thread by ID
const deleteThread = async (req, res) => {
  try {
    const thread = await threadService.deleteThread(req.params.id);
    if (!thread) {
      return res.status(404).json({ success: false, message: 'Thread not found' });
    }
    res.json({ success: true, message: 'Thread deleted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Update the 'isActive' status of a Thread by ID
const updateThreadStatus = async (req, res) => {
  try {
    const { isActive } = req.body;
    if (typeof isActive !== 'boolean') {
      return res.status(400).json({ success: false, message: 'isActive must be a boolean' });
    }

    const updatedThread = await threadService.updateThreadStatus(req.params.id, isActive);
    if (!updatedThread) {
      return res.status(404).json({ success: false, message: 'Thread not found' });
    }

    res.json({ success: true, updatedThread, message: 'Thread status updated successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
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
