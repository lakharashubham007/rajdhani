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
const getSubcategories = async (req, res) => {
    try {
        const subcategories = await subcategoryService.getSubcategories();
        res.json({ success: true, subcategories: subcategories });
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
const updateSubcategory = async (req, res) => {
    try {
        const subcategory = await subcategoryService.updateSubcategory(req.params.id, req.body, req.files?.image[0]?.originalname);
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
    deleteSubcategory
};
