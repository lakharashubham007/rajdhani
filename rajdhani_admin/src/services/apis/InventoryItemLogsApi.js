import axios from "axios";
import apis from './index';


export const updateItemQuantityWithLogsInInventoryApi = async (formData) => {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    try {
        const response = await axios.post(
            apis.inventoryItemLogs.updateQunaityAndLogsInInventory,
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


export const updateStockJournalLogAndInventory = async (formData) => {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    try {
        const response = await axios.post(
            apis.inventoryItemLogs.updateStockJournalLogAndInventory,
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


  //Api for store assign items activity
  export const getInventoryItemLogsByItemAndSOApi = async (itemId, soId) => {
  const token = localStorage.getItem("token")?.replace(/^"(.*)"$/, "$1");

  try {
    const response = await axios.get(
      `${apis.inventoryItemLogs.getInventoryItemLogsByItemAndSO}?item_id=${itemId}&so_id=${soId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("❌ Error fetching item stage logs:", error);
    throw error;
  }
};

 //Api for store assign items activity
  export const getInventoryItemLogsByItemIdApi = async (itemId, soId) => {
    
  const token = localStorage.getItem("token")?.replace(/^"(.*)"$/, "$1");

  try {
    const response = await axios.get(
      `${apis.inventoryItemLogs.getInventoryItemLogs}?item_id=${itemId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("❌ Error fetching item stage logs:", error);
    throw error;
  }
};


export const getPackingOrderApi = async (currentPage,sort,sortValue,searchInputValue) => {
  const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
  try {
      const response = await axios.get(`${apis.inventoryItemLogs.getPackingOrders}?page=${currentPage}&limit=${sort}&sort=${sortValue?.value ? `${sortValue?.value}:`: ""}${sortValue?.type ? sortValue?.type : ""}&search=${searchInputValue}`,
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


export const getPackingItemsForApprovalApi = async (id, currentPage, sort, sortValue, searchInputValue) => {
  const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
  try {
    const response = await axios.get(`${apis.inventoryItemLogs.getPackingItems}/${id}?page=${currentPage}&limit=${sort}&sort=${sortValue?.value ? `${sortValue?.value}:` : ""}${sortValue?.type ? sortValue?.type : ""}&search=${searchInputValue}`,
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

