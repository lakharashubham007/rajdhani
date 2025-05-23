const express = require("express");
const router = express.Router();
const { productsController } = require("../../../controllers");
const multer = require("multer");
const { Authentication, Authorization } = require("../../../middleware");

// Configure multer for image and gallery uploads
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "images");
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        },
    }),
}).fields([
    { name: 'image', maxCount: 1 },
    { name: 'gallery', maxCount: 10 } // Allow multiple images for the gallery
]);

// Routes for Product Operations
router.post("/create-product", upload, Authentication,Authorization,productsController.createProduct);
router.get("/get-products", Authentication, Authorization, productsController.getProducts);
router.get("/get-all-products", Authentication, productsController.getAllProducts);
router.get("/get-products/:id", Authentication, Authorization, productsController.getProductById);
router.get("/get-product-details/:id", productsController.getProductByQrScannerCode);

router.patch("/edit-product/:id", upload, Authentication, Authorization, productsController.updateProduct);
router.delete("/delete-product/:id", Authentication, Authorization, productsController.deleteProduct);
router.patch("/update-product-status/:id", Authentication, productsController.updateProductStatus);
router.get('/generateqr/:id', productsController.generateQrForProduct);
router.get("/search",  productsController.searchProducts)
router.get("/simibrands",  productsController.getSimilarProducts)
router.get("/hoseassembly",  productsController.getSimilarHoseAssemblyItem)



module.exports = router;
