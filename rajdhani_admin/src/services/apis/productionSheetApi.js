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

  
  export const updateSidebarMenuCountApi = async (payload) => {
  const token = localStorage.getItem("token")?.replace(/^"(.*)"$/, "$1");

  try {
    const response = await axios.post(
      apis.sidemenu.productionCount,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error updating sidebar menu count:", error);
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

  export const getProductionSheetsApi = async (currentPage,sort,sortValue,searchInputValue) => {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    try {
        const response = await axios.get(`${apis.producitonManagement.getProducitonSheets}?page=${currentPage}&limit=${sort}&sort=${sortValue?.value ? `${sortValue?.value}:`: ""}${sortValue?.type ? sortValue?.type : ""}&search=${searchInputValue}`,
      {
        headers: {
          'Content-Type': 'application/json',
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


  export const getProductionSheetDetailsWithItemsByID = async (productionSheetID,currentPage,sort,sortValue,searchInputValue) => {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    try {
        const response = await axios.get(`${apis.producitonManagement.getProducitonSheetDetailsWithItemByID}?sheet_id=${productionSheetID}&page=${currentPage}&limit=${sort}&sort=${sortValue?.value ? `${sortValue?.value}:`: ""}${sortValue?.type ? sortValue?.type : ""}&search=${searchInputValue}`,
      {
        headers: {
          'Content-Type': 'application/json',
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
