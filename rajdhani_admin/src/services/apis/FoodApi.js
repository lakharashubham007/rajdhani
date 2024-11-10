import axios from "axios";
import apis from './index';

// Function to add a food item
export const addFoodApi = async (formData) => {
    console.log("formData in addFoodApi", formData);
    const token = localStorage.getItem("token")?.replace(/^"(.*)"$/, "$1"); // Use optional chaining
    try {
        const response = await axios.post(
            apis.food.addFood, // Update endpoint for adding food
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`, // Uncomment if using authentication
                },
            }
        );
        return response;
    } catch (error) {
        console.error("Error adding food:", error);
        throw error;
    }
};

// Function to get the list of food items
export const getFoodItemsApi = async () => {
    const token = localStorage.getItem("token")?.replace(/^"(.*)"$/, "$1"); // Use optional chaining
    try {
        const response = await axios.get(
            apis.food.foodList, // Update API reference to food items
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // Use authentication if necessary
                },
            }
        );
        return response;
    } catch (error) {
        console.error("Error fetching food items:", error);
        throw error;
    }
};

// Function to get the list of food items
export const getFoodByRestaurantIdApi = async (id) => {
    const token = localStorage.getItem("token")?.replace(/^"(.*)"$/, "$1"); // Use optional chaining
    try {
        const response = await axios.get(
            `${apis.food.foodByRestaurantId}/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // Use authentication if necessary
                },
            }
        );
        return response;
    } catch (error) {
        console.error("Error fetching food items:", error);
        throw error;
    }
};

export const getFoodByIdApi = async (id) => {
    try {
      const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
      const response = await axios.get(
        `${apis.food.foodListById}/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching facility by ID:", error);
      throw error;
    }
  };

// Function to update a food item
export const updateFoodApi = async (id, formData) => {
    const token = localStorage.getItem("token")?.replace(/^"(.*)"$/, "$1");
    try {
        const response = await axios.put(
            `${apis.food.updateFood}/${id}`, // Update endpoint for updating food
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response;
    } catch (error) {
        console.error("Error updating food item:", error);
        throw error;
    }
};

// Function to delete a food item
export const deleteFoodApi = async (id) => {
    const token = localStorage.getItem("token")?.replace(/^"(.*)"$/, "$1");
    try {
        const response = await axios.delete(
            `${apis.food.deleteFood}/${id}`, // Update endpoint for deleting food
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response;
    } catch (error) {
        console.error("Error deleting food item:", error);
        throw error;
    }
};
