const express = require("express");
const router = express.Router();
const { inventoryController } = require("../../../controllers");

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

router.post("/add-item",  Authentication,  inventoryController.addInventory );
router.get("/items-inventory",  Authentication,  inventoryController.getAllInventories );
router.get("/batch-list", Authentication,   inventoryController.getAllInventories);
router.get("/batchs", Authentication,  inventoryController.getAllInventories);
router.patch("/edit-batch/:id", Authentication,  inventoryController.updateInventory);
router.get("/batch-list/:id", Authentication,   inventoryController.getInventoryById);
router.delete("/delete-batch/:id", Authentication,   inventoryController.deleteInventory);
router.patch("/update-batch-status/:id", Authentication, inventoryController.updateInventory);
router.get("/check/:product_id", Authentication,inventoryController.checkProductInInventory); // Check product in inventory
router.post("/check-products", Authentication, inventoryController.checkProductsInInventory); // Check multiple products in inventory
//filter
router.get("/filter-inventory", inventoryController.getFilteredInventories);

module.exports = router; 