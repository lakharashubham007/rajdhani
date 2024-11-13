const express = require("express");
const router = express.Router();
const { materialController } = require('../../../controllers');
const { Authentication, Authorization } = require("../../../middleware");

// Create a new material
router.post("/create-material", Authentication, Authorization, materialController.createMaterial);
// Get all materials
router.get("/material", Authentication, Authorization, materialController.getMaterials);
// Get a material by ID
router.get("/material/:id", Authentication, Authorization, materialController.getMaterialById);
// Update a material by ID
router.patch("/edit-material/:id", Authentication, Authorization, materialController.updateMaterial);
// Delete a material by ID
router.delete("/delete-material/:id", Authentication, Authorization, materialController.deleteMaterial);
// Update material status
router.patch("/update-material-status/:id", Authentication, Authorization, materialController.updateMaterialStatus);

module.exports = router;
