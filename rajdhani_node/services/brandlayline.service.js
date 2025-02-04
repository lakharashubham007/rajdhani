const { BrandLayLine } = require("../models");

// Create a new BrandLayLine
const createBrandLayLine = async (data) => {
    try {
        const newBrandLayLine = await BrandLayLine.create(data);
        return newBrandLayLine;
    } catch (error) {
        console.error("Error creating BrandLayLine:", error);
        throw error;
    }
};

// Get all BrandLayLines (for simple retrieval)
const getAllBrandLayLines = async () => {
    try {
        return await BrandLayLine.find({});
    } catch (error) {
        console.error("Error fetching all BrandLayLines:", error);
        throw error;
    }
};

// Get paginated, sorted, and filtered BrandLayLines
const getBrandLayLines = async (page, limit, sort, search) => {
    try {
        const skip = (page - 1) * limit;
        const filter = search ? { name: { $regex: search, $options: "i" } } : {};

        // Parse the sort parameter
        let sortOptions = {};
        if (sort) {
            const [field, order] = sort.split(":");
            sortOptions[field] = order === "dsc" ? -1 : 1;
        } else {
            sortOptions = { name: 1 };
        }

        // Fetch paginated data
        const brandLayLines = await BrandLayLine.find(filter)
            .sort(sortOptions)
            .skip(skip)
            .limit(limit);

        // Count total documents for pagination
        const totalBrandLayLines = await BrandLayLine.countDocuments(filter);

        return {
            brandLayLines,
            totalBrandLayLines,
            totalPages: Math.ceil(totalBrandLayLines / limit),
            currentPage: page,
            rowsPerPage: limit
        };
    } catch (error) {
        console.error("Error fetching BrandLayLines:", error);
        throw error;
    }
};

// Get a single BrandLayLine by ID
const getBrandLayLineById = async (id) => {
    try {
        return await BrandLayLine.findById(id);
    } catch (error) {
        console.error("Error fetching BrandLayLine by ID:", error);
        throw error;
    }
};

// Update a BrandLayLine by ID
const updateBrandLayLine = async (id, updateData) => {
    try {
        updateData.updated_at = Date.now();
        return await BrandLayLine.findByIdAndUpdate(id, updateData, { new: true });
    } catch (error) {
        console.error("Error updating BrandLayLine:", error);
        throw error;
    }
};

// Delete a BrandLayLine by ID
const deleteBrandLayLine = async (id) => {
    try {
        return await BrandLayLine.findByIdAndDelete(id);
    } catch (error) {
        console.error("Error deleting BrandLayLine:", error);
        throw error;
    }
};

// Update BrandLayLine Status
const updateBrandLayLineStatus = async (brandLayLineId, status) => {
    try {
        return await BrandLayLine.findByIdAndUpdate(
            brandLayLineId,
            { status },
            { new: true }
        );
    } catch (error) {
        console.error("Error updating BrandLayLine status:", error);
        throw error;
    }
};

module.exports = {
    createBrandLayLine,
    getBrandLayLines,
    getBrandLayLineById,
    updateBrandLayLine,
    deleteBrandLayLine,
    updateBrandLayLineStatus,
    getAllBrandLayLines
};
