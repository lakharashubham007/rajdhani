const { hoseTypeService } = require("../services");

// Create a new HoseType
const createHoseType = async (req, res) => {
    try {
        const hoseType = await hoseTypeService.createHoseType(req.body);
        res.json({ success: true, hoseType, message: "Hose Type added successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Get all HoseTypes
const getAllHoseTypes = async (req, res) => {
    try {
        const hoseTypes = await hoseTypeService.getAllHoseTypes();
        res.json({ success: true, hoseTypes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Get paginated and filtered HoseTypes
const getHoseTypes = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const sort = req.query.sort || "name";
        const search = req.query.search || "";

        const hoseTypes = await hoseTypeService.getHoseTypes(page, limit, sort, search);
        res.json({ success: true, hoseTypes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Get a single HoseType by ID
const getHoseTypeById = async (req, res) => {
    try {
        const hoseType = await hoseTypeService.getHoseTypeById(req.params.id);
        if (!hoseType) {
            return res.status(404).json({ success: false, message: "Hose Type not found" });
        }
        res.json({ success: true, hoseType });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Update a HoseType
const updateHoseType = async (req, res) => {
    try {
        const updateData = {};
        if (req.body.name) updateData.name = req.body.name;
        if (req.body.code) updateData.code = req.body.code;
        if (req.body.dsc_code) updateData.dsc_code = req.body.dsc_code;

        updateData.updated_at = Date.now();

        const hoseType = await hoseTypeService.updateHoseType(req.params.id, updateData);
        if (!hoseType) {
            return res.status(404).json({ success: false, message: "Hose Type not found" });
        }
        res.json({ success: true, hoseType, message: "Hose Type updated successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Delete a HoseType by ID
const deleteHoseType = async (req, res) => {
    try {
        const hoseType = await hoseTypeService.deleteHoseType(req.params.id);
        if (!hoseType) {
            return res.status(404).json({ success: false, message: "Hose Type not found" });
        }
        res.json({ success: true, message: "Hose Type deleted successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Update HoseType Status
const updateHoseTypeStatus = async (req, res) => {
    try {
        const hoseTypeId = req.params.id;
        const status = req.body.status; // Expecting { "status": true } or { "status": false }
        const updatedHoseType = await hoseTypeService.updateHoseTypeStatus(hoseTypeId, status);

        if (!updatedHoseType) {
            return res.status(404).json({ success: false, message: "Hose Type not found" });
        }

        res.json({
            success: true,
            hoseType: updatedHoseType,
            message: "Hose Type status updated successfully!",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

module.exports = {
    createHoseType,
    getHoseTypes,
    getHoseTypeById,
    updateHoseType,
    deleteHoseType,
    updateHoseTypeStatus,
    getAllHoseTypes,
};
