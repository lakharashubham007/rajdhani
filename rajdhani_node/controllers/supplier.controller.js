const { supplierService } = require('../services');

// Create a new Supplier
const createSupplier = async (req, res) => {
  try {
    const supplierData = req.body;

    const supplier = await supplierService.createSupplier(supplierData, req.files?.image[0]?.originalname);

    res.json({ success: true, supplier, message: 'Supplier created successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Get all Suppliers
const getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await supplierService.getAllSuppliers();
    res.json({ success: true, suppliers });
  } catch (error) {
    console.error('Error getting suppliers:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Get Suppliers with pagination, sorting, and search
const getSuppliers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sort = req.query.sort || 'name';
    const search = req.query.search || '';

    const suppliers = await supplierService.getSuppliers(page, limit, sort, search);

    res.json({ success: true, ...suppliers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Get a Supplier by ID
const getSupplierById = async (req, res) => {
  try {
    const supplier = await supplierService.getSupplierById(req.params.id);

    if (!supplier) {
      return res.status(404).json({ success: false, message: 'Supplier not found' });
    }

    res.json({ success: true, supplier });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const updateSupplier = async (req, res) => {
  try {
    const supplierId = req.params.id;

    // Fetch the existing supplier from the database
    const existingSupplier = await supplierService.getSupplierById(supplierId);

    if (!existingSupplier) {
      return res.status(404).json({ success: false, message: 'Supplier not found' });
    }

    // Initialize the updateData object
    const updateData = {};
    updateData.updated_at = Date.now(); // Update timestamp

    // Fields to update directly from the request body
    const fieldsToUpdate = [
      'name', 'firstName', 'lastName', 'phone', 'email', 'address',
      'state', 'city', 'pincode', 'gstNumber', 'panNumber',
      'status', 'description'
    ];

    fieldsToUpdate.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    // Handle image update
    if (req.files && req.files.image && req.files.image[0]) {
      console.log('Updating supplier image: ', req.files.image[0].originalname);
      updateData.image = req.files.image[0].originalname;
    } else {
      updateData.image = existingSupplier.image; // Retain existing image if no update provided
    }

    // Update the supplier in the database
    const updatedSupplier = await supplierService.updateSupplier(supplierId, updateData);

    if (!updatedSupplier) {
      return res.status(404).json({ success: false, message: 'Supplier not found' });
    }

    res.json({ success: true, supplier: updatedSupplier, message: 'Supplier updated successfully!' });
  } catch (error) {
    console.error('Error updating supplier:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};


// Delete a Supplier by ID
const deleteSupplier = async (req, res) => {
  try {
    const supplier = await supplierService.deleteSupplier(req.params.id);

    if (!supplier) {
      return res.status(404).json({ success: false, message: 'Supplier not found' });
    }

    res.json({ success: true, message: 'Supplier deleted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};



// Update Product Status
const updateSupplierStatus = async (req, res) => {
  try {
      const supplierId = req.params.id;
      const status = req.body.status;
      const updatedSupplier = await supplierService.updateSupplierStatus(supplierId, status);

      res.json({
          success: true,
          supplier: updatedSupplier,
          message: 'Supplier status updated successfully!'
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
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
