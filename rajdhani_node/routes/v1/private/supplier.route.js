const express = require("express");
const router = express.Router();
const { supplierController } = require("../../../controllers");
const multer = require("multer");
const { Authentication, Authorization } = require("../../../middleware");

// Multer setup for file uploads
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => cb(null, "images"),
        filename: (req, file, cb) => cb(null, file.originalname),
    }),
}).fields([{ name: "image", maxCount: 1 }]);

router.post("/create-supplier", upload, Authentication, Authorization, supplierController.createSupplier);
router.get("/supplier-list", Authentication, Authorization, supplierController.getSuppliers);
router.get("/all-suppliers", Authentication, supplierController.getAllSuppliers);
router.patch("/edit-supplier/:id", upload, Authentication, Authorization, supplierController.updateSupplier);
router.get("/supplier-list/:id", Authentication, Authorization, supplierController.getSupplierById);
router.delete("/delete-supplier/:id", Authentication, Authorization, supplierController.deleteSupplier);
router.patch("/update-supplier-status/:id", Authentication, supplierController.updateSupplierStatus);

module.exports = router;
