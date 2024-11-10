const { categoryService } = require("../services"); // Adjust the service import as needed

const createCategory = async (req, res) => {
    try {
        const category = await categoryService.createCategory(req.body, req.files?.image[0]?.originalname);
        res.json({ success: true, category });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

const getCategories = async (req, res) => {
    try {
        const categories = await categoryService.getCategories();
        res.json({ success: true, categories });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

const createSubCategory = async (req, res) => {
    try {
        const subCategory = await categoryService.createSubCategory(req.body);
        res.json({ success: true, subCategory , message: 'Subcategory added successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

module.exports = {
    createCategory,
    getCategories,
    createSubCategory
};
