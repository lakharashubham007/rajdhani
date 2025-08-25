const { ProductionProcessItem, ProductionProcess } = require("../models");

const createProductionProcessItems = async (items) => {
  try {
    return await ProductionProcessItem.insertMany(items);
  } catch (error) {
    console.error("Error inserting ProductionProcessItems:", error);
    throw error;
  }
};

// const getProductionProcessItems = async (productionProcessID, page, limit, sort, search) => {
//   try {
//     const skip = (page - 1) * limit;

//     // Parse sort: e.g., "created_at:desc" → { created_at: -1 }
//     let sortOptions = { created_at: -1 };
//     if (sort) {
//       const [field, order] = sort.split(':');
//       sortOptions = { [field]: order === 'desc' ? -1 : 1 };
//     }

//     // Convert sheet ID to ObjectId
//     // const sheetObjectId = mongoose.Types.ObjectId(productionSheetID);

//     // 1. Fetch production sheet details
//     const processDetails = await ProductionProcess.findById(productionProcessID);
//     if (!processDetails) {
//       throw new Error('Production sheet not found');
//     }

//     // 2. Build filter for items
//     const itemFilter = { production_process_id: productionProcessID };


//     if (search && search.trim() !== '') {
//       itemFilter["hose_label"] = { $regex: search, $options: 'i' }; // Customize field for search
//     }

//     // 3. Fetch paginated items
//     const productionProcessItems = await ProductionProcessItem.find(itemFilter)
//       .sort(sortOptions)
//       .skip(skip)
//       .limit(limit);

//     // 4. Get total item count for pagination
//     const totalItems = await ProductionProcessItem.countDocuments({ production_process_id: productionProcessID });


//     // 5. Cutting stage analytics calculation
//     let totalSheetQuantity = 0;
//     let totalCompletedQuantity = 0;
//     let totalRejectedQuantity = 0;

//     for (const item of productionProcessItems) {
//       const sheetQty = Number(item?.sheet_total_quantity) || 0;
//       const completed = Number(item?.hoseCuttingStage?.lastUpdatedQuantity) || 0;
//       const rejected = Number(item?.hoseCuttingStage?.quantityRejected) || 0;

//       totalSheetQuantity += sheetQty;
//       totalCompletedQuantity += completed;
//       totalRejectedQuantity += rejected;
//     }

//     const totalPendingQuantity = totalSheetQuantity - totalCompletedQuantity;


//     // 6. Return formatted response
//     return {
//       productionSheetDetails: processDetails,
//       productionProcessItems,
//       totalItems,
//       // createdBy: processDetails.created_by,
//       // createdAt: sheetDetails.created_at,
//       currentPage: page,
//       rowsPerPage: limit,
//       totalPages: Math.ceil(totalItems / limit),
//       hoseCuttingStageAnalytics: {
//         totalSheetQuantity,
//         totalCompletedQuantity,
//         totalRejectedQuantity,
//         totalPendingQuantity
//       }
      

//     };

//   } catch (error) {
//     console.error('Error in getProductionSheetDetailsWithItems:', error);
//     throw error;
//   }
// };

const getProductionProcessItems = async (productionProcessID, page, limit, sort, search) => {
  try {
    const skip = (page - 1) * limit;

    // Sorting
    let sortOptions = { created_at: -1 };
    if (sort) {
      const [field, order] = sort.split(':');
      sortOptions = { [field]: order === 'desc' ? -1 : 1 };
    }

    // 1. Fetch process details
    const processDetails = await ProductionProcess.findById(productionProcessID);
    if (!processDetails) {
      throw new Error('Production process not found');
    }

    // 2. Build filter
    const itemFilter = { production_process_id: productionProcessID };
    if (search && search.trim() !== '') {
      itemFilter["hose_label"] = { $regex: search, $options: 'i' }; // Adjust if needed
    }

    // 3. Fetch paginated items
    const productionProcessItems = await ProductionProcessItem.find(itemFilter)
      .populate('production_sheet_items_id')
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    // 4. Count total items
    const totalItems = await ProductionProcessItem.countDocuments(itemFilter);

    // 5. Initialize analytics for each stage
    const stageNames = [
      "hoseCuttingStage",
      "skivingStage",
      "preAssemblyStage",
      "crimpingStage",
      "testingStage",
      "packingStage"
    ];

    const stageAnalytics = {};

    for (const stage of stageNames) {
      stageAnalytics[stage] = {
        totalSheetQuantity: 0,
        totalCompletedQuantity: 0,
        totalRejectedQuantity: 0,
        totalPendingQuantity: 0
      };
    }

    // 6. Calculate totals for each item per stage
    for (const item of productionProcessItems) {
      const sheetQty = Number(item?.sheet_total_quantity) || 0;

      for (const stage of stageNames) {
        const stageData = item?.[stage] || {};
        const accepted = Number(stageData?.quantityAccepted) || 0;
        const rejected = Number(stageData?.quantityRejected) || 0;
        const updated = Number(stageData?.lastUpdatedQuantity) || 0;

        stageAnalytics[stage].totalSheetQuantity += sheetQty;
        stageAnalytics[stage].totalCompletedQuantity += updated;
        stageAnalytics[stage].totalRejectedQuantity += rejected;
        stageAnalytics[stage].totalPendingQuantity += Math.max(0, sheetQty - updated);
      }
    }

    // 7. Format stage keys for output
    const formattedAnalytics = {
      hoseCuttingStageAnalytics: stageAnalytics["hoseCuttingStage"],
      skivingStageAnalytics: stageAnalytics["skivingStage"],
      preAssemblyStageAnalytics: stageAnalytics["preAssemblyStage"],
      crimpingStageAnalytics: stageAnalytics["crimpingStage"],
      testingStageAnalytics: stageAnalytics["testingStage"],
      packingStageAnalytics: stageAnalytics["packingStage"],
    };

    // 8. Return final response
    return {
      productionSheetDetails: processDetails,
      productionProcessItems,
      totalItems,
      currentPage: page,
      rowsPerPage: limit,
      totalPages: Math.ceil(totalItems / limit),
      ...formattedAnalytics
    };

  } catch (error) {
    console.error('Error in getProductionProcessItems:', error);
    throw error;
  }
};



const STAGE_MAP = {
  hose_cutting: "hoseCuttingStage",
  skiving: "skivingStage",
  pre_assembly: "preAssemblyStage",
  crimping: "crimpingStage",
  testing: "testingStage",
  packing: "packingStage",
};

const updateItemsByStage = async (itemDetails, items) => {
  const { stage, updated_by } = itemDetails;
  console.log("items inside ",items)
  const stageField = STAGE_MAP[stage];

  if (!stageField) {
    throw new Error(`Invalid stage provided: ${stage}`);
  }

  const updatePromises = items.map(async (item) => {
    const {
      id,
      quantity_accepted,
      quantity_rejected,
      last_updated_quantity,
      remark,
      line_number,
      operator_name,
      operator_id,
      log,
      sheet_total_quantity
    } = item;

    const totalQty = Number(sheet_total_quantity);
    const acceptedQty = Number(quantity_accepted);
    const rejectedQty = Number(quantity_rejected);
    const lastUpdatedQty = Number(last_updated_quantity);

    // 🔄 Status logic
    let status = "Pending";

    if (rejectedQty > 0) {
      status = "In Progress";
    } else if (totalQty === (acceptedQty + lastUpdatedQty)) {
      status = "Completed";
    }

    const stageData = {
      quantityAccepted: acceptedQty,
      quantityRejected: rejectedQty,
      lastUpdatedQuantity: acceptedQty + lastUpdatedQty,
      remarks: remark || null,
      operatorName: operator_name || null,
      operator_id: operator_id || null,
      line_number: line_number,
      updatedBy: updated_by || null,
      updatedAt: new Date(),
      log: log || "",
      status,
    };

    return ProductionProcessItem.findByIdAndUpdate(
      id,
      {
        $set: {
          [stageField]: stageData,
          ...(line_number !== undefined && { line_number }),
        },
      },
      { new: true }
    );
  });

  return Promise.all(updatePromises);
};




const updateSkivingStatus = async (itemId, isSkiving) => {
  try {
   

    const item = await ProductionProcessItem.findById(itemId);
    if (!item) throw new Error("Item not found");

    const sheetTotalQty = Number(item.sheet_total_quantity) || 0;

    // Start building update fields
    const updatedFields = {
      'skivingStage.isSkiving': isSkiving,
      'skivingStage.lastUpdatedQuantity': isSkiving ? 0 : sheetTotalQty,
      'skivingStage.updatedAt': new Date()
    };

    if (isSkiving === false) {
      updatedFields['skivingStage.quantityAccepted'] = 0;
      updatedFields['skivingStage.quantityRejected'] = 0;
      updatedFields['skivingStage.status'] = 'Completed';
    }

    const updatedItem = await ProductionProcessItem.findByIdAndUpdate(
      itemId,
      { $set: updatedFields },
      { new: true }
    );

    return updatedItem;
  } catch (error) {
    console.error("Error in service updateSkivingStatus:", error);
    throw error;
  }
};


module.exports = {
  createProductionProcessItems,
  getProductionProcessItems,
  updateItemsByStage,
  updateSkivingStatus
};
