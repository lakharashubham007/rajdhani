const express = require("express");
const router = express.Router();
const { gatePassItemsController } = require("../../../controllers");

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

router.post("/create-gatepass-items",  Authentication,  gatePassItemsController.createGatePassItems );
router.get("/gatepass-items/:id",  Authentication,  gatePassItemsController.getGatePassItems );
// router.post("/save-gatepass-items",  Authentication,  gatePassItemsController.savePackingItems );

// router.get("/get-rejected-items/:id",  Authentication,  inventoryRejectionItemsController.getInventoryRejectedItems );

module.exports = router; 