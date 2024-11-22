const express = require("express");
const router = express.Router();
const {statesController} = require("../../../controllers");

// Route to get all states
router.get("/states-list", statesController.getAllStates);

module.exports = router;
