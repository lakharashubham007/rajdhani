const { Parts } = require('../models'); // Assuming `Parts` model is defined in the `models` folder

// Create a new Part
const createPart = async (data, imageFileName) => {
    try {
        const newPart = await Parts.create({
            name: data.name,
            description: data.description,
            image: imageFileName || null,
            gallery: data.gallery || [],
            brand_id: data.brand_id,
            hsn_no: data.hsn_no,
            ean_no: data.ean_no,
            tax: data.tax,
            status: data.status !== undefined ? data.status : true,
            category_id: data.category_id,
            subcategory_id: data.subcategory_id
        });
        return newPart;
    } catch (error) {
        console.error('Error creating part:', error);
        throw error;
    }
};

// Get all Parts
const getParts = async () => {
    try {
        const partsList = await Parts.find({});
        return partsList;
    } catch (error) {
        console.error('Error fetching parts:', error);
        throw error;
    }
};

// Get a Part by ID
const getPartById = async (partId) => {
    try {
        const part = await Parts.findById(partId);
        return part;
    } catch (error) {
        console.error('Error fetching part by ID:', error);
        throw error;
    }
};

// Update a Part by ID
const updatePart = async (partId, data, imageFileName) => {
    try {
        const updatedPart = await Parts.findByIdAndUpdate(
            partId,
            {
                name: data.name,
                description: data.description,
                image: imageFileName || data.image,
                gallery: data.gallery || [],
                brand_id: data.brand_id,
                hsn_no: data.hsn_no,
                ean_no: data.ean_no,
                tax: data.tax,
                status: data.status !== undefined ? data.status : true,
                category_id: data.category_id,
                subcategory_id: data.subcategory_id
            },
            { new: true }
        );
        return updatedPart;
    } catch (error) {
        console.error('Error updating part:', error);
        throw error;
    }
};

// Delete a Part by ID
const deletePart = async (partId) => {
    try {
        const deletedPart = await Parts.findByIdAndDelete(partId);
        return deletedPart;
    } catch (error) {
        console.error('Error deleting part:', error);
        throw error;
    }
};

module.exports = {
    createPart,
    getParts,
    getPartById,
    updatePart,
    deletePart
};
