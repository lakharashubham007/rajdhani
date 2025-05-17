const { saleOrderItemService } = require("../services");

// Create a new Sale Order Item
const createSaleOrderItem = async (req, res) => {
  try {
    const newItem = await saleOrderItemService.createSaleOrderItem(req.body);
    res.status(201).json({ success: true, so_items: newItem, message: 'Sale order item created successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Get all Sale Order Items
const getSaleOrderItems = async (req, res) => {
  try {
    const items = await saleOrderItemService.getSaleOrderItems();
    res.status(200).json({ success: true, items });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Get Sale Order Item by ID
const getSaleOrderItemById = async (req, res) => {
  try {
    const item = await saleOrderItemService.getSaleOrderItemById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Sale order item not found' });
    }
    res.status(200).json({ success: true, item });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Update Sale Order Item
const updateSaleOrderItem = async (req, res) => {
  try {
    const updatedItem = await saleOrderItemService.updateSaleOrderItem(req.params.id, req.body);
    if (!updatedItem) {
      return res.status(404).json({ success: false, message: 'Sale order item not found' });
    }
    res.status(200).json({ success: true, item: updatedItem, message: 'Sale order item updated successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Delete Sale Order Item by ID
const deleteSaleOrderItem = async (req, res) => {
  try {
    const deletedItem = await saleOrderItemService.deleteSaleOrderItem(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ success: false, message: 'Sale order item not found' });
    }
    res.status(200).json({ success: true, message: 'Sale order item deleted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Update Specific Sale Order Items
const updateSpecificSOItems = async (req, res) => {
  try {
    const updatedItems = await saleOrderItemService.updateSpecificSaleOrderItems(req.params.id, req.body);

    res.json({
      success: true,
      items: updatedItems,
      message: `Specific items for SO ID ${req.params.id} updated successfully!`,
    });
  } catch (error) {
    console.error("Error updating specific SO items:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const verifyItemInSaleOrder = async (req, res) => {
  try {
    const {so_id, isVerified, isVerifiedBy } = req.body;

    if (!Array.isArray(isVerified) || !isVerifiedBy) {
      return res.status(400).json({ success: false, message: "Invalid payload" });
    }

    const result = await saleOrderItemService.verifySaleOrderItems(so_id,isVerified, isVerifiedBy);
  console.log("result/*/*/*/*//*/*/*/*/*/*/*/*/*/*/*/*",result?.success)
    res.status(200).json({
      success: result?.success,
      message: result?.message ? result?.message : 'Verification update successful.',
      verifiedItems: result.verifiedItemsCount,
      unverifiedItems: result.unverifiedItemsCount,
      totalItems: result.totalSOItems,
      verifiedBy: result.verifiedBy
    });
  } catch (error) {
    console.error("Error verifying sale order items:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// getSaleOrderItemsBySOId
const getSaleOrderItemsBySOId = async (req, res) => {
  try {
    const saleOrders = await saleOrderItemService.getSaleOrderItemsBySOId(req.params.id);
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
  createSaleOrderItem,
  getSaleOrderItems,
  getSaleOrderItemById,
  updateSaleOrderItem,
  deleteSaleOrderItem,
  updateSpecificSOItems,
  verifyItemInSaleOrder,
  getSaleOrderItemsBySOId
};
