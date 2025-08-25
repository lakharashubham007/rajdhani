const { inventoryRejectionDetailsService } = require('../services');

// Create a new inventory log
const createInventoryRejectionDetails = async (req, res) => {
  try {
    const data = await inventoryRejectionDetailsService.createInventoryRejectionDetails(req.body);
    res.json({ success: true, data, message: 'Inventory log created successfully!' });
  } catch (error) {
    console.error('Error creating inventory log:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Get rejection details with Pagination, Search, and Sorting
const getInventoryRejectionDetails = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sort = req.query.sort || "date";
    const search = req.query.search || "";

    const rejectionDetails = await inventoryRejectionDetailsService.getInventoryRejectionDetails(page, limit, sort, search);
    res.json({ success: true, ...rejectionDetails });
  } catch (error) {
    console.error("Error fetching sale orders:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  createInventoryRejectionDetails,
  getInventoryRejectionDetails
};
