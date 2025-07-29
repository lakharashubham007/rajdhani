const { productionProcessLogService } = require("../services");
const logTypeMap = require('../utils/logTypeMap');
const buildLogMessage = require('../utils/buildLogMessage');

const createProductionProcessLog = async (req, res) => {
  try {
    const {
      type,
      production_process_id,
      sheet_no,
      created_by,
      quantity,
      operator_name,
      totalItems
    } = req.body;

    const logTemplate = logTypeMap[type];

    if (!logTemplate) {
      return res.status(400).json({
        success: false,
        message: `Invalid log type: ${type}`
      });
    }

    const log_message = buildLogMessage(logTemplate.log_template, {
      quantity,
      operator_name,
      created_by,
      sheet_no,
      totalItems,
      stage: logTemplate.stage
    });

    const logData = {
      production_process_id,
      sheet_no,
      created_by,
      log_message,
      stage: logTemplate.stage,
      status: logTemplate.status
    };

    const log = await productionProcessLogService.createProductionProcessLog(logData);

    res.status(201).json({
      success: true,
      log,
      message: "Production process log created successfully!",
    });

  } catch (error) {
    console.error("❌ Error creating production process log:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};

// 🔧 Create Production Process Log
// const createProductionProcessLog = async (req, res) => {
//   try {
//     const { type, production_process_id, sheet_no, created_by } = req.body;

//     // Step 1: Get log data from map
//     const logTemplate = logTypeMap[type];

//     if (!logTemplate) {
//       return res.status(400).json({
//         success: false,
//         message: `Invalid log type: ${type}`
//       });
//     }

//     // Step 2: Construct log payload
//     const logData = {
//       production_process_id,
//       sheet_no,
//       created_by,
//       ...logTemplate, // log_message, stage, status
//     };

//     // Step 3: Create log via service
//     const log = await productionProcessLogService.createProductionProcessLog(logData);

//     // Step 4: Respond success
//     res.status(201).json({
//       success: true,
//       log,
//       message: "Production process log created successfully!",
//     });

//   } catch (error) {
//     console.error("❌ Error creating production process log:", error);
//     res.status(500).json({
//       success: false,
//       message: "Internal Server Error"
//     });
//   }
// };

// ✅ Get Production Process Log Details
const getProductionProcessLogDetails = async (req, res) => {
  try {
    const productionProcessID = req.query.productionProcessID;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sort = req.query.sort || "created_at:desc";
    const search = req.query.search || "";

    const result = await productionProcessLogService.getProductionProcessLogDetails(
      page,
      limit,
      sort,
      search,
      productionProcessID
    );

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error("❌ Error fetching production process log details:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};



module.exports = {
  createProductionProcessLog,
  getProductionProcessLogDetails
};
