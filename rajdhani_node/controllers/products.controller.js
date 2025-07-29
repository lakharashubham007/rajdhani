const { productService } = require("../services");

// Create a new Product - Controller
const createProduct = async (req, res) => {

    try {
        const productData = req.body;
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

// Generate QR code for a single product
const generateQrForProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const qrData = await productService.generateQrForProduct(id);
        res.json({ success: true, ...qrData });
    } catch (error) {
        console.error('Error generating QR code:', error);
        res.status(500).json({ success: false, message: 'QR generation failed' });
    }
};

// Controller to get all products
const searchProducts = async (req, res) => {
    try {
        const { query } = req.query; // Get search query from request

        if (!query) {
            return res.status(400).json({ success: false, message: "Query parameter is required" });
        }

        // Fetch matching products from the service
        const products = await productService.searchProducts(query);

        res.json({ success: true, products });
    } catch (error) {
        console.error("Error searching products:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Controller to get all products with different brands but the same configuration
const getSimilarProducts = async (req, res) => {
    try {
        const { fittingCode } = req.query; // Get fitting code from request

        if (!fittingCode) {
            return res.status(400).json({ success: false, message: "Fitting code is required" });
        }

        // Call service function to fetch similar products
        const products = await productService.findSimilarProducts(fittingCode);

        res.json({ success: true, products });
    } catch (error) {
        console.error("Error fetching similar products:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Controller to get all products with different brands but the same configuration
const getSimilarHoseAssemblyItem = async (req, res) => {
    try {
        const { product_code } = req.query; // Get fitting code from request

        if (!product_code) {
            return res.status(400).json({ success: false, message: "product_code  is required" });
        }

        // Call service function to fetch similar products
        const products = await productService.findSimilarHoseAssembly(product_code);

        res.json({ success: true, products });
    } catch (error) {
        console.error("Error fetching similar products:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Get all Products with pagination, sorting, and search
const getProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const sort = req?.query?.sort;
        const search = req.query.search || '';
        const prodctTypes = req?.query?.productTypes || '';
        const products = await productService.getProducts(page, limit, sort, search, prodctTypes);
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

// Get a single Product by ID
const getProductByQrScannerCode = async (req, res) => {
    try {
        const rawId = req.params.id;

        // Replace the first '-' with '/'
    const formattedId = rawId.replace('-', '/');
        const product = await productService.getProductByQRScannerCode(formattedId);
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

        console.log("existingProduct", existingProduct);
        if (!existingProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        // Initialize updateData object to track changes
        const updateData = {};



        // Update fields directly from the request body
        
        const fieldsToUpdate = [
            'product_type', 'product_code', 'uom', 'price', 'gst', 'design',
            'wire_type', 'with_cap', 'fitting_piece', 'skive_type', 'hose_dash_size',
            'fitting_dash_size', 'fitting_thread', 'fitting_type', 'straight_bend_angle',
            'drop_length', 'neck_length', 'desc_Code', 'fitting_Code', 'status',
            'image', 'gallery', 'note', 'location', 'additional', "ferrule","metric_type", "pipeOD","tube_fitting_category"
             ,"tube_fitting_thread","part_code","part_description","additional","hose_size","inner_diameter","spring_length",
             "spring_type","size","outer_diameter", "thickness","item_name","hose","hose_fitting_Code","fitting_a_description","fitting_b_description",
             "fitting_a_fitting_Code","fitting_b_fitting_Code", "guard","guard_type","assembly_length","cutting_length","fitting_length","oa","metric_type"
        ];

        console.log("fieldsToUpdate fieldsToUpdate fieldsToUpdate", fieldsToUpdate);

        fieldsToUpdate.forEach(field => {
            if (req.body[field] !== undefined) {
                updateData[field] = req.body[field];
            }
        });

        console.log("updateData updateDataupdateData updateData", updateData);

        console.log("req.files", req.files, req.files.gallery);

        // Handle single image update
        if (req.files && req.files.image && req.files.image[0]) {
            console.log("Updating main image: ", req.files.image[0].originalname);
            updateData.image = req.files.image[0].originalname;
        }

        // Handle gallery images update
        let finalGalleryImages = [];
// Handle existing gallery filenames coming from frontend
if (req.body.gallery) {
    try {
      let galleryFromClient = req.body.gallery;
  
      if (typeof galleryFromClient === "string") {
        // Check if it's a JSON array string (e.g., '["img1.jpg","img2.png"]')
        if (galleryFromClient.trim().startsWith("[")) {
          const parsed = JSON.parse(galleryFromClient);
          finalGalleryImages = Array.isArray(parsed) ? parsed : [parsed];
        } else if (galleryFromClient.includes(",")) {
          // Comma-separated string: "img1.jpg,img2.png"
          finalGalleryImages = galleryFromClient.split(',').map(img => img.trim());
        } else {
          // Single string image
          finalGalleryImages = [galleryFromClient.trim()];
        }
      } else if (Array.isArray(galleryFromClient)) {
        // Already an array (e.g., sent as form-data)
        finalGalleryImages = [...galleryFromClient];
      }
    } catch (err) {
      console.error('Error parsing gallery:', err);
    }
  }
  
 
        // Add newly uploaded gallery images to final list
        if (req.files && req.files.gallery && req.files.gallery.length > 0) {
            const newlyUploadedFiles = req.files.gallery.map(file => file.filename);
            finalGalleryImages = [...finalGalleryImages, ...newlyUploadedFiles];
        }

        // Set final list in updateData
        updateData.gallery = finalGalleryImages;


        // // Handle gallery images update
        // if (req.files && req.files.gallery && req.files.gallery.length > 0) {
        //     const newGalleryImages = req.files.gallery.map(file => file.filename);
        //     updateData.gallery = newGalleryImages;
        // } else {
        //     updateData.gallery = existingProduct.gallery;
        // }

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


//Filters
const getFilteredProducts = async (req, res) => {
  try {
    const result = await productService(req.query);

    if (!result || !result.products || result.products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found matching the filter criteria.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Filtered products fetched successfully!",
      data: result,
    });
  } catch (error) {
    console.error("Error in getFilteredProducts controller:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};





module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    updateProductStatus,
    getAllProducts,
    searchProducts,
    getSimilarProducts,
    getProductByQrScannerCode,
    generateQrForProduct,
    getSimilarHoseAssemblyItem,
    getFilteredProducts
};
