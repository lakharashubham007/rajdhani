const express = require("express");
const router = express.Router();
const { partsController } = require("../../../controllers");

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

router.post("/create-part", upload,  Authentication, Authorization, partsController.createPart);

module.exports = router; 