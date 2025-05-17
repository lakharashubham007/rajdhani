const {ProductionSheetDetails} = require('../models');

// Create a new createProductionSheetDetails
const createProductionSheetDetails = async (data) => {
  console.log("data is here", data);
  try {
    // Check if a sheet already exists for the given order_id
    const existingSheet = await ProductionSheetDetails.findOne({ order_id: data.order_id });

    if (existingSheet) {
      // Sheet already exists, return this info
      return { alreadyExists: true, message: 'A production sheet already exists for this order ID.' };
    }

    // If not, create a new production sheet
    const productionSheetDetails = await ProductionSheetDetails.create({ ...data });

    return productionSheetDetails;
  } catch (error) {
    console.error("Error creating production sheet details:", error);
    throw error;
  }
};

const getLastSheetNo = async () => {
  try {
    const lastSheet = await ProductionSheetDetails.findOne().sort({ created_at: -1 });
    return lastSheet?.sheet_no ? lastSheet?.sheet_no : 1000 || null;
  } catch (error) {
    console.error("Error fetching last sheet no:", error);
    throw error;
  }
};



module.exports = {
    createProductionSheetDetails,
    getLastSheetNo
  };
  