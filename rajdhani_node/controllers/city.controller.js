const { cityService } = require("../services");

// Get all Cities
const getAllCities = async (req, res) => {
  try {
    const cities = await cityService.getAllCities();
    res.json({ success: true, cities });
  } catch (error) {
    console.error("Error fetching cities:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get all States for a given country ID
const getCitiesByState = async (req, res) => {
 
  try {
    const stateId = Number(parseInt(req.params.id)); // Extract country_id from request params
    if (!stateId) {
      return res.status(400).json({ success: false, message: "Invalid state ID" });
    }

    const cities = await cityService.getCitiesByState(stateId);

    if (!cities.length) {
      return res.status(404).json({ success: false, message: "No cities found for this country ID" });
    }

    res.json({ success: true, cities });
  } catch (error) {
    console.error("Error fetching cities:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get a city by ID
const getCityById = async (req, res) => {
  try {
    const city = await cityService.getCityById(req.params.id);
    if (!city) {
      return res.status(404).json({ success: false, message: "City not found" });
    }
    res.json({ success: true, city });
  } catch (error) {
    console.error("Error fetching city:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  getAllCities,
  getCitiesByState,
  getCityById
};
