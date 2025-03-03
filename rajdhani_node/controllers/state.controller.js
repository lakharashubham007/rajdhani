const { stateService } = require("../services");

// Get all States
const getAllStates = async (req, res) => {
  try {
    const states = await stateService.getAllStates();
    res.json({ success: true, states });
  } catch (error) {
    console.error("Error fetching states:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get all States for a given country ID
const getStatesByCountry = async (req, res) => {
 
    try {
      const countryId = Number(parseInt(req.params.id)); // Extract country_id from request params
      if (!countryId) {
        return res.status(400).json({ success: false, message: "Invalid country ID" });
      }
  
      const states = await stateService.getStatesByCountry(countryId);
  
      if (!states.length) {
        return res.status(404).json({ success: false, message: "No states found for this country ID" });
      }
  
      res.json({ success: true, states });
    } catch (error) {
      console.error("Error fetching states:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };

  // Get all States for a given country ID
const getStatesTIN = async (req, res) => {
 
  try {
    const stateCode = req.params.id; // Extract country_id from request params
    console.log("state Code in controller",stateCode)
    if (!stateCode) {
      return res.status(400).json({ success: false, message: "Invalid state code" });
    }

    const stateTin = await stateService.getStateTIN(stateCode);

    console.log("state Code in controller",stateTin)
    
    res.json({ success: true, stateTin });
  } catch (error) {
    console.error("Error fetching state's TIN:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
  

// Get a state by ID
const getStateById = async (req, res) => {
  try {
    const state = await stateService.getStateById(req.params.id);
    if (!state) {
      return res.status(404).json({ success: false, message: "State not found" });
    }
    res.json({ success: true, state });
  } catch (error) {
    console.error("Error fetching state:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  getAllStates,
  getStatesByCountry,
  getStatesTIN,
  getStateById
};
