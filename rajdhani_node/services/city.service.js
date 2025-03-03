const { City } = require("../models");

// Service to get all cities
const getAllCities = async () => {
  try {
    return await City.find({});
  } catch (error) {
    console.error("Error fetching cities from database:", error);
    throw error;
  }
};

// Get states by country ID
const getCitiesByState = async (stateId) => {
  

  try {
    const states = await City.find({ state_id: stateId }).sort({ name: 1 });
   
    return states;
  } catch (error) {
    console.error("Error fetching states from database:", error);
    throw error;
  }
};



// Service to get a city by ID
const getCityById = async (id) => {
  try {
    return await City.findOne({ id });
  } catch (error) {
    console.error("Error fetching city from database:", error);
    throw error;
  }
};

module.exports = {
  getAllCities,
  getCitiesByState,
  getCityById
};
