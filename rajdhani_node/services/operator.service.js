const { Operator } = require('../models');

// Create a new Operator
const createOperator = async (data, files) => {
  try {
    const image = files && files.image ? files.image[0]?.filename : 'default_operator.jpg';
    const operatorData = { ...data, image };
    const newOperator = await Operator.create(operatorData);//Query
    return newOperator;
  } catch (error) {
    console.error("Error creating operator:", error);
    throw error;
  }
};

// Get all Operators (no filters)
const getAllOperators = async () => {
  try {
    const operatorList = await Operator.find({});
    return operatorList;
  } catch (error) {
    throw error;
  }
};

// Get Operators with pagination, sorting, and search
const getOperators = async (page, limit, sort, search) => {
  try {
    const skip = (page - 1) * limit;

    const filter = search
      ? { $or: [{ fname: { $regex: search, $options: 'i' } }, { lname: { $regex: search, $options: 'i' } }] }
      : {};

    let sortOptions = {};
    if (sort) {
      const [field, order] = sort.split(':');
      sortOptions[field] = order === 'dsc' ? -1 : 1;
    } else {
      sortOptions = { fname: 1 };
    }

    const operatorList = await Operator.find(filter).sort(sortOptions).skip(skip).limit(limit);
    const totalOperators = await Operator.countDocuments(filter);

    return {
      operators: operatorList,
      totalOperators,
      totalPages: Math.ceil(totalOperators / limit),
      currentPage: page,
      rowsPerPage: limit,
    };
  } catch (error) {
    throw error;
  }
};

// Get operator by ID
const getOperatorById = async (id) => {
  try {
    return await Operator.findById(id);
  } catch (error) {
    throw error;
  }
};

// Update an Operator
const updateOperator = async (id, updateData) => {
  try {
    return await Operator.findByIdAndUpdate(id, updateData, { new: true });
  } catch (error) {
    throw error;
  }
};

// Delete Operator
const deleteOperator = async (id) => {
  try {
    return await Operator.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
};

// Update Operator status
const updateOperatorStatus = async (operatorId, status) => {
  try {
    return await Operator.findByIdAndUpdate(operatorId, { status }, { new: true });
  } catch (error) {
    throw error;
  }
};

// Search Operator
const searchOperator = async (query) => {
  try {
    const searchRegex = new RegExp(query, 'i');
    const operators = await Operator.find({
      $or: [
        { fname: searchRegex },
        { lname: searchRegex },
        { email: searchRegex },
      ]
    }).limit(10);
    return operators;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createOperator,
  getOperators,
  getOperatorById,
  updateOperator,
  deleteOperator,
  updateOperatorStatus,
  getAllOperators,
  searchOperator
};
