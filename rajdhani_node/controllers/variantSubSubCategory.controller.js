const { variantSubSubCategoryService } = require('../services');

// Create a new Variant Sub-Subcategory
const createVariantSubSubCategory = async (req, res) => {
  try {
    const variantSubSubCategory = await variantSubSubCategoryService.createVariantSubSubCategory(req.body);
    res.json({ success: true, variantSubSubCategory, message: 'Variant Sub-Subcategory created successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Get all Variant Sub-Subcategories
const getVariantSubSubCategories = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sort = req.query.sort || 'name';
    const search = req.query.search || '';
    
    const variantSubSubCategories = await variantSubSubCategoryService.getVariantSubSubCategories(page, limit, sort, search);
    res.json({ success: true, variantSubSubCategories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Get a single Variant Sub-Subcategory by ID
const getVariantSubSubCategoryById = async (req, res) => {
  try {
    const variantSubSubCategory = await variantSubSubCategoryService.getVariantSubSubCategoryById(req.params.id);
    if (!variantSubSubCategory) {
      return res.status(404).json({ success: false, message: 'Variant Sub-Subcategory not found' });
    }
    res.json({ success: true, variantSubSubCategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Update a Variant Sub-Subcategory by ID
const updateVariantSubSubCategory = async (req, res) => {
  try {
    // Define the fields that may need updating
    const fieldsToUpdate = ['name', 'description', 'variantSubCategoryId'];  // These are the fields in the VariantSubSubCategory schema
    const updateData = {};

    // Conditionally add fields from request body to updateData
    fieldsToUpdate.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    // Set updated_at timestamp
    updateData.updatedAt = Date.now();

    // Call the service to update the variant sub-subcategory with only the changed fields
    const updatedVariantSubSubCategory = await variantSubSubCategoryService.updateVariantSubSubCategory(req.params.id, updateData);

    if (!updatedVariantSubSubCategory) {
      return res.status(404).json({ success: false, message: 'Variant Sub-Subcategory not found' });
    }

    res.json({ success: true, variantSubSubCategory: updatedVariantSubSubCategory, message: 'Variant Sub-Subcategory updated successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Delete a Variant Sub-Subcategory by ID
const deleteVariantSubSubCategory = async (req, res) => {
  try {
    const variantSubSubCategory = await variantSubSubCategoryService.deleteVariantSubSubCategory(req.params.id);
    if (!variantSubSubCategory) {
      return res.status(404).json({ success: false, message: 'Variant Sub-Subcategory not found' });
    }
    res.json({ success: true, message: 'Variant Sub-Subcategory deleted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

module.exports = {
  createVariantSubSubCategory,
  getVariantSubSubCategories,
  getVariantSubSubCategoryById,
  updateVariantSubSubCategory,
  deleteVariantSubSubCategory
};
