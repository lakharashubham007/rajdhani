const express = require("express");
const router = express.Router();
const { fittingSizeController } = require("../../../controllers");

const multer = require("multer");
const { Authentication, Authorization } = require("../../../middleware");

// Save Image (if required for FittingSize)
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "images");
    },
    filename: function (req, file, cb) {
      console.log(file);
      cb(null, file.originalname); // Optionally add timestamp or unique ID for filename
    },
  }),
}).fields([
  { name: 'image', maxCount: 1 } // Adjust based on your needs
]);

// Create a new Fitting Size
router.post("/create-fitting-size", Authentication, Authorization, fittingSizeController.createFittingSize);
router.get("/fitting-size-list", Authentication, Authorization, fittingSizeController.getFittingSizes);
router.get("/all-fitting-sizes", Authentication, fittingSizeController.getAllFittingSizes);
router.get("/fitting-size-list/:id", Authentication, Authorization, fittingSizeController.getFittingSizeById);
router.patch("/edit-fitting-size/:id", Authentication, Authorization, fittingSizeController.updateFittingSize);
router.delete("/delete-fitting-size/:id", Authentication, Authorization, fittingSizeController.deleteFittingSize);
router.patch("/update-fitting-size-status/:id", Authentication, fittingSizeController.updateFittingSizeStatus);


module.exports = router;
