const { variantSubCategoryService } = require('../services');

// Create a new Variant Subcategory
const createVariantSubCategory = async (req, res) => {
  try {
    const variantSubCategory = await variantSubCategoryService.createVariantSubCategory(req.body);
    res.json({ success: true, variantSubCategory, message: 'Variant Subcategory created successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Get all Variant Subcategories
const getVariantSubCategories = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sort = req.query.sort || 'name';
    const search = req.query.search || '';
    
    const variantSubCategories = await variantSubCategoryService.getVariantSubCategories(page, limit, sort, search);
    res.json({ success: true, variantSubCategories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Get a single Variant Subcategory by ID
const getVariantSubCategoryById = async (req, res) => {
  try {
    const variantSubCategory = await variantSubCategoryService.getVariantSubCategoryById(req.params.id);
    if (!variantSubCategory) {
      return res.status(404).json({ success: false, message: 'Variant Subcategory not found' });
    }
    res.json({ success: true, variantSubCategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Update a Variant Subcategory by ID
const updateVariantSubCategory = async (req, res) => {
  try {
    // Define the fields that may need updating
    const fieldsToUpdate = ['name', 'description', 'variantCategoryId'];  // These are the fields in the VariantSubCategory schema
    const updateData = {};

    // Conditionally add fields from request body to updateData
    fieldsToUpdate.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    // Set updated_at timestamp
    updateData.updatedAt = Date.now();

    // Call the service to update the variant subcategory with only the changed fields
    const updatedVariantSubCategory = await variantSubCategoryService.updateVariantSubCategory(req.params.id, updateData);

    if (!updatedVariantSubCategory) {
      return res.status(404).json({ success: false, message: 'Variant Subcategory not found' });
    }

    res.json({ success: true, variantSubCategory: updatedVariantSubCategory, message: 'Variant Subcategory updated successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Delete a Variant Subcategory by ID
const deleteVariantSubCategory = async (req, res) => {
  try {
    const variantSubCategory = await variantSubCategoryService.deleteVariantSubCategory(req.params.id);
    if (!variantSubCategory) {
      return res.status(404).json({ success: false, message: 'Variant Subcategory not found' });
    }
    res.json({ success: true, message: 'Variant Subcategory deleted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

module.exports = {
  createVariantSubCategory,
  getVariantSubCategories,
  getVariantSubCategoryById,
  updateVariantSubCategory,
  deleteVariantSubCategory
};
