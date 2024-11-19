const { productService } = require("../services");

// Create a new Product - Controller
const createProduct = async (req, res) => {
    try {
        const productData = req.body;

        console.log('Received files:', req.files);  //

        // Pass the files for image and gallery to the service
        const product = await productService.createProduct(productData, req.files);

        res.json({ success: true, product, message: 'Product created successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Controller to get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.json({ success: true, products });
    } catch (error) {
        console.error('Error fetching products:', error);
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
// const updateProduct = async (req, res) => {
//     try {
//         const fieldsToUpdate = [
//             'name','description','price','category_id','subcategory_id','subsubcategory_id','brand',
//             'variant','material','fittingSize','thread_type','parts','pressure_rating',
//             'temperature_range','connection_type','product_Type','product_id',
//         ];
//         const updateData = {};

//         // Add fields from request body to updateData
//         fieldsToUpdate.forEach((field) => {
//             if (req.body[field] !== undefined) {
//                 updateData[field] = req.body[field];
//             }
//         });

//         // Handle single image update
//         if (req.files && req.files.image && req.files.image[0]) {
//             updateData.image = req.files.image[0].originalname;
//         }

//         // Handle gallery images update
//         if (req.files && req.files.gallery && req.files.gallery.length) {
//             updateData.gallery = req.files.gallery.map(file => file.originalname);
//         }

//         updateData.updated_at = Date.now();

//         const product = await productService.updateProduct(req.params.id, updateData);

//         if (!product) {
//             return res.status(404).json({ success: false, message: 'Product not found' });
//         }

//         res.json({ success: true, product, message: 'Product updated successfully!' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: 'Internal Server Error' });
//     }
// };


// Delete a Product by ID

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        // Fetch the existing product from the database
        const existingProduct = await productService.getProductById(productId);
        
        if (!existingProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        // Initialize updateData object to track changes
        const updateData = {};

        // Update fields directly from the request body
        const fieldsToUpdate = [
            'name', 'description', 'price', 'category_id', 'subcategory_id',
            'subsubcategory_id', 'brand', 'variant', 'material', 'fittingSize',
            'thread_type', 'pressure_rating', 'temperature_range', 'connection_type',
            'product_Type', 'product_id'
        ];

        fieldsToUpdate.forEach(field => {
            if (req.body[field] !== undefined) {
                updateData[field] = req.body[field];
            }
        });

        // Handle single image update
        if (req.files && req.files.image && req.files.image[0]) {
            console.log("Updating main image: ", req.files.image[0].originalname);
            updateData.image = req.files.image[0].originalname;
        }

       
        // Handle gallery images update
        if (req.files && req.files.gallery && req.files.gallery.length > 0) {
            const newGalleryImages = req.files.gallery.map(file => file.filename);
            updateData.gallery = newGalleryImages;
        } else {
            updateData.gallery = existingProduct.gallery;
        }

        // Handle parts array update
        if (req.body.parts) {
            const newParts = req.body.parts; // The new parts array from the request
            // Update only the `parts` field in the product document
            updateData.parts = JSON.parse(newParts);;
            console.log("Updated parts:", newParts);
        } else {
            // If no parts provided in the request, retain the existing parts
            updateData.parts = existingProduct.parts;
        }

        // Save updated data back to the database
        const updatedProduct = await productService.updateProduct(productId, updateData);

        res.json({ success: true, product: updatedProduct, message: 'Product updated successfully!' });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};


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
    updateProductStatus,
    getAllProducts
};
