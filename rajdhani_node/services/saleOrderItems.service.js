const { SaleOrderItem } = require("../models");
// const mongoose = require("mongoose");

// Create a new Sale Order Item
const createSaleOrderItem = async (data) => {
  try {
    const newItem = await SaleOrderItem.create(data);
    return newItem;
  } catch (error) {
    console.error("Error creating sale order item:", error);
    throw error;
  }
};

// Get all Sale Order Items
const getSaleOrderItems = async () => {
  try {
    const items = await SaleOrderItem.find();
    return items;
  } catch (error) {
    console.error("Error getting sale order items:", error);
    throw error;
  }
};

// Get Sale Order Items by Sale Order ID
const getSaleOrderItemById = async (id) => {
  try {
    const items = await SaleOrderItem.find({ so_id: id });
    return items;
  } catch (error) {
    console.error("Error getting sale order item by ID:", error);
    throw error;
  }
};

// Update a Sale Order Item by ID
const updateSaleOrderItem = async (id, updateData) => {
  try {
    const updatedItem = await SaleOrderItem.findByIdAndUpdate(id, updateData, { new: true });
    return updatedItem;
  } catch (error) {
    console.error("Error updating sale order item:", error);
    throw error;
  }
};

// Delete a Sale Order Item by ID
const deleteSaleOrderItem = async (id) => {
  try {
    const deletedItem = await SaleOrderItem.findByIdAndDelete(id);
    return deletedItem;
  } catch (error) {
    console.error("Error deleting sale order item:", error);
    throw error;
  }
};

// Update Specific Sale Order Items
const updateSpecificSaleOrderItems = async (id, itemsToUpdate) => {
  try {
    let updatedItems = [];

    for (const item of itemsToUpdate) {
      const updatedItem = await SaleOrderItem.findOneAndUpdate(
        { _id: item._id, so_id: id }, // Match document
        { $set: item }, // Update only provided fields
        { new: true } // Return the updated document
      );

      if (updatedItem) {
        updatedItems.push(updatedItem); // Add updated document to the result list
      }
    }
    return updatedItems; // Return all updated items
  } catch (error) {
    console.error("Error updating specific sale order items:", error);
    throw error;
  }
};

module.exports = {
  createSaleOrderItem,
  getSaleOrderItems,
  getSaleOrderItemById,
  updateSaleOrderItem,
  deleteSaleOrderItem,
  updateSpecificSaleOrderItems
};
