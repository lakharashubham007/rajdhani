const { Variants } = require('../models'); // Assuming Variants is the model for the variant schema

// Create a new Variant
const createVariant = async (data, file) => {
  try {
    const newVariant = (await Variants.create({ ...data, image: file || 'def.png' }));
    return newVariant;
  } catch (error) {
    console.error('Error creating variant:', error);
    throw error;
  }
};

// Service method to get all variants with populated references
const getAllVariants = async () => {
  try {
    const variants = await Variants.find()
      // .populate('fittingSizeId')
      // .populate('threadId')
      // .populate('variantCategoryId')
      // .populate('variantSubCategoryId')
      // .populate('variantSubSubCategoryId')
      // .populate('brandId');
    return variants;
  } catch (error) {
    console.error('Error getting all variants:', error);
    throw error;
  }
};

// Service to get all variants with pagination, sorting, and search
const getVariants = async (page, limit, sort, search) => {
  try {
    const skip = (page - 1) * limit;

    // Build a dynamic filter for searching
    const filter = search ? { name: { $regex: search, $options: 'i' } } : {};

    // Parse the sort parameter
    let sortOptions = {};
    if (sort) {
      const [field, order] = sort.split(':');
      sortOptions[field] = (order === 'dsc') ? -1 : 1; // -1 for descending, 1 for ascending
    } else {
      sortOptions = { name: 1 }; // Default sort by name in ascending order if sort is not provided
    }

    // Find variants with applied filters, sorting, and pagination
    const variantList = await Variants.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      // .populate('fittingSizeId')
      // .populate('threadId')
      // .populate('variantCategoryId')
      // .populate('variantSubCategoryId')
      // .populate('variantSubSubCategoryId')
      // .populate('brandId');
    

    // Get the total count of documents for pagination info
    const totalVariants = await Variants.countDocuments(filter);

    return {
      variants: variantList,
      totalVariants,
      totalPages: Math.ceil(totalVariants / limit),
      currentPage: page,
      rowsPerPage: limit
    };
  } catch (error) {
    console.error('Error getting variants:', error);
    throw error;
  }
};

// Get a single Variant by ID
const getVariantById = async (id) => {
  try {
    const variant = await Variants.findById(id);
    return variant;
  } catch (error) {
    console.error('Error getting variant by ID:', error);
    throw error;
  }
};

// Update a Variant by ID in the service
const updateVariant = async (id, updateData) => {
  try {
    const updatedVariant = await Variants.findByIdAndUpdate(
      id,
      updateData,
      { new: true } // Return the updated document
    );
    return updatedVariant;
  } catch (error) {
    console.error('Error updating variant:', error);
    throw error;
  }
};

// Delete a Variant by ID
const deleteVariant = async (id) => {
  try {
    const deletedVariant = await Variants.findByIdAndDelete(id);
    return deletedVariant;
  } catch (error) {
    console.error('Error deleting variant:', error);
    throw error;
  }
};

// Update Variant Status
const updateVariantStatus = async (variantId, status) => {
  try {
    const updatedVariant = await Variants.findByIdAndUpdate(
      variantId,
      { status },
      { new: true } // Return the updated document
    );
    return updatedVariant;
  } catch (error) {
    console.error('Error updating variant status:', error);
    throw error;
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
