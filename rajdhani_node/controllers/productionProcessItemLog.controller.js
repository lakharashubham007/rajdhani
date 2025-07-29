const { productionProcessItemLogService } = require("../services");

// 🔧 Create Production Process Item Logs
const createProductionProcessItemLogs = async (req, res) => {
  try {
    const { items, stage } = req.body;
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: "Items array is required." });
    }

    // Transform incoming items to match schema
    // Transform items with log_message generation
    const formattedItems = items?.map((item) => {
      const accepted = Number(item?.quantity_accepted || 0);
      const rejected = Number(item?.quantity_rejected || 0);

      let log_message = "";
      if (accepted > 0 && rejected > 0) {
        log_message = `Total ${accepted} quantity accepted and ${rejected} rejected by ${item.operator_name || 'Operator'}`;
      } else if (accepted > 0) {
        log_message = `Total ${accepted} quantity accepted by ${item.operator_name || 'Operator'}`;
      } else if (rejected > 0) {
        log_message = `Total ${rejected} quantity rejected by ${item.operator_name || 'Operator'}`;
      } else {
        log_message = `No quantity updated.`;
      }

      return {
        log_id: item.log_id,
        item_id: item.item_id,
        stage: item?.stage,
        total_quantity: item?.total_quantity,
        quantity_accepted: accepted,
        quantity_rejected: rejected,
        remarks: item.remark || "",
        operator_name: item?.operator_name || null,
        operator_id: item?.operator_id || null,
        operatorNames: item?.operatorNames,
        operatorIds: item?.operatorId ,
        log_message
      };
    });

    const savedLogs = await productionProcessItemLogService.createProductionProcessItemLogs(formattedItems);

    res.status(201).json({
      success: true,
      message: "Production process item logs created successfully!",
      data: savedLogs,
    });

  } catch (error) {
    console.error("❌ Error in createProductionProcessItemLogs:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getProductionProcessItemLogsByItemAndStage = async (req, res) => {
  try {
    const { item_id, stage } = req.query;

    if (!item_id || !stage) {
      return res.status(400).json({
        success: false,
        message: "Both item_id and stage are required in query params.",
      });
    }

    const logs = await productionProcessItemLogService.getLogsByItemAndStage(item_id, stage);

    res.status(200).json({
      success: true,
      total: logs.length,
      logs,
    });
  } catch (error) {
    console.error("❌ Error fetching item logs by item and stage:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  createProductionProcessItemLogs,
  getProductionProcessItemLogsByItemAndStage
};
