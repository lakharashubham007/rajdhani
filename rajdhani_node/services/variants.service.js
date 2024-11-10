const { Variants } = require('../models'); // Assuming the Variants schema is in models folder

// Create a new Variant
const createVariant = async (data) => {
    try {
        const newVariant = await Variants.create({
            name: data.name,
            description: data.description,
            specification: data.specification,
            tax: data.tax,
            price: data.price,
            status: data.status,
            part_id: data.part_id,
        });
        return newVariant;
    } catch (error) {
        console.error('Error creating variant:', error);
        throw error;
    }
};

// Get all Variants
const getAllVariants = async () => {
    try {
        const variantsList = await Variants.find({});
        return variantsList;
    } catch (error) {
        console.error('Error fetching variants:', error);
        throw error;
    }
};

// Get a Variant by ID
const getVariantById = async (id) => {
    try {
        const variant = await Variants.findById(id);
        return variant;
    } catch (error) {
        console.error('Error fetching variant by ID:', error);
        throw error;
    }
};

// Update a Variant by ID
const updateVariant = async (id, data) => {
    try {
        const updatedVariant = await Variants.findByIdAndUpdate(
            id,
            {
                name: data.name,
                description: data.description,
                specification: data.specification,
                tax: data.tax,
                price: data.price,
                status: data.status,
                part_id: data.part_id,
            },
            { new: true } // Return the updated document
        );
        return updatedVariant;
    } catch (error) {
        console.error('Error updating variant:', error);
        throw error;
    }
};

// Delete a Variant by ID
const deleteVariant = async (id) => {
    try {
        const deletedVariant = await Variants.findByIdAndDelete(id);
        return deletedVariant;
    } catch (error) {
        console.error('Error deleting variant:', error);
        throw error;
    }
};

module.exports = {
    createVariant,
    getAllVariants,
    getVariantById,
    updateVariant,
    deleteVariant,
};
