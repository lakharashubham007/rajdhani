const { categoriesService } = require("../services");

// Create a new Category
const createCategory = async (req, res) => {
    try {
        const category = await categoriesService.createCategory(req.body, req.files?.image[0]?.originalname);
        res.json({ success: true, category: category, message: 'Category added successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Get all Categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await categoriesService.getAllCategories();
        res.json({ success: true, categories: categories });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};


// Controller to get paginated, sorted, and searchable category list
const getCategories = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Default to page 1
        const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page
        const sort = req.query.sort || 'name'; // Default sorting by name
        const search = req.query.search || ''; // Default empty search

        const categories = await categoriesService.getCategories(page, limit, sort, search);
        res.json({ success: true, categories: categories });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Get a single Category by ID
const getCategoryById = async (req, res) => {
    try {
        const category = await categoriesService.getCategoryById(req.params.id);
        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }
        res.json({ success: true, category: category });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Update a Category by ID
const updateCategory = async (req, res) => {
    try {
        // Define the fields that may need updating
        const fieldsToUpdate = ['name', 'type', 'parent_id', 'position', 'status', 'priority'];
        const updateData = {};

        // Conditionally add fields from request body to updateData
        fieldsToUpdate.forEach((field) => {
            if (req.body[field] !== undefined) {
                updateData[field] = req.body[field];
            }
        });

        // Check if image file is provided, and add it to updateData
        if (req.files && req.files.image && req.files.image[0]) {
            updateData.image = req.files.image[0].originalname;
        }

        // Set updated_at timestamp
        updateData.updated_at = Date.now();

        // Call the service to update category with only the changed fields
        const category = await categoriesService.updateCategory(req.params.id, updateData);

        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }

        res.json({ success: true, category: category, message: 'Category updated successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};


// // Update a Category by ID
// const updateCategory = async (req, res) => {
//     try {
//         const category = await categoriesService.updateCategory(req.params.id, req.body, req.files?.image[0]?.originalname);
//         if (!category) {
//             return res.status(404).json({ success: false, message: 'Category not found' });
//         }
//         res.json({ success: true, category: category, message: 'Category updated successfully!' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: 'Internal Server Error' });
//     }
// };

// Delete a Category by ID
const deleteCategory = async (req, res) => {
    try {
        const category = await categoriesService.deleteCategory(req.params.id);
        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }
        res.json({ success: true, message: 'Category deleted successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Update Category Status
const updateCategoryStatus = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const status = req.body.status; // Expecting { "status": true } or { "status": false }
        const updatedCategory = await categoriesService.updateCategoryStatus(categoryId, status);

        if (!updatedCategory) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }

        res.json({
            success: true,
            category: updatedCategory,
            message: 'Category status updated successfully!'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};


module.exports = {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
    updateCategoryStatus,
    getAllCategories
};
