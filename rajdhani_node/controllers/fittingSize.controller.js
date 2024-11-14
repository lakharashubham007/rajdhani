const { fittingSizeService } = require('../services');

// Create a new Fitting Size
const createFittingSize = async (req, res) => {
  try {
    const fittingSize = await fittingSizeService.createFittingSize(req.body);
    res.json({ success: true, fittingSize, message: 'Fitting Size created successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Get all Fitting Sizes
const getFittingSizes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sort = req.query.sort || 'size';
    const search = req.query.search || '';
    
    const fittingSizes = await fittingSizeService.getFittingSizes(page, limit, sort, search);
    res.json({ success: true, fittingSizes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Get a single Fitting Size by ID
const getFittingSizeById = async (req, res) => {
  try {
    const fittingSize = await fittingSizeService.getFittingSizeById(req.params.id);
    if (!fittingSize) {
      return res.status(404).json({ success: false, message: 'Fitting Size not found' });
    }
    res.json({ success: true, fittingSize });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Update a Fitting Size by ID
const updateFittingSize = async (req, res) => {
  try {
    // Define the fields that may need updating
    const fieldsToUpdate = ['size', 'measurementUnit', 'isActive']; // These are the fields in the FittingSize schema
    const updateData = {};

    // Conditionally add fields from request body to updateData
    fieldsToUpdate.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    // Set updated_at timestamp
    updateData.updated_at = Date.now();

    // Call the service to update the fitting size with only the changed fields
    const updatedFittingSize = await fittingSizeService.updateFittingSize(req.params.id, updateData);

    if (!updatedFittingSize) {
      return res.status(404).json({ success: false, message: 'Fitting Size not found' });
    }

    res.json({ success: true, fittingSize: updatedFittingSize, message: 'Fitting Size updated successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Delete a Fitting Size by ID
const deleteFittingSize = async (req, res) => {
  try {
    const fittingSize = await fittingSizeService.deleteFittingSize(req.params.id);
    if (!fittingSize) {
      return res.status(404).json({ success: false, message: 'Fitting Size not found' });
    }
    res.json({ success: true, message: 'Fitting Size deleted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Update the 'isActive' status of a Fitting Size by ID
const updateFittingSizeStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { isActive } = req.body; // Assume that `isActive` is sent in the request body
  
      // Call the service to update the 'isActive' status
      const updatedFittingSize = await fittingSizeService.updateFittingSizeStatus(id, isActive);
  
      if (!updatedFittingSize) {
        return res.status(404).json({ success: false, message: 'Fitting Size not found' });
      }
  
      res.json({ success: true, updatedFittingSize, message: 'Fitting Size status updated successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };

module.exports = {
  createFittingSize,
  getFittingSizes,
  getFittingSizeById,
  updateFittingSize,
  deleteFittingSize,
  updateFittingSizeStatus
};
