const express = require("express");
const router = express.Router();
const { bendAngleController } = require("../../../controllers");

const { Authentication, Authorization } = require("../../../middleware");


router.post("/create-bendangle",  Authentication, bendAngleController.createBendAngle );
router.get("/bendangle-list", Authentication,   bendAngleController.getBendAngles);
router.get("/bendangles", Authentication,  bendAngleController.getAllBendAngles);
router.patch("/edit-bendangle/:id", Authentication,  bendAngleController.updateBendAngle);
router.get("/:id", Authentication,  bendAngleController.getBendAngleById);
router.delete("/delete-bendangle/:id", Authentication,  bendAngleController.deleteBendAngle);
router.patch("/update-bendangle-status/:id", Authentication, bendAngleController.updateBendAngleStatus);

module.exports = router; 