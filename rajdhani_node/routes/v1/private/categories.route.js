const express = require("express");
const router = express.Router();
const { categoriesController, subcategoriesController, subSubcategoriesController } = require("../../../controllers");

const multer = require("multer");
const { Authentication, Authorization } = require("../../../middleware");

// Configure image upload
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "images");
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        },
    }),
}).fields([{ name: 'image', maxCount: 1 }]);

// Category Routes
router.post("/create-category", upload, Authentication, Authorization, categoriesController.createCategory);
router.get("/category-list", Authentication, Authorization, categoriesController.getCategories);
router.patch("/edit-category/:id", upload, Authentication, Authorization, categoriesController.updateCategory);
router.get("/category-list/:id", Authentication, Authorization, categoriesController.getCategoryById);
router.delete("/delete-category/:id", Authentication, Authorization, categoriesController.deleteCategory);
router.patch("/update-category-status/:id", Authentication, categoriesController.updateCategoryStatus);

// Subcategory Routes
router.post("/create-subcategory", upload, Authentication, Authorization, subcategoriesController.createSubcategory);
router.get("/subcategory-list", Authentication, Authorization, subcategoriesController.getSubcategories);
router.patch("/edit-subcategory/:id", upload, Authentication, Authorization, subcategoriesController.updateSubcategory);
router.get("/subcategory-list/:id", Authentication, Authorization, subcategoriesController.getSubcategoryById);
router.delete("/delete-subcategory/:id", Authentication, Authorization, subcategoriesController.deleteSubcategory);

// SubSubcategory Routes
router.post("/create-subsubcategory", upload, Authentication, Authorization, subSubcategoriesController.createSubSubcategory);
router.get("/subsubcategory-list", Authentication, Authorization, subSubcategoriesController.getSubSubcategories);
router.patch("/edit-subsubcategory/:id", upload, Authentication, Authorization, subSubcategoriesController.updateSubSubcategory);
router.get("/subsubcategory-list/:id", Authentication, Authorization, subSubcategoriesController.getSubSubcategoryById);
router.delete("/delete-subsubcategory/:id", Authentication, Authorization, subSubcategoriesController.deleteSubSubcategory);

module.exports = router;


// const express = require("express");
// const router = express.Router();
// const {  categoriesController } = require("../../../controllers");
// const multer = require("multer");

// const { Authentication, Authorization } = require("../../../middleware");

// // Save Image
// const upload = multer({
//     storage: multer.diskStorage({
//         destination: function (req, file, cb) {
//             cb(null, "images");
//         },
//         filename: function (req, file, cb) {
//             console.log(file);
//             cb(null, file.originalname);
//             // cb(null, file.originalname + "-" + Date.now() + ".jpg")
//         },
//     }),
// }).fields([
//     { name: 'image', maxCount: 1 }
// ]);

// router.post("/create-categories",Authentication,Authorization, upload, categoriesController.createCategory );
// router.get("/categories-list", Authentication, categoriesController.getCategories);
// router.post("/create-subcategory",Authentication, categoriesController.createSubCategory );

// module.exports = router; 