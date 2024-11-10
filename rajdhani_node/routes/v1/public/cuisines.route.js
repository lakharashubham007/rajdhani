const express = require("express");
const router = express.Router();
const { cuisines } = require("../../../controllers");

const multer = require("multer");

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

router.post("/add/cuisine",upload, cuisines.createCuisine );
router.get("/cusine-list", cuisines.getCuisines);


module.exports = router; 