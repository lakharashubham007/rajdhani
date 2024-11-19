const { Supplier } = require('../models');

// Create a new Supplier
const createSupplier = async (data,file) => {
  try {
    const newSupplier = await Supplier.create({...data, image: file});
    return newSupplier;
  } catch (error) {
    console.error('Error creating supplier:', error);
    throw error;
  }
};

// Get all Suppliers
const getAllSuppliers = async () => {
  try {
    const suppliers = await Supplier.find({});
    return suppliers;
  } catch (error) {
    console.error('Error fetching suppliers:', error);
    throw error;
  }
};

// Get Suppliers with pagination, sorting, and search
const getSuppliers = async (page, limit, sort, search) => {
  try {
    const skip = (page - 1) * limit;

    const filter = search
      ? {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
          ],
        }
      : {};

    let sortOptions = {};
    if (sort) {
      const [field, order] = sort.split(':');
      sortOptions[field] = order === 'dsc' ? -1 : 1;
    } else {
       sortOptions = { created_at: -1 };  // Default sort by name in ascending order
    }

    const suppliers = await Supplier.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    const totalSuppliers = await Supplier.countDocuments(filter);

    return {
      suppliers,
      totalSuppliers,
      totalPages: Math.ceil(totalSuppliers / limit),
      currentPage: page,
      rowsPerPage: limit,
    };
  } catch (error) {
    console.error('Error fetching suppliers:', error);
    throw error;
  }
};

// Get a Supplier by ID
const getSupplierById = async (id) => {
  try {
    const supplier = await Supplier.findById(id);
    return supplier;
  } catch (error) {
    console.error('Error fetching supplier by ID:', error);
    throw error;
  }
};

// Update a Supplier by ID
const updateSupplier = async (id, updateData) => {
  try {
    const updatedSupplier = await Supplier.findByIdAndUpdate(id, updateData, { new: true });
    return updatedSupplier;
  } catch (error) {
    console.error('Error updating supplier:', error);
    throw error;
  }
};

// Delete a Supplier by ID
const deleteSupplier = async (id) => {
  try {
    const supplier = await Supplier.findByIdAndDelete(id);
    return supplier;
  } catch (error) {
    console.error('Error deleting supplier:', error);
    throw error;
  }
};

const updateSupplierStatus = async (id, status) => {
  const updatedSupplier = await Supplier.findByIdAndUpdate(id, { status, updated_at: Date.now() }, { new: true });
  return updatedSupplier;
};


module.exports = {
  createSupplier,
  getSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
  getAllSuppliers,
  updateSupplierStatus
};
