const { saleOrderService } = require("../services");

// Create a new Sale Order
const createSaleOrder = async (req, res) => {
  try {
    const saleOrder = await saleOrderService.createSaleOrder(req.body);
    res.json({ success: true, saleOrder, message: "Sale order created successfully!" });
  } catch (error) {
    console.error("Error creating sale order:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get all Sale Orders
const getAllSaleOrders = async (req, res) => {
  try {
    const saleOrders = await saleOrderService.getAllSaleOrders();
    res.json({ success: true, saleOrders });
  } catch (error) {
    console.error("Error fetching sale orders:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get Sale Orders with Pagination, Search, and Sorting
const getSaleOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sort = req.query.sort || "date";
    const search = req.query.search || "";

    const saleOrders = await saleOrderService.getSaleOrders(page, limit, sort, search);
    res.json({ success: true, ...saleOrders });
  } catch (error) {
    console.error("Error fetching sale orders:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get a single Sale Order by ID
const getSaleOrderById = async (req, res) => {
  try {
    const saleOrder = await saleOrderService.getSaleOrderById(req.params.id);
    if (!saleOrder) {
      return res.status(404).json({ success: false, message: "Sale order not found" });
    }
    res.json({ success: true, saleOrder });
  } catch (error) {
    console.error("Error fetching sale order by ID:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Update a Sale Order
const updateSaleOrder = async (req, res) => {
  try {
    const updateData = req.body;
    const saleOrder = await saleOrderService.updateSaleOrder(req.params.id, updateData);
    if (!saleOrder) {
      return res.status(404).json({ success: false, message: "Sale order not found" });
    }
    res.json({ success: true, saleOrder, message: "Sale order updated successfully!" });
  } catch (error) {
    console.error("Error updating sale order:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Delete a Sale Order
const deleteSaleOrder = async (req, res) => {
  try {
    const saleOrder = await saleOrderService.deleteSaleOrder(req.params.id);
    if (!saleOrder) {
      return res.status(404).json({ success: false, message: "Sale order not found" });
    }
    res.json({ success: true, message: "Sale order deleted successfully!" });
  } catch (error) {
    console.error("Error deleting sale order:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Update Sale Order Status
const updateSaleOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // const allowedStatuses = ["Pending", "Shipped", "Delivered", "Cancelled"];
    // if (!allowedStatuses.includes(status)) {
    //   return res.status(400).json({ success: false, message: "Invalid status" });
    // }

    const updatedOrder = await saleOrderService.updateSaleOrderStatus(id, status);

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: "Sale order not found" });
    }

    res.json({ success: true, updatedOrder, message: "Status updated successfully" });
  } catch (error) {
    console.error("Error updating sale order status:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const verifySaleOrderBy = async (req, res) => {
  try {
    const { so_id, isVerifiedBy ,isVerified } = req?.body;

    if (!so_id || !isVerifiedBy) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const updatedSaleOrder = await saleOrderService.verifySaleOrderBy(so_id, isVerifiedBy, isVerified);

    if (!updatedSaleOrder) {
      return res.status(404).json({ success: false, message: "Sale order not found" });
    }

    res.status(200).json({
      success: true,
      message: "Sale order successfully verified.",
      data: updatedSaleOrder
    });
  } catch (error) {
    console.error("verifySaleOrder error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get a single Sale Order by ID
const getSaleOrderByCustomerId = async (req, res) => {
  try {
    const saleOrders = await saleOrderService.getSaleOrdersByCustomerId(req.params.id);
    if (!saleOrders) {
      return res.status(404).json({ success: false, message: "Sale orders not found" });
    }
    res.json({ success: true, saleOrders });
  } catch (error) {
    console.error("Error fetching sale order by customer ID:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};




module.exports = {
  createSaleOrder,
  getAllSaleOrders,
  getSaleOrders,
  getSaleOrderById,
  updateSaleOrder,
  deleteSaleOrder,
  updateSaleOrderStatus,
  verifySaleOrderBy,
  getSaleOrderByCustomerId,
  
  
};
