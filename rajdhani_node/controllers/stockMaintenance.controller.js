const { stockMaintenanceService } = require("../services");

// Add a new Product Stock Entry
const addStockEntry = async (req, res) => {
  try {
    const stockData = req.body; // Expecting product and stock details in the request body
    const stockEntry = await stockMaintenanceService.addStockEntry(stockData);
    res.json({ success: true, stockEntry, message: "Stock entry added successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


// Get  Stock Maintenance entries
const getStockEntries = async (req, res) => {
    try {
      const stocks = await stockMaintenanceService.getStockEntries();
      res.json({ success: true, stocks });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };

// Get all Stock Maintenance entries
const getAllStockEntries = async (req, res) => {
  try {
    const stocks = await stockMaintenanceService.getAllStockEntries();
    res.json({ success: true, stocks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};



// Get a single Stock Entry by ID
const getStockEntryById = async (req, res) => {
  try {
    const stockId = req.params.id;
    const stockEntry = await stockMaintenanceService.getStockEntryById(stockId);

    if (!stockEntry) {
      return res.status(404).json({ success: false, message: "Stock entry not found" });
    }

    res.json({ success: true, stockEntry });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Update a Stock Entry by ID
const updateStockEntry = async (req, res) => {
  try {
    const stockId = req.params.id;
    const updateData = req.body;

    const updatedStockEntry = await stockMaintenanceService.updateStockEntry(stockId, updateData);

    if (!updatedStockEntry) {
      return res.status(404).json({ success: false, message: "Stock entry not found" });
    }

    res.json({ success: true, stockEntry: updatedStockEntry, message: "Stock entry updated successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Delete a Stock Entry by ID
const deleteStockEntry = async (req, res) => {
  try {
    const stockId = req.params.id;
    const deletedStockEntry = await stockMaintenanceService.deleteStockEntry(stockId);

    if (!deletedStockEntry) {
      return res.status(404).json({ success: false, message: "Stock entry not found" });
    }

    res.json({ success: true, message: "Stock entry deleted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Update Stock Status
const updateStockStatus = async (req, res) => {
    try {
      const { id } = req.params; // Stock entry ID from the request parameters
      const { status } = req.body; // New status from the request body
  
      if (!status) {
        return res.status(400).json({
          success: false,
          message: "Status is required",
        });
      }
  
      const updatedStock = await stockMaintenanceService.updateStockStatus(id, status);
  
      if (!updatedStock) {
        return res.status(404).json({
          success: false,
          message: "Stock entry not found",
        });
      }
  
      res.json({
        success: true,
        stock: updatedStock,
        message: "Stock status updated successfully!",
      });
    } catch (error) {
      console.error("Error updating stock status:", error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };

module.exports = {
  addStockEntry,
  getStockEntries,
  getAllStockEntries,
  getStockEntryById,
  updateStockEntry,
  deleteStockEntry,
  updateStockStatus
};
