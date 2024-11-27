const { purchaseOrderService } = require("../services");

// Create a new Purchase Order
const createPurchaseOrder = async (req, res) => {
  try {
    const purchaseOrder = await purchaseOrderService.createPurchaseOrder(req.body);
    res.json({ success: true, purchaseOrder, message: "Purchase order created successfully!" });
  } catch (error) {
    console.error("Error creating purchase order:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get all Purchase Orders
const getAllPurchaseOrders = async (req, res) => {
  try {
    const purchaseOrders = await purchaseOrderService.getAllPurchaseOrders();
    res.json({ success: true, purchaseOrders });
  } catch (error) {
    console.error("Error fetching purchase orders:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get Purchase Orders with Pagination, Search, and Sorting
const getPurchaseOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sort = req.query.sort || "date";
    const search = req.query.search || "";

    const purchaseOrders = await purchaseOrderService.getPurchaseOrders(page, limit, sort, search);
    res.json({ success: true, ...purchaseOrders });
  } catch (error) {
    console.error("Error fetching purchase orders:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get a single Purchase Order by ID
const getPurchaseOrderById = async (req, res) => {
  try {
    const purchaseOrder = await purchaseOrderService.getPurchaseOrderById(req.params.id);
    if (!purchaseOrder) {
      return res.status(404).json({ success: false, message: "Purchase order not found" });
    }
    res.json({ success: true, purchaseOrder });
  } catch (error) {
    console.error("Error fetching purchase order by ID:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Update a Purchase Order
const updatePurchaseOrder = async (req, res) => {
  try {
    const updateData = req.body;
    const purchaseOrder = await purchaseOrderService.updatePurchaseOrder(req.params.id, updateData);
    if (!purchaseOrder) {
      return res.status(404).json({ success: false, message: "Purchase order not found" });
    }
    res.json({ success: true, purchaseOrder, message: "Purchase order updated successfully!" });
  } catch (error) {
    console.error("Error updating purchase order:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Delete a Purchase Order
const deletePurchaseOrder = async (req, res) => {
  try {
    const purchaseOrder = await purchaseOrderService.deletePurchaseOrder(req.params.id);
    if (!purchaseOrder) {
      return res.status(404).json({ success: false, message: "Purchase order not found" });
    }
    res.json({ success: true, message: "Purchase order deleted successfully!" });
  } catch (error) {
    console.error("Error deleting purchase order:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const updatePurchaseOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // const allowedStatuses = ["Pending", "In Progress", "Completed"];
    // if (!allowedStatuses.includes(status)) {
    //   return res.status(400).json({ success: false, message: "Invalid status" });
    // }

    const updatedOrder = await purchaseOrderService.updatePurchaseOrderStatus(id, status);

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: "Purchase order not found" });
    }

    res.json({ success: true, updatedOrder, message: "Status updated successfully" });
  } catch (error) {
    console.error("Error updating purchase order status:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  createPurchaseOrder,
  getAllPurchaseOrders,
  getPurchaseOrders,
  getPurchaseOrderById,
  updatePurchaseOrder,
  deletePurchaseOrder,
  updatePurchaseOrderStatus
};
