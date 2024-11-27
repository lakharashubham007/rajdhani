const express = require('express');
const router = express.Router();
const {purchaseOrderBillController, purchaseOrderBillItemController} = require('../../../controllers');
const multer = require('multer');
const { Authentication, Authorization } = require('../../../middleware');

// Save Image (if needed for any file upload, modify as per requirement)

// Save any file (image, pdf, etc.)
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images'); // You can change 'uploads' to a desired directory for storing files
    },
    filename: function (req, file, cb) {
      // Store original file name
      cb(null,file.originalname); // Prefix with timestamp to avoid filename conflicts
    },
  }),
  fileFilter: function (req, file, cb) {
    // Optional: Limit file types to a specific set (e.g., images, PDFs)
    const allowedFileTypes = /jpeg|jpg|png|gif|pdf|docx|xlsx|csv/; // Modify as needed
    const mimeType = allowedFileTypes.test(file.mimetype);
    if (mimeType) {
      cb(null, true);
    } else {
      cb(new Error('File type not allowed!'), false); // Reject file if not allowed
    }
  },
}).fields([{ name: 'bill_doc', maxCount: 1 }, { name: 'bill_doc', maxCount: 5 }]); // Allow multiple files, e.g., up to 5


// Create a Purchase Order Bill
router.post('/create-po-bill', Authentication, upload, purchaseOrderBillController.createPurchaseOrderBill);
//check bills
router.get('/check-bill/:id', Authentication, purchaseOrderBillController.checkBill);
//download bill pdf or image
router.get('/download-bill/:id', purchaseOrderBillController.downloadBillFileController);
//pob items

//Create
router.post('/create-pob-item', Authentication, purchaseOrderBillItemController.createPurchaseOrderBillItem);




// Get all Purchase Order Bills
router.get('/purchase-order-bills', Authentication, purchaseOrderBillController.getAllPurchaseOrderBills);

// Get Purchase Order Bill by ID
router.get('/purchase-order-bill/:id', Authentication, Authorization, purchaseOrderBillController.getPurchaseOrderBillById);

// Update a Purchase Order Bill
router.patch('/edit-purchase-order-bill/:id', Authentication, Authorization, upload, purchaseOrderBillController.updatePurchaseOrderBill);

// Delete a Purchase Order Bill
router.delete('/delete-purchase-order-bill/:id', Authentication, Authorization, purchaseOrderBillController.deletePurchaseOrderBill);




//PO bill items
router.get('/po-bill-items/:id', Authentication,  purchaseOrderBillItemController.getPurchaseOrderBillItemsByBillId);
router.get('/po-bill-items', Authentication,  purchaseOrderBillItemController.getPurchaseOrderBillItems);
// Define the route to get return items by bill_id
router.get('/return-orders/:id',Authentication, purchaseOrderBillItemController.getReturnItemsByBillId);
router.get("/return-order-bills", purchaseOrderBillItemController.getDistinctBillsAndPOsWithDetails);


module.exports = router;
