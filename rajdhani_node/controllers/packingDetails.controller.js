const { packingDetailsService } = require("../services");

// Create a new PackingDetails entry
const createPackingDetails = async (req, res) => {
  try {
    const data = await packingDetailsService.createPackingDetails(req.body);
    res.json({
      success: true,
      data,
      message: "Packing details created successfully!",
    });
  } catch (error) {
    console.error("❌ Error creating packing details:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


// ✅ Get PackingDetails with pagination, sorting, and search
const getPackingDetails = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sort = req.query.sort || "created_at:dsc"; // default sort
    const search = req.query.search || "";

    const result = await packingDetailsService.getPackingDetails(page, limit, sort, search);
    res.json({ success: true, ...result });
  } catch (error) {
    console.error("❌ Error fetching packing details:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


// Update PackingDetails entry
const savePackingDetails = async (req, res) => {
  try {
    const data = await packingDetailsService.savePackingDetails(req.body);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Packing details not found!",
      });
    }

    res.json({
      success: true,
      data,
      message: "Packing details updated successfully!",
    });
  } catch (error) {
    console.error("❌ Error updating packing details:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  createPackingDetails,
  getPackingDetails,
  savePackingDetails
  
};
