import axios from "axios";
import apis from './index';

// Function to add a category
export const addCategoryApi = async (formData) => {
    console.log("formData in addCategoryApi", formData);
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    try {
        const response = await axios.post(
           apis.categories.addCategory, // Update endpoint for categories
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
        console.error("Error adding category:", error);
        throw error;
    }
};

// Function to get the list of categories
export const getCategoriesApi = async () => {
    const token = localStorage.getItem("token")?.replace(/^"(.*)"$/, "$1"); // Use optional chaining
    try {
        const response = await axios.get(
            apis.categories.categoriesList, // Update API reference to categories
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // Use authentication if necessary
                },
            }
        );
        return response;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};




// Function to add a category
export const addSubCategoryApi = async (formData) => {
    console.log("formData in addCategoryApi", formData);
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    try {
        const response = await axios.post(
           apis.categories.addSubcategory, // Update endpoint for categories
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
