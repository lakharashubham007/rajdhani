const { Products, ProductCodeCounter, Inventory } = require('../models'); // Assuming the Products model is located here
const QRCode = require('qrcode');
const BaseURL = "https://www.i2rtest.in";
const LocalURL = "http://localhost:3001";

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

    // Generate QR Code for the product
    const productUrl = `${BaseURL}/productqr/${newCode}`; // This can be a link to the product's page
    const qrCodeUrl = await QRCode.toDataURL(productUrl); // Generate the QR code as a base64 string

    // Add QR code to the product data
    springData.qr_code = qrCodeUrl;  // Save the QR code in the product data
    springData.qr_url = productUrl;

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

     // Generate QR Code for the product
     const productUrl = `${BaseURL}/productqr/${newCode}`; // This can be a link to the product's page
     const qrCodeUrl = await QRCode.toDataURL(productUrl); // Generate the QR code as a base64 string
 
     // Add QR code to the product data
     oringData.qr_code = qrCodeUrl;  // Save the QR code in the product data
     oringData.qr_url = productUrl;
 

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

     // Generate QR Code for the product
     const productUrl = `${BaseURL}/productqr/${newCode}`; // This can be a link to the product's page
     const qrCodeUrl = await QRCode.toDataURL(productUrl); // Generate the QR code as a base64 string
 
     // Add QR code to the product data
     dustCapData.qr_code = qrCodeUrl;  // Save the QR code in the product data
     dustCapData.qr_url = productUrl;

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

    // Generate QR Code for the product
    const productUrl = `${BaseURL}/productqr/${newCode}`; // This can be a link to the product's page
    const qrCodeUrl = await QRCode.toDataURL(productUrl); // Generate the QR code as a base64 string

    // Add QR code to the product data
    SleeveData.qr_code = qrCodeUrl;  // Save the QR code in the product data
    SleeveData.qr_url = productUrl;

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
      { category: "Hose Pipe" },
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
    // Generate QR Code for the product
    const productUrl = `${BaseURL}/productqr/${newCode}`; // This can be a link to the product's page
    const qrCodeUrl = await QRCode.toDataURL(productUrl); // Generate the QR code as a base64 string

    // Add QR code to the product data
    hosePipeData.qr_code = qrCodeUrl;  // Save the QR code in the product data
    hosePipeData.qr_url = productUrl;

    const hosePipe = await Products.create(hosePipeData);
    return hosePipe;
  } catch (error) {
    console.error("Error in Hose Pipe Creation:", error);
    throw error;
  }
};

//tubeFittingsCreation
const tubeFittingsCreation = async (data, files) => {
  try {
    // Fetch last assigned product code for Spring
    let productCounter = await ProductCodeCounter.findOne({ category: "Tube Fittings" });
    if (!productCounter) {
      throw new Error(`Product series not found for category: Tube Fittings`);
    }

    let newCode = productCounter.last_assigned_product_code + 1;

    // Update last_assigned_product_code in productCounter table
    await ProductCodeCounter.updateOne(
      { category: "Tube Fittings" },
      { last_assigned_product_code: newCode, updated_at: Date.now() }
    );

    console.log("Generated Product Code for Tube Fittings:", newCode);

    const tubeFittingsData = {
      ...data,
      product_code: newCode,
      image: files?.image ? files.image[0]?.originalname : "rajdhani_product.jpg",
      gallery: files?.gallery ? files.gallery.map((file) => file.originalname) : [],
    };

    console.log("Processed tubeFittingsData product data:", tubeFittingsData);
    // Generate QR Code for the product
    const productUrl = `${BaseURL}/productqr/${newCode}`; // This can be a link to the product's page
    const qrCodeUrl = await QRCode.toDataURL(productUrl); // Generate the QR code as a base64 string

    // Add QR code to the product data
    tubeFittingsData.qr_code = qrCodeUrl;  // Save the QR code in the product data
    tubeFittingsData.qr_url = productUrl;

    const tubeFittings = await Products.create(tubeFittingsData);
    return tubeFittings;
  } catch (error) {
    console.error("Error in Hose Pipe Creation:", error);
    throw error;
  }
};

//vinylCoverCreation
const vinylCoverCreation = async (data, files) => {
  try {
    // Fetch last assigned product code for Spring
    let productCounter = await ProductCodeCounter.findOne({ category: "Vinyl Cover" });
    if (!productCounter) {
      throw new Error(`Product series not found for category: Hose Pipe`);
    }

    let newCode = productCounter.last_assigned_product_code + 1;

    // Update last_assigned_product_code in productCounter table
    await ProductCodeCounter.updateOne(
      { category: "Vinyl Cover" },
      { last_assigned_product_code: newCode, updated_at: Date.now() }
    );

    console.log("Generated Product Code for Vinyl Cover:", newCode);

    const vinylCoverData = {
      ...data,
      product_code: newCode,
      image: files?.image ? files.image[0]?.originalname : "rajdhani_product.jpg",
      gallery: files?.gallery ? files.gallery.map((file) => file.originalname) : [],
    };

    console.log("Processed sleeve product data:",);

    // Generate QR Code for the product
    const productUrl = `${BaseURL}/productqr/${newCode}`; // This can be a link to the product's page
    const qrCodeUrl = await QRCode.toDataURL(productUrl); // Generate the QR code as a base64 string

    // Add QR code to the product data
    vinylCoverData.qr_code = qrCodeUrl;  // Save the QR code in the product data
    vinylCoverData.qr_url = productUrl;


    const vinylCover = await Products.create(vinylCoverData);
    return vinylCover;
  } catch (error) {
    console.error("Error in Hose Pipe Creation:", error);
    throw error;
  }
};


//packingCreation
const packingCreation = async (data, files) => {
  try {
    // Fetch last assigned product code for Spring
    let productCounter = await ProductCodeCounter.findOne({ category: "Packing" });
    if (!productCounter) {
      throw new Error(`Product series not found for category: Packing`);
    }

    let newCode = productCounter.last_assigned_product_code + 1;

    // Update last_assigned_product_code in productCounter table
    await ProductCodeCounter.updateOne(
      { category: "Packing" },
      { last_assigned_product_code: newCode, updated_at: Date.now() }
    );

    console.log("Generated Product Code for Packing:", newCode);

    const packingData = {
      ...data,
      product_code: newCode,
      image: files?.image ? files.image[0]?.originalname : "rajdhani_product.jpg",
      gallery: files?.gallery ? files.gallery.map((file) => file.originalname) : [],
    };

    console.log("Processed packingData product data:", packingData);

     // Generate QR Code for the product
     const productUrl = `${BaseURL}/productqr/${newCode}`; // This can be a link to the product's page
     const qrCodeUrl = await QRCode.toDataURL(productUrl); // Generate the QR code as a base64 string
 
     // Add QR code to the product data
     packingData.qr_code = qrCodeUrl;  // Save the QR code in the product data
     packingData.qr_url = productUrl;

    const packing = await Products.create(packingData);
    return packing;
  } catch (error) {
    console.error("Error in packing Creation:", error);
    throw error;
  }
};


//hoseAssembyCreation
const hoseAssembyCreation = async (data, files) => {
  try {
    // // Fetch last assigned product code for Spring
    // let productCounter = await ProductCodeCounter.findOne({ category: "Hose Assembly" });
    // if (!productCounter) {
    //   throw new Error(`Product series not found for category: Hose Assembly`);
    // }

    // let newCode = productCounter.last_assigned_product_code + 1;

    // // Update last_assigned_product_code in productCounter table
    // await ProductCodeCounter.updateOne(
    //   { category: "Hose Assembly" },
    //   { last_assigned_product_code: newCode, updated_at: Date.now() }
    // );

    // console.log("Generated Product Code for Packing:", newCode);

    const sanitizedPartNo = data?.part_no?.replace(/[^a-zA-Z0-9]/g, "-");


    const hoseAssemblyData = {
      ...data,
      product_code: data?.part_no,
      image: files?.image ? files.image[0]?.originalname : "rajdhani_product.jpg",
      gallery: files?.gallery ? files.gallery.map((file) => file.originalname) : [],
    };

    console.log("Processed packingData product data:", hoseAssemblyData);

    // Generate QR Code for the product
    const productUrl = `${BaseURL}/productqr/${sanitizedPartNo}`; // This can be a link to the product's page
    const qrCodeUrl = await QRCode.toDataURL(productUrl); // Generate the QR code as a base64 string

    // Add QR code to the product data
    hoseAssemblyData.qr_code = qrCodeUrl;  // Save the QR code in the product data
    hoseAssemblyData.qr_url = productUrl;



    const hoseAssembly = await Products.create(hoseAssemblyData);
    return hoseAssembly;
  } catch (error) {
    console.error("Error in hoseAssembly Creation:", error);
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

      // Generate QR Code for the product
      const productUrl = `${BaseURL}/productqr/${newCode}`; // This can be a link to the product's page
      const qrCodeUrl = await QRCode.toDataURL(productUrl); // Generate the QR code as a base64 string

      // Add QR code to the product data
      partData.qr_code = qrCodeUrl;  // Save the QR code in the product data
      partData.qr_url = productUrl;


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

    //Vinyl Cover
    if (data?.product_type == "Vinyl Cover") {
      return await vinylCoverCreation(data, files);
    }


    //Packing
    if (data?.product_type == "Packing") {
      return await packingCreation(data, files);
    }

    //Hose Assembly
    if (data?.product_type == "Hose Assembly") {
      return await hoseAssembyCreation(data, files);
    }

     //Tube Fittings
     if (data?.product_type == "Tube Fittings") {
      return await tubeFittingsCreation(data, files);
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
    } else if (data?.wire_type?.includes("Teflon")) {
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

    // Generate QR Code for the product
    const productUrl = `${BaseURL}/productqr/${newCode}`; // This can be a link to the product's page
    const qrCodeUrl = await QRCode.toDataURL(productUrl); // Generate the QR code as a base64 string

    // Add QR code to the product data
    productData.qr_code = qrCodeUrl;  // Save the QR code in the product data
    productData.qr_url = productUrl;


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
      isDeleted: false, // condition for not fetch deleted products.
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
  try {
    if (!fittingCode) {
      throw new Error("Fitting code is required");
    }

    // Extract everything after the first character (brand identifier)
    const configWithoutBrand = fittingCode.slice(1);

    // Create a regex pattern that allows any first letter (brand)
    const regexPattern = new RegExp(`^.${configWithoutBrand}$`, "i");


    // Query the database for products with a matching configuration
    const products = await Products.find({ fitting_Code: { $regex: regexPattern } });


    // Step 2: Extract product IDs from the found products
    const productIds = products.map((product) => product._id);

    // Step 3: Find inventory for those product IDs
    const inventoryData = await Inventory.find({
      product_id: { $in: productIds }
    });


    // Step 4: Attach quantity data to the products
    const productsWithQuantity = products.map((product) => {
      const inventoryItem = inventoryData.find((item) =>
        item.product_id.toString() === product._id.toString()
      );

      return {
        ...product._doc,  // Include product data
        total_quantity: inventoryItem ? inventoryItem.total_quantity : 0, // Default to 0 if not found
      };
    });


    return productsWithQuantity;
    
  } catch (error) {
    console.error("Error finding similar products:", error);
    throw error;
  }
};

//simi hoseAssembly
const findSimilarHoseAssembly = async (productCode) => {
  try {
    const products = await Products.find({product_code: productCode});
    return products; // Return all products
  } catch (error) {
    console.error("Error finding similar products:", error);
    throw error;
  }
};




// Get all Products with pagination, sorting, and search
// const getProducts = async (page, limit, sort, search,prodctTypes) => {
//   console.log("prodctTypes",prodctTypes)
//   try {
//     const skip = (page - 1) * limit;

//     // Build a dynamic filter for searching
//     const filter = search ? {
//       $or: [
//         { fitting_thread: { $regex: search, $options: 'i' } },
//         { desc_Code: { $regex: search, $options: 'i' } }
//       ]
//     } : {};

//     // Parse the sort parameter
//     let sortOptions = {};

//     if (sort) {
//       const [field, order] = sort.split(':');
//       sortOptions[field] = (order === 'dsc') ? -1 : 1; // -1 for descending, 1 for ascending
//     } else {
//       sortOptions = { created_at: -1 };
//     }

//     // Find products with applied filters, sorting, and pagination
//     const productList = await Products.find(filter)
//       .sort(sortOptions)
//       .skip(skip)
//       .limit(limit);

//     // Get the total count of documents for pagination info
//     const totalProducts = await Products.countDocuments(filter);

//     return {
//       products: productList,
//       totalProducts,
//       totalPages: Math.ceil(totalProducts / limit),
//       currentPage: page,
//       rowsPerPage: limit
//     };
//   } catch (error) {
//     console.error('Error fetching products:', error);
//     throw error;
//   }
// };

// const getProducts = async (page, limit, sort, search, prodctTypes) => {
//   try {
//     const skip = (page - 1) * limit;

//     // Step 1: Convert comma-separated string to array
//     const productTypeArray = prodctTypes
//       ? prodctTypes.split(',').map(type => decodeURIComponent(type.trim()))
//       : [];

//     // Step 2: Build dynamic filter
//     let filter = {};

//     // If search exists, include regex conditions
//     if (search) {
//       filter.$or = [
//         { fitting_thread: { $regex: search, $options: 'i' } },
//         { desc_Code: { $regex: search, $options: 'i' } }
//       ];
//     }

//     // If product types exist, add another $or to filter by product_type or part
//     if (productTypeArray.length > 0) {
//       filter.$and = filter.$and || [];
//       filter.$and.push({
//         $or: [
//           { product_type: { $in: productTypeArray } },
//           { part: { $in: productTypeArray } }
//         ]
//       });
//     }

//     // Step 3: Parse sort value
//     let sortOptions = {};
//     if (sort) {
//       const [field, order] = sort.split(':');
//       sortOptions[field] = order === 'dsc' ? -1 : 1;
//     } else {
//       sortOptions = { created_at: -1 }; // default latest
//     }

//     // Step 4: Query with filter, sort, skip, limit
//     const productList = await Products.find(filter)
//       .sort(sortOptions)
//       .skip(skip)
//       .limit(limit);

//     const totalProducts = await Products.countDocuments(filter);

//     return {
//       products: productList,
//       totalProducts,
//       totalPages: Math.ceil(totalProducts / limit),
//       currentPage: page,
//       rowsPerPage: limit
//     };
//   } catch (error) {
//     console.error('Error fetching products:', error);
//     throw error;
//   }
// };

const getProducts = async (page, limit, sort, search, prodctTypes) => {
  try {
    const skip = (page - 1) * limit;

    // Step 1: Convert comma-separated string to array
    const productTypeArray = prodctTypes
      ? prodctTypes.split(',').map(type => decodeURIComponent(type.trim()))
      : [];

    // Step 2: Build dynamic filter
    let filter = {
      isDeleted: false // Always exclude soft-deleted products
    };

    // If search exists, include regex conditions
    if (search) {
      filter.$or = [
        { fitting_thread: { $regex: search, $options: 'i' } },
        { desc_Code: { $regex: search, $options: 'i' } }
      ];
    }

    // If product types exist, add another $or to filter by product_type or part
    if (productTypeArray.length > 0) {
      filter.$and = filter.$and || [];
      filter.$and.push({
        $or: [
          { product_type: { $in: productTypeArray } },
          { part: { $in: productTypeArray } }
        ]
      });
    }

    // Step 3: Parse sort value
    let sortOptions = {};
    if (sort) {
      const [field, order] = sort.split(':');
      sortOptions[field] = order === 'dsc' ? -1 : 1;
    } else {
      sortOptions = { created_at: -1 }; // default latest
    }

    // Step 4: Query with filter, sort, skip, limit
    const productList = await Products.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

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

// Get a Product when user scan Qr code by ID
const getProductByQRScannerCode = async (code) => {
  console.log("code is here", code)
  try {
    const product = await Products.findOne({ product_code: code });
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

// // Delete a Product by ID
// const deleteProduct = async (id) => {
//   try {
//     const product = await Products.findByIdAndDelete(id);
//     return product;
//   } catch (error) {
//     console.error('Error deleting product:', error);
//     throw error;
//   }
// };

const deleteProduct = async (id) => {
  try {
    // const { id } = req.params;

    const deleted = await Products.findByIdAndUpdate(id, {
      isDeleted: true,
    });

   

   return deleted;
  } catch (error) {
    console.error('Error deleting product:', error);
  }
};

const generateQrForProduct = async (productId) => {
  const product = await Products.findById(productId);
  if (!product) throw new Error('Product not found');

  // Already has QR
  if (product.qr_code && product.qr_url) {
      return { qr_code: product.qr_code, qr_url: product.qr_url };
  }
  const sanitizedPartNo = product?.product_code?.replace(/[^a-zA-Z0-9]/g, "-");

  // Customize the product URL logic as per your frontend route
  const productUrl = `${BaseURL}/productqr/${sanitizedPartNo}`;
  const qrCodeUrl = await QRCode.toDataURL(productUrl);

  product.qr_code = qrCodeUrl;
  product.qr_url = productUrl;
  await product.save();

  return { qr_code: qrCodeUrl, qr_url: productUrl };
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
  findSimilarProducts,
  getProductByQRScannerCode,
  generateQrForProduct,
  findSimilarHoseAssembly
};
