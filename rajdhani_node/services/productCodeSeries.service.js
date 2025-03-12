const {ProductCodeCounter} = require('../models');

// Create a new Product Code Series entry
const createProductCodeSeries = async (data) => {
  try {
    const newSeries = await ProductCodeCounter.create(data);
    return newSeries;
  } catch (error) {
    console.error('Error creating product code series:', error);
    throw error;
  }
};

// Get all Product Code Series (without filters)
const getAllProductCodeSeries = async () => {
  try {
    return await ProductCodeCounter.find({});
  } catch (error) {
    console.error('Error getting product code series:', error);
    throw error;
  }
};

// Get Product Code Series with pagination, sorting, and search
const getProductCodeSeries = async (page, limit, sort, search) => {
  try {
    const skip = (page - 1) * limit;
    const filter = search ? { category: { $regex: search, $options: 'i' } } : {};

    let sortOptions = {};
    if (sort) {
      const [field, order] = sort.split(':');
      sortOptions[field] = order === 'dsc' ? -1 : 1;
    } else {
      sortOptions = { created_at: -1 }; // Default: newest first
    }

    const seriesList = await ProductCodeCounter.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    const totalSeries = await ProductCodeCounter.countDocuments(filter);

    return {
      series: seriesList,
      totalSeries,
      totalPages: Math.ceil(totalSeries / limit),
      currentPage: page,
      rowsPerPage: limit
    };
  } catch (error) {
    console.error('Error getting product code series:', error);
    throw error;
  }
};

// Get a single Product Code Series by ID
const getProductCodeSeriesById = async (id) => {
  try {
    return await ProductCodeCounter.findById(id);
  } catch (error) {
    console.error('Error getting product code series by ID:', error);
    throw error;
  }
};

// Update a Product Code Series
const updateProductCodeSeries = async (id, updateData) => {
  try {
    return await ProductCodeCounter.findByIdAndUpdate(id, updateData, { new: true });
  } catch (error) {
    console.error('Error updating product code series:', error);
    throw error;
  }
};

// Delete a Product Code Series by ID
const deleteProductCodeSeries = async (id) => {
  try {
    return await ProductCodeCounter.findByIdAndDelete(id);
  } catch (error) {
    console.error('Error deleting product code series:', error);
    throw error;
  }
};

// Fetch the last assigned product code for a category
const getLastProductCodeSeries = async (category) => {
  try {
    const lastSeries = await ProductCodeCounter.findOne({ category }).sort({ current_series_code: -1 });
    return lastSeries ? lastSeries.current_series_code : null;
  } catch (error) {
    console.error('Error getting last product code series:', error);
    throw error;
  }
};

// Increment product code series when a new product is added
const incrementProductCodeSeries = async (category) => {
  try {
    const updatedSeries = await ProductCodeCounter.findOneAndUpdate(
      { category },
      { $inc: { current_series_code: 1, last_product_code: 1 } },
      { new: true, upsert: true }
    );
    return updatedSeries.current_series_code;
  } catch (error) {
    console.error('Error incrementing product code series:', error);
    throw error;
  }
};

module.exports = {
  createProductCodeSeries,
  getAllProductCodeSeries,
  getProductCodeSeries,
  getProductCodeSeriesById,
  updateProductCodeSeries,
  deleteProductCodeSeries,
  getLastProductCodeSeries,
  incrementProductCodeSeries
};
