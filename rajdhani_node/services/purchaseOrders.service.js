const { PurchaseOrder } = require("../models");

// Generate a unique purchase_order_id
const generatePurchaseOrderId = async () => {
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;
  const fiscalYear = `${currentYear % 100}-${nextYear % 100}`;

  const lastOrder = await PurchaseOrder.findOne({})
    .sort({ created_at: -1 }) // Get the most recent order
    .select("purchase_order_id");

  let orderNumber = 1;
  if (lastOrder) {
    const lastOrderId = lastOrder.purchase_order_id;
    const lastOrderNumber = parseInt(lastOrderId.split("/").pop(), 10); // Extract the last number
    orderNumber = lastOrderNumber + 1;
  }

  const formattedOrderNumber = orderNumber.toString().padStart(2, "0");
  return `SB/PO/${fiscalYear}/${formattedOrderNumber}`;
};

// Create a new Purchase Order
const createPurchaseOrder = async (data) => {
  try {
    const purchaseOrderId = await generatePurchaseOrderId();
    const newPurchaseOrder = await PurchaseOrder.create({...data , purchase_order_id: purchaseOrderId });
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

module.exports = {
  createPurchaseOrder,
  getAllPurchaseOrders,
  getPurchaseOrders,
  getPurchaseOrderById,
  updatePurchaseOrder,
  deletePurchaseOrder,
};
