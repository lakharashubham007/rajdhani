const {statesService} = require("../services");

// Get all States
const getAllStates = async (req, res) => {
  try {
    const states = await statesService.getAllStates();
    res.json({ success: true, states });
  } catch (error) {
    console.error("Error fetching states:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  getAllStates,
};
