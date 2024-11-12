const { brandsService } = require("../services");

// Create a new Brand
const createBrand = async (req, res) => {
    try {
        const brand = await brandsService.createBrand(req.body, req.files?.image[0]?.originalname);
        res.json({ success: true, brand: brand, message: 'Brand added successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Get all Brands
// const getBrands = async (req, res) => {
//     try {
//         const brands = await brandsService.getBrands();
//         res.json({ success: true, brands: brands });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: 'Internal Server Error' });
//     }
// };

// Get all Brands
const getBrands = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Default to page 1
        const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page
        const sort = req.query.sort || 'name'; // Default sorting by name
        const search = req.query.search || ''; // Default empty search
        const brands = await brandsService.getBrands(page, limit, sort, search);
        res.json({ success: true, brands: brands });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};


// Get a single Brand by ID
const getBrandById = async (req, res) => {
    try {
        const brand = await brandsService.getBrandById(req.params.id);
        if (!brand) {
            return res.status(404).json({ success: false, message: 'Brand not found' });
        }
        res.json({ success: true, brand: brand });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Update a Brand by ID
const updateBrand = async (req, res) => {
    try {
        const brand = await brandsService.updateBrand(req.params.id, req.body, req.files?.image[0]?.originalname);
        if (!brand) {
            return res.status(404).json({ success: false, message: 'Brand not found' });
        }
        res.json({ success: true, brand: brand, message: 'Brand updated successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Delete a Brand by ID
const deleteBrand = async (req, res) => {
    try {
        const brand = await brandsService.deleteBrand(req.params.id);
        if (!brand) {
            return res.status(404).json({ success: false, message: 'Brand not found' });
        }
        res.json({ success: true, message: 'Brand deleted successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

const updateBrandStatus = async (req, res) => {
    try {
        const brandId = req.params.id;
        const status = req.body.status; // Expecting { "status": true } or { "status": false }
        const updatedBrand = await brandsService.updateBrandStatus(brandId, status);

        if (!updatedBrand) {
            return res.status(404).json({ success: false, message: 'Brand not found' });
        }

        res.json({
            success: true,
            brand: updatedBrand,
            message: 'Brand status updated successfully!'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

module.exports = {
    createBrand,
    getBrands,
    getBrandById,
    updateBrand,
    deleteBrand,
    updateBrandStatus
};
