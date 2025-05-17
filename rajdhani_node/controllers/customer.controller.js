const {customerService} = require('../services');

// Create a new Customer
const createCustomer = async (req, res) => {
  try {
    const customer = await customerService.createCustomer(req.body, req.files);
    res.status(201).json({success: true,message: "Customer Added Successfully!", customer});
  } catch (error) {
    res.status(500).json({ message: 'Error creating customer', error: error.message });
  }
};

// Get all Customers (simple)
const getAllCustomers = async (req, res) => {
  try {
    const customers = await customerService.getAllCustomers();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching customers', error: error.message });
  }
};

// Get Customers with pagination, sorting, and search
const getCustomers = async (req, res) => {
  try {
    const { page = 1, limit = 10, sort, search } = req.query;
    const customers = await customerService.getCustomers(Number(page), Number(limit), sort, search);
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching customers', error: error.message });
  }
};

// Get a single Customer by ID
const getCustomerById = async (req, res) => {
  try {
    const customer = await customerService.getCustomerById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching customer', error: error.message });
  }
};

// Update Customer by ID
const updateCustomer = async (req, res) => {
  try {
    const updatedCustomer = await customerService.updateCustomer(req.params.id, req.body);
    if (!updatedCustomer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.status(200).json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ message: 'Error updating customer', error: error.message });
  }
};

// Delete Customer by ID
const deleteCustomer = async (req, res) => {
  try {
    const deletedCustomer = await customerService.deleteCustomer(req.params.id);
    if (!deletedCustomer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.status(200).json({ message: 'Customer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting customer', error: error.message });
  }
};

// Update Customer Status
const updateCustomerStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updatedCustomer = await customerService.updateCustomerStatus(req.params.id, status);
    if (!updatedCustomer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.status(200).json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ message: 'Error updating customer status', error: error.message });
  }
};


// Controller to get all products
const searchCustomer = async (req, res) => {
    try {
        const { query } = req.query; // Get search query from request

        if (!query) {
            return res.status(400).json({ success: false, message: "Query parameter is required" });
        }

        // Fetch matching products from the service
        const cutomer = await customerService.searchCustomer(query);

        res.json({ success: true, cutomer });
    } catch (error) {
        console.error("Error searching party:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

module.exports = {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  updateCustomerStatus,
  getAllCustomers,
  searchCustomer
};
