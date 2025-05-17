const {productionSheetDetailsService} = require('../services');

// Create a new Production Sheet Details
const createProductionSheetDetails = async (req, res) => {
  try {
    const productionSheetDetails = await productionSheetDetailsService.createProductionSheetDetails(req.body);
    res.json({ success: true, productionSheetDetails, message: "produciton sheet created successfully!" });
  } catch (error) {
    console.error("Error creating purchase order:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get the last created sheet number
const getLastSheetNo = async (req, res) => {
  try {
    const sheet_no = await productionSheetDetailsService.getLastSheetNo();
    if (sheet_no) {
      res.json({ success: true, sheet_no });
    } else {
      res.status(404).json({ success: false, message: "No production sheet found" });
    }
  } catch (error) {
    console.error("Error getting last sheet no:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};




module.exports = {
    createProductionSheetDetails,
    getLastSheetNo
  };
  