const express = require("express");
const router = express.Router();
const { packingItemsController } = require("../../../controllers");

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

router.post("/create-packing-items",  Authentication,  packingItemsController.createPackingItems );
router.get("/packing-approved-items/:id",  Authentication,  packingItemsController.getPackingItems );
router.post("/save-packing-items",  Authentication,  packingItemsController.savePackingItems );

// router.get("/get-rejected-items/:id",  Authentication,  inventoryRejectionItemsController.getInventoryRejectedItems );

module.exports = router; 