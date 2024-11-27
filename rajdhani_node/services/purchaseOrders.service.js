const { PurchaseOrder } = require("../models");


// Generate a new Purchase Order ID
const generatePurchaseOrderId = async () => {
  try {
    // Get the current fiscal year
    const now = new Date();
    const fiscalYearStart = now.getMonth() < 3 ? now.getFullYear() - 1 : now.getFullYear();
    const fiscalYearEnd = fiscalYearStart + 1;
    const fiscalYear = `${fiscalYearStart.toString().slice(-2)}-${fiscalYearEnd.toString().slice(-2)}`;

    // Find the latest purchase order
    const lastOrder = await PurchaseOrder.findOne().sort({ voucher_no: -1 });

    console.log("last po ", lastOrder)

    let newCount = 1;
    if (lastOrder) {
      const lastPoId = lastOrder.voucher_no;
      const lastCount = parseInt(lastPoId.split('/').pop(), 10);
      newCount = lastCount + 1;
    }

    // Generate the new PO ID
    return `SB/PO/${fiscalYear}/${String(newCount)}`;
  } catch (error) {
    console.error("Error generating purchase order ID:", error);
    throw error;
  }
};

// Create a new Purchase Order
const createPurchaseOrder = async (data) => {
  try {
    const purchaseOrderId = await generatePurchaseOrderId();
    const newPurchaseOrder = await PurchaseOrder.create({...data , voucher_no: purchaseOrderId });
    return newPurchaseOrder;
  } catch (error) {
    console.error("Error creating purchase order:", error);
    throw error;
  }
};

// Get all Purchase Orders without pagination (basic retrieval)
const getAllPurchaseOrders = async () => {
  try {
    const purchaseOrders = await PurchaseOrder.find({}).populate('supplier_id');
    return purchaseOrders;
  } catch (error) {
    console.error("Error fetching purchase orders:", error);
    throw error;
  }
};

// Get Purchase Orders with Pagination, Sorting, and Search
const getPurchaseOrders = async (page, limit, sort, search) => {
  try {
    const skip = (page - 1) * limit;

    // Dynamic search filter
    const filter = search
      ? { "products.product_name": { $regex: search, $options: "i" } }
      : {};

    // Sorting configuration
    const sortOption = {};

    let sortOptions = { created_at: -1 };

    if (sort) {
      const [field, order] = sort.split(":");
      sortOptions[field] = order === "desc" || order === "dsc" ? -1 : 1;
    } else {
      sortOptions = { created_at: -1 }; // Default sorting by created_at (newest first)
    }

    const purchaseOrders = await PurchaseOrder.find(filter)
      .populate('supplier_id')
      .sort(sortOptions || sortOption)
      .skip(skip)
      .limit(limit);

    const totalRecords = await PurchaseOrder.countDocuments(filter);

    return {
      purchaseOrders,
      totalRecords,
      totalPages: Math.ceil(totalRecords / limit),
      currentPage: page,
      rowsPerPage: limit,
    };
  } catch (error) {
    console.error("Error fetching purchase orders:", error);
    throw error;
  }
};

// Get a single Purchase Order by ID
const getPurchaseOrderById = async (id) => {
  try {
    const purchaseOrder = await PurchaseOrder.findById(id).populate('supplier_id');
    return purchaseOrder;
  } catch (error) {
    console.error("Error fetching purchase order by ID:", error);
    throw error;
  }
};

// Update a Purchase Order
const updatePurchaseOrder = async (id, updateData) => {
  try {
    const updatedPurchaseOrder = await PurchaseOrder.findByIdAndUpdate(id, updateData, { new: true });
    return updatedPurchaseOrder;
  } catch (error) {
    console.error("Error updating purchase order:", error);
    throw error;
  }
};

// Delete a Purchase Order
const deletePurchaseOrder = async (id) => {
  try {
    const deletedPurchaseOrder = await PurchaseOrder.findByIdAndDelete(id);
    return deletedPurchaseOrder;
  } catch (error) {
    console.error("Error deleting purchase order:", error);
    throw error;
  }
};

const updatePurchaseOrderStatus = async (id, status) => {
  try {
    const updatedOrder = await PurchaseOrder.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    return updatedOrder;
  } catch (error) {
    console.error("Error updating purchase order status:", error);
    throw error;
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
