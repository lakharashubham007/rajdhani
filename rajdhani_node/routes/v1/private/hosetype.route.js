const express = require("express");
const router = express.Router();
const { hosetypeController } = require("../../../controllers");

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

router.post("/create-hosetype",  Authentication, hosetypeController.createHoseType );
router.get("/hosetype-list", Authentication,  hosetypeController.getHoseTypes);
router.get("/hosetype", Authentication,  hosetypeController.getAllHoseTypes);
router.patch("/edit-hosetype/:id", Authentication,  hosetypeController.updateHoseType);
router.get("/:id", Authentication,  hosetypeController.getHoseTypeById);
router.delete("/delete-hosetype/:id", Authentication,  hosetypeController.deleteHoseType);
router.patch("/update-hosetype-status/:id", Authentication, hosetypeController.updateHoseTypeStatus);

module.exports = router; 