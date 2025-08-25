const { PackingDetails, GatePassItems, GatePassDetails, PackingItems } = require("../models");

// Create a new PackingDetails entry
const createPackingDetails = async (data) => {
  try {
    const packingDetails = await PackingDetails.create(data);
    return packingDetails;
  } catch (error) {
    console.error("❌ Error creating packing details:", error);
    throw error;
  }
};

// Get all PackingDetails with pagination, sorting, and search
const getPackingDetails = async (page, limit, sort, search) => {
  try {
    const skip = (page - 1) * limit;

    // 🔍 Search filter (optional: based on voucher_no or date)
    const filter = search
      ? {
        $or: [
          { voucher_no: { $regex: search, $options: "i" } },
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
    const packingDetailsList = await PackingDetails.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .populate({
        path: "so_id",               // first populate so_id
        populate: {
          path: "customer_id",       // then populate customer_id inside so_id
          model: "Customer",         // make sure this matches your model name
        },
      }); // Populate sales order reference

    // Total count
    const totalPackingDetails = await PackingDetails.countDocuments(filter);

    return {
      packingDetails: packingDetailsList,
      totalPackingDetails,
      totalPages: Math.ceil(totalPackingDetails / limit),
      currentPage: page,
      rowsPerPage: limit,
    };
  } catch (error) {
    console.error("❌ Error getting packing details:", error);
    throw error;
  }
};

// Update or save packing details
// const savePackingDetails = async (data) => {
//   try {
//     const { packingDetails_id, ...updateData } = data;

//     // find record by ID
//     const packingDetails = await PackingDetails.findByIdAndUpdate(
//       packingDetails_id,
//       { $set: updateData },
//       { new: true } // return updated document
//     );

//     return packingDetails;
//   } catch (error) {
//     console.error("❌ Error saving packing details:", error);
//     throw error;
//   }
// };


// Update or save packing details
const savePackingDetails = async (data) => {
  try {
    const { packingDetails_id, ...updateData } = data;

    // Step 1: Update PackingDetails
    const packingDetails = await PackingDetails.findByIdAndUpdate(
      packingDetails_id,
      { $set: updateData },
      { new: true } // return updated document
    );

    if (!packingDetails) {
      throw new Error("Packing details not found!");
    }

    console.log("packingDetails",packingDetails)

    // Step 2: Create GatePassDetails linked to PackingDetails
    const gatePassDetails = await GatePassDetails.create({
      packingDetails_id: packingDetails._id,
      so_id: packingDetails?.so_id,
      party_name: packingDetails?.party_name,
      isPacked: packingDetails?.isFinalize,

      created_at: new Date(),
      
    });

    // Step 3: Get all PackingItems for this PackingDetails
    const packingItems = await PackingItems.find({ packingDetails_id: packingDetails._id });

    console.log("packingItems",packingItems)

    if (packingItems.length > 0) {
      // Step 4: Insert into GatePassItems
      const gatePassItemsData = packingItems.map((item) => ({
        gatePassDetails_id: gatePassDetails._id,
        product_id: item.product_id,
        packing_quantity: item?.packing_quantity,
        operator_id: item?.operator_id,
        operator_name: item?.operator_name,
        quantity: item.assign_quantity, // or whatever qty field applies
        packing: item.packing,
        ordered_quantity: item.ordered_quantity
        // packingDetails_id: packingDetails._id,
      }));

      await GatePassItems.insertMany(gatePassItemsData);
    }

    return {
      packingDetails,
      gatePassDetails,
      message: "Packing details updated and Gate Pass created successfully!",
    };

  } catch (error) {
    console.error("❌ Error saving packing details with gate pass:", error);
    throw error;
  }
};


module.exports = {
  createPackingDetails,
  getPackingDetails,
  savePackingDetails
}
