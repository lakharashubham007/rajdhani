// routes.js
const express = require("express");
const multer = require("multer");
const { bulkimportController } = require("../../../controllers");
const router = express.Router();

// Configure Multer for file uploads
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => cb(null, "uploads"),
        filename: (req, file, cb) => cb(null, file.originalname)
    })
}).single("file");

// Route for bulk import of products
router.post("/bulk-import", upload, bulkimportController.bulkImport);

module.exports = router;