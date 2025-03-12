const express = require("express");
const router = express.Router();
const { productCodeSeriesController } = require("../../../controllers");

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

router.post("/create-series",  productCodeSeriesController.createProductCodeSeries );
router.get("/series-list", Authentication,   productCodeSeriesController.getAllProductCodeSeries);
// router.get("/batchs", Authentication,  productCodeSeriesController.getAllBatches);
// router.patch("/edit-batch/:id", Authentication, Authorization,  productCodeSeriesController.updateBatch);
// router.get("/batch-list/:id", Authentication,   productCodeSeriesController.getBatchById);
// router.delete("/delete-batch/:id", Authentication,   productCodeSeriesController.deleteBatch);
// router.patch("/update-batch-status/:id", Authentication, productCodeSeriesController.updateBatchStatus);

module.exports = router; 