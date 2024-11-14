const {materialService} = require('../services');

// Create a new material
const createMaterial = async (req, res) => {
  try {
    const material = await materialService.createMaterial(req.body);
    res.json({ success: true, materials: material, message: 'Material created successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

//getAllMaterials
// Get all materials with pagination, sorting, and search
const getAllMaterials = async (req, res) => {
  try {
    const materials = await materialService.getAllMaterials();
    res.json({ success: true, materials });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Get all materials with pagination, sorting, and search
const getMaterials = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sort = req.query.sort || 'name';
    const search = req.query.search || '';
    
    const materials = await materialService.getMaterials(page, limit, sort, search);
    res.json({ success: true, ...materials });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Get a single material by ID
const getMaterialById = async (req, res) => {
  try {
    const material = await materialService.getMaterialById(req.params.id);
    if (!material) {
      return res.status(404).json({ success: false, message: 'Material not found' });
    }
    res.json({ success: true, material });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Update a material by ID
const updateMaterial = async (req, res) => {
    try {
      // Define the fields that may need updating
      const fieldsToUpdate = ['name', 'isActive']; // These are the fields in the Material schema
      const updateData = {};
  
      // Conditionally add fields from the request body to updateData
      fieldsToUpdate.forEach((field) => {
        if (req.body[field] !== undefined) {
          updateData[field] = req.body[field];
        }
      });
  
      // Check if any file (like an image or document) is provided and add it to updateData (if necessary)
      if (req.files && req.files.image && req.files.image[0]) {
        updateData.image = req.files.image[0].originalname;
      }
  
      // Set updated_at timestamp
      updateData.updated_at = Date.now();
  
      // Call the service to update the material with only the changed fields
      const updatedMaterial = await materialService.updateMaterial(req.params.id, updateData);
  
      if (!updatedMaterial) {
        return res.status(404).json({ success: false, message: 'Material not found' });
      }
  
      res.json({ success: true, updatedMaterial, message: 'Material updated successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };

// Delete a material by ID
const deleteMaterial = async (req, res) => {
  try {
    const deletedMaterial = await materialService.deleteMaterial(req.params.id);
    if (!deletedMaterial) {
      return res.status(404).json({ success: false, message: 'Material not found' });
    }
    res.json({ success: true, message: 'Material deleted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Update material status
const updateMaterialStatus = async (req, res) => {
  try {
    const { isActive } = req.body; // status should be a boolean (true/false)
    const updatedMaterial = await materialService.updateMaterialStatus(req.params.id, isActive);
    if (!updatedMaterial) {
      return res.status(404).json({ success: false, message: 'Material not found' });
    }
    res.json({ success: true, updatedMaterial, message: 'Material status updated successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
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
