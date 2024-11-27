const { purchaseOrderBillItemService } = require("../services");

// Create a new PurchaseOrderBillItem
const createPurchaseOrderBillItem = async (req, res) => {
  try {
    const itemsData = req.body;

    // Loop through each item in the request body and set return_item
    const updatedItems = itemsData.map(item => {
      // Calculate return_item: If received_quantity - verified_quantity > 0, return_item is true
      item.return_item = item.received_quantity - item.verified_quantity > 0;

      // Calculate return_quantity: If return_item is true, return_quantity is the difference between received and verified quantities
      item.return_quantity = item.return_item ? (item.received_quantity - item.verified_quantity) : 0;

      return item;
    });

    const newItem = await purchaseOrderBillItemService.createPurchaseOrderBillItem(updatedItems);
    res.status(201).json({ success: true, bill_items: newItem, message: "PurchaseOrderBillItem created successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get all PurchaseOrderBillItems
const getPurchaseOrderBillItems = async (req, res) => {
  try {
    const items = await purchaseOrderBillItemService.getPurchaseOrderBillItems();
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get PurchaseOrderBillItems by Bill ID
const getPurchaseOrderBillItemsByBillId = async (req, res) => {
  try {
    const items = await purchaseOrderBillItemService.getPurchaseOrderBillItemsByBillId(req.params.id);
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Update a specific PurchaseOrderBillItem
const updatePurchaseOrderBillItem = async (req, res) => {
  try {
    const updatedItem = await purchaseOrderBillItemService.updatePurchaseOrderBillItem(req.params.id, req.body);
    res.status(200).json({ success: true, data: updatedItem, message: "PurchaseOrderBillItem updated successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Delete a specific PurchaseOrderBillItem
const deletePurchaseOrderBillItem = async (req, res) => {
  try {
    const deletedItem = await purchaseOrderBillItemService.deletePurchaseOrderBillItem(req.params.id);
    res.status(200).json({ success: true, message: "PurchaseOrderBillItem deleted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Controller to handle the GET request for return items by bill_id
const getReturnItemsByBillId = async (req, res) => {

  try {
    // Call service method to fetch return items with populated details
    const returnItems = await purchaseOrderBillItemService.getReturnItemsByBillIdWithDetails(req.params.id);

    if (returnItems.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No return items found for this bill_id"
      });
    }

    // Extract the bill_id and po_id from the first item (as they are the same for all items)
    const { bill_id: populatedBillId, po_id: populatedPoId } = returnItems[0];

    // Format the response
    const response = {
      bill_details: populatedBillId,
      po_details: populatedPoId,
      return_order_items: returnItems
    };

    // Send the formatted response
    res.status(200).json({
      success: true,
      data: response
    });
  } catch (error) {
    console.error("Error fetching return items:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};


const getDistinctBillsAndPOsWithDetails = async (req, res) => {
  try {
    const distinctEntries = await purchaseOrderBillItemService.getDistinctBillsAndPOsWithDetails();
    res.status(200).json({
      success: true,
      data: distinctEntries,
      message: "Distinct bills and POs with details fetched successfully!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch distinct bills and POs with details",
    });
  }
};


module.exports = {
  createPurchaseOrderBillItem,
  getPurchaseOrderBillItems,
  getPurchaseOrderBillItemsByBillId,
  updatePurchaseOrderBillItem,
  deletePurchaseOrderBillItem,
  getReturnItemsByBillId,
  getDistinctBillsAndPOsWithDetails
};
