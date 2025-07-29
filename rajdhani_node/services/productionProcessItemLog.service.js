const { ProductionProcessItemLogs } = require("../models");
// const mongoose = require("mongoose");

// 🛠 Save Multiple Production Process Item Logs
const createProductionProcessItemLogs = async (items) => {
  console.log("items are here in log items", items)
  try {
    return await ProductionProcessItemLogs.insertMany(items);
  } catch (error) {
    console.error("❌ Error inserting ProductionProcessItemLogs:", error);
    throw error;
  }
};

// 📄 Get logs for specific item and stage
const getLogsByItemAndStage = async (item_id, stage) => {
  try {
    return await ProductionProcessItemLogs.find({
      item_id: item_id,
      stage: stage
    })
      .sort({ createdAt: -1 }) // latest first
      .lean();
  } catch (error) {
    console.error("❌ Error in getLogsByItemAndStage:", error);
    throw error;
  }
};

module.exports = {
  createProductionProcessItemLogs,
  getLogsByItemAndStage
};
