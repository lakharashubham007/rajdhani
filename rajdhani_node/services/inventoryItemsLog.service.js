const { InventoryItemsLog, Inventory } = require('../models');
const mongoose = require('mongoose');

// Create a new inventory log entry
const createInventoryLog = async (data) => {
  try {
    const newLog = await InventoryItemsLog.create(data);
    return newLog;
  } catch (error) {
    console.error('Error creating inventory log:', error);
    throw error;
  }
};

// Get all inventory logs (no pagination)
const getAllInventoryLogs = async () => {
  try {
    const logs = await InventoryItemsLog.find({});
    return logs;
  } catch (error) {
    console.error('Error getting all inventory logs:', error);
    throw error;
  }
};

// Get inventory logs with pagination, sorting, and search
const getInventoryLogs = async (page, limit, sort, search) => {
  try {
    const skip = (page - 1) * limit;

    // Search filter
    const filter = search
      ? {
        $or: [
          { product_name: { $regex: search, $options: 'i' } },
          { product_code: { $regex: search, $options: 'i' } },
          { action_type: { $regex: search, $options: 'i' } },
        ],
      }
      : {};

    // Sorting options
    let sortOptions = {};
    if (sort) {
      const [field, order] = sort.split(':');
      sortOptions[field] = order === 'dsc' ? -1 : 1;
    } else {
      sortOptions = { createdAt: -1 }; // Default sort by latest first
    }

    const logs = await InventoryItemsLog.find(filter)
      .populate('inventory_id')
      .populate('product_id')
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email')
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    const totalLogs = await InventoryItemsLog.countDocuments(filter);

    return {
      logs,
      totalLogs,
      totalPages: Math.ceil(totalLogs / limit),
      currentPage: page,
      rowsPerPage: limit,
    };
  } catch (error) {
    console.error('Error fetching inventory logs:', error);
    throw error;
  }
};

// Get inventory log by ID
const getInventoryLogById = async (id) => {
  try {
    const log = await InventoryItemsLog.findById(id)
      .populate('inventory_id')
      .populate('product_id')
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email');
    return log;
  } catch (error) {
    console.error('Error fetching inventory log by ID:', error);
    throw error;
  }
};

// Update inventory log by ID
const updateInventoryLog = async (id, updateData) => {
  try {
    const updatedLog = await InventoryItemsLog.findByIdAndUpdate(id, updateData, { new: true });
    return updatedLog;
  } catch (error) {
    console.error('Error updating inventory log:', error);
    throw error;
  }
};

// Delete inventory log by ID
const deleteInventoryLog = async (id) => {
  try {
    const deletedLog = await InventoryItemsLog.findByIdAndDelete(id);
    return deletedLog;
  } catch (error) {
    console.error('Error deleting inventory log:', error);
    throw error;
  }
};

// Update inventory log status (if you have status field)
const updateInventoryLogStatus = async (id, status) => {
  try {
    const updatedLog = await InventoryItemsLog.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    return updatedLog;
  } catch (error) {
    console.error('Error updating inventory log status:', error);
    throw error;
  }
};





// const bulkLogAndUpdateInventory = async (items, createdBy) => {
//   const session = await mongoose.startSession();
//   session.startTransaction();
//   // console.log("items in service file",items)

//   try {
//     const results = [];

//     for (const item of items) {

//       // Get current inventory
//       const inventoryRecord = await Inventory.findById(item.inventory_id).session(session);



//       // Create log entry first
//       const logData = {
//         inventory_id: item.inventory_id,
//         product_id: item.product_id,
//         product_code: item.product_code,
//         product_name: item.product_name,
//         assign_quantity: item.assign_quantity,
//         so_id: item.so_id,
//         action_type: "ASSIGN", // e.g., "ADD", "REMOVE"
//       };
//       // Create log Entry query
//       const log = await InventoryItemsLog.create([logData], { session });


//       const assignQty = Number(item.assign_quantity) || 0;
//       const reserveQty = Number(item.reserve_quantity) || 0;

//       // Update inventory total quantity
//       inventoryRecord.available_quantity = Number(inventoryRecord.available_quantity) - assignQty - reserveQty;

//       if (assignQty > 0) {
//         inventoryRecord.assign_quantity = Number(inventoryRecord.assign_quantity) + assignQty;
//         inventoryRecord.lastAssignQuantity = assignQty;
//       }

//       if (reserveQty > 0) {
//         inventoryRecord.reserve_quantity = Number(inventoryRecord.reserve_quantity) + reserveQty;
//       }

//       await inventoryRecord.save({ session });

//       results.push({ log: log[0], updatedInventory: inventoryRecord });
//     }

//     await session.commitTransaction();
//     session.endSession();

//     return results;
//   } catch (error) {
//     await session.abortTransaction();
//     session.endSession();
//     throw error;
//   }
// };


// 📄 Get logs for specific item and stage


const bulkLogAndUpdateInventory = async (items, createdBy) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const results = [];

    for (const item of items) {
      console.log("item is here", item)
      // Fetch inventory record
      const inventoryRecord = await Inventory.findById(item.inventory_id).session(session);

      const assignQty = Number(item.assign_quantity) || 0;
      const reserveQty = Number(item.reserve_quantity) || 0;

      // Decide action_type
      let actionType = null;
      if (assignQty > 0 && reserveQty > 0) {
        actionType = "ASSIGN&RESERVE";
      } else if (assignQty > 0) {
        actionType = "ASSIGN";
      } else if (reserveQty > 0) {
        actionType = "RESERVE";
      }

      // Create log entry
      const logData = {
        inventory_id: item.inventory_id,
        product_id: item.product_id,
        product_code: item.product_code,
        product_name: item.product_name,
        assign_quantity: assignQty,
        reserve_quantity: reserveQty,
        ordered_quantity: item.quantity,
        so_id: item.so_id,
        action_type: actionType,
        created_by: createdBy,
        isDeliverable: item.isDeliverable
      };

      const log = await InventoryItemsLog.create([logData], { session });

      // Update inventory quantities
      inventoryRecord.available_quantity =
        Number(inventoryRecord.available_quantity) - assignQty - reserveQty;

      if (assignQty > 0) {
        inventoryRecord.assign_quantity =
          Number(inventoryRecord.assign_quantity) + assignQty;
        inventoryRecord.lastAssignQuantity = assignQty;
      }

      if (reserveQty > 0) {
        inventoryRecord.reserve_quantity =
          Number(inventoryRecord.reserve_quantity) + reserveQty;
      }

      await inventoryRecord.save({ session });

      results.push({ log: log[0], updatedInventory: inventoryRecord });
    }

    await session.commitTransaction();
    session.endSession();
    return results;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const bulkStockJournalLogAndUpdateInventory = async (items) => {
  console.log("items in Stock ------> ", items)
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const results = [];

    for (const item of items) {
      const { product_id, quantity, type, created_by, narration } = item;

      // Fetch inventory record for product
      const inventoryRecord = await Inventory.findOne({ product_id }).session(session);
      console.log("items for  Stock inventoryRecord------> ", inventoryRecord)
      if (!inventoryRecord) {
        throw new Error(`Inventory not found for product_id: ${product_id}`);
      }

      const qty = Number(quantity) || 0;

      // 1. Create Log Entry
      const logData = {
        product_id,
        action_type:
          type === "source"
            ? "Stock Journal - Source"
            : type === "destination"
              ? "Stock Journal - Destination"
              : "Stock Journal", // fallback
        assign_quantity: qty,
        created_by,
        narration
      };

      const log = await InventoryItemsLog.create([logData], { session });

      // 2. Update Inventory
      if (type === "source") {
        // reduce
        inventoryRecord.available_quantity = Number(inventoryRecord.available_quantity) - qty;
      } else if (type === "destination") {
        // add
        inventoryRecord.available_quantity = Number(inventoryRecord.available_quantity) + qty;
      }

      await inventoryRecord.save({ session });

      results.push({
        log: log[0],
        updatedInventory: inventoryRecord
      });
    }

    await session.commitTransaction();
    session.endSession();

    return results;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const getLogsByItemAndSO = async (item_id, so_id) => {
  console.log("item_id, so_id", item_id, so_id)
  try {
    return await InventoryItemsLog.find({
      product_id: item_id,
      so_id: so_id
    })
      .sort({ createdAt: -1 }) // latest first
      .lean();
  } catch (error) {
    console.error("❌ Error in getLogsByItemAndSO:", error);
    throw error;
  }
};

// 📄 Get logs for specific item and stage
const getLogsByItemId = async (item_id) => {
  console.log("item_id", item_id)

  try {
    return await InventoryItemsLog.find({
      product_id: item_id,

    })
      .sort({ createdAt: -1 }) // latest first
      .lean();
  } catch (error) {
    console.error("❌ Error in getLogsByItemAndSO:", error);
    throw error;
  }
};


const getUniqueSOIdsWithDetails = async (page, limit, sort, search) => {
  try {
    await InventoryItemsLog.collection.createIndex({ so_id: 1 });

    const skip = (page - 1) * limit;

    // Sorting
    let sortOptions = {};
    if (sort) {
      const [field, order] = sort.split(':');
      sortOptions[field] = order === 'dsc' ? -1 : 1;
    } else {
      sortOptions = { count: -1 }; // default
    }

    // Build aggregation pipeline
    const pipeline = [
      // 1️⃣ Group by so_id
      {
        $group: {
          _id: "$so_id",
          count: { $sum: 1 }
        }
      },
    ];

    // 2️⃣ Apply search if provided (on fields inside saleorders)
    if (search) {
      pipeline.push(
        {
          $lookup: {
            from: "saleorders",
            localField: "_id",
            foreignField: "_id",
            as: "so_details"
          }
        },
        {
          $match: {
            "so_details.customer_name": { $regex: search, $options: 'i' }
          }
        }
      );
    } else {
      pipeline.push(
        {
          $lookup: {
            from: "saleorders",
            localField: "_id",
            foreignField: "_id",
            as: "so_details"
          }
        }
      );
    }

    // 3️⃣ Unwind for one-to-one mapping
    pipeline.push({
      $unwind: { path: "$so_details", preserveNullAndEmptyArrays: true }
    });

    // 4️⃣ Sort
    pipeline.push({ $sort: sortOptions });

    // 5️⃣ Pagination
    pipeline.push({ $skip: skip }, { $limit: limit });

    // 6️⃣ Project final structure
    pipeline.push({
      $project: {
        _id: 0,
        so_id: "$so_details",
        count: 1
      }
    });

    const data = await InventoryItemsLog.aggregate(pipeline).allowDiskUse(true);

    // Total count for pagination
    const totalAgg = await InventoryItemsLog.aggregate([
      { $group: { _id: "$so_id" } },
      { $count: "total" }
    ]);
    const total = totalAgg[0]?.total || 0;

    return {
      data,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      rowsPerPage: limit
    };
  } catch (error) {
    console.error("❌ Error in getUniqueSOIdsWithDetails service:", error);
    throw error;
  }
};


const getPackingItemsBySoId = async (soId, page = 1, limit = 10) => {
  try {
    const skip = (page - 1) * limit;

    const pipeline = [
      {
        $match: {
          so_id: new mongoose.Types.ObjectId(soId),
        },
      },
      {
        $group: {
          _id: "$product_id",
          total_assign_quantity: { $sum: "$assign_quantity" },
          doc: { $first: "$$ROOT" }, // keep one sample for product_code/name
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product_details",
        },
      },
      { $unwind: { path: "$product_details", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          _id: 0,
          product_id: "$_id",
          product_code: "$doc.product_code",
          product_name: "$doc.product_name",
          ordered_quantity: "$doc.ordered_quantity",
          total_assign_quantity: 1,
          product_details: 1,
        },
      },
      { $sort: { product_name: 1 } }, // optional: sort alphabetically
      { $skip: skip },
      { $limit: limit },
    ];

    // Fetch paginated grouped data
    const data = await InventoryItemsLog.aggregate(pipeline);

    // Count total unique products for this soId
    const totalAgg = await InventoryItemsLog.aggregate([
      { $match: { so_id: new mongoose.Types.ObjectId(soId) } },
      { $group: { _id: "$product_id" } },
      { $count: "total" },
    ]);

    const total = totalAgg[0]?.total || 0;

    return {
      data,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      rowsPerPage: limit,
    };
  } catch (error) {
    console.error("❌ Error in getPackingItemsBySoId service:", error);
    throw error;
  }
};

// const getPackingItemsBySoId = async (soId, page, limit) => {
//   try {
//     const skip = (page - 1) * limit;

//     const pipeline = [
//       {
//         $match: {
//           so_id: new mongoose.Types.ObjectId(soId),
//         },
//       },
//       {
//         $group: {
//           _id: "$product_id",
//           total_assign_quantity: { $sum: "$assign_quantity" },
//           doc: { $first: "$$ROOT" }, // keep one sample doc for details
//         },
//       },
//       {
//         $lookup: {
//           from: "products", // assuming your product collection is "products"
//           localField: "_id",
//           foreignField: "_id",
//           as: "product_details",
//         },
//       },
//       { $unwind: { path: "$product_details", preserveNullAndEmptyArrays: true } },
//       {
//         $project: {
//           _id: 0,
//           product_id: "$_id",
//           product_code: "$doc.product_code",
//           product_name: "$doc.product_name",
//           total_assign_quantity: 1,
//           product_details: 1,
//         },
//       },
//       { $skip: skip },
//       { $limit: limit },
//     ];

//     const data = await InventoryItemsLog.aggregate(pipeline);

//     // For total count of unique product_ids
//     const totalAgg = await InventoryItemsLog.aggregate([
//       { $match: { so_id: new mongoose.Types.ObjectId(soId) } },
//       { $group: { _id: "$product_id" } },
//       { $count: "total" },
//     ]);

//     const total = totalAgg[0]?.total || 0;

//     return {
//       data,
//       total,
//       totalPages: Math.ceil(total / limit),
//       currentPage: page,
//       rowsPerPage: limit,
//     };
//   } catch (error) {
//     console.error("❌ Error in getPackingItemsBySoId service:", error);
//     throw error;
//   }
// };




module.exports = {
  createInventoryLog,
  getAllInventoryLogs,
  getInventoryLogs,
  getInventoryLogById,
  updateInventoryLog,
  deleteInventoryLog,
  updateInventoryLogStatus,
  bulkLogAndUpdateInventory,
  getLogsByItemAndSO,
  getLogsByItemId,
  bulkStockJournalLogAndUpdateInventory,
  getUniqueSOIdsWithDetails,
  getPackingItemsBySoId

};
