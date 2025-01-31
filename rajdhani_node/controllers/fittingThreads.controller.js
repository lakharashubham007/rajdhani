const { fittingThreadService } = require("../services");

// Create a new FittingThread
const createFittingThread = async (req, res) => {
    try {
        const fittingThread = await fittingThreadService.createFittingThread(req.body);
        res.json({ success: true, fittingThread, message: 'Fitting thread added successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Get all FittingThreads (for simple dropdown use)
const getAllFittingThreads = async (req, res) => {
    try {
        const fittingThreads = await fittingThreadService.getAllFittingThreads();
        res.json({ success: true, fittingThreads });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Get paginated, sorted, and searchable FittingThreads
const getFittingThreads = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const sort = req.query.sort || 'name';
        const search = req.query.search || '';

        const fittingThreads = await fittingThreadService.getFittingThreads(page, limit, sort, search);
        res.json({ success: true, fittingThreads });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Get a single FittingThread by ID
const getFittingThreadById = async (req, res) => {
    try {
        const fittingThread = await fittingThreadService.getFittingThreadById(req.params.id);
        if (!fittingThread) {
            return res.status(404).json({ success: false, message: 'Fitting thread not found' });
        }
        res.json({ success: true, fittingThread });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Update a FittingThread
const updateFittingThread = async (req, res) => {
    try {
        const updateData = {};
        if (req.body.name) updateData.name = req.body.name;
        if (req.body.code) updateData.code = req.body.code;
        if (req.body.dsc_code) updateData.dsc_code = req.body.dsc_code;
        if (req.body.dsc) updateData.dsc = req.body.dsc;

        updateData.updated_at = Date.now();

        const fittingThread = await fittingThreadService.updateFittingThread(req.params.id, updateData);
        if (!fittingThread) {
            return res.status(404).json({ success: false, message: 'Fitting thread not found' });
        }
        res.json({ success: true, fittingThread, message: 'Fitting thread updated successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Delete a FittingThread by ID
const deleteFittingThread = async (req, res) => {
    try {
        const fittingThread = await fittingThreadService.deleteFittingThread(req.params.id);
        if (!fittingThread) {
            return res.status(404).json({ success: false, message: 'Fitting thread not found' });
        }
        res.json({ success: true, message: 'Fitting thread deleted successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Update FittingThread Status
const updateFittingThreadStatus = async (req, res) => {
    try {
        const fittingThreadId = req.params.id;
        const status = req.body.status; // Expecting { "status": true } or { "status": false }
        const updatedFittingThread = await fittingThreadService.updateFittingThreadStatus(fittingThreadId, status);

        if (!updatedFittingThread) {
            return res.status(404).json({ success: false, message: 'Fitting thread not found' });
        }

        res.json({
            success: true,
            fittingThread: updatedFittingThread,
            message: 'Fitting thread status updated successfully!'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

module.exports = {
    createFittingThread,
    getFittingThreads,
    getFittingThreadById,
    updateFittingThread,
    deleteFittingThread,
    updateFittingThreadStatus,
    getAllFittingThreads
};
