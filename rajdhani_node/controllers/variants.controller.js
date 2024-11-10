const { variantService } = require("../services"); // Assumes you have a service file for Variants

// Create a new Variant
const createVariant = async (req, res) => {
    try {
        const variant = await variantService.createVariant(req.body);
        res.status(201).json({ success: true, variant, message: 'Variant created successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Get all Variants
const getAllVariants = async (req, res) => {
    try {
        const variants = await variantService.getAllVariants();
        res.json({ success: true, variants });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Get a Variant by ID
const getVariantById = async (req, res) => {
    try {
        const variant = await variantService.getVariantById(req.params.id);
        if (!variant) {
            return res.status(404).json({ success: false, message: 'Variant not found' });
        }
        res.json({ success: true, variant });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Update a Variant by ID
const updateVariant = async (req, res) => {
    try {
        const variant = await variantService.updateVariant(req.params.id, req.body);
        if (!variant) {
            return res.status(404).json({ success: false, message: 'Variant not found' });
        }
        res.json({ success: true, variant, message: 'Variant updated successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Delete a Variant by ID
const deleteVariant = async (req, res) => {
    try {
        const variant = await variantService.deleteVariant(req.params.id);
        if (!variant) {
            return res.status(404).json({ success: false, message: 'Variant not found' });
        }
        res.json({ success: true, message: 'Variant deleted successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

module.exports = {
    createVariant,
    getAllVariants,
    getVariantById,
    updateVariant,
    deleteVariant,
};
