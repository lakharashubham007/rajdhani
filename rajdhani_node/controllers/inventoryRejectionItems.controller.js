const { inventoryRejectionItemsService } = require('../services');

// Create a new inventory log
const createInventoryRejectionItems = async (req, res) => {
  try {
    const data = await inventoryRejectionItemsService.createInventoryRejectionItems(req.body);
    res.json({ success: true, data, message: 'Inventory rejection items created successfully!' });
  } catch (error) {
    console.error('Error creating inventory log:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Get rejection details with Pagination, Search, and Sorting
const getInventoryRejectedItems = async (req, res) => {
  try {
    const { id } = req.params; 
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sort = req.query.sort || "date";
    const search = req.query.search || "";

    const rejectionDetails = await inventoryRejectionItemsService.getInventoryRejectionItems(id,page, limit, sort, search);
    res.json({ success: true, ...rejectionDetails });
  } catch (error) {
    console.error("Error fetching sale orders:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  createInventoryRejectionItems,
  getInventoryRejectedItems
};
