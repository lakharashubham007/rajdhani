const { Addons } = require('../models'); // Assuming Addons model is correctly imported

const createAddon = async (data) => {
  try {
    const newAddon = await Addons.create({
      name: data.name,
      price: data.price,
      restaurant_id: data.restaurant_id,
      restaurantName: data.restaurantName,
      status: data.status, // Assuming status can be passed, otherwise defaults to true
    });
    return newAddon;
  } catch (error) {
    console.error('Error creating addon:', error);
    throw error;
  }
};

const getAddons = async () => {
  try {
    const addonsList = await Addons.find({});
    return addonsList;
  } catch (error) {
    console.error('Error fetching addons:', error);
    throw error;
  }
};

module.exports = {
  createAddon,
  getAddons,
};
