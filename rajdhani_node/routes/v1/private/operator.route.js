const express = require("express");
const router = express.Router();
const { operatorController } = require("../../../controllers");

const multer = require("multer");
const { Authentication, Authorization } = require("../../../middleware");

// Save Image
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "images"); // Save images to the 'images' folder
        },
        filename: function (req, file, cb) {
            console.log(file);
            cb(null, file.originalname); // You can customize the filename if needed
        },
    }),
}).fields([
    { name: 'image', maxCount: 1 }
]);

// Operator Routes
router.post("/create-operator", upload, Authentication, operatorController.createOperator);
router.get("/operator-list", Authentication, operatorController.getOperators);
router.get("/operators-all", Authentication, operatorController.getAllOperators);
router.patch("/edit-operator/:id", upload, Authorization, operatorController.updateOperator);
router.get("/operator-list/:id", Authentication, operatorController.getOperatorById);
router.delete("/delete-operator/:id", Authentication, operatorController.deleteOperator);
router.patch("/update-operator-status/:id", Authentication, operatorController.updateOperatorStatus);
router.get("/search", operatorController.searchOperator);

module.exports = router;
