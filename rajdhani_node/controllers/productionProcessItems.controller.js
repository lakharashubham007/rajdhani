const {
  productionProcessItemService,

} = require("../services");



// 🔧 Create Production Process Items
const createProductionProcessItems = async (req, res) => {
  try {
    const items = await productionProcessItemService.createProductionProcessItems(req.body.items);
    res.status(201).json({
      success: true,
      items,
      message: "Production process items created successfully!",
    });
  } catch (error) {
    console.error("Error creating production process items:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};



// Get Sale Orders with Pagination, Search, and Sorting
const getProductionProcessItems = async (req, res) => {
  try {
    const productionProcessID = req.query.production_process_id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sort = req.query.sort || "date";
    const search = req.query.search || "";

    const producitonSheetDetailsWithItems = await productionProcessItemService.getProductionProcessItems(productionProcessID, page, limit, sort, search);
    res.json({ success: true, ...producitonSheetDetailsWithItems });
  } catch (error) {
    console.error("Error fetching sale orders:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


// ✅ Update Production Process Items (for a stage)
const updateProductionProcessItems = async (req, res) => {
  try {
    const { itemDetails, items } = req.body;

    if (!itemDetails || !itemDetails.production_process_id || !itemDetails.stage || !items || !items.length) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: itemDetails or items array",
      });
    }

    await productionProcessItemService.updateItemsByStage(itemDetails, items);

    return res.status(200).json({
      success: true,
      message: "Production process items updated successfully.",
    });
  } catch (error) {
    console.error("Error updating production process items:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


// 🔁 Update Skiving Status Controller
const updateSkivingStatusItems = async (req, res) => {
  try {
    const { item_id, isSkiving, stage } = req.body;

    if (!item_id || typeof isSkiving !== 'boolean' || stage !== 'skivingStage') {
      return res.status(400).json({ success: false, message: "Invalid payload." });
    }

    const updatedItem = await productionProcessItemService.updateSkivingStatus(item_id, isSkiving);

    res.status(200).json({
      success: true,
      data: updatedItem,
      message: `Skiving status updated successfully to ${isSkiving}`
    });

  } catch (error) {
    console.error("Error updating skiving status:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  updateSkivingStatusItems
};



module.exports = {
  createProductionProcessItems,
  getProductionProcessItems,
  updateProductionProcessItems,
  updateSkivingStatusItems
};
