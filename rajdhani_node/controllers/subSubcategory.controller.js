const { subSubcategoryService } = require("../services");

// Create a new Sub-Subcategory
const createSubSubcategory = async (req, res) => {
  try {
    const subSubcategory = await subSubcategoryService.createSubSubcategory(req.body, req.files?.image[0]?.originalname);
    res.json({ success: true, subSubcategory, message: 'Sub-Subcategory added successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Get all Sub-Subcategories
const getSubSubcategories = async (req, res) => {
  try {
    const subSubcategories = await subSubcategoryService.getSubSubcategories();
    res.json({ success: true, subSubcategories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Get a single Sub-Subcategory by ID
const getSubSubcategoryById = async (req, res) => {
  try {
    const subSubcategory = await subSubcategoryService.getSubSubcategoryById(req.params.id);
    if (!subSubcategory) {
      return res.status(404).json({ success: false, message: 'Sub-Subcategory not found' });
    }
    res.json({ success: true, subSubcategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Update a Sub-Subcategory by ID
const updateSubSubcategory = async (req, res) => {
  try {
    const subSubcategory = await subSubcategoryService.updateSubSubcategory(req.params.id, req.body, req.files?.image[0]?.originalname);
    if (!subSubcategory) {
      return res.status(404).json({ success: false, message: 'Sub-Subcategory not found' });
    }
    res.json({ success: true, subSubcategory, message: 'Sub-Subcategory updated successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Delete a Sub-Subcategory by ID
const deleteSubSubcategory = async (req, res) => {
  try {
    const subSubcategory = await subSubcategoryService.deleteSubSubcategory(req.params.id);
    if (!subSubcategory) {
      return res.status(404).json({ success: false, message: 'Sub-Subcategory not found' });
    }
    res.json({ success: true, message: 'Sub-Subcategory deleted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

module.exports = {
  createSubSubcategory,
  getSubSubcategories,
  getSubSubcategoryById,
  updateSubSubcategory,
  deleteSubSubcategory,
};
