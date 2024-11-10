const express = require("express");
const router = express.Router();
const { foodController } = require("../../../controllers"); // Adjust the path as necessary
const multer = require("multer");

const { Authentication } = require("../../../middleware");

// Save Image
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "images"); // Directory where images will be stored
        },
        filename: function (req, file, cb) {
            console.log(file); // Logging the file info for debugging
            cb(null, file.originalname); // Keeping the original name
            // You can uncomment the line below to append a timestamp to the filename
            // cb(null, file.originalname + "-" + Date.now() + ".jpg");
        },
    }),
}).fields([
    { name: 'image', maxCount: 1 } // Allow only one image file
]);

// Routes for food operations
router.post("/create-food", Authentication, upload, foodController.createFood); // Route for creating a food item
router.get("/food-list", Authentication, foodController.getFoodItems); // Route for getting all food items
router.put("/update-food/:id", Authentication, upload, foodController.updateFood); // Route for updating a food item
router.delete("/delete-food/:id", Authentication, foodController.deleteFood); // Route for deleting a food item
router.get("/food-itemid/:id",  foodController.getFoodByRestaurantId); // Route for getting all food items
router.get("/food-item/:id",  foodController.getFoodById); 

module.exports = router;
