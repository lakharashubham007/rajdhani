const {productionSheetItemsService} = require('../services');

// Create a new Produciton Sheet Items
const createProductionSheetItems = async (req, res) => {
  try {
    const newItem = await productionSheetItemsService.createProductionSheetItems(req.body);
    res.status(201).json({ success: true, po_items: newItem, message: 'Produciton Sheet items created successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Get last 5 usages of a product for a party
const getLastFiveProductUsages = async (req, res) => {
  const { product_id, party_id } = req.query;
 
  if (!product_id || !party_id) {
    return res.status(400).json({ success: false, message: "product_id and party_id are required." });
  }

  try {
    const items = await productionSheetItemsService.getLastFiveProductUsages(product_id, party_id);
    res.status(200).json({ success: true, items, message: "Fetched latest 5 usages successfully." });
  } catch (error) {
    console.error("Error in getLastFiveProductUsages:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get Production Sheet Items by Production Sheet ID
const getProductionSheetItemsById = async (req, res) => {
  try {
    const items = await productionSheetItemsService.getProductionSheetItemsById(req.params.id);

    if (!items || items.length === 0) {
      return res.status(404).json({ success: false, message: 'No production sheet items found for this ID' });
    }

    res.status(200).json({ success: true, items });
  } catch (error) {
    console.error("Error fetching production sheet items by ID:", error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};


module.exports = {
  createProductionSheetItems,
  getLastFiveProductUsages,
  getProductionSheetItemsById
  };
  