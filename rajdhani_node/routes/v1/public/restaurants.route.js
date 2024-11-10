const express = require("express");
const router = express.Router();
const { restaurantController } = require("../../../controllers");
const multer = require("multer");
const { Authentication } = require("../../../middleware");

// Multer configuration to save both logo and cover images
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "images"); // Destination folder for images
        },
        filename: function (req, file, cb) {
            console.log(file);
            cb(null, file.originalname); // Use original file name
        },
    }),
}).fields([
    { name: 'logo', maxCount: 1 },  // Upload for logo
    { name: 'cover', maxCount: 1 }  // Upload for cover image
]);

// Routes for handling restaurants
router.post("/add/restaurants", upload, restaurantController.createRestaurant);
router.get("/restaurant-list", restaurantController.getRestaurants);
router.get("/restaurant-list/:id", restaurantController.getRestaurantById);


module.exports = router;
