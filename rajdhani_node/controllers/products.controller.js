const { productService } = require("../services");

// Create a new Product - Controller
const createProduct = async (req, res) => {
    try {
        const productData = req.body;
        
        // Pass the files for image and gallery to the service
        const product = await productService.createProduct(productData, req.files);
        
        res.json({ success: true, product, message: 'Product created successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Get all Products with pagination, sorting, and search
const getProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const sort = req.query.sort || 'name';
        const search = req.query.search || '';
        const products = await productService.getProducts(page, limit, sort, search);
        res.json({ success: true, ...products });
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
        const fieldsToUpdate = [
            'name', 'description', 'price', 'category_id', 'subcategory_id', 
            'brand_id', 'part_id', 'tags', 'status'
        ];
        const updateData = {};

        // Add fields from request body to updateData
        fieldsToUpdate.forEach((field) => {
            if (req.body[field] !== undefined) {
                updateData[field] = req.body[field];
            }
        });

        // Handle single image update
        if (req.files && req.files.image && req.files.image[0]) {
            updateData.image = req.files.image[0].originalname;
        }

        // Handle gallery images update
        if (req.files && req.files.gallery && req.files.gallery.length) {
            updateData.gallery = req.files.gallery.map(file => file.originalname);
        }

        updateData.updated_at = Date.now();

        const product = await productService.updateProduct(req.params.id, updateData);

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

// Update Product Status
const updateProductStatus = async (req, res) => {
    try {
        const productId = req.params.id;
        const status = req.body.status;
        const updatedProduct = await productService.updateProductStatus(productId, status);

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.json({
            success: true,
            product: updatedProduct,
            message: 'Product status updated successfully!'
        });
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
    deleteProduct,
    updateProductStatus
};
