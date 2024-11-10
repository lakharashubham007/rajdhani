const { Food } = require('../models'); // Adjust the import based on your directory structure

// Create a new food item
const createFood = async (data, file) => {
    try {
        const newFood = await Food.create({
            name: data.name,
            shortDescription: data.shortDescription,
            image: file, // Store the path to the image file
            restaurant: data.restaurant,
            category: data.category,
            subCategory: data.subCategory,
            foodType: data.foodType,
            addons: data.addons,
            price: data.price,
            discountType: data.discountType,
            discount: data.discount,
            maxQuantity: data.maxQuantity,
            tags: data.tags,
            startTime: data.startTime,
            endTime: data.endTime,
        });
        return newFood;
    } catch (error) {
        console.error('Error creating food item:', error);
        throw error;
    }
};

// Get all food items
const getFoodItems = async () => {
    try {
        const foodItems = await Food.find({})
            .populate('restaurant') // Populating restaurant information if needed
            .populate('category') // Populating category information if needed
            .populate('subCategory') // Populating sub-category information if needed
            .populate('addons'); // Populating addons information if needed
        return foodItems;
    } catch (error) {
        console.error('Error fetching food items:', error);
        throw error;
    }
};

const getFoodByRestaurantId = async (restaurantId) => {
    try {
        const foodItems = await Food.find({ restaurant: restaurantId }).populate('category').populate('restaurant').populate('subCategory')
       
        return foodItems;
    } catch (error) {
        console.error('Error fetching food items by restaurant ID:', error);
        throw error; // Propagate the error to the controller
    }
};


const getFoodById = async (Id) => {
    try {
      const foodById = await Food.findById(Id).populate('restaurant').populate('category').populate('restaurant').populate('subCategory').populate('addons');
      if (!foodById) {
        throw new Error("Food not found");
      }
      return foodById;
    } catch (error) {
      console.error("Error getting food by ID:", error);
      throw error;
    }
  };

// Update a food item
const updateFood = async (id, data, file) => {
    try {
        const updatedFood = await Food.findByIdAndUpdate(
            id,
            {
                $set: {
                    name: data.name,
                    shortDescription: data.shortDescription,
                    image: file || undefined, // Use existing image if no new file is provided
                    restaurant: data.restaurant,
                    category: data.category,
                    subCategory: data.subCategory,
                    foodType: data.foodType,
                    addons: data.addons,
                    price: data.price,
                    discountType: data.discountType,
                    discount: data.discount,
                    maxQuantity: data.maxQuantity,
                    tags: data.tags,
                    startTime: data.startTime,
                    endTime: data.endTime,
                }
            },
            { new: true } // Return the updated document
        );
        return updatedFood;
    } catch (error) {
        console.error('Error updating food item:', error);
        throw error;
    }
};

// Delete a food item
const deleteFood = async (id) => {
    try {
        await Food.findByIdAndDelete(id);
        return { message: 'Food item deleted successfully' };
    } catch (error) {
        console.error('Error deleting food item:', error);
        throw error;
    }
};

module.exports = {
    createFood,
    getFoodItems,
    updateFood,
    deleteFood,
    getFoodByRestaurantId,
    getFoodById
};
