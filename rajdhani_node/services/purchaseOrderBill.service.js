const {PurchaseOrderBill} = require('../models');
const path = require('path');
const fs = require('fs');

// Create a new Purchase Order Bill
const createPurchaseOrderBill = async (data, file) => {
  try {
    const newBill = await PurchaseOrderBill.create({...data, bill_doc: file});
    return newBill;
  } catch (error) {
    console.error("Error creating purchase order bill:", error);
    throw error;
  }
};

// Get all Purchase Order Bills
const getAllPurchaseOrderBills = async () => {
  try {
    const bills = await PurchaseOrderBill.find().populate('purchase_order_id');
    return bills;
  } catch (error) {
    console.error("Error fetching purchase order bills:", error);
    throw error;
  }
};

// Get Purchase Order Bill by ID
const getPurchaseOrderBillById = async (id) => {
  try {
    const bill = await PurchaseOrderBill.findById(id).populate('purchase_order_id');
    return bill;
  } catch (error) {
    console.error("Error fetching purchase order bill:", error);
    throw error;
  }
};

// Update a Purchase Order Bill
const updatePurchaseOrderBill = async (id, updateData) => {
  try {
    const updatedBill = await PurchaseOrderBill.findByIdAndUpdate(id, updateData, { new: true });
    return updatedBill;
  } catch (error) {
    console.error("Error updating purchase order bill:", error);
    throw error;
  }
};

// Delete a Purchase Order Bill
const deletePurchaseOrderBill = async (id) => {
  try {
    const deletedBill = await PurchaseOrderBill.findByIdAndDelete(id);
    return deletedBill;
  } catch (error) {
    console.error("Error deleting purchase order bill:", error);
    throw error;
  }
};

// Service to check for bills by purchase_order_id
const checkBillsByPurchaseOrderId = async (id) => {
  try {
    // Find bills by the given purchase_order_id
    const bills = await PurchaseOrderBill.find({ purchase_order_id: id });
    
    return bills;
  } catch (error) {
    console.error("Error in service while checking bills:", error);
    throw error;
  }
};

const downloadBillFile = async (bill_id) => {
  try {
    
    // Find the bill document using the bill_id
    const bill = await PurchaseOrderBill.findOne({ bill_id: bill_id });

    
    if (!bill) {
      throw new Error('Bill not found');
    }

    // Get the file path from the bill document (assuming the file is stored in 'images' directory)
    const filePath = path.join(__dirname, '../images', bill.bill_doc);
    

   

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      throw new Error('File not found on server');
    }

    return filePath;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getPurchaseOrderBillItemsByFilter = async (filter) => {
  try {
    return await PurchaseOrderBillItem.find(filter);
  } catch (error) {
    console.error("Error fetching PurchaseOrderBillItems by filter:", error);
    throw error;
  }
};



module.exports = {
  createPurchaseOrderBill,
  getAllPurchaseOrderBills,
  getPurchaseOrderBillById,
  updatePurchaseOrderBill,
  deletePurchaseOrderBill,
  checkBillsByPurchaseOrderId,
  downloadBillFile,
  getPurchaseOrderBillItemsByFilter
};
