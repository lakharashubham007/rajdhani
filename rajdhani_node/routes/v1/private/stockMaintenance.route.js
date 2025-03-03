const express = require("express");
const router = express.Router();
const { stockMaintenanceController } = require("../../../controllers");

const multer = require("multer");
const { Authentication, Authorization } = require("../../../middleware");

// Save Image
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "images");
        },
        filename: function (req, file, cb) {
            console.log(file);
            cb(null, file.originalname);
            // cb(null, file.originalname + "-" + Date.now() + ".jpg")
        },
    }),
}).fields([
    { name: 'image', maxCount: 1 }
]);

router.post("/add-stocks",  Authentication,  stockMaintenanceController.addStockEntry );
router.get("/stcoks-list", Authentication,   stockMaintenanceController.getAllStockEntries);
router.get("/all-stocks", Authentication,  stockMaintenanceController.getAllStockEntries);
router.patch("/edit-batch/:id", Authentication,   stockMaintenanceController.updateStockEntry);
router.get("/batch-list/:id", Authentication,   stockMaintenanceController.getStockEntryById);
router.delete("/delete-batch/:id", Authentication,   stockMaintenanceController.deleteStockEntry);
router.patch("/update-batch-status/:id", Authentication, stockMaintenanceController.updateStockStatus);

module.exports = router; 