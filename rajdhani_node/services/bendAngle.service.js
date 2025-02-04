const { BendAngle } = require('../models');

// Create a new BendAngle
const createBendAngle = async (data) => {
  try {
    const newBendAngle = await BendAngle.create(data);
    return newBendAngle;
  } catch (error) {
    console.error('Error creating bend angle:', error);
    throw error;
  }
};

// Get all BendAngles (simple method for testing)
const getAllBendAngles = async () => {
  try {
    const bendAngleList = await BendAngle.find({});
    return bendAngleList;
  } catch (error) {
    console.error('Error getting bend angles:', error);
    throw error;
  }
};

// Get BendAngles with pagination, sorting, and search
const getBendAngles = async (page, limit, sort, search) => {
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

    // Find bend angles with applied filters, sorting, and pagination
    const bendAngleList = await BendAngle.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    // Get the total count of documents for pagination info
    const totalBendAngles = await BendAngle.countDocuments(filter);

    return {
      bendAngles: bendAngleList,
      totalBendAngles,
      totalPages: Math.ceil(totalBendAngles / limit),
      currentPage: page,
      rowsPerPage: limit
    };
  } catch (error) {
    console.error('Error getting bend angles:', error);
    throw error;
  }
};

// Get a single BendAngle by ID
const getBendAngleById = async (id) => {
  try {
    const bendAngle = await BendAngle.findById(id);
    return bendAngle;
  } catch (error) {
    console.error('Error getting bend angle by ID:', error);
    throw error;
  }
};

// Update a BendAngle by ID
const updateBendAngle = async (id, updateData) => {
  try {
    const updatedBendAngle = await BendAngle.findByIdAndUpdate(id, updateData, { new: true });
    return updatedBendAngle;
  } catch (error) {
    console.error('Error updating bend angle:', error);
    throw error;
  }
};

// Delete a BendAngle by ID
const deleteBendAngle = async (id) => {
  try {
    const deletedBendAngle = await BendAngle.findByIdAndDelete(id);
    return deletedBendAngle;
  } catch (error) {
    console.error('Error deleting bend angle:', error);
    throw error;
  }
};

// Update BendAngle Status
const updateBendAngleStatus = async (bendAngleId, status) => {
  try {
    const updatedBendAngle = await BendAngle.findByIdAndUpdate(
      bendAngleId,
      { status },
      { new: true }
    );
    return updatedBendAngle;
  } catch (error) {
    console.error('Error updating bend angle status:', error);
    throw error;
  }
};

module.exports = {
  createBendAngle,
  getBendAngles,
  getBendAngleById,
  updateBendAngle,
  deleteBendAngle,
  updateBendAngleStatus,
  getAllBendAngles
};
