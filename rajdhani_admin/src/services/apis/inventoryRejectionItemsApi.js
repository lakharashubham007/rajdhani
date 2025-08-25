import axios from "axios";
import apis from './index';


export const createInventoryRejectionItemsApi = async (formData) => {
  const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
  try {
    const response = await axios.post(
      apis.inventoryRejectionItems.createInventoryRejectionItems,
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


export const getInventoryRejectionItemsApi = async (id, currentPage, sort, sortValue, searchInputValue) => {
  const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
  try {
    const response = await axios.get(`${apis.inventoryRejectionItems.getInventoryRejectionItems}/${id}?page=${currentPage}&limit=${sort}&sort=${sortValue?.value ? `${sortValue?.value}:` : ""}${sortValue?.type ? sortValue?.type : ""}&search=${searchInputValue}`,
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

// //GetPurchaseOrderItemsData
// export const GetSaleOrderItemsData = async (id) => {
//   const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
//   try {
//     const response = await axios.get(`${apis.salesorders.getSaleOrderItemsData}/${id}`,
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     return response;
//   } catch (error) {
//     console.error("Error creating facility:", error);
//     throw error;
//   }
// };