const express = require("express");
const router = express.Router();
const { designController } = require("../../../controllers");

const multer = require("multer");
const { Authentication, Authorization } = require("../../../middleware");

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

router.post("/create-design",  Authentication,  designController.createDesign );
router.get("/design-list", Authentication,  designController.getDesigns);
router.get("/designs", Authentication,  designController.getAllDesigns);
router.patch("/edit-design/:id",upload, Authentication,  designController.updateDesign);
router.get("/design-list/:id", Authentication,  designController.getDesignById);
router.delete("/delete-design/:id", Authentication,  designController.deleteDesign);
router.patch("/update-design-status/:id", Authentication, designController.updateDesignStatus);

module.exports = router; 