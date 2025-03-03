const { StockMaintenance, Inventory } = require('../models');

// Create a new stock maintenance entry
// const addStockEntry = async (data) => {
//   try {
//     const newStockEntry = await StockMaintenance.create(data);
//     return newStockEntry;
//   } catch (error) {
//     console.error('Error creating stock entry:', error);
//     throw error;
//   }
// };

// Create multiple stock maintenance entries
const addStockEntry = async (data) => {
    try {
      const stockEntries = data.map((item) => {
        return {
          lot_id: item.lot_id,
          product_id: item.product_id,
          bill_id: item.bill_id,
          po_so_id: item.po_id, // Assuming `po_id` is the PurchaseOrder ID from the API data
          order_type_ref: item?.order_type_ref, // Since it's PO, set the reference
          order_type: item?.order_type, // Set order type as Purchase Order
          original_quantity: item.original_quantity, // Use verified quantity as original quantity
          used_qty: 0, // Default used quantity is 0
          remaining_qty: item.original_quantity, // Remaining quantity equals original quantity initially
        };
      });
  
      // Insert all stock entries into the database
      const newStockEntries = await StockMaintenance.insertMany(stockEntries);

      // Update inventory table for each product
    await Promise.all(
      data.map(async (item) => {
        // Fetch all stock entries for the same product_id
        const stockRecords = await StockMaintenance.find({ product_id: item.product_id });

        // Calculate total remaining_qty for the product
        const totalRemainingQty = stockRecords.reduce((sum, record) => sum + record.remaining_qty, 0);

        // Update or create the inventory entry
        const existingInventory = await Inventory.findOne({ product_id: item.product_id });
        console.log("existingInventory=-=-=-=-=-=-=-=-=-=-=-=-=-][][][][][][]][][][]->",existingInventory)
        if (existingInventory) {
          // Update total_quantity in inventory
          existingInventory.total_quantity = totalRemainingQty;
          console.log("existingInventory 2", existingInventory.total_quantity,totalRemainingQty)
          await existingInventory.save();
        }
        //  else {
        //   // Create a new inventory entry if it doesn't exist
        //   await Inventory.create({
        //     product_id: item.product_id,
        //     total_quantity: totalRemainingQty,
        //     status: "true",
        //   });
        // }
      })
    );

  
      return newStockEntries;
    } catch (error) {
      console.error('Error creating stock entries:', error);
      throw error;
    }
  };



// Get all stock entries without pagination (for testing purposes)
const getAllStockEntries = async () => {
  try {
    const stockEntries = await StockMaintenance.find({});
    return stockEntries;
  } catch (error) {
    console.error('Error fetching stock entries:', error);
    throw error;
  }
};

// Get stock entries with pagination, sorting, and searching
const getStockEntries = async (page, limit, sort, search) => {
  try {
    const skip = (page - 1) * limit;

    // Build a dynamic filter for searching
    const filter = search
      ? { $or: [{ order_type: { $regex: search, $options: 'i' } }] }
      : {};

    // Parse the sort parameter
    let sortOptions = {};
    if (sort) {
      const [field, order] = sort.split(':');
      sortOptions[field] = order === 'dsc' ? -1 : 1; // -1 for descending, 1 for ascending
    } else {
      sortOptions = { created_at: -1 }; // Default sort by creation date descending
    }

    // Fetch stock entries with pagination, sorting, and filtering
    const stockEntries = await StockMaintenance.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    // Get the total count of documents for pagination info
    const totalEntries = await StockMaintenance.countDocuments(filter);

    return {
      entries: stockEntries,
      totalEntries,
      totalPages: Math.ceil(totalEntries / limit),
      currentPage: page,
      rowsPerPage: limit,
    };
  } catch (error) {
    console.error('Error fetching stock entries:', error);
    throw error;
  }
};

// Get a single stock entry by ID
const getStockEntryById = async (id) => {
  try {
    const stockEntry = await StockMaintenance.findById(id).populate([
      { path: 'lot_id' },
      { path: 'product_id' },
      { path: 'bill_id' },
    ]);
    return stockEntry;
  } catch (error) {
    console.error('Error fetching stock entry by ID:', error);
    throw error;
  }
};

// Update a stock entry
const updateStockEntry = async (id, updateData) => {
  try {
    const updatedStockEntry = await StockMaintenance.findByIdAndUpdate(
      id,
      updateData,
      { new: true } // Return the updated document
    );
    return updatedStockEntry;
  } catch (error) {
    console.error('Error updating stock entry:', error);
    throw error;
  }
};

// Delete a stock entry
const deleteStockEntry = async (id) => {
  try {
    const deletedStockEntry = await StockMaintenance.findByIdAndDelete(id);
    return deletedStockEntry;
  } catch (error) {
    console.error('Error deleting stock entry:', error);
    throw error;
  }
};

// Update stock status
const updateStockStatus = async (id, status) => {
  try {
    const updatedStockEntry = await StockMaintenance.findByIdAndUpdate(
      id,
      { status },
      { new: true } // Return the updated document
    );
    return updatedStockEntry;
  } catch (error) {
    console.error('Error updating stock status:', error);
    throw error;
  }
};

module.exports = {
    addStockEntry,
  getAllStockEntries,
  getStockEntries,
  getStockEntryById,
  updateStockEntry,
  deleteStockEntry,
  updateStockStatus,
};
