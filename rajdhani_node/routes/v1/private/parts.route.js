const express = require("express");
const router = express.Router();
const { partsController } = require("../../../controllers");
const multer = require("multer");
const { Authentication, Authorization } = require("../../../middleware");

// Save Image
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
  { name: 'gallery', maxCount: 10 },
]);

// Routes for Parts
router.post("/create-part", upload, Authentication, Authorization, partsController.createPart);
router.get("/parts-list", Authentication, Authorization, partsController.getParts);
router.get("/part", Authentication,  partsController.getAllParts);
router.get("/parts-list/:id", Authentication, Authorization, partsController.getPartById);
router.patch("/edit-part/:id", upload, Authentication, Authorization, partsController.updatePart);
router.patch("/update-part-status/:id", Authentication,  partsController.updatePartStatus);
router.delete("/delete-part/:id", Authentication, Authorization, partsController.deletePart);

module.exports = router;


// const express = require("express");
// const router = express.Router();
// const { partsController } = require("../../../controllers");

// const multer = require("multer");
// const { Authentication, Authorization } = require("../../../middleware");

// // Save Image
// const upload = multer({
//     storage: multer.diskStorage({
//         destination: function (req, file, cb) {
//             cb(null, "images");
//         },
//         filename: function (req, file, cb) {
//             console.log(file);
//             cb(null, file.originalname);
//             // cb(null, file.originalname + "-" + Date.now() + ".jpg")
//         },
//     }),
// }).fields([
//     { name: 'image', maxCount: 1 }
// ]);

// router.post("/create-part", upload,  Authentication, Authorization, partsController.createPart);

// module.exports = router; 