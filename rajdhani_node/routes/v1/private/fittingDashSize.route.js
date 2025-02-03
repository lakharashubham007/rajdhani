const express = require("express");
const router = express.Router();
const { fittingDashSizeController } = require("../../../controllers");

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

router.post("/create-fittingdashsize",  Authentication,  fittingDashSizeController.createFittingDashSize );
router.get("/fittingdashsize-list", Authentication,  fittingDashSizeController.getFittingDashSizes);
router.get("/fittingdashsizes", Authentication,  fittingDashSizeController.getAllFittingDashSizes);
router.patch("/edit-fittingdashsize/:id", Authentication,  fittingDashSizeController.updateFittingDashSize);
router.get("/:id", Authentication,  fittingDashSizeController.getFittingDashSizeById);
router.delete("/delete-fittingdashsize/:id", Authentication,  fittingDashSizeController.deleteFittingDashSize);
router.patch("/update-fittingdashsize-status/:id", Authentication, fittingDashSizeController.updateFittingDashSizeStatus);

module.exports = router; 