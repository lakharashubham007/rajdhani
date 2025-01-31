const { designService } = require("../services");

// Create a new Design
const createDesign = async (req, res) => {
    try {
        const design = await designService.createDesign(req.body);
        res.json({ success: true, design, message: 'Design added successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Get all Designs
const getAllDesigns = async (req, res) => {
    try {
        const designs = await designService.getAllDesigns();
        res.json({ success: true, designs });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Get paginated and filtered Designs
const getDesigns = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const sort = req.query.sort || 'name';
        const search = req.query.search || '';

        const designs = await designService.getDesigns(page, limit, sort, search);
        res.json({ success: true, designs });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Get a single Design by ID
const getDesignById = async (req, res) => {
    try {
        const design = await designService.getDesignById(req.params.id);
        if (!design) {
            return res.status(404).json({ success: false, message: 'Design not found' });
        }
        res.json({ success: true, design });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Update a Design
const updateDesign = async (req, res) => {
    try {
        const updateData = {};
        if (req.body.name) updateData.name = req.body.name;
        if (req.body.code) updateData.code = req.body.code;
        if (req.body.description) updateData.description = req.body.description;

        updateData.updated_at = Date.now();

        const design = await designService.updateDesign(req.params.id, updateData);
        if (!design) {
            return res.status(404).json({ success: false, message: 'Design not found' });
        }
        res.json({ success: true, design, message: 'Design updated successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Delete a Design by ID
const deleteDesign = async (req, res) => {
    try {
        const design = await designService.deleteDesign(req.params.id);
        if (!design) {
            return res.status(404).json({ success: false, message: 'Design not found' });
        }
        res.json({ success: true, message: 'Design deleted successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Update Design Status
const updateDesignStatus = async (req, res) => {
    try {
        const designId = req.params.id;
        const status = req.body.status; // Expecting { "status": true } or { "status": false }
        const updatedDesign = await designService.updateDesignStatus(designId, status);

        if (!updatedDesign) {
            return res.status(404).json({ success: false, message: 'Design not found' });
        }

        res.json({
            success: true,
            design: updatedDesign,
            message: 'Design status updated successfully!'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

module.exports = {
    createDesign,
    getDesigns,
    getDesignById,
    updateDesign,
    deleteDesign,
    updateDesignStatus,
    getAllDesigns
};
