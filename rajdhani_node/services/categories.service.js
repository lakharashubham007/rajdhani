const { Categories } = require('../models'); // Adjust the import as needed

const createCategory = async (data, file) => {
    try {
        const newCategory = await Categories.create({
            name: data.name,
            image: file, // Store the path to the image file
            type: 'main-category'
            // parent_id: data.parent_id,
            // position: data.position,
            // status: data.status,
            // priority: data.priority,
            // slug: data.slug,
        });
        return newCategory;
    } catch (error) {
        console.error('Error creating category:', error);
        throw error;
    }
};

const getCategories = async () => {
    try {
        const categoriesList = await Categories.find({});
        return categoriesList;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

const createSubCategory = async (data) => {
    try {
        const newSubCategory = await Categories.create({
            name: data.name,
            parent_id: data.parent_id,
            type: 'sub-category'
        });
        return newSubCategory;
    } catch (error) {
        console.error('Error creating category:', error);
        throw error;
    }
};


module.exports = {
    createCategory,
    getCategories,
    createSubCategory
};
