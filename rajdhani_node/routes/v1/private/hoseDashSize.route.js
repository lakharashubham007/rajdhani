const express = require("express");
const router = express.Router();
const { hoseDashSizeController } = require("../../../controllers");

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

router.post("/create-hosedashsize",  Authentication,  hoseDashSizeController.createHoseDashSize );
router.get("/hosedashsize-list", Authentication,  hoseDashSizeController.getHoseDashSizes);
router.get("/hosedashsizes", Authentication,  hoseDashSizeController.getAllHoseDashSizes);
router.patch("/edit-hosedashsize/:id", Authentication,  hoseDashSizeController.updateHoseDashSize);
router.get("/:id", Authentication,  hoseDashSizeController.getHoseDashSizeById);
router.delete("/delete-hosedashsize/:id", Authentication,  hoseDashSizeController.deleteHoseDashSize);
router.patch("/update-hosedashsize-status/:id", Authentication, hoseDashSizeController.updateHoseDashSizeStatus);

module.exports = router; 