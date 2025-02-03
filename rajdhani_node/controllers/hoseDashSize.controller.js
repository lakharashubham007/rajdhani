const { hoseDashSizeService } = require("../services");

// Create a new HoseDashSize
const createHoseDashSize = async (req, res) => {
    try {
        const hoseDashSize = await hoseDashSizeService.createHoseDashSize(req.body);
        res.json({ success: true, hoseDashSize, message: 'Hose dash size added successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Get all HoseDashSizes (for simple dropdown use)
const getAllHoseDashSizes = async (req, res) => {
    try {
        const hoseDashSizes = await hoseDashSizeService.getAllHoseDashSizes();
        res.json({ success: true, hoseDashSizes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Get paginated, sorted, and searchable HoseDashSizes
const getHoseDashSizes = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const sort = req.query.sort || 'size';
        const search = req.query.search || '';

        const hoseDashSizes = await hoseDashSizeService.getHoseDashSizes(page, limit, sort, search);
        res.json({ success: true, hoseDashSizes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Get a single HoseDashSize by ID
const getHoseDashSizeById = async (req, res) => {
    try {
        const hoseDashSize = await hoseDashSizeService.getHoseDashSizeById(req.params.id);
        if (!hoseDashSize) {
            return res.status(404).json({ success: false, message: 'Hose dash size not found' });
        }
        res.json({ success: true, hoseDashSize });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Update a HoseDashSize
const updateHoseDashSize = async (req, res) => {
    try {
        const updateData = {};
        if (req.body.size) updateData.size = req.body.size;
        if (req.body.code) updateData.code = req.body.code;
        if (req.body.dsc_code) updateData.dsc_code = req.body.dsc_code;
        if (req.body.dash_code) updateData.dash_code = req.body.dash_code;

        updateData.updated_at = Date.now();

        const hoseDashSize = await hoseDashSizeService.updateHoseDashSize(req.params.id, updateData);
        if (!hoseDashSize) {
            return res.status(404).json({ success: false, message: 'Hose dash size not found' });
        }
        res.json({ success: true, hoseDashSize, message: 'Hose dash size updated successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Delete a HoseDashSize by ID
const deleteHoseDashSize = async (req, res) => {
    try {
        const hoseDashSize = await hoseDashSizeService.deleteHoseDashSize(req.params.id);
        if (!hoseDashSize) {
            return res.status(404).json({ success: false, message: 'Hose dash size not found' });
        }
        res.json({ success: true, message: 'Hose dash size deleted successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Update HoseDashSize Status
const updateHoseDashSizeStatus = async (req, res) => {
    try {
        const hoseDashSizeId = req.params.id;
        const status = req.body.status; // Expecting { "status": true } or { "status": false }
        const updatedHoseDashSize = await hoseDashSizeService.updateHoseDashSizeStatus(hoseDashSizeId, status);

        if (!updatedHoseDashSize) {
            return res.status(404).json({ success: false, message: 'Hose dash size not found' });
        }

        res.json({
            success: true,
            hoseDashSize: updatedHoseDashSize,
            message: 'Hose dash size status updated successfully!'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

module.exports = {
    createHoseDashSize,
    getHoseDashSizes,
    getHoseDashSizeById,
    updateHoseDashSize,
    deleteHoseDashSize,
    updateHoseDashSizeStatus,
    getAllHoseDashSizes
};
