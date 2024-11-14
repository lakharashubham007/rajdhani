const express = require("express");
const router = express.Router();
const { brandsController } = require("../../../controllers");

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

router.post("/create-brand",upload,  Authentication, Authorization, brandsController.createBrand );
router.get("/brand-list", Authentication, Authorization,  brandsController.getBrands);
router.get("/brands", Authentication,  brandsController.getAllBrands);
router.patch("/edit-brand/:id",upload, Authentication, Authorization,  brandsController.updateBrand);
router.get("/brand-list/:id", Authentication, Authorization,  brandsController.getBrandById);
router.delete("/delete-brand/:id", Authentication, Authorization,  brandsController.deleteBrand);
router.patch("/update-brand-status/:id", Authentication, brandsController.updateBrandStatus);

module.exports = router; 