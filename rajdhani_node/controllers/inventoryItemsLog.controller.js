const { inventoryItemsLogService } = require('../services');

// Create a new inventory log
const createInventoryLog = async (req, res) => {
  try {
    const log = await inventoryItemsLogService.createInventoryLog(req.body);
    res.json({ success: true, log, message: 'Inventory log created successfully!' });
  } catch (error) {
    console.error('Error creating inventory log:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Get all inventory logs (no pagination)
const getAllInventoryLogs = async (req, res) => {
  try {
    const logs = await inventoryItemsLogService.getAllInventoryLogs();
    res.json({ success: true, logs });
  } catch (error) {
    console.error('Error fetching all inventory logs:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Get inventory logs with pagination, sorting, and search
const getInventoryLogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sort = req.query.sort || 'createdAt:dsc';
    const search = req.query.search || '';

    const logs = await inventoryItemsLogService.getInventoryLogs(page, limit, sort, search);
    res.json({ success: true, ...logs });
  } catch (error) {
    console.error('Error fetching inventory logs:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Get a single inventory log by ID
const getInventoryLogById = async (req, res) => {
  try {
    const log = await inventoryItemsLogService.getInventoryLogById(req.params.id);
    if (!log) {
      return res.status(404).json({ success: false, message: 'Inventory log not found' });
    }
    res.json({ success: true, log });
  } catch (error) {
    console.error('Error fetching inventory log by ID:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Update an inventory log by ID
const updateInventoryLog = async (req, res) => {
  try {
    const fieldsToUpdate = [
      'action_type', 'quantity_changed', 'quantity_before', 'quantity_after',
      'base_price', 'price_with_tax', 'location_name', 'rack_location',
      'reference_type', 'reference_id', 'note', 'updatedBy'
    ];
    const updateData = {};

    fieldsToUpdate.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    updateData.updatedAt = Date.now();

    const updatedLog = await inventoryItemsLogService.updateInventoryLog(req.params.id, updateData);
    if (!updatedLog) {
      return res.status(404).json({ success: false, message: 'Inventory log not found' });
    }

    res.json({ success: true, updatedLog, message: 'Inventory log updated successfully!' });
  } catch (error) {
    console.error('Error updating inventory log:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Delete an inventory log by ID
const deleteInventoryLog = async (req, res) => {
  try {
    const deletedLog = await inventoryItemsLogService.deleteInventoryLog(req.params.id);
    if (!deletedLog) {
      return res.status(404).json({ success: false, message: 'Inventory log not found' });
    }
    res.json({ success: true, message: 'Inventory log deleted successfully!' });
  } catch (error) {
    console.error('Error deleting inventory log:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Update inventory log status
const updateInventoryLogStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updatedLog = await inventoryItemsLogService.updateInventoryLogStatus(req.params.id, status);
    if (!updatedLog) {
      return res.status(404).json({ success: false, message: 'Inventory log not found' });
    }
    res.json({ success: true, updatedLog, message: 'Inventory log status updated successfully!' });
  } catch (error) {
    console.error('Error updating inventory log status:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Create logs and update inventory for multiple items
const bulkLogAndUpdateInventory = async (req, res) => {
  try {
    const result = await inventoryItemsLogService.bulkLogAndUpdateInventory(req.body);
    res.json({
      success: true,
      message: 'Logs created and inventory updated successfully',
      data: result
    });
  } catch (error) {
    console.error('Error in bulk log and inventory update:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const bulkStockJournalLogAndUpdateInventory = async (req, res) => {
  try {
    const payload = req.body; // array of source/destination items
    const result = await inventoryItemsLogService.bulkStockJournalLogAndUpdateInventory(payload);

    res.json({
      success: true,
      message: "Stock Journal logs created & inventory updated successfully",
      data: result
    });
  } catch (error) {
    console.error("Error in bulk log and inventory update:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};

const getInventoryItemLogsByItemAndSo = async (req, res) => {
  try {
    const { item_id, so_id } = req.query;

    if (!item_id || !so_id) {
      return res.status(400).json({
        success: false,
        message: "Both item_id and so_id are required in query params.",
      });
    }

    const logs = await inventoryItemsLogService.getLogsByItemAndSO(item_id, so_id);

    res.status(200).json({
      success: true,
      total: logs.length,
      logs,
    });
  } catch (error) {
    console.error("❌ Error fetching item logs by item and stage:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getInventoryItemLogs = async (req, res) => {
  try {
    const { item_id } = req.query;

    if (!item_id) {
      return res.status(400).json({
        success: false,
        message: "Both item_id and so_id are required in query params.",
      });
    }

    const logs = await inventoryItemsLogService.getLogsByItemId(item_id);

    res.status(200).json({
      success: true,
      total: logs.length,
      logs,
    });
  } catch (error) {
    console.error("❌ Error fetching item logs by item and stage:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}



const getUniqueSOIdsWithDetails = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sort = req.query.sort || 'count:dsc'; // Default sorting by count descending
    const search = req.query.search || '';

    const soData = await inventoryItemsLogService.getUniqueSOIdsWithDetails(page, limit, sort, search);
    console.log("soData",soData)
    res.status(200).json({
      success: true,
      total: soData.total,
      totalPages: soData.totalPages,
      currentPage: soData.currentPage,
      rowsPerPage: soData.rowsPerPage,
      data: soData.data,
    });
  } catch (error) {
    console.error("❌ Error fetching unique SO IDs with details:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


const getPackingItemsBySoId = async (req, res) => {
  try {
    const { id } = req.params; // so_id comes from frontend in param
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const data = await inventoryItemsLogService.getPackingItemsBySoId(id, page, limit);

    res.status(200).json({
      success: true,
      total: data.total,
      totalPages: data.totalPages,
      currentPage: data.currentPage,
      rowsPerPage: data.rowsPerPage,
      data: data.data,
    });
  } catch (error) {
    console.error("❌ Error in getPackingItemsBySoId controller:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};






module.exports = {
  createInventoryLog,
  getAllInventoryLogs,
  getInventoryLogs,
  getInventoryLogById,
  updateInventoryLog,
  deleteInventoryLog,
  updateInventoryLogStatus,
  bulkLogAndUpdateInventory,
  getInventoryItemLogsByItemAndSo,
  getInventoryItemLogs,
  bulkStockJournalLogAndUpdateInventory,
  getUniqueSOIdsWithDetails,
  getPackingItemsBySoId
};
