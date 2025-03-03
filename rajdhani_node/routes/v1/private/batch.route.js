const express = require("express");
const router = express.Router();
const { batchController } = require("../../../controllers");

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

router.post("/create-batch",  Authentication,  batchController.createBatch );
router.get("/batch-list", Authentication,   batchController.getBatches);
router.get("/batchs", Authentication,  batchController.getAllBatches);
router.patch("/edit-batch/:id", Authentication, Authorization,  batchController.updateBatch);
router.get("/batch-list/:id", Authentication,   batchController.getBatchById);
router.delete("/delete-batch/:id", Authentication,   batchController.deleteBatch);
router.patch("/update-batch-status/:id", Authentication, batchController.updateBatchStatus);

module.exports = router; 