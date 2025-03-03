const express = require("express");
const router = express.Router();
const { saleOrderController, saleOrderItemController,saleOrderVerifyController } = require("../../../controllers");
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

router.post("/create-sale-order", Authentication, saleOrderController.createSaleOrder);
router.get("/sale-order-list", Authentication, saleOrderController.getSaleOrders);
router.get("/sale-orders", Authentication, saleOrderController.getAllSaleOrders);
router.get("/sale-order-list/:id", Authentication, saleOrderController.getSaleOrderById);
router.patch("/edit-sale-order/:id", Authentication, saleOrderController.updateSaleOrder);
router.delete("/delete-sale-order/:id", Authentication, saleOrderController.deleteSaleOrder);
router.patch("/update-so-status/:id", Authentication, saleOrderController.updateSaleOrderStatus);


//PO Items
router.post("/create-so-item", Authentication, saleOrderItemController.createSaleOrderItem);
router.get("/so-items/:id", Authentication, saleOrderItemController.getSaleOrderItemById);
router.get("/so-items", Authentication, saleOrderItemController.getSaleOrderItems);
router.put('/update-so-items/:id',Authentication,saleOrderItemController.updateSpecificSOItems);


//verifySellOrder
router.post("/verify-so",Authentication, saleOrderVerifyController.verifySaleOrder)


module.exports = router;
