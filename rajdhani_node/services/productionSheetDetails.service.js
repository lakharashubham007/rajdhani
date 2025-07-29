const {ProductionSheetDetails,ProductionSheetItem} = require('../models');
const { SheetNumberCounter } = require('../models/sheetNumberCounter.model');
const mongoose = require('mongoose');
const { getStatusCounts } = require('../utils/sidebarmenuCount/statusCount');


const getCurrentSheetNumber = async () => {
  let counter = await SheetNumberCounter.findOne({ name: 'sheet_no' });

  // If not found, initialize at 1000
  if (!counter) {
    counter = await SheetNumberCounter.create({ name: 'sheet_no', seq: 1000 });
  }

  return counter.seq + 1; // Next number to use
};


const incrementSheetNumber = async () => {
  await SheetNumberCounter.updateOne(
    { name: 'sheet_no' },
    { $inc: { seq: 1 } }
  );
};


// Create a new createProductionSheetDetails
const createProductionSheetDetailss = async (data) => {
  console.log("data is here", data);
  try {
    // Check if a sheet already exists for the given order_id
    // const existingSheet = await ProductionSheetDetails.findOne({ order_id: data.order_id });

    // if (existingSheet) {
    //   // Sheet already exists, return this info
    //   return { alreadyExists: true, message: 'A production sheet already exists for this order ID.' };
    // }

    //   // Get the next available sheet number safely
    //   const nextSheetNo = await getNextSheetNumber();

    // // If not, create a new production sheet
    // const productionSheetDetails = await ProductionSheetDetails.create({ 
    //   ...data,  
    //   sheet_no: nextSheetNo,
    // });

    // return productionSheetDetails;
    const nextSheetNo = await getCurrentSheetNumber();

    const productionSheetDetails = await ProductionSheetDetails.create({ 
      ...data,  
      sheet_no: nextSheetNo,
    });

    // Only increment the counter after successful creation
    await incrementSheetNumber();

    return productionSheetDetails;
  } catch (error) {
    console.error("Error creating production sheet details:", error);
    throw error;
  }
};

const getNextSequenceNumber = async (counterName, session, startSeq = 1001) => {
  // Check if the counter document exists
  const existingCounter = await SheetNumberCounter.findOne({ name: counterName }).session(session);

  if (!existingCounter) {
    // Create the counter document with starting sequence
    await SheetNumberCounter.create([{ name: counterName, seq: startSeq }], { session });
    return startSeq;
  } else {
    // Increment seq by 1 and return updated seq
    const updatedCounter = await SheetNumberCounter.findOneAndUpdate(
      { name: counterName },
      { $inc: { seq: 1 } },
      { new: true, session }
    );
    return updatedCounter.seq;
  }
};

const createProductionSheetDetails = async (data) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const nextSheetNo = await getNextSequenceNumber('sheet_no', session);

    // Create the production sheet details with the generated sheet_no
    const productionSheetDetails = await ProductionSheetDetails.create(
      [{ ...data, sheet_no: nextSheetNo }],
      { session }
    );

    await session.commitTransaction();
    session.endSession();
    
    // 🧠 Modular call for ProductionSheetDetails count
    const statusCount = await getStatusCounts();

    return {
      data: productionSheetDetails[0],
      statusCount,
    };
    // return productionSheetDetails[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error creating production sheet details:", error);
    throw error;
  }
};



const getLastSheetNo = async () => {
  try {
    const lastSheet = await ProductionSheetDetails.findOne().sort({ created_at: -1 });
    return lastSheet?.sheet_no ? lastSheet?.sheet_no : 1000 || null;
  } catch (error) {
    console.error("Error fetching last sheet no:", error);
    throw error;
  }
};

// Get Production Sheet With Pagination, Sorting, and Search
const getProductionSheets = async (page, limit, sort, search) => {
  try {
    const skip = (page - 1) * limit;
    const filter = search ? { "products.product_name": { $regex: search, $options: "i" } } : {};
    let sortOptions = { created_at: -1 };
    
    if (sort) {
      const [field, order] = sort.split(":");
      sortOptions[field] = order === "desc" ? -1 : 1;
    }

    const productionSheets = await ProductionSheetDetails.find(filter)
    .populate([
      { path: 'order_id' },
      { path: 'party_id' },
    ])
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    const totalRecords = await ProductionSheetDetails.countDocuments(filter);

    return {
      productionSheets,
      totalRecords,
      totalPages: Math.ceil(totalRecords / limit),
      currentPage: page,
      rowsPerPage: limit,
    };
  } catch (error) {
    console.error("Error fetching sale orders:", error);
    throw error;
  }
};



const getProductionSheetDetailsWithItems = async (productionSheetID, page, limit, sort, search) => {
  try {
    const skip = (page - 1) * limit;

    // Parse sort: e.g., "created_at:desc" → { created_at: -1 }
    let sortOptions = { created_at: -1 };
    if (sort) {
      const [field, order] = sort.split(':');
      sortOptions = { [field]: order === 'desc' ? -1 : 1 };
    }

    // Convert sheet ID to ObjectId
    // const sheetObjectId = mongoose.Types.ObjectId(productionSheetID);

    // 1. Fetch production sheet details
    const sheetDetails = await ProductionSheetDetails.findById(productionSheetID);
    if (!sheetDetails) {
      throw new Error('Production sheet not found');
    }

    // 2. Build filter for items
    const itemFilter = { production_sheet_id: productionSheetID };
    if (search && search.trim() !== '') {
      itemFilter["hose_label"] = { $regex: search, $options: 'i' }; // Customize field for search
    }

    // 3. Fetch paginated items
    const productionSheetItems = await ProductionSheetItem.find(itemFilter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    // 4. Get total item count for pagination
    const totalItems = await ProductionSheetItem.countDocuments({ production_sheet_id: productionSheetID });

    // 5. Return formatted response
    return {
      productionSheetDetails: sheetDetails,
      productionSheetItems,
      totalItems,
      createdBy: sheetDetails.created_by,
      // createdAt: sheetDetails.created_at,
      currentPage: page,
      rowsPerPage: limit,
      totalPages: Math.ceil(totalItems / limit),
    };

  } catch (error) {
    console.error('Error in getProductionSheetDetailsWithItems:', error);
    throw error;
  }
};

const searchBySheetOrOrderNo = async (search) => {
  try {
    const results = await ProductionSheetDetails.find({
      $or: [
        { sheet_no: search },
        { order_no: search }
      ]
    }).sort({ created_at: -1 }); // Optional: sort by latest

    return results;
  } catch (error) {
    console.error("Error in searchBySheetOrOrderNo:", error);
    throw error;
  }
};






module.exports = {
    createProductionSheetDetails,
    getLastSheetNo,
    getProductionSheets,
    getProductionSheetDetailsWithItems,
    searchBySheetOrOrderNo
  };
  