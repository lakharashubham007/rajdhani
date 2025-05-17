import axios from "axios";
import apis from './index'

export const createProductionSheetDetailsApi = async (formData) => {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    try {
        const response = await axios.post(
            apis.producitonManagement?.addProductionSheetDetails,
            formData,
      {
        headers: {
          'Content-Type': 'application/json',
          // "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error creating production sheet details:", error);
    throw error;
  }
};


export const createProductionSheetItemsApi = async (formData) => {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    try {
        const response = await axios.post(
            apis.producitonManagement.addProductionSheetItems,
            formData,
      {
        headers: {
          'Content-Type': 'application/json',
          // "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error creating production sheet items:", error);
    throw error;
  }
  };

//   getLastCreatedSheetNo

export const getLastCreatedSheetNoApi = async () => {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    try {
        const response = await axios.get(
            apis.producitonManagement.getLastSheetNo,
      {
        headers: {
          //'Content-Type': 'application/json',
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error creating facility:", error);
    throw error;
  }
};

// Function to search for similar products across different brands
export const SearchLastFiveProductsFromProductionSheetApi = async (product_id, party_id) => {
    const token = localStorage.getItem("token")?.replace(/^"(.*)"$/, "$1");
  
    try {
      const response = await axios.get(
        `${apis.producitonManagement.searchLastFiveSheetItems}`, // Replace with actual API endpoint
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          params: { product_id, party_id }, // Pass fitting code as query parameter
        }
      );
      return response.data; // Return response data
    } catch (error) {
      console.error("Error fetching similar products:", error);
      throw error;
    }
  };
