const { Products } = require('../models'); // Assuming the Products model is located here

const generateCodes = (formData, options) => {
  console.log('formData is herer0-=-=-=-=-=-=-',formData); 
  console.log('options',options); 
  const {
    selectedWireTypeOption,
    selectedFittingThreadOption,
    selectedHoseDashSizeOption,
    selectedFittingDashSizeOption,
    selectedFittingTypeOption,
    selectedStraightBendAngleOption,
    selectedSkiveTypeOption,
    selectedFittingPieceOption,
  } = options;

  const desc_Code = `${selectedWireTypeOption?.dsc_code ? selectedWireTypeOption?.dsc_code + '-' : ''}${selectedFittingThreadOption?.dsc_code || ''} ${selectedHoseDashSizeOption?.dsc_code ? selectedHoseDashSizeOption?.dsc_code + 'X' : ''}${selectedFittingDashSizeOption?.dsc_code || ''} ${(selectedFittingTypeOption?.dsc_code || '').toUpperCase()} ${(selectedStraightBendAngleOption?.dsc_code || '').toUpperCase()} ${(selectedSkiveTypeOption?.dsc_code || '').toUpperCase()}`.trim();

  const fitting_Code = `${formData?.design || ''}${selectedWireTypeOption?.code || ''}${selectedFittingPieceOption?.code ? selectedFittingPieceOption?.code + '-' : ''}${selectedSkiveTypeOption?.code ? selectedSkiveTypeOption?.code + '-' : ''}${selectedHoseDashSizeOption?.code || ''}${selectedFittingDashSizeOption?.code ? selectedFittingDashSizeOption?.code + '-' : ''}${selectedFittingThreadOption?.code ? selectedFittingThreadOption?.code + '-' : ''}${selectedFittingTypeOption?.code || ''}${selectedStraightBendAngleOption?.code || ''}`;

  return { desc_Code, fitting_Code };
};

// Create a new Product - Service
const createProduct = async (data, files) => {

  try {
  // Generate codes based on the data and options
    //  const { desc_Code, fitting_Code } = generateCodes(data);
    // console.log('desc_Code, fitting_Code files are here:', desc_Code, fitting_Code); 

     // Parse the `parts` field if it's sent as a string
     let parsedParts = [];
     if (data.parts) {
       if (typeof data.parts === 'string') {
         try {
           parsedParts = JSON.parse(data.parts.replace(/'/g, '"'));
         } catch (error) {
           console.error('Error parsing parts field:', error);
           throw new Error('Invalid parts format. Please provide a valid JSON array.');
         }
       } else if (Array.isArray(data.parts)) {
         parsedParts = data.parts;
       } else {
         console.warn('Unexpected format for parts field:', data.parts);
       }
     }
 

    const productData = {
      ...data,
      image: files && files.image ? files.image[0]?.originalname : 'default-product-image.png',
      gallery: files && files.gallery ? files.gallery.map(file => file.originalname) : [], // Process gallery images
    };

    console.log('Processed product data:', productData); // Log the processed data before saving

   

    const newProduct = await Products.create(productData);
    return newProduct;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};


// Service method to get all products
const getAllProducts = async () => {
  try {
      const products = await Products.find({});
      return products; // Return all products
  } catch (error) {
      console.error('Error fetching all products:', error);
      throw error; // Throw error to be caught by the controller
  }
};


// Get all Products with pagination, sorting, and search
const getProducts = async (page, limit, sort, search) => {
    try {
      const skip = (page - 1) * limit;
  
      // Build a dynamic filter for searching
      const filter = search ? { 
        $or: [
          { fitting_thread: { $regex: search, $options: 'i' } },
          { desc_Code: { $regex: search, $options: 'i' } }
        ] 
      } : {};
  
      // Parse the sort parameter
      let sortOptions = {};
      if (sort) {
        const [field, order] = sort.split(':');
        sortOptions[field] = (order === 'dsc') ? -1 : 1; // -1 for descending, 1 for ascending
      } else {
        sortOptions = { name: 1 }; // Default sort by name in ascending order if sort is not provided
      }
  
      // Find products with applied filters, sorting, and pagination
      const productList = await Products.find(filter)
        //  .populate('category_id')
        //  .populate('subcategory_id')
        //  .populate('subsubcategory_id')
        //  .populate('brand')
        //  .populate('variant')
        //  .populate('material')
        //  .populate('fittingSize')
        //  .populate('thread_type')
        //  .populate('parts') 
        .sort(sortOptions)
        .skip(skip)
        .limit(limit);
  
      // Get the total count of documents for pagination info
      const totalProducts = await Products.countDocuments(filter);
  
      return {
        products: productList,
        totalProducts,
        totalPages: Math.ceil(totalProducts / limit),
        currentPage: page,
        rowsPerPage: limit
      };
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  };

// Get a Product by ID
const getProductById = async (id) => {
  try {
    const product = await Products.findById(id)
    .populate('category_id')
    .populate('subcategory_id')
    .populate('subsubcategory_id')
    .populate('brand')
    .populate('variant')
    .populate('material')
    .populate('fittingSize')
    .populate('thread_type')
    .populate('parts') ;
    return product;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw error;
  }
};

// Update a Product by ID
const updateProduct = async (id, updateData) => {
    try {
        const updatedProduct = await Products.findByIdAndUpdate(id, updateData, { new: true });
        return updatedProduct;
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};

// Update the status of a Product by ID
const updateProductStatus = async (id, status) => {
  try {
    const updatedProduct = await Products.findByIdAndUpdate(id, { status, updated_at: Date.now() }, { new: true });
    return updatedProduct;
  } catch (error) {
    console.error('Error updating product status:', error);
    throw error;
  }
};

// Delete a Product by ID
const deleteProduct = async (id) => {
  try {
    const product = await Products.findByIdAndDelete(id);
    return product;
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
  updateProductStatus,
  deleteProduct,
  getAllProducts
};
