const express = require("express");
const router = express.Router();
const { permissionController } = require("../../../controllers");
const { Authentication } = require("../../../middleware");

router.get("/permissions", Authentication, permissionController.getPermission );


module.exports = router;