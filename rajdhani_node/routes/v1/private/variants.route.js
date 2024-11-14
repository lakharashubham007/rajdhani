const express = require("express");
const router = express.Router();
const { variantController, variantCategoriesController, variantSubCategoriesController, variantSubSubCategoriesController } = require("../../../controllers");

const multer = require("multer");
const { Authentication, Authorization } = require("../../../middleware");

// Configure Multer for image uploads
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => cb(null, "images"),
        filename: (req, file, cb) => cb(null, file.originalname)
    })
}).fields([{ name: 'image', maxCount: 1 }]);

// Variant routes
router.post("/create-variant", upload, Authentication, Authorization, variantController.createVariant);
router.get("/variant-list", Authentication, Authorization, variantController.getVariants);
router.get("/all-variants", Authentication, variantController.getAllVariants);

router.get("/variant-list/:id", Authentication, Authorization, variantController.getVariantById);
router.patch("/edit-variant/:id", upload, Authentication, Authorization, variantController.updateVariant);
router.delete("/delete-variant/:id", Authentication, Authorization, variantController.deleteVariant);
router.patch("/update-variant-status/:id", Authentication, variantController.updateVariantStatus);

// Variant Category routes
router.post("/create-variant-category", Authentication, Authorization, variantCategoriesController.createVariantCategory);
router.get("/variant-category-list", Authentication, Authorization, variantCategoriesController.getVariantCategories);
router.get("/variant-category/:id", Authentication, Authorization, variantCategoriesController.getVariantCategoryById);
router.patch("/edit-variant-category/:id", Authentication, Authorization, variantCategoriesController.updateVariantCategory);
router.delete("/delete-variant-category/:id", Authentication, Authorization, variantCategoriesController.deleteVariantCategory);

// Variant Subcategory routes
router.post("/create-variant-subcategory", Authentication, Authorization, variantSubCategoriesController.createVariantSubCategory);
router.get("/variant-subcategory-list", Authentication, Authorization, variantSubCategoriesController.getVariantSubCategories);
router.get("/variant-subcategory/:id", Authentication, Authorization, variantSubCategoriesController.getVariantSubCategoryById);
router.patch("/edit-variant-subcategory/:id", Authentication, Authorization, variantSubCategoriesController.updateVariantSubCategory);
router.delete("/delete-variant-subcategory/:id", Authentication, Authorization, variantSubCategoriesController.deleteVariantSubCategory);

// Variant Sub-Subcategory routes
router.post("/create-variant-subsubcategory", Authentication, Authorization, variantSubSubCategoriesController.createVariantSubSubCategory);
router.get("/variant-subsubcategory-list", Authentication, Authorization, variantSubSubCategoriesController.getVariantSubSubCategories);
router.get("/variant-subsubcategory/:id", Authentication, Authorization, variantSubSubCategoriesController.getVariantSubSubCategoryById);
router.patch("/edit-variant-subsubcategory/:id", Authentication, Authorization, variantSubSubCategoriesController.updateVariantSubSubCategory);
router.delete("/delete-variant-subsubcategory/:id", Authentication, Authorization, variantSubSubCategoriesController.deleteVariantSubSubCategory);

module.exports = router;
