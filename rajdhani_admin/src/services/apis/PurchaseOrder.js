import axios from "axios";
import apis from './index'

export const addSupplierPurchaseOrderApi = async (formData) => {
    console.log("formdata in addBrandsApi", formData)
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    try {
        const response = await axios.post(
            apis.purchaseorder.addPurchaseOrder,
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
    console.error("Error creating facility:", error);
    throw error;
  }
};

export const createPoItemApi = async (formData) => {
  console.log("formdata in addBrandsApi", formData)
  const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
  try {
      const response = await axios.post(
          apis.purchaseorder.createPoItem,
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
  console.error("Error creating facility:", error);
  throw error;
}
};


export const getSupplierPurchaseOrderApi = async (currentPage,sort,sortValue,searchInputValue) => {
  const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
  try {
      const response = await axios.get(`${apis.purchaseorder.purchase_OrderList}?page=${currentPage}&limit=${sort}&sort=${sortValue?.value ? `${sortValue?.value}:`: ""}${sortValue?.type ? sortValue?.type : ""}&search=${searchInputValue}`,
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

export const deletePurchaseOrderApi = async (id) => {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    try {
        const response = await axios.delete(`${apis.purchaseorder.deletePurchaseOrder}/${id}`,
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

  export const UpdatePurchaseOrderStatus = async (id,formData) => {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    try {
        const response = await axios.patch(`${apis.purchaseorder.updatePurchaseOrderStatus}/${id}`,
            formData,
      {
        headers: {
          'Content-Type': 'application/json',
          //"Content-Type": "multipart/form-data",
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


export const GetEditProductData = async (id) => {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    try {
        const response = await axios.get(`${apis.purchaseorder.getEditPurchaseOrderData}/${id}`,
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


  export const UpdateProduct = async (id,formData) => {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    try {
        const response = await axios.patch(`${apis.purchaseorder.updatePurchaseOrder}/${id}`,
          formData,
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


export const GetAllProductList = async () => {
  const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
  try {
    const response = await axios.get(`${apis.purchaseorder.getAllPurchaseOrderList}`,
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

export const GetPurchaseOrderViewData = async (id) => {
  const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
  try {
    const response = await axios.get(`${apis.purchaseorder.getPurchaseOrderViewData}/${id}`,
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

export const GetPurchaseOrderItemsData = async (id) => {
  const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
  try {
    const response = await axios.get(`${apis.purchaseorder.getPurchaseOrderItemsData}/${id}`,
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

export const GetPurchaseOrderCheckBill = async (id) => {
  const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
  try {
    const response = await axios.get(`${apis.purchaseorder.getPurchaseOrderCheckBill}/${id}`,
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

