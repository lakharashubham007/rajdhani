const { PurchaseOrderItem } = require("../models");
const mongoose = require('mongoose');


const createPurchaseOrderItem = async (data) => {
  try {
    const newItem = await PurchaseOrderItem.create(data);
    return newItem;
  } catch (error) {
    console.error("Error creating purchase order item:", error);
    throw error;
  }
};

const getPurchaseOrderItems = async () => {
  try {
    const items = await PurchaseOrderItem.find();
    return items;
  } catch (error) {
    console.error("Error getting purchase order items:", error);
    throw error;
  }
};

const getPurchaseOrderItemById = async (id) => {
  try {
    const items = await PurchaseOrderItem.find({ po_id: id });
    
    return items;
  } catch (error) {
    console.error("Error getting purchase order item by ID:", error);
    throw error;
  }
};

const updatePurchaseOrderItem = async (id, updateData) => {
  try {
    const updatedItem = await PurchaseOrderItem.findByIdAndUpdate(id, updateData, { new: true });
    return updatedItem;
  } catch (error) {
    console.error("Error updating purchase order item:", error);
    throw error;
  }
};

const deletePurchaseOrderItem = async (id) => {
  try {
    const deletedItem = await PurchaseOrderItem.findByIdAndDelete(id);
    return deletedItem;
  } catch (error) {
    console.error("Error deleting purchase order item:", error);
    throw error;
  }
};


const updateSpecificItems = async (id, itemsToUpdate) => {

  console.log("id is here", id)
  try {
    let updatedItems = [];
   
    for (const item of itemsToUpdate) {
      console.log("all is here",

        { _id: item._id, po_id: id },  // Match document
        { $set: item }, // Update only provided fields
        { new: true }

      )
      const updatedItem = await PurchaseOrderItem.findOneAndUpdate(
        { _id: item._id, po_id: id },  // Match document
        { $set: item }, // Update only provided fields
        { new: true } // Return the updated document
      );

  
  console.log(updatedItem,"updatedItem is her")

      if (updatedItem) {
        updatedItems.push(updatedItem); // Add updated document to the result list
      }
    }
   console.log("updated Successfully")
    return updatedItems; // Return all updated items
  } catch (error) {
    console.error("Error updating specific items:", error);
    throw error;
  }
};


module.exports = {
  createPurchaseOrderItem,
  getPurchaseOrderItems,
  getPurchaseOrderItemById,
  updatePurchaseOrderItem,
  deletePurchaseOrderItem,
  updateSpecificItems
  
};
