const { inventoryService }  = require("../services");

// Create a new inventory entry
const addInventory = async (req, res) => {
  try {
    const data = req.body;
    const newInventory = await inventoryService.addInventory(data);
    res.status(201).json({
      success: true,
      message: "Inventory created successfully",
      data: newInventory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Error creating inventory",
    });
  }
};

// Get all inventory entries
const getAllInventories = async (req, res) => {
  try {
    const inventories = await inventoryService.getAllInventories();
    res.status(200).json({
      success: true,
      data: inventories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Error fetching inventories",
    });
  }
};

//Filters
const getFilteredInventories = async (req, res) => {
  try {
    const filters = req.query; // Extract filters from query parameters
    const page = parseInt(req.query.page) || 1; // Default page 1
    const limit = parseInt(req.query.limit) || 10; // Default limit 10

    // Fetch filtered inventory with pagination and analytics
    const result = await inventoryService.getFilteredInventories(filters, page, limit);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Error fetching filtered inventories",
    });
  }
};

// Get a single inventory by ID
const getInventoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const inventory = await inventoryService.getInventoryById(id);
    res.status(200).json({
      success: true,
      data: inventory,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message || "Inventory not found",
    });
  }
};

// Update inventory by ID
const updateInventory = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedInventory = await inventoryService.updateInventory(id, data);
    res.status(200).json({
      success: true,
      message: "Inventory updated successfully",
      data: updatedInventory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Error updating inventory",
    });
  }
};

// Delete inventory by ID
const deleteInventory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedInventory = await inventoryService.deleteInventory(id);
    res.status(200).json({
      success: true,
      message: "Inventory deleted successfully",
      data: deletedInventory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Error deleting inventory",
    });
  }
};


// Check if a product exists in the inventory
const checkProductInInventory = async (req, res) => {
    try {
      const { product_id } = req.params; // Extract product_id from the request params
      const result = await inventoryService.checkProductInInventory(product_id);
      res.status(200).json({
        success: true,
        exists: result.exists,
        message: result.message,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message || "Error checking product in inventory",
      });
    }
  };

  // Check if multiple products exist in the inventory
const checkProductsInInventory = async (req, res) => {
  try {
    const { product_ids } = req.body; // Extract product_ids from the request body
    const results = await inventoryService.checkProductsInInventory(product_ids);
    console.log(results,"results is here for existsssssssssssssssssssss")
    res.status(200).json({
      success: true,
      products: results,
      message: "Checked all products in inventory successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Error checking products in inventory",
    });
  }
};

// Check if a product exists in the inventory
// const checkProductInInventory = async (productId) => {
//     try {
//       const product = await Inventory.findOne({ product_id: productId });
//       if (product) {
//         return { exists: true, message: "Product exists in the inventory" };
//       } else {
//         return { exists: false, message: "Product does not exist in the inventory" };
//       }
//     } catch (error) {
//       console.error("Error checking product in inventory:", error);
//       throw error;
//     }
//   };

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
