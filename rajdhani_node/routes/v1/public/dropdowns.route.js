const express = require("express");
const { dropdownOptiosController } = require("../../../controllers");
const router = express.Router();

// Route to fetch dropdown options
router.get("/all", dropdownOptiosController.getallOptions);
router.get("/basic-details", dropdownOptiosController.getBasicDetails);

module.exports = router;
