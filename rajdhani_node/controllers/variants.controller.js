const { variantService } = require("../services");

// Create a new Variant
const createVariant = async (req, res) => {
    try {
        const variantData = req.body;

        // Create the variant with dynamic fields
        const variant = await variantService.createVariant(variantData,req.files?.image[0]?.originalname);

        res.json({ success: true, variant: variant, message: 'Variant created successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Controller method to get all variants
const getAllVariants = async (req, res) => {
    try {
      const variants = await variantService.getAllVariants();
      res.json({ success: true, variants });
    } catch (error) {
      console.error('Error fetching variants:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };

// Get  Variants with pagination, sorting, and search
const getVariants = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Default to page 1
        const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page
        const sort = req.query.sort || 'name'; // Default sorting by name
        const search = req.query.search || ''; // Default empty search
        const variants = await variantService.getVariants(page, limit, sort, search);
        res.json({ success: true, ...variants });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Get a single Variant by ID
const getVariantById = async (req, res) => {
    try {
        const variant = await variantService.getVariantById(req.params.id);
        if (!variant) {
            return res.status(404).json({ success: false, message: 'Variant not found' });
        }
        res.json({ success: true, variant: variant });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};


//update variants
const updateVariant = async (req, res) => {
    try {
        // Define the fields that may need updating
        const fieldsToUpdate = [
            'name', 'description', 'variantCode', 'variantSku', 'variantQrCode', 
            'fittingSizeId', 'threadId', 'variantCategoryId', 'variantSubCategoryId', 
            'variantSubSubCategoryId', 'brandId','variantType'
        ];
        const updateData = {};

        // Conditionally add fields from request body to updateData
        fieldsToUpdate.forEach((field) => {
            if (req.body[field] !== undefined) {
                updateData[field] = req.body[field];
            }
        });

        // Check if image file is provided (if applicable), and add it to updateData
        if (req.files && req.files.image && req.files.image[0]) {
            updateData.image = req.files.image[0].originalname;
        }

        // Set updated_at timestamp
        updateData.updatedAt = Date.now();

        // Call the service to update variant with only the changed fields
        const variant = await variantService.updateVariant(req.params.id, updateData);

        if (!variant) {
            return res.status(404).json({ success: false, message: 'Variant not found' });
        }

        res.json({ success: true, variant: variant, message: 'Variant updated successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};


// Delete a Variant by ID
const deleteVariant = async (req, res) => {
    try {
        const variant = await variantService.deleteVariant(req.params.id);
        if (!variant) {
            return res.status(404).json({ success: false, message: 'Variant not found' });
        }
        res.json({ success: true, message: 'Variant deleted successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Update Variant Status
const updateVariantStatus = async (req, res) => {
    try {
        const variantId = req.params.id;
        const status = req.body.status; // Expecting { "status": true } or { "status": false }
        const updatedVariant = await variantService.updateVariantStatus(variantId, status);

        if (!updatedVariant) {
            return res.status(404).json({ success: false, message: 'Variant not found' });
        }

        res.json({
            success: true,
            variant: updatedVariant,
            message: 'Variant status updated successfully!'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

module.exports = {
    createVariant,
    getVariants,
    getVariantById,
    updateVariant,
    deleteVariant,
    updateVariantStatus,
    getAllVariants
};
