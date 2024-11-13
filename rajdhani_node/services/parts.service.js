const { Parts } = require('../models'); // Assuming the Parts model is located here



// Create a new Variant
const createPart = async (data, file) => {
    try {
      const newPart = await Parts.create({ ...data, image: file || 'def.png' });
      return newPart;
    } catch (error) {
      console.error('Error creating part:', error);
      throw error;
    }
  };

// Get all Parts with pagination, sorting, and search
const getParts = async (page, limit, sort, search) => {
  try {
    const query = {
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ],
    };
    const parts = await Parts.find(query)
      .sort({ [sort]: 1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return parts;
  } catch (error) {
    console.error('Error fetching parts:', error);
    throw error;
  }
};

// Get a Part by ID
const getPartById = async (id) => {
  try {
    const part = await Parts.findById(id);
    return part;
  } catch (error) {
    console.error('Error fetching part by ID:', error);
    throw error;
  }
};

// Update a Part by ID
const updatePart = async (id, updateData) => {
  try {
    const updatedPart = await Parts.findByIdAndUpdate(id, updateData, { new: true });
    return updatedPart;
  } catch (error) {
    console.error('Error updating part:', error);
    throw error;
  }
};

// Update the status of a Part by ID
const updatePartStatus = async (id, status) => {
  try {
    const updatedPart = await Parts.findByIdAndUpdate(id, { status, updated_at: Date.now() }, { new: true });
    return updatedPart;
  } catch (error) {
    console.error('Error updating part status:', error);
    throw error;
  }
};

// Delete a Part by ID
const deletePart = async (id) => {
  try {
    const part = await Parts.findByIdAndDelete(id);
    return part;
  } catch (error) {
    console.error('Error deleting part:', error);
    throw error;
  }
};

module.exports = {
  createPart,
  getParts,
  getPartById,
  updatePart,
  updatePartStatus,
  deletePart,
};
