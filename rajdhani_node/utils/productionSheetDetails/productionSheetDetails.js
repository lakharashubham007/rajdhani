const { ProductionSheetDetails } = require('../../models');

// ✅ Mark as In Progress
const markSheetAsInProgress = async ({ sheetId, updatedBy }) => {
  try {
    return await ProductionSheetDetails.findByIdAndUpdate(
      sheetId,
      {
        status: 'In Progress',
        updated_by: updatedBy || 'system',
        updated_at: new Date(),
      },
      { new: true }
    );
  } catch (error) {
    console.error("Error setting ProductionSheet to In Progress:", error);
    throw error;
  }
};

// ✅ Mark as Completed
const markSheetAsCompleted = async ({ sheetId, updatedBy }) => {
  try {
    return await ProductionSheetDetails.findByIdAndUpdate(
      sheetId,
      {
        status: 'Completed',
        updated_by: updatedBy || 'system',
        updated_at: new Date(),
      },
      { new: true }
    );
  } catch (error) {
    console.error("Error setting ProductionSheet to Completed:", error);
    throw error;
  }
};

module.exports = {
  markSheetAsInProgress,
  markSheetAsCompleted,
};
