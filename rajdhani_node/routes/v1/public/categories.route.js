const express = require("express");
const router = express.Router();
const {  categoriesController } = require("../../../controllers");
const multer = require("multer");

const { Authentication } = require("../../../middleware");

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

router.post("/create-categories",Authentication, upload, categoriesController.createCategory );
router.get("/categories-list", Authentication, categoriesController.getCategories);
router.post("/create-subcategory",Authentication, categoriesController.createSubCategory );

module.exports = router; 