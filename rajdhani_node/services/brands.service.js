const { Brands } = require('../models');

// Create a new Brand
const createBrand = async (data, file) => {
  try {
    const newBrand = await Brands.create({ ...data, image: file });
    return newBrand;
  } catch (error) {
    console.error('Error creating brand:', error);
    throw error;
  }
};

// Get all Brands simple method wihtout any pagination and searching sorting for tetsing purpose 
// const getBrands = async () => {
//   try {
//     const brandList = await Brands.find({});
//     return brandList;
//   } catch (error) {
//     console.error('Error getting brands:', error);
//     throw error;
//   }
// };

// Get all Brands with pagination, sorting, and search
const getBrands = async (page, limit, sort, search) => {
  try {
    const skip = (page - 1) * limit;

    // Build a dynamic filter for searching
    const filter = search ? { name: { $regex: search, $options: 'i' } } : {};

    // Find brands with applied filters, sorting, and pagination
    const brandList = await Brands.find(filter)
      .sort({ [sort]: 1 }) // Sort by the specified field in ascending order
      .skip(skip)
      .limit(limit);

    // Get the total count of documents for pagination info
    const totalBrands = await Brands.countDocuments(filter);

    return {
      brands: brandList,
      totalBrands,
      totalPages: Math.ceil(totalBrands / limit),
      currentPage: page
    };
  } catch (error) {
    console.error('Error getting brands:', error);
    throw error;
  }
};


// Get a single Brand by ID
const getBrandById = async (id) => {
  try {
    const brand = await Brands.findById(id);
    return brand;
  } catch (error) {
    console.error('Error getting brand by ID:', error);
    throw error;
  }
};

const updateBrand = async (id, updateData) => {
  try {
    const updatedBrand = await Brands.findByIdAndUpdate(
      id,
      updateData,
      { new: true } // Return the updated document
    );
    return updatedBrand;
  } catch (error) {
    console.error('Error updating brand:', error);
    throw error;
  }
};


// // Update a Brand by ID
// const updateBrand = async (id, data, file) => {
//   try {
//     const updatedBrand = await Brands.findByIdAndUpdate(
//       id,
//       { ...data, ...(file && { image: file }) },
//       { new: true }
//     );
//     return updatedBrand;
//   } catch (error) {
//     console.error('Error updating brand:', error);
//     throw error;
//   }
// };

// Delete a Brand by ID
const deleteBrand = async (id) => {
  try {
    const deletedBrand = await Brands.findByIdAndDelete(id);
    return deletedBrand;
  } catch (error) {
    console.error('Error deleting brand:', error);
    throw error;
  }
};

// Update Brand Status
const updateBrandStatus = async (brandId, status) => {
  try {
    const updatedBrand = await Brands.findByIdAndUpdate(
      brandId,
      { status },
      { new: true } // Return the updated document
    );
    return updatedBrand;
  } catch (error) {
    console.error('Error updating brand status:', error);
    throw error;
  }
};

module.exports = {
  createBrand,
  getBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
  updateBrandStatus
};
