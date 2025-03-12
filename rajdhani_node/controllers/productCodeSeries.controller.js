const { productCodeSeriesService } = require("../services");

// Create a new Product Code Series
const createProductCodeSeries = async (req, res) => {
    try {
        const series = await productCodeSeriesService.createProductCodeSeries(req.body);
        res.json({ success: true, series, message: 'Product Code Series created successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Get all Product Code Series
const getAllProductCodeSeries = async (req, res) => {
    try {
        const seriesList = await productCodeSeriesService.getAllProductCodeSeries();
        res.json({ success: true, series: seriesList });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Get Product Code Series with pagination, sorting, and search
const getProductCodeSeries = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Default to page 1
        const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page
        const sort = req.query.sort || 'created_at'; // Default sorting by created_at
        const search = req.query.search || ''; // Default empty search
        
        const seriesList = await productCodeSeriesService.getProductCodeSeries(page, limit, sort, search);
        res.json({ success: true, series: seriesList });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Get a single Product Code Series by ID
const getProductCodeSeriesById = async (req, res) => {
    try {
        const series = await productCodeSeriesService.getProductCodeSeriesById(req.params.id);
        if (!series) {
            return res.status(404).json({ success: false, message: 'Product Code Series not found' });
        }
        res.json({ success: true, series });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Update a Product Code Series
const updateProductCodeSeries = async (req, res) => {
    try {
        const updateData = req.body;
        updateData.updated_at = Date.now();

        const updatedSeries = await productCodeSeriesService.updateProductCodeSeries(req.params.id, updateData);
        if (!updatedSeries) {
            return res.status(404).json({ success: false, message: 'Product Code Series not found' });
        }
        res.json({ success: true, series: updatedSeries, message: 'Product Code Series updated successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Delete a Product Code Series by ID
const deleteProductCodeSeries = async (req, res) => {
    try {
        const series = await productCodeSeriesService.deleteProductCodeSeries(req.params.id);
        if (!series) {
            return res.status(404).json({ success: false, message: 'Product Code Series not found' });
        }
        res.json({ success: true, message: 'Product Code Series deleted successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Get last product code series for a category
const getLastProductCodeSeries = async (req, res) => {
    try {
        const category = req.params.category;
        const lastCode = await productCodeSeriesService.getLastProductCodeSeries(category);

        res.json({ success: true, lastCode });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Increment product code series for a category
const incrementProductCodeSeries = async (req, res) => {
    try {
        const category = req.params.category;
        const newCode = await productCodeSeriesService.incrementProductCodeSeries(category);

        res.json({ success: true, newCode, message: 'Product Code Series incremented successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

module.exports = {
    createProductCodeSeries,
    getAllProductCodeSeries,
    getProductCodeSeries,
    getProductCodeSeriesById,
    updateProductCodeSeries,
    deleteProductCodeSeries,
    getLastProductCodeSeries,
    incrementProductCodeSeries
};
