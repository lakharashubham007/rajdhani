const { purchaseOrderItemService } = require("../services");

// Create a new Purchase Order Item
const createPurchaseOrderItem = async (req, res) => {
  try {
    const newItem = await purchaseOrderItemService.createPurchaseOrderItem(req.body);
    res.status(201).json({ success: true, po_items: newItem, message: 'Purchase order item created successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Get all Purchase Order Items
const getPurchaseOrderItems = async (req, res) => {
  try {
    const items = await purchaseOrderItemService.getPurchaseOrderItems();
    res.status(200).json({ success: true, items });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Get Purchase Order Item by ID
const getPurchaseOrderItemById = async (req, res) => {
  try {
    const item = await purchaseOrderItemService.getPurchaseOrderItemById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Purchase order item not found' });
    }
    res.status(200).json({ success: true, item });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Update Purchase Order Item
const updatePurchaseOrderItem = async (req, res) => {
  try {
    const updatedItem = await purchaseOrderItemService.updatePurchaseOrderItem(req.params.id, req.body);
    if (!updatedItem) {
      return res.status(404).json({ success: false, message: 'Purchase order item not found' });
    }
    res.status(200).json({ success: true, item: updatedItem, message: 'Purchase order item updated successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Delete Purchase Order Item by ID
const deletePurchaseOrderItem = async (req, res) => {
  try {
    const deletedItem = await purchaseOrderItemService.deletePurchaseOrderItem(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ success: false, message: 'Purchase order item not found' });
    }
    res.status(200).json({ success: true, message: 'Purchase order item deleted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const updateSpecificPOItems = async (req, res) => {
  try {
    const { po_id } = req.params.id; // Extract PO ID from URL
    // const { items } = req.body; // Extract array of items with specific updates
    
    const updatedItems = await purchaseOrderItemService.updateSpecificItems(req.params.id, req.body);

    res.json({
      success: true,
      items: updatedItems,
      message: `Specific items for PO ID ${req.params.id} updated successfully!`,
    });
  } catch (error) {
    console.error("Error updating specific PO items:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


module.exports = {
  createPurchaseOrderItem,
  getPurchaseOrderItems,
  getPurchaseOrderItemById,
  updatePurchaseOrderItem,
  deletePurchaseOrderItem,
  updateSpecificPOItems
};
