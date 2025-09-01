const express = require("express");
const router = express.Router();
const { inventoryItemsLogController } = require("../../../controllers");

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

router.post("/create-item-log",  Authentication,  inventoryItemsLogController.createInventoryLog );
router.post('/update-qty-with-log',Authentication, inventoryItemsLogController.bulkLogAndUpdateInventory); //assign and reserve qty
router.post("/update-stock-transfer-qty", Authentication, inventoryItemsLogController.bulkStockJournalLogAndUpdateInventory);
router.get("/get-items-log", Authentication, inventoryItemsLogController.getInventoryItemLogsByItemAndSo);
router.get("/get-inventory-items-log", Authentication, inventoryItemsLogController.getInventoryItemLogs);
router.get("/get-packing-orders", Authentication, inventoryItemsLogController.getUniqueSOIdsWithDetails);
router.get("/get-packing-items/:id", Authentication, inventoryItemsLogController.getPackingItemsBySoId);
router.post("/update-final-inventory-qty", Authentication, inventoryItemsLogController.bulkLogAndUpdateInventory);


// router.get("/items-inventory",  Authentication,  inventoryItemsLogController.getAllInventories );
// router.get("/batch-list", Authentication,   inventoryController.getAllInventories);
// router.get("/batchs", Authentication,  inventoryController.getAllInventories);
// router.patch("/edit-batch/:id", Authentication,  inventoryController.updateInventory);
// router.get("/batch-list/:id", Authentication,   inventoryController.getInventoryById);
// router.delete("/delete-batch/:id", Authentication,   inventoryController.deleteInventory);
// router.patch("/update-batch-status/:id", Authentication, inventoryController.updateInventory);
// router.get("/check/:product_id", Authentication,inventoryController.checkProductInInventory); // Check product in inventory
// router.post("/check-products", Authentication, inventoryController.checkProductsInInventory); // Check multiple products in inventory
// //filter
// router.get("/filter-inventory", inventoryController.getFilteredInventories);

module.exports = router; 