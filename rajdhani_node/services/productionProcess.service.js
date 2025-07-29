const { ProductionProcess, ProductionProcessItem } = require("../models");
const { markSheetAsInProgress } = require('../utils/productionSheetDetails/productionSheetDetails');
const { getStatusCounts } = require("../utils/sidebarmenuCount/statusCount");


const generateProcessUID = async () => {
  const today = new Date();
  const yyyyMMdd = today.toISOString().split("T")[0].replace(/-/g, ""); // e.g. "20250619"
  const prefix = `PP-${yyyyMMdd}`;

  try {
    // 🔍 Find the latest process_uid that matches today’s prefix
    const lastProcess = await ProductionProcess
      .findOne({ process_uid: new RegExp(`^${prefix}`) })
      .sort({ created_at: -1 }) // assuming `created_at` exists
      .lean();

    let nextSeq = 1;

    // 🧠 If a matching record is found, extract and increment the sequence number
    if (lastProcess && lastProcess.process_uid) {
      const parts = lastProcess.process_uid.split("-");
      const lastSeq = parseInt(parts[2], 10);
      if (!isNaN(lastSeq)) {
        nextSeq = lastSeq + 1;
      }
    }

    // Format: PP-YYYYMMDD-XXX
    const paddedSeq = String(nextSeq).padStart(3, "0");
    return `${prefix}-${paddedSeq}`;

  } catch (error) {
    console.error("Error generating process UID:", error);
    throw error;
  }
};


const createProductionProcessDetails = async (data) => {
  try {
    const process_uid = await generateProcessUID();
    const payload = {
      ...data,
      process_uid,
      status: 'In Progress', // 🔒 force status at creation
      production_process_is_running: true,
      production_process_start_date_time: new Date(),
      created_at: new Date(),
      updated_at: new Date(),
    };
    const createdProcess = await ProductionProcess.create(payload);
    // ✅ Update associated ProductionSheet
    if (data?.production_sheet_id || data?.created_by) {
      await markSheetAsInProgress({
        sheetId: data?.production_sheet_id,
        updatedBy: data?.created_by,
      });
    }
    // 🧠 Modular call for ProductionSheetDetails count
    const statusCount = await getStatusCounts();
    // ✅ Merge statusCount into createdProcess object
    const processWithStatus = createdProcess?.toObject();
    processWithStatus.statusCount = statusCount;
    return processWithStatus; // 🔁 Return the enriched object
  } catch (error) {
    console.error("Error creating ProductionProcess:", error);
    throw error;
  }
};

// ✅ Pause Process Logic
const pauseProcess = async (production_process_id) => {
  try {
    const process = await ProductionProcess.findById(production_process_id);

    if (!process) {
      throw new Error("Production process not found");
    }

    process.isPaused = true;
    // process.production_process_is_running = false;
    process.production_process_pause_start_date_time = new Date();
    process.status = 'On Hold';
    process.updated_at = new Date();

    return await process.save();
  } catch (error) {
    console.error("❌ Error in pauseProcess:", error);
    throw error;
  }
};

// ✅ Resume Process Logic 
const resumeProcess = async (production_process_id) => {
  try {
    const process = await ProductionProcess.findById(production_process_id);

    if (!process) {
      throw new Error("Production process not found");
    }

    process.isPaused = false;
    process.production_process_pause_end_date_time = new Date();
    process.status = 'In Progress';
    process.updated_at = new Date();

    return await process.save();
  } catch (error) {
    console.error("❌ Error in resumeProcess:", error);
    throw error;
  }
};

// ✅ Stop Process Logic
const stopProcess = async (production_process_id) => {
  try {
    const process = await ProductionProcess.findById(production_process_id);

    if (!process) {
      throw new Error("Production process not found");
    }

    process.status = 'Completed';
    process.production_process_end_date_time = new Date();
    process.production_process_is_running = false;
    process.isPaused = false;
    process.updated_at = new Date();

    return await process.save();
  } catch (error) {
    console.error("❌ Error in stopProcess:", error);
    throw error;
  }
};



// ✅ Get all production process records
const getProductionProcessDetails = async () => {
  try {
    return await ProductionProcess.findAll({
      order: [['created_at', 'DESC']], // Optional: latest first
    });
  } catch (error) {
    console.error("Error fetching ProductionProcess:", error);
    throw error;
  }
};

const getProductionProcessBySheetId = async (sheetId) => {
  try {
    return await ProductionProcess.findOne({ production_sheet_id: sheetId });
  } catch (error) {
    console.error("Error fetching ProductionProcess by sheet ID:", error);
    throw error;
  }
};



// ---------------------------
// ✅ Cutting Stage SERVICE
// ---------------------------
const startHoseCuttingStage = async (processId) => {
  try {
    const updated = await ProductionProcess.findByIdAndUpdate(
      processId,
      {
        $set: {
          'hose_cutting.status': 'In Progress',
          'hose_cutting.start_time': new Date(),
          'hose_cutting.started': true,
          updated_at: new Date(),
        },
      },
      { new: true }
    );

    return updated;
  } catch (error) {
    console.error("Error starting hose cutting stage:", error);
    throw error;
  }
};

const endHoseCuttingStage = async (processId) => {
  try {
    const updated = await ProductionProcess.findByIdAndUpdate(
      processId,
      {
        $set: {
          'hose_cutting.status': 'Completed',
          'hose_cutting.end_time': new Date(),
          'hose_cutting.started': false,
          updated_at: new Date(),
        }
      },
      { new: true }
    );

    return updated;
  } catch (error) {
    console.error("❌ Error in endHoseCuttingStage service:", error);
    throw error;
  }
};


// ---------------------------
// ✅ Skiving Stage SERVICE
// ---------------------------

// Start Skiving Stage
const startSkivingStage = async (processId) => {
  try {
    const updated = await ProductionProcess.findByIdAndUpdate(
      processId,
      {
        $set: {
          'skiving.status': 'In Progress',
          'skiving.start_time': new Date(),
          'skiving.started': true,
          updated_at: new Date(),
        }
      },
      { new: true }
    );
    return updated;
  } catch (error) {
    console.error("Error starting skiving stage:", error);
    throw error;
  }
};

// End Skiving Stage
const endSkivingStage = async (processId) => {
  try {
    const updated = await ProductionProcess.findByIdAndUpdate(
      processId,
      {
        $set: {
          'skiving.status': 'Completed',
          'skiving.end_time': new Date(),
          'skiving.started': false,
          updated_at: new Date(),
        }
      },
      { new: true }
    );
    return updated;
  } catch (error) {
    console.error("Error ending skiving stage:", error);
    throw error;
  }
};



// ---------------------------
// ✅ Pre-Assembly Stage SERVICE
// ---------------------------
const startPreAssemblyStage = async (processId) => {
  try {
    const updated = await ProductionProcess.findByIdAndUpdate(
      processId,
      {
        $set: {
          'pre_assembly.status': 'In Progress',
          'pre_assembly.start_time': new Date(),
          'pre_assembly.started': true,
          updated_at: new Date(),
        }
      },
      { new: true }
    );
    return updated;
  } catch (error) {
    console.error("Error starting Pre-Assembly stage:", error);
    throw error;
  }
};
// ✅ End Pre-Assembly Stage
const endPreAssemblyStage = async (processId) => {
  try {
    const updated = await ProductionProcess.findByIdAndUpdate(
      processId,
      {
        $set: {
          'pre_assembly.status': 'Completed',
          'pre_assembly.end_time': new Date(),
          'pre_assembly.started': false,
          updated_at: new Date(),
        }
      },
      { new: true }
    );
    return updated;
  } catch (error) {
    console.error("Error ending Pre-Assembly stage:", error);
    throw error;
  }
};

// ---------------------------
// ✅ CRIMPING SERVICE
// ---------------------------
const startCrimpingStage = async (id) => {
  return await ProductionProcess.findByIdAndUpdate(
    id,
    {
      $set: {
        'crimping.status': 'In Progress',
        'crimping.start_time': new Date(),
        'crimping.started': true,
        updated_at: new Date()
      }
    },
    { new: true }
  );
};

const endCrimpingStage = async (id) => {
  return await ProductionProcess.findByIdAndUpdate(
    id,
    {
      $set: {
        'crimping.status': 'Completed',
        'crimping.end_time': new Date(),
        'crimping.started': false,
        updated_at: new Date()
      }
    },
    { new: true }
  );
};

// ---------------------------
// ✅ TESTING SERVICE
// ---------------------------
const startTestingStage = async (id) => {
  return await ProductionProcess.findByIdAndUpdate(
    id,
    {
      $set: {
        'testing.status': 'In Progress',
        'testing.start_time': new Date(),
        'testing.started': true,
        updated_at: new Date()
      }
    },
    { new: true }
  );
};

const endTestingStage = async (id) => {
  return await ProductionProcess.findByIdAndUpdate(
    id,
    {
      $set: {
        'testing.status': 'Completed',
        'testing.end_time': new Date(),
        'testing.started': false,
        updated_at: new Date()
      }
    },
    { new: true }
  );
};

// ---------------------------
// ✅ PACKING SERVICE
// ---------------------------
const startPackingStage = async (id) => {
  return await ProductionProcess.findByIdAndUpdate(
    id,
    {
      $set: {
        'packing.status': 'In Progress',
        'packing.start_time': new Date(),
        'packing.started': true,
        updated_at: new Date()
      }
    },
    { new: true }
  );
};

const endPackingStage = async (id) => {
  return await ProductionProcess.findByIdAndUpdate(
    id,
    {
      $set: {
        'packing.status': 'Completed',
        'packing.end_time': new Date(),
        'packing.started': false,
        updated_at: new Date()
      }
    },
    { new: true }
  );
};





module.exports = {
  createProductionProcessDetails,
  getProductionProcessDetails,
  getProductionProcessBySheetId,
  startHoseCuttingStage,
  endHoseCuttingStage,
  startSkivingStage,
  endSkivingStage,
  startPreAssemblyStage,
  endPreAssemblyStage,
  startCrimpingStage,
  endCrimpingStage,
  startTestingStage,
  endTestingStage,
  startPackingStage,
  endPackingStage,
  pauseProcess,
  resumeProcess,
  stopProcess,

};
