const { countryService } = require("../services");

// Get all Countries
const getAllCountries = async (req, res) => {
  try {
    const countries = await countryService.getAllCountries();
    res.json({ success: true, countries });
  } catch (error) {
    console.error("Error fetching countries:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  getAllCountries,
};
