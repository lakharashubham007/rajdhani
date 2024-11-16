const { Parts } = require('../models'); // Assuming the Parts model is located here



// Create a new Variant
const createPart = async (data) => {
    try {
      // const newPart = await Parts.create({ ...data, image: file || 'def.png' });
      const newPart = (await (await Parts.create({ ...data })));
      return newPart;
    } catch (error) {
      console.error('Error creating part:', error);
      throw error;
    }
  };

  // Get all parts without pagination, sorting, or search
const getAllParts = async () => {
  try {
    const parts = await Parts.find({}).populate('material_id').populate('fittingsize_id'); // Fetch all threads
    return parts;
  } catch (error) {
    console.error('Error fetching parts:', error);
    throw error;
  }
};

const getParts = async (page, limit, sort, search) => {
  try {
      const skip = (page - 1) * limit;

      // Build a dynamic filter for searching
      const filter = search
          ? {
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { description: { $regex: search, $options: 'i' } },
                ],
            }
          : {};

      // Parse the sort parameter
      let sortOptions = {};
      if (sort) {
          const [field, order] = sort.split(':');
          sortOptions[field] = order === 'dsc' ? -1 : 1; // -1 for descending, 1 for ascending
      } else {
          sortOptions = { name: 1 }; // Default sort by name in ascending order if sort is not provided
      }

      const parts = await Parts.find(filter)
          .populate('material_id', 'name description') // Populate material details
          .populate('fittingsize_id', 'size description') // Populate fitting size details
          .sort(sortOptions)
          .skip(skip)
          .limit(limit);

      const totalParts = await Parts.countDocuments(filter);

      return {
          parts,
          totalParts,
          totalPages: Math.ceil(totalParts / limit),
          currentPage: page,
          rowsPerPage: limit,
      };
  } catch (error) {
      console.error('Error fetching parts:', error);
      throw error;
  }
};


// Get a Part by ID
const getPartById = async (id) => {
  try {
    const part = await Parts.findById(id).populate('material_id').populate('fittingsize_id');
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
  getAllParts
};
