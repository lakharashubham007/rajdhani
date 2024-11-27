const express = require("express");
const router = express.Router();
const { purchaseOrderController, purchaseOrderItemController } = require("../../../controllers");
const multer = require("multer");
const { Authentication, Authorization } = require("../../../middleware");

// Save Image (if needed for any file upload, modify as per requirement)
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "images");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
}).fields([{ name: "image", maxCount: 1 }]);

router.post("/create-purchase-order", Authentication, Authorization, purchaseOrderController.createPurchaseOrder);
router.get("/purchase-order-list", Authentication, Authorization, purchaseOrderController.getPurchaseOrders);
router.get("/purchase-orders", Authentication, purchaseOrderController.getAllPurchaseOrders);
router.get("/purchase-order-list/:id", Authentication, Authorization, purchaseOrderController.getPurchaseOrderById);
router.patch("/edit-purchase-order/:id", Authentication, Authorization, purchaseOrderController.updatePurchaseOrder);
router.delete("/delete-purchase-order/:id", Authentication, Authorization, purchaseOrderController.deletePurchaseOrder);

router.patch("/update-po-status/:id", Authentication, Authorization, purchaseOrderController.updatePurchaseOrderStatus);


//PO Items
router.post("/create-po-item", Authentication,  purchaseOrderItemController.createPurchaseOrderItem);
router.get("/po-items/:id", Authentication,  purchaseOrderItemController.getPurchaseOrderItemById);
router.get("/po-items", Authentication,  purchaseOrderItemController.getPurchaseOrderItems);
router.put('/update-po-items/:id',Authentication,purchaseOrderItemController.updateSpecificPOItems);


module.exports = router;
