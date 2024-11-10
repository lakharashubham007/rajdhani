const { Products } = require('../models');

// Create a new Product
const createProduct = async (data) => {
    try {
        const newProduct = await Products.create({
            name: data.name,
            description: data.description,
            image: data.image,
            gallery: data.gallery,
            category_id: data.category_id,
            subcategory_id: data.subcategory_id,
            brand_id: data.brand_id,
            part_id: data.part_id,
            price: data.price,
            tags: data.tags,
            status: true,
        });
        return newProduct;
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
};

// Get all Products
const getProducts = async () => {
    try {
        const products = await Products.find({})
            .populate('category_id', 'name')
            .populate('subcategory_id', 'name')
            .populate('brand_id', 'name')
            .populate('part_id', 'name');
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

// Get a single Product by ID
const getProductById = async (productId) => {
    try {
        const product = await Products.findById(productId)
            .populate('category_id', 'name')
            .populate('subcategory_id', 'name')
            .populate('brand_id', 'name')
            .populate('part_id', 'name');
        return product;
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        throw error;
    }
};

// Update a Product by ID
const updateProduct = async (productId, data) => {
    try {
        const updatedProduct = await Products.findByIdAndUpdate(
            productId,
            {
                name: data.name,
                description: data.description,
                image: data.image,
                gallery: data.gallery,
                category_id: data.category_id,
                subcategory_id: data.subcategory_id,
                brand_id: data.brand_id,
                part_id: data.part_id,
                price: data.price,
                tags: data.tags,
                updated_at: Date.now(),
            },
            { new: true } // Return the updated document
        );
        return updatedProduct;
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};

// Delete a Product by ID
const deleteProduct = async (productId) => {
    try {
        const deletedProduct = await Products.findByIdAndDelete(productId);
        return deletedProduct;
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
