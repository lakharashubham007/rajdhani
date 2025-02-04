const { brandLayLineService } = require("../services");

// Create a new BrandLayLine
const createBrandLayLine = async (req, res) => {
    try {
        const brandLayLine = await brandLayLineService.createBrandLayLine(req.body);
        res.json({ success: true, brandLayLine, message: 'Brand Lay Line added successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Get all BrandLayLines
const getAllBrandLayLines = async (req, res) => {
    try {
        const brandLayLines = await brandLayLineService.getAllBrandLayLines();
        res.json({ success: true, brandLayLines });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Get paginated and filtered BrandLayLines
const getBrandLayLines = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const sort = req.query.sort || 'name';
        const search = req.query.search || '';

        const brandLayLines = await brandLayLineService.getBrandLayLines(page, limit, sort, search);
        res.json({ success: true, brandLayLines });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Get a single BrandLayLine by ID
const getBrandLayLineById = async (req, res) => {
    try {
        const brandLayLine = await brandLayLineService.getBrandLayLineById(req.params.id);
        if (!brandLayLine) {
            return res.status(404).json({ success: false, message: 'Brand Lay Line not found' });
        }
        res.json({ success: true, brandLayLine });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Update a BrandLayLine
const updateBrandLayLine = async (req, res) => {
    try {
        const updateData = {};
        if (req.body.name) updateData.name = req.body.name;

        updateData.updated_at = Date.now();

        const brandLayLine = await brandLayLineService.updateBrandLayLine(req.params.id, updateData);
        if (!brandLayLine) {
            return res.status(404).json({ success: false, message: 'Brand Lay Line not found' });
        }
        res.json({ success: true, brandLayLine, message: 'Brand Lay Line updated successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Delete a BrandLayLine by ID
const deleteBrandLayLine = async (req, res) => {
    try {
        const brandLayLine = await brandLayLineService.deleteBrandLayLine(req.params.id);
        if (!brandLayLine) {
            return res.status(404).json({ success: false, message: 'Brand Lay Line not found' });
        }
        res.json({ success: true, message: 'Brand Lay Line deleted successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Update BrandLayLine Status
const updateBrandLayLineStatus = async (req, res) => {
    try {
        const brandLayLineId = req.params.id;
        const status = req.body.status; // Expecting { "status": true } or { "status": false }
        const updatedBrandLayLine = await brandLayLineService.updateBrandLayLineStatus(brandLayLineId, status);

        if (!updatedBrandLayLine) {
            return res.status(404).json({ success: false, message: 'Brand Lay Line not found' });
        }

        res.json({
            success: true,
            brandLayLine: updatedBrandLayLine,
            message: 'Brand Lay Line status updated successfully!'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

module.exports = {
    createBrandLayLine,
    getBrandLayLines,
    getBrandLayLineById,
    updateBrandLayLine,
    deleteBrandLayLine,
    updateBrandLayLineStatus,
    getAllBrandLayLines
};
