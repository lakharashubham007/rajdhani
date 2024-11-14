const { subcategoryService } = require("../services");

// Create a new Subcategory
const createSubcategory = async (req, res) => {
    try {
        const subcategory = await subcategoryService.createSubcategory(req.body, req.files?.image[0]?.originalname);
        res.json({ success: true, subcategory: subcategory, message: 'Subcategory added successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Get all Subcategories
const getAllSubcategories = async (req, res) => {
    try {
        const subcategories = await subcategoryService.getAllSubcategories();
        res.json({ success: true, subcategories: subcategories });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Get all Subcategories with pagination, sorting, and search
const getSubcategories = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Default to page 1
        const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page
        const sort = req.query.sort || 'name'; // Default sorting by name
        const search = req.query.search || ''; // Default empty search

        const subcategories = await subcategoryService.getSubcategories(page, limit, sort, search);
        res.json({ success: true, subcategories });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};


// Get a single Subcategory by ID
const getSubcategoryById = async (req, res) => {
    try {
        const subcategory = await subcategoryService.getSubcategoryById(req.params.id);
        if (!subcategory) {
            return res.status(404).json({ success: false, message: 'Subcategory not found' });
        }
        res.json({ success: true, subcategory: subcategory });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Update a Subcategory by ID
// const updateSubcategory = async (req, res) => {
//     try {
//         const subcategory = await subcategoryService.updateSubcategory(req.params.id, req.body, req.files?.image[0]?.originalname);
//         if (!subcategory) {
//             return res.status(404).json({ success: false, message: 'Subcategory not found' });
//         }
//         res.json({ success: true, subcategory: subcategory, message: 'Subcategory updated successfully!' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: 'Internal Server Error' });
//     }
// };

// Update a Subcategory by ID
const updateSubcategory = async (req, res) => {
    try {
        // Define fields to check in req.body and map them to updateData if present
        const fieldsToUpdate = ['name', 'type', 'parent_id', 'position', 'status', 'priority', 'category_id'];
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

        // Call the service to update subcategory with only the changed fields
        const subcategory = await subcategoryService.updateSubcategory(req.params.id, updateData);

        if (!subcategory) {
            return res.status(404).json({ success: false, message: 'Subcategory not found' });
        }

        res.json({ success: true, subcategory: subcategory, message: 'Subcategory updated successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};


// Delete a Subcategory by ID
const deleteSubcategory = async (req, res) => {
    try {
        const subcategory = await subcategoryService.deleteSubcategory(req.params.id);
        if (!subcategory) {
            return res.status(404).json({ success: false, message: 'Subcategory not found' });
        }
        res.json({ success: true, message: 'Subcategory deleted successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

module.exports = {
    createSubcategory,
    getSubcategories,
    getSubcategoryById,
    updateSubcategory,
    deleteSubcategory,
    getAllSubcategories
};
