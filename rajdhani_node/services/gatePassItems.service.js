const { GatePassItems } = require("../models");

// Create a new GatePassItems entry
const createGatePassItems = async (data) => {
  try {
    const gatePassItems = await GatePassItems.create(data);
    return gatePassItems;
  } catch (error) {
    console.error("❌ Error creating gate pass items:", error);
    throw error;
  }
};


const getGatePassItems = async (gatePassDetails_id, page, limit, sort, search) => {
    try {
        const skip = (page - 1) * limit;

        // Build query filter
        const query = { gatePassDetails_id };

        if (search) {
            query.$or = [
                { "product_id.name": { $regex: search, $options: "i" } },
                { "so_id.order_number": { $regex: search, $options: "i" } },
            ];
        }

        // Count total docs
        const total = await GatePassItems.countDocuments(query);

        // Fetch paginated docs
        const items = await GatePassItems.find(query)
            .populate("product_id")
            .populate("so_id")
            .populate("gatePassDetails_id")
            .sort({ [sort]: 1 })
            .skip(skip)
            .limit(limit);

        return {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            data: items,
        };
    } catch (error) {
        throw error;
    }
};






module.exports = {
  createGatePassItems,
  getGatePassItems
};
