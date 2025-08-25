const { gatePassDetailsService } = require("../services");

// Create a new GatePassDetails entry
const createGatePassDetails = async (req, res) => {
  try {
    const data = await gatePassDetailsService.createGatePassDetails(req.body);
    res.json({
      success: true,
      data,
      message: "GatePass details created successfully!",
    });
  } catch (error) {
    console.error("❌ Error creating GatePass details:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};



// ✅ Controller: Get GatePass Details (Paginated + Search + Sort)
const getGatePassDetails = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sort = req.query.sort || "created_at:dsc"; // default sort
    const search = req.query.search || "";

    const result = await gatePassDetailsService.getGatePassDetails(page, limit, sort, search);
    res.json({ success: true, ...result });
  } catch (error) {
    console.error("❌ Error fetching gate pass details:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get all GatePassDetails
const getAllGatePassDetails = async (req, res) => {
  try {
    const data = await gatePassDetailsService.getAllGatePassDetails();
    res.json({
      success: true,
      data,
      message: "GatePass details fetched successfully!",
    });
  } catch (error) {
    console.error("❌ Error fetching GatePass details:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get GatePassDetails by ID
const getGatePassDetailsById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await gatePassDetailsService.getGatePassDetailsById(id);
    res.json({
      success: true,
      data,
      message: "GatePass details fetched successfully!",
    });
  } catch (error) {
    console.error("❌ Error fetching GatePass details by ID:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Update GatePassDetails
const updateGatePassDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await gatePassDetailsService.updateGatePassDetails(id, req.body);
    res.json({
      success: true,
      data,
      message: "GatePass details updated successfully!",
    });
  } catch (error) {
    console.error("❌ Error updating GatePass details:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Delete GatePassDetails
const deleteGatePassDetails = async (req, res) => {
  try {
    const { id } = req.params;
    await gatePassDetailsService.deleteGatePassDetails(id);
    res.json({
      success: true,
      message: "GatePass details deleted successfully!",
    });
  } catch (error) {
    console.error("❌ Error deleting GatePass details:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  createGatePassDetails,
  getGatePassDetails,
  getAllGatePassDetails,
  getGatePassDetailsById,
  updateGatePassDetails,
  deleteGatePassDetails,
};
