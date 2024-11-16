const {partsService} = require('../services'); 

// Create a new Part
const createPart = async (req, res) => {
  try {
    // const { name, description, brand_id, hsn_no, ean_no, tax, category_id, subcategory_id } = req.body;

    // if (!name || !brand_id || !category_id || !subcategory_id) {
    //   return res.status(400).json({ success: false, message: 'Name, Brand, Category, and Subcategory are required' });
    // }

    // const partData = {
    //   name,
    //   description,
    //   brand_id,
    //   hsn_no,
    //   ean_no,
    //   tax,
    //   category_id,
    //   subcategory_id,
    // };

    // // Check if an image is provided
    // if (req.files && req.files.image && req.files.image[0]) {
    //   partData.image = req.files.image[0].originalname;
    // }

    // // Check if any gallery images are provided
    // if (req.files && req.files.gallery && req.files.gallery.length) {
    //   partData.gallery = req.files.gallery.map(file => file.originalname);
    // }
    const Part = await partsService.createPart(req.body);

    res.json({ success: true, Part, message: 'Part created successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Controller to get all threads
const getAllParts = async (req, res) => {
  try {
    const parts = await partsService.getAllParts();
    res.json({ success: true, parts });
  } catch (error) {
    console.error('Error getting parts:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Get all Parts with pagination, sorting, and search
const getParts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sort = req.query.sort || 'name';
    const search = req.query.search || '';

    const parts = await partsService.getParts(page, limit, sort, search);

    res.json({ success: true, ...parts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Get a Part by ID
const getPartById = async (req, res) => {
  try {
    const part = await partsService.getPartById(req.params.id);

    if (!part) {
      return res.status(404).json({ success: false, message: 'Part not found' });
    }

    res.json({ success: true, part });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Update a Part by ID
const updatePart = async (req, res) => {
  try {
    // Define the fields that may need updating
    const fieldsToUpdate = [
      'name', 'description','type','material_id','fittingsize_id', 'image', 'gallery', 'brand_id', 'hsn_no', 'ean_no', 'tax', 'status', 'category_id', 'subcategory_id'
    ];
    const updateData = {};

    // Conditionally add fields from the request body to updateData
    fieldsToUpdate.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    // Check if any file (like an image or gallery images) is provided and add them to updateData
    if (req.files) {
      if (req.files.image && req.files.image[0]) {
        updateData.image = req.files.image[0].originalname;
      }
      if (req.files.gallery && req.files.gallery.length) {
        updateData.gallery = req.files.gallery.map(file => file.originalname);
      }
    }

    // Set updated_at timestamp
    updateData.updated_at = Date.now();

    // Call the service to update the part with only the changed fields
    const updatedPart = await partsService.updatePart(req.params.id, updateData);

    if (!updatedPart) {
      return res.status(404).json({ success: false, message: 'Part not found' });
    }

    res.json({ success: true, updatedPart, message: 'Part updated successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Update the status of a Part by ID
const updatePartStatus = async (req, res) => {
  try {
    const { status } = req.body; // Expecting { status: true/false } in request body
    if (status === undefined) {
      return res.status(400).json({ success: false, message: 'Status is required' });
    }

    const updatedPart = await partsService.updatePartStatus(req.params.id, status);

    if (!updatedPart) {
      return res.status(404).json({ success: false, message: 'Part not found' });
    }

    res.json({ success: true, updatedPart, message: `Part status updated successfully to ${status ? 'active' : 'inactive'}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Delete a Part by ID
const deletePart = async (req, res) => {
  try {
    const part = await partsService.deletePart(req.params.id);

    if (!part) {
      return res.status(404).json({ success: false, message: 'Part not found' });
    }

    res.json({ success: true, message: 'Part deleted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

module.exports = {
  createPart,
  getParts,
  getPartById,
  updatePart,
  updatePartStatus,
  deletePart,
  getAllParts
};
