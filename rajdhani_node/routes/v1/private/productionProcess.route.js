const express = require("express");
const router = express.Router();
const { producitonSheetDetailsController, productionProcessItemsController ,productionProcessController, productionProcessLogController, productionProcessItemsLogController} = require("../../../controllers");
const multer = require("multer");
const { Authentication, Authorization } = require("../../../middleware");

// Save Image (if needed for any file upload, modify as per requirement)
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "images");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
}).fields([{ name: "image", maxCount: 1 }]);



//SECTION:1 Porduction Processs Details Table Routes
router.post("/create-produciton-process-details", Authentication, productionProcessController.createProductionProcessDetails); //Start PP
router.post("/produciton-process-pause", Authentication, productionProcessController.pauseProductionProcess); //Pause
router.post("/produciton-process-resume", Authentication, productionProcessController.resumeProductionProcess); //Reseume
router.post("/produciton-process-stop", Authentication, productionProcessController.stopProductionProcess); //Stop
router.get("/get-produciton-process-details", Authentication, productionProcessController.createProductionProcessDetails);
router.get("/get-production-process-details/:id", Authentication, productionProcessController.getProductionProcessBySheetId);

//production process Details table ----> stage starting and ending routes
//✅ Hose Cutting ✅ Skiving ✅ Pre-Assembly ✅ Crimping ✅ Testing ✅ Packing
router.patch('/start-hose-cutting/:id', productionProcessController.startHoseCutting);
router.patch('/end-hose-cutting/:id', productionProcessController.endHoseCutting);
router.patch('/start-skiving/:id', productionProcessController.startSkiving);
router.patch('/end-skiving/:id', productionProcessController.endSkiving);
router.patch('/start-pre-assembly/:id', productionProcessController.startPreAssembly);
router.patch('/end-pre-assembly/:id', productionProcessController.endPreAssembly);
router.patch('/start-crimping/:id', productionProcessController.startCrimping);
router.patch('/end-crimping/:id', productionProcessController.endCrimping);
router.patch('/start-testing/:id', productionProcessController.startTesting);
router.patch('/end-testing/:id', productionProcessController.endTesting);
router.patch('/start-packing/:id', productionProcessController.startPacking);
router.patch('/end-packing/:id', productionProcessController.endPacking);


//SECTION:2 Porduction Processs Items table
router.post("/create-produciton-process-items", Authentication, productionProcessItemsController.createProductionProcessItems);
router.get("/get-produciton-process-items", Authentication, productionProcessItemsController.getProductionProcessItems);
router.post("/update-items", Authentication, productionProcessItemsController.updateProductionProcessItems);
router.post("/skiving-status", Authentication, productionProcessItemsController.updateSkivingStatusItems);


//SECTION:3 Porduction Processs Log Details table
router.post("/create-produciton-process-log", Authentication, productionProcessLogController.createProductionProcessLog);
router.get("/get-produciton-process-log", Authentication, productionProcessLogController.getProductionProcessLogDetails);


//SECTION:4 Porduction Processs Log Items table
router.post("/create-items-log", Authentication, productionProcessItemsLogController.createProductionProcessItemLogs);
router.get("/get-items-log", Authentication, productionProcessItemsLogController.getProductionProcessItemLogsByItemAndStage);

//SECTION: 5 production process details Quantity management routes 
router.post('/production-process-update-quantity', Authentication, producitonSheetDetailsController.searchProductionSheets);






module.exports = router;
