const { HoseType } = require("../models");

// Create a new HoseType
const createHoseType = async (data) => {
    try {
        const newHoseType = await HoseType.create(data);
        return newHoseType;
    } catch (error) {
        console.error("Error creating hose type:", error);
        throw error;
    }
};

// Get all HoseTypes (simple method for testing)
const getAllHoseTypes = async () => {
    try {
        const hoseTypeList = await HoseType.find({});
        return hoseTypeList;
    } catch (error) {
        console.error("Error getting hose types:", error);
        throw error;
    }
};

// Get HoseTypes with pagination, sorting, and search
const getHoseTypes = async (page, limit, sort, search) => {
    try {
        const skip = (page - 1) * limit;

        // Build a dynamic filter for searching
        const filter = search ? { name: { $regex: search, $options: "i" } } : {};

        // Parse the sort parameter
        let sortOptions = {};
        if (sort) {
            const [field, order] = sort.split(":");
            sortOptions[field] = order === "dsc" ? -1 : 1;
        } else {
            sortOptions = { name: 1 };
        }

        // Find hose types with applied filters, sorting, and pagination
        const hoseTypeList = await HoseType.find(filter)
            .sort(sortOptions)
            .skip(skip)
            .limit(limit);

        // Get the total count of documents for pagination info
        const totalHoseTypes = await HoseType.countDocuments(filter);

        return {
            hoseTypes: hoseTypeList,
            totalHoseTypes,
            totalPages: Math.ceil(totalHoseTypes / limit),
            currentPage: page,
            rowsPerPage: limit,
        };
    } catch (error) {
        console.error("Error getting hose types:", error);
        throw error;
    }
};

// Get a single HoseType by ID
const getHoseTypeById = async (id) => {
    try {
        const hoseType = await HoseType.findById(id);
        return hoseType;
    } catch (error) {
        console.error("Error getting hose type by ID:", error);
        throw error;
    }
};

// Update a HoseType by ID
const updateHoseType = async (id, updateData) => {
    try {
        const updatedHoseType = await HoseType.findByIdAndUpdate(id, updateData, { new: true });
        return updatedHoseType;
    } catch (error) {
        console.error("Error updating hose type:", error);
        throw error;
    }
};

// Delete a HoseType by ID
const deleteHoseType = async (id) => {
    try {
        const deletedHoseType = await HoseType.findByIdAndDelete(id);
        return deletedHoseType;
    } catch (error) {
        console.error("Error deleting hose type:", error);
        throw error;
    }
};

// Update HoseType Status
const updateHoseTypeStatus = async (hoseTypeId, status) => {
    try {
        const updatedHoseType = await HoseType.findByIdAndUpdate(
            hoseTypeId,
            { status },
            { new: true }
        );
        return updatedHoseType;
    } catch (error) {
        console.error("Error updating hose type status:", error);
        throw error;
    }
};

module.exports = {
    createHoseType,
    getHoseTypes,
    getHoseTypeById,
    updateHoseType,
    deleteHoseType,
    updateHoseTypeStatus,
    getAllHoseTypes,
};
