const { variantCategoryService } = require('../services');

// Create a new Variant Category
const createVariantCategory = async (req, res) => {
  try {
    const variantCategory = await variantCategoryService.createVariantCategory(req.body);
    res.json({ success: true, variantCategory, message: 'Variant category created successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Get all Variant Categories
const getVariantCategories = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sort = req.query.sort || 'name';
    const search = req.query.search || '';
    
    const variantCategories = await variantCategoryService.getVariantCategories(page, limit, sort, search);
    res.json({ success: true, variantCategories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Get a single Variant Category by ID
const getVariantCategoryById = async (req, res) => {
  try {
    const variantCategory = await variantCategoryService.getVariantCategoryById(req.params.id);
    if (!variantCategory) {
      return res.status(404).json({ success: false, message: 'Variant Category not found' });
    }
    res.json({ success: true, variantCategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Update a Variant Category by ID
const updateVariantCategory = async (req, res) => {
    try {
        // Define the fields that may need updating
        const fieldsToUpdate = ['name', 'description'];  // These are the fields in the VariantCategory schema
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
        updateData.updatedAt = Date.now();

        // Call the service to update the variant category with only the changed fields
        const updatedVariantCategory = await variantCategoryService.updateVariantCategory(req.params.id, updateData);

        if (!updatedVariantCategory) {
            return res.status(404).json({ success: false, message: 'Variant Category not found' });
        }

        res.json({ success: true, variantCategory: updatedVariantCategory, message: 'Variant Category updated successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Delete a Variant Category by ID
const deleteVariantCategory = async (req, res) => {
  try {
    const variantCategory = await variantCategoryService.deleteVariantCategory(req.params.id);
    if (!variantCategory) {
      return res.status(404).json({ success: false, message: 'Variant Category not found' });
    }
    res.json({ success: true, message: 'Variant Category deleted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

module.exports = {
  createVariantCategory,
  getVariantCategories,
  getVariantCategoryById,
  updateVariantCategory,
  deleteVariantCategory
};
