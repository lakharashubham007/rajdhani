const { productService } = require("../services");

// Create a new Product
const createProduct = async (req, res) => {
    try {
        const { name, description, category_id, subcategory_id, brand_id, part_id, price, tags } = req.body;
        const image = req.files?.image[0]?.originalname;
        const gallery = req.files?.gallery?.map(file => file.originalname);

        const product = await productService.createProduct({ name, description, image, gallery, category_id, subcategory_id, brand_id, part_id, price, tags });
        res.json({ success: true, product, message: 'Product added successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Get all Products
const getProducts = async (req, res) => {
    try {
        const products = await productService.getProducts();
        res.json({ success: true, products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Get a single Product by ID
const getProductById = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.json({ success: true, product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Update a Product by ID
const updateProduct = async (req, res) => {
    try {
        const { name, description, category_id, subcategory_id, brand_id, part_id, price, tags } = req.body;
        const image = req.files?.image[0]?.originalname;
        const gallery = req.files?.gallery?.map(file => file.originalname);

        const product = await productService.updateProduct(req.params.id, { name, description, image, gallery, category_id, subcategory_id, brand_id, part_id, price, tags });
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.json({ success: true, product, message: 'Product updated successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Delete a Product by ID
const deleteProduct = async (req, res) => {
    try {
        const product = await productService.deleteProduct(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.json({ success: true, message: 'Product deleted successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
};
