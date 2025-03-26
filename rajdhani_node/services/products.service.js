const { Products, ProductCodeCounter } = require('../models'); // Assuming the Products model is located here

const generateCodes = (formData, options) => {
  console.log('formData is herer0-=-=-=-=-=-=-', formData);
  console.log('options', options);
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

//create Spring
// Function to handle Spring creation
const springCreation = async (data, files) => {
  try {
    // Fetch last assigned product code for Spring
    let productCounter = await ProductCodeCounter.findOne({ category: "Spring" });
    if (!productCounter) {
      throw new Error(`Product series not found for category: Spring`);
    }

    let newCode = productCounter.last_assigned_product_code + 1;

    // Update last_assigned_product_code in productCounter table
    await ProductCodeCounter.updateOne(
      { category: "Spring" },
      { last_assigned_product_code: newCode, updated_at: Date.now() }
    );

    console.log("Generated Product Code for Spring:", newCode);

    const springData = {
      ...data,
      product_code: newCode,
      image: files?.image ? files.image[0]?.originalname : "rajdhani_product.jpg",
      gallery: files?.gallery ? files.gallery.map((file) => file.originalname) : [],
    };

    console.log("Processed Spring product data:", springData);

    const springProduct = await Products.create(springData);
    return springProduct;
  } catch (error) {
    console.error("Error in Spring Creation:", error);
    throw error;
  }
};

//Oring-creation
const oringCreation = async (data, files) => {
  try {
    // Fetch last assigned product code for Spring
    let productCounter = await ProductCodeCounter.findOne({ category: "O-ring" });
    if (!productCounter) {
      throw new Error(`Product series not found for category: O-ring`);
    }

    let newCode = productCounter.last_assigned_product_code + 1;

    // Update last_assigned_product_code in productCounter table
    await ProductCodeCounter.updateOne(
      { category: "O-ring" },
      { last_assigned_product_code: newCode, updated_at: Date.now() }
    );

    console.log("Generated Product Code for O-ring:", newCode);

    const oringData = {
      ...data,
      product_code: newCode,
      image: files?.image ? files.image[0]?.originalname : "rajdhani_product.jpg",
      gallery: files?.gallery ? files.gallery.map((file) => file.originalname) : [],
    };

    console.log("Processed Spring product data:", oringData);

    const oringProduct = await Products.create(oringData);
    return oringProduct;
  } catch (error) {
    console.error("Error in Spring Creation:", error);
    throw error;
  }
};

//dustCapCreation
const dustCapCreation = async (data, files) => {
  try {
    // Fetch last assigned product code for Spring
    let productCounter = await ProductCodeCounter.findOne({ category: "Dust Cap" });
    if (!productCounter) {
      throw new Error(`Product series not found for category: Dust Cap`);
    }

    let newCode = productCounter.last_assigned_product_code + 1;

    // Update last_assigned_product_code in productCounter table
    await ProductCodeCounter.updateOne(
      { category: "Dust Cap" },
      { last_assigned_product_code: newCode, updated_at: Date.now() }
    );

    console.log("Generated Product Code forDust Cap:", newCode);

    const dustCapData = {
      ...data,
      product_code: newCode,
      image: files?.image ? files.image[0]?.originalname : "rajdhani_product.jpg",
      gallery: files?.gallery ? files.gallery.map((file) => file.originalname) : [],
    };

    console.log("Processed Spring product data:", dustCapData);

    const dustCapProduct = await Products.create(dustCapData);
    return dustCapProduct;
  } catch (error) {
    console.error("Error in Spring Creation:", error);
    throw error;
  }
};

//sleeveCreation
const sleeveCreation = async (data, files) => {
  try {
    // Fetch last assigned product code for Spring
    let productCounter = await ProductCodeCounter.findOne({ category: "Sleeve" });
    if (!productCounter) {
      throw new Error(`Product series not found for category: Dust Cap`);
    }

    let newCode = productCounter.last_assigned_product_code + 1;

    // Update last_assigned_product_code in productCounter table
    await ProductCodeCounter.updateOne(
      { category: "Sleeve" },
      { last_assigned_product_code: newCode, updated_at: Date.now() }
    );

    console.log("Generated Product Code for Sleeve:", newCode);

    const SleeveData = {
      ...data,
      product_code: newCode,
      image: files?.image ? files.image[0]?.originalname : "rajdhani_product.jpg",
      gallery: files?.gallery ? files.gallery.map((file) => file.originalname) : [],
    };

    console.log("Processed sleeve product data:", SleeveData);

    const sleeveProduct = await Products.create(SleeveData);
    return sleeveProduct;
  } catch (error) {
    console.error("Error in sleeve Creation:", error);
    throw error;
  }
};

//hosePipeCreation
const hosePipeCreation = async (data, files) => {
  try {
    // Fetch last assigned product code for Spring
    let productCounter = await ProductCodeCounter.findOne({ category: "Hose Pipe" });
    if (!productCounter) {
      throw new Error(`Product series not found for category: Hose Pipe`);
    }

    let newCode = productCounter.last_assigned_product_code + 1;

    // Update last_assigned_product_code in productCounter table
    await ProductCodeCounter.updateOne(
      { category: "Sleeve" },
      { last_assigned_product_code: newCode, updated_at: Date.now() }
    );

    console.log("Generated Product Code for Hose Pipe:", newCode);

    const hosePipeData = {
      ...data,
      product_code: newCode,
      image: files?.image ? files.image[0]?.originalname : "rajdhani_product.jpg",
      gallery: files?.gallery ? files.gallery.map((file) => file.originalname) : [],
    };

    console.log("Processed sleeve product data:", hosePipeData);

    const hosePipe = await Products.create(hosePipeData);
    return hosePipe;
  } catch (error) {
    console.error("Error in Hose Pipe Creation:", error);
    throw error;
  }
};

// Create a new Product - Service
const createProduct = async (data, files) => {

  console.log("data is here in servide file ", data);

  try {

    //Part creation
    if (data?.part == "Nut" || data?.part == "Nipple" || data?.part == "Cap") {

      // Determine the category series code based on part
      let category = "";
      if (data?.part?.includes("Nut")) {
        category = "Nut";
      } else if (data?.part?.includes("Nipple")) {
        category = "Nipple";
      } else if (data?.part?.includes("Cap")) {
        category = "Cap";
      }

      // Fetch last assigned product code from productCounter
      let productCounter = await ProductCodeCounter.findOne({ category });
      if (!productCounter) {
        throw new Error(`Product series not found for category: ${category}`);
      }

      let newCode = productCounter.last_assigned_product_code + 1;

      // Update last_assigned_product_code in productCounter table
      await ProductCodeCounter.updateOne(
        { category },
        { last_assigned_product_code: newCode, updated_at: Date.now() }
      );

      console.log("Generated Product Code:", newCode);

      const partData = {
        ...data,
        product_code: newCode,
        image: files && files.image ? files.image[0]?.originalname : 'rajdhani_product.jpg',
        gallery: files && files.gallery ? files.gallery.map(file => file.originalname) : [], // Process gallery images
      };

      console.log('Processed product data:', partData); // Log the processed data before saving

      const part = await Products.create(partData);
      return part;
    }

    // Spring creation logic
    if (data?.product_type == "Spring") {
      return await springCreation(data, files);
    }

    // Spring creation logic
    if (data?.product_type == "O-ring") {
      return await oringCreation(data, files);
    }

    // Dust Cap creation logic
    if (data?.product_type == "Dust Cap") {
      return await dustCapCreation(data, files);
    }

    //SLEEVE Sleeve
    if (data?.product_type == "Sleeve") {
      return await sleeveCreation(data, files);
    }

     //Hose Pipe
     if (data?.product_type == "Hose Pipe") {
      return await hosePipeCreation(data, files);
    }




    // Parse the `parts` field if it's sent as a string
    let parsedParts = [];
    if (data?.parts) {
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



    // Determine the category series code based on wire_type
    let category = "";
    if (data?.wire_type?.includes("Braided")) {
      category = "Braided";
    } else if (data?.wire_type?.includes("Spiral")) {
      category = "Spiral";
    } else if (data?.wire_type?.includes("TEFLON")) {
      category = "Teflon";
    }

    console.log(data?.wire_type, " category is here-=-=-==-=-=")

    // Fetch last assigned product code from productCounter
    let productCounter = await ProductCodeCounter.findOne({ category });
    if (!productCounter) {
      throw new Error(`Product series not found for category: ${category}`);
    }

    let newCode = productCounter.last_assigned_product_code + 1;

    // Update last_assigned_product_code in productCounter table
    await ProductCodeCounter.updateOne(
      { category },
      { last_assigned_product_code: newCode, updated_at: Date.now() }
    );

    console.log("Generated Product Code:", newCode);


    const productData = {
      ...data,
      product_code: newCode,
      image: files && files.image ? files.image[0]?.originalname : 'rajdhani_product.jpg',
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

const searchProducts = async (query) => {
  try {
    // Case-insensitive regex search for partial matches in desc_Code or product_code
    const regexQuerys = { $regex: query, $options: "i" };

    // Convert user input to uppercase and remove spaces/dashes
    const normalizedQuery = query.toUpperCase().replace(/[\s-]+/g, "");

    // Create a regex pattern that allows optional dashes

    const regexPattern = normalizedQuery
      .split(/(\d+)/) // Splits letters and numbers separately
      .filter(Boolean) // Removes empty strings
      .join("[-]*"); // Adds optional dashes between groups

    const regexQuery = new RegExp(regexPattern, "i");



    const products = await Products.find({
      $or: [
        { desc_Code: regexQuerys },
        { product_code: regexQuerys },
        { fitting_Code: { $regex: regexQuery } }
      ],
    })
      .limit(10) // Return top 6 matched products
      .sort({ product_code: 1 }); // Sort based on product_code

    return products;
  } catch (error) {
    console.error("Error searching products:", error);
    throw error;
  }
};


//simi brands
const findSimilarProducts = async (fittingCode) => {
  console.log("fittingCode", fittingCode);
  try {
    if (!fittingCode) {
      throw new Error("Fitting code is required");
    }

    // Extract everything after the first character (brand identifier)
    const configWithoutBrand = fittingCode.slice(1);

    // Create a regex pattern that allows any first letter (brand)
    const regexPattern = new RegExp(`^.${configWithoutBrand}$`, "i");

    console.log("fittingCode regexPattern", regexPattern);

    // Query the database for products with a matching configuration
    const products = await Products.find({ fitting_Code: { $regex: regexPattern } });

    console.log("Search result is --> fittingCode products", products);
    return products;
  } catch (error) {
    console.error("Error finding similar products:", error);
    throw error;
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

    console.log("sortsortsortsortsort", sort)
    if (sort) {
      const [field, order] = sort.split(':');
      sortOptions[field] = (order === 'dsc') ? -1 : 1; // -1 for descending, 1 for ascending
    } else {
      sortOptions = { created_at: -1 };
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
    const product = await Products.findById(id);
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
  getAllProducts,
  searchProducts,
  findSimilarProducts
};
