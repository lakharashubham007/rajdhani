const { GatePassDetails } = require("../models");

// Create new GatePassDetails
const createGatePassDetails = async (data) => {
  try {
    const gatePassDetails = await GatePassDetails.create(data);
    return gatePassDetails;
  } catch (error) {
    console.error("❌ Error creating GatePass details:", error);
    throw error;
  }
};

// ✅ Service: Get GatePass Details
const getGatePassDetails = async (page, limit, sort, search) => {
  try {
    const skip = (page - 1) * limit;

    // 🔍 Search filter (e.g., by gate_pass_no or date)
    const filter = search
      ? {
          $or: [
            { gate_pass_no: { $regex: search, $options: "i" } },
            { date: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    // 📌 Sort option
    let sortOptions = {};
    if (sort) {
      const [field, order] = sort.split(":");
      sortOptions[field] = order === "dsc" ? -1 : 1;
    } else {
      sortOptions = { created_at: -1 }; // default: latest first
    }

    // Fetch paginated list
    const gatePassDetailsList = await GatePassDetails.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .populate({
        path: "so_id", // first populate sales order
        model: "SaleOrder",
        populate: {
          path: "customer_id", // then customer inside so_id
          model: "Customer",
        },
      })
      .populate({
        path: "packingDetails_id", // populate packing details
        model: "PackingDetails",
      });
      

    // Total count
    const totalGatePassDetails = await GatePassDetails.countDocuments(filter);

    return {
      gatePassDetails: gatePassDetailsList,
      totalGatePassDetails,
      totalPages: Math.ceil(totalGatePassDetails / limit),
      currentPage: page,
      rowsPerPage: limit,
    };
  } catch (error) {
    console.error("❌ Error getting gate pass details:", error);
    throw error;
  }
};


// Get all GatePassDetails
const getAllGatePassDetails = async () => {
  try {
    return await GatePassDetails.find()
      .populate("packingDetails_id")
      .populate("so_id")
      .populate("operator_id")
      .populate("product_id");
  } catch (error) {
    console.error("❌ Error fetching GatePass details:", error);
    throw error;
  }
};

// Get GatePassDetails by ID
const getGatePassDetailsById = async (id) => {
  try {
    return await GatePassDetails.findById(id)
      .populate("packingDetails_id")
      .populate("so_id")
      .populate("operator_id")
      .populate("product_id");
  } catch (error) {
    console.error("❌ Error fetching GatePass details by ID:", error);
    throw error;
  }
};

// Update GatePassDetails
const updateGatePassDetails = async (id, data) => {
  try {
    return await GatePassDetails.findByIdAndUpdate(id, data, { new: true });
  } catch (error) {
    console.error("❌ Error updating GatePass details:", error);
    throw error;
  }
};

// Delete GatePassDetails
const deleteGatePassDetails = async (id) => {
  try {
    return await GatePassDetails.findByIdAndDelete(id);
  } catch (error) {
    console.error("❌ Error deleting GatePass details:", error);
    throw error;
  }
};

module.exports = {
  createGatePassDetails,
  getAllGatePassDetails,
  getGatePassDetailsById,
  updateGatePassDetails,
  deleteGatePassDetails,
  getGatePassDetails
};
