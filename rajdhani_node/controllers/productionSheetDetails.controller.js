const {productionSheetDetailsService} = require('../services');

// Create a new Production Sheet Details
const createProductionSheetDetails = async (req, res) => {
  try {
    const productionSheetDetails = await productionSheetDetailsService.createProductionSheetDetails(req.body);
    res.json({ success: true, productionSheetDetails, message: "produciton sheet created successfully!" });
  } catch (error) {
    console.error("Error creating purchase order:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get the last created sheet number
const getLastSheetNo = async (req, res) => {
  try {
    const sheet_no = await productionSheetDetailsService.getLastSheetNo();
    if (sheet_no) {
      res.json({ success: true, sheet_no });
    } else {
      res.status(404).json({ success: false, message: "No production sheet found" });
    }
  } catch (error) {
    console.error("Error getting last sheet no:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get production sheets with Pagination, Search, and Sorting
const getProductionSheets = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sort = req.query.sort || "date";
    const search = req.query.search || "";

    const productionSheets = await productionSheetDetailsService.getProductionSheets(page, limit, sort, search);
    res.json({ success: true, ...productionSheets });
  } catch (error) {
    console.error("Error fetching sale orders:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get Sale Orders with Pagination, Search, and Sorting
const getProductionSheetDetailsWithItems = async (req, res) => {
  try {
    const productionSheetID = req.query.sheet_id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sort = req.query.sort || "date";
    const search = req.query.search || "";

    const producitonSheetDetailsWithItems = await productionSheetDetailsService.getProductionSheetDetailsWithItems(productionSheetID, page, limit, sort, search);
    res.json({ success: true, ...producitonSheetDetailsWithItems });
  } catch (error) {
    console.error("Error fetching sale orders:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const searchProductionSheets = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ success: false, message: "Search term is required." });
  }

  try {
    const results = await productionSheetDetailsService.searchBySheetOrOrderNo(query);
    res.status(200).json({ success: true, sheets: results, message: "Search completed successfully." });
  } catch (error) {
    console.error("Error in searchProductionSheets:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};





module.exports = {
    createProductionSheetDetails,
    getLastSheetNo,
    getProductionSheets,
    getProductionSheetDetailsWithItems,
    searchProductionSheets
  };
  