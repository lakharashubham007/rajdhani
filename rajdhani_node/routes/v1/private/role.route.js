const express = require("express");
const router = express.Router();
const { roleController } = require("../../../controllers");
const { Authentication, Authorization } = require("../../../middleware");



router.get("/roles-list", Authentication, Authorization, roleController.getRoles);
router.get("/roles-list/:id", roleController.getRoleById);
router.patch("/edit-role/:id", roleController.updatRoleById);
router.post("/create-role",  Authentication,Authorization, roleController.createRole);
router.delete("/delete-role/:id", roleController.deleteRole);


module.exports = router;
