const { foodService } = require("../services"); // Adjust the service import as needed

// Create a new food item
const createFood = async (req, res) => {
    try {
        const food = await foodService.createFood(req.body, req.files?.image[0]?.originalname); // Assuming image is uploaded
        res.json({ success: true, food });
    } catch (error) {
        console.error('Error creating food item:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Get all food items
const getFoodItems = async (req, res) => {
    try {
        const foodItems = await foodService.getFoodItems();
        res.json({ success: true, foodItems });
    } catch (error) {
        console.error('Error fetching food items:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

const getFoodByRestaurantId = async (req, res) => {
    const { id } = req.params;

    try {
        const foodItems = await foodService.getFoodByRestaurantId(id); // Call the service
        if (foodItems.length === 0) {
            return res.status(404).json({ success: false, message: 'No food items found for this restaurant.' });
        }
        res.json({ success: true, foodItems });
    } catch (error) {
        console.error('Error fetching food items:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

const getFoodById = async (req, res) => {
    const { id } = req.params; // Assuming the ID is passed in the URL parameters
    try {
      const food = await foodService.getFoodById(id);
      if (!food) {
        return res.status(404).json({ success: false, message: "Food not found" });
      }
      res.json({ success: true, food });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };

// Update a food item
const updateFood = async (req, res) => {
    const { id } = req.params; // Assuming the food ID is passed as a URL parameter
    try {
        const updatedFood = await foodService.updateFood(id, req.body, req.files?.image[0]?.originalname); // Assuming image is uploaded
        res.json({ success: true, updatedFood });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Delete a food item
const deleteFood = async (req, res) => {
    const { id } = req.params; // Assuming the food ID is passed as a URL parameter
    try {
        const result = await foodService.deleteFood(id);
        res.json({ success: true, message: result.message });
    } catch (error) {
        console.error('Error deleting food item:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

module.exports = {
    getFoodById,
    getFoodByRestaurantId,
    createFood,
    getFoodItems,
    updateFood,
    deleteFood,
};
