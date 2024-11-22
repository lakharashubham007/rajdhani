const { State } = require("../models");

// Service to get all states
const getAllStates = async () => {
  try {
    const stateList = await State.find({});
    return stateList;
  } catch (error) {
    console.error("Error fetching states from database:", error);
    throw error;
  }
};

module.exports = {
  getAllStates,
};
