const express = require("express");
const router = express.Router();
const { brandlaylineController } = require("../../../controllers");

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

router.post("/create-brandlayline",  Authentication, brandlaylineController.createBrandLayLine );
router.get("/brandlayline-list", Authentication,  brandlaylineController.getBrandLayLines);
router.get("/brandlayline", Authentication,  brandlaylineController.getAllBrandLayLines);
router.patch("/edit-brandlayline/:id", Authentication,  brandlaylineController.updateBrandLayLine);
router.get("/:id", Authentication,  brandlaylineController.getBrandLayLineById);
router.delete("/delete-brandlayline/:id", Authentication,  brandlaylineController.deleteBrandLayLine);
router.patch("/update-brandlayline-status/:id", Authentication, brandlaylineController.updateBrandLayLineStatus);

module.exports = router; 