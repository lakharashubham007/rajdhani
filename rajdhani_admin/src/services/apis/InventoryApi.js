import axios from "axios";
import apis from './index';


export const getProductsFromInventoryApi = async (currentPage,sort,sortValue,searchInputValue) => {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    try {
        const response = await axios.get(`${apis.inventory.getItemsInventory}`,
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

export const addProductsInInvntory = async (formData) => {
    console.log("formdata in addBrandsApi", formData)
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    try {
        const response = await axios.post(
            apis.inventory.addItemsInInventory,
            formData,
      {
        headers: {
          'Content-Type': 'application/json',
        //   "Content-Type": "multipart/form-data",
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

export const checkProductsInInventoryApi = async (formData) => {
    console.log("data goes for here",formData)
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    try {
        const response = await axios.post(`${apis.inventory.checkProductInInventory}`,
            formData,
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

//filterInventoryItem

export const filterInventoryItemApi = async (queryParams) => {
    const token = localStorage.getItem("token")?.replace(/^"(.*)"$/, "$1");
  
    try {
      const response = await axios.get(
        `${apis.inventory.filterInventoryItems}?${queryParams.toString()}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Error fetching inventory items:", error);
      throw error;
    }
  };