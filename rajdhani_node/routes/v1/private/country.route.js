const express = require("express");
const router = express.Router();
const {countryController, stateController, cityController} = require("../../../controllers");

// Route to get all states
router.get("/country-list", countryController.getAllCountries);
router.get("/state/:id", stateController.getStatesByCountry);
router.get("/states-tin/:id", stateController.getStatesTIN);
router.get("/cities/:id", cityController.getCitiesByState);

module.exports = router;
