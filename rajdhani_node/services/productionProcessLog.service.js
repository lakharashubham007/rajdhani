const mongoose = require('mongoose');
const { ProductionProcessLog } = require("../models");


const createProductionProcessLog = async (data) => {
  try {
    const log = await ProductionProcessLog.create(data);
    return log;
  } catch (error) {
    console.error("❌ Error creating ProductionProcessLog:", error);
    throw error;
  }
};

// const getProductionProcessLogDetails = async (productionProcessID, page, limit, sort, search) => {
//   try {
//     const skip = (page - 1) * limit;

//     // Default sort
//     let sortOptions = { created_at: -1 };
//     if (sort) {
//       const [field, order] = sort.split(":");
//       sortOptions = {
//         [field]: order === "desc" ? -1 : 1,
//       };
//     }

//     if (search && search.trim() !== "") {
//       filter["log_message"] = { $regex: search, $options: "i" };
//     }

//     // Fetch logs with the correct filter applied
//     const logs = await ProductionProcessLog.find()
//       .populate('production_process_id')
//       .sort(sortOptions)
//       .skip(skip)
//       .limit(limit)
//       .lean();

//     // Count documents with the same filter
//     const totalItems = await ProductionProcessLog.countDocuments();

//     return {
//       productionProcessLogs: logs,
//       totalItems,
//       currentPage: page,
//       rowsPerPage: limit,
//       totalPages: Math.ceil(totalItems / limit),
//     };
//   } catch (error) {
//     console.error("❌ Error in getProductionProcessLogDetails:", error);
//     throw error;
//   }
// };


const getProductionProcessLogDetails = async  (page, limit, sort, search,productionProcessID) => {

  console.log("productionProcessID",productionProcessID)
  try {
    const skip = (page - 1) * limit;

    // Setup filter with required production_process_id
    const filter = {
      production_process_id: productionProcessID
    };

    // Optional search filter
    if (search && search.trim() !== "") {
      filter["log_message"] = { $regex: search, $options: "i" };
    }

    // Sorting setup
    let sortOptions = { created_at: -1 }; // default sort
    if (sort) {
      const [field, order] = sort.split(":");
      sortOptions = {
        [field]: order === "desc" ? -1 : 1,
      };
    }

    // Fetch filtered logs
    const logs = await ProductionProcessLog.find(filter)
      .populate('production_process_id')
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .lean();

    // Count documents with the same filter
    const totalItems = await ProductionProcessLog.countDocuments(filter);

    return {
      productionProcessLogs: logs,
      totalItems,
      currentPage: page,
      rowsPerPage: limit,
      totalPages: Math.ceil(totalItems / limit),
    };
  } catch (error) {
    console.error("❌ Error in getProductionProcessLogDetails:", error);
    throw error;
  }
};




module.exports = {
  createProductionProcessLog,
  getProductionProcessLogDetails
};
