const { SaleOrder } = require("../models");

// Generate a new Sale Order ID
const generateSaleOrderId = async () => {
  try {
    const now = new Date();
    const fiscalYearStart = now.getMonth() < 3 ? now.getFullYear() - 1 : now.getFullYear();
    const fiscalYearEnd = fiscalYearStart + 1;
    const fiscalYear = `${fiscalYearStart.toString().slice(-2)}-${fiscalYearEnd.toString().slice(-2)}`;

    // Find the latest sale order
    const lastOrder = await SaleOrder.findOne().sort({ voucher_no: -1 });

    let newCount = 1;
    if (lastOrder) {
      const lastSoId = lastOrder.voucher_no;
      const lastCount = parseInt(lastSoId.split('/').pop(), 10);
      newCount = lastCount + 1;
    }

    return `SB/SO/${fiscalYear}/${String(newCount)}`;
  } catch (error) {
    console.error("Error generating sale order ID:", error);
    throw error;
  }
};

// Create a new Sale Order
const createSaleOrder = async (data) => {
  try {
    const saleOrderId = await generateSaleOrderId();
    const newSaleOrder = await SaleOrder.create({ ...data, voucher_no: saleOrderId });
    return newSaleOrder;
  } catch (error) {
    console.error("Error creating sale order:", error);
    throw error;
  }
};

// Get all Sale Orders
const getAllSaleOrders = async () => {
  try {
    const saleOrders = await SaleOrder.find({}).populate('customer_id');
    return saleOrders;
  } catch (error) {
    console.error("Error fetching sale orders:", error);
    throw error;
  }
};

// Get Sale Orders with Pagination, Sorting, and Search
const getSaleOrders = async (page, limit, sort, search) => {
  try {
    const skip = (page - 1) * limit;
    const filter = search ? { "products.product_name": { $regex: search, $options: "i" } } : {};
    let sortOptions = { created_at: -1 };
    
    if (sort) {
      const [field, order] = sort.split(":");
      sortOptions[field] = order === "desc" ? -1 : 1;
    }

    const saleOrders = await SaleOrder.find(filter)
      .populate('customer_id')
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    const totalRecords = await SaleOrder.countDocuments(filter);

    return {
      saleOrders,
      totalRecords,
      totalPages: Math.ceil(totalRecords / limit),
      currentPage: page,
      rowsPerPage: limit,
    };
  } catch (error) {
    console.error("Error fetching sale orders:", error);
    throw error;
  }
};

// Get a single Sale Order by ID
const getSaleOrderById = async (id) => {
  try {
    const saleOrder = await SaleOrder.findById(id).populate('customer_id');
    return saleOrder;
  } catch (error) {
    console.error("Error fetching sale order by ID:", error);
    throw error;
  }
};

// Update a Sale Order
const updateSaleOrder = async (id, updateData) => {
  try {
    const updatedSaleOrder = await SaleOrder.findByIdAndUpdate(id, updateData, { new: true });
    return updatedSaleOrder;
  } catch (error) {
    console.error("Error updating sale order:", error);
    throw error;
  }
};

// Delete a Sale Order
const deleteSaleOrder = async (id) => {
  try {
    const deletedSaleOrder = await SaleOrder.findByIdAndDelete(id);
    return deletedSaleOrder;
  } catch (error) {
    console.error("Error deleting sale order:", error);
    throw error;
  }
};

// Update Sale Order Status
const updateSaleOrderStatus = async (id, status) => {
  try {
    const updatedOrder = await SaleOrder.findByIdAndUpdate(id, { status }, { new: true });
    return updatedOrder;
  } catch (error) {
    console.error("Error updating sale order status:", error);
    throw error;
  }
};

module.exports = {
  createSaleOrder,
  getAllSaleOrders,
  getSaleOrders,
  getSaleOrderById,
  updateSaleOrder,
  deleteSaleOrder,
  updateSaleOrderStatus
};