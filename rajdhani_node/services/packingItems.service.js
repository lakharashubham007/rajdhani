const { PackingItems } = require("../models");

// Create a new PackingDetails entry
const createPackingItems = async (data) => {
    try {
        const packingItems = await PackingItems.create(data);
        return packingItems;
    } catch (error) {
        console.error("❌ Error creating packing details:", error);
        throw error;
    }
};


const getPackingItems = async (packingDetailsId, page, limit, sort, search) => {
    try {
        const skip = (page - 1) * limit;

        // Build filter
        const query = { packingDetails_id: packingDetailsId };

        if (search) {
            query.$or = [
                { "product_id.name": { $regex: search, $options: "i" } }, // if product has name
                { "so_id.order_number": { $regex: search, $options: "i" } }, // if so_id has order_number
            ];
        }

        // Count total docs
        const total = await PackingItems.countDocuments(query);

        // Fetch paginated docs
        const items = await PackingItems.find(query)
            .populate("product_id")
            .populate("so_id")
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


const savePackingItems = async (items) => {
    try {
        const results = [];

        for (const item of items) {
            const { packingDetails_id, product_id } = item;

            if (!packingDetails_id || !product_id) {
                throw new Error("packingDetails_id and product_id are required for each item");
            }

            // Update only (don't create new)
            const updatedItem = await PackingItems.findOneAndUpdate(
                { packingDetails_id, product_id },
                {
                    $set: {
                        packing: item.packing,
                        operator_id: item.operator_id,
                        operator_name: item.operator_name,
                        // ordered_quantity: item.ordered_quantity,
                        // packing_quantity: item.packing_quantity,
                        // so_id: item.so_id,
                    },
                },
                { new: true } // return updated doc
            );

            if (updatedItem) {
                results.push(updatedItem);
            } else {
                // If not found, skip
                console.warn(`⚠️ No record found for product_id: ${product_id} with packingDetails_id: ${packingDetails_id}`);
            }
        }

        return results;
    } catch (error) {
        console.error("❌ Error in savePackingItems service:", error);
        throw error;
    }
};





module.exports = {
    createPackingItems,
    getPackingItems,
    savePackingItems
}
