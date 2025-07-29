const { operatorService } = require('../services');

// Create a new Operator
const createOperator = async (req, res) => {
  try {
    const operator = await operatorService.createOperator(req.body, req.files);
    res.status(201).json({ success: true, message: "Operator Added Successfully!", operator });
  } catch (error) {
    res.status(500).json({ message: 'Error creating operator', error: error.message });
  }
};

// Get all Operators (simple)
const getAllOperators = async (req, res) => {
  try {
    const operators = await operatorService.getAllOperators();
    res.status(200).json(operators);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching operators', error: error.message });
  }
};

// Get Operators with pagination, sorting, and search
const getOperators = async (req, res) => {
  try {
    const { page = 1, limit = 10, sort, search } = req.query;
    const operators = await operatorService.getOperators(Number(page), Number(limit), sort, search);
    res.status(200).json(operators);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching operators', error: error.message });
  }
};

// Get a single Operator by ID
const getOperatorById = async (req, res) => {
  try {
    const operator = await operatorService.getOperatorById(req.params.id);
    if (!operator) {
      return res.status(404).json({ message: 'Operator not found' });
    }
    res.status(200).json(operator);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching operator', error: error.message });
  }
};

// Update Operator by ID
const updateOperator = async (req, res) => {
  try {
    const updatedOperator = await operatorService.updateOperator(req.params.id, req.body);
    if (!updatedOperator) {
      return res.status(404).json({ message: 'Operator not found' });
    }
    res.status(200).json(updatedOperator);
  } catch (error) {
    res.status(500).json({ message: 'Error updating operator', error: error.message });
  }
};

// Delete Operator by ID
const deleteOperator = async (req, res) => {
  try {
    const deletedOperator = await operatorService.deleteOperator(req.params.id);
    if (!deletedOperator) {
      return res.status(404).json({ message: 'Operator not found' });
    }
    res.status(200).json({ message: 'Operator deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting operator', error: error.message });
  }
};

// Update Operator Status
const updateOperatorStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updatedOperator = await operatorService.updateOperatorStatus(req.params.id, status);
    if (!updatedOperator) {
      return res.status(404).json({ message: 'Operator not found' });
    }
    res.status(200).json(updatedOperator);
  } catch (error) {
    res.status(500).json({ message: 'Error updating operator status', error: error.message });
  }
};

// Search Operator
const searchOperator = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ success: false, message: "Query parameter is required" });
    }

    const operator = await operatorService.searchOperator(query);
    res.json({ success: true, operator });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
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
