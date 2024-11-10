const { restaurantService } = require("../services");

const createRestaurant = async (req, res) => {
    try {
        const { firstName,
            lastName,
            phone,
            email,
            password,
            zone,
            cuisine,
            restaurantName,
            restaurantAddress,
            tags,
            vat,
            deliveryTime,
            latitude,
            longitude,
            vendor_id
         } = req.body;
        console.log(req.body, "files=--=-=-=-=-=-=-=-=-=")
        // Assuming req.files contains the uploaded files for logo and cover
        const logo = req.files?.logo[0]?.originalname || null;
        const cover = req.files?.cover[0]?.originalname || null;

        // Passing the data to the service that handles the creation
        const restaurant = await restaurantService.createRestaurant({
            firstName,
            lastName,
            phone,
            email,
            password,
            zone,
            cuisine,
            logo,
            cover,
            restaurantName,
            restaurantAddress,
            tags,
            vat,
            deliveryTime,
            latitude,
            longitude,
            vendor_id

        });

        res.json({ success: true, restaurant , message: 'Restaurant created successfully!!!'});
    } catch (error) {
        console.error(error);
        // Check if the error is a MongoDB duplicate key error
        if (error.code === 11000 && error.keyPattern.email) {
          return res.status(400).json({ success: false, message: `Email ${error.keyValue.email} is already taken. Please use a different email.` });
      }
        res.status(500).json({ success: false, message: 'Failed to create Restaurant from server.' });
    }
};


const getRestaurants = async (req, res) => {
    try {
        const restaurant = await restaurantService.getRestaurants();
        res.json({ success: true, restaurants: restaurant });
    } catch (error) {
        console.error(error);
    }
}

const getRestaurantById = async (req, res) => {
    const { id } = req.params; // Assuming the ID is passed in the URL parameters
    try {
      const restaurant = await restaurantService.getRestaurantById(id);
      if (!restaurant) {
        return res.status(404).json({ success: false, message: "Hotel not found" });
      }
      res.json({ success: true, restaurant });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };

module.exports = { createRestaurant,getRestaurants,getRestaurantById };
