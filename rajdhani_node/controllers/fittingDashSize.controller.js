const { fittingDashSizeService } = require("../services");

// Create a new FittingDashSize
const createFittingDashSize = async (req, res) => {
    try {
        const fittingDashSize = await fittingDashSizeService.createFittingDashSize(req.body);
        res.json({ success: true, fittingDashSize, message: 'Fitting dash size added successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Get all FittingDashSizes (for dropdown use)
const getAllFittingDashSizes = async (req, res) => {
    try {
        const fittingDashSizes = await fittingDashSizeService.getAllFittingDashSizes();
        res.json({ success: true, fittingDashSizes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Get paginated, sorted, and searchable FittingDashSizes
const getFittingDashSizes = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const sort = req.query.sort || 'thread_type';
        const search = req.query.search || '';
        const thread_type = req.query.thread_type || '';

        const fittingDashSizes = await fittingDashSizeService.getFittingDashSizes(page, limit, sort, search,thread_type);
        res.json({ success: true, fittingDashSizes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Get a single FittingDashSize by ID
const getFittingDashSizeById = async (req, res) => {
    try {
        const fittingDashSize = await fittingDashSizeService.getFittingDashSizeById(req.params.id);
        if (!fittingDashSize) {
            return res.status(404).json({ success: false, message: 'Fitting dash size not found' });
        }
        res.json({ success: true, fittingDashSize });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Update a FittingDashSize
const updateFittingDashSize = async (req, res) => {
    try {
        const updateData = { ...req.body, updated_at: Date.now() };
        const fittingDashSize = await fittingDashSizeService.updateFittingDashSize(req.params.id, updateData);
        if (!fittingDashSize) {
            return res.status(404).json({ success: false, message: 'Fitting dash size not found' });
        }
        res.json({ success: true, fittingDashSize, message: 'Fitting dash size updated successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Delete a FittingDashSize by ID
const deleteFittingDashSize = async (req, res) => {
    try {
        const fittingDashSize = await fittingDashSizeService.deleteFittingDashSize(req.params.id);
        if (!fittingDashSize) {
            return res.status(404).json({ success: false, message: 'Fitting dash size not found' });
        }
        res.json({ success: true, message: 'Fitting dash size deleted successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Update FittingDashSize Status
const updateFittingDashSizeStatus = async (req, res) => {
    try {
        const fittingDashSizeId = req.params.id;
        const status = req.body.status; // Expecting { "status": true } or { "status": false }
        const updatedFittingDashSize = await fittingDashSizeService.updateFittingDashSizeStatus(fittingDashSizeId, status);

        if (!updatedFittingDashSize) {
            return res.status(404).json({ success: false, message: 'Fitting dash size not found' });
        }

        res.json({
            success: true,
            fittingDashSize: updatedFittingDashSize,
            message: 'Fitting dash size status updated successfully!'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

module.exports = {
    createFittingDashSize,
    getFittingDashSizes,
    getFittingDashSizeById,
    updateFittingDashSize,
    deleteFittingDashSize,
    updateFittingDashSizeStatus,
    getAllFittingDashSizes
};
