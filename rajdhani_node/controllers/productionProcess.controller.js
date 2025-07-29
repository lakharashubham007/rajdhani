const {
  productionProcessService,
  productionProcessItemService,
  productionProcessLogService,
} = require("../services");

// 🔧 Create Production Process Details
const createProductionProcessDetails = async (req, res) => {
  try {
    const productionProcess = await productionProcessService.createProductionProcessDetails(req.body);
    
    res.status(201).json({
      success: true,
      productionProcess,
      message: "Production process details created successfully!",
    });
  } catch (error) {
    console.error("Error creating production process:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// ✅ Pause Production Process
const pauseProductionProcess = async (req, res) => {
  try {
    const { production_process_id } = req.body;

    if (!production_process_id) {
      return res.status(400).json({ success: false, message: "Missing production_process_id" });
    }

    const result = await productionProcessService.pauseProcess(production_process_id);

    res.status(200).json({
      success: true,
      message: "Production process paused successfully!",
      data: result,
    });
  } catch (error) {
    console.error("❌ Error pausing process:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// ✅ Resume Production Process
const resumeProductionProcess = async (req, res) => {
  try {
    const { production_process_id } = req.body;

    if (!production_process_id) {
      return res.status(400).json({ success: false, message: "Missing production_process_id" });
    }

    const result = await productionProcessService.resumeProcess(production_process_id);

    res.status(200).json({
      success: true,
      message: "Production process resumed successfully!",
      data: result,
    });
  } catch (error) {
    console.error("❌ Error resuming process:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// ✅ Stop Production Process
const stopProductionProcess = async (req, res) => {
  try {
    const { production_process_id } = req.body;

    if (!production_process_id) {
      return res.status(400).json({ success: false, message: "Missing production_process_id" });
    }

    const result = await productionProcessService.stopProcess(production_process_id);

    res.status(200).json({
      success: true,
      message: "Production process stopped successfully!",
      data: result,
    });
  } catch (error) {
    console.error("❌ Error stopping production process:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// ✅ GET All Production Process Details
const getProductionProcessDetails = async (req, res) => {
  try {
    const processList = await productionProcessService.getProductionProcessDetails();

    res.status(200).json({
      success: true,
      data: processList,
      message: "Production process details fetched successfully!",
    });
  } catch (error) {
    console.error("Error fetching production process details:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getProductionProcessBySheetId = async (req, res) => {
  try {
    const { id } = req.params;

    const process = await productionProcessService.getProductionProcessBySheetId(id);

    if (!process) {
      return res.status(200).json({ success: false, message: "No process found with this ID" });
    }

    res.status(200).json({
      success: true,
      data: process,
      message: "Process fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching process by ID:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// 🔧 Create Production Process Items
const createProductionProcessItems = async (req, res) => {
  try {
    const items = await productionProcessItemService.createProductionProcessItems(req.body.items);
    res.status(201).json({
      success: true,
      items,
      message: "Production process items created successfully!",
    });
  } catch (error) {
    console.error("Error creating production process items:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get Sale Orders with Pagination, Search, and Sorting
const getProductionProcessItems = async (req, res) => {
  try {
    const productionProcessID = req.query.production_process_id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sort = req.query.sort || "date";
    const search = req.query.search || "";

    const producitonSheetDetailsWithItems = await productionProcessService.getProductionProcessItems(productionProcessID, page, limit, sort, search);
    res.json({ success: true, ...producitonSheetDetailsWithItems });
  } catch (error) {
    console.error("Error fetching sale orders:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


// ---------------------------
// ✅ Cuttting Stage Start-End CONTROLLER
// ---------------------------
const startHoseCutting = async (req, res) => {
  try {
    const { id } = req.params; // _id passed as param

    const result = await productionProcessService.startHoseCuttingStage(id);

    if (!result) {
      return res.status(404).json({ success: false, message: "Process not found" });
    }

    res.status(200).json({
      success: true,
      data: result,
      message: "Hose cutting stage started successfully.",
    });
  } catch (error) {
    console.error("Error starting hose cutting stage:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

//End hose cutting
const endHoseCutting = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await productionProcessService.endHoseCuttingStage(id);

    if (!result) {
      return res.status(404).json({ success: false, message: "No production process found with this ID." });
    }

    res.status(200).json({
      success: true,
      data: result,
      message: "Hose cutting stage ended successfully.",
    });
  } catch (error) {
    console.error("❌ Error ending hose cutting stage:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// ---------------------------
// ✅ Skiving Stage Start-End CONTROLLER
// ---------------------------
// Start Skiving
const startSkiving = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await productionProcessService.startSkivingStage(id);

    if (!result) {
      return res.status(404).json({ success: false, message: "Process not found" });
    }

    res.status(200).json({
      success: true,
      data: result,
      message: "Skiving stage started successfully.",
    });
  } catch (error) {
    console.error("Error starting skiving stage:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// End Skiving
const endSkiving = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await productionProcessService.endSkivingStage(id);

    if (!result) {
      return res.status(404).json({ success: false, message: "Process not found" });
    }

    res.status(200).json({
      success: true,
      data: result,
      message: "Skiving stage completed successfully.",
    });
  } catch (error) {
    console.error("Error completing skiving stage:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// ---------------------------
// ✅ Pre-Assembly Stage Start-End CONTROLLER
// ---------------------------
const startPreAssembly = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await productionProcessService.startPreAssemblyStage(id);

    if (!result) {
      return res.status(404).json({ success: false, message: "Process not found" });
    }

    res.status(200).json({
      success: true,
      data: result,
      message: "Pre-Assembly stage started successfully.",
    });
  } catch (error) {
    console.error("Error starting Pre-Assembly stage:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const endPreAssembly = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await productionProcessService.endPreAssemblyStage(id);

    if (!result) {
      return res.status(404).json({ success: false, message: "Process not found" });
    }

    res.status(200).json({
      success: true,
      data: result,
      message: "Pre-Assembly stage completed successfully.",
    });
  } catch (error) {
    console.error("Error ending Pre-Assembly stage:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// ---------------------------
// ✅ CRIMPING Stage Start-End CONTROLLER
// ---------------------------
const startCrimping = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productionProcessService.startCrimpingStage(id);
    if (!result) {
      return res.status(404).json({ success: false, message: "Process not found" });
    }
    res.status(200).json({ success: true, data: result, message: "Crimping stage started successfully." });
  } catch (error) {
    console.error("Error starting Crimping stage:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const endCrimping = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productionProcessService.endCrimpingStage(id);
    if (!result) {
      return res.status(404).json({ success: false, message: "Process not found" });
    }
    res.status(200).json({ success: true, data: result, message: "Crimping stage completed successfully." });
  } catch (error) {
    console.error("Error ending Crimping stage:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// ---------------------------
// ✅ TESTING Stage Start-End CONTROLLER
// ---------------------------
const startTesting = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productionProcessService.startTestingStage(id);
    if (!result) {
      return res.status(404).json({ success: false, message: "Process not found" });
    }
    res.status(200).json({ success: true, data: result, message: "Testing stage started successfully." });
  } catch (error) {
    console.error("Error starting Testing stage:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const endTesting = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productionProcessService.endTestingStage(id);
    if (!result) {
      return res.status(404).json({ success: false, message: "Process not found" });
    }
    res.status(200).json({ success: true, data: result, message: "Testing stage completed successfully." });
  } catch (error) {
    console.error("Error ending Testing stage:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// ---------------------------
// ✅ PACKING Stage Start-End CONTROLLER
// ---------------------------
const startPacking = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productionProcessService.startPackingStage(id);
    if (!result) {
      return res.status(404).json({ success: false, message: "Process not found" });
    }
    res.status(200).json({ success: true, data: result, message: "Packing stage started successfully." });
  } catch (error) {
    console.error("Error starting Packing stage:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const endPacking = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productionProcessService.endPackingStage(id);
    if (!result) {
      return res.status(404).json({ success: false, message: "Process not found" });
    }
    res.status(200).json({ success: true, data: result, message: "Packing stage completed successfully." });
  } catch (error) {
    console.error("Error ending Packing stage:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};






module.exports = {
  createProductionProcessDetails,
  createProductionProcessItems,
  getProductionProcessDetails,
  getProductionProcessBySheetId,
  startHoseCutting,
  getProductionProcessItems,
  endHoseCutting,
  startSkiving,
  endSkiving,
  startPreAssembly,
  endPreAssembly,
  startCrimping,
  endCrimping,
  startTesting,
  endTesting,
  startPacking,
  endPacking,
  pauseProductionProcess,
  resumeProductionProcess,
  stopProductionProcess
};

// // Create a new Purchase Order
// const createPurchaseOrder = async (req, res) => {
//   try {
//     const purchaseOrder = await purchaseOrderService.createPurchaseOrder(req.body);
//     res.json({ success: true, purchaseOrder, message: "Purchase order created successfully!" });
//   } catch (error) {
//     console.error("Error creating purchase order:", error);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };

// // Create a new Purchase Order Item
// const createPurchaseOrderItem = async (req, res) => {
//   try {
//     const newItem = await purchaseOrderItemService.createPurchaseOrderItem(req.body);
//     res.status(201).json({ success: true, po_items: newItem, message: 'Purchase order item created successfully!' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: 'Internal Server Error' });
//   }
// };

// // Create a new Purchase Order
// const createproducitonprocesslogs = async (req, res) => {
//   try {
//     const purchaseOrder = await purchaseOrderService.createPurchaseOrder(req.body);
//     res.json({ success: true, purchaseOrder, message: "Purchase order created successfully!" });
//   } catch (error) {
//     console.error("Error creating purchase order:", error);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };

