const { PurchaseOrderBillItem } = require("../models");

// Create a new PurchaseOrderBillItem
const createPurchaseOrderBillItem = async (data) => {
  try {
    return await PurchaseOrderBillItem.create(data);
  } catch (error) {
    console.error("Error creating PurchaseOrderBillItem:", error);
    throw error;
  }
};

// Get all PurchaseOrderBillItems
const getPurchaseOrderBillItems = async () => {
  try {
    return await PurchaseOrderBillItem.find();
  } catch (error) {
    console.error("Error getting PurchaseOrderBillItems:", error);
    throw error;
  }
};

// Get PurchaseOrderBillItems by Bill ID
const getPurchaseOrderBillItemsByBillId = async (billId) => {
  try {
    return await PurchaseOrderBillItem.find({ bill_id: billId });
  } catch (error) {
    console.error("Error getting PurchaseOrderBillItems by Bill ID:", error);
    throw error;
  }
};

// Update a specific PurchaseOrderBillItem
const updatePurchaseOrderBillItem = async (id, updateData) => {
  try {
    return await PurchaseOrderBillItem.findByIdAndUpdate(id, updateData, { new: true });
  } catch (error) {
    console.error("Error updating PurchaseOrderBillItem:", error);
    throw error;
  }
};

// Delete a specific PurchaseOrderBillItem
const deletePurchaseOrderBillItem = async (id) => {
  try {
    return await PurchaseOrderBillItem.findByIdAndDelete(id);
  } catch (error) {
    console.error("Error deleting PurchaseOrderBillItem:", error);
    throw error;
  }
};

// Service function to get return items by bill_id and populate details for bill_id and po_id
const getReturnItemsByBillIdWithDetails = async (bill_id) => {
  try {
    // Query the database for items with the specified bill_id and return_item true
    // Populate the related bill_id and po_id fields (if needed)
    const returnItems = await PurchaseOrderBillItem.find({
      bill_id: bill_id,
      return_item: true
    })
    .populate('bill_id')  // Populate the related PurchaseOrderBill details (if you need more details)
    .populate('po_id');   // Populate the related PurchaseOrder details (if you need more details)

    return returnItems;
  } catch (error) {
    console.error("Error fetching return items from database:", error);
    throw error;
  }
};

const getDistinctBillsAndPOsWithDetails = async () => {
  try {
    // Fetch unique combinations of bill_id and po_id with details populated
    const distinctEntries = await PurchaseOrderBillItem.aggregate([
      {
        $match: {
          return_item: true, // Include only rows with "return_item: true"
        },
      },
      {
        $group: {
          _id: { bill_id: "$bill_id", po_id: "$po_id" },
        },
      },
      {
        $lookup: {
          from: "purchaseorders", // Collection name for related `po_id` data
          localField: "_id.po_id",
          foreignField: "_id",
          as: "po_details",
        },
      },
      {
        $lookup: {
          from: "purchaseorderbills", // Collection name for related `bill_id` data
          localField: "_id.bill_id",
          foreignField: "_id",
          as: "bill_details",
        },
      },
      {
        $project: {
          _id: 0,
          bill_id: "$_id.bill_id",
          po_id: "$_id.po_id",
          po_details: { $arrayElemAt: ["$po_details", 0] }, // Extract the first matching po_detail
          bill_details: { $arrayElemAt: ["$bill_details", 0] }, // Extract the first matching bill_detail
        },
      },
    ]);

    return distinctEntries;
  } catch (error) {
    throw new Error("Error fetching distinct bills and POs with details: " + error.message);
  }
}

module.exports = {
  createPurchaseOrderBillItem,
  getPurchaseOrderBillItems,
  getPurchaseOrderBillItemsByBillId,
  updatePurchaseOrderBillItem,
  deletePurchaseOrderBillItem,
  getReturnItemsByBillIdWithDetails,
  getDistinctBillsAndPOsWithDetails
};
