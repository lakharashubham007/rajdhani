const express = require("express");
const router = express.Router();
const { purchaseOrderController } = require("../../../controllers");
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

module.exports = router;
