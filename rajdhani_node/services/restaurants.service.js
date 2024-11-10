const { Restaurants } = require("../models/restaurants.model");

const createRestaurant = async (data, logoFile, coverFile) => {
    console.log("inservice file",data,logoFile,coverFile);
    try {
        // Create the new restaurant using the provided data and files
        const newRestaurant = await Restaurants.create({
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.phone,
            email: data.email,
            password: data.password, // Make sure to hash the password before saving
            zone: data.zone,
            cuisine: data.cuisine,
            logo: data.logo, // Image file name for logo
            cover: data.cover, // Image file name for cover
            restaurantName: data.restaurantName,
            restaurantAddress: data.restaurantAddress,
            tags: data.tags,
            vat: data.vat,
            deliveryTime: data.deliveryTime,
            latitude: data.latitude,
            longitude: data.longitude,
            vendor_id: data.vendor_id
        });

        return newRestaurant;
    } catch (error) {
        console.error('Error creating restaurant:', error);
        throw error; // Rethrow the error so it can be handled by the controller
    }
};


const getRestaurants = async () => {
    try {
        const restaurantList = await Restaurants.find({});
        return restaurantList;
    } catch (error) {
        console.error(error);
    }
}


const getRestaurantById = async (Id) => {
    try {
      const restaurantById = await Restaurants.findById(Id);
      if (!restaurantById) {
        throw new Error("Hotel not found");
      }
      return restaurantById;
    } catch (error) {
      console.error("Error getting Hotel by ID:", error);
      throw error;
    }
  };

module.exports = { createRestaurant,getRestaurants,getRestaurantById };
