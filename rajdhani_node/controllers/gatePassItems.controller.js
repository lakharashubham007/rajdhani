const { gatePassItemsService } = require("../services");

// Create a new GatePassItems entry
const createGatePassItems = async (req, res) => {
  try {
    const data = await gatePassItemsService.createGatePassItems(req.body);
    res.json({
      success: true,
      data,
      message: "Gate pass items created successfully!",
    });
  } catch (error) {
    console.error("❌ Error creating gate pass items:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get all GatePass Items by gatePassDetails_id with pagination, search, sort
const getGatePassItems = async (req, res) => {
    try {
        const { id } = req.params;  // gatePassDetails_id
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const sort = req.query.sort || "createdAt"; // default sort field
        const search = req.query.search || "";

        const gatePassItems = await gatePassItemsService.getGatePassItems(
            id,
            page,
            limit,
            sort,
            search
        );

        res.json({ success: true, ...gatePassItems });
    } catch (error) {
        console.error("Error fetching gate pass items:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};



module.exports = {
  createGatePassItems,
  getGatePassItems
};
