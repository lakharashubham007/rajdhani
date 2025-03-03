const { Country } = require("../models");

// Service to get all countries
const getAllCountries = async () => {
  try {
    const countryList = await Country.find({}).sort({ name: 1 });
    return countryList;
  } catch (error) {
    console.error("Error fetching countries from database:", error);
    throw error;
  }
};

module.exports = {
  getAllCountries,
};
