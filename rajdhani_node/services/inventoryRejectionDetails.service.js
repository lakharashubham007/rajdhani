const { InventoryRejectionDetails,  } = require('../models');

// Create a new inventory log entry
const createInventoryRejectionDetails = async (data) => {
  try {
    const inventoryRejectionDetails = await InventoryRejectionDetails.create(data);
    return inventoryRejectionDetails;
  } catch (error) {
    console.error('Error creating inventory rejection details:', error);
    throw error;
  }
};

// Get getInventoryRejectionDetails with Pagination, Sorting, and Search
const getInventoryRejectionDetails = async (page, limit, sort, search) => {
  try {
    const skip = (page - 1) * limit;
    const filter = search ? { "products.product_name": { $regex: search, $options: "i" } } : {};
    let sortOptions = { created_at: -1 };
    
    if (sort) {
      const [field, order] = sort.split(":");
      sortOptions[field] = order === "desc" ? -1 : 1;
    }

    const rejectionDetails = await InventoryRejectionDetails.find(filter)
    .populate([
      { path: 'so_id' },
      { path: 'productionprocess_id' },
      { path: 'productionsheet_id' },
      { path: 'created_by' }
    ])
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    const totalRecords = await InventoryRejectionDetails.countDocuments(filter);

    return {
      rejectionDetails,
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

module.exports = {
  createInventoryRejectionDetails,
  getInventoryRejectionDetails
};
