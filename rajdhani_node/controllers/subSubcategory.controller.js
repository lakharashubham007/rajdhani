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

// Get all SubSubcategories
const getAllSubSubcategories = async (req, res) => {
  try {
      const subSubcategories = await subSubcategoryService.getAllSubSubcategories();
      res.json({ success: true, subSubcategories: subSubcategories });
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};


// Controller: Get all Sub-Subcategories with pagination, sorting, and search
const getSubSubcategories = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page
    const sort = req.query.sort || 'name'; // Default sorting by name
    const search = req.query.search || ''; // Default empty search

    const subSubcategories = await subSubcategoryService.getSubSubcategories(page, limit, sort, search);
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

// // Update a Sub-Subcategory by ID
// const updateSubSubcategory = async (req, res) => {
//   try {
//     const subSubcategory = await subSubcategoryService.updateSubSubcategory(req.params.id, req.body, req.files?.image[0]?.originalname);
//     if (!subSubcategory) {
//       return res.status(404).json({ success: false, message: 'Sub-Subcategory not found' });
//     }
//     res.json({ success: true, subSubcategory, message: 'Sub-Subcategory updated successfully!' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: 'Internal Server Error' });
//   }
// };

// Update a Sub-Subcategory by ID
const updateSubSubcategory = async (req, res) => {
  try {
    // Define fields to check in req.body and map them to updateData if present
    const fieldsToUpdate = ['name', 'type', 'subcategory_id', 'position', 'status', 'priority'];
    const updateData = {};

    // Conditionally add fields present in request body
    fieldsToUpdate.forEach(field => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    // Check if image is provided in the request files, then add it to updateData
    if (req.files && req.files.image && req.files.image[0]) {
      updateData.image = req.files.image[0].originalname;
    }

    // Update timestamp
    updateData.updated_at = Date.now();

    // Call the service to update sub-subcategory with only the changed fields
    const subSubcategory = await subSubcategoryService.updateSubSubcategory(req.params.id, updateData);

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
  getAllSubSubcategories
};
