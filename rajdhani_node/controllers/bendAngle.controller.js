const { bendAngleService } = require("../services");

// Create a new BendAngle
const createBendAngle = async (req, res) => {
    try {
        const bendAngle = await bendAngleService.createBendAngle(req.body);
        res.json({ success: true, bendAngle, message: 'BendAngle added successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Get all BendAngles
const getAllBendAngles = async (req, res) => {
    try {
        const bendAngles = await bendAngleService.getAllBendAngles();
        res.json({ success: true, bendAngles });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Get paginated and filtered BendAngles
const getBendAngles = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const sort = req.query.sort || 'name';
        const search = req.query.search || '';

        const bendAngles = await bendAngleService.getBendAngles(page, limit, sort, search);
        res.json({ success: true, bendAngles });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Get a single BendAngle by ID
const getBendAngleById = async (req, res) => {
    try {
        const bendAngle = await bendAngleService.getBendAngleById(req.params.id);
        if (!bendAngle) {
            return res.status(404).json({ success: false, message: 'BendAngle not found' });
        }
        res.json({ success: true, bendAngle });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Update a BendAngle
const updateBendAngle = async (req, res) => {
    try {
        const updateData = {};
        if (req.body.name) updateData.name = req.body.name;
        if (req.body.code) updateData.code = req.body.code;
        if (req.body.angle) updateData.angle = req.body.angle;
        if (req.body.dsc_code) updateData.dsc_code = req.body.dsc_code;

        updateData.updated_at = Date.now();

        const bendAngle = await bendAngleService.updateBendAngle(req.params.id, updateData);
        if (!bendAngle) {
            return res.status(404).json({ success: false, message: 'BendAngle not found' });
        }
        res.json({ success: true, bendAngle, message: 'BendAngle updated successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Delete a BendAngle by ID
const deleteBendAngle = async (req, res) => {
    try {
        const bendAngle = await bendAngleService.deleteBendAngle(req.params.id);
        if (!bendAngle) {
            return res.status(404).json({ success: false, message: 'BendAngle not found' });
        }
        res.json({ success: true, message: 'BendAngle deleted successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Update BendAngle Status
const updateBendAngleStatus = async (req, res) => {
    try {
        const bendAngleId = req.params.id;
        const status = req.body.status; // Expecting { "status": true } or { "status": false }
        const updatedBendAngle = await bendAngleService.updateBendAngleStatus(bendAngleId, status);

        if (!updatedBendAngle) {
            return res.status(404).json({ success: false, message: 'BendAngle not found' });
        }

        res.json({
            success: true,
            bendAngle: updatedBendAngle,
            message: 'BendAngle status updated successfully!'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

module.exports = {
    createBendAngle,
    getBendAngles,
    getBendAngleById,
    updateBendAngle,
    deleteBendAngle,
    updateBendAngleStatus,
    getAllBendAngles
};
