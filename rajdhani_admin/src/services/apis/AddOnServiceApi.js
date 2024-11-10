import axios from "axios";
import apis from './index';

// Function to add a category
export const addAddonsApi = async (formData) => {
    console.log("formData in addCategoryApi", formData);
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    try {
        const response = await axios.post(
           apis.addOns.addAddons, // Update endpoint for categories
            formData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // Uncomment if using authentication
                },
            }
        );
        return response;
    } catch (error) {
        console.error("Error adding category:", error);
        throw error;
    }
};

// Function to add a category
export const getAddonsApi = async (formData) => {
    console.log("formData in addCategoryApi", formData);
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    try {
        const response = await axios.get(
           apis.addOns.addOnsList, // Update endpoint for categories
            // formData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // Uncomment if using authentication
                },
            }
        );
        return response;
    } catch (error) {
        console.error("Error adding category:", error);
        throw error;
    }
};
