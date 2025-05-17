const {ProductionSheetItem} = require('../models');

// Create a new createProductionSheetItems
const createProductionSheetItems = async (data) => {
  try {
    return await ProductionSheetItem.create(data);
  } catch (error) {
    console.error("Error creating ProductionSheetItems:", error);
    throw error;
  }
};

const getLastFiveProductUsages = async (product_id, party_id) => {
  console.log("recentProductEntries",product_id, party_id)
  try {
    const recentProductEntries = await ProductionSheetItem.find({
      product_id,
      party_id
    }).populate('production_sheet_id')
      .populate('product_id')
      .sort({ created_at: -1 }) // Sort by most recent first
      .limit(5); // Limit to 5 results


      console.log("recentProductEntries",recentProductEntries)

    return recentProductEntries;
  } catch (error) {
    console.error("Error fetching recent product usage:", error);
    throw error;
  }
};


module.exports = {
    createProductionSheetItems,
    getLastFiveProductUsages
  };
  