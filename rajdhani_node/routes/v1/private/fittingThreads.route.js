const express = require("express");
const router = express.Router();
const { fittingThreadsController } = require("../../../controllers");

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

router.post("/create-fitting-thread",  Authentication,  fittingThreadsController.createFittingThread );
router.get("/fitting-threads-list", Authentication,  fittingThreadsController.getFittingThreads);
router.get("/fitting-threads", Authentication,  fittingThreadsController.getAllFittingThreads);
router.patch("/edit-fitting-thread/:id",upload, Authentication,  fittingThreadsController.updateFittingThread);
router.get("/fitting-thread/:id", Authentication,  fittingThreadsController.getFittingThreadById);
router.delete("/delete-fitting-threads/:id", Authentication,  fittingThreadsController.deleteFittingThread);
router.patch("/update-ft-status/:id", Authentication, fittingThreadsController.updateFittingThreadStatus);

module.exports = router; 