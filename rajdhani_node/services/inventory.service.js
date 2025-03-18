const { Inventory, StockMaintenance } = require("../models");
const { Products } = require("../models");

// Create inventory entries for a list of products
// const addInventory = async (dataArray) => {
//   try {
//     // Iterate through each item in the input data array
//     const inventoryEntries = await Promise.all(
//       dataArray.map(async (data) => {
//         // Fetch product details based on product_id
//         const productDetails = await Products.findById(data.product_id);

//         if (!productDetails) {
//           throw new Error(`Product with ID ${data.product_id} not found`);
//         }

//         // Create inventory object with extracted fields
//         const inventoryData = {
//           store_id: data.store_id || "1",
//           product_id: productDetails._id,
//           product_name: productDetails.product_name || data.product_name,
//           skive_type: productDetails.skive_type || null,
//           wire_type: productDetails.wire_type || null,
//           thread_type: productDetails.fitting_thread || null,
//           ring_type: productDetails.fitting_type || null,
//           bendangle: productDetails.straight_bend_angle || null,
//           total_quantity: data.quantity || 0,
//           base_price: data.price_per_unit || 0,
//           cgst: data.cgst || 0,
//           sgst: data.sgst || 0,
//           igst: data.igst || 0,
//           cess: data.cess || 0,
//           price_with_tax: data.amount || 0,
//           location_name: data.location_name || null,
//           rack_location: data.rack_location || null,
//           status: "true",
//         };

//         // Create inventory entry in the database
//         const newInventory = await Inventory.create(inventoryData);
//         return newInventory;
//       })
//     );

//     return inventoryEntries;
//   } catch (error) {
//     console.error("Error creating inventory entries:", error);
//     throw error;
//   }
// };


// Create or update inventory entries for a list of products
const addInventory = async (dataArray) => {
  try {
    // Iterate through each item in the input data array
    const inventoryEntries = await Promise.all(
      dataArray.map(async (data) => {
        // Fetch product details based on product_id
        const productDetails = await Products.findById(data.product_id);

        if (!productDetails) {
          throw new Error(`Product with ID ${data.product_id} not found`);
        }

        // Calculate total remaining_qty for the given product_id from StockMaintenance
        const stockRecords = await StockMaintenance.find({ product_id: data.product_id });
        const totalRemainingQty = stockRecords.reduce((sum, record) => sum + record.remaining_qty, 0);


        // Check if an inventory entry for this product_id already exists
        const existingInventory = await Inventory.findOne({ product_id: data.product_id });

        if (existingInventory) {
          // If the entry exists, update the total_quantity based on totalRemainingQty
          existingInventory.total_quantity = totalRemainingQty;
          await existingInventory.save();
          return existingInventory;
        } else {
          // If no entry exists, create a new one
          const inventoryData = {
            store_id: data.store_id || "1",
            product_id: productDetails._id,
            product_name: productDetails.product_name || data.product_name,
            product_unit: productDetails.uom || data?.uom,
            skive_type: productDetails.skive_type || null,
            wire_type: productDetails.wire_type || null,
            thread_type: productDetails.fitting_thread || null,
            ring_type: productDetails.fitting_type || null,
            bendangle: productDetails.straight_bend_angle || null,
            total_quantity: data.quantity || 0,
            base_price: data.price_per_unit || 0,
            cgst: data.cgst || 0,
            sgst: data.sgst || 0,
            igst: data.igst || 0,
            cess: data.cess || 0,
            price_with_tax: data.amount || 0,
            location_name: data.location_name || null,
            rack_location: data.rack_location || null,
            status: "true",
          };

          // Create new inventory entry
          const newInventory = await Inventory.create(inventoryData);
          return newInventory;
        }
      })
    );

    return inventoryEntries;
  } catch (error) {
    console.error("Error creating or updating inventory entries:", error);
    throw error;
  }
};

// Get all inventory entries
const getAllInventories = async () => {
  try {
    const inventories = await Inventory.find().populate('product_id');
    return inventories;
  } catch (error) {
    console.error("Error fetching inventories:", error);
    throw error;
  }
};

// Get a single inventory by ID
const getInventoryById = async (id) => {
  try {
    const inventory = await Inventory.findById(id);
    if (!inventory) {
      throw new Error("Inventory not found");
    }
    return inventory;
  } catch (error) {
    console.error("Error fetching inventory by ID:", error);
    throw error;
  }
};

// Update inventory by ID
const updateInventory = async (id, data) => {
  try {
    const updatedInventory = await Inventory.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!updatedInventory) {
      throw new Error("Inventory not found");
    }
    return updatedInventory;
  } catch (error) {
    console.error("Error updating inventory:", error);
    throw error;
  }
};

// Delete inventory by ID
const deleteInventory = async (id) => {
  try {
    const deletedInventory = await Inventory.findByIdAndDelete(id);
    if (!deletedInventory) {
      throw new Error("Inventory not found");
    }
    return deletedInventory;
  } catch (error) {
    console.error("Error deleting inventory:", error);
    throw error;
  }
};


// Check if a product exists in the inventory
const checkProductInInventory = async (productId) => {
  try {
    const product = await Inventory.findOne({ product_id: productId });
    if (product) {
      return { exists: true, message: "Product exists in the inventory" };
    } else {
      return { exists: false, message: "Product does not exist in the inventory" };
    }
  } catch (error) {
    console.error("Error checking product in inventory:", error);
    throw error;
  }
};

// Check if multiple products exist in the inventory
const checkProductsInInventory = async (productIds) => {
  try {
    const products = await Inventory.find({ product_id: { $in: productIds } });
    const productMap = new Map(products.map(product => [product?.product_id?.toString(), true]));
    return productIds.map(productId => ({
      product_id: productId,
      exists: productMap.has(productId.toString()),
      message: productMap.has(productId.toString()) ? "Product exists in the inventory" : "Product does not exist in the inventory",
    }));
  } catch (error) {
    console.error("Error checking products in inventory:", error);
    throw error;
  }
};



// Get filtered inventories with exact match priority
// const getFilteredInventories = async (filters) => {
//   try {
//     let exactQuery = {};
//     let partialQuery = {};

//     // Construct exact and partial queries
//     if (filters.skive_type) {
//       exactQuery.skive_type = filters.skive_type;
//       partialQuery.skive_type = { $regex: filters.skive_type, $options: "i" };
//     }
//     if (filters.wire_type) {
//       exactQuery.wire_type = filters.wire_type;
//       partialQuery.wire_type = { $regex: filters.wire_type, $options: "i" };
//     }
//     if (filters.thread_type) {
//       exactQuery.thread_type = filters.thread_type;
//       partialQuery.thread_type = { $regex: filters.thread_type, $options: "i" };
//     }
//     if (filters.bendangle) {
//       exactQuery.bendangle = filters.bendangle;
//       partialQuery.bendangle = { $regex: filters.bendangle, $options: "i" };
//     }
//     if (filters.ring_type) {
//       exactQuery.ring_type = filters.ring_type;
//       partialQuery.ring_type = { $regex: filters.ring_type, $options: "i" };
//     }
//     if (filters.product_name) {
//       exactQuery.product_name = filters.product_name;
//       partialQuery.product_name = { $regex: filters.product_name, $options: "i" };
//     }

//     // Use MongoDB aggregation with $facet to separate exact and partial matches
//     const result = await Inventory.aggregate([
//       {
//         $facet: {
//           exactMatches: [{ $match: exactQuery }],
//           partialMatches: [{ $match: partialQuery }]
//         }
//       }
//     ]);

//     // Extract results and ensure ordering: exact matches first, then partial matches
//     const finalResults = [...result[0].exactMatches, ...result[0].partialMatches];

//     return finalResults;
//   } catch (error) {
//     console.error("Error fetching filtered inventories:", error);
//     throw error;
//   }
// };

const getFilteredInventories = async (filters, page, limit) => {
  try {
    let exactQuery = {};
    let partialQuery = {};

    // Build exact and partial queries
    if (filters.skive_type) {
      exactQuery.skive_type = filters.skive_type;
      partialQuery.skive_type = { $regex: filters.skive_type, $options: "i" };
    }
    if (filters.wire_type) {
      exactQuery.wire_type = filters.wire_type;
      partialQuery.wire_type = { $regex: filters.wire_type, $options: "i" };
    }
    if (filters.thread_type) {
      exactQuery.thread_type = filters.thread_type;
      partialQuery.thread_type = { $regex: filters.thread_type, $options: "i" };
    }
    if (filters.bendangle) {
      exactQuery.bendangle = filters.bendangle;
      partialQuery.bendangle = { $regex: filters.bendangle, $options: "i" };
    }
    if (filters.ring_type) {
      exactQuery.ring_type = filters.ring_type;
      partialQuery.ring_type = { $regex: filters.ring_type, $options: "i" };
    }
    if (filters.product_name) {
      exactQuery.product_name = filters.product_name;
      partialQuery.product_name = { $regex: filters.product_name, $options: "i" };
    }
    if (filters.product_unit) {
      exactQuery.product_unit = filters.product_unit;
      partialQuery.product_unit = { $regex: filters.product_unit, $options: "i" };
    }

    // Fetch exact matches first
    const exactMatches = await Inventory.find(exactQuery)
      .populate("product_id")
      .sort({ created_at: -1 });

    // Fetch partial matches, excluding already found exact matches
    const exactMatchIds = exactMatches.map((item) => item._id);
    const partialMatches = await Inventory.find({
      ...partialQuery,
      _id: { $nin: exactMatchIds }, // Exclude exact matches
    })
      .populate("product_id")
      .sort({ created_at: -1 });

    // Combine results: exact first, partial second
    let finalResults = [...exactMatches, ...partialMatches];

    // Compute analytics
    const totalEntries = finalResults.length;
    const totalPages = Math.ceil(totalEntries / limit);
    const totalQuantity = finalResults.reduce((sum, item) => sum + (item.total_quantity || 0), 0);
    const totalAmount = finalResults.reduce((sum, item) => sum + (item.price_with_tax || 0), 0);
    const uniqueProductIds = new Set(finalResults.map(item => item.product_id?._id?.toString()));
    const totalProducts = uniqueProductIds.size;

    // Apply pagination dynamically
    finalResults = finalResults.slice((page - 1) * limit, page * limit);

    return {
      success: true,
      total_entries: totalEntries,
      page,
      limit,
      total_pages: totalPages,
      total_quantity: totalQuantity,
      total_products: totalProducts,
      total_amount: totalAmount,
      data: finalResults,
    };
  } catch (error) {
    console.error("Error fetching filtered inventories:", error);
    throw error;
  }
};

//last working
// const getFilteredInventories = async (filters, page, limit) => {
//   try {
//     let exactQuery = {};
//     let partialQuery = {};

//     // Build exact and partial queries
//     if (filters.skive_type) {
//       exactQuery.skive_type = filters.skive_type;
//       partialQuery.skive_type = { $regex: filters.skive_type, $options: "i" };
//     }
//     if (filters.wire_type) {
//       exactQuery.wire_type = filters.wire_type;
//       partialQuery.wire_type = { $regex: filters.wire_type, $options: "i" };
//     }
//     if (filters.thread_type) {
//       exactQuery.thread_type = filters.thread_type;
//       partialQuery.thread_type = { $regex: filters.thread_type, $options: "i" };
//     }
//     if (filters.bendangle) {
//       exactQuery.bendangle = filters.bendangle;
//       partialQuery.bendangle = { $regex: filters.bendangle, $options: "i" };
//     }
//     if (filters.ring_type) {
//       exactQuery.ring_type = filters.ring_type;
//       partialQuery.ring_type = { $regex: filters.ring_type, $options: "i" };
//     }
//     if (filters.product_name) {
//       exactQuery.product_name = filters.product_name;
//       partialQuery.product_name = { $regex: filters.product_name, $options: "i" };
//     }

//     // Fetch exact matches first
//     const exactMatches = await Inventory.find(exactQuery)
//       .populate("product_id")
//       .sort({ created_at: -1 });

//     // Fetch partial matches, excluding already found exact matches
//     const exactMatchIds = exactMatches.map((item) => item._id);
//     const partialMatches = await Inventory.find({
//       ...partialQuery,
//       _id: { $nin: exactMatchIds }, // Exclude exact matches
//     })
//       .populate("product_id")
//       .sort({ created_at: -1 });

//     // Combine results: exact first, partial second
//     let finalResults = [...exactMatches, ...partialMatches];

//     // Get total count before pagination
//     const totalEntries = finalResults.length;
//     const totalPages = Math.ceil(totalEntries / limit);

//     // Apply pagination dynamically
//     finalResults = finalResults.slice((page - 1) * limit, page * limit);

//     return {
//       success: true,
//       total_entries: totalEntries,
//       page,
//       limit,
//       total_pages: totalPages,
//       data: finalResults,
//     };
//   } catch (error) {
//     console.error("Error fetching filtered inventories:", error);
//     throw error;
//   }
// };


module.exports = {
  addInventory,
  getAllInventories,
  getInventoryById,
  updateInventory,
  deleteInventory,
  checkProductInInventory,
  checkProductsInInventory,
  getFilteredInventories
};
