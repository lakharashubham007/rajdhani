const { partsService } = require("../services");

// Create a new Part
const createPart = async (req, res) => {
    try {
        const part = await partsService.createPart(req.body, req.files?.image[0]?.originalname);
        res.json({ success: true, part: part, message: 'Part added successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Get all Parts
const getParts = async (req, res) => {
    try {
        const parts = await partsService.getParts();
        res.json({ success: true, parts: parts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Get a single Part by ID
const getPartById = async (req, res) => {
    try {
        const part = await partsService.getPartById(req.params.id);
        if (!part) {
            return res.status(404).json({ success: false, message: 'Part not found' });
        }
        res.json({ success: true, part: part });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Update a Part by ID
const updatePart = async (req, res) => {
    try {
        const part = await partsService.updatePart(req.params.id, req.body, req.files?.image[0]?.originalname);
        if (!part) {
            return res.status(404).json({ success: false, message: 'Part not found' });
        }
        res.json({ success: true, part: part, message: 'Part updated successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Delete a Part by ID
const deletePart = async (req, res) => {
    try {
        const part = await partsService.deletePart(req.params.id);
        if (!part) {
            return res.status(404).json({ success: false, message: 'Part not found' });
        }
        res.json({ success: true, message: 'Part deleted successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

module.exports = {
    createPart,
    getParts,
    getPartById,
    updatePart,
    deletePart
};
