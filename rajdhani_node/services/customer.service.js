const { Customer } = require('../models');

// Create a new Customer
const createCustomer = async (data, files) => {
  try {
    // Handle image upload
    const image = files && files.image ? files.image[0]?.filename : 'rajdhani_product.jpg';

    // Add image to customer data
    const customerData = {
      ...data,
      image, // Store image filename in DB
    };

    const newCustomer = await Customer.create(customerData);
    return newCustomer;
  } catch (error) {
    console.error("Error creating customer:", error);
    throw error;
  }
};
// Get all Customers (simple method without pagination, sorting, searching)
const getAllCustomers = async () => {
  try {
    const customerList = await Customer.find({});
    return customerList;
  } catch (error) {
    console.error('Error getting customers:', error);
    throw error;
  }
};

// Get all Customers with pagination, sorting, and search
const getCustomers = async (page, limit, sort, search) => {
  try {
    const skip = (page - 1) * limit;

    // Build a dynamic filter for searching
    const filter = search
      ? { $or: [{ fname: { $regex: search, $options: 'i' } }, { lname: { $regex: search, $options: 'i' } }] }
      : {};

    // Parse the sort parameter
    let sortOptions = {};
    if (sort) {
      const [field, order] = sort.split(':');
      sortOptions[field] = order === 'dsc' ? -1 : 1; // -1 for descending, 1 for ascending
    } else {
      sortOptions = { fname: 1 }; // Default sort by first name in ascending order
    }

    // Find customers with applied filters, sorting, and pagination
    const customerList = await Customer.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    // Get the total count of documents for pagination info
    const totalCustomers = await Customer.countDocuments(filter);

    return {
      customers: customerList,
      totalCustomers,
      totalPages: Math.ceil(totalCustomers / limit),
      currentPage: page,
      rowsPerPage: limit,
    };
  } catch (error) {
    console.error('Error getting customers:', error);
    throw error;
  }
};

// Get a single Customer by ID
const getCustomerById = async (id) => {
  try {
    const customer = await Customer.findById(id);
    return customer;
  } catch (error) {
    console.error('Error getting customer by ID:', error);
    throw error;
  }
};

// Update a Customer
const updateCustomer = async (id, updateData) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      id,
      updateData,
      { new: true } // Return the updated document
    );
    return updatedCustomer;
  } catch (error) {
    console.error('Error updating customer:', error);
    throw error;
  }
};

// Delete a Customer by ID
const deleteCustomer = async (id) => {
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(id);
    return deletedCustomer;
  } catch (error) {
    console.error('Error deleting customer:', error);
    throw error;
  }
};

// Update Customer Status
const updateCustomerStatus = async (customerId, status) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      customerId,
      { status },
      { new: true } // Return the updated document
    );
    return updatedCustomer;
  } catch (error) {
    console.error('Error updating customer status:', error);
    throw error;
  }
};

const searchCustomer = async (query) => {
  try {
    const searchRegex = new RegExp(query, 'i'); // 'i' makes it case-insensitive

    const customers = await Customer.find({
      $or: [
        { fname: searchRegex },
        { lname: searchRegex },
        { company_name: searchRegex }
      ]
    })
    .limit(10); // Limit results to 6
    
    return customers;
  } catch (error) {
    console.error("Error searching customers:", error);
    throw error;
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
