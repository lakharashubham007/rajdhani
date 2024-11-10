const express = require("express");
const router = express.Router();
const { vendorController } = require("../../../controllers");
const { Authentication, Authorization } = require("../../../middleware");

router.post("/create-vendor", Authentication, Authorization, vendorController.createVendor);

module.exports = router;
