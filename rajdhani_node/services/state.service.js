const { States, StateTin } = require("../models");

// Service to get all states
const getAllStates = async () => {
  try {
    return await States.find({});
  } catch (error) {
    console.error("Error fetching states from database:", error);
    throw error;
  }
};


// Get states by country ID
const getStatesByCountry = async (countryId) => {
    try {
      const states = await States.find({ country_id: countryId }).sort({ name: 1 });
      return states;
    } catch (error) {
      console.error("Error fetching state Tin from database:", error);
      throw error;
    }
  };


  // Get states by country ID
const getStateTIN = async (stateCode) => {
  console.log("state Code in service",stateCode)
  try {
    const statesTin = await StateTin.find({ state_code: stateCode });
    return statesTin;
  } catch (error) {
    console.error("Error fetching states from database:", error);
    throw error;
  }
};


  getStateTIN





// Service to get a state by ID
const getStateById = async (id) => {
  try {
    return await States.findOne({ id });
  } catch (error) {
    console.error("Error fetching state from database:", error);
    throw error;
  }
};

module.exports = {
  getAllStates,
  getStatesByCountry,
  getStateById,
  getStateTIN
};
