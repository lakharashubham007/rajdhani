const express = require("express");
const router = express.Router();
const { materialController } = require('../../../controllers');
const { Authentication, Authorization } = require("../../../middleware");

// Create a new material
router.post("/create-material", Authentication, Authorization, materialController.createMaterial);
// Get materials
router.get("/material", Authentication, Authorization, materialController.getMaterials);

//get all materials
router.get("/materials-list", Authentication, materialController.getAllMaterials);

// Get a material by ID
router.get("/material/:id", Authentication, Authorization, materialController.getMaterialById);
// Update a material by ID
router.patch("/edit-material/:id", Authentication, Authorization, materialController.updateMaterial);
// Delete a material by ID
router.delete("/delete-material/:id", Authentication, Authorization, materialController.deleteMaterial);
// Update material status
router.patch("/update-material-status/:id", Authentication, materialController.updateMaterialStatus);

module.exports = router;
