const { Materials } = require('../models');

// Create a new material
const createMaterial = async (data) => {
  try {
    const newMaterial = await Materials.create(data);
    return newMaterial;
  } catch (error) {
    console.error('Error creating material:', error);
    throw error;
  }
};

// getAllMaterials
const getAllMaterials = async () => {
  try {
    const materials = await Materials.find({});
    return materials;
  } catch (error) {
    console.error('Error getting subcategories:', error);
    throw error;
  }
};


// Get all materials with pagination, sorting, and search
const getMaterials = async (page, limit, sort, search) => {
  try {
    const skip = (page - 1) * limit;
    const filter = search ? { name: { $regex: search, $options: 'i' } } : {};

    let sortOptions = {};
    if (sort) {
      const [field, order] = sort.split(':');
      sortOptions[field] = order === 'dsc' ? -1 : 1;
    } else {
      sortOptions = { name: 1 }; // Default sort by name
    }

    const materials = await Materials.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    const totalMaterials = await Materials.countDocuments(filter);

    return {
      materials,
      totalMaterials,
      totalPages: Math.ceil(totalMaterials / limit),
      currentPage: page,
      rowsPerPage: limit
    };
  } catch (error) {
    console.error('Error fetching materials:', error);
    throw error;
  }
};

// Get a material by ID
const getMaterialById = async (id) => {
  try {
    const material = await Materials.findById(id);
    return material;
  } catch (error) {
    console.error('Error fetching material by ID:', error);
    throw error;
  }
};

// Update a material by ID
const updateMaterial = async (id, updateData) => {
  try {
    const updatedMaterial = await Materials.findByIdAndUpdate(id, updateData, { new: true });
    return updatedMaterial;
  } catch (error) {
    console.error('Error updating material:', error);
    throw error;
  }
};

// Delete a material by ID
const deleteMaterial = async (id) => {
  try {
    const deletedMaterial = await Materials.findByIdAndDelete(id);
    return deletedMaterial;
  } catch (error) {
    console.error('Error deleting material:', error);
    throw error;
  }
};

// Update material status (isActive)
const updateMaterialStatus = async (id, status) => {
  try {
    const updatedMaterial = await Materials.findByIdAndUpdate(id, { isActive: status }, { new: true });
    return updatedMaterial;
  } catch (error) {
    console.error('Error updating material status:', error);
    throw error;
  }
};

module.exports = {
  createMaterial,
  getMaterials,
  getMaterialById,
  updateMaterial,
  deleteMaterial,
  updateMaterialStatus,
  getAllMaterials
};
