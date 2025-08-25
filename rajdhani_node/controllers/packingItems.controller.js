const { packingItemsService } = require("../services");

// Create a new PackingDetails entry
const createPackingItems = async (req, res) => {
    try {
        const data = await packingItemsService.createPackingItems(req.body);
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

const getPackingItems = async (req, res) => {
    try {
        const { id } = req.params;  // packingDetails_id
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const sort = req.query.sort || "createdAt"; // default sort field
        const search = req.query.search || "";

        const packingItems = await packingItemsService.getPackingItems(
            id,
            page,
            limit,
            sort,
            search
        );

        res.json({ success: true, ...packingItems });
    } catch (error) {
        console.error("Error fetching packing items:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

const savePackingItems = async (req, res) => {
    try {
        const items = req.body; // Expecting an array of items

        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ success: false, message: "No items provided" });
        }

        const data = await packingItemsService.savePackingItems(items);

        res.json({
            success: true,
            data,
            message: "Packing items updated successfully!",
        });
    } catch (error) {
        console.error("❌ Error updating packing items:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


module.exports = {
    createPackingItems,
    getPackingItems,
    savePackingItems

};
