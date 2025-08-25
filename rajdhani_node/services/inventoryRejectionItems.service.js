const { InventoryRejectionItems, } = require('../models');

// Create a new inventory log entry
const createInventoryRejectionItems = async (data) => {
  try {
    const inventoryRejectionItems = await InventoryRejectionItems.create(data);
    return inventoryRejectionItems;
  } catch (error) {
    console.error('Error creating inventory rejection items:', error);
    throw error;
  }
};

// Get getInventoryRejectionItems with Pagination, Sorting, and Search
const getInventoryRejectionItems = async (id, page, limit, sort, search) => {
  try {
    const skip = (page - 1) * limit;
    // const filter = search ? { "products.product_name": { $regex: search, $options: "i" } } : {};
    // Build filter
    const filter = {
      inventoryrejectiondetails_id: id, // only extract items with this ID
    };
    let sortOptions = { created_at: -1 };

    if (sort) {
      const [field, order] = sort.split(":");
      sortOptions[field] = order === "desc" ? -1 : 1;
    }

    const rejectedItems = await InventoryRejectionItems.find(filter)
      .populate([
        // { path: 'inventoryrejectiondetails_id' },
        {
          path: 'inventoryrejectiondetails_id',
          populate: {
            path: 'so_id',  // populate so_id inside inventoryrejectiondetails_id
          }
        },
        { path: 'product_id' },
        // {path: 'so_id'}      
      ])
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    const totalRecords = await InventoryRejectionItems.countDocuments(filter);

    return {
      rejectedItems,
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
  createInventoryRejectionItems,
  getInventoryRejectionItems
};
