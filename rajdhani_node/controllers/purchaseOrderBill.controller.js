const {purchaseOrderBillService} = require('../services');
const fs = require('fs');
const path = require('path');


// Create a new Purchase Order Bill
const createPurchaseOrderBill = async (req, res) => {
  try {
    const billData = req.body;
    
    const file = req.files?.bill_doc[0]?.originalname;

    const newBill = await purchaseOrderBillService.createPurchaseOrderBill(billData,file);
    res.json({ success: true, bill: newBill, message: "Purchase order bill created successfully!" });
  } catch (error) {
    console.error("Error creating purchase order bill:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get all Purchase Order Bills
const getAllPurchaseOrderBills = async (req, res) => {
  try {
    const bills = await purchaseOrderBillService.getAllPurchaseOrderBills();
    res.json({ success: true, bills });
  } catch (error) {
    console.error("Error fetching purchase order bills:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get a single Purchase Order Bill by ID
const getPurchaseOrderBillById = async (req, res) => {
  try {
    const bill = await purchaseOrderBillService.getPurchaseOrderBillById(req.params.id);
    if (!bill) {
      return res.status(404).json({ success: false, message: "Purchase order bill not found" });
    }
    res.json({ success: true, bill });
  } catch (error) {
    console.error("Error fetching purchase order bill by ID:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Update a Purchase Order Bill
const updatePurchaseOrderBill = async (req, res) => {
  try {
    const updateData = req.body;
    if (req.files && req.files.image) {
      updateData.bill_image = req.files.image[0].originalname;
    }
    const updatedBill = await purchaseOrderBillService.updatePurchaseOrderBill(req.params.id, updateData);
    if (!updatedBill) {
      return res.status(404).json({ success: false, message: "Purchase order bill not found" });
    }
    res.json({ success: true, bill: updatedBill, message: "Purchase order bill updated successfully!" });
  } catch (error) {
    console.error("Error updating purchase order bill:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Delete a Purchase Order Bill
const deletePurchaseOrderBill = async (req, res) => {
  try {
    const deletedBill = await purchaseOrderBillService.deletePurchaseOrderBill(req.params.id);
    if (!deletedBill) {
      return res.status(404).json({ success: false, message: "Purchase order bill not found" });
    }
    res.json({ success: true, message: "Purchase order bill deleted successfully!" });
  } catch (error) {
    console.error("Error deleting purchase order bill:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Check if bills are available for a specific Purchase Order ID
const checkBill = async (req, res) => {
  // const { purchase_order_id } = req.params.id;

  try {
    // Call the service to check for bills
    const bills = await purchaseOrderBillService.checkBillsByPurchaseOrderId(req.params.id);

    if (bills.length > 0) {
      res.json({ success: true, bills });
    } else {
      res.json({ success: false, message: 'No bills found for this Purchase Order ID' });
    }
  } catch (error) {
    console.error("Error checking bill:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Controller function to handle file download
const downloadBillFileController = async (req, res) => {
  const { bill_id } = req.params.id;

  try {
    // Call the service to get the file path
    const filePath = await purchaseOrderBillService.downloadBillFile(req.params.id);
   console.log("in conntroller ",filePath)
    // Get the file name from the file path
    const fileName = path.basename(filePath);

    // Set the headers to prompt file download
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);

    // Create a read stream and pipe it to the response to send the file
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } catch (error) {
    console.error("Error downloading the file:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get PurchaseOrderBillItems by Bill ID and PO ID
const getPurchaseOrderBillItemsByBillAndPoId = async (req, res) => {
  try {
    const { billId, poId } = req.query;
    const filter = {};
    if (billId) filter.bill_id = billId;
    if (poId) filter.po_id = poId;

    const items = await purchaseOrderBillService.getPurchaseOrderBillItemsByFilter(filter);
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    console.error("Error fetching PurchaseOrderBillItems:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  createPurchaseOrderBill,
  getAllPurchaseOrderBills,
  getPurchaseOrderBillById,
  updatePurchaseOrderBill,
  deletePurchaseOrderBill,
  checkBill,
  downloadBillFileController,
  getPurchaseOrderBillItemsByBillAndPoId
};
